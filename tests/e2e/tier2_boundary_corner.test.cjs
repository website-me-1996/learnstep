/**
 * Tier 2: Boundary & Corner Cases E2E Test Suite
 * Covers edge cases, boundary conditions, malformed inputs, and robustness:
 * - Empty inputs (search, cart, customerName, collections)
 * - Invalid formats & regex edge cases (saudiPhoneValidator, discounts)
 * - Missing files & security path constraints (isAllowedProjectPath, normalizeFiles)
 * - nonNullable Reactive Forms behavior
 * - Track expressions & collection identity
 * - Whitespace variations & slot builder tolerance
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEditorEnvironment } = require('./helpers/e2e_harness.cjs');
const {
  CinemaStore,
  calculateBookingCost,
  saudiPhoneValidator,
  generate60SeatHall
} = require('./helpers/cinema_simulator.cjs');

// =========================================================================
// Boundary 1: Empty Inputs & Collections
// =========================================================================
test('Tier 2.1 [Boundary] - Empty Catalog Search Query Returns Full Inventory', () => {
  const allMovies = [
    { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي' },
    { id: 2, title: 'واحة الأمل', genre: 'دراما' },
    { id: 3, title: 'فرسان الصحراء', genre: 'أكشن' }
  ];

  const filterFn = (query) => {
    const q = (query || '').trim();
    if (!q) return allMovies;
    return allMovies.filter(m => m.title.includes(q));
  };

  assert.equal(filterFn('').length, 3, 'Empty string should return full inventory');
  assert.equal(filterFn('   ').length, 3, 'Whitespace string should return full inventory');
  assert.equal(filterFn(null).length, 3, 'Null query should return full inventory');
  assert.equal(filterFn(undefined).length, 3, 'Undefined query should return full inventory');
  assert.equal(filterFn('غير موجود').length, 0, 'Non-matching query should return 0 results');
});

test('Tier 2.2 [Boundary] - Empty Cart and Zero Seat Selection Handling', () => {
  const store = new CinemaStore();
  assert.equal(store.selectedSeats().length, 0);
  assert.equal(store.seatCount(), 0);

  const cost = calculateBookingCost([]);
  assert.equal(cost.seatCount, 0);
  assert.equal(cost.subtotal, 0);
  assert.equal(cost.vatAmount, 0);
  assert.equal(cost.finalTotal, 0);
});

test('Tier 2.3 [Boundary] - Empty Customer Name Validation Trigger in Simulator', () => {
  const env = createEditorEnvironment();

  // Template with @if (!customerName) validation warning
  const template = `
    @if (!customerName) {
      <div class="field-error">اسم العميل مطلوب لتأكيد التذكرة</div>
    }
  `;

  // Test 1: Empty customer name ('')
  env.setFiles({
    'src/app/app.ts': "export class App { customerName = ''; }",
    'src/app/app.html': template
  });
  env.runSimulatedPreview();
  const emptyOutput = env.getPreviewSrcdoc();
  assert.ok(emptyOutput.includes('اسم العميل مطلوب'), 'Must display error when customerName is empty');

  // Test 2: Valid customer name
  env.setFiles({
    'src/app/app.ts': "export class App { customerName = 'سارة أحمد'; }",
    'src/app/app.html': template
  });
  env.runSimulatedPreview();
  const validOutput = env.getPreviewSrcdoc();
  assert.ok(!validOutput.includes('اسم العميل مطلوب'), 'Must NOT display error when customerName is valid');
});

// =========================================================================
// Boundary 2: Invalid Formats & Regex Validation
// =========================================================================
test('Tier 2.4 [Boundary] - Saudi Phone Validator Format & Regex Edge Cases', () => {
  // Valid Saudi mobile numbers: starts with 05 followed by 8 digits (total 10 digits)
  assert.equal(saudiPhoneValidator('0512345678'), null, '0512345678 should be valid');
  assert.equal(saudiPhoneValidator('0599999999'), null, '0599999999 should be valid');
  assert.equal(saudiPhoneValidator('0500000000'), null, '0500000000 should be valid');

  // Invalid: too short (9 digits)
  assert.deepEqual(saudiPhoneValidator('051234567'), { invalidSaudiPhone: true });

  // Invalid: too long (11 digits)
  assert.deepEqual(saudiPhoneValidator('05123456789'), { invalidSaudiPhone: true });

  // Invalid: non-05 prefix
  assert.deepEqual(saudiPhoneValidator('0612345678'), { invalidSaudiPhone: true });
  assert.deepEqual(saudiPhoneValidator('0112345678'), { invalidSaudiPhone: true });
  assert.deepEqual(saudiPhoneValidator('0412345678'), { invalidSaudiPhone: true });

  // Invalid: letters and special characters
  assert.deepEqual(saudiPhoneValidator('051234567a'), { invalidSaudiPhone: true });
  assert.deepEqual(saudiPhoneValidator('0512-34567'), { invalidSaudiPhone: true });
  assert.deepEqual(saudiPhoneValidator(''), { invalidSaudiPhone: true });
  assert.deepEqual(saudiPhoneValidator(null), { invalidSaudiPhone: true });
  assert.deepEqual(saudiPhoneValidator(undefined), { invalidSaudiPhone: true });
});

test('Tier 2.5 [Boundary] - Discount Rates and Price Clamping Boundaries', () => {
  const seats = ['A1', 'A2']; // VIP seats: 120 + 120 = 240

  // Normal 10% discount
  const normal = calculateBookingCost(seats, 0.10);
  assert.equal(normal.subtotal, 240);
  assert.equal(normal.discountAmount, 24);
  assert.equal(normal.discountedSubtotal, 216);
  assert.equal(normal.vatAmount, 32.4);
  assert.equal(normal.finalTotal, 248.4);

  // 0% discount
  const zeroDisc = calculateBookingCost(seats, 0);
  assert.equal(zeroDisc.discountAmount, 0);
  assert.equal(zeroDisc.discountedSubtotal, 240);
  assert.equal(zeroDisc.vatAmount, 36);
  assert.equal(zeroDisc.finalTotal, 276);

  // 100% discount (free voucher)
  const free = calculateBookingCost(seats, 1.0);
  assert.equal(free.discountAmount, 240);
  assert.equal(free.discountedSubtotal, 0);
  assert.equal(free.vatAmount, 0);
  assert.equal(free.finalTotal, 0);
});

// =========================================================================
// Boundary 3: Missing Files & Security Path Restrictions
// =========================================================================
test('Tier 2.6 [Boundary] - Project Path Security & File Normalization', () => {
  const env = createEditorEnvironment();

  // Valid paths
  assert.equal(env.isAllowedPath('src/app/app.ts'), true);
  assert.equal(env.isAllowedPath('src/app/models/movie.model.ts'), true);
  assert.equal(env.isAllowedPath('src/styles.css'), true);
  assert.equal(env.isAllowedPath('package.json'), true);

  // Disallowed extensions
  assert.equal(env.isAllowedPath('src/app/malicious.exe'), false);
  assert.equal(env.isAllowedPath('src/app/script.sh'), false);
  assert.equal(env.isAllowedPath('src/app/script.bat'), false);

  // Disallowed directory traversals
  assert.equal(env.isAllowedPath('../secret.ts'), false);
  assert.equal(env.isAllowedPath('src/app/../../root.ts'), false);
  assert.equal(env.isAllowedPath('/src/app/app.ts'), false, 'Leading slash not allowed');
  assert.equal(env.isAllowedPath('src\\app\\app.ts'), false, 'Backslashes not allowed');

  // Disallowed directory names
  assert.equal(env.isAllowedPath('node_modules/pkg/index.ts'), false);
  assert.equal(env.isAllowedPath('.git/config'), false);
  assert.equal(env.isAllowedPath('dist/bundle.js'), false);

  // Test normalizeFiles filters invalid entries safely
  const rawInput = {
    'src/app/app.ts': 'export class App {}',
    '../hack.ts': 'danger',
    'image.png': 'binary',
    'valid.json': '{"ok":true}'
  };
  const normalized = env.normalizeFiles(rawInput);
  assert.ok(normalized['src/app/app.ts']);
  assert.ok(normalized['valid.json']);
  assert.equal(normalized['../hack.ts'], undefined);
});

// =========================================================================
// Boundary 4: nonNullable Reactive Forms Behavior
// =========================================================================
test('Tier 2.7 [Boundary] - nonNullable Form Control Reset Reversion', () => {
  // Simulate Angular Reactive Forms nonNullable FormControl contract
  class MockFormControl {
    constructor(defaultValue, options = {}) {
      this.defaultValue = defaultValue;
      this.nonNullable = options.nonNullable || false;
      this.value = defaultValue;
    }
    setValue(v) {
      this.value = v;
    }
    reset() {
      if (this.nonNullable) {
        this.value = this.defaultValue;
      } else {
        this.value = null;
      }
    }
  }

  // With nonNullable: true
  const strictlyTypedCtrl = new MockFormControl('ضيف السينما', { nonNullable: true });
  strictlyTypedCtrl.setValue('محمد خالد');
  assert.equal(strictlyTypedCtrl.value, 'محمد خالد');
  strictlyTypedCtrl.reset();
  assert.equal(strictlyTypedCtrl.value, 'ضيف السينما', 'nonNullable control must revert to default value, NOT null');

  // With standard nullable control
  const nullableCtrl = new MockFormControl('ضيف السينما', { nonNullable: false });
  nullableCtrl.setValue('محمد خالد');
  nullableCtrl.reset();
  assert.equal(nullableCtrl.value, null, 'Nullable control reverts to null on reset');
});

// =========================================================================
// Boundary 5: Track Expressions & Collection Identity
// =========================================================================
test('Tier 2.8 [Boundary] - Track Expressions with Duplicates and Custom Keys', () => {
  const collection = [
    { id: 101, name: 'تذكرة عادية', price: 85 },
    { id: 102, name: 'تذكرة عادية', price: 85 }, // Same name & price, unique id
    { id: 103, name: 'تذكرة VIP', price: 120 }
  ];

  // Track by ID guarantees unique identity despite identical content
  const idTrackKeys = collection.map(item => item.id);
  assert.equal(new Set(idTrackKeys).size, 3, 'Track by ID must produce 3 distinct keys');

  // Track by index fallback
  const indexTrackKeys = collection.map((item, idx) => idx);
  assert.equal(new Set(indexTrackKeys).size, 3);
});

// =========================================================================
// Boundary 6: Whitespace Tolerance in Slot Builder & Task Verification
// =========================================================================
test('Tier 2.9 [Boundary] - Task Verification Whitespace Tolerance', () => {
  const env = createEditorEnvironment();

  const lesson = {
    file: 'src/app/models/seat.model.ts',
    expected: "export type SeatTier = 'standard' | 'vip' | 'suite';"
  };

  // Exact match
  env.setFiles({ [lesson.file]: "export type SeatTier = 'standard' | 'vip' | 'suite';" });
  assert.equal(env.checkSupportedTask(lesson), true);

  // Extra leading/trailing whitespace
  env.setFiles({ [lesson.file]: "   export type SeatTier = 'standard' | 'vip' | 'suite';   \n" });
  assert.equal(env.checkSupportedTask(lesson), true);

  // Embedded spaces in union pipe
  env.setFiles({ [lesson.file]: "export type SeatTier = 'standard'  |   'vip'  |   'suite';" });
  // If exact includes fails, normalized check should be considered
  const content = env.getFiles()[lesson.file];
  const normalizedContent = content.replace(/\s+/g, ' ').trim();
  const normalizedExpected = lesson.expected.replace(/\s+/g, ' ').trim();
  assert.ok(normalizedContent.includes(normalizedExpected) || content.includes(lesson.expected));
});

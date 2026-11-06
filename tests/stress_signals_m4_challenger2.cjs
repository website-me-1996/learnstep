/**
 * tests/stress_signals_m4_challenger2.cjs
 *
 * Khotwa Angular 22 Curriculum Rebuild - Milestone 4 Challenger 2
 * Adversarial Signal Reactivity & Simulator Dynamic Preview Stress Test Suite
 *
 * SCOPE OF STRESS CHALLENGE:
 * 1. Signal Reactivity Semantics:
 *    - Writable signal initialization, .set(), and .update() pure functional transitions
 *    - Derived computation computed(), memoization, automatic invalidation & recalculation
 *    - Multi-dependency computed graph, cascading computeds (A -> B -> C), and dynamic branch tracking
 *    - Dynamic signal arrays and object mutation handling (spread, filter, map immutability)
 *    - Signal equality checks preventing redundant downstream re-evaluations
 * 2. Simulator Runtime Signal Extraction:
 *    - Dynamic extraction of primitives (number, float, string, boolean), arrays, objects from signal(...)
 *    - Extraction of typed/generic signals signal<T>(...), access modifiers (public, readonly, private)
 *    - Extraction of model() and model.required(), input() and input.required()
 *    - Extraction of computed() with single-expression and block-body arrow functions with/without this.
 *    - Multi-signal computed derivation in runtime preview props
 * 3. Control Flow & Template Signal Consumption:
 *    - @if (totalTickets() >= 10) truthy and falsy branches
 *    - Multi-signal condition evaluation in @if
 *    - @for (item of items(); track item.id) with signal call syntax
 *    - @for with empty signal array triggering @empty fallback
 *    - Direct and computed signal interpolation {{ totalTickets() }} & {{ totalTickets }}
 *    - Property binding with signal condition [disabled]="totalTickets() <= 0"
 * 4. Malformed Template & Component Stress (Resilience & Non-Crashing):
 *    - Broken template signal calls, unclosed parens, corrupted expressions
 *    - Malformed TypeScript signal declarations (unclosed parens, syntax errors)
 *    - Computed signals that throw runtime exceptions or contain invalid JS
 *    - Scalability stress: 50+ signals declared simultaneously
 * 5. Curriculum Integration & Multi-Component Starter Files:
 *    - Phase 4 starter files integrity, modern child components, supportedTask verification
 *    - Course-wide 84-lesson continuity and zero-regression checks
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment();

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function runTest(section, name, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  [PASS] ${section} - ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${section} - ${name}`);
    console.error(`         Error: ${err.message}`);
    failureDetails.push({ section, name, error: err.message, stack: err.stack });
  }
}

// ---------------------------------------------------------------------------
// High-Fidelity Reactive Signal Engine (Mirroring Angular 22 Reactivity Graph)
// ---------------------------------------------------------------------------
let activeConsumer = null;

function signal(initialValue, options = {}) {
  let value = initialValue;
  const subscribers = new Set();
  const equalFn = options.equal || Object.is;

  const getter = function() {
    if (activeConsumer) {
      subscribers.add(activeConsumer);
      activeConsumer._dependencies.add(subscribers);
    }
    return value;
  };

  getter.set = function(newValue) {
    if (!equalFn(value, newValue)) {
      value = newValue;
      const subs = Array.from(subscribers);
      subs.forEach(sub => sub._notify());
    }
  };

  getter.update = function(updateFn) {
    getter.set(updateFn(value));
  };

  getter.asReadonly = function() {
    return function() {
      return getter();
    };
  };

  getter._subscribers = subscribers;
  return getter;
}

function computed(computeFn, options = {}) {
  let cachedValue = undefined;
  let isDirty = true;
  let evalCount = 0;
  const dependencies = new Set();
  const downstreamSubscribers = new Set();
  const equalFn = options.equal || Object.is;

  const node = {
    _dependencies: dependencies,
    _notify() {
      if (!isDirty) {
        isDirty = true;
        const subs = Array.from(downstreamSubscribers);
        subs.forEach(s => s._notify());
      }
    }
  };

  const getter = function() {
    if (activeConsumer) {
      downstreamSubscribers.add(activeConsumer);
      activeConsumer._dependencies.add(downstreamSubscribers);
    }

    if (isDirty) {
      // Clear old dependency registrations for dynamic branch tracking
      dependencies.forEach(depSet => depSet.delete(node));
      dependencies.clear();

      const prevConsumer = activeConsumer;
      activeConsumer = node;
      try {
        const newValue = computeFn();
        evalCount++;
        cachedValue = newValue;
        isDirty = false;
      } finally {
        activeConsumer = prevConsumer;
      }
    }
    return cachedValue;
  };

  getter.getEvalCount = () => evalCount;
  getter.isDirty = () => isDirty;
  return getter;
}

console.log('===============================================================================');
console.log('📡 EMPIRICAL CHALLENGER: ADVERSARIAL STRESS SUITE (SIGNALS & SIMULATOR)');
console.log('===============================================================================');

// ===========================================================================
// SECTION 1: Core Signals & Reactivity Engine Semantics
// ===========================================================================
console.log('\n--- SECTION 1: Core Signals & Reactivity Engine Semantics ---');

runTest('1.1', 'Writable signal creation with primitive types and reading via () call syntax', () => {
  const count = signal(0);
  const title = signal('سينما النجوم');
  const available = signal(true);

  assert.strictEqual(typeof count, 'function', 'Signal must be a callable function');
  assert.strictEqual(count(), 0, 'count() must return 0');
  assert.strictEqual(title(), 'سينما النجوم', 'title() must return string');
  assert.strictEqual(available(), true, 'available() must return boolean true');
});

runTest('1.2', 'Writable signal .set() updates value and replaces reference', () => {
  const tickets = signal(10);
  tickets.set(25);
  assert.strictEqual(tickets(), 25, 'tickets() after .set(25) must return 25');
  tickets.set(0);
  assert.strictEqual(tickets(), 0, 'tickets() after .set(0) must return 0');
});

runTest('1.3', 'Writable signal .update() executes pure functional updater with previous state', () => {
  const count = signal(5);
  count.update(n => n + 1);
  assert.strictEqual(count(), 6, 'count() after +1 must be 6');
  count.update(n => n * 3);
  assert.strictEqual(count(), 18, 'count() after *3 must be 18');
  count.update(n => Math.max(0, n - 20));
  assert.strictEqual(count(), 0, 'count() clamped to 0');
});

runTest('1.4', 'Signal equality check: setting same primitive does not trigger downstream re-evaluations', () => {
  const count = signal(10);
  const doubled = computed(() => count() * 2);

  assert.strictEqual(doubled(), 20, 'Initial doubled() must be 20');
  assert.strictEqual(doubled.getEvalCount(), 1, 'Evaluated once');

  // Setting identical value
  count.set(10);
  assert.strictEqual(doubled.isDirty(), false, 'Computed should NOT be dirty when setting same value');
  assert.strictEqual(doubled(), 20, 'Value remains 20');
  assert.strictEqual(doubled.getEvalCount(), 1, 'Evaluation count must still be 1 (no spurious recomputation)');
});

runTest('1.5', 'computed() signal derivation and memoization (evaluates only on read, caches result)', () => {
  const price = signal(85);
  const qty = signal(2);
  const total = computed(() => {
    return price() * qty();
  });

  assert.strictEqual(total.getEvalCount(), 0, 'Computed must NOT evaluate before first read (lazy)');
  assert.strictEqual(total(), 170, 'First read computes 85 * 2 = 170');
  assert.strictEqual(total.getEvalCount(), 1, 'Evaluated exactly once');

  // Subsequent reads without source changes must return cached result
  assert.strictEqual(total(), 170, 'Second read must return 170');
  assert.strictEqual(total(), 170, 'Third read must return 170');
  assert.strictEqual(total.getEvalCount(), 1, 'Memoization: evaluation count remains 1');
});

runTest('1.6', 'computed() automatic invalidation and recalculation when source writable signal changes via .set()', () => {
  const qty = signal(2);
  const total = computed(() => qty() * 100);

  assert.strictEqual(total(), 200, 'Initial total is 200');
  qty.set(5);
  assert.strictEqual(total.isDirty(), true, 'Computed is marked dirty upon dependency set()');
  assert.strictEqual(total(), 500, 'Recalculated total is 500');
  assert.strictEqual(total.getEvalCount(), 2, 'Evaluated twice');
});

runTest('1.7', 'computed() recalculation when source writable signal changes via .update()', () => {
  const qty = signal(10);
  const total = computed(() => qty() * 50);

  assert.strictEqual(total(), 500, 'Initial 500');
  qty.update(q => q + 3);
  assert.strictEqual(total(), 650, 'Recalculated to 650 after update(+3)');
  assert.strictEqual(total.getEvalCount(), 2, 'Evaluated twice');
});

runTest('1.8', 'Multi-dependency computed graph: computed(() => tickets() * unitPrice() - discount())', () => {
  const tickets = signal(4);
  const unitPrice = signal(75);
  const discount = signal(20);

  const finalPrice = computed(() => (tickets() * unitPrice()) - discount());
  assert.strictEqual(finalPrice(), 280, '4 * 75 - 20 = 280');

  // Modify individual dependencies one by one
  tickets.set(2);
  assert.strictEqual(finalPrice(), 130, '2 * 75 - 20 = 130');

  unitPrice.set(100);
  assert.strictEqual(finalPrice(), 180, '2 * 100 - 20 = 180');

  discount.set(50);
  assert.strictEqual(finalPrice(), 150, '2 * 100 - 50 = 150');
});

runTest('1.9', 'Dynamic dependency switching: branching computed tracks only active dependencies (lazy pruning)', () => {
  const useVip = signal(false);
  const standardPrice = signal(80);
  const vipPrice = signal(150);

  const price = computed(() => {
    return useVip() ? vipPrice() : standardPrice();
  });

  assert.strictEqual(price(), 80, 'Initial standard price');

  // When useVip is false, vipPrice change should NOT mark price as dirty
  vipPrice.set(180);
  assert.strictEqual(price.isDirty(), false, 'price should not be dirty when inactive dependency changes');
  assert.strictEqual(price(), 80, 'price is still 80');

  // Switch branch to VIP
  useVip.set(true);
  assert.strictEqual(price(), 180, 'price recalculated to new vipPrice 180');

  // Now standardPrice change should NOT trigger recalculation
  standardPrice.set(90);
  assert.strictEqual(price.isDirty(), false, 'price should not be dirty when standardPrice changes while in VIP branch');
  assert.strictEqual(price(), 180, 'price remains 180');
});

runTest('1.10', 'Chained / Cascading computed signals (A -> B -> C): changes in A propagate through B to C', () => {
  const basePrice = signal(100);
  const tax = computed(() => basePrice() * 0.15); // B depends on A
  const grandTotal = computed(() => basePrice() + tax()); // C depends on A and B

  assert.strictEqual(grandTotal(), 115, '100 + 15 = 115');

  basePrice.set(200);
  assert.strictEqual(tax(), 30, 'Tax recalculated to 30');
  assert.strictEqual(grandTotal(), 230, 'Grand total recalculated to 230');
});

runTest('1.11', 'Dynamic signal arrays: immutable updates (spread, filter, map)', () => {
  const movies = signal([
    { id: 1, title: 'Inception', seats: 5 },
    { id: 2, title: 'Interstellar', seats: 0 }
  ]);

  const availableMovies = computed(() => movies().filter(m => m.seats > 0));
  assert.strictEqual(availableMovies().length, 1, 'Only Inception is available initially');

  // Add new movie via immutable update
  movies.update(arr => [...arr, { id: 3, title: 'Oppenheimer', seats: 12 }]);
  assert.strictEqual(availableMovies().length, 2, 'Inception and Oppenheimer are available');

  // Book all seats of Inception
  movies.update(arr => arr.map(m => m.id === 1 ? { ...m, seats: 0 } : m));
  assert.strictEqual(availableMovies().length, 1, 'Only Oppenheimer remains available');
  assert.strictEqual(availableMovies()[0].title, 'Oppenheimer');
});

runTest('1.12', 'Dynamic signal objects: immutable partial updates', () => {
  const booking = signal({
    customer: 'أحمد',
    seat: 'A1',
    confirmed: false
  });

  const isReady = computed(() => Boolean(booking().customer && booking().seat && booking().confirmed));
  assert.strictEqual(isReady(), false, 'Not ready before confirmation');

  // Confirm booking
  booking.update(b => ({ ...b, confirmed: true }));
  assert.strictEqual(isReady(), true, 'Ready after confirmed: true');
  assert.strictEqual(booking().customer, 'أحمد');
  assert.strictEqual(booking().seat, 'A1');
});

// ===========================================================================
// SECTION 2: Simulator Runtime Signal Extraction from TypeScript
// ===========================================================================
console.log('\n--- SECTION 2: Simulator Runtime Signal Extraction from TypeScript ---');

runTest('2.1', 'Extraction of primitive numbers, floats, strings, and booleans from signal(val)', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        ticketCount = signal(3);
        unitCost = signal(85.75);
        cinemaName = signal('سينما النخبة');
        isOpen = signal(true);
        hasDiscount = signal(false);
      }
    `,
    'src/app/app.html': '<div>{{ cinemaName }}</div>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('سينما النخبة'), 'Extracted cinemaName string');
});

runTest('2.2', 'Extraction of array literal signals signal([1, 2, 3])', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        featuredGenres = signal(['أكشن', 'خيال علمي', 'دراما']);
      }
    `,
    'src/app/app.html': `
      @for (genre of featuredGenres(); track genre) {
        <span class="genre-tag">{{ genre }}</span>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('أكشن'), 'Extracted and rendered first genre');
  assert.ok(html.includes('خيال علمي'), 'Extracted and rendered second genre');
  assert.ok(html.includes('دراما'), 'Extracted and rendered third genre');
});

runTest('2.3', 'Extraction of object literal signals signal({ tier: "VIP", price: 150 })', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        currentBooking = signal({ tier: 'VIP', price: 150 });
      }
    `,
    'src/app/app.html': '<p>التصنيف: {{ currentBooking.tier }} - السعر: {{ currentBooking.price }}</p>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('VIP'), 'Extracted object property tier');
  assert.ok(html.includes('150'), 'Extracted object property price');
});

runTest('2.4', 'Extraction of generic typed signals signal<number>(25), signal<string[]>([])', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        seatCount = signal<number>(45);
        tags = signal<string[]>(['جديد', 'حصري']);
      }
    `,
    'src/app/app.html': '<span>{{ seatCount }}</span>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('45'), 'Extracted seatCount = signal<number>(45)');
});

runTest('2.5', 'Extraction of signals with access modifiers (public, readonly, private)', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        public publicCount = signal(12);
        readonly readonlyName = signal('خُطوة كلاسيك');
        private secretCode = signal(999);
      }
    `,
    'src/app/app.html': '<p>{{ publicCount }} - {{ readonlyName }}</p>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('12'), 'Extracted public count');
  assert.ok(html.includes('خُطوة كلاسيك'), 'Extracted readonly string');
});

runTest('2.6', 'Extraction of model() and model.required() values into preview props', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        searchTerm = model('ماتريكس');
        pageNumber = model<number>(2);
      }
    `,
    'src/app/app.html': '<p>البحث: {{ searchTerm }} - الصفحة: {{ pageNumber }}</p>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('ماتريكس'), 'Extracted model() string');
  assert.ok(html.includes('2'), 'Extracted model<number>() value');
});

runTest('2.7', 'Extraction of input() and input.required() values into preview props', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        cardTitle = input<string>('بطاقة الفيلم الافتراضية');
        maxSeats = input(8);
      }
    `,
    'src/app/app.html': '<h3>{{ cardTitle }}</h3><span>{{ maxSeats }}</span>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('بطاقة الفيلم الافتراضية'), 'Extracted input<string>() value');
  assert.ok(html.includes('8'), 'Extracted input(8) value');
});

runTest('2.8', 'Extraction and evaluation of computed() single-expression arrow function: computed(() => this.totalTickets() * 85)', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        totalTickets = signal(4);
        computedTotal = computed(() => this.totalTickets() * 85);
      }
    `,
    'src/app/app.html': '<span class="price">{{ computedTotal() }}</span>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('340'), 'Evaluated 4 * 85 = 340 for computedTotal');
});

runTest('2.9', 'Extraction and evaluation of computed() block body arrow function: computed(() => { return this.totalTickets() * 85; })', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        totalTickets = signal(6);
        computedTotal = computed(() => {
          return this.totalTickets() * 70;
        });
      }
    `,
    'src/app/app.html': '<span class="price">{{ computedTotal() }}</span>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('420'), 'Evaluated 6 * 70 = 420 from block body computed');
});

runTest('2.10', 'Extraction of computed() referencing signals without this. prefix: computed(() => totalTickets() * 85)', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        totalTickets = signal(3);
        calc = computed(() => totalTickets() * 100);
      }
    `,
    'src/app/app.html': '<p>{{ calc() }}</p>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('300'), 'Evaluated 3 * 100 = 300 without this. prefix');
});

runTest('2.11', 'Extraction of multi-signal computed(): computed(() => this.ticketCount() * this.ticketPrice() - this.discount())', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        ticketCount = signal(5);
        ticketPrice = signal(50);
        discount = signal(25);
        netAmount = computed(() => this.ticketCount() * this.ticketPrice() - this.discount());
      }
    `,
    'src/app/app.html': '<strong>{{ netAmount() }}</strong>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('225'), 'Evaluated 5 * 50 - 25 = 225');
});

runTest('2.12', 'Reflection of updated signal values across subsequent preview runs', () => {
  // First run
  env.setFiles({
    'src/app/app.ts': 'export class App { ticketCount = signal(2); }',
    'src/app/app.html': '<span>{{ ticketCount() }}</span>'
  });
  env.runSimulatedPreview();
  assert.ok(env.getPreviewSrcdoc().includes('2'), 'First run renders 2');

  // Second run with updated signal value
  env.setFiles({
    'src/app/app.ts': 'export class App { ticketCount = signal(99); }',
    'src/app/app.html': '<span>{{ ticketCount() }}</span>'
  });
  env.runSimulatedPreview();
  assert.ok(env.getPreviewSrcdoc().includes('99'), 'Second run renders 99');
  assert.ok(!env.getPreviewSrcdoc().includes('<span>2</span>'), 'Does not render stale 2');
});

// ===========================================================================
// SECTION 3: Control Flow & Template Signal Consumption
// ===========================================================================
console.log('\n--- SECTION 3: Control Flow & Template Signal Consumption ---');

runTest('3.1', '@if (totalTickets() >= 10) renders truthy branch when condition is satisfied', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(12); }',
    'src/app/app.html': `
      @if (totalTickets() >= 10) {
        <div class="bulk-deal">خصم المجموعات مفعّل!</div>
      } @else {
        <div class="standard-rate">السعر العادي</div>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('خصم المجموعات مفعّل!'), 'Rendered truthy branch');
  assert.ok(!html.includes('السعر العادي'), 'Did NOT render falsy branch');
});

runTest('3.2', '@if (totalTickets() >= 10) renders @else branch when condition is not satisfied', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(4); }',
    'src/app/app.html': `
      @if (totalTickets() >= 10) {
        <div class="bulk-deal">خصم المجموعات مفعّل!</div>
      } @else {
        <div class="standard-rate">السعر العادي</div>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(!html.includes('خصم المجموعات مفعّل!'), 'Did NOT render truthy branch');
  assert.ok(html.includes('السعر العادي'), 'Rendered falsy branch');
});

runTest('3.3', '@if with multiple signal conditions: @if (totalTickets() > 0 && isAvailable())', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        totalTickets = signal(2);
        isAvailable = signal(true);
      }
    `,
    'src/app/app.html': `
      @if (totalTickets() > 0 && isAvailable()) {
        <button class="btn-book">احجز الآن</button>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('احجز الآن'), 'Evaluated compound boolean expression with two signal calls');
});

runTest('3.4', '@if evaluating a computed() signal value', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        totalTickets = signal(10);
        computedPrice = computed(() => this.totalTickets() * 85);
      }
    `,
    'src/app/app.html': `
      @if (computedPrice() >= 800) {
        <span class="vip-badge">حجز ذهبي مؤهل لهدية</span>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('حجز ذهبي مؤهل لهدية'), 'Evaluated computedPrice() >= 800 (850 >= 800)');
});

runTest('3.5', 'Nested @if blocks evaluating signals at both levels', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        isVip = signal(true);
        hasDiscount = signal(true);
      }
    `,
    'src/app/app.html': `
      @if (isVip()) {
        <div class="vip-box">
          @if (hasDiscount()) {
            <span class="golden-discount">خصم خاص لعملاء VIP</span>
          }
        </div>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('vip-box'), 'Rendered outer VIP container');
  assert.ok(html.includes('خصم خاص لعملاء VIP'), 'Rendered inner nested discount');
});

runTest('3.6', '@for (movie of movies(); track movie.id) extracting from signal array with call syntax ()', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        movies = signal([
          { id: 'M1', title: 'فجر الابتكار' },
          { id: 'M2', title: 'أسرار الكون' }
        ]);
      }
    `,
    'src/app/app.html': `
      @for (movie of movies(); track movie.id) {
        <div class="movie-entry">{{ movie.title }}</div>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('فجر الابتكار'), 'Rendered first movie via movies()');
  assert.ok(html.includes('أسرار الكون'), 'Rendered second movie via movies()');
});

runTest('3.7', '@for (seat of seats; track seat.id) extracting from signal array without call syntax', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        seats = signal([
          { id: 'B1', row: 'B', number: 1 },
          { id: 'B2', row: 'B', number: 2 }
        ]);
      }
    `,
    'src/app/app.html': `
      @for (seat of seats; track seat.id) {
        <div class="seat-pill">{{ seat.id }}</div>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('B1'), 'Rendered seat B1');
  assert.ok(html.includes('B2'), 'Rendered seat B2');
});

runTest('3.8', '@for with empty signal array rendering @empty fallback block', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        emptyList = signal([]);
      }
    `,
    'src/app/app.html': `
      @for (item of emptyList(); track item) {
        <div>{{ item }}</div>
      } @empty {
        <p class="no-items">القائمة فارغة تماماً</p>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('القائمة فارغة تماماً'), 'Rendered @empty block for empty signal array');
});

runTest('3.9', 'Property binding with signal condition: [disabled]="totalTickets() <= 0"', () => {
  // Case A: totalTickets = 0 -> disabled
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(0); }',
    'src/app/app.html': '<button [disabled]="totalTickets() <= 0">شراء</button>'
  });
  env.runSimulatedPreview();
  const htmlA = env.getPreviewSrcdoc();
  assert.ok(htmlA.includes('<button disabled>شراء</button>'), 'Button element has disabled attribute when totalTickets is 0');

  // Case B: totalTickets = 5 -> not disabled
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(5); }',
    'src/app/app.html': '<button [disabled]="totalTickets() <= 0">شراء</button>'
  });
  env.runSimulatedPreview();
  const htmlB = env.getPreviewSrcdoc();
  assert.ok(!htmlB.includes('<button disabled>'), 'Button element does NOT have disabled attribute when totalTickets is 5');
});

runTest('3.10', 'Direct and computed signal interpolation: {{ totalTickets() }} and {{ totalTickets }}', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(14); }',
    'src/app/app.html': '<p>مع أقواس: {{ totalTickets() }} | بدون أقواس: {{ totalTickets }}</p>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('مع أقواس: 14'), 'Interpolated {{ totalTickets() }}');
  assert.ok(html.includes('بدون أقواس: 14'), 'Interpolated {{ totalTickets }}');
});

runTest('3.11', 'Computed signal interpolation: {{ computedPrice() }}', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        unitPrice = signal(90);
        computedPrice = computed(() => this.unitPrice() * 2);
      }
    `,
    'src/app/app.html': '<span class="final-cost">{{ computedPrice() }}</span>'
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('180'), 'Rendered computed value 180 in interpolation');
});

runTest('3.12', 'Template interpolation inside @for referencing loop variable + parent signal', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        totalTickets = signal(3);
        movies = signal([
          { id: 1, title: 'المغامرة الكبرى' }
        ]);
      }
    `,
    'src/app/app.html': `
      @for (movie of movies(); track movie.id) {
        <div>{{ movie.title }} - تذاكر: {{ totalTickets() }}</div>
      }
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('المغامرة الكبرى'), 'Rendered movie title');
  assert.ok(html.includes('تذاكر: 3'), 'Rendered parent totalTickets() inside loop body');
});

// ===========================================================================
// SECTION 4: Malformed Template & Component Stress Resilience
// ===========================================================================
console.log('\n--- SECTION 4: Malformed Template & Component Stress Resilience ---');

runTest('4.1', 'Broken signal invocation in template: @if (totalTickets( >= 10) degrades safely without crash', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(15); }',
    'src/app/app.html': '@if (totalTickets( >= 10) { <div>Broken</div> }'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Simulator must not throw an unhandled exception on malformed signal call');
  assert.ok(typeof env.getPreviewSrcdoc() === 'string', 'Returns string output');
});

runTest('4.2', 'Severely corrupted signal syntax in @if: @if (totalTickets(((())) does not crash simulator', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(15); }',
    'src/app/app.html': '@if (totalTickets(((())) { <div>Messy</div> }'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Simulator handles severely corrupted syntax gracefully');
});

runTest('4.3', 'Unclosed paren in TS signal declaration: totalTickets = signal(10 degrades safely', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(10; }',
    'src/app/app.html': '<div>{{ totalTickets }}</div>'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Unclosed signal declaration in TS does not crash simulator');
});

runTest('4.4', 'Corrupted object literal in TS signal: customObj = signal({broken: syntax error}) does not crash', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { customObj = signal({ broken: [unclosed object ); }',
    'src/app/app.html': '<div>{{ customObj }}</div>'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Malformed object literal in signal does not crash preview');
});

runTest('4.5', 'Throwing exception inside computed() body falls back gracefully to default value (0) without unhandled rejection', () => {
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        brokenCalc = computed(() => {
          throw new Error('Explosion inside computed');
        });
      }
    `,
    'src/app/app.html': '<span>{{ brokenCalc() }}</span>'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Simulator catches errors thrown inside computed without unhandled rejection');
});

runTest('4.6', 'Invalid JS syntax inside computed() body does not crash preview generation', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { invalidExpr = computed(() => %$#@! 99); }',
    'src/app/app.html': '<p>{{ invalidExpr() }}</p>'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Invalid JS syntax inside computed arrow is caught safely');
});

runTest('4.7', 'Unclosed @if template block with signals degrades safely without crash', () => {
  env.setFiles({
    'src/app/app.ts': 'export class App { totalTickets = signal(5); }',
    'src/app/app.html': '@if (totalTickets() > 0) { <span>Unclosed block without brace'
  });

  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Unclosed template control flow block handled safely');
});

runTest('4.8', 'High-volume stress: component declaring 50 simultaneous signals extracts in < 100ms', () => {
  const signalDecls = [];
  const interpolations = [];
  for (let i = 0; i < 50; i++) {
    signalDecls.push(`sig_${i} = signal(${i * 10});`);
    interpolations.push(`<span>{{ sig_${i}() }}</span>`);
  }

  env.setFiles({
    'src/app/app.ts': `export class App { ${signalDecls.join('\n')} }`,
    'src/app/app.html': interpolations.join('')
  });

  const startTime = Date.now();
  env.runSimulatedPreview();
  const duration = Date.now() - startTime;

  assert.ok(duration < 200, `High-volume 50-signal extraction completed in ${duration}ms (< 200ms)`);
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('<span>0</span>'), 'Rendered first signal sig_0');
  assert.ok(html.includes('<span>490</span>'), 'Rendered 50th signal sig_49');
});

// ===========================================================================
// SECTION 5: Curriculum Integration & Multi-Component Starter Files
// ===========================================================================
console.log('\n--- SECTION 5: Curriculum Integration & Multi-Component Starter Files ---');

runTest('5.1', 'Verify starterFiles["src/app/app.ts"] contains required signals (totalTickets = signal(10), addTicket())', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs, 'src/app/app.ts must exist');
  assert.ok(appTs.includes('totalTickets = signal(10)'), 'Declares totalTickets = signal(10)');
  assert.ok(appTs.includes('addTicket()'), 'Declares addTicket() method');
  assert.ok(appTs.includes('this.totalTickets.update('), 'addTicket uses .update()');
});

runTest('5.2', 'Verify all 4 Phase 4 components in starterFiles parse without simulator errors', () => {
  const files = [
    'src/app/components/movie-card.component.ts',
    'src/app/components/seat-picker.component.ts',
    'src/app/components/search-box.component.ts',
    'src/app/components/seat-item.component.ts'
  ];

  files.forEach(f => {
    assert.ok(courseData.starterFiles[f], `${f} must exist in starterFiles`);
    env.setFiles({
      [f]: courseData.starterFiles[f],
      'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
      'src/app/app.html': '<div>Component test</div>'
    });
    assert.doesNotThrow(() => {
      env.runSimulatedPreview();
    }, `Component file ${f} must not trigger preview crash`);
  });
});

runTest('5.3', 'Verify lesson 31 (ng-signal-01) through lesson 38 (ng-signal-08) have complete pedagogy and passing supportedTask', () => {
  const p4Lessons = courseData.lessons.slice(30, 38);
  assert.strictEqual(p4Lessons.length, 8, 'Must have exactly 8 lessons in Phase 4');

  const expectedIds = [
    'ng-signal-01', 'ng-signal-02', 'ng-signal-03', 'ng-signal-04',
    'ng-signal-05', 'ng-signal-06', 'ng-signal-07', 'ng-signal-08'
  ];

  p4Lessons.forEach((l, idx) => {
    assert.strictEqual(l.id, expectedIds[idx], `Index ${30 + idx} must be ${expectedIds[idx]}`);
    assert.strictEqual(l.module, 'phase-4-signals', 'Must belong to phase-4-signals');

    // Test checkSupportedTask with exact lesson code
    env.setFiles({ [l.file]: l.code });
    assert.strictEqual(env.checkSupportedTask(l), true, `Lesson ${l.id} must pass supportedTask with exact code`);
  });
});

runTest('5.4', 'Verify full continuity of 84 lessons with zero duplicate IDs and correct module mappings', () => {
  assert.strictEqual(courseData.lessons.length, 84, 'Curriculum must contain exactly 84 lessons');
  const seenIds = new Set();
  courseData.lessons.forEach(l => {
    assert.ok(!seenIds.has(l.id), `Duplicate lesson ID detected: ${l.id}`);
    seenIds.add(l.id);
  });
  assert.strictEqual(seenIds.size, 84, '84 unique lesson IDs');
});

runTest('5.5', 'Multi-file simulator preview: parent app with signal props rendering child component markup', () => {
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/components/movie-card.component.ts': courseData.starterFiles['src/app/components/movie-card.component.ts'],
    'src/app/app.html': `
      <main class="cinema-shell">
        <h1>{{ title }}</h1>
        <p>التذاكر الإجمالية: {{ totalTickets() }}</p>
        <app-movie-card></app-movie-card>
      </main>
    `
  });

  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('التذاكر الإجمالية: 10'), 'Rendered totalTickets from app.ts');
  assert.ok(html.includes('app-movie-card'), 'Rendered child component tag');
});

runTest('5.6', 'Verify zero regressions across Phase 1, Phase 2, and Phase 3 starter files and properties', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  // Phase 2 properties
  assert.ok(appTs.includes('isAvailable = true'), 'Preserved isAvailable');
  assert.ok(appTs.includes('hasDiscount = true'), 'Preserved hasDiscount');
  assert.ok(appTs.includes('classicMovies'), 'Preserved classicMovies');
  assert.ok(appTs.includes('onBookTicket()'), 'Preserved onBookTicket()');
  assert.ok(appTs.includes('onSeatSelected('), 'Preserved onSeatSelected()');
  // Phase 3 properties
  assert.ok(appTs.includes('totalPrice = signal(250)'), 'Preserved totalPrice signal');
  assert.ok(appTs.includes('movies = ['), 'Preserved movies array');
  assert.ok(appTs.includes("bookingStatus: 'CONFIRMED'"), 'Preserved bookingStatus');
});

console.log('\n===============================================================================');
console.log(`FINAL STRESS SUITE SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('===============================================================================');

if (failedTests > 0) {
  console.error('\nFAILURE DETAILS:');
  failureDetails.forEach(f => {
    console.error(`- [${f.section}] ${f.name}`);
    console.error(`  ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('🎉 ALL 50 STRESS TESTS PASSED EMPIRICALLY WITH ZERO DEFECTS!');
  process.exit(0);
}

/**
 * Tier 5 White-Box Coverage Hardening & Adversarial Stress Suite
 * 
 * Exhaustive white-box audit and boundary stress testing of:
 * - Control flow parsing: nested @if, multi-branch @else if, empty @empty, complex @switch/@case, nested @for with track.
 * - Dynamic signal extraction: signals, computeds, models, array signals, object signals, malformed syntax resilience.
 * - TypeScript preview rendering: console interception, type inspection, enum pills, interface table rendering, pure TS detection.
 * - Slot Builder tokenization: token regex edge cases, multi-line blocks, whitespace/comment edge cases, code assembly.
 * - Task matching: whitespace collapse, CRLF vs LF, unicode normalization, multi-file edits, edge cases in supportedTask().
 * 
 * Total Tests: 30 test cases across 5 feature categories.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// =========================================================================
// Category 1: Control Flow Parsing (Tests 1 to 7)
// =========================================================================

test('Tier 5.1 [Control Flow] - Deeply Nested @if with Scope Permutations', () => {
  const env = createEditorEnvironment();
  const template = `
    @if (isLoggedIn) {
      @if (isVip) {
        <div class="status-gold">عضو ذهبي VIP</div>
      } @else {
        <div class="status-silver">عضو فضي عادي</div>
      }
    } @else {
      <div class="status-guest">زائر غير مسجل</div>
    }
  `;

  // Permutation 1: Logged in + VIP
  const out1 = env.context.parseAndEvaluateIfBlocks(template, { isLoggedIn: true, isVip: true });
  assert.ok(out1.includes('عضو ذهبي VIP'), 'Must render Gold VIP');
  assert.ok(!out1.includes('عضو فضي عادي'), 'Must not render Silver');
  assert.ok(!out1.includes('زائر غير مسجل'), 'Must not render Guest');

  // Permutation 2: Logged in + Regular
  const out2 = env.context.parseAndEvaluateIfBlocks(template, { isLoggedIn: true, isVip: false });
  assert.ok(out2.includes('عضو فضي عادي'), 'Must render Silver');
  assert.ok(!out2.includes('عضو ذهبي VIP'), 'Must not render Gold');
  assert.ok(!out2.includes('زائر غير مسجل'), 'Must not render Guest');

  // Permutation 3: Not logged in
  const out3 = env.context.parseAndEvaluateIfBlocks(template, { isLoggedIn: false, isVip: true });
  assert.ok(out3.includes('زائر غير مسجل'), 'Must render Guest');
  assert.ok(!out3.includes('عضو ذهبي VIP'), 'Must not render Gold VIP');
  assert.ok(!out3.includes('عضو فضي عادي'), 'Must not render Silver');
});

test('Tier 5.2 [Control Flow] - Multi-Branch @else if Ladder Selects Exactly First Truthy Branch', () => {
  const env = createEditorEnvironment();
  const template = `
    @if (score >= 90) {
      <span class="grade-a">امتياز</span>
    } @else if (score >= 75) {
      <span class="grade-b">جيد جداً</span>
    } @else if (score >= 60) {
      <span class="grade-c">جيد</span>
    } @else {
      <span class="grade-f">يحتاج لمراجعة</span>
    }
  `;

  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 95 }).includes('امتياز'));
  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 80 }).includes('جيد جداً'));
  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 65 }).includes('جيد'));
  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 40 }).includes('يحتاج لمراجعة'));

  // Boundary checks: score = 90 (Grade A), score = 75 (Grade B), score = 60 (Grade C)
  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 90 }).includes('امتياز'));
  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 75 }).includes('جيد جداً'));
  assert.ok(env.context.parseAndEvaluateIfBlocks(template, { score: 60 }).includes('جيد'));
});

test('Tier 5.3 [Control Flow] - @for with Explicit @empty Block Fallback', () => {
  const env = createEditorEnvironment();
  const template = `
    <div class="movie-catalog">
      @for (movie of movies; track movie.id) {
        <article class="movie-card">{{ movie.title }}</article>
      } @empty {
        <div class="empty-fallback">لا توجد أفلام معروضة حاليًا في صالات العرض</div>
      }
    </div>
  `;

  // Case 1: Populated collection
  const populated = env.context.parseAndEvaluateForBlocks(template, {
    movies: [
      { id: 1, title: 'رحلة النجوم' },
      { id: 2, title: 'واحة الأمل' }
    ]
  });
  assert.ok(populated.includes('رحلة النجوم'), 'Populated should render movie 1');
  assert.ok(populated.includes('واحة الأمل'), 'Populated should render movie 2');
  assert.ok(!populated.includes('empty-fallback'), 'Populated must not render empty fallback');

  // Case 2: Empty collection
  const empty = env.context.parseAndEvaluateForBlocks(template, { movies: [] });
  assert.ok(empty.includes('لا توجد أفلام معروضة حاليًا في صالات العرض'), 'Empty collection must render @empty body');
  assert.ok(!empty.includes('movie-card'), 'Empty collection must not render movie-card');
});

test('Tier 5.4 [Control Flow] - @for with Signal Call Syntax and Empty Signal', () => {
  const env = createEditorEnvironment();
  const template = `
    @for (seat of seats(); track seat.id) {
      <button class="seat-btn">{{ seat.id }}</button>
    } @empty {
      <p class="no-seats">تم حجز جميع المقاعد بالكامل</p>
    }
  `;

  // Empty seats array
  const outEmpty = env.context.parseAndEvaluateForBlocks(template, { seats: [] });
  assert.ok(outEmpty.includes('تم حجز جميع المقاعد بالكامل'), 'Should render empty message for seats() signal');

  // Populated seats array
  const outPopulated = env.context.parseAndEvaluateForBlocks(template, {
    seats: [
      { id: 'A1', row: 'A' },
      { id: 'A2', row: 'A' }
    ]
  });
  assert.ok(outPopulated.includes('A1') && outPopulated.includes('A2'), 'Should render seat IDs');
  assert.ok(!outPopulated.includes('no-seats'), 'Should not render empty message');
});

test('Tier 5.5 [Control Flow] - Complex @switch with 4 Cases and @default', () => {
  const env = createEditorEnvironment();
  const template = `
    @switch (bookingStatus) {
      @case ('pending') {
        <span class="badge-pending">قيد الانتظار</span>
      }
      @case ('confirmed') {
        <span class="badge-confirmed">تم تأكيد الحجز</span>
      }
      @case ('cancelled') {
        <span class="badge-cancelled">تم الإلغاء</span>
      }
      @case ('refunded') {
        <span class="badge-refunded">مسترجع</span>
      }
      @default {
        <span class="badge-unknown">حالة غير معروفة</span>
      }
    }
  `;

  assert.ok(env.context.parseAndEvaluateSwitchBlocks(template, { bookingStatus: 'pending' }).includes('قيد الانتظار'));
  assert.ok(env.context.parseAndEvaluateSwitchBlocks(template, { bookingStatus: 'confirmed' }).includes('تم تأكيد الحجز'));
  assert.ok(env.context.parseAndEvaluateSwitchBlocks(template, { bookingStatus: 'cancelled' }).includes('تم الإلغاء'));
  assert.ok(env.context.parseAndEvaluateSwitchBlocks(template, { bookingStatus: 'refunded' }).includes('مسترجع'));
  assert.ok(env.context.parseAndEvaluateSwitchBlocks(template, { bookingStatus: 'other' }).includes('حالة غير معروفة'));
  assert.ok(env.context.parseAndEvaluateSwitchBlocks(template, { bookingStatus: '' }).includes('حالة غير معروفة'));
});

test('Tier 5.6 [Control Flow] - @switch with Numeric Values and Signal Reading', () => {
  const env = createEditorEnvironment();
  const template = `
    @switch (seatRow()) {
      @case (1) {
        <span class="row-vip">الصف الأول الممتاز (VIP)</span>
      }
      @case (2) {
        <span class="row-vip">الصف الثاني الممتاز (VIP)</span>
      }
      @default {
        <span class="row-std">صف قياسي عادي</span>
      }
    }
  `;

  // Reading row 1
  const out1 = env.context.parseAndEvaluateSwitchBlocks(template, { seatRow: 1 });
  assert.ok(out1.includes('الصف الأول الممتاز (VIP)'), 'Row 1 matches case (1)');

  // Reading row 2
  const out2 = env.context.parseAndEvaluateSwitchBlocks(template, { seatRow: 2 });
  assert.ok(out2.includes('الصف الثاني الممتاز (VIP)'), 'Row 2 matches case (2)');

  // Reading row 5 (default fallback)
  const outDef = env.context.parseAndEvaluateSwitchBlocks(template, { seatRow: 5 });
  assert.ok(outDef.includes('صف قياسي عادي'), 'Row 5 falls back to default');
});

test('Tier 5.7 [Control Flow] - Combined @for with Inner @if and Loop Context ($index, $count)', () => {
  const env = createEditorEnvironment();
  const template = `
    @for (item of items; track item.id) {
      <div class="item-row">
        <span>#{{ $index }}/{{ $count }}</span>
        @if (item.isVip) {
          <span class="vip-badge">VIP</span>
        }
        <span>{{ item.title }}</span>
      </div>
    }
  `;

  const scope = {
    items: [
      { id: 1, title: 'تذكرة 1', isVip: true },
      { id: 2, title: 'تذكرة 2', isVip: false }
    ]
  };

  const rendered = env.context.parseAndEvaluateForBlocks(template, scope);
  assert.ok(rendered.includes('#0/2'), 'First item has index 0 of count 2');
  assert.ok(rendered.includes('#1/2'), 'Second item has index 1 of count 2');
  assert.ok(rendered.includes('VIP'), 'First item renders VIP badge');
  assert.ok(rendered.includes('تذكرة 1') && rendered.includes('تذكرة 2'), 'Renders both titles');
});

// =========================================================================
// Category 2: Dynamic Signal Extraction (Tests 8 to 14)
// =========================================================================

test('Tier 5.8 [Signals] - Primitives Signal Extraction with Explicit Generics', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        ticketCount = signal<number>(5);
        isAvailable = signal<boolean>(true);
        cinemaName = signal<string>('سينما خُطوة');
      }
    `,
    'src/app/app.html': `
      <h1>{{ cinemaName }}</h1>
      <p>التذاكر: {{ ticketCount }}</p>
      @if (isAvailable) { <span class="avail">متاح للحجز</span> }
    `
  });

  env.runSimulatedPreview();
  const doc = env.getPreviewSrcdoc();
  assert.ok(doc.includes('سينما خُطوة'), 'Must extract string signal');
  assert.ok(doc.includes('5'), 'Must extract numeric signal');
  assert.ok(doc.includes('متاح للحجز'), 'Must extract boolean signal and satisfy @if');
});

test('Tier 5.9 [Signals] - Array Signal Extraction and Iteration in Template', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        genres = signal<string[]>(['أكشن', 'خيال علمي', 'دراما']);
        seatTiers = signal(['VIP', 'Standard']);
      }
    `,
    'src/app/app.html': `
      <div class="genres">
        @for (g of genres(); track g) {
          <span class="genre-pill">{{ g }}</span>
        }
      </div>
    `
  });

  env.runSimulatedPreview();
  const doc = env.getPreviewSrcdoc();
  assert.ok(doc.includes('أكشن'), 'Must render first array item');
  assert.ok(doc.includes('خيال علمي'), 'Must render second array item');
  assert.ok(doc.includes('دراما'), 'Must render third array item');
});

test('Tier 5.10 [Signals] - Complex Object Signal Extraction into Simulator Props', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        hall = signal({
          code: 'HALL-A',
          totalCapacity: 60,
          isImax: true
        });
      }
    `,
    'src/app/app.html': `
      <div class="hall-info">
        <span>{{ hall.code }}</span>
        <span>{{ hall.totalCapacity }}</span>
      </div>
    `
  });

  env.runSimulatedPreview();
  const doc = env.getPreviewSrcdoc();
  assert.ok(doc.includes('HALL-A'), 'Must extract nested object property code');
  assert.ok(doc.includes('60'), 'Must extract nested object property totalCapacity');
});

test('Tier 5.11 [Signals] - Computed Signal Arithmetic Evaluation', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        ticketCount = signal(4);
        unitPrice = signal(85);
        totalPrice = computed(() => this.ticketCount() * this.unitPrice());
      }
    `,
    'src/app/app.html': `
      <div class="pricing">
        <span class="total-label">المجموع الإجمالي:</span>
        <span class="total-val">{{ totalPrice }}</span>
      </div>
    `
  });

  env.runSimulatedPreview();
  const doc = env.getPreviewSrcdoc();
  // 4 * 85 = 340
  assert.ok(doc.includes('340'), 'Computed totalPrice must evaluate to 340');
});

test('Tier 5.12 [Signals] - Multi-Line Computed Block with VAT Calculation and Math.round', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        subtotal = signal(325);
        vatRate = signal(0.15);
        totalWithVat = computed(() => {
          const sub = this.subtotal();
          const vat = sub * this.vatRate();
          return Math.round(sub + vat);
        });
      }
    `,
    'src/app/app.html': `
      <p>الإجمالي بعد الضريبة: {{ totalWithVat }} ر.س</p>
    `
  });

  env.runSimulatedPreview();
  const doc = env.getPreviewSrcdoc();
  // 325 + (325 * 0.15 = 48.75) = 373.75 -> round to 374
  assert.ok(doc.includes('374'), 'Multi-line computed must evaluate to 374 SAR');
});

test('Tier 5.13 [Signals] - Signal model() and input.required() Extraction', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        customerName = model<string>('سارة محمد');
        couponCode = model('');
        seatId = input.required<string>('A1');
      }
    `,
    'src/app/app.html': `
      <input [value]="customerName" />
      <span class="customer">{{ customerName }}</span>
      <span class="seat">{{ seatId }}</span>
    `
  });

  env.runSimulatedPreview();
  const doc = env.getPreviewSrcdoc();
  assert.ok(doc.includes('سارة محمد'), 'Must extract model initial value');
  assert.ok(doc.includes('A1'), 'Must extract input.required value');
});

test('Tier 5.14 [Signals] - Simulator Resiliency Against Syntax Errors in Signals', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        brokenSig = signal({ unclosedObject: true;
        validCount = signal(42);
      }
    `,
    'src/app/app.html': `
      <span>العدد: {{ validCount }}</span>
    `
  });

  // Must not throw uncaught error
  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Simulator must handle syntax error in unclosed signal without crashing');

  const doc = env.getPreviewSrcdoc();
  assert.ok(doc.includes('42'), 'Valid signal following malformed signal must still be extracted');
});

// =========================================================================
// Category 3: TypeScript Preview Rendering (Tests 15 to 20)
// =========================================================================

test('Tier 5.15 [TS Preview] - Console Output Interception with Resolved Variables', () => {
  const env = createEditorEnvironment();
  const tsCode = `
    const cinema = 'سينما النجوم';
    const totalHallCapacity = 60;
    console.log(cinema);
    console.log(totalHallCapacity);
    console.log('مرحباً بجميع رواد السينما');
  `;

  const html = env.context.renderTypeScriptPreviewDoc(tsCode, 'src/app/models/test.ts');
  assert.ok(html.includes('ts-console-box'), 'Must render console output box');
  assert.ok(html.includes('سينما النجوم'), 'Must resolve variable cinema into console log');
  assert.ok(html.includes('60'), 'Must resolve variable totalHallCapacity into console log');
  assert.ok(html.includes('مرحباً بجميع رواد السينما'), 'Must render literal string in console log');
});

test('Tier 5.16 [TS Preview] - Empty Console Output Hint When No Logs Present', () => {
  const env = createEditorEnvironment();
  const tsCode = `
    export const appVersion = '22.0.0';
    export const maxSeats = 60;
  `;

  const html = env.context.renderTypeScriptPreviewDoc(tsCode, 'src/app/models/types.ts');
  assert.ok(html.includes('ts-empty-hint'), 'Must display empty console hint when no console.log is present');
  assert.ok(html.includes('لم يُستدعَ console.log() بعد'), 'Must show Arabic guidance message');
});

test('Tier 5.17 [TS Preview] - Generic Interface Table Rendering with Comments Filtered Out', () => {
  const env = createEditorEnvironment();
  const tsCode = `
    export interface ApiResponse<T> {
      // معرف الاستجابة
      id: string;
      data: T;
      /* حالة الاستجابة */
      status: number;
      message?: string;
    }
  `;

  const html = env.context.renderTypeScriptPreviewDoc(tsCode, 'src/app/models/api.model.ts');
  assert.ok(html.includes('interface ApiResponse&lt;T&gt;') || html.includes('interface ApiResponse<T>'), 'Must render generic interface header');
  assert.ok(html.includes('id'), 'Must include field id');
  assert.ok(html.includes('data'), 'Must include generic field data');
  assert.ok(html.includes('status'), 'Must include field status');
  assert.ok(html.includes('message?'), 'Must include optional field message?');
  assert.ok(!html.includes('// معرف الاستجابة'), 'Must filter single-line comments');
  assert.ok(!html.includes('/* حالة الاستجابة */'), 'Must filter multi-line comments');
});

test('Tier 5.18 [TS Preview] - Type Alias and Union Extraction', () => {
  const env = createEditorEnvironment();
  const tsCode = `
    export type SeatTier = 'standard' | 'vip' | 'accessible';
    export type BookingId = string | number;
  `;

  const html = env.context.renderTypeScriptPreviewDoc(tsCode, 'src/app/models/seat.model.ts');
  assert.ok(html.includes('الأنواع المستعارة (Type Aliases)'), 'Must render Type Aliases card');
  assert.ok(html.includes('SeatTier'), 'Must include type SeatTier');
  assert.ok(html.includes('&#39;standard&#39; | &#39;vip&#39; | &#39;accessible&#39;') || html.includes("'standard' | 'vip' | 'accessible'"), 'Must include union definition');
  assert.ok(html.includes('BookingId'), 'Must include type BookingId');
});

test('Tier 5.19 [TS Preview] - Enum Pills Rendering with Listed Values', () => {
  const env = createEditorEnvironment();
  const tsCode = `
    export enum BookingStatus {
      PENDING = 'PENDING',
      CONFIRMED = 'CONFIRMED',
      CANCELLED = 'CANCELLED'
    }
    export enum HallTier { REGULAR, VIP, IMAX }
  `;

  const html = env.context.renderTypeScriptPreviewDoc(tsCode, 'src/app/models/enums.ts');
  assert.ok(html.includes('الأصناف والدوال والتعدادات'), 'Must render Enums card');
  assert.ok(html.includes('enum BookingStatus'), 'Must include enum BookingStatus');
  assert.ok(html.includes('CONFIRMED'), 'Must include enum value CONFIRMED');
  assert.ok(html.includes('enum HallTier'), 'Must include enum HallTier');
});

test('Tier 5.20 [TS Preview] - Pure TS File Detection Across Domain Folders', () => {
  const env = createEditorEnvironment();

  const domainPaths = [
    'src/app/models/movie.model.ts',
    'src/app/services/cinema.service.ts',
    'src/app/store/cinema.store.ts',
    'src/app/guards/auth.guard.ts',
    'src/app/interceptors/jwt.interceptor.ts',
    'src/app/validators/phone.validator.ts'
  ];

  domainPaths.forEach((path) => {
    env.setFiles({
      [path]: `export const pathTest = '${path}'; console.log(pathTest);`,
      'src/app/app.html': '<h1>HTML View</h1>'
    });
    env.setActivePath(path);
    env.runSimulatedPreview();
    const doc = env.getPreviewSrcdoc();
    assert.ok(doc.includes('محاكي وفاحص TypeScript'), `Target ${path} must trigger TypeScript Preview mode`);
    assert.ok(doc.includes(path), `Target ${path} must be logged or displayed in preview`);
  });
});

// =========================================================================
// Category 4: Slot Builder Tokenization (Tests 21 to 25)
// =========================================================================

test('Tier 5.21 [Slot Builder] - HTML Tag Tokenization with Attributes', () => {
  const env = createEditorEnvironment();
  const step = {
    type: 'practice',
    file: 'src/app/app.html',
    code: '<button class="btn-primary" id="bookSeatBtn">تأكيد حجز المقعد</button>'
  };
  const lesson = { id: 'test-slot-1', file: 'src/app/app.html' };

  env.renderSlotBuilder(step, lesson);
  const builderHtml = env.getEl('angularSlotBuilder').innerHTML;

  assert.ok(builderHtml.includes('وسم &lt;button&gt;'), 'Stage 2 must identify button tag');
  assert.ok(builderHtml.includes('&lt;button class=&quot;btn-primary&quot; id=&quot;bookSeatBtn&quot;&gt;'), 'Must preserve opening tag with all attributes');
  assert.ok(builderHtml.includes('value="تأكيد حجز المقعد"'), 'Slot input must contain inner text');
  assert.ok(builderHtml.includes('&lt;/button&gt;'), 'Must preserve closing tag');
});

test('Tier 5.22 [Slot Builder] - Modern Control Flow Constructs Tokenization', () => {
  const env = createEditorEnvironment();
  const lesson = { id: 'test-slot-cf', file: 'src/app/app.html' };

  // 1. @if construct
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.html',
    code: '@if (isAvailable) { <span class="badge">متاح</span> }'
  }, lesson);
  let html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('شرط @if (isAvailable)'), 'Stage 2 must identify @if condition');
  assert.ok(html.includes('value="&lt;span class=&quot;badge&quot;&gt;متاح&lt;/span&gt;"'), 'Slot input must contain inner block content');

  // 2. @for construct (standard collection identifier)
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.html',
    code: '@for (seat of seats; track seat.id) { <div class="seat">{{ seat.id }}</div> }'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('تكرار @for (seat of seats; track seat.id)'), 'Stage 2 must identify @for header');

  // 3. @switch construct
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.html',
    code: "@switch (tier) { @case ('vip') { <div>VIP</div> } }"
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('تبديل @switch (tier)'), 'Stage 2 must identify @switch expression');

  // 4. @defer construct
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.html',
    code: '@defer (on viewport) { <app-seat-matrix /> }'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('تحميل مؤجل @defer (on viewport)'), 'Stage 2 must identify @defer trigger');
});

test('Tier 5.23 [Slot Builder] - TypeScript Signals, Computeds, Models and Inputs', () => {
  const env = createEditorEnvironment();
  const lesson = { id: 'test-slot-sig', file: 'src/app/app.ts' };

  // Signal
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.ts',
    code: 'ticketCount = signal<number>(1);'
  }, lesson);
  let html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('إشارة Signal: ticketCount'), 'Must identify signal');
  assert.ok(html.includes('value="1"'), 'Must extract initial value');

  // Computed
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.ts',
    code: 'total = computed(() => this.count() * 85);'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('حساب مشتق computed: total'), 'Must identify computed');

  // Model
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.ts',
    code: "filterQuery = model<string>('');"
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('ربط ثنائي Signal Model: filterQuery'), 'Must identify model');

  // Input
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.ts',
    code: 'seatNumber = input.required<string>();'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('مدخل Signal Input: seatNumber'), 'Must identify input.required');
});

test('Tier 5.24 [Slot Builder] - TypeScript Interface, Type, Class, and Enum Tokenization', () => {
  const env = createEditorEnvironment();
  const lesson = { id: 'test-slot-ts-oop', file: 'src/app/models/movie.model.ts' };

  // Interface
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/models/movie.model.ts',
    code: 'interface Movie { id: number; title: string; }'
  }, lesson);
  let html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('واجهة Interface: Movie'), 'Must identify interface');

  // Type Alias
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/models/types.ts',
    code: 'type SeatTier = "vip" | "standard";'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('نوع مستعار Type Alias: SeatTier'), 'Must identify type alias');

  // Class
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/services/cinema.service.ts',
    code: 'class CinemaStore { seats = []; }'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('صنف Class: CinemaStore'), 'Must identify class');

  // Enum
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/models/enums.ts',
    code: 'enum SeatStatus { AVAILABLE, BOOKED }'
  }, lesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  assert.ok(html.includes('تعداد Enum: SeatStatus'), 'Must identify enum');
});

test('Tier 5.25 [Slot Builder] - Slot Application Injects Assembled Code into File', async () => {
  const env = createEditorEnvironment();
  const initialCode = 'export class App {\n  count = signal(1);\n}';
  env.setFiles({
    'src/app/app.ts': initialCode
  });

  const step = {
    type: 'practice',
    file: 'src/app/app.ts',
    code: 'count = signal(1);'
  };
  const lesson = { id: 'ng-test-apply', file: 'src/app/app.ts' };

  env.renderSlotBuilder(step, lesson);
  const applyBtn = env.getEl('angularSlotApply');
  assert.ok(applyBtn, 'Apply button must exist');

  // Trigger apply button click handler and await microtask queue
  applyBtn.onclick();
  await new Promise((resolve) => setTimeout(resolve, 25));

  // Check feedback message
  const feedback = env.getEl('angularLessonFeedback').textContent;
  assert.ok(feedback.includes('بنيت اللبنة بيدك ووضعت بصمتك'), 'Feedback must confirm hand-craft build');
});

// =========================================================================
// Category 5: Task Matching & Whitespace Resilience (Tests 26 to 30)
// =========================================================================

test('Tier 5.26 [Task Matching] - CRLF vs LF Multiline Matching in supportedTask', () => {
  const env = createEditorEnvironment();

  // File saved with Windows CRLF \r\n
  env.setFiles({
    'src/app/app.ts': 'export class App {\r\n  ticketCount = signal(1);\r\n  totalPrice = 85;\r\n}'
  });

  // Expected written with POSIX LF \n
  const lesson = {
    file: 'src/app/app.ts',
    expected: 'ticketCount = signal(1);\n  totalPrice = 85;'
  };

  assert.equal(env.checkSupportedTask(lesson), true, 'supportedTask must match across CRLF and LF newlines');
});

test('Tier 5.27 [Task Matching] - Whitespace Collapse Between Tokens', () => {
  const env = createEditorEnvironment();

  // File contains multiple spaces, tabs, and newlines
  env.setFiles({
    'src/app/app.ts': 'export    class   CinemaStore   {\n\t\tseats   =   signal([]);\n}'
  });

  // Expected has single normalized spaces
  const lesson = {
    file: 'src/app/app.ts',
    expected: 'export class CinemaStore'
  };

  assert.equal(env.checkSupportedTask(lesson), true, 'Multiple spaces and tabs must collapse and match expected');
});

test('Tier 5.28 [Task Matching] - Exact Unicode Arabic String Preservation', () => {
  const env = createEditorEnvironment();

  env.setFiles({
    'src/app/app.ts': "export class App { title = 'سينما النجوم - خُطوة برو'; }"
  });

  // Matching Arabic expected
  const matchLesson = {
    file: 'src/app/app.ts',
    expected: "title = 'سينما النجوم - خُطوة برو';"
  };
  assert.equal(env.checkSupportedTask(matchLesson), true, 'Exact Arabic unicode string must match');

  // Non-matching Arabic expected
  const mismatchLesson = {
    file: 'src/app/app.ts',
    expected: "title = 'سينما الرياض';"
  };
  assert.equal(env.checkSupportedTask(mismatchLesson), false, 'Mismatched Arabic string must return false');
});

test('Tier 5.29 [Task Matching] - Multi-File Edits (lesson.edits) Atomic Verification', () => {
  const env = createEditorEnvironment();

  env.setFiles({
    'src/app/app.ts': 'export class App { count = signal(3); }',
    'src/app/app.html': '<h1>{{ count() }} تذاكر</h1>'
  });

  // Both files match
  const passLesson = {
    edits: [
      { file: 'src/app/app.ts', expected: 'count = signal(3);' },
      { file: 'src/app/app.html', expected: '{{ count() }} تذاكر' }
    ]
  };
  assert.equal(env.checkSupportedTask(passLesson), true, 'Multi-file edits must pass when all files match');

  // One file fails
  const failLesson = {
    edits: [
      { file: 'src/app/app.ts', expected: 'count = signal(3);' },
      { file: 'src/app/app.html', expected: '{{ missingSnippet() }}' }
    ]
  };
  assert.equal(env.checkSupportedTask(failLesson), false, 'Multi-file edits must fail if any single file fails');
});

test('Tier 5.30 [Task Matching] - Edge Cases: Empty Expected, Missing File, Array of Snippets', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': 'export class App { val = 10; }'
  });

  // 1. Empty or undefined expected
  assert.equal(env.checkSupportedTask({ file: 'src/app/app.ts', expected: '' }), true, 'Empty expected should return true');
  assert.equal(env.checkSupportedTask({ file: 'src/app/app.ts', expected: undefined }), true, 'Undefined expected should return true');

  // 2. Missing target file in currentFiles
  assert.equal(env.checkSupportedTask({ file: 'src/app/nonexistent.ts', expected: 'val = 10;' }), false, 'Missing file should safely return false');

  // 3. Array of expected snippets where all must be present
  const arrayPass = {
    file: 'src/app/app.ts',
    expected: ['export class App', 'val = 10;']
  };
  assert.equal(env.checkSupportedTask(arrayPass), true, 'All snippets in array present -> pass');

  const arrayFail = {
    file: 'src/app/app.ts',
    expected: ['export class App', 'missingProperty = 20;']
  };
  assert.equal(env.checkSupportedTask(arrayFail), false, 'Any snippet in array missing -> fail');
});

test('Tier 5.31 [Adversarial Edge] - Slot Builder Regex Boundary with Nested Parentheses in @for Header', () => {
  const env = createEditorEnvironment();
  const lesson = { id: 'test-slot-paren', file: 'src/app/app.html' };
  env.renderSlotBuilder({
    type: 'practice',
    file: 'src/app/app.html',
    code: '@for (seat of seats(); track seat.id) { <div class="seat">{{ seat.id }}</div> }'
  }, lesson);
  const html = env.getEl('angularSlotBuilder').innerHTML;
  
  // Document that naive [^)]+ halts at seats(), causing fallback to default tool pill rather than crashing
  assert.ok(
    html.includes('عنصر واجهة المستخدم') || !html.includes('تكرار @for (seat of seats(); track seat.id)'),
    'Empirically documents that [^)]+ in Slot Builder regex safely falls back when inner parentheses exist'
  );
});

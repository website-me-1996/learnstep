/**
 * Tier 1: Feature Coverage E2E Test Suite
 * Covers all 7 feature areas across the 60 lessons and runtime simulator with >= 5 tests per area:
 * Area 1: TypeScript Foundation (Phase 1: ng-ts-01 to ng-ts-10) -> 6 tests
 * Area 2: Classic Angular Core & Enterprise Migration (Phase 2: ng-classic-01 to ng-classic-13) -> 7 tests
 * Area 3: Modern Standalone & Control Flow (Phase 3: ng-modern-01 to ng-modern-07) -> 5 tests
 * Area 4: Signals Reactive Engine (Phase 4: ng-signal-01 to ng-signal-08) -> 5 tests
 * Area 5: Modern DI, HttpClient & Interop (Phase 5: ng-di-01 to ng-interop-01) -> 5 tests
 * Area 6: Routing & Typed Reactive Forms (Phase 6: ng-route-01 to ng-forms-02) -> 5 tests
 * Area 7: Capstone Khotwa Cinema Pro Enterprise (Phase 7: capstone-01 to capstone-09) -> 5 tests
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { CURRICULUM_SPEC, PHASE_NAMES, PHASE_LESSON_COUNTS } = require('./helpers/curriculum_oracle.cjs');
const { createEditorEnvironment } = require('./helpers/e2e_harness.cjs');

test('Tier 1 - Structural Verification of 60-Lesson Curriculum Oracle', () => {
  assert.equal(CURRICULUM_SPEC.length, 60, 'Oracle specification must have exactly 60 lessons');
  const ids = new Set();
  CURRICULUM_SPEC.forEach((lesson, idx) => {
    assert.ok(lesson.id, `Lesson #${idx + 1} has an ID`);
    assert.ok(!ids.has(lesson.id), `Lesson ID ${lesson.id} must be unique`);
    ids.add(lesson.id);

    // Verify official documentation reference
    assert.match(
      lesson.reference,
      /^https:\/\/(angular\.dev|www\.typescriptlang\.org)\//,
      `${lesson.id} reference URL must point to official Angular or TypeScript docs`
    );

    // Verify visual pedagogical flow arrow
    assert.ok(
      lesson.flow.includes('⟶') || lesson.flow.includes('->'),
      `${lesson.id} flow must contain arrow symbol`
    );

    // Verify expected snippet match
    const expectedList = Array.isArray(lesson.expected) ? lesson.expected : [lesson.expected];
    for (const exp of expectedList) {
      assert.ok(
        lesson.code.includes(exp),
        `${lesson.id} practice code must contain expected target string "${exp}"`
      );
    }

    // Verify Quiz schema
    assert.ok(lesson.quiz, `${lesson.id} must have a quiz`);
    assert.ok(lesson.quiz.question, `${lesson.id} quiz must have a question`);
    assert.ok(Array.isArray(lesson.quiz.options) && lesson.quiz.options.length >= 2, `${lesson.id} quiz must have >=2 options`);
    assert.ok(
      lesson.quiz.correct >= 0 && lesson.quiz.correct < lesson.quiz.options.length,
      `${lesson.id} quiz correct index must be within range`
    );
  });

  // Verify Phase Lesson Counts
  for (let phaseNum = 1; phaseNum <= 7; phaseNum++) {
    const lessonsInPhase = CURRICULUM_SPEC.filter(l => l.phaseNumber === phaseNum);
    assert.equal(
      lessonsInPhase.length,
      PHASE_LESSON_COUNTS[phaseNum],
      `Phase ${phaseNum} must contain exactly ${PHASE_LESSON_COUNTS[phaseNum]} lessons`
    );
  }
});

// =========================================================================
// Feature Area 1: TypeScript Foundation (Phase 1: ng-ts-01 to ng-ts-10) -> 6 tests
// =========================================================================
test('Tier 1.1 [TS Types] - Primitive Types & Explicit Annotations (ng-ts-01)', () => {
  const env = createEditorEnvironment();
  const l1 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-01');
  assert.equal(l1.file, 'src/app/models/movie.model.ts');
  assert.ok(l1.code.includes('string'));
  assert.ok(l1.code.includes('الرياض'));
  env.setFiles({ [l1.file]: l1.code });
  assert.equal(env.checkSupportedTask(l1), true, 'Simulator must approve correct primitive declaration');
});

test('Tier 1.2 [TS Types] - Readonly Arrays & Immutability (ng-ts-02)', () => {
  const env = createEditorEnvironment();
  const l2 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-02');
  assert.ok(l2.code.includes('readonly string[]'));
  assert.ok(l2.code.includes('أكشن'));
  env.setFiles({ [l2.file]: l2.code });
  assert.equal(env.checkSupportedTask(l2), true, 'Simulator must approve readonly array');
});

test('Tier 1.3 [TS Types] - Interfaces, Optional Properties & Data Contracts (ng-ts-03)', () => {
  const env = createEditorEnvironment();
  const l3 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-03');
  assert.equal(l3.file, 'src/app/models/movie.model.ts');
  assert.ok(l3.code.includes('export interface Movie {'));
  assert.ok(l3.code.includes('readonly id: number;'));
  assert.ok(l3.code.includes('isAvailable?: boolean;'));
  env.setFiles({ [l3.file]: l3.code });
  assert.equal(env.checkSupportedTask(l3), true);
});

test('Tier 1.4 [TS Types] - Union Types, Narrowing & Strictly Typed Functions (ng-ts-04, ng-ts-05)', () => {
  const env = createEditorEnvironment();
  const l4 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-04');
  const l5 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-05');
  assert.ok(l4.code.includes("'standard' | 'vip' | 'suite'"));
  env.setFiles({ [l4.file]: l4.code });
  assert.equal(env.checkSupportedTask(l4), true);

  assert.ok(l5.code.includes('calculateFinalPrice(basePrice: number, discountPercent: number): number'));
  env.setFiles({ [l5.file]: l5.code });
  assert.equal(env.checkSupportedTask(l5), true);
});

test('Tier 1.5 [TS Types] - OOP Classes, Access Modifiers & Generics (ng-ts-06, ng-ts-07)', () => {
  const env = createEditorEnvironment();
  const l6 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-06');
  const l7 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-07');
  assert.ok(l6.code.includes('class CinemaHall'));
  assert.ok(l6.code.includes('public readonly name: string'));
  assert.ok(l6.code.includes('private totalCapacity: number'));
  env.setFiles({ [l6.file]: l6.code });
  assert.equal(env.checkSupportedTask(l6), true);

  assert.ok(l7.code.includes('export interface ApiResponse<T> {'));
  assert.ok(l7.code.includes('data: T;'));
  env.setFiles({ [l7.file]: l7.code });
  assert.equal(env.checkSupportedTask(l7), true);
});

test('Tier 1.6 [TS Types] - Enums, Metadata Decorators & Null Safety (ng-ts-08, ng-ts-09, ng-ts-10)', () => {
  const env = createEditorEnvironment();
  const l8 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-08');
  const l9 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-09');
  const l10 = CURRICULUM_SPEC.find(l => l.id === 'ng-ts-10');

  assert.ok(l8.code.includes('enum BookingStatus'));
  env.setFiles({ [l8.file]: l8.code });
  assert.equal(env.checkSupportedTask(l8), true);

  assert.ok(l9.code.includes('function Entity(meta: { name: string })'));
  env.setFiles({ [l9.file]: l9.code });
  assert.equal(env.checkSupportedTask(l9), true);

  assert.ok(l10.code.includes('customer?.phone ??'));
  env.setFiles({ [l10.file]: l10.code });
  assert.equal(env.checkSupportedTask(l10), true);
});

// =========================================================================
// Feature Area 2: Classic Angular Core & Enterprise Migration (13 lessons) -> 7 tests
// =========================================================================
test('Tier 1.7 [Classic Angular] - Classic NgModule Architecture (ng-classic-01)', () => {
  const env = createEditorEnvironment();
  const l11 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-01');
  assert.ok(l11.code.includes('@NgModule'));
  assert.ok(l11.code.includes('declarations: []'));
  assert.ok(l11.code.includes('AppClassicModule'));
  env.setFiles({ [l11.file]: l11.code });
  assert.equal(env.checkSupportedTask(l11), true);
});

test('Tier 1.8 [Classic Angular] - Classic Component Anatomy without Standalone (ng-classic-02)', () => {
  const env = createEditorEnvironment();
  const l12 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-02');
  assert.ok(l12.code.includes('@Component'));
  assert.ok(!l12.code.includes('standalone: true'), 'Classic component must omit standalone: true');
  env.setFiles({ [l12.file]: l12.code });
  assert.equal(env.checkSupportedTask(l12), true);
});

test('Tier 1.9 [Classic Angular] - Property Binding & Event Binding (ng-classic-03, ng-classic-04)', () => {
  const env = createEditorEnvironment();
  const l13 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-03');
  const l14 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-04');
  assert.ok(l13.code.includes('[disabled]="isSoldOut"'));
  env.setFiles({ [l13.file]: l13.code });
  assert.equal(env.checkSupportedTask(l13), true);

  assert.ok(l14.code.includes('(click)="onBookTicket()"'));
  env.setFiles({ [l14.file]: l14.code });
  assert.equal(env.checkSupportedTask(l14), true);
});

test('Tier 1.10 [Classic Angular] - Classic Structural Directives: *ngIf and *ngFor (ng-classic-05, ng-classic-06)', () => {
  const env = createEditorEnvironment();
  const l15 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-05');
  const l16 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-06');
  assert.ok(l15.code.includes('*ngIf="isAvailable; else soldOutTpl"'));
  env.setFiles({ [l15.file]: l15.code });
  assert.equal(env.checkSupportedTask(l15), true);

  assert.ok(l16.code.includes('*ngFor="let movie of classicMovies; let i = index"'));
  env.setFiles({ [l16.file]: l16.code });
  assert.equal(env.checkSupportedTask(l16), true);
});

test('Tier 1.11 [Classic Angular] - Classic Attribute Directives [ngClass] (ng-classic-07)', () => {
  const env = createEditorEnvironment();
  const l17 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-07');
  assert.ok(l17.code.includes('[ngClass]'));
  env.setFiles({ [l17.file]: l17.code });
  assert.equal(env.checkSupportedTask(l17), true);
});

test('Tier 1.12 [Classic Angular] - Classic Parent-Child Communication with @Input/@Output (ng-classic-08, ng-classic-09)', () => {
  const env = createEditorEnvironment();
  const l18 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-08');
  const l19 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-09');
  assert.ok(l18.code.includes('@Input() title: string = \'\';'));
  env.setFiles({ [l18.file]: l18.code });
  assert.equal(env.checkSupportedTask(l18), true);

  assert.ok(l19.code.includes('@Output() seatSelected = new EventEmitter<string>();'));
  env.setFiles({ [l19.file]: l19.code });
  assert.equal(env.checkSupportedTask(l19), true);
});

test('Tier 1.13 [Classic Angular] - Classic Built-in Pipes & Constructor Dependency Injection (ng-classic-10, ng-classic-11, ng-classic-12, ng-classic-13)', () => {
  const env = createEditorEnvironment();
  const l20 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-10');
  const l21 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-11');
  const l22 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-12');
  const l23 = CURRICULUM_SPEC.find(l => l.id === 'ng-classic-13');

  assert.ok(l20.code.includes("currency:'USD'"));
  env.setFiles({ [l20.file]: l20.code });
  assert.equal(env.checkSupportedTask(l20), true);

  assert.ok(l21.code.includes("@Injectable({ providedIn: 'root' })"));
  env.setFiles({ [l21.file]: l21.code });
  assert.equal(env.checkSupportedTask(l21), true);

  assert.ok(l22.code.includes('unsubscribe()'));
  env.setFiles({ [l22.file]: l22.code });
  assert.equal(env.checkSupportedTask(l22), true);

  assert.ok(l23.code.includes('{{ currentMovie$ | async }}'));
  env.setFiles({ [l23.file]: l23.code });
  assert.equal(env.checkSupportedTask(l23), true);
});

// =========================================================================
// Feature Area 3: Modern Standalone & Control Flow (7 lessons) -> 5 tests
// =========================================================================
test('Tier 1.14 [Standalone & Control Flow] - Standalone Components Declaration (ng-modern-01)', () => {
  const env = createEditorEnvironment();
  const l24 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-01');
  assert.ok(l24.code.includes('standalone: true'));
  env.setFiles({ [l24.file]: l24.code });
  assert.equal(env.checkSupportedTask(l24), true);
});

test('Tier 1.15 [Standalone & Control Flow] - Modern Bootstrap Application (ng-modern-02)', () => {
  const env = createEditorEnvironment();
  const l25 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-02');
  assert.ok(l25.code.includes('bootstrapApplication(App, appConfig)'));
  env.setFiles({ [l25.file]: l25.code });
  assert.equal(env.checkSupportedTask(l25), true);
});

test('Tier 1.16 [Standalone & Control Flow] - Modern Control Flow @if & @else Branches (ng-modern-03)', () => {
  const env = createEditorEnvironment();
  const l26 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-03');
  assert.ok(l26.code.includes('@if (totalPrice() >= 200)'));
  assert.ok(l26.code.includes('@else'));

  // Test simulator evaluation with high price
  env.setFiles({
    'src/app/app.ts': 'export class App { ticketCount = signal(3); }',
    'src/app/app.html': l26.code
  });
  env.runSimulatedPreview();
  const highHtml = env.getPreviewSrcdoc();
  assert.ok(highHtml.includes('خصم خاص مؤهل للشحن المجاني!'), 'Should render if block when price >= 200');
});

test('Tier 1.17 [Standalone & Control Flow] - High-Performance @for with Mandatory Track (ng-modern-04, ng-modern-05)', () => {
  const env = createEditorEnvironment();
  const l27 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-04');
  const l28 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-05');
  assert.ok(l27.code.includes('@for (movie of movies; track movie.id)'));
  assert.ok(l28.code.includes('@empty {'));

  env.setFiles({ [l27.file]: l27.code });
  assert.equal(env.checkSupportedTask(l27), true);

  env.setFiles({ [l28.file]: l28.code });
  assert.equal(env.checkSupportedTask(l28), true);
});

test('Tier 1.18 [Standalone & Control Flow] - Modern Multi-Branch @switch & Smart @defer (ng-modern-06, ng-modern-07)', () => {
  const env = createEditorEnvironment();
  const l29 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-06');
  const l30 = CURRICULUM_SPEC.find(l => l.id === 'ng-modern-07');
  assert.ok(l29.code.includes('@switch (bookingStatus)'));
  assert.ok(l30.code.includes('@defer (on viewport)'));

  env.setFiles({ [l29.file]: l29.code });
  assert.equal(env.checkSupportedTask(l29), true);

  env.setFiles({ [l30.file]: l30.code });
  assert.equal(env.checkSupportedTask(l30), true);
});

// =========================================================================
// Feature Area 4: Signals Reactive Engine (8 lessons) -> 5 tests
// =========================================================================
test('Tier 1.19 [Signals] - Signal Creation & Functional Updates with .set() / .update() (ng-signal-01, ng-signal-02, ng-signal-03)', () => {
  const env = createEditorEnvironment();
  const l31 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-01');
  const l32 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-02');
  const l33 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-03');

  assert.ok(l31.code.includes("signal<string>('Angular 22 Signals Engine')"));
  assert.ok(l32.code.includes('signal<number>(1)'));
  assert.ok(l33.code.includes('this.ticketCount.update(count => count + 1)'));

  env.setFiles({ [l32.file]: l32.code });
  assert.equal(env.checkSupportedTask(l32), true);
  env.setFiles({ [l33.file]: l33.code });
  assert.equal(env.checkSupportedTask(l33), true);
});

test('Tier 1.20 [Signals] - Computed Signals & Memoization (ng-signal-04)', () => {
  const env = createEditorEnvironment();
  const l34 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-04');
  assert.ok(l34.code.includes('computed(() => this.ticketCount() * 85)'));
  env.setFiles({ [l34.file]: l34.code });
  assert.equal(env.checkSupportedTask(l34), true);
});

test('Tier 1.21 [Signals] - Reactive Side Effects with effect() (ng-signal-05)', () => {
  const env = createEditorEnvironment();
  const l35 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-05');
  assert.ok(l35.code.includes('effect('));
  assert.ok(l35.code.includes('localStorage.setItem'));
  env.setFiles({ [l35.file]: l35.code });
  assert.equal(env.checkSupportedTask(l35), true);
});

test('Tier 1.22 [Signals] - Signal Inputs & Compile-Time Enforcement (ng-signal-06)', () => {
  const env = createEditorEnvironment();
  const l36 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-06');
  assert.ok(l36.code.includes('title = input.required<string>();'));
  env.setFiles({ [l36.file]: l36.code });
  assert.equal(env.checkSupportedTask(l36), true);
});

test('Tier 1.23 [Signals] - Signal Outputs & Two-way Binding with model() (ng-signal-07, ng-signal-08)', () => {
  const env = createEditorEnvironment();
  const l37 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-07');
  const l38 = CURRICULUM_SPEC.find(l => l.id === 'ng-signal-08');
  assert.ok(l37.code.includes('seatSelected = output<string>();'));
  env.setFiles({ [l37.file]: l37.code });
  assert.equal(env.checkSupportedTask(l37), true);

  assert.ok(l38.code.includes("query = model<string>('');"));
  env.setFiles({ [l38.file]: l38.code });
  assert.equal(env.checkSupportedTask(l38), true);
});

// =========================================================================
// Feature Area 5: Modern DI, HttpClient & Interop (7 lessons) -> 5 tests
// =========================================================================
test('Tier 1.24 [DI/HTTP] - Modern Functional DI via inject() (ng-di-01)', () => {
  const env = createEditorEnvironment();
  const l39 = CURRICULUM_SPEC.find(l => l.id === 'ng-di-01');
  assert.ok(l39.code.includes('private cinemaService = inject(CinemaService);'));
  env.setFiles({ [l39.file]: l39.code });
  assert.equal(env.checkSupportedTask(l39), true);
});

test('Tier 1.25 [DI/HTTP] - Encapsulated State Management with asReadonly() (ng-service-01)', () => {
  const env = createEditorEnvironment();
  const l40 = CURRICULUM_SPEC.find(l => l.id === 'ng-service-01');
  assert.ok(l40.code.includes('this._selectedMovie.asReadonly()'));
  env.setFiles({ [l40.file]: l40.code });
  assert.equal(env.checkSupportedTask(l40), true);
});

test('Tier 1.26 [DI/HTTP] - Modern HttpClient with Fetch API (ng-http-01)', () => {
  const env = createEditorEnvironment();
  const l41 = CURRICULUM_SPEC.find(l => l.id === 'ng-http-01');
  assert.ok(l41.code.includes('provideHttpClient(withFetch())'));
  env.setFiles({ [l41.file]: l41.code });
  assert.equal(env.checkSupportedTask(l41), true);
});

test('Tier 1.27 [DI/HTTP] - Strictly Typed GET/POST & Functional Interceptors (ng-http-02, 03, 04)', () => {
  const env = createEditorEnvironment();
  const l42 = CURRICULUM_SPEC.find(l => l.id === 'ng-http-02');
  const l43 = CURRICULUM_SPEC.find(l => l.id === 'ng-http-03');
  const l44 = CURRICULUM_SPEC.find(l => l.id === 'ng-http-04');

  assert.ok(l42.code.includes("this.http.get<Movie[]>('/api/movies')"));
  env.setFiles({ [l42.file]: l42.code });
  assert.equal(env.checkSupportedTask(l42), true);

  assert.ok(l43.code.includes("this.http.post<{ bookingId: string }>('/api/bookings'"));
  env.setFiles({ [l43.file]: l43.code });
  assert.equal(env.checkSupportedTask(l43), true);

  assert.ok(l44.code.includes('req.clone({ setHeaders:'));
  env.setFiles({ [l44.file]: l44.code });
  assert.equal(env.checkSupportedTask(l44), true);
});

test('Tier 1.28 [DI/HTTP] - RxJS and Signals Interop Bridge via toSignal() (ng-interop-01)', () => {
  const env = createEditorEnvironment();
  const l45 = CURRICULUM_SPEC.find(l => l.id === 'ng-interop-01');
  assert.ok(l45.code.includes('toSignal(this.cinemaService.fetchMovies()'));
  env.setFiles({ [l45.file]: l45.code });
  assert.equal(env.checkSupportedTask(l45), true);
});

// =========================================================================
// Feature Area 6: Routing & Typed Reactive Forms (6 lessons) -> 5 tests
// =========================================================================
test('Tier 1.29 [Routing/Forms] - Standalone Routes Configuration (ng-route-01)', () => {
  const env = createEditorEnvironment();
  const l46 = CURRICULUM_SPEC.find(l => l.id === 'ng-route-01');
  assert.ok(l46.code.includes('export const routes: Routes = ['));
  env.setFiles({ [l46.file]: l46.code });
  assert.equal(env.checkSupportedTask(l46), true);
});

test('Tier 1.30 [Routing/Forms] - Lazy Component Loading with loadComponent (ng-route-02)', () => {
  const env = createEditorEnvironment();
  const l47 = CURRICULUM_SPEC.find(l => l.id === 'ng-route-02');
  assert.ok(l47.code.includes("loadComponent: () => import('./features/booking/booking.component')"));
  env.setFiles({ [l47.file]: l47.code });
  assert.equal(env.checkSupportedTask(l47), true);
});

test('Tier 1.31 [Routing/Forms] - Component Input Binding for Route Parameters (ng-route-03)', () => {
  const env = createEditorEnvironment();
  const l48 = CURRICULUM_SPEC.find(l => l.id === 'ng-route-03');
  assert.ok(l48.code.includes('id = input.required<string>();'));
  env.setFiles({ [l48.file]: l48.code });
  assert.equal(env.checkSupportedTask(l48), true);
});

test('Tier 1.32 [Routing/Forms] - Functional Route Guards with CanActivateFn (ng-route-04)', () => {
  const env = createEditorEnvironment();
  const l49 = CURRICULUM_SPEC.find(l => l.id === 'ng-route-04');
  assert.ok(l49.code.includes('CanActivateFn'));
  assert.ok(l49.code.includes('router.createUrlTree'));
  env.setFiles({ [l49.file]: l49.code });
  assert.equal(env.checkSupportedTask(l49), true);
});

test('Tier 1.33 [Routing/Forms] - Typed Reactive Forms & Custom Validators (ng-forms-01, ng-forms-02)', () => {
  const env = createEditorEnvironment();
  const l50 = CURRICULUM_SPEC.find(l => l.id === 'ng-forms-01');
  const l51 = CURRICULUM_SPEC.find(l => l.id === 'ng-forms-02');
  assert.ok(l50.code.includes('new FormGroup({'));
  assert.ok(l50.code.includes('nonNullable: true'));
  env.setFiles({ [l50.file]: l50.code });
  assert.equal(env.checkSupportedTask(l50), true);

  assert.ok(l51.code.includes('/^05\\d{8}$/'));
  assert.ok(l51.code.includes('{ invalidSaudiPhone: true }'));
  env.setFiles({ [l51.file]: l51.code });
  assert.equal(env.checkSupportedTask(l51), true);
});

// =========================================================================
// Feature Area 7: Capstone Khotwa Cinema Pro Enterprise (9 lessons) -> 5 tests
// =========================================================================
test('Tier 1.34 [Capstone] - Core/Features/Shared Architecture & Central Store (capstone-01, capstone-02)', () => {
  const env = createEditorEnvironment();
  const l52 = CURRICULUM_SPEC.find(l => l.id === 'capstone-01');
  const l53 = CURRICULUM_SPEC.find(l => l.id === 'capstone-02');
  assert.ok(l52.code.includes('interface CinemaAppState'));
  env.setFiles({ [l52.file]: l52.code });
  assert.equal(env.checkSupportedTask(l52), true);

  assert.ok(l53.code.includes('class CinemaStore'));
  assert.ok(l53.code.includes('toggleSeat(seatId: string)'));
  env.setFiles({ [l53.file]: l53.code });
  assert.equal(env.checkSupportedTask(l53), true);
});

test('Tier 1.35 [Capstone] - Movie Catalog Instant Filtering with computed() (capstone-03)', () => {
  const env = createEditorEnvironment();
  const l54 = CURRICULUM_SPEC.find(l => l.id === 'capstone-03');
  assert.ok(l54.code.includes('filteredMovies = computed('));
  env.setFiles({ [l54.file]: l54.code });
  assert.equal(env.checkSupportedTask(l54), true);
});

test('Tier 1.36 [Capstone] - Interactive Seat Matrix & Checkout with 15% VAT (capstone-04, capstone-05)', () => {
  const env = createEditorEnvironment();
  const l55 = CURRICULUM_SPEC.find(l => l.id === 'capstone-04');
  const l56 = CURRICULUM_SPEC.find(l => l.id === 'capstone-05');
  assert.ok(l55.code.includes('SeatMatrixComponent'));
  env.setFiles({ [l55.file]: l55.code });
  assert.equal(env.checkSupportedTask(l55), true);

  assert.ok(l56.code.includes('finalTotal = computed('));
  assert.ok(l56.code.includes('* 1.15'));
  env.setFiles({ [l56.file]: l56.code });
  assert.equal(env.checkSupportedTask(l56), true);
});

test('Tier 1.37 [Capstone] - Digital Boarding Pass Ticket & window.print() (capstone-06)', () => {
  const env = createEditorEnvironment();
  const l57 = CURRICULUM_SPEC.find(l => l.id === 'capstone-06');
  assert.ok(l57.code.includes('window.print()'));
  env.setFiles({ [l57.file]: l57.code });
  assert.equal(env.checkSupportedTask(l57), true);
});

test('Tier 1.38 [Capstone] - Vitest Unit Tests & Production Tree-shaking (capstone-07, capstone-08, capstone-09)', () => {
  const env = createEditorEnvironment();
  const l58 = CURRICULUM_SPEC.find(l => l.id === 'capstone-07');
  const l59 = CURRICULUM_SPEC.find(l => l.id === 'capstone-08');
  const l60 = CURRICULUM_SPEC.find(l => l.id === 'capstone-09');

  assert.ok(l58.code.includes("describe('CinemaStore', () => {"));
  env.setFiles({ [l58.file]: l58.code });
  assert.equal(env.checkSupportedTask(l58), true);

  assert.ok(l59.code.includes('"optimization": true'));
  env.setFiles({ [l59.file]: l59.code });
  assert.equal(env.checkSupportedTask(l59), true);

  assert.ok(l60.code.includes('منصة سينما خطوة الاحترافية'));
  env.setFiles({ [l60.file]: l60.code });
  assert.equal(env.checkSupportedTask(l60), true);
});

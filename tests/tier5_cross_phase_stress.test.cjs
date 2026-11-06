/**
 * Tier 5 Cross-Phase Stress Test Suite (Khotwa Angular 22)
 * File: tests/tier5_cross_phase_stress.test.cjs
 *
 * Authored by: Tier 5 Cross-Phase Stress Challenger (teamwork_challenger_final_2)
 *
 * Exhaustive independent end-to-end simulation of the student journey and architectural evolution
 * across all 7 progressive phases (60 modern lessons, indices 0 to 59):
 * 1. Global Curriculum Integrity & Schema Deep Stress (All 60 Lessons)
 * 2. Architectural Evolution & Token Progression Across 7 Phases
 * 3. End-to-End Cumulative Student Journey Simulation (State Transitions & Workspace Growth)
 * 4. Cross-Phase StarterFiles Compatibility & Enterprise Skeleton
 * 5. Simulator Preview Stability & Edge-Case Stress Across All 7 Phases
 * 6. Business Domain & Financial Arithmetic Stress (Capstone Logic)
 * 7. Full System Regression Verification
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { createEditorEnvironment, loadCourseData, ROOT_DIR } = require('./e2e/helpers/e2e_harness.cjs');
const { CURRICULUM_SPEC, PHASE_NAMES, PHASE_LESSON_COUNTS } = require('./e2e/helpers/curriculum_oracle.cjs');
const { CinemaStore, generate60SeatHall, calculateBookingCost, saudiPhoneValidator } = require('./e2e/helpers/cinema_simulator.cjs');

// Load live course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles, setActivePath, runSimulatedPreview, getPreviewSrcdoc, renderSlotBuilder, isAllowedPath } = env;

const modernLessons = courseData.lessons.slice(0, 60);

// =============================================================================
// SUITE 1: EXHAUSTIVE CURRICULUM INTEGRITY & SCHEMA DEEP STRESS (ALL 60 LESSONS)
// =============================================================================

test('Suite 1.1 - Total Lesson Count and Legacy Preservation', () => {
  assert.equal(courseData.version, '22', 'Course version must be "22"');
  assert.equal(courseData.lessons.length, 106, 'Course must preserve exactly 106 total lessons (60 modern + 46 legacy)');
  assert.equal(modernLessons.length, 60, 'Modern curriculum must contain exactly 60 lessons at indices 0 to 59');

  const legacyLessons = courseData.lessons.slice(60);
  assert.equal(legacyLessons.length, 46, 'Legacy portion must contain exactly 46 lessons');
  legacyLessons.forEach((legacy, idx) => {
    assert.ok(legacy.id, `Legacy lesson #${idx + 61} must have an id`);
    assert.ok(legacy.title, `Legacy lesson #${idx + 61} must have a title`);
  });
});

test('Suite 1.2 - All 7 Module Descriptors Validation', () => {
  const expectedModules = [
    { id: 'phase-1-typescript', count: 10, icon: '📘' },
    { id: 'phase-2-classic', count: 13, icon: '🏛️' },
    { id: 'phase-3-modern', count: 7, icon: '⚡' },
    { id: 'phase-4-signals', count: 8, icon: '📡' },
    { id: 'phase-5-di-http', count: 7, icon: '🌐' },
    { id: 'phase-6-routing-forms', count: 6, icon: '🚦' },
    { id: 'phase-7-capstone', count: 9, icon: '🎬' }
  ];

  let cumulativeCount = 0;
  expectedModules.forEach(em => {
    const mod = courseData.modules[em.id];
    assert.ok(mod, `Module ${em.id} must exist in courseData.modules`);
    assert.equal(mod.id, em.id, `Module ${em.id} id mismatch`);
    assert.ok(mod.title && mod.title.length >= 10, `Module ${em.id} must have a descriptive Arabic title`);
    assert.ok(mod.description && mod.description.length >= 20, `Module ${em.id} must have a descriptive Arabic description`);
    assert.equal(mod.icon, em.icon, `Module ${em.id} icon mismatch`);
    assert.ok(mod.badge && mod.badge.length >= 4, `Module ${em.id} must have a badge`);
    assert.equal(mod.lessonCount, em.count, `Module ${em.id} lessonCount must be ${em.count}`);
    cumulativeCount += mod.lessonCount;
  });

  assert.equal(cumulativeCount, 60, 'Sum of all 7 module lessonCounts must equal exactly 60');
});

test('Suite 1.3 - Complete 15-Field Schema Validation Across All 60 Modern Lessons', () => {
  const seenIds = new Set();
  const validLevels = new Set(['مبتدئ', 'متوسط', 'متقدم']);

  modernLessons.forEach((lesson, index) => {
    const pos = `Lesson index ${index} (id: ${lesson.id || 'unknown'})`;

    // 1. id
    assert.ok(lesson.id && typeof lesson.id === 'string', `${pos}: missing or invalid 'id'`);
    assert.ok(!seenIds.has(lesson.id), `${pos}: duplicate lesson id '${lesson.id}'`);
    seenIds.add(lesson.id);

    // 2. module
    assert.ok(lesson.module && typeof lesson.module === 'string', `${pos}: missing 'module'`);
    assert.ok(courseData.modules[lesson.module], `${pos}: module '${lesson.module}' not defined in modules dictionary`);

    // 3. phase
    assert.ok(lesson.phase && typeof lesson.phase === 'string' && lesson.phase.length >= 10, `${pos}: missing or short 'phase'`);

    // 4. title
    assert.ok(lesson.title && typeof lesson.title === 'string' && lesson.title.length >= 10, `${pos}: missing or short 'title'`);

    // 5. duration
    assert.ok(lesson.duration && typeof lesson.duration === 'string' && lesson.duration.includes('دقيقة'), `${pos}: invalid 'duration'`);

    // 6. level
    assert.ok(validLevels.has(lesson.level), `${pos}: level '${lesson.level}' not in ['مبتدئ', 'متوسط', 'متقدم']`);

    // 7. summary
    assert.ok(lesson.summary && typeof lesson.summary === 'string' && lesson.summary.length >= 30, `${pos}: missing or short 'summary'`);

    // 8. concept
    assert.ok(lesson.concept && typeof lesson.concept === 'string' && lesson.concept.length >= 120, `${pos}: missing or short 'concept'`);

    // 9. flow
    assert.ok(lesson.flow && typeof lesson.flow === 'string' && lesson.flow.includes('⟶'), `${pos}: flow must contain directional arrow '⟶'`);

    // 10. task
    assert.ok(lesson.task && typeof lesson.task === 'string' && lesson.task.length >= 15, `${pos}: missing or short 'task'`);

    // 11. file
    assert.ok(lesson.file && typeof lesson.file === 'string' && lesson.file.length >= 5, `${pos}: missing or invalid 'file'`);

    // 12. code
    assert.ok(lesson.code && typeof lesson.code === 'string' && lesson.code.length >= 10, `${pos}: missing or empty 'code'`);

    // 13. expected
    assert.ok(lesson.expected, `${pos}: missing 'expected'`);
    if (typeof lesson.expected === 'string') {
      assert.ok(lesson.code.includes(lesson.expected), `${pos}: lesson.code does not contain expected snippet`);
    } else if (Array.isArray(lesson.expected)) {
      assert.ok(lesson.expected.length > 0, `${pos}: expected array cannot be empty`);
      lesson.expected.forEach(exp => {
        assert.ok(lesson.code.includes(exp), `${pos}: lesson.code missing expected array token: ${exp}`);
      });
    } else {
      assert.fail(`${pos}: expected must be a string or string[]`);
    }

    // 14. reference
    assert.ok(lesson.reference && typeof lesson.reference === 'string', `${pos}: missing 'reference'`);
    assert.match(
      lesson.reference,
      /^https:\/\/(angular\.dev|www\.typescriptlang\.org)\//,
      `${pos}: reference must point to official Angular or TypeScript documentation`
    );

    // 15. steps
    assert.ok(Array.isArray(lesson.steps), `${pos}: 'steps' must be an array`);
    assert.equal(lesson.steps.length, 5, `${pos}: 'steps' must have exactly 5 micro-learning steps`);
  });
});

test('Suite 1.4 - Micro-learning 5-Step Integrity across 300 Steps (60 Lessons × 5 Steps)', () => {
  const expectedStepSequence = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const validStepTypes = new Set(['observe', 'build', 'edit', 'quiz']);

  modernLessons.forEach((lesson, lIdx) => {
    lesson.steps.forEach((step, sIdx) => {
      const stepPos = `Lesson ${lIdx} (${lesson.id}) step #${sIdx} (${step.id})`;
      assert.equal(step.id, expectedStepSequence[sIdx], `${stepPos}: step id mismatch`);
      assert.ok(step.title && step.title.length >= 4, `${stepPos}: step title missing or too short`);
      assert.ok(step.benefit && step.benefit.length >= 10, `${stepPos}: step benefit missing or too short`);
      assert.ok(validStepTypes.has(step.type), `${stepPos}: step type '${step.type}' not in valid types`);

      if (step.id === 'quiz') {
        assert.equal(step.type, 'quiz', `${stepPos}: quiz step type must be 'quiz'`);
        assert.ok(Array.isArray(step.options), `${stepPos}: quiz options must be an array`);
        assert.ok(step.options.length >= 2, `${stepPos}: quiz options must have at least 2 options`);
        assert.ok(
          typeof step.correct === 'number' && step.correct >= 0 && step.correct < step.options.length,
          `${stepPos}: quiz correct index out of bounds`
        );
      } else {
        assert.ok(step.explanation && step.explanation.length >= 15, `${stepPos}: step explanation missing or too short`);
        assert.ok(step.task && step.task.length >= 10, `${stepPos}: step task missing or too short`);
      }
    });
  });
});

// =============================================================================
// SUITE 2: ARCHITECTURAL EVOLUTION & TOKEN PROGRESSION ACROSS 7 PHASES
// =============================================================================

test('Suite 2.1 - Phase 1: TypeScript Foundation (Lessons 1-10 / Indices 0-9)', () => {
  const p1 = modernLessons.slice(0, 10);
  assert.equal(p1.length, 10);

  // Lesson 1: Primitives (ng-ts-01)
  assert.equal(p1[0].id, 'ng-ts-01');
  assert.ok(p1[0].code.includes('string'));
  assert.ok(p1[0].code.includes('الرياض'));

  // Lesson 2: Readonly Arrays (ng-ts-02)
  assert.equal(p1[1].id, 'ng-ts-02');
  assert.ok(p1[1].code.includes('readonly string[]'));

  // Lesson 3: Interfaces (ng-ts-03)
  assert.equal(p1[2].id, 'ng-ts-03');
  assert.ok(p1[2].code.includes('interface Movie'));
  assert.ok(p1[2].code.includes('readonly id: number'));

  // Lesson 4: Type Aliases & Unions (ng-ts-04)
  assert.equal(p1[3].id, 'ng-ts-04');
  assert.ok(p1[3].code.includes('type SeatTier'));
  assert.ok(p1[3].code.includes('standard') && p1[3].code.includes('vip'));

  // Lesson 5: Strictly Typed Functions (ng-ts-05)
  assert.equal(p1[4].id, 'ng-ts-05');
  assert.ok(p1[4].code.includes('function calculateFinalPrice'));
  assert.ok(p1[4].code.includes(': number'));

  // Lesson 6: OOP Classes & Modifiers (ng-ts-06)
  assert.equal(p1[5].id, 'ng-ts-06');
  assert.ok(p1[5].code.includes('class CinemaHall'));
  assert.ok(p1[5].code.includes('public readonly id') && p1[5].code.includes('private isImax'));

  // Lesson 7: Generics <T> (ng-ts-07)
  assert.equal(p1[6].id, 'ng-ts-07');
  assert.ok(p1[6].code.includes('interface ApiResponse<T>'));
  assert.ok(p1[6].code.includes('data: T'));

  // Lesson 8: Enums (ng-ts-08)
  assert.equal(p1[7].id, 'ng-ts-08');
  assert.ok(p1[7].code.includes('enum BookingStatus'));

  // Lesson 9: Decorators (ng-ts-09)
  assert.equal(p1[8].id, 'ng-ts-09');
  assert.ok(p1[8].code.includes('LogComponent'));

  // Lesson 10: Null Safety & Nullish Coalescing (ng-ts-10)
  assert.equal(p1[9].id, 'ng-ts-10');
  assert.ok(p1[9].code.includes('?.') && p1[9].code.includes('??'));
});

test('Suite 2.2 - Phase 2: Classic Angular Core (Lessons 11-23 / Indices 10-22)', () => {
  const p2 = modernLessons.slice(10, 23);
  assert.equal(p2.length, 13);

  // Lesson 11: Classic NgModule (ng-classic-01)
  assert.equal(p2[0].id, 'ng-classic-01');
  assert.ok(p2[0].code.includes('@NgModule'));
  assert.ok(p2[0].code.includes('declarations:'));
  assert.ok(p2[0].code.includes('bootstrap:'));

  // Lesson 12: Classic Component (ng-classic-02)
  assert.equal(p2[1].id, 'ng-classic-02');
  assert.ok(p2[1].code.includes('@Component'));
  assert.ok(!p2[1].code.includes('standalone: true'), 'Classic component should not have standalone: true');

  // Lesson 13: Property Binding (ng-classic-03)
  assert.equal(p2[2].id, 'ng-classic-03');
  assert.ok(p2[2].code.includes('[disabled]'));

  // Lesson 14: Event Binding (ng-classic-04)
  assert.equal(p2[3].id, 'ng-classic-04');
  assert.ok(p2[3].code.includes('(click)'));

  // Lesson 15: *ngIf & ng-template (ng-classic-05)
  assert.equal(p2[4].id, 'ng-classic-05');
  assert.ok(p2[4].code.includes('*ngIf'));
  assert.ok(p2[4].code.includes('else '));

  // Lesson 16: *ngFor with index (ng-classic-06)
  assert.equal(p2[5].id, 'ng-classic-06');
  assert.ok(p2[5].code.includes('*ngFor'));
  assert.ok(p2[5].code.includes('let i = index'));

  // Lesson 17: [ngClass] (ng-classic-07)
  assert.equal(p2[6].id, 'ng-classic-07');
  assert.ok(p2[6].code.includes('[ngClass]'));

  // Lesson 18: @Input() (ng-classic-08)
  assert.equal(p2[7].id, 'ng-classic-08');
  assert.ok(p2[7].code.includes('@Input()'));

  // Lesson 19: @Output() EventEmitter (ng-classic-09)
  assert.equal(p2[8].id, 'ng-classic-09');
  assert.ok(p2[8].code.includes('@Output()'));
  assert.ok(p2[8].code.includes('EventEmitter'));

  // Lesson 20: Built-in Pipes (ng-classic-10)
  assert.equal(p2[9].id, 'ng-classic-10');
  assert.ok(p2[9].code.includes('| currency'));

  // Lesson 21: Classic Service (ng-classic-11)
  assert.equal(p2[10].id, 'ng-classic-11');
  assert.ok(p2[10].code.includes('class CinemaClassicService'));

  // Lesson 22: RxJS Observables (ng-classic-12)
  assert.equal(p2[11].id, 'ng-classic-12');
  assert.ok(p2[11].code.includes('RxDemo') && p2[11].code.includes('subscribe'));

  // Lesson 23: Async Pipe (ng-classic-13)
  assert.equal(p2[12].id, 'ng-classic-13');
  assert.ok(p2[12].code.includes('| async'));
});

test('Suite 2.3 - Phase 3: Standalone Components & Modern Control Flow (Lessons 24-30 / Indices 23-29)', () => {
  const p3 = modernLessons.slice(23, 30);
  assert.equal(p3.length, 7);

  // Lesson 24: Standalone Component (ng-modern-01)
  assert.equal(p3[0].id, 'ng-modern-01');
  assert.ok(p3[0].code.includes('standalone: true'));

  // Lesson 25: bootstrapApplication (ng-modern-02)
  assert.equal(p3[1].id, 'ng-modern-02');
  assert.ok(p3[1].code.includes('bootstrapApplication('));

  // Lesson 26: @if & @else (ng-modern-03)
  assert.equal(p3[2].id, 'ng-modern-03');
  assert.ok(p3[2].code.includes('@if'));
  assert.ok(p3[2].code.includes('@else'));

  // Lesson 27: @for with mandatory track (ng-modern-04)
  assert.equal(p3[3].id, 'ng-modern-04');
  assert.ok(p3[3].code.includes('@for'));
  assert.ok(p3[3].code.includes('track '));

  // Lesson 28: @empty block (ng-modern-05)
  assert.equal(p3[4].id, 'ng-modern-05');
  assert.ok(p3[4].code.includes('@empty'));

  // Lesson 29: @switch / @case / @default (ng-modern-06)
  assert.equal(p3[5].id, 'ng-modern-06');
  assert.ok(p3[5].code.includes('@switch'));
  assert.ok(p3[5].code.includes('@case'));
  assert.ok(p3[5].code.includes('@default'));

  // Lesson 30: Smart @defer (ng-modern-07)
  assert.equal(p3[6].id, 'ng-modern-07');
  assert.ok(p3[6].code.includes('@defer'));
  assert.ok(p3[6].code.includes('@placeholder'));
});

test('Suite 2.4 - Phase 4: Signals Reactive Engine (Lessons 31-38 / Indices 30-37)', () => {
  const p4 = modernLessons.slice(30, 38);
  assert.equal(p4.length, 8);

  // Lesson 31: Signals Philosophy (ng-signal-01)
  assert.equal(p4[0].id, 'ng-signal-01');
  assert.ok(p4[0].code.includes('signal('));

  // Lesson 32: Signal Creation & Reading (ng-signal-02)
  assert.equal(p4[1].id, 'ng-signal-02');
  assert.ok(p4[1].code.includes('signal('));

  // Lesson 33: Signal Updates .set() / .update() (ng-signal-03)
  assert.equal(p4[2].id, 'ng-signal-03');
  assert.ok(p4[2].code.includes('.set(') || p4[2].code.includes('.update('));

  // Lesson 34: Computed Signals & Memoization (ng-signal-04)
  assert.equal(p4[3].id, 'ng-signal-04');
  assert.ok(p4[3].code.includes('computed('));

  // Lesson 35: Reactive effect() (ng-signal-05)
  assert.equal(p4[4].id, 'ng-signal-05');
  assert.ok(p4[4].code.includes('effect('));

  // Lesson 36: Modern Signal Inputs (ng-signal-06)
  assert.equal(p4[5].id, 'ng-signal-06');
  assert.ok(p4[5].code.includes('input.required'));

  // Lesson 37: Modern Signal Outputs (ng-signal-07)
  assert.equal(p4[6].id, 'ng-signal-07');
  assert.ok(p4[6].code.includes('output<') || p4[6].code.includes('output('));

  // Lesson 38: Two-way Signal Binding with model() (ng-signal-08)
  assert.equal(p4[7].id, 'ng-signal-08');
  assert.ok(p4[7].code.includes('model<') || p4[7].code.includes('model('));
});

test('Suite 2.5 - Phase 5: Modern DI & HttpClient (Lessons 39-45 / Indices 38-44)', () => {
  const p5 = modernLessons.slice(38, 45);
  assert.equal(p5.length, 7);

  // Lesson 39: Functional DI inject() (ng-di-01)
  assert.equal(p5[0].id, 'ng-di-01');
  assert.ok(p5[0].code.includes('inject('));

  // Lesson 40: Service State with Signals asReadonly() (ng-service-01)
  assert.equal(p5[1].id, 'ng-service-01');
  assert.ok(p5[1].code.includes('.asReadonly()'));

  // Lesson 41: provideHttpClient(withFetch()) (ng-http-01)
  assert.equal(p5[2].id, 'ng-http-01');
  assert.ok(p5[2].code.includes('provideHttpClient'));
  assert.ok(p5[2].code.includes('withFetch()'));

  // Lesson 42: Typed HTTP GET (ng-http-02)
  assert.equal(p5[3].id, 'ng-http-02');
  assert.ok(p5[3].code.includes('.get<'));

  // Lesson 43: Typed HTTP POST (ng-http-03)
  assert.equal(p5[4].id, 'ng-http-03');
  assert.ok(p5[4].code.includes('.post<'));

  // Lesson 44: Functional HttpInterceptorFn (ng-http-04)
  assert.equal(p5[5].id, 'ng-http-04');
  assert.ok(p5[5].code.includes('HttpInterceptorFn'));
  assert.ok(p5[5].code.includes('.clone('));

  // Lesson 45: RxJS & Signals Interop via toSignal() (ng-interop-01)
  assert.equal(p5[6].id, 'ng-interop-01');
  assert.ok(p5[6].code.includes('toSignal('));
});

test('Suite 2.6 - Phase 6: Modern Routing & Forms (Lessons 46-51 / Indices 45-50)', () => {
  const p6 = modernLessons.slice(45, 51);
  assert.equal(p6.length, 6);

  // Lesson 46: Standalone Routes Setup (ng-route-01)
  assert.equal(p6[0].id, 'ng-route-01');
  assert.ok(p6[0].code.includes('Routes'));

  // Lesson 47: Lazy Component Loading (ng-route-02)
  assert.equal(p6[1].id, 'ng-route-02');
  assert.ok(p6[1].code.includes('loadComponent:'));

  // Lesson 48: Route Input Binding (ng-route-03)
  assert.equal(p6[2].id, 'ng-route-03');
  assert.ok(p6[2].code.includes('input.required'));

  // Lesson 49: Functional Route Guards CanActivateFn (ng-route-04)
  assert.equal(p6[3].id, 'ng-route-04');
  assert.ok(p6[3].code.includes('CanActivateFn'));

  // Lesson 50: Typed Reactive Forms (ng-forms-01)
  assert.equal(p6[4].id, 'ng-forms-01');
  assert.ok(p6[4].code.includes('FormGroup'));
  assert.ok(p6[4].code.includes('FormControl'));

  // Lesson 51: Custom Saudi Phone Validator (ng-forms-02)
  assert.equal(p6[5].id, 'ng-forms-02');
  assert.ok(p6[5].code.includes('saudiPhoneValidator') || p6[5].code.includes('05'));
});

test('Suite 2.7 - Phase 7: Enterprise Capstone & Vitest (Lessons 52-60 / Indices 51-59)', () => {
  const p7 = modernLessons.slice(51, 60);
  assert.equal(p7.length, 9);

  // Lesson 52: CinemaState models (capstone-01)
  assert.equal(p7[0].id, 'capstone-01');
  assert.ok(p7[0].code.includes('interface CinemaAppState'));

  // Lesson 53: Central CinemaStore (capstone-02)
  assert.equal(p7[1].id, 'capstone-02');
  assert.ok(p7[1].code.includes('class CinemaStore'));
  assert.ok(p7[1].code.includes('signal<') || p7[1].code.includes('signal('));

  // Lesson 54: Movie Catalog Filter (capstone-03)
  assert.equal(p7[2].id, 'capstone-03');
  assert.ok(p7[2].code.includes('MovieCatalogComponent') || p7[2].code.includes('filteredMovies'));
  assert.ok(p7[2].code.includes('computed('));

  // Lesson 55: Interactive 60-Seat Matrix (capstone-04)
  assert.equal(p7[3].id, 'capstone-04');
  assert.ok(p7[3].code.includes('SeatMatrixComponent'));

  // Lesson 56: Booking Checkout & 15% VAT (capstone-05)
  assert.equal(p7[4].id, 'capstone-05');
  assert.ok(p7[4].code.includes('CheckoutComponent') || p7[4].code.includes('finalTotal'));
  assert.ok(p7[4].code.includes('1.15') || p7[4].code.includes('0.15'));

  // Lesson 57: Boarding Pass Ticket & window.print() (capstone-06)
  assert.equal(p7[5].id, 'capstone-06');
  assert.ok(p7[5].code.includes('TicketPassComponent'));
  assert.ok(p7[5].code.includes('window.print()'));

  // Lesson 58: Vitest Testing (capstone-07)
  assert.equal(p7[6].id, 'capstone-07');
  assert.ok(p7[6].code.includes('describe('));
  assert.ok(p7[6].code.includes('it('));
  assert.ok(p7[6].code.includes('expect('));

  // Lesson 59: Production Optimization (capstone-08)
  assert.equal(p7[7].id, 'capstone-08');
  assert.ok(p7[7].code.includes('budgets') || p7[7].code.includes('optimization'));

  // Lesson 60: Professional Portfolio README (capstone-09)
  assert.equal(p7[8].id, 'capstone-09');
  assert.ok(p7[8].code.includes('Khotwa Cinema Pro') || p7[8].code.includes('Angular 22'));
});

// =============================================================================
// SUITE 3: END-TO-END CUMULATIVE STUDENT JOURNEY SIMULATION (ALL 60 LESSONS)
// =============================================================================

test('Suite 3.1 - Full Sequential Progression Simulation Across All 60 Lessons', () => {
  // Start with pristine starterFiles
  const virtualWorkspace = { ...courseData.starterFiles };
  let handCraftScore = 0;
  let totalQuizzesCompleted = 0;

  modernLessons.forEach((lesson, index) => {
    const targetFile = lesson.file;
    assert.ok(targetFile, `Lesson ${lesson.id} must define target file`);

    // 1. Initial State Check:
    // With target file cleared of expected snippet, checkSupportedTask returns false
    const preFiles = { ...virtualWorkspace, [targetFile]: '// clean file start\n' };
    setFiles(preFiles);
    setActivePath(targetFile);

    const preStatus = checkSupportedTask(lesson);
    assert.equal(
      preStatus,
      false,
      `Lesson ${lesson.id} (#${index + 1}) checkSupportedTask must return false before user code is applied`
    );

    // 2. Slot Builder Lifecycle on Practice Step (Step 2)
    const practiceStep = lesson.steps[2];
    assert.ok(practiceStep, `Lesson ${lesson.id} must have practice step`);
    renderSlotBuilder(practiceStep, lesson);
    const slotBuilderEl = env.getEl('angularSlotBuilder');
    assert.equal(
      slotBuilderEl.hidden,
      false,
      `Lesson ${lesson.id} practice step must display Slot Builder UI (hidden === false)`
    );

    // 3. Slot Builder Suppression on Quiz Step (Step 4)
    const quizStep = lesson.steps[4];
    renderSlotBuilder(quizStep, lesson);
    assert.equal(
      slotBuilderEl.hidden,
      true,
      `Lesson ${lesson.id} quiz step must hide Slot Builder UI (hidden === true)`
    );

    // 4. Student Quiz Submission
    assert.equal(typeof quizStep.correct, 'number');
    totalQuizzesCompleted++;

    // 5. Code Application Simulation
    const existingContent = virtualWorkspace[targetFile] || '';
    const updatedContent = existingContent.includes(lesson.code)
      ? existingContent
      : (existingContent ? existingContent + '\n\n' + lesson.code : lesson.code);

    virtualWorkspace[targetFile] = updatedContent;
    setFiles({ ...virtualWorkspace });

    const postStatus = checkSupportedTask(lesson);
    assert.equal(
      postStatus,
      true,
      `Lesson ${lesson.id} (#${index + 1}) checkSupportedTask must return true after applying code`
    );

    // 6. Hand-craft score increment
    handCraftScore += 10;
  });

  assert.equal(totalQuizzesCompleted, 60, 'All 60 lesson quizzes must be simulated');
  assert.equal(handCraftScore, 600, 'Hand-craft score should have progressed cumulatively to 600');

  // Verify virtualWorkspace contains artifacts from all 7 phases
  assert.ok(virtualWorkspace['src/app/models/movie.model.ts'].includes('defaultCinemaCity'), 'Phase 1 artifact must persist');
  assert.ok(virtualWorkspace['src/app/classic/app-classic.module.ts'].includes('AppClassicModule'), 'Phase 2 artifact must persist');
  assert.ok(virtualWorkspace['src/app/app.ts'].includes('standalone: true'), 'Phase 3 artifact must persist');
  assert.ok(virtualWorkspace['src/app/app.ts'].includes('signal('), 'Phase 4 artifact must persist');
  assert.ok(virtualWorkspace['src/app/services/cinema.service.ts'].includes('provideHttpClient') || virtualWorkspace['src/app/services/cinema.service.ts'].includes('inject(') || virtualWorkspace['src/app/app.ts'].includes('inject('), 'Phase 5 artifact must persist');
  assert.ok(virtualWorkspace['src/app/app.routes.ts'].includes('loadComponent') || virtualWorkspace['src/app/app.routes.ts'].includes('routes'), 'Phase 6 artifact must persist');
  assert.ok(virtualWorkspace['src/app/core/store/cinema.store.ts'].includes('CinemaStore'), 'Phase 7 artifact must persist');
});

test('Suite 3.2 - Whitespace and Formatting Tolerance Stress Across All 60 Lessons', () => {
  modernLessons.forEach((lesson, index) => {
    const targetFile = lesson.file;
    const expected = typeof lesson.expected === 'string' ? lesson.expected : lesson.expected[0];

    // Wrap with varied leading/trailing whitespaces, CRLF, and tabs
    const whitespaceVariations = [
      `\t  \n  ${expected}  \n\t  `,
      `\r\n\r\n\t${expected}\r\n`,
      `  /* comment */  \n${expected}\n  // end comment  `
    ];

    whitespaceVariations.forEach((variant, vIdx) => {
      setFiles({ [targetFile]: variant });
      setActivePath(targetFile);
      const isAccepted = checkSupportedTask(lesson);
      assert.equal(
        isAccepted,
        true,
        `Lesson ${lesson.id} (#${index + 1}) must tolerate whitespace variation #${vIdx + 1}`
      );
    });
  });
});

test('Suite 3.3 - Strict Adversarial Negative Rejections (Zero False Positives)', () => {
  modernLessons.forEach((lesson, index) => {
    const targetFile = lesson.file;
    const expected = typeof lesson.expected === 'string' ? lesson.expected : lesson.expected[0];

    // Scenario A: Placed in wrong file path
    setFiles({ 'src/app/wrong-path.ts': expected, [targetFile]: '' });
    setActivePath(targetFile);
    assert.equal(
      checkSupportedTask(lesson),
      false,
      `Lesson ${lesson.id} must reject placement in wrong file path`
    );

    // Scenario B: Corrupted token / typo in variable name or keyword
    const corrupted = expected.replace(/[a-zA-Z]/, 'X');
    setFiles({ [targetFile]: corrupted });
    assert.equal(
      checkSupportedTask(lesson),
      false,
      `Lesson ${lesson.id} must reject corrupted / mutated code token`
    );

    // Scenario C: Truncated snippet (only half the string)
    const truncated = expected.slice(0, Math.floor(expected.length / 2));
    setFiles({ [targetFile]: truncated });
    assert.equal(
      checkSupportedTask(lesson),
      false,
      `Lesson ${lesson.id} must reject truncated token snippet`
    );
  });
});

// =============================================================================
// SUITE 4: CROSS-PHASE STARTERFILES COMPATIBILITY & ENTERPRISE SKELETON
// =============================================================================

test('Suite 4.1 - StarterFiles Inventory Completeness (All 49 Files)', () => {
  assert.ok(courseData.starterFiles, 'starterFiles must exist on courseData');
  const starterKeys = Object.keys(courseData.starterFiles);
  assert.equal(starterKeys.length, 49, 'starterFiles must contain exactly 49 files');

  const mandatoryFiles = [
    // Build & config
    'package.json', 'angular.json', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json',
    // Entry & root
    'src/index.html', 'src/main.ts', 'src/app/app.config.ts', 'src/app/app.ts', 'src/app/app.html', 'src/app/app.css', 'src/styles.css',
    // Phase 1 TS Models
    'src/app/models/movie.model.ts', 'src/app/models/seat.model.ts', 'src/app/models/booking.model.ts',
    'src/app/models/hall.model.ts', 'src/app/models/pricing.utils.ts', 'src/app/models/api-response.model.ts',
    // Phase 2 Classic Architecture
    'src/app/classic/app-classic.module.ts', 'src/app/classic/movie-card-classic.component.ts',
    'src/app/classic/movie-detail-classic.component.ts', 'src/app/classic/seat-item-classic.component.ts',
    'src/app/classic/cinema-classic.service.ts', 'src/app/classic/rx-demo.ts',
    // Phase 3 & 4 Components
    'src/app/components/movie-card.component.ts', 'src/app/components/seat-picker.component.ts',
    'src/app/components/search-box.component.ts', 'src/app/components/seat-item.component.ts',
    // Phase 5 DI & HTTP
    'src/app/services/cinema.service.ts', 'src/app/interceptors/auth.interceptor.ts',
    // Phase 6 Routing & Forms
    'src/app/guards/booking.guard.ts', 'src/app/validators/cinema.validators.ts',
    'src/app/app.routes.ts', 'src/app/features/booking/booking.component.ts',
    'src/app/features/booking/booking-form.component.ts',
    // Phase 7 Capstone
    'src/app/core/models/cinema-state.model.ts', 'src/app/core/store/cinema.store.ts',
    'src/app/features/movies/movie-catalog.component.ts', 'src/app/features/booking/seat-matrix.component.ts',
    'src/app/features/checkout/checkout.component.ts', 'src/app/features/tickets/ticket-pass.component.ts',
    'src/app/core/store/cinema.store.spec.ts', 'README.md'
  ];

  mandatoryFiles.forEach(file => {
    assert.ok(courseData.starterFiles[file], `Mandatory starter file '${file}' must exist and not be empty`);
    assert.ok(courseData.starterFiles[file].length > 10, `Starter file '${file}' must have substantial content`);
  });
});

test('Suite 4.2 - Cross-Phase Import Graph & Dependency Integrity', () => {
  const sf = courseData.starterFiles;

  // 1. Phase 7 Store imports models
  assert.ok(
    sf['src/app/core/store/cinema.store.ts'].includes("from '../../models/movie.model'") &&
    sf['src/app/core/store/cinema.store.ts'].includes("from '../../models/seat.model'"),
    'CinemaStore must import Movie and Seat models'
  );

  // 2. Phase 7 Core models import models
  assert.ok(
    sf['src/app/core/models/cinema-state.model.ts'].includes("from '../../models/movie.model'"),
    'cinema-state.model.ts must import Movie model'
  );

  // 3. Phase 7 Seat Matrix imports CinemaStore
  assert.ok(
    sf['src/app/features/booking/seat-matrix.component.ts'].includes('CinemaStore'),
    'SeatMatrixComponent must import CinemaStore'
  );

  // 4. Routing imports lazy features
  assert.ok(
    sf['src/app/app.routes.ts'].includes('loadComponent'),
    'app.routes.ts must configure loadComponent'
  );

  // 5. Vitest Unit Test imports CinemaStore
  assert.ok(
    sf['src/app/core/store/cinema.store.spec.ts'].includes("from './cinema.store'"),
    'cinema.store.spec.ts must import CinemaStore'
  );
});

test('Suite 4.3 - Project Path Security Boundaries (isAllowedProjectPath)', () => {
  // All 49 starterFiles must be allowed
  Object.keys(courseData.starterFiles).forEach(p => {
    assert.equal(isAllowedPath(p), true, `Starter path '${p}' must be allowed`);
  });

  // Adversarial paths that must be forbidden
  const forbiddenPaths = [
    '../package.json',
    '../../etc/passwd',
    '/src/app/app.ts',
    'src\\app\\app.ts',
    'node_modules/vue/package.json',
    '.git/config',
    '.angular/cache/file.bin',
    'dist/main.js',
    'src/app/script.sh',
    'src/app/program.exe',
    'src/app/image.png'
  ];

  forbiddenPaths.forEach(fp => {
    assert.equal(isAllowedPath(fp), false, `Adversarial path '${fp}' must be rejected`);
  });
});

// =============================================================================
// SUITE 5: SIMULATOR PREVIEW STABILITY & EDGE-CASE STRESS ACROSS ALL 7 PHASES
// =============================================================================

test('Suite 5.1 - Phase 1 Simulator Preview: Pure TypeScript Visualizer', () => {
  const tsFiles = [
    'src/app/models/movie.model.ts',
    'src/app/models/seat.model.ts',
    'src/app/models/pricing.utils.ts',
    'src/app/models/hall.model.ts',
    'src/app/models/api-response.model.ts',
    'src/app/models/booking.model.ts',
    'src/app/models/metadata.demo.ts'
  ];

  tsFiles.forEach(file => {
    setFiles({ [file]: courseData.starterFiles[file] });
    setActivePath(file);
    runSimulatedPreview();
    const doc = getPreviewSrcdoc();

    assert.ok(doc.includes('محاكي وفاحص TypeScript'), `${file} preview must render TS visualizer header`);
    assert.ok(doc.includes('TypeScript Output Terminal'), `${file} preview must render terminal box`);
    assert.ok(doc.length > 500, `${file} preview document must have substantial size`);
  });
});

test('Suite 5.2 - Phase 2 Simulator Preview: Classic Angular Directives (*ngIf, *ngFor, [ngClass])', () => {
  setFiles({
    'src/app/app.ts': 'export class App { isAvailable = true; isVip = true; }',
    'src/app/app.html': `
      <div id="test-classic">
        <span *ngIf="isAvailable" [ngClass]="{ 'vip-badge': isVip }">متاح للجميع</span>
        <ul>
          <li *ngFor="let movie of movies; let i = index">
            {{ movie.title }}
          </li>
        </ul>
      </div>
    `
  });
  setActivePath('src/app/app.html');
  runSimulatedPreview();
  const doc = getPreviewSrcdoc();

  assert.ok(doc.includes('متاح للجميع'), 'Classic *ngIf condition must render content');
  assert.ok(doc.includes('vip-badge'), 'Classic [ngClass] must apply truthy class');
  assert.ok(doc.includes('رحلة النجوم'), 'Classic *ngFor must render movie items from simulator collection');
});

test('Suite 5.3 - Phase 3 Simulator Preview: Modern Control Flow (@if, @for, @switch, @defer)', () => {
  setFiles({
    'src/app/app.ts': `
      export class App {
        status = 'confirmed';
        emptyList = signal([]);
      }
    `,
    'src/app/app.html': `
      <div>
        @if (status === 'confirmed') {
          <p class="status-ok">تم تأكيد الحجز بنجاح</p>
        } @else {
          <p class="status-pending">قيد الانتظار</p>
        }

        @for (movie of movies; track movie.id) {
          <div class="seat-badge">{{ movie.title }}</div>
        }

        @for (none of emptyList(); track $index) {
          <div>لن يظهر</div>
        } @empty {
          <p class="empty-msg">القائمة فارغة تماماً</p>
        }

        @switch (status) {
          @case ('confirmed') { <span class="badge-green">مؤكد</span> }
          @default { <span class="badge-gray">غير معروف</span> }
        }

        @defer (on viewport) {
          <div class="deferred-content">محتوى مؤجل</div>
        } @placeholder {
          <div>تحميل...</div>
        }
      </div>
    `
  });
  setActivePath('src/app/app.html');
  runSimulatedPreview();
  const doc = getPreviewSrcdoc();

  assert.ok(doc.includes('تم تأكيد الحجز بنجاح'), 'Modern @if block must render when true');
  assert.ok(!doc.includes('قيد الانتظار'), 'Modern @else block must not render when @if is true');
  assert.ok(doc.includes('رحلة النجوم'), 'Modern @for must iterate movie items');
  assert.ok(doc.includes('القائمة فارغة تماماً'), 'Modern @empty block must render when collection is empty');
  assert.ok(doc.includes('badge-green'), 'Modern @switch case must match expression');
  assert.ok(doc.includes('محتوى مؤجل'), 'Modern @defer block must render');
});

test('Suite 5.4 - Phase 4 Simulator Preview: Signals Reactive Engine (signal, computed, model)', () => {
  setFiles({
    'src/app/app.ts': `
      export class App {
        ticketCount = signal(3);
        totalPrice = computed(() => this.ticketCount() * 85);
        searchQuery = model('أكشن');
      }
    `,
    'src/app/app.html': `
      <div class="signals-demo">
        <span class="count-val">{{ ticketCount() }}</span>
        <span class="total-val">{{ totalPrice }}</span>
        <span class="query-val">{{ searchQuery }}</span>
      </div>
    `
  });
  setActivePath('src/app/app.html');
  runSimulatedPreview();
  const doc = getPreviewSrcdoc();

  assert.ok(doc.includes('3'), 'Signal ticketCount() value must be interpolated');
  assert.ok(doc.includes('255'), 'Computed totalPrice (3 * 85 = 255) must be computed and interpolated');
  assert.ok(doc.includes('أكشن'), 'Model searchQuery must be extracted and interpolated');
});

test('Suite 5.5 - Phase 7 Simulator Preview: Capstone 60-Seat Matrix & Boarding Pass', () => {
  setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/features/booking/seat-matrix.component.ts'],
    'src/app/app.html': `
      <section class="cinema-pro-capstone">
        <div class="screen-indicator">شاشة العرض الرئيسية</div>
        <div class="seat-picker-grid">
          @for (s of seats; track s.id) {
            <button class="seat-btn">{{ s.id }}</button>
          }
        </div>
      </section>
    `
  });
  setActivePath('src/app/app.html');
  runSimulatedPreview();
  const doc = getPreviewSrcdoc();

  assert.ok(doc.includes('شاشة العرض الرئيسية'), 'Capstone preview must render auditorium screen');
  assert.ok(doc.length > 300, 'Capstone preview must render seat container');
});

test('Suite 5.6 - Simulator Parser Chaos Resilience (No Uncaught Exceptions)', () => {
  const chaoticTemplates = [
    '@if (unclosed_condition { <div>missing paren</div>',
    '@for (item of; track) { <div>malformed header</div> }',
    '@switch (noBrace @case(1) { }',
    '<div>Unmatched braces: {{ obj.missing... } } } }}}',
    '<div *ngIf="unclosed quote>tag</div>',
    '<div [ngClass]="not an object">tag</div>'
  ];

  chaoticTemplates.forEach((badHtml, idx) => {
    assert.doesNotThrow(() => {
      setFiles({
        'src/app/app.ts': 'export class App {}',
        'src/app/app.html': badHtml
      });
      setActivePath('src/app/app.html');
      runSimulatedPreview();
    }, `Simulator must not throw unhandled exception on chaotic template #${idx + 1}`);
  });
});

// =============================================================================
// SUITE 6: BUSINESS DOMAIN & FINANCIAL ARITHMETIC STRESS (CAPSTONE LOGIC)
// =============================================================================

test('Suite 6.1 - 60-Seat Auditorium Matrix Geometry and Tier Pricing', () => {
  const hall = generate60SeatHall();
  assert.equal(hall.length, 60, 'Hall must have exactly 60 seats');

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const countPerRow = {};
  rows.forEach(r => countPerRow[r] = 0);

  let vipCount = 0;
  let standardCount = 0;

  hall.forEach(seat => {
    countPerRow[seat.row]++;
    if (seat.tier === 'vip') {
      vipCount++;
      assert.equal(seat.price, 120, `VIP seat ${seat.id} must cost 120 SAR`);
      assert.ok(seat.row === 'A' || seat.row === 'B', `VIP seat ${seat.id} must be in rows A or B`);
    } else {
      standardCount++;
      assert.equal(seat.price, 85, `Standard seat ${seat.id} must cost 85 SAR`);
      assert.ok(['C', 'D', 'E', 'F'].includes(seat.row), `Standard seat ${seat.id} must be in rows C-F`);
    }
  });

  rows.forEach(r => {
    assert.equal(countPerRow[r], 10, `Row ${r} must contain exactly 10 seats`);
  });

  assert.equal(vipCount, 20, 'Hall must have exactly 20 VIP seats (Rows A, B × 10)');
  assert.equal(standardCount, 40, 'Hall must have exactly 40 Standard seats (Rows C-F × 10)');
});

test('Suite 6.2 - Central CinemaStore State Mutations & Seat Toggles', () => {
  const store = new CinemaStore();

  assert.equal(store.selectedSeats().length, 0, 'Store starts with 0 selected seats');
  assert.equal(store.seatCount(), 0, 'seatCount computed starts at 0');

  // Toggle seat A1 (add)
  store.toggleSeat('A1');
  assert.equal(store.selectedSeats().length, 1);
  assert.ok(store.selectedSeats().includes('A1'));
  assert.equal(store.seatCount(), 1);

  // Toggle seat A3 (add)
  store.toggleSeat('A3');
  assert.equal(store.selectedSeats().length, 2);
  assert.equal(store.seatCount(), 2);

  // Toggle seat A1 again (remove)
  store.toggleSeat('A1');
  assert.equal(store.selectedSeats().length, 1);
  assert.ok(!store.selectedSeats().includes('A1'));
  assert.ok(store.selectedSeats().includes('A3'));
  assert.equal(store.seatCount(), 1);

  // Clear store
  store.clear();
  assert.equal(store.selectedSeats().length, 0);
  assert.equal(store.seatCount(), 0);
});

test('Suite 6.3 - Financial Arithmetic: Exact 15% VAT & Coupon Deductions', () => {
  const hall = generate60SeatHall();

  // Test Case 1: Single VIP seat (120 SAR), no coupon
  const totals1 = calculateBookingCost(['A1'], 0, hall);
  assert.equal(totals1.subtotal, 120.00);
  assert.equal(totals1.discountAmount, 0.00);
  assert.equal(totals1.discountedSubtotal, 120.00);
  assert.equal(totals1.vatAmount, 18.00); // 120 * 0.15 = 18.00
  assert.equal(totals1.finalTotal, 138.00); // 120 + 18 = 138.00

  // Test Case 2: 2 Standard + 1 VIP (85 + 85 + 120 = 290 SAR), 10% coupon (KHOTWA10)
  // Subtotal = 290
  // Discount = 29.00
  // Taxable = 261.00
  // VAT = 261 * 0.15 = 39.15
  // Total = 300.15
  const totals2 = calculateBookingCost(['A1', 'C1', 'C2'], 0.10, hall);
  assert.equal(totals2.subtotal, 290.00);
  assert.equal(totals2.discountAmount, 29.00);
  assert.equal(totals2.discountedSubtotal, 261.00);
  assert.equal(totals2.vatAmount, 39.15);
  assert.equal(totals2.finalTotal, 300.15);

  // Test Case 3: Exact fractional cents rounding test (Scenario from PROJECT.md / TEST_READY.md)
  // 1 VIP (120) + 1 Standard (85) + 1 VIP (120) = 325 SAR
  // 10% coupon -> Discount = 32.50 SAR
  // Taxable = 292.50 SAR
  // 15% VAT = 292.50 * 0.15 = 43.875 -> rounded to 43.88 SAR
  // Total = 292.50 + 43.88 = 336.38 SAR
  const totals3 = calculateBookingCost(['A1', 'A3', 'C1'], 0.10, hall);
  assert.equal(totals3.subtotal, 325.00);
  assert.equal(totals3.discountAmount, 32.50);
  assert.equal(totals3.discountedSubtotal, 292.50);
  assert.equal(totals3.vatAmount, 43.88);
  assert.equal(totals3.finalTotal, 336.38);

  // Test Case 4: Free voucher 100% discount
  const totals4 = calculateBookingCost(['A1'], 1.00, hall);
  assert.equal(totals4.subtotal, 120.00);
  assert.equal(totals4.discountAmount, 120.00);
  assert.equal(totals4.discountedSubtotal, 0.00);
  assert.equal(totals4.vatAmount, 0.00);
  assert.equal(totals4.finalTotal, 0.00);
});

test('Suite 6.4 - Custom Saudi Mobile Phone Validator Boundary Stress', () => {
  const saudiRegex = /^(05)[0-9]{8}$/;

  const validNumbers = [
    '0501234567',
    '0551234567',
    '0599999999',
    '0530000000',
    '0548765432'
  ];

  validNumbers.forEach(num => {
    assert.equal(saudiRegex.test(num), true, `Number '${num}' must be valid Saudi mobile`);
    assert.equal(saudiPhoneValidator(num), null, `Helper validator must return null (valid) for '${num}'`);
  });

  const invalidNumbers = [
    '0112345678', // Landline prefix 01
    '0651234567', // Invalid prefix 06
    '051234567',  // 9 digits (too short)
    '05012345678', // 11 digits (too long)
    '050123456a', // Contains letter
    '050 1234567', // Contains space
    '050-1234567', // Contains dash
    '+966501234567', // Country code without normalization
    '' // Empty
  ];

  invalidNumbers.forEach(num => {
    assert.equal(saudiRegex.test(num), false, `Invalid number '${num}' must be rejected`);
    assert.notEqual(saudiPhoneValidator(num), null, `Helper validator must return error object for '${num}'`);
  });
});

test('Suite 6.5 - Vitest Unit Test Specification Structural Verification', () => {
  const specContent = courseData.starterFiles['src/app/core/store/cinema.store.spec.ts'];
  assert.ok(specContent, 'cinema.store.spec.ts must exist');

  assert.ok(specContent.includes('describe('), 'Spec must use Vitest describe');
  assert.ok(specContent.includes('it('), 'Spec must use Vitest it');
  assert.ok(specContent.includes('expect('), 'Spec must use Vitest expect');
  assert.ok(specContent.includes('toggleSeat'), 'Spec must test toggleSeat');
  assert.ok(specContent.includes('selectedSeats'), 'Spec must test selectedSeats');
});

// =============================================================================
// SUITE 7: FULL SYSTEM REGRESSION VERIFICATION
// =============================================================================

test('Suite 7.1 - Master E2E Runner (Tiers 1-4) Subprocess Regression Execution', () => {
  const e2eRunnerPath = path.join(ROOT_DIR, 'tests', 'e2e', 'run_all_e2e_tests.cjs');
  assert.ok(fs.existsSync(e2eRunnerPath), 'run_all_e2e_tests.cjs must exist');

  const result = spawnSync(process.execPath, [e2eRunnerPath], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 30000
  });

  assert.equal(
    result.status,
    0,
    `Master E2E Runner exited with code ${result.status} (expected 0).\nStderr: ${result.stderr}\nStdout: ${result.stdout}`
  );
  assert.ok(result.stdout.includes('ALL E2E TEST TIERS PASSED SUCCESSFULLY'), 'Master E2E runner output must confirm success');
});

test('Suite 7.2 - Native Project Test Command (npm test) Subprocess Verification', () => {
  const result = spawnSync('npm', ['test'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 30000,
    shell: true
  });

  assert.equal(
    result.status,
    0,
    `npm test exited with code ${result.status} (expected 0).\nStderr: ${result.stderr}\nStdout: ${result.stdout}`
  );
  assert.ok(result.stdout.includes('pass 77') || result.stdout.includes('✔'), 'npm test must report passing tests');
});

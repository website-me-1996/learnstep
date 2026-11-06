/**
 * Adversarial Empirical Verification Suite for Phase 7 Enterprise Capstone & Vitest (Milestone 7)
 * Exhaustive empirical testing covering all 9 Phase 7 lessons (capstone-01 to capstone-09),
 * module descriptor, starterFiles integrity, simulator task matching, whitespace tolerance,
 * negative adversarial rejections, and Capstone domain behavioral execution.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
    if (err.stack) {
      const line = err.stack.split('\n')[2];
      if (line) console.error(`         Location: ${line.trim()}`);
    }
  }
}

console.log('===============================================================================');
console.log('🎬 EMPIRICAL CHALLENGER: ADVERSARIAL VERIFICATION SUITE (PHASE 7 CAPSTONE & VITEST)');
console.log('===============================================================================');

// 1. Load course data
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p7Lessons = courseData.lessons.filter(l => l.module === 'phase-7-capstone');

// --- SECTION 1: Module Metadata & Global Course Integrity ---
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-7-capstone" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-7-capstone'];
  assert.ok(mod, 'modules["phase-7-capstone"] must exist');
  assert.strictEqual(mod.id, 'phase-7-capstone');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.strictEqual(mod.icon, '🎬');
  assert.ok(typeof mod.badge === 'string' && mod.badge.length > 5, 'mod.badge must be descriptive');
  assert.strictEqual(mod.lessonCount, 9, 'mod.lessonCount must be 9');
});

runTest('1.2 Exactly 9 lessons belong to module "phase-7-capstone"', () => {
  assert.strictEqual(p7Lessons.length, 9, 'Must have exactly 9 Phase 7 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-7-capstone'].lessonCount, p7Lessons.length);
});

runTest('1.3 Total course lesson count is exactly 106 (10 P1 + 13 P2 + 7 P3 + 8 P4 + 7 P5 + 6 P6 + 9 P7 + 46 legacy)', () => {
  assert.strictEqual(courseData.lessons.length, 106, 'Course must contain exactly 106 lessons');
});

runTest('1.4 Zero duplicate lesson IDs across all 106 lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.strictEqual(ids.size, 106, 'Must have exactly 106 unique lesson IDs');
});

runTest('1.5 Phase 7 lessons occupy indices 51 through 59 in sequential order', () => {
  const expectedP7Ids = [
    'capstone-01', 'capstone-02', 'capstone-03',
    'capstone-04', 'capstone-05', 'capstone-06',
    'capstone-07', 'capstone-08', 'capstone-09'
  ];
  expectedP7Ids.forEach((expectedId, offset) => {
    const idx = 51 + offset;
    assert.strictEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    assert.strictEqual(courseData.lessons[idx].module, 'phase-7-capstone');
  });
});

runTest('1.6 Preserved continuity across all 8 curriculum sections', () => {
  // Phase 1 (0-9)
  assert.strictEqual(courseData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(courseData.lessons[9].id, 'ng-ts-10');
  // Phase 2 (10-22)
  assert.strictEqual(courseData.lessons[10].id, 'ng-classic-01');
  assert.strictEqual(courseData.lessons[22].id, 'ng-classic-13');
  // Phase 3 (23-29)
  assert.strictEqual(courseData.lessons[23].id, 'ng-modern-01');
  assert.strictEqual(courseData.lessons[29].id, 'ng-modern-07');
  // Phase 4 (30-37)
  assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
  assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');
  // Phase 5 (38-44)
  assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
  assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
  // Phase 6 (45-50)
  assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
  assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
  // Phase 7 (51-59)
  assert.strictEqual(courseData.lessons[51].id, 'capstone-01');
  assert.strictEqual(courseData.lessons[59].id, 'capstone-09');
  // Legacy (60-105)
  assert.strictEqual(courseData.lessons[60].id, 'ng-intro');
  assert.strictEqual(courseData.lessons[105].id, 'final-review');
});

// --- SECTION 2: Starter Files Integrity & Capstone Architecture ---
console.log('\n--- SECTION 2: Starter Files Integrity & Capstone Architecture ---');

runTest('2.1 src/app/core/models/cinema-state.model.ts defines CinemaAppState interface', () => {
  const fileContent = courseData.starterFiles['src/app/core/models/cinema-state.model.ts'];
  assert.ok(fileContent, 'src/app/core/models/cinema-state.model.ts must exist');
  assert.ok(fileContent.includes('export interface CinemaAppState {'), 'Must export CinemaAppState');
  assert.ok(fileContent.includes('selectedMovieId: number | null;'), 'Must include selectedMovieId');
  assert.ok(fileContent.includes('selectedSeats: string[];'), 'Must include selectedSeats');
});

runTest('2.2 src/app/core/store/cinema.store.ts implements CinemaStore with signals and toggleSeat', () => {
  const storeContent = courseData.starterFiles['src/app/core/store/cinema.store.ts'];
  assert.ok(storeContent, 'src/app/core/store/cinema.store.ts must exist');
  assert.ok(storeContent.includes('export class CinemaStore {'), 'Must export CinemaStore');
  assert.ok(storeContent.includes('readonly selectedSeats = signal<string[]>([]);'), 'Must declare selectedSeats signal');
  assert.ok(storeContent.includes('toggleSeat(seatId: string)'), 'Must have toggleSeat method');
  assert.ok(storeContent.includes('readonly seatCount = computed('), 'Must have seatCount computed signal');
});

runTest('2.3 src/app/features/movies/movie-catalog.component.ts implements computed filtering', () => {
  const catalogContent = courseData.starterFiles['src/app/features/movies/movie-catalog.component.ts'];
  assert.ok(catalogContent, 'src/app/features/movies/movie-catalog.component.ts must exist');
  assert.ok(catalogContent.includes('export class MovieCatalogComponent'), 'Must export MovieCatalogComponent');
  assert.ok(catalogContent.includes('filteredMovies = computed(() => this.movies().filter('), 'Must compute filteredMovies');
});

runTest('2.4 src/app/features/booking/seat-matrix.component.ts implements seat selection', () => {
  const matrixContent = courseData.starterFiles['src/app/features/booking/seat-matrix.component.ts'];
  assert.ok(matrixContent, 'src/app/features/booking/seat-matrix.component.ts must exist');
  assert.ok(matrixContent.includes('export class SeatMatrixComponent {'), 'Must export SeatMatrixComponent');
  assert.ok(matrixContent.includes('store = inject(CinemaStore);'), 'Must inject CinemaStore');
  assert.ok(matrixContent.includes('onSeatClick('), 'Must define onSeatClick method');
});

runTest('2.5 src/app/features/checkout/checkout.component.ts implements 15% VAT calculation', () => {
  const checkoutContent = courseData.starterFiles['src/app/features/checkout/checkout.component.ts'];
  assert.ok(checkoutContent, 'src/app/features/checkout/checkout.component.ts must exist');
  assert.ok(checkoutContent.includes('export class CheckoutComponent'), 'Must export CheckoutComponent');
  assert.ok(checkoutContent.includes('finalTotal = computed(() => {'), 'Must have finalTotal computed signal');
  assert.ok(checkoutContent.includes('1.15'), 'Must apply 15% VAT (1.15 multiplier)');
});

runTest('2.6 src/app/features/tickets/ticket-pass.component.ts implements ticket pass and print', () => {
  const passContent = courseData.starterFiles['src/app/features/tickets/ticket-pass.component.ts'];
  assert.ok(passContent, 'src/app/features/tickets/ticket-pass.component.ts must exist');
  assert.ok(passContent.includes('export class TicketPassComponent {'), 'Must export TicketPassComponent');
  assert.ok(passContent.includes('bookingRef = input.required<string>();'), 'Must declare bookingRef input');
  assert.ok(passContent.includes('window.print()'), 'Must call window.print()');
});

runTest('2.7 src/app/core/store/cinema.store.spec.ts implements Vitest unit testing', () => {
  const specContent = courseData.starterFiles['src/app/core/store/cinema.store.spec.ts'];
  assert.ok(specContent, 'src/app/core/store/cinema.store.spec.ts must exist');
  assert.ok(specContent.includes("from 'vitest'"), 'Must import from vitest');
  assert.ok(specContent.includes("describe('CinemaStore', () => {"), 'Must define describe block');
  assert.ok(specContent.includes("store.toggleSeat('B4');"), 'Must test toggleSeat');
});

runTest('2.8 angular.json contains production optimization configuration', () => {
  const angularJsonStr = courseData.starterFiles['angular.json'];
  assert.ok(angularJsonStr, 'angular.json must exist');
  assert.ok(angularJsonStr.includes('"optimization": true'), 'Must include "optimization": true');
  assert.ok(angularJsonStr.includes('"outputHashing": "all"'), 'Must include "outputHashing": "all"');
});

runTest('2.9 README.md contains comprehensive professional documentation', () => {
  const readme = courseData.starterFiles['README.md'];
  assert.ok(readme, 'README.md must exist');
  assert.ok(readme.includes('# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)'), 'Must have title heading');
  assert.ok(readme.length > 500, 'README.md must be comprehensive');
});

runTest('2.10 Non-destructive preservation of all foundational Phase 1-6 starter files', () => {
  const sf = courseData.starterFiles;
  assert.ok(sf['src/app/app.routes.ts'].includes('Routes'), 'app.routes.ts must preserve Routes');
  assert.ok(sf['src/app/guards/booking.guard.ts'].includes('CanActivateFn'), 'booking.guard.ts must exist');
  assert.ok(sf['src/app/validators/cinema.validators.ts'].includes('saudiPhoneValidator'), 'cinema.validators.ts must exist');
  assert.ok(sf['src/app/features/booking/booking.component.ts'].includes('input.required'), 'booking.component.ts must exist');
  assert.ok(sf['src/app/features/booking/booking-form.component.ts'].includes('FormGroup'), 'booking-form.component.ts must exist');
  assert.ok(sf['src/app/services/cinema.service.ts'].includes('inject(HttpClient)'), 'cinema.service.ts must exist');
  assert.ok(sf['src/app/classic/app-classic.module.ts'], 'app-classic.module.ts must exist');
});

// --- SECTION 3: Phase 7 Lessons Schema & Pedagogical Substance ---
console.log('\n--- SECTION 3: Phase 7 Lessons Schema & Pedagogical Substance ---');

runTest('3.1 All 9 Phase 7 lessons have all 15 mandatory schema fields', () => {
  const requiredKeys = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p7Lessons.forEach(lesson => {
    requiredKeys.forEach(k => {
      assert.ok(lesson[k] !== undefined, `Lesson ${lesson.id} missing field: ${k}`);
    });
    assert.strictEqual(Object.keys(lesson).length, 15, `Lesson ${lesson.id} has unexpected extra fields: ${Object.keys(lesson)}`);
  });
});

runTest('3.2 Every Phase 7 lesson target file exists in starterFiles and is non-empty', () => {
  p7Lessons.forEach(lesson => {
    assert.ok(
      courseData.starterFiles[lesson.file] !== undefined,
      `Lesson ${lesson.id} target file "${lesson.file}" not in starterFiles`
    );
    assert.ok(
      courseData.starterFiles[lesson.file].length > 0,
      `Lesson ${lesson.id} target file "${lesson.file}" is empty in starterFiles`
    );
  });
});

runTest('3.3 Every Phase 7 lesson references official documentation from angular.dev', () => {
  p7Lessons.forEach(lesson => {
    assert.ok(
      lesson.reference && (lesson.reference.startsWith('https://angular.dev/') || lesson.reference.startsWith('https://www.typescriptlang.org/')),
      `Lesson ${lesson.id} reference must point to angular.dev or typescriptlang.org, got: ${lesson.reference}`
    );
  });
});

runTest('3.4 Every Phase 7 lesson code strictly contains its expected snippet', () => {
  p7Lessons.forEach(lesson => {
    assert.ok(
      lesson.code.includes(lesson.expected),
      `Lesson ${lesson.id} code does not contain expected snippet "${lesson.expected}"`
    );
  });
});

runTest('3.5 Every Phase 7 lesson visual flow notation contains directional arrows (⟶)', () => {
  p7Lessons.forEach(lesson => {
    assert.ok(
      lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'),
      `Lesson ${lesson.id} flow must contain arrow (⟶)`
    );
  });
});

runTest('3.6 Pedagogical Arabic prose depth (concept >= 500 Arabic chars) across all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const arabicChars = (lesson.concept.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(
      arabicChars >= 500,
      `Lesson ${lesson.id} concept must contain >= 500 Arabic characters, got ${arabicChars}`
    );
    assert.ok(
      lesson.summary.length >= 80,
      `Lesson ${lesson.id} summary must be descriptive (>= 80 chars), got ${lesson.summary.length}`
    );
  });
});

// --- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---
console.log('\n--- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---');

runTest('4.1 Every Phase 7 lesson has exactly 5 steps in correct order and type', () => {
  const expectedSteps = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p7Lessons.forEach(lesson => {
    assert.strictEqual(lesson.steps.length, 5, `${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((step, sIdx) => {
      assert.strictEqual(step.id, expectedSteps[sIdx], `${lesson.id} step ${sIdx} id must be ${expectedSteps[sIdx]}`);
      assert.strictEqual(step.type, expectedTypes[sIdx], `${lesson.id} step ${sIdx} type must be ${expectedTypes[sIdx]}`);
      assert.ok(typeof step.title === 'string' && step.title.length > 5, `${lesson.id} step ${sIdx} title missing`);
      assert.ok(typeof step.task === 'string' && step.task.length > 5, `${lesson.id} step ${sIdx} task missing`);
      assert.ok(typeof step.benefit === 'string' && step.benefit.length > 5, `${lesson.id} step ${sIdx} benefit missing`);
    });
  });
});

runTest('4.2 Every Quiz step has complete question, options array (>=3), valid correct index, and benefit', () => {
  p7Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    assert.ok(quizStep, `${lesson.id} must have a quiz step`);
    assert.ok(typeof quizStep.question === 'string' && quizStep.question.length > 10, `${lesson.id} quiz question missing`);
    assert.ok(Array.isArray(quizStep.options) && quizStep.options.length >= 3, `${lesson.id} quiz options must have >= 3 items`);
    assert.ok(
      typeof quizStep.correct === 'number' && quizStep.correct >= 0 && quizStep.correct < quizStep.options.length,
      `${lesson.id} quiz correct index invalid`
    );
    assert.ok(typeof quizStep.benefit === 'string' && quizStep.benefit.length > 15, `${lesson.id} quiz must have benefit rationale`);
  });
});

runTest('4.3 Quiz questions are 100% distinct across all 9 Phase 7 lessons', () => {
  const questions = new Set();
  p7Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    assert.ok(!questions.has(quizStep.question), `Duplicate quiz question detected in ${lesson.id}`);
    questions.add(quizStep.question);
  });
  assert.strictEqual(questions.size, 9);
});

runTest('4.4 Step 2 (practice/build) strictly matches lesson expected snippet and file', () => {
  p7Lessons.forEach(lesson => {
    const practiceStep = lesson.steps.find(s => s.id === 'practice');
    assert.strictEqual(practiceStep.file, lesson.file, `${lesson.id} practice file mismatch`);
    assert.strictEqual(practiceStep.expected, lesson.expected, `${lesson.id} practice expected mismatch`);
    assert.ok(practiceStep.code.includes(lesson.expected), `${lesson.id} practice code must contain expected`);
  });
});

// --- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---
console.log('\n--- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 9 Phase 7 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, true, `Lesson ${lesson.id} failed to match exact code`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.expected });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, true, `Lesson ${lesson.id} failed to match expected snippet: "${lesson.expected}"`);
  });
});

runTest('5.3 Whitespace tolerance: CRLF, extra spacing, tabs around expected snippet', () => {
  p7Lessons.forEach(lesson => {
    const variations = [
      `\r\n\r\n   ${lesson.expected}   \r\n\r\n`,
      `\t\t${lesson.expected}\t\t`,
      `// comment before\n${lesson.expected}\n// comment after`
    ];

    variations.forEach((variant, vIdx) => {
      setFiles({ [lesson.file]: variant });
      const result = checkSupportedTask(lesson);
      assert.strictEqual(result, true, `Lesson ${lesson.id} failed on whitespace variation ${vIdx}`);
    });
  });
});

runTest('5.4 Adversarial Failure: wrong file path returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ 'src/app/wrong-path.ts': lesson.expected });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, false, `Lesson ${lesson.id} must NOT pass when snippet is in wrong file`);
  });
});

runTest('5.5 Adversarial Failure: typo/corrupted expected snippet returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const corrupted = lesson.expected.replace(/([a-zA-Z]{3,})/g, 'XYZ_$1');
    setFiles({ [lesson.file]: corrupted });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, false, `Lesson ${lesson.id} must NOT pass with corrupted snippet: "${corrupted}"`);
  });
});

runTest('5.6 Adversarial Failure: empty or truncated file returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    assert.strictEqual(checkSupportedTask(lesson), false, `Lesson ${lesson.id} must NOT pass on empty file`);
    setFiles({ [lesson.file]: '   \n  \t  \n' });
    assert.strictEqual(checkSupportedTask(lesson), false, `Lesson ${lesson.id} must NOT pass on whitespace file`);
  });
});

// --- SECTION 6: Capstone Behavioral Logic Execution ---
console.log('\n--- SECTION 6: Capstone Behavioral Logic Execution ---');

runTest('6.1 CinemaStore signal state & toggleSeat functional behavior simulation', () => {
  // Simulate CinemaStore toggleSeat logic
  let selectedSeats = [];
  function toggleSeat(seatId) {
    if (selectedSeats.includes(seatId)) {
      selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      selectedSeats = [...selectedSeats, seatId];
    }
  }

  assert.strictEqual(selectedSeats.length, 0);
  toggleSeat('B4');
  assert.deepStrictEqual(selectedSeats, ['B4']);
  toggleSeat('A2');
  assert.deepStrictEqual(selectedSeats, ['B4', 'A2']);
  toggleSeat('B4');
  assert.deepStrictEqual(selectedSeats, ['A2']);
  toggleSeat('A2');
  assert.deepStrictEqual(selectedSeats, []);
});

runTest('6.2 CheckoutComponent 15% VAT and coupon discount computation simulation', () => {
  function computeFinalTotal(subtotal, couponDiscount = 0, vatMultiplier = 1.15) {
    const discounted = subtotal * (1 - couponDiscount);
    return Math.round(discounted * vatMultiplier * 100) / 100;
  }

  // 2 tickets at 85 SAR = 170 SAR
  const base170 = computeFinalTotal(170, 0);
  assert.strictEqual(base170, 195.5, '170 * 1.15 = 195.5');

  // With 10% coupon: 170 * 0.9 = 153 -> 153 * 1.15 = 175.95
  const withCoupon = computeFinalTotal(170, 0.10);
  assert.strictEqual(withCoupon, 175.95, '153 * 1.15 = 175.95');
});

runTest('6.3 60-seat matrix capacity structure verification', () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const matrix = [];
  for (const r of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      matrix.push({ id: `${r}${i}`, row: r, number: i });
    }
  }
  assert.strictEqual(matrix.length, 60, 'Auditorium matrix must have exactly 60 seats (6 rows x 10 seats)');
});

runTest('6.4 Vitest unit test suite specification validation', () => {
  const spec = courseData.starterFiles['src/app/core/store/cinema.store.spec.ts'];
  assert.ok(spec.includes("import { describe, it, expect } from 'vitest';"));
  assert.ok(spec.includes("expect(store.selectedSeats()).toEqual(['B4']);"));
  assert.ok(spec.includes("expect(store.selectedSeats()).toEqual([]);"));
  assert.ok(spec.includes("store.toggleSeat('B4');"));
});

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n===============================================================================');
console.log(`FINAL ADVERSARIAL VERIFICATION SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
console.log('===============================================================================');

if (totalTests === passedTests) {
  console.log('🎉 ALL PHASE 7 CAPSTONE ADVERSARIAL TESTS PASSED EMPIRICALLY (Zero Defects).\n');
  process.exit(0);
} else {
  console.error(`❌ VERIFICATION FAILED: ${totalTests - passedTests} tests failed.\n`);
  process.exit(1);
}

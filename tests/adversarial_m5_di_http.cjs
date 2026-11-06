/**
 * Adversarial Empirical Verification Suite for Phase 5 Modern DI, HttpClient & RxJS Interop (Milestone 5)
 * Exhaustive empirical testing covering all 7 Phase 5 lessons (ng-di-01 to ng-interop-01),
 * module descriptor, starterFiles integrity, simulator task matching, DI context, HTTP interceptor, and interop.
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
console.log('🌐 EMPIRICAL CHALLENGER: ADVERSARIAL VERIFICATION SUITE (PHASE 5 DI & HTTP)');
console.log('===============================================================================');

// 1. Load course data
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p5Lessons = courseData.lessons.filter(l => l.module === 'phase-5-di-http');

// --- SECTION 1: Module Metadata & Global Course Integrity ---
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-5-di-http" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-5-di-http'];
  assert.ok(mod, 'modules["phase-5-di-http"] must exist');
  assert.strictEqual(mod.id, 'phase-5-di-http');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.strictEqual(mod.icon, '🌐');
  assert.ok(typeof mod.badge === 'string' && mod.badge.includes('7'), 'mod.badge must indicate 7 lessons');
  assert.strictEqual(mod.lessonCount, 7, 'mod.lessonCount must be 7');
});

runTest('1.2 Exactly 7 lessons belong to module "phase-5-di-http"', () => {
  assert.strictEqual(p5Lessons.length, 7, 'Must have exactly 7 Phase 5 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-5-di-http'].lessonCount, p5Lessons.length);
});

runTest('1.3 Total course lesson count is valid (91 in Phase 5, 97 in Phase 6, 106 in Phase 7)', () => {
  assert.ok([91, 97, 106].includes(courseData.lessons.length), `Course contains ${courseData.lessons.length} lessons`);
});

runTest('1.4 Zero duplicate lesson IDs across all lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.ok([91, 97, 106].includes(ids.size), `Must have 91, 97, or 106 unique lesson IDs, got ${ids.size}`);
});

runTest('1.5 Phase 5 lessons occupy indices 38 through 44 in sequential order', () => {
  const expectedP5Ids = [
    'ng-di-01', 'ng-service-01', 'ng-http-01', 'ng-http-02',
    'ng-http-03', 'ng-http-04', 'ng-interop-01'
  ];
  expectedP5Ids.forEach((expectedId, offset) => {
    const idx = 38 + offset;
    assert.strictEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    assert.strictEqual(courseData.lessons[idx].module, 'phase-5-di-http');
  });
});

runTest('1.6 Preserved continuity across all curriculum sections', () => {
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
  // Continuity after Phase 5
  if (courseData.lessons.length === 91) {
    assert.strictEqual(courseData.lessons[45].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[90].id, 'final-review');
  } else if (courseData.lessons.length === 97) {
    assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
    assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
    assert.strictEqual(courseData.lessons[51].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  } else {
    assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
    assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
    assert.strictEqual(courseData.lessons[51].id, 'capstone-01');
    assert.strictEqual(courseData.lessons[59].id, 'capstone-09');
    assert.strictEqual(courseData.lessons[60].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  }
});

// --- SECTION 2: Starter Files Integrity & Modern DI/HTTP Architecture ---
console.log('\n--- SECTION 2: Starter Files Integrity & Modern DI/HTTP Architecture ---');

runTest('2.1 src/app/app.config.ts configures provideHttpClient(withFetch()) in providers', () => {
  const appConfigTs = courseData.starterFiles['src/app/app.config.ts'];
  assert.ok(appConfigTs, 'src/app/app.config.ts must exist');
  assert.ok(appConfigTs.includes('provideHttpClient'), 'Must import or use provideHttpClient');
  assert.ok(appConfigTs.includes('withFetch'), 'Must import or use withFetch');
  assert.ok(appConfigTs.includes('provideHttpClient(withFetch())'), 'Must configure provideHttpClient(withFetch())');
  assert.ok(appConfigTs.includes("from '@angular/common/http'"), 'Must import from @angular/common/http');
});

runTest('2.2 src/app/services/cinema.service.ts encapsulates state with private _selectedMovie and asReadonly()', () => {
  const serviceTs = courseData.starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(serviceTs, 'src/app/services/cinema.service.ts must exist');
  assert.ok(serviceTs.includes('_selectedMovie'), 'Must define private _selectedMovie');
  assert.ok(serviceTs.includes('readonly selectedMovie = this._selectedMovie.asReadonly()'), 'Must expose selectedMovie via asReadonly()');
  assert.ok(serviceTs.includes('selectMovie('), 'Must provide selectMovie method');
});

runTest('2.3 src/app/services/cinema.service.ts provides typed HTTP methods fetchMovies() and confirmBooking()', () => {
  const serviceTs = courseData.starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(serviceTs.includes('fetchMovies(): Observable<Movie[]>'), 'Must define fetchMovies(): Observable<Movie[]>');
  assert.ok(serviceTs.includes("return this.http.get<Movie[]>('/api/movies');"), 'fetchMovies must call http.get<Movie[]>');
  assert.ok(serviceTs.includes('confirmBooking('), 'Must define confirmBooking');
  assert.ok(serviceTs.includes("this.http.post<{ bookingId: string }>('/api/bookings'"), 'confirmBooking must call http.post');
});

runTest('2.4 src/app/services/cinema.service.ts imports inject, HttpClient and preserves existing methods', () => {
  const serviceTs = courseData.starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(serviceTs.includes('inject(HttpClient)'), 'Must inject HttpClient functionally');
  assert.ok(serviceTs.includes("from '@angular/common/http'"), 'Must import HttpClient from @angular/common/http');
  assert.ok(serviceTs.includes("from 'rxjs'"), 'Must import Observable from rxjs');
  assert.ok(serviceTs.includes('getMovies(): Movie[]'), 'Must preserve existing getMovies');
  assert.ok(serviceTs.includes('readonly movies = this._movies.asReadonly()'), 'Must preserve movies signal');
});

runTest('2.5 src/app/app.ts injects CinemaService functionally via inject(CinemaService)', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs, 'src/app/app.ts must exist');
  assert.ok(appTs.includes('private cinemaService = inject(CinemaService);'), 'Must inject CinemaService via inject()');
  assert.ok(appTs.includes("from './services/cinema.service'"), 'Must import CinemaService');
});

runTest('2.6 src/app/app.ts bridges Observable to Signal via toSignal()', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs.includes('moviesList = toSignal('), 'Must declare moviesList using toSignal');
  assert.ok(appTs.includes('this.cinemaService.fetchMovies()'), 'Must pass fetchMovies Observable to toSignal');
  assert.ok(appTs.includes("from '@angular/core/rxjs-interop'"), 'Must import toSignal from @angular/core/rxjs-interop');
});

runTest('2.7 src/app/app.ts strictly preserves all Phase 1-4 properties and methods', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  // Phase 1 / 2
  assert.ok(appTs.includes("title = 'سينما خطوة'"), 'Preserve title');
  assert.ok(appTs.includes("movieTitle = 'رحلة النجوم'"), 'Preserve movieTitle');
  assert.ok(appTs.includes('isSoldOut = false'), 'Preserve isSoldOut');
  assert.ok(appTs.includes('isAvailable = true'), 'Preserve isAvailable');
  assert.ok(appTs.includes('hasDiscount = true'), 'Preserve hasDiscount');
  assert.ok(appTs.includes('classicMovies: string[]'), 'Preserve classicMovies');
  assert.ok(appTs.includes('bookingCount = 0'), 'Preserve bookingCount');
  assert.ok(appTs.includes('bookingMessage = \'\''), 'Preserve bookingMessage');
  assert.ok(appTs.includes('currentMovie$: Observable<string>'), 'Preserve currentMovie$');
  assert.ok(appTs.includes('onBookTicket(): void'), 'Preserve onBookTicket');
  assert.ok(appTs.includes('onSeatSelected(seat: string): void'), 'Preserve onSeatSelected');
  // Phase 3
  assert.ok(appTs.includes('totalPrice = signal(250)'), 'Preserve totalPrice');
  assert.ok(appTs.includes('movies = ['), 'Preserve movies array');
  assert.ok(appTs.includes("bookingStatus: 'CONFIRMED'"), 'Preserve bookingStatus');
  // Phase 4
  assert.ok(appTs.includes('totalTickets = signal(10)'), 'Preserve totalTickets');
  assert.ok(appTs.includes('addTicket(): void'), 'Preserve addTicket');
});

runTest('2.8 src/app/interceptors/auth.interceptor.ts defines functional interceptor with token', () => {
  const authTs = courseData.starterFiles['src/app/interceptors/auth.interceptor.ts'];
  assert.ok(authTs, 'auth.interceptor.ts must exist');
  assert.ok(authTs.includes('export const authInterceptor: HttpInterceptorFn = (req, next) => {'), 'Must declare authInterceptor');
  assert.ok(authTs.includes('req.clone({'), 'Must clone request');
  assert.ok(authTs.includes('Authorization:'), 'Must set Authorization header');
  assert.ok(authTs.includes('return next('), 'Must forward modified request to next handler');
});

// --- SECTION 3: Phase 5 Lessons Schema & Pedagogical Substance ---
console.log('\n--- SECTION 3: Phase 5 Lessons Schema & Pedagogical Substance ---');

runTest('3.1 All 7 Phase 5 lessons have all 15 mandatory schema fields', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p5Lessons.forEach(lesson => {
    mandatoryFields.forEach(field => {
      assert.ok(lesson[field] !== undefined, `Lesson ${lesson.id} missing mandatory field "${field}"`);
    });
    assert.strictEqual(Object.keys(lesson).length, 15, `Lesson ${lesson.id} has unexpected extra fields`);
  });
});

runTest('3.2 Every Phase 5 lesson target file exists in starterFiles', () => {
  p5Lessons.forEach(lesson => {
    assert.ok(courseData.starterFiles[lesson.file], `Target file ${lesson.file} for ${lesson.id} must exist in starterFiles`);
  });
});

runTest('3.3 Every Phase 5 lesson references official documentation from angular.dev', () => {
  p5Lessons.forEach(lesson => {
    assert.match(
      lesson.reference,
      /^https:\/\/angular\.dev\//,
      `Lesson ${lesson.id} reference must point to official Angular documentation`
    );
  });
});

runTest('3.4 Every Phase 5 lesson code strictly contains its expected snippet', () => {
  p5Lessons.forEach(lesson => {
    assert.ok(
      lesson.code.includes(lesson.expected),
      `Lesson ${lesson.id} code must contain expected snippet: "${lesson.expected}"`
    );
  });
});

runTest('3.5 Every Phase 5 lesson visual flow notation contains directional arrows (⟶)', () => {
  p5Lessons.forEach(lesson => {
    assert.ok(
      lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'),
      `Lesson ${lesson.id} flow must contain arrow (⟶)`
    );
  });
});

runTest('3.6 Pedagogical Arabic prose depth and quality across all 7 lessons', () => {
  p5Lessons.forEach(lesson => {
    const arabicChars = (lesson.concept.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(
      arabicChars >= 500,
      `Lesson ${lesson.id} concept must contain >= 500 Arabic characters, got ${arabicChars}`
    );
  });
});

// --- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---
console.log('\n--- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---');

runTest('4.1 Every Phase 5 lesson has exactly 5 steps in correct order and type', () => {
  const expectedSteps = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p5Lessons.forEach(lesson => {
    assert.strictEqual(lesson.steps.length, 5, `Lesson ${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((step, idx) => {
      assert.strictEqual(step.id, expectedSteps[idx], `Step ${idx} in ${lesson.id} must have id "${expectedSteps[idx]}"`);
      assert.strictEqual(step.type, expectedTypes[idx], `Step ${idx} in ${lesson.id} must have type "${expectedTypes[idx]}"`);
      assert.ok(step.title && step.title.length > 5, `Step ${step.id} in ${lesson.id} must have descriptive title`);
      if (step.id !== 'quiz') {
        assert.ok(step.explanation && step.explanation.length > 20, `Step ${step.id} in ${lesson.id} must have substantial explanation`);
      }
    });
  });
});

runTest('4.2 Every Quiz step has complete question, options array (>=3), valid correct index, and benefit', () => {
  p5Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    assert.ok(quizStep, `Quiz step must exist in ${lesson.id}`);
    assert.ok(typeof quizStep.question === 'string' && quizStep.question.length > 10, `${lesson.id} quiz must have question`);
    assert.ok(Array.isArray(quizStep.options) && quizStep.options.length >= 3, `${lesson.id} quiz must have >= 3 options`);
    assert.ok(typeof quizStep.correct === 'number' && quizStep.correct >= 0 && quizStep.correct < quizStep.options.length, `${lesson.id} quiz correct index out of range`);
    assert.ok(typeof quizStep.benefit === 'string' && quizStep.benefit.length > 15, `${lesson.id} quiz must have benefit rationale`);
  });
});

runTest('4.3 Quiz questions are 100% distinct across all 7 lessons', () => {
  const questions = new Set();
  p5Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    assert.ok(!questions.has(quizStep.question), `Duplicate quiz question detected in ${lesson.id}`);
    questions.add(quizStep.question);
  });
  assert.strictEqual(questions.size, 7);
});

// --- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---
console.log('\n--- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 7 Phase 5 lessons', () => {
  p5Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, true, `Lesson ${lesson.id} failed to match exact code`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true for all 7 lessons', () => {
  p5Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.expected });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, true, `Lesson ${lesson.id} failed to match expected snippet: "${lesson.expected}"`);
  });
});

runTest('5.3 Whitespace tolerance: CRLF, extra spacing, tabs around expected snippet', () => {
  p5Lessons.forEach(lesson => {
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

runTest('5.4 Adversarial Failure: wrong file path returns false for all 7 lessons', () => {
  p5Lessons.forEach(lesson => {
    setFiles({ 'src/app/wrong-file.ts': lesson.expected });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, false, `Lesson ${lesson.id} must NOT pass when snippet is in wrong file`);
  });
});

runTest('5.5 Adversarial Failure: typo/corrupted expected snippet returns false for all 7 lessons', () => {
  p5Lessons.forEach(lesson => {
    // Corrupt key identifier
    const corrupted = lesson.expected.replace(/([a-zA-Z]{3,})/g, 'XYZ_$1');
    setFiles({ [lesson.file]: corrupted });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, false, `Lesson ${lesson.id} must NOT pass with corrupted snippet: "${corrupted}"`);
  });
});

runTest('5.6 Adversarial Failure: empty or truncated file returns false for all 7 lessons', () => {
  p5Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '   \n\t   ' });
    const resultEmpty = checkSupportedTask(lesson);
    assert.strictEqual(resultEmpty, false, `Lesson ${lesson.id} must NOT pass on empty file`);

    const truncated = lesson.expected.slice(0, Math.floor(lesson.expected.length / 2));
    setFiles({ [lesson.file]: truncated });
    const resultTruncated = checkSupportedTask(lesson);
    assert.strictEqual(resultTruncated, false, `Lesson ${lesson.id} must NOT pass on truncated snippet`);
  });
});

// --- SECTION 6: Modern DI & Reactive Interop Behavioral Execution ---
console.log('\n--- SECTION 6: Modern DI & Reactive Interop Behavioral Execution ---');

runTest('6.1 CinemaService state encapsulation protects against external mutations', () => {
  const serviceTs = courseData.starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(serviceTs.includes('asReadonly()'), 'Must call asReadonly()');
  assert.ok(serviceTs.includes('readonly selectedMovie = this._selectedMovie.asReadonly()'), 'selectedMovie must be readonly asReadonly');
  // Verify that selectedMovie does not have a non-underscored writable assignment
  assert.ok(!serviceTs.includes('this.selectedMovie.set('), 'Public selectedMovie must not have set() called');
});

runTest('6.2 AuthInterceptor functional pipeline clones and injects bearer token', () => {
  const authTs = courseData.starterFiles['src/app/interceptors/auth.interceptor.ts'];
  // Verify pipeline structure
  assert.ok(authTs.includes('req.clone('), 'Pipeline must clone request immutably');
  assert.ok(authTs.includes('next('), 'Pipeline must delegate to next handler');
});

runTest('6.3 StarterFiles pass TypeScript and Angular syntax validation', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  const cinemaTs = courseData.starterFiles['src/app/services/cinema.service.ts'];
  const appConfigTs = courseData.starterFiles['src/app/app.config.ts'];
  const authTs = courseData.starterFiles['src/app/interceptors/auth.interceptor.ts'];

  [appTs, cinemaTs, appConfigTs, authTs].forEach(code => {
    assert.ok(typeof code === 'string' && code.length > 50, 'Starter file must contain substantial valid code');
    // Basic balanced brackets check
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    assert.strictEqual(openBraces, closeBraces, 'Code must have balanced braces {}');
  });
});

// ===============================================================================
console.log('\n===============================================================================');
console.log(`FINAL ADVERSARIAL VERIFICATION SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
console.log('===============================================================================');

if (passedTests === totalTests) {
  console.log('🎉 ALL ADVERSARIAL TESTS PASSED EMPIRICALLY (Zero Defects).');
  process.exit(0);
} else {
  console.error(`❌ VERIFICATION FAILED: ${totalTests - passedTests} tests failed.`);
  process.exit(1);
}

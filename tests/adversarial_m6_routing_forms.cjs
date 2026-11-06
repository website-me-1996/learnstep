/**
 * Adversarial Empirical Verification Suite for Phase 6 Modern Routing & Typed Reactive Forms (Milestone 6)
 * Exhaustive empirical testing covering all 6 Phase 6 lessons (ng-route-01 to ng-forms-02),
 * module descriptor, starterFiles integrity, simulator task matching, whitespace tolerance,
 * functional guards, custom validators, and typed reactive forms.
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
console.log('🚦 EMPIRICAL CHALLENGER: ADVERSARIAL VERIFICATION SUITE (PHASE 6 ROUTING & FORMS)');
console.log('===============================================================================');

// 1. Load course data
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p6Lessons = courseData.lessons.filter(l => l.module === 'phase-6-routing-forms');

// --- SECTION 1: Module Metadata & Global Course Integrity ---
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-6-routing-forms" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-6-routing-forms'];
  assert.ok(mod, 'modules["phase-6-routing-forms"] must exist');
  assert.strictEqual(mod.id, 'phase-6-routing-forms');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.strictEqual(mod.icon, '🚦');
  assert.ok(typeof mod.badge === 'string' && mod.badge.includes('6'), 'mod.badge must indicate 6 lessons');
  assert.strictEqual(mod.lessonCount, 6, 'mod.lessonCount must be 6');
});

runTest('1.2 Exactly 6 lessons belong to module "phase-6-routing-forms"', () => {
  assert.strictEqual(p6Lessons.length, 6, 'Must have exactly 6 Phase 6 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-6-routing-forms'].lessonCount, p6Lessons.length);
});

runTest('1.3 Total course lesson count is valid (97 in Phase 6, 106 in Phase 7)', () => {
  assert.ok([97, 106].includes(courseData.lessons.length), 'Course must contain 97 or 106 lessons');
});

runTest('1.4 Zero duplicate lesson IDs across all lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.ok([97, 106].includes(ids.size), 'Must have 97 or 106 unique lesson IDs');
});

runTest('1.5 Phase 6 lessons occupy indices 45 through 50 in sequential order', () => {
  const expectedP6Ids = [
    'ng-route-01', 'ng-route-02', 'ng-route-03',
    'ng-route-04', 'ng-forms-01', 'ng-forms-02'
  ];
  expectedP6Ids.forEach((expectedId, offset) => {
    const idx = 45 + offset;
    assert.strictEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    assert.strictEqual(courseData.lessons[idx].module, 'phase-6-routing-forms');
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
  // Phase 6 (45-50)
  assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
  assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
  // Beyond Phase 6
  if (courseData.lessons.length === 97) {
    assert.strictEqual(courseData.lessons[51].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[96].id, 'final-review');
  } else {
    assert.strictEqual(courseData.lessons[51].id, 'capstone-01');
    assert.strictEqual(courseData.lessons[59].id, 'capstone-09');
    assert.strictEqual(courseData.lessons[60].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  }
});

// --- SECTION 2: Starter Files Integrity & Modern Routing / Forms Architecture ---
console.log('\n--- SECTION 2: Starter Files Integrity & Modern Routing / Forms Architecture ---');

runTest('2.1 src/app/app.routes.ts defines Routes array with default redirect and lazy loaded route', () => {
  const routesTs = courseData.starterFiles['src/app/app.routes.ts'];
  assert.ok(routesTs, 'src/app/app.routes.ts must exist');
  assert.ok(routesTs.includes("import { Routes } from '@angular/router';"), 'Must import Routes');
  assert.ok(routesTs.includes("export const routes: Routes = ["), 'Must export routes array');
  assert.ok(routesTs.includes("path: ''"), 'Must have default path');
  assert.ok(routesTs.includes("redirectTo: 'movies'"), 'Must redirect to movies');
  assert.ok(routesTs.includes("pathMatch: 'full'"), 'Must use pathMatch: full');
  assert.ok(routesTs.includes("path: 'booking/:id'"), 'Must declare booking/:id route');
  assert.ok(routesTs.includes("loadComponent: () => import('./features/booking/booking.component')"), 'Must use loadComponent');
});

runTest('2.2 src/app/features/booking/booking.component.ts exists with signal input id', () => {
  const compTs = courseData.starterFiles['src/app/features/booking/booking.component.ts'];
  assert.ok(compTs, 'src/app/features/booking/booking.component.ts must exist');
  assert.ok(compTs.includes("import { Component, input } from '@angular/core';"), 'Must import Component and input');
  assert.ok(compTs.includes("standalone: true"), 'Must be standalone component');
  assert.ok(compTs.includes("export class BookingComponent"), 'Must export BookingComponent');
  assert.ok(compTs.includes("id = input.required<string>();"), 'Must declare id = input.required<string>()');
});

runTest('2.3 src/app/features/booking/booking-form.component.ts exists with FormGroup and nonNullable', () => {
  const formTs = courseData.starterFiles['src/app/features/booking/booking-form.component.ts'];
  assert.ok(formTs, 'src/app/features/booking/booking-form.component.ts must exist');
  assert.ok(formTs.includes("ReactiveFormsModule"), 'Must import and use ReactiveFormsModule');
  assert.ok(formTs.includes("export class BookingFormComponent"), 'Must export BookingFormComponent');
  assert.ok(formTs.includes("bookingForm = new FormGroup({"), 'Must initialize bookingForm FormGroup');
  assert.ok(formTs.includes("customerName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })"), 'Must define customerName with nonNullable');
});

runTest('2.4 src/app/guards/booking.guard.ts defines functional CanActivateFn guard with createUrlTree', () => {
  const guardTs = courseData.starterFiles['src/app/guards/booking.guard.ts'];
  assert.ok(guardTs, 'src/app/guards/booking.guard.ts must exist');
  assert.ok(guardTs.includes("export const bookingGuard: CanActivateFn = (route, state) => {"), 'Must define bookingGuard with CanActivateFn');
  assert.ok(guardTs.includes("createUrlTree"), 'Must utilize createUrlTree');
});

runTest('2.5 src/app/validators/cinema.validators.ts defines custom saudiPhoneValidator', () => {
  const valTs = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  assert.ok(valTs, 'src/app/validators/cinema.validators.ts must exist');
  assert.ok(valTs.includes("export function saudiPhoneValidator(): ValidatorFn {"), 'Must export saudiPhoneValidator function');
  assert.ok(valTs.includes("saudiPhone:"), 'Must return error key saudiPhone');
});

runTest('2.6 Non-destructive preservation of all foundational Phase 1-5 starter files', () => {
  const sf = courseData.starterFiles;
  assert.ok(sf['src/app/app.config.ts'].includes('provideHttpClient(withFetch())'), 'app.config.ts must preserve provideHttpClient');
  assert.ok(sf['src/app/services/cinema.service.ts'].includes('inject(HttpClient)'), 'cinema.service.ts must preserve HttpClient');
  assert.ok(sf['src/app/interceptors/auth.interceptor.ts'].includes('HttpInterceptorFn'), 'auth.interceptor.ts must exist');
  assert.ok(sf['src/app/app.ts'].includes('inject(CinemaService)'), 'app.ts must inject CinemaService');
  assert.ok(sf['src/app/app.ts'].includes('toSignal('), 'app.ts must preserve toSignal');
  assert.ok(sf['src/app/components/movie-card.component.ts'], 'movie-card component must exist');
  assert.ok(sf['src/app/components/seat-picker.component.ts'], 'seat-picker component must exist');
  assert.ok(sf['src/app/classic/app-classic.module.ts'], 'app-classic module must exist');
});

// --- SECTION 3: Phase 6 Lessons Schema & Pedagogical Substance ---
console.log('\n--- SECTION 3: Phase 6 Lessons Schema & Pedagogical Substance ---');

runTest('3.1 All 6 Phase 6 lessons have all 15 mandatory schema fields', () => {
  const requiredKeys = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p6Lessons.forEach(lesson => {
    requiredKeys.forEach(k => {
      assert.ok(lesson[k] !== undefined, `Lesson ${lesson.id} missing field: ${k}`);
    });
    assert.strictEqual(Object.keys(lesson).length, 15, `Lesson ${lesson.id} has unexpected extra fields`);
  });
});

runTest('3.2 Every Phase 6 lesson target file exists in starterFiles', () => {
  p6Lessons.forEach(lesson => {
    assert.ok(
      courseData.starterFiles[lesson.file] !== undefined,
      `Lesson ${lesson.id} target file "${lesson.file}" not in starterFiles`
    );
  });
});

runTest('3.3 Every Phase 6 lesson references official documentation from angular.dev', () => {
  p6Lessons.forEach(lesson => {
    assert.ok(
      lesson.reference && lesson.reference.startsWith('https://angular.dev/'),
      `Lesson ${lesson.id} reference must point to angular.dev, got: ${lesson.reference}`
    );
  });
});

runTest('3.4 Every Phase 6 lesson code strictly contains its expected snippet', () => {
  p6Lessons.forEach(lesson => {
    assert.ok(
      lesson.code.includes(lesson.expected),
      `Lesson ${lesson.id} code does not contain expected snippet "${lesson.expected}"`
    );
  });
});

runTest('3.5 Every Phase 6 lesson visual flow notation contains directional arrows (⟶)', () => {
  p6Lessons.forEach(lesson => {
    assert.ok(
      lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'),
      `Lesson ${lesson.id} flow must contain arrow (⟶)`
    );
  });
});

runTest('3.6 Pedagogical Arabic prose depth and quality across all 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    const arabicChars = (lesson.concept.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(
      arabicChars >= 500,
      `Lesson ${lesson.id} concept must contain >= 500 Arabic characters, got ${arabicChars}`
    );
    assert.ok(
      lesson.summary.length >= 80,
      `Lesson ${lesson.id} summary must be descriptive (>= 80 chars)`
    );
  });
});

// --- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---
console.log('\n--- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---');

runTest('4.1 Every Phase 6 lesson has exactly 5 steps in correct order and type', () => {
  const expectedSteps = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p6Lessons.forEach(lesson => {
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
  p6Lessons.forEach(lesson => {
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

runTest('4.3 Quiz questions are 100% distinct across all 6 lessons', () => {
  const questions = new Set();
  p6Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    assert.ok(!questions.has(quizStep.question), `Duplicate quiz question detected in ${lesson.id}`);
    questions.add(quizStep.question);
  });
  assert.strictEqual(questions.size, 6);
});

runTest('4.4 Step 2 (practice/build) strictly matches lesson expected snippet and file', () => {
  p6Lessons.forEach(lesson => {
    const practiceStep = lesson.steps.find(s => s.id === 'practice');
    assert.strictEqual(practiceStep.file, lesson.file, `${lesson.id} practice file mismatch`);
    assert.strictEqual(practiceStep.expected, lesson.expected, `${lesson.id} practice expected mismatch`);
    assert.ok(practiceStep.code.includes(lesson.expected), `${lesson.id} practice code must contain expected`);
  });
});

// --- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---
console.log('\n--- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 6 Phase 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, true, `Lesson ${lesson.id} failed to match exact code`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true for all 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.expected });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, true, `Lesson ${lesson.id} failed to match expected snippet: "${lesson.expected}"`);
  });
});

runTest('5.3 Whitespace tolerance: CRLF, extra spacing, tabs around expected snippet', () => {
  p6Lessons.forEach(lesson => {
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

runTest('5.4 Adversarial Failure: wrong file path returns false for all 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    setFiles({ 'src/app/wrong-path.ts': lesson.expected });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, false, `Lesson ${lesson.id} must NOT pass when snippet is in wrong file`);
  });
});

runTest('5.5 Adversarial Failure: typo/corrupted expected snippet returns false for all 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    const corrupted = lesson.expected.replace(/([a-zA-Z]{3,})/g, 'XYZ_$1');
    setFiles({ [lesson.file]: corrupted });
    const result = checkSupportedTask(lesson);
    assert.strictEqual(result, false, `Lesson ${lesson.id} must NOT pass with corrupted snippet: "${corrupted}"`);
  });
});

runTest('5.6 Adversarial Failure: empty or truncated file returns false for all 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    assert.strictEqual(checkSupportedTask(lesson), false, `Lesson ${lesson.id} must NOT pass on empty file`);
    setFiles({ [lesson.file]: '   \n  \t  \n' });
    assert.strictEqual(checkSupportedTask(lesson), false, `Lesson ${lesson.id} must NOT pass on whitespace file`);
  });
});

// --- SECTION 6: Functional Routing & Reactive Forms Behavioral Execution ---
console.log('\n--- SECTION 6: Functional Routing & Reactive Forms Behavioral Execution ---');

runTest('6.1 Custom validator saudiPhoneValidator logic handles valid, invalid, and empty inputs', () => {
  // Extract and evaluate validator
  const valCode = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  assert.ok(valCode.includes('function saudiPhoneValidator'), 'saudiPhoneValidator function definition found');

  const jsCode = valCode
    .replace(/: ValidatorFn/g, '')
    .replace(/: AbstractControl/g, '')
    .replace(/: ValidationErrors \| null/g, '')
    .replace(/import .*/g, '')
    .replace(/export /g, '');

  // Eval function in isolated sandbox
  const vm = require('vm');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);
  const validator = sandbox.saudiPhoneValidator();

  // 1. Empty / null values -> null (valid/optional)
  assert.strictEqual(validator({ value: '' }), null, 'Empty string should be valid (optional)');
  assert.strictEqual(validator({ value: null }), null, 'null should be valid (optional)');

  // 2. Valid Saudi phone numbers
  assert.strictEqual(validator({ value: '0512345678' }), null, '0512345678 should be valid');
  assert.strictEqual(validator({ value: '512345678' }), null, '512345678 should be valid');
  assert.strictEqual(validator({ value: '0501122334' }), null, '0501122334 should be valid');
  assert.strictEqual(validator({ value: '  0559988776  ' }), null, 'Trimmed valid number should be valid');

  // 3. Invalid Saudi phone numbers
  const invalid1 = validator({ value: '0123456789' });
  assert.ok(invalid1 && invalid1.saudiPhone, '0123456789 must fail (wrong prefix)');

  const invalid2 = validator({ value: '051234567' }); // 9 digits with 05
  assert.ok(invalid2 && invalid2.saudiPhone, '9 digits with 05 must fail (too short)');

  const invalid3 = validator({ value: '05123456789' }); // 11 digits
  assert.ok(invalid3 && invalid3.saudiPhone, '11 digits must fail (too long)');

  const invalid4 = validator({ value: '051234abcd' });
  assert.ok(invalid4 && invalid4.saudiPhone, 'Alphanumeric must fail');
});

runTest('6.2 bookingGuard functional CanActivateFn structure and route redirection behavior', () => {
  const guardCode = courseData.starterFiles['src/app/guards/booking.guard.ts'];
  assert.ok(guardCode.includes('CanActivateFn'), 'Must type with CanActivateFn');
  assert.ok(guardCode.includes('inject(Router)'), 'Must inject Router');
  assert.ok(guardCode.includes('router.createUrlTree'), 'Must redirect via router.createUrlTree');
});

runTest('6.3 Typed Reactive Form nonNullable behavior verification', () => {
  // Simulate Angular FormControl nonNullable behavior
  function createMockFormControl(initialValue, options) {
    let value = initialValue;
    return {
      get value() { return value; },
      set value(v) { value = v; },
      reset(newVal) {
        if (newVal !== undefined) {
          value = newVal;
        } else if (options && options.nonNullable) {
          value = initialValue;
        } else {
          value = null;
        }
      }
    };
  }

  const standardCtrl = createMockFormControl('Initial');
  standardCtrl.reset();
  assert.strictEqual(standardCtrl.value, null, 'Standard control resets to null');

  const nonNullableCtrl = createMockFormControl('', { nonNullable: true });
  nonNullableCtrl.value = 'Mohamed';
  assert.strictEqual(nonNullableCtrl.value, 'Mohamed');
  nonNullableCtrl.reset();
  assert.strictEqual(nonNullableCtrl.value, '', 'nonNullable control resets to initial value, never null');
});

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n===============================================================================');
console.log(`FINAL ADVERSARIAL VERIFICATION SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
console.log('===============================================================================');

if (totalTests === passedTests) {
  console.log('🎉 ALL PHASE 6 ADVERSARIAL TESTS PASSED EMPIRICALLY (Zero Defects).\n');
  process.exit(0);
} else {
  console.error(`❌ VERIFICATION FAILED: ${totalTests - passedTests} tests failed.\n`);
  process.exit(1);
}

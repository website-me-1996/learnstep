/**
 * Adversarial Empirical Verification Suite for Phase 3 Modern Architecture & Control Flow (Milestone 3)
 * Tests all 7 Phase 3 lessons, module descriptor, starter files, and simulator integration.
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
console.log('⚡ EMPIRICAL CHALLENGER: ADVERSARIAL VERIFICATION SUITE (PHASE 3 MODERN)');
console.log('===============================================================================');

// 1. Load course data
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

// --- SECTION 1: Module Metadata & Global Course Integrity ---
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-3-modern" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-3-modern'];
  assert.ok(mod, 'modules["phase-3-modern"] must exist');
  assert.strictEqual(mod.id, 'phase-3-modern');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.strictEqual(mod.icon, '⚡');
  assert.ok(typeof mod.badge === 'string' && mod.badge.includes('7'), 'mod.badge must indicate 7 lessons');
  assert.strictEqual(mod.lessonCount, 7, 'mod.lessonCount must be 7');
});

runTest('1.2 Exactly 7 lessons belong to module "phase-3-modern"', () => {
  const p3Lessons = courseData.lessons.filter(l => l.module === 'phase-3-modern');
  assert.strictEqual(p3Lessons.length, 7, 'Must have exactly 7 Phase 3 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-3-modern'].lessonCount, p3Lessons.length);
});

runTest('1.3 Total course lesson count is valid (76 in Phase 3, 84 in Phase 4, 91 in Phase 5, 97 in Phase 6, 106 in Phase 7)', () => {
  assert.ok([76, 84, 91, 97, 106].includes(courseData.lessons.length), `Course contains ${courseData.lessons.length} lessons`);
});

runTest('1.4 Zero duplicate lesson IDs across all lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
});

runTest('1.5 Phase 3 lessons occupy indices 23 through 29 in sequential order', () => {
  const expectedP3Ids = [
    'ng-modern-01', 'ng-modern-02', 'ng-modern-03', 'ng-modern-04',
    'ng-modern-05', 'ng-modern-06', 'ng-modern-07'
  ];
  expectedP3Ids.forEach((expectedId, offset) => {
    const idx = 23 + offset;
    assert.strictEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
  });
});

runTest('1.6 Preserved continuity: index 0 is ng-ts-01, index 10 is ng-classic-01, index 22 is ng-classic-13, index 23 is ng-modern-01, index 29 is ng-modern-07', () => {
  assert.strictEqual(courseData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(courseData.lessons[9].id, 'ng-ts-10');
  assert.strictEqual(courseData.lessons[10].id, 'ng-classic-01');
  assert.strictEqual(courseData.lessons[22].id, 'ng-classic-13');
  assert.strictEqual(courseData.lessons[23].id, 'ng-modern-01');
  assert.strictEqual(courseData.lessons[29].id, 'ng-modern-07');
  if (courseData.lessons.length === 76) {
    assert.strictEqual(courseData.lessons[30].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[75].id, 'final-review');
  } else if (courseData.lessons.length === 84) {
    assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
    assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');
    assert.strictEqual(courseData.lessons[38].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[83].id, 'final-review');
  } else if (courseData.lessons.length === 91) {
    assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
    assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');
    assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
    assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
    assert.strictEqual(courseData.lessons[45].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  } else if (courseData.lessons.length === 97) {
    assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
    assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');
    assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
    assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
    assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
    assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
    assert.strictEqual(courseData.lessons[51].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  } else {
    assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
    assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');
    assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
    assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
    assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
    assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
    assert.strictEqual(courseData.lessons[51].id, 'capstone-01');
    assert.strictEqual(courseData.lessons[59].id, 'capstone-09');
    assert.strictEqual(courseData.lessons[60].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  }
});

// --- SECTION 2: Starter Files Integrity ---
console.log('\n--- SECTION 2: Starter Files Integrity ---');

runTest('2.1 src/app/app.ts contains all required modern control flow and signals properties', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs, 'src/app/app.ts must exist');
  assert.ok(appTs.includes('signal('), 'app.ts must use signal for totalPrice');
  assert.ok(appTs.includes('totalPrice = signal(250)'), 'totalPrice must evaluate >= 200');
  assert.ok(appTs.includes('movies ='), 'app.ts must define movies array');
  assert.ok(appTs.includes('bookingStatus'), 'app.ts must define bookingStatus');
  assert.ok(appTs.includes('standalone: true'), 'app.ts must have standalone: true');
});

runTest('2.2 src/app/app.ts strictly preserves all Phase 2 properties and methods', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs.includes('isAvailable = true') || appTs.includes('isAvailable: boolean = true'), 'Preserve isAvailable');
  assert.ok(appTs.includes('hasDiscount = true') || appTs.includes('hasDiscount: boolean = true'), 'Preserve hasDiscount');
  assert.ok(appTs.includes('classicMovies'), 'Preserve classicMovies');
  assert.ok(appTs.includes('onBookTicket()'), 'Preserve onBookTicket()');
  assert.ok(appTs.includes('currentMovie$'), 'Preserve currentMovie$');
  assert.ok(appTs.includes('onSeatSelected'), 'Preserve onSeatSelected()');
});

runTest('2.3 src/app/app.css contains all required classes for modern control flow', () => {
  const appCss = courseData.starterFiles['src/app/app.css'];
  assert.ok(appCss, 'src/app/app.css must exist');
  assert.ok(appCss.includes('.empty-notice'), 'app.css must include .empty-notice');
  assert.ok(appCss.includes('.seat-picker-section'), 'app.css must include .seat-picker-section');
  assert.ok(appCss.includes('.movie-pill'), 'app.css must include .movie-pill');
  assert.ok(appCss.includes('.badge.normal'), 'app.css must include .badge.normal');
  assert.ok(appCss.includes('.badge.discount'), 'app.css must include .badge.discount');
});

// --- SECTION 3: Phase 3 Lessons Schema & Pedagogical Content ---
console.log('\n--- SECTION 3: Phase 3 Lessons Schema & Pedagogical Content ---');

const p3Lessons = courseData.lessons.slice(23, 30);

runTest('3.1 All 7 Phase 3 lessons have all mandatory schema fields', () => {
  const fields = ['id', 'module', 'phase', 'title', 'duration', 'level', 'summary', 'concept', 'flow', 'task', 'file', 'code', 'expected', 'reference', 'steps'];
  p3Lessons.forEach(l => {
    fields.forEach(f => {
      assert.ok(l[f] !== undefined, `Lesson ${l.id} missing mandatory field: ${f}`);
    });
  });
});

runTest('3.2 Every Phase 3 lesson target file exists in starterFiles', () => {
  p3Lessons.forEach(l => {
    assert.ok(courseData.starterFiles[l.file] !== undefined, `Target file "${l.file}" in lesson ${l.id} must exist in starterFiles`);
  });
});

runTest('3.3 Every Phase 3 lesson has official documentation reference from angular.dev', () => {
  p3Lessons.forEach(l => {
    assert.ok(l.reference.startsWith('https://angular.dev/'), `Lesson ${l.id} reference must start with https://angular.dev/ (got: ${l.reference})`);
  });
});

runTest('3.4 Every Phase 3 lesson code strictly contains its expected snippet', () => {
  p3Lessons.forEach(l => {
    assert.ok(l.code.includes(l.expected), `Lesson ${l.id} code must contain expected snippet`);
  });
});

runTest('3.5 Every Phase 3 lesson has visual arrow flow (⟶)', () => {
  p3Lessons.forEach(l => {
    assert.ok(l.flow.includes('⟶'), `Lesson ${l.id} flow must contain arrow (⟶)`);
  });
});

// --- SECTION 4: 5-Step Pedagogy Structure & Sequencing ---
console.log('\n--- SECTION 4: 5-Step Pedagogy Structure & Sequencing ---');

runTest('4.1 Every Phase 3 lesson has exactly 5 steps in correct order and type', () => {
  const expectedSteps = [
    { id: 'idea', type: 'observe' },
    { id: 'anatomy', type: 'observe' },
    { id: 'practice', type: 'build' },
    { id: 'experiment', type: 'edit' },
    { id: 'quiz', type: 'quiz' }
  ];

  p3Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    expectedSteps.forEach((exp, sIdx) => {
      const step = l.steps[sIdx];
      assert.strictEqual(step.id, exp.id, `Lesson ${l.id} step ${sIdx} id must be ${exp.id}`);
      assert.strictEqual(step.type, exp.type, `Lesson ${l.id} step ${sIdx} type must be ${exp.type}`);
    });
  });
});

runTest('4.2 Every Quiz step has complete question, options array (>=3), valid correct index, and benefit', () => {
  p3Lessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(quiz.question && quiz.question.length > 10, `Quiz question in ${l.id} must be descriptive`);
    assert.ok(Array.isArray(quiz.options) && quiz.options.length >= 3, `Quiz in ${l.id} must have >= 3 options`);
    assert.ok(quiz.correct >= 0 && quiz.correct < quiz.options.length, `Quiz correct index in ${l.id} must be in bounds`);
    assert.ok(quiz.benefit && quiz.benefit.length > 5, `Quiz benefit in ${l.id} must be descriptive`);
  });
});

// --- SECTION 5: Simulator checkSupportedTask() Testing ---
console.log('\n--- SECTION 5: Simulator checkSupportedTask() Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 7 Phase 3 lessons', () => {
  p3Lessons.forEach(l => {
    setFiles({ [l.file]: l.code });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must pass with exact code`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true', () => {
  p3Lessons.forEach(l => {
    setFiles({ [l.file]: l.expected });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must pass with expected snippet`);
  });
});

runTest('5.3 Whitespace tolerance: CRLF and extra spacing', () => {
  p3Lessons.forEach(l => {
    const spaced = `\r\n   ${l.expected}   \r\n`;
    setFiles({ [l.file]: spaced });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must tolerate CRLF and spacing`);
  });
});

runTest('5.4 Adversarial Failure: wrong file path returns false', () => {
  p3Lessons.forEach(l => {
    setFiles({ 'src/app/wrong-file.ts': l.code, [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must fail if code is in wrong file`);
  });
});

runTest('5.5 Adversarial Failure: typo in expected snippet returns false', () => {
  p3Lessons.forEach(l => {
    const corrupted = l.expected.replace(/[a-zA-Z]/, 'X');
    setFiles({ [l.file]: corrupted });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must fail on corrupted expected`);
  });
});

// --- SECTION 6: Simulator Dynamic Control Flow Execution ---
console.log('\n--- SECTION 6: Simulator Dynamic Control Flow Execution ---');

runTest('6.1 Modern @if branch execution with totalPrice() >= 200', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-03');
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('خصم خاص مؤهل للشحن المجاني!'), 'Should render if block when price >= 200');
});

runTest('6.2 Modern @for loop rendering movies', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-04');
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('رحلة النجوم'), 'Should render first movie');
  assert.ok(html.includes('واحة الأمل'), 'Should render second movie');
});

runTest('6.3 Modern @switch branch execution with CONFIRMED status', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-06');
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('الحجز مؤكد وجاهز'), 'Should render CONFIRMED case');
});

runTest('6.4 Modern @defer block parsing', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-07');
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  assert.strictEqual(checkSupportedTask(l), true, 'ng-modern-07 must pass');
});

console.log('\n===============================================================================');
console.log(`FINAL ADVERSARIAL VERIFICATION SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
console.log('===============================================================================');

if (passedTests === totalTests) {
  console.log('🎉 ALL ' + totalTests + ' ADVERSARIAL TESTS PASSED EMPIRICALLY (Zero Defects).');
  process.exit(0);
} else {
  console.error('❌ SOME TESTS FAILED.');
  process.exit(1);
}

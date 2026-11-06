/**
 * Adversarial Empirical Verification Suite for Phase 2 Classic Angular (Milestone 2)
 * Tests all 13 Phase 2 lessons, module descriptor, starter files, and simulator integration.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
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
console.log('⚔️  EMPIRICAL CHALLENGER: ADVERSARIAL VERIFICATION SUITE (PHASE 2 CLASSIC)');
console.log('===============================================================================');

// 1. Load course data
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

// --- SECTION 1: Module Metadata & Global Course Integrity ---
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-2-classic" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-2-classic'];
  assert.ok(mod, 'modules["phase-2-classic"] must exist');
  assert.strictEqual(mod.id, 'phase-2-classic');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.ok(typeof mod.icon === 'string' && mod.icon.length > 0, 'mod.icon must be non-empty');
  assert.ok(typeof mod.badge === 'string' && mod.badge.length > 0, 'mod.badge must be non-empty');
  assert.strictEqual(mod.lessonCount, 13, 'mod.lessonCount must be 13');
});

runTest('1.2 Exactly 13 lessons belong to module "phase-2-classic"', () => {
  const p2Lessons = courseData.lessons.filter(l => l.module === 'phase-2-classic');
  assert.strictEqual(p2Lessons.length, 13, 'Must have exactly 13 Phase 2 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-2-classic'].lessonCount, p2Lessons.length);
});

runTest('1.3 Total course lesson count is 69 (10 Phase 1 + 13 Phase 2 + 46 legacy)', () => {
  assert.strictEqual(courseData.lessons.length, 69, 'Course must contain exactly 69 lessons during Milestone 2');
});

runTest('1.4 Zero duplicate lesson IDs across all 69 lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
});

runTest('1.5 Phase 2 lessons occupy indices 10 through 22 in sequential order', () => {
  const expectedP2Ids = [
    'ng-classic-01', 'ng-classic-02', 'ng-classic-03', 'ng-classic-04',
    'ng-classic-05', 'ng-classic-06', 'ng-classic-07', 'ng-classic-08',
    'ng-classic-09', 'ng-classic-10', 'ng-classic-11', 'ng-classic-12',
    'ng-classic-13'
  ];
  expectedP2Ids.forEach((expectedId, offset) => {
    const idx = 10 + offset;
    assert.strictEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
  });
});

runTest('1.6 Preserved continuity: index 0 is ng-ts-01, index 9 is ng-ts-10, index 23 is ng-intro, index 68 is final-review', () => {
  assert.strictEqual(courseData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(courseData.lessons[9].id, 'ng-ts-10');
  assert.strictEqual(courseData.lessons[23].id, 'ng-intro');
  assert.strictEqual(courseData.lessons[68].id, 'final-review');
});

// --- SECTION 2: Starter Files Integrity ---
console.log('\n--- SECTION 2: Starter Files Integrity ---');

const requiredClassicFiles = [
  'src/app/classic/app-classic.module.ts',
  'src/app/classic/movie-card-classic.component.ts',
  'src/app/classic/movie-card-classic.component.html',
  'src/app/classic/movie-card-classic.component.css',
  'src/app/classic/movie-detail-classic.component.ts',
  'src/app/classic/movie-detail-classic.component.html',
  'src/app/classic/movie-detail-classic.component.css',
  'src/app/classic/seat-item-classic.component.ts',
  'src/app/classic/cinema-classic.service.ts',
  'src/app/classic/rx-demo.ts'
];

runTest('2.1 All 10 required classic starter files exist and are non-empty', () => {
  requiredClassicFiles.forEach(f => {
    assert.ok(courseData.starterFiles[f], `starterFiles["${f}"] must exist`);
    assert.ok(typeof courseData.starterFiles[f] === 'string' && courseData.starterFiles[f].length > 20, `${f} must have content`);
  });
});

runTest('2.2 src/app/app.ts contains all required classic support properties and methods', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs, 'src/app/app.ts must exist');
  assert.ok(appTs.includes('isAvailable = true') || appTs.includes('isAvailable: boolean = true'), 'app.ts must declare isAvailable');
  assert.ok(appTs.includes('hasDiscount = true') || appTs.includes('hasDiscount: boolean = true'), 'app.ts must declare hasDiscount');
  assert.ok(appTs.includes('classicMovies'), 'app.ts must declare classicMovies');
  assert.ok(appTs.includes('onBookTicket()'), 'app.ts must implement onBookTicket()');
  assert.ok(appTs.includes('currentMovie$'), 'app.ts must declare currentMovie$');
});

// --- SECTION 3: Phase 2 Lessons Schema & Pedagogical Content ---
console.log('\n--- SECTION 3: Phase 2 Lessons Schema & Pedagogical Content ---');

const p2Lessons = courseData.lessons.slice(10, 23);

runTest('3.1 All 13 Phase 2 lessons have all mandatory schema fields', () => {
  const fields = ['id', 'module', 'phase', 'title', 'duration', 'level', 'summary', 'concept', 'flow', 'task', 'file', 'code', 'expected', 'reference', 'steps'];
  p2Lessons.forEach(l => {
    fields.forEach(f => {
      assert.ok(l[f] !== undefined, `Lesson ${l.id} missing mandatory field: ${f}`);
    });
  });
});

runTest('3.2 Every Phase 2 lesson target file exists in courseData.starterFiles', () => {
  p2Lessons.forEach(l => {
    assert.ok(courseData.starterFiles[l.file], `Target file ${l.file} for lesson ${l.id} must exist in starterFiles`);
  });
});

runTest('3.3 Every Phase 2 lesson has official documentation reference from angular.dev', () => {
  p2Lessons.forEach(l => {
    assert.ok(
      l.reference.startsWith('https://angular.dev/'),
      `Lesson ${l.id} reference must point to official angular.dev documentation, got: ${l.reference}`
    );
  });
});

runTest('3.4 Every Phase 2 lesson code strictly contains its expected snippet', () => {
  p2Lessons.forEach(l => {
    const list = Array.isArray(l.expected) ? l.expected : [l.expected];
    list.forEach(exp => {
      assert.ok(
        l.code.includes(exp),
        `Lesson ${l.id} code must contain expected snippet "${exp}"`
      );
    });
  });
});

runTest('3.5 Every Phase 2 lesson has visual arrow flow (⟶)', () => {
  p2Lessons.forEach(l => {
    assert.ok(l.flow.includes('⟶'), `Lesson ${l.id} flow must contain arrow symbol ⟶`);
  });
});

// --- SECTION 4: 5-Step Pedagogy Structure & Sequencing ---
console.log('\n--- SECTION 4: 5-Step Pedagogy Structure & Sequencing ---');

runTest('4.1 Every Phase 2 lesson has exactly 5 steps in correct order and type', () => {
  const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p2Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    l.steps.forEach((st, sIdx) => {
      assert.strictEqual(st.id, stepIds[sIdx], `Lesson ${l.id} step ${sIdx} id must be ${stepIds[sIdx]}`);
      assert.strictEqual(st.type, stepTypes[sIdx], `Lesson ${l.id} step ${sIdx} type must be ${stepTypes[sIdx]}`);
      assert.ok(st.title && st.title.length > 2, `Lesson ${l.id} step ${sIdx} must have title`);
    });
  });
});

runTest('4.2 Every Quiz step has complete question, options array (>=2), valid correct index, and benefit', () => {
  p2Lessons.forEach(l => {
    const qStep = l.steps[4];
    assert.ok(qStep.question && qStep.question.length > 5, `Lesson ${l.id} quiz must have question`);
    assert.ok(Array.isArray(qStep.options) && qStep.options.length >= 2, `Lesson ${l.id} quiz must have >=2 options`);
    assert.ok(typeof qStep.correct === 'number' && qStep.correct >= 0 && qStep.correct < qStep.options.length, `Lesson ${l.id} quiz correct index within bounds`);
    assert.ok(qStep.benefit && qStep.benefit.length > 5, `Lesson ${l.id} quiz must have benefit`);
  });
});

// --- SECTION 5: Simulator checkSupportedTask() Testing ---
console.log('\n--- SECTION 5: Simulator checkSupportedTask() Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 13 Phase 2 lessons', () => {
  p2Lessons.forEach(l => {
    setFiles({ [l.file]: l.code });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} exact code in ${l.file} must pass supportedTask`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true', () => {
  p2Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    setFiles({ [l.file]: `/* header */\n${exp}\n/* footer */` });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} snippet match must pass`);
  });
});

runTest('5.3 Whitespace tolerance: CRLF and extra spacing', () => {
  p2Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const crlf = `\r\n  \r\n  ${exp}  \r\n\r\n`;
    setFiles({ [l.file]: crlf });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} CRLF match must pass`);
  });
});

runTest('5.4 Adversarial Failure: wrong file path returns false', () => {
  p2Lessons.forEach(l => {
    setFiles({ 'src/wrong-file.ts': l.code, [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} placed in wrong file must fail`);
  });
});

runTest('5.5 Adversarial Failure: typo in expected snippet returns false', () => {
  p2Lessons.forEach(l => {
    setFiles({ [l.file]: 'export class TypoSomethingBroken {}' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} with typo must fail`);
  });
});

console.log('\n===============================================================================');
console.log(`FINAL ADVERSARIAL VERIFICATION SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
console.log('===============================================================================');

if (totalTests === passedTests) {
  console.log('🎉 ALL 20 ADVERSARIAL TESTS PASSED EMPIRICALLY (Zero Defects).');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} tests failed.`);
  process.exit(1);
}

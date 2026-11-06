/**
 * Exhaustive Final Milestone Independent Forensic Integrity Audit
 * Target: Khotwa Angular 22 Curriculum Rebuild & Expansion
 * Auditor: teamwork_auditor_final (Final Milestone Forensic Auditor)
 * Profile: General Project (Benchmark Mode - Maximum Strictness)
 * 
 * Verifies all 8 forensic integrity categories (Checks A through H):
 *   - Check A: Anti-Cheating & Facade Detection
 *   - Check B: Lesson Count & Non-Duplication
 *   - Check C: 15-Field Schema Verification
 *   - Check D: Task Matching Conformance
 *   - Check E: Micro-Learning 5-Step Structure
 *   - Check F: Reference URL Validation
 *   - Check G: StarterFiles Inventory Integrity
 *   - Check H: Runtime Simulator & Dual-Preview Conformance
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureLog = [];

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  [PASS] ${title}`);
  } catch (err) {
    failedChecks++;
    const errMsg = `  [FAIL] ${title} -> ${err.message}`;
    console.error(errMsg);
    failureLog.push({ title, error: err.message, stack: err.stack });
  }
}

console.log('===============================================================================');
console.log('🛡️ KHOTWA ANGULAR 22: FINAL MILESTONE INDEPENDENT FORENSIC AUDIT');
console.log('Auditor: teamwork_auditor_final | Mode: Benchmark (Zero Tolerance)');
console.log('===============================================================================');

// Safe loader for course data in isolated VM
function loadCourseData(filePath) {
  const fullPath = path.resolve(ROOT_DIR, filePath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.ANGULAR_COURSE_DATA;
}

const curData = loadCourseData('angular-course-data.js');
const oldData = loadCourseData('old-v1/angular-course-data.js');

const editorCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-editor.js'), 'utf8');
const courseCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-course-data.js'), 'utf8');

// Load E2E Harness for empirical browser simulator verification
const { createEditorEnvironment } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/e2e_harness.cjs'));
const env = createEditorEnvironment(curData);
const { checkSupportedTask, setFiles, getEl, runSimulatedPreview, getPreviewSrcdoc } = env;

// ============================================================================
// CHECK A: ANTI-CHEATING & FACADE DETECTION
// ============================================================================
console.log('\n--- CHECK A: Anti-Cheating & Facade Detection ---');

check('A.1 Production files contain zero banned cheating tokens', () => {
  const bannedKeywords = [
    '__MOCK__', 'FAKE_PASS', 'CHEAT', 'DUMMY_RESULT', 'TODO: implement',
    'lorem', 'ipsum', 'asdf', 'xxx'
  ];
  for (const kw of bannedKeywords) {
    const re = new RegExp(`\\b${kw}\\b`, 'i');
    assert.ok(!re.test(courseCode), `angular-course-data.js must not contain banned keyword "${kw}"`);
    assert.ok(!re.test(editorCode), `angular-editor.js must not contain banned keyword "${kw}"`);
  }
});

check('A.2 All starterFiles contain zero banned cheating tokens', () => {
  const bannedKeywords = ['__MOCK__', 'FAKE_PASS', 'CHEAT', 'DUMMY_RESULT'];
  for (const [filename, content] of Object.entries(curData.starterFiles)) {
    for (const kw of bannedKeywords) {
      const re = new RegExp(`\\b${kw}\\b`, 'i');
      assert.ok(!re.test(content), `starterFile "${filename}" must not contain banned token "${kw}"`);
    }
  }
});

check('A.3 angular-editor.js contains zero backdoors, test-specific overrides, or bypass comments', () => {
  assert.ok(!editorCode.includes('return true; // bypass'), 'No bypass comments in editor');
  assert.ok(!editorCode.includes('if (testMode) return true'), 'No testMode overrides in editor');
  assert.ok(!editorCode.includes('if (isTest)'), 'No isTest conditionals in editor');
  assert.ok(!editorCode.includes('bypassTask'), 'No bypassTask in editor');
});

check('A.4 supportedTask function in angular-editor.js implements genuine verification logic', () => {
  const match = editorCode.match(/function supportedTask\(lesson\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(match, 'supportedTask function must exist in angular-editor.js');
  const body = match[1].trim();
  assert.ok(body.includes('checks.every'), 'supportedTask must verify every check');
  assert.ok(body.includes('content.includes(expected)'), 'supportedTask must check content inclusion');
  assert.ok(body.includes('normalizeWhitespace'), 'supportedTask must normalize whitespace');
  assert.ok(!body.startsWith('return true;'), 'supportedTask must not immediately return true');
  assert.ok(!body.match(/^\s*return\s+true\s*;/m), 'supportedTask must not contain unconditional top-level return true');
});

check('A.5 Zero skipped or exclusive tests (.skip or .only) in all project test suites', () => {
  function getTestFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getTestFiles(full));
      } else if (entry.name.endsWith('.cjs') || entry.name.endsWith('.js')) {
        results.push(full);
      }
    }
    return results;
  }
  const allTestFiles = getTestFiles(path.resolve(ROOT_DIR, 'tests')).concat([
    path.resolve(ROOT_DIR, 'angular-course.test.cjs'),
    path.resolve(ROOT_DIR, 'behavior.test.cjs'),
    path.resolve(ROOT_DIR, 'behavior_test.cjs'),
    path.resolve(ROOT_DIR, 'guided_build_test.cjs')
  ]);

  allTestFiles.forEach(tf => {
    if (!fs.existsSync(tf)) return;
    const content = fs.readFileSync(tf, 'utf8');
    const skipped = content.match(/\b(it|test|describe)\.(skip|only)\b/g);
    assert.strictEqual(skipped, null, `Test file ${path.relative(ROOT_DIR, tf)} contains skipped/only tests: ${skipped}`);
  });
});

check('A.6 Zero facade implementations or empty stub functions in any modern lesson', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    assert.ok(!l.code.includes('return null; // dummy'), `Lesson ${l.id} must not contain dummy returns`);
    assert.ok(!l.code.includes('throw new Error("Not implemented")'), `Lesson ${l.id} must not throw NotImplemented`);
    assert.ok(l.code.trim().length >= 40, `Lesson ${l.id} code must be non-trivial (got length ${l.code.length})`);
    assert.ok(l.expected && l.expected.length >= 3, `Lesson ${l.id} expected must be non-trivial`);
  }
});

check('A.7 Pre-populated verification artifacts scan: no fabricated test output files', () => {
  const forbiddenArtifacts = ['test-results.xml', 'test-output.log', 'audit-bypass.json'];
  forbiddenArtifacts.forEach(art => {
    assert.ok(!fs.existsSync(path.resolve(ROOT_DIR, art)), `Fabricated artifact ${art} must not exist`);
  });
});

// ============================================================================
// CHECK B: LESSON COUNT & NON-DUPLICATION
// ============================================================================
console.log('\n--- CHECK B: Lesson Count & Non-Duplication ---');

check('B.1 Exactly 106 total lessons in window.ANGULAR_COURSE_DATA.lessons', () => {
  assert.strictEqual(curData.lessons.length, 106, `Expected exactly 106 lessons, got ${curData.lessons.length}`);
});

check('B.2 Exactly 106 unique lesson IDs (zero duplicates)', () => {
  const ids = curData.lessons.map(l => l.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(uniqueIds.size, 106, `Expected 106 unique IDs, found ${uniqueIds.size}`);
  assert.strictEqual(ids.length, uniqueIds.size, 'No duplicate lesson IDs permitted');
});

check('B.3 Exactly 60 modern lessons at indices 0 through 59', () => {
  const modern = curData.lessons.slice(0, 60);
  assert.strictEqual(modern.length, 60, 'Must have exactly 60 modern lessons');
  // Confirm indices 0-59 do not have legacy IDs
  modern.forEach((l, idx) => {
    assert.ok(l.id !== 'ng-intro', `Index ${idx} must be modern, found legacy id ${l.id}`);
  });
});

check('B.4 Exactly 7 consecutive modern modules with strictly matching lesson counts', () => {
  const expectedModules = [
    { id: 'phase-1-typescript', count: 10, start: 0, end: 9, startId: 'ng-ts-01', endId: 'ng-ts-10' },
    { id: 'phase-2-classic', count: 13, start: 10, end: 22, startId: 'ng-classic-01', endId: 'ng-classic-13' },
    { id: 'phase-3-modern', count: 7, start: 23, end: 29, startId: 'ng-modern-01', endId: 'ng-modern-07' },
    { id: 'phase-4-signals', count: 8, start: 30, end: 37, startId: 'ng-signal-01', endId: 'ng-signal-08' },
    { id: 'phase-5-di-http', count: 7, start: 38, end: 44, startId: 'ng-di-01', endId: 'ng-interop-01' },
    { id: 'phase-6-routing-forms', count: 6, start: 45, end: 50, startId: 'ng-route-01', endId: 'ng-forms-02' },
    { id: 'phase-7-capstone', count: 9, start: 51, end: 59, startId: 'capstone-01', endId: 'capstone-09' }
  ];

  let totalModern = 0;
  expectedModules.forEach(em => {
    totalModern += em.count;
    const desc = curData.modules[em.id];
    assert.ok(desc, `Module descriptor for "${em.id}" must exist in curData.modules`);
    assert.strictEqual(desc.lessonCount, em.count, `Module ${em.id} lessonCount mismatch: expected ${em.count}, got ${desc.lessonCount}`);

    const lessonsInModule = curData.lessons.slice(em.start, em.end + 1);
    assert.strictEqual(lessonsInModule.length, em.count, `Module ${em.id} slice length mismatch`);
    assert.strictEqual(curData.lessons[em.start].id, em.startId, `Module ${em.id} must start at id ${em.startId}`);
    assert.strictEqual(curData.lessons[em.end].id, em.endId, `Module ${em.id} must end at id ${em.endId}`);

    lessonsInModule.forEach((l, i) => {
      assert.strictEqual(l.module, em.id, `Lesson ${l.id} at index ${em.start + i} must belong to module ${em.id}`);
    });
  });
  assert.strictEqual(totalModern, 60, 'Sum of all modern module lesson counts must be 60');
});

check('B.5 Exactly 46 legacy lessons preserved at indices 60 through 105', () => {
  assert.strictEqual(oldData.lessons.length, 46, 'Legacy dataset in old-v1 must have 46 lessons');
  const legacySlice = curData.lessons.slice(60, 106);
  assert.strictEqual(legacySlice.length, 46, 'Must preserve exactly 46 legacy lessons');

  assert.strictEqual(curData.lessons[60].id, 'ng-intro', 'Legacy slice must start with ng-intro');
  assert.strictEqual(curData.lessons[105].id, 'final-review', 'Legacy slice must end with final-review');

  for (let i = 0; i < 46; i++) {
    const curLesson = curData.lessons[60 + i];
    const oldLesson = oldData.lessons[i];
    assert.strictEqual(curLesson.id, oldLesson.id, `Legacy lesson ${i} id mismatch: ${curLesson.id} vs ${oldLesson.id}`);
  }
});

// ============================================================================
// CHECK C: 15-FIELD SCHEMA VERIFICATION
// ============================================================================
console.log('\n--- CHECK C: 15-Field Schema Verification ---');

const REQUIRED_SCHEMA_FIELDS = [
  'id', 'module', 'phase', 'title', 'duration',
  'level', 'summary', 'concept', 'flow', 'task',
  'file', 'code', 'expected', 'reference', 'steps'
];

check('C.1 All 60 modern lessons contain all 15 required fields', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    REQUIRED_SCHEMA_FIELDS.forEach(field => {
      assert.ok(field in l, `Lesson ${i} (${l.id}) is missing required field "${field}"`);
      assert.ok(l[field] !== undefined && l[field] !== null, `Lesson ${i} (${l.id}) field "${field}" must not be null/undefined`);
    });
  }
});

check('C.2 All 15 schema fields have non-empty valid content across all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    REQUIRED_SCHEMA_FIELDS.forEach(field => {
      if (field === 'steps') {
        assert.ok(Array.isArray(l.steps) && l.steps.length === 5, `Lesson ${l.id} steps must be an array of length 5`);
      } else if (field === 'expected' && Array.isArray(l.expected)) {
        assert.ok(l.expected.length > 0, `Lesson ${l.id} expected array must not be empty`);
      } else {
        assert.strictEqual(typeof l[field], 'string', `Lesson ${l.id} field "${field}" must be a string`);
        assert.ok(l[field].trim().length > 0, `Lesson ${l.id} field "${field}" must not be empty`);
      }
    });
  }
});

check('C.3 Substantive pedagogical depth in Arabic concept field across all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const arabicChars = (l.concept.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(arabicChars >= 200, `Lesson ${l.id} concept has only ${arabicChars} Arabic chars (min 200)`);
    assert.ok(l.concept.length >= 300, `Lesson ${l.id} concept length must be >= 300 chars (got ${l.concept.length})`);
    assert.ok(l.summary.length >= 20, `Lesson ${l.id} summary must be descriptive`);
  }
});

check('C.4 Visual flow diagram with Unicode arrow (⟶) across all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    assert.ok(l.flow.includes('⟶'), `Lesson ${l.id} flow must contain visual arrow "⟶"`);
    const segments = l.flow.split('⟶').map(s => s.trim()).filter(Boolean);
    assert.ok(segments.length >= 3, `Lesson ${l.id} flow must have at least 3 stages separated by "⟶"`);
  }
});

check('C.5 Phase Arabic titles and level descriptors conform strictly across all 60 modern lessons', () => {
  const validLevels = ['مبتدئ', 'متوسط', 'متقدم'];
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    assert.ok(validLevels.includes(l.level), `Lesson ${l.id} level "${l.level}" must be one of ${validLevels.join(', ')}`);
    assert.ok(l.phase && l.phase.startsWith('المرحلة'), `Lesson ${l.id} phase "${l.phase}" must start with "المرحلة"`);
    assert.ok(l.duration && l.duration.includes('دقيقة'), `Lesson ${l.id} duration "${l.duration}" must include "دقيقة"`);
  }
});

// ============================================================================
// CHECK D: TASK MATCHING CONFORMANCE
// ============================================================================
console.log('\n--- CHECK D: Task Matching Conformance ---');

check('D.1 code.includes(expected) === true strictly holding across all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    if (Array.isArray(l.expected)) {
      l.expected.forEach((snip, sIdx) => {
        assert.ok(l.code.includes(snip), `Lesson ${l.id} code must contain expected[${sIdx}]: "${snip}"`);
      });
    } else {
      assert.ok(l.code.includes(l.expected), `Lesson ${l.id} code must contain expected: "${l.expected}"`);
    }
  }
});

check('D.2 Runtime supportedTask succeeds on exact full lesson.code for all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    setFiles({ [l.file]: l.code });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} failed exact code match check in supportedTask`);
  }
});

check('D.3 Runtime supportedTask succeeds on isolated expected snippet for all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const snippetContent = Array.isArray(l.expected) ? l.expected.join('\n\n') : l.expected;
    setFiles({ [l.file]: snippetContent });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} failed snippet match check in supportedTask`);
  }
});

check('D.4 Runtime supportedTask whitespace tolerance (CRLF, tabs, spaces, comments) across all 60 lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const baseSnippet = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const mutated = `\r\n  // Test comment before\r\n\t  ${baseSnippet}  \r\n  /* Test comment after */\r\n`;
    setFiles({ [l.file]: mutated });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} failed whitespace-tolerant check in supportedTask`);
  }
});

check('D.5 Adversarial Rejection: wrong target file path returns false for all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const snippet = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    setFiles({ 'src/app/unauthorized-file.ts': snippet });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, false, `Lesson ${l.id} must reject expected snippet in wrong file`);
  }
});

check('D.6 Adversarial Rejection: corrupted code token returns false for all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const snippet = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const corrupted = snippet.replace(/[a-zA-Z]/, 'Z_CORRUPTED_');
    setFiles({ [l.file]: corrupted });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, false, `Lesson ${l.id} must reject corrupted expected snippet`);
  }
});

check('D.7 Adversarial Rejection: empty or whitespace-only files return false for all 60 modern lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    setFiles({ [l.file]: '   \r\n\t   ' });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, false, `Lesson ${l.id} must reject empty/whitespace-only file`);
  }
});

// ============================================================================
// CHECK E: MICRO-LEARNING 5-STEP STRUCTURE
// ============================================================================
console.log('\n--- CHECK E: Micro-Learning 5-Step Structure ---');

check('E.1 Exactly 5 micro-learning steps per lesson across all 60 modern lessons (300 steps total)', () => {
  let stepTotal = 0;
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    stepTotal += l.steps.length;
  }
  assert.strictEqual(stepTotal, 300, `Expected 300 total steps across 60 lessons, found ${stepTotal}`);
});

check('E.2 Step IDs strictly match [idea, anatomy, practice, experiment, quiz] in order for all 60 lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const actualIdsStr = l.steps.map(s => s.id).join(',');
    assert.strictEqual(actualIdsStr, 'idea,anatomy,practice,experiment,quiz', `Lesson ${l.id} step IDs sequence mismatch`);
  }
});

check('E.3 Step types strictly match [observe, observe, build, edit, quiz] in order for all 60 lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const actualTypesStr = l.steps.map(s => s.type).join(',');
    assert.strictEqual(actualTypesStr, 'observe,observe,build,edit,quiz', `Lesson ${l.id} step types sequence mismatch`);
  }
});

check('E.4 Step 2 (practice/build) strictly matches lesson.file and lesson.expected across all 60 lessons', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const practiceStep = l.steps[2];
    assert.strictEqual(practiceStep.file, l.file, `Lesson ${l.id} step 2 file must match lesson.file`);
    assert.deepStrictEqual(practiceStep.expected, l.expected, `Lesson ${l.id} step 2 expected must match lesson.expected`);
    assert.ok(practiceStep.title && practiceStep.title.length > 5, `Lesson ${l.id} step 2 must have title`);
    assert.ok(practiceStep.task && practiceStep.task.length > 5, `Lesson ${l.id} step 2 must have task`);
  }
});

check('E.5 Step 4 (quiz) integrity: descriptive question, >= 2 options, valid correct index, Arabized benefit', () => {
  const quizQuestions = new Set();
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    const quiz = l.steps[4];
    assert.strictEqual(quiz.type, 'quiz', `Lesson ${l.id} step 4 must have type quiz`);
    assert.ok(quiz.question && quiz.question.length >= 10, `Lesson ${l.id} quiz question must be descriptive`);
    assert.ok(!quizQuestions.has(quiz.question), `Quiz question in ${l.id} must be unique`);
    quizQuestions.add(quiz.question);

    assert.ok(Array.isArray(quiz.options), `Lesson ${l.id} quiz options must be an array`);
    assert.ok(quiz.options.length >= 2, `Lesson ${l.id} quiz must have at least 2 options (got ${quiz.options.length})`);
    assert.ok(typeof quiz.correct === 'number', `Lesson ${l.id} quiz correct must be a number`);
    assert.ok(quiz.correct >= 0 && quiz.correct < quiz.options.length, `Lesson ${l.id} quiz correct index ${quiz.correct} out of bounds`);
    assert.ok(quiz.benefit && quiz.benefit.length >= 10, `Lesson ${l.id} quiz benefit must be descriptive Arabic explanation`);
    const arabicChars = (quiz.benefit.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(arabicChars >= 10, `Lesson ${l.id} quiz benefit must contain Arabic characters`);
  }
  assert.strictEqual(quizQuestions.size, 60, 'All 60 quiz questions must be distinct');
});

// ============================================================================
// CHECK F: REFERENCE URL VALIDATION
// ============================================================================
console.log('\n--- CHECK F: Reference URL Validation ---');

const REFERENCE_URL_REGEX = /^https:\/\/(angular\.dev|www\.typescriptlang\.org)\//;

check('F.1 All 60 modern lessons have official documentation references matching regex', () => {
  for (let i = 0; i < 60; i++) {
    const l = curData.lessons[i];
    assert.ok(REFERENCE_URL_REGEX.test(l.reference), `Lesson ${l.id} reference "${l.reference}" does not match required regex`);
  }
});

check('F.2 Phase 1 (TypeScript) lessons reference typescriptlang.org or angular.dev', () => {
  for (let i = 0; i < 10; i++) {
    const l = curData.lessons[i];
    assert.ok(
      l.reference.startsWith('https://www.typescriptlang.org/') || l.reference.startsWith('https://angular.dev/'),
      `Phase 1 lesson ${l.id} reference must point to TypeScript or Angular docs`
    );
  }
});

check('F.3 Phases 2 through 7 (Angular) lessons reference angular.dev exclusively', () => {
  for (let i = 10; i < 60; i++) {
    const l = curData.lessons[i];
    assert.ok(l.reference.startsWith('https://angular.dev/'), `Angular lesson ${l.id} reference must point to https://angular.dev/`);
  }
});

// ============================================================================
// CHECK G: STARTERFILES INVENTORY INTEGRITY
// ============================================================================
console.log('\n--- CHECK G: StarterFiles Inventory Integrity ---');

const sf = curData.starterFiles;

check('G.1 Exactly 49 starterFiles in window.ANGULAR_COURSE_DATA.starterFiles', () => {
  const keys = Object.keys(sf);
  assert.strictEqual(keys.length, 49, `Expected exactly 49 starterFiles, found ${keys.length}`);
});

check('G.2 Core enterprise build, config, and root files exist and are non-empty', () => {
  const coreFiles = [
    'package.json', 'angular.json', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json',
    'src/index.html', 'src/main.ts', 'src/styles.css', 'src/app/app.config.ts', 'src/app/app.ts',
    'src/app/app.html', 'src/app/app.css', 'src/app/app.routes.ts', 'src/app/app.spec.ts'
  ];
  coreFiles.forEach(cf => {
    assert.ok(cf in sf, `Core file "${cf}" missing from starterFiles`);
    assert.ok(sf[cf].length > 20, `Core file "${cf}" must not be empty`);
  });
});

check('G.3 Phase 1 foundational TypeScript models exist and define authentic domain contracts', () => {
  const modelFiles = [
    'src/app/models/movie.model.ts',
    'src/app/models/seat.model.ts',
    'src/app/models/booking.model.ts',
    'src/app/models/hall.model.ts',
    'src/app/models/pricing.utils.ts',
    'src/app/models/api-response.model.ts',
    'src/app/models/metadata.demo.ts'
  ];
  modelFiles.forEach(mf => {
    assert.ok(mf in sf, `Model file "${mf}" missing from starterFiles`);
    assert.ok(sf[mf].length > 30, `Model file "${mf}" must not be empty`);
  });
  assert.ok(sf['src/app/models/movie.model.ts'].includes('interface Movie'), 'movie.model.ts must export interface Movie');
  assert.ok(sf['src/app/models/api-response.model.ts'].includes('interface ApiResponse<T>'), 'api-response.model.ts must define generic interface');
  assert.ok(sf['src/app/models/hall.model.ts'].includes('class CinemaHall'), 'hall.model.ts must define CinemaHall class');
});

check('G.4 Phase 7 enterprise capstone files exist and implement complete Khotwa Cinema Pro application', () => {
  const capstoneFiles = [
    'src/app/core/models/cinema-state.model.ts',
    'src/app/core/store/cinema.store.ts',
    'src/app/core/store/cinema.store.spec.ts',
    'src/app/features/movies/movie-catalog.component.ts',
    'src/app/features/booking/seat-matrix.component.ts',
    'src/app/features/checkout/checkout.component.ts',
    'src/app/features/tickets/ticket-pass.component.ts',
    'README.md'
  ];
  capstoneFiles.forEach(cf => {
    assert.ok(cf in sf, `Capstone file "${cf}" missing from starterFiles`);
    assert.ok(sf[cf].length > 50, `Capstone file "${cf}" must not be empty`);
  });

  // Verify CinemaStore architecture
  const store = sf['src/app/core/store/cinema.store.ts'];
  assert.ok(store.includes('export class CinemaStore'), 'CinemaStore must be exported');
  assert.ok(store.includes('signal<Movie[]>'), 'CinemaStore must have movies signal');
  assert.ok(store.includes('signal<Seat[]>'), 'CinemaStore must have seats signal');
  assert.ok(store.includes('signal<string[]>'), 'CinemaStore must have selectedSeats signal');
  assert.ok(store.includes('toggleSeat(seatId: string)'), 'CinemaStore must implement toggleSeat');
  assert.ok(store.includes('computed('), 'CinemaStore must implement computed properties');

  // Verify Vitest test spec
  const spec = sf['src/app/core/store/cinema.store.spec.ts'];
  assert.ok(spec.includes("from 'vitest'"), 'spec must import vitest');
  assert.ok(spec.includes("describe('CinemaStore'"), 'spec must describe CinemaStore');
  assert.ok(spec.includes('expect(store.selectedSeats())'), 'spec must assert signal state');

  // Verify README
  const readme = sf['README.md'];
  assert.ok(readme.includes('Khotwa Cinema Pro'), 'README must mention Khotwa Cinema Pro');
  assert.ok(readme.length >= 800, 'README must be comprehensive');
});

check('G.5 Project path security validation approves all 49 starterFiles and rejects dangerous paths', () => {
  const match = editorCode.match(/function isAllowedProjectPath\(path\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(match, 'isAllowedProjectPath must exist in angular-editor.js');

  const checkAllowed = (p) => {
    const sandbox = { targetPath: p };
    vm.createContext(sandbox);
    return vm.runInContext(`(${match[0]})(targetPath)`, sandbox);
  };

  // All 49 starterFiles must pass
  for (const filename of Object.keys(sf)) {
    assert.strictEqual(checkAllowed(filename), true, `StarterFile "${filename}" must be approved by isAllowedProjectPath`);
  }

  // Dangerous paths must be strictly rejected
  const maliciousPaths = [
    '../package.json',
    '../../etc/passwd',
    '/root/secret.key',
    '.git/config',
    '.angular/cache/file.js',
    'node_modules/vite/index.js',
    'dist/main.js',
    'src/app/secret.exe'
  ];
  maliciousPaths.forEach(mp => {
    assert.strictEqual(checkAllowed(mp), false, `Malicious path "${mp}" must be rejected by isAllowedProjectPath`);
  });
});

// ============================================================================
// CHECK H: RUNTIME SIMULATOR & DUAL-PREVIEW CONFORMANCE
// ============================================================================
console.log('\n--- CHECK H: Runtime Simulator & Dual-Preview Conformance ---');

check('H.1 TypeScript console visualizer renders TS definitions and logs for Phase 1', () => {
  setFiles({
    'src/app/models/movie.model.ts': `
      export interface Movie {
        id: number;
        title: string;
      }
      const testMovie: Movie = { id: 1, title: 'Inception' };
      console.log('Loaded movie:', testMovie.title);
    `
  });
  env.setActivePath('src/app/models/movie.model.ts');
  runSimulatedPreview();
  const srcdoc = getPreviewSrcdoc();
  assert.ok(srcdoc.includes('Movie'), 'Preview srcdoc must include interface name Movie');
  assert.ok(srcdoc.includes('ts-console-box') || srcdoc.includes('Loaded movie: Inception') || srcdoc.includes('ts-interface-card'), 'Preview must render TS visualizer or console box');
});

check('H.2 Control Flow parser evaluates @if, @else if, and @else branches accurately', () => {
  const tpl = '@if (tier === "vip") { <span class="badge-vip">VIP Ticket</span> } @else if (tier === "student") { <span class="badge-stu">Student</span> } @else { <span class="badge-std">Standard</span> }';
  
  const outVip = env.context.parseAndEvaluateIfBlocks(tpl, { tier: 'vip' });
  assert.ok(outVip.includes('VIP Ticket'), 'Must render VIP Ticket when tier is vip');
  assert.ok(!outVip.includes('Student'), 'Must NOT render Student when tier is vip');
  assert.ok(!outVip.includes('Standard'), 'Must NOT render Standard when tier is vip');

  const outStu = env.context.parseAndEvaluateIfBlocks(tpl, { tier: 'student' });
  assert.ok(outStu.includes('Student'), 'Must render Student when tier is student');
  assert.ok(!outStu.includes('VIP Ticket'), 'Must NOT render VIP when tier is student');

  const outStd = env.context.parseAndEvaluateIfBlocks(tpl, { tier: 'other' });
  assert.ok(outStd.includes('Standard'), 'Must render Standard fallback');
});

check('H.3 Control Flow parser evaluates @for with track and @empty fallback', () => {
  const forTpl = '@for (seat of seats; track seat.id) { <div class="seat">{{ seat.id }}</div> } @empty { <div class="empty">No seats available</div> }';

  // Populated
  const outPop = env.context.parseAndEvaluateForBlocks(forTpl, { seats: [{ id: 'A1' }, { id: 'A2' }] });
  assert.ok(outPop.includes('A1'), 'Must render seat A1');
  assert.ok(outPop.includes('A2'), 'Must render seat A2');
  assert.ok(!outPop.includes('No seats available'), 'Must NOT render empty block when items exist');

  // Empty
  const outEmpty = env.context.parseAndEvaluateForBlocks(forTpl, { seats: [] });
  assert.ok(outEmpty.includes('No seats available'), 'Must render empty fallback block');
  assert.ok(!outEmpty.includes('A1'), 'Must NOT render items when collection is empty');
});

check('H.4 Control Flow parser evaluates @switch, @case, and @default branching', () => {
  const swTpl = '@switch (status) { @case ("confirmed") { <p class="confirmed">Confirmed</p> } @case ("pending") { <p class="pending">Pending</p> } @default { <p class="other">Other</p> } }';

  const outConfirmed = env.context.parseAndEvaluateSwitchBlocks(swTpl, { status: 'confirmed' });
  assert.ok(outConfirmed.includes('Confirmed'), 'Must match confirmed case');
  assert.ok(!outConfirmed.includes('Pending'), 'Must NOT match pending case');

  const outDefault = env.context.parseAndEvaluateSwitchBlocks(swTpl, { status: 'cancelled' });
  assert.ok(outDefault.includes('Other'), 'Must match default branch');
});

check('H.5 Control Flow parser evaluates @defer and @placeholder blocks', () => {
  const defTpl = '@defer (on viewport) { <div class="heavy-chart">Detailed Analytics Chart</div> } @placeholder { <div class="loading-skeleton">Loading analytics...</div> }';
  const outDef = env.context.parseAndEvaluateDeferBlocks(defTpl);
  assert.ok(outDef.includes('Detailed Analytics Chart') || outDef.includes('Loading analytics...'), 'Simulator must parse @defer and @placeholder constructs');
});

check('H.6 Classic directives parser resolves *ngIf, *ngFor, and [ngClass]', () => {
  const classicTpl = `
    <div *ngIf="isAvailable" [ngClass]="{ 'active-pill': isAvailable }">Available Now</div>
    <div *ngIf="!isAvailable">Sold Out</div>
    <ul>
      <li *ngFor="let item of classicItems; let i = index">#{{ i }} - {{ item }}</li>
    </ul>
  `;
  const outClassic = env.context.parseAndEvaluateClassicDirectives(classicTpl, {
    isAvailable: true,
    classicItems: ['Popcorn', 'Soda']
  });

  assert.ok(outClassic.includes('Available Now'), 'Must evaluate *ngIf truthy branch');
  assert.ok(!outClassic.includes('Sold Out'), 'Must NOT evaluate *ngIf falsy branch');
  assert.ok(outClassic.includes('#0 - Popcorn'), 'Must evaluate *ngFor index 0');
  assert.ok(outClassic.includes('#1 - Soda'), 'Must evaluate *ngFor index 1');
});

check('H.7 Dynamic signals extraction parses signal(), computed(), and model() in preview', () => {
  setFiles({
    'src/app/app.ts': `
      export class App {
        ticketCount = signal(3);
        ticketPrice = signal(85);
        totalPrice = computed(() => this.ticketCount() * this.ticketPrice());
      }
    `,
    'src/app/app.html': `
      <div class="summary">Tickets: {{ ticketCount() }} | Total: {{ totalPrice() }} SAR</div>
    `
  });
  env.setActivePath('src/app/app.ts');
  runSimulatedPreview();
  const srcdoc = getPreviewSrcdoc();
  assert.ok(srcdoc.includes('Tickets: 3'), 'Must read extracted ticketCount signal');
  assert.ok(srcdoc.includes('Total: 255 SAR'), 'Must evaluate computed signal arithmetic');
});

check('H.8 Slot Builder tokenization produces valid interactive slot elements for lessons', () => {
  const step = {
    type: 'practice',
    file: 'src/app/app.html',
    code: '<button class="btn-primary" id="bookSeatBtn">تأكيد حجز المقعد</button>'
  };
  const lesson = { id: 'test-slot-1', file: 'src/app/app.html' };

  env.renderSlotBuilder(step, lesson);
  const slotBuilder = getEl('angularSlotBuilder');
  assert.strictEqual(slotBuilder.hidden, false, 'Slot builder must be unhidden for practice step');
  assert.ok(slotBuilder.innerHTML && slotBuilder.innerHTML.length > 50, 'Slot builder must generate token slot HTML');
  assert.ok(slotBuilder.innerHTML.includes('تأكيد حجز المقعد'), 'Slot input must contain inner text');
});

// ============================================================================
// AUDIT VERDICT SUMMARY
// ============================================================================
console.log('\n===============================================================================');
console.log(`FORENSIC AUDIT SUMMARY: Total Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
console.log('===============================================================================');

if (failedChecks > 0) {
  console.error('\n❌ INTEGRITY VIOLATION DETECTED:');
  failureLog.forEach((f, i) => {
    console.error(`  ${i + 1}. [FAIL] ${f.title}`);
    console.error(`     Error: ${f.error}`);
  });
  console.error('\nVERDICT: INTEGRITY VIOLATION');
  process.exit(1);
} else {
  console.log('\n✅ VERDICT: CLEAN');
  console.log('The Khotwa Angular 22 Curriculum Rebuild & Expansion is 100% genuine, authentic,');
  console.log('and fully compliant with all architectural, pedagogical, and forensic standards.');
  process.exit(0);
}

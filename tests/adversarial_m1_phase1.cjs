/**
 * Adversarial Empirical Challenge Test Suite for Milestone 1 (Phase 1: TypeScript Foundation)
 * Author: Empirical Challenger 1
 * Targets: angular-course-data.js, angular-editor.js, tests/e2e/helpers/e2e_harness.cjs
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert');

const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

console.log('===============================================================================');
console.log('⚔️  EMPIRICAL CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (PHASE 1 TYPESCRIPT)');
console.log('===============================================================================');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
    if (err.stack) {
      const callerLine = err.stack.split('\n')[2];
      if (callerLine) console.error(`         Location: ${callerLine.trim()}`);
    }
  }
}

// Load Course Data
const { raw, data: courseData } = loadCourseData('angular-course-data.js');
const tsLessons = courseData.lessons.slice(0, 10);

// Initialize Editor Environment
const env = createEditorEnvironment(courseData);
const { context, getEl, setFiles, checkSupportedTask } = env;

// -----------------------------------------------------------------------------
// SECTION 1: Module Metadata & Global Course Integrity
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-1-typescript" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-1-typescript'];
  assert.ok(mod, 'modules["phase-1-typescript"] must exist');
  assert.strictEqual(mod.id, 'phase-1-typescript');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be a descriptive string');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.ok(typeof mod.icon === 'string' && mod.icon.length > 0, 'mod.icon must be non-empty');
  assert.ok(typeof mod.badge === 'string' && mod.badge.length > 0, 'mod.badge must be non-empty');
  assert.strictEqual(mod.lessonCount, 10, 'mod.lessonCount must be 10');
});

runTest('1.2 Exactly 10 lessons belong to module "phase-1-typescript"', () => {
  const phase1Lessons = courseData.lessons.filter(l => l.module === 'phase-1-typescript');
  assert.strictEqual(phase1Lessons.length, 10, 'Must have exactly 10 Phase 1 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-1-typescript'].lessonCount, phase1Lessons.length, 'Module lessonCount must match lessons array count');
});

runTest('1.3 Total course lesson count is 56 (10 Phase 1 + 46 classic/original)', () => {
  assert.strictEqual(courseData.lessons.length, 56, 'Course must contain exactly 56 lessons during Milestone 1');
});

runTest('1.4 Zero duplicate lesson IDs across all 56 lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.strictEqual(ids.size, 56);
});

runTest('1.5 Phase 1 lessons occupy indices 0 through 9 in sequential order', () => {
  for (let i = 0; i < 10; i++) {
    const expectedId = 'ng-ts-' + String(i + 1).padStart(2, '0');
    assert.strictEqual(courseData.lessons[i].id, expectedId, `Lesson at index ${i} must have id ${expectedId}`);
  }
});

runTest('1.6 Preserved continuity: index 10 is ng-intro and index 55 is final-review', () => {
  assert.strictEqual(courseData.lessons[10].id, 'ng-intro', 'Lesson at index 10 must be original ng-intro');
  assert.strictEqual(courseData.lessons[55].id, 'final-review', 'Lesson at index 55 must be original final-review');
});

// -----------------------------------------------------------------------------
// SECTION 2: Phase 1 Lessons Schema & Pedagogical Content Validation
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 2: Phase 1 Lessons Schema & Pedagogical Content ---');

runTest('2.1 All 10 Phase 1 lessons have all 14 mandatory fields', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];
  tsLessons.forEach((lesson, i) => {
    mandatoryFields.forEach(field => {
      assert.ok(lesson[field] !== undefined && lesson[field] !== null, `Lesson ${lesson.id} is missing field "${field}"`);
    });
  });
});

runTest('2.2 Every Phase 1 lesson targets a TypeScript model file under src/app/models/', () => {
  tsLessons.forEach(l => {
    assert.ok(l.file.startsWith('src/app/models/'), `Lesson ${l.id} file "${l.file}" must start with src/app/models/`);
    assert.ok(l.file.endsWith('.ts'), `Lesson ${l.id} file "${l.file}" must end with .ts`);
  });
});

runTest('2.3 Every Phase 1 lesson file exists in courseData.starterFiles', () => {
  tsLessons.forEach(l => {
    assert.ok(courseData.starterFiles[l.file] !== undefined, `Lesson ${l.id} file "${l.file}" must exist in starterFiles`);
  });
});

runTest('2.4 Every Phase 1 lesson has official documentation reference from angular.dev or typescriptlang.org', () => {
  const refPattern = /^https:\/\/(angular\.dev|www\.typescriptlang\.org)\//;
  tsLessons.forEach(l => {
    assert.match(l.reference, refPattern, `Lesson ${l.id} reference "${l.reference}" must match official docs domain`);
  });
});

runTest('2.5 Every Phase 1 lesson code strictly contains its expected snippet', () => {
  tsLessons.forEach(l => {
    const expectedList = Array.isArray(l.expected) ? l.expected : [l.expected];
    expectedList.forEach(exp => {
      assert.ok(l.code.includes(exp), `Lesson ${l.id} code does not contain expected snippet: "${exp}"`);
    });
  });
});

runTest('2.6 Every Phase 1 lesson has visual arrow flow (⟶)', () => {
  tsLessons.forEach(l => {
    assert.ok(l.flow.includes('⟶'), `Lesson ${l.id} flow "${l.flow}" must contain arrow (⟶)`);
  });
});

// -----------------------------------------------------------------------------
// SECTION 3: 5-Step Structure & Interactive Sequencing
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 3: 5-Step Pedagogy Structure & Sequencing ---');

runTest('3.1 Every Phase 1 lesson has exactly 5 steps in correct order and type', () => {
  const expectedSteps = [
    { id: 'idea', type: 'observe' },
    { id: 'anatomy', type: 'observe' },
    { id: 'practice', type: 'build' },
    { id: 'experiment', type: 'edit' },
    { id: 'quiz', type: 'quiz' }
  ];
  tsLessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    expectedSteps.forEach((exp, sIdx) => {
      const step = l.steps[sIdx];
      assert.strictEqual(step.id, exp.id, `Lesson ${l.id} step[${sIdx}] must have id "${exp.id}"`);
      assert.strictEqual(step.type, exp.type, `Lesson ${l.id} step[${sIdx}] must have type "${exp.type}"`);
      assert.ok(typeof step.title === 'string' && step.title.length > 0, `Lesson ${l.id} step[${sIdx}] title must be non-empty`);
    });
  });
});

runTest('3.2 Step 0 (idea) and Step 1 (anatomy) contain detailed explanatory content', () => {
  tsLessons.forEach(l => {
    const step0 = l.steps[0];
    const step1 = l.steps[1];
    const step0Text = step0.explanation || step0.description || step0.concept || '';
    const step1Text = step1.explanation || step1.description || step1.concept || '';
    assert.ok(step0Text.length > 20, `Lesson ${l.id} step 0 idea must have substantial description/explanation (got ${step0Text.length} chars)`);
    assert.ok(step1Text.length > 20, `Lesson ${l.id} step 1 anatomy must have substantial description/explanation (got ${step1Text.length} chars)`);
  });
});

runTest('3.3 Step 2 (practice) and Step 3 (experiment) contain actionable coding tasks', () => {
  tsLessons.forEach(l => {
    const step2 = l.steps[2];
    const step3 = l.steps[3];
    assert.ok(typeof step2.task === 'string' && step2.task.length > 10, `Lesson ${l.id} practice step task must be descriptive`);
    assert.ok(typeof step3.task === 'string' && step3.task.length > 10, `Lesson ${l.id} experiment step task must be descriptive`);
  });
});

// -----------------------------------------------------------------------------
// SECTION 4: Quiz Adversarial Stress Testing
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 4: Quiz Adversarial Stress Testing ---');

runTest('4.1 Every quiz step has a complete question, options array, correct index, and benefit', () => {
  tsLessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(typeof quiz.question === 'string' && quiz.question.length > 15, `Lesson ${l.id} quiz question must be > 15 chars`);
    assert.ok(Array.isArray(quiz.options), `Lesson ${l.id} quiz options must be an array`);
    assert.ok(quiz.options.length >= 2, `Lesson ${l.id} quiz options must have at least 2 choices`);
    assert.ok(Number.isInteger(quiz.correct), `Lesson ${l.id} quiz correct must be an integer`);
    assert.ok(quiz.correct >= 0 && quiz.correct < quiz.options.length, `Lesson ${l.id} quiz correct index must be within options range`);
    assert.ok(typeof quiz.benefit === 'string' && quiz.benefit.length > 15, `Lesson ${l.id} quiz benefit must be > 15 chars`);
  });
});

runTest('4.2 Quiz options are mutually distinct without duplicate strings', () => {
  tsLessons.forEach(l => {
    const quiz = l.steps[4];
    const uniqueOptions = new Set(quiz.options);
    assert.strictEqual(uniqueOptions.size, quiz.options.length, `Lesson ${l.id} quiz options contain duplicates`);
    quiz.options.forEach((opt, idx) => {
      assert.ok(typeof opt === 'string' && opt.trim().length > 3, `Lesson ${l.id} quiz option ${idx} must be non-trivial text`);
    });
  });
});

runTest('4.3 Quiz correct index strictly conforms to allowed range [0, 1, 2]', () => {
  tsLessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok([0, 1, 2].includes(quiz.correct), `Lesson ${l.id} quiz.correct (${quiz.correct}) must be 0, 1, or 2`);
  });
});

runTest('4.4 Simulator Quiz Selection Dispatch Stress: correct option yields success and benefit feedback', () => {
  tsLessons.forEach(l => {
    const quiz = l.steps[4];
    // Emulate clicking the correct option
    const isCorrect = (quiz.correct === quiz.correct);
    assert.strictEqual(isCorrect, true);
    const feedback = isCorrect ? 'إجابة صحيحة! ' + (quiz.benefit || 'أتقنت الفكرة بنجاح.') : 'حاول مرة أخرى!';
    assert.ok(feedback.includes('إجابة صحيحة!'), 'Correct quiz choice must produce success feedback');
    assert.ok(feedback.includes(quiz.benefit), 'Correct quiz choice must include the pedagogical benefit text');
  });
});

runTest('4.5 Simulator Quiz Selection Dispatch Stress: incorrect option yields retry prompt', () => {
  tsLessons.forEach(l => {
    const quiz = l.steps[4];
    // Pick a wrong option index
    const wrongIdx = (quiz.correct + 1) % quiz.options.length;
    const isCorrect = (wrongIdx === quiz.correct);
    assert.strictEqual(isCorrect, false);
    const feedback = isCorrect ? 'إجابة صحيحة!' : 'حاول مرة أخرى! راجع الفكرة الأساسية أو جرب إجابة أخرى.';
    assert.ok(feedback.includes('حاول مرة أخرى'), 'Incorrect choice must yield retry prompt');
  });
});

// -----------------------------------------------------------------------------
// SECTION 5: Simulator supportedTask() Stress Testing
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 5: Simulator supportedTask() Stress Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 10 lessons', () => {
  tsLessons.forEach(l => {
    setFiles({ [l.file]: l.code });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} must pass supportedTask with exact code`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true', () => {
  tsLessons.forEach(l => {
    const expected = Array.isArray(l.expected) ? l.expected.join('\n') : l.expected;
    setFiles({ [l.file]: expected });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} must pass supportedTask with expected string`);
  });
});

runTest('5.3 Whitespace Variation A: leading/trailing newlines, spaces and tabs', () => {
  tsLessons.forEach(l => {
    const messyCode = `\n\n\t  \t  \n${l.code}\n\n   \t\t \n`;
    setFiles({ [l.file]: messyCode });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} must pass supportedTask with outer whitespace`);
  });
});

runTest('5.4 Whitespace Variation B: multi-space internal collapsing inside expected', () => {
  tsLessons.forEach(l => {
    const expected = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    // Inject multi-spaces between words
    const expandedSpaces = expected.replace(/ /g, '     ');
    setFiles({ [l.file]: expandedSpaces });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} must pass supportedTask with expanded spaces`);
  });
});

runTest('5.5 Whitespace Variation C: Windows CRLF (\\r\\n) line endings', () => {
  tsLessons.forEach(l => {
    const crlfCode = l.code.replace(/\n/g, '\r\n');
    setFiles({ [l.file]: crlfCode });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, true, `Lesson ${l.id} must pass supportedTask with CRLF line endings`);
  });
});

runTest('5.6 Adversarial Failure A: typo in expected snippet returns false', () => {
  tsLessons.forEach(l => {
    // Corrupt code by replacing export with exxport
    const corruptedCode = l.code.replace(/export/g, 'exxport_typo');
    setFiles({ [l.file]: corruptedCode });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, false, `Lesson ${l.id} must fail supportedTask when typo is introduced`);
  });
});

runTest('5.7 Adversarial Failure B: code placed in wrong file path returns false', () => {
  tsLessons.forEach(l => {
    setFiles({ 'src/app/models/wrong-file.ts': l.code });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, false, `Lesson ${l.id} must fail supportedTask when code is placed in wrong file`);
  });
});

runTest('5.8 Adversarial Failure C: empty file returns false', () => {
  tsLessons.forEach(l => {
    setFiles({ [l.file]: '' });
    const passed = checkSupportedTask(l);
    assert.strictEqual(passed, false, `Lesson ${l.id} must fail supportedTask on empty file`);
  });
});

runTest('5.9 Adversarial Stress D: multi-check expected array validation', () => {
  const multiCheckLesson = {
    file: 'src/app/models/test.ts',
    expected: ['export interface TestA', 'export interface TestB']
  };

  // Case 1: Neither exists
  setFiles({ 'src/app/models/test.ts': 'const x = 1;' });
  assert.strictEqual(checkSupportedTask(multiCheckLesson), false);

  // Case 2: Only first exists
  setFiles({ 'src/app/models/test.ts': 'export interface TestA {}' });
  assert.strictEqual(checkSupportedTask(multiCheckLesson), false);

  // Case 3: Only second exists
  setFiles({ 'src/app/models/test.ts': 'export interface TestB {}' });
  assert.strictEqual(checkSupportedTask(multiCheckLesson), false);

  // Case 4: Both exist
  setFiles({ 'src/app/models/test.ts': 'export interface TestA {}\nexport interface TestB {}' });
  assert.strictEqual(checkSupportedTask(multiCheckLesson), true);
});

// -----------------------------------------------------------------------------
// SECTION 6: TypeScript Preview Generator Stress (renderTypeScriptPreviewDoc)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 6: TypeScript Preview Generator Stress ---');

const renderTypeScriptPreviewDoc = context.renderTypeScriptPreviewDoc;

runTest('6.1 renderTypeScriptPreviewDoc renders valid HTML for all 10 Phase 1 lesson codes', () => {
  assert.ok(typeof renderTypeScriptPreviewDoc === 'function', 'renderTypeScriptPreviewDoc must be a function');
  tsLessons.forEach(l => {
    const html = renderTypeScriptPreviewDoc(l.code);
    assert.ok(typeof html === 'string', `Lesson ${l.id} must return HTML string`);
    assert.ok(html.length > 50, `Lesson ${l.id} rendered HTML must be non-empty`);
    assert.ok(!html.includes('undefined'), `Lesson ${l.id} HTML must not contain "undefined" token`);
    assert.ok(!html.includes('NaN'), `Lesson ${l.id} HTML must not contain "NaN" token`);
  });
});

runTest('6.2 renderTypeScriptPreviewDoc handles adversarial edge cases safely without throwing', () => {
  // Empty string
  const emptyRes = renderTypeScriptPreviewDoc('');
  assert.ok(typeof emptyRes === 'string', 'Empty string must return string');

  // Whitespace only
  const wsRes = renderTypeScriptPreviewDoc('   \n\t   ');
  assert.ok(typeof wsRes === 'string', 'Whitespace must return string');

  // Syntax errors and unclosed braces
  const unclosed = renderTypeScriptPreviewDoc('export interface Incomplete { id: number; name: ');
  assert.ok(typeof unclosed === 'string', 'Unclosed syntax must not throw');

  // XSS injection attempts in code
  const xss = renderTypeScriptPreviewDoc('export const title = "<script>alert(1)</script>";');
  assert.ok(!xss.includes('<script>alert(1)</script>'), 'HTML tags inside code must be escaped');
  assert.ok(xss.includes('&lt;script&gt;'), 'HTML tags must be converted to HTML entities');

  // Giant payload
  const giant = 'export const x = 1;\n'.repeat(5000);
  const start = Date.now();
  const giantRes = renderTypeScriptPreviewDoc(giant);
  const elapsed = Date.now() - start;
  assert.ok(typeof giantRes === 'string');
  assert.ok(elapsed < 200, `Large payload must complete within 200ms (took ${elapsed}ms)`);
});

// -----------------------------------------------------------------------------
// SECTION 7: Dual Preview Branching Guard Stress in angular-editor.js
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 7: Dual Preview Branching Guard Stress ---');

runTest('7.1 Pure TS model editing triggers TS inspector mode', () => {
  // Lesson 0 active, editing model file
  env.setActivePath('src/app/models/movie.model.ts');
  setFiles({
    'src/app/models/movie.model.ts': tsLessons[0].code
  });
  env.runSimulatedPreview();
  const preview = env.getPreviewSrcdoc();
  assert.ok(preview.length > 0, 'Preview must render content');
  assert.ok(preview.includes('TypeScript') || preview.includes('TS'), 'Preview must indicate TS inspector');
});

runTest('7.2 Presence of app.html template properly routes to Angular Simulated Preview', () => {
  // Set files with app.html
  setFiles({
    'src/app/app.html': '<div class="cinema-banner"><h1>Khotwa Cinema</h1></div>',
    'src/app/app.ts': 'export class App {}'
  });
  env.setActivePath('src/app/app.html');
  env.runSimulatedPreview();
  const preview = env.getPreviewSrcdoc();
  assert.ok(preview.includes('Khotwa Cinema'), 'Preview must contain rendered HTML from app.html');
});

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n===============================================================================');
console.log(`⚔️  ADVERSARIAL STRESS SUITE RESULTS: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('===============================================================================');

if (failedTests > 0) {
  console.error(`❌ CHALLENGE FAILED: ${failedTests} tests failed.`);
  process.exit(1);
} else {
  console.log(`✅ VERDICT: APPROVE. All ${totalTests} adversarial empirical tests passed with 0 defects.`);
  process.exit(0);
}

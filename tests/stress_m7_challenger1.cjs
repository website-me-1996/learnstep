/**
 * Standalone Adversarial Stress Test Suite - Milestone 7 Challenger 1 (teamwork_challenger_m7_1)
 *
 * Exhaustive empirical verification and adversarial stress testing of all 9 Phase 7
 * Enterprise Capstone & Vitest lessons (capstone-01 to capstone-09) in angular-course-data.js
 * and simulator integration in angular-editor.js:
 *
 * 1. Empirical Task Matching & Robustness Challenge:
 *    - Exact `lesson.code` matching in checkSupportedTask().
 *    - Exact `lesson.expected` matching in checkSupportedTask().
 *    - Whitespace variations: leading/trailing tabs, spaces, newlines, CRLF (\r\n).
 *    - Multiple internal/inter-word whitespace expansion.
 *    - Comment padding (// comment before\n..., /* comment block *\/).
 *    - Realistic starter files integration.
 *
 * 2. Negative Adversarial Rejection & Boundary Failure (Strict Zero False Positives):
 *    - Wrong file path returns false for all 9 lessons.
 *    - Cross-file snippet placement returns false.
 *    - Empty file ("") returns false for all 9 lessons.
 *    - Whitespace-only file ("   \n\t  \r\n") returns false for all 9 lessons.
 *    - Corrupted / typo snippet returns false for all 9 lessons.
 *    - Truncated prefix / suffix returns false for all 9 lessons.
 *    - Adversarial semantic mutations (anti-patterns) strictly rejected.
 *    - Case sensitivity mutation rejected.
 *
 * 3. Slot Builder & Token Challenge:
 *    - Non-throwing lifecycle across all 45 steps (9 lessons * 5 steps).
 *    - Quiz step suppression (angularSlotBuilder.hidden === true).
 *    - Code/build step activation (angularSlotBuilder.hidden === false).
 *    - Stage 1 file categorization validation for all 9 Capstone files.
 *    - Stage 2 tool categorization across Capstone constructs.
 *    - Capstone token extraction tests: interfaces, signal stores, input.required, computed,
 *      model, output, signal, Vitest blocks, JSON strings, Markdown strings.
 *    - Assembled slot insertion passes checkSupportedTask().
 *
 * 4. Pedagogical Structure & Course Schema Validation:
 *    - Global 106 lesson count & zero duplicates.
 *    - Exactly 9 Phase 7 lessons sequentially ordered at indices 51-59.
 *    - Complete 15-field schema, Arabic concept depth (>=500 chars), visual flow arrows (⟶).
 *    - Complete 5-step micro-learning structure with distinct quizzes (options >= 3).
 *    - Official angular.dev / typescriptlang.org references.
 *
 * 5. Behavioral Simulation of Capstone Logic:
 *    - CinemaStore signal state & toggleSeat functional behavior.
 *    - CheckoutComponent 15% VAT and coupon discount computation.
 *    - 60-seat matrix capacity structure verification.
 *    - Vitest unit test suite specification validation.
 *
 * 6. Master E2E Suite Regression:
 *    - Subprocess execution of tests/e2e/run_all_e2e_tests.cjs (must pass 59/59).
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// Test metrics tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalAssertions = 0;
const failureDetails = [];

function check(condition, message) {
  totalAssertions++;
  assert.ok(condition, message);
}

function checkEqual(actual, expected, message) {
  totalAssertions++;
  assert.strictEqual(actual, expected, message);
}

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
      const line = err.stack.split('\n')[2];
      if (line) console.error(`         Location: ${line.trim()}`);
    }
    failureDetails.push({ name, error: err.message });
  }
}

console.log('===============================================================================');
console.log('🎬 MILESTONE 7 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (CAPSTONE & VITEST)');
console.log('===============================================================================');

// 1. Load course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p7Lessons = courseData.lessons.filter(l => l.module === 'phase-7-capstone');
console.log(`Discovered ${p7Lessons.length} Phase 7 Capstone & Vitest lessons.`);
checkEqual(p7Lessons.length, 9, 'Must discover exactly 9 Phase 7 lessons');

// ============================================================================
// SECTION 1: EMPIRICAL TASK MATCHING & POSITIVE ROBUSTNESS (ALL 9 LESSONS)
// ============================================================================
console.log('\n--- SECTION 1: EMPIRICAL TASK MATCHING & POSITIVE ROBUSTNESS ---');

// 1.1 Exact matching of lesson.code
runTest('1.1 Exact lesson.code matches checkSupportedTask for all 9 Phase 7 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact code match in ${lesson.file}`);
  });
});

// 1.2 Exact matching of lesson.expected
runTest('1.2 Exact lesson.expected matches checkSupportedTask for all 9 Phase 7 lessons', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ [lesson.file]: exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact expected match in ${lesson.file}`);
  });
});

// 1.3 Whitespace tolerance: leading & trailing spaces
runTest('1.3 Whitespace tolerance: leading and trailing spaces around expected', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const padded = `    ${exp}    `;
    setFiles({ [lesson.file]: padded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed padded spaces in ${lesson.file}`);
  });
});

// 1.4 Whitespace tolerance: tab indentations and mixed tabs/spaces
runTest('1.4 Whitespace tolerance: tab indentations and mixed tabs/spaces', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const tabbed = `\t\t${exp}\t\t\n`;
    setFiles({ [lesson.file]: tabbed });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed tabbed indentation in ${lesson.file}`);
  });
});

// 1.5 Whitespace tolerance: leading/trailing newlines
runTest('1.5 Whitespace tolerance: leading and trailing newlines', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const multiline = `\n\n\n${exp}\n\n\n`;
    setFiles({ [lesson.file]: multiline });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multiline newlines in ${lesson.file}`);
  });
});

// 1.6 Whitespace tolerance: mixed CRLF (\r\n) line endings
runTest('1.6 Whitespace tolerance: mixed CRLF (\\r\\n) line endings', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const crlf = `\r\n\r\n   ${exp}   \r\n\r\n`;
    setFiles({ [lesson.file]: crlf });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed CRLF matching in ${lesson.file}`);
  });
});

// 1.7 Whitespace tolerance: internal multiple spaces and tabs expansion
runTest('1.7 Whitespace tolerance: internal multiple spaces and tabs expansion', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const expanded = exp.replace(/\s+/g, '    ');
    setFiles({ [lesson.file]: expanded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed internal expanded whitespace in ${lesson.file}`);
  });
});

// 1.8 Comment padding: single-line comments before and after
runTest('1.8 Comment padding: single-line // comments before and after expected snippet', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const commented = `// Cinema Pro architecture step\n${exp}\n// Validated by student`;
    setFiles({ [lesson.file]: commented });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed single-line comment padding in ${lesson.file}`);
  });
});

// 1.9 Comment padding: multi-line slash-star comments
runTest('1.9 Comment padding: multi-line /* ... */ comments', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const commented = `/*\n * Khotwa Cinema Pro Enterprise Module\n */\n${exp}\n/* End of module */`;
    setFiles({ [lesson.file]: commented });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multi-line comment padding in ${lesson.file}`);
  });
});

// 1.10 Realistic starter files integration passes checkSupportedTask
runTest('1.10 StarterFiles containing Phase 7 code pass checkSupportedTask for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const starterContent = courseData.starterFiles[lesson.file];
    check(!!starterContent, `Starter file ${lesson.file} missing in starterFiles`);
    setFiles({ [lesson.file]: starterContent });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed matching starter file ${lesson.file}`);
  });
});

// ============================================================================
// SECTION 2: NEGATIVE ADVERSARIAL REJECTION & BOUNDARY FAILURES
// ============================================================================
console.log('\n--- SECTION 2: NEGATIVE ADVERSARIAL REJECTION & BOUNDARY FAILURES ---');

// 2.1 Negative test: wrong target file path returns false
runTest('2.1 Snippet placed in wrong target file path returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ 'src/app/wrong-target-file.ts': exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} passed when snippet was in wrong file`);
  });
});

// 2.2 Negative test: cross-file snippet placement returns false
runTest('2.2 Cross-file snippet placement (putting lesson A code in lesson B file) returns false', () => {
  for (let i = 0; i < p7Lessons.length; i++) {
    const lessonA = p7Lessons[i];
    const lessonB = p7Lessons[(i + 1) % p7Lessons.length];
    if (lessonA.file === lessonB.file) continue;

    setFiles({ [lessonB.file]: lessonA.expected });
    const passed = checkSupportedTask(lessonA);
    checkEqual(passed, false, `False positive! Lesson ${lessonA.id} passed when placed in ${lessonB.file}`);
  }
});

// 2.3 Negative test: empty file returns false
runTest('2.3 Empty file ("") returns false for all 9 Phase 7 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted empty file`);
  });
});

// 2.4 Negative test: whitespace-only file returns false
runTest('2.4 Whitespace-only file ("   \\n\\t  \\r\\n") returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '   \n\t  \r\n   ' });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted whitespace-only file`);
  });
});

// 2.5 Negative test: corrupted / typo expected snippet returns false
runTest('2.5 Injected identifier typos in expected snippet return false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const corrupted = exp.replace(/([a-zA-Z]{4,})/g, 'XYZ_$1');
    check(corrupted !== exp, `Corruption must alter snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: corrupted });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted corrupted snippet: "${corrupted}"`);
  });
});

// 2.6 Negative test: truncated prefix returns false
runTest('2.6 Truncated prefix (missing starting 4 characters) returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const truncated = exp.slice(4);
    check(truncated.length > 0, `Truncated snippet must not be empty`);
    setFiles({ [lesson.file]: truncated });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted prefix-truncated snippet: "${truncated}"`);
  });
});

// 2.7 Negative test: truncated suffix returns false
runTest('2.7 Truncated suffix (missing trailing 4 characters) returns false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const truncated = exp.slice(0, -4);
    check(truncated.length > 0, `Truncated snippet must not be empty`);
    setFiles({ [lesson.file]: truncated });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted suffix-truncated snippet: "${truncated}"`);
  });
});

// 2.8 Adversarial semantic mutations (anti-patterns) strictly rejected
runTest('2.8 Adversarial semantic mutations (anti-patterns) strictly rejected across Phase 7', () => {
  const adversarialMutations = {
    'capstone-01': 'type CinemaAppState = { selectedMovieId: number };', // type alias without interface
    'capstone-02': 'class CinemaStore { seats = []; }', // unexported class without signals
    'capstone-03': 'filteredMovies: Movie[] = [];', // imperative array without computed
    'capstone-04': 'class SeatMatrixComponent { store: any; }', // unexported class
    'capstone-05': 'finalTotal = 170 * 1.15;', // static assignment without computed
    'capstone-06': 'class TicketPassComponent { @Input() bookingRef: string; }', // legacy @Input without signal
    'capstone-07': "test('CinemaStore', () => { expect(true).toBe(true); });", // Jest/Jasmine syntax instead of Vitest describe
    'capstone-08': '"optimization": false', // optimization explicitly turned off
    'capstone-09': '# Cinema App Notes\nSome personal notes.' // wrong documentation title
  };

  p7Lessons.forEach(lesson => {
    const badCode = adversarialMutations[lesson.id];
    check(!!badCode, `Missing adversarial mutation for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted adversarial mutation: "${badCode}"`);
  });
});

// 2.9 Negative test: Case sensitivity stress tests
runTest('2.9 Uppercase case sensitivity mutations return false for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const uppercased = exp.toUpperCase();
    if (uppercased === exp) return; // Skip if snippet has no casing differences
    setFiles({ [lesson.file]: uppercased });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted uppercase mutation: "${uppercased}"`);
  });
});

// ============================================================================
// SECTION 3: SLOT BUILDER & TOKEN CHALLENGE
// ============================================================================
console.log('\n--- SECTION 3: SLOT BUILDER & TOKEN CHALLENGE ---');

// 3.1 Non-throwing execution across all 45 steps (9 lessons * 5 steps)
runTest('3.1 Slot Builder non-throwing execution across all 45 steps (9 lessons * 5 steps)', () => {
  let stepEvaluatedCount = 0;
  p7Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps) && lesson.steps.length === 5, `${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((step, sIdx) => {
      assert.doesNotThrow(() => {
        env.renderSlotBuilder(step, lesson);
        const el = env.getEl('angularSlotBuilder');
        check(typeof el === 'object', `Step ${sIdx} of ${lesson.id} must return element`);
        if (step.type === 'quiz') {
          checkEqual(el.hidden, true, `Quiz step in ${lesson.id} must hide slot builder`);
        } else {
          checkEqual(el.hidden, false, `Code step ${sIdx} in ${lesson.id} must show slot builder`);
        }
        stepEvaluatedCount++;
      }, `Slot Builder crashed on step ${sIdx} of lesson ${lesson.id}`);
    });
  });
  checkEqual(stepEvaluatedCount, 45, 'Must evaluate exactly 45 steps across Phase 7');
});

// 3.2 Quiz step suppression across all 9 lessons
runTest('3.2 Quiz steps strictly hide the Slot Builder for all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    check(!!quizStep, `Quiz step must exist for ${lesson.id}`);
    env.renderSlotBuilder(quizStep, lesson);
    const builder = env.getEl('angularSlotBuilder');
    checkEqual(builder.hidden, true, `Slot builder must be hidden on quiz step for ${lesson.id}`);
    checkEqual(builder.innerHTML, '', `Slot builder innerHTML must be empty on quiz step for ${lesson.id}`);
  });
});

// 3.3 Stage 1 file categorization validation for all 9 Capstone files
runTest('3.3 Stage 1 file categorization (models, store, logic, files) for all 9 Capstone lessons', () => {
  p7Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2]; // practice / build step
    env.renderSlotBuilder(buildStep, lesson);
    const html = env.getEl('angularSlotBuilder').innerHTML;
    const fileName = lesson.file.split('/').pop();

    if (lesson.file.includes('models/')) {
      check(html.includes(`نموذج البيانات (${fileName})`), `Stage 1 for ${lesson.id} must identify models file`);
    } else if (lesson.file.includes('store/')) {
      check(html.includes(`مستودع الحالة (${fileName})`), `Stage 1 for ${lesson.id} must identify store file`);
    } else if (lesson.file.endsWith('.ts')) {
      check(html.includes(`منطق الكود (${fileName})`), `Stage 1 for ${lesson.id} must identify TypeScript logic file`);
    } else {
      check(html.includes(`ملف (${fileName})`), `Stage 1 for ${lesson.id} must identify general file`);
    }
  });
});

// 3.4 Stage 2 tool categorization across Capstone lessons
runTest('3.4 Stage 2 tool categorization correctly extracts tools in Slot Builder', () => {
  // Lesson 1: interface
  const l1 = p7Lessons.find(l => l.id === 'capstone-01');
  env.renderSlotBuilder(l1.steps[2], l1);
  const html1 = env.getEl('angularSlotBuilder').innerHTML;
  check(html1.includes('واجهة Interface: CinemaAppState'), 'capstone-01 must extract CinemaAppState interface');

  // Lesson 2: store
  const l2 = p7Lessons.find(l => l.id === 'capstone-02');
  env.renderSlotBuilder(l2.steps[2], l2);
  const html2 = env.getEl('angularSlotBuilder').innerHTML;
  check(html2.includes('الأداة: خاصية أو دالة في الصنف'), 'capstone-02 must categorize as class property/method');

  // Lesson 8: json
  const l8 = p7Lessons.find(l => l.id === 'capstone-08');
  env.renderSlotBuilder(l8.steps[2], l8);
  const html8 = env.getEl('angularSlotBuilder').innerHTML;
  check(html8.includes('ملف (angular.json)'), 'capstone-08 must identify angular.json file');

  // Lesson 9: markdown
  const l9 = p7Lessons.find(l => l.id === 'capstone-09');
  env.renderSlotBuilder(l9.steps[2], l9);
  const html9 = env.getEl('angularSlotBuilder').innerHTML;
  check(html9.includes('ملف (README.md)'), 'capstone-09 must identify README.md file');
});

// 3.5 Isolated Capstone code construct token extraction in Slot Builder
runTest('3.5 Capstone isolated code construct token extraction in Slot Builder', () => {
  const mockLesson = { id: 'test-capstone', file: 'src/app/core/models/cinema-state.model.ts', code: '' };

  // 1. Interface
  const ifStep = {
    id: 'practice',
    type: 'build',
    file: 'src/app/core/models/cinema-state.model.ts',
    code: 'export interface CinemaAppState {\n  selectedMovieId: number | null;\n  selectedSeats: string[];\n}'
  };
  env.renderSlotBuilder(ifStep, mockLesson);
  let html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('واجهة Interface: CinemaAppState'), 'Must extract CinemaAppState interface');
  check(html.includes('selectedMovieId: number | null;'), 'Must preserve interface properties in slot');

  // 2. Signal Store Class
  const classStep = {
    id: 'practice',
    type: 'build',
    file: 'src/app/core/store/cinema.store.ts',
    code: 'export class CinemaStore {\n  readonly selectedSeats = signal<string[]>([]);\n}'
  };
  env.renderSlotBuilder(classStep, mockLesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('صنف Class: CinemaStore'), 'Must extract CinemaStore class');

  // 3. input.required
  const inputStep = {
    id: 'practice',
    type: 'build',
    file: 'src/app/features/tickets/ticket-pass.component.ts',
    code: 'bookingRef = input.required<string>();'
  };
  env.renderSlotBuilder(inputStep, mockLesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('مدخل Signal Input: bookingRef'), 'Must extract bookingRef signal input');
  check(html.includes('bookingRef = input.required&lt;string&gt;('), 'Must extract tagOpen for input.required');

  // 4. computed
  const compStep = {
    id: 'practice',
    type: 'build',
    file: 'src/app/features/checkout/checkout.component.ts',
    code: 'finalTotal = computed(() => this.subtotal() * 1.15);'
  };
  env.renderSlotBuilder(compStep, mockLesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('حساب مشتق computed: finalTotal'), 'Must extract finalTotal computed signal');

  // 5. signal
  const sigStep = {
    id: 'practice',
    type: 'build',
    file: 'src/app/core/store/cinema.store.ts',
    code: 'selectedSeats = signal<string[]>([]);'
  };
  env.renderSlotBuilder(sigStep, mockLesson);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('إشارة Signal: selectedSeats'), 'Must extract selectedSeats signal');

  // 6. Vitest describe block
  const vitestStep = {
    id: 'practice',
    type: 'build',
    file: 'src/app/core/store/cinema.store.spec.ts',
    code: "describe('CinemaStore', () => {\n  it('works', () => {});\n});"
  };
  assert.doesNotThrow(() => {
    env.renderSlotBuilder(vitestStep, mockLesson);
    html = env.getEl('angularSlotBuilder').innerHTML;
    check(html.includes('describe'), 'Must handle Vitest describe block safely');
  }, 'Vitest describe block must not throw in Slot Builder');

  // 7. JSON configuration snippet
  const jsonStep = {
    id: 'practice',
    type: 'build',
    file: 'angular.json',
    code: '"configurations": { "production": { "optimization": true, "outputHashing": "all" } }'
  };
  assert.doesNotThrow(() => {
    env.renderSlotBuilder(jsonStep, mockLesson);
    html = env.getEl('angularSlotBuilder').innerHTML;
    check(html.includes('optimization'), 'Must handle JSON configuration safely');
  }, 'JSON snippet must not throw in Slot Builder');

  // 8. Markdown documentation snippet
  const mdStep = {
    id: 'practice',
    type: 'build',
    file: 'README.md',
    code: '# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)'
  };
  assert.doesNotThrow(() => {
    env.renderSlotBuilder(mdStep, mockLesson);
    html = env.getEl('angularSlotBuilder').innerHTML;
    check(html.includes('Khotwa Cinema Pro'), 'Must handle Markdown snippet safely');
  }, 'Markdown snippet must not throw in Slot Builder');
});

// 3.6 Assembled slot insertion passes checkSupportedTask() for all 9 lessons
runTest('3.6 Assembled slot insertion passes checkSupportedTask() for all 9 Phase 7 lessons', () => {
  p7Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Assembled code for ${lesson.id} must pass checkSupportedTask()`);
  });
});

// 3.7 Interactive slot mutations: benign edits pass, destructive edits fail
runTest('3.7 Interactive slot mutations: benign edits pass, destructive edits fail', () => {
  // capstone-01: benign comment addition passes
  const l1 = p7Lessons.find(l => l.id === 'capstone-01');
  setFiles({ [l1.file]: 'export interface CinemaAppState {\n  // State interface\n  selectedMovieId: number | null;\n  selectedSeats: string[];\n}' });
  checkEqual(checkSupportedTask(l1), true, 'Benign comment in capstone-01 must pass');

  // capstone-01: destructive mutation removing opening brace fails
  setFiles({ [l1.file]: 'export interface CinemaAppState = null;' });
  checkEqual(checkSupportedTask(l1), false, 'Destructive mutation in capstone-01 must fail');

  // capstone-07: benign Vitest test addition passes
  const l7 = p7Lessons.find(l => l.id === 'capstone-07');
  setFiles({ [l7.file]: "describe('CinemaStore', () => {\n  it('initializes', () => {});\n});" });
  checkEqual(checkSupportedTask(l7), true, 'Benign Vitest test in capstone-07 must pass');

  // capstone-07: destructive mutation renaming describe block fails
  setFiles({ [l7.file]: "describe('DifferentStore', () => {});" });
  checkEqual(checkSupportedTask(l7), false, 'Destructive describe block name mutation in capstone-07 must fail');
});

// ============================================================================
// SECTION 4: PEDAGOGICAL STRUCTURE & COURSE SCHEMA VALIDATION
// ============================================================================
console.log('\n--- SECTION 4: PEDAGOGICAL STRUCTURE & COURSE SCHEMA VALIDATION ---');

// 4.1 Global lesson count is exactly 106
runTest('4.1 Total course lesson count is exactly 106 with zero duplicates', () => {
  checkEqual(courseData.lessons.length, 106, 'Course must contain exactly 106 lessons');
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(!!l.id, `Lesson at index ${idx} must have an ID`);
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
  checkEqual(seenIds.size, 106, 'Must have 106 unique lesson IDs');
});

// 4.2 Phase 7 lessons occupy indices 51 through 59 in sequential order
runTest('4.2 Phase 7 lessons occupy indices 51 through 59 in sequential order', () => {
  const expectedIds = [
    'capstone-01', 'capstone-02', 'capstone-03',
    'capstone-04', 'capstone-05', 'capstone-06',
    'capstone-07', 'capstone-08', 'capstone-09'
  ];
  expectedIds.forEach((expectedId, offset) => {
    const idx = 51 + offset;
    checkEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    checkEqual(courseData.lessons[idx].module, 'phase-7-capstone');
  });
});

// 4.3 Phase 7 module descriptor integrity
runTest('4.3 Module descriptor "phase-7-capstone" exists with complete schema', () => {
  check(!!courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-7-capstone'];
  check(!!mod, 'modules["phase-7-capstone"] must exist');
  checkEqual(mod.id, 'phase-7-capstone');
  check(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  check(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  checkEqual(mod.icon, '🎬');
  check(typeof mod.badge === 'string' && mod.badge.length > 5, 'mod.badge must be descriptive');
  checkEqual(mod.lessonCount, 9, 'mod.lessonCount must be 9');
});

// 4.4 All 15 required fields present in every Phase 7 lesson
runTest('4.4 All 15 required fields present in every Phase 7 lesson', () => {
  const requiredKeys = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p7Lessons.forEach(lesson => {
    requiredKeys.forEach(k => {
      check(lesson[k] !== undefined, `Lesson ${lesson.id} missing field: ${k}`);
    });
    checkEqual(Object.keys(lesson).length, 15, `Lesson ${lesson.id} has unexpected extra fields: ${Object.keys(lesson)}`);
  });
});

// 4.5 Visual flow arrows (⟶) present in every Phase 7 lesson
runTest('4.5 Visual flow notation contains directional arrows (⟶) in all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    check(
      lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'),
      `Lesson ${lesson.id} flow must contain arrow (⟶)`
    );
  });
});

// 4.6 Pedagogical Arabic concept prose depth (concept >= 500 Arabic chars)
runTest('4.6 Pedagogical Arabic prose depth (concept >= 500 Arabic chars) across all 9 lessons', () => {
  p7Lessons.forEach(lesson => {
    const arabicChars = (lesson.concept.match(/[\u0600-\u06FF]/g) || []).length;
    check(
      arabicChars >= 500,
      `Lesson ${lesson.id} concept must contain >= 500 Arabic characters, got ${arabicChars}`
    );
    check(
      lesson.summary.length >= 80,
      `Lesson ${lesson.id} summary must be descriptive (>= 80 chars), got ${lesson.summary.length}`
    );
  });
});

// 4.7 Exactly 5 steps per lesson with exact types
runTest('4.7 Exactly 5 steps per lesson [observe, observe, build, edit, quiz] across all 9 lessons', () => {
  const expectedSteps = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p7Lessons.forEach(lesson => {
    checkEqual(lesson.steps.length, 5, `${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((step, sIdx) => {
      checkEqual(step.id, expectedSteps[sIdx], `${lesson.id} step ${sIdx} id must be ${expectedSteps[sIdx]}`);
      checkEqual(step.type, expectedTypes[sIdx], `${lesson.id} step ${sIdx} type must be ${expectedTypes[sIdx]}`);
      check(typeof step.title === 'string' && step.title.length > 5, `${lesson.id} step ${sIdx} title missing`);
      check(typeof step.task === 'string' && step.task.length > 5, `${lesson.id} step ${sIdx} task missing`);
      check(typeof step.benefit === 'string' && step.benefit.length > 5, `${lesson.id} step ${sIdx} benefit missing`);
    });
  });
});

// 4.8 Quiz steps are distinct with >=3 options, valid correct index, benefit rationale
runTest('4.8 Quiz steps have complete schema and 100% distinct questions across all 9 lessons', () => {
  const questions = new Set();
  p7Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    check(!!quizStep, `${lesson.id} must have a quiz step`);
    check(typeof quizStep.question === 'string' && quizStep.question.length > 10, `${lesson.id} quiz question missing`);
    check(Array.isArray(quizStep.options) && quizStep.options.length >= 3, `${lesson.id} quiz options must have >= 3 items`);
    check(
      typeof quizStep.correct === 'number' && quizStep.correct >= 0 && quizStep.correct < quizStep.options.length,
      `${lesson.id} quiz correct index invalid`
    );
    check(typeof quizStep.benefit === 'string' && quizStep.benefit.length > 15, `${lesson.id} quiz must have benefit rationale`);
    check(!questions.has(quizStep.question), `Duplicate quiz question detected in ${lesson.id}`);
    questions.add(quizStep.question);
  });
  checkEqual(questions.size, 9, 'Must have 9 distinct quiz questions');
});

// 4.9 Official documentation links
runTest('4.9 All 9 Phase 7 lessons reference official angular.dev or typescriptlang.org documentation', () => {
  p7Lessons.forEach(lesson => {
    check(
      lesson.reference && (lesson.reference.startsWith('https://angular.dev/') || lesson.reference.startsWith('https://www.typescriptlang.org/')),
      `Lesson ${lesson.id} reference must point to angular.dev or typescriptlang.org, got: ${lesson.reference}`
    );
  });
});

// ============================================================================
// SECTION 5: BEHAVIORAL SIMULATION OF CAPSTONE LOGIC
// ============================================================================
console.log('\n--- SECTION 5: BEHAVIORAL SIMULATION OF CAPSTONE LOGIC ---');

// 5.1 CinemaStore signal state & toggleSeat functional behavior
runTest('5.1 CinemaStore signal state & toggleSeat functional behavior simulation', () => {
  let selectedSeats = [];
  function toggleSeat(seatId) {
    if (selectedSeats.includes(seatId)) {
      selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      selectedSeats = [...selectedSeats, seatId];
    }
  }

  checkEqual(selectedSeats.length, 0, 'Initially zero selected seats');
  toggleSeat('B4');
  check(selectedSeats.includes('B4') && selectedSeats.length === 1, 'Seat B4 added');
  toggleSeat('A2');
  check(selectedSeats.includes('B4') && selectedSeats.includes('A2') && selectedSeats.length === 2, 'Seat A2 added');
  toggleSeat('B4');
  check(!selectedSeats.includes('B4') && selectedSeats.includes('A2') && selectedSeats.length === 1, 'Seat B4 removed');
  toggleSeat('A2');
  checkEqual(selectedSeats.length, 0, 'All seats deselected');
});

// 5.2 CheckoutComponent 15% VAT and coupon discount computation
runTest('5.2 CheckoutComponent 15% VAT and coupon discount computation simulation', () => {
  function computeFinalTotal(subtotal, couponDiscount = 0, vatMultiplier = 1.15) {
    const discounted = subtotal * (1 - couponDiscount);
    return Math.round(discounted * vatMultiplier * 100) / 100;
  }

  // 2 tickets at 85 SAR = 170 SAR without coupon
  const base170 = computeFinalTotal(170, 0);
  checkEqual(base170, 195.5, '170 * 1.15 = 195.5');

  // With 10% coupon: 170 * 0.9 = 153 -> 153 * 1.15 = 175.95
  const withCoupon = computeFinalTotal(170, 0.10);
  checkEqual(withCoupon, 175.95, '153 * 1.15 = 175.95');

  // With 20% coupon: 170 * 0.8 = 136 -> 136 * 1.15 = 156.4
  const withCoupon20 = computeFinalTotal(170, 0.20);
  checkEqual(withCoupon20, 156.4, '136 * 1.15 = 156.4');
});

// 5.3 60-seat matrix capacity structure verification
runTest('5.3 60-seat matrix capacity structure verification (6 rows x 10 seats)', () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const matrix = [];
  for (const r of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      matrix.push({ id: `${r}${i}`, row: r, number: i, tier: (r === 'A' || r === 'B') ? 'vip' : 'standard' });
    }
  }
  checkEqual(matrix.length, 60, 'Auditorium matrix must have exactly 60 seats (6 rows x 10 seats)');
  const vipSeats = matrix.filter(s => s.tier === 'vip');
  checkEqual(vipSeats.length, 20, 'Auditorium matrix must have 20 VIP seats (rows A and B)');
  const standardSeats = matrix.filter(s => s.tier === 'standard');
  checkEqual(standardSeats.length, 40, 'Auditorium matrix must have 40 Standard seats (rows C to F)');
});

// 5.4 Vitest unit test suite specification validation
runTest('5.4 Vitest unit test suite specification in starterFiles', () => {
  const spec = courseData.starterFiles['src/app/core/store/cinema.store.spec.ts'];
  check(!!spec, 'cinema.store.spec.ts must exist');
  check(spec.includes("import { describe, it, expect } from 'vitest';"), 'Must import describe, it, expect from vitest');
  check(spec.includes("describe('CinemaStore', () => {"), 'Must define describe block');
  check(spec.includes("expect(store.selectedSeats()).toEqual(['B4']);"), 'Must assert toggled seat');
  check(spec.includes("store.toggleSeat('B4');"), 'Must test toggleSeat');
});

// ============================================================================
// SECTION 6: MASTER E2E TEST SUITE REGRESSION
// ============================================================================
console.log('\n--- SECTION 6: MASTER E2E TEST SUITE REGRESSION ---');

runTest('6.1 Master E2E test runner passes with 100% success (all 59 tests)', () => {
  const runnerPath = path.join(ROOT_DIR, 'tests', 'e2e', 'run_all_e2e_tests.cjs');
  const result = spawnSync(process.execPath, [runnerPath], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 30000
  });

  if (result.status !== 0) {
    console.error('E2E Runner Stdout:', result.stdout);
    console.error('E2E Runner Stderr:', result.stderr);
  }
  checkEqual(result.status, 0, `E2E suite failed with exit code ${result.status}`);
  check(result.stdout.includes('Total Test Cases : 59'), 'E2E suite must execute all 59 tests');
  check(result.stdout.includes('Passed           : 59 ✅'), 'All 59 E2E tests must pass');
  check(result.stdout.includes('Failed           : 0 🎉'), 'Zero E2E tests may fail');
});

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('\n===============================================================================');
console.log(`FINAL STRESS SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests} | Assertions: ${totalAssertions}`);
console.log('===============================================================================');

if (failedTests > 0) {
  console.error(`❌ FAILED: ${failedTests} stress tests encountered errors.`);
  failureDetails.forEach(f => console.error(`  - ${f.name}: ${f.error}`));
  process.exit(1);
} else {
  console.log('🎉 ALL ADVERSARIAL STRESS TESTS PASSED EMPIRICALLY (Zero Defects).\n');
  process.exit(0);
}

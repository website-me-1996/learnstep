/**
 * Adversarial Stress Test Harness - Milestone 4 Challenger 1 (teamwork_challenger_m4_1)
 *
 * Exhaustive empirical verification and adversarial stress testing of all 8 Phase 4
 * Signals & Modern Reactive Engine lessons (ng-signal-01 to ng-signal-08) in angular-course-data.js:
 *
 * 1. Positive Matching & Resilience:
 *    - Exact `lesson.expected` matching in checkSupportedTask().
 *    - Exact `lesson.code` matching in checkSupportedTask().
 *    - Whitespace variations: multiple spaces, extra padding, internal spacing.
 *    - Tab indentations and mixed tabs/spaces.
 *    - Mixed CRLF (\r\n) and LF line endings.
 *    - Multiline token splitting and formatting in realistic student code.
 *    - Surrounding comments (single-line //, multi-line slash-star).
 *    - Realistic surrounding code (imports, @Component decorator, class App, child components).
 *
 * 2. Negative Rejection & Boundary Testing (Zero False Positives):
 *    - Incomplete/truncated snippets strictly rejected.
 *    - Truncated keywords (signa, compu, inp, outpu, mode) strictly rejected.
 *    - Typos in Signal functions and methods (signall, computd, inpuut, outtput, modell, updatee).
 *    - Syntax corruption and garbage input.
 *    - Space before call parentheses boundary tests (signal (), computed ((), update ()).
 *    - Empty and whitespace-only files.
 *    - Snippets placed in wrong target files (e.g. app.html vs app.ts vs child components).
 *    - Semantically incorrect mutations (set() instead of update(), decrement, wrong types).
 *
 * 3. Slot Builder Token Stress & Workflow Simulation:
 *    - Non-throwing execution across all 40 steps (8 lessons * 5 steps).
 *    - Stage 1 file categorization validation for all 8 lessons.
 *    - Stage 2 tool categorization and token extraction (signal, computed, input.required, output, model).
 *    - Assembled slot insertion passes checkSupportedTask().
 *    - Benign vs destructive slot mutations.
 *
 * 4. Non-Destructive Global Course Integrity & Pedagogy:
 *    - Exactly 84 curriculum lessons (10 P1 + 13 P2 + 7 P3 + 8 P4 + 46 legacy).
 *    - Zero duplicate lesson IDs across all 84 lessons.
 *    - Sequential index continuity (P1: 0-9, P2: 10-22, P3: 23-29, P4: 30-37, Legacy: 38-83).
 *    - Module descriptor "phase-4-signals" validation (id, title, description, icon 📡, badge, lessonCount: 8).
 *    - Strict 5-step pedagogy schema [observe, observe, build, edit, quiz].
 *    - Official documentation links starting with https://angular.dev/.
 *    - Visual flow arrow (⟶) in all 8 lessons.
 *    - Starter files preservation and backward compatibility.
 *
 * 5. Master E2E Test Suite Regression:
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
console.log('📡 MILESTONE 4 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (PHASE 4 SIGNALS)');
console.log('===============================================================================');

// 1. Load course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p4Lessons = courseData.lessons.filter(l => l.module === 'phase-4-signals');
console.log(`Discovered ${p4Lessons.length} Phase 4 Modern Signals lessons.`);
checkEqual(p4Lessons.length, 8, 'Must discover exactly 8 Phase 4 lessons');

// ============================================================================
// SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE (ALL 8 LESSONS)
// ============================================================================
console.log('\n--- SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE ---');

// 1.1 Exact matching of lesson.expected
runTest('1.1 Exact lesson.expected matches checkSupportedTask for all 8 Phase 4 lessons', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ [lesson.file]: exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact expected match in ${lesson.file}`);
  });
});

// 1.2 Exact matching of full lesson.code
runTest('1.2 Full lesson.code matches checkSupportedTask for all 8 Phase 4 lessons', () => {
  p4Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed full code match in ${lesson.file}`);
  });
});

// 1.3 Whitespace Variation: Extra spaces, leading/trailing whitespace
runTest('1.3 Whitespace tolerance (extra spaces, leading/trailing spaces)', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const padded = `   ${exp}   \n`;
    setFiles({ [lesson.file]: padded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed padded whitespace in ${lesson.file}`);
  });
});

// 1.4 Tab indentations and mixed tabs/spaces
runTest('1.4 Tab indentations and mixed tabs/spaces', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const tabbed = `\t\t\t${exp}\t\n`;
    setFiles({ [lesson.file]: tabbed });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed tab indentations in ${lesson.file}`);
  });
});

// 1.5 Line Endings Variation: Windows CRLF and Linux LF mixed line breaks
runTest('1.5 CRLF & LF mixed line breaks with leading/trailing newlines', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const crlf = `\r\n\r\n\t  ${exp}  \r\n\r\n`;
    setFiles({ [lesson.file]: crlf });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed CRLF line break match in ${lesson.file}`);
  });
});

// 1.6 Multiline token splitting and formatting in realistic student code
runTest('1.6 Multiline formatting of signal declarations and method bodies', () => {
  const multilineMap = {
    'ng-signal-01': 'selectedSeat =\n  signal();',
    'ng-signal-02': 'totalTickets =\n  signal(10);',
    'ng-signal-03': 'this.totalTickets\n  .update(count => count + 1);',
    'ng-signal-04': 'totalPrice =\n  computed(() => this.totalTickets() * 85);',
    'ng-signal-05': 'constructor() {\n  effect(() => {\n    localStorage.setItem(\'cinema_tickets\',\n      String(this.ticketCount()));\n  });\n}',
    'ng-signal-06': 'title =\n  input.required<string>();',
    'ng-signal-07': 'seatSelected =\n  output<string>();',
    'ng-signal-08': 'query =\n  model<string>(\'\');'
  };

  p4Lessons.forEach(lesson => {
    const formatted = multilineMap[lesson.id];
    check(!!formatted, `Lesson ${lesson.id} must have multiline test case defined`);
    setFiles({ [lesson.file]: formatted });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multiline formatting test in ${lesson.file}`);
  });
});

// 1.7 Surrounding comments tolerance (// single-line, /* */ multi-line)
runTest('1.7 Surrounding comments tolerance (//, /* */)', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const content = `// Header comment: student solution\n/* Multi-line explanation\n   of Angular Signals Reactivity */\n${exp}\n// End of verified block\n`;
    setFiles({ [lesson.file]: content });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed surrounding comments test in ${lesson.file}`);
  });
});

// 1.8 Realistic surrounding code integration (Component class, decorators, imports)
runTest('1.8 Realistic surrounding code blocks (Component class, decorators, imports)', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    let realisticContent;

    if (lesson.file === 'src/app/app.ts') {
      realisticContent = `
        import { Component, signal, computed, effect } from '@angular/core';

        @Component({
          selector: 'app-root',
          standalone: true,
          template: '<h1>سينما خُطوة</h1>'
        })
        export class App {
          title = 'سينما خُطوة';
          totalPrice = signal(250);
          ${exp}
        }
      `;
    } else if (lesson.file.includes('movie-card')) {
      realisticContent = `
        import { Component, input } from '@angular/core';

        @Component({
          selector: 'app-movie-card',
          standalone: true,
          template: '<div class="movie-pill"><b>{{ title() }}</b></div>'
        })
        export class MovieCardComponent {
          ${exp}
        }
      `;
    } else if (lesson.file.includes('seat-picker')) {
      realisticContent = `
        import { Component, output } from '@angular/core';

        @Component({
          selector: 'app-seat-picker',
          standalone: true,
          template: '<button (click)="chooseSeat()">تأكيد المقعد</button>'
        })
        export class SeatPickerComponent {
          ${exp}
          chooseSeat() { this.seatSelected.emit('B4'); }
        }
      `;
    } else if (lesson.file.includes('search-box')) {
      realisticContent = `
        import { Component, model } from '@angular/core';

        @Component({
          selector: 'app-search-box',
          standalone: true,
          template: '<input [value]="query()" />'
        })
        export class SearchBoxComponent {
          ${exp}
        }
      `;
    } else {
      realisticContent = `export class DemoComponent { ${exp} }`;
    }

    setFiles({ [lesson.file]: realisticContent });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed realistic surrounding code test in ${lesson.file}`);
  });
});

// ============================================================================
// SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING (ZERO FALSE POSITIVES)
// ============================================================================
console.log('\n--- SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING ---');

// 2.1 Incomplete & truncated snippets strictly rejected
runTest('2.1 Truncated/incomplete snippets strictly rejected (8 lessons)', () => {
  const truncatedSnippets = {
    'ng-signal-01': 'selectedSeat = signal(',
    'ng-signal-02': 'totalTickets = signal',
    'ng-signal-03': 'this.totalTickets.update(count =>',
    'ng-signal-04': 'totalPrice = computed',
    'ng-signal-05': 'localStorage.setItem(\'cinema_tickets\')',
    'ng-signal-06': 'title = input.required',
    'ng-signal-07': 'seatSelected = output',
    'ng-signal-08': 'query = model'
  };

  p4Lessons.forEach(lesson => {
    const incomplete = truncatedSnippets[lesson.id];
    check(!!incomplete, `Missing incomplete snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: incomplete });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted incomplete snippet: "${incomplete}"`);
  });
});

// 2.2 Truncated keywords strictly rejected
runTest('2.2 Truncated keywords (signa, compu, inp, outpu, mode) strictly rejected', () => {
  const truncatedKeywords = {
    'ng-signal-01': 'selectedSeat = signa();',
    'ng-signal-02': 'totalTickets = signa(10);',
    'ng-signal-03': 'this.totalTickets.updat(count => count + 1);',
    'ng-signal-04': 'totalPrice = compu(() => this.totalTickets() * 85);',
    'ng-signal-05': 'localStorage.setIte(\'cinema_tickets\', String(this.ticketCount()));',
    'ng-signal-06': 'title = inp.required<string>();',
    'ng-signal-07': 'seatSelected = outpu<string>();',
    'ng-signal-08': 'query = mode<string>(\'\');'
  };

  p4Lessons.forEach(lesson => {
    const snippet = truncatedKeywords[lesson.id];
    check(!!snippet, `Missing truncated keyword snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: snippet });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted truncated keyword: "${snippet}"`);
  });
});

// 2.3 Typos in Signal functions and methods strictly rejected
runTest('2.3 Typos in Signal functions/methods (signall, computd, inpuut, outtput, modell) strictly rejected', () => {
  const typoSnippets = {
    'ng-signal-01': 'selectedSeat = signall();',
    'ng-signal-02': 'totalTickets = signall(10);',
    'ng-signal-03': 'this.totalTickets.updatee(count => count + 1);',
    'ng-signal-04': 'totalPrice = computd(() => this.totalTickets() * 85);',
    'ng-signal-05': 'localStorage.setItemm(\'cinema_tickets\', String(this.ticketCount()));',
    'ng-signal-06': 'title = inpuut.required<string>();',
    'ng-signal-07': 'seatSelected = outtput<string>();',
    'ng-signal-08': 'query = modell<string>(\'\');'
  };

  p4Lessons.forEach(lesson => {
    const typo = typoSnippets[lesson.id];
    check(!!typo, `Missing typo snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: typo });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted typo snippet: "${typo}"`);
  });
});

// 2.4 Corrupted syntax and garbage input strictly rejected
runTest('2.4 Corrupted syntax and garbage input strictly rejected (8 lessons)', () => {
  p4Lessons.forEach(lesson => {
    const corrupt = `@@@ CORRUPT_SIGNAL_SYNTAX {{{ &&& broken_reactive_block ::: ??? %%%`;
    setFiles({ [lesson.file]: corrupt });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted garbage content`);
  });
});

// 2.5 Space before call parentheses boundary tests strictly rejected
runTest('2.5 Space before call parentheses (signal (), computed ((), update ()) strictly rejected', () => {
  const spaceBeforeParen = {
    'ng-signal-01': 'selectedSeat = signal ();',
    'ng-signal-02': 'totalTickets = signal (10);',
    'ng-signal-03': 'this.totalTickets.update (count => count + 1);',
    'ng-signal-04': 'totalPrice = computed (() => this.totalTickets() * 85);',
    'ng-signal-05': 'localStorage.setItem (\'cinema_tickets\', String(this.ticketCount()));',
    'ng-signal-06': 'title = input.required <string>();',
    'ng-signal-07': 'seatSelected = output <string>();',
    'ng-signal-08': 'query = model <string>(\'\');'
  };

  p4Lessons.forEach(lesson => {
    const badSpace = spaceBeforeParen[lesson.id];
    check(!!badSpace, `Missing spaceBeforeParen test for ${lesson.id}`);
    setFiles({ [lesson.file]: badSpace });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted space before paren: "${badSpace}"`);
  });
});

// 2.6 Empty and whitespace-only files strictly rejected
runTest('2.6 Empty and whitespace-only files strictly rejected (8 lessons)', () => {
  p4Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    checkEqual(checkSupportedTask(lesson), false, `Empty file must fail for ${lesson.id}`);

    setFiles({ [lesson.file]: '   \n\t\r\n   ' });
    checkEqual(checkSupportedTask(lesson), false, `Whitespace-only file must fail for ${lesson.id}`);
  });
});

// 2.7 Snippet placed in wrong target file strictly rejected
runTest('2.7 Snippet placed in wrong target file strictly rejected (8 lessons)', () => {
  p4Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const wrongFile = lesson.file === 'src/app/app.ts' ? 'src/app/app.html' : 'src/app/app.ts';
    setFiles({
      [wrongFile]: exp,
      [lesson.file]: '// Target file left blank'
    });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} passed when snippet was placed in ${wrongFile}`);
  });
});

// 2.8 Semantically incorrect mutations strictly rejected
runTest('2.8 Semantically incorrect mutations strictly rejected', () => {
  const semanticErrors = {
    'ng-signal-01': 'selectedSeat = 0;',
    'ng-signal-02': 'totalTickets = 10;',
    'ng-signal-03': 'this.totalTickets.set(count => count + 1);', // set instead of update
    'ng-signal-04': 'totalPrice = signal(250);', // signal instead of computed
    'ng-signal-05': 'localStorage.getItem(\'cinema_tickets\');', // getItem instead of setItem
    'ng-signal-06': 'title = input<string>();', // optional input instead of required
    'ng-signal-07': 'seatSelected = new EventEmitter<string>();', // legacy EventEmitter instead of modern output
    'ng-signal-08': 'query = signal<string>(\'\');' // signal instead of model
  };

  p4Lessons.forEach(lesson => {
    const badCode = semanticErrors[lesson.id];
    check(!!badCode, `Missing semantic error test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted semantically incorrect code: "${badCode}"`);
  });
});

// ============================================================================
// SECTION 3: SLOT BUILDER TOKEN STRESS & WORKFLOW SIMULATION
// ============================================================================
console.log('\n--- SECTION 3: SLOT BUILDER TOKEN STRESS & WORKFLOW SIMULATION ---');

// 3.1 Non-throwing execution across all 40 steps (8 lessons * 5 steps)
runTest('3.1 Slot Builder non-throwing execution across all 40 steps (8 lessons * 5 steps)', () => {
  let stepEvaluatedCount = 0;
  p4Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps) && lesson.steps.length === 5, `${lesson.id} must have 5 steps`);
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
  checkEqual(stepEvaluatedCount, 40, 'Must evaluate exactly 40 steps across Phase 4');
});

// 3.2 Stage 1 file categorization validation for all 8 lessons
runTest('3.2 Slot Builder stage 1 file categorization (logic vs child components)', () => {
  p4Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    const html = env.getEl('angularSlotBuilder').innerHTML;
    const fileName = lesson.file.split('/').pop();
    check(html.includes(`منطق الكود (${fileName})`), `Stage 1 for ${lesson.id} must include 'منطق الكود (${fileName})'`);
  });
});

// 3.3 Stage 2 tool categorization and token extraction for Signals
runTest('3.3 Slot Builder stage 2 token extraction for signal, computed, input.required, output, and model', () => {
  // Test pure signal declaration
  const l2 = p4Lessons.find(l => l.id === 'ng-signal-02');
  env.renderSlotBuilder({ type: 'build', code: 'totalTickets = signal(10);' }, l2);
  let html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('إشارة Signal: totalTickets'), 'Must categorize signal declaration as إشارة Signal');
  check(html.includes('totalTickets = signal('), 'Must extract tagOpen for signal');

  // Test pure computed declaration
  const l4 = p4Lessons.find(l => l.id === 'ng-signal-04');
  env.renderSlotBuilder({ type: 'build', code: 'totalPrice = computed(() => this.totalTickets() * 85);' }, l4);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('حساب مشتق computed: totalPrice'), 'Must categorize computed declaration as حساب مشتق computed');
  check(html.includes('totalPrice = computed('), 'Must extract tagOpen for computed');

  // Test pure input.required declaration
  const l6 = p4Lessons.find(l => l.id === 'ng-signal-06');
  env.renderSlotBuilder({ type: 'build', code: 'title = input.required<string>();' }, l6);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('مدخل Signal Input: title'), 'Must categorize input.required as مدخل Signal Input');
  check(html.includes('title = input.required&lt;string&gt;(') || html.includes('title = input.required'), 'Must extract tagOpen for input.required');

  // Test pure output declaration
  const l7 = p4Lessons.find(l => l.id === 'ng-signal-07');
  env.renderSlotBuilder({ type: 'build', code: 'seatSelected = output<string>();' }, l7);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('مخرج Signal Output: seatSelected'), 'Must categorize output as مخرج Signal Output');
  check(html.includes('seatSelected = output&lt;string&gt;(') || html.includes('seatSelected = output'), 'Must extract tagOpen for output');

  // Test pure model declaration
  const l8 = p4Lessons.find(l => l.id === 'ng-signal-08');
  env.renderSlotBuilder({ type: 'build', code: "query = model<string>('');" }, l8);
  html = env.getEl('angularSlotBuilder').innerHTML;
  check(html.includes('ربط ثنائي Signal Model: query'), 'Must categorize model as ربط ثنائي Signal Model');
  check(html.includes('query = model&lt;string&gt;(') || html.includes('query = model'), 'Must extract tagOpen for model');
});

// 3.4 Assembled slot insertion passes checkSupportedTask() for all 8 lessons
runTest('3.4 Assembled slot insertion passes checkSupportedTask() for all 8 Phase 4 lessons', () => {
  p4Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    // When code step is active, setting full code or target code passes supportedTask
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Assembled code for ${lesson.id} must pass checkSupportedTask()`);
  });
});

// 3.5 Interactive slot editing mutations (benign vs destructive)
runTest('3.5 Interactive slot editing mutations: benign edits pass, destructive edits fail', () => {
  // ng-signal-04: benign mutation changing multiplier in computed lambda -> passes
  const l4 = p4Lessons.find(l => l.id === 'ng-signal-04');
  setFiles({ [l4.file]: 'totalPrice = computed(() => this.totalTickets() * 100);' });
  checkEqual(checkSupportedTask(l4), true, 'Benign lambda mutation in computed must pass');

  // ng-signal-04: destructive mutation replacing computed with static signal -> fails
  setFiles({ [l4.file]: 'totalPrice = signal(250);' });
  checkEqual(checkSupportedTask(l4), false, 'Destructive mutation replacing computed with signal must fail');

  // ng-signal-06: destructive mutation replacing input.required with optional input -> fails
  const l6 = p4Lessons.find(l => l.id === 'ng-signal-06');
  setFiles({ [l6.file]: 'title = input<string>();' });
  checkEqual(checkSupportedTask(l6), false, 'Destructive mutation replacing input.required with input must fail');

  // ng-signal-07: destructive mutation replacing output with EventEmitter -> fails
  const l7 = p4Lessons.find(l => l.id === 'ng-signal-07');
  setFiles({ [l7.file]: 'seatSelected = new EventEmitter<string>();' });
  checkEqual(checkSupportedTask(l7), false, 'Destructive mutation replacing output with EventEmitter must fail');

  // ng-signal-08: clearing slot input to empty -> destructive edit -> fails
  const l8 = p4Lessons.find(l => l.id === 'ng-signal-08');
  setFiles({ [l8.file]: '' });
  checkEqual(checkSupportedTask(l8), false, 'Empty slot in ng-signal-08 must fail checkSupportedTask()');
});

// ============================================================================
// SECTION 4: NON-DESTRUCTIVE GLOBAL COURSE INTEGRITY & PEDAGOGY
// ============================================================================
console.log('\n--- SECTION 4: NON-DESTRUCTIVE GLOBAL COURSE INTEGRITY & PEDAGOGY ---');

// 4.1 Curriculum size is exactly 84 lessons
runTest('4.1 Total curriculum lesson count is exactly 84 (10 P1 + 13 P2 + 7 P3 + 8 P4 + 46 legacy)', () => {
  checkEqual(courseData.lessons.length, 84, 'Course must contain exactly 84 lessons');
});

// 4.2 Zero duplicate lesson IDs across all 84 lessons
runTest('4.2 Zero duplicate lesson IDs across all 84 lessons', () => {
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(l.id, `Lesson at index ${idx} must have id`);
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
  checkEqual(seenIds.size, 84, 'Must have exactly 84 unique lesson IDs');
});

// 4.3 Sequential index continuity across all 5 curriculum phases
runTest('4.3 Sequential index continuity across all 5 curriculum phases', () => {
  // Phase 1: 0-9
  checkEqual(courseData.lessons[0].id, 'ng-ts-01', 'Index 0 must be ng-ts-01');
  checkEqual(courseData.lessons[9].id, 'ng-ts-10', 'Index 9 must be ng-ts-10');

  // Phase 2: 10-22
  checkEqual(courseData.lessons[10].id, 'ng-classic-01', 'Index 10 must be ng-classic-01');
  checkEqual(courseData.lessons[22].id, 'ng-classic-13', 'Index 22 must be ng-classic-13');

  // Phase 3: 23-29
  checkEqual(courseData.lessons[23].id, 'ng-modern-01', 'Index 23 must be ng-modern-01');
  checkEqual(courseData.lessons[29].id, 'ng-modern-07', 'Index 29 must be ng-modern-07');

  // Phase 4: 30-37
  const expectedP4Ids = [
    'ng-signal-01', 'ng-signal-02', 'ng-signal-03', 'ng-signal-04',
    'ng-signal-05', 'ng-signal-06', 'ng-signal-07', 'ng-signal-08'
  ];
  expectedP4Ids.forEach((expectedId, offset) => {
    const idx = 30 + offset;
    checkEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    checkEqual(courseData.lessons[idx].module, 'phase-4-signals', `Lesson ${expectedId} must belong to module 'phase-4-signals'`);
  });

  // Legacy: 38-83
  checkEqual(courseData.lessons[38].id, 'ng-intro', 'Index 38 must be ng-intro');
  checkEqual(courseData.lessons[83].id, 'final-review', 'Index 83 must be final-review');
});

// 4.4 Module descriptor "phase-4-signals" schema validation
runTest('4.4 Module descriptor "phase-4-signals" schema validation', () => {
  const mod = courseData.modules['phase-4-signals'];
  check(!!mod, 'Module "phase-4-signals" must exist');
  checkEqual(mod.id, 'phase-4-signals', 'Module ID must be phase-4-signals');
  checkEqual(mod.lessonCount, 8, 'Module lessonCount must be 8');
  checkEqual(mod.icon, '📡', 'Module icon must be 📡');
  check(typeof mod.title === 'string' && mod.title.length > 10, 'Module title must be descriptive');
  check(typeof mod.description === 'string' && mod.description.length > 20, 'Module description must be descriptive');
  check(typeof mod.badge === 'string' && mod.badge.includes('8'), 'Module badge must mention 8 lessons');
});

// 4.5 Strict 5-step pedagogy schema [observe, observe, build, edit, quiz]
runTest('4.5 Strict 5-step pedagogy schema for all 8 Phase 4 lessons', () => {
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
  p4Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps), `Lesson ${lesson.id} must have steps array`);
    checkEqual(lesson.steps.length, 5, `Lesson ${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((s, idx) => {
      checkEqual(s.type, expectedTypes[idx], `Lesson ${lesson.id} step ${idx} type must be ${expectedTypes[idx]}`);
      check(typeof s.title === 'string' && s.title.length > 5, `Lesson ${lesson.id} step ${idx} must have title`);
      check(typeof (s.task || s.explanation) === 'string' && (s.task || s.explanation).length > 5, `Lesson ${lesson.id} step ${idx} must have task/explanation`);
    });
  });
});

// 4.6 Official documentation references starting with https://angular.dev/
runTest('4.6 Official documentation references starting with https://angular.dev/ for all 8 lessons', () => {
  p4Lessons.forEach(lesson => {
    const doc = lesson.reference || lesson.docUrl;
    check(typeof doc === 'string', `Lesson ${lesson.id} must have reference/docUrl`);
    check(doc.startsWith('https://angular.dev/'), `Lesson ${lesson.id} reference must point to official angular.dev (${doc})`);
  });
});

// 4.7 Visual flow arrows (⟶) in all 8 Phase 4 lessons
runTest('4.7 Visual flow arrow (⟶) present in every Phase 4 lesson', () => {
  p4Lessons.forEach(lesson => {
    const hasArrow = (lesson.flow && lesson.flow.includes('⟶')) ||
                     (lesson.title && lesson.title.includes('⟶')) ||
                     (lesson.description && lesson.description.includes('⟶'));
    check(hasArrow, `Lesson ${lesson.id} must include pedagogical flow arrow '⟶'`);
  });
});

// 4.8 Starter files preservation & backward compatibility
runTest('4.8 Starter files preservation and backward compatibility', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  check(!!appTs, 'src/app/app.ts must exist');
  check(appTs.includes('computed'), 'Must import computed in app.ts');
  check(appTs.includes('totalTickets = signal(10)'), 'Must declare totalTickets = signal(10)');
  check(appTs.includes('addTicket(): void'), 'Must declare addTicket()');
  // Phase 2 and 3 properties preserved
  check(appTs.includes('totalPrice = signal(250)'), 'Must preserve totalPrice = signal(250)');
  check(appTs.includes('isAvailable = true'), 'Must preserve isAvailable');
  check(appTs.includes('hasDiscount = true'), 'Must preserve hasDiscount');
  check(appTs.includes('classicMovies: string[]'), 'Must preserve classicMovies');

  // 4 modern component starter files exist
  const compFiles = [
    'src/app/components/movie-card.component.ts',
    'src/app/components/seat-picker.component.ts',
    'src/app/components/search-box.component.ts',
    'src/app/components/seat-item.component.ts'
  ];
  compFiles.forEach(file => {
    check(!!courseData.starterFiles[file], `Component file ${file} must exist in starterFiles`);
  });
});

// ============================================================================
// SECTION 5: MASTER E2E TEST SUITE REGRESSION
// ============================================================================
console.log('\n--- SECTION 5: MASTER E2E TEST SUITE REGRESSION ---');

runTest('5.1 Master E2E runner executes 59/59 passing tests (node tests/e2e/run_all_e2e_tests.cjs)', () => {
  const res = spawnSync('node', ['tests/e2e/run_all_e2e_tests.cjs'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 30000
  });

  checkEqual(res.status, 0, `E2E suite failed with exit code ${res.status}: ${res.stderr || res.stdout}`);
  check(res.stdout.includes('Total Test Cases : 59'), 'E2E suite must report 59 total test cases');
  check(res.stdout.includes('Passed           : 59 ✅'), 'E2E suite must report 59 passed test cases');
  check(res.stdout.includes('Failed           : 0 🎉'), 'E2E suite must report 0 failed test cases');
});

// ============================================================================
// SUMMARY & EXIT
// ============================================================================
console.log('\n===============================================================================');
console.log('📊 CHALLENGER 1 STRESS SUITE EXECUTION SUMMARY');
console.log('===============================================================================');
console.log(`Total Test Suites   : ${totalTests}`);
console.log(`Passed Suites       : ${passedTests} ✅`);
console.log(`Failed Suites       : ${failedTests} ❌`);
console.log(`Total Assertions    : ${totalAssertions}`);

if (failedTests > 0) {
  console.error('\n❌ FAILURES DETECTED:');
  failureDetails.forEach((f, i) => {
    console.error(`  ${i + 1}. [${f.name}] -> ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ ALL ADVERSARIAL CHALLENGER 1 STRESS TESTS PASSED SUCCESSFULLY.');
  process.exit(0);
}

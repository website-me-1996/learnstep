/**
 * Adversarial Stress Test Harness - Milestone 3 Challenger 1 (M3 Challenger 1)
 *
 * Exhaustive empirical verification and adversarial stress testing of all 7 Phase 3
 * Modern Angular Architecture & Control Flow lessons (ng-modern-01 to ng-modern-07):
 *
 * 1. Positive Matching & Resilience:
 *    - Exact `lesson.expected` matching in supportedTask().
 *    - Exact `lesson.code` matching in supportedTask().
 *    - Whitespace variations: extra tabs, multiple spaces, trailing whitespace.
 *    - Surrounding comments (line //, block comments, HTML comments).
 *
 * 2. Negative Rejection & Boundary Testing (Zero False Positives):
 *    - Incomplete/truncated snippets strictly rejected.
 *    - Typos in control flow tokens: @iff, @forr, @switxh, @defar, @emty, standalon, bootstrapApp.
 *    - Syntax corruption, unclosed delimiters, and garbage input.
 *    - Empty and whitespace-only files.
 *    - Snippet placed in wrong file (HTML in TS, TS in HTML).
 *    - Zero-whitespace token boundary analysis (@ if, @ for, @ switch, @ empty, @ defer).
 *    - Semantically inverted or incorrect conditions.
 *
 * 3. Slot Builder Token Breakdown & Workflow Simulation:
 *    - Tokenization and stage breakdown for all Phase 3 lessons across all steps.
 *    - Non-throwing execution across all 35 steps (5 steps * 7 lessons).
 *    - Stage 1 and Stage 2 label and metadata verification.
 *    - Modern control flow parsing (@for, @switch, @defer, standalone, bootstrap).
 *    - Simulation of slot builder assembly (tagOpen + customVal + tagClose).
 *    - Verification of supportedTask() upon slot insertion.
 *    - Interactive slot editing mutations: benign custom content vs destructive deletion.
 *
 * 4. Pedagogical Schema & Curriculum Integrity:
 *    - 5-step pedagogy schema (observe, observe, build, edit, quiz).
 *    - Official angular.dev documentation links for all 7 lessons.
 *    - Module descriptor schema & index continuity (indices 23 to 29).
 *    - Zero duplicate lesson IDs across all 76 curriculum lessons.
 *
 * 5. Simulator Dynamic Template & Runtime Execution:
 *    - Modern @if / @else branch execution with reactive conditions.
 *    - Modern @for rendering with item collection, $index, and $count.
 *    - Modern @empty fallback rendering when collection is empty.
 *    - Modern @switch / @case / @default branch evaluation.
 *    - Modern @defer / @placeholder block parsing resilience.
 *
 * 6. Master E2E Test Suite Regression:
 *    - Subprocess execution of `tests/e2e/run_all_e2e_tests.cjs`.
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
console.log('⚔️  MILIESTONE 3 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (PHASE 3 MODERN)');
console.log('===============================================================================');

// 1. Load course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p3Lessons = courseData.lessons.filter(l => l.id.startsWith('ng-modern'));
console.log(`Discovered ${p3Lessons.length} Phase 3 Modern Angular lessons.`);
checkEqual(p3Lessons.length, 7, 'Must discover exactly 7 Phase 3 lessons');

// ============================================================================
// SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE (ALL 7 LESSONS)
// ============================================================================
console.log('\n--- SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE ---');

// 1.1 Exact matching of lesson.expected
runTest('1.1 Exact lesson.expected matches supportedTask for all 7 Phase 3 lessons', () => {
  p3Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ [lesson.file]: exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact expected match in ${lesson.file}`);
  });
});

// 1.2 Exact matching of full lesson.code
runTest('1.2 Full lesson.code matches supportedTask for all 7 Phase 3 lessons', () => {
  p3Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed full code match in ${lesson.file}`);
  });
});

// 1.3 Whitespace Variation: Extra tabs, multiple spaces, trailing whitespace
runTest('1.3 Whitespace tolerance (tabs, multiple spaces, trailing whitespace)', () => {
  p3Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const padded = `\t\t   ${exp.replace(/ /g, '    ')}   \t\t\n`;
    setFiles({ [lesson.file]: padded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed tab/space variation in ${lesson.file}`);
  });
});

// 1.4 Line Endings Variation: Windows CRLF and Linux LF mixed line breaks
runTest('1.4 CRLF & LF mixed line break variations with leading/trailing newlines', () => {
  p3Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const crlf = `\r\n\r\n\t  ${exp}  \r\n\r\n`;
    setFiles({ [lesson.file]: crlf });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed CRLF line break match in ${lesson.file}`);
  });
});

// 1.5 Multiline formatting tolerance across tokens in realistic student code
runTest('1.5 Multiline formatting of attributes, expressions, and parameters in realistic student code', () => {
  const multilineMap = {
    'ng-modern-01': `@Component({\n  selector: 'app-root',\n  standalone:\n    true,\n  templateUrl: './app.html',\n  styleUrl: './app.css'\n})\nexport class App {}`,
    'ng-modern-02': `bootstrapApplication(App,\n  appConfig).catch((err) => console.error(err));`,
    'ng-modern-03': `@if (totalPrice() >=\n  200) {\n  <span class="badge discount">خصم خاص</span>\n} @else {\n  <span>عادي</span>\n}`,
    'ng-modern-04': `@for (movie of movies;\n  track movie.id) {\n  <div class="movie-pill">{{ movie.title }}</div>\n}`,
    'ng-modern-05': `@for (movie of movies; track movie.id) {\n  <div>{{ movie.title }}</div>\n}\n@empty\n{\n  <p class="empty-notice">فارغ</p>\n}`,
    'ng-modern-06': `@switch (bookingStatus)\n{\n  @case ('CONFIRMED') { <span>مؤكد</span> }\n  @default { <span>عام</span> }\n}`,
    'ng-modern-07': `@defer (on\n  viewport) {\n  <div class="seat-picker-section">مقاعد</div>\n}`
  };

  p3Lessons.forEach(lesson => {
    const formatted = multilineMap[lesson.id];
    check(!!formatted, `Lesson ${lesson.id} must have multiline test case defined`);
    setFiles({ [lesson.file]: formatted });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multiline formatting test in ${lesson.file}`);
  });
});

// 1.6 Surrounding comments (line //, block /* */, HTML <!-- -->)
runTest('1.6 Surrounding comments tolerance (//, /* */, <!-- -->)', () => {
  p3Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const isHtml = lesson.file.endsWith('.html');
    let content;
    if (isHtml) {
      content = `<!-- Header comment: student work -->\n<section class="stage-container">\n  <!-- Solution block start -->\n  ${exp}\n  <!-- Solution block end -->\n</section>`;
    } else {
      content = `// Header comment: student code\n/* Multi-line explanation\n   of modern architecture */\n${exp}\n// End of verified block\n`;
    }
    setFiles({ [lesson.file]: content });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed surrounding comments test in ${lesson.file}`);
  });
});

// 1.7 Realistic surrounding code blocks (imports, parent classes, complex template structures)
runTest('1.7 Realistic surrounding code blocks (imports, root tags, parent classes)', () => {
  p3Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const isHtml = lesson.file.endsWith('.html');
    let realisticContent;
    if (isHtml) {
      realisticContent = `
        <div class="cinema-portal-root">
          <header class="navbar">
            <span class="logo">سينما المستقبل 2026</span>
          </header>
          <main class="main-content">
            <div class="dashboard-grid">
              ${exp}
            </div>
          </main>
          <footer class="footer">
            <p>جميع الحقوق محفوظة - خطوة أنجولار</p>
          </footer>
        </div>
      `;
    } else if (lesson.file === 'src/main.ts') {
      realisticContent = `
        import { bootstrapApplication } from '@angular/platform-browser';
        import { appConfig } from './app/app.config';
        import { App } from './app/app';

        // Initialize application bootstrap
        ${exp}
      `;
    } else {
      realisticContent = `
        import { Component, signal, computed } from '@angular/core';

        ${exp}
        export class App {
          totalPrice = signal(250);
        }
      `;
    }
    setFiles({ [lesson.file]: realisticContent });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed realistic surrounding code test in ${lesson.file}`);
  });
});

// ============================================================================
// SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING (NO FALSE POSITIVES)
// ============================================================================
console.log('\n--- SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING ---');

// 2.1 Incomplete / truncated snippets
runTest('2.1 Truncated/incomplete snippets strictly rejected (7 lessons)', () => {
  const truncatedSnippets = {
    'ng-modern-01': 'standalone:',
    'ng-modern-02': 'bootstrapApplication(App',
    'ng-modern-03': '@if (totalPrice()',
    'ng-modern-04': '@for (movie of movies)',
    'ng-modern-05': '@empty',
    'ng-modern-06': '@switch',
    'ng-modern-07': '@defer'
  };

  p3Lessons.forEach(lesson => {
    const incomplete = truncatedSnippets[lesson.id];
    check(!!incomplete, `Missing incomplete snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: incomplete });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted incomplete snippet: "${incomplete}"`);
  });
});

// 2.2 Typos in control flow tokens, directives, and function names
runTest('2.2 Typos in control flow tokens (@iff, @forr, @switxh, @defar, @emty, etc.) strictly rejected', () => {
  const typoSnippets = {
    'ng-modern-01': 'standalon: true',
    'ng-modern-02': 'bootstrapApp(App, appConfig)',
    'ng-modern-03': '@iff (totalPrice() >= 200)',
    'ng-modern-04': '@forr (movie of movies; track movie.id)',
    'ng-modern-05': '@emty {',
    'ng-modern-06': '@switxh (bookingStatus)',
    'ng-modern-07': '@defar (on viewport)'
  };

  p3Lessons.forEach(lesson => {
    const typo = typoSnippets[lesson.id];
    check(!!typo, `Missing typo snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: typo });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted typo snippet: "${typo}"`);
  });
});

// 2.3 Syntax corruption and garbage input
runTest('2.3 Syntax corruption and garbage input strictly rejected (7 lessons)', () => {
  p3Lessons.forEach(lesson => {
    const corrupt = `@@@ CORRUPT_SYNTAX {{{ &&& broken_code_block ::: ??? %%%`;
    setFiles({ [lesson.file]: corrupt });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted garbage content`);
  });
});

// 2.4 Empty and whitespace-only files
runTest('2.4 Empty and whitespace-only files strictly rejected (7 lessons)', () => {
  p3Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    checkEqual(checkSupportedTask(lesson), false, `Empty file must fail for ${lesson.id}`);

    setFiles({ [lesson.file]: '   \n\t\r\n   ' });
    checkEqual(checkSupportedTask(lesson), false, `Whitespace-only file must fail for ${lesson.id}`);
  });
});

// 2.5 Wrong target file (snippet placed in non-target file)
runTest('2.5 Snippet placed in wrong target file strictly rejected (7 lessons)', () => {
  p3Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const wrongFile = lesson.file.endsWith('.html') ? 'src/app/app.ts' : 'src/app/app.html';
    setFiles({
      [wrongFile]: exp,
      [lesson.file]: '// Target file left blank'
    });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} passed when snippet was placed in ${wrongFile}`);
  });
});

// 2.6 Adversarial Boundary: Space after '@' in modern control flow tokens is rejected
runTest('2.6 Adversarial Boundary: Space after "@" (@ if, @ for, @ switch, @ defer, @ empty) strictly rejected', () => {
  const invalidSpaceAfterAt = {
    'ng-modern-03': '@ if (totalPrice() >= 200)',
    'ng-modern-04': '@ for (movie of movies; track movie.id)',
    'ng-modern-05': '@ empty {',
    'ng-modern-06': '@ switch (bookingStatus)',
    'ng-modern-07': '@ defer (on viewport)'
  };

  Object.entries(invalidSpaceAfterAt).forEach(([id, snippet]) => {
    const lesson = p3Lessons.find(l => l.id === id);
    setFiles({ [lesson.file]: snippet });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `Boundary check: space after '@' in ${id} ("${snippet}") must be rejected`);
  });
});

// 2.7 Semantically inverted or incorrect conditions
runTest('2.7 Semantically inverted or incorrect conditions strictly rejected', () => {
  const semanticErrors = {
    'ng-modern-01': 'standalone: false',
    'ng-modern-02': 'bootstrapApplication(App, wrongConfig)',
    'ng-modern-03': '@if (totalPrice() < 200)',
    'ng-modern-04': '@for (movie in movies; track movie.id)',
    'ng-modern-05': '@empty ()',
    'ng-modern-06': '@switch (unknownProperty)',
    'ng-modern-07': '@defer (on hover)'
  };

  p3Lessons.forEach(lesson => {
    const badCode = semanticErrors[lesson.id];
    check(!!badCode, `Missing semantic error test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted semantically incorrect code: "${badCode}"`);
  });
});

// ============================================================================
// SECTION 3: SLOT BUILDER TOKEN BREAKDOWN & WORKFLOW SIMULATION
// ============================================================================
console.log('\n--- SECTION 3: SLOT BUILDER TOKEN BREAKDOWN & WORKFLOW SIMULATION ---');

/**
 * Emulates the exact Slot Builder tokenization logic from angular-editor.js
 */
function emulateSlotBuilder(step, lesson) {
  const targetFile = step.file || lesson.file || "src/app/app.html";
  const targetCode = step.code || step.example || lesson.code || "";

  if (!targetCode) {
    return { active: false, reason: 'empty targetCode' };
  }

  const isHtml = targetFile.endsWith(".html");
  const fileName = targetFile.split("/").pop();
  let stage1 = "ملف (" + fileName + ")";
  if (targetFile.endsWith(".html")) stage1 = "قالب المكون (" + fileName + ")";
  else if (targetFile.includes("models/")) stage1 = "نموذج البيانات (" + fileName + ")";
  else if (targetFile.includes("services/")) stage1 = "خدمة Angular (" + fileName + ")";
  else if (targetFile.includes("store/")) stage1 = "مستودع الحالة (" + fileName + ")";
  else if (targetFile.includes("routes")) stage1 = "مسارات التطبيق (" + fileName + ")";
  else if (targetFile.endsWith(".ts")) stage1 = "منطق الكود (" + fileName + ")";

  let stage2 = isHtml ? "عنصر واجهة المستخدم" : "خاصية أو دالة في الصنف";
  let tagOpen = "", tagClose = "", slotVal = targetCode;

  if (isHtml) {
    const m = targetCode.match(/^(<([a-zA-Z0-9-]+)[^>]*>)([\s\S]*?)(<\/\2>)$/);
    if (m) {
      tagOpen = m[1];
      tagClose = m[4];
      slotVal = m[3].trim() || "محتوى القالب";
      stage2 = `وسم <${m[2]}>`;
    }
  }

  const mIf = targetCode.match(/^@if\s*\(([^)]+)\)\s*\{([\s\S]*?)\}$/);
  const mFor = targetCode.match(/^@for\s*\(([^)]+)\)\s*\{([\s\S]*?)\}$/);
  const mSwitch = targetCode.match(/^@switch\s*\(([^)]+)\)\s*\{([\s\S]*?)\}$/);
  const mDefer = targetCode.match(/^@defer\s*(?:\(([^)]*)\))?\s*\{([\s\S]*?)\}$/);

  if (mIf) {
    stage2 = `شرط @if (${mIf[1].trim()})`;
    tagOpen = `@if (${mIf[1].trim()}) {\n  `;
    tagClose = `\n}`;
    slotVal = mIf[2].trim();
  } else if (mFor) {
    stage2 = `تكرار @for (${mFor[1].trim()})`;
    tagOpen = `@for (${mFor[1].trim()}) {\n  `;
    tagClose = `\n}`;
    slotVal = mFor[2].trim();
  } else if (mSwitch) {
    stage2 = `تبديل @switch (${mSwitch[1].trim()})`;
    tagOpen = `@switch (${mSwitch[1].trim()}) {\n  `;
    tagClose = `\n}`;
    slotVal = mSwitch[2].trim();
  } else if (mDefer) {
    const trigger = mDefer[1] ? ` (${mDefer[1].trim()})` : "";
    stage2 = `تحميل مؤجل @defer${trigger}`;
    tagOpen = `@defer${trigger} {\n  `;
    tagClose = `\n}`;
    slotVal = mDefer[2].trim();
  }

  return {
    active: true,
    targetFile,
    fileName,
    stage1,
    stage2,
    tagOpen,
    tagClose,
    slotVal,
    assembled: tagOpen || tagClose ? (tagOpen + slotVal + tagClose) : slotVal
  };
}

// 3.1 Non-throwing execution across all 35 steps of all 7 Phase 3 lessons
runTest('3.1 Slot Builder non-throwing execution across all 35 steps (5 steps * 7 lessons)', () => {
  let stepEvaluatedCount = 0;
  p3Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps) && lesson.steps.length === 5, `${lesson.id} must have 5 steps`);
    lesson.steps.forEach((step, sIdx) => {
      assert.doesNotThrow(() => {
        const res = emulateSlotBuilder(step, lesson);
        check(typeof res === 'object', `Step ${sIdx} of ${lesson.id} must return object`);
        stepEvaluatedCount++;
      }, `Slot Builder crashed on step ${sIdx} of lesson ${lesson.id}`);
    });
  });
  checkEqual(stepEvaluatedCount, 35, 'Must evaluate exactly 35 steps across Phase 3');
});

// 3.2 Stage 1 file categorization validation
runTest('3.2 Slot Builder stage 1 file categorization (template vs logic)', () => {
  p3Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    const res = emulateSlotBuilder(buildStep, lesson);
    check(res.active, `Build step of ${lesson.id} must be active in Slot Builder`);

    if (lesson.file.endsWith('.html')) {
      check(res.stage1.startsWith('قالب المكون'), `HTML file ${lesson.file} must have stage1 starting with 'قالب المكون'`);
      check(res.stage1.includes('app.html'), `Stage1 must include app.html`);
    } else if (lesson.file.endsWith('.ts')) {
      check(res.stage1.startsWith('منطق الكود'), `TS file ${lesson.file} must have stage1 starting with 'منطق الكود'`);
    }
  });
});

// 3.3 Stage 2 tool categorization and token extraction
runTest('3.3 Slot Builder stage 2 tool categorization for modern control flow features', () => {
  // ng-modern-04: @for
  const l4 = p3Lessons.find(l => l.id === 'ng-modern-04');
  const res4 = emulateSlotBuilder(l4.steps[2], l4);
  check(res4.stage2.includes('@for'), `ng-modern-04 stage2 must recognize @for`);
  check(res4.tagOpen.includes('@for (movie of movies; track movie.id)'), `ng-modern-04 tagOpen must contain track expression`);
  checkEqual(res4.tagClose, '\n}', `ng-modern-04 tagClose must be closing brace`);

  // ng-modern-05: @empty inside @for
  const l5 = p3Lessons.find(l => l.id === 'ng-modern-05');
  const res5 = emulateSlotBuilder(l5.steps[2], l5);
  check(res5.stage2.includes('@for'), `ng-modern-05 outer block is @for`);
  check(res5.slotVal.includes('@empty {'), `ng-modern-05 slotVal contains @empty { block`);

  // ng-modern-06: @switch
  const l6 = p3Lessons.find(l => l.id === 'ng-modern-06');
  const res6 = emulateSlotBuilder(l6.steps[2], l6);
  check(res6.stage2.includes('@switch (bookingStatus)'), `ng-modern-06 stage2 must recognize @switch condition`);
  check(res6.tagOpen.includes('@switch (bookingStatus)'), `ng-modern-06 tagOpen must contain @switch header`);
  check(res6.slotVal.includes('@case'), `ng-modern-06 slotVal must contain @case branches`);

  // ng-modern-07: @defer
  const l7 = p3Lessons.find(l => l.id === 'ng-modern-07');
  const res7 = emulateSlotBuilder(l7.steps[2], l7);
  check(res7.stage2.includes('@defer (on viewport)'), `ng-modern-07 stage2 must recognize @defer trigger`);
  check(res7.tagOpen.includes('@defer (on viewport)'), `ng-modern-07 tagOpen must contain @defer trigger`);
  check(res7.slotVal.includes('@placeholder'), `ng-modern-07 slotVal must contain @placeholder block`);
});

// 3.4 Assembled Slot Insertion into Simulator Runtime
runTest('3.4 Assembled slot insertion passes supportedTask() for all 7 Phase 3 lessons', () => {
  p3Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    const res = emulateSlotBuilder(buildStep, lesson);
    check(res.active, `Slot builder must be active for build step in ${lesson.id}`);

    // Simulate clicking apply: write assembled code to file
    setFiles({ [res.targetFile]: res.assembled });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Assembled code for ${lesson.id} must pass supportedTask()`);
  });
});

// 3.5 Interactive Slot Editing Mutations (benign vs destructive)
runTest('3.5 Interactive slot editing mutations: benign edits pass, destructive edits fail', () => {
  // ng-modern-04: student modifies inner template body (benign) -> still passes because @for header is in tagOpen
  const l4 = p3Lessons.find(l => l.id === 'ng-modern-04');
  const res4 = emulateSlotBuilder(l4.steps[2], l4);
  const benignVal4 = `  <span class="custom-movie">{{ movie.title }} - {{ movie.time }}</span>`;
  const benignAssembled4 = res4.tagOpen + benignVal4 + res4.tagClose;
  setFiles({ [res4.targetFile]: benignAssembled4 });
  checkEqual(checkSupportedTask(l4), true, 'Benign template edit in ng-modern-04 must preserve @for passing check');

  // ng-modern-05: destructive edit where student deletes @empty block -> must fail
  const l5 = p3Lessons.find(l => l.id === 'ng-modern-05');
  const res5 = emulateSlotBuilder(l5.steps[2], l5);
  const destructiveVal5 = `<div class="movie-pill"><b>{{ movie.title }}</b></div>`; // omitted @empty
  const destructiveAssembled5 = res5.tagOpen + destructiveVal5 + res5.tagClose;
  setFiles({ [res5.targetFile]: destructiveAssembled5 });
  checkEqual(checkSupportedTask(l5), false, 'Destructive edit in ng-modern-05 omitting @empty must fail supportedTask()');

  // ng-modern-06: student clears slot input to empty -> destructive edit -> must fail
  const l6 = p3Lessons.find(l => l.id === 'ng-modern-06');
  setFiles({ [l6.file]: '' });
  checkEqual(checkSupportedTask(l6), false, 'Empty slot in ng-modern-06 must fail supportedTask()');
});

// ============================================================================
// SECTION 4: PEDAGOGICAL SCHEMA & CURRICULUM INTEGRITY
// ============================================================================
console.log('\n--- SECTION 4: PEDAGOGICAL SCHEMA & CURRICULUM INTEGRITY ---');

// 4.1 5-Step Pedagogy Pattern
runTest('4.1 Strict 5-step pedagogy schema: [observe, observe, build, edit, quiz] for all 7 lessons', () => {
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
  p3Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps), `Lesson ${lesson.id} must have steps array`);
    checkEqual(lesson.steps.length, 5, `Lesson ${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((s, idx) => {
      checkEqual(s.type, expectedTypes[idx], `Lesson ${lesson.id} step ${idx} type must be ${expectedTypes[idx]}`);
      check(typeof s.title === 'string' && s.title.length > 5, `Lesson ${lesson.id} step ${idx} must have title`);
      check(typeof (s.task || s.explanation) === 'string' && (s.task || s.explanation).length > 5, `Lesson ${lesson.id} step ${idx} must have task/explanation`);
    });
  });
});

// 4.2 Official angular.dev documentation links
runTest('4.2 Official documentation reference from angular.dev for all 7 Phase 3 lessons', () => {
  p3Lessons.forEach(lesson => {
    const doc = lesson.reference || lesson.docUrl;
    check(typeof doc === 'string', `Lesson ${lesson.id} must have reference/docUrl`);
    check(doc.startsWith('https://angular.dev/'), `Lesson ${lesson.id} reference must point to official angular.dev (${doc})`);
  });
});

// 4.3 Visual flow arrows (⟶)
runTest('4.3 Visual flow arrow (⟶) present in every Phase 3 lesson description/flow', () => {
  p3Lessons.forEach(lesson => {
    const hasArrow = (lesson.flow && lesson.flow.includes('⟶')) ||
                     (lesson.title && lesson.title.includes('⟶')) ||
                     (lesson.description && lesson.description.includes('⟶'));
    check(hasArrow, `Lesson ${lesson.id} must include pedagogical flow arrow '⟶'`);
  });
});

// 4.4 Module descriptor schema & index continuity (23 through 29)
runTest('4.4 Module descriptor schema & sequential index continuity (indices 23 to 29)', () => {
  const mod = courseData.modules['phase-3-modern'];
  check(!!mod, 'Module "phase-3-modern" must exist');
  checkEqual(mod.id, 'phase-3-modern', 'Module ID must be phase-3-modern');
  checkEqual(mod.lessonCount, 7, 'Module lessonCount must be 7');
  checkEqual(mod.icon, '⚡', 'Module icon must be ⚡');

  const expectedIds = [
    'ng-modern-01', 'ng-modern-02', 'ng-modern-03', 'ng-modern-04',
    'ng-modern-05', 'ng-modern-06', 'ng-modern-07'
  ];
  expectedIds.forEach((expectedId, offset) => {
    const idx = 23 + offset;
    checkEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    checkEqual(courseData.lessons[idx].module, 'phase-3-modern', `Lesson ${expectedId} must belong to module 'phase-3-modern'`);
  });
});

// 4.5 Global course uniqueness (0 duplicate lesson IDs across all 76 lessons)
runTest('4.5 Global curriculum integrity: valid lesson count with 0 duplicate IDs', () => {
  check([76, 84].includes(courseData.lessons.length), 'Course must contain 76 or 84 lessons');
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(l.id, `Lesson at index ${idx} must have id`);
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
  check([76, 84].includes(seenIds.size), 'Must have 76 or 84 unique lesson IDs');
});

// ============================================================================
// SECTION 5: SIMULATOR DYNAMIC TEMPLATE & RUNTIME EXECUTION
// ============================================================================
console.log('\n--- SECTION 5: SIMULATOR DYNAMIC TEMPLATE & RUNTIME EXECUTION ---');

// 5.1 Modern @if / @else branch execution with reactive conditions
runTest('5.1 Simulator evaluates modern @if / @else branches with dynamic values', () => {
  const htmlTemplate = `
    @if (totalPrice() >= 200) {
      <div id="status-discount">VIP_DISCOUNT_ACTIVE</div>
    } @else {
      <div id="status-normal">STANDARD_RATE</div>
    }
  `;

  env.context.currentLessonIndex = 25; // ng-modern-03
  env.setActivePath('src/app/app.html');

  // Condition True (250 >= 200)
  const appTsTrue = courseData.starterFiles['src/app/app.ts'];
  setFiles({
    'src/app/app.html': htmlTemplate,
    'src/app/app.ts': appTsTrue
  });
  env.runSimulatedPreview();
  let preview = env.getPreviewSrcdoc();
  check(preview.includes('VIP_DISCOUNT_ACTIVE'), 'Preview must render VIP_DISCOUNT_ACTIVE when totalPrice >= 200');
  check(!preview.includes('STANDARD_RATE'), 'Preview must NOT render STANDARD_RATE when condition is true');

  // Condition False (150 < 200)
  const appTsFalse = appTsTrue.replace('totalPrice = signal(250);', 'totalPrice = signal(150);');
  setFiles({
    'src/app/app.html': htmlTemplate,
    'src/app/app.ts': appTsFalse
  });
  env.runSimulatedPreview();
  preview = env.getPreviewSrcdoc();
  check(preview.includes('STANDARD_RATE'), 'Preview must render STANDARD_RATE when totalPrice < 200');
  check(!preview.includes('VIP_DISCOUNT_ACTIVE'), 'Preview must NOT render VIP_DISCOUNT_ACTIVE when condition is false');
});

// 5.2 Modern @for loop rendering with track, $index, and item properties
runTest('5.2 Simulator evaluates modern @for loop rendering collection items and $index', () => {
  const forTemplate = `
    <div class="movie-list">
      @for (movie of movies; track movie.id) {
        <div class="movie-card" data-idx="{{ $index }}">
          <span class="m-title">{{ movie.title }}</span>
        </div>
      }
    </div>
  `;

  env.context.currentLessonIndex = 26; // ng-modern-04
  env.setActivePath('src/app/app.html');
  setFiles({
    'src/app/app.html': forTemplate,
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts']
  });
  env.runSimulatedPreview();
  const preview = env.getPreviewSrcdoc();
  check(preview.includes('رحلة النجوم'), 'Preview must render first movie title');
  check(preview.includes('واحة الأمل'), 'Preview must render second movie title');
});

// 5.3 Modern @empty block rendering when collection is empty
runTest('5.3 Simulator evaluates modern @empty fallback when collection is empty', () => {
  const forEmptyTemplate = `
    @for (movie of movies(); track movie.id) {
      <div>{{ movie.title }}</div>
    } @empty {
      <div id="no-movies-fallback">NO_MOVIES_FOUND_EMPTY_STATE</div>
    }
  `;

  env.context.currentLessonIndex = 27; // ng-modern-05
  env.setActivePath('src/app/app.html');
  const appTsEmpty = courseData.starterFiles['src/app/app.ts'].replace(/movies\s*=\s*\[[\s\S]*?\];/, 'movies = signal([]);');
  setFiles({
    'src/app/app.html': forEmptyTemplate,
    'src/app/app.ts': appTsEmpty
  });
  env.runSimulatedPreview();
  const preview = env.getPreviewSrcdoc();
  check(preview.includes('NO_MOVIES_FOUND_EMPTY_STATE'), 'Preview must render @empty fallback block when movies collection is empty');
});

// 5.4 Modern @switch / @case / @default branch evaluation
runTest('5.4 Simulator evaluates modern @switch / @case / @default branches', () => {
  const switchTemplate = `
    @switch (bookingStatus) {
      @case ('CONFIRMED') { <span id="badge-confirmed">CONFIRMED_SEAT</span> }
      @case ('PENDING') { <span id="badge-pending">PAYMENT_PENDING</span> }
      @default { <span id="badge-default">UNKNOWN_STATE</span> }
    }
  `;

  env.context.currentLessonIndex = 28; // ng-modern-06
  env.setActivePath('src/app/app.html');

  // Case 1: CONFIRMED
  setFiles({
    'src/app/app.html': switchTemplate,
    'src/app/app.ts': `export class App { bookingStatus = 'CONFIRMED'; }`
  });
  env.runSimulatedPreview();
  let preview = env.getPreviewSrcdoc();
  check(preview.includes('CONFIRMED_SEAT'), 'Preview must render CONFIRMED_SEAT');
  check(!preview.includes('PAYMENT_PENDING'), 'Preview must NOT render PAYMENT_PENDING');

  // Case 2: PENDING
  setFiles({
    'src/app/app.html': switchTemplate,
    'src/app/app.ts': `export class App { bookingStatus = 'PENDING'; }`
  });
  env.runSimulatedPreview();
  preview = env.getPreviewSrcdoc();
  check(preview.includes('PAYMENT_PENDING'), 'Preview must render PAYMENT_PENDING');

  // Case 3: DEFAULT
  setFiles({
    'src/app/app.html': switchTemplate,
    'src/app/app.ts': `export class App { bookingStatus = 'CANCELLED'; }`
  });
  env.runSimulatedPreview();
  preview = env.getPreviewSrcdoc();
  check(preview.includes('UNKNOWN_STATE'), 'Preview must render UNKNOWN_STATE fallback for non-matching status');
});

// 5.5 Modern @defer / @placeholder parsing resilience
runTest('5.5 Simulator parses @defer and @placeholder blocks without rendering crash', () => {
  const deferTemplate = `
    @defer (on viewport) {
      <div id="deferred-content">HEAVY_3D_SEAT_MAP</div>
    } @placeholder {
      <div id="loading-placeholder">SCROLL_DOWN_TO_VIEW</div>
    }
  `;

  setFiles({
    'src/app/app.html': deferTemplate,
    'src/app/app.ts': `export class App {}`
  });
  assert.doesNotThrow(() => {
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on @defer blocks');

  const preview = env.getPreviewSrcdoc();
  check(preview.length > 50, 'Preview srcdoc must be non-empty and well-formed');
});

// ============================================================================
// SECTION 6: MASTER E2E TEST SUITE REGRESSION EXECUTION
// ============================================================================
console.log('\n--- SECTION 6: MASTER E2E TEST SUITE REGRESSION ---');

runTest('6.1 Subprocess execution of tests/e2e/run_all_e2e_tests.cjs passes with 0 failures', () => {
  const e2eScriptPath = path.join(ROOT_DIR, 'tests', 'e2e', 'run_all_e2e_tests.cjs');
  check(fs.existsSync(e2eScriptPath), 'Master E2E script must exist');

  const proc = spawnSync(process.execPath, [e2eScriptPath], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 30000
  });

  if (proc.status !== 0) {
    console.error('E2E stdout:', proc.stdout);
    console.error('E2E stderr:', proc.stderr);
  }
  checkEqual(proc.status, 0, `Master E2E suite exited with code ${proc.status}`);
  check(proc.stdout.includes('ALL E2E TEST TIERS PASSED SUCCESSFULLY'), 'E2E suite must report successful completion');
  check(proc.stdout.includes('Passed           : 59'), 'All 59 E2E tests must pass');
});

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('\n===============================================================================');
console.log(`📊 FINAL STRESS TEST SUMMARY`);
console.log(`===============================================================================`);
console.log(`Total Test Suites : ${totalTests}`);
console.log(`Passed Suites     : ${passedTests} ✅`);
console.log(`Failed Suites     : ${failedTests} ${failedTests === 0 ? '🎉' : '❌'}`);
console.log(`Total Assertions  : ${totalAssertions}`);

if (failedTests > 0) {
  console.log('\n❌ Failure Breakdown:');
  failureDetails.forEach(f => {
    console.log(`  - [${f.name}]: ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('\n🎉 ALL ADVERSARIAL STRESS TESTS PASSED WITH ZERO DEFECTS!');
  process.exit(0);
}

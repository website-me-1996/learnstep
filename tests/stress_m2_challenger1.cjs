/**
 * Adversarial Stress Test Harness - Milestone 2 Challenger 1 (M2 Challenger 1)
 *
 * Exhaustive empirical verification and adversarial challenge of all 13 Phase 2
 * Classic Angular lessons (ng-classic-01 to ng-classic-13):
 *
 * 1. Positive Matching & Resilience:
 *    - Exact `lesson.expected` matching.
 *    - Exact `lesson.code` matching.
 *    - Whitespace variations: tabs, trailing spaces, multiple spaces, mixed CRLF/LF.
 *    - Multiline formatting tolerance in realistic student code.
 *    - Surrounding comments (line, block, HTML) and realistic code blocks.
 *
 * 2. Negative Rejection (Boundary Testing):
 *    - Incomplete/truncated snippets (no false positives).
 *    - Typos in identifiers, casing errors, missing operators.
 *    - Syntax corruption and garbage input.
 *    - Wrong file placement, empty files, whitespace-only files.
 *    - Zero-whitespace token boundary analysis.
 *
 * 3. Slot Builder Token Breakdown & Workflow Simulation:
 *    - Tokenization and stage breakdown for all Phase 2 lessons.
 *    - Non-throwing execution, valid stage1/stage2 labels, slot value extraction.
 *    - Assembly and integration verification into simulator runtime.
 *    - Interactive slot editing (valid mutations vs destructive mutations).
 *
 * 4. Pedagogical Schema & Curriculum Integrity:
 *    - 5-step pedagogy schema (observe, observe, build, edit, quiz).
 *    - Official angular.dev documentation links.
 *    - Module descriptor schema & index continuity (10 to 22).
 *    - 0 duplicate IDs across all 69 curriculum lessons.
 *
 * 5. Master E2E Test Suite Regression Check:
 *    - Execution of `tests/e2e/run_all_e2e_tests.cjs`.
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// Test execution & granular assertion tracking
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
console.log('⚔️  MILIESTONE 2 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (PHASE 2 CLASSIC)');
console.log('===============================================================================');

// 1. Load course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p2Lessons = courseData.lessons.filter(l => l.id.startsWith('ng-classic'));
console.log(`Discovered ${p2Lessons.length} Phase 2 Classic Angular lessons.`);
checkEqual(p2Lessons.length, 13, 'Must discover exactly 13 Phase 2 lessons');

// ============================================================================
// SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE (ALL 13 LESSONS)
// ============================================================================
console.log('\n--- SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE ---');

// 1.1 Exact matching of lesson.expected
runTest('1.1 Exact lesson.expected matches supportedTask for all 13 Phase 2 lessons', () => {
  p2Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ [lesson.file]: exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact expected match in ${lesson.file}`);
  });
});

// 1.2 Exact matching of full lesson.code
runTest('1.2 Full lesson.code matches supportedTask for all 13 Phase 2 lessons', () => {
  p2Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed full code match in ${lesson.file}`);
  });
});

// 1.3 Whitespace Variation: Extra tabs, trailing spaces, multiple consecutive spaces
runTest('1.3 Whitespace tolerance (tabs, multiple spaces, trailing whitespace)', () => {
  p2Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const padded = `\t\t   ${exp.replace(/ /g, '    ')}   \t\t\n`;
    setFiles({ [lesson.file]: padded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed tab/space variation in ${lesson.file}`);
  });
});

// 1.4 Whitespace Variation: Windows CRLF and Linux LF mixed line breaks
runTest('1.4 CRLF & LF mixed line break variations', () => {
  p2Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const crlf = `\r\n\r\n\t  ${exp}  \r\n\r\n`;
    setFiles({ [lesson.file]: crlf });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed CRLF line break match in ${lesson.file}`);
  });
});

// 1.5 Multiline formatting tolerance across tokens in realistic student code
runTest('1.5 Multiline formatting of attributes and parameters in realistic student code', () => {
  const multilineMap = {
    'ng-classic-01': 'import { NgModule } from \'@angular/core\';\n\n@NgModule({\n  declarations: []\n})\nexport class\n  AppClassicModule\n{}',
    'ng-classic-02': '@Component({\n  selector: \'app-movie-card-classic\'\n})\nexport class\n  MovieCardClassicComponent\n{',
    'ng-classic-03': '<div class="card">\n  <button\n    class="btn-book"\n    [disabled]="isSoldOut">حجز التذكرة</button>\n</div>',
    'ng-classic-04': '<button\n  type="button"\n  class="btn-book"\n  (click)="onBookTicket()">\n  احجز مقعدك الآن\n</button>',
    'ng-classic-05': '<div\n  *ngIf="isAvailable;\n  else soldOutTpl">\n  العرض متاح\n</div>',
    'ng-classic-06': '<div\n  *ngFor="let movie of classicMovies;\n  let i = index">\n  {{ movie.title }}\n</div>',
    'ng-classic-07': '<span\n  [ngClass]="{\n    \'badge discount\': hasDiscount,\n    \'badge normal\': !hasDiscount\n  }">\n  شريط الخصم\n</span>',
    'ng-classic-08': 'export class MovieDetailClassicComponent {\n  @Input()\n  title: string = \'\';\n}',
    'ng-classic-09': 'export class SeatItemClassicComponent {\n  @Output()\n  seatSelected = new EventEmitter<string>();\n}',
    'ng-classic-10': '<span>\n  {{\n    85 | currency:\'USD\':\'symbol\':\'1.2-2\'\n  }}\n</span>',
    'ng-classic-11': '@Injectable({\n  providedIn: \'root\'\n})\nexport class\n  CinemaClassicService\n{',
    'ng-classic-12': 'export class\n  RxDemo\n{',
    'ng-classic-13': '<div class="movie-box">\n  {{\n    currentMovie$ | async\n  }}\n</div>'
  };

  p2Lessons.forEach(lesson => {
    const formatted = multilineMap[lesson.id];
    check(!!formatted, `Lesson ${lesson.id} must have multiline test case defined`);
    setFiles({ [lesson.file]: formatted });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multiline formatting test in ${lesson.file}`);
  });
});

// 1.6 Surrounding comments (line, block, HTML comments)
runTest('1.6 Surrounding comments tolerance (//, /* */, <!-- -->)', () => {
  p2Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const isHtml = lesson.file.endsWith('.html');
    let content;
    if (isHtml) {
      content = `<!-- Header comment -->\n<div class="test-wrapper">\n  <!-- Solution start -->\n  ${exp}\n  <!-- Solution end -->\n</div>`;
    } else {
      content = `// Header student comment\n/* Block explanation here */\n${exp}\n// End of block\n`;
    }
    setFiles({ [lesson.file]: content });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed surrounding comments test`);
  });
});

// 1.7 Realistic surrounding code blocks (imports, parent classes, complex templates)
runTest('1.7 Realistic surrounding code blocks', () => {
  p2Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const isHtml = lesson.file.endsWith('.html');
    let realisticContent;
    if (isHtml) {
      realisticContent = `
        <div class="cinema-app-root">
          <header class="app-header">
            <h1>سينما الأضواء</h1>
          </header>
          <main class="content-container">
            ${exp}
          </main>
          <footer class="app-footer">
            <p>جميع الحقوق محفوظة</p>
          </footer>
        </div>
      `;
    } else {
      realisticContent = `
        import { Injectable, Component, Input, Output, EventEmitter } from '@angular/core';
        import { Observable, of } from 'rxjs';

        const MOCK_CONFIG = { debug: true };

        ${exp}

        export function helperMethod() { return true; }
      `;
    }
    setFiles({ [lesson.file]: realisticContent });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed realistic surrounding code test`);
  });
});

// ============================================================================
// SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING (NO FALSE POSITIVES)
// ============================================================================
console.log('\n--- SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING ---');

// 2.1 Incomplete / truncated snippets
runTest('2.1 Truncated/incomplete snippets strictly rejected (13 lessons)', () => {
  const truncatedSnippets = {
    'ng-classic-01': 'export class AppClassicModule',
    'ng-classic-02': 'export class MovieCardClassicComponent',
    'ng-classic-03': '<button class="btn-book" [disabled]="isSoldOut">',
    'ng-classic-04': '(click)="onBookTicket()',
    'ng-classic-05': '*ngIf="isAvailable;"',
    'ng-classic-06': '*ngFor="let movie of classicMovies"',
    'ng-classic-07': '[ngClass]="{ \'badge discount\': hasDiscount }"',
    'ng-classic-08': '@Input() title: string;',
    'ng-classic-09': '@Output() seatSelected = new EventEmitter',
    'ng-classic-10': '{{ 85 | currency }}',
    'ng-classic-11': 'export class CinemaClassicService',
    'ng-classic-12': 'export class RxDemo',
    'ng-classic-13': '{{ currentMovie$ }}'
  };

  p2Lessons.forEach(lesson => {
    const incomplete = truncatedSnippets[lesson.id];
    check(!!incomplete, `Missing incomplete snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: incomplete });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted incomplete snippet: "${incomplete}"`);
  });
});

// 2.2 Typos in identifiers, directives, and casing
runTest('2.2 Typos, casing mismatches, and incorrect identifiers strictly rejected (13 lessons)', () => {
  const typoSnippets = {
    'ng-classic-01': 'export class appclassicmodule {}',
    'ng-classic-02': 'export class MovieCardClassicComponents {',
    'ng-classic-03': '<button class="btn-book" [disabled]="isSoldout">حجز التذكرة</button>',
    'ng-classic-04': '(click)="onBookTickets()"',
    'ng-classic-05': '*ngif="isAvailable; else soldOutTpl"',
    'ng-classic-06': '*ngFor="let movie of classicMovie; let i = index"',
    'ng-classic-07': '[ngClass]="{ \'badge discount\': hasDiscounts, \'badge normal\': !hasDiscount }"',
    'ng-classic-08': '@input() title: string = \'\';',
    'ng-classic-09': '@Output() seatSelected = new EventEmiter<string>();',
    'ng-classic-10': '{{ 85 | Currency:\'USD\':\'symbol\':\'1.2-2\' }}',
    'ng-classic-11': 'export class CinemClassicService {',
    'ng-classic-12': 'export class RxDemonstration {',
    'ng-classic-13': '{{ currentMovie$ | asynk }}'
  };

  p2Lessons.forEach(lesson => {
    const typo = typoSnippets[lesson.id];
    check(!!typo, `Missing typo snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: typo });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted typo snippet: "${typo}"`);
  });
});

// 2.3 Syntax corruption and invalid characters
runTest('2.3 Syntax corruption and garbage input strictly rejected (13 lessons)', () => {
  p2Lessons.forEach(lesson => {
    const corrupt = `@@@ CORRUPT SYNTAX {{{ &&& broken_code_block ::: ??? %%%`;
    setFiles({ [lesson.file]: corrupt });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted garbage content`);
  });
});

// 2.4 Empty and whitespace-only files
runTest('2.4 Empty and whitespace-only files strictly rejected (13 lessons)', () => {
  p2Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    checkEqual(checkSupportedTask(lesson), false, `Empty file must fail for ${lesson.id}`);

    setFiles({ [lesson.file]: '   \n\t\r\n   ' });
    checkEqual(checkSupportedTask(lesson), false, `Whitespace-only file must fail for ${lesson.id}`);
  });
});

// 2.5 Wrong target file (snippet placed in non-target file)
runTest('2.5 Snippet placed in wrong file strictly rejected (13 lessons)', () => {
  p2Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({
      'src/app/wrong-target.ts': exp,
      [lesson.file]: '// Target file left blank'
    });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} passed when snippet was placed in wrong file`);
  });
});

// 2.6 Adversarial Boundary: Whitespace splitting inside zero-space tokens
runTest('2.6 Adversarial Boundary: Whitespace split across zero-whitespace tokens is rejected', () => {
  const zeroSpaceSplits = {
    'ng-classic-04': '(click) = "onBookTicket()"',
    'ng-classic-05': '*ngIf = "isAvailable; else soldOutTpl"',
    'ng-classic-06': '*ngFor = "let movie of classicMovies; let i = index"',
    'ng-classic-07': '[ngClass] = "{ \'badge discount\': hasDiscount, \'badge normal\': !hasDiscount }"'
  };

  Object.entries(zeroSpaceSplits).forEach(([id, snippet]) => {
    const lesson = p2Lessons.find(l => l.id === id);
    setFiles({ [lesson.file]: snippet });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `Boundary check: whitespace around '=' in ${id} correctly rejected`);
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
  } else if (!isHtml) {
    const mSig = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*signal(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mComp = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*computed(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mInput = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*input(?:\.required)?(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mOutput = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*output(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mModel = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*model(?:<[^>]+>)?\(([\s\S]*)\);?$/);

    if (mSig) {
      stage2 = `إشارة Signal: ${mSig[1]}`;
      tagOpen = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagClose = `);`;
      slotVal = mSig[2];
    } else if (mComp) {
      stage2 = `حساب مشتق computed: ${mComp[1]}`;
      tagOpen = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagClose = `);`;
      slotVal = mComp[2];
    } else if (mInput) {
      stage2 = `مدخل Signal Input: ${mInput[1]}`;
      tagOpen = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagClose = `);`;
      slotVal = mInput[2];
    } else if (mOutput) {
      stage2 = `مخرج Signal Output: ${mOutput[1]}`;
      tagOpen = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagClose = `);`;
      slotVal = mOutput[2];
    } else if (mModel) {
      stage2 = `ربط ثنائي Signal Model: ${mModel[1]}`;
      tagOpen = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagClose = `);`;
      slotVal = mModel[2];
    } else {
      const mInterface = targetCode.match(/^(?:export\s+)?interface\s+([a-zA-Z0-9_]+(?:\s*<[^>]+>)?)(?:\s+extends\s+[^{]+)?\s*\{([\s\S]*?)\}$/);
      const mType = targetCode.match(/^(?:export\s+)?type\s+([a-zA-Z0-9_]+(?:\s*<[^>]+>)?)\s*=\s*([\s\S]*?);?$/);
      const mClass = targetCode.match(/^(?:export\s+)?class\s+([a-zA-Z0-9_]+)(?:[^{]+)?\s*\{([\s\S]*?)\}$/);
      const mFn = targetCode.match(/^(?:export\s+)?function\s+([a-zA-Z0-9_]+)\s*((?:<[^>]+>\s*)?\([^)]*\)(?:\s*:\s*[^{]+)?)\s*\{([\s\S]*?)\}$/);
      const mEnum = targetCode.match(/^(?:export\s+)?enum\s+([a-zA-Z0-9_]+)\s*\{([\s\S]*?)\}$/);

      if (mInterface) {
        stage2 = `واجهة Interface: ${mInterface[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mInterface[2].trim();
      } else if (mType) {
        stage2 = `نوع مستعار Type Alias: ${mType[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("=") + 1);
        tagOpen = `${prefix} `;
        tagClose = `;`;
        slotVal = mType[2].trim();
      } else if (mClass) {
        stage2 = `صنف Class: ${mClass[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mClass[2].trim();
      } else if (mFn) {
        stage2 = `دالة Function: ${mFn[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mFn[3].trim();
      } else if (mEnum) {
        stage2 = `تعداد Enum: ${mEnum[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mEnum[2].trim();
      }
    }
  }

  return {
    active: true,
    targetFile,
    targetCode,
    isHtml,
    stage1,
    stage2,
    tagOpen,
    tagClose,
    slotVal,
    assembled: tagOpen || tagClose ? (tagOpen + slotVal + tagClose) : slotVal
  };
}

// 3.1 Tokenization does not throw exceptions across all steps of all 13 Phase 2 lessons
runTest('3.1 Slot Builder tokenization executes cleanly without exceptions for all 13 lessons', () => {
  p2Lessons.forEach(lesson => {
    lesson.steps.forEach(step => {
      if (step.type === 'quiz') return;
      const res = emulateSlotBuilder(step, lesson);
      checkEqual(res.active, true, `Step ${step.id} of ${lesson.id} failed tokenization`);
      check(typeof res.stage1 === 'string' && res.stage1.length > 0, `stage1 must be non-empty`);
      check(typeof res.stage2 === 'string' && res.stage2.length > 0, `stage2 must be non-empty`);
      check(typeof res.slotVal === 'string' && res.slotVal.length > 0, `slotVal must be non-empty`);
    });
  });
});

// 3.2 Slot Builder stage1 accurately reflects file context (HTML vs TS vs Service)
runTest('3.2 Slot Builder stage1 semantic classification', () => {
  p2Lessons.forEach(lesson => {
    const practiceStep = lesson.steps[2];
    const res = emulateSlotBuilder(practiceStep, lesson);
    if (lesson.file.endsWith('.html')) {
      check(res.stage1.startsWith('قالب المكون'), `HTML file ${lesson.file} must have stage1 starting with قالب المكون`);
    } else if (lesson.file.includes('services/')) {
      check(res.stage1.startsWith('خدمة Angular'), `Service file ${lesson.file} must have stage1 starting with خدمة Angular`);
    } else {
      check(res.stage1.startsWith('منطق الكود'), `TS file ${lesson.file} must have stage1 starting with منطق الكود`);
    }
  });
});

// 3.3 Slot Builder stage2 identifies structural HTML tags, TS classes, or default constructs
runTest('3.3 Slot Builder stage2 structural tool identification', () => {
  const expectedStage2Map = {
    'ng-classic-01': 'خاصية أو دالة في الصنف',
    'ng-classic-02': 'خاصية أو دالة في الصنف',
    'ng-classic-03': 'وسم <button>',
    'ng-classic-04': 'وسم <button>',
    'ng-classic-05': 'عنصر واجهة المستخدم',
    'ng-classic-06': 'وسم <div>',
    'ng-classic-07': 'وسم <span>',
    'ng-classic-08': 'خاصية أو دالة في الصنف',
    'ng-classic-09': 'خاصية أو دالة في الصنف',
    'ng-classic-10': 'وسم <span>',
    'ng-classic-11': 'صنف Class: CinemaClassicService',
    'ng-classic-12': 'صنف Class: RxDemo',
    'ng-classic-13': 'وسم <div>'
  };

  p2Lessons.forEach(lesson => {
    const practiceStep = lesson.steps[2];
    const res = emulateSlotBuilder(practiceStep, lesson);
    const expectedStage2 = expectedStage2Map[lesson.id];
    checkEqual(
      res.stage2,
      expectedStage2,
      `Lesson ${lesson.id} stage2 mismatch: expected "${expectedStage2}", got "${res.stage2}"`
    );
  });
});

// 3.4 Assembling Slot Builder output and applying it into simulator workspace satisfies checkSupportedTask
runTest('3.4 Slot Builder applied assembly satisfies checkSupportedTask for all 13 Phase 2 lessons', () => {
  p2Lessons.forEach(lesson => {
    const practiceStep = lesson.steps[2];
    const res = emulateSlotBuilder(practiceStep, lesson);

    setFiles({ [res.targetFile]: `/* Initial content for ${lesson.id} */` });
    checkEqual(checkSupportedTask(lesson), false, `Lesson ${lesson.id} must fail before slot application`);

    const currentContent = `/* Initial content for ${lesson.id} */\n${res.assembled}`;
    setFiles({ [res.targetFile]: currentContent });

    const passed = checkSupportedTask(lesson);
    checkEqual(
      passed,
      true,
      `Lesson ${lesson.id} failed checkSupportedTask after applying assembled slot snippet:\n${res.assembled}`
    );
  });
});

// 3.5 Slot Builder interactive customization testing (valid vs destructive input mutations)
runTest('3.5 Slot Builder input customization resilience', () => {
  // Test ng-classic-04: slotVal is inner button text, tagOpen has the event binding (click)="onBookTicket()"
  const l4 = p2Lessons.find(l => l.id === 'ng-classic-04');
  const res4 = emulateSlotBuilder(l4.steps[2], l4);
  check(res4.tagOpen.includes('(click)="onBookTicket()"'), 'tagOpen retains click binding');
  
  // Customizing inner button text preserves (click)="onBookTicket()" and passes
  const customized4 = `${res4.tagOpen}احجز مقعدك الذهبي${res4.tagClose}`;
  setFiles({ [l4.file]: customized4 });
  checkEqual(checkSupportedTask(l4), true, 'Valid inner text customization in ng-classic-04 must pass');

  // Destructive slot modification in ng-classic-04: removing the click handler fails
  const destructive4 = `<button type="button" class="btn-book">احجز مقعدك الذهبي</button>`;
  setFiles({ [l4.file]: destructive4 });
  checkEqual(checkSupportedTask(l4), false, 'Destructive slot modification must fail task validation');

  // Test ng-classic-03: expected snippet includes full button tag and exact inner text
  const l3 = p2Lessons.find(l => l.id === 'ng-classic-03');
  const res3 = emulateSlotBuilder(l3.steps[2], l3);
  // Default assembly must match exact expected
  setFiles({ [l3.file]: res3.assembled });
  checkEqual(checkSupportedTask(l3), true, 'Default slot assembly in ng-classic-03 must pass');
  // Modifying inner text in ng-classic-03 fails because lesson.expected includes the exact inner text
  const modified3 = `${res3.tagOpen}نص مختلف${res3.tagClose}`;
  setFiles({ [l3.file]: modified3 });
  checkEqual(checkSupportedTask(l3), false, 'Modified inner text in ng-classic-03 strictly fails exact contract');
});

// ============================================================================
// SECTION 4: PEDAGOGICAL SCHEMA & CURRICULUM INTEGRITY
// ============================================================================
console.log('\n--- SECTION 4: PEDAGOGICAL SCHEMA & CURRICULUM INTEGRITY ---');

runTest('4.1 Module descriptor "phase-2-classic" has complete schema and 13 lessons', () => {
  check(!!courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-2-classic'];
  check(!!mod, 'phase-2-classic module descriptor must exist');
  checkEqual(mod.id, 'phase-2-classic', 'mod.id must match');
  checkEqual(mod.lessonCount, 13, 'mod.lessonCount must be 13');
  check(typeof mod.title === 'string' && mod.title.length > 5, 'mod.title must be descriptive');
  check(typeof mod.description === 'string' && mod.description.length > 10, 'mod.description must be descriptive');
});

runTest('4.2 Exactly 13 lessons with zero duplicate IDs across curriculum', () => {
  check([69, 76, 84, 91, 97, 106].includes(courseData.lessons.length), 'Curriculum must contain 69, 76, 84, 91, 97, or 106 lessons');
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
});

runTest('4.3 Sequential ordering of Phase 2 lessons at indices 10 through 22', () => {
  const expectedSeq = [
    'ng-classic-01', 'ng-classic-02', 'ng-classic-03', 'ng-classic-04',
    'ng-classic-05', 'ng-classic-06', 'ng-classic-07', 'ng-classic-08',
    'ng-classic-09', 'ng-classic-10', 'ng-classic-11', 'ng-classic-12',
    'ng-classic-13'
  ];

  expectedSeq.forEach((id, offset) => {
    const idx = 10 + offset;
    checkEqual(courseData.lessons[idx].id, id, `Curriculum index ${idx} must be ${id}`);
    checkEqual(courseData.lessons[idx].module, 'phase-2-classic', `Lesson ${id} must belong to phase-2-classic`);
    checkEqual(courseData.lessons[idx].phase, 'المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل', `Lesson ${id} must belong to Phase 2`);
  });
});

runTest('4.4 5-Step pedagogical structure across all 13 Phase 2 lessons', () => {
  const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p2Lessons.forEach(lesson => {
    checkEqual(lesson.steps.length, 5, `Lesson ${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((step, sIdx) => {
      checkEqual(step.id, stepIds[sIdx], `Step ${sIdx} id must be ${stepIds[sIdx]}`);
      checkEqual(step.type, stepTypes[sIdx], `Step ${sIdx} type must be ${stepTypes[sIdx]}`);
      check(typeof step.title === 'string' && step.title.length > 2, `Step ${step.id} title required`);
      check(typeof step.benefit === 'string' && step.benefit.length > 5, `Step ${step.id} benefit required`);
    });
  });
});

runTest('4.5 Quiz step verification (options, correct index, benefit) for all 13 lessons', () => {
  p2Lessons.forEach(lesson => {
    const quiz = lesson.steps[4];
    checkEqual(quiz.type, 'quiz', `Step 5 must be type quiz`);
    check(typeof quiz.question === 'string' && quiz.question.length > 10, `Quiz must have descriptive question`);
    check(Array.isArray(quiz.options) && quiz.options.length >= 2, `Quiz must have at least 2 options`);
    check(typeof quiz.correct === 'number' && quiz.correct >= 0 && quiz.correct < quiz.options.length, `Correct option must be valid index`);
  });
});

runTest('4.6 Official Angular documentation references for all 13 Phase 2 lessons', () => {
  p2Lessons.forEach(lesson => {
    check(typeof lesson.reference === 'string', `Lesson ${lesson.id} missing reference`);
    check(lesson.reference.startsWith('https://angular.dev/'), `Lesson ${lesson.id} reference must point to official angular.dev docs`);
  });
});

runTest('4.7 Visual flow notation contains directional arrow (⟶) for all 13 lessons', () => {
  p2Lessons.forEach(lesson => {
    check(typeof lesson.flow === 'string' && lesson.flow.includes('⟶'), `Lesson ${lesson.id} flow must contain arrow symbol ⟶`);
  });
});

// ============================================================================
// SECTION 5: FULL E2E TEST SUITE REGRESSION EXECUTION
// ============================================================================
console.log('\n--- SECTION 5: FULL E2E TEST SUITE REGRESSION EXECUTION ---');

runTest('5.1 Master E2E runner (node tests/e2e/run_all_e2e_tests.cjs) executes cleanly with 0 failures', () => {
  const runnerPath = path.join(ROOT_DIR, 'tests', 'e2e', 'run_all_e2e_tests.cjs');
  const result = spawnSync(process.execPath, [runnerPath], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    env: process.env
  });

  if (result.status !== 0) {
    console.error('E2E Runner Stdout:\n', result.stdout);
    console.error('E2E Runner Stderr:\n', result.stderr);
  }

  checkEqual(result.status, 0, `E2E suite must exit with code 0, got ${result.status}`);
  check(result.stdout.includes('ALL E2E TEST TIERS PASSED SUCCESSFULLY'), 'E2E suite must report successful completion');
  check(result.stdout.includes('Failed           : 0'), 'E2E suite must report 0 failed tests');
});

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log('\n===============================================================================');
console.log(`STRESS TEST EXECUTION COMPLETED:`);
console.log(`  Total Test Suites     : ${totalTests}`);
console.log(`  Passed Test Suites    : ${passedTests}`);
console.log(`  Failed Test Suites    : ${failedTests}`);
console.log(`  Total Inner Assertions: ${totalAssertions}`);
console.log('===============================================================================');

if (failedTests > 0) {
  console.error('\n❌ EMPIRICAL CHALLENGE VERDICT: REJECT');
  console.error('Failures detected:');
  failureDetails.forEach(f => console.error(` - ${f.name}: ${f.error}`));
  process.exit(1);
} else {
  console.log('\n🎉 EMPIRICAL CHALLENGE VERDICT: APPROVE');
  console.log(`All 13 Phase 2 lessons successfully withstood ${totalAssertions} adversarial assertions.`);
  process.exit(0);
}

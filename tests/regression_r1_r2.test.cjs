/**
 * tests/regression_r1_r2.test.cjs
 *
 * Comprehensive Automated Regression Test Suite for Requirements R1 and R2:
 *
 * R1. Answer Verification Logic:
 *   - Rejection of empty, whitespace, and unchanged submissions across tracks.
 *   - Elimination of false-positive passes when target tokens pre-exist in rawBefore.
 *   - Strict attribute enforcement (e.g. requiring `id` attribute, `id = input.required<string>();`).
 *   - Tightened HTML repair verification eliminating naive `<p>`/`<span>` catch-alls.
 *   - Proper discrimination between informational/observation steps and interactive steps.
 *   - Angular step advancement guard: `isStepCompleted` and `advanceStep` preventing premature advancement.
 *
 * R2. Text Sanitization & Entity Decoding:
 *   - Zero corrupt entity patterns across all 373 lessons in all 4 JSON tracks and JS data files.
 *   - Canonical breakdown hydration in `curriculumLessonBreakdown`: flat string parsing and object compatibility.
 *   - Runtime `lessonMixedMarkup` entity rendering without double-escaping (`&quot;` -> not `&amp;quot;`).
 *   - Clean Bidi isolation of attributes, code snippets, and tags in RTL contexts.
 *   - Bulk smoke test ensuring 0 corrupt artifacts in rendered output across all 373 lessons.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.join(__dirname, "..");
const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const angularEditorSrc = fs.readFileSync(path.join(ROOT, "angular-editor.js"), "utf8");
const lessonsDataSrc = fs.readFileSync(path.join(ROOT, "lessons-data.js"), "utf8");
const angularDataSrc = fs.readFileSync(path.join(ROOT, "angular-course-data.js"), "utf8");

function sourceBetween(src, start, end) {
  const s = src.indexOf(start);
  if (s < 0) throw new Error("Start token not found: " + start);
  const e = src.indexOf(end, s);
  if (e < 0) throw new Error("End token not found: " + end);
  return src.slice(s, e);
}

// -----------------------------------------------------------------------------
// Environment Harness Setup
// -----------------------------------------------------------------------------

function createEngineContext() {
  const context = {
    window: {},
    growth: { completed: [], drafts: {}, stepAttempts: {} },
    missingBuildLine(code, build) {
      if (!build || !build.line) return "";
      return String(code || "").includes(build.line) ? "" : build.line;
    },
    checkHtmlTags(html) {
      const clean = String(html || "").replace(/<!--[\s\S]*?-->/g, "");
      const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/g;
      const stack = [];
      const errors = [];
      const voidTags = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
      let match;
      while ((match = tagPattern.exec(clean)) !== null) {
        const full = match[0];
        const tag = match[1].toLowerCase();
        if (voidTags.has(tag)) continue;
        if (full.endsWith("/>")) continue;
        if (full.startsWith("</")) {
          if (!stack.length) {
            errors.push({ message: "وسم إغلاق زائد: </" + tag + ">" });
            break;
          }
          const open = stack.pop();
          if (open !== tag) {
            errors.push({ message: "وسم الإغلاق </" + tag + "> لا يطابق وسم الفتح <" + open + ">" });
            break;
          }
        } else {
          stack.push(tag);
        }
      }
      if (!errors.length && stack.length) {
        errors.push({ message: "وسم لم يتم إغلاقه: <" + stack[stack.length - 1] + ">" });
      }
      return { valid: errors.length === 0, errors };
    },
    normalizeArabic(s) {
      return String(s || "").replace(/[\u064B-\u065F\u0670]/g, "").replace(/\u0625|\u0623|\u0622/g, "\u0627").replace(/\u0649/g, "\u064A").replace(/\u0629/g, "\u0647");
    },
    normalizeDoc(code) {
      return String(code || "")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .split("\n")
        .map((line) => {
          let s = String(line || "").replace(/[\u2018\u2019`]/g, "'").replace(/[\u201C\u201D«»]/g, '"').replace(/'/g, '"');
          s = s.replace(/\s+/g, " ").replace(/\s*([<>={}:;,()[\]])\s*/g, "$1").trim();
          return s;
        })
        .filter(Boolean)
        .join("\n");
    },
    normalizeCodeLine(line) {
      let s = String(line || "").replace(/[\u2018\u2019`]/g, "'").replace(/[\u201C\u201D«»]/g, '"').replace(/'/g, '"');
      s = s.replace(/\s+/g, " ").replace(/\s*([<>={}:;,()[\]])\s*/g, "$1").trim();
      return s;
    },
    escapeHtml(s) {
      return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
  };

  vm.createContext(context);
  vm.runInContext(sourceBetween(appSrc, "  var SmartHintEngine = {", "  function validateLessonAnswer("), context);
  vm.runInContext(sourceBetween(appSrc, "  function curriculumLessonBreakdown(", "  function curriculumGrowthLessonModel("), context);
  vm.runInContext(sourceBetween(appSrc, "  function lessonMixedMarkup(", "  function setLessonCopy("), context);

  return context;
}

function createAngularContext() {
  const elementMock = {
    value: "",
    disabled: false,
    textContent: "",
    innerHTML: "",
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {},
    appendChild() {},
    addEventListener() {},
    closest() { return { addEventListener() {} }; }
  };
  const elements = {};
  const context = {
    window: {},
    document: {
      getElementById(id) {
        if (!elements[id]) elements[id] = Object.assign({}, elementMock);
        return elements[id];
      },
      querySelector() { return elementMock; },
      querySelectorAll() { return []; },
      createElement() { return Object.assign({}, elementMock); }
    },
    console,
    Set,
    Map,
    Array,
    Object,
    String,
    Math,
    Number
  };
  vm.createContext(context);
  vm.runInContext(angularDataSrc, context);
  vm.runInContext(angularEditorSrc, context);
  return { context, elements };
}

// =============================================================================
// SUITE 1: REQUIREMENT R1 — ANSWER VERIFICATION LOGIC & ADVANCEMENT GUARD
// =============================================================================

test("R1.1 Rejection of empty and whitespace-only user code across tracks", () => {
  const ctx = createEngineContext();
  const step = {
    id: "edit-1",
    type: "edit",
    from: "<p>قديم</p>",
    to: "<p>جديد</p>",
    before: "<div><p>قديم</p></div>",
    after: "<div><p>جديد</p></div>"
  };
  const model = { key: "html", id: "html-01" };

  const emptyRes = ctx.SmartHintEngine.evaluate("", step, model, 1);
  assert.equal(emptyRes.valid, false, "Empty submission must not pass");

  const wsRes = ctx.SmartHintEngine.evaluate("   \n\t  \n  ", step, model, 1);
  assert.equal(wsRes.valid, false, "Whitespace-only submission must not pass");
});

test("R1.2 Rejection of unchanged user code (submitting step.before without modification)", () => {
  const ctx = createEngineContext();
  const step = {
    id: "edit-1",
    type: "edit",
    from: "color: red;",
    to: "color: blue;",
    before: "h1 { color: red; }",
    after: "h1 { color: blue; }"
  };
  const model = { key: "css", id: "css-01" };

  const res = ctx.SmartHintEngine.evaluate(step.before, step, model, 1);
  assert.equal(res.valid, false, "Unchanged code must be rejected");
  assert.match(res.message, /تعديل غير مطابق|عدّل الكود المطلوب|راجع التغيير المطلوب/, "Must give guidance about required modification");
});

test("R1.3 False-Positive Elimination: pre-existing target code in rawBefore does not pass on unrelated edits", () => {
  const ctx = createEngineContext();
  // Concrete case from Survey: html-14-links step 2
  // 'href="#top"' already exists at line 16 of step.before.
  // The learner is required to change line 8 'href="#details"' to 'href="#top"'.
  const step = {
    id: "edit-2",
    type: "edit",
    from: 'href="#details"',
    to: 'href="#top"',
    before: [
      '<!DOCTYPE html>',
      '<html>',
      '<body>',
      '  <h1 id="top">دليل الحديقة</h1>',
      '  <p id="details">تفاصيل الدليل</p>',
      '  <a href="#details">انتقل إلى التفاصيل</a>', // line 6: to be changed
      '  <div style="height:500px"></div>',
      '  <a href="#top">عد إلى بداية الصفحة</a>', // line 8: pre-existing href="#top"
      '</body>',
      '</html>'
    ].join("\n"),
    after: [
      '<!DOCTYPE html>',
      '<html>',
      '<body>',
      '  <h1 id="top">دليل الحديقة</h1>',
      '  <p id="details">تفاصيل الدليل</p>',
      '  <a href="#top">انتقل إلى التفاصيل</a>',
      '  <div style="height:500px"></div>',
      '  <a href="#top">عد إلى بداية الصفحة</a>',
      '</body>',
      '</html>'
    ].join("\n")
  };
  const model = { key: "html", id: "html-14-links" };

  // Unrelated edit: user changes <h1> heading text, but leaves href="#details" untouched.
  const unrelatedUserCode = step.before.replace('دليل الحديقة', 'دليل الحديقة الجديد والمميز');

  const falsePositiveCheck = ctx.SmartHintEngine.evaluate(unrelatedUserCode, step, model, 1);
  assert.equal(
    falsePositiveCheck.valid,
    false,
    "Unrelated edit leaving href='#details' untouched MUST be rejected even though href='#top' pre-exists in document"
  );

  // Correct edit: user properly changes href="#details" to href="#top"
  const correctUserCode = step.after;
  const validCheck = ctx.SmartHintEngine.evaluate(correctUserCode, step, model, 1);
  assert.equal(validCheck.valid, true, "Proper replacement of href='#details' with href='#top' MUST pass");
});

test("R1.4 Required Attribute Enforcement: rejecting missing attributes like id", () => {
  const ctx = createEngineContext();
  const step = {
    id: "edit-attr",
    type: "edit",
    from: '<p>نبذة عن الموقع</p>',
    to: '<p id="details">نبذة عن الموقع</p>',
    before: '<body>\n  <p>نبذة عن الموقع</p>\n</body>',
    after: '<body>\n  <p id="details">نبذة عن الموقع</p>\n</body>'
  };
  const model = { key: "html", id: "html-05-attributes" };

  // Learner types without id attribute (e.g. typing class instead or just leaving it)
  const missingIdCode = '<body>\n  <p class="details">نبذة عن الموقع</p>\n</body>';
  const missingIdRes = ctx.SmartHintEngine.evaluate(missingIdCode, step, model, 1);
  assert.equal(missingIdRes.valid, false, "Missing required id='details' attribute must be rejected");

  // Learner types with id attribute
  const correctCode = '<body>\n  <p id="details">نبذة عن الموقع</p>\n</body>';
  const correctRes = ctx.SmartHintEngine.evaluate(correctCode, step, model, 1);
  assert.equal(correctRes.valid, true, "Entering expected id='details' attribute must pass");
});

test("R1.5 Tightened HTML Repair: rejecting broken code even if <p> or <span> tags exist elsewhere", () => {
  const ctx = createEngineContext();
  const step = { id: "repair", type: "repair" };
  const model = {
    key: "html",
    id: "html-01-introduction",
    brokenCode: "<h1>مرحباً بك في موقعي</span>",
    fixedCode: "<h1>مرحباً بك في موقعي</h1>"
  };

  // User leaves broken </span>, but document contains valid <p>...</p> tags elsewhere
  const userCodeWithBrokenTag = [
    "<!DOCTYPE html>",
    "<html><body>",
    "  <p>فقرة تجريبية موجودة في الصفحة</p>",
    "  <h1>مرحباً بك في موقعي</span>", // broken!
    "  <span>نص عشوائي داخل span</span>",
    "</body></html>"
  ].join("\n");

  const repairReject = ctx.SmartHintEngine.evaluate(userCodeWithBrokenTag, step, model, 1);
  assert.equal(
    repairReject.valid,
    false,
    "HTML repair must reject submission that still retains model.brokenCode, even if <p> or <span> tags exist"
  );

  // User fixes the broken tag
  const userCodeFixed = userCodeWithBrokenTag.replace("</span>", "</h1>");
  const repairPass = ctx.SmartHintEngine.evaluate(userCodeFixed, step, model, 1);
  assert.equal(repairPass.valid, true, "Properly repaired HTML without brokenCode must pass");
});

test("R1.6 Step Type Discrimination: observation steps pass baseline execution, interactive steps enforce code check", () => {
  const ctx = createEngineContext();
  const model = { key: "html", id: "html-01" };

  // Observation step
  const observeStep = { id: "idea", type: "observe" };
  const obsRes = ctx.SmartHintEngine.evaluate("<!DOCTYPE html><html><body><h1>مرحباً</h1></body></html>", observeStep, model, 1);
  assert.equal(obsRes.valid, true, "Observation step allows baseline code execution without mandatory edits");

  // Interactive step
  const editStep = {
    id: "edit-1",
    type: "edit",
    from: "<h1>مرحباً</h1>",
    to: "<h1>أهلاً بالعالم</h1>",
    before: "<h1>مرحباً</h1>",
    after: "<h1>أهلاً بالعالم</h1>"
  };
  const editRes = ctx.SmartHintEngine.evaluate("<h1>مرحباً</h1>", editStep, model, 1);
  assert.equal(editRes.valid, false, "Interactive edit step strictly prevents advancement on baseline code");
});

test("R1.7 Angular Editor isStepCompleted: prevents premature advancement on coding steps and quizzes", () => {
  const { context } = createAngularContext();
  const isStepCompleted = context.window.AngularCourse.isStepCompleted;
  assert.equal(typeof isStepCompleted, "function", "isStepCompleted must be exposed on AngularCourse");

  // 1. Observation step
  const obsStep = { id: "idea", type: "observe", title: "الفكرة الأساسية" };
  assert.equal(isStepCompleted(obsStep, {}, {}), true, "Observation steps are always completed");

  // 2. Interactive build step requiring 'id = input.required<string>();' (e.g. ng-route-03)
  const routeStep = {
    id: "practice",
    type: "build",
    title: "اكتب وطبّق في المحرر",
    file: "src/app/features/booking/booking.component.ts",
    expected: "id = input.required<string>();"
  };
  const lesson = { id: "ng-route-03", file: "src/app/features/booking/booking.component.ts" };

  // Initial files without required code
  const initialFiles = {
    "src/app/features/booking/booking.component.ts": [
      "import { Component } from '@angular/core';",
      "@Component({ selector: 'app-booking', template: '<h1>الحجز</h1>' })",
      "export class BookingComponent {",
      "}"
    ].join("\n")
  };

  assert.equal(
    isStepCompleted(routeStep, lesson, initialFiles),
    false,
    "Build step MUST return false when required 'id = input.required<string>();' is missing"
  );

  // Files updated with required code
  const updatedFiles = {
    "src/app/features/booking/booking.component.ts": [
      "import { Component, input } from '@angular/core';",
      "@Component({ selector: 'app-booking', template: '<h1>الحجز</h1>' })",
      "export class BookingComponent {",
      "  id = input.required<string>();",
      "}"
    ].join("\n")
  };

  assert.equal(
    isStepCompleted(routeStep, lesson, updatedFiles),
    true,
    "Build step MUST return true when required 'id = input.required<string>();' is present"
  );

  // 3. Quiz step validation
  const quizStep = {
    id: "quiz",
    type: "quiz",
    title: "اختبر فهمك",
    correct: 2,
    options: ["اختيار 0", "اختيار 1", "اختيار 2", "اختيار 3"]
  };

  context.window.AngularCourse.setQuizSelected(null);
  assert.equal(isStepCompleted(quizStep, lesson, updatedFiles), false, "Quiz returns false when nothing is selected");

  context.window.AngularCourse.setQuizSelected(1); // wrong option
  assert.equal(isStepCompleted(quizStep, lesson, updatedFiles), false, "Quiz returns false when wrong option is selected");

  context.window.AngularCourse.setQuizSelected(2); // correct option
  assert.equal(isStepCompleted(quizStep, lesson, updatedFiles), true, "Quiz returns true when correct option is selected");
});

test("R1.8 Angular Editor advanceStep guard: halts and provides feedback when step is incomplete", () => {
  const { context, elements } = createAngularContext();
  const AC = context.window.AngularCourse;

  // Simulate active lesson with 3 steps: observe, build, quiz
  const testLesson = {
    id: "ng-test-lesson",
    title: "درس اختباري",
    steps: [
      { id: "step-0", type: "observe", title: "ملاحظة" },
      { id: "step-1", type: "build", title: "كتابة كود", file: "src/app/app.ts", expected: "readonly title: string = 'cinema';" },
      { id: "step-2", type: "quiz", title: "سؤال", correct: 1, options: ["خطأ", "صح"] }
    ]
  };

  AC.setCourse({ lessons: [testLesson] });
  AC.setCurrentFiles({ "src/app/app.ts": "// empty starter" });

  // Step 0: Observation step -> advanceStep should succeed
  AC.setStepIndex(0);
  AC.advanceStep();
  assert.equal(AC.getStepIndex(), 1, "Should advance from observation step to step 1");

  // Step 1: Coding step without required code -> advanceStep MUST halt at step 1
  AC.advanceStep();
  assert.equal(AC.getStepIndex(), 1, "advanceStep MUST NOT increment stepIndex when code requirement is unsatisfied");
  assert.match(
    elements.angularLessonFeedback.textContent,
    /الجزء المطلوب لم يظهر بعد/,
    "Must display feedback indicating required code is missing"
  );

  // Provide required code in target file
  AC.setCurrentFiles({ "src/app/app.ts": "readonly title: string = 'cinema';" });
  AC.advanceStep();
  assert.equal(AC.getStepIndex(), 2, "Should advance to step 2 after entering required code");

  // Step 2: Quiz step without selecting option -> advanceStep MUST halt at step 2
  AC.setQuizSelected(null);
  AC.advanceStep();
  assert.equal(AC.getStepIndex(), 2, "advanceStep MUST NOT advance when quiz is unanswered");

  // Select wrong option -> advanceStep MUST halt at step 2
  AC.setQuizSelected(0);
  AC.advanceStep();
  assert.equal(AC.getStepIndex(), 2, "advanceStep MUST NOT advance when wrong quiz option is selected");

  // Select correct option -> advanceStep should be permitted
  AC.setQuizSelected(1);
  assert.equal(AC.isStepCompleted(testLesson.steps[2], testLesson, AC.getCurrentFiles()), true, "Correct quiz option satisfies isStepCompleted");
});

test("R1.9 Detail Step Validation: strictly rejects code missing required tag like <body> or attribute like id", () => {
  const ctx = createEngineContext();
  const model = { key: "html", id: "html-01-introduction" };

  // Case A: Detail step teaching <body>
  const bodyStep = {
    id: "detail-3",
    type: "observe",
    title: "ابنِ بيدك: <body>",
    code: "<body>",
    build: null
  };

  const codeWithoutBody = [
    "<!DOCTYPE html>",
    '<html lang="ar" dir="rtl">',
    "<head>",
    '  <meta charset="UTF-8">',
    "  <title>صفحة التجربة</title>",
    "</head>",
    "</html>"
  ].join("\n");

  const rejectBody = ctx.SmartHintEngine.evaluate(codeWithoutBody, bodyStep, model, 1);
  assert.equal(rejectBody.valid, false, "Detail step teaching <body> MUST reject code that lacks <body>");
  assert.match(rejectBody.message, /<body>/, "Validation message must cite missing <body>");

  const codeWithBody = [
    "<!DOCTYPE html>",
    '<html lang="ar" dir="rtl">',
    "<head>",
    '  <meta charset="UTF-8">',
    "  <title>صفحة التجربة</title>",
    "</head>",
    "<body>",
    "</body>",
    "</html>"
  ].join("\n");

  const passBody = ctx.SmartHintEngine.evaluate(codeWithBody, bodyStep, model, 1);
  assert.equal(passBody.valid, true, "Detail step teaching <body> MUST pass when <body> is present");

  // Case B: Detail step teaching id="about" attribute
  const idStep = {
    id: "detail-1",
    type: "observe",
    title: 'ابنِ بيدك: id="about"',
    code: 'id="about"',
    build: null
  };

  const codeWithoutId = '<a href="#about">رابط</a>\n<h1>عنوان</h1>';
  const rejectId = ctx.SmartHintEngine.evaluate(codeWithoutId, idStep, { key: "html", id: "html-05-attributes" }, 1);
  assert.equal(rejectId.valid, false, "Detail step teaching id='about' MUST reject code lacking the id attribute");
  assert.match(rejectId.message, /id="about"/, "Validation message must cite missing id attribute");

  const codeWithId = '<a href="#about">رابط</a>\n<h1 id="about">عنوان</h1>';
  const passId = ctx.SmartHintEngine.evaluate(codeWithId, idStep, { key: "html", id: "html-05-attributes" }, 1);
  assert.equal(passId.valid, true, "Detail step teaching id='about' MUST pass when id attribute is present");

  // Case C: Detail step with step.build object
  const buildStep = {
    id: "detail-3",
    type: "observe",
    title: "ابنِ بيدك: <body>",
    build: {
      line: "<body>"
    }
  };

  const rejectBuild = ctx.SmartHintEngine.evaluate(codeWithoutBody, buildStep, model, 1);
  assert.equal(rejectBuild.valid, false, "Step with build object MUST reject code missing the build line");
  const passBuild = ctx.SmartHintEngine.evaluate(codeWithBody, buildStep, model, 1);
  assert.equal(passBuild.valid, true, "Step with build object MUST pass when build line is present");
});

// =============================================================================
// SUITE 2: REQUIREMENT R2 — TEXT SANITIZATION, ENTITY DECODING & BIDI RENDERING
// =============================================================================

test("R2.1 Zero-Defect Static Scan across all 373 lessons and data files", () => {
  const filesToScan = [
    "html-lessons.json",
    "css-lessons.json",
    "js-lessons.json",
    "angular-lessons.json",
    "lessons-data.js",
    "angular-course-data.js"
  ];

  const corruptPatterns = [
    { pattern: /;\s*quot\s*&/i, name: "Reversed semicolon-quot-amp entity (; quot &)" },
    { pattern: /::quot/i, name: "Double colon stacked quot (::quot)" },
    { pattern: /&amp;quot;/i, name: "Double-escaped quote entity (&amp;quot;)" },
    { pattern: /ar\s*;\s*quot\s*&=\s*lang/i, name: "Inverted lang attribute string (ar ; quot &= lang)" },
    { pattern: /(?:id|class|href|src|title)\s*=\s*(?:&quot;|::quot)/i, name: "Corrupted attribute prefix" }
  ];

  for (const file of filesToScan) {
    const content = fs.readFileSync(path.join(ROOT, file), "utf8");
    for (const { pattern, name } of corruptPatterns) {
      const match = content.match(pattern);
      assert.equal(
        match,
        null,
        `File ${file} contains forbidden corrupt pattern '${name}': ${match ? match[0] : ""}`
      );
    }
  }
});

test("R2.2 Canonical Breakdown Hydration in curriculumLessonBreakdown across all 373 lessons", () => {
  const ctx = createEngineContext();
  const breakdownFn = ctx.curriculumLessonBreakdown;
  assert.equal(typeof breakdownFn, "function", "curriculumLessonBreakdown must be a function");

  const trackFiles = ["html-lessons.json", "css-lessons.json", "js-lessons.json", "angular-lessons.json"];
  let totalLessonsChecked = 0;
  let totalBreakdownsChecked = 0;

  for (const trackFile of trackFiles) {
    const trackData = JSON.parse(fs.readFileSync(path.join(ROOT, trackFile), "utf8"));
    for (const lesson of trackData.lessons) {
      totalLessonsChecked++;
      const breakdown = breakdownFn(lesson);
      assert.ok(Array.isArray(breakdown), `Lesson ${lesson.id} breakdown must be an array`);

      for (const item of breakdown) {
        totalBreakdownsChecked++;
        assert.ok(typeof item.title === "string" && item.title.length > 0, `${lesson.id} item.title must be non-empty`);
        assert.ok(typeof item.flow === "string" && item.flow.length > 0, `${lesson.id} item.flow must be non-empty`);
        assert.ok(typeof item.note === "string" && item.note.length > 0, `${lesson.id} item.note must be non-empty`);
        assert.ok(typeof item.meaning === "string" && item.meaning.length > 0, `${lesson.id} item.meaning must be non-empty`);
        assert.ok(typeof item.benefit === "string" && item.benefit.length > 0, `${lesson.id} item.benefit must be non-empty`);

        // If code was extracted, meaning should NOT retain the leading colon
        if (item.code) {
          assert.equal(item.meaning.startsWith(":"), false, `${lesson.id} meaning must not start with colon`);
          assert.doesNotMatch(item.benefit, /::quot/, `${lesson.id} benefit must not have stacked ::quot`);
        }
      }
    }
  }

  assert.equal(totalLessonsChecked, 373, "Must verify all 373 lessons");
  assert.ok(totalBreakdownsChecked > 1000, `Must verify > 1000 breakdown items (got ${totalBreakdownsChecked})`);

  // Verify backward compatibility with legacy structured object:
  const legacyLesson = {
    breakdown: [
      { code: 'href="#about"', meaning: "href اسم الخاصية، و#about القيمة." },
      { code: 'lang="ar"', meaning: "يعلن لغة محتوى الصفحة." }
    ]
  };
  const hydratedLegacy = breakdownFn(legacyLesson);
  assert.equal(hydratedLegacy[0].code, 'href="#about"');
  assert.equal(hydratedLegacy[0].meaning, "href اسم الخاصية، و#about القيمة.");
  assert.equal(hydratedLegacy[1].code, 'lang="ar"');
});

test("R2.3 lessonMixedMarkup runtime integrity: clean LTR isolation and no double escaping", () => {
  const ctx = createEngineContext();
  const markup = ctx.lessonMixedMarkup;

  // 1. Quoted attributes in mixed Arabic/English
  const attr1 = markup('id="about": اسم يميز عنصرًا في الصفحة');
  assert.match(attr1, /<code dir="ltr" class="inline-code">id=&quot;about&quot;<\/code>/);
  assert.doesNotMatch(attr1, /&amp;quot;/);
  assert.doesNotMatch(attr1, /;\s*quot/);

  const attr2 = markup('lang="ar": يعلن لغة محتوى الصفحة');
  assert.match(attr2, /<code dir="ltr" class="inline-code">lang=&quot;ar&quot;<\/code>/);
  assert.doesNotMatch(attr2, /;\s*quot/);

  // 2. Already pre-escaped attribute should not double-escape into &amp;quot;
  const preEscaped = markup('lang=&quot;ar&quot; لتعريف لغة الصفحة');
  assert.match(preEscaped, /<code dir="ltr" class="inline-code">lang=&quot;ar&quot;<\/code>/);
  assert.doesNotMatch(preEscaped, /&amp;quot;/);

  // 3. Legitimate HTML Entities in Lesson 36 (HTML entities)
  const entityLt = markup('&lt; لعلامة الأصغر من');
  assert.match(entityLt, /<code dir="ltr" class="inline-code">&lt;<\/code>/);
  assert.doesNotMatch(entityLt, /&amp;lt;/);

  const entityGt = markup('&gt; لعلامة الأكبر من');
  assert.match(entityGt, /<code dir="ltr" class="inline-code">&gt;<\/code>/);
  assert.doesNotMatch(entityGt, /&amp;gt;/);

  const entityAmp = markup('&amp; لرمز الفاصلة اللاتينية');
  assert.match(entityAmp, /<code dir="ltr" class="inline-code">&amp;<\/code>/);
  assert.doesNotMatch(entityAmp, /&amp;amp;/);

  // 4. HTML tags
  const tagMarkup = markup('وسم <h1> يحدد العنوان الرئيسي');
  assert.match(tagMarkup, /<bdi dir="ltr">&lt;h1&gt;<\/bdi>/);
});

test("R2.4 Bulk Lesson Text Rendering Smoke Test across all 373 lessons", () => {
  const ctx = createEngineContext();
  const markup = ctx.lessonMixedMarkup;
  const trackFiles = ["html-lessons.json", "css-lessons.json", "js-lessons.json", "angular-lessons.json"];

  let stringsTested = 0;

  for (const trackFile of trackFiles) {
    const trackData = JSON.parse(fs.readFileSync(path.join(ROOT, trackFile), "utf8"));
    for (const lesson of trackData.lessons) {
      const candidates = [
        lesson.concept,
        lesson.whyUse,
        lesson.task,
        lesson.objective,
        lesson.instruction,
        lesson.flow
      ];

      if (Array.isArray(lesson.breakdown)) {
        candidates.push(...lesson.breakdown);
      }
      if (Array.isArray(lesson.steps)) {
        for (const step of lesson.steps) {
          candidates.push(step.explanation, step.task, step.benefit, step.objective);
        }
      }

      for (const str of candidates) {
        if (!str || typeof str !== "string") continue;
        stringsTested++;
        const rendered = markup(str);

        // Assert no corrupt artifacts in rendered markup
        assert.doesNotMatch(
          rendered,
          /;\s*quot\s*&/i,
          `Corrupt reversed entity found in rendered string for lesson ${lesson.id}`
        );
        assert.doesNotMatch(
          rendered,
          /::quot/i,
          `Stacked colons ::quot found in rendered string for lesson ${lesson.id}`
        );
        assert.doesNotMatch(
          rendered,
          /&amp;quot;/i,
          `Double-escaped quote &amp;quot; found in rendered string for lesson ${lesson.id}`
        );
        assert.doesNotMatch(
          rendered,
          /ar\s*;\s*quot\s*&=\s*lang/i,
          `Inverted attribute string found in rendered string for lesson ${lesson.id}`
        );
      }
    }
  }

  assert.ok(stringsTested > 2000, `Bulk smoke test must check > 2000 strings (got ${stringsTested})`);
});

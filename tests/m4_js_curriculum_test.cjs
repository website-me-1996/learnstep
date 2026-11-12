/**
 * tests/m4_js_curriculum_test.cjs
 *
 * Dedicated verification suite for Milestone 4: JavaScript Curriculum Modularization & Content.
 * Tests all 119 lessons across 23 skills, schema conformance, dual-compatibility,
 * 4-tier progressive hints, Tier 4 solution reveals, Tier 2 Arabic questions (؟),
 * balanced bugRepair distribution, JS regex error rules, and SmartHintEngine pass rates.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const validator = require("../validate-curriculum-json.cjs");

const JS_JSON_PATH = path.resolve(__dirname, "..", "js-lessons.json");
const JS_CHUNKS_DIR = path.resolve(__dirname, "..", "curriculum", "js");

test("M4 JS Curriculum: file exists and passes canonical validator with 119 lessons", () => {
  assert.ok(fs.existsSync(JS_JSON_PATH), "js-lessons.json must exist at project root");
  const res = validator.validateCurriculumFile(JS_JSON_PATH);
  assert.equal(res.valid, true, `Validation failed: ${res.errors.join("; ")}`);
  assert.equal(res.lessonCount, 119, "Must contain exactly 119 lessons");
});

test("M4 JS Curriculum: root schema and metadata conformance", () => {
  const content = fs.readFileSync(JS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  assert.equal(data.schemaVersion, "1.0.0");
  assert.equal(data.track, "js");
  assert.match(data.title, /JavaScript/i);
  assert.equal(data.totalLessons, 119);
  assert.equal(data.lessons.length, 119);
});

test("M4 JS Curriculum: all 119 lessons have complete 13 canonical fields and rich Arabic copy", () => {
  const content = fs.readFileSync(JS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  const seenIds = new Set();
  const seenLegacyIds = new Set();
  const seenOrders = new Set();

  data.lessons.forEach((lesson, idx) => {
    assert.equal(lesson.order, idx, `Lesson at index ${idx} must have order ${idx}`);
    assert.equal(lesson.legacyId, `js:${idx}`, `Lesson at index ${idx} must have legacyId js:${idx}`);
    assert.match(lesson.id, /^js-\d{2,3}-/, `Lesson id '${lesson.id}' must follow slug pattern`);

    assert.ok(!seenIds.has(lesson.id), `Duplicate id ${lesson.id}`);
    assert.ok(!seenLegacyIds.has(lesson.legacyId), `Duplicate legacyId ${lesson.legacyId}`);
    assert.ok(!seenOrders.has(lesson.order), `Duplicate order ${lesson.order}`);

    seenIds.add(lesson.id);
    seenLegacyIds.add(lesson.legacyId);
    seenOrders.add(lesson.order);

    // Deep Arabic copy assertions
    assert.ok(lesson.title && lesson.title.length >= 3, `${lesson.id}: title is required`);
    assert.ok(lesson.skill && lesson.skill.length >= 3, `${lesson.id}: skill is required`);
    assert.ok(lesson.concept && lesson.concept.length >= 50, `${lesson.id}: concept must be deep Arabic text (>=50 chars)`);
    assert.ok(lesson.whyUse && lesson.whyUse.length >= 50, `${lesson.id}: whyUse must be deep Arabic text (>=50 chars)`);
    assert.ok(lesson.browserMechanics && lesson.browserMechanics.length >= 50, `${lesson.id}: browserMechanics must be deep (>=50 chars)`);
    assert.match(lesson.documentationUrl, /^https?:\/\//, `${lesson.id}: documentationUrl must be valid URL`);

    // Code & Breakdown
    assert.ok(lesson.code && lesson.code.length >= 10, `${lesson.id}: code is required`);
    assert.ok(Array.isArray(lesson.breakdown) && lesson.breakdown.length >= 3, `${lesson.id}: breakdown >= 3 items`);

    // Steps
    assert.ok(Array.isArray(lesson.steps) && lesson.steps.length === 3, `${lesson.id}: exactly 3 steps`);
    lesson.steps.forEach((step, sIdx) => {
      assert.ok(step.id, `${lesson.id} step ${sIdx}: id required`);
      assert.ok(step.title, `${lesson.id} step ${sIdx}: title required`);
      assert.ok(step.objective, `${lesson.id} step ${sIdx}: objective required`);
      assert.ok(step.instruction, `${lesson.id} step ${sIdx}: instruction required`);
      assert.ok(step.benefit, `${lesson.id} step ${sIdx}: benefit required`);
      assert.ok(Array.isArray(step.errorRules) && step.errorRules.length >= 2, `${lesson.id} step ${sIdx}: at least 2 errorRules`);
      assert.ok(Array.isArray(step.hints) && step.hints.length === 4, `${lesson.id} step ${sIdx}: exactly 4 hint tiers`);

      // Tier 1 safeguard
      const tier1 = step.hints[0];
      const solution = step.to || step.expectedLine || "";
      if (solution && solution.length > 5) {
        assert.notEqual(tier1.trim(), solution.trim(), `${lesson.id} step ${sIdx}: Tier 1 leaked solution`);
      }
    });

    // BugRepair
    assert.ok(lesson.bugRepair, `${lesson.id}: bugRepair required`);
    assert.ok(lesson.bugRepair.brokenCode, `${lesson.id}: bugRepair.brokenCode required`);
    assert.ok(lesson.bugRepair.fixedCode, `${lesson.id}: bugRepair.fixedCode required`);
    assert.ok(lesson.bugRepair.question, `${lesson.id}: bugRepair.question required`);
    assert.ok(lesson.bugRepair.explanation, `${lesson.id}: bugRepair.explanation required`);
    assert.ok(Array.isArray(lesson.bugRepair.options) && lesson.bugRepair.options.length >= 4, `${lesson.id}: >=4 bugRepair options`);
    assert.ok(lesson.bugRepair.correctOptionIndex >= 0 && lesson.bugRepair.correctOptionIndex < lesson.bugRepair.options.length);
  });
});

test("M4 JS Curriculum: dual-compatibility with buildCoursePracticeSteps in app.js", () => {
  const lessonsDataSrc = fs.readFileSync(path.join(__dirname, "..", "lessons-data.js"), "utf8");
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const jsData = JSON.parse(fs.readFileSync(JS_JSON_PATH, "utf8"));

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(lessonsDataSrc, context);

  function sourceBetween(src, startStr, endStr) {
    const i = src.indexOf(startStr);
    const j = src.indexOf(endStr, i);
    if (i < 0 || j < 0) throw new Error("Missing fragment: " + startStr);
    return src.slice(i, j);
  }

  vm.runInContext(sourceBetween(appSrc, "  function coursePracticeAlternates(key, spec) {", "  function coursePracticeStepFor(model) {"), context);

  const H = context.window.LESSONS_DATA.courseHelpers;
  const legacyTopics = context.window.LESSONS_DATA.js;

  jsData.lessons.forEach((lesson, idx) => {
    const topic = legacyTopics[idx];
    const spec = H.jsLessonSpec(topic, idx);
    const steps = context.buildCoursePracticeSteps("js", spec, lesson.code);

    assert.ok(steps.length >= 1, `${lesson.id}: must generate at least 1 practice step in app.js`);
    steps.forEach((st, sIdx) => {
      assert.equal(st.valid, true, `${lesson.id} step ${sIdx + 1}: substitution must be valid`);
      assert.notEqual(st.after, st.before, `${lesson.id} step ${sIdx + 1}: code must change after edit`);
      assert.ok(st.task.length >= 10, `${lesson.id} step ${sIdx + 1}: task instruction text present`);
    });
  });
});

test("M4 JS Curriculum: 23 modular chunks exist in curriculum/js/ and match lesson count (119)", () => {
  const { SKILL_FILES } = require("../compile-js-curriculum.cjs");
  assert.equal(SKILL_FILES.length, 23, "Must have exactly 23 skill chunk files");

  let totalChunkLessons = 0;
  SKILL_FILES.forEach((file) => {
    const p = path.join(JS_CHUNKS_DIR, file);
    assert.ok(fs.existsSync(p), `Chunk file ${file} exists`);
    const lessons = JSON.parse(fs.readFileSync(p, "utf8"));
    assert.ok(Array.isArray(lessons), `${file} contains an array`);
    totalChunkLessons += lessons.length;
  });

  assert.equal(totalChunkLessons, 119, "Total lessons across 23 chunks must equal 119");
});

test("M4 JS Curriculum: all 357 steps have exact Tier 4 solution reveal matching step.to and actionable Tier 3", () => {
  const content = fs.readFileSync(JS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  let stepCount = 0;
  data.lessons.forEach((lesson) => {
    lesson.steps.forEach((step, sIdx) => {
      stepCount++;
      const target = (step.to || step.expectedLine || "").trim();
      assert.ok(target.length > 0, `${lesson.id} step ${sIdx}: target solution code must exist`);

      // Tier 4 exact match
      const tier4 = (step.hints[3] || "").trim();
      assert.ok(
        tier4.includes(target),
        `${lesson.id} step ${sIdx}: Tier 4 hint ('${tier4}') must contain exact target '${target}'`
      );

      // Tier 3 actionable direction
      const tier3 = (step.hints[2] || "").trim();
      assert.ok(
        tier3.includes(target),
        `${lesson.id} step ${sIdx}: Tier 3 hint ('${tier3}') must direct student with target '${target}'`
      );
    });
  });

  assert.equal(stepCount, 357, "Must verify all 357 steps across 119 lessons");
});

test("M4 JS Curriculum: all 357 steps have Tier 2 conceptual rule with Arabic guiding question ending with '؟'", () => {
  const content = fs.readFileSync(JS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  let stepCount = 0;
  data.lessons.forEach((lesson) => {
    lesson.steps.forEach((step, sIdx) => {
      stepCount++;
      const tier2 = (step.hints[1] || "").trim();
      assert.ok(
        tier2.includes("؟"),
        `${lesson.id} step ${sIdx}: Tier 2 hint ('${tier2}') must include an Arabic guiding question ending with '؟'`
      );
      assert.ok(
        tier2.length >= 25,
        `${lesson.id} step ${sIdx}: Tier 2 hint must be a detailed conceptual rule`
      );
    });
  });

  assert.equal(stepCount, 357, "Must verify all 357 Tier 2 hints across 119 lessons");
});

test("M4 JS Curriculum: bugRepair.correctOptionIndex is realistically diversified across options (0, 1, 2, 3)", () => {
  const content = fs.readFileSync(JS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  const indexCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
  data.lessons.forEach((lesson) => {
    const rep = lesson.bugRepair;
    assert.ok(rep, `${lesson.id}: bugRepair object required`);
    const idx = rep.correctOptionIndex;
    assert.ok(idx >= 0 && idx < rep.options.length, `${lesson.id}: valid index range`);
    indexCounts[idx] = (indexCounts[idx] || 0) + 1;

    // Verify option text at correctOptionIndex is a meaningful non-empty string
    const correctOptionText = rep.options[idx];
    assert.ok(correctOptionText && correctOptionText.length >= 10, `${lesson.id}: correct option text must be valid`);
  });

  // Verify that every index 0..3 has substantial representation (at least 20 lessons each out of 119)
  for (let i = 0; i < 4; i++) {
    assert.ok(
      indexCounts[i] >= 20,
      `Index ${i} must have at least 20 lessons, got ${indexCounts[i]}`
    );
  }
});

test("M4 JS Curriculum: JS regex error rules catch broken statements and pass clean ones", () => {
  const { JS_RULES } = require("../curriculum/js/rules_catalog.cjs");

  // 1. Single equals in condition
  const singleEqRe = new RegExp(JS_RULES.singleEqualsInCondition.pattern, JS_RULES.singleEqualsInCondition.flags);
  assert.equal(singleEqRe.test("if (count = 5) { console.log(count); }"), true, "Single equals in if must be flagged");
  assert.equal(singleEqRe.test("if (count === 5) { console.log(count); }"), false, "Triple equals in if must not be flagged");
  assert.equal(singleEqRe.test("if (count == 5) { console.log(count); }"), false, "Double equals in if must not be flagged");
  assert.equal(singleEqRe.test("if (count !== 5) { console.log(count); }"), false, "Not equals in if must not be flagged");

  // 2. Semicolon after if condition
  const semiIfRe = new RegExp(JS_RULES.semiColonAfterIfCondition.pattern, JS_RULES.semiColonAfterIfCondition.flags);
  assert.equal(semiIfRe.test("if (x > 10); { console.log(x); }"), true, "Semicolon after if must be flagged");
  assert.equal(semiIfRe.test("if (x > 10) { console.log(x); }"), false, "Clean if must not be flagged");

  // 3. Typo in console.log
  const consoleTypoRe = new RegExp(JS_RULES.consoleLogTypo.pattern, JS_RULES.consoleLogTypo.flags);
  assert.equal(consoleTypoRe.test("consol.log('Hello');"), true, "consol.log typo must be flagged");
  assert.equal(consoleTypoRe.test("conosle.log('Hello');"), true, "conosle.log typo must be flagged");
  assert.equal(consoleTypoRe.test("console.log('Hello');"), false, "console.log must not be flagged");

  // 4. Print instead of console.log
  const printTypoRe = new RegExp(JS_RULES.consolePrintTypo.pattern, JS_RULES.consolePrintTypo.flags);
  assert.equal(printTypoRe.test("console.print('data');"), true, "console.print must be flagged");
  assert.equal(printTypoRe.test("print('data');"), true, "print('data') must be flagged");
  assert.equal(printTypoRe.test("console.log('data');"), false, "console.log must not be flagged");

  // 5. Typo in function keyword
  const funcTypoRe = new RegExp(JS_RULES.functionKeywordTypo.pattern, JS_RULES.functionKeywordTypo.flags);
  assert.equal(funcTypoRe.test("funtion add(a, b) { return a + b; }"), true, "funtion must be flagged");
  assert.equal(funcTypoRe.test("funciton add(a, b) { return a + b; }"), true, "funciton must be flagged");
  assert.equal(funcTypoRe.test("function add(a, b) { return a + b; }"), false, "function must not be flagged");

  // 6. Typo in const keyword
  const constTypoRe = new RegExp(JS_RULES.constKeywordTypo.pattern, JS_RULES.constKeywordTypo.flags);
  assert.equal(constTypoRe.test("cosnt score = 10;"), true, "cosnt must be flagged");
  assert.equal(constTypoRe.test("const score = 10;"), false, "const must not be flagged");

  // 7. Const without initializer
  const constNoInitRe = new RegExp(JS_RULES.constWithoutInit.pattern, JS_RULES.constWithoutInit.flags);
  assert.equal(constNoInitRe.test("const total;"), true, "const total; without init must be flagged");
  assert.equal(constNoInitRe.test("const total = 100;"), false, "const total = 100; must not be flagged");

  // 8. NaN direct comparison
  const nanRe = new RegExp(JS_RULES.nanDirectComparison.pattern, JS_RULES.nanDirectComparison.flags);
  assert.equal(nanRe.test("if (val === NaN)"), true, "=== NaN comparison must be flagged");
  assert.equal(nanRe.test("if (NaN == val)"), true, "NaN == val comparison must be flagged");
  assert.equal(nanRe.test("if (Number.isNaN(val))"), false, "Number.isNaN must not be flagged");
});

test("M4 JS Curriculum: learner applying Tier 4 solution passes SmartHintEngine across all 357 steps", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const jsData = JSON.parse(fs.readFileSync(JS_JSON_PATH, "utf8"));

  const context = {
    window: {},
    growth: { completed: [], drafts: {}, stepAttempts: {} },
    missingBuildLine(code, build) {
      return code.includes(build.line) ? "" : build.line;
    },
    checkHtmlTags() { return { valid: true, errors: [] }; },
    normalizeDoc(c) { return String(c || "").trim(); },
    normalizeCodeLine(c) { return String(c || "").trim(); }
  };
  vm.createContext(context);

  function sourceBetween(a, b) {
    const s = appSrc.indexOf(a), e = appSrc.indexOf(b, s);
    return appSrc.slice(s, e);
  }

  // Load SmartHintEngine from app.js
  vm.runInContext(sourceBetween("  var SmartHintEngine = {", "  function validateLessonAnswer("), context);

  let totalEvaluated = 0;
  jsData.lessons.forEach((lesson) => {
    let currentCode = lesson.code;

    lesson.steps.forEach((step, sIdx) => {
      totalEvaluated++;
      const targetSolution = (step.to || step.expectedLine || "").trim();
      assert.ok(targetSolution.length > 0, `${lesson.id} step ${sIdx}: target solution code required`);

      // 1. Verify Tier 4 contains targetSolution
      assert.ok(
        step.hints[3].includes(targetSolution),
        `${lesson.id} step ${sIdx}: Tier 4 hint must contain '${targetSolution}'`
      );

      const beforeCode = currentCode;
      // 2. Perform replacement from -> to on currentCode
      if (step.from && currentCode.includes(step.from)) {
        currentCode = currentCode.replace(step.from, step.to);
      } else if (step.expectedLine && !currentCode.includes(step.expectedLine)) {
        currentCode += "\n" + step.expectedLine;
      }

      const runtimeStep = {
        type: step.type || "edit",
        from: step.from,
        to: step.to,
        expectedLine: step.expectedLine,
        before: beforeCode,
        after: currentCode,
        hints: step.hints,
        errorRules: step.errorRules
      };

      // 3. Evaluate when learner applies the target code
      const evalResult = context.SmartHintEngine.evaluate(currentCode, runtimeStep, { key: "js" }, 4);
      assert.equal(
        evalResult.passed,
        true,
        `${lesson.id} step ${sIdx}: SmartHintEngine must pass when learner applies Tier 4 solution. Message: ${evalResult.message}`
      );
    });
  });

  assert.equal(totalEvaluated, 357, "Must evaluate all 357 steps");
});

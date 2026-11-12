/**
 * tests/m3_css_curriculum_test.cjs
 *
 * Dedicated verification suite for Milestone 3: CSS Curriculum Modularization & Content.
 * Tests all 94 lessons across 23 skills, schema conformance, dual-compatibility,
 * 4-tier progressive hints, Tier 4 solution reveals, Tier 2 Arabic questions (؟),
 * balanced bugRepair distribution, CSS regex error rules, and SmartHintEngine pass rates.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const validator = require("../validate-curriculum-json.cjs");

const CSS_JSON_PATH = path.resolve(__dirname, "..", "css-lessons.json");
const CSS_CHUNKS_DIR = path.resolve(__dirname, "..", "curriculum", "css");

test("M3 CSS Curriculum: file exists and passes canonical validator with 94 lessons", () => {
  assert.ok(fs.existsSync(CSS_JSON_PATH), "css-lessons.json must exist at project root");
  const res = validator.validateCurriculumFile(CSS_JSON_PATH);
  assert.equal(res.valid, true, `Validation failed: ${res.errors.join("; ")}`);
  assert.equal(res.lessonCount, 94, "Must contain exactly 94 lessons");
});

test("M3 CSS Curriculum: root schema and metadata conformance", () => {
  const content = fs.readFileSync(CSS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  assert.equal(data.schemaVersion, "1.0.0");
  assert.equal(data.track, "css");
  assert.match(data.title, /CSS/i);
  assert.equal(data.totalLessons, 94);
  assert.equal(data.lessons.length, 94);
});

test("M3 CSS Curriculum: all 94 lessons have complete 13 canonical fields and rich Arabic copy", () => {
  const content = fs.readFileSync(CSS_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  const seenIds = new Set();
  const seenLegacyIds = new Set();
  const seenOrders = new Set();

  data.lessons.forEach((lesson, idx) => {
    assert.equal(lesson.order, idx, `Lesson at index ${idx} must have order ${idx}`);
    assert.equal(lesson.legacyId, `css:${idx}`, `Lesson at index ${idx} must have legacyId css:${idx}`);
    assert.match(lesson.id, /^css-\d{2}-/, `Lesson id '${lesson.id}' must follow slug pattern`);

    assert.ok(!seenIds.has(lesson.id), `Duplicate id ${lesson.id}`);
    assert.ok(!seenLegacyIds.has(lesson.legacyId), `Duplicate legacyId ${lesson.legacyId}`);
    assert.ok(!seenOrders.has(lesson.order), `Duplicate order ${lesson.order}`);

    seenIds.add(lesson.id);
    seenLegacyIds.add(lesson.legacyId);
    seenOrders.add(lesson.order);

    // Deep Arabic copy assertions
    assert.ok(lesson.title && lesson.title.length >= 5, `${lesson.id}: title is required`);
    assert.ok(lesson.skill && lesson.skill.length >= 3, `${lesson.id}: skill is required`);
    assert.ok(lesson.concept && lesson.concept.length >= 50, `${lesson.id}: concept must be deep Arabic text (>=50 chars)`);
    assert.ok(lesson.whyUse && lesson.whyUse.length >= 50, `${lesson.id}: whyUse must be deep Arabic text (>=50 chars)`);
    assert.ok(lesson.browserMechanics && lesson.browserMechanics.length >= 50, `${lesson.id}: browserMechanics must be deep (>=50 chars)`);
    assert.match(lesson.documentationUrl, /^https?:\/\//, `${lesson.id}: documentationUrl must be valid URL`);

    // Code & Breakdown
    assert.ok(lesson.code && lesson.code.length >= 20, `${lesson.id}: code is required`);
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

test("M3 CSS Curriculum: dual-compatibility with buildGuidePracticeSteps sequential edits", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const cssData = JSON.parse(fs.readFileSync(CSS_JSON_PATH, "utf8"));

  const context = { window: {} };
  vm.createContext(context);
  function sourceBetween(a, b) {
    const s = appSrc.indexOf(a), e = appSrc.indexOf(b, s);
    return appSrc.slice(s, e);
  }
  vm.runInContext(sourceBetween("  function buildGuidePracticeSteps(code, guide) {", "  function fullHtmlDocument("), context);

  cssData.lessons.forEach((lesson) => {
    const steps = context.buildGuidePracticeSteps(lesson.code, lesson);
    assert.equal(steps.length, 3, `${lesson.id}: must generate 3 practice steps`);
    steps.forEach((st, sIdx) => {
      assert.equal(st.valid, true, `${lesson.id} step ${sIdx + 1}: substitution must be valid`);
      assert.notEqual(st.after, st.before, `${lesson.id} step ${sIdx + 1}: code must change after edit`);
      assert.ok(st.task.length >= 10, `${lesson.id} step ${sIdx + 1}: task instruction text present`);
    });
  });
});

test("M3 CSS Curriculum: 23 modular chunks exist in curriculum/css/ and match lesson count (94)", () => {
  const { SKILL_FILES } = require("../compile-css-curriculum.cjs");
  assert.equal(SKILL_FILES.length, 23, "Must have exactly 23 skill chunk files");

  let totalChunkLessons = 0;
  SKILL_FILES.forEach((file) => {
    const p = path.join(CSS_CHUNKS_DIR, file);
    assert.ok(fs.existsSync(p), `Chunk file ${file} exists`);
    const lessons = JSON.parse(fs.readFileSync(p, "utf8"));
    assert.ok(Array.isArray(lessons), `${file} contains an array`);
    totalChunkLessons += lessons.length;
  });

  assert.equal(totalChunkLessons, 94, "Total lessons across 23 chunks must equal 94");
});

test("M3 CSS Curriculum: all 282 steps have exact Tier 4 solution reveal matching step.to and actionable Tier 3", () => {
  const content = fs.readFileSync(CSS_JSON_PATH, "utf8");
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

  assert.equal(stepCount, 282, "Must verify all 282 steps across 94 lessons");
});

test("M3 CSS Curriculum: all 282 steps have Tier 2 conceptual rule with Arabic guiding question ending with '؟'", () => {
  const content = fs.readFileSync(CSS_JSON_PATH, "utf8");
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

  assert.equal(stepCount, 282, "Must verify all 282 Tier 2 hints across 94 lessons");
});

test("M3 CSS Curriculum: bugRepair.correctOptionIndex is realistically diversified across options (0, 1, 2, 3)", () => {
  const content = fs.readFileSync(CSS_JSON_PATH, "utf8");
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

  // Verify that every index 0..3 has substantial representation (at least 20 lessons each out of 94)
  for (let i = 0; i < 4; i++) {
    assert.ok(
      indexCounts[i] >= 20,
      `Index ${i} must have at least 20 lessons, got ${indexCounts[i]}`
    );
  }
});

test("M3 CSS Curriculum: CSS regex error rules catch broken declarations and pass clean ones", () => {
  const { CSS_RULES } = require("../curriculum/css/rules_catalog.cjs");

  // 1. Missing semicolon
  const semiRe = new RegExp(CSS_RULES.missingSemicolon.pattern, CSS_RULES.missingSemicolon.flags);
  assert.equal(semiRe.test("color: red\n  font-size: 16px;"), true, "Missing semicolon must be flagged");
  assert.equal(semiRe.test("color: red;\n  font-size: 16px;"), false, "Proper semicolons must not be flagged");

  // 2. Missing unit
  const unitRe = new RegExp(CSS_RULES.missingUnit.pattern, CSS_RULES.missingUnit.flags);
  assert.equal(unitRe.test("margin: 20;"), true, "Bare 20 in margin must be flagged");
  assert.equal(unitRe.test("padding: 15;"), true, "Bare 15 in padding must be flagged");
  assert.equal(unitRe.test("margin: 10 20px;"), true, "Leading bare number in margin: 10 20px must be flagged");
  assert.equal(unitRe.test("margin: 10px 20;"), true, "Trailing bare number in margin: 10px 20 must be flagged");
  assert.equal(unitRe.test("margin: 20px;"), false, "20px in margin must not be flagged");
  assert.equal(unitRe.test("margin: 10px 20px;"), false, "10px 20px in margin must not be flagged");
  assert.equal(unitRe.test("margin: 0;"), false, "Zero margin must not be flagged");
  assert.equal(unitRe.test("margin: 0 auto;"), false, "0 auto margin must not be flagged");
  assert.equal(unitRe.test("line-height: 1.5;"), false, "Unitless line-height must not be flagged");
  assert.equal(unitRe.test("z-index: 10;"), false, "Unitless z-index must not be flagged");
  assert.equal(unitRe.test("opacity: 0.5;"), false, "Unitless opacity must not be flagged");

  // 3. Typo in color property (zero false positives on background-color)
  const typoRe = new RegExp(CSS_RULES.typoCollor.pattern, CSS_RULES.typoCollor.flags);
  assert.equal(typoRe.test("collor: red;"), true, "Typo collor must be flagged");
  assert.equal(typoRe.test("colour: red;"), true, "Typo colour must be flagged");
  assert.equal(typoRe.test("background-colour: #eaf3e9;"), true, "Typo background-colour must be flagged");
  assert.equal(typoRe.test("color: red;"), false, "Correct color must not be flagged");
  assert.equal(typoRe.test("background-color: #eaf3e9;"), false, "Standard valid background-color must NEVER be flagged as typo");

  // 4. Space in pseudo-class (handles elements, classes, and IDs)
  const pseudoRe = new RegExp(CSS_RULES.pseudoClassSpace.pattern, CSS_RULES.pseudoClassSpace.flags);
  assert.equal(pseudoRe.test("button: hover { color: red; }"), true, "Space before hover must be flagged");
  assert.equal(pseudoRe.test(".btn :hover"), true, ".btn :hover must be flagged");
  assert.equal(pseudoRe.test("#submit :focus"), true, "#submit :focus must be flagged");
  assert.equal(pseudoRe.test("button:hover { color: red; }"), false, "No space before hover must not be flagged");
  assert.equal(pseudoRe.test(".btn:hover"), false, ".btn:hover without space must not be flagged");
  assert.equal(pseudoRe.test("#submit:focus"), false, "#submit:focus without space must not be flagged");

  // 5. Conflicting flex and float
  const flexFloatRe = new RegExp(CSS_RULES.conflictingFlexFloat.pattern, CSS_RULES.conflictingFlexFloat.flags);
  assert.equal(flexFloatRe.test("display: flex;\n  float: left;"), true, "Conflicting flex and float must be flagged");
  assert.equal(flexFloatRe.test("display: flex;\n  justify-content: center;"), false, "Clean flex declaration must not be flagged");

  // 6. z-index on static positioning
  const zStaticRe = new RegExp(CSS_RULES.zIndexStatic.pattern, CSS_RULES.zIndexStatic.flags);
  assert.equal(zStaticRe.test("position: static;\n  z-index: 10;"), true, "z-index with static must be flagged");
  assert.equal(zStaticRe.test("position: relative;\n  z-index: 10;"), false, "z-index with relative must not be flagged");
});

test("M3 CSS Curriculum: learner applying Tier 4 solution passes SmartHintEngine across all 282 steps", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const cssData = JSON.parse(fs.readFileSync(CSS_JSON_PATH, "utf8"));

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

  // Load buildGuidePracticeSteps & SmartHintEngine from app.js
  vm.runInContext(sourceBetween("  function buildGuidePracticeSteps(code, guide) {", "  function fullHtmlDocument("), context);
  vm.runInContext(sourceBetween("  var SmartHintEngine = {", "  function validateLessonAnswer("), context);

  let totalEvaluated = 0;
  cssData.lessons.forEach((lesson) => {
    const practiceSteps = context.buildGuidePracticeSteps(lesson.code, lesson);
    assert.equal(practiceSteps.length, 3, `${lesson.id}: 3 practice steps generated`);

    lesson.steps.forEach((canonicalStep, sIdx) => {
      totalEvaluated++;
      const pStep = practiceSteps[sIdx];
      assert.equal(pStep.valid, true, `${lesson.id} step ${sIdx}: substitution is valid`);

      // 1. Verify Tier 4 contains canonical step.to / expectedLine
      const targetSolution = (canonicalStep.to || canonicalStep.expectedLine || "").trim();
      assert.ok(
        canonicalStep.hints[3].includes(targetSolution),
        `${lesson.id} step ${sIdx}: Tier 4 hint must contain '${targetSolution}'`
      );

      // 2. Merge hints and errorRules onto runtime practice step
      const runtimeStep = {
        ...pStep,
        type: "edit",
        hints: canonicalStep.hints,
        errorRules: canonicalStep.errorRules
      };

      // 3. Evaluate when learner applies the target code (step.after)
      const evalResult = context.SmartHintEngine.evaluate(pStep.after, runtimeStep, { key: "css" }, 4);
      assert.equal(
        evalResult.passed,
        true,
        `${lesson.id} step ${sIdx}: SmartHintEngine must pass when learner applies Tier 4 solution. Message: ${evalResult.message}`
      );
    });
  });

  assert.equal(totalEvaluated, 282, "Must evaluate all 282 steps");
});

test("M3 Remediation: explicit false-positive and false-negative precision tests for 6 CSS regex rules", () => {
  const { CSS_RULES } = require("../curriculum/css/rules_catalog.cjs");

  // Rule 1: commonPropertyTypo
  const typoRe = new RegExp(CSS_RULES.commonPropertyTypo.pattern, CSS_RULES.commonPropertyTypo.flags);
  assert.equal(typoRe.test("background-color: #eaf3e9;"), false, "background-color must not be flagged as typo");
  assert.equal(typoRe.test("background-colour: #eaf3e9;"), true, "background-colour must be flagged as typo");
  assert.equal(typoRe.test("color: #eaf3e9;"), false, "valid color must not be flagged");
  assert.equal(typoRe.test("colour: #eaf3e9;"), true, "colour typo must be flagged");
  assert.equal(typoRe.test("collor: #eaf3e9;"), true, "collor typo must be flagged");
  assert.equal(typoRe.test("widht: 100px;"), true, "widht typo must be flagged");
  assert.equal(typoRe.test("heigth: 50px;"), true, "heigth typo must be flagged");

  // Rule 2: unclosedBrace
  const braceRe = new RegExp(CSS_RULES.unclosedBrace.pattern, CSS_RULES.unclosedBrace.flags);
  assert.equal(braceRe.test(".card {\n color: red;\n}"), false, "closed multiline block must not be flagged as unclosed");
  assert.equal(braceRe.test(".card { color: red;"), true, "unclosed single-line block must be flagged");
  assert.equal(braceRe.test(".card {\n color: red;\n"), true, "unclosed multiline block must be flagged");

  // Rule 3: colonReplacedBySemicolonOrComma
  const colonRe = new RegExp(CSS_RULES.colonReplacedBySemicolonOrComma.pattern, CSS_RULES.colonReplacedBySemicolonOrComma.flags);
  assert.equal(colonRe.test("display: flex;\njustify-content: center;"), false, "valid multiline flex must not be flagged");
  assert.equal(colonRe.test("display; flex;"), true, "display; flex; must be flagged as colon replaced by semicolon");
  assert.equal(colonRe.test("display, flex;"), true, "display, flex; must be flagged as colon replaced by comma");
  assert.equal(colonRe.test("font-family: Arial, sans-serif;"), false, "font-family commas must not be flagged");
  assert.equal(colonRe.test("transition: opacity 0.3s ease, transform 0.3s ease;"), false, "multi-transition commas must not be flagged");

  // Rule 4: calcMissingSpaces
  const calcRe = new RegExp(CSS_RULES.calcMissingSpaces.pattern, CSS_RULES.calcMissingSpaces.flags);
  assert.equal(calcRe.test("calc(var(--gap-size) * 2)"), false, "valid CSS variable in calc must not be flagged");
  assert.equal(calcRe.test("calc(100% - 20px)"), false, "properly spaced calc minus must not be flagged");
  assert.equal(calcRe.test("calc(100% + 20px)"), false, "properly spaced calc plus must not be flagged");
  assert.equal(calcRe.test("calc(var(--gap-size) - 20px)"), false, "spaced minus with var in calc must not be flagged");
  assert.equal(calcRe.test("calc(100%-20px)"), true, "calc(100%-20px) missing spaces must be flagged");
  assert.equal(calcRe.test("calc(100% -20px)"), true, "calc(100% -20px) missing spaces must be flagged");
  assert.equal(calcRe.test("calc(100%+20px)"), true, "calc(100%+20px) missing spaces must be flagged");
  assert.equal(calcRe.test("calc(var(--gap-size)-20px)"), true, "calc(var(--gap-size)-20px) missing spaces must be flagged");

  // Rule 5: spaceBeforePseudoClass
  const pseudoRe = new RegExp(CSS_RULES.spaceBeforePseudoClass.pattern, CSS_RULES.spaceBeforePseudoClass.flags);
  assert.equal(pseudoRe.test(".btn :hover"), true, ".btn :hover must be flagged as space before pseudo-class");
  assert.equal(pseudoRe.test("#submit :focus"), true, "#submit :focus must be flagged as space before pseudo-class");
  assert.equal(pseudoRe.test("button: hover { color: red; }"), true, "button: hover must be flagged");
  assert.equal(pseudoRe.test(".btn:hover"), false, ".btn:hover without space must not be flagged");
  assert.equal(pseudoRe.test("#submit:focus"), false, "#submit:focus without space must not be flagged");
  assert.equal(pseudoRe.test("button:hover"), false, "button:hover without space must not be flagged");

  // Rule 6: bareNumberInDimension
  const bareRe = new RegExp(CSS_RULES.bareNumberInDimension.pattern, CSS_RULES.bareNumberInDimension.flags);
  assert.equal(bareRe.test("margin: 10 20px;"), true, "leading unitless number in shorthand must be flagged");
  assert.equal(bareRe.test("margin: 10px 20;"), true, "trailing unitless number in shorthand must be flagged");
  assert.equal(bareRe.test("padding: 10 20 30 40;"), true, "unitless numbers in 4-value padding must be flagged");
  assert.equal(bareRe.test("margin: 20px;"), false, "margin: 20px; must not be flagged");
  assert.equal(bareRe.test("margin: 10px 20px;"), false, "margin: 10px 20px; must not be flagged");
  assert.equal(bareRe.test("margin: 0;"), false, "margin: 0; must not be flagged");
  assert.equal(bareRe.test("margin: 0 auto;"), false, "margin: 0 auto; must not be flagged");
  assert.equal(bareRe.test("line-height: 1.5;"), false, "unitless line-height must not be flagged");
  assert.equal(bareRe.test("z-index: 10;"), false, "unitless z-index must not be flagged");
  assert.equal(bareRe.test("opacity: 0.5;"), false, "unitless opacity must not be flagged");
});

test("M3 Remediation: SmartHintEngine does not falsely trigger commonPropertyTypo on code with background-color", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const { CSS_RULES } = require("../curriculum/css/rules_catalog.cjs");

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
  vm.runInContext(sourceBetween("  var SmartHintEngine = {", "  function validateLessonAnswer("), context);

  // Simulate learner writing incomplete code that has background-color: #eaf3e9;
  const learnerCode = ".card {\n  background-color: #eaf3e9;\n  color: ;\n}";
  const dummyStep = {
    type: "edit",
    from: "color: red;",
    to: "color: blue;",
    hints: [
      "انتبه إلى سطر خاصية اللون.",
      "قاعدة: راجع كتابة اللون. هل تحققت من القيمة؟",
      "مساعدة محددة: اكتب color: blue;.",
      "الحل النموذجي: color: blue;"
    ],
    errorRules: [CSS_RULES.missingSemicolonBetweenLines, CSS_RULES.commonPropertyTypo]
  };

  // Evaluate at tier 1
  const result = context.SmartHintEngine.evaluate(learnerCode, dummyStep, { key: "css" }, 1);
  assert.equal(result.passed, false);
  // It should NOT falsely trigger commonPropertyTypo
  assert.equal(result.ruleMatched, false, "Must not match commonPropertyTypo rule on valid background-color");
  assert.ok(!result.hintText.includes("خطأ إملائي"), "Hint text must not complain about spelling typo when background-color is used");
});

/**
 * tests/m2_html_curriculum_test.cjs
 *
 * Dedicated verification suite for Milestone 2: HTML Curriculum Modularization & Content.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const validator = require("../validate-curriculum-json.cjs");

const HTML_JSON_PATH = path.resolve(__dirname, "..", "html-lessons.json");

test("M2 HTML Curriculum: file exists and passes canonical validator with 54 lessons", () => {
  assert.ok(fs.existsSync(HTML_JSON_PATH), "html-lessons.json must exist at project root");
  const res = validator.validateCurriculumFile(HTML_JSON_PATH);
  assert.equal(res.valid, true, `Validation failed: ${res.errors.join("; ")}`);
  assert.equal(res.lessonCount, 54, "Must contain exactly 54 lessons");
});

test("M2 HTML Curriculum: root schema and metadata conformance", () => {
  const content = fs.readFileSync(HTML_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  assert.equal(data.schemaVersion, "1.0.0");
  assert.equal(data.track, "html");
  assert.match(data.title, /HTML/);
  assert.equal(data.totalLessons, 54);
  assert.equal(data.lessons.length, 54);
});

test("M2 HTML Curriculum: all 54 lessons have complete 13 canonical fields and rich Arabic copy", () => {
  const content = fs.readFileSync(HTML_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  const seenIds = new Set();
  const seenLegacyIds = new Set();
  const seenOrders = new Set();

  data.lessons.forEach((lesson, idx) => {
    assert.equal(lesson.order, idx, `Lesson at index ${idx} must have order ${idx}`);
    assert.equal(lesson.legacyId, `html:${idx}`, `Lesson at index ${idx} must have legacyId html:${idx}`);
    assert.match(lesson.id, /^html-\d{2}-/, `Lesson id '${lesson.id}' must follow slug pattern`);

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
    assert.match(lesson.code, /<!DOCTYPE html>/i, `${lesson.id}: code must have DOCTYPE`);
    assert.match(lesson.code, /<html[\s>]/i, `${lesson.id}: code must have html element`);
    assert.match(lesson.code, /<head[\s>]/i, `${lesson.id}: code must have head element`);
    assert.match(lesson.code, /<body[\s>]/i, `${lesson.id}: code must have body element`);
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
    assert.ok(Array.isArray(lesson.bugRepair.options) && lesson.bugRepair.options.length >= 3, `${lesson.id}: >=3 bugRepair options`);
    assert.ok(lesson.bugRepair.correctOptionIndex >= 0 && lesson.bugRepair.correctOptionIndex < lesson.bugRepair.options.length);
  });
});

test("M2 HTML Curriculum: dual-compatibility with buildGuidePracticeSteps sequential edits", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const htmlData = JSON.parse(fs.readFileSync(HTML_JSON_PATH, "utf8"));

  const context = { window: {} };
  vm.createContext(context);
  function sourceBetween(a, b) {
    const s = appSrc.indexOf(a), e = appSrc.indexOf(b, s);
    return appSrc.slice(s, e);
  }
  vm.runInContext(sourceBetween("  function buildGuidePracticeSteps(code, guide) {", "  function fullHtmlDocument("), context);

  htmlData.lessons.forEach((lesson) => {
    const steps = context.buildGuidePracticeSteps(lesson.code, lesson);
    assert.equal(steps.length, 3, `${lesson.id}: must generate 3 practice steps`);
    steps.forEach((st, sIdx) => {
      assert.equal(st.valid, true, `${lesson.id} step ${sIdx + 1}: substitution must be valid`);
      assert.notEqual(st.after, st.before, `${lesson.id} step ${sIdx + 1}: code must change after edit`);
      assert.ok(st.task.length >= 10, `${lesson.id} step ${sIdx + 1}: task instruction text present`);
    });
  });
});

test("M2 HTML Curriculum: 10 modular chunks exist in curriculum/html/ and match lesson count", () => {
  const dir = path.join(__dirname, "..", "curriculum", "html");
  assert.ok(fs.existsSync(dir), "curriculum/html/ directory exists");

  const chunkFiles = [
    "skill_01_page_structure.json",
    "skill_02_headings_texts.json",
    "skill_03_formatting_colors.json",
    "skill_04_links_images.json",
    "skill_05_tables_sections.json",
    "skill_06_identifiers_interactions.json",
    "skill_07_site_preparation.json",
    "skill_08_entities_encodings.json",
    "skill_09_forms_inputs.json",
    "skill_10_graphics_media.json"
  ];

  let totalChunkLessons = 0;
  chunkFiles.forEach((file) => {
    const p = path.join(dir, file);
    assert.ok(fs.existsSync(p), `Chunk file ${file} exists`);
    const lessons = JSON.parse(fs.readFileSync(p, "utf8"));
    assert.ok(Array.isArray(lessons));
    totalChunkLessons += lessons.length;
  });

  assert.equal(totalChunkLessons, 54, "Total lessons across 10 chunks must equal 54");
});

test("M2 Remediation: all 162 steps have exact Tier 4 solution reveal matching step.to and actionable Tier 3", () => {
  const content = fs.readFileSync(HTML_JSON_PATH, "utf8");
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

  assert.equal(stepCount, 162, "Must verify all 162 steps across 54 lessons");
});

test("M2 Remediation: all 162 steps have Tier 2 conceptual rule with Arabic guiding question ending with '؟'", () => {
  const content = fs.readFileSync(HTML_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  data.lessons.forEach((lesson) => {
    lesson.steps.forEach((step, sIdx) => {
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
});

test("M2 Remediation: bugRepair.correctOptionIndex is realistically diversified across options (0, 1, 2, 3)", () => {
  const content = fs.readFileSync(HTML_JSON_PATH, "utf8");
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

  // Verify that every index 0..3 has substantial representation (at least 10 lessons each out of 54)
  for (let i = 0; i < 4; i++) {
    assert.ok(
      indexCounts[i] >= 10,
      `Index ${i} must have at least 10 lessons, got ${indexCounts[i]}`
    );
  }
});

test("M2 Remediation: void element regex does not flag valid void elements like <br> while catching unclosed tags", () => {
  const { RULES } = require("../curriculum/html/rules_catalog.cjs");
  const re = new RegExp(RULES.missingClosingSlash.pattern, RULES.missingClosingSlash.flags);

  // Void elements repeated with text in between (clean HTML) must NOT match
  const validCleanSnippet = "<p>خطة الغد:<br>أكتب فكرة جديدة<br>وأراجع ما تعلمته.</p>";
  assert.equal(re.test(validCleanSnippet), false, "Valid <br>...<br> must not be flagged as unclosed");

  const validImgSnippet = "<div><img src='a.png' alt='1'> نص <img src='b.png' alt='2'></div>";
  assert.equal(re.test(validImgSnippet), false, "Valid <img>...<img> must not be flagged");

  const validHrSnippet = "<section><hr> نص بين قواطع <hr></section>";
  assert.equal(re.test(validHrSnippet), false, "Valid <hr>...<hr> must not be flagged");

  // Broken unclosed container elements MUST be caught
  assert.equal(re.test("<p>نص تجريبي غير مغلق<p>"), true, "Broken <p>text<p> must be caught");
  assert.equal(re.test("<h1>عنوان رئيسي<h1>"), true, "Broken <h1>text<h1> must be caught");
  assert.equal(re.test("<div>كتلة محتوى<div>"), true, "Broken <div>text<div> must be caught");
});

test("M2 Remediation: learner applying Tier 4 solution passes SmartHintEngine across all 162 steps", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const htmlData = JSON.parse(fs.readFileSync(HTML_JSON_PATH, "utf8"));

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
  htmlData.lessons.forEach((lesson) => {
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
      const evalResult = context.SmartHintEngine.evaluate(pStep.after, runtimeStep, { key: "html" }, 4);
      assert.equal(
        evalResult.passed,
        true,
        `${lesson.id} step ${sIdx}: SmartHintEngine must pass when learner applies Tier 4 solution. Message: ${evalResult.message}`
      );
    });
  });

  assert.equal(totalEvaluated, 162, "Must evaluate all 162 steps");
});

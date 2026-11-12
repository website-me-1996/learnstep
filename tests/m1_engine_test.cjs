/**
 * tests/m1_engine_test.cjs
 *
 * Dedicated Milestone 1 verification suite covering:
 *  1. validate-curriculum-json.cjs (BOM rejection, schema validation, regex syntax, hint tiers).
 *  2. DataLoader & Hydration Shim (HTML, CSS, JS, Angular).
 *  3. Smart Hint Engine (4-tier progression, attempt tracking, errorRules regex matching, solution reveal).
 *  4. Persistence & Legacy ID Migration (legacyId bidirectional mapping, storage stability).
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const validator = require("../validate-curriculum-json.cjs");

test("M1 Validator: rejects UTF-8 BOM and accepts standard UTF-8 without BOM", () => {
  const bomBuffer = Buffer.from([0xef, 0xbb, 0xbf, 0x7b, 0x22, 0x61, 0x22, 0x3a, 0x31, 0x7d]); // {"a":1} with BOM
  const bomCheck = validator.validateBufferUtf8NoBom(bomBuffer, "bom-test.json");
  assert.equal(bomCheck.valid, false, "Must reject buffer containing UTF-8 BOM");
  assert.match(bomCheck.errors[0], /UTF-8 BOM/);

  const cleanBuffer = Buffer.from('{"schemaVersion":"1.0.0"}', "utf8");
  const cleanCheck = validator.validateBufferUtf8NoBom(cleanBuffer, "clean.json");
  assert.equal(cleanCheck.valid, true, "Must accept clean UTF-8 without BOM");
});

test("M1 Validator: enforces strict canonical schema version '1.0.0' and required fields", () => {
  const fixture = validator.createReferenceFixture();
  const validResult = validator.validateCurriculumData(fixture, "test-fixture");
  assert.equal(validResult.valid, true, "Reference fixture must pass canonical schema");
  assert.equal(validResult.lessonCount, 1);

  // Missing required field
  const missingField = JSON.parse(JSON.stringify(fixture));
  delete missingField.lessons[0].browserMechanics;
  const missingRes = validator.validateCurriculumData(missingField, "missing-field");
  assert.equal(missingRes.valid, false);
  assert.match(missingRes.errors[0], /browserMechanics/);

  // Invalid schemaVersion
  const badVersion = { ...fixture, schemaVersion: "2.0.0" };
  const verRes = validator.validateCurriculumData(badVersion, "bad-version");
  assert.equal(verRes.valid, false);
  assert.match(verRes.errors[0], /schemaVersion/);
});

test("M1 Validator: enforces 4-tier progressive hints and prevents leaked solutions in Tier 1", () => {
  const fixture = validator.createReferenceFixture();

  // Less than 4 tiers
  const shortHints = JSON.parse(JSON.stringify(fixture));
  shortHints.lessons[0].steps[0].hints = ["تلميح 1", "تلميح 2"];
  const shortRes = validator.validateCurriculumData(shortHints, "short-hints");
  assert.equal(shortRes.valid, false);
  assert.match(shortRes.errors[0], /at least 4 tiers/);

  // Leaked solution in Tier 1
  const leakedHints = JSON.parse(JSON.stringify(fixture));
  leakedHints.lessons[0].steps[0].hints[0] = "<title>صفحتي الأولى</title>";
  const leakRes = validator.validateCurriculumData(leakedHints, "leaked-hints");
  assert.equal(leakRes.valid, false);
  assert.match(leakRes.errors[0], /Tier 1 must be an attention prompt without solution/);
});

test("M1 Validator: validates errorRules regex syntax and catches invalid patterns", () => {
  const fixture = validator.createReferenceFixture();

  // Broken regex (unclosed parenthesis)
  const brokenRegex = JSON.parse(JSON.stringify(fixture));
  brokenRegex.lessons[0].steps[0].errorRules[0].pattern = "(unclosed-group";
  const brokenRes = validator.validateCurriculumData(brokenRegex, "broken-regex");
  assert.equal(brokenRes.valid, false);
  assert.match(brokenRes.errors[0], /invalid RegExp/i);

  // Valid regex
  const validRegex = JSON.parse(JSON.stringify(fixture));
  validRegex.lessons[0].steps[0].errorRules[0].pattern = "<h[1-6]>";
  validRegex.lessons[0].steps[0].errorRules[0].flags = "i";
  const validRes = validator.validateCurriculumData(validRegex, "valid-regex");
  assert.equal(validRes.valid, true);
});

test("M1 Validator: enforces bugRepair structure and valid correctOptionIndex bounds", () => {
  const fixture = validator.createReferenceFixture();

  // Out of bounds option index
  const badOption = JSON.parse(JSON.stringify(fixture));
  badOption.lessons[0].bugRepair.correctOptionIndex = 99;
  const badOptRes = validator.validateCurriculumData(badOption, "bad-option-index");
  assert.equal(badOptRes.valid, false);
  assert.match(badOptRes.errors[0], /out of range/i);
});

test("M1 DataLoader: loads and hydrates curriculum tracks into canonical schema", async () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const ldSrc = fs.readFileSync(path.join(__dirname, "..", "lessons-data.js"), "utf8");
  const ngSrc = fs.readFileSync(path.join(__dirname, "..", "angular-course-data.js"), "utf8");

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(ldSrc, context);
  vm.runInContext(ngSrc, context);

  function sourceBetween(a, b) {
    const s = appSrc.indexOf(a), e = appSrc.indexOf(b, s);
    return appSrc.slice(s, e);
  }

  // Run DataLoader & SmartHintEngine from app.js
  vm.runInContext(sourceBetween("  var SmartHintEngine = {", "  function validateLessonAnswer("), context);

  const DataLoader = context.DataLoader;
  assert.ok(DataLoader, "DataLoader must be available in context");

  // Load HTML track
  const htmlTrack = await DataLoader.loadTrack("html");
  assert.equal(htmlTrack.schemaVersion, "1.0.0");
  assert.equal(htmlTrack.track, "html");
  assert.equal(htmlTrack.lessons.length, 54);

  // Load Angular track
  const ngTrack = await DataLoader.loadTrack("angular");
  assert.equal(ngTrack.schemaVersion, "1.0.0");
  assert.equal(ngTrack.track, "angular");
  assert.equal(ngTrack.lessons.length, 106);

  // Get specific lesson
  const l0 = DataLoader.getLesson("html", "html:0");
  assert.ok(l0, "Must find lesson by legacyId");
  assert.equal(l0.legacyId, "html:0");
  assert.equal(l0.order, 0);

  // Map IDs bidirectionally
  assert.equal(DataLoader.mapToLegacyId("html-01-intro"), "html:0");
  assert.equal(DataLoader.mapToLegacyId("html:0"), "html:0");
  assert.equal(DataLoader.mapToLegacyId("ng-ts-01"), "ng-ts-01");
  assert.equal(DataLoader.mapToCanonicalId("html", "html:0"), "html-01");
  assert.equal(DataLoader.mapToCanonicalId("css", "css:24"), "css-25");
});

test("M1 Smart Hint Engine: evaluates progressive hint tiers, errorRules, and attempt memory", () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const ldSrc = fs.readFileSync(path.join(__dirname, "..", "lessons-data.js"), "utf8");

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
  vm.runInContext(ldSrc, context);

  function sourceBetween(a, b) {
    const s = appSrc.indexOf(a), e = appSrc.indexOf(b, s);
    return appSrc.slice(s, e);
  }

  vm.runInContext(sourceBetween("  var SmartHintEngine = {", "  function validateLessonAnswer("), context);
  const SmartHintEngine = context.SmartHintEngine;

  const step = {
    id: "step-1",
    type: "build",
    build: { line: "<title>صفحتي</title>" },
    errorRules: [
      {
        pattern: "<title>[^<]*$",
        flags: "i",
        type: "missing",
        message: "وسم title غير مغلق",
        tier1: "تنبيه: انتبه لإغلاق وسم title.",
        tier2: "قاعدة: كل وسم title يحتاج </title>.",
        tier3: "مساعدة: اكتب </title> في نهاية السطر.",
        solution: "<title>صفحتي</title>"
      }
    ]
  };
  const model = { id: "html:0", key: "html" };

  // Attempt 1: Tier 1 Attention
  const r1 = SmartHintEngine.evaluate("", step, model, 1);
  assert.equal(r1.valid, false);
  assert.equal(r1.tier, 1);
  assert.equal(r1.solutionRevealable, false);
  assert.match(r1.hintText, /لم تكتمل الخطوة بعد\. ينقصك هذا السطر/);

  // Attempt 2: Tier 2 Rule / Question
  const r2 = SmartHintEngine.evaluate("", step, model, 2);
  assert.equal(r2.valid, false);
  assert.equal(r2.tier, 2);
  assert.equal(r2.solutionRevealable, false);
  assert.match(r2.hintText, /تلميح/);

  // Attempt 3: Tier 3 Actionable Help
  const r3 = SmartHintEngine.evaluate("", step, model, 3);
  assert.equal(r3.valid, false);
  assert.equal(r3.tier, 3);
  assert.equal(r3.solutionRevealable, true);
  assert.match(r3.hintText, /مساعدة محددة/);

  // Attempt 4: Tier 4 Solution Reveal
  const r4 = SmartHintEngine.evaluate("", step, model, 4);
  assert.equal(r4.valid, false);
  assert.equal(r4.tier, 4);
  assert.equal(r4.solutionRevealable, true);
  assert.match(r4.hintText, /كشف الحل/);

  // Step attempt tracking
  assert.equal(SmartHintEngine.recordAttempt("html:0", "step-1"), 1);
  assert.equal(SmartHintEngine.recordAttempt("html:0", "step-1"), 2);
  assert.equal(SmartHintEngine.getAttempts("html:0", "step-1"), 2);
  SmartHintEngine.resetAttempts("html:0", "step-1");
  assert.equal(SmartHintEngine.getAttempts("html:0", "step-1"), 0);

  // Success evaluation
  const rPass = SmartHintEngine.evaluate("<title>صفحتي</title>", step, model, 1);
  assert.equal(rPass.valid, true);
  assert.equal(rPass.passed, true);
});

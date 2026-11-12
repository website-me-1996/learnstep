/**
 * tests/m5_angular_curriculum_test.cjs
 *
 * Dedicated verification suite for Milestone 5: Angular Curriculum Modularization & Content.
 * Tests all 106 lessons across 19 skills, schema conformance, dual-compatibility,
 * 4-tier progressive hints, Tier 4 solution reveals, Tier 2 Arabic questions (؟),
 * balanced bugRepair distribution, Angular 22 regex error rules, and DataLoader integration.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const validator = require("../validate-curriculum-json.cjs");

const ANGULAR_JSON_PATH = path.resolve(__dirname, "..", "angular-lessons.json");
const ANGULAR_CHUNKS_DIR = path.resolve(__dirname, "..", "curriculum", "angular");

test("M5 Angular Curriculum: file exists and passes canonical validator with 106 lessons", () => {
  assert.ok(fs.existsSync(ANGULAR_JSON_PATH), "angular-lessons.json must exist at project root");
  const res = validator.validateCurriculumFile(ANGULAR_JSON_PATH);
  assert.equal(res.valid, true, `Validation failed: ${res.errors.join("; ")}`);
  assert.equal(res.lessonCount, 106, "Must contain exactly 106 lessons");
});

test("M5 Angular Curriculum: root schema, version 22, modules, and starterFiles conformance", () => {
  const content = fs.readFileSync(ANGULAR_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  assert.equal(data.schemaVersion, "1.0.0");
  assert.equal(data.track, "angular");
  assert.equal(data.version, "22");
  assert.match(data.title, /Angular/i);
  assert.equal(data.totalLessons, 106);
  assert.equal(data.lessons.length, 106);

  // Verify starterFiles and modules preserved for Angular editor
  assert.ok(data.starterFiles, "starterFiles must be present at root");
  assert.ok(data.starterFiles["package.json"], "package.json must be in starterFiles");
  assert.ok(data.starterFiles["angular.json"], "angular.json must be in starterFiles");
  assert.ok(data.starterFiles["tsconfig.json"], "tsconfig.json must be in starterFiles");
  assert.ok(data.modules, "modules must be present at root");
  assert.ok(Object.keys(data.modules).length >= 7, "modules must have at least 7 phases");
});

test("M5 Angular Curriculum: all 106 lessons have complete 13 canonical fields and rich Arabic copy", () => {
  const content = fs.readFileSync(ANGULAR_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  const seenIds = new Set();
  const seenLegacyIds = new Set();
  const seenOrders = new Set();

  data.lessons.forEach((lesson, idx) => {
    assert.equal(lesson.order, idx, `Lesson at index ${idx} must have order ${idx}`);
    assert.equal(lesson.legacyId, lesson.id, `Lesson at index ${idx} must have matching legacyId`);

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
    assert.match(lesson.documentationUrl, /^https:\/\/(angular\.dev|www\.typescriptlang\.org)\//, `${lesson.id}: documentationUrl must be official Angular or TS URL`);

    // Code & Breakdown
    assert.ok(lesson.code && lesson.code.length >= 10, `${lesson.id}: code is required`);
    assert.ok(Array.isArray(lesson.breakdown) && lesson.breakdown.length >= 3, `${lesson.id}: breakdown >= 3 items`);

    // Steps
    assert.ok(Array.isArray(lesson.steps) && lesson.steps.length >= 3, `${lesson.id}: at least 3 steps`);
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
      const solution = (step.expected || step.code || lesson.expected || "").trim();
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

test("M5 Angular Curriculum: 19 modular chunks exist in curriculum/angular/ and match lesson count (106)", () => {
  const { SKILL_CHUNK_DEFINITIONS } = require("../compile-angular-curriculum.cjs");
  assert.equal(SKILL_CHUNK_DEFINITIONS.length, 19, "Must have exactly 19 skill chunk definitions");

  let totalChunkLessons = 0;
  SKILL_CHUNK_DEFINITIONS.forEach((def) => {
    const p = path.join(ANGULAR_CHUNKS_DIR, def.file);
    assert.ok(fs.existsSync(p), `Chunk file ${def.file} exists`);
    const lessons = JSON.parse(fs.readFileSync(p, "utf8"));
    assert.ok(Array.isArray(lessons), `${def.file} contains an array`);
    totalChunkLessons += lessons.length;
  });

  assert.equal(totalChunkLessons, 106, "Total lessons across 19 chunks must equal 106");
});

test("M5 Angular Curriculum: all steps have exact Tier 4 solution reveal and actionable Tier 3", () => {
  const content = fs.readFileSync(ANGULAR_JSON_PATH, "utf8");
  const data = JSON.parse(content);

  let stepCount = 0;
  data.lessons.forEach((lesson) => {
    lesson.steps.forEach((step, sIdx) => {
      stepCount++;
      const target = (step.expected || step.code || lesson.expected || step.title || "").trim();
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

  assert.ok(stepCount >= 318, `Must verify at least 318 steps across 106 lessons (got ${stepCount})`);
});

test("M5 Angular Curriculum: all steps have Tier 2 conceptual rule with Arabic guiding question ending with '؟'", () => {
  const content = fs.readFileSync(ANGULAR_JSON_PATH, "utf8");
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

  assert.ok(stepCount >= 318, `Must verify at least 318 Tier 2 hints (got ${stepCount})`);
});

test("M5 Angular Curriculum: bugRepair.correctOptionIndex is realistically diversified across options (0, 1, 2, 3)", () => {
  const content = fs.readFileSync(ANGULAR_JSON_PATH, "utf8");
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

  // Verify that every index 0..3 has substantial representation (at least 20 lessons each out of 106)
  for (let i = 0; i < 4; i++) {
    assert.ok(
      indexCounts[i] >= 20,
      `Index ${i} must have at least 20 lessons, got ${indexCounts[i]}`
    );
  }
});

test("M5 Angular Curriculum: Angular regex error rules catch broken statements and pass clean ones", () => {
  const { ANGULAR_RULES } = require("../curriculum/angular/rules_catalog.cjs");

  // 1. Unclosed interpolation
  const interpRe = new RegExp(ANGULAR_RULES.unclosedInterpolation.pattern, ANGULAR_RULES.unclosedInterpolation.flags);
  assert.equal(interpRe.test("<h1>{{ movie.title</h1>"), true, "Unclosed {{ must be flagged");
  assert.equal(interpRe.test("<h1>{{ movie.title }}</h1>"), false, "Closed {{ }} must not be flagged");

  // 2. @for missing track
  const forRe = new RegExp(ANGULAR_RULES.forLoopMissingTrack.pattern, ANGULAR_RULES.forLoopMissingTrack.flags);
  assert.equal(forRe.test("@for (seat of seats) { <div class='seat'></div> }"), true, "@for without track must be flagged");
  assert.equal(forRe.test("@for (seat of seats; track seat.id) { <div class='seat'></div> }"), false, "@for with track seat.id must not be flagged");

  // 3. ngIf without asterisk
  const ngIfRe = new RegExp(ANGULAR_RULES.ngIfWithoutAsterisk.pattern, ANGULAR_RULES.ngIfWithoutAsterisk.flags);
  assert.equal(ngIfRe.test("<div [ngIf]='isOpen'>Open</div>"), true, "[ngIf] without * must be flagged");
  assert.equal(ngIfRe.test("<div *ngIf='isOpen'>Open</div>"), false, "*ngIf must not be flagged");

  // 4. ngFor without asterisk
  const ngForRe = new RegExp(ANGULAR_RULES.ngForWithoutAsterisk.pattern, ANGULAR_RULES.ngForWithoutAsterisk.flags);
  assert.equal(ngForRe.test("<div [ngFor]='let m of movies'>{{m}}</div>"), true, "[ngFor] without * must be flagged");
  assert.equal(ngForRe.test("<div *ngFor='let m of movies'>{{m}}</div>"), false, "*ngFor must not be flagged");

  // 5. Signal direct mutation
  const sigMutRe = new RegExp(ANGULAR_RULES.signalDirectMutation.pattern, ANGULAR_RULES.signalDirectMutation.flags);
  assert.equal(sigMutRe.test("this.seatsCount() = 10;"), true, "seatsCount() = 10 must be flagged as direct mutation");
  assert.equal(sigMutRe.test("this.seatsCount.set(10);"), false, "seatsCount.set(10) must not be flagged");
});

test("M5 Angular Curriculum: DataLoader loads angular track into window.ANGULAR_COURSE_DATA", async () => {
  const appSrc = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const angularJsonContent = fs.readFileSync(ANGULAR_JSON_PATH, "utf8");
  const angularData = JSON.parse(angularJsonContent);

  const context = {
    window: {
      fetch: async (url) => {
        if (url === "angular-lessons.json") {
          return {
            ok: true,
            status: 200,
            json: async () => angularData
          };
        }
        throw new Error("404: " + url);
      }
    }
  };
  vm.createContext(context);

  function sourceBetween(src, startStr, endStr) {
    const i = src.indexOf(startStr);
    const j = src.indexOf(endStr, i);
    if (i < 0 || j < 0) throw new Error("Missing fragment: " + startStr);
    return src.slice(i, j);
  }

  // Load DataLoader & SmartHintEngine from app.js
  vm.runInContext(sourceBetween(appSrc, "  var SmartHintEngine = {", "  function validateLessonAnswer("), context);

  assert.ok(context.window.DataLoader, "window.DataLoader must be defined");
  const loaded = await context.window.DataLoader.loadTrack("angular");

  assert.equal(loaded.track, "angular");
  assert.equal(loaded.lessons.length, 106);
  assert.equal(loaded.lessons[0].id, "ng-ts-01");
  assert.equal(loaded.lessons[105].id, "final-review");
});

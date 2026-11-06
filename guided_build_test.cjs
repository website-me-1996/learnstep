const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const app = fs.readFileSync(__dirname + "/app.js", "utf8");
const lessonData = fs.readFileSync(__dirname + "/lessons-data.js", "utf8");
function sourceBetween(a, b) {
  const i = app.indexOf(a), j = app.indexOf(b, i);
  if (i < 0 || j < 0) throw new Error("missing " + a);
  return app.slice(i, j);
}
function makeLesson(index) {
  const context = {
    window: {}, activeIndex: index, course: "html",
    s: { htmlCode: "", examples: 0, fixes: 0 },
    growth: { completed: [], stages: {}, lessonFlow: {}, baseCodes: {}, drafts: {}, archivedDrafts: {}, experimentCodes: {}, repairStarted: {}, answers: {}, readingSteps: {} },
    data: { html: { code: "<h1>قديم</h1>", file: "index.html" } },
    currentTopicIndex() { return context.activeIndex; },
    courseTopics(key) { return context.window.LESSONS_DATA[key]; },
    lessonId(key, i) { return key + ":" + i; },
    growthLessonDone(id) { return context.growth.completed.includes(id); },
    htmlLessonDetail() { return { note: "شرح", flow: "جزء ⟶ نتيجة" }; },
    courseLessonSpec() { return {}; },
    lessonObjective() { return "هدف"; },
    topicPiece(key, i, objective, code) { return { id: key + ":" + i, code, label: "x" }; },
    saveGrowth() {}, save() {}, renderGrowthLesson() {}, render() {},
    showStepBenefit(text) { context.lastBenefit = text; }, clearStepBenefit() {},
    growthPreview(code) { context.lastPreview = code; },
    celebrateGrowth() {}, escapeHtml: (x) => String(x),
    document: { getElementById(id) { return id === "hint" ? context.hintNode : context.codeNode; } },
    codeNode: { value: "", focus() {} }, hintNode: { textContent: "" },
    console
  };
  vm.createContext(context);
  vm.runInContext(lessonData, context);
  vm.runInContext(sourceBetween("  function buildGuidePracticeSteps(code, guide) {", "  function growthDraftFor(model)"), context);
  vm.runInContext(sourceBetween("  function coursePracticeStepFor(model) {", "  function fullHtmlDocument("), context);
  const buildModel = context.growthLessonModel;
  context.model = buildModel();
  context.growthLessonModel = () => context.model;
  vm.runInContext(sourceBetween("  function growthDraftFor(model) {", "  function growthLessonDone(id) {"), context);
  vm.runInContext(sourceBetween("  function runDynamicGrowthLesson() {", "  function completeGrowthLesson(model)"), context);
  return context;
}

test("HTML Introduction is built piece by piece by the learner, with a benefit sentence after every run", () => {
  const c = makeLesson(0), model = c.model;
  assert.equal(model.buildStages.length, 5);
  const steps = c.growthLessonSteps(model);
  assert.equal(steps.length, 13);
  const flow = () => c.growth.lessonFlow[model.id].current;

  // idea step: full example is shown once, then the editor is emptied for the guided build
  c.growth.lessonFlow[model.id] = { current: 0, unlocked: 0 };
  c.codeNode.value = model.code;
  c.runDynamicGrowthLesson();
  assert.equal(flow(), 1);
  assert.match(c.lastBenefit, /^فائدة/);
  assert.equal(c.growth.drafts[model.id], "", "editor is cleared after the overview");

  // each detail step rejects code that lacks the new piece, and the preview still shows what was typed
  for (let i = 0; i < 5; i++) {
    const stage = model.buildStages[i];
    assert.equal(steps[1 + i].build.index, i);
    c.lastBenefit = "";
    c.codeNode.value = stage.previous;           // learner has not typed anything yet
    c.runDynamicGrowthLesson();
    assert.equal(flow(), 1 + i, `detail ${i}: unchanged editor must not advance`);
    assert.equal(c.lastBenefit, "", "no benefit sentence before the learner builds the part");
    assert.match(c.hintNode.textContent, /ينقصك|المحرر فاضي/);

    c.codeNode.value = stage.code;               // learner types the part
    c.runDynamicGrowthLesson();
    assert.equal(flow(), 2 + i, `detail ${i}: correct typing advances`);
    assert.match(c.lastBenefit, /^فائدة ما أنشأته للتو: /);
    assert.equal(c.lastPreview, stage.code, "preview shows only what has been built so far");
  }
  assert.equal(c.growth.drafts[model.id], model.code, "after the last piece the editor equals the full example so the edit steps match");

  // the first guided edit now accepts exactly its change
  c.codeNode.value = model.practiceSteps[0].after;
  c.runDynamicGrowthLesson();
  assert.equal(flow(), 7);
  assert.match(c.lastBenefit, /^فائدة هذا التعديل: /);
});

test("whitespace-only differences in the typed code are tolerated", () => {
  const c = makeLesson(0), model = c.model;
  c.growth.lessonFlow[model.id] = { current: 1, unlocked: 1 };
  c.growth.drafts[model.id] = "";
  c.codeNode.value = "<!DOCTYPE   html>\n\n";
  c.runDynamicGrowthLesson();
  assert.equal(c.growth.lessonFlow[model.id].current, 2);
});

test("reviewing an earlier step never overwrites the learner's saved draft", () => {
  const c = makeLesson(0), model = c.model;
  c.growth.lessonFlow[model.id] = { current: 1, unlocked: 3 };
  c.growth.drafts[model.id] = model.buildStages[2].code;
  c.codeNode.value = model.buildStages[0].code;
  c.runDynamicGrowthLesson();
  assert.equal(c.growth.drafts[model.id], model.buildStages[2].code);
  assert.equal(c.growth.lessonFlow[model.id].current, 1);
  assert.match(c.lastBenefit, /^فائدة/);
});

test("every one of the 54 HTML lessons has a reachable final stage equal to its full example", () => {
  const c = makeLesson(0);
  const norm = (t) => t.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("|");
  let staged = 0;
  for (const [topic, guide] of Object.entries(c.window.LESSONS_DATA.guides.html)) {
    const stages = c.buildGuideStages(guide.code, guide.breakdown);
    if (!stages.length) continue;
    staged++;
    assert.equal(norm(stages[stages.length - 1].code), norm(guide.code), topic);
    for (const st of stages) assert.equal(c.missingBuildLine(st.code, st), "", topic);
  }
  assert.ok(staged >= 48, `at least 48 lessons are built stage by stage (got ${staged})`);
});

test("all CSS and JS lessons are built in valid stages that end exactly at the full example", () => {
  const c = makeLesson(0), H = c.window.LESSONS_DATA.courseHelpers;
  let checked = 0;
  for (const key of ["css", "js"]) {
    c.window.LESSONS_DATA[key].forEach((topic, i) => {
      const spec = (key === "css" ? H.cssLessonSpec : H.jsLessonSpec)(topic, i);
      spec.details = H.courseLessonDetails(spec, key);
      const example = c.courseExampleCode(key, spec);
      const stages = c.buildCourseStages(key, spec, example, spec.details.length - 1, key === "js" ? c.validateJsSource : null);
      assert.ok(stages.length >= 1, `${key}:${topic} has stages`);
      assert.equal(stages[stages.length - 1].code, example, `${key}:${topic} final stage equals the example`);
      assert.ok(stages.some((st) => st.added), `${key}:${topic} asks the learner to type something`);
      for (const st of stages) {
        assert.equal(c.missingBuildLine(st.code, st), "", `${key}:${topic}`);
        if (key === "js") assert.ok(c.validateJsSource(st.code), `${key}:${topic} stage ${st.index} parses`);
        if (st.added) assert.match(c.describeCoursePiece(key, st.added).benefit, /^فائدة ما أنشأته/);
      }
      checked++;
    });
  }
  assert.equal(checked, c.window.LESSONS_DATA.css.length + c.window.LESSONS_DATA.js.length);
});

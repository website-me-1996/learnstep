const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = __dirname;
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const lessonData = fs.readFileSync(path.join(root, "lessons-data.js"), "utf8");
const learnerProfileData = fs.readFileSync(path.join(root, "learner-profiles.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

test("named learner profiles keep lesson state separate and preserve the legacy learner", () => {
  const values = new Map([["khotwa-v1", JSON.stringify({ lessons: 7 })]]);
  const storage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
  const context = { window: { localStorage: storage }, Object, Date, Math, String };
  vm.createContext(context);
  vm.runInContext(learnerProfileData, context);
  const manager = context.window.LearnerProfiles;
  const legacyKeys = manager.storageKeys();
  assert.equal(legacyKeys.state, "khotwa-v1");
  assert.equal(JSON.parse(values.get(legacyKeys.state)).lessons, 7, "the existing unnamed learner stays intact");

  const first = manager.create("  محمد   علي ");
  assert.equal(first.ok, true);
  assert.equal(first.profile.name, "محمد علي");
  assert.notEqual(first.keys.state, legacyKeys.state);
  assert.notEqual(first.keys.growth, legacyKeys.growth);
  assert.notEqual(first.keys.profile, legacyKeys.profile);
  values.set(first.keys.state, JSON.stringify({ lessons: 2 }));

  const duplicate = manager.create("محمد علي");
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.reason, "duplicate");
  assert.equal(manager.activate("default"), true);
  assert.equal(manager.storageKeys().state, "khotwa-v1");
  assert.equal(manager.activate(first.profile.id), true);
  assert.equal(manager.storageKeys().state, first.keys.state);
  assert.equal(JSON.parse(values.get(first.keys.state)).lessons, 2);
  assert.equal(manager.activate("missing-profile"), false);
});

test("all fifty-four HTML lessons use full examples and ordered, checkable W3Schools-based steps", () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(lessonData, context);
  vm.runInContext(sourceBetween("  function buildGuidePracticeSteps(code, guide) {", "  function fullHtmlDocument(fragment, title) {"), context);
  vm.runInContext(sourceBetween("  function growthLessonSteps(model) {", "  function legacyFlowCursor(model, steps) {"), context);
  const guides = context.window.LESSONS_DATA.guides.html;
  assert.equal(Object.keys(guides).length, 54);
  assert.deepEqual(Object.keys(guides), Array.from(context.window.LESSONS_DATA.html), "HTML guides follow the W3Schools roadmap order");
  const htmlStepCounts = new Set();
  for (const [topic, guide] of Object.entries(guides)) {
    assert.match(guide.reference, /^https:\/\/www\.w3schools\.com\/(?:html|graphics)\//, topic);
    assert.match(guide.code, /<!DOCTYPE html>/i, `${topic}: document type is in the editor example`);
    assert.match(guide.code, /<html[\s>]/i, `${topic}: root element is in the editor example`);
    assert.match(guide.code, /<head[\s>]/i, `${topic}: head is in the editor example`);
    assert.match(guide.code, /<body[\s>]/i, `${topic}: visible content is in the editor example`);
    assert.equal(guide.steps.length, 3, `${topic}: three small practices`);
    assert.ok(guide.breakdown.length >= 3, `${topic}: the example is explained piece by piece`);
    const steps = context.buildGuidePracticeSteps(guide.code, guide);
    assert.equal(steps.length, guide.steps.length);
    for (const [index, step] of steps.entries()) {
      assert.equal(step.valid, true, `${topic}, step ${index + 1}: target exists in the current example`);
      assert.notEqual(step.after, step.before, `${topic}, step ${index + 1}: a real edit is required`);
      assert.ok(step.task.length > 20 && step.explanation.length > 20, `${topic}, step ${index + 1}: direct instruction and explanation`);
    }
    const flow = context.growthLessonSteps({
      key: "html", topic, concept: guide.concept, objective: guide.concept, trace: guide.flow, code: guide.code,
      breakdown: guide.breakdown, details: [], practiceSteps: steps,
      bugQuestion: "اكتشف الخطأ", bugOptions: ["السبب", "سبب آخر"], bugExample: "<p>نص</p>",
      projectPiece: { label: topic }
    });
    htmlStepCounts.add(flow.length);
    assert.equal(flow.length, 8 + guide.breakdown.length, `${topic}: the total comes from this lesson's actual explanation list`);
    assert.ok(flow.every((step) => step.title && step.explanation && step.example && step.task), `${topic}: each visible step has a teaching point, example, and action`);
  }
  assert.deepEqual([...htmlStepCounts].sort((a, b) => a - b), [11, 12, 13], "HTML lesson lengths vary with their authored breakdowns");
  assert.match(indexHtml, /<textarea id="code" dir="ltr"/);
  assert.match(indexHtml, /id="lessonReference"/);
  assert.match(indexHtml, /id="guidePrevious"/);
  assert.match(app, /"خطوة " \+ ar\(current \+ 1\) \+ " من " \+ ar\(steps\.length\)/);
});

test("an HTML topic loads its own full file and cannot skip any of its three edits", () => {
  function makeLesson(index) {
    const context = {
      window: {}, activeIndex: index, course: "html",
      s: { htmlCode: "<h1>مسودة من درس سابق</h1>", examples: 0, fixes: 0 },
      growth: { completed: [], stages: {}, lessonFlow: {}, baseCodes: {}, drafts: {}, archivedDrafts: {}, experimentCodes: {}, repairStarted: {}, answers: {} },
      data: { html: { code: "<h1>قديم</h1><p>قديم</p>", file: "index.html" } },
      currentTopicIndex() { return context.activeIndex; },
      courseTopics(key) { return context.window.LESSONS_DATA[key]; },
      lessonId(key, lessonIndex) { return key + ":" + lessonIndex; },
      growthLessonDone(id) { return context.growth.completed.includes(id); },
      htmlLessonDetail() { return { note: "شرح", flow: "جزء ⟶ نتيجة" }; },
      courseLessonSpec() { return {}; },
      lessonObjective() { return "أتعرف على هذا الجزء من الصفحة."; },
      topicPiece(key, lessonIndex, objective, code) { return { id: key + ":" + lessonIndex, code }; },
      saveGrowth() {}, save() {}, renderGrowthLesson() {}, render() {},
      showStepBenefit(text) { context.lastBenefit = text; }, clearStepBenefit() {},
      growthPreview(code) { context.lastPreview = code; },
      celebrateGrowth() {}, escapeHtml: htmlEscape,
      document: { getElementById() { return context.codeNode; } },
      codeNode: { value: "", focus() {} },
      console
    };
    vm.createContext(context);
    vm.runInContext(lessonData, context);
    vm.runInContext(sourceBetween("  function buildGuidePracticeSteps(code, guide) {", "  function growthDraftFor(model)"), context);
    vm.runInContext(sourceBetween("  function coursePracticeStepFor(model) {", "  function fullHtmlDocument("), context);
    const buildModel = context.growthLessonModel;
    const model = buildModel();
    context.model = model;
    context.growthLessonModel = () => context.model;
    context.buildGrowthLessonModel = buildModel;
    vm.runInContext(sourceBetween("  function growthDraftFor(model) {", "  function growthLessonDone(id) {"), context);
    vm.runInContext(sourceBetween("  function runDynamicGrowthLesson() {", "  function completeGrowthLesson(model)"), context);
    return { context, model };
  }

  for (const index of Array.from({ length: 54 }, (_, i) => i)) {
    const { context, model } = makeLesson(index);
    assert.match(model.code, /<!DOCTYPE html>/, model.topic);
    assert.match(model.code, /<html[\s>]/, model.topic);
    assert.equal(model.practiceSteps.length, 3, model.topic);
    assert.equal(context.growth.drafts[model.id], model.code, `${model.topic}: editor starts from this lesson's example`);
    const flow = context.growthLessonSteps(model);
    const firstEdit = flow.findIndex((step) => step.type === "edit");
    context.growth.lessonFlow[model.id] = { current: firstEdit, unlocked: firstEdit };
    context.codeNode.value = model.code;
    context.runGrowthLesson();
    assert.equal(context.growth.lessonFlow[model.id].current, firstEdit, `${model.topic}: an unchanged example cannot pass the first edit`);
    for (const [stepIndex, step] of model.practiceSteps.entries()) {
      context.codeNode.value = step.after;
      context.runGrowthLesson();
      assert.equal(context.growth.stages[model.id], stepIndex + 1, `${model.topic}: step ${stepIndex + 1} advances only after its edit is run`);
      assert.equal(context.growth.lessonFlow[model.id].current, firstEdit + stepIndex + 1, `${model.topic}: each saved edit opens only the following lesson step`);
      assert.equal(context.growth.drafts[model.id], step.after);
    }
  }

  const stale = makeLesson(3),
    oldFragment = "<h1>أول صفحة لي</h1>\n<p>أنا أتعلم Elements</p>";
  stale.context.growth.baseCodes[stale.model.id] = stale.model.code;
  stale.context.growth.drafts[stale.model.id] = oldFragment;
  stale.context.growth.stages[stale.model.id] = 2;
  const migrated = stale.context.buildGrowthLessonModel();
  stale.context.model = migrated;
  assert.equal(stale.context.growth.archivedDrafts[stale.model.id], oldFragment, "the old editor fragment remains recoverable");
  assert.equal(stale.context.growthDraftFor(migrated), migrated.code, "the editor receives the complete lesson document");
  assert.equal(stale.context.growth.stages[stale.model.id], 0, "the learner begins the new full example from its first practice");

  stale.context.growth.completed.push(stale.model.id);
  stale.context.growth.stages[stale.model.id] = 6;
  stale.context.growth.drafts[stale.model.id] = oldFragment;
  const completed = stale.context.buildGrowthLessonModel();
  assert.equal(stale.context.growthDraftFor(completed), completed.code, "completed lessons also open with the full example");
  assert.equal(stale.context.growth.stages[stale.model.id], 6, "repairing the saved example does not erase completed progress");
});

test("mixed Arabic lesson copy isolates English words and code tokens", () => {
  const node = { attributes: {}, setAttribute(name, value) { this.attributes[name] = value; }, innerHTML: "" };
  const context = { escapeHtml: htmlEscape };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function lessonMixedMarkup(value) {", "  function renderGrowthLesson() {"), context);
  context.setLessonCopy(node, "غيّر كلمة Elements داخل <h1> ثم شغّل.");
  assert.equal(node.attributes.dir, "rtl");
  const attributeMarkup = context.lessonMixedMarkup('See href="#about" now.');
  assert.match(attributeMarkup, /<code dir="ltr" class="inline-code">href=&quot;#about&quot;<\/code>/);
  assert.match(node.innerHTML, /<bdi dir="ltr">Elements<\/bdi>/);
  assert.match(node.innerHTML, /<bdi dir="ltr">&lt;h1&gt;<\/bdi>/);
  assert.match(indexHtml, /<textarea id="code" dir="ltr"/);
  assert.match(styles, /\.editor textarea\{[^}]*direction:ltr;[^}]*unicode-bidi:embed/);
});

test("roadmap search finds English and Arabic topics across the ordered courses", () => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(sourceBetween(
    "  function normalizeRoadSearch(value) {",
    "  function renderRoadmap() {"
  ), context);
  const matches = context.roadmapTopicMatches;
  assert.equal(matches("CSS Flexbox Intro", "Flexbox"), true);
  assert.equal(matches("CSS Flexbox Intro", "المرونة"), true);
  assert.equal(matches("HTML Forms", "النماذج"), true);
  assert.equal(matches("JS Asynchronous JavaScript", "async"), true);
  assert.equal(matches("JS Asynchronous JavaScript", "غير متزامن"), true);
  assert.equal(matches("CSS Grid Container", "grid container"), true);
  assert.equal(matches("CSS Grid Container", "تاريخ"), false);
  assert.equal(matches("CSS Grid Container", "   "), false);
});

test("rendering a lesson refreshes its matching course roadmap", () => {
  const dynamicRenderer = app.match(/function renderDynamicGrowthLesson\(\) \{([\s\S]*?)\n  function renderGrowthLesson\(\)/);
  assert.ok(dynamicRenderer, "the active lesson renderer is present");
  assert.match(dynamicRenderer[1], /renderRoadmap\(\)/, "the roadmap follows the selected HTML, CSS, or JavaScript course");
  assert.match(styles, /\.growth-build-row\{grid-template-columns:minmax\(0,1fr\)\}/, "the lesson editor and preview each use the full content width");
});

test("CSS and JavaScript lessons send the edited source into a runnable preview document", () => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function buildJavascriptPreview(code) {", "  var htmlSequence"), context);
  const cssCode = ".card h1 { color: tomato; }";
  const cssPreview = context.data.css.build(cssCode);
  assert.match(cssPreview, /<style>/);
  assert.ok(cssPreview.includes(cssCode), "the current CSS is inserted into the preview stylesheet");
  assert.match(cssPreview, /class='card'/, "the CSS preview includes visible lesson elements");
  const jsPreview = context.data.js.build('console.log("تجربة JavaScript")');
  assert.match(jsPreview, /new Function\(userCode\)/);
  assert.match(jsPreview, /تجربة JavaScript/);
});

test("course lessons load from a separate data file before the interface script", () => {
  const dataTag = indexHtml.indexOf('<script src="lessons-data.js" defer></script>');
  const appTag = indexHtml.indexOf('<script src="app.js" defer></script>');
  assert.ok(dataTag >= 0 && appTag > dataTag, "the course data is loaded before the app reads it");
  assert.match(lessonData, /window\.LESSONS_DATA\s*=\s*\{/);
  assert.match(lessonData, /window\.LESSONS_DATA\.courseHelpers\s*=\s*\(function/);
  assert.doesNotMatch(app, /var\s+(?:html|css|js)Sequence\s*=\s*\[/);
  assert.doesNotMatch(app, /function\s+(?:cssLessonSpec|jsLessonSpec|courseLessonDetails)\s*\(/);
});

test("the personal card advances one small step at a time and exports the learner's details", () => {
  const calls = { saves: 0, cheers: 0 };
  const values = { projectNameInput: "", projectRoleInput: "", projectAboutInput: "", projectFeedback: "" };
  const nodes = Object.fromEntries(Object.keys(values).map((id) => [id, {
    value: values[id], textContent: "", focus() { calls.focused = id; }
  }]));
  const context = {
    profileCard: { step: 1, name: "", role: "", about: "", color: "ocean", image: "", completed: false },
    profileThemes: {
      forest: { accent: "#286b56", soft: "#eaf3e9", ink: "#19372e" },
      ocean: { accent: "#35658f", soft: "#eaf1f8", ink: "#20364a" },
      plum: { accent: "#79527e", soft: "#f3edf4", ink: "#403043" },
      sunset: { accent: "#a65d32", soft: "#fbefe6", ink: "#4c3529" }
    },
    document: { getElementById(id) { return nodes[id]; } },
    escapeHtml: htmlEscape,
    latestProjectPartMarkup: () => "",
    saveProfileCard() { calls.saves++; },
    cheer() { calls.cheers++; }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function projectIsReady() {", "  function projectModuleMarkup(exportMode)"), context);
  vm.runInContext(sourceBetween("  function profileInitials() {", "  function openProjectPart(partId)"), context);
  vm.runInContext(sourceBetween("  function buildProfileHtml() {", "  function advanceProjectStep() {"), context);
  vm.runInContext(sourceBetween("  function advanceProjectStep() {", "  function compressProfileImage(file)"), context);

  context.advanceProjectStep();
  assert.equal(context.profileCard.step, 1, "the name fields are required before continuing");
  assert.equal(calls.focused, "projectNameInput");
  nodes.projectNameInput.value = "ليلى <script>";
  nodes.projectRoleInput.value = "أتعلم تطوير الويب";
  context.advanceProjectStep();
  assert.equal(context.profileCard.step, 2);
  assert.equal(context.profileCard.name, "ليلى <script>");

  context.advanceProjectStep();
  assert.equal(context.profileCard.step, 2, "the short introduction is required");
  assert.equal(calls.focused, "projectAboutInput");
  nodes.projectAboutInput.value = "أبني صفحات خطوة خطوة.";
  context.advanceProjectStep();
  assert.equal(context.profileCard.step, 3);
  context.advanceProjectStep();
  assert.equal(context.profileCard.completed, true);
  assert.equal(calls.cheers, 1);
  assert.equal(calls.saves, 3);

  const exported = context.buildProfileHtml();
  assert.match(exported, /<html lang="ar" dir="rtl">/);
  assert.match(exported, /<title>ليلى &lt;script&gt;<\/title>/);
  assert.match(exported, /<span class="role">أتعلم تطوير الويب<\/span>/);
  assert.match(exported, /<p>أبني صفحات خطوة خطوة\.<\/p>/);
  assert.match(indexHtml, /id="profileCardPreview"/);
  assert.match(indexHtml, /id="downloadProfile"/);
  assert.match(indexHtml, /id="profileExportCode"/);
});

test("three independent starter projects are available without unlocking another lesson", () => {
  for (const project of ["todo", "notes", "calculator"]) {
    assert.match(indexHtml, new RegExp('data-starter-project="' + project + '"'));
  }
  assert.match(indexHtml, /id="starterProjectWorkspace"/);
  assert.match(app, /miniProjectStorageKey = \(typeof learnerStorage !== "undefined"/);
  assert.match(app, /function loadMiniProjects\(\)/);
  assert.match(app, /function renderMiniProjects\(\)/);
  assert.match(app, /function initializeMiniProjects\(\)/);
  assert.match(app, /initializeMiniProjects\(\);/);
  assert.match(styles, /\.starter-project-list\{display:grid/);
});

function sourceBetween(startMarker, endMarker, source = app) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  assert.ok(start >= 0 && end > start, `Could not find source section: ${startMarker}`);
  return source.slice(start, end);
}

function htmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

test("new learners see zero-earned counters and old seeded counts are migrated safely", () => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(sourceBetween(
    "  function migrateSeededCounters(state) {",
    "  try {\n    var saved = JSON.parse(localStorage.getItem(key)"
  ), context);
  const legacy = {
    lessons: 4, examples: 12, fixes: 3, minutes: 18, progress: 26, project: 34,
    statsVersion: 0, course: "js"
  };
  const migrated = context.migrateSeededCounters(legacy);
  for (const field of ["lessons", "examples", "fixes", "minutes", "progress", "project"]) assert.equal(migrated[field], 0);
  assert.equal(migrated.course, "js");
  assert.equal(migrated.statsVersion, 2);

  const partiallyEarned = context.migrateSeededCounters({
    lessons: 4, examples: 13, fixes: 3, minutes: 18, progress: 27, project: 20, statsVersion: 0
  });
  assert.deepEqual(
    [partiallyEarned.lessons, partiallyEarned.examples, partiallyEarned.fixes, partiallyEarned.minutes, partiallyEarned.progress, partiallyEarned.project],
    [0, 13, 0, 0, 27, 20]
  );
  const alreadyMigrated = context.migrateSeededCounters({ lessons: 4, statsVersion: 2 });
  assert.equal(alreadyMigrated.lessons, 4, "the migration does not overwrite newer saved progress");

  assert.match(app, /lessons: 0, examples: 0, fixes: 0, minutes: 0, progress: 0, project: 0/);
  assert.match(app, /course: "html"/);
  assert.match(indexHtml, /class="course active" data-course="html"/);
  assert.match(indexHtml, /class="tab active" data-course="html"/);
  for (const id of ["lessons", "examples", "fixes", "minutes"]) assert.match(indexHtml, new RegExp(`id="${id}">٠`));
});

test("corrupted saved code fields fall back safely and oversized drafts are bounded", () => {
  const context = {
    d: { htmlCode: "<h1>افتراضي</h1>", cssCode: "", htmlEditorDraft: "<p>مسودة</p>", htmlScaffold: "" },
    Object
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function normalizeStoredCodeFields(state)", "  try {\n    var saved"), context);
  const state = context.normalizeStoredCodeFields({ htmlCode: { damaged: true }, cssCode: ".card{}", htmlEditorDraft: "x".repeat(30001), htmlScaffold: null });
  assert.equal(state.htmlCode, "<h1>افتراضي</h1>");
  assert.equal(state.cssCode, ".card{}");
  assert.equal(state.htmlEditorDraft.length, 30000);
  assert.equal(state.htmlScaffold, "");
});

test("five minutes is the default focus session while older and longer sessions remain available", () => {
  const context = { d: { focusDuration: 300 }, Object, Math };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function normalizeFocusSettings(state, savedState)", "  try {\n    var saved"), context);

  const fresh = context.normalizeFocusSettings({ focusDuration: 300, focusSeconds: 300 }, null);
  assert.deepEqual([fresh.focusDuration, fresh.focusSeconds], [300, 300]);
  const legacy = context.normalizeFocusSettings({ focusDuration: 300, focusSeconds: 240 }, { focusSeconds: 240 });
  assert.deepEqual([legacy.focusDuration, legacy.focusSeconds], [720, 240], "a saved 12-minute timer resumes without losing its remaining time");
  const selectedFive = context.normalizeFocusSettings({ focusDuration: 300, focusSeconds: 240 }, { focusDuration: 300, focusSeconds: 240 });
  assert.deepEqual([selectedFive.focusDuration, selectedFive.focusSeconds], [300, 240]);
  const invalid = context.normalizeFocusSettings({ focusDuration: 300, focusSeconds: 900 }, { focusDuration: 99, focusSeconds: 900 });
  assert.deepEqual([invalid.focusDuration, invalid.focusSeconds], [300, 300]);
  assert.match(indexHtml, /id="timer"[^>]*>٠٥:٠٠/);
  assert.match(indexHtml, /data-focus-duration="720"/);
});

test("focus duration buttons save the selected time and stay disabled while the timer runs", () => {
  const calls = { saved: 0, shown: 0 };
  const nodes = {
    focusBtn: { textContent: "" }, focusCaption: { textContent: "" }
  };
  const buttons = [300, 720].map((duration) => ({
    dataset: { focusDuration: String(duration) }, attrs: {}, disabled: false,
    classList: { toggle(name, value) { this[name] = value; } },
    setAttribute(name, value) { this.attrs[name] = value; }
  }));
  const context = {
    timerDuration: 720, clock: 240, timerId: null, s: { focusDuration: 720, focusSeconds: 240 },
    document: {
      querySelectorAll(selector) { return selector === "[data-focus-duration]" ? buttons : []; },
      getElementById(id) { return nodes[id]; }
    },
    save() { calls.saved++; }, showTime() { calls.shown++; }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function syncFocusDurationButtons()", "  function focus()"), context);

  assert.equal(context.setFocusDuration(300), true);
  assert.deepEqual([context.timerDuration, context.clock, context.s.focusDuration, context.s.focusSeconds], [300, 300, 300, 300]);
  assert.equal(buttons[0].attrs["aria-pressed"], "true");
  assert.equal(buttons[1].attrs["aria-pressed"], "false");
  assert.equal(nodes.focusCaption.textContent, "٥ دقائق تكفي لخطوة واحدة؛ تقدر توقف وتكمل وقت ما تحب.");
  assert.equal(calls.saved, 1);
  assert.equal(calls.shown, 1);

  context.timerId = 77;
  context.syncFocusDurationButtons();
  assert.ok(buttons.every((button) => button.disabled));
  assert.equal(context.setFocusDuration(720), false);
  assert.equal(context.timerDuration, 300, "a running session cannot be changed underneath the learner");
});

test("starting and pausing focus locks then restores the duration controls", () => {
  const buttons = [300, 720].map((duration) => ({
    dataset: { focusDuration: String(duration) }, disabled: false,
    classList: { toggle() {} }, setAttribute() {}
  }));
  const nodes = { focusBtn: { textContent: "" }, focusCaption: { textContent: "" } };
  const context = {
    timerId: null, timerDeadline: 0, timerDuration: 300, clock: 300,
    s: { focusDuration: 300, focusSeconds: 300 },
    Date: { now: () => 1000 },
    setInterval() { return 42; }, clearInterval() {}, save() {}, showTime() {},
    syncFocusDurationButtons() {
      buttons.forEach((button) => { button.disabled = !!context.timerId; });
    },
    document: {
      querySelectorAll(selector) { return selector === "[data-focus-duration]" ? buttons : []; },
      getElementById(id) { return nodes[id]; }
    }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function focus() {", "  function finishFocusSession()"), context);

  context.focus();
  assert.equal(context.timerId, 42);
  assert.ok(buttons.every((button) => button.disabled));
  context.focus();
  assert.equal(context.timerId, null);
  assert.ok(buttons.every((button) => !button.disabled));
  assert.equal(context.s.focusSeconds, 300);
  assert.equal(nodes.focusBtn.textContent, "كمّل المؤقت");
});

test("completed focus sessions add the selected duration to the learner's minutes", () => {
  const makeContext = (timerDuration) => {
    const context = {
      timerId: null, timerDeadline: 1, clock: 0,
      s: { focusSeconds: 0, minutes: 2 }, timerDuration,
      clearInterval() {}, save() {}, showTime() {}, syncFocusDurationButtons() {}, render() {}, cheer() {},
      document: { getElementById() { return { textContent: "" }; } }
    };
    vm.createContext(context);
    vm.runInContext(sourceBetween("  function finishFocusSession() {", "  window.addEventListener(\"pagehide\""), context);
    return context;
  };
  const fiveMinutes = makeContext(300);
  fiveMinutes.finishFocusSession();
  assert.equal(fiveMinutes.s.minutes, 7);
  const twelveMinutes = makeContext(720);
  twelveMinutes.finishFocusSession();
  assert.equal(twelveMinutes.s.minutes, 14);
});

function dailyContext(course, topic, today = "2026-11-02") {
  const nodes = new Map();
  const calls = {};
  function getElement(id) {
    if (nodes.has(id)) return nodes.get(id);
    const element = {
      textContent: "", style: {}, attrs: {}, buttons: [],
      setAttribute(name, value) { this.attrs[name] = value; },
      classList: { add() {} }
    };
    Object.defineProperty(element, "innerHTML", {
      get() { return this._html || ""; },
      set(value) {
        this._html = value;
        this.buttons = [];
        this.form = null;
        if (value.includes("data-daily-color=")) {
          this.buttons = Array.from(value.matchAll(/data-daily-color="([a-z]+)"/g), (match) => ({
            dataset: { dailyColor: match[1] }, onclick: null
          }));
        }
        if (value.includes('class="daily-challenge-workspace"')) {
          const input = { value: "", focus() { this.focused = true; } };
          this.form = { elements: { dailyText: input }, onsubmit: null };
        }
      }
    });
    element.querySelectorAll = (selector) => selector === "[data-daily-color]" ? element.buttons : [];
    element.querySelector = (selector) => selector === "form" ? element.form : null;
    nodes.set(id, element);
    return element;
  }

  const context = {
    growth: { daily: {}, projectParts: [], projectData: { todos: [] } },
    s: { progress: 0 },
    profileCard: { color: "forest" },
    profileThemes: {
      forest: { accent: "#286b56" }, ocean: { accent: "#35658f" },
      plum: { accent: "#79527e" }, sunset: { accent: "#a65d32" }
    },
    growthLessonModel: () => ({ key: course, topic, spec: null }),
    todayKey: () => today,
    document: { getElementById: getElement },
    escapeHtml: htmlEscape,
    Math, Object, Array, String
  };
  context.addProjectPart = (part) => {
    if (context.growth.projectParts.some((item) => item.id === part.id)) return false;
    context.growth.projectParts.push(part);
    return true;
  };
  for (const name of ["saveGrowth", "save", "renderProfileCard", "renderGrowthDashboard"]) {
    context[name] = () => { calls[name] = (calls[name] || 0) + 1; };
  }
  context.saveProfileCard = () => { calls.saveProfileCard = (calls.saveProfileCard || 0) + 1; };
  context.celebrateGrowth = () => { calls.rewards = (calls.rewards || 0) + 1; };
  vm.createContext(context);
  vm.runInContext(sourceBetween(
    "  function dailyChallengeModel() {",
    "  function openDailyChallenge() {"
  ), context);
  return { context, getElement, calls };
}

function lessonContext(course) {
  const topic = course === "html" ? "HTML Elements" : course === "css" ? "CSS Colors" : "JS Variables";
  const id = `${course}:0`;
  const baseCode = course === "html"
    ? "<!doctype html><html><body><h1>مرحبا</h1></body></html>"
    : course === "css" ? ".card { color: red; }" : 'const message = "مرحبا";';
  const practiceCode = course === "html"
    ? baseCode.replace("مرحبا", "أتعلم")
    : course === "css" ? ".card { color: blue; }" : 'const message = "أتعلم";';
  let experimentCode = course === "html"
    ? `${practiceCode}\n<p>تجربتي</p>`
    : course === "css" ? `${practiceCode}\n.card { background: white; }\n.card { opacity: 0.9; }` : `${practiceCode}\nconsole.log(message);\nconsole.log("تجربتي الخاصة");`;
  let fixedCode = course === "html"
    ? `${experimentCode}\n<p>جزء جديد</p>`
    : course === "css" ? `${experimentCode}\n.card { color: #a65d32; }` : `${experimentCode}\nconsole.log("وصلت هنا");`;
  let brokenCode = course === "html"
    ? `${experimentCode}\n<p>جزء جديد</span>`
    : course === "css" ? `${experimentCode}\n.card { colr: #a65d32; }` : `${experimentCode}\nconsole.log("وصلت هنا";`;
  const practiceSteps = course === "html" ? [] : course === "css" ? [
    { before: baseCode, after: practiceCode, from: "color: red;", to: "color: blue;" },
    { before: practiceCode, after: `${practiceCode}\n.card { background: white; }`, from: "color: blue;", to: "color: #35658f;" },
    { before: `${practiceCode}\n.card { background: white; }`, after: `${practiceCode}\n.card { background: white; }\n.card { margin: 12px; }`, from: "background: white;", to: "background: #f7faf5;" }
  ] : [
    { before: baseCode, after: practiceCode, from: "مرحبا", to: "أتعلم" },
    { before: practiceCode, after: `${practiceCode}\nconsole.log(message);`, from: '"أتعلم"', to: '"أتعلم"' },
    { before: `${practiceCode}\nconsole.log(message);`, after: `${practiceCode}\nconsole.log(message);\nconsole.log("وصلت هنا");`, from: "console.log(message);", to: 'console.log("وصلت هنا");' }
  ];
  if (course === "html") {
    const secondEdit = practiceCode.replace("</body>", "<p>ألاحظ النتيجة</p></body>");
    const thirdEdit = secondEdit.replace("<h1>أتعلم</h1>", "<h1>أتعلم HTML</h1>");
    practiceSteps.push(
      { title: "غيّر العنوان", explanation: "العنوان يعرّف محتوى الصفحة.", task: "غيّر العنوان وشغّل.", before: baseCode, after: practiceCode, from: "مرحبا", to: "أتعلم", valid: true },
      { title: "أضف فقرة", explanation: "الفقرة تعرض فكرة مستقلة.", task: "أضف فقرة وشغّل.", before: practiceCode, after: secondEdit, from: "</body>", to: "<p>ألاحظ النتيجة</p></body>", valid: true },
      { title: "وسّع العنوان", explanation: "وسّع المعنى داخل العنوان.", task: "عدّل العنوان وشغّل.", before: secondEdit, after: thirdEdit, from: "<h1>أتعلم</h1>", to: "<h1>أتعلم HTML</h1>", valid: true }
    );
    experimentCode = thirdEdit.replace("</body>", "<p>تجربتي</p></body>");
    fixedCode = `${experimentCode}\n<p>جزء جديد</p>`;
    brokenCode = `${experimentCode}\n<p>جزء جديد</span>`;
  }
  const model = {
    id, key: course, index: 0, topic, objective: "تضيف جزءًا عمليًا إلى صفحتك.",
    concept: "الفكرة تظهر في سطر يمكن ملاحظته.", trace: "مثال ⟶ تعديل ⟶ نتيجة",
    details: course === "html" ? [] : [
      { title: "تفصيلة أولى", flow: "القيمة ⟶ الفعل ⟶ النتيجة", note: "نقرأ خطوة ثم نجرّبها." },
      { title: "تفصيلة ثانية", flow: "نتيجة أولى ⟶ نتيجة ثانية", note: "نقارن التغيير التالي." },
      { title: "تفصيلة ثالثة", flow: "توقع ⟶ تشغيل ⟶ ملاحظة", note: "نربط المثال بهدف الدرس." }
    ],
    breakdown: course === "html" ? [
      { code: "<h1>", meaning: "عنوان الصفحة" },
      { code: "<p>", meaning: "فقرة مستقلة" },
      { code: "</body>", meaning: "نهاية المحتوى الظاهر" }
    ] : [],
    quiz: course === "html" ? null : { question: "أي اختيار يطابق المثال؟", options: ["الإجابة الصحيحة", "إجابة أخرى"], correct: 0 },
    reference: course === "html" ? "" : course === "css" ? "https://www.w3schools.com/css/" : "https://www.w3schools.com/js/",
    code: baseCode, from: "مرحبا", to: "أتعلم", practiceCode, practiceSteps, fixedCode, brokenCode,
    task: "غيّر الجزء المحدد وشغّل المثال.",
    bugQuestion: "لاحظ عدم تطابق السطر.", bugOptions: ["الإجابة الصحيحة", "إجابة أخرى"],
    bugExample: "سطر به خطأ", projectPiece: { id: `lesson-${id}`, label: `درس ${topic}`, course, objective: "جزء من المشروع", code: baseCode }
  };
  const elements = new Map();
  const dots = Array.from({ length: 7 }, () => ({ classList: { toggle() {} } }));
  function element(id) {
    if (elements.has(id)) return elements.get(id);
    const node = {
      textContent: "", value: "", hidden: false, disabled: false, style: {}, attrs: {}, dataset: {},
      classList: { toggle() {}, add() {} },
      setAttribute(name, value) { this.attrs[name] = value; },
      scrollIntoView() {}, focus() {}
    };
    if (id === "guideActions") {
      Object.defineProperty(node, "innerHTML", {
        get() { return this._html || ""; },
        set(value) {
          this._html = value;
          this.answers = Array.from(value.matchAll(/data-growth-answer="(\d+)"/g), (match) => ({
            dataset: { growthAnswer: match[1] }, onclick: null
          }));
          this.quizAnswers = Array.from(value.matchAll(/data-course-quiz-answer="(\d+)"/g), (match) => ({
            dataset: { courseQuizAnswer: match[1] }, onclick: null
          }));
          this.flowAnswers = Array.from(value.matchAll(/data-flow-answer="(\d+)"/g), (match) => ({
            dataset: { flowAnswer: match[1] }, onclick: null
          }));
          this.readingButton = value.includes("data-course-reading-next") ? { onclick: null } : null;
          this.feedback = { textContent: "" };
          this.quizFeedback = { textContent: "" };
          this.addPartButton = value.includes("class=\"growth-add-part\"") ? { onclick: null } : null;
        }
      });
      node.querySelectorAll = (selector) => selector === "[data-growth-answer]" ? node.answers : selector === "[data-course-quiz-answer]" ? node.quizAnswers : selector === "[data-flow-answer]" ? node.flowAnswers : [];
      node.querySelector = (selector) => selector === ".guide-feedback" ? node.feedback : selector === ".course-quiz-feedback" ? node.quizFeedback : selector === ".growth-add-part" ? node.addPartButton : selector === "[data-course-reading-next]" ? node.readingButton : null;
    }
    elements.set(id, node);
    return node;
  }
  const context = {
    course, model, s: { lessons: 0, examples: 0, fixes: 0, progress: 0 },
    growth: { stages: {}, readingSteps: {}, lessonFlow: {}, completed: [], drafts: {}, experimentCodes: {}, repairStarted: {}, answers: {}, projectParts: [], unlocks: [] },
    profileCard: { name: "متعلم" }, data: { [course]: { file: course === "html" ? "index.html" : course === "css" ? "style.css" : "script.js" } },
    abilityCatalog: [], courseTopics: () => [topic], growthLessonModel: () => model,
    growthLessonDone(lessonId) { return context.growth.completed.includes(lessonId); },
    growthDraftFor(current) {
      if (typeof context.growth.drafts[current.id] !== "string") context.growth.drafts[current.id] = current.code;
      return context.growth.drafts[current.id];
    },
    growthPreview(code) { context.lastPreview = code; },
    showPreviewError(message) { context.previewError = message; },
    syncUnlockedParts() { return false; },
    addProjectPart(part) { context.growth.projectParts.push(part); },
    saveGrowth() {}, save() {}, render() {}, renderProfileCard() {}, renderGrowthDashboard() {}, renderRoadmap() {}, cheer() {},
    celebrateGrowth(message) { context.lastReward = message; context.rewards = (context.rewards || 0) + 1; },
    ar: String, escapeHtml: htmlEscape,
    document: {
      body: { classList: { toggle() {}, add() {} } },
      getElementById: element,
      querySelector(selector) { return selector === ".prompt" ? element("prompt") : null; },
      querySelectorAll(selector) { return selector === "#lessonDots .growth-node" ? dots : []; }
    },
    Array, Object, String, Math
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function lessonMixedMarkup(value) {", "  function renderGrowthLesson()"), context);
  for (const [start, end] of [
    ["  function growthLessonDone(id)", "  function renderGrowthLesson()"],
    ["  function coursePracticeStepFor(model) {", "  function fullHtmlDocument("],
    ["  function renderGrowthLesson()", "  function growthPreview(code)"],
    ["  function runDynamicGrowthLesson()", "  function completeGrowthLesson(model)"],
    ["  function completeGrowthLesson(model)", "  function completeDynamicGrowthLesson(model)"],
    ["  function completeDynamicGrowthLesson(model)", "  function reviewPreviousGrowthStep()"],
    ["  function reviewPreviousGrowthStep()", "  function dailyChallengeModel()"]
  ]) vm.runInContext(sourceBetween(start, end), context);
  return { context, model, element };
}

test("all 267 lessons have an outcome and every Unlock maps to a real module", () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(lessonData, context);
  vm.runInContext(sourceBetween(
    "  function lessonObjective(key, topic) {",
    "  function growthLessonModel()"
  ), context);
  vm.runInContext(sourceBetween(
    "  var abilityCatalog = [",
    "  function abilityProgress(ability)"
  ), context);

  const courses = context.window.LESSONS_DATA;
  let total = 0, skillTotal = 0;
  for (const course of ["html", "css", "js"]) {
    assert.ok(Array.isArray(courses[course]) && courses[course].length > 0);
    for (const topic of courses[course]) {
      assert.ok(context.lessonObjective(course, topic).trim(), `${course}: ${topic}`);
      total++;
    }
    let nextTopic = 0;
    assert.ok(Array.isArray(courses.skills[course]) && courses.skills[course].length > 0);
    for (const skill of courses.skills[course]) {
      skillTotal++;
      assert.ok(skill.title.trim(), `${course} skill title`);
      assert.equal(skill.from, nextTopic, `${course}: skill ranges stay in curriculum order`);
      assert.ok(skill.to > skill.from, `${course}: ${skill.title} has lesson requirements`);
      assert.ok(skill.to - skill.from <= 7, `${course}: ${skill.title} stays a small milestone`);
      nextTopic = skill.to;
    }
    assert.equal(nextTopic, courses[course].length, `${course}: every lesson belongs to one skill`);
  }
  assert.equal(total, 267);
  assert.ok(skillTotal >= 50, "the lesson map includes frequent, small skill milestones");
  assert.equal(context.abilityCatalog.length, 8);
  assert.match(indexHtml, /ماذا أستطيع أن أبني الآن؟/);
  assert.match(indexHtml, /١–٥ دقائق/);
  context.abilityProgress = () => ({ unlocked: false });
  vm.runInContext(sourceBetween("  function nextAbilityForCourse(key)", "  function currentTopicIndex(key)"), context);
  assert.equal(context.nextAbilityForCourse("html").title, "صفحة شخصية");
  assert.equal(context.nextAbilityForCourse("css").title, "هوية بصرية");
  assert.equal(context.nextAbilityForCourse("js").title, "بطاقة نتيجة");

  const modules = sourceBetween("  function projectModuleMarkup(exportMode)", "  function renderProjectModules()");
  for (const ability of context.abilityCatalog) {
    assert.ok(ability.title.trim() && ability.project.trim() && ability.tool.trim() && ability.challenge.trim(), ability.id + " unlock includes its feature, tool, challenge, and project part");
    assert.ok(ability.title.trim() && ability.project.trim() && ability.tool.trim() && ability.challenge.trim(), ability.id + " unlock includes its feature, tool, challenge, and project part");
    assert.ok(ability.requires.length > 0, ability.title);
    for (const [course, topic] of ability.requires) assert.ok(courses[course].includes(topic), topic);
    assert.ok(modules.includes(`ability.id === "${ability.id}"`), ability.title);
  }
  context.growth = { projectData: { pageSection: { title: "عنوان", description: "نبذة" }, gallery: [], todos: [], note: "" } };
  context.profileCard = { color: "forest" };
  context.escapeHtml = htmlEscape;
  context.abilityProgress = () => ({ unlocked: true });
  vm.runInContext(modules, context);
  const projectTools = context.projectModuleMarkup();
  for (const ability of context.abilityCatalog) assert.ok(projectTools.includes(`id="projectTool-${ability.id}"`), ability.title);
  assert.match(projectTools, /بياناتك لا تُرسل ولا تُحفظ/);
  const exportedTools = context.projectModuleMarkup(true);
  assert.match(exportedTools, /data-profile-module="signup"/);
  assert.match(exportedTools, /بياناتك لا تُرسل ولا تُحفظ/);
});

test("every CSS and JavaScript lesson has contextual examples and three ordered practice steps", () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(lessonData, context);
  Object.assign(context, context.window.LESSONS_DATA.courseHelpers);
  vm.runInContext(sourceBetween("  function courseExampleCode(key, spec) {", "  function fullHtmlDocument("), context);
  vm.runInContext(sourceBetween("  function growthLessonSteps(model) {", "  function legacyFlowCursor(model, steps) {"), context);
  vm.runInContext(sourceBetween("  function courseW3Reference(key, topic) {", "  function courseDetailsMarkup(details) {"), context);
  vm.runInContext(sourceBetween("  function coursePracticeDone(code, spec) {", "  function clearPreviewStatus() {"), context);
  assert.equal(context.courseW3Reference("css", "CSS Syntax"), "https://www.w3schools.com/css/css_syntax.asp");
  assert.equal(context.courseW3Reference("js", "JS Variables"), "https://www.w3schools.com/js/js_variables.asp");
  assert.equal(context.courseW3Reference("css", "CSS Colors"), "https://www.w3schools.com/css/css_colors.asp");
  const dynamicStepCounts = new Set();
  for (const course of ["css", "js"]) {
    assert.deepEqual(Object.keys(context.window.LESSONS_DATA.references[course]).sort(), [...context.window.LESSONS_DATA[course]].sort(), `${course} has a direct W3Schools reference for every lesson`);
    for (const topic of context.window.LESSONS_DATA[course]) {
      assert.match(context.courseW3Reference(course, topic), new RegExp(`^https://www\\.w3schools\\.com/${course}/.+\\.asp$`), `${topic} has a topic page, not just the course index`);
    }
  }

  for (const course of ["css", "js"]) {
    for (const [index, topic] of context.window.LESSONS_DATA[course].entries()) {
      const spec = course === "css" ? context.cssLessonSpec(topic, index) : context.jsLessonSpec(topic, index);
      const exampleCode = context.courseExampleCode(course, spec);
      spec.details = context.courseLessonDetails(spec, course);
      for (const field of ["concept", "analogy", "flow", "quiz", "code", "from", "to", "task"]) {
        assert.equal(typeof spec[field], "string", `${course} ${topic}: ${field} is text`);
        assert.ok(spec[field].trim(), `${course} ${topic}: ${field} is not empty`);
      }
      assert.ok(Array.isArray(spec.options) && spec.options.length >= 2, `${course} ${topic}: quiz has choices`);
      assert.ok(Number.isInteger(spec.correct) && spec.correct >= 0 && spec.correct < spec.options.length, `${course} ${topic}: quiz answer points to a choice`);
      assert.ok(spec.details.length > 0, `${course} ${topic}: lesson has a trace detail`);
      assert.ok(spec.details.every((detail) => detail.title && detail.flow && detail.note), `${course} ${topic}: every explanation step has a title, trace, and beginner note`);
      const at = exampleCode.lastIndexOf(spec.from);
      assert.ok(at >= 0, `${course} ${topic}: practice target appears in its example`);
      const edited = exampleCode.slice(0, at) + spec.to + exampleCode.slice(at + spec.from.length);
      assert.notEqual(edited, exampleCode, `${course} ${topic}: practice changes the example`);
      const specAt = spec.code.indexOf(spec.from);
      const specEdited = spec.code.slice(0, specAt) + spec.to + spec.code.slice(specAt + spec.from.length);
      assert.equal(context.coursePracticeDone(specEdited, spec), true, `${course} ${topic}: expected lesson edit is accepted`);
      assert.equal(context.coursePracticeDone(spec.code, spec), false, `${course} ${topic}: unchanged lesson example is not accepted`);
      const steps = context.buildCoursePracticeSteps(course, spec, exampleCode);
      assert.equal(steps.length, 3, `${course} ${topic}: three sequential practice steps are available`);
      const flow = context.growthLessonSteps({
        key: course, topic, concept: spec.concept, objective: spec.task, trace: spec.flow, code: exampleCode,
        details: spec.details, quiz: { question: spec.quiz, options: spec.options, correct: spec.correct },
        practiceSteps: steps, bugQuestion: "اكتشف الخطأ", bugOptions: ["السبب", "سبب آخر"],
        bugExample: spec.from, projectPiece: { label: topic }
      });
      dynamicStepCounts.add(flow.length);
      assert.equal(flow.length, 8 + spec.details.length, `${course} ${topic}: step count follows its authored explanation length`);
      assert.ok(flow.every((step) => step.title && step.explanation && step.example && step.task), `${course} ${topic}: every step contains a single explanation and action`);
      assert.equal(flow.filter((step) => step.type === "quiz").length, 1, `${course} ${topic}: the topic check stays with the final explanation`);
      let previous = exampleCode;
      for (const [stepIndex, step] of steps.entries()) {
        assert.equal(step.before, previous, `${course} ${topic}: step ${stepIndex + 1} starts from the saved result`);
        assert.equal(step.valid, true, `${course} ${topic}: step ${stepIndex + 1} has a real edit`);
        const stepPositions = [];
        let stepAt = step.before.indexOf(step.from);
        while (stepAt >= 0) {
          stepPositions.push(step.before.slice(0, stepAt) + step.to + step.before.slice(stepAt + step.from.length));
          stepAt = step.before.indexOf(step.from, stepAt + 1);
        }
        assert.ok(stepPositions.length > 0, `${course} ${topic}: step ${stepIndex + 1} target exists`);
        assert.ok(stepPositions.includes(step.after), `${course} ${topic}: step ${stepIndex + 1} makes only its stated edit`);
        assert.ok(step.title && step.explanation && step.task, `${course} ${topic}: step ${stepIndex + 1} has direct guidance`);
        previous = step.after;
      }
      if (course === "js") {
        assert.doesNotThrow(() => new Function(exampleCode), `${course} ${topic}: generated example parses`);
        for (const [stepIndex, step] of steps.entries()) {
          assert.doesNotThrow(() => new Function(step.after), `${course} ${topic}: practice step ${stepIndex + 1} remains runnable`);
          if (stepIndex > 0) assert.match(step.task, new RegExp(topic), `${course} ${topic}: later edits stay tied to this lesson`);
        }
      }
      assert.ok(spec.details.length >= 3, `${course} ${topic}: example has an explanation plus execution trace`);
    }
  }
  assert.deepEqual([...dynamicStepCounts].sort((a, b) => a - b), [11, 12], "CSS and JavaScript lengths vary with their explanations");
});

test("signup tool confirms the entered name locally without storing or echoing the email", () => {
  const calls = {};
  const status = { textContent: "" };
  const name = { value: "ليلى <img src=x>", focus() { calls.focused = true; } };
  const form = {
    elements: { name, email: { value: "private@example.com" } },
    querySelector(selector) { return selector === "[data-form-status]" ? status : null; }
  };
  const host = {
    innerHTML: "",
    querySelectorAll(selector) { return selector === '[data-profile-module="signup"]' ? [form] : []; }
  };
  const context = {
    projectModuleMarkup: () => '<form data-profile-module="signup"></form>',
    document: { getElementById(id) { return id === "profileFeatureModules" ? host : null; } },
    saveGrowth() { calls.saved = true; }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function showSignupPreview(form, event) {", "  function refreshProfileExportCode()"), context);
  context.renderProjectModules();
  let prevented = false;
  form.onsubmit({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.match(status.textContent, /نجحت التجربة يا ليلى <img src=x>/);
  assert.ok(!status.textContent.includes("private@example.com"));
  assert.match(status.textContent, /لم نرسل أو نحفظ بياناتك/);
  assert.equal(calls.saved, undefined);

  name.value = "   ";
  form.onsubmit({ preventDefault() {} });
  assert.match(status.textContent, /اكتب اسمًا/);
  assert.equal(calls.focused, true);
});

test("skill milestones complete only after all mapped lessons are complete", () => {
  const context = { window: {}, growth: { completed: [] } };
  vm.createContext(context);
  vm.runInContext(lessonData, context);
  vm.runInContext(sourceBetween("  var htmlSequence =", "  function loadGrowth()"), context);
  vm.runInContext(sourceBetween("  function lessonId(key, index)", "  var abilityCatalog = ["), context);

  const firstSkill = context.skillCatalog[0];
  for (let index = firstSkill.from; index < firstSkill.to - 1; index++) context.growth.completed.push(`html:${index}`);
  assert.equal(context.skillProgress(firstSkill).completed, false);
  assert.equal(context.completedSkills().length, 0);
  context.growth.completed.push(`html:${firstSkill.to - 1}`);
  assert.equal(context.skillProgress(firstSkill).completed, true);
  assert.equal(context.completedSkills().length, 1);
  assert.equal(context.nextSkillForCourse("html").title, "العناوين والنصوص");
});

test("the project gallery saves four safe photos and exports them without editor controls", () => {
  const context = {
    growth: { projectParts: [], projectData: { gallery: [], todos: [], note: "", pageSection: { title: "عنوان", description: "نبذة" } } },
    abilityCatalog: [{ id: "photo-gallery" }], abilityProgress: () => ({ unlocked: true }),
    profileCard: { color: "forest" }, escapeHtml: htmlEscape,
    todayKey: () => "2026-11-02", Date, Math,
    addProjectPart(part) { context.growth.projectParts.push(part); return true; },
    saveGrowth() { context.saved = true; }, renderProfileCard() { context.rendered = true; },
    renderGrowthDashboard() {}, refreshProfileExportCode() {},
    celebrateGrowth(message) { context.reward = message; }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function projectModuleMarkup(exportMode)", "  function renderProjectModules()"), context);
  vm.runInContext(sourceBetween("  function addGalleryPhoto(data, caption, alt)", "  function refreshProfileExportCode()"), context);
  const image = "data:image/jpeg;base64,AA==";
  assert.equal(context.addGalleryPhoto(image, "<script>عنوان</script>", "وصف <صورة>"), true);
  assert.equal(context.growth.projectData.gallery.length, 1);
  assert.equal(context.growth.projectParts.length, 1);
  assert.equal(context.saved, true);
  assert.equal(context.rendered, true);
  assert.match(context.reward, /معرضك الشخصي/);

  const interactive = context.projectModuleMarkup(false);
  assert.match(interactive, /type="file"/);
  assert.match(interactive, /data-gallery-remove="0"/);
  assert.match(interactive, /&lt;script&gt;عنوان&lt;\/script&gt;/);
  assert.match(interactive, /وصف &lt;صورة&gt;/);
  const exported = context.projectModuleMarkup(true);
  assert.match(exported, /src="data:image\/jpeg;base64,AA=="/);
  assert.ok(!exported.includes('data-profile-module="gallery"'));
  assert.ok(!exported.includes("data-gallery-remove"));
  assert.ok(!exported.includes('type="file"'));
  assert.equal(context.removeGalleryPhoto(0), true);
  assert.equal(context.growth.projectData.gallery.length, 0);
  assert.equal(context.removeGalleryPhoto(99), false);
  assert.match(context.projectModuleMarkup(true), /المعرض جاهز لعرض صور من تجاربك/);

  assert.equal(context.addGalleryPhoto("javascript:alert(1)", "غير آمن", "صورة"), false);
  for (let index = 1; index <= 4; index++) assert.equal(context.addGalleryPhoto(image, `صورة ${index}`, `وصف ${index}`), true);
  assert.equal(context.addGalleryPhoto(image, "الصورة الخامسة", "وصف"), false);
  assert.equal(context.growth.projectData.gallery.length, 4);
});

test("saved gallery data is limited to four small JPEGs with plain text labels", () => {
  const valid = (index) => ({
    id: `p-${index}`, src: `data:image/jpeg;base64,${"A".repeat(12)}`,
    alt: `<img ${index}>`, caption: `صورة ${index}`
  });
  const saved = {
    completed: ["html:0", "html:0", "unknown", 9],
    stages: { "html:0": "damaged", "html:1": 8, "css:1": 6 },
    readingSteps: { "css:1": 3, "js:1": 11, "bad:key": 2 },
    lessonFlow: { "css:1": { current: 3, unlocked: 5 }, "html:1": { current: 4, unlocked: 2 }, "bad:key": { current: 1, unlocked: 2 } },
    baseCodes: { "html:0": { broken: true }, "html:1": "<h1>عنوان</h1>", "bad:key": "ignored" },
    drafts: { "html:0": "x".repeat(30001), "js:1": "مسودة سليمة" },
    repairStarted: { "html:0": "yes", "css:1": true },
    answers: { "bug:html:0": true, "quiz:css:1": true, "html:0": true, "quiz:unknown:1": true },
    unlocks: ["personal-page", "bad id"],
    daily: { day: "not-a-date", completed: true, result: "نتيجة" },
    lastActiveDate: "yesterday",
    projectData: {
      todos: ["م".repeat(100), 2],
      gallery: [valid(1), { ...valid(2), src: "data:image/svg+xml,<svg>" }, ...Array.from({ length: 5 }, (_, i) => valid(i + 3))]
    }
  };
  const context = { growthKey: "growth", localStorage: { getItem: () => JSON.stringify(saved) }, JSON, Array, Object, Math, isFinite };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function loadGrowth() {", "  function saveGrowth()"), context);
  const growth = context.loadGrowth(), gallery = growth.projectData.gallery;
  assert.equal(gallery.length, 4);
  assert.deepEqual(Array.from(gallery, (photo) => photo.id), ["p-4", "p-5", "p-6", "p-7"]);
  assert.equal(gallery[0].alt, "<img 4>");
  assert.deepEqual(Array.from(growth.completed), ["html:0"]);
  assert.deepEqual({ ...growth.stages }, { "css:1": 6 });
  assert.deepEqual({ ...growth.readingSteps }, { "css:1": 3 }, "per-lesson explanation progress is bounded and ignores damaged keys");
  assert.equal(JSON.stringify(growth.lessonFlow), JSON.stringify({ "css:1": { current: 3, unlocked: 5 } }), "dynamic step positions are validated and damaged cursors are ignored");
  assert.equal(growth.baseCodes["html:0"], undefined);
  assert.equal(growth.baseCodes["html:1"], "<h1>عنوان</h1>");
  assert.equal(growth.drafts["html:0"].length, 30000);
  assert.deepEqual({ ...growth.repairStarted }, { "css:1": true });
  assert.deepEqual({ ...growth.answers }, { "bug:html:0": true, "quiz:css:1": true });
  assert.deepEqual(Array.from(growth.unlocks), ["personal-page"]);
  assert.equal(growth.daily.day, "");
  assert.equal(growth.lastActiveDate, "");
  assert.equal(growth.projectData.todos[0].length, 80);
});

test("gallery uploads reject unsupported files and compress accepted images", () => {
  let canvasSize;
  const context = {
    FileReader: class {
      readAsDataURL() { this.result = "data:image/png;base64,AA=="; this.onload(); }
    },
    Image: class {
      constructor() { this.width = 720; this.height = 360; }
      set src(value) { this._src = value; this.onload(); }
    },
    document: {
      createElement() {
        return {
          getContext() { return { drawImage() {} }; },
          toDataURL() { return `data:image/jpeg;base64,${"A".repeat(20)}`; },
          set width(value) { canvasSize = canvasSize || {}; canvasSize.width = value; },
          set height(value) { canvasSize = canvasSize || {}; canvasSize.height = value; }
        };
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function resizeGalleryImage(file, done)", "  function addGalleryPhoto(data, caption, alt)"), context);
  let result;
  context.resizeGalleryImage({ type: "image/gif", size: 100 }, (data, error) => { result = { data, error }; });
  assert.equal(result.data, null);
  assert.match(result.error, /JPG أو PNG أو WebP/);

  context.resizeGalleryImage({ type: "image/png", size: 1024 }, (data, error) => { result = { data, error }; });
  assert.match(result.data, /^data:image\/jpeg;base64,/);
  assert.equal(result.error, "");
  assert.deepEqual(canvasSize, { width: 360, height: 180 });
});

test("each course reveals one dynamic lesson step at a time and requires every experiment", () => {
  for (const course of ["html", "css", "js"]) {
    const { context, model, element } = lessonContext(course);
    const flow = context.growthLessonSteps(model);
    context.renderGrowthLesson();
    assert.match(element("guideCount").textContent, new RegExp(`من ${flow.length}`));
    assert.equal(element("guideMeter").style.width, "0%");
    assert.equal(element("code").value, model.code, "the complete runnable example remains in the editor");
    assert.doesNotMatch(element("guideVisual").innerHTML, /تفصيلة ثانية|تفصيلة ثالثة/, "only the active explanation is visible");
    assert.equal(element("lessonDots").attrs["aria-valuemax"], String(flow.length), "the progress indicator uses the lesson's own step count");

    element("code").value = model.code;
    context.runGrowthLesson();
    assert.equal(context.growth.lessonFlow[model.id].current, 1, "running the first example opens one next step");
    assert.equal(context.growth.lessonFlow[model.id].unlocked, 1);
    element("guidePrevious").onclick();
    assert.equal(context.growth.lessonFlow[model.id].current, 0, "the learner can review a previous step");
    assert.equal(context.growth.lessonFlow[model.id].unlocked, 1, "review does not lose completed progress");
    context.advanceGrowthLesson();
    assert.equal(context.growth.lessonFlow[model.id].current, 1, "the already opened step can be revisited without repeating its task");

    let attempts = 0;
    while (context.growth.lessonFlow[model.id].current < flow.length) {
      assert.ok(++attempts <= flow.length + 2, `${course} dynamic flow stalled at ${context.growth.lessonFlow[model.id].current} (${flow[context.growth.lessonFlow[model.id].current]?.id}/${flow[context.growth.lessonFlow[model.id].current]?.type}): ${element("hint").textContent}`);
      const state = context.growth.lessonFlow[model.id];
      const step = flow[state.current];
      context.renderGrowthLesson();
      if (step.type === "observe") {
        element("code").value = context.growth.drafts[model.id] || model.code;
        context.runGrowthLesson();
      } else if (step.type === "quiz" || step.type === "diagnose") {
        const answers = element("guideActions").flowAnswers;
        const previous = state.current;
        answers[1].onclick();
        assert.equal(context.growth.lessonFlow[model.id].current, previous, `${step.type} rejects an incorrect answer`);
        answers[0].onclick();
      } else if (step.type === "edit") {
        const previous = state.current;
        element("code").value = "تعديل غير مطابق";
        context.runGrowthLesson();
        assert.equal(context.growth.lessonFlow[model.id].current, previous, "a guided edit cannot be skipped");
        element("code").value = step.after;
        context.runGrowthLesson();
      } else if (step.type === "experiment") {
        const lastEdit = model.practiceSteps[model.practiceSteps.length - 1].after;
        element("code").value = course === "html"
          ? lastEdit.replace("</body>", "<p>تجربتي</p></body>")
          : course === "css" ? `${lastEdit}\n.card { outline: 1px solid green; }` : `${lastEdit}\nconsole.log("تجربتي");`;
        context.runGrowthLesson();
      } else if (step.type === "repair") {
        const previous = state.current;
        element("code").value = "إصلاح غير مطابق";
        context.runGrowthLesson();
        assert.equal(context.growth.lessonFlow[model.id].current, previous, "repair requires the expected correction");
        element("code").value = model.fixedCode;
        context.runGrowthLesson();
      } else if (step.type === "project") {
        assert.equal(element("guideActions").addPartButton !== null, true);
        element("guideActions").addPartButton.onclick();
        break;
      } else assert.fail(`unexpected step type ${step.type}`);
    }

    assert.deepEqual(Array.from(context.growth.completed), [model.id]);
    assert.equal(context.growth.projectParts.length, 1);
    assert.equal(context.s.lessons, 1);
    assert.equal(element("guideMeter").style.width, "100%");
    assert.equal(element("code").readOnly, false, "completed examples remain editable when reopened");
  }
});

test("saved legacy stages and reading positions migrate to the matching dynamic step", () => {
  const html = lessonContext("html");
  html.context.growth.stages[html.model.id] = 2;
  const htmlFlow = html.context.growthLessonSteps(html.model);
  const htmlState = html.context.growthLessonFlowState(html.model, htmlFlow);
  assert.equal(htmlFlow[htmlState.current].id, "edit-2", "completed HTML edits stay complete during migration");

  const css = lessonContext("css");
  css.context.growth.stages[css.model.id] = 1;
  css.context.growth.readingSteps[css.model.id] = 1;
  const cssFlow = css.context.growthLessonSteps(css.model);
  const cssState = css.context.growthLessonFlowState(css.model, cssFlow);
  assert.equal(cssFlow[cssState.current].id, "detail-1", "the saved explanation position is restored");

  const js = lessonContext("js");
  js.context.growth.stages[js.model.id] = 2;
  js.context.growth.drafts[js.model.id] = js.model.practiceSteps[1].after;
  const jsFlow = js.context.growthLessonSteps(js.model);
  const jsState = js.context.growthLessonFlowState(js.model, jsFlow);
  assert.equal(jsFlow[jsState.current].id, "edit-2", "the saved editor draft selects the next unfinished edit");
});

test("the lesson presents one goal and keeps the full roadmap collapsed", () => {
  const { context, model, element } = lessonContext("html");
  context.renderGrowthLesson();
  assert.equal(element("sub").textContent, model.objective);
  assert.equal(element("lessonObjective").hidden, true);
  assert.equal(element("prompt").hidden, true);
  assert.match(indexHtml, /<details id="roadmap">/);
  assert.doesNotMatch(indexHtml, /<details id="roadmap"[^>]*\bopen\b/);
  assert.match(app, /roadList\.innerHTML = list\(course, 0, Math\.min\(8, sequence\.length\)\)/);
  assert.match(app, /getElementById\("roadMore"\)\.innerHTML = list\(course, 8, sequence\.length\)/);
});

test("a reward plays a soft tone, shows a message, and animates its target", () => {
  const events = {};
  const audio = {
    state: "running", currentTime: 0, destination: {},
    createOscillator() {
      return {
        frequency: {}, connect() {},
        start() { events.started = true; }, stop(time) { events.stoppedAt = time; }
      };
    },
    createGain() {
      return {
        gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}
      };
    }
  };
  const target = { classList: { remove() {}, add(name) { events.animation = name; } }, offsetWidth: 10 };
  const toast = { textContent: "" };
  const context = {
    s: { volume: 25 }, ctx: null,
    window: { AudioContext: function MockAudioContext() { return audio; } },
    document: {
      querySelector() { return target; },
      getElementById() { return toast; }
    },
    cheer() { events.cheer = true; },
    setTimeout(callback, delay) { events.delay = delay; return 1; },
    clearTimeout() {}
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function celebrateGrowth(message, selector) {", "  function renderGrowthDashboard()"), context);
  context.celebrateGrowth("خطوة اكتملت", "#lesson");
  assert.equal(events.started, true);
  assert.equal(events.stoppedAt, 0.22);
  assert.equal(events.animation, "growth-pop");
  assert.equal(events.cheer, true);
  assert.equal(events.delay, 900);
  assert.equal(toast.textContent, "✓ خطوة اكتملت");
});

test("daily challenges act on HTML, CSS, and JavaScript and complete their progress bar", () => {
  const cases = [
    { course: "html", topic: "HTML Forms", value: "اسم الحقل" },
    { course: "css", topic: "CSS Flexbox", color: "ocean" },
    { course: "js", topic: "JS Arrays", value: "أضيف معرض الصور" }
  ];

  for (const item of cases) {
    const { context, getElement, calls } = dailyContext(item.course, item.topic);
    context.renderDailyChallenge();
    assert.equal(getElement("dailyChallengeProgress").attrs["aria-valuenow"], "0");

    const host = getElement("dailyChallengeAnswers");
    const form = host.form;
    const colorButton = item.course === "css"
      ? host.buttons.find((button) => button.dataset.dailyColor === item.color)
      : null;
    if (item.course === "css") {
      colorButton.onclick();
      assert.equal(context.profileCard.color, item.color);
      assert.equal(calls.saveProfileCard, 1);
    } else {
      form.elements.dailyText.value = item.value;
      form.onsubmit({ preventDefault() {} });
      assert.equal(context.growth.projectParts[0].note, item.value);
      if (item.course === "js") assert.deepEqual(Array.from(context.growth.projectData.todos), [item.value]);
    }

    assert.equal(context.growth.daily.completed, true);
    assert.equal(context.s.progress, 1);
    assert.equal(calls.rewards, 1);
    assert.equal(getElement("dailyChallengeProgress").attrs["aria-valuenow"], "100");
    assert.equal(getElement("dailyChallengeProgressBar").style.width, "100%");
    if (item.course === "css") colorButton.onclick();
    else form.onsubmit({ preventDefault() {} });
    assert.equal(context.s.progress, 1, "same-day replay cannot duplicate progress");
    assert.equal(calls.rewards, 1, "same-day replay cannot duplicate the reward");
    assert.equal(context.growth.projectParts.length, 1, "same-day replay cannot duplicate the project part");
  }
});

test("daily prompts change with the date and stay stable during that day", () => {
  for (const item of [
    { course: "html", topic: "HTML Basic" },
    { course: "css", topic: "CSS Colors" },
    { course: "js", topic: "JS Variables" }
  ]) {
    const today = dailyContext(item.course, item.topic, "2026-11-02").context.dailyChallengeModel();
    const sameDay = dailyContext(item.course, item.topic, "2026-11-02").context.dailyChallengeModel();
    const tomorrow = dailyContext(item.course, item.topic, "2026-11-03").context.dailyChallengeModel();
    assert.equal(today.prompt, sameDay.prompt, `${item.course}: the prompt does not change while the learner is working`);
    assert.notEqual(today.prompt, tomorrow.prompt, `${item.course}: the next day offers a fresh prompt`);
    if (item.course === "js") assert.equal(today.action, undefined);
  }
});

test("an empty daily text task is not counted as progress", () => {
  const { context, getElement, calls } = dailyContext("html", "HTML Images");
  context.renderDailyChallenge();
  const form = getElement("dailyChallengeAnswers").form;
  form.elements.dailyText.value = "   ";
  form.onsubmit({ preventDefault() {} });
  assert.equal(context.growth.daily.completed, undefined);
  assert.equal(context.s.progress, 0);
  assert.equal(calls.rewards || 0, 0);
  assert.equal(getElement("dailyChallengeProgress").attrs["aria-valuenow"], "0");
});

test("project archive keeps older parts, exports them, and omits editor controls", () => {
  const context = {
    growth: { projectParts: Array.from({ length: 15 }, (_, index) => ({
      id: `lesson-html:${index}`, course: "html", label: `درس ${index}`,
      objective: `أثر ${index}`, note: index === 14 ? "<script>alert(1)</script>" : "",
      code: index === 0 ? "<h1>تجربتي</h1>" : `<p>${index}</p>`
    })) },
    profileCard: { color: "forest", name: "متعلم", role: "مطور", about: "أتعلم", image: "" },
    profileThemes: { forest: { accent: "#286b56", soft: "#eaf3e9", ink: "#19372e" } },
    profileInitials: () => "م",
    data: { html: { build(code) { return "<!doctype html><html lang='ar'><body>" + code + "</body></html>"; } } },
    ar: String,
    escapeHtml: htmlEscape,
    projectModuleMarkup: () => ""
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween(
    "  function projectPartMarkup(part, interactive) {",
    "  function syncUnlockedParts()"
  ), context);
  vm.runInContext(sourceBetween(
    "  function buildProfileHtmlWithParts() {",
    "  function buildProfileHtml()"
  ), context);
  vm.runInContext(sourceBetween(
    "  function buildProfileHtml() {",
    "  function advanceProjectStep()"
  ), context);

  const appList = context.projectPartListMarkup(true);
  assert.equal((appList.match(/class="project-artifact"/g) || []).length, 15);
  assert.equal((appList.match(/data-open-project-part=/g) || []).length, 15);
  assert.match(appList, /project-artifact-archive/);
  assert.match(appList, /شوف 3 لبنات أقدم/);

  const exported = context.buildProfileHtmlWithParts();
  for (let index = 0; index < 15; index++) assert.ok(exported.includes(`درس ${index}`));
  assert.match(exported, /لبنات مشروعي · 15 محفوظة/);
  assert.ok(exported.includes("&lt;h1&gt;تجربتي&lt;/h1&gt;"));
  assert.match(exported, /class="latest-build"/);
  assert.match(exported, /class="latest-build-preview"[^>]+sandbox="allow-scripts allow-modals"/);
  assert.ok(exported.includes("&lt;!doctype html&gt;&lt;html lang=&#39;ar&#39;&gt;&lt;body&gt;&lt;p&gt;14&lt;/p&gt;"));
  assert.ok(exported.includes("<b>درس 14</b><p>&lt;script&gt;alert(1)&lt;/script&gt;</p>"));
  assert.match(exported, /نجحت التجربة يا/);
  assert.match(exported, /لم نرسل أو نحفظ بياناتك/);
  assert.ok(!exported.includes("data-open-project-part"));
});

test("the latest project artifact appears as text and its lesson code runs in a sandboxed card preview", () => {
  const nodes = {
    profileLatestBuild: { hidden: true },
    profileLatestTitle: { textContent: "" },
    profileLatestCopy: { textContent: "" },
    profileLatestPreview: { hidden: true, srcdoc: "", title: "", dataset: {} }
  };
  const context = {
    growth: { projectParts: [{ label: "رسالة تفاعلية", note: "<img src=x onerror=alert(1)>" }] },
    document: { getElementById(id) { return nodes[id]; } },
    latestProjectPartText: (part) => String(part.note || part.objective || "").slice(0, 180)
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function renderLatestProjectPart() {", "  function addProjectPart(part)"), context);
  context.renderLatestProjectPart();
  assert.equal(nodes.profileLatestBuild.hidden, false);
  assert.equal(nodes.profileLatestTitle.textContent, "رسالة تفاعلية");
  assert.equal(nodes.profileLatestCopy.textContent, "<img src=x onerror=alert(1)>");
  assert.equal(nodes.profileLatestPreview.hidden, true, "text artifacts do not try to run as lesson code");
  context.growth.projectParts = [];
  context.renderLatestProjectPart();
  assert.equal(nodes.profileLatestBuild.hidden, true);
  assert.equal(nodes.profileLatestCopy.textContent, "");

  const builds = { html: 0, css: 0, js: 0 };
  context.data = {
    html: { build(code) { builds.html++; return "<html><body>HTML · " + code + "</body></html>"; } },
    css: { build(code) { builds.css++; return "<html><body><style>" + code + "</style></body></html>"; } },
    js: { build(code) { builds.js++; return "<html><body><pre>JS · " + code + "</pre></body></html>"; } }
  };
  for (const course of ["html", "css", "js"]) {
    const code = course === "css" ? ".card{color:blue}" : course === "html" ? "<h1>عنواني</h1>" : 'console.log("وصلت");';
    context.growth.projectParts = [{ id: `lesson-${course}:1`, course, code, label: `لبنة ${course}`, note: "أضفتها للمشروع" }];
    context.renderLatestProjectPart();
    assert.equal(nodes.profileLatestPreview.hidden, false, course);
    const expectedPreview = course === "html" ? `<html><body>HTML · ${code}</body></html>` : course === "css" ? `<html><body><style>${code}</style></body></html>` : `<html><body><pre>JS · ${code}</pre></body></html>`;
    assert.equal(nodes.profileLatestPreview.srcdoc, expectedPreview, course);
    assert.equal(nodes.profileLatestPreview.title, `معاينة لبنة ${course}`, course);
    assert.equal(builds[course], 1, `${course} preview is built once`);
    context.growth.projectParts[0].label = `عنوان محدث ${course}`;
    context.renderLatestProjectPart();
    assert.equal(nodes.profileLatestPreview.title, `معاينة عنوان محدث ${course}`, course);
    assert.equal(builds[course], 1, `${course} preview does not rerun for profile text changes`);
    context.growth.projectParts[0].code += " ";
    context.renderLatestProjectPart();
    assert.equal(builds[course], 2, `${course} preview rebuilds when lesson code changes`);
  }
  context.growth.projectParts = [{ label: "لبنة نصية", note: "بدون معاينة" }];
  context.renderLatestProjectPart();
  assert.equal(nodes.profileLatestPreview.hidden, true);
  assert.equal(nodes.profileLatestPreview.srcdoc, "");
  assert.equal(nodes.profileLatestPreview.dataset.previewCourse, "");
  assert.match(indexHtml, /id="profileLatestPreview"[^>]+sandbox="allow-scripts allow-modals"/);
});

test("restoring a project part reopens its saved lesson in the editor", () => {
  const events = {};
  const part = { id: "lesson-css:2", course: "css", code: ".card { color: blue; }" };
  const elements = {
    lesson: { scrollIntoView(options) { events.scroll = options; } },
    code: { focus() { events.focused = true; } },
    toast: { textContent: "", classList: { add(name) { events.toast = name; }, remove() {} } }
  };
  const context = {
    growth: { projectParts: [part], drafts: {} }, s: {}, toastId: null,
    courseTopics: () => Array(10), lessonId: (course, index) => `${course}:${index}`,
    saveGrowth() { events.growthSaved = true; }, save() { events.saved = true; },
    select(course) { events.course = course; },
    document: { getElementById(id) { return elements[id]; } },
    clearTimeout() {}, setTimeout() { return 1; },
    escapeHtml: htmlEscape, Math
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function openProjectPart(partId) {", "  function renderProfileCard()"), context);
  assert.equal(context.openProjectPart(part.id), true);
  assert.equal(context.s.cssLesson, 2);
  assert.equal(context.s.cssCode, part.code);
  assert.equal(context.growth.drafts["css:2"], part.code);
  assert.equal(events.course, "css");
  assert.equal(events.focused, true);
  assert.equal(context.openProjectPart("daily-2026-11-02"), false);
});

test("dashboard counts the main project once and shows the latest saved result", () => {
  const elements = {};
  function getElement(id) {
    return elements[id] || (elements[id] = {
      textContent: "", innerHTML: "", hidden: false, style: {},
      classList: { toggle() {} }, querySelector() { return { textContent: "" }; }
    });
  }
  const checks = Array.from({ length: 3 }, () => ({
    classList: { toggle() {} }, querySelector() { return { textContent: "" }; }
  }));
  const context = {
    window: {},
    growth: { daily: {}, completed: ["html:0"], projectParts: [
      { label: "عنوان" }, { label: "مهمة" }, { label: "رسالة", note: "أضيف معرض الصور" }
    ] },
    profileCard: { name: "متعلم", role: "مطور", about: "أتعلم" }, awayDays: 3,
    abilityCatalog: [
      { id: "a", title: "قدرة مكتسبة", icon: "✓", tool: "الأداة أ", challenge: "تجربة أ", requires: [["html", "أ"]] },
      { id: "b", title: "القدرة التالية", icon: "+", tool: "الأداة ب", project: "قسم جديد", challenge: "تجربة ب", requires: [["html", "ب"], ["css", "ج"]] }
    ],
    abilityProgress: (ability) => ability.id === "a"
      ? { done: 1, total: 1, percent: 100, unlocked: true }
      : { done: 1, total: 2, percent: 50, unlocked: false },
    nextAbilityForCourse: () => context.abilityCatalog.filter((ability) => !context.abilityProgress(ability).unlocked)[0],
    syncUnlockedParts: () => false,
    growthLessonModel: () => ({ id: "html:1", key: "html", topic: "Topic for test", objective: "Long objective for test" }),
    growthLessonDone: () => false, todayKey: () => "2026-11-02",
    ar: (value) => String(value).replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]),
    escapeHtml: String,
    document: {
      getElementById: getElement,
      querySelectorAll(selector) { return selector === "#projectChecks .check" ? checks : []; }
    },
    saveGrowth() {}, renderProfileCard() {}
  };
  vm.createContext(context);
  vm.runInContext(lessonData, context);
  vm.runInContext(sourceBetween("  var htmlSequence =", "  function loadGrowth()"), context);
  vm.runInContext(sourceBetween("  function lessonId(key, index)", "  var abilityCatalog = ["), context);
  vm.runInContext(sourceBetween("  function renderGrowthDashboard() {", "  function normalizeHtmlStep()"), context);
  context.renderGrowthDashboard();
  assert.match(getElement("heroNextTitle").textContent, /Topic for test$/);
  assert.doesNotMatch(getElement("heroNextTitle").textContent, /Long objective for test/);
  assert.equal(getElement("openProjectCount").textContent, "١");
  assert.equal(getElement("heroProjectMeta").textContent, "لبنات أُضيفت للمشروع · ٣");
  assert.equal(getElement("abilityCount").textContent, "١");
  assert.match(getElement("abilitiesList").innerHTML, /href="#projectTool-a"/);
  assert.match(getElement("abilitiesList").innerHTML, /جرّبها في مشروعك/);
  assert.equal(getElement("skillCount").textContent, "٠");
  assert.match(getElement("skillProgressLabel").textContent, /بنية صفحة HTML · ١\/٤/);
  assert.match(getElement("skillMilestonesList").innerHTML, /كل مجموعة مكتملة/);
  assert.equal(getElement("nextUnlockProgress").textContent, "٥٠٪");
  assert.equal(getElement("projectLatestUpdate").textContent, "آخر إضافة: أضيف معرض الصور");
  assert.match(getElement("returnMessage").textContent, /نكمل من آخر خطوة/);
  assert.match(getElement("continue").textContent, /نكمل من آخر خطوة/);
});

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function sourceBetween(start, end) {
  const i = app.indexOf(start);
  const j = app.indexOf(end, i);
  if (i < 0 || j < 0) throw new Error("missing boundary: " + start + " -> " + end);
  return app.slice(i, j);
}

function htmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function makeMockDoc() {
  const map = new Map();
  function node(id) {
    if (map.has(id)) return map.get(id);
    const el = {
      id,
      textContent: "",
      value: "",
      hidden: false,
      disabled: false,
      readOnly: false,
      style: {},
      dataset: {},
      attrs: {},
      _html: "",
      _children: [],
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        toggle(c, force) {
          if (force === undefined) {
            if (this._set.has(c)) this._set.delete(c); else this._set.add(c);
          } else if (force) this._set.add(c); else this._set.delete(c);
        },
        contains(c) { return this._set.has(c); }
      },
      setAttribute(k, v) { this.attrs[k] = String(v); },
      removeAttribute(k) { delete this.attrs[k]; },
      focus() {},
      scrollIntoView() {},
      querySelectorAll() { return []; },
      querySelector() { return null; }
    };
    Object.defineProperty(el, "innerHTML", {
      configurable: true,
      get() { return this._html; },
      set(val) { this._html = String(val); }
    });
    map.set(id, el);
    return el;
  }
  return {
    node,
    doc: {
      getElementById: node,
      querySelector(sel) { return sel === "#lesson article.card" ? node("lessonCard") : null; },
      querySelectorAll() { return []; }
    }
  };
}

function createCuriosityContext(initialGrowth) {
  const { node, doc } = makeMockDoc();
  const context = {
    course: "html",
    s: { lessons: 0, examples: 0, fixes: 0, progress: 0, htmlLesson: 0, cssLesson: 0, jsLesson: 0, databaseLesson: 0 },
    growth: initialGrowth || { completed: [], stages: {}, lessonFlow: {}, drafts: {}, answers: {}, projectParts: [], unlocks: [] },
    data: {
      html: { code: "<h1>مرحبا</h1>", file: "index.html", build: (c) => `<html><body>${c}</body></html>` },
      css: { code: ".card { color: red; }", file: "style.css", build: (c) => `<style>${c}</style>` },
      js: { code: "console.log(1);", file: "script.js", build: (c) => `<script>${c}<\/script>` },
      database: { code: "SELECT * FROM products;", file: "query.sql", build: (q) => `<table>${q}</table>` }
    },
    model: {
      id: "css:2",
      key: "css",
      index: 2,
      topic: "CSS Colors",
      objective: "تلوين البطاقة والنصوص بوضوح.",
      concept: "خاصية color تغير لون النص فورًا.",
      code: ".card { color: #2bb07f; }",
      practiceSteps: [{ from: "#2bb07f", to: "#bbf268", benefit: "فائدة: يتحول النص إلى أخضر مضيء فورًا", explanation: "اختبار تباين اللون" }],
      bugExample: ".card { colr: red; }",
      bugQuestion: "ما الخطأ في الخاصية؟",
      bugOptions: ["اسم الخاصية ناقص حرف o", "اللون غير صحيح"],
      bugCorrect: 0,
      bugExplanation: "الصحيح color وليس colr."
    },
    courseTopics(key) { return [key + " 0", key + " 1", key + " 2", key + " 3"]; },
    courseLabel(key) { return key.toUpperCase(); },
    currentTopicIndex() { return 2; },
    growthLessonModel() { return context.model; },
    growthLessonDone() { return false; },
    saveGrowth() { context.savedGrowthCount = (context.savedGrowthCount || 0) + 1; },
    save() { context.savedCount = (context.savedCount || 0) + 1; },
    render() { context.rendered = (context.rendered || 0) + 1; },
    renderGrowthLesson() { context.renderedLesson = (context.renderedLesson || 0) + 1; },
    select(k) { context.selectedCourse = k; },
    openRoadTopic(k, idx) { context.openedRoad = [k, idx]; },
    growthPreview(code, k) { context.lastPreview = { code, k }; },
    celebrateGrowth(msg, sel) { context.lastCelebration = { msg, sel }; },
    ar: (v) => String(v),
    escapeHtml: htmlEscape,
    document: doc,
    Date, Math, Array, Object, String, Number
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function todayKey() {", "  function lessonId(key, index)"), context);
  return { context, node };
}

test("HTML & CSS include the curiosity hero box, predict hook, free tinker toolbar, and project curiosity panels", () => {
  for (const id of ["heroCuriosityBox", "heroSparkRun", "heroIdeaForm", "predictHookCard", "tinkerModeBtn", "tinkerToolbar", "pinIdeaFromLesson", "projectIdeaList", "projectTinkerSnapshots"]) {
    assert.ok(indexHtml.includes(`id="${id}"`), `Missing #${id} in index.html`);
  }
  for (const cls of [".hero-curiosity-box", ".predict-hook-card", ".tinker-toolbar", ".next-spark-box", ".tinker-snapshot-card"]) {
    assert.ok(stylesCss.includes(cls), `Missing ${cls} in styles.css`);
  }
});

test("loadGrowth sanitizes ideaQueue, predictions, and tinkerSnapshots with strict bounds", () => {
  const stored = {
    ideaQueue: [
      { id: "i1", text: "  جرّب ظل جديد للبطاقة  ", course: "css", topicIndex: 4, starterCode: ".card{}", tried: false },
      { id: "bad", text: "   ", course: "unknown" },
      { text: "أفكار SQL", course: "database", topicIndex: -5, tried: true }
    ],
    predictions: {
      "html:0": { guessedIndex: 1, revealed: true },
      "bad:key": { guessedIndex: 0, revealed: true },
      "js:12": { guessedIndex: 99, revealed: false }
    },
    tinkerSnapshots: [
      { id: "s1", title: "تجربة", course: "js", code: "console.log('hi')" },
      { id: "empty", code: "   " }
    ]
  };
  const storageMap = new Map([["g-key", JSON.stringify(stored)]]);
  const context = {
    growthKey: "g-key",
    localStorage: { getItem: (k) => storageMap.get(k) ?? null },
    Array, Object, String, Math, JSON
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function loadGrowth() {", "  var miniProjectStorageKey"), context);
  const g = context.loadGrowth();
  assert.equal(g.ideaQueue.length, 2);
  assert.equal(g.ideaQueue[0].text, "جرّب ظل جديد للبطاقة");
  assert.equal(g.ideaQueue[1].course, "database");
  assert.equal(g.ideaQueue[1].topicIndex, 0);
  assert.equal(Object.keys(g.predictions).length, 2);
  assert.equal(g.predictions["html:0"].revealed, true);
  assert.equal(g.predictions["js:12"].guessedIndex, 3);
  assert.equal(g.tinkerSnapshots.length, 1);
  assert.equal(g.tinkerSnapshots[0].course, "js");
});

test("curiosityTeaserForLesson and buildPredictChallenge generate actionable curiosity hooks across tracks", () => {
  const { context } = createCuriosityContext();
  const teaser = context.curiosityTeaserForLesson(context.model);
  assert.match(teaser.question, /#2bb07f/);
  assert.match(teaser.question, /#bbf268/);
  assert.equal(teaser.sparks.length, 3);

  const predict = context.buildPredictChallenge(context.model);
  assert.ok(predict.options.length >= 2);
  assert.match(predict.prompt, /توقّع قبل التشغيل/);
});

test("pinIdeaSpark, Free Tinker Mode, runTinkerSandbox, and saveTinkerSnapshot work without mutating guided drafts", () => {
  const { context, node } = createCuriosityContext({
    completed: [],
    stages: {},
    lessonFlow: {},
    drafts: { "css:2": ".card { color: #2bb07f; }" },
    answers: {},
    projectParts: [],
    unlocks: []
  });

  const pinned = context.pinIdeaSpark({
    text: "أجرب خلفية متدرجة للبطاقة",
    course: "css",
    topicIndex: 2,
    starterCode: ".card { background: linear-gradient(#132820, #2bb07f); }"
  });
  assert.ok(pinned && pinned.id);
  assert.equal(context.growth.ideaQueue.length, 1);
  assert.match(node("heroCuriosityText").textContent, /أجرب خلفية متدرجة للبطاقة/);

  // Open the pinned idea in Tinker Mode and run it
  context.openIdeaSparkInEditor(pinned.id);
  assert.equal(node("tinkerToolbar").hidden, false);
  assert.equal(node("tinkerModeBtn").attrs["aria-pressed"], "true");

  const mutated = context.mutateCodeSpark(node("code").value, "css");
  assert.notEqual(mutated, node("code").value);
  node("code").value = mutated;

  context.runTinkerSandbox();
  assert.equal(context.s.examples, 1);
  assert.equal(context.growth.ideaQueue[0].tried, true, "pinned idea is marked tried after running in tinker mode");
  assert.equal(context.growth.drafts["css:2"], ".card { color: #2bb07f; }", "guided lesson draft remains untouched");

  const snap = context.saveTinkerSnapshot("تدرج لوني", "css", mutated, "تجربة حرة");
  assert.ok(snap);
  assert.equal(context.growth.tinkerSnapshots.length, 1);
  assert.match(node("projectTinkerSnapshots").innerHTML, /تدرج لوني/);

  context.exitTinkerMode();
  assert.equal(node("tinkerToolbar").hidden, true);
  assert.equal(context.renderedLesson, 1);
});

test("renderPredictHook masks preview stage until prediction or skip, and renderCompletionSpark offers next-lesson curiosity", () => {
  const { context, node } = createCuriosityContext();
  // Wire minimal querySelector/querySelectorAll on predictHookCard for reveal interaction
  const predictCard = node("predictHookCard");
  let savedChoices = [];
  let skipBtn = null;
  const fbNode = { innerHTML: "", querySelector: () => null };
  predictCard.querySelectorAll = (sel) => sel === "[data-predict-choice]" ? savedChoices : [];
  predictCard.querySelector = (sel) => sel === "[data-predict-skip]" ? skipBtn : sel === ".predict-hook-feedback" ? fbNode : null;
  Object.defineProperty(predictCard, "innerHTML", {
    get() { return this._html; },
    set(v) {
      this._html = String(v);
      savedChoices = Array.from(this._html.matchAll(/data-predict-choice="(\d+)"/g), (m) => ({
        dataset: { predictChoice: m[1] },
        disabled: false,
        classList: { toggle() {} },
        onclick: null
      }));
      skipBtn = this._html.includes("data-predict-skip") ? { onclick: null } : null;
    }
  });

  context.renderPredictHook(context.model, [{ id: "idea" }], { current: 0, unlocked: 0 });
  assert.equal(predictCard.hidden, false);
  assert.equal(node("previewStage").attrs["data-curtain"], "masked");

  // Simulate user clicking prediction choice 0
  savedChoices[0].onclick();
  assert.equal(context.growth.predictions["css:2"].revealed, true);
  assert.equal(node("previewStage").attrs["data-curtain"], undefined);

  // Completion spark
  const actions = node("guideActions");
  actions.querySelector = () => null;
  context.renderCompletionSpark(context.model);
  assert.match(actions.innerHTML, /شرارة المرة الجاية/);
  assert.match(actions.innerHTML, /css 3/);
});

test("ALL 614 lessons across HTML (54), CSS (94), JS (119), Database (124), Angular (106), and C# (117) produce valid curiosity & predict hooks", () => {
  const { context } = createCuriosityContext();
  for (const [track, file] of [
    ["html", "html-lessons.json"],
    ["css", "css-lessons.json"],
    ["js", "js-lessons.json"],
    ["database", "database-lessons.json"]
  ]) {
    const json = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
    for (const [idx, lesson] of json.lessons.entries()) {
      const model = {
        id: `${track}:${idx}`,
        key: track,
        index: idx,
        topic: lesson.title,
        objective: lesson.whyUse || lesson.concept,
        concept: lesson.concept,
        code: lesson.code,
        practiceSteps: (lesson.steps || []).filter((s) => s.from && s.to),
        quiz: lesson.quiz || null,
        brokenCode: lesson.bugRepair?.brokenCode || "",
        bugExample: lesson.bugRepair?.brokenCode || "",
        bugQuestion: lesson.bugRepair?.question || "",
        bugOptions: lesson.bugRepair?.options || [],
        bugCorrect: lesson.bugRepair?.correctOptionIndex ?? 0
      };
      const teaser = context.curiosityTeaserForLesson(model);
      assert.ok(teaser.question.length > 10, `${file}#${idx}: teaser question`);
      assert.ok(teaser.sparks.length >= 2, `${file}#${idx}: sparks`);
      const predict = context.buildPredictChallenge(model);
      assert.ok(predict && predict.options.length >= 2, `${file}#${idx}: predict options`);
      assert.ok(predict.correct >= 0 && predict.correct < predict.options.length, `${file}#${idx}: valid predict correct index`);
    }
  }

  // Verify all 106 Angular lessons with buildAngularPredictChallenge
  const angularSrc = fs.readFileSync(path.join(root, "angular-editor.js"), "utf8");
  const ngFnStart = angularSrc.indexOf("function buildAngularPredictChallenge(lesson)");
  const ngFnEnd = angularSrc.indexOf("function renderAngularPredictHook(lesson)");
  assert.ok(ngFnStart > 0 && ngFnEnd > ngFnStart, "buildAngularPredictChallenge exists in angular-editor.js");
  const ngCtx = { Array, String };
  vm.createContext(ngCtx);
  vm.runInContext(angularSrc.slice(ngFnStart, ngFnEnd), ngCtx);
  const ngJson = JSON.parse(fs.readFileSync(path.join(root, "angular-lessons.json"), "utf8"));
  assert.equal(ngJson.lessons.length, 106);
  for (const [idx, lesson] of ngJson.lessons.entries()) {
    const p = ngCtx.buildAngularPredictChallenge(lesson);
    assert.ok(p && p.options.length >= 2, `angular#${idx}: predict options`);
    assert.ok(p.correct >= 0 && p.correct < p.options.length, `angular#${idx}: valid correct index`);
  }

  // Verify all 117 C# lessons with buildCsharpPredictChallenge
  const csSrc = fs.readFileSync(path.join(root, "csharp-course.js"), "utf8");
  const csFnStart = csSrc.indexOf("function buildCsharpPredictChallenge(lesson)");
  const csFnEnd = csSrc.indexOf("function renderCsharpPredictHook(lesson, r, step)");
  assert.ok(csFnStart > 0 && csFnEnd > csFnStart, "buildCsharpPredictChallenge exists in csharp-course.js");
  const csCtx = { Array, String };
  vm.createContext(csCtx);
  vm.runInContext(csSrc.slice(csFnStart, csFnEnd), csCtx);
  const csJson = JSON.parse(fs.readFileSync(path.join(root, "csharp-lessons.json"), "utf8"));
  assert.equal(csJson.lessons.length, 117);
  for (const [idx, lesson] of csJson.lessons.entries()) {
    const p = csCtx.buildCsharpPredictChallenge(lesson);
    assert.ok(p && p.options.length >= 2, `csharp#${idx}: predict options`);
    assert.ok(p.correct >= 0 && p.correct < p.options.length, `csharp#${idx}: valid correct index`);
  }

  for (const id of [
    "angularPredictHookCard", "angularNextSparkBox", "angularTinkerModeBtn", "angularPinIdeaBtn", "angularTinkerToolbar",
    "csharpPredictHookCard", "csharpNextSparkBox", "csharpTinkerModeBtn", "csharpPinIdeaBtn", "csharpTinkerToolbar"
  ]) {
    assert.ok(indexHtml.includes(`id="${id}"`), `Missing #${id} in index.html`);
  }
});

test("buildDatabasePreview reacts to custom SQL queries in Free Tinker Mode while preserving core tables", () => {
  const ctx = { String };
  vm.createContext(ctx);
  vm.runInContext(sourceBetween("  function buildDatabasePreview(query) {", "  var data = {"), ctx);
  assert.match(ctx.buildDatabasePreview("SELECT * FROM products;"), /data-table='products'/);
  assert.match(ctx.buildDatabasePreview("SELECT 'فكرتي في SQL' AS custom_note;"), /<th>custom_note<\/th>[\s\S]*<td>فكرتي في SQL<\/td>/);
  assert.match(ctx.buildDatabasePreview("SELECT title, score FROM students;"), /<th>title<\/th><th>score<\/th>/);
});

test("loadGrowth accepts angular and csharp courses in ideaQueue, predictions, and tinkerSnapshots", () => {
  const stored = {
    ideaQueue: [
      { id: "ng1", text: "تجربة Signal", course: "angular", topicIndex: 3, tried: false },
      { id: "cs1", text: "تجربة Loop", course: "csharp", topicIndex: 5, tried: false }
    ],
    predictions: {
      "angular:ng-ts-01": { guessedIndex: 0, revealed: true },
      "csharp:csharp-01-first-output": { guessedIndex: 1, revealed: true }
    },
    tinkerSnapshots: [
      { id: "s-ng", title: "Angular", course: "angular", code: "<h1>Hi</h1>" },
      { id: "s-cs", title: "C#", course: "csharp", code: "Console.WriteLine(1);" }
    ]
  };
  const storageMap = new Map([["g-key", JSON.stringify(stored)]]);
  const context = {
    growthKey: "g-key",
    localStorage: { getItem: (k) => storageMap.get(k) ?? null },
    Array, Object, String, Math, JSON
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function loadGrowth() {", "  var miniProjectStorageKey"), context);
  const g = context.loadGrowth();
  assert.equal(g.ideaQueue.length, 2);
  assert.equal(g.ideaQueue[0].course, "angular");
  assert.equal(g.ideaQueue[1].course, "csharp");
  assert.equal(g.predictions["angular:ng-ts-01"].revealed, true);
  assert.equal(g.predictions["csharp:csharp-01-first-output"].revealed, true);
  assert.equal(g.tinkerSnapshots[0].course, "angular");
  assert.equal(g.tinkerSnapshots[1].course, "csharp");
});


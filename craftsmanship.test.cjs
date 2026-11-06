const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const appSource = fs.readFileSync(__dirname + "/app.js", "utf8");
const lessonData = fs.readFileSync(__dirname + "/lessons-data.js", "utf8");

function sourceBetween(a, b) {
  const i = appSource.indexOf(a), j = appSource.indexOf(b, i);
  if (i < 0 || j < 0) throw new Error("missing " + a);
  return appSource.slice(i, j);
}

test("Hand-craft meter calculates ratios and displays empowering milestone messages", () => {
  const context = {
    course: "html",
    handCraftScores: { html: 20 },
    lastHandCraftMilestone: { html: 0 },
    ar: (n) => String(n),
    document: {
      body: { appendChild() {} },
      createElement: () => ({ className: "", textContent: "", classList: { add() {} } }),
      getElementById: (id) => {
        if (id === "handCraftMeter") {
          return { hidden: true, textContent: "", title: "", classList: { add() {}, remove() {} }, setAttribute() {} };
        }
        return null;
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  var handCraftScores = {", "  function inspectGentleDomTree"), context);

  // Initial score
  assert.equal(context.getHandCraftMilestoneMessage(20), "🌱 بداية ممتازة.. صفحتك بدأت تحمل بصمتك.");
  assert.equal(context.getHandCraftMilestoneMessage(45), "✨ هذا السطر لم يأتِ من النسخ.. أنت تبني خطوة بخطوة.");
  assert.equal(context.getHandCraftMilestoneMessage(70), "🔨 رائع! أنت الآن تبني أكثر مما تنقل، والفكرة تثبت في ذهنك.");
  assert.equal(context.getHandCraftMilestoneMessage(95), "🏆 صفحة مصنوعة بحرفية يدوية وبصمتك الخاصة 100%!");

  // Boost via slot build
  const score1 = context.updateHandCraftScore("html", true, 25);
  assert.equal(score1, 45);
});

test("Gentle DOM Tree identifies misplaced elements outside body and coaches learner empathetically", () => {
  let guideHtml = "";
  let guideHidden = true;
  const guideNode = {
    get hidden() { return guideHidden; },
    set hidden(v) { guideHidden = v; },
    get innerHTML() { return guideHtml; },
    set innerHTML(v) { guideHtml = v; }
  };

  const context = {
    course: "html",
    escapeHtml: (x) => String(x),
    document: {
      getElementById: (id) => (id === "gentleTreeGuide" ? guideNode : null)
    }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function inspectGentleDomTree(code, courseKey) {", "  function renderSlotBuilder"), context);

  // Bad HTML: <h1> outside <body>
  const badHtml = `<!DOCTYPE html><html><head><title>Test</title></head><h1>العنوان تائه</h1><body><p>محتوى</p></body></html>`;
  context.inspectGentleDomTree(badHtml, "html");
  assert.equal(guideHidden, false, "Guide must be revealed for misplaced tag");
  assert.match(guideHtml, /DOM Tree/, "Shows DOM Tree title");
  assert.match(guideHtml, /يبحث عن مكانه داخل الصفحة/, "Coaches learner with empathetic gentle guidance");
  assert.match(guideHtml, /body/, "Points learner towards body");

  // Valid HTML: <h1> inside <body>
  const goodHtml = `<!DOCTYPE html><html><head><title>Test</title></head><body><h1>العنوان في مكانه</h1><p>محتوى</p></body></html>`;
  context.inspectGentleDomTree(goodHtml, "html");
  assert.equal(guideHidden, true, "Guide is hidden when code structure is valid");
});

test("Gentle Tree identifies CSS properties placed outside selector braces", () => {
  let guideHtml = "";
  let guideHidden = true;
  const guideNode = {
    get hidden() { return guideHidden; },
    set hidden(v) { guideHidden = v; },
    get innerHTML() { return guideHtml; },
    set innerHTML(v) { guideHtml = v; }
  };

  const context = {
    course: "css",
    escapeHtml: (x) => String(x),
    document: {
      getElementById: (id) => (id === "gentleTreeGuide" ? guideNode : null)
    }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function inspectGentleDomTree(code, courseKey) {", "  function renderSlotBuilder"), context);

  // Stray property outside braces
  context.inspectGentleDomTree("color: red;\nh1 { font-size: 20px; }", "css");
  assert.equal(guideHidden, false);
  assert.match(guideHtml, /CSS Rules/);
  assert.match(guideHtml, /الخاصية تبحث عن بيتها/);

  // Valid CSS
  context.inspectGentleDomTree("h1 { color: red; font-size: 20px; }", "css");
  assert.equal(guideHidden, true);
});

test("Slot Builder breaks snippets into 4 mental stages and provides manual build button", () => {
  let builderHtml = "";
  let builderHidden = true;
  const builderNode = {
    get hidden() { return builderHidden; },
    set hidden(v) { builderHidden = v; },
    get innerHTML() { return builderHtml; },
    set innerHTML(v) { builderHtml = v; }
  };

  const context = {
    escapeHtml: (x) => String(x),
    growthLessonDone: () => false,
    document: {
      getElementById: (id) => (id === "slotBuilder" ? builderNode : null)
    }
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween("  function renderSlotBuilder(step, model) {", "  function renderDynamicGrowthLesson"), context);

  // Build step with <h1>
  const step = {
    id: "detail-1",
    build: { added: "<h1>مرحباً بكم</h1>\n" },
    example: "<h1>مرحباً بكم</h1>"
  };
  const model = { key: "html", id: "html:0" };

  context.renderSlotBuilder(step, model);
  assert.equal(builderHidden, false);
  assert.match(builderHtml, /١\. أين يعيش؟/, "Stage 1 present");
  assert.match(builderHtml, /٢\. الأداة: وسم &lt;h1&gt;/, "Stage 2 identifies tag");
  assert.match(builderHtml, /٣\. اترك بصمتك واكتب القيمة/, "Stage 3 slot present");
  assert.match(builderHtml, /٤\. شغّل وشاهد أثرك/, "Stage 4 present");
  assert.match(builderHtml, /ابنِ الكود وضع بصمتك في المحرر/, "Interactive build button replaces copy-paste");
});

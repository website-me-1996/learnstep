// tests/m2_layout_empirical.test.cjs
// Empirical verification of Milestone 2: CodePen-Style Flexible Editor/Preview Layout

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");

// =============================================================================
// Helper: Mock DOM Environment for Testing app.js Layout Orientation Logic
// =============================================================================
function createLayoutMockDOM(initialStorage = {}) {
  const storage = new Map(Object.entries(initialStorage));
  const localStorageMock = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    clear() { storage.clear(); }
  };

  class MockClassList {
    constructor(classes = []) {
      this._set = new Set(classes);
    }
    add(cls) { this._set.add(cls); }
    remove(cls) { this._set.delete(cls); }
    contains(cls) { return this._set.has(cls); }
    toggle(cls, force) {
      if (force !== undefined) {
        if (force) this.add(cls);
        else this.remove(cls);
        return force;
      }
      if (this.contains(cls)) {
        this.remove(cls);
        return false;
      } else {
        this.add(cls);
        return true;
      }
    }
  }

  class MockElement {
    constructor(tagName, id = "", classes = []) {
      this.tagName = tagName.toUpperCase();
      this.id = id;
      this.classList = new MockClassList(classes);
      this.attributes = new Map();
      this.style = {};
      this.children = [];
      this.textContent = "";
      this.onclick = null;
    }
    setAttribute(name, val) { this.attributes.set(name, String(val)); }
    getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
    hasAttribute(name) { return this.attributes.has(name); }
    removeAttribute(name) { this.attributes.delete(name); }
    querySelector(selector) {
      for (const child of this.children) {
        if (selector.startsWith(".") && child.classList.contains(selector.slice(1))) {
          return child;
        }
        if (selector.startsWith("#") && child.id === selector.slice(1)) {
          return child;
        }
      }
      return null;
    }
  }

  // Build simulated DOM matching index.html structure
  const split = new MockElement("div", "", ["editor-preview-split"]);
  split.setAttribute("data-layout-orientation", "side");

  const toggleBtn = new MockElement("button", "layoutToggleBtn", ["layout-toggle-btn"]);
  toggleBtn.setAttribute("data-layout", "side");
  toggleBtn.setAttribute("aria-pressed", "false");
  toggleBtn.setAttribute("aria-label", "تبديل مظهر المحرر إلى عرض عمودي");
  toggleBtn.setAttribute("title", "تبديل إلى العرض العمودي (أسفل المحرر)");

  const sideIcon = new MockElement("svg", "", ["layout-icon", "layout-icon-side"]);
  sideIcon.style.display = "none";

  const stackedIcon = new MockElement("svg", "", ["layout-icon", "layout-icon-stacked"]);
  stackedIcon.style.display = "inline-block";

  const labelSpan = new MockElement("span", "", ["layout-toggle-text"]);
  labelSpan.textContent = "عمودي";

  toggleBtn.children.push(sideIcon, stackedIcon, labelSpan);

  const documentMock = {
    querySelector(selector) {
      if (selector === ".editor-preview-split") return split;
      if (selector === "#layoutToggleBtn") return toggleBtn;
      return null;
    },
    getElementById(id) {
      if (id === "layoutToggleBtn") return toggleBtn;
      return null;
    }
  };

  const windowMock = {
    localStorage: localStorageMock
  };

  return { split, toggleBtn, sideIcon, stackedIcon, labelSpan, documentMock, windowMock, localStorageMock };
}

function runLayoutOrientationCode(mockEnv) {
  const startMarker = "/* ==========================================================================\n     Milestone 2: Editor Layout Orientation Toggle & Persistence";
  const endMarker = "initLayoutOrientation();";
  const startIndex = appJs.indexOf(startMarker);
  assert.ok(startIndex !== -1, "Layout orientation section must exist in app.js");
  const endIndex = appJs.indexOf(endMarker, startIndex);
  assert.ok(endIndex !== -1, "initLayoutOrientation() call must exist in app.js");
  const codeSlice = appJs.slice(startIndex, endIndex + endMarker.length);

  const sandbox = {
    document: mockEnv.documentMock,
    window: mockEnv.windowMock,
    localStorage: mockEnv.localStorageMock,
    console
  };
  vm.createContext(sandbox);
  vm.runInContext(codeSlice, sandbox);
  return sandbox;
}

// =============================================================================
// Suite 1: Markup Structure in index.html
// =============================================================================
test("M2 Suite 1: Markup of #layoutToggleBtn and .editor-preview-split in index.html", async (t) => {
  await t.test(".editor-preview-split has data-layout-orientation='side' by default", () => {
    assert.match(
      indexHtml,
      /<div\s+class="editor-preview-split"\s+data-layout-orientation="side"/,
      "index.html must set initial data-layout-orientation='side' on .editor-preview-split"
    );
  });

  await t.test("#layoutToggleBtn exists inside .editor-head-meta after #filename", () => {
    const metaIndex = indexHtml.indexOf('<div class="editor-head-meta">');
    assert.ok(metaIndex !== -1, ".editor-head-meta must exist in index.html");
    const closingIndex = indexHtml.indexOf("</div>", metaIndex);
    const metaSlice = indexHtml.slice(metaIndex, closingIndex);

    assert.ok(metaSlice.includes('id="filename"'), "filename must exist inside editor-head-meta");
    assert.ok(metaSlice.includes('id="layoutToggleBtn"'), "#layoutToggleBtn must exist inside editor-head-meta");
    assert.ok(
      metaSlice.indexOf('id="layoutToggleBtn"') > metaSlice.indexOf('id="filename"'),
      "#layoutToggleBtn must come after #filename in DOM order"
    );
  });

  await t.test("#layoutToggleBtn has full accessibility attributes, SVGs, and labels", () => {
    assert.match(indexHtml, /<button[^>]+id="layoutToggleBtn"/, "#layoutToggleBtn must be a button element");
    assert.match(indexHtml, /class="[^"]*layout-toggle-btn[^"]*"/, "must have class layout-toggle-btn");
    assert.match(indexHtml, /aria-pressed="false"/, "initial aria-pressed must be false");
    assert.match(indexHtml, /data-layout="side"/, "initial data-layout must be side");
    assert.match(indexHtml, /aria-label="تبديل مظهر المحرر إلى عرض عمودي"/, "accessible aria-label present");
    assert.match(indexHtml, /title="تبديل إلى العرض العمودي \(أسفل المحرر\)"/, "accessible title tooltip present");

    // Icons & Text
    assert.match(indexHtml, /<svg\s+class="layout-icon layout-icon-side"/, "layout-icon-side SVG present");
    assert.match(indexHtml, /<svg\s+class="layout-icon layout-icon-stacked"/, "layout-icon-stacked SVG present");
    assert.match(indexHtml, /<span class="layout-toggle-text">\s*عمودي\s*<\/span>/, "layout-toggle-text with 'عمودي' present");
  });
});

// =============================================================================
// Suite 2: CSS Stylesheet Architecture in styles.css
// =============================================================================
test("M2 Suite 2: CSS Rules for Layout Toggle & Stacked Orientation", async (t) => {
  await t.test(".layout-toggle-btn has >= 44px min-height/min-width touch target", () => {
    assert.match(stylesCss, /\.layout-toggle-btn\{[^}]*min-height:\s*44px;/, "min-height: 44px required");
    assert.match(stylesCss, /\.layout-toggle-btn\{[^}]*min-width:\s*44px;/, "min-width: 44px required");
  });

  await t.test(".layout-toggle-btn has hover, focus-visible, and active/pressed states", () => {
    assert.match(stylesCss, /\.layout-toggle-btn:hover\s*\{/, "hover state defined");
    assert.match(stylesCss, /\.layout-toggle-btn:focus-visible\s*\{/, "focus-visible state defined");
    assert.match(
      stylesCss,
      /\.layout-toggle-btn\[aria-pressed="true"\]/s,
      "aria-pressed=true state defined for active state"
    );
  });

  await t.test("Stacked mode rules enforce flex-direction: column and 100% width", () => {
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\][^{]*\{[^}]*display:\s*flex!important;/s,
      "stacked mode enforces display: flex!important"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\][^{]*\{[^}]*flex-direction:\s*column!important;/s,
      "stacked mode enforces flex-direction: column!important"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\.is-stacked[^{]*\{[^}]*flex-direction:\s*column!important;/s,
      ".is-stacked class fallback enforces flex-direction: column!important"
    );
  });

  await t.test("Stacked mode specifies required editor textarea dimensions (min-height 240px, height 260px)", () => {
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.editor\s+textarea[^{]*\{[^}]*min-height:\s*240px!important;/s,
      "textarea min-height: 240px!important"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.editor\s+textarea[^{]*\{[^}]*height:\s*260px!important;/s,
      "textarea height: 260px!important"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.editor\s+textarea[^{]*\{[^}]*width:\s*100%!important;/s,
      "textarea width: 100%!important"
    );
  });

  await t.test("Stacked mode specifies required preview iframe dimensions (min-height 280px, height 340px)", () => {
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.previewrow\s+\.preview[^{]*\{[^}]*min-height:\s*280px!important;/s,
      "preview iframe min-height: 280px!important"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.previewrow\s+\.preview[^{]*\{[^}]*height:\s*340px!important;/s,
      "preview iframe height: 340px!important"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.previewrow\s+\.preview[^{]*\{[^}]*width:\s*100%!important;/s,
      "preview iframe width: 100%!important"
    );
  });

  await t.test("Side-by-side mode in desktop and tablet retains 2-column grid rules", () => {
    assert.match(
      stylesCss,
      /@media\(min-width:1025px\)[\s\S]*?\.editor-preview-split\{display:grid;grid-template-columns:1fr 1fr;gap:16px;/,
      "Desktop side-by-side grid rule intact"
    );
    assert.match(
      stylesCss,
      /@media\(min-width:768px\) and \(max-width:1024px\)[\s\S]*?\.editor-preview-split\{display:grid;grid-template-columns:1fr 1fr;gap:14px;/,
      "Tablet side-by-side grid rule intact"
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="side"\]/,
      "Explicit data-layout-orientation='side' selector defined in styles.css"
    );
  });

  await t.test("Mobile viewport (@media(max-width:767px)) hides layout toggle button", () => {
    const mobileQueryIndex = stylesCss.indexOf("@media(max-width:767px)");
    assert.ok(mobileQueryIndex !== -1, "@media(max-width:767px) must exist");

    // Find matching closing brace for this @media block
    let depth = 0;
    let endIndex = -1;
    for (let i = mobileQueryIndex; i < stylesCss.length; i++) {
      if (stylesCss[i] === "{") depth++;
      else if (stylesCss[i] === "}") {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
    assert.ok(endIndex !== -1, "@media(max-width:767px) block must be properly closed");
    const mobileBlock = stylesCss.slice(mobileQueryIndex, endIndex + 1);
    assert.match(
      mobileBlock,
      /\.layout-toggle-btn\{display:none!important\}/,
      ".layout-toggle-btn must be hidden on mobile screens <= 767px"
    );
  });
});

// =============================================================================
// Suite 3: Logic, Interactions, and State Persistence in app.js
// =============================================================================
test("M2 Suite 3: Logic Execution, DOM Updates & LocalStorage Persistence", async (t) => {
  await t.test("Default initialization sets 'side' orientation and wires toggle click handler", () => {
    const mockEnv = createLayoutMockDOM();
    const sandbox = runLayoutOrientationCode(mockEnv);

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
    assert.equal(mockEnv.toggleBtn.getAttribute("data-layout"), "side");
    assert.equal(mockEnv.labelSpan.textContent, "عمودي");
    assert.equal(mockEnv.sideIcon.style.display, "none");
    assert.equal(mockEnv.stackedIcon.style.display, "inline-block");
    assert.equal(typeof mockEnv.toggleBtn.onclick, "function");
    assert.equal(typeof sandbox.window.setLayoutOrientation, "function");
    assert.equal(typeof sandbox.window.toggleLayoutOrientation, "function");
    assert.equal(typeof sandbox.window.getLayoutOrientation, "function");
  });

  await t.test("Clicking toggle switches layout from 'side' to 'stacked' with full ARIA & style updates", () => {
    const mockEnv = createLayoutMockDOM();
    runLayoutOrientationCode(mockEnv);

    // Simulate user click on #layoutToggleBtn
    mockEnv.toggleBtn.onclick();

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), true);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "true");
    assert.equal(mockEnv.toggleBtn.getAttribute("data-layout"), "stacked");
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-label"), "تبديل مظهر المحرر إلى عرض جانبي");
    assert.equal(mockEnv.toggleBtn.getAttribute("title"), "تبديل إلى العرض الجانبي (جنباً إلى جنب)");
    assert.equal(mockEnv.labelSpan.textContent, "جانبي");
    assert.equal(mockEnv.sideIcon.style.display, "inline-block");
    assert.equal(mockEnv.stackedIcon.style.display, "none");
    assert.equal(mockEnv.localStorageMock.getItem("steplearn_editor_orientation"), "stacked");
  });

  await t.test("Clicking toggle a second time returns layout to 'side'", () => {
    const mockEnv = createLayoutMockDOM();
    runLayoutOrientationCode(mockEnv);

    // First click: -> stacked
    mockEnv.toggleBtn.onclick();
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");

    // Second click: -> side
    mockEnv.toggleBtn.onclick();
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
    assert.equal(mockEnv.toggleBtn.getAttribute("data-layout"), "side");
    assert.equal(mockEnv.labelSpan.textContent, "عمودي");
    assert.equal(mockEnv.localStorageMock.getItem("steplearn_editor_orientation"), "side");
  });

  await t.test("Pre-existing localStorage preference for 'stacked' is honored on initialization", () => {
    const mockEnv = createLayoutMockDOM({ "steplearn_editor_orientation": "stacked" });
    const sandbox = runLayoutOrientationCode(mockEnv);

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), true);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "true");
    assert.equal(mockEnv.labelSpan.textContent, "جانبي");
    assert.equal(sandbox.window.getLayoutOrientation(), "stacked");
  });

  await t.test("Corrupted or unknown localStorage value gracefully falls back to 'side'", () => {
    const mockEnv = createLayoutMockDOM({ "steplearn_editor_orientation": "corrupted_nonsense_value" });
    const sandbox = runLayoutOrientationCode(mockEnv);

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
    assert.equal(mockEnv.labelSpan.textContent, "عمودي");
    assert.equal(sandbox.window.getLayoutOrientation(), "side");
  });

  await t.test("Missing DOM elements do not throw error during orientation logic", () => {
    const emptyDocMock = {
      querySelector() { return null; },
      getElementById() { return null; }
    };
    const emptySandbox = {
      document: emptyDocMock,
      window: { localStorage: { getItem() { return null; }, setItem() {} } },
      localStorage: { getItem() { return null; }, setItem() {} },
      console
    };
    vm.createContext(emptySandbox);
    const startMarker = "/* ==========================================================================\n     Milestone 2: Editor Layout Orientation Toggle & Persistence";
    const endMarker = "initLayoutOrientation();";
    const startIndex = appJs.indexOf(startMarker);
    const endIndex = appJs.indexOf(endMarker, startIndex);
    const codeSlice = appJs.slice(startIndex, endIndex + endMarker.length);
    assert.doesNotThrow(() => {
      vm.runInContext(codeSlice, emptySandbox);
      emptySandbox.window.toggleLayoutOrientation();
      emptySandbox.window.setLayoutOrientation("stacked");
    }, "Missing DOM elements should be safely guarded without throwing");
  });

  await t.test("window.setLayoutOrientation directly modifies layout and updates localStorage", () => {
    const mockEnv = createLayoutMockDOM();
    const sandbox = runLayoutOrientationCode(mockEnv);

    sandbox.window.setLayoutOrientation("stacked");
    assert.equal(sandbox.window.getLayoutOrientation(), "stacked");
    assert.equal(mockEnv.localStorageMock.getItem("steplearn_editor_orientation"), "stacked");

    sandbox.window.setLayoutOrientation("side");
    assert.equal(sandbox.window.getLayoutOrientation(), "side");
    assert.equal(mockEnv.localStorageMock.getItem("steplearn_editor_orientation"), "side");
  });
});

// =============================================================================
// Suite 4: Invariant & Baseline Test Protection
// =============================================================================
test("M2 Suite 4: Mandatory Invariants Preservation", async (t) => {
  await t.test("styles.css line 106 invariant: .editor textarea direction and unicode-bidi", () => {
    assert.match(
      stylesCss,
      /\.editor textarea\{[^}]*direction:ltr;[^}]*unicode-bidi:embed/,
      "The exact regex assertion in behavior.test.cjs:176 must remain matched"
    );
  });

  await t.test("index.html invariant: <textarea id='code' dir='ltr'", () => {
    assert.match(
      indexHtml,
      /<textarea id="code" dir="ltr"/,
      "The exact regex assertion in behavior.test.cjs:83,175 must remain matched"
    );
  });

  await t.test("styles.css growth-build-row and starter-project-list invariants", () => {
    assert.match(
      stylesCss,
      /\.growth-build-row\{grid-template-columns:minmax\(0,1fr\)\}/,
      "The exact regex assertion in behavior.test.cjs:201 must remain matched"
    );
    assert.match(
      stylesCss,
      /\.starter-project-list\{display:grid/,
      "The exact regex assertion in behavior.test.cjs:294 must remain matched"
    );
  });

  await t.test("Mobile tab switcher rules in styles.css preserved verbatim", () => {
    assert.match(
      stylesCss,
      /article\.card\[data-mobile-view="editor"\] \.previewrow\{display:none!important\}/,
      "Editor view hide preview rule preserved"
    );
    assert.match(
      stylesCss,
      /article\.card\[data-mobile-view="preview"\] \.editor\{display:none!important\}/,
      "Preview view hide editor rule preserved"
    );
  });
});

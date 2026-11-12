// tests/challenger1_stress.test.cjs
// =============================================================================
// Challenger 1 Adversarial Stress Test Suite: Milestone 2 Layout Toggle
// =============================================================================
// Focus areas:
// 1. Rapid toggle switching (100x rapid alternations: state drift & ARIA sync)
// 2. LocalStorage stress (corrupted strings, numeric, SecurityError, QuotaExceeded, null storage)
// 3. Asynchronous & event order (multiple clicks, missing DOM, repeated init)
// 4. Programmatic API stress (window.setLayoutOrientation invalid inputs & window.getLayoutOrientation)
// =============================================================================

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
// Mock DOM Factory with Full Attribute & Event Simulation
// =============================================================================
function createMockDOM(options = {}) {
  const {
    initialStorage = {},
    storageThrowsOnGet = false,
    storageThrowsOnSet = false,
    storageIsNull = false,
    storageGetterThrows = false,
    omitSplit = false,
    omitToggleBtn = false,
    omitIcons = false
  } = options;

  let storageMap = new Map(Object.entries(initialStorage));

  let localStorageMock;
  if (storageIsNull) {
    localStorageMock = null;
  } else {
    localStorageMock = {
      getItem(k) {
        if (storageThrowsOnGet) {
          const err = new Error("SecurityError: Access to localStorage is denied");
          err.name = "SecurityError";
          throw err;
        }
        return storageMap.has(k) ? storageMap.get(k) : null;
      },
      setItem(k, v) {
        if (storageThrowsOnSet) {
          const err = new Error("QuotaExceededError: DomException 22");
          err.name = "QuotaExceededError";
          throw err;
        }
        storageMap.set(k, String(v));
      },
      removeItem(k) { storageMap.delete(k); },
      clear() { storageMap.clear(); }
    };
  }

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
    toString() { return Array.from(this._set).join(" "); }
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
    click() {
      if (typeof this.onclick === "function") {
        this.onclick();
      }
    }
  }

  let split = null;
  if (!omitSplit) {
    split = new MockElement("div", "", ["editor-preview-split"]);
    split.setAttribute("data-layout-orientation", "side");
  }

  let toggleBtn = null;
  let sideIcon = null;
  let stackedIcon = null;
  let labelSpan = null;

  if (!omitToggleBtn) {
    toggleBtn = new MockElement("button", "layoutToggleBtn", ["layout-toggle-btn"]);
    toggleBtn.setAttribute("data-layout", "side");
    toggleBtn.setAttribute("aria-pressed", "false");
    toggleBtn.setAttribute("aria-label", "تبديل مظهر المحرر إلى عرض عمودي");
    toggleBtn.setAttribute("title", "تبديل إلى العرض العمودي (أسفل المحرر)");

    if (!omitIcons) {
      sideIcon = new MockElement("svg", "", ["layout-icon", "layout-icon-side"]);
      sideIcon.style.display = "none";

      stackedIcon = new MockElement("svg", "", ["layout-icon", "layout-icon-stacked"]);
      stackedIcon.style.display = "inline-block";

      labelSpan = new MockElement("span", "", ["layout-toggle-text"]);
      labelSpan.textContent = "عمودي";

      toggleBtn.children.push(sideIcon, stackedIcon, labelSpan);
    }
  }

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

  const windowMock = {};
  if (storageGetterThrows) {
    Object.defineProperty(windowMock, "localStorage", {
      get() {
        const err = new Error("SecurityError: localStorage blocked by security settings");
        err.name = "SecurityError";
        throw err;
      }
    });
  } else {
    windowMock.localStorage = localStorageMock;
  }

  return {
    split,
    toggleBtn,
    sideIcon,
    stackedIcon,
    labelSpan,
    documentMock,
    windowMock,
    localStorageMock,
    storageMap
  };
}

// Extract layout orientation code slice from app.js
function extractLayoutCode() {
  const startMarker = "/* ==========================================================================\n     Milestone 2: Editor Layout Orientation Toggle & Persistence";
  const endMarker = "initLayoutOrientation();";
  const startIndex = appJs.indexOf(startMarker);
  assert.ok(startIndex !== -1, "Layout orientation section marker must exist in app.js");
  const endIndex = appJs.indexOf(endMarker, startIndex);
  assert.ok(endIndex !== -1, "initLayoutOrientation() call marker must exist in app.js");
  return appJs.slice(startIndex, endIndex + endMarker.length);
}

const layoutOrientationCodeSlice = extractLayoutCode();

function runLayoutOrientation(mockEnv, options = {}) {
  const sandbox = {
    document: mockEnv.documentMock,
    window: mockEnv.windowMock,
    console
  };

  if (options.storageGetterThrows) {
    Object.defineProperty(sandbox, "localStorage", {
      get() {
        const err = new Error("SecurityError: localStorage blocked by security settings");
        err.name = "SecurityError";
        throw err;
      }
    });
  } else {
    sandbox.localStorage = mockEnv.windowMock.localStorage;
  }

  vm.createContext(sandbox);
  vm.runInContext(layoutOrientationCodeSlice, sandbox);
  return sandbox;
}

// =============================================================================
// TEST SUITE 1: Rapid Toggle Switching (100 Alternations)
// =============================================================================
test("Adversarial Stress 1: Rapid Toggle Switching (100 Cycles)", async (t) => {
  await t.test("100 consecutive rapid toggles maintain zero state drift and perfect synchronization", () => {
    const mockEnv = createMockDOM();
    runLayoutOrientation(mockEnv);

    // Initial state check
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
    assert.equal(mockEnv.toggleBtn.getAttribute("data-layout"), "side");

    for (let i = 1; i <= 100; i++) {
      mockEnv.toggleBtn.click();
      const expectedMode = (i % 2 === 1) ? "stacked" : "side";
      const isStacked = (expectedMode === "stacked");

      // Container checks
      assert.equal(
        mockEnv.split.getAttribute("data-layout-orientation"),
        expectedMode,
        `Cycle ${i}: split data-layout-orientation must be '${expectedMode}'`
      );
      assert.equal(
        mockEnv.split.classList.contains("is-stacked"),
        isStacked,
        `Cycle ${i}: split is-stacked class must be ${isStacked}`
      );

      // Button checks
      assert.equal(
        mockEnv.toggleBtn.getAttribute("data-layout"),
        expectedMode,
        `Cycle ${i}: toggleBtn data-layout must be '${expectedMode}'`
      );
      assert.equal(
        mockEnv.toggleBtn.getAttribute("aria-pressed"),
        isStacked ? "true" : "false",
        `Cycle ${i}: toggleBtn aria-pressed must be '${isStacked ? "true" : "false"}'`
      );
      assert.equal(
        mockEnv.toggleBtn.classList.contains("active"),
        isStacked,
        `Cycle ${i}: toggleBtn active class must be ${isStacked}`
      );

      // Icon & text checks
      assert.equal(
        mockEnv.sideIcon.style.display,
        isStacked ? "inline-block" : "none",
        `Cycle ${i}: sideIcon visibility mismatch`
      );
      assert.equal(
        mockEnv.stackedIcon.style.display,
        isStacked ? "none" : "inline-block",
        `Cycle ${i}: stackedIcon visibility mismatch`
      );
      assert.equal(
        mockEnv.labelSpan.textContent,
        isStacked ? "جانبي" : "عمودي",
        `Cycle ${i}: label text mismatch`
      );

      // LocalStorage sync
      assert.equal(
        mockEnv.storageMap.get("steplearn_editor_orientation"),
        expectedMode,
        `Cycle ${i}: localStorage preference must be '${expectedMode}'`
      );
    }

    // After 100 cycles (even), must finish exactly in 'side'
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
  });
});

// =============================================================================
// TEST SUITE 2: LocalStorage Stress & Fault Tolerance
// =============================================================================
test("Adversarial Stress 2: LocalStorage Fault Tolerance & Corrupted Data", async (t) => {
  const corruptedValues = [
    "random_string",
    "STACKED",
    "Side",
    "SIDE",
    "",
    "   ",
    "true",
    "false",
    "null",
    "undefined",
    "{}",
    "[]",
    "123",
    "0",
    "NaN",
    "<script>alert(1)</script>",
    "__proto__",
    "constructor",
    "valueOf",
    "\u0000",
    "side; stacked"
  ];

  for (const corrupted of corruptedValues) {
    await t.test(`Corrupted localStorage value '${corrupted}' safely defaults to 'side'`, () => {
      const mockEnv = createMockDOM({
        initialStorage: { steplearn_editor_orientation: corrupted }
      });
      runLayoutOrientation(mockEnv);

      assert.equal(
        mockEnv.split.getAttribute("data-layout-orientation"),
        "side",
        `Corrupted value '${corrupted}' must fall back to 'side'`
      );
      assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
      assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
    });
  }

  await t.test("SecurityError on localStorage.getItem does not crash app and defaults to 'side'", () => {
    const mockEnv = createMockDOM({ storageThrowsOnGet: true });
    assert.doesNotThrow(() => {
      runLayoutOrientation(mockEnv);
    }, "Must not throw when localStorage.getItem throws SecurityError");

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
  });

  await t.test("QuotaExceededError on localStorage.setItem during toggle does not crash and updates DOM", () => {
    const mockEnv = createMockDOM({ storageThrowsOnSet: true });
    runLayoutOrientation(mockEnv);

    assert.doesNotThrow(() => {
      mockEnv.toggleBtn.click();
    }, "Must not throw when localStorage.setItem throws QuotaExceededError");

    // DOM must still update correctly even if persistence fails
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), true);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "true");
  });

  await t.test("window.localStorage getter throwing SecurityError does not crash and defaults to 'side'", () => {
    const mockEnv = createMockDOM({ storageGetterThrows: true });
    assert.doesNotThrow(() => {
      runLayoutOrientation(mockEnv, { storageGetterThrows: true });
    }, "Must not throw when window.localStorage getter throws SecurityError");

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
  });

  await t.test("window.localStorage is null (private mode / sandboxed iframe) does not crash", () => {
    const mockEnv = createMockDOM({ storageIsNull: true });
    assert.doesNotThrow(() => {
      runLayoutOrientation(mockEnv);
      mockEnv.toggleBtn.click();
    }, "Must not throw when window.localStorage is null");

    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
  });
});

// =============================================================================
// TEST SUITE 3: Asynchronous, Interleaving, and Missing DOM Elements
// =============================================================================
test("Adversarial Stress 3: Asynchronous, Event Ordering & Partial DOM", async (t) => {
  await t.test("Simulated asynchronous concurrent clicks resolve deterministically", async () => {
    const mockEnv = createMockDOM();
    runLayoutOrientation(mockEnv);

    // Run 50 simulated async dispatch batches
    const clickPromises = [];
    for (let i = 0; i < 50; i++) {
      clickPromises.push(new Promise((resolve) => {
        setImmediate(() => {
          mockEnv.toggleBtn.click();
          resolve();
        });
      }));
    }

    await Promise.all(clickPromises);
    // 50 clicks (even) -> should resolve back to 'side'
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
    assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
  });

  await t.test("Complete DOM absence (headless/pre-DOM load) runs without errors", () => {
    const mockEnv = createMockDOM({ omitSplit: true, omitToggleBtn: true });
    assert.doesNotThrow(() => {
      const sandbox = runLayoutOrientation(mockEnv);
      sandbox.window.setLayoutOrientation("stacked");
      sandbox.window.toggleLayoutOrientation();
      const current = sandbox.window.getLayoutOrientation();
      assert.equal(current, "side");
    }, "Headless / DOM-free execution must not throw errors");
  });

  await t.test("Partial DOM: split element exists but toggleBtn missing", () => {
    const mockEnv = createMockDOM({ omitToggleBtn: true });
    assert.doesNotThrow(() => {
      const sandbox = runLayoutOrientation(mockEnv);
      sandbox.window.setLayoutOrientation("stacked");
      assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
      assert.equal(mockEnv.split.classList.contains("is-stacked"), true);
    });
  });

  await t.test("Partial DOM: toggleBtn exists but split element missing", () => {
    const mockEnv = createMockDOM({ omitSplit: true });
    assert.doesNotThrow(() => {
      const sandbox = runLayoutOrientation(mockEnv);
      mockEnv.toggleBtn.click();
      assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "true");
      assert.equal(mockEnv.toggleBtn.getAttribute("data-layout"), "stacked");
    });
  });

  await t.test("Partial DOM: toggleBtn missing child SVGs and label span does not crash", () => {
    const mockEnv = createMockDOM({ omitIcons: true });
    assert.doesNotThrow(() => {
      runLayoutOrientation(mockEnv);
      mockEnv.toggleBtn.click();
      assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "true");
    });
  });

  await t.test("Repeated initLayoutOrientation() calls do not stack duplicate event handlers", () => {
    const mockEnv = createMockDOM();
    const sandbox = runLayoutOrientation(mockEnv);

    // Simulate re-running initLayoutOrientation 5 times (e.g., dynamic page navigation)
    const initFn = sandbox.window.initLayoutOrientation || (() => {
      // Re-run the code slice
      vm.runInContext("initLayoutOrientation();", sandbox);
    });

    initFn();
    initFn();
    initFn();

    // Now single click should toggle once (from side -> stacked)
    mockEnv.toggleBtn.click();
    assert.equal(
      mockEnv.split.getAttribute("data-layout-orientation"),
      "stacked",
      "One click must result in 'stacked', not toggle multiple times due to listener duplication"
    );

    mockEnv.toggleBtn.click();
    assert.equal(
      mockEnv.split.getAttribute("data-layout-orientation"),
      "side",
      "Second click must toggle back to 'side'"
    );
  });
});

// =============================================================================
// TEST SUITE 4: Programmatic API Boundary & Stress Testing
// =============================================================================
test("Adversarial Stress 4: Programmatic API Boundary & Stress", async (t) => {
  await t.test("window.setLayoutOrientation with diverse invalid types cleanly defaults to 'side'", () => {
    const mockEnv = createMockDOM();
    const sandbox = runLayoutOrientation(mockEnv);

    const invalidInputs = [
      "grid",
      "horizontal",
      "vertical",
      "",
      "   ",
      123,
      0,
      -1,
      NaN,
      null,
      undefined,
      {},
      { orientation: "stacked" },
      [],
      ["stacked"],
      true,
      false,
      () => "stacked",
      Symbol("stacked")
    ];

    for (const input of invalidInputs) {
      // First set to stacked to prove it resets to side
      sandbox.window.setLayoutOrientation("stacked");
      assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");

      // Pass invalid input
      sandbox.window.setLayoutOrientation(input);
      assert.equal(
        mockEnv.split.getAttribute("data-layout-orientation"),
        "side",
        `Input ${String(input)} must fall back to 'side'`
      );
      assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
      assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), "false");
      assert.equal(mockEnv.storageMap.get("steplearn_editor_orientation"), "side");
    }
  });

  await t.test("window.getLayoutOrientation reflects active DOM attribute or storage fallback", () => {
    const mockEnv = createMockDOM();
    const sandbox = runLayoutOrientation(mockEnv);

    assert.equal(sandbox.window.getLayoutOrientation(), "side");

    sandbox.window.setLayoutOrientation("stacked");
    assert.equal(sandbox.window.getLayoutOrientation(), "stacked");

    // Manually remove split from document query to test storage fallback
    mockEnv.documentMock.querySelector = (sel) => null;
    assert.equal(sandbox.window.getLayoutOrientation(), "stacked");

    // Clear storage and test default fallback
    mockEnv.storageMap.clear();
    assert.equal(sandbox.window.getLayoutOrientation(), "side");
  });

  await t.test("window.toggleLayoutOrientation return value matches DOM state", () => {
    const mockEnv = createMockDOM();
    const sandbox = runLayoutOrientation(mockEnv);

    const res1 = sandbox.window.toggleLayoutOrientation();
    assert.equal(res1, "stacked");
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");

    const res2 = sandbox.window.toggleLayoutOrientation();
    assert.equal(res2, "side");
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
  });
});

// =============================================================================
// TEST SUITE 5: Mobile Viewport Integration Stress
// =============================================================================
test("Adversarial Stress 5: Mobile In-Card Tab Switcher & Orientation Independence", async (t) => {
  await t.test("Mobile tab switcher CSS rules have !important and supersede layout orientation", () => {
    assert.match(
      stylesCss,
      /article\.card\[data-mobile-view="editor"\]\s+\.previewrow\{display:none!important\}/,
      "Mobile editor view must hide previewrow with !important"
    );
    assert.match(
      stylesCss,
      /article\.card\[data-mobile-view="preview"\]\s+\.editor\{display:none!important\}/,
      "Mobile preview view must hide editor with !important"
    );
    assert.match(
      stylesCss,
      /\.layout-toggle-btn\{display:none!important\}/,
      "Layout toggle button must be hidden with !important on mobile screens <= 767px"
    );
  });

  await t.test("Button attribute type='button' prevents form submission in case editor is wrapped in form", () => {
    assert.match(
      indexHtml,
      /<button[^>]*type="button"[^>]*id="layoutToggleBtn"/,
      "#layoutToggleBtn must explicitly declare type='button'"
    );
  });

  await t.test("Toggling orientation preserves pre-existing and sibling classes on split container and button", () => {
    const mockEnv = createMockDOM();
    mockEnv.split.classList.add("theme-dark");
    mockEnv.split.classList.add("custom-container");
    mockEnv.toggleBtn.classList.add("custom-btn");

    runLayoutOrientation(mockEnv);

    // Toggle to stacked
    mockEnv.toggleBtn.click();
    assert.equal(mockEnv.split.classList.contains("theme-dark"), true);
    assert.equal(mockEnv.split.classList.contains("custom-container"), true);
    assert.equal(mockEnv.split.classList.contains("is-stacked"), true);
    assert.equal(mockEnv.toggleBtn.classList.contains("custom-btn"), true);
    assert.equal(mockEnv.toggleBtn.classList.contains("active"), true);

    // Toggle back to side
    mockEnv.toggleBtn.click();
    assert.equal(mockEnv.split.classList.contains("theme-dark"), true);
    assert.equal(mockEnv.split.classList.contains("custom-container"), true);
    assert.equal(mockEnv.split.classList.contains("is-stacked"), false);
    assert.equal(mockEnv.toggleBtn.classList.contains("custom-btn"), true);
    assert.equal(mockEnv.toggleBtn.classList.contains("active"), false);
  });
});

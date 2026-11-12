// tests/challenger2_responsive_stress.test.cjs
// Adversarial Empirical Stress Test Suite — Challenger 2 (Milestone 2)
// Scope: Responsive Layout Proportions, Viewport Boundaries, Stacked Mode Proportions,
// Mobile Priority Guarantee, Touch Targets, and Storage Resilience.

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const http = require("node:http");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const hasEdge = fs.existsSync(edgePath);

// =============================================================================
// Helper: Extract Media Query Block from CSS
// =============================================================================
function extractMediaQueryBlock(css, queryPrefix) {
  const queryIndex = css.indexOf(queryPrefix);
  if (queryIndex === -1) return null;
  const firstBrace = css.indexOf("{", queryIndex);
  if (firstBrace === -1) return null;

  let depth = 1;
  let i = firstBrace + 1;
  for (; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  return css.slice(queryIndex, i + 1);
}

// =============================================================================
// Helper: Mock DOM for Layout Logic Testing
// =============================================================================
function createStressMockDOM(initialStorage = {}) {
  const storage = new Map(Object.entries(initialStorage));
  let shouldThrowStorage = false;
  let throwErrorType = new Error("Simulated localStorage security error");

  const localStorageMock = {
    getItem(k) {
      if (shouldThrowStorage) throw throwErrorType;
      return storage.has(k) ? storage.get(k) : null;
    },
    setItem(k, v) {
      if (shouldThrowStorage) throw throwErrorType;
      storage.set(k, String(v));
    },
    removeItem(k) {
      if (shouldThrowStorage) throw throwErrorType;
      storage.delete(k);
    },
    clear() {
      if (shouldThrowStorage) throw throwErrorType;
      storage.clear();
    },
    _setThrow(val, err) {
      shouldThrowStorage = val;
      if (err) throwErrorType = err;
    }
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

  const card = new MockElement("article", "", ["card"]);
  card.setAttribute("data-mobile-view", "editor");

  const documentMock = {
    querySelector(selector) {
      if (selector === ".editor-preview-split") return split;
      if (selector === "#layoutToggleBtn") return toggleBtn;
      if (selector === "article.card") return card;
      return null;
    },
    getElementById(id) {
      if (id === "layoutToggleBtn") return toggleBtn;
      return null;
    },
    querySelectorAll(selector) {
      return [];
    }
  };

  const windowMock = {
    localStorage: localStorageMock
  };

  return { split, toggleBtn, sideIcon, stackedIcon, labelSpan, card, documentMock, windowMock, localStorageMock };
}

function runLayoutOrientationSandbox(mockEnv) {
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
// Suite 1: Viewport Boundary Rules & Media Query Cleanliness
// =============================================================================
test("Challenger 2 Suite 1: Viewport Boundary Rules & Breakpoint Integrity", async (t) => {
  await t.test("Standard mobile breakpoint @media(max-width:767px) exists", () => {
    assert.match(stylesCss, /@media\s*\(\s*max-width\s*:\s*767px\s*\)/);
  });

  await t.test("Standard tablet breakpoint @media(min-width:768px) and (max-width:1024px) exists", () => {
    assert.match(stylesCss, /@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*and\s*\(\s*max-width\s*:\s*1024px\s*\)/);
  });

  await t.test("Standard desktop breakpoint @media(min-width:1025px) exists", () => {
    assert.match(stylesCss, /@media\s*\(\s*min-width\s*:\s*1025px\s*\)/);
  });

  await t.test("No obsolete or conflicting breakpoint traps (740px, 900px, 1020px)", () => {
    assert.doesNotMatch(stylesCss, /@media\s*\(\s*max-width\s*:\s*740px\s*\)/, "740px trap must be gone");
    assert.doesNotMatch(stylesCss, /@media\s*\(\s*max-width\s*:\s*900px\s*\)/, "900px fragmentation must be gone");
    assert.doesNotMatch(stylesCss, /@media\s*\(\s*max-width\s*:\s*1020px\s*\)/, "1020px fragmentation must be gone");
  });
});

// =============================================================================
// Suite 2: Stacked Layout Mode Dimensions & Overflow Invariants
// =============================================================================
test("Challenger 2 Suite 2: Stacked Layout Mode Proportions & Invariants", async (t) => {
  await t.test("Stacked mode forces flex-direction: column !important and 100% width", () => {
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\][^{]*\{[^}]*display:\s*flex!important;/s
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\][^{]*\{[^}]*flex-direction:\s*column!important;/s
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\.is-stacked[^{]*\{[^}]*flex-direction:\s*column!important;/s
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\][^{]*\{[^}]*width:\s*100%!important;/s
    );
  });

  await t.test("Stacked mode enforces editor textarea min-height: 240px!important", () => {
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.editor\s+textarea[^{]*\{[^}]*min-height:\s*240px!important;/s
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\.is-stacked\s+\.editor\s+textarea[^{]*\{[^}]*min-height:\s*240px!important;/s
    );
  });

  await t.test("Stacked mode enforces preview iframe min-height: 280px!important", () => {
    assert.match(
      stylesCss,
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.previewrow\s+\.preview[^{]*\{[^}]*min-height:\s*280px!important;/s
    );
    assert.match(
      stylesCss,
      /\.editor-preview-split\.is-stacked\s+\.previewrow\s+\.preview[^{]*\{[^}]*min-height:\s*280px!important;/s
    );
  });

  await t.test("Stacked mode rules do not assign fixed pixel widths to prevent horizontal overflow", () => {
    const stackedSection = stylesCss.slice(
      stylesCss.indexOf("Milestone 2: Stacked Layout Mode"),
      stylesCss.indexOf(".project{")
    );
    assert.doesNotMatch(stackedSection, /width:\s*[0-9]{3,}px/, "Stacked mode must not set fixed pixel widths");
    assert.doesNotMatch(stackedSection, /min-width:\s*[0-9]{3,}px/, "Stacked mode must not set large min-widths");
  });

  await t.test(".editorhead has overflow-x handling to prevent toolbar clipping", () => {
    assert.match(stylesCss, /\.editorhead\{[^}]*overflow-x:\s*auto;/, "editorhead should allow safe horizontal scroll");
  });
});

// =============================================================================
// Suite 3: Mobile Priority Guarantee (<= 767px)
// =============================================================================
test("Challenger 2 Suite 3: Mobile Priority Guarantee & Single-Pane Isolation", async (t) => {
  const mobileBlock = extractMediaQueryBlock(stylesCss, "@media(max-width:767px)");
  assert.ok(mobileBlock, "@media(max-width:767px) block must be present");

  await t.test(".layout-toggle-btn is strictly hidden on mobile", () => {
    assert.match(mobileBlock, /\.layout-toggle-btn\{display:none!important\}/);
  });

  await t.test("data-mobile-view='editor' strictly hides .previewrow", () => {
    assert.match(
      mobileBlock,
      /article\.card\[data-mobile-view="editor"\]\s+\.previewrow\{display:none!important\}/
    );
  });

  await t.test("data-mobile-view='preview' strictly hides .editor and .prompt", () => {
    assert.match(
      mobileBlock,
      /article\.card\[data-mobile-view="preview"\]\s+\.editor\{display:none!important\}/
    );
    assert.match(
      mobileBlock,
      /article\.card\[data-mobile-view="preview"\]\s+\.prompt\{display:none!important\}/
    );
  });

  await t.test("Stacked mode rules do NOT declare display properties on .editor or .previewrow that compromise isolation", () => {
    const stackedMatch = stylesCss.match(
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.editor[^{]*\{([^}]*)\}/
    );
    assert.ok(stackedMatch, "Stacked editor rule exists");
    assert.doesNotMatch(
      stackedMatch[1],
      /display\s*:/,
      "Stacked .editor rule must not override mobile display:none"
    );

    const stackedPreviewMatch = stylesCss.match(
      /\.editor-preview-split\[data-layout-orientation="stacked"\]\s+\.previewrow[^{]*\{([^}]*)\}/
    );
    assert.ok(stackedPreviewMatch, "Stacked .previewrow rule exists");
    assert.doesNotMatch(
      stackedPreviewMatch[1],
      /display\s*:/,
      "Stacked .previewrow rule must not override mobile display:none"
    );
  });
});

// =============================================================================
// Suite 4: Touch Target Verification (>= 44px)
// =============================================================================
test("Challenger 2 Suite 4: Touch Targets on Interactive Controls", async (t) => {
  await t.test(".layout-toggle-btn has min-height: 44px and min-width: 44px", () => {
    assert.match(stylesCss, /\.layout-toggle-btn\{[^}]*min-height:\s*44px;/);
    assert.match(stylesCss, /\.layout-toggle-btn\{[^}]*min-width:\s*44px;/);
  });

  await t.test(".tab rule specifies min-height >= 44px", () => {
    const tabRule = stylesCss.match(/\.tab\s*\{([^}]+)\}/);
    assert.ok(tabRule, ".tab rule exists");
    assert.match(tabRule[1], /min-height\s*:\s*44px/);
  });

  await t.test(".run rule specifies min-height >= 44px", () => {
    const runRule = stylesCss.match(/\.run\s*\{([^}]+)\}/);
    assert.ok(runRule, ".run rule exists");
    assert.match(runRule[1], /min-height\s*:\s*44px/);
  });

  await t.test(".complete rule specifies min-height >= 44px", () => {
    const completeRule = stylesCss.match(/\.complete\s*\{([^}]+)\}/);
    assert.ok(completeRule, ".complete rule exists");
    assert.match(completeRule[1], /min-height\s*:\s*44px/);
  });

  await t.test(".editor-download rule specifies min-height >= 44px", () => {
    const dlRule = stylesCss.match(/\.editor-download\s*\{([^}]+)\}/);
    assert.ok(dlRule, ".editor-download rule exists");
    assert.match(dlRule[1], /min-height\s*:\s*44px/);
  });

  await t.test(".mobile-tab-btn specifies min-height >= 44px", () => {
    const mobileTabRule = stylesCss.match(/\.mobile-tab-btn\s*\{([^}]+)\}/);
    assert.ok(mobileTabRule, ".mobile-tab-btn rule exists");
    assert.match(mobileTabRule[1], /min-height\s*:\s*44px/);
  });
});

// =============================================================================
// Suite 5: Adversarial State & Storage Robustness
// =============================================================================
test("Challenger 2 Suite 5: Adversarial State Mutation & Resilience", async (t) => {
  await t.test("Resilient to SecurityError when localStorage is blocked (private mode)", () => {
    const mockEnv = createStressMockDOM();
    mockEnv.localStorageMock._setThrow(true, new Error("SecurityError: access denied"));
    const sandbox = runLayoutOrientationSandbox(mockEnv);

    // Should not throw and fallback safely to 'side'
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "side");
    // Toggling should also not throw
    assert.doesNotThrow(() => {
      mockEnv.toggleBtn.onclick();
    });
    // DOM should flip even if localStorage throws
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
  });

  await t.test("Resilient to QuotaExceededError when saving preferences", () => {
    const mockEnv = createStressMockDOM();
    const sandbox = runLayoutOrientationSandbox(mockEnv);
    mockEnv.localStorageMock._setThrow(true, new Error("QuotaExceededError"));

    assert.doesNotThrow(() => {
      sandbox.window.setLayoutOrientation("stacked");
    });
    assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), "stacked");
  });

  await t.test("Corrupt and malicious localStorage values default safely to 'side'", () => {
    const maliciousValues = [
      "",
      "   ",
      "null",
      "undefined",
      "true",
      "false",
      "SIDE",
      "STACKED",
      "__proto__",
      "constructor",
      "<script>alert(1)</script>",
      "../stacked",
      "123"
    ];

    for (const val of maliciousValues) {
      const mockEnv = createStressMockDOM({ steplearn_editor_orientation: val });
      const sandbox = runLayoutOrientationSandbox(mockEnv);
      assert.equal(
        mockEnv.split.getAttribute("data-layout-orientation"),
        "side",
        `Value "${val}" must fall back to "side"`
      );
      assert.equal(
        mockEnv.toggleBtn.getAttribute("data-layout"),
        "side"
      );
    }
  });

  await t.test("High-frequency oscillation stress (200 toggles)", () => {
    const mockEnv = createStressMockDOM();
    const sandbox = runLayoutOrientationSandbox(mockEnv);

    for (let i = 0; i < 200; i++) {
      mockEnv.toggleBtn.onclick();
      const expected = (i % 2 === 0) ? "stacked" : "side";
      assert.equal(mockEnv.split.getAttribute("data-layout-orientation"), expected);
      assert.equal(mockEnv.toggleBtn.getAttribute("data-layout"), expected);
      assert.equal(mockEnv.toggleBtn.getAttribute("aria-pressed"), expected === "stacked" ? "true" : "false");
    }
  });

  await t.test("Does not throw if DOM elements are missing", () => {
    const mockEnv = createStressMockDOM();
    mockEnv.documentMock.querySelector = () => null;
    mockEnv.documentMock.getElementById = () => null;

    assert.doesNotThrow(() => {
      const sandbox = runLayoutOrientationSandbox(mockEnv);
      sandbox.window.toggleLayoutOrientation();
      sandbox.window.setLayoutOrientation("stacked");
    });
  });
});

// =============================================================================
// Suite 6: Empirical Headless Browser CDP Verification (Edge Chromium Engine)
// =============================================================================
test("Challenger 2 Suite 6: Headless Edge Empirical Layout & Overflow Verification", { skip: !hasEdge }, async (t) => {
  const server = http.createServer((req, res) => {
    let reqPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
    let fullPath = path.join(root, reqPath);
    if (fs.existsSync(fullPath)) {
      let contentType = "text/plain";
      if (fullPath.endsWith(".html")) contentType = "text/html";
      if (fullPath.endsWith(".css")) contentType = "text/css";
      if (fullPath.endsWith(".js")) contentType = "application/javascript";
      if (fullPath.endsWith(".json")) contentType = "application/json";
      if (fullPath.endsWith(".svg")) contentType = "image/svg+xml";
      res.writeHead(200, { "Content-Type": contentType });
      fs.createReadStream(fullPath).pipe(res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  server.listen(0, "127.0.0.1");
  await new Promise(r => server.on("listening", r));
  const port = server.address().port;

  const debugPort = 9224;
  const userDataDir = path.join(os.tmpdir(), ".edge_stress_" + Date.now());
  const edge = spawn(edgePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--user-data-dir=" + userDataDir,
    "--remote-debugging-port=" + debugPort,
    "http://127.0.0.1:" + port + "/"
  ]);

  const cleanup = () => {
    try { edge.kill(); } catch (e) {}
    try { server.close(); } catch (e) {}
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
  };

  let ws;
  let msgId = 1;

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener("message", handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  try {
    let tabs = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
        tabs = await res.json();
        if (tabs && tabs.length > 0) break;
      } catch (e) {}
    }

    assert.ok(tabs && tabs.length > 0, "Connected to headless Edge DevTools");
    const pageTab = tabs.find(t => t.type === "page") || tabs[0];
    ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    await sendCommand("Page.enable");
    await sendCommand("Runtime.enable");
    await sendCommand("DOM.enable");
    await new Promise(r => setTimeout(r, 400));

    const viewports = [320, 360, 375, 767, 768, 1024, 1025, 1440, 2560];

    await t.test("Stacked mode across all 9 viewports maintains min-heights and zero horizontal overflow", async () => {
      for (const w of viewports) {
        await sendCommand("Emulation.setDeviceMetricsOverride", {
          width: w,
          height: 800,
          deviceScaleFactor: 1,
          mobile: w <= 767
        });

        await sendCommand("Runtime.evaluate", {
          expression: `window.setLayoutOrientation && window.setLayoutOrientation('stacked');`
        });
        await new Promise(r => setTimeout(r, 50));

        const res = await sendCommand("Runtime.evaluate", {
          expression: `(function() {
            const editorTextarea = document.querySelector('.editor textarea');
            const previewIframe = document.querySelector('.previewrow .preview');
            const editorCs = window.getComputedStyle(editorTextarea);
            const previewCs = window.getComputedStyle(previewIframe);

            return {
              viewport: ${w},
              hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
              editorMinHeight: parseFloat(editorCs.minHeight),
              previewMinHeight: parseFloat(previewCs.minHeight)
            };
          })()`,
          returnByValue: true
        });

        const data = res.result.value;
        assert.equal(data.hasHorizontalOverflow, false, `Viewport ${w}px must not have horizontal overflow`);
        assert.ok(data.editorMinHeight >= 240, `Viewport ${w}px editor minHeight ${data.editorMinHeight} must be >= 240px`);
        assert.ok(data.previewMinHeight >= 280, `Viewport ${w}px preview minHeight ${data.previewMinHeight} must be >= 280px`);
      }
    });

    await t.test("Empirically verify mobile priority guarantee on mobile viewport (375px)", async () => {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
        mobile: true
      });

      for (const orientation of ["side", "stacked"]) {
        await sendCommand("Runtime.evaluate", {
          expression: `window.setLayoutOrientation && window.setLayoutOrientation('${orientation}');`
        });

        // Test editor view
        await sendCommand("Runtime.evaluate", {
          expression: `document.querySelector('article.card').setAttribute('data-mobile-view', 'editor');`
        });
        await new Promise(r => setTimeout(r, 50));

        let state = await sendCommand("Runtime.evaluate", {
          expression: `(function() {
            const editor = document.querySelector('.editor');
            const previewrow = document.querySelector('.previewrow');
            const toggleBtn = document.getElementById('layoutToggleBtn');
            return {
              editorDisplay: window.getComputedStyle(editor).display,
              previewrowDisplay: window.getComputedStyle(previewrow).display,
              toggleDisplay: window.getComputedStyle(toggleBtn).display
            };
          })()`,
          returnByValue: true
        });

        assert.notEqual(state.result.value.editorDisplay, "none", "Editor must be visible in editor view");
        assert.equal(state.result.value.previewrowDisplay, "none", "Preview must be hidden in editor view");
        assert.equal(state.result.value.toggleDisplay, "none", "Toggle button must be hidden on mobile");

        // Test preview view
        await sendCommand("Runtime.evaluate", {
          expression: `document.querySelector('article.card').setAttribute('data-mobile-view', 'preview');`
        });
        await new Promise(r => setTimeout(r, 50));

        state = await sendCommand("Runtime.evaluate", {
          expression: `(function() {
            const editor = document.querySelector('.editor');
            const previewrow = document.querySelector('.previewrow');
            const toggleBtn = document.getElementById('layoutToggleBtn');
            return {
              editorDisplay: window.getComputedStyle(editor).display,
              previewrowDisplay: window.getComputedStyle(previewrow).display,
              toggleDisplay: window.getComputedStyle(toggleBtn).display
            };
          })()`,
          returnByValue: true
        });

        assert.equal(state.result.value.editorDisplay, "none", "Editor must be hidden in preview view");
        assert.notEqual(state.result.value.previewrowDisplay, "none", "Preview must be visible in preview view");
        assert.equal(state.result.value.toggleDisplay, "none", "Toggle button must be hidden on mobile");
      }
    });

    await t.test("Empirically verify touch targets >= 44px on tablet/desktop viewports", async () => {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width: 1024,
        height: 768,
        deviceScaleFactor: 1,
        mobile: false
      });

      await sendCommand("Runtime.evaluate", {
        expression: `window.setLayoutOrientation && window.setLayoutOrientation('side');`
      });
      await new Promise(r => setTimeout(r, 50));

      const boxes = await sendCommand("Runtime.evaluate", {
        expression: `(function() {
          const getBox = el => {
            const rect = el.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
          };
          return {
            toggleBtn: getBox(document.getElementById('layoutToggleBtn')),
            runBtn: getBox(document.getElementById('run')),
            downloadBtn: getBox(document.getElementById('downloadLessonFile'))
          };
        })()`,
        returnByValue: true
      });

      const targets = boxes.result.value;
      assert.ok(targets.toggleBtn.height >= 44, `Toggle button height ${targets.toggleBtn.height} must be >= 44`);
      assert.ok(targets.toggleBtn.width >= 44, `Toggle button width ${targets.toggleBtn.width} must be >= 44`);
      assert.ok(targets.runBtn.height >= 44, `Run button height ${targets.runBtn.height} must be >= 44`);
      assert.ok(targets.downloadBtn.height >= 44, `Download button height ${targets.downloadBtn.height} must be >= 44`);
    });

    ws.close();
  } finally {
    cleanup();
  }
});

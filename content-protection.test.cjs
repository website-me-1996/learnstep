const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = __dirname;
const robotsTxt = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const netlifyToml = fs.readFileSync(path.join(root, "netlify.toml"), "utf8");
const securityReport = fs.readFileSync(path.join(root, "SECURITY_AND_IP_REPORT.md"), "utf8");
const contentProtectionCode = fs.readFileSync(path.join(root, "content-protection.js"), "utf8");

// Minimal mock DOM environment for testing client event handlers in Node.js
function createMockDOM() {
  const eventListeners = new Map();

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
  learnerActiveName.textContent = "أحمد";
  body.appendChild(learnerActiveName);

  const codeEditor = new MockElement("TEXTAREA", "code");
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

  const windowListeners = new Map();
  const clipboardWrites = [];
  let currentSelectionRanges = [{ node: body }];
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
    LearnerProfiles: {
      active() {
        return { name: "أحمد المبرمج" };
      }
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

  return { mockDoc, mockWindow, elementsById, lesson, body, main, codeEditor, slotInput, previewIframe, clipboardWrites, setSelectionRanges: (ranges) => { currentSelectionRanges = ranges; }, getSelectionRanges: () => currentSelectionRanges };
}

class MockEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.defaultPrevented = false;
    this.propagationStopped = false;
    this.cancelable = init.cancelable !== false;
    this.key = init.key || "";
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

// -----------------------------------------------------------------------------
// Test Suite 1: robots.txt and AI Crawler Access Directives (R3)
// -----------------------------------------------------------------------------
test("robots.txt exists, is syntactically valid, and explicitly blocks required AI scrapers", () => {
  assert.ok(robotsTxt.length > 50, "robots.txt must not be empty");

  // Validate syntax: lines must be comments, directives (User-agent, Disallow, Allow), or empty
  const lines = robotsTxt.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    assert.match(
      line,
      /^(?:User-agent|Disallow|Allow|Crawl-delay|Sitemap):\s*.+$/i,
      `Invalid robots.txt line: "${line}"`
    );
  }

  // Parse user-agent blocks to verify explicit Disallow: /
  const requiredCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Anthropic-ai",
    "CCBot",
    "Google-Extended",
    "PerplexityBot"
  ];

  for (const bot of requiredCrawlers) {
    const pattern = new RegExp(
      `User-agent:\\s*${bot}\\s*[\\r\\n]+(?:#[^\\r\\n]*[\\r\\n]+)*Disallow:\\s*/`,
      "i"
    );
    assert.match(
      robotsTxt,
      pattern,
      `robots.txt must contain explicit Disallow: / directive for ${bot}`
    );
  }

  // Also check additional scrapers
  for (const bot of ["Bytespider", "Diffbot", "FacebookBot"]) {
    const pattern = new RegExp(`User-agent:\\s*${bot}`, "i");
    assert.match(robotsTxt, pattern, `robots.txt should cover additional AI bot ${bot}`);
  }

  // Public/robots.txt should also exist for Vite static build output
  const publicRobots = fs.readFileSync(path.join(root, "public", "robots.txt"), "utf8");
  assert.equal(publicRobots, robotsTxt, "public/robots.txt must match root robots.txt");
});

test("index.html and server configs include AI scraping prevention meta tags and headers", () => {
  assert.match(indexHtml, /<meta\s+name=["']robots["']\s+content=["'][^"']*noai/i);
  assert.match(indexHtml, /<meta\s+name=["']robots["']\s+content=["'][^"']*noimageai/i);
  assert.match(indexHtml, /<meta\s+name=["']robots["']\s+content=["'][^"']*noarchive/i);

  assert.match(netlifyToml, /X-Robots-Tag\s*=\s*["'][^"']*noai/i);
  assert.match(netlifyToml, /X-Robots-Tag\s*=\s*["'][^"']*noimageai/i);
});

// -----------------------------------------------------------------------------
// Test Suite 2: CSS Deterrents, Print Concealment, and Watermark Styles (R1, R2)
// -----------------------------------------------------------------------------
test("styles.css disables text selection across learning areas while preserving input usability", () => {
  // Check text selection is disabled on learning containers
  assert.match(stylesCss, /user-select:\s*none/i, "user-select: none must be present in stylesheet");
  assert.match(stylesCss, /-webkit-user-select:\s*none/i, "-webkit-user-select: none must be present");

  // Check inputs, textareas, and code editors preserve text selection
  assert.match(
    stylesCss,
    /(?:input|textarea|#code|\.cm-editor|\.cm-content)[^{]*\{[^}]*user-select:\s*text/i,
    "user-select: text must be preserved for input and code editor elements"
  );
});

test("styles.css conceals content during print mode and provides copyright notice", () => {
  assert.match(stylesCss, /@media\s+print\s*\{/i, "@media print must be defined");
  assert.match(
    stylesCss,
    /@media\s+print\s*\{[\s\S]*?display:\s*none\s*!important/i,
    "print styles must hide learning elements"
  );
  assert.match(
    stylesCss,
    /\.blur-protection-overlay[\s\S]*?display:\s*none\s*!important/i,
    "print styles must hide blur protection overlay"
  );
  assert.match(
    stylesCss,
    /\.learning-watermark[\s\S]*?display:\s*none\s*!important/i,
    "print styles must hide learning watermark"
  );
  assert.match(
    stylesCss,
    /content:\s*["'][^"']*الملكية الفكرية/i,
    "print stylesheet must display intellectual property notice"
  );
});

test("styles.css defines screen capture blur and watermark styling", () => {
  assert.match(stylesCss, /filter:\s*blur\(/i, "blur filter must be defined in stylesheet");
  assert.match(
    stylesCss,
    /user-drag:\s*none/i,
    "user-drag: none must be defined for media assets"
  );
  assert.match(
    stylesCss,
    /\.learning-watermark\s*\{[^}]*pointer-events:\s*none/i,
    "watermark must not intercept pointer events"
  );
  assert.match(
    stylesCss,
    /\.blur-protection-overlay\s*\{/i,
    "blur protection overlay class must be styled"
  );
});

// -----------------------------------------------------------------------------
// Test Suite 3: Client-Side Deterrents & Shortcut Interception (R1, R2, R5)
// -----------------------------------------------------------------------------
const vm = require("node:vm");

function createProtectionInstance(mockWindow, mockDoc) {
  const context = {
    window: mockWindow,
    document: mockDoc,
    Date,
    setTimeout,
    clearTimeout,
    setInterval: mockWindow.setInterval || setInterval,
    clearInterval: mockWindow.clearInterval || clearInterval,
    getComputedStyle: () => ({ position: "static" }),
    console
  };
  vm.createContext(context);
  vm.runInContext(contentProtectionCode, context);
  const protection = context.window.ContentProtection;
  protection.init();
  return protection;
}

test("content-protection module intercepts right-click context menu", () => {
  const { mockDoc, mockWindow, lesson } = createMockDOM();
  const Protection = createProtectionInstance(mockWindow, mockDoc);

  const contextEvent = new MockEvent("contextmenu", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(contextEvent);
  assert.equal(contextEvent.defaultPrevented, true, "contextmenu event must be prevented");
  Protection.destroy();
});

test("content-protection module intercepts copy and cut events on protected lesson content while allowing editor usage", () => {
  const { mockDoc, mockWindow, lesson, codeEditor, slotInput } = createMockDOM();
  const Protection = createProtectionInstance(mockWindow, mockDoc);

  // Lesson content: copy and cut should be blocked and clipboard cleared
  const copyEvent = new MockEvent("copy", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(copyEvent);
  assert.equal(copyEvent.defaultPrevented, true, "copy event on lesson content must be prevented");
  assert.equal(copyEvent.clipboardData.cleared, true, "clipboard data should be cleared on protected lesson copy");

  const cutEvent = new MockEvent("cut", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(cutEvent);
  assert.equal(cutEvent.defaultPrevented, true, "cut event on lesson content must be prevented");
  assert.equal(cutEvent.clipboardData.cleared, true, "clipboard data should be cleared on protected lesson cut");

  // Adversarial check: activeElement in editor must NOT leak copy permission to lesson content
  mockDoc.activeElement = codeEditor;
  const leakedCopyEvent = new MockEvent("copy", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(leakedCopyEvent);
  assert.equal(leakedCopyEvent.defaultPrevented, true, "copy on lesson must be blocked even when activeElement is code editor");
  assert.equal(leakedCopyEvent.clipboardData.cleared, true, "clipboard must be cleared even when activeElement is code editor");

  const leakedCutEvent = new MockEvent("cut", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(leakedCutEvent);
  assert.equal(leakedCutEvent.defaultPrevented, true, "cut on lesson must be blocked even when activeElement is code editor");
  mockDoc.activeElement = mockDoc.body;

  // Code editor and input elements: copy and cut must NOT be blocked (R5 Non-Interference)
  const editorCopyEvent = new MockEvent("copy", { cancelable: true, target: codeEditor });
  mockDoc.dispatchEvent(editorCopyEvent);
  assert.equal(editorCopyEvent.defaultPrevented, false, "copy event inside code editor must be permitted");
  assert.equal(editorCopyEvent.clipboardData.cleared, false, "clipboard data inside code editor must not be wiped");

  const editorCutEvent = new MockEvent("cut", { cancelable: true, target: codeEditor });
  mockDoc.dispatchEvent(editorCutEvent);
  assert.equal(editorCutEvent.defaultPrevented, false, "cut event inside code editor must be permitted");
  assert.equal(editorCutEvent.clipboardData.cleared, false, "clipboard data inside code editor must not be wiped");

  const slotCopyEvent = new MockEvent("copy", { cancelable: true, target: slotInput });
  mockDoc.dispatchEvent(slotCopyEvent);
  assert.equal(slotCopyEvent.defaultPrevented, false, "copy event inside slot builder input must be permitted");

  // Selection start (selectstart): blocked on lesson content, permitted in editor and inputs
  const lessonSelectStart = new MockEvent("selectstart", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(lessonSelectStart);
  assert.equal(lessonSelectStart.defaultPrevented, true, "selectstart on lesson content must be prevented");

  const editorSelectStart = new MockEvent("selectstart", { cancelable: true, target: codeEditor });
  mockDoc.dispatchEvent(editorSelectStart);
  assert.equal(editorSelectStart.defaultPrevented, false, "selectstart inside code editor must be permitted");

  // Drag start (dragstart): blocked on lesson content, permitted in editor
  const lessonDragStart = new MockEvent("dragstart", { cancelable: true, target: lesson });
  mockDoc.dispatchEvent(lessonDragStart);
  assert.equal(lessonDragStart.defaultPrevented, true, "dragstart on lesson content must be prevented");

  const editorDragStart = new MockEvent("dragstart", { cancelable: true, target: codeEditor });
  mockDoc.dispatchEvent(editorDragStart);
  assert.equal(editorDragStart.defaultPrevented, false, "dragstart inside code editor must be permitted");

  Protection.destroy();
});

test("content-protection module blocks DevTools, save, and print keyboard shortcuts while preserving editor shortcuts", () => {
  const { mockDoc, mockWindow, lesson, codeEditor, slotInput } = createMockDOM();
  const Protection = createProtectionInstance(mockWindow, mockDoc);

  const testCases = [
    { name: "F12 key", init: { key: "F12", keyCode: 123 } },
    { name: "Ctrl+Shift+I", init: { key: "I", ctrlKey: true, shiftKey: true } },
    { name: "Ctrl+Shift+J", init: { key: "J", ctrlKey: true, shiftKey: true } },
    { name: "Ctrl+Shift+C", init: { key: "C", ctrlKey: true, shiftKey: true } },
    { name: "Ctrl+Shift+K (Firefox)", init: { key: "K", ctrlKey: true, shiftKey: true } },
    { name: "Ctrl+Shift+E (Firefox Network)", init: { key: "E", ctrlKey: true, shiftKey: true } },
    { name: "Ctrl+Shift+M (Responsive Design)", init: { key: "M", ctrlKey: true, shiftKey: true } },
    { name: "Cmd+Option+I (Mac)", init: { key: "I", metaKey: true, altKey: true } },
    { name: "Cmd+Option+J (Mac)", init: { key: "J", metaKey: true, altKey: true } },
    { name: "Cmd+Option+C (Mac)", init: { key: "C", metaKey: true, altKey: true } },
    { name: "Cmd+Option+K (Mac)", init: { key: "K", metaKey: true, altKey: true } },
    { name: "Cmd+Option+E (Mac Network)", init: { key: "E", metaKey: true, altKey: true } },
    { name: "Ctrl+U (View Source)", init: { key: "U", ctrlKey: true } },
    { name: "Cmd+Option+U (Mac View Source)", init: { key: "U", metaKey: true, altKey: true } },
    { name: "Ctrl+S (Save Page)", init: { key: "S", ctrlKey: true } },
    { name: "Cmd+S (Mac Save)", init: { key: "S", metaKey: true } },
    { name: "Ctrl+P (Print Page)", init: { key: "P", ctrlKey: true } },
    { name: "Cmd+P (Mac Print)", init: { key: "P", metaKey: true } },
    { name: "Ctrl+C on lesson content", init: { key: "c", ctrlKey: true, target: lesson } },
    { name: "Ctrl+Insert on lesson content", init: { key: "Insert", ctrlKey: true, target: lesson } },
    { name: "Ctrl+X on lesson content", init: { key: "x", ctrlKey: true, target: lesson } },
    { name: "Cmd+C on lesson content", init: { key: "c", metaKey: true, target: lesson } },
    { name: "Ctrl+A on lesson content", init: { key: "a", ctrlKey: true, target: lesson } },
    { name: "Cmd+A on lesson content", init: { key: "a", metaKey: true, target: lesson } },
    { name: "Shift+Delete on lesson content", init: { key: "Delete", keyCode: 46, shiftKey: true, target: lesson } },
    { name: "Shift+F10 (Keyboard Context Menu)", init: { key: "F10", keyCode: 121, shiftKey: true, target: lesson } },
    { name: "ContextMenu key", init: { key: "ContextMenu", keyCode: 93, target: lesson } }
  ];

  for (const tc of testCases) {
    const event = new MockEvent("keydown", { cancelable: true, ...tc.init });
    mockDoc.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true, `${tc.name} must be intercepted and prevented`);
  }

  // Normal character typing in editor/inputs must NOT be prevented
  const normalInputEvent = new MockEvent("keydown", {
    cancelable: true,
    key: "a",
    keyCode: 65,
    target: codeEditor
  });
  mockDoc.dispatchEvent(normalInputEvent);
  assert.equal(normalInputEvent.defaultPrevented, false, "Regular character input must not be blocked");

  // Keyboard copy and cut inside code editor and inputs must NOT be prevented (R5 Non-Interference)
  const editorCopyKey = new MockEvent("keydown", { cancelable: true, key: "c", ctrlKey: true, target: codeEditor });
  mockDoc.dispatchEvent(editorCopyKey);
  assert.equal(editorCopyKey.defaultPrevented, false, "Ctrl+C inside code editor must not be blocked");

  const editorCutKey = new MockEvent("keydown", { cancelable: true, key: "x", ctrlKey: true, target: codeEditor });
  mockDoc.dispatchEvent(editorCutKey);
  assert.equal(editorCutKey.defaultPrevented, false, "Ctrl+X inside code editor must not be blocked");

  const editorShiftDeleteKey = new MockEvent("keydown", { cancelable: true, key: "Delete", keyCode: 46, shiftKey: true, target: codeEditor });
  mockDoc.dispatchEvent(editorShiftDeleteKey);
  assert.equal(editorShiftDeleteKey.defaultPrevented, false, "Shift+Delete inside code editor must not be blocked");

  const editorCmdCopyKey = new MockEvent("keydown", { cancelable: true, key: "c", metaKey: true, target: codeEditor });
  mockDoc.dispatchEvent(editorCmdCopyKey);
  assert.equal(editorCmdCopyKey.defaultPrevented, false, "Cmd+C inside code editor must not be blocked");

  const slotInputCopyKey = new MockEvent("keydown", { cancelable: true, key: "c", ctrlKey: true, target: slotInput });
  mockDoc.dispatchEvent(slotInputCopyKey);
  assert.equal(slotInputCopyKey.defaultPrevented, false, "Ctrl+C inside slot builder input must not be blocked");

  // Ctrl+A / Cmd+A inside code editor and inputs must NOT be prevented (R5 Non-Interference)
  const editorSelectAllKey = new MockEvent("keydown", { cancelable: true, key: "a", ctrlKey: true, target: codeEditor });
  mockDoc.dispatchEvent(editorSelectAllKey);
  assert.equal(editorSelectAllKey.defaultPrevented, false, "Ctrl+A inside code editor must not be blocked");

  const slotSelectAllKey = new MockEvent("keydown", { cancelable: true, key: "a", ctrlKey: true, target: slotInput });
  mockDoc.dispatchEvent(slotSelectAllKey);
  assert.equal(slotSelectAllKey.defaultPrevented, false, "Ctrl+A inside slot builder input must not be blocked");

  Protection.destroy();
});

test("content-protection module applies blur deterrence on focus loss and restores on focus", () => {
  const { mockDoc, mockWindow, body, previewIframe, clipboardWrites } = createMockDOM();
  const Protection = createProtectionInstance(mockWindow, mockDoc);

  assert.equal(Protection.isBlurred(), false, "Initial state should not be blurred");

  // Interaction with preview iframe should NOT trigger blur (R5 Non-Interference)
  mockDoc.activeElement = previewIframe;
  mockWindow.dispatchEvent(new MockEvent("blur"));
  assert.equal(Protection.isBlurred(), false, "Focus moving to preview iframe must NOT blur learning content");

  // Window loses focus when activeElement is not an internal iframe
  mockDoc.activeElement = body;
  mockWindow.dispatchEvent(new MockEvent("blur"));
  assert.equal(Protection.isBlurred(), true, "Content must be blurred when window loses focus");
  assert.equal(body.classList.contains("content-blurred"), true);

  // Window regains focus
  mockWindow.dispatchEvent(new MockEvent("focus"));
  assert.equal(Protection.isBlurred(), false, "Content must unblur when window regains focus");
  assert.equal(body.classList.contains("content-blurred"), false);

  // PrintScreen keydown triggers immediate blur, screen shield, and clipboard overwrite
  mockDoc.dispatchEvent(new MockEvent("keydown", { cancelable: true, key: "PrintScreen", keyCode: 44 }));
  assert.equal(Protection.isBlurred(), true, "PrintScreen key must trigger immediate blur");
  assert.equal(Protection.isShieldActive(), true, "PrintScreen keydown must activate blackout shield");
  assert.ok(clipboardWrites.length > 0, "Clipboard must be overwritten on PrintScreen press");
  assert.match(clipboardWrites[clipboardWrites.length - 1], /تنفيذ وتصميم المهندس أحمد عاشور/);
  assert.match(clipboardWrites[clipboardWrites.length - 1], /steplearn/);
  mockWindow.dispatchEvent(new MockEvent("focus"));
  assert.equal(Protection.isBlurred(), false, "Content must unblur after focus restore");

  // PrintScreen keyup triggers blur, shield, and clipboard overwrite
  mockDoc.dispatchEvent(new MockEvent("keyup", { cancelable: true, key: "PrintScreen", keyCode: 44 }));
  assert.equal(Protection.isBlurred(), true, "PrintScreen keyup must trigger blur");
  assert.equal(Protection.isShieldActive(), true, "PrintScreen keyup must activate blackout shield");
  mockWindow.dispatchEvent(new MockEvent("focus"));
  assert.equal(Protection.isBlurred(), false, "Content must unblur after focus restore");

  // Mobile pagehide event triggers blur
  mockWindow.dispatchEvent(new MockEvent("pagehide"));
  assert.equal(Protection.isBlurred(), true, "pagehide event must blur content");

  // Mobile touchstart restores focus
  mockWindow.dispatchEvent(new MockEvent("touchstart"));
  assert.equal(Protection.isBlurred(), false, "touchstart event must unblur content");

  // Mobile selectionchange clears non-editable selections
  mockDoc.dispatchEvent(new MockEvent("selectionchange"));

  // Tab hidden via visibilitychange
  mockDoc.hidden = true;
  mockDoc.dispatchEvent(new MockEvent("visibilitychange"));
  assert.equal(Protection.isBlurred(), true, "Content must blur when tab is hidden");

  // Tab visible via visibilitychange
  mockDoc.hidden = false;
  mockDoc.dispatchEvent(new MockEvent("visibilitychange"));
  assert.equal(Protection.isBlurred(), false, "Content must unblur when tab becomes visible");

  // Afterprint event cleans up blur state
  mockDoc.body.classList.add("content-blurred");
  assert.equal(Protection.isBlurred(), true);
  mockWindow.dispatchEvent(new MockEvent("afterprint"));
  assert.equal(Protection.isBlurred(), false, "Content must unblur when print dialog completes");

  // matchMedia print change triggers blur and restore
  const printQuery = mockWindow.matchMedia("print");
  printQuery.dispatchChange(true);
  assert.equal(Protection.isBlurred(), true, "Entering print mode via matchMedia must trigger blur");
  printQuery.dispatchChange(false);
  assert.equal(Protection.isBlurred(), false, "Exiting print mode via matchMedia must unblur");

  Protection.destroy();
});

test("dynamic watermark is rendered with active learner info without impeding interaction", () => {
  const { mockDoc, mockWindow, lesson } = createMockDOM();
  const Protection = createProtectionInstance(mockWindow, mockDoc);

  Protection.renderWatermark();
  const watermarkText = Protection.getWatermarkText();
  assert.ok(watermarkText.length > 0, "Watermark text must not be empty");
  assert.match(watermarkText, /steplearn/, "Watermark must include steplearn branding");
  assert.match(watermarkText, /تنفيذ وتصميم المهندس أحمد عاشور/, "Watermark must include attribution to Engineer Ahmed Ashour");
  assert.match(watermarkText, /خُطوة/, "Watermark must include Khotwa branding");
  assert.match(watermarkText, /أحمد المبرمج/, "Watermark must dynamically include active learner name");
  assert.match(watermarkText, /محتوى تعليمي محمي/, "Watermark must declare protected content");

  const watermarkEl = mockDoc.getElementById("learningWatermark");
  assert.ok(watermarkEl, "Watermark element must exist in the DOM");
  assert.equal(watermarkEl.getAttribute("aria-hidden"), "true", "Watermark should have aria-hidden for accessibility");

  Protection.destroy();
});

// -----------------------------------------------------------------------------
// Test Suite 4: Technical Security Advisory Report Validation (R4)
// -----------------------------------------------------------------------------
test("SECURITY_AND_IP_REPORT.md comprehensively covers client limitations and backend safeguards", () => {
  assert.ok(securityReport.length > 2000, "Security advisory report must be detailed and comprehensive");

  // R4 Part 1: Technical feasibility and client limitations
  assert.match(securityReport, /OS-level/i, "Report must explain OS-level screen capture boundaries");
  assert.match(securityReport, /headless/i, "Report must explain automated headless browser scraping");
  assert.match(securityReport, /camera|analog hole/i, "Report must address physical/optical capture");
  assert.match(securityReport, /DevTools|DOM/i, "Report must address DevTools and DOM inspection");

  // R4 Part 2: Backend and architectural IP safeguards
  assert.match(securityReport, /server-side/i, "Report must detail server-side code evaluation");
  assert.match(securityReport, /watermark/i, "Report must address forensic watermarking (visible and invisible)");
  assert.match(securityReport, /rate-limit|bot/i, "Report must detail rate-limiting and bot mitigation");
  assert.match(securityReport, /copyright|DMCA/i, "Report must detail legal protection frameworks");
});

test("app.js escapeHtml securely escapes single quotes and prevents attribute breakout", () => {
  const appJsCode = fs.readFileSync(path.join(root, "app.js"), "utf8");
  assert.match(
    appJsCode,
    /\.replace\(\/'\/g,\s*["']&#39;["']\)/,
    "app.js escapeHtml must escape single quotes"
  );
});


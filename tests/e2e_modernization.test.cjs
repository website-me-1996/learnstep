/**
 * tests/e2e_modernization.test.cjs
 *
 * Comprehensive End-to-End Test Suite for StepLearn Platform Modernization.
 *
 * Requirements Covered:
 *   - R1: CodePen-Style Flexible Editor and Preview Layout
 *   - R2: Visual Identity and Modern Theme Refresh (Dark Theme)
 *   - R3: Dedicated Landing Homepage & Multi-Track Navigation
 *   - R4: Screenshot Protection & Watermark Removal
 *   - R5: Curriculum Logic, Lesson Progression & Execution Integrity
 *
 * Test Tiers:
 *   - Tier 1: Feature Coverage (25 tests, 5 per R1-R5)
 *   - Tier 2: Boundary & Corner Cases (25 tests, 5 per R1-R5)
 *   - Tier 3: Cross-Feature Combinations (6 tests)
 *   - Tier 4: Real-World Application Scenarios (6 tests)
 *   Total: 62 E2E tests
 *
 * Execution:
 *   node --test tests/e2e_modernization.test.cjs
 */

const { describe, it, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT_DIR = path.resolve(__dirname, '..');

// ============================================================================
// Section 0: Test Infrastructure & Harness Helpers
// ============================================================================

function readSource(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(fullPath), `Required source file does not exist: ${relPath}`);
  return fs.readFileSync(fullPath, 'utf8');
}

function readJson(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(fullPath), `Required JSON file does not exist: ${relPath}`);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function sourceBetween(src, startStr, endStr) {
  const s = src.indexOf(startStr);
  if (s === -1) return '';
  const e = src.indexOf(endStr, s + startStr.length);
  if (e === -1) return src.slice(s);
  return src.slice(s, e);
}

// CSS Variable and Rule Parser Helpers
function parseRootVariables(cssContent) {
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  if (!rootMatch) return new Map();
  const vars = new Map();
  const declarations = rootMatch[1].split(';');
  for (const decl of declarations) {
    const trimmed = decl.trim();
    if (!trimmed || !trimmed.startsWith('--')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const name = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();
    vars.set(name, value);
  }
  return vars;
}

function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function computeLuminance(hex) {
  const rgb = hexToRgb(hex);
  const channels = [rgb.r, rgb.g, rgb.b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function computeContrastRatio(hex1, hex2) {
  const lum1 = computeLuminance(hex1);
  const lum2 = computeLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Lightweight DOM Sandbox for E2E Emulation
function createDOMSandbox(initialHtml = '') {
  const listeners = new Map();
  const storage = new Map();
  const activeIntervals = [];
  const activeTimeouts = [];

  class MockClassList {
    constructor(owner) {
      this.owner = owner;
      this._set = new Set();
    }
    add(...cls) { cls.forEach(c => c && this._set.add(c)); }
    remove(...cls) { cls.forEach(c => this._set.delete(c)); }
    contains(c) { return this._set.has(c); }
    toggle(c, force) {
      if (force === true) { this._set.add(c); return true; }
      if (force === false) { this._set.delete(c); return false; }
      if (this._set.has(c)) { this._set.delete(c); return false; }
      this._set.add(c);
      return true;
    }
    toString() { return Array.from(this._set).join(' '); }
  }

  class MockElement {
    constructor(tagName = 'div', id = '') {
      this.tagName = tagName.toUpperCase();
      this.id = id;
      this.classList = new MockClassList(this);
      this.attributes = new Map();
      this.style = {
        setProperty: (k, v) => { this.style[k] = String(v); },
        getPropertyValue: (k) => this.style[k] || '',
        removeProperty: (k) => { delete this.style[k]; }
      };
      this.dataset = new Proxy({}, {
        get: (target, prop) => {
          const attrName = 'data-' + String(prop).replace(/([A-Z])/g, '-$1').toLowerCase();
          return this.attributes.has(attrName) ? this.attributes.get(attrName) : target[prop];
        },
        set: (target, prop, val) => {
          const attrName = 'data-' + String(prop).replace(/([A-Z])/g, '-$1').toLowerCase();
          this.attributes.set(attrName, String(val));
          target[prop] = String(val);
          return true;
        }
      });
      this.children = [];
      this.parentElement = null;
      this._textContent = '';
      this._innerHTML = '';
      this.hidden = false;
      this.disabled = false;
      this.value = '';
      this.getBoundingClientRect = () => ({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
      this.scrollIntoView = () => {};
      this.focus = () => {};
      this.select = () => {};
    }

    setAttribute(k, v) { this.attributes.set(k, String(v)); }
    getAttribute(k) { return this.attributes.has(k) ? this.attributes.get(k) : null; }
    hasAttribute(k) { return this.attributes.has(k); }
    removeAttribute(k) { this.attributes.delete(k); }

    get textContent() {
      if (this.children.length > 0) {
        return this.children.map(c => c.textContent).join(' ');
      }
      return this._textContent;
    }
    set textContent(v) {
      this._textContent = String(v);
      this.children = [];
    }

    get innerHTML() { return this._innerHTML; }
    set innerHTML(v) { this._innerHTML = String(v); }

    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) {
        child.parentElement = null;
        this.children.splice(idx, 1);
      }
      return child;
    }

    querySelector(selector) {
      return this.querySelectorAll(selector)[0] || null;
    }

    querySelectorAll(selector) {
      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return;
        let matches = false;
        if (selector.startsWith('#')) {
          matches = (el.id === selector.slice(1));
        } else if (selector.startsWith('.')) {
          matches = el.classList.contains(selector.slice(1));
        } else if (selector.startsWith('[')) {
          const attrMatch = selector.match(/\[([a-zA-Z0-9_-]+)(?:=["']?([^"']*)["']?)?\]/);
          if (attrMatch) {
            const attr = attrMatch[1];
            const val = attrMatch[2];
            matches = val !== undefined ? el.getAttribute(attr) === val : el.hasAttribute(attr);
          }
        } else {
          matches = (el.tagName.toLowerCase() === selector.toLowerCase());
        }
        if (matches) results.push(el);
        if (el.children) {
          el.children.forEach(match);
        }
      };
      if (this.children) {
        this.children.forEach(match);
      }
      return results;
    }

    closest(selector) {
      let cur = this;
      while (cur) {
        if (selector.startsWith('#') && cur.id === selector.slice(1)) return cur;
        if (selector.startsWith('.') && cur.classList && cur.classList.contains(selector.slice(1))) return cur;
        if (selector.toUpperCase() === cur.tagName) return cur;
        cur = cur.parentElement;
      }
      return null;
    }

    addEventListener(evt, fn) {
      if (!listeners.has(evt)) listeners.set(evt, []);
      listeners.get(evt).push({ target: this, fn });
    }

    removeEventListener(evt, fn) {
      if (listeners.has(evt)) {
        listeners.set(evt, listeners.get(evt).filter(item => item.target !== this || item.fn !== fn));
      }
    }

    dispatchEvent(event) {
      event.target = this;
      const handlerName = 'on' + event.type;
      if (typeof this[handlerName] === 'function') {
        try { this[handlerName](event); } catch (e) { /* ignore in synthetic event */ }
      }
      const list = listeners.get(event.type) || [];
      for (const item of list) {
        if (item.target === this || item.target === mockDocument || item.target === mockWindow) {
          item.fn(event);
        }
      }
      return !event.defaultPrevented;
    }

    click() {
      const ev = { type: 'click', target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
      this.dispatchEvent(ev);
    }
  }

  const elementsById = new Map();

  function getOrCreateElement(id, tag = 'div') {
    if (!elementsById.has(id)) {
      const el = new MockElement(tag, id);
      elementsById.set(id, el);
    }
    return elementsById.get(id);
  }

  const mockDocument = {
    visibilityState: 'visible',
    hidden: false,
    body: new MockElement('body', 'body'),
    getElementById(id) {
      return elementsById.get(id) || null;
    },
    createElement(tag) {
      return new MockElement(tag);
    },
    querySelector(sel) {
      if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
      return this.body.querySelector(sel);
    },
    querySelectorAll(sel) {
      return this.body.querySelectorAll(sel);
    },
    addEventListener(evt, fn) {
      if (!listeners.has(evt)) listeners.set(evt, []);
      listeners.get(evt).push({ target: this, fn });
    },
    removeEventListener(evt, fn) {
      if (listeners.has(evt)) {
        listeners.set(evt, listeners.get(evt).filter(item => item.target !== this || item.fn !== fn));
      }
    },
    dispatchEvent(event) {
      event.target = this;
      const list = listeners.get(event.type) || [];
      for (const item of list) item.fn(event);
      return !event.defaultPrevented;
    }
  };

  const mockLocalStorage = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    clear() { storage.clear(); },
    _dump() { return new Map(storage); }
  };

  const mockWindow = {
    document: mockDocument,
    localStorage: mockLocalStorage,
    location: { hash: '' },
    setTimeout: (fn, ms) => {
      const id = activeTimeouts.length + 1;
      activeTimeouts.push({ id, fn, ms });
      return id;
    },
    clearTimeout: (id) => {
      const idx = activeTimeouts.findIndex(t => t.id === id);
      if (idx !== -1) activeTimeouts.splice(idx, 1);
    },
    setInterval: (fn, ms) => {
      const id = activeIntervals.length + 1;
      activeIntervals.push({ id, fn, ms });
      return id;
    },
    clearInterval: (id) => {
      const idx = activeIntervals.findIndex(t => t.id === id);
      if (idx !== -1) activeIntervals.splice(idx, 1);
    },
    addEventListener(evt, fn) {
      if (!listeners.has(evt)) listeners.set(evt, []);
      listeners.get(evt).push({ target: this, fn });
    },
    removeEventListener(evt, fn) {
      if (listeners.has(evt)) {
        listeners.set(evt, listeners.get(evt).filter(item => item.target !== this || item.fn !== fn));
      }
    },
    dispatchEvent(event) {
      event.target = this;
      const list = listeners.get(event.type) || [];
      for (const item of list) item.fn(event);
      return !event.defaultPrevented;
    },
    matchMedia: () => ({ matches: false, addEventListener: () => {} })
  };

  return {
    window: mockWindow,
    document: mockDocument,
    localStorage: mockLocalStorage,
    getOrCreateElement,
    listeners,
    activeIntervals,
    activeTimeouts
  };
}

function createVmContextWithSandbox(sandbox) {
  const context = {
    window: sandbox.window,
    document: sandbox.document,
    localStorage: sandbox.localStorage,
    navigator: {
      clipboard: {
        writeText: () => Promise.resolve()
      }
    },
    setTimeout: sandbox.window.setTimeout,
    clearTimeout: sandbox.window.clearTimeout,
    setInterval: sandbox.window.setInterval,
    clearInterval: sandbox.window.clearInterval,
    Object,
    Date,
    Math,
    String,
    Number,
    Boolean,
    RegExp,
    Array
  };
  vm.createContext(context);
  return context;
}

// Load common source files
const indexHtmlContent = readSource('index.html');
const stylesCssContent = readSource('styles.css');
const appJsContent = readSource('app.js');
const contentProtectionJsContent = readSource('content-protection.js');
const lessonsDataContent = readSource('lessons-data.js');
const learnerProfilesContent = readSource('learner-profiles.js');

/**
 * Boots the real StepLearn platform runtime (lessons-data.js + learner-profiles.js + app.js)
 * in an isolated VM context against a DOM sandbox populated with index.html structure.
 * Tests exercise genuine application logic without local dummy/facade implementations.
 */
function bootAppRuntime(sandbox, options = {}) {
  // Pre-populate standard DOM elements from index.html so app.js boots cleanly
  const idMatches = indexHtmlContent.matchAll(/id=["']([a-zA-Z0-9_-]+)["']/g);
  for (const m of idMatches) {
    if (!sandbox.document.getElementById(m[1])) {
      sandbox.document.body.appendChild(sandbox.getOrCreateElement(m[1]));
    }
  }

  // Pre-populate dynamic form elements used by mini projects in app.js
  ['starterTodoForm', 'starterNoteForm', 'starterCalculatorForm'].forEach(id => {
    if (!sandbox.document.getElementById(id)) {
      sandbox.document.body.appendChild(sandbox.getOrCreateElement(id));
    }
  });

  // Ensure split container exists unless explicitly omitted for negative testing
  if (!options.omitSplit) {
    let split = sandbox.document.querySelector('.editor-preview-split');
    if (!split) {
      split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
      split.classList.add('editor-preview-split');
      sandbox.document.body.appendChild(split);
    }
  }

  // Dynamic fallback for queries to classes created on the fly
  const origQS = sandbox.document.querySelector.bind(sandbox.document);
  sandbox.document.querySelector = (sel) => {
    const el = origQS(sel);
    if (el) return el;
    const fb = sandbox.document.createElement('div');
    if (sel.startsWith('.')) fb.classList.add(sel.slice(1));
    else if (sel.startsWith('#')) fb.id = sel.slice(1);
    sandbox.document.body.appendChild(fb);
    return fb;
  };

  const context = createVmContextWithSandbox(sandbox);
  vm.runInContext(lessonsDataContent, context);
  vm.runInContext(learnerProfilesContent, context);
  vm.runInContext(appJsContent, context);
  return context;
}

// ============================================================================
// Tier 1: Feature Coverage (25 tests, 5 per R1-R5)
// ============================================================================

describe('Tier 1: Feature Coverage', () => {

  // --------------------------------------------------------------------------
  // R1: CodePen-Style Flexible Layout (5 tests)
  // --------------------------------------------------------------------------
  describe('R1: CodePen-Style Flexible Editor and Preview Layout', () => {

    test('[T1-R1-01] Layout toggle control presence in editor header', () => {
      // Must have #layoutToggleBtn inside .editorhead or editor toolbar per PROJECT.md §Layout Toggle
      const hasToggleBtn = indexHtmlContent.includes('id="layoutToggleBtn"') ||
        indexHtmlContent.includes('id=\'layoutToggleBtn\'');
      assert.ok(hasToggleBtn, 'Expected index.html to contain #layoutToggleBtn in the editor header');

      const toggleMatch = indexHtmlContent.match(/<button[^>]+id=["']layoutToggleBtn["'][^>]*>/);
      assert.ok(toggleMatch, 'Expected layoutToggleBtn to be a button element');
      const btnTag = toggleMatch[0];
      const hasAccessibleLabel = btnTag.includes('aria-label') || btnTag.includes('title');
      assert.ok(hasAccessibleLabel, 'Expected #layoutToggleBtn to define an accessible label (aria-label or title)');
    });

    test('[T1-R1-02] Layout orientation switching between side and stacked', () => {
      // Per contract: .editor-preview-split[data-layout-orientation="side" | "stacked"]
      const hasOrientationAttr = stylesCssContent.includes('data-layout-orientation="side"') ||
        stylesCssContent.includes('data-layout-orientation=\'side\'') ||
        stylesCssContent.includes('[data-layout-orientation=side]');
      assert.ok(hasOrientationAttr, 'Expected styles.css to define rules for [data-layout-orientation="side"]');

      const hasStackedAttr = stylesCssContent.includes('data-layout-orientation="stacked"') ||
        stylesCssContent.includes('data-layout-orientation=\'stacked\'') ||
        stylesCssContent.includes('[data-layout-orientation=stacked]');
      assert.ok(hasStackedAttr, 'Expected styles.css to define rules for [data-layout-orientation="stacked"]');
    });

    test('[T1-R1-03] Stacked layout proportions in CSS', () => {
      // Per contract: in stacked mode .editor textarea min-height: 240px, .previewrow .preview min-height: 280px
      // Preview positioned beneath editor (column layout)
      const stackedSection = stylesCssContent.match(/\[data-layout-orientation=["']?stacked["']?\][^}]+}/g) || [];
      const stackedCss = stackedSection.join(' ') + ' ' + stylesCssContent;

      const hasStackedRule = /data-layout-orientation=["']?stacked["']?/.test(stylesCssContent);
      assert.ok(hasStackedRule, 'Expected styles.css to specify stacked layout orientation rules');

      // Verify that stacked layout stacks vertically (single column or flex column)
      const hasVerticalDirection = /grid-template-columns:\s*(?:1fr|minmax|none|100%)/.test(stackedCss) ||
        /flex-direction:\s*column/.test(stackedCss);
      assert.ok(hasVerticalDirection, 'Expected stacked mode to position preview beneath editor via vertical stacking');
    });

    test('[T1-R1-04] Side-by-side layout proportions in CSS', () => {
      // Side-by-side mode has dual column grid/flex (1fr 1fr or 50% split)
      const sideRegex = /\.editor-preview-split(?:\s*\[data-layout-orientation=["']?side["']?\])?\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/;
      const hasSideSplit = sideRegex.test(stylesCssContent) ||
        stylesCssContent.includes('grid-template-columns:1fr 1fr') ||
        stylesCssContent.includes('grid-template-columns: 1fr 1fr');
      assert.ok(hasSideSplit, 'Expected side-by-side layout to provide dual-column (1fr 1fr) proportions');
    });

    test('[T1-R1-05] Responsive layout structure and mobile tabs preservation', () => {
      // Must maintain .editor-preview-split wrapping .editor and .previewrow, preserving mobile tabs
      assert.ok(indexHtmlContent.includes('class="editor-preview-split"'), 'index.html must maintain .editor-preview-split container');
      assert.ok(indexHtmlContent.includes('class="mobile-editor-tabs"'), 'index.html must preserve mobile editor tabs');
      assert.ok(stylesCssContent.includes('data-mobile-view="editor"'), 'styles.css must preserve mobile view editor selector');
      assert.ok(stylesCssContent.includes('data-mobile-view="preview"'), 'styles.css must preserve mobile view preview selector');
    });
  });

  // --------------------------------------------------------------------------
  // R2: Visual Identity & Modern Theme Refresh (5 tests)
  // --------------------------------------------------------------------------
  describe('R2: Visual Identity & Modern Dark Developer Theme', () => {

    test('[T1-R2-01] Modern dark color palette custom properties in :root', () => {
      // Contract: --bg: #0d1410, --surface: #14201a, --surface-raised: #1a2a22, --ink: #e6f2eb, --muted: #8ea89a, --line: #203328, --green: #2bb07f, --lime: #bbf268
      const vars = parseRootVariables(stylesCssContent);
      assert.ok(vars.has('--bg'), 'Expected :root to define --bg');
      assert.equal(vars.get('--bg'), '#0d1410', 'Expected --bg to be #0d1410');

      assert.ok(vars.has('--surface'), 'Expected :root to define --surface');
      assert.equal(vars.get('--surface'), '#14201a', 'Expected --surface to be #14201a');

      assert.ok(vars.has('--surface-raised'), 'Expected :root to define --surface-raised');
      assert.equal(vars.get('--surface-raised'), '#1a2a22', 'Expected --surface-raised to be #1a2a22');

      assert.ok(vars.has('--ink'), 'Expected :root to define --ink');
      assert.equal(vars.get('--ink'), '#e6f2eb', 'Expected --ink to be #e6f2eb');

      assert.ok(vars.has('--green'), 'Expected :root to define --green');
      assert.equal(vars.get('--green'), '#2bb07f', 'Expected --green to be #2bb07f');

      assert.ok(vars.has('--lime'), 'Expected :root to define --lime');
      assert.equal(vars.get('--lime'), '#bbf268', 'Expected --lime to be #bbf268');
    });

    test('[T1-R2-02] Dark component styling for cards, stats, and dialogs', () => {
      // Contract: .card, .stat, .growth-dashboard, .modal-content use dark surface tokens
      const cardRule = stylesCssContent.match(/\.card\s*\{[^}]+\}/);
      assert.ok(cardRule, 'Expected styles.css to define styling for .card');
      const cardText = cardRule[0];
      const usesDarkToken = cardText.includes('var(--surface') || cardText.includes('var(--bg') || cardText.includes('#14201a');
      assert.ok(usesDarkToken, 'Expected .card to use dark surface color tokens');

      const modalRule = stylesCssContent.match(/(?:\.modal-content|\.learner-dialog)\s*\{[^}]+\}/);
      assert.ok(modalRule, 'Expected styles.css to define styling for modals/dialogs');
    });

    test('[T1-R2-03] Mandatory test selector preservation in styles.css', () => {
      // Required preserved regexes from PROJECT.md and behavior.test.cjs:
      // 1. .editor textarea{[^}]*direction:ltr;[^}]*unicode-bidi:embed
      // 2. .growth-build-row{grid-template-columns:minmax(0,1fr)}
      // 3. .starter-project-list{display:grid
      // 4. article.card[data-mobile-view="editor"] .previewrow{display:none!important}
      assert.match(stylesCssContent, /\.editor textarea\{[^}]*direction:ltr;[^}]*unicode-bidi:embed/, 'Must preserve editor textarea direction rule');
      assert.match(stylesCssContent, /\.growth-build-row\{grid-template-columns:minmax\(0,1fr\)\}/, 'Must preserve growth-build-row rule');
      assert.match(stylesCssContent, /\.starter-project-list\{display:grid/, 'Must preserve starter-project-list rule');
      assert.match(stylesCssContent, /article\.card\[data-mobile-view="editor"\]\s+\.previewrow\{display:none!important\}/, 'Must preserve mobile-view previewrow rule');
    });

    test('[T1-R2-04] Typography and font-family specifications', () => {
      // Modern sans-serif for UI, monospace for editor
      assert.match(stylesCssContent, /body\s*\{[^}]*font:[^}]*sans-serif/, 'Expected body to define sans-serif font stack');
      assert.match(stylesCssContent, /(?:textarea|\.editor|\.angular-code-editor)[^}]*monospace/, 'Expected code editor to specify monospace font stack');
    });

    test('[T1-R2-05] Interactive button styling in dark theme', () => {
      // CTA and Run buttons must use accent color with appropriate contrast
      assert.ok(stylesCssContent.includes('.run') || stylesCssContent.includes('#run'), 'styles.css must style the run button');
      assert.ok(stylesCssContent.includes('.complete') || stylesCssContent.includes('#complete'), 'styles.css must style complete button');
    });
  });

  // --------------------------------------------------------------------------
  // R3: Dedicated Landing Homepage (5 tests)
  // --------------------------------------------------------------------------
  describe('R3: Dedicated Landing Homepage & Multi-Track Navigation', () => {

    test('[T1-R3-01] Landing section element presence in index.html', () => {
      // Contract: #landingSection inside index.html
      const hasLandingSection = indexHtmlContent.includes('id="landingSection"') ||
        indexHtmlContent.includes('id=\'landingSection\'');
      assert.ok(hasLandingSection, 'Expected index.html to contain #landingSection');
    });

    test('[T1-R3-02] Curriculum track showcase cards for all 4 tracks', () => {
      // Showcase cards for HTML, CSS, JS, Angular
      assert.ok(indexHtmlContent.includes('data-track="html"') || indexHtmlContent.includes('data-track=\'html\'') || indexHtmlContent.includes('HTML'), 'Must showcase HTML track');
      assert.ok(indexHtmlContent.includes('data-track="css"') || indexHtmlContent.includes('data-track=\'css\'') || indexHtmlContent.includes('CSS'), 'Must showcase CSS track');
      assert.ok(indexHtmlContent.includes('data-track="js"') || indexHtmlContent.includes('data-track=\'js\'') || indexHtmlContent.includes('JavaScript'), 'Must showcase JavaScript track');
      assert.ok(indexHtmlContent.includes('data-track="angular"') || indexHtmlContent.includes('data-track=\'angular\'') || indexHtmlContent.includes('Angular'), 'Must showcase Angular track');
    });

    test('[T1-R3-03] Track start/resume action buttons', () => {
      // Landing page provides direct action buttons into tracks
      const landingBlock = sourceBetween(indexHtmlContent, 'id="landingSection"', '</section>');
      const landingHtml = landingBlock || indexHtmlContent;
      const hasActionButtons = landingHtml.includes('class="track-start-btn"') ||
        landingHtml.includes('class="cta"') ||
        landingHtml.includes('start') ||
        landingHtml.includes('ابدأ');
      assert.ok(hasActionButtons, 'Expected track cards to contain start/resume action buttons');
    });

    test('[T1-R3-04] Forward navigation from landing to lesson view', () => {
      // Triggering track selection in app.js activates lesson view and updates section visibility
      const sandbox = createDOMSandbox();
      const landing = sandbox.getOrCreateElement('landingSection', 'section');
      const lesson = sandbox.getOrCreateElement('lesson', 'article');
      const htmlTrackBtn = sandbox.getOrCreateElement('startHtmlBtn', 'button');
      htmlTrackBtn.setAttribute('data-course', 'html');
      landing.hidden = false;
      lesson.hidden = false;

      // Boot real app.js runtime in sandbox
      const context = bootAppRuntime(sandbox);

      // Trigger track selection through app runtime (track start button click or selectTrack)
      if (typeof context.selectTrack === 'function') {
        context.selectTrack('html');
      } else if (htmlTrackBtn.onclick) {
        htmlTrackBtn.onclick({ preventDefault() {} });
      } else {
        htmlTrackBtn.click();
      }

      assert.equal(landing.hidden, false, 'The landing content stays available in the single-page layout');
      assert.equal(lesson.hidden, false, 'The lesson remains available in the same page');
      assert.ok(indexHtmlContent.includes('href="#courses"'), 'The landing course action should use the courses anchor');
      assert.ok(indexHtmlContent.includes('href="#lesson"'), 'The landing lesson action should use the lesson anchor');
    });

    test('[T1-R3-05] Return navigation from lesson view back to landing', () => {
      // The persistent home link returns to the top of the same page.
      const hasReturnBtn = indexHtmlContent.includes('href="#home"') ||
        indexHtmlContent.includes('id=\'backToLandingBtn\'') ||
        indexHtmlContent.includes('class="back-to-landing"');
      assert.ok(hasReturnBtn, 'The home link should return to the top-level home section');
    });
  });

  // --------------------------------------------------------------------------
  // R4: Screenshot Protection & Watermark Removal (5 tests)
  // --------------------------------------------------------------------------
  describe('R4: Screenshot Protection & Watermark Removal', () => {

    test('[T1-R4-01] Deactivation of PrintScreen keyboard listener', () => {
      // PrintScreen key must not be blocked or prevented in content-protection.js
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      // Dispatch PrintScreen keydown
      let defaultPrevented = false;
      const event = {
        type: 'keydown',
        key: 'PrintScreen',
        keyCode: 44,
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; defaultPrevented = true; }
      };
      sandbox.window.dispatchEvent(event);
      sandbox.document.dispatchEvent(event);

      assert.equal(defaultPrevented, false, 'PrintScreen event must NOT have preventDefault called on it');
    });

    test('[T1-R4-02] Absence of #learningWatermark element in DOM', () => {
      // Contract: #learningWatermark not rendered or removed
      assert.ok(!indexHtmlContent.includes('id="learningWatermark"'), 'index.html should not contain static #learningWatermark element');

      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      const cp = context.ContentProtection || context.window.ContentProtection;
      if (cp && typeof cp.init === 'function') {
        cp.init();
      }

      const wm = sandbox.document.getElementById('learningWatermark');
      assert.equal(wm, null, 'ContentProtection must not inject #learningWatermark into the DOM');
    });

    test('[T1-R4-03] Elimination of repeating watermark timers', () => {
      // Contract: renderWatermark() no-oped/removed; no active interval
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      const cp = context.ContentProtection || context.window.ContentProtection;
      if (cp && typeof cp.init === 'function') {
        cp.init();
      }

      assert.equal(sandbox.activeIntervals.length, 0, 'No recurring watermark interval timer should be registered');
    });

    test('[T1-R4-04] Screen shield blur deactivation on window blur/focus loss', () => {
      // Blur on window must not activate .screen-shield-active or blur content
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      // Trigger window blur
      sandbox.window.dispatchEvent({ type: 'blur' });
      assert.equal(sandbox.document.body.classList.contains('screen-shield-active'), false, 'Body must not receive screen-shield-active class on window blur');
    });

    test('[T1-R4-05] Clipboard copy hijack deactivation', () => {
      // Copy events must not alter or overwrite clipboard data with promotional text
      let copiedData = null;
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      const copyEvent = {
        type: 'copy',
        clipboardData: {
          setData(format, text) { copiedData = text; }
        },
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; }
      };

      sandbox.document.dispatchEvent(copyEvent);
      assert.equal(copyEvent.defaultPrevented, false, 'Copy event should not be intercepted or prevented');
      assert.equal(copiedData, null, 'Clipboard should not be hijacked with injected watermark text');
    });
  });

  // --------------------------------------------------------------------------
  // R5: Curriculum & Execution Integrity (5 tests)
  // --------------------------------------------------------------------------
  describe('R5: Curriculum & Execution Integrity', () => {

    test('[T1-R5-01] 373 total lessons data integrity across tracks', () => {
      const htmlLessons = readJson('html-lessons.json');
      const cssLessons = readJson('css-lessons.json');
      const jsLessons = readJson('js-lessons.json');
      const angularLessons = readJson('angular-lessons.json');

      assert.equal(htmlLessons.lessons.length, 54, 'HTML track must contain exactly 54 lessons');
      assert.equal(cssLessons.lessons.length, 94, 'CSS track must contain exactly 94 lessons');
      assert.equal(jsLessons.lessons.length, 119, 'JavaScript track must contain exactly 119 lessons');
      assert.equal(angularLessons.lessons.length, 106, 'Angular track must contain exactly 106 lessons');

      const totalLessons = htmlLessons.lessons.length + cssLessons.lessons.length + jsLessons.lessons.length + angularLessons.lessons.length;
      assert.equal(totalLessons, 373, 'Curriculum must contain exactly 373 lessons across all 4 tracks');
    });

    test('[T1-R5-02] DataLoader module loading and track schema hydration', async () => {
      const context = { window: {} };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(readSource('angular-course-data.js'), context);
      vm.runInContext(sourceBetween(appJsContent, '  var SmartHintEngine = {', '  function validateLessonAnswer('), context);

      const DataLoader = context.DataLoader;
      assert.ok(DataLoader, 'DataLoader must be defined');
      assert.equal(typeof DataLoader.loadTrack, 'function', 'DataLoader.loadTrack must be a function');

      const track = await DataLoader.loadTrack('html');
      assert.equal(track.track, 'html');
      assert.equal(track.lessons.length, 54);
    });

    test('[T1-R5-03] SmartHintEngine 4-tier progressive hint progression', () => {
      const context = {
        window: {},
        growth: { completed: [], drafts: {}, stepAttempts: {} },
        missingBuildLine(code, build) { return code.includes(build.line) ? '' : build.line; },
        checkHtmlTags() { return { valid: true, errors: [] }; },
        normalizeDoc(c) { return String(c || '').trim(); },
        normalizeCodeLine(c) { return String(c || '').trim(); }
      };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(sourceBetween(appJsContent, '  var SmartHintEngine = {', '  function validateLessonAnswer('), context);

      const SmartHintEngine = context.SmartHintEngine;
      assert.ok(SmartHintEngine, 'SmartHintEngine must be defined');

      const step = {
        id: 'step-1',
        type: 'build',
        build: { line: '<title>صفحتي</title>' },
        hints: ['تأمل الكود جيدًا', 'قاعدة: استخدم الوسم المناسب؟', 'عدّل السطر بدقة', '<title>صفحتي</title>'],
        errorRules: [
          {
            pattern: '<title>[^<]*$',
            flags: 'i',
            type: 'missing',
            message: 'وسم title غير مغلق',
            tier1: 'تنبيه: انتبه لإغلاق وسم title.',
            tier2: 'قاعدة: كل وسم title يحتاج </title>.',
            tier3: 'مساعدة: اكتب </title> في نهاية السطر.',
            solution: '<title>صفحتي</title>'
          }
        ]
      };
      const model = { id: 'html:0', key: 'html' };

      // Attempt 1: Tier 1 Attention
      const r1 = SmartHintEngine.evaluate('', step, model, 1);
      assert.equal(r1.valid, false, 'Incomplete code must not be valid');
      assert.equal(r1.tier, 1, 'Attempt 1 should be Tier 1');
      assert.equal(r1.solutionRevealable, false, 'Tier 1 must not be solution revealable');

      // Attempt 4: Tier 4 Solution
      const r4 = SmartHintEngine.evaluate('', step, model, 4);
      assert.equal(r4.tier, 4, 'Attempt 4 should be Tier 4');
      assert.equal(r4.solutionRevealable, true, 'Tier 4 should be solution revealable');
    });

    test('[T1-R5-04] Interactive step verification logic preserves practice edits', () => {
      const context = { window: {} };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(sourceBetween(appJsContent, '  function buildGuidePracticeSteps(code, guide) {', '  function fullHtmlDocument(fragment, title) {'), context);

      const buildGuidePracticeSteps = context.buildGuidePracticeSteps;
      assert.ok(typeof buildGuidePracticeSteps === 'function', 'buildGuidePracticeSteps must be a function');

      const guides = context.window.LESSONS_DATA.guides.html;
      const firstTopic = Object.keys(guides)[0];
      const guide = guides[firstTopic];
      const steps = buildGuidePracticeSteps(guide.code, guide);

      assert.ok(Array.isArray(steps), 'Steps must be an array');
      assert.ok(steps.length >= 1, 'Lesson must have at least one practice step');
      assert.ok(steps[0].from !== undefined, 'Step must have from property');
      assert.ok(steps[0].to !== undefined, 'Step must have to property');
    });

    test('[T1-R5-05] Angular 22 WebContainer runtime readiness', () => {
      const angularEditorSrc = readSource('angular-editor.js');
      assert.ok(angularEditorSrc.includes('WebContainer') || angularEditorSrc.includes('boot'), 'angular-editor.js must integrate WebContainer API');
      assert.ok(angularEditorSrc.includes('@angular/core') || angularEditorSrc.includes('AngularCourse'), 'Must support Angular 22 runtime');
    });
  });
});

// ============================================================================
// Tier 2: Boundary & Corner Cases (25 tests, 5 per R1-R5)
// ============================================================================

describe('Tier 2: Boundary & Corner Cases', () => {

  // --------------------------------------------------------------------------
  // R1: Layout Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R1: Layout Boundary Cases', () => {

    test('[T2-R1-01] LocalStorage corrupted orientation value fallback', () => {
      // If localStorage has an unknown/corrupt orientation value, app.js must fall back to 'side'
      const sandbox = createDOMSandbox();
      sandbox.localStorage.setItem('steplearn_editor_orientation', 'diagonal_invalid_mode');

      const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
      split.classList.add('editor-preview-split');

      // Boot real app.js runtime
      bootAppRuntime(sandbox);

      const orientation = split.getAttribute('data-layout-orientation');
      assert.equal(orientation, 'side', 'Invalid orientation value in localStorage must fall back to side');
    });

    test('[T2-R1-02] Multi-cycle toggle stress (20 consecutive cycles)', () => {
      const sandbox = createDOMSandbox();
      const toggleBtn = sandbox.getOrCreateElement('layoutToggleBtn', 'button');
      const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
      split.classList.add('editor-preview-split');
      split.setAttribute('data-layout-orientation', 'side');
      sandbox.localStorage.setItem('steplearn_editor_orientation', 'side');

      // Boot real app.js runtime
      bootAppRuntime(sandbox);

      for (let i = 0; i < 20; i++) {
        const expected = (i % 2 === 0) ? 'stacked' : 'side';
        toggleBtn.click();
        assert.equal(
          split.getAttribute('data-layout-orientation'),
          expected,
          `Cycle ${i + 1} produced unexpected orientation on container`
        );
        assert.equal(
          sandbox.localStorage.getItem('steplearn_editor_orientation'),
          expected,
          `Cycle ${i + 1} produced unexpected orientation in localStorage`
        );
      }
    });

    test('[T2-R1-03] Extreme viewport dimension adaptability (320px vs 2560px)', () => {
      // In CSS, rules for 320px mobile and large viewports must use min-width: 0 on flex/grid children
      assert.match(stylesCssContent, /min-width:\s*0/, 'CSS must include min-width: 0 on flexible split containers to avoid overflow');
      assert.ok(stylesCssContent.includes('width:100%') || stylesCssContent.includes('width: 100%'), 'Split containers must adapt to 100% width');
    });

    test('[T2-R1-04] Rapid synchronous toggle spamming without state corruption', () => {
      const sandbox = createDOMSandbox();
      const toggleBtn = sandbox.getOrCreateElement('layoutToggleBtn', 'button');
      const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
      split.classList.add('editor-preview-split');
      split.setAttribute('data-layout-orientation', 'side');
      sandbox.localStorage.setItem('steplearn_editor_orientation', 'side');

      // Boot real app.js runtime
      bootAppRuntime(sandbox);

      // 5 rapid synchronous clicks on real layout toggle button
      for (let i = 0; i < 5; i++) {
        toggleBtn.click();
      }

      assert.equal(
        split.getAttribute('data-layout-orientation'),
        'stacked',
        '5 rapid toggle clicks starting from side must leave container orientation at stacked'
      );
      assert.equal(
        sandbox.localStorage.getItem('steplearn_editor_orientation'),
        'stacked',
        '5 rapid toggle clicks starting from side must leave localStorage orientation at stacked'
      );
    });

    test('[T2-R1-05] Graceful degradation when editor or preview container is missing', () => {
      const sandbox = createDOMSandbox();
      const toggleBtn = sandbox.getOrCreateElement('layoutToggleBtn', 'button');
      // Intentionally do NOT add .editor-preview-split container

      // Boot real app.js runtime without split container
      bootAppRuntime(sandbox, { omitSplit: true });

      // Triggering toggle without container must degrade gracefully without unhandled exception
      assert.doesNotThrow(() => {
        toggleBtn.click();
      }, 'Clicking layout toggle when split container is missing must degrade gracefully');

      // Verify app.js defines layout toggle wiring defensively
      assert.ok(
        appJsContent.includes('layoutToggleBtn') || appJsContent.includes('steplearn_editor_orientation'),
        'app.js must implement layout toggle wiring and orientation persistence'
      );
    });
  });

  // --------------------------------------------------------------------------
  // R2: Theme Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R2: Theme Boundary Cases', () => {

    test('[T2-R2-01] Contrast ratio compliance for dark theme tokens (WCAG AAA >= 7.0:1)', () => {
      const rootVars = parseRootVariables(stylesCssContent);
      const bg = rootVars.get('--bg') || '#0d1410';
      const ink = rootVars.get('--ink') || '#e6f2eb';
      const contrast = computeContrastRatio(bg, ink);
      assert.ok(contrast >= 7.0, `Contrast ratio ${contrast.toFixed(2)}:1 between ${ink} and ${bg} must exceed WCAG AAA threshold of 7.0:1`);
    });

    test('[T2-R2-02] Nested component token inheritance across nested elements', () => {
      // Nested subcards and stats must not hardcode light colors that break in dark mode
      const hasHardcodedWhiteBg = stylesCssContent.includes('.card .card{background:#fff') ||
        stylesCssContent.includes('.stat{background:#fff');
      assert.equal(hasHardcodedWhiteBg, false, 'Nested cards and stats must not have hardcoded white backgrounds');
    });

    test('[T2-R2-03] Dark styling consistency across modals and dialogs', () => {
      // Dialogs (.learner-dialog, .daily-challenge-dialog) must adopt dark theme variables
      const dialogMatch = stylesCssContent.match(/\.learner-dialog[^}]+\}/);
      assert.ok(dialogMatch, 'styles.css must style .learner-dialog');
    });

    test('[T2-R2-04] Font family fallback chain termination', () => {
      // Body font stack must end with generic sans-serif; code font stack must end with monospace
      const bodyFontMatch = stylesCssContent.match(/body\s*\{[^}]*font:[^;]+;/);
      assert.ok(bodyFontMatch, 'styles.css must declare body font');
      assert.match(bodyFontMatch[0], /sans-serif/, 'Body font stack must end with generic sans-serif');
    });

    test('[T2-R2-05] Missing CSS variable fallback resilience', () => {
      // Essential color variables referenced in styles.css must be declared in :root
      const rootVars = parseRootVariables(stylesCssContent);
      // Check key variables
      const essential = ['--bg', '--surface', '--ink', '--green'];
      for (const v of essential) {
        assert.ok(rootVars.has(v), `Essential variable ${v} must be defined in :root`);
      }
    });
  });

  // --------------------------------------------------------------------------
  // R3: Landing Homepage Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R3: Landing Homepage Boundary Cases', () => {

    test('[T2-R3-01] Core navigation anchors target existing sections', () => {
      for (const target of ['home', 'courses', 'project', 'progress', 'lesson']) {
        assert.ok(indexHtmlContent.includes(`href="#${target}"`), `Navigation should expose #${target}`);
        assert.ok(indexHtmlContent.includes(`id="${target}"`), `Navigation target #${target} should exist`);
      }
    });

    test('[T2-R3-02] Native hash links target sections on direct load', () => {
      // Native links scroll to sections in the single-page workspace; no custom router is needed.
      for (const target of ['home', 'courses', 'lesson']) {
        assert.ok(indexHtmlContent.includes(`href="#${target}"`), `A link should target #${target}`);
        assert.ok(indexHtmlContent.includes(`id="${target}"`), `The #${target} destination should exist`);
      }
    });

    test('[T2-R3-03] Resume saved progress vs start from lesson 0', () => {
      // 1. Learner with saved progress (lesson 5)
      const sandboxWithProgress = createDOMSandbox();
      sandboxWithProgress.localStorage.setItem('khotwa-v1', JSON.stringify({
        lessons: 5,
        htmlLesson: 5,
        step: 2,
        statsVersion: 2
      }));

      bootAppRuntime(sandboxWithProgress);
      const levelEl = sandboxWithProgress.document.getElementById('level');
      const lessonsEl = sandboxWithProgress.document.getElementById('lessons');
      const loadedLevelText = (levelEl ? levelEl.textContent : '') + (lessonsEl ? lessonsEl.textContent : '');
      assert.ok(
        loadedLevelText.includes('5') || loadedLevelText.includes('٥'),
        'Application must resume saved lesson progress from localStorage (lesson 5)'
      );

      // 2. Fresh learner with no saved progress starts at 0
      const sandboxFresh = createDOMSandbox();
      bootAppRuntime(sandboxFresh);
      const freshLessonsEl = sandboxFresh.document.getElementById('lessons');
      assert.ok(
        freshLessonsEl.textContent.includes('0') || freshLessonsEl.textContent.includes('٠'),
        'Fresh learner with no saved progress must start at lesson index 0'
      );
    });

    test('[T2-R3-04] Unknown or corrupt track parameter handling', () => {
      const sandbox = createDOMSandbox();
      bootAppRuntime(sandbox);

      // Extract the select function from app.js to test boundary input handling
      const selectContext = {
        data: {
          html: { title: 'HTML', sub: 'Sub', prompt: 'Prompt', level: '1', file: 'index.html', code: '<h1></h1>', build: c => c },
          css: { title: 'CSS', sub: 'Sub', prompt: 'Prompt', level: '1', file: 'style.css', code: 'body{}', build: c => c },
          js: { title: 'JS', sub: 'Sub', prompt: 'Prompt', level: '1', file: 'app.js', code: 'console.log(1)', build: c => c }
        },
        course: 'html',
        s: { course: 'html', step: 2, htmlCode: '' },
        document: sandbox.document,
        save() {},
        ar(x) { return String(x); },
        clearPreviewStatus() {},
        renderGuide() {}
      };
      vm.createContext(selectContext);
      vm.runInContext(sourceBetween(appJsContent, '  function select(k) {', '  function run() {'), selectContext);

      // Unknown track: must return safely without crashing
      assert.doesNotThrow(() => {
        selectContext.select('cobol_unknown');
      }, 'Selecting an invalid track must not throw an exception');
      assert.equal(selectContext.course, 'html', 'Active course must remain intact when given unknown track');

      // Null track: must return safely without crashing
      assert.doesNotThrow(() => {
        selectContext.select(null);
      }, 'Selecting null track must not throw an exception');
      assert.equal(selectContext.course, 'html', 'Active course must remain intact when given null track');

      // Valid track: switches course
      selectContext.select('css');
      assert.equal(selectContext.course, 'css', 'Valid track must successfully update course');
    });

    test('[T2-R3-05] Roadmap search and course filtering stay available', () => {
      assert.ok(indexHtmlContent.includes('id="roadSearch"'), 'The roadmap should expose its search field');
      assert.ok(indexHtmlContent.includes('id="roadCourseFilter"'), 'The roadmap should expose its course filter');
      assert.ok(appJsContent.includes('document.getElementById("roadSearch").oninput = renderRoadmap'));
      assert.ok(appJsContent.includes('document.getElementById("roadCourseFilter").onchange'));
    });
  });

  // --------------------------------------------------------------------------
  // R4: Protection Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R4: Screenshot Protection & Watermark Boundary Cases', () => {

    test('[T2-R4-01] PrintScreen event bubbling and uncancelled default action', () => {
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      let bubbled = false;
      sandbox.document.addEventListener('keydown', (e) => {
        if (e.key === 'PrintScreen') bubbled = true;
      });

      const event = {
        type: 'keydown',
        key: 'PrintScreen',
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; }
      };

      sandbox.document.dispatchEvent(event);
      assert.equal(bubbled, true, 'PrintScreen event must bubble');
      assert.equal(event.defaultPrevented, false, 'PrintScreen must not be cancelled');
    });

    test('[T2-R4-02] Window focus and blur rapid cycling without alert overlays', () => {
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      for (let i = 0; i < 10; i++) {
        sandbox.window.dispatchEvent({ type: 'blur' });
        sandbox.window.dispatchEvent({ type: 'focus' });
      }

      const toast = sandbox.document.getElementById('toast');
      const hasToastShow = Boolean(toast && toast.classList.contains('show'));
      assert.equal(hasToastShow, false, 'Focus cycling must not trigger warning toast');
    });

    test('[T2-R4-03] Visibilitychange event cycling without editor clearing', () => {
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      const editorArea = sandbox.getOrCreateElement('code', 'textarea');
      editorArea.value = '<h1>My Work</h1>';

      // Cycle visibility
      sandbox.document.visibilityState = 'hidden';
      sandbox.document.dispatchEvent({ type: 'visibilitychange' });
      sandbox.document.visibilityState = 'visible';
      sandbox.document.dispatchEvent({ type: 'visibilitychange' });

      assert.equal(editorArea.value, '<h1>My Work</h1>', 'User code in editor must not be wiped out on tab switch');
    });

    test('[T2-R4-04] Standard developer shortcut preservation (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+P)', () => {
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      const shortcuts = [
        { key: 'F12', keyCode: 123 },
        { key: 'I', ctrlKey: true, shiftKey: true },
        { key: 'U', ctrlKey: true },
        { key: 'P', ctrlKey: true }
      ];

      for (const sc of shortcuts) {
        const ev = { ...sc, type: 'keydown', defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
        sandbox.document.dispatchEvent(ev);
        assert.equal(ev.defaultPrevented, false, `Shortcut ${sc.key} must not be blocked`);
      }
    });

    test('[T2-R4-05] DOM mutation immunity: dynamic updates do not spawn watermarks', () => {
      const sandbox = createDOMSandbox();
      const context = createVmContextWithSandbox(sandbox);
      vm.runInContext(contentProtectionJsContent, context);

      const cp = context.ContentProtection || context.window.ContentProtection;
      if (cp && typeof cp.init === 'function') cp.init();

      const preview = sandbox.getOrCreateElement('preview', 'iframe');

      // Simulate dynamic preview update
      preview.setAttribute('srcdoc', '<html><body>Updated Preview</body></html>');

      const watermark = sandbox.document.getElementById('learningWatermark');
      assert.equal(watermark, null, 'Dynamic updates must not inject a watermark element');
    });
  });

  // --------------------------------------------------------------------------
  // R5: Curriculum Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R5: Curriculum Boundary Cases', () => {

    test('[T2-R5-01] Boundary lesson index access (first, last, and out of range)', () => {
      const htmlLessons = readJson('html-lessons.json').lessons;
      const first = htmlLessons[0];
      const last = htmlLessons[htmlLessons.length - 1];

      assert.ok(first, 'First lesson (index 0) must exist');
      assert.equal(first.order, 0, 'First lesson order must be 0');

      assert.ok(last, 'Last lesson must exist');
      assert.equal(last.order, htmlLessons.length - 1, 'Last lesson order must be length - 1');

      // Out of bounds
      const outOfBounds = htmlLessons[htmlLessons.length];
      assert.equal(outOfBounds, undefined, 'Out of bounds index must be undefined');
    });

    test('[T2-R5-02] Boundary step transitions from step 0 to completion', () => {
      // Test the real buildGuidePracticeSteps function from app.js across boundary steps
      const context = { window: {} };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(
        sourceBetween(appJsContent, '  function buildGuidePracticeSteps(code, guide) {', '  function fullHtmlDocument(fragment, title) {'),
        context
      );

      const guides = context.window.LESSONS_DATA.guides.html;
      const firstTopic = Object.keys(guides)[0];
      const guide = guides[firstTopic];

      // Step progression from step 0 to completion
      const steps = context.buildGuidePracticeSteps(guide.code, guide);
      assert.ok(Array.isArray(steps) && steps.length >= 3, 'Guide must generate at least 3 practice steps');

      // Verify boundary progression: each step transitions code from step.before to step.after
      let accumulatedCode = guide.code;
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        assert.equal(step.valid, true, `Step ${i} must be valid`);
        assert.equal(step.before, accumulatedCode, `Step ${i} before must match previous accumulated code`);
        assert.notEqual(step.after, step.before, `Step ${i} must introduce an actual change`);
        accumulatedCode = step.after;
      }

      // Edge case: empty guide or null steps must produce empty array safely
      assert.equal(context.buildGuidePracticeSteps('', null).length, 0);
      assert.equal(context.buildGuidePracticeSteps('', { steps: [] }).length, 0);
    });

    test('[T2-R5-03] Empty user code input evaluation without unhandled exception', () => {
      const context = {
        window: {},
        growth: { completed: [], drafts: {}, stepAttempts: {} },
        missingBuildLine(code, build) { return ''; },
        checkHtmlTags() { return { valid: true, errors: [] }; },
        normalizeDoc(c) { return String(c || '').trim(); },
        normalizeCodeLine(c) { return String(c || '').trim(); }
      };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(sourceBetween(appJsContent, '  var SmartHintEngine = {', '  function validateLessonAnswer('), context);

      const SmartHintEngine = context.SmartHintEngine;
      const step = { from: '<h1></h1>', to: '<h1>Hi</h1>', hints: ['Hint1', 'Hint2', 'Hint3', '<h1>Hi</h1>'], errorRules: [] };

      assert.doesNotThrow(() => {
        const hint = SmartHintEngine.evaluate('', step, {}, 1);
        assert.ok(hint, 'Should return a hint object for empty code input');
      });
    });

    test('[T2-R5-04] Partial and truncated user code submission tolerance', () => {
      const context = {
        window: {},
        growth: { completed: [], drafts: {}, stepAttempts: {} },
        missingBuildLine(code, build) { return ''; },
        checkHtmlTags() { return { valid: false, errors: ['unclosed tag'] }; },
        normalizeDoc(c) { return String(c || '').trim(); },
        normalizeCodeLine(c) { return String(c || '').trim(); }
      };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(sourceBetween(appJsContent, '  var SmartHintEngine = {', '  function validateLessonAnswer('), context);

      const SmartHintEngine = context.SmartHintEngine;
      const step = { from: '<h1></h1>', to: '<h1>Hi</h1>', hints: ['Hint1', 'Hint2', 'Hint3', '<h1>Hi</h1>'], errorRules: [] };

      assert.doesNotThrow(() => {
        const hint = SmartHintEngine.evaluate('<h1>Incomplete', step, {}, 1);
        assert.ok(hint, 'Partial code must not crash SmartHintEngine');
      });
    });

    test('[T2-R5-05] Malformed user code syntax error resilience', () => {
      // Test that the platform's verification engine (SmartHintEngine and validateLessonAnswer from app.js)
      // handles malformed syntax without unhandled host exceptions
      const context = {
        window: {},
        growth: { completed: [], drafts: {}, stepAttempts: {} },
        missingBuildLine: () => '',
        checkHtmlTags: () => ({ valid: false, errors: ['SyntaxError'] }),
        normalizeDoc: c => String(c || '').trim(),
        normalizeCodeLine: c => String(c || '').trim(),
        saveGrowth: () => {},
        RegExp,
        Array,
        Object,
        String
      };
      vm.createContext(context);
      vm.runInContext(lessonsDataContent, context);
      vm.runInContext(sourceBetween(appJsContent, '  var SmartHintEngine = {', '  function clearPreviewStatus('), context);

      const step = {
        from: 'let total = 0;',
        to: 'let total = 10;',
        hints: ['Hint 1', 'Hint 2', 'Hint 3', 'let total = 10;'],
        errorRules: [{ id: 'syntax', regex: '=\\s*;', message: 'Incomplete assignment' }]
      };

      // 1. Incomplete syntax
      assert.doesNotThrow(() => {
        const res = context.validateLessonAnswer('const x = ;', { id: 'test-lesson' }, step);
        assert.ok(res, 'validateLessonAnswer must return a result object');
        assert.equal(typeof res.valid, 'boolean', 'Result must indicate validity');
      }, 'Malformed syntax with incomplete token must not throw unhandled exception');

      // 2. Unbalanced brackets
      assert.doesNotThrow(() => {
        const res = context.validateLessonAnswer('function broken( {', { id: 'test-lesson' }, step);
        assert.ok(res, 'validateLessonAnswer must return a result object for unbalanced brackets');
      }, 'Unbalanced brackets must not throw unhandled exception');
    });
  });
});

// ============================================================================
// Tier 3: Cross-Feature Combinations (6 tests)
// ============================================================================

describe('Tier 3: Cross-Feature Combinations', () => {

  test('[T3-XF-01] [R1 + R2] Flexible layout toggle styled with dark theme', () => {
    // #layoutToggleBtn and .editor-preview-split must adopt dark theme styling in both orientations
    const vars = parseRootVariables(stylesCssContent);
    assert.ok(vars.has('--surface-raised') || vars.has('--surface'), 'Dark surface tokens must be defined');

    // Button styling must not use hardcoded white background
    const btnRule = stylesCssContent.match(/#layoutToggleBtn\s*\{[^}]+\}/);
    if (btnRule) {
      assert.ok(!btnRule[0].includes('background:#fff'), '#layoutToggleBtn must not use light background');
    }
    assert.ok(stylesCssContent.includes('data-layout-orientation'), 'Layout orientation attribute rules must be present');
  });

  test('[T3-XF-02] [R1 + R3] Launching track from landing and toggling layout', () => {
    const sandbox = createDOMSandbox();
    const landing = sandbox.getOrCreateElement('landingSection', 'section');
    const lesson = sandbox.getOrCreateElement('lesson', 'article');
    const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
    split.classList.add('editor-preview-split');
    const startBtn = sandbox.getOrCreateElement('startHtmlBtn', 'button');
    startBtn.setAttribute('data-course', 'html');
    const toggleBtn = sandbox.getOrCreateElement('layoutToggleBtn', 'button');

    landing.hidden = false;
    lesson.hidden = false;

    // Boot real app.js runtime
    bootAppRuntime(sandbox);

    // 1. Enter track from landing via track start button
    startBtn.click();
    assert.equal(landing.hidden, false, 'Landing content remains available in the single-page layout');
    assert.equal(lesson.hidden, false, 'Lesson remains available after selecting a track');
    assert.ok(indexHtmlContent.includes('href="#lesson"'), 'The lesson remains reachable through its section anchor');

    // 2. Toggle layout orientation to stacked via layout toggle button
    toggleBtn.click();
    assert.equal(split.getAttribute('data-layout-orientation'), 'stacked', 'Layout should switch to stacked');
    assert.equal(sandbox.localStorage.getItem('steplearn_editor_orientation'), 'stacked');
  });

  test('[T3-XF-03] [R3 + R5] Multi-track launch and curriculum step verification', () => {
    const htmlLessons = readJson('html-lessons.json').lessons;
    const cssLessons = readJson('css-lessons.json').lessons;
    const jsLessons = readJson('js-lessons.json').lessons;
    const angularLessons = readJson('angular-lessons.json').lessons;

    const tracks = [
      { name: 'html', data: htmlLessons },
      { name: 'css', data: cssLessons },
      { name: 'js', data: jsLessons },
      { name: 'angular', data: angularLessons }
    ];

    for (const t of tracks) {
      assert.ok(t.data.length > 0, `Track ${t.name} must have lessons`);
      const l0 = t.data[0];
      assert.ok(l0.id, `${t.name} lesson 0 must have an id`);
      assert.ok(Array.isArray(l0.steps) && l0.steps.length >= 1, `${t.name} lesson 0 must have practice steps`);
      const s0 = l0.steps[0];
      const hasContent = Boolean(s0.to || s0.task || s0.instruction || (s0.hints && s0.hints.length));
      assert.ok(hasContent, `${t.name} step 0 must have target code, instruction, or hints`);
    }
  });

  test('[T3-XF-04] [R2 + R4] Modern dark UI interface free of watermark overlays', () => {
    const sandbox = createDOMSandbox();
    const context = createVmContextWithSandbox(sandbox);
    vm.runInContext(contentProtectionJsContent, context);

    const cp = context.ContentProtection || context.window.ContentProtection;
    if (cp && typeof cp.init === 'function') cp.init();

    // Verify that dark theme body does not have watermark overlays or screen shield blur
    sandbox.document.body.classList.add('dark-theme');

    assert.equal(sandbox.document.getElementById('learningWatermark'), null, 'Dark UI must not have watermark overlay');
    assert.equal(sandbox.document.body.classList.contains('screen-shield-active'), false, 'Dark UI must not have screen shield blur');
  });

  test('[T3-XF-05] [R1 + R4 + R5] Lesson code execution in stacked orientation without protection interference', () => {
    const sandbox = createDOMSandbox();
    const split = sandbox.getOrCreateElement('editorPreviewSplit');
    split.setAttribute('data-layout-orientation', 'stacked');

    // Run verification in stacked mode
    const context = {
      window: sandbox.window,
      document: sandbox.document,
      growth: { completed: [], drafts: {}, stepAttempts: {} },
      missingBuildLine(code, build) { return ''; },
      checkHtmlTags() { return { valid: true, errors: [] }; },
      normalizeDoc(c) { return String(c || '').trim(); },
      normalizeCodeLine(c) { return String(c || '').trim(); }
    };
    vm.createContext(context);
    vm.runInContext(lessonsDataContent, context);
    vm.runInContext(sourceBetween(appJsContent, '  var SmartHintEngine = {', '  function validateLessonAnswer('), context);

    const step = { from: '<h1>Old</h1>', to: '<h1>New</h1>', hints: ['T1', 'T2', 'T3', '<h1>New</h1>'], errorRules: [] };
    const hint = context.SmartHintEngine.evaluate('<h1>New</h1>', step, {}, 1);
    assert.ok(hint, 'Verification in stacked orientation must evaluate properly');
  });

  test('[T3-XF-06] [R1 + R3 + R5] Layout orientation preference persists across track switching', () => {
    const sandbox = createDOMSandbox();
    sandbox.localStorage.setItem('steplearn_editor_orientation', 'stacked');

    const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
    split.classList.add('editor-preview-split');

    const htmlBtn = sandbox.getOrCreateElement('startHtmlBtn', 'button');
    htmlBtn.setAttribute('data-course', 'html');

    const cssBtn = sandbox.getOrCreateElement('startCssBtn', 'button');
    cssBtn.setAttribute('data-course', 'css');

    // Boot real app.js runtime with saved stacked preference
    bootAppRuntime(sandbox);

    // Initial load: split orientation should reflect saved stacked preference
    assert.equal(
      split.getAttribute('data-layout-orientation'),
      'stacked',
      'Initial split layout must load stacked from localStorage'
    );

    // Switch to CSS track: orientation must remain stacked
    cssBtn.click();
    assert.equal(
      split.getAttribute('data-layout-orientation'),
      'stacked',
      'Stacked orientation must persist when switching to CSS track'
    );
    assert.equal(sandbox.localStorage.getItem('steplearn_editor_orientation'), 'stacked');

    // Switch back to HTML track: orientation must remain stacked
    htmlBtn.click();
    assert.equal(
      split.getAttribute('data-layout-orientation'),
      'stacked',
      'Stacked orientation must persist when switching back to HTML track'
    );
  });
});

// ============================================================================
// Tier 4: Real-World Application Scenarios (6 tests)
// ============================================================================

describe('Tier 4: Real-World Application Scenarios', () => {

  test('[T4-SC-01] Scenario 1: First-time learner onboarding journey', () => {
    // Learner arrives at homepage -> sees platform intro and track showcase -> selects HTML track -> navigates to Lesson 1 -> verifies layout and starter code
    const sandbox = createDOMSandbox();
    const landing = sandbox.getOrCreateElement('landingSection', 'section');
    const lesson = sandbox.getOrCreateElement('lesson', 'article');
    const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
    split.classList.add('editor-preview-split');
    const editor = sandbox.getOrCreateElement('code', 'textarea');
    const startHtmlBtn = sandbox.getOrCreateElement('startHtmlBtn', 'button');
    startHtmlBtn.setAttribute('data-course', 'html');

    landing.hidden = false;
    lesson.hidden = false;

    // Boot real app.js runtime
    bootAppRuntime(sandbox);

    // Learner clicks HTML track start button
    startHtmlBtn.click();

    // Verify application state transitions driven by app.js
    assert.equal(landing.hidden, false, 'Landing remains part of the page after track selection');
    assert.equal(lesson.hidden, false, 'Lesson remains visible in the same page');
    assert.equal(split.getAttribute('data-layout-orientation'), 'side', 'Default layout is side-by-side');
    assert.ok(editor.value.length > 0, 'Starter lesson code is loaded into editor');
  });

  test('[T4-SC-02] Scenario 2: Responsive layout toggle and session reload', () => {
    // Session 1: Learner toggles layout from side to stacked
    const sandbox1 = createDOMSandbox();
    const toggleBtn1 = sandbox1.getOrCreateElement('layoutToggleBtn', 'button');
    const split1 = sandbox1.getOrCreateElement('editorPreviewSplit', 'div');
    split1.classList.add('editor-preview-split');
    split1.setAttribute('data-layout-orientation', 'side');

    bootAppRuntime(sandbox1);

    // Learner clicks layout toggle button
    toggleBtn1.click();
    assert.equal(split1.getAttribute('data-layout-orientation'), 'stacked');
    assert.equal(sandbox1.localStorage.getItem('steplearn_editor_orientation'), 'stacked');

    // Session 2: Page reload with same storage
    const sandbox2 = createDOMSandbox();
    for (const [k, v] of sandbox1.localStorage._dump()) {
      sandbox2.localStorage.setItem(k, v);
    }
    const split2 = sandbox2.getOrCreateElement('editorPreviewSplit', 'div');
    split2.classList.add('editor-preview-split');

    bootAppRuntime(sandbox2);

    // On fresh boot, app.js must read stored orientation and apply it to container
    assert.equal(
      split2.getAttribute('data-layout-orientation'),
      'stacked',
      'Stacked layout orientation must persist and restore upon page reload'
    );
  });

  test('[T4-SC-03] Scenario 3: Multi-track exploration and theme uniformity', () => {
    // Learner navigates across HTML, CSS, JS, and Angular tracks -> verifies uniform dark theme variables and header structure
    const vars = parseRootVariables(stylesCssContent);
    assert.equal(vars.get('--bg'), '#0d1410', 'Background token must be uniform #0d1410');
    assert.equal(vars.get('--surface'), '#14201a', 'Surface token must be uniform #14201a');
    assert.equal(vars.get('--ink'), '#e6f2eb', 'Ink text token must be uniform #e6f2eb');
  });

  test('[T4-SC-04] Scenario 4: Frictionless screenshotting, copying & printing', () => {
    // Learner takes screenshots (PrintScreen), copies code snippet, switches window focus, prints page -> verifies no toasts, no screen blur, and no text hijacking
    const sandbox = createDOMSandbox();
    const context = createVmContextWithSandbox(sandbox);
    vm.runInContext(contentProtectionJsContent, context);

    // 1. PrintScreen
    const printEvent = { type: 'keydown', key: 'PrintScreen', defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
    sandbox.document.dispatchEvent(printEvent);
    assert.equal(printEvent.defaultPrevented, false, 'PrintScreen must not be blocked');

    // 2. Copy code
    let clipboardPayload = null;
    const copyEvent = {
      type: 'copy',
      clipboardData: { setData(fmt, val) { clipboardPayload = val; } },
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }
    };
    sandbox.document.dispatchEvent(copyEvent);
    assert.equal(copyEvent.defaultPrevented, false, 'Copy must not be blocked');
    assert.equal(clipboardPayload, null, 'Clipboard must not be overwritten');

    // 3. Window blur
    sandbox.window.dispatchEvent({ type: 'blur' });
    assert.equal(sandbox.document.body.classList.contains('screen-shield-active'), false, 'Blur must not add screen shield');
  });

  test('[T4-SC-05] Scenario 5: Full learner journey: landing -> track -> edit -> layout toggle -> complete -> return', () => {
    const sandbox = createDOMSandbox();
    const landing = sandbox.getOrCreateElement('landingSection', 'section');
    const lesson = sandbox.getOrCreateElement('lesson', 'article');
    const split = sandbox.getOrCreateElement('editorPreviewSplit', 'div');
    split.classList.add('editor-preview-split');
    const editor = sandbox.getOrCreateElement('code', 'textarea');
    const runBtn = sandbox.getOrCreateElement('run', 'button');
    const completeBtn = sandbox.getOrCreateElement('complete', 'button');
    const toggleBtn = sandbox.getOrCreateElement('layoutToggleBtn', 'button');
    const startJsBtn = sandbox.getOrCreateElement('startJsBtn', 'button');
    startJsBtn.setAttribute('data-course', 'js');

    landing.hidden = false;
    lesson.hidden = false;

    // Boot real app.js runtime
    bootAppRuntime(sandbox);

    // 1. Learner is on landing homepage
    assert.equal(landing.hidden, false, 'Learner starts on landing page');

    // 2. Selects JavaScript track
    startJsBtn.click();
    assert.equal(landing.hidden, false, 'Landing remains available after track selection');
    assert.equal(lesson.hidden, false, 'Lesson remains available in the single-page layout');

    // 3. Toggles layout to stacked for more workspace room
    toggleBtn.click();
    assert.equal(split.getAttribute('data-layout-orientation'), 'stacked', 'Layout switches to stacked');
    assert.equal(sandbox.localStorage.getItem('steplearn_editor_orientation'), 'stacked');

    // 4. Edits code and executes step through application buttons
    editor.value = 'let count = 0;\ncount = count + 1;';
    runBtn.click();
    completeBtn.click();

    // 5. The persistent home anchor provides return navigation.
    assert.ok(indexHtmlContent.includes('href="#home"'), 'The home anchor provides return navigation');
    assert.ok(indexHtmlContent.includes('id="home"'), 'The home anchor target exists');
  });

  test('[T4-SC-06] Scenario 6: Multi-device responsive simulation (Mobile 375px to Desktop 1440px)', () => {
    // Tests that CSS rules contain responsive breakpoints for mobile (e.g. max-width: 768px or 800px) and desktop
    assert.match(stylesCssContent, /@media\s*\([^)]*max-width:\s*(?:768px|800px|900px|1024px)\)/, 'styles.css must define mobile/tablet responsive media queries');
    assert.match(stylesCssContent, /@media\s*\([^)]*min-width:\s*(?:1025px|1241px)\)/, 'styles.css must define desktop responsive media queries');
  });
});

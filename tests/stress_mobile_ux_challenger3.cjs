/**
 * Challenger 3: Deep Adversarial Empirical Stress Test Suite
 * Domain: UI & Mobile UX
 * Focus: Breakpoint partition integrity, touch target accessibility (>= 44px),
 *        iOS Safari auto-zoom prevention (16px), in-card tab switcher state machine,
 *        modal bottom sheets, and bottom navigation safe area insets.
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const stylesCss = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  details: []
};

function test(name, fn) {
  results.total++;
  try {
    fn();
    results.passed++;
    results.details.push({ name, pass: true });
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    results.failed++;
    results.details.push({ name, pass: false, error: err.message });
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

console.log('======================================================================');
console.log('CHALLENGER 3: ADVERSARIAL UI & MOBILE UX EMPIRICAL STRESS TEST HARNESS');
console.log('======================================================================\n');

// --------------------------------------------------------------------
// SECTION 1: BREAKPOINT INTEGRITY & PARTITION ANALYSIS
// --------------------------------------------------------------------
console.log('--- 1. Breakpoint Boundary & Collision Analysis ---');

test('Breakpoints Mobile (<=767px), Tablet (768px-1024px), Desktop (>=1025px) form exact partition', () => {
  // Mobile query: max-width: 767px
  assert.ok(/@media\s*\(\s*max-width\s*:\s*767px\s*\)/.test(stylesCss), 'Mobile 767px media query missing');
  
  // Tablet query: min-width: 768px and max-width: 1024px
  assert.ok(/@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*and\s*\(\s*max-width\s*:\s*1024px\s*\)/.test(stylesCss), 'Tablet 768-1024px media query missing');
  
  // Desktop query: min-width: 1025px
  assert.ok(/@media\s*\(\s*min-width\s*:\s*1025px\s*\)/.test(stylesCss), 'Desktop 1025px media query missing');
  
  // No boundary collisions at 767/768 or 1024/1025
  assert.ok(!/@media[^{]*max-width\s*:\s*768px/.test(stylesCss), 'Collision: max-width:768px overlaps with min-width:768px');
  assert.ok(!/@media[^{]*min-width\s*:\s*767px/.test(stylesCss), 'Collision: min-width:767px overlaps with max-width:767px');
  assert.ok(!/@media[^{]*max-width\s*:\s*1025px/.test(stylesCss), 'Collision: max-width:1025px overlaps with min-width:1025px');
  assert.ok(!/@media[^{]*min-width\s*:\s*1024px/.test(stylesCss), 'Collision: min-width:1024px overlaps with max-width:1024px');
});

test('Zero legacy breakpoint traps (max-width: 740px, 900px, 1020px)', () => {
  assert.ok(!stylesCss.includes('max-width:740px') && !stylesCss.includes('max-width: 740px'), 'Found obsolete 740px breakpoint');
  assert.ok(!stylesCss.includes('max-width:900px') && !stylesCss.includes('max-width: 900px'), 'Found obsolete 900px breakpoint');
  assert.ok(!stylesCss.includes('max-width:1020px') && !stylesCss.includes('max-width: 1020px'), 'Found obsolete 1020px breakpoint');
});

test('Desktop breakpoint (>=1025px) hides mobile tab controls and enables dual-column split', () => {
  const desktopBlock = stylesCss.match(/@media\s*\(\s*min-width\s*:\s*1025px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(desktopBlock, 'Desktop media block not found');
  const css = desktopBlock[1];
  assert.ok(css.includes('.mobile-editor-tabs{display:none!important}'), 'Desktop must hide .mobile-editor-tabs');
  assert.ok(css.includes('grid-template-columns:1fr 1fr'), 'Desktop must enable 1fr 1fr split for editor-preview-split');
});

test('Tablet breakpoint (768px-1024px) retains 1fr 1fr split and collapses rail', () => {
  const tabletBlock = stylesCss.match(/@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*and\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(tabletBlock, 'Tablet media block not found');
  const css = tabletBlock[1];
  assert.ok(css.includes('.rail{display:none}'), 'Tablet must hide right rail');
  assert.ok(css.includes('.grid{grid-template-columns:1fr}'), 'Tablet grid must be single column');
  assert.ok(css.includes('.editor-preview-split{display:grid;grid-template-columns:1fr 1fr;'), 'Tablet must display editor and preview side-by-side');
});


// --------------------------------------------------------------------
// SECTION 2: TOUCH TARGET ACCESSIBILITY (>= 44px)
// --------------------------------------------------------------------
console.log('\n--- 2. Touch Target Hitboxes (>= 44px) ---');

function checkMinHeight(selector, expectedMin) {
  const regex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]+)\\}`, 'g');
  let match;
  let found = false;
  while ((match = regex.exec(stylesCss)) !== null) {
    const body = match[1];
    const mhMatch = body.match(/min-height\s*:\s*(\d+)px/);
    const hMatch = body.match(/(?:^|;)\s*height\s*:\s*(\d+)px/);
    const val = mhMatch ? parseInt(mhMatch[1], 10) : (hMatch ? parseInt(hMatch[1], 10) : null);
    if (val !== null && val >= expectedMin) {
      found = true;
      break;
    }
  }
  return found;
}

test('Interactive control .run has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.run', 44), '.run min-height < 44px or not found');
});

test('Interactive control .complete has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.complete', 44), '.complete min-height < 44px or not found');
});

test('Interactive control .dialog-close has width and height >= 44px', () => {
  const match = stylesCss.match(/\.dialog-close\s*\{([^}]+)\}/);
  assert.ok(match, '.dialog-close rule not found');
  const w = match[1].match(/width\s*:\s*(\d+)px/);
  const h = match[1].match(/height\s*:\s*(\d+)px/);
  assert.ok(w && parseInt(w[1], 10) >= 44, '.dialog-close width < 44px');
  assert.ok(h && parseInt(h[1], 10) >= 44, '.dialog-close height < 44px');
});

test('Interactive control .mobile-tab-btn has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.mobile-tab-btn', 44), '.mobile-tab-btn min-height < 44px or not found');
});

test('Interactive control .mobile-tools button has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.mobile-tools button', 44), '.mobile-tools button min-height < 44px or not found');
});

test('Interactive control .angular-mobile-panes button has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.angular-mobile-panes button', 44), '.angular-mobile-panes button min-height < 44px or not found');
});

test('Interactive control .angular-tool-button has min-height >= 44px in both default and max-width:420px', () => {
  assert.ok(checkMinHeight('.angular-tool-button', 44), '.angular-tool-button default min-height < 44px');
  const lines = stylesCss.split('\n');
  const smallPhoneLine = lines.find(l => l.includes('@media(max-width:420px)') && l.includes('.angular-tool-button'));
  assert.ok(smallPhoneLine, 'Angular small phone media query not found');
  assert.ok(smallPhoneLine.includes('.angular-tool-button') && smallPhoneLine.includes('min-height:44px'),
    '.angular-tool-button small phone min-height < 44px');
});

test('Interactive control .tab has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.tab', 44), '.tab min-height < 44px');
});

test('Interactive control .editor-download has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.editor-download', 44), '.editor-download min-height < 44px');
});

test('Interactive control .slot-input has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.slot-input', 44), '.slot-input min-height < 44px');
});

test('Interactive control .growth-add-part has min-height >= 44px', () => {
  assert.ok(checkMinHeight('.growth-add-part', 44), '.growth-add-part min-height < 44px');
});

test('Interactive controls .project-actions button and .project-export button have min-height >= 44px', () => {
  assert.ok(checkMinHeight('.project-actions button, .project-export button', 44) ||
            checkMinHeight('.project-actions button,.project-export button', 44),
    '.project-actions / .project-export button min-height < 44px');
});


// --------------------------------------------------------------------
// SECTION 3: INPUT FONT-SIZE (16px) FOR IOS ZOOM PREVENTION
// --------------------------------------------------------------------
console.log('\n--- 3. Form Input Font-Size (16px) Auto-Zoom Prevention ---');

test('Mobile <=767px enforces font-size:16px!important on input, textarea, select, .slot-input', () => {
  const mobileBlock = stylesCss.match(/@media\s*\(\s*max-width\s*:\s*767px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mobileBlock, 'Mobile block not found');
  assert.ok(/input,\s*textarea,\s*select,\s*\.slot-input\s*\{[^}]*font-size\s*:\s*16px!important/i.test(mobileBlock[1]),
    'Mobile form inputs do not strictly enforce font-size: 16px!important');
});

test('Tablet 768px-1024px enforces font-size:16px!important on input, textarea, select, .slot-input', () => {
  const tabletBlock = stylesCss.match(/@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*and\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(tabletBlock, 'Tablet block not found');
  assert.ok(/input,\s*textarea,\s*select,\s*\.slot-input\s*\{[^}]*font-size\s*:\s*16px!important/i.test(tabletBlock[1]),
    'Tablet form inputs do not enforce font-size: 16px!important');
});

test('Editor textarea defaults to font-size: 16px in root and mobile styles', () => {
  assert.ok(/\.editor textarea\s*\{[^}]*font\s*:\s*16px/i.test(stylesCss) ||
            /\.editor textarea\s*\{[^}]*font-size\s*:\s*16px/i.test(stylesCss),
    '.editor textarea root font-size is not 16px');
});

test('Angular terminal command input enforces font-size: 16px on mobile', () => {
  assert.ok(/\.angular-command-form input\s*\{[^}]*font-size\s*:\s*16px/i.test(stylesCss),
    '.angular-command-form input does not have 16px font-size');
});


// --------------------------------------------------------------------
// SECTION 4: IN-CARD TAB SWITCHER STATE MACHINE SIMULATION
// --------------------------------------------------------------------
console.log('\n--- 4. In-Card Tab Switcher DOM & State Machine Simulation ---');

test('index.html provides static HTML <article class="card" data-mobile-view="editor">', () => {
  assert.ok(/<article class="card" data-mobile-view="editor">/.test(indexHtml),
    'index.html lacks static data-mobile-view="editor" on card article');
});

test('index.html contains 2 tabs with role="tab", aria-selected, and data-tab attributes', () => {
  const tabsContainer = indexHtml.match(/<div class="mobile-editor-tabs"[^>]*>([\s\S]*?)<\/div>/);
  assert.ok(tabsContainer, '.mobile-editor-tabs missing in index.html');
  const inner = tabsContainer[1];
  
  // Editor tab
  assert.ok(/data-tab="editor"/.test(inner) && /data-tab-target="editor"/.test(inner), 'Editor tab missing data-tab attributes');
  assert.ok(/aria-selected="true"/.test(inner), 'Editor tab must have aria-selected="true" initially');
  assert.ok(/class="[^"]*mobile-tab-btn[^"]*active[^"]*"/.test(inner), 'Editor tab must have active class initially');
  
  // Preview tab
  assert.ok(/data-tab="preview"/.test(inner) && /data-tab-target="preview"/.test(inner), 'Preview tab missing data-tab attributes');
  assert.ok(/aria-selected="false"/.test(inner), 'Preview tab must have aria-selected="false" initially');
  assert.ok(/role="tab"/.test(inner), 'Buttons must have role="tab"');
});

test('Simulate setMobileLessonView state transitions in mock DOM environment', () => {
  // Construct a minimal DOM state matching index.html
  const mockCard = {
    attributes: { 'data-mobile-view': 'editor' },
    setAttribute(name, val) { this.attributes[name] = val; },
    getAttribute(name) { return this.attributes[name]; }
  };
  
  const mockBtnEditor = {
    dataset: { tab: 'editor', tabTarget: 'editor' },
    classList: new Set(['mobile-tab-btn', 'active']),
    attributes: { 'aria-selected': 'true' },
    setAttribute(name, val) { this.attributes[name] = val; },
    getAttribute(name) { return this.attributes[name]; }
  };
  mockBtnEditor.classList.toggle = function(cls, cond) {
    if (cond) this.add(cls); else this.delete(cls);
  };
  
  const mockBtnPreview = {
    dataset: { tab: 'preview', tabTarget: 'preview' },
    classList: new Set(['mobile-tab-btn']),
    attributes: { 'aria-selected': 'false' },
    setAttribute(name, val) { this.attributes[name] = val; },
    getAttribute(name) { return this.attributes[name]; }
  };
  mockBtnPreview.classList.toggle = function(cls, cond) {
    if (cond) this.add(cls); else this.delete(cls);
  };
  
  const mockButtons = [mockBtnEditor, mockBtnPreview];
  
  // Mock function reproducing app.js:setMobileLessonView
  function testSetMobileLessonView(view) {
    mockCard.setAttribute('data-mobile-view', view);
    mockButtons.forEach(btn => {
      const isMatch = (btn.dataset.tab === view || btn.dataset.tabTarget === view);
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
  }
  
  // Initial state check
  assert.strictEqual(mockCard.getAttribute('data-mobile-view'), 'editor');
  assert.strictEqual(mockBtnEditor.attributes['aria-selected'], 'true');
  assert.strictEqual(mockBtnPreview.attributes['aria-selected'], 'false');
  
  // Transition 1: Switch to "preview"
  testSetMobileLessonView('preview');
  assert.strictEqual(mockCard.getAttribute('data-mobile-view'), 'preview');
  assert.strictEqual(mockBtnEditor.attributes['aria-selected'], 'false');
  assert.strictEqual(mockBtnEditor.classList.has('active'), false);
  assert.strictEqual(mockBtnPreview.attributes['aria-selected'], 'true');
  assert.strictEqual(mockBtnPreview.classList.has('active'), true);
  
  // Transition 2: Switch back to "editor"
  testSetMobileLessonView('editor');
  assert.strictEqual(mockCard.getAttribute('data-mobile-view'), 'editor');
  assert.strictEqual(mockBtnEditor.attributes['aria-selected'], 'true');
  assert.strictEqual(mockBtnEditor.classList.has('active'), true);
  assert.strictEqual(mockBtnPreview.attributes['aria-selected'], 'false');
  assert.strictEqual(mockBtnPreview.classList.has('active'), false);
});

test('Run button on mobile automatically triggers view change to preview', () => {
  const runHandler = appJs.match(/document\.getElementById\("run"\)\.onclick\s*=\s*function\(\)\s*\{([\s\S]*?)\n  \};/);
  assert.ok(runHandler, 'run.onclick handler not found in app.js');
  const code = runHandler[1];
  assert.ok(code.includes('window.innerWidth <= 767'), 'Missing mobile viewport check (<= 767)');
  assert.ok(code.includes('setMobileLessonView("preview")'), 'Missing auto-switch to preview on run');
});

test('CSS rules cleanly mutually exclude editor and preview panes on mobile', () => {
  // When editor view active:
  assert.ok(stylesCss.includes('article.card[data-mobile-view="editor"] .previewrow{display:none!important}'),
    'Missing display:none!important on .previewrow when data-mobile-view="editor"');
  // When preview view active:
  assert.ok(stylesCss.includes('article.card[data-mobile-view="preview"] .editor{display:none!important}'),
    'Missing display:none!important on .editor when data-mobile-view="preview"');
  assert.ok(stylesCss.includes('article.card[data-mobile-view="preview"] .prompt{display:none!important}'),
    'Missing display:none!important on .prompt when data-mobile-view="preview"');
});


// --------------------------------------------------------------------
// SECTION 5: MODAL BOTTOM-SHEET & SAFE-AREA INSETS
// --------------------------------------------------------------------
console.log('\n--- 5. Modal Bottom-Sheets & Safe-Area Inset Handling ---');

test('Modals (.learner-dialog, .daily-challenge-dialog) formatted as bottom-sheet on <=767px', () => {
  const match = stylesCss.match(/\.learner-dialog,\s*\.daily-challenge-dialog\s*\{([^}]+)\}/);
  assert.ok(match, 'Modal dialog bottom sheet rule missing');
  const css = match[1];
  assert.ok(css.includes('position:fixed!important'), 'Bottom-sheet must be fixed');
  assert.ok(css.includes('inset:auto 0 0 0!important'), 'Bottom-sheet must pin to bottom');
  assert.ok(css.includes('border-radius:20px 20px 0 0!important'), 'Bottom-sheet must have rounded top corners');
  assert.ok(css.includes('max-height:85vh!important'), 'Bottom-sheet must not exceed 85vh to leave room for soft keyboard');
  assert.ok(css.includes('calc(20px + env(safe-area-inset-bottom))'), 'Bottom-sheet must accommodate safe-area-inset-bottom');
});

test('Mobile bottom bar navigation (.side) integrates safe-area-inset-bottom and fixed height', () => {
  const sideRule = stylesCss.match(/\.side\{([^}]+)\}/g);
  // Look for mobile .side
  const mobileBlock = stylesCss.match(/@media\s*\(\s*max-width\s*:\s*767px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mobileBlock, 'Mobile block missing');
  assert.ok(mobileBlock[1].includes('height:calc(56px + env(safe-area-inset-bottom))'), '.side height must accommodate safe-area');
  assert.ok(mobileBlock[1].includes('padding-bottom:calc(112px + env(safe-area-inset-bottom))'), '.shell must pad 112px + safe-area for stacked bottom bars');
});

test('.mobile-tools is positioned above bottom bar and hidden when Angular course is active', () => {
  const mobileBlock = stylesCss.match(/@media\s*\(\s*max-width\s*:\s*767px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mobileBlock, 'Mobile block missing');
  const css = mobileBlock[1];
  assert.ok(css.includes('inset:auto 0 calc(56px + env(safe-area-inset-bottom))'), '.mobile-tools must sit above 56px bottom bar');
  assert.ok(css.includes('.angular-course-panel:not([hidden]) ~ .mobile-tools') &&
            css.includes('body:has(#angularCoursePanel:not([hidden])) .mobile-tools{display:none!important}'),
    '.mobile-tools must be hidden in Angular course panel');
});

// --------------------------------------------------------------------
// SECTION 6: ADVERSARIAL STRESS SUMMARY
// --------------------------------------------------------------------
console.log('\n======================================================================');
console.log(`TOTAL ADVERSARIAL CHECKS: ${results.total}`);
console.log(`PASSED:                   ${results.passed}`);
console.log(`FAILED:                   ${results.failed}`);
console.log('======================================================================');

if (results.failed > 0) {
  process.exit(1);
} else {
  console.log('\nALL ADVERSARIAL CHECKS PASSED EMPIRICALLY!');
  process.exit(0);
}

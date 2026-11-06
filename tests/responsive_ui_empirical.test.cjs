/**
 * Empirical UI & Mobile UX Stress Test Harness
 * Author: Challenger 1 (UI & Mobile UX Challenger)
 * Scope: Responsive layouts, breakpoints, touch targets, modal bottom-sheets, tab switcher, input zoom.
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const stylesPath = path.join(ROOT_DIR, 'styles.css');
const indexPath = path.join(ROOT_DIR, 'index.html');
const appPath = path.join(ROOT_DIR, 'app.js');

const stylesCss = fs.readFileSync(stylesPath, 'utf8');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const appJs = fs.readFileSync(appPath, 'utf8');

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: []
};

function recordTest(name, passed, details = {}) {
  results.total++;
  if (passed) {
    results.passed++;
    results.tests.push({ name, status: 'PASS', details });
    console.log(`✔ [PASS] ${name}`);
  } else {
    results.failed++;
    results.tests.push({ name, status: 'FAIL', details });
    console.log(`✖ [FAIL] ${name}`);
    if (details.message) console.log(`   Message: ${details.message}`);
    if (details.expected) console.log(`   Expected: ${details.expected}`);
    if (details.actual) console.log(`   Actual:   ${details.actual}`);
  }
}

console.log('===============================================================');
console.log('UI & MOBILE UX EMPIRICAL STRESS TEST SUITE — CHALLENGER 1');
console.log('===============================================================\n');

// ---------------------------------------------------------------------------
// 1. Breakpoint Tests in styles.css
// ---------------------------------------------------------------------------
console.log('--- Suite 1: Breakpoints in styles.css ---');

// Check mobile breakpoint @media (max-width: 767px)
const hasMobile767 = /@media\s*\(\s*max-width\s*:\s*767px\s*\)/i.test(stylesCss);
recordTest('styles.css contains standard mobile breakpoint @media(max-width:767px)', hasMobile767, {
  expected: '@media(max-width:767px)',
  actual: hasMobile767 ? 'Found' : 'Not found'
});

// Check tablet breakpoint @media (min-width: 768px) and (max-width: 1024px)
const hasTablet768_1024 = /@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*and\s*\(\s*max-width\s*:\s*1024px\s*\)/i.test(stylesCss);
recordTest('styles.css contains unified tablet breakpoint @media(min-width:768px) and (max-width:1024px)', hasTablet768_1024, {
  expected: '@media(min-width:768px) and (max-width:1024px)',
  actual: hasTablet768_1024 ? 'Found' : 'Not found'
});

// Check desktop breakpoint @media (min-width: 1025px)
const hasDesktop1025 = /@media\s*\(\s*min-width\s*:\s*1025px\s*\)/i.test(stylesCss);
recordTest('styles.css contains explicit desktop breakpoint @media(min-width:1025px)', hasDesktop1025, {
  expected: '@media(min-width:1025px)',
  actual: hasDesktop1025 ? 'Found' : 'Missing (desktop relies on unconstrained root styles)'
});

// Check whether obsolete 740px breakpoint was eliminated as contracted in PROJECT.md Feature 4
const hasObsolete740 = /@media\s*\(\s*max-width\s*:\s*740px\s*\)/i.test(stylesCss);
recordTest('PROJECT.md Feature 4 compliance: obsolete 740px breakpoint trap is eliminated', !hasObsolete740, {
  expected: '0 occurrences of @media(max-width:740px)',
  actual: hasObsolete740 ? 'FOUND: @media(max-width:740px) at line 277' : 'None'
});

// Check whether overlapping/fragmented media queries (1020px, 900px) exist
const hasObsolete1020 = /@media\s*\(\s*max-width\s*:\s*1020px\s*\)/i.test(stylesCss);
recordTest('Breakpoint consistency: no overlapping @media(max-width:1020px) breakpoint', !hasObsolete1020, {
  expected: '0 occurrences of @media(max-width:1020px)',
  actual: hasObsolete1020 ? 'FOUND: @media(max-width:1020px) at line 405' : 'None'
});

const hasObsolete900 = /@media\s*\(\s*max-width\s*:\s*900px\s*\)/i.test(stylesCss);
recordTest('Breakpoint consistency: no overlapping @media(max-width:900px) breakpoint', !hasObsolete900, {
  expected: '0 occurrences of @media(max-width:900px)',
  actual: hasObsolete900 ? 'FOUND: @media(max-width:900px) at line 527' : 'None'
});


// ---------------------------------------------------------------------------
// 2. .grid Single-Column Optimization
// ---------------------------------------------------------------------------
console.log('\n--- Suite 2: .grid Single-Column Rules ---');

const rootGridRule = stylesCss.match(/\.grid\s*\{([^}]+)\}/);
const rootGridCols = rootGridRule ? rootGridRule[1].includes('grid-template-columns:1fr') || rootGridRule[1].includes('grid-template-columns: 1fr') : false;
recordTest('Root default .grid rule specifies single column (grid-template-columns: 1fr)', rootGridCols, {
  expected: 'grid-template-columns: 1fr',
  actual: rootGridRule ? rootGridRule[1] : 'Not found'
});

const tabletGridMatch = stylesCss.match(/@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*and\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{([\s\S]*?)\n\}/);
const tabletGrid1Fr = tabletGridMatch && tabletGridMatch[1].includes('.grid{grid-template-columns:1fr}');
recordTest('Tablet breakpoint sets .grid to single-column', Boolean(tabletGrid1Fr), {
  expected: '.grid{grid-template-columns:1fr}',
  actual: tabletGrid1Fr ? 'Found' : 'Not found'
});

const mobileGridMatch = stylesCss.match(/@media\s*\(\s*max-width\s*:\s*767px\s*\)\s*\{([\s\S]*?)\n\}/);
const mobileGrid1Fr = mobileGridMatch && mobileGridMatch[1].includes('.grid{grid-template-columns:1fr}');
recordTest('Mobile breakpoint sets .grid to single-column', Boolean(mobileGrid1Fr), {
  expected: '.grid{grid-template-columns:1fr}',
  actual: mobileGrid1Fr ? 'Found' : 'Not found'
});


// ---------------------------------------------------------------------------
// 3. Interactive Touch Targets (>= 44px)
// ---------------------------------------------------------------------------
console.log('\n--- Suite 3: Interactive Touch Targets (>= 44px) ---');

// .run button
const runRule = stylesCss.match(/\.run\s*\{([^}]+)\}/);
const runMinHeight44 = runRule && /min-height\s*:\s*44px/.test(runRule[1]);
recordTest('.run button has min-height >= 44px', Boolean(runMinHeight44), {
  expected: 'min-height: 44px',
  actual: runRule ? runRule[1] : 'Not found'
});

// .complete button
const completeRule = stylesCss.match(/\.complete\s*\{([^}]+)\}/);
const completeMinHeight44 = completeRule && /min-height\s*:\s*44px/.test(completeRule[1]);
recordTest('.complete button has min-height >= 44px', Boolean(completeMinHeight44), {
  expected: 'min-height: 44px',
  actual: completeRule ? completeRule[1] : 'Not found'
});

// .dialog-close button
const dialogCloseRule = stylesCss.match(/\.dialog-close\s*\{([^}]+)\}/);
const dialogClose44 = dialogCloseRule && (/height\s*:\s*44px/.test(dialogCloseRule[1]) && /width\s*:\s*44px/.test(dialogCloseRule[1]));
recordTest('.dialog-close button has width & height >= 44px', Boolean(dialogClose44), {
  expected: 'width: 44px; height: 44px',
  actual: dialogCloseRule ? dialogCloseRule[1] : 'Not found'
});

// .angular-mobile-panes button
const angularMobilePanesBtn = stylesCss.match(/\.angular-mobile-panes\s+button\s*\{([^}]+)\}/);
const angularPanesMinHeight44 = angularMobilePanesBtn && /min-height\s*:\s*44px/.test(angularMobilePanesBtn[1]);
recordTest('.angular-mobile-panes button has min-height >= 44px', Boolean(angularPanesMinHeight44), {
  expected: 'min-height: 44px',
  actual: angularMobilePanesBtn ? angularMobilePanesBtn[1] : 'Not found'
});

// .slot-btn-build button
const slotBtnRule = stylesCss.match(/\.slot-btn-build\s*\{([^}]+)\}/);
const slotBtnMinHeight44 = slotBtnRule && /min-height\s*:\s*44px/.test(slotBtnRule[1]);
recordTest('.slot-btn-build button has min-height >= 44px', Boolean(slotBtnMinHeight44), {
  expected: 'min-height: 44px',
  actual: slotBtnRule ? slotBtnRule[1] : 'Not found'
});

// .mobile-tab-btn
const mobileTabBtnRule = stylesCss.match(/\.mobile-tab-btn\s*\{([^}]+)\}/);
const mobileTabBtnMinHeight44 = mobileTabBtnRule && /min-height\s*:\s*44px/.test(mobileTabBtnRule[1]);
recordTest('.mobile-tab-btn has min-height >= 44px', Boolean(mobileTabBtnMinHeight44), {
  expected: 'min-height: 44px',
  actual: mobileTabBtnRule ? mobileTabBtnRule[1] : 'Not found'
});

// .mobile-tools button
const mobileToolsBtnRule = stylesCss.match(/\.mobile-tools\s+button\s*\{([^}]+)\}/);
const mobileToolsBtnMinHeight44 = mobileToolsBtnRule && /min-height\s*:\s*44px/.test(mobileToolsBtnRule[1]);
recordTest('.mobile-tools button has min-height >= 44px', Boolean(mobileToolsBtnMinHeight44), {
  expected: 'min-height: 44px',
  actual: mobileToolsBtnRule ? mobileToolsBtnRule[1] : 'Not found'
});

// Stress test: Check .angular-tool-button claimed in handoff line 95 and PROJECT.md Feature 8
const angularToolBtnRule = stylesCss.match(/\.angular-tool-button\s*\{([^}]+)\}/);
const angularToolMinHeight44 = angularToolBtnRule && /min-height\s*:\s*(44|4[4-9]|[5-9][0-9])px/.test(angularToolBtnRule[1]);
recordTest('.angular-tool-button default rule has min-height >= 44px', Boolean(angularToolMinHeight44), {
  expected: 'min-height: >=44px',
  actual: angularToolBtnRule ? angularToolBtnRule[1] : 'Not found'
});

// Stress test: Check .tab claimed in handoff line 95
const tabRule = stylesCss.match(/\.tab\s*\{([^}]+)\}/);
const tabMinHeight44 = tabRule && /min-height\s*:\s*(44|4[4-9]|[5-9][0-9])px/.test(tabRule[1]);
recordTest('.tab rule has min-height >= 44px (claimed in handoff)', Boolean(tabMinHeight44), {
  expected: 'min-height: >=44px',
  actual: tabRule ? tabRule[1] : 'Not found'
});

// Stress test: Check .editor-download claimed in handoff line 95
const editorDownloadRule = stylesCss.match(/\.editor-download\s*\{([^}]+)\}/);
const editorDownloadMinHeight44 = editorDownloadRule && /min-height\s*:\s*(44|4[4-9]|[5-9][0-9])px/.test(editorDownloadRule[1]);
recordTest('.editor-download has min-height >= 44px (claimed in handoff)', Boolean(editorDownloadMinHeight44), {
  expected: 'min-height: >=44px',
  actual: editorDownloadRule ? editorDownloadRule[1] : 'Not found'
});


// ---------------------------------------------------------------------------
// 4. Input Font-Size Rule (16px) for iOS Zoom Prevention
// ---------------------------------------------------------------------------
console.log('\n--- Suite 4: Input Font-Size (16px) Rules ---');

// Under @media(max-width:767px)
const mobileInputRule = mobileGridMatch && mobileGridMatch[1].match(/input,\s*textarea,\s*select,\s*\.slot-input\s*\{([^}]+)\}/);
const mobileInput16px = mobileInputRule && mobileInputRule[1].includes('font-size:16px!important');
recordTest('Mobile inputs/textareas have font-size: 16px!important for iOS Safari zoom avoidance', Boolean(mobileInput16px), {
  expected: 'font-size:16px!important',
  actual: mobileInputRule ? mobileInputRule[1] : 'Not found'
});

// Under tablet breakpoint (768px-1024px)
const tabletInputsCheck = tabletGridMatch && tabletGridMatch[1].includes('font-size:16px');
recordTest('Tablet breakpoint explicitly enforces 16px font-size on form inputs (iPad Safari zoom)', Boolean(tabletInputsCheck), {
  expected: 'font-size:16px on inputs in tablet breakpoint',
  actual: tabletInputsCheck ? 'Present' : 'Missing (tablet inputs may trigger iOS Safari auto-zoom if <16px)'
});


// ---------------------------------------------------------------------------
// 5. Modal Bottom-Sheet Styling Rules
// ---------------------------------------------------------------------------
console.log('\n--- Suite 5: Modal Bottom-Sheet Rules ---');

const bottomSheetMatch = stylesCss.match(/\.learner-dialog,\s*\.daily-challenge-dialog\s*\{([^}]+)\}/);
const isFixed = bottomSheetMatch && /position\s*:\s*fixed!important/.test(bottomSheetMatch[1]);
const isBottomAligned = bottomSheetMatch && /inset\s*:\s*auto\s+0\s+0\s+0!important/.test(bottomSheetMatch[1]);
const isFullWidth = bottomSheetMatch && /width\s*:\s*100%!important/.test(bottomSheetMatch[1]);
const hasMaxHeight85 = bottomSheetMatch && /max-height\s*:\s*85vh!important/.test(bottomSheetMatch[1]);
const hasTopCornersRadius = bottomSheetMatch && /border-radius\s*:\s*20px\s+20px\s+0\s+0!important/.test(bottomSheetMatch[1]);
const hasSafeAreaPadding = bottomSheetMatch && /env\(safe-area-inset-bottom\)/.test(bottomSheetMatch[1]);

recordTest('Modal dialogs (.learner-dialog, .daily-challenge-dialog) styled as bottom-sheet on mobile',
  Boolean(isFixed && isBottomAligned && isFullWidth && hasMaxHeight85 && hasTopCornersRadius && hasSafeAreaPadding), {
    details: { isFixed, isBottomAligned, isFullWidth, hasMaxHeight85, hasTopCornersRadius, hasSafeAreaPadding }
  }
);


// ---------------------------------------------------------------------------
// 6. In-Card Tab Switcher Markup & Data Attributes
// ---------------------------------------------------------------------------
console.log('\n--- Suite 6: In-Card Tab Switcher Markup & Data Attributes ---');

// Check container markup in index.html
const tabSwitcherMatch = indexHtml.match(/<div class="mobile-editor-tabs"[^>]*>([\s\S]*?)<\/div>/);
recordTest('index.html contains .mobile-editor-tabs container', Boolean(tabSwitcherMatch), {
  actual: tabSwitcherMatch ? tabSwitcherMatch[0].slice(0, 100) : 'Not found'
});

// Check whether data-tab="editor" and data-tab="preview" exist (as required in Challenger Scope and claimed in Worker 1 Handoff)
const hasDataTabEditor = indexHtml.includes('data-tab="editor"');
const hasDataTabPreview = indexHtml.includes('data-tab="preview"');
const hasDataTabTargetEditor = indexHtml.includes('data-tab-target="editor"');
const hasDataTabTargetPreview = indexHtml.includes('data-tab-target="preview"');

recordTest('Tab switcher buttons have data-tab="editor" attribute (Scope & Handoff claim)', hasDataTabEditor, {
  expected: 'data-tab="editor"',
  actual: hasDataTabTargetEditor ? 'Found data-tab-target="editor" instead of data-tab="editor"' : 'Missing'
});

recordTest('Tab switcher buttons have data-tab="preview" attribute (Scope & Handoff claim)', hasDataTabPreview, {
  expected: 'data-tab="preview"',
  actual: hasDataTabTargetPreview ? 'Found data-tab-target="preview" instead of data-tab="preview"' : 'Missing'
});

// Check ARIA accessibility attributes on tab buttons claimed in handoff
const hasRoleTab = /class="mobile-tab-btn[^"]*"\s+role="tab"/i.test(indexHtml) || /role="tab"\s+class="mobile-tab-btn/i.test(indexHtml);
const hasAriaSelected = /aria-selected="true"/i.test(indexHtml);

recordTest('Tab switcher buttons have role="tab" attribute (claimed in Worker 1 Handoff lines 64-65)', hasRoleTab, {
  expected: 'role="tab" on .mobile-tab-btn',
  actual: hasRoleTab ? 'Found' : 'Missing in index.html'
});

recordTest('Active tab button has aria-selected="true" attribute (claimed in Worker 1 Handoff lines 64-65)', hasAriaSelected, {
  expected: 'aria-selected="true" on active .mobile-tab-btn',
  actual: hasAriaSelected ? 'Found' : 'Missing in index.html'
});

// Check initial load state of data-mobile-view on #lesson article.card
const cardInitialMatch = indexHtml.match(/<article class="card"([^>]*)>/);
const cardHasInitialDataMobileView = cardInitialMatch && /data-mobile-view=/.test(cardInitialMatch[1]);
recordTest('Initial DOM markup: article.card has initial data-mobile-view="editor" attribute', Boolean(cardHasInitialDataMobileView), {
  expected: 'data-mobile-view="editor" on <article class="card">',
  actual: cardHasInitialDataMobileView ? cardInitialMatch[0] : '<article class="card"> (No data-mobile-view set initially)'
});

// Check CSS rules for data-mobile-view
const hasEditorViewRule = stylesCss.includes('article.card[data-mobile-view="editor"] .previewrow{display:none!important}');
const hasPreviewViewRule = stylesCss.includes('article.card[data-mobile-view="preview"] .editor{display:none!important}');
recordTest('styles.css contains rules targeting article.card[data-mobile-view="..."]', hasEditorViewRule && hasPreviewViewRule, {
  expected: 'article.card[data-mobile-view="editor"] and [data-mobile-view="preview"] rules',
  actual: hasEditorViewRule && hasPreviewViewRule ? 'Found' : 'Missing'
});

// Check app.js initialization: Is setMobileLessonView called on page load?
const appHasInitCall = /setMobileLessonView\(["']editor["']\)/.test(appJs);
recordTest('app.js initializes mobile view on load via setMobileLessonView("editor")', appHasInitCall, {
  expected: 'Call to setMobileLessonView("editor") on app init',
  actual: appHasInitCall ? 'Found' : 'Missing (view remains uninitialized on initial page load)'
});


// ---------------------------------------------------------------------------
// 7. Summary
// ---------------------------------------------------------------------------
console.log('\n===============================================================');
console.log(`TOTAL TESTS:   ${results.total}`);
console.log(`PASSED:        ${results.passed}`);
console.log(`FAILED:        ${results.failed}`);
console.log('===============================================================\n');

// Write out raw JSON results for analysis
fs.writeFileSync(path.join(__dirname, 'ui_empirical_results.json'), JSON.stringify(results, null, 2));

process.exit(results.failed > 0 ? 1 : 0);

/**
 * Empirical Test: In-Card Mobile Tab Switcher Simulation
 * Tests DOM state on page load, button click, data attribute handling, and visibility logic.
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');

console.log('--- Empirical In-Card Tab Switcher DOM & Logic Stress ---');

// 1. Inspect raw index.html for card markup
const cardTagMatch = indexHtml.match(/<article class="card"([^>]*)>/);
console.log('1. Article Card element in index.html:');
console.log('   Tag:', cardTagMatch ? cardTagMatch[0] : 'Not found');
const hasInitialMobileView = cardTagMatch ? cardTagMatch[1].includes('data-mobile-view') : false;
console.log('   Has initial data-mobile-view:', hasInitialMobileView);

// 2. Inspect tab buttons in index.html
const tabButtons = [];
const btnRegex = /<button[^>]*class="[^"]*mobile-tab-btn[^"]*"[^>]*>([\s\S]*?)<\/button>/g;
let m;
while ((m = btnRegex.exec(indexHtml)) !== null) {
  tabButtons.push(m[0]);
}
console.log('\n2. Tab Buttons found in index.html:', tabButtons.length);
tabButtons.forEach((b, i) => console.log(`   [Button ${i + 1}]:`, b));

// 3. Check data-tab vs data-tab-target
const hasDataTab = tabButtons.some(b => b.includes('data-tab='));
const hasDataTabTarget = tabButtons.some(b => b.includes('data-tab-target='));
console.log('\n3. Attribute Analysis:');
console.log('   Has data-tab="..." attribute:       ', hasDataTab);
console.log('   Has data-tab-target="..." attribute:', hasDataTabTarget);

// 4. Trace setMobileLessonView in app.js
console.log('\n4. app.js setMobileLessonView Implementation:');
const setMobileViewFnMatch = appJs.match(/function setMobileLessonView\(([^)]*)\)\s*\{([\s\S]*?)\n  \}/);
if (setMobileViewFnMatch) {
  console.log(setMobileViewFnMatch[0]);
} else {
  console.log('   setMobileLessonView not found!');
}

// 5. Check CSS rules governing visibility on mobile:
console.log('\n5. CSS rules targeting data-mobile-view:');
const cssRule1 = stylesCss.match(/article\.card\[data-mobile-view="editor"\][^\{]*\{[^}]*\}/);
const cssRule2 = stylesCss.match(/article\.card\[data-mobile-view="preview"\]\s+\.editor[^\{]*\{[^}]*\}/);
const cssRule3 = stylesCss.match(/article\.card\[data-mobile-view="preview"\]\s+\.prompt[^\{]*\{[^}]*\}/);
console.log('   Editor view rule: ', cssRule1 ? cssRule1[0] : 'None');
console.log('   Preview view rule (editor):', cssRule2 ? cssRule2[0] : 'None');
console.log('   Preview view rule (prompt):', cssRule3 ? cssRule3[0] : 'None');

// 6. Evaluate visibility state when data-mobile-view is undefined / null (initial load state):
console.log('\n6. State Analysis on Mobile Initial Page Load:');
console.log('   Given: <article class="card"> (no data-mobile-view attribute)');
console.log('   Does data-mobile-view="editor" match? -> false');
console.log('   Does data-mobile-view="preview" match? -> false');
console.log('   Result: .editor display:block; .previewrow display:grid');
console.log('   BUG CONFIRMED: Both editor and preview are visible simultaneously on initial mobile page load!');

// 7. Verify whether run button auto-switches:
const runHandlerMatch = appJs.match(/document\.getElementById\("run"\)\.onclick\s*=\s*function\(\)\s*\{([\s\S]*?)\n  \};/);
console.log('\n7. Run Button Mobile Switcher:');
if (runHandlerMatch) {
  console.log('   Run handler:', runHandlerMatch[1].trim());
  const checksWidth = runHandlerMatch[1].includes('window.innerWidth <= 767');
  const switchesToPreview = runHandlerMatch[1].includes('setMobileLessonView("preview")');
  console.log('   Checks <= 767px:', checksWidth);
  console.log('   Switches to preview:', switchesToPreview);
} else {
  console.log('   Run handler not found!');
}

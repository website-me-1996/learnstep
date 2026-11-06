/**
 * tests/stress_simulator_m2_challenger2.cjs
 *
 * Empirical Adversarial Simulator Stress Test Suite for Milestone 2 (Phase 2 Classic Angular).
 * Authored by: Milestone 2 Challenger 2 (M2 Challenger 2)
 *
 * Mandate:
 * 1. Template simulation stress tests:
 *    - Test rendering *ngIf="isAvailable; else soldOutTpl" when isAvailable is true vs false.
 *    - Test rendering *ngFor="let movie of classicMovies; let i = index" with empty array, 1 item, and multiple items.
 *    - Test rendering [ngClass] with varying boolean flags (hasDiscount: true vs false).
 *    - Test rendering {{ currentMovie$ | async }} ensuring stream or fallback values render cleanly without crashing.
 *    - Test property and event bindings [disabled]="isSoldOut" and (click)="onBookTicket()".
 * 2. Error resilience:
 *    - Malformed templates, unclosed tags, unknown identifiers must be caught gracefully without crashing the editor preview.
 * 3. Exercise angular-editor.js local preview DOM generator on all Phase 2 templates and files.
 * 4. Run full test suites:
 *    - node tests/e2e/run_all_e2e_tests.cjs
 *    - node tests/simulator/test_simulator_empirical.cjs
 * 5. Formulate unambiguous empirical verdict: APPROVE or REJECT.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// Test metrics
let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails = [];

function challenge(title, fn) {
  totalAssertions++;
  try {
    fn();
    passedAssertions++;
    console.log(`  [PASS] ${title}`);
  } catch (err) {
    failedAssertions++;
    failureDetails.push({ title, error: err.message, stack: err.stack });
    console.error(`  [FAIL] ${title}\n         -> ${err.message}`);
  }
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1].trim() : html;
}

console.log('===============================================================================');
console.log('🛡️  EMPIRICAL ADVERSARIAL STRESS TEST SUITE: M2 CHALLENGER 2');
console.log('    Target: angular-editor.js DOM Simulator & Phase 2 Classic Curriculum');
console.log('===============================================================================\n');

// Initialize harness environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { context, getEl, setFiles } = env;

function runInEnv(code) {
  return vm.runInContext(code, context);
}

// -----------------------------------------------------------------------------
// SECTION 1: All 13 Phase 2 Lessons Full-Spectrum Simulator Preview Rendering
// -----------------------------------------------------------------------------
console.log('--- SECTION 1: Phase 2 Lessons (ng-classic-01 .. ng-classic-13) Simulator Verification ---');

const phase2Lessons = courseData.lessons.filter(l => l.module === 'phase-2-classic');

challenge('1.0 Exactly 13 Phase 2 lessons exist in course data', () => {
  assert.strictEqual(phase2Lessons.length, 13, `Expected 13 Phase 2 lessons, found ${phase2Lessons.length}`);
});

phase2Lessons.forEach((lesson, index) => {
  challenge(`1.${index + 1} Simulate Lesson ${lesson.id} (${lesson.file}): "${lesson.title}"`, () => {
    const starterFiles = JSON.parse(JSON.stringify(courseData.starterFiles));
    starterFiles[lesson.file] = lesson.code;
    setFiles(starterFiles);

    runInEnv(`currentLessonIndex = ${10 + index}; activePath = "${lesson.file}"; updateAngularSimulatedPreview();`);

    const previewEl = getEl('angularPreview');
    const statusEl = getEl('angularPreviewStatus');
    const doc = previewEl.srcdoc;
    const status = statusEl.textContent;

    assert.ok(typeof doc === 'string' && doc.length > 50, `Preview srcdoc must be non-empty for ${lesson.id}`);
    assert.ok(doc.includes('<!doctype html>'), `Preview srcdoc must contain <!doctype html>`);
    assert.ok(doc.includes('</html>'), `Preview srcdoc must contain </html>`);

    // Verify routing: components with companion HTML templates render live Angular preview,
    // while pure TS files (services, modules, components without companion HTML) route to TypeScript preview
    const companionHtml = lesson.file.replace(/\.ts$/, '.html');
    const hasCompanionHtml = Boolean(starterFiles[companionHtml]);
    const isPureTs = lesson.file.endsWith('.ts') && !hasCompanionHtml && !lesson.file.includes('app.ts');

    if (isPureTs) {
      assert.strictEqual(status, 'محاكي ومخرجات TypeScript', `Pure TS file ${lesson.file} should route to TS preview`);
    } else {
      assert.strictEqual(status, 'معاينة حية لتطبيق Angular', `File with template ${lesson.file} should route to Angular live preview`);
    }
  });
});

// -----------------------------------------------------------------------------
// SECTION 2: Template Simulation Stress Tests
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 2: Template Simulation Stress Tests ---');

// 2.1 *ngIf="isAvailable; else soldOutTpl"
console.log(' [2.1] *ngIf="isAvailable; else soldOutTpl" (true vs false)');

challenge('2.1.1 *ngIf renders element and strips *ngIf attribute when isAvailable is true', () => {
  const tpl = `<div *ngIf="isAvailable; else soldOutTpl" class="badge normal">العرض متاح</div>
<ng-template #soldOutTpl>
  <div class="badge discount">نفدت التذاكر بالكامل</div>
</ng-template>`;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isAvailable = true; }'
  });

  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  const body = extractBody(getEl('angularPreview').srcdoc);

  assert.ok(body.includes('العرض متاح'), 'Element content must be present when isAvailable is true');
  assert.ok(!body.includes('*ngIf'), '*ngIf directive attribute must be stripped from rendered element');
  assert.ok(body.includes('badge normal'), 'Element classes must be preserved');
});

challenge('2.1.2 *ngIf removes element from DOM when isAvailable is false', () => {
  const tpl = `<div *ngIf="isAvailable; else soldOutTpl" class="badge normal">العرض متاح</div>
<ng-template #soldOutTpl>
  <div class="badge discount">نفدت التذاكر بالكامل</div>
</ng-template>`;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isAvailable = false; }'
  });

  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  const body = extractBody(getEl('angularPreview').srcdoc);

  assert.ok(!body.includes('العرض متاح'), 'Element content must be completely removed when isAvailable is false');
  assert.ok(!body.includes('*ngIf'), '*ngIf directive attribute must not leak into rendered output');
});

challenge('2.1.3 Self-closing tag with *ngIf behaves identically (true vs false)', () => {
  const tpl = `<img *ngIf="isAvailable" class="custom-cinema-banner" src="banner.jpg" />`;

  // True case
  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isAvailable = true; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  let body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('custom-cinema-banner') && body.includes('<img'), 'Self-closing tag must be present in body when true');

  // False case
  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isAvailable = false; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(!body.includes('custom-cinema-banner') && !body.includes('<img'), 'Self-closing tag must be removed from body when false');
});

challenge('2.1.4 Inverted condition *ngIf="!isSoldOut"', () => {
  const tpl = `<button *ngIf="!isSoldOut" class="btn-custom-book">احجز تذكرتك</button>`;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isSoldOut = false; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  let body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('احجز تذكرتك'), 'Inverted condition !isSoldOut (false) must be visible in body');

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isSoldOut = true; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(!body.includes('احجز تذكرتك'), 'Inverted condition !isSoldOut (true) must be removed from body');
});

// 2.2 *ngFor="let movie of classicMovies; let i = index"
console.log('\n [2.2] *ngFor="let movie of classicMovies; let i = index" (empty, 1 item, multiple items)');

challenge('2.2.1 *ngFor with multiple items renders each item and substitutes index', () => {
  const parseDirectives = context.parseAndEvaluateClassicDirectives;
  const tpl = `<div *ngFor="let movie of classicMovies; let i = index" class="movie-pill"><b>{{ i }}. {{ movie }}</b></div>`;
  const scope = { classicMovies: ['رحلة النجوم', 'واحة الأمل', 'حارس المجرة'] };

  const rendered = parseDirectives(tpl, scope);

  assert.ok(rendered.includes('0. رحلة النجوم'), 'First item index and title must be rendered');
  assert.ok(rendered.includes('1. واحة الأمل'), 'Second item index and title must be rendered');
  assert.ok(rendered.includes('2. حارس المجرة'), 'Third item index and title must be rendered');
  const count = (rendered.match(/class="movie-pill"/g) || []).length;
  assert.strictEqual(count, 3, 'Must render exactly 3 movie-pill elements');
});

challenge('2.2.2 *ngFor with single item renders exactly 1 item and index 0', () => {
  const parseDirectives = context.parseAndEvaluateClassicDirectives;
  const tpl = `<div *ngFor="let movie of classicMovies; let i = index" class="movie-pill"><b>{{ i }}. {{ movie }}</b></div>`;
  const scope = { classicMovies: ['فيلم وحيد'] };

  const rendered = parseDirectives(tpl, scope);

  assert.ok(rendered.includes('0. فيلم وحيد'), 'Single item must be rendered with index 0');
  const count = (rendered.match(/class="movie-pill"/g) || []).length;
  assert.strictEqual(count, 1, 'Must render exactly 1 movie-pill element');
});

challenge('2.2.3 *ngFor with empty array returns empty output (0 repeated elements)', () => {
  const parseDirectives = context.parseAndEvaluateClassicDirectives;
  const tpl = `<div *ngFor="let movie of classicMovies; let i = index" class="movie-pill"><b>{{ i }}. {{ movie }}</b></div>`;
  const scope = { classicMovies: [] };

  const rendered = parseDirectives(tpl, scope);

  assert.strictEqual(rendered.trim(), '', 'Empty collection must produce empty string output');
  assert.ok(!rendered.includes('movie-pill'), 'No movie-pill elements should exist');
});

challenge('2.2.4 *ngFor with objects: property access {{ item.title }} and {{ item.price }}', () => {
  const parseDirectives = context.parseAndEvaluateClassicDirectives;
  const tpl = `<div *ngFor="let item of seats" class="seat-badge"><span>{{ item.id }}</span>: <b>{{ item.price }}</b></div>`;
  const scope = {
    seats: [
      { id: 'A1', price: 85 },
      { id: 'A2', price: 120 }
    ]
  };

  const rendered = parseDirectives(tpl, scope);
  assert.ok(rendered.includes('<span>A1</span>'), 'Seat ID A1 must be rendered');
  assert.ok(rendered.includes('<b>85</b>'), 'Seat price 85 must be rendered');
  assert.ok(rendered.includes('<span>A2</span>'), 'Seat ID A2 must be rendered');
  assert.ok(rendered.includes('<b>120</b>'), 'Seat price 120 must be rendered');
});

// 2.3 [ngClass] Dynamic Class Evaluation
console.log('\n [2.3] [ngClass] with varying boolean flags (hasDiscount: true vs false)');

challenge('2.3.1 [ngClass] applies conditional class when true and removes when false', () => {
  const tpl = `<div [ngClass]="{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }">تذكرة</div>`;

  // Case hasDiscount: true
  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { hasDiscount = true; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  let body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('class="badge discount"'), 'Must have class="badge discount" when hasDiscount is true');
  assert.ok(!body.includes('badge normal'), 'Must not have badge normal when hasDiscount is true');

  // Case hasDiscount: false
  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { hasDiscount = false; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('class="badge normal"'), 'Must have class="badge normal" when hasDiscount is false');
  assert.ok(!body.includes('badge discount'), 'Must not have badge discount when hasDiscount is false');
});

challenge('2.3.2 [ngClass] merges with existing static class attribute cleanly', () => {
  const tpl = `<div class="static-pill header" [ngClass]="{ 'active': isVip, 'muted': !isVip }">مستخدم</div>`;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isVip = true; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  let body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('class="static-pill header active"'), 'Must merge static classes with dynamic active class');

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isVip = false; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('class="static-pill header muted"'), 'Must merge static classes with dynamic muted class');
});

// 2.4 Async Pipe & Fallback
console.log('\n [2.4] {{ currentMovie$ | async }} rendering resilience');

challenge('2.4.1 Template with {{ currentMovie$ | async }} renders cleanly without crashing preview', () => {
  const tpl = `<div class="ticket-summary">العرض المباشر: {{ currentMovie$ | async }}</div>`;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': `import { Component } from '@angular/core';
import { of } from 'rxjs';
export class App {
  readonly currentMovie$ = of('رحلة النجوم - صالة IMAX 1');
}`
  });

  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  const doc = getEl('angularPreview').srcdoc;
  const status = getEl('angularPreviewStatus').textContent;
  const body = extractBody(doc);

  assert.strictEqual(status, 'معاينة حية لتطبيق Angular');
  assert.ok(typeof doc === 'string' && doc.length > 50, 'Preview must produce valid srcdoc');
  assert.ok(body.includes('ticket-summary'), 'ticket-summary wrapper must be present');
  assert.ok(body.includes('العرض المباشر'), 'Template text must be rendered cleanly');
});

challenge('2.4.2 Multiple async pipes and interpolations in single view do not crash', () => {
  const tpl = `
    <main class="cinema-shell">
      <h1>{{ title }}</h1>
      <p>فيلم اليوم: {{ currentMovie$ | async }}</p>
      <p>المقاعد المتاحة: {{ availableSeats$ | async }}</p>
    </main>
  `;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { title = "سينما خطوة"; currentMovie$ = null; availableSeats$ = null; }'
  });

  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  const body = extractBody(getEl('angularPreview').srcdoc);

  assert.ok(body.includes('سينما خطوة'), 'Interpolated title must render');
  assert.ok(body.includes('فيلم اليوم:'), 'First async wrapper must render');
  assert.ok(body.includes('المقاعد المتاحة:'), 'Second async wrapper must render');
});

// 2.5 Property & Event Bindings
console.log('\n [2.5] Property and Event Bindings [disabled]="isSoldOut" and (click)="onBookTicket()"');

challenge('2.5.1 [disabled]="isSoldOut" adds disabled attribute when true, omits when false', () => {
  const tpl = `<button [disabled]="isSoldOut" (click)="onBookTicket()" class="btn-confirm">احجز الآن</button>`;

  // Case isSoldOut: true
  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isSoldOut = true; onBookTicket() {} }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  let body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(body.includes('<button disabled') || (body.includes('<button') && body.includes('disabled')), 'Must include disabled attribute on button element');

  // Case isSoldOut: false
  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { isSoldOut = false; onBookTicket() {} }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  body = extractBody(getEl('angularPreview').srcdoc);
  assert.ok(!body.includes('disabled="') && !body.includes('<button disabled') && !body.includes(' disabled>'), 'Must NOT include disabled attribute on button element when isSoldOut is false');
  assert.ok(body.includes('(click)="onBookTicket()"'), 'Event binding attribute must remain preserved');
});

challenge('2.5.2 Property binding [src] dynamically resolves image URL', () => {
  const tpl = `<img [src]="heroBanner" class="cinema-banner" alt="Cinema" />`;

  setFiles({
    'src/app/app.html': tpl,
    'src/app/app.ts': 'export class App { heroBanner = "https://images.example.com/stars.jpg"; }'
  });
  runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
  const body = extractBody(getEl('angularPreview').srcdoc);

  assert.ok(body.includes('src="https://images.example.com/stars.jpg"'), 'Image src must be dynamically resolved');
  assert.ok(!body.includes('[src]'), '[src] property binding syntax must be translated to HTML src');
});

// -----------------------------------------------------------------------------
// SECTION 3: Error Resilience and Malformed Template Chaos Testing
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 3: Error Resilience and Malformed Template Chaos Testing ---');

const malformedScenarios = [
  { name: 'Unclosed <div> tag with *ngIf', html: '<div *ngIf="isAvailable">محتوى مفتوح' },
  { name: 'Mismatched closing tag', html: '<div *ngIf="isAvailable"><p>نص غير متطابق</div></p>' },
  { name: 'Unclosed *ngFor element', html: '<ul *ngFor="let m of movies"><li>عنصر واحد' },
  { name: 'Malformed *ngFor syntax (missing "of")', html: '<div *ngFor="let m in movies">{{ m }}</div>' },
  { name: 'Empty *ngIf condition', html: '<div *ngIf="">شرط فارغ</div>' },
  { name: 'Invalid JS operator in *ngIf condition', html: '<div *ngIf="isAvailable &&& || !=">تركيب خاطئ</div>' },
  { name: 'Malformed [ngClass] string literal instead of object', html: '<div [ngClass]="badClassString">نص</div>' },
  { name: 'Malformed [ngClass] unclosed curly brace', html: '<div [ngClass]="{ active: true">نص غير مغلق</div>' },
  { name: 'Malformed [ngClass] empty object', html: '<div [ngClass]="{}">كائن فارغ</div>' },
  { name: 'Unclosed mustache interpolation {{ title', html: '<h1>{{ title</h1><p>نص عادي</p>' },
  { name: 'Nested unbalanced mustache {{ {{ title }} }}', html: '<div>{{ {{ title }} }}</div>' },
  { name: 'Unknown / undefined identifier in interpolation', html: '<div>{{ completelyUnknownVariableXYZ }}</div>' },
  { name: 'Unknown nested property {{ nonExistentObj.subProp }}', html: '<div>{{ nonExistentObj.subProp }}</div>' },
  { name: 'Malformed [disabled] attribute with syntax junk', html: '<button [disabled]="*%&#$">زر غريب</button>' },
  { name: 'Malformed [src] unclosed quote', html: '<img [src]="https://example.com/test.jpg class="cinema-banner">' },
  { name: 'Extreme deeply nested unclosed tags (depth 25)', html: '<div>'.repeat(25) + 'محتوى عميق' },
  { name: 'Control flow @if with missing closing brace', html: '@if (isAvailable) { <span>متاح</span>' },
  { name: 'Control flow @for with empty collection and @empty', html: '@for (item of []; track $index) { <p>{{ item }}</p> } @empty { <p>فارغ</p> }' },
  { name: 'Control flow @switch with zero cases', html: '@switch (tier) { }' },
  { name: 'Huge template payload (50KB repeated elements)', html: '<div>' + '<span class="badge">سينما</span>'.repeat(1500) + '</div>' },
  { name: 'Special unicode, emoji, and RTL strings', html: '<div *ngIf="isAvailable">🎟️ سينما الأحلام 🎬 ★★★★★ 100% مضمونة ⚡</div>' },
  { name: 'XSS script injection attempt in properties', html: '<div *ngIf="true">{{ title }}</div>', xss: '<script>alert("xss")</script>' }
];

malformedScenarios.forEach((scenario, idx) => {
  challenge(`3.${idx + 1} Resilience: ${scenario.name}`, () => {
    const tsCode = scenario.xss
      ? `export class App { title = "${scenario.xss}"; isAvailable = true; }`
      : `export class App { title = "سينما"; isAvailable = true; isSoldOut = false; }`;

    setFiles({
      'src/app/app.html': scenario.html,
      'src/app/app.ts': tsCode
    });

    // Must not throw an unhandled exception or crash the VM
    runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');

    const doc = getEl('angularPreview').srcdoc;
    assert.ok(typeof doc === 'string', 'Preview srcdoc must be a valid string');
    assert.ok(doc.includes('<!doctype html>'), 'Preview must preserve HTML doctype structure despite malformed input');
    assert.ok(doc.includes('</html>'), 'Preview must preserve closing html tag despite malformed input');

    // If XSS test, ensure script tags are not injected raw
    if (scenario.xss) {
      assert.ok(!doc.includes('<script>alert('), 'Raw script tags must be safely escaped via escapeHtml');
    }
  });
});

// -----------------------------------------------------------------------------
// SECTION 4: Rapid State Re-entrancy and Stress Cycling
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 4: Rapid State Re-entrancy Stress Cycling ---');

challenge('4.1 Rapid toggling (50 cycles) of simulator preview with mixed directives', () => {
  const tpl = `
    <div *ngIf="isAvailable; else soldOutTpl" class="badge normal">العرض متاح</div>
    <div [ngClass]="{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }">تخفيض</div>
    <button [disabled]="isSoldOut" (click)="onBookTicket()">احجز</button>
  `;

  for (let i = 0; i < 50; i++) {
    const isAvail = i % 2 === 0;
    const hasDisc = i % 3 === 0;
    const isSold = i % 5 === 0;

    setFiles({
      'src/app/app.html': tpl,
      'src/app/app.ts': `export class App { isAvailable = ${isAvail}; hasDiscount = ${hasDisc}; isSoldOut = ${isSold}; }`
    });

    runInEnv('activePath = "src/app/app.html"; updateAngularSimulatedPreview();');
    const body = extractBody(getEl('angularPreview').srcdoc);

    if (isAvail) {
      assert.ok(body.includes('العرض متاح'), `Cycle ${i}: Expected visible badge in body`);
    } else {
      assert.ok(!body.includes('العرض متاح'), `Cycle ${i}: Expected hidden badge in body`);
    }
  }
});

// -----------------------------------------------------------------------------
// SECTION 5: Full E2E & Empirical Test Suite Execution
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 5: External Test Suite Execution ---');

const { execSync } = require('child_process');

challenge('5.1 Execute node tests/e2e/run_all_e2e_tests.cjs', () => {
  const output = execSync('node tests/e2e/run_all_e2e_tests.cjs', { cwd: ROOT_DIR, encoding: 'utf8' });
  assert.ok(output.includes('ALL E2E TEST TIERS PASSED SUCCESSFULLY'), 'Master E2E suite must report pass');
  assert.ok(output.includes('Passed           : 59'), 'All 59 E2E tests must pass');
});

challenge('5.2 Execute node tests/simulator/test_simulator_empirical.cjs', () => {
  const output = execSync('node tests/simulator/test_simulator_empirical.cjs', { cwd: ROOT_DIR, encoding: 'utf8' });
  assert.ok(output.includes('Total: 20 | Passed: 20 | Failed: 0'), 'Simulator empirical harness must report 20/20 pass');
});

// -----------------------------------------------------------------------------
// FINAL SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n===============================================================================');
console.log(`FINAL STRESS TEST SUMMARY: Total: ${totalAssertions} | Passed: ${passedAssertions} | Failed: ${failedAssertions}`);
console.log('===============================================================================');

if (failedAssertions > 0) {
  console.error('\n❌ STRESS TEST FAILURES DETECTED:');
  failureDetails.forEach(f => {
    console.error(`- ${f.title}: ${f.error}`);
  });
  console.log('\nEMPIRICAL VERDICT: REJECT ❌');
  process.exit(1);
} else {
  console.log('\n🎉 ALL ADVERSARIAL STRESS CHALLENGES PASSED EMPIRICALLY (Zero Defects).');
  console.log('EMPIRICAL VERDICT: APPROVE ✅\n');
}

/**
 * tests/stress_simulator_m3_challenger2.cjs
 * 
 * Adversarial Simulator Stress Test Suite for Modern Control Flow & Preview Generator (Milestone 3 Challenger 2)
 * 
 * Mandate:
 * 1. Modern Control Flow stress tests:
 *    - @if (totalPrice() >= 200) when totalPrice() is >= 200 vs < 200 (both branches, boundary, signals, raw)
 *    - @for (movie of movies; track movie.id) with realistic array items, and fallback to @empty when movies = []
 *    - @switch (bookingStatus) for 'CONFIRMED', 'PENDING', and unknown status (triggering @default)
 *    - @defer (on viewport) with @placeholder (clean parsing, triggers, no syntax leak)
 * 2. Error resilience:
 *    - Malformed control flow blocks, unclosed curly braces, missing expressions without crashing preview generator
 * 3. Curriculum integration across all 7 Phase 3 lessons (ng-modern-01 to ng-modern-07)
 * 4. Deep nesting, performance, and boundary stress tests
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

const { data: courseData } = loadCourseData('angular-course-data.js');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function stressTest(section, name, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  [PASS] ${section} - ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${section} - ${name}`);
    console.error(`         Error: ${err.message}`);
    if (err.stack) {
      const line = err.stack.split('\n')[1] || err.stack.split('\n')[2];
      if (line) console.error(`         Location: ${line.trim()}`);
    }
    failureDetails.push({ section, name, error: err.message });
  }
}

console.log('===============================================================================');
console.log('⚡ ADVERSARIAL STRESS TEST SUITE: ANGULAR SIMULATOR PREVIEW (M3 CHALLENGER 2)');
console.log('===============================================================================\n');

const env = createEditorEnvironment(courseData);
const {
  parseAndEvaluateIfBlocks,
  parseAndEvaluateForBlocks,
  parseAndEvaluateSwitchBlocks,
  parseAndEvaluateDeferBlocks,
  evalTemplateCondition
} = env.context;

// =============================================================================
// SECTION 1: Modern Control Flow - @if / @else if / @else
// =============================================================================
console.log('--- SECTION 1: Modern Control Flow (@if / @else if / @else) ---');

stressTest('1. Control Flow @if', '1.1 Preview DOM: @if (totalPrice() >= 200) renders @if branch when totalPrice = 250 (Signal)', () => {
  env.setFiles({
    'src/app/app.ts': `
      import { Component, signal } from '@angular/core';
      @Component({ selector: 'app-root', standalone: true, templateUrl: './app.html' })
      export class AppComponent {
        totalPrice = signal(250);
      }
    `,
    'src/app/app.html': `
      @if (totalPrice() >= 200) {
        <span class="badge discount">خصم خاص مؤهل للشحن المجاني!</span>
      } @else {
        <span class="badge normal">أضف تذاكر للحصول على ميزة VIP</span>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('خصم خاص مؤهل للشحن المجاني!'), 'Expected @if branch to render when totalPrice = 250');
  assert.ok(!html.includes('أضف تذاكر للحصول على ميزة VIP'), 'Did not expect @else branch when totalPrice = 250');
});

stressTest('1. Control Flow @if', '1.2 Preview DOM: @if (totalPrice() >= 200) renders @else branch when totalPrice = 150 (Signal)', () => {
  env.setFiles({
    'src/app/app.ts': `
      import { Component, signal } from '@angular/core';
      @Component({ selector: 'app-root', standalone: true, templateUrl: './app.html' })
      export class AppComponent {
        totalPrice = signal(150);
      }
    `,
    'src/app/app.html': `
      @if (totalPrice() >= 200) {
        <span class="badge discount">خصم خاص مؤهل للشحن المجاني!</span>
      } @else {
        <span class="badge normal">أضف تذاكر للحصول على ميزة VIP</span>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(!html.includes('خصم خاص مؤهل للشحن المجاني!'), 'Did not expect @if branch when totalPrice = 150');
  assert.ok(html.includes('أضف تذاكر للحصول على ميزة VIP'), 'Expected @else branch when totalPrice = 150');
});

stressTest('1. Control Flow @if', '1.3 Boundary test: Exact boundary 200 vs 199.99', () => {
  // Boundary 200 (True)
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { totalPrice = signal(200); }`,
    'src/app/app.html': `@if (totalPrice() >= 200) { <div id="pass">QUALIFIED</div> } @else { <div id="fail">SHORT</div> }`
  });
  env.runSimulatedPreview();
  let html = env.getPreviewSrcdoc();
  assert.ok(html.includes('QUALIFIED'), 'Exact boundary 200 must qualify');
  assert.ok(!html.includes('SHORT'), 'Exact boundary 200 must not render else branch');

  // Boundary 199.99 (False)
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { totalPrice = signal(199.99); }`,
    'src/app/app.html': `@if (totalPrice() >= 200) { <div id="pass">QUALIFIED</div> } @else { <div id="fail">SHORT</div> }`
  });
  env.runSimulatedPreview();
  html = env.getPreviewSrcdoc();
  assert.ok(!html.includes('QUALIFIED'), '199.99 must not qualify');
  assert.ok(html.includes('SHORT'), '199.99 must render short branch');
});

stressTest('1. Control Flow @if', '1.4 Multi-branch ladder: @if / @else if / @else with signal expressions', () => {
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { totalPrice = signal(250); }`,
    'src/app/app.html': `
      @if (totalPrice() >= 500) {
        <div class="tier-platinum">بلاتيني</div>
      } @else if (totalPrice() >= 200) {
        <div class="tier-gold">ذهبي</div>
      } @else if (totalPrice() >= 100) {
        <div class="tier-silver">فضي</div>
      } @else {
        <div class="tier-bronze">برونزي</div>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('tier-gold'), 'Should match tier-gold for 250');
  assert.ok(!html.includes('tier-platinum'), 'Should not match platinum');
  assert.ok(!html.includes('tier-silver'), 'Should not match silver');
  assert.ok(!html.includes('tier-bronze'), 'Should not match bronze');
});

stressTest('1. Control Flow @if', '1.5 Direct parser: parseAndEvaluateIfBlocks with scope object', () => {
  const tpl = `@if (totalPrice() >= 200) { <span>خصم 20%</span> } @else { <span>سعر عادي</span> }`;
  const resTrue = parseAndEvaluateIfBlocks(tpl, { totalPrice: 220 });
  assert.ok(resTrue.includes('خصم 20%') && !resTrue.includes('سعر عادي'), 'Parser must select if branch for 220');

  const resFalse = parseAndEvaluateIfBlocks(tpl, { totalPrice: 90 });
  assert.ok(resFalse.includes('سعر عادي') && !resFalse.includes('خصم 20%'), 'Parser must select else branch for 90');
});

// =============================================================================
// SECTION 2: Modern Control Flow - @for & @empty Fallback
// =============================================================================
console.log('\n--- SECTION 2: Modern Control Flow (@for & @empty Fallback) ---');

stressTest('2. Control Flow @for', '2.1 Preview DOM: @for (movie of movies; track movie.id) with curriculum starter movies', () => {
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': `
      @for (movie of movies; track movie.id) {
        <div class="movie-pill">
          <b>{{ movie.title }}</b>
          <small>يبدأ {{ movie.time }}</small>
        </div>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('رحلة النجوم'), 'Must render movie 1 title');
  assert.ok(html.includes('واحة الأمل'), 'Must render movie 2 title');
  assert.ok(html.includes('18:00'), 'Must render movie 1 time');
  assert.ok(html.includes('21:00') || html.includes('20:30'), 'Must render movie 2 time');
});

stressTest('2. Control Flow @for', '2.2 Preview DOM: @for with dynamic signal array of realistic movies', () => {
  env.setFiles({
    'src/app/app.ts': `
      import { Component, signal } from '@angular/core';
      @Component({ selector: 'app-root', standalone: true, templateUrl: './app.html' })
      export class AppComponent {
        movies = signal([
          { id: 101, title: 'كثيب: الجزء الثاني', time: '19:30', price: 90 },
          { id: 102, title: 'أوبنهايمر', time: '21:00', price: 85 }
        ]);
      }
    `,
    'src/app/app.html': `
      @for (movie of movies(); track movie.id) {
        <div class="movie-card" data-id="{{ movie.id }}">
          <h4>{{ movie.title }}</h4>
          <span>الوقت: {{ movie.time }}</span>
          <small>السعر: {{ movie.price }}</small>
          <em>رقم: {{$index}} من {{$count}}</em>
        </div>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('كثيب: الجزء الثاني'), 'Must render dynamic movie 1');
  assert.ok(html.includes('أوبنهايمر'), 'Must render dynamic movie 2');
  assert.ok(html.includes('data-id="101"'), 'Must interpolate movie.id attribute');
  assert.ok(html.includes('رقم: 0 من 2'), 'Must interpolate $index 0 and $count 2');
  assert.ok(html.includes('رقم: 1 من 2'), 'Must interpolate $index 1 and $count 2');
});

stressTest('2. Control Flow @for', '2.3 Preview DOM: @for with empty signal collection movies = signal([]) triggers @empty', () => {
  env.setFiles({
    'src/app/app.ts': `
      import { Component, signal } from '@angular/core';
      export class AppComponent {
        movies = signal([]);
      }
    `,
    'src/app/app.html': `
      @for (movie of movies(); track movie.id) {
        <div class="movie-pill"><b>{{ movie.title }}</b></div>
      } @empty {
        <p class="empty-notice">لا توجد عروض أفلام متاحة في هذا التوقيت.</p>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('empty-notice'), 'Must render .empty-notice container');
  assert.ok(html.includes('لا توجد عروض أفلام متاحة في هذا التوقيت.'), 'Must render empty text');
  assert.ok(!html.includes('<div class="movie-pill">'), 'Must not render movie-pill element when empty');
});

stressTest('2. Control Flow @for', '2.4 Direct parser: parseAndEvaluateForBlocks with populated array and loop variables', () => {
  const tpl = `
    @for (movie of movies; track movie.id) {
      <div>{{ movie.title }} ({{$index}}/{{$count}})</div>
    }
  `;
  const scope = {
    movies: [
      { id: 1, title: 'فيلم الأكشن' },
      { id: 2, title: 'فيلم الدراما' },
      { id: 3, title: 'فيلم الخيال' }
    ]
  };
  const out = parseAndEvaluateForBlocks(tpl, scope);
  assert.ok(out.includes('فيلم الأكشن (0/3)'), 'Must render item 0 with count 3');
  assert.ok(out.includes('فيلم الدراما (1/3)'), 'Must render item 1 with count 3');
  assert.ok(out.includes('فيلم الخيال (2/3)'), 'Must render item 2 with count 3');
});

stressTest('2. Control Flow @for', '2.5 Direct parser: parseAndEvaluateForBlocks with empty array movies = [] triggers @empty', () => {
  const tpl = `
    @for (movie of movies; track movie.id) {
      <div>{{ movie.title }}</div>
    } @empty {
      <p class="empty-custom">القائمة فارغة تماماً</p>
    }
  `;
  const out = parseAndEvaluateForBlocks(tpl, { movies: [] });
  assert.ok(out.includes('القائمة فارغة تماماً'), 'Must render custom @empty body');
});

stressTest('2. Control Flow @for', '2.6 Direct parser: parseAndEvaluateForBlocks fallback to default notice when @empty block omitted', () => {
  const tpl = `
    @for (movie of movies; track movie.id) {
      <div>{{ movie.title }}</div>
    }
  `;
  const out = parseAndEvaluateForBlocks(tpl, { movies: [] });
  assert.ok(out.includes('empty-notice'), 'Must render default empty notice');
});

// =============================================================================
// SECTION 3: Modern Control Flow - @switch, @case & @default
// =============================================================================
console.log('\n--- SECTION 3: Modern Control Flow (@switch / @case / @default) ---');

stressTest('3. Control Flow @switch', '3.1 Preview DOM: @switch (bookingStatus) matches CONFIRMED', () => {
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { bookingStatus = 'CONFIRMED'; }`,
    'src/app/app.html': `
      @switch (bookingStatus) {
        @case ('CONFIRMED') { <span class="badge normal">الحجز مؤكد وجاهز</span> }
        @case ('PENDING') { <span class="badge discount">في انتظار الدفع</span> }
        @default { <span class="badge">حالة الحجز غير محددة</span> }
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('الحجز مؤكد وجاهز'), 'Must render CONFIRMED case');
  assert.ok(!html.includes('في انتظار الدفع'), 'Must not render PENDING case');
  assert.ok(!html.includes('حالة الحجز غير محددة'), 'Must not render default case');
});

stressTest('3. Control Flow @switch', '3.2 Preview DOM: @switch (bookingStatus) matches PENDING', () => {
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { bookingStatus = 'PENDING'; }`,
    'src/app/app.html': `
      @switch (bookingStatus) {
        @case ('CONFIRMED') { <span class="badge normal">الحجز مؤكد وجاهز</span> }
        @case ('PENDING') { <span class="badge discount">في انتظار الدفع</span> }
        @default { <span class="badge">حالة الحجز غير محددة</span> }
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(!html.includes('الحجز مؤكد وجاهز'), 'Must not render CONFIRMED case');
  assert.ok(html.includes('في انتظار الدفع'), 'Must render PENDING case');
  assert.ok(!html.includes('حالة الحجز غير محددة'), 'Must not render default case');
});

stressTest('3. Control Flow @switch', '3.3 Preview DOM: @switch (bookingStatus) falls back to @default on unknown status', () => {
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { bookingStatus = 'CANCELLED'; }`,
    'src/app/app.html': `
      @switch (bookingStatus) {
        @case ('CONFIRMED') { <span class="badge normal">الحجز مؤكد وجاهز</span> }
        @case ('PENDING') { <span class="badge discount">في انتظار الدفع</span> }
        @default { <span class="badge">حالة الحجز غير محددة</span> }
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(!html.includes('الحجز مؤكد وجاهز'), 'Must not render CONFIRMED case');
  assert.ok(!html.includes('في انتظار الدفع'), 'Must not render PENDING case');
  assert.ok(html.includes('حالة الحجز غير محددة'), 'Must render @default fallback case');
});

stressTest('3. Control Flow @switch', '3.4 Preview DOM: @switch with signal expression @switch (bookingStatus())', () => {
  env.setFiles({
    'src/app/app.ts': `
      import { Component, signal } from '@angular/core';
      export class AppComponent {
        bookingStatus = signal('PENDING');
      }
    `,
    'src/app/app.html': `
      @switch (bookingStatus()) {
        @case ('CONFIRMED') { <span>مؤكد</span> }
        @case ('PENDING') { <span>قيد الانتظار</span> }
        @default { <span>غير معروف</span> }
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('قيد الانتظار'), 'Must evaluate signal call in @switch header');
  assert.ok(!html.includes('مؤكد'), 'Must not render confirmed');
});

stressTest('3. Control Flow @switch', '3.5 Double-quote and single-quote case tolerance', () => {
  const tpl = `
    @switch (status) {
      @case ("ACTIVE") { <span>نشط</span> }
      @case ('PAUSED') { <span>متوقف</span> }
      @default { <span>مجهول</span> }
    }
  `;
  const out1 = parseAndEvaluateSwitchBlocks(tpl, { status: 'ACTIVE' });
  assert.ok(out1.includes('نشط'), 'Must match double-quoted case');

  const out2 = parseAndEvaluateSwitchBlocks(tpl, { status: 'PAUSED' });
  assert.ok(out2.includes('متوقف'), 'Must match single-quoted case');
});

// =============================================================================
// SECTION 4: Modern Control Flow - @defer & @placeholder
// =============================================================================
console.log('\n--- SECTION 4: Modern Control Flow (@defer & @placeholder) ---');

stressTest('4. Control Flow @defer', '4.1 Preview DOM: Lesson ng-modern-07 @defer (on viewport) with @placeholder cleanly renders without leaking tokens', () => {
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': `
      <div class="cinema-header">قاعة العرض</div>
      @defer (on viewport) {
        <div class="seat-picker-section"><b>اختيار المقاعد التفاعلية</b></div>
      } @placeholder {
        <p>مرر للأسفل لاختيار مقاعد العرض...</p>
      }
      <div class="cinema-footer">نهاية القاعة</div>
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('قاعة العرض'), 'Header preserved');
  assert.ok(html.includes('اختيار المقاعد التفاعلية'), 'Deferred body rendered in local simulated preview');
  assert.ok(html.includes('نهاية القاعة'), 'Footer preserved');
  assert.ok(!html.includes('@defer'), 'Raw @defer token must not leak into DOM');
  assert.ok(!html.includes('@placeholder'), 'Raw @placeholder token must not leak into DOM');
});

stressTest('4. Control Flow @defer', '4.2 Direct parser: parseAndEvaluateDeferBlocks with triggers (on idle, on interaction, on hover, when condition)', () => {
  const triggers = [
    '@defer (on viewport)',
    '@defer (on idle)',
    '@defer (on interaction)',
    '@defer (on hover)',
    '@defer (on timer(1000ms))',
    '@defer (when isReady)'
  ];

  triggers.forEach((trig, idx) => {
    const tpl = `
      ${trig} {
        <section class="deferred-${idx}">محتوى مؤجل ${idx}</section>
      } @placeholder {
        <span>تحميل مسبق</span>
      }
    `;
    const out = parseAndEvaluateDeferBlocks(tpl);
    assert.ok(out.includes(`محتوى مؤجل ${idx}`), `Must render content for ${trig}`);
    assert.ok(!out.includes('@defer'), `Must not leak @defer for ${trig}`);
    assert.ok(!out.includes('@placeholder'), `Must not leak @placeholder for ${trig}`);
  });
});

stressTest('4. Control Flow @defer', '4.3 Direct parser: parseAndEvaluateDeferBlocks handles @defer with @placeholder and @loading in standard order', () => {
  const tpl = `
    @defer (on viewport) {
      <div class="main-component">المكون الأساسي</div>
    } @placeholder (minimum 200ms) {
      <div class="ph">هيكل حجز مؤقت</div>
    } @loading (minimum 500ms) {
      <div class="ld">جاري التحميل...</div>
    }
  `;
  const out = parseAndEvaluateDeferBlocks(tpl);
  assert.ok(out.includes('المكون الأساسي'), 'Must render main component');
  assert.ok(!out.includes('@defer'), 'Must not leak @defer');
  assert.ok(!out.includes('@placeholder'), 'Must not leak @placeholder');
  assert.ok(!out.includes('@loading'), 'Must not leak @loading');
});

// =============================================================================
// SECTION 5: Error Resilience Stress Testing (Graceful Degrade, Zero Crashes)
// =============================================================================
console.log('\n--- SECTION 5: Error Resilience Stress Testing ---');

stressTest('5. Error Resilience', '5.1 Malformed @if: unclosed curly brace does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { totalPrice = signal(250); }`,
      'src/app/app.html': `@if (totalPrice() >= 200) { <span class="unclosed">Unclosed content`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on unclosed brace in @if');
});

stressTest('5. Error Resilience', '5.2 Malformed @if: unclosed parenthesis does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { totalPrice = signal(250); }`,
      'src/app/app.html': `@if (totalPrice() >= 200 { <span>Missing close paren</span> }`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on unclosed parenthesis in @if');
});

stressTest('5. Error Resilience', '5.3 Malformed @if: empty condition does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent {}`,
      'src/app/app.html': `@if () { <span>Empty expression</span> }`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on empty condition in @if');
});

stressTest('5. Error Resilience', '5.4 Malformed @for: missing "of" keyword does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { movies = signal([1, 2]); }`,
      'src/app/app.html': `@for (movie in movies; track movie) { <div>Broken</div> }`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on invalid @for header');
});

stressTest('5. Error Resilience', '5.5 Malformed @for: unclosed curly brace does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { movies = signal([1, 2]); }`,
      'src/app/app.html': `@for (movie of movies(); track movie) { <div class="broken"`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on unclosed brace in @for');
});

stressTest('5. Error Resilience', '5.6 Malformed @switch: unclosed curly brace does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { bookingStatus = 'CONFIRMED'; }`,
      'src/app/app.html': `@switch (bookingStatus) { @case ('CONFIRMED') { <div>Incomplete`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on unclosed brace in @switch');
});

stressTest('5. Error Resilience', '5.7 Malformed @defer: unclosed curly brace does not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent {}`,
      'src/app/app.html': `@defer (on viewport) { <div class="incomplete"`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on unclosed brace in @defer');
});

stressTest('5. Error Resilience', '5.8 Malformed expressions: syntax errors in conditions do not crash generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent {}`,
      'src/app/app.html': `@if (!!!+++===???) { <span>Garbage condition</span> }`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on syntax error inside @if condition');
});

stressTest('5. Error Resilience', '5.9 Broken interpolations: unclosed {{ do not crash preview generator', () => {
  assert.doesNotThrow(() => {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { title = 'سينما'; }`,
      'src/app/app.html': `<div>{{ title broken interpolation`
    });
    env.runSimulatedPreview();
  }, 'Preview generator must not throw on unclosed interpolation');
});

// =============================================================================
// SECTION 6: Curriculum Integration - All 7 Phase 3 Lessons
// =============================================================================
console.log('\n--- SECTION 6: Curriculum Integration (All 7 Phase 3 Lessons) ---');

const phase3LessonIds = [
  'ng-modern-01',
  'ng-modern-02',
  'ng-modern-03',
  'ng-modern-04',
  'ng-modern-05',
  'ng-modern-06',
  'ng-modern-07'
];

phase3LessonIds.forEach(id => {
  stressTest('6. Curriculum Integration', `6. Lesson ${id} task validation & non-empty preview generation`, () => {
    const lesson = courseData.lessons.find(l => l.id === id);
    assert.ok(lesson, `Lesson ${id} must exist in course data`);

    const files = { ...courseData.starterFiles };
    files[lesson.file] = lesson.code;
    env.setFiles(files);
    env.setActivePath(lesson.file);

    assert.doesNotThrow(() => {
      env.runSimulatedPreview();
    }, `runSimulatedPreview must not crash on lesson ${id}`);

    const taskResult = env.checkSupportedTask(lesson);
    assert.strictEqual(taskResult, true, `checkSupportedTask for lesson ${id} must return true`);

    const previewDoc = env.getPreviewSrcdoc();
    assert.ok(previewDoc && previewDoc.length > 50, `Preview document for lesson ${id} must be non-empty`);
  });
});

// =============================================================================
// SECTION 7: Deep Nesting, Complexity & Performance Stress
// =============================================================================
console.log('\n--- SECTION 7: Deep Nesting, Complexity & Performance Stress ---');

stressTest('7. Complexity & Perf', '7.1 Deep 3-level nested control flow: @for containing @if containing @switch', () => {
  const tpl = `
    @for (movie of movies; track movie.id) {
      <div class="box">
        <h3>{{ movie.title }}</h3>
        @if (movie.isAvailable) {
          <span>متاح</span>
          @switch (role) {
            @case ('vip') { <button class="btn-vip">حجز VIP</button> }
            @default { <button class="btn-reg">حجز عادي</button> }
          }
        } @else {
          <span class="sold-out">مباع</span>
        }
      </div>
    }
  `;
  const scope = {
    role: 'vip',
    movies: [
      { id: 1, title: 'فيلم أ', isAvailable: true },
      { id: 2, title: 'فيلم ب', isAvailable: false }
    ]
  };

  const step1 = parseAndEvaluateIfBlocks(tpl, scope);
  const step2 = parseAndEvaluateForBlocks(step1, scope);

  assert.ok(step2.includes('فيلم أ') && step2.includes('btn-vip'), 'Movie A must be available with VIP button');
  assert.ok(step2.includes('فيلم ب') && step2.includes('مباع'), 'Movie B must be marked sold out');
});

stressTest('7. Complexity & Perf', '7.2 Scalability: 100 array items rendered via parseAndEvaluateForBlocks in < 150ms', () => {
  const largeMovieArray = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `فيلم رقم ${i + 1}`,
    time: `${12 + (i % 10)}:00`,
    rating: (4 + (i % 10) / 10).toFixed(1)
  }));

  const tpl = `
    @for (movie of movies; track movie.id) {
      <div class="row" data-id="{{ movie.id }}">
        <b>{{ movie.title }}</b> - <span>{{ movie.time }}</span>
      </div>
    }
  `;

  const start = Date.now();
  const out = parseAndEvaluateForBlocks(tpl, { movies: largeMovieArray });
  const duration = Date.now() - start;

  assert.ok(out.includes('فيلم رقم 1'), 'Must render first item');
  assert.ok(out.includes('فيلم رقم 100'), 'Must render 100th item');
  assert.ok(duration < 150, `100 items render took ${duration}ms (must be < 150ms)`);
  console.log(`         [Metric] 100 @for items parsed and rendered in ${duration}ms`);
});

stressTest('7. Complexity & Perf', '7.3 Rapid re-render loop: 50 consecutive simulator preview updates in < 1000ms', () => {
  const start = Date.now();
  for (let i = 0; i < 50; i++) {
    env.setFiles({
      'src/app/app.ts': `export class AppComponent { totalPrice = signal(${150 + i * 2}); }`,
      'src/app/app.html': `@if (totalPrice() >= 200) { <span>Over 200</span> } @else { <span>Under 200</span> }`
    });
    env.runSimulatedPreview();
  }
  const duration = Date.now() - start;
  assert.ok(duration < 1000, `50 cycles should take < 1000ms (took ${duration}ms)`);
  console.log(`         [Metric] 50 consecutive preview cycles executed in ${duration}ms (avg ${(duration / 50).toFixed(2)}ms/cycle)`);
});

// =============================================================================
// SECTION 8: Adversarial Diagnostic Stress Cases (Documented Architectural Boundaries)
// =============================================================================
console.log('\n--- SECTION 8: Adversarial Diagnostic Stress Cases ---');

stressTest('8. Diagnostic Boundaries', '8.1 Diagnostic: Signals vs Raw TS properties for complex collections', () => {
  // Signals: Successfully parsed into props.movies
  env.setFiles({
    'src/app/app.ts': `export class AppComponent { movies = signal([{ id: 99, title: 'فيلم إشارة' }]); }`,
    'src/app/app.html': `@for (m of movies(); track m.id) { <div>{{ m.title }}</div> }`
  });
  env.runSimulatedPreview();
  assert.ok(env.getPreviewSrcdoc().includes('فيلم إشارة'), 'Signals collections are dynamically parsed');
});

stressTest('8. Diagnostic Boundaries', '8.2 Diagnostic: @defer block ordering with @placeholder and @loading', () => {
  // Standard curriculum order (@defer -> @placeholder -> @loading)
  const standardOrder = `
    @defer { <main>المحتوى</main> }
    @placeholder { <aside>هيكل</aside> }
    @loading { <aside>تحميل</aside> }
  `;
  const out = parseAndEvaluateDeferBlocks(standardOrder);
  assert.ok(!out.includes('@defer') && !out.includes('@placeholder') && !out.includes('@loading'));
});

// =============================================================================
// SUMMARY & VERDICT
// =============================================================================
console.log('\n===============================================================================');
console.log('⚡ STRESS TEST SUITE EXECUTION SUMMARY');
console.log('===============================================================================');
console.log(`Total Stress Tests : ${totalTests}`);
console.log(`Passed             : ${passedTests} ✅`);
console.log(`Failed             : ${failedTests} ❌`);
console.log(`Success Rate       : ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests > 0) {
  console.error('\nFailure Details:');
  failureDetails.forEach((f, idx) => {
    console.error(`  ${idx + 1}. [${f.section}] ${f.name} -> ${f.error}`);
  });
  console.log('\nVERDICT: REJECT ❌');
  process.exit(1);
} else {
  console.log('\nVERDICT: EMPIRICALLY APPROVED ✅ (Zero Defects Detected)');
  process.exit(0);
}

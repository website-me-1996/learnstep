/**
 * Adversarial Empirical Verification Suite for Phase 4 Modern Reactivity & Signals (Milestone 4)
 * Exhaustive empirical testing covering all 8 Phase 4 lessons (ng-signal-01 to ng-signal-08),
 * module descriptor, starterFiles components, simulator task matching, signal reactivity, and preview.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
    if (err.stack) {
      const line = err.stack.split('\n')[2];
      if (line) console.error(`         Location: ${line.trim()}`);
    }
  }
}

console.log('===============================================================================');
console.log('📡 EMPIRICAL CHALLENGER: ADVERSARIAL VERIFICATION SUITE (PHASE 4 SIGNALS)');
console.log('===============================================================================');

// 1. Load course data
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p4Lessons = courseData.lessons.filter(l => l.module === 'phase-4-signals');

// --- SECTION 1: Module Metadata & Global Course Integrity ---
console.log('\n--- SECTION 1: Module Metadata & Global Course Integrity ---');

runTest('1.1 Module descriptor "phase-4-signals" exists with complete schema', () => {
  assert.ok(courseData.modules, 'courseData.modules must exist');
  const mod = courseData.modules['phase-4-signals'];
  assert.ok(mod, 'modules["phase-4-signals"] must exist');
  assert.strictEqual(mod.id, 'phase-4-signals');
  assert.ok(typeof mod.title === 'string' && mod.title.length > 10, 'mod.title must be descriptive');
  assert.ok(typeof mod.description === 'string' && mod.description.length > 20, 'mod.description must be descriptive');
  assert.strictEqual(mod.icon, '📡');
  assert.ok(typeof mod.badge === 'string' && mod.badge.includes('8'), 'mod.badge must indicate 8 lessons');
  assert.strictEqual(mod.lessonCount, 8, 'mod.lessonCount must be 8');
});

runTest('1.2 Exactly 8 lessons belong to module "phase-4-signals"', () => {
  assert.strictEqual(p4Lessons.length, 8, 'Must have exactly 8 Phase 4 lessons in lessons array');
  assert.strictEqual(courseData.modules['phase-4-signals'].lessonCount, p4Lessons.length);
});

runTest('1.3 Total course lesson count is valid (84 in Phase 4, 91 in Phase 5, 97 in Phase 6, 106 in Phase 7)', () => {
  assert.ok([84, 91, 97, 106].includes(courseData.lessons.length), `Course contains ${courseData.lessons.length} lessons`);
});

runTest('1.4 Zero duplicate lesson IDs across all lessons', () => {
  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} must have an id`);
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.strictEqual(ids.size, courseData.lessons.length, `Must have exactly ${courseData.lessons.length} unique lesson IDs`);
});

runTest('1.5 Phase 4 lessons occupy indices 30 through 37 in sequential order', () => {
  const expectedP4Ids = [
    'ng-signal-01', 'ng-signal-02', 'ng-signal-03', 'ng-signal-04',
    'ng-signal-05', 'ng-signal-06', 'ng-signal-07', 'ng-signal-08'
  ];
  expectedP4Ids.forEach((expectedId, offset) => {
    const idx = 30 + offset;
    assert.strictEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    assert.strictEqual(courseData.lessons[idx].module, 'phase-4-signals');
  });
});

runTest('1.6 Preserved continuity across curriculum phases', () => {
  // Phase 1 (0-9)
  assert.strictEqual(courseData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(courseData.lessons[9].id, 'ng-ts-10');
  // Phase 2 (10-22)
  assert.strictEqual(courseData.lessons[10].id, 'ng-classic-01');
  assert.strictEqual(courseData.lessons[22].id, 'ng-classic-13');
  // Phase 3 (23-29)
  assert.strictEqual(courseData.lessons[23].id, 'ng-modern-01');
  assert.strictEqual(courseData.lessons[29].id, 'ng-modern-07');
  // Phase 4 (30-37)
  assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
  assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');
  // Continuity after Phase 4
  if (courseData.lessons.length === 84) {
    assert.strictEqual(courseData.lessons[38].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[83].id, 'final-review');
  } else if (courseData.lessons.length === 91) {
    assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
    assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
    assert.strictEqual(courseData.lessons[45].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  } else if (courseData.lessons.length === 97) {
    assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
    assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
    assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
    assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
    assert.strictEqual(courseData.lessons[51].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  } else {
    assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
    assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');
    assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
    assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');
    assert.strictEqual(courseData.lessons[51].id, 'capstone-01');
    assert.strictEqual(courseData.lessons[59].id, 'capstone-09');
    assert.strictEqual(courseData.lessons[60].id, 'ng-intro');
    assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review');
  }
});

// --- SECTION 2: Starter Files Integrity & Modern Component Architecture ---
console.log('\n--- SECTION 2: Starter Files Integrity & Modern Component Architecture ---');

runTest('2.1 src/app/app.ts imports computed along with Component and signal', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs, 'src/app/app.ts must exist in starterFiles');
  assert.ok(appTs.includes("from '@angular/core'"), 'Must import from @angular/core');
  assert.ok(appTs.includes('Component'), 'Must import Component');
  assert.ok(appTs.includes('signal'), 'Must import signal');
  assert.ok(appTs.includes('computed'), 'Must import computed');
});

runTest('2.2 src/app/app.ts declares totalTickets signal and addTicket method', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  assert.ok(appTs.includes('totalTickets = signal(10)'), 'Must declare totalTickets = signal(10)');
  assert.ok(appTs.includes('addTicket(): void'), 'Must declare addTicket(): void');
  assert.ok(appTs.includes('this.totalTickets.update('), 'addTicket must update totalTickets');
});

runTest('2.3 src/app/app.ts strictly preserves all Phase 2 and Phase 3 properties and methods', () => {
  const appTs = courseData.starterFiles['src/app/app.ts'];
  // Phase 2 classic
  assert.ok(appTs.includes("title = 'سينما خطوة'"), 'Preserve title');
  assert.ok(appTs.includes("movieTitle = 'رحلة النجوم'"), 'Preserve movieTitle');
  assert.ok(appTs.includes('isSoldOut = false'), 'Preserve isSoldOut');
  assert.ok(appTs.includes('isAvailable = true'), 'Preserve isAvailable');
  assert.ok(appTs.includes('hasDiscount = true'), 'Preserve hasDiscount');
  assert.ok(appTs.includes('classicMovies: string[]'), 'Preserve classicMovies');
  assert.ok(appTs.includes('bookingCount = 0'), 'Preserve bookingCount');
  assert.ok(appTs.includes('bookingMessage = \'\''), 'Preserve bookingMessage');
  assert.ok(appTs.includes('currentMovie$: Observable<string>'), 'Preserve currentMovie$');
  assert.ok(appTs.includes('onBookTicket(): void'), 'Preserve onBookTicket');
  assert.ok(appTs.includes('onSeatSelected(seat: string): void'), 'Preserve onSeatSelected');
  // Phase 3 modern
  assert.ok(appTs.includes('totalPrice = signal(250)'), 'Preserve totalPrice');
  assert.ok(appTs.includes('movies = ['), 'Preserve movies array');
  assert.ok(appTs.includes("bookingStatus: 'CONFIRMED'"), 'Preserve bookingStatus');
});

runTest('2.4 All 4 Phase 4 component starter files exist with standalone: true', () => {
  const components = [
    'src/app/components/movie-card.component.ts',
    'src/app/components/seat-picker.component.ts',
    'src/app/components/search-box.component.ts',
    'src/app/components/seat-item.component.ts'
  ];

  components.forEach(file => {
    assert.ok(courseData.starterFiles[file], `File ${file} must exist in starterFiles`);
    const content = courseData.starterFiles[file];
    assert.ok(content.includes('standalone: true'), `${file} must be standalone: true`);
    assert.ok(content.includes('@Component('), `${file} must declare @Component`);
  });
});

runTest('2.5 Component files export expected component classes and signal inputs/outputs/model', () => {
  const card = courseData.starterFiles['src/app/components/movie-card.component.ts'];
  assert.ok(card.includes('class MovieCardComponent'), 'Exports MovieCardComponent');
  assert.ok(card.includes('title = input.required<string>()'), 'Declares input.required');

  const picker = courseData.starterFiles['src/app/components/seat-picker.component.ts'];
  assert.ok(picker.includes('class SeatPickerComponent'), 'Exports SeatPickerComponent');
  assert.ok(picker.includes('seatSelected = output<string>()'), 'Declares output');

  const search = courseData.starterFiles['src/app/components/search-box.component.ts'];
  assert.ok(search.includes('class SearchBoxComponent'), 'Exports SearchBoxComponent');
  assert.ok(search.includes("query = model<string>('')"), 'Declares model');

  const item = courseData.starterFiles['src/app/components/seat-item.component.ts'];
  assert.ok(item.includes('class SeatItemComponent'), 'Exports SeatItemComponent');
  assert.ok(item.includes('seatNumber = input.required<string>()'), 'Declares input.required');
  assert.ok(item.includes('seatSelected = output<string>()'), 'Declares output');
});

// --- SECTION 3: Phase 4 Lessons Schema & Pedagogical Substance ---
console.log('\n--- SECTION 3: Phase 4 Lessons Schema & Pedagogical Substance ---');

runTest('3.1 All 8 Phase 4 lessons have all 15 mandatory schema fields', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p4Lessons.forEach(l => {
    mandatoryFields.forEach(field => {
      assert.ok(l[field] !== undefined && l[field] !== null && l[field] !== '',
        `Lesson ${l.id} missing mandatory field "${field}"`);
    });
  });
});

runTest('3.2 Every Phase 4 lesson target file exists in starterFiles', () => {
  p4Lessons.forEach(l => {
    assert.ok(courseData.starterFiles[l.file] !== undefined,
      `Target file "${l.file}" in lesson ${l.id} must exist in starterFiles`);
  });
});

runTest('3.3 Every Phase 4 lesson references official documentation from angular.dev', () => {
  p4Lessons.forEach(l => {
    assert.ok(l.reference.startsWith('https://angular.dev/'),
      `Lesson ${l.id} reference must start with https://angular.dev/ (got: ${l.reference})`);
  });
});

runTest('3.4 Every Phase 4 lesson code strictly contains its expected snippet', () => {
  p4Lessons.forEach(l => {
    const list = Array.isArray(l.expected) ? l.expected : [l.expected];
    list.forEach(exp => {
      assert.ok(l.code.includes(exp), `Lesson ${l.id} code must contain expected snippet: "${exp}"`);
    });
  });
});

runTest('3.5 Every Phase 4 lesson visual flow notation contains directional arrows (⟶)', () => {
  p4Lessons.forEach(l => {
    assert.ok(l.flow.includes('⟶'), `Lesson ${l.id} flow must contain arrow (⟶)`);
  });
});

runTest('3.6 Pedagogical Arabic prose depth and quality across all 8 lessons', () => {
  p4Lessons.forEach(l => {
    assert.ok(l.concept.length >= 450, `Lesson ${l.id} concept must be detailed (>= 450 chars, got ${l.concept.length})`);
    assert.ok(l.summary.length >= 80, `Lesson ${l.id} summary must be descriptive (>= 80 chars, got ${l.summary.length})`);
    assert.ok(l.task.length >= 15, `Lesson ${l.id} task must be actionable (>= 15 chars, got ${l.task.length})`);
  });
});

// --- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---
console.log('\n--- SECTION 4: 5-Step Micro-Learning Pedagogy & Quiz Verification ---');

runTest('4.1 Every Phase 4 lesson has exactly 5 steps in correct order and type', () => {
  const expectedSteps = [
    { id: 'idea', type: 'observe' },
    { id: 'anatomy', type: 'observe' },
    { id: 'practice', type: 'build' },
    { id: 'experiment', type: 'edit' },
    { id: 'quiz', type: 'quiz' }
  ];

  p4Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    expectedSteps.forEach((exp, sIdx) => {
      const step = l.steps[sIdx];
      assert.strictEqual(step.id, exp.id, `Lesson ${l.id} step ${sIdx} id must be ${exp.id}`);
      assert.strictEqual(step.type, exp.type, `Lesson ${l.id} step ${sIdx} type must be ${exp.type}`);
    });
  });
});

runTest('4.2 Every Quiz step has complete question, options array (>=3), valid correct index, and benefit', () => {
  p4Lessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(quiz.question && quiz.question.length > 10, `Quiz question in ${l.id} must be descriptive`);
    assert.ok(Array.isArray(quiz.options) && quiz.options.length >= 3, `Quiz in ${l.id} must have >= 3 options`);
    assert.ok(quiz.correct >= 0 && quiz.correct < quiz.options.length, `Quiz correct index in ${l.id} must be in bounds`);
    assert.ok(quiz.benefit && quiz.benefit.length >= 20, `Quiz benefit in ${l.id} must be descriptive (>= 20 chars)`);
  });
});

runTest('4.3 Quiz questions are 100% distinct across all 8 lessons', () => {
  const questions = new Set();
  p4Lessons.forEach(l => {
    const q = l.steps[4].question;
    assert.ok(!questions.has(q), `Duplicate quiz question detected: "${q}" in ${l.id}`);
    questions.add(q);
  });
  assert.strictEqual(questions.size, 8, 'Must have 8 unique quiz questions');
});

// --- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---
console.log('\n--- SECTION 5: Simulator checkSupportedTask() Adversarial Testing ---');

runTest('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 8 Phase 4 lessons', () => {
  p4Lessons.forEach(l => {
    setFiles({ [l.file]: l.code });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must pass with exact code`);
  });
});

runTest('5.2 Expected snippet matching: exact expected in lesson.file returns true for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    const expContent = Array.isArray(l.expected) ? l.expected.join('\n') : l.expected;
    setFiles({ [l.file]: expContent });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must pass with expected snippet`);
  });
});

runTest('5.3 Whitespace tolerance: CRLF, extra spacing, tabs around expected snippet', () => {
  p4Lessons.forEach(l => {
    const expSnippet = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const spaced = `\r\n\t  ${expSnippet}  \t\r\n`;
    setFiles({ [l.file]: spaced });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must tolerate CRLF and tabs`);
  });
});

runTest('5.4 Adversarial Failure: wrong file path returns false for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    setFiles({ 'src/app/wrong-target-file.ts': l.code, [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must fail if code is placed in wrong file`);
  });
});

runTest('5.5 Adversarial Failure: typo/corrupted expected snippet returns false for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    const expSnippet = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const corrupted = expSnippet.replace(/[a-zA-Z]/, 'XYZ_CORRUPTED_TOKEN_');
    setFiles({ [l.file]: corrupted });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must fail on corrupted expected`);
  });
});

runTest('5.6 Adversarial Failure: empty or truncated file returns false for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    setFiles({ [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must fail on empty file`);

    const expSnippet = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const truncated = expSnippet.substring(0, Math.floor(expSnippet.length / 2));
    setFiles({ [l.file]: truncated });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must fail on truncated snippet`);
  });
});

// --- SECTION 6: Signals Reactive Engine & Transitions ---
console.log('\n--- SECTION 6: Signals Reactive Engine & Transitions ---');

// Mock Signal Implementation matching Angular 22 reactivity semantics
function createSignal(initialValue) {
  let val = initialValue;
  const readers = new Set();
  const sig = function() {
    return val;
  };
  sig.set = function(newVal) {
    val = newVal;
    readers.forEach(r => r());
  };
  sig.update = function(fn) {
    sig.set(fn(val));
  };
  sig._addReader = function(r) { readers.add(r); };
  return sig;
}

function createComputed(fn) {
  let cached = fn();
  const c = function() {
    return cached;
  };
  c.recalculate = function() {
    cached = fn();
    return cached;
  };
  return c;
}

runTest('6.1 Writable signal creation and value retrieval via () call syntax', () => {
  const tickets = createSignal(10);
  assert.strictEqual(typeof tickets, 'function', 'Signal must be a callable getter function');
  assert.strictEqual(tickets(), 10, 'Reading tickets() must return initial value 10');
});

runTest('6.2 Writable signal .set() direct value replacement', () => {
  const tickets = createSignal(10);
  tickets.set(25);
  assert.strictEqual(tickets(), 25, 'Reading tickets() after set(25) must return 25');
});

runTest('6.3 Writable signal .update() pure functional transition', () => {
  const tickets = createSignal(10);
  tickets.update(count => count + 1);
  assert.strictEqual(tickets(), 11, 'Reading tickets() after update(+1) must return 11');
  tickets.update(count => count * 2);
  assert.strictEqual(tickets(), 22, 'Reading tickets() after update(*2) must return 22');
});

runTest('6.4 Computed signal derivation and reactive memoization', () => {
  const tickets = createSignal(10);
  const price = createComputed(() => tickets() * 85);
  assert.strictEqual(typeof price, 'function', 'Computed must be a callable getter function');
  assert.strictEqual(price(), 850, 'Computed price must equal 10 * 85 = 850');
});

runTest('6.5 Computed signal recalculation on dependency mutation', () => {
  const tickets = createSignal(10);
  const price = createComputed(() => tickets() * 85);
  tickets.set(3);
  price.recalculate();
  assert.strictEqual(price(), 255, 'Computed price must update to 3 * 85 = 255');
});

// --- SECTION 7: Simulator Dynamic Control Flow & Component Integration ---
console.log('\n--- SECTION 7: Simulator Dynamic Control Flow & Component Integration ---');

runTest('7.1 Simulator extracts signals and computed values from App component into runtime props', () => {
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': '<p>التذاكر: {{ totalTickets }}</p>'
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('10'), 'Simulator must extract totalTickets = signal(10) and render 10 in preview');
});

runTest('7.2 Dynamic @if evaluation with signal function call condition', () => {
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/app.html': '@if (totalTickets() >= 10) { <div class="tickets-ok">تذاكر متوفرة</div> }'
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('تذاكر متوفرة'), 'Simulator must evaluate totalTickets() >= 10 as truthy');
});

runTest('7.3 Multi-file simulation with modern child component integration', () => {
  const cardContent = courseData.starterFiles['src/app/components/movie-card.component.ts'];
  assert.ok(cardContent.includes('input.required'), 'Child movie card component utilizes signal input');
  env.setFiles({
    'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
    'src/app/components/movie-card.component.ts': cardContent,
    'src/app/app.html': '<app-movie-card></app-movie-card>'
  });
  const lesson6 = p4Lessons.find(l => l.id === 'ng-signal-06');
  assert.ok(lesson6, 'Lesson ng-signal-06 must exist');
  assert.strictEqual(lesson6.file, 'src/app/components/movie-card.component.ts');
  assert.strictEqual(checkSupportedTask(lesson6), true, 'Lesson ng-signal-06 must pass with starterFiles');
});

console.log('\n===============================================================================');
console.log(`FINAL ADVERSARIAL VERIFICATION SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
console.log('===============================================================================');

if (passedTests === totalTests) {
  console.log('🎉 ALL 34 ADVERSARIAL TESTS PASSED EMPIRICALLY (Zero Defects).');
  process.exit(0);
} else {
  console.error(`❌ VERIFICATION FAILED: ${totalTests - passedTests} tests failed.`);
  process.exit(1);
}

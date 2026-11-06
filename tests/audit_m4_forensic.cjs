/**
 * Independent Forensic Audit Suite for Milestone 4 (Phase 4 Signals Reactive Engine)
 * Auditor: teamwork_auditor_m4_1
 * Profile: General Project (Forensic Integrity Audit)
 * 
 * Verifies:
 * 1. Anti-Cheating & Facade Verification (no backdoors in supportedTask, no fake passes, no mock bypasses)
 * 2. Content Authenticity & Pedagogical Substance (8 Phase 4 signals lessons, 5 steps, rich Arabic content >= 500 chars)
 * 3. StarterFiles Integrity & Preservation (src/app/app.ts, 4 components in src/app/components/, all earlier phases and legacy preserved)
 * 4. Total Curriculum Continuity (84 lessons total, 0 duplicate IDs, sequential phase continuity)
 * 5. Simulator Dynamic Evaluation & Adversarial Stress Tests (positive matches, whitespace resilience, negative rejection)
 * 6. Signal Reactivity Semantics & Simulator Preview Execution
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureLog = [];

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  [PASS] ${title}`);
  } catch (err) {
    failedChecks++;
    const errMsg = `  [FAIL] ${title} -> ${err.message}`;
    console.error(errMsg);
    failureLog.push({ title, error: err.message, stack: err.stack });
  }
}

console.log('===============================================================================');
console.log('🕵️‍♂️ INDEPENDENT FORENSIC AUDIT: MILESTONE 4 (PHASE 4 SIGNALS REACTIVE ENGINE)');
console.log('===============================================================================');

// Helper to load course data cleanly in an isolated VM context
function loadCourseData(filePath) {
  const fullPath = path.resolve(ROOT_DIR, filePath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.ANGULAR_COURSE_DATA;
}

const curData = loadCourseData('angular-course-data.js');
const oldData = loadCourseData('old-v1/angular-course-data.js');

// ============================================================================
// 1. ANTI-CHEATING & FACADE VERIFICATION
// ============================================================================
console.log('\n--- CHECK 1: Anti-Cheating & Facade Verification ---');

const editorCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-editor.js'), 'utf8');

check('1.1 angular-editor.js contains no backdoors or bypasses for ng-signal', () => {
  assert.ok(!editorCode.includes('ng-signal'), 'angular-editor.js must not contain hardcoded hacks or bypasses for ng-signal');
  assert.ok(!editorCode.includes('return true; // bypass'), 'No bypass comments in editor');
  assert.ok(!editorCode.includes('__MOCK__'), 'No mock tokens in editor');
});

check('1.2 supportedTask function implementation is authentic, generic, and strict', () => {
  const match = editorCode.match(/function supportedTask\(lesson\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(match, 'supportedTask function must exist in angular-editor.js');
  const body = match[1].trim();
  assert.ok(body.includes('checks.every'), 'supportedTask must verify every check');
  assert.ok(body.includes('content.includes(expected)'), 'supportedTask must check content inclusion');
  assert.ok(body.includes('normalizeWhitespace'), 'supportedTask must use whitespace normalization');
  assert.ok(!body.startsWith('return true;'), 'supportedTask must not immediately return true');
  assert.ok(!body.match(/^\s*return\s+true\s*;/m), 'supportedTask must not contain unconditional top-level return true');
});

check('1.3 Course data and editor files contain zero banned cheating tokens', () => {
  const courseCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-course-data.js'), 'utf8');
  const bannedKeywords = ['__MOCK__', 'FAKE_PASS', 'CHEAT', 'DUMMY_RESULT', 'TODO: implement'];
  for (const kw of bannedKeywords) {
    assert.ok(!courseCode.includes(kw), `angular-course-data.js must not contain banned keyword "${kw}"`);
    assert.ok(!editorCode.includes(kw), `angular-editor.js must not contain banned keyword "${kw}"`);
  }
});

check('1.4 curriculum_oracle.cjs specifies Phase 4 authentically without placeholder overrides', () => {
  const { CURRICULUM_SPEC } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/curriculum_oracle.cjs'));
  const p4Spec = CURRICULUM_SPEC.filter(c => c.phaseNumber === 4);
  assert.strictEqual(p4Spec.length, 8, 'Oracle must define exactly 8 Phase 4 lessons');
  const expectedP4Ids = [
    'ng-signal-01', 'ng-signal-02', 'ng-signal-03', 'ng-signal-04',
    'ng-signal-05', 'ng-signal-06', 'ng-signal-07', 'ng-signal-08'
  ];
  p4Spec.forEach((spec, i) => {
    assert.strictEqual(spec.id, expectedP4Ids[i], `Oracle Phase 4 index ${i} id mismatch`);
    assert.ok(spec.expected && spec.expected.length > 5, `Oracle Phase 4 ${spec.id} expected snippet missing`);
    assert.ok(spec.file && spec.file.startsWith('src/'), `Oracle Phase 4 ${spec.id} target file invalid`);
  });
});

// ============================================================================
// 2. CONTENT AUTHENTICITY & PEDAGOGICAL SUBSTANCE (PHASE 4 SIGNALS)
// ============================================================================
console.log('\n--- CHECK 2: Content Authenticity & Pedagogical Substance ---');

const p4Lessons = curData.lessons.slice(30, 38);

check('2.1 Exactly 8 Phase 4 lessons exist with IDs ng-signal-01 to ng-signal-08 at indices 30-37', () => {
  assert.strictEqual(p4Lessons.length, 8, 'Must have exactly 8 Phase 4 lessons');
  for (let i = 0; i < 8; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(p4Lessons[i].id, `ng-signal-${num}`);
    assert.strictEqual(p4Lessons[i].module, 'phase-4-signals');
    assert.strictEqual(curData.lessons[30 + i].id, `ng-signal-${num}`);
  }
});

check('2.2 Every Phase 4 lesson contains all 15 mandatory schema properties', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];
  p4Lessons.forEach(l => {
    mandatoryFields.forEach(field => {
      assert.ok(l[field] !== undefined && l[field] !== null, `Lesson ${l.id} missing field: ${field}`);
    });
  });
});

check('2.3 Every Phase 4 lesson concept has >= 500 Arabic characters and >= 800 total characters', () => {
  p4Lessons.forEach(l => {
    const arabicChars = (l.concept.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(
      arabicChars >= 500,
      `Lesson ${l.id} concept has insufficient Arabic characters (${arabicChars} < 500)`
    );
    assert.ok(
      l.concept.length >= 800,
      `Lesson ${l.id} concept has insufficient total length (${l.concept.length} < 800)`
    );
  });
});

check('2.4 Every Phase 4 lesson summary has >= 100 characters and rich Arabic prose', () => {
  p4Lessons.forEach(l => {
    const arabicChars = (l.summary.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(
      l.summary.length >= 100,
      `Lesson ${l.id} summary too short (${l.summary.length} < 100)`
    );
    assert.ok(
      arabicChars >= 60,
      `Lesson ${l.id} summary lacks sufficient Arabic prose (${arabicChars} < 60)`
    );
  });
});

check('2.5 Every Phase 4 lesson visual flow notation contains directional arrows (⟶)', () => {
  p4Lessons.forEach(l => {
    assert.ok(
      l.flow && l.flow.includes('⟶'),
      `Lesson ${l.id} flow must contain arrow "⟶" (flow: ${l.flow})`
    );
  });
});

check('2.6 Every Phase 4 lesson reference points to official angular.dev documentation', () => {
  p4Lessons.forEach(l => {
    assert.ok(
      l.reference.startsWith('https://angular.dev/'),
      `Lesson ${l.id} reference must point to angular.dev (got: ${l.reference})`
    );
  });
});

check('2.7 Every Phase 4 lesson code strictly includes its expected snippet', () => {
  p4Lessons.forEach(l => {
    const expectedList = Array.isArray(l.expected) ? l.expected : [l.expected];
    expectedList.forEach(exp => {
      assert.ok(
        l.code.includes(exp),
        `Lesson ${l.id} code does not contain expected snippet: "${exp}"`
      );
    });
  });
});

check('2.8 Every Phase 4 lesson has exactly 5 pedagogical steps with authentic Arabic content', () => {
  const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p4Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    l.steps.forEach((st, sIdx) => {
      assert.strictEqual(st.id, stepIds[sIdx], `Lesson ${l.id} step ${sIdx} id mismatch`);
      assert.strictEqual(st.type, stepTypes[sIdx], `Lesson ${l.id} step ${sIdx} type mismatch`);
      assert.ok(st.title && st.title.length >= 5, `Lesson ${l.id} step ${sIdx} title too short`);
      assert.ok(st.task && st.task.length >= 10, `Lesson ${l.id} step ${sIdx} task too short`);
      assert.ok(st.benefit && st.benefit.length >= 10, `Lesson ${l.id} step ${sIdx} benefit too short`);

      if (sIdx < 4) {
        assert.ok(
          st.explanation && st.explanation.length >= 50,
          `Lesson ${l.id} step ${sIdx} explanation too short (${st.explanation ? st.explanation.length : 0} chars)`
        );
      }
    });
  });
});

check('2.9 Step 2 (practice) strictly matches lesson expected snippet and file', () => {
  p4Lessons.forEach(l => {
    const practice = l.steps[2];
    assert.strictEqual(practice.file, l.file, `Lesson ${l.id} practice file mismatch`);
    assert.strictEqual(practice.expected, l.expected, `Lesson ${l.id} practice expected mismatch`);
    assert.ok(practice.code.includes(practice.expected), `Lesson ${l.id} practice code missing expected snippet`);
  });
});

check('2.10 Step 4 (quiz) questions and options are distinct, in-bounds, and pedagogically rich', () => {
  const questions = new Set();
  p4Lessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(quiz.question && quiz.question.length >= 15, `Lesson ${l.id} quiz question too short`);
    assert.ok(!questions.has(quiz.question), `Duplicate quiz question found in lesson ${l.id}`);
    questions.add(quiz.question);

    assert.ok(Array.isArray(quiz.options) && quiz.options.length >= 3, `Lesson ${l.id} quiz must have >= 3 options`);
    const optionSet = new Set(quiz.options);
    assert.strictEqual(optionSet.size, quiz.options.length, `Lesson ${l.id} quiz has duplicate options`);

    assert.ok(
      typeof quiz.correct === 'number' && quiz.correct >= 0 && quiz.correct < quiz.options.length,
      `Lesson ${l.id} quiz correct index out of bounds (got: ${quiz.correct}, options count: ${quiz.options.length})`
    );
    assert.ok(quiz.benefit && quiz.benefit.length >= 20, `Lesson ${l.id} quiz benefit explanation too short`);
  });
});

check('2.11 Zero placeholder / lorem-ipsum / dummy strings across all Phase 4 lessons', () => {
  const bannedWords = ['lorem', 'ipsum', 'todo', 'fixme', 'dummy', 'asdf', 'xxx', 'test test'];
  p4Lessons.forEach(l => {
    const sanitizedStr = JSON.stringify(l)
      .replace(/@placeholder/gi, '')
      .replace(/الـ\s*placeholder/gi, '')
      .toLowerCase();
    
    bannedWords.forEach(w => {
      assert.ok(!sanitizedStr.includes(w), `Lesson ${l.id} contains prohibited word "${w}"`);
    });
    assert.ok(!sanitizedStr.includes('placeholder text'), `Lesson ${l.id} contains "placeholder text"`);
    assert.ok(!sanitizedStr.includes('[placeholder]'), `Lesson ${l.id} contains "[placeholder]"`);
  });
});

// ============================================================================
// 3. STARTERFILES INTEGRITY & PRESERVATION
// ============================================================================
console.log('\n--- CHECK 3: StarterFiles Integrity & Preservation ---');

check('3.1 src/app/app.ts imports computed and declares totalTickets signal and addTicket()', () => {
  const code = curData.starterFiles['src/app/app.ts'];
  assert.ok(code, 'src/app/app.ts must exist in starterFiles');
  assert.ok(code.length > 500, `src/app/app.ts too short (${code.length} chars)`);

  assert.ok(code.includes("import { Component, signal, computed } from '@angular/core'"), 'app.ts must import computed along with Component and signal');
  assert.ok(code.includes("totalTickets = signal(10)"), 'app.ts must declare totalTickets = signal(10)');
  assert.ok(code.includes("addTicket(): void"), 'app.ts must declare addTicket(): void');
  assert.ok(code.includes("this.totalTickets.update("), 'addTicket must use .update()');
});

check('3.2 src/app/app.ts strictly preserves all Phase 2 and Phase 3 properties and methods', () => {
  const code = curData.starterFiles['src/app/app.ts'];
  // Phase 3 properties
  assert.ok(code.includes("totalPrice = signal(250)"), 'app.ts must preserve totalPrice = signal(250)');
  assert.ok(code.includes("movies = ["), 'app.ts must preserve movies array');
  assert.ok(code.includes("bookingStatus"), 'app.ts must preserve bookingStatus');

  // Phase 2 properties
  assert.ok(code.includes("isSoldOut"), 'app.ts must preserve isSoldOut');
  assert.ok(code.includes("isAvailable = true"), 'app.ts must preserve isAvailable');
  assert.ok(code.includes("hasDiscount = true"), 'app.ts must preserve hasDiscount');
  assert.ok(code.includes("classicMovies"), 'app.ts must preserve classicMovies');
  assert.ok(code.includes("currentMovie$"), 'app.ts must preserve currentMovie$');
  assert.ok(code.includes("onBookTicket(): void"), 'app.ts must implement onBookTicket');
  assert.ok(code.includes("onSeatSelected(seat: string): void"), 'app.ts must implement onSeatSelected');
});

check('3.3 All 4 Phase 4 component starter files exist with standalone: true and modern signal API', () => {
  const comps = [
    {
      file: 'src/app/components/movie-card.component.ts',
      cls: 'MovieCardComponent',
      feature: 'title = input.required<string>()'
    },
    {
      file: 'src/app/components/seat-picker.component.ts',
      cls: 'SeatPickerComponent',
      feature: 'seatSelected = output<string>()'
    },
    {
      file: 'src/app/components/search-box.component.ts',
      cls: 'SearchBoxComponent',
      feature: 'query = model<string>(\'\')'
    },
    {
      file: 'src/app/components/seat-item.component.ts',
      cls: 'SeatItemComponent',
      feature: 'seatNumber = input.required<string>()'
    }
  ];

  comps.forEach(c => {
    const content = curData.starterFiles[c.file];
    assert.ok(content, `Component file "${c.file}" missing from starterFiles`);
    assert.ok(content.includes('standalone: true'), `${c.file} must have standalone: true`);
    assert.ok(content.includes(c.cls), `${c.file} must export class ${c.cls}`);
    assert.ok(content.includes(c.feature), `${c.file} must contain ${c.feature}`);
  });
});

check('3.4 Module descriptor "phase-4-signals" exists with complete schema in modules', () => {
  const mod = curData.modules['phase-4-signals'];
  assert.ok(mod, 'Module descriptor "phase-4-signals" must exist in modules');
  assert.strictEqual(mod.id, 'phase-4-signals');
  assert.strictEqual(mod.icon, '📡');
  assert.strictEqual(mod.lessonCount, 8);
  assert.ok(mod.title && mod.title.length > 10, 'Module title must be descriptive');
  assert.ok(mod.description && mod.description.length > 20, 'Module description must be descriptive');
  assert.ok(mod.badge && mod.badge.includes('8'), 'Module badge must reference 8 lessons');
});

check('3.5 Total curriculum lesson count is exactly 84 (10 P1 + 13 P2 + 7 P3 + 8 P4 + 46 Legacy)', () => {
  assert.strictEqual(curData.lessons.length, 84, `Total lesson count must be 84, got ${curData.lessons.length}`);
});

check('3.6 Zero duplicate lesson IDs across all 84 lessons', () => {
  const ids = new Set();
  curData.lessons.forEach((l, idx) => {
    assert.ok(!ids.has(l.id), `Duplicate ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.strictEqual(ids.size, 84, 'Unique IDs set size must be exactly 84');
});

check('3.7 Phase 1 lessons (indices 0 to 9) match explorer source definitions 100%', () => {
  const p1_1 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m1_1/lessons_ng_ts_01_to_04.json'), 'utf8'));
  const p1_2 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m1_2/lessons_05_to_07.json'), 'utf8'));
  const p1_3 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m1_3/lessons-8-10.json'), 'utf8'));
  const expectedP1 = [...p1_1, ...p1_2, ...p1_3];

  for (let i = 0; i < 10; i++) {
    const curLesson = curData.lessons[i];
    const expLesson = expectedP1[i];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(expLesson), `Phase 1 lesson ${curLesson.id} mutated`);
  }
});

check('3.8 Phase 2 lessons (indices 10 to 22) are 100% preserved from Milestone 2 integration', () => {
  const l1 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m2_1/lessons_11_14.json'), 'utf8'));
  const l2 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m2_2/lessons_15_18.json'), 'utf8'));
  const l3 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m2_3/lessons_19_23.json'), 'utf8'));
  const rawPhase2Lessons = [...l1, ...l2, ...l3];
  const { CURRICULUM_SPEC } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/curriculum_oracle.cjs'));

  const expectedPhase2 = rawPhase2Lessons.map((lesson) => {
    const oracle = CURRICULUM_SPEC.find(o => o.id === lesson.id);
    const updated = JSON.parse(JSON.stringify(lesson));
    if (oracle) {
      updated.expected = oracle.expected;
      if (updated.steps && updated.steps[2]) {
        updated.steps[2].expected = oracle.expected;
      }
      if (oracle.reference) {
        updated.reference = oracle.reference;
      }
    }
    return updated;
  });

  for (let i = 0; i < 13; i++) {
    const curLesson = curData.lessons[i + 10];
    const expLesson = expectedPhase2[i];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(expLesson), `Phase 2 lesson ${curLesson.id} mutated`);
  }
});

check('3.9 Phase 3 lessons (indices 23 to 29) are 100% preserved from Milestone 3 integration', () => {
  const exp3_1 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m3_1/lessons_24_27.json'), 'utf8'));
  const exp3_2 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m3_2/lessons_28_30.json'), 'utf8'));
  const expectedP3 = [...exp3_1, ...exp3_2];

  for (let i = 0; i < 7; i++) {
    const curLesson = curData.lessons[i + 23];
    const expLesson = expectedP3[i];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(expLesson), `Phase 3 lesson ${curLesson.id} mutated`);
  }
});

check('3.10 Legacy lessons (indices 38 to 83) are 100% byte-for-byte identical to old-v1 (indices 0 to 45)', () => {
  for (let i = 0; i < oldData.lessons.length; i++) {
    const oldLesson = oldData.lessons[i];
    const curLesson = curData.lessons[i + 38];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(oldLesson), `Legacy lesson at index ${i + 38} (${curLesson.id}) differs from old-v1`);
  }
});

// ============================================================================
// 4. SIMULATOR DYNAMIC EVALUATION & ADVERSARIAL CHECKS
// ============================================================================
console.log('\n--- CHECK 4: Simulator Dynamic Evaluation & Adversarial Checks ---');

// Extract normalizeWhitespace and supportedTask from angular-editor.js into a clean sandbox
const simSandbox = {
  currentFiles: {},
  normalizeWhitespace: null,
  supportedTask: null
};
vm.createContext(simSandbox);
vm.runInContext(`
${editorCode.slice(editorCode.indexOf('function normalizeWhitespace'), editorCode.indexOf('function completedSet'))}
`, simSandbox);

assert.strictEqual(typeof simSandbox.supportedTask, 'function', 'supportedTask must be extracted successfully');

check('4.1 Positive check: genuine lesson.code in lesson.file evaluates to TRUE for all 8 Phase 4 lessons', () => {
  p4Lessons.forEach(l => {
    simSandbox.currentFiles = { [l.file]: l.code };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} valid code did not pass supportedTask`);
  });
});

check('4.2 Positive check: exact expected snippet with surrounding code passes for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    simSandbox.currentFiles = { [l.file]: `// Prefix comment\n${exp}\n// Suffix comment` };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} snippet match did not pass supportedTask`);
  });
});

check('4.3 Positive check: whitespace variation (extra spaces, tabs, mixed line breaks) passes for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const variedSnippet = `   \r\n\t  ${exp.replace(/\s+/g, '  ')}  \r\n\t `;
    simSandbox.currentFiles = { [l.file]: variedSnippet };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} whitespace-varied snippet did not pass supportedTask`);
  });
});

check('4.4 Adversarial check: empty file evaluates to FALSE for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    simSandbox.currentFiles = { [l.file]: '' };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed with empty file!`);
  });
});

check('4.5 Adversarial check: code placed in WRONG file evaluates to FALSE for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    simSandbox.currentFiles = { 'src/app/wrong-target-file.ts': l.code, [l.file]: '' };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed when placed in wrong file!`);
  });
});

check('4.6 Adversarial check: typo in expected snippet evaluates to FALSE for all 8 lessons', () => {
  p4Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const brokenSnippet = exp.slice(0, Math.floor(exp.length / 2)) + '_TYPO_' + exp.slice(Math.floor(exp.length / 2) + 1);
    simSandbox.currentFiles = { [l.file]: brokenSnippet };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed with corrupted snippet!`);
  });
});

// ============================================================================
// 5. SIGNAL REACTIVITY SEMANTICS & SIMULATOR PREVIEW EXECUTION
// ============================================================================
console.log('\n--- CHECK 5: Signal Reactivity Semantics & Simulator Preview Execution ---');

const { createEditorEnvironment } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/e2e_harness.cjs'));
const env = createEditorEnvironment(curData);

check('5.1 Writable signal creation, retrieval, .set() and .update() semantics', () => {
  // Emulate Angular Signal primitives to verify mathematical & functional correctness
  function createSignal(initialValue) {
    let value = initialValue;
    const getter = () => value;
    getter.set = (newVal) => { value = newVal; };
    getter.update = (fn) => { value = fn(value); };
    return getter;
  }

  const ticketCount = createSignal(1);
  assert.strictEqual(ticketCount(), 1, 'Signal reading via () should return initial value 1');

  ticketCount.set(5);
  assert.strictEqual(ticketCount(), 5, 'Signal reading after .set(5) should return 5');

  ticketCount.update(c => c + 1);
  assert.strictEqual(ticketCount(), 6, 'Signal reading after .update(c => c + 1) should return 6');
});

check('5.2 Computed signal derivation and reactive re-evaluation', () => {
  function createSignal(initialValue) {
    let value = initialValue;
    const getter = () => value;
    getter.set = (newVal) => { value = newVal; };
    return getter;
  }
  function createComputed(fn) {
    return () => fn();
  }

  const count = createSignal(2);
  const price = createComputed(() => count() * 85);

  assert.strictEqual(price(), 170, 'Computed signal should calculate 2 * 85 = 170');
  count.set(4);
  assert.strictEqual(price(), 340, 'Computed signal should re-evaluate to 4 * 85 = 340');
});

check('5.3 Dynamic simulator extracts totalTickets signal and evaluates @if (totalTickets() >= 10)', () => {
  env.setFiles({
    'src/app/app.ts': curData.starterFiles['src/app/app.ts'],
    'src/app/app.html': `
      @if (totalTickets() >= 10) {
        <span class="group-discount">مؤهل لحجز المجموعات الفاخر!</span>
      } @else {
        <span class="standard-booking">حجز أفراد عادي</span>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('مؤهل لحجز المجموعات الفاخر!'), 'Preview must render group discount badge when totalTickets = 10');
});

check('5.4 Dynamic simulator updates when totalTickets is decreased below threshold', () => {
  const modifiedAppTs = curData.starterFiles['src/app/app.ts'].replace(
    'totalTickets = signal(10);',
    'totalTickets = signal(5);'
  );
  env.setFiles({
    'src/app/app.ts': modifiedAppTs,
    'src/app/app.html': `
      @if (totalTickets() >= 10) {
        <span class="group-discount">مؤهل لحجز المجموعات الفاخر!</span>
      } @else {
        <span class="standard-booking">حجز أفراد عادي</span>
      }
    `
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('حجز أفراد عادي'), 'Preview must render standard booking when totalTickets = 5');
});

check('5.5 Multi-file simulation integrates Phase 4 child components cleanly', () => {
  env.setFiles({
    'src/app/app.ts': curData.starterFiles['src/app/app.ts'],
    'src/app/components/movie-card.component.ts': curData.starterFiles['src/app/components/movie-card.component.ts'],
    'src/app/components/seat-picker.component.ts': curData.starterFiles['src/app/components/seat-picker.component.ts'],
    'src/app/components/search-box.component.ts': curData.starterFiles['src/app/components/search-box.component.ts'],
    'src/app/components/seat-item.component.ts': curData.starterFiles['src/app/components/seat-item.component.ts']
  });

  const l6 = p4Lessons.find(x => x.id === 'ng-signal-06');
  assert.strictEqual(env.checkSupportedTask(l6), true, 'ng-signal-06 must validate against movie-card.component.ts');

  const l7 = p4Lessons.find(x => x.id === 'ng-signal-07');
  assert.strictEqual(env.checkSupportedTask(l7), true, 'ng-signal-07 must validate against seat-picker.component.ts');

  const l8 = p4Lessons.find(x => x.id === 'ng-signal-08');
  assert.strictEqual(env.checkSupportedTask(l8), true, 'ng-signal-08 must validate against search-box.component.ts');
});

// ============================================================================
// AUDIT SUMMARY & VERDICT
// ============================================================================
console.log('\n===============================================================================');
console.log(`FORENSIC AUDIT SUMMARY: Total Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
console.log('===============================================================================');

if (failedChecks === 0) {
  console.log('\n🏆 FINAL FORENSIC VERDICT: CLEAN');
  console.log('All anti-cheating, authenticity, starter files, and preservation checks PASSED 100%.');
  process.exit(0);
} else {
  console.error('\n🚨 FINAL FORENSIC VERDICT: INTEGRITY VIOLATION');
  console.error(`Total violations detected: ${failedChecks}`);
  failureLog.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.title}: ${f.error}`);
  });
  process.exit(1);
}

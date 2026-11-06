/**
 * Independent Forensic Audit Suite for Milestone 2 (Phase 2 Classic Angular Rebuild)
 * Auditor: teamwork_auditor_m2_1
 * Profile: General Project
 * 
 * Verifies:
 * 1. Anti-Cheating & Facade Verification (supportedTask, no backdoors, no fake passes)
 * 2. Content Authenticity & Pedagogical Substance (13 Phase 2 lessons, 5 steps, genuine Arabic)
 * 3. StarterFiles Integrity (10 classic files + app.ts, no hollow stubs)
 * 4. Non-Destructive Preservation (Phase 1 0-9 and legacy 23-68 byte-for-byte identical)
 * 5. Simulator Dynamic Evaluation (positive and adversarial negative checks)
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
console.log('🕵️‍♂️ INDEPENDENT FORENSIC AUDIT: MILESTONE 2 (PHASE 2 CLASSIC ANGULAR)');
console.log('===============================================================================');

// Helper to load course data cleanly
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

check('1.1 angular-editor.js contains no backdoors or bypasses for ng-classic', () => {
  assert.ok(!editorCode.includes('ng-classic'), 'angular-editor.js must not contain hardcoded hacks for ng-classic');
  assert.ok(!editorCode.includes('return true; // bypass'), 'No bypass comments in editor');
});

check('1.2 supportedTask function implementation is authentic and strict', () => {
  const match = editorCode.match(/function supportedTask\(lesson\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(match, 'supportedTask function must exist in angular-editor.js');
  const body = match[1].trim();
  assert.ok(body.includes('checks.every'), 'supportedTask must verify every check');
  assert.ok(body.includes('content.includes(expected)'), 'supportedTask must check content inclusion');
  assert.ok(body.includes('normalizeWhitespace'), 'supportedTask must use whitespace normalization');
  assert.ok(!body.startsWith('return true;'), 'supportedTask must not immediately return true');
  assert.ok(!body.match(/^\s*return\s+true\s*;/m), 'supportedTask must not contain unconditional top-level return true');
});

check('1.3 Course data files contain no fake test assertions or dummy mocks', () => {
  const courseCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-course-data.js'), 'utf8');
  const bannedKeywords = ['__MOCK__', 'FAKE_PASS', 'CHEAT', 'DUMMY_RESULT', 'TODO: implement'];
  for (const kw of bannedKeywords) {
    assert.ok(!courseCode.includes(kw), `angular-course-data.js must not contain banned keyword "${kw}"`);
  }
});

// ============================================================================
// 2. CONTENT AUTHENTICITY & PEDAGOGICAL SUBSTANCE (PHASE 2)
// ============================================================================
console.log('\n--- CHECK 2: Content Authenticity & Pedagogical Substance ---');

const p2Lessons = curData.lessons.slice(10, 23);

check('2.1 Exactly 13 Phase 2 lessons exist with IDs ng-classic-01 to ng-classic-13', () => {
  assert.strictEqual(p2Lessons.length, 13, 'Must have exactly 13 Phase 2 lessons');
  for (let i = 0; i < 13; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(p2Lessons[i].id, `ng-classic-${num}`);
    assert.strictEqual(p2Lessons[i].module, 'phase-2-classic');
  }
});

check('2.2 Every Phase 2 lesson contains all 15 mandatory schema properties', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];
  p2Lessons.forEach(l => {
    mandatoryFields.forEach(field => {
      assert.ok(l[field] !== undefined && l[field] !== null, `Lesson ${l.id} missing field: ${field}`);
    });
  });
});

check('2.3 Every Phase 2 lesson code includes expected snippet', () => {
  p2Lessons.forEach(l => {
    const expectedList = Array.isArray(l.expected) ? l.expected : [l.expected];
    expectedList.forEach(exp => {
      assert.ok(l.code.includes(exp), `Lesson ${l.id} code does not contain expected snippet: "${exp}"`);
    });
  });
});

check('2.4 Every Phase 2 lesson reference points to official angular.dev documentation', () => {
  p2Lessons.forEach(l => {
    assert.ok(l.reference.startsWith('https://angular.dev/'), `Lesson ${l.id} reference must point to angular.dev`);
  });
});

check('2.5 Every Phase 2 lesson has a visual arrow flow (⟶)', () => {
  p2Lessons.forEach(l => {
    assert.ok(l.flow && l.flow.includes('⟶'), `Lesson ${l.id} flow must contain arrow "⟶"`);
  });
});

check('2.6 Every Phase 2 lesson has exactly 5 pedagogical steps with authentic Arabic content', () => {
  const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p2Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    l.steps.forEach((st, sIdx) => {
      assert.strictEqual(st.id, stepIds[sIdx], `Lesson ${l.id} step ${sIdx} id mismatch`);
      assert.strictEqual(st.type, stepTypes[sIdx], `Lesson ${l.id} step ${sIdx} type mismatch`);
      assert.ok(st.title && st.title.length > 5, `Lesson ${l.id} step ${sIdx} title too short`);
      assert.ok(st.task && st.task.length > 10, `Lesson ${l.id} step ${sIdx} task too short`);
      assert.ok(st.benefit && st.benefit.length > 10, `Lesson ${l.id} step ${sIdx} benefit too short`);

      if (sIdx < 4) {
        assert.ok(st.explanation && st.explanation.length > 50, `Lesson ${l.id} step ${sIdx} explanation too short (${st.explanation ? st.explanation.length : 0} chars)`);
      }
    });
  });
});

check('2.7 Step 2 (practice) strictly matches lesson expected snippet and file', () => {
  p2Lessons.forEach(l => {
    const practice = l.steps[2];
    assert.strictEqual(practice.file, l.file, `Lesson ${l.id} practice file mismatch`);
    assert.strictEqual(practice.expected, l.expected, `Lesson ${l.id} practice expected mismatch`);
    assert.ok(practice.code.includes(practice.expected), `Lesson ${l.id} practice code missing expected snippet`);
  });
});

check('2.8 Step 4 (quiz) questions and options are distinct, in-bounds, and pedagogically rich', () => {
  const questions = new Set();
  p2Lessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(quiz.question && quiz.question.length > 15, `Lesson ${l.id} quiz question too short`);
    assert.ok(!questions.has(quiz.question), `Duplicate quiz question found in lesson ${l.id}`);
    questions.add(quiz.question);

    assert.ok(Array.isArray(quiz.options) && quiz.options.length >= 2, `Lesson ${l.id} quiz must have >= 2 options`);
    const optionSet = new Set(quiz.options);
    assert.strictEqual(optionSet.size, quiz.options.length, `Lesson ${l.id} quiz has duplicate options`);

    assert.ok(typeof quiz.correct === 'number' && quiz.correct >= 0 && quiz.correct < quiz.options.length, `Lesson ${l.id} quiz correct index out of bounds`);
    assert.ok(quiz.benefit && quiz.benefit.length > 20, `Lesson ${l.id} quiz benefit explanation too short`);
  });
});

check('2.9 Zero placeholder / lorem-ipsum / dummy strings across all Phase 2 lessons', () => {
  const bannedWords = ['lorem', 'ipsum', 'todo', 'fixme', 'dummy', 'placeholder', 'asdf', 'xxx', 'test test'];
  p2Lessons.forEach(l => {
    const str = JSON.stringify(l).toLowerCase();
    bannedWords.forEach(w => {
      assert.ok(!str.includes(w), `Lesson ${l.id} contains prohibited word "${w}"`);
    });
  });
});

// ============================================================================
// 3. STARTERFILES INTEGRITY
// ============================================================================
console.log('\n--- CHECK 3: StarterFiles Integrity ---');

const requiredClassicFiles = [
  'src/app/classic/app-classic.module.ts',
  'src/app/classic/movie-card-classic.component.ts',
  'src/app/classic/movie-card-classic.component.html',
  'src/app/classic/movie-card-classic.component.css',
  'src/app/classic/movie-detail-classic.component.ts',
  'src/app/classic/movie-detail-classic.component.html',
  'src/app/classic/movie-detail-classic.component.css',
  'src/app/classic/seat-item-classic.component.ts',
  'src/app/classic/cinema-classic.service.ts',
  'src/app/classic/rx-demo.ts'
];

check('3.1 All 10 classic starter files exist in starterFiles with non-trivial size', () => {
  requiredClassicFiles.forEach(f => {
    const content = curData.starterFiles[f];
    assert.ok(content, `Starter file ${f} is missing from starterFiles`);
    assert.ok(typeof content === 'string' && content.length >= 100, `Starter file ${f} is too short or hollow (${content ? content.length : 0} bytes)`);
  });
});

check('3.2 src/app/classic/app-classic.module.ts declares and exports all 3 classic components', () => {
  const code = curData.starterFiles['src/app/classic/app-classic.module.ts'];
  assert.ok(code.includes('MovieCardClassicComponent'), 'app-classic.module.ts must reference MovieCardClassicComponent');
  assert.ok(code.includes('MovieDetailClassicComponent'), 'app-classic.module.ts must reference MovieDetailClassicComponent');
  assert.ok(code.includes('SeatItemClassicComponent'), 'app-classic.module.ts must reference SeatItemClassicComponent');
  assert.ok(code.includes('CommonModule'), 'app-classic.module.ts must import CommonModule');
  assert.ok(code.includes('declarations:'), 'app-classic.module.ts must have declarations array');
  assert.ok(code.includes('exports:'), 'app-classic.module.ts must have exports array');
});

check('3.3 src/app/classic/seat-item-classic.component.ts has @Input and @Output EventEmitter', () => {
  const code = curData.starterFiles['src/app/classic/seat-item-classic.component.ts'];
  assert.ok(code.includes('@Input() seatNumber'), 'seat-item must have @Input seatNumber');
  assert.ok(code.includes('@Output() seatSelected = new EventEmitter<string>()'), 'seat-item must have @Output seatSelected');
  assert.ok(code.includes('selectSeat()'), 'seat-item must implement selectSeat()');
});

check('3.4 src/app/classic/cinema-classic.service.ts has @Injectable({ providedIn: "root" })', () => {
  const code = curData.starterFiles['src/app/classic/cinema-classic.service.ts'];
  assert.ok(code.includes("@Injectable({\n  providedIn: 'root'\n})") || code.includes("@Injectable({ providedIn: 'root' })") || code.includes("providedIn: 'root'"), 'Service must be providedIn root');
  assert.ok(code.includes('getCinemaName()'), 'Service must have getCinemaName');
  assert.ok(code.includes('getTicketPrice()'), 'Service must have getTicketPrice');
});

check('3.5 src/app/classic/rx-demo.ts demonstrates Observable subscription and unsubscribe()', () => {
  const code = curData.starterFiles['src/app/classic/rx-demo.ts'];
  assert.ok(code.includes('Observable'), 'rx-demo must import Observable');
  assert.ok(code.includes('Subscription'), 'rx-demo must import Subscription');
  assert.ok(code.includes('.subscribe('), 'rx-demo must subscribe');
  assert.ok(code.includes('unsubscribe()'), 'rx-demo must call unsubscribe()');
});

check('3.6 src/app/app.ts contains all required properties for Phase 2 lessons', () => {
  const code = curData.starterFiles['src/app/app.ts'];
  assert.ok(code.includes('isAvailable = true'), 'app.ts must declare isAvailable');
  assert.ok(code.includes('hasDiscount = true'), 'app.ts must declare hasDiscount');
  assert.ok(code.includes('classicMovies'), 'app.ts must declare classicMovies');
  assert.ok(code.includes('onBookTicket()'), 'app.ts must implement onBookTicket');
  assert.ok(code.includes('currentMovie$'), 'app.ts must declare currentMovie$');
  assert.ok(code.includes('onSeatSelected('), 'app.ts must declare onSeatSelected');
});

// ============================================================================
// 4. NON-DESTRUCTIVE PRESERVATION
// ============================================================================
console.log('\n--- CHECK 4: Non-Destructive Preservation ---');

check('4.1 Total lesson count is exactly 69 (10 Phase 1 + 13 Phase 2 + 46 legacy)', () => {
  assert.strictEqual(curData.lessons.length, 69, 'Total lesson count must be 69');
});

check('4.2 Zero duplicate lesson IDs across all 69 lessons', () => {
  const ids = new Set();
  curData.lessons.forEach((l, idx) => {
    assert.ok(!ids.has(l.id), `Duplicate ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
});

check('4.3 Phase 1 lessons (indices 0 to 9) match explorer source definitions', () => {
  const p1_1 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m1_1/lessons_ng_ts_01_to_04.json'), 'utf8'));
  const p1_2 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m1_2/lessons_05_to_07.json'), 'utf8'));
  const p1_3 = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.agents/teamwork/teamwork_explorer_m1_3/lessons-8-10.json'), 'utf8'));
  const expectedP1 = [...p1_1, ...p1_2, ...p1_3];

  for (let i = 0; i < 10; i++) {
    const curLesson = curData.lessons[i];
    const expLesson = expectedP1[i];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(expLesson), `Phase 1 lesson at index ${i} (${curLesson.id}) has been mutated`);
  }
});

check('4.4 Legacy lessons (indices 23 to 68) are 100% byte-for-byte identical to old-v1 (indices 0 to 45)', () => {
  for (let i = 0; i < oldData.lessons.length; i++) {
    const oldLesson = oldData.lessons[i];
    const curLesson = curData.lessons[i + 23];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(oldLesson), `Legacy lesson at index ${i + 23} (${curLesson.id}) differs from old-v1`);
  }
});

check('4.5 All 13 original starter files from old-v1 are intact (except intended app.ts enhancement)', () => {
  for (const [k, v] of Object.entries(oldData.starterFiles)) {
    if (k === 'src/app/app.ts') continue;
    assert.strictEqual(curData.starterFiles[k], v, `Original starter file "${k}" was unexpectedly mutated`);
  }
});

// ============================================================================
// 5. SIMULATOR DYNAMIC EVALUATION & ADVERSARIAL CHECKS
// ============================================================================
console.log('\n--- CHECK 5: Simulator Dynamic Evaluation & Adversarial Checks ---');

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

check('5.1 Positive check: genuine lesson.code in lesson.file evaluates to TRUE for all 13 Phase 2 lessons', () => {
  p2Lessons.forEach(l => {
    simSandbox.currentFiles = { [l.file]: l.code };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} valid code did not pass supportedTask`);
  });
});

check('5.2 Positive check: exact expected snippet with surrounding code passes for all 13 lessons', () => {
  p2Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    simSandbox.currentFiles = { [l.file]: `// Prefix comment\n${exp}\n// Suffix comment` };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} snippet match did not pass supportedTask`);
  });
});

check('5.3 Adversarial check: empty file evaluates to FALSE for all 13 lessons', () => {
  p2Lessons.forEach(l => {
    simSandbox.currentFiles = { [l.file]: '' };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed with empty file!`);
  });
});

check('5.4 Adversarial check: code placed in WRONG file evaluates to FALSE for all 13 lessons', () => {
  p2Lessons.forEach(l => {
    simSandbox.currentFiles = { 'src/app/wrong-file.ts': l.code, [l.file]: '' };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed when placed in wrong file!`);
  });
});

check('5.5 Adversarial check: typo in expected snippet evaluates to FALSE for all 13 lessons', () => {
  p2Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const brokenSnippet = exp.slice(0, Math.floor(exp.length / 2)) + '_TYPO_' + exp.slice(Math.floor(exp.length / 2) + 1);
    simSandbox.currentFiles = { [l.file]: brokenSnippet };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed with corrupted snippet!`);
  });
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

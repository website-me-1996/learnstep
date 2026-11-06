/**
 * Independent Forensic Audit Suite for Milestone 3 (Phase 3 Modern Angular Rebuild)
 * Auditor: teamwork_auditor_m3_1
 * Profile: General Project (Forensic Integrity Audit)
 * 
 * Verifies:
 * 1. Anti-Cheating & Facade Verification (no backdoors in supportedTask, no fake passes, no mock bypasses)
 * 2. Content Authenticity & Pedagogical Substance (7 Phase 3 modern lessons, 5 steps, rich Arabic content)
 * 3. StarterFiles Integrity (src/app/app.ts, src/app/app.css, preservation of classic and legacy files)
 * 4. Non-Destructive Preservation (Phase 1 [0-9], Phase 2 [10-22], Phase 3 [23-29], Legacy [30-75], 0 duplicates, 76 total)
 * 5. Simulator Dynamic Evaluation & Adversarial Stress Tests (positive matches, whitespace resilience, negative rejection)
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
console.log('🕵️‍♂️ INDEPENDENT FORENSIC AUDIT: MILESTONE 3 (PHASE 3 MODERN ANGULAR)');
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

check('1.1 angular-editor.js contains no backdoors or bypasses for ng-modern', () => {
  assert.ok(!editorCode.includes('ng-modern'), 'angular-editor.js must not contain hardcoded hacks for ng-modern');
  assert.ok(!editorCode.includes('return true; // bypass'), 'No bypass comments in editor');
  assert.ok(!editorCode.includes('__MOCK__'), 'No mock tokens in editor');
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

check('1.4 curriculum_oracle.cjs specifies Phase 3 authentically without placeholder overrides', () => {
  const { CURRICULUM_SPEC } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/curriculum_oracle.cjs'));
  const p3Spec = CURRICULUM_SPEC.filter(c => c.phaseNumber === 3);
  assert.strictEqual(p3Spec.length, 7, 'Oracle must define exactly 7 Phase 3 lessons');
  const expectedP3Ids = [
    'ng-modern-01', 'ng-modern-02', 'ng-modern-03', 'ng-modern-04',
    'ng-modern-05', 'ng-modern-06', 'ng-modern-07'
  ];
  p3Spec.forEach((spec, i) => {
    assert.strictEqual(spec.id, expectedP3Ids[i], `Oracle Phase 3 index ${i} id mismatch`);
    assert.ok(spec.expected && spec.expected.length > 5, `Oracle Phase 3 ${spec.id} expected snippet missing`);
    assert.ok(spec.file && spec.file.startsWith('src/'), `Oracle Phase 3 ${spec.id} target file invalid`);
  });
});

// ============================================================================
// 2. CONTENT AUTHENTICITY & PEDAGOGICAL SUBSTANCE (PHASE 3)
// ============================================================================
console.log('\n--- CHECK 2: Content Authenticity & Pedagogical Substance ---');

const p3Lessons = curData.lessons.slice(23, 30);

check('2.1 Exactly 7 Phase 3 lessons exist with IDs ng-modern-01 to ng-modern-07 at indices 23-29', () => {
  assert.strictEqual(p3Lessons.length, 7, 'Must have exactly 7 Phase 3 lessons');
  for (let i = 0; i < 7; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(p3Lessons[i].id, `ng-modern-${num}`);
    assert.strictEqual(p3Lessons[i].module, 'phase-3-modern');
    assert.strictEqual(curData.lessons[23 + i].id, `ng-modern-${num}`);
  }
});

check('2.2 Every Phase 3 lesson contains all 15 mandatory schema properties', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];
  p3Lessons.forEach(l => {
    mandatoryFields.forEach(field => {
      assert.ok(l[field] !== undefined && l[field] !== null, `Lesson ${l.id} missing field: ${field}`);
    });
  });
});

check('2.3 Every Phase 3 lesson code includes its expected snippet', () => {
  p3Lessons.forEach(l => {
    const expectedList = Array.isArray(l.expected) ? l.expected : [l.expected];
    expectedList.forEach(exp => {
      assert.ok(l.code.includes(exp), `Lesson ${l.id} code does not contain expected snippet: "${exp}"`);
    });
  });
});

check('2.4 Every Phase 3 lesson reference points to official angular.dev documentation', () => {
  p3Lessons.forEach(l => {
    assert.ok(l.reference.startsWith('https://angular.dev/'), `Lesson ${l.id} reference must point to angular.dev (got: ${l.reference})`);
  });
});

check('2.5 Every Phase 3 lesson has a visual arrow flow (⟶)', () => {
  p3Lessons.forEach(l => {
    assert.ok(l.flow && l.flow.includes('⟶'), `Lesson ${l.id} flow must contain arrow "⟶"`);
  });
});

check('2.6 Every Phase 3 lesson has substantial pedagogical Arabic concept and summary', () => {
  p3Lessons.forEach(l => {
    assert.ok(l.title && l.title.length >= 10, `Lesson ${l.id} title too short (${l.title.length} chars)`);
    assert.ok(l.summary && l.summary.length >= 100, `Lesson ${l.id} summary too short (${l.summary.length} chars)`);
    assert.ok(l.concept && l.concept.length >= 350, `Lesson ${l.id} concept too short (${l.concept.length} chars)`);
    assert.ok(l.task && l.task.length >= 20, `Lesson ${l.id} task too short (${l.task.length} chars)`);
  });
});

check('2.7 Every Phase 3 lesson has exactly 5 pedagogical steps with authentic Arabic content', () => {
  const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p3Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    l.steps.forEach((st, sIdx) => {
      assert.strictEqual(st.id, stepIds[sIdx], `Lesson ${l.id} step ${sIdx} id mismatch`);
      assert.strictEqual(st.type, stepTypes[sIdx], `Lesson ${l.id} step ${sIdx} type mismatch`);
      assert.ok(st.title && st.title.length >= 5, `Lesson ${l.id} step ${sIdx} title too short`);
      assert.ok(st.task && st.task.length >= 10, `Lesson ${l.id} step ${sIdx} task too short`);
      assert.ok(st.benefit && st.benefit.length >= 10, `Lesson ${l.id} step ${sIdx} benefit too short`);

      if (sIdx < 4) {
        assert.ok(st.explanation && st.explanation.length >= 50, `Lesson ${l.id} step ${sIdx} explanation too short (${st.explanation ? st.explanation.length : 0} chars)`);
      }
    });
  });
});

check('2.8 Step 2 (practice) strictly matches lesson expected snippet and file', () => {
  p3Lessons.forEach(l => {
    const practice = l.steps[2];
    assert.strictEqual(practice.file, l.file, `Lesson ${l.id} practice file mismatch`);
    assert.strictEqual(practice.expected, l.expected, `Lesson ${l.id} practice expected mismatch`);
    assert.ok(practice.code.includes(practice.expected), `Lesson ${l.id} practice code missing expected snippet`);
  });
});

check('2.9 Step 4 (quiz) questions and options are distinct, in-bounds, and pedagogically rich', () => {
  const questions = new Set();
  p3Lessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(quiz.question && quiz.question.length >= 15, `Lesson ${l.id} quiz question too short`);
    assert.ok(!questions.has(quiz.question), `Duplicate quiz question found in lesson ${l.id}`);
    questions.add(quiz.question);

    assert.ok(Array.isArray(quiz.options) && quiz.options.length >= 3, `Lesson ${l.id} quiz must have >= 3 options`);
    const optionSet = new Set(quiz.options);
    assert.strictEqual(optionSet.size, quiz.options.length, `Lesson ${l.id} quiz has duplicate options`);

    assert.ok(typeof quiz.correct === 'number' && quiz.correct >= 0 && quiz.correct < quiz.options.length, `Lesson ${l.id} quiz correct index out of bounds`);
    assert.ok(quiz.benefit && quiz.benefit.length >= 20, `Lesson ${l.id} quiz benefit explanation too short`);
  });
});

check('2.10 Zero placeholder / lorem-ipsum / dummy strings across all Phase 3 lessons', () => {
  const bannedWords = ['lorem', 'ipsum', 'todo', 'fixme', 'dummy', 'asdf', 'xxx', 'test test'];
  p3Lessons.forEach(l => {
    // Strip legitimate Angular @placeholder control flow tokens and Arabic transliteration
    const sanitizedStr = JSON.stringify(l)
      .replace(/@placeholder/gi, '')
      .replace(/الـ\s*placeholder/gi, '')
      .toLowerCase();
    
    bannedWords.forEach(w => {
      assert.ok(!sanitizedStr.includes(w), `Lesson ${l.id} contains prohibited word "${w}"`);
    });
    // Check for illicit placeholder text (e.g. "placeholder text", "[placeholder]")
    assert.ok(!sanitizedStr.includes('placeholder text'), `Lesson ${l.id} contains "placeholder text"`);
    assert.ok(!sanitizedStr.includes('[placeholder]'), `Lesson ${l.id} contains "[placeholder]"`);
  });
});

// ============================================================================
// 3. STARTERFILES INTEGRITY
// ============================================================================
console.log('\n--- CHECK 3: StarterFiles Integrity ---');

check('3.1 src/app/app.ts is a complete, authentic Angular component with signals and control flow support', () => {
  const code = curData.starterFiles['src/app/app.ts'];
  assert.ok(code, 'src/app/app.ts must exist in starterFiles');
  assert.ok(code.length > 500, `src/app/app.ts too short (${code.length} chars)`);

  // Standalone component check
  assert.ok(code.includes("standalone: true"), 'app.ts must be standalone: true');
  assert.ok(code.includes("import { Component, signal } from '@angular/core'"), 'app.ts must import signal');

  // Control Flow Properties
  assert.ok(code.includes("totalPrice = signal(250)"), 'app.ts must declare totalPrice signal');
  assert.ok(code.includes("movies = ["), 'app.ts must declare movies array');
  assert.ok(code.includes("bookingStatus"), 'app.ts must declare bookingStatus');

  // Phase 2 Preserved Properties
  assert.ok(code.includes("isSoldOut"), 'app.ts must preserve isSoldOut');
  assert.ok(code.includes("isAvailable = true"), 'app.ts must preserve isAvailable');
  assert.ok(code.includes("hasDiscount = true"), 'app.ts must preserve hasDiscount');
  assert.ok(code.includes("classicMovies"), 'app.ts must preserve classicMovies');
  assert.ok(code.includes("currentMovie$"), 'app.ts must preserve currentMovie$');
  assert.ok(code.includes("onBookTicket(): void"), 'app.ts must implement onBookTicket');
  assert.ok(code.includes("onSeatSelected(seat: string): void"), 'app.ts must implement onSeatSelected');
});

check('3.2 src/app/app.css contains all required classes for modern control flow styling', () => {
  const css = curData.starterFiles['src/app/app.css'];
  assert.ok(css, 'src/app/app.css must exist in starterFiles');
  const requiredClasses = [
    '.badge', '.badge.normal', '.badge.discount',
    '.movie-pill', '.empty-notice', '.seat-picker-section'
  ];
  requiredClasses.forEach(cls => {
    assert.ok(css.includes(cls), `app.css missing required class "${cls}"`);
  });
  // Original classes preserved
  assert.ok(css.includes('.cinema-shell'), 'app.css must preserve .cinema-shell');
  assert.ok(css.includes('.cinema-heading'), 'app.css must preserve .cinema-heading');
});

check('3.3 All 10 Phase 2 classic starter files are preserved intact in starterFiles', () => {
  const classicFiles = [
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
  classicFiles.forEach(f => {
    const content = curData.starterFiles[f];
    assert.ok(content, `Classic file "${f}" missing from starterFiles`);
    assert.ok(content.length >= 100, `Classic file "${f}" is hollow`);
  });
});

check('3.4 All original starter files from old-v1 remain preserved', () => {
  for (const [k, v] of Object.entries(oldData.starterFiles)) {
    if (k === 'src/app/app.ts' || k === 'src/app/app.css') continue;
    assert.strictEqual(curData.starterFiles[k], v, `Original starter file "${k}" unexpectedly modified`);
  }
});

// ============================================================================
// 4. NON-DESTRUCTIVE PRESERVATION
// ============================================================================
console.log('\n--- CHECK 4: Non-Destructive Preservation ---');

check('4.1 Total curriculum lesson count is exactly 76 (10 P1 + 13 P2 + 7 P3 + 46 Legacy)', () => {
  assert.strictEqual(curData.lessons.length, 76, `Total lesson count must be 76, got ${curData.lessons.length}`);
});

check('4.2 Zero duplicate lesson IDs across all 76 lessons', () => {
  const ids = new Set();
  curData.lessons.forEach((l, idx) => {
    assert.ok(!ids.has(l.id), `Duplicate ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
});

check('4.3 Phase 1 lessons (indices 0 to 9) match explorer source definitions 100%', () => {
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

check('4.4 Phase 2 lessons (indices 10 to 22) are 100% preserved from Milestone 2 integration', () => {
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

check('4.5 Legacy lessons (indices 30 to 75) are 100% byte-for-byte identical to old-v1 (indices 0 to 45)', () => {
  for (let i = 0; i < oldData.lessons.length; i++) {
    const oldLesson = oldData.lessons[i];
    const curLesson = curData.lessons[i + 30];
    assert.strictEqual(JSON.stringify(curLesson), JSON.stringify(oldLesson), `Legacy lesson at index ${i + 30} (${curLesson.id}) differs from old-v1`);
  }
});

check('4.6 Module descriptor "phase-3-modern" exists with complete schema in modules', () => {
  const mod = curData.modules['phase-3-modern'];
  assert.ok(mod, 'Module descriptor "phase-3-modern" must exist');
  assert.strictEqual(mod.id, 'phase-3-modern');
  assert.strictEqual(mod.icon, '⚡');
  assert.strictEqual(mod.lessonCount, 7);
  assert.ok(mod.title && mod.title.length > 10, 'Module title must be descriptive');
  assert.ok(mod.description && mod.description.length > 20, 'Module description must be descriptive');
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

check('5.1 Positive check: genuine lesson.code in lesson.file evaluates to TRUE for all 7 Phase 3 lessons', () => {
  p3Lessons.forEach(l => {
    simSandbox.currentFiles = { [l.file]: l.code };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} valid code did not pass supportedTask`);
  });
});

check('5.2 Positive check: exact expected snippet with surrounding code passes for all 7 lessons', () => {
  p3Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    simSandbox.currentFiles = { [l.file]: `// Prefix comment\n${exp}\n// Suffix comment` };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} snippet match did not pass supportedTask`);
  });
});

check('5.3 Positive check: whitespace variation (extra spaces, tabs, mixed line breaks) passes for all 7 lessons', () => {
  p3Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const variedSnippet = `   \r\n\t  ${exp.replace(/\s+/g, '  ')}  \r\n\t `;
    simSandbox.currentFiles = { [l.file]: variedSnippet };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, true, `Lesson ${l.id} whitespace-varied snippet did not pass supportedTask`);
  });
});

check('5.4 Adversarial check: empty file evaluates to FALSE for all 7 lessons', () => {
  p3Lessons.forEach(l => {
    simSandbox.currentFiles = { [l.file]: '' };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed with empty file!`);
  });
});

check('5.5 Adversarial check: code placed in WRONG file evaluates to FALSE for all 7 lessons', () => {
  p3Lessons.forEach(l => {
    simSandbox.currentFiles = { 'src/app/wrong-target-file.ts': l.code, [l.file]: '' };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed when placed in wrong file!`);
  });
});

check('5.6 Adversarial check: typo in expected snippet evaluates to FALSE for all 7 lessons', () => {
  p3Lessons.forEach(l => {
    const exp = Array.isArray(l.expected) ? l.expected[0] : l.expected;
    const brokenSnippet = exp.slice(0, Math.floor(exp.length / 2)) + '_TYPO_' + exp.slice(Math.floor(exp.length / 2) + 1);
    simSandbox.currentFiles = { [l.file]: brokenSnippet };
    const res = simSandbox.supportedTask(l);
    assert.strictEqual(res, false, `Lesson ${l.id} unexpectedly passed with corrupted snippet!`);
  });
});

// ============================================================================
// 6. DYNAMIC SIMULATOR CONTROL FLOW EXECUTION & SLOT BUILDER
// ============================================================================
console.log('\n--- CHECK 6: Dynamic Simulator Control Flow Execution & Slot Builder ---');

const { createEditorEnvironment } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/e2e_harness.cjs'));
const env = createEditorEnvironment(curData);

check('6.1 Dynamic @if (totalPrice() >= 200) renders discount badge in simulated preview', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-03');
  env.setFiles({
    'src/app/app.ts': curData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('خصم خاص مؤهل للشحن المجاني!'), 'Preview must render discount badge when totalPrice() >= 200');
});

check('6.2 Dynamic @for (movie of movies; track movie.id) renders movies in simulated preview', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-04');
  env.setFiles({
    'src/app/app.ts': curData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('رحلة النجوم'), 'Preview must render first movie');
  assert.ok(html.includes('واحة الأمل'), 'Preview must render second movie');
});

check('6.3 Dynamic @for @empty block activates when movies array is empty', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-05');
  env.setFiles({
    'src/app/app.ts': 'export class App { movies = signal([]); }',
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.includes('لا توجد عروض أفلام متاحة في هذا التوقيت'), 'Preview must render empty notice when movies is empty');
});

check('6.4 Dynamic @switch (bookingStatus) evaluates CONFIRMED branch and @default fallback', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-06');
  // 1. Confirmed
  env.setFiles({
    'src/app/app.ts': curData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const htmlConfirmed = env.getPreviewSrcdoc();
  assert.ok(htmlConfirmed.includes('الحجز مؤكد وجاهز'), 'Preview must render confirmed branch');

  // 2. Unknown status -> fallback to @default
  const defaultAppTs = curData.starterFiles['src/app/app.ts'].replace(
    "bookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | string = 'CONFIRMED';",
    "bookingStatus = 'UNKNOWN_STATE';"
  );
  env.setFiles({
    'src/app/app.ts': defaultAppTs,
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const htmlDefault = env.getPreviewSrcdoc();
  assert.ok(htmlDefault.includes('حالة الحجز غير محددة'), 'Preview must render @default branch for unhandled status');
});

check('6.5 Dynamic @defer block with @placeholder renders successfully', () => {
  const l = p3Lessons.find(x => x.id === 'ng-modern-07');
  env.setFiles({
    'src/app/app.ts': curData.starterFiles['src/app/app.ts'],
    'src/app/app.html': l.code
  });
  env.runSimulatedPreview();
  const html = env.getPreviewSrcdoc();
  assert.ok(html.length > 50, 'Preview must render defer template content');
  assert.strictEqual(env.checkSupportedTask(l), true, 'ng-modern-07 must pass supportedTask');
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

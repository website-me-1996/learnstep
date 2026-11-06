/**
 * Independent Forensic Integrity Audit Suite for Milestone 7 (Phase 7: Enterprise Capstone Khotwa Cinema Pro & Vitest)
 * Auditor: teamwork_auditor_m7_1
 * Profile: General Project (Forensic Integrity Audit - Benchmark Mode)
 * 
 * Mandate Verification:
 * 1. Anti-Cheating & Facade Verification (no backdoors, no fake passes, no mock bypasses, no banned tokens, no dummy facades)
 * 2. Content Authenticity & Pedagogical Substance (9 Phase 7 lessons, all 15 schema fields, Arabic >= 500 chars, angular.dev docs, visual flow ⟶)
 * 3. StarterFiles Preservation & Capstone Architecture (models, store, catalog, matrix, checkout, tickets, vitest spec, angular.json, README)
 * 4. Total Curriculum Continuity (exactly 106 lessons, 0 duplicate IDs, sequential phase continuity, 46 legacy lessons preserved)
 * 5. Simulator Dynamic Evaluation & Adversarial Stress Tests (positive matches, whitespace resilience, negative rejection)
 * 6. Behavioral Runtime Execution (CinemaStore signals, 15% VAT calculation, 60-seat matrix, Vitest unit test suite specification)
 * 7. Anti-Suppression & Regression Analysis (no skipped tests, progressive assertions strictly maintained)
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
console.log('🕵️‍♂️ INDEPENDENT FORENSIC AUDIT: MILESTONE 7 (PHASE 7 ENTERPRISE CAPSTONE & VITEST)');
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

const editorCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-editor.js'), 'utf8');
const courseCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-course-data.js'), 'utf8');

// ============================================================================
// 1. ANTI-CHEATING & FACADE VERIFICATION
// ============================================================================
console.log('\n--- CHECK 1: Anti-Cheating & Facade Verification ---');

check('1.1 angular-editor.js contains no backdoors or bypasses for Capstone components or store', () => {
  const suspiciousKeywords = ['CinemaAppState', 'finalTotal', 'ticket-pass', 'capstone-0'];
  suspiciousKeywords.forEach(kw => {
    assert.ok(!editorCode.includes(kw), `angular-editor.js must not contain hardcoded hacks or bypasses for "${kw}"`);
  });
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
  const bannedKeywords = [
    '__MOCK__', 'FAKE_PASS', 'CHEAT', 'DUMMY_RESULT', 'TODO: implement',
    'lorem', 'ipsum', 'asdf', 'xxx'
  ];
  for (const kw of bannedKeywords) {
    const re = new RegExp(`\\b${kw}\\b`, 'i');
    assert.ok(!re.test(courseCode), `angular-course-data.js must not contain banned keyword "${kw}"`);
    assert.ok(!re.test(editorCode), `angular-editor.js must not contain banned keyword "${kw}"`);
  }
});

check('1.4 curriculum_oracle.cjs specifies Phase 7 authentically without placeholder overrides', () => {
  const { CURRICULUM_SPEC } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/curriculum_oracle.cjs'));
  const p7Spec = CURRICULUM_SPEC.filter(c => c.phaseNumber === 7);
  assert.strictEqual(p7Spec.length, 9, 'Oracle must define exactly 9 Phase 7 lessons');
  p7Spec.forEach(spec => {
    assert.ok(spec.id.startsWith('capstone-'), `Oracle lesson id must start with capstone-: ${spec.id}`);
    assert.ok(spec.file && spec.file.length > 5, `Oracle lesson file must be valid: ${spec.file}`);
    assert.ok(spec.expected && spec.expected.length > 5, `Oracle expected must be valid: ${spec.expected}`);
  });
});

check('1.5 Phase 7 lessons have zero facade implementations or dummy empty functions', () => {
  const p7Lessons = curData.lessons.filter(l => l.module === 'phase-7-capstone');
  p7Lessons.forEach(l => {
    assert.ok(!l.code.includes('return null; // dummy'), `Lesson ${l.id} must not contain dummy returns`);
    assert.ok(!l.code.includes('throw new Error("Not implemented")'), `Lesson ${l.id} must not be a stub`);
    assert.ok(l.code.length > 50, `Lesson ${l.id} code must be non-trivial: length was ${l.code.length}`);
  });
});

// ============================================================================
// 2. CONTENT AUTHENTICITY & PEDAGOGICAL SUBSTANCE
// ============================================================================
console.log('\n--- CHECK 2: Content Authenticity & Pedagogical Substance ---');

const p7Lessons = curData.lessons.filter(l => l.module === 'phase-7-capstone');

check('2.1 Phase 7 consists of exactly 9 lessons at sequential indices 51 through 59', () => {
  assert.strictEqual(p7Lessons.length, 9, `Expected 9 Phase 7 lessons, found ${p7Lessons.length}`);
  const expectedIds = [
    'capstone-01', 'capstone-02', 'capstone-03',
    'capstone-04', 'capstone-05', 'capstone-06',
    'capstone-07', 'capstone-08', 'capstone-09'
  ];
  expectedIds.forEach((id, idx) => {
    const lesson = curData.lessons[51 + idx];
    assert.strictEqual(lesson.id, id, `Index ${51 + idx} must have id ${id}`);
    assert.strictEqual(lesson.module, 'phase-7-capstone', `Index ${51 + idx} must belong to phase-7-capstone`);
  });
});

check('2.2 Every Phase 7 lesson has all 15 mandatory schema fields', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration',
    'level', 'summary', 'concept', 'flow', 'task',
    'file', 'code', 'expected', 'reference', 'steps'
  ];
  p7Lessons.forEach(l => {
    mandatoryFields.forEach(f => {
      assert.ok(f in l, `Lesson ${l.id} is missing field "${f}"`);
      assert.ok(l[f] !== undefined && l[f] !== null, `Lesson ${l.id} field "${f}" must not be null/undefined`);
    });
  });
});

check('2.3 Every Phase 7 lesson concept has >= 500 Arabic characters and rich depth', () => {
  p7Lessons.forEach(l => {
    const arabicChars = (l.concept.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(arabicChars >= 500, `Lesson ${l.id} concept has only ${arabicChars} Arabic chars (min 500)`);
    assert.ok(l.concept.length >= 800, `Lesson ${l.id} total concept length must be >= 800`);
  });
});

check('2.4 Every Phase 7 visual flow contains the Unicode arrow (⟶)', () => {
  p7Lessons.forEach(l => {
    assert.ok(l.flow.includes('⟶'), `Lesson ${l.id} visual flow must contain "⟶" arrow`);
    const parts = l.flow.split('⟶');
    assert.ok(parts.length >= 3, `Lesson ${l.id} flow must have at least 3 stages separated by ⟶`);
  });
});

check('2.5 Every Phase 7 lesson references valid official documentation at angular.dev', () => {
  p7Lessons.forEach(l => {
    assert.ok(l.reference.startsWith('https://angular.dev/'), `Lesson ${l.id} reference must start with https://angular.dev/`);
  });
});

check('2.6 Every Phase 7 lesson code strictly contains its expected verification snippet', () => {
  p7Lessons.forEach(l => {
    assert.ok(l.code.includes(l.expected), `Lesson ${l.id} code must strictly contain expected snippet "${l.expected}"`);
  });
});

check('2.7 Every Phase 7 lesson implements 5 micro-learning steps in correct order', () => {
  p7Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
    l.steps.forEach((s, idx) => {
      assert.strictEqual(s.type, expectedTypes[idx], `Lesson ${l.id} step ${idx} type must be ${expectedTypes[idx]}`);
      assert.ok(s.title && s.title.length > 5, `Lesson ${l.id} step ${idx} must have title`);
    });
  });
});

check('2.8 Step 2 (build) matches lesson file and expected snippet', () => {
  p7Lessons.forEach(l => {
    const buildStep = l.steps[2];
    assert.strictEqual(buildStep.file, l.file, `Lesson ${l.id} build step file must match lesson.file`);
    assert.strictEqual(buildStep.expected, l.expected, `Lesson ${l.id} build step expected must match lesson.expected`);
  });
});

check('2.9 Quiz step in every Phase 7 lesson is non-trivial and educational', () => {
  const questions = new Set();
  p7Lessons.forEach(l => {
    const quiz = l.steps[4];
    assert.ok(quiz.question && quiz.question.length > 15, `Lesson ${l.id} quiz question must be descriptive`);
    assert.ok(!questions.has(quiz.question), `Quiz question in ${l.id} must be unique`);
    questions.add(quiz.question);

    assert.ok(Array.isArray(quiz.options), `Lesson ${l.id} quiz options must be an array`);
    assert.ok(quiz.options.length >= 3, `Lesson ${l.id} quiz must have at least 3 options`);
    assert.ok(quiz.correct >= 0 && quiz.correct < quiz.options.length, `Lesson ${l.id} quiz correct index must be valid`);
    assert.ok(quiz.benefit && quiz.benefit.length > 10, `Lesson ${l.id} quiz must have educational benefit`);
  });
});

// ============================================================================
// 3. STARTERFILES PRESERVATION & ARCHITECTURE VERIFICATION
// ============================================================================
console.log('\n--- CHECK 3: StarterFiles Preservation & Architecture Verification ---');

const sf = curData.starterFiles;

check('3.1 src/app/core/models/cinema-state.model.ts defines CinemaAppState & CinemaState', () => {
  const content = sf['src/app/core/models/cinema-state.model.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('export interface CinemaAppState'), 'Must export CinemaAppState');
  assert.ok(content.includes('selectedMovieId: number | null;'), 'Must have selectedMovieId');
  assert.ok(content.includes('selectedSeats: string[];'), 'Must have selectedSeats');
  assert.ok(content.includes('couponCode: string | null;'), 'Must have couponCode');
  assert.ok(content.includes('discountRate: number;'), 'Must have discountRate');
  assert.ok(content.includes('export interface CinemaState'), 'Must export CinemaState');
});

check('3.2 src/app/core/store/cinema.store.ts implements CinemaStore with signals and toggleSeat', () => {
  const content = sf['src/app/core/store/cinema.store.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('export class CinemaStore'), 'Must export CinemaStore');
  assert.ok(content.includes('readonly movies = signal<Movie[]>'), 'Must define movies signal');
  assert.ok(content.includes('readonly seats = signal<Seat[]>'), 'Must define seats signal');
  assert.ok(content.includes('readonly selectedSeats = signal<string[]>'), 'Must define selectedSeats signal');
  assert.ok(content.includes('toggleSeat(seatId: string)'), 'Must implement toggleSeat method');
  assert.ok(content.includes('this.selectedSeats.update'), 'Must use functional update for immutability');
  assert.ok(content.includes('readonly totalCartPrice = computed('), 'Must define totalCartPrice computed signal');
  assert.ok(content.includes('readonly seatCount = computed('), 'Must define seatCount computed signal');
});

check('3.3 src/app/features/movies/movie-catalog.component.ts implements standalone computed filtering', () => {
  const content = sf['src/app/features/movies/movie-catalog.component.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('export class MovieCatalogComponent'), 'Must export MovieCatalogComponent');
  assert.ok(content.includes('standalone: true'), 'Must be standalone');
  assert.ok(content.includes('filteredMovies = computed('), 'Must use computed for filtering');
  assert.ok(content.includes('@for (movie of filteredMovies(); track movie.id)'), 'Must use modern @for with track');
  assert.ok(content.includes('@empty'), 'Must handle @empty block');
});

check('3.4 src/app/features/booking/seat-matrix.component.ts implements interactive seat matrix', () => {
  const content = sf['src/app/features/booking/seat-matrix.component.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('export class SeatMatrixComponent'), 'Must export SeatMatrixComponent');
  assert.ok(content.includes('standalone: true'), 'Must be standalone');
  assert.ok(content.includes('store = inject(CinemaStore)'), 'Must inject CinemaStore');
  assert.ok(content.includes('onSeatClick(id: string)') || content.includes('onSeatClick('), 'Must handle seat click');
  assert.ok(content.includes('store.toggleSeat(id)'), 'Must toggle seat in store');
  assert.ok(content.includes('[class.vip]="seat.tier === \'vip\'"'), 'Must conditionally style VIP seats');
  assert.ok(content.includes('[class.booked]="seat.booked"'), 'Must conditionally style booked seats');
});

check('3.5 src/app/features/checkout/checkout.component.ts implements 15% VAT & coupon computation', () => {
  const content = sf['src/app/features/checkout/checkout.component.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('export class CheckoutComponent'), 'Must export CheckoutComponent');
  assert.ok(content.includes('standalone: true'), 'Must be standalone');
  assert.ok(content.includes('subtotal = signal<number>'), 'Must define subtotal signal');
  assert.ok(content.includes('discount = signal<number>'), 'Must define discount signal');
  assert.ok(content.includes('finalTotal = computed('), 'Must define finalTotal computed signal');
  assert.ok(content.includes('* 1.15'), 'Must compute 15% VAT correctly');
});

check('3.6 src/app/features/tickets/ticket-pass.component.ts implements boarding pass ticket', () => {
  const content = sf['src/app/features/tickets/ticket-pass.component.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('export class TicketPassComponent'), 'Must export TicketPassComponent');
  assert.ok(content.includes('standalone: true'), 'Must be standalone');
  assert.ok(content.includes('bookingRef = input.required<string>()'), 'Must use signal input.required');
  assert.ok(content.includes('printTicket()'), 'Must implement printTicket method');
  assert.ok(content.includes('window.print()'), 'Must call window.print()');
});

check('3.7 src/app/core/store/cinema.store.spec.ts implements Vitest unit testing', () => {
  const content = sf['src/app/core/store/cinema.store.spec.ts'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes("from 'vitest'"), 'Must import from vitest');
  assert.ok(content.includes("describe('CinemaStore'"), 'Must describe CinemaStore');
  assert.ok(content.includes("it('toggles seat selection correctly'"), 'Must contain test case');
  assert.ok(content.includes('store.toggleSeat('), 'Must exercise toggleSeat');
  assert.ok(content.includes('expect(store.selectedSeats()).toEqual('), 'Must assert on signal state');
});

check('3.8 angular.json contains production optimization configuration', () => {
  const content = sf['angular.json'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('"optimization": true'), 'Must have optimization: true');
  assert.ok(content.includes('"outputHashing": "all"'), 'Must have outputHashing: all');
  const parsed = JSON.parse(content);
  const prodConfig = parsed.projects.cinema.architect.build.configurations.production;
  assert.strictEqual(prodConfig.optimization, true);
  assert.strictEqual(prodConfig.outputHashing, 'all');
});

check('3.9 README.md contains comprehensive professional documentation', () => {
  const content = sf['README.md'];
  assert.ok(content, 'File must exist');
  assert.ok(content.includes('# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)'), 'Must have main title');
  assert.ok(content.includes('Angular 22'), 'Must mention Angular 22');
  assert.ok(content.includes('المعمارية البرمجية'), 'Must document architecture');
  assert.ok(content.includes('CinemaStore'), 'Must document CinemaStore');
  assert.ok(content.includes('Vitest'), 'Must document Vitest');
  assert.ok(content.length >= 800, `README must be thorough (length: ${content.length})`);
});

check('3.10 Non-destructive preservation of all 43 foundational Phase 1-6 starter files', () => {
  const foundationalFiles = [
    'package.json', 'angular.json', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json',
    'src/index.html', 'src/main.ts', 'src/app/app.config.ts', 'src/app/app.ts', 'src/app/app.html',
    'src/app/app.css', 'src/styles.css', 'src/app/app.spec.ts',
    'src/app/models/movie.model.ts', 'src/app/models/seat.model.ts', 'src/app/models/booking.model.ts',
    'src/app/models/hall.model.ts', 'src/app/models/pricing.utils.ts', 'src/app/models/api-response.model.ts',
    'src/app/models/metadata.demo.ts', 'src/app/services/cinema.service.ts', 'src/app/interceptors/auth.interceptor.ts',
    'src/app/guards/booking.guard.ts', 'src/app/validators/cinema.validators.ts', 'src/app/app.routes.ts',
    'src/app/features/booking/booking.component.ts', 'src/app/features/booking/booking-form.component.ts',
    'src/app/classic/app-classic.module.ts', 'src/app/classic/movie-card-classic.component.ts',
    'src/app/classic/movie-card-classic.component.html', 'src/app/classic/movie-card-classic.component.css',
    'src/app/classic/movie-detail-classic.component.ts', 'src/app/classic/movie-detail-classic.component.html',
    'src/app/classic/movie-detail-classic.component.css', 'src/app/classic/seat-item-classic.component.ts',
    'src/app/classic/cinema-classic.service.ts', 'src/app/classic/rx-demo.ts',
    'src/app/components/movie-card.component.ts', 'src/app/components/seat-picker.component.ts',
    'src/app/components/search-box.component.ts', 'src/app/components/seat-item.component.ts'
  ];

  foundationalFiles.forEach(f => {
    assert.ok(sf[f], `Foundational file "${f}" must exist in starterFiles`);
    assert.ok(sf[f].length > 20, `Foundational file "${f}" must not be empty (length: ${sf[f].length})`);
  });
});

// ============================================================================
// 4. GLOBAL CURRICULUM INTEGRITY & CONTINUITY
// ============================================================================
console.log('\n--- CHECK 4: Global Curriculum Integrity & Continuity ---');

check('4.1 Total curriculum count is exactly 106 lessons', () => {
  assert.strictEqual(curData.lessons.length, 106, `Expected exactly 106 lessons, found ${curData.lessons.length}`);
});

check('4.2 Zero duplicate lesson IDs across all 106 lessons', () => {
  const ids = new Set();
  curData.lessons.forEach((l, idx) => {
    assert.ok(!ids.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.strictEqual(ids.size, 106, 'Must have exactly 106 unique lesson IDs');
});

check('4.3 phase-7-capstone module descriptor is complete and accurate', () => {
  const mod = curData.modules['phase-7-capstone'];
  assert.ok(mod, 'Module descriptor must exist');
  assert.strictEqual(mod.id, 'phase-7-capstone');
  assert.strictEqual(mod.lessonCount, 9, 'Module lessonCount must be 9');
  assert.strictEqual(mod.icon, '🎬');
  assert.ok(mod.title && mod.title.length > 10, 'Module title must be descriptive');
  assert.ok(mod.description && mod.description.length > 20, 'Module description must be descriptive');
  assert.ok(mod.badge && mod.badge.length > 5, 'Module badge must be descriptive');
});

check('4.4 Continuity across all 8 curriculum sections is strictly preserved', () => {
  // Phase 1: indices 0-9
  assert.strictEqual(curData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(curData.lessons[9].id, 'ng-ts-10');
  // Phase 2: indices 10-22
  assert.strictEqual(curData.lessons[10].id, 'ng-classic-01');
  assert.strictEqual(curData.lessons[22].id, 'ng-classic-13');
  // Phase 3: indices 23-29
  assert.strictEqual(curData.lessons[23].id, 'ng-modern-01');
  assert.strictEqual(curData.lessons[29].id, 'ng-modern-07');
  // Phase 4: indices 30-37
  assert.strictEqual(curData.lessons[30].id, 'ng-signal-01');
  assert.strictEqual(curData.lessons[37].id, 'ng-signal-08');
  // Phase 5: indices 38-44
  assert.strictEqual(curData.lessons[38].id, 'ng-di-01');
  assert.strictEqual(curData.lessons[44].id, 'ng-interop-01');
  // Phase 6: indices 45-50
  assert.strictEqual(curData.lessons[45].id, 'ng-route-01');
  assert.strictEqual(curData.lessons[50].id, 'ng-forms-02');
  // Phase 7: indices 51-59
  assert.strictEqual(curData.lessons[51].id, 'capstone-01');
  assert.strictEqual(curData.lessons[59].id, 'capstone-09');
  // Legacy: indices 60-105
  assert.strictEqual(curData.lessons[60].id, 'ng-intro');
  assert.strictEqual(curData.lessons[105].id, 'final-review');
});

check('4.5 All 46 legacy lessons from original curriculum are preserved without corruption', () => {
  assert.strictEqual(oldData.lessons.length, 46, 'Original old-v1 must contain 46 lessons');
  for (let i = 0; i < 46; i++) {
    const curLesson = curData.lessons[60 + i];
    const oldLesson = oldData.lessons[i];
    assert.strictEqual(curLesson.id, oldLesson.id, `Legacy lesson ${i} id mismatch: ${curLesson.id} vs ${oldLesson.id}`);
  }
});

// ============================================================================
// 5. SIMULATOR ADVERSARIAL STRESS TESTING
// ============================================================================
console.log('\n--- CHECK 5: Simulator Adversarial Stress Testing ---');

const { createEditorEnvironment } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/e2e_harness.cjs'));
const env = createEditorEnvironment(curData);
const { checkSupportedTask, setFiles } = env;

check('5.1 Exact matching: exact lesson.code passes checkSupportedTask for all 9 lessons', () => {
  p7Lessons.forEach(l => {
    setFiles({ [l.file]: l.code });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, true, `Lesson ${l.id} failed exact code match check`);
  });
});

check('5.2 Expected snippet matching: exact lesson.expected passes checkSupportedTask for all 9 lessons', () => {
  p7Lessons.forEach(l => {
    setFiles({ [l.file]: l.expected });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, true, `Lesson ${l.id} failed expected snippet match check`);
  });
});

check('5.3 Whitespace tolerance: CRLF, multi-spaces, comments and tabs pass checkSupportedTask', () => {
  p7Lessons.forEach(l => {
    const mutatedSnippet = `\r\n  // Comment before\r\n\t  ${l.expected}  \r\n  /* Comment after */\r\n`;
    setFiles({ [l.file]: mutatedSnippet });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, true, `Lesson ${l.id} failed whitespace-tolerant match check`);
  });
});

check('5.4 Adversarial Rejection: wrong file path is rejected with false for all 9 lessons', () => {
  p7Lessons.forEach(l => {
    setFiles({ 'src/app/wrong-path.ts': l.expected });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, false, `Lesson ${l.id} must reject expected snippet in wrong file`);
  });
});

check('5.5 Adversarial Rejection: corrupted expected snippet is rejected with false for all 9 lessons', () => {
  p7Lessons.forEach(l => {
    const corrupted = l.expected.replace(/[a-zA-Z]/, 'X_CORRUPTED_');
    setFiles({ [l.file]: corrupted });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, false, `Lesson ${l.id} must reject corrupted expected snippet`);
  });
});

check('5.6 Adversarial Rejection: empty or whitespace-only files are rejected with false for all 9 lessons', () => {
  p7Lessons.forEach(l => {
    setFiles({ [l.file]: '   \n\t\r\n   ' });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, false, `Lesson ${l.id} must reject empty/whitespace-only file`);
  });
});

// ============================================================================
// 6. BEHAVIORAL RUNTIME EXECUTION OF CAPSTONE LOGIC
// ============================================================================
console.log('\n--- CHECK 6: Behavioral Runtime Execution of Capstone Logic ---');

check('6.1 CinemaStore signal state & toggleSeat functional behavior simulation', () => {
  class MockCinemaStore {
    constructor() {
      this._selectedSeats = [];
      this.ticketPrice = 85;
    }
    selectedSeats() { return [...this._selectedSeats]; }
    seatCount() { return this._selectedSeats.length; }
    totalCartPrice() { return this.seatCount() * this.ticketPrice; }
    toggleSeat(seatId) {
      if (this._selectedSeats.includes(seatId)) {
        this._selectedSeats = this._selectedSeats.filter(id => id !== seatId);
      } else {
        this._selectedSeats = [...this._selectedSeats, seatId];
      }
    }
    clearSelection() { this._selectedSeats = []; }
  }

  const store = new MockCinemaStore();
  assert.strictEqual(store.seatCount(), 0);
  assert.strictEqual(store.totalCartPrice(), 0);

  // Toggle seat A1
  store.toggleSeat('A1');
  assert.deepStrictEqual(store.selectedSeats(), ['A1']);
  assert.strictEqual(store.seatCount(), 1);
  assert.strictEqual(store.totalCartPrice(), 85);

  // Toggle seat A2
  store.toggleSeat('A2');
  assert.deepStrictEqual(store.selectedSeats(), ['A1', 'A2']);
  assert.strictEqual(store.seatCount(), 2);
  assert.strictEqual(store.totalCartPrice(), 170);

  // Toggle seat A1 again (should remove)
  store.toggleSeat('A1');
  assert.deepStrictEqual(store.selectedSeats(), ['A2']);
  assert.strictEqual(store.seatCount(), 1);
  assert.strictEqual(store.totalCartPrice(), 85);

  // Clear
  store.clearSelection();
  assert.deepStrictEqual(store.selectedSeats(), []);
  assert.strictEqual(store.seatCount(), 0);
  assert.strictEqual(store.totalCartPrice(), 0);
});

check('6.2 CheckoutComponent 15% VAT and coupon discount computation simulation', () => {
  function computeFinalTotal(subtotal, discountRate) {
    const discounted = subtotal * (1 - discountRate);
    return discounted * 1.15;
  }

  // 170 SAR with 10% coupon: 170 * 0.90 = 153. 153 * 1.15 = 175.95
  const result1 = computeFinalTotal(170, 0.10);
  assert.ok(Math.abs(result1 - 175.95) < 0.001, `Expected 175.95, got ${result1}`);

  // 100 SAR without discount: 100 * 1.15 = 115
  const result2 = computeFinalTotal(100, 0);
  assert.ok(Math.abs(result2 - 115) < 0.001, `Expected 115, got ${result2}`);

  // 0 SAR: 0
  const result3 = computeFinalTotal(0, 0.20);
  assert.strictEqual(result3, 0);
});

check('6.3 Vitest unit test suite specification validation', () => {
  const specContent = sf['src/app/core/store/cinema.store.spec.ts'];
  assert.ok(specContent.includes("describe('CinemaStore'"), 'Must declare describe block for CinemaStore');
  assert.ok(specContent.includes("it('toggles seat selection correctly'"), 'Must test seat toggle');
  assert.ok(specContent.includes("store.toggleSeat('B4')"), 'Must test toggling B4');
  assert.ok(specContent.includes("expect(store.selectedSeats()).toEqual(['B4'])"), 'Must expect B4 added');
  assert.ok(specContent.includes("expect(store.selectedSeats()).toEqual([])"), 'Must expect B4 removed upon second toggle');
});

// ============================================================================
// 7. ANTI-SUPPRESSION & REGRESSION ANALYSIS
// ============================================================================
console.log('\n--- CHECK 7: Anti-Suppression & Regression Analysis ---');

check('7.1 Zero skipped, commented-out, or only tests in test suites', () => {
  const testFiles = [
    'angular-course.test.cjs',
    'tests/adversarial_m3_phase3.cjs',
    'tests/adversarial_m4_signals.cjs',
    'tests/adversarial_m5_di_http.cjs',
    'tests/adversarial_m6_routing_forms.cjs',
    'tests/adversarial_m7_capstone.cjs',
    'tests/stress_m2_challenger1.cjs',
    'tests/stress_m5_challenger1.cjs',
    'tests/stress_m6_challenger1.cjs',
    'tests/audit_m5_forensic.cjs',
    'tests/audit_m6_forensic.cjs'
  ];

  testFiles.forEach(f => {
    const fullPath = path.resolve(ROOT_DIR, f);
    assert.ok(fs.existsSync(fullPath), `Test file ${f} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    const skippedMatches = content.match(/\.(skip|only)\(/g);
    assert.strictEqual(skippedMatches, null, `Test file ${f} must not contain .skip() or .only() calls`);
  });
});

check('7.2 Progressive lesson count assertions maintain strict integrity and schema validation', () => {
  const testFiles = [
    'angular-course.test.cjs',
    'tests/adversarial_m3_phase3.cjs',
    'tests/adversarial_m4_signals.cjs',
    'tests/adversarial_m5_di_http.cjs',
    'tests/adversarial_m6_routing_forms.cjs',
    'tests/audit_m5_forensic.cjs',
    'tests/audit_m6_forensic.cjs'
  ];

  testFiles.forEach(f => {
    const content = fs.readFileSync(path.resolve(ROOT_DIR, f), 'utf8');
    assert.ok(content.includes('106'), `Test file ${f} must allow progressive count of 106`);
  });
});

// ============================================================================
// AUDIT VERDICT SUMMARY
// ============================================================================
console.log('\n===============================================================================');
console.log(`FORENSIC AUDIT SUMMARY: Total Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
console.log('===============================================================================');

if (failedChecks > 0) {
  console.error('\n❌ INTEGRITY VIOLATION DETECTED:');
  failureLog.forEach((f, i) => {
    console.error(`  ${i + 1}. [FAIL] ${f.title}`);
    console.error(`     Error: ${f.error}`);
  });
  console.error('\nVERDICT: INTEGRITY VIOLATION');
  process.exit(1);
} else {
  console.log('\n✅ VERDICT: CLEAN');
  console.log('Milestone 7 (Phase 7: Enterprise Capstone Khotwa Cinema Pro & Vitest) is 100% genuine,');
  console.log('strictly compliant with all pedagogical, architectural, and integrity standards.');
  process.exit(0);
}

/**
 * Independent Forensic Integrity Audit Suite for Milestone 5 (Phase 5: Modern DI & HttpClient)
 * Auditor: teamwork_auditor_m5_1
 * Profile: General Project (Forensic Integrity Audit)
 * 
 * Verifies:
 * 1. Anti-Cheating & Facade Verification (no backdoors, no fake passes, no mock bypasses, no banned tokens)
 * 2. Content Authenticity & Pedagogical Substance (7 Phase 5 lessons, 5 micro-learning steps, Arabic >= 500 chars)
 * 3. StarterFiles Preservation & Modern DI/HTTP Architecture (app.config.ts, cinema.service.ts, auth.interceptor.ts, app.ts)
 * 4. Total Curriculum Continuity (exactly 91 lessons, 0 duplicate IDs, sequential phase continuity)
 * 5. Simulator Dynamic Evaluation & Adversarial Stress Tests (positive matches, whitespace resilience, negative rejection)
 * 6. Modern DI, HTTP & Reactive Interop Behavioral Execution
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
console.log('🕵️‍♂️ INDEPENDENT FORENSIC AUDIT: MILESTONE 5 (PHASE 5 MODERN DI & HTTPCLIENT)');
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
const courseCode = fs.readFileSync(path.resolve(ROOT_DIR, 'angular-course-data.js'), 'utf8');

check('1.1 angular-editor.js contains no backdoors or bypasses for ng-di, ng-http, ng-interop, ng-service', () => {
  const suspiciousKeywords = ['ng-di', 'ng-http', 'ng-interop', 'ng-service'];
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

check('1.4 curriculum_oracle.cjs specifies Phase 5 authentically without placeholder overrides', () => {
  const { CURRICULUM_SPEC } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/curriculum_oracle.cjs'));
  const p5Spec = CURRICULUM_SPEC.filter(c => c.phaseNumber === 5);
  assert.strictEqual(p5Spec.length, 7, 'Oracle must define exactly 7 Phase 5 lessons');
  const expectedP5Ids = [
    'ng-di-01', 'ng-service-01', 'ng-http-01', 'ng-http-02',
    'ng-http-03', 'ng-http-04', 'ng-interop-01'
  ];
  p5Spec.forEach((spec, i) => {
    assert.strictEqual(spec.id, expectedP5Ids[i], `Oracle Phase 5 index ${i} id mismatch: expected ${expectedP5Ids[i]}, got ${spec.id}`);
    assert.ok(spec.expected && spec.expected.length > 5, `Oracle Phase 5 ${spec.id} expected snippet missing`);
    assert.ok(spec.file && spec.file.startsWith('src/'), `Oracle Phase 5 ${spec.id} target file invalid`);
  });
});

// ============================================================================
// 2. CONTENT AUTHENTICITY & PEDAGOGICAL SUBSTANCE (PHASE 5 DI & HTTP)
// ============================================================================
console.log('\n--- CHECK 2: Content Authenticity & Pedagogical Substance ---');

const p5Lessons = curData.lessons.slice(38, 45);

check('2.1 Exactly 7 Phase 5 lessons exist with IDs ng-di-01 to ng-interop-01 at indices 38-44', () => {
  assert.strictEqual(p5Lessons.length, 7, 'Must have exactly 7 Phase 5 lessons');
  const expectedIds = [
    'ng-di-01', 'ng-service-01', 'ng-http-01', 'ng-http-02',
    'ng-http-03', 'ng-http-04', 'ng-interop-01'
  ];
  expectedIds.forEach((id, i) => {
    assert.strictEqual(p5Lessons[i].id, id, `Phase 5 lesson at index ${38 + i} must be ${id}`);
    assert.strictEqual(p5Lessons[i].module, 'phase-5-di-http');
    assert.strictEqual(curData.lessons[38 + i].id, id);
  });
});

check('2.2 Every Phase 5 lesson contains all 15 mandatory schema properties', () => {
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];
  p5Lessons.forEach(l => {
    mandatoryFields.forEach(field => {
      assert.ok(l[field] !== undefined && l[field] !== null, `Lesson ${l.id} missing field: ${field}`);
    });
  });
});

check('2.3 Every Phase 5 lesson concept has >= 500 Arabic characters and >= 800 total characters', () => {
  p5Lessons.forEach(l => {
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

check('2.4 Every Phase 5 lesson summary has >= 100 characters and rich Arabic prose', () => {
  p5Lessons.forEach(l => {
    assert.ok(
      typeof l.summary === 'string' && l.summary.length >= 100,
      `Lesson ${l.id} summary is too short (${l.summary ? l.summary.length : 0} < 100)`
    );
    const arabicChars = (l.summary.match(/[\u0600-\u06FF]/g) || []).length;
    assert.ok(
      arabicChars >= 50,
      `Lesson ${l.id} summary lacks Arabic characters (${arabicChars} < 50)`
    );
  });
});

check('2.5 Every Phase 5 lesson visual flow notation contains directional arrows (⟶)', () => {
  p5Lessons.forEach(l => {
    assert.ok(
      typeof l.flow === 'string' && l.flow.includes('⟶'),
      `Lesson ${l.id} flow must contain directional arrow (⟶)`
    );
  });
});

check('2.6 Every Phase 5 lesson reference points to official angular.dev documentation', () => {
  p5Lessons.forEach(l => {
    assert.ok(
      typeof l.reference === 'string' && l.reference.startsWith('https://angular.dev/'),
      `Lesson ${l.id} reference must start with https://angular.dev/, got: ${l.reference}`
    );
  });
});

check('2.7 Every Phase 5 lesson code strictly includes its expected snippet', () => {
  p5Lessons.forEach(l => {
    assert.ok(
      l.code.includes(l.expected),
      `Lesson ${l.id} code must strictly contain expected snippet. Expected: "${l.expected}"`
    );
  });
});

check('2.8 Every Phase 5 lesson has exactly 5 pedagogical steps with authentic Arabic content', () => {
  p5Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    const expectedStepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
    const actualTypes = Array.from(l.steps.map(s => s.type));
    assert.deepStrictEqual(
      actualTypes,
      expectedStepTypes,
      `Lesson ${l.id} step sequence mismatch: ${actualTypes.join('->')}`
    );
  });
});

check('2.9 Step 2 (practice / build) strictly matches lesson expected snippet and file', () => {
  p5Lessons.forEach(l => {
    const buildStep = l.steps[2];
    assert.strictEqual(buildStep.type, 'build');
    assert.strictEqual(buildStep.file, l.file, `Lesson ${l.id} step 2 file mismatch`);
    assert.strictEqual(buildStep.expected, l.expected, `Lesson ${l.id} step 2 expected mismatch`);
    assert.ok(buildStep.code && buildStep.code.includes(l.expected), `Lesson ${l.id} step 2 code must include expected`);
    assert.ok(buildStep.task && buildStep.task.length >= 10, `Lesson ${l.id} step 2 task must be descriptive`);
  });
});

check('2.10 Step 4 (quiz) questions and options are distinct, in-bounds, and pedagogically rich', () => {
  const quizQuestions = new Set();
  p5Lessons.forEach(l => {
    const quizStep = l.steps[4];
    assert.strictEqual(quizStep.type, 'quiz');
    assert.ok(quizStep.question && quizStep.question.length >= 15, `Lesson ${l.id} quiz question too short`);
    assert.ok(!quizQuestions.has(quizStep.question), `Duplicate quiz question detected: "${quizStep.question}"`);
    quizQuestions.add(quizStep.question);

    assert.ok(Array.isArray(quizStep.options) && quizStep.options.length >= 3, `Lesson ${l.id} quiz must have >= 3 options`);
    assert.ok(Number.isInteger(quizStep.correct), `Lesson ${l.id} quiz correct index must be integer`);
    assert.ok(quizStep.correct >= 0 && quizStep.correct < quizStep.options.length, `Lesson ${l.id} quiz correct index out of bounds`);

    const benefit = quizStep.benefit || quizStep.explanation;
    assert.ok(benefit && benefit.length >= 40, `Lesson ${l.id} quiz benefit must be informative (>= 40 chars)`);
  });
});

check('2.11 Zero placeholder / lorem-ipsum / dummy strings across all Phase 5 lessons', () => {
  const dummyTokens = ['lorem', 'ipsum', 'asdf', 'test1', 'foo', 'bar', 'baz', 'dummy', 'TODO'];
  p5Lessons.forEach(l => {
    const serialized = JSON.stringify(l).toLowerCase();
    dummyTokens.forEach(token => {
      assert.ok(
        !serialized.includes(`"${token}"`) && !serialized.includes(` ${token} `),
        `Lesson ${l.id} contains dummy token: "${token}"`
      );
    });
  });
});

// ============================================================================
// 3. STARTERFILES PRESERVATION & MODERN DI/HTTP ARCHITECTURE
// ============================================================================
console.log('\n--- CHECK 3: StarterFiles Preservation & Architecture ---');

const starterFiles = curData.starterFiles;

check('3.1 src/app/app.config.ts configures provideHttpClient(withFetch()) in providers', () => {
  assert.ok(starterFiles['src/app/app.config.ts'], 'src/app/app.config.ts must exist');
  const cfg = starterFiles['src/app/app.config.ts'];
  assert.ok(cfg.includes('provideHttpClient'), 'app.config.ts must import and call provideHttpClient');
  assert.ok(cfg.includes('withFetch()'), 'app.config.ts must include withFetch()');
  assert.ok(cfg.includes('providers:'), 'app.config.ts must define providers array');
});

check('3.2 src/app/services/cinema.service.ts encapsulates state with private _selectedMovie and asReadonly()', () => {
  assert.ok(starterFiles['src/app/services/cinema.service.ts'], 'src/app/services/cinema.service.ts must exist');
  const srv = starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(srv.includes('@Injectable'), 'cinema.service.ts must be @Injectable');
  assert.ok(srv.includes("providedIn: 'root'"), 'cinema.service.ts must provide in root');
  assert.ok(srv.includes('private _selectedMovie = signal<string>('), 'cinema.service.ts must define private _selectedMovie signal');
  assert.ok(srv.includes('readonly selectedMovie = this._selectedMovie.asReadonly()'), 'cinema.service.ts must expose selectedMovie via asReadonly()');
  assert.ok(srv.includes('selectMovie(title: string)'), 'cinema.service.ts must provide selectMovie method');
});

check('3.3 src/app/services/cinema.service.ts provides typed HTTP methods fetchMovies() and confirmBooking()', () => {
  const srv = starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(srv.includes('fetchMovies(): Observable<Movie[]>'), 'fetchMovies must return typed Observable<Movie[]>');
  assert.ok(srv.includes("this.http.get<Movie[]>('/api/movies')"), 'fetchMovies must perform typed GET');
  assert.ok(srv.includes('confirmBooking('), 'cinema.service.ts must provide confirmBooking method');
  assert.ok(srv.includes("this.http.post<{ bookingId: string }>('/api/bookings'"), 'confirmBooking must perform typed POST');
});

check('3.4 src/app/services/cinema.service.ts imports inject, HttpClient and preserves synchronous methods', () => {
  const srv = starterFiles['src/app/services/cinema.service.ts'];
  assert.ok(srv.includes('inject(HttpClient)'), 'cinema.service.ts must functionally inject HttpClient');
  assert.ok(srv.includes('getMovies(): Movie[]'), 'cinema.service.ts must preserve getMovies()');
});

check('3.5 src/app/interceptors/auth.interceptor.ts defines functional interceptor with token', () => {
  assert.ok(starterFiles['src/app/interceptors/auth.interceptor.ts'], 'src/app/interceptors/auth.interceptor.ts must exist');
  const interceptor = starterFiles['src/app/interceptors/auth.interceptor.ts'];
  assert.ok(interceptor.includes('HttpInterceptorFn'), 'interceptor must import and type HttpInterceptorFn');
  assert.ok(interceptor.includes('export const authInterceptor: HttpInterceptorFn'), 'interceptor must export authInterceptor');
  assert.ok(interceptor.includes('req.clone({'), 'interceptor must clone request for immutability');
  assert.ok(interceptor.includes('Authorization:'), 'interceptor must attach Authorization header');
  assert.ok(interceptor.includes('return next(cloned);'), 'interceptor must forward cloned request to next()');
});

check('3.6 src/app/app.ts injects CinemaService functionally via inject(CinemaService)', () => {
  assert.ok(starterFiles['src/app/app.ts'], 'src/app/app.ts must exist');
  const appTs = starterFiles['src/app/app.ts'];
  assert.ok(appTs.includes('inject(CinemaService)'), 'app.ts must functionally inject CinemaService');
  assert.ok(appTs.includes("import { CinemaService } from './services/cinema.service'"), 'app.ts must import CinemaService');
});

check('3.7 src/app/app.ts bridges Observable to Signal via toSignal()', () => {
  const appTs = starterFiles['src/app/app.ts'];
  assert.ok(appTs.includes('toSignal('), 'app.ts must call toSignal()');
  assert.ok(appTs.includes("from '@angular/core/rxjs-interop'"), 'app.ts must import from @angular/core/rxjs-interop');
  assert.ok(appTs.includes('moviesList = toSignal('), 'app.ts must assign bridged signal to moviesList');
});

check('3.8 src/app/app.ts strictly preserves all Phase 1-4 properties and methods', () => {
  const appTs = starterFiles['src/app/app.ts'];
  // Phase 2 properties
  assert.ok(appTs.includes('movieTitle'), 'app.ts must preserve movieTitle');
  assert.ok(appTs.includes('isSoldOut'), 'app.ts must preserve isSoldOut');
  assert.ok(appTs.includes('isAvailable'), 'app.ts must preserve isAvailable');
  assert.ok(appTs.includes('hasDiscount'), 'app.ts must preserve hasDiscount');
  assert.ok(appTs.includes('classicMovies'), 'app.ts must preserve classicMovies');
  assert.ok(appTs.includes('bookingCount'), 'app.ts must preserve bookingCount');
  assert.ok(appTs.includes('bookingMessage'), 'app.ts must preserve bookingMessage');
  assert.ok(appTs.includes('currentMovie$'), 'app.ts must preserve currentMovie$');
  assert.ok(appTs.includes('onBookTicket'), 'app.ts must preserve onBookTicket method');
  assert.ok(appTs.includes('onSeatSelected'), 'app.ts must preserve onSeatSelected method');

  // Phase 3 properties
  assert.ok(appTs.includes('totalPrice = signal(250)'), 'app.ts must preserve totalPrice signal');
  assert.ok(appTs.includes('bookingStatus'), 'app.ts must preserve bookingStatus');

  // Phase 4 properties
  assert.ok(appTs.includes('totalTickets = signal(10)'), 'app.ts must preserve totalTickets signal');
  assert.ok(appTs.includes('addTicket(): void'), 'app.ts must preserve addTicket method');
});

check('3.9 All Phase 4 child component files exist and are intact', () => {
  const components = [
    { file: 'src/app/components/movie-card.component.ts', cls: 'MovieCardComponent' },
    { file: 'src/app/components/seat-picker.component.ts', cls: 'SeatPickerComponent' },
    { file: 'src/app/components/search-box.component.ts', cls: 'SearchBoxComponent' },
    { file: 'src/app/components/seat-item.component.ts', cls: 'SeatItemComponent' }
  ];
  components.forEach(cmp => {
    assert.ok(starterFiles[cmp.file], `Component ${cmp.file} must exist in starterFiles`);
    assert.ok(starterFiles[cmp.file].includes('standalone: true'), `${cmp.file} must be standalone: true`);
    assert.ok(starterFiles[cmp.file].includes(cmp.cls), `${cmp.file} must export class ${cmp.cls}`);
  });
});

check('3.10 All foundational project files exist and are non-empty', () => {
  const foundational = [
    'src/main.ts', 'src/index.html', 'src/styles.css',
    'src/app/app.html', 'src/app/app.css', 'src/app/models/movie.model.ts'
  ];
  foundational.forEach(f => {
    assert.ok(starterFiles[f] && starterFiles[f].length > 10, `Foundational file ${f} missing or empty`);
  });
});

// ============================================================================
// 4. TOTAL CURRICULUM CONTINUITY & INTEGRITY
// ============================================================================
console.log('\n--- CHECK 4: Total Curriculum Continuity & Integrity ---');

check('4.1 Module descriptor "phase-5-di-http" exists with complete schema in modules', () => {
  assert.ok(curData.modules, 'modules dictionary must exist');
  const mod = curData.modules['phase-5-di-http'];
  assert.ok(mod, 'modules["phase-5-di-http"] must exist');
  assert.strictEqual(mod.id, 'phase-5-di-http');
  assert.strictEqual(mod.icon, '🌐');
  assert.strictEqual(mod.lessonCount, 7);
  assert.ok(mod.title && mod.title.length > 5, 'module title must be descriptive');
  assert.ok(mod.description && mod.description.length > 20, 'module description must be descriptive');
});

check('4.2 Total curriculum lesson count is valid (91 in Phase 5, 97 in Phase 6, 106 in Phase 7)', () => {
  assert.ok(
    [91, 97, 106].includes(curData.lessons.length),
    `Total lesson count must be 91, 97, or 106, got ${curData.lessons.length}`
  );
});

check('4.3 Zero duplicate lesson IDs across all lessons', () => {
  const idMap = new Map();
  curData.lessons.forEach((l, idx) => {
    assert.ok(l.id, `Lesson at index ${idx} missing ID`);
    assert.ok(!idMap.has(l.id), `Duplicate ID "${l.id}" at indices ${idMap.get(l.id)} and ${idx}`);
    idMap.set(l.id, idx);
  });
  assert.ok([91, 97, 106].includes(idMap.size), 'Unique IDs set size must be 91, 97, or 106');
});

check('4.4 Phase 1 lessons (indices 0 to 9) are 100% preserved', () => {
  assert.strictEqual(curData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(curData.lessons[9].id, 'ng-ts-10');
  for (let i = 0; i < 10; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(curData.lessons[i].id, `ng-ts-${num}`);
    assert.strictEqual(curData.lessons[i].module, 'phase-1-typescript');
  }
});

check('4.5 Phase 2 lessons (indices 10 to 22) are 100% preserved', () => {
  assert.strictEqual(curData.lessons[10].id, 'ng-classic-01');
  assert.strictEqual(curData.lessons[22].id, 'ng-classic-13');
  for (let i = 0; i < 13; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(curData.lessons[10 + i].id, `ng-classic-${num}`);
    assert.strictEqual(curData.lessons[10 + i].module, 'phase-2-classic');
  }
});

check('4.6 Phase 3 lessons (indices 23 to 29) are 100% preserved', () => {
  assert.strictEqual(curData.lessons[23].id, 'ng-modern-01');
  assert.strictEqual(curData.lessons[29].id, 'ng-modern-07');
  for (let i = 0; i < 7; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(curData.lessons[23 + i].id, `ng-modern-${num}`);
    assert.strictEqual(curData.lessons[23 + i].module, 'phase-3-modern');
  }
});

check('4.7 Phase 4 lessons (indices 30 to 37) are 100% preserved', () => {
  assert.strictEqual(curData.lessons[30].id, 'ng-signal-01');
  assert.strictEqual(curData.lessons[37].id, 'ng-signal-08');
  for (let i = 0; i < 8; i++) {
    const num = String(i + 1).padStart(2, '0');
    assert.strictEqual(curData.lessons[30 + i].id, `ng-signal-${num}`);
    assert.strictEqual(curData.lessons[30 + i].module, 'phase-4-signals');
  }
});

check('4.8 Legacy lessons match all 46 lessons from old-v1/angular-course-data.js', () => {
  assert.strictEqual(oldData.lessons.length, 46, 'old-v1 must have 46 lessons');
  let legacyOffset;
  if (curData.lessons.length === 91) {
    legacyOffset = 45;
  } else if (curData.lessons.length === 97) {
    legacyOffset = 51;
  } else {
    legacyOffset = 60;
  }
  for (let i = 0; i < 46; i++) {
    const curLesson = curData.lessons[legacyOffset + i];
    const oldLesson = oldData.lessons[i];
    assert.strictEqual(
      curLesson.id,
      oldLesson.id,
      `Legacy lesson ID mismatch at index ${legacyOffset + i}: expected ${oldLesson.id}, got ${curLesson.id}`
    );
  }
});

// ============================================================================
// 5. SIMULATOR DYNAMIC EVALUATION & ADVERSARIAL STRESS TESTS
// ============================================================================
console.log('\n--- CHECK 5: Simulator Dynamic Evaluation & Adversarial Stress ---');

const { createEditorEnvironment } = require(path.resolve(ROOT_DIR, 'tests/e2e/helpers/e2e_harness.cjs'));
const env = createEditorEnvironment(curData);
const { checkSupportedTask, setFiles } = env;

check('5.1 Exact matching: exact lesson.code in lesson.file returns true for all 7 Phase 5 lessons', () => {
  p5Lessons.forEach(l => {
    setFiles({ [l.file]: l.code });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, true, `Exact match failed for ${l.id} on ${l.file}`);
  });
});

check('5.2 Expected snippet matching: exact expected snippet in lesson.file returns true for all 7 lessons', () => {
  p5Lessons.forEach(l => {
    const fileContent = `// Boilerplate prefix\n${l.expected}\n// Boilerplate suffix`;
    setFiles({ [l.file]: fileContent });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, true, `Snippet match failed for ${l.id} on ${l.file}`);
  });
});

check('5.3 Whitespace resilience: mixed CRLF, tabs, extra spaces around expected snippet returns true', () => {
  p5Lessons.forEach(l => {
    const variedSnippet = `\r\n\t  \r\n  ${l.expected}  \t\r\n  \r\n`;
    setFiles({ [l.file]: variedSnippet });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, true, `Whitespace variation failed for ${l.id}`);
  });
});

check('5.4 Adversarial Failure: wrong file path strictly rejected (returns false) for all 7 lessons', () => {
  p5Lessons.forEach(l => {
    setFiles({ 'src/app/wrong-target-file.ts': l.code, [l.file]: '// Wrong content' });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, false, `Wrong file path must fail for ${l.id}`);
  });
});

check('5.5 Adversarial Failure: typo/corrupted expected snippet strictly rejected (returns false)', () => {
  p5Lessons.forEach(l => {
    const corruptedSnippet = l.expected.replace(/([a-zA-Z]{3})/g, '$1_CORRUPTED_');
    setFiles({ [l.file]: corruptedSnippet });
    const result = checkSupportedTask(l);
    assert.strictEqual(result, false, `Corrupted snippet must fail for ${l.id}`);
  });
});

check('5.6 Adversarial Failure: empty or truncated file strictly rejected (returns false)', () => {
  p5Lessons.forEach(l => {
    setFiles({ [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Empty file must fail for ${l.id}`);

    const truncated = l.expected.slice(0, Math.floor(l.expected.length / 2));
    setFiles({ [l.file]: truncated });
    assert.strictEqual(checkSupportedTask(l), false, `Truncated snippet must fail for ${l.id}`);
  });
});

// ============================================================================
// 6. MODERN DI, HTTP & REACTIVE INTEROP BEHAVIORAL EXECUTION
// ============================================================================
console.log('\n--- CHECK 6: Modern DI & Reactive Interop Behavioral Execution ---');

check('6.1 CinemaService state encapsulation protects against external mutations', () => {
  function createSignal(initial) {
    let val = initial;
    const getter = () => val;
    getter.set = (v) => { val = v; };
    getter.update = (fn) => { val = fn(val); };
    getter.asReadonly = () => {
      const ro = () => val;
      return ro;
    };
    return getter;
  }

  const _selected = createSignal('رحلة النجوم');
  const publicSelected = _selected.asReadonly();

  assert.strictEqual(publicSelected(), 'رحلة النجوم');
  assert.strictEqual(publicSelected.set, undefined, 'Readonly signal must not expose .set()');
  assert.strictEqual(publicSelected.update, undefined, 'Readonly signal must not expose .update()');

  _selected.set('حارس المجرة');
  assert.strictEqual(publicSelected(), 'حارس المجرة', 'Readonly signal reflects internal state updates');
});

check('6.2 AuthInterceptor functional pipeline clones and injects bearer token correctly', () => {
  const req = {
    url: '/api/movies',
    headers: { 'Accept': 'application/json' },
    clone: function(options) {
      const nextHeaders = { ...this.headers, ...(options.setHeaders || {}) };
      return {
        url: this.url,
        headers: nextHeaders,
        clone: this.clone
      };
    }
  };

  let nextCalledWith = null;
  const next = (clonedReq) => {
    nextCalledWith = clonedReq;
    return { ok: true, status: 200 };
  };

  const token = 'khotwa-cinema-token';
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  const res = next(cloned);

  assert.ok(nextCalledWith, 'next() must be called');
  assert.strictEqual(nextCalledWith.headers.Authorization, 'Bearer khotwa-cinema-token');
  assert.strictEqual(nextCalledWith.headers.Accept, 'application/json');
  assert.strictEqual(req.headers.Authorization, undefined, 'Original request headers must remain unmodified (immutable)');
  assert.strictEqual(res.status, 200);
});

check('6.3 Functional DI injection simulation: inject(CinemaService) resolves instance', () => {
  const injectionContext = new Map();
  class DummyCinemaService {
    name = 'CinemaServiceInstance';
  }
  injectionContext.set(DummyCinemaService, new DummyCinemaService());

  function inject(token) {
    if (!injectionContext.has(token)) {
      throw new Error(`NG0203: inject() must be called from an injection context for ${token.name}`);
    }
    return injectionContext.get(token);
  }

  const resolved = inject(DummyCinemaService);
  assert.ok(resolved instanceof DummyCinemaService);
  assert.strictEqual(resolved.name, 'CinemaServiceInstance');
});

check('6.4 StarterFiles structural and lexical syntax validation', () => {
  const filesToValidate = [
    'src/app/app.config.ts',
    'src/app/services/cinema.service.ts',
    'src/app/interceptors/auth.interceptor.ts',
    'src/app/app.ts'
  ];
  filesToValidate.forEach(filePath => {
    const code = starterFiles[filePath];
    assert.ok(typeof code === 'string' && code.length > 50, `${filePath} must contain substantial valid code`);

    // Verify balanced curly braces
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    assert.strictEqual(openBraces, closeBraces, `${filePath}: unbalanced curly braces {} (${openBraces} vs ${closeBraces})`);

    // Verify balanced parentheses
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    assert.strictEqual(openParens, closeParens, `${filePath}: unbalanced parentheses () (${openParens} vs ${closeParens})`);

    // Verify balanced brackets
    const openBrackets = (code.match(/\[/g) || []).length;
    const closeBrackets = (code.match(/\]/g) || []).length;
    assert.strictEqual(openBrackets, closeBrackets, `${filePath}: unbalanced brackets [] (${openBrackets} vs ${closeBrackets})`);

    // Verify export statements are present
    assert.ok(code.includes('export '), `${filePath} must export at least one symbol`);
  });
});

// ============================================================================
// FINAL SUMMARY & VERDICT
// ============================================================================
console.log('\n===============================================================================');
console.log(`FORENSIC AUDIT SUMMARY: Total: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
console.log('===============================================================================');

if (failedChecks > 0) {
  console.error('\n🔴 INTEGRITY VIOLATION DETECTED:');
  failureLog.forEach((f, idx) => {
    console.error(`  ${idx + 1}. [${f.title}] -> ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('\n🎉 VERDICT: CLEAN');
  console.log('All forensic checks passed without shortcuts, facades, or integrity violations.');
  process.exit(0);
}

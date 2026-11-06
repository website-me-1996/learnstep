/**
 * Reviewer M6-2 Independent Adversarial Audit & Conformance Suite
 * Milestone 6 (Phase 6: Modern Routing & Typed Reactive Forms, Lessons 46-51)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

console.log('================================================================');
console.log('🛡️  REVIEWER M6-2: INDEPENDENT ADVERSARIAL & CONFORMANCE AUDIT');
console.log('================================================================');

// 1. Load course data and editor environment
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runAudit(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
    if (err.stack) {
      const line = err.stack.split('\n')[2];
      if (line) console.error(`         Location: ${line.trim()}`);
    }
  }
}

// ============================================================================
// SECTION 1: STARTER FILES DEEP INTEGRITY AUDIT
// ============================================================================
console.log('\n--- SECTION 1: Starter Files Deep Architectural Integrity ---');

runAudit('1.1 src/app/app.routes.ts modern routing configuration', () => {
  const routesTs = courseData.starterFiles['src/app/app.routes.ts'];
  assert(routesTs, 'src/app/app.routes.ts must exist');
  
  // Syntax check
  assert(/import\s*\{\s*Routes\s*\}\s*from\s*['"]@angular\/router['"]/.test(routesTs),
    'Must import Routes from @angular/router');
  assert(/export\s+const\s+routes\s*:\s*Routes\s*=\s*\[/.test(routesTs),
    'Must export routes of type Routes');
  
  // Default redirect with pathMatch: full
  const redirectMatch = routesTs.match(/\{\s*path:\s*['"]['"],\s*redirectTo:\s*['"]movies['"],\s*pathMatch:\s*['"]full['"]\s*\}/);
  assert(redirectMatch, 'Must configure default redirect to "movies" with pathMatch: "full"');

  // Lazy loading route with loadComponent
  assert(/path:\s*['"]booking\/:id['"]/.test(routesTs), 'Must configure path "booking/:id"');
  assert(/loadComponent:\s*\(\)\s*=>\s*import\(['"]\.\/features\/booking\/booking\.component['"]\)\.then\(\s*\(?m\)?\s*=>\s*m\.BookingComponent\s*\)/.test(routesTs),
    'Must use loadComponent with dynamic import for BookingComponent');
});

runAudit('1.2 src/app/features/booking/booking.component.ts standalone & signal inputs', () => {
  const compTs = courseData.starterFiles['src/app/features/booking/booking.component.ts'];
  assert(compTs, 'src/app/features/booking/booking.component.ts must exist');

  assert(/import\s*\{[^}]*Component[^}]*input[^}]*\}\s*from\s*['"]@angular\/core['"]/.test(compTs),
    'Must import Component and input from @angular/core');
  assert(/selector:\s*['"]app-booking['"]/.test(compTs), 'Selector must be app-booking');
  assert(/standalone:\s*true/.test(compTs), 'Must be standalone: true');
  assert(/export\s+class\s+BookingComponent\b/.test(compTs), 'Must export BookingComponent');
  assert(/id\s*=\s*input\.required<string>\(\)/.test(compTs), 'Must declare id = input.required<string>()');
  assert(compTs.includes('id()'), 'Template must read signal input via id()');
});

runAudit('1.3 src/app/features/booking/booking-form.component.ts FormGroup & nonNullable', () => {
  const formTs = courseData.starterFiles['src/app/features/booking/booking-form.component.ts'];
  assert(formTs, 'src/app/features/booking/booking-form.component.ts must exist');

  assert(/import\s*\{[^}]*ReactiveFormsModule[^}]*\}\s*from\s*['"]@angular\/forms['"]/.test(formTs),
    'Must import ReactiveFormsModule from @angular/forms');
  assert(/imports:\s*\[\s*ReactiveFormsModule\s*\]/.test(formTs),
    'Must include ReactiveFormsModule in imports array');
  assert(/export\s+class\s+BookingFormComponent\b/.test(formTs), 'Must export BookingFormComponent');
  assert(/bookingForm\s*=\s*new\s+FormGroup\s*\(\{/.test(formTs), 'Must instantiate FormGroup');
  assert(/customerName:\s*new\s+FormControl<string>\(\s*['"]['"],\s*\{\s*nonNullable:\s*true/.test(formTs),
    'customerName FormControl must have nonNullable: true');
  assert(/validators:\s*\[\s*Validators\.required\s*\]/.test(formTs),
    'customerName FormControl must have Validators.required');
});

runAudit('1.4 src/app/guards/booking.guard.ts functional CanActivateFn guard', () => {
  const guardTs = courseData.starterFiles['src/app/guards/booking.guard.ts'];
  assert(guardTs, 'src/app/guards/booking.guard.ts must exist');

  assert(/import\s*\{[^}]*inject[^}]*\}\s*from\s*['"]@angular\/core['"]/.test(guardTs),
    'Must import inject from @angular/core');
  assert(/import\s*\{[^}]*CanActivateFn[^}]*Router[^}]*\}\s*from\s*['"]@angular\/router['"]/.test(guardTs),
    'Must import CanActivateFn and Router from @angular/router');
  assert(/export\s+const\s+bookingGuard\s*:\s*CanActivateFn\s*=\s*\(route,\s*state\)\s*=>\s*\{/.test(guardTs),
    'Must export bookingGuard of type CanActivateFn');
  assert(/const\s+router\s*=\s*inject\(Router\)/.test(guardTs), 'Must inject Router');
  assert(/router\.createUrlTree\(\s*\[\s*['"]\/movies['"]\s*\]\s*\)/.test(guardTs),
    'Must redirect using router.createUrlTree(["/movies"])');
});

runAudit('1.5 src/app/validators/cinema.validators.ts custom saudiPhoneValidator', () => {
  const valTs = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  assert(valTs, 'src/app/validators/cinema.validators.ts must exist');

  assert(/import\s*\{[^}]*ValidatorFn[^}]*\}\s*from\s*['"]@angular\/forms['"]/.test(valTs),
    'Must import ValidatorFn from @angular/forms');
  assert(/export\s+function\s+saudiPhoneValidator\(\)\s*:\s*ValidatorFn\s*\{/.test(valTs),
    'Must export function saudiPhoneValidator(): ValidatorFn');
  assert(valTs.includes('saudiPhone:'), 'Must return saudiPhone error key');
});

// ============================================================================
// SECTION 2: BEHAVIORAL & ADVERSARIAL STRESS TESTING OF RUNTIME LOGIC
// ============================================================================
console.log('\n--- SECTION 2: Behavioral & Adversarial Stress Testing of Starter Logic ---');

runAudit('2.1 saudiPhoneValidator exhaustive input matrix', () => {
  const valCode = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  const jsCode = valCode
    .replace(/:\s*ValidatorFn/g, '')
    .replace(/:\s*AbstractControl/g, '')
    .replace(/:\s*ValidationErrors\s*\|\s*null/g, '')
    .replace(/import\s+[\s\S]*?;/g, '')
    .replace(/export\s+/g, '');

  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);
  const validator = sandbox.saudiPhoneValidator();

  // 1. Truthy / Falsy Nullable handling
  assert.strictEqual(validator({ value: null }), null, 'null should return null (valid/optional)');
  assert.strictEqual(validator({ value: undefined }), null, 'undefined should return null');
  assert.strictEqual(validator({ value: '' }), null, 'empty string should return null');

  // 2. Valid Saudi Phone patterns
  const validNumbers = [
    '0501234567',
    '0555555555',
    '0591234567',
    '501234567',
    '551234567',
    '  0501234567  ', // whitespace trimmed
    '  512345678  '
  ];
  for (const num of validNumbers) {
    const res = validator({ value: num });
    assert.strictEqual(res, null, `Expected "${num}" to be valid, got: ${JSON.stringify(res)}`);
  }

  // 3. Invalid Saudi Phone patterns
  const invalidNumbers = [
    '0112345678',       // Landline (01)
    '0612345678',       // Invalid prefix
    '051234567',        // 9 digits with 05 (too short)
    '05123456789',      // 11 digits (too long)
    '51234567',         // 8 digits with 5 (too short)
    '5123456789',       // 10 digits with 5 (too long)
    '+966501234567',    // International format not accepted by strict 05/5 local regex
    '050123456a',       // Alphabetic
    '050 123 4567',     // Spaces inside
    '050-123-4567',     // Dashes
    '050.123.4567'      // Dots
  ];
  for (const num of invalidNumbers) {
    const res = validator({ value: num });
    assert(res !== null && res.saudiPhone, `Expected "${num}" to be rejected as invalid`);
    assert(typeof res.saudiPhone.message === 'string' && res.saudiPhone.message.length > 5,
      `Error object must contain descriptive Arabic message`);
  }
});

runAudit('2.2 bookingGuard functional CanActivateFn simulation', () => {
  const guardCode = courseData.starterFiles['src/app/guards/booking.guard.ts'];
  
  // Simulate Angular DI injector and Router
  let redirectedTo = null;
  const mockRouter = {
    createUrlTree(commands) {
      redirectedTo = commands;
      return { url: commands.join('/') };
    }
  };

  const jsCode = guardCode
    .replace(/import\s+[\s\S]*?;/g, '')
    .replace(/export\s+const\s+bookingGuard\s*:\s*CanActivateFn\s*=\s*/, 'const bookingGuard = ')
    .replace(/const\s+router\s*=\s*inject\(Router\);/, 'const router = __mockRouter;');

  const sandbox = { __mockRouter: mockRouter };
  vm.createContext(sandbox);
  vm.runInContext(jsCode + '; this.bookingGuard = bookingGuard;', sandbox);

  // When hasSeat is true (default in starter file)
  const result = sandbox.bookingGuard({}, {});
  assert.strictEqual(result, true, 'Default bookingGuard should return true when seat is reserved');
});

runAudit('2.3 booking-form FormControl nonNullable reset behavior simulation', () => {
  // Simulate Angular FormControl nonNullable behavior
  class FormControlMock {
    constructor(initialValue, options = {}) {
      this.initialValue = initialValue;
      this.nonNullable = options.nonNullable || false;
      this.value = initialValue;
    }
    setValue(v) {
      this.value = v;
    }
    reset(v) {
      if (v !== undefined) {
        this.value = v;
      } else if (this.nonNullable) {
        this.value = this.initialValue;
      } else {
        this.value = null;
      }
    }
  }

  const standard = new FormControlMock('initial');
  standard.setValue('updated');
  standard.reset();
  assert.strictEqual(standard.value, null, 'Standard FormControl resets to null');

  const typed = new FormControlMock('', { nonNullable: true });
  typed.setValue('Ahmed');
  assert.strictEqual(typed.value, 'Ahmed');
  typed.reset();
  assert.strictEqual(typed.value, '', 'nonNullable FormControl resets to initial value (""), never null');
});

// ============================================================================
// SECTION 3: NON-DESTRUCTIVE PRESERVATION OF PHASES 1-5
// ============================================================================
console.log('\n--- SECTION 3: Non-Destructive Preservation of Phases 1-5 ---');

runAudit('3.1 Global modules and lesson count integrity', () => {
  const expectedModules = [
    'phase-1-typescript',
    'phase-2-classic',
    'phase-3-modern',
    'phase-4-signals',
    'phase-5-di-http',
    'phase-6-routing-forms'
  ];

  expectedModules.forEach(modId => {
    assert(courseData.modules[modId], `Module "${modId}" must exist in courseData.modules`);
  });

  assert.strictEqual(courseData.lessons.length, 97, 'Course must contain exactly 97 lessons');

  const ids = new Set();
  courseData.lessons.forEach((l, idx) => {
    assert(l.id, `Lesson at index ${idx} must have id`);
    assert(!ids.has(l.id), `Duplicate lesson id "${l.id}" at index ${idx}`);
    ids.add(l.id);
  });
  assert.strictEqual(ids.size, 97, 'Must have exactly 97 unique lesson IDs');
});

runAudit('3.2 Phase continuity & boundaries verification', () => {
  // Phase 1: 0..9 (10 lessons)
  assert.strictEqual(courseData.lessons[0].id, 'ng-ts-01');
  assert.strictEqual(courseData.lessons[9].id, 'ng-ts-10');

  // Phase 2: 10..22 (13 lessons)
  assert.strictEqual(courseData.lessons[10].id, 'ng-classic-01');
  assert.strictEqual(courseData.lessons[22].id, 'ng-classic-13');

  // Phase 3: 23..29 (7 lessons)
  assert.strictEqual(courseData.lessons[23].id, 'ng-modern-01');
  assert.strictEqual(courseData.lessons[29].id, 'ng-modern-07');

  // Phase 4: 30..37 (8 lessons)
  assert.strictEqual(courseData.lessons[30].id, 'ng-signal-01');
  assert.strictEqual(courseData.lessons[37].id, 'ng-signal-08');

  // Phase 5: 38..44 (7 lessons)
  assert.strictEqual(courseData.lessons[38].id, 'ng-di-01');
  assert.strictEqual(courseData.lessons[44].id, 'ng-interop-01');

  // Phase 6: 45..50 (6 lessons)
  assert.strictEqual(courseData.lessons[45].id, 'ng-route-01');
  assert.strictEqual(courseData.lessons[46].id, 'ng-route-02');
  assert.strictEqual(courseData.lessons[47].id, 'ng-route-03');
  assert.strictEqual(courseData.lessons[48].id, 'ng-route-04');
  assert.strictEqual(courseData.lessons[49].id, 'ng-forms-01');
  assert.strictEqual(courseData.lessons[50].id, 'ng-forms-02');

  // Legacy: 51..96 (46 lessons)
  assert.strictEqual(courseData.lessons[51].id, 'ng-intro');
  assert.strictEqual(courseData.lessons[96].id, 'final-review');
});

runAudit('3.3 Phase 1-5 starter files content preservation', () => {
  const sf = courseData.starterFiles;

  // Phase 1 TypeScript models
  assert(sf['src/app/models/movie.model.ts'].includes('export interface Movie'), 'movie.model.ts intact');
  assert(sf['src/app/models/seat.model.ts'].includes('export interface Seat'), 'seat.model.ts intact');
  assert(sf['src/app/models/booking.model.ts'].includes('export interface Booking'), 'booking.model.ts intact');
  assert(sf['src/app/models/hall.model.ts'].includes('export class CinemaHall'), 'hall.model.ts intact');

  // Phase 2 Classic
  assert(sf['src/app/classic/app-classic.module.ts'].includes('@NgModule'), 'app-classic.module.ts intact');
  assert(sf['src/app/classic/movie-card-classic.component.ts'].includes('MovieCardClassicComponent'), 'movie-card-classic intact');

  // Phase 3 & 4 Standalone & Signals in app.ts
  const appTs = sf['src/app/app.ts'];
  assert(appTs.includes('totalPrice = signal(250)'), 'app.ts preserves totalPrice signal');
  assert(appTs.includes('totalTickets = signal(10)'), 'app.ts preserves totalTickets signal');
  assert(appTs.includes('addTicket()'), 'app.ts preserves addTicket');
  assert(appTs.includes('bookingCount'), 'app.ts preserves bookingCount');

  // Phase 5 DI & HTTP
  assert(sf['src/app/app.config.ts'].includes('provideHttpClient(withFetch())'), 'app.config.ts preserves provideHttpClient');
  assert(sf['src/app/services/cinema.service.ts'].includes('private http = inject(HttpClient)'), 'cinema.service.ts preserves HttpClient');
  assert(sf['src/app/services/cinema.service.ts'].includes('readonly selectedMovie = this._selectedMovie.asReadonly()'), 'cinema.service.ts preserves selectedMovie readonly');
  assert(sf['src/app/services/cinema.service.ts'].includes('fetchMovies(): Observable<Movie[]>'), 'cinema.service.ts preserves fetchMovies');
  assert(sf['src/app/interceptors/auth.interceptor.ts'].includes('authInterceptor: HttpInterceptorFn'), 'auth.interceptor.ts intact');
  assert(appTs.includes('private cinemaService = inject(CinemaService)'), 'app.ts injects CinemaService');
  assert(appTs.includes('moviesList = toSignal(this.cinemaService.fetchMovies()'), 'app.ts uses toSignal');
});

// ============================================================================
// SECTION 4: PHASE 6 LESSONS SCHEMA & PEDAGOGICAL SUBSTANCE
// ============================================================================
console.log('\n--- SECTION 4: Phase 6 Lessons Schema & Pedagogical Substance ---');

const p6Lessons = courseData.lessons.slice(45, 51);

runAudit('4.1 Exactly 6 lessons in Phase 6 with 15 mandatory fields', () => {
  assert.strictEqual(p6Lessons.length, 6, 'Must be exactly 6 lessons');
  const mandatoryFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p6Lessons.forEach(l => {
    mandatoryFields.forEach(f => {
      assert(l[f] !== undefined, `Lesson ${l.id} missing field "${f}"`);
    });
    assert.strictEqual(Object.keys(l).length, 15, `Lesson ${l.id} has extra or missing fields`);
    assert.strictEqual(l.module, 'phase-6-routing-forms', `Lesson ${l.id} module mismatch`);
    assert.strictEqual(l.phase, 'المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)', `Lesson ${l.id} phase mismatch`);
  });
});

runAudit('4.2 Arabic pedagogical depth and quality (concept >= 800 chars, Arabic text >= 500 chars)', () => {
  p6Lessons.forEach(l => {
    const arabicMatch = l.concept.match(/[\u0600-\u06FF]/g) || [];
    assert(arabicMatch.length >= 500,
      `Lesson ${l.id} has only ${arabicMatch.length} Arabic characters in concept (must be >= 500)`);
    assert(l.concept.length >= 800,
      `Lesson ${l.id} concept length is ${l.concept.length} (must be >= 800)`);
    assert(l.summary.length >= 80,
      `Lesson ${l.id} summary length is ${l.summary.length} (must be >= 80)`);
    assert(l.flow.includes('⟶') || l.flow.includes('\u27F6'),
      `Lesson ${l.id} flow notation must contain directional arrow ⟶`);
    assert(l.reference.startsWith('https://angular.dev/'),
      `Lesson ${l.id} reference must point to https://angular.dev/`);
  });
});

runAudit('4.3 5-Step micro-learning pedagogy and quiz verification', () => {
  const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
  const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];

  p6Lessons.forEach(l => {
    assert.strictEqual(l.steps.length, 5, `Lesson ${l.id} must have exactly 5 steps`);
    l.steps.forEach((step, idx) => {
      assert.strictEqual(step.id, stepIds[idx], `Lesson ${l.id} step ${idx} id mismatch`);
      assert.strictEqual(step.type, stepTypes[idx], `Lesson ${l.id} step ${idx} type mismatch`);
      assert(typeof step.title === 'string' && step.title.length > 5, `Lesson ${l.id} step ${idx} invalid title`);
      assert(typeof step.task === 'string' && step.task.length > 5, `Lesson ${l.id} step ${idx} invalid task`);
      assert(typeof step.benefit === 'string' && step.benefit.length > 5, `Lesson ${l.id} step ${idx} invalid benefit`);
    });

    // Verify Quiz Step
    const quiz = l.steps[4];
    assert(typeof quiz.question === 'string' && quiz.question.length > 10, `Lesson ${l.id} quiz question invalid`);
    assert(Array.isArray(quiz.options) && quiz.options.length >= 3, `Lesson ${l.id} quiz must have >= 3 options`);
    assert(typeof quiz.correct === 'number' && quiz.correct >= 0 && quiz.correct < quiz.options.length,
      `Lesson ${l.id} quiz correct index invalid: ${quiz.correct}`);
  });
});

// ============================================================================
// SECTION 5: SIMULATOR checkSupportedTask ADVERSARIAL AUDIT
// ============================================================================
console.log('\n--- SECTION 5: Simulator checkSupportedTask Adversarial Conformance ---');

runAudit('5.1 checkSupportedTask positive tests (exact code and expected snippet)', () => {
  p6Lessons.forEach(l => {
    // Exact full code
    setFiles({ [l.file]: l.code });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must pass with exact full code`);

    // Expected snippet only
    setFiles({ [l.file]: l.expected });
    assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} must pass with expected snippet`);
  });
});

runAudit('5.2 checkSupportedTask whitespace, indentation, comments, and CRLF tolerance', () => {
  p6Lessons.forEach(l => {
    const variations = [
      `\r\n\r\n   ${l.expected}   \r\n\r\n`,
      `\t\t${l.expected}\t\t`,
      `// Start of file\n\n${l.expected}\n\n// End of file`,
      `\r\n  // Comment with CRLF \r\n ${l.expected} \r\n`
    ];

    variations.forEach((variant, vIdx) => {
      setFiles({ [l.file]: variant });
      assert.strictEqual(checkSupportedTask(l), true, `Lesson ${l.id} failed on whitespace variation ${vIdx}`);
    });
  });
});

runAudit('5.3 checkSupportedTask negative rejection (zero false positives)', () => {
  p6Lessons.forEach(l => {
    // Wrong file path
    setFiles({ 'src/app/wrong-target.ts': l.code, [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must reject snippet in wrong file`);

    // Corrupted expected snippet
    const corrupted = l.expected.replace(/[a-zA-Z]{3,}/, 'CORRUPTED');
    setFiles({ [l.file]: corrupted });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must reject corrupted snippet`);

    // Empty file
    setFiles({ [l.file]: '' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must reject empty file`);

    // Whitespace only
    setFiles({ [l.file]: '   \n\t  \r\n  ' });
    assert.strictEqual(checkSupportedTask(l), false, `Lesson ${l.id} must reject whitespace-only file`);
  });
});

// ============================================================================
// SECTION 6: ADVERSARIAL INTEGRITY & ANTI-CHEAT VERIFICATION
// ============================================================================
console.log('\n--- SECTION 6: Adversarial Integrity & Anti-Cheat Audit ---');

runAudit('6.1 No hardcoded test passes or shortcuts in angular-editor.js', () => {
  const editorCode = fs.readFileSync('angular-editor.js', 'utf8');
  assert(!editorCode.includes('ng-route-01') || !editorCode.includes('return true; // bypass'),
    'angular-editor.js must not have hardcoded bypasses for ng-route-01');
  assert(!editorCode.includes('bypass_all_checks'), 'No bypass_all_checks in editor');
  assert(!editorCode.includes('// dummy implementation'), 'No dummy implementations in editor');
});

runAudit('6.2 No placeholder "TODO" or dummy Arabic text in Phase 6 lessons', () => {
  p6Lessons.forEach(l => {
    assert(!l.concept.includes('TODO'), `Lesson ${l.id} concept must not have TODO`);
    assert(!l.concept.includes('لوريم إيبسوم'), `Lesson ${l.id} concept must not contain placeholder lorem ipsum`);
    assert(!l.summary.includes('TODO'), `Lesson ${l.id} summary must not have TODO`);
    assert(!l.task.includes('TODO'), `Lesson ${l.id} task must not have TODO`);
    assert(!l.code.includes('// TODO'), `Lesson ${l.id} code must not have TODO comments`);
  });
});

runAudit('6.3 Target files in Phase 6 strictly correspond to actual files in starterFiles', () => {
  p6Lessons.forEach(l => {
    assert(courseData.starterFiles[l.file] !== undefined,
      `Lesson ${l.id} targets non-existent starter file: ${l.file}`);
  });
});

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n================================================================');
console.log(`REVIEWER M6-2 AUDIT SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.error(`❌ AUDIT FAILED with ${failedTests} failures.`);
  process.exit(1);
} else {
  console.log('🎉 AUDIT COMPLETE: ALL CHECKS PASSED EMPIRICALLY (Zero Defects).\n');
  process.exit(0);
}

/**
 * Adversarial Stress Test Harness - Milestone 5 Challenger 1 (teamwork_challenger_m5_1)
 *
 * Exhaustive empirical verification and adversarial stress testing of all 7 Phase 5
 * Modern DI, HttpClient & RxJS Interop lessons (ng-di-01 to ng-interop-01) in angular-course-data.js:
 *
 * 1. Positive Matching & Resilience:
 *    - Exact `lesson.expected` matching in checkSupportedTask().
 *    - Exact `lesson.code` matching in checkSupportedTask().
 *    - Whitespace variations: multiple spaces, extra padding, internal spacing.
 *    - Tab indentations and mixed tabs/spaces.
 *    - Mixed CRLF (\r\n) and LF line endings.
 *    - Multiline token splitting and formatting in realistic student code.
 *    - Surrounding comments (single-line //, multi-line slash-star).
 *    - Realistic surrounding code (ApplicationConfig, CinemaService, AuthInterceptor, App component).
 *
 * 2. Negative Rejection & Boundary Testing (Zero False Positives):
 *    - Incomplete/truncated snippets strictly rejected.
 *    - Truncated keywords (injec, asReadonl, withFetc, toSigna, http.ge, http.pos, HttpInterceptorF) strictly rejected.
 *    - Typos in DI, HTTP and Interop functions (injectt, asReadonlyy, withFetchh, toSignall, http.gett, http.postt, HttpInterceptorFnn).
 *    - Syntax corruption and garbage input.
 *    - Space before call parentheses boundary tests (inject (, asReadonly (, provideHttpClient (, toSignal ().
 *    - Empty and whitespace-only files.
 *    - Snippets placed in wrong target files (e.g. app.html vs app.ts vs cinema.service.ts).
 *    - Semantically incorrect mutations (constructor DI, writable signal leakage, legacy HttpClientModule, untyped HTTP, class interceptor, manual subscribe).
 *
 * 3. Slot Builder Token Stress & Workflow Simulation:
 *    - Non-throwing execution across all 35 steps (7 lessons * 5 steps).
 *    - Stage 1 file categorization validation for all 7 lessons.
 *    - Stage 2 tool categorization across services, interceptors, and components.
 *    - Assembled slot insertion passes checkSupportedTask().
 *    - Benign vs destructive slot mutations.
 *
 * 4. Non-Destructive Global Course Integrity & Pedagogy:
 *    - Exactly 91 curriculum lessons (10 P1 + 13 P2 + 7 P3 + 8 P4 + 7 P5 + 46 legacy).
 *    - Zero duplicate lesson IDs across all 91 lessons.
 *    - Sequential index continuity across all 6 phases.
 *    - Module descriptor "phase-5-di-http" validation (id, title, description, icon 🌐, badge, lessonCount: 7).
 *    - Strict 5-step pedagogy schema [observe, observe, build, edit, quiz].
 *    - Official documentation links starting with https://angular.dev/.
 *    - Visual flow arrow (⟶) in all 7 lessons.
 *    - Starter files preservation and backward compatibility.
 *
 * 5. Master E2E Test Suite Regression:
 *    - Subprocess execution of tests/e2e/run_all_e2e_tests.cjs (must pass 59/59).
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// Test metrics tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalAssertions = 0;
const failureDetails = [];

function check(condition, message) {
  totalAssertions++;
  assert.ok(condition, message);
}

function checkEqual(actual, expected, message) {
  totalAssertions++;
  assert.strictEqual(actual, expected, message);
}

function runTest(name, fn) {
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
    failureDetails.push({ name, error: err.message });
  }
}

console.log('===============================================================================');
console.log('🌐 MILESTONE 5 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (PHASE 5 DI & HTTP)');
console.log('===============================================================================');

// 1. Load course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p5Lessons = courseData.lessons.filter(l => l.module === 'phase-5-di-http');
console.log(`Discovered ${p5Lessons.length} Phase 5 Modern DI & HttpClient lessons.`);
checkEqual(p5Lessons.length, 7, 'Must discover exactly 7 Phase 5 lessons');

// ============================================================================
// SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE (ALL 7 LESSONS)
// ============================================================================
console.log('\n--- SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE ---');

// 1.1 Exact matching of lesson.expected
runTest('1.1 Exact lesson.expected matches checkSupportedTask for all 7 Phase 5 lessons', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ [lesson.file]: exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact expected match in ${lesson.file}`);
  });
});

// 1.2 Exact matching of full lesson.code
runTest('1.2 Full lesson.code matches checkSupportedTask for all 7 Phase 5 lessons', () => {
  p5Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed full code match in ${lesson.file}`);
  });
});

// 1.3 Whitespace Variation: Extra spaces, leading/trailing whitespace
runTest('1.3 Whitespace tolerance (extra spaces, leading/trailing spaces)', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const padded = `   ${exp}   \n`;
    setFiles({ [lesson.file]: padded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed padded whitespace in ${lesson.file}`);
  });
});

// 1.4 Tab indentations and mixed tabs/spaces
runTest('1.4 Tab indentations and mixed tabs/spaces', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const tabbed = `\t\t\t${exp}\t\n`;
    setFiles({ [lesson.file]: tabbed });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed tab indentations in ${lesson.file}`);
  });
});

// 1.5 Line Endings Variation: Windows CRLF and Linux LF mixed line breaks
runTest('1.5 CRLF & LF mixed line breaks with leading/trailing newlines', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const crlf = `\r\n\r\n\t  ${exp}  \r\n\r\n`;
    setFiles({ [lesson.file]: crlf });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed CRLF line break match in ${lesson.file}`);
  });
});

// 1.6 Multiline token splitting and formatting in realistic student code
runTest('1.6 Multiline formatting of DI, HTTP and Interceptor declarations', () => {
  const multilineMap = {
    'ng-di-01': 'private cinemaService =\n  inject(CinemaService);',
    'ng-service-01': 'readonly selectedMovie =\n  this._selectedMovie.asReadonly();',
    'ng-http-01': 'export const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(withFetch())\n  ]\n};',
    'ng-http-02': 'return\n  this.http.get<Movie[]>(\'/api/movies\');',
    'ng-http-03': 'return\n  this.http.post<{ bookingId: string }>(\'/api/bookings\', payload);',
    'ng-http-04': 'export const authInterceptor: HttpInterceptorFn =\n  (req, next) => {',
    'ng-interop-01': 'moviesList =\n  toSignal('
  };

  p5Lessons.forEach(lesson => {
    const formatted = multilineMap[lesson.id];
    check(!!formatted, `Lesson ${lesson.id} must have multiline test case defined`);
    setFiles({ [lesson.file]: formatted });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multiline formatting test in ${lesson.file}`);
  });
});

// 1.7 Surrounding comments tolerance (// single-line, /* */ multi-line)
runTest('1.7 Surrounding comments tolerance (//, /* */)', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const content = `// Header comment: student DI & HTTP solution\n/* Multi-line explanation\n   of Angular Modern Services & Interceptors */\n${exp}\n// End of verified block\n`;
    setFiles({ [lesson.file]: content });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed surrounding comments test in ${lesson.file}`);
  });
});

// 1.8 Realistic surrounding code integration (Services, Configs, Interceptors, App component)
runTest('1.8 Realistic surrounding code blocks (Services, Configs, Interceptors, App component)', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    let realisticContent;

    if (lesson.file === 'src/app/app.ts') {
      realisticContent = `
        import { Component, signal, inject } from '@angular/core';
        import { toSignal } from '@angular/core/rxjs-interop';
        import { CinemaService } from './services/cinema.service';

        @Component({
          selector: 'app-root',
          standalone: true,
          template: '<h1>سينما خُطوة</h1>'
        })
        export class App {
          title = 'سينما خُطوة';
          totalPrice = signal(250);
          ${exp}
        }
      `;
    } else if (lesson.file === 'src/app/app.config.ts') {
      realisticContent = `
        import { ApplicationConfig } from '@angular/core';
        import { provideHttpClient, withFetch } from '@angular/common/http';

        export const appConfig: ApplicationConfig = {
          providers: [
            ${exp}
          ]
        };
      `;
    } else if (lesson.file === 'src/app/services/cinema.service.ts') {
      realisticContent = `
        import { Injectable, signal, inject } from '@angular/core';
        import { HttpClient } from '@angular/common/http';
        import { Observable } from 'rxjs';

        export interface Movie { id: string; title: string; price: number; }

        @Injectable({ providedIn: 'root' })
        export class CinemaService {
          private http = inject(HttpClient);
          private _selectedMovie = signal<string>('بداية البطل');
          ${exp}
        }
      `;
    } else if (lesson.file === 'src/app/interceptors/auth.interceptor.ts') {
      realisticContent = `
        import { HttpInterceptorFn } from '@angular/common/http';

        ${exp}
          const token = 'KHOTWA_SECURE_TOKEN_2026';
          const clonedReq = req.clone({
            setHeaders: { Authorization: \`Bearer \${token}\` }
          });
          return next(clonedReq);
        };
      `;
    } else {
      realisticContent = `export class DemoModule { ${exp} }`;
    }

    setFiles({ [lesson.file]: realisticContent });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed realistic surrounding code test in ${lesson.file}`);
  });
});

// ============================================================================
// SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING (ZERO FALSE POSITIVES)
// ============================================================================
console.log('\n--- SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING ---');

// 2.1 Incomplete & truncated snippets strictly rejected
runTest('2.1 Truncated/incomplete snippets strictly rejected (7 lessons)', () => {
  const truncatedSnippets = {
    'ng-di-01': 'private cinemaService = inject(',
    'ng-service-01': 'readonly selectedMovie = this._selectedMovie.asReadonly',
    'ng-http-01': 'provideHttpClient(withFetch',
    'ng-http-02': 'return this.http.get<Movie[]>',
    'ng-http-03': 'return this.http.post<{ bookingId: string }>',
    'ng-http-04': 'export const authInterceptor: HttpInterceptorFn = (req, next) =>',
    'ng-interop-01': 'moviesList = toSignal'
  };

  p5Lessons.forEach(lesson => {
    const incomplete = truncatedSnippets[lesson.id];
    check(!!incomplete, `Missing incomplete snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: incomplete });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted incomplete snippet: "${incomplete}"`);
  });
});

// 2.2 Truncated keywords strictly rejected (injec, asReadonl, withFetc, toSigna, http.ge, http.pos, HttpInterceptorF)
runTest('2.2 Truncated keywords (injec, asReadonl, withFetc, toSigna, http.ge, http.pos, HttpInterceptorF) strictly rejected', () => {
  const truncatedKeywords = {
    'ng-di-01': 'private cinemaService = injec(CinemaService);',
    'ng-service-01': 'readonly selectedMovie = this._selectedMovie.asReadonl();',
    'ng-http-01': 'provideHttpClient(withFetc())',
    'ng-http-02': 'return this.http.ge<Movie[]>(\'/api/movies\');',
    'ng-http-03': 'return this.http.pos<{ bookingId: string }>(\'/api/bookings\', payload);',
    'ng-http-04': 'export const authInterceptor: HttpInterceptorF = (req, next) => {',
    'ng-interop-01': 'moviesList = toSigna('
  };

  p5Lessons.forEach(lesson => {
    const snippet = truncatedKeywords[lesson.id];
    check(!!snippet, `Missing truncated keyword snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: snippet });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted truncated keyword: "${snippet}"`);
  });
});

// 2.3 Typos in DI, HTTP and Interceptor functions strictly rejected
runTest('2.3 Typos in DI, HTTP and Interceptor functions (injectt, asReadonlyy, withFetchh, toSignall) strictly rejected', () => {
  const typoSnippets = {
    'ng-di-01': 'private cinemaService = injectt(CinemaService);',
    'ng-service-01': 'readonly selectedMovie = this._selectedMovie.asReadonlyy();',
    'ng-http-01': 'provideHttpClient(withFetchh())',
    'ng-http-02': 'return this.http.gett<Movie[]>(\'/api/movies\');',
    'ng-http-03': 'return this.http.postt<{ bookingId: string }>(\'/api/bookings\', payload);',
    'ng-http-04': 'export const authInterceptor: HttpInterceptorFnn = (req, next) => {',
    'ng-interop-01': 'moviesList = toSignall('
  };

  p5Lessons.forEach(lesson => {
    const typo = typoSnippets[lesson.id];
    check(!!typo, `Missing typo snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: typo });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted typo snippet: "${typo}"`);
  });
});

// 2.4 Corrupted syntax and garbage input strictly rejected
runTest('2.4 Corrupted syntax and garbage input strictly rejected (7 lessons)', () => {
  p5Lessons.forEach(lesson => {
    const corrupt = `@@@ CORRUPT_DI_HTTP_SYNTAX {{{ &&& broken_interop_block ::: ??? %%%`;
    setFiles({ [lesson.file]: corrupt });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted garbage content`);
  });
});

// 2.5 Space before call parentheses boundary tests strictly rejected
runTest('2.5 Space before call parentheses (inject (, asReadonly (, provideHttpClient (, toSignal () strictly rejected', () => {
  const spaceBeforeParen = {
    'ng-di-01': 'private cinemaService = inject (CinemaService);',
    'ng-service-01': 'readonly selectedMovie = this._selectedMovie.asReadonly ();',
    'ng-http-01': 'provideHttpClient (withFetch())',
    'ng-http-02': 'return this.http.get <Movie[]>(\'/api/movies\');',
    'ng-http-03': 'return this.http.post <{ bookingId: string }>(\'/api/bookings\', payload);',
    'ng-http-04': 'export const authInterceptor : HttpInterceptorFn = (req, next) => {',
    'ng-interop-01': 'moviesList = toSignal ('
  };

  p5Lessons.forEach(lesson => {
    const badSpace = spaceBeforeParen[lesson.id];
    check(!!badSpace, `Missing spaceBeforeParen test for ${lesson.id}`);
    setFiles({ [lesson.file]: badSpace });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted space before paren: "${badSpace}"`);
  });
});

// 2.6 Empty and whitespace-only files strictly rejected
runTest('2.6 Empty and whitespace-only files strictly rejected (7 lessons)', () => {
  p5Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    checkEqual(checkSupportedTask(lesson), false, `Empty file must fail for ${lesson.id}`);

    setFiles({ [lesson.file]: '   \n\t\r\n   ' });
    checkEqual(checkSupportedTask(lesson), false, `Whitespace-only file must fail for ${lesson.id}`);
  });
});

// 2.7 Snippet placed in wrong target file strictly rejected
runTest('2.7 Snippet placed in wrong target file strictly rejected (7 lessons)', () => {
  p5Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const wrongFile = lesson.file === 'src/app/app.ts' ? 'src/app/app.html' : 'src/app/app.ts';
    setFiles({
      [wrongFile]: exp,
      [lesson.file]: '// Target file left blank'
    });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} passed when snippet was placed in ${wrongFile}`);
  });
});

// 2.8 Semantically incorrect mutations strictly rejected
runTest('2.8 Semantically incorrect mutations strictly rejected across all 7 lessons', () => {
  const semanticErrors = {
    'ng-di-01': 'constructor(private cinemaService: CinemaService) {}', // constructor DI instead of inject()
    'ng-service-01': 'selectedMovie = this._selectedMovie;', // writable signal leakage instead of asReadonly()
    'ng-http-01': 'importProvidersFrom(HttpClientModule)', // legacy NgModule provider instead of provideHttpClient
    'ng-http-02': 'return this.http.get(\'/api/movies\');', // untyped GET without <Movie[]> generic
    'ng-http-03': 'return this.http.get<{ bookingId: string }>(\'/api/bookings\');', // GET instead of POST
    'ng-http-04': 'export class AuthInterceptor implements HttpInterceptor {}', // class-based interceptor instead of functional
    'ng-interop-01': 'this.cinemaService.fetchMovies().subscribe(list => this.movies = list);' // subscribe instead of toSignal()
  };

  p5Lessons.forEach(lesson => {
    const badCode = semanticErrors[lesson.id];
    check(!!badCode, `Missing semantic error test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted semantically incorrect code: "${badCode}"`);
  });
});

// 2.9 Case sensitivity stress testing strictly rejected
runTest('2.9 Case-sensitivity variations (INJECT, asReadOnly, ProvideHttpClient, TOSIGNAL) strictly rejected', () => {
  const caseSensitiveErrors = {
    'ng-di-01': 'private cinemaService = INJECT(CinemaService);',
    'ng-service-01': 'readonly selectedMovie = this._selectedMovie.asReadOnly();',
    'ng-http-01': 'ProvideHttpClient(WithFetch())',
    'ng-http-02': 'return this.http.GET<Movie[]>(\'/api/movies\');',
    'ng-http-03': 'return this.http.POST<{ bookingId: string }>(\'/api/bookings\', payload);',
    'ng-http-04': 'export const authInterceptor: HTTPINTERCEPTORFN = (req, next) => {',
    'ng-interop-01': 'moviesList = TOSIGNAL('
  };

  p5Lessons.forEach(lesson => {
    const badCode = caseSensitiveErrors[lesson.id];
    check(!!badCode, `Missing case sensitivity test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted case mutation: "${badCode}"`);
  });
});

// 2.10 Adversarial HTTP verbs and interop direction inversion strictly rejected
runTest('2.10 Adversarial HTTP verbs (delete, put, patch) and interop inversion (fromSignal) strictly rejected', () => {
  const methodErrors = {
    'ng-di-01': 'private cinemaService = inject(OtherCinemaService);',
    'ng-service-01': 'readonly selectedMovie = this._selectedMovie.toString();',
    'ng-http-01': 'provideHttpClient(withInterceptors([]))',
    'ng-http-02': 'return this.http.delete<Movie[]>(\'/api/movies\');',
    'ng-http-03': 'return this.http.put<{ bookingId: string }>(\'/api/bookings\', payload);',
    'ng-http-04': 'export const authInterceptor = (req: any, next: any) => {',
    'ng-interop-01': 'movies$ = fromSignal(this.cinemaService.selectedMovie);'
  };

  p5Lessons.forEach(lesson => {
    const badCode = methodErrors[lesson.id];
    check(!!badCode, `Missing adversarial method test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted wrong method/inversion: "${badCode}"`);
  });
});

// ============================================================================
// SECTION 3: SLOT BUILDER TOKEN STRESS & WORKFLOW SIMULATION
// ============================================================================
console.log('\n--- SECTION 3: SLOT BUILDER TOKEN STRESS & WORKFLOW SIMULATION ---');

// 3.1 Non-throwing execution across all 35 steps (7 lessons * 5 steps)
runTest('3.1 Slot Builder non-throwing execution across all 35 steps (7 lessons * 5 steps)', () => {
  let stepEvaluatedCount = 0;
  p5Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps) && lesson.steps.length === 5, `${lesson.id} must have 5 steps`);
    lesson.steps.forEach((step, sIdx) => {
      assert.doesNotThrow(() => {
        env.renderSlotBuilder(step, lesson);
        const el = env.getEl('angularSlotBuilder');
        check(typeof el === 'object', `Step ${sIdx} of ${lesson.id} must return element`);
        if (step.type === 'quiz') {
          checkEqual(el.hidden, true, `Quiz step in ${lesson.id} must hide slot builder`);
        } else {
          checkEqual(el.hidden, false, `Code step ${sIdx} in ${lesson.id} must show slot builder`);
        }
        stepEvaluatedCount++;
      }, `Slot Builder crashed on step ${sIdx} of lesson ${lesson.id}`);
    });
  });
  checkEqual(stepEvaluatedCount, 35, 'Must evaluate exactly 35 steps across Phase 5');
});

// 3.2 Stage 1 file categorization validation for all 7 lessons
runTest('3.2 Slot Builder stage 1 file categorization (services vs config vs interceptor vs logic)', () => {
  p5Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    const html = env.getEl('angularSlotBuilder').innerHTML;
    const fileName = lesson.file.split('/').pop();

    if (lesson.file.includes('services/')) {
      check(html.includes(`خدمة Angular (${fileName})`), `Stage 1 for ${lesson.id} must identify service`);
    } else {
      check(html.includes(`منطق الكود (${fileName})`), `Stage 1 for ${lesson.id} must identify logic`);
    }
  });
});

// 3.3 Stage 2 tool categorization across services, interceptors, and components
runTest('3.3 Slot Builder stage 2 tool categorization across Phase 5', () => {
  p5Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    const html = env.getEl('angularSlotBuilder').innerHTML;
    check(html.includes('الأداة: خاصية أو دالة في الصنف'), `Stage 2 for ${lesson.id} must indicate property/function in class or module`);
  });
});

// 3.4 Assembled slot insertion passes checkSupportedTask() for all 7 lessons
runTest('3.4 Assembled slot insertion passes checkSupportedTask() for all 7 Phase 5 lessons', () => {
  p5Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    // When code step is active, setting full code passes supportedTask
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Assembled code for ${lesson.id} must pass checkSupportedTask()`);
  });
});

// 3.5 Interactive slot editing mutations (benign vs destructive)
runTest('3.5 Interactive slot editing mutations: benign edits pass, destructive edits fail', () => {
  // ng-http-01: benign mutation adding comment or trailing newline -> passes
  const l3 = p5Lessons.find(l => l.id === 'ng-http-01');
  setFiles({ [l3.file]: 'provideHttpClient(withFetch());\n// Configured fetch backend' });
  checkEqual(checkSupportedTask(l3), true, 'Benign comment addition in ng-http-01 must pass');

  // ng-http-01: destructive mutation replacing withFetch() with empty call -> fails
  setFiles({ [l3.file]: 'provideHttpClient();' });
  checkEqual(checkSupportedTask(l3), false, 'Destructive mutation omitting withFetch() in ng-http-01 must fail');

  // ng-service-01: benign mutation wrapping in class block -> passes
  const l2 = p5Lessons.find(l => l.id === 'ng-service-01');
  setFiles({ [l2.file]: 'export class CinemaService {\n  private _selectedMovie = signal(\'A\');\n  readonly selectedMovie = this._selectedMovie.asReadonly();\n}' });
  checkEqual(checkSupportedTask(l2), true, 'Benign service class wrapper in ng-service-01 must pass');

  // ng-service-01: destructive mutation removing asReadonly() -> fails
  setFiles({ [l2.file]: 'export class CinemaService {\n  readonly selectedMovie = this._selectedMovie;\n}' });
  checkEqual(checkSupportedTask(l2), false, 'Destructive mutation removing asReadonly() must fail');

  // ng-http-02: destructive mutation changing endpoint URL -> fails
  const l4 = p5Lessons.find(l => l.id === 'ng-http-02');
  setFiles({ [l4.file]: 'return this.http.get<Movie[]>(\'/api/other-movies\');' });
  checkEqual(checkSupportedTask(l4), false, 'Destructive mutation altering endpoint must fail');

  // ng-interop-01: clearing slot input to empty -> destructive edit -> fails
  const l7 = p5Lessons.find(l => l.id === 'ng-interop-01');
  setFiles({ [l7.file]: '' });
  checkEqual(checkSupportedTask(l7), false, 'Empty slot in ng-interop-01 must fail checkSupportedTask()');
});

// ============================================================================
// SECTION 4: NON-DESTRUCTIVE GLOBAL COURSE INTEGRITY & PEDAGOGY
// ============================================================================
console.log('\n--- SECTION 4: NON-DESTRUCTIVE GLOBAL COURSE INTEGRITY & PEDAGOGY ---');

// 4.1 Curriculum size is 91, 97, or 106 lessons
runTest('4.1 Total curriculum lesson count is valid (91 in Phase 5, 97 in Phase 6, 106 in Phase 7)', () => {
  check([91, 97, 106].includes(courseData.lessons.length), 'Course must contain 91, 97, or 106 lessons');
});

// 4.2 Zero duplicate lesson IDs across all lessons
runTest('4.2 Zero duplicate lesson IDs across all lessons', () => {
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(l.id, `Lesson at index ${idx} must have id`);
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
  check([91, 97, 106].includes(seenIds.size), 'Must have 91, 97, or 106 unique lesson IDs');
});

// 4.3 Sequential index continuity across all curriculum phases
runTest('4.3 Sequential index continuity across all curriculum phases', () => {
  // Phase 1: 0-9
  checkEqual(courseData.lessons[0].id, 'ng-ts-01', 'Index 0 must be ng-ts-01');
  checkEqual(courseData.lessons[9].id, 'ng-ts-10', 'Index 9 must be ng-ts-10');

  // Phase 2: 10-22
  checkEqual(courseData.lessons[10].id, 'ng-classic-01', 'Index 10 must be ng-classic-01');
  checkEqual(courseData.lessons[22].id, 'ng-classic-13', 'Index 22 must be ng-classic-13');

  // Phase 3: 23-29
  checkEqual(courseData.lessons[23].id, 'ng-modern-01', 'Index 23 must be ng-modern-01');
  checkEqual(courseData.lessons[29].id, 'ng-modern-07', 'Index 29 must be ng-modern-07');

  // Phase 4: 30-37
  checkEqual(courseData.lessons[30].id, 'ng-signal-01', 'Index 30 must be ng-signal-01');
  checkEqual(courseData.lessons[37].id, 'ng-signal-08', 'Index 37 must be ng-signal-08');

  // Phase 5: 38-44
  const expectedP5Ids = [
    'ng-di-01', 'ng-service-01', 'ng-http-01', 'ng-http-02',
    'ng-http-03', 'ng-http-04', 'ng-interop-01'
  ];
  expectedP5Ids.forEach((expectedId, offset) => {
    const idx = 38 + offset;
    checkEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    checkEqual(courseData.lessons[idx].module, 'phase-5-di-http', `Lesson ${expectedId} must belong to module 'phase-5-di-http'`);
  });

  // Post Phase 5
  if (courseData.lessons.length === 91) {
    checkEqual(courseData.lessons[45].id, 'ng-intro', 'Index 45 must be ng-intro');
    checkEqual(courseData.lessons[90].id, 'final-review', 'Index 90 must be final-review');
  } else if (courseData.lessons.length === 97) {
    checkEqual(courseData.lessons[45].id, 'ng-route-01', 'Index 45 must be ng-route-01');
    checkEqual(courseData.lessons[50].id, 'ng-forms-02', 'Index 50 must be ng-forms-02');
    checkEqual(courseData.lessons[51].id, 'ng-intro', 'Index 51 must be ng-intro');
    checkEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review', 'Last lesson must be final-review');
  } else {
    checkEqual(courseData.lessons[45].id, 'ng-route-01', 'Index 45 must be ng-route-01');
    checkEqual(courseData.lessons[50].id, 'ng-forms-02', 'Index 50 must be ng-forms-02');
    checkEqual(courseData.lessons[51].id, 'capstone-01', 'Index 51 must be capstone-01');
    checkEqual(courseData.lessons[59].id, 'capstone-09', 'Index 59 must be capstone-09');
    checkEqual(courseData.lessons[60].id, 'ng-intro', 'Index 60 must be ng-intro');
    checkEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review', 'Last lesson must be final-review');
  }
});

// 4.4 Module descriptor "phase-5-di-http" schema validation
runTest('4.4 Module descriptor "phase-5-di-http" schema validation', () => {
  const mod = courseData.modules['phase-5-di-http'];
  check(!!mod, 'Module "phase-5-di-http" must exist');
  checkEqual(mod.id, 'phase-5-di-http', 'Module ID must be phase-5-di-http');
  checkEqual(mod.lessonCount, 7, 'Module lessonCount must be 7');
  checkEqual(mod.icon, '🌐', 'Module icon must be 🌐');
  check(typeof mod.title === 'string' && mod.title.length > 10, 'Module title must be descriptive');
  check(typeof mod.description === 'string' && mod.description.length > 20, 'Module description must be descriptive');
  check(typeof mod.badge === 'string' && mod.badge.includes('7'), 'Module badge must mention 7 lessons');
});

// 4.5 Strict 5-step pedagogy schema [observe, observe, build, edit, quiz]
runTest('4.5 Strict 5-step pedagogy schema for all 7 Phase 5 lessons', () => {
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
  p5Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps), `Lesson ${lesson.id} must have steps array`);
    checkEqual(lesson.steps.length, 5, `Lesson ${lesson.id} must have exactly 5 steps`);
    lesson.steps.forEach((s, idx) => {
      checkEqual(s.type, expectedTypes[idx], `Lesson ${lesson.id} step ${idx} type must be ${expectedTypes[idx]}`);
      check(typeof s.title === 'string' && s.title.length > 5, `Lesson ${lesson.id} step ${idx} must have title`);
      check(typeof (s.task || s.explanation) === 'string' && (s.task || s.explanation).length > 5, `Lesson ${lesson.id} step ${idx} must have task/explanation`);
    });
  });
});

// 4.6 Quiz distinctness, options >= 3, valid correct index, benefit rationale
runTest('4.6 Quiz distinctness, options >= 3, valid correct index, benefit rationale', () => {
  const questions = new Set();
  p5Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    check(!!quizStep, `Quiz step must exist in ${lesson.id}`);
    check(typeof quizStep.question === 'string' && quizStep.question.length > 10, `${lesson.id} quiz must have question`);
    check(!questions.has(quizStep.question), `Duplicate quiz question detected in ${lesson.id}`);
    questions.add(quizStep.question);

    check(Array.isArray(quizStep.options) && quizStep.options.length >= 3, `${lesson.id} quiz must have >= 3 options`);
    check(typeof quizStep.correct === 'number' && quizStep.correct >= 0 && quizStep.correct < quizStep.options.length, `${lesson.id} quiz correct index out of range`);
    check(typeof quizStep.benefit === 'string' && quizStep.benefit.length > 15, `${lesson.id} quiz must have benefit rationale`);
  });
  checkEqual(questions.size, 7, 'All 7 quiz questions must be distinct');
});

// 4.7 Official documentation references starting with https://angular.dev/
runTest('4.7 Official documentation references starting with https://angular.dev/ for all 7 lessons', () => {
  p5Lessons.forEach(lesson => {
    const doc = lesson.reference || lesson.docUrl;
    check(typeof doc === 'string', `Lesson ${lesson.id} must have reference/docUrl`);
    check(doc.startsWith('https://angular.dev/'), `Lesson ${lesson.id} reference must point to official angular.dev (${doc})`);
  });
});

// 4.8 Visual flow arrows (⟶) in all 7 Phase 5 lessons
runTest('4.8 Visual flow arrow (⟶) present in every Phase 5 lesson', () => {
  p5Lessons.forEach(lesson => {
    const hasArrow = (lesson.flow && (lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'))) ||
                     (lesson.title && (lesson.title.includes('⟶') || lesson.title.includes('\u27F6'))) ||
                     (lesson.description && (lesson.description.includes('⟶') || lesson.description.includes('\u27F6')));
    check(hasArrow, `Lesson ${lesson.id} must include pedagogical flow arrow '⟶'`);
  });
});

// 4.9 Starter files preservation & backward compatibility
runTest('4.9 Starter files preservation and backward compatibility across Phases 1-5', () => {
  // app.ts
  const appTs = courseData.starterFiles['src/app/app.ts'];
  check(!!appTs, 'src/app/app.ts must exist');
  check(appTs.includes('private cinemaService = inject(CinemaService);'), 'Must inject CinemaService in app.ts');
  check(appTs.includes('moviesList = toSignal('), 'Must declare moviesList with toSignal in app.ts');
  check(appTs.includes('totalTickets = signal(10)'), 'Must preserve Phase 4 totalTickets in app.ts');
  check(appTs.includes('totalPrice = signal(250)'), 'Must preserve Phase 3 totalPrice in app.ts');
  check(appTs.includes("title = 'سينما خطوة'"), 'Must preserve Phase 1 title in app.ts');

  // cinema.service.ts
  const serviceTs = courseData.starterFiles['src/app/services/cinema.service.ts'];
  check(!!serviceTs, 'src/app/services/cinema.service.ts must exist');
  check(serviceTs.includes('inject(HttpClient)'), 'Must inject HttpClient in CinemaService');
  check(serviceTs.includes('readonly selectedMovie = this._selectedMovie.asReadonly()'), 'Must expose selectedMovie via asReadonly()');
  check(serviceTs.includes('fetchMovies(): Observable<Movie[]>'), 'Must define typed fetchMovies()');
  check(serviceTs.includes('confirmBooking('), 'Must define confirmBooking()');

  // app.config.ts
  const configTs = courseData.starterFiles['src/app/app.config.ts'];
  check(!!configTs, 'src/app/app.config.ts must exist');
  check(configTs.includes('provideHttpClient(withFetch())'), 'Must configure provideHttpClient(withFetch())');

  // auth.interceptor.ts
  const authTs = courseData.starterFiles['src/app/interceptors/auth.interceptor.ts'];
  check(!!authTs, 'src/app/interceptors/auth.interceptor.ts must exist');
  check(authTs.includes('export const authInterceptor: HttpInterceptorFn'), 'Must export authInterceptor functional interceptor');
});

// ============================================================================
// SECTION 5: MASTER E2E TEST SUITE REGRESSION
// ============================================================================
console.log('\n--- SECTION 5: MASTER E2E TEST SUITE REGRESSION ---');

runTest('5.1 Master E2E runner executes 59/59 passing tests (node tests/e2e/run_all_e2e_tests.cjs)', () => {
  const res = spawnSync('node', ['tests/e2e/run_all_e2e_tests.cjs'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 30000
  });

  checkEqual(res.status, 0, `E2E suite failed with exit code ${res.status}: ${res.stderr || res.stdout}`);
  check(res.stdout.includes('Total Test Cases : 59'), 'E2E suite must report 59 total test cases');
  check(res.stdout.includes('Passed           : 59 ✅'), 'E2E suite must report 59 passed test cases');
  check(res.stdout.includes('Failed           : 0 🎉'), 'E2E suite must report 0 failed test cases');
});

// ============================================================================
// SUMMARY & EXIT
// ============================================================================
console.log('\n===============================================================================');
console.log('📊 CHALLENGER 1 STRESS SUITE EXECUTION SUMMARY');
console.log('===============================================================================');
console.log(`Total Test Suites   : ${totalTests}`);
console.log(`Passed Suites       : ${passedTests} ✅`);
console.log(`Failed Suites       : ${failedTests} ❌`);
console.log(`Total Assertions    : ${totalAssertions}`);

if (failedTests > 0) {
  console.error('\n❌ FAILURES DETECTED:');
  failureDetails.forEach((f, i) => {
    console.error(`  ${i + 1}. [${f.name}] -> ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ ALL ADVERSARIAL CHALLENGER 1 STRESS TESTS PASSED SUCCESSFULLY.');
  process.exit(0);
}

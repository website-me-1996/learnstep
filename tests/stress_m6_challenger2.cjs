/**
 * tests/stress_m6_challenger2.cjs
 *
 * Khotwa Angular 22 Curriculum Rebuild - Milestone 6 Challenger 2
 * Empirical & Adversarial Stress Test Suite for Modern Routing & Typed Reactive Forms
 * (Phase 6: Lessons 46-51, ng-route-01 to ng-forms-02)
 *
 * TEST DIMENSIONS:
 * 1. Global Curriculum & Phase 6 Schema Integrity
 * 2. High-Fidelity Modern Routing Engine & Route URL Resolution Mechanics
 * 3. Dynamic loadComponent Resolution & Mock Async Imports
 * 4. Component Input Binding with Signals (withComponentInputBinding)
 * 5. Functional Guard Semantics (CanActivateFn) & Injection Context
 * 6. Typed Reactive Forms Mechanics & nonNullable Deep Verification
 * 7. Exhaustive Boundary & Adversarial Fuzzing of saudiPhoneValidator
 * 8. High-Volume Simulator Stress Testing & Fuzzing
 * 9. Master E2E Runner Subprocess Execution
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const vm = require('node:vm');
const { execSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// Test Metrics
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

function checkDeepEqual(actual, expected, message) {
  totalAssertions++;
  assert.deepStrictEqual(actual, expected, message);
}

async function runTest(section, name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  [PASS] ${section} - ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${section} - ${name}`);
    console.error(`         Error: ${err.message}`);
    if (err.stack) {
      const line = err.stack.split('\n')[2];
      if (line) console.error(`         Location: ${line.trim()}`);
    }
    failureDetails.push({ section, name, error: err.message, stack: err.stack });
  }
}

// Load Course Data & Editor Environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles, runSimulatedPreview, getPreviewSrcdoc, setActivePath } = env;

const p6Lessons = courseData.lessons.filter(l => l.module === 'phase-6-routing-forms');

// ============================================================================
// HIGH-FIDELITY SPECIFICATION ENGINES
// ============================================================================

/**
 * High-Fidelity Angular 22 Route Matching Simulation Engine
 */
class AngularRouteMatcher {
  constructor(routes = []) {
    this.routes = routes;
  }

  parseUrl(url) {
    const [pathPart, queryPart] = url.split('?');
    const segments = pathPart.split('/').filter(s => s.length > 0);
    const queryParams = {};
    if (queryPart) {
      queryPart.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) queryParams[decodeURIComponent(k)] = v ? decodeURIComponent(v) : '';
      });
    }
    return { rawUrl: url, segments, queryParams };
  }

  match(url, currentRedirects = 0) {
    if (currentRedirects > 10) {
      throw new Error('NG04014: Infinite redirect loop detected (redirect depth exceeded limit of 10)');
    }

    const parsed = typeof url === 'string' ? this.parseUrl(url) : url;
    const { segments, queryParams } = parsed;

    for (const route of this.routes) {
      // 1. Wildcard route
      if (route.path === '**') {
        return {
          matchedRoute: route,
          params: {},
          queryParams,
          component: route.component || route.loadComponent,
          urlTree: parsed
        };
      }

      // 2. Empty path handling
      if (route.path === '') {
        const isFull = route.pathMatch === 'full';
        const isMatch = isFull ? segments.length === 0 : true;

        if (isMatch) {
          if (route.redirectTo) {
            // Emulate Angular prefix redirect loop detection
            if (!isFull && route.redirectTo !== '') {
              // Prefix match on empty string with redirectTo triggers infinite redirect loop
              return this.match(route.redirectTo, currentRedirects + 1);
            }
            return this.match(route.redirectTo, currentRedirects + 1);
          }
          return {
            matchedRoute: route,
            params: {},
            queryParams,
            component: route.component || route.loadComponent,
            urlTree: parsed
          };
        }
        continue;
      }

      // 3. Segmented path handling
      const routeSegments = route.path.split('/').filter(s => s.length > 0);
      const isFull = route.pathMatch === 'full';

      if (isFull && segments.length !== routeSegments.length) {
        continue;
      }
      if (!isFull && segments.length < routeSegments.length) {
        continue;
      }

      const params = {};
      let match = true;

      for (let i = 0; i < routeSegments.length; i++) {
        const rSeg = routeSegments[i];
        const uSeg = segments[i];

        if (rSeg.startsWith(':')) {
          const paramName = rSeg.slice(1);
          // Split matrix parameters if present (;key=val)
          const [cleanSeg] = uSeg.split(';');
          params[paramName] = decodeURIComponent(cleanSeg);
        } else if (rSeg !== uSeg) {
          match = false;
          break;
        }
      }

      if (match) {
        if (route.redirectTo) {
          return this.match(route.redirectTo, currentRedirects + 1);
        }
        return {
          matchedRoute: route,
          params,
          queryParams,
          component: route.component || route.loadComponent,
          urlTree: parsed
        };
      }
    }

    return null; // No route matched
  }
}

// Signal & Signal Input Emulation
function createSignalInput(initialValue, isRequired = false) {
  let val = initialValue;
  let hasValue = initialValue !== undefined;

  const fn = function() {
    if (isRequired && !hasValue) {
      throw new Error('NG0950: Input is required but no value is available yet.');
    }
    return val;
  };

  fn.__isSignalInput = true;
  fn.__setFromRoute = function(newVal) {
    val = String(newVal);
    hasValue = true;
  };

  return fn;
}

const input = {
  required: () => createSignalInput(undefined, true),
  optional: (def) => createSignalInput(def, false)
};

class SimulatedBookingComponent {
  constructor() {
    this.id = input.required();
  }

  getTitle() {
    return `حجز الفيلم رقم: ${this.id()}`;
  }
}

// DI Injection Context Emulation
let currentInjector = null;

function runInInjectionContext(injector, fn) {
  const prev = currentInjector;
  currentInjector = injector;
  try {
    return fn();
  } finally {
    currentInjector = prev;
  }
}

function inject(token) {
  if (!currentInjector) {
    throw new Error('NG0203: inject() must be called from an injection context such as a constructor, factory function, or CanActivateFn.');
  }
  return currentInjector.get(token);
}

class MockRouter {
  createUrlTree(commands) {
    return {
      __isUrlTree: true,
      path: commands.join('/')
    };
  }
}

class MockBookingComponent {
  constructor(id) {
    this.id = id;
    this.rendered = true;
  }
}

// Typed Reactive Forms Engine
class FormControl {
  constructor(initialValue = null, options = {}) {
    this._initialValue = initialValue;
    this.nonNullable = Boolean(options.nonNullable);
    this.validators = options.validators || [];
    this.value = initialValue;
    this.status = 'VALID';
    this.errors = null;
    this.dirty = false;
    this.pristine = true;
    this.touched = false;
    this.untouched = true;
    this.disabled = false;

    this.updateValueAndValidity();
  }

  setValue(val) {
    this.value = val;
    this.dirty = true;
    this.pristine = false;
    this.updateValueAndValidity();
  }

  reset(newVal) {
    if (newVal !== undefined) {
      this.value = newVal;
    } else if (this.nonNullable) {
      this.value = this._initialValue;
    } else {
      this.value = null;
    }
    this.dirty = false;
    this.pristine = true;
    this.touched = false;
    this.untouched = true;
    this.updateValueAndValidity();
  }

  markAsTouched() {
    this.touched = true;
    this.untouched = false;
  }

  disable() {
    this.disabled = true;
    this.status = 'DISABLED';
    this.errors = null;
  }

  enable() {
    this.disabled = false;
    this.updateValueAndValidity();
  }

  updateValueAndValidity() {
    if (this.disabled) {
      this.status = 'DISABLED';
      this.errors = null;
      return;
    }

    let combinedErrors = null;
    for (const v of this.validators) {
      const err = v(this);
      if (err) {
        if (!combinedErrors) combinedErrors = {};
        Object.assign(combinedErrors, err);
      }
    }

    this.errors = combinedErrors;
    this.status = combinedErrors ? 'INVALID' : 'VALID';
  }
}

class FormGroup {
  constructor(controls = {}) {
    this.controls = controls;
  }

  get value() {
    const val = {};
    for (const [k, ctrl] of Object.entries(this.controls)) {
      if (!ctrl.disabled) {
        val[k] = ctrl.value;
      }
    }
    return val;
  }

  get valid() {
    return Object.values(this.controls).every(c => c.status === 'VALID' || c.status === 'DISABLED');
  }

  get invalid() {
    return !this.valid;
  }

  getRawValue() {
    const val = {};
    for (const [k, ctrl] of Object.entries(this.controls)) {
      val[k] = ctrl.value;
    }
    return val;
  }

  reset() {
    for (const ctrl of Object.values(this.controls)) {
      ctrl.reset();
    }
  }

  markAllAsTouched() {
    for (const ctrl of Object.values(this.controls)) {
      ctrl.markAsTouched();
    }
  }
}

const Validators = {
  required: (ctrl) => {
    const val = ctrl.value;
    if (val === null || val === undefined || (typeof val === 'string' && val.trim().length === 0)) {
      return { required: true };
    }
    return null;
  },
  minLength: (min) => (ctrl) => {
    if (!ctrl.value) return null;
    return String(ctrl.value).length < min ? { minlength: { requiredLength: min, actualLength: String(ctrl.value).length } } : null;
  }
};

// ============================================================================
// MAIN ADVERSARIAL TEST RUNNER
// ============================================================================
async function runAllTests() {
  console.log('===============================================================================');
  console.log('🚦 EMPIRICAL CHALLENGER 2: ADVERSARIAL STRESS SUITE (MILESTONE 6: ROUTING & FORMS)');
  console.log('===============================================================================');

  // --- SECTION 1: GLOBAL CURRICULUM & PHASE 6 SCHEMA INTEGRITY ---
  console.log('\n--- SECTION 1: Global Curriculum & Phase 6 Schema Integrity ---');

  await runTest('SEC-1.1', 'Total lesson count is exactly 97 with zero duplicate IDs', () => {
    checkEqual(courseData.lessons.length, 97, 'Course must have 97 lessons');
    const ids = new Set();
    courseData.lessons.forEach((l, idx) => {
      check(l.id && typeof l.id === 'string', `Lesson at index ${idx} missing id`);
      check(!ids.has(l.id), `Duplicate lesson id "${l.id}" at index ${idx}`);
      ids.add(l.id);
    });
    checkEqual(ids.size, 97, 'All 97 lesson IDs must be unique');
  });

  await runTest('SEC-1.2', 'Phase 6 module metadata conforms strictly to curriculum spec', () => {
    const mod = courseData.modules['phase-6-routing-forms'];
    check(mod !== undefined, 'Module phase-6-routing-forms must be registered');
    checkEqual(mod.id, 'phase-6-routing-forms', 'Module id must match');
    checkEqual(mod.icon, '🚦', 'Module icon must be 🚦');
    checkEqual(mod.lessonCount, 6, 'Module lessonCount must be 6');
    check(mod.title.includes('التوجيه') || mod.title.includes('النماذج'), 'Title must describe routing/forms');
    check(mod.badge.includes('6 دروس'), 'Badge must state 6 دروس');
    check(mod.description.length >= 30, 'Module description must be descriptive');
  });

  await runTest('SEC-1.3', 'Phase 6 lessons occupy sequential indices 45 through 50', () => {
    const expectedP6 = [
      'ng-route-01', 'ng-route-02', 'ng-route-03',
      'ng-route-04', 'ng-forms-01', 'ng-forms-02'
    ];
    checkEqual(p6Lessons.length, 6, 'Must have exactly 6 lessons in Phase 6');
    expectedP6.forEach((id, i) => {
      const lesson = courseData.lessons[45 + i];
      checkEqual(lesson.id, id, `Index ${45 + i} must be ${id}`);
      checkEqual(lesson.module, 'phase-6-routing-forms', `Module must be phase-6-routing-forms`);
      checkEqual(p6Lessons[i].id, id, `P6 array index ${i} must be ${id}`);
    });
  });

  await runTest('SEC-1.4', 'All 6 Phase 6 lessons have all 15 required schema keys with no extra keys', () => {
    const requiredKeys = [
      'id', 'module', 'phase', 'title', 'duration', 'level',
      'summary', 'concept', 'flow', 'task', 'file', 'code',
      'expected', 'reference', 'steps'
    ].sort();

    p6Lessons.forEach(lesson => {
      const actualKeys = Object.keys(lesson).sort();
      checkDeepEqual(actualKeys, requiredKeys, `Lesson ${lesson.id} keys mismatch`);
    });
  });

  await runTest('SEC-1.5', 'Pedagogical substance: Arabic character volume, official angular.dev references, directional arrows', () => {
    p6Lessons.forEach(lesson => {
      const arabicCount = (lesson.concept.match(/[\u0600-\u06FF]/g) || []).length;
      check(arabicCount >= 500, `Lesson ${lesson.id} must have >= 500 Arabic chars in concept, got ${arabicCount}`);
      check(lesson.summary.length >= 80, `Lesson ${lesson.id} summary must be >= 80 chars`);
      check(lesson.reference.startsWith('https://angular.dev/'), `Lesson ${lesson.id} reference must be angular.dev`);
      check(lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'), `Lesson ${lesson.id} flow must have arrow ⟶`);
      check(courseData.starterFiles[lesson.file] !== undefined, `Lesson target file ${lesson.file} must exist in starterFiles`);
    });
  });

  await runTest('SEC-1.6', '5-step micro-learning structure and distinct quiz verification', () => {
    const stepIds = ['idea', 'anatomy', 'practice', 'experiment', 'quiz'];
    const stepTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
    const quizQuestions = new Set();

    p6Lessons.forEach(lesson => {
      checkEqual(lesson.steps.length, 5, `Lesson ${lesson.id} must have 5 steps`);
      lesson.steps.forEach((step, sIdx) => {
        checkEqual(step.id, stepIds[sIdx], `Step ${sIdx} id mismatch in ${lesson.id}`);
        checkEqual(step.type, stepTypes[sIdx], `Step ${sIdx} type mismatch in ${lesson.id}`);
        check(step.title.length > 5, `Step ${sIdx} title missing in ${lesson.id}`);
        check(step.task.length > 5, `Step ${sIdx} task missing in ${lesson.id}`);
        check(step.benefit.length > 5, `Step ${sIdx} benefit missing in ${lesson.id}`);
      });

      const quiz = lesson.steps[4];
      check(!quizQuestions.has(quiz.question), `Duplicate quiz question in ${lesson.id}`);
      quizQuestions.add(quiz.question);
      check(Array.isArray(quiz.options) && quiz.options.length >= 3, `Quiz in ${lesson.id} must have >= 3 options`);
      check(quiz.correct >= 0 && quiz.correct < quiz.options.length, `Quiz correct index out of range in ${lesson.id}`);
    });
  });

  // --- SECTION 2: MODERN ROUTING ENGINE & ROUTE URL RESOLUTION ---
  console.log('\n--- SECTION 2: Modern Routing Engine & Route URL Resolution Mechanics ---');

  await runTest('SEC-2.1', 'Default root redirect with pathMatch: full correctly redirects to movies', () => {
    const routes = [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: 'movies', component: 'MoviesComponent' },
      { path: 'booking/:id', component: 'BookingComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const res1 = matcher.match('');
    check(res1 !== null, 'Empty string must match redirect');
    checkEqual(res1.matchedRoute.path, 'movies');
    checkEqual(res1.component, 'MoviesComponent');

    const res2 = matcher.match('/');
    check(res2 !== null, '/ must match redirect');
    checkEqual(res2.matchedRoute.path, 'movies');
  });

  await runTest('SEC-2.2', 'pathMatch: full prevents empty root route from matching subroutes as prefix', () => {
    const routes = [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: 'movies', component: 'MoviesComponent' },
      { path: 'booking/:id', component: 'BookingComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const res = matcher.match('/booking/42');
    check(res !== null, '/booking/42 must match booking route');
    checkEqual(res.matchedRoute.path, 'booking/:id');
    checkEqual(res.params.id, '42');
    checkEqual(res.component, 'BookingComponent');
  });

  await runTest('SEC-2.3', 'Adversarial: Omitting pathMatch: full on empty path triggers infinite redirect loop', () => {
    const badRoutes = [
      { path: '', redirectTo: 'movies' }, // Missing pathMatch: 'full', defaults to prefix
      { path: 'movies', component: 'MoviesComponent' }
    ];
    const matcher = new AngularRouteMatcher(badRoutes);

    let errorThrown = false;
    try {
      matcher.match('');
    } catch (err) {
      errorThrown = true;
      check(err.message.includes('NG04014') || err.message.includes('Infinite redirect loop'), 'Must report redirect loop');
    }
    check(errorThrown, 'Omitting pathMatch: full on empty path redirect MUST trigger loop detection');
  });

  await runTest('SEC-2.4', 'Parameterized route booking/:id extracts clean parameter values', () => {
    const routes = [
      { path: 'booking/:id', component: 'BookingComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const testIds = ['1', '999', 'interstellar-imax', 'c_123_x'];
    testIds.forEach(idVal => {
      const res = matcher.match(`/booking/${idVal}`);
      check(res !== null, `Route for ID ${idVal} must match`);
      checkEqual(res.params.id, idVal, `Extracted ID must be ${idVal}`);
    });
  });

  await runTest('SEC-2.5', 'Parameterized route decodes URL-encoded parameters correctly', () => {
    const routes = [
      { path: 'booking/:id', component: 'BookingComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const res = matcher.match('/booking/VIP%20Hall%234');
    check(res !== null, 'Must match encoded URL');
    checkEqual(res.params.id, 'VIP Hall#4', 'Parameter must be cleanly decoded');
  });

  await runTest('SEC-2.6', 'Adversarial: Route matching fails properly on segment count mismatch or missing params', () => {
    const routes = [
      { path: 'booking/:id', component: 'BookingComponent', pathMatch: 'full' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    checkEqual(matcher.match('/booking'), null, '/booking without ID must not match booking/:id');
    checkEqual(matcher.match('/booking/'), null, '/booking/ without ID must not match booking/:id');
    checkEqual(matcher.match('/booking/42/confirm'), null, '/booking/42/confirm must not match when pathMatch is full');
    checkEqual(matcher.match('/other/path'), null, 'Unrelated route must return null');
  });

  await runTest('SEC-2.7', 'Query parameters and matrix parameters do not corrupt route params', () => {
    const routes = [
      { path: 'booking/:id', component: 'BookingComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const res = matcher.match('/booking/55;seat=B12;tier=vip?discount=20&promo=SUMMER');
    check(res !== null, 'Route must match with matrix & query parameters');
    checkEqual(res.params.id, '55', 'Route param id must be isolated from matrix parameters');
    checkEqual(res.queryParams.discount, '20', 'Query param discount must be parsed');
    checkEqual(res.queryParams.promo, 'SUMMER', 'Query param promo must be parsed');
  });

  await runTest('SEC-2.8', 'Wildcard route ** acts as fallback when no earlier routes match', () => {
    const routes = [
      { path: 'movies', component: 'MoviesComponent' },
      { path: 'booking/:id', component: 'BookingComponent' },
      { path: '**', component: 'NotFoundComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const res = matcher.match('/non-existent/deep/path');
    check(res !== null, 'Wildcard route must match unmatched URLs');
    checkEqual(res.component, 'NotFoundComponent');
  });

  await runTest('SEC-2.9', 'Route definition order is strictly respected (first matching route wins)', () => {
    const routes = [
      { path: 'booking/special', component: 'SpecialBookingComponent' },
      { path: 'booking/:id', component: 'BookingComponent' },
      { path: '**', component: 'NotFoundComponent' }
    ];
    const matcher = new AngularRouteMatcher(routes);

    const resSpecial = matcher.match('/booking/special');
    checkEqual(resSpecial.component, 'SpecialBookingComponent', 'Exact static segment must win over parameterized if listed first');

    const resNormal = matcher.match('/booking/123');
    checkEqual(resNormal.component, 'BookingComponent');
  });

  // --- SECTION 3: DYNAMIC loadComponent RESOLUTION & ASYNC IMPORTS ---
  console.log('\n--- SECTION 3: Dynamic loadComponent Resolution & Mock Async Imports ---');

  await runTest('SEC-3.1', 'loadComponent resolves async dynamic import to component class', async () => {
    let importExecuted = false;
    const route = {
      path: 'booking/:id',
      loadComponent: () => {
        importExecuted = true;
        return Promise.resolve({ BookingComponent: MockBookingComponent }).then(m => m.BookingComponent);
      }
    };

    const compClass = await route.loadComponent();
    check(importExecuted, 'loadComponent factory must be executed');
    checkEqual(compClass, MockBookingComponent, 'Resolved class must match BookingComponent');
    const instance = new compClass('777');
    checkEqual(instance.id, '777');
    check(instance.rendered, 'Component instance must be instantiated');
  });

  await runTest('SEC-3.2', 'loadComponent simulates network latency and promise resolution', async () => {
    const route = {
      path: 'booking/:id',
      loadComponent: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({ BookingComponent: MockBookingComponent });
        }, 30);
      }).then(m => m.BookingComponent)
    };

    const start = Date.now();
    const compClass = await route.loadComponent();
    const duration = Date.now() - start;
    check(duration >= 25, `Must await simulated latency (took ${duration}ms)`);
    checkEqual(compClass, MockBookingComponent);
  });

  await runTest('SEC-3.3', 'Adversarial: Network failure in dynamic import triggers rejection & error interception', async () => {
    const failingRoute = {
      path: 'booking/:id',
      loadComponent: () => Promise.reject(new TypeError('Failed to fetch dynamically imported module: chunk-booking.js'))
    };

    let caughtError = null;
    try {
      await failingRoute.loadComponent();
    } catch (err) {
      caughtError = err;
    }

    check(caughtError !== null, 'Dynamic import failure must reject promise');
    check(caughtError.message.includes('chunk-booking.js'), 'Error message must reflect network failure');
  });

  await runTest('SEC-3.4', 'Adversarial: Dynamic import retry policy recovers from transient chunk failures', async () => {
    let attempts = 0;
    const retryableLoad = () => {
      return new Promise((resolve, reject) => {
        attempts++;
        if (attempts < 3) {
          reject(new Error('Transient network error'));
        } else {
          resolve({ BookingComponent: MockBookingComponent });
        }
      });
    };

    async function loadWithRetry(loader, maxRetries = 3) {
      for (let i = 0; i < maxRetries; i++) {
        try {
          const mod = await loader();
          return mod.BookingComponent;
        } catch (err) {
          if (i === maxRetries - 1) throw err;
        }
      }
    }

    const loadedClass = await loadWithRetry(retryableLoad, 3);
    checkEqual(attempts, 3, 'Must have attempted 3 times');
    checkEqual(loadedClass, MockBookingComponent, 'Must resolve component after retrying');
  });

  await runTest('SEC-3.5', 'Adversarial: Concurrent navigation cancellation commits only newest route', async () => {
    let nav1Resolved = false;
    let nav2Resolved = false;
    let activeNavigationId = 0;

    function navigate(id, delay) {
      const navId = ++activeNavigationId;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (navId !== activeNavigationId) {
            return reject(new Error('NG0100: Navigation cancelled by newer navigation'));
          }
          resolve(`Navigated to /booking/${id}`);
        }, delay);
      });
    }

    const p1 = navigate('1', 60).then(
      res => { nav1Resolved = true; },
      err => { /* Expected cancellation */ }
    );

    const p2 = navigate('2', 15).then(
      res => { nav2Resolved = true; }
    );

    await Promise.allSettled([p1, p2]);

    check(!nav1Resolved, 'Stale navigation 1 must be cancelled');
    check(nav2Resolved, 'Newest navigation 2 must commit successfully');
  });

  await runTest('SEC-3.6', 'Chunk caching: lazy component factory is memoized on repeated navigations', () => {
    let factoryExecutions = 0;
    const lazyLoader = (() => {
      let cachedPromise = null;
      return () => {
        if (!cachedPromise) {
          factoryExecutions++;
          cachedPromise = Promise.resolve({ BookingComponent: MockBookingComponent }).then(m => m.BookingComponent);
        }
        return cachedPromise;
      };
    })();

    for (let i = 0; i < 5; i++) {
      lazyLoader();
    }
    checkEqual(factoryExecutions, 1, 'Factory function must execute only once when memoized/cached');
  });

  // --- SECTION 4: COMPONENT INPUT BINDING WITH SIGNALS ---
  console.log('\n--- SECTION 4: Component Input Binding with Signals ---');

  await runTest('SEC-4.1', 'input.required throws NG0950 when read prior to route parameter binding', () => {
    const comp = new SimulatedBookingComponent();
    let threw = false;
    try {
      comp.id();
    } catch (err) {
      threw = true;
      check(err.message.includes('NG0950') || err.message.includes('Input is required'), 'Must throw required input error');
    }
    check(threw, 'Reading uninitialized input.required must throw error');
  });

  await runTest('SEC-4.2', 'withComponentInputBinding binds route param to input.required signal automatically', () => {
    const comp = new SimulatedBookingComponent();
    const routeParams = { id: '987' };

    if (comp.id && comp.id.__isSignalInput) {
      comp.id.__setFromRoute(routeParams.id);
    }

    checkEqual(comp.id(), '987', 'Bound signal must return route parameter value');
    checkEqual(comp.getTitle(), 'حجز الفيلم رقم: 987', 'Template binding reflects signal input');
  });

  await runTest('SEC-4.3', 'Route parameter updates dynamically propagate to signal inputs and derived views', () => {
    const comp = new SimulatedBookingComponent();
    comp.id.__setFromRoute('100');
    checkEqual(comp.id(), '100');
    checkEqual(comp.getTitle(), 'حجز الفيلم رقم: 100');

    comp.id.__setFromRoute('200');
    checkEqual(comp.id(), '200');
    checkEqual(comp.getTitle(), 'حجز الفيلم رقم: 200');
  });

  await runTest('SEC-4.4', 'Adversarial: Signal inputs do not expose writable .set or .update to consumer code', () => {
    const comp = new SimulatedBookingComponent();
    comp.id.__setFromRoute('42');
    checkEqual(comp.id.set, undefined, 'Signal input must not expose .set');
    checkEqual(comp.id.update, undefined, 'Signal input must not expose .update');
    checkEqual(comp.id.mutate, undefined, 'Signal input must not expose .mutate');
  });

  await runTest('SEC-4.5', 'Non-string route parameters are coerced cleanly to string for input.required<string>', () => {
    const comp = new SimulatedBookingComponent();
    comp.id.__setFromRoute(12345);
    checkEqual(typeof comp.id(), 'string', 'Value must be string');
    checkEqual(comp.id(), '12345');
  });

  // --- SECTION 5: FUNCTIONAL GUARD SEMANTICS & INJECTION CONTEXT ---
  console.log('\n--- SECTION 5: Functional Guard Semantics & Injection Context ---');

  await runTest('SEC-5.1', 'Calling inject() outside injection context throws NG0203 error', () => {
    let threw = false;
    try {
      inject('SomeToken');
    } catch (err) {
      threw = true;
      check(err.message.includes('NG0203'), 'Must report NG0203 injection context violation');
    }
    check(threw, 'inject() outside context must be prohibited');
  });

  await runTest('SEC-5.2', 'CanActivateFn executes successfully within injection context with inject(Router)', () => {
    const mockRouter = new MockRouter();
    const injector = {
      get: (token) => {
        if (token === 'Router' || token === MockRouter) return mockRouter;
        throw new Error('Unknown token');
      }
    };

    const bookingGuard = (route, state) => {
      const router = inject(MockRouter);
      const hasSeat = true;
      return hasSeat ? true : router.createUrlTree(['/movies']);
    };

    const result = runInInjectionContext(injector, () => {
      return bookingGuard({}, {});
    });

    checkEqual(result, true, 'Guard allows navigation when condition met');
  });

  await runTest('SEC-5.3', 'CanActivateFn returning UrlTree causes router redirection', () => {
    const mockRouter = new MockRouter();
    const injector = { get: () => mockRouter };

    const blockingGuard = (route, state) => {
      const router = inject(MockRouter);
      const hasSeat = false;
      return hasSeat ? true : router.createUrlTree(['/movies']);
    };

    const result = runInInjectionContext(injector, () => {
      return blockingGuard({}, {});
    });

    check(result !== null && typeof result === 'object', 'Must return UrlTree object');
    checkEqual(result.__isUrlTree, true, 'Result must be a UrlTree');
    checkEqual(result.path, '/movies', 'UrlTree path must be /movies');
  });

  await runTest('SEC-5.4', 'Verify starterFiles booking.guard.ts executes in VM with createUrlTree', () => {
    const guardCode = courseData.starterFiles['src/app/guards/booking.guard.ts'];
    check(guardCode !== undefined, 'booking.guard.ts must exist');

    const jsGuard = guardCode
      .replace(/import .*/g, '')
      .replace(/: CanActivateFn/g, '')
      .replace(/export const bookingGuard/g, 'var bookingGuard')
      .replace(/export /g, '');

    const mockRouter = new MockRouter();
    const context = {
      inject: (token) => mockRouter,
      Router: MockRouter
    };
    vm.createContext(context);
    vm.runInContext(jsGuard, context);

    check(typeof context.bookingGuard === 'function', 'bookingGuard function must be declared');
    const res = context.bookingGuard({}, {});
    check(res === true || (res && res.__isUrlTree), 'bookingGuard must return boolean or UrlTree');
  });

  await runTest('SEC-5.5', 'Adversarial: Guard error throws exception and halts navigation pipeline safely', () => {
    const faultyGuard = () => {
      throw new Error('Database connection failed during auth check');
    };

    function executeGuardPipeline(guards) {
      for (const g of guards) {
        const res = g();
        if (res === false || (res && res.__isUrlTree)) return res;
      }
      return true;
    }

    let errorCaught = false;
    try {
      executeGuardPipeline([faultyGuard]);
    } catch (err) {
      errorCaught = true;
      checkEqual(err.message, 'Database connection failed during auth check');
    }
    check(errorCaught, 'Guard exception must bubble to navigation error handler');
  });

  await runTest('SEC-5.6', 'Adversarial: Chained guards short-circuit immediately on first rejection or UrlTree', () => {
    let guard2Executed = false;
    let guard3Executed = false;

    const guard1 = () => false;
    const guard2 = () => { guard2Executed = true; return true; };
    const guard3 = () => { guard3Executed = true; return true; };

    function executeGuardPipeline(guards) {
      for (const g of guards) {
        const res = g();
        if (res === false || (res && res.__isUrlTree)) return res;
      }
      return true;
    }

    const result = executeGuardPipeline([guard1, guard2, guard3]);
    checkEqual(result, false, 'Pipeline returns false');
    checkEqual(guard2Executed, false, 'Guard 2 must not be executed after Guard 1 rejection');
    checkEqual(guard3Executed, false, 'Guard 3 must not be executed after Guard 1 rejection');
  });

  // --- SECTION 6: TYPED REACTIVE FORMS MECHANICS & nonNullable DEEP VERIFICATION ---
  console.log('\n--- SECTION 6: Typed Reactive Forms Mechanics & nonNullable Deep Verification ---');

  await runTest('SEC-6.1', 'nonNullable: true resets strictly to initial value (never null)', () => {
    const ctrl = new FormControl('', { nonNullable: true });
    checkEqual(ctrl.value, '', 'Initial value is empty string');

    ctrl.setValue('Mohamed');
    checkEqual(ctrl.value, 'Mohamed', 'Value set to Mohamed');
    check(ctrl.dirty, 'Control is dirty');

    ctrl.reset();
    checkEqual(ctrl.value, '', 'nonNullable control must reset to initial empty string, NOT null');
    check(ctrl.pristine, 'Control is pristine after reset');
    check(ctrl.untouched, 'Control is untouched after reset');
  });

  await runTest('SEC-6.2', 'Standard nullable control resets to null', () => {
    const ctrl = new FormControl('');
    ctrl.setValue('Ahmed');
    checkEqual(ctrl.value, 'Ahmed');

    ctrl.reset();
    checkEqual(ctrl.value, null, 'Nullable control must reset to null');
  });

  await runTest('SEC-6.3', 'Explicit value passed to reset() overrides nonNullable default', () => {
    const ctrl = new FormControl('default', { nonNullable: true });
    ctrl.reset('custom');
    checkEqual(ctrl.value, 'custom', 'Explicit reset value must be assigned');
  });

  await runTest('SEC-6.4', 'FormGroup value vs getRawValue: disabled controls behavior', () => {
    const form = new FormGroup({
      customerName: new FormControl('', { nonNullable: true }),
      seatId: new FormControl('A1', { nonNullable: true })
    });

    form.controls.seatId.disable();
    form.controls.customerName.setValue('Noura');

    checkDeepEqual(form.value, { customerName: 'Noura' }, 'form.value must omit disabled controls');
    checkDeepEqual(form.getRawValue(), { customerName: 'Noura', seatId: 'A1' }, 'getRawValue must include disabled controls');
  });

  await runTest('SEC-6.5', 'Validator pipeline: required and minLength validation transitions', () => {
    const ctrl = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)]
    });

    checkEqual(ctrl.status, 'INVALID');
    check(ctrl.errors.required === true, 'Must flag required error on empty');

    ctrl.setValue('ab');
    checkEqual(ctrl.status, 'INVALID');
    checkEqual(ctrl.errors.required, undefined, 'Required error resolved');
    check(ctrl.errors.minlength !== undefined, 'Must flag minlength error on "ab"');

    ctrl.setValue('abc');
    checkEqual(ctrl.status, 'VALID');
    checkEqual(ctrl.errors, null, 'Status must be VALID with 0 errors');
  });

  await runTest('SEC-6.6', 'Form submission cycle: markAllAsTouched reveals errors on submit attempt', () => {
    const form = new FormGroup({
      customerName: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });

    checkEqual(form.valid, false, 'Form is invalid initially');
    checkEqual(form.controls.customerName.touched, false, 'Control untouched before submit');

    form.markAllAsTouched();
    checkEqual(form.controls.customerName.touched, true, 'Control touched after submission attempt');
  });

  // --- SECTION 7: EXHAUSTIVE BOUNDARY & ADVERSARIAL FUZZING OF saudiPhoneValidator ---
  console.log('\n--- SECTION 7: Boundary & Adversarial Fuzzing of saudiPhoneValidator ---');

  const valFileCode = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  check(valFileCode !== undefined, 'cinema.validators.ts must exist');

  const cleanValJs = valFileCode
    .replace(/import .*/g, '')
    .replace(/: ValidatorFn/g, '')
    .replace(/: AbstractControl/g, '')
    .replace(/: ValidationErrors \| null/g, '')
    .replace(/export /g, '');

  const valContext = {};
  vm.createContext(valContext);
  vm.runInContext(cleanValJs, valContext);

  const saudiPhoneValidator = valContext.saudiPhoneValidator;
  check(typeof saudiPhoneValidator === 'function', 'saudiPhoneValidator factory must be a function');
  const phoneValidator = saudiPhoneValidator();

  await runTest('SEC-7.1', 'Valid 10-digit Saudi mobile numbers starting with 05 pass validation', () => {
    const valid10 = [
      '0501234567',
      '0531234567',
      '0541234567',
      '0555555555',
      '0561234567',
      '0571234567',
      '0581234567',
      '0598765432'
    ];

    valid10.forEach(phone => {
      const res = phoneValidator({ value: phone });
      checkEqual(res, null, `Phone ${phone} must be valid`);
    });
  });

  await runTest('SEC-7.2', 'Valid 9-digit Saudi mobile numbers starting with 5 pass validation', () => {
    const valid9 = [
      '501234567',
      '531234567',
      '541234567',
      '555555555',
      '561234567',
      '571234567',
      '581234567',
      '598765432'
    ];

    valid9.forEach(phone => {
      const res = phoneValidator({ value: phone });
      checkEqual(res, null, `9-digit Phone ${phone} must be valid`);
    });
  });

  await runTest('SEC-7.3', 'Numbers with leading and trailing whitespace are trimmed and pass', () => {
    const whitespaceVariants = [
      '   0501234567   ',
      '\t0555555555\t',
      '\n0598765432\r\n',
      ' 501234567 '
    ];

    whitespaceVariants.forEach(phone => {
      const res = phoneValidator({ value: phone });
      checkEqual(res, null, `Whitespace padded phone "${phone}" must pass after trim`);
    });
  });

  await runTest('SEC-7.4', 'Numeric values (numbers) are cleanly converted to string and validated', () => {
    const res1 = phoneValidator({ value: 501234567 });
    checkEqual(res1, null, 'Numeric 501234567 must pass');
    const res2 = phoneValidator({ value: 555555555 });
    checkEqual(res2, null, 'Numeric 555555555 must pass');
  });

  await runTest('SEC-7.5', 'Optionality: empty string, null, and undefined pass (return null)', () => {
    checkEqual(phoneValidator({ value: '' }), null, 'Empty string is valid (optional field)');
    checkEqual(phoneValidator({ value: null }), null, 'null is valid (optional field)');
    checkEqual(phoneValidator({ value: undefined }), null, 'undefined is valid (optional field)');
  });

  await runTest('SEC-7.6', 'Whitespace-only string fails with saudiPhone error', () => {
    const res = phoneValidator({ value: '   ' });
    check(res !== null && res.saudiPhone, 'Whitespace-only string must return saudiPhone error');
  });

  await runTest('SEC-7.7', 'Adversarial: Regional landlines (011, 012, 013, 014, 016, 017) are rejected', () => {
    const landlines = [
      '0112345678',
      '0123456789',
      '0133456789',
      '0143456789',
      '0163456789',
      '0173456789'
    ];

    landlines.forEach(landline => {
      const res = phoneValidator({ value: landline });
      check(res !== null && res.saudiPhone, `Landline ${landline} must be rejected`);
    });
  });

  await runTest('SEC-7.8', 'Adversarial: Foreign country codes (+966, 00966, etc.) are rejected by local validator', () => {
    const foreignCodes = [
      '+966501234567',
      '00966501234567',
      '966501234567',
      '+12025550199',
      '+447911123456'
    ];

    foreignCodes.forEach(num => {
      const res = phoneValidator({ value: num });
      check(res !== null && res.saudiPhone, `Country code format ${num} must be rejected by local 05 validator`);
    });
  });

  await runTest('SEC-7.9', 'Adversarial: Boundary lengths (too short or too long) are rejected', () => {
    const badLengths = [
      '05',
      '050',
      '0501',
      '05012',
      '050123',
      '0501234',
      '05012345',
      '050123456',
      '05012345678',
      '050123456789',
      '50123456',
      '5012345678'
    ];

    badLengths.forEach(badNum => {
      const res = phoneValidator({ value: badNum });
      check(res !== null && res.saudiPhone, `Bad length ${badNum} must be rejected`);
    });
  });

  await runTest('SEC-7.10', 'Adversarial: Alphabetic, punctuation, and injection payloads are rejected', () => {
    const maliciousInputs = [
      '050123456a',
      '050-123-4567',
      '050 123 4567',
      '050.123.4567',
      '(050)1234567',
      '0501234567<script>',
      '0501234567\' OR 1=1--',
      '050123456📱',
      'NaN',
      'null',
      'undefined',
      '٠٥٠١٢٣٤٥٦٧'
    ];

    maliciousInputs.forEach(inputVal => {
      const res = phoneValidator({ value: inputVal });
      check(res !== null && res.saudiPhone, `Malicious/invalid input "${inputVal}" must be rejected`);
    });
  });

  await runTest('SEC-7.11', 'High-Volume Random Fuzzing: 500 mutated strings against saudiPhoneValidator', () => {
    for (let i = 0; i < 500; i++) {
      const randLen = Math.floor(Math.random() * 20);
      let randStr = '';
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-= ';
      for (let j = 0; j < randLen; j++) {
        randStr += chars[Math.floor(Math.random() * chars.length)];
      }

      const res = phoneValidator({ value: randStr });
      const isCleanMatch = /^(05|5)\d{8}$/.test(randStr.trim());
      if (randStr === '') {
        checkEqual(res, null, 'Empty string must be null');
      } else if (isCleanMatch) {
        checkEqual(res, null, `Generated valid phone "${randStr}" must pass`);
      } else {
        check(res !== null && res.saudiPhone, `Fuzzed invalid string "${randStr}" must return error`);
      }
    }
  });

  // --- SECTION 8: HIGH-VOLUME SIMULATOR STRESS TESTING & FUZZING ---
  console.log('\n--- SECTION 8: High-Volume Simulator Stress Testing & Fuzzing ---');

  await runTest('SEC-8.1', 'Simulator checkSupportedTask exact match on all 6 Phase 6 lessons', () => {
    p6Lessons.forEach(lesson => {
      setFiles({ [lesson.file]: lesson.code });
      const ok = checkSupportedTask(lesson);
      check(ok, `Lesson ${lesson.id} exact match failed in simulator`);
    });
  });

  await runTest('SEC-8.2', 'Simulator checkSupportedTask expected snippet match on all 6 lessons', () => {
    p6Lessons.forEach(lesson => {
      setFiles({ [lesson.file]: lesson.expected });
      const ok = checkSupportedTask(lesson);
      check(ok, `Lesson ${lesson.id} expected snippet match failed in simulator`);
    });
  });

  await runTest('SEC-8.3', 'CRLF and Whitespace Fuzzing: 30 variations per Phase 6 lesson (180 total tests)', () => {
    p6Lessons.forEach(lesson => {
      for (let i = 0; i < 30; i++) {
        const leadingSpaces = ' '.repeat(i % 5);
        const trailingSpaces = ' '.repeat((i * 2) % 6);
        const lineEnd = i % 2 === 0 ? '\r\n' : '\n';
        const variant = `${lineEnd}${leadingSpaces}${lesson.expected}${trailingSpaces}${lineEnd}`;

        setFiles({ [lesson.file]: variant });
        const ok = checkSupportedTask(lesson);
        check(ok, `Lesson ${lesson.id} failed on whitespace variant ${i}`);
      }
    });
  });

  await runTest('SEC-8.4', 'Comment injection fuzzing: TypeScript comments surrounding expected snippet', () => {
    p6Lessons.forEach(lesson => {
      const commentedCode = `
        // Auto-generated header
        /* Multiline description
           Routing & Forms */
        ${lesson.expected}
        // End of module
      `;
      setFiles({ [lesson.file]: commentedCode });
      const ok = checkSupportedTask(lesson);
      check(ok, `Lesson ${lesson.id} failed with surrounding comments`);
    });
  });

  await runTest('SEC-8.5', 'Adversarial: checkSupportedTask strictly rejects corrupted keywords and wrong files', () => {
    p6Lessons.forEach(lesson => {
      // 1. Wrong file
      setFiles({ 'src/app/unrelated.ts': lesson.expected });
      checkEqual(checkSupportedTask(lesson), false, `${lesson.id} must fail on wrong file`);

      // 2. Corrupted keywords using regex replacement on identifiers
      const corrupted = lesson.expected.replace(/([a-zA-Z]{3,})/g, 'XYZ_$1');
      setFiles({ [lesson.file]: corrupted });
      checkEqual(checkSupportedTask(lesson), false, `${lesson.id} must fail on corrupted token`);

      // 3. Truncated
      const truncated = lesson.expected.slice(0, Math.floor(lesson.expected.length / 2));
      setFiles({ [lesson.file]: truncated });
      checkEqual(checkSupportedTask(lesson), false, `${lesson.id} must fail on truncated snippet`);
    });
  });

  await runTest('SEC-8.6', 'Simulator preview rendering generation without unhandled errors for all starter files', () => {
    const p6Files = [
      'src/app/app.routes.ts',
      'src/app/features/booking/booking.component.ts',
      'src/app/features/booking/booking-form.component.ts',
      'src/app/guards/booking.guard.ts',
      'src/app/validators/cinema.validators.ts'
    ];

    p6Files.forEach(fPath => {
      setActivePath(fPath);
      setFiles({ [fPath]: courseData.starterFiles[fPath] });
      runSimulatedPreview();
      const srcdoc = getPreviewSrcdoc();
      check(srcdoc && srcdoc.length > 50, `Preview srcdoc must be generated for ${fPath}`);
    });
  });

  await runTest('SEC-8.7', 'High-concurrency stress test: 1,000 rapid calls to checkSupportedTask', () => {
    const lesson = p6Lessons[0];
    setFiles({ [lesson.file]: lesson.code });

    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
      const res = checkSupportedTask(lesson);
      check(res, 'Must return true');
    }
    const duration = Date.now() - start;
    check(duration < 2000, `1,000 simulator checks must finish within 2000ms, took ${duration}ms`);
  });

  // --- SECTION 9: MASTER E2E RUNNER EXECUTION ---
  console.log('\n--- SECTION 9: Master E2E Runner Execution ---');

  await runTest('SEC-9.1', 'Execute node tests/e2e/run_all_e2e_tests.cjs and verify 59/59 passing tests', () => {
    const cmd = 'node tests/e2e/run_all_e2e_tests.cjs';
    const output = execSync(cmd, { cwd: ROOT_DIR, encoding: 'utf8' });
    check(output.includes('ALL E2E TEST TIERS PASSED SUCCESSFULLY'), 'Master E2E runner must report full pass');
    check(output.includes('Passed           : 59'), 'All 59 E2E tests must pass');
    check(output.includes('Failed           : 0'), 'Zero failures allowed');
  });

  // --- SUMMARY REPORT ---
  console.log('\n===============================================================================');
  console.log(`CHALLENGER 2 SUMMARY REPORT:`);
  console.log(`Total Test Suites: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests} | Total Assertions: ${totalAssertions}`);
  console.log('===============================================================================');

  if (failedTests > 0) {
    console.error('\n❌ FAILURES DETECTED:');
    failureDetails.forEach((f, idx) => {
      console.error(`  ${idx + 1}. [${f.section}] ${f.name}: ${f.error}`);
    });
    process.exit(1);
  } else {
    console.log('🎉 VERDICT: APPROVE - All empirical routing, guard, forms, and validator stress tests passed 100%!\n');
    process.exit(0);
  }
}

runAllTests().catch(err => {
  console.error('Unhandled test suite error:', err);
  process.exit(1);
});

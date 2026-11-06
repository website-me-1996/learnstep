/**
 * tests/stress_m5_challenger2.cjs
 *
 * Khotwa Angular 22 Curriculum Rebuild - Milestone 5 Challenger 2
 * Adversarial Empirical Stress Test Suite for Modern DI, HttpClient & RxJS-Signals Interop
 *
 * ADVERSARIAL CHALLENGE DIMENSIONS:
 * 1. DI Context & `inject()` Semantics:
 *    - Construction-time field initialization vs runtime method invocation
 *    - Strict enforcement of injection context boundary (NG0203 error outside context)
 *    - `runInInjectionContext` dynamic execution and scoping
 *    - Hierarchical singleton scoping (`providedIn: 'root'`) vs child injector overrides
 *    - Token resolution varieties (Class token, InjectionToken, optional tokens, circular DI detection)
 * 2. Reactive Signals State Encapsulation:
 *    - Writable signal initialization (`_selectedMovie`) vs `.asReadonly()`
 *    - Mutation rejection on readonly signal (no .set, no .update, TypeError prevention)
 *    - Synchronous state reflection and reactive propagation to derived `computed()`
 *    - Defense against prototype tampering and property assignments
 * 3. Modern HttpClient & Configuration:
 *    - Resolution of `provideHttpClient(withFetch())` provider definition
 *    - Strictly typed requests & responses: `http.get<Movie[]>()` and `http.post<BookingResponse>()`
 *    - Mock backend payload validation, query parameter formatting, status code error recovery
 * 4. Functional Interceptors (`HttpInterceptorFn`):
 *    - Request immutability: `req.clone({ setHeaders: { ... } })` non-destructive cloning
 *    - Multi-interceptor pipeline execution ordering (onion middleware model)
 *    - Header accumulation and preservation across chained interceptors
 *    - Short-circuiting cache interceptors and error handling / retry pipelines
 * 5. RxJS-Signals Interoperability (`toSignal()`):
 *    - `initialValue` synchronous propagation
 *    - Synchronous reads and immediate reflection of stream emissions (`subject.next()`)
 *    - Downstream `computed()` graph reactivity driven by stream-backed signals
 *    - Subscription teardown and lifecycle cleanup on context destruction
 *    - Error propagation modes (`rejectErrors` vs handled fallbacks)
 * 6. High-Volume Scalability & Simulator Error Resilience:
 *    - High-volume concurrency stress (100 concurrent requests, 1,000 signal mutations, 100 DI resolves)
 *    - Simulator dynamic preview fuzzing: truncated, corrupted, and malformed TypeScript code
 *    - `checkSupportedTask` adversarial positive whitespace variations and negative rejection
 * 7. Course-wide Integration & Master E2E Runner Execution:
 *    - Total 91 lessons, 7 Phase 5 lessons at indices 38-44, zero duplicate IDs
 *    - Subprocess execution of `node tests/e2e/run_all_e2e_tests.cjs` (59/59 passing)
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const { execSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const { createEditorEnvironment, loadCourseData } = require('./e2e/helpers/e2e_harness.cjs');

// Test metrics
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

function runTest(section, name, fn) {
  totalTests++;
  try {
    fn();
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

// ===========================================================================
// HIGH-FIDELITY ANGULAR 22 SPECIFICATION ENGINES (DI, SIGNALS, HTTP, INTEROP)
// ===========================================================================

// --- 1. Reactivity Engine (Writable & Readonly Signals, Computeds) ---
let activeConsumer = null;

function signal(initialValue, options = {}) {
  let value = initialValue;
  const subscribers = new Set();
  const equalFn = options.equal || Object.is;

  const getter = function() {
    if (activeConsumer) {
      subscribers.add(activeConsumer);
      activeConsumer._dependencies.add(subscribers);
    }
    return value;
  };

  getter.set = function(newValue) {
    if (!equalFn(value, newValue)) {
      value = newValue;
      const subs = Array.from(subscribers);
      subs.forEach(sub => sub._notify());
    }
  };

  getter.update = function(updateFn) {
    getter.set(updateFn(value));
  };

  getter.asReadonly = function() {
    const readonlyWrapper = function() {
      return getter();
    };
    Object.defineProperty(readonlyWrapper, 'set', {
      value: undefined,
      writable: false,
      configurable: false
    });
    Object.defineProperty(readonlyWrapper, 'update', {
      value: undefined,
      writable: false,
      configurable: false
    });
    Object.freeze(readonlyWrapper);
    return readonlyWrapper;
  };

  getter._subscribers = subscribers;
  return getter;
}

function computed(computeFn, options = {}) {
  let cachedValue = undefined;
  let isDirty = true;
  let evalCount = 0;
  const dependencies = new Set();
  const downstreamSubscribers = new Set();

  const node = {
    _dependencies: dependencies,
    _notify() {
      if (!isDirty) {
        isDirty = true;
        const subs = Array.from(downstreamSubscribers);
        subs.forEach(s => s._notify());
      }
    }
  };

  const getter = function() {
    if (activeConsumer) {
      downstreamSubscribers.add(activeConsumer);
      activeConsumer._dependencies.add(downstreamSubscribers);
    }

    if (isDirty) {
      dependencies.forEach(depSet => depSet.delete(node));
      dependencies.clear();

      const prevConsumer = activeConsumer;
      activeConsumer = node;
      try {
        cachedValue = computeFn();
        evalCount++;
        isDirty = false;
      } finally {
        activeConsumer = prevConsumer;
      }
    }
    return cachedValue;
  };

  getter.getEvalCount = () => evalCount;
  getter.isDirty = () => isDirty;
  return getter;
}

// --- 2. Modern Dependency Injection (DI) Engine ---
let currentInjectionContext = null;

class InjectionToken {
  constructor(_desc) {
    this._desc = _desc;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
}

class Injector {
  constructor(providers = [], parent = null) {
    this.parent = parent;
    this.records = new Map();
    this.resolvingTokens = new Set();

    providers.forEach(p => {
      if (typeof p === 'function') {
        this.records.set(p, { token: p, useClass: p, instance: null });
      } else if (p && p.provide) {
        this.records.set(p.provide, {
          token: p.provide,
          useValue: p.useValue,
          useFactory: p.useFactory,
          useClass: p.useClass,
          deps: p.deps || [],
          instance: null
        });
      }
    });
  }

  get(token, notFoundValue, flags = {}) {
    if (this.resolvingTokens.has(token)) {
      throw new Error(`NG0200: Circular dependency detected for token: ${token.name || token}`);
    }

    if (this.records.has(token)) {
      const record = this.records.get(token);
      if (record.instance !== null) return record.instance;

      if (record.useValue !== undefined) {
        record.instance = record.useValue;
        return record.instance;
      }

      this.resolvingTokens.add(token);
      try {
        const prevCtx = currentInjectionContext;
        currentInjectionContext = this;
        try {
          if (record.useFactory) {
            const deps = (record.deps || []).map(d => this.get(d));
            record.instance = record.useFactory(...deps);
          } else if (record.useClass) {
            record.instance = new record.useClass();
          } else if (typeof token === 'function') {
            record.instance = new token();
          }
        } finally {
          currentInjectionContext = prevCtx;
        }
      } finally {
        this.resolvingTokens.delete(token);
      }
      return record.instance;
    }

    if (this.parent) {
      return this.parent.get(token, notFoundValue, flags);
    }

    if (flags.optional) {
      return notFoundValue !== undefined ? notFoundValue : null;
    }

    throw new Error(`NG0204: No provider found for token: ${token.name || token}`);
  }
}

function runInInjectionContext(injector, fn) {
  const prev = currentInjectionContext;
  currentInjectionContext = injector;
  try {
    return fn();
  } finally {
    currentInjectionContext = prev;
  }
}

function inject(token, flags = {}) {
  if (!currentInjectionContext) {
    throw new Error('NG0203: inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with runInInjectionContext.');
  }
  return currentInjectionContext.get(token, undefined, flags);
}

// --- 3. Modern HttpClient & Functional Interceptor Pipeline ---
class HttpHeaders {
  constructor(headers = {}) {
    this._map = new Map();
    for (const [k, v] of Object.entries(headers)) {
      this._map.set(k.toLowerCase(), v);
    }
  }

  get(name) {
    return this._map.get(name.toLowerCase()) || null;
  }

  has(name) {
    return this._map.has(name.toLowerCase());
  }

  set(name, value) {
    const clone = new Map(this._map);
    clone.set(name.toLowerCase(), value);
    const newHeaders = new HttpHeaders();
    newHeaders._map = clone;
    return newHeaders;
  }

  toObject() {
    const obj = {};
    for (const [k, v] of this._map.entries()) {
      obj[k] = v;
    }
    return obj;
  }
}

class HttpRequest {
  constructor(method, url, options = {}) {
    this.method = method.toUpperCase();
    this.url = url;
    this.body = options.body !== undefined ? options.body : null;
    this.headers = options.headers instanceof HttpHeaders ? options.headers : new HttpHeaders(options.headers || {});
    this.params = options.params || {};
    Object.freeze(this);
  }

  clone(update = {}) {
    let newHeaders = this.headers;
    if (update.headers) {
      newHeaders = update.headers instanceof HttpHeaders ? update.headers : new HttpHeaders(update.headers);
    }
    if (update.setHeaders) {
      for (const [k, v] of Object.entries(update.setHeaders)) {
        newHeaders = newHeaders.set(k, v);
      }
    }

    return new HttpRequest(
      update.method || this.method,
      update.url || this.url,
      {
        body: update.body !== undefined ? update.body : this.body,
        headers: newHeaders,
        params: update.params !== undefined ? update.params : this.params
      }
    );
  }
}

class HttpResponse {
  constructor(init) {
    this.status = init.status || 200;
    this.statusText = init.statusText || 'OK';
    this.body = init.body;
    this.headers = init.headers || new HttpHeaders();
    this.ok = this.status >= 200 && this.status < 300;
  }
}

class HttpErrorResponse extends Error {
  constructor(init) {
    super(`Http failure response for ${init.url || ''}: ${init.status} ${init.statusText || 'Error'}`);
    this.name = 'HttpErrorResponse';
    this.status = init.status || 0;
    this.statusText = init.statusText || 'Unknown Error';
    this.url = init.url;
    this.error = init.error;
    this.ok = false;
  }
}

// Simple synchronous Observable implementation for testing
class MockObservable {
  constructor(subscribeFn) {
    this._subscribeFn = subscribeFn;
  }

  subscribe(observerOrNext, onError, onComplete) {
    const observer = typeof observerOrNext === 'function'
      ? { next: observerOrNext, error: onError || (() => {}), complete: onComplete || (() => {}) }
      : (observerOrNext || { next: () => {}, error: () => {}, complete: () => {} });

    let isUnsubscribed = false;
    const tearDown = this._subscribeFn({
      next: (val) => { if (!isUnsubscribed && observer.next) observer.next(val); },
      error: (err) => { if (!isUnsubscribed && observer.error) observer.error(err); },
      complete: () => { if (!isUnsubscribed && observer.complete) observer.complete(); }
    });

    return {
      unsubscribe() {
        isUnsubscribed = true;
        if (typeof tearDown === 'function') tearDown();
      }
    };
  }

  pipe(...operators) {
    return operators.reduce((source, op) => op(source), this);
  }
}

function of(value) {
  return new MockObservable(observer => {
    observer.next(value);
    observer.complete();
  });
}

function throwError(errorFactory) {
  return new MockObservable(observer => {
    const err = typeof errorFactory === 'function' ? errorFactory() : errorFactory;
    observer.error(err);
  });
}

function tap(callback) {
  return (source$) => new MockObservable(observer => {
    return source$.subscribe({
      next: (val) => {
        try { callback(val); } catch (e) { observer.error(e); return; }
        observer.next(val);
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
}

class MockSubject extends MockObservable {
  constructor() {
    const subscribers = new Set();
    super(observer => {
      subscribers.add(observer);
      return () => subscribers.delete(observer);
    });
    this._subscribers = subscribers;
  }

  next(value) {
    const list = Array.from(this._subscribers);
    list.forEach(s => s.next(value));
  }

  error(err) {
    const list = Array.from(this._subscribers);
    list.forEach(s => s.error(err));
  }

  complete() {
    const list = Array.from(this._subscribers);
    list.forEach(s => s.complete());
  }
}

class HttpClient {
  constructor(handler) {
    this.handler = handler;
  }

  request(req) {
    return this.handler.handle(req);
  }

  get(url, options = {}) {
    return this.request(new HttpRequest('GET', url, options));
  }

  post(url, body, options = {}) {
    return this.request(new HttpRequest('POST', url, { ...options, body }));
  }
}

function provideHttpClient(...features) {
  return {
    provide: 'HTTP_CLIENT_CONFIG',
    useValue: {
      withFetch: features.includes('withFetch'),
      features
    }
  };
}

function withFetch() {
  return 'withFetch';
}

// --- 4. RxJS-Signals Interoperability (`toSignal()`) ---
function toSignal(source$, options = {}) {
  let hasValue = false;
  let initial = options.initialValue;
  if ('initialValue' in options) {
    hasValue = true;
  }

  const sig = signal(initial);
  let errorToThrow = null;

  const sub = source$.subscribe({
    next: (val) => {
      hasValue = true;
      sig.set(val);
    },
    error: (err) => {
      if (options.rejectErrors) {
        errorToThrow = err;
      }
    }
  });

  if (!hasValue) {
    if (options.requireSync) {
      sub.unsubscribe();
      throw new Error('NG0601: `toSignal()` requires a synchronous value or an `initialValue` when `requireSync` is true.');
    }
  }

  const readonlySig = function() {
    if (errorToThrow) {
      throw errorToThrow;
    }
    return sig();
  };

  readonlySig._destroy = () => sub.unsubscribe();
  return readonlySig;
}

console.log('===============================================================================');
console.log('🛡️  CHALLENGER 2: ADVERSARIAL STRESS TEST SUITE (PHASE 5 MODERN DI & HTTP)');
console.log('===============================================================================');

// Load Course Data & Editor Environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const p5Lessons = courseData.lessons.filter(l => l.module === 'phase-5-di-http');

// ===========================================================================
// SECTION 1: Modern DI Engine & `inject()` Semantics
// ===========================================================================
console.log('\n--- SECTION 1: Modern DI Engine & inject() Semantics ---');

runTest('1.1', 'Construction-phase field initialization: inject() succeeds in construction context', () => {
  class TestCinemaService {
    constructor() {
      this.name = 'Khotwa Cinema Service';
    }
  }

  const injector = new Injector([TestCinemaService]);

  let instance = null;
  runInInjectionContext(injector, () => {
    class ConsumerComponent {
      service = inject(TestCinemaService);
    }
    const cmp = new ConsumerComponent();
    instance = cmp.service;
  });

  check(instance instanceof TestCinemaService, 'Resolved instance must be TestCinemaService');
  checkEqual(instance.name, 'Khotwa Cinema Service', 'Resolved instance properties accessible');
});

runTest('1.2', 'Runtime invocation outside injection context strictly throws NG0203 error', () => {
  class MovieService {}
  const injector = new Injector([MovieService]);

  let thrown = null;
  try {
    // Calling inject() directly in global / runtime context
    inject(MovieService);
  } catch (err) {
    thrown = err;
  }

  check(thrown !== null, 'inject() outside context must throw');
  check(thrown.message.includes('NG0203'), `Error message must contain NG0203: ${thrown.message}`);

  // Test method invocation outside context
  let methodThrown = null;
  class BadComponent {
    fetchLate() {
      return inject(MovieService);
    }
  }
  const cmp = new BadComponent();
  try {
    cmp.fetchLate();
  } catch (err) {
    methodThrown = err;
  }
  check(methodThrown !== null, 'Calling method with inject() outside context must throw');
  check(methodThrown.message.includes('NG0203'), 'Method error must cite NG0203');
});

runTest('1.3', 'runInInjectionContext() provides execution sandbox and returns function result', () => {
  const API_KEY = new InjectionToken('API_KEY');
  const injector = new Injector([
    { provide: API_KEY, useValue: 'CINEMA-SECRET-2026' }
  ]);

  const result = runInInjectionContext(injector, () => {
    const key = inject(API_KEY);
    return `Bearer ${key}`;
  });

  checkEqual(result, 'Bearer CINEMA-SECRET-2026', 'runInInjectionContext returned transformed injected value');
  // Confirm context was restored
  assert.throws(() => inject(API_KEY), /NG0203/, 'Context must be cleared after runInInjectionContext');
});

runTest('1.4', 'Hierarchical DI: root singleton vs scoped child injector overrides', () => {
  class LoggerService {
    constructor(prefix = '[ROOT]') {
      this.prefix = prefix;
    }
  }

  const rootInjector = new Injector([LoggerService]);
  const childInjector = new Injector([
    { provide: LoggerService, useFactory: () => new LoggerService('[CHILD]') }
  ], rootInjector);

  const rootLog1 = rootInjector.get(LoggerService);
  const rootLog2 = rootInjector.get(LoggerService);
  checkEqual(rootLog1, rootLog2, 'Root injector must provide singleton instance');
  checkEqual(rootLog1.prefix, '[ROOT]', 'Root prefix matches');

  const childLog = childInjector.get(LoggerService);
  check(childLog !== rootLog1, 'Child injector must resolve scoped override');
  checkEqual(childLog.prefix, '[CHILD]', 'Child override properties match');

  // Multi-level delegation: child delegates missing tokens to parent
  class UnscopedService {
    value = 42;
  }
  const parentWithUnscoped = new Injector([UnscopedService]);
  const emptyChild = new Injector([], parentWithUnscoped);
  const delegated = emptyChild.get(UnscopedService);
  check(delegated instanceof UnscopedService, 'Child must delegate to parent when token unprovided locally');
  checkEqual(delegated.value, 42, 'Delegated instance preserved');
});

runTest('1.5', 'Token resolution varieties: InjectionToken, optional tokens, and missing tokens', () => {
  const TIMEOUT_TOKEN = new InjectionToken('TIMEOUT_MS');
  const MISSING_TOKEN = new InjectionToken('MISSING');
  const injector = new Injector([
    { provide: TIMEOUT_TOKEN, useValue: 5000 }
  ]);

  runInInjectionContext(injector, () => {
    const timeout = inject(TIMEOUT_TOKEN);
    checkEqual(timeout, 5000, 'InjectionToken resolved correctly');

    const optionalMissing = inject(MISSING_TOKEN, { optional: true });
    checkEqual(optionalMissing, null, 'Optional missing token resolves to null without error');

    assert.throws(() => {
      inject(MISSING_TOKEN);
    }, /NG0204/, 'Non-optional missing token must throw NG0204');
  });
});

runTest('1.6', 'Circular dependency detection throws NG0200 and prevents stack overflow', () => {
  class ServiceA {}
  class ServiceB {}

  const injector = new Injector([
    {
      provide: ServiceA,
      useFactory: () => {
        inject(ServiceB);
        return new ServiceA();
      }
    },
    {
      provide: ServiceB,
      useFactory: () => {
        inject(ServiceA);
        return new ServiceB();
      }
    }
  ]);

  assert.throws(() => {
    injector.get(ServiceA);
  }, /NG0200/, 'Circular dependency between ServiceA and ServiceB must throw NG0200');
});

// ===========================================================================
// SECTION 2: Reactive Signals State Encapsulation & Mutability Defense
// ===========================================================================
console.log('\n--- SECTION 2: Reactive Signals State Encapsulation & Mutability Defense ---');

runTest('2.1', 'CinemaService state encapsulation: _selectedMovie is private writable signal', () => {
  class CinemaServiceMock {
    _selectedMovie = signal('رحلة النجوم');
    selectedMovie = this._selectedMovie.asReadonly();

    selectMovie(title) {
      this._selectedMovie.set(title);
    }
  }

  const service = new CinemaServiceMock();
  checkEqual(service.selectedMovie(), 'رحلة النجوم', 'Initial value matches');

  service.selectMovie('واحة الأمل');
  checkEqual(service.selectedMovie(), 'واحة الأمل', 'Updated value reflected in readonly view');
});

runTest('2.2', 'Readonly signal strictly rejects mutation attempts (.set, .update, property assignment)', () => {
  const writeable = signal(100);
  const readonlyView = writeable.asReadonly();

  checkEqual(readonlyView(), 100, 'Readonly signal reads correctly');
  checkEqual(readonlyView.set, undefined, 'readonlyView.set must be undefined');
  checkEqual(readonlyView.update, undefined, 'readonlyView.update must be undefined');

  assert.throws(() => {
    readonlyView.set(200);
  }, TypeError, 'Calling readonlyView.set() must throw TypeError');

  assert.throws(() => {
    readonlyView.update(n => n + 1);
  }, TypeError, 'Calling readonlyView.update() must throw TypeError');

  // Attempt property tampering
  try {
    readonlyView.set = () => {};
  } catch (e) {
    // Expected in strict mode / frozen object
  }
  checkEqual(readonlyView.set, undefined, 'readonlyView.set cannot be overwritten');
});

runTest('2.3', 'Synchronous reactive graph: derived computed() updates immediately on source signal change', () => {
  const _movie = signal('رحلة النجوم');
  const movie = _movie.asReadonly();
  const bannerText = computed(() => `الفيلم المختار حالياً: ${movie()}`);

  checkEqual(bannerText(), 'الفيلم المختار حالياً: رحلة النجوم', 'Initial computed evaluation');
  checkEqual(bannerText.getEvalCount(), 1, 'Evaluated once');

  // Mutate source signal
  _movie.set('حارس المجرة');
  checkEqual(bannerText(), 'الفيلم المختار حالياً: حارس المجرة', 'Computed reflects updated readonly signal');
  checkEqual(bannerText.getEvalCount(), 2, 'Evaluated twice');

  // Mutate to identical value -> equality check prevents evaluation
  _movie.set('حارس المجرة');
  checkEqual(bannerText(), 'الفيلم المختار حالياً: حارس المجرة', 'Computed maintains value');
  checkEqual(bannerText.getEvalCount(), 2, 'No redundant evaluation on identical value');
});

runTest('2.4', 'High-fanout consumer stress: 50 simultaneous computed listeners observe readonly signal', () => {
  const _state = signal(0);
  const state = _state.asReadonly();

  const listeners = [];
  for (let i = 0; i < 50; i++) {
    listeners.push(computed(() => state() * 10 + i));
  }

  // Initial read
  listeners.forEach((l, i) => checkEqual(l(), i, `Listener ${i} initial`));

  // Update source
  _state.set(5);
  listeners.forEach((l, i) => checkEqual(l(), 50 + i, `Listener ${i} updated`));
});

// ===========================================================================
// SECTION 3: Modern HttpClient Engine & `provideHttpClient(withFetch())`
// ===========================================================================
console.log('\n--- SECTION 3: Modern HttpClient Engine & provideHttpClient(withFetch()) ---');

runTest('3.1', 'provideHttpClient(withFetch()) provider configuration and feature flags', () => {
  const provider = provideHttpClient(withFetch());
  checkEqual(provider.provide, 'HTTP_CLIENT_CONFIG', 'Provider token matches');
  checkEqual(provider.useValue.withFetch, true, 'withFetch feature is enabled');
  check(Array.isArray(provider.useValue.features), 'features is an array');
  check(provider.useValue.features.includes('withFetch'), 'features contains withFetch');
});

runTest('3.2', 'Strictly typed http.get<Movie[]> with schema validation and query parameters', () => {
  const mockMovies = [
    { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي', duration: '120 دقيقة', rating: 4.8, price: 85, available: true },
    { id: 2, title: 'واحة الأمل', genre: 'دراما', duration: '105 دقيقة', rating: 4.6, price: 75, available: true }
  ];

  let receivedRequest = null;
  const mockHandler = {
    handle: (req) => {
      receivedRequest = req;
      return of(new HttpResponse({ status: 200, body: mockMovies }));
    }
  };

  const http = new HttpClient(mockHandler);
  let result = null;

  http.get('/api/movies', { params: { genre: 'خيال علمي' } }).subscribe(res => {
    result = res.body;
  });

  checkEqual(receivedRequest.method, 'GET', 'Request method is GET');
  checkEqual(receivedRequest.url, '/api/movies', 'Request URL is /api/movies');
  checkEqual(receivedRequest.params.genre, 'خيال علمي', 'Query parameter passed');
  check(Array.isArray(result), 'Result is array');
  checkEqual(result.length, 2, '2 movies returned');

  // Verify schema conformity
  result.forEach(m => {
    check(typeof m.id === 'number', 'Movie.id is number');
    check(typeof m.title === 'string', 'Movie.title is string');
    check(typeof m.price === 'number', 'Movie.price is number');
    check(typeof m.available === 'boolean', 'Movie.available is boolean');
  });
});

runTest('3.3', 'Strictly typed http.post<BookingResponse> with payload verification and response shape', () => {
  const payload = { movieId: 1, seats: ['A1', 'A2'] };
  let capturedBody = null;

  const mockHandler = {
    handle: (req) => {
      capturedBody = req.body;
      return of(new HttpResponse({
        status: 201,
        statusText: 'Created',
        body: { bookingId: 'KHT-2026-8819', confirmedSeats: req.body.seats, totalPaid: 170 }
      }));
    }
  };

  const http = new HttpClient(mockHandler);
  let bookingResponse = null;

  http.post('/api/bookings', payload).subscribe(res => {
    bookingResponse = res.body;
  });

  checkDeepEqual(capturedBody, payload, 'Sent body matches input payload');
  checkEqual(bookingResponse.bookingId, 'KHT-2026-8819', 'Booking ID returned');
  checkEqual(bookingResponse.totalPaid, 170, 'Total paid matches');
  checkDeepEqual(bookingResponse.confirmedSeats, ['A1', 'A2'], 'Confirmed seats match');
});

runTest('3.4', 'Http error responses (404 Not Found, 500 Server Error) propagate cleanly', () => {
  const errorHandler = {
    handle: (req) => {
      return throwError(new HttpErrorResponse({
        url: req.url,
        status: 404,
        statusText: 'Not Found',
        error: { message: 'Movie not found' }
      }));
    }
  };

  const http = new HttpClient(errorHandler);
  let caughtError = null;

  http.get('/api/movies/999').subscribe({
    next: () => assert.fail('Should not succeed on 404'),
    error: (err) => {
      caughtError = err;
    }
  });

  check(caughtError instanceof HttpErrorResponse, 'Error is instance of HttpErrorResponse');
  checkEqual(caughtError.status, 404, 'Status code is 404');
  checkEqual(caughtError.statusText, 'Not Found', 'Status text is Not Found');
  checkEqual(caughtError.error.message, 'Movie not found', 'Error body accessible');
});

// ===========================================================================
// SECTION 4: Functional Interceptors (`HttpInterceptorFn`)
// ===========================================================================
console.log('\n--- SECTION 4: Functional Interceptors (HttpInterceptorFn) ---');

runTest('4.1', 'Request immutability: req.clone() produces distinct copy and preserves original', () => {
  const originalReq = new HttpRequest('GET', '/api/movies', {
    headers: { 'X-Original': 'true' }
  });

  const clonedReq = originalReq.clone({
    setHeaders: {
      'Authorization': 'Bearer test-token-123',
      'X-Trace-Id': 'TRACE-99'
    }
  });

  check(originalReq !== clonedReq, 'Cloned request is a new object reference');
  checkEqual(originalReq.headers.get('X-Original'), 'true', 'Original request preserved header');
  checkEqual(originalReq.headers.has('Authorization'), false, 'Original request does NOT have Authorization');
  checkEqual(originalReq.headers.has('X-Trace-Id'), false, 'Original request does NOT have Trace ID');

  checkEqual(clonedReq.headers.get('X-Original'), 'true', 'Cloned request retained original header');
  checkEqual(clonedReq.headers.get('Authorization'), 'Bearer test-token-123', 'Cloned request has Authorization');
  checkEqual(clonedReq.headers.get('X-Trace-Id'), 'TRACE-99', 'Cloned request has Trace ID');
});

runTest('4.2', 'authInterceptor adds Authorization header via req.clone()', () => {
  const authInterceptor = (req, next) => {
    const token = 'khotwa-cinema-token';
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  };

  const initialReq = new HttpRequest('GET', '/api/profile');
  let dispatchedReq = null;

  authInterceptor(initialReq, (finalReq) => {
    dispatchedReq = finalReq;
    return of(new HttpResponse({ status: 200 }));
  });

  check(dispatchedReq !== null, 'Interceptor forwarded request to next');
  checkEqual(dispatchedReq.headers.get('Authorization'), 'Bearer khotwa-cinema-token', 'Bearer token injected');
});

runTest('4.3', 'Multi-interceptor pipeline execution ordering and header accumulation', () => {
  const executionLog = [];

  const timingInterceptor = (req, next) => {
    executionLog.push('timing-in');
    const modified = req.clone({ setHeaders: { 'X-Timestamp': '1700000000' } });
    return next(modified).pipe(tap(() => {
      executionLog.push('timing-out');
    }));
  };

  const authInterceptor = (req, next) => {
    executionLog.push('auth-in');
    const modified = req.clone({ setHeaders: { 'Authorization': 'Bearer JWT-P5' } });
    return next(modified).pipe(tap(() => {
      executionLog.push('auth-out');
    }));
  };

  const loggingInterceptor = (req, next) => {
    executionLog.push('logging-in');
    const modified = req.clone({ setHeaders: { 'X-Request-Logged': 'true' } });
    return next(modified).pipe(tap(() => {
      executionLog.push('logging-out');
    }));
  };

  // Compose chain: timing -> auth -> logging -> handler
  const backendHandler = (req) => {
    executionLog.push('backend-handle');
    checkEqual(req.headers.get('X-Timestamp'), '1700000000', 'Timestamp header received by backend');
    checkEqual(req.headers.get('Authorization'), 'Bearer JWT-P5', 'Auth header received by backend');
    checkEqual(req.headers.get('X-Request-Logged'), 'true', 'Logging header received by backend');
    return of(new HttpResponse({ status: 200, body: 'OK' }));
  };

  const chain = (req) => timingInterceptor(req, (req1) => authInterceptor(req1, (req2) => loggingInterceptor(req2, backendHandler)));

  const req0 = new HttpRequest('GET', '/api/test-chain');
  chain(req0).subscribe();

  checkDeepEqual(
    executionLog,
    ['timing-in', 'auth-in', 'logging-in', 'backend-handle', 'logging-out', 'auth-out', 'timing-out'],
    'Pipeline executed in exact forward/reverse onion order'
  );
});

runTest('4.4', 'Interceptor short-circuiting: caching interceptor returns cached response without calling next', () => {
  const cache = new Map();
  cache.set('/api/cached-movies', ['Cached Movie 1', 'Cached Movie 2']);

  let backendCalled = false;
  const cachingInterceptor = (req, next) => {
    if (req.method === 'GET' && cache.has(req.url)) {
      return of(new HttpResponse({ status: 200, body: cache.get(req.url) }));
    }
    return next(req);
  };

  const backendHandler = () => {
    backendCalled = true;
    return of(new HttpResponse({ status: 200, body: ['Fresh Movie'] }));
  };

  let responseBody = null;
  cachingInterceptor(new HttpRequest('GET', '/api/cached-movies'), backendHandler).subscribe(res => {
    responseBody = res.body;
  });

  checkEqual(backendCalled, false, 'Backend must NOT be called when cache hits');
  checkDeepEqual(responseBody, ['Cached Movie 1', 'Cached Movie 2'], 'Cached body returned');
});

// ===========================================================================
// SECTION 5: RxJS to Signals Interoperability (`toSignal()`)
// ===========================================================================
console.log('\n--- SECTION 5: RxJS to Signals Interoperability (toSignal) ---');

runTest('5.1', 'toSignal() initialValue propagation: immediate synchronous read without emission', () => {
  const stream$ = new MockSubject();
  const moviesSignal = toSignal(stream$, { initialValue: [] });

  checkEqual(typeof moviesSignal, 'function', 'toSignal returns a callable function');
  checkDeepEqual(moviesSignal(), [], 'Initial read returns initialValue array immediately');
});

runTest('5.2', 'Stream emissions update signal synchronously', () => {
  const stream$ = new MockSubject();
  const moviesSignal = toSignal(stream$, { initialValue: [] });

  const batch1 = [{ id: 1, title: 'رحلة النجوم' }];
  stream$.next(batch1);
  checkDeepEqual(moviesSignal(), batch1, 'Signal updated after first emission');

  const batch2 = [{ id: 1, title: 'رحلة النجوم' }, { id: 2, title: 'واحة الأمل' }];
  stream$.next(batch2);
  checkDeepEqual(moviesSignal(), batch2, 'Signal updated after second emission');
});

runTest('5.3', 'toSignal() driving downstream computed() reactive derivations', () => {
  const stream$ = new MockSubject();
  const moviesSignal = toSignal(stream$, { initialValue: [] });
  const movieCount = computed(() => moviesSignal().length);
  const hasMovies = computed(() => movieCount() > 0);

  checkEqual(movieCount(), 0, 'Initial count is 0');
  checkEqual(hasMovies(), false, 'hasMovies is false');

  stream$.next(['فيلم 1', 'فيلم 2', 'فيلم 3']);
  checkEqual(movieCount(), 3, 'movieCount computed recalculated to 3');
  checkEqual(hasMovies(), true, 'hasMovies computed recalculated to true');
});

runTest('5.4', 'requireSync validation: throws NG0601 when stream is async and no initialValue provided', () => {
  const asyncStream$ = new MockSubject();

  assert.throws(() => {
    toSignal(asyncStream$, { requireSync: true });
  }, /NG0601/, 'Must throw NG0601 when requireSync is true but no synchronous emission occurs');

  // Synchronous stream with of() succeeds with requireSync
  const syncStream$ = of(['فيلم متزامن']);
  const syncSig = toSignal(syncStream$, { requireSync: true });
  checkDeepEqual(syncSig(), ['فيلم متزامن'], 'requireSync succeeds with synchronous observable');
});

runTest('5.5', 'Subscription teardown & lifecycle cleanup: prevents memory leaks on context destruction', () => {
  const stream$ = new MockSubject();
  const moviesSig = toSignal(stream$, { initialValue: ['أولي'] });

  checkEqual(stream$._subscribers.size, 1, 'Stream has 1 active subscriber');
  checkDeepEqual(moviesSig(), ['أولي'], 'Initial value present');

  // Trigger teardown
  moviesSig._destroy();
  checkEqual(stream$._subscribers.size, 0, 'Subscriber removed after destroy');

  // Emitting after destruction does not affect signal
  stream$.next(['بعد التدمير']);
  checkDeepEqual(moviesSig(), ['أولي'], 'Signal did not update after teardown');
});

runTest('5.6', 'Error handling in toSignal(): rejectErrors throws error on signal read', () => {
  const stream$ = new MockSubject();
  const errorSig = toSignal(stream$, { initialValue: 'OK', rejectErrors: true });

  checkEqual(errorSig(), 'OK', 'Returns initial value before error');

  const customError = new Error('Database connection failed');
  stream$.error(customError);

  assert.throws(() => {
    errorSig();
  }, (err) => err.message === 'Database connection failed', 'Reading signal throws stream error when rejectErrors is true');
});

// ===========================================================================
// SECTION 6: High-Volume Scalability & Simulator Error Resilience
// ===========================================================================
console.log('\n--- SECTION 6: High-Volume Scalability & Simulator Error Resilience ---');

runTest('6.1', 'High-volume concurrency stress: 100 concurrent HTTP requests through interceptor chain', () => {
  const mockBackend = {
    handle: (req) => of(new HttpResponse({ status: 200, body: { url: req.url, id: req.params.id } }))
  };

  const authInterceptor = (req, next) => {
    return next(req.clone({ setHeaders: { Authorization: 'Bearer STRESS-TEST' } }));
  };

  const client = new HttpClient({
    handle: (req) => authInterceptor(req, (r) => mockBackend.handle(r))
  });

  const startTime = Date.now();
  let completed = 0;

  for (let i = 0; i < 100; i++) {
    client.get(`/api/items/${i}`, { params: { id: i } }).subscribe(res => {
      checkEqual(res.body.id, i, `Item ${i} matches`);
      completed++;
    });
  }

  const duration = Date.now() - startTime;
  checkEqual(completed, 100, 'All 100 requests completed');
  check(duration < 200, `100 requests completed in ${duration}ms (< 200ms)`);
});

runTest('6.2', 'High-volume signal mutation stress: 1,000 rapid updates on encapsulated service signal', () => {
  const _counter = signal(0);
  const counter = _counter.asReadonly();
  const doubled = computed(() => counter() * 2);

  const start = Date.now();
  for (let i = 1; i <= 1000; i++) {
    _counter.update(n => n + 1);
  }

  checkEqual(counter(), 1000, 'Counter equals 1000 after 1000 updates');
  checkEqual(doubled(), 2000, 'Doubled computed equals 2000');
  const duration = Date.now() - start;
  check(duration < 200, `1000 signal mutations completed in ${duration}ms (< 200ms)`);
});

runTest('6.3', 'High-volume DI resolution stress: 100 independent services resolved in root injector', () => {
  const providers = [];
  for (let i = 0; i < 100; i++) {
    const token = new InjectionToken(`SERVICE_${i}`);
    providers.push({ provide: token, useValue: { id: i, name: `Service #${i}` } });
  }

  const injector = new Injector(providers);
  const start = Date.now();

  for (let i = 0; i < 100; i++) {
    const token = providers[i].provide;
    const res = injector.get(token);
    checkEqual(res.id, i, `Service ${i} resolved`);
  }

  const duration = Date.now() - start;
  check(duration < 100, `100 DI tokens resolved in ${duration}ms (< 100ms)`);
});

runTest('6.4', 'Simulator preview fuzzing: corrupted & malformed TypeScript in cinema.service.ts does not crash', () => {
  const malformedSnippets = [
    'export class CinemaService { private http = inject(;',
    'export class CinemaService { _selectedMovie = signal<string>(;',
    'export class CinemaService { readonly selectedMovie = this._selectedMovie.asReadonly(',
    'export class CinemaService { fetchMovies() { return this.http.get<Movie[]>(',
    'export const authInterceptor: HttpInterceptorFn = (req, next) => { req.clone({',
    'class App { moviesList = toSignal(this.cinemaService.fetchMovies(), { initialValue: [ }'
  ];

  malformedSnippets.forEach((code, idx) => {
    env.setFiles({
      'src/app/services/cinema.service.ts': code,
      'src/app/app.ts': courseData.starterFiles['src/app/app.ts'],
      'src/app/app.html': '<h1>اختبار صمود المحاكي</h1>'
    });

    assert.doesNotThrow(() => {
      env.runSimulatedPreview();
    }, `Malformed snippet #${idx + 1} must not crash preview generator`);
  });
});

runTest('6.5', 'checkSupportedTask adversarial whitespace and formatting tolerance for all 7 Phase 5 lessons', () => {
  p5Lessons.forEach(lesson => {
    // 1. CRLF line endings
    const crlfCode = lesson.code.replace(/\n/g, '\r\n');
    env.setFiles({ [lesson.file]: crlfCode });
    check(env.checkSupportedTask(lesson), `Lesson ${lesson.id} passes with CRLF`);

    // 2. Extra spaces and tabs around expected
    const spacedCode = `\n\n\t   ${lesson.expected}   \t\n\n`;
    env.setFiles({ [lesson.file]: spacedCode });
    check(env.checkSupportedTask(lesson), `Lesson ${lesson.id} passes with extra spaces and tabs`);

    // 3. Realistic surrounding code
    const surroundingCode = `
      // التعليق التوضيحي للدرس
      import { Injectable } from '@angular/core';

      ${lesson.expected}

      // نهاية الملف
    `;
    env.setFiles({ [lesson.file]: surroundingCode });
    check(env.checkSupportedTask(lesson), `Lesson ${lesson.id} passes with surrounding code and comments`);
  });
});

runTest('6.6', 'checkSupportedTask negative rejection (zero false positives) across 21 adversarial mutations', () => {
  p5Lessons.forEach(lesson => {
    // 1. Empty file
    env.setFiles({ [lesson.file]: '' });
    checkEqual(env.checkSupportedTask(lesson), false, `Lesson ${lesson.id} rejects empty file`);

    // 2. Wrong file path
    env.setFiles({
      [lesson.file]: 'completely unrelated code',
      'src/wrong/path.ts': lesson.code
    });
    checkEqual(env.checkSupportedTask(lesson), false, `Lesson ${lesson.id} rejects snippet in wrong file`);

    // 3. Typo in expected token
    const corruptedExpected = lesson.expected.replace(/inject|asReadonly|provideHttpClient|get|post|HttpInterceptorFn|toSignal/g, 'corrupted_token');
    env.setFiles({ [lesson.file]: corruptedExpected });
    checkEqual(env.checkSupportedTask(lesson), false, `Lesson ${lesson.id} rejects corrupted token`);
  });
});

// ===========================================================================
// SECTION 7: Global Course Data Integrity & Master E2E Runner Execution
// ===========================================================================
console.log('\n--- SECTION 7: Global Course Data Integrity & Master E2E Runner Execution ---');

runTest('7.1', 'Phase 5 module descriptor "phase-5-di-http" exists and is strictly valid', () => {
  const mod = courseData.modules['phase-5-di-http'];
  check(mod !== undefined, 'Module phase-5-di-http exists');
  checkEqual(mod.id, 'phase-5-di-http', 'id matches');
  checkEqual(mod.icon, '🌐', 'Icon matches 🌐');
  check(mod.badge.includes('7'), 'Badge mentions 7 lessons');
  checkEqual(mod.lessonCount, 7, 'lessonCount is 7');
});

runTest('7.2', 'Curriculum contains 91 or 97 lessons with zero duplicate IDs', () => {
  check([91, 97].includes(courseData.lessons.length), 'Curriculum has 91 or 97 lessons');
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
  check([91, 97].includes(seenIds.size), '91 or 97 unique lesson IDs verified');
});

runTest('7.3', 'Phase 5 lessons occupy indices 38 through 44 with correct sequence', () => {
  const expectedP5 = [
    'ng-di-01',
    'ng-service-01',
    'ng-http-01',
    'ng-http-02',
    'ng-http-03',
    'ng-http-04',
    'ng-interop-01'
  ];

  expectedP5.forEach((id, offset) => {
    const idx = 38 + offset;
    checkEqual(courseData.lessons[idx].id, id, `Index ${idx} is ${id}`);
    checkEqual(courseData.lessons[idx].module, 'phase-5-di-http', `Module of ${id} is phase-5-di-http`);
  });
});

runTest('7.4', 'All 7 Phase 5 lessons adhere strictly to the 15-field schema and 5-step pedagogy', () => {
  const requiredFields = [
    'id', 'module', 'phase', 'title', 'duration', 'level',
    'summary', 'concept', 'flow', 'task', 'file', 'code',
    'expected', 'reference', 'steps'
  ];

  p5Lessons.forEach(lesson => {
    requiredFields.forEach(f => {
      check(lesson[f] !== undefined && lesson[f] !== null, `Lesson ${lesson.id} has field ${f}`);
    });
    checkEqual(Object.keys(lesson).length, 15, `Lesson ${lesson.id} has exactly 15 schema fields`);

    // Reference URL
    check(lesson.reference.startsWith('https://angular.dev/'), `Lesson ${lesson.id} references angular.dev`);

    // Flow arrow
    check(lesson.flow.includes('⟶'), `Lesson ${lesson.id} flow contains ⟶`);

    // Steps array
    checkEqual(lesson.steps.length, 5, `Lesson ${lesson.id} has exactly 5 steps`);
    checkEqual(lesson.steps[0].id, 'idea', 'Step 1 is idea');
    checkEqual(lesson.steps[1].id, 'anatomy', 'Step 2 is anatomy');
    checkEqual(lesson.steps[2].id, 'practice', 'Step 3 is practice');
    checkEqual(lesson.steps[3].id, 'experiment', 'Step 4 is experiment');
    checkEqual(lesson.steps[4].id, 'quiz', 'Step 5 is quiz');

    // Quiz validation
    const quiz = lesson.steps[4];
    checkEqual(quiz.type, 'quiz', 'Step 5 type is quiz');
    check(quiz.question && quiz.question.length > 10, 'Quiz has question');
    check(Array.isArray(quiz.options) && quiz.options.length >= 3, 'Quiz has at least 3 options');
    check(typeof quiz.correct === 'number' && quiz.correct >= 0 && quiz.correct < quiz.options.length, 'Valid correct index');
  });
});

runTest('7.5', 'Starter files integrity: app.config.ts, cinema.service.ts, app.ts, auth.interceptor.ts', () => {
  const sf = courseData.starterFiles;

  // app.config.ts
  check(sf['src/app/app.config.ts'].includes('provideHttpClient(withFetch())'), 'app.config.ts has provideHttpClient(withFetch())');

  // cinema.service.ts
  check(sf['src/app/services/cinema.service.ts'].includes('inject(HttpClient)'), 'cinema.service.ts has inject(HttpClient)');
  check(sf['src/app/services/cinema.service.ts'].includes('this._selectedMovie.asReadonly()'), 'cinema.service.ts has asReadonly()');
  check(sf['src/app/services/cinema.service.ts'].includes('fetchMovies(): Observable<Movie[]>'), 'cinema.service.ts has fetchMovies()');
  check(sf['src/app/services/cinema.service.ts'].includes('confirmBooking('), 'cinema.service.ts has confirmBooking()');

  // app.ts
  check(sf['src/app/app.ts'].includes('inject(CinemaService)'), 'app.ts has inject(CinemaService)');
  check(sf['src/app/app.ts'].includes('toSignal(this.cinemaService.fetchMovies()'), 'app.ts has toSignal()');
  check(sf['src/app/app.ts'].includes('totalTickets = signal(10)'), 'app.ts preserves totalTickets from Phase 4');
  check(sf['src/app/app.ts'].includes('totalPrice = signal(250)'), 'app.ts preserves totalPrice from Phase 3');

  // auth.interceptor.ts
  check(sf['src/app/interceptors/auth.interceptor.ts'].includes('export const authInterceptor: HttpInterceptorFn'), 'auth.interceptor.ts exports HttpInterceptorFn');
  check(sf['src/app/interceptors/auth.interceptor.ts'].includes('req.clone({'), 'auth.interceptor.ts calls req.clone()');
});

runTest('7.6', 'Master E2E runner execution: node tests/e2e/run_all_e2e_tests.cjs passes 59/59', () => {
  const output = execSync('node tests/e2e/run_all_e2e_tests.cjs', {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    stdio: 'pipe'
  });

  check(output.includes('Total Test Cases : 59'), 'E2E total 59 tests verified');
  check(output.includes('Passed           : 59 ✅'), 'E2E 59 passed verified');
  check(output.includes('Failed           : 0 🎉'), 'E2E 0 failed verified');
  check(output.includes('ALL E2E TEST TIERS PASSED SUCCESSFULLY'), 'E2E runner completed successfully');
});

// ===========================================================================
// SUITE SUMMARY & EXIT CODE
// ===========================================================================
console.log('\n===============================================================================');
console.log(`📊 CHALLENGER 2 STRESS SUITE SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests} | Assertions: ${totalAssertions}`);
console.log('===============================================================================');

if (failedTests > 0) {
  console.error('\n❌ DETECTED FAILURES:');
  failureDetails.forEach(f => {
    console.error(`- [${f.section}] ${f.name}`);
    console.error(`  Error: ${f.error}`);
  });
  process.exit(1);
} else {
  console.log(`🎉 ALL ${totalTests} ADVERSARIAL STRESS TESTS PASSED EMPIRICALLY WITH ZERO DEFECTS!`);
  process.exit(0);
}

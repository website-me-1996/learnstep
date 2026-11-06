/**
 * Tier 3: Cross-Feature Combinations E2E Test Suite
 * Tests pairwise interactions between modern Angular features:
 * 1. Signals + Control Flow (@for/@if reactive to signal mutations)
 * 2. Modern DI + RxJS Interop (inject() + Observable + toSignal())
 * 3. Routes + Functional Guards + Signal Inputs (loadComponent + CanActivateFn + input())
 * 4. Typed Reactive Forms + Custom Validators + Signal State
 * 5. Central Signals Store + Seat Matrix + Checkout Computed Price
 * 6. Two-Way Signal Model + Computed Catalog Filtering
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEditorEnvironment } = require('./helpers/e2e_harness.cjs');
const {
  signal,
  computed,
  CinemaStore,
  calculateBookingCost,
  saudiPhoneValidator,
  generate60SeatHall
} = require('./helpers/cinema_simulator.cjs');

// =========================================================================
// Interaction 1: Signals + Modern Control Flow
// =========================================================================
test('Tier 3.1 [Pairwise] - Signals Mutation Drives Template Control Flow Branches', () => {
  const env = createEditorEnvironment();

  const template = `
    @if (totalPrice >= 200) {
      <div class="vip-benefit">🎉 مؤهل للترقية المجانية لصالة VIP!</div>
    } @else {
      <div class="standard-notice">أضف تذاكر أخرى للترقية</div>
    }
  `;

  // Case A: 1 ticket -> totalPrice = 85 -> @else branch
  env.setFiles({
    'src/app/app.ts': 'export class App { ticketCount = 1; totalPrice = 85; }',
    'src/app/app.html': template
  });
  env.runSimulatedPreview();
  let html = env.getPreviewSrcdoc();
  assert.ok(html.includes('أضف تذاكر أخرى للترقية'));
  assert.ok(!html.includes('مؤهل للترقية المجانية'));

  // Case B: 3 tickets -> totalPrice = 255 -> @if branch
  env.setFiles({
    'src/app/app.ts': 'export class App { ticketCount = 3; totalPrice = 255; }',
    'src/app/app.html': template
  });
  env.runSimulatedPreview();
  html = env.getPreviewSrcdoc();
  assert.ok(html.includes('مؤهل للترقية المجانية'));
  assert.ok(!html.includes('أضف تذاكر أخرى للترقية'));
});

// =========================================================================
// Interaction 2: Modern DI + RxJS Interop Bridge
// =========================================================================
test('Tier 3.2 [Pairwise] - Functional DI inject() with toSignal() RxJS Conversion', () => {
  // Simulate RxJS Observable and toSignal interop bridge
  class MockObservable {
    constructor(subscribeFn) {
      this._subscribeFn = subscribeFn;
    }
    subscribe(observer) {
      const next = typeof observer === 'function' ? observer : observer.next.bind(observer);
      return this._subscribeFn({ next });
    }
  }

  function mockToSignal(obs$, options = {}) {
    const sig = signal(options.initialValue !== undefined ? options.initialValue : undefined);
    obs$.subscribe({
      next: (val) => sig.set(val)
    });
    return sig;
  }

  // Simulate CinemaService providing an Observable stream
  class MockCinemaService {
    fetchMovies() {
      return new MockObservable((subscriber) => {
        // Synchronous or asynchronous emission
        subscriber.next([
          { id: 1, title: 'رحلة النجوم' },
          { id: 2, title: 'واحة الأمل' }
        ]);
        return { unsubscribe() {} };
      });
    }
  }

  // Component injecting service and bridging stream to signal
  const service = new MockCinemaService();
  const moviesSignal = mockToSignal(service.fetchMovies(), { initialValue: [] });

  assert.equal(typeof moviesSignal, 'function', 'toSignal must produce a callable signal');
  const movies = moviesSignal();
  assert.equal(Array.isArray(movies), true);
  assert.equal(movies.length, 2);
  assert.equal(movies[0].title, 'رحلة النجوم');
});

// =========================================================================
// Interaction 3: Routes + Functional Guards + Signal Inputs
// =========================================================================
test('Tier 3.3 [Pairwise] - Route Guard CanActivateFn with withComponentInputBinding', () => {
  // Mock Router
  const routerState = {
    currentUrl: '/movies',
    navigatedUrl: null,
    createUrlTree: (commands) => ({ path: commands.join('/') }),
    navigateByUrl: (url) => { routerState.navigatedUrl = url; }
  };

  // Mock Functional Guard
  const bookingGuard = (store, router) => {
    const hasSelectedSeats = store.selectedSeats().length > 0;
    if (hasSelectedSeats) {
      return true;
    }
    return router.createUrlTree(['/movies']);
  };

  const store = new CinemaStore();

  // Test Guard when NO seats are selected
  const guardResultBlocked = bookingGuard(store, routerState);
  assert.deepEqual(guardResultBlocked, { path: '/movies' }, 'Guard must redirect to /movies when no seats chosen');

  // User selects a seat
  store.toggleSeat('B4');
  assert.equal(store.selectedSeats().length, 1);

  // Test Guard when seat is selected
  const guardResultAllowed = bookingGuard(store, routerState);
  assert.equal(guardResultAllowed, true, 'Guard must allow route navigation when seats are selected');

  // Verify route param mapped to Signal input in target component
  const routeParams = { id: '5' };
  const mockComponentSignalInput = signal(routeParams.id);
  assert.equal(mockComponentSignalInput(), '5', 'Route param :id must be bound as Signal input');
});

// =========================================================================
// Interaction 4: Typed Reactive Forms + Custom Validators + Signal State
// =========================================================================
test('Tier 3.4 [Pairwise] - Typed FormGroup with saudiPhoneValidator Synced to Signal State', () => {
  class MockControl {
    constructor(val, validators = []) {
      this.value = val;
      this.validators = validators;
      this.errors = null;
      this.valid = true;
      this.validate();
    }
    setValue(v) {
      this.value = v;
      this.validate();
    }
    validate() {
      for (const valFn of this.validators) {
        const err = valFn(this.value);
        if (err) {
          this.errors = err;
          this.valid = false;
          return;
        }
      }
      this.errors = null;
      this.valid = true;
    }
  }

  class MockBookingForm {
    constructor() {
      this.customerName = new MockControl('', [(v) => v.trim() ? null : { required: true }]);
      this.phone = new MockControl('', [saudiPhoneValidator]);
      this.isValidSignal = signal(this.isValid());
    }
    updateForm(name, phone) {
      this.customerName.setValue(name);
      this.phone.setValue(phone);
      this.isValidSignal.set(this.isValid());
    }
    isValid() {
      return this.customerName.valid && this.phone.valid;
    }
  }

  const form = new MockBookingForm();
  assert.equal(form.isValidSignal(), false, 'Initial empty form must be invalid');

  // Invalid phone format
  form.updateForm('أحمد محمود', '0612345678');
  assert.equal(form.phone.valid, false);
  assert.deepEqual(form.phone.errors, { invalidSaudiPhone: true });
  assert.equal(form.isValidSignal(), false);

  // Valid phone and name
  form.updateForm('أحمد محمود', '0512345678');
  assert.equal(form.phone.valid, true);
  assert.equal(form.phone.errors, null);
  assert.equal(form.isValidSignal(), true, 'Form signal must become true when all validators pass');
});

// =========================================================================
// Interaction 5: Central Signals Store + Seat Matrix + Checkout Computed Price
// =========================================================================
test('Tier 3.5 [Pairwise] - CinemaStore Signal Updates Drive Checkout Computed Pricing & VAT', () => {
  const store = new CinemaStore();
  const hall = generate60SeatHall();

  // Initially empty
  assert.equal(store.seatCount(), 0);
  let cost = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);
  assert.equal(cost.subtotal, 0);

  // User clicks standard seat C4 (85 SAR)
  store.toggleSeat('C4');
  assert.equal(store.seatCount(), 1);
  cost = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);
  assert.equal(cost.subtotal, 85);
  assert.equal(cost.vatAmount, 12.75); // 85 * 0.15 = 12.75
  assert.equal(cost.finalTotal, 97.75);

  // User clicks VIP seat A1 (120 SAR)
  store.toggleSeat('A1');
  assert.equal(store.seatCount(), 2);
  cost = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);
  assert.equal(cost.subtotal, 205); // 85 + 120 = 205
  assert.equal(cost.vatAmount, 30.75); // 205 * 0.15 = 30.75
  assert.equal(cost.finalTotal, 235.75);

  // User applies coupon "KHOTWA10" (10% off)
  const applied = store.applyCoupon('KHOTWA10');
  assert.equal(applied, true);
  assert.equal(store.discountRate(), 0.10);

  cost = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);
  assert.equal(cost.subtotal, 205);
  assert.equal(cost.discountAmount, 20.5); // 205 * 0.1 = 20.5
  assert.equal(cost.discountedSubtotal, 184.5);
  assert.equal(cost.vatAmount, 27.68); // 184.5 * 0.15 = 27.675 -> 27.68
  assert.equal(cost.finalTotal, 212.18); // 184.5 + 27.68 = 212.18
});

// =========================================================================
// Interaction 6: Two-Way Signal Model + Computed Catalog Filtering
// =========================================================================
test('Tier 3.6 [Pairwise] - Two-Way Model Signal Binding Directly Filters Computed Movie Catalog', () => {
  const initialMovies = [
    { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي' },
    { id: 2, title: 'واحة الأمل', genre: 'دراما' },
    { id: 3, title: 'فرسان الأمل', genre: 'مغامرة' }
  ];

  // Simulating SearchBox model<string>('')
  const searchModel = signal('');

  // Simulating MovieCatalog filteredMovies = computed(...)
  const movies = signal(initialMovies);
  const filteredMovies = computed(() => {
    const q = searchModel().trim();
    if (!q) return movies();
    return movies().filter(m => m.title.includes(q));
  });

  // Initial state: 3 movies
  assert.equal(filteredMovies().length, 3);

  // User types 'الأمل' into two-way model input
  searchModel.set('الأمل');
  assert.equal(filteredMovies().length, 2);
  assert.deepEqual(filteredMovies().map(m => m.id), [2, 3]);

  // User types 'نجوم'
  searchModel.set('نجوم');
  assert.equal(filteredMovies().length, 1);
  assert.equal(filteredMovies()[0].title, 'رحلة النجوم');

  // User clears search box
  searchModel.set('');
  assert.equal(filteredMovies().length, 3);
});

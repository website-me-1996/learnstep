# Khotwa Angular 22 - End-to-End (E2E) Test Infrastructure

## Overview

The Khotwa Angular 22 E2E test suite provides opaque-box, requirement-driven validation for the complete 60-lesson curriculum and the interactive browser runtime simulator. It operates across 4 rigorous testing tiers without requiring heavy external browser binaries, running natively and deterministically under Node.js with zero third-party testing dependencies.

---

## Directory Layout

```
tests/e2e/
├── run_all_e2e_tests.cjs              # Master E2E runner (aggregates tiers, exits 0 on pass)
├── helpers/
│   ├── curriculum_oracle.cjs          # Authoritative curriculum specification for all 60 lessons
│   ├── cinema_simulator.cjs           # Khotwa Cinema Pro application logic & simulation oracle
│   └── e2e_harness.cjs                # Mock DOM sandbox and angular-editor.js execution harness
├── tier1_feature_coverage.test.cjs    # Tier 1: Feature Coverage (7 areas, 60 lessons, 39 tests)
├── tier2_boundary_corner.test.cjs     # Tier 2: Boundary & Corner Cases (9 tests)
├── tier3_cross_feature.test.cjs       # Tier 3: Cross-Feature Combinations (6 tests)
└── tier4_application_scenarios.test.cjs # Tier 4: Real-World Application Scenarios (5 tests)
```

---

## Testing Tiers Architecture

### Tier 1: Feature Coverage (7 Feature Areas, 60 Lessons)
Exhaustively covers every architectural layer of the 60 lessons and runtime simulator with >= 5 tests per area:
1. **TypeScript Foundation** (`ng-ts-01` to `ng-ts-10`): Primitives, Readonly Arrays, Interfaces, Union Types, Typed Functions, OOP Classes, Generics `<T>`, Enums, Decorators, Null Safety (`?.`, `??`).
2. **Classic Angular Core & Enterprise Migration** (`ng-classic-01` to `ng-classic-13`): `NgModule`, Component Anatomy, Property Binding `[prop]`, Event Binding `(event)`, `*ngIf`/`ng-template`, `*ngFor` with index, `[ngClass]`, `@Input()`, `@Output()` + `EventEmitter`, Built-in Pipes (`currency`), Constructor DI, RxJS Subscriptions, `async` pipe.
3. **Modern Standalone & Control Flow** (`ng-modern-01` to `ng-modern-07`): `standalone: true`, `bootstrapApplication`, `@if`/`@else if`/`@else`, `@for` with mandatory `track`, `@empty` fallback, `@switch`/`@case`/`@default`, `@defer (on viewport)`.
4. **Signals Reactive Engine** (`ng-signal-01` to `ng-signal-08`): Fine-grained reactivity, `signal()`, `.set()` vs `.update()`, memoized `computed()`, reactive `effect()`, `input.required<T>()`, `output<T>()`, two-way `model<T>()`.
5. **Modern DI, HttpClient & Interop** (`ng-di-01` to `ng-interop-01`): Constructorless `inject()`, Signal state encapsulation (`.asReadonly()`), `provideHttpClient(withFetch())`, strictly typed GET/POST, Functional Interceptors (`req.clone()`), RxJS `toSignal()` interop.
6. **Routing & Typed Reactive Forms** (`ng-route-01` to `ng-forms-02`): Standalone `routes: Routes`, `loadComponent` lazy loading, `withComponentInputBinding()`, Functional Guards (`CanActivateFn`), typed `FormGroup` with `nonNullable` `FormControl`, custom `saudiPhoneValidator`.
7. **Capstone Khotwa Cinema Pro Enterprise** (`capstone-01` to `capstone-09`): Clean architecture (`core/`, `features/`, `shared/`), central `CinemaStore`, instant `computed()` catalog filter, interactive 60-seat matrix, 15% VAT & coupon calculation, digital boarding pass with `window.print()`, Vitest unit testing, production tree-shaking, portfolio README.

### Tier 2: Boundary & Corner Cases
Evaluates system limits, empty collections, malformed inputs, and security boundaries:
- **Empty Inputs**: Empty search queries, empty cart (0 seats selected), whitespace-only customer names, empty collections.
- **Invalid Formats**: Saudi phone regex validation (`05xxxxxxxx`), non-05 prefixes, length boundaries, special characters.
- **Security & Path Restrictions**: `isAllowedProjectPath` preventing path traversal (`../`), root slash, forbidden folders (`node_modules/`, `.git/`), and unsupported extensions.
- **nonNullable Forms Behavior**: Form reset reverts controls to default values, never `null`.
- **Track Expressions**: Unique identity resolution for duplicate items, track by index fallback.
- **Whitespace Tolerance**: Task verification normalizing whitespace and indentation variations.

### Tier 3: Cross-Feature Combinations (Pairwise Interactions)
Verifies multi-paradigm synergy between modern Angular features:
- **Signals + Control Flow**: Signal state changes reactively switching `@if` and `@else` template branches in simulator.
- **DI + RxJS Interop**: Injected `CinemaService` stream converted via `toSignal()` with fallback `initialValue`.
- **Routes + Functional Guards + Signal Inputs**: Lazy route guarded by `CanActivateFn`, feeding route `:id` as a Signal input into the component.
- **Typed Forms + Custom Validators + Signal State**: Form validity state synchronized with reactive Signal, controlling button enablement and error visualizers.
- **Central Signals Store + Seat Matrix + Computed VAT**: Real-time matrix toggles updating checkout subtotal, coupon discounts, and 15% VAT calculations.
- **Two-Way Signal Model + Computed Catalog Filtering**: Search box `model()` immediately driving instant `computed()` catalog filtering without UI latency.

### Tier 4: Real-World Application Scenarios
Simulates complete, multi-step end-to-end user workflows:
- **Scenario 1**: Complete Cinema Booking Lifecycle (Catalog browse ⟶ Search filter ⟶ Select showtime ⟶ Matrix seat selection ⟶ Checkout validation ⟶ Booking submission ⟶ Confirmation).
- **Scenario 2**: 60-Seat Auditorium Layout & Multi-Tier Pricing (Rows A-B VIP @ 120 SAR, Rows C-F Standard @ 85 SAR, pre-booked seat collision handling, dynamic seat toggles).
- **Scenario 3**: Financial Accounting Engine (Subtotal calculation, coupon discounts "KHOTWA10" 10%, exact 15% VAT application with proper rounding).
- **Scenario 4**: Digital Boarding Pass Ticket Issuance & Printing (Verification of ticket metadata, booking ref, barcode simulation, and `window.print()` invocation).
- **Scenario 5**: Khotwa 5-Step Micro-Learning & Hand-Craft Score Progression (Step advancement, slot builder code insertion, task verification, hand-craft ratio progression, and quiz scoring).

---

## Execution Guide

### Run Full E2E Test Suite
```bash
node tests/e2e/run_all_e2e_tests.cjs
```

### Run Individual Tiers
```bash
# Tier 1: Feature Coverage
node --test tests/e2e/tier1_feature_coverage.test.cjs

# Tier 2: Boundary & Corner Cases
node --test tests/e2e/tier2_boundary_corner.test.cjs

# Tier 3: Cross-Feature Combinations
node --test tests/e2e/tier3_cross_feature.test.cjs

# Tier 4: Real-World Application Scenarios
node --test tests/e2e/tier4_application_scenarios.test.cjs
```

---

## Output Derivation & Test Integrity

Every expected value in this suite is derived from explicit architectural specifications:
1. `PROJECT.md` interface contracts and feature inventory.
2. `ORIGINAL_REQUEST.md` approved 7-phase curriculum plan.
3. Explorer 3 Survey Handoff (`teamwork_explorer_survey_3/handoff.md`).
4. Strict mathematical formulas (Saudi VAT 15%, VIP tier pricing, coupon discounts).

Facade tests and dummy assertions are strictly forbidden. All tests exercise real runtime logic via the `e2e_harness` and `cinema_simulator` oracles.

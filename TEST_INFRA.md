# E2E Test Infra: steplearn Platform Modernization

## Test Philosophy
- Opaque-box, requirement-driven. No internal module monkey-patching.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.
- Verification entry points: DOM structure, CSS rules, layout orientation attributes, localStorage persistence, theme tokens, track navigation, content protection deactivation, and curriculum execution.

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 (Feature) | Tier 2 (Boundary) | Tier 3 (Cross) |
|---|---------|----------------------|:----------------:|:-----------------:|:--------------:|
| 1 | R1: CodePen-Style Flexible Layout | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | R2: Modern Dark Developer Theme | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 3 | R3: Dedicated Landing Homepage | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 4 | R4: Protection & Watermark Removal | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 5 | R5: Curriculum & Execution Integrity | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ |

## Test Architecture
- Test runner: Node.js native test runner (`node --test tests/e2e_modernization.test.cjs`)
- Directory layout: `tests/`
- Execution: Self-contained, exit code 0 on success.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | First-time learner lands on homepage, explores tracks, launches HTML lesson 1 | R3, R5, R2 | Medium |
| 2 | Learner toggles layout from side-by-side to stacked in wide/narrow viewports and reloads | R1, R2, R5 | High |
| 3 | Learner navigates between all 4 tracks (HTML, CSS, JS, Angular), verifying UI and dark theme | R3, R2, R5 | High |
| 4 | Learner takes screenshots (PrintScreen), switches window focus, prints page; verifies no screen blocking or watermarks | R4, R2, R5 | Medium |
| 5 | Full learner journey: homepage -> track selection -> editor code entry -> layout switch -> step completion -> return to homepage | R1, R2, R3, R4, R5 | Complex |

## Coverage Thresholds
- Tier 1: 25 tests (5 per feature across 5 features)
- Tier 2: 25 tests (5 per feature across 5 features)
- Tier 3: 5 pairwise cross-feature tests
- Tier 4: 5 real-world learner workflow tests
- **Total Minimum Target: 60 E2E tests**

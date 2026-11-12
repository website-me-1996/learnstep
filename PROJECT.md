# Project: steplearn Platform Modernization

## Architecture
- Single Page Application (`index.html`) using vanilla JavaScript, CSS3, CodeMirror 6, and WebContainer API for Angular 22.
- Layout: Shell layout with collapsible sidebar, top navigation, main container hosting `#home`, `#lesson`, `#project`, `#courses`, `#courseRoadmap`, `#angularCoursePanel`.
- Editor & Preview: `.editor-preview-split` containing `.editor` (`<textarea id="code">` or CodeMirror) and `.previewrow` (`<iframe id="preview">`).
- Protection & Security: `content-protection.js` is deactivated; the module keeps its compatibility API without blocking screenshots or input.
- Test Runner: Node.js test runner (`node --test`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R4-F1: Deactivate Screenshot Blocking | Disable PrintScreen detection, screen-shield-active blur, clipboard overwrite, and warning toasts | M1 | ORIGINAL_REQUEST §R4 |
| 2 | R4-F2: Remove Watermark Overlays | Remove `#learningWatermark`, tile generation, interval timers, and watermark CSS styles | M1 | ORIGINAL_REQUEST §R4 |
| 3 | R4-F3: Update Content Protection Tests | Update `content-protection.test.cjs` so deactivated/removed protection features pass test suite | M1 | ORIGINAL_REQUEST §R4 |
| 4 | R1-F1: Editor Layout Orientation Toggle | UI control in editor header to switch between side-by-side and stacked layout modes | M2 | ORIGINAL_REQUEST §R1 |
| 5 | R1-F2: Side-by-Side & Stacked Layout Styles | CSS rules for `.editor-preview-split` side-by-side (1fr 1fr) and stacked (preview below editor) with persistence | M2 | ORIGINAL_REQUEST §R1 |
| 6 | R1-F3: Responsive Layout Adaptability | Fully responsive behavior across desktop, tablet, and mobile viewports | M2 | ORIGINAL_REQUEST §R1 |
| 7 | R2-F1: Modern Dark Color Palette | Refreshed CSS variables for rich dark theme (`--bg`, `--surface`, `--ink`, `--green`, `--lime`) | M3 | ORIGINAL_REQUEST §R2 |
| 8 | R2-F2: Dark Theme Component Styling | Consistent dark styling for sidebar, cards, dialogs, progress, roadmaps, and buttons | M3 | ORIGINAL_REQUEST §R2 |
| 9 | R2-F3: Test Selector Preservation | Preserve all mandatory CSS selector strings required by `behavior.test.cjs` and responsive tests | M3 | ORIGINAL_REQUEST §R2 |
| 10 | R3-F1: Landing Homepage Section | Dedicated landing section welcoming learners, platform intro, feature highlights | M4 | ORIGINAL_REQUEST §R3 |
| 11 | R3-F2: Curriculum Track Cards & Links | Showcase cards for HTML (54), CSS (94), JS (119), Angular (106) with direct lesson links | M4 | ORIGINAL_REQUEST §R3 |
| 12 | R3-F3: Bidirectional Traversal | Seamless navigation from homepage into lessons and back to homepage | M4 | ORIGINAL_REQUEST §R3 |
| 13 | R5-F1: Curriculum Logic Preservation | Preserve all 373 lessons, DataLoader, SmartHintEngine, WebContainer runtime, and step verifications | M5 | ORIGINAL_REQUEST §R5 |
| 14 | R5-F2: 100% E2E & Regression Pass | Ensure all baseline tests (104 tests) and new E2E tests pass with zero failures | M5 | ORIGINAL_REQUEST §R5 |
| 15 | R5-F3: Adversarial Coverage Hardening | Tier 5 white-box challenger stress tests verifying edge cases and code paths | M5 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Protection & Watermark Removal | Deactivate screenshot listeners, remove watermarks, update content-protection.test.cjs | none | DONE |
| 2 | M2: CodePen-Style Flexible Layout | Toggle UI control, side-by-side & stacked CSS, responsive proportions, localStorage persistence | M1 | DONE |
| 3 | M3: Modern Dark Developer Theme | Dark palette variables, dark surface styles, typography, preserving test selector regexes | M2 | DONE |
| 4 | M4: Landing Homepage & Track Nav | Welcome section, track discovery, editor-and-preview overview, navigation to lessons | M3 | DONE |
| 5 | M5: Final E2E Pass & Hardening | Run E2E/regression suites and resolve any remaining failures | M4 | PENDING_VERIFICATION |

## Interface Contracts
### Protection Removal ↔ Test Suite (M1)
- `content-protection.js`: All screenshot listeners (PrintScreen, blur, visibilitychange) deactivated; `renderWatermark()` no-oped/removed; `#learningWatermark` not rendered.
- `content-protection.test.cjs`: Updated to assert that screenshot blocking is deactivated and no watermark is injected. All tests pass.
- `styles.css` / `index.html`: Obsolete protection overlay elements cleaned up or disabled without breaking any test assertions.

### Layout Toggle ↔ CSS & Storage (M2)
- Toggle button ID: `#layoutToggleBtn` inside `.editorhead`
- Container attribute: `.editor-preview-split[data-layout-orientation="side"]` and `[data-layout-orientation="stacked"]`
- Storage key: `localStorage.getItem('steplearn_editor_orientation')` -> `'side' | 'stacked'`, defaults to `'side'`
- In stacked mode: `.editor textarea` min-height: 240px, `.previewrow .preview` min-height: 280px, preview positioned beneath editor.

### Theme Tokens ↔ Components (M3)
- `:root` variables: `--bg: #0d1410`, `--surface: #14201a`, `--surface-raised: #1a2a22`, `--ink: #e6f2eb`, `--muted: #8ea89a`, `--line: #203328`, `--green: #2bb07f`, `--lime: #bbf268`
- Dark card backgrounds: `.card`, `.stat`, `.growth-dashboard`, `.modal-content` adopt dark tokens.
- Preserved regexes: `.editor textarea{direction:ltr;unicode-bidi:embed}`, `.growth-build-row{grid-template-columns:minmax(0,1fr)}`, `.starter-project-list{display:grid}`, `article.card[data-mobile-view="editor"] .previewrow{display:none!important}`.

### Homepage ↔ Lesson Navigation (M4)
- Landing section ID: `#landingSection` inside `index.html`.
- Primary links lead to `#courses` and `#lesson`; the global home navigation returns to `#home`.
- Track selectors in `#courses` switch HTML, CSS, or JavaScript lessons; the Angular course button enters `window.AngularCourse`.

## Code Layout
- `index.html`: Main SPA markup, shell, landing section, lesson cards, modal overlays.
- `styles.css`: Platform styling, dark theme variables, component rules, responsive media queries, orientation layout rules.
- `app.js`: Core platform logic, track selection, lesson progression, step verification, orientation toggle wiring, navigation handlers.
- `content-protection.js`: Content protection module (deactivated).
- `content-protection.test.cjs`: Tests for content protection behavior.
- `angular-editor.js`: WebContainer and CodeMirror runtime for Angular 22 track.

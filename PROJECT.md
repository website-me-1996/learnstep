# Project: StepLearn Platform Enhancements & Security Hardening

## Architecture
- **Web Educational Platform**: `steplearn` interactive micro-learning platform for web technologies and Angular (`d:\learning websit\chat-gpt version`).
- **Core Files**:
  - `index.html`: Main application shell, navigation, card layout, branding, and modals.
  - `styles.css`: Responsive design system, typography, breakpoints, themes, print rules, and security shields.
  - `app.js`: Core platform interaction, Slot Builder, reward system, navigation, and audio effects.
  - `content-protection.js`: Client-side protection, DevTools blocking, PrintScreen interception, mobile blur/touch deterrence, and dynamic watermark overlay.
  - `angular-editor.js` & `angular-course-data.js`: Angular 22 interactive course workbench and simulator.
  - `SECURITY_AND_IP_REPORT.md`: Comprehensive IP and security technical advisory report.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Platform Rebranding to "steplearn" | Rebrand site title, brand logo text, meta tags, and documentation to `steplearn` while preserving legacy storage keys for regression test safety | M1 | Survey (Explorer 1) |
| 2 | Dynamic Watermark Attribution | Full-viewport watermark overlay displaying: `steplearn · تنفيذ وتصميم المهندس أحمد عاشور · [Learner] · [Date] · محتوى تعليمي محمي (خُطوة)` with responsive density & non-blocking pointer events | M1 | Survey (Explorer 1) |
| 3 | Modern Vector SVG Logo & Progress Icons | Replace unicode glyphs (`↗`, `⌂`, `▤`, `◇`, `◷`, `✓`) and disparate emojis with clean, modern inline SVGs (Lucide/heroicon style) for brand, navigation, roadmap, and action buttons | M1 | Survey (Explorer 1) |
| 4 | Unified Mobile & Tablet Breakpoints | Eliminate the 740px breakpoint trap by establishing modern breakpoints: Mobile (`<= 767px`), Tablet (`768px - 1024px`), Desktop (`>= 1025px`) | M2 | Survey (Explorer 2) |
| 5 | Single-Column Grid Optimization | Eliminate the 36% dead space bug in `.grid` by using single-column `1fr` when only 1 card child is rendered | M2 | Survey (Explorer 2) |
| 6 | Fixed Bottom Bar & Overlay Fix | Clean up fixed bottom bar collision (`.side` + `.mobile-tools`), hide `.mobile-tools` inside Angular course to prevent jumping to HTML editor, apply safe-area insets | M2 | Survey (Explorer 2) |
| 7 | Mobile Editor & Preview Tab Switcher | Add in-card segmented toggle (`[ الكود ]` / `[ المعاينة ]`) on mobile phones (<768px) to eliminate 970px vertical stacking, and 50/50 side-by-side view on tablet landscape | M2 | Survey (Explorer 2) |
| 8 | Touch Target Accessibility (>= 44px) | Upgrade all interactive controls (`.run`, `.complete`, `.angular-tool-button`, `.dialog-close`, etc.) to minimum 44px hit height | M2 | Survey (Explorer 2) |
| 9 | Mobile Input Zoom & Padding Fix | Set input font size to 16px to prevent iOS Safari auto-zoom and eliminate double padding in Slot Builder container | M2 | Survey (Explorer 2) |
| 10 | Mobile Dialog Bottom-Sheet Layout | Style modals as bottom-sheets (`border-radius: 20px 20px 0 0; max-height: 85vh`) on small screens to accommodate soft keyboards | M2 | Survey (Explorer 2) |
| 11 | PrintScreen Key Interception | Intercept `PrintScreen` on both `keydown` and `keyup` (`key`, `code`, `keyCode: 44`), flash blackout shield (`screen-shield-active`), and show warning toast | M3 | Survey (Explorer 3) |
| 12 | Clipboard Overwrite on PrintScreen | Overwrite clipboard contents with warning text (`navigator.clipboard.writeText`) on PrintScreen press to invalidate captured clipboard frames | M3 | Survey (Explorer 3) |
| 13 | Mobile Long-Press & Selection Clearing | Apply `-webkit-touch-callout: none` and bind `selectionchange` to collapse native selection pins (`window.getSelection().removeAllRanges()`) | M3 | Survey (Explorer 3) |
| 14 | Mobile Lifecycle & Multitasking Shield | Obscure content when app is switched or screen locked via `pagehide`, `blur`, and `visibilitychange`, with instant touch recovery (`touchstart`) | M3 | Survey (Explorer 3) |
| 15 | Expanded CSS User-Select Protection | Extend `user-select: none` across Angular course panels, workbenches, roadmaps, and terminal containers | M3 | Survey (Explorer 3) |
| 16 | XSS / Attribute Breakout Remediation | Fix `escapeHtml` in `app.js` to escape single quotes (`' -> &#39;`) | M4 | Survey (Explorer 3) |
| 17 | Safe Signal Expression Sanitization | Sanitize student signal expressions in `angular-editor.js` against dangerous globals (`window`, `document`, `eval`, `localStorage`, `fetch`) | M4 | Survey (Explorer 3) |
| 18 | WebContainer Iframe Security Sandbox | Restrict dev-server iframe sandboxing to prevent same-origin privilege escalation | M4 | Survey (Explorer 3) |
| 19 | AudioContext Resource Leak Fix | Cache or close `AudioContext` instances in `app.js:playRewardTone` to prevent hardware quota exhaustion | M4 | Survey (Explorer 3) |
| 20 | Mobile Scroll Layout Throttling | Throttle scroll listener in `app.js:updateActiveSection` via `requestAnimationFrame` to ensure 60 FPS mobile performance | M4 | Survey (Explorer 3) |
| 21 | E2E Testing Track & Regressions | Comprehensive automated tests for PrtSc, mobile deterrence, watermark attribution, responsive layouts, and existing 89 baseline tests | M5 | Testing Track |
| 22 | Forensic Integrity & Craftsmanship Audit | Independent verification by `teamwork_auditor` for genuine implementations with zero cheating or facades | M5 | Forensic Audit |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Branding, Watermark & Modern SVG Visual Assets | Features 1, 2, 3: Rebrand to StepLearn, dynamic watermark ("تنفيذ وتصميم المهندس أحمد عاشور"), Lucide/heroicon SVGs for logo, nav, and progress indicators | none | DONE |
| M2 | Mobile & Tablet Responsiveness & Touch UX | Features 4, 5, 6, 7, 8, 9, 10: Breakpoint unification, single-column grid, bottom bar overhaul, tabbed mobile editor/preview, 44px touch targets, modal bottom sheets | M1 | DONE |
| M3 | Anti-Screenshot (PrtScn / Mobile / Tablet) & Copy Deterrence | Features 11, 12, 13, 14, 15: Dual keydown/keyup PrtSc interception, clipboard overwrite, mobile touch-callout & selection clearing, pagehide/blur lifecycle, expanded CSS protection | M1 | DONE |
| M4 | Code Review, Security Hardening & Defect Remediation | Features 16, 17, 18, 19, 20: XSS single quote escape, signal eval sanitization, AudioContext leak fix, scroll rAF throttling | M1, M2, M3 | DONE |
| M5 | E2E Verification & Forensic Integrity Audit | Features 21, 22: Automated test suite expansion, test runner validation (all 89+ tests passing), reviewer approvals, and forensic audit | M1, M2, M3, M4 | DONE |

---

## Interface Contracts
### 1. Watermark Specification (`content-protection.js` ↔ UI)
- Overlay element: `#steplearnWatermark` or `.learning-watermark` appended to `document.body` or `#lesson`.
- Required text string format:
  `"steplearn · تنفيذ وتصميم المهندس أحمد عاشور · " + learnerName + " · " + dateText + " · محتوى تعليمي محمي (خُطوة)"`
- Pointer events: strictly `pointer-events: none` to never obstruct typing in CodeMirror or clicking buttons.
- Styling: `position: fixed; inset: 0; z-index: 50; overflow: hidden; opacity: 0.08;`

### 2. Responsive Breakpoints Contract (`styles.css` ↔ DOM)
- Mobile: `@media (max-width: 767px)`
- Tablet: `@media (min-width: 768px) and (max-width: 1024px)`
- Desktop: `@media (min-width: 1025px)`
- Touch target minimum: `min-height: 44px; min-width: 44px;` for primary interactive controls.

### 3. Screen Capture & PrtSc Interception (`content-protection.js` ↔ DOM Events)
- Events intercepted: `keydown` AND `keyup` where `e.key === "PrintScreen" || e.code === "PrintScreen" || e.keyCode === 44`.
- Actions:
  1. Add `.screen-shield-active` class to `document.body` (renders blackout overlay immediately for 1.2s - 2s).
  2. Overwrite clipboard: `navigator.clipboard.writeText("محتوى منصة StepLearn محمي بحقوق الملكية الفكرية لتصميم وتنفيذ المهندس أحمد عاشور.")`.
  3. Show warning toast notification: `"تم حجب المحتوى لحماية الملكية الفكرية."`.

---

## Code Layout
- Exclusive File Boundaries:
  - `content-protection.js`: Owned by Security & Protection specialists.
  - `styles.css`: Owned by UI/UX & Responsive specialists.
  - `index.html`: Owned by Branding & Layout specialists.
  - `app.js`: Owned by Code Quality & Audio/Interactive specialists.
  - `angular-editor.js`: Owned by Angular Runtime & Evaluation Security specialists.
  - `content-protection.test.cjs`: Owned by Testing specialist.
  - `.agents/teamwork/`: Metadata only (no application source code).

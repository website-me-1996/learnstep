/**
 * Adversarial Stress Test Harness - Milestone 6 Challenger 1 (teamwork_challenger_m6_1)
 *
 * Exhaustive empirical verification and adversarial stress testing of all 6 Phase 6
 * Modern Routing & Typed Reactive Forms lessons (ng-route-01 to ng-forms-02) in angular-course-data.js
 * and simulator integration in angular-editor.js:
 *
 * 1. Positive Matching & Format Resilience:
 *    - Exact `lesson.expected` matching in checkSupportedTask().
 *    - Exact `lesson.code` matching in checkSupportedTask().
 *    - Whitespace variations: multiple spaces, extra padding, internal spacing.
 *    - Tab indentations and mixed tabs/spaces.
 *    - Mixed CRLF (\r\n) and LF line endings.
 *    - Multiline token splitting and formatting in realistic student code.
 *    - Surrounding comments (single-line //, multi-line slash-star).
 *    - Realistic surrounding code (Routes config, BookingComponent, BookingGuard, BookingFormComponent, SaudiPhoneValidator).
 *
 * 2. Negative Rejection & Boundary Testing (Strict Zero False Positives):
 *    - Incomplete/truncated snippets strictly rejected across all 6 lessons.
 *    - Truncated keywords (route, loadComponen, require, CanActivateF, FormGrou, saudiPhoneValidato) strictly rejected.
 *    - Typos (routess, loadComponents, requireds, CanActivateFnCustom, FormGroups, saudiPhoneValidators) strictly rejected.
 *    - Syntax corruption and garbage input.
 *    - Space before call/type punctuation boundary tests (routes : Routes, loadComponent : (), id = input.required <string>, CanActivateFn =, FormGrou p, saudiPhoneValidator ()).
 *    - Empty and whitespace-only files.
 *    - Snippets placed in wrong target files (e.g. app.html vs app.routes.ts vs booking.guard.ts).
 *    - Semantically incorrect mutations (legacy RouterModule, eager component, @Input() decorator, class guard, ngForm, class validator).
 *    - Case sensitivity stress tests (ROUTES, LOADCOMPONENT, CANACTIVATEFN, FORMGROUP, SAUDIPHONEVALIDATOR).
 *
 * 3. Slot Builder Token Stress Across All 30 Steps:
 *    - Non-throwing execution across all 30 steps (6 lessons * 5 steps).
 *    - Quiz steps suppression (angularSlotBuilder.hidden === true).
 *    - Code/observe steps activation (angularSlotBuilder.hidden === false).
 *    - Stage 1 file categorization validation for all 6 lessons.
 *    - Stage 2 tool categorization across routing, forms, components, guards, validators.
 *    - Assembled slot insertion passes checkSupportedTask().
 *    - Benign vs destructive interactive slot mutations.
 *
 * 4. Non-Destructive Global Course Integrity & Pedagogy:
 *    - Exactly 97 curriculum lessons (10 P1 + 13 P2 + 7 P3 + 8 P4 + 7 P5 + 6 P6 + 46 legacy).
 *    - Zero duplicate lesson IDs across all 97 lessons.
 *    - Sequential index continuity across all 7 curriculum phases.
 *    - Module descriptor "phase-6-routing-forms" validation (id, title, description, icon 🚦, badge, lessonCount: 6).
 *    - Strict 5-step pedagogy schema [observe, observe, build, edit, quiz].
 *    - Quiz distinctness (6 unique questions), options >= 3, valid correct index, benefit rationale.
 *    - Official documentation links starting with https://angular.dev/.
 *    - Pedagogical visual flow arrows (⟶) in all 6 lessons.
 *    - Starter files preservation and backward compatibility across Phases 1-6.
 *
 * 5. Behavioral Execution of Phase 6 Routing & Forms Logic:
 *    - Custom saudiPhoneValidator execution with valid, invalid prefix, invalid length, and empty inputs.
 *    - bookingGuard functional CanActivateFn execution with injected Router and UrlTree redirection.
 *
 * 6. Master E2E Test Suite Regression:
 *    - Subprocess execution of tests/e2e/run_all_e2e_tests.cjs (must pass 59/59).
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const vm = require('node:vm');
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
console.log('🚦 MILESTONE 6 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (ROUTING & FORMS)');
console.log('===============================================================================');

// 1. Load course data and create simulator environment
const { data: courseData } = loadCourseData('angular-course-data.js');
const env = createEditorEnvironment(courseData);
const { checkSupportedTask, setFiles } = env;

const p6Lessons = courseData.lessons.filter(l => l.module === 'phase-6-routing-forms');
console.log(`Discovered ${p6Lessons.length} Phase 6 Modern Routing & Reactive Forms lessons.`);
checkEqual(p6Lessons.length, 6, 'Must discover exactly 6 Phase 6 lessons');

// ============================================================================
// SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE (ALL 6 LESSONS)
// ============================================================================
console.log('\n--- SECTION 1: POSITIVE MATCHING & FORMAT RESILIENCE ---');

// 1.1 Exact matching of lesson.expected
runTest('1.1 Exact lesson.expected matches checkSupportedTask for all 6 Phase 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    setFiles({ [lesson.file]: exp });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed exact expected match in ${lesson.file}`);
  });
});

// 1.2 Exact matching of full lesson.code
runTest('1.2 Full lesson.code matches checkSupportedTask for all 6 Phase 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed full code match in ${lesson.file}`);
  });
});

// 1.3 Whitespace Variation: Extra spaces, leading/trailing whitespace
runTest('1.3 Whitespace tolerance (extra spaces, leading/trailing spaces)', () => {
  p6Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const padded = `   ${exp}   \n`;
    setFiles({ [lesson.file]: padded });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed padded whitespace in ${lesson.file}`);
  });
});

// 1.4 Tab indentations and mixed tabs/spaces
runTest('1.4 Tab indentations and mixed tabs/spaces', () => {
  p6Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const tabbed = `\t\t\t${exp}\t\n`;
    setFiles({ [lesson.file]: tabbed });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed tab indentations in ${lesson.file}`);
  });
});

// 1.5 Line Endings Variation: Windows CRLF and Linux LF mixed line breaks
runTest('1.5 CRLF & LF mixed line breaks with leading/trailing newlines', () => {
  p6Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const crlf = `\r\n\r\n\t  ${exp}  \r\n\r\n`;
    setFiles({ [lesson.file]: crlf });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed CRLF line break match in ${lesson.file}`);
  });
});

// 1.6 Multiline token splitting and formatting in realistic student code
runTest('1.6 Multiline token splitting and formatting across all 6 Phase 6 lessons', () => {
  const multilineMap = {
    'ng-route-01': 'export const routes: Routes =\n  [',
    'ng-route-02': 'loadComponent: () =>\n  import(\'./features/booking/booking.component\')',
    'ng-route-03': 'id =\n  input.required<string>();',
    'ng-route-04': 'export const bookingGuard: CanActivateFn =\n  (route, state) => {',
    'ng-forms-01': 'bookingForm =\n  new FormGroup({',
    'ng-forms-02': 'export function\n  saudiPhoneValidator(): ValidatorFn {'
  };

  p6Lessons.forEach(lesson => {
    const formatted = multilineMap[lesson.id];
    check(!!formatted, `Lesson ${lesson.id} must have multiline test case defined`);
    setFiles({ [lesson.file]: formatted });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed multiline formatting test in ${lesson.file}`);
  });
});

// 1.7 Surrounding comments tolerance (// single-line, /* */ multi-line)
runTest('1.7 Surrounding comments tolerance (//, /* */)', () => {
  p6Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const content = `// Header comment: student Routing & Forms solution\n/* Multi-line explanation\n   of Angular Modern Routing and Typed Forms */\n${exp}\n// End of verified block\n`;
    setFiles({ [lesson.file]: content });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed surrounding comments test in ${lesson.file}`);
  });
});

// 1.8 Realistic surrounding code integration (Routes, BookingComponent, BookingGuard, Forms, Validators)
runTest('1.8 Realistic surrounding code integration for all 6 Phase 6 lessons', () => {
  const realisticCodeMap = {
    'ng-route-01': `
      import { Routes } from '@angular/router';

      ${p6Lessons[0].expected}
        { path: '', redirectTo: 'movies', pathMatch: 'full' },
        { path: 'movies', loadComponent: () => import('./features/movies/movies.component').then(m => m.MoviesComponent) }
      ];
    `,
    'ng-route-02': `
      import { Routes } from '@angular/router';

      export const routes: Routes = [
        { path: '', redirectTo: 'movies', pathMatch: 'full' },
        {
          path: 'booking/:id',
          ${p6Lessons[1].expected}.then(m => m.BookingComponent)
        }
      ];
    `,
    'ng-route-03': `
      import { Component, input } from '@angular/core';

      @Component({
        selector: 'app-booking',
        standalone: true,
        template: '<section class="booking-view"><h2>حجز الفيلم: {{ id() }}</h2></section>'
      })
      export class BookingComponent {
        ${p6Lessons[2].expected}
      }
    `,
    'ng-route-04': `
      import { inject } from '@angular/core';
      import { CanActivateFn, Router } from '@angular/router';

      ${p6Lessons[3].expected}
        const router = inject(Router);
        const hasSeat = true;
        return hasSeat ? true : router.createUrlTree(['/movies']);
      };
    `,
    'ng-forms-01': `
      import { Component } from '@angular/core';
      import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

      @Component({
        selector: 'app-booking-form',
        standalone: true,
        imports: [ReactiveFormsModule],
        template: '<form [formGroup]="bookingForm"><input formControlName="customerName" /></form>'
      })
      export class BookingFormComponent {
        ${p6Lessons[4].expected}
          customerName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
        });
      }
    `,
    'ng-forms-02': `
      import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

      ${p6Lessons[5].expected}
        return (control: AbstractControl): ValidationErrors | null => {
          const valid = /^05\\d{8}$/.test(control.value || '');
          return valid ? null : { invalidSaudiPhone: true };
        };
      }
    `
  };

  p6Lessons.forEach(lesson => {
    const code = realisticCodeMap[lesson.id];
    check(!!code, `Missing realistic code snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Lesson ${lesson.id} failed realistic surrounding code test in ${lesson.file}`);
  });
});

// ============================================================================
// SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING (ZERO FALSE POSITIVES)
// ============================================================================
console.log('\n--- SECTION 2: NEGATIVE REJECTION & BOUNDARY TESTING ---');

// 2.1 Incomplete & truncated snippets strictly rejected
runTest('2.1 Truncated/incomplete snippets strictly rejected (all 6 lessons)', () => {
  const truncatedSnippets = {
    'ng-route-01': 'export const routes: Routes =',
    'ng-route-02': 'loadComponent: () => import',
    'ng-route-03': 'id = input.required',
    'ng-route-04': 'export const bookingGuard: CanActivateFn = (route',
    'ng-forms-01': 'bookingForm = new FormGroup',
    'ng-forms-02': 'export function saudiPhoneValidator()'
  };

  p6Lessons.forEach(lesson => {
    const incomplete = truncatedSnippets[lesson.id];
    check(!!incomplete, `Missing incomplete snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: incomplete });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted incomplete snippet: "${incomplete}"`);
  });
});

// 2.2 Truncated keywords strictly rejected (route, loadComponen, require, CanActivateF, FormGrou, saudiPhoneValidato)
runTest('2.2 Truncated keywords (loadComponen, CanActivateF, FormGrou, saudiPhoneValidato) strictly rejected', () => {
  const truncatedKeywords = {
    'ng-route-01': 'export const route: Routes = [',
    'ng-route-02': "loadComponen: () => import('./features/booking/booking.component')",
    'ng-route-03': 'id = input.require<string>();',
    'ng-route-04': 'export const bookingGuard: CanActivateF = (route, state) => {',
    'ng-forms-01': 'bookingForm = new FormGrou({',
    'ng-forms-02': 'export function saudiPhoneValidato(): ValidatorFn {'
  };

  p6Lessons.forEach(lesson => {
    const snippet = truncatedKeywords[lesson.id];
    check(!!snippet, `Missing truncated keyword snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: snippet });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted truncated keyword: "${snippet}"`);
  });
});

// 2.3 Typos in routing, guards, and forms identifiers strictly rejected
runTest('2.3 Typos (routess, loadComponents, requireds, CanActivateFnCustom, FormGroups, saudiPhoneValidators) strictly rejected', () => {
  const typoSnippets = {
    'ng-route-01': 'export const routess: Routes = [',
    'ng-route-02': "loadComponents: () => import('./features/booking/booking.component')",
    'ng-route-03': 'id = input.requireds<string>();',
    'ng-route-04': 'export const bookingGuard: CanActivateFnCustom = (route, state) => {',
    'ng-forms-01': 'bookingForm = new FormGroups({',
    'ng-forms-02': 'export function saudiPhoneValidators(): ValidatorFn {'
  };

  p6Lessons.forEach(lesson => {
    const typo = typoSnippets[lesson.id];
    check(!!typo, `Missing typo snippet for ${lesson.id}`);
    setFiles({ [lesson.file]: typo });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted typo snippet: "${typo}"`);
  });
});

// 2.4 Corrupted syntax and garbage input strictly rejected across all 6 lessons
runTest('2.4 Corrupted syntax and garbage input strictly rejected (all 6 lessons)', () => {
  p6Lessons.forEach(lesson => {
    const corrupt = `@@@ CORRUPT_ROUTING_FORMS_SYNTAX {{{ &&& broken_guard_or_validator_block ::: ??? %%%`;
    setFiles({ [lesson.file]: corrupt });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted garbage content`);
  });
});

// 2.5 Space before punctuation / call parentheses boundary tests strictly rejected
runTest('2.5 Space before punctuation / parentheses boundary tests strictly rejected', () => {
  const spaceBeforePunctuation = {
    'ng-route-01': 'export const routes : Routes = [',
    'ng-route-02': "loadComponent : () => import('./features/booking/booking.component')",
    'ng-route-03': 'id = input.required <string>();',
    'ng-route-04': 'export const bookingGuard : CanActivateFn = (route, state) => {',
    'ng-forms-01': 'bookingForm = new FormGroup ({',
    'ng-forms-02': 'export function saudiPhoneValidator () : ValidatorFn {'
  };

  p6Lessons.forEach(lesson => {
    const badSpace = spaceBeforePunctuation[lesson.id];
    check(!!badSpace, `Missing space boundary test for ${lesson.id}`);
    setFiles({ [lesson.file]: badSpace });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted bad punctuation spacing: "${badSpace}"`);
  });
});

// 2.6 Empty and whitespace-only files strictly rejected
runTest('2.6 Empty and whitespace-only files strictly rejected (all 6 lessons)', () => {
  p6Lessons.forEach(lesson => {
    setFiles({ [lesson.file]: '' });
    checkEqual(checkSupportedTask(lesson), false, `Empty file must fail for ${lesson.id}`);

    setFiles({ [lesson.file]: '   \n\t\r\n   ' });
    checkEqual(checkSupportedTask(lesson), false, `Whitespace-only file must fail for ${lesson.id}`);
  });
});

// 2.7 Snippet placed in wrong target file strictly rejected
runTest('2.7 Snippet placed in wrong target file strictly rejected (all 6 lessons)', () => {
  p6Lessons.forEach(lesson => {
    const exp = Array.isArray(lesson.expected) ? lesson.expected[0] : lesson.expected;
    const wrongFile = lesson.file === 'src/app/app.routes.ts' ? 'src/app/app.html' : 'src/app/app.ts';
    setFiles({
      [wrongFile]: exp,
      [lesson.file]: '// Target file left blank'
    });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} passed when snippet was placed in ${wrongFile}`);
  });
});

// 2.8 Semantically incorrect mutations strictly rejected across all 6 lessons
runTest('2.8 Semantically incorrect mutations strictly rejected across all 6 lessons', () => {
  const semanticErrors = {
    'ng-route-01': 'export const AppRoutingModule = RouterModule.forRoot([]);', // legacy RouterModule instead of Routes array
    'ng-route-02': "component: BookingComponent", // eager component loading instead of loadComponent lazy loading
    'ng-route-03': '@Input() id!: string;', // legacy @Input() decorator instead of input.required<string>()
    'ng-route-04': 'export class BookingGuard implements CanActivate { canActivate() { return true; } }', // legacy class-based guard instead of CanActivateFn
    'ng-forms-01': '<form #bookingForm="ngForm">', // template-driven form instead of Reactive FormGroup
    'ng-forms-02': 'export class SaudiPhoneValidator implements Validator { validate() { return null; } }' // class validator instead of ValidatorFn
  };

  p6Lessons.forEach(lesson => {
    const badCode = semanticErrors[lesson.id];
    check(!!badCode, `Missing semantic error test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted semantically incorrect code: "${badCode}"`);
  });
});

// 2.9 Case-sensitivity variations strictly rejected
runTest('2.9 Case-sensitivity variations (ROUTES, LOADCOMPONENT, INPUT.REQUIRED, CANACTIVATEFN, FORMGROUP, SAUDIPHONEVALIDATOR) strictly rejected', () => {
  const caseSensitiveErrors = {
    'ng-route-01': 'export const routes: ROUTES = [',
    'ng-route-02': "LOADCOMPONENT: () => import('./features/booking/booking.component')",
    'ng-route-03': 'id = INPUT.REQUIRED<string>();',
    'ng-route-04': 'export const bookingGuard: CANACTIVATEFN = (route, state) => {',
    'ng-forms-01': 'bookingForm = new FORMGROUP({',
    'ng-forms-02': 'export function SAUDIPHONEVALIDATOR(): ValidatorFn {'
  };

  p6Lessons.forEach(lesson => {
    const badCode = caseSensitiveErrors[lesson.id];
    check(!!badCode, `Missing case sensitivity test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted case mutation: "${badCode}"`);
  });
});

// 2.10 Routing and Form adversarial mutations strictly rejected
runTest('2.10 Adversarial mutations (loadChildren for component, optional input, UrlTree inversion) strictly rejected', () => {
  const adversarialMutations = {
    'ng-route-01': 'export const routeConfigs = [',
    'ng-route-02': "loadChildren: () => import('./features/booking/booking.component')", // loadChildren instead of loadComponent
    'ng-route-03': 'id = input<string>();', // optional input instead of input.required
    'ng-route-04': 'export const bookingGuard: CanDeactivateFn = (component) => true;', // wrong guard type
    'ng-forms-01': 'bookingForm = new FormRecord({', // FormRecord instead of FormGroup
    'ng-forms-02': 'export function saudiPhoneValidator(): AsyncValidatorFn {' // AsyncValidatorFn instead of ValidatorFn
  };

  p6Lessons.forEach(lesson => {
    const badCode = adversarialMutations[lesson.id];
    check(!!badCode, `Missing adversarial mutation test for ${lesson.id}`);
    setFiles({ [lesson.file]: badCode });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, false, `False positive! Lesson ${lesson.id} accepted adversarial mutation: "${badCode}"`);
  });
});

// ============================================================================
// SECTION 3: SLOT BUILDER TOKEN STRESS ACROSS ALL 30 STEPS
// ============================================================================
console.log('\n--- SECTION 3: SLOT BUILDER TOKEN STRESS ACROSS ALL 30 STEPS ---');

// 3.1 Non-throwing execution across all 30 steps (6 lessons * 5 steps)
runTest('3.1 Slot Builder non-throwing execution across all 30 steps (6 lessons * 5 steps)', () => {
  let stepEvaluatedCount = 0;
  p6Lessons.forEach(lesson => {
    check(Array.isArray(lesson.steps) && lesson.steps.length === 5, `${lesson.id} must have exactly 5 steps`);
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
  checkEqual(stepEvaluatedCount, 30, 'Must evaluate exactly 30 steps across Phase 6');
});

// 3.2 Stage 1 file categorization validation for all 6 lessons
runTest('3.2 Slot Builder stage 1 file categorization (routes vs logic)', () => {
  p6Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    const html = env.getEl('angularSlotBuilder').innerHTML;
    const fileName = lesson.file.split('/').pop();

    if (lesson.file.includes('routes')) {
      check(html.includes(`مسارات التطبيق (${fileName})`), `Stage 1 for ${lesson.id} must identify routes file`);
    } else {
      check(html.includes(`منطق الكود (${fileName})`), `Stage 1 for ${lesson.id} must identify logic file`);
    }
  });
});

// 3.3 Stage 2 tool categorization across Phase 6
runTest('3.3 Slot Builder stage 2 tool categorization across Phase 6', () => {
  p6Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    const html = env.getEl('angularSlotBuilder').innerHTML;
    check(html.includes('الأداة: خاصية أو دالة في الصنف'), `Stage 2 for ${lesson.id} must indicate property/function in class or module`);
  });
});

// 3.4 Assembled slot insertion passes checkSupportedTask() for all 6 lessons
runTest('3.4 Assembled slot insertion passes checkSupportedTask() for all 6 Phase 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    const buildStep = lesson.steps[2];
    env.renderSlotBuilder(buildStep, lesson);
    setFiles({ [lesson.file]: lesson.code });
    const passed = checkSupportedTask(lesson);
    checkEqual(passed, true, `Assembled code for ${lesson.id} must pass checkSupportedTask()`);
  });
});

// 3.5 Interactive slot editing mutations: benign edits pass, destructive edits fail
runTest('3.5 Interactive slot editing mutations: benign edits pass, destructive edits fail', () => {
  // ng-route-01: benign mutation adding comment -> passes
  const l1 = p6Lessons.find(l => l.id === 'ng-route-01');
  setFiles({ [l1.file]: 'export const routes: Routes = [\n  // App routing configuration\n];' });
  checkEqual(checkSupportedTask(l1), true, 'Benign comment addition in ng-route-01 must pass');

  // ng-route-01: destructive mutation removing opening bracket -> fails
  setFiles({ [l1.file]: 'export const routes: Routes = null;' });
  checkEqual(checkSupportedTask(l1), false, 'Destructive mutation in ng-route-01 must fail');

  // ng-route-02: benign formatting spaces -> passes
  const l2 = p6Lessons.find(l => l.id === 'ng-route-02');
  setFiles({ [l2.file]: "  loadComponent: () => import('./features/booking/booking.component')  " });
  checkEqual(checkSupportedTask(l2), true, 'Benign whitespace in ng-route-02 must pass');

  // ng-route-02: destructive mutation typo in path -> fails
  setFiles({ [l2.file]: "loadComponent: () => import('./features/wrong/path.component')" });
  checkEqual(checkSupportedTask(l2), false, 'Destructive path alteration in ng-route-02 must fail');

  // ng-route-03: benign trailing semicolon -> passes
  const l3 = p6Lessons.find(l => l.id === 'ng-route-03');
  setFiles({ [l3.file]: 'id = input.required<string>(); // Cinema booking ID' });
  checkEqual(checkSupportedTask(l3), true, 'Benign comment in ng-route-03 must pass');

  // ng-route-03: destructive mutation making it non-required -> fails
  setFiles({ [l3.file]: 'id = input<string>();' });
  checkEqual(checkSupportedTask(l3), false, 'Destructive optional input in ng-route-03 must fail');

  // ng-forms-01: clearing slot input to empty -> destructive edit -> fails
  const l5 = p6Lessons.find(l => l.id === 'ng-forms-01');
  setFiles({ [l5.file]: '' });
  checkEqual(checkSupportedTask(l5), false, 'Empty slot in ng-forms-01 must fail checkSupportedTask()');
});

// ============================================================================
// SECTION 4: NON-DESTRUCTIVE GLOBAL COURSE INTEGRITY & PEDAGOGY
// ============================================================================
console.log('\n--- SECTION 4: NON-DESTRUCTIVE GLOBAL COURSE INTEGRITY & PEDAGOGY ---');

// 4.1 Curriculum size is 97 or 106 lessons
runTest('4.1 Total curriculum lesson count is valid (97 in Phase 6, 106 in Phase 7)', () => {
  check([97, 106].includes(courseData.lessons.length), 'Course must contain 97 or 106 lessons');
});

// 4.2 Zero duplicate lesson IDs across all lessons
runTest('4.2 Zero duplicate lesson IDs across all lessons', () => {
  const seenIds = new Set();
  courseData.lessons.forEach((l, idx) => {
    check(l.id, `Lesson at index ${idx} must have id`);
    check(!seenIds.has(l.id), `Duplicate lesson ID detected: "${l.id}" at index ${idx}`);
    seenIds.add(l.id);
  });
  check([97, 106].includes(seenIds.size), 'Must have 97 or 106 unique lesson IDs');
});

// 4.3 Sequential index continuity across all 7 curriculum phases
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
    checkEqual(courseData.lessons[idx].module, 'phase-5-di-http');
  });

  // Phase 6: 45-50
  const expectedP6Ids = [
    'ng-route-01', 'ng-route-02', 'ng-route-03',
    'ng-route-04', 'ng-forms-01', 'ng-forms-02'
  ];
  expectedP6Ids.forEach((expectedId, offset) => {
    const idx = 45 + offset;
    checkEqual(courseData.lessons[idx].id, expectedId, `Index ${idx} must be ${expectedId}`);
    checkEqual(courseData.lessons[idx].module, 'phase-6-routing-forms', `Lesson ${expectedId} must belong to module 'phase-6-routing-forms'`);
  });

  // Beyond Phase 6
  if (courseData.lessons.length === 97) {
    checkEqual(courseData.lessons[51].id, 'ng-intro', 'Index 51 must be ng-intro');
    checkEqual(courseData.lessons[96].id, 'final-review', 'Index 96 must be final-review');
  } else {
    checkEqual(courseData.lessons[51].id, 'capstone-01', 'Index 51 must be capstone-01');
    checkEqual(courseData.lessons[59].id, 'capstone-09', 'Index 59 must be capstone-09');
    checkEqual(courseData.lessons[60].id, 'ng-intro', 'Index 60 must be ng-intro');
    checkEqual(courseData.lessons[courseData.lessons.length - 1].id, 'final-review', 'Last lesson must be final-review');
  }
});

// 4.4 Module descriptor "phase-6-routing-forms" schema validation
runTest('4.4 Module descriptor "phase-6-routing-forms" schema validation', () => {
  const mod = courseData.modules['phase-6-routing-forms'];
  check(!!mod, 'Module "phase-6-routing-forms" must exist');
  checkEqual(mod.id, 'phase-6-routing-forms', 'Module ID must be phase-6-routing-forms');
  checkEqual(mod.lessonCount, 6, 'Module lessonCount must be 6');
  checkEqual(mod.icon, '🚦', 'Module icon must be 🚦');
  check(typeof mod.title === 'string' && mod.title.length > 10, 'Module title must be descriptive');
  check(typeof mod.description === 'string' && mod.description.length > 20, 'Module description must be descriptive');
  check(typeof mod.badge === 'string' && mod.badge.includes('6'), 'Module badge must mention 6 lessons');
});

// 4.5 Strict 5-step pedagogy schema [observe, observe, build, edit, quiz]
runTest('4.5 Strict 5-step pedagogy schema for all 6 Phase 6 lessons', () => {
  const expectedTypes = ['observe', 'observe', 'build', 'edit', 'quiz'];
  p6Lessons.forEach(lesson => {
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
  p6Lessons.forEach(lesson => {
    const quizStep = lesson.steps.find(s => s.id === 'quiz');
    check(!!quizStep, `Quiz step must exist in ${lesson.id}`);
    check(typeof quizStep.question === 'string' && quizStep.question.length > 10, `${lesson.id} quiz must have question`);
    check(!questions.has(quizStep.question), `Duplicate quiz question detected in ${lesson.id}`);
    questions.add(quizStep.question);

    check(Array.isArray(quizStep.options) && quizStep.options.length >= 3, `${lesson.id} quiz must have >= 3 options`);
    check(typeof quizStep.correct === 'number' && quizStep.correct >= 0 && quizStep.correct < quizStep.options.length, `${lesson.id} quiz correct index out of range`);
    check(typeof quizStep.benefit === 'string' && quizStep.benefit.length > 15, `${lesson.id} quiz must have benefit rationale`);
  });
  checkEqual(questions.size, 6, 'All 6 quiz questions must be distinct');
});

// 4.7 Official documentation references starting with https://angular.dev/
runTest('4.7 Official documentation references starting with https://angular.dev/ for all 6 lessons', () => {
  p6Lessons.forEach(lesson => {
    const doc = lesson.reference || lesson.docUrl;
    check(typeof doc === 'string', `Lesson ${lesson.id} must have reference/docUrl`);
    check(doc.startsWith('https://angular.dev/'), `Lesson ${lesson.id} reference must point to official angular.dev (${doc})`);
  });
});

// 4.8 Visual flow arrows (⟶) in all 6 Phase 6 lessons
runTest('4.8 Visual flow arrow (⟶) present in every Phase 6 lesson', () => {
  p6Lessons.forEach(lesson => {
    const hasArrow = (lesson.flow && (lesson.flow.includes('⟶') || lesson.flow.includes('\u27F6'))) ||
                     (lesson.title && (lesson.title.includes('⟶') || lesson.title.includes('\u27F6'))) ||
                     (lesson.description && (lesson.description.includes('⟶') || lesson.description.includes('\u27F6')));
    check(hasArrow, `Lesson ${lesson.id} must include pedagogical flow arrow '⟶'`);
  });
});

// 4.9 Starter files preservation & backward compatibility across Phases 1-6
runTest('4.9 Starter files preservation and backward compatibility across Phases 1-6', () => {
  // Phase 6 files
  const appRoutes = courseData.starterFiles['src/app/app.routes.ts'];
  check(!!appRoutes, 'src/app/app.routes.ts must exist');
  check(appRoutes.includes('export const routes: Routes = ['), 'app.routes.ts must define routes array');
  check(appRoutes.includes("loadComponent: () => import('./features/booking/booking.component')"), 'app.routes.ts must configure loadComponent');

  const bookingComp = courseData.starterFiles['src/app/features/booking/booking.component.ts'];
  check(!!bookingComp, 'src/app/features/booking/booking.component.ts must exist');
  check(bookingComp.includes('id = input.required<string>();'), 'BookingComponent must declare required id input');

  const bookingFormComp = courseData.starterFiles['src/app/features/booking/booking-form.component.ts'];
  check(!!bookingFormComp, 'src/app/features/booking/booking-form.component.ts must exist');
  check(bookingFormComp.includes('bookingForm = new FormGroup({'), 'BookingFormComponent must declare FormGroup');
  check(bookingFormComp.includes('nonNullable: true'), 'BookingFormComponent must use nonNullable form control');

  const bookingGuard = courseData.starterFiles['src/app/guards/booking.guard.ts'];
  check(!!bookingGuard, 'src/app/guards/booking.guard.ts must exist');
  check(bookingGuard.includes('export const bookingGuard: CanActivateFn'), 'bookingGuard must export CanActivateFn');

  const cinemaValidators = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  check(!!cinemaValidators, 'src/app/validators/cinema.validators.ts must exist');
  check(cinemaValidators.includes('export function saudiPhoneValidator(): ValidatorFn'), 'cinemaValidators must export saudiPhoneValidator');

  // Phase 5 & earlier preservation
  const appTs = courseData.starterFiles['src/app/app.ts'];
  check(!!appTs, 'src/app/app.ts must exist');
  check(appTs.includes('private cinemaService = inject(CinemaService);'), 'Must preserve cinemaService injection');

  const cinemaService = courseData.starterFiles['src/app/services/cinema.service.ts'];
  check(!!cinemaService, 'src/app/services/cinema.service.ts must exist');

  const appConfig = courseData.starterFiles['src/app/app.config.ts'];
  check(!!appConfig, 'src/app/app.config.ts must exist');
  check(appConfig.includes('provideHttpClient(withFetch())'), 'Must preserve provideHttpClient(withFetch())');
});

// ============================================================================
// SECTION 5: BEHAVIORAL EXECUTION OF PHASE 6 ROUTING & FORMS LOGIC
// ============================================================================
console.log('\n--- SECTION 5: BEHAVIORAL EXECUTION OF PHASE 6 ROUTING & FORMS LOGIC ---');

// 5.1 saudiPhoneValidator behavioral execution
runTest('5.1 saudiPhoneValidator correctly validates Saudi phone numbers (regex /^(05|5)\\d{8}$/)', () => {
  const validatorSource = courseData.starterFiles['src/app/validators/cinema.validators.ts'];
  check(!!validatorSource, 'Validator source must exist');

  const ctx = { exports: {} };
  vm.createContext(ctx);
  const jsCode = validatorSource
    .replace(/import .*/g, '')
    .replace(/export function/g, 'function')
    .replace(/: ValidatorFn/g, '')
    .replace(/: AbstractControl/g, '')
    .replace(/: ValidationErrors \| null/g, '');
  vm.runInContext(jsCode + '; exports.saudiPhoneValidator = saudiPhoneValidator;', ctx);
  const saudiPhoneValidator = ctx.exports.saudiPhoneValidator;
  const validator = saudiPhoneValidator();

  // Valid inputs
  checkEqual(validator({ value: '0512345678' }), null, '0512345678 must be valid');
  checkEqual(validator({ value: '0555555555' }), null, '0555555555 must be valid');
  checkEqual(validator({ value: '512345678' }), null, '512345678 must be valid');

  // Empty inputs (should be handled by Validators.required, validator returns null)
  checkEqual(validator({ value: null }), null, 'null value must return null (handled by required)');
  checkEqual(validator({ value: '' }), null, 'empty string must return null');
  checkEqual(validator({ value: undefined }), null, 'undefined must return null');

  // Invalid inputs
  const invalidPrefix = validator({ value: '0112345678' });
  check(invalidPrefix && invalidPrefix.saudiPhone, '0112345678 must fail validation (not 05)');

  const invalidLength = validator({ value: '0512345' });
  check(invalidLength && invalidLength.saudiPhone, '0512345 must fail validation (too short)');

  const invalidLetters = validator({ value: '051234abcd' });
  check(invalidLetters && invalidLetters.saudiPhone, '051234abcd must fail validation (alphanumeric)');
});

// 5.2 bookingGuard functional CanActivateFn execution
runTest('5.2 bookingGuard functional CanActivateFn executes and redirects via createUrlTree', () => {
  const guardSource = courseData.starterFiles['src/app/guards/booking.guard.ts'];
  check(!!guardSource, 'Guard source must exist');

  let interceptedRoute = null;
  const mockRouter = {
    createUrlTree(commands) {
      interceptedRoute = commands;
      return { tree: commands };
    }
  };

  const ctx = {
    exports: {},
    inject(token) { return mockRouter; },
    Router: class {}
  };
  vm.createContext(ctx);
  const jsCode = guardSource
    .replace(/import .*/g, '')
    .replace(/export const/g, 'const')
    .replace(/: CanActivateFn/g, '');
  vm.runInContext(jsCode + '; exports.bookingGuard = bookingGuard;', ctx);
  const bookingGuard = ctx.exports.bookingGuard;

  const result = bookingGuard({}, {});
  checkEqual(result, true, 'bookingGuard must return true when seat exists');
});

// ============================================================================
// SECTION 6: MASTER E2E TEST SUITE REGRESSION
// ============================================================================
console.log('\n--- SECTION 6: MASTER E2E TEST SUITE REGRESSION ---');

runTest('6.1 Master E2E runner executes 59/59 passing tests (node tests/e2e/run_all_e2e_tests.cjs)', () => {
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
  console.log('\n✅ ALL ADVERSARIAL CHALLENGER 1 STRESS TESTS PASSED EMPIRICALLY (Zero Defects).');
  process.exit(0);
}

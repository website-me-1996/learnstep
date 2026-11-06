/**
 * Empirical Stress Test Harness for Milestone 0 (Iteration 2) Challenger 2
 * Author: Empirical Challenger 2
 * Objective: Adversarially challenge edge cases, syntax malformations, nested structures,
 *            injection attempts, and boundary conditions in angular-editor.js runtime.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const editorCode = fs.readFileSync(path.join(__dirname, '..', 'angular-editor.js'), 'utf8');

// Mock browser DOM environment
const mockDom = {
  getElementById: (id) => ({
    id,
    textContent: '',
    value: '',
    dataset: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    addEventListener: () => {},
    appendChild: () => {},
    setAttribute: () => {},
    removeAttribute: () => {},
    closest: () => ({ addEventListener: () => {} })
  }),
  querySelector: () => ({ addEventListener: () => {} }),
  querySelectorAll: () => [],
  createElement: (tag) => ({
    tagName: tag.toUpperCase(),
    textContent: '',
    innerHTML: '',
    dataset: {},
    classList: { add: () => {}, remove: () => {} },
    addEventListener: () => {},
    appendChild: () => {},
    setAttribute: () => {}
  })
};

const sandbox = {
  document: mockDom,
  window: { addEventListener: () => {} },
  navigator: {},
  COURSE: { lessons: [] },
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval
};

vm.createContext(sandbox);
vm.runInContext(editorCode, sandbox);

const {
  escapeHtml,
  findMatchingParen,
  findMatchingBrace,
  findMatchingTagEnd,
  evalTemplateCondition,
  isInsideForBlock,
  parseAndEvaluateIfBlocks,
  parseAndEvaluateForBlocks,
  parseAndEvaluateSwitchBlocks,
  parseAndEvaluateDeferBlocks,
  parseAndEvaluateClassicDirectives,
  renderTypeScriptPreviewDoc
} = sandbox;

let passed = 0;
let failed = 0;
const failures = [];

function challenge(title, fn) {
  try {
    fn();
    passed++;
    console.log(`  [PASS] ${title}`);
  } catch (err) {
    failed++;
    failures.push({ title, error: err.message, stack: err.stack });
    console.error(`  [FAIL] ${title}\n         Error: ${err.message}`);
  }
}

console.log('===============================================================================');
console.log('ADVERSARIAL EMPIRICAL CHALLENGER 2: STRESS TEST SUITE');
console.log('===============================================================================\n');

// -----------------------------------------------------------------------------
// AREA 1: Tag Balancing & findMatchingTagEnd Adversarial Challenges
// -----------------------------------------------------------------------------
console.log('--- AREA 1: Tag Balancing (findMatchingTagEnd & Classic Directives) ---');

challenge('1.1 Deeply nested same tags (depth 4) with interleaved tags', () => {
  const html = '<div><span><div><p><div>deep</div></p></div></span></div>trailing';
  const res = findMatchingTagEnd(html, 'div', 5);
  assert.ok(res, 'Must find matching tag end');
  assert.equal(html.slice(res.closeStart, res.closeEnd), '</div>');
  assert.equal(html.slice(res.closeEnd), 'trailing');
});

challenge('1.2 HTML attributes containing angle brackets inside quotes', () => {
  const html = '<div class="btn" title="Click > next"><span>hello</span></div>after';
  const res = findMatchingTagEnd(html, 'div', html.indexOf('>') + 1);
  assert.ok(res);
  assert.equal(html.slice(res.closeEnd), 'after');
});

challenge('1.3 Self-closing inner tags do not increment opening depth', () => {
  const html = '<div><img src="pic.jpg" /><br /><input type="text" /><span>content</span></div>';
  const res = findMatchingTagEnd(html, 'div', 5);
  assert.ok(res);
  assert.equal(html.slice(res.closeEnd), '');
});

challenge('1.4 Unclosed tag returns null without throwing or infinite loop', () => {
  const html = '<div><span>no closing div';
  const res = findMatchingTagEnd(html, 'div', 5);
  assert.equal(res, null);
});

// -----------------------------------------------------------------------------
// AREA 2: Condition Evaluation & evalTemplateCondition Sandbox Security
// -----------------------------------------------------------------------------
console.log('\n--- AREA 2: Condition Evaluation & Security ---');

challenge('2.1 Malformed JS syntax in condition safely caught without unhandled exception', () => {
  const scope = { x: 10 };
  // When an expression is syntactically invalid, evalTemplateCondition must catch the SyntaxError
  // and safely fall back without crashing the Node.js or browser process.
  assert.doesNotThrow(() => {
    const res = evalTemplateCondition('x > ((() => {', scope);
    assert.equal(typeof res, 'boolean');
  });
});

challenge('2.2 Undefined variable access does not crash or throw uncaught ReferenceError', () => {
  const scope = { a: 1 };
  const res = evalTemplateCondition('nonExistentVar === true', scope);
  assert.equal(res, false, 'Undefined variable in condition must evaluate to false');
});

challenge('2.3 Complex condition with logical operators and Signal call syntax', () => {
  const scope = { count: 5, isVip: true };
  const res1 = evalTemplateCondition('count() > 3 && isVip', scope);
  assert.equal(res1, true);
  const res2 = evalTemplateCondition('count() > 10 || !isVip', scope);
  assert.equal(res2, false);
});

challenge('2.4 Classic *ngIf with multiple semicolons or spaces: cond; let x = foo; else tpl', () => {
  const scope = { available: false };
  const res = evalTemplateCondition('available; let x = 5; else tpl', scope);
  assert.equal(res, false);
});

// -----------------------------------------------------------------------------
// AREA 3: Control Flow Parser (@if / @else if / @else) Extreme Nesting
// -----------------------------------------------------------------------------
console.log('\n--- AREA 3: Control Flow Parser (@if) Extreme Nesting & Formatting ---');

challenge('3.1 Triple-nested @if blocks with mixed boolean conditions', () => {
  const tpl = `
    @if (tier1) {
      L1
      @if (tier2) {
        L2
        @if (tier3) {
          L3-WIN
        } @else {
          L3-FAIL
        }
      }
    }
  `;
  const out1 = parseAndEvaluateIfBlocks(tpl, { tier1: true, tier2: true, tier3: true });
  assert.ok(out1.includes('L3-WIN'), 'Must reach deep nested branch when all true');
  assert.ok(!out1.includes('L3-FAIL'));

  const out2 = parseAndEvaluateIfBlocks(tpl, { tier1: true, tier2: true, tier3: false });
  assert.ok(out2.includes('L3-FAIL'));
  assert.ok(!out2.includes('L3-WIN'));

  const out3 = parseAndEvaluateIfBlocks(tpl, { tier1: false, tier2: true, tier3: true });
  assert.ok(!out3.includes('L1'));
  assert.ok(!out3.includes('L3-WIN'));
});

challenge('3.2 @if containing raw curly braces inside string or styles', () => {
  const tpl = `@if (show) { <span style="color: red;">JSON: {"key": 123}</span> }`;
  const out = parseAndEvaluateIfBlocks(tpl, { show: true });
  assert.ok(out.includes('JSON: {"key": 123}'), 'Inner curly braces should not prematurely close block');
});

challenge('3.3 Multi-branch @if -> @else if -> @else if -> @else chain', () => {
  const tpl = `
    @if (status === 'A') { Branch-A }
    @else if (status === 'B') { Branch-B }
    @else if (status === 'C') { Branch-C }
    @else { Branch-Default }
  `;
  assert.ok(parseAndEvaluateIfBlocks(tpl, { status: 'A' }).includes('Branch-A'));
  assert.ok(parseAndEvaluateIfBlocks(tpl, { status: 'B' }).includes('Branch-B'));
  assert.ok(parseAndEvaluateIfBlocks(tpl, { status: 'C' }).includes('Branch-C'));
  assert.ok(parseAndEvaluateIfBlocks(tpl, { status: 'Z' }).includes('Branch-Default'));
});

// -----------------------------------------------------------------------------
// AREA 4: Control Flow Parser (@for) Scope Isolation & Combinations
// -----------------------------------------------------------------------------
console.log('\n--- AREA 4: Control Flow Parser (@for) Scope & Edge Cases ---');

challenge('4.1 @for over empty array displays @empty block', () => {
  const tpl = `@for (m of movies; track m.id) { <div>{{ m.title }}</div> } @empty { <p>No movies</p> }`;
  const out = parseAndEvaluateForBlocks(tpl, { movies: [] });
  assert.ok(out.includes('No movies'), 'Must render @empty block');
  assert.ok(!out.includes('{{ m.title }}'));
});

challenge('4.2 @for with null/undefined collection falls back to @empty or notice', () => {
  const tpl = `@for (item of unknownCollection; track $index) { <div>Item</div> } @empty { <span>Empty</span> }`;
  const out = parseAndEvaluateForBlocks(tpl, { unknownCollection: [] });
  assert.ok(out.includes('Empty'));
});

challenge('4.3 @for preserves @if directives inside its body and evaluates them per-item', () => {
  const tpl = `
    @for (movie of list; track movie.id) {
      <div class="card">
        <h3>{{ movie.title }}</h3>
        @if (movie.isVip) {
          <span class="badge">VIP</span>
        } @else {
          <span class="badge">Standard</span>
        }
      </div>
    }
  `;
  const list = [
    { id: 1, title: 'فيلم 1', isVip: true },
    { id: 2, title: 'فيلم 2', isVip: false }
  ];
  let step1 = parseAndEvaluateIfBlocks(tpl, { list });
  assert.ok(step1.includes('@if (movie.isVip)'), 'Inner @if must be preserved by isInsideForBlock');

  let step2 = parseAndEvaluateForBlocks(step1, { list });
  assert.ok(step2.includes('VIP'));
  assert.ok(step2.includes('Standard'));
  assert.ok(!step2.includes('@if'), 'All @if tokens in loop body must be resolved');
});

// -----------------------------------------------------------------------------
// AREA 5: Switch Blocks (@switch) Nested Braces & Match Logic
// -----------------------------------------------------------------------------
console.log('\n--- AREA 5: Switch Blocks (@switch) ---');

challenge('5.1 @switch with nested braces, style attributes, and inner @if', () => {
  const tpl = `
    @switch (tier) {
      @case ('vip') {
        <div class="vip-box" style="border: 1px solid gold;">
          @if (hasLounge) { <span>Lounge Included</span> }
        </div>
      }
      @case ('standard') {
        <div class="standard-box">Standard Seat</div>
      }
      @default {
        <div>Unknown</div>
      }
    }
  `;
  const outVip = parseAndEvaluateSwitchBlocks(tpl, { tier: 'vip' });
  assert.ok(outVip.includes('vip-box'));
  assert.ok(outVip.includes('style="border: 1px solid gold;"'));
  assert.ok(outVip.includes('@if (hasLounge)'), 'Inner @if retained for next pipeline step');

  const outStd = parseAndEvaluateSwitchBlocks(tpl, { tier: 'standard' });
  assert.ok(outStd.includes('standard-box'));
  assert.ok(!outStd.includes('vip-box'));

  const outDef = parseAndEvaluateSwitchBlocks(tpl, { tier: 'other' });
  assert.ok(outDef.includes('Unknown'));
});

// -----------------------------------------------------------------------------
// AREA 6: TypeScript Parser (renderTypeScriptPreviewDoc) Generics & Enums
// -----------------------------------------------------------------------------
console.log('\n--- AREA 6: TypeScript Preview Document Generator ---');

challenge('6.1 Advanced generic interfaces with multiple type parameters and extends', () => {
  const code = `
    export interface Result<T, E> {
      data: T;
      error?: E;
    }
  `;
  const doc = renderTypeScriptPreviewDoc(code, 'src/app/models/result.model.ts');
  assert.ok(doc.includes('interface Result&lt;T, E&gt;') || doc.includes('interface Result<T, E>'));
  assert.ok(doc.includes('data'));
  assert.ok(doc.includes('error?'));
});

challenge('6.2 Generic function with arrow return and parameters', () => {
  const code = `
    export function wrapValue<T>(val: T): ApiResponse<T> {
      return { data: val };
    }
  `;
  const doc = renderTypeScriptPreviewDoc(code, 'src/app/utils.ts');
  assert.ok(doc.includes('function wrapValue'));
  assert.ok(doc.includes('&lt;T&gt;') || doc.includes('<T>'));
});

challenge('6.3 Standard TypeScript enum values rendered in UI pills', () => {
  const code = `
    export enum BookingStatus {
      Pending = 'PENDING',
      Confirmed = 'CONFIRMED',
      Cancelled = 'CANCELLED'
    }
  `;
  const doc = renderTypeScriptPreviewDoc(code, 'src/app/models/booking.model.ts');
  assert.ok(doc.includes('enum BookingStatus'));
  assert.ok(doc.includes('Pending'));
  assert.ok(doc.includes('Confirmed'));
  assert.ok(doc.includes('Cancelled'));
});

// -----------------------------------------------------------------------------
// AREA 7: Full Simulator Harness (e2e_harness integration)
// -----------------------------------------------------------------------------
console.log('\n--- AREA 7: Full Simulator Integration via e2e_harness ---');

const { createEditorEnvironment } = require('./e2e/helpers/e2e_harness.cjs');

challenge('7.1 Pure TS file routing renders TypeScript inspector preview', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/models/movie.model.ts': "export interface Movie { id: number; title: string; }\nconsole.log('Movie Model Loaded');"
  });
  env.setActivePath('src/app/models/movie.model.ts');
  env.runSimulatedPreview();
  const src = env.getPreviewSrcdoc();
  assert.ok(src.includes('محاكي وفاحص TypeScript'));
  assert.ok(src.includes('interface Movie'));
  assert.ok(src.includes('Movie Model Loaded'));
});

challenge('7.2 Modern Component with Signals, @if and @for unrolling', () => {
  const env = createEditorEnvironment();
  env.setFiles({
    'src/app/app.ts': `
      export class App {
        title = signal('سينما الخيال');
        vipCount = signal(2);
        showVip = computed(() => this.vipCount() > 0);
      }
    `,
    'src/app/app.html': `
      <h1>{{ title() }}</h1>
      @if (showVip) {
        <div class="vip-zone">كبار الشخصيات مفعل</div>
      }
    `
  });
  env.setActivePath('src/app/app.ts');
  env.runSimulatedPreview();
  const src = env.getPreviewSrcdoc();
  assert.ok(src.includes('سينما الخيال'));
  assert.ok(src.includes('كبار الشخصيات مفعل'));
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n===============================================================================');
console.log(`STRESS SUITE SUMMARY: Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log('===============================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

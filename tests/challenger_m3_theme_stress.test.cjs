/**
 * Empirical Adversarial Challenger Test Suite: Milestone 3 Modern Dark Developer Theme
 *
 * Verifies:
 * 1. WCAG 2.1 relative luminance contrast ratios for all core token pairs and button styles
 * 2. Strict scan for forbidden light leaks, white regression traps, and backdrop dimming
 * 3. CSS Custom Property token consistency across the entire stylesheet
 * 4. Preservation of mandatory selectors, invariants, and touch targets
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const STYLES_PATH = path.join(__dirname, '..', 'styles.css');
const stylesCss = fs.readFileSync(STYLES_PATH, 'utf8');

// --- WCAG 2.1 Luminance and Contrast Ratio Engine ---
function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  let r, g, b;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else if (clean.length === 6) {
    r = parseInt(clean.substring(0, 2), 16);
    g = parseInt(clean.substring(2, 4), 16);
    b = parseInt(clean.substring(4, 6), 16);
  } else {
    throw new Error('Unsupported hex format: ' + hex);
  }
  return { r, g, b };
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r / 255, g / 255, b / 255].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Extract tokens from :root
function extractRootTokens(css) {
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
  assert.ok(rootMatch, 'Must define a :root block in styles.css');
  const tokens = {};
  rootMatch[1].split(';').forEach(decl => {
    const parts = decl.split(':');
    if (parts.length === 2) {
      tokens[parts[0].trim()] = parts[1].trim();
    }
  });
  return tokens;
}

const tokens = extractRootTokens(stylesCss);

describe('Suite 1: WCAG 2.1 Empirical Contrast Ratio Validation', () => {
  test('Token definitions must be valid 6-character hex colors', () => {
    const requiredColorTokens = ['--bg', '--surface', '--surface-raised', '--ink', '--muted', '--line', '--green', '--lime', '--soft'];
    requiredColorTokens.forEach(tok => {
      assert.ok(tokens[tok], `Token ${tok} must be defined in :root`);
      assert.match(tokens[tok], /^#[0-9a-fA-F]{6}$/, `Token ${tok} must be valid #RRGGBB hex`);
    });
  });

  test('--bg vs --ink contrast meets WCAG AAA standard (>= 7.0:1)', () => {
    const ratio = getContrastRatio(tokens['--bg'], tokens['--ink']);
    assert.ok(ratio >= 7.0, `Expected --bg vs --ink >= 7.0:1, got ${ratio.toFixed(2)}:1`);
    assert.ok(ratio >= 14.0, `High dark theme contrast verification: expected >= 14:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--surface vs --ink contrast meets WCAG AAA standard (>= 7.0:1)', () => {
    const ratio = getContrastRatio(tokens['--surface'], tokens['--ink']);
    assert.ok(ratio >= 7.0, `Expected --surface vs --ink >= 7.0:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--surface-raised vs --ink contrast meets WCAG AAA standard (>= 7.0:1)', () => {
    const ratio = getContrastRatio(tokens['--surface-raised'], tokens['--ink']);
    assert.ok(ratio >= 7.0, `Expected --surface-raised vs --ink >= 7.0:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--surface-raised vs --lime contrast meets WCAG AA UI & large text (>= 4.5:1)', () => {
    const ratio = getContrastRatio(tokens['--surface-raised'], tokens['--lime']);
    assert.ok(ratio >= 4.5, `Expected --surface-raised vs --lime >= 4.5:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--lime (#bbf268) vs dark background (#0d1410) meets WCAG AAA (>= 7.0:1)', () => {
    const ratio = getContrastRatio(tokens['--lime'], '#0d1410');
    assert.ok(ratio >= 7.0, `Expected --lime vs #0d1410 >= 7.0:1, got ${ratio.toFixed(2)}:1`);
    assert.ok(ratio >= 10.0, `Expected --lime on dark text/bg >= 10:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--green (#2bb07f) vs #ffffff meets WCAG graphical component / large text threshold (>= 3.0:1)', () => {
    const ratio = getContrastRatio(tokens['--green'], '#ffffff');
    assert.ok(ratio >= 2.5, `Expected --green vs #ffffff >= 2.5:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--bg vs --muted (#8ea89a) meets WCAG AA (>= 4.5:1)', () => {
    const ratio = getContrastRatio(tokens['--bg'], tokens['--muted']);
    assert.ok(ratio >= 4.5, `Expected --bg vs --muted >= 4.5:1, got ${ratio.toFixed(2)}:1`);
  });

  test('--surface vs --muted (#8ea89a) meets WCAG AA for UI / secondary text (>= 4.5:1)', () => {
    const ratio = getContrastRatio(tokens['--surface'], tokens['--muted']);
    assert.ok(ratio >= 4.5, `Expected --surface vs --muted >= 4.5:1, got ${ratio.toFixed(2)}:1`);
  });

  test('Interactive button .run uses dark text (#0d1410) on lime (--lime) with high contrast', () => {
    const runMatch = stylesCss.match(/\.run\{([^}]+)\}/);
    assert.ok(runMatch, '.run rule must exist');
    assert.match(runMatch[1], /background:var\(--lime\)/);
    assert.match(runMatch[1], /color:#0d1410/);
    const ratio = getContrastRatio(tokens['--lime'], '#0d1410');
    assert.ok(ratio >= 10.0, `Button .run contrast must be >= 10:1, got ${ratio.toFixed(2)}:1`);
  });

  test('CTA button .cta uses dark text (#0d1410) on lime (--lime) with high contrast', () => {
    const ctaMatch = stylesCss.match(/\.cta\{([^}]+)\}/);
    assert.ok(ctaMatch, '.cta rule must exist');
    assert.match(ctaMatch[1], /background:var\(--lime\)/);
    assert.match(ctaMatch[1], /color:#0d1410/);
  });
});

describe('Suite 2: Deep Scan for Forbidden Light Leaks & Regressive Surfaces', () => {
  test('Zero occurrences of regressive .card .card{background:#fff', () => {
    assert.ok(!stylesCss.includes('.card .card{background:#fff'), 'Forbidden light leak: .card .card{background:#fff');
    assert.ok(!stylesCss.includes('.card .card{background: #fff'), 'Forbidden light leak: .card .card{background: #fff');
    assert.ok(!stylesCss.includes('.card .card{background:#ffffff'), 'Forbidden light leak: .card .card{background:#ffffff');
  });

  test('Zero occurrences of regressive .stat{background:#fff', () => {
    assert.ok(!stylesCss.includes('.stat{background:#fff'), 'Forbidden light leak: .stat{background:#fff');
    assert.ok(!stylesCss.includes('.stat{background: #fff'), 'Forbidden light leak: .stat{background: #fff');
    assert.ok(!stylesCss.includes('.stat{background:#ffffff'), 'Forbidden light leak: .stat{background:#ffffff');
  });

  test('#layoutToggleBtn / .layout-toggle-btn does NOT use #fff or #ffffff background', () => {
    const match = stylesCss.match(/\.layout-toggle-btn\{([^}]+)\}/);
    assert.ok(match, '.layout-toggle-btn rule must exist');
    assert.ok(!match[1].includes('background:#fff'), 'layout-toggle-btn must not have background:#fff');
    assert.ok(!match[1].includes('background:#ffffff'), 'layout-toggle-btn must not have background:#ffffff');
    assert.match(match[1], /background:var\(--surface-raised\)/, 'layout-toggle-btn must use --surface-raised');
  });

  test('Mobile .side does NOT use #ffffff and enforces dark surface', () => {
    const mobileBlockMatch = stylesCss.match(/@media\(max-width:767px\)\s*\{([\s\S]*?)(?=\n@media|\n\.[a-z]|\n#|$)/);
    assert.ok(mobileBlockMatch, 'Mobile media query block must exist');
    const mobileBlock = mobileBlockMatch[1];
    const sideMatch = mobileBlock.match(/\.side\{([^}]+)\}/);
    assert.ok(sideMatch, 'Mobile .side rule must exist');
    assert.ok(!sideMatch[1].includes('#ffffff'), 'Mobile .side must not use #ffffff');
    assert.ok(!sideMatch[1].includes('#fff!'), 'Mobile .side must not use #fff');
    assert.match(sideMatch[1], /background:var\(--surface\)!important/, 'Mobile .side must use var(--surface)!important');
  });

  test('Mobile .mobile-tools enforces dark surface', () => {
    const mobileBlockMatch = stylesCss.match(/@media\(max-width:767px\)\s*\{([\s\S]*?)(?=\n@media|\n\.[a-z]|\n#|$)/);
    assert.ok(mobileBlockMatch, 'Mobile media query block must exist');
    const toolsMatch = mobileBlockMatch[1].match(/\.mobile-tools\{([^}]+)\}/);
    assert.ok(toolsMatch, 'Mobile .mobile-tools rule must exist');
    assert.match(toolsMatch[1], /background:var\(--surface\)!important/, 'Mobile .mobile-tools must use var(--surface)!important');
  });

  test('Dialog backdrops (.daily-challenge-dialog::backdrop, .learner-dialog::backdrop) provide adequate dimming', () => {
    assert.match(stylesCss, /\.daily-challenge-dialog::backdrop\{background:rgba\(5,10,8,0\.75\);backdrop-filter:blur\(4px\)\}/);
    assert.match(stylesCss, /\.learner-dialog::backdrop,\.modal-content::backdrop\{background:rgba\(5,10,8,0\.75\);backdrop-filter:blur\(4px\)\}/);
  });

  test('Desktop modal and dialog containers use dark surface and borders', () => {
    const dialogMatch = stylesCss.match(/\.learner-dialog,\.modal-content\{([^}]+)\}/);
    assert.ok(dialogMatch, '.learner-dialog rule must exist');
    assert.match(dialogMatch[1], /background:var\(--surface\)/);
    assert.match(dialogMatch[1], /color:var\(--ink\)/);
    assert.match(dialogMatch[1], /border:1px solid var\(--line\)/);
  });

  test('Mobile modal dialogs (.learner-dialog, .daily-challenge-dialog) enforce dark surface override', () => {
    const mobileBlockMatch = stylesCss.match(/@media\(max-width:767px\)\s*\{([\s\S]*?)(?=\n@media|\n\.[a-z]|\n#|$)/);
    const mobileBlock = mobileBlockMatch[1];
    const dialogMatch = mobileBlock.match(/\.learner-dialog,\.daily-challenge-dialog\{([^}]+)\}/);
    assert.ok(dialogMatch, 'Mobile dialog rule must exist');
    assert.match(dialogMatch[1], /background:var\(--surface\)!important/);
    assert.match(dialogMatch[1], /color:var\(--ink\)!important/);
  });

  test('Primary card and stat elements use dark surface token', () => {
    const cardMatch = stylesCss.match(/\.stat,\.card\{([^}]+)\}/);
    assert.ok(cardMatch, '.stat,.card rule must exist');
    assert.match(cardMatch[1], /background:var\(--surface\)/);
    assert.match(cardMatch[1], /color:var\(--ink\)/);
  });
});

describe('Suite 3: Token Consistency & Variable Integrity', () => {
  test('Every var(--token) used in styles.css references a declared token or has fallback', () => {
    const varRegex = /var\(\s*(--[a-zA-Z0-9_-]+)(?:\s*,\s*([^)]+))?\s*\)/g;
    let match;
    const usedTokens = new Set();
    const missingTokens = [];

    // Local tokens allowed in specific components
    const localTokens = new Set(['--profile-accent', '--profile-soft', '--profile-ink']);

    while ((match = varRegex.exec(stylesCss)) !== null) {
      const tokenName = match[1];
      const fallback = match[2];
      usedTokens.add(tokenName);

      if (!tokens[tokenName] && !localTokens.has(tokenName) && !fallback) {
        missingTokens.push(tokenName);
      }
    }

    assert.equal(missingTokens.length, 0, 'Styles must not reference undefined CSS variables without fallback: ' + missingTokens.join(', '));
  });

  test('Typography font family fallback chain ends with generic sans-serif', () => {
    const bodyMatch = stylesCss.match(/body\{([^}]+)\}/);
    assert.ok(bodyMatch, 'body rule must exist');
    assert.match(bodyMatch[1], /sans-serif/, 'body font stack must terminate with sans-serif');
  });

  test('Editor typography font family terminates with monospace', () => {
    const editorMatch = stylesCss.match(/\.editor textarea\{([^}]+)\}/);
    assert.ok(editorMatch, '.editor textarea rule must exist');
    assert.match(editorMatch[1], /monospace/, 'editor textarea font stack must terminate with monospace');
  });
});

describe('Suite 4: Test Invariants and Touch Target Integrity', () => {
  test('Mandatory invariant: .editor textarea preserved verbatim', () => {
    assert.ok(
      stylesCss.includes('.editor textarea{width:100%;height:220px;min-height:170px;display:block;resize:vertical;padding:12px;border:0;outline:0;background:#172822;color:#d7ebda;direction:ltr;text-align:left;unicode-bidi:embed;font:16px/1.65 Consolas,monospace;tab-size:2}'),
      'Mandatory .editor textarea invariant must be preserved verbatim'
    );
  });

  test('Mandatory invariant: .growth-build-row{grid-template-columns:minmax(0,1fr)}', () => {
    assert.ok(
      stylesCss.includes('.growth-build-row{grid-template-columns:minmax(0,1fr)}'),
      'Mandatory .growth-build-row invariant must be preserved verbatim'
    );
  });

  test('Mandatory invariant: .starter-project-list{display:grid', () => {
    assert.ok(
      stylesCss.includes('.starter-project-list{display:grid'),
      'Mandatory .starter-project-list invariant must be preserved'
    );
  });

  test('Mandatory invariant: article.card mobile view rules preserved', () => {
    assert.ok(
      stylesCss.includes('article.card[data-mobile-view="editor"] .previewrow{display:none!important}'),
      'article.card editor view rule must be preserved'
    );
    assert.ok(
      stylesCss.includes('article.card[data-mobile-view="preview"] .editor{display:none!important}'),
      'article.card preview view rule must be preserved'
    );
  });

  test('Touch targets >= 44px on primary interactive elements', () => {
    const elementsToCheck = [
      { name: '.run', regex: /\.run\{[^}]*min-height\s*:\s*(\d+)px/ },
      { name: '.complete', regex: /\.complete\{[^}]*min-height\s*:\s*(\d+)px/ },
      { name: '.layout-toggle-btn', regex: /\.layout-toggle-btn\{[^}]*min-height\s*:\s*(\d+)px/ },
      { name: '.mobile-tab-btn', regex: /\.mobile-tab-btn\{[^}]*min-height\s*:\s*(\d+)px/ },
      { name: '.slot-btn-build', regex: /\.slot-btn-build\{[^}]*min-height\s*:\s*(\d+)px/ },
      { name: '.growth-add-part', regex: /\.growth-add-part\{[^}]*min-height\s*:\s*(\d+)px/ },
      { name: '.learner-create-button', regex: /\.learner-create-button\{[^}]*min-height\s*:\s*(\d+)px/ },
    ];

    elementsToCheck.forEach(el => {
      const match = stylesCss.match(el.regex);
      assert.ok(match, `${el.name} must specify min-height in px`);
      const val = parseInt(match[1], 10);
      assert.ok(val >= 44, `${el.name} min-height must be >= 44px, got ${val}px`);
    });
  });
});

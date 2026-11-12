/**
 * Empirical Adversarial Stress Harness for Milestone 3
 * Challenger 2: Responsive Theme, Invariant Regexes & Legacy Regressions
 */

const { test, describe } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const STYLES_PATH = path.join(__dirname, "..", "styles.css");
const styles = fs.readFileSync(STYLES_PATH, "utf8");

describe("Challenger 2 Suite 1: Mandatory Invariant Regex Verification", () => {
  test("Invariant 1: .editor textarea direction:ltr and unicode-bidi:embed character-exact regex", () => {
    assert.match(
      styles,
      /\.editor textarea\{[^}]*direction:ltr;[^}]*unicode-bidi:embed/,
      "Mandatory invariant failed: .editor textarea must include direction:ltr; unicode-bidi:embed"
    );
  });

  test("Invariant 2: .growth-build-row grid-template-columns:minmax(0,1fr) character-exact regex", () => {
    assert.match(
      styles,
      /\.growth-build-row\{grid-template-columns:minmax\(0,1fr\)\}/,
      "Mandatory invariant failed: .growth-build-row{grid-template-columns:minmax(0,1fr)}"
    );
  });

  test("Invariant 3: .starter-project-list display:grid character-exact regex", () => {
    assert.match(
      styles,
      /\.starter-project-list\{display:grid/,
      "Mandatory invariant failed: .starter-project-list{display:grid"
    );
  });

  test("Invariant 4: article.card[data-mobile-view=\"editor\"] .previewrow{display:none!important} character-exact", () => {
    assert.ok(
      styles.includes('article.card[data-mobile-view="editor"] .previewrow{display:none!important}'),
      "Mandatory invariant failed: article.card[data-mobile-view=\"editor\"] .previewrow{display:none!important}"
    );
  });

  test("Invariant 5: article.card[data-mobile-view=\"preview\"] .editor{display:none!important} character-exact", () => {
    assert.ok(
      styles.includes('article.card[data-mobile-view="preview"] .editor{display:none!important}'),
      "Mandatory invariant failed: article.card[data-mobile-view=\"preview\"] .editor{display:none!important}"
    );
  });
});

describe("Challenger 2 Suite 2: Responsive Breakpoint & Obsolete Trap Stress", () => {
  test("Standard mobile breakpoint @media(max-width:767px) exists", () => {
    assert.ok(
      styles.includes("@media(max-width:767px)"),
      "styles.css must declare @media(max-width:767px)"
    );
  });

  test("Standard tablet breakpoint @media(min-width:768px) and (max-width:1024px) exists", () => {
    assert.ok(
      styles.includes("@media(min-width:768px) and (max-width:1024px)"),
      "styles.css must declare unified tablet breakpoint @media(min-width:768px) and (max-width:1024px)"
    );
  });

  test("Standard desktop breakpoint @media(min-width:1025px) exists", () => {
    assert.ok(
      styles.includes("@media(min-width:1025px)"),
      "styles.css must declare explicit desktop breakpoint @media(min-width:1025px)"
    );
  });

  test("Zero occurrences of obsolete breakpoint traps (740px, 900px, 1020px)", () => {
    assert.strictEqual(/@media[^{]*\b740px\b/.test(styles), false, "Obsolete 740px trap found!");
    assert.strictEqual(/@media[^{]*\b900px\b/.test(styles), false, "Obsolete 900px trap found!");
    assert.strictEqual(/@media[^{]*\b1020px\b/.test(styles), false, "Obsolete 1020px trap found!");
  });
});

describe("Challenger 2 Suite 3: Interactive Touch Target Minimum Heights (>= 44px)", () => {
  const touchTargetRules = [
    { selector: ".run", regex: /\.run\{[^}]*min-height:\s*44px/ },
    { selector: ".complete", regex: /\.complete\{[^}]*min-height:\s*44px/ },
    { selector: ".editor-download", regex: /\.editor-download\{[^}]*min-height:\s*44px/ },
    { selector: ".tab", regex: /\.tab\{[^}]*min-height:\s*44px/ },
    { selector: ".layout-toggle-btn", regex: /\.layout-toggle-btn\{[^}]*min-height:\s*44px/ },
    { selector: ".dialog-close", regex: /\.dialog-close\{[^}]*(?:min-height:\s*44px|height:\s*44px)/ },
    { selector: ".mobile-tab-btn", regex: /\.mobile-tab-btn\{[^}]*min-height:\s*44px/ },
    { selector: ".mobile-tools button", regex: /\.mobile-tools\s+button\{[^}]*min-height:\s*44px/ },
    { selector: ".growth-add-part", regex: /\.growth-add-part\{[^}]*min-height:\s*44px/ },
    { selector: ".learner-create-button", regex: /\.learner-create-button\{[^}]*min-height:\s*44px/ },
    { selector: ".learner-create-form input", regex: /\.learner-create-form\s+input\{[^}]*min-height:\s*44px/ },
    { selector: ".road-search input", regex: /\.road-search\s+input\{[^}]*min-height:\s*44px/ },
    { selector: ".daily-challenge-workspace button", regex: /\.daily-challenge-workspace\s+button\{[^}]*min-height:\s*44px/ },
    { selector: ".shell.side-collapsed .nav a", regex: /\.shell\.side-collapsed\s+\.nav\s+a\{[^}]*min-height:\s*44px/ },
    { selector: ".angular-mobile-panes button", regex: /\.angular-mobile-panes\s+button\{[^}]*min-height:\s*44px/ },
    { selector: ".angular-tool-button", regex: /\.angular-tool-button\{[^}]*min-height:\s*44px/ },
    { selector: ".project-actions button", regex: /\.project-actions\s+button[^}]*min-height:\s*44px/ }
  ];

  touchTargetRules.forEach(({ selector, regex }) => {
    test(`Touch target >= 44px min-height for ${selector}`, () => {
      assert.match(styles, regex, `Control ${selector} must specify min-height >= 44px for accessible touch target`);
    });
  });
});

describe("Challenger 2 Suite 4: Form Input Font-Size (16px!important) on Mobile/Tablet", () => {
  test("Tablet breakpoint enforces font-size: 16px!important for form inputs", () => {
    const tabletMatch = styles.match(/@media\(min-width:768px\)\s*and\s*\(max-width:1024px\)\{([\s\S]*?)\n\}/);
    assert.ok(tabletMatch, "Tablet media query block must exist");
    assert.match(
      tabletMatch[1],
      /input,textarea,select,\.slot-input\{font-size:16px!important\}/,
      "Tablet block must enforce font-size: 16px!important on inputs to prevent iOS zoom"
    );
  });

  test("Mobile breakpoint enforces font-size: 16px!important for form inputs", () => {
    const mobileMatch = styles.match(/@media\(max-width:767px\)\{([\s\S]*?)\n\}/);
    assert.ok(mobileMatch, "Mobile media query block must exist");
    assert.match(
      mobileMatch[1],
      /input,textarea,select,\.slot-input\{font-size:16px!important\}/,
      "Mobile block must enforce font-size: 16px!important on inputs to prevent iOS zoom"
    );
  });
});

describe("Challenger 2 Suite 5: Dark Developer Theme Tokens & WCAG AAA Contrast", () => {
  test(":root custom properties define required dark theme tokens", () => {
    const rootMatch = styles.match(/:root\{([^}]+)\}/);
    assert.ok(rootMatch, ":root declaration must exist");
    const rootContent = rootMatch[1];

    assert.match(rootContent, /--bg:\s*#0d1410/, "--bg token must be #0d1410");
    assert.match(rootContent, /--surface:\s*#14201a/, "--surface token must be #14201a");
    assert.match(rootContent, /--surface-raised:\s*#1a2a22/, "--surface-raised token must be #1a2a22");
    assert.match(rootContent, /--ink:\s*#e6f2eb/, "--ink token must be #e6f2eb");
    assert.match(rootContent, /--green:\s*#2bb07f/, "--green token must be #2bb07f");
    assert.match(rootContent, /--lime:\s*#bbf268/, "--lime token must be #bbf268");
  });

  test("Luminance contrast ratio between --bg and --ink exceeds 7.0:1 (WCAG AAA)", () => {
    function hexToRgb(hex) {
      const clean = hex.replace("#", "");
      return [
        parseInt(clean.slice(0, 2), 16),
        parseInt(clean.slice(2, 4), 16),
        parseInt(clean.slice(4, 6), 16)
      ];
    }
    function luminance([r, g, b]) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    const lumBg = luminance(hexToRgb("#0d1410"));
    const lumInk = luminance(hexToRgb("#e6f2eb"));
    const ratio = (Math.max(lumBg, lumInk) + 0.05) / (Math.min(lumBg, lumInk) + 0.05);

    assert.ok(ratio >= 7.0, `Contrast ratio (${ratio.toFixed(2)}) must be >= 7.0:1 for WCAG AAA`);
  });
});

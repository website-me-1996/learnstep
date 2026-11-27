const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");

function loadSmartCodeCoach() {
  const src = fs.readFileSync(path.join(__dirname, "..", "smart-code-coach.js"), "utf8");
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "smart-code-coach.js" });
  return sandbox.SmartCodeCoach || sandbox.window.SmartCodeCoach;
}

const SmartCodeCoach = loadSmartCodeCoach();

test("SmartCodeCoach: detects HTML unclosed tag, wrong scope (<title> in <body>), and tag typo with line numbers", () => {
  const scopeRes = SmartCodeCoach.evaluate({
    language: "html",
    userCode: "<html>\n<body>\n<title>خطوة</title>\n</body>\n</html>",
    beforeCode: "<html>\n<head></head>\n<body></body>\n</html>",
    targetCode: "<html>\n<head><title>خطوة</title></head>\n<body></body>\n</html>",
    tier: 1
  });
  assert.equal(scopeRes.detected, true);
  assert.equal(scopeRes.kind, "scope");
  assert.equal(scopeRes.lineNumber, 3);
  assert.match(scopeRes.message, /السطر ٣/);
  assert.match(scopeRes.message, /<head>/);

  const typoRes = SmartCodeCoach.evaluate({
    language: "html",
    userCode: "<div>\n<strng>مرحباً</strng>\n</div>",
    targetCode: "<div>\n<strong>مرحباً</strong>\n</div>",
    tier: 1
  });
  assert.equal(typoRes.detected, true);
  assert.equal(typoRes.kind, "typo");
  assert.equal(typoRes.lineNumber, 2);
  assert.match(typoRes.message, /strong/);
});

test("SmartCodeCoach: detects CSS property typo, missing colon, and missing semicolon", () => {
  const typo = SmartCodeCoach.evaluate({
    language: "css",
    userCode: ".card {\n  colro: #256b57;\n}",
    targetCode: ".card {\n  color: #256b57;\n}",
    tier: 1
  });
  assert.equal(typo.detected, true);
  assert.equal(typo.kind, "typo");
  assert.equal(typo.lineNumber, 2);
  assert.match(typo.message, /color/);

  const colon = SmartCodeCoach.evaluate({
    language: "css",
    userCode: ".card {\n  color #256b57;\n}",
    targetCode: ".card {\n  color: #256b57;\n}",
    tier: 2
  });
  assert.equal(colon.detected, true);
  assert.equal(colon.kind, "syntax");
  assert.equal(colon.lineNumber, 2);
  assert.match(colon.message, /؟/);

  const semi = SmartCodeCoach.evaluate({
    language: "css",
    userCode: ".card {\n  color: #256b57\n  padding: 12px;\n}",
    targetCode: ".card {\n  color: #256b57;\n  padding: 12px;\n}",
    tier: 1
  });
  assert.equal(semi.detected, true);
  assert.equal(semi.kind, "delimiter");
  assert.equal(semi.lineNumber, 2);
});

test("SmartCodeCoach: detects JS assignment inside if(...), trailing if semicolon, and console typo", () => {
  const assignInIf = SmartCodeCoach.evaluate({
    language: "js",
    userCode: "const score = 10;\nif (score = 10) {\n  console.log('ok');\n}",
    targetCode: "const score = 10;\nif (score === 10) {\n  console.log('ok');\n}",
    tier: 1
  });
  assert.equal(assignInIf.detected, true);
  assert.equal(assignInIf.kind, "syntax");
  assert.equal(assignInIf.lineNumber, 2);
  assert.match(assignInIf.message, /تُسند قيمة/);

  const assignTier2 = SmartCodeCoach.evaluate({
    language: "js",
    userCode: "const score = 10;\nif (score = 10) {\n  console.log('ok');\n}",
    targetCode: "const score = 10;\nif (score === 10) {\n  console.log('ok');\n}",
    tier: 2
  });
  assert.match(assignTier2.message, /===/);

  const trailingSemi = SmartCodeCoach.evaluate({
    language: "js",
    userCode: "if (ready);\n{\n  go();\n}",
    tier: 2
  });
  assert.equal(trailingSemi.detected, true);
  assert.equal(trailingSemi.kind, "scope");
  assert.equal(trailingSemi.lineNumber, 1);

  const typo = SmartCodeCoach.evaluate({
    language: "js",
    userCode: "consol.log(1);",
    tier: 1
  });
  assert.equal(typo.detected, true);
  assert.equal(typo.kind, "typo");
  assert.match(typo.message, /console/);
});

test("SmartCodeCoach: detects SQL = NULL comparison, UPDATE without WHERE, and SQL keyword typos", () => {
  const nullCmp = SmartCodeCoach.evaluate({
    language: "database",
    userCode: "SELECT * FROM products\nWHERE deleted_at = NULL;",
    tier: 1
  });
  assert.equal(nullCmp.detected, true);
  assert.equal(nullCmp.lineNumber, 2);
  assert.match(nullCmp.message, /ليست رقمًا/);

  const nullCmpTier2 = SmartCodeCoach.evaluate({
    language: "database",
    userCode: "SELECT * FROM products\nWHERE deleted_at = NULL;",
    tier: 2
  });
  assert.match(nullCmpTier2.message, /IS NULL/);

  const unsafeUpdate = SmartCodeCoach.evaluate({
    language: "database",
    userCode: "UPDATE products SET price = 0;",
    tier: 1
  });
  assert.equal(unsafeUpdate.detected, true);
  assert.equal(unsafeUpdate.kind, "scope");
  assert.match(unsafeUpdate.message, /WHERE/);

  const sqlTypo = SmartCodeCoach.evaluate({
    language: "database",
    userCode: "SELCT name FROM products;",
    tier: 1
  });
  assert.equal(sqlTypo.detected, true);
  assert.equal(sqlTypo.kind, "typo");
  assert.match(sqlTypo.message, /SELECT/);
});

test("SmartCodeCoach: detects C# case sensitivity mismatch, missing semicolon, and runtime error line", () => {
  const caseErr = SmartCodeCoach.evaluate({
    language: "csharp",
    userCode: 'int count = 3;\nConsole.Writeline(count);',
    targetCode: 'int count = 3;\nConsole.WriteLine(count);',
    tier: 1
  });
  assert.equal(caseErr.detected, true);
  assert.equal(caseErr.kind, "typo");
  assert.equal(caseErr.lineNumber, 2);
  assert.match(caseErr.message, /WriteLine/);

  const semi = SmartCodeCoach.evaluate({
    language: "csharp",
    userCode: 'int count = 3\nConsole.WriteLine(count);',
    tier: 1
  });
  assert.equal(semi.detected, true);
  assert.equal(semi.kind, "delimiter");
  assert.equal(semi.lineNumber, 1);

  const runtimeErr = SmartCodeCoach.evaluate({
    language: "csharp",
    userCode: 'Console.Writeline("Hi");',
    runtimeError: { line: 1, message: "أمر غير معروف" },
    tier: 1
  });
  assert.equal(runtimeErr.detected, true);
  assert.match(runtimeErr.message, /WriteLine/);
});

test("SmartCodeCoach: detects Angular @for missing track and unclosed interpolation {{", () => {
  const missingTrack = SmartCodeCoach.evaluate({
    language: "angular",
    userCode: "<div>\n@for (m of movies) {\n  <p>{{ m.title }}</p>\n}\n</div>",
    tier: 1
  });
  assert.equal(missingTrack.detected, true);
  assert.equal(missingTrack.kind, "syntax");
  assert.equal(missingTrack.lineNumber, 2);
  assert.match(missingTrack.message, /track/);

  const unclosedInterp = SmartCodeCoach.evaluate({
    language: "angular",
    userCode: "<h1>{{ title </h1>",
    tier: 1
  });
  assert.equal(unclosedInterp.detected, true);
  assert.equal(unclosedInterp.kind, "delimiter");
});

test("SmartCodeCoach: predictive next-token engine & livePredict anticipate mid-line typing", () => {
  const pred = SmartCodeCoach.evaluate({
    language: "js",
    userCode: "const btn = document.",
    targetCode: "const btn = document.querySelector('#save');",
    tier: 1
  });
  assert.equal(pred.detected, true);
  assert.equal(pred.kind, "predictive");
  assert.match(pred.nextTokenPreview, /querySelector/);

  const sqlLive = SmartCodeCoach.livePredict({
    language: "database",
    userCode: "SELECT name",
    beforeCode: "",
    targetCode: "SELECT name, price FROM products;"
  });
  assert.ok(sqlLive);
  assert.equal(sqlLive.kind, "predictive");

  // Empty input should never nag prematurely
  const emptyRes = SmartCodeCoach.evaluate({
    language: "html",
    userCode: "   ",
    targetCode: "<h1>أهلاً</h1>",
    tier: 1
  });
  assert.equal(emptyRes.detected, false);
  assert.equal(emptyRes.kind, "empty");
});

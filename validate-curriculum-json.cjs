/**
 * validate-curriculum-json.cjs
 *
 * Automated pre-flight validator for StepLearn curriculum JSON files.
 * Verifies:
 *  1. UTF-8 standard encoding without BOM (Byte Order Mark).
 *  2. Absence of Mojibake or malformed character sequences.
 *  3. Strict canonical schema conformance (schemaVersion: "1.0.0").
 *  4. Required track-level and lesson-level fields (all 15 canonical fields).
 *  5. Step structure, 4-tier progressive hints, and attention-direction safeguards.
 *  6. Regex syntax validity for all error detection rules.
 *  7. Complete bugRepair structure and valid option indexes.
 *
 * Usage:
 *  node validate-curriculum-json.cjs [file1.json file2.json ...]
 */

const fs = require("node:fs");
const path = require("node:path");

const CANONICAL_SCHEMA_VERSION = "1.0.0";
const VALID_STEP_TYPES = new Set(["build", "edit", "experiment", "observe", "repair", "quiz"]);
const VALID_ERROR_RULE_TYPES = new Set(["regex", "missing", "extra", "syntax", "tag", "value", "structure"]);

/**
 * Checks a file Buffer for UTF-8 BOM and malformed UTF-8 / Mojibake sequences.
 */
function validateBufferUtf8NoBom(buffer, fileName = "file") {
  const errors = [];
  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    errors.push(`${fileName}: Contains UTF-8 BOM (0xEF, 0xBB, 0xBF). Prohibited; must be UTF-8 without BOM.`);
  }

  const text = buffer.toString("utf8");

  // Check for Unicode replacement character (\uFFFD)
  if (text.includes("\uFFFD")) {
    errors.push(`${fileName}: Contains Unicode replacement character (U+FFFD), indicating invalid or corrupted UTF-8 byte sequences.`);
  }

  // Check for common Mojibake artifacts (e.g. Windows-1252 / ISO-8859 misinterpretation of Arabic UTF-8)
  const mojibakePattern = /[\u00C0-\u00C3][\u0080-\u00BF]|Ã[\u0080-\u00BF]|Ø[\u00A7\u00A8\u00A9\u00AA\u00AB\u00AC\u00AD\u00AE\u00AF]|Ù[\u0080-\u008F]/;
  if (mojibakePattern.test(text)) {
    errors.push(`${fileName}: Potential Mojibake sequence detected. Verify text encoding.`);
  }

  return { valid: errors.length === 0, errors, text };
}

/**
 * Validates a single ErrorRule object.
 */
function validateErrorRule(rule, stepPath) {
  const errors = [];
  if (!rule || typeof rule !== "object") {
    errors.push(`${stepPath}: errorRule must be an object.`);
    return errors;
  }

  if (typeof rule.pattern !== "string" || !rule.pattern.trim()) {
    errors.push(`${stepPath}: errorRule.pattern is required and must be a non-empty string.`);
  } else {
    try {
      new RegExp(rule.pattern, rule.flags || "");
    } catch (err) {
      errors.push(`${stepPath}: errorRule.pattern '/${rule.pattern}/${rule.flags || ""}' is invalid RegExp: ${err.message}`);
    }
  }

  if (rule.flags !== undefined && typeof rule.flags !== "string") {
    errors.push(`${stepPath}: errorRule.flags must be a string if provided.`);
  } else if (typeof rule.flags === "string") {
    if (!/^[gimsuy]*$/.test(rule.flags)) {
      errors.push(`${stepPath}: errorRule.flags '${rule.flags}' contains invalid RegExp flags.`);
    }
  }

  if (typeof rule.type !== "string" || !rule.type.trim()) {
    errors.push(`${stepPath}: errorRule.type must be a non-empty string.`);
  }

  if (typeof rule.message !== "string" || !rule.message.trim()) {
    errors.push(`${stepPath}: errorRule.message is required and must be a non-empty string.`);
  }

  return errors;
}

/**
 * Validates a single Step object, including 4-tier progressive hints.
 */
function validateStep(step, stepIndex, lessonPath) {
  const errors = [];
  const stepPath = `${lessonPath}.steps[${stepIndex}]`;

  if (!step || typeof step !== "object") {
    errors.push(`${stepPath}: Step must be an object.`);
    return errors;
  }

  const requiredStringFields = ["id", "title", "objective", "type", "instruction", "benefit"];
  for (const field of requiredStringFields) {
    if (typeof step[field] !== "string" || !step[field].trim()) {
      errors.push(`${stepPath}: '${field}' is required and must be a non-empty string.`);
    }
  }

  if (step.type && !VALID_STEP_TYPES.has(step.type)) {
    errors.push(`${stepPath}: Invalid step.type '${step.type}'. Allowed: ${Array.from(VALID_STEP_TYPES).join(", ")}`);
  }

  // Validate errorRules array
  if (!Array.isArray(step.errorRules)) {
    errors.push(`${stepPath}: 'errorRules' must be an array.`);
  } else {
    step.errorRules.forEach((rule, ruleIdx) => {
      errors.push(...validateErrorRule(rule, `${stepPath}.errorRules[${ruleIdx}]`));
    });
  }

  // Validate hints: must have 4 progressive tiers
  if (!Array.isArray(step.hints)) {
    errors.push(`${stepPath}: 'hints' must be an array of 4 progressive tiers.`);
  } else if (step.hints.length < 4) {
    errors.push(`${stepPath}: 'hints' must have at least 4 tiers (found ${step.hints.length}). Tiers required: 1. Attention prompt, 2. Rule explanation, 3. Actionable help, 4. Solution reveal.`);
  } else {
    // Check each hint
    step.hints.forEach((hint, hIdx) => {
      const hintText = typeof hint === "string" ? hint : (hint && typeof hint === "object" ? hint.text : null);
      if (typeof hintText !== "string" || !hintText.trim()) {
        errors.push(`${stepPath}.hints[${hIdx}]: Hint text must be a non-empty string.`);
      }
    });

    // Tier 1 safeguard: must not directly leak the full solution code
    const tier1 = typeof step.hints[0] === "string" ? step.hints[0] : (step.hints[0] && step.hints[0].text ? step.hints[0].text : "");
    const solutionCode = (step.solution || step.expectedLine || step.to || "").trim();
    if (solutionCode && solutionCode.length > 5 && tier1.trim() === solutionCode) {
      errors.push(`${stepPath}.hints[0]: Tier 1 must be an attention prompt without solution; full solution was leaked.`);
    }

    // Tier 2 safeguard: must include conceptual rule and Arabic guiding question ending with '؟'
    const tier2 = typeof step.hints[1] === "string" ? step.hints[1] : (step.hints[1] && step.hints[1].text ? step.hints[1].text : "");
    if (tier2 && !tier2.includes("؟")) {
      errors.push(`${stepPath}.hints[1]: Tier 2 must include an Arabic guiding question ending with '؟'.`);
    }

    // Tier 4 safeguard: solution reveal must contain or match the exact target solution
    const tier4 = typeof step.hints[3] === "string" ? step.hints[3] : (step.hints[3] && step.hints[3].text ? step.hints[3].text : "");
    if (solutionCode && !tier4.includes(solutionCode)) {
      errors.push(`${stepPath}.hints[3]: Tier 4 solution reveal must contain or match the exact target solution '${solutionCode}'.`);
    }
  }

  return errors;
}

/**
 * Validates a BugRepair object.
 */
function validateBugRepair(repair, lessonPath) {
  const errors = [];
  const repairPath = `${lessonPath}.bugRepair`;

  if (!repair || typeof repair !== "object") {
    errors.push(`${repairPath}: 'bugRepair' is required and must be an object.`);
    return errors;
  }

  const requiredFields = ["brokenCode", "fixedCode", "question", "explanation"];
  for (const field of requiredFields) {
    if (typeof repair[field] !== "string" || !repair[field].trim()) {
      errors.push(`${repairPath}: '${field}' is required and must be a non-empty string.`);
    }
  }

  if (!Array.isArray(repair.options) || repair.options.length < 2) {
    errors.push(`${repairPath}: 'options' must be an array with at least 2 choices.`);
  } else {
    repair.options.forEach((opt, optIdx) => {
      if (typeof opt !== "string" || !opt.trim()) {
        errors.push(`${repairPath}.options[${optIdx}]: Option must be a non-empty string.`);
      }
    });
  }

  if (typeof repair.correctOptionIndex !== "number" || !Number.isInteger(repair.correctOptionIndex)) {
    errors.push(`${repairPath}: 'correctOptionIndex' must be an integer.`);
  } else if (Array.isArray(repair.options) && (repair.correctOptionIndex < 0 || repair.correctOptionIndex >= repair.options.length)) {
    errors.push(`${repairPath}: 'correctOptionIndex' (${repair.correctOptionIndex}) is out of range for options length (${repair.options.length}).`);
  }

  return errors;
}

/**
 * Validates a single Lesson object against the strict 15-field canonical schema.
 */
function validateLesson(lesson, index, trackName) {
  const errors = [];
  const lessonPath = `${trackName}.lessons[${index}]`;

  if (!lesson || typeof lesson !== "object") {
    errors.push(`${lessonPath}: Lesson must be an object.`);
    return errors;
  }

  const requiredFields = [
    "id", "legacyId", "title", "skill", "order",
    "concept", "whyUse", "browserMechanics", "documentationUrl",
    "code", "breakdown", "steps", "bugRepair"
  ];

  for (const field of requiredFields) {
    if (lesson[field] === undefined || lesson[field] === null) {
      errors.push(`${lessonPath}: Missing required field '${field}'.`);
    }
  }

  // Type checks
  if (typeof lesson.id !== "string" || !lesson.id.trim()) {
    errors.push(`${lessonPath}: 'id' must be a non-empty string.`);
  }
  if (typeof lesson.legacyId !== "string" || !lesson.legacyId.trim()) {
    errors.push(`${lessonPath}: 'legacyId' must be a non-empty string.`);
  }
  if (typeof lesson.title !== "string" || !lesson.title.trim()) {
    errors.push(`${lessonPath}: 'title' must be a non-empty string.`);
  }
  if (typeof lesson.skill !== "string" || !lesson.skill.trim()) {
    errors.push(`${lessonPath}: 'skill' must be a non-empty string.`);
  }
  if (typeof lesson.order !== "number" || !Number.isInteger(lesson.order)) {
    errors.push(`${lessonPath}: 'order' must be an integer.`);
  }
  if (typeof lesson.concept !== "string" || lesson.concept.trim().length < 10) {
    errors.push(`${lessonPath}: 'concept' must be a detailed string (minimum 10 characters).`);
  }
  if (typeof lesson.whyUse !== "string" || lesson.whyUse.trim().length < 10) {
    errors.push(`${lessonPath}: 'whyUse' must be a detailed string (minimum 10 characters).`);
  }
  if (typeof lesson.browserMechanics !== "string" || lesson.browserMechanics.trim().length < 10) {
    errors.push(`${lessonPath}: 'browserMechanics' must be a detailed string (minimum 10 characters).`);
  }
  if (typeof lesson.documentationUrl !== "string" || !/^https?:\/\//i.test(lesson.documentationUrl)) {
    errors.push(`${lessonPath}: 'documentationUrl' must be a valid HTTP/HTTPS URL.`);
  }
  if (typeof lesson.code !== "string" || !lesson.code.trim()) {
    errors.push(`${lessonPath}: 'code' must be a non-empty string.`);
  }

  // Breakdown check: array of strings or objects
  if (!Array.isArray(lesson.breakdown) || lesson.breakdown.length === 0) {
    errors.push(`${lessonPath}: 'breakdown' must be a non-empty array.`);
  }

  // Steps check
  if (!Array.isArray(lesson.steps) || lesson.steps.length === 0) {
    errors.push(`${lessonPath}: 'steps' must be a non-empty array of Step objects.`);
  } else {
    lesson.steps.forEach((step, stepIdx) => {
      errors.push(...validateStep(step, stepIdx, lessonPath));
    });
  }

  // BugRepair check
  if (lesson.bugRepair) {
    errors.push(...validateBugRepair(lesson.bugRepair, lessonPath));
  }

  return errors;
}

/**
 * Validates parsed Track JSON data.
 */
function validateCurriculumData(data, sourceName = "curriculum") {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: [`${sourceName}: Root must be a JSON object.`] };
  }

  if (data.schemaVersion !== CANONICAL_SCHEMA_VERSION) {
    errors.push(`${sourceName}: 'schemaVersion' must be exactly '${CANONICAL_SCHEMA_VERSION}', got '${data.schemaVersion}'.`);
  }

  if (typeof data.track !== "string" || !data.track.trim()) {
    errors.push(`${sourceName}: 'track' is required and must be a non-empty string.`);
  }

  if (typeof data.title !== "string" || !data.title.trim()) {
    errors.push(`${sourceName}: 'title' is required and must be a non-empty string.`);
  }

  if (!Array.isArray(data.lessons)) {
    errors.push(`${sourceName}: 'lessons' must be an array.`);
  } else {
    const seenIds = new Set();
    const seenLegacyIds = new Set();

    data.lessons.forEach((lesson, idx) => {
      if (lesson && lesson.id) {
        if (seenIds.has(lesson.id)) {
          errors.push(`${sourceName}: Duplicate lesson id '${lesson.id}' at index ${idx}.`);
        }
        seenIds.add(lesson.id);
      }
      if (lesson && lesson.legacyId) {
        if (seenLegacyIds.has(lesson.legacyId)) {
          errors.push(`${sourceName}: Duplicate lesson legacyId '${lesson.legacyId}' at index ${idx}.`);
        }
        seenLegacyIds.add(lesson.legacyId);
      }
      errors.push(...validateLesson(lesson, idx, data.track || sourceName));
    });

    // Track-level verification: bugRepair.correctOptionIndex diversification
    if (data.lessons.length > 5) {
      const distinctIndices = new Set();
      data.lessons.forEach((l) => {
        if (l.bugRepair && typeof l.bugRepair.correctOptionIndex === "number") {
          distinctIndices.add(l.bugRepair.correctOptionIndex);
        }
      });
      if (distinctIndices.size < 2) {
        errors.push(`${sourceName}: bugRepair.correctOptionIndex must be diversified across lessons (found only index: ${Array.from(distinctIndices).join(", ")}).`);
      }
    }
  }

  return { valid: errors.length === 0, errors, lessonCount: Array.isArray(data.lessons) ? data.lessons.length : 0 };
}

/**
 * Validates a single JSON curriculum file path.
 */
function validateCurriculumFile(filePath) {
  const absPath = path.resolve(filePath);
  const baseName = path.basename(absPath);

  if (!fs.existsSync(absPath)) {
    return { valid: false, errors: [`File not found: ${filePath}`], lessonCount: 0 };
  }

  const buffer = fs.readFileSync(absPath);
  const utf8Check = validateBufferUtf8NoBom(buffer, baseName);
  if (!utf8Check.valid) {
    return { valid: false, errors: utf8Check.errors, lessonCount: 0 };
  }

  let parsed;
  try {
    parsed = JSON.parse(utf8Check.text);
  } catch (err) {
    return { valid: false, errors: [`${baseName}: JSON parse error: ${err.message}`], lessonCount: 0 };
  }

  return validateCurriculumData(parsed, baseName);
}

/**
 * Built-in reference canonical fixture for self-verification.
 */
function createReferenceFixture() {
  return {
    schemaVersion: "1.0.0",
    track: "html",
    title: "مسار تطوير واجهات الويب القياسية: HTML",
    description: "منهج احترافي عالي الجودة باللغة العربية",
    totalLessons: 1,
    lessons: [
      {
        id: "html-01-intro",
        legacyId: "html:0",
        title: "HTML Introduction",
        skill: "html-foundation",
        order: 0,
        concept: "شرح معمق لدور لغة HTML في بناء شجرة DOM وهيكلة المحتوى للويب.",
        whyUse: "تعد لغة HTML العمود الفقري لكافة صفحات الويب في العالم، وبدونها لا يفهم المتصفح دلالة المحتوى.",
        browserMechanics: "يقوم المتصفح بقراءة تسلسل البايتات، وتحويلها إلى رموز Tokens، ثم تشييد عُقد شجرة الـ DOM وعرضها.",
        documentationUrl: "https://developer.mozilla.org/ar/docs/Web/HTML",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحتي الأولى</title>\n</head>\n<body>\n  <h1>أهلاً بالعالم</h1>\n</body>\n</html>",
        breakdown: [
          "<!DOCTYPE html>: يعلن للمتصفح أن المستند مبني وفق معيار HTML5 القياسي.",
          "<html lang=\"ar\" dir=\"rtl\">: العنصر الجذري يحدد اتجاه الصفحة من اليمين لليسار ولغتها العربية.",
          "<title>: يحدد اسم الصفحة في شريط المتصفح ومحركات البحث."
        ],
        steps: [
          {
            id: "step-1",
            title: "تحديد عنوان الصفحة القياسي",
            objective: "كتابة وسم title وتعيين اسم المستند",
            type: "build",
            instruction: "أضف وسم <title>صفحتي الأولى</title> داخل وسم <head>.",
            expectedLine: "<title>صفحتي الأولى</title>",
            benefit: "فائدة ما أنشأته للتو: عرفت المتصفح بعنوان تبويب الصفحة ومحركات البحث.",
            errorRules: [
              {
                pattern: "<title>[^<]*$",
                flags: "i",
                type: "missing",
                message: "فتحت وسم <title> ولكنك نسيت إغلاقه بـ </title>."
              }
            ],
            hints: [
              "انتبه إلى محتويات وسم head؛ العنوان يجب أن يوضع هناك محاطاً بوسم البداية والإغلاق.",
              "القاعدة: وسوم النصوص الحاوية تتطلب وسم إغلاق يحمل شرطة مائلة مثل </title>. هل أغلقت الوسم بشكل صحيح؟",
              "اكتب السطر هكذا: <title>صفحتي الأولى</title> دون مسافات زائدة داخل الأقواس.",
              "الحل النموذجي: <title>صفحتي الأولى</title>"
            ]
          }
        ],
        bugRepair: {
          brokenCode: "<title>صفحتي الأولى</span>",
          fixedCode: "<title>صفحتي الأولى</title>",
          question: "ما هو الخطأ في وسم العنوان المعروض؟",
          explanation: "وسم الإغلاق يجب أن يطابق تماماً اسم وسم البداية، فالبداية <title> تتطلب نهاية </title>.",
          options: [
            "اسم وسم الإغلاق </span> لا يطابق وسم البداية <title>",
            "وسم <title> لا يقبل نصوصاً عربية",
            "يجب حذف وسم البداية"
          ],
          correctOptionIndex: 0
        }
      }
    ]
  };
}

/**
 * Self-test suite verifying the validator against valid and invalid fixtures.
 */
function runSelfTest() {
  const fixture = createReferenceFixture();
  const validRes = validateCurriculumData(fixture, "fixture-valid");
  if (!validRes.valid) {
    throw new Error(`Self-test failed on valid fixture: ${validRes.errors.join("; ")}`);
  }

  // Negative test: invalid schemaVersion
  const badVersion = { ...fixture, schemaVersion: "0.9.0" };
  const badVerRes = validateCurriculumData(badVersion, "bad-version");
  if (badVerRes.valid) throw new Error("Self-test failed: Accepted invalid schemaVersion.");

  // Negative test: invalid RegExp
  const badRegexFixture = JSON.parse(JSON.stringify(fixture));
  badRegexFixture.lessons[0].steps[0].errorRules[0].pattern = "[a-z"; // unclosed bracket
  const badRegRes = validateCurriculumData(badRegexFixture, "bad-regex");
  if (badRegRes.valid) throw new Error("Self-test failed: Accepted invalid RegExp pattern.");

  // Negative test: leaked solution in Tier 1 hint
  const leakedFixture = JSON.parse(JSON.stringify(fixture));
  leakedFixture.lessons[0].steps[0].hints[0] = "<title>صفحتي الأولى</title>";
  const leakRes = validateCurriculumData(leakedFixture, "leaked-hint");
  if (leakRes.valid) throw new Error("Self-test failed: Accepted leaked solution in Tier 1 hint.");

  // Negative test: UTF-8 BOM detection
  const bomBuffer = Buffer.from([0xef, 0xbb, 0xbf, 0x7b, 0x7d]);
  const bomRes = validateBufferUtf8NoBom(bomBuffer, "bom-test");
  if (bomRes.valid) throw new Error("Self-test failed: Accepted UTF-8 BOM.");

  // Negative test: Tier 2 missing guiding question ending with '؟'
  const noQFixture = JSON.parse(JSON.stringify(fixture));
  noQFixture.lessons[0].steps[0].hints[1] = "القاعدة: وسوم النصوص تتطلب إغلاقاً متطابقاً.";
  const noQRes = validateCurriculumData(noQFixture, "no-question-test");
  if (noQRes.valid) throw new Error("Self-test failed: Accepted Tier 2 hint without Arabic question mark '؟'.");

  // Negative test: Tier 4 mismatch with solution code
  const badT4Fixture = JSON.parse(JSON.stringify(fixture));
  badT4Fixture.lessons[0].steps[0].hints[3] = "الحل النموذجي: <title>حل غير مطابق</title>";
  const badT4Res = validateCurriculumData(badT4Fixture, "bad-t4-test");
  if (badT4Res.valid) throw new Error("Self-test failed: Accepted Tier 4 hint not containing expected solution.");

  // Negative test: non-diversified bugRepair.correctOptionIndex across multiple lessons
  const staticRepairFixture = JSON.parse(JSON.stringify(fixture));
  staticRepairFixture.lessons = Array(6).fill(null).map((_, i) => {
    const l = JSON.parse(JSON.stringify(fixture.lessons[0]));
    l.id = `lesson-${i}`;
    l.legacyId = `track:${i}`;
    l.order = i;
    l.bugRepair.correctOptionIndex = 0;
    return l;
  });
  const staticRepairRes = validateCurriculumData(staticRepairFixture, "static-repair-test");
  if (staticRepairRes.valid) throw new Error("Self-test failed: Accepted non-diversified bugRepair.correctOptionIndex across lessons.");

  return true;
}

/**
 * CLI runner.
 */
function main() {
  const args = process.argv.slice(2);
  let filesToValidate = [];

  if (args.length > 0) {
    filesToValidate = args;
  } else {
    // Look for track JSON files in current working directory
    const defaultTrackFiles = [
      "html-lessons.json",
      "css-lessons.json",
      "js-lessons.json",
      "angular-lessons.json"
    ];

    const existingFiles = defaultTrackFiles.filter((f) => fs.existsSync(path.resolve(f)));
    if (existingFiles.length > 0) {
      filesToValidate = existingFiles;
    }
  }

  console.log("================================================================================");
  console.log("           StepLearn Curriculum Canonical JSON Validator (v1.0.0)               ");
  console.log("================================================================================");

  // Run internal self-verification
  try {
    runSelfTest();
    console.log("✔ Validator self-test passed (positive & adversarial negative tests verified).");
  } catch (err) {
    console.error("✖ Validator self-test FAILED:", err.message);
    process.exit(1);
  }

  if (filesToValidate.length === 0) {
    console.log("ℹ No track JSON files found yet in current directory.");
    console.log("  Target files: html-lessons.json, css-lessons.json, js-lessons.json, angular-lessons.json");
    console.log("  The validator is active and ready for curriculum authoring milestones (M2-M5).");
    console.log("================================================================================");
    process.exit(0);
  }

  let hasErrors = false;
  let totalLessonsValidated = 0;

  for (const file of filesToValidate) {
    console.log(`\nValidating: ${file}...`);
    const res = validateCurriculumFile(file);
    if (!res.valid) {
      hasErrors = true;
      console.error(`✖ ${file} FAILED validation with ${res.errors.length} error(s):`);
      res.errors.forEach((e) => console.error(`  - ${e}`));
    } else {
      totalLessonsValidated += res.lessonCount;
      console.log(`✔ ${file} passed strict validation (${res.lessonCount} lessons verified).`);
    }
  }

  console.log("\n================================================================================");
  if (hasErrors) {
    console.error("✖ Curriculum validation FAILED. Correct schema errors before proceeding.");
    process.exit(1);
  } else {
    console.log(`✔ All validated files passed strict canonical schema. Total lessons: ${totalLessonsValidated}`);
    console.log("================================================================================");
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  CANONICAL_SCHEMA_VERSION,
  validateBufferUtf8NoBom,
  validateErrorRule,
  validateStep,
  validateBugRepair,
  validateLesson,
  validateCurriculumData,
  validateCurriculumFile,
  createReferenceFixture,
  runSelfTest
};

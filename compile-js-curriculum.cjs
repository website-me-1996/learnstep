/**
 * compile-js-curriculum.cjs
 *
 * Compiles the 23 modular JavaScript skill chunks into canonical js-lessons.json.
 * Validates sequential order, total count (119), legacyId (js:0..js:118),
 * writes UTF-8 without BOM, and runs strict schema verification.
 */

const fs = require("node:fs");
const path = require("node:path");
const { validateCurriculumFile } = require("./validate-curriculum-json.cjs");

const SKILL_FILES = [
  "skill_01_first_commands.json",
  "skill_02_variables_naming.json",
  "skill_03_values_arithmetic.json",
  "skill_04_conditions_branching.json",
  "skill_05_loops_iteration.json",
  "skill_06_strings_templates.json",
  "skill_07_numbers_conversion.json",
  "skill_08_functions_invocation.json",
  "skill_09_parameters_returns.json",
  "skill_10_objects_properties.json",
  "skill_11_scope_closures.json",
  "skill_12_dates_times.json",
  "skill_13_arrays_manipulation.json",
  "skill_14_sets_maps.json",
  "skill_15_iterators_generators.json",
  "skill_16_math_regex.json",
  "skill_17_types_destructuring.json",
  "skill_18_errors_debugging.json",
  "skill_19_projects_versions.json",
  "skill_20_dom_events.json",
  "skill_21_browser_apis.json",
  "skill_22_advanced_objects_async.json",
  "skill_23_advanced_web_tools.json"
];

const JS_CHUNKS_DIR = path.resolve(__dirname, "curriculum", "js");

function compile() {
  console.log("================================================================================");
  console.log("        Compiling JavaScript Curriculum (119 Lessons across 23 Skills)          ");
  console.log("================================================================================");

  const allLessons = [];

  for (let i = 0; i < SKILL_FILES.length; i++) {
    const fileName = SKILL_FILES[i];
    const filePath = path.join(JS_CHUNKS_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing skill chunk file: ${filePath}`);
    }
    const chunkData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!Array.isArray(chunkData)) {
      throw new Error(`Skill file ${fileName} does not contain an array of lessons.`);
    }
    console.log(`Loaded Skill ${i + 1} (${fileName}): ${chunkData.length} lessons`);
    allLessons.push(...chunkData);
  }

  console.log(`\nTotal lessons aggregated: ${allLessons.length}`);
  if (allLessons.length !== 119) {
    throw new Error(`Expected exactly 119 lessons, found ${allLessons.length}`);
  }

  // Verify sequential order and legacyId
  for (let idx = 0; idx < allLessons.length; idx++) {
    const l = allLessons[idx];
    if (l.order !== idx) {
      throw new Error(`Order mismatch at index ${idx}: expected order ${idx}, got ${l.order}`);
    }
    const expectedLegacyId = `js:${idx}`;
    if (l.legacyId !== expectedLegacyId) {
      throw new Error(`LegacyId mismatch at index ${idx}: expected ${expectedLegacyId}, got ${l.legacyId}`);
    }
  }
  console.log("✔ Order 0..118 and legacyId js:0..js:118 strictly verified.");

  const rootData = {
    schemaVersion: "1.0.0",
    track: "js",
    title: "مسار برمجة واجهات الويب: JavaScript الحديثة وهياكل البيانات والتفاعل",
    description: "منهج احترافي عالي الجودة باللغة العربية يغطي أساسيات JavaScript، والمتغيرات والدوال، وهياكل البيانات، والبرمجة الوظيفية والكائنية، والتعامل مع شجرة DOM والأحداث، والبرمجة غير المتزامنة وواجهات المتصفح وفق مواصفات ECMAScript و MDN",
    totalLessons: allLessons.length,
    lessons: allLessons
  };

  const jsonString = JSON.stringify(rootData, null, 2);
  const outPath = path.resolve(__dirname, "js-lessons.json");

  // Write file explicitly as UTF-8 without BOM
  const buffer = Buffer.from(jsonString, "utf8");
  fs.writeFileSync(outPath, buffer);
  console.log(`✔ Serialized ${buffer.length} bytes to ${outPath} (UTF-8 without BOM)`);

  const publicPath = path.resolve(__dirname, "public", "js-lessons.json");
  fs.writeFileSync(publicPath, buffer);
  console.log(`✔ Synchronized to public directory: ${publicPath}`);

  // Validate using canonical validator
  console.log("\nRunning strict canonical validator on generated file...");
  const validation = validateCurriculumFile(outPath);
  if (!validation.valid) {
    console.error("✖ Validation failed with errors:");
    validation.errors.forEach((err) => console.error("  - " + err));
    process.exit(1);
  }

  console.log(`✔ SUCCESS: ${outPath} passed canonical validation! ${validation.lessonCount} lessons verified.`);
  console.log("================================================================================");
  return { outPath, count: allLessons.length };
}

if (require.main === module) {
  compile();
}

module.exports = { compile, SKILL_FILES, JS_CHUNKS_DIR };

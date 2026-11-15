/**
 * compile-database-curriculum.cjs
 *
 * Builds the connected Database/Product curriculum from the authored blueprint.
 * The generated JSON remains the runtime artifact consumed by app.js.
 */

const fs = require("node:fs");
const path = require("node:path");
const { validateCurriculumFile } = require("./validate-curriculum-json.cjs");
const { buildCurriculum, modules } = require("./curriculum/database/blueprint.cjs");

function compile() {
  console.log("================================================================================");
  console.log("       Compiling Database/Product Curriculum from the authored blueprint        ");
  console.log("================================================================================");

  const rootData = buildCurriculum();
  const allLessons = rootData.lessons;
  console.log(`\nTotal lessons generated: ${allLessons.length} across ${modules.length} stages`);
  allLessons.forEach((lesson, index) => {
    if (lesson.order !== index || lesson.legacyId !== `database:${index}`) {
      throw new Error(`Lesson identity mismatch at index ${index}`);
    }
  });
  console.log(`✔ order 0..${allLessons.length - 1} and legacyId database:0..database:${allLessons.length - 1} verified.`);

  const jsonString = JSON.stringify(rootData, null, 2);
  const outPath = path.resolve(__dirname, "database-lessons.json");

  // Write file explicitly as UTF-8 without BOM
  const buffer = Buffer.from(jsonString, "utf8");
  fs.writeFileSync(outPath, buffer);
  console.log(`✔ Serialized ${buffer.length} bytes to ${outPath} (UTF-8 without BOM)`);

  const publicDir = path.resolve(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPath = path.resolve(publicDir, "database-lessons.json");
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

module.exports = { compile, modules };

/**
 * curriculum/html/compile-html-curriculum.cjs
 *
 * Compiles the 10 modular HTML skill chunks into canonical html-lessons.json.
 * Validates sequential order, total count (54), and runs strict schema verification.
 */

const fs = require("node:fs");
const path = require("node:path");
const { validateCurriculumFile } = require("../../validate-curriculum-json.cjs");

const SKILL_FILES = [
  "skill_01_page_structure.json",
  "skill_02_headings_texts.json",
  "skill_03_formatting_colors.json",
  "skill_04_links_images.json",
  "skill_05_tables_sections.json",
  "skill_06_identifiers_interactions.json",
  "skill_07_site_preparation.json",
  "skill_08_entities_encodings.json",
  "skill_09_forms_inputs.json",
  "skill_10_graphics_media.json"
];

function compile() {
  console.log("================================================================================");
  console.log("            Compiling HTML Curriculum (54 Lessons across 10 Skills)             ");
  console.log("================================================================================");

  const allLessons = [];

  for (let i = 0; i < SKILL_FILES.length; i++) {
    const fileName = SKILL_FILES[i];
    const filePath = path.join(__dirname, fileName);
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
  if (allLessons.length !== 54) {
    throw new Error(`Expected exactly 54 lessons, found ${allLessons.length}`);
  }

  // Verify sequential order
  for (let idx = 0; idx < allLessons.length; idx++) {
    const l = allLessons[idx];
    if (l.order !== idx) {
      throw new Error(`Order mismatch at index ${idx}: expected order ${idx}, got ${l.order}`);
    }
    const expectedLegacyId = `html:${idx}`;
    if (l.legacyId !== expectedLegacyId) {
      throw new Error(`LegacyId mismatch at index ${idx}: expected ${expectedLegacyId}, got ${l.legacyId}`);
    }
  }
  console.log("✔ Order 0..53 and legacyId html:0..html:53 strictly verified.");

  const rootData = {
    schemaVersion: "1.0.0",
    track: "html",
    title: "مسار تطوير واجهات الويب القياسية: HTML",
    description: "منهج احترافي عالي الجودة باللغة العربية يغطي معايير الويب القياسية وبناء واجهات المستخدم وفق مواصفات WHATWG و MDN",
    totalLessons: allLessons.length,
    lessons: allLessons
  };

  const jsonString = JSON.stringify(rootData, null, 2);
  const outPath = path.resolve(__dirname, "..", "..", "html-lessons.json");

  // Write file explicitly as UTF-8 without BOM
  const buffer = Buffer.from(jsonString, "utf8");
  fs.writeFileSync(outPath, buffer);
  console.log(`✔ Serialized ${buffer.length} bytes to ${outPath} (UTF-8 without BOM)`);

  const publicPath = path.resolve(__dirname, "..", "..", "public", "html-lessons.json");
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
}

if (require.main === module) {
  compile();
}

module.exports = { compile };

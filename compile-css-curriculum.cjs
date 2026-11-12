/**
 * compile-css-curriculum.cjs
 *
 * Compiles the 23 modular CSS skill chunks into canonical css-lessons.json.
 * Validates sequential order, total count (94), legacyId (css:0..css:93),
 * writes UTF-8 without BOM, and runs strict schema verification.
 */

const fs = require("node:fs");
const path = require("node:path");
const { validateCurriculumFile } = require("./validate-curriculum-json.cjs");

const SKILL_FILES = [
  "skill_01_selectors_rules.json",
  "skill_02_linking_organization.json",
  "skill_03_colors_backgrounds_borders.json",
  "skill_04_spacing_box_dimensions.json",
  "skill_05_text_typography.json",
  "skill_06_links_lists_tables.json",
  "skill_07_display_positioning.json",
  "skill_08_stacking_overflow_float.json",
  "skill_09_alignment_combinators.json",
  "skill_10_pseudo_classes_elements.json",
  "skill_11_dropdowns_image_galleries.json",
  "skill_12_forms_counters_units.json",
  "skill_13_specificity_important_math.json",
  "skill_14_accessibility_page_layout.json",
  "skill_15_advanced_colors_gradients.json",
  "skill_16_shadows_transforms_fonts.json",
  "skill_17_transitions_animations_tooltips.json",
  "skill_18_image_effects_fit_masking.json",
  "skill_19_buttons_pagination_ui.json",
  "skill_20_variables_custom_properties.json",
  "skill_21_flexbox_layout.json",
  "skill_22_grid_layout.json",
  "skill_23_responsive_design_media_queries.json"
];

const CSS_CHUNKS_DIR = path.resolve(__dirname, "curriculum", "css");

function compile() {
  console.log("================================================================================");
  console.log("            Compiling CSS Curriculum (94 Lessons across 23 Skills)              ");
  console.log("================================================================================");

  const allLessons = [];

  for (let i = 0; i < SKILL_FILES.length; i++) {
    const fileName = SKILL_FILES[i];
    const filePath = path.join(CSS_CHUNKS_DIR, fileName);
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
  if (allLessons.length !== 94) {
    throw new Error(`Expected exactly 94 lessons, found ${allLessons.length}`);
  }

  // Verify sequential order and legacyId
  for (let idx = 0; idx < allLessons.length; idx++) {
    const l = allLessons[idx];
    if (l.order !== idx) {
      throw new Error(`Order mismatch at index ${idx}: expected order ${idx}, got ${l.order}`);
    }
    const expectedLegacyId = `css:${idx}`;
    if (l.legacyId !== expectedLegacyId) {
      throw new Error(`LegacyId mismatch at index ${idx}: expected ${expectedLegacyId}, got ${l.legacyId}`);
    }
  }
  console.log("✔ Order 0..93 and legacyId css:0..css:93 strictly verified.");

  const rootData = {
    schemaVersion: "1.0.0",
    track: "css",
    title: "مسار تنسيق وتصميم واجهات الويب: CSS الحديث وأنظمة التخطيط",
    description: "منهج احترافي عالي الجودة باللغة العربية يغطي تنسيقات CSS3، ومحركات العرض، ونماذج الصندوق والتموضع، وتقنيات Flexbox و Grid، والاستجابة للشاشات، والمتغيرات والحركات وفق مواصفات W3C و MDN",
    totalLessons: allLessons.length,
    lessons: allLessons
  };

  const jsonString = JSON.stringify(rootData, null, 2);
  const outPath = path.resolve(__dirname, "css-lessons.json");

  // Write file explicitly as UTF-8 without BOM
  const buffer = Buffer.from(jsonString, "utf8");
  fs.writeFileSync(outPath, buffer);
  console.log(`✔ Serialized ${buffer.length} bytes to ${outPath} (UTF-8 without BOM)`);

  const publicPath = path.resolve(__dirname, "public", "css-lessons.json");
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

module.exports = { compile, SKILL_FILES, CSS_CHUNKS_DIR };

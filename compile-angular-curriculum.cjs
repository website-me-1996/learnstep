/**
 * compile-angular-curriculum.cjs
 *
 * Compiles the 106 Angular lessons into modular skill chunks in curriculum/angular/
 * and generates the canonical angular-lessons.json at project root.
 * Validates sequential order (0..105), unique IDs, UTF-8 without BOM,
 * and runs strict canonical schema verification.
 */

const fs = require("node:fs");
const path = require("node:path");
const {
  RAW_COURSE,
  RAW_LESSONS,
  STARTER_FILES,
  MODULES,
  transformToCanonicalLesson
} = require("./curriculum/angular/builder_helper.cjs");
const { validateCurriculumFile } = require("./validate-curriculum-json.cjs");

const ANGULAR_CHUNKS_DIR = path.resolve(__dirname, "curriculum", "angular");

const SKILL_CHUNK_DEFINITIONS = [
  { file: "skill_01_typescript_foundation.json", start: 0, end: 9 },
  { file: "skill_02_classic_angular_core.json", start: 10, end: 22 },
  { file: "skill_03_standalone_control_flow.json", start: 23, end: 29 },
  { file: "skill_04_signals_reactivity.json", start: 30, end: 37 },
  { file: "skill_05_modern_di_http.json", start: 38, end: 44 },
  { file: "skill_06_routing_typed_forms.json", start: 45, end: 50 },
  { file: "skill_07_capstone_cinema_app.json", start: 51, end: 59 },
  { file: "skill_08_core_fundamentals.json", start: 60, end: 64 },
  { file: "skill_09_data_binding_interaction.json", start: 65, end: 69 },
  { file: "skill_10_signals_state_management.json", start: 70, end: 73 },
  { file: "skill_11_modern_template_control.json", start: 74, end: 78 },
  { file: "skill_12_reactive_forms_input.json", start: 79, end: 82 },
  { file: "skill_13_component_architecture.json", start: 83, end: 86 },
  { file: "skill_14_services_di_architecture.json", start: 87, end: 89 },
  { file: "skill_15_routing_navigation_pages.json", start: 90, end: 92 },
  { file: "skill_16_network_data_fetching.json", start: 93, end: 96 },
  { file: "skill_17_full_cinema_project.json", start: 97, end: 101 },
  { file: "skill_18_quality_testing_deployment.json", start: 102, end: 104 },
  { file: "skill_19_final_capstone_review.json", start: 105, end: 105 }
];

function compile() {
  console.log("================================================================================");
  console.log("        Compiling Angular Curriculum (106 Lessons across 19 Skills)             ");
  console.log("================================================================================");

  if (!fs.existsSync(ANGULAR_CHUNKS_DIR)) {
    fs.mkdirSync(ANGULAR_CHUNKS_DIR, { recursive: true });
  }

  // 1. Transform all 106 raw lessons to canonical lessons
  const allCanonicalLessons = RAW_LESSONS.map((raw, idx) => transformToCanonicalLesson(raw, idx));

  console.log(`Transformed ${allCanonicalLessons.length} lessons into canonical schema.`);

  // 2. Write out the 19 modular skill chunk files
  SKILL_CHUNK_DEFINITIONS.forEach((def, sIdx) => {
    const chunkLessons = allCanonicalLessons.slice(def.start, def.end + 1);
    const chunkPath = path.join(ANGULAR_CHUNKS_DIR, def.file);
    const chunkJson = JSON.stringify(chunkLessons, null, 2);
    fs.writeFileSync(chunkPath, Buffer.from(chunkJson, "utf8"));
    console.log(`Wrote Skill ${sIdx + 1} (${def.file}): ${chunkLessons.length} lessons (indices ${def.start}..${def.end})`);
  });

  // 3. Verify total lessons count and order
  if (allCanonicalLessons.length !== 106) {
    throw new Error(`Expected exactly 106 lessons, found ${allCanonicalLessons.length}`);
  }

  for (let i = 0; i < allCanonicalLessons.length; i++) {
    const l = allCanonicalLessons[i];
    if (l.order !== i) {
      throw new Error(`Order mismatch at index ${i}: expected ${i}, got ${l.order}`);
    }
  }
  console.log("✔ Order 0..105 strictly verified.");

  // 4. Construct root curriculum structure
  const rootData = {
    schemaVersion: "1.0.0",
    track: "angular",
    title: "مسار تطوير تطبيقات الويب الحديثة: Angular 22 و TypeScript",
    subtitle: RAW_COURSE.subtitle || "تعلم إطار عمل Angular خطوة بخطوة بالمعاينة الحية، وابنِ تطبيق حجز سينما متكامل مع Signals.",
    description: "منهج احترافي شامل باللغة العربية يغطي أساسيات TypeScript، والمعمارية الكلاسيكية، والمكونات المستقلة Standalone، ومحرك التفاعلية Signals، وحقن التبعيات DI و HttpClient، والتوجيه والنماذج، ومشروع سينما متكامل وفق مواصفات Angular 22 الرسمية.",
    version: "22",
    totalLessons: allCanonicalLessons.length,
    modules: MODULES,
    starterFiles: STARTER_FILES,
    lessons: allCanonicalLessons
  };

  const jsonString = JSON.stringify(rootData, null, 2);
  const outPath = path.resolve(__dirname, "angular-lessons.json");

  // Write file explicitly as UTF-8 without BOM
  const buffer = Buffer.from(jsonString, "utf8");
  fs.writeFileSync(outPath, buffer);
  console.log(`✔ Serialized ${buffer.length} bytes to ${outPath} (UTF-8 without BOM)`);

  const publicPath = path.resolve(__dirname, "public", "angular-lessons.json");
  fs.writeFileSync(publicPath, buffer);
  console.log(`✔ Synchronized to public directory: ${publicPath}`);

  // 5. Validate using canonical validator
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

module.exports = {
  compile,
  SKILL_CHUNK_DEFINITIONS
};

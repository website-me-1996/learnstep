const fs = require('node:fs');
const path = require('node:path');
const units = [
  ['unit_01_first_programs.json', require('./author-unit-01.cjs').data],
  ['unit_02_booleans_decisions.json', require('./author-unit-02.cjs').data],
  ['unit_03_compound_decisions.json', require('./author-unit-03.cjs').data],
  ['unit_04_numeric_types_text.json', require('./author-unit-04.cjs').data],
  ['unit_05_console_input_validation.json', require('./author-unit-05.cjs').data],
  ['unit_06_loop_foundations.json', require('./author-unit-06.cjs').data],
  ['unit_07_loop_control.json', require('./author-unit-07.cjs').data],
  ['unit_08_functions.json', require('./author-unit-08.cjs').data],
  ['unit_09_arrays_indexing.json', require('./author-unit-09.cjs').data],
  ['unit_10_objects_references.json', require('./author-unit-10.cjs').data],
  ['unit_11_manual_structures.json', require('./author-unit-11.cjs').data],
  ['unit_12_dotnet_collections.json', require('./author-unit-12.cjs').data],
  ['unit_13_search_recursion.json', require('./author-unit-13.cjs').data],
  ['unit_14_sorting_cost.json', require('./author-unit-14.cjs').data]
];
const lessons = units.flatMap(([, unit]) => unit.lessons);
const course = {
  schemaVersion: '1.0.0',
  track: 'csharp',
  title: 'تأسيس C# خطوة بخطوة',
  description: 'من أول برنامج وقيمه إلى الحساب والشروط والمدخلات والحلقات والدوال والكائنات وهياكل البيانات والبحث والترتيب.',
  totalLessons: lessons.length,
  runtime: 'csharp-foundations-subset-v11',
  units: units.map(([, unit], order) => ({ id: unit.lessons[0].unitId, title: unit.title, order, lessonIds: unit.lessons.map(lesson => lesson.id) })),
  lessons
};
const root = path.resolve(__dirname, '../..');
const write = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
for (const [file, unit] of units) write(path.join(__dirname, file), unit);
fs.mkdirSync(path.join(root, 'public'), { recursive: true });
for (const file of ['csharp-lessons.json', 'public/csharp-lessons.json']) write(path.join(root, file), course);
console.log(`Wrote ${course.totalLessons} C# lessons, ${units.length} units, ${lessons.reduce((n, lesson) => n + lesson.steps.length, 0)} steps.`);

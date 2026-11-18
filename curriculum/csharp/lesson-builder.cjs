// Shared eight-step lesson structure. All visible content is original Arabic.
function challenge(config, solution) {
  const result = {};
  for (const key of ["output", "declared", "printed", "updated", "values", "operation", "operationIn", "methods", "minPrints", "cases", "read", "branching", "elseRequired", "elseIfRequired", "conditionReads", "stdin", "loop", "calls", "indexAccess", "fieldAccess"]) if (config[key] !== undefined) result[key] = config[key];
  if (config.declared) result.types = Object.fromEntries([...solution.matchAll(/\b((?:int|double|decimal|string\??|bool|char)(?:\[,?\])?)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/g)].filter(m => config.declared.includes(m[2])).map(m => [m[2], m[1]]));
  if (config.types) result.types = {...result.types, ...config.types};
  return result;
}
function makeLesson(c, index, previousId, unitId) {
  const id = "csharp-" + String(index + 1).padStart(2, "0") + "-" + c.slug;
  const hints = (attention, rule, help, solution) => [attention, "القاعدة: " + rule + " هل حددت الجزء الذي تحتاج تغييره؟", help, "كشف الحل:\n" + solution];
  const practical = (stepId, type, title, config, solution, starterCode) => ({
    id: stepId, type, title, objective: config.task, instruction: config.task,
    benefit: stepId === "transfer" ? "صنعت تطبيقًا جديدًا باستخدام فكرة الدرس، وسنحفظه مع تقدمك." : "شاهدت أثر قرارك في القيم والمخرجات بدل تخمين النتيجة.",
    starterCode, solution, challenge: challenge(config, solution), errorRules: [],
    hints: hints(config.attention || c.build.attention, c.build.rule, config.help || c.build.help, solution),
    ...(config.stdin !== undefined && { stdin: config.starterStdin ?? config.stdin })
  });
  const steps = [
    { id: "idea", type: "observe", title: "المشهد قبل الكود", objective: c.scene, instruction: "يا كمبيوتر، " + c.scene, benefit: c.why, errorRules: [], hints: hints(c.build.attention, c.build.rule, c.build.help, c.code) },
    { id: "trace", type: "observe", title: "شاهد أمرًا واحدًا كل مرة", objective: "تتبع أثر كل أمر في القيم والمخرجات.", instruction: "يا كمبيوتر، نفّذ أمرًا واحدًا في كل ضغطة. تابع السطر الحالي والقيم والمخرجات حتى نهاية المثال.", explanation: c.concept, code: c.code, benefit: c.mechanics, errorRules: [], hints: hints(c.build.attention, c.build.rule, c.build.help, c.code) },
    practical("build", "build", "ابنِ المثال بيدك", c.build, c.code, ""),
    practical("edit", "edit", "غيّر شيئًا واحدًا", c.edit, c.edit.solution, null),
    practical("experiment", "experiment", "تجربتك أنت", c.experiment, c.experiment.solution, null),
    { id: "diagnose", type: "quiz", title: "اكتشف سبب الخطأ", objective: c.bug.question, instruction: "يا كمبيوتر، اعرض المثال الذي يحتاج إصلاحًا. حدّد السبب قبل تغيير الكود.", question: c.bug.question, options: c.bug.options, correctOptionIndex: c.bug.correct, code: c.bug.broken, explanation: "قد يكون الكود صالحًا لكن نتيجته لا تحقق الهدف. قارن المطلوب بما يحدث.", benefit: c.bug.explanation, errorRules: [], hints: hints(c.build.attention, c.build.rule, "قارن الناتج المطلوب بسطر الكود المرتبط به.", c.bug.fixed) },
    practical("repair", "repair", "أصلح وشاهد الفرق", { ...c.bug, task: "يا كمبيوتر، أصلح المثال وفق السبب الذي حددته. " + c.bug.explanation }, c.bug.fixed, c.bug.broken),
    practical("transfer", "build", "طبّق واحفظ لبنتك", c.transfer, c.transfer.solution, "")
  ];
  steps[4].challenge.differentOutput = true;
  if (c.build.stdin !== undefined) steps[1].stdin = c.build.stdin;
  if (c.bug.stdin !== undefined) steps[5].stdin = c.bug.starterStdin ?? c.bug.stdin;
  return {
    id, legacyId: "csharp:" + index, title: c.title, skill: c.skill || "أول برنامج وقيمه", order: index, unitId,
    revision: 1, concept: c.concept, whyUse: c.why, browserMechanics: c.mechanics, documentationUrl: c.reference,
    sourcesReviewedAt: c.sourcesReviewedAt || "2026-11-17", code: c.code, breakdown: c.breakdown, steps,
    bugRepair: { brokenCode: c.bug.broken, fixedCode: c.bug.fixed, question: c.bug.question, explanation: c.bug.explanation, options: c.bug.options, correctOptionIndex: c.bug.correct },
    prerequisites: previousId ? [previousId] : [],
    learningOutcomes: [c.build.task, c.transfer.task],
    commonMisconceptions: [c.bug.explanation],
    acceptanceCriteria: ["ينفذ المثال بالتتبع خطوة خطوة", "يبني حلًا يحقق الناتج ويستخدم المفهوم المطلوب", "يصلح الخطأ ويطبق في موقف جديد"],
    projectContext: c.projectContext || "بطاقة حجز صغيرة",
    ...(c.sceneVisual ? { sceneVisual: c.sceneVisual } : {})
  };
}

function makeUnit({ id, title, description, previous, lessons, skill, runtime }) {
  const start = previous.lessons.at(-1);
  let previousId = start.id;
  return {
    schemaVersion: '1.0.0', track: 'csharp', title, description, totalLessons: lessons.length, runtime,
    lessons: lessons.map((spec, index) => {
      const lesson = makeLesson({ ...spec, skill, sourcesReviewedAt: '2026-11-18' }, start.order + index + 1, previousId, id);
      previousId = lesson.id;
      return lesson;
    })
  };
}

const outputLines = values => values.map(value => String(value) + "\n").join("");

function exercise(program, examples, checks) {
  const cases = examples.map(([inputs, output]) => ({inputs, output:outputLines(output)}));
  return (inputs, output, task, hints = {}) => ({
    ...checks, solution:program(inputs), output:outputLines(output), task:"يا كمبيوتر، " + task, cases, ...hints
  });
}

function repair(config, broken, question, options, explanation, correct = 0) {
  return { ...config, broken, fixed:config.solution, question, options, explanation, correct };
}

module.exports = { makeLesson, makeUnit, exercise, repair };

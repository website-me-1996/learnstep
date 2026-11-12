/**
 * curriculum/js/builder_helper.cjs
 *
 * Helper to construct canonical, schema-compliant, dual-compatible JavaScript lessons.
 * Ensures:
 *  - 4-tier progressive hints with attention safeguard (Tier 1),
 *  - Conceptual rule with Arabic guiding question ending with '؟' (Tier 2),
 *  - Actionable guidance directing student directly to step target (Tier 3),
 *  - Exact solution reveal matching step.to / expectedLine (Tier 4),
 *  - Realistic diversification of bugRepair.correctOptionIndex across lessons (order % 4),
 *  - 100% dual-compatibility with buildCoursePracticeSteps in app.js.
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { validateLesson } = require("../../validate-curriculum-json.cjs");
const { JS_RULES } = require("./rules_catalog.cjs");

// Load baseline LESSONS_DATA and app.js helpers
const lessonsDataSrc = fs.readFileSync(path.join(__dirname, "..", "..", "lessons-data.js"), "utf8");
const appSrc = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(lessonsDataSrc, ctx);

function sourceBetween(src, startStr, endStr) {
  const i = src.indexOf(startStr);
  const j = src.indexOf(endStr, i);
  if (i < 0 || j < 0) throw new Error("Missing fragment: " + startStr);
  return src.slice(i, j);
}

vm.runInContext(sourceBetween(appSrc, "  function coursePracticeAlternates(key, spec) {", "  function coursePracticeStepFor(model) {"), ctx);

const JS_TOPICS = ctx.window.LESSONS_DATA.js;
const JS_SKILLS = ctx.window.LESSONS_DATA.skills.js;
const H = ctx.window.LESSONS_DATA.courseHelpers;
const REFERENCES = (ctx.window.LESSONS_DATA.references && ctx.window.LESSONS_DATA.references.js) || {};

/**
 * Retrieves the baseline specification and computed alternates for a JS lesson index.
 */
function getBaselineSpec(topic, index) {
  const spec = H.jsLessonSpec(topic, index);
  const alternates = ctx.coursePracticeAlternates("js", spec) || [];
  return { spec, alternates };
}

/**
 * Generates an Arabic guiding question ending with '؟' based on step context.
 */
function generateJsGuidingQuestion(ruleText, taskText, to, from) {
  if (ruleText && ruleText.includes("؟")) return "";
  const target = (to || "").trim();

  if (/console\.log/i.test(target)) {
    return "هل تأكدت من استدعاء دالة console.log بالأقواس الدائرية الصحيحة لعرض المخرجات؟";
  }
  if (/const|let|var/i.test(target)) {
    return "هل اخترت الكلمة المفتاحية المناسبة للمتغير وأسندت إليه القيمة المحددة بدقة؟";
  }
  if (/===|!==/i.test(target)) {
    return "هل استخدمت علامة المقارنة الصارمة الثلاثية === لمقارنة القيمة ونوع البيانات معاً؟";
  }
  if (/function|=>/i.test(target)) {
    return "هل تحققت من صياغة إعلان الدالة وتمرير المعاملات المطلوبة بين القوسين؟";
  }
  if (/return\b/i.test(target)) {
    return "هل أعدت القيمة الناتجة باستخدام الكلمة المفتاحية return قبل إغلاق كتلة الدالة؟";
  }
  if (/if\s*\(/i.test(target)) {
    return "هل وضعت الشرط المنطقي داخل قوسين دائريين () دون وضع فاصلة منقوطة بعدهما مباشرة؟";
  }
  if (/for\s*\(|while\s*\(/i.test(target)) {
    return "هل ضبطت شرط استمرار الحلقة التكرارية وتحديث العداد لضمان عدم الدخول في حلقة لا نهائية؟";
  }
  if (/\[.*\]/i.test(target)) {
    return "هل استخدمت الأقواس المربعة [ ] للمصفوفة وفصلت بين العناصر بفواصل عادية؟";
  }
  if (/\{.*\}/i.test(target)) {
    return "هل حددت المفتاح والقيمة مفصولين بنقطتين رأسيتين : داخل كائن JavaScript؟";
  }
  if (/\.length\b/i.test(target)) {
    return "هل تذكرت أن خاصية length هي خاصية وليست دالة فلا تلحقها بأقواس دائرية؟";
  }
  if (/async|await|Promise/i.test(target)) {
    return "هل وضعت الكلمة المفتاحية async قبل الدالة لتتمكن من استخدام await بداخلها؟";
  }
  if (/document\.querySelector|getElementById/i.test(target)) {
    return "هل تحققت من كتابة محدد العنصر بدقة وتطابقه مع معرف أو فئة العنصر في شجرة DOM؟";
  }
  if (/addEventListener/i.test(target)) {
    return "هل مررت اسم الحدث كنص مثل 'click' والدالة المعالجة كمعامل ثانٍ دون استدعائها فوراً؟";
  }
  return "هل راجعت كتابة الأوامر البرمجية وتأكدت من دقة القيم والرموز ومطابقتها للمطلوب؟";
}

/**
 * Creates a fully validated canonical JS lesson object.
 */
function createLesson(config) {
  const index = config.order;
  const legacyTopic = JS_TOPICS[index];
  if (!legacyTopic) {
    throw new Error(`Topic at index ${index} not found in LESSONS_DATA.js`);
  }

  const { spec, alternates } = getBaselineSpec(legacyTopic, index);
  const code = config.code || spec.code;

  // Breakdown: array of strings
  let breakdown = config.breakdown;
  if (!breakdown || !Array.isArray(breakdown) || breakdown.length === 0) {
    if (spec.trace) {
      breakdown = spec.trace.split(/[|　]+/).map(s => s.trim()).filter(Boolean).map(item => {
        const parts = item.split(/⟶|->/).map(p => p.trim());
        if (parts.length === 2) {
          return `${parts[0]}: ${parts[1]}`;
        }
        return item;
      });
    } else {
      breakdown = [
        "الإعلان عن البيانات: حجز مساحة في الذاكرة لتخزين القيمة.",
        "تنفيذ العملية: قراءة المتغيرات وتطبيق المنطق الحسابي أو الشرطي.",
        "إظهار النتيجة: تحديث واجهة المستخدم أو طباعة المخرج في وحدة التحكم."
      ];
    }
  }

  // Derive default 3 sequential steps from baseline spec & alternates
  const step1From = spec.from;
  const step1To = spec.to;
  const step2From = spec.to;
  const step2To = (alternates[0] !== undefined && alternates[0] !== step2From) ? alternates[0] : (step2From + " ");
  const step3From = step2To;
  const step3To = (alternates[1] !== undefined && alternates[1] !== step3From) ? alternates[1] : (step3From + " ");

  const defaultStepDefs = [
    {
      title: "تطبيق التعديل الأساسي",
      objective: `تغيير القيمة إلى ${step1To} وملاحظة سلوك البرنامج`,
      from: step1From,
      to: step1To,
      task: spec.task || `غيّر القيمة ${step1From} إلى ${step1To} ثم شغّل الكود لتشاهد النتيجة.`,
      explanation: spec.concept || `تنفيذ التغيير يوجه محرك JavaScript لمعالجة القيمة الجديدة في الذاكرة.`
    },
    {
      title: "اختبار احتمال بديل",
      objective: `تجربة القيمة البديلة ${step2To} واختبار النتيجة`,
      from: step2From,
      to: step2To,
      task: `غيّر القيمة إلى ${step2To} وافحص المخرجات للتأكد من تفاعل الكود مع القيم المختلفة.`,
      explanation: `اختبار قيم متنوعة يوضح كيفية عمل المنطق البرمجي مع مدخلات متعددة.`
    },
    {
      title: "تثبيت الفهم بقيمة ثالثة",
      objective: `تعيين القيمة ${step3To} والتحقق من النتيجة النهائية`,
      from: step3From,
      to: step3To,
      task: `غيّر القيمة إلى ${step3To} وشغّل البرنامج لتأكيد استيعاب المفهوم.`,
      explanation: `المقارنة بين النتائج تثبت أثر التعديل في مخرجات محرك التشغيل.`
    }
  ];

  const stepsConfig = config.stepsConfig || [];

  const steps = [0, 1, 2].map(sIdx => {
    const sc = stepsConfig[sIdx] || {};
    const def = defaultStepDefs[sIdx];

    const from = sc.from || def.from;
    const to = sc.to || def.to;
    const task = sc.task || def.task;
    const explanation = sc.explanation || def.explanation;
    const targetCode = to || sc.expectedLine || "";

    const rawHints = Array.isArray(sc.hints) ? [...sc.hints] : [];
    while (rawHints.length < 4) {
      rawHints.push("");
    }

    // Tier 1: Attention prompt (must not leak targetCode)
    let tier1 = typeof rawHints[0] === "string" ? rawHints[0].trim() : (rawHints[0] && rawHints[0].text ? rawHints[0].text.trim() : "");
    if (!tier1) {
      tier1 = `انتبه إلى موضع السطر المستهدف في كود JavaScript؛ المطلوب هو تعديل الجزء المحدد بدقة.`;
    }
    if (targetCode && targetCode.length > 5 && tier1 === targetCode) {
      tier1 = `انتبه إلى السطر الذي يحمل القيمة المستهدفة في كود البرنامج دون المساس بالأوامر الأخرى.`;
    }

    // Tier 2: Rule explanation + Guiding question ending with ؟
    let tier2 = typeof rawHints[1] === "string" ? rawHints[1].trim() : (rawHints[1] && rawHints[1].text ? rawHints[1].text.trim() : "");
    if (!tier2) {
      tier2 = `قاعدة: ينفذ محرك JavaScript الأوامر بالتسلسل المكتوب ويعتمد التعيين الدقيق للقيم.`;
    }
    if (!tier2.includes("؟")) {
      const q = generateJsGuidingQuestion(tier2, task, targetCode, from);
      if (q) {
        tier2 = tier2.replace(/[.\s]+$/, "") + ". " + q;
      }
    }

    // Tier 3: Actionable guidance containing targetCode
    let tier3 = typeof rawHints[2] === "string" ? rawHints[2].trim() : (rawHints[2] && rawHints[2].text ? rawHints[2].text.trim() : "");
    if (targetCode) {
      if (!tier3.includes(targetCode)) {
        if (/^مساعدة محددة:/i.test(tier3)) {
          tier3 = `مساعدة محددة: اكتب القيمة المطلوبة بدقة: ${targetCode}.`;
        } else {
          tier3 = `مساعدة محددة: عدّل القيمة في السطر لتصبح: ${targetCode}.`;
        }
      }
    }

    // Tier 4: Exact Solution Reveal matching targetCode
    let tier4 = typeof rawHints[3] === "string" ? rawHints[3].trim() : (rawHints[3] && rawHints[3].text ? rawHints[3].text.trim() : "");
    if (targetCode) {
      if (!tier4.includes(targetCode)) {
        tier4 = `كشف الحل: القيمة الدقيقة المطلوبة للخطوة هي: ${targetCode}`;
      }
    }

    // Select default error rules for JS
    let errorRules = sc.errorRules;
    if (!errorRules || !Array.isArray(errorRules) || errorRules.length === 0) {
      errorRules = [
        JS_RULES.consoleLogTypo,
        JS_RULES.singleEqualsInCondition,
        JS_RULES.unclosedParenthesis
      ];
    }

    return {
      id: `step-${sIdx + 1}`,
      title: sc.title || def.title,
      objective: sc.objective || def.objective,
      type: sc.type || "edit",
      instruction: task,
      benefit: sc.benefit || `فائدة ما عدّلته: توجيه محرك البرنامج لاستخدام ${targetCode} في التنفيذ.`,
      from,
      to,
      errorRules,
      hints: [tier1, tier2, tier3, tier4]
    };
  });

  // BugRepair configuration
  const br = config.bugRepair || {};
  const correctIdx = (typeof br.correctOptionIndex === "number") ? br.correctOptionIndex : (index % 4);

  const defaultOptions = [
    "تصحيح إملائي أو صياغي في اسم المتغير أو الدالة واستخدام الأقواس الصحيحة.",
    "استبدال علامة المساواة المفردة بالمقارنة الصارمة الثلاثية ===.",
    "إغلاق القوس أو علامة التنصيص المفقودة في نهاية السطر البرمجي.",
    "إسناد القيمة المناسبة للمتغير قبل محاولة قراءته في السطور التالية."
  ];

  const bugRepair = {
    brokenCode: br.brokenCode || `const res = ${spec.from};\nconsole.log(res);`,
    fixedCode: br.fixedCode || `const res = ${spec.to};\nconsole.log(res);`,
    question: br.question || (spec.quiz || `ما هو التصحيح البرمجي المناسب لجعل الكود يعمل بصورة سليمة؟`),
    explanation: br.explanation || `في JavaScript، كل رمز وكلمة مفتاحية لها دلالة محددة لدى مفسر الأوامر، والالتزام بالقواعد يضمن تفادي أخطاء وقت التشغيل.`,
    options: br.options || defaultOptions,
    correctOptionIndex: correctIdx
  };

  const idSlug = legacyTopic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const orderNum = String(index + 1).padStart(2, "0");
  const id = `js-${orderNum}-${idSlug}`;

  // Documentation URL
  let docUrl = config.documentationUrl || REFERENCES[legacyTopic];
  if (!docUrl || !docUrl.startsWith("http")) {
    docUrl = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference`;
  }

  const lesson = {
    id,
    legacyId: `js:${index}`,
    title: config.title || `${legacyTopic}: المفهوم والتطبيق البرمجي`,
    skill: config.skill || "JavaScript Core Concepts",
    order: index,
    concept: config.concept || spec.concept,
    whyUse: config.whyUse || `نحتاج هذا المفهوم في JavaScript لتنظيم البيانات والتحكم في منطق التطبيق وتوجيه سلوك البرنامج بكفاءة وسلاسة.`,
    browserMechanics: config.browserMechanics || (spec.flow ? `آلية التنفيذ: ${spec.flow}. يفسر محرك V8 الأوامر ويخزن المتغيرات في الذاكرة وينفذ العمليات في Call Stack.` : `يقوم محرك JavaScript بتحليل الكود وإنشاء سياق التنفيذ ثم معالجة الأوامر خطوة بخطوة.`),
    documentationUrl: docUrl,
    code,
    breakdown,
    steps,
    bugRepair
  };

  // Schema validation
  const validationErrors = validateLesson(lesson, index, "js");
  if (validationErrors.length > 0) {
    throw new Error(`Lesson ${index} (${id}) validation failed:\n` + validationErrors.join("\n"));
  }

  return lesson;
}

module.exports = {
  createLesson,
  JS_TOPICS,
  JS_SKILLS,
  getBaselineSpec
};

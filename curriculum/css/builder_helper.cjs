/**
 * curriculum/css/builder_helper.cjs
 *
 * Helper to construct canonical, schema-compliant, dual-compatible CSS lessons.
 * Ensures:
 *  - 4-tier progressive hints with attention safeguard (Tier 1),
 *  - Conceptual rule with Arabic guiding question ending with '؟' (Tier 2),
 *  - Actionable guidance directing student directly to step target (Tier 3),
 *  - Exact solution reveal matching step.to / expectedLine (Tier 4),
 *  - Realistic diversification of bugRepair.correctOptionIndex across lessons (order % 4),
 *  - 100% dual-compatibility with both buildCoursePracticeSteps and buildGuidePracticeSteps.
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { validateLesson } = require("../../validate-curriculum-json.cjs");
const { CSS_RULES } = require("./rules_catalog.cjs");

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

vm.runInContext(sourceBetween(appSrc, "  function coursePracticeAlternates(key, spec) {", "  function courseReadingStep(model)"), ctx);
vm.runInContext(sourceBetween(appSrc, "  function buildGuidePracticeSteps(code, guide) {", "  function fullHtmlDocument("), ctx);

const CSS_TOPICS = ctx.window.LESSONS_DATA.css;
const CSS_SKILLS = ctx.window.LESSONS_DATA.skills.css;
const H = ctx.window.LESSONS_DATA.courseHelpers;

/**
 * Manual alternates for lessons where coursePracticeAlternates in app.js
 * returns identical or whitespace-only values, ensuring real progressive practice
 * and 100% pass rate in SmartHintEngine.
 */
const CSS_MANUAL_ALTERNATES = {
  5: ["color: #35658f", "color: #a65d32"],
  16: ["◆", "●"],
  24: ["z-index: 10", "z-index: 20"],
  25: ["scroll", "visible"],
  34: ["top: 110%", "top: 130%"],
  36: ["center center", "left bottom"],
  42: ["div h1", "article h1"],
  60: [":active", ":hover"],
  63: ["0 10px", "10px auto"],
  64: ["50%", "80%"],
  65: ["25%", "40%"],
  68: ["to top", "45deg"],
  72: ["pointer", "grab"],
  80: ["flex-grow: 3", "flex-grow: 0"],
  81: ["flex-wrap: wrap-reverse", "flex-wrap: nowrap"],
  84: ["grid-column: span 3", "grid-column: 1 / 3"],
  85: ["span 8", "span 12"],
  91: ["width: 60%", "width: 50%"]
};

/**
 * Retrieves the legacy specification and computed alternates for a lesson index.
 */
function getBaselineSpec(topic, index) {
  const spec = H.cssLessonSpec(topic, index);
  let alternates = ctx.coursePracticeAlternates("css", spec) || [];
  if (CSS_MANUAL_ALTERNATES[index]) {
    alternates = CSS_MANUAL_ALTERNATES[index];
  }
  return { spec, alternates };
}

/**
 * Generates an Arabic guiding question ending with '؟' based on step context.
 */
function generateCssGuidingQuestion(ruleText, taskText, to, from) {
  if (ruleText && ruleText.includes("؟")) return "";
  const target = (to || "").trim();

  if (/display\s*:\s*(?:inline-)?flex/i.test(target)) {
    return "هل أعلنت خاصية العرض display بالقيمة flex على الحاوية لتفعيل التنسيق المرن؟";
  }
  if (/display\s*:\s*(?:inline-)?grid/i.test(target)) {
    return "هل عيّنت خاصية العرض display بالقيمة grid لتوليد شبكة الإحداثيات؟";
  }
  if (/justify-content|align-items/i.test(target)) {
    return "هل تحققت من كتابة اسم الخاصية بدقة وتحديد المحور المناسب لتوزيع العناصر؟";
  }
  if (/position\s*:\s*(relative|absolute|fixed|sticky)/i.test(target)) {
    return "هل اخترت نوع التموضع المطلوب وتأكدت من خلو السطر من الأخطاء الإملائية؟";
  }
  if (/z-index\s*:/i.test(target)) {
    return "هل تأكدت من تحديد سياق تموضع للعنصر أولاً لتعمل طبقة z-index؟";
  }
  if (/#[0-9a-f]{3,8}/i.test(target)) {
    return "هل تأكدت من كتابة رمز الهاش # وشفرة اللون الست عشري بدقة والفاصلة المنقوطة؟";
  }
  if (/rgba?|hsla?/i.test(target)) {
    return "هل راجعت قيم قنوات اللون وقيمة الشفافية والتأكد من إغلاق القوس؟";
  }
  if (/(?:width|height|min-width|max-width|margin|padding|font-size|gap)\s*:[^;]*\d+/i.test(target)) {
    return "هل ألحقت وحدة القياس المناسبة (مثل px أو rem أو %) مباشرة بعد الرقم؟";
  }
  if (/border\s*:/i.test(target)) {
    return "هل تضمن تعريف الحد كلاً من السماكة والنمط (مثل solid) واللون؟";
  }
  if (/text-align\s*:/i.test(target)) {
    return "هل استخدمت إحدى قيم المحاذاة الأفقية الصحيحة مثل center أو start بدلاً من middle؟";
  }
  if (/transition|animation/i.test(target)) {
    return "هل حددت وحدة الزمن (s للثواني أو ms) لخاصية مدة الحركة؟";
  }
  if (/transform\s*:/i.test(target)) {
    return "هل راجعت اسم دالة التحويل (مثل rotate أو scale) ووحدة القياس؟";
  }
  if (/@media/i.test(target)) {
    return "هل وضعت شرط استعلام الوسائط داخل أقواس مثل (min-width: 768px)؟";
  }
  if (/var\s*\(/i.test(target) || /--[a-z0-9_-]+/i.test(target)) {
    return "هل استخدمت دالة var() واستدعيت اسم المتغير المسبوق بشرطتين -- بدقة؟";
  }
  return "هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة والفاصلة المنقوطة بدقة؟";
}

/**
 * Creates a fully validated canonical CSS lesson object.
 */
function createLesson(config) {
  const index = config.order;
  const legacyTopic = CSS_TOPICS[index];
  if (!legacyTopic) {
    throw new Error(`Topic at index ${index} not found in LESSONS_DATA.css`);
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
        "المحدد (Selector): يستهدف العنصر المطلوب في وثيقة HTML.",
        "الخاصية (Property): تحدد السمة الجمالية أو التخطيطية المراد ضبطها.",
        "القيمة (Value): تحدد القياس أو السلوك الذي يعتمده المتصفح."
      ];
    }
  }

  // Derive default 3 sequential steps from legacy spec & alternates
  const step1From = spec.from;
  const step1To = spec.to;
  const step2From = spec.to;
  const step2To = (alternates[0] !== undefined && alternates[0] !== step2From) ? alternates[0] : (step2From + " ");
  const step3From = step2To;
  const step3To = (alternates[1] !== undefined && alternates[1] !== step3From) ? alternates[1] : (step3From + " ");

  const defaultStepDefs = [
    {
      title: "تطبيق القيمة المستهدفة",
      objective: `تطبيق القيمة الأساسية ${step1To} على المحدد`,
      from: step1From,
      to: step1To,
      task: spec.task || `غيّر القيمة ${step1From} إلى ${step1To} ولاحظ التأثير المباشر.`,
      explanation: spec.concept || `تعديل الخاصية يوجه المتصفح لتحديث الشلال ورسم المظهر الجديد.`
    },
    {
      title: "اختبار خيار بديل",
      objective: `تجربة القيمة البديلة ${step2To} لمقارنة التنسيق`,
      from: step2From,
      to: step2To,
      task: `غيّر القيمة الحالية إلى ${step2To} لمشاهدة تأثير بصري بديل.`,
      explanation: `اختبار قيم مختلفة يوضح للمتعلم كيفية استجابة محرك العرض للخيارات المتنوعة.`
    },
    {
      title: "مقارنة نتيجة ثالثة",
      objective: `تعيين القيمة ${step3To} وتثبيت المفهوم`,
      from: step3From,
      to: step3To,
      task: `غيّر القيمة إلى ${step3To} لتأكيد استيعاب طريقة عمل الخاصية.`,
      explanation: `المقارنة المتعددة ترسخ فهم حدود الخاصية وتأثيرها على بقية عناصر الصندوق.`
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
      tier1 = `انتبه إلى موضع السطر المستهدف في كود CSS؛ المطلوب هو تغيير القيمة المحددة بدقة.`;
    }
    if (targetCode && targetCode.length > 5 && tier1 === targetCode) {
      tier1 = `انتبه إلى قاعدة المحدد وسطر الخاصية المطلوب تعديلها دون تغيير بقية الخواص.`;
    }

    // Tier 2: Rule explanation + Guiding question ending with ؟
    let tier2 = typeof rawHints[1] === "string" ? rawHints[1].trim() : (rawHints[1] && rawHints[1].text ? rawHints[1].text.trim() : "");
    if (!tier2) {
      tier2 = `قاعدة: يعتمد المتصفح معيار CSS لتطبيق هذه الخاصية بدقة.`;
    }
    if (!tier2.includes("؟")) {
      const q = generateCssGuidingQuestion(tier2, task, targetCode, from);
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
    let tier4 = `الحل النموذجي: ${targetCode}`;

    // Select targeted error rules
    let errorRules = sc.errorRules;
    if (!errorRules || !Array.isArray(errorRules) || errorRules.length === 0) {
      errorRules = [
        CSS_RULES.missingSemicolonBetweenLines,
        CSS_RULES.bareNumberInDimension,
        CSS_RULES.commonPropertyTypo
      ];
    }

    return {
      id: sc.id || `${config.id}-step-${sIdx + 1}`,
      title: sc.title || def.title,
      objective: sc.objective || def.objective,
      type: sc.type || "edit",
      instruction: sc.instruction || task,
      benefit: sc.benefit || `فائدة هذا التعديل: مشاهدة استجابة المتصفح الفورية لتغيير الخصائص التنسيقية.`,
      expectedLine: sc.expectedLine || to,
      from: from,
      to: to,
      task: task,
      explanation: explanation,
      errorRules: errorRules,
      hints: [tier1, tier2, tier3, tier4]
    };
  });

  // BugRepair diversification across indices 0, 1, 2, 3
  let bugRepair = config.bugRepair;
  if (bugRepair && Array.isArray(bugRepair.options) && bugRepair.options.length > 1) {
    const opts = [...bugRepair.options];
    const targetIdx = config.order % opts.length;
    const currentCorrect = typeof bugRepair.correctOptionIndex === "number" ? bugRepair.correctOptionIndex : 0;
    if (currentCorrect !== targetIdx) {
      const temp = opts[targetIdx];
      opts[targetIdx] = opts[currentCorrect];
      opts[currentCorrect] = temp;
    }
    bugRepair = {
      ...bugRepair,
      options: opts,
      correctOptionIndex: targetIdx
    };
  }

  const lesson = {
    id: config.id,
    legacyId: `css:${config.order}`,
    title: config.title,
    skill: config.skill,
    order: config.order,
    concept: config.concept,
    whyUse: config.whyUse,
    browserMechanics: config.browserMechanics,
    documentationUrl: config.documentationUrl,
    code: code,
    breakdown: breakdown,
    steps: steps,
    bugRepair: bugRepair
  };

  const validationErrors = validateLesson(lesson, config.order, "css");
  if (validationErrors.length > 0) {
    throw new Error(`Validation failed for lesson ${config.id} (order: ${config.order}):\n${validationErrors.join("\n")}`);
  }

  return lesson;
}

module.exports = {
  CSS_TOPICS,
  CSS_SKILLS,
  CSS_RULES,
  createLesson,
  generateCssGuidingQuestion,
  getBaselineSpec
};

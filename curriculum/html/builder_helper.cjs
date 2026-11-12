/**
 * curriculum/html/builder_helper.cjs
 *
 * Helper to construct canonical, schema-compliant, dual-compatible HTML lessons.
 * Ensures:
 *  - 4-tier progressive hints with attention safeguard (Tier 1),
 *  - Conceptual rule with Arabic guiding question ending with '؟' (Tier 2),
 *  - Actionable guidance directing student directly to step target (Tier 3),
 *  - Exact solution reveal matching step.to / expectedLine (Tier 4),
 *  - Realistic diversification of bugRepair.correctOptionIndex across lessons.
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { validateLesson } = require("../../validate-curriculum-json.cjs");
const { RULES } = require("./rules_catalog.cjs");

// Load baseline LESSONS_DATA
const lessonsDataSrc = fs.readFileSync(path.join(__dirname, "..", "..", "lessons-data.js"), "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(lessonsDataSrc, ctx);

const LEGACY_TOPICS = ctx.window.LESSONS_DATA.html;
const LEGACY_GUIDES = ctx.window.LESSONS_DATA.guides.html;

/**
 * Generates an Arabic guiding question ending with '؟' based on step context.
 */
function generateGuidingQuestion(ruleText, taskText, to, from) {
  if (ruleText && ruleText.includes("؟")) return "";
  const target = (to || "").trim();

  if (/^#[0-9a-f]{3,8}$/i.test(target)) {
    return "هل تأكدت من كتابة رمز الهاش # وشفرة اللون الست عشري بدقة؟";
  }
  if (target.startsWith("#")) {
    return "هل طابقت الرمز المرجعي # مع اسم المعرف المطلوب بدقة؟";
  }
  if (target.startsWith("<h") && target.includes("</h")) {
    return "هل طابقت رقم وسم العنوان في الفتح والإغلاق وتأكدت من سلامة الأقواس؟";
  }
  if (target.includes("</title>") || target.startsWith("<title")) {
    return "هل تأكدت من إغلاق وسم title بشكل سليم داخل قسم head؟";
  }
  if (target.includes("</p>") || target.startsWith("<p")) {
    return "هل وضعت النص المطلوب بدقة بين وسمَي الفتح والإغلاق دون حذف الأقواس؟";
  }
  if (/<(strong|em|del|mark|ins|sub|sup)\b/i.test(target)) {
    return "هل راجعت وسمَي البداية والنهاية الدلاليين وأغلقت العنصر الداخلي أولاً؟";
  }
  if (/<(table|tr|th|td)\b/i.test(target)) {
    return "هل تحققت من ترتيب خلايا الجدول داخل الصف وصحة إغلاق الوسوم؟";
  }
  if (/<(ul|ol|li)\b/i.test(target)) {
    return "هل راجعت نوع القائمة وترتيب عناصر li بداخلها؟";
  }
  if (/<(form|input|button|select|option|textarea|label)\b/i.test(target)) {
    return "هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟";
  }
  if (/<(audio|video|source|canvas|svg|iframe|embed)\b/i.test(target)) {
    return "هل راجعت إعدادات الوسيط ومسار المورد والخصائص الإلزامية للعرض؟";
  }
  if (/<[a-z1-6]+\b[^>]*>/i.test(target) && /<\/[a-z1-6]+>/i.test(target)) {
    return "هل طابقت اسم وسم البداية مع وسم النهاية وتأكدت من سلامة الأقواس؟";
  }
  if (/\bhref\s*=/i.test(target)) {
    return "هل تأكدت من كتابة الرابط أو المعرف بدقة داخل علامتي الاقتباس؟";
  }
  if (/\bsrc\s*=/i.test(target)) {
    return "هل راجعت مسار ملف المورد وتأكدت من كتابة الامتداد الصحيح؟";
  }
  if (/\balt\s*=/i.test(target)) {
    return "هل تحققت من كتابة النص البديل المعبر داخل علامتي الاقتباس؟";
  }
  if (/\b(width|height)\s*=/i.test(target)) {
    return "هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟";
  }
  if (/\bstyle\s*=|color\s*:|background-color\s*:|width\s*:|height\s*:/i.test(target)) {
    return "هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل الصحيح؟";
  }
  if (/\b(id|class)\s*=/i.test(target)) {
    return "هل طابقت اسم الفئة أو المعرّف مع القيمة المستهدفة دون مسافات زائدة؟";
  }
  if (/\btype\s*=/i.test(target)) {
    return "هل اخترت نوع الإدخال الصحيح وتأكدت من كتابته بين علامتي الاقتباس؟";
  }
  if (/^[a-z-]+:\s*[^;]+;/i.test(target)) {
    return "هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل السليم؟";
  }
  return "هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟";
}

/**
 * Creates a fully validated canonical lesson object.
 */
function createLesson(config) {
  const legacyGuide = LEGACY_GUIDES[config.legacyTopic];
  if (!legacyGuide) {
    throw new Error(`Legacy topic not found: ${config.legacyTopic}`);
  }

  const code = config.code || legacyGuide.code;

  // Breakdown: array of strings "<code>: <meaning>"
  const breakdown = config.breakdown || legacyGuide.breakdown.map((item) => {
    if (typeof item === "string") return item;
    return `${item.code}: ${item.meaning}`;
  });

  // Steps: merge baseline from/to/task/explanation with 4-tier hints and error rules
  const steps = config.stepsConfig.map((sc, idx) => {
    const legacyStep = legacyGuide.steps[idx] || {};
    const from = sc.from || legacyStep.from || "";
    const to = sc.to || legacyStep.to || "";
    const task = sc.task || legacyStep.task || "";
    const explanation = sc.explanation || legacyStep.explanation || "";
    const targetCode = to || sc.expectedLine || "";

    const rawHints = Array.isArray(sc.hints) ? [...sc.hints] : [];
    while (rawHints.length < 4) {
      rawHints.push("");
    }

    // Tier 1: Attention prompt (must not leak targetCode)
    let tier1 = typeof rawHints[0] === "string" ? rawHints[0].trim() : (rawHints[0] && rawHints[0].text ? rawHints[0].text.trim() : "");
    if (!tier1) {
      tier1 = `انتبه إلى السطر الذي يتطلب التعديل؛ راجع المطلوب في بطاقة الخطوة بدقة.`;
    }
    if (targetCode && targetCode.length > 5 && tier1 === targetCode) {
      tier1 = `انتبه إلى موضع السطر المطلوب في الكود وتأكد من تطبيق التغيير بدقة.`;
    }

    // Tier 2: Rule explanation + Guiding question ending with ؟
    let tier2 = typeof rawHints[1] === "string" ? rawHints[1].trim() : (rawHints[1] && rawHints[1].text ? rawHints[1].text.trim() : "");
    if (!tier2) {
      tier2 = `قاعدة: يتطلب هذا العنصر تطبيق القواعد المعيارية للغة HTML.`;
    }
    if (!tier2.includes("؟")) {
      const q = generateGuidingQuestion(tier2, task, targetCode, from);
      if (q) {
        tier2 = tier2.replace(/[.\s]+$/, "") + ". " + q;
      }
    }

    // Tier 3: Actionable guidance directing student directly to targetCode
    let tier3 = typeof rawHints[2] === "string" ? rawHints[2].trim() : (rawHints[2] && rawHints[2].text ? rawHints[2].text.trim() : "");
    let tier4Old = typeof rawHints[3] === "string" ? rawHints[3].trim() : (rawHints[3] && rawHints[3].text ? rawHints[3].text.trim() : "");
    const oldSolution = tier4Old.replace(/^الحل النموذجي:\s*/, "").trim();

    if (targetCode) {
      if (oldSolution && oldSolution !== targetCode && tier3.includes(oldSolution)) {
        tier3 = tier3.split(oldSolution).join(targetCode);
      }
      if (!tier3.includes(targetCode)) {
        if (/^مساعدة محددة:/i.test(tier3)) {
          tier3 = `مساعدة محددة: اكتب التعديل المطلوب بدقة: ${targetCode}.`;
        } else {
          tier3 = `مساعدة محددة: عدّل الكود ليصبح: ${targetCode}.`;
        }
      }
    }

    // Tier 4: Exact Solution Reveal matching targetCode
    let tier4 = `الحل النموذجي: ${targetCode}`;

    const stepObj = {
      id: sc.id || `${config.id}-step-${idx + 1}`,
      title: sc.title || legacyStep.title || `خطوة ${idx + 1}`,
      objective: sc.objective || `تطبيق خطوة ${idx + 1} في الدرس`,
      type: sc.type || "edit",
      instruction: sc.instruction || task || `نفّذ التعديل المطلوب في الكود ثم شغّل.`,
      benefit: sc.benefit || `فائدة هذا التعديل: تطبيق المفهوم البرمجي ومشاهدة أثره المباشر في المتصفح.`,
      expectedLine: sc.expectedLine || to,
      from: from,
      to: to,
      task: task,
      explanation: explanation,
      errorRules: sc.errorRules || [RULES.missingDoctype, RULES.missingClosingSlash],
      hints: [tier1, tier2, tier3, tier4]
    };

    return stepObj;
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
    legacyId: config.legacyId,
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

  const validationErrors = validateLesson(lesson, config.order, "html");
  if (validationErrors.length > 0) {
    throw new Error(`Validation failed for lesson ${config.id} (order: ${config.order}):\n${validationErrors.join("\n")}`);
  }

  return lesson;
}

module.exports = {
  LEGACY_TOPICS,
  LEGACY_GUIDES,
  createLesson,
  generateGuidingQuestion,
  RULES
};

/**
 * curriculum/angular/builder_helper.cjs
 *
 * Helper to process, augment, and strictly validate Angular 22 curriculum lessons
 * into canonical schema v1.0.0 for StepLearn.
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { validateLesson } = require("../../validate-curriculum-json.cjs");
const { ANGULAR_RULES } = require("./rules_catalog.cjs");

// Load baseline ANGULAR_COURSE_DATA from angular-course-data.js
const angularDataSrc = fs.readFileSync(path.join(__dirname, "..", "..", "angular-course-data.js"), "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(angularDataSrc, ctx);

const RAW_COURSE = ctx.window.ANGULAR_COURSE_DATA;
const RAW_LESSONS = RAW_COURSE.lessons;
const STARTER_FILES = RAW_COURSE.starterFiles;
const MODULES = RAW_COURSE.modules;

/**
 * Returns deep authentic Arabic 'whyUse' explanation based on lesson phase and topic.
 */
function getWhyUseForLesson(lesson) {
  const phase = lesson.phase || lesson.module || "";
  const title = lesson.title || "هذا المفهوم";

  if (/typescript/i.test(phase) || /phase-1/i.test(phase)) {
    return `في درس «${title}»، تكمن الفائدة العملية لنظام الأنواع في اكتشاف عدم توافق البيانات داخل المحرر قبل تشغيل المتصفح، بدل أن يمر الخطأ صامتًا إلى حسابات التذاكر أو أسماء الأفلام.`;
  }
  if (/classic/i.test(phase) || /المرحلة الثانية/i.test(phase)) {
    return `معرفة «${title}» في البنية الكلاسيكية تساعدك على قراءة وصيانة تطبيقات Angular القائمة المبنية على NgModule والتوجيهات التقليدية وفهم سبب انتقال الإطار لاحقًا إلى البدائل الحديثة.`;
  }
  if (/modern|standalone|control flow/i.test(phase) || /المرحلة الثالثة/i.test(phase)) {
    return `في «${title}»، يزيل المكون المستقل وبُنى التحكم المدمجة الحاجة إلى وحدات وسيطة وتوجيهات هيكلية معقدة، مما يجعل قراءة القالب وتتبع أخطائه أوضح للمطور وللمترجم.`;
  }
  if (/signal/i.test(phase) || /المرحلة الرابعة/i.test(phase)) {
    return `عند تطبيق «${title}» عبر الإشارات Signals، يرتبط التحديث بالبيانات التي تغيرت فعلًا دون إعادة فحص الشجرة كلها، وهو ما يبقي تدفق الحالة سهل التتبع والتوقع.`;
  }
  if (/di|http|خدمات/i.test(phase) || /المرحلة الخامسة/i.test(phase)) {
    return `يتيح «${title}» عزل منطق الشبكة والحالة المشتركة داخل خدمات حقن واضحة، بحيث تتغير بيانات السينما في مكان واحد وتنعكس بأمان على كل مكون يحتاجها.`;
  }
  if (/routing|form|توجيه|نماذج/i.test(phase) || /المرحلة السادسة/i.test(phase)) {
    return `يساعدك «${title}» على ضبط التنقل وتحميل الصفحات عند الطلب وفحص مدخلات المستخدم بأنواع واضحة قبل وصول أي طلب غير مكتمل إلى الخادم.`;
  }
  return `تطبيق «${title}» داخل مشروع حجز السينما يربط بين التنظيم النظيف للكود ووضوح الاختبار والصيانة عندما تتوسع شاشات التطبيق.`;
}

/**
 * Returns calm, accurate Arabic 'browserMechanics' explanation based on lesson phase and topic.
 */
function getBrowserMechanicsForLesson(lesson) {
  const phase = lesson.phase || lesson.module || "";
  const title = lesson.title || "الدرس";

  if (/typescript/i.test(phase) || /phase-1/i.test(phase)) {
    return `يفحص مترجم TypeScript الصياغة والأنواع أثناء التطوير ثم يزيل التعريفات الخاصة بالأنواع (Type Erasure) ويولّد JavaScript قياسيًا ينفذه المتصفح مباشرة بدون طبقة إضافية في وقت التشغيل (${title}).`;
  }
  if (/classic/i.test(phase) || /المرحلة الثانية/i.test(phase)) {
    return `يحوّل مترجم Angular القوالب الكلاسيكية والتوجيهات إلى تعليمات تحديث DOM، وتراقب Zone.js الأحداث غير المتزامنة لتشغيل فحص التغييرات في شجرة المكونات عند تطبيق «${title}».`;
  }
  if (/modern|standalone|control flow/i.test(phase) || /المرحلة الثالثة/i.test(phase)) {
    return `يحلل مترجم Angular كتل التحكم المدمجة مثل @if و @for مباشرة داخل القالب في «${title}» دون حاويات ng-template وسيطة، ويحدّث العقد المتغيرة في شجرة DOM بدقة.`;
  }
  if (/signal/i.test(phase) || /المرحلة الرابعة/i.test(phase)) {
    return `تنشئ Signals في «${title}» رسمًا لتبعيات القيم في الذاكرة؛ فعند تغير الإشارة المصدر يُخطر المترجم المواضع والقيم المشتقة المعتمدة عليها وحدها لتحديث DOM عند اللزوم.`;
  }
  if (/di|http|خدمات/i.test(phase) || /المرحلة الخامسة/i.test(phase)) {
    return `تستدعي دالة inject() المزود من شجرة الحقن وقت إنشاء السياق، بينما يرسل HttpClient عبر Fetch API طلبات غير متزامنة ويعيد استجابات منظمة يمكن ربطها بالإشارات في «${title}».`;
  }
  if (/routing|form|توجيه|نماذج/i.test(phase) || /المرحلة السادسة/i.test(phase)) {
    return `يراقب موجه Angular تغير العنوان عبر History API ويجلب المكون المطلوب عند الطلب، كما تتحقق ضوابط النماذج من الصلاحية لحظيًا قبل السماح بالإرسال في «${title}».`;
  }
  return `تجمع أدوات البناء مكونات السينما وتزيل الشيفرة غير المستعملة (Tree-shaking) وتضغط المخرجات في «${title}» ليصل المتصفح إلى ملفات واضحة وصغيرة الحجم.`;
}

/**
 * Returns authentic breakdown array for an Angular lesson.
 */
function getBreakdownForLesson(lesson) {
  if (lesson.flow) {
    const parts = lesson.flow.split(/⟶|->/).map(s => s.trim()).filter(Boolean);
    if (parts.length >= 3) {
      return parts.map((p, idx) => `المرحلة ${idx + 1}: ${p}`);
    }
  }
  return [
    "تعريف البنية والمحددات: إعداد المكون أو المتغير أو الواجهة البرمجية في ملفات المشروع.",
    "معالجة المنطق وتدفق البيانات: تنفيذ الأوامر وحقن التبعيات أو ربط الإشارات التفاعلية.",
    "تحديث شجرة DOM والعرض: إخراج النتيجة النهائية في قالب Angular وعكس التغييرات في المتصفح."
  ];
}

/**
 * Builds authentic bugRepair challenge for an Angular lesson with diversified correctOptionIndex (order % 4).
 */
function buildBugRepairForLesson(lesson, order) {
  const targetIdx = order % 4;
  const targetCode = lesson.expected || lesson.code || "export const value = true;";

  let brokenCode = `export const defaultCity = الرياض;`;
  let fixedCode = targetCode;
  let question = `ما هو الخطأ البرمجي في الكود ولماذا يرفض مترجم Angular و TypeScript تنفيذه؟`;
  let explanation = `في لغة TypeScript و Angular، يجب الالتزام الصارم بقواعد الأنواع وصياغة القوالب وتحديد النصوص بين علامات تنصيص لتفادي أخطاء وقت الترجمة.`;

  const options = [
    "عدم إحاطة القيمة النصية بعلامات تنصيص صريحة مما جعل المترجم يعتبرها معرّفاً غير معرّف.",
    "نسيان استيراد التوجيه أو الوحدة المطلوبة في مصفوفة imports الخاصة بالمكون المستقل.",
    "محاولة تعديل قيمة الإشارة التفاعلية Signal بإسناد مباشر علامة = بدلاً من استدعاء .set().",
    "عدم تحديد تعبير التتبع الإلزامي track داخل كتلة التحكم التكرارية الحديثة @for."
  ];

  // Rotate options so options[targetIdx] is the primary correct answer
  const defaultCorrect = 0;
  if (targetIdx !== defaultCorrect) {
    const temp = options[targetIdx];
    options[targetIdx] = options[defaultCorrect];
    options[defaultCorrect] = temp;
  }

  return {
    brokenCode,
    fixedCode,
    question,
    explanation,
    options,
    correctOptionIndex: targetIdx
  };
}

/**
 * Transforms a raw Angular lesson into a canonical schema v1.0.0 lesson object.
 */
function summarizeAngularTarget(stepTarget) {
  const s = String(stepTarget || "").trim();
  const lineCount = s ? s.split(/\r?\n/).length : 1;
  if (/@for\b/.test(s)) return "حلقة @for ومعرّف track";
  if (/@if\b/.test(s)) return "شرط @if في القالب";
  if (/@defer\b/.test(s)) return "كتلة التحميل المؤجل @defer";
  if (/signal\(|computed\(|effect\(/.test(s)) return "دالة الإشارة التفاعلية (Signals)";
  if (/inject\(|HttpClient|provideHttpClient/.test(s)) return "دالة الحقن أو عميل الشبكة";
  if (/input\(|output\(|model\(/.test(s)) return "مدخلات ومخرجات المكون الحديثة";
  if (/FormGroup|FormControl|Validators/.test(s)) return "حقول وضوابط النموذج";
  if (/\{\{.*\}\}/.test(s)) return "ربط القيمة داخل القالب {{ ... }}";
  if (/interface\b|type\b|enum\b/.test(s)) return "تعريف النوع في TypeScript";
  return lineCount > 1 ? `بنية من ${lineCount} أسطر` : "السطر المستهدف في الخطوة";
}

function transformToCanonicalLesson(rawLesson, index) {
  const targetSolution = (rawLesson.expected || rawLesson.code || "").trim();
  const lessonTitle = rawLesson.title || "هذا الدرس";

  // Enhance all steps with canonical required fields and curiosity-driven 4-tier hints
  const steps = (rawLesson.steps || []).map((step, sIdx) => {
    const stepTarget = (step.expected || step.code || targetSolution || step.title || "").trim();
    const fileName = step.file || rawLesson.file || "المشروع";
    const shapeCue = summarizeAngularTarget(stepTarget);

    // Tier 1: Curiosity-oriented attention prompt without leaking stepTarget
    let tier1 = `في ملف ${fileName} لدرس «${lessonTitle}»، تأمل كيف تتأثر الصياغة حول ${shapeCue} عند تنفيذ «${step.title || "هذه الخطوة"}».`;

    // Tier 2: Conceptual rule + Guiding question ending with ؟ (>= 25 chars)
    let tier2 = `تعتمد موثوقية ${shapeCue} في Angular وTypeScript على الدقة في الاسم والنوع وموضع القوس. هل تحققت من مطابقة السطر لما تطلبه الخطوة في ${fileName}؟`;

    // Tier 3: Actionable guidance containing stepTarget
    let tier3 = stepTarget
      ? `توجيه محدد في ${fileName}: ركّز على كتابة الصيغة المطلوبة: ${stepTarget}`
      : `توجيه محدد: راجع المطلوب في بطاقة الخطوة ونفّذه في ${fileName}.`;

    // Tier 4: Exact solution reveal containing stepTarget
    let tier4 = stepTarget
      ? `كشف الحل لملف ${fileName}: ${stepTarget}`
      : `كشف الحل: راجع الشرح واعتمد الصياغة الكاملة للخطوة.`;

    return {
      ...step,
      id: step.id || `step-${sIdx + 1}`,
      title: step.title || `خطوة ${sIdx + 1}`,
      type: step.type || "edit",
      objective: step.task || step.explanation || `تطبيق «${step.title || lessonTitle}» وملاحظة أثره.`,
      instruction: step.task || step.explanation || `نفّذ المطلوب داخل ${fileName} وشغّل المعاينة للمقارنة.`,
      benefit: step.benefit || `أثر الخطوة: لاحظت عمليًا كيف يتعامل Angular مع ${shapeCue} في «${lessonTitle}».`,
      errorRules: [
        ANGULAR_RULES.unclosedBrace,
        ANGULAR_RULES.unclosedInterpolation,
        ANGULAR_RULES.forLoopMissingTrack
      ],
      hints: [tier1, tier2, tier3, tier4]
    };
  });

  const canonical = {
    ...rawLesson,
    id: rawLesson.id,
    legacyId: rawLesson.id,
    title: rawLesson.title,
    skill: rawLesson.phase || rawLesson.module || "Angular 22 Modern Engineering",
    order: index,
    concept: rawLesson.concept,
    whyUse: getWhyUseForLesson(rawLesson),
    browserMechanics: getBrowserMechanicsForLesson(rawLesson),
    documentationUrl: rawLesson.reference || "https://angular.dev",
    code: rawLesson.code || rawLesson.expected || "// Angular Code",
    breakdown: getBreakdownForLesson(rawLesson),
    steps: steps,
    bugRepair: buildBugRepairForLesson(rawLesson, index)
  };

  return canonical;
}

module.exports = {
  RAW_COURSE,
  RAW_LESSONS,
  STARTER_FILES,
  MODULES,
  transformToCanonicalLesson
};

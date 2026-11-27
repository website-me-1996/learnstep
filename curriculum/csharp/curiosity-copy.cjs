/**
 * curriculum/csharp/curiosity-copy.cjs
 *
 * Enriches C# curriculum lessons with calm, topic-specific curiosity openings,
 * step-distinct benefits, and line-focused progressive hints without hype.
 */

const UNIT_CUES = {
  "unit_01": {
    question: "ماذا يظن الكمبيوتر عندما يرى أمر طباعة أو نصًا بلا تنصيص، وكيف يفرّق بين القيمة واسمها؟",
    consequence: "أي لبس بين قيمة محفوظة ونص حرفي يظهر فورًا كخطأ ترجمة أو ناتج مختلف عما توقعته.",
    runtime: "ينفذ المترجم السطر تلو الآخر بالترتيب الذي كتبته، لا بالترتيب الذي قرأته بعينك."
  },
  "unit_02": {
    question: "عند الحد الفاصل تمامًا — كالدرجة 50 أو التذكرة الثالثة — كيف يقرر الشرط أين يضع القيمة؟",
    consequence: "علامة مقارنة واحدة غير دقيقة تمرر حالة مرفوضة أو تحجب حالة مستحقة بصمت.",
    runtime: "يحسب الشرط تعبيرًا منطقيًا true أو false أولًا، ثم يختار الفرع المطابق لحظة التنفيذ."
  },
  "unit_03": {
    question: "إذا انضم شرطان بـ && أو ||، فمتى يتوقف الكمبيوتر عن فحص الشرط الثاني أصلًا؟",
    consequence: "سوء ترتيب الشروط المركبة يفتح استثناءات منطقية لا تظهر إلا مع مدخلات محددة.",
    runtime: "تقييم الدائرة القصيرة يتوقف فور حسم النتيجة المنطقية دون لمس الطرف المتبقي."
  },
  "unit_04": {
    question: "لماذا يعطي تقسيم 5 على 2 في C# أحيانًا 2 وأحيانًا 2.5 رغم تساوي الأرقام؟",
    consequence: "النوع المختار للرقم أو للنص يحدد الدقة الممكنة، خصوصًا في المال والقياسات.",
    runtime: "تُحدَّد دقة العملية من نوع طرفيها وقت التنفيذ قبل أن تُخزَّن في المتغير المستقبل."
  },
  "unit_05": {
    question: "لو ضغط المستخدم Enter على سطر فارغ أو كتب حروفًا مكان الرقم، ماذا يحدث لبرنامج لا يفحص مدخلاته؟",
    consequence: "الاعتماد على أن المستخدم سيكتب دائمًا الصيغة الصحيحة هو أقصر طريق لتوقف البرنامج.",
    runtime: "قراءة Console.ReadLine والتحقق عبر TryParse يعزلان الخطأ في قيمة bool آمنة قبل المتابعة."
  },
  "unit_06": {
    question: "كيف ينفذ الكمبيوتر الخطوة نفسها مئات المرات دون أن يعلق في دورة لا تنتهي؟",
    consequence: "شرط توقف خاطئ بمقدار رقم واحد يجعل الحلقة تنقص خطوة أو تدور إلى ما لا نهاية.",
    runtime: "يفحص الحاسوب شرط الاستمرار قبل كل دورة أو بعدها، ويحدّث العداد ليقترب من النهاية."
  },
  "unit_07": {
    question: "متى تحتاج أن تقفز عن دورة واحدة بـ continue أو تخرج فورًا بـ break من حلقة متداخلة؟",
    consequence: "الخلط بين تخطي عنصر واحد وإنهاء البحث كاملًا يغير النتائج الباقية في القائمة.",
    runtime: "يعيد continue التدفق إلى تحديث العداد والشرط، بينما يقفز break مباشرة خارج الحلقة الحالية."
  },
  "unit_08": {
    question: "عندما تمرر قيمة إلى دالة وتعدل المعامل داخلها، لماذا لا يتغير المتغير الأصلي أحيانًا؟",
    consequence: "عزل المهام في دوال واضحة يمنع تكرار الحسابات ويكشف ما يدخل وما يخرج من كل خطوة.",
    runtime: "تُنشأ نسخة للمتغيرات القيمية عند الاستدعاء، وتعود القيمة عبر return إلى موضع النداء."
  },
  "unit_09": {
    question: "لماذا يبدأ الفهرس الأول في المصفوفة من 0، وماذا يوقف البرنامج عند تجاوز الطول بخطوة واحدة؟",
    consequence: "خطأ Off-by-one على حدود المصفوفة من أكثر أسباب الأخطاء شيوعًا في البرامج.",
    runtime: "تحجز المصفوفة خانات متجاورة ثابتة الطول، ويتحقق وقت التشغيل من بقاء الفهرس ضمن 0..Length-1."
  },
  "unit_10": {
    question: "لو نسخت متغيرًا يشير إلى كائن ثم عدّلت فيه، لماذا يرى المتغير الأول التغيير نفسه؟",
    consequence: "فهم الفرق بين القيمة والمرجع يمنع تعديلات جانبية مفاجئة بين أجزاء البرنامج.",
    runtime: "يحمل المتغير المرجعي عنوان الكائن في الذاكرة لا نسخة مستقلة من حقوله."
  },
  "unit_11": {
    question: "كيف تصف مكدسًا أو رتلًا أو قائمة متصلة باليد لتعرف تكلفتها قبل أن تستخدم مكتبة جاهزة؟",
    consequence: "بناء البنية يدويًا يكشف لمَ تكون الإضافة من طرف أسرع أحيانًا من الحشر في المنتصف.",
    runtime: "تتحرك المؤشرات والفهارس خطوة بخطوة للحفاظ على ترتيب العناصر عند الإضافة والسحب."
  },
  "unit_12": {
    question: "متى يغنيك Dictionary أو HashSet عن حلقة بحث كاملة داخل List؟",
    consequence: "اختيار البنية الملائمة من .NET يختصر زمن البحث من فحص القائمة كلها إلى قفزة شبه فورية.",
    runtime: "تحوّل مجموعات التجزئة المفتاح إلى موضع مباشر، بينما تحافظ القوائم والمكدسات على الترتيب."
  },
  "unit_13": {
    question: "كيف تستدعي الدالة نفسها دون أن تنفد الذاكرة، ولماذا يتفوق البحث الثنائي على المرتب؟",
    consequence: "نسيان شرط الأساس في الاستدعاء الذاتي أو تطبيق البحث الثنائي على غير المرتب يعطي نتائج مضللة.",
    runtime: "تُكدّس كل دعوة ذاتية إطارها حتى تبلغ حالة الأساس ثم تعود النتائج في الاتجاه العكسي."
  },
  "unit_14": {
    question: "لماذا يصبح فرق السرعة بين خوارزميتين للترتيب محسوسًا فجأة عندما يتضاعف عدد العناصر؟",
    consequence: "اختبار الكود على 5 عناصر قد يخفي تكلفة تربيعية تبطئ البيانات الحقيقية.",
    runtime: "تقارن خوارزميات الترتيب العناصر وتبدل مواضعها أو تقسّم النطاق وتدمجه بأقل خطوات ممكنة."
  },
  "unit_15": {
    question: "كيف تسمح الشجرة الثنائية أو الكومة بالوصول لأصغر عنصر أو تقليص نطاق البحث في كل خطوة؟",
    consequence: "ترتيب العلاقة الهرمية بين العقد يحفظ الأولوية ويسهّل استخراج القيمة التالية بسرعة.",
    runtime: "يتنقل التنفيذ عبر الجذر والأبناء وفق قاعدة الشجرة أو موضع الأب والابن داخل المصفوفة."
  },
  "unit_16": {
    question: "كيف تتبع خريطة مسارات دون أن تدور في حلقة مفرغة إذا ارتبطت نقطتان ببعضهما؟",
    consequence: "غياب مجموعة visited في الرسوم البيانية يحوّل المسار الدائري إلى تكرار لا يتوقف.",
    runtime: "تستكشف BFS الجيران الأقرب عبر رتل، بينما تتعمق DFS عبر مكدس وتعلّم كل عقدة تمت زيارتها."
  }
};

function getUnitCue(unitId) {
  if (!unitId) return UNIT_CUES.unit_01;
  const prefix = Object.keys(UNIT_CUES).find((key) => unitId.startsWith(key));
  return prefix ? UNIT_CUES[prefix] : UNIT_CUES.unit_01;
}

function summarizeSolutionShape(solution) {
  const lines = String(solution || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const keyLine = lines.find((l) => !l.startsWith("using ")) || lines[0] || "";
  const firstToken = keyLine.split(/\s+/)[0] || "";
  return { lineCount: lines.length, keyLine, firstToken };
}

function enhanceConcept(c, unitId) {
  const cue = getUnitCue(unitId);
  const raw = String(c.concept || "").trim();
  if (/؟/.test(raw.slice(0, 90))) {
    return raw;
  }
  return cue.question + " " + raw;
}

function enhanceWhy(c, unitId) {
  const cue = getUnitCue(unitId);
  const raw = String(c.why || "").trim();
  if (raw.length >= 90) return raw;
  return raw + " " + cue.consequence;
}

function enhanceMechanics(c, unitId) {
  const cue = getUnitCue(unitId);
  const raw = String(c.mechanics || "").trim();
  if (raw.length >= 95) return raw;
  return raw + " " + cue.runtime;
}

function buildStepBenefit(stepId, lessonTitle) {
  switch (stepId) {
    case "build":
      return "أثر الخطوة: بنيت السلوك بيدك من البداية وربطت «" + lessonTitle + "» بمخرجات قابلة للقياس.";
    case "edit":
      return "أثر الخطوة: شاهدت كيف غيّر تعديل قيمة واحدة مسار القيم والمخرجات في التتبع.";
    case "experiment":
      return "أثر الخطوة: اختبرت فرضيتك أنت بحالة جديدة، وتأكدت من أثرها دون تقليد أعمى.";
    case "repair":
      return "أثر الخطوة: ميّزت بين كود يترجم بلا أخطاء وكود يحقق المطلوب بدقة.";
    case "transfer":
      return "أثر الخطوة: نقلت فكرة «" + lessonTitle + "» إلى سياق مختلف تمامًا، وسيُحفظ هذا التطبيق مع تقدمك.";
    default:
      return "أثر الخطوة: اتضحت العلاقة بين السطر الحالي وحالة البرنامج.";
  }
}

function buildStepHints({ stepId, attention, rule, help, solution, lessonTitle, bugBroken }) {
  const shape = summarizeSolutionShape(solution);
  const lineHint = shape.lineCount > 1
    ? "راقب عدد الأسطر (" + shape.lineCount + " أسطر) وتسلسل العمليات داخل «" + lessonTitle + "»."
    : "المطلوب يتركز في عبارة واحدة متصلة واضحة.";

  const tier1 = stepId === "repair" && bugBroken
    ? "قارن ما تتوقع حدوثه في «" + lessonTitle + "» بما يفعله السطر المعطوب حاليًا."
    : (attention || "تأمل موضع القيمة أو الشرط المرتبط بـ «" + lessonTitle + "».") + " " + lineHint;

  const tier2 = "القاعدة: " + rule + " هل حددت السطر أو القيمة التي تغيّر السلوك هنا؟";
  const tier3 = (help || "أعد فحص الصياغة والتسمية والنوع في الخطوة.") +
    (shape.firstToken ? " (ابدأ بملاحظة البنية حول `" + shape.firstToken + "`)." : "");
  const tier4 = "كشف الحل:\n" + solution;

  return [tier1, tier2, tier3, tier4];
}

module.exports = {
  getUnitCue,
  enhanceConcept,
  enhanceWhy,
  enhanceMechanics,
  buildStepBenefit,
  buildStepHints
};

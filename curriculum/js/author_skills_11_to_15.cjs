/**
 * curriculum/js/author_skills_11_to_15.cjs
 * Skills 11 through 15 (Lessons 50 to 77 - 28 lessons)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, JS_TOPICS } = require("./builder_helper.cjs");
const { JS_RULES } = require("./rules_catalog.cjs");

const OUTPUT_DIR = path.resolve(__dirname);

const skillData = [
  // Skill 11: نطاق المتغيرات وتنظيمها (50..54)
  {
    order: 50,
    title: "نطاق المتغيرات (Scope) وحدود الرؤية في JavaScript",
    concept: "النطاق Scope يحدد إمكانية الوصول إلى المتغيرات والدوال من أجزاء الكود المختلفة؛ وتمتلك JavaScript ثلاثة مستويات أساسية للنطاق: النطاق العام (Global Scope)، ونطاق الدالة (Function Scope)، ونطاق الكتلة (Block Scope).",
    whyUse: "يمنع تداخل المتغيرات وتصادم الأسماء بين أجزاء البرنامج المختلفة، ويحقق مبدأ عزل البيانات وحمايتها من التعديل الخارجي غير المقصود.",
    browserMechanics: "يبحث محرك المتصفح عن المتغير في البيئة المعجمية الحالية (Lexical Environment)؛ فإذا لم يجده يصعد في سلسلة النطاقات (Scope Chain) حتى يصل إلى الكائن العام Window أو يرمي خطأ ReferenceError.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
    breakdown: [
      "النطاق العام (Global): متاح في أي سطر في البرنامج وقد يسبب تصادم الأسماء.",
      "نطاق الدالة (Function): محصور داخل جسم الدالة ولا يمكن قراءته من خارجها.",
      "سلسلة النطاقات (Scope Chain): تصاعد البحث من الداخل إلى الخارج دائماً."
    ],
    bugRepair: {
      brokenCode: "function test() {\n  let secret = 123;\n}\ntest();\nconsole.log(secret);",
      fixedCode: "let secret;\nfunction test() {\n  secret = 123;\n}\ntest();\nconsole.log(secret);",
      question: "لماذا رمى الكود خطأ ReferenceError: secret is not defined؟",
      explanation: "المتغير secret معرّف داخل نطاق دالة test ولا يمكن الوصول إليه أو قراءته من النطاق العام الخارجي.",
      options: [
        "لأن console.log لا تطبع الأرقام المكونة من 3 خانات",
        "لأن المتغير محصور داخل نطاق الدالة المحلي ولا يمكن الوصول إليه من الخارج",
        "لأن الدالة test لم يتم تشغيلها",
        "لأن الأرقام تتطلب كلمة const دائماً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 51,
    title: "الكتل البرمجية (Code Blocks) وحدود الأقواس المتعرجة",
    concept: "الكتلة البرمجية هي مجموعة عبارات محصورة بين قوسين متعرجين { }؛ وتُستخدم لتجميع الأوامر المنطقية وتحديد نطاق محلي مستقل للمتغيرات المعرفة بـ let و const.",
    whyUse: "تسمح بإعادة استخدام نفس أسماء المتغيرات الشائعة (مثل temp أو i) داخل كتل مختلفة دون أي تعارض أو تأثير جانبي على النطاق الخارجي.",
    browserMechanics: "عند دخول كتلة جديدة، ينشئ المحرك بيئة سجل معجمي (Declarative Environment Record) جديدة في الذاكرة لتخزين متغيرات الكتلة، ويقوم بتدميرها تلقائياً عند الخروج من الكتلة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block",
    breakdown: [
      "الأقواس { }: تحدد بداية ونهاية الكتلة البرمجية المعزولة.",
      "عزل let و const: لا تتسرب خارج حدود القوسين المتعرجين للكتلة.",
      "تسرب var القديم: كلمة var تتجاهل حدود الكتل البرمجية وتتسرب للنطاق الخارجي."
    ],
    bugRepair: {
      brokenCode: "{\n  let temp = 'مؤقت';\n}\nconsole.log(temp);",
      fixedCode: "let temp;\n{\n  temp = 'مؤقت';\n}\nconsole.log(temp);",
      question: "لماذا فشل سطر console.log في قراءة قيمة temp؟",
      explanation: "المتغير temp معرّف بـ let داخل كتلة { }، لذا ينتهي وجوده فور الخروج من الكتلة ولا يراه السطر الخارجي.",
      options: [
        "لأن النصوص لا يمكن تخزينها في كتل مستقلة",
        "لأن متغيرات let محصورة داخل نطاق الكتلة { } وتختفي فور إغلاق القوس",
        "لأن console.log يجب أن توضع داخل الكتلة فقط",
        "لأن الكود يحتاج إلى علامة سهم =>"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 52,
    title: "الرفع البرمجي (Hoisting) وسلوك مفسر JavaScript",
    concept: "الرفع Hoisting هو سلوك محرك JavaScript بنقل إعلانات الدوال والمتغيرات إلى قمة نطاقها الحاضن أثناء مرحلة الترجمة اللغوية قبل البدء الفعلي بتنفيذ أي سطر كود.",
    whyUse: "فهم الرفع يفسر للمطور سبب إمكانية استدعاء الدوال التقليدية قبل أسطر كتابتها، ويجنب الوقوع في أخطاء الوصول للمتغيرات قبل تهيئتها.",
    browserMechanics: "في مرحلة الإنشاء (Creation Phase)، ترفع الدوال التقليدية بكامل محتواها، وترفع متغيرات var بقيمة أولية undefined، بينما ترفع let و const في منطقة الموت المؤقت (TDZ) بدون تهيئة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
    breakdown: [
      "رفع الدوال الكامل: يتيح استدعاء الدالة في السطر الأول وتعريفها في السطر الأخير.",
      "رفع var بقيمة undefined: لا يرمي خطأ ولكنه يقرأ قيمة غير مهيأة تسبب أخطاء منطقية.",
      "منطقة الموت المؤقت (TDZ): حماية صارمة تمنع قراءة let و const قبل سطر إعلانهما."
    ],
    bugRepair: {
      brokenCode: "console.log(x);\nlet x = 10;",
      fixedCode: "let x = 10;\nconsole.log(x);",
      question: "لماذا رمى المفسر خطأ ReferenceError بدلاً من طباعة undefined؟",
      explanation: "متغيرات let ترفع في منطقة الموت المؤقت (TDZ) التي تحظر قراءتها إطلاقاً قبل سطر التهيئة الفعلي.",
      options: [
        "لأن x يجب أن تكون ثابتة بـ const",
        "لأن let تمنع الوصول للمتغير في منطقة الموت المؤقت قبل سطر تعريفه",
        "لأن الرقم 10 لا يمكن رفعه في الذاكرة",
        "لأن console.log تسببت في مسح المتغير"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 53,
    title: "المقارنة الشاملة بين var و let و const",
    concept: "تمثل الكلمات الثلاث أدوات الإعلان عن المتغيرات عبر أجيال JavaScript: الكلمة القديمة var ذات النطاق الدالي وقابلية إعادة الإعلان، والكلمتان الحديثتان let و const ذواتا نطاق الكتلة والأمان العالي.",
    whyUse: "القاعدة الحديثة المعتمدة لدى المطورين المحترفين: استخدم const دائماً كخيار افتراضي، واستخدم let عندما تحتاج لإعادة تعيين القيمة، وتجنب استخدام var نهائياً في المشاريع الجديدة.",
    browserMechanics: "تضاف متغيرات var في النطاق العام كخصائص للكائن العام window مما قد يكتب فوق دوال المتصفح الأساسية، بينما تُعزل let و const في سجل النطاق البرمجي المستقل.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var",
    breakdown: [
      "نطاق الكتلة: تدعمه let و const فقط وتتجاهله var كلياً.",
      "إعادة الإعلان: تسمح به var القديمة وتمنعه let و const الصارمتان لمنع الأخطاء العرضية.",
      "أفضل ممارسة: الاعتماد على const و let يعزز أمان واستقرار وموثوقية التطبيق."
    ],
    bugRepair: {
      brokenCode: "let count = 1;\nlet count = 2; // إعادة إعلان",
      fixedCode: "let count = 1;\ncount = 2; // إعادة تعيين فقط",
      question: "لماذا رمى المفسر خطأ SyntaxError: Identifier 'count' has already been declared؟",
      explanation: "تمنع let إعادة الإعلان عن نفس المتغير في نفس النطاق؛ لتغيير القيمة اكتب count = 2 دون تكرار كلمة let.",
      options: [
        "لأن الأرقام لا يمكن تعديلها في المتغيرات",
        "لأن let تمنع إعادة إعلان المتغير مرة أخرى في نفس النطاق ويجب الاكتفاء بإسناد القيمة",
        "لأن count كلمة محجوزة في لغة JavaScript",
        "لأن التعيين الثاني يجب أن يكون نصاً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 54,
    title: "الوضع الصارم (Strict Mode) وكتابة كود آمن",
    concept: "الوضع الصارم 'use strict' هو ميزة تفرض قواعد برمجية صارمة في JavaScript؛ تمنع الأخطاء الصامتة، وتحظر استخدام متغيرات غير معلنة، وتلغي بعض الميزات السيئة القديمة للغة.",
    whyUse: "يساعد على كتابة شفرة آمنة وعالية الجودة، ويكتشف الأخطاء الإملائية فوراً بدلاً من إنشاء متغيرات عامة بالخطأ في الذاكرة دون علم المطور.",
    browserMechanics: "يفعل المحرك وضع الفحص الصارم لوحدة الكود؛ حيث يرمي أخطاء فورية (Exceptions) في الحالات التي كانت تمر صامتة سابقاً، ويمنع حذف المتغيرات غير القابلة للحذف بـ delete.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
    breakdown: [
      "العبارة 'use strict': تُكتب في أول سطر في الملف أو الدالة لتفعيل الوضع الصارم.",
      "منع التسرب العام: محاولة كتابة x = 5 دون let/const ترمي خطأ ReferenceError فورياً.",
      "تأمين this: تصبح قيمة this في الدوال العامة undefined بدلاً من الكائن العام window."
    ],
    bugRepair: {
      brokenCode: "'use strict';\nuser = 'خالد';\nconsole.log(user);",
      fixedCode: "'use strict';\nlet user = 'خالد';\nconsole.log(user);",
      question: "لماذا رمى الكود خطأ ReferenceError: user is not defined في الوضع الصارم؟",
      explanation: "في الوضع الصارم يمنع المحرك إنشاء متغيرات عامة ضمنية بدون كلمة إعلان صريحة (let أو const أو var).",
      options: [
        "لأن الوضع الصارم لا يدعم الأسماء العربية",
        "لأن الوضع الصارم يحظر استخدام أي متغير دون إعلانه مسبقاً بـ let أو const",
        "لأن عبارة use strict غير صالحة في المتصفحات",
        "لأن console.log معطلة في الوضع الصارم"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 12: إنشاء التواريخ والتعامل معها (55..59)
  {
    order: 55,
    title: "كائن التاريخ (Date Object) والوقت في JavaScript",
    concept: "يمثل كائن Date لحظة زمنية محددة بدقة الملي ثانية محسوبة منذ نقطة الصفر الزمنية (Unix Epoch: 1 يناير 1970 بالتوقيت العالمي UTC)، ويُنشأ باستخدام new Date().",
    whyUse: "ضروري لتسجيل أوقات العمليات، وحساب المدد الزمنية وفروق الأيام بين المواعيد، وعرض تواريخ النشر وساعات التوقيت في تطبيقات الويب.",
    browserMechanics: "يقرأ كائن Date توقيت ساعة نظام تشغيل جهاز المستخدم ومنطقته الزمنية المحلية، ويخزن اللحظة كرقم صحيح من الملي ثواني (Timestamp) في كومة الذاكرة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
    breakdown: [
      "أمر new Date(): ينشئ كائناً يحمل التاريخ والوقت الحاليين لحظة التشغيل.",
      "الـ Timestamp: عدد الملي ثواني المنقضية منذ 1 يناير 1970 ويُقرأ بـ Date.now().",
      "المنطقة الزمنية: يعرض التوقيت بحسب المنطقة الزمنية المحددة في جهاز الزائر."
    ],
    bugRepair: {
      brokenCode: "let now = Date.create();",
      fixedCode: "let now = new Date();",
      question: "لماذا أظهر المفسر خطأ TypeError: Date.create is not a function؟",
      explanation: "لإنشاء كائن تاريخ جديد في JavaScript نستخدم الدالة البنائية new Date() ولا توجد دالة باسم Date.create.",
      options: [
        "لأن التواريخ تتطلب استدعاء مكتبة خارجية",
        "لأن إنشاء التاريخ يتم عبر الدالة البنائية new Date() وليس Date.create",
        "لأن المتغير now محجوز لساعة المتصفح",
        "لأن التواريخ تقبل الأرقام فقط"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 56,
    title: "صيغ التواريخ (Date Formats) وتحليل النصوص الزمنية",
    concept: "تدعم JavaScript صيغاً متعددة لتمثيل التواريخ؛ أبرزها وأكثرها أماناً هي الصيغة القياسية ISO 8601 بصيغة 'YYYY-MM-DDTHH:mm:ss.sssZ'، والتي تضمن تحليلاً زمنياً متسقاً عبر كافة المتصفحات.",
    whyUse: "تضمن عدم الخلط بين الشهر واليوم بين المعايير الأمريكية والدولية؛ فكتابة التاريخ بصيغة ISO القياسية تحمي تطبيقات الحجوزات من أخطاء المواعيد.",
    browserMechanics: "تقوم دالة Date.parse بتحليل النص الزمني وتحويله إلى ملي ثواني؛ وإذا كانت صيغة النص غير معروفة أو معطوبة تعيد كائن تاريخ بقيمة 'Invalid Date'.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse",
    breakdown: [
      "صيغة ISO 8601: الصيغة العالمية المعيارية الأكثر دقة (مثل 2026-11-12).",
      "التحليل عبر النصوص: new Date('2026-11-12') تنشئ تاريخاً محدداً في الذاكرة.",
      "فحص الصحة: فحص isNaN(date.getTime()) للتأكد من سلامة التاريخ المدخل."
    ],
    bugRepair: {
      brokenCode: "let d = new Date('2026/31/12'); // شهر 31 غير موجود",
      fixedCode: "let d = new Date('2026-12-31');",
      question: "لماذا أعاد المتصفح كائناً يحمل القيمة Invalid Date؟",
      explanation: "تم وضع اليوم مكان الشهر؛ الشهر في التاريخ يقع بين 1 و 12، والصيغة القياسية الصحيحة هي YYYY-MM-DD (2026-12-31).",
      options: [
        "لأن سنة 2026 سنة كبيسة لا تقبل التواريخ",
        "لأن صيغة التاريخ خاطئة وترتيب الأرقام غير قياسي مما أنتج Invalid Date",
        "لأن علامة الشرطة / ممنوعة في التواريخ",
        "لأن التاريخ يتطلب كتابة اسم اليوم نصياً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 57,
    title: "استخراج مكونات التاريخ (Date Get Methods)",
    concept: "توفر دوال الاستخراج (Getters) إمكانية قراءة أجزاء التاريخ المنفصلة؛ مثل getFullYear للسنة، و getMonth للشهر، و getDate لليوم من الشهر، و getDay ليوم الأسبوع، و getHours للساعات.",
    whyUse: "تُستخدم لعرض أجزاء التاريخ في واجهات مخصصة؛ مثل كتابة 'نوفمبر 2026'، أو حساب أعمار المستخدمين بطرح سنة الميلاد من السنة الحالية.",
    browserMechanics: "ملاحظة هندسية جوهرية: دالة getMonth تعتمد فهرسة تبدأ من الصفر (0 لـ يناير و 11 لـ ديسمبر)، بينما getDate تعتمد الأيام الحقيقية من 1 إلى 31.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear",
    breakdown: [
      "دالة getFullYear(): تعيد السنة بأربعة أرقام كاملة (مثل 2026) وتتجنب دوال القرون القديمة.",
      "دالة getMonth(): تعيد رقم الشهر من 0 إلى 11 (تتطلب إضافة 1 لمعرفة الشهر البشري).",
      "دالة getDate(): تعيد رقم يوم الشهر الفعلي من 1 إلى 31 بدقة."
    ],
    bugRepair: {
      brokenCode: "let d = new Date('2026-05-15');\nlet y = d.getYear(); // دالة قديمة غير موصى بها",
      fixedCode: "let d = new Date('2026-05-15');\nlet y = d.getFullYear();",
      question: "لماذا أعادت دالة getYear() الرقم 126 بدلاً من السنة 2026؟",
      explanation: "دالة getYear القديمة تعيد عدد السنوات منذ عام 1900 (2026 - 1900 = 126)؛ الدالة القياسية الحديثة هي getFullYear().",
      options: [
        "لأن كائن التاريخ أصيب بخلل في الذاكرة",
        "لأن getYear دالة قديمة تعيد الفرق منذ 1900، والصواب استخدام getFullYear()",
        "لأن سنة 2026 لم تحن بعد في نظام التوقيت",
        "لأن دالة getYear تتطلب تمرير السنة كمعامل"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 58,
    title: "تعديل وضبط مكونات التاريخ (Date Set Methods)",
    concept: "تسمح دوال الضبط (Setters) بتعديل أجزاء محددة من كائن التاريخ القائم؛ مثل setFullYear لتغيير السنة، و setMonth للشهر، و setDate لتغيير اليوم، دون الحاجة لإنشاء كائن جديد.",
    whyUse: "تُستخدم لحساب المواعيد المستقبلية والماضية؛ مثل إضافة 7 أيام لتاريخ اليوم لحساب موعد انتهاء الاشتراك أو تجديد الفاتورة.",
    browserMechanics: "يتمتع كائن Date بميزة التصحيح التلقائي للأفيض (Auto-Overflow Roll)؛ فإذا حددت اليوم بـ 32 في شهر من 30 يوماً، يقوم المحرك بتقديم التاريخ تلقائياً إلى 2 من الشهر التالي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate",
    breakdown: [
      "دالة setDate(day): تحدث يوم الشهر وتتعامل تلقائياً مع نهايات الشهور.",
      "دالة setFullYear(year): تغير السنة الحالية مع الاحتفاظ بنفس اليوم والشهر والوقت.",
      "إضافة مدد زمنية: كتابة d.setDate(d.getDate() + 7) تضيف أسبوعاً كاملاً على التاريخ."
    ],
    bugRepair: {
      brokenCode: "let d = new Date('2026-05-01');\nd.date = 10; // تعديل كخاصية عادية",
      fixedCode: "let d = new Date('2026-05-01');\nd.setDate(10);",
      question: "لماذا لم يتغير يوم التاريخ وظل كما هو في الأول من مايو؟",
      explanation: "أجزاء كائن Date لا تُعدل كخصائص مباشرة، بل يتم تعديلها حصراً عبر دوال الضبط مثل d.setDate(10).",
      options: [
        "لأن شهر مايو لا يقبل التعديل على أيامه",
        "لأن تعديل يوم التاريخ يتطلب استدعاء دالة الضبط setDate() وليس الإسناد المباشر",
        "لأن التاريخ ثنائي القيمة ولا يتغير",
        "لأن كائن Date لا يقبل سوى التعديل من خلال إعادة الإنشاء"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 59,
    title: "تنسيق التواريخ محلياً (Date Formatting & Intl)",
    concept: "توفر JavaScript دوال لتحويل التواريخ إلى نصوص منسقة وقابلة للقراءة البشرية؛ مثل toLocaleDateString و toLocaleTimeString، بالإضافة إلى كائن التدويل المتقدم Intl.DateTimeFormat لدعم اللغات والتقاويم المتنوعة.",
    whyUse: "تتيح عرض التواريخ باللغة العربية والتقويم المناسب للمستخدم (مثل '١٢ نوفمبر ٢٠٢٦' أو التقويم الهجري) تلقائياً بناءً على إعدادات متصفحه دون عناء البرمجة اليدوية.",
    browserMechanics: "يتصل كائن Intl بمكتبة التدويل العالمية المدمجة في المتصفح (ICU) لتطبيق قواعد اللغة والأرقام والتقاويم الخاصة بالبلد المحدد بدقة عالية.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat",
    breakdown: [
      "دالة toLocaleDateString('ar-EG'): تعرض التاريخ باللغة العربية بتنسيق محلي ملائم.",
      "خيارات التنسيق { month: 'long', year: 'numeric' }: تخصص درجة التفصيل في النص الناتج.",
      "دعم التقاويم المتعددة: إمكانية اختيار التقويم الهجري islamic-umalqura بسهولة."
    ],
    bugRepair: {
      brokenCode: "let d = new Date();\nlet str = d.toLocaleDateString('ar-SA', { calendar: 'hijri' }); // الاسم غير قياسي",
      fixedCode: "let d = new Date();\nlet str = d.toLocaleDateString('ar-SA-u-ca-islamic-umalqura');",
      question: "لماذا لم يظهر التاريخ بالتقويم الهجري بالشكل المطلوب؟",
      explanation: "تحديد التقويم الإسلامي في معايير BCP 47 يتم عبر إضافة اللاحقة -u-ca-islamic-umalqura لرمز اللغة ar-SA.",
      options: [
        "لأن المتصفحات لا تدعم التقويم الهجري إطلاقاً",
        "لأن التقويم يُحدد عبر امتداد كود اللغة القياسي ar-SA-u-ca-islamic-umalqura",
        "لأن التواريخ في JavaScript ميلادية حصراً",
        "لأن دالة toLocaleDateString لا تقبل معلمات"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 13: إضافة عناصر إلى المصفوفات (60..66)
  {
    order: 60,
    title: "مفهوم المصفوفات (Arrays) وهياكل البيانات المرتبة",
    concept: "المصفوفة Array هي بنية بيانات مرتبة ومفهرسة تُستخدم لتخزين قائمة من العناصر تحت اسم متغير واحد؛ وتعتمد فهرسة تبدأ من الصفر (Zero-Indexed)، وتستطيع حمل مختلف أنواع البيانات معاً.",
    whyUse: "تعد أساسية للتعامل مع المجموعات في الويب: مثل قائمة المنتجات، وقائمة أسماء الطلاب، والتعليقات على منشور، ومحطات خط السير.",
    browserMechanics: "تُخزن المصفوفات في كومة الذاكرة ككائنات متخصصة تمتلك خاصية طول ديناميكية length تتحدث تلقائياً عند إضافة أو حذف العناصر، وتخصص خانات متجاورة لتسريع الوصول.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays",
    breakdown: [
      "الأقواس المربعة [ ]: الصيغة الحرفية القياسية (Array Literal) لتعريف المصفوفة.",
      "الفهرس [0]: الوصول إلى أول عنصر في المصفوفة عبر رقم موضعه.",
      "خاصية length: تعكس عدد العناصر الحالية المخزنة في القائمة بدقة."
    ],
    bugRepair: {
      brokenCode: "let list = ['تفاح', 'موز', 'عنب'];\nconsole.log(list(0));",
      fixedCode: "let list = ['تفاح', 'موز', 'عنب'];\nconsole.log(list[0]);",
      question: "لماذا رمى المفسر خطأ TypeError: list is not a function؟",
      explanation: "في JavaScript، الوصول لعناصر المصفوفة عبر الفهرس يتم بالأقواس المربعة [0]؛ استخدام الأقواس الدائرية () يفسره المحرك كاستدعاء دالة.",
      options: [
        "لأن الفواكه يجب أن تكون في كائنات وليس مصفوفات",
        "لأن الوصول لفهرس المصفوفة يتطلب أقواساً مربعة [0] وليس أقواساً دائرية ()",
        "لأن الفهرس يجب أن يبدأ برقم 1",
        "لأن المصفوفة list فارغة في الذاكرة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 61,
    title: "منشئ المصفوفات (Array Constructor) والإنشاء الديناميكي",
    concept: "يمكن إنشاء المصفوفات عبر الدالة البنائية new Array() أو Array.of() و Array.from()؛ والتي توفر طرقاً ديناميكية لتوليد مصفوفات بأطوال محددة أو تحويل الكائنات الشبيهة بالمصفوفات لقوائم حقيقية.",
    whyUse: "تُستخدم Array.from لتحويل مجموعات عناصر DOM (NodeLists) إلى مصفوفات حقيقية تدعم دوال map و filter، وتوليد نطاقات أرقام بسرعة.",
    browserMechanics: "استدعاء new Array(5) ينشئ مصفوفة فارغة تحتوي على 5 خانات غير معينة (Sparse Array)، بينما Array.of(5) تنشئ مصفوفة تحتوي على الرقم 5 كعنصر وحيد.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
    breakdown: [
      "الدالة Array.from(iterable): تحول أي كائن قابل للتكرار إلى مصفوفة Array قياسية.",
      "الدالة Array.of(...items): تنشئ مصفوفة بالعناصر الممررة متفادية مفارقة الرقم الواحد.",
      "الصيغة الحرفية []: الخيار الأسرع والأنظف لمعظم حالات إنشاء المصفوفات."
    ],
    bugRepair: {
      brokenCode: "let arr = new Array(3);\nconsole.log(arr.length, arr[0]); // يريد [3]",
      fixedCode: "let arr = Array.of(3);\nconsole.log(arr.length, arr[0]);",
      question: "لماذا أنشأ new Array(3) مصفوفة طولها 3 بخانات فارغة بدلاً من مصفوفة تحمل الرقم 3؟",
      explanation: "تمرير رقم وحيد للدالة new Array(n) يحدد طول المصفوفة وليس محتواها؛ لإنشاء مصفوفة تحتوي على الرقم 3 استخدم Array.of(3) أو [3].",
      options: [
        "لأن الرقم 3 رقم فردي لا يمكن تخزينه",
        "لأن new Array برقم واحد تحدد طول المصفوفة، والصواب استخدام Array.of(3) أو [3]",
        "لأن الدالة البنائية لا تعمل مع الأرقام",
        "لأن length لا تعمل مع new Array"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 62,
    title: "دوال تعديل المصفوفات (Array Push, Pop, Shift, Unshift)",
    concept: "توفر المصفوفات دوال لإضافة وحذف العناصر من الأطراف: push لإضافة عناصر في النهاية، و pop لحذف آخر عنصر، و unshift لإضافة عناصر في البداية، و shift لحذف أول عنصر.",
    whyUse: "تتيح استخدام المصفوفات كهياكل بيانات متقدمة في البرمجة؛ مثل طوابير الانتظار (Queues: FIFO) ومكدسات المهام (Stacks: LIFO).",
    browserMechanics: "تعديل نهاية المصفوفة بـ push و pop سريع جداً (O(1))، بينما shift و unshift أبطأ (O(n)) لأن المحرك يضطر لإعادة فهرسة وإزاحة كافة العناصر في الذاكرة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
    breakdown: [
      "دالة push(item): تضيف عنصراً لنهاية المصفوفة وتعيد الطول الجديد.",
      "دالة pop(): تحذف العنصر الأخير من المصفوفة وتعيده.",
      "دالة unshift(item): تدرج عنصراً في خانة البداية (الفهرس 0).",
      "دالة shift(): تسحب العنصر الأول وتحذفه وتزيح باقي العناصر خطوة للأمام."
    ],
    bugRepair: {
      brokenCode: "let items = ['أ', 'ب'];\nitems.add('ج');",
      fixedCode: "let items = ['أ', 'ب'];\nitems.push('ج');",
      question: "لماذا رمى المفسر خطأ TypeError: items.add is not a function؟",
      explanation: "الدالة القياسية لإضافة عناصر لنهاية المصفوفة في JavaScript هي push وليست add (add مخصصة لكائن Set).",
      options: [
        "لأن الحرف 'ج' لا يمكن إضافته للنصوص",
        "لأن دالة إضافة عنصر للمصفوفة هي push() وليست add()",
        "لأن المصفوفة items يجب أن تكون كائناً",
        "لأن الإضافة تتطلب إعادة كتابة المصفوفة بالكامل"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 63,
    title: "البحث في المصفوفات (Array Search & Includes)",
    concept: "تتيح دوال البحث العثور على العناصر داخل المصفوفات؛ مثل includes للتحقق من الوجود، و indexOf لمعرفة موضع الفهرس، و find للعثور على أول عنصر يطابق شرطاً دالياً معقداً، و findIndex لمعرفة موضعه.",
    whyUse: "تعد جوهرية في البحث داخل القوائم؛ مثل البحث عن منتج بواسطة معرّفه الفريد id، أو التحقق مما إذا كان المعرف موجوداً في سلة المشتريات.",
    browserMechanics: "تمر دالة find عبر عناصر المصفوفة بالترتيب؛ وتتوقف فوراً عند أول عنصر ترجع الدالة الشرطية له true وتعيد ذلك العنصر، مما يوفر وقت المعالجة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
    breakdown: [
      "دالة includes(item): تعيد true إذا وجد العنصر المطابق تماماً.",
      "دالة indexOf(item): تعيد موضع الفهرس أو -1 إذا لم تجده.",
      "دالة find(predicate): تفحص العناصر عبر دالة شرطية وتعيد أول كائن يحقق الشرط."
    ],
    bugRepair: {
      brokenCode: "let nums = [10, 20, 30];\nlet res = nums.find(x => x === 20);\n// يريد معرفة موضع الفهرس وليس القيمة",
      fixedCode: "let nums = [10, 20, 30];\nlet res = nums.findIndex(x => x === 20);",
      question: "لماذا أعادت الدالة القيمة 20 بدلاً من رقم الفهرس 1؟",
      explanation: "دالة find تعيد العنصر نفسه، بينما دالة findIndex هي المخصصة لإرجاع رقم فهرس موضع العنصر داخل المصفوفة.",
      options: [
        "لأن رقم 20 لا يملك فهرساً في المصفوفة",
        "لأن دالة find تعيد القيمة نفسها، بينما دالة findIndex هي التي تعيد رقم الفهرس",
        "لأن nums مصفوفة أرقام وليست مصفوفة كائنات",
        "لأن الأقواس السهمية غير مدعومة في البحث"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 64,
    title: "ترتيب المصفوفات (Array Sort & Reverse)",
    concept: "تقوم دالة sort بترتيب عناصر المصفوفة في مكانها الأصلي (In-Place)، بينما تقوم دالة reverse بعكس ترتيب العناصر؛ وتتطلب الأرقام تمرير دالة مقارنة (Comparator: (a, b) => a - b) لضمان الترتيب الرياضي السليم.",
    whyUse: "تُستخدم لترتيب المنتجات بحسب السعر (من الأقل للأعلى)، أو ترتيب قوائم الأسماء أبجدياً، أو ترتيب التدوينات بحسب تاريخ النشر من الأحدث للأقدم.",
    browserMechanics: "بشكل افتراضي، تحول دالة sort العناصر إلى سلاسل نصية وتقارنها بنقاط ترميز UTF-16 (مما يجعل 25 يأتي قبل 5 لأن '2' أصغر من '5')؛ وتستخدم محركات V8 خوارزمية Timsort فائقة السرعة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
    breakdown: [
      "الترتيب الافتراضي: يرتب العناصر كنصوص أبجدية ما لم تُمرر دالة مخصصة.",
      "دالة المقارنة (a, b) => a - b: تضمن الترتيب التصاعدي الرياضي للأرقام.",
      "دالة reverse(): تقلب اتجاه المصفوفة الحالية وتجعل أولها آخرها."
    ],
    bugRepair: {
      brokenCode: "let prices = [100, 25, 5];\nprices.sort();\nconsole.log(prices); // نتج [100, 25, 5]",
      fixedCode: "let prices = [100, 25, 5];\nprices.sort((a, b) => a - b);\nconsole.log(prices);",
      question: "لماذا تم ترتيب الأرقام كـ [100, 25, 5] بدلاً من [5, 25, 100]؟",
      explanation: "دالة sort ترتب العناصر كنصوص افتراضياً فيأتي '100' قبل '25'؛ لترتيب الأرقام حسابياً يجب تمرير دالة مقارنة (a, b) => a - b.",
      options: [
        "لأن الرقم 100 يعتبر أصغر من 25 في JavaScript",
        "لأن الترتيب الافتراضي يقارن الأرقام كنصوص، ويجب تمرير دالة مقارنة رياضية (a, b) => a - b",
        "لأن دالة sort لا تدعم المصفوفات التي تزيد عن عنصرين",
        "لأن المتغير prices يجب أن يكون ثابتاً const"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 65,
    title: "تكرار ومعالجة المصفوفات (Map, Filter, Reduce)",
    concept: "تمثل دوال map و filter و reduce الثالوث الأقدس للبرمجة الوظيفية (Functional Programming) في JavaScript؛ map تحول كل عنصر لقيمة جديدة، و filter تستخلص العناصر المطابقة، و reduce تختزل القائمة لقيمة إجمالية واحدة.",
    whyUse: "تنهي الحاجة لكتابة حلقات for اليدوية المعقدة، وتتيح كتابة تحويلات بيانات مركبة بسطور معدودة بأسلوب نقي خالٍ من الآثار الجانبية (Pure Functions).",
    browserMechanics: "لا تعدل هذه الدوال المصفوفة الأصلية إطلاقاً، بل تنشئ مصفوفة جديدة في الذاكرة وتعيدها، مما يمنع التعديل العرضي على البيانات الأساسية للتطبيق.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
    breakdown: [
      "دالة map(fn): تنشئ مصفوفة جديدة بنفس الطول بعد تطبيق دالة التحويل على كل عنصر.",
      "دالة filter(fn): تنشئ مصفوفة جديدة تحتوي فقط على العناصر التي حققت الشرط true.",
      "دالة reduce(fn, init): تجمع عناصر المصفوفة تدريجياً لإنتاج ناتج نهائي واحد كالمجموع."
    ],
    bugRepair: {
      brokenCode: "let nums = [1, 2, 3];\nlet doubled = nums.forEach(x => x * 2);\nconsole.log(doubled); // يريد [2, 4, 6]",
      fixedCode: "let nums = [1, 2, 3];\nlet doubled = nums.map(x => x * 2);\nconsole.log(doubled);",
      question: "لماذا نتجت القيمة undefined في المتغير doubled؟",
      explanation: "دالة forEach تنفذ أفعالاً فقط وتعيد undefined دائماً؛ لتوليد مصفوفة جديدة بقيم محولة يجب استخدام دالة map.",
      options: [
        "لأن الرقم 2 لا يقبل المضاعفة في forEach",
        "لأن forEach تعيد دائماً undefined ولا ترجع مصفوفة جديدة، والصواب استخدام map",
        "لأن المصفوفة nums يجب أن تحتوي على 10 عناصر",
        "لأن العمليات الحسابية تتطلب حلقة while"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 66,
    title: "مصفوفات الثوابت (const with Arrays) وتعديل المحتوى",
    concept: "الإعلان عن مصفوفة بـ const يحمي الرابط المرجعي للمتغير في الذاكرة من إعادة الإسناد (لا يمكنك كتابة myArr = [])، لكنه يسمح بالكامل بتعديل وإضافة وحذف العناصر الداخلية داخل نفس المصفوفة.",
    whyUse: "تضمن أن المتغير يشير دائماً إلى نفس كائن المصفوفة ولا يتم استبداله بالخطأ بنوع آخر، مع الحفاظ على مرونة تحديث محتوياتها طوال دورة حياة البرنامج.",
    browserMechanics: "المتغير في مكدس الذاكرة يحمل عنوان المؤشر فقط؛ دالة push تعدل الخانات المحجوزة في كومة الذاكرة (Heap) دون تغيير قيمة المؤشر المخزن في المكدس.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const#primitive_values_are_immutable",
    breakdown: [
      "حظر إعادة الإسناد: محاولة arr = [1, 2] ترمي TypeError فورياً.",
      "السماح بتعديل المحتوى: دوال arr.push() و arr.pop() و arr[0] = x تعمل بسلاسة تامة.",
      "تجميد المحتوى بالكامل: يتطلب استخدام Object.freeze(arr) لمنع تعديل العناصر الداخلية."
    ],
    bugRepair: {
      brokenCode: "const colors = ['أحمر'];\ncolors = ['أخضر']; // خطأ إعادة إسناد",
      fixedCode: "const colors = ['أحمر'];\ncolors[0] = 'أخضر'; // تعديل العنصر الداخلي",
      question: "لماذا رمى المفسر خطأ TypeError: Assignment to constant variable؟",
      explanation: "المتغير المعرف بـ const لا يقبل إعادة إسناد مصفوفة جديدة بالمعامل =؛ لتغيير المحتوى عدّل العناصر الداخلية colors[0] = 'أخضر'.",
      options: [
        "لأن الألوان لا يمكن تغييرها في المتصفح",
        "لأن const تمنع إعادة إسناد رابط جديد، ويجب تعديل العناصر الداخلية للمصفوفة مباشرة",
        "لأن المصفوفة colors فارغة في الأصل",
        "لأن أسماء المتغيرات يجب أن تكون بحروف كبيرة مع const"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 14: مجموعات وخرائط البيانات (67..73)
  {
    order: 67,
    title: "مجموعات البيانات الفريدة (Set) ومنع التكرار",
    concept: "كائن Set هو بنية بيانات مدمجة في ES6 تخزن مجموعة من القيم الفريدة من أي نوع؛ حيث يتجاهل تلقائياً أي قيمة مكررة يتم إضافتها، مما يجعله الحل الأمثل لتصفية البيانات المكررة.",
    whyUse: "يحل مشكلة إزالة التكرارات من المصفوفات بسطر واحد [...new Set(arr)]، ويوفر أداءً فائقاً لفحص وجود العناصر مقارنة بالمصفوفات.",
    browserMechanics: "يعتمد Set على جدول تجزئة داخلي (Hash Table)؛ مما يجعل فحص وجود القيمة عبر mySet.has(val) عملية فورية ذات كفاءة ثابتة O(1) بدلاً من البحث الخطي O(n).",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
    breakdown: [
      "أمر new Set(): ينشئ مجموعة جديدة خالية من التكرار في الذاكرة.",
      "خاصية size: تعيد عدد العناصر الفريدة المخزنة (بديلاً لخاصية length).",
      "إزالة التكرار التلقائية: إضافة نفس القيمة 5 مرات يبقي منها نسخة واحدة فقط."
    ],
    bugRepair: {
      brokenCode: "let s = new Set([1, 2, 2, 3]);\nconsole.log(s.length); // يريد معرفة عدد العناصر",
      fixedCode: "let s = new Set([1, 2, 2, 3]);\nconsole.log(s.size);",
      question: "لماذا طُبعت القيمة undefined عند محاولة قراءة طول المجموعة؟",
      explanation: "كائن Set لا يملك خاصية length؛ الخاصية القياسية لمعرفة عدد العناصر في Set هي size.",
      options: [
        "لأن Set لا تحتوي على أي عناصر",
        "لأن كائن Set يستخدم الخاصية size لمعرفة عدد العناصر وليس length",
        "لأن التكرار منع قراءة المجموعة",
        "لأن الأرقام يجب أن تُحول إلى نصوص في Set"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 68,
    title: "دوال المجموعة (Set Methods: Add, Has, Delete)",
    concept: "توفر Set دوالاً أساسية لإدارة محتوياتها: add لإضافة قيمة جديدة، و has للتحقق من وجود قيمة بسرعة فائقة، و delete لحذف قيمة محددة، و clear لتفريغ المجموعة كلياً.",
    whyUse: "تُستخدم في تتبع العناصر المختارة في واجهة المستخدم (مثل المعرفات المختارة checkboxes)، وقوائم الكلمات المحظورة، وإدارة الوسوم tags في المدونات.",
    browserMechanics: "تستخدم دالة has خوارزمية المساواة SameValueZero لفحص القيم؛ وهي تعتبر NaN مساوياً لـ NaN (على عكس ===)، وتعامل +0 و -0 كقيمة واحدة متطابقة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has",
    breakdown: [
      "دالة add(value): تضيف القيمة وتعيد كائن Set نفسه مما يسمح بالسلسلة (Chaining).",
      "دالة has(value): تعيد true بسرعة O(1) إذا كانت القيمة مسجلة داخل المجموعة.",
      "دالة delete(value): تحذف القيمة وتعيد true إذا كانت موجودة وتم حذفها بالفعل."
    ],
    bugRepair: {
      brokenCode: "let tags = new Set();\ntags.push('أخبار');",
      fixedCode: "let tags = new Set();\ntags.add('أخبار');",
      question: "لماذا أظهر مفسر JavaScript خطأ TypeError: tags.push is not a function؟",
      explanation: "دالة إضافة العناصر في كائن Set هي add() وليست push() المخصصة للمصفوفات.",
      options: [
        "لأن كلمة أخبار نصية ولا تقبل التخزين في Set",
        "لأن إضافة العناصر في كائن Set تتم عبر دالة add() وليس push()",
        "لأن Set تتطلب مصفوفة أولية دائماً",
        "لأن push تعمل مع الكائنات العادية فقط"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 69,
    title: "العمليات الرياضية على المجموعات (Set Logic: Union & Intersection)",
    concept: "في مواصفات JavaScript الحديثة (ES2024)، تم تزويد Set بدوال رياضية قياسية للعمليات المجموعية: الاتحاد union، والتقاطع intersection، والفرق difference، والفرق المتماثل symmetricDifference.",
    whyUse: "تتيح إجراء مقارنات متقدمة بين مجموعات البيانات دون الحاجة لمكتبات مساعدة خارجية؛ مثل معرفة الأصدقاء المشتركين بين مستخدمين أو المهارات الناقصة في سيرة ذاتية.",
    browserMechanics: "تُنفذ هذه العمليات على مستوى المحرك بكفاءة متناهية عبر جداول التجزئة، وتنشئ كائن Set جديد بالنتيجة دون تعديل المجموعات الأصلية المشاركة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection",
    breakdown: [
      "عملية الاتحاد (Union): تجمع كافة العناصر من المجموعتين مع إزالة أي تكرار.",
      "عملية التقاطع (Intersection): تستخلص فقط العناصر المشتركة الموجودة في كلا المجموعتين.",
      "عملية الفرق (Difference): تستخرج العناصر الموجودة في المجموعة الأولى وغير موجودة في الثانية."
    ],
    bugRepair: {
      brokenCode: "let a = new Set([1, 2]);\nlet b = new Set([2, 3]);\nlet common = [...a].filter(x => b.contains(x));",
      fixedCode: "let a = new Set([1, 2]);\nlet b = new Set([2, 3]);\nlet common = [...a].filter(x => b.has(x));",
      question: "لماذا رمى الكود خطأ TypeError: b.contains is not a function؟",
      explanation: "الدالة القياسية لفحص وجود عنصر داخل Set هي has() وليست contains().",
      options: [
        "لأن المجموعات لا تدعم دالة filter",
        "لأن الدالة القياسية لفحص القيمة في Set هي has() وليس contains()",
        "لأن الأرقام لا يمكن إيجاد التقاطع بينها",
        "لأن معامل النشر ... غير مسموح مع Set"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 70,
    title: "المجموعات الضعيفة (WeakSet) وإدارة الذاكرة",
    concept: "كائن WeakSet هو مجموعة متخصصة لا تخزن سوى كائنات (Objects) فقط وتحتفظ بها بمراجع ضعيفة (Weak References)؛ مما يعني أنها لا تمنع جامع القمامة (Garbage Collector) من حذف الكائن إذا لم يعد له مراجع أخرى.",
    whyUse: "تُستخدم لمنع تسريب الذاكرة (Memory Leaks) في التطبيقات الكبيرة؛ مثل وسم كائنات DOM التي تم التعامل معها، أو تتبع الكائنات النشطة دون احتجازها في الذاكرة للأبد.",
    browserMechanics: "بسبب طبيعة المراجع الضعيفة، فإن عناصر WeakSet غير قابلة للعد (لا توجد خاصية size) وغير قابلة للتكرار بـ for..of؛ لأن الكائنات قد تُحذف في أي لحظة أثناء تشغيل جامع المهملات.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet",
    breakdown: [
      "تخزين الكائنات فقط: محاولة إضافة قيمة أولية مثل رقم أو نص ترمي TypeError فورياً.",
      "المراجع الضعيفة: تسمح لجامع القمامة بتنظيف الذاكرة تلقائياً عند التخلص من الكائن الأصلي.",
      "غياب التكرار: لا يمكن سرد العناصر لأن محتواها غير مضمون البقاء في الذاكرة."
    ],
    bugRepair: {
      brokenCode: "let ws = new WeakSet();\nws.add('مرحبا');",
      fixedCode: "let ws = new WeakSet();\nlet obj = { text: 'مرحبا' };\nws.add(obj);",
      question: "لماذا رمى المفسر خطأ TypeError: Invalid value used in weak set؟",
      explanation: "كائن WeakSet يقبل كائنات (Objects) فقط كمراجع؛ ولا يقبل القيم الأولية مثل النصوص أو الأرقام.",
      options: [
        "لأن كلمة مرحبا تحتوي حروفاً عربية",
        "لأن WeakSet لا تقبل سوى الكائنات (Objects) وترفض القيم الأولية كالنصوص والأرقام",
        "لأن add ليست دالة في WeakSet",
        "لأن WeakSet تتطلب تحديد الحجم مسبقاً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 71,
    title: "خرائط البيانات (Map) ومرونة المفاتيح",
    concept: "كائن Map هو بنية بيانات متقدمة تخزن أزواجاً من المفاتيح والقيم (Key-Value Pairs) مع ميزة استثنائية: يمكن لأي نوع بيانات (بما في ذلك الكائنات والدوال والأرقام) أن يكون مفتاحاً، مع الحفاظ الصارم على ترتيب الإدخال.",
    whyUse: "تتفوق على الكائنات العادية عندما تكون المفاتيح ديناميكية غير نصية، وتوفر خاصية size مباشرة، وتتمتع بأداء أفضل بكثير في عمليات الإضافة والحذف المتكررة.",
    browserMechanics: "تعتمد Map على خريطة تجزئة مرتبة تحافظ على تسلسل إدخال العناصر (Insertion Order) عند التكرار، وتستخدم خوارزمية SameValueZero للمطابقة السريعة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    breakdown: [
      "أمر new Map(): ينشئ خريطة بيانات حديثة ومرنة في الذاكرة.",
      "المفاتيح المتنوعة: إمكانية استخدام كائن DOM أو رقم كمفتاح للبحث.",
      "الحفاظ على الترتيب: تكرار عناصر Map يضمن استرجاعها بنفس ترتيب إدخالها الأصلي."
    ],
    bugRepair: {
      brokenCode: "let m = new Map();\nm['name'] = 'عمر';\nconsole.log(m.size); // يطبع 0!",
      fixedCode: "let m = new Map();\nm.set('name', 'عمر');\nconsole.log(m.size);",
      question: "لماذا بقي حجم الخريطة size يساوي 0 رغم محاولة تخزين القيمة 'عمر'؟",
      explanation: "استخدام الأقواس المربعة m['name'] يضيف الخاصية ككائن عادي ولا يدخلها في بنية الخريطة؛ لتخزين القيم في Map يجب استخدام دالة set().",
      options: [
        "لأن Map لا تقبل المفاتيح النصية",
        "لأن إدخال البيانات في Map يتطلب استخدام دالة set() حصراً لتسجيلها في جدول الخريطة",
        "لأن المتغير m يجب أن يكون ثابتاً const",
        "لأن خاصية size معطلة في الوضع الافتراضي"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 72,
    title: "دوال الخريطة (Map Methods: Set, Get, Delete)",
    concept: "توفر Map واجهة برمجية واضحة وموحدة: set لإضافة زوج مفتاح وقيمة، و get لاسترجاع القيمة المرتبطة بمفتاح، و has للتحقق من وجود المفتاح، و delete لحذف زوج محدد، و clear لتفريغ الخريطة.",
    whyUse: "تُستخدم في تخزين التخزين المؤقت للبيانات (Caching/Memoization)؛ حيث يُستخدم كائن الطلب كمفتاح وترتبط به الاستجابة المحسوبة للرجوع السريع إليها.",
    browserMechanics: "عمليات get و has تعمل بزمن شبه ثابت O(1) بفضل جدول الفهارس الداخلي، ولا تتأثر بوجود خصائص نموذج أولي افتراضية كما يحدث في الكائنات العادية.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get",
    breakdown: [
      "دالة set(key, val): تضيف أو تحدث الزوج وتعيد كائن الخريطة نفسه.",
      "دالة get(key): تعيد القيمة المخزنة المقابلة للمفتاح أو undefined إذا لم تجده.",
      "دالة has(key): تتحقق من وجود المفتاح دون الحاجة لقراءة قيمته الكاملة."
    ],
    bugRepair: {
      brokenCode: "let userRoles = new Map();\nuserRoles.set('أحمد', 'مشرف');\nlet role = userRoles.find('أحمد');",
      fixedCode: "let userRoles = new Map();\nuserRoles.set('أحمد', 'مشرف');\nlet role = userRoles.get('أحمد');",
      question: "لماذا رمى المفسر خطأ TypeError: userRoles.find is not a function؟",
      explanation: "الدالة القياسية لاسترجاع قيمة من كائن Map بواسطة المفتاح هي get() وليست find().",
      options: [
        "لأن المفاتيح العربية غير مدعومة في Map",
        "لأن قراءة القيم في كائن Map تتم عبر دالة get() وليس find()",
        "لأن الخريطة userRoles فارغة في الذاكرة",
        "لأن get مخصصة للمصفوفات فقط"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 73,
    title: "الخرائط الضعيفة (WeakMap) وتخزين البيانات الخاصة",
    concept: "كائن WeakMap هو خريطة خاصة تقبل كائنات فقط كمفاتيح وتحتفظ بها بمراجع ضعيفة؛ مما يتيح حذف المفتاح وقيمته المرتبطة تلقائياً من الذاكرة بمجرد تدمير الكائن الأصلي بواسطة جامع القمامة.",
    whyUse: "تعد التقنية الأساسية لحفظ البيانات الخاصة (Private Data) للكائنات دون تلويث خصائصها، وربط بيانات إضافية بعناصر واجهة مستخدم DOM تنظف نفسها ذاتياً عند إزالة العنصر من الصفحة.",
    browserMechanics: "لا يمكن استعراض محتويات WeakMap أو معرفة حجمها لأن مفاتيحها مراجع ضعيفة معرضة للتحلل في أي لحظة مع دورات Garbage Collection في المتصفح.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
    breakdown: [
      "المفاتيح كائنات فقط: المفتاح يجب أن يكون Object (محاولة وضع نص كمفتاح ترمي خطأ).",
      "حماية الذاكرة من التسريب: تحذف البيانات المرتبطة تلقائياً فور فقدان مرجع الكائن الأصلي.",
      "حفظ الخصوصية: لا يمكن قراءة القيمة إلا لمن يملك المرجع الدقيق لنفس الكائن المفتاح."
    ],
    bugRepair: {
      brokenCode: "let wm = new WeakMap();\nwm.set('key1', 'بيانات');",
      fixedCode: "let wm = new WeakMap();\nlet k = {};\nwm.set(k, 'بيانات');",
      question: "لماذا رفض كائن WeakMap تسجيل المفتاح 'key1' وأظهر خطأ TypeError؟",
      explanation: "في WeakMap، المفاتيح يجب أن تكون كائنات (Objects) حصراً؛ ولا تقبل القيم الأولية مثل النصوص أو الأرقام كمفاتيح.",
      options: [
        "لأن القيمة 'بيانات' غير صالحة",
        "لأن مفاتيح WeakMap يجب أن تكون كائنات Objects ولا تقبل نصوصاً أولية",
        "لأن set ليست دالة في WeakMap",
        "لأن WeakMap تتطلب مصفوفة في تعريفها"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 15: تتبّع العناصر والمكررات (74..77)
  {
    order: 74,
    title: "بروتوكول التكرار وحلقة for...of الحديثة",
    concept: "حلقة for...of هي أداة التكرار الأحدث والأسهل في ES6 للمرور المباشر على قيم الكائنات القابلة للتكرار (Iterables)؛ مثل المصفوفات والنصوص ومجموعات Set وخرائط Map، بأسلوب مباشر ومقروء.",
    whyUse: "توفر وصولاً مباشراً لقيم العناصر دون الحاجة للتعامل مع أرقام الفهارس أو كتابة شروط توقف معقدة، وتدعم أوامر المقاطعة break و continue بسلاسة تامة.",
    browserMechanics: "تستدعي حلقة for...of دالة الرمز الخاص [Symbol.iterator] الموجودة في الكائن، وتستمر في استدعاء الدالة next() واستخراج الخاصية value حتى تصبح done تساوي true.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
    breakdown: [
      "صيغة for (const item of list): تقرأ كل قيمة مباشرة في دورة منفصلة.",
      "دعم الكائنات المكررة: تعمل مع Arrays و Strings و Sets و Maps و NodeLists.",
      "الفرق عن for...in: حلقة for...of تقرأ القيم، بينما for...in تقرأ أسماء المفاتيح والفهارس."
    ],
    bugRepair: {
      brokenCode: "let arr = ['أ', 'ب'];\nfor (let item in arr) {\n  console.log(item); // يطبع '0' و '1' الفهارس!\n}",
      fixedCode: "let arr = ['أ', 'ب'];\nfor (let item of arr) {\n  console.log(item); // يطبع 'أ' و 'ب' القيم!\n}",
      question: "لماذا طُبعت أرقام الفهارس 0 و 1 بدلاً من قيم العناصر 'أ' و 'ب'؟",
      explanation: "حلقة for...in تمر على أسماء الخصائص والفهارس؛ لقراءة قيم العناصر الفعلية في المصفوفات استخدم حلقة for...of.",
      options: [
        "لأن الحروف العربية تتحول لأرقام في الحلقات",
        "لأن حلقة for...in تقرأ الفهارس، بينما حلقة for...of هي المخصصة لقراءة القيم مباشرة",
        "لأن المصفوفة arr تفتقر إلى دالة toString",
        "لأن console.log لا تعرض سوى الأرقام مع in"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 75,
    title: "الكائنات القابلة للتكرار (Iterables) وبروتوكول Symbol.iterator",
    concept: "الكائن القابل للتكرار (Iterable) هو أي كائن يطبق بروتوكول التكرار في JavaScript عبر امتلاكه لخاصية بمفتاح الرمز المعياري Symbol.iterator، والتي تعيد كائناً مكرراً متوافقاً مع اللغة.",
    whyUse: "يتيح للكائنات المخصصة التي ينشئها المطور التناغم التام مع ميزات JavaScript الأساسية؛ مثل حلقة for...of، ومعامل النشر والتفكيك (...spread)، ومصفوفات Array.from.",
    browserMechanics: "يبحث المحرك عن الدالة المعرفة تحت المفتاح Symbol.iterator؛ فإذا وجدت يعتبر الكائن مكرراً ويفعل معه آليات التفكيك والتكرار التلقائي في بيئة التنفيذ.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols",
    breakdown: [
      "الرمز [Symbol.iterator]: المفتاح الخاص الذي يمنح الكائن صفة القابلية للتكرار.",
      "كائن المكرر: يعيد كائناً يملك دالة next() تعيد في كل دورة { value, done }.",
      "معامل النشر [...iterable]: يفكك كافة عناصر الكائن القابل للتكرار داخل مصفوفة جديدة."
    ],
    bugRepair: {
      brokenCode: "let range = { from: 1, to: 3 };\nfor (let n of range) console.log(n); // TypeError",
      fixedCode: "let range = {\n  from: 1, to: 3,\n  [Symbol.iterator]() {\n    let curr = this.from, last = this.to;\n    return { next: () => ({ value: curr, done: curr++ > last }) };\n  }\n};\nfor (let n of range) console.log(n);",
      question: "لماذا رمى المفسر خطأ TypeError: range is not iterable عند محاولة استخدام for...of؟",
      explanation: "الكائنات العادية ليست قابلة للتكرار افتراضياً؛ لتكرارها بـ for...of يجب تزويدها بدالة تحت مفتاح الرمز القياسي [Symbol.iterator].",
      options: [
        "لأن حلقة for...of لا تعمل إلا مع النصوص فقط",
        "لأن الكائن يفتقر لتطبيق بروتوكول التكرار المعياري عبر الرمز [Symbol.iterator]",
        "لأن الأرقام من 1 إلى 3 غير معرفة",
        "لأن كلمة range محجوزة في لغة JavaScript"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 76,
    title: "المكررات (Iterators) ودالة الانتقال next()",
    concept: "المكرر (Iterator) هو كائن يحتوي على دالة تسمى next()؛ في كل استدعاء لها تعيد كائناً بنتيجة موحدة تحمل خاصيتين: value (القيمة الحالية) و done (قيمة منطقية توضح هل انتهى التكرار).",
    whyUse: "تسمح بالتحكم الدقيق في التكرار خطوة بخطوة عند الطلب (Lazy Evaluation)، مما يوفر موارد الذاكرة ولا يحسب القيمة التالية إلا عند الحاجة الفعلية لها.",
    browserMechanics: "يحتفظ كائن المكرر بحالته الداخلية وموضعه الحالي في الذاكرة عبر Closure؛ وعندما تصبح done: true يتوقف المحرك عن الاستدعاءات اللاحقة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol",
    breakdown: [
      "دالة next(): المحرك الأساسي لطلب العنصر التالي في السلسلة.",
      "خاصية { value }: تحمل القيمة الناتجة من الدورة الحالية.",
      "خاصية { done: true/false }: تعلن للمتصفح هل ما زال هناك عناصر متبقية أم انتهت السلسلة."
    ],
    bugRepair: {
      brokenCode: "let iter = ['أ'][Symbol.iterator]();\nlet step = iter.next();\nconsole.log(step.val); // يريد 'أ'",
      fixedCode: "let iter = ['أ'][Symbol.iterator]();\nlet step = iter.next();\nconsole.log(step.value);",
      question: "لماذا ظهرت القيمة undefined عند محاولة قراءة قيمة خطوة المكرر؟",
      explanation: "الخاصية القياسية في كائن المكرر التي تحمل القيمة الناتجة اسمها value بالكامل وليس val.",
      options: [
        "لأن الحرف 'أ' لم يتم تخزينه في المكرر",
        "لأن اسم الخاصية القياسي في بروتوكول المكرر هو value وليس val",
        "لأن المكرر يتطلب حلقة for...of حصراً",
        "لأن دالة next لا تعيد كائنات"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 77,
    title: "دوال التوليد (Generators) وإنتاج القيم المعلقة yield",
    concept: "دالة التوليد (Generator Function) هي دالة خاصة تُكتب بـ function* وتستطيع إيقاف تنفيذها مؤقتاً عند الكلمة المفتاحية yield وإرجاع قيمة، ثم استئناف التنفيذ لاحقاً من نفس النقطة التي توقفت عندها.",
    whyUse: "توفر طريقة سهلة وموجزة لكتابة المكررات دون إدارة كائنات وحالات يدوية معقدة، وتتيح توليد سلاسل لا نهائية من البيانات (مثل تسلسل فيبوناتشي) دون استهلاك الذاكرة.",
    browserMechanics: "عند استدعاء دالة المولد لا تنفذ كودها فوراً بل تعيد كائن Generator خاص؛ وعند استدعاء gen.next() ينفذ الكود حتى أول كلمة yield ويعلق إطار التنفيذ في الذاكرة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*",
    breakdown: [
      "العلامة النجمية function*: تميز دالة التوليد عن الدوال التقليدية.",
      "الكلمة المفتاحية yield: توقف الدالة مؤقتاً وتخرج القيمة إلى المستدعي.",
      "استئناف التنفيذ gen.next(): يوقظ الدالة لتتابع عملها من بعد سطر yield الأخير."
    ],
    bugRepair: {
      brokenCode: "function* gen() {\n  return 1;\n  return 2;\n}\nlet g = gen();\nconsole.log(g.next().value, g.next().value);",
      fixedCode: "function* gen() {\n  yield 1;\n  yield 2;\n}\nlet g = gen();\nconsole.log(g.next().value, g.next().value);",
      question: "لماذا لم تنتج الدالة القيمة 2 في الاستدعاء الثاني وأنهت عملها فوراً؟",
      explanation: "كلمة return تنهي دالة التوليد نهائياً وتضع done: true؛ لتمرير القيم تباعاً مع تعليق الدالة يجب استخدام الكلمة المفتاحية yield.",
      options: [
        "لأن دوال التوليد لا تقبل أكثر من رقم واحد",
        "لأن إنتاج القيم المعلقة يتطلب استخدام كلمة yield بدلاً من return التي تنهي الدالة تماماً",
        "لأن دالة next يجب أن تُستدعى ثلاث مرات",
        "لأن المتغير g يجب أن يُعرف بـ const"
      ],
      correctOptionIndex: 1
    }
  }
];

function build() {
  console.log("Authoring Skills 11..15 (Lessons 50..77)...");
  const lessons = skillData.map(meta => createLesson(meta));

  // Chunk 11: Skill 11 (50..54)
  const chunk11 = lessons.slice(0, 5);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_11_scope_closures.json"), JSON.stringify(chunk11, null, 2), "utf8");

  // Chunk 12: Skill 12 (55..59)
  const chunk12 = lessons.slice(5, 10);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_12_dates_times.json"), JSON.stringify(chunk12, null, 2), "utf8");

  // Chunk 13: Skill 13 (60..66)
  const chunk13 = lessons.slice(10, 17);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_13_arrays_manipulation.json"), JSON.stringify(chunk13, null, 2), "utf8");

  // Chunk 14: Skill 14 (67..73)
  const chunk14 = lessons.slice(17, 24);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_14_sets_maps.json"), JSON.stringify(chunk14, null, 2), "utf8");

  // Chunk 15: Skill 15 (74..77)
  const chunk15 = lessons.slice(24, 28);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_15_iterators_generators.json"), JSON.stringify(chunk15, null, 2), "utf8");

  console.log("✔ Skills 11..15 authored and verified successfully! Total lessons:", lessons.length);
  return lessons;
}

if (require.main === module) {
  build();
}

module.exports = { build, skillData };

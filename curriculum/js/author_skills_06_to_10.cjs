/**
 * curriculum/js/author_skills_06_to_10.cjs
 * Skills 6 through 10 (Lessons 27 to 49 - 23 lessons)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, JS_TOPICS } = require("./builder_helper.cjs");
const { JS_RULES } = require("./rules_catalog.cjs");

const OUTPUT_DIR = path.resolve(__dirname);

const skillData = [
  // Skill 6: كتابة نصوص قابلة للتغيير (27..30)
  {
    order: 27,
    title: "السلاسل النصية (Strings) والتعامل مع النصوص",
    concept: "السلسلة النصية String هي تسلسل من الأحرف والرموز المستخدمة لتمثيل النصوص في البرمجة، وتُحاط إما بعلامات تنصيص مفردة ' أو مزدوجة \" أو علامة النبرة الخلفية `، وتعتبر من الأنواع الأولية غير القابلة للتعديل المباشر (Immutable).",
    whyUse: "تُستخدم النصوص في كافة جوانب تطبيقات الويب؛ من رسائل الترحيب وأسماء المستخدمين إلى عناوين URL ومحتوى المقالات وواجهات اللغات المتعددة.",
    browserMechanics: "تخزن محركات JavaScript السلاسل النصية بترميز UTF-16؛ وكل حرف يمثل خانة مفهرسة تبدأ من الصفر، وعند تعديل أي نص ينشئ المحرك سلسلة نصية جديدة تماماً في الذاكرة بدلاً من تعديل الأصلية.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
    breakdown: [
      "علامات التنصيص: تحدد بداية ونهاية السلسلة النصية بوضوح.",
      "خاصية length: تعيد عدد الأحرف والرموز المكونة للنص بدقة.",
      "محارف الهروب (Escape Characters): استخدام \\ لتضمين علامات التنصيص أو السطور الجديدة داخل النص."
    ],
    bugRepair: {
      brokenCode: "let greeting = 'أهلًا بك في عالم البرمجة\";",
      fixedCode: "let greeting = 'أهلًا بك في عالم البرمجة';",
      question: "لماذا رمى المفسر خطأ SyntaxError: Invalid or unexpected token؟",
      explanation: "نوع علامة التنصيص في بداية النص يجب أن يطابق تماماً نوع علامة الإغلاق في نهايته (مفردة مع مفردة، أو مزدوجة مع مزدوجة).",
      options: [
        "لأن النصوص العربية لا تقبل علامات التنصيص",
        "لأن علامة البداية المفردة لم تطابق علامة النهاية المزدوجة",
        "لأن كلمة greeting محجوزة في لغة JavaScript",
        "لأن الفاصلة المنقوطة يجب أن توضع داخل النص"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 28,
    title: "قوالب النصوص (Template Literals) والدمج الديناميكي",
    concept: "قوالب النصوص هي ميزة حديثة أُضيفت في ES6 تُكتب بين علامتي النبرة الخلفية (` `)، وتتيح كتابة نصوص متعددة الأسطر بسهولة، ودمج المتغيرات والتعابير الحسابية بداخلها مباشرة باستخدام الصيغة ${expression}.",
    whyUse: "تنهي المعاناة القديمة لدمج النصوص بمعامل الزائد +، وتجعل توليد قوالب HTML الديناميكية وقراءة المتغيرات داخل الجمل أمراً في غاية السلاسة والوضوح.",
    browserMechanics: "يقوم مفسر JavaScript بتقييم التعابير الموجودة داخل ${} وحساب نتيجتها، ثم يحولها إلى نصوص ويدمجها في مصفوفة السلاسل الثابتة بكفاءة عالية في الذاكرة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
    breakdown: [
      "علامة النبرة الخلفية (`): تفتح وتغلق قالب النص الحديث.",
      "صيغة الإقحام ${var}: تدمج قيمة المتغير أو ناتج التعبير الحسابي مباشرة في النص.",
      "تعدد الأسطر: تدعم النزول لسطر جديد دون الحاجة لمحرف \\n."
    ],
    bugRepair: {
      brokenCode: "let user = 'سارة';\nlet msg = 'مرحبًا ${user}';",
      fixedCode: "let user = 'سارة';\nlet msg = `مرحبًا ${user}`;",
      question: "لماذا طُبع النص '${user}' حرفياً بدلاً من طباعة اسم المستخدم 'سارة'؟",
      explanation: "ميزة إقحام المتغيرات ${} تعمل حصراً مع قوالب النصوص المحاطة بالنبرة الخلفية ` `، ولا تعمل مع علامات التنصيص العادية ' ' أو \" \".",
      options: [
        "لأن اسم المتغير يجب أن يكون بأحرف كبيرة",
        "لأن صيغة ${} تتطلب استخدام علامات النبرة الخلفية ` ` وليس علامات التنصيص العادية",
        "لأن المتغير user غير معرّف في الذاكرة",
        "لأن دمج النصوص يتطلب استدعاء دالة concat"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 29,
    title: "دوال السلاسل النصية (String Methods) ومعالجة النصوص",
    concept: "توفر JavaScript ترسانة غنية من الدوال الجاهزة لمعالجة النصوص؛ مثل toUpperCase و toLowerCase لتغيير الحالة، و trim لإزالة الفراغات، و slice لاستقطاع أجزاء، و replace لاستبدال الكلمات.",
    whyUse: "تعد أساسية لتنظيف مدخلات المستخدمين (Sanitization) في حقول التسجيل، ومطابقة الكلمات المفتاحية، وتنسيق أرقام الهواتف والبريد الإلكتروني قبل الحفظ.",
    browserMechanics: "بما أن النصوص كائنات أولية غير قابلة للتعديل (Primitive & Immutable)، فإن كافة دوال النصوص تعيد سلسلة نصية جديدة كلياً في الذاكرة ولا تعدل المتغير الأصلي مطلقاً.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#methods",
    breakdown: [
      "الدالة toUpperCase(): تعيد نسخة من النص بحروف كبيرة دون المساس بالأصل.",
      "الدالة trim(): تزيل المسافات البيضاء الزائدة من البداية والنهاية.",
      "الدالة replace('a', 'b'): تستبدل أول ظهور للكلمة بالقيمة الجديدة المطلوبة."
    ],
    bugRepair: {
      brokenCode: "let text = '  مرحبًا  ';\ntext.trim();\nconsole.log(text.length); // يريد طول النص بعد التنظيف",
      fixedCode: "let text = '  مرحبًا  ';\ntext = text.trim();\nconsole.log(text.length);",
      question: "لماذا بقي طول النص الأصلي 10 كما هو ولم يتم حذف المسافات الزائدة؟",
      explanation: "دالة trim لا تعدل المتغير الأصلي لأن النصوص غير قابلة للتعديل؛ يجب إسناد النتيجة الجديدة إلى المتغير text = text.trim().",
      options: [
        "لأن دالة trim لا تدعم اللغة العربية",
        "لأن نصوص JavaScript غير قابلة للتعديل ويجب إعادة إسناد ناتج الدالة للمتغير",
        "لأن length لا تعمل مع النصوص المنظفة",
        "لأن المسافات لا يمكن حذفها من السلاسل النصية"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 30,
    title: "البحث في النصوص (String Search) والتحقق من المحتوى",
    concept: "تتيح دوال البحث في السلاسل النصية فحص وجود كلمات معينة ومواقعها داخل النص؛ مثل includes للتحقق من الوجود، و indexOf لمعرفة موضع الفهرس، و startsWith و endsWith لفحص البدايات والنهايات.",
    whyUse: "تُستخدم في محركات البحث داخل الموقع، وفلترة القوائم أثناء كتابة المستخدم في خانة البحث، والتحقق من امتدادات الملفات (مثل التأكد من انتهاء الصورة بـ .png).",
    browserMechanics: "تجري هذه الدوال مسحاً خطياً (Linear Scan) للأحرف في الذاكرة، وتقارن الرموز عبر فهارس UTF-16 وتعيد قيم Boolean أو أرقام صحيحة (-1 عند عدم العثور).",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf",
    breakdown: [
      "الدالة includes('word'): تعيد true إذا كانت الكلمة موجودة في أي موضع داخل النص.",
      "الدالة indexOf('word'): تعيد رقم فهرس بداية الكلمة أو -1 إذا لم تجدها.",
      "الدالة startsWith('prefix'): تتحقق مما إذا كان النص يبدأ ببادئة محددة."
    ],
    bugRepair: {
      brokenCode: "let email = 'user@test.com';\nif (email.contains('@')) {\n  console.log('صحيح');\n}",
      fixedCode: "let email = 'user@test.com';\nif (email.includes('@')) {\n  console.log('صحيح');\n}",
      question: "لماذا رمى الكود خطأ TypeError: email.contains is not a function؟",
      explanation: "الدالة القياسية في JavaScript للتحقق من احتواء النص على جزء معين هي includes وليست contains.",
      options: [
        "لأن الرمز @ غير مدعوم في نصوص البرمجة",
        "لأن اسم الدالة القياسي في JavaScript هو includes وليس contains",
        "لأن البريد الإلكتروني يجب أن يفحص بدالة validate()",
        "لأن الشروط لا تقبل استدعاء دوال النصوص"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 7: تحويل الأرقام واستخدامها (31..35)
  {
    order: 31,
    title: "الأرقام في JavaScript والنظام العشري",
    concept: "تتعامل JavaScript مع كافة الأرقام (الصحيحة والعشرية) كنوع بيانات موحد يسمى Number، يعتمد تمثيل النقطة العائمة المزدوجة الدقة (64-bit Floating Point) وفق معيار IEEE 754 الدولي.",
    whyUse: "تُستخدم لتمثيل كافة المقادير العددية في الويب: من أسعار السلع والإحداثيات الجغرافية إلى النسب المئوية وعدادات الزيارات.",
    browserMechanics: "بسبب طبيعة تمثيل الفاصلة العائمة الثنائية، قد تنتج بعض الكسور أخطاء تقريب طفيفة شهيرة (مثل 0.1 + 0.2 ينتج 0.30000000000000004)؛ لذا تُستخدم دوال التقريب عند التعامل مع العملات.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
    breakdown: [
      "نوع Number: يغطي الأعداد الصحيحة والعشرية والموجبة والسالبة.",
      "أقصى عدد صحيح آمن: Number.MAX_SAFE_INTEGER يحدد النطاق الدقيق للأرقام الصحيحة.",
      "القيم الخاصة: تتضمن Infinity للأعداد اللانهائية و NaN للحسابات غير المعرفة."
    ],
    bugRepair: {
      brokenCode: "let price = 1,000;\nconsole.log(price);",
      fixedCode: "let price = 1000;\nconsole.log(price);",
      question: "لماذا اعتبر المتصفح الفاصلة في 1,000 خطأ صياغة أو تقسيماً لمتغيرات متعددة؟",
      explanation: "في لغات البرمجة لا تُستخدم الفاصلة العادية ',' كفاصل للآلاف داخل الأرقام البرمجية؛ اكتب 1000 أو 1_000 باستخدام الشرطة السفلية.",
      options: [
        "لأن الأرقام لا يمكن أن تزيد عن 999",
        "لأن الفاصلة العادية تُفسر كمعامل برمجي، والصواب كتابة 1000 أو 1_000",
        "لأن المتغير price يجب أن يكون نصاً",
        "لأن console.log لا تطبع أعداد الآلاف"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 32,
    title: "دوال الأرقام (Number Methods) والتقريب والتنسيق",
    concept: "توفر JavaScript دوال متخصصة للتحكم في عرض الأرقام وتقريبها؛ مثل toFixed لتحديد عدد الخانات العشرية، و toPrecision لتحديد الدقة الكلية، و toString لتحويل الرقم لنص بأنظمة عد مختلفة.",
    whyUse: "تعد ضرورية في المتاجر الإلكترونية لتنسيق أسعار السلع بخانتين عشريتين (مثل 19.99)، وعرض النتائج الإحصائية دون كسور طويلة تشوه مظهر الواجهة.",
    browserMechanics: "تقوم دالة toFixed(n) بتقريب الرقم عشرياً وتحويله إلى سلسلة نصية String؛ لذا إذا أردت إجراء عمليات حسابية إضافية عليها يجب إعادة تحويلها إلى رقم.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed",
    breakdown: [
      "الدالة toFixed(2): تقرب الكسر العشري وتعيد نصاً بخانتين بعد الفاصلة.",
      "الدالة parseInt(str): تستخرج عدداً صحيحاً من بداية السلسلة النصية.",
      "الدالة parseFloat(str): تستخرج عدداً عشرياً محتفظة بالفاصلة العشرية."
    ],
    bugRepair: {
      brokenCode: "let total = 10.556;\nlet res = total.toFixed(2);\nlet next = res + 5;\nconsole.log(next); // يريد 15.56",
      fixedCode: "let total = 10.556;\nlet res = Number(total.toFixed(2));\nlet next = res + 5;\nconsole.log(next);",
      question: "لماذا طُبع الناتج '10.565' بدلاً من القيمة الحسابية 15.56؟",
      explanation: "دالة toFixed تعيد سلسلة نصية String وليس رقماً؛ لذا قام المعامل + بدمج النص مع 5 بدلاً من جمعهما رياضياً.",
      options: [
        "لأن رقم 10.556 لا يمكن تقريبه",
        "لأن toFixed تعيد نصاً، ويجب تحويله إلى رقم بواسطة Number() قبل إجراء الجمع",
        "لأن الجمع يجب أن يسبق التقريب دائماً",
        "لأن دالة toFixed تقبل خانة واحدة فقط"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 33,
    title: "خصائص الأرقام والثوابت الرقمية (Number Properties)",
    concept: "يحتوي كائن Number القياسي على ثوابت وخصائص معيارية أساسية؛ مثل MAX_VALUE و MIN_VALUE و EPSILON و POSITIVE_INFINITY و NaN، بالإضافة لدوال الفحص مثل isInteger و isNaN.",
    whyUse: "تساعد في حماية العمليات الحسابية من التجاوز السعوي (Overflow)، واكتشاف القيم غير الصالحة، وفحص دقة الكسور المتناهية في الصغر.",
    browserMechanics: "تُعرّف هذه الخصائص كسمات ثابتة للقراءة فقط (Read-Only) على الدالة البنائية Number في البيئة العالمية للمتصفح، ولا يمكن تعديلها أو تجاوزها.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#static_properties",
    breakdown: [
      "Number.MAX_SAFE_INTEGER: أعلى عدد صحيح (2^53 - 1) يمكن حسابه بدقة مطلقة.",
      "Number.isInteger(val): تفحص ما إذا كانت القيمة عدداً صحيحاً خالياً من الكسور.",
      "Number.isNaN(val): فحص دقيق وصارم لا يخلط بين النصوص والقيم غير الرقمية."
    ],
    bugRepair: {
      brokenCode: "let val = NaN;\nif (val === NaN) {\n  console.log('قيمة غير صالحة');\n}",
      fixedCode: "let val = NaN;\nif (Number.isNaN(val)) {\n  console.log('قيمة غير صالحة');\n}",
      question: "لماذا لم يتحقق الشرط رغم أن قيمة val هي بالفعل NaN؟",
      explanation: "في معيار JavaScript، القيمة NaN هي القيمة الوحيدة التي لا تساوي نفسها أبداً (NaN === NaN ينتج false)؛ يجب استخدام Number.isNaN.",
      options: [
        "لأن NaN تساوي الصفر دائماً",
        "لأن NaN لا تساوي نفسها بالمقارنة العادية، ويجب فحصها باستخدام Number.isNaN()",
        "لأن المتغير val يجب أن يكون نصاً",
        "لأن المقارنة تتطلب معامل المساواة المزدوج =="
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 34,
    title: "العمليات على مستوى البت (Bitwise Operators)",
    concept: "تتعامل معاملات البت مع الأرقام كأعداد ثنائية مكوّنة من 32 بت (أصفار وآحاد)؛ وتشمل عمليات العطف البتي (&)، والاختيار البتي (|)، والـ XOR (^)، والنفي (~)، والإزاحة يميناً ويساراً (<< و >>).",
    whyUse: "تُستخدم في البرمجة منخفضة المستوى: مثل ضغط البيانات، وتشفير الألوان، وإدارة أعلام الصلاحيات (Bitmasks) بأقصى كفاءة تخزينية وسرعة معالجة.",
    browserMechanics: "قبل إجراء العملية، يحول محرك JavaScript الرقم العائم 64-bit مؤقتاً إلى عدد صحيح ثنائي 32-bit، ينفذ العملية على مستوى البتات، ثم يعيد النتيجة كرقم عشري قياسي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND",
    breakdown: [
      "المعامل &: يطابق كل بتين متقابلين ويعيد 1 إذا كان كلاهما 1.",
      "المعامل |: يعيد 1 إذا كان أحد البتين على الأقل 1.",
      "معاملات الإزاحة <<: تزيح البتات لليسار وهي وسيلة سريعة للضرب في قوى العدد 2."
    ],
    bugRepair: {
      brokenCode: "let perm = 5; // 0101 ثنائي\nlet hasWrite = perm and 2;",
      fixedCode: "let perm = 5;\nlet hasWrite = perm & 2;",
      question: "لماذا رفض المفسر كلمة and في عملية فحص البتات؟",
      explanation: "في JavaScript، رمز معامل العطف البتي هو & المفردة، ولا توجد كلمة مفتاحية باسم and في اللغة.",
      options: [
        "لأن عمليات البت تتطلب استخدام && المزدوجة",
        "لأن معامل العطف البتي هو الرمز & وليس كلمة and الإنجليزية",
        "لأن الرقم 5 لا يحتوي على بتات ثنائية",
        "لأن متغيرات البت تتطلب نوعاً خاصاً باسم byte"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 35,
    title: "الأعداد الكبيرة (BigInt) والعمليات الرياضية الدقيقة",
    concept: "النوع الأولي BigInt أُضيف لتمكين JavaScript من تخزين وإجراء العمليات الحسابية على أعداد صحيحة ذات حجم غير محدود بأمان مطلق وتجاوز سقف MAX_SAFE_INTEGER، ويُكتب بإلحاق الحرف n بنهاية الرقم.",
    whyUse: "ضروري لتطبيقات التشفير والعملات المشفرة والمعاملات المالية الدقيقة ومعرفات قواعد البيانات الضخمة (64-bit IDs) التي تفقد دقتها مع نوع Number العادي.",
    browserMechanics: "يخصص المحرك مساحة ذاكرة ديناميكية تتوسع بحسب حجم الرقم؛ ويحظر خلط أرقام BigInt مع أرقام Number العادية في نفس العملية الحسابية منعاً لفقدان الدقة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
    breakdown: [
      "اللاحقة n: تميز رقم BigInt عن الرقم العادي (مثل 9007199254740993n).",
      "دالة البناء BigInt(val): تحول النصوص والأرقام إلى صيغة BigInt بدقة كاملة.",
      "حظر الخلط المباشر: محاولة جمع 10n + 5 ترمي خطأ TypeError لحماية الدقة."
    ],
    bugRepair: {
      brokenCode: "let big = 9007199254740995n;\nlet total = big + 5;",
      fixedCode: "let big = 9007199254740995n;\nlet total = big + 5n;",
      question: "لماذا رمى المفسر خطأ TypeError: Cannot mix BigInt and other types؟",
      explanation: "تمنع JavaScript خلط أرقام BigInt مع الأرقام العادية Number في العمليات الحسابية؛ يجب تحويل 5 إلى 5n أو BigInt(5).",
      options: [
        "لأن أرقام BigInt لا تدعم عملية الجمع",
        "لأنه لا يمكن خلط نوع BigInt مع نوع Number العادي مباشرة ويجب كتابة 5n",
        "لأن الرقم big تجاوز سعة الذاكرة القصوى",
        "لأن علامة الزائد + مخصصة للنصوص فقط مع BigInt"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 8: إنشاء الدوال واستدعاؤها (36..39)
  {
    order: 36,
    title: "مفهوم الدوال (Functions) وتنظيم الشيفرة البرمجية",
    concept: "الدالة هي كتلة أوامر برمجية مستقلة تحمل اسماً دلالياً، تُعرّف مرة واحدة لحل مهمة محددة، ويمكن استدعاؤها وتشغيلها مرات غير محدودة من أي مكان في البرنامج بمدخلات مختلفة.",
    whyUse: "تطبيق مباشر لمبدأ DRY (لا تكرر نفسك - Don't Repeat Yourself)؛ فبدلاً من إعادة كتابة 20 سطراً لحساب الضريبة، يُكتب الكود داخل دالة وتُستدعى بسطر واحد أينما لزم الأمر.",
    browserMechanics: "عند تعريف دالة، ينشئ المحرك كائن دالة في الذاكرة يحمل خاصية الكود والبيئة المعجمية (Scope Chain)، ويسجل اسمها في سياق التنفيذ الحالي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    breakdown: [
      "الكلمة المفتاحية function: تعلن عن إنشاء دالة برمجية جديدة.",
      "اسم الدالة: معرّف دلالي يصف ما تفعله الدالة بوضوح.",
      "كتلة الأوامر { ... }: تحتوي على الخطوات التنفيذية التي ستعمل عند استدعاء الدالة."
    ],
    bugRepair: {
      brokenCode: "funtion sayHi() {\n  console.log('مرحبًا');\n}",
      fixedCode: "function sayHi() {\n  console.log('مرحبًا');\n}",
      question: "لماذا أظهر مفسر JavaScript خطأ SyntaxError عند سطر إعلان الدالة؟",
      explanation: "الكلمة المفتاحية القياسية لتعريف الدوال في JavaScript هي function؛ كتابتها funtion خطأ إملائي يمنع المحرك من التعرف عليها.",
      options: [
        "لأن اسم الدالة sayHi يجب أن يكون باللغة العربية",
        "لأن الكلمة المفتاحية كُتبت بخطأ إملائي funtion والصواب هو function",
        "لأن الأقواس المتعرجة غير مدعومة في الدوال",
        "لأن الدالة تفتقر إلى وجود معامل إرجاع return"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 37,
    title: "استدعاء الدوال (Function Invocation) ودورة التنفيذ",
    concept: "تعريف الدالة لا يشغل كودها تلقائياً؛ لتشغيل الأوامر يجب استدعاؤها صراحة بكتابة اسم الدالة متبوعاً بقوسين دائريين ()، مع تمرير أي قيم مطلوبة بداخلها.",
    whyUse: "يفصل بين مرحلة التصميم ومرحلة التنفيذ؛ مما يتيح ربط استدعاء الدالة بأحداث تفاعلية مثل نقر المستخدم على زر أو وصول رد من الخادم.",
    browserMechanics: "عند استدعاء الدالة، ينشئ المحرك إطار تنفيذ جديد (Execution Context) ويدفعه إلى قمة مكدس الاستدعاءات (Call Stack)؛ وفور انتهاء الدالة يُزال الإطار وتعود السيطرة للسطر التالي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#calling_functions",
    breakdown: [
      "اسم الدالة بدون أقواس myFunc: يشير إلى كائن الدالة نفسه دون تشغيله.",
      "عامل الاستدعاء (): يشغل كائن الدالة فعلياً وينفذ أسطرها في المكدس.",
      "تسلسل الاستدعاء: تنتظر الدالة المنادية حتى تفرغ الدالة المستدعاة من عملها."
    ],
    bugRepair: {
      brokenCode: "function showMsg() {\n  console.log('تم التنفيذ');\n}\nshowMsg;",
      fixedCode: "function showMsg() {\n  console.log('تم التنفيذ');\n}\nshowMsg();",
      question: "لماذا لم تظهر الرسالة 'تم التنفيذ' في وحدة التحكم رغم كتابة اسم الدالة؟",
      explanation: "كتابة اسم الدالة showMsg بمفرده يشير إلى مرجع الدالة فقط؛ لتنفيذها وتشغيل محتواها يجب إضافة القوسين الدائريين showMsg().",
      options: [
        "لأن الدالة يجب أن تُكتب داخل وسم خاص",
        "لأن استدعاء الدالة وتشغيل كودها يتطلب وضع القوسين الدائريين () بعد اسمها",
        "لأن console.log لا تعمل داخل الدوال",
        "لأن الدالة تتطلب كلمة run قبل اسمها"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 38,
    title: "معاملات الدوال (Parameters) وتمرير المدخلات",
    concept: "المعاملات (Parameters) هي متغيرات تُعلن في رأس الدالة لتمثل المدخلات المتوقعة، بينما الحجج (Arguments) هي القيم الفعلية التي يمررها المبرمج بين القوسين عند استدعاء الدالة.",
    whyUse: "تجعل الدوال ديناميكية وقابلة لإعادة الاستخدام مع قيم مختلفة بدلاً من تثبيت البيانات؛ مثل دالة ترحيب تستقبل اسم الزائر المتغير وتشكّل رسالة خاصة به.",
    browserMechanics: "تُنشأ المعاملات كمتغيرات محلية خاصة داخل إطار تنفيذ الدالة في الذاكرة، ويتم نسخ القيم الممررة إليها وتدميرها فور انتهاء تنفيذ الدالة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters",
    breakdown: [
      "المعامل الشكلي (Parameter): الاسم الرمزي داخل تعريف الدالة مثل function greet(name).",
      "الوسيط الفعلي (Argument): القيمة الحقيقية الممررة عند التشغيل مثل greet('عمر').",
      "القيم الافتراضية (Default Parameters): تحديد قيمة بديلة مثل name = 'زائر' في حال لم تُمرر حجة."
    ],
    bugRepair: {
      brokenCode: "function add(a b) {\n  return a + b;\n}",
      fixedCode: "function add(a, b) {\n  return a + b;\n}",
      question: "لماذا أظهر مفسر JavaScript خطأ صياغة في رأس تعريف الدالة؟",
      explanation: "معاملات الدالة داخل القوسين الدائريين يجب فصلها دائماً بفواصل عادية ',' ليميز المحرك بين كل متغير وآخر.",
      options: [
        "لأن المعاملات يجب أن تكون بأحرف كبيرة",
        "لأن المعاملات المتعددة داخل القوسين يجب فصلها بفاصلة عادية ,",
        "لأن الدالة لا تقبل أكثر من معامل واحد في JavaScript",
        "لأن المعاملات تتطلب كلمة let قبلها"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 39,
    title: "قيم الإرجاع (Return Values) والاستفادة من النتيجة",
    concept: "عبارة return تأمر الدالة بإنهاء عملها فوراً وتمرير قيمة ناتجة معينة إلى السطر الذي استدعاها، مما يسمح بحفظ النتيجة في متغير أو إدخالها في عمليات حسابية أخرى.",
    whyUse: "بدون return، تقوم الدالة بطباعة النتيجة محلياً وتضيع قيمتها؛ بفضل return تصبح الدالة أداة إنتاجية حقيقية تحسب البيانات وتعيدها ليستخدمها بقية البرنامج.",
    browserMechanics: "عند وصول مفسر المحرك لأمر return، يوقف تنفيذ أي كود متبقٍ داخل الدالة، ويدفع القيمة الناتجة إلى سياق الاستدعاء السابق ويزيل إطار الدالة من الـ Call Stack.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return",
    breakdown: [
      "أمر return: ينهي الدالة ويعيد القيمة المحددة للجهة الطالبة.",
      "القيمة الافتراضية: أي دالة لا تحتوي على أمر return صريح تعيد تلقائياً القيمة undefined.",
      "إيقاف التنفيذ: أي سطر يُكتب بعد أمر return داخل نفس الكتلة لن ينفذ أبداً (Unreachable Code)."
    ],
    bugRepair: {
      brokenCode: "function double(n) {\n  let res = n * 2;\n}\nlet val = double(5);\nconsole.log(val); // يريد 10",
      fixedCode: "function double(n) {\n  return n * 2;\n}\nlet val = double(5);\nconsole.log(val);",
      question: "لماذا طبع الكود undefined بدلاً من القيمة المحسوبة 10؟",
      explanation: "الدالة قامت بحساب الناتج وخزنته في متغير محلي لكنها نسيت إرجاعه باستخدام return، فكانت نتيجتها الافتراضية undefined.",
      options: [
        "لأن الرقم 5 لا يمكن مضاعفته",
        "لأن الدالة تفتقر لأمر return لإعادة القيمة الناتجة خارج نطاقها المحلي",
        "لأن المتغير val يجب أن يكون ثابتاً const",
        "لأن العمليات الحسابية ممنوعة داخل الدوال"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 9: تمرير القيم للدوال (40..43)
  {
    order: 40,
    title: "كائن الوسائط (Arguments Object) والمعاملات المتبقية",
    concept: "كائن arguments هو كائن شبيه بالمصفوفة متاح تلقائياً داخل الدوال التقليدية يحتوي على كافة القيم الممررة للدالة، بينما يوفر معيار ES6 الحديث صيغة المعاملات المتبقية (...rest) لتحويلها لمصفوفة حقيقية.",
    whyUse: "تسمح ببناء دوال مرنة تستقبل عدداً غير محدد من المدخلات؛ مثل دالة جمع تقبل رقمين أو عشرة أرقام دون الحاجة لتحديد عدد المعاملات مسبقاً في رأس الدالة.",
    browserMechanics: "يقوم المحرك بإنشاء كائن arguments في نطاق الدالة تلقائياً وربطه بالقيم الممررة، بينما Rest Parameters تنشئ مصفوفة حقيقية في كومة الذاكرة وتدعم كافة دوال المصفوفات.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments",
    breakdown: [
      "كائن arguments: يحتوي على فهارس رقمية للوسائط وخاصية length.",
      "المعامل المتبقي (...args): يجمع كافة المدخلات في مصفوفة Array قياسية متكاملة.",
      "مرونة الاستدعاء: تتيح للدالة التكيف التام مع مختلف أحجام البيانات المدخلة."
    ],
    bugRepair: {
      brokenCode: "function sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3); // لكن كتب الرأس: function sum(numbers)",
      fixedCode: "function sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3);",
      question: "لماذا تسبب غياب علامة النقاط الثلاث (...) في اعتبار numbers رقماً مفرداً وليس مصفوفة؟",
      explanation: "بدون معامل التجميع المتبقي ... يعتبر المحرك numbers المعامل الأول فقط ويستلم 1 ويتجاهل بقية الأرقام، وتفشل دالة reduce.",
      options: [
        "لأن reduce لا تعمل مع الأرقام الفردية",
        "لأن تجميع عدة وسائط في مصفوفة واحدة يتطلب كتابة نقاط المعامل المتبقي ... قبل الاسم",
        "لأن كلمة numbers محجوزة في لغة JavaScript",
        "لأن الدوال يجب أن تأخذ معاملين كحد أقصى"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 41,
    title: "تعبيرات الدوال (Function Expressions) والدوال المجهولة",
    concept: "تعبير الدالة هو تعريف دالة وإسنادها كقيمة لمتغير عادي، مما يعكس حقيقة أن الدوال في JavaScript هي 'كائنات من الدرجة الأولى' (First-Class Citizens) يمكن نقلها وتمريرها وتخزينها كأي قيمة أخرى.",
    whyUse: "تتيح تمرير الدوال كمعاملات لدوال أخرى (Callbacks)، وبناء دوال فورية التنفيذ (IIFE)، والتحكم في توقيت إتاحة الدالة في البرنامج دون رفع مبكر (No Hoisting).",
    browserMechanics: "على عكس إعلانات الدوال التقليدية التي تُرفع بالكامل، فإن تعبيرات الدوال تسري عليها قواعد المتغيرات؛ فلا يمكن استدعاء الدالة قبل السطر الذي تم فيه إسنادها للمتغير.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
    breakdown: [
      "الإسناد لمتغير const myFunc = function(): يخزن كائن الدالة داخل المتغير.",
      "الدالة المجهولة (Anonymous Function): دالة بدون اسم بعد كلمة function لأن اسمها هو اسم المتغير نفسه.",
      "عدم الرفع (No Hoisting): محاولة استدعائها قبل سطر الإسناد ترمي خطأ فوري."
    ],
    bugRepair: {
      brokenCode: "sayHello();\nconst sayHello = function() {\n  console.log('مرحبًا');\n};",
      fixedCode: "const sayHello = function() {\n  console.log('مرحبًا');\n};\nsayHello();",
      question: "لماذا فشل استدعاء sayHello في بداية الكود وظهر خطأ ReferenceError؟",
      explanation: "تعبيرات الدوال المسندة لمتغيرات const أو let لا تُرفع قبل سطرها؛ يجب تعريفها وإسنادها أولاً قبل محاولة استدعائها.",
      options: [
        "لأن تعبيرات الدوال لا تقبل أسماء باللغة الإنجليزية",
        "لأن تعبير الدالة غير مرفوع ويجب أن يسبق استدعاؤه في ترتيب السطور",
        "لأن console.log لا تعمل داخل تعبيرات الدوال",
        "لأن المتغير يجب أن يُعرف بكلمة var حصراً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 42,
    title: "الدوال السهمية (Arrow Functions) والصياغة الحديثة",
    concept: "الدوال السهمية هي صيغة مختصرة وأنيقة قُدمت في ES6 لكتابة الدوال باستخدام الرمز =>، وتتميز بعدم امتلاكها لكائن this خاص بها، بل ترثه معجمياً (Lexically) من النطاق المحيط بها.",
    whyUse: "تختصر كتابة الدوال الصغيرة ودوال النداء الآلي (Callbacks) مثل map و filter، وتحل المشكلة الأزلية لفقدان سياق this داخل دوال التوقيت وأحداث DOM.",
    browserMechanics: "لا تمتلك الدوال السهمية نموذج prototype ولا يمكن استخدامها كدوال بنائية مع new، كما أنها لا تحتوي على كائن arguments خاص بها مما يجعلها خفيفة وسريعة في الذاكرة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
    breakdown: [
      "صيغة السهم =>: تفصل بين معاملات الدالة وجسم الأوامر البرمجية.",
      "الإرجاع الضمني (Implicit Return): إذا كان جسم الدالة سطر تعبير واحد، يمكن حذف الأقواس وكلمة return.",
      "الربط المعجمي لـ this: ترث سياق الكائن المحيط بها تلقائياً دون الحاجة لـ bind."
    ],
    bugRepair: {
      brokenCode: "const double = n -> n * 2;",
      fixedCode: "const double = n => n * 2;",
      question: "لماذا أظهر مفسر JavaScript خطأ صياغة SyntaxError في تعريف الدالة السهمية؟",
      explanation: "رمز الدالة السهمية القياسي في JavaScript هو علامة المساواة متبوعة بأكبر من '=>'، وليس الشرطة السهمية '->'.",
      options: [
        "لأن المعامل n يجب أن يكون بين قوسين معقوفين",
        "لأن رمز الدالة السهمية الصحيح هو => وليس ->",
        "لأن الدوال السهمية تتطلب كلمة return دائماً",
        "لأن الأعداد لا يمكن مضاعفتها بالدوال السهمية"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 43,
    title: "مؤقتات التنفيذ (Timers) وجدولة المهام",
    concept: "توفر بيئة المتصفح دالتي التوقيت الأساسيتين: setTimeout لتنفيذ دالة بعد انقضاء فترة زمنية محددة بالملي ثانية، و setInterval لتكرار تنفيذ دالة بشكل دوري منتظم حتى إيقافها بـ clearInterval.",
    whyUse: "تُستخدم لإنشاء الرسوم المتحركة، وساعات التوقيت، وإغلاق رسائل التنبيه تلقائياً بعد 3 ثوانٍ، وتأخير تنفيذ العمليات لانتظار تفاعل المستخدم.",
    browserMechanics: "المؤقتات ليست جزءاً من لغة JS الأساسية بل هي Web APIs يوفرها المتصفح؛ تسجل الدالة في وحدة المؤقت، وفور انتهاء الوقت تُدفع إلى طابور المهام (Task Queue) لتنتظر فراغ مكدس الاستدعاءات عبر Event Loop.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout",
    breakdown: [
      "دالة setTimeout(callback, ms): تنتظر عدد الملي ثواني ثم تستدعي الدالة مرة واحدة.",
      "دالة setInterval(callback, ms): تكرر استدعاء الدالة كل فترة زمنية دورية.",
      "دالة clearTimeout(id): تلغي المؤقت وتمنع تشغيل الدالة إذا لم تكن قد بدأت بعد."
    ],
    bugRepair: {
      brokenCode: "setTimeout(console.log('مرحبًا'), 1000);",
      fixedCode: "setTimeout(() => console.log('مرحبًا'), 1000);",
      question: "لماذا طُبعت الرسالة فوراً دون الانتظار لمدة ثانية واحدة (1000ms)؟",
      explanation: "وضع console.log(...) مع الأقواس مباشرة يستدعي الدالة في التو واللحظة ويمرر نتيجتها للمؤقت؛ يجب تمرير دالة كمرجع مثل () => console.log(...).",
      options: [
        "لأن رقم 1000 بالملي ثانية يعني زمناً صفرياً",
        "لأنه تم استدعاء الدالة فوراً بالأقواس، والصواب تمرير دالة سهمية أو مرجع دالة لينفذها المؤقت لاحقاً",
        "لأن setTimeout تتطلب حساب الوقت بالدقائق",
        "لأن كائن console لا يتوافق مع المؤقتات"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 10: وصف البيانات بالكائنات (44..49)
  {
    order: 44,
    title: "مفهوم الكائنات (Objects) وهيكلة البيانات",
    concept: "الكائن Object هو بنية بيانات غير خطية تجمع بين خصائص مرتبطة على هيئة أزواج من المفاتيح والقيم { key: value }؛ حيث تمثل المفاتيح أسماء السمات، وتمثل القيم البيانات أو الدوال المرتبطة بها.",
    whyUse: "تحاكي الكائنات كيانات العالم الحقيقي في البرمجة؛ فبدلاً من تعريف 5 متغيرات منفصلة للمستخدم، نجمعها في كائن واحد user يحمل اسمه وعمره وبريده وصلاحياته.",
    browserMechanics: "تُخزن الكائنات في كومة الذاكرة (Memory Heap) كبنية مساحية ديناميكية، ويحمل المتغير في المكدس مجرد مؤشر مرجعي (Reference Pointer) يشير إلى موقع الكائن في الذاكرة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics",
    breakdown: [
      "الأقواس المتعرجة { }: الصيغة الحرفية (Object Literal) لإنشاء كائن جديد.",
      "المفتاح والقيمة key: value: يفصل بينهما نقطتان رأسيتان وتفصل الأزواج بفاصلة.",
      "المرجع (Reference): نسخ كائن لمتغير آخر ينسخ عنوان الذاكرة فقط وليس القيم ذاتها."
    ],
    bugRepair: {
      brokenCode: "let user = {\n  name = 'ليلى',\n  age = 22\n};",
      fixedCode: "let user = {\n  name: 'ليلى',\n  age: 22\n};",
      question: "لماذا أظهر مفسر JavaScript خطأ صياغة داخل تعريف الكائن؟",
      explanation: "داخل الكائنات تُفصل المفاتيح عن قيمها بنقطتين رأسيتين ':' وليس بعلامة المساواة '=' المخصصة لإسناد المتغيرات.",
      options: [
        "لأن أسماء الخصائص يجب أن تكون أرقاماً",
        "لأن الربط بين المفتاح والقيمة داخل الكائن يتم بالنقطتين الرأسيتين : وليس علامة =",
        "لأن الكائنات لا تدعم تخزين الأسماء والأعمار معاً",
        "لأن الكائن يتطلب كلمة new Object() دائماً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 45,
    title: "خصائص الكائنات (Object Properties) والقراءة والتعديل",
    concept: "تتيح JavaScript طريقتين للوصول لخصائص الكائنات وتعديلها: تدوين النقطة (Dot Notation: obj.prop) وهو الأكثر استخداماً، وتدوين الأقواس المربعة (Bracket Notation: obj['prop']) المفيد للمفاتيح الديناميكية.",
    whyUse: "تمكن المطور من قراءة بيانات الكائن وتحديثها وحذفها وإضافة خصائص جديدة له في أي لحظة أثناء عمل البرنامج بمرونة كاملة.",
    browserMechanics: "يبحث المحرك عن الخاصية في الكائن نفسه أولاً؛ وإذا لم يجدها يصعد في سلسلة النماذج الأولية (Prototype Chain) حتى يصل إلى Object.prototype أو يعيد undefined.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#objects_and_properties",
    breakdown: [
      "تدوين النقطة person.name: وصول مباشر وسريع للمفاتيح القياسية المعروفة مسبقاً.",
      "تدوين الأقواس person[keyVar]: يتيح استخدام متغير كاسم للمفتاح أو مفاتيح تحتوي مسافات.",
      "إضافة الخصائص: كتابة obj.newProp = val تضيف الخاصية للكائن فوراً في الذاكرة."
    ],
    bugRepair: {
      brokenCode: "let car = { 'car color': 'أحمر' };\nconsole.log(car.car color);",
      fixedCode: "let car = { 'car color': 'أحمر' };\nconsole.log(car['car color']);",
      question: "لماذا فشل الوصول لخاصية 'car color' بتدوين النقطة وحدث خطأ صياغة؟",
      explanation: "تدوين النقطة لا يقبل أسماء خصائص تحتوي على مسافات؛ في هذه الحالة يجب استخدام تدوين الأقواس car['car color'].",
      options: [
        "لأن الألوان لا يمكن تخزينها في الكائنات",
        "لأن الخصائص التي تحتوي مسافات تتطلب استخدام تدوين الأقواس المربعة ['car color']",
        "لأن كلمة car محجوزة في لغة JavaScript",
        "لأن الكائن يجب أن يحتوي على أرقام فقط"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 46,
    title: "دوال الكائنات (Object Methods) وسلوك الكائن",
    concept: "دالة الكائن (Method) هي خاصية داخل الكائن قيمتها دالة برمجية؛ وهي تجعل الكائن قادراً على تنفيذ أفعال وسلوكيات مرتبطة ببياناته الخاصة، محققةً مبدأ التغليف (Encapsulation).",
    whyUse: "تجمع البيانات وسلوكها معاً في وحدة منطقية واحدة؛ مثل كائن حساب بنكي يحمل الرصيد كخاصية، ويحمل دوال الإيداع والسحب وتوليد الكشف كأفعال تابعة له.",
    browserMechanics: "عند استدعاء دالة كائن obj.method()، يقوم المحرك بربط الكلمة المفتاحية this داخل الدالة بالكائن الذي يسبق النقطة (obj) تلقائياً أثناء وقت التشغيل.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#defining_methods",
    breakdown: [
      "تعريف الدالة داخل الكائن: greet() { ... } بالصيغة المختصرة لـ ES6.",
      "استدعاء الدالة obj.greet(): يشغل كود الدالة مع ربط سياق الكائن بها.",
      "التفاعل مع الخصائص: قدرة الدالة على قراءة وتحديث الخصائص المجاورة لها عبر this."
    ],
    bugRepair: {
      brokenCode: "let calc = {\n  num: 10,\n  add: function(x) {\n    return num + x;\n  }\n};\ncalc.add(5);",
      fixedCode: "let calc = {\n  num: 10,\n  add: function(x) {\n    return this.num + x;\n  }\n};\ncalc.add(5);",
      question: "لماذا رمى المفسر خطأ ReferenceError: num is not defined داخل الدالة؟",
      explanation: "للوصول لخاصية تنتمي لنفس الكائن داخل دالته، يجب استخدام كلمة this.num ليحدد المحرك موضع الخاصية في الكائن الحالي.",
      options: [
        "لأن الأرقام لا يمكن جمعها داخل الكائنات",
        "لأنه يجب استخدام this.num للإشارة إلى خاصية الكائن التابعة لنفس السياق",
        "لأن الدالة add يجب أن تكون دالة سهمية حصراً",
        "لأن كلمة calc محجوزة في محرك المتصفح"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 47,
    title: "الكلمة المفتاحية this وتحديد سياق التنفيذ",
    concept: "الكلمة المفتاحية this هي مرجع خاص في JavaScript يشير إلى الكائن الذي يمثل سياق التنفيذ الحالي؛ وتتحدد قيمتها وقت الاستدعاء (Call Time) بناءً على كيفية ومكان تشغيل الدالة.",
    whyUse: "تسمح للدوال بالعمل مع كائنات متعددة وتطبيق نفس السلوك العام على بيانات الكائن المستدعي حالياً دون الحاجة لتثبيت اسم كائن محدد في الكود.",
    browserMechanics: "في الاستدعاء المباشر obj.fn() تشير this إلى obj؛ وفي الاستدعاء العام تشير إلى window (أو undefined في الوضع الصارم)؛ بينما تربط الدوال السهمية this معجمياً من النطاق الخارجي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
    breakdown: [
      "سياق الاستدعاء: القاعدة الذهبية هي أن this تمثل ما يقع يسار النقطة عند الاستدعاء.",
      "الدوال السهمية: لا تملك this خاصة بها وترث سياق النطاق الأب الحاضن لها.",
      "دوال الربط الصريح: call و apply و bind للتحكم اليدوي المباشر في قيمة this."
    ],
    bugRepair: {
      brokenCode: "let person = {\n  name: 'هدى',\n  say: () => {\n    console.log(this.name);\n  }\n};\nperson.say();",
      fixedCode: "let person = {\n  name: 'هدى',\n  say: function() {\n    console.log(this.name);\n  }\n};\nperson.say();",
      question: "لماذا طُبعت قيمة undefined بدلاً من اسم 'هدى' داخل الدالة السهمية؟",
      explanation: "الدوال السهمية لا تملك this خاصة بها وترث this من النطاق العام (window) حيث name غير معرّف؛ يجب استخدام دالة عادية function() كدالة كائن.",
      options: [
        "لأن اسم هدى غير مدعوم في الكائنات",
        "لأن الدوال السهمية ترث this من النطاق العام، ويجب استخدام دالة عادية لترتبط بالكائن person",
        "لأن console.log لا تقبل طباعة this",
        "لأن الكائن يتطلب دالة constructor"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 48,
    title: "عرض وطباعة محتويات الكائنات (Object Display)",
    concept: "محاولة طباعة الكائن مباشرة كـ نص تؤدي إلى ظهور العبارة الشهيرة '[object Object]'؛ لذا توفر JavaScript طرقاً لتحويله لنصوص مقروءة عبر JSON.stringify أو استخراج مفاتيحه بـ Object.keys و Object.values.",
    whyUse: "تعد ضرورية لعرض بيانات الكائنات داخل عناصر الصفحة للمستخدمين، وتخزينها في التخزين المحلي localStorage، ونقلها عبر شبكة الويب كبيانات JSON.",
    browserMechanics: "عند دمج كائن مع نص، يستدعي المحرك دالة toString() الافتراضية للكائن التي تعيد نوعه فقط؛ بينما تحلل JSON.stringify الخصائص تسلسلياً وتحولها لنص مهيكل.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
    breakdown: [
      "JSON.stringify(obj): تحول كائن الذاكرة إلى سلسلة نصية قياسية بصيغة JSON.",
      "Object.keys(obj): تعيد مصفوفة بأسماء كافة المفاتيح الموجودة في الكائن.",
      "Object.values(obj): تعيد مصفوفة بالقيم الفعلية المخزنة داخل خصائص الكائن."
    ],
    bugRepair: {
      brokenCode: "let user = { name: 'طارق' };\ndocument.body.textContent = user; // يظهر [object Object]",
      fixedCode: "let user = { name: 'طارق' };\ndocument.body.textContent = JSON.stringify(user);",
      question: "لماذا ظهرت العبارة '[object Object]' في الصفحة بدلاً من بيانات المستخدم؟",
      explanation: "إسناد الكائن مباشرة لخاصية نصية يستدعي دالة toString الافتراضية؛ لعرض محتواه كنص مهيكل يجب استخدام JSON.stringify(user).",
      options: [
        "لأن الكائن user فارغ في الذاكرة",
        "لأن تحويل الكائن لنص مرئي يتطلب استخدام JSON.stringify بدلاً من إسناده المباشر",
        "لأن صفحة المتصفح لا تقبل عرض البيانات النصية",
        "لأن المتغير user يجب أن يكون مصفوفة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 49,
    title: "الدوال البنائية (Constructors) ونموذج إنشاء الكائنات",
    concept: "الدالة البنائية هي دالة خاصة تُستخدم كقالب لإنشاء كائنات متعددة تشترك في نفس الهيكل والخصائص والدوال، وتُستدعى باستخدام الكلمة المفتاحية new.",
    whyUse: "توفر قالباً موحداً وفعالاً يغني عن إعادة كتابة هيكل الكائن يدوياً لكل مستخدم أو عنصر جديد في التطبيق، مما يحقق مبادئ البرمجة كائنية التوجه (OOP).",
    browserMechanics: "عند استدعاء دالة بـ new: ينشئ المحرك كائناً فارغاً جديداً، ويربط نموذجه الأولي بـ Constructor.prototype، ويربط this بهذا الكائن، ثم يعيده تلقائياً.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new",
    breakdown: [
      "اسم الدالة البنائية: يبدأ بحرف كبير اصطلاحاً (PascalCase) مثل function User().",
      "معامل new: ينشئ نسخة جديدة (Instance) في الذاكرة ويهيئ سياق this.",
      "خاصية prototype: يُعلق عليها الدوال المشتركة بين النسخ لتوفير مساحة الذاكرة."
    ],
    bugRepair: {
      brokenCode: "function Person(name) {\n  this.name = name;\n}\nlet p = Person('سامي');\nconsole.log(p.name);",
      fixedCode: "function Person(name) {\n  this.name = name;\n}\nlet p = new Person('سامي');\nconsole.log(p.name);",
      question: "لماذا ظهر خطأ TypeError: Cannot read properties of undefined (reading 'name')؟",
      explanation: "استدعاء الدالة البنائية بدون كلمة new لا ينشئ كائناً جديداً ويعيد undefined؛ يجب كتابة new Person('سامي').",
      options: [
        "لأن اسم الدالة يجب أن يكون بحروف صغيرة",
        "لأن استدعاء الدوال البنائية لإنشاء كائنات جديدة يتطلب استخدام الكلمة المفتاحية new",
        "لأن المتغير p يجب أن يُعرف بـ const فقط",
        "لأن الدوال البنائية لا تقبل معاملات نصية"
      ],
      correctOptionIndex: 1
    }
  }
];

function build() {
  console.log("Authoring Skills 6..10 (Lessons 27..49)...");
  const lessons = skillData.map(meta => createLesson(meta));

  // Chunk 6: Skill 6 (27..30)
  const chunk6 = lessons.slice(0, 4);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_06_strings_templates.json"), JSON.stringify(chunk6, null, 2), "utf8");

  // Chunk 7: Skill 7 (31..35)
  const chunk7 = lessons.slice(4, 9);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_07_numbers_conversion.json"), JSON.stringify(chunk7, null, 2), "utf8");

  // Chunk 8: Skill 8 (36..39)
  const chunk8 = lessons.slice(9, 13);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_08_functions_invocation.json"), JSON.stringify(chunk8, null, 2), "utf8");

  // Chunk 9: Skill 9 (40..43)
  const chunk9 = lessons.slice(13, 17);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_09_parameters_returns.json"), JSON.stringify(chunk9, null, 2), "utf8");

  // Chunk 10: Skill 10 (44..49)
  const chunk10 = lessons.slice(17, 23);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_10_objects_properties.json"), JSON.stringify(chunk10, null, 2), "utf8");

  console.log("✔ Skills 6..10 authored and verified successfully! Total lessons:", lessons.length);
  return lessons;
}

if (require.main === module) {
  build();
}

module.exports = { build, skillData };

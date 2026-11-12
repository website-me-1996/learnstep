/**
 * curriculum/js/author_skills_16_to_19.cjs
 * Skills 16 through 19 (Lessons 78 to 98 - 21 lessons)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, JS_TOPICS } = require("./builder_helper.cjs");
const { JS_RULES } = require("./rules_catalog.cjs");

const OUTPUT_DIR = path.resolve(__dirname);

const skillData = [
  // Skill 16: الحساب والأنواع المركبة (78..84)
  {
    order: 78,
    title: "كائن الرياضيات (Math Object) والدوال الرياضية المتقدمة",
    concept: "كائن Math هو كائن قياسي مدمج في JavaScript يوفر ثوابت رياضية ودوالاً حسابية متقدمة؛ مثل Math.PI، و Math.round للتقريب، و Math.floor للتقريب لأسفل، و Math.ceil للتقريب لأعلى، و Math.abs للقيمة المطلقة، و Math.max و Math.min.",
    whyUse: "يعد ضرورياً لكافة العمليات الهندسية والفيزيائية في ألعاب المتصفح، وحساب المسافات، وحساب أبعاد عناصر واجهة المستخدم والرسوم البيانية.",
    browserMechanics: "كائن Math ليس دالة بنائية ولا يمتلك constructor؛ كافة خصائصه ودواله ثابتة (Static) ويتم استدعاؤها مباشرة دون الحاجة لـ new، وتُنفذ مباشرة على مستوى المعالج.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
    breakdown: [
      "دالة Math.round(x): تقرب العدد لأقرب رقم صحيح بحسب الفاصلة العشرية.",
      "دالة Math.floor(x): تقرب العدد لأقرب رقم صحيح أقل أو مساوٍ له دائماً.",
      "دالة Math.max(...nums): تستخرج أكبر قيمة عددية من بين المدخلات الممررة."
    ],
    bugRepair: {
      brokenCode: "let m = new Math();\nlet val = m.floor(4.9);",
      fixedCode: "let val = Math.floor(4.9);",
      question: "لماذا أظهر مفسر JavaScript خطأ TypeError: Math is not a constructor؟",
      explanation: "كائن Math كائن ساكن (Static Object) ولا يمكن استدعاؤه بالكلمة new؛ دواله تُستدعى مباشرة مثل Math.floor(4.9).",
      options: [
        "لأن الأعداد العشرية لا يمكن تقريبها بـ floor",
        "لأن كائن Math كائن ثابت ولا يُنشأ بـ new وتستدعى دواله مباشرة Math.floor()",
        "لأن اسم الدالة يجب أن يكون بحروف كبيرة MATH",
        "لأن floor تتطلب تمرير نص وليس رقماً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 79,
    title: "توليد الأرقام العشوائية (Math.random) وتطبيقاتها",
    concept: "تولد دالة Math.random() عدداً عشرياً عشوائياً يقع في النطاق شبه المفتوح [0, 1)؛ أي أكبر من أو يساوي الصفر وأقل تماماً من الواحد الصحيح.",
    whyUse: "تُستخدم في سحب الفائزين عشوائياً، وتوليد أكواد التحقق OTP، وخلط بطاقات اللعب، واختيار صور عشوائية في خلفيات المواقع.",
    browserMechanics: "تعتمد محركات المتصفح الحديثة (مثل V8) على خوارزمية توليد أرقام شبه عشوائية فائقة السرعة تسمى xorshift128+؛ وتكفي للألعاب والتطبيقات العادية ولا تناسب التشفير الأمني.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
    breakdown: [
      "Math.random(): تعيد رقماً عشوائياً بين 0 و 0.9999999999999999.",
      "توسيع النطاق: ضرب الناتج في 10 يعطي أرقاماً بين 0 و 9.999.",
      "توليد عدد صحيح: استخدام Math.floor(Math.random() * max) + 1 لإنتاج أعداد صحيحة عشوائية."
    ],
    bugRepair: {
      brokenCode: "let roll = Math.floor(Math.random() * 6); // يريد أرقام النرد من 1 إلى 6",
      fixedCode: "let roll = Math.floor(Math.random() * 6) + 1;",
      question: "لماذا تظهر أحياناً القيمة 0 ولا تظهر القيمة 6 في رمية النرد؟",
      explanation: "عملية Math.floor(Math.random() * 6) تنتج أرقاماً من 0 إلى 5؛ لتوليد نطاق النرد من 1 إلى 6 يجب إضافة + 1 للناتج.",
      options: [
        "لأن Math.random لا تولد سوى الأرقام الزوجية",
        "لأن النطاق يبدأ من 0 وينتهي عند 5، ويجب إضافة + 1 ليصبح النطاق المطلوب من 1 إلى 6",
        "لأن دالة Math.floor تمسح الرقم 6 دائماً",
        "لأن النرد يتطلب دالة Math.round حصراً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 80,
    title: "التعابير النمطية (Regular Expressions - RegExp)",
    concept: "التعابير النمطية RegExp هي أنماط نصية قوية تُستخدم لمطابقة سلاسل الرموز والبحث المتقدم واستبدال النصوص والتحقق من صحة هياكل البيانات (مثل البريد الإلكتروني وكلمات المرور).",
    whyUse: "تختصر عشرات الأسطر من شروط الفحص؛ وبنمط واحد مثل /^\\d{10}$/ يمكن التأكد من أن مدخل المستخدم يتكون من 10 أرقام هاتفية حصراً وبلا مسافات.",
    browserMechanics: "يقوم محرك المتصفح بترجمة النمط إلى آلة حالات محدودة (Deterministic Finite Automaton - DFA) في الذاكرة لتنفيذ عمليات البحث بسرعة خاطفة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
    breakdown: [
      "الصيغة الحرفية /pattern/flags: تحاط الأنماط بشرطتين مائلتين مع أعلام مثل i للتجاهل و g للشمول.",
      "دالة regex.test(str): تفحص النص وتعيد true فور العثور على مطابقة للنمط.",
      "دالة str.match(regex): تستخرج كافة الأجزاء المطابقة للنمط في مصفوفة مخرجات."
    ],
    bugRepair: {
      brokenCode: "let reg = /[0-9]+/; // نمط أرقام\nif (reg.check('123')) console.log('صحيح');",
      fixedCode: "let reg = /[0-9]+/;\nif (reg.test('123')) console.log('صحيح');",
      question: "لماذا أظهر مفسر JavaScript خطأ TypeError: reg.check is not a function؟",
      explanation: "الدالة القياسية في كائن RegExp لفحص مطابقة النص للنمط هي test() وليست check().",
      options: [
        "لأن الأرقام لا تطابق التعابير النمطية",
        "لأن اسم الدالة القياسي في كائن RegExp هو test() وليس check()",
        "لأن النمط يجب أن يُكتب بين علامات تنصيص فقط",
        "لأن check دالة خاصة بالمصفوفات"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 81,
    title: "مراجعة شجرة أنواع البيانات (Data Types Overview)",
    concept: "تقسم JavaScript أنواع البيانات إلى فئتين رئيسيتين: الأنواع الأولية (Primitives: Number, String, Boolean, Null, Undefined, Symbol, BigInt) ونوع المرجع الوحيد (Objects: يشمل الكائنات والمصفوفات والدوال).",
    whyUse: "التمييز بين الفئتين يمنع أخطاء التعديل غير المتوقع؛ فالأنواع الأولية تُنسخ بقيمتها، بينما الكائنات تُنسخ بمراجعها مما يعني أن تعديل نسخة يعدل الأصل.",
    browserMechanics: "تُخزن الأنواع الأولية بقيم ثابتة ومستقلة على Stack الذاكرة، بينما تُخزن الكائنات في Heap وتخضع لآليات تتبع المراجع ودورات تفريغ الذاكرة لجامع القمامة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
    breakdown: [
      "القيم الأولية (7 أنواع): بسيطة وغير قابلة للتعديل وتمرر بالقيمة By Value.",
      "كائنات المرجع (Object): معقدة وقابلة للتعديل وتمرر بالمرجع By Reference.",
      "فحص النوع typeof: المعامل القياسي لاكتشاف نوع القيمة أثناء وقت التشغيل."
    ],
    bugRepair: {
      brokenCode: "let a = { score: 10 };\nlet b = a;\nb.score = 20;\nconsole.log(a.score); // يطبع 20 بدلاً من 10 الأصلية",
      fixedCode: "let a = { score: 10 };\nlet b = { ...a }; // نسخ كائن جديد\nb.score = 20;\nconsole.log(a.score);",
      question: "لماذا تغيرت قيمة a.score عند تعديل b.score؟",
      explanation: "الكائنات تمرر بالمرجع (By Reference)؛ لذا المتغيران a و b يشيران إلى نفس الكائن في الذاكرة، والنسخ السطحي {...a} يحل المشكلة.",
      options: [
        "لأن المتغير a والمتغير b يشتركان في نفس الاسم",
        "لأن الكائنات تمرر بالمرجع ويجب استخدام معامل النشر {...a} لنسخ كائن مستقل",
        "لأن الأرقام لا يمكن حفظها داخل الكائنات",
        "لأن المتغير b يجب أن يُعرف بـ const"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 82,
    title: "البيانات الأولية (Primitive Data) وخصائص عدم التغيير",
    concept: "القيم الأولية (Primitives) هي بيانات نقية وغير قابلة للتعديل (Immutable)؛ لا تملك خصائص أو دوالاً خاصة بها في الأصل، ولكن JavaScript تغلفها مؤقتاً بكائن وهمي عند استدعاء دالة عليها.",
    whyUse: "تضمن أمان البيانات؛ فلا يمكن لأي دالة خارجية أن تغير قيمة نص أو رقم تم تمريره إليها، مما يجعل تدفق الحسابات متوقعاً ومحمياً من الآثار الجانبية.",
    browserMechanics: "تطبق JavaScript مفهوم التغليف التلقائي (Auto-Boxing)؛ فعند كتابة 'text'.toUpperCase()، ينشئ المحرك كائن String مؤقتاً، ينفذ الدالة، ثم يدمر الكائن فوراً في نفس الدورة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Primitive",
    breakdown: [
      "عدم القابلية للتعديل (Immutability): لا يمكن تغيير محتوى الحرف الأول من النص مباشرة.",
      "التغليف التلقائي (Boxing): إنشاء كائن غلاف مؤقت لاستدعاء الدوال التابعة.",
      "المقارنة بالقيمة: قيمتان أوليتان متماثلتان في المحتوى تتطابقان دائماً بـ ===."
    ],
    bugRepair: {
      brokenCode: "let str = 'قطار';\nstr[0] = 'م';\nconsole.log(str); // ما زال 'قطار'!",
      fixedCode: "let str = 'قطار';\nstr = 'مطار';\nconsole.log(str);",
      question: "لماذا لم يتغير الحرف الأول من 'قطار' إلى 'م'؟",
      explanation: "السلاسل النصية في JavaScript قيم أولية غير قابلة للتعديل المباشر عبر الفهرس؛ لتغيير الكلمة يجب إسناد نص جديد بالكامل للمتغير.",
      options: [
        "لأن الحرف 'م' غير مدعوم في الفهرسة",
        "لأن السلاسل النصية قيم أولية غير قابلة للتعديل المباشر عبر الفهارس",
        "لأن الفهرس يجب أن يكون بين أقواس دائرية",
        "لأن المتغير str يجب أن يكون مصفوفة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 83,
    title: "أنواع الكائنات (Object Types: Functions, Arrays, Objects)",
    concept: "في JavaScript، كل ما ليس قيمة أولية فهو كائن (Object)؛ فالمصفوفات والدوال وتعبيرات التعابير النمطية وتواريخ Date هي جميعاً أشكال متخصصة مشتقة من كائن Object الأساسي.",
    whyUse: "تمنح الدوال والمصفوفات مرونة غير مسبوقة؛ فالدالة يمكن أن تحمل خصائص خاصة بها، والمصفوفة تمتلك نموذجاً أولياً غنياً يسهل معالجة البيانات المعقدة.",
    browserMechanics: "ترتبط كافة هذه الأنواع بسلسلة النموذج الأولي (Prototype Chain) وتنتهي جميعاً عند Object.prototype؛ ودالة typeof تعيد 'object' للمصفوفات و 'function' للدوال.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
    breakdown: [
      "الدوال ككائنات: دوال قابلة للاستدعاء ولكنها تستطيع حمل خصائص إضافية.",
      "المصفوفات ككائنات: مصفوفات بفهارس رقمية وخاصية length متخصصة.",
      "سلسلة الوراثة: تشترك كافة الكائنات في دوال toString و hasOwnProperty."
    ],
    bugRepair: {
      brokenCode: "let list = [1, 2, 3];\nif (typeof list === 'array') console.log('مصفوفة');",
      fixedCode: "let list = [1, 2, 3];\nif (Array.isArray(list)) console.log('مصفوفة');",
      question: "لماذا لم يتحقق الشرط رغم أن list هي مصفوفة واضحة؟",
      explanation: "معامل typeof يعيد 'object' للمصفوفات؛ الطريقة القياسية الموثوقة لفحص المصفوفات هي دالة Array.isArray(list).",
      options: [
        "لأن المصفوفات نوع غير موجود في JavaScript",
        "لأن typeof list ينتج 'object' والصواب استخدام الدالة القياسية Array.isArray(list)",
        "لأن list مصفوفة أرقام فقط",
        "لأن المقارنة تتطلب علامة المساواة المزدوجة =="
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 84,
    title: "الرموز المعيارية (Symbols) والمفاتيح الفريدة المخفية",
    concept: "الرمز Symbol هو نوع بيانات أولي فريد تماماً وغير قابل للتكرار؛ يُنشأ باستدعاء Symbol() ويُستخدم لإنشاء مفاتيح خصائص خاصة للكائنات لا يمكن أن تتصادم مع أي مفاتيح أخرى.",
    whyUse: "تتيح إضافة بيانات وصفية للكائنات ومكتبات الطرف الثالث دون الخوف من الكتابة فوق خصائص قائمة، وتخفي الخصائص عن حلقات التكرار العادية for...in.",
    browserMechanics: "كل استدعاء لـ Symbol() يولد معرّفاً سداسياً فريداً داخلياً في محرك المتصفح حتى لو تطابقت النصوص الوصفية الممررة بين الأقواس.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
    breakdown: [
      "الفرادة المطلقة: Symbol('id') !== Symbol('id') دائماً وأبداً في المقارنة.",
      "خصائص مخفية: لا تظهر مفاتيح الرموز في Object.keys أو JSON.stringify.",
      "الرموز المعروفة (Well-known Symbols): مثل Symbol.iterator لتخصيص سلوك اللغة."
    ],
    bugRepair: {
      brokenCode: "let sym = new Symbol('id');",
      fixedCode: "let sym = Symbol('id');",
      question: "لماذا رمى المفسر خطأ TypeError: Symbol is not a constructor؟",
      explanation: "الرمز Symbol نوع أولي وليس دالة بنائية؛ يُنشأ باستدعائه مباشرة كدالة Symbol('id') دون كتابة الكلمة new.",
      options: [
        "لأن كلمة id محجوزة في لغة JavaScript",
        "لأن Symbol نوع أولي ولا يُنشأ بـ new ويُستدعى مباشرة كدالة Symbol()",
        "لأن الرموز تتطلب تمرير أرقام فقط",
        "لأن الرمز يجب أن يُحاط بأقواس مربعة"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 17: تمييز أنواع القيم وتحويلها (85..89)
  {
    order: 85,
    title: "معامل فحص النوع (typeof Operator) وحدوده",
    concept: "معامل typeof هو معامل أحادي يعيد سلسلة نصية تمثل نوع المعامل عليه؛ مثل 'number' و 'string' و 'boolean' و 'undefined' و 'function' و 'object'.",
    whyUse: "يُستخدم للتحقق من أنواع المتغيرات ومدخلات الدوال البرمجية والتأكد من تمرير البيانات بالشكل المتوقع قبل إجراء العمليات الحسابية أو المنطقية.",
    browserMechanics: "معامل typeof يفحص علامة النوع الثنائية (Type Tag) المخزنة في المؤشر؛ وبسبب خطأ تاريخي قديم في أول إصدار للغة يعيد typeof null القيمة 'object'.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
    breakdown: [
      "فحص القيم الأولية: يعيد أسماء الأنواع الدقيقة للأرقام والنصوص والقيم المنطقية.",
      "الاستثناء التاريخي لـ null: يعيد 'object' ويتم فحصه عبر val === null.",
      "فحص الدوال: يعيد 'function' لتمييزها عن سائر الكائنات الأخرى."
    ],
    bugRepair: {
      brokenCode: "let data = null;\nif (typeof data === 'null') console.log('فارغ');",
      fixedCode: "let data = null;\nif (data === null) console.log('فارغ');",
      question: "لماذا لم يتحقق الشرط عند فحص القيمة null بمعامل typeof؟",
      explanation: "معامل typeof null يعيد النص 'object' وليس 'null' بسبب خطأ تاريخي في لغة JS؛ لفحص null استخدم المقارنة المباشرة data === null.",
      options: [
        "لأن null لا يمكن تخزينها في المتغيرات",
        "لأن typeof null يعيد 'object'، وللتحقق من null يجب استخدام المقارنة الصارمة data === null",
        "لأن كلمة null تتطلب أحرفاً كبيرة NULL",
        "لأن المتغير data غير معرّف"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 86,
    title: "الفرق بين undefined و null و NaN في JavaScript",
    concept: "تمثل هذه القيم حالات الفراغ والخلل: undefined تعني متغيراً تم الإعلان عنه دون إسناد قيمة، و null تعني قيمة فارغة مقصودة أسندها المطور، و NaN تعني ناتج عملية حسابية غير صالحة.",
    whyUse: "التمييز بينها يحدد مصدر المشكلة؛ فظهور undefined يشير لنسيان تمرير وسيط أو خاصية غير موجودة، بينما NaN تشير لمحاولة قسمة نص على رقم.",
    browserMechanics: "تعتبر undefined و null قيماً Falsy في الشروط، ولكن undefined === null يعيد false بسبب اختلاف النوع، بينما undefined == null يعيد true.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
    breakdown: [
      "القيمة undefined: الحالة الافتراضية للمتغيرات غير المهيأة وقيم إرجاع الدوال.",
      "القيمة null: تمثيل مقصود لغياب القيمة أو تفريغ مرجع الكائن في الذاكرة.",
      "القيمة NaN: رقم يمثل خطأ حسابياً (Not-a-Number) مثل 'abc' * 2."
    ],
    bugRepair: {
      brokenCode: "let total = 'مائة' * 2;\nconsole.log(total); // ينتج NaN\nif (total == NaN) console.log('خطأ حسابي');",
      fixedCode: "let total = 'مائة' * 2;\nif (Number.isNaN(total)) console.log('خطأ حسابي');",
      question: "لماذا لم يتحقق شرط المقارنة رغم أن ناتج العملية هو بالفعل NaN؟",
      explanation: "القيمة NaN لا تساوي أي شيء على الإطلاق بما في ذلك NaN نفسها؛ الدالة المعتمدة للفحص هي Number.isNaN(total).",
      options: [
        "لأن النصوص يمكن ضربها في الأرقام",
        "لأن NaN لا تساوي نفسها بالمقارنة ويجب فحصها بدالة Number.isNaN()",
        "لأن total متغير ثابت",
        "لأن المقارنة تتطلب معامل المساواة الثلاثي ==="
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 87,
    title: "التحويل الضمني للأنواع (Type Coercion) ومفاجآت اللغة",
    concept: "التحويل الضمني للأنواع هو قيام محرك JavaScript بتحويل نوع البيانات تلقائياً دون تدخل المبرمج ليتوافق مع سياق العملية؛ مثل تحويل الرقم لنص عند جمعه مع سلسلة نصية ('5' + 2 = '52').",
    whyUse: "فهم التحويل التلقائي يحمي التطبيق من أخطاء الحسابات الكارثية في المتاجر وعمليات الدفع، ويفسر سلوك الشروط المنطقية مع القيم المختلفة.",
    browserMechanics: "يطبق المحرك خوارزميات التحويل المحددة في مواصفة ECMAScript (مثل ToPrimitive و ToNumber و ToString) قبل تطبيق المعاملات الحسابية والمنطقية.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion",
    breakdown: [
      "التحويل لنص: معامل + مع أي طرف نصي يحول الطرف الآخر لنص فوراً.",
      "التحويل لرقم: المعاملات الرياضية الأخرى (- و * و /) تحول النصوص تلقائياً لأرقام.",
      "تجنب المفاجآت: استخدام المقارنة الصارمة === والتحويل الصريح يحمي الكود تماماً."
    ],
    bugRepair: {
      brokenCode: "let subtotal = '50';\nlet tax = '10';\nlet total = subtotal + tax; // ينتج '5010'!",
      fixedCode: "let subtotal = '50';\nlet tax = '10';\nlet total = Number(subtotal) + Number(tax);",
      question: "لماذا أصبحت الفاتورة الإجمالية '5010' بدلاً من 60؟",
      explanation: "المعامل + يقوم بدمج السلاسل النصية إذا كانت الأطراف نصوصاً؛ لحساب المجموع الحسابي يجب تحويل النصوص إلى أرقام صراحة بـ Number().",
      options: [
        "لأن الضريبة لا يمكن إضافتها للمجموع",
        "لأن علامة + قامت بدمج النصوص تلقائياً بدلاً من جمع الأرقام، ويجب استخدام Number()",
        "لأن المتغير subtotal محجوز في النظام",
        "لأن الفواصل مفقودة في الأرقام"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 88,
    title: "التحويل الصريح للأنواع (Explicit Type Conversion)",
    concept: "التحويل الصريح هو قيام المطور بتحويل القيمة عمداً من نوع إلى آخر باستخدام الدوال القياسية المخصصة: Number() للأرقام، String() للنصوص، و Boolean() للقيم المنطقية.",
    whyUse: "يمثل أفضل ممارسة برمجية؛ حيث يجعل نوايا المبرمج واضحة وضوح الشمس في الكود، ويضمن معالجة مدخلات حقول HTML (التي تأتي دائماً كنصوص) كأرقام صحيحة.",
    browserMechanics: "تستدعي دوال التحويل الصريح توابع التحويل الأساسية لنوع البيانات في الذاكرة دون محاولة التخمين، وتتميز بأنها أسرع وأكثر موثوقية من الحيل البرمجية (مثل +str).",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion",
    breakdown: [
      "دالة Number(val): تحول النصوص والقيم المنطقية لأرقام أو تعيد NaN عند الفشل.",
      "دالة String(val): تحول أي قيمة (بما في ذلك null و undefined) لسلسلة نصية آمنة.",
      "دالة Boolean(val): تحول القيم الصالحة لـ true والقيم الفارغة والصفر لـ false."
    ],
    bugRepair: {
      brokenCode: "let input = '42px';\nlet num = Number(input); // ينتج NaN",
      fixedCode: "let input = '42px';\nlet num = parseInt(input, 10);",
      question: "لماذا أعادت دالة Number() القيمة NaN بينما كان المطلوب استخراج الرقم 42؟",
      explanation: "دالة Number تتطلب نصاً رقمياً نقياً بنسبة 100%؛ لاستخراج الأرقام من النصوص التي تنتهي بوحدات قياس مثل '42px' يجب استخدام parseInt.",
      options: [
        "لأن رقم 42 عدد زوجي",
        "لأن Number تفشل مع الحروف الإضافية والصواب استخدام parseInt() لاستخراج الرقم",
        "لأن وحدات البكسل ممنوعة في JavaScript",
        "لأن الدالة تتطلب كلمة new Number"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 89,
    title: "تفكيك البنى والمصفوفات (Destructuring Assignment)",
    concept: "التفكيك Destructuring هو صيغة حديثة في ES6 تسمح باستخراج القيم من المصفوفات أو الخصائص من الكائنات وتفريغها مباشرة داخل متغيرات منفصلة بسطر واحد أنيق.",
    whyUse: "يختصر كتابة الكود بشكل مذهل؛ فبدلاً من كتابة let name = user.name; let age = user.age;، يمكن كتابة const { name, age } = user;، وتُستخدم بكثرة مع دوال واجهات React و APIs.",
    browserMechanics: "يقوم المفسر بمطابقة أسماء الخصائص في الكائن أو الفهارس الترتيبية في المصفوفة، وينشئ متغيرات محلية مستقلة في سياق التنفيذ ويسند إليها المراجع المقابلة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
    breakdown: [
      "تفكيك الكائنات { a, b } = obj: يطابق أسماء المتغيرات مع أسماء الخصائص داخل الكائن.",
      "تفكيك المصفوفات [x, y] = arr: يطابق المتغيرات بحسب الترتيب والفهارس المتسلسلة.",
      "القيم الافتراضية { role = 'guest' }: توفر قيمة احتياطية في حال كانت الخاصية غير موجودة."
    ],
    bugRepair: {
      brokenCode: "let point = [10, 20];\nlet { x, y } = point;\nconsole.log(x); // undefined!",
      fixedCode: "let point = [10, 20];\nlet [x, y] = point;\nconsole.log(x);",
      question: "لماذا نتجت القيمة undefined عند تفكيك إحداثيات النقطة؟",
      explanation: "المتغير point مصفوفة وليس كائناً؛ تفكيك المصفوفات يعتمد على الأقواس المربعة [x, y] وليس الأقواس المتعرجة {x, y}.",
      options: [
        "لأن الأرقام لا يمكن تفكيكها",
        "لأن تفكيك المصفوفات يتطلب أقواساً مربعة [x, y] بدلاً من الأقواس المتعرجة",
        "لأن النقطة point تتطلب 3 أبعاد",
        "لأن x متغير محجوز لمحور السينات"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 18: اكتشاف الأخطاء وإصلاحها (90..95)
  {
    order: 90,
    title: "معالجة الأخطاء البرمجية (Errors: Try, Catch, Finally)",
    concept: "بنية try...catch هي آلية اصطياد ومعالجة الأخطاء الاستثنائية (Exceptions) في JavaScript؛ تحمي البرنامج من الانهيار المفاجئ وتسمح بالتعامل مع الأخطاء وإظهار رسائل ودية للمستخدم.",
    whyUse: "تعد جوهرية في العمليات المعرضة للفشل خارج سيطرة الكود؛ مثل الاتصال بالإنترنت، وتحليل بيانات JSON قادمة من الخادم، أو قراءة ملفات معطوبة.",
    browserMechanics: "عند وقوع خطأ داخل كتلة try، ينشئ المحرك كائن Error ويوجه مسار التنفيذ فوراً لكتلة catch حاملاً تفاصيل الخطأ ومسار الاستدعاء (Stack Trace)، متفادياً إيقاف البرنامج.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    breakdown: [
      "كتلة try { }: تحتوي على الكود الحساس المعرض للخطأ الذي ترغب في تجربته بأمان.",
      "كتلة catch(error) { }: تلتقط الخطأ وتوفر خطة الطوارئ للتعافي منه أو تسجيله.",
      "كتلة finally { }: تنفذ دائماً في نهاية المطاف سواء نجح الكود أو وقع خطأ (لإغلاق الاتصالات وتنظيف الموارد)."
    ],
    bugRepair: {
      brokenCode: "try {\n  JSON.parse('{ bad json }');\n} handle(err) {\n  console.log('حدث خطأ');\n}",
      fixedCode: "try {\n  JSON.parse('{ bad json }');\n} catch(err) {\n  console.log('حدث خطأ');\n}",
      question: "لماذا رفض مفسر JavaScript الكلمة handle وأظهر خطأ صياغة؟",
      explanation: "الكلمة المفتاحية القياسية المقترنة بـ try لاصطياد الأخطاء في لغة JavaScript هي catch وليست handle.",
      options: [
        "لأن بيانات JSON لا تسبب أخطاء",
        "لأن الكلمة المفتاحية الصحيحة لالتقاط الأخطاء هي catch(err) وليس handle",
        "لأن try تتطلب كتلة finally إجبارياً",
        "لأن الدالة JSON.parse معطلة في المتصفح"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 91,
    title: "تقنيات تصحيح الأخطاء (Debugging) واستخدام DevTools",
    concept: "التصحيح Debugging هو فن تتبع أخطاء البرامج واكتشاف أسبابها وإصلاحها؛ باستخدام أدوات المطور (Browser DevTools)، ونقاط التوقف (Breakpoints)، والكلمة المفتاحية debugger.",
    whyUse: "يغني عن التخمين العشوائي وطباعة عشرات الأسطر بـ console.log؛ حيث يتيح فحص قيم الذاكرة، والتنقل خطوة بخطوة أثناء التشغيل، ومراقبة الـ Call Stack.",
    browserMechanics: "عندما يصادف المحرك كلمة debugger أثناء فتح أدوات المطور، يجمد تنفيذ البرنامج فوراً ويسلط الضوء على السطر الحالي ويتيح للمطور فحص كافة المتغيرات المحلية.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Debugging_JavaScript",
    breakdown: [
      "الكلمة المفتاحية debugger: نقطة توقف برمجية تجمد تنفيذ الكود في أدوات المطور.",
      "لوحة Sources: تتيح تصفح ملفات الكود وإضافة نقاط توقف مشروطة.",
      "مراقبة المتغيرات (Watch): تتبع تغير قيم المتغيرات أثناء الانتقال بين الأسطر."
    ],
    bugRepair: {
      brokenCode: "function calc() {\n  let total = 100;\n  debug;\n  return total;\n}",
      fixedCode: "function calc() {\n  let total = 100;\n  debugger;\n  return total;\n}",
      question: "لماذا لم تتوقف أداة المطور عند السطر المحدد وأظهر المفسر خطأ ReferenceError؟",
      explanation: "الكلمة المفتاحية القياسية لنقطة التوقف البرمجية في JavaScript هي debugger بالكامل وليست debug.",
      options: [
        "لأن أدوات المطور لا تدعم التوقف داخل الدوال",
        "لأن الكلمة المفتاحية الصحيحة لتجميد التنفيذ وفحص الكود هي debugger وليس debug",
        "لأن المتغير total يجب أن يكون صفراً",
        "لأن أمر التوقف يجب أن يكون في أول سطر في الدالة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 92,
    title: "دليل تنسيق الكود (Style Guide) والمعايير القياسية",
    concept: "دليل الأسلوب هو مجموعة من القواعد والاتفاقيات المتفق عليها لكتابة وتنسيق الكود؛ تشمل تسمية المتغيرات بـ camelCase، وحجم المسافات البادئة (2 أو 4 مسافات)، واستخدام الفواصل المنقوطة وأدوات Linter.",
    whyUse: "يجعل الكود موحداً وأنيقاً يسهل على أي مبرمج قراءته والعمل عليه ضمن الفرق الكبيرة، ويقلل الخلافات البرمجية وأخطاء الدمج في Git.",
    browserMechanics: "المتصفح لا يهتم بتنسيق الكود، لكن أدوات التدقيق الآلي (Linters مثل ESLint وأدوات التنسيق مثل Prettier) تحلل شجرة AST للكشف المبكر عن المخالفات.",
    docUrl: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript",
    breakdown: [
      "تسمية المتغيرات camelCase: مثل calculateTotalPrice للأفعال والمتغيرات.",
      "تسمية الأصناف PascalCase: مثل UserProfile للكائنات والدوال البنائية.",
      "المسافات البادئة (Indentation): مسافتان أو أربع مسافات توضح تبعية الأوامر للكتل."
    ],
    bugRepair: {
      brokenCode: "let FIRST_NAME = 'سعد'; // لمتغير عادي قابل للتعديل",
      fixedCode: "let firstName = 'سعد';",
      question: "لماذا يخالف كتابة FIRST_NAME بالخط الكبير دليل الأسلوب المعتمد للمتغيرات العادية؟",
      explanation: "أسلوب الأحرف الكبيرة UPPER_CASE مخصص حصراً للثوابت العالمية الثابتة تماماً؛ المتغيرات العادية تُكتب بأسلوب camelCase (مثل firstName).",
      options: [
        "لأن المتصفح يمنع استخدام الأحرف الكبيرة في الأسماء",
        "لأن أسلوب التسمية القياسي للمتغيرات العادية هو camelCase بينما UPPER_CASE مخصص للثوابت العالمية",
        "لأن الأسماء يجب أن تحتوي على أرقام",
        "لأن الشرطة السفلية ممنوعة في المتغيرات"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 93,
    title: "أفضل الممارسات البرمجية (Best Practices) في JavaScript",
    concept: "أفضل الممارسات هي المبادئ الهندسية المثبتة لإنتاج كود متين وقابل للتوسع؛ تشمل تجنب المتغيرات العامة، واستخدام const افتراضياً، وتفضيل الدوال النقية، والمقارنة الصارمة ===.",
    whyUse: "تضمن استقرار التطبيقات على المدى الطويل، وتحميها من الثغرات الأمنية الشائعة (مثل XSS)، وتسهل اختبار وتطوير الميزات الجديدة بسلاسة.",
    browserMechanics: "الالتزام بأفضل الممارسات يساعد محرك V8 على تحسين مسارات الترجمة الفورية (JIT Optimization) وتفادي الخروج من وضع التحسين السريع (Deoptimization).",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Good_practices",
    breakdown: [
      "عزل النطاق: عدم تلويث الكائن العام window بمتغيرات فرعية.",
      "المقارنة الصارمة ===: تفادي كافة مفاجآت التحويل التلقائي للأنواع.",
      "معالجة الحالات الحدية: التحقق من وجود الكائنات قبل قراءة خصائصها عبر Optional Chaining (?.)."
    ],
    bugRepair: {
      brokenCode: "globalVar = 'خطر بدون تعريف';",
      fixedCode: "const safeVar = 'معرف بأمان';",
      question: "لماذا يُعتبر إسناد متغير بدون let أو const ممارسة برمجية سيئة وخطيرة؟",
      explanation: "إسناد متغير دون إعلانه ينشئ متغيراً عاماً تلقائياً في كائن window، مما يلوث النطاق العام وقد يكتب فوق وظائف أخرى بالخطأ.",
      options: [
        "لأن النصوص لا يمكن تخزينها في المتغيرات العامة",
        "لأنه ينشئ متغيراً عاماً ضمنياً يلوث النطاق العام ويعرض التطبيق للتصادم والأخطاء",
        "لأن المتصفح يغلق الصفحة فوراً عند كتابة متغير عام",
        "لأن الكود يجب أن يكون داخل دالة alert"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 94,
    title: "الأخطاء الشائعة للمبتدئين (Common Mistakes) وتجنبها",
    concept: "يقع المبتدئون في أخطاء متكررة في JavaScript؛ مثل الخلط بين الإسناد = والمقارنة ===، ونسيان طبيعة عدم التزامن في جلب البيانات، وسوء استخدام this، والخلط بين نصوص الأرقام.",
    whyUse: "التعرف المبكر على هذه الأخطاء يوفر ساعات طويلة من الإحباط والبحث العشوائي، ويعود المطور على الانتباه لأدق التفاصيل البرمجية.",
    browserMechanics: "كثير من هذه الأخطاء لا تسبب توقف البرنامج بصوت عالٍ بل تنتج أخطاء صامتة (Silent Bugs) تجعل النتائج غير متوقعة وتصعب عملية التتبع.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors",
    breakdown: [
      "الخلط بين = و ===: يؤدي لتنفيذ الشروط دائماً وتغيير قيم المتغيرات بالخطأ.",
      "فهارس المصفوفات غير الموجودة: تقرأ undefined دون خطأ مسببة انهياراً لاحقاً عند محاولة قراءة خصائصها.",
      "إعادة إعلان الثوابت const: ترمي خطأ TypeError فوري يوقف سياق التنفيذ."
    ],
    bugRepair: {
      brokenCode: "let user;\nconsole.log(user.name); // TypeError!",
      fixedCode: "let user = { name: 'عادل' };\nconsole.log(user?.name);",
      question: "لماذا حدث خطأ TypeError: Cannot read properties of undefined (reading 'name')؟",
      explanation: "المتغير user قيمته undefined، ومحاولة قراءة خاصية من undefined ترمي خطأً فورياً؛ يجب استخدام Optional Chaining (?.) أو التأكد من تهيئة الكائن.",
      options: [
        "لأن اسم عادل غير معروف",
        "لأنه تمت محاولة قراءة خاصية من متغير غير مهيأ (undefined)، والحل استخدام التهيئة أو معامل ?.",
        "لأن console.log لا تقبل نقطة الخصائص",
        "لأن المتغير user يجب أن يكون مصفوفة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 95,
    title: "تحسين الأداء البرمجي (Performance & Optimization)",
    concept: "تحسين الأداء في JavaScript يعني كتابة كود عالي الكفاءة يستهلك أقل قدر من موارد المعالج والذاكرة؛ من خلال تقليل تعديلات DOM المكلفة، وتجنب الحلقات الثقيلة، واستخدام تقنيات Debounce و Throttle.",
    whyUse: "يضمن استجابة فائقة للواجهة بمعدل 60 إطاراً في الثانية (60 FPS)، ويمنع تقطيع التمرير (Jank) في الهواتف الضعيفة، ويوفر طاقة بطارية المستخدم.",
    browserMechanics: "كل تعديل على عناصر DOM يطلق عمليتي إعادة حساب المظهر والتخطيط (Reflow) وإعادة الرسم (Repaint)؛ تجميع التعديلات في دفعة واحدة (Batching) يحافظ على سلاسة العرض.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance",
    breakdown: [
      "تقليل الوصول لـ DOM: حفظ مرجع العنصر في متغير محلي بدلاً من البحث عنه في كل دورة.",
      "تقنية Debounce: تأخير تنفيذ دالة البحث حتى يتوقف المستخدم عن الكتابة في الحقل.",
      "تجنب تسريب الذاكرة: إزالة مستمعات الأحداث (Remove Event Listeners) عند إتلاف العناصر."
    ],
    bugRepair: {
      brokenCode: "for (let i = 0; i < 100; i++) {\n  document.body.innerHTML += '<p>' + i + '</p>';\n}",
      fixedCode: "let html = '';\nfor (let i = 0; i < 100; i++) {\n  html += '<p>' + i + '</p>';\n}\ndocument.body.innerHTML += html;",
      question: "لماذا كان هذا الكود بطيئاً جداً وتسبب في بطء استجابة المتصفح؟",
      explanation: "تعديل innerHTML داخل كل دورة يجبر المتصفح على إعادة بناء وتصيير الصفحة 100 مرة متتالية؛ والصواب تجميع النص في متغير وتحديث DOM مرة واحدة فقط.",
      options: [
        "لأن 100 فقرة عدد كبير جداً لا يستوعبه المتصفح",
        "لأن تعديل innerHTML في كل دورة يسبب 100 عملية Reflow باهظة، والحل تجميع النص وتحديث DOM مرة واحدة",
        "لأن حلقة for لا تعمل مع وسوم HTML",
        "لأن وسم p يجب أن يكون بحروف كبيرة"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 19: مراجعة المشاريع والإصدارات (96..98)
  {
    order: 96,
    title: "المراجع الرسمية ومصادر التوثيق المعتمدة (MDN Reference)",
    concept: "شبكة مطوري موزيلا (MDN Web Docs) ومواصفة ECMA-262 هما المرجعان الرسميان الأكثر موثوقية لتوثيق تفاصيل لغة JavaScript ودوالها ودرجة دعم المتصفحات لكل ميزة برمجية.",
    whyUse: "تغني المطور عن الاعتماد على المنتديات والمعلومات القديمة غير الدقيقة؛ فمعرفة كيفية قراءة التوثيق الرسمي تميز المطور المحترف القادر على استكشاف الميزات وحل المشاكل المعقدة.",
    browserMechanics: "توثق MDN معايير هيئة TC39 التي تقود تطور اللغة؛ حيث تتابع مراحل المقترحات البرمجية وتوضح جداول التوافق (Compatibility Tables) للمتصفحات المختلفة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
    breakdown: [
      "صفحة التوثيق: تشرح المعاملات وأنواع الإرجاع ونماذج الأمثلة العملية.",
      "جدول التوافق (Browser Compatibility): يحدد متى تم دعم الميزة في Chrome و Firefox و Safari.",
      "المواصفات القياسية: رابط مباشر للبند القانوني في معيار ECMA-262 الدولي."
    ],
    bugRepair: {
      brokenCode: "// يعتمد على مصدر قديم غير موثوق يوصي بـ document.all\nlet el = document.all['myId'];",
      fixedCode: "// اعتماد المعيار الرسمي الموثق في MDN\nlet el = document.getElementById('myId');",
      question: "لماذا يُعتبر استخدام document.all ممارسة خاطئة وغير قياسية؟",
      explanation: "خاصية document.all خاصة بإصدارات Internet Explorer القديمة ومهجورة كلياً؛ المعيار القياسي الموثق في MDN هو getElementById أو querySelector.",
      options: [
        "لأن المعرف myId يجب أن يكون رقماً",
        "لأن document.all خاصة بالمتصفحات البائدة ومهجورة، والصواب استخدام getElementById القياسية",
        "لأن الأقواس المربعة ممنوعة مع document",
        "لأن المتصفح الحديث لا يحتوي على كائن document"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 97,
    title: "بناء وتكامل المشاريع البرمجية (JS Projects)",
    concept: "تطبيق كافة المفاهيم المدروسة (المتغيرات، الدوال، الشروط، الحلقات، ومعالجة الأحداث) لبناء مشروع تفاعلي متكامل؛ مثل آلة حاسبة، أو تطبيق إدارة مهام (Todo App)، أو محول عملات.",
    whyUse: "يرسخ المعرفة النظرية ويحولها إلى خبرة عملية حقيقية قادرة على حل مشكلات المستخدمين وربط كود JavaScript بهيكل HTML وتنسيقات CSS بتناغم تام.",
    browserMechanics: "يتفاعل المشروع مع دورة حياة المتصفح الكاملة: ينتظر تحميل الصفحة، ينشئ عناصر في DOM، يسجل مستمعات أحداث في الذاكرة، ويحدث الشاشة في الوقت الحقيقي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting",
    breakdown: [
      "هيكلة المشروع: تقسيم الكود إلى وظائف محددة (إدارة البيانات، تحديث الواجهة، معالجة الأحداث).",
      "إدارة الحالة (State Management): كائن مركزي يحفظ بيانات التطبيق الحالية باستمرار.",
      "ربط الواجهة: تحديث عناصر الصفحة فور تغير الحالة الداخلية للبيانات."
    ],
    bugRepair: {
      brokenCode: "let tasks = [];\nfunction addTask(t) {\n  tasks.push(t);\n  // نسي تحديث واجهة المستخدم\n}",
      fixedCode: "let tasks = [];\nfunction addTask(t) {\n  tasks.push(t);\n  renderTasks(); // استدعاء دالة تحديث الواجهة\n}",
      question: "لماذا تمت إضافة المهمة للمصفوفة لكنها لم تظهر على شاشة المستخدم؟",
      explanation: "تحديث البيانات في الذاكرة وحده لا يكفي؛ يجب استدعاء دالة تحديث الواجهة (render) لعكس البيانات الجديدة على عناصر DOM في الصفحة.",
      options: [
        "لأن المصفوفة tasks لا تقبل إضافة مهام جديدة",
        "لأنه تم تحديث البيانات في الذاكرة دون استدعاء دالة تحديث واجهة المستخدم (render) لعرضها",
        "لأن المهام تتطلب استخدام قواعد بيانات سحابية حصراً",
        "لأن دالة push معطلة داخل الدوال المخصصة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 98,
    title: "إصدارات لغة JavaScript وتطور معيار ECMAScript",
    concept: "ECMAScript هو المعيار الرسمي القياسي للغة JavaScript؛ شهدت اللغة قفزتها التاريخية الكبرى في إصدار ES6 (ES2015)، وتصدر لجنة TC39 إصداراً سنوياً جديداً يضيف ميزات وتحسينات متواصلة للغة.",
    whyUse: "معرفة الإصدارات تمكن المطور من استخدام أحدث الميزات المبتكرة للغة بثقة، وتحديد متى يحتاج لاستخدام أدوات التحويل البرمجي (Babel / Polyfills) لدعم المتصفحات القديمة.",
    browserMechanics: "تتنافس محركات المتصفحات (V8, JavaScriptCore, SpiderMonkey) في تطبيق أحدث مواصفات ECMAScript فور اعتمادها رسمياً في مراحل اللجنة (TC39 Stages).",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#a_short_history",
    breakdown: [
      "ثورة ES6 (ES2015): أضافت let و const و Arrow Functions و Classes و Promises و Modules.",
      "الإصدارات السنوية الحديثة: إضافات متتابعة مثل async/await و Optional Chaining (?.) و BigInt.",
      "أدوات التحويل (Transpilers): تحول الكود الحديث إلى كود متوافق مع كافة البيئات القديمة."
    ],
    bugRepair: {
      brokenCode: "// كود حديث في بيئة متصفح قديم جداً لا يدعم ?.\nlet city = user?.address?.city;",
      fixedCode: "// الصياغة المتوافقة مع كافة الإصدارات القديمة\nlet city = (user && user.address) ? user.address.city : undefined;",
      question: "لماذا يسبب المعامل ?. خطأ في متصفحات قديمة لا تدعم ES2020؟",
      explanation: "المعامل ?. ميزة حديثة أُضيفت في ES2020؛ المتصفحات القديمة تحتاج إما لمعالجة توافقية تقليدية (user && user.address) أو تحويل الكود بـ Babel.",
      options: [
        "لأن علامة الاستفهام ممنوعة في لغة JavaScript",
        "لأن ميزة ?. حديثة ولا تدعمها البيئات القديمة وتتطلب استخدام فحص متسلسل أو أداة تحويل Transpiler",
        "لأن المتغير city يجب أن يكون رقماً",
        "لأن الكائن user يحتوي على خصائص مفقودة"
      ],
      correctOptionIndex: 1
    }
  }
];

function build() {
  console.log("Authoring Skills 16..19 (Lessons 78..98)...");
  const lessons = skillData.map(meta => createLesson(meta));

  // Chunk 16: Skill 16 (78..84)
  const chunk16 = lessons.slice(0, 7);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_16_math_regex.json"), JSON.stringify(chunk16, null, 2), "utf8");

  // Chunk 17: Skill 17 (85..89)
  const chunk17 = lessons.slice(7, 12);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_17_types_destructuring.json"), JSON.stringify(chunk17, null, 2), "utf8");

  // Chunk 18: Skill 18 (90..95)
  const chunk18 = lessons.slice(12, 18);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_18_errors_debugging.json"), JSON.stringify(chunk18, null, 2), "utf8");

  // Chunk 19: Skill 19 (96..98)
  const chunk19 = lessons.slice(18, 21);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_19_projects_versions.json"), JSON.stringify(chunk19, null, 2), "utf8");

  console.log("✔ Skills 16..19 authored and verified successfully! Total lessons:", lessons.length);
  return lessons;
}

if (require.main === module) {
  build();
}

module.exports = { build, skillData };

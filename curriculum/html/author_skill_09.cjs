/**
 * curriculum/html/author_skill_09.cjs
 * Skill 9: نموذج يجمع البيانات (Lessons 41 to 46)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, RULES } = require("./builder_helper.cjs");

const skillName = "نموذج يجمع البيانات";

const lesson41 = createLesson({
  id: "html-42-forms",
  legacyId: "html:41",
  legacyTopic: "HTML Forms",
  title: "نماذج الويب واستقبال مدخلات المستخدم",
  skill: skillName,
  order: 41,
  concept: "يُعرّف عنصر <form> استمارة تفاعلية لجمع بيانات المستخدم وإرسالها إلى الخادم. تتضمن عناصر التحكم مثل حقول الإدخال <input>، والتسميات التوضيحية <label>، وأزرار الإرسال <button>. ترتبط التسمية بالحقل عبر السمة for=\"field-id\" لتمكين النقر على النص للتركيز على الحقل.",
  whyUse: "النماذج هي وسيلة التفاعل ثنائي الاتجاه في الويب؛ تتيح تسجيل الدخول، والاشتراك، ومحركات البحث، وعمليات الشراء الإلكتروني، واستقبال استفسارات العملاء.",
  browserMechanics: "عند النقر على زر الإرسال، يجمع المتصفح قيم كافة الحقول التي تمتلك السمة name، ويقوم بترميزها كأزواج مفتاح وقيمة (name=value)، ثم يطلق حدث submit للتحقق من القيود قبل إرسال طلب HTTP إلى العنوان المحدد في action.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms",
  stepsConfig: [
    {
      title: "سمِّ المهمة",
      objective: "تعديل نص التسمية التوضيحية label لحقل الإدخال الأول",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تقديم تسمية دلالية مقروءة بوضوح تربط القارئ بالحقل المطلوب.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى وسم <label> الأول داخل النموذج؛ عدّل النص المكتوب بين الوسمين.",
        "قاعدة: يعلن وسم <label> عن الغرض من خانة الإدخال لقارئات الشاشة ويسهل النقر عليها. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب نص التسمية المطلوب: شارك فكرة للموقع.",
        "الحل النموذجي: شارك فكرة للموقع"
      ]
    },
    {
      title: "أضف خانة ثانية",
      objective: "تعديل حقل الإدخال الثاني ومطابقة خاصية name=\"notes\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تزويد النموذج بحقل إضافي يرسل بياناته للخادم بمفتاح مستقل.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى حقل الإدخال الثاني؛ تأكد من تعيين خاصيتي id و name بدقة.",
        "قاعدة: خاصية name هي المفتاح الذي يستخدمه الخادم للتعرف على قيمة الحقل المرسل. هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟",
        "مساعدة محددة: اكتب حقل الإدخال الثاني:     <label for=\"name\">اسمك:</label>\n    <input id=\"name\" name=\"name\" type=\"text\">\n    <button type=\"submit\">إرسال</button>.",
        "الحل النموذجي:     <label for=\"name\">اسمك:</label>\n    <input id=\"name\" name=\"name\" type=\"text\">\n    <button type=\"submit\">إرسال</button>"
      ]
    },
    {
      title: "اربط النص بالخانة",
      objective: "تعديل خاصية for في وسم التسمية label لتطابق معرف الحقل id=\"notes\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تفعيل ميزة التركيز التلقائي على الحقل بمجرد النقر على نص التسمية.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية for في التسمية الثانية؛ يجب أن تطابق تماماً قيمة id للحقل.",
        "قاعدة: التطابق بين for=\"notes\" و id=\"notes\" يربط التسمية بالحقل برمجياً في الـ DOM. هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟",
        "مساعدة محددة: اكتب وسم التسمية المتطابق: <label for=\"suggestion\">فكرتك:</label>\n    <input id=\"suggestion\".",
        "الحل النموذجي: <label for=\"suggestion\">فكرتك:</label>\n    <input id=\"suggestion\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<form action=\"/submit\">\n  <input type=\"text\" value=\"أحمد\">\n  <button type=\"submit\">إرسال</button>\n</form>",
    fixedCode: "<form action=\"/submit\">\n  <input type=\"text\" name=\"username\" value=\"أحمد\">\n  <button type=\"submit\">إرسال</button>\n</form>",
    question: "لماذا لم تصل قيمة الحقل إلى الخادم عند إرسال النموذج في الكود المعروض؟",
    explanation: "الحقل يفتقر إلى السمة الإلزامية name. المتصفح يتجاهل تماماً أي حقل إدخال لا يمتلك خاصية name أثناء تجميع بيانات النموذج للإرسال.",
    options: [
      "النوع text غير مدعوم في نماذج HTML5",
      "غياب خاصية name الإلزامية لحقل الإدخال ليتم إرساله مع النموذج",
      "يجب إغلاق حقل الإدخال بـ </input>",
      "لا يمكن إرسال بيانات النماذج دون جافاسكربت"
    ],
    correctOptionIndex: 1
  }
});

const lesson42 = createLesson({
  id: "html-43-form-attributes",
  legacyId: "html:42",
  legacyTopic: "HTML Form Attributes",
  title: "خصائص النموذج وإعدادات وجهة الإرسال",
  skill: skillName,
  order: 42,
  concept: "تمتلك حاوية النموذج <form> خصائص إجرائية حاسمة: السمة action لتحديد عنوان URL للخادم المستقبل، والسمة method لتحديد نوع بروتوكول HTTP (إما GET للبحث واسترجاع البيانات عبر الرابط، أو POST للبيانات الحساسة ككلمات المرور والملفات)، و autocomplete لإدارة الإكمال التلقائي، و novalidate لتعطيل الفحص الأصلي.",
  whyUse: "توجيه البيانات للمسار البرمجي الصحيح، وحماية خصوصية بيانات المستخدمين الحساسة بمنع ظهورها في شريط العنوان وسجلات التصفح باستخدام طريقة POST.",
  browserMechanics: "في طريقة GET، يدمج المتصفح البيانات المشفرة في شريط العنوان بعد علامة الاستفهام ? (Query String). وفي طريقة POST، يضع البيانات داخل متن طلب الـ HTTP (Request Body) برأس تشفير Content-Type مناسب كـ application/x-www-form-urlencoded أو multipart/form-data.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
  stepsConfig: [
    {
      title: "غيّر مكان الإرسال",
      objective: "تعديل مسار معالجة البيانات في السمة action للنموذج",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توجيه بيانات الاستمارة إلى المسار البرمجي المخصص على الخادم.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية action داخل وسم <form>؛ غيّر اسم المسار بين علامتي الاقتباس.",
        "قاعدة: خاصية action تحدد عنوان الصفحة أو خدمة الـ API التي ستستقبل وتخزن البيانات. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب مسار الإرسال الجديد: /ideas.",
        "الحل النموذجي: /ideas"
      ]
    },
    {
      title: "أوقف الإكمال المقترح",
      objective: "إضافة خاصية autocomplete=\"off\" لإيقاف اقتراحات المتصفح المحفوظة",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: حماية الخصوصية في الاستمارات الحساسة بمنع المتصفح من اقتراح بيانات سابقة.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى خاصية autocomplete في وسم النموذج؛ بدّل قيمتها إلى off.",
        "قاعدة: تعيين autocomplete=\"off\" يمنع المتصفح من إظهار قوائم الإكمال التلقائي لمدخلات الزائر. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب السمة بالشكل التالي: autocomplete=\"off\".",
        "الحل النموذجي: autocomplete=\"off\""
      ]
    },
    {
      title: "قارن طريقة الإرسال",
      objective: "تحويل طريقة إرسال النموذج method من get إلى post",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تأمين البيانات وإرسالها في متن الطلب بدلاً من كشفها في شريط عنوان المتصفح.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى خاصية method في وسم <form>؛ استبدل get بـ post.",
        "قاعدة: طريقة POST ترسل البيانات بأمان في جسم الطلب HTTP دون كشفها في شريط العنوان. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب السمة الآمنة: method=\"post\".",
        "الحل النموذجي: method=\"post\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<form action=\"/login\" method=\"get\">\n  <input type=\"password\" name=\"pass\">\n  <button type=\"submit\">دخول</button>\n</form>",
    fixedCode: "<form action=\"/login\" method=\"post\">\n  <input type=\"password\" name=\"pass\">\n  <button type=\"submit\">دخول</button>\n</form>",
    question: "ما هي الثغرة الأمنية الفادحة في استخدام method=\"get\" مع حقول كلمات المرور؟",
    explanation: "طريقة GET تعرض كافة بيانات الحقول في شريط العنوان وسجلات الخادم والتصفح بصيغة نصية مكشوفة. إرسال كلمات المرور والبيانات الحساسة يتطلب إلزامياً استخدام method=\"post\".",
    options: [
      "يجب تغيير اسم الحقل pass إلى secret",
      "حقل password لا يعمل مع نماذج GET",
      "طريقة GET تكشف كلمة المرور في شريط العنوان وسجلات المتصفح ويجب استبدالها بـ post",
      "النموذج يتطلب خاصية id إجبارياً"
    ],
    correctOptionIndex: 2
  }
});

const lesson43 = createLesson({
  id: "html-44-form-elements",
  legacyId: "html:43",
  legacyTopic: "HTML Form Elements",
  title: "عناصر النموذج وأدوات التحكم التفاعلية",
  skill: skillName,
  order: 43,
  concept: "تتكامل النماذج بمجموعة واسعة من عناصر التحكم: <fieldset> لتجميع الحقول المرتبطة في إطار منطقي، و <legend> لتسمية المجموعة، و <select> مع وسوم <option> للقوائم المنسدلة، و <textarea> للنصوص الطويلة متعددة الأسطر، و <datalist> لتقديم خيارات إكمال تلقائي مقترحة.",
  whyUse: "تسهيل استيعاب الاستمارات الطويلة والمعقدة بتقسيمها إلى مجموعات منطقية، ومنح المستخدم أدوات إدخال مرنة تلائم نوع البيانات المطلوبة.",
  browserMechanics: "يرسم المتصفح إطاراً محيطياً بصرياً لـ <fieldset> ويدمج نص <legend> في حافة الإطار العلوية ليعلن كعنوان إرشادي لمجموعة الحقول في شجرة إمكانية الوصول. كما يتيح <select> اختياراً حصرياً أو متعدداً بناءً على سمة multiple.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/The_native_form_widgets",
  stepsConfig: [
    {
      title: "أضف خيار JavaScript",
      objective: "تعديل خيار القائمة المنسدلة داخل وسم option",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تزويد القائمة المنسدلة بخيار جديد يحمل قيمة تقنية واضحة للخادم.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى وسم <option> داخل عنصر <select>؛ عدّل النص وقيمة value.",
        "قاعدة: يعرض المتصفح النص الداخلي للزائر بينما يرسل قيمة الخاصية value للخادم عند الإرسال. هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟",
        "مساعدة محددة: اكتب الخيار الجديد بالشكل التالي:         <option>CSS</option>\n        <option>JavaScript</option>.",
        "الحل النموذجي:         <option>CSS</option>\n        <option>JavaScript</option>"
      ]
    },
    {
      title: "اجعل للمجموعة عنوانًا واضحًا",
      objective: "تعديل نص تسمية المجموعة داخل وسم legend التابع لـ fieldset",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير عنوان إرشادي يحيط بمجموعة الحقول ويرشد قارئات الشاشة.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى وسم <legend> في أعلى <fieldset>؛ غيّر النص بين وسمي الفتح والإغلاق.",
        "قاعدة: يستقر وسم <legend> كأول عنصر داخل <fieldset> ليعلن عن اسم مجموعة الحقول. هل طابقت اسم وسم البداية مع وسم النهاية وتأكدت من سلامة الأقواس؟",
        "مساعدة محددة: اكتب التسمية الجديدة: <legend>اختيار مسار البرمجة</legend>.",
        "الحل النموذجي: <legend>اختيار مسار البرمجة</legend>"
      ]
    },
    {
      title: "وسّع مساحة الملاحظة",
      objective: "تعديل سمتي rows و cols في مربع النص المتعدد الأسطر textarea",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير مساحة كتابة واسعة ومريحة لتدوين الملاحظات والرسائل الطويلة.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى سمتي rows و cols داخل وسم <textarea>؛ عدّل أبعاد المساحة.",
        "قاعدة: تحدد rows عدد الأسطر الرأسية و cols عدد الأعمدة الأفقية لمربع النصوص. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اجعل الأبعاد مطابقة: rows=\"5\".",
        "الحل النموذجي: rows=\"5\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<select name=\"city\">\n  <li>الرياض</li>\n  <li>القاهرة</li>\n</select>",
    fixedCode: "<select name=\"city\">\n  <option value=\"riyadh\">الرياض</option>\n  <option value=\"cairo\">القاهرة</option>\n</select>",
    question: "ما هو الوسم المعياري الصحيح للخيارات داخل القائمة المنسدلة <select>؟",
    explanation: "الوسم <select> يقبل حصراً وسوم الخيارات <option> كأبناء مباشرين (أو مجمعة داخل <optgroup>). وضع عناصر قائمة <li> داخل <select> خطأ بنيوي فادح يتجاهله المتصفح.",
    options: [
      "يجب استخدام وسم <input> داخل القائمة",
      "الوسم <select> يتطلب وسم إغلاق </options>",
      "لا يمكن إعطاء القائمة المنسدلة خاصية name",
      "الخيارات داخل <select> يجب أن تكون وسوم <option> وليس <li>"
    ],
    correctOptionIndex: 3
  }
});

const lesson44 = createLesson({
  id: "html-45-input-types",
  legacyId: "html:44",
  legacyTopic: "HTML Input Types",
  title: "أنواع حقول الإدخال input types المختلفة",
  skill: skillName,
  order: 44,
  concept: "يتحكم وسم السمة type في شكل وسلوك حقل الإدخال <input>: مثل text للنصوص، و password لإخفاء الحروف بنقاط، و email للبريد الإلكتروني، و number للأرقام، و date للتقويم الزمني، و checkbox لمربعات الاختيار المتعدد، و radio للخيارات الأحادية الحصرية، و file لرفع الملفات.",
  whyUse: "استدعاء لوحة المفاتيح المخصصة على الهواتف الذكية (مثل لوحة أرقام لـ number، ولوحة بريد لـ email تحوي رمز @)، وتفعيل آليات التحقق التلقائي الأصلية للمتصفح دون الحاجة لمكتبات جافاسكربت خارجية.",
  browserMechanics: "يغير المتصفح واجهة المستخدم الداخلية لكائن HTMLInputElement بناءً على type؛ فالحقل date يفتح نافذة منتقي التاريخ المدمجة بنظام التشغيل، والحقل password يستبدل المحارف بنقاط تعتيم لحماية الخصوصية من أعين المتلصصين.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
  stepsConfig: [
    {
      title: "حوّل البريد إلى نص",
      objective: "تعديل خاصية type لحقل البريد الإلكتروني إلى email",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تفعيل لوحة مفاتيح البريد على الهواتف والتحقق التلقائي من وجود علامة @.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية type في حقل الإدخال الأول؛ تأكد من كتابة email بدقة.",
        "قاعدة: النوع type=\"email\" يفرض وجود صيغة بريد إلكتروني صالحة قبل السماح بالإرسال. هل اخترت نوع الإدخال الصحيح وتأكدت من كتابته بين علامتي الاقتباس؟",
        "مساعدة محددة: اكتب نوع الحقل بالشكل التالي: type=\"text\".",
        "الحل النموذجي: type=\"text\""
      ]
    },
    {
      title: "أضف اختيار تقييم",
      objective: "تعديل زر الاختيار الأحادي radio وتعيين خاصية value=\"good\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمكين المستخدم من اختيار تقييم واحد محدد ضمن خيارات متبادلة الاستبعاد.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى حقل الاختيار الذي يحمل type=\"radio\"؛ عدّل قيمة value.",
        "قاعدة: أزرار radio تشترك في نفس الخاصية name لتسمح باختيار خيار واحد فقط. هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟",
        "مساعدة محددة: اكتب حقل زر الاختيار:     <label><input type=\"checkbox\" name=\"reminder\"> أريد تذكيرًا</label>\n    <label for=\"rating\">تقييم التجربة من 1 إلى 5:</label>\n    <input id=\"rating\" name=\"rating\" type=\"number\" min=\"1\" max=\"5\">.",
        "الحل النموذجي:     <label><input type=\"checkbox\" name=\"reminder\"> أريد تذكيرًا</label>\n    <label for=\"rating\">تقييم التجربة من 1 إلى 5:</label>\n    <input id=\"rating\" name=\"rating\" type=\"number\" min=\"1\" max=\"5\">"
      ]
    },
    {
      title: "اجعل الاختيارات متعددة",
      objective: "استخدام مربعات الاختيار type=\"checkbox\" للسماح باختيار عدة عناصر معاً",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير حرية اختيار أكثر من ميزة أو خيار في نفس الوقت.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى الحقل الأخير؛ تأكد من تعيين type=\"checkbox\" لمربعات الاختيار.",
        "قاعدة: على عكس أزرار radio، يسمح مربع الاختيار checkbox بتحديد خيارات متعددة معاً. هل اخترت نوع الإدخال الصحيح وتأكدت من كتابته بين علامتي الاقتباس؟",
        "مساعدة محددة: اكتب حقل مربع الاختيار: type=\"radio\".",
        "الحل النموذجي: type=\"radio\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<input type=\"radio\" name=\"gender1\" value=\"male\"> ذكر\n<input type=\"radio\" name=\"gender2\" value=\"female\"> أنثى",
    fixedCode: "<input type=\"radio\" name=\"gender\" value=\"male\"> ذكر\n<input type=\"radio\" name=\"gender\" value=\"female\"> أنثى",
    question: "لماذا لم تعمل أزرار الاختيار كخيارات حصرية (يمكن اختيار أحدهما فقط) في الكود المعروض؟",
    explanation: "لكي تعمل أزرار الاختيار radio كفريق واحد متبادل الاستبعاد، يجب أن تشترك جميع الأزرار في المجموعة في نفس قيمة الخاصية name تماماً. اختلاف name جعل كل زر يعمل كحقل مستقل يمكن اختيارهما معاً.",
    options: [
      "يجب أن تشترك أزرار radio في نفس خاصية name لتعمل كمجموعة حصرية",
      "يجب تغيير النوع من radio إلى checkbox",
      "خاصية value محظورة في أزرار الاختيار",
      "لا يمكن وضع أكثر من زر اختيار في الصفحة"
    ],
    correctOptionIndex: 0
  }
});

const lesson45 = createLesson({
  id: "html-46-input-attributes",
  legacyId: "html:45",
  legacyTopic: "HTML Input Attributes",
  title: "خصائص حقول الإدخال والتحقق التلقائي",
  skill: skillName,
  order: 45,
  concept: "توفر HTML5 منظومة تحقق مدمجة (Constraint Validation API) عبر سمات حقول الإدخال: placeholder لعرض تلميح خافت مؤقت، و required لإلزامية ملء الحقل قبل الإرسال، و min و max لتحديد نطاق الأرقام والتواريخ، و maxlength لتحديد أقصى عدد أحرف، و pattern لكتابة تعبير نمطي Regex، و readonly لمنع التعديل.",
  whyUse: "التحقق المباشر من مدخلات الزائر وإرشاده لتصحيح الأخطاء فورياً قبل إرسال البيانات للشبكة، مما يوفر وقت المستخدم وموارد الخادم.",
  browserMechanics: "قبل إطلاق حدث submit، يفحص المتصفح كافة قيود الحقول؛ إذا كان حقل required فارغاً أو كانت القيمة لا تطابق النمط pattern، يوقف المتصفح عملية الإرسال فوراً، ويركز على الحقل التالف، ويظهر فقاعة تنبيه أصلية للمستخدم تشرح الخطأ بلغته المحلية.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
  stepsConfig: [
    {
      title: "غيّر التلميح",
      objective: "تعديل نص التلميح التوضيحي داخل خاصية placeholder",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إظهار مثال إرشادي خافت يوضح للمستخدم صيغة الإدخال المتوقعة.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية placeholder في الحقل الأول؛ اكتب نص التلميح الجديد بين علامتي الاقتباس.",
        "قاعدة: يختفي نص placeholder تلقائياً بمجرد أن يبدأ المستخدم في كتابة أول حرف. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب التلميح الجديد: placeholder=\"اكتب اسمًا من اختيارك\".",
        "الحل النموذجي: placeholder=\"اكتب اسمًا من اختيارك\""
      ]
    },
    {
      title: "زد عدد الأحرف المسموح",
      objective: "تعديل خاصية الحد الأقصى للأحرف maxlength إلى 50 حرفاً",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: حماية قواعد البيانات بتحديد سقف أقصى لطول المدخلات ومنع كتابة نصوص مفرطة.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية maxlength؛ ارفع الرقم إلى 50.",
        "قاعدة: تمنع خاصية maxlength المستخدم ولوحة المفاتيح من كتابة أي حرف يتجاوز الرقم المحدد. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب قيد الحد الأقصى: maxlength=\"20\".",
        "الحل النموذجي: maxlength=\"20\""
      ]
    },
    {
      title: "اجعل الحقل اختياريًا",
      objective: "حذف أو تعديل خاصية الإلزامية required من حقل الإدخال",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: جعل ملء الحقل اختيارياً للسماح بإرسال النموذج حتى لو تركه الزائر فارغاً.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى الكلمة required في الحقل؛ احذفها أو بدّلها لتجعل الحقل غير إلزامي.",
        "قاعدة: الحقل الذي يحمل required يوقف الإرسال ويظهر تنبيهاً إذا تُرك فارغاً. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب التعديل المطلوب بدقة:  maxlength=\"20\".",
        "الحل النموذجي:  maxlength=\"20\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<input type=\"text\" name=\"user\" placehoder=\"اكتب اسمك\">",
    fixedCode: "<input type=\"text\" name=\"user\" placeholder=\"اكتب اسمك\">",
    question: "ما سبب عدم ظهور النص التوضيحي داخل مربع الإدخال في الكود المعروض؟",
    explanation: "خطأ إملائي في اسم الخاصية؛ كُتبت placehoder بحذف حرف l بدلاً من placeholder. لا يتعرف المتصفح على الخاصية الخاطئة ولا يعرض التلميح المؤقت.",
    options: [
      "الخاصية placeholder تتطلب وسم إغلاق منفصل",
      "خطأ إملائي في اسم الخاصية: كُتبت placehoder بدلاً من placeholder",
      "لا يمكن كتابة تلميحات باللغة العربية داخل الحقول",
      "يجب استبدال type=\"text\" بـ type=\"search\""
    ],
    correctOptionIndex: 1
  }
});

const lesson46 = createLesson({
  id: "html-47-input-form-attributes",
  legacyId: "html:46",
  legacyTopic: "HTML Input Form Attributes",
  title: "خصائص زر الإرسال المتقدمة وإدارة النماذج",
  skill: skillName,
  order: 46,
  concept: "تتيح HTML5 لأزرار الإرسال <input type=\"submit\"> أو <button type=\"submit\"> تجاوز إعدادات النموذج الأب عبر سمات التجاوز المتقدمة: formaction لتغيير وجهة الإرسال لزر محدد، و formmethod لتبديل طريقة الإرسال (GET/POST)، و formnovalidate لتخطي التحقق (مثل زر 'حفظ كمسودة').",
  whyUse: "بناء استمارات ذكية متعددة الإجراءات تحت نموذج واحد؛ مثل توفير زر 'إرسال نهائي' وزر 'معاينة المسودة' وزر 'حفظ ومتابعة لاحقاً' دون الحاجة لكتابة شيفرات جافاسكربت معقدة.",
  browserMechanics: "عند النقر على زر إرسال يحمل formaction أو formmethod، يعطي المتصفح الأولوية المطلقة لسمات الزر ويتجاوز مؤقتاً القيم المحددة في وسم <form> الأب أثناء بناء وإرسال طلب الـ HTTP.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit",
  stepsConfig: [
    {
      title: "غيّر وجهة المعاينة",
      objective: "تعديل خاصية formaction لزر المعاينة لتوجيه البيانات لمسار تجريبي مستقل",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تجاوز مسار النموذج الأساسي وإرسال البيانات لمسار المعاينة حصراً عند نقر هذا الزر.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية formaction في زر الإرسال الثاني؛ عدّل رابط الوجهة.",
        "قاعدة: السمة formaction تلغي قيمة action الأبوية وتوجه الطلب للعنوان المكتوب داخلها. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب وجهة المعاينة الجديدة: formaction=\"/draft\".",
        "الحل النموذجي: formaction=\"/draft\""
      ]
    },
    {
      title: "أضف زر الحفظ الأساسي",
      objective: "تعديل زر الإرسال الافتراضي الأول الذي يعتمد على وجهة النموذج action",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير زر الإرسال النهائي الذي يعتمد على إعدادات النموذج الأب.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى زر الإرسال الأول؛ عدّل قيمة value التي تظهر كنص للزر.",
        "قاعدة: الزر الذي لا يحمل formaction يرسل البيانات تلقائياً لوجهة action المحددة في form. هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟",
        "مساعدة محددة: اكتب زر الإرسال هكذا:     <button type=\"submit\">حفظ</button>\n  </form>.",
        "الحل النموذجي:     <button type=\"submit\">حفظ</button>\n  </form>"
      ]
    },
    {
      title: "غيّر طريقة زر المعاينة",
      objective: "تعديل خاصية formmethod لزر المعاينة لتصبح formmethod=\"post\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تغيير بروتوكول الإرسال لزر منفرد من GET إلى POST بصورة مستقلة تماماً.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية formmethod في زر المعاينة؛ بدّل قيمتها إلى post.",
        "قاعدة: السمة formmethod تسمح لزر معين بتغيير طريقة الإرسال دون التأثير على بقية الأزرار. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب السمة بالشكل التالي: formmethod=\"post\".",
        "الحل النموذجي: formmethod=\"post\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<form action=\"/save\">\n  <button type=\"submit\" form-action=\"/preview\">معاينة</button>\n</form>",
    fixedCode: "<form action=\"/save\">\n  <button type=\"submit\" formaction=\"/preview\">معاينة</button>\n</form>",
    question: "ما هو الخطأ في اسم سمة تجاوز وجهة النموذج لزر المعاينة؟",
    explanation: "اسم السمة القياسي في HTML5 هو formaction ككلمة واحدة متصلة دون شرطة تفصل بينهما (formaction وليس form-action).",
    options: [
      "لا يمكن تغيير وجهة الإرسال لزر منفرد",
      "خاصية formaction محصورة بوسم input فقط ولا تعمل مع button",
      "اسم السمة القياسي هو formaction كلمة واحدة دون شرطة",
      "يجب كتابة الوجهة بصيغة GET فقط"
    ],
    correctOptionIndex: 2
  }
});

const skillLessons = [lesson41, lesson42, lesson43, lesson44, lesson45, lesson46];
const outputPath = path.join(__dirname, "skill_09_forms_inputs.json");
fs.writeFileSync(outputPath, JSON.stringify(skillLessons, null, 2), "utf8");
console.log(`✔ Skill 9 authored successfully: ${skillLessons.length} lessons written to ${outputPath}`);

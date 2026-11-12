/**
 * curriculum/html/author_skill_07.cjs
 * Skill 7: تجهيز الصفحة للموقع (Lessons 28 to 34)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, RULES } = require("./builder_helper.cjs");

const skillName = "تجهيز الصفحة للموقع";

const lesson28 = createLesson({
  id: "html-29-file-paths",
  legacyId: "html:28",
  legacyTopic: "HTML File Paths",
  title: "مسارات الملفات النسبية والمطلقة للموارد",
  skill: skillName,
  order: 28,
  concept: "تحدد مسارات الملفات (File Paths) موقع الموارد (صور، سكربتات، ملفات تنسيق) المرتبطة بالمستند. تنقسم إلى مسارات مطلقة تبدأ بالبروتوكول الكامل (https://...) أو الجذر (/...)، ومسارات نسبية تعتمد على موقع الملف الحالي: مثل images/pic.jpg للمجلدات الفرعية، و ../pic.jpg للصعود مجلداً واحداً للأعلى.",
  whyUse: "فهم المسارات النسبية يضمن بقاء الروابط والموارد تعمل بنجاح عند نقل الموقع بين بيئات التطوير المحلية وخوادم الإنتاج السحابية دون انكسار الروابط.",
  browserMechanics: "يقوم محلل URL في المتصفح بدمج المسار النسبي مع عنوان الصفحة الحالي (Base URL) وفق خوارزمية تحليل المسار القياسية (RFC 3986) لإنتاج عنوان URL مطلق قبل إرسال طلب الشبكة لجلب المورد.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_hyperlinks#document_fragments",
  stepsConfig: [
    {
      title: "تتبّع مجلد الصور",
      objective: "تعديل مسار الصورة النسبي المباشر داخل مجلد images/",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تنظيم ملفات الصور في مجلد مستقل وتضمينها بمسار نسبي منظم.",
      errorRules: [RULES.typoSrcAttribute, RULES.missingImgAlt],
      hints: [
        "انتبه إلى خاصية src في وسم الصورة الأول؛ اكتب اسم المجلد يليه شرطة مائلة واسم الملف.",
        "قاعدة: يشير المسار images/photo.jpg إلى مجلد يقع في نفس مستوى صفحة HTML الحالية. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب المسار النسبي الجديد: images/cover.jpg.",
        "الحل النموذجي: images/cover.jpg"
      ]
    },
    {
      title: "اصعد مستوى واحدًا",
      objective: "تعديل المسار النسبي الصاعد باستخدام نقطتين وشرطة مائلة ../",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: الوصول إلى موارد تقع في المجلد الأب الأعلى درجة في شجرة الملفات.",
      errorRules: [RULES.typoSrcAttribute, RULES.missingImgAlt],
      hints: [
        "انتبه إلى الرمزين ../ في بداية المسار؛ هما يعبران عن الصعود خطوة للمجلد الأب.",
        "قاعدة: استخدام ../ يسمح للصفحات داخل المجلدات الفرعية بالوصول لصور وموارد المجلد الرئيسي. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب المسار الصاعد ليصبح: ../shared/cover.jpg.",
        "الحل النموذجي: ../shared/cover.jpg"
      ]
    },
    {
      title: "حدّث مسار صورة الصفحة",
      objective: "تحديث مسار الصورة الثالثة لملف يقع بجوار صفحة الويب في نفس المجلد",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: استدعاء ملف صورة متواجد مباشرة في نفس المسار دون بادئات إضافية.",
      errorRules: [RULES.typoSrcAttribute, RULES.missingImgAlt],
      hints: [
        "انتبه إلى الصورة الأخيرة؛ اكتب اسم ملف الصورة مباشرة دون أي مجلدات.",
        "قاعدة: كتابة اسم الملف مجرداً تعني أن الصورة تستقر في نفس المجلد مع ملف HTML. هل راجعت مسار ملف المورد وتأكدت من كتابة الامتداد الصحيح؟",
        "مساعدة محددة: اكتب اسم الملف هكذا: src=\"images/first-project.jpg\".",
        "الحل النموذجي: src=\"images/first-project.jpg\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<img src=\"C:\\Users\\Site\\images\\photo.jpg\" alt=\"صورة\">",
    fixedCode: "<img src=\"images/photo.jpg\" alt=\"صورة\">",
    question: "لماذا تفشل الصورة ذات المسار المحلي (C:\\...) في الظهور عند رفع الموقع على خادم الإنترنت؟",
    explanation: "المسار المعروض هو مسار نظام ملفات ويندوز محلي على جهاز المطور الشخصي. تمنع المتصفحات لأسباب أمنية الوصول للمسارات المحلية، ولن يتوفر هذا المسار لأي زائر على شبكة الإنترنت. يجب استخدام مسارات نسبية كـ images/photo.jpg.",
    options: [
      "استخدام مسار محلي لنظام الملفات (C:\\...) غير متاح على خوادم الويب ويجب استبداله بمسار نسبي",
      "الصور تقبل الامتداد png فقط",
      "خاصية alt محظورة مع الصور المحلية",
      "يجب إغلاق الصورة بـ </img>"
    ],
    correctOptionIndex: 0
  }
});

const lesson29 = createLesson({
  id: "html-30-head",
  legacyId: "html:29",
  legacyTopic: "HTML Head",
  title: "قسم معلومات الصفحة وعناصر head الأساسية",
  skill: skillName,
  order: 29,
  concept: "قسم <head> هو مستودع البيانات الوصفية (Metadata) لصفحة الويب. يحتوي على عناصر حيوية لا تظهر في المتن ولكنها تتحكم في سلوك الصفحة: <title> لعنوان التبويب، <meta charset=\"UTF-8\"> للترميز، <meta name=\"viewport\"> للتجاوب مع الهواتف، <meta name=\"description\"> لمحركات البحث، وروابط التنسيق <link> وأكواد <style> و <script>.",
  whyUse: "توجيه المتصفح ومحركات البحث ووسائل التواصل الاجتماعي (Open Graph) لكيفية قراءة وتفسير وعرض بطاقة المعاينة للصفحة وحمايتها من التشوّه اللغوي.",
  browserMechanics: "يعالج المتصفح عناصر الرأس قبل البدء في رسم أي بكسل في المتن body. تهيئة الترميز ومنافذ الرؤية مبكراً تحمي المتصفح من الحاجة لإعادة تحليل الوثيقة من الصفر (Reparse) وتضمن تناسق مقاييس الشاشة.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head",
  stepsConfig: [
    {
      title: "لخّص محتوى الصفحة",
      objective: "تعديل نص وصف المستند في وسم meta name=\"description\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تزويد محركات البحث بملخص جذاب يظهر أسفل عنوان الرابط في نتائج البحث.",
      errorRules: [RULES.missingHeadTag, RULES.voidElementClosingTag],
      hints: [
        "انتبه إلى خاصية content في السطر الذي يحمل name=\"description\"؛ عدّل النص التلخيصي.",
        "قاعدة: وسم وصف الصفحة meta description يساعد الزوار على معرفة محتوى الصفحة قبل فتحها. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الوصف الجديد: صفحة تتعلم فيها عناصر HTML بالتجربة..",
        "الحل النموذجي: صفحة تتعلم فيها عناصر HTML بالتجربة."
      ]
    },
    {
      title: "سمِّ المستند",
      objective: "تعديل اسم الصفحة داخل وسم title في الرأس",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تحديد هوية عنوان الصفحة في شريط التبويب وقوائم العلامات المرجعية.",
      errorRules: [RULES.unclosedTitle, RULES.titleInBody],
      hints: [
        "انتبه إلى وسم <title> داخل قسم head؛ عدّل النص المحصور بين الوسمين.",
        "قاعدة: يجب أن يكون عنوان الصفحة فريداً ومعبراً عن المحتوى المتواجد بداخلها. هل تأكدت من إغلاق وسم title بشكل سليم داخل قسم head؟",
        "مساعدة محددة: اكتب العنوان المطلوب: <title>ملاحظات HTML</title>.",
        "الحل النموذجي: <title>ملاحظات HTML</title>"
      ]
    },
    {
      title: "أضف بيانات الكاتب",
      objective: "تعديل اسم المؤلف في وسم meta name=\"author\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توثيق الملكية الفكرية واسم ناشر المحتوى في البيانات الوصفية للمستند.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى السطر الذي يحمل name=\"author\"؛ اكتب اسمك أو اسم الكاتب داخل خاصية content.",
        "قاعدة: تتيح البيانات الوصفية توثيق هوية المبرمج أو الناشر في رأس الصفحة لأغراض الأرشفة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اجعل محتوى الكاتب مطابقاً:   <meta name=\"author\" content=\"متعلم الويب\">\n  <meta name=\"description\".",
        "الحل النموذجي:   <meta name=\"author\" content=\"متعلم الويب\">\n  <meta name=\"description\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<head>\n  <meta charset=\"UTF-8\">\n  <h1>عنوان المقال</h1>\n</head>",
    fixedCode: "<head>\n  <meta charset=\"UTF-8\">\n  <title>عنوان المقال</title>\n</head>",
    question: "ما هو المحظور البنائي في وضع وسم <h1> داخل قسم <head>؟",
    explanation: "قسم <head> مخصص حصراً للبيانات الوصفية غير المرئية. وضع عناصر بصرية كـ <h1> داخله مخالف للمعيار وسيقوم المتصفح بإغلاق الرأس قسراً ونقل <h1> إلى متن الصفحة <body>.",
    options: [
      "خاصية charset غير مدعومة في head",
      "وضع عنصر مرئي <h1> داخل قسم <head> المخصص للبيانات الوصفية فقط",
      "يجب إغلاق head بـ </body>",
      "لا يمكن كتابة نصوص عربية في العناوين"
    ],
    correctOptionIndex: 1
  }
});

const lesson30 = createLesson({
  id: "html-31-layout",
  legacyId: "html:30",
  legacyTopic: "HTML Layout",
  title: "تخطيط الصفحة وهيكلة الواجهة الحديثة",
  skill: skillName,
  order: 30,
  concept: "يعتمد تخطيط صفحات الويب الحديثة على منظومة وسوم دلالية رئيسية: <header> لترويسة الموقع وشعاره، <nav> لروابط شريط التنقل، <main> للمحتوى الجوهري الأوحد للصفحة، <section> لتقسيم الفصول، <article> للوحدات المستقلة القابلة للنشر، <aside> للأشرطة الجانبية، و <footer> لتذييل الصفحة وحقوق النشر.",
  whyUse: "استبدال الفوضى الناتجة عن تكديس وسوم div العشوائية (Div Soup) بهيكل معماري قياسي ونظيف تفهمه خوارزميات محركات البحث وتقنيات قراءة الشاشة للمكفوفين.",
  browserMechanics: "تُمنح هذه الوسوم الدلالية نمط العرض display: block افتراضياً وتدرج في شجرة إمكانية الوصول بأدوار معيارية واضحة (Landmarks مثل banner, navigation, main, contentinfo)، مما يسمح لمستخدمي قارئات الشاشة بالقفز المباشر لقسم المحتوى بضغطة زر واحدة.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_layout",
  stepsConfig: [
    {
      title: "اكتب عنوان المساحة",
      objective: "تعديل عنوان ترويسة الموقع الرئيسية داخل وسم header",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تحديد شعار الموقع أو عنوانه العريض في الموضع المعماري الصحيح <header>.",
      errorRules: [RULES.mismatchedHTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <h1> الواقع داخل حاوية <header> الدلالية؛ غيّر النص فقط.",
        "قاعدة: الحاوية <header> تجمع شعار الموقع وعنوانه وشريط التنقل التمهيدي. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب العنوان المطلوب: مساحة تعلّمي.",
        "الحل النموذجي: مساحة تعلّمي"
      ]
    },
    {
      title: "غيّر ملاحظة الجانب",
      objective: "تعديل محتوى الشريط الجانبي داخل وسم aside الدلالي",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمييز المحتوى الجانبي المساعد والمعلومات الإثرائية في وسم دلالي مستقل.",
      errorRules: [RULES.mismatchedPSpan, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <aside> المخصص للشريط الجانبي؛ عدّل نص الفقرة بداخله.",
        "قاعدة: الوسم <aside> مخصص للمحتوى المرتبط هامشياً بالموضوع الرئيسي كالروابط الإضافية والتنبيهات. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الملاحظة الجديدة: تذكير: خطوة واحدة تكفي..",
        "الحل النموذجي: تذكير: خطوة واحدة تكفي."
      ]
    },
    {
      title: "أضف قسمًا للمشاريع",
      objective: "تعديل وإضافة قسم دلالي مستقل section داخل المحتوى الرئيسي main",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تنظيم موضوعات المقال في أقسام ذات دلالة واضحة ومستقلة.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى نهاية المحتوى الرئيسي <main>؛ تأكد من بنية وسم <section> الداخلي.",
        "قاعدة: الوسم <section> يمثل فصلاً موضوعياً قائماً بذاته يحتوي على عنوانه وفقراته الخاصة. هل وضعت النص المطلوب بدقة بين وسمَي الفتح والإغلاق دون حذف الأقواس؟",
        "مساعدة محددة: اكتب القسم الجديد:     <aside>تذكير: خطوة واحدة تكفي.</aside>\n    <section><h2>مشاريعي</h2><p>أضيف تجربة جديدة كلما تعلمت.</p></section>\n  </main>.",
        "الحل النموذجي:     <aside>تذكير: خطوة واحدة تكفي.</aside>\n    <section><h2>مشاريعي</h2><p>أضيف تجربة جديدة كلما تعلمت.</p></section>\n  </main>"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<body>\n  <main>المحتوى الأول</main>\n  <main>المحتوى الثاني</main>\n</body>",
    fixedCode: "<body>\n  <main>\n    <section>المحتوى الأول</section>\n    <section>المحتوى الثاني</section>\n  </main>\n</body>",
    question: "لماذا يُعد تكرار وسم <main> مرتين في الصفحة الواحدة مخالفاً لمواصفات HTML؟",
    explanation: "تنص مواصفات WHATWG و W3C على أنه لا يجوز أن تحتوي الوثيقة الواحدة على أكثر من عنصر <main> مرئي واحد، لأنه يمثل المحتوى المركزي الفريد للمستند.",
    options: [
      "يجب إغلاق main بـ </content>",
      "الوسم <main> يتطلب خاصية id إجبارياً",
      "تكرار وسم <main> أكثر من مرة في نفس الصفحة يخالف المواصفة القياسية",
      "عنصر <main> محظور استخدامه داخل body"
    ],
    correctOptionIndex: 2
  }
});

const lesson31 = createLesson({
  id: "html-32-responsive",
  legacyId: "html:31",
  legacyTopic: "HTML Responsive",
  title: "التصميم المتجاوب وملاءمة الشاشات",
  skill: skillName,
  order: 31,
  concept: "التصميم المتجاوب (Responsive Web Design) هو منهجية تضمن ملاءمة موقع الويب لجميع أحجام الشاشات (هواتف، أجهزة لوحية، حواسيب). يبدأ بوسم منفذ الرؤية الإلزامي <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> في الرأس، ويكتمل بقواعد استعلامات الوسائط @media وصور الويب المتجاوبة.",
  whyUse: "تصفح الويب اليوم يتم بأكثر من 60% عبر الهواتف الذكية؛ وبدون إعدادات التجاوب، سيعرض المتصفح الصفحة بحجم شاشة حاسوب مصغرة تتطلب تكبيراً يدوياً مزعجاً.",
  browserMechanics: "يخبر وسم viewport محرك المتصفح بضبط عرض نافذة التنسيق الافتراضية (Layout Viewport) ليتطابق مع العرض الفعلي لشاشة الجهاز (Device Width)، ويضبط مقياس التكبير الأولي initial-scale على 1.0 لمنع التصغير التلقائي.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
  stepsConfig: [
    {
      title: "أضف إعداد شاشة الهاتف",
      objective: "تعديل وسم منفذ الرؤية meta viewport داخل قسم الرأس",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تفعيل نمط التجاوب على الهواتف الذكية ومنع التصغير التلقائي غير المريح.",
      errorRules: [RULES.missingHeadTag, RULES.voidElementClosingTag],
      hints: [
        "انتبه إلى وسم meta المخصص لمنفذ الرؤية viewport في قسم head؛ تأكد من دقة الخاصية content.",
        "قاعدة: العبارة width=device-width تجعل الصفحة تستخدم عرض شاشة الهاتف الحقيقي كعرض للمستند. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اكتب سطر الميتا القياسي:   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">.",
        "الحل النموذجي:   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
      ]
    },
    {
      title: "وسّع نقطة التحول",
      objective: "تعديل قيمة استعلام الوسائط @media (max-width: ...)",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: التحكم في نقطة الانكسار (Breakpoint) التي يتغير عندها تخطيط الأعمدة.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى قاعدة @media في وسم style؛ عدّل نقطة التحول max-width إلى 700px.",
        "قاعدة: استعلامات الوسائط تسمح بتطبيق أنماط تنسيقية بديلة عندما يقل عرض الشاشة عن حد معين. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل الصحيح؟",
        "مساعدة محددة: اكتب استعلام الوسائط الجديد: max-width: 720px.",
        "الحل النموذجي: max-width: 720px"
      ]
    },
    {
      title: "اجعل الصور تتبع الحاوية",
      objective: "تعديل خاصية max-width: 100% للصور لضمان تجاوبها الكامل",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: منع خروج الصور عن حدود الشاشة وجعلها تتقلص بسلاسة مع تصغير المتصفح.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى محدد img في CSS؛ تأكد من وجود max-width: 100% و height: auto.",
        "قاعدة: القاعدة max-width: 100% تضمن ألا يتجاوز عرض الصورة أبداً عرض الصندوق الذي يحويها. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل الصحيح؟",
        "مساعدة محددة: اكتب قاعدة تجاوب الصور: img { max-width: 90%; height: auto; }.",
        "الحل النموذجي: img { max-width: 90%; height: auto; }"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<head>\n  <meta name=\"viewport\" content=\"width=500\">\n</head>",
    fixedCode: "<head>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n</head>",
    question: "ما سبب الخطأ في إعدادات وسم منفذ الرؤية viewport المعروض؟",
    explanation: "تثبيت العرض على رقم ثابت مثل width=500 يفسد التجاوب على الهواتف الأضيق أو الشاشات الأوسع. الإعداد القياسي هو width=device-width مع initial-scale=1.0 ليطابق عرض الجهاز أياً كان نوعه.",
    options: [
      "لا يمكن استخدام وسم meta في التصميم المتجاوب",
      "وسم viewport يجب أن يوضع داخل قسم body",
      "خاصية name يجب أن تكون screen بدلاً من viewport",
      "تحديد عرض ثابت width=500 بدلاً من القيمة القياسية width=device-width"
    ],
    correctOptionIndex: 3
  }
});

const lesson32 = createLesson({
  id: "html-33-computer-code",
  legacyId: "html:32",
  legacyTopic: "HTML Computer Code",
  title: "عرض الأكواد البرمجية والنصوص التقنية",
  skill: skillName,
  order: 32,
  concept: "توفر HTML وسوماً دلالية متخصصة لعرض الشيفرات البرمجية والمدخلات التقنية: <code> للشيفرات البرمجية، و <kbd> لمدخلات لوحة المفاتيح واختصاراتها، و <samp> لمخرجات البرامج وعينات النظام، و <var> للمتغيرات الرياضية، و <pre> للحفاظ على التنسيق والمسافات الأصلية للأكواد متعددة الأسطر.",
  whyUse: "تمييز الشيفرات التقنية دلالياً وبصرياً بخط ثابت العرض (Monospace) لحمايتها من الاندماج المشوش مع النصوص العادية، ومساعدة محركات البحث وأدوات التوثيق البرمجي.",
  browserMechanics: "تطبق ورقة أنماط المتصفح خط monospace افتراضياً على عناصر code و kbd و samp. وعند جمع <pre><code> معاً، يحافظ المتصفح على كل سطر ومسافة فراغ في الكود دون الحاجة لكتابة وسوم <br> يدوية.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code",
  stepsConfig: [
    {
      title: "عدّل قيمة الكود",
      objective: "تعديل نص الأمر البرمجي المعروض داخل وسم <code>",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: عرض أمر برمجي دقيق بخط تقني موحد ومتميز.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى وسم <code> في السطر الأول؛ عدّل الشفرة المكتوبة داخله.",
        "قاعدة: يعرض الوسم <code> المصطلحات والأوامر البرمجية بخط ثابت العرض ليبرز داخل الفقرة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الشيفرة المطلوبة: let total = 8;.",
        "الحل النموذجي: let total = 8;"
      ]
    },
    {
      title: "طابق الناتج مع القيمة",
      objective: "تعديل نص مخرجات النظام داخل وسم العينة <samp>",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توثيق دلالي للنتيجة البرمجية المتوقعة التي يخرجها البرنامج للمستخدم.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى وسم <samp> في سطر الناتج؛ عدّل النتيجة المعروضة.",
        "قاعدة: الوسم <samp> مخصص دلالياً لتمثيل مخرجات وسجلات البرامج والأخطاء التقنية. هل طابقت اسم وسم البداية مع وسم النهاية وتأكدت من سلامة الأقواس؟",
        "مساعدة محددة: اجعل القيمة تطابق: <samp>8</samp>.",
        "الحل النموذجي: <samp>8</samp>"
      ]
    },
    {
      title: "غيّر اختصار لوحة المفاتيح",
      objective: "تعديل نصوص مفاتيح لوحة المفاتيح داخل وسمي kbd",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إرشاد المستخدم للاختصار الصحيح للوحة المفاتيح بوسم قياسي معتمد.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى وسمَي <kbd> المحيطين بمفتاحي الاختصار؛ عدّل الحرف المطلوب.",
        "قاعدة: الوسم <kbd> يمثل دلالياً ضغطات المفاتيح والإدخال الصادر من لوحة المفاتيح. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الاختصار الجديد: Ctrl + Shift + S.",
        "الحل النموذجي: Ctrl + Shift + S"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<p>اضغط <key>Ctrl</key> + <key>S</key> للحفظ</p>",
    fixedCode: "<p>اضغط <kbd>Ctrl</kbd> + <kbd>S</kbd> للحفظ</p>",
    question: "ما هو الوسم المعياري الصحيح في HTML لتمثيل مفاتيح لوحة المفاتيح؟",
    explanation: "لا يوجد وسم باسم <key> في HTML. الوسم القياسي المعتمد لتمثيل مدخلات واختصارات لوحة المفاتيح هو <kbd> (اختصار Keyboard).",
    options: [
      "الوسم القياسي لاختصارات لوحة المفاتيح هو <kbd> وليس <key>",
      "يجب استخدام وسم <code> لمفاتيح لوحة المفاتيح",
      "الاختصارات البرمجية تكتب كنص عادي دون وسوم",
      "الوسم <key> يجب أن يغلق بـ </button>"
    ],
    correctOptionIndex: 0
  }
});

const lesson33 = createLesson({
  id: "html-34-semantics",
  legacyId: "html:33",
  legacyTopic: "HTML Semantics",
  title: "العناصر الدلالية ودورها في بنية الويب",
  skill: skillName,
  order: 33,
  concept: "العنصر الدلالي (Semantic Element) هو عنصر يصف معناه بوضوح لكل من المتصفح والمطور على حد سواء (مثل <article>, <aside>, <details>, <summary>, <figure>, <figcaption>, <time>). يختلف جذرياً عن العناصر غير الدلالية كـ <div> و <span> التي لا تعبر عن أي محتوى بطبيعتها.",
  whyUse: "تحسين ترتيب الموقع في محركات البحث (SEO)، وضمان الامتثال التام لمعايير إتاحة الوصول لذوي الاحتياجات الخاصة، وتسهيل قراءة وصيانة الكود البرمجي للفرق التقنية.",
  browserMechanics: "يعين المتصفح لكل عنصر دلالي دوراً مدمجاً في شجرة إمكانية الوصول (Implicit ARIA Role)؛ فالعنصر <nav> يحصل تلقائياً على دور navigation، والعنصر <article> على دور article، دون حاجة لإضافة سمات دور role يدوياً.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html",
  stepsConfig: [
    {
      title: "اكتب عنوانًا يصف الخبر",
      objective: "تعديل عنوان المقال الدلالي h2 داخل وسم article",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: وضع عنوان صريح لمقال مستقل صالح لإعادة النشر والتوزيع المستقل.",
      errorRules: [RULES.mismatchedHTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <h2> داخل وسم المقال الدلالي <article>؛ عدّل نص العنوان.",
        "قاعدة: الحاوية <article> تمثل وحدة محتوى متكاملة ومستقلة بذاتها كمقال أو تدوينة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب العنوان المطلوب: بطاقة الصفحة الأولى.",
        "الحل النموذجي: بطاقة الصفحة الأولى"
      ]
    },
    {
      title: "أضف تفاصيل للخبر",
      objective: "تعديل نص الفقرة التفصيلية داخل نفس عنصر article",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: اكتمال متن المقال الصحفي في الحاوية الدلالية المخصصة له.",
      errorRules: [RULES.mismatchedPSpan, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم الفقرة <p> أسفل عنوان الخبر داخل <article>.",
        "قاعدة: النصوص والمعلومات التابعة للمقال تستقر داخل نفس الوسم article. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب التفاصيل التالية: جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة..",
        "الحل النموذجي: جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة."
      ]
    },
    {
      title: "اختر عنصرًا يصف المحتوى",
      objective: "تعديل وسم الوقت الدلالي <time> لتوثيق تاريخ نشر المقال",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: مساعدة محركات البحث على أرشفة تاريخ نشر التدوينة بدقة متناهية.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى وسم <time> في تذييل المقال؛ تأكد من كتابة التاريخ بوضوح.",
        "قاعدة: الوسم الدلالي <time> يمنح التاريخ سياقاً زمنياً تفهمه خوارزميات محركات البحث. هل وضعت النص المطلوب بدقة بين وسمَي الفتح والإغلاق دون حذف الأقواس؟",
        "مساعدة محددة: اكتب التاريخ المطلوب:     <article id=\"story\">\n      <h2>بطاقة الصفحة الأولى</h2>\n      <p>جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة.</p>\n    </article>.",
        "الحل النموذجي:     <article id=\"story\">\n      <h2>بطاقة الصفحة الأولى</h2>\n      <p>جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة.</p>\n    </article>"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<figure>\n  <img src=\"chart.png\" alt=\"رسم بياني\">\n  <p>شكل 1: المخطط البياني للنمو</p>\n</figure>",
    fixedCode: "<figure>\n  <img src=\"chart.png\" alt=\"رسم بياني\">\n  <figcaption>شكل 1: المخطط البياني للنمو</figcaption>\n</figure>",
    question: "ما هو الوسم الدلالي المخصص لكتابة التسمية التوضيحية داخل عنصر <figure>؟",
    explanation: "الوسم الدلالي القياسي لعنوان وتسمية الشكل داخل عنصر <figure> هو <figcaption>، واستخدام <p> بدلاً منه يفقده الرابط الدلالي التوضيحي مع الصورة.",
    options: [
      "العنصر <figure> لا يقبل صور <img> بداخله",
      "استخدام <p> بدلاً من الوسم الدلالي المخصص <figcaption> لشرح الشكل",
      "يجب وضع التسمية التوضيحية قبل وسم <figure>",
      "لا يمكن استخدام الأرقام داخل وسوم التسمية"
    ],
    correctOptionIndex: 1
  }
});

const lesson34 = createLesson({
  id: "html-35-style-guide",
  legacyId: "html:34",
  legacyTopic: "HTML Style Guide",
  title: "دليل كتابة كود HTML نظيف ومتسق",
  skill: skillName,
  order: 34,
  concept: "دليل أسلوب كتابة الكود (HTML Style Guide) هو مجموعة من أفضل الممارسات البرمجية المتفق عليها عالمياً: كتابة أسماء الوسوم والخصائص بحروف صغيرة، إحاطة قيم الخصائص بعلامات اقتباس مزدوجة دائماً، إغلاق جميع الوسوم غير الفارغة، توفير إعلان نوع المستند <!DOCTYPE html>، وضبط لغة الوثيقة lang=\"ar\" واتجاهها dir=\"rtl\".",
  whyUse: "ضمان الاتساق البرمجي بين أعضاء فريق التطوير، وتقليل احتمالات الأخطاء العشوائية، وجعل المستند نظيفاً وقابلاً للصيانة طويلة الأمد.",
  browserMechanics: "رغم أن محلل HTML5 متسامح بطبيعته (Forgiving Parser) مع الأحرف الكبيرة أو ترك الخصائص دون اقتباس، إلا أن ذلك يرفع من عبء التحليل المعجمي وقد يسبب أخطاء خفية عند تفاعل جافاسكربت و XML مع الوثيقة.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide",
  stepsConfig: [
    {
      title: "اكتب جملة أوضح",
      objective: "تعديل نص الفقرة الأولى مع الالتزام بكتابة الوسم بحروف صغيرة <p>",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: الحفاظ على أسلوب الكود الموحد والنظيف وفق أفضل الممارسات القياسية.",
      errorRules: [RULES.mismatchedPSpan, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <p> الصغير الأنيق؛ عدّل النص بداخله مع الحفاظ على وسم الإغلاق </p>.",
        "قاعدة: كتابة أسماء الوسوم بحروف صغيرة lowercase معيار أساسي في دليل الأسلوب الحديث. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الجملة الأولى هكذا: أرتب الصفحة حتى أقرأها بسهولة..",
        "الحل النموذجي: أرتب الصفحة حتى أقرأها بسهولة."
      ]
    },
    {
      title: "رتّب الجملة الثانية",
      objective: "تعديل نص الفقرة الثانية مع إحاطة الخصائص بعلامات اقتباس كاملة",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: ترسيخ عادة إحاطة قيم الخصائص بعلامات اقتباس مزدوجة منعاً للأخطاء.",
      errorRules: [RULES.typoClassAttribute, RULES.mismatchedPSpan],
      hints: [
        "انتبه إلى الفقرة التي تحمل class=\"tip\"؛ تأكد من وجود علامات الاقتباس حول القيمة.",
        "قاعدة: وضع علامات الاقتباس حول قيم الخصائص يمنع تكسر الكود عند وجود مسافات. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص المطلوب: وأستخدم أسماء صغيرة للوسوم..",
        "الحل النموذجي: وأستخدم أسماء صغيرة للوسوم."
      ]
    },
    {
      title: "أضف فقرة بنفس النمط",
      objective: "إضافة وتعديل فقرة ثالثة تطابق القواعد الإرشادية لدليل النمط النظيف",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: التدرب على كتابة شفرات منضبطة ومتسقة شكلاً ومضموناً من أول سطر لآخره.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى الفقرة الأخيرة؛ حافظ على التنسيق والمسافات البادئة المنظمة.",
        "قاعدة: التنظيم والمسافات البادئة Indentation يجعل قراءة الكود ممتعة وسريعة للمطورين. هل وضعت النص المطلوب بدقة بين وسمَي الفتح والإغلاق دون حذف الأقواس؟",
        "مساعدة محددة: اكتب الفقرة الأخيرة:   <p>أراجع السطر بعد كتابته.</p>\n</body>.",
        "الحل النموذجي:   <p>أراجع السطر بعد كتابته.</p>\n</body>"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<HTML>\n<HEAD>\n  <TITLE>صفحة غير منضبطة</TITLE>\n</HEAD>\n<BODY>\n  <P CLASS=intro>مرحباً</P>\n</BODY>\n</HTML>",
    fixedCode: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحة منضبطة بالمعايير</title>\n</head>\n<body>\n  <p class=\"intro\">مرحباً</p>\n</body>\n</html>",
    question: "ما هي المخالفات التنسيقية الرئيسية لدليل أسلوب HTML النظيف في الكود المعروض؟",
    explanation: "غياب DOCTYPE، وكتابة أسماء الوسوم بحروف كبيرة UPPERCASE، وترك قيمة الخاصية بدون علامات اقتباس CLASS=intro، وغياب سمات اللغة والاتجاه والترميز.",
    options: [
      "كتابة وسم title داخل head",
      "استخدام اللغة العربية داخل الفقرات",
      "كتابة الوسوم بحروف كبيرة، وإغفال DOCTYPE وعلامات الاقتباس للخاصية",
      "استخدام فئات class في الفقرات"
    ],
    correctOptionIndex: 2
  }
});

const skillLessons = [lesson28, lesson29, lesson30, lesson31, lesson32, lesson33, lesson34];
const outputPath = path.join(__dirname, "skill_07_site_preparation.json");
fs.writeFileSync(outputPath, JSON.stringify(skillLessons, null, 2), "utf8");
console.log(`✔ Skill 7 authored successfully: ${skillLessons.length} lessons written to ${outputPath}`);

/**
 * curriculum/html/author_skill_04.cjs
 * Skill 4: روابط وصور الصفحة (Lessons 13 to 18)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, RULES } = require("./builder_helper.cjs");

const skillName = "روابط وصور الصفحة";

const lesson13 = createLesson({
  id: "html-14-links",
  legacyId: "html:13",
  legacyTopic: "HTML Links",
  title: "الروابط التشعبية والتنقل بين الصفحات",
  skill: skillName,
  order: 13,
  concept: "يُعرّف وسم المرساة <a> الروابط التشعبية التي تنقل الزائر بين صفحات الويب أو لمواقع خارجية. السمة الجوهرية الإلزامية هي href التي تحدد مسار الوجهة. تدعم الروابط أيضاً السمة target=\"_blank\" لفتح الرابط في تبويب مستقل مع إلزامية rel=\"noopener noreferrer\" لحماية أمان الصفحة الأصلية.",
  whyUse: "الروابط هي جوهر شبكة الويب العالمية، فبدونها لا يمكن الربط بين الوثائق أو الانتقال لمصادر خارجية، كما تسمح بالاتصال التفاعلي كإرسال البريد الإلكتروني عبر mailto: والمكالمات عبر tel:.",
  browserMechanics: "ينشئ المحلل كائن HTMLAnchorElement ويجعله قابلاً للتركيز بواسطة لوحة المفاتيح عبر زر Tab. عند النقر، يتحقق المتصفح من سياق التصفح؛ فإذا كان _self يُفرغ الصفحة الحالية ويطلب الرابط الجديد، وإذا كان _blank يفتح سياق تصفح جديد مستقلاً تماماً.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
  stepsConfig: [
    {
      title: "غيّر وجهة الرابط",
      objective: "تعديل عنوان URL الخارجي في خاصية href",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توجيه المستخدم إلى صفحة خارجية جديدة عبر بروتوكول الويب الآمن HTTPS.",
      errorRules: [RULES.missingAHref, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى قيمة خاصية href داخل وسم الرابط الأول؛ عدّل الرابط داخل علامتي الاقتباس.",
        "قاعدة: تبدأ الروابط الخارجية دائماً ببروتوكول مثل https:// يليه اسم النطاق والمسار. هل تأكدت من كتابة الرابط أو المعرف بدقة داخل علامتي الاقتباس؟",
        "مساعدة محددة: اكتب الرابط الجديد هكذا: href=\"https://www.w3schools.com/html/\".",
        "الحل النموذجي: href=\"https://www.w3schools.com/html/\""
      ]
    },
    {
      title: "اقفز إلى قسم داخل الصفحة",
      objective: "تعديل الرابط المرجعي الداخلي باستخدام علامة الهاش #",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمكين الزائر من القفز السريع إلى تفاصيل القسم المطلوب دون مغادرة الصفحة.",
      errorRules: [RULES.missingAHref, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى الرابط الثاني في الصفحة؛ اجعل قيمته تشير إلى معرّف القسم المطلوب.",
        "قاعدة: يبدأ الرابط الداخلي بالرمز # متبوعاً بقيمة المعرف المطابق id في الصفحة. هل تأكدت من كتابة الرابط أو المعرف بدقة داخل علامتي الاقتباس؟",
        "مساعدة محددة: حدّث الوجهة لتصبح: href=\"#top\".",
        "الحل النموذجي: href=\"#top\""
      ]
    },
    {
      title: "اكتب نصًا يصف الوجهة",
      objective: "تعديل النص المقروء للرابط ليكون معبراً عن وجهته",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: جعل نص الرابط واضحاً ومفهوماً لقارئات الشاشة بدلاً من العبارات المبهمة.",
      errorRules: [RULES.missingClosingSlash, RULES.mismatchedPSpan],
      hints: [
        "انتبه إلى النص الواقع بين <a> و </a> في الرابط الثاني؛ اكتب عبارة تدل على محتوى الوجهة.",
        "قاعدة: تحظر معايير إتاحة الوصول كتابة عبارات عامة مثل 'اضغط هنا'؛ اجعل النص يصف الوجهة بوضوح. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: استبدل النص ليكون: تعلّم عناصر HTML.",
        "الحل النموذجي: تعلّم عناصر HTML"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<a herf=\"https://example.com\">زيارة الموقع</a>",
    fixedCode: "<a href=\"https://example.com\">زيارة الموقع</a>",
    question: "ما سبب عدم استجابة الرابط للنقر في الشيفرة المعروضة؟",
    explanation: "يوجد خطأ إملائي في اسم خاصية الوجهة؛ كُتبت herf بدلاً من href (اختصار Hypertext Reference). بدون href الصحيحة، يعامل المتصفح الوسم كنائب نصي غير تفاعلي.",
    options: [
      "الرابط لا يحتوي على وسم إغلاق </a>",
      "خطأ إملائي في كتابة اسم الخاصية herf بدلاً من href",
      "يجب كتابة عناوين المواقع بحروف كبيرة",
      "لا يمكن وضع نصوص عربية داخل الروابط"
    ],
    correctOptionIndex: 1
  }
});

const lesson14 = createLesson({
  id: "html-15-link-colors",
  legacyId: "html:14",
  legacyTopic: "HTML Link Colors",
  title: "تخصيص ألوان الروابط وحالاتها",
  skill: skillName,
  order: 14,
  concept: "تمتلك الروابط في المتصفح حالات تفاعلية قياسية يمكن تلوينها وتنسيقها بواسطة CSS: الرابط غير المزار (:link)، الرابط المزار (:visited)، الرابط عند مرور الفأرة (:hover)، والرابط أثناء النقر النشط (:active).",
  whyUse: "تخصيص حالات الروابط يوفر للمستخدم تغذية راجعة بصرية فورية (Visual Feedback) توضح ما إذا كان الرابط قابلاً للنقر، أو تم النقر عليه مسبقاً، مما يعزز سهولة التنقل والاستكشاف.",
  browserMechanics: "يتحقق المتصفح من سجل التصفح الداخلي (Browsing History) للتحقق مما إذا كان عنوان URL قد تمت زيارته لتطبيق نمط :visited، وتفرض المتصفحات قيود خصوصية صارمة على :visited لمنع مواقع الويب الخبيثة من استراق سجل تصفح المستخدم.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/:link",
  stepsConfig: [
    {
      title: "بدّل لون الرابط العادي",
      objective: "تعديل خاصية لون الرابط الافتراضي a:link",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمييز الروابط غير المزارة بلون متناسق مع هوية الموقع.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى محدد a:link في وسم style؛ بدّل قيمة اللون.",
        "قاعدة: يطبق النمط a:link على الروابط التي لم يسبق للمستخدم النقر عليها في سجله. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل الصحيح؟",
        "مساعدة محددة: اكتب قاعدة اللون هكذا: color: #35658f;.",
        "الحل النموذجي: color: #35658f;"
      ]
    },
    {
      title: "أظهر الخط أسفل الرابط",
      objective: "تعديل خاصية زخرفة النص text-decoration للرابط",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إظهار خط التأكيد أسفل الرابط للتوضيح البصري.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية text-decoration في محدد a:visited؛ غيّر قيمتها إلى underline.",
        "قاعدة: القيمة underline تضع خطاً تحت النص لتأكيد كونه رابطاً تشعبياً. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل السليم؟",
        "مساعدة محددة: اكتب الخاصية المطلوبة: text-decoration: underline;.",
        "الحل النموذجي: text-decoration: underline;"
      ]
    },
    {
      title: "غيّر لون المرور",
      objective: "تعديل لون حالة المرور بالفأرة a:hover",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تقديم إشارة تفاعلية فورية للزائر عند وضع المؤشر على الرابط.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى محدد a:hover؛ بدّل لون التمرير إلى اللون البرتقالي.",
        "قاعدة: تفعل حالة :hover فور ملامسة مؤشر الفأرة للرابط وقبل الضغط عليه. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل الصحيح؟",
        "مساعدة محددة: اكتب قاعدة اللون بالشكل التالي: color: #b03a48;.",
        "الحل النموذجي: color: #b03a48;"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "a:hover { color: red; }\na:visited { color: purple; }",
    fixedCode: "a:visited { color: purple; }\na:hover { color: red; }",
    question: "ما هي القاعدة القياسية لترتيب الفئات الزائفة للروابط في CSS؟",
    explanation: "تتبع حالات الروابط قاعدة LVHA الإلزامية: Link أولاً، ثم Visited، ثم Hover، وأخيراً Active. وضع visited بعد hover يجعل حالة الزيارة تطغى دائماً على مظهر المرور بالفأرة.",
    options: [
      "الروابط تقبل لوناً واحداً فقط في كافة الحالات",
      "لا يمكن تغيير لون الرابط عند المرور عليه",
      "ترتيب الحالات يجب أن يتبع قاعدة LVHA (Link ثم Visited ثم Hover ثم Active)",
      "يجب كتابة المحددات داخل قسم body"
    ],
    correctOptionIndex: 2
  }
});

const lesson15 = createLesson({
  id: "html-16-link-bookmarks",
  legacyId: "html:15",
  legacyTopic: "HTML Link Bookmarks",
  title: "الروابط المرجعية والتنقل الداخلي",
  skill: skillName,
  order: 15,
  concept: "تسمح الروابط المرجعية (Bookmarks / Hash Links) للزائر بالانتقال اللحظي إلى أقسام محددة داخل نفس الصفحة الطويلة دون إعادة تحميلها، وذلك بربط قيمة href=\"#section-id\" بالمعرف الفريد المطابق id=\"section-id\" في العنصر المستهدف.",
  whyUse: "تحسين تجربة تصفح الصفحات الطويلة وجداول المحتويات وصفحات الشروط والأسئلة الشائعة، مع توفير زر العودة إلى أعلى الصفحة (Back to Top).",
  browserMechanics: "عند النقر على رابط يحمل الرمز #، يحلل المتصفح معرّف التجزئة (Hash Fragment) في شريط العنوان، ويبحث في شجرة الـ DOM عن أول عنصر يطابق هذا المعرّف، ثم يمرر نافذة العرض Scroll تلقائياً لجعله في مجال الرؤية.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page",
  stepsConfig: [
    {
      title: "سمِّ الرابط بوضوح",
      objective: "تعديل نص الرابط المرجعي ليوضح وجهة القفز داخل الصفحة",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إرشاد المستخدم إلى أن هذا الرابط سينقله إلى قسم محدد داخل نفس الصفحة.",
      errorRules: [RULES.missingClosingSlash, RULES.missingAHref],
      hints: [
        "انتبه إلى نص الرابط المرجعي في أعلى الصفحة؛ غيّر النص بين وسمَي الرابط.",
        "قاعدة: النص المعبر داخل الرابط يعلم الزائر بمكان القفزة الداخلية بدقة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص التالي بين وسمَي الرابط: اقفز إلى الدرس.",
        "الحل النموذجي: اقفز إلى الدرس"
      ]
    },
    {
      title: "اكتب عنوان المكان",
      objective: "تعديل نص العنوان المستهدف الذي يحمل المعرف id",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تأكيد وصول الزائر للقسم الصحيح عبر عنوان مطابق.",
      errorRules: [RULES.mismatchedHTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <h2> الذي يحمل خاصية id=\"lesson\"؛ عدّل النص فقط.",
        "قاعدة: يحافظ العنوان على خاصية id الخاصة به ليكون نقطة رسو للرابط المرجعي. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص الداخلي للعنوان: بداية التطبيق.",
        "الحل النموذجي: بداية التطبيق"
      ]
    },
    {
      title: "طابق اسم الرابط مع الهدف",
      objective: "تحديث قيمة المعرف id وقيمة href المرتبطة به بالتزامن",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: الحفاظ على التطابق الدقيق بين وجهة الرابط والمعرف المستهدف.",
      errorRules: [RULES.missingAHref, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية href في الرابط؛ غيّر القيمة بعد رمز الهاش # لتطابق الهدف الجديد.",
        "قاعدة: التطابق بين #اسم_المعرف و id=\"اسم_المعرف\" إلزامي لنجاح القفز. هل وضعت النص المطلوب بدقة بين وسمَي الفتح والإغلاق دون حذف الأقواس؟",
        "مساعدة محددة: حدّث الرابط ليصبح: href=\"#practice\">اقفز إلى التطبيق</a></p>\n  <div style=\"height: 180px;\"></div>\n  <h2 id=\"practice\">بداية التطبيق</h2>.",
        "الحل النموذجي: href=\"#practice\">اقفز إلى التطبيق</a></p>\n  <div style=\"height: 180px;\"></div>\n  <h2 id=\"practice\">بداية التطبيق</h2>"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<a href=\"faq\">الأسئلة الشائعة</a>\n<h2 id=\"faq\">قسم الأسئلة</h2>",
    fixedCode: "<a href=\"#faq\">الأسئلة الشائعة</a>\n<h2 id=\"faq\">قسم الأسئلة</h2>",
    question: "لماذا فشل الرابط في القفز إلى قسم الأسئلة الشائعة في الصفحة نفسها؟",
    explanation: "الروابط الداخلية تتطلب إضافة رمز الهاش # في بداية قيمة خاصية href (أي href=\"#faq\"). بدون # سيعامل المتصفح القيمة كملف خارجي مستقل في نفس المجلد ويحاول الانتقال إليه.",
    options: [
      "يجب كتابة اسم المعرف بأحرف كبيرة",
      "يجب حذف السمة id من وسم العنوان",
      "الروابط الداخلية لا تعمل مع وسوم العناوين h2",
      "غياب علامة الهاش # قبل اسم المعرف داخل خاصية href"
    ],
    correctOptionIndex: 3
  }
});

const lesson16 = createLesson({
  id: "html-17-images",
  legacyId: "html:16",
  legacyTopic: "HTML Images",
  title: "إدراج الصور وسمات العرض والنص البديل",
  skill: skillName,
  order: 16,
  concept: "يُدرج عنصر الصورة <img> الصور النقطية والمتجهية داخل الصفحة. وهو عنصر فراغ Void Element لا يقبل وسماً ختامياً. يتطلب سمتين أساسيتين: src لتحديد مسار ملف الصورة، و alt لتقديم نص وصفي بديل في حال تعذر تحميل الصورة أو للمكفوفين.",
  whyUse: "إثراء المحتوى بصرياً وشرح المنتجات والمفاهيم المعقدة، مع ضمان إمكانية الوصول لذوي الإعاقة ومساعدة محركات البحث على أرشفة وفهرسة محتوى الصورة.",
  browserMechanics: "الصورة عنصر مستبدل (Replaced Element). عندما يقرأ المحلل السمة src، يرسل طلباً غير متزامن لجلب ملف الصورة عبر الشبكة. وإذا حُددت سمتا width و height مسبقاً، يحجز المتصفح مساحة الصندوق Aspect Ratio مقدماً لمنع ظاهرة قفز المحتوى المزعجة (Cumulative Layout Shift).",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
  stepsConfig: [
    {
      title: "اكتب وصفًا يشرح الصورة",
      objective: "تعديل النص البديل في السمة alt لعنصر الصورة",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمكين قارئات الشاشة والزوار من معرفة محتوى الصورة عند بطء الشبكة.",
      errorRules: [RULES.missingImgAlt, RULES.missingImgSrc],
      hints: [
        "انتبه إلى السمة alt داخل وسم <img>؛ عدّل الوصف المكتوب بين علامتي الاقتباس.",
        "قاعدة: خاصية alt إجبارية في المعايير وتصف محتوى الصورة ووظيفتها. هل تحققت من كتابة النص البديل المعبر داخل علامتي الاقتباس؟",
        "مساعدة محددة: اكتب النص البديل الجديد: alt=\"مبانٍ ملوّنة بجوار قناة مائية\".",
        "الحل النموذجي: alt=\"مبانٍ ملوّنة بجوار قناة مائية\""
      ]
    },
    {
      title: "اضبط حجم الصورة",
      objective: "تعديل خاصية العرض width وخاصية الارتفاع height",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: حجز مساحة بصرية ثابتة للصورة لحماية الصفحة من القفز والتشتت أثناء التحميل.",
      errorRules: [RULES.voidElementClosingTag, RULES.missingImgSrc],
      hints: [
        "انتبه إلى سمتي width و height؛ عدّل قيم الأبعاد بالأرقام المجردة دون كتابة px.",
        "قاعدة: سمات العرض والارتفاع المباشرة في HTML تأخذ أرقاماً مجردة تمثل عدد البكسلات. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اجعل الأبعاد مطابقة: width=\"180\" height=\"130\".",
        "الحل النموذجي: width=\"180\" height=\"130\""
      ]
    },
    {
      title: "جرّب المساحة بأسلوب CSS",
      objective: "تعديل سمة style للتحكم في أبعاد الصورة ومظهر الإطار",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: استخدام مرونة CSS في تدوير حواف الصورة وتحديد أبعادها.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingImgSrc],
      hints: [
        "انتبه إلى السمة style المكتوبة داخل وسم الصورة <img>؛ عدّل قيمة width إلى 180px.",
        "قاعدة: في CSS يُلزم تحديد وحدة القياس px بجوار الرقم تماماً. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل الصحيح؟",
        "مساعدة محددة: اكتب قاعدة العرض بدقة: style=\"width:180px;height:auto;\".",
        "الحل النموذجي: style=\"width:180px;height:auto;\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<img scr=\"logo.png\" alt=\"شعار المنصة\">",
    fixedCode: "<img src=\"logo.png\" alt=\"شعار المنصة\">",
    question: "ما سبب عدم ظهور الصورة في الصفحة في الكود المعروض؟",
    explanation: "خطأ إملائي في اسم خاصية مسار الصورة؛ كُتبت scr بدلاً من src (اختصار Source). لا يتعرف المتصفح على scr وبالتالي يعجز عن جلب الملف ويعرض النص البديل فقط.",
    options: [
      "خطأ إملائي في اسم الخاصية: كُتبت scr بدلاً من src",
      "عنصر <img> يتطلب وسم إغلاق منفصل </img>",
      "خاصية alt غير مسموح بها مع الصور",
      "يجب وضع الصور داخل وسم <figure> إجبارياً"
    ],
    correctOptionIndex: 0
  }
});

const lesson17 = createLesson({
  id: "html-18-favicon",
  legacyId: "html:17",
  legacyTopic: "HTML Favicon",
  title: "أيقونة الموقع المفضلة (Favicon)",
  skill: skillName,
  order: 17,
  concept: "الأيقونة المفضلة (Favicon) هي شعار مصغر يظهر بجانب اسم الصفحة في لسان تبويب المتصفح وقوائم العلامات المرجعية. تُربط داخل قسم <head> بواسطة وسم <link rel=\"icon\" type=\"image/x-icon\" href=\"favicon.ico\"> أو بصيغة PNG أو SVG الحديثة.",
  whyUse: "ترسيخ الهوية البصرية للموقع وتمكين المستخدم من التعرف السريع على لسان التبويب بين عشرات الألسنة المفتوحة في المتصفح وتجميل شكل الروابط المحفوظة.",
  browserMechanics: "يبحث المتصفح في قسم head عن وسم link بعلاقة rel=\"icon\". إذا لم يجده، يرسل طلباً تلقائياً افتراضياً لجلب الملف /favicon.ico من جذر خادم الويب ويقوم بتخزينه مؤقتاً في الذاكرة لعرضه في شريط التبويب وقوائم التاريخ.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#rel_icon",
  stepsConfig: [
    {
      title: "غيّر اسم الصفحة في التبويب",
      objective: "تعديل وسم title المصاحب لأيقونة المفضلة",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تناسق اسم المستند المكتوب بجوار الأيقونة في لسان التبويب.",
      errorRules: [RULES.unclosedTitle, RULES.titleInBody],
      hints: [
        "انتبه إلى وسم <title> داخل قسم head؛ عدّل اسم الصفحة.",
        "قاعدة: يعرض لسان التبويب الأيقونة المفضلة مباشرة إلى جانب نص وسم title. هل تأكدت من إغلاق وسم title بشكل سليم داخل قسم head؟",
        "مساعدة محددة: اكتب العنوان المطلوب: <title>موقعي الصغير</title>.",
        "الحل النموذجي: <title>موقعي الصغير</title>"
      ]
    },
    {
      title: "حدّد مكان ملف الأيقونة",
      objective: "تعديل مسار ملف الأيقونة في السمة href لوسم link",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توجيه المتصفح إلى مسار ملف الأيقونة المصغرة على الخادم.",
      errorRules: [RULES.typoLinkAnchor, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية href في وسم <link rel=\"icon\">؛ اكتب مسار ملف الأيقونة الجديد.",
        "قاعدة: مسار الأيقونة يشير عادة إلى ملف ico أو png يستقر في مجلد الصور أو جذر الموقع. هل تأكدت من كتابة الرابط أو المعرف بدقة داخل علامتي الاقتباس؟",
        "مساعدة محددة: حدّث المسار ليصبح: href=\"images/my-icon.ico\".",
        "الحل النموذجي: href=\"images/my-icon.ico\""
      ]
    },
    {
      title: "طابق نوع الملف مع صيغته",
      objective: "تعديل خاصية نوع الوسائط type لوسم الأيقونة",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إعلان نوع MIME type الدقيق لمساعدة المتصفح على فك ترميز ملف الأيقونة بسرعة.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.voidElementClosingTag],
      hints: [
        "انتبه إلى السمة type داخل وسم link؛ تأكد من كتابة نوع الوسائط القياسي.",
        "قاعدة: الملفات بصيغة ico تحمل نوع image/x-icon أو image/vnd.microsoft.icon. هل تأكدت من كتابة الرابط أو المعرف بدقة داخل علامتي الاقتباس؟",
        "مساعدة محددة: اكتب نوع الوسائط القياسي: type=\"image/png\" href=\"images/my-icon.png\".",
        "الحل النموذجي: type=\"image/png\" href=\"images/my-icon.png\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<link rel=\"icon\" href=\"logo.png\" type=\"image/ico\">",
    fixedCode: "<link rel=\"icon\" href=\"logo.png\" type=\"image/png\">",
    question: "ما هو سبب عدم مطابقة نوع الوسائط MIME type في كود الأيقونة المعروض؟",
    explanation: "امتداد ملف الصورة هو png، لذا يجب أن يكون نوع الوسائط type=\"image/png\" وليس image/ico. عدم المطابقة قد يتسبب في رفض بعض المتصفحات عرض الأيقونة.",
    options: [
      "لا يمكن استخدام صيغة PNG للأيقونات المفضلة",
      "نوع الوسائط image/ico لا يطابق امتداد الملف png",
      "الوسم <link> يجب أن يوضع داخل قسم body",
      "خاصية rel يجب أن تكون rel=\"image\""
    ],
    correctOptionIndex: 1
  }
});

const lesson18 = createLesson({
  id: "html-19-page-title",
  legacyId: "html:18",
  legacyTopic: "HTML Page Title",
  title: "عنوان الصفحة ووسم Title في المتصفح",
  skill: skillName,
  order: 18,
  concept: "يحدد الوسم <title> اسم المستند الرسمي. وهو عنصر إلزامي داخل قسم <head>، ولا يُعرض محتواه داخل متن الصفحة المرئي، بل يظهر حصراً في شريط تبويب المتصفح، وعنوان نتائج البحث، وعند حفظ الصفحة في المفضلة.",
  whyUse: "هو العنصر الأكثر تأثيراً في تحسين محركات البحث (SEO)؛ إذ تعتمد عليه خوارزميات الفهرسة لفهم موضوع الصفحة، كما يساعد المستخدمين على معرفة محتوى النوافذ المفتوحة.",
  browserMechanics: "يقرأ المتصفح محتوى وسم title أثناء معالجة الرأس، ويعينه مباشرة في الخاصية document.title في كائن نافذة التصفح، ويحدث شريط العنوان وواجهة نظام التشغيل فورياً بمجرد تغير قيمته البرمجية.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title",
  stepsConfig: [
    {
      title: "اكتب اسمًا دقيقًا للتبويب",
      objective: "تعديل نص العنوان الرسمي داخل وسم title",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: جعل عنوان التبويب معبراً بدقة عن طبيعة صفحة الويب.",
      errorRules: [RULES.unclosedTitle, RULES.titleInBody],
      hints: [
        "انتبه إلى وسم <title> داخل قسم head؛ غيّر النص بين وسمي البداية والإغلاق.",
        "قاعدة: عنوان الصفحة في title يجب ألا يتجاوز 60 محرفاً ليلائم شاشات محركات البحث والتبويبات. هل تأكدت من إغلاق وسم title بشكل سليم داخل قسم head؟",
        "مساعدة محددة: اكتب العنوان المطلوب: <title>دفتر أفكار الويب</title>.",
        "الحل النموذجي: <title>دفتر أفكار الويب</title>"
      ]
    },
    {
      title: "قارن العنوان الظاهر",
      objective: "تعديل العنوان البارز h1 في متن الصفحة وملاحظة الفرق بينه وبين title",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إدراك الفرق بين عنوان التبويب في الرأس وعنوان المقال الظاهر في المتن.",
      errorRules: [RULES.mismatchedHTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <h1> داخل قسم body؛ عدّل النص الظاهر للقارئ.",
        "قاعدة: وسم <h1> يعرض النص بحجم كبير داخل الصفحة بينما title يظهر في شريط النافذة فقط. هل طابقت رقم وسم العنوان في الفتح والإغلاق وتأكدت من سلامة الأقواس؟",
        "مساعدة محددة: اجعل العنوان مطابقاً: <h1>أفكار أبنيها بالكود</h1>.",
        "الحل النموذجي: <h1>أفكار أبنيها بالكود</h1>"
      ]
    },
    {
      title: "اكتب وصفًا قصيرًا للصفحة",
      objective: "تعديل نص الفقرة التمهيدية التابعة للعنوان الرئيسي",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير تمهيد مختصر يكمل عنوان الصفحة ويوضح موضوعها.",
      errorRules: [RULES.mismatchedPSpan, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم الفقرة <p> أسفل العنوان الرئيسي مباشرة.",
        "قاعدة: الفقرة النصية تقدم شرحاً تفصيلياً يكمل ما بدأه عنوان الصفحة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص التالي داخل الفقرة: دفتر تجارب HTML.",
        "الحل النموذجي: دفتر تجارب HTML"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<body>\n  <title>صفحتي الجديدة</title>\n  <h1>المحتوى</h1>\n</body>",
    fixedCode: "<head>\n  <title>صفحتي الجديدة</title>\n</head>\n<body>\n  <h1>المحتوى</h1>\n</body>",
    question: "ما هو الخطأ في الموضع البنائي لوسم <title> في الكود المعروض؟",
    explanation: "تفرض مواصفات HTML أن يوضع وسم <title> حصراً داخل قسم الرأس <head>. وضعه داخل قسم <body> مخالف للمعيار وسيقوم المتصفح بنقله تلقائياً إلى الرأس مع اعتبار ذلك خطأ هيكلياً.",
    options: [
      "الوسم <title> يجب أن يحل محل وسم <h1>",
      "لا يمكن كتابة عناوين صفحات باللغة العربية",
      "وضع وسم <title> داخل <body> بدلاً من موقعه الصحيح داخل <head>",
      "يجب إغلاق الوسم بـ </head>"
    ],
    correctOptionIndex: 2
  }
});

const skillLessons = [lesson13, lesson14, lesson15, lesson16, lesson17, lesson18];
const outputPath = path.join(__dirname, "skill_04_links_images.json");
fs.writeFileSync(outputPath, JSON.stringify(skillLessons, null, 2), "utf8");
console.log(`✔ Skill 4 authored successfully: ${skillLessons.length} lessons written to ${outputPath}`);

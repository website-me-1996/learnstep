/**
 * curriculum/html/author_skill_06.cjs
 * Skill 6: معرّفات وتفاعلات الصفحة (Lessons 24 to 27)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, RULES } = require("./builder_helper.cjs");

const skillName = "معرّفات وتفاعلات الصفحة";

const lesson24 = createLesson({
  id: "html-25-id",
  legacyId: "html:24",
  legacyTopic: "HTML Id",
  title: "المعرّف الفريد id واستهداف العناصر",
  skill: skillName,
  order: 24,
  concept: "تمنح السمة id العنصر معرّفاً فريداً ومميزاً على مستوى المستند بأكمله؛ فلا يجوز تكرار نفس المعرّف لأكثر من عنصر واحد في نفس الصفحة. يُستخدم id في استهداف العناصر برمجياً عبر document.getElementById، وتطبيق أنماط CSS المحددة (#id)، وبناء الروابط الداخلية المرجعية.",
  whyUse: "توفير وسيلة قطعية للوصول السريع إلى عنصر محدد بعينه دون أي لبس، وربط حقول الإدخال بتسمياتها التوضيحية عبر السمة for.",
  browserMechanics: "يبني المتصفح جدول بحث معجمي سريع (Hash Map / Identifier Map) للمعرفات، مما يجعل الوصول للعنصر عبر getElementById فورياً (زمن O(1)). وإذا تكرر المعرّف خطأً في الصفحة، يعيد المتصفح العنصر الأول فقط ويتجاهل كافة العناصر اللاحقة.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id",
  stepsConfig: [
    {
      title: "اكتب هدفًا يخصك",
      objective: "تعديل نص العنوان داخل العنصر المستهدف بالمعرف id=\"goal\"",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: ربط المحتوى الشخصي بالمعرف الذي يمنحه هوية فريدة وتنسيقاً مميزاً.",
      errorRules: [RULES.mismatchedHTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم <h2> داخل العنصر الذي يحمل id=\"goal\"؛ عدّل النص فقط.",
        "قاعدة: الحفاظ على خاصية id دون تغيير يضمن استمرار تطبيق تنسيقات المحدد #goal. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب العنوان المطلوب: خطوتي التالية.",
        "الحل النموذجي: خطوتي التالية"
      ]
    },
    {
      title: "حدّث الجملة داخل الهدف",
      objective: "تعديل نص الفقرة التابعة للقسم المعرف",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: اكتمال محتوى القسم المستهدف بالمعرف id.",
      errorRules: [RULES.mismatchedPSpan, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم الفقرة <p> أسفل عنوان الهدف؛ غيّر الجملة بداخلها.",
        "قاعدة: الفقرة تتبع الصندوق الأب وتستفيد من خصائصه المعرفة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص التالي داخل الفقرة: أكتب سطرًا ثم أختبره بنفسي..",
        "الحل النموذجي: أكتب سطرًا ثم أختبره بنفسي."
      ]
    },
    {
      title: "لاحظ محدد id في CSS",
      objective: "تعديل قاعدة CSS في الرأس التي تستهدف المعرف بواسطة رمز الهاش #goal",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: فهم قوة محدد المعرف في CSS واستجابته الحصرية للعنصر الوحيد الذي يحمله.",
      errorRules: [RULES.missingHeadTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى محدد #goal في وسم style برأس الصفحة؛ عدّل لون الخلفية إلى درجة أخرى.",
        "قاعدة: في CSS يشير الرمز # إلى استهداف عنصر يحمل خاصية id مطابقة. هل راجعت كتابة اسم الخاصية والقيمة والفاصلة المنقوطة بالشكل السليم؟",
        "مساعدة محددة: اكتب قاعدة الخلفية الجديدة: background: #fff0c2;.",
        "الحل النموذجي: background: #fff0c2;"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<div id=\"box\">صندوق 1</div>\n<div id=\"box\">صندوق 2</div>",
    fixedCode: "<div id=\"box-1\">صندوق 1</div>\n<div id=\"box-2\">صندوق 2</div>",
    question: "ما سبب الخطأ المعياري في استخدام السمة id في الكود المعروض؟",
    explanation: "معيار HTML يفرض أن تكون قيمة id فريدة ومطلقة داخل المستند الواحد. تكرار نفس المعرف id=\"box\" يفسد استهداف جافاسكربت ومحددات CSS والروابط المرجعية.",
    options: [
      "تكرار نفس قيمة المعرّف id في أكثر من عنصر في المستند نفسه",
      "السمة id لا تقبل أسماء باللغة الإنجليزية",
      "يجب كتابة المعرفات بأرقام فقط",
      "عنصر <div> لا يقبل السمة id"
    ],
    correctOptionIndex: 0
  }
});

const lesson25 = createLesson({
  id: "html-26-buttons",
  legacyId: "html:25",
  legacyTopic: "HTML Buttons",
  title: "أزرار التفاعل وربط الأحداث",
  skill: skillName,
  order: 25,
  concept: "يُعرّف عنصر <button> زراً تفاعلياً قابلاً للنقر. يمتلك ثلاثة أنواع قياسية عبر السمة type: type=\"button\" للأزرار البرمجية العامة، و type=\"submit\" لإرسال النماذج (وهي القيمة الافتراضية إذا ترك دون تحديد)، و type=\"reset\" لمسح وتفريغ الحقول.",
  whyUse: "توفير نقطة تفعيل بديهية للأوامر والإجراءات، مع تمتع الزر بدعم كامل لإمكانية الوصول والتركيز بلوحة المفاتيح والتشغيل عبر مفتاحي Space و Enter.",
  browserMechanics: "ينشئ المتصفح كائن HTMLButtonElement ويفعل مستمعي أحداث النقر ومؤشر التفاعل. وإذا وُضع الزر داخل نموذج <form> دون تحديد type، فإن المتصفح يعامله تلقائياً كزر إرسال submit ويطلق حدث إرسال النموذج فور النقر عليه.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
  stepsConfig: [
    {
      title: "سمِّ الزر بما يفعله",
      objective: "تعديل النص المقروء للزر الأول ليصف بدقة الإجراء المتوقع",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إعلام الزائر بالفعل الذي سينفذه الزر فور الضغط عليه.",
      errorRules: [RULES.missingClosingSlash, RULES.invalidSelfClosingContainer],
      hints: [
        "انتبه إلى النص المكتوب بين <button> و </button> في الزر الأول؛ غيّر النص فقط.",
        "قاعدة: كتابة نص دال وصريح داخل الزر متطلب أساسي في تصميم تجربة المستخدم وإتاحة الوصول. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص الداخلي للزر: ابدأ التجربة.",
        "الحل النموذجي: ابدأ التجربة"
      ]
    },
    {
      title: "بدّل نتيجة النقر",
      objective: "تعديل نص الرسالة المعروضة عند تشغيل حدث النقر onclick",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: التحكم في الرسالة التفاعلية الناتجة عن نقر الزر في واجهة الصفحة.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى دالة alert داخل خاصية onclick؛ عدّل النص بين القوسين وعلامات الاقتباس المفردة.",
        "قاعدة: خاصية onclick تستقبل كود جافاسكربت يتم تنفيذه فور إطلاق حدث النقر click. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الرسالة الجديدة: ظهرت نتيجة الزر.",
        "الحل النموذجي: ظهرت نتيجة الزر"
      ]
    },
    {
      title: "عطّل الزر الثاني",
      objective: "إضافة خاصية التعطيل المنطقية disabled للزر الثاني",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: منع المستخدم من النقر على الزر عندما لا تكون الشروط مكتملة.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى الزر الثاني؛ أضف كلمة disabled داخل وسم الفتح <button>.",
        "قاعدة: السمة disabled سمة منطقية تجعل الزر رمادياً صامتاً لا يتفاعل مع النقر أو لوحة المفاتيح. هل تحققت من صحة نوع الحقل واسم الخاصية لتوصيل البيانات بنجاح؟",
        "مساعدة محددة: اكتب السمة داخل الوسم هكذا: <button type=\"button\" disabled>زر غير متاح</button>.",
        "الحل النموذجي: <button type=\"button\" disabled>زر غير متاح</button>"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<form>\n  <input type=\"text\" name=\"search\">\n  <button>بحث</button>\n</form>",
    fixedCode: "<form>\n  <input type=\"text\" name=\"search\">\n  <button type=\"button\">بحث</button>\n</form>",
    question: "لماذا تسبب الزر في إعادة تحميل الصفحة غير المقصودة عند النقر عليه داخل النموذج؟",
    explanation: "القيمة الافتراضية للسمة type في عنصر <button> هي submit، مما يجعل النقر عليه يرسل النموذج تلقائياً ويعيد تحميل الصفحة ما لم يُحدد type=\"button\" صراحة.",
    options: [
      "الزر لا يقبل نصوصاً عربية داخله",
      "النوع الافتراضي للزر داخل النموذج هو submit ويجب تعيين type=\"button\"",
      "يجب إغلاق الزر بـ </input>",
      "لا يجوز وضع أزرار داخل النماذج"
    ],
    correctOptionIndex: 1
  }
});

const lesson26 = createLesson({
  id: "html-27-iframes",
  legacyId: "html:26",
  legacyTopic: "HTML Iframes",
  title: "تضمين النوافذ والإطارات الداخلية iframe",
  skill: skillName,
  order: 26,
  concept: "يسمح عنصر الإطار المضمن <iframe> بتضمين وثيقة HTML كاملة ومستقلة داخل الصفحة الحالية (سياق تصفح متداخل Nested Browsing Context). تدعم السمة src لتحديد رابط الصفحة، و title لإمكانية الوصول، و sandbox لفرض قيود أمنية صارمة تعزل محتوى الإطار.",
  whyUse: "تضمين الخرائط التفاعلية (Google Maps)، ومقاطع الفيديو من منصات المشاركة، وتطبيقات الطرف الثالث، ونوافذ الدفع الآمنة، مع عزل كود الإطار لمنع اختراق الصفحة المضيفة.",
  browserMechanics: "يخصص المتصفح سياق تصفح جديداً (Browsing Context) مع نافذة window وشجرة DOM منفصلة تماماً عن الصفحة الأبوية، وتطبق سياسة الأصل نفسه (Same-Origin Policy) لمنع السكربتات من التجسس على بيانات الإطار ما لم تشترك في نفس البروتوكول والمجال والمنفذ.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe",
  stepsConfig: [
    {
      title: "اكتب وصفًا دقيقًا للإطار",
      objective: "تعديل نص السمة title لوسم iframe لإتاحة الوصول",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمكين قارئات الشاشة والزوار من فهم غرض النافذة المضمنة قبل قراءة محتواها.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى خاصية title داخل وسم <iframe>؛ عدّل النص الوصفي بين علامتي الاقتباس.",
        "قاعدة: خاصية title في iframe إلزامية بموجب معايير الوصول العالمية لتعريف فاقدي البصر بمحتوى الإطار. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الوصف المطلوب: title=\"مثال صفحة داخل نافذة\".",
        "الحل النموذجي: title=\"مثال صفحة داخل نافذة\""
      ]
    },
    {
      title: "وسّع النافذة قليلًا",
      objective: "تعديل خاصية العرض width وخاصية الارتفاع height للإطار",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير مساحة عرض مريحة وكافية لمحتويات المستند المضمن دون ظهور أشرطة تمرير غير مريحة.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى سمتي width و height؛ عدّل الأبعاد بالأرقام.",
        "قاعدة: ضبط أبعاد الإطار بدقة يمنح الصفحة شكلاً متزناً ومتناسقاً. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اجعل الأبعاد مطابقة: width=\"420\".",
        "الحل النموذجي: width=\"420\""
      ]
    },
    {
      title: "عدّل محتوى المستند الداخلي",
      objective: "تعديل محتوى كود HTML الداخلي المضمن في خاصية srcdoc",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: كتابة وتجربة وثيقة ويب مصغرة مباشرة داخل خاصية srcdoc دون الحاجة لملف خارجي.",
      errorRules: [RULES.misplacedAttributeOutsideTag, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى خاصية srcdoc؛ غيّر الجملة الواقعة داخل كود الفقرة المضمنة.",
        "قاعدة: السمة srcdoc تسمح بتضمين شيفرة HTML صريحة لتعرض داخل الإطار كبديل لرابط خارجي. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الجملة الجديدة: هذه الصفحة تعيش داخل إطار مستقل..",
        "الحل النموذجي: هذه الصفحة تعيش داخل إطار مستقل."
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<iframe src=\"https://example.com/map\"></iframe>",
    fixedCode: "<iframe src=\"https://example.com/map\" title=\"خريطة الموقع الجغرافي\"></iframe>",
    question: "ما هي السمة الإلزامية الناقصة لإتاحة الوصول (Accessibility) في وسم iframe المعروض؟",
    explanation: "تفرض معايير WCAG وإتاحة الوصول وجود السمة title في عنصر <iframe> لوصف محتوى النافذة المضمنة حتى تتمكن قارئات الشاشة من إعلام المستخدم بمضمونها قبل دخولها.",
    options: [
      "لا يمكن تضمين روابط HTTPS داخل الإطارات",
      "الوسم <iframe> عنصر فارغ لا يقبل وسم إغلاق",
      "غياب السمة title التي تصف محتوى الإطار لقارئات الشاشة",
      "يجب استخدام خاصية width كسمة في style حصراً"
    ],
    correctOptionIndex: 2
  }
});

const lesson27 = createLesson({
  id: "html-28-javascript",
  legacyId: "html:27",
  legacyTopic: "HTML JavaScript",
  title: "دمج كود JavaScript وإضفاء التفاعلية",
  skill: skillName,
  order: 27,
  concept: "يُستخدم الوسم <script> لإدراج أو ربط الشيفرات البرمجية بلغة جافاسكربت لإضفاء التفاعلية وتعديل شجرة الـ DOM ديناميكياً والاستجابة لنقرات المستخدم وأحداث الصفحة. يدعم سمتي defer و async لإدارة التحميل غير المتزامن وتفادي تجميد الصفحة.",
  whyUse: "تحويل الصفحات الثابتة إلى تطبيقات ويب حية تتفاعل مع مدخلات الزائر، والتحقق الفوري من صحة البيانات، وإرسال واستقبال البيانات من الخوادم دون إعادة تحميل الصفحة (AJAX).",
  browserMechanics: "بشكل افتراضي، يُعد السكربت عنصراً معطلاً للمحلل (Parser-Blocking)؛ حيث يوقف المتصفح بناء شجرة DOM فور مواجهة <script> لحين تنزيل الكود وتنفيذه بالكامل. استخدام السمة defer يسمح بتنزيل السكربت في الخلفية وتنفيذه فور اكتمال بناء شجرة الـ DOM وقبل إطلاق حدث DOMContentLoaded.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
  stepsConfig: [
    {
      title: "غيّر الجملة قبل النقر",
      objective: "تعديل النص المبدئي لعنصر الفقرة المستهدفة قبل بدء التفاعل",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تهيئة الحالة المبدئية للعنصر في شجرة DOM قبل أن تتدخل جافاسكربت لتعديلها.",
      errorRules: [RULES.mismatchedPSpan, RULES.missingClosingSlash],
      hints: [
        "انتبه إلى وسم الفقرة <p id=\"result\">؛ عدّل النص المكتوب بداخلها.",
        "قاعدة: يظهر هذا النص للمستخدم أولاً، حتى يقوم بالنقر على الزر فيتم استبداله برمجياً. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص المبدئي: الرسالة جاهزة للتغيير..",
        "الحل النموذجي: الرسالة جاهزة للتغيير."
      ]
    },
    {
      title: "غيّر ما تكتبه الدالة",
      objective: "تعديل النص المسند برمجياً عبر getElementById().textContent داخل دالة السكربت",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: السيطرة على المنطق البرمجي الذي يغير محتوى الـ DOM أثناء وقت التشغيل.",
      errorRules: [RULES.missingClosingSlash, RULES.missingBodyTag],
      hints: [
        "انتبه إلى كود دالة showMessage داخل وسم <script>؛ عدّل النص الواقع بين علامتي الاقتباس بعد علامة اليساوي =.",
        "قاعدة: تعثر دالة getElementById على العنصر بواسطة معرفه، وخاصية textContent تستبدل نصه الداخلي فورياً. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اجعل القيمة المسندة تطابق: نفّذت JavaScript هذا التغيير..",
        "الحل النموذجي: نفّذت JavaScript هذا التغيير."
      ]
    },
    {
      title: "وضّح فعل الزر",
      objective: "تعديل نص الزر <button> ليعكس بدقة الوظيفة البرمجية التي ينفذها",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تنسيق العلاقة البديهية بين مظهر الزر وسلوكه البرمجي في واجهة المستخدم.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى نص الزر الذي يستدعي الدالة onclick=\"showMessage()\"؛ غيّر التسمية.",
        "قاعدة: النص الصريح على الزر يزيل أي غموض عن الأثر البرمجي المتوقع. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص التالي داخل الزر: اعرض النتيجة.",
        "الحل النموذجي: اعرض النتيجة"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<script>\n  document.getElementById(\"box\").textContent = \"مرحباً\";\n</script>\n<div id=\"box\">نص قديم</div>",
    fixedCode: "<div id=\"box\">نص قديم</div>\n<script>\n  document.getElementById(\"box\").textContent = \"مرحباً\";\n</script>",
    question: "لماذا تسبب كود السكربت في خطأ TypeError (عنصر غير موجود) عند تشغيل الصفحة؟",
    explanation: "تم تنفيذ السكربت قبل أن يقرأ المتصفح عنصر <div> في شجرة DOM، مما جعل getElementById تعيد null. الحل هو وضع السكربت بعد العنصر أو إضافة السمة defer.",
    options: [
      "لا يمكن تعديل عناصر div بواسطة جافاسكربت",
      "الخاصية textContent لا تقبل نصوصاً عربية",
      "الوسم <script> يجب أن يوضع دائماً خارج وسم <html>",
      "تنفيذ السكربت قبل إنشاء العنصر في شجرة DOM مما تسبب في استدعاء عنصر غير موجود"
    ],
    correctOptionIndex: 3
  }
});

const skillLessons = [lesson24, lesson25, lesson26, lesson27];
const outputPath = path.join(__dirname, "skill_06_identifiers_interactions.json");
fs.writeFileSync(outputPath, JSON.stringify(skillLessons, null, 2), "utf8");
console.log(`✔ Skill 6 authored successfully: ${skillLessons.length} lessons written to ${outputPath}`);

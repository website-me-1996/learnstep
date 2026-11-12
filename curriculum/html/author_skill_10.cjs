/**
 * curriculum/html/author_skill_10.cjs
 * Skill 10: رسومات ووسائط (Lessons 47 to 53)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, RULES } = require("./builder_helper.cjs");

const skillName = "رسومات ووسائط";

const lesson47 = createLesson({
  id: "html-48-canvas",
  legacyId: "html:47",
  legacyTopic: "HTML Canvas",
  title: "لوحة الرسم الديناميكية (HTML5 Canvas)",
  skill: skillName,
  order: 47,
  concept: "يوفر عنصر <canvas> مساحة نقطية شبكية Bitmap مخصصة للرسم الإجرائي التفاعلي ثنائي وثلاثي الأبعاد باستخدام لغة جافاسكربت عبر سياق الرسم 2D Context أو WebGL. يُحدد حجم اللوحة الفعلي بسمتي width و height المباشرتين.",
  whyUse: "بناء الألعاب التفاعلية في المتصفح، ورسم المخططات البيانية الحية (Charts)، ومعالجة الصور والفلاتر البصرية، وإنشاء المحاكاة الفيزيائية دون أي ملحقات خارجية.",
  browserMechanics: "يعين المتصفح مخزن بكسلات خام في الذاكرة الرسومية (Framebuffer). وتنفذ دوال الرسم (مثل fillRect و beginPath و arc) مباشرة على طبقة البكسلات النقطية، بحيث تفقد الأشكال هويتها كعناصر DOM وتصبح مجرد بكسلات ملونة على اللوحة.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas",
  stepsConfig: [
    {
      title: "غيّر لون المستطيل",
      objective: "تعديل خاصية لون التعبئة في سياق الرسم ctx.fillStyle",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تغيير لون الشكل المرسوم برمجياً على لوحة الكانفاس.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى كود جافاسكربت داخل الوسم <script>؛ عدّل قيمة ctx.fillStyle.",
        "قاعدة: تحدد خاصية fillStyle اللون المستخدم لملء الأشكال الهندسية في الكانفاس. هل تأكدت من كتابة رمز الهاش # وشفرة اللون الست عشري بدقة؟",
        "مساعدة محددة: اكتب لون التعبئة الجديد: #21845a.",
        "الحل النموذجي: #21845a"
      ]
    },
    {
      title: "وسّع مساحة اللوحة",
      objective: "تعديل سمتي width و height المباشرتين لعنصر canvas",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: زيادة أبعاد مخزن البكسلات الداخلي للوحة لتوفير مساحة رسم أوسع.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصيتي width و height داخل وسم <canvas>؛ عدّل الأبعاد بالأرقام.",
        "قاعدة: ضبط الأبعاد المباشرة على وسم canvas يحدد دقة الرسم الحقيقية دون أي تشوه. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اجعل الأبعاد مطابقة: width=\"320\".",
        "الحل النموذجي: width=\"320\""
      ]
    },
    {
      title: "حرّك المستطيل لأسفل",
      objective: "تعديل إحداثيات الرسم لدالة ctx.fillRect(x, y, w, h)",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: التحكم في الموضع الهندسي للشكل المرسوم على شبكة المحاور (X و Y).",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى دالة fillRect(20, 20, 150, 60)؛ عدّل الإحداثي الرأسي y لنقل المستطيل لأسفل.",
        "قاعدة: تبدأ نقطة الصفر (0, 0) في شبكة الكانفاس من الزاوية العلوية لجهة البدء وتزداد للأسفل. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب أبعاد وإحداثيات المستطيل الجديد: fillRect(25, 40, 100, 70).",
        "الحل النموذجي: fillRect(25, 40, 100, 70)"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<canvas style=\"width: 600px; height: 400px;\"></canvas>",
    fixedCode: "<canvas width=\"600\" height=\"400\"></canvas>",
    question: "لماذا بدت الرسوم مشوهة ومطاطة عند تحديد أبعاد canvas عبر CSS style بدلاً من سمات HTML؟",
    explanation: "تحدد سمتا width و height في HTML الحجم الداخلي الفعلي لمخزن البكسلات (Resolution). بينما تحدد خاصية style حجم العرض البصري الخارجي فقط، مما يجعل المتصفح يمط البكسلات الافتراضية (300x150) ويشوه دقة الرسم.",
    options: [
      "لا يمكن تحديد أبعاد للوحة الرسم",
      "عنصر canvas لا يدعم لغة CSS",
      "يجب إغلاق الكانفاس بـ </draw>",
      "تحديد الأبعاد عبر CSS يمط بكسلات اللوحة الافتراضية ويجب استخدام سمتي width و height المباشرتين"
    ],
    correctOptionIndex: 3
  }
});

const lesson48 = createLesson({
  id: "html-49-svg",
  legacyId: "html:48",
  legacyTopic: "HTML SVG",
  title: "الرسومات المتجهية القابلة للتحجيم (SVG)",
  skill: skillName,
  order: 48,
  concept: "لغة SVG (Scalable Vector Graphics) هي لغة توصيفية متجهة مبنية على XML ومدمجة بالكامل في HTML5. تصف الأشكال الهندسية (كالمستطيلات <rect>، والدوائر <circle>، والمسارات <path>) بمعادلات رياضية متجهة تحتفظ بحدتها الفائقة عند أي مستوى تكبير.",
  whyUse: "رسم الأيقونات والشعارات والرسوم التوضيحية التفاعلية؛ حيث تظل حادة ونقية تماماً على شاشات Retina عالية الكثافة، مع إمكانية تحريكها وتنسيق ألوانها بواسطة CSS واستهداف أجزائها عبر جافاسكربت.",
  browserMechanics: "على خلاف Canvas النقطي، فإن كل شكل داخل <svg> هو عقدة DOM حقيقية (مثل SVGCircleElement) في شجرة الـ DOM، ويمتلك أحداث نقر وفئات CSS خاصة به ويتم حسابه وإعادة رسمه بواسطة محرك الرسوميات المتجهي للمتصفح.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/SVG",
  stepsConfig: [
    {
      title: "غيّر لون الدائرة",
      objective: "تعديل خاصية لون التعبئة fill للدائرة في SVG",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تغيير لون تعبئة الشكل المتجهي باستخدام خاصية SVG المعتمدة.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية fill داخل وسم <circle>؛ بدّل اسم اللون إلى درجة أخرى.",
        "قاعدة: خاصية fill هي المسؤولة عن لون ملء المساحة الداخلية للأشكال المتجهة في SVG. هل تأكدت من كتابة رمز الهاش # وشفرة اللون الست عشري بدقة؟",
        "مساعدة محددة: اكتب لون التعبئة الجديد هكذا: #bd6338.",
        "الحل النموذجي: #bd6338"
      ]
    },
    {
      title: "كبّر نصف القطر",
      objective: "تعديل خاصية نصف القطر r لعنصر الدائرة circle",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: زيادة حجم الدائرة المتجهة مع الحفاظ التام على نعومة حوافها دون أي تشوه.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية r (نصف القطر)؛ ارفع الرقم لتكبير حجم الدائرة.",
        "قاعدة: الخاصية r في وسم circle تمثل طول نصف القطر بوحدة البكسل الهندسي المتجه. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اجعل نصف القطر يطابق: r=\"58\".",
        "الحل النموذجي: r=\"58\""
      ]
    },
    {
      title: "حرّك مركز الدائرة",
      objective: "تعديل إحداثيات مركز الدائرة cx و cy",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تحديد الموضع الهندسي الدقيق لمركز الشكل المتجه داخل فضاء لوحة SVG.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصيتي cx و cy؛ عدّل قيم الإحداثيات الأفقية والرأسية.",
        "قاعدة: cx يحدد موقع مركز الدائرة على المحور الأفقي، و cy يحدده على المحور الرأسي. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الإحداثيات الجديدة: cx=\"90\".",
        "الحل النموذجي: cx=\"90\""
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<svg width=\"100\" height=\"100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" color=\"blue\" />\n</svg>",
    fixedCode: "<svg width=\"100\" height=\"100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"blue\" />\n</svg>",
    question: "ما هي الخاصية الصحيحة لتلوين خلفية الأشكال في SVG بدلاً من color؟",
    explanation: "في مواصفات SVG، تُستخدم الخاصية fill لتلوين مساحة الشكل الداخلي، والخاصية stroke لتلوين الإطار الخارجي. الخاصية color لا تؤثر على تعبئة أشكال SVG بشكل مباشر.",
    options: [
      "خاصية تلوين مساحة أشكال SVG هي fill وليس color",
      "عنصر circle لا يقبل ألواناً باللغة الإنجليزية",
      "يجب كتابة SVG بحروف كبيرة فقط",
      "الدائرة تتطلب وسم إغلاق منفصل </circle>"
    ],
    correctOptionIndex: 0
  }
});

const lesson49 = createLesson({
  id: "html-50-media",
  legacyId: "html:49",
  legacyTopic: "HTML Media",
  title: "وسائط الويب المتعددة واستراتيجيات التضمين",
  skill: skillName,
  order: 49,
  concept: "تشمل وسائط الويب المتعددة ملفات الصوت والفيديو والرسوم المتحركة والصور بمختلف الصيغ (MP4, WebM, MP3, Ogg, WebP, AVIF). قدمت HTML5 دعماً أصيلاً للوسائط دون الحاجة لملحقات خارجية قديمة كـ Flash عبر وسوم <video> و <audio> ومصادرها المتعددة <source>.",
  whyUse: "تقديم تجربة وسائط غنية وسريعة التحميل ومتوافقة مع الهواتف الذكية مع احترام باقات بيانات المستخدمين وتوفير بدائل نصية لضعاف السمع والبصر.",
  browserMechanics: "يدير المتصفح مسار فك التشفير الإعلامي (Media Pipeline) بالتعاون مع بطاقة الرسوميات ونظام التشغيل؛ حيث يفحص برامج فك الترميز المدعومة (Codecs)، ويختار تلقائياً أول صيغة متوافقة من وسوم <source> المتعددة.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_multimedia",
  stepsConfig: [
    {
      title: "بدّل اسم ملف الصوت",
      objective: "تعديل مسار ملف الوسائط في السمة src لعنصر source",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توجيه مشغل الوسائط للملف الصوتي المطلوب تشغيله.",
      errorRules: [RULES.voidElementClosingTag, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية src داخل وسم <source>؛ اكتب اسم الملف الجديد.",
        "قاعدة: يستدعي المتصفح الملف المحدد في أول وسم source متوافق مع محرك فك التشفير لديه. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب مسار الملف الصوتي: lesson.mp3.",
        "الحل النموذجي: lesson.mp3"
      ]
    },
    {
      title: "أظهر زر التحكم",
      objective: "التأكد من وجود الخاصية المنطقية controls في وسم audio",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تمكين المستمع من بدء وإيقاف وضبط مستوى الصوت بحرية تامة.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى الكلمة controls داخل وسم <audio>؛ تأكد من وجودها دون حذف.",
        "قاعدة: غياب كلمة controls يجعل المشغل خفياً تماماً ولا يظهر في الصفحة. هل راجعت إعدادات الوسيط ومسار المورد والخصائص الإلزامية للعرض؟",
        "مساعدة محددة: اكتب الوسم هكذا: <audio>.",
        "الحل النموذجي: <audio>"
      ]
    },
    {
      title: "اكتب نوع الملف",
      objective: "تعديل خاصية نوع الوسائط type=\"audio/mpeg\" لمساعدة المتصفح",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: إعلان نوع فك التشفير مسبقاً دون إجبار المتصفح على تنزيل بايتات من الملف لفحصه.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية type في وسم source؛ اكتب نوع وسائط MP3 القياسي.",
        "قاعدة: الصيغة القياسية لنوع ملفات MP3 هي audio/mpeg. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب نوع الوسائط القياسي: audio/ogg.",
        "الحل النموذجي: audio/ogg"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<video src=\"movie.mp4\">\n</video>",
    fixedCode: "<video src=\"movie.mp4\" controls>\n  متصفحك لا يدعم مشغل الفيديو.\n</video>",
    question: "لماذا ظهر الفيديو كصورة ثابتة سوداء لا يمكن تشغيلها في الكود المعروض؟",
    explanation: "يفتقر الوسم إلى الخاصية المنطقية controls التي تُظهر واجهة التحكم الأصلية للمتصفح (أزرار التشغيل، الإيقاف، مستوى الصوت، وزر ملء الشاشة)، مع غياب النص الاحتياطي للمتصفحات غير المتوافقة.",
    options: [
      "الفيديو لا يعمل إلا داخل وسم <media>",
      "غياب الخاصية controls التي تُظهر أزرار التشغيل والتحكم للمستخدم",
      "امتداد mp4 غير مدعوم في متصفحات الويب",
      "يجب إغلاق الفيديو بـ </source>"
    ],
    correctOptionIndex: 1
  }
});

const lesson50 = createLesson({
  id: "html-51-video",
  legacyId: "html:50",
  legacyTopic: "HTML Video",
  title: "تضمين مشغل الفيديو والتحكم بالمقاطع",
  skill: skillName,
  order: 50,
  concept: "يُستخدم الوسم <video> لتضمين مقاطع الفيديو في الصفحة مع واجهة تحكم أصلية. يدعم سمات هامة: controls لإظهار أدوات التحكم، و poster لوضع صورة غلاف تمهيدية قبل بدء التشغيل، و preload لإدارة التحميل المسبق، و autoplay للتشغيل التلقائي (المشروط بـ muted في المتصفحات الحديثة)، و loop لتكرار العرض.",
  whyUse: "عرض شروحات الفيديو والدروس التعليمية والإعلانات بدقة عالية وتوافقية كاملة مع كافة الشاشات دون الاعتماد على مشغلات خارجية ثقيلة.",
  browserMechanics: "يمنع المتصفح التشغيل التلقائي للفيديو المصحوب بصوت لحماية المستخدم من الإزعاج (Autoplay Policy). لكي يعمل autoplay يجب إضافة السمة muted. ويقوم المتصفح ببدء تنزيل المقاطع تدريجياً عبر طلبات HTTP Range Requests لتمكين القفز الزمني السريع.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video",
  stepsConfig: [
    {
      title: "كبّر المشغل",
      objective: "تعديل خاصية العرض width لمشغل الفيديو لتوفير مساحة عرض سينمائية",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: ضبط أبعاد إطار الفيديو بما يناسب تصميم الواجهة ومقاس الشاشة.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية width في وسم <video>؛ ارفع القيمة إلى 400.",
        "قاعدة: تعيين أبعاد العرض والارتفاع المباشرة يحجز مساحة الفيديو ويمنع قفز تخطيط الصفحة أثناء التحميل. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اكتب العرض الجديد: width=\"400\".",
        "الحل النموذجي: width=\"400\""
      ]
    },
    {
      title: "غيّر اسم المصدر",
      objective: "تعديل مسار ملف الفيديو في السمة src لوسم source",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: ربط المشغل بالمقطع التعليمي المخصص للدرس.",
      errorRules: [RULES.voidElementClosingTag, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية src داخل وسم <source>؛ اكتب اسم ملف الفيديو الجديد.",
        "قاعدة: وسم <source> يسمح للمتصفح باختيار أنسب صيغة مدعومة لديه تلقائياً. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب مسار الملف الجديد: clip.mp4.",
        "الحل النموذجي: clip.mp4"
      ]
    },
    {
      title: "أخفِ أدوات التشغيل",
      objective: "التحكم في ظهور أو إخفاء أدوات التحكم controls",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: فهم دور السمة controls في إظهار أو إخفاء شريط أدوات المشغل.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى كلمة controls؛ حذفها يجعل الفيديو كخلفية صامتة دون أزرار.",
        "قاعدة: توفير خاصية controls إلزامي لتمكين المستخدم من إيقاف وتشغيل الفيديو بإرادته. هل راجعت إعدادات الوسيط ومسار المورد والخصائص الإلزامية للعرض؟",
        "مساعدة محددة: اترك كلمة controls موجودة داخل الوسم لضمان تفاعل المستخدم: <video width=\"400\">.",
        "الحل النموذجي: <video width=\"400\">"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<video autoplay controls>\n  <source src=\"video.mp4\" type=\"video/mp4\">\n</video>",
    fixedCode: "<video autoplay muted controls>\n  <source src=\"video.mp4\" type=\"video/mp4\">\n</video>",
    question: "لماذا ترفض معظم المتصفحات تشغيل الفيديو تلقائياً (autoplay) في الكود الأول؟",
    explanation: "تفرض سياسة الأمان وتجربة المستخدم في جميع المتصفحات الحديثة حظر التشغيل التلقائي لأي مقطع فيديو إلا إذا كان صامتاً تماماً بإضافة خاصية muted.",
    options: [
      "يجب استبدال mp4 بصيغة avi",
      "خاصية controls تتعارض مع خاصية autoplay",
      "التشغيل التلقائي autoplay يتطلب إلزامياً وجود خاصية كتم الصوت muted",
      "الوسم <video> لا يقبل وسوم <source> بداخله"
    ],
    correctOptionIndex: 2
  }
});

const lesson51 = createLesson({
  id: "html-52-audio",
  legacyId: "html:51",
  legacyTopic: "HTML Audio",
  title: "تضمين المقاطع الصوتية والتحكم بالتشغيل",
  skill: skillName,
  order: 51,
  concept: "يُعرّف عنصر <audio> مشغل وسائط صوتية لتشغيل التدوينات الصوتية (Podcasts) والمؤثرات الصوتية والموسيقى في الصفحة. يعتمد على صيغ MP3 و WAV و Ogg، ويتضمن وسوم <source> البديلة لتوفير أقصى درجات التوافق بين المتصفحات المختلفة.",
  whyUse: "إتاحة محتوى صوتي مسموع يلائم البودكاست والمقاطع التعليمية وتطبيقات تعلم اللغات، مع واجهة تحكم سهلة الاستخدام ومريحة.",
  browserMechanics: "ينشئ المتصفح كائن HTMLAudioElement ويطلق شريط تحكم صوتي مصغر يتضمن زر التشغيل ومؤشر التقدم ومستوى الصوت. يتم فك تشفير الصوت عبر معالج الصوت في نظام التشغيل دون استهلاك موارد الشاشة أو معالج الرسوميات.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio",
  stepsConfig: [
    {
      title: "استخدم اسم ملف آخر",
      objective: "تعديل مسار ملف الصوت الأساسي داخل وسم source",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تغيير الملف الصوتي المشغل في واجهة الصفحة بسلاسة.",
      errorRules: [RULES.voidElementClosingTag, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية src في وسم <source> الأول؛ اكتب اسم الملف الجديد.",
        "قاعدة: صيغة MP3 مدعومة بنسبة 100% عبر كافة المتصفحات الحديثة. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب مسار الملف الجديد: lesson.mp3.",
        "الحل النموذجي: lesson.mp3"
      ]
    },
    {
      title: "أضف مصدرًا بديلًا",
      objective: "إضافة وتعديل وسم source بديل بصيغة Ogg",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير صيغة بديلة تضمن تشغيل الصوت حتى على الأنظمة المفتوحة التي تفضل صيغ Ogg.",
      errorRules: [RULES.voidElementClosingTag, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى وسم <source> الثاني؛ تأكد من تعيين type=\"audio/ogg\".",
        "قاعدة: توفير صيغ متعددة يضمن عمل الصوت على أي متصفح يفتقر لبرنامج فك تشفير MP3. هل راجعت إعدادات الوسيط ومسار المورد والخصائص الإلزامية للعرض؟",
        "مساعدة محددة: اكتب وسم المصدر الثاني:     <source src=\"welcome.ogg\" type=\"audio/ogg\">\n    المتصفح لا يدعم عنصر الصوت..",
        "الحل النموذجي:     <source src=\"welcome.ogg\" type=\"audio/ogg\">\n    المتصفح لا يدعم عنصر الصوت."
      ]
    },
    {
      title: "حافظ على أدوات المستمع",
      objective: "تأكيد بقاء السمة controls في وسم audio ليتمكن المستخدم من الاستماع",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: ضمان ظهور واجهة التحكم الأصلية للمستمع للتحكم بمستوى الصوت والتوقف.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى وسم <audio>؛ تأكد من احتفاظه بكلمة controls.",
        "قاعدة: بدون كلمة controls، لن يرى الزائر أي زر لبدء تشغيل الصوت في المتصفح. هل راجعت إعدادات الوسيط ومسار المورد والخصائص الإلزامية للعرض؟",
        "مساعدة محددة: اكتب الوسم هكذا: <audio>.",
        "الحل النموذجي: <audio>"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<audio src=\"podcast.mp3\">\n</audio>",
    fixedCode: "<audio src=\"podcast.mp3\" controls>\n  متصفحك لا يدعم تشغيل الملفات الصوتية.\n</audio>",
    question: "ما سبب عدم ظهور مشغل الصوت في واجهة الصفحة نهائياً؟",
    explanation: "عنصر <audio> بدون خاصية controls يكون مخفياً تماماً في الصفحة ولا يظهر له أي أزرار أو شريط تحكم. يجب إضافة controls ليراه المستخدم ويتفاعل معه.",
    options: [
      "يجب وضع الصوت داخل وسم <p>",
      "الوسم <audio> يتطلب وسم إغلاق </sound>",
      "لا يمكن تشغيل ملفات MP3 في صفحات الويب",
      "غياب خاصية controls التي تُظهر واجهة المشغل البصرية للمستخدم"
    ],
    correctOptionIndex: 3
  }
});

const lesson52 = createLesson({
  id: "html-53-plug-ins",
  legacyId: "html:52",
  legacyTopic: "HTML Plug-ins",
  title: "الكائنات المضمنة والملحقات الخارجية",
  skill: skillName,
  order: 52,
  concept: "يُستخدم الوسم <object> لتضمين الموارد الخارجية متعددة الوسائط مثل مستندات PDF التفاعلية، ورسومات SVG، ومحتويات الوسائط المساعدة. يحتوي على نصوص وعناصر بديلة احتياطية (Fallback Content) تُعرض تلقائياً إذا عجز المتصفح عن فتح نوع الملف المحدد.",
  whyUse: "عرض ملفات PDF والشهادات والتقارير الأكاديمية مباشرة داخل المتصفح مع ضمان وجود محتوى بديل وروابط تنزيل لمن لا تتوفر لديهم عارضات المستندات.",
  browserMechanics: "يفحص المتصفح السمة type (مثل application/pdf). إذا كان المتصفح يمتلك قارئ PDF داخلياً، يدمجه في مساحة الصندوق. وإذا فشل في معالجة المورد، يتجاهل السمة data وينتقل تلقائياً لتصيير المحتوى البديل المكتوب داخل وسمَي <object> و </object>.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object",
  stepsConfig: [
    {
      title: "وسّع عرض المورد",
      objective: "تعديل خاصية العرض width لحاوية الكائن المضمن object",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير مساحة عرض ملائمة تتيح قراءة المستند المضمن بارتياح.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى خاصية width في وسم <object>؛ عدّل العرض بالأرقام.",
        "قاعدة: تعيين الأبعاد المباشرة يضمن حجز مساحة مناسبة لمستند PDF أو الملف الخارجي. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اكتب العرض الجديد: width=\"300\".",
        "الحل النموذجي: width=\"300\""
      ]
    },
    {
      title: "بدّل الملف المضمّن",
      objective: "تعديل مسار الملف المستهدف في خاصية data لوسم object",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تغيير الملف الرقمي المضمن لعرض وثيقة جديدة.",
      errorRules: [RULES.missingClosingSlash, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية data داخل وسم <object>؛ اكتب اسم الملف الجديد.",
        "قاعدة: خاصية data هي المسؤولة عن تحديد عنوان URL للمورد الخارجي في وسم object. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب مسار الملف الجديد: medal.svg.",
        "الحل النموذجي: medal.svg"
      ]
    },
    {
      title: "غيّر النص الاحتياطي",
      objective: "تعديل نص الرسالة الاحتياطية البديلة المحصورة بين وسمي object",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: تقديم إرشاد ورابط تنزيل بديل في حال عجز متصفح المستخدم عن عرض الملف مباشرة.",
      errorRules: [RULES.missingClosingSlash, RULES.mismatchedPSpan],
      hints: [
        "انتبه إلى الفقرة الموجودة داخل وسم <object>؛ عدّل النص الاحتياطي.",
        "قاعدة: المحتوى المحصور داخل object لا يظهر إلا إذا فشل المتصفح في تشغيل المورد. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب النص البديل: لم تظهر الشارة..",
        "الحل النموذجي: لم تظهر الشارة."
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<embed src=\"document.pdf\" type=\"application/pdf\"></embed>",
    fixedCode: "<embed src=\"document.pdf\" type=\"application/pdf\">",
    question: "ما هو الخطأ النحوي في إغلاق عنصر <embed> المعروض؟",
    explanation: "الوسم <embed> هو عنصر فراغ (Void Element) في HTML5 ولا يقبل وسم إغلاق منفصل مثل </embed>، على عكس الوسم الحاوي <object>.",
    options: [
      "الوسم <embed> عنصر فارغ لا يقبل وسم إغلاق منفصل </embed>",
      "ملفات PDF لا يمكن تضمينها في صفحات الويب",
      "خاصية type محظورة مع عنصر embed",
      "يجب استبدال src بخاصية href"
    ],
    correctOptionIndex: 0
  }
});

const lesson53 = createLesson({
  id: "html-54-youtube",
  legacyId: "html:53",
  legacyTopic: "HTML YouTube",
  title: "تضمين مقاطع الفيديو من منصة YouTube",
  skill: skillName,
  order: 53,
  concept: "يتم تضمين مقاطع الفيديو من منصة YouTube في صفحات الويب عبر وسم الإطار المضمن <iframe> باستخدام رابط التضمين المخصص (https://www.youtube.com/embed/VIDEO_ID) بدلاً من رابط المشاهدة العادي، مع إضافة سمات الأمان وتحديد صلاحيات ملء الشاشة allowfullscreen.",
  whyUse: "الاستفادة من خوادم YouTube الضخمة لتشغيل وبث الفيديوهات بجودة متكيفة دون استهلاك حزم بيانات وباندويث خادم الموقع الخاص.",
  browserMechanics: "يقوم إطار iframe بإنشاء اتصال آمن مع خوادم YouTube لتشغيل مشغل فيديو مخصص مبني بتقنيات HTML5 وواجهات برمجة الوسائط المتدفقة (Adaptive Bitrate Streaming)، مع عزل الكوكيز ومحتوى الجلسة لحماية المستخدمين.",
  documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#embedding_youtube_videos",
  stepsConfig: [
    {
      title: "استبدل معرّف الفيديو",
      objective: "تعديل معرّف الفيديو VIDEO_ID في مسار التضمين https://www.youtube.com/embed/...",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: عرض مقطع الفيديو المحدد بدقة في إطار الصفحة.",
      errorRules: [RULES.missingClosingSlash, RULES.unquotedUrlAttribute],
      hints: [
        "انتبه إلى خاصية src في وسم <iframe>؛ عدّل معرّف الفيديو بعد /embed/.",
        "قاعدة: مسار التضمين المصرح به من YouTube يبدأ بـ https://www.youtube.com/embed/ متبوعاً بمعرف الفيديو. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب الرابط الجديد: M7lc1UVf-VE.",
        "الحل النموذجي: M7lc1UVf-VE"
      ]
    },
    {
      title: "كبّر مساحة العرض",
      objective: "تعديل خاصيتي width و height لإطار YouTube المضمن",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: ضبط المشغل بنسبة الأبعاد العريضة القياسية 16:9 لمشاهدة مريحة.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى سمتي width و height؛ ارفع العرض إلى 420 والارتفاع إلى 236.",
        "قاعدة: النسبة 16:9 هي النسبة القياسية لفيديوهات YouTube لتفادي ظهور حواف سوداء. هل راجعت قيمة الأبعاد المحددة وتأكدت من صحتها داخل علامتي الاقتباس؟",
        "مساعدة محددة: اجعل الأبعاد مطابقة: width=\"480\".",
        "الحل النموذجي: width=\"480\""
      ]
    },
    {
      title: "صف الإطار بدقة",
      objective: "تعديل نص السمة title لإطار فيديو YouTube لضمان إتاحة الوصول",
      type: "edit",
      benefit: "فائدة ما أنشأته للتو: توفير وصف صوتي دلالي يخبر قارئات الشاشة بموضوع الفيديو المعروض.",
      errorRules: [RULES.missingClosingSlash, RULES.misplacedAttributeOutsideTag],
      hints: [
        "انتبه إلى السمة title داخل وسم iframe؛ اكتب عنواناً يصف موضوع المقطع.",
        "قاعدة: وجود title في وسوم iframe متطلب أساسي في معايير إتاحة الوصول. هل راجعت موضع التعديل وتأكدت من كتابة القيمة المطلوبة بدقة؟",
        "مساعدة محددة: اكتب وصف الإطار المطلوب: شرح أساسيات HTML.",
        "الحل النموذجي: شرح أساسيات HTML"
      ]
    }
  ],
  bugRepair: {
    brokenCode: "<iframe src=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\"></iframe>",
    fixedCode: "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" title=\"فيديو تعليمي\" allowfullscreen></iframe>",
    question: "لماذا يرفض موقع YouTube تشغيل الفيديو داخل iframe عند استخدام رابط watch?v= المباشر؟",
    explanation: "يمنع موقع YouTube لأسباب أمنية عرض صفحة المشاهدة الكاملة (watch) داخل الإطارات عبر ترويسة X-Frame-Options. يجب استخدام رابط التضمين المخصص /embed/ بدلاً منها.",
    options: [
      "منصة YouTube لم تعد تدعم التضمين في الويب",
      "استخدام رابط المشاهدة watch بدلاً من مسار التضمين المخصص /embed/ المصرح به داخل الإطارات",
      "يجب كتابة كود التضمين بلغة جافاسكربت فقط",
      "الوسم <iframe> غير مسموح به لمقاطع الفيديو"
    ],
    correctOptionIndex: 1
  }
});

const skillLessons = [lesson47, lesson48, lesson49, lesson50, lesson51, lesson52, lesson53];
const outputPath = path.join(__dirname, "skill_10_graphics_media.json");
fs.writeFileSync(outputPath, JSON.stringify(skillLessons, null, 2), "utf8");
console.log(`✔ Skill 10 authored successfully: ${skillLessons.length} lessons written to ${outputPath}`);

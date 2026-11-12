/**
 * curriculum/js/author_skills_20_to_23.cjs
 * Skills 20 through 23 (Lessons 99 to 118 - 20 lessons)
 */

const fs = require("node:fs");
const path = require("node:path");
const { createLesson, JS_TOPICS } = require("./builder_helper.cjs");
const { JS_RULES } = require("./rules_catalog.cjs");

const OUTPUT_DIR = path.resolve(__dirname);

const skillData = [
  // Skill 20: ربط الأوامر بعناصر الصفحة (99..102)
  {
    order: 99,
    title: "شجرة عناصر الصفحة (HTML DOM) والتحكم البرمجي",
    concept: "نموذج كائن المستند (DOM) هو واجهة برمجة تطبيقات (API) تمثل صفحة HTML كشجرة كائنات هرمية؛ تتيح لـ JavaScript قراءة العناصر وتعديل نصوصها وخصائصها وتنسيقات CSS وحذفها وإضافتها ديناميكياً.",
    whyUse: "يمثل الجسر الرابط بين لغة البرمجة والشاشة المرئية؛ فبدون DOM لا يمكن لـ JavaScript التفاعل مع ما يراه المستخدم أو تغيير مظهر الصفحة استجابة لأفعاله.",
    browserMechanics: "يبني المتصفح شجرة DOM أثناء تحليل كود HTML؛ كل وسم يصبح كائن Node في الذاكرة يحمل خصائص ودوالاً، ويتيح للمحرك الاستجابة السريعة للتعديلات وإعادة رسم الشاشة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    breakdown: [
      "وثيقة document: الكائن الجذري الذي يمثل كامل صفحة الويب في الذاكرة.",
      "دالة document.querySelector('sel'): تستهدف أي عنصر عبر محددات CSS القياسية بدقة.",
      "خاصية style: تتيح تعديل وتطبيق خصائص CSS المباشرة برمجياً على العنصر."
    ],
    bugRepair: {
      brokenCode: "let btn = document.query('button');",
      fixedCode: "let btn = document.querySelector('button');",
      question: "لماذا رمى المفسر خطأ TypeError: document.query is not a function؟",
      explanation: "الدالة القياسية لاستهداف العناصر عبر محددات CSS هي querySelector() أو querySelectorAll()، ولا توجد دالة باسم document.query.",
      options: [
        "لأن الأزرار لا يمكن استهدافها في DOM",
        "لأن الدالة القياسية للاستهداف هي querySelector() وليس query()",
        "لأن كلمة button يجب أن تكون بأحرف كبيرة",
        "لأن الاستهداف يتطلب كتابة معرف ID حصراً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 100,
    title: "أحداث الصفحة (HTML Events) والاستجابة لتفاعل المستخدم",
    concept: "الأحداث (Events) هي إشارات يطلقها المتصفح عند وقوع فعل معين؛ مثل نقر المستخدم على زر (click)، أو الكتابة في حقل (input)، أو تحريك الفأرة، أو اكتمال تحميل الصفحة (DOMContentLoaded).",
    whyUse: "تحول الموقع من صفحة ساكنة إلى تطبيق حي يتفاعل لحظياً مع رغبات الزائر ويقدم ردود فعل بصرية وعملية فورية لكل ضغطة مفتاح.",
    browserMechanics: "تسجل دالة addEventListener الدالة المعالجة في جدول مستمعي أحداث العنصر؛ وعند وقوع الحدث يولد المتصفح كائن حدث (Event Object) يدور عبر مراحل الالتقاط والهدف والفقاعة (Bubbling).",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
    breakdown: [
      "دالة addEventListener('type', fn): الطريقة القياسية والآمنة لربط الأحداث دون الكتابة فوق مستمعين آخرين.",
      "كائن الحدث (e): يحمل تفاصيل دقيقة؛ مثل موضع الفأرة، أو الزر المضغوط، أو العنصر الهدف e.target.",
      "دالة e.preventDefault(): تمنع السلوك الافتراضي للمتصفح؛ مثل منع إعادة تحميل الصفحة عند إرسال النماذج."
    ],
    bugRepair: {
      brokenCode: "let btn = document.querySelector('button');\nbtn.addEventListener('click', sayHi()); // تم استدعاؤها فوراً بالأقواس",
      fixedCode: "let btn = document.querySelector('button');\nbtn.addEventListener('click', sayHi);",
      question: "لماذا تم تنفيذ دالة sayHi فور تحميل الصفحة بدلاً من الانتظار حتى ينقر المستخدم على الزر؟",
      explanation: "وضع الأقواس sayHi() يستدعي الدالة فوراً أثناء تسجيل الحدث؛ يجب تمرير مرجع الدالة sayHi بدون أقواس لينفذها المتصفح عند النقر الفعلي.",
      options: [
        "لأن حدث النقر click لا يعمل مع الدوال المسماة",
        "لأن وضع الأقواس الدائرية () استدعى الدالة فوراً، والصواب تمرير مرجع الدالة sayHi بدون أقواس",
        "لأن زر الفأرة لم يتم ضبطه في المتصفح",
        "لأن addEventListener تتطلب دالة مجهولة حصراً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 101,
    title: "توليد وبناء عناصر HTML برمجياً (HTML First Dynamic Creation)",
    concept: "تتيح JavaScript إنشاء عناصر HTML جديدة بالكامل في الذاكرة عبر document.createElement، وتعيين خصائصها ومحتواها، ثم حقنها في المكان المطلوب في شجرة الصفحة باستخدام appendChild أو append.",
    whyUse: "أساس بناء القوائم الديناميكية؛ مثل إضافة رسالة جديدة في تطبيق المحادثة فور كتابتها، أو عرض قائمة المنتجات القادمة من الخادم دون كتابة وسوم مسبقة في ملف HTML.",
    browserMechanics: "يُنشأ العنصر أولاً كعقدة معزولة في الذاكرة (Detached DOM Node) دون التأثير على الصفحة؛ وفور ربطه بـ append يتم إدراجه في شجرة التصيير وإطلاقه لعملية Reflow ورسمه على الشاشة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
    breakdown: [
      "دالة document.createElement('tag'): تنشئ عقدة عنصر HTML جديدة في الذاكرة.",
      "ضبط الخصائص: مثل el.className و el.textContent قبل إضافتها للصفحة.",
      "دالة parent.append(child): تدرج العنصر الجديد كابن تابع داخل الحاوية المطلوبة."
    ],
    bugRepair: {
      brokenCode: "let p = document.createElement('<p>');",
      fixedCode: "let p = document.createElement('p');",
      question: "لماذا أظهر مفسر المتصفح خطأ عند محاولة إنشاء عنصر الفقرة؟",
      explanation: "دالة createElement تقبل اسم الوسم مجرداً بدون أقواس الزوايا ('p' وليس '<p>').",
      options: [
        "لأن الفقرات لا يمكن إنشاؤها برمجياً",
        "لأن دالة createElement تأخذ اسم الوسم فقط 'p' دون علامات الزوايا <>",
        "لأن اسم الوسم يجب أن يكون بحروف كبيرة 'P'",
        "لأن إنشاء العناصر يتطلب كلمة new Element"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 102,
    title: "واجهة النافذة العامة (Window API) وبيئة المتصفح",
    concept: "كائن window هو الكائن الجذري الأعلى في بيئة تشغيل متصفح الويب (BOM: Browser Object Model)؛ يمثل نافذة المتصفح الحالية، وكافة المتغيرات العامة ودوال المتصفح القياسية هي خصائص تابعة له.",
    whyUse: "يوفر الوصول إلى أبعاد شاشة المستخدم (innerWidth, innerHeight)، وسجل التنقل history، ومعلومات الموقع الجغرافي والرابط الحالي location، وأدوات التخزين والتوقيت.",
    browserMechanics: "يمثل window النطاق العام (Global Object) في المتصفحات؛ وعند استدعاء أي دالة قياسية مثل alert أو setTimeout أو fetch، يبحث المحرك عنها تلقائياً كخاصية تابعة لـ window.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Window",
    breakdown: [
      "كائن window.location: يتيح قراءة عنوان URL الحالي وإعادة توجيه الزائر لصفحة أخرى.",
      "كائن window.history: يتيح الرجوع للصفحة السابقة history.back() أو التقدم للأمام.",
      "الخصائص العامة: كتابة window.alert() تكافئ تماماً كتابة alert() المباشرة."
    ],
    bugRepair: {
      brokenCode: "window.redirect('https://example.com');",
      fixedCode: "window.location.href = 'https://example.com';",
      question: "لماذا رمى المفسر خطأ TypeError: window.redirect is not a function؟",
      explanation: "لا توجد دالة باسم window.redirect في المتصفح؛ إعادة توجيه المستخدم لصفحة أخرى تتم عبر إسناد الرابط لخاصية window.location.href.",
      options: [
        "لأن المتصفح يمنع الانتقال لروابط خارجية",
        "لأن إعادة التوجيه تتم عبر الخاصية القياسية window.location.href وليس دالة redirect",
        "لأن الرابط يجب أن يكون بدون بروتوكول https",
        "لأن كائن window محجوز للقراءة فقط"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 21: استخدام بيانات المتصفح (103..106)
  {
    order: 103,
    title: "جلب البيانات بالواجهة الحديثة (Fetch API) والتواصل مع الخوادم",
    concept: "واجهة Fetch API هي الوسيلة القياسية الحديثة المعتمدة على الوعود (Promises) في JavaScript لإجراء طلبات شبكية غير متزامنة (HTTP Requests) لجلب أو إرسال البيانات إلى الخوادم دون إعادة تحميل الصفحة.",
    whyUse: "تعد القلب النابض لكافة تطبيقات الويب الحديثة (Single Page Applications)؛ فبواسطتها يتم جلب منشورات جديدة، وتحديث الإشعارات، وإرسال بيانات النماذج للخادم في الخلفية.",
    browserMechanics: "تُدار طلبات fetch عبر خيوط المعالجة الشبكية للمتصفح؛ وعند وصول الاستجابة، يوضع الـ Promise في طابور المهام الدقيقة (Microtask Queue) ليتولى مسار JS معالجته فور فراغ الـ Call Stack.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    breakdown: [
      "دالة fetch(url): تطلق طلباً شبكياً وتعيد كائن Promise يُحل بكائن Response.",
      "تحليل البيانات res.json(): دالة غير متزامنة تقرأ نص الاستجابة وتحوله لكائن JS حقيقي.",
      "معالجة الأخطاء: التحقق من res.ok للتأكد من أن كود الحالة في نطاق النجاح (200-299)."
    ],
    bugRepair: {
      brokenCode: "let res = fetch('https://api.test/data');\nconsole.log(res.data); // undefined لأنها Promise!",
      fixedCode: "let res = await fetch('https://api.test/data');\nlet data = await res.json();\nconsole.log(data);",
      question: "لماذا لم تظهر البيانات عند قراءة res مباشرة؟",
      explanation: "دالة fetch دالة غير متزامنة تعيد Promise ولا تعيد البيانات فوراً؛ يجب استخدام await أو then لانتظار اكتمال الطلب الشبكي وقراءة JSON.",
      options: [
        "لأن الرابط مغلق ولا يقبل الاتصال",
        "لأن fetch غير متزامنة تعيد كائن Promise ويجب انتظارها بـ await قبل قراءة البيانات المحللة",
        "لأن البيانات الشبكية تتطلب استخدام مكتبة خارجية دائماً",
        "لأن console.log لا تطبع كائنات الاستجابة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 104,
    title: "تنسيق البيانات المتبادلة (JSON) والتحليل والتسلسل",
    concept: "تنسيق JSON (JavaScript Object Notation) هو المعيار العالمي الأكثر استخداماً لتبادل البيانات النصية بين الخوادم والمتصفحات؛ وتوفر JavaScript كائن JSON القياسي مع دالتي Parse و Stringify.",
    whyUse: "تسمح بتحويل كائنات ومصفوفات JavaScript المعقدة إلى نصوص خفيفة الوزن يسهل نقلها عبر الشبكة أو حفظها في التخزين المحلي، ثم إعادة بنائها لكائنات حقيقية عند الاستلام.",
    browserMechanics: "تُنفذ دالتا JSON.parse و JSON.stringify عبر محركات تحويل سريعة ومكتوبة بلغة C++ داخل محرك المتصفح، وتلتزم بقواعد أمان تمنع تنفيذ أي أكواد برمجية خبيثة أثناء التحليل.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    breakdown: [
      "دالة JSON.parse(text): تحول النص المهيكل بصيغة JSON إلى كائن JavaScript حقيقي.",
      "دالة JSON.stringify(obj): تحول كائن أو مصفوفة JavaScript إلى نص JSON قياسي.",
      "قواعد الصياغة الصارمة: المفاتيح في JSON يجب أن تُحاط دائماً بعلامات تنصيص مزدوجة \"key\"."
    ],
    bugRepair: {
      brokenCode: "let data = JSON.parse('{ name: \"سعد\" }'); // بدون علامات تنصيص للمفتاح",
      fixedCode: "let data = JSON.parse('{ \"name\": \"سعد\" }');",
      question: "لماذا رمى المفسر خطأ SyntaxError: Unexpected token n in JSON at position 2؟",
      explanation: "مواصفة JSON القياسية تفرض وضع المفاتيح النصية دائماً بين علامات تنصيص مزدوجة \" \"؛ كتابة المفتاح بدونها يعتبر خطأ صياغة غير صالح.",
      options: [
        "لأن الأسماء العربية غير مدعومة في JSON",
        "لأن معيار JSON الصارم يفرض إحاطة أسماء المفاتيح بعلامات تنصيص مزدوجة \" \" إجبارياً",
        "لأن الأقواس المتعرجة غير مقبولة في JSON",
        "لأن دالة parse تتطلب مصفوفة وليس كائناً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 105,
    title: "واجهات المتصفح المدمجة (Web APIs: Storage & Geolocation)",
    concept: "واجهات Web APIs هي مجموعة من القدرات والخدمات المتقدمة التي يوفرها المتصفح لـ JavaScript خارج مواصفة اللغة الأساسية؛ مثل localStorage لحفظ البيانات محلياً، و Geolocation لتحديد الموقع، و Notification للتنبيهات.",
    whyUse: "تمنح تطبيقات الويب قدرات تماثل التطبيقات الأصلية (Native Apps)؛ مثل حفظ تقدم المستخدم حتى بعد إغلاق المتصفح، أو اقتراح أقرب متجر للمستخدم بناءً على إحداثياته الحقيقية.",
    browserMechanics: "تعمل واجهات Web APIs في طبقة المتصفح الأصلية خارج بيئة محرك JS؛ وتطلب إذناً صريحاً من المستخدم للخدمات الحساسة (مثل الموقع والكاميرا) لضمان الخصوصية.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API",
    breakdown: [
      "localStorage.setItem(k, v): تخزن نصوصاً بشكل دائم على جهاز المستخدم دون تاريخ انتهاء.",
      "localStorage.getItem(k): تسترجع القيمة المحفوظة مسبقاً بواسطة المفتاح المحدد.",
      "سعة التخزين: تتيح عادة ما يصل إلى 5 ميجابايت من البيانات لكل نطاق موقع."
    ],
    bugRepair: {
      brokenCode: "let user = { name: 'منى' };\nlocalStorage.setItem('user', user);\nlet res = localStorage.getItem('user');\nconsole.log(res.name); // undefined لأنه خزن [object Object]",
      fixedCode: "let user = { name: 'منى' };\nlocalStorage.setItem('user', JSON.stringify(user));\nlet res = JSON.parse(localStorage.getItem('user'));\nconsole.log(res.name);",
      question: "لماذا خزن localStorage القيمة كـ '[object Object]' وفشلت قراءة الاسم؟",
      explanation: "يقبل localStorage تخزين نصوص فقط، وإرسال كائن مباشرة يحوله إلى '[object Object]'؛ يجب تحويل الكائن لنص بـ JSON.stringify ثم تحليله بـ JSON.parse.",
      options: [
        "لأن localStorage لا تدعم الأسماء العربية",
        "لأن localStorage تخزن نصوصاً فقط ويجب استخدام JSON.stringify للحفظ و JSON.parse للقراءة",
        "لأن الكائن user يحتاج إلى كلمة new Storage",
        "لأن اسم المفتاح user محجوز للمتصفح"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 106,
    title: "مستقبل التواريخ والوقت مع واجهة Temporal الحديثة",
    concept: "واجهة Temporal هي الواجهة البرمجية المتطورة القياسية الجديدة في JavaScript لمعالجة التواريخ والأوقات؛ صُممت لحل كافة عيوب كائن Date القديم من خلال توفير كائنات دقيقة، وثابتة غير قابلة للتعديل، ومدركة تماماً للمناطق الزمنية والتقاويم.",
    whyUse: "تنهي أخطاء التوقيت الشهيرة في التاريخ القديم؛ وتفصل بوضوح بين التاريخ البحت (Temporal.PlainDate) والتوقيت العالمي وتوقيت المنطقة الزمنية بدقة متناهية.",
    browserMechanics: "تعتمد كائنات Temporal على بنية نانوثانية (Nanosecond Precision) مع كائنات غير قابلة للتعديل (Immutable)؛ كل عملية حسابية تعيد كائناً جديداً مما يمنع الأخطاء الجانبية تماماً.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal",
    breakdown: [
      "واجهة Temporal.Now: تستخرج التاريخ والوقت اللحظي بدقة النانوثانية.",
      "كائن PlainDate: يمثل يوماً على التقويم (سنة، شهر، يوم) دون التورط في تعقيدات المناطق الزمنية.",
      "عدم القابلية للتعديل: كل عملية إضافة أو طرح تنتج كائناً زمنياً مستقلاً في الذاكرة."
    ],
    bugRepair: {
      brokenCode: "// استخدام كائن Date القديم الذي يعدل الأصل\nlet d = new Date('2026-01-01');\nd.setMonth(5); // عدل الكائن الأصلي في مكانه!",
      fixedCode: "// نمط الحماية المعياري الحديث لإنشاء كائن جديد غير قابل للتعديل\nlet d = new Date('2026-01-01');\nlet next = new Date(d);\nnext.setMonth(5);",
      question: "لماذا تُعتبر كائنات التاريخ القديمة Date خطيرة في البرمجيات المالية؟",
      explanation: "كائن Date القديم كائن قابل للتعديل المباشر في مكانه (Mutable)؛ فتعديل التاريخ في دالة يغير القيمة في كافة أجزاء البرنامج المشتركة معه في المرجع.",
      options: [
        "لأن كائن Date لا يدعم الأشهر بعد شهر مايو",
        "لأن كائن Date قابل للتعديل المباشر في مكانه مما يسبب آثاراً جانبية غير مقصودة على بقية الكود",
        "لأن سنة 2026 تتطلب تحديث المتصفح",
        "لأن دوال التاريخ القديمة أسرع من اللازم"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 22: الدوال والكائنات المتقدمة (107..112)
  {
    order: 107,
    title: "الدوال المتقدمة والإغلاقات المعجمية (Closures)",
    concept: "الإغلاق المعجمي (Closure) هو قدرة الدالة الداخلية على تذكر والوصول إلى المتغيرات الموجودة في نطاق دالتها الحاضنة الخارجية حتى بعد انتهاء تنفيذ الدالة الخارجية وإغلاق إطارها في الـ Call Stack.",
    whyUse: "يعد الأساس الهندسي لبناء المتغيرات الخاصة (Data Privacy)، وتصنيع الدوال المخصصة (Function Factories)، وتقنيات التقييم المؤجل (Currying).",
    browserMechanics: "يحتفظ محرك JavaScript بسجل البيئة المعجمية للدالة الأب في كومة الذاكرة (Heap) طالما بقيت الدالة الابنة محتفظة بمرجع يشير إليها، ولا يحذفها جامع القمامة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    breakdown: [
      "الدالة الحاضنة: تعرف المتغيرات المحلية وتنشئ بداخلها دالة فرعية.",
      "الدالة المغلفة: تحمل بداخلها 'إغلاقاً' يحتفظ بنسخة من بيئة المتغيرات المحيطة.",
      "حماية الحالة: لا يمكن لأي كود خارجي تعديل المتغير الداخلي إلا عبر الدوال الممنوحة."
    ],
    bugRepair: {
      brokenCode: "function makeCounter() {\n  let count = 0;\n  // نسي إرجاع الدالة الداخلية\n}\nlet c = makeCounter();\nc(); // TypeError",
      fixedCode: "function makeCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\nlet c = makeCounter();\nc();",
      question: "لماذا رمى الكود خطأ TypeError: c is not a function؟",
      explanation: "لإنشاء إغلاق معجمي (Closure)، يجب أن تعيد الدالة الخارجية الدالة الداخلية عبر أمر return لتتمكن من استدعائها لاحقاً.",
      options: [
        "لأن المتغير count يجب أن يكون ثابتاً const",
        "لأن الدالة الخارجية لم تقم بإرجاع الدالة الداخلية بـ return، فكانت قيمة c هي undefined",
        "لأن الإغلاقات المعجمية ممنوعة في JavaScript الحديثة",
        "لأن كلمة count محجوزة في لغة JavaScript"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 108,
    title: "الكائنات المتقدمة والنماذج الأولية (Prototypes & Inheritance)",
    concept: "تعتمد JavaScript على نظام الوراثة القائم على النماذج الأولية (Prototypal Inheritance)؛ فكل كائن يملك رابطاً داخلياً خفياً [[Prototype]] يشير إلى كائن آخر يرث منه الخصائص والدوال المشتركة.",
    whyUse: "يوفر كفاءة استثنائية في استهلاك الذاكرة؛ فبدلاً من إنشاء نسخة جديدة من دوال الكائن لكل مستخدم (1000 مستخدم = 1000 نسخة من الدالة)، تشترك كافة النسخ في دالة واحدة معلقة على النموذج الأولي.",
    browserMechanics: "عند قراءة خاصية obj.prop، يبحث المحرك في الكائن نفسه؛ فإذا لم يجدها يصعد عبر خاصية __proto__ إلى النموذج الأولي التالي حتى يصل إلى Object.prototype ثم null.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain",
    breakdown: [
      "خاصية prototype: الكائن المعلق على الدوال البنائية الذي ترث منه النسخ الجديدة دوالها.",
      "سلسلة الوراثة (Prototype Chain): مسار البحث التصاعدي عن الخصائص والدوال في الذاكرة.",
      "دالة Object.create(proto): تنشئ كائناً جديداً محدداً نموذجه الأولي بدقة."
    ],
    bugRepair: {
      brokenCode: "function User(name) {\n  this.name = name;\n  this.say = function() { ... }; // تكرار الدالة في كل نسخة في الذاكرة\n}",
      fixedCode: "function User(name) {\n  this.name = name;\n}\nUser.prototype.say = function() { ... }; // مشاركة الدالة في الذاكرة",
      question: "لماذا يُعتبر تعليق الدوال على User.prototype أفضل من كتابتها داخل جسم الدالة البنائية؟",
      explanation: "كتابة الدالة على prototype يجعل كافة النسخ تشترك في نسخة دالة واحدة في الذاكرة بدلاً من استنساخ دالة جديدة لكل كائن جديد.",
      options: [
        "لأن الدوال داخل الدالة البنائية لا يمكن تشغيلها",
        "لأن prototype يشارك دالة واحدة بين كافة النسخ ويوفر الذاكرة بشكل فائق",
        "لأن كلمة this محظورة داخل الدوال البنائية",
        "لأن JavaScript لا تدعم الدوال داخل الكائنات"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 109,
    title: "الأصناف البرمجية (Classes) والبرمجة كائنية التوجه",
    concept: "الأصناف Classes التي قُدمت في ES6 هي غلاف نحوي أنيق (Syntactic Sugar) فوق نظام النماذج الأولية لـ JavaScript؛ توفر صياغة مألوفة ومنظمة لإنشاء القوالب ودوال البناء constructor والوراثة عبر extends.",
    whyUse: "تنظم المشاريع البرمجية الكبيرة بأسلوب الكائنات (OOP)، وتجعل بناء الأنظمة المعقدة وإدارتها أمراً واضحاً ومقروءاً لكافة المطورين القادمين من مختلف لغات البرمجة.",
    browserMechanics: "يقوم محرك JavaScript بترجمة صنف class في النهاية إلى دالة بنائية ونموذج أولي prototype؛ مع ميزات أمان إضافية مثل إجبار استدعائها بـ new وتفعيل الوضع الصارم تلقائياً.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    breakdown: [
      "الكلمة المفتاحية class: تعلن عن صنف جديد يجمع الخصائص ودوال السلوك.",
      "دالة constructor: الدالة الخاصة التي تعمل تلقائياً لحظة إنشاء نسخة جديدة عبر new.",
      "الكلمة المفتاحية extends: تحقق وراثة صنف فرعي من صنف أب، مع استدعاء super()."
    ],
    bugRepair: {
      brokenCode: "class Admin extends User {\n  constructor(name, role) {\n    this.role = role; // خطأ: استخدام this قبل super\n    super(name);\n  }\n}",
      fixedCode: "class Admin extends User {\n  constructor(name, role) {\n    super(name); // يجب استدعاء super أولاً\n    this.role = role;\n  }\n}",
      question: "لماذا رمى المفسر خطأ ReferenceError: Must call super constructor before accessing 'this'؟",
      explanation: "في الأصناف المورثة، يجب دائماً استدعاء دالة الصنف الأب super() في السطر الأول من الباني قبل محاولة استخدام كلمة this.",
      options: [
        "لأن الصنف Admin لا يمكن أن يرث من User",
        "لأنه يجب استدعاء دالة الباني للأب super() أولاً لتهيئة سياق this قبل الوصول إليه",
        "لأن الدور role يجب أن يكون رقماً",
        "لأن الأصناف لا تدعم المعاملات المتعددة"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 110,
    title: "البرمجة غير المتزامنة وحلقة الأحداث (Async & Event Loop)",
    concept: "تنفذ JavaScript الأوامر على مسار خيطي أحادي (Single Threaded)، وتعتمد على 'حلقة الأحداث' (Event Loop) ومكدس الاستدعاءات وطوابير المهام للتعامل مع العمليات الطويلة (مثل الشبكة والمؤقتات) دون تجميد واجهة المستخدم.",
    whyUse: "تضمن بقاء صفحة الويب سلسة وتستجيب لنقر وتمرير المستخدم حتى أثناء تحميل ملفات ضخمة أو انتظار ردود قواعد البيانات في الخلفية.",
    browserMechanics: "تُسلم العمليات غير المتزامنة للمتصفح؛ وعند انتهائها توضع مهام الوعود (Promises) في طابور Microtask Queue وتوضع المؤقتات في Task Queue؛ وتفرغ حلقة Event Loop المهام فور فراغ Call Stack.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Async",
    breakdown: [
      "مكدس الاستدعاءات (Call Stack): ينفذ الأوامر الحالية سطراً بسطر بنظام LIFO.",
      "طابور المهام (Task Queue): يصطف فيه استدعاءات المؤقتات وأحداث واجهة المستخدم.",
      "حلقة الأحداث (Event Loop): الحارس الذي يراقب المكدس وينقل المهام من الطوابير عند فراغه."
    ],
    bugRepair: {
      brokenCode: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3'); // المبتدئ يتوقع 1 ثم 2 ثم 3",
      fixedCode: "// النتيجة الصحيحة هندسياً لحلقة الأحداث هي:\n// 1 ثم 3 ثم 2\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');",
      question: "لماذا طُبع الرقم 3 قبل الرقم 2 رغم أن مهلة المؤقت كانت صفراً (0ms)؟",
      explanation: "دالة setTimeout تُرسل مهمتها لطابور المهام (Task Queue)، وحلقة الأحداث لا تشغلها إلا بعد فراغ مكدس الاستدعاءات تماماً من الكود المتزامن 1 و 3.",
      options: [
        "لأن الرقم 2 عدد زوجي يؤجل تلقائياً",
        "لأن دالة setTimeout غير متزامنة وتنتظر فراغ مكدس الاستدعاءات المتزامن بالكامل قبل التنفيذ",
        "لأن رقم الصفر غير مسموح به في المؤقتات",
        "لأن console.log تعكس الترتيب"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 111,
    title: "الوحدات البرمجية القياسية (ES Modules: Import & Export)",
    concept: "الوحدات البرمجية ES Modules هي النظام المعياري الرسمي لتقسيم كود JavaScript إلى ملفات مستقلة؛ حيث يصدر الملف دواله ومتغيراته بـ export، ويستوردها ملف آخر بـ import.",
    whyUse: "تنهي فوضى تجميع كافة الأكواد في ملف ضخم واحد؛ مما يسهل صيانة المشاريع الكبيرة، ويعزل نطاق كل ملف، ويدعم تقنيات استبعاد الأكواد غير المستخدمة (Tree Shaking).",
    browserMechanics: "يعالج المتصفح وسوم <script type='module'> بشكل مؤجل (defer) افتراضياً، ويقوم بتحليل شجرة الاعتماديات وتحميل الملفات واستيرادها بالتوازي عبر الشبكة قبل بدء التشغيل.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    breakdown: [
      "أمر export default: تصدير العنصر الأساسي من الملف بدون أقواس.",
      "أمر export { a, b }: تصدير مسمى لعدة دوال أو ثوابت في نفس الملف.",
      "أمر import { a } from './file.js': استيراد الميزات المحددة حصراً للاستخدام في الملف الحالي."
    ],
    bugRepair: {
      brokenCode: "<script src='app.js'></script> // وبداخله كود import",
      fixedCode: "<script type='module' src='app.js'></script>",
      question: "لماذا رمى المتصفح خطأ SyntaxError: Cannot use import statement outside a module؟",
      explanation: "لاستخدام أوامر import و export في المتصفح، يجب إضافة الخاصية type='module' إلى وسم script ليعلم المتصفح أن الملف وحدة برمجية.",
      options: [
        "لأن المتصفحات لا تدعم الوحدات البرمجية إطلاقاً",
        "لأنه يجب إضافة الخاصية type='module' لوسم script لتفعيل دعم نظام الوحدات البرمجية",
        "لأن أسماء الملفات يجب أن تنتهي بصيغة .module",
        "لأن أوامر import مخصصة لبيئة Node.js فقط"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 112,
    title: "الكائنات الوكيلة والانعكاس (Proxy & Reflect)",
    concept: "كائن الوكيل Proxy يسمح باعتراض وتخصيص العمليات الأساسية التي تجرى على كائن ما (مثل قراءة خاصية، أو إسناد قيمة، أو استدعاء دالة) عبر فخاخ خاصة (Traps)، بينما يوفر كائن Reflect دوالاً لتمرير السلوك الافتراضي.",
    whyUse: "هو المحرك السري الأساسي لأطر العمل الحديثة (مثل نظام التفاعلية في Vue 3)؛ ويتيح التحقق التلقائي من صحة البيانات أثناء كتابتها، وتتبع التغييرات، وإنشاء واجهات افتراضية ذكية.",
    browserMechanics: "يلف كائن Proxy الكائن المستهدف بحاجز حماية في الذاكرة؛ وكل عملية وصول تمر أولاً بدالة المعالج (Handler Trap) قبل أن تصل إلى الكائن الحقيقي.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
    breakdown: [
      "الهدف (Target): الكائن الحقيقي الأصلي الذي نريد مراقبته والتحكم به.",
      "المعالج (Handler): كائن يحتوي على الفخاخ مثل get و set لاعتراض العمليات.",
      "فخ get(target, prop): يعمل تلقائياً عند محاولة أي كود قراءة خاصية من الكائن."
    ],
    bugRepair: {
      brokenCode: "let p = new Proxy(target); // بدون معالج",
      fixedCode: "let p = new Proxy(target, {}); // معالج فارغ كحد أدنى",
      question: "لماذا رمى مفسر JavaScript خطأ TypeError: Cannot create proxy with a non-object handler؟",
      explanation: "الدالة البنائية new Proxy تتطلب معاملين إجباريين دائماً: الكائن المستهدف target، وكائن المعالج handler حتى لو كان فارغاً {}.",
      options: [
        "لأن كائن Proxy يتطلب معاملاً واحداً فقط",
        "لأن إنشاء Proxy يتطلب تمرير كائن المعالج handler كمعامل ثانٍ إجباري",
        "لأن target يجب أن يكون مصفوفة",
        "لأن Proxy غير مدعومة في JavaScript"
      ],
      correctOptionIndex: 1
    }
  },

  // Skill 23: أدوات متقدمة للويب (113..118)
  {
    order: 113,
    title: "المصفوفات المحددة النوع (Typed Arrays) ومعالجة البايتات",
    concept: "المصفوفات محددة النوع Typed Arrays (مثل Uint8Array و Float32Array و ArrayBuffer) هي هياكل بيانات منخفضة المستوى تتيح لـ JavaScript التعامل المباشر مع مصفوفات بايتات خام في الذاكرة بأداء فائق وثابت.",
    whyUse: "تعد التقنية الأساسية لمعالجة ملفات الصوت والفيديو، والتعامل مع رسوميات WebGL الثلاثية الأبعاد، والاتصال عبر WebSockets، وتطبيقات WebAssembly.",
    browserMechanics: "تخصص كتلة ذاكرة خام متجاورة ومباشرة (ArrayBuffer) دون تعقيدات كائنات JS العادية، وتوفر واجهات مشاهدة (Views) لقراءة وكتابة البايتات بسرعة تتطابق مع لغات C و C++.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays",
    breakdown: [
      "كائن ArrayBuffer: يمثل قطعة الذاكرة الثابتة الخام بالبايت.",
      "واجهة Uint8Array: تعرض البايتات كأعداد صحيحة موجبة من 0 إلى 255.",
      "أداء فائق: خالية من كلفة الذاكرة الإضافية للكائنات العادية وتصل للبيانات فوراً."
    ],
    bugRepair: {
      brokenCode: "let buf = new ArrayBuffer(16);\nbuf[0] = 255; // خطأ: لا يمكن التعديل المباشر على Buffer خام",
      fixedCode: "let buf = new ArrayBuffer(16);\nlet view = new Uint8Array(buf);\nview[0] = 255;",
      question: "لماذا لم تنجح محاولة كتابة البايت مباشرة داخل كائن ArrayBuffer؟",
      explanation: "كائن ArrayBuffer يمثل مساحة ذاكرة خام مجردة؛ للتعامل معها وكتابة البيانات يجب استخدام واجهة مشاهدة مثل Uint8Array(buf).",
      options: [
        "لأن الرقم 255 أكبر من سعة الذاكرة",
        "لأن ArrayBuffer ذاكرة خام لا تعدل مباشرة ويجب استخدام واجهة مثل Uint8Array للكتابة بداخلها",
        "لأن حجم 16 بايت صغير جداً",
        "لأن الذاكرة محجوزة لنظام التشغيل"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 114,
    title: "التنقل المتقدم في شجرة المستند (DOM Navigation)",
    concept: "التنقل في شجرة DOM يعني التحرك بين العقد والعناصر بناءً على علاقاتها الهرمية الأسرية: العناصر الأب (parentElement)، الأبناء (children)، والإخوة المجاورون (nextElementSibling, previousElementSibling).",
    whyUse: "يتيح استهداف العناصر النسبية ديناميكياً؛ مثل تلوين الصف الحالي في الجدول عند النقر على زره، أو إغلاق القائمة المنسدلة الحاضنة للرابط.",
    browserMechanics: "يحتفظ كل كائن Node بمؤشرات ربط مباشرة (C++ pointers) تشير لعقدته الأب وإخوته في شجرة DOM، مما يجعل التنقل بينها فورياً دون الحاجة لإعادة البحث في الصفحة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Node",
    breakdown: [
      "خاصية parentElement: تصعد للعنصر الحاضن المباشر في الشجرة.",
      "خاصية children: تعيد قائمة بكافة العناصر الأبناء الحقيقيين فقط دون العقد النصية.",
      "خاصية nextElementSibling: تنتقل مباشرة للعنصر الأخ التالي على نفس المستوى الهرمي."
    ],
    bugRepair: {
      brokenCode: "let child = document.querySelector('.item');\nlet parent = child.parent; // خطأ في اسم الخاصية",
      fixedCode: "let child = document.querySelector('.item');\nlet parent = child.parentElement;",
      question: "لماذا أعادت child.parent القيمة undefined؟",
      explanation: "الخاصية القياسية في DOM للوصول للعنصر الأب المباشر هي parentElement أو parentNode، ولا توجد خاصية باسم parent.",
      options: [
        "لأن العنصر item لا يملك عنصراً أباً",
        "لأن الخاصية القياسية للوصول للأب هي parentElement وليس parent",
        "لأن الكائن child غير موجود في الصفحة",
        "لأن التنقل للأعلى ممنوع في شجرة DOM"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 115,
    title: "الرسوميات والوسائط (Graphics: Canvas & SVG)",
    concept: "تتيح JavaScript الرسم التفاعلي على الويب عبر مساقين: عنصر <canvas> للرسم البكسلي ثنائي وثلاثي الأبعاد عبر لغة الشفرات، ورسوميات المتجهات القابلة للتوسيع SVG التي تعتمد على عناصر DOM دلالية ورياضية.",
    whyUse: "تعد أساس بناء ألعاب المتصفح، والمخططات البيانية التفاعلية (Charts)، ومحررات الصور، وتأثيرات الواجهات البصرية المبتكرة.",
    browserMechanics: "عنصر Canvas يوفر سياق رسم مباشر (2D Context أو WebGL) يرسم البكسلات مباشرة على شاشات كرت الشاشة (GPU Accelerated) دون إنشاء شجرة عناصر ثقيلة.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
    breakdown: [
      "دالة canvas.getContext('2d'): تستخرج أداة الرسم ثنائية الأبعاد لعنصر اللوحة.",
      "دالة ctx.fillRect(x, y, w, h): ترسم مستطيلاً مصمتاً بالأبعاد والموقع المحدد.",
      "دالة requestAnimationFrame: المزامنة الفائقة مع تردد تحديث شاشة العرض (60Hz/120Hz)."
    ],
    bugRepair: {
      brokenCode: "let cvs = document.querySelector('canvas');\nlet ctx = cvs.context('2d');",
      fixedCode: "let cvs = document.querySelector('canvas');\nlet ctx = cvs.getContext('2d');",
      question: "لماذا رمى المفسر خطأ TypeError: cvs.context is not a function؟",
      explanation: "الدالة القياسية في عنصر Canvas لاستخراج أداة وسياق الرسم هي getContext('2d') وليست context().",
      options: [
        "لأن عنصر اللوحة canvas لا يدعم الرسم ثنائي الأبعاد",
        "لأن اسم الدالة القياسي لاستخراج سياق الرسم هو getContext('2d') وليس context()",
        "لأن الرسوميات تتطلب مكتبة خارجية",
        "لأن canvas يجب أن يُكتب داخل وسم svg"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 116,
    title: "تقنية AJAX الكلاسيكية وكائن XMLHttpRequest",
    concept: "تقنية AJAX (Asynchronous JavaScript and XML) هي التقنية التاريخية التي أطلقت ثورة الويب التفاعلي؛ تتيح تبادل البيانات مع الخادم وتحديث أجزاء من الصفحة في الخلفية عبر كائن XMLHttpRequest التقليدي.",
    whyUse: "فهم AJAX و XMLHttpRequest أساسي لصيانة التطبيقات والأنظمة القائمة الكبيرة (Legacy Systems) التي بُنيت قبل ظهور واجهة fetch الحديثة.",
    browserMechanics: "يعتمد XMLHttpRequest على نظام مراقبة الأحداث وحالات الطلب (readyState من 0 إلى 4)؛ وعند وصول الحالة 4 ورمز النجاح 200 يطلق حدث onreadystatechange.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest",
    breakdown: [
      "كائن new XMLHttpRequest(): منشئ الطلب الشبكي الكلاسيكي في المتصفح.",
      "دالة xhr.open('GET', url): تجهز نوع الطلب ورابط الوجهة المستهدفة.",
      "دالة xhr.send(): ترسل الطلب الشبكي وتبدأ الاستماع للردود."
    ],
    bugRepair: {
      brokenCode: "let xhr = new XMLHttpRequest();\nxhr.open('GET', '/api');\n// نسي إرسال الطلب\nconsole.log(xhr.responseText);",
      fixedCode: "let xhr = new XMLHttpRequest();\nxhr.open('GET', '/api');\nxhr.onload = () => console.log(xhr.responseText);\nxhr.send();",
      question: "لماذا لم تصل أي بيانات من الخادم وظل نص الاستجابة فارغاً؟",
      explanation: "دالة open تجهز الطلب فقط؛ لبدء الاتصال بالخادم يجب استدعاء دالة xhr.send() والاستماع لاكتمال التحميل بـ onload.",
      options: [
        "لأن الرابط /api محظور في المتصفح",
        "لأنه يجب استدعاء xhr.send() لإرسال الطلب فعلياً مع انتظار الرد عبر حدث onload",
        "لأن كائن XMLHttpRequest لم يعد مدعوماً",
        "لأن البيانات يجب أن تكون بصيغة XML حصراً"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 117,
    title: "مكتبة jQuery ودورها التاريخي في تطور الويب",
    concept: "مكتبة jQuery هي المكتبة الأكثر شهرة في تاريخ JavaScript؛ ظهرت بشعار 'Write Less, Do More' لتوحيد الفروق بين المتصفحات القديمة وتقديم صياغة موجزة عبر محدد الدولار $ والتأثيرات الحركية الجاهزة.",
    whyUse: "رغم أن JavaScript الحديثة استوعبت كافة ميزاتها ولم تعد هناك حاجة لـ jQuery في المشاريع الجديدة، إلا أن فهمها ضروري لفهم وتحديث ملايين المواقع القائمة على شبكة الإنترنت.",
    browserMechanics: "تغلف jQuery عناصر DOM الحقيقية بكائن غلاف متخصص (jQuery Wrapper) يطبق أسلوب تسلسل الدوال (Method Chaining) ويتولى حل مشاكل توافقية المتصفحات خلف الكواليس.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Glossary/jQuery",
    breakdown: [
      "معامل المحدد $('selector'): يطابق عناصر الصفحة بأسلوب شبيه بـ querySelectorAll.",
      "تسلسل الدوال (Chaining): كتابة $('#box').hide().fadeIn() لتنفيذ عدة إجراءات متتالية.",
      "التوافقية التاريخية: حلت مشاكل إصدارات IE القديمة ومهدت الطريق لمعايير HTML5 الحالية."
    ],
    bugRepair: {
      brokenCode: "// محاولة استخدام دالة jQuery بدون استدعاء المكتبة\n$('#btn').hide(); // ReferenceError: $ is not defined",
      fixedCode: "// الصياغة المعيارية الحديثة المكافئة في JavaScript النقية\ndocument.querySelector('#btn').style.display = 'none';",
      question: "لماذا رمى الكود خطأ ReferenceError: $ is not defined؟",
      explanation: "الرمز $ ليس جزءاً مدمجاً في المتصفح بل يتبع لمكتبة jQuery؛ وفي المتصفحات الحديثة يُستغنى عنه بـ document.querySelector.",
      options: [
        "لأن علامة الدولار غير مسموحة في المتغيرات",
        "لأن الرمز $ يتبع لمكتبة jQuery غير المضمنة، والصواب استخدام JavaScript القياسية querySelector",
        "لأن إخفاء العناصر يتطلب خاصية visibility فقط",
        "لأن المعرف btn محجوز في المتصفح"
      ],
      correctOptionIndex: 1
    }
  },
  {
    order: 118,
    title: "تقنية JSONP وتجاوز قيود النطاقات المتقاطعة القديمة",
    concept: "تقنية JSONP (JSON with Padding) هي حيلة برمجية تاريخية ذكية استخدمت لتجاوز سياسة النطاق الأصلي المشترك (Same-Origin Policy) قبل ظهور معيار CORS، عبر استغلال حقيقة أن وسوم <script> تستطيع جلب ملفات من أي نطاق خارجي دون قيود أمنية.",
    whyUse: "تعد درساً معمارياً ملهماً في تاريخ أمن الويب؛ وفهمها يوضح للمطور سبب إنشاء معيار CORS الحديث وكيف تطورت آليات مشاركة الموارد الآمنة.",
    browserMechanics: "ينشئ السكربت وسم <script src='api?callback=handleData'>؛ فيرد الخادم بملف يحتوي على استدعاء للدالة handleData(json)، فيقوم المتصفح بتشغيل الدالة فور تحميل السكربت.",
    docUrl: "https://developer.mozilla.org/en-US/docs/Glossary/CORS",
    breakdown: [
      "وسم script كوسيلة نقل: استغلال استثناء الوسوم الخارجية لتجاوز حظر المتصفح القديم.",
      "دالة النداء التلقائي (Callback Wrapper): الخادم يغلف بيانات JSON داخل استدعاء دالة.",
      "البديل المعاصر (CORS): المعيار الرسمي الآمن المعتمد اليوم عبر ترويسات Access-Control-Allow-Origin."
    ],
    bugRepair: {
      brokenCode: "// محاولة جلب بيانات بنمط JSONP غير آمن قديماً\n// والبديل الآمن الحديث باستخدام Fetch مع ترويسات CORS القياسية\nlet url = 'https://api.test/data?callback=fn';",
      fixedCode: "// استخدام معيار CORS الرسمي مع Fetch API\nfetch('https://api.test/data', { mode: 'cors' })\n  .then(res => res.json());",
      question: "لماذا استبدل عالم الويب تقنية JSONP بمعيار CORS الرسمي الحديث؟",
      explanation: "تقنية JSONP غير آمنة لأنها تنفذ أكواداً برمجية مجهولة في صفحة المستخدم (مخاطر XSS) وتدعم GET فقط، بينما معيار CORS آمن ومحكم ويدعم كافة طرق HTTP.",
      options: [
        "لأن JSONP لا تدعم نقل الأرقام",
        "لأن JSONP تشكل ثغرة أمنية تسمح بتنفيذ أكواد عشوائية، بينما CORS هو المعيار الآمن والمحكم دولياً",
        "لأن وسوم script لم تعد تعمل في HTML5",
        "لأن الخوادم توقفت عن دعم تبادل البيانات"
      ],
      correctOptionIndex: 1
    }
  }
];

function build() {
  console.log("Authoring Skills 20..23 (Lessons 99..118)...");
  const lessons = skillData.map(meta => createLesson(meta));

  // Chunk 20: Skill 20 (99..102)
  const chunk20 = lessons.slice(0, 4);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_20_dom_events.json"), JSON.stringify(chunk20, null, 2), "utf8");

  // Chunk 21: Skill 21 (103..106)
  const chunk21 = lessons.slice(4, 8);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_21_browser_apis.json"), JSON.stringify(chunk21, null, 2), "utf8");

  // Chunk 22: Skill 22 (107..112)
  const chunk22 = lessons.slice(8, 14);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_22_advanced_objects_async.json"), JSON.stringify(chunk22, null, 2), "utf8");

  // Chunk 23: Skill 23 (113..118)
  const chunk23 = lessons.slice(14, 20);
  fs.writeFileSync(path.join(OUTPUT_DIR, "skill_23_advanced_web_tools.json"), JSON.stringify(chunk23, null, 2), "utf8");

  console.log("✔ Skills 20..23 authored and verified successfully! Total lessons:", lessons.length);
  return lessons;
}

if (require.main === module) {
  build();
}

module.exports = { build, skillData };

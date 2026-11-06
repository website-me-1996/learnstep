window.LESSONS_DATA = {
  html: [ 
    "HTML Introduction","HTML Editors","HTML Basic","HTML Elements","HTML Attributes","HTML Headings",
    "HTML Paragraphs","HTML Styles","HTML Formatting","HTML Quotations","HTML Comments","HTML Colors",
    "HTML CSS","HTML Links","HTML Link Colors","HTML Link Bookmarks","HTML Images","HTML Favicon","HTML Page Title","HTML Tables","HTML Lists",
    "HTML Block & Inline","HTML Div","HTML Classes","HTML Id","HTML Buttons","HTML Iframes","HTML JavaScript",
    "HTML File Paths","HTML Head","HTML Layout","HTML Responsive","HTML Computer Code","HTML Semantics",
    "HTML Style Guide","HTML Entities","HTML Symbols","HTML Emojis","HTML Charset","HTML URL Encode",
    "HTML vs. XHTML","HTML Forms","HTML Form Attributes","HTML Form Elements","HTML Input Types",
    "HTML Input Attributes","HTML Input Form Attributes","HTML Canvas","HTML SVG","HTML Media",
    "HTML Video","HTML Audio","HTML Plug-ins","HTML YouTube"
  ],
  css: [ 
    "CSS Introduction","CSS Syntax","CSS Selectors","CSS How To","CSS Comments","CSS Errors","CSS Colors",
    "CSS Backgrounds","CSS Borders","CSS Margins","CSS Padding","CSS Height / Width","CSS Box Model","CSS Outline",
    "CSS Text","CSS Fonts","CSS Icons","CSS Links","CSS Lists","CSS Tables","CSS Display","CSS Max-width",
    "CSS Position","CSS Position Offsets","CSS Z-index","CSS Overflow","CSS Float","CSS Inline-block","CSS Align",
    "CSS Combinators","CSS Pseudo-classes","CSS Pseudo-elements","CSS Opacity","CSS Navigation Bars","CSS Dropdowns",
    "CSS Image Gallery","CSS Image Sprites","CSS Attribute Selectors","CSS Forms","CSS Counters","CSS Units",
    "CSS Inheritance","CSS Specificity","CSS !important","CSS Math Functions","CSS Optimization","CSS Accessibility",
    "CSS Website Layout","CSS Advanced: Rounded Corners","CSS Border Images","CSS Multiple Backgrounds","CSS Advanced Colors",
    "CSS Gradients","CSS Shadows","CSS Text Effects","CSS Custom Fonts","CSS 2D Transforms","CSS 3D Transforms",
    "CSS Transitions","CSS Animations","CSS Tooltips","CSS Image Styling","CSS Image Modal","CSS Image Centering",
    "CSS Image Filters","CSS Image Shapes","CSS object-fit","CSS object-position","CSS Masking","CSS Buttons",
    "CSS Pagination","CSS Multiple Columns","CSS User Interface","CSS Variables","CSS @property","CSS Box Sizing",
    "CSS Functions","CSS Media Queries","CSS Flexbox Intro","CSS Flex Container","CSS Flex Items","CSS Flex Responsive",
    "CSS Grid Intro","CSS Grid Container","CSS Grid Items","CSS Grid 12-column Layout","CSS @supports",
    "CSS Responsive Intro","CSS Responsive Viewport","CSS Responsive Grid View","CSS Responsive Media Queries",
    "CSS Responsive Images","CSS Responsive Videos","CSS Responsive Frameworks / Templates"
  ],
  js: [ 
    "JS Introduction","JS Where To","JS Output","JS Syntax","JS Statements","JS Comments","JS Variables","JS Let",
    "JS Const","JS Types","JS Operators","JS Arithmetic","JS Assignment","JS Comparisons","JS Conditional",
    "JS If Conditions","JS If / Else","JS Ternary","JS Switch","JS Booleans","JS Logical","JS Loops","JS for Loop",
    "JS while Loop","JS Break","JS Continue","JS Control Flow","JS Strings","JS String Templates","JS String Methods",
    "JS String Search","JS Numbers","JS Number Methods","JS Number Properties","JS Bitwise","JS BigInt","JS Functions",
    "JS Function Invocation","JS Parameters","JS Return Values","JS Arguments","JS Function Expressions","JS Arrow Functions",
    "JS Timers","JS Objects","JS Object Properties","JS Object Methods","JS this","JS Object Display","JS Constructors",
    "JS Scope","JS Code Blocks","JS Hoisting","JS var / let / const","JS Strict Mode","JS Dates","JS Date Formats",
    "JS Date Get","JS Date Set","JS Date Methods","JS Arrays","JS Array Constructor","JS Array Methods","JS Array Search",
    "JS Array Sort","JS Array Iterations","JS Array const","JS Sets","JS Set Methods","JS Set Logic","JS WeakSet",
    "JS Maps","JS Map Methods","JS WeakMap","JS Iterations","JS Iterables","JS Iterators","JS Generators","JS Math",
    "JS Math Random","JS RegExp","JS Data Types","JS Primitive Data","JS Object Types","JS Symbols","JS typeof",
    "JS undefined / NaN","JS Type Coercion","JS Type Conversion","JS Destructuring","JS Errors","JS Debugging",
    "JS Style Guide","JS Best Practices","JS Mistakes","JS Performance","JS Reference","JS Projects","JS Versions",
    "JS HTML DOM","JS HTML Events","JS HTML First","JS Window API","JS Fetch API","JS JSON","JS Web API",
    "JS Temporal","JS Advanced Functions","JS Advanced Objects","JS Classes","JS Asynchronous JavaScript","JS Modules",
    "JS Meta & Proxy","JS Typed Arrays","JS DOM Navigation","JS Graphics","JS AJAX","JS jQuery","JS JSONP"
  ],
  guides: {
    html: {
      "HTML Introduction": {
        reference: "https://www.w3schools.com/html/html_intro.asp",
        concept: "HTML يصف بنية الصفحة ومعنى أجزائها. المتصفح يقرأ العناصر ويرسم المحتوى؛ الوسوم نفسها لا تظهر للزائر.",
        flow: "ملف HTML ⟶ عناصر مرتّبة ⟶ المتصفح يعرض المحتوى",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحة التجربة</title>\n</head>\n<body>\n  <h1>عنوان الصفحة</h1>\n  <p>هذه أول فقرة.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<!DOCTYPE html>", meaning: "يخبر المتصفح أن المستند يستخدم HTML الحديث." },
          { code: "<html> ... </html>", meaning: "العنصر الجذر الذي يحتوي مستند الصفحة كله." },
          { code: "<head>", meaning: "معلومات وإعدادات عن الصفحة، لا محتواها الرئيسي الظاهر." },
          { code: "<body>", meaning: "المكان الذي يحتوي المحتوى الذي يراه زائر الصفحة." },
          { code: "<h1>" , meaning: "عنوان رئيسي، و<p> فقرة نصية؛ لكل عنصر معنى يصف دوره." }
        ],
        steps: [
          { title: "ابدأ من معلومات الصفحة", explanation: "العنصر <title> يحدد الاسم الذي يظهر في لسان المتصفح. لا تخلطه مع العنوان <h1> الذي يظهر داخل الصفحة.", from: "<title>صفحة التجربة</title>", to: "<title>صفحتي الأولى</title>", task: "غيّر اسم الصفحة داخل <title> إلى «صفحتي الأولى»، ثم شغّل ولاحظ اسم الصفحة في المثال." },
          { title: "أضف عنوانًا يراه الزائر", explanation: "كل ما بداخل <body> محتوى الصفحة. الوسم <h1> يعرّف العنوان الرئيسي، والنص بين الوسمين هو المحتوى.", from: "<h1>عنوان الصفحة</h1>", to: "<h1>أول صفحة أكتبها</h1>", task: "غيّر نص <h1> إلى «أول صفحة أكتبها». اترك وسمَي البداية والنهاية كما هما وشغّل." },
          { title: "ضع فكرة في فقرة", explanation: "وسم <p> يحيط بفقرة. يبدأ المتصفح الفقرة في سطر مستقل ويضيف حولها مسافة افتراضية.", from: "<p>هذه أول فقرة.</p>", to: "<p>أنا أتعلم كيف يعرض المتصفح المحتوى.</p>", task: "استبدل جملة الفقرة بجملة تصف ما تتعلمه، ثم شغّل لتشاهد العنوان والفقرة معًا." }
        ]
      },
      "HTML Editors": {
        reference: "https://www.w3schools.com/html/html_editors.asp",
        concept: "المحرر مكان كتابة الملف، والمتصفح يعرض نتيجته. دورة العمل بسيطة: اكتب أو عدّل، احفظ، ثم افتح أو حدّث المعاينة.",
        flow: "اكتب HTML ⟶ احفظ باسم ينتهي بـ .html ⟶ افتح النتيجة في المتصفح",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>تجربتي في المحرر</title>\n</head>\n<body>\n  <h1>تجربة صغيرة</h1>\n  <p>أكتب، أحفظ، ثم ألاحظ.</p>\n</body>\n</html>",
        breakdown: [
          { code: "index.html", meaning: "امتداد .html يجعل الملف مستند صفحة يستطيع المتصفح فتحه." },
          { code: "المحرر", meaning: "يغيّر النص البرمجي، ولا يعرض شكل الصفحة بنفسه." },
          { code: "المتصفح", meaning: "يقرأ الملف ويعرض النتيجة؛ بعد تعديل الملف حدّث الصفحة لرؤية التغيير." }
        ],
        steps: [
          { title: "ميّز الملف عن عنوان الصفحة", explanation: "اسم الملف index.html يصف ملفًا على جهازك. أما <title> فيحدد الاسم الذي يظهر في لسان المتصفح.", from: "<title>تجربتي في المحرر</title>", to: "<title>ملف HTML الأول</title>", task: "غيّر النص داخل <title> إلى «ملف HTML الأول»، ثم شغّل المثال." },
          { title: "عدّل واحفظ ثم راجع", explanation: "في محرر عادي تحفظ الملف بعد التعديل ثم تحدّث المتصفح. هنا نحفظ مسودة المحرر على جهازك تلقائيًا، وزر التشغيل يعيد بناء المعاينة.", from: "<h1>تجربة صغيرة</h1>", to: "<h1>أكتب وأجرّب</h1>", task: "غيّر العنوان واضغط «شغّل الكود». قارن النتيجة الجديدة بالعنوان السابق." },
          { title: "احفظ الملف باسم واضح", explanation: "عند العمل خارج هذا المحرر، احفظ الصفحة بامتداد .html مثل index.html. لا تحفظها باسم ينتهي بـ .txt إذا أردت فتحها كصفحة.", from: "<p>أكتب، أحفظ، ثم ألاحظ.</p>", to: "<p>عدّلت الملف وشاهدت النتيجة.</p>", task: "بدّل الفقرة بجملة تصف دورة التجربة، ثم شغّلها لترى أثر الحفظ والتحديث داخل المحرر." }
        ]
      },
      "HTML Basic": {
        reference: "https://www.w3schools.com/html/html_basic.asp",
        concept: "مستند HTML يبدأ بتعريف نوعه، ثم جذر html، ومعلومات داخل head، ومحتوى مرئي داخل body.",
        flow: "DOCTYPE ⟶ html ⟶ head للمعلومات + body للمحتوى الظاهر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>أساسيات صفحتي</title>\n</head>\n<body>\n  <h1>مرحبًا في صفحتي</h1>\n  <p>هذه فقرة داخل جسم الصفحة.</p>\n  <a href=\"#more\">انتقل إلى التفاصيل</a>\n  <p id=\"more\">هنا تظهر التفاصيل.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<!DOCTYPE html>", meaning: "يأتي مرة واحدة في أول المستند قبل العناصر." },
          { code: "<head>", meaning: "يحوي عنوان اللسان وترميز الحروف وإعدادات الصفحة." },
          { code: "<body>", meaning: "يحوي العناوين والفقرات والروابط والصور الظاهرة." },
          { code: "<a href=\"#more\">", meaning: "رابط يقفز إلى العنصر الذي يحمل id=\"more\"." }
        ],
        steps: [
          { title: "حدّد اسم لسان المتصفح", explanation: "اكتب اسم الصفحة داخل <title> في <head>. هذا الاسم لا يظهر داخل جسم الصفحة.", from: "<title>أساسيات صفحتي</title>", to: "<title>دليل الحديقة</title>", task: "غيّر عنوان اللسان إلى «دليل الحديقة»، ثم شغّل ولاحظ الفرق بينه وبين عنوان الصفحة." },
          { title: "ضع المحتوى الظاهر في body", explanation: "العنوان والفقرة والرابط موجودة داخل <body>. لا تنقل <title> إلى هنا؛ لكل جزء مكانه.", from: "<h1>مرحبًا في صفحتي</h1>", to: "<h1>جولة في الحديقة</h1>", task: "بدّل نص العنوان داخل body إلى «جولة في الحديقة»، واترك بنية المستند حوله كما هي." },
          { title: "اربط الرابط بمكان داخل الصفحة", explanation: "قيمة href التي تبدأ بـ # تشير إلى id داخل المستند. هنا #more تقابل id=\"more\".", from: "href=\"#more\"", to: "href=\"#visit\"", task: "غيّر وجهة الرابط إلى #visit ثم شغّل. راقب أن الوجهة لا تعمل حتى تطابقها معرّفًا." }
        ]
      },
      "HTML Elements": {
        reference: "https://www.w3schools.com/html/html_elements.asp",
        concept: "العنصر عادةً يبدأ بوسم بداية، ثم محتوى، ثم وسم نهاية يحمل الاسم نفسه. بعض العناصر الفارغة مثل br ليس لها محتوى أو وسم نهاية.",
        flow: "وسم بداية ⟶ محتوى ⟶ وسم نهاية مطابقة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>عناصر HTML</title>\n</head>\n<body>\n  <h1>عنوان التجربة</h1>\n  <p>أتعلم تركيب العنصر.</p>\n  <p>سطر أول<br>وسطر ثان داخل الفقرة.</p>\n  <p>عنصر متداخل: <strong>نص مهم</strong>.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<p>نص</p>", meaning: "الوسم p يحدد البداية والنهاية، والنص في المنتصف هو المحتوى." },
          { code: "<strong>داخل <p>", meaning: "العناصر يمكن أن تحتوي عناصر أخرى؛ نغلق العنصر الداخلي قبل الخارجي." },
          { code: "<br>", meaning: "عنصر فارغ يضيف سطرًا جديدًا ولا يحتاج إلى </br>." },
          { code: "<h1> ... </h1>", meaning: "اسم وسم البداية والنهاية واحد، مع / في وسم النهاية." }
        ],
        steps: [
          { title: "غيّر المحتوى واترك الوسمين", explanation: "في <p>أتعلم تركيب العنصر.</p>، وسم البداية هو <p>، والمحتوى جملة، ووسم النهاية هو </p>.", from: "<p>أتعلم تركيب العنصر.</p>", to: "<p>العنصر يجمع وسمًا ومحتوى.</p>", task: "غيّر الجملة داخل الفقرة فقط، ثم شغّل. حافظ على وسمَي البداية والنهاية." },
          { title: "طابق اسم الوسمين", explanation: "وسم النهاية يجب أن يطابق وسم البداية. غيّر h1 إلى h2 في الطرفين حتى يبقى العنصر صحيحًا.", from: "<h1>عنوان التجربة</h1>", to: "<h2>عنوان التجربة</h2>", task: "حوّل العنوان إلى h2 بتغيير اسم الوسم في البداية والنهاية معًا، ثم شغّل ولاحظ مستواه." },
          { title: "ضع عنصرًا داخل عنصر", explanation: "العنصر <strong> متداخل داخل p. أغلق strong قبل إغلاق الفقرة حتى لا تتداخل النهايات بترتيب خاطئ.", from: "<strong>نص مهم</strong>", to: "<strong>فكرة أساسية</strong>", task: "بدّل محتوى strong إلى «فكرة أساسية». شغّل وتابع أن التنسيق يخص الجزء المحدد داخل الفقرة." }
        ]
      },
      "HTML Attributes": {
        reference: "https://www.w3schools.com/html/html_attributes.asp",
        concept: "الخاصية تضيف معلومة إلى عنصر HTML. نكتبها في وسم البداية على شكل اسم=قيمة، ونضع القيمة بين علامتي اقتباس.",
        flow: "وسم البداية ⟶ اسم الخاصية=\"القيمة\" ⟶ المتصفح يستخدم المعلومة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>خصائص العناصر</title>\n</head>\n<body>\n  <h1 title=\"عنوان الصفحة\">خصائص HTML</h1>\n  <p><a href=\"#about\" title=\"اقرأ التعريف\">اذهب إلى التعريف</a></p>\n  <p id=\"about\">href يحدد الوجهة، وtitle يضيف معلومة تظهر عند الإشارة.</p>\n</body>\n</html>",
        breakdown: [
          { code: "href=\"#about\"", meaning: "href اسم الخاصية، و#about القيمة التي تحدد وجهة الرابط." },
          { code: "title=\"...\"", meaning: "قيمة إضافية تظهر كتلميح عند تمرير المؤشر على العنصر." },
          { code: "id=\"about\"", meaning: "اسم يميز عنصرًا في الصفحة ويمكن للرابط الوصول إليه." },
          { code: "lang=\"ar\"", meaning: "يعلن لغة محتوى الصفحة للمتصفح وأدوات المساعدة." }
        ],
        steps: [
          { title: "غيّر قيمة الخاصية لا اسمها", explanation: "href هي اسم الخاصية التي تحدد الوجهة. غيّر القيمة داخل الاقتباس إلى معرّف موجود في الصفحة.", from: "href=\"#about\"", to: "href=\"#details\"", task: "غيّر وجهة الرابط إلى #details ثم شغّل. راقب أن الرابط يحتاج معرّفًا مطابقًا في الصفحة." },
          { title: "اربط الوجهة بمعرّف", explanation: "القيمة #details تشير إلى عنصر يحمل id=\"details\". الرابط والمعرّف يستخدمان الاسم نفسه، من دون # داخل id.", from: "id=\"about\"", to: "id=\"details\"", task: "غيّر id للفقرة إلى details، ثم جرّب الرابط. الآن تطابق قيمة href مع المعرّف." },
          { title: "انتبه لمكان الخاصية", explanation: "تكتب الخاصية داخل وسم البداية، قبل علامة >. وضعها في النص بين الوسمين يحولها إلى نص ظاهر بدل إعداد.", from: "<h1 title=\"عنوان الصفحة\">", to: "<h1 title=\"العنوان الرئيسي\">", task: "بدّل وصف title للعنوان إلى «العنوان الرئيسي»، واترك الخاصية داخل وسم البداية." }
        ]
      },
      "HTML Headings": {
        reference: "https://www.w3schools.com/html/html_headings.asp",
        concept: "العناوين من h1 إلى h6 تصف تسلسل الأقسام. h1 هو المستوى الرئيسي، ثم h2 للقسم، وh3 لقسم فرعي؛ لا تختَرها لمجرد حجم الخط.",
        flow: "h1 عنوان الصفحة ⟶ h2 قسم ⟶ h3 تفصيل داخل القسم",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>دليل هواياتي</title>\n</head>\n<body>\n  <h1>هواياتي</h1>\n  <h2>التصوير</h2>\n  <h3>تصوير الطبيعة</h3>\n  <p>ألتقط صورًا للأماكن الهادئة.</p>\n  <h2>القراءة</h2>\n</body>\n</html>",
        breakdown: [
          { code: "<h1>", meaning: "العنوان الأهم الذي يصف موضوع الصفحة." },
          { code: "<h2>", meaning: "عنوان قسم رئيسي داخل الموضوع." },
          { code: "<h3>", meaning: "عنوان فرعي يندرج تحت القسم السابق." },
          { code: "h1 ... h6", meaning: "ست درجات للهيكل؛ استخدمها للترتيب، والتنسيق البصري يُضبط لاحقًا بـ CSS." }
        ],
        steps: [
          { title: "سمّ موضوع الصفحة", explanation: "استخدم h1 للموضوع الرئيسي مرة واحدة في هذا المثال، ثم ضع الأقسام التابعة له في مستويات أدنى.", from: "<h1>هواياتي</h1>", to: "<h1>أشياء أحبها</h1>", task: "غيّر نص h1 إلى موضوع الصفحة الذي تختاره، ثم شغّل وراجع أنه يسبق الأقسام." },
          { title: "أنشئ مستوى قسم", explanation: "العنوان التصوير h2 قسم تحت الموضوع العام؛ لا تجعله h1 ثانيًا لمجرد أنك تريد خطًا كبيرًا.", from: "<h2>التصوير</h2>", to: "<h2>رحلاتي</h2>", task: "استبدل اسم القسم بـ«رحلاتي»، ثم شغّل ولاحظ بقاء ترتيبه تحت h1." },
          { title: "اجعل التفصيل تابعًا للقسم", explanation: "تصوير الطبيعة تفصيل داخل قسم التصوير، لذلك يأتي بعده بمستوى أدنى وهو h3.", from: "<h3>تصوير الطبيعة</h3>", to: "<h3>زيارة الحديقة</h3>", task: "غيّر التفصيل إلى «زيارة الحديقة». حافظ على h3 لأنه جزء من القسم وليس عنوان الصفحة." }
        ]
      },
      "HTML Paragraphs": {
        reference: "https://www.w3schools.com/html/html_paragraphs.asp",
        concept: "p يضع فكرة في فقرة منفصلة. المتصفح يختار التفاف السطر حسب مساحة الشاشة، ويختصر المسافات والأسطر الزائدة في ملف HTML.",
        flow: "p ⟶ فكرة واحدة ⟶ فقرة جديدة؛ br ⟶ سطر جديد داخل الفقرة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>ملاحظات يومية</title>\n</head>\n<body>\n  <h1>ملاحظات يومية</h1>\n  <p>بدأت يومي بقراءة فصل قصير.</p>\n  <p>بعدها خرجت للمشي في الحديقة.</p>\n  <p>خطة الغد:<br>أكتب فكرة جديدة<br>وأراجع ما تعلمته.</p>\n  <hr>\n  <pre>سطر أول\n  سطر تحته مسافتان</pre>\n</body>\n</html>",
        breakdown: [
          { code: "<p>... </p>", meaning: "كل فقرة كتلة نصية مستقلة، والمتصفح يضيف مسافات افتراضية حولها." },
          { code: "<br>", meaning: "فاصل سطر داخل الفقرة نفسها، ولا ينشئ فقرة جديدة." },
          { code: "<hr>", meaning: "فاصل موضوعي بين جزأين من المحتوى، وهو عنصر فارغ." },
          { code: "<pre>", meaning: "يحافظ على المسافات والأسطر المكتوبة داخل النص." }
        ],
        steps: [
          { title: "افصل فكرتين في فقرتين", explanation: "المتصفح يعرض كل p على سطر مستقل. الأسطر الفارغة التي تكتبها في المصدر وحدها لا تصنع فقرات.", from: "<p>بدأت يومي بقراءة فصل قصير.</p>", to: "<p>بدأت يومي بكتابة ملاحظة قصيرة.</p>", task: "غيّر نص الفقرة الأولى فقط، ثم شغّل ولاحظ أنها بقيت مستقلة عن الفقرة التالية." },
          { title: "استخدم br داخل الفكرة نفسها", explanation: "br يكسر السطر داخل نفس p؛ لا تكرره لإنشاء فقرات متعددة.", from: "خطة الغد:<br>أكتب فكرة جديدة<br>وأراجع ما تعلمته.", to: "خطة الغد:<br>أراجع المثال<br>وأكتب ملاحظة.", task: "غيّر نص السطرين بعد br، ثم شغّل. بقيت الأسطر داخل فقرة واحدة." },
          { title: "قارن pre بالفقرة العادية", explanation: "داخل pre تظهر المسافات والأسطر كما كتبتها تقريبًا. جرّب تعديل السطر الثاني ولاحظ المسافة التي تسبقه.", from: "سطر أول\n  سطر تحته مسافتان", to: "ملاحظة أولى\n    سطر تحته أربع مسافات", task: "غيّر نص pre ومسافاته البادئة. شغّل وقارن حفظ المسافات مع فقرتي p العاديتين." }
        ]
      },
      "HTML Styles": {
        reference: "https://www.w3schools.com/html/html_styles.asp",
        concept: "خاصية style تكتب تنسيقًا مباشرًا على عنصر: الخاصية تحدد ما يتغير، والقيمة تحدد الشكل. لاحقًا ننقل القواعد إلى ملف CSS.",
        flow: "style=\"property: value;\" ⟶ المتصفح يطبّق التنسيق على العنصر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>ألوان الصفحة</title>\n</head>\n<body>\n  <h1 style=\"color: darkgreen;\">عنوان أخضر</h1>\n  <p style=\"background-color: lightyellow;\">خلفية فاتحة خلف الفقرة.</p>\n  <p style=\"font-size: 20px;\">نص أكبر قليلًا.</p>\n  <p style=\"text-align: center;\">نص في المنتصف.</p>\n</body>\n</html>",
        breakdown: [
          { code: "style=\"color: darkgreen;\"", meaning: "color اسم الخاصية، وdarkgreen قيمة اللون، والفاصلة المنقوطة تنهي القاعدة." },
          { code: "background-color", meaning: "يغيّر مساحة الخلفية، بينما color يغيّر لون الحروف." },
          { code: "font-size: 20px", meaning: "يغيّر حجم النص؛ px وحدة قياس." },
          { code: "text-align: center", meaning: "يحدد محاذاة النص داخل العنصر." }
        ],
        steps: [
          { title: "بدّل قيمة اللون", explanation: "في color: darkgreen؛ الاسم color يحدد الشيء الذي نغيره، وdarkgreen يحدد القيمة الجديدة.", from: "color: darkgreen;", to: "color: tomato;", task: "غيّر قيمة اللون إلى tomato فقط. شغّل ولاحظ أن لون الحروف تغيّر." },
          { title: "غيّر الخلفية وحدها", explanation: "background-color يلوّن المساحة خلف المحتوى. هو مختلف عن color الذي يلوّن النص.", from: "background-color: lightyellow;", to: "background-color: lavender;", task: "بدّل lightyellow إلى lavender، واترك اسم الخاصية كما هو ثم شغّل." },
          { title: "جرّب خاصية الحجم", explanation: "font-size يحدد حجم النص، والوحدة px جزء من القيمة. اترك الوحدة حتى يفهم المتصفح مقدار الحجم.", from: "font-size: 20px;", to: "font-size: 26px;", task: "ارفع الحجم إلى 26px ثم شغّل. قارن النص قبل التعديل وبعده." }
        ]
      },
      "HTML Formatting": {
        reference: "https://www.w3schools.com/html/html_formatting.asp",
        concept: "وسوم التنسيق قد تصف شكلًا مثل العريض، أو معنى مثل الأهمية والتأكيد. اختَر الوسم بحسب المعنى حتى يفهمه القارئ وأدوات المساعدة.",
        flow: "b شكل عريض ⟷ strong أهمية؛ i شكل مائل ⟷ em تأكيد",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>تنسيق النص</title>\n</head>\n<body>\n  <h1>ملاحظات القراءة</h1>\n  <p>عنوان كتاب: <i>رحلة إلى القمر</i>.</p>\n  <p>الفكرة <b>واضحة</b>، لكن هذه النقطة <strong>مهمة جدًا</strong>.</p>\n  <p>لا تنسَ <mark>موعد القراءة</mark>.</p>\n  <p>السعر السابق <del>١٠٠</del> والجديد <ins>٨٠</ins>.</p>\n  <p>الماء H<sub>2</sub>O، ومساحة المربع ٣<sup>2</sup>.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<b>", meaning: "يعرض النص عريضًا من دون أن يعلن أهمية إضافية." },
          { code: "<strong>", meaning: "يمنح النص معنى الأهمية القوية، وغالبًا يظهر عريضًا." },
          { code: "<i> / <em>", meaning: "i لصوت أو مصطلح مختلف؛ em لتأكيد له معنى." },
          { code: "mark, del, ins, sub, sup", meaning: "تمييز، حذف، إضافة، رقم سفلي، ورقم علوي." }
        ],
        steps: [
          { title: "اختَر معنى الأهمية", explanation: "b يغيّر المظهر إلى عريض، أما strong فيصف النص بأنه مهم. لا تعتمد على الشكل وحده لتمييزهما.", from: "<b>واضحة</b>", to: "<strong>واضحة</strong>", task: "استبدل b بـ strong في وسمَي البداية والنهاية، ثم شغّل. وضّح معنى أهمية الكلمة." },
          { title: "أكّد كلمة داخل الجملة", explanation: "em يضع تأكيدًا على جزء من الكلام؛ ويمكن لقارئ الشاشة أن يغيّر نبرة قراءته لهذا الجزء.", from: "<i>رحلة إلى القمر</i>", to: "<em>رحلة إلى القمر</em>", task: "حوّل i إلى em في الطرفين، ثم شغّل. قارن معنى التأكيد مع مجرد إمالة شكل النص." },
          { title: "أظهر تعديلًا في معلومة", explanation: "del يبيّن النص المحذوف، وins يبيّن النص الذي أُضيف. كلاهما يحتفظ بمعنى التعديل في المستند.", from: "<del>١٠٠</del>", to: "<del>٩٠</del>", task: "غيّر القيمة المحذوفة إلى ٩٠ ثم شغّل؛ لاحظ أنها تظل مشطوبة بينما القيمة الجديدة تحتها." }
        ]
      },
      "HTML Quotations": {
        reference: "https://www.w3schools.com/html/html_quotation_elements.asp",
        concept: "اختَر عنصر الاقتباس بحسب دوره: q لاقتباس قصير داخل الجملة، وblockquote لجزء مستقل منقول. cite يوثق مصدر blockquote.",
        flow: "q اقتباس قصير ⟶ blockquote اقتباس مستقل ⟶ cite للمصدر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>عبارات أحتفظ بها</title>\n</head>\n<body>\n  <h1>من دفتر القراءة</h1>\n  <p>أحب هذه العبارة: <q>ابدأ بخطوة صغيرة.</q></p>\n  <blockquote cite=\"https://example.com/book\">\n    التعلّم يتحسن حين نجرب ونلاحظ النتيجة.\n  </blockquote>\n  <p><abbr title=\"HyperText Markup Language\">HTML</abbr> لغة لبناء صفحات الويب.</p>\n  <p>أقرأ <cite>رحلة إلى مركز الأرض</cite>.</p>\n  <address>ملاحظة من: فريق التعلّم</address>\n</body>\n</html>",
        breakdown: [
          { code: "<q>", meaning: "اقتباس قصير داخل سطر؛ المتصفح يضيف غالبًا علامتي اقتباس." },
          { code: "<blockquote cite=\"...\">", meaning: "قسم مستقل من مصدر آخر؛ cite يسجل عنوان المصدر." },
          { code: "<abbr title=\"...\">", meaning: "اختصار له شرح كامل داخل title." },
          { code: "<cite>", meaning: "عنوان عمل فني أو كتاب، وليس اسم الشخص الذي ألّفه." }
        ],
        steps: [
          { title: "ميّز الاقتباس القصير", explanation: "q يحيط بعبارة قصيرة داخل p. لا يحتاج إلى إنشاء فقرة منفصلة.", from: "<q>ابدأ بخطوة صغيرة.</q>", to: "<q>جرّب ثم لاحظ.</q>", task: "غيّر كلمات الاقتباس القصير فقط، وشغّل لتلاحظ علاماته داخل الجملة." },
          { title: "وثّق مصدر الاقتباس المستقل", explanation: "blockquote يعرض اقتباسًا طويلًا مستقلًا. قيمة cite تكتب عنوان المصدر، ولا تُعرض عادةً كنص للزائر.", from: "cite=\"https://example.com/book\"", to: "cite=\"https://example.com/notes\"", task: "غيّر عنوان مصدر الاقتباس إلى الرابط المثال الجديد، ثم شغّل وتأكد أن الاقتباس ظل قسمًا مستقلًا." },
          { title: "اشرح الاختصار", explanation: "abbr يحيط بالحروف المختصرة. title يحمل الاسم الكامل الذي يظهر كتلميح عند الإشارة إليه.", from: "title=\"HyperText Markup Language\"", to: "title=\"لغة ترميز النص التشعبي\"", task: "غيّر شرح الاختصار داخل title ثم شغّل ومرّر المؤشر على HTML في المعاينة." }
        ]
      },
      "HTML Comments": {
        reference: "https://www.w3schools.com/html/html_comments.asp",
        concept: "تعليق HTML ملاحظة في المصدر لا تظهر كمحتوى في الصفحة. يمكن استخدامه للتوثيق أو لإخفاء جزء مؤقتًا أثناء التجربة.",
        flow: "<!-- ملاحظة --> ⟶ تبقى في الملف، ولا تظهر للزائر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>تعليقات في الصفحة</title>\n</head>\n<body>\n  <h1>خطة اليوم</h1>\n  <!-- هذه ملاحظة للمطوّر عن القسم التالي -->\n  <p>أقرأ درسًا واحدًا.</p>\n  <!-- <p>هذه فقرة مخفية مؤقتًا.</p> -->\n  <p>ثم أجرّب المثال.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<!--", meaning: "بداية التعليق؛ لاحظ علامة ! بعد القوس." },
          { code: "--> ", meaning: "نهاية التعليق؛ لا توجد علامة ! هنا." },
          { code: "<!-- <p>...</p> -->", meaning: "يمكن إخفاء عنصر كامل مؤقتًا من العرض." },
          { code: "محتوى خارج التعليق", meaning: "يظل ظاهرًا لأن المتصفح يقرأه كعنصر عادي." }
        ],
        steps: [
          { title: "اكتب ملاحظة للمطوّر", explanation: "النص بين <!-- و--> تعليق، لذلك لا يظهر في المعاينة. علامة ! موجودة في البداية فقط.", from: "هذه ملاحظة للمطوّر عن القسم التالي", to: "تذكير: راجع الخطة بعد التشغيل", task: "غيّر نص التعليق وحده، ثم شغّل. ستظل الملاحظة في المصدر ولن تظهر كفقرة للزائر." },
          { title: "أخفِ فقرة مؤقتًا", explanation: "عندما نضع وسم p كاملًا داخل تعليق، لا يعرضه المتصفح. حذف التعليق لاحقًا يعيده إلى الصفحة.", from: "<p>هذه فقرة مخفية مؤقتًا.</p>", to: "<p>هذه الخطة مؤجلة مؤقتًا.</p>", task: "غيّر النص داخل الفقرة المعلّقة، ثم شغّل. لن تظهر حتى تزيل علامتي التعليق عنها." },
          { title: "أظهر الفقرة من جديد", explanation: "لإظهار المحتوى، احذف علامتي التعليق حول العنصر فقط؛ لا تحذف وسمَي الفقرة.", from: "<!-- <p>هذه الخطة مؤجلة مؤقتًا.</p> -->", to: "<p>هذه الخطة مؤجلة مؤقتًا.</p>", task: "أزل التعليق حول الفقرة وشغّل. قارن ظهورها الآن مع الملاحظة التي بقيت مخفية." }
        ]
      },
      "HTML Colors": {
        reference: "https://www.w3schools.com/html/html_colors.asp",
        concept: "تستطيع كتابة اللون باسم جاهز أو بصيغ RGB وHEX وHSL. اللون قد يطبق على النص أو الخلفية أو الحد؛ أما RGBA وHSLA فتضيفان الشفافية.",
        flow: "قيمة لون ⟶ color للنص | background-color للخلفية | border للحد",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>تجربة الألوان</title>\n</head>\n<body>\n  <h1 style=\"color: tomato;\">لون الحروف</h1>\n  <p style=\"background-color: lightyellow;\">لون مساحة الخلفية.</p>\n  <p style=\"border: 2px solid mediumseagreen;\">لون الحد حول الفقرة.</p>\n  <p style=\"color: #256b57;\">لون مكتوب بصيغة HEX.</p>\n  <p style=\"background-color: rgba(255, 99, 71, 0.4);\">لون شفاف جزئيًا.</p>\n</body>\n</html>",
        breakdown: [
          { code: "tomato", meaning: "اسم لون جاهز يقرأه المتصفح." },
          { code: "#256b57", meaning: "HEX يكتب شدة الأحمر والأخضر والأزرق بأرقام ست عشرية." },
          { code: "rgb(255, 99, 71)", meaning: "ثلاث قيم تحدد الأحمر والأخضر والأزرق." },
          { code: "rgba(..., 0.4)", meaning: "القيمة الأخيرة تضيف شفافية؛ الصفر شفاف تمامًا والواحد معتم." }
        ],
        steps: [
          { title: "لوّن الحروف", explanation: "خاصية color تغيّر الحروف داخل العنصر. tomato اسم لون؛ لا يغيّر خلفية العنوان.", from: "color: tomato;", to: "color: dodgerblue;", task: "بدّل لون الحروف إلى dodgerblue، ثم شغّل وراقب العنوان فقط." },
          { title: "افصل لون الخلفية عن النص", explanation: "background-color يلوّن مساحة العنصر. اترك color كما هو لتلاحظ أن النص والخلفية إعدادان مختلفان.", from: "background-color: lightyellow;", to: "background-color: lavender;", task: "غيّر الخلفية إلى lavender ثم شغّل. اقرأ اسم الخاصية قبل القيمة." },
          { title: "جرّب اللون بصيغة HEX", explanation: "تبدأ قيمة HEX بعلامة # وتحتوي عادةً ست خانات للأحمر والأخضر والأزرق.", from: "#256b57", to: "#a65d32", task: "بدّل قيمة HEX إلى #a65d32 ثم شغّل وقارنها باسم اللون في السطر الأول." }
        ]
      },
      "HTML CSS": {
        reference: "https://www.w3schools.com/html/html_css.asp",
        concept: "يمكن وضع CSS داخل style على العنصر، أو داخل عنصر style في head، أو في ملف CSS خارجي مرتبط برابط link.",
        flow: "HTML يحدد العنصر ⟶ CSS يختاره ⟶ الخاصية والقيمة تغيّران مظهره",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>ربط HTML بالتنسيق</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n  <style>\n    body { font-family: Arial, sans-serif; }\n    h1 { color: #256b57; }\n    p { background-color: #eef6e8; padding: 10px; }\n  </style>\n</head>\n<body>\n  <h1>بنية الصفحة</h1>\n  <p style=\"color: tomato;\">قواعد داخلية ولمسة مباشرة.</p>\n</body>\n</html>",
        breakdown: [
          { code: "style=\"...\"", meaning: "تنسيق مباشر على عنصر واحد؛ مناسب للتجربة السريعة لا لتكرار القواعد." },
          { code: "<style> ... </style>", meaning: "قواعد داخلية في head يمكنها تنسيق عدة عناصر في الصفحة." },
          { code: "<link rel=\"stylesheet\" href=\"style.css\">", meaning: "يربط ملف CSS خارجي. احفظ الملفين في المجلد المناسب حتى يجد المتصفح الرابط." }
        ],
        steps: [
          { title: "لاحظ التنسيق المباشر", explanation: "style داخل p يطبق color على هذا العنصر وحده. الخاصية والقيمة بين علامتي اقتباس.", from: "color: tomato;", to: "color: darkblue;", task: "غيّر لون الفقرة إلى darkblue ثم شغّل. القاعدة لا تؤثر على العنوان." },
          { title: "عدّل قاعدة داخلية", explanation: "القواعد بين وسمَي style في head. المحدد h1 يختار العناوين من هذا النوع، ثم color يغيّر لونها.", from: "color: #256b57;", to: "color: #a65d32;", task: "غيّر لون h1 داخل style فقط ثم شغّل. لاحظ الفرق عن style المباشر في p." },
          { title: "افهم ربط الملف الخارجي", explanation: "href في link يحدد مكان ملف CSS. عند تنزيل ملف HTML، احفظ معه ملف style.css بالاسم والمسار نفسيهما.", from: "href=\"style.css\"", to: "href=\"theme.css\"", task: "غيّر اسم الملف في href إلى theme.css ثم شغّل. في مشروعك الحقيقي يجب أن يطابق الاسم ملف CSS الموجود." }
        ]
      },
      "HTML Links": {
        reference: "https://www.w3schools.com/html/html_links.asp",
        concept: "العنصر a ينشئ رابطًا، وقيمة href تحدد وجهته. الوجهة قد تكون عنوانًا كاملًا، ملفًا قريبًا، أو معرّفًا داخل الصفحة يبدأ بـ #.",
        flow: "<a> نص قابل للضغط </a> + href=\"الوجهة\" ⟶ انتقال",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>روابط الصفحة</title>\n</head>\n<body>\n  <h1 id=\"top\">دليل الحديقة</h1>\n  <p><a href=\"https://www.w3schools.com\">افتح مرجع HTML</a></p>\n  <p><a href=\"#details\">انتقل إلى التفاصيل</a></p>\n  <div style=\"height: 160px;\"></div>\n  <section id=\"details\">\n    <h2>تفاصيل الزيارة</h2>\n    <p>اختر وقتًا هادئًا للتجربة.</p>\n    <a href=\"#top\">عد إلى بداية الصفحة</a>\n  </section>\n</body>\n</html>",
        breakdown: [
          { code: "<a> نص </a>", meaning: "العنصر الذي يصبح محتواه قابلًا للنقر." },
          { code: "href=\"https://...\"", meaning: "وجهة كاملة إلى موقع آخر." },
          { code: "href=\"#details\"", meaning: "قفزة داخل المستند إلى عنصر يحمل id=\"details\"." },
          { code: "id=\"top\"", meaning: "اسم فريد للهدف؛ لا تضع # داخل قيمة id." }
        ],
        steps: [
          { title: "غيّر وجهة الرابط", explanation: "href يحمل عنوان الوجهة، أما النص بين a و/a فهو ما يراه الزائر ويضغطه.", from: "href=\"https://www.w3schools.com\"", to: "href=\"https://www.w3schools.com/html/\"", task: "غيّر الوجهة إلى قسم HTML في المرجع، واترك النص الظاهر كما هو ثم شغّل." },
          { title: "اقفز إلى قسم داخل الصفحة", explanation: "الرابط #details يبحث عن عنصر id=\"details\". علامة # تكتب في href فقط.", from: "href=\"#details\"", to: "href=\"#top\"", task: "غيّر رابط التفاصيل ليقفز إلى #top، ثم اضغطه داخل المعاينة ولاحظ انتقال الصفحة." },
          { title: "اكتب نصًا يصف الوجهة", explanation: "نص الرابط ينبغي أن يخبر الزائر بما سيفتحه. الوجهة في href منفصلة عن الكلمات الظاهرة.", from: "افتح مرجع HTML", to: "تعلّم عناصر HTML", task: "غيّر كلمات الرابط إلى «تعلّم عناصر HTML» ثم شغّل. لم تتغير الوجهة لأنك عدّلت المحتوى فقط." }
        ]
      },
      "HTML Link Colors": {
        reference: "https://www.w3schools.com/html/html_links_colors.asp",
        concept: "الرابط له حالات مثل غير المزور، والمزور، وعند المرور عليه أو الضغط. CSS يختار الحالة بمحددات مثل :link و:hover، ثم يغيّر اللون أو الخط.",
        flow: "حالة الرابط ⟶ محدد CSS يطابقها ⟶ اللون أو الخط يتغير",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>حالات الرابط</title>\n  <style>\n    a:link { color: #256b57; text-decoration: none; }\n    a:visited { color: #79527e; }\n    a:hover { color: #a65d32; text-decoration: underline; }\n    a:active { color: #35658f; }\n  </style>\n</head>\n<body>\n  <h1>جرّب حالات الرابط</h1>\n  <p><a href=\"https://www.w3schools.com/html/\">افتح مرجع HTML</a></p>\n</body>\n</html>",
        breakdown: [
          { code: "a:link", meaning: "يختار الرابط الذي لم يزره المتصفح بعد." },
          { code: "a:hover", meaning: "يختار الرابط أثناء وجود مؤشر الفأرة فوقه." },
          { code: "color", meaning: "قيمة اللون تغيّر الحروف، ولا تغيّر عنوان الوجهة في href." },
          { code: "text-decoration", meaning: "تتحكم في ظهور الخط أسفل نص الرابط." }
        ],
        steps: [
          { title: "بدّل لون الرابط العادي", explanation: "a:link يحدد حالة الرابط غير المزور. غيّر القيمة فقط، واترك اسم الحالة كما هو.", from: "color: #256b57;", to: "color: #35658f;", task: "غيّر لون الرابط غير المزور إلى الأزرق #35658f، ثم شغّل ومرّر المؤشر على الرابط." },
          { title: "أظهر الخط أسفل الرابط", explanation: "text-decoration خاصية تنسيق. القيمة none تخفي الخط، وunderline تظهره.", from: "text-decoration: none;", to: "text-decoration: underline;", task: "استبدل none بـ underline في قاعدة a:link ثم شغّل. لاحظ الخط تحت الرابط." },
          { title: "غيّر لون المرور", explanation: "قاعدة a:hover تعمل أثناء مرور المؤشر فوق الرابط. لكل حالة قاعدة مستقلة.", from: "color: #a65d32;", to: "color: #b03a48;", task: "غيّر لون a:hover إلى #b03a48، ثم شغّل وحرّك المؤشر فوق الرابط." }
        ]
      },
      "HTML Link Bookmarks": {
        reference: "https://www.w3schools.com/html/html_links_bookmarks.asp",
        concept: "الإشارة المرجعية داخل الصفحة هي عنصر له id، ورابط يبدأ بـ # يتجه إلى هذا id. الكمبيوتر يطابق الاسمين ثم ينقل الصفحة إلى المكان المطلوب.",
        flow: "href=\"#lesson\" ⟶ يبحث عن id=\"lesson\" ⟶ يقفز إلى العنوان",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>قفزة داخل الصفحة</title>\n</head>\n<body>\n  <h1 id=\"top\">دليل التعلّم</h1>\n  <p><a href=\"#lesson\">انزل إلى الدرس</a></p>\n  <div style=\"height: 180px;\"></div>\n  <h2 id=\"lesson\">مكان الدرس</h2>\n  <p>وصلت إلى الجزء الذي يحمل الاسم نفسه في الرابط.</p>\n  <p><a href=\"#top\">ارجع للبداية</a></p>\n</body>\n</html>",
        breakdown: [
          { code: "id=\"lesson\"", meaning: "اسم فريد يوضع على العنصر الذي تريد الوصول إليه." },
          { code: "href=\"#lesson\"", meaning: "علامة # تقول إن الوجهة عنصر داخل الصفحة، والكلمة بعدها هي قيمة id." },
          { code: "<a> ... </a>", meaning: "الجزء المكتوب بين الوسمين هو النص القابل للضغط." }
        ],
        steps: [
          { title: "سمِّ الرابط بوضوح", explanation: "اسم الرابط يشرح الحركة التي سيقوم بها عند الضغط. هذا التعديل لا يغيّر نقطة الوصول.", from: "انزل إلى الدرس", to: "اقفز إلى الدرس", task: "غيّر كلمات الرابط إلى «اقفز إلى الدرس»، ثم شغّل واضغطه لتشاهد القفزة." },
          { title: "اكتب عنوان المكان", explanation: "العنوان يحمل id=\"lesson\"؛ الرابط يبحث عن هذه القيمة حرفيًا. النص الظاهر للعنوان شيء مختلف عن id.", from: "مكان الدرس", to: "بداية التطبيق", task: "غيّر نص العنوان إلى «بداية التطبيق»، ثم اضغط الرابط وتأكد أن القفزة ما زالت تصل إليه." },
          { title: "طابق اسم الرابط مع الهدف", explanation: "غيّرنا اسم الهدف والرابط معًا في هذا التعديل؛ يجب أن تتطابق الكلمة بعد # مع قيمة id.", from: "href=\"#lesson\">اقفز إلى الدرس</a></p>\n  <div style=\"height: 180px;\"></div>\n  <h2 id=\"lesson\">بداية التطبيق</h2>", to: "href=\"#practice\">اقفز إلى التطبيق</a></p>\n  <div style=\"height: 180px;\"></div>\n  <h2 id=\"practice\">بداية التطبيق</h2>", task: "حدّث الرابط والهدف معًا إلى الاسم practice في المقطع المحدد، ثم شغّل واضغط الرابط." }
        ]
      },
      "HTML Images": {
        reference: "https://www.w3schools.com/html/html_images.asp",
        concept: "عنصر img يحجز مكانًا لصورة مصدرها عنوان في src. العنصر فارغ ولا يحتاج وسم إغلاق، وalt يصف الصورة عند تعذر رؤيتها أو لقارئ الشاشة.",
        flow: "src يحدد الملف ⟶ المتصفح يحمّله ⟶ alt يصفه إذا لم يظهر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صورة في الصفحة</title>\n</head>\n<body>\n  <h1>مكان أريد زيارته</h1>\n  <img src=\"https://www.w3schools.com/html/img_chania.jpg\" alt=\"صورة تعليم HTML\" width=\"220\" height=\"160\">\n  <p>الصورة عنصر داخل الصفحة وليست نصًا مكتوبًا بين وسمين.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<img ...>", meaning: "عنصر صورة فارغ؛ لا تكتب بعده وسمًا مثل </img>." },
          { code: "src=\"...\"", meaning: "المسار الذي سيطلب المتصفح الصورة منه." },
          { code: "alt=\"...\"", meaning: "وصف نصي بديل يفيد عند فشل التحميل ويساعد قارئ الشاشة." },
          { code: "width وheight", meaning: "أبعاد مساحة الصورة بالبكسل؛ ثبات الأبعاد يقلل قفز التخطيط أثناء التحميل." }
        ],
        steps: [
          { title: "اكتب وصفًا يشرح الصورة", explanation: "alt لا يغيّر شكل الصورة عندما تظهر؛ إنه وصف بديل يقرأه قارئ الشاشة ويظهر عند تعذر التحميل.", from: "alt=\"صورة تعليم HTML\"", to: "alt=\"مبانٍ ملوّنة بجوار قناة مائية\"", task: "استبدل alt بوصف دقيق لما تراه في الصورة، ثم شغّل واقرأ القيمة الجديدة في سطر img." },
          { title: "اضبط حجم الصورة", explanation: "width وheight قيمتان بالبكسل. حافظ على تناسبهما حتى لا تبدو الصورة ممدودة.", from: "width=\"220\" height=\"160\"", to: "width=\"180\" height=\"130\"", task: "صغّر الصورة بتغيير الأبعاد إلى 180 في 130، ثم شغّل وقارن المساحة." },
          { title: "جرّب المساحة بأسلوب CSS", explanation: "يمكن كتابة الأبعاد في style أيضًا. هنا نستخدم عرضًا أصغر ونترك الارتفاع تلقائيًا ليحافظ المتصفح على تناسب الصورة.", from: "width=\"180\" height=\"130\"", to: "style=\"width:180px;height:auto;\"", task: "استبدل سمتي width وheight بسمة style الظاهرة، ثم شغّل. لا تضف وسم إغلاق للصورة." }
        ]
      },
      "HTML Favicon": {
        reference: "https://www.w3schools.com/html/html_favicon.asp",
        concept: "الأيقونة الصغيرة التي تظهر بجوار عنوان الصفحة في تبويب المتصفح تسمى favicon. عنصر link داخل head يربط ملفها بالصفحة؛ مسار href يجب أن يشير إلى ملف موجود.",
        flow: "ملف الأيقونة ⟶ link rel=\"icon\" ⟶ المتصفح يعرضها بجوار عنوان التبويب",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحة ببطاقة أيقونة</title>\n  <link rel=\"icon\" type=\"image/x-icon\" href=\"/images/favicon.ico\">\n</head>\n<body>\n  <h1>أيقونة الصفحة</h1>\n  <p>يحاول المتصفح قراءة ملف الأيقونة من المسار الموجود في href.</p>\n  <p>احفظ ملف HTML وافتحه من مجلد يحتوي على ملف الأيقونة لتجربة التبويب الحقيقي.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<head>", meaning: "مكان بيانات الصفحة والروابط التي لا تظهر كمحتوى رئيسي." },
          { code: "rel=\"icon\"", meaning: "يخبر المتصفح أن المورد المرتبط أيقونة الصفحة." },
          { code: "type=\"image/x-icon\"", meaning: "يصف صيغة ملف الأيقونة في هذا المثال." },
          { code: "href=\"...\"", meaning: "مسار الملف. تغيير الاسم هنا وحده لا ينشئ الصورة؛ يجب أن يوجد الملف في هذا المسار." }
        ],
        steps: [
          { title: "غيّر اسم الصفحة في التبويب", explanation: "title هو النص الذي يظهر في عنوان التبويب؛ link للأيقونة سطر مستقل بعده.", from: "<title>صفحة ببطاقة أيقونة</title>", to: "<title>موقعي الصغير</title>", task: "غيّر title إلى «موقعي الصغير» ثم شغّل. راجع السطر الذي سيصبح عنوان تبويب الصفحة عند فتح الملف." },
          { title: "حدّد مكان ملف الأيقونة", explanation: "href لا ينشئ الملف. يجب أن تحفظ صورة الأيقونة في المجلد نفسه أو في مجلد الصور المذكور في المسار.", from: "href=\"/images/favicon.ico\"", to: "href=\"images/my-icon.ico\"", task: "غيّر href إلى images/my-icon.ico. عند تنزيل الملف، ضع أيقونة بهذا الاسم داخل مجلد images بجواره." },
          { title: "طابق نوع الملف مع صيغته", explanation: "type يصف نوع المورد، واسم الملف في href ينبغي أن يشير إلى صيغة متوافقة معه.", from: "type=\"image/x-icon\" href=\"images/my-icon.ico\"", to: "type=\"image/png\" href=\"images/my-icon.png\"", task: "حدّث النوع والامتداد معًا إلى PNG في المقطع، ثم احفظ أيقونة بهذا الاسم داخل مجلد images." }
        ]
      },
      "HTML Page Title": {
        reference: "https://www.w3schools.com/html/html_page_title.asp",
        concept: "العنصر title يعطي المستند اسمًا مختصرًا يظهر في لسان المتصفح والمفضلة ونتائج البحث. أما h1 فيظهر داخل الصفحة للزائر؛ الاسمان يؤديان وظيفتين مختلفتين.",
        flow: "title داخل head ⟶ اسم المستند في التبويب | h1 داخل body ⟶ عنوان ظاهر داخل الصفحة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>ملاحظات التعلّم</title>\n</head>\n<body>\n  <h1>ملاحظات التعلّم</h1>\n  <p>العنوان الأول يظهر داخل الصفحة، والاسم في title يصف المستند للمتصفح.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<title>", meaning: "عنصر داخل head يحدد اسم المستند، وليس عنوانًا مرئيًا داخل body." },
          { code: "<h1>", meaning: "عنوان المحتوى الرئيسي الذي يراه زائر الصفحة." },
          { code: "head مقابل body", meaning: "الأول يحمل بيانات الصفحة، والثاني يحمل محتواها الظاهر." }
        ],
        steps: [
          { title: "اكتب اسمًا دقيقًا للتبويب", explanation: "اجعل title يصف الصفحة نفسها؛ اسم مثل «ملاحظاتي» أوضح من «صفحة» فقط.", from: "<title>ملاحظات التعلّم</title>", to: "<title>دفتر أفكار الويب</title>", task: "بدّل اسم المستند إلى «دفتر أفكار الويب»، ثم شغّل وحدد مكانه داخل head." },
          { title: "قارن العنوان الظاهر", explanation: "غيّر h1 وحده هذه المرة. ستبقى قيمة title كما هي لأن كل عنصر له وظيفة ومكان مختلف.", from: "<h1>ملاحظات التعلّم</h1>", to: "<h1>أفكار أبنيها بالكود</h1>", task: "غيّر h1 إلى «أفكار أبنيها بالكود»، ثم شغّل ولاحظ أن العنوان المرئي اختلف عن اسم التبويب." },
          { title: "اكتب وصفًا قصيرًا للصفحة", explanation: "title مفيد عندما يفتح الزائر أكثر من تبويب. اختر اسمًا قصيرًا يميّز هذه الصفحة.", from: "دفتر أفكار الويب", to: "دفتر تجارب HTML", task: "عدّل النص داخل title إلى «دفتر تجارب HTML». لا تغيّر h1، ثم شغّل." }
        ]
      },
      "HTML Tables": {
        reference: "https://www.w3schools.com/html/html_tables.asp",
        concept: "الجدول يناسب بيانات لها صفوف وأعمدة مثل المواعيد. table يحتوي الجدول، وtr ينشئ صفًا، وth عنوان عمود، وtd خلية بيانات.",
        flow: "table ⟶ tr صف ⟶ th عنوان أو td قيمة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>جدول مواعيد التعلّم</title>\n  <style>\n    table, th, td { border: 1px solid #738477; border-collapse: collapse; padding: 8px; }\n    th { background: #eaf3e9; }\n  </style>\n</head>\n<body>\n  <h1>مواعيد التعلّم</h1>\n  <table>\n    <tr><th>اليوم</th><th>النشاط</th></tr>\n    <tr><td>السبت</td><td>قراءة درس</td></tr>\n    <tr><td>الثلاثاء</td><td>تطبيق سريع</td></tr>\n  </table>\n</body>\n</html>",
        breakdown: [
          { code: "<table>", meaning: "الحاوية التي تضم كل صفوف الجدول." },
          { code: "<tr>", meaning: "صف واحد يمتد أفقيًا ويحتوي خلايا." },
          { code: "<th>", meaning: "خلية عنوان؛ تشرح معنى العمود أو الصف." },
          { code: "<td>", meaning: "خلية تحمل قيمة فعلية في الجدول." },
          { code: "border-collapse", meaning: "قاعدة CSS في المثال تجعل حدود الخلايا متصلة." }
        ],
        steps: [
          { title: "سمِّ عمود النشاط", explanation: "th خلية عنوان وليست قيمة عادية. عدّل العنوان لتصف العمود الذي تحته.", from: "<th>النشاط</th>", to: "<th>ما سأفعله</th>", task: "غيّر عنوان العمود إلى «ما سأفعله»، ثم شغّل وحدد الصف الذي يحمل العناوين." },
          { title: "حدّث قيمة خلية", explanation: "td تحتوي البيانات داخل الصف. هذه القيمة تحت عمود اليوم؛ تغييرها لا يغيّر عنوان العمود.", from: "<td>قراءة درس</td>", to: "<td>مشاهدة المثال</td>", task: "بدّل النشاط إلى «مشاهدة المثال»، ثم شغّل وتتبّع الخلية داخل صف السبت." },
          { title: "أضف صفًا جديدًا", explanation: "الصف الجديد tr يحتاج خليتين حتى يطابق عدد أعمدة الجدول في المثال.", from: "    <tr><td>الثلاثاء</td><td>تطبيق سريع</td></tr>\n  </table>", to: "    <tr><td>الثلاثاء</td><td>تطبيق سريع</td></tr>\n    <tr><td>الخميس</td><td>مراجعة صغيرة</td></tr>\n  </table>", task: "أضف صف الخميس بالخليتين الظاهرتين، ثم شغّل وتأكد أن الصف الجديد يظل داخل table." }
        ]
      },
      "HTML Lists": {
        reference: "https://www.w3schools.com/html/html_lists.asp",
        concept: "القائمة تجمع عناصر مرتبطة. ul يعرض عناصر دون ترتيب رقمي، وol يعرضها بترقيم، وكل عنصر داخل li مستقل.",
        flow: "ul أو ol ⟶ قائمة ⟶ li لكل عنصر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>قائمة تدريب قصيرة</title>\n</head>\n<body>\n  <h1>خطوات التدريب</h1>\n  <ul>\n    <li>افتح المثال</li>\n    <li>غيّر قيمة واحدة</li>\n  </ul>\n</body>\n</html>",
        breakdown: [
          { code: "<ul>", meaning: "حاوية قائمة غير مرتبة؛ المتصفح يعرض علامة قبل كل عنصر." },
          { code: "<ol>", meaning: "حاوية قائمة مرتبة؛ المتصفح يرقّم العناصر تلقائيًا." },
          { code: "<li>", meaning: "عنصر واحد داخل ul أو ol؛ لا تضعه منفردًا خارج القائمة." }
        ],
        steps: [
          { title: "اكتب أول خطوة بطريقتك", explanation: "النص بين li ووسم إغلاقه هو عنصر القائمة الذي سيظهر للزائر.", from: "افتح المثال", to: "شغّل الصفحة", task: "غيّر أول عنصر إلى «شغّل الصفحة»، ثم شغّل ولاحظ أن العلامة بقيت قائمة." },
          { title: "أضف خطوة ثالثة", explanation: "كل li عنصر مستقل، لكنه يبقى داخل الحاوية ul. أضف عنصرًا قبل إغلاق القائمة.", from: "    <li>غيّر قيمة واحدة</li>\n  </ul>", to: "    <li>غيّر قيمة واحدة</li>\n    <li>لاحظ النتيجة</li>\n  </ul>", task: "أضف عنصر «لاحظ النتيجة» في المكان المحدد، ثم شغّل وعدّ عناصر القائمة." },
          { title: "حوّلها إلى قائمة مرقمة", explanation: "استبدل حاوية القائمة كاملة من ul إلى ol مع إبقاء li كما هي؛ نوع الحاوية يحدد العلامات الظاهرة.", from: "  <ul>\n    <li>شغّل الصفحة</li>\n    <li>غيّر قيمة واحدة</li>\n    <li>لاحظ النتيجة</li>\n  </ul>", to: "  <ol>\n    <li>شغّل الصفحة</li>\n    <li>غيّر قيمة واحدة</li>\n    <li>لاحظ النتيجة</li>\n  </ol>", task: "بدّل الحاوية من ul إلى ol في المقطع، مع الإبقاء على العناصر li نفسها، ثم شغّل وقارن الترقيم." }
        ]
      },
      "HTML Block & Inline": {
        reference: "https://www.w3schools.com/html/html_blocks.asp",
        concept: "العناصر الكتلية مثل div تبدأ عادةً بسطر جديد وتشغل العرض المتاح. العناصر السطرية مثل span تبقى داخل السطر وتأخذ مساحة محتواها.",
        flow: "div ⟶ مساحة مستقلة في التدفق | span ⟶ جزء داخل السطر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>عنصر داخل السطر وآخر كتلي</title>\n  <style>\n    .badge { background: #fff0c2; padding: 3px 7px; }\n    .notice { margin-top: 14px; padding: 10px; background: #eaf3e9; }\n  </style>\n</head>\n<body>\n  <h1>مكان العنصر يغيّر تدفقه</h1>\n  <p>موعدنا <span class=\"badge\">بعد الظهر</span> في ساحة التعلّم.</p>\n  <div class=\"notice\">هذا تنبيه داخل عنصر يبدأ في سطر مستقل.</div>\n</body>\n</html>",
        breakdown: [
          { code: "<span>", meaning: "حاوية سطرية صغيرة حول جزء من النص؛ لا تبدأ سطرًا جديدًا افتراضيًا." },
          { code: "<div>", meaning: "حاوية كتلية تقسم المحتوى إلى جزء مستقل في التدفق الافتراضي." },
          { code: "class=\"badge\"", meaning: "اسم يساعد CSS على تنسيق الجزء، ولا يغيّر وحده نوعه الكتلي أو السطري." },
          { code: "display الافتراضي", meaning: "المتصفح يحدد طريقة تدفق العنصر من نوعه قبل إضافة قواعد CSS." }
        ],
        steps: [
          { title: "لاحظ الكلمة داخل السطر", explanation: "span يحيط بجزء صغير من الجملة؛ بقية النص تظل بجواره في السطر نفسه.", from: "بعد الظهر", to: "الساعة الخامسة", task: "غيّر نص span إلى «الساعة الخامسة»، ثم شغّل ولاحظ بقاءه وسط الجملة." },
          { title: "أضف جزءًا سطريًا ثانيًا", explanation: "عنصر span آخر يمكن أن يعيش داخل الفقرة نفسها؛ كل واحد يحيط بنص مستقل.", from: "في ساحة التعلّم.</p>", to: "في ساحة التعلّم، ومعها <span class=\"badge\">مهمة قصيرة</span>.</p>", task: "أضف span الثانية في نهاية الجملة كما في النص، ثم شغّل وتابع كيف بقيت الكلمات داخل السطر." },
          { title: "عدّل محتوى الجزء الكتلي", explanation: "div منفصل عن الفقرة ويبدأ في سطر جديد. عدّل كلماته ولاحظ أنه يظل مساحة مستقلة.", from: "هذا تنبيه داخل عنصر يبدأ في سطر مستقل.", to: "هذه بطاقة مستقلة تبدأ بعد الفقرة.", task: "غيّر نص div إلى «هذه بطاقة مستقلة تبدأ بعد الفقرة.» ثم شغّل وقارن مكانه مع span." }
        ]
      },
      "HTML Div": {
        reference: "https://www.w3schools.com/html/html_div.asp",
        concept: "div حاوية عامة تجمع عناصر مرتبطة في وحدة واحدة. الجمع يجعل من السهل تنسيق المجموعة أو نقلها معًا لاحقًا.",
        flow: "div يضم عنوانًا وفقرة ⟶ يصبحان مجموعة واحدة ⟶ تنسيق موحّد",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>بطاقات أماكن</title>\n  <style>\n    .place { background: #eaf3e9; border-right: 4px solid #286b56; margin: 10px 0; padding: 12px; }\n  </style>\n</head>\n<body>\n  <h1>أماكن أتعرف عليها</h1>\n  <div class=\"place\">\n    <h2>الإسكندرية</h2>\n    <p>مدينة على البحر.</p>\n  </div>\n  <div class=\"place\">\n    <h2>أسوان</h2>\n    <p>مدينة جنوب مصر.</p>\n  </div>\n</body>\n</html>",
        breakdown: [
          { code: "<div> ... </div>", meaning: "يفتح حاوية ويغلقها؛ العناصر بينهما تصبح أبناء داخل المجموعة." },
          { code: "class=\"place\"", meaning: "الاسم نفسه على الحاويتين يسمح بتطبيق القاعدة ذاتها عليهما." },
          { code: "h2 وp داخل div", meaning: "العنوان والفقرة يظلان عنصرين منفصلين لكن المجموعة تحيط بهما معًا." },
          { code: ".place في style", meaning: "قاعدة CSS تختار كل حاوية لها class تساوي place." }
        ],
        steps: [
          { title: "غيّر عنوان البطاقة الأولى", explanation: "h2 ابن داخل div الأول؛ تعديل العنوان لا يزيل الحاوية التي تجمعه مع الفقرة.", from: "<h2>الإسكندرية</h2>", to: "<h2>بورسعيد</h2>", task: "بدّل اسم البطاقة الأولى إلى بورسعيد، ثم شغّل وحدد عناصرها التي ما زالت داخل div." },
          { title: "أضف وصفًا يناسبها", explanation: "الفقرة التالية h2 داخل المجموعة نفسها. غيّر وصفها وحده لتتبع حدود الحاوية.", from: "<p>مدينة على البحر.</p>", to: "<p>مدينة تطل على قناة السويس.</p>", task: "عدّل وصف البطاقة الأولى إلى «مدينة تطل على قناة السويس.» ثم شغّل." },
          { title: "أنشئ مجموعة ثالثة", explanation: "لإضافة بطاقة جديدة، ضع حاوية div كاملة قبل body المغلق. كل عنصر فيها يبدأ وينتهي داخل المجموعة.", from: "</body>", to: "  <div class=\"place\">\n    <h2>الأقصر</h2>\n    <p>مدينة تضم آثارًا تاريخية.</p>\n  </div>\n</body>", task: "أضف مجموعة الأقصر قبل </body> كما في المقطع، ثم شغّل وعدّ البطاقات الثلاث." }
        ]
      },
      "HTML Classes": {
        reference: "https://www.w3schools.com/html/html_classes.asp",
        concept: "class اسم مشترك تضعه على عناصر تريد اختيارها معًا في CSS أو JavaScript. تكتب قيمة class في HTML من غير نقطة؛ النقطة تظهر فقط عند كتابة محدد CSS.",
        flow: "class=\"place\" في HTML ⟶ .place في CSS ⟶ تنسيق كل عنصر يحمل الاسم",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>بطاقات تشترك في class</title>\n  <style>\n    .place { background: #eaf3e9; padding: 12px; margin: 8px 0; }\n    .featured { border-right: 4px solid #a65d32; }\n  </style>\n</head>\n<body>\n  <h1>أماكني المفضلة</h1>\n  <article class=\"place\">\n    <h2>الفيوم</h2>\n    <p>طبيعة هادئة وماء واسع.</p>\n  </article>\n  <article class=\"place\">\n    <h2>دهب</h2>\n    <p>مدينة ساحلية أحب زيارتها.</p>\n  </article>\n</body>\n</html>",
        breakdown: [
          { code: "class=\"place\"", meaning: "صفة في HTML تحمل اسمًا؛ لا تكتب النقطة هنا." },
          { code: ".place", meaning: "محدد CSS يبدأ بنقطة ليختار كل عنصر يحمل class باسم place." },
          { code: "class=\"place featured\"", meaning: "عنصر واحد يمكن أن يحمل أكثر من class، وتفصل بينها مسافة." },
          { code: "case-sensitive", meaning: "اسم class يطابق حالة الأحرف؛ Place مختلف عن place." }
        ],
        steps: [
          { title: "غيّر محتوى البطاقة", explanation: "اسم class يبقى كما هو بينما محتوى h2 يتغير؛ هما معلومتان في سطرين مختلفين.", from: "<h2>الفيوم</h2>", to: "<h2>واحة الفيوم</h2>", task: "عدّل العنوان إلى «واحة الفيوم»، ثم شغّل ولاحظ أن تنسيق .place بقي مطبقًا." },
          { title: "أضف class ثانية", explanation: "اكتب الاسمين في HTML وبينهما مسافة فقط. لا تضع النقطة في قيمة class.", from: "<article class=\"place\">", to: "<article class=\"place featured\">", task: "أضف featured إلى بطاقة الواحة، ثم شغّل ولاحظ ظهور الحد المميز من القاعدة الموجودة." },
          { title: "قوِّ العلامة المميزة", explanation: "المحدد .featured يختار البطاقة ذات الاسم الإضافي. غيّر عرض الحد في CSS وشغّل.", from: "border-right: 4px solid #a65d32;", to: "border-right: 7px solid #a65d32;", task: "اجعل الحد المميز 7px، ثم شغّل. البطاقة التي تحمل featured وحدها تحصل على هذا التغيير." }
        ]
      },
      "HTML Id": {
        reference: "https://www.w3schools.com/html/html_id.asp",
        concept: "id اسم يحدد عنصرًا واحدًا بعينه داخل الصفحة. يمكن للرابط وCSS وJavaScript الرجوع إليه، لذلك يجب أن يكون فريدًا، وتظهر # في محدد CSS أو href وليس في قيمة id نفسها.",
        flow: "id=\"goal\" على العنصر ⟶ #goal في CSS أو href ⟶ اختيار هذا العنصر وحده",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>هدف اليوم</title>\n  <style>\n    #goal { padding: 12px; background: #eaf3e9; }\n  </style>\n</head>\n<body>\n  <h1>خطوة اليوم</h1>\n  <p><a href=\"#goal\">اقفز إلى هدفي</a></p>\n  <div style=\"height: 120px;\"></div>\n  <section id=\"goal\">\n    <h2>هدفي الحالي</h2>\n    <p>أجرّب تعديلًا صغيرًا وألاحظ النتيجة.</p>\n  </section>\n</body>\n</html>",
        breakdown: [
          { code: "id=\"goal\"", meaning: "قيمة فريدة على العنصر المقصود؛ لا تكررها على عنصر آخر في المستند." },
          { code: "#goal", meaning: "محدد CSS يبدأ بعلامة # ليختار العنصر الذي يحمل id بهذه القيمة." },
          { code: "href=\"#goal\"", meaning: "رابط داخلي يقفز إلى العنصر نفسه، إذا طابقت الكلمتان بعضهما." }
        ],
        steps: [
          { title: "اكتب هدفًا يخصك", explanation: "النص داخل العنوان هو محتوى مرئي؛ id يظل اسمًا تقنيًا ثابتًا لا يحتاج أن يطابق الجملة.", from: "هدفي الحالي", to: "خطوتي التالية", task: "غيّر العنوان إلى «خطوتي التالية»، ثم شغّل ولاحظ أن الرابط ما زال يشير إلى العنصر نفسه." },
          { title: "حدّث الجملة داخل الهدف", explanation: "الفقرة داخل section نفسها. تعديلها لا يغيّر id أو محدد CSS.", from: "أجرّب تعديلًا صغيرًا وألاحظ النتيجة.", to: "أكتب سطرًا ثم أختبره بنفسي.", task: "استبدل جملة الفقرة بـ«أكتب سطرًا ثم أختبره بنفسي.» ثم شغّل." },
          { title: "لاحظ محدد id في CSS", explanation: "المحدد #goal يطابق العنصر الذي يحمل id=\"goal\" وحده. النقطة في class والهاش في id عند كتابة محدد CSS.", from: "background: #eaf3e9;", to: "background: #fff0c2;", task: "بدّل لون خلفية الهدف إلى #fff0c2، ثم شغّل. القاعدة ما زالت تختار العنصر ذي id=goal وحده." }
        ]
      },
      "HTML Buttons": {
        reference: "https://www.w3schools.com/html/html_buttons.asp",
        concept: "button عنصر قابل للنقر، لكنه لا ينفذ فعلًا من تلقاء نفسه. يمكن إضافة إجراء له، أو تعطيله، وتحديد نوعه حتى يعرف المتصفح هل هو زر عادي أم إرسال أو مسح نموذج.",
        flow: "ضغط الزر ⟶ حدث onclick ⟶ تحديث الرسالة في الصفحة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>زر يغيّر رسالة</title>\n  <style>button { padding: 9px 14px; margin: 4px; }</style>\n</head>\n<body>\n  <h1>تجربة الزر</h1>\n  <button type=\"button\" onclick=\"document.getElementById('result').textContent='نفّذت نقرة واحدة';\">اعرض رسالة</button>\n  <button type=\"button\">زر غير متاح</button>\n  <p id=\"result\">اضغط الزر الأول.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<button>", meaning: "ينشئ مساحة زر يمكن للمستخدم النقر عليها أو الوصول إليها بلوحة المفاتيح." },
          { code: "type=\"button\"", meaning: "زر عادي لا يرسل نموذجًا تلقائيًا." },
          { code: "onclick=\"...\"", meaning: "إجراء يحدث عند النقر؛ المثال يختار فقرة ويغيّر نصها." },
          { code: "disabled", meaning: "صفة تمنع النقر على الزر حتى تزال أو تتغير حالته." }
        ],
        steps: [
          { title: "سمِّ الزر بما يفعله", explanation: "النص بين وسمَي button هو التسمية التي يراها المستخدم؛ غيّره من غير لمس الإجراء.", from: "اعرض رسالة", to: "ابدأ التجربة", task: "غيّر تسمية الزر إلى «ابدأ التجربة»، ثم شغّل واضغطه لتشاهد الرسالة." },
          { title: "بدّل نتيجة النقر", explanation: "النص داخل onclick هو القيمة التي ستوضع في العنصر ذي id=result عند الضغط.", from: "نفّذت نقرة واحدة", to: "ظهرت نتيجة الزر", task: "غيّر رسالة onclick إلى «ظهرت نتيجة الزر»، ثم شغّل واضغط الزر الأول." },
          { title: "عطّل الزر الثاني", explanation: "إضافة disabled تمنع التفاعل. اترك type كما هو، وقارن استجابة الزرين.", from: "<button type=\"button\">زر غير متاح</button>", to: "<button type=\"button\" disabled>زر غير متاح</button>", task: "أضف disabled إلى الزر الثاني، ثم شغّل وحاول الضغط عليه وقارنه بالزر الأول." }
        ]
      },
      "HTML Iframes": {
        reference: "https://www.w3schools.com/html/html_iframe.asp",
        concept: "iframe نافذة صغيرة داخل صفحتك تعرض مستندًا آخر. srcdoc يسمح بتجربة مستند قصير مباشرة، وtitle يشرح محتوى النافذة لقارئ الشاشة.",
        flow: "iframe ⟶ مستند مستقل داخل الصفحة ⟶ title يصفه وwidth/height يحددان مساحته",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحة داخل صفحة</title>\n  <style>iframe { max-width: 100%; border: 2px solid #8ba493; }</style>\n</head>\n<body>\n  <h1>نافذة داخل الصفحة</h1>\n  <iframe srcdoc=\"<h2>صفحة داخل الإطار</h2><p>محتوى تجريبي مستقل.</p>\" title=\"محتوى تجريبي داخل إطار\" width=\"360\" height=\"150\"></iframe>\n  <p>الإطار له مساحة وعنوان يشرح محتواه.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<iframe>", meaning: "عنصر يضم نافذة لمستند آخر داخل الصفحة الحالية." },
          { code: "srcdoc", meaning: "محتوى HTML قصير يعرضه الإطار كتجربة داخلية." },
          { code: "title", meaning: "وصف نصي ضروري لمساعدة قارئ الشاشة على فهم محتوى الإطار." },
          { code: "width وheight", meaning: "عرض وارتفاع نافذة المستند بالبكسل في هذا المثال." }
        ],
        steps: [
          { title: "اكتب وصفًا دقيقًا للإطار", explanation: "title يصف المستند المحاط، وليس عنوان الصفحة الخارجية.", from: "title=\"محتوى تجريبي داخل إطار\"", to: "title=\"مثال صفحة داخل نافذة\"", task: "غيّر title إلى «مثال صفحة داخل نافذة»، ثم شغّل وحدد العنصر الذي يحمل هذا الوصف." },
          { title: "وسّع النافذة قليلًا", explanation: "العرض والارتفاع يحددان مساحة المستند الداخلي. عدّل العرض وحده لتلاحظ الفرق.", from: "width=\"360\"", to: "width=\"420\"", task: "ارفع width إلى 420، ثم شغّل وقارن المساحة المتاحة داخل الإطار." },
          { title: "عدّل محتوى المستند الداخلي", explanation: "النص بين علامات اقتباس srcdoc هو مستند صغير آخر. كل ما فيه يظهر داخل النافذة، لا خارجها.", from: "محتوى تجريبي مستقل.", to: "هذه الصفحة تعيش داخل إطار مستقل.", task: "غيّر جملة srcdoc إلى «هذه الصفحة تعيش داخل إطار مستقل.» ثم شغّل ولاحظ أي فقرة تغيرت." }
        ]
      },
      "HTML JavaScript": {
        reference: "https://www.w3schools.com/html/html_scripts.asp",
        concept: "HTML يبني العنصر، وJavaScript ينفذ فعلًا عليه بعد حدث مثل النقر. يمكن للسكربت اختيار عنصر بمعرّفه ثم تغيير نصه أو شكله.",
        flow: "نقرة على button ⟶ JavaScript يختار #result ⟶ تتغير الجملة الظاهرة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>HTML مع JavaScript</title>\n</head>\n<body>\n  <h1>جرّب التفاعل</h1>\n  <button type=\"button\" onclick=\"showMessage()\">غيّر الرسالة</button>\n  <p id=\"result\">لم تضغط الزر بعد.</p>\n  <script>\n    function showMessage() {\n      document.getElementById(\"result\").textContent = \"وصلت الرسالة إلى الصفحة.\";\n    }\n  </script>\n</body>\n</html>",
        breakdown: [
          { code: "<script> ... </script>", meaning: "المكان الذي يكتب فيه المتصفح أوامر JavaScript في هذا المثال." },
          { code: "onclick=\"showMessage()\"", meaning: "حدث النقر يستدعي الدالة التي تحمل هذا الاسم." },
          { code: "getElementById(\"result\")", meaning: "يبحث عن العنصر الذي يحمل id بالقيمة result." },
          { code: "textContent", meaning: "النص الذي سيضعه الأمر داخل الفقرة بعد النقر." }
        ],
        steps: [
          { title: "غيّر الجملة قبل النقر", explanation: "هذه هي الرسالة الأولية في p. ستتبدل عندما يعمل الأمر داخل الدالة.", from: "لم تضغط الزر بعد.", to: "الرسالة جاهزة للتغيير.", task: "غيّر الجملة الأولية إلى «الرسالة جاهزة للتغيير.» ثم شغّل واضغط الزر." },
          { title: "غيّر ما تكتبه الدالة", explanation: "الدالة تنفذ عند استدعائها. القيمة على يمين = هي النص الجديد الذي يستبدل القديم.", from: "وصلت الرسالة إلى الصفحة.", to: "نفّذت JavaScript هذا التغيير.", task: "بدّل النص داخل الدالة إلى «نفّذت JavaScript هذا التغيير.» ثم شغّل واضغط الزر." },
          { title: "وضّح فعل الزر", explanation: "تسمية button هي وصف الإجراء للمستخدم. الاستدعاء showMessage() ما زال كما هو.", from: "غيّر الرسالة", to: "اعرض النتيجة", task: "غيّر النص الظاهر على الزر إلى «اعرض النتيجة»، ثم شغّل لتتأكد أن الفعل نفسه يعمل." }
        ]
      },
      "HTML File Paths": {
        reference: "https://www.w3schools.com/html/html_filepaths.asp",
        concept: "مسار الملف يشرح للمتصفح مكان الصورة أو الصفحة مقارنة بمجلد الصفحة الحالية. المسار النسبي يتحرك من مكان ملف HTML؛ ../ يصعد مستوى واحدًا، واستخدامه يبقي المشروع صالحًا عند نقله.",
        flow: "مكان index.html + المسار النسبي ⟶ المتصفح يبحث عن الملف في المجلد المتوقع",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>خريطة ملفات صغيرة</title>\n</head>\n<body>\n  <h1>أين يوجد الملف؟</h1>\n  <ul>\n    <li>في المجلد نفسه: <code>picture.jpg</code></li>\n    <li>داخل مجلد images: <code>images/picture.jpg</code></li>\n    <li>في المجلد الأعلى: <code>../picture.jpg</code></li>\n  </ul>\n  <p>جرّب مسار صورة محلية: <img src=\"images/garden.jpg\" alt=\"صورة الحديقة المحلية\" width=\"120\"></p>\n</body>\n</html>",
        breakdown: [
          { code: "picture.jpg", meaning: "الملف في المجلد نفسه الذي يحتوي صفحة HTML." },
          { code: "images/picture.jpg", meaning: "المتصفح يدخل إلى مجلد images الموجود داخل المجلد الحالي." },
          { code: "../picture.jpg", meaning: "الرمزان .. يصعدان من المجلد الحالي إلى المجلد الأب." },
          { code: "src", meaning: "المكان الذي تضع فيه المسار عندما تربط صورة بالصفحة." }
        ],
        steps: [
          { title: "تتبّع مجلد الصور", explanation: "الشرطة المائلة تفصل اسم المجلد عن اسم الملف. اكتب مكان الملف كما هو في بنية المجلدات.", from: "images/picture.jpg", to: "images/cover.jpg", task: "بدّل المثال إلى images/cover.jpg، ثم شغّل واقرأ المسار جزءًا جزءًا." },
          { title: "اصعد مستوى واحدًا", explanation: "../ تعني الرجوع إلى المجلد الأب قبل متابعة بقية المسار.", from: "../picture.jpg", to: "../shared/cover.jpg", task: "غيّر المسار إلى ../shared/cover.jpg، ثم اشرح لنفسك أي مجلد يزوره المتصفح أولًا." },
          { title: "حدّث مسار صورة الصفحة", explanation: "src يستخدم المسار نفسه الذي تدربت عليه. في مشروع حقيقي يجب أن يوجد الملف في المكان والاسم نفسيهما.", from: "src=\"images/garden.jpg\"", to: "src=\"images/first-project.jpg\"", task: "عدّل اسم الملف في src إلى first-project.jpg. لو وضعت الصورة في مجلد images بجوار الصفحة سيجدها المتصفح." }
        ]
      },
      "HTML Head": {
        reference: "https://www.w3schools.com/html/html_head.asp",
        concept: "head حاوية معلومات عن المستند بين html وbody. محتواها عادة لا يظهر في الصفحة، لكنه يجهز الاسم والترميز والوصف والروابط والأنماط والسكربتات.",
        flow: "html ⟶ head يجهز بيانات الصفحة ⟶ body يحمل ما يراه الزائر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"description\" content=\"دفتر تجارب صغيرة في HTML.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>دفتر التجربة</title>\n  <style>body { font-family: Arial, sans-serif; }</style>\n</head>\n<body>\n  <h1>محتوى الصفحة</h1>\n  <p>إعدادات الصفحة موجودة في head؛ هذا المحتوى الظاهر موجود في body.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<head>", meaning: "مكان البيانات الوصفية بين فتح html وبدء body." },
          { code: "meta charset", meaning: "يحدد الترميز حتى تظهر الحروف العربية بصورة صحيحة." },
          { code: "meta name=description", meaning: "يقدم وصفًا مختصرًا لمحتوى الصفحة." },
          { code: "title وstyle", meaning: "الأول يصف المستند في التبويب، والثاني يحمل قواعد تنسيق هذه الصفحة." }
        ],
        steps: [
          { title: "لخّص محتوى الصفحة", explanation: "وصف meta في head لا يظهر كنص داخل body؛ إنه معلومة عن الصفحة.", from: "دفتر تجارب صغيرة في HTML.", to: "صفحة تتعلم فيها عناصر HTML بالتجربة.", task: "غيّر الوصف إلى «صفحة تتعلم فيها عناصر HTML بالتجربة.» ثم شغّل وحدد مكانه." },
          { title: "سمِّ المستند", explanation: "title نص داخل head، ويكون اسم المستند في تبويب المتصفح. h1 منفصل ويظهر داخل الصفحة.", from: "<title>دفتر التجربة</title>", to: "<title>ملاحظات HTML</title>", task: "غيّر title إلى «ملاحظات HTML»، ثم شغّل وقارنه بعنوان h1 المرئي." },
          { title: "أضف بيانات الكاتب", explanation: "يمكن أن يحتوي head أكثر من عنصر meta؛ كل عنصر يحمل معلومة مستقلة باسم وقيمة.", from: "  <meta name=\"description\"", to: "  <meta name=\"author\" content=\"متعلم الويب\">\n  <meta name=\"description\"", task: "أضف meta للكاتب قبل الوصف، ثم شغّل وتأكد أن الإعداد الجديد داخل head." }
        ]
      },
      "HTML Layout": {
        reference: "https://www.w3schools.com/html/html_layout.asp",
        concept: "تقسيم الصفحة إلى header وnav وmain وsection وaside وfooter يصف وظيفة كل منطقة. هذا الهيكل يرشد القارئ والأدوات المساعدة، بينما CSS هو الذي يحدد ترتيبها البصري.",
        flow: "header للتقديم ⟶ nav للتنقل ⟶ main للمحتوى ⟶ footer للمعلومات الختامية",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>مخطط صفحة</title>\n  <style>header, nav, main, aside, footer { padding: 10px; margin: 6px 0; background: #eef4eb; }</style>\n</head>\n<body>\n  <header><h1>دفتر الرحلة</h1></header>\n  <nav><a href=\"#stories\">الحكايات</a></nav>\n  <main id=\"stories\">\n    <section><h2>المحتوى الرئيسي</h2><p>قصة قصيرة من تجربتي.</p></section>\n    <aside>ملاحظة جانبية مفيدة.</aside>\n  </main>\n  <footer>حقوق الصفحة لصاحبها.</footer>\n</body>\n</html>",
        breakdown: [
          { code: "<header>", meaning: "مقدمة للصفحة أو للقسم وقد تحتوي عنوانًا أو روابط." },
          { code: "<nav>", meaning: "مجموعة روابط تساعد على الانتقال بين أجزاء الصفحة." },
          { code: "<main>", meaning: "المحتوى الرئيسي الفريد للصفحة." },
          { code: "<section> و<aside>", meaning: "الأولى تجمع موضوعًا مترابطًا، والثانية تحمل ملاحظة جانبية." },
          { code: "<footer>", meaning: "معلومات ختامية للصفحة أو للقسم." }
        ],
        steps: [
          { title: "اكتب عنوان المساحة", explanation: "عنوان header يعرّف بداية الصفحة. تغييره لا يبدّل دور المنطقة نفسها.", from: "دفتر الرحلة", to: "مساحة تعلّمي", task: "بدّل العنوان إلى «مساحة تعلّمي»، ثم شغّل وحدد المنطقة التي تحتويه." },
          { title: "غيّر ملاحظة الجانب", explanation: "aside يبقى منفصلًا عن القسم الرئيسي لأنه يقدم معلومة جانبية.", from: "ملاحظة جانبية مفيدة.", to: "تذكير: خطوة واحدة تكفي.", task: "غيّر محتوى aside إلى «تذكير: خطوة واحدة تكفي.» ثم شغّل ولاحظ مكانه في الهيكل." },
          { title: "أضف قسمًا للمشاريع", explanation: "section يجمع موضوعًا له عنوان داخل main. أضف المجموعة قبل إغلاق main حتى تظل ضمن المحتوى الرئيسي.", from: "    <aside>تذكير: خطوة واحدة تكفي.</aside>\n  </main>", to: "    <aside>تذكير: خطوة واحدة تكفي.</aside>\n    <section><h2>مشاريعي</h2><p>أضيف تجربة جديدة كلما تعلمت.</p></section>\n  </main>", task: "أضف قسم «مشاريعي» قبل إغلاق main، ثم شغّل وتأكد أنه داخل المحتوى الرئيسي." }
        ]
      },
      "HTML Responsive": {
        reference: "https://www.w3schools.com/html/html_responsive.asp",
        concept: "التصميم المتجاوب يجعل المحتوى مناسبًا لمقاسات شاشات مختلفة. viewport يضبط مساحة العرض على الهاتف، والصورة المرنة لا تتجاوز عرض الحاوية، ويمكن لوسائط CSS تبديل الأعمدة عند نقطة مناسبة.",
        flow: "حجم شاشة مختلف ⟶ viewport يضبط القياس ⟶ CSS يعيد ترتيب المساحة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <!-- أضف إعداد viewport هنا -->\n  <title>بطاقات تتسع للشاشة</title>\n  <style>\n    .cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n    .card { padding: 10px; background: #eaf3e9; }\n    @media (max-width: 560px) { .cards { grid-template-columns: 1fr; } }\n    img { max-width: 100%; height: auto; }\n  </style>\n</head>\n<body>\n  <h1>مساحة تناسب الشاشة</h1>\n  <div class=\"cards\"><div class=\"card\">HTML</div><div class=\"card\">CSS</div></div>\n  <p>صغّر نافذة العرض لتلاحظ تبدل الأعمدة.</p>\n</body>\n</html>",
        breakdown: [
          { code: "meta name=\"viewport\"", meaning: "يخبر المتصفح أن عرض الصفحة يساوي عرض الجهاز وأن مقياس البداية طبيعي." },
          { code: "@media (max-width: 560px)", meaning: "يطبق القواعد عندما تصبح مساحة العرض 560 بكسل أو أقل." },
          { code: "grid-template-columns", meaning: "قيمة repeat(2, 1fr) تعرض عمودين، و1fr واحد يجعل كل بطاقة في صف." },
          { code: "max-width: 100%", meaning: "يمنع الصورة من تجاوز عرض الحاوية." }
        ],
        steps: [
          { title: "أضف إعداد شاشة الهاتف", explanation: "وسم viewport يعيش في head. القيمة تجعل عرض الصفحة يتبع عرض الجهاز بدل عرض افتراضي واسع.", from: "  <!-- أضف إعداد viewport هنا -->", to: "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", task: "استبدل التعليق بوسم viewport، ثم شغّل وتأكد أن الوسم بقي داخل head." },
          { title: "وسّع نقطة التحول", explanation: "max-width هي نقطة تتحول عندها القاعدة إلى صف واحد. الرقم يقاس بالبكسل.", from: "max-width: 560px", to: "max-width: 720px", task: "غيّر نقطة التحول إلى 720px، ثم شغّل ولاحظ أن ترتيب العمود الواحد يبدأ عند مساحة أوسع." },
          { title: "اجعل الصور تتبع الحاوية", explanation: "max-width تمنع الصورة من التمدد أكثر من مساحتها، وheight:auto يحافظ على تناسبها.", from: "img { max-width: 100%; height: auto; }", to: "img { max-width: 90%; height: auto; }", task: "قلّل أقصى عرض للصورة إلى 90%، ثم شغّل. الصورة الآن تترك هامشًا داخل الحاوية." }
        ]
      },
      "HTML Computer Code": {
        reference: "https://www.w3schools.com/html/html_computercode_elements.asp",
        concept: "تصف عناصر code وkbd وsamp وvar نوع النص للقارئ والمتصفح: كود، إدخال لوحة مفاتيح، ناتج برنامج، أو متغير. pre يحافظ على المسافات والأسطر عند عرض كتلة كود.",
        flow: "نوع المعلومة ⟶ عنصر HTML المناسب ⟶ عرض ومعنى أوضح للقارئ",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>عرض الكود والناتج</title>\n</head>\n<body>\n  <h1>أجزاء من تجربة برمجية</h1>\n  <p>احفظ الملف بالضغط على <kbd>Ctrl + S</kbd>.</p>\n  <pre><code>let total = 5;\nconsole.log(total);</code></pre>\n  <p>رسالة البرنامج: <samp>5</samp></p>\n  <p>القيمة التي نحسبها: <var>total</var></p>\n</body>\n</html>",
        breakdown: [
          { code: "<kbd>", meaning: "يحدد ما يضغطه المستخدم من مفاتيح لوحة المفاتيح." },
          { code: "<code>", meaning: "يحيط بجزء من شيفرة حاسوبية، ويعرضه المتصفح عادة بخط ثابت العرض." },
          { code: "<pre>", meaning: "يحافظ على المسافات والأسطر المكتوبة داخله، بعكس code وحده." },
          { code: "<samp> و<var>", meaning: "الأول لناتج البرنامج، والثاني لاسم متغير أو قيمة رياضية." }
        ],
        steps: [
          { title: "عدّل قيمة الكود", explanation: "السطر بين code يعرض مثالًا على الشيفرة. لا تنفذه الصفحة؛ العنصر يصفه كنص كود.", from: "let total = 5;", to: "let total = 8;", task: "غيّر القيمة إلى 8، ثم شغّل ولاحظ شكل الكود داخل المساحة المحفوظة الأسطر." },
          { title: "طابق الناتج مع القيمة", explanation: "samp يمثل النص الذي ظهر كخرج من البرنامج؛ عدّل القيمة الظاهرة حتى تطابق تجربة المثال.", from: "<samp>5</samp>", to: "<samp>8</samp>", task: "غيّر ناتج samp إلى 8، ثم شغّل وقارن الكود بالناتج المعروض." },
          { title: "غيّر اختصار لوحة المفاتيح", explanation: "kbd مخصص لإظهار مفاتيح يضغطها المستخدم، لا لكتابة ناتج البرنامج.", from: "Ctrl + S", to: "Ctrl + Shift + S", task: "عدّل الاختصار إلى Ctrl + Shift + S، ثم شغّل وحدد عنصر kbd في السطر." }
        ]
      },
      "HTML Semantics": {
        reference: "https://www.w3schools.com/html/html5_semantic_elements.asp",
        concept: "العنصر الدلالي يشرح نوع المحتوى ووظيفته، مثل article لمحتوى مستقل وnav للتنقل وmain للمحتوى الأساسي. div حاوية عامة؛ نختار العنصر الذي يصف المعنى عندما يكون مناسبًا.",
        flow: "نوع المحتوى ⟶ عنصر دلالي مناسب ⟶ بنية أسهل للفهم والتنقل",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>خبر في صفحة دلالية</title>\n</head>\n<body>\n  <header><h1>مجلة الخطوات</h1></header>\n  <nav><a href=\"#story\">اقرأ الخبر</a></nav>\n  <main>\n    <div id=\"story\">\n      <h2>أول تجربة ناجحة</h2>\n      <p>تغيير صغير جعل الفكرة أوضح.</p>\n    </div>\n  </main>\n  <footer>نهاية الخبر.</footer>\n</body>\n</html>",
        breakdown: [
          { code: "<header>", meaning: "منطقة تعريف أو مقدمة للصفحة أو للمقال." },
          { code: "<nav>", meaning: "منطقة مخصصة لمجموعة روابط التنقل." },
          { code: "<main>", meaning: "يحمل المحتوى الرئيسي الفريد في الصفحة." },
          { code: "<article>", meaning: "قطعة مستقلة يمكن فهمها كمحتوى قائم بذاته، مثل خبر أو تدوينة." },
          { code: "<footer>", meaning: "معلومات ختامية للصفحة أو المحتوى." }
        ],
        steps: [
          { title: "اكتب عنوانًا يصف الخبر", explanation: "العنوان داخل article يتبع الخبر. يمكنك تغيير النص مع إبقاء العنصر الذي يصفه كما هو.", from: "أول تجربة ناجحة", to: "بطاقة الصفحة الأولى", task: "غيّر h2 إلى «بطاقة الصفحة الأولى»، ثم شغّل وحدد المقال الذي يضم العنوان." },
          { title: "أضف تفاصيل للخبر", explanation: "article يجمع العنوان والفقرة لأنهما جزءان من محتوى مستقل واحد.", from: "تغيير صغير جعل الفكرة أوضح.", to: "جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة.", task: "استبدل الفقرة بالتفصيل الجديد، ثم شغّل وتابع بقاءها داخل article." },
          { title: "اختر عنصرًا يصف المحتوى", explanation: "المقطع يحول حاوية عامة إلى article لأن المحتوى خبر مستقل. يتغير الاسم في البداية والنهاية معًا.", from: "    <div id=\"story\">\n      <h2>بطاقة الصفحة الأولى</h2>\n      <p>جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة.</p>\n    </div>", to: "    <article id=\"story\">\n      <h2>بطاقة الصفحة الأولى</h2>\n      <p>جرّبت تعديلًا واحدًا، ثم شاهدت النتيجة مباشرة.</p>\n    </article>", task: "استبدل div بـarticle في المقطع المحدد، ثم شغّل. وظيفة المحتوى أصبحت واضحة من اسم العنصر." }
        ]
      },
      "HTML Style Guide": {
        reference: "https://www.w3schools.com/html/html5_syntax.asp",
        concept: "تنسيق الكود بشكل ثابت يساعدك على قراءته واكتشاف الأخطاء. ابدأ بنوع المستند، واستخدم أسماء صغيرة، واقتبس القيم، وأغلق العناصر التي تحتاج إغلاقًا، وافصل المجموعات بمسافات بادئة واضحة.",
        flow: "قواعد كتابة ثابتة ⟶ كود مرتب ⟶ قراءة وتعديل أسهل",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحة مرتبة</title>\n</head>\n<body>\n  <h1>أفكار اليوم</h1>\n  <p>أكتب كل عنصر في سطر واضح.</p>\n  <p>وأقتبس قيم السمات دائمًا.</p>\n</body>\n</html>",
        breakdown: [
          { code: "<!DOCTYPE html>", meaning: "إعلان نوع المستند في السطر الأول." },
          { code: "أسماء صغيرة", meaning: "أسماء الوسوم والسمات بالأحرف الصغيرة أسهل قراءة واتساقًا." },
          { code: "lang=\"ar\"", meaning: "قيمة السمة بين اقتباسين، وتصف لغة المحتوى." },
          { code: "المسافات البادئة", meaning: "توضح أي العناصر داخل body وأيها على المستوى نفسه." }
        ],
        steps: [
          { title: "اكتب جملة أوضح", explanation: "غيّر محتوى الفقرة مع ترك الوسوم وإغلاقها؛ الشكل المنتظم يجعل مكان النص واضحًا.", from: "أكتب كل عنصر في سطر واضح.", to: "أرتب الصفحة حتى أقرأها بسهولة.", task: "استبدل جملة الفقرة بالأوضح لك، ثم شغّل وتأكد أن الوسمين بقيا حول النص." },
          { title: "رتّب الجملة الثانية", explanation: "كل فقرة تبدأ في سطر مستقل وتغلق قبل بدء الفقرة التالية.", from: "وأقتبس قيم السمات دائمًا.", to: "وأستخدم أسماء صغيرة للوسوم.", task: "حدّث نص الفقرة الثانية، ثم شغّل وعدّ عناصر p في body." },
          { title: "أضف فقرة بنفس النمط", explanation: "حافظ على ترتيب الوسم والمسافات البادئة. السطر الجديد ينتمي داخل body وبمستوى فقرات الصفحة.", from: "</body>", to: "  <p>أراجع السطر بعد كتابته.</p>\n</body>", task: "أضف الفقرة قبل body المغلق، ثم شغّل وتأكد أن لها بداية ونهاية واضحتين." }
        ]
      },
      "HTML Entities": {
        reference: "https://www.w3schools.com/html/html_entities.asp",
        concept: "بعض العلامات لها معنى خاص في HTML؛ مثل < و> اللذين يحيطان بالوسوم. الكيان النصي مثل &lt; يطلب من المتصفح عرض العلامة نفسها كنص بدل تفسيرها كوسم.",
        flow: "كيان يبدأ بـ & وينتهي بـ ; ⟶ المتصفح يعرض الحرف المقصود",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>علامات داخل النص</title>\n</head>\n<body>\n  <h1>أمثلة على كيانات HTML</h1>\n  <p>الرمز &lt; يسبق الرمز &gt;.</p>\n  <p>حقوق الصفحة &copy; 2026</p>\n  <p>المسافة غير القابلة للكسر: HTML&nbsp;أساسيات</p>\n</body>\n</html>",
        breakdown: [
          { code: "&lt;", meaning: "اسم الكيان الذي يعرض علامة أصغر من كنص." },
          { code: "&gt;", meaning: "كيان يعرض علامة أكبر من كنص." },
          { code: "&copy;", meaning: "كيان اسمه يطلب علامة حقوق النشر؛ يمكن استخدام رقم الحرف أيضًا." },
          { code: "&nbsp;", meaning: "مسافة تمنع المتصفح من فصل الكلمتين عند نهاية السطر." }
        ],
        steps: [
          { title: "اعكس العلامة في الجملة", explanation: "كيان &gt; يظهر كعلامة أكبر من، لكنه لا يبدأ وسم HTML.", from: "&gt;", to: "&lt;", task: "بدّل الكيان &gt; إلى &lt; ثم شغّل. ستظهر العلامة المقصودة كنص داخل الفقرة." },
          { title: "استخدم رقم الحرف", explanation: "يمكن كتابة بعض الكيانات برقم عشري يبدأ بـ &# وينتهي بفاصلة منقوطة.", from: "&copy;", to: "&#169;", task: "استبدل اسم الكيان برقم 169، ثم شغّل وقارن العلامة المعروضة." },
          { title: "اجمع كلمتين بمسافة ثابتة", explanation: "&nbsp; تظهر مسافة لا ينقسم عندها النص إلى سطرين بين الكلمتين.", from: "HTML&nbsp;أساسيات", to: "HTML&nbsp;للمبتدئين", task: "غيّر الكلمة الثانية فقط إلى «للمبتدئين»، ثم شغّل ولاحظ بقاء الكيان بين الكلمتين." }
        ]
      },
      "HTML Symbols": {
        reference: "https://www.w3schools.com/html/html_symbols.asp",
        concept: "يمكن كتابة رمز غير موجود على لوحة المفاتيح باسم كيان أو برقم عشري أو سداسي. الاسم يقرأه الإنسان بسهولة، والرقم يحدد حرفًا بعينه.",
        flow: "اسم كيان أو رقم يبدأ بـ &# ⟶ المتصفح يرسم الرمز",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>رموز في السطر</title>\n</head>\n<body>\n  <h1>رموز يمكن عرضها</h1>\n  <p>السعر: &euro; 12</p>\n  <p>انتقل إلى الخطوة التالية: &#8594;</p>\n  <p>إشارة صغيرة: &hearts;</p>\n</body>\n</html>",
        breakdown: [
          { code: "&euro;", meaning: "اسم كيان لعلامة اليورو." },
          { code: "&#8594;", meaning: "رقم عشري لحرف السهم إلى اليمين؛ تبدأ الأرقام بـ &#." },
          { code: "&hearts;", meaning: "اسم كيان للقلب؛ يجب أن ينتهي الاسم بعلامة الفاصلة المنقوطة." }
        ],
        steps: [
          { title: "بدّل رمز العملة", explanation: "اسم الرمز في الكود يحدد الحرف الظاهر؛ القيمة العددية تظل منفصلة عن الرقم المكتوب بعده.", from: "&euro;", to: "&pound;", task: "استبدل اليورو بكيان الجنيه &pound; ثم شغّل وشاهد الرمز في بداية السعر." },
          { title: "غيّر اتجاه السهم", explanation: "كل رقم يحدد رمزًا بعينه. رقم 8594 هو سهم إلى اليمين؛ 8592 يشير إلى اليسار.", from: "&#8594;", to: "&#8592;", task: "غيّر رقم السهم إلى 8592 ثم شغّل لتلاحظ انتقال الاتجاه." },
          { title: "اكتب علامة مسجلة", explanation: "اسم الكيان بديل عن رقم الرمز؛ مثل &reg; للعلامة المسجلة.", from: "&hearts;", to: "&reg;", task: "استبدل القلب بالكيان &reg; ثم شغّل وحدد الفرق بين الاسم والرقم في المثال." }
        ]
      },
      "HTML Emojis": {
        reference: "https://www.w3schools.com/html/html_emojis.asp",
        concept: "الرموز التعبيرية أحرف Unicode وليست صورًا داخل HTML. ملف UTF-8 يسمح بعرض العربية والرموز، ويمكن كتابة بعض الرموز مباشرة أو كرقم حرف.",
        flow: "UTF-8 يصف ترميز المستند ⟶ حرف Unicode ⟶ المتصفح يعرض الرمز",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>رموز تعبّر عن التقدم</title>\n  <style>.emoji { font-size: 42px; }</style>\n</head>\n<body>\n  <h1>رمز اليوم</h1>\n  <p class=\"emoji\">🌱</p>\n  <p>رقم الرمز نفسه يمكن كتابته هكذا: &#127793;</p>\n</body>\n</html>",
        breakdown: [
          { code: "meta charset=\"UTF-8\"", meaning: "يحدد الترميز الذي يقرأ به المتصفح حروف الصفحة." },
          { code: "🌱", meaning: "حرف Unicode مكتوب مباشرة داخل النص." },
          { code: "&#127793;", meaning: "صيغة رقمية للرمز نفسه؛ تبدأ بـ &# وتنتهي بـ ;." },
          { code: "font-size", meaning: "خاصية CSS تكبر عرض الحرف كما تكبر النص." }
        ],
        steps: [
          { title: "اختر رمزًا من لوحة المفاتيح", explanation: "يمكن إدخال الرمز مثل أي حرف نصي، ثم يختار الجهاز طريقة رسمه.", from: "🌱", to: "✨", task: "بدّل رمز النمو إلى ✨ ثم شغّل ولاحظ أنه حرف مرئي داخل الفقرة." },
          { title: "كبّر الرمز", explanation: "الرمز ليس صورة؛ font-size يغيّر حجم عرضه مثل النص.", from: "font-size: 42px;", to: "font-size: 56px;", task: "ارفع الحجم إلى 56px ثم شغّل وقارن الرمز بالنص العادي." },
          { title: "اكتب الصيغة الرقمية", explanation: "الرقم 127793 يمثل رمز النبتة. الصيغة الرقمية تساعد عندما يصعب إدخال الرمز مباشرة.", from: "&#127793;", to: "&#10024;", task: "غيّر رقم الكيان إلى 10024 ثم شغّل وقارن الرمز الناتج مع الرمز المباشر." }
        ]
      },
      "HTML Charset": {
        reference: "https://www.w3schools.com/html/html_charset.asp",
        concept: "ترميز الحروف يخبر المتصفح كيف يحوّل البايتات في الملف إلى أحرف. UTF-8 يغطي معظم اللغات والرموز، لذلك نعلنه مبكرًا داخل head.",
        flow: "ملف محفوظ بترميز ⟶ meta charset يعرّف المتصفح ⟶ حروف مفهومة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>حروف عربية ورموز</title>\n</head>\n<body>\n  <h1>صفحة متعددة الحروف</h1>\n  <p>العربية: خطوة صغيرة تصنع فرقًا.</p>\n  <p>رموز: € — © — 🌱</p>\n</body>\n</html>",
        breakdown: [
          { code: "charset", meaning: "اسم السمة التي تصف ترميز الأحرف في المستند." },
          { code: "UTF-8", meaning: "ترميز شائع يغطي العربية وعددًا كبيرًا من الحروف والرموز." },
          { code: "meta", meaning: "عنصر بيانات يوضع في head ولا يظهر كنص في body." }
        ],
        steps: [
          { title: "اكتب جملة عربية أخرى", explanation: "عندما يعرف المتصفح الترميز مبكرًا، يستطيع تفسير حروف النص على نحو صحيح.", from: "العربية: خطوة صغيرة تصنع فرقًا.", to: "العربية: أجرّب ثم ألاحظ النتيجة.", task: "بدّل جملة العربية إلى «أجرّب ثم ألاحظ النتيجة.» ثم شغّل." },
          { title: "أضف رمزًا للمجموعة", explanation: "UTF-8 لا يقتصر على الحروف؛ يمكن أن يحمل رموزًا وعلامات أيضًا.", from: "€ — © — 🌱", to: "€ — © — 🎯", task: "غيّر الرمز الأخير إلى 🎯 ثم شغّل وشاهد الرموز إلى جانب العربية." },
          { title: "تأكد من مكان تعريف الترميز", explanation: "meta charset ينبغي أن يسبق نص الصفحة داخل head حتى يعرف المتصفح طريقة قراءة المحتوى.", from: "  <meta charset=\"UTF-8\">", to: "  <meta charset=\"UTF-8\">\n  <meta name=\"description\" content=\"صفحة عربية بترميز واضح.\">", task: "أضف وصف الصفحة بعد charset كما في المقطع، ثم شغّل وتأكد أن بيانات الصفحة ما زالت داخل head." }
        ]
      },
      "HTML URL Encode": {
        reference: "https://www.w3schools.com/html/html_urlencode.asp",
        concept: "عنوان URL له أجزاء وعلامات خاصة مثل ? و& و#. ترميز URL يكتب الأحرف غير المسموحة بصيغة % متبوعة بأرقام ست عشرية حتى لا تختلط العلامة بتركيب العنوان.",
        flow: "حرف خاص داخل قيمة ⟶ % ورقمان ست عشريان ⟶ عنوان يمكن نقله",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>أجزاء عنوان الويب</title>\n</head>\n<body>\n  <h1>اقرأ عنوان البحث</h1>\n  <p>المسافة في قيمة البحث: <code>html%20basics</code></p>\n  <p>علامة # داخل قيمة: <code>%23section</code></p>\n  <p>علامة &amp; تفصل القيم في العنوان.</p>\n</body>\n</html>",
        breakdown: [
          { code: "?", meaning: "تبدأ بعدها عادةً مجموعة قيم البحث في URL." },
          { code: "%20", meaning: "ترميز شائع للمسافة في URL؛ وقد تظهر المسافة كـ + في بيانات النماذج." },
          { code: "%23", meaning: "ترميز علامة # عندما تكون جزءًا من قيمة بدل أن تبدأ إشارة إلى موضع." },
          { code: "%26", meaning: "ترميز علامة & عندما تكون حرفًا داخل قيمة وليس فاصلًا بين قيمتين." }
        ],
        steps: [
          { title: "غيّر ترميز المسافة", explanation: "المسافة قد تكتب %20، وفي بيانات النماذج يمكن أن تمثلها +.", from: "html%20basics", to: "html+basics", task: "بدّل %20 بعلامة + في المثال ثم شغّل وقارن الصيغتين." },
          { title: "رمّز علامة الفصل", explanation: "& تفصل عادة بين قيم URL. إذا كانت جزءًا من قيمة نفسها فاكتب %26.", from: "%23section", to: "%26section", task: "غيّر العلامة إلى %26 لتمثل & داخل قيمة، ثم شغّل." },
          { title: "صف دور علامة الفصل", explanation: "& تفصل عادة بين قيم URL؛ وعند عرضها كنص داخل HTML نكتب &amp;.", from: "&amp; تفصل القيم في العنوان.", to: "&amp; تفصل حقول البحث.", task: "غيّر الجملة إلى «&amp; تفصل حقول البحث.» ثم شغّل، ولاحظ أن المتصفح يعرض علامة & كنص." }
        ]
      },
      "HTML vs. XHTML": {
        reference: "https://www.w3schools.com/html/html_xhtml.asp",
        concept: "XHTML صيغة أكثر صرامة مبنية على قواعد XML. تتطلب كتابة منظمة وإغلاق العناصر واقتباس القيم؛ أما HTML الحديث فيقبل عناصر فارغة مثل img من دون وسم إغلاق، مع أن التنظيم الجيد مفيد في الحالتين.",
        flow: "HTML مرن في بعض الصيغ ⟶ XHTML يطلب بنية أكثر صرامة ⟶ وسوم وسمات مغلقة ومنظمة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>كتابة منظمة</title>\n</head>\n<body>\n  <p>اكتب الوسوم بأحرف صغيرة وأغلق الفقرة.</p>\n  <p>صورة HTML: <img src=\"leaf.png\" alt=\"ورقة نبات\"></p>\n  <p>وفي أسلوب XHTML يمكن إغلاق العنصر الفارغ هكذا: &lt;img /&gt;</p>\n</body>\n</html>",
        breakdown: [
          { code: "DOCTYPE", meaning: "إعلان نوع المستند؛ وجوده أولًا ممارسة سليمة في HTML5." },
          { code: "<p> ... </p>", meaning: "العنصر المحتوي يجب أن يملك وسم بداية ونهاية." },
          { code: "img", meaning: "عنصر فارغ في HTML؛ يمكن أن يظهر / قبل > في صيغة XHTML." },
          { code: "lowercase وquotes", meaning: "توحيد أسماء الوسوم واقتباس القيم يساعد على كتابة صيغة صحيحة وواضحة." }
        ],
        steps: [
          { title: "أغلق الفقرة بوضوح", explanation: "وجود </p> يحدد نهاية محتوى الفقرة قبل بدء التالية.", from: "اكتب الوسوم بأحرف صغيرة وأغلق الفقرة.", to: "أغلق كل عنصر في موضعه الصحيح.", task: "غيّر نص الفقرة إلى «أغلق كل عنصر في موضعه الصحيح.» ثم شغّل." },
          { title: "اكتب وصف الصورة", explanation: "alt معلومة نصية مهمة للصورة، وقيمته محاطة بعلامتي اقتباس.", from: "alt=\"ورقة نبات\"", to: "alt=\"ورقة خضراء صغيرة\"", task: "وسّع وصف alt إلى «ورقة خضراء صغيرة» ثم شغّل." },
          { title: "قارن إغلاق العنصر الفارغ", explanation: "HTML5 يقبل img من دون إغلاق؛ كتابة / قبل > تذكّر بأسلوب XHTML الأكثر صرامة.", from: "<img src=\"leaf.png\" alt=\"ورقة خضراء صغيرة\">", to: "<img src=\"leaf.png\" alt=\"ورقة خضراء صغيرة\" />", task: "أضف الشرطة قبل > كما في المقطع ثم شغّل؛ المتصفح يعرض العنصر في الحالتين." }
        ]
      },
      "HTML Forms": {
        reference: "https://www.w3schools.com/html/html_forms.asp",
        concept: "عنصر form يجمع خانات إدخال مرتبطة بمهمة واحدة. كل خانة لها اسم وقيمة؛ الزر يرسلها عند الإرسال، لذلك نبدأ برؤية الحقول قبل ربطها بخادم.",
        flow: "form يحتوي حقولًا ⟶ المتعلم يكتب قيمة ⟶ زر الإرسال يرسل بيانات الحقول",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>نموذج تواصل</title>\n</head>\n<body>\n  <h1>أرسل اقتراحًا</h1>\n  <form action=\"#\" method=\"get\">\n    <label for=\"idea\">فكرتك:</label>\n    <input id=\"idea\" name=\"idea\" type=\"text\">\n    <button type=\"submit\">إرسال</button>\n  </form>\n</body>\n</html>",
        breakdown: [
          { code: "<form>", meaning: "حاوية تجمع خانات الإدخال وزر الإرسال في نموذج واحد." },
          { code: "<label>", meaning: "نص يعرّف الخانة ويرتبط بها بواسطة for وid." },
          { code: "name=\"idea\"", meaning: "اسم الحقل الذي يرافق قيمته عند إرسال النموذج." },
          { code: "type=\"submit\"", meaning: "يجعل الزر يطلب إرسال النموذج الذي يحتويه." }
        ],
        steps: [
          { title: "سمِّ المهمة", explanation: "العنوان يوضح للزائر ما الذي يجمعه النموذج قبل أن يبدأ الكتابة.", from: "أرسل اقتراحًا", to: "شارك فكرة للموقع", task: "غيّر عنوان h1 إلى «شارك فكرة للموقع» ثم شغّل وشاهد كيف يعرّف النموذج." },
          { title: "أضف خانة ثانية", explanation: "كل input يضيف خانة إدخال داخل الحاوية form. الاسم يميز البيانات لاحقًا.", from: "    <button type=\"submit\">إرسال</button>", to: "    <label for=\"name\">اسمك:</label>\n    <input id=\"name\" name=\"name\" type=\"text\">\n    <button type=\"submit\">إرسال</button>", task: "أضف خانة اسم قبل زر الإرسال كما في المقطع، ثم شغّل وتأكد أن الحقلين داخل النموذج." },
          { title: "اربط النص بالخانة", explanation: "قيمة for يجب أن تطابق id في input؛ غيّر القيمتين معًا حتى يظل النص مرتبطًا بخانته.", from: "<label for=\"idea\">فكرتك:</label>\n    <input id=\"idea\"", to: "<label for=\"suggestion\">فكرتك:</label>\n    <input id=\"suggestion\"", task: "غيّر for وid إلى suggestion معًا، ثم شغّل واضغط كلمة «فكرتك» للتأكد من بقاء الربط." }
        ]
      },
      "HTML Form Attributes": {
        reference: "https://www.w3schools.com/html/html_forms_attributes.asp",
        concept: "خصائص form تضبط وجهة الإرسال وطريقته ومكان ظهور النتيجة. نرى في المثال اسم الوجهة والطريقة داخل وسم البداية، من غير الادعاء أن صفحة الخادم موجودة محليًا.",
        flow: "action يختار الوجهة ⟶ method يختار طريقة الإرسال ⟶ الخادم يعالج البيانات",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>إعداد النموذج</title>\n</head>\n<body>\n  <h1>طلب درس جديد</h1>\n  <form action=\"/suggestions\" method=\"get\" autocomplete=\"on\">\n    <label for=\"topic\">موضوع تقترحه:</label>\n    <input id=\"topic\" name=\"topic\" type=\"text\">\n    <button type=\"submit\">إرسال الاقتراح</button>\n  </form>\n</body>\n</html>",
        breakdown: [
          { code: "action", meaning: "عنوان المورد الذي يستقبل البيانات بعد الإرسال." },
          { code: "method=\"get\"", meaning: "يرسل القيم ضمن عنوان الطلب؛ مناسب لتجربة بيانات بحث عامة." },
          { code: "autocomplete", meaning: "يسمح للمتصفح باقتراح قيم سبق إدخالها." },
          { code: "name", meaning: "من دون name لا تحمل الخانة اسمًا واضحًا ضمن بيانات النموذج." }
        ],
        steps: [
          { title: "غيّر مكان الإرسال", explanation: "action يحمل مسار الوجهة. المثال يشرح الإعداد فقط؛ لا يوجد خادم لهذا المسار في المعاينة.", from: "/suggestions", to: "/ideas", task: "غيّر مسار action إلى /ideas ثم شغّل ولاحظ القيمة داخل وسم form." },
          { title: "أوقف الإكمال المقترح", explanation: "on وoff قيمتان لخاصية autocomplete. الاختيار يغيّر ما يقترحه المتصفح للزائر.", from: "autocomplete=\"on\"", to: "autocomplete=\"off\"", task: "حوّل autocomplete إلى off ثم شغّل. أنت غيّرت إعداد المتصفح، لا شكل الحقل." },
          { title: "قارن طريقة الإرسال", explanation: "method يحدد طريقة الطلب. غيّرها للتعرف على مكان كتابة الإعداد، ثم أعدها إلى get في نموذج بحث عام.", from: "method=\"get\"", to: "method=\"post\"", task: "بدّل get إلى post ثم شغّل. لاحظ أن سطر form هو موضع تحديد طريقة الإرسال." }
        ]
      },
      "HTML Form Elements": {
        reference: "https://www.w3schools.com/html/html_form_elements.asp",
        concept: "النموذج يضم عناصر بأدوار مختلفة: label يشرح، select يعرض اختيارات، textarea يقبل نصًا متعدد الأسطر، وfieldset يجمع حقولًا ذات صلة.",
        flow: "label يشرح الخانة ⟶ select يختار قيمة ⟶ textarea يكتب تفاصيل ⟶ fieldset يجمعها",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>اختيار مسار التعلم</title>\n</head>\n<body>\n  <h1>ما الذي تتعلمه الآن؟</h1>\n  <form action=\"#\">\n    <fieldset>\n      <legend>اختيارك</legend>\n      <label for=\"track\">المسار:</label>\n      <select id=\"track\" name=\"track\">\n        <option>HTML</option>\n        <option>CSS</option>\n      </select>\n      <label for=\"note\">ملاحظة:</label>\n      <textarea id=\"note\" name=\"note\" rows=\"3\"></textarea>\n    </fieldset>\n  </form>\n</body>\n</html>",
        breakdown: [
          { code: "fieldset", meaning: "يجمع الحقول المرتبطة بصريًا ودلاليًا." },
          { code: "legend", meaning: "عنوان المجموعة التي يحيط بها fieldset." },
          { code: "select وoption", meaning: "قائمة اختيار واحدة تحتوي بدائلها." },
          { code: "textarea", meaning: "خانة كتابة متعددة الأسطر؛ rows يحدد ارتفاعًا ابتدائيًا." }
        ],
        steps: [
          { title: "أضف خيار JavaScript", explanation: "كل option يضيف اختيارًا إلى القائمة الموجودة داخل select.", from: "        <option>CSS</option>", to: "        <option>CSS</option>\n        <option>JavaScript</option>", task: "أضف JavaScript كخيار ثالث قبل إغلاق select ثم شغّل وافتح القائمة." },
          { title: "اجعل للمجموعة عنوانًا واضحًا", explanation: "legend هو العنوان الذي يصف مجموعة الحقول داخل fieldset.", from: "<legend>اختيارك</legend>", to: "<legend>اختيار مسار البرمجة</legend>", task: "بدّل عنوان المجموعة إلى «اختيار مسار البرمجة» ثم شغّل ولاحظ مكانه حول الحقول." },
          { title: "وسّع مساحة الملاحظة", explanation: "rows يحدد عدد الأسطر الظاهرة مبدئيًا في textarea.", from: "rows=\"3\"", to: "rows=\"5\"", task: "غيّر rows من 3 إلى 5 ثم شغّل ولاحظ أن خانة الملاحظة أصبحت أعلى." }
        ]
      },
      "HTML Input Types": {
        reference: "https://www.w3schools.com/html/html_form_input_types.asp",
        concept: "عنصر input يأخذ أشكالًا مختلفة حسب type. النص والبريد وكلمة المرور وخانة الاختيار كلها نفس العنصر، لكن المتصفح يضبط طريقة إدخال القيمة.",
        flow: "input ثابت ⟶ type يختار شكل الإدخال ⟶ المتصفح يعرض الأداة المناسبة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>أنواع خانات الإدخال</title>\n</head>\n<body>\n  <h1>بيانات تجربة الدرس</h1>\n  <form action=\"#\">\n    <label for=\"email\">البريد:</label>\n    <input id=\"email\" name=\"email\" type=\"email\">\n    <label for=\"date\">موعد التجربة:</label>\n    <input id=\"date\" name=\"date\" type=\"date\">\n    <label><input type=\"checkbox\" name=\"reminder\"> أريد تذكيرًا</label>\n  </form>\n</body>\n</html>",
        breakdown: [
          { code: "type=\"email\"", meaning: "يخصص الخانة لإدخال عنوان بريد ويتيح للمتصفح التحقق من شكله الأساسي." },
          { code: "type=\"date\"", meaning: "يعرض أداة لاختيار تاريخ بدل كتابة نص عادي في بعض المتصفحات." },
          { code: "type=\"checkbox\"", meaning: "اختيار مستقل يمكن تشغيله أو تركه مغلقًا." },
          { code: "name", meaning: "يحدد المفتاح الذي يحمل قيمة الإدخال عند إرسال النموذج." }
        ],
        steps: [
          { title: "حوّل البريد إلى نص", explanation: "النوع text يقبل نصًا عامًا، بينما email نوع أخص يوفّر تحققًا أوليًا.", from: "type=\"email\"", to: "type=\"text\"", task: "بدّل نوع البريد إلى text ثم شغّل وقارن نوع الخانة. أعد email بعد الملاحظة." },
          { title: "أضف اختيار تقييم", explanation: "النوع number يناسب قيمة رقمية، ويمكن ضبط حدودها بخاصيتي min وmax.", from: "    <label><input type=\"checkbox\" name=\"reminder\"> أريد تذكيرًا</label>", to: "    <label><input type=\"checkbox\" name=\"reminder\"> أريد تذكيرًا</label>\n    <label for=\"rating\">تقييم التجربة من 1 إلى 5:</label>\n    <input id=\"rating\" name=\"rating\" type=\"number\" min=\"1\" max=\"5\">", task: "أضف خانة رقم بعد خيار التذكير، وحدد الحدين 1 و5، ثم شغّل." },
          { title: "اجعل الاختيارات متعددة", explanation: "يمكن تكرار checkbox لكل اختيار مستقل، فيستطيع المستخدم تحديد أكثر من خيار.", from: "type=\"checkbox\"", to: "type=\"radio\"", task: "جرّب تبديل checkbox إلى radio ثم شغّل؛ لاحظ كيف يتغير شكل التحكم. أعد checkbox لأنه مناسب لاختيار مستقل." }
        ]
      },
      "HTML Input Attributes": {
        reference: "https://www.w3schools.com/html/html_form_attributes.asp",
        concept: "خصائص input تضبط القيمة الأولية والطول والحدود والمساعدة والتحقق. الخاصية تهيئ خانة الإدخال، ولا تستبدل نوعها.",
        flow: "input يحدد الخانة ⟶ السمات تضبط قواعدها ⟶ المتصفح يساعد على إدخال قيمة مناسبة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>خصائص حقل الإدخال</title>\n</head>\n<body>\n  <h1>اسم المستخدم</h1>\n  <form action=\"#\">\n    <label for=\"user\">اسم قصير:</label>\n    <input id=\"user\" name=\"user\" type=\"text\" placeholder=\"مثال: نور\" maxlength=\"12\" required>\n    <button type=\"submit\">حفظ</button>\n  </form>\n</body>\n</html>",
        breakdown: [
          { code: "placeholder", meaning: "تلميح قصير يظهر داخل الخانة قبل إدخال القيمة." },
          { code: "maxlength", meaning: "أقصى عدد من الأحرف التي يسمح بإدخالها في الحقل النصي." },
          { code: "required", meaning: "يجعل ملء الخانة شرطًا قبل الإرسال." },
          { code: "value", meaning: "قيمة ابتدائية فعلية للخانة، بخلاف النص التلميحي." }
        ],
        steps: [
          { title: "غيّر التلميح", explanation: "placeholder تلميح داخل الخانة يختفي عند الكتابة، وليس قيمة مرسلة بحد ذاته.", from: "placeholder=\"مثال: نور\"", to: "placeholder=\"اكتب اسمًا من اختيارك\"", task: "غيّر نص placeholder إلى «اكتب اسمًا من اختيارك» ثم شغّل ولاحظ الخانة الفارغة." },
          { title: "زد عدد الأحرف المسموح", explanation: "maxlength يضع حدًا أعلى لطول النص الذي يمكن إدخاله.", from: "maxlength=\"12\"", to: "maxlength=\"20\"", task: "ارفع maxlength إلى 20 ثم شغّل. الحد الجديد يخص طول القيمة المكتوبة." },
          { title: "اجعل الحقل اختياريًا", explanation: "required سمة منطقية؛ وجودها يطلب تعبئة الحقل، وحذفها يزيل هذا الشرط.", from: " maxlength=\"20\" required", to: " maxlength=\"20\"", task: "احذف required من خانة الاسم ثم شغّل؛ قارن السمة التي أزلتها بإعدادات النص." }
        ]
      },
      "HTML Input Form Attributes": {
        reference: "https://www.w3schools.com/html/html_form_attributes_form.asp",
        concept: "يمكن لزر إرسال محدد أن يغيّر وجهة النموذج أو طريقة إرساله بواسطة formaction وformmethod. هذه إعدادات تخص زر الإرسال نفسه.",
        flow: "form يملك إعدادًا أساسيًا ⟶ زر submit يختار تجاوزًا ⟶ الإرسال يستخدم إعداد الزر",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>إعدادات زر الإرسال</title>\n</head>\n<body>\n  <h1>حفظ ملاحظة</h1>\n  <form action=\"/save\" method=\"get\">\n    <label for=\"note\">الملاحظة:</label>\n    <input id=\"note\" name=\"note\" type=\"text\">\n    <button type=\"submit\" formaction=\"/preview\" formmethod=\"get\">معاينة</button>\n  </form>\n</body>\n</html>",
        breakdown: [
          { code: "action", meaning: "وجهة النموذج الافتراضية." },
          { code: "formaction", meaning: "وجهة بديلة يستخدمها زر الإرسال الذي يحملها." },
          { code: "method", meaning: "طريقة الإرسال الافتراضية للنموذج." },
          { code: "formmethod", meaning: "طريقة بديلة مرتبطة بزر submit بعينه." }
        ],
        steps: [
          { title: "غيّر وجهة المعاينة", explanation: "formaction يخص زر المعاينة، ويغلب action الأساسي لهذا الزر عند الإرسال.", from: "formaction=\"/preview\"", to: "formaction=\"/draft\"", task: "غيّر وجهة الزر إلى /draft ثم شغّل وتتبّع الإعداد على عنصر button." },
          { title: "أضف زر الحفظ الأساسي", explanation: "يمكن للنموذج أن يحتوي أكثر من زر؛ الزر بلا formaction يستخدم إعداد form الأساسي.", from: "  </form>", to: "    <button type=\"submit\">حفظ</button>\n  </form>", task: "أضف زر حفظ عاديًا بعد زر المعاينة. قارن غياب formaction فيه بإعداد الزر الأول." },
          { title: "غيّر طريقة زر المعاينة", explanation: "formmethod يحدد طريقة الزر الذي يحمله. غيّر قيمة هذا المثال ولاحظ مكانها بجانب formaction.", from: "formmethod=\"get\"", to: "formmethod=\"post\"", task: "بدّل formmethod إلى post ثم شغّل. بقي method الافتراضي في form كما هو." }
        ]
      },
      "HTML Canvas": {
        reference: "https://www.w3schools.com/html/html5_canvas.asp",
        concept: "canvas مساحة مستطيلة فارغة للرسم. الوسم ينشئ المساحة وأبعادها؛ JavaScript يحصل على سياق الرسم ويضع الأشكال داخلها.",
        flow: "canvas + id وأبعاد ⟶ JavaScript يحصل على السياق ⟶ المستطيل يظهر على المساحة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>لوحة رسم صغيرة</title>\n</head>\n<body>\n  <h1>مربع على اللوحة</h1>\n  <canvas id=\"board\" width=\"240\" height=\"120\" style=\"border:1px solid #777\">متصفحك لا يدعم canvas.</canvas>\n  <script>\n    var board = document.getElementById(\"board\");\n    var ctx = board.getContext(\"2d\");\n    ctx.fillStyle = \"#3578c8\";\n    ctx.fillRect(25, 20, 100, 70);\n  </script>\n</body>\n</html>",
        breakdown: [
          { code: "width وheight", meaning: "أبعاد مساحة الرسم نفسها بوحدات البكسل." },
          { code: "id=\"board\"", meaning: "اسم يستطيع JavaScript استخدامه للعثور على اللوحة." },
          { code: "getContext(\"2d\")", meaning: "يطلب أدوات الرسم ثنائية الأبعاد من مساحة canvas." },
          { code: "fillRect(x, y, w, h)", meaning: "يرسم مستطيلاً ممتلئًا بدءًا من الإحداثيات المحددة." }
        ],
        steps: [
          { title: "غيّر لون المستطيل", explanation: "fillStyle يحدد لون الأشكال الممتلئة التي ترسم بعده.", from: "#3578c8", to: "#21845a", task: "غيّر لون الرسم إلى #21845a ثم شغّل ولاحظ أن اللوحة نفسها لم تتغير." },
          { title: "وسّع مساحة اللوحة", explanation: "سمة width تحدد عرض سطح الرسم. ستظل إحداثيات المستطيل كما هي.", from: "width=\"240\"", to: "width=\"320\"", task: "غيّر العرض من 240 إلى 320 ثم شغّل وقارن حجم مساحة اللوحة بالمستطيل." },
          { title: "حرّك المستطيل لأسفل", explanation: "الرقم الثاني في fillRect هو إحداثي y الذي يبدأ منه الشكل.", from: "fillRect(25, 20, 100, 70)", to: "fillRect(25, 40, 100, 70)", task: "غيّر بداية y من 20 إلى 40 ثم شغّل ولاحظ نزول المستطيل داخل اللوحة." }
        ]
      },
      "HTML SVG": {
        reference: "https://www.w3schools.com/graphics/svg_inhtml.asp",
        concept: "SVG يرسم أشكالًا متجهية بعناصر موصوفة داخل الصفحة. كل شكل يملك إحداثيات وسمات؛ تكبيره لا يفقده دقة البكسلات مثل الصورة النقطية.",
        flow: "svg يحدد مساحة وإحداثيات ⟶ عنصر circle يصف الشكل ⟶ المتصفح يرسمه متجهيًا",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>رسم متجهي</title>\n</head>\n<body>\n  <h1>شارة دائرية</h1>\n  <svg width=\"220\" height=\"140\" viewBox=\"0 0 220 140\" role=\"img\" aria-label=\"دائرة خضراء\">\n    <circle cx=\"70\" cy=\"70\" r=\"48\" fill=\"#21845a\"></circle>\n    <text x=\"135\" y=\"78\" font-size=\"20\">SVG</text>\n  </svg>\n</body>\n</html>",
        breakdown: [
          { code: "<svg>", meaning: "مساحة رسومات متجهية مضمّنة في مستند HTML." },
          { code: "circle", meaning: "عنصر يصف دائرة ومركزها ونصف قطرها." },
          { code: "fill", meaning: "لون تعبئة الشكل." },
          { code: "viewBox", meaning: "منطقة الإحداثيات الداخلية التي يمكن تحجيمها إلى أبعاد العرض." }
        ],
        steps: [
          { title: "غيّر لون الدائرة", explanation: "سمة fill تخص لون داخل الدائرة، ولا تغيّر أبعاد مساحة SVG.", from: "#21845a", to: "#bd6338", task: "بدّل لون fill إلى #bd6338 ثم شغّل وشاهد تغير تعبئة الشكل." },
          { title: "كبّر نصف القطر", explanation: "r هو نصف قطر الدائرة في نظام الإحداثيات الداخلي.", from: "r=\"48\"", to: "r=\"58\"", task: "ارفع r إلى 58 ثم شغّل ولاحظ امتداد الدائرة من مركزها." },
          { title: "حرّك مركز الدائرة", explanation: "cx يحدد البعد الأفقي لمركز الدائرة داخل مساحة الرسم.", from: "cx=\"70\"", to: "cx=\"90\"", task: "غيّر cx إلى 90 ثم شغّل وتتبّع انتقال مركز الدائرة نحو اليمين." }
        ]
      },
      "HTML Media": {
        reference: "https://www.w3schools.com/html/html_media.asp",
        concept: "وسوم الوسائط تخبر المتصفح بنوع المحتوى وطريقة عرضه. نستخدم عناصر متخصصة للصوت والفيديو ومصادر بديلة بدل التعامل مع الملف كنص عادي.",
        flow: "عنصر وسائط ⟶ source يحدد ملفًا ونوعه ⟶ المتصفح يعرض أداة التشغيل",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>وسائط الصفحة</title>\n</head>\n<body>\n  <h1>مقطع صوتي</h1>\n  <audio controls>\n    <source src=\"sample.mp3\" type=\"audio/mpeg\">\n    المتصفح لا يدعم تشغيل الصوت.\n  </audio>\n  <p>يأتي الملف sample.mp3 بجوار صفحة HTML.</p>\n</body>\n</html>",
        breakdown: [
          { code: "audio", meaning: "عنصر يضع مشغل الصوت في الصفحة." },
          { code: "controls", meaning: "يطلب من المتصفح إظهار أزرار التشغيل والصوت." },
          { code: "source", meaning: "يحدد ملف الوسائط ونوعه، ويمكن وضع أكثر من مصدر." },
          { code: "النص الاحتياطي", meaning: "محتوى يظهر إذا لم يدعم المتصفح العنصر." }
        ],
        steps: [
          { title: "بدّل اسم ملف الصوت", explanation: "src يشير إلى مسار الملف الذي يريد المشغل قراءته.", from: "sample.mp3", to: "lesson.mp3", task: "غيّر اسم المصدر إلى lesson.mp3. لا يتوفر الملف هنا، لكنك تعرف الآن أي قيمة تربط العنصر به." },
          { title: "أظهر زر التحكم", explanation: "controls سمة منطقية تظهر عناصر التشغيل في مشغل الصوت.", from: "<audio controls>", to: "<audio>", task: "احذف controls ثم شغّل ولاحظ اختفاء أزرار المشغل، ثم أعدها." },
          { title: "اكتب نوع الملف", explanation: "type يوضح صيغة الوسائط للمتصفح قبل محاولة تحميل المصدر.", from: "audio/mpeg", to: "audio/ogg", task: "بدّل النوع إلى audio/ogg ثم شغّل. طابق النوع مع امتداد الملف عند استعمال ملف حقيقي." }
        ]
      },
      "HTML Video": {
        reference: "https://www.w3schools.com/html/html5_video.asp",
        concept: "video ينشئ مساحة تشغيل للمقطع. source يحدد ملف الفيديو ونوعه، وcontrols تعرض أدوات التشغيل؛ ويمكن كتابة نص احتياطي للمتصفحات التي لا تدعم العنصر.",
        flow: "video يهيئ المشغل ⟶ source يربطه بملف ⟶ controls تسمح بالتشغيل والإيقاف",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>مشغل فيديو</title>\n</head>\n<body>\n  <h1>فيديو التجربة</h1>\n  <video width=\"320\" controls>\n    <source src=\"movie.mp4\" type=\"video/mp4\">\n    متصفحك لا يدعم تشغيل الفيديو.\n  </video>\n</body>\n</html>",
        breakdown: [
          { code: "width", meaning: "عرض المشغل على الصفحة؛ يمكن ضبطه كذلك بـ CSS." },
          { code: "controls", meaning: "يظهر تشغيل وإيقاف وتقديمًا وصوتًا بحسب المتصفح." },
          { code: "src", meaning: "مسار ملف الفيديو الذي يحاول المشغل فتحه." },
          { code: "type=\"video/mp4\"", meaning: "نوع المصدر حتى يعرف المتصفح صيغته." }
        ],
        steps: [
          { title: "كبّر المشغل", explanation: "تغيير width يوسع مساحة المشغل دون تغيير ملف الفيديو.", from: "width=\"320\"", to: "width=\"400\"", task: "ارفع عرض المشغل إلى 400 ثم شغّل وقارن المساحة التي يشغلها." },
          { title: "غيّر اسم المصدر", explanation: "src هو المسار الذي يصل بين عنصر video والملف.", from: "movie.mp4", to: "clip.mp4", task: "غيّر اسم الملف إلى clip.mp4. ستحتاج ملفًا بهذا الاسم عند استخدام المثال خارج المحرر." },
          { title: "أخفِ أدوات التشغيل", explanation: "controls سمة اختيارية. من دونها لن يعرض المتصفح أزراره الافتراضية.", from: "<video width=\"400\" controls>", to: "<video width=\"400\">", task: "احذف controls ثم شغّل وتوقع كيف يتغير المشغل. أعدها لتسمح للزائر بالتحكم." }
        ]
      },
      "HTML Audio": {
        reference: "https://www.w3schools.com/html/html5_audio.asp",
        concept: "audio يضيف مشغلًا صوتيًا من دون عرض صورة فيديو. عنصر source يحمل عنوان الملف وصيغته، وcontrols تمنح الزائر أدوات الاستماع.",
        flow: "audio يصنع المشغل ⟶ source يشير إلى ملف صوت ⟶ المستخدم يضغط تشغيل",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>رسالة صوتية</title>\n</head>\n<body>\n  <h1>استمع للتعليمات</h1>\n  <audio controls>\n    <source src=\"welcome.mp3\" type=\"audio/mpeg\">\n    المتصفح لا يدعم عنصر الصوت.\n  </audio>\n  <p>أضف ملف welcome.mp3 إلى مجلد الصفحة لتشغيله.</p>\n</body>\n</html>",
        breakdown: [
          { code: "audio", meaning: "وعاء مشغل صوت لا يعرض مساحة فيديو." },
          { code: "controls", meaning: "يعرض عناصر التحكم الافتراضية." },
          { code: "source", meaning: "يمكن تكراره لتوفير صيغ صوت بديلة." },
          { code: "audio/mpeg", meaning: "نوع شائع لملف MP3." }
        ],
        steps: [
          { title: "استخدم اسم ملف آخر", explanation: "تغيير src يغيّر الملف الذي يبحث عنه المتصفح.", from: "welcome.mp3", to: "lesson.mp3", task: "غيّر المصدر إلى lesson.mp3 ثم شغّل. لاحظ أن الملف يجب أن يوجد فعلًا كي يصدر صوتًا." },
          { title: "أضف مصدرًا بديلًا", explanation: "عند إضافة مصدر آخر يستطيع المتصفح اختيار صيغة مدعومة.", from: "    المتصفح لا يدعم عنصر الصوت.", to: "    <source src=\"welcome.ogg\" type=\"audio/ogg\">\n    المتصفح لا يدعم عنصر الصوت.", task: "أضف مصدر OGG قبل النص الاحتياطي. غيّر امتداد الملف الأول إلى lesson.mp3 إذا أردت مطابقة المصدرين." },
          { title: "حافظ على أدوات المستمع", explanation: "بدون controls لا يملك الزائر واجهة التشغيل الافتراضية.", from: "<audio controls>", to: "<audio>", task: "احذف controls ثم شغّل، ثم أعدها. قارن الفرق في أدوات المشغل." }
        ]
      },
      "HTML Plug-ins": {
        reference: "https://www.w3schools.com/html/html_object.asp",
        concept: "object وembed تضمّنان موردًا خارجيًا مثل صورة أو مستند. هذه العناصر مفيدة لفهم أمثلة المحتوى المضمّن، لكن الإضافات القديمة مثل Flash لم تعد خيارًا للمواقع الحديثة.",
        flow: "object يحمل موردًا ⟶ data يحدد مساره ⟶ المتصفح يعرضه أو النص الاحتياطي",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>مورد مضمّن</title>\n</head>\n<body>\n  <h1>عرض ملف SVG</h1>\n  <object data=\"badge.svg\" type=\"image/svg+xml\" width=\"220\" height=\"120\">\n    <p>تعذر عرض الشارة. <a href=\"badge.svg\">افتح الملف</a>.</p>\n  </object>\n</body>\n</html>",
        breakdown: [
          { code: "object", meaning: "عنصر يضم موردًا خارجيًا ضمن الصفحة." },
          { code: "data", meaning: "مسار المورد الذي يحاول العنصر عرضه." },
          { code: "type", meaning: "نوع المورد المضمّن، مثل صورة SVG." },
          { code: "المحتوى الداخلي", meaning: "رسالة بديلة تظهر إذا تعذر عرض المورد." }
        ],
        steps: [
          { title: "وسّع عرض المورد", explanation: "width يضبط مساحة العنصر المضمّن بوحدات البكسل.", from: "width=\"220\"", to: "width=\"300\"", task: "غيّر العرض إلى 300 ثم شغّل ولاحظ مساحة المورد المضمّن." },
          { title: "بدّل الملف المضمّن", explanation: "data هو المسار الذي يربط object بالملف الخارجي.", from: "badge.svg", to: "medal.svg", task: "غيّر اسم المورد إلى medal.svg ثم شغّل. أضف الملف بهذا الاسم عند تجربة المثال محليًا." },
          { title: "غيّر النص الاحتياطي", explanation: "العناصر بين بداية object ونهايته تظهر عندما لا يمكن عرض المورد.", from: "تعذر عرض الشارة.", to: "لم تظهر الشارة.", task: "بسّط النص الاحتياطي إلى «لم تظهر الشارة.» ثم شغّل." }
        ]
      },
      "HTML YouTube": {
        reference: "https://www.w3schools.com/html/html_youtube.asp",
        concept: "يمكن تضمين مشغل YouTube داخل iframe باستخدام عنوان التضمين ومعرّف الفيديو. نستخدم معرّفًا تجريبيًا هنا؛ استبدله بمعرّف مقطع يملك صاحبه السماح بالتضمين.",
        flow: "iframe يحدد مساحة ⟶ src يحمل رابط embed ومعرّف الفيديو ⟶ المشغل يظهر داخل الصفحة",
        code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>فيديو تعليمي مضمّن</title>\n</head>\n<body>\n  <h1>شاهد شرحًا قصيرًا</h1>\n  <iframe width=\"360\" height=\"215\" src=\"https://www.youtube-nocookie.com/embed/VIDEO_ID\" title=\"مشغل YouTube تجريبي\" allowfullscreen></iframe>\n  <p>استبدل VIDEO_ID بمعرّف فيديو يسمح صاحبه بالتضمين.</p>\n</body>\n</html>",
        breakdown: [
          { code: "iframe", meaning: "مساحة تعرض صفحة أو مشغلًا مضمّنًا داخل الصفحة الحالية." },
          { code: "/embed/VIDEO_ID", meaning: "عنوان التضمين يتضمن معرّف الفيديو بعد embed." },
          { code: "title", meaning: "وصف مختصر للإطار يساعد المستخدمين وأدوات المساعدة." },
          { code: "allowfullscreen", meaning: "يسمح بتوسيع المشغل إلى ملء الشاشة." }
        ],
        steps: [
          { title: "استبدل معرّف الفيديو", explanation: "VIDEO_ID عنصر توضيحي يجب تغييره لمعرّف فيديو فعلي يسمح بالتضمين.", from: "VIDEO_ID", to: "M7lc1UVf-VE", task: "استبدل VIDEO_ID بالمعرّف التجريبي M7lc1UVf-VE ثم شغّل. تحتاج اتصالًا بالإنترنت كي يحمل المشغل." },
          { title: "كبّر مساحة العرض", explanation: "width وheight يحددان الحجم الأولي للإطار المضمّن.", from: "width=\"360\"", to: "width=\"480\"", task: "غيّر العرض إلى 480 ثم شغّل ولاحظ أن مساحة المشغل أصبحت أوسع." },
          { title: "صف الإطار بدقة", explanation: "title يشرح محتوى iframe للقارئ الذي يتنقل بين الإطارات.", from: "مشغل YouTube تجريبي", to: "شرح أساسيات HTML", task: "غيّر قيمة title إلى «شرح أساسيات HTML» ثم شغّل. هذا وصف للإطار وليس عنوان الصفحة." }
        ]
      },
    }
  },
  skills: {
    html: [
      { title: "بنية صفحة HTML", from: 0, to: 4 },
      { title: "العناوين والنصوص", from: 4, to: 8 },
      { title: "التنسيق والألوان", from: 8, to: 13 },
      { title: "روابط وصور الصفحة", from: 13, to: 19 },
      { title: "جداول وأقسام", from: 19, to: 24 },
      { title: "معرّفات وتفاعلات الصفحة", from: 24, to: 28 },
      { title: "تجهيز الصفحة للموقع", from: 28, to: 35 },
      { title: "الرموز وترميز الصفحة", from: 35, to: 41 },
      { title: "نموذج يجمع البيانات", from: 41, to: 47 },
      { title: "رسومات ووسائط", from: 47, to: 54 }
    ],
    css: [
      { title: "قواعد CSS والمحددات", from: 0, to: 3 },
      { title: "ربط ملف CSS وتنظيمه", from: 3, to: 6 },
      { title: "ألوان وخلفيات وحدود", from: 6, to: 10 },
      { title: "المسافات وأبعاد العنصر", from: 10, to: 14 },
      { title: "تنسيق النص والخط", from: 14, to: 17 },
      { title: "روابط وقوائم وجداول", from: 17, to: 20 },
      { title: "عرض العنصر وموقعه", from: 20, to: 24 },
      { title: "الطبقات وتدفق المحتوى", from: 24, to: 27 },
      { title: "المحاذاة وتجميع العناصر", from: 27, to: 30 },
      { title: "حالات العناصر وشكلها", from: 30, to: 34 },
      { title: "قوائم ومعارض الصور", from: 34, to: 38 },
      { title: "تنسيق النماذج والوحدات", from: 38, to: 42 },
      { title: "قواعد تنسيق متماسكة", from: 42, to: 46 },
      { title: "إتاحة الموقع وتخطيطه", from: 46, to: 48 },
      { title: "خلفيات وألوان متقدمة", from: 48, to: 53 },
      { title: "ظلال وتحويلات بصرية", from: 53, to: 58 },
      { title: "حركة وتلميحات للواجهة", from: 58, to: 63 },
      { title: "عرض الصور ومعالجتها", from: 63, to: 69 },
      { title: "أزرار وتصفح الصفحة", from: 69, to: 73 },
      { title: "متغيرات وقواعد مرنة", from: 73, to: 78 },
      { title: "ترتيب باستخدام Flexbox", from: 78, to: 82 },
      { title: "تخطيط باستخدام Grid", from: 82, to: 87 },
      { title: "تصميم يناسب الشاشات", from: 87, to: 94 }
    ],
    js: [
      { title: "تشغيل الأوامر الأولى", from: 0, to: 4 },
      { title: "المتغيرات وأسماؤها", from: 4, to: 9 },
      { title: "القيم والعمليات الحسابية", from: 9, to: 14 },
      { title: "الشروط واختيار المسار", from: 14, to: 21 },
      { title: "تكرار الأوامر بحلقات", from: 21, to: 27 },
      { title: "كتابة نصوص قابلة للتغيير", from: 27, to: 31 },
      { title: "تحويل الأرقام واستخدامها", from: 31, to: 36 },
      { title: "إنشاء الدوال واستدعاؤها", from: 36, to: 40 },
      { title: "تمرير القيم للدوال", from: 40, to: 44 },
      { title: "وصف البيانات بالكائنات", from: 44, to: 50 },
      { title: "نطاق المتغيرات وتنظيمها", from: 50, to: 55 },
      { title: "إنشاء التواريخ والتعامل معها", from: 55, to: 60 },
      { title: "إضافة عناصر إلى المصفوفات", from: 60, to: 67 },
      { title: "مجموعات وخرائط البيانات", from: 67, to: 74 },
      { title: "تتبّع العناصر والمكررات", from: 74, to: 78 },
      { title: "الحساب والأنواع المركبة", from: 78, to: 85 },
      { title: "تمييز أنواع القيم وتحويلها", from: 85, to: 90 },
      { title: "اكتشاف الأخطاء وإصلاحها", from: 90, to: 96 },
      { title: "مراجعة المشاريع والإصدارات", from: 96, to: 99 },
      { title: "ربط الأوامر بعناصر الصفحة", from: 99, to: 103 },
      { title: "استخدام بيانات المتصفح", from: 103, to: 107 },
      { title: "الدوال والكائنات المتقدمة", from: 107, to: 113 },
      { title: "أدوات متقدمة للويب", from: 113, to: 119 }
    ]
  }
};

window.LESSONS_DATA.courseHelpers = (function () {
  function cssFamily(topic) {
    if (/Selector|Combinator|Pseudo|Specificity|Inheritance|attribute|@supports/i.test(topic)) return "selector";
    if (/Margin|Padding|Border|Height|Width|Box Model|Outline|Box Sizing|Rounded|sizing/i.test(topic)) return "box";
    if (/Text|Font|Icons|Links|Lists|Tables|Forms|Buttons|Pagination/i.test(topic)) return "content";
    if (/Image|object-fit|object-position|Mask|Gallery|Sprites/i.test(topic)) return "image";
    if (/Transition|Animation|Transform|Tooltip/i.test(topic)) return "motion";
    if (/Grid|Flex|Display|Max-width|Position|Z-index|Overflow|Float|Inline-block|Align|Layout|Responsive|Media Queries|Dropdown|Navigation/i.test(topic)) return "layout";
    if (/Units|Math|Counter|Functions|Variables|@property/i.test(topic)) return "values";
    if (/Color|Background|Opacity|Gradient|Shadow/i.test(topic)) return "visual";
    if (/Accessibility|Optimization/i.test(topic)) return "quality";
    return "foundation";
  }

  function cssLessonSpec(topic, index) {
    var family = cssFamily(topic),
        is = function(part) { return topic.toLowerCase().indexOf(part.toLowerCase()) >= 0; },
        spec = {
          topic: topic,
          family: family,
          concept: "قاعدة CSS تصف للمتصفح كيف يعرض جزءًا من الصفحة. اقرأ اسم المحدد، ثم الخاصية، ثم القيمة؛ كل واحدة لها دور مختلف.",
          analogy: "تخيّل استمارة تنسيق: اسم الجزء الذي تختاره، والخانة التي ستغيّرها، والقيمة التي تضعها فيها.",
          flow: "المحدد ⟶ الخاصية ⟶ القيمة ⟶ شكل العنصر",
          quiz: "في قاعدة CSS، أي جزء يحدد العنصر الذي سيتأثر؟",
          options: ["المحدد مثل h1", "القيمة مثل teal"], correct: 0,
          code: ".card h1 { color: #256b57; }",
          from: "#256b57", to: "tomato",
          task: "غيّر قيمة اللون إلى tomato. شغّل المثال ولاحظ العنوان؛ كتبت قيمة واحدة وتركت القاعدة والوسم كما هما."
        };

    if (family === "selector") {
      spec.concept = "المحدد عنوان العنصر داخل CSS. المتصفح يطبّق القاعدة على كل عنصر يطابق هذا العنوان فقط.";
      spec.analogy = "مثل اختيار صف محدد في قائمة: المحدد يختار، والقاعدة تعطيه التنسيق.";
      spec.flow = "المحدد يطابق العنصر ⟶ تُطبّق القاعدة عليه";
      spec.quiz = "في h1 { ... }، ماذا يفعل h1؟";
      spec.options = ["يختار العناوين من النوع h1", "يحدد لون النص وحده"];
      spec.code = ".card h1 { color: #256b57; }";
      spec.from = "h1"; spec.to = "p";
      spec.task = "بدّل المحدد h1 إلى p. شغّل وراقب انتقال اللون إلى الفقرة؛ القاعدة نفسها بقيت كما هي.";
      if (is("Pseudo-elements")) {
        spec.code = ".card p::before { content: \"➜ \"; color: #256b57; }";
        spec.from = "➜"; spec.to = "★";
        spec.task = "غيّر الرمز داخل content إلى ★. شغّل وشاهد الرمز الذي أضافه CSS قبل الفقرة.";
      } else if (is("Pseudo-classes")) {
        spec.code = ".card a:hover { color: tomato; }";
        spec.from = "hover"; spec.to = "focus";
        spec.task = "بدّل hover إلى focus، شغّل، ثم ركّز على الرابط في المعاينة لتلاحظ أن الحالة هي التي تستهدفها القاعدة.";
      } else if (is("Attribute Selectors")) {
        spec.code = "a[href] { color: #256b57; }";
        spec.from = "href"; spec.to = "title";
        spec.task = "بدّل href إلى title داخل المحدد. جرّب الرابط ولاحظ أن القاعدة لم تعد تختار الرابط بهذه الخاصية.";
      }
    } else if (family === "box") {
      spec.concept = "العنصر صندوق له محتوى وحدود ومسافة داخلية padding ومسافة خارجية margin. خاصية CSS تغيّر طبقة بعينها.";
      spec.analogy = "كرت داخل إطار: padding يترك هواءً داخل الإطار، وmargin يترك مسافة خارجه.";
      spec.flow = "المحتوى ⟶ padding ⟶ border ⟶ margin";
      spec.quiz = is("Margin") ? "أي خاصية تصنع مساحة خارج الحد؟" : is("Padding") ? "أي خاصية تترك مساحة بين المحتوى والحد؟" : "ما ترتيب طبقات الصندوق من الداخل إلى الخارج؟";
      spec.options = is("Margin") ? ["margin", "padding"] : is("Padding") ? ["padding", "margin"] : ["المحتوى ثم padding ثم border", "margin ثم المحتوى ثم padding"];
      spec.correct = 0;
      spec.code = ".card { padding: 12px; border: 2px solid #b8cfb6; }";
      spec.from = "12px"; spec.to = "24px";
      spec.task = "وسّع المسافة الداخلية: بدّل padding من 12px إلى 24px، ثم شغّل وقارن المساحة حول النص.";
      if (is("Margin")) { spec.code = ".card { margin: 8px; border: 2px solid #b8cfb6; }"; spec.from = "8px"; spec.to = "20px"; spec.task = "وسّع المسافة خارج البطاقة: بدّل margin من 8px إلى 20px وشغّل."; }
      if (is("Border") || is("Outline")) { spec.code = ".card { border: 2px solid #78a875; }"; spec.from = "2px"; spec.to = "5px"; spec.task = "زِد سُمك الحد من 2px إلى 5px، ثم شغّل ولاحظ الإطار حول البطاقة."; }
      if (is("Rounded")) { spec.code = ".card { border-radius: 8px; }"; spec.from = "8px"; spec.to = "24px"; spec.task = "دوّر زوايا البطاقة أكثر: غيّر 8px إلى 24px وشغّل."; }
      if (is("Height") || is("Width") || is("Box Sizing")) { spec.code = ".card { width: 240px; padding: 12px; box-sizing: border-box; }"; spec.from = "240px"; spec.to = "300px"; spec.task = "وسّع البطاقة من 240px إلى 300px، ثم شغّل وقارن عرضها."; }
    } else if (family === "content") {
      spec.concept = "هذه الخاصية تغيّر طريقة ظهور النص أو العنصر الذي يقرأه الزائر. غيّر قيمة واحدة حتى تعرف أثرها وحدها.";
      spec.analogy = "مثل ضبط مقاس الخط أو محاذاة سطر في صفحة؛ المحتوى نفسه يبقى، وطريقة عرضه تتبدل.";
      spec.flow = "العنصر المختار ⟶ خاصية العرض ⟶ مظهر أوضح للقارئ";
      spec.quiz = "إذا أردت تكبير العنوان، أي خاصية تبدأ بها؟";
      spec.options = ["font-size", "border-style"];
      spec.code = ".card h1 { font-size: 22px; text-align: right; }";
      spec.from = "22px"; spec.to = "30px";
      spec.task = "كبّر العنوان بتغيير font-size من 22px إلى 30px. شغّل وتابع الفرق في المعاينة.";
      if (is("Text")) { spec.code = ".card p { text-align: right; line-height: 1.5; }"; spec.from = "right"; spec.to = "center"; spec.task = "غيّر text-align من right إلى center. شغّل وشاهد موضع الفقرة يتبدل."; }
      if (is("Links")) { spec.code = ".card a { color: #256b57; text-decoration: none; }"; spec.from = "none"; spec.to = "underline"; spec.task = "أعد خط الرابط بتغيير text-decoration من none إلى underline."; }
      if (is("Lists")) { spec.code = ".card ul { list-style-type: disc; }"; spec.from = "disc"; spec.to = "square"; spec.task = "بدّل شكل علامة القائمة من disc إلى square ثم شغّل وشاهد العلامات بجوار العناصر."; }
      if (is("Tables")) { spec.code = ".card td { border: 1px solid #9bb49a; padding: 4px; }"; spec.from = "4px"; spec.to = "10px"; spec.task = "وسّع المسافة داخل خلايا الجدول من 4px إلى 10px ثم شغّل."; }
      if (is("Forms")) { spec.code = ".card input:focus { outline: 2px solid #78a875; }"; spec.from = "2px"; spec.to = "4px"; spec.task = "زِد وضوح حقل الإدخال عند التركيز: بدّل outline من 2px إلى 4px، ثم ركّز على الحقل."; }
      if (is("Icons")) { spec.code = '.card a::before { content: "✦ "; color: #d58943; }'; spec.from = "✦"; spec.to = "★"; spec.task = "بدّل الرمز الذي يضيفه CSS قبل الرابط من ✦ إلى ★ ثم شغّل."; }
      if (is("Buttons")) { spec.code = ".card button { background-color: #dfeeda; border-radius: 6px; }"; spec.from = "6px"; spec.to = "18px"; spec.task = "دوّر زوايا زر الحفظ أكثر بتغيير border-radius من 6px إلى 18px."; }
    } else if (family === "image") {
      spec.concept = "هذه القاعدة تتحكم في مساحة الصورة أو قصّها أو شكلها. الصورة تظل محتوى؛ CSS يضبط طريقة عرضها.";
      spec.analogy = "مثل وضع صورة داخل إطار: تحدد حجم الإطار، ثم كيف تُقص الصورة أو تملأه.";
      spec.flow = "الصورة ⟶ مساحة العرض ⟶ قصّ أو شكل مناسب";
      spec.quiz = "أي خاصية تساعد الصورة على ملء إطار محدد من دون تمديد شكلها؟";
      spec.options = ["object-fit", "text-align"];
      spec.code = ".card .art { width: 90px; height: 60px; border-radius: 8px; }";
      spec.from = "90px"; spec.to = "140px";
      spec.task = "وسّع إطار الرسم من 90px إلى 140px ثم شغّل. في موضوع الصورة نفسه سنستخدم object-fit لضبط القصّ.";
      if (is("object-fit")) { spec.code = ".card .art { width: 140px; height: 70px; object-fit: cover; }"; spec.from = "cover"; spec.to = "contain"; spec.task = "بدّل object-fit من cover إلى contain. شغّل وقارن كيف تُعرض الصورة داخل الإطار."; }
      if (is("Centering")) { spec.code = ".card .art { display: block; margin: 0 auto; }"; spec.from = "0 auto"; spec.to = "0 0"; spec.task = "غيّر margin من 0 auto إلى 0 0 وشغّل لملاحظة تمركز الرسم أو رجوعه للبداية."; }
    } else if (family === "motion") {
      spec.concept = "التأثير يغيّر شكل العنصر أو انتقاله بين حالتين. بعض القواعد تظهر عند hover، وبعضها تتحرك مع الزمن.";
      spec.analogy = "كأنك تضبط سرعة انتقال باب من وضع إلى آخر؛ البداية والنهاية واضحتان، والزمن يحدد سلاسة الحركة.";
      spec.flow = "حالة أولى ⟶ انتقال أو تحويل ⟶ حالة جديدة";
      spec.quiz = "أي خاصية تجعل التغيير ينتقل بسلاسة بين حالتين؟";
      spec.options = ["transition", "margin"];
      spec.code = ".card h1 { transform: rotate(0deg); transition: transform 0.2s; }";
      spec.from = "0.2s"; spec.to = "0.8s";
      spec.task = "غيّر مدة transition من 0.2s إلى 0.8s، ثم شغّل ومرر المؤشر على العنوان لملاحظة الحركة.";
      if (is("2D Transforms")) { spec.code = ".card h1 { transform: rotate(0deg); }"; spec.from = "0deg"; spec.to = "8deg"; spec.task = "دوّر العنوان قليلًا: بدّل rotate(0deg) إلى rotate(8deg)، ثم شغّل."; }
      if (is("3D Transforms")) { spec.code = ".card h1 { transform: rotateY(0deg); }"; spec.from = "0deg"; spec.to = "25deg"; spec.task = "غيّر زاوية rotateY من 0deg إلى 25deg وشغّل لملاحظة التحويل ثلاثي الأبعاد."; }
      if (is("Animations")) { spec.code = ".card h1 { animation: float 1s ease-in-out infinite alternate; }\n@keyframes float { to { transform: translateY(-8px); } }"; spec.from = "1s"; spec.to = "2s"; spec.task = "أبطئ الحركة: بدّل مدة animation من 1s إلى 2s وشغّل."; }
    } else if (family === "layout") {
      spec.concept = "خصائص التخطيط تحدد أين يظهر العنصر، وما المساحة التي يشغلها، وكيف يصطف مع بقية العناصر.";
      spec.analogy = "مثل ترتيب بطاقات على مكتب: تحدد هل تصطف بجوار بعضها، أم في صفوف، أم في مكان ثابت.";
      spec.flow = "العناصر ⟶ طريقة التخطيط ⟶ ترتيب ومسافات مرئية";
      spec.quiz = "أي قيمة تجعل العناصر تصطف في شبكة صفوف وأعمدة؟";
      spec.options = ["display: grid", "text-decoration: underline"];
      spec.code = ".card { display: block; }";
      spec.from = "block"; spec.to = "flex";
      spec.task = "بدّل display من block إلى flex. شغّل ولاحظ كيف انتقل ترتيب محتوى البطاقة إلى صف.";
      if (is("Flex")) { spec.code = ".card { display: flex; gap: 8px; }"; spec.from = "8px"; spec.to = "18px"; spec.task = "وسّع gap بين عناصر Flex من 8px إلى 18px وشغّل."; }
      if (is("Grid")) { spec.code = ".card { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }"; spec.from = "1fr 1fr"; spec.to = "1fr 2fr"; spec.task = "اجعل العمود الثاني أوسع: بدّل 1fr 1fr إلى 1fr 2fr ثم شغّل."; }
      if (is("Position")) { spec.code = ".card h1 { position: relative; left: 0; }"; spec.from = "left: 0"; spec.to = "left: 12px"; spec.task = "حرّك العنوان 12px: غيّر left: 0 إلى left: 12px، ثم شغّل."; }
      if (is("Media Queries") || is("Responsive")) { spec.code = ".card { padding: 12px; }\n@media (max-width: 500px) { .card { padding: 20px; } }"; spec.from = "500px"; spec.to = "700px"; spec.task = "وسّع نقطة التحول إلى 700px. شغّل، ثم غيّر عرض النافذة لتتابع متى تتبدل المسافة."; }
    } else if (family === "values") {
      spec.concept = "الوحدة أو القيمة المحسوبة تخبر المتصفح بالمقدار. والمتغير يحفظ قيمة باسم لتستخدمها القواعد أكثر من مرة.";
      spec.analogy = "مثل مسطرة أو خانة إعداد واحدة؛ تغيّر الرقم هنا فتتأثر الأماكن التي تعتمد عليه.";
      spec.flow = "قيمة أو متغير ⟶ حساب CSS ⟶ مقدار يراه المتصفح";
      spec.quiz = "في 16px، ماذا يضيف px؟";
      spec.options = ["وحدة قياس", "محدد عنصر"];
      spec.code = ":root { --space: 12px; }\n.card { padding: var(--space); }";
      spec.from = "12px"; spec.to = "24px";
      spec.task = "غيّر --space من 12px إلى 24px. شغّل ولاحظ أن padding يتغير من القيمة المحفوظة.";
      if (is("Counter")) { spec.code = '.card { counter-reset: section; }\n.card h1::before { counter-increment: section; content: counter(section, upper-roman) ". "; }'; spec.from = "upper-roman"; spec.to = "decimal"; spec.task = "بدّل طريقة كتابة رقم العداد من upper-roman إلى decimal، ثم شغّل ولاحظ تغيّر شكل الرقم."; }
    } else if (family === "quality") {
      spec.concept = is("Accessibility") ? "التنسيق الجيد يبقى واضحًا عند التركيز بلوحة المفاتيح، ويعطي المستخدم إشارة مرئية لما يستطيع التفاعل معه." : "التنظيم والأداء الجيدان يجعلان قواعد CSS أسهل للفهم والتعديل مع نمو الصفحة.";
      spec.analogy = is("Accessibility") ? "مثل وضع علامة واضحة على الباب كي يجده الزائر سواء استخدم الماوس أو لوحة المفاتيح." : "مثل ترتيب الأدوات في صندوق؛ تجد القاعدة وتغيّرها من دون البحث في كل الصفحة.";
      spec.flow = "قاعدة واضحة ⟶ صيانة أسهل وتجربة أفضل";
      spec.quiz = is("Accessibility") ? "أي مؤشر يساعد من يتنقل بلوحة المفاتيح؟" : "ما فائدة القواعد المنظمة؟";
      spec.options = is("Accessibility") ? ["outline عند focus", "إزالة كل مؤشرات التركيز"] : ["سهولة الفهم والتعديل", "تكرار القاعدة بلا حاجة"];
      spec.code = ".card a:focus { outline: 3px solid #d58943; }";
      spec.from = "3px"; spec.to = "5px";
      spec.task = "اجعل مؤشر التركيز أوضح: زِد outline من 3px إلى 5px، ثم شغّل وركّز على الرابط.";
    }
    if (/Comments/i.test(topic)) {
      spec.concept = "تعليق CSS ملاحظة داخل ملف التنسيق؛ المتصفح يتجاهلها ولا يطبقها على الصفحة.";
      spec.analogy = "اكتب ملاحظة على هامش الدفتر: تفيدك لاحقًا، لكنها لا تغيّر محتوى الصفحة.";
      spec.flow = "/* ملاحظة */ ⟶ يتجاهلها المتصفح ⟶ القاعدة التالية تنسّق العنصر";
      spec.quiz = "هل يغيّر التعليق لون العنوان؟"; spec.options = ["لا، المتصفح يتجاهله", "نعم، مثل color"];
      spec.code = "/* لون العنوان الرئيسي */\n.card h1 { color: #256b57; }";
      spec.from = "لون العنوان الرئيسي"; spec.to = "سبب اختيار اللون";
      spec.task = "حدّث الملاحظة إلى «سبب اختيار اللون»، شغّل ولاحظ أن شكل الصفحة لم يتغير؛ التعليق شرح للمطور.";
    }
    if (/Errors/i.test(topic)) {
      spec.concept = "إذا لم تظهر قاعدة CSS كما توقعت، افحص المحدد ثم النقطتين والفاصلة المنقوطة واسم الخاصية.";
      spec.analogy = "مثل مراجعة جملة: علامة ناقصة قد تمنع قراءة الجزء المقصود، حتى لو كانت بقية الكلمات صحيحة.";
      spec.flow = "قاعدة غير مقروءة ⟶ افحص الفواصل ⟶ أصلح الصيغة ⟶ يظهر التنسيق";
      spec.quiz = "ما الذي يفصل اسم الخاصية عن قيمتها؟"; spec.options = ["النقطتان :", "علامة #"];
      spec.code = ".card h1 { color #256b57; }";
      spec.from = "color #256b57"; spec.to = "color: #256b57";
      spec.task = "أصلح القاعدة بإضافة النقطتين بعد color؛ بعدها شغّل وتأكد أن لون العنوان ظهر.";
    }
    if (/How To/i.test(topic)) {
      spec.concept = "يمكن وضع CSS داخل style في الصفحة، أو في ملف خارجي، أو داخل العنصر. الملف الخارجي يسهل مشاركة التنسيق بين صفحات كثيرة.";
      spec.analogy = "مثل اختيار مكان دفتر القواعد: بجانب عنصر واحد، داخل الصفحة، أو في ملف مستقل يرجع إليه الموقع.";
      spec.flow = "ملف HTML ⟶ link إلى style.css ⟶ قواعد مشتركة للصفحة";
      spec.quiz = "أي طريقة تناسب تنسيق عدة صفحات بملف واحد؟"; spec.options = ["External CSS", "Inline style لكل عنصر"];
      spec.code = ".card h1 { color: #256b57; }";
      spec.from = "#256b57"; spec.to = "teal";
      spec.task = "عدّل قيمة اللون في ملف CSS الحالي؛ قاعدة خارجية واحدة يمكن أن تنسّق أكثر من صفحة.";
    }
    if (/Opacity/i.test(topic)) { spec.code = ".card { opacity: 0.65; }"; spec.from = "0.65"; spec.to = "1"; spec.task = "اجعل البطاقة معتمة بالكامل: بدّل opacity من 0.65 إلى 1 ثم شغّل."; }
    if (/Backgrounds/i.test(topic) && !/Multiple Backgrounds/i.test(topic)) { spec.code = ".card { background-color: #eef5e9; }"; spec.from = "#eef5e9"; spec.to = "#fff0d7"; spec.task = "بدّل لون خلفية البطاقة إلى #fff0d7 ثم شغّل ولاحظ تغيّر مساحة البطاقة كلها."; }
    if (/Multiple Backgrounds/i.test(topic)) { spec.code = ".card { background-image: linear-gradient(90deg, #eef5e9, #d8e9d4), linear-gradient(45deg, #fff0d7, #f2c98f); }"; spec.from = "90deg"; spec.to = "180deg"; spec.task = "غيّر اتجاه الطبقة الأولى إلى 180deg. تذكّر أن الفواصل تفصل بين طبقتَي الخلفية."; }
    if (/^CSS Colors$|Advanced Colors/i.test(topic)) { spec.code = ".card h1 { color: #256b57; }"; spec.from = "#256b57"; spec.to = "tomato"; spec.task = "جرّب اسم اللون tomato بدل قيمة HEX في color، ثم شغّل وقارن."; }
    if (/Outline/i.test(topic)) { spec.code = ".card a:focus { outline: 2px solid #d58943; outline-offset: 2px; }"; spec.from = "2px"; spec.to = "5px"; spec.task = "زِد سمك outline من 2px إلى 5px، ثم شغّل وركّز على الرابط في المعاينة."; }
    if (/Border Images/i.test(topic)) { spec.code = ".card { border: 8px solid transparent; border-image: linear-gradient(45deg, #78a875, #d9a657) 1; }"; spec.from = "8px"; spec.to = "12px"; spec.task = "وسّع إطار border-image من 8px إلى 12px ثم شغّل لتلاحظ الإطار المتدرج."; }
    if (/Gradients/i.test(topic)) { spec.code = ".card { background: linear-gradient(90deg, #e9f3e5, #b7d6bc); }"; spec.from = "90deg"; spec.to = "180deg"; spec.task = "غيّر اتجاه التدرج من 90deg إلى 180deg وشاهد انتقال اللون من زاوية مختلفة."; }
    if (/Shadows/i.test(topic)) { spec.code = ".card { box-shadow: 0 2px 6px #00000022; }"; spec.from = "0 2px 6px"; spec.to = "0 8px 18px"; spec.task = "وسّع الظل بتغيير 0 2px 6px إلى 0 8px 18px ثم شغّل."; }
    if (/CSS Math Functions/i.test(topic)) { spec.code = ".card { width: calc(100% - 24px); }"; spec.from = "24px"; spec.to = "48px"; spec.task = "عدّل المساحة التي تطرحها calc من 24px إلى 48px ثم شغّل وقارن العرض."; }
    if (/@property/i.test(topic)) { spec.code = '@property --tilt { syntax: "<angle>"; inherits: false; initial-value: 0deg; }\n.card h1 { transform: rotate(var(--tilt)); }'; spec.from = "0deg"; spec.to = "8deg"; spec.task = "غيّر initial-value من 0deg إلى 8deg وشغّل لترى القيمة المسجلة للمتغير وهي تؤثر في العنوان."; }
    if (/Transition/i.test(topic)) { spec.code = ".card h1 { transition: transform 0.2s; }\n.card h1:hover { transform: scale(1.08); }"; spec.from = "0.2s"; spec.to = "0.8s"; spec.task = "غيّر مدة الانتقال من 0.2s إلى 0.8s، شغّل ثم مرّر المؤشر على العنوان."; }
    if (/CSS Variables/i.test(topic)) { spec.concept = "متغير CSS يحفظ قيمة باسم يبدأ بشرطتين، ثم تستعمله القواعد عبر var(). عدّل الاسم أو القيمة في مكانها."; }
    if (/Overflow/i.test(topic)) { spec.code = ".card { width: 180px; height: 70px; overflow: hidden; }"; spec.from = "hidden"; spec.to = "auto"; spec.task = "بدّل overflow من hidden إلى auto ثم شغّل؛ ستظهر طريقة تعامل الصندوق مع محتوى يتجاوز حدوده."; }
    if (/Z-index/i.test(topic)) { spec.code = ".tiles span:first-child { position: relative; z-index: 1; }"; spec.from = "z-index: 1"; spec.to = "z-index: 5"; spec.task = "ارفع z-index من 1 إلى 5 ثم شغّل. القيمة تحدد ترتيب التراكب عندما تتقاطع العناصر الموضوعة."; }
    if (/^CSS Introduction$|^CSS Syntax$/i.test(topic)) {
      spec.concept = "CSS تصف شكل HTML. في القاعدة نختار المحدد، ثم نكتب الخاصية والنقطتين والقيمة، ونغلق التعريف بفاصلة منقوطة.";
      spec.flow = ".card h1 ⟶ المحدد　|　color ⟶ الخاصية　|　tomato ⟶ القيمة";
      spec.quiz = "في .card h1 { color: tomato; }، ما دور color؟"; spec.options = ["اسم الخاصية", "اسم العنصر"];
      spec.code = ".card h1 { color: tomato; }"; spec.from = "tomato"; spec.to = "teal";
      spec.task = "بدّل قيمة color من tomato إلى teal. تتبّع القاعدة: المحدد يختار العنوان، والخاصية تحدد اللون، والقيمة تختار الدرجة.";
    }
    if (/Inheritance/i.test(topic)) {
      spec.concept = "بعض قيم CSS تنتقل من العنصر الأب إلى أبنائه، مثل لون النص. الكلمة inherit تطلب من العنوان أخذ لون البطاقة.";
      spec.flow = ".card يحمل اللون ⟶ h1 يرثه ⟶ العنوان يظهر باللون نفسه";
      spec.quiz = "إذا لم يحدد h1 لونه، فمن أين قد يأخذ color؟"; spec.options = ["من العنصر الأب", "من اسم الملف"];
      spec.code = '.card { color: #256b57; }\n.card h1 { color: inherit; }'; spec.from = "inherit"; spec.to = "tomato";
      spec.task = "بدّل inherit إلى tomato وشغّل. العنوان الآن له لون مستقل بدل أن يأخذ لون البطاقة.";
    }
    if (/Specificity/i.test(topic)) {
      spec.concept = "عندما تطابق أكثر من قاعدة العنصر نفسه، تقارن CSS قوة المحددات. المحدد الذي يصف العنصر بدقة أكبر تكون له الأولوية غالبًا.";
      spec.flow = ".card h1 أقوى من h1 ⟶ قاعدة العنوان داخل البطاقة تفوز";
      spec.quiz = "أي المحددين أدق للعنوان داخل البطاقة؟"; spec.options = [".card h1", "h1"];
      spec.code = '.card h1 { color: #256b57; }\nh1 { color: tomato; }'; spec.from = ".card h1"; spec.to = "h1";
      spec.task = "بسّط المحدد الأول من .card h1 إلى h1، ثم شغّل. صار المحددان بالقوة نفسها، فتفوز القاعدة المكتوبة أخيرًا.";
    }
    if (/!important/i.test(topic)) {
      spec.concept = "!important يرفع أولوية قيمة بعينها وقد يتجاوز قواعد أخرى؛ لذلك نستخدمه بحذر حتى لا يصعب تعديل التنسيق لاحقًا.";
      spec.flow = "قاعدتان متعارضتان ⟶ !important يرفع أولوية القيمة المعلّمة";
      spec.quiz = "ما أثر !important هنا؟"; spec.options = ["يرفع أولوية هذه القيمة", "يضيف عنصر HTML جديدًا"];
      spec.code = '.card h1 { color: #256b57; }\nh1 { color: tomato; }'; spec.from = "tomato;"; spec.to = "tomato !important;";
      spec.task = "أضف !important بعد tomato، ثم شغّل ولاحظ أن اللون يتغلب على قاعدة العنوان الأدق. جرّبه كاستثناء فقط.";
    }
    if (/@supports/i.test(topic)) {
      spec.concept = "@supports يسأل المتصفح هل يدعم خاصية CSS. القواعد داخلها تعمل فقط عندما تكون الإجابة نعم.";
      spec.flow = "اختبار دعم display:grid ⟶ نعم؟ ⟶ طبّق تنسيق الشبكة";
      spec.quiz = "متى تطبّق القواعد داخل @supports؟"; spec.options = ["عندما يدعم المتصفح الخاصية", "في كل المتصفحات مهما كان الدعم"];
      spec.code = "@supports (display: grid) { .tiles { display: grid; grid-template-columns: repeat(3, 1fr); } }";
      spec.from = "repeat(3, 1fr)"; spec.to = "repeat(2, 1fr)";
      spec.task = "اجعل الشبكة عمودين بدل ثلاثة بتغيير repeat(3, 1fr) إلى repeat(2, 1fr)، ثم شغّل.";
    }
    if (/^CSS Functions$/i.test(topic)) {
      spec.concept = "دوال CSS تحسب أو تختار قيمة أثناء عرض الصفحة. مثل min() التي تختار الأصغر من القيم المعطاة.";
      spec.flow = "min(100%, 260px) ⟶ يقارن القيمتين ⟶ يختار الأصغر";
      spec.quiz = "ما الذي تفعله min()؟"; spec.options = ["تختار أصغر قيمة", "تكرر العنصر"];
      spec.code = ".card { width: min(100%, 260px); }"; spec.from = "260px"; spec.to = "320px";
      spec.task = "ارفع الحد الأقصى من 260px إلى 320px، ثم شغّل وقارن عرض البطاقة.";
    }
    if (/^CSS Float$/i.test(topic)) {
      spec.code = ".card a[title] { float: left; margin: 0 8px 8px 0; }"; spec.from = "left"; spec.to = "right";
      spec.task = "غيّر float من left إلى right ثم شغّل. الرابط ينجذب إلى الجهة المقابلة داخل البطاقة.";
    }
    if (/Inline-block/i.test(topic)) {
      spec.code = ".card nav a { display: inline-block; padding: 6px; }"; spec.from = "inline-block"; spec.to = "block";
      spec.task = "بدّل display من inline-block إلى block، ثم شغّل ولاحظ أن كل رابط أصبح يأخذ سطرًا كاملًا.";
    }
    if (/^CSS Align$/i.test(topic)) {
      spec.code = ".card .tiles { display: flex; justify-content: flex-start; }"; spec.from = "flex-start"; spec.to = "center";
      spec.task = "غيّر justify-content إلى center وشغّل. راقب انتقال مجموعة المربعات إلى منتصف الصف.";
    }
    if (/Dropdown/i.test(topic)) {
      spec.concept = "القائمة المنسدلة تعرض خيارات إضافية عندما يمر المؤشر أو يركّز المستخدم على عنصر القائمة.";
      spec.flow = "المرور على الرابط ⟶ تظهر ::after ⟶ خيار إضافي أسفل العنصر";
      spec.code = '.card .nav a:first-child { position: relative; }\n.card .nav a:first-child:hover::after { content: "أساسيات | تطبيق"; position: absolute; top: 100%; right: 0; padding: 8px; background: #fff2dd; z-index: 3; }'; spec.from = "top: 100%"; spec.to = "top: 120%";
      spec.task = "غيّر top من 100% إلى 120%، ثم شغّل ومرّر المؤشر على أول رابط في المعاينة لملاحظة مكان القائمة المنسدلة.";
    }
    if (/Multiple Columns/i.test(topic)) {
      spec.code = '.card p { column-count: 2; column-gap: 18px; }\n.card p::after { content: " هذه خطوة إضافية لنرى كيف يتوزع النص على العمودين مع مساحة مناسبة بينهما."; }'; spec.from = "18px"; spec.to = "30px";
      spec.task = "وسّع الفاصل بين العمودين من 18px إلى 30px، ثم شغّل لملاحظة توزيع الفقرة.";
    }
    if (/User Interface/i.test(topic)) {
      spec.code = ".card input { resize: both; cursor: text; }"; spec.from = "text"; spec.to = "crosshair";
      spec.task = "غيّر شكل المؤشر من text إلى crosshair ثم مرّره فوق حقل الإدخال في المعاينة.";
    }
    if (/Tooltip/i.test(topic)) {
      spec.concept = "التلميح نص صغير يظهر عند المرور على عنصر أو التركيز عليه، ويشرح وظيفة العنصر من غير أن يزاحم الصفحة.";
      spec.code = '.card a[title]::after { content: attr(title); display: none; }\n.card a[title]:hover::after { display: block; }';
      spec.from = ":hover"; spec.to = ":focus";
      spec.task = "بدّل حالة ظهور التلميح من hover إلى focus، ثم شغّل واستخدم Tab للانتقال إلى الرابط.";
    }
    if (/Navigation Bars/i.test(topic)) {
      spec.code = ".card .nav { display: flex; flex-direction: row; gap: 8px; }"; spec.from = "row"; spec.to = "column";
      spec.task = "حوّل اتجاه شريط التنقل من row إلى column وشغّل. الروابط نفسها ترتب عموديًا بدل أفقيًا.";
    }
    if (/CSS Box Sizing/i.test(topic)) {
      spec.concept = "box-sizing يحدد هل العرض المعلن يشمل padding والحد أم يضافان إليه. border-box يجعل القياس الخارجي أسهل للتوقع.";
      spec.flow = "width ⟶ box-sizing يحدد ما يدخل في القياس ⟶ عرض خارجي متوقع";
      spec.code = ".card { width: 240px; padding: 18px; box-sizing: border-box; }"; spec.from = "border-box"; spec.to = "content-box";
      spec.task = "بدّل border-box إلى content-box وشغّل. يتغير ما إذا كان padding محسوبًا داخل العرض المحدد.";
    }
    if (/Max-width/i.test(topic)) {
      spec.code = ".card { width: 100%; max-width: 240px; }"; spec.from = "240px"; spec.to = "320px";
      spec.task = "ارفع الحد الأقصى من 240px إلى 320px، ثم شغّل وقارن عرض البطاقة مع مساحة المعاينة.";
    }
    if (/Image Gallery/i.test(topic)) {
      spec.code = ".card .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }"; spec.from = "repeat(2, 1fr)"; spec.to = "repeat(1, 1fr)";
      spec.task = "اجعل صور المعرض في عمود واحد بدل عمودين، ثم شغّل وراقب ترتيب البطاقات المصورة.";
    }
    if (/Image Filters/i.test(topic)) {
      spec.code = ".card .art { filter: grayscale(0%); }"; spec.from = "0%"; spec.to = "100%";
      spec.task = "حوّل grayscale من 0% إلى 100% وشغّل. ستنتقل الصورة من ألوانها إلى درجات الرمادي.";
    }
    if (/Masking/i.test(topic)) {
      spec.concept = "mask-image تخفي أجزاء من الصورة أو تكشفها بحسب شفافية القناع. التدرج هنا يكشف جزءًا ويذيب الآخر.";
      spec.flow = "قناع متدرج ⟶ منطقة معتمة ظاهرة ⟶ منطقة شفافة مخفية";
      spec.code = ".card .art { mask-image: linear-gradient(to bottom, black 20%, transparent); }"; spec.from = "to bottom"; spec.to = "to right";
      spec.task = "غيّر اتجاه القناع إلى to right ثم شغّل. انتقل التدرج من أعلى الصورة إلى جانبها.";
    }
    if (/Image Shapes/i.test(topic)) {
      spec.concept = "clip-path يقص الصورة إلى شكل محدد. عدّل نصف قطر الدائرة لتتحكم في مساحة الجزء الظاهر.";
      spec.code = ".card .art { clip-path: circle(45%); }"; spec.from = "45%"; spec.to = "30%";
      spec.task = "صغّر الدائرة إلى 30% ثم شغّل ولاحظ الجزء الذي بقي ظاهرًا من الرسم.";
    }
    if (/Text Effects/i.test(topic)) {
      spec.code = ".card h1 { text-shadow: 0 1px 2px #8ca58a; }"; spec.from = "0 1px 2px"; spec.to = "0 3px 6px";
      spec.task = "وسّع ظل العنوان من 0 1px 2px إلى 0 3px 6px ثم شغّل ولاحظ عمق النص.";
    }
    if (/Image Sprites/i.test(topic)) {
      spec.concept = "sprite صورة واحدة تجمع رسومات صغيرة. نعرض جزءًا منها بتحديد حجم العنصر ثم تحريك background-position.";
      spec.flow = "صورة مجمعة ⟶ عنصر صغير ⟶ background-position يختار الجزء الظاهر";
      spec.code = ".tiles span { color: transparent; background-image: url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2260%22%20height=%2230%22%3E%3Ccircle%20cx=%2215%22%20cy=%2215%22%20r=%2212%22%20fill=%22%23e9f3e5%22/%3E%3Ccircle%20cx=%2245%22%20cy=%2215%22%20r=%2212%22%20fill=%22%238cb275%22/%3E%3C/svg%3E'); background-size: 60px 30px; background-position: left center; background-repeat: no-repeat; }"; spec.from = "left center"; spec.to = "right center";
      spec.task = "حرّك موضع الخلفية من left center إلى right center. الفكرة أن الموضع يختار الجزء الظاهر من صورة sprite واحدة.";
    }
    if (/Flexbox Intro/i.test(topic)) {
      spec.code = ".card .tiles { display: flex; gap: 8px; }"; spec.from = "8px"; spec.to = "18px";
      spec.task = "وسّع المسافة بين العناصر من 8px إلى 18px. Flexbox يرتب عناصر المجموعة في صف مرن.";
    }
    if (/Flex Container/i.test(topic)) {
      spec.concept = "الحاوية المرنة هي الأب الذي يقرر ترتيب العناصر ومحاذاتها والمسافة بينها. نغيّر خاصية واحدة ونراقب المجموعة كلها.";
      spec.flow = ".tiles ⟶ display:flex ⟶ الأب يوزع العناصر في صف";
      spec.code = ".card .tiles { display: flex; justify-content: flex-start; gap: 8px; }"; spec.from = "flex-start"; spec.to = "space-between";
      spec.task = "بدّل justify-content إلى space-between ثم شغّل. الحاوية توزع العناصر على عرض الصف.";
    }
    if (/Flex Items/i.test(topic)) {
      spec.concept = "كل عنصر داخل Flexbox يمكنه أن يكبر أو يصغر داخل المساحة المتاحة. flex-grow يحدد نصيبه من المساحة الزائدة.";
      spec.flow = "العناصر تشترك في الفراغ ⟶ flex-grow أكبر ⟶ العنصر يأخذ حصة أكبر";
      spec.code = ".card .tiles span:first-child { flex-grow: 1; }"; spec.from = "flex-grow: 1"; spec.to = "flex-grow: 2";
      spec.task = "ارفع flex-grow من 1 إلى 2 ثم شغّل. أول عنصر يطلب حصة أكبر من المساحة المتاحة.";
    }
    if (/Flex Responsive/i.test(topic)) {
      spec.code = ".card .tiles { display: flex; flex-wrap: nowrap; gap: 8px; }\n.card .tiles span { min-width: 110px; }"; spec.from = "flex-wrap: nowrap"; spec.to = "flex-wrap: wrap";
      spec.task = "بدّل nowrap إلى wrap ثم شغّل. عندما لا تتسع العناصر في الصف، تسمح لها القاعدة بالانتقال إلى صف آخر.";
    }
    if (/Grid Container/i.test(topic)) {
      spec.concept = "حاوية Grid تقسم المساحة إلى أعمدة وصفوف. نحدد الأعمدة والفجوة داخل الأب، ثم يوزع المتصفح العناصر.";
      spec.flow = ".tiles ⟶ repeat(3, 1fr) ⟶ ثلاثة أعمدة متساوية";
      spec.code = ".card .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }"; spec.from = "repeat(3, 1fr)"; spec.to = "repeat(2, 1fr)";
      spec.task = "حوّل الشبكة من ثلاثة أعمدة إلى عمودين، ثم شغّل وعدّ أماكن العناصر.";
    }
    if (/Grid Items/i.test(topic)) {
      spec.concept = "عنصر Grid يستطيع أن يشغل أكثر من مسار. grid-column يحدد الأعمدة التي يحتلها العنصر.";
      spec.flow = "العنصر الأول ⟶ grid-column: span 2 ⟶ يشغل عمودين";
      spec.code = ".card .tiles { display: grid; grid-template-columns: repeat(3, 1fr); }\n.card .tiles span:first-child { grid-column: span 2; }"; spec.from = "grid-column: span 2"; spec.to = "grid-column: span 1";
      spec.task = "اجعل العنصر الأول يشغل عمودًا واحدًا بدل اثنين، ثم شغّل وراقب بقية المربعات.";
    }
    if (/Grid 12-column/i.test(topic)) {
      spec.code = ".card .tiles { display: grid; grid-template-columns: repeat(12, 1fr); }\n.card .tiles span:first-child { grid-column: span 4; }"; spec.from = "span 4"; spec.to = "span 6";
      spec.task = "وسّع العنصر الأول من 4 أعمدة إلى 6 في شبكة الاثني عشر عمودًا، ثم شغّل.";
    }
    if (/Responsive Images/i.test(topic)) {
      spec.code = ".card .art { width: 100%; max-width: 260px; height: auto; }"; spec.from = "width: 100%"; spec.to = "width: 80%";
      spec.task = "اجعل عرض الصورة 80% بدلًا من ملء المساحة، ثم شغّل. الصورة تصغر مع الحاوية وتحافظ على تناسبها.";
    }
    if (/Responsive Videos/i.test(topic)) {
      spec.concept = "العنصر المرئي المتجاوب يحافظ على حجمه داخل الشاشة. نستخدم حدًا أقصى للعرض ونترك الارتفاع متناسبًا.";
      spec.code = ".card .art { width: 100%; max-width: 260px; height: auto; }"; spec.from = "260px"; spec.to = "220px";
      spec.task = "اخفض الحد الأقصى من 260px إلى 220px ثم شغّل. القاعدة نفسها تصلح مبدئيًا للوسائط ذات نسبة الأبعاد الثابتة.";
    }
    if (/^CSS Selectors$/.test(topic)) {
      spec.concept = "المحدد يطابق عناصر بعينها. ابدأ باسم الوسم، ثم أضف class أو علاقة بين العناصر لتضييق الاختيار.";
      spec.flow = ".card h1 ⟶ عنوان داخل البطاقة　|　.card > h1 ⟶ عنوان ابن مباشر";
      spec.quiz = "ما الجزء الذي يختار العناصر في القاعدة؟"; spec.options = ["المحدد قبل الأقواس", "قيمة color داخل الأقواس"];
      spec.code = ".card h1 { color: #256b57; }"; spec.from = "h1"; spec.to = "p";
      spec.task = "بدّل h1 إلى p، وشغّل. المحدد الآن يصل إلى الفقرة بدل العنوان؛ الخاصية واللون لم يتغيرا.";
    }
    if (/^CSS How To$/.test(topic)) {
      spec.concept = "تصل CSS بصفحتك بثلاث طرق: ملف خارجي عبر link، أو وسم style داخل head، أو style على العنصر. الملف الخارجي أسهل لإعادة الاستخدام.";
      spec.flow = "ملف CSS منفصل ⟶ <link> داخل head ⟶ قواعد تنسق عناصر body";
      spec.quiz = "أي طريقة تعيد استخدام التنسيق على صفحات متعددة؟"; spec.options = ["ملف CSS خارجي", "كتابة style داخل كل عنصر"];
      spec.code = "/* style.css: قاعدة محفوظة في ملف خارجي */\n.card h1 { color: #256b57; }"; spec.from = "#256b57"; spec.to = "#a65d32";
      spec.task = "غيّر لون العنوان في قاعدة style.css. عند العمل محليًا، اربط هذا الملف من head باستخدام <link rel=\"stylesheet\">.";
      spec.practiceVariants = ["#35658f", "#256b57"];
    }
    if (/^CSS Comments$/.test(topic)) {
      spec.concept = "التعليق بين /* و*/ ملاحظة للمطور؛ المتصفح يتجاهله ولا يطبقه كقاعدة تنسيق.";
      spec.flow = "/* ملاحظة */ ⟶ المتصفح يتجاوزها ⟶ يقرأ قاعدة CSS التالية";
      spec.quiz = "أي جزء من CSS لا يغير شكل الصفحة؟"; spec.options = ["التعليق بين /* و*/", "قيمة color داخل قاعدة"];
      spec.code = "/* لون العنوان */\n.card h1 { color: #256b57; }"; spec.from = "لون العنوان"; spec.to = "درجة لون العنوان";
      spec.task = "غيّر نص الملاحظة فقط، ثم شغّل. لون العنوان لا يتبدل لأن المتصفح يتجاهل ما بين علامتي التعليق.";
      spec.practiceVariants = ["ملاحظة عن العنوان", "درجة لون العنوان"];
    }
    if (/^CSS Colors$/.test(topic)) {
      spec.concept = "يمكن تمثيل اللون باسم مثل teal، أو HEX، أو RGB، أو HSL. الخاصية color تؤثر في النص، وbackground-color في مساحة العنصر.";
      spec.flow = "color للنص　|　background-color للخلفية　|　HEX / rgb() / hsl() لكتابة اللون";
      spec.quiz = "أي خاصية تغير خلفية العنصر؟"; spec.options = ["background-color", "text-decoration"];
      spec.code = ".card h1 { color: #256b57; background-color: #eaf3e9; }"; spec.from = "#256b57"; spec.to = "rgb(37, 107, 87)";
      spec.task = "اكتب لون النص بصيغة rgb بدل HEX، ثم شغّل. الصيغتان تمثلان اللون نفسه؛ جرّب خلفية العنصر بعد ذلك.";
      spec.practiceVariants = ["hsl(153, 49%, 28%)", "tomato"];
    }
    if (/^CSS Combinators$/.test(topic)) {
      spec.concept = "المُركّب يصف علاقة بين عنصرين: المسافة تختار أي سليل، و> تختار الابن المباشر، و+ يختار الشقيق التالي.";
      spec.flow = ".card h1 ⟶ أي عنوان داخل البطاقة　|　.card > h1 ⟶ الابن المباشر فقط";
      spec.quiz = "ماذا تعني المسافة بين محددين؟"; spec.options = ["العنصر الثاني سليل للأول", "العنصران متجاوران دائمًا"];
      spec.code = ".card > h1 { color: #256b57; }"; spec.from = ".card > h1"; spec.to = ".card h1";
      spec.task = "بدّل الابن المباشر بمحدد السليل، ثم شغّل. المسافة تصل إلى العنوان داخل البطاقة، أما > فتشترط ابنًا مباشرًا.";
      spec.practiceVariants = [".card > h1", ".card + h1"];
    }
    if (/^CSS Advanced Colors$/.test(topic)) {
      spec.concept = "قيم الألوان الحديثة تضيف الشفافية أو تستخدم قنوات لونية مختلفة. alpha يحدد مقدار ظهور اللون فوق ما تحته.";
      spec.flow = "rgb(37 107 87 / 50%) ⟶ اللون نفسه + شفافية 50٪";
      spec.quiz = "ماذا يضيف alpha إلى قيمة اللون؟"; spec.options = ["درجة الشفافية", "اسم العنصر المحدد"];
      spec.code = ".card h1 { color: rgb(37 107 87 / 100%); }"; spec.from = "100%"; spec.to = "50%";
      spec.task = "قلل alpha من 100% إلى 50% وشغّل. راقب شفافية الحروف، ثم أعدها إلى 100% للمقارنة.";
      spec.practiceVariants = ["25%", "75%"];
    }
    spec.family = family;
    spec.trace = spec.flow;
    return spec;
  }

  function jsFamily(topic) {
    if (/HTML DOM|HTML Events|HTML First|DOM Navigation|Graphics|Window API|Web API|Fetch API|JSON|AJAX|jQuery|JSONP/i.test(topic)) return /Events|Listener/i.test(topic) ? "events" : /DOM|HTML First/i.test(topic) ? "dom" : /Fetch|JSON|AJAX/i.test(topic) ? "network" : /Graphics/i.test(topic) ? "graphics" : "browser";
    if (/Asynchronous|Async|Promise|Callback/i.test(topic)) return "async";
    if (/If Conditions|If \/ Else|Ternary|Switch|Booleans|Logical|Conditional/i.test(topic)) return "conditions";
    if (/Loops|for Loop|while Loop|Break|Continue|Control Flow|Iteration|Iterables|Iterators|Generators/i.test(topic)) return "loops";
    if (/Array|Sets|Maps|Set Methods|WeakSet|WeakMap|Typed Arrays/i.test(topic)) return "collections";
    if (/Object|Classes|this|Meta & Proxy/i.test(topic)) return "objects";
    if (/Scope|Hoisting|Code Blocks|Strict Mode/i.test(topic)) return "scope";
    if (/Function|Timers/i.test(topic)) return "functions";
    if (/String/i.test(topic)) return "strings";
    if (/Numbers|Math|Date|BigInt/i.test(topic)) return "numbers";
    if (/Operators|Arithmetic|Assignment|Comparisons/i.test(topic)) return "operators";
    if (/Errors|Debugging|Mistakes|Performance|Style Guide|Best Practices/i.test(topic)) return "debug";
    if (/RegExp/i.test(topic)) return "regex";
    if (/Variables|Let|Const|Types|Symbols|typeof|undefined|NaN|Coercion|Conversion|Destructuring/i.test(topic)) return "values";
    return "basics";
  }

  function jsLessonSpec(topic, index) {
    var family = jsFamily(topic),
        spec = {
          topic: topic, family: family,
          concept: "هذا السطر فيه فعل واضح: الكمبيوتر يقرأه، ينفذه، ثم يعرض نتيجة يمكن ملاحظتها.",
          analogy: "تخيّل أمرًا قصيرًا في قائمة خطوات: الكمبيوتر ينفّذه ثم ينتقل لما بعده.",
          flow: "السطر الأول ⟶ ينفّذ الكمبيوتر الأمر ⟶ تظهر النتيجة",
          quiz: "أي سطر يطلب من الكمبيوتر تنفيذ فعل الآن؟",
          options: ["console.log(\"ابدأ\")", "const title = \"رحلة\""], correct: 0,
          code: "console.log(\"أول خطوة اشتغلت\");",
          from: "أول خطوة اشتغلت", to: "أنا شاهدت النتيجة",
          task: "بدّل الجملة المطبوعة إلى «أنا شاهدت النتيجة»، ثم شغّل وشاهدها في المعاينة."
        };
    if (family === "values") {
      spec.concept = "المتغير خانة تحمل قيمة باسم. const وlet يحددان طريقة إعادة تعيين هذه الخانة؛ وtypeof يسأل عن نوع القيمة.";
      spec.analogy = "اعتبره ملصقًا على صندوق: الاسم يحدد الخانة، والقيمة هي ما وضعناه بداخلها.";
      spec.flow = "اسم متغير ⟶ قيمة مخزنة ⟶ استخدام أو فحص";
      spec.quiz = "أي سطر يحجز خانة باسم points ويضع فيها 2؟";
      spec.options = ["let points = 2", "console.log(points)"];
      spec.code = "let points = 2;\nconsole.log(points);";
      spec.from = "2"; spec.to = "5";
      spec.task = "ارفع points من 2 إلى 5. اتبع الاسم إلى console.log لترى القيمة التي خرجت.";
      if (/Types|typeof|undefined|NaN|Symbols|Coercion|Conversion/i.test(topic)) {
        spec.code = 'const label = "قصة";\nconsole.log(typeof label);';
        spec.from = '"قصة"'; spec.to = "42";
        spec.task = "حوّل label من نص إلى الرقم 42. شغّل ولاحظ كيف تغيّر النوع الذي يعيده typeof.";
        spec.quiz = "ماذا يفحص typeof؟"; spec.options = ["نوع القيمة", "مكان حفظ الملف"];
      }
    } else if (family === "operators") {
      spec.concept = "المعامل هو الرمز الذي ينفذ عملية بين قيمتين، مثل الجمع أو المقارنة. القيم تدخل، والنتيجة تخرج.";
      spec.analogy = "مثل آلة حاسبة: تضع رقمين وتختار زر العملية.";
      spec.flow = "4 ⟶ + ⟶ 3 ⟶ 7";
      spec.quiz = "في 4 + 3، أي جزء يحدد العملية؟";
      spec.options = ["علامة +", "الرقم 4"];
      spec.code = "const total = 4 + 3;\nconsole.log(total);";
      spec.from = " + "; spec.to = " * ";
      spec.task = "بدّل عملية الجمع إلى ضرب. غيّر + فقط إلى *، ثم شغّل وقارن الناتج.";
    } else if (family === "conditions") {
      spec.concept = "الشرط سؤال إجابته true أو false. بناءً على الإجابة، يختار الكمبيوتر أي مسار ينفّذ.";
      spec.analogy = "مثل بوابة: إذا تحقق الشرط نمر من جهة، وإذا لم يتحقق نسلك الجهة الأخرى.";
      spec.flow = "قيمة ⟶ سؤال الشرط ⟶ مسار صحيح أو مسار بديل";
      spec.quiz = "متى يعمل جسم if؟";
      spec.options = ["عندما يكون الشرط صحيحًا", "في كل الأحوال مهما كانت النتيجة"];
      spec.code = 'const degree = 28;\nif (degree >= 25) {\n  console.log("دافئ");\n} else {\n  console.log("معتدل");\n}';
      spec.from = "25"; spec.to = "30";
      spec.task = "ارفع حد الشرط من 25 إلى 30، ثم شغّل وتابع كيف غيّر الكمبيوتر المسار.";
    } else if (family === "loops") {
      spec.concept = "الحلقة تعيد الفعل نفسه، وتغيّر قيمة صغيرة في كل دورة حتى تصل لشرط التوقف.";
      spec.analogy = "عدّاد يصعد خطوة خطوة: 1 ثم 2 ثم 3، وبعدها يتوقف عند الحد الذي حددته.";
      spec.flow = "ابدأ 1 ⟶ نفّذ ⟶ زد 1 ⟶ افحص الحد ⟶ كرر أو توقف";
      spec.quiz = "ما الذي يمنع الحلقة من التكرار إلى الأبد؟";
      spec.options = ["شرط توقف يتغير مع كل دورة", "كتابة console.log داخلها"];
      spec.code = 'for (let step = 1; step <= 3; step++) {\n  console.log("خطوة " + step);\n}';
      spec.from = "<= 3"; spec.to = "<= 4";
      spec.task = "مدّ العدّاد دورة إضافية: غيّر الحد 3 إلى 4، ثم شغّل وتتبع الأرقام بالترتيب.";
    } else if (family === "strings") {
      spec.concept = "النص قيمة يمكن حفظها ثم تنفيذ عمليات عليها، مثل البحث عن جزء أو تحويل حالة الحروف أو تركيب جملة.";
      spec.analogy = "مثل شريط كلمات؛ تختار موضعًا أو طريقة عرض ثم ترى النص الناتج.";
      spec.flow = '"maya" ⟶ toUpperCase() ⟶ "MAYA"';
      spec.quiz = "ما الذي ترجعه دالة toUpperCase؟";
      spec.options = ["نسخة حروفها كبيرة", "عدد عناصر المصفوفة"];
      spec.code = 'const name = "maya";\nconsole.log(name.toUpperCase());';
      spec.from = "toUpperCase"; spec.to = "toLowerCase";
      spec.task = "بدّل toUpperCase إلى toLowerCase ثم شغّل. لاحظ أن القيمة الأصلية ما زالت في name.";
      if (/Templates/i.test(topic)) { spec.code = 'const name = "سلمى";\nconsole.log(`أهلًا يا ${name}`);'; spec.from = "سلمى"; spec.to = "مريم"; spec.task = "غيّر الاسم داخل القالب إلى «مريم»، ثم شغّل وتابع كيف أُدرج الاسم داخل الجملة."; }
      if (/Search/i.test(topic)) { spec.code = 'const sentence = "أتعلم JavaScript خطوة خطوة";\nconsole.log(sentence.includes("JavaScript"));'; spec.from = '"JavaScript"'; spec.to = '"CSS"'; spec.task = "ابحث عن CSS بدل JavaScript ثم شغّل؛ includes تعطي true أو false."; }
    } else if (family === "numbers") {
      spec.concept = "الأرقام والتواريخ قيم، والدوال الجاهزة تساعدنا على حسابها أو استخراج جزء محدد منها.";
      spec.analogy = "مثل آلة قياس: تدخل قيمة، وتختار طريقة الحساب، فتظهر قراءة جديدة.";
      spec.flow = "القيمة ⟶ دالة الحساب ⟶ نتيجة يمكن استخدامها";
      spec.quiz = "ما ناتج Math.floor(3.6)؟";
      spec.options = ["3", "4"];
      spec.code = "console.log(Math.round(3.6));";
      spec.from = "Math.round"; spec.to = "Math.floor";
      spec.task = "بدّل التقريب إلى Math.floor وشغّل. قارن تقريبًا للأسفل بنتيجة round.";
      if (/Date/i.test(topic)) { spec.code = "const today = new Date();\nconsole.log(today.getFullYear());"; spec.from = "getFullYear"; spec.to = "getMonth"; spec.task = "بدّل getFullYear إلى getMonth وشغّل. لاحظ أن الشهر يبدأ عدّه من صفر في JavaScript."; }
    } else if (family === "functions") {
      spec.concept = "الدالة اسم لمجموعة أفعال. تستقبل مدخلات عند الحاجة، تنفذ خطواتها، وقد تعيد نتيجة.";
      spec.analogy = "مثل وصفة محفوظة: تعطيها مكوّنًا، تنفذ الخطوات، وتحصل على نتيجة.";
      spec.flow = "استدعاء ⟶ مدخلات ⟶ أوامر الدالة ⟶ return";
      spec.quiz = "ما وظيفة return في الدالة؟";
      spec.options = ["إرجاع نتيجة للمكان الذي استدعى الدالة", "تكرار الحلقة تلقائيًا"];
      spec.code = 'function double(number) {\n  return number * 2;\n}\nconsole.log(double(4));';
      spec.from = "double(4)"; spec.to = "double(6)";
      spec.task = "مرّر 6 بدل 4 للدالة، ثم تابع الرقم الذي أعادته.";
      if (/Timers/i.test(topic)) { spec.code = 'setTimeout(function() {\n  console.log("انتهى الانتظار");\n}, 500);'; spec.from = "500"; spec.to = "1200"; spec.task = "زِد الانتظار من 500ms إلى 1200ms ثم شغّل ولاحظ وقت ظهور الرسالة."; }
      if (/Arrow Functions/i.test(topic)) { spec.code = "const double = number => number * 2;\nconsole.log(double(4));"; spec.from = "double(4)"; spec.to = "double(6)"; spec.task = "مرّر 6 بدل 4 إلى الدالة السهمية، ثم تابع القيمة التي أعادتها."; }
    } else if (family === "collections") {
      spec.concept = "المصفوفة تحفظ قيمًا بترتيب وفهارس تبدأ من صفر؛ وSet وMap ينظمان قيمًا أو أزواجًا بطرق أخرى.";
      spec.analogy = "فكّر فيها كصف خانات: العنوان 0 للخانة الأولى، و1 للخانة الثانية.";
      spec.flow = "index 0 ⟶ القيمة الأولى　|　index 1 ⟶ القيمة الثانية";
      spec.quiz = "ما فهرس أول عنصر في مصفوفة JavaScript؟";
      spec.options = ["0", "1"];
      spec.code = 'const steps = ["ابدأ", "جرّب"];\nconsole.log(steps[0]);';
      spec.from = "[0]"; spec.to = "[1]";
      spec.task = "بدّل الفهرس من 0 إلى 1. شغّل وتتبّع كيف انتقلنا للخانة الثانية.";
      if (/Sets|WeakSet/i.test(topic)) { spec.code = 'const tools = new Set(["HTML", "CSS"]);\nconsole.log(tools.has("CSS"));'; spec.from = 'tools.has("CSS")'; spec.to = 'tools.has("JavaScript")'; spec.task = "اسأل Set عن JavaScript بدل CSS، ثم تابع هل الإجابة true أم false."; }
      if (/Maps|WeakMap/i.test(topic)) { spec.code = 'const lesson = new Map([["next", "CSS"]]);\nconsole.log(lesson.get("next"));'; spec.from = '[["next", "CSS"]]);\nconsole.log(lesson.get("next"))'; spec.to = '[["later", "CSS"]]);\nconsole.log(lesson.get("later"))'; spec.task = "بدّل المفتاح next إلى later في موضعيه وشغّل؛ المفتاح والقيمة زوج واحد."; }
    } else if (family === "objects") {
      spec.concept = "الكائن يجمع بيانات مرتبطة في خانات، وقد يحتوي أفعالًا. الحقول تصف ما يملكه؛ والدوال تحدد ما يفعله.";
      spec.analogy = "استمارة فيها خانات للفيلم والمقعد، ومعها فعل يعرض التذكرة؛ البيانات وصف، والدالة تنفيذ.";
      spec.flow = "ticket.movie = بيانات　|　ticket.show() = فعل";
      spec.quiz = "في ticket.movie، ما الذي يمثله movie؟";
      spec.options = ["خاصية تحمل بيانات", "دورة تكرار"];
      spec.code = 'const ticket = { movie: "الحديقة", seat: "A3" };\nconsole.log(ticket.movie);';
      spec.from = "ticket.movie"; spec.to = "ticket.seat";
      spec.task = "اطبع رقم المقعد بدل اسم الفيلم: غيّر ticket.movie إلى ticket.seat وتابع القيمة.";
      if (/Classes/i.test(topic)) { spec.code = 'class Ticket {\n  constructor(movie) { this.movie = movie; }\n  show() { return this.movie; }\n}\nconst ticket = new Ticket("الحديقة");\nconsole.log(ticket.show());'; spec.from = "console.log(ticket.show())"; spec.to = "console.log(ticket.movie)"; spec.task = "استخدم خانة الكائن مباشرة: بدّل console.log(ticket.show()) إلى console.log(ticket.movie). لاحظ الفرق بين استدعاء الفعل وقراءة البيانات."; }
      if (/Object Constructors/i.test(topic)) { spec.code = 'function Ticket(movie) { this.movie = movie; }\nconst ticket = new Ticket("الحديقة");\nconsole.log(ticket.movie);'; spec.from = '"الحديقة"'; spec.to = '"المكتبة"'; spec.task = "أنشئ التذكرة باسم «المكتبة» بدل «الحديقة»، ثم تابع كيف خزّنه constructor."; }
      if (/Object Methods/i.test(topic)) { spec.code = 'const ticket = { movie: "الحديقة", show() { return this.movie; } };\nconsole.log(ticket.show());'; spec.from = "console.log(ticket.show())"; spec.to = "console.log(ticket.movie)"; spec.task = "اقرأ قيمة movie مباشرة بدل استدعاء show؛ قارن خانة البيانات بالفعل."; }
    } else if (family === "events" || family === "dom") {
      spec.concept = family === "events" ? "الحدث إشارة مثل الضغط. نختار العنصر، ثم نربط الإشارة بدالة تنفذ عندما تقع." : "DOM صورة HTML في شكل عناصر يستطيع JavaScript اختيارها وقراءة محتواها أو تغييره.";
      spec.analogy = family === "events" ? "زر الجرس يرسل إشارة؛ مستمع الحدث يلتقطها، ثم ينفذ الفعل المطلوب." : "تعامل مع الصفحة كقائمة عناصر: اختر العنصر بالاسم، ثم غيّر خانة النص فيه.";
      spec.flow = family === "events" ? "ضغط الزر ⟶ listener يستقبل الحدث ⟶ تتغير الرسالة" : "document ⟶ اختيار #result ⟶ تغيير textContent";
      spec.quiz = family === "events" ? "متى تعمل الدالة داخل addEventListener('click', ...)؟" : "ماذا يعيد querySelector('#result')؟";
      spec.options = family === "events" ? ["عند الضغط على الزر", "قبل تحميل الصفحة دائمًا"] : ["العنصر المطابق داخل الصفحة", "كل ملفات CSS"];
      spec.code = family === "events" ? 'const button = document.querySelector("#change");\nbutton.addEventListener("click", function() {\n  document.querySelector("#result").textContent = "وصلت الإشارة";\n});' : 'document.querySelector("#result").textContent = "غيّرت الصفحة";';
      spec.from = family === "events" ? "وصلت الإشارة" : "غيّرت الصفحة";
      spec.to = family === "events" ? "أنا جرّبت الحدث" : "أنا جرّبت DOM";
      spec.task = family === "events" ? "بدّل رسالة النقر إلى «أنا جرّبت الحدث»، شغّل، ثم اضغط الزر في المعاينة." : "بدّل النص إلى «أنا جرّبت DOM»، شغّل وشاهد العنصر يتغير أمامك.";
    } else if (family === "network") {
      spec.concept = /JSON/i.test(topic) ? "JSON صيغة نصية مرتبة لنقل البيانات. نحلل النص إلى كائن، ثم نقرأ قيمة من داخله." : /Fetch/i.test(topic) ? "fetch يرسل طلبًا إلى عنوان، ثم نقرأ الرد وبياناته قبل عرضها." : "الطلب غير المتزامن ينتظر ردًا؛ نرتب الخطوات حتى نستخدم البيانات بعد وصولها.";
      spec.analogy = "مثل طلب معلومة: ترسل العنوان، تنتظر الرد، ثم تفتح الرسالة وتقرأ الحقل المطلوب.";
      spec.flow = "طلب ⟶ رد ⟶ تحويل البيانات ⟶ استعمال القيمة";
      spec.quiz = /JSON/i.test(topic) ? "لماذا نستخدم JSON.parse؟" : "ما الخطوة التي تسبق قراءة response.json()؟";
      spec.options = /JSON/i.test(topic) ? ["تحويل نص JSON إلى قيمة JavaScript", "رسم عنصر HTML"] : ["استلام response من الطلب", "حذف الشبكة"];
      spec.code = /JSON/i.test(topic) ? 'const raw = "{\\\"title\\\":\\\"رحلة\\\"}";\nconst book = JSON.parse(raw);\nconsole.log(book.title);' : /Fetch/i.test(topic) ? 'fetch("https://jsonplaceholder.typicode.com/todos/1")\n  .then(response => response.json())\n  .then(data => console.log(data.title))\n  .catch(() => console.log("تعذّر الاتصال الآن"));' : 'Promise.resolve({ title: "رحلة قصيرة" })\n  .then(data => console.log(data.title));';
      spec.from = /Fetch/i.test(topic) ? "todos/1" : /JSON/i.test(topic) ? "رحلة" : "رحلة قصيرة";
      spec.to = /Fetch/i.test(topic) ? "todos/2" : /JSON/i.test(topic) ? "زيارة" : "زيارة قصيرة";
      spec.task = /Fetch/i.test(topic) ? "غيّر رقم المورد من 1 إلى 2 وشغّل. عند توفر الاتصال سترى عنوانًا آخر؛ وإن تعذر، ستظهر رسالة بديلة." : "بدّل قيمة title في البيانات إلى «زيارة»، ثم شغّل وتتبّع مكان قراءتها.";
    } else if (family === "async") {
      spec.concept = "الوعد Promise يمثل نتيجة ستصل لاحقًا. then يحدد ما نفعله بعد نجاحها، وcatch يتعامل مع الفشل.";
      spec.analogy = "مثل رقم طلب: تستلمه الآن، وعندما يصل الرد تبدأ الخطوة التالية.";
      spec.flow = "Promise ⟶ انتظار ⟶ then عند النجاح / catch عند الفشل";
      spec.quiz = "متى يعمل then؟";
      spec.options = ["بعد نجاح الوعد ووصول قيمته", "قبل إنشاء الوعد"];
      spec.code = 'Promise.resolve("وصلت البيانات")\n  .then(value => console.log(value));';
      spec.from = "وصلت البيانات"; spec.to = "تم تحديث القائمة";
      spec.task = "بدّل الرسالة التي تصل في الوعد، ثم شغّل وتابع أن then استقبل القيمة الجديدة.";
    } else if (family === "regex") {
      spec.concept = "التعبير النمطي نمط يبحث عن نص يطابق قاعدة؛ test يعيد true أو false بدل المرور على الحروف يدويًا.";
      spec.analogy = "مثل قالب بحث: قارن شكل الكلمة بالنمط ثم أرجع هل تطابق أم لا.";
      spec.flow = "/web/i ⟶ test(\"WEB\") ⟶ true";
      spec.quiz = "ما نتيجة test عندما يطابق النص النمط؟";
      spec.options = ["true", "عنصر جديد في الصفحة"];
      spec.code = 'const pattern = /web/i;\nconsole.log(pattern.test("WEB"));';
      spec.from = "/web/i"; spec.to = "/html/i";
      spec.task = "بدّل النمط إلى /html/i وشغّل. قارن النمط بالكلمة WEB ولاحظ الإجابة المنطقية.";
    } else if (family === "browser") {
      spec.concept = "واجهات المتصفح تتيح قراءة معلومات النافذة أو الموقع والتعامل مع قدرات المتصفح من JavaScript.";
      spec.analogy = "كأن برنامجك يسأل المتصفح عن نافذته أو عنوان الصفحة، ثم يستخدم الإجابة.";
      spec.flow = "window / browser API ⟶ معلومة ⟶ استعمالها";
      spec.quiz = "أي اسم يمثل واجهة نافذة المتصفح؟";
      spec.options = ["window", "padding"];
      spec.code = "console.log(window.innerWidth);";
      spec.from = "innerWidth"; spec.to = "innerHeight";
      spec.task = "بدّل innerWidth إلى innerHeight ثم شغّل؛ كلاهما معلومة من نافذة المعاينة.";
    } else if (family === "graphics") {
      spec.concept = "Canvas مساحة رسم؛ JavaScript يطلب من سياق الرسم تنفيذ أوامر مثل ملء مستطيل.";
      spec.analogy = "مثل ورقة رسم، ثم قلم يختار اللون ويرسم عند إحداثيات محددة.";
      spec.flow = "canvas ⟶ سياق 2D ⟶ لون ⟶ رسم شكل";
      spec.quiz = "ما دور getContext('2d')؟";
      spec.options = ["إعطاء أوامر الرسم ثنائي الأبعاد", "قراءة كلمة مرور المتصفح"];
      spec.code = 'const canvas = document.querySelector("canvas");\nconst ctx = canvas.getContext("2d");\nctx.fillStyle = "#27805d";\nctx.fillRect(10, 10, 60, 35);';
      spec.from = "#27805d"; spec.to = "#d9893d";
      spec.task = "غيّر لون الرسم إلى #d9893d ثم شغّل ولاحظ المستطيل على اللوحة.";
    } else if (family === "debug") {
      spec.concept = /Errors|Mistakes/i.test(topic) ? "رسالة الخطأ دليل يحدد مكانًا أو اسمًا لا يعرفه الكمبيوتر. اقرأه، ثم تتبع الاسم خطوة خطوة." : "التصحيح يبدأ بملاحظة قيمة صغيرة عند نقطة محددة، ثم متابعة تنفيذ السطور بالترتيب.";
      spec.analogy = "مثل مراجعة فاتورة سطرًا سطرًا حتى تجد الخانة التي لا تطابق الحساب.";
      spec.flow = "اقرأ الرسالة ⟶ حدد السطر ⟶ افحص القيمة ⟶ أصلح السبب";
      spec.quiz = "ما أول خطوة مفيدة عند ظهور خطأ؟";
      spec.options = ["قراءة الرسالة وتحديد السطر", "حذف البرنامج كله"];
      spec.code = /Errors|Mistakes/i.test(topic) ? "const total = 5 + 2;\nconsole.log(totla);" : 'console.log("الخطوة ١");\nconsole.log("الخطوة ٢");';
      spec.from = /Errors|Mistakes/i.test(topic) ? "totla" : "الخطوة ٢";
      spec.to = /Errors|Mistakes/i.test(topic) ? "total" : "الخطوة ٣";
      spec.task = /Errors|Mistakes/i.test(topic) ? "في الرسالة يظهر اسم غير معروف. صحّح totla إلى total ثم شغّل." : "غيّر رسالة السطر الثاني إلى «الخطوة ٣»، ثم شغّل واتبع ترتيب التنفيذ.";
    }
    if (/Scope|Hoisting|Code Blocks|Strict Mode|var \/ let \/ const/i.test(topic)) {
      spec.family = "scope";
      spec.concept = /Hoisting/i.test(topic) ? "ترتيب تعريف المتغير والدالة يؤثر في وقت إتاحتهما. ابدأ بقراءة التعريف قبل استخدام الاسم لتبقى حركة التنفيذ واضحة." : "النطاق يحدد أين يمكن للكمبيوتر رؤية الاسم. المتغير داخل دالة أو كتلة قد لا يكون متاحًا خارجها.";
      spec.analogy = "مثل خانة داخل غرفة: من داخل النطاق تستطيع الوصول إليها، وخارجه لا يرى الاسم نفسه.";
      spec.flow = "كتلة { } ⟶ نطاق محلي ⟶ الاسم متاح داخل حدوده";
      spec.quiz = "أين يمكن استخدام متغير محلي داخل دالة؟"; spec.options = ["داخل نطاق الدالة", "في كل ملف تلقائيًا"];
      spec.code = 'function showScore() {\n  const score = 7;\n  console.log(score);\n}\nshowScore();';
      spec.from = "score);"; spec.to = "score + 1);";
      spec.task = "أضف 1 عند طباعة score داخل نطاق الدالة، ثم شغّل ولاحظ أن الاسم استُخدم في مكان تعريفه.";
    }
    if (/Modules/i.test(topic)) {
      spec.concept = "الوحدة module ملف مستقل يصدّر قيمة أو دالة، وملف آخر يستوردها عند الحاجة. هذا يقسم المشروع إلى أجزاء يمكن تتبعها.";
      spec.analogy = "مثل درج أدوات: ملف يجهز أداة باسم، وملف آخر يستوردها ويستخدمها.";
      spec.flow = "export من ملف ⟶ import في ملف آخر ⟶ استدعاء الأداة";
      spec.quiz = "ما وظيفة export؟"; spec.options = ["إتاحة قيمة لملف آخر", "إيقاف تنفيذ كل الملفات"];
      spec.code = '// message.js: export const greeting = "...";\n// app.js: import { greeting } from "./message.js";\nconst greeting = "أهلًا من ملف مستقل";\nconsole.log(greeting);';
      spec.from = "أهلًا من ملف مستقل"; spec.to = "مرحبًا من ملف مستقل";
      spec.task = "غيّر النص الذي يصدّره الملف إلى «مرحبًا من ملف مستقل»، ثم شغّل. ملف آخر يستطيع استيراد greeting واستخدامه.";
    }
    if (/Versions/i.test(topic)) {
      spec.concept = "إصدارات JavaScript تضيف إمكانات جديدة مع الوقت. معرفة الإصدار تساعدك تتعرف على الصيغة التي يستخدمها المشروع.";
      spec.analogy = "مثل نسخ متتابعة من دليل: الأساس يستمر، وتضاف إليه أدوات جديدة.";
      spec.flow = "صيغة أقدم ⟶ إصدار أحدث ⟶ إمكانات إضافية";
      spec.quiz = "لماذا نراجع إصدار JavaScript؟"; spec.options = ["لمعرفة الصيغ المدعومة", "لتغيير لون الصفحة"];
      spec.code = 'const version = "ES6";\nconsole.log("الإصدار: " + version);';
      spec.from = "ES6"; spec.to = "ESNext";
      spec.task = "بدّل قيمة الوصف من ES6 إلى ESNext، ثم شغّل؛ الإصدارات تضيف صيغًا جديدة مع الحفاظ على أساس اللغة.";
    }
    if (/AJAX/i.test(topic)) {
      spec.concept = "AJAX يطلب بيانات من الخادم بينما تبقى الصفحة مفتوحة. fetch هو الأسلوب الحديث لإرسال هذا الطلب.";
      spec.analogy = "مثل إرسال طلب للمطبخ واستلام النتيجة دون مغادرة الطاولة.";
      spec.flow = "الصفحة ترسل طلبًا ⟶ الخادم يرد ⟶ نحدّث جزءًا من الصفحة";
      spec.quiz = "هل يلزم إعادة تحميل الصفحة كاملة بعد كل طلب AJAX؟"; spec.options = ["لا، يمكن تحديث جزء منها", "نعم دائمًا"];
      spec.code = 'fetch("https://jsonplaceholder.typicode.com/todos/1")\n  .then(response => response.json())\n  .then(data => console.log(data.title))\n  .catch(() => console.log("تعذّر الاتصال الآن"));';
      spec.from = "todos/1"; spec.to = "todos/2";
      spec.task = "غيّر رقم المورد من 1 إلى 2 ثم شغّل؛ إذا لم يتوفر الاتصال، ستظهر رسالة بديلة.";
    }
    if (/Where To/i.test(topic)) {
      spec.concept = "يمكن كتابة JavaScript داخل script في الصفحة أو ربط ملف خارجي. فصل script.js عن HTML يجعل كل ملف مسؤولًا عن دوره.";
      spec.analogy = "مثل فصل ورقة التعليمات عن محتوى الصفحة، ثم وضع رابط بينهما يعرف المتصفح أين يجدها.";
      spec.flow = 'index.html ⟶ <script src="script.js"> ⟶ تنفيذ الملف';
      spec.quiz = "ما وظيفة src في وسم script الخارجي؟"; spec.options = ["تحديد ملف JavaScript", "تغيير لون النص"];
      spec.code = '// ملف HTML يربط JavaScript عبر <script src="script.js">\nconsole.log("هذا المثال يعيش في script.js");';
      spec.from = "script.js"; spec.to = "main.js";
      spec.task = "عدّل اسم الملف في التعليق إلى main.js ثم شغّل. المحرر يمثل ملف JavaScript منفصلًا عن HTML.";
    }
    if (/Output/i.test(topic)) {
      spec.concept = "JavaScript يستطيع عرض قيمة في الصفحة أو في console. اختر مكان الإخراج بحسب ما تريد أن يراه المستخدم أو المطور.";
      spec.analogy = "مثل اختيار لوحة الإعلان: النتيجة قد تظهر داخل الصفحة أو في سجل المطور.";
      spec.flow = "console.log(value) ⟶ سجل الإخراج　|　textContent ⟶ نص داخل الصفحة";
      spec.quiz = "أي أمر يكتب قيمة في سجل الإخراج لهذا المثال؟"; spec.options = ["console.log(...) ", "const value = ..."];
      spec.code = 'console.log("ظهرت النتيجة هنا");';
      spec.from = "ظهرت النتيجة هنا"; spec.to = "النتيجة واضحة الآن";
      spec.task = "غيّر الجملة المطبوعة إلى «النتيجة واضحة الآن»، ثم شغّل وشاهدها في صندوق الإخراج.";
    }
    if (/Statements/i.test(topic)) {
      spec.concept = "الجملة statement خطوة مكتملة من البرنامج. تُنفذ الجمل عادة بالترتيب من أعلى لأسفل.";
      spec.analogy = "مثل قائمة مهام مرقمة: نفّذ الأولى، ثم الثانية، ثم اقرأ النتيجة.";
      spec.flow = "تعريف ⟶ تحديث ⟶ طباعة القيمة";
      spec.quiz = "بأي ترتيب تنفذ الجمل العادية؟"; spec.options = ["من أعلى إلى أسفل", "من آخر الملف إلى أوله"];
      spec.code = "let steps = 1;\nsteps = steps + 1;\nconsole.log(steps);";
      spec.from = "steps + 1"; spec.to = "steps + 2";
      spec.task = "زد القيمة مرة إضافية بتغيير steps + 1 إلى steps + 2، ثم شغّل وتتبع السطور.";
    }
    if (/Iterators/i.test(topic)) {
      spec.concept = "المكرر iterator يقدّم عنصرًا في كل مرة. next يحرّك المؤشر، وvalue تحمل العنصر الحالي.";
      spec.analogy = "مثل قارئ قائمة يضع إصبعه على العنصر الحالي، ثم ينتقل للذي يليه عند طلب next.";
      spec.flow = "next() ⟶ العنصر الحالي ⟶ next() ⟶ العنصر التالي";
      spec.quiz = "ما الذي تعيده next().value؟"; spec.options = ["قيمة العنصر الحالي", "كل عناصر الصفحة"];
      spec.code = 'const names = ["أحمد", "منى"];\nconst iterator = names[Symbol.iterator]();\nconsole.log(iterator.next().value);\nconsole.log(iterator.next().value);';
      spec.from = 'console.log(iterator.next().value);\nconsole.log(iterator.next().value);';
      spec.to = 'console.log(iterator.next().value);\nconsole.log(iterator.next().value + " ثم التالي");';
      spec.task = "عدّل الطباعة الثانية لتضيف «ثم التالي»، ثم شغّل واتبع كيف next يطلب العنصر التالي.";
    }
    if (/Generators/i.test(topic)) {
      spec.concept = "المولد generator دالة تتوقف مؤقتًا عند yield، ثم تكمل من موضعها عندما نطلب القيمة التالية.";
      spec.analogy = "مثل قصة على فصول قصيرة: تعرض فصلًا، تتوقف، ثم تتابع الفصل التالي عند الطلب.";
      spec.flow = "yield 1 ⟶ توقف ⟶ next() ⟶ yield 2";
      spec.quiz = "ما الذي يفعله yield؟"; spec.options = ["يوقف المولد مؤقتًا ويعيد قيمة", "يمسح المصفوفة"];
      spec.code = 'function* count() { yield 1; yield 2; }\nconst steps = count();\nconsole.log(steps.next().value);';
      spec.from = "yield 2"; spec.to = "yield 3";
      spec.task = "غيّر القيمة التي ستخرج في المرة الثانية إلى 3؛ كل next يطلب خطوة جديدة من المولد.";
    }
    if (/jQuery/i.test(topic)) {
      spec.concept = "jQuery مكتبة لتبسيط اختيار عناصر الصفحة وتغييرها. تعلّم قراءتها يفيدك في المشاريع القديمة؛ DOM الحديث يؤدي الدور نفسه مباشرة.";
      spec.analogy = "مثل اختصار قديم لأمر أطول: يسهل قراءته في مشروع قديم، مع وجود طريقة أصلية في المتصفح.";
      spec.flow = "اختيار عنصر ⟶ تغيير محتوى أو تنسيق ⟶ ملاحظة النتيجة";
      spec.quiz = "لماذا ما زال التعرف على jQuery مفيدًا؟"; spec.options = ["لفهم مشاريع قديمة موجودة", "لأن JavaScript لا يعمل من دونها"];
      spec.code = 'document.querySelector("#result").textContent = "غيّرت العنصر";';
      spec.from = "غيّرت العنصر"; spec.to = "فهمت الاختصار";
      spec.task = "غيّر نص العنصر وشغّل. هذا يوضح الفعل الذي تختصره مكتبات مثل jQuery.";
    }
    if (/JSONP/i.test(topic)) {
      spec.concept = "JSONP أسلوب قديم لقراءة بيانات عبر استدعاء callback. تعرّف عليه عند صيانة مشاريع قديمة، واستخدم Fetch في المشاريع الجديدة.";
      spec.analogy = "الخادم يرسل البيانات في استدعاء دالة باسم متفق عليه؛ هذه طريقة تاريخية قبل انتشار CORS وfetch.";
      spec.flow = "ردّ الخادم ⟶ callback معروف ⟶ معالجة البيانات";
      spec.quiz = "متى قد تحتاج لفهم JSONP؟"; spec.options = ["عند قراءة كود قديم", "في كل طلب API جديد"];
      spec.code = 'function showData(data) { console.log(data.title); }\nshowData({ title: "بيانات وصلت" });';
      spec.from = "بيانات وصلت"; spec.to = "رد قديم وصل";
      spec.task = "بدّل النص الذي وصل داخل callback ثم شغّل وتابع كيف استقبلته الدالة.";
    }
    if (/Typed Arrays/i.test(topic)) {
      spec.family = "collections";
      spec.concept = "TypedArray يخزن أرقامًا في مساحة محددة النوع والحجم؛ يفيد عند التعامل مع بيانات ثنائية أو رسومية.";
      spec.analogy = "مثل صف خانات لها نوع واحد ومقاس ثابت؛ كل خانة تحفظ رقمًا وفق هذا النوع.";
      spec.flow = "Uint8Array ⟶ index 0 ⟶ قيمة من 0 إلى 255";
      spec.quiz = "ما الذي يميز Uint8Array؟"; spec.options = ["يخزن أعدادًا صحيحة صغيرة بنوع ثابت", "يخزن جملًا بأي طول"];
      spec.code = "const bytes = new Uint8Array([12, 24]);\nconsole.log(bytes[0]);";
      spec.from = "[0]"; spec.to = "[1]";
      spec.task = "انقل القراءة من الفهرس 0 إلى 1، ثم شغّل وتتبع الخانة الثانية.";
    }
    if (/Temporal/i.test(topic)) {
      spec.family = "numbers";
      spec.concept = "Temporal واجهة حديثة للتعامل مع التاريخ والوقت ومناطقهما بوضوح أكبر من الطرق القديمة.";
      spec.analogy = "مثل كتابة الموعد مع منطقته الزمنية بدل رقم غامض لا نعرف لأي مدينة يعود.";
      spec.flow = "تاريخ ووقت محددان ⟶ منطقة زمنية ⟶ لحظة أوضح";
      spec.quiz = "ما الذي تضيفه المنطقة الزمنية للتاريخ؟"; spec.options = ["توضح المكان الذي يخصه الوقت", "تغير نوع الخط"];
      spec.code = 'const appointment = { hour: 17, zone: "Africa/Cairo" };\nconsole.log(appointment.hour + ":00 " + appointment.zone);';
      spec.from = "17"; spec.to = "18";
      spec.task = "غيّر ساعة الموعد إلى 18 ثم شغّل؛ المنطقة الزمنية ما زالت جزءًا من وصف الموعد.";
    }
    if (/HTML First/i.test(topic)) {
      spec.concept = "ابدأ المحتوى في HTML ثم أضف JavaScript تدريجيًا. الصفحة تظل مقروءة حتى قبل إضافة السلوك التفاعلي.";
      spec.analogy = "مثل تجهيز المسرح أولًا ثم إضافة الإضاءة والحركة؛ الأساس موجود قبل المؤثرات.";
      spec.flow = "HTML يعرض المحتوى ⟶ JavaScript يضيف التفاعل عند الحاجة";
      spec.quiz = "أي طبقة تحمل المحتوى الأساسي؟"; spec.options = ["HTML", "JavaScript وحده"];
      spec.code = 'document.querySelector("#result").textContent = "أضفنا سلوكًا تدريجيًا";';
      spec.from = "سلوكًا تدريجيًا"; spec.to = "تفاعلًا بسيطًا";
      spec.task = "بدّل النص إلى «أضفنا تفاعلًا بسيطًا»، شغّل ولاحظ أن JavaScript يحسّن محتوى HTML الموجود.";
    }
    if (/Comments/i.test(topic)) {
      spec.concept = "التعليق ملاحظة للمبرمج يتجاهلها الكمبيوتر أثناء تنفيذ البرنامج.";
      spec.analogy = "مثل ملاحظة بالقلم على الهامش: تساعدك تتذكر السبب لكنها ليست أمرًا للكمبيوتر.";
      spec.flow = "// ملاحظة للمبرمج　|　console.log(...) أمر يُنفّذ";
      spec.quiz = "هل ينفذ الكمبيوتر النص بعد // في السطر نفسه؟";
      spec.options = ["لا، هذا تعليق", "نعم، يطبعه تلقائيًا"];
      spec.code = '// رسالة للمبرمج\nconsole.log("ظهر الأمر");';
      spec.from = "رسالة للمبرمج"; spec.to = "سبب هذا السطر";
      spec.task = "استبدل الملاحظة بـ «سبب هذا السطر»، ثم شغّل. ستبقى النتيجة نفسها لأن التعليق لا ينفذ.";
      spec.practiceVariants = ["تعليق يشرحه المطور", "ملاحظة عن النتيجة"];
    }
    if (/^JS Let$/i.test(topic)) {
      spec.concept = "let ينشئ خانة باسم، ويسمح بإسناد قيمة جديدة إليها لاحقًا. راقب الاسم نفسه قبل التعديل وبعده.";
      spec.flow = "let points = 2 ⟶ points = 5 ⟶ console.log(points) يعرض 5";
      spec.quiz = "أي تعريف يناسب خانة ستتغير قيمتها؟"; spec.options = ["let", "قيمة ثابتة لا نعيد إسنادها"];
      spec.code = "let points = 2;\npoints = 5;\nconsole.log(points);"; spec.from = "points = 5"; spec.to = "points = 7";
      spec.task = "غيّر الإسناد الثاني من 5 إلى 7، ثم تتبّع النقطة: الاسم بقي points والقيمة التي ستطبع أصبحت 7.";
    }
    if (/^JS Const$/i.test(topic)) {
      spec.concept = "const ينشئ اسمًا لا نعيد إسناد قيمة جديدة إليه. هنا نملأ الخانة مرة، ثم نقرأ ما فيها.";
      spec.flow = "const points = 3 ⟶ تثبيت الإسناد ⟶ console.log يقرأ 3";
      spec.quiz = "هل نعيد إسناد قيمة جديدة للاسم المعرّف بـ const؟"; spec.options = ["لا", "نعم في أي سطر"];
      spec.code = "const points = 3;\nconsole.log(points);"; spec.from = "3"; spec.to = "8";
      spec.task = "غيّر القيمة الأولية من 3 إلى 8، ثم شغّل. القيمة تتحدد عند التعريف؛ لا تضف إسنادًا ثانيًا إلى points.";
    }
    if (/^JS Ternary$/i.test(topic)) {
      spec.concept = "المعامل الثلاثي يختار قيمة من بديلين بحسب شرط: نتيجة صحيحة قبل النقطتين، ونتيجة أخرى بعدها.";
      spec.flow = "شرط age >= 18؟ ⟶ نعم: مسموح　|　لا: انتظر";
      spec.quiz = "أي قيمة تظهر عندما يكون الشرط false؟"; spec.options = ["القيمة بعد النقطتين", "القيمة قبل علامة ؟"];
      spec.code = 'const age = 20;\nconst message = age >= 18 ? "مسموح" : "انتظر";\nconsole.log(message);'; spec.from = "20"; spec.to = "16";
      spec.task = "غيّر age إلى 16، ثم شغّل واتبع الشرط حتى القيمة التي اختارها الكمبيوتر بعد النقطتين.";
    }
    if (/^JS Switch$/i.test(topic)) {
      spec.concept = "switch يقارن قيمة واحدة بحالات مرتبة. عند تطابق case ينفذ فرعها، وbreak يخرج من الاختيار.";
      spec.flow = 'day = "السبت" ⟶ case "السبت" ⟶ اطبع "راحة"';
      spec.quiz = "ما الذي يحدد فرع switch المطابق؟"; spec.options = ["مقارنة القيمة مع case", "اسم الدالة"];
      spec.code = 'const day = "السبت";\nswitch (day) {\n  case "السبت": console.log("راحة"); break;\n  default: console.log("عمل");\n}'; spec.from = "السبت"; spec.to = "الأحد";
      spec.task = "بدّل اليوم إلى الأحد ثم شغّل. قارن القيمة بالحالة، ولاحظ انتقال التنفيذ إلى default.";
    }
    if (/^JS Booleans$/i.test(topic)) {
      spec.concept = "القيمة المنطقية واحدة من اثنتين: true أو false. الشرط يستخدمها ليختار المسار.";
      spec.flow = "isReady = true ⟶ if يقرأ true ⟶ يطبع الرسالة";
      spec.quiz = "ما القيمتان المنطقيتان في JavaScript؟"; spec.options = ["true و false", "yes و no"];
      spec.code = 'const isReady = true;\nconsole.log(isReady);'; spec.from = "true"; spec.to = "false";
      spec.task = "حوّل isReady إلى false ثم شغّل. المتغير نفسه بقي، لكن القيمة المنطقية تبدلت.";
    }
    if (/^JS Logical$/i.test(topic)) {
      spec.concept = "المعاملات المنطقية تجمع شروطًا: && تحتاج تحقق الشرطين، و|| تكفيها صحة أحدهما، و! تعكس النتيجة.";
      spec.flow = "age >= 18 && hasTicket ⟶ الشرطان صحيحان؟ ⟶ يسمح بالدخول";
      spec.quiz = "متى تكون نتيجة الشرطين مع && صحيحة؟"; spec.options = ["عندما يكون الشرطان صحيحين", "إذا كان أحدهما فقط صحيحًا"];
      spec.code = "const age = 20;\nconst hasTicket = true;\nconsole.log(age >= 18 && hasTicket);"; spec.from = "&&"; spec.to = "||";
      spec.task = "بدّل && إلى || وشغّل. إذا صار أحد الشرطين كافيًا، تتغير نتيجة الاختبار المنطقي.";
    }
    if (/^JS while Loop$/i.test(topic)) {
      spec.concept = "while تفحص الشرط قبل كل دورة. نزيد العداد داخل الجسم كي يصل إلى حد التوقف.";
      spec.flow = "step = 1 ⟶ افحص <= 3 ⟶ اطبع ⟶ زد 1 ⟶ افحص من جديد";
      spec.code = 'let step = 1;\nwhile (step <= 3) {\n  console.log(step);\n  step++;\n}'; spec.from = "<= 3"; spec.to = "<= 4";
      spec.task = "مدّ الحلقة دورة واحدة بتغيير 3 إلى 4. تتبّع العداد: 1، ثم 2، ثم 3، ثم 4، وبعدها يتوقف.";
    }
    if (/^JS Break$/i.test(topic)) {
      spec.concept = "break يوقف الحلقة فورًا عند الوصول إليه، حتى لو كان شرط الحلقة ما زال يسمح بدورات أخرى.";
      spec.flow = "1 ⟶ 2 ⟶ عند 3: break ⟶ خروج من الحلقة";
      spec.code = 'for (let step = 1; step <= 5; step++) {\n  if (step === 3) break;\n  console.log(step);\n}'; spec.from = "step === 3"; spec.to = "step === 4";
      spec.task = "غيّر نقطة الخروج إلى 4. قبلها راقب الأرقام المطبوعة، وعندها يتوقف الكمبيوتر ويخرج من الحلقة.";
    }
    if (/^JS Continue$/i.test(topic)) {
      spec.concept = "continue يتجاوز بقية أوامر الدورة الحالية، ثم يبدأ الدورة التالية. الحلقة نفسها لا تنتهي.";
      spec.flow = "1 يطبع ⟶ 2: continue يتجاوز الطباعة ⟶ 3 يطبع";
      spec.code = 'for (let step = 1; step <= 4; step++) {\n  if (step === 2) continue;\n  console.log(step);\n}'; spec.from = "step === 2"; spec.to = "step === 3";
      spec.task = "اجعل التجاوز عند 3 بدل 2. لاحظ أن الحلقة تكمل بعد الرقم المتجاوز، بعكس break الذي يخرج منها.";
    }
    if (/^JS Arithmetic$/i.test(topic)) {
      spec.code = "const total = 4 + 3;\nconsole.log(total);"; spec.from = " + "; spec.to = " - ";
      spec.task = "استبدل الجمع بالطرح واطبع النتيجة. القيمتان ثابتتان والرمز وحده اختار العملية.";
    }
    if (/^JS Assignment$/i.test(topic)) {
      spec.concept = "معامل الإسناد يحدّث قيمة خانة موجودة. += مثلًا يضيف مقدارًا إلى القيمة السابقة ويخزن الناتج في الاسم نفسه.";
      spec.flow = "points = 2 ⟶ points += 1 ⟶ points تصبح 3";
      spec.code = "let points = 2;\npoints += 1;\nconsole.log(points);"; spec.from = "+="; spec.to = "-=";
      spec.task = "بدّل += إلى -= ثم شغّل وتتبع points: المعامل الجديد يطرح 1 من القيمة الحالية بدل إضافته.";
    }
    if (/^JS Comparisons$/i.test(topic)) {
      spec.code = "console.log(7 > 4);"; spec.from = ">"; spec.to = "<";
      spec.task = "اعكس علامة المقارنة من > إلى < ثم شغّل. الناتج true أو false يجيب عن السؤال الجديد.";
    }
    if (/^JS Bitwise$/i.test(topic)) {
      spec.concept = "المعاملات bitwise تعمل على تمثيل الأعداد الثنائي. ابدأ بمقارنة AND وOR على رقمين صغيرين.";
      spec.flow = "5 AND 1 ⟶ فحص البتات المشتركة ⟶ 1";
      spec.quiz = "ما نتيجة 5 & 1؟"; spec.options = ["1", "5"];
      spec.code = "console.log(5 & 1);"; spec.from = "&"; spec.to = "|";
      spec.task = "بدّل AND (&) إلى OR (|)، ثم شغّل وقارن الناتج. الرمز ينفذ عملية على البتات.";
    }
    if (/^JS BigInt$/i.test(topic)) {
      spec.concept = "BigInt يمثل أعدادًا صحيحة أكبر من المجال الآمن المعتاد لـ Number. نضيف n بعد العدد لكتابته كـ BigInt.";
      spec.flow = "9007199254740993n ⟶ قيمة BigInt ⟶ طباعة العدد كاملًا";
      spec.quiz = "ما العلامة التي تميّز العدد المكتوب كـ BigInt؟"; spec.options = ["n في النهاية", "px في النهاية"];
      spec.code = "const huge = 9007199254740993n;\nconsole.log(huge);"; spec.from = "9007199254740993n"; spec.to = "9007199254740995n";
      spec.task = "غيّر العدد إلى 9007199254740995n ثم شغّل. أبقِ n في النهاية ليظل النوع BigInt.";
    }
    if (/Array Constructor/i.test(topic)) {
      spec.code = 'const steps = new Array("ابدأ", "لاحظ");\nconsole.log(steps[0]);'; spec.from = '"ابدأ"'; spec.to = '"جرّب"';
      spec.task = "بدّل أول قيمة في المصفوفة إلى «جرّب»، ثم تابع كيف يصل إليها الفهرس 0.";
    }
    if (/Array Methods/i.test(topic)) {
      spec.concept = "دوال المصفوفات تضيف وتحذف وتغيّر عناصرها. push تضيف قيمة إلى نهاية الصف.";
      spec.flow = 'قبل: ["HTML"] ⟶ push("CSS") ⟶ بعد: ["HTML", "CSS"]';
      spec.code = 'const tools = ["HTML"];\ntools.push("CSS");\nconsole.log(tools);'; spec.from = '"CSS"'; spec.to = '"JavaScript"';
      spec.task = "بدّل القيمة التي يضيفها push إلى JavaScript ثم شغّل. ستظهر في آخر المصفوفة.";
    }
    if (/Array Search/i.test(topic)) {
      spec.code = 'const tools = ["HTML", "CSS", "JavaScript"];\nconsole.log(tools.indexOf("CSS"));'; spec.from = '"CSS"'; spec.to = '"JavaScript"';
      spec.task = "ابحث عن JavaScript بدل CSS. indexOf يعيد مكان القيمة، وتبدأ الفهارس من صفر.";
    }
    if (/Array Sort/i.test(topic)) {
      spec.code = "const scores = [3, 1, 2];\nscores.sort((a, b) => a - b);\nconsole.log(scores);"; spec.from = "a - b"; spec.to = "b - a";
      spec.task = "اعكس ترتيب المقارنة إلى b - a ثم شغّل. لاحظ كيف انعكس ترتيب الأرقام.";
    }
    if (/Array Iterations/i.test(topic)) {
      spec.concept = "forEach يزور كل عنصر بالترتيب ويشغّل الفعل المحدد مرة لكل عنصر. تتبّع الفهرس والقيمة معًا.";
      spec.flow = "index 0: HTML ⟶ index 1: CSS ⟶ ينتهي المرور";
      spec.code = 'const tools = ["HTML", "CSS"];\ntools.forEach((tool, index) => console.log(index, tool));'; spec.from = '"CSS"'; spec.to = '"JavaScript"';
      spec.task = "غيّر العنصر الثاني إلى JavaScript ثم شغّل. راقب كل دورة: الفهرس أولًا والقيمة بعده.";
    }
    if (/Array const/i.test(topic)) {
      spec.concept = "const يمنع إعادة إسناد اسم المصفوفة، لكنه لا يمنع تعديل محتواها. جرّب إضافة عنصر إلى المصفوفة نفسها.";
      spec.flow = 'const tools = ["HTML"] ⟶ push("CSS") ⟶ الاسم ثابت والمحتوى زاد';
      spec.code = 'const tools = ["HTML"];\ntools.push("CSS");\nconsole.log(tools);'; spec.from = '"CSS"'; spec.to = '"JavaScript"';
      spec.task = "استبدل CSS بـ JavaScript ثم شغّل. عدّلنا المحتوى عبر push من دون إنشاء إسناد جديد إلى tools.";
    }
    if (/^JS Symbols$/i.test(topic)) {
      spec.code = 'const id = Symbol("ticket");\nconsole.log(typeof id);'; spec.from = '"ticket"'; spec.to = '"seat"';
      spec.task = "بدّل وصف الرمز إلى seat ثم شغّل. القيمة تظل Symbol؛ الوصف يساعدك على تمييزه.";
    }
    if (/^JS typeof$/i.test(topic)) {
      spec.code = 'console.log(typeof 42);'; spec.from = "42"; spec.to = '"42"';
      spec.task = "حوّل 42 إلى النص \"42\" بين علامتي اقتباس ثم شغّل. typeof سيعرض نوعًا مختلفًا.";
    }
    if (/undefined \/ NaN/i.test(topic)) {
      spec.concept = "undefined يعني أن الخانة لم تحمل قيمة بعد. NaN علامة على أن نتيجة عملية حسابية ليست رقمًا صالحًا.";
      spec.flow = "Number(\"رحلة\") ⟶ ليست قيمة رقمية ⟶ Number.isNaN يعيد true";
      spec.quiz = "ماذا تخبرنا NaN؟"; spec.options = ["أن العملية لم تنتج رقمًا صالحًا", "أن الحلقة اكتملت"];
      spec.code = 'const result = Number("رحلة");\nconsole.log(Number.isNaN(result));'; spec.from = '"رحلة"'; spec.to = '"5"';
      spec.task = "استبدل النص غير الرقمي بـ 5 ثم شغّل. قارن نتيجة Number.isNaN قبل التحويل وبعده.";
    }
    if (/Type Coercion/i.test(topic)) {
      spec.code = 'console.log("5" + 2);'; spec.from = "+"; spec.to = "-";
      spec.task = "بدّل + إلى - ثم شغّل. الجمع مع نص قد يضم القيم كنص، أما الطرح فيجبر التحويل إلى رقم.";
    }
    if (/Type Conversion/i.test(topic)) {
      spec.code = 'const score = Number("5");\nconsole.log(score + 1);'; spec.from = '"5"'; spec.to = '"8"';
      spec.task = "حوّل النص 5 إلى 8 داخل Number ثم شغّل. الدالة تنتج رقمًا يمكن جمعه حسابيًا.";
    }
    if (/Destructuring/i.test(topic)) {
      spec.concept = "التفكيك يقرأ قيمًا من مصفوفة أو خصائص من كائن ويضعها مباشرة في أسماء واضحة.";
      spec.flow = 'const [first, second] = ["ابدأ", "طبّق"] ⟶ first يحمل القيمة الأولى';
      spec.code = 'const [first, second] = ["ابدأ", "طبّق"];\nconsole.log(first);'; spec.from = '"ابدأ"'; spec.to = '"راقب"';
      spec.task = "بدّل أول قيمة إلى «راقب» ثم شغّل. الاسم first التقط الخانة الأولى عند التفكيك.";
    }
    if (/^JS while Loop$/i.test(topic)) spec.family = "loops";
    if (/^JS Hoisting$/i.test(topic)) {
      spec.concept = "Hoisting يصف كيف تجهز JavaScript بعض التعريفات قبل تنفيذ السطور. افهم القاعدة من مثال واحد ولا تعتمد عليه لتأخير التعريفات.";
      spec.flow = "استدعاء الدالة ⟶ تعريف function المعلن ⟶ تنفيذ جسمها";
      spec.code = 'sayHi();\nfunction sayHi() { console.log("أهلًا"); }'; spec.from = "أهلًا"; spec.to = "بدأت الدالة";
      spec.task = "غيّر الرسالة داخل جسم الدالة ثم شغّل. التعريف المعلن يمكن استدعاؤه قبل سطره، لكن كتابة التعريف أولًا أوضح عادة.";
    }
    if (/^JS Strict Mode$/i.test(topic)) {
      spec.code = '"use strict";\nconst score = 3;\nconsole.log(score);'; spec.from = "3"; spec.to = "6";
      spec.task = "غيّر score من 3 إلى 6 ثم شغّل. السطر الأول يطلب قواعد JavaScript الأكثر صرامة لهذا الملف أو النطاق.";
    }
    if (/^JS this$/i.test(topic)) {
      spec.concept = "داخل method عادية، this تشير إلى الكائن الذي استُدعيت منه الطريقة. نستخدمها للوصول إلى خانة الكائن نفسه.";
      spec.flow = "ticket.show() ⟶ this يشير إلى ticket ⟶ this.movie يعيد اسم الفيلم";
      spec.code = 'const ticket = { movie: "الحديقة", show() { return this.movie; } };\nconsole.log(ticket.show());'; spec.from = '"الحديقة"'; spec.to = '"المكتبة"';
      spec.task = "غيّر قيمة movie إلى «المكتبة» ثم شغّل. method تقرأ الخانة من الكائن عبر this.";
    }
    if (/Number Methods/i.test(topic)) {
      spec.code = 'const value = "82.5";\nconsole.log(Number.parseInt(value));'; spec.from = "parseInt"; spec.to = "parseFloat";
      spec.task = "بدّل parseInt إلى parseFloat ثم شغّل. الأولى تقرأ الجزء الصحيح، والثانية تحتفظ بالجزء العشري.";
    }
    if (/Number Properties/i.test(topic)) {
      spec.concept = "خصائص Number تعرض حدودًا ثابتة للأعداد التي تمثلها JavaScript بدقة. هنا نقرأ أكبر عدد صحيح آمن.";
      spec.code = "console.log(Number.MAX_SAFE_INTEGER);"; spec.from = "MAX_SAFE_INTEGER"; spec.to = "MAX_VALUE";
      spec.task = "بدّل الخاصية إلى MAX_VALUE وشغّل؛ انتقلت من حد الدقة للأعداد الصحيحة إلى أكبر قيمة عددية تقريبية.";
    }
    if (/^JS Math Random$/i.test(topic)) {
      spec.concept = "Math.random تنتج رقمًا عشوائيًا بين صفر وواحد. نضربه في عدد الخيارات ثم نستخدم floor لاختيار فهرس صحيح.";
      spec.flow = "Math.random() × 6 ⟶ رقم بين 0 و6 ⟶ Math.floor يختار 0 إلى 5";
      spec.code = "const dice = Math.floor(Math.random() * 6) + 1;\nconsole.log(dice);"; spec.from = "* 6"; spec.to = "* 10";
      spec.task = "غيّر عدد الاحتمالات من 6 إلى 10، ثم شغّل أكثر من مرة. الناتج عدد صحيح ضمن المجال الجديد.";
    }
    if (/^JS Math$/i.test(topic)) {
      spec.code = "console.log(Math.max(3, 8, 5));"; spec.from = "8"; spec.to = "10";
      spec.task = "بدّل القيمة الأكبر إلى 10 ثم شغّل. Math.max تقارن الأرقام وتعيد الأكبر.";
    }
    if (/Date Formats/i.test(topic)) {
      spec.code = 'const appointment = new Date("2026-11-02");\nconsole.log(appointment.toISOString());'; spec.from = "2026-11-02"; spec.to = "2026-11-03";
      spec.task = "غيّر يوم التاريخ إلى 3 نوفمبر ثم شغّل. toISOString يعرض التاريخ بصيغة موحدة.";
    }
    if (/Date Set/i.test(topic)) {
      spec.code = 'const appointment = new Date("2026-11-02");\nappointment.setFullYear(2027);\nconsole.log(appointment.getFullYear());'; spec.from = "2027"; spec.to = "2028";
      spec.task = "حدّث السنة التي يضعها setFullYear إلى 2028 ثم شغّل وتتبّع السنة الجديدة.";
    }
    if (/Date Methods/i.test(topic)) {
      spec.code = 'const appointment = new Date("2026-11-02");\nconsole.log(appointment.toLocaleDateString("ar-EG"));'; spec.from = "ar-EG"; spec.to = "en-GB";
      spec.task = "غيّر إعداد اللغة من ar-EG إلى en-GB ثم شغّل. التاريخ نفسه عُرض بتنسيق محلي مختلف.";
    }
    if (/JS Iterables/i.test(topic)) {
      spec.concept = "القيمة iterable تسمح بزيارة عناصرها واحدًا واحدًا، مثل نص أو مصفوفة. for...of يأخذ العنصر الحالي في كل دورة.";
      spec.flow = '"CSS" ⟶ أول دورة تأخذ C ⟶ التالية تأخذ S ⟶ ثم تتوقف';
      spec.code = 'for (const letter of "CSS") {\n  console.log(letter);\n}'; spec.from = '"CSS"'; spec.to = '"HTML"';
      spec.task = "بدّل النص إلى HTML ثم شغّل. for...of يزور الحروف بالترتيب، حرفًا في كل دورة.";
    }
    if (/^JS Iterations$/i.test(topic)) {
      spec.concept = "التكرار يزور عناصر مجموعة بالترتيب. سجّل الفهرس والقيمة في كل دورة لتشاهد حركة البيانات بدل تخمين الناتج.";
      spec.flow = "0 ⟶ HTML　|　1 ⟶ CSS　|　2 ⟶ JavaScript";
      spec.code = 'const tools = ["HTML", "CSS", "JavaScript"];\nfor (let i = 0; i < tools.length; i++) {\n  console.log(i, tools[i]);\n}'; spec.from = "i < tools.length"; spec.to = "i < 2";
      spec.task = "غيّر حد الحلقة إلى i < 2 ثم شغّل. تتبّع الفهارس 0 ثم 1، ولاحظ أن العنصر الثالث لم يمر عليه العداد.";
    }
    if (/Advanced Functions/i.test(topic)) {
      spec.concept = "الدوال المتقدمة قد تستقبل دالة أخرى كمدخل. الدالة الراجعة callback تُنفذ عندما يصل البرنامج إلى موضع استدعائها.";
      spec.flow = "تمرير greet ⟶ run يستقبلها ⟶ run يستدعيها بالاسم";
      spec.code = 'function run(callback) { callback("منى"); }\nfunction greet(name) { console.log("أهلًا يا " + name); }\nrun(greet);'; spec.from = "منى"; spec.to = "أحمد";
      spec.task = "بدّل الاسم الذي يمرره run إلى أحمد ثم شغّل. تتبع الاسم من المدخل إلى callback ثم إلى الطباعة.";
    }
    if (/Advanced Objects/i.test(topic)) {
      spec.concept = "الكائنات المتقدمة تنظّم الوصول إلى البيانات، ويمكن حمايتها أو تمريرها بين الدوال. هنا نقرأ الخاصية عبر Object.keys.";
      spec.flow = "Object.keys(ticket) ⟶ أسماء الخانات ⟶ قائمة مفاتيح";
      spec.code = 'const ticket = { movie: "الحديقة", seat: "A3" };\nconsole.log(Object.keys(ticket));'; spec.from = "movie"; spec.to = "show";
      spec.task = "غيّر اسم الخاصية movie إلى show ثم شغّل. قائمة المفاتيح تعرض الأسماء الموجودة في الكائن.";
    }
    if (/Asynchronous JavaScript/i.test(topic)) {
      spec.concept = "العمل غير المتزامن يسمح للبرنامج بمتابعة خطوات أخرى أثناء انتظار نتيجة. await يوقف هذه الدالة حتى يصل الوعد.";
      spec.flow = "async function ⟶ await Promise ⟶ استلام القيمة ⟶ طباعة النتيجة";
      spec.code = 'async function showResult() {\n  const value = await Promise.resolve("وصلت النتيجة");\n  console.log(value);\n}\nshowResult();'; spec.from = "وصلت النتيجة"; spec.to = "اكتملت الخطوة";
      spec.task = "غيّر القيمة التي يصل بها الوعد ثم شغّل. await يستلمها قبل أن ينفذ سطر الطباعة.";
    }
    if (/Meta & Proxy/i.test(topic)) {
      spec.concept = "Proxy يضع وسيطًا أمام كائن. يمكنه اعتراض قراءة خاصية ثم إرجاع قيمة معدّلة.";
      spec.flow = "قراءة proxy.name ⟶ get trap ⟶ القيمة التي يعيدها الوسيط";
      spec.code = 'const person = { name: "منى" };\nconst proxy = new Proxy(person, { get(target, key) { return target[key]; } });\nconsole.log(proxy.name);'; spec.from = "return target[key]"; spec.to = 'return "زائر"';
      spec.task = "اجعل الوسيط يعيد كلمة «زائر» بدل قراءة الخانة، ثم شغّل ولاحظ أن الطلب مر عبر get.";
    }
    if (/^JS Temporal$/i.test(topic)) {
      spec.concept = "Temporal واجهة أحدث للتعامل مع التواريخ والأوقات بصورة أوضح. قد لا تكون متاحة في كل متصفح، لذلك نتحقق منها قبل الاستخدام.";
      spec.flow = "typeof Temporal ⟶ متاحة؟ ⟶ أنشئ تاريخًا / اعرض رسالة بديلة";
      spec.quiz = "لماذا نتحقق من وجود Temporal أولًا؟"; spec.options = ["لأن دعمها قد يختلف بين البيئات", "لأنها جزء من CSS"];
      spec.code = 'const dateText = "2026-11-02";\nif (typeof Temporal !== "undefined") {\n  const day = Temporal.PlainDate.from(dateText);\n  console.log(day.toString());\n} else {\n  console.log("التاريخ المدخل: " + dateText);\n}'; spec.from = "2026-11-02"; spec.to = "2026-11-03";
      spec.task = "غيّر اليوم إلى 3 نوفمبر ثم شغّل. ستظهر القيمة الجديدة حتى لو لم يدعم المتصفح Temporal، وعند توفرها تمر عبر PlainDate.";
    }
    if (/^JS JSON$/i.test(topic)) {
      spec.code = 'const raw = "{\\"title\\":\\"رحلة\\"}";\nconst book = JSON.parse(raw);\nconsole.log(book.title);';
      spec.from = "رحلة"; spec.to = "زيارة";
      spec.task = "غيّر قيمة title داخل نص JSON من رحلة إلى زيارة ثم شغّل. JSON.parse يحول النص، وبعدها نقرأ الخاصية.";
    }
    if (/^JS Syntax$/i.test(topic)) {
      spec.concept = "صياغة JavaScript تجمع أسماء وقيمًا وعلامات. الأقواس المعقوفة تجمع أوامر الشرط، و() تحيط بما يفحصه الكمبيوتر.";
      spec.flow = "تعريف points ⟶ فحص الشرط بين () ⟶ تنفيذ الأوامر داخل {}";
      spec.code = 'const points = 2;\nif (points > 1) {\n  console.log("داخل الشرط");\n}'; spec.from = "points > 1"; spec.to = "points > 2";
      spec.task = "غيّر حد الشرط إلى 2 ثم شغّل. راقب كيف تقرأ JavaScript الأقواس والشرط قبل تنفيذ الجسم.";
    }
    if (/Function Invocation/i.test(topic)) {
      spec.code = 'function greet() {\n  console.log("وصلنا للدالة");\n}\ngreet();'; spec.from = "وصلنا للدالة"; spec.to = "بدأ تنفيذ الدالة";
      spec.task = "غيّر الرسالة داخل الدالة ثم شغّل. استدعاء greet() في السطر الأخير هو الذي يبدأ الأفعال داخلها.";
    }
    if (/Function Expressions/i.test(topic)) {
      spec.concept = "التعبير الدالي يخزن دالة داخل متغير. تعريف الدالة يجهز الفعل، واستدعاء الاسم يشغله.";
      spec.flow = "const double = function ⟶ المتغير يحمل الدالة ⟶ double(4) يستدعيها";
      spec.code = 'const double = function(number) { return number * 2; };\nconsole.log(double(4));'; spec.from = "double(4)"; spec.to = "double(6)";
      spec.task = "مرّر 6 بدل 4 إلى التعبير الدالي، ثم شغّل وتابع القيمة التي أعادها.";
    }
    if (/Return Values/i.test(topic)) {
      spec.concept = "return يخرج قيمة من الدالة إلى السطر الذي استدعاها. خزّنها باسم ثم اطبعها لتتبع انتقالها.";
      spec.flow = "double(4) ⟶ return 4 × 2 ⟶ result يستقبل 8 ⟶ console.log يطبعها";
      spec.code = 'function double(number) { return number * 2; }\nconst result = double(4);\nconsole.log(result);'; spec.from = "number * 2"; spec.to = "number * 3";
      spec.task = "غيّر معامل الضرب من 2 إلى 3 ثم شغّل. تتبع النتيجة من return إلى result ثم إلى الطباعة.";
    }
    if (/Function Arguments/i.test(topic)) {
      spec.concept = "arguments تعرض القيم التي وصلت إلى الدالة عند الاستدعاء. نعدّها هنا لنرى الفرق بين المدخلات.";
      spec.flow = 'list("HTML", "CSS") ⟶ الدالة تستقبل قيمتين ⟶ arguments.length = 2';
      spec.code = 'function list() { console.log(arguments.length); }\nlist("HTML", "CSS");'; spec.from = 'list("HTML", "CSS")'; spec.to = 'list("HTML")';
      spec.task = "احذف المدخل الثاني من الاستدعاء ثم شغّل. عدد القيم التي وصلت للدالة يتغير من 2 إلى 1.";
    }
    if (/Object Display/i.test(topic)) {
      spec.code = 'const ticket = { movie: "الحديقة", seat: "A3" };\nconsole.log(JSON.stringify(ticket));'; spec.from = "JSON.stringify(ticket)"; spec.to = "Object.entries(ticket)";
      spec.task = "بدّل طريقة العرض إلى Object.entries ثم شغّل. الأولى تعرض الكائن كنص JSON، والثانية تعرض أزواج المفاتيح والقيم.";
    }
    if (/^JS Primitive Data$/i.test(topic)) {
      spec.code = 'const value = "5";\nconsole.log(typeof value);'; spec.from = '"5"'; spec.to = "5";
      spec.task = "احذف علامتي الاقتباس حول 5 ثم شغّل. القيمة نفسها أصبحت رقمًا أوليًا بدل نص.";
    }
    if (/^JS Object Types$/i.test(topic)) {
      spec.code = 'const value = { title: "رحلة" };\nconsole.log(typeof value);'; spec.from = "{ title: \"رحلة\" }"; spec.to = '["رحلة"]';
      spec.task = "بدّل الكائن بمصفوفة تحمل النص نفسه ثم شغّل. النوعان مركبان ويظهر typeof لهما كلمة object.";
    }
    if (/^JS Array Constructor$/i.test(topic)) {
      spec.concept = "يمكن إنشاء مصفوفة بصيغة [] أو بالمنشئ Array. القيم تحفظ بترتيب، وأول قيمة عنوانها 0.";
      spec.flow = 'new Array("HTML", "CSS") ⟶ الخانة 0: HTML　|　الخانة 1: CSS';
      spec.code = 'const tools = new Array("HTML", "CSS");\nconsole.log(tools[0]);'; spec.from = 'new Array("HTML", "CSS")'; spec.to = '["HTML", "CSS"]';
      spec.task = "بدّل المنشئ إلى الصيغة المختصرة [] مع إبقاء القيم بترتيبها، ثم شغّل واقرأ الخانة الأولى.";
      spec.practiceVariants = ['Array.of("HTML", "CSS")', 'new Array("CSS", "HTML")'];
    }
    if (/^JS Set Methods$/i.test(topic)) {
      spec.concept = "Set مجموعة بلا تكرار. add تضيف قيمة، has تفحص وجودها، وdelete تحذفها؛ العمليات تعمل بالقيمة نفسها لا برقم فهرس.";
      spec.flow = 'add("CSS") ⟶ has("CSS") تعيد true ⟶ delete("CSS") تزيلها';
      spec.code = 'const tools = new Set(["HTML", "CSS"]);\ntools.add("JavaScript");\nconsole.log(tools.has("JavaScript"));';
      spec.from = 'tools.has("JavaScript")'; spec.to = 'tools.has("CSS")';
      spec.task = "اسأل Set عن CSS بدل JavaScript. القيمة موجودة من البداية؛ لاحظ أن has تعيد true.";
      spec.practiceVariants = ['tools.delete("CSS")', 'tools.has("HTML")'];
    }
    if (/^JS WeakSet$/i.test(topic)) {
      spec.concept = "WeakSet تحفظ مراجع إلى كائنات فقط. نستخدم has لفحص الكائن نفسه؛ إنشاء كائن جديد بالمحتوى نفسه لا يجعله المرجع ذاته.";
      spec.flow = "member object ⟶ WeakSet.add(member) ⟶ has(member) يفحص الهوية نفسها";
      spec.code = 'const member = { name: "ليلى" };\nconst enrolled = new WeakSet([member]);\nconsole.log(enrolled.has(member));';
      spec.from = "enrolled.has(member)"; spec.to = 'enrolled.has({ name: "ليلى" })';
      spec.task = "افحص كائنًا جديدًا بدل member. رغم تطابق الاسم، المرجع مختلف؛ لذلك لا تعتبره WeakSet العنصر نفسه.";
      spec.practiceVariants = ["enrolled.has(member)", "enrolled.add(member)"];
    }
    if (/^JS WeakMap$/i.test(topic)) {
      spec.concept = "WeakMap تربط بيانات بمفاتيح كائنية. لا تستخدم نصًا كمفتاح؛ مرر كائنًا ثابتًا إلى set وget.";
      spec.flow = "learner object ⟶ set(learner, note) ⟶ get(learner) يقرأ الملاحظة";
      spec.code = 'const learner = { id: 1 };\nconst notes = new WeakMap();\nnotes.set(learner, "CSS");\nconsole.log(notes.get(learner));';
      spec.from = 'notes.get(learner)'; spec.to = 'notes.has(learner)';
      spec.task = "بدّل get إلى has. الأولى تقرأ الملاحظة، والثانية تجيب true أو false عن وجود المفتاح الكائني.";
      spec.practiceVariants = ['notes.get(learner)', 'notes.delete(learner)'];
    }
    if (/^JS Maps$/i.test(topic)) {
      spec.concept = "Map تربط أي مفتاح بقيمة. ننشئ زوجًا، ثم نقرأ القيمة عبر المفتاح نفسه ونقارن النتيجة.";
      spec.flow = '"next" ⟶ مفتاح في Map　|　"CSS" ⟶ القيمة　|　get("next") ⟶ CSS';
      spec.code = 'const lesson = new Map([["next", "CSS"]]);\nconsole.log(lesson.get("next"));';
      spec.from = '[["next", "CSS"]]);\nconsole.log(lesson.get("next"))'; spec.to = '[["later", "CSS"]]);\nconsole.log(lesson.get("later"))';
      spec.task = "بدّل المفتاح next إلى later في زوج البيانات وطلب get. المفتاح في المكانين يجب أن يطابق حتى تعود القيمة.";
      spec.practiceVariants = ['[["later", "HTML"]]);\nconsole.log(lesson.get("later"))', '[["start", "JavaScript"]]);\nconsole.log(lesson.get("start"))'];
    }
    if (/^JS Introduction$/i.test(topic)) {
      spec.concept = "JavaScript يضيف سلوكًا للصفحة: يقرأ قيمة، ينفذ أمرًا، ثم يعرض نتيجة. نبدأ برسالة قصيرة قبل ربطه بعناصر HTML.";
      spec.analogy = "اكتب أمرًا واحدًا، شغّله، ثم شاهد الأثر في نافذة النتيجة.";
      spec.flow = "قيمة message ⟶ console.log(message) ⟶ تظهر الرسالة";
      spec.quiz = "أي سطر يطلب عرض نتيجة في وحدة التحكم؟"; spec.options = ["console.log(message)", "const message = \"أهلًا\""];
      spec.code = 'const message = "أهلًا بـ JavaScript";\nconsole.log(message);'; spec.from = "أهلًا بـ JavaScript"; spec.to = "أول تجربة JavaScript";
      spec.task = "غيّر الرسالة المخزنة في message، شغّل، ثم لاحظ كيف يقرأ أمر الطباعة القيمة من الخانة.";
      spec.practiceVariants = ["جرّبت JavaScript", "أفهم النتيجة"];
    }
    if (/^JS Parameters$/i.test(topic)) {
      spec.concept = "المعامل parameter اسم خانة داخل تعريف الدالة. عند استدعائها، تمرّر argument ليملأ الخانة ويستخدمها جسم الدالة.";
      spec.flow = 'greet(name) ⟵ greet("منى") ⟶ name يحمل "منى" ⟶ تظهر التحية';
      spec.quiz = "أي اسم هو خانة الإدخال داخل تعريف الدالة؟"; spec.options = ["name بين قوسَي greet", "النص الذي يظهر في console"];
      spec.code = 'function greet(name) {\n  console.log("أهلًا يا " + name);\n}\ngreet("منى");'; spec.from = '"منى"'; spec.to = '"أحمد"';
      spec.task = "بدّل الاسم الذي تمرره عند الاستدعاء إلى أحمد. تتبع انتقاله من greet(...) إلى خانة name ثم إلى الرسالة.";
      spec.practiceVariants = ['"سلمى"', '"علي"'];
    }
    if (/^JS Arguments$/i.test(topic)) {
      spec.concept = "arguments كائن متاح داخل دالة عادية يعرض القيم التي وصلت عند استدعائها. الفهرس 0 هو أول قيمة، ثم 1 للثانية.";
      spec.flow = 'showFirst("HTML", "CSS") ⟶ arguments[0] = HTML　|　arguments[1] = CSS';
      spec.quiz = "ما القيمة التي تشير إليها arguments[1] هنا؟"; spec.options = ["ثاني قيمة وصلت للدالة", "اسم الدالة نفسها"];
      spec.code = 'function showFirst() {\n  console.log(arguments[0]);\n}\nshowFirst("HTML", "CSS");'; spec.from = "arguments[0]"; spec.to = "arguments[1]";
      spec.task = "اطبع arguments[1] بدل arguments[0]. عدّ القيم من الصفر، ثم شغّل لتشاهد CSS.";
      spec.practiceVariants = ["arguments.length", "arguments[0]"];
    }
    if (/^JS Set Logic$/i.test(topic)) {
      spec.concept = "يمكن استخدام Set لفحص العضوية ومقارنة مجموعتين. هنا نمر على مجموعة ونختار ما يوجد في واحدة ولا يوجد في الأخرى.";
      spec.flow = 'enrolled ⟶ filter ⟶ افحص completed.has(tool) ⟶ العناصر المشتركة أو المختلفة';
      spec.quiz = "ماذا يعيد has(value) في Set؟"; spec.options = ["true إذا كانت القيمة موجودة", "القيمة الموجودة في الفهرس 0"];
      spec.code = 'const enrolled = new Set(["HTML", "CSS", "JavaScript"]);\nconst completed = new Set(["HTML", "CSS"]);\nconst remaining = [...enrolled].filter(tool => !completed.has(tool));\nconsole.log(remaining);';
      spec.from = "!completed.has(tool)"; spec.to = "completed.has(tool)";
      spec.task = "أزل ! من الفحص المنطقي داخل filter. ستنتقل من اختيار ما لم يكتمل إلى اختيار ما اكتمل.";
      spec.practiceVariants = ["!completed.has(tool)", "completed.has(tool)"];
    }
    if (/^JS Map Methods$/i.test(topic)) {
      spec.concept = "Map تحفظ أزواج مفتاح وقيمة. set تضيف أو تحدّث، get تقرأ، has تفحص الوجود، وdelete تحذف المفتاح.";
      spec.flow = 'set("next", "CSS") ⟶ get يقرأ القيمة　|　has يفحص المفتاح　|　delete يحذفه';
      spec.quiz = "أي method تقرأ القيمة المرتبطة بمفتاح؟"; spec.options = ["get(key)", "delete(key)"];
      spec.code = 'const lesson = new Map();\nlesson.set("next", "CSS");\nconsole.log(lesson.get("next"));';
      spec.from = 'lesson.get("next")'; spec.to = 'lesson.has("next")';
      spec.task = "بدّل get إلى has وشغّل. انتقلت من قراءة القيمة إلى سؤال: هل المفتاح موجود؟";
      spec.practiceVariants = ['lesson.get("next")', 'lesson.delete("next")'];
    }
    if (/^JS Reference$/i.test(topic)) {
      spec.concept = "صفحة JavaScript Reference فهرس للبحث عن الصيغة والوسائط والقيم المرجعة. جرّب الآن method، ثم افتح المرجع لتقرأ تفاصيلها.";
      spec.flow = "اسم method ⟶ صفحة المرجع ⟶ الوسائط ⟶ القيمة التي تعيدها";
      spec.quiz = "متى ترجع Array.isArray(value) القيمة true؟"; spec.options = ["عندما تكون القيمة مصفوفة", "عندما تكون القيمة نصًا دائمًا"];
      spec.code = 'const tools = ["HTML", "CSS"];\nconsole.log(Array.isArray(tools));'; spec.from = "Array.isArray(tools)"; spec.to = 'tools.includes("CSS")';
      spec.task = "استبدل فحص نوع المصفوفة بسؤال includes عن CSS. المثال يريك قيمة الإرجاع، والمرجع يشرح method ومعاملها.";
      spec.practiceVariants = ['tools.includes("HTML")', "tools.length"];
    }
    if (/^JS Projects$/i.test(topic)) {
      spec.concept = "المشروع يجمع قيمة وأمر تحديث وعرض نتيجة في دورة قصيرة. سنبني عدّادًا نصيًا، ثم نغير مقدار الزيادة.";
      spec.flow = "count يبدأ 0 ⟶ += يضيف ⟶ console.log يعرض العدد الجديد";
      spec.quiz = "أي سطر يضيف واحدًا إلى العداد؟"; spec.options = ["count += 1", "console.log(count)"];
      spec.code = 'let count = 0;\ncount += 1;\nconsole.log("العدد الحالي:", count);'; spec.from = "count += 1"; spec.to = "count += 2";
      spec.task = "اجعل العداد يزيد بمقدار 2 في كل تشغيل بدل 1. اتبع القيمة من تعريف count إلى نتيجة الطباعة.";
      spec.practiceVariants = ["count += 3", "count += 5"];
    }
    spec.trace = spec.flow;
    return spec;
  }

  function courseLessonDetails(spec, courseKey) {
    var topic = spec.topic,
        family = spec.family,
        details = [];
    function add(title, flow, note) { details.push({ title: title, flow: flow, note: note }); }
    function appendExampleTrace() {
      if (courseKey === "css") {
        var source = String(spec.code || ""),
            rule = /([^{}]+)\{([^{}]*)\}/.exec(source),
            selector = rule ? rule[1].trim() : ".card",
            declaration = rule ? rule[2].split(";").map(function(part) { return part.trim(); }).filter(Boolean)[0] || "" : "",
            propertyMatch = /^([a-z-]+)\s*:\s*(.+)$/i.exec(declaration),
            invalidMatch = /^([a-z-]+)\s+(.+)$/i.exec(declaration),
            property = propertyMatch ? propertyMatch[1] : invalidMatch ? invalidMatch[1] : "الخاصية",
            value = propertyMatch ? propertyMatch[2] : invalidMatch ? invalidMatch[2] : "القيمة";
        add("حدد العنصر الذي ستتغير هيئته", selector + " ⟶ العنصر المطابق في المعاينة", "المحدد يختار العنصر. ابحث عن العنصر نفسه في الصفحة قبل أن تحاول توقع شكل القاعدة.");
        add("افصل اسم الخاصية عن قيمتها", property + " ⟶ " + value, propertyMatch ? "اسم الخاصية يحدد ما الذي يتغير، والقيمة تحدد الشكل الذي يطلبه المتصفح." : "السطر هنا يفتقد النقطتين بين اسم الخاصية وقيمتها؛ لهذا يتجاهل المتصفح هذا التعريف حتى نصلحه.");
        return;
      }

      var lines = String(spec.code || "").split("\n").map(function(line) { return line.trim(); }).filter(function(line) { return line && line.indexOf("//") !== 0; }),
          dataLine = lines.filter(function(line) { return /^(?:const|let|var)\s/.test(line); })[0] || lines[0] || "سطر المثال",
          isFunctionDefinition = /^function\b|^const\s+\w+\s*=\s*(?:async\s*)?(?:function|\([^)]*\)\s*=>)/.test(dataLine),
          actionLine = lines.filter(function(line) { return /console\.log|\.addEventListener|\.textContent\s*=|fillRect|fetch\(|\.push\(|\.set\(|\.add\(|\.next\(|\b(?:if|for|while|switch)\s*\(/.test(line); })[0] || lines[lines.length - 1] || "سطر التنفيذ";
      add("ميّز الوصف عن الفعل", dataLine + " ⟶ " + (isFunctionDefinition ? "تعريف ينتظر استدعاءً" : /^\s*(?:const|let|var)\b/.test(dataLine) ? "خانة تحفظ قيمة" : "بداية المثال"), isFunctionDefinition ? "تعريف الدالة يجهز اسمًا وجسمًا. الكمبيوتر لا ينفذ جسمها لمجرد كتابته؛ ابحث عن مكان استدعائها." : /^\s*(?:const|let|var)\b/.test(dataLine) ? "سطر التعريف يحفظ قيمة باسم. الطباعة أو الاستدعاء في سطر لاحق هو الذي يجعل الأثر ظاهرًا." : "اقرأ السطر كما هو: هل يجهز قيمة، أم يطلب فعلًا الآن؟ ثم تتبع السطر الذي بعده.");
      add("اتبع الفعل حتى أثره", actionLine + " ⟶ نتيجة في المعاينة", /addEventListener|fetch\(|Promise|\.then\(/.test(actionLine) ? "هذا السطر يجهز استجابة لحدث أو قيمة ستصل لاحقًا. النتيجة تظهر عند وقوع الحدث أو بعد وصول القيمة." : /return\b/.test(actionLine) ? "return يعيد قيمة إلى المكان الذي استدعى الدالة؛ لا يطبعها وحده." : /textContent|console\.log|fillRect/.test(actionLine) ? "هذا السطر يرسل قيمة إلى مكان يمكن ملاحظته: سجل الإخراج أو عنصر الصفحة أو لوحة الرسم." : "بعد هذا الفعل، راجع السطر الذي يقرأ القيمة أو يعرضها لتعرف النتيجة.");
    }

    if (courseKey === "js") {
      if (/^JS Parameters$/.test(topic)) add("خانة الدالة تختلف عن القيمة الممررة", "function greet(name) ⟵ greet(\"منى\") ⟶ name يحمل القيمة", "name اسم المعامل في التعريف؛ و«منى» argument نرسله عند الاستدعاء.");
      else if (/^JS Arguments$/.test(topic)) add("القيم تصل بترتيب وفهارس تبدأ من صفر", "arguments[0] ⟶ القيمة الأولى　|　arguments[1] ⟶ الثانية　|　length ⟶ العدد", "نفّذ الاستدعاء وعدّ القيم من 0؛ كل فهرس يقرأ مدخلًا مختلفًا.");
      else if (/^JS Set Logic$/.test(topic)) add("قارن عضوية القيمة بين مجموعتين", "enrolled.has(tool) && completed.has(tool) ⟶ مشتركة　|　!completed.has(tool) ⟶ لم تكتمل", "has تعيد true أو false؛ و! تعكس الإجابة قبل أن يختارها filter.");
      else if (/^JS Map Methods$/.test(topic)) add("المفتاح يوصلك إلى القيمة المرتبطة", 'set("next", "CSS") ⟶ get("next") يعيد CSS　|　has يفحص المفتاح', "لو قرأت بمفتاح مختلف، لن تصل إلى الزوج نفسه. جرّب تغيير المفتاح في التعريف والقراءة.");
      else if (/^JS Reference$/.test(topic)) add("المرجع فهرس للبحث عند الحاجة", "اسم method ⟶ الوسائط المطلوبة ⟶ نوع القيمة الراجعة", "استخدم المثال لرؤية نتيجة method ثم افتح صفحة W3Schools لمعرفة تفاصيل الاستخدام والخيارات.");
      else if (/^JS Projects$/.test(topic)) add("العداد يجمع قيمة وحركة ونتيجة", "count يبدأ 0 ⟶ += يزيده ⟶ console.log يعرض العدد بعد التحديث", "جرّب قيمة زيادة مختلفة، ثم احسب النتيجة قبل التشغيل لتقارن توقعك.");
      else if (/^JS Introduction$/.test(topic)) add("اقرأ التعريف ثم اتبع أثره", "const message ⟶ قيمة محفوظة　|　console.log(message) ⟶ عرضها", "سطر التعريف يجهز خانة؛ أمر الطباعة في السطر التالي هو الفعل الذي يكشف محتواها.");
    }

    if (courseKey === "css") {
      if (/Colors/i.test(topic)) add("لون النص ليس لون الخلفية", "color ⟶ لون الحروف　|　background-color ⟶ مساحة العنصر", "يمكن كتابة اللون باسم أو HEX أو RGB أو HSL؛ كل صيغة تصف اللون نفسه بطريقة مختلفة.");
      else if (/Backgrounds/i.test(topic)) add("خلفية العنصر طبقة مستقلة", "لون أو صورة ⟶ تكرار/موضع ⟶ مساحة خلفية العنصر", "ابدأ بلون بسيط. عند استخدام صورة، راجع التكرار والحجم حتى لا تشتت المحتوى.");
      else if (/Borders/i.test(topic)) add("الحد له ثلاث خانات شائعة", "border-style ⟶ border-width ⟶ border-color", "لو لم تحدد style، قد لا يظهر الحد حتى لو كتبت سمكه ولونه.");
      else if (/Display/i.test(topic)) add("display يغير طريقة مشاركة العنصر في الصفحة", "block ⟶ سطر ومساحة　|　inline ⟶ داخل السطر　|　none ⟶ مخفي", "اسأل أولًا: هل العنصر يأخذ سطرًا؟ وهل يظل ظاهرًا؟");
      else if (/Position/i.test(topic)) add("position يحدد مرجع المكان", "static ⟶ الوضع المعتاد　|　relative ⟶ مكانه مع إزاحة　|　absolute/fixed ⟶ مرجع مختلف", "اختيار نوع التموضع يسبق كتابة top أو left؛ الإزاحة وحدها لا تكفي.");
      else if (/Flex|Grid/i.test(topic)) add("الحاوية ترتب، والعناصر تستقبل الترتيب", ".tiles ⟶ display:flex/grid ⟶ span عناصر داخل الحاوية", "ابدأ بتنسيق الأب، ثم انتقل لخصائص العنصر مثل flex-grow أو grid-column.");
      else if (/Media Queries|Responsive/i.test(topic)) add("القاعدة المشروطة لا تعمل في كل المقاسات", "عرض الشاشة ⟶ فحص breakpoint ⟶ تطبيق التنسيق عند تحقق الشرط", "غيّر عرض المعاينة بعد التشغيل لتلاحظ اللحظة التي ينتقل فيها التنسيق.");
      else if (/Specificity|important|Inheritance/i.test(topic)) add("عند التعارض، اسأل: من يرث؟ ومن يطابق بدقة؟", "قيمة موروثة ⟶ قواعد مطابقة ⟶ أولوية القاعدة الفائزة", "وجود قاعدة ثانية لا يعني أنها ستفوز؛ قوة المحدد والترتيب مهمان.");
      else if (family === "box") add("فرّق بين المساحة داخل الحد وخارجه", "padding ⟶ بين المحتوى والحد　|　margin ⟶ خارج الحد", "غيّر خاصية واحدة فقط، حتى تعرف أي طبقة حرّكت العنصر.");
      else if (family === "image") add("حجم الإطار لا يحدد طريقة ملء الصورة", "width/height ⟶ مساحة الإطار　|　object-fit ⟶ طريقة ملئه", "قد يبقى الإطار ثابتًا بينما يتغير القص أو الجزء الظاهر.");
      else if (family === "motion") add("الحركة تحتاج بداية ونهاية أو محفزًا", "hover/حالة ⟶ transition أو animation ⟶ تغير مرئي", "اختبر الحركة بتمرير المؤشر أو التركيز، ثم جرّب مدة أقصر وأطول.");
      else if (family === "values") add("القيمة تتكون من رقم ووحدة أو من اسم محفوظ", "12px ⟶ مقدار مع وحدة　|　var(--space) ⟶ قراءة قيمة محفوظة", "تأكد أن الوحدة مناسبة، وأن اسم المتغير يطابق ما عرّفته.");
      else if (family === "content") add("الخاصية تغيّر العرض مع بقاء المحتوى", "عنصر موجود ⟶ خاصية CSS ⟶ خط/محاذاة/حدود مختلفة", "المحتوى يعيش في HTML، وقاعدة CSS تعدّل طريقة ظهوره.");
      else add("اقرأ القاعدة من اليسار إلى اليمين", "محدد يختار ⟶ خاصية تسأل ماذا نغيّر ⟶ قيمة تجيب كيف", "النقطتان تفصلان الخاصية عن القيمة، والفاصلة المنقوطة تنهي التعريف.");
      if (/Flex Container|Flex Items|Grid Container|Grid Items|Grid 12-column|Responsive|Media Queries|Specificity|Box Model/i.test(topic)) {
        add("قبل التشغيل توقّع الجزء الذي سيتغير", "المحدد يبقى ⟶ الخاصية تبقى ⟶ قيمة واحدة تتبدل ⟶ شكل الصفحة يتغير", "إذا لم يظهر فرق، افحص هل المثال يحتوي العنصر الذي اخترته وهل الشرط ينطبق.");
      }
      appendExampleTrace();
      return details;
    }

    if (family === "loops") {
      if (/Break/i.test(topic)) add("تابع ما يحدث عند break", "step=1 ⟶ اطبع　|　step=2 ⟶ اطبع　|　step=3 ⟶ اخرج", "break ينهي الحلقة كلها؛ لا ينتقل إلى دورة أخرى.");
      else if (/Continue/i.test(topic)) add("تابع الدورة التي يتم تجاوزها", "step=1 ⟶ اطبع　|　step=2 ⟶ تخطَّ بقية الجسم　|　step=3 ⟶ أكمل", "continue يتجاوز هذه الدورة فقط؛ الحلقة تستمر بعده.");
      else if (/Iterator/i.test(topic)) add("كل next تحرك المؤشر مرة واحدة", "المؤشر عند 0 ⟶ next() يعيد الأول　|　المؤشر عند 1 ⟶ next() يعيد التالي", "اقرأ value بعد كل طلب لتعرف العنصر الحالي.");
      else if (/Generator/i.test(topic)) add("yield توقف مؤقت بين القيم", "yield 1 ⟶ توقف　|　next() ⟶ استئناف　|　yield 2 ⟶ توقف جديد", "المولد يحتفظ بمكانه؛ الطلب التالي يكمل من بعد آخر yield.");
      else add("سجّل حالة العداد في كل دورة", "قبل: step=1 ⟶ افحص الشرط ⟶ اطبع 1 ⟶ زد إلى 2 ⟶ افحص مجددًا", "تتبّع الشرط والتحديث معًا؛ قيمة العداد وحدها لا تخبرك متى تتوقف الحلقة.");
      add("اعثر على نقطة التوقف قبل أن تشغّل", "العداد يتغير ⟶ الشرط يصبح false أو ينفذ break ⟶ ينتهي التكرار", "إذا لم تتغير قيمة الشرط داخل الحلقة، قد تستمر بلا نهاية.");
      appendExampleTrace();
      return details;
    }
    if (family === "collections") {
      if (/Map/i.test(topic)) add("Map تحفظ أزواج مفتاح وقيمة", '"next" ⟶ المفتاح　|　"CSS" ⟶ القيمة　|　get("next") ⟶ CSS', "المفتاح يصل إلى القيمة المرتبطة به؛ غيّره في التعريف والقراءة معًا.");
      else if (/Set/i.test(topic)) add("Set تحفظ كل قيمة مرة واحدة", 'add("CSS") ⟶ إضافة　|　has("CSS") ⟶ فحص وجود', "الفهرس ليس طريقة الوصول في Set؛ نستخدم عملياتها لمعرفة وجود القيمة.");
      else add("المصفوفة صف خانات يبدأ من صفر", "index 0 ⟶ العنصر الأول　|　index 1 ⟶ العنصر الثاني　|　length ⟶ عدد الخانات", "ارسم رقم الفهرس تحت كل قيمة قبل أن تقرأ أو تعدّل عنصرًا.");
      if (/Array|Iteration|Typed Arrays/i.test(topic)) add("في كل دورة اربط الفهرس بالقيمة", "i=0 ⟶ tools[0] ⟶ HTML　|　i=1 ⟶ tools[1] ⟶ CSS", "بعد آخر عنصر، يصبح الشرط false؛ لذلك راجع علامة < وحد الطول.");
      else add("التغيير يقع على المجموعة نفسها", "القيمة تدخل ⟶ method تضيف/تبحث/تقرأ ⟶ نلاحظ المجموعة أو النتيجة", "ميّز بين القيمة التي أعادتها method وبين المجموعة بعد تعديلها.");
      appendExampleTrace();
      return details;
    }
    if (family === "conditions") add("الشرط يختار طريقًا واحدًا", "true ⟶ نفّذ هذا الفرع　|　false ⟶ جرّب الفرع البديل", "غيّر قيمة المدخل أولًا، ثم توقّع الفرع، وبعدها شغّل لتراجع توقعك.");
    else if (family === "functions") add("التعريف لا يشغّل الدالة وحده", "تعريف الفعل ⟶ استدعاء الاسم ⟶ مدخلات ⟶ أوامر ⟶ نتيجة", "ابحث عن سطر الاستدعاء؛ هناك تبدأ الأفعال داخل الدالة.");
    else if (family === "objects") add("الكائن يجمع وصفًا وأفعالًا", "movie/seat ⟶ خانات بيانات　|　show() ⟶ فعل يمكن استدعاؤه", "الحقل يجيب: ماذا يملك؟ والدالة تجيب: ماذا يفعل؟");
    else if (family === "events") add("تعريف المستمع ينتظر الإشارة", "اختيار الزر ⟶ click ⟶ استدعاء callback ⟶ تغيير النتيجة", "لا تعمل الدالة عند تعريف المستمع؛ تعمل حين يقع الحدث.");
    else if (family === "dom") add("اختيار العنصر يسبق تعديله", "document ⟶ querySelector ⟶ العنصر ⟶ textContent", "إذا لم يطابق المحدد عنصرًا، لن تجد خانة لتغييرها.");
    else if (family === "network" || family === "async") add("رتّب زمن وصول القيمة", "إرسال/إنشاء Promise ⟶ انتظار ⟶ وصول القيمة ⟶ استخدامها", "ضع القراءة أو التحديث بعد وصول البيانات، وتوقع احتمال الفشل في طلب الشبكة.");
    else if (family === "values") add("ميّز بين اسم الخانة ونوع ما بداخلها", "let/const ⟶ اسم وقيمة　|　typeof ⟶ فحص نوع القيمة", "قد يتغير المحتوى ويبقى الاسم نفسه، أو يتغير النوع بعد تحويل القيمة.");
    else add("افصل بين البيانات والفعل", "تعريف أو قيمة ⟶ تنفيذ الأمر ⟶ قراءة النتيجة", "التعريف يجهز شيئًا؛ سطر الاستدعاء أو الطباعة هو الذي ينفذ فعلًا.");
    appendExampleTrace();
    return details;
  }

  function courseDoneStep(spec) {
    return 5 + (spec && spec.details ? spec.details.length : 1);
  }
  return {
    cssFamily: cssFamily,
    cssLessonSpec: cssLessonSpec,
    jsFamily: jsFamily,
    jsLessonSpec: jsLessonSpec,
    courseLessonDetails: courseLessonDetails,
    courseDoneStep: courseDoneStep
  };
})();

window.LESSONS_DATA.references = (function() {
  function pages(folder, rows) {
    var result = {};
    rows.trim().split("\n").forEach(function(row) {
      var parts = row.trim().split("|");
      if (parts.length === 2) result[parts[0]] = "https://www.w3schools.com/" + folder + "/" + parts[1];
    });
    return result;
  }
  return {
    css: pages("css", `
      CSS Introduction|css_intro.asp
      CSS Syntax|css_syntax.asp
      CSS Selectors|css_selectors.asp
      CSS How To|css_howto.asp
      CSS Comments|css_comments.asp
      CSS Errors|css_errors.asp
      CSS Colors|css_colors.asp
      CSS Backgrounds|css_background.asp
      CSS Borders|css_border.asp
      CSS Margins|css_margin.asp
      CSS Padding|css_padding.asp
      CSS Height / Width|css_height_width.asp
      CSS Box Model|css_boxmodel.asp
      CSS Outline|css_outline.asp
      CSS Text|css_text.asp
      CSS Fonts|css_font.asp
      CSS Icons|css_icons.asp
      CSS Links|css_link.asp
      CSS Lists|css_list.asp
      CSS Tables|css_table.asp
      CSS Display|css_display.asp
      CSS Max-width|css_max-width.asp
      CSS Position|css_position.asp
      CSS Position Offsets|css_position_offset.asp
      CSS Z-index|css_z-index.asp
      CSS Overflow|css_overflow.asp
      CSS Float|css_float.asp
      CSS Inline-block|css_inline-block.asp
      CSS Align|css_align.asp
      CSS Combinators|css_combinators.asp
      CSS Pseudo-classes|css_pseudo_classes.asp
      CSS Pseudo-elements|css_pseudo_elements.asp
      CSS Opacity|css_image_transparency.asp
      CSS Navigation Bars|css_navbar.asp
      CSS Dropdowns|css_dropdowns.asp
      CSS Image Gallery|css_image_gallery.asp
      CSS Image Sprites|css_image_sprites.asp
      CSS Attribute Selectors|css_attribute_selectors.asp
      CSS Forms|css_forms.asp
      CSS Counters|css_counters.asp
      CSS Units|css_units.asp
      CSS Inheritance|css_inheritance.asp
      CSS Specificity|css_specificity.asp
      CSS !important|css_important.asp
      CSS Math Functions|css_math_functions.asp
      CSS Optimization|css_performance.asp
      CSS Accessibility|css_accessibility.asp
      CSS Website Layout|css_website_layout.asp
      CSS Advanced: Rounded Corners|css3_borders.asp
      CSS Border Images|css3_border_images.asp
      CSS Multiple Backgrounds|css3_backgrounds.asp
      CSS Advanced Colors|css3_colors.asp
      CSS Gradients|css3_gradients.asp
      CSS Shadows|css3_shadows.asp
      CSS Text Effects|css3_text_effects.asp
      CSS Custom Fonts|css3_fonts.asp
      CSS 2D Transforms|css3_2dtransforms.asp
      CSS 3D Transforms|css3_3dtransforms.asp
      CSS Transitions|css3_transitions.asp
      CSS Animations|css3_animations.asp
      CSS Tooltips|css_tooltip.asp
      CSS Image Styling|css3_images.asp
      CSS Image Modal|css3_images_modal.asp
      CSS Image Centering|css3_image_center.asp
      CSS Image Filters|css3_image_filters.asp
      CSS Image Shapes|css3_image_shapes.asp
      CSS object-fit|css3_object-fit.asp
      CSS object-position|css3_object-position.asp
      CSS Masking|css3_masking.asp
      CSS Buttons|css3_buttons.asp
      CSS Pagination|css3_pagination.asp
      CSS Multiple Columns|css3_multiple_columns.asp
      CSS User Interface|css3_user_interface.asp
      CSS Variables|css3_variables.asp
      CSS @property|css3_property.asp
      CSS Box Sizing|css3_box-sizing.asp
      CSS Functions|css_functions.asp
      CSS Media Queries|css3_mediaqueries.asp
      CSS Flexbox Intro|css3_flexbox.asp
      CSS Flex Container|css3_flexbox_container.asp
      CSS Flex Items|css3_flexbox_items.asp
      CSS Flex Responsive|css3_flexbox_responsive.asp
      CSS Grid Intro|css_grid.asp
      CSS Grid Container|css_grid_container.asp
      CSS Grid Items|css_grid_item.asp
      CSS Grid 12-column Layout|css_grid_12column.asp
      CSS @supports|css_supports_rule.asp
      CSS Responsive Intro|css_rwd_intro.asp
      CSS Responsive Viewport|css_rwd_viewport.asp
      CSS Responsive Grid View|css_rwd_grid.asp
      CSS Responsive Media Queries|css_rwd_mediaqueries.asp
      CSS Responsive Images|css_rwd_images.asp
      CSS Responsive Videos|css_rwd_videos.asp
      CSS Responsive Frameworks / Templates|css_rwd_frameworks.asp
    `),
    js: pages("js", `
      JS Introduction|js_intro.asp
      JS Where To|js_whereto.asp
      JS Output|js_output.asp
      JS Syntax|js_syntax.asp
      JS Statements|js_statements.asp
      JS Comments|js_comments.asp
      JS Variables|js_variables.asp
      JS Let|js_let.asp
      JS Const|js_const.asp
      JS Types|js_types.asp
      JS Operators|js_operators.asp
      JS Arithmetic|js_arithmetic.asp
      JS Assignment|js_assignment.asp
      JS Comparisons|js_comparisons.asp
      JS Conditional|js_conditionals.asp
      JS If Conditions|js_if.asp
      JS If / Else|js_if_else.asp
      JS Ternary|js_if_ternary.asp
      JS Switch|js_switch.asp
      JS Booleans|js_booleans.asp
      JS Logical|js_logical.asp
      JS Loops|js_loops.asp
      JS for Loop|js_loop_for.asp
      JS while Loop|js_loop_while.asp
      JS Break|js_break.asp
      JS Continue|js_continue.asp
      JS Control Flow|js_control_flow.asp
      JS Strings|js_strings.asp
      JS String Templates|js_string_templates.asp
      JS String Methods|js_string_methods.asp
      JS String Search|js_string_search.asp
      JS Numbers|js_numbers.asp
      JS Number Methods|js_number_methods.asp
      JS Number Properties|js_number_properties.asp
      JS Bitwise|js_bitwise.asp
      JS BigInt|js_bigint.asp
      JS Functions|js_function_intro.asp
      JS Function Invocation|js_function_invocation.asp
      JS Parameters|js_function_parameters.asp
      JS Return Values|js_function_return.asp
      JS Arguments|js_function_arguments.asp
      JS Function Expressions|js_function_expressions.asp
      JS Arrow Functions|js_arrow_function.asp
      JS Timers|js_timers.asp
      JS Objects|js_objects.asp
      JS Object Properties|js_object_properties.asp
      JS Object Methods|js_object_methods.asp
      JS this|js_object_this.asp
      JS Object Display|js_object_display.asp
      JS Constructors|js_object_constructors.asp
      JS Scope|js_scope.asp
      JS Code Blocks|js_codeblocks.asp
      JS Hoisting|js_hoisting.asp
      JS var / let / const|js_varletconst.asp
      JS Strict Mode|js_strict.asp
      JS Dates|js_dates.asp
      JS Date Formats|js_date_formats.asp
      JS Date Get|js_date_methods.asp
      JS Date Set|js_date_methods_set.asp
      JS Date Methods|js_date_reference.asp
      JS Arrays|js_arrays.asp
      JS Array Constructor|js_array_constructor.asp
      JS Array Methods|js_array_methods.asp
      JS Array Search|js_array_search.asp
      JS Array Sort|js_array_sort.asp
      JS Array Iterations|js_array_iteration.asp
      JS Array const|js_array_const.asp
      JS Sets|js_sets.asp
      JS Set Methods|js_set_methods.asp
      JS Set Logic|js_set_logic.asp
      JS WeakSet|js_sets_weak.asp
      JS Maps|js_maps.asp
      JS Map Methods|js_map_methods.asp
      JS WeakMap|js_maps_weak.asp
      JS Iterations|js_looping.asp
      JS Iterables|js_iterables.asp
      JS Iterators|js_iterators.asp
      JS Generators|js_generators.asp
      JS Math|js_math.asp
      JS Math Random|js_random.asp
      JS RegExp|js_regexp.asp
      JS Data Types|js_datatypes.asp
      JS Primitive Data|js_datatypes_primitives.asp
      JS Object Types|js_datatypes_objects.asp
      JS Symbols|js_datatypes_symbol.asp
      JS typeof|js_typeof.asp
      JS undefined / NaN|js_undefined.asp
      JS Type Coercion|js_type_coercion.asp
      JS Type Conversion|js_type_conversion.asp
      JS Destructuring|js_destructuring.asp
      JS Errors|js_errors_intro.asp
      JS Debugging|js_debugging.asp
      JS Style Guide|js_conventions.asp
      JS Best Practices|js_best_practices.asp
      JS Mistakes|js_mistakes.asp
      JS Performance|js_performance.asp
      JS Reference|js_alphabetic_reference.asp
      JS Projects|js_project_counter.asp
      JS Versions|js_versions.asp
      JS HTML DOM|js_htmldom.asp
      JS HTML Events|js_events.asp
      JS HTML First|js_htmlfirst.asp
      JS Window API|js_window.asp
      JS Fetch API|js_api_fetch.asp
      JS JSON|js_json.asp
      JS Web API|js_api_intro.asp
      JS Temporal|js_temporal.asp
      JS Advanced Functions|js_function_advanced.asp
      JS Advanced Objects|js_object_advanced.asp
      JS Classes|js_classes.asp
      JS Asynchronous JavaScript|js_asynchronous.asp
      JS Modules|js_modules.asp
      JS Meta & Proxy|js_meta_programming.asp
      JS Typed Arrays|js_typed_arrays.asp
      JS DOM Navigation|js_htmldom_navigation.asp
      JS Graphics|js_graphics.asp
      JS AJAX|js_ajax_intro.asp
      JS jQuery|js_jquery_selectors.asp
      JS JSONP|js_jsonp.asp
    `)
  };
})();


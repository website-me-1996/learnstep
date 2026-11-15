const modules = [
  {
    id: "phase-0-foundations",
    title: "المرحلة 0: البداية من الواقع والبيانات",
    description: "نبني صورة أولية للبيانات وقواعد البيانات ونجرب قراءة استعلام صغير قبل الدخول في التصميم.",
    icon: "🧭",
    lessons: [
      "ما البيانات التي نحتاج حفظها؟",
      "النظام والبرنامج وواجهة المستخدم وقاعدة البيانات",
      "لماذا لا تكفي الملفات العادية لكل نظام؟",
      "DBMS وSQL وPostgreSQL وSQLite",
      "الصف والعمود والقيمة والسجل",
      "قراءة جدول واقعي دون كتابة استعلام معقد",
      "أنواع البيانات وجودة البيانات",
      "أول SELECT قابل للملاحظة"
    ]
  },
  {
    id: "phase-1-data-thinking",
    title: "المرحلة 1: التفكير في البيانات قبل الجداول",
    description: "نلاحظ الهوية والتكرار والقيم المفقودة والبيانات الخام والمعلومات المحسوبة في أمثلة يومية.",
    icon: "🔎",
    lessons: [
      "البيانات الخام والمعلومة المحسوبة",
      "القيمة المفقودة ليست دائمًا صفرًا",
      "التكرار والتعارض في سجل واحد",
      "الهوية: كيف نعرف السجل نفسه؟",
      "المعرف الطبيعي والمُعرّف البديل",
      "اختيار نوع البيانات المناسب للمعلومة",
      "جودة البيانات من المدرسة والصيدلية والكاشير"
    ]
  },
  {
    id: "phase-2-system-analysis",
    title: "المرحلة 2: تحليل الأنظمة من الواقع",
    description: "نحوّل وصفًا واقعيًا إلى حقائق وأسئلة وقرارات يمكن أن تقود تصميم قاعدة بيانات قابلًا للاختبار.",
    icon: "🧩",
    lessons: [
      "ما النظام وما المشكلة التي يحاول حلها؟",
      "رسم حدود النظام وما يقع خارجه",
      "أصحاب المصلحة واحتياجاتهم المختلفة",
      "المستخدمون والأدوار والصلاحيات",
      "تحويل الوصف العام إلى أحداث يومية",
      "المدخلات والعمليات والمخرجات",
      "تتبع دورة حياة العملية",
      "اكتشاف الأشياء الحقيقية التي يتعامل معها النظام",
      "الشيء المهم مقابل الوصف أو القيمة",
      "المعلومات التي نسجلها عن كل شيء",
      "المعلومة الأصلية مقابل المعلومة المحسوبة",
      "استخراج قواعد العمل من الواقع",
      "قاعدة العمل والتحقق والصلاحية والإجراء",
      "الرابط المباشر والرابط غير المباشر",
      "منع العلاقات الوهمية بين عناصر الشاشة",
      "اكتشاف علاقة واحد إلى واحد",
      "اكتشاف علاقة واحد إلى متعدد",
      "اكتشاف علاقة متعدد إلى متعدد",
      "الاختيارية والإلزام في العلاقة",
      "الأحداث والمعاملات والحالات والتاريخ"
    ]
  },
  {
    id: "phase-3-database-design",
    title: "المرحلة 3: من التحليل إلى التصميم",
    description: "نحوّل الحقائق التي اكتشفناها إلى ERD ومفاتيح وقيود وقاموس بيانات ونراجع التصميم بالسيناريوهات.",
    icon: "🗺️",
    lessons: [
      "تحويل حقائق الواقع إلى ERD أولي",
      "الكيان والخاصية بعد اكتشافهما عمليًا",
      "اختيار خصائص الكيان دون تخزين زوائد",
      "حل متعدد إلى متعدد بكيان وسيط",
      "متى يصبح الكيان الوسيط سجلًا له بيانات؟",
      "الأحداث والمعاملات ككيانات تاريخية",
      "الحالة الحالية والتاريخ الكامل للسجل",
      "المفتاح الأساسي والمفتاح الأجنبي",
      "natural key وsurrogate key",
      "القيود المستخرجة من قواعد العمل",
      "تحويل ERD إلى مخطط جداول",
      "القاموس المبسط للبيانات",
      "مراجعة ERD بسيناريو طبيعي واستثناء",
      "تأثير تغير المتطلبات على التصميم"
    ]
  },
  {
    id: "phase-4-sql-basics",
    title: "المرحلة 4: SQL الأساسي ببيانات مفهومة",
    description: "نقرأ ونرشح ونرتب البيانات تدريجيًا، مع إبقاء كل استعلام مرتبطًا بسؤال منتج حقيقي.",
    icon: "⌨️",
    lessons: [
      "SELECT وتحديد الأعمدة",
      "الأسماء المستعارة لجعل النتيجة مفهومة",
      "DISTINCT ومنع تكرار العرض",
      "WHERE ومعاملات المقارنة",
      "AND وOR وNOT دون خلط الأولويات",
      "IN وBETWEEN لقوائم ومجالات واقعية",
      "LIKE وILIKE والبحث النصي",
      "NULL وIS NULL وIS NOT NULL",
      "ORDER BY وترتيب أكثر من عمود",
      "LIMIT وOFFSET وترقيم النتائج",
      "CASE لتحويل قاعدة العمل إلى نتيجة",
      "COALESCE وCAST ومعالجة القيم"
    ]
  },
  {
    id: "phase-5-reporting",
    title: "المرحلة 5: التجميع والتقارير",
    description: "نحوّل الصفوف إلى مؤشرات وتقارير يومية وشهرية دون فقدان معنى البيانات.",
    icon: "📊",
    lessons: [
      "COUNT وما الذي نعده فعلًا",
      "SUM وAVG مع القيم المفقودة",
      "MIN وMAX لاكتشاف الحدود",
      "GROUP BY من سجل إلى فئة",
      "HAVING بعد التجميع",
      "تقرير يومي وشهري بالتاريخ",
      "مؤشر عمل قابل للتفسير"
    ]
  },
  {
    id: "phase-6-relations",
    title: "المرحلة 6: العلاقات والاستعلامات متعددة الجداول",
    description: "نستخدم العلاقات التي اكتشفناها في التحليل، ونمنع التكرار الناتج عن الربط الخاطئ.",
    icon: "🔗",
    lessons: [
      "INNER JOIN والعلاقة التي يجب أن تطابق",
      "LEFT JOIN للحفاظ على الطرف غير المكتمل",
      "RIGHT وFULL JOIN ومتى نحتاجهما",
      "الربط عبر أكثر من جدول",
      "SELF JOIN والعلاقات داخل النوع نفسه",
      "CROSS JOIN ومخاطر الضرب الكارتيزي",
      "التكرار بعد JOIN وكيف نكتشف سببه",
      "EXISTS وanti join للعلاقات غير المباشرة"
    ]
  },
  {
    id: "phase-7-schema-data",
    title: "المرحلة 7: إنشاء وتعديل البيانات بأمان",
    description: "نبني الجداول والقيود وندير البيانات، مع التمييز بين مسؤولية التطبيق ومسؤولية قاعدة البيانات.",
    icon: "🛠️",
    lessons: [
      "CREATE SCHEMA وCREATE TABLE",
      "أنواع PostgreSQL وفرق SQLite المهم",
      "PRIMARY KEY وNOT NULL",
      "UNIQUE وCHECK",
      "DEFAULT والوقت الذي يضيفه الخادم",
      "FOREIGN KEY والتكامل المرجعي",
      "ON DELETE RESTRICT وCASCADE",
      "INSERT وseed data متسقة",
      "UPDATE الآمن وRETURNING",
      "DELETE وsoft delete وALTER TABLE"
    ]
  },
  {
    id: "phase-8-advanced-sql",
    title: "المرحلة 8: الاستعلامات المتقدمة",
    description: "نقسم الاستعلامات المعقدة إلى مراحل قابلة للفهم ونحلل الزمن والترتيب والهياكل الشجرية.",
    icon: "🧠",
    lessons: [
      "الاستعلام الفرعي scalar",
      "IN وNOT IN مع مشكلة NULL",
      "EXISTS وNOT EXISTS",
      "الاستعلام المترابط correlated",
      "WITH CTE لتسمية خطوة التحليل",
      "WITH RECURSIVE للهيكل الشجري",
      "ROW_NUMBER وRANK وDENSE_RANK",
      "LAG وLEAD والمجاميع الجارية"
    ]
  },
  {
    id: "phase-9-normalization",
    title: "المرحلة 9: التطبيع وجودة التصميم",
    description: "نرى كيف يصنع التصميم السيئ مشاكل التحديث والإدراج والحذف، ثم نحسن التصميم بقرارات مبررة.",
    icon: "🧱",
    lessons: [
      "الاعتماديات الوظيفية من مثال واقعي",
      "1NF والقيم الذرية",
      "2NF والاعتماد على المفتاح كاملًا",
      "3NF والاعتماديات المتعدية",
      "متى يكون فك التطبيع قرارًا محسوبًا؟"
    ]
  },
  {
    id: "phase-10-transactions",
    title: "المرحلة 10: المعاملات والتزامن",
    description: "نربط أكثر من تعديل بوحدة واحدة ونحل مشاكل البيع والدفع والمخزون والتزامن.",
    icon: "🔄",
    lessons: [
      "BEGIN وCOMMIT وROLLBACK",
      "ACID كسلوك يمكن ملاحظته",
      "SAVEPOINT وإصلاح جزء من العملية",
      "lost update وسباق آخر قطعة",
      "مستويات العزل والقفل وdeadlock"
    ]
  },
  {
    id: "phase-11-production",
    title: "المرحلة 11: الأداء والأمان وربط التطبيق",
    description: "نقيس الأداء ونحمي البيانات ونصل قاعدة البيانات بطبقات التطبيق دون خلط المسؤوليات.",
    icon: "🚀",
    lessons: [
      "الفهرس ومتى لا يستخدمه المحرك",
      "B-Tree وcomposite index والانتقائية",
      "EXPLAIN وEXPLAIN ANALYZE",
      "pagination وkeyset pagination",
      "SQL injection وparameterized queries",
      "الأدوار وleast privilege وحماية الأسرار",
      "audit logs وbackup وrestore والمigrations",
      "مسؤولية الواجهة والخادم وقاعدة البيانات",
      "DTO وvalidation وrepository بصورة مبسطة",
      "اختبار قاعدة البيانات ومعايير القبول",
      "تغيير المتطلبات ومصفوفة التتبع",
      "اختيار مشروع التخرج وخطة التسليم"
    ]
  },
  {
    id: "phase-12-capstones",
    title: "المرحلة 12: مشروعات منتجات حقيقية",
    description: "نطبق خيط التحليل والتصميم والتنفيذ والاختبار على الصيدلية والكاشير والمدرسة.",
    icon: "🏗️",
    lessons: [
      "مشروع الصيدلية: وصف المشكلة وحدود النظام",
      "مشروع الصيدلية: الدفعات والمخزون والمعاملات",
      "مشروع الصيدلية: التقارير والأمان والاختبارات",
      "مشروع POS: جلسة الكاشير والفاتورة والدفع",
      "مشروع POS: التزامن والمرتجعات وسجل المراجعة",
      "مشروع المدرسة: التسجيل والفصول والسنوات",
      "مشروع المدرسة: الحضور والدرجات والتاريخ",
      "مشروع المدرسة: التقرير النهائي ومعايير القبول والأمان والتكامل المتقدم"
    ]
  }
];

const docs = {
  foundation: "https://www.postgresql.org/docs/current/tutorial.html",
  select: "https://www.postgresql.org/docs/current/sql-select.html",
  ddl: "https://www.postgresql.org/docs/current/ddl.html",
  queries: "https://www.postgresql.org/docs/current/queries.html",
  performance: "https://www.postgresql.org/docs/current/performance-tips.html",
  security: "https://www.postgresql.org/docs/current/client-authentication.html"
};

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "lesson";
}

function sqlExample(title, index) {
  const t = title.toLowerCase();
  if (t.includes("select") || t.includes("الأعمدة")) return "SELECT product_name, unit_price FROM products;";
  if (t.includes("where") || t.includes("comparison")) return "SELECT id, product_name FROM products WHERE unit_price >= 100;";
  if (t.includes("join") || t.includes("العلاقة")) return "SELECT p.product_name, c.name FROM products p JOIN categories c ON c.id = p.category_id;";
  if (t.includes("group") || t.includes("count") || t.includes("sum") || t.includes("تقرير")) return "SELECT category_id, COUNT(*) AS item_count FROM products GROUP BY category_id;";
  if (t.includes("create") || t.includes("table") || t.includes("primary")) return "CREATE TABLE products (id bigint PRIMARY KEY, product_name text NOT NULL);";
  if (t.includes("insert") || t.includes("seed")) return "INSERT INTO products (id, product_name) VALUES (1, 'Notebook');";
  if (t.includes("update")) return "UPDATE products SET product_name = 'Notebook Pro' WHERE id = 1 RETURNING id, product_name;";
  if (t.includes("delete")) return "DELETE FROM products WHERE id = 1;";
  if (t.includes("transaction") || t.includes("begin") || t.includes("acid") || t.includes("concurr")) return "BEGIN;\nUPDATE stock SET quantity = quantity - 1 WHERE product_id = 1 AND quantity > 0;\nCOMMIT;";
  if (t.includes("index") || t.includes("explain") || t.includes("performance")) return "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM products WHERE product_name = 'Notebook';";
  if (t.includes("recursive") || t.includes("tree")) return "WITH RECURSIVE tree AS (SELECT id, parent_id, name FROM departments WHERE parent_id IS NULL) SELECT * FROM tree;";
  if (t.includes("window") || t.includes("row_number") || t.includes("lag") || t.includes("rank")) return "SELECT product_id, sold_at, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY sold_at) AS position FROM sales;";
  return "SELECT '" + title.replace(/'/g, "''") + "' AS lesson_context;";
}

function phaseFor(module, title) {
  if (module.id === "phase-2-system-analysis") return "نسأل عن الواقع قبل اختيار الجداول: " + title;
  if (module.id === "phase-12-capstones") return "تسليم منتج حقيقي: " + title;
  return module.title + " — " + title;
}

function buildChanges(code, title, index) {
  const marker = "lesson_context";
  if (code.includes(marker)) {
    return [
      { from: marker, to: "decision_context", title: "سمِّ القرار الذي يوضحه المثال" },
      { from: "decision_context", to: "tested_context", title: "اجعل أثر القرار قابلًا للفحص" },
      { from: "tested_context", to: "accepted_context", title: "ثبّت النتيجة المقبولة" }
    ];
  }
  if (code.includes("products")) {
    return [
      { from: "products", to: "inventory_items", title: "اختَر مصدر البيانات الصحيح" },
      { from: "inventory_items", to: "products", title: "قارن الاسم بالمسؤولية" },
      { from: "products", to: "products", title: "راجع الاستعلام دون تغيير النتيجة" }
    ];
  }
  const firstLine = code.split("\n")[0];
  return [
    { from: firstLine, to: firstLine + "\n-- decision: identified", title: "حدّد السؤال قبل التنفيذ" },
    { from: "-- decision: identified", to: "-- decision: identified\n-- test: observed", title: "أضف ملاحظة اختبار" },
    { from: "-- test: observed", to: "-- test: observed\n-- acceptance: checked", title: "وثّق قرار القبول" }
  ];
}

function lessonFrom(module, title, order) {
  const code = sqlExample(title, order);
  const changes = buildChanges(code, title, order);
  const finalCode = changes.reduce((value, change) => value.replace(change.from, change.to), code);
  const skill = module.id.replace(/^phase-/, "");
  const analysis = module.id === "phase-2-system-analysis";
  const project = module.id === "phase-12-capstones" ? title.match(/الصيدلية|POS|المدرسة/)[0] : "الصيدلية والكاشير والمدرسة";
  const repairOptions = [
    "اعتماد النتيجة دون سؤال يثبت قاعدة العمل أو نطاقها.",
    "تغيير لون محرر SQL سيصلح البيانات تلقائيًا.",
    "كل استعلام يحتاج JOIN حتى لو لم توجد علاقة في الواقع.",
    "إخفاء الخطأ من الواجهة يكفي لحماية قاعدة البيانات."
  ];
  const correctOptionIndex = order % repairOptions.length;
  const correctOption = repairOptions.shift();
  repairOptions.splice(correctOptionIndex, 0, correctOption);
  const parts = [
    "المشهد: " + title + " داخل " + project + ".",
    "القرار: نكتب ما نعرفه الآن ونترك ما يحتاج سؤالًا إضافيًا واضحًا.",
    "الأثر: هذا القرار يظهر لاحقًا في الجدول أو القيد أو الاستعلام أو الاختبار."
  ];
  const steps = changes.map(function(change, stepIndex) {
    const before = stepIndex === 0 ? code : changes.slice(0, stepIndex).reduce((value, item) => value.replace(item.from, item.to), code);
    const after = before.replace(change.from, change.to);
    return {
      id: "step-" + (stepIndex + 1),
      title: change.title,
      objective: analysis ? "استخراج قرار واحد من مشهد واقعي قبل تسمية المصطلح التقني." : "تنفيذ قرار واحد وملاحظة أثره في نتيجة الدرس.",
      type: "edit",
      instruction: analysis ? "صف القرار في المثال ثم نفّذه في النص الظاهر وشغّل للمراجعة." : "عدّل الجزء المحدد فقط، ثم شغّل وقارن النتيجة بالسؤال.",
      benefit: "فائدة الخطوة: صار لدينا دليل صغير يمكن مراجعته بدل تخمين التصميم كاملًا.",
      from: change.from,
      to: change.to,
      expectedLine: change.to,
      errorRules: [
        { pattern: "\\bUPDATE\\b(?![\\s\\S]*\\bWHERE\\b)", flags: "i", type: "logic", message: "تأكد من وجود شرط يحدد السجلات قبل تحديث بيانات مشتركة." },
        { pattern: "=\\s*NULL|!=\\s*NULL|<>\\s*NULL", flags: "i", type: "logic", message: "NULL يحتاج IS NULL أو IS NOT NULL، لا مقارنة مساواة عادية." }
      ],
      hints: [
        "انتبه إلى الجزء الذي يمثل قرار الخطوة الحالية فقط.",
        "القاعدة: لا نقفز إلى قرار أكبر من السؤال؛ ثبّت المعلومة ثم راجع أثرها. هل عرفت ما الذي نحتاج إثباته الآن؟",
        "قرّب التعديل من هذا الجزء: " + change.to,
        "الحل الدقيق للخطوة هو: " + change.to
      ]
    };
  });
  return {
    id: "database-" + String(order + 1).padStart(3, "0") + "-" + slugify(title),
    legacyId: "database:" + order,
    order,
    module: module.id,
    phase: phaseFor(module, title),
    title,
    skill,
    duration: analysis || module.id === "phase-12-capstones" ? "25 دقيقة" : "18 دقيقة",
    level: order < 15 ? "مبتدئ" : order < 60 ? "متوسط" : "متقدم",
    summary: "درس تطبيقي يربط " + title + " بسؤال واقعي، ثم يحوّل القرار إلى أثر قابل للتنفيذ والاختبار.",
    concept: "نبدأ من مشهد أو مشكلة مرتبطة بـ" + title + ". لا نحتاج إلى حسم النظام كله الآن؛ نحدد المعلومة أو القاعدة التي أمامنا، نوضح ما نعرفه وما زال مجهولًا، ثم نختار تمثيلًا يمكن تغييره بعد الاختبار.",
    whyUse: "يظهر هذا القرار عندما نحتاج إلى بناء منتج يعتمد على بيانات قابلة للمراجعة. تجاهله قد ينتج سجلًا مكررًا أو علاقة وهمية أو نتيجة تقرير لا يمكن تفسيرها.",
    browserMechanics: "يحلل محرك PostgreSQL النص، يتحقق من الأسماء والقيود، يختار خطة تنفيذ، ثم ينفذ القراءة أو التعديل. في درس التحليل نمثل القرار بتعليق واستعلام صغير حتى يبقى أثر التفكير قابلًا للملاحظة في المحرر.",
    documentationUrl: module.id.includes("sql") || module.id.includes("reporting") || module.id.includes("relations") ? docs.select : module.id.includes("schema") ? docs.ddl : module.id.includes("production") ? docs.performance : docs.foundation,
    file: "query.sql",
    flow: "مشهد واقعي ⟶ سؤال اكتشاف ⟶ قرار صغير ⟶ تمثيل SQL ⟶ اختبار النتيجة",
    task: "حلّل السؤال المرتبط بالدرس، نفّذ التعديل الصغير، ثم راجع النتيجة مقابل قاعدة العمل.",
    code,
    expected: finalCode,
    reference: docs.foundation,
    breakdown: parts,
    steps,
    bugRepair: {
      brokenCode: code + "\n-- خطأ محتمل: القرار لم يرتبط بقاعدة عمل واضحة",
      fixedCode: finalCode,
      question: "ما المشكلة الأقرب في هذا المثال قبل اعتماده داخل منتج؟",
      explanation: "الإجابة الجيدة تربط الخطأ بقاعدة العمل أو سلامة البيانات، لا بمجرد اختلاف شكلي في النص.",
      options: repairOptions,
      correctOptionIndex
    },
    quiz: {
      question: "ما القرار الأصغر الذي يمكن اختباره الآن دون تخمين بقية النظام؟",
      options: ["القرار الموضح في خطوة الدرس", "إنشاء كل الجداول دفعة واحدة", "إضافة علاقة بلا سؤال", "تجاهل البيانات القديمة"],
      correct: 0
    },
    projectContext: project,
    prerequisites: order === 0 ? [] : ["database:" + (order - 1)],
    learningOutcomes: ["يصف المشكلة قبل اختيار الجدول", "ينفذ تعديلًا قابلًا للتحقق", "يربط القرار بأثر في منتج حقيقي"],
    commonMisconceptions: ["ليس كل اسم في الوصف جدولًا", "شكل الشاشة لا يثبت وجود علاقة", "النتيجة الصحيحة تحتاج قاعدة عمل قابلة للشرح"],
    acceptanceCriteria: ["الكود النهائي قابل للقراءة", "كل خطوة تبني على الحالة السابقة", "يمكن شرح سبب القرار واختباره"]
  };
}

function buildCurriculum() {
  const lessons = [];
  modules.forEach(function(module) { module.lessons.forEach(function(title) { lessons.push(lessonFrom(module, title, lessons.length)); }); });
  return {
    schemaVersion: "1.0.0",
    track: "database",
    title: "مسار قواعد البيانات والمنتجات الواقعية: من الصفر إلى التصميم والتنفيذ",
    description: "رحلة مترابطة تبدأ من فهم البيانات وتحليل الأنظمة، ثم تصميم ERD والجداول وكتابة SQL واختبارها، وتنتهي بمشروعات صيدلية وكاشير ومدرسة قابلة للمراجعة.",
    totalLessons: lessons.length,
    modules: Object.fromEntries(modules.map(function(module) {
      return [module.id, { id: module.id, title: module.title, description: module.description, icon: module.icon, badge: module.lessons.length + " درسًا", lessonCount: module.lessons.length }];
    })),
    lessons
  };
}

module.exports = { modules, buildCurriculum };

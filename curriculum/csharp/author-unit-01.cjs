// Original Arabic teaching content, fact-checked against the linked Microsoft docs.
// Rebuild the full course: npm run curriculum:csharp
const fs = require("node:fs");
const path = require("node:path");
const refs = {
  print: "https://learn.microsoft.com/en-us/training/modules/csharp-write-first/",
  variables: "https://learn.microsoft.com/en-us/training/modules/csharp-literals-variables/",
  structure: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/",
  arithmetic: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators"
};
const lessons = [
  {
    slug: "first-output", title: "أول أمر: اطبع رسالة", reference: refs.print,
    scene: "أمامك شاشة فارغة. نريد أن تظهر عليها رسالة قصيرة واحدة. هذا كل المطلوب الآن.",
    concept: "Console.WriteLine يكتب القيمة بين القوسين في شاشة المخرجات، ثم ينقل موضع الكتابة إلى سطر جديد. النص يُكتب بين علامتي تنصيص، والأمر ينتهي بفاصلة منقوطة.",
    why: "عندما تريد معرفة ما وصل إليه البرنامج، يمكنك طباعة رسالة ومشاهدة أثر أمر واحد مباشرة.",
    mechanics: "يُفحص الكود أولًا. عند التنفيذ تُقرأ قيمة النص وتُرسل إلى المخرجات. لن نحتاج الآن إلى كتابة class أو Main؛ نستخدم أوامر المستوى الأعلى.",
    breakdown: ["Console: الجهة التي نتعامل معها للطباعة.", "WriteLine(...): الفعل المطلوب، والقوسان يحددان القيمة التي نرسلها.", "\"بدأت\": نص، وعلامتا التنصيص ليستا جزءًا من الرسالة المطبوعة.", ";: نهاية الأمر البرمجي."],
    code: 'Console.WriteLine("بدأت");',
    build: { task: "يا كمبيوتر، اطبع كلمة «بدأت» في سطر واحد. اكتب الأمر في المحرر ثم شغّل.", output: "بدأت\n", rule: "الرسالة نص بين علامتي تنصيص، والطباعة تحتاج اسم الأمر والأقواس ونهاية الجملة.", attention: "انظر إلى اسم أمر الطباعة، ثم مكان الرسالة بين القوسين.", help: "استخدم Console.WriteLine، وضع كلمة بدأت كنص داخله." },
    edit: { task: "يا كمبيوتر، غيّر الرسالة إلى «أنا أجرب». غيّر النص وحده ثم شغّل.", solution: 'Console.WriteLine("أنا أجرب");', output: "أنا أجرب\n", attention: "اترك أمر الطباعة كما هو، وراجع الكلمات الموجودة بين علامتي التنصيص." },
    experiment: { task: "يا كمبيوتر، اطبع رسالة من اختيارك تختلف عن «أنا أجرب». راقب كيف تتغير المخرجات.", solution: 'Console.WriteLine("خطوتي الأولى");' },
    bug: { broken: 'Console.Writeline("بدأت");', fixed: 'Console.WriteLine("بدأت");', output: "بدأت\n", question: "الكمبيوتر لم يتعرف على Writeline. ما السبب؟", options: ["حرف L في WriteLine يجب أن يكون كبيرًا", "الرسالة لا بد أن تكون رقمًا", "يجب طباعة رسالتين"], correct: 0, explanation: "C# تفرق بين الحروف الكبيرة والصغيرة. الاسم الصحيح WriteLine." },
    transfer: { task: "يا كمبيوتر، اطبع «تم الحفظ» في سطر واحد. ابدأ أنت من المحرر الفارغ.", solution: 'Console.WriteLine("تم الحفظ");', output: "تم الحفظ\n", methods: ["WriteLine"] }
  },
  {
    slug: "statement-order", title: "الكمبيوتر ينفّذ بالترتيب", reference: refs.structure,
    scene: "شاشة تعرض خطوتين: فتح الطلب، ثم تجهيزه. سنرى كيف يحدد ترتيب الأوامر ترتيب الرسائل.",
    concept: "في هذا البرنامج المتسلسل ينفذ الكمبيوتر الأمر الأول، ثم الذي يليه. السطر الثاني لا يُنفذ قبل الأول.",
    why: "ترتيب الأوامر مهم عندما تعتمد خطوة لاحقة على ما حدث قبلها، مثل عرض رسالة البداية قبل رسالة النهاية.",
    mechanics: "سهم التنفيذ يتوقف عند أمر الطباعة الأول فتظهر رسالته، ثم ينتقل إلى الأمر الثاني. كل WriteLine يضيف نهاية سطر.",
    breakdown: ["الأمر الأول يطبع الرسالة الأولى.", "الأمر التالي يطبع الرسالة الثانية تحتها.", "تبديل موضع الأمرين يبدل ترتيب المخرجات."],
    code: 'Console.WriteLine("فتح الطلب");\nConsole.WriteLine("تجهيز الطلب");',
    build: { task: "يا كمبيوتر، اطبع «فتح الطلب» أولًا، ثم «تجهيز الطلب» في السطر التالي.", output: "فتح الطلب\nتجهيز الطلب\n", rule: "موضع الأمر في البرنامج المتسلسل يحدد متى ينفذ.", attention: "تتبع السهم من الأمر الأول إلى الأمر الثاني.", help: "اكتب أمرَي WriteLine، وضع رسالة فتح الطلب قبل رسالة التجهيز." },
    edit: { task: "يا كمبيوتر، اطبع «تجهيز الطلب» أولًا ثم «فتح الطلب». بدّل موضع الأمرين.", solution: 'Console.WriteLine("تجهيز الطلب");\nConsole.WriteLine("فتح الطلب");', output: "تجهيز الطلب\nفتح الطلب\n", attention: "راجع أول رسالة تريد رؤيتها وأي أمر موجود في الأعلى." },
    experiment: { task: "يا كمبيوتر، أضف رسالة ثالثة من اختيارك في نهاية البرنامج، ثم شاهد ترتيب الرسائل.", solution: 'Console.WriteLine("تجهيز الطلب");\nConsole.WriteLine("فتح الطلب");\nConsole.WriteLine("المراجعة");', minPrints: 3 },
    bug: { broken: 'Console.WriteLine("وصلت النهاية");\nConsole.WriteLine("بدأت");', fixed: 'Console.WriteLine("بدأت");\nConsole.WriteLine("وصلت النهاية");', output: "بدأت\nوصلت النهاية\n", question: "الهدف طباعة «بدأت» قبل «وصلت النهاية»، لكن الناتج معكوس. لماذا؟", options: ["WriteLine يعكس الرسائل تلقائيًا", "أمر طباعة النهاية موجود قبل أمر البداية", "اللغة العربية تمنع الترتيب"], correct: 1, explanation: "الكود صالح، لكن ترتيب الأمرين لا يحقق الهدف. ننقل أمر البداية للأعلى." },
    transfer: { task: "يا كمبيوتر، اطبع «استلام»، ثم «تنفيذ»، ثم «تسليم»، كل رسالة في سطر مستقل.", solution: 'Console.WriteLine("استلام");\nConsole.WriteLine("تنفيذ");\nConsole.WriteLine("تسليم");', output: "استلام\nتنفيذ\nتسليم\n" }
  },
  {
    slug: "write-and-writeline", title: "نفس السطر أم سطر جديد؟", reference: refs.print,
    scene: "نريد كتابة كلمة «الاسم:» ثم الاسم بجانبها. سنحدد أين يقف موضع الكتابة.",
    concept: "Console.Write يطبع ويترك موضع الكتابة بعد آخر حرف في السطر نفسه. Console.WriteLine يطبع ثم ينقل موضع الكتابة إلى بداية سطر جديد.",
    why: "نختار بين الأمرين عندما نريد تجميع أجزاء رسالة في سطر، أو فصل النتائج على أسطر.",
    mechanics: "بعد Write يبقى موضع الكتابة في نهاية النص. الأمر التالي يكمل من هذا الموضع. WriteLine يضيف نهاية سطر بعد طباعة قيمته.",
    breakdown: ["Write لا يضيف نهاية سطر.", "WriteLine يضيف نهاية سطر بعد القيمة.", "المسافة داخل النص جزء من المخرجات، فلا تتجاهلها."],
    code: 'Console.Write("الاسم: ");\nConsole.WriteLine("أحمد");',
    build: { task: "يا كمبيوتر، اكتب «الاسم: » دون الانتقال لسطر جديد، ثم اطبع «أحمد» لتظهر بجانبها.", output: "الاسم: أحمد\n", methods: ["Write", "WriteLine"], rule: "موضع الكتابة ينتقل لسطر جديد بعد WriteLine، ويظل في السطر نفسه بعد Write.", attention: "راقب موضع الكتابة بعد تنفيذ أول أمر.", help: "استخدم Write للعنوان، ثم WriteLine للاسم. ضع مسافة بعد النقطتين." },
    edit: { task: "يا كمبيوتر، اجعل الاسم يظهر في السطر التالي. غيّر الأمر الأول من Write إلى WriteLine.", solution: 'Console.WriteLine("الاسم: ");\nConsole.WriteLine("أحمد");', output: "الاسم: \nأحمد\n", attention: "التغيير في اسم أمر الطباعة الأول، وليس في الاسم المطبوع." },
    experiment: { task: "يا كمبيوتر، جرّب رسالة مختلفة باستخدام Write وWriteLine معًا، ولاحظ موضع كل جزء.", solution: 'Console.Write("الحالة: ");\nConsole.WriteLine("جاهز");', methods: ["Write", "WriteLine"] },
    bug: { broken: 'Console.WriteLine("العدد: ");\nConsole.WriteLine(2);', fixed: 'Console.Write("العدد: ");\nConsole.WriteLine(2);', output: "العدد: 2\n", question: "نريد «العدد: 2» في سطر واحد، فلماذا ظهر الرقم تحته؟", options: ["الرقم لا يمكن طباعته", "الأمر الثاني نُفذ أولًا", "الأمر الأول WriteLine أضاف نهاية سطر"], correct: 2, explanation: "WriteLine في الأمر الأول نقل موضع الكتابة. استخدام Write يترك الرقم يكمل السطر." },
    transfer: { task: "يا كمبيوتر، اعرض «الحالة: جاهز» في سطر واحد باستخدام Write للعنوان وWriteLine لكلمة جاهز.", solution: 'Console.Write("الحالة: ");\nConsole.WriteLine("جاهز");', output: "الحالة: جاهز\n", methods: ["Write", "WriteLine"] }
  },
  {
    slug: "string-variable", title: "احفظ نصًا ثم اقرأه باسمه", reference: refs.variables,
    scene: "لنا اسم عميل نريد الاحتفاظ به، ثم إرساله للطباعة. سنرى الاسم والقيمة كشيئين مختلفين.",
    concept: "string يحدد نوع متغير يحمل نصًا. في string customer = \"أحمد\"; اسم المتغير customer وقيمته النصية أحمد. قراءة customer لاحقًا تعطي قيمته الحالية.",
    why: "نحتفظ بالمعلومة تحت اسم مفهوم ونستخدمها في أوامر لاحقة، بدل كتابة النص نفسه في كل موضع.",
    mechanics: "أول أمر ينشئ متغيرًا ويعطيه قيمة. أمر الطباعة يقرأ القيمة من اسم المتغير. الرسم يعرض القيمة للتعلم ولا يمثل عنوان ذاكرة فعليًا.",
    breakdown: ["string: النوع الذي نستخدمه للنص.", "customer: اسم المتغير؛ لا نضعه بين علامتي تنصيص عند قراءة قيمته.", "=: إسناد قيمة إلى المتغير.", "\"أحمد\": القيمة النصية التي نحفظها."],
    code: 'string customer = "أحمد";\nConsole.WriteLine(customer);',
    build: { task: "يا كمبيوتر، أنشئ متغير string اسمه customer بقيمة «أحمد»، ثم اطبع قيمة customer.", output: "أحمد\n", declared: ["customer"], printed: ["customer"], rule: "اسم المتغير بلا تنصيص يقرأ قيمته، بينما النص بين علامتي التنصيص يُطبع كما هو.", attention: "قارن اسم المتغير بقيمته في لوحة القيم.", help: "عرّف customer أولًا، ثم مرر اسمه بلا تنصيص إلى WriteLine." },
    edit: { task: "يا كمبيوتر، غيّر القيمة المحفوظة إلى «سارة»، واترك أمر الطباعة يقرأ customer.", solution: 'string customer = "سارة";\nConsole.WriteLine(customer);', output: "سارة\n", declared: ["customer"], printed: ["customer"], attention: "غيّر النص في سطر التعريف، ثم راقب سطر الطباعة نفسه." },
    experiment: { task: "يا كمبيوتر، احفظ اسمًا آخر من اختيارك في customer واطبع قيمته.", solution: 'string customer = "عمر";\nConsole.WriteLine(customer);', declared: ["customer"], printed: ["customer"] },
    bug: { broken: 'string customer = "أحمد";\nConsole.WriteLine("customer");', fixed: 'string customer = "أحمد";\nConsole.WriteLine(customer);', output: "أحمد\n", declared: ["customer"], printed: ["customer"], question: "لماذا ظهرت كلمة customer بدل اسم أحمد؟", options: ["وُضع اسم المتغير بين تنصيص، فأصبح نصًا حرفيًا", "string لا يقبل أسماء عربية", "المتغير اختفى بعد تعريفه"], correct: 0, explanation: "\"customer\" نص حرفي؛ customer دون تنصيص يقرأ القيمة المحفوظة." },
    transfer: { task: "يا كمبيوتر، أنشئ متغير string اسمه city بقيمة «القاهرة»، ثم اطبع قيمته.", solution: 'string city = "القاهرة";\nConsole.WriteLine(city);', output: "القاهرة\n", declared: ["city"], printed: ["city"] }
  },
  {
    slug: "int-variable", title: "احفظ عددًا صحيحًا", reference: refs.variables,
    scene: "طلب حجز يحتوي تذكرتين. نريد حفظ عدد التذاكر كرقم يمكن استخدامه في الحساب لاحقًا.",
    concept: "int نوع لعدد صحيح ضمن نطاقه. نكتب int tickets = 2; لحفظ العدد 2 في المتغير tickets. العدد هنا يُكتب دون تنصيص؛ \"2\" نص مختلف النوع.",
    why: "الكمبيوتر يحتاج أن يميز بين رقم نحسب به ونص نعرضه. نوع المتغير يساعده في اكتشاف استخدام قيمة غير مناسبة.",
    mechanics: "يفحص النوع قبل التشغيل. بعد إنشاء tickets بقيمة 2 يستطيع أمر الطباعة قراءة القيمة. قيمة نصية لا تُسنَد مباشرة إلى int.",
    breakdown: ["int: نوع عدد صحيح، وليس أي قيمة مهما كان حجمها.", "tickets: اسم يوضح أن القيمة عدد تذاكر.", "2: قيمة عددية بلا تنصيص.", "Console.WriteLine(tickets): قراءة القيمة الحالية وطباعتها."],
    code: 'int tickets = 2;\nConsole.WriteLine(tickets);',
    build: { task: "يا كمبيوتر، أنشئ متغير int اسمه tickets بقيمة 2، ثم اطبع قيمته.", output: "2\n", declared: ["tickets"], printed: ["tickets"], rule: "int يقبل عددًا صحيحًا ضمن نطاقه؛ الرقم بين تنصيص يصبح نصًا.", attention: "راجع نوع المتغير وهل القيمة عدد أم نص.", help: "اكتب int tickets = 2; ثم اطبع tickets دون تنصيص." },
    edit: { task: "يا كمبيوتر، اجعل عدد التذاكر 4 في سطر التعريف، ثم اطبع tickets نفسه.", solution: 'int tickets = 4;\nConsole.WriteLine(tickets);', output: "4\n", declared: ["tickets"], printed: ["tickets"], attention: "القيمة تتغير، واسم المتغير الذي يقرؤه أمر الطباعة يظل نفسه." },
    experiment: { task: "يا كمبيوتر، جرّب عدد تذاكر آخر صحيحًا واطبع قيمة tickets.", solution: 'int tickets = 3;\nConsole.WriteLine(tickets);', declared: ["tickets"], printed: ["tickets"] },
    bug: { broken: 'int tickets = "2";\nConsole.WriteLine(tickets);', fixed: 'int tickets = 2;\nConsole.WriteLine(tickets);', output: "2\n", declared: ["tickets"], printed: ["tickets"], question: "لماذا رُفض تعريف tickets هنا؟", options: ["عدد التذاكر لا يمكن أن يكون 2", "القيمة \"2\" نص، والمتغير نوعه int", "اسم tickets طويل"], correct: 1, explanation: "إزالة التنصيص تجعل 2 قيمة عددية مناسبة لـ int. التحويل من نص لرقم موضوع لاحق." },
    transfer: { task: "يا كمبيوتر، احفظ عدد الكتب 7 في متغير int اسمه books، ثم اطبع قيمته.", solution: 'int books = 7;\nConsole.WriteLine(books);', output: "7\n", declared: ["books"], printed: ["books"] }
  },
  {
    slug: "assignment-update", title: "حدّث قيمة المتغير الموجود", reference: refs.variables,
    scene: "كان الحجز لتذكرتين ثم أصبح لثلاث. سنحتفظ بالاسم نفسه ونبدل القيمة داخله.",
    concept: "بعد تعريف المتغير يمكن تحديثه بكتابة اسمه = القيمة الجديدة. لا نعيد int لأننا نحدث المتغير الموجود. الطباعة السابقة لا تتغير بأثر رجعي.",
    why: "حالة البرنامج تتغير مع الاستخدام: عدد تذاكر أو رصيد أو كمية. الإسناد يسجل الحالة الجديدة في المتغير نفسه.",
    mechanics: "يُنشأ tickets مرة واحدة. الطباعة الأولى تقرأ 2. بعد tickets = 3 تصبح القيمة الحالية 3، فتطبعها القراءة التالية. تبقى المخرجات السابقة 2.",
    breakdown: ["int tickets = 2;: تعريف أولي.", "Console.WriteLine(tickets);: اطبع القيمة وقت وصول التنفيذ لهذا الأمر.", "tickets = 3;: تحديث الموجود، بلا إعادة النوع.", "الاسم ثابت أثناء هذه الخطوات، والقيمة تتغير."],
    code: 'int tickets = 2;\nConsole.WriteLine(tickets);\ntickets = 3;\nConsole.WriteLine(tickets);',
    build: { task: "يا كمبيوتر، عرّف tickets بقيمة 2 واطبعه، ثم حدّثه إلى 3 واطبعه مرة أخرى.", output: "2\n3\n", declared: ["tickets"], printed: ["tickets"], updated: ["tickets"], rule: "التعريف ينشئ المتغير، والإسناد التالي يحدّثه. كل قراءة تستخدم القيمة وقت تنفيذها.", attention: "تابع قيمة tickets قبل الإسناد وبعده، ولا تغيّر سطر الطباعة الأول.", help: "استخدم int مرة واحدة، ثم tickets = 3; بين أمرَي الطباعة." },
    edit: { task: "يا كمبيوتر، غيّر التحديث الأخير ليصبح tickets = 5. اترك القيمة الأولية 2.", solution: 'int tickets = 2;\nConsole.WriteLine(tickets);\ntickets = 5;\nConsole.WriteLine(tickets);', output: "2\n5\n", declared: ["tickets"], printed: ["tickets"], updated: ["tickets"], values: { tickets: 5 }, attention: "يوجد فرق بين القيمة عند الإنشاء والقيمة في أمر التحديث." },
    experiment: { task: "يا كمبيوتر، اختر قيمة تحديث أخرى، وراقب أن الطباعة الأولى ما زالت تمثل القيمة القديمة.", solution: 'int tickets = 2;\nConsole.WriteLine(tickets);\ntickets = 6;\nConsole.WriteLine(tickets);', declared: ["tickets"], printed: ["tickets"], updated: ["tickets"] },
    bug: { broken: 'int tickets = 2;\nint tickets = 3;\nConsole.WriteLine(tickets);', fixed: 'int tickets = 2;\ntickets = 3;\nConsole.WriteLine(tickets);', output: "3\n", declared: ["tickets"], printed: ["tickets"], updated: ["tickets"], question: "الهدف تحديث tickets. لماذا رُفض السطر الثاني؟", options: ["لا يمكن تغيير أي متغير", "القيمة 3 نص", "أُعيد تعريف الاسم نفسه بدل تحديث المتغير الموجود"], correct: 2, explanation: "نزيل int من السطر الثاني، ونستخدم tickets = 3; لتحديث المتغير الموجود." },
    transfer: { task: "يا كمبيوتر، عرّف books بقيمة 4 واطبعها، ثم حدّث books إلى 6 واطبعها. نريد رؤية الحالتين.", solution: 'int books = 4;\nConsole.WriteLine(books);\nbooks = 6;\nConsole.WriteLine(books);', output: "4\n6\n", declared: ["books"], printed: ["books"], updated: ["books"] }
  },
  {
    slug: "calculate-value", title: "احسب القيمة ثم احفظ الناتج", reference: refs.arithmetic,
    scene: "سعر التذكرة 10 وعدد التذاكر 2. بدل كتابة الإجمالي يدويًا، نريد من الكمبيوتر حسابه.",
    concept: "الطرف الأيمن من الإسناد يُحسب أولًا. في int total = price * tickets; يقرأ الكمبيوتر القيمتين ويضربهما ثم يحفظ الناتج في total.",
    why: "كتابة علاقة الحساب تجعل البرنامج يحسب الإجمالي عند تغيير المدخلات، بدل أن نعدّل الإجمالي يدويًا كل مرة.",
    mechanics: "عندما يصل التنفيذ إلى تعريف total تُقرأ قيم price وtickets الحالية. الناتج المحفوظ قيمة محسوبة وقتها، وليس رابطًا يتحدث تلقائيًا عند تغيير المتغيرات لاحقًا.",
    breakdown: ["price: قيمة سعر التذكرة.", "tickets: عدد التذاكر.", "*: عملية الضرب.", "total = ...: احسب اليمين أولًا ثم احفظ الناتج يسارًا."],
    code: 'int price = 10;\nint tickets = 2;\nint total = price * tickets;\nConsole.WriteLine(total);',
    build: { task: "يا كمبيوتر، احفظ price = 10 وtickets = 2، ثم احسب حاصل ضربهما داخل total واطبع total.", output: "20\n", declared: ["price", "tickets", "total"], printed: ["total"], operation: "*", cases: [{ inputs: { tickets: 3 }, output: "30\n" }], rule: "نحسب التعبير الموجود على يمين = قبل حفظ الناتج في المتغير على يسارها.", attention: "تابع انتقال قيم السعر والعدد إلى عملية الضرب ثم إلى total.", help: "اجعل تعريف total يستخدم price * tickets بدل كتابة 20 مباشرة." },
    edit: { task: "يا كمبيوتر، غيّر عدد التذاكر في البداية إلى 3 فقط. اترك معادلة total كما هي ليصبح الإجمالي 30.", solution: 'int price = 10;\nint tickets = 3;\nint total = price * tickets;\nConsole.WriteLine(total);', output: "30\n", declared: ["price", "tickets", "total"], printed: ["total"], operation: "*", cases: [{ inputs: { tickets: 4 }, output: "40\n" }], attention: "غيّر المدخل، ثم دع نفس معادلة الحساب تنتج الإجمالي الجديد." },
    experiment: { task: "يا كمبيوتر، غيّر السعر أو العدد من اختيارك، واطبع حاصل ضرب القيمتين باستخدام total.", solution: 'int price = 12;\nint tickets = 3;\nint total = price * tickets;\nConsole.WriteLine(total);', declared: ["price", "tickets", "total"], printed: ["total"], operation: "*" },
    bug: { broken: 'int price = 10;\nint tickets = 2;\nint total = 20;\nConsole.WriteLine(total);', fixed: 'int price = 10;\nint tickets = 2;\nint total = price * tickets;\nConsole.WriteLine(total);', output: "20\n", declared: ["price", "tickets", "total"], printed: ["total"], operation: "*", cases: [{ inputs: { tickets: 4 }, output: "40\n" }], question: "الناتج الآن 20، لكننا نريد أن يحسب الإجمالي عند تغيير العدد. ما المشكلة؟", options: ["total يحمل 20 مكتوبة يدويًا بدل حساب السعر × العدد", "لا يمكن ضرب متغيرين", "يجب وضع price بين تنصيص"], correct: 0, explanation: "الناتج الصحيح لمثال واحد لا يكفي. نجعل total يعتمد على price * tickets ونختبر عددًا مختلفًا." },
    transfer: { task: "يا كمبيوتر، احفظ bookPrice = 8 وbooks = 4، واحسب حاصل ضربهما في total ثم اطبعه. سيُختبر الحل بعدد كتب آخر أيضًا.", solution: 'int bookPrice = 8;\nint books = 4;\nint total = bookPrice * books;\nConsole.WriteLine(total);', output: "32\n", declared: ["bookPrice", "books", "total"], printed: ["total"], operation: "*", cases: [{ inputs: { books: 5 }, output: "40\n" }, { inputs: { bookPrice: 10 }, output: "40\n" }] }
  },
  {
    slug: "first-ticket", title: "تطبيق الوحدة: بطاقة حجز صغيرة", reference: refs.structure,
    scene: "نجمع ما طبقناه في بطاقة بسيطة: اسم العميل، عدد التذاكر، والإجمالي المحسوب. كل معلومة تظهر في سطر.",
    concept: "نكتب مدخلات صغيرة في متغيرات، نحسب الإجمالي، ثم نطبع النتائج بالترتيب. كل جزء يستخدم فكرة سبق تطبيقها في درس مستقل.",
    why: "التطبيق يجمع تخزين القيمة والحساب والإخراج في ناتج واحد يمكن تجربته بمدخلات مختلفة.",
    mechanics: "التعريفات تسبق القراءة، ثم تُحسب قيمة total، وبعدها تقرأ أوامر الطباعة القيم الحالية بالترتيب. نغير عدد التذاكر لاختبار اعتماد الإجمالي عليه.",
    breakdown: ["customer يحمل اسم العميل كنص.", "tickets وprice يحملان عددين صحيحين.", "total يُحسب من tickets * price.", "ثلاثة أوامر طباعة تعرض الاسم والعدد والإجمالي."],
    code: 'string customer = "أحمد";\nint tickets = 2;\nint price = 10;\nint total = tickets * price;\nConsole.WriteLine(customer);\nConsole.WriteLine(tickets);\nConsole.WriteLine(total);',
    build: { task: "يا كمبيوتر، أنشئ customer = «أحمد»، وtickets = 2، وprice = 10. احسب total بضرب العدد في السعر. اطبع الاسم، ثم العدد، ثم الإجمالي، كل قيمة في سطر.", output: "أحمد\n2\n20\n", declared: ["customer", "tickets", "price", "total"], printed: ["customer", "tickets", "total"], operation: "*", cases: [{ inputs: { tickets: 3 }, output: "أحمد\n3\n30\n" }], rule: "المتغيرات تحفظ المدخلات، وعملية الضرب تنتج الإجمالي، والطباعة تستخدم القيم المحفوظة.", attention: "امشِ مع البرنامج: مدخلات، ثم حساب، ثم مخرجات.", help: "عرّف المتغيرات أولًا، ثم total = tickets * price، وبعدها اطبع القيم الثلاث بأسمائها." },
    edit: { task: "يا كمبيوتر، اجعل عدد التذاكر 3 في بداية البرنامج. نريد أحمد، ثم 3، ثم 30، دون تغيير معادلة الإجمالي.", solution: 'string customer = "أحمد";\nint tickets = 3;\nint price = 10;\nint total = tickets * price;\nConsole.WriteLine(customer);\nConsole.WriteLine(tickets);\nConsole.WriteLine(total);', output: "أحمد\n3\n30\n", declared: ["customer", "tickets", "price", "total"], printed: ["customer", "tickets", "total"], operation: "*", cases: [{ inputs: { price: 12 }, output: "أحمد\n3\n36\n" }], attention: "غيّر قيمة tickets عند التعريف، واترك الحساب يعتمد عليها." },
    experiment: { task: "يا كمبيوتر، اصنع بطاقة باسم أو عدد أو سعر من اختيارك. اطبع المتغيرات واجعل total يحسب حاصل الضرب.", solution: 'string customer = "سارة";\nint tickets = 4;\nint price = 12;\nint total = tickets * price;\nConsole.WriteLine(customer);\nConsole.WriteLine(tickets);\nConsole.WriteLine(total);', declared: ["customer", "tickets", "price", "total"], printed: ["customer", "tickets", "total"], operation: "*" },
    bug: { broken: 'int tickets = 2;\nint price = 10;\nint total = tickets * price;\ntickets = 3;\nConsole.WriteLine(total);', fixed: 'int tickets = 2;\nint price = 10;\ntickets = 3;\nint total = tickets * price;\nConsole.WriteLine(total);', output: "30\n", declared: ["tickets", "price", "total"], printed: ["total"], operation: "*", question: "أصبح tickets يساوي 3، لكن total ما زال يطبع 20. لماذا؟", options: ["الضرب لا يعمل بعد تغيير العدد", "total حُسب قبل تحديث tickets ولم يُحسب مرة أخرى", "WriteLine يعرض القيمة القديمة دائمًا"], correct: 1, explanation: "الإسناد يحفظ ناتج الحساب وقت تنفيذه. ننقل حساب total بعد التحديث، أو نعيد حسابه بعد التحديث." },
    transfer: { task: "يا كمبيوتر، اصنع بطاقة باسم customer = «منى»، وعدد tickets = 4، وسعر price = 15. احسب total واطبع الاسم ثم العدد ثم الإجمالي. نريد منى، ثم 4، ثم 60. سيُجرَّب سعر وعدد مختلفان أيضًا.", solution: 'string customer = "منى";\nint tickets = 4;\nint price = 15;\nint total = tickets * price;\nConsole.WriteLine(customer);\nConsole.WriteLine(tickets);\nConsole.WriteLine(total);', output: "منى\n4\n60\n", declared: ["customer", "tickets", "price", "total"], printed: ["customer", "tickets", "total"], operation: "*", cases: [{ inputs: { tickets: 2 }, output: "منى\n2\n30\n" }, { inputs: { price: 20 }, output: "منى\n4\n80\n" }] }
  }
];

const { makeLesson } = require("./lesson-builder.cjs");
const data = { schemaVersion: "1.0.0", track: "csharp", title: "الوحدة الأولى: أول برنامج وقيمه", description: "أول برنامج، ترتيب التنفيذ، الطباعة، تخزين القيم وتحديثها، وحساب بطاقة صغيرة.", totalLessons: lessons.length, runtime: "csharp-foundations-subset-v2", lessons: lessons.map((c,index) => makeLesson(c,index,index ? "csharp-"+String(index).padStart(2,"0")+"-"+lessons[index-1].slug : null,"first-programs")) };
module.exports = { data };
if(require.main === module) {
  fs.writeFileSync(path.join(__dirname,"unit_01_first_programs.json"),JSON.stringify(data,null,2)+"\n");
  console.log("Wrote the first C# unit. Use npm run curriculum:csharp to regenerate the full course.");
}

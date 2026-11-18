// Original examples and exercises reviewed against the linked C# reference pages.
const { makeLesson } = require('./lesson-builder.cjs');
const previousUnit = require('./author-unit-02.cjs').data;
const reference = {
  comparison: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators',
  logic: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators',
  selection: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements'
};

const boolText = value => value ? 'True\n' : 'False\n';
const boolCases = examples => examples.map(([inputs, expected]) => ({ inputs, output: boolText(expected) }));
const examples = rows => rows.map(([inputs, message]) => ({ inputs, output: message + '\n' }));
const scene = (first, second, third) => [first, second, third].map(([label, text]) => ({ label, text }));
function predicate(inputLines, target, expression) {
  return [...inputLines, `bool ${target} = ${expression};`, `Console.WriteLine(${target});`].join('\n');
}
function boolTask({ task, solution, expected, target, inputs, operator, cases = [], ...hints }) {
  return {
    task: 'يا كمبيوتر، ' + task,
    solution,
    output: boolText(expected),
    declared: [...inputs, target],
    printed: [target],
    operation: operator,
    operationIn: target,
    cases: boolCases(cases),
    ...hints
  };
}
function decisionTask({ task, solution, expected, inputs, reads = inputs, cases, ...hints }) {
  return {
    task: 'يا كمبيوتر، ' + task,
    solution,
    output: expected + '\n',
    declared: inputs,
    branching: true,
    elseRequired: true,
    elseIfRequired: true,
    conditionReads: reads,
    cases: examples(cases),
    ...hints
  };
}

const smallOrder = (tickets, operator = '<') => predicate([`int tickets = ${tickets};`], 'isSmall', `tickets ${operator} 5`);
const fits = (boxes, operator = '<=') => predicate([`int boxes = ${boxes};`], 'fits', `boxes ${operator} 4`);
const allow = (isBlocked, expression = '!isBlocked') => predicate([`bool isBlocked = ${isBlocked};`], 'canEnter', expression);
const reserve = (open, seat, operator = '&&') => predicate([`bool isOpen = ${open};`, `bool hasSeat = ${seat};`], 'canReserve', `isOpen ${operator} hasSeat`);
const permit = (ticket, pass, operator = '||') => predicate([`bool hasTicket = ${ticket};`, `bool hasPass = ${pass};`], 'canEnter', `hasTicket ${operator} hasPass`);

const smallCases = [[{ tickets: 4 }, true], [{ tickets: 5 }, false], [{ tickets: 6 }, false]];
const fitCases = [[{ boxes: 3 }, true], [{ boxes: 4 }, true], [{ boxes: 5 }, false]];
const negationCases = [[{ isBlocked: true }, false], [{ isBlocked: false }, true]];
const reserveCases = [
  [{ isOpen: true, hasSeat: true }, true], [{ isOpen: true, hasSeat: false }, false],
  [{ isOpen: false, hasSeat: true }, false], [{ isOpen: false, hasSeat: false }, false]
];
const permitCases = [
  [{ hasTicket: true, hasPass: true }, true], [{ hasTicket: true, hasPass: false }, true],
  [{ hasTicket: false, hasPass: true }, true], [{ hasTicket: false, hasPass: false }, false]
];

const delayCases = [[{ minutes: 0 }, 'في الموعد'], [{ minutes: 5 }, 'تأخير قصير'], [{ minutes: 6 }, 'تأخير طويل']];
function delay(minutes, secondClause = 'else if') {
  return `int minutes = ${minutes};
if (minutes == 0)
{
    Console.WriteLine("في الموعد");
}
${secondClause} (minutes <= 5)
{
    Console.WriteLine("تأخير قصير");
}
else
{
    Console.WriteLine("تأخير طويل");
}`;
}

const ratingCases = [[{ score: 59 }, 'حاول مرة أخرى'], [{ score: 60 }, 'ناجح'], [{ score: 89 }, 'ناجح'], [{ score: 90 }, 'ممتاز'], [{ score: 95 }, 'ممتاز']];
function rating(score, wideFirst = false) {
  const top = wideFirst ? [60, 'ناجح'] : [90, 'ممتاز'];
  const middle = wideFirst ? [90, 'ممتاز'] : [60, 'ناجح'];
  return `int score = ${score};
if (score >= ${top[0]})
{
    Console.WriteLine("${top[1]}");
}
else if (score >= ${middle[0]})
{
    Console.WriteLine("${middle[1]}");
}
else
{
    Console.WriteLine("حاول مرة أخرى");
}`;
}

const reservationCases = [
  [{ seats: 0, isPaid: true, hasPass: true }, 'راجع عدد المقاعد'],
  [{ seats: 0, isPaid: false, hasPass: false }, 'راجع عدد المقاعد'],
  [{ seats: 3, isPaid: false, hasPass: true }, 'انتظر الدفع'],
  [{ seats: 2, isPaid: true, hasPass: false }, 'حجز عادي'],
  [{ seats: 3, isPaid: true, hasPass: false }, 'حجز مميز'],
  [{ seats: 1, isPaid: true, hasPass: true }, 'حجز مميز']
];
function reservation(seats, isPaid = true, hasPass = false, operator = '||') {
  return `int seats = ${seats};
bool isPaid = ${isPaid};
bool hasPass = ${hasPass};
if (seats <= 0)
{
    Console.WriteLine("راجع عدد المقاعد");
}
else if (!isPaid)
{
    Console.WriteLine("انتظر الدفع");
}
else if (seats >= 3 ${operator} hasPass)
{
    Console.WriteLine("حجز مميز");
}
else
{
    Console.WriteLine("حجز عادي");
}`;
}

const lessons = [
  {
    slug: 'less-than', title: 'هل العدد أصغر من الحد؟', reference: reference.comparison,
    scene: 'في تجربة الحجز، الطلب الصغير فيه أقل من ٥ تذاكر. معانا ٤ تذاكر وعايزين نعرف هل الطلب صغير.',
    sceneVisual: scene(['الطلب', '٤ تذاكر'], ['السؤال', 'أقل من ٥؟'], ['الإجابة', 'نعم']),
    concept: 'استخدم < لما يكون المطلوب «أقل من». المقارنة tickets < 5 تُجيب true عند 4 وتُجيب false عند 5 وعند 6.',
    why: 'تقدر تفرّق بين الطلب اللي تحت الحد والطلب اللي وصل للحد نفسه.',
    mechanics: 'اقرأ tickets، قارنه بالحد 5، واحفظ الإجابة في isSmall. بعدها اطبع القيمة المحفوظة.',
    breakdown: ['اقرأ العدد الذي على اليسار.', 'اسأل هل العدد أقل من الحد الذي على اليمين.', 'احفظ إجابة bool ثم اطبعها.'],
    code: smallOrder(4),
    build: boolTask({ task: 'احفظ tickets = 4، واحسب isSmall من tickets < 5، ثم اطبع isSmall.', solution: smallOrder(4), expected: true, target: 'isSmall', inputs: ['tickets'], operator: '<', cases: smallCases,
      attention: 'حدّد العدد الحالي والحد قبل كتابة المقارنة.', rule: 'المعامل < يستبعد حالة التساوي.', help: 'خلي tickets على اليسار و5 على اليمين، واحفظ الإجابة في bool باسم isSmall.' }),
    edit: boolTask({ task: 'غيّر tickets وحده إلى 5. راقب نتيجة المقارنة عند التساوي.', solution: smallOrder(5), expected: false, target: 'isSmall', inputs: ['tickets'], operator: '<', cases: smallCases }),
    experiment: boolTask({ task: 'جرّب ٣ تذاكر مع نفس الحد، ثم اطبع نتيجة isSmall.', solution: smallOrder(3), expected: true, target: 'isSmall', inputs: ['tickets'], operator: '<', cases: smallCases }),
    bug: { ...boolTask({ task: 'أصلح المقارنة عند حد ٥.', solution: smallOrder(5), expected: false, target: 'isSmall', inputs: ['tickets'], operator: '<', cases: smallCases }),
      broken: smallOrder(5, '<='), fixed: smallOrder(5), question: 'طلب من ٥ تذاكر ظهر كطلب صغير. أي تعديل يستبعد التساوي؟', options: ['استخدم < مع نفس الحد 5', 'اترك <= واطبع tickets', 'غيّر العدد إلى 4'], correct: 0, explanation: 'اكتب < قبل الحد 5. عند التساوي ستكون الإجابة false.' },
    transfer: boolTask({ task: 'خزّن age = 17. احسب isJunior من age < 18 واطبعه. جرّب الحد 18 أيضًا.', solution: predicate(['int age = 17;'], 'isJunior', 'age < 18'), expected: true, target: 'isJunior', inputs: ['age'], operator: '<', cases: [[{ age: 18 }, false], [{ age: 19 }, false], [{ age: 16 }, true]], help: 'اكتب المقارنة age < 18 داخل تصريح isJunior، ثم اطبع isJunior.' })
  },
  {
    slug: 'at-most', title: 'هل العدد في حدود السعة؟', reference: reference.comparison,
    scene: 'رف يشيل ٤ صناديق. لو حطّينا ٤ بالضبط، هنستخدم كل المساحة المتاحة.',
    sceneVisual: scene(['السعة', '٤ صناديق'], ['الطلب', '٤ صناديق'], ['النتيجة', 'يكفي الرف']),
    concept: 'المعامل <= يقبل العدد الأصغر من الحد والعدد المساوي له. في مثال الرف، 3 و4 يناسبان السعة. عند 5 تصبح الإجابة false.',
    why: 'قاعدة «بحد أقصى» تشمل قيمة الحد نفسها.',
    mechanics: 'عند boxes = 4 يقرأ الكمبيوتر 4 <= 4 ويحفظ true في fits. بدّل عدد الصناديق لمشاهدة الحالة خارج الحد.',
    breakdown: ['السعة حد أقصى.', 'جرّب أقل من السعة ثم السعة نفسها ثم أكبر منها.', 'احفظ النتيجة واطبعها باسم fits.'],
    code: fits(4),
    build: boolTask({ task: 'احفظ boxes = 4، واحسب fits من boxes <= 4 واطبعه.', solution: fits(4), expected: true, target: 'fits', inputs: ['boxes'], operator: '<=', cases: fitCases,
      attention: 'تصوّر آخر مكان فاضي على الرف. هل الصندوق الرابع له مكان؟', rule: 'عند «بحد أقصى» استخدم <= علشان التساوي يدخل في الشرط.', help: 'احفظ إجابة boxes <= 4 في fits من النوع bool.' }),
    edit: boolTask({ task: 'غيّر boxes إلى 5 وحده. شاهد نتيجة تجاوز السعة.', solution: fits(5), expected: false, target: 'fits', inputs: ['boxes'], operator: '<=', cases: fitCases }),
    experiment: boolTask({ task: 'جرّب ٣ صناديق على نفس الرف، واطبع fits.', solution: fits(3), expected: true, target: 'fits', inputs: ['boxes'], operator: '<=', cases: fitCases }),
    bug: { ...boolTask({ task: 'اسمح بالعدد المساوي للسعة.', solution: fits(4), expected: true, target: 'fits', inputs: ['boxes'], operator: '<=', cases: fitCases }),
      broken: fits(4, '<'), fixed: fits(4), question: 'الرف رفض ٤ صناديق بسبب boxes < 4. إزاي نقبل الـ٤ بالضبط؟', options: ['زوّد قيمة boxes', 'اختبر بـ <=', 'حوّل fits إلى نص'], correct: 1, explanation: 'أضف علامة المساواة للمقارنة. 4 <= 4 نتيجتها true.' },
    transfer: boolTask({ task: 'خزّن weight = 10. احسب isAllowed من weight <= 10 واطبعه. راجع ما يحدث عند 9 و11.', solution: predicate(['int weight = 10;'], 'isAllowed', 'weight <= 10'), expected: true, target: 'isAllowed', inputs: ['weight'], operator: '<=', cases: [[{ weight: 9 }, true], [{ weight: 10 }, true], [{ weight: 11 }, false]], help: 'خلي الوزن على اليسار. قارن بالحد 10 مستخدمًا <=، ثم اطبع isAllowed.' })
  },
  {
    slug: 'logical-not', title: 'اعكس حالة منطقية باستخدام !', reference: reference.logic,
    scene: 'الباب عليه حالة واحدة اسمها «مغلق». المطلوب نحفظ إجابة سؤال تاني. هل الدخول متاح؟',
    sceneVisual: scene(['الحالة', 'الباب مغلق'], ['السؤال', 'الدخول متاح؟'], ['الإجابة', 'لا']),
    concept: 'المعامل ! يعكس قيمة bool. لو isBlocked تساوي true، فإن !isBlocked تُقيّم إلى false. تظل قيمة isBlocked الأصلية محفوظة.',
    why: 'اسم الحالة قد يعبّر عن المنع، بينما قرارك يحتاج إجابة عن السماح.',
    mechanics: 'اقرأ isBlocked، اعكس الإجابة باستخدام !، واحفظها في canEnter. قارن القيمتين بعد التنفيذ.',
    breakdown: ['المعامل ! يظهر قبل قيمة منطقية.', 'true تتحول إلى false، وfalse تتحول إلى true.', 'احفظ الإجابة الجديدة في canEnter.'],
    code: allow(true),
    build: boolTask({ task: 'احفظ isBlocked = true. احسب canEnter من !isBlocked واطبعه.', solution: allow(true), expected: false, target: 'canEnter', inputs: ['isBlocked'], operator: '!', cases: negationCases,
      attention: 'اقرأ معنى isBlocked قبل توقع إجابة canEnter.', rule: 'ضع ! قبل القيمة المنطقية لتعكسها.', help: 'احسب bool canEnter = !isBlocked ثم اطبع canEnter.' }),
    edit: boolTask({ task: 'غيّر isBlocked إلى false وحده. راقب نتيجة !isBlocked.', solution: allow(false), expected: true, target: 'canEnter', inputs: ['isBlocked'], operator: '!', cases: negationCases }),
    experiment: boolTask({ task: 'جرّب تفعيل المنع من جديد باستخدام isBlocked = true. اطبع canEnter ولاحظ الإجابة.', solution: allow(true), expected: false, target: 'canEnter', inputs: ['isBlocked'], operator: '!', cases: negationCases }),
    bug: { ...boolTask({ task: 'أصلح اتجاه الإجابة عن الدخول.', solution: allow(true), expected: false, target: 'canEnter', inputs: ['isBlocked'], operator: '!', cases: negationCases }),
      broken: allow(true, 'isBlocked'), fixed: allow(true), question: 'المنع مفعّل والبرنامج يسمح بالدخول. أين نضع !؟', options: ['بعد Console.WriteLine', 'بعد اسم canEnter', 'قبل isBlocked في تعبير الإسناد'], correct: 2, explanation: 'اكتب !isBlocked علشان canEnter تعكس حالة المنع.' },
    transfer: boolTask({ task: 'احفظ isFull = false. احسب canAdd من !isFull واطبعه.', solution: predicate(['bool isFull = false;'], 'canAdd', '!isFull'), expected: true, target: 'canAdd', inputs: ['isFull'], operator: '!', cases: [[{ isFull: true }, false], [{ isFull: false }, true]], help: 'اجعل canAdd تساوي !isFull ثم اطبعها.' })
  },
  {
    slug: 'logical-and', title: 'اشترط تحقق الأمرين باستخدام &&', reference: reference.logic,
    scene: 'الحجز يتطلب مكتبًا مفتوحًا ومقعدًا متاحًا. المكتب مغلق اليوم، فأول فحص كفاية لحسم الإجابة.',
    sceneVisual: scene(['الفحص الأول', 'المكتب مفتوح؟ لا'], ['الفحص الثاني', 'هل يوجد مقعد؟'], ['الحجز', 'يتوقف عند أول فحص']),
    concept: 'مع && نحتاج true من الطرفين. احسب الأول. لو كان false، تكون الإجابة false فورًا. لو كان true، احسب الطرف الثاني.',
    why: 'تقدر تجمع متطلبين لحجز واحد. وتقدر تفحص شرطًا لازمًا قبل عملية تعتمد عليه.',
    mechanics: 'في اللقطة الأولى للمقارنة المنطقية، isOpen قيمتها false. هتشوف hasSeat مكتوبة في الكود وعليها «لم يُحسب»، ثم تظهر نتيجة الحجز false.',
    breakdown: ['&& تعني أن الشرطين مطلوبان.', 'الطرف الأيسر يُقيّم أولًا.', 'إذا كانت نتيجته false، يتخطى الكمبيوتر الطرف الأيمن.'],
    code: reserve(false, true),
    build: boolTask({ task: 'احفظ isOpen = false وhasSeat = true. احسب canReserve من isOpen && hasSeat واطبعه.', solution: reserve(false, true), expected: false, target: 'canReserve', inputs: ['isOpen', 'hasSeat'], operator: '&&', cases: reserveCases,
      attention: 'ابدأ من حالة المكتب. هل نحتاج معرفة حالة المقعد لو المكتب مغلق؟', rule: 'مع && يجب أن تكون القيمتان true.', help: 'اكتب isOpen && hasSeat كقيمة canReserve من النوع bool ثم اطبعها.' }),
    edit: boolTask({ task: 'افتح المكتب بتغيير isOpen إلى true وحده. راقب قراءة الطرف الأيمن.', solution: reserve(true, true), expected: true, target: 'canReserve', inputs: ['isOpen', 'hasSeat'], operator: '&&', cases: reserveCases }),
    experiment: boolTask({ task: 'أبقِ المكتب مفتوحًا وغيّر hasSeat إلى false. شاهد الإجابة بعد فحص الطرفين.', solution: reserve(true, false), expected: false, target: 'canReserve', inputs: ['isOpen', 'hasSeat'], operator: '&&', cases: reserveCases }),
    bug: { ...boolTask({ task: 'طبّق قاعدة المكتب والمقعد معًا.', solution: reserve(false, true), expected: false, target: 'canReserve', inputs: ['isOpen', 'hasSeat'], operator: '&&', cases: reserveCases }),
      broken: reserve(false, true, '||'), fixed: reserve(false, true), question: 'المكتب مغلق ومع ذلك طلع الحجز متاح. أي رمز يطلب تحقق الشرطين معًا؟', options: ['&&', '||', '=='], correct: 0, explanation: 'استبدل || بـ &&. وجود مقعد وحده لا يكفي للحجز.' },
    transfer: boolTask({ task: 'خزّن tickets = 3 وtotal = 30. احسب isEnough من tickets > 0 && total / tickets >= 10، ثم اطبعه. لما tickets = 0، لازم يتخطّى البرنامج القسمة.', solution: predicate(['int tickets = 3;', 'int total = 30;'], 'isEnough', 'tickets > 0 && total / tickets >= 10'), expected: true, target: 'isEnough', inputs: ['tickets', 'total'], operator: '&&', cases: [[{ tickets: 0 }, false], [{ tickets: 4 }, false], [{ tickets: 3, total: 33 }, true]], help: 'اكتب فحص العدد الموجب قبل &&. القسمة والمقارنة بالحد 10 تأتيان بعده.' })
  },
  {
    slug: 'logical-or', title: 'اقبل أحد الخيارين باستخدام ||', reference: reference.logic,
    scene: 'الدخول مسموح بتذكرة أو بتصريح. معانا تذكرة بالفعل، ونقدر نقرر الدخول من أول فحص.',
    sceneVisual: scene(['الفحص الأول', 'معاه تذكرة'], ['الفحص الثاني', 'معاه تصريح؟'], ['الدخول', 'يكفي إثبات واحد']),
    concept: 'مع || يكفي أن تكون قيمة واحدة true. لو الطرف الأيسر true، تكون النتيجة true ويُتخطى الطرف الأيمن. لو الأيسر false، نحتاج حساب الطرف الأيمن. لو الاتنين true تظل النتيجة true.',
    why: 'تستخدمها لما تكون محتاج تقبل أكثر من طريق لنفس النتيجة.',
    mechanics: 'في المثال hasTicket تساوي true. التتبّع يبيّن إن hasPass لم تُحسب داخل هذا التعبير. عند إزالة التذكرة نقرأ قيمة التصريح.',
    breakdown: ['|| تقبل true من أي طرف.', 'افحص الطرف الأيسر أولًا.', 'لو الأيسر true، انتهت المقارنة المنطقية.'],
    code: permit(true, false),
    build: boolTask({ task: 'احفظ hasTicket = true وhasPass = false. احسب canEnter من hasTicket || hasPass واطبعه.', solution: permit(true, false), expected: true, target: 'canEnter', inputs: ['hasTicket', 'hasPass'], operator: '||', cases: permitCases,
      attention: 'فكّر في حامل التذكرة من غير تصريح. هل يُسمح له بالدخول؟', rule: 'مع || يكفي تحقق شرط واحد.', help: 'احفظ نتيجة hasTicket || hasPass في canEnter ثم اطبعها.' }),
    edit: boolTask({ task: 'غيّر hasTicket إلى false واترك hasPass = false. هنا الكمبيوتر يحتاج يقرأ الطرف الثاني.', solution: permit(false, false), expected: false, target: 'canEnter', inputs: ['hasTicket', 'hasPass'], operator: '||', cases: permitCases }),
    experiment: boolTask({ task: 'أبقِ hasTicket = false وأضف تصريحًا بتغيير hasPass إلى true. راقب نتيجة تقييم الطرف الثاني.', solution: permit(false, true), expected: true, target: 'canEnter', inputs: ['hasTicket', 'hasPass'], operator: '||', cases: permitCases }),
    bug: { ...boolTask({ task: 'اسمح بالدخول بالتصريح فقط.', solution: permit(false, true), expected: true, target: 'canEnter', inputs: ['hasTicket', 'hasPass'], operator: '||', cases: permitCases }),
      broken: permit(false, true, '&&'), fixed: permit(false, true), question: 'الزبون معاه تصريح وحده. البرنامج رفضه لأنه اشترط التذكرة أيضًا. أي تعديل يكفي؟', options: ['غيّر النص المطبوع', 'استخدم || بين الحالتين', 'اطبع hasTicket وحده'], correct: 1, explanation: 'استخدم || علشان أي إثبات من الاتنين يكفي للدخول.' },
    transfer: boolTask({ task: 'احفظ isMember = false وhasCoupon = true. احسب getsOffer من isMember || hasCoupon واطبعه.', solution: predicate(['bool isMember = false;', 'bool hasCoupon = true;'], 'getsOffer', 'isMember || hasCoupon'), expected: true, target: 'getsOffer', inputs: ['isMember', 'hasCoupon'], operator: '||', cases: [[{ isMember: false, hasCoupon: false }, false], [{ isMember: true, hasCoupon: false }, true], [{ isMember: true, hasCoupon: true }, true]], help: 'ضع || بين isMember وhasCoupon داخل تعبير getsOffer.' })
  },
  {
    slug: 'else-if', title: 'افحص شرطًا بديلًا باستخدام else if', reference: reference.selection,
    scene: 'موعد الاستلام له ثلاث رسائل. لو التأخير صفر فالموعد مضبوط. لو التأخير دقائق قليلة هنقول «تأخير قصير».',
    sceneVisual: scene(['صفر دقيقة', 'في الموعد'], ['من ١ إلى ٥', 'تأخير قصير'], ['أكثر من ٥', 'تأخير طويل']),
    concept: 'يبدأ الكمبيوتر بـ if. إذا لم يتحقق شرطها، يفحص else if. أول شرط يتحقق يختار جسمه. تصل إلى else إذا كانت كل الشروط السابقة false.',
    why: 'تقدر تختار رسالة واحدة عندما يكون عندك أكثر من حالتين.',
    mechanics: 'عند 4 دقائق، شرط المساواة بالصفر يعطي false. انتقل إلى السطر الذي يبدأ بـ else if. المقارنة 4 <= 5 تعطي true ثم تُطبع رسالة التأخير القصير.',
    breakdown: ['افحص minutes == 0 أولًا.', 'لو الشرط الأول false، افحص minutes <= 5.', 'الجسم المختار يطبع رسالة واحدة.'],
    code: delay(4),
    build: decisionTask({ task: 'احفظ minutes = 4. اطبع «في الموعد» عند 0، و«تأخير قصير» حتى 5 بعد تجاوز الصفر، و«تأخير طويل» في else.', solution: delay(4), expected: 'تأخير قصير', inputs: ['minutes'], cases: delayCases,
      attention: 'حدّد الحالة التي لازم تُفحص أولًا عند 0 دقائق.', rule: 'else if تُفحص بعد فشل الشرط السابق.', help: 'ابدأ بـ if (minutes == 0)، ثم else if (minutes <= 5)، ثم else.' }),
    edit: decisionTask({ task: 'غيّر minutes إلى 0 فقط. شاهد أن شرط التأخير القصير تم تجاوزه.', solution: delay(0), expected: 'في الموعد', inputs: ['minutes'], cases: delayCases }),
    experiment: decisionTask({ task: 'غيّر minutes إلى 6. شغّل حتى يصل السهم إلى المسار الأخير.', solution: delay(6), expected: 'تأخير طويل', inputs: ['minutes'], cases: delayCases }),
    bug: { ...decisionTask({ task: 'اجعل فحص التأخير مرتبطًا باختيار الموعد.', solution: delay(0), expected: 'في الموعد', inputs: ['minutes'], cases: delayCases }),
      broken: delay(0, 'if'), fixed: delay(0), question: 'ظهر سطران عند التأخير صفرًا. إزاي نخلي الفحص الثاني يحصل فقط عند تجاوز الأول؟', options: ['نزّل الحد إلى 0', 'امسح رسالة في الموعد', 'اكتب else if للسؤال الثاني'], correct: 2, explanation: 'اربط السؤال الثاني بالأول باستخدام else if. عند تحقق الأول يتخطى الكمبيوتر الشروط التالية.' },
    transfer: decisionTask({ task: 'احفظ stock = 2. استخدم if وelse if وelse لطباعة «نفد» عند 0، و«متبقي قليل» عند 1 أو 2، و«متوفر» لأكثر من 2.', solution: 'int stock = 2;\nif (stock == 0)\n{\n    Console.WriteLine("نفد");\n}\nelse if (stock <= 2)\n{\n    Console.WriteLine("متبقي قليل");\n}\nelse\n{\n    Console.WriteLine("متوفر");\n}', expected: 'متبقي قليل', inputs: ['stock'], cases: [[{ stock: 0 }, 'نفد'], [{ stock: 1 }, 'متبقي قليل'], [{ stock: 3 }, 'متوفر']], help: 'افحص الصفر أولًا. بعدها يبقى سؤال stock <= 2 كافيًا للحالتين 1 و2.' })
  },
  {
    slug: 'condition-order', title: 'رتّب الشروط التي تتداخل حدودها', reference: reference.selection,
    scene: 'درجة الطالب ٩٠. هي تحقق «من ٦٠» و«من ٩٠» معًا. الرسالة المطلوبة هي «ممتاز»، فهنحط السؤال المحدد لها الأول.',
    sceneVisual: scene(['الدرجة', '٩٠'], ['شرطان متحققان', '٩٠ أو أكثر، و٦٠ أو أكثر'], ['الترتيب', 'افحص الممتاز أولًا']),
    concept: 'عند تداخل الشروط، الترتيب يغيّر النتيجة. مثلًا 90 تحقق score >= 60 وscore >= 90. ضع شرط 90 أولًا كي يختار الكمبيوتر «ممتاز».',
    why: 'تتوقع أثر ترتيب القواعد قبل كتابة الكود وتختبر الأعداد على الحدود.',
    mechanics: 'قارن 90 بالحد 90. عند true يُنفّذ الجسم الأول ويتجاوز ما بعده. عند 89 يُفحص الحد 60. عند 59 يعمل else.',
    breakdown: ['حد «ممتاز» هو 90 شاملًا.', 'حد «ناجح» هو 60 شاملًا بعد تجاوز الممتاز.', 'جرّب 59 و60 و89 و90، وتأكد أن كل تشغيل يطبع رسالة واحدة.'],
    code: rating(90),
    build: decisionTask({ task: 'احفظ score = 90. افحص ممتاز عند 90 أو أكثر، ثم ناجح عند 60 أو أكثر، وإلا «حاول مرة أخرى».', solution: rating(90), expected: 'ممتاز', inputs: ['score'], cases: ratingCases,
      attention: 'ابدأ بتجربة العدد 90 ذهنيًا على الشرطين.', rule: 'أول شرط يتحقق يحسم الاختيار، فالحد الأعلى يأتي أولًا هنا.', help: 'ضع score >= 90 في if، ثم score >= 60 في else if.' }),
    edit: decisionTask({ task: 'غيّر score من 90 إلى 89 واترك ترتيب الشروط كما هو. تتبّع إلى رسالة ناجح.', solution: rating(89), expected: 'ناجح', inputs: ['score'], cases: ratingCases }),
    experiment: decisionTask({ task: 'اختبر score = 59. شغّل وشوف إمتى يصل التنفيذ إلى else.', solution: rating(59), expected: 'حاول مرة أخرى', inputs: ['score'], cases: ratingCases }),
    bug: { ...decisionTask({ task: 'أعد ترتيب الشرطين.', solution: rating(90), expected: 'ممتاز', inputs: ['score'], cases: ratingCases }),
      broken: rating(90, true), fixed: rating(90), question: 'الكود طبع ناجح عند ٩٠ لأن شرط ٦٠ جاء أولًا. إيه الترتيب اللي يصحح التصنيف؟', options: ['افحص 90 أولًا ثم 60', 'حوّل score إلى string', 'اطبع ممتاز مهما كانت الدرجة'], correct: 0, explanation: 'ضع حد 90 في الأول. شرط 60 يتولى بعده الدرجات من 60 إلى 89.' },
    transfer: decisionTask({ task: 'احفظ total = 100. اطبع «خصم كبير» عند 100 أو أكثر، «خصم صغير» عند 50 إلى 99، و«بدون خصم» فيما عدا ذلك. ابدأ بأعلى حد.', solution: 'int total = 100;\nif (total >= 100)\n{\n    Console.WriteLine("خصم كبير");\n}\nelse if (total >= 50)\n{\n    Console.WriteLine("خصم صغير");\n}\nelse\n{\n    Console.WriteLine("بدون خصم");\n}', expected: 'خصم كبير', inputs: ['total'], cases: [[{ total: 49 }, 'بدون خصم'], [{ total: 50 }, 'خصم صغير'], [{ total: 99 }, 'خصم صغير'], [{ total: 101 }, 'خصم كبير']], help: 'ابدأ بفحص total >= 100، ثم total >= 50 بعده.' })
  },
  {
    slug: 'reservation-decision', title: 'تطبيق قرار الحجز من عدة شروط', reference: reference.selection,
    scene: 'قبل تأكيد الحجز نراجع العدد ثم الدفع. بعدهم نختار حجزًا مميزًا أو عاديًا.',
    sceneVisual: scene(['أولًا', 'راجع عدد المقاعد'], ['بعدها', 'راجع الدفع'], ['أخيرًا', 'اختَر نوع الحجز']),
    concept: 'حوّل قواعد الحجز إلى سلسلة مرتبة. العدد صفر أو أقل يحتاج مراجعة. بعده راجع الدفع. عند عدد موجب ودفع مكتمل، يكفي 3 مقاعد أو تصريح للحصول على حجز مميز.',
    why: 'تجمع المنطق والترتيب في برنامج يرجّع رسالة مفهومة لكل حالة.',
    mechanics: 'عند 3 مقاعد ودفع مكتمل، يصل التنفيذ إلى شرط الحجز المميز. نتيجة الاختبار الأول في || تكفي، فتظهر حالة التصريح كطرف لم يُحسب.',
    breakdown: ['أوقف الاختيار عند أول حالة تتحقق.', 'ضع فحص العدد أولًا وفحص عدم الدفع ثانيًا.', 'استخدم || بين بلوغ 3 مقاعد ووجود تصريح.', 'اكتب الحجز العادي في المسار الأخير.'],
    code: reservation(3),
    build: decisionTask({ task: 'احفظ seats = 3 وisPaid = true وhasPass = false. اطبع «راجع عدد المقاعد» عند seats <= 0، و«انتظر الدفع» عند !isPaid. بعدها اطبع «حجز مميز» إذا seats >= 3 || hasPass، وإلا «حجز عادي».', solution: reservation(3), expected: 'حجز مميز', inputs: ['seats', 'isPaid', 'hasPass'], cases: reservationCases, operation: '||',
      attention: 'ابدأ بمراجعة العدد. اختبر صفر مقاعد مع تصريح صالح، وتوقّع الرسالة الأولى.', rule: 'رتّب الشروط كما ستفحصها في الواقع، واستعمل || عندما يكفي أحد الخيارين.', help: 'اكتب if للعدد ثم else if للدفع ثم else if للحجز المميز وإنهها بـ else.' }),
    edit: decisionTask({ task: 'غيّر seats إلى 2 فقط. الكود هيوصل إلى الحجز العادي لأن العدد لم يصل إلى 3 والتصريح غير موجود.', solution: reservation(2), expected: 'حجز عادي', inputs: ['seats', 'isPaid', 'hasPass'], cases: reservationCases, operation: '||' }),
    experiment: decisionTask({ task: 'اترك العدد 2 والدفع مكتملًا. ضع hasPass = true وشاهد تأثير التصريح وحده.', solution: reservation(2, true, true), expected: 'حجز مميز', inputs: ['seats', 'isPaid', 'hasPass'], cases: reservationCases, operation: '||' }),
    bug: { ...decisionTask({ task: 'صحّح شرط الحجز المميز بحيث يكفي التصريح وحده.', solution: reservation(2, true, true), expected: 'حجز مميز', inputs: ['seats', 'isPaid', 'hasPass'], cases: reservationCases, operation: '||' }),
      broken: reservation(2, true, true, '&&'), fixed: reservation(2, true, true), question: 'تصريح صالح ومقعدان. الكود اختار حجزًا عاديًا. أي تغيير يعيد تطبيق قاعدة التصريح؟', options: ['بدّل ترتيب رسالتَي العدد والدفع', 'استخدم || بين seats >= 3 وhasPass', 'غيّر عدد المقاعد إلى 3'], correct: 1, explanation: 'استخدم || بعد اجتياز فحص العدد والدفع. وقتها يكفي الوصول إلى 3 مقاعد أو وجود تصريح.' },
    transfer: decisionTask({ task: 'اكتب قرار استعارة. احفظ copies = 4 وhasCard = true وhasException = false. اطبع «راجع عدد النسخ» عند copies <= 0، ثم «أظهر البطاقة» عند !hasCard. بعدهما اطبع «تمت الإعارة» عندما copies <= 3 || hasException، وإلا «قلّل عدد النسخ».', solution: 'int copies = 4;\nbool hasCard = true;\nbool hasException = false;\nif (copies <= 0)\n{\n    Console.WriteLine("راجع عدد النسخ");\n}\nelse if (!hasCard)\n{\n    Console.WriteLine("أظهر البطاقة");\n}\nelse if (copies <= 3 || hasException)\n{\n    Console.WriteLine("تمت الإعارة");\n}\nelse\n{\n    Console.WriteLine("قلّل عدد النسخ");\n}', expected: 'قلّل عدد النسخ', inputs: ['copies', 'hasCard', 'hasException'], operation: '||', cases: [[{ copies: 0, hasCard: false }, 'راجع عدد النسخ'], [{ copies: 0, hasException: true }, 'راجع عدد النسخ'], [{ copies: 2, hasCard: false, hasException: true }, 'أظهر البطاقة'], [{ copies: 3 }, 'تمت الإعارة'], [{ copies: 4, hasException: true }, 'تمت الإعارة'], [{ copies: 5 }, 'قلّل عدد النسخ']], help: 'ارسم أربعة صفوف للحالات. ابدأ بفحص العدد، وبعده البطاقة، وبعدهما شرط الإعارة المركب.' })
  }
];

const unitId = 'compound-decisions';
let previousId = previousUnit.lessons.at(-1).id;
const built = lessons.map((lesson, index) => {
  const result = makeLesson({ ...lesson, skill: 'الشروط المركبة والاختيار المتعدد', projectContext: 'قرار حجز حسب العدد والدفع والتصريح', sourcesReviewedAt: '2026-11-18' }, previousUnit.lessons.at(-1).order + 1 + index, previousId, unitId);
  previousId = result.id;
  return result;
});
module.exports = {
  data: {
    schemaVersion: '1.0.0', track: 'csharp', title: 'الوحدة الثالثة: اربط الشروط واختر بالترتيب',
    description: 'المقارنات عند الحد والنفي وربط الشروط وفحص عدة مسارات بالترتيب.',
    totalLessons: built.length, runtime: 'csharp-foundations-subset-v3', lessons: built
  }
};

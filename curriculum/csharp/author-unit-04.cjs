const { makeLesson } = require('./lesson-builder.cjs');
const previous = require('./author-unit-03.cjs').data.lessons.at(-1);

const arithmetic = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators';
const numbers = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types';
const conversions = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/numeric-conversions';
const length = 'https://learn.microsoft.com/en-us/dotnet/api/system.string.length?view=net-10.0';
const addition = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/addition-operator';

const scene = (...items) => items.map(([label, text]) => ({ label, text }));
const cases = rows => rows.map(([inputs, output]) => ({ inputs, output: output + '\n' }));
const task = (instruction, answer, hints = {}) => ({ ...answer, ...hints, task: 'يا كمبيوتر، ' + instruction });

function program(inputs, target, output, alternate, intermediates = []) {
  const [type, name, expression, operation] = target;
  const declarations = [...inputs, ...intermediates, [type, name, expression]];
  return {
    solution: [...declarations.map(([t, n, value]) => t + ' ' + n + ' = ' + value + ';'), 'Console.WriteLine(' + name + ');'].join('\n'),
    output: output + '\n',
    declared: declarations.map(([, n]) => n),
    printed: [name],
    read: declarations.slice(0, -1).map(([, n]) => n),
    operation,
    operationIn: name,
    cases: cases(alternate)
  };
}

function repair(fixed, broken, question, options, correct, explanation) {
  return { ...fixed, broken: broken.solution, fixed: fixed.solution, question, options, correct, explanation };
}

const integerShares = [[{ pieces: 0, people: 3 }, 0], [{ pieces: 11, people: 3 }, 3], [{ pieces: -5, people: 2 }, -2]];
const whole = (pieces, people, output, op = '/') => program(
  [['int', 'pieces', pieces], ['int', 'people', people]],
  ['int', 'share', 'pieces ' + op + ' people', op], output, integerShares
);

const volumeCases = [[{ liters: 5, bottles: 2 }, 2.5], [{ liters: 8, bottles: 2 }, 4], [{ liters: 1, bottles: 4 }, 0.25]];
const volume = (liters, bottles, output, type = 'double') => program(
  [[type, 'liters', liters], ['int', 'bottles', bottles]],
  ['double', 'portion', 'liters / bottles', '/'], output, volumeCases
);

const priceCases = [[{ price: '0.10', fee: '0.20' }, '0.30'], [{ price: '4.50', fee: '0.25' }, '4.75'], [{ price: '2.00', fee: '0.00' }, '2.00']];
const price = (base, fee, output, type = 'decimal') => {
  const suffix = type === 'decimal' ? 'm' : '';
  return program(
    [[type, 'price', base + suffix], [type, 'fee', fee + suffix]],
    [type, 'total', 'price + fee', '+'], output, priceCases
  );
};

const castCases = [[{ measured: 7.9 }, 7], [{ measured: -7.9 }, -7], [{ measured: 0.9 }, 0], [{ measured: 2147483647.75 }, 2147483647]];
const cast = (measured, output, expression = '(int)measured') => program(
  [['double', 'measured', measured]], ['int', 'whole', expression, '(int)'], output, castCases
);

const rateCases = [[{ minutes: 7, trips: 2 }, 3.5], [{ minutes: 6, trips: 3 }, 2], [{ minutes: 9, trips: 4 }, 2.25]];
const rate = (minutes, trips, output, expression = '(double)minutes / trips') => program(
  [['int', 'minutes', minutes], ['int', 'trips', trips]],
  ['double', 'rate', expression, '(double)'], output, rateCases
);

const textCases = [[{ code: '' }, 0], [{ code: 'AZ7' }, 3], [{ code: 'أحمد' }, 4], [{ code: '🧮أ' }, 3]];
const textLength = (code, output, expression = 'code.Length') => program(
  [['string', 'code', JSON.stringify(code)]], ['int', 'size', expression, '.Length'], output, textCases
);

const seatsCases = [[{ seats: 0 }, 'المقاعد: 0'], [{ seats: 14 }, 'المقاعد: 14'], [{ seats: 2 }, 'المقاعد: 2']];
const message = (seats, expression = '"المقاعد: " + seats') => program(
  [['int', 'seats', seats]], ['string', 'message', expression, '+'], 'المقاعد: ' + seats, seatsCases
);

const portionCases = [[{ liters: 5, bottles: 2 }, 'نصيب الزجاجة: 2.5'], [{ liters: 8, bottles: 4 }, 'نصيب الزجاجة: 2'], [{ liters: 1, bottles: 4 }, 'نصيب الزجاجة: 0.25']];
const card = (liters, bottles, output, expression = '(double)liters / bottles') => program(
  [['int', 'liters', liters], ['int', 'bottles', bottles]],
  ['string', 'label', '"نصيب الزجاجة: " + portion', '+'], 'نصيب الزجاجة: ' + output, portionCases,
  [['double', 'portion', expression]]
);

const lessons = [
  {
    slug: 'integer-division', title: 'اقسم بين عددين صحيحين', reference: arithmetic,
    scene: 'وزّع ٥ تذاكر على شخصين بالتساوي. كل واحد ياخد تذكرتين كاملتين، وتفضل تذكرة.',
    sceneVisual: scene(['المتاح', '٥ تذاكر'], ['عدد الأشخاص', '٢'], ['النصيب الكامل', '٢ لكل شخص']),
    concept: 'لما الطرفين int، المعامل / يحسب ناتجًا صحيحًا. الجزء الكسري بيتشال باتجاه الصفر، فـ 5 / 2 تدي 2، و-5 / 2 تدي -2.',
    why: 'تحسب عدد القطع الكاملة التي يمكن توزيعها أو وضعها في كل علبة.',
    mechanics: 'اقرأ الطرفين، شوف نوع عملية القسمة، واحفظ النصيب الصحيح. التتبّع يعرض الطرفين والناتج.',
    breakdown: ['اقرأ pieces وpeople.', 'نفّذ القسمة بنوع int.', 'خزّن النصيب الصحيح في share واطبعه.'],
    build: task('خزّن pieces = 5 وpeople = 2. اقسم pieces على people، واحفظ النصيب الصحيح في share ثم اطبعه.', whole(5, 2, 2),
      { attention: 'بص على نوع الطرفين قبل الناتج.', rule: 'قسمة int على int تشيل الجزء الكسري باتجاه الصفر.', help: 'جرّب int share = pieces / people;.' }),
    edit: task('غيّر pieces إلى 7 وحده. شغّل القسمة واطبع الحصة الجديدة.', whole(7, 2, 3)),
    experiment: task('وزّع ٩ تذاكر على نفس الشخصين. اكتب العدد الجديد واعرض النصيب.', whole(9, 2, 4)),
    bug: repair(whole(11, 3, 3), whole(11, 3, 2, '%'), 'ظهر 2 عند توزيع ١١ تذكرة على ٣. ازاي تحسب نصيب الشخص؟',
      ['استخدم / على نفس العددين', 'استخدم % على نفس العددين', 'اطبع عدد التذاكر قبل التوزيع'], 0, 'المعامل / يحسب النصيب الكامل. المعامل % يحسب عدد التذاكر الباقية.'),
    transfer: task('خزّن pencils = 13 وboxes = 4. احسب each لكل علبة باستخدام قسمة int واطبعه.',
      program([['int', 'pencils', 13], ['int', 'boxes', 4]], ['int', 'each', 'pencils / boxes', '/'], 3, [[{ pencils: 12, boxes: 4 }, 3], [{ pencils: 3, boxes: 4 }, 0]]))
  },
  {
    slug: 'double-division', title: 'احتفظ بالجزء الكسري', reference: numbers,
    scene: 'معاك ٥ لترات وعايز تقسمها على زجاجتين. كل زجاجة تاخد لترين ونص.',
    sceneVisual: scene(['المتاح', '٥ لترات'], ['عدد الزجاجات', '٢'], ['نصيب الزجاجة', '٢٫٥ لتر']),
    concept: 'اكتب 5.0 كقيمة double. عند قسمة double على int يتحوّل العدد الصحيح أثناء الحساب، ويقدر الناتج يحتفظ بالجزء الكسري.',
    why: 'تقيس الكميات التي يمكن تقسيمها إلى أجزاء، زي اللترات أو الأطوال.',
    mechanics: 'بعد قراءة liters وbottles، يظهر نوع الناتج double في سطر القسمة. بعدها تُخزّن حصة الزجاجة.',
    breakdown: ['خزّن اللترات في double.', 'اقرأ عدد الزجاجات من bottles.', 'احسب portion واطبع الرقم.'],
    build: task('خزّن liters = 5.0 من النوع double وbottles = 2 من النوع int. احسب portion واطبعه.', volume('5.0', 2, 2.5),
      { attention: 'خلي المتغير المقسوم نفسه double.', rule: 'وجود طرف double يكفي لحساب القسمة بنوع double.', help: 'ابدأ بـ double liters = 5.0; ثم اكتب double portion = liters / bottles;.' }),
    edit: task('غيّر liters إلى 6.0. تابع الناتج لما تقبل الكمية القسمة بالتساوي.', volume('6.0', 2, 3)),
    experiment: task('اقسم ١١ لترًا على الزجاجتين واطبع النصيب الكسري.', volume('11.0', 2, 5.5)),
    bug: repair(volume('5.0', 2, 2.5), volume(5, 2, 2, 'int'), 'portion نوعه double لكن طبع 2. تغيّر نوع أي قيمة عشان تشوف 2.5؟',
      ['غيّر liters إلى double قبل القسمة', 'اطبع bottles', 'غيّر اسم portion'], 0, 'نوع طرفي القسمة هو اللي يحدد نوع الحساب. خلّي liters من النوع double قبل التنفيذ.'),
    transfer: task('خزّن distance = 15.0 وsegments = 4. احسب section كطول كل جزء واطبعه.',
      program([['double', 'distance', '15.0'], ['int', 'segments', 4]], ['double', 'section', 'distance / segments', '/'], 3.75, [[{ distance: 6, segments: 4 }, 1.5], [{ distance: 0, segments: 3 }, 0]]))
  },
  {
    slug: 'decimal-prices', title: 'اجمع السعر والرسوم بـ decimal', reference: numbers,
    scene: 'على بطاقة الحساب سعر ٠٫١٠ جنيه ورسوم ٠٫٢٠ جنيه. اجمع الرقمين عشان تعرض ٠٫٣٠ جنيه.',
    sceneVisual: scene(['السعر', '٠٫١٠'], ['الرسوم', '٠٫٢٠'], ['الإجمالي', '٠٫٣٠']),
    concept: 'decimal يمثل كسورًا عشرية مثل 0.10 بدقة في نطاقه. اكتب m بعد القيمة زي 0.10m عند شغل الأسعار.',
    why: 'تعرض مجموع السعر والرسوم كما تتوقعه من حساب الفاتورة.',
    mechanics: 'اقرأ قيمتي decimal واجمعهما، ثم لاحظ الاحتفاظ بالخانتين في نتيجة 0.30.',
    breakdown: ['اكتب m مع قيمة السعر.', 'اكتب m مع قيمة الرسوم.', 'اجمع المتغيرين واطبع الإجمالي.'],
    build: task('خزّن price = 0.10m وfee = 0.20m. اجمعهما في decimal اسمه total واطبعه.', price('0.10', '0.20', '0.30'),
      { attention: 'راجع النوع والحرف m بعد كل قيمة.', rule: 'اللاحقة m تجعل القيمة المكتوبة من النوع decimal.', help: 'اكتب decimal price = 0.10m; ثم احفظ price + fee داخل total.' }),
    edit: task('غيّر price إلى 1.25m. احسب الإجمالي مع نفس الرسوم.', price('1.25', '0.20', '1.45')),
    experiment: task('غيّر fee إلى 0.35m مع نفس السعر 1.25m واطبع الإجمالي.', price('1.25', '0.35', '1.60')),
    bug: repair(price('0.10', '0.20', '0.30'), price('0.10', '0.20', '0.30000000000000004', 'double'),
      'ظهر 0.30000000000000004 في جمع السعر والرسوم. اختار النوع الأنسب لهذا الحساب.',
      ['decimal مع قيم تنتهي بـ m', 'اكتب الرقمين داخل نصين', 'اطبع سعر المنتج وحده'], 0, 'استخدم decimal في المتغيرات الثلاثة وm بعد السعر والرسوم.'),
    transfer: task('خزّن ticket = 7.50m وcharge = 2.25m. احسب amount واجعل نوعه decimal، ثم اطبعه.',
      program([['decimal', 'ticket', '7.50m'], ['decimal', 'charge', '2.25m']], ['decimal', 'amount', 'ticket + charge', '+'], '9.75',
        [[{ ticket: '1.10', charge: '2.20' }, '3.30'], [{ ticket: '3.00', charge: '0' }, '3.00']]))
  },
  {
    slug: 'explicit-whole-cast', title: 'حوّل القياس إلى عدد صحيح', reference: conversions,
    scene: 'القياس طلع ٧٫٩ سنتيمتر. في الخانة المخصصة للسنتيمترات الكاملة سجّل ٧.',
    sceneVisual: scene(['القياس', '٧٫٩'], ['الجزء المطلوب', 'السنتيمترات الكاملة'], ['القيمة المخزّنة', '٧']),
    concept: 'اكتب (int) قبل قيمة double لتحويلها لصحيح. التحويل بيشيل الجزء الكسري باتجاه الصفر. استخدم قيمة نتيجتها داخل نطاق int.',
    why: 'تتحكم في لحظة تحويل القياس عند تخزين الجزء الصحيح.',
    mechanics: 'يقرأ المحاكي القيمة الأصلية ويعرض (int) والناتج قبل حفظ whole. قيمة measured تظل كما هي.',
    breakdown: ['اقرأ measured.', 'طبّق (int) على القيمة.', 'احفظ الناتج الصحيح في whole واطبعه.'],
    build: task('خزّن measured = 7.9 في double. حوّله إلى int اسمه whole واطبع whole.', cast('7.9', 7),
      { attention: 'طبّق التحويل على القيمة التي تقرؤها.', rule: 'التحويل إلى int يحذف الكسر باتجاه الصفر.', help: 'اكتب int whole = (int)measured;.' }),
    edit: task('غيّر measured إلى 3.2 واطبع الجزء الصحيح.', cast('3.2', 3)),
    experiment: task('جرّب measured = -3.8. لاحظ نتيجة الحذف باتجاه الصفر.', cast('-3.8', -3)),
    bug: repair(cast('7.9', 7), cast('7.9', 7, 'measured'), 'خانة whole من النوع int. ماذا تكتب عند إسناد قيمة measured من double؟',
      ['measured وحدها', '(int)measured', 'اسم المتغير بين علامات تنصيص'], 1, 'اكتب (int) قبل measured ليكون التحويل صريحًا.'),
    transfer: task('خزّن duration = 12.5 من نوع double. احسب seconds الصحيحة بتحويل صريح، ثم اطبعها.',
      program([['double', 'duration', '12.5']], ['int', 'seconds', '(int)duration', '(int)'], 12, [[{ duration: 0.5 }, 0], [{ duration: 1.9 }, 1]]))
  },
  {
    slug: 'cast-before-division', title: 'حوّل طرفًا قبل القسمة', reference: conversions,
    scene: 'في الدفتر ٥ دقائق وعدد الرحلات ٢. السجل بيحفظ العدادين كأعداد صحيحة، وعايز المتوسط ٢٫٥.',
    sceneVisual: scene(['المتاح', '٥ دقائق في السجل'], ['التحويل أثناء الحساب', 'قيمة عددية تقبل الكسر'], ['متوسط الرحلة', '٢٫٥']),
    concept: 'حوّل طرفًا باستخدام (double) قبل تنفيذ /. لو حوّلت الناتج بعد قسمة int، الجزء الكسري يكون اتشال بالفعل.',
    why: 'تحتفظ بعدادات int في البيانات وتقدر تحسب منها متوسطًا كسريًا.',
    mechanics: 'اقرأ minutes، حوّل قيمته مؤقتًا إلى double، نفّذ القسمة، ثم اكتب الناتج في rate.',
    breakdown: ['العدّادان minutes وtrips من النوع int.', 'التحويل على minutes يتم قبل /.', 'قسمة double تحفظ الجزء الكسري في rate.'],
    build: task('خزّن minutes = 5 وtrips = 2 كأعداد صحيحة. استخدم (double) على minutes قبل القسمة ثم اطبع rate.', rate(5, 2, 2.5),
      { attention: 'ركّز على التوقيت. التحويل يحصل قبل /.', rule: 'نوع طرفي العملية وقت الحساب يحدد النوع الذي تخرج به.', help: 'اكتب double rate = (double)minutes / trips;.' }),
    edit: task('غيّر minutes إلى 8 مع نفس عدد الرحلات. اطبع rate.', rate(8, 2, 4)),
    experiment: task('خلي minutes = 9 مع رحلتين واطبع المتوسط.', rate(9, 2, 4.5)),
    bug: repair(rate(5, 2, 2.5), rate(5, 2, 2, '(double)(minutes / trips)'), 'الأقواس حول القسمة جعلت القيمة 2. أي صيغة تحوّل الطرف الأول قبل القسمة؟',
      ['(double)(minutes / trips)', '(double)minutes / trips', 'minutes / trips'], 1, 'ضع التحويل مباشرة على minutes قبل قسمة العددين.'),
    transfer: task('خزّن points = 15 وmatches = 4 كأعداد صحيحة. احسب average بتحويل طرف قبل القسمة واطبعه.',
      program([['int', 'points', 15], ['int', 'matches', 4]], ['double', 'average', '(double)points / matches', '(double)'], 3.75,
        [[{ points: 7, matches: 2 }, 3.5], [{ points: 0, matches: 2 }, 0]]))
  },
  {
    slug: 'text-length', title: 'اقرأ طول النص', reference: length,
    scene: 'قدامك رمز AB45. حدد طول الرمز عشان تعرف عدد الخانات المستخدمة.',
    sceneVisual: scene(['النص', 'AB45'], ['الخانات', 'A · B · 4 · 5'], ['الطول', '٤']),
    concept: 'اقرأ code.Length للحصول على طول النص بنوع int. النص الفارغ طوله صفر. Length تعد وحدات UTF-16، فبعض الرموز المرئية تُحسب وحدتين.',
    why: 'تقدر تتحقق من طول رمز أو نص أخذته من المستخدم حتى لو اتغيّرت قيمته.',
    mechanics: 'تظهر قيمة النص أولًا. الخطوة التالية تقرأ .Length وتكتب العدد في size.',
    breakdown: ['اقرأ النص من code.', 'اقرأ خاصية Length بعد النقطة.', 'احفظ الناتج في size كعدد صحيح.'],
    build: task('خزّن الرمز AB45 في string اسمه code. احفظ code.Length في size واطبعه.', textLength('AB45', 4),
      { attention: 'الطول معلومة تقرأها من قيمة code.', rule: 'خاصية Length تُقرأ من غير أقواس استدعاء.', help: 'اكتب int size = code.Length;.' }),
    edit: task('استبدل الرمز بالحرف A واترك سطر حساب الطول كما هو.', textLength('A', 1)),
    experiment: task('استبدل الرمز بنص فارغ واعرض طول التخزين الفارغ.', textLength('', 0)),
    bug: repair(textLength('AZ7', 3), textLength('AZ7', 4, '4'), 'الرمز اتحوّل من AB45 إلى AZ7. ليه البرنامج لسه بيطبع 4؟',
      ['لأنه بيخزّن 4 يدويًا', 'لأن الطول لازم يكون string', 'لأن الرقم 7 لا يُحسب'], 0, 'خلّي size يقرأ code.Length عشان القيمة تتغير مع النص.'),
    transfer: task('خزّن أحمد في label. احفظ طول label في count واطبعه.',
      program([['string', 'label', '"أحمد"']], ['int', 'count', 'label.Length', '.Length'], 4, [[{ label: '' }, 0], [{ label: 'عمر' }, 3], [{ label: '🧮أ' }, 3]]))
  },
  {
    slug: 'compose-message', title: 'اكتب رسالة من نص وعدد', reference: addition,
    scene: 'عندك خانة اسمها المقاعد وعددها ٢. اعرضهم في سطر واحد واضح للقارئ.',
    sceneVisual: scene(['القالب', 'المقاعد:'], ['القيمة', '٢'], ['الرسالة', 'المقاعد: ٢']),
    concept: 'لما أحد طرفي + نص، الكمبيوتر يضم قيم الطرفين في نص. استخدم القيمة الحالية للعداد وسيب مساحة بعد العنوان.',
    why: 'مخرجات البرنامج تشرح معنى الرقم، وتظهر القيمة الجديدة لما العداد يتغير.',
    mechanics: 'اقرأ النص والعدد. التتبّع يبين عملية الضم والنص الناتج قبل الطباعة.',
    breakdown: ['اقرأ العنوان ومعه المسافة.', 'اقرأ seats.', 'ضمّهم في message واطبعها.'],
    build: task('خزّن seats = 2. اضم "المقاعد: " مع seats داخل message واطبعها.', message(2),
      { attention: 'خلي الرقم متغيرًا يُقرأ، والمسافة موجودة داخل النص.', rule: 'ضم نص مع قيمة باستخدام + يعطي نصًا.', help: 'اكتب string message = "المقاعد: " + seats;.' }),
    edit: task('غيّر seats إلى 4 واترك صيغة تكوين الرسالة.', message(4)),
    experiment: task('غيّر seats إلى 0 واعرض رسالة المقاعد.', message(0)),
    bug: repair(message(4), message(4, '"المقاعد: " + "2"'), 'العداد فيه 4 والرسالة لسه فيها 2. أي جزء يحتاج تعديلًا؟',
      ['خلي الرسالة تستخدم seats', 'اكتب 4 في نص ثابت', 'احذف المسافة بعد العنوان'], 0, 'اقرأ seats بدل وضع الرقم داخل علامات التنصيص.'),
    transfer: task('خزّن boxes = 2 وextra = 1. اجمع العددين أولًا بين قوسين ثم كوّن النص "المجموع: " مع الناتج في totalLabel.',
      program([['int', 'boxes', 2], ['int', 'extra', 1]], ['string', 'totalLabel', '"المجموع: " + (boxes + extra)', '+'], 'المجموع: 3',
        [[{ boxes: 1, extra: 2 }, 'المجموع: 3'], [{ boxes: 10, extra: 0 }, 'المجموع: 10']]))
  },
  {
    slug: 'portion-card', title: 'تطبيق بطاقة نصيب الزجاجة', reference: arithmetic,
    scene: 'في محطة التعبئة عندك ٧ لترات وزجاجتين. احسب نصيب كل زجاجة واطبع بطاقة توضح الكمية.',
    sceneVisual: scene(['المدخل', '٧ لترات لزجاجتين'], ['الحساب', '٣٫٥ لكل زجاجة'], ['البطاقة', 'نصيب الزجاجة: ٣٫٥']),
    concept: 'قسّم العمل على سطرين. احسب النصيب الكسري في portion أولًا، ثم استخدمه في رسالة label.',
    why: 'تجمع حسابًا ورسالة تعرض نتيجة متغيرة، وتقدر تعرف السطر المسؤول لو ظهر رقم غلط.',
    mechanics: 'شاهد نوع القسمة والنتيجة، وبعدها شاهد انضمام القيمة إلى الرسالة في لقطة منفصلة.',
    breakdown: ['اقرأ اللترات وعدد الزجاجات غير الصفري.', 'حوّل liters أثناء حساب portion.', 'ضم portion إلى "نصيب الزجاجة: " ثم اطبع label.'],
    projectContext: 'بطاقة تعبئة الزجاجات',
    build: task('خزّن liters = 7 وbottles = 2 كـ int. احسب portion الكسري، واطبع label بصيغة "نصيب الزجاجة: " مع القيمة.', card(7, 2, 3.5),
      { attention: 'شوف الجزء الكسري عند سطر الحساب، وبعدها راقب الرسالة.', rule: 'الحساب يتم قبل ضم القيمة للنص.', help: 'اكتب double portion = (double)liters / bottles; ثم اجمع "نصيب الزجاجة: " مع portion.' }),
    edit: task('غيّر liters إلى 8 واترك عدد الزجاجات 2. شغّل البطاقة.', card(8, 2, 4)),
    experiment: task('مع ٨ لترات غيّر bottles إلى 5. اطبع البطاقة الجديدة.', card(8, 5, 1.6)),
    bug: repair(card(7, 2, 3.5), card(7, 2, 3, 'liters / bottles'), 'البطاقة بتطبع 3 بدل 3.5. فين تبدأ التصحيح؟',
      ['في سطر حساب portion', 'في النص قبل قيمة portion فقط', 'في سطر Console.WriteLine فقط'], 0, 'حوّل liters إلى double عند حساب portion. الرسالة تطبع القيمة المحسوبة.'),
    transfer: task('خزّن juice = 9 وcups = 4 كأعداد صحيحة. احسب amount الكسري واطبع message بصيغة "نصيب الكوب: " مع القيمة.',
      program([['int', 'juice', 9], ['int', 'cups', 4]], ['string', 'message', '"نصيب الكوب: " + amount', '+'], 'نصيب الكوب: 2.25',
        [[{ juice: 5, cups: 2 }, 'نصيب الكوب: 2.5'], [{ juice: 0, cups: 3 }, 'نصيب الكوب: 0']], [['double', 'amount', '(double)juice / cups']]))
  }
];

let previousId = previous.id;
const unitId = 'numeric-types-and-text';
const built = lessons.map((spec, index) => {
  const lesson = makeLesson({
    ...spec, code: spec.build.solution, skill: 'الأنواع العددية والنصوص والتحويل', sourcesReviewedAt: '2026-11-18'
  }, previous.order + index + 1, previousId, unitId);
  previousId = lesson.id;
  return lesson;
});

module.exports = {
  data: {
    schemaVersion: '1.0.0', track: 'csharp', title: 'الوحدة الرابعة: احسب وحوّل واكتب رسالة',
    description: 'القسمة الصحيحة والكسرية وdecimal والتحويل الصريح وطول النص وتركيب الرسائل.',
    totalLessons: built.length, runtime: 'csharp-foundations-subset-v4', lessons: built
  }
};

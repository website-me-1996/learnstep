const { makeLesson } = require('./lesson-builder.cjs');
const previous = require('./author-unit-04.cjs').data.lessons.at(-1);

const readLine = 'https://learn.microsoft.com/en-us/dotnet/api/system.console.readline?view=net-10.0';
const coalescing = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator';
const tryParse = 'https://learn.microsoft.com/en-us/dotnet/api/system.int32.tryparse?view=net-10.0';
const selections = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements';
const write = expression => 'Console.WriteLine(' + expression + ');';
const read = name => 'string? ' + name + ' = Console.ReadLine();';
const parse = (input, result, value) => 'bool ' + result + ' = int.TryParse(' + input + ', out int ' + value + ');';
const scene = (...items) => items.map(([label, text]) => ({ label, text }));

function answer(lines, stdin, output, alternate, checks) {
  return {
    solution: lines.join('\n'), stdin, output: output + '\n',
    cases: alternate.map(([input, result]) => ({ stdin: input, output: result + '\n' })),
    ...checks
  };
}
const task = (instruction, result, hints = {}) => ({ ...result, ...hints, task: 'يا كمبيوتر، ' + instruction });
const repair = (fixed, broken, question, options, correct, explanation) => ({
  ...fixed, broken: broken.join('\n'), fixed: fixed.solution, question, options, correct, explanation
});

const oneLineCases = [['هدى', 'هدى'], ['أحمد\nمنى', 'أحمد'], ['', ''], ['\n', '']];
const oneLine = (stdin, output, name = 'name') => answer([read(name), write(name)], stdin, output, oneLineCases,
  { declared: [name], printed: [name], operation: 'ReadLine', operationIn: name });

const pairCases = [['هدى\nالقاهرة', 'هدى\nالقاهرة'], ['نور\nالمنصورة\nتجاهل', 'نور\nالمنصورة'], ['عمر', 'عمر\n']];
const pair = (stdin, output, names = ['name', 'city']) => answer(
  [...names.map(read), ...names.map(write)], stdin, output, pairCases,
  { declared: names, printed: names, minPrints: 2, operation: 'ReadLine', operationIn: names[1] }
);

const eofCases = [['', 'True'], ['\n', 'False'], ['0', 'False'], ['نور\n', 'False']];
const eof = (stdin, output, comparison = 'line == null') => answer(
  [read('line'), 'bool ended = ' + comparison + ';', write('ended')], stdin, output, eofCases,
  { declared: ['line', 'ended'], printed: ['ended'], read: ['line'], operation: '==', operationIn: 'ended' }
);

const labelCases = [['', 'زائر'], ['\n', ''], ['هدى', 'هدى'], ['  ', '  ']];
const label = (stdin, output) => answer(
  [read('raw'), 'string label = raw ?? "زائر";', write('label')], stdin, output, labelCases,
  { declared: ['raw', 'label'], printed: ['label'], read: ['raw'], operation: '??', operationIn: 'label' }
);

const parseCases = [['0', 'True\n0'], ['  +7  ', 'True\n7'], ['-4', 'True\n-4'], ['2.5', 'False\n0'],
  ['', 'False\n0'], ['2147483647', 'True\n2147483647'], ['2147483648', 'False\n0'], ['-2147483648', 'True\n-2147483648']];
const parsed = (stdin, output, name = 'seats') => answer(
  [read('raw'), parse('raw', 'valid', name), write('valid'), write(name)], stdin, output, parseCases,
  { declared: ['raw', 'valid'], printed: ['valid', name], read: ['raw'], minPrints: 2, operation: 'TryParse', operationIn: 'valid' }
);

const replyCases = [['1', 'عدد: 1'], ['0', 'عدد: 0'], ['-2', 'عدد: -2'], ['abc', 'أدخل عددًا صحيحًا'], ['', 'أدخل عددًا صحيحًا']];
function reply(stdin, output, condition = 'valid') {
  return answer([
    read('raw'), parse('raw', 'valid', 'seats'),
    'if (' + condition + ')', '{', '    ' + write('"عدد: " + seats'), '}',
    'else', '{', '    ' + write('"أدخل عددًا صحيحًا"'), '}'
  ], stdin, output, replyCases,
  { declared: ['raw', 'valid'], operation: 'TryParse', operationIn: 'valid', branching: true, elseRequired: true, conditionReads: ['valid'] });
}

const positiveCases = [['-1', 'العدد يبدأ من 1'], ['0', 'العدد يبدأ من 1'], ['1', 'عدد مقبول: 1'],
  ['2147483648', 'أدخل عددًا صحيحًا'], ['\n', 'أدخل عددًا صحيحًا']];
function positive(stdin, output, limit = '<=') {
  return answer([
    read('raw'), parse('raw', 'valid', 'quantity'), 'if (!valid)', '{', '    ' + write('"أدخل عددًا صحيحًا"'), '}',
    'else if (quantity ' + limit + ' 0)', '{', '    ' + write('"العدد يبدأ من 1"'), '}',
    'else', '{', '    ' + write('"عدد مقبول: " + quantity'), '}'
  ], stdin, output, positiveCases,
  { declared: ['raw', 'valid'], operation: 'TryParse', operationIn: 'valid', branching: true, elseIfRequired: true, conditionReads: ['valid', 'quantity'] });
}

const bookingCases = [
  ['abc', 'أدخل عددًا صحيحًا'], ['', 'أدخل عددًا صحيحًا'], ['0', 'العدد يبدأ من 1'],
  ['-1', 'العدد يبدأ من 1'], ['1', 'تم الحجز: 1'], ['6', 'تم الحجز: 6'], ['7', 'المقاعد غير كافية']
];
function booking(stdin, output, { available = 6, boundary = '>', alternate = bookingCases } = {}) {
  return answer([
    read('raw'), parse('raw', 'valid', 'seats'), 'int available = ' + available + ';',
    'if (!valid)', '{', '    ' + write('"أدخل عددًا صحيحًا"'), '}',
    'else if (seats <= 0)', '{', '    ' + write('"العدد يبدأ من 1"'), '}',
    'else if (seats ' + boundary + ' available)', '{', '    ' + write('"المقاعد غير كافية"'), '}',
    'else', '{', '    ' + write('"تم الحجز: " + seats'), '}'
  ], stdin, output, alternate,
  { declared: ['raw', 'valid', 'available'], operation: 'TryParse', operationIn: 'valid', branching: true, elseIfRequired: true, conditionReads: ['valid', 'seats', 'available'] });
}

const lessons = [
  {
    slug: 'read-first-line', title: 'اقرأ أول سطر من المدخلات', reference: readLine,
    scene: 'أمام الكمبيوتر ورقة فيها الاسم «منى». يقرأ السطر الأول، ويحفظ الاسم، وبعدها يعرضه.',
    sceneVisual: scene(['المدخلات', 'منى'], ['الحركة', 'اقرأ سطرًا واحدًا'], ['المخرج', 'منى']),
    concept: 'ضع المدخلات في المربع قبل التشغيل. Console.ReadLine() تقرأ سطرًا، وترجع قيمته من غير علامة نهاية السطر. string? يسمح أن تعود القراءة بـ null لو خلصت السطور.',
    why: 'تقدر تجرب نفس الكود بأسماء مختلفة من مربع المدخلات.',
    mechanics: 'التتبّع يبين رقم السطر المستهلك وقيمته، ثم يعرض الاسم في جدول المتغيرات.',
    breakdown: ['اكتب الاسم في مربع المدخلات.', 'اقرأ السطر إلى name.', 'اطبع القيمة المخزنة.'],
    build: task('اكتب منى في المدخلات. خزّن أول سطر في string? اسمه name ثم اطبع name.', oneLine('منى', 'منى'),
      { attention: 'الاسم موجود في مدخلات التشغيل.', rule: 'Console.ReadLine تقرأ قيمة السطر الحالي.', help: 'اكتب string? name = Console.ReadLine(); ثم اطبع name.' }),
    edit: task('بدّل المدخل إلى أحمد واترك سطر القراءة والطباعة.', oneLine('أحمد', 'أحمد')),
    experiment: task('جرّب نور في مربع المدخلات. اطبع الاسم باستخدام نفس الكود.', oneLine('نور', 'نور')),
    bug: repair(oneLine('هدى', 'هدى'), ['string? name = "منى";', write('name')],
      'المدخل هدى لكن البرنامج بيعرض منى. ليه؟', ['المتغير يأخذ اسمًا ثابتًا مكتوبًا في الكود', 'مربع المدخلات فيه سطران', 'أمر الطباعة لا يعمل مع النص'],
      0, 'خلي name يقرأ Console.ReadLine() عشان يظهر السطر الموجود في المدخلات.'),
    transfer: task('اكتب القاهرة في المدخلات. استخدم string? city لقراءة السطر ثم اطبع city.', oneLine('القاهرة', 'القاهرة', 'city'))
  },
  {
    slug: 'read-two-lines', title: 'اقرأ سطرين بالترتيب', reference: readLine,
    scene: 'على ورقة الحجز الاسم في أول سطر والمدينة في السطر الثاني. مرّر للسطر التاني بعد ما تحفظ الأول.',
    sceneVisual: scene(['السطر ١', 'عمر'], ['السطر ٢', 'الجيزة'], ['القراءة', 'الاسم ثم المدينة']),
    concept: 'كل استدعاء لـ Console.ReadLine() يستهلك سطرًا واحدًا. الاستدعاء التالي يبدأ من السطر المتاح بعده.',
    why: 'تستقبل أكثر من قيمة بشكل مرتب من نفس مربع المدخلات.',
    mechanics: 'راقب علامة سطر ١ مع name، وبعدها سطر ٢ مع city. كل قيمة محفوظة لوحدها.',
    breakdown: ['قسّم المدخلات إلى سطرين.', 'اقرأ name ثم city.', 'اطبع المتغيرين بالترتيب.'],
    build: task('اكتب عمر والجيزة في سطرين. اقرأ name ثم city واطبع كل قيمة في سطر.', pair('عمر\nالجيزة', 'عمر\nالجيزة'),
      { attention: 'تابع ترتيب القراءة.', rule: 'كل ReadLine تتقدم إلى السطر التالي.', help: 'كرر Console.ReadLine() مرة لتصريح name ومرة لتصريح city.' }),
    edit: task('اترك عمر في السطر الأول واستبدل الجيزة بالإسكندرية.', pair('عمر\nالإسكندرية', 'عمر\nالإسكندرية')),
    experiment: task('ضع نور في السطر الأول والإسكندرية في السطر الثاني. اطبع الاثنين.', pair('نور\nالإسكندرية', 'نور\nالإسكندرية')),
    bug: repair(pair('هدى\nالقاهرة', 'هدى\nالقاهرة'), [read('name'), 'string? city = name;', write('name'), write('city')],
      'البرنامج طبع هدى مرتين. إيه السبب؟', ['city أخذت نسخة من name', 'السطر الأول اتقرأ مرتين من المدخلات', 'السطر الثاني لازم يكون رقمًا'],
      0, 'اقرأ سطرًا جديدًا داخل city باستخدام الاستدعاء الثاني.'),
    transfer: task('اقرأ item ثم color من سطرين «كتاب» ثم «أحمر». اطبع كل قيمة في سطر.', pair('كتاب\nأحمر', 'كتاب\nأحمر', ['item', 'color']))
  },
  {
    slug: 'end-of-input', title: 'فرّق بين سطر فارغ وانتهاء السطور', reference: readLine,
    scene: 'في تجربة أولى الورقة مافيهاش أي سطور. في تجربة تانية فيه سطر فاضي مكتوب فيه نهاية سطر بس.',
    sceneVisual: scene(['لا يوجد سطر', 'null'], ['سطر موجود وفارغ', '""'], ['السؤال', 'هل ended تساوي True؟']),
    concept: 'ReadLine ترجع null عند انتهاء كل السطور. لو قرأت سطرًا موجودًا من غير حروف، القيمة نص فارغ. الاختبار line == null يفرق بين الحالتين.',
    why: 'تحدد هل تكمّل قراءة البيانات أم انتهت.',
    mechanics: 'لو المدخلات خلصت تظهر رسالة انتهاء السطور. لو فيه Enter فقط تظهر قيمة السطر "" في التتبّع.',
    breakdown: ['اقرأ line.', 'افحص line == null.', 'اطبع نتيجة ended.'],
    build: task('اترك المدخلات فارغة. اقرأ line واحسب ended من line == null ثم اطبع ended.', eof('', 'True'),
      { attention: 'شوف هل ظهر رقم سطر في التتبّع.', rule: 'انتهاء المدخلات يرجع null. السطر الفارغ الموجود يرجع نصًا فارغًا.', help: 'اكتب bool ended = line == null;.' }),
    edit: task('اضغط Enter مرة واحدة داخل مربع المدخلات حتى يوجد سطر فارغ، ثم افحص ended.', eof('\n', 'False')),
    experiment: task('امسح المدخلات تمامًا وأعد التشغيل. اطبع هل انتهت السطور.', eof('', 'True')),
    bug: repair(eof('', 'True'), [read('line'), 'bool ended = line == "";', write('ended')],
      'عند غياب المدخلات تمامًا ظهر False. أي مقارنة تختبر انتهاء السطور؟', ['line == ""', 'line == null', 'line != null'],
      1, 'اختبر null لمعرفة أن السطر غير موجود.'),
    transfer: task('اكتب سطرًا واحدًا «عمر». اقرأ first ثم second. اطبع missing من second == null.',
      answer([read('first'), read('second'), 'bool missing = second == null;', write('missing')], 'عمر', 'True',
        [['نور\n', 'True'], ['نور\n\n', 'False'], ['نور\nالقاهرة', 'False']],
        { declared: ['first', 'second', 'missing'], printed: ['missing'], read: ['second'], operation: '==', operationIn: 'missing' }))
  },
  {
    slug: 'fallback-text', title: 'اختَر نصًا بديلًا عند null', reference: coalescing,
    scene: 'اعرض اسم الشخص إذا قرأت اسمًا. إذا خلصت السطور قبل ما تقرأ اسمًا، اعرض «زائر».',
    sceneVisual: scene(['اقرأ', 'القيمة الحالية'], ['لو القيمة null', 'اختَر زائر'], ['اعرض', 'الاسم الذي اخترته']),
    concept: 'المعامل ?? يقرأ الطرف الأيسر. لو رجع null يحسب الطرف الأيمن ويستخدمه. النص الفارغ قيمة موجودة، فيظل كما هو.',
    why: 'تعطي واجهة الحجز قيمة مفهومة عند غياب المدخل.',
    mechanics: 'في لقطة ?? يظهر هل استخدمت القيمة البديلة ولا تم تجاوزها.',
    breakdown: ['اقرأ raw.', 'احسب raw ?? "زائر".', 'احفظ القيمة المختارة في label واطبعها.'],
    build: task('اترك المدخل فارغًا تمامًا. اقرأ raw ثم احفظ raw ?? "زائر" في string اسمه label واطبع label.', label('', 'زائر'),
      { attention: 'القيمة البديلة تُستخدم لما raw تكون null.', rule: 'المعامل ?? يختار اليمين فقط عندما يكون اليسار null.', help: 'اكتب string label = raw ?? "زائر";.' }),
    edit: task('اكتب هدى في المدخلات، واترك نفس القيمة البديلة داخل الكود.', label('هدى', 'هدى')),
    experiment: task('امسح المدخلات وشغّل نفس الكود. راقب اسم الزائر.', label('', 'زائر')),
    bug: repair(label('هدى', 'هدى'), [read('raw'), 'string label = "زائر";', write('label')],
      'القيمة موجودة في raw، لكن البرنامج يختار زائر كل مرة. إيه التعديل؟', ['استخدم raw ?? "زائر"', 'احذف القراءة', 'اكتب الاسم يدويًا في label'],
      0, 'استخدم ?? بحيث يتوقف اختيار البديل على غياب المدخل.'),
    transfer: task('جهّز مدينة افتراضية «غير محددة». اقرأ raw واستعمل ?? لاختيار city، ثم اطبع city بدون مدخلات.',
      answer([read('raw'), 'string city = raw ?? "غير محددة";', write('city')], '', 'غير محددة', [['أسوان', 'أسوان'], ['\n', ''], ['', 'غير محددة']],
        { declared: ['raw', 'city'], printed: ['city'], operation: '??', operationIn: 'city' }))
  },
  {
    slug: 'try-parse-integer', title: 'جرّب تحويل النص إلى عدد', reference: tryParse,
    scene: 'جاء السطر «٣» مكتوبًا بصيغة 3. حاول استخراج عدد يصلح للحساب، وسجّل هل المحاولة نجحت.',
    sceneVisual: scene(['النص', '"3"'], ['نجحت؟', 'True'], ['العدد في out', '3']),
    concept: 'int.TryParse تعطي نتيجتين. تعيد bool للنجاح، وتضع العدد في out عند النجاح أو 0 عند الفشل. النص "0" ينجح ويعطي العدد صفر.',
    why: 'تختبر المدخل قبل إجراء الحساب حتى لو كتب المستخدم كلمة.',
    mechanics: 'تتغير خانتا valid وseats في نفس خطوة TryParse. راقب قيمتهما بعد كل حالة.',
    breakdown: ['اقرأ raw.', 'جرّب TryParse وضع العدد في out int seats.', 'اطبع valid ثم seats.'],
    build: task('اكتب 3 في المدخلات. اقرأ raw وجرّب int.TryParse. خزّن النجاح في valid والعدد في out int seats، ثم اطبعهما بالترتيب.', parsed('3', 'True\n3'),
      { attention: 'تابع valid والعدد كل واحد لوحده.', rule: 'TryParse ترجع النجاح وتسجل العدد في out.', help: 'اكتب bool valid = int.TryParse(raw, out int seats);.' }),
    edit: task('بدّل المدخل إلى كلمة ثلاثة. تابع valid وseats.', parsed('ثلاثة', 'False\n0')),
    experiment: task('اكتب النص 0. اطبع نتيجة المحاولة والعدد المخزّن.', parsed('0', 'True\n0')),
    bug: repair(parsed('0', 'True\n0'), [read('raw'), parse('raw', 'converted', 'seats'), 'bool valid = seats != 0;', write('valid'), write('seats')],
      'المدخل "0" عدد صحيح، لكن valid ظهرت False. إزاي تحدد النجاح؟', ['استخدم القيمة العائدة من TryParse', 'افترض أن أي صفر فشل', 'افحص هل seats أكبر من صفر'],
      0, 'خزّن bool التي تعيدها TryParse مباشرة، واحتفظ بـ seats من out.'),
    transfer: task('اقرأ النص -4 واحفظ رقم القياس في out int offset. اطبع valid ثم offset.', parsed('-4', 'True\n-4', 'offset'))
  },
  {
    slug: 'invalid-input-reply', title: 'اعرض ردًا واضحًا عند الإدخال الخاطئ', reference: selections,
    scene: 'لو قدرنا نقرأ عددًا، اعرضه في رسالة. لو وصلت كلمة، اطلب من المستخدم عددًا صحيحًا.',
    sceneVisual: scene(['المدخل', '3 أو كتاب'], ['اختبر', 'هل التحويل نجح؟'], ['الرد', 'اعرض العدد أو اطلب تصحيحًا']),
    concept: 'استخدم valid في if بعد TryParse. في مسار النجاح اعرض seats. في مسار الفشل اطلب إصلاح المدخل.',
    why: 'رسالة المخرجات تخبر المستخدم بالسبب عندما لا يمكن تحويل النص.',
    mechanics: 'يحدد valid السطر الذي سينفّذه الكمبيوتر. out = 0 في حالة الفشل لا تحدد صحة الإدخال وحدها.',
    breakdown: ['اقرأ النص وحاول تحويله.', 'اختبر valid داخل if.', 'اعرض العدد أو رسالة التصحيح.'],
    build: task('اكتب 4 في المدخلات. استخدم TryParse ثم if (valid) لعرض "عدد: " مع seats. استخدم else لعرض "أدخل عددًا صحيحًا".', reply('4', 'عدد: 4'),
      { attention: 'القرار يقرأ نتيجة التحويل.', rule: 'if (valid) تتبع نجاح TryParse، حتى عند قراءة الصفر.', help: 'ضع Console.WriteLine("عدد: " + seats); في جسم النجاح.' }),
    edit: task('اكتب أربعة بدل 4 وشغّل نفس القرار. تابع رسالة الفشل.', reply('أربعة', 'أدخل عددًا صحيحًا')),
    experiment: task('جرّب -2. تابع مسار النجاح في التحويل.', reply('-2', 'عدد: -2')),
    bug: repair(reply('0', 'عدد: 0'), reply('0', 'أدخل عددًا صحيحًا', 'seats != 0').solution.split('\n'),
      'عند إدخال 0 ظهر طلب تصحيح. عدّل الشرط إلى أي قيمة؟', ['valid', 'seats > 0', 'seats == 1'],
      0, 'اختبر valid عشان تفرق بين فشل التحويل والعدد الصحيح صفر.'),
    transfer: task('جرّب المدخل 7 بنفس بنية التحقق. تأكد أن الرسالة تستخدم العدد الذي قُرئ.', reply('7', 'عدد: 7'))
  },
  {
    slug: 'validate-positive-input', title: 'تحقّق من الحد بعد التحويل', reference: selections,
    scene: 'عند حجز مقعد، كتابة صفر ممكن تتحول لعدد بنجاح. قاعدة الحجز تقول إن الطلب يبدأ من مقعد واحد.',
    sceneVisual: scene(['النص', '0'], ['التحويل', 'نجح'], ['قاعدة الحجز', 'العدد يبدأ من ١']),
    concept: 'بعد التأكد من صحة التحويل، افحص نطاق العدد. افصل رسالة المدخل غير القابل للتحويل عن رسالة العدد خارج النطاق.',
    why: 'المستخدم يعرف هل يغيّر صيغة المدخل أو يغيّر العدد نفسه.',
    mechanics: 'لو نجح التحويل، التتبّع ينتقل إلى شرط quantity <= 0 لتحديد الرسالة.',
    breakdown: ['لو !valid اعرض رسالة التصحيح.', 'لو quantity <= 0 اعرض الحد الأدنى.', 'وإلا اعرض العدد المقبول.'],
    build: task('اكتب 0. اقرأ quantity باستخدام TryParse. عند الفشل اكتب "أدخل عددًا صحيحًا"، وإلا إذا كان quantity <= 0 اكتب "العدد يبدأ من 1"، وإلا اطبع "عدد مقبول: " مع quantity.', positive('0', 'العدد يبدأ من 1'),
      { attention: 'افحص نجاح التحويل قبل المجال.', rule: 'قواعد المجال تطبق على العدد بعد التحويل.', help: 'بعد if (!valid) استخدم else if (quantity <= 0).'}),
    edit: task('بدّل المدخل إلى 1 وشغّل نفس الكود.', positive('1', 'عدد مقبول: 1')),
    experiment: task('اكتب كلمة مقعد وشاهد الرسالة التي تخص فشل التحويل.', positive('مقعد', 'أدخل عددًا صحيحًا')),
    bug: repair(positive('0', 'العدد يبدأ من 1'), positive('0', 'عدد مقبول: 0', '<').solution.split('\n'),
      'البرنامج قبل الصفر، مع أن العدد يبدأ من 1. أي مقارنة تستبعد الصفر؟', ['quantity < 0', 'quantity <= 0', 'quantity > 0 في شرط الرفض'],
      1, 'استخدم <= في شرط الرفض عشان تشمل الصفر في العدد غير المقبول.'),
    transfer: task('جرّب العدد -2. اطبع الرد المناسب بعد اكتمال التحويل بنجاح.', positive('-2', 'العدد يبدأ من 1'))
  },
  {
    slug: 'input-booking', title: 'تطبيق حجز من مدخل المستخدم', reference: selections,
    scene: 'القاعة فيها ٦ مقاعد متاحة. وصل طلب من مربع المدخلات، والمطلوب رد واحد يناسب العدد.',
    sceneVisual: scene(['اقرأ', 'عدد المقاعد'], ['افحص', 'صيغة العدد والسعة'], ['اعرض', 'رسالة واحدة']),
    concept: 'اختبر التحويل أولًا، ثم الحد الأدنى، ثم السعة. إذا مر العدد من الفحوص الثلاثة، اطبع رسالة الحجز.',
    why: 'تجمع قراءة المدخل والتحويل والتأكد من القواعد في تطبيق واحد.',
    mechanics: 'شاهد نتيجة TryParse، ثم الشروط التي وصل إليها التنفيذ حتى تظهر رسالة واحدة.',
    breakdown: ['تأكد أن النص يمثل عددًا صحيحًا.', 'اختبر الحد الأدنى والسعة على الترتيب.', 'اعرض الرسالة المناسبة.'],
    projectContext: 'نموذج طلب مقاعد',
    build: task('اكتب 3 واحفظ السعة في available = 6. اقرأ seats باستخدام TryParse. اطبع "أدخل عددًا صحيحًا" إذا فشل، و"العدد يبدأ من 1" إذا كان seats <= 0، و"المقاعد غير كافية" إذا زاد على available، وإلا اطبع "تم الحجز: " مع seats.', booking('3', 'تم الحجز: 3'),
      { attention: 'اتحرك من الصيغة إلى الحد الأدنى ثم السعة.', rule: 'أول شرط متحقق يحدد رسالة الحجز.', help: 'اكتب if (!valid) ثم else if (seats <= 0) ثم else if (seats > available).'}),
    edit: task('غيّر المدخل إلى 6. اختبر الطلب عند السعة بالضبط.', booking('6', 'تم الحجز: 6')),
    experiment: task('اطلب 7 مقاعد وشاهد رفض الطلب الذي يتعدى السعة.', booking('7', 'المقاعد غير كافية')),
    bug: repair(booking('6', 'تم الحجز: 6'), booking('6', 'المقاعد غير كافية', { boundary: '>=' }).solution.split('\n'),
      'القاعة فيها ٦ والطلب ٦. أي شرط يرفض العدد الأكبر ويسمح بالمساوي؟', ['seats > available', 'seats >= available', 'seats < available'],
      0, 'استبعد التساوي من شرط الرفض، لأن طلب عدد المقاعد المتاحة بالضبط ممكن.'),
    transfer: task('جهّز قاعة تانية فيها ٤ مقاعد. استخدم نفس المسارات، وجرّب طلب 4 مقاعد.',
      booking('4', 'تم الحجز: 4', { available: 4, alternate: [['4', 'تم الحجز: 4'], ['5', 'المقاعد غير كافية'], ['0', 'العدد يبدأ من 1'], ['abc', 'أدخل عددًا صحيحًا']] }))
  }
];

let previousId = previous.id;
const built = lessons.map((spec, index) => {
  const lesson = makeLesson({
    ...spec,
    code: spec.build.solution,
    edit: { ...spec.edit, starterStdin: spec.build.stdin },
    experiment: { ...spec.experiment, starterStdin: spec.edit.stdin },
    skill: 'قراءة المدخلات والتحقق منها', sourcesReviewedAt: '2026-11-18'
  }, previous.order + index + 1, previousId, 'console-input-validation');
  previousId = lesson.id;
  return lesson;
});

module.exports = {
  data: {
    schemaVersion: '1.0.0', track: 'csharp', title: 'الوحدة الخامسة: اقرأ مدخلات واختَر الرد',
    description: 'قراءة السطور وnull و?? وTryParse وفحص المجال وتطبيق طلب مقاعد.',
    totalLessons: built.length, runtime: 'csharp-foundations-subset-v5', lessons: built
  }
};

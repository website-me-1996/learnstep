const { makeUnit, exercise, repair } = require('./lesson-builder.cjs');
const previous = require('./author-unit-05.cjs').data;
const reference = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements#the-while-statement';
const scene = (...items) => items.map(([label, value]) => ({ label, text: value }));
const source = (...parts) => parts.join('\n');

function ascending({ start, limit, step = 1, comparison = '<', finish = false }) {
  return source(
    'int start = ' + start + ';',
    'int limit = ' + limit + ';',
    'int i = start;',
    'while (i ' + comparison + ' limit)',
    '{',
    '    Console.WriteLine(i);',
    '    i = i + ' + step + ';',
    '}',
    ...(finish ? ['Console.WriteLine("تم");'] : [])
  );
}

const printCounter = { declared: ['start', 'limit', 'i'], updated: ['i'], loop: { kind: 'while', reads: ['i', 'limit'], effect: 'print' } };
const up = exercise(ascending, [
  [{ start: 2, limit: 2 }, []], [{ start: 1, limit: 4 }, [1, 2, 3]], [{ start: -1, limit: 1 }, [-1, 0]]
], printCounter);
const finish = exercise(input => ascending({ ...input, finish: true }), [
  [{ start: 6, limit: 5 }, ['تم']], [{ start: 1, limit: 3 }, [1, 2, 'تم']]
], printCounter);
const inclusive = exercise(input => ascending({ ...input, comparison: '<=' }), [
  [{ start: 3, limit: 3 }, [3]], [{ start: 4, limit: 3 }, []], [{ start: 2, limit: 4 }, [2, 3, 4]]
], printCounter);
const byTwo = exercise(input => ascending({ ...input, step: 2 }), [
  [{ start: 0, limit: 0 }, []], [{ start: 1, limit: 7 }, [1, 3, 5]], [{ start: 3, limit: 8 }, [3, 5, 7]]
], printCounter);

const descending = ({ remaining, update = 'remaining = remaining - 1;' }) => source(
  'int remaining = ' + remaining + ';', 'while (remaining > 0)', '{',
  '    Console.WriteLine(remaining);', '    ' + update, '}'
);
const down = exercise(descending, [
  [{ remaining: 0 }, []], [{ remaining: 1 }, [1]], [{ remaining: 5 }, [5, 4, 3, 2, 1]]
], { declared: ['remaining'], updated: ['remaining'], loop: { kind: 'while', reads: ['remaining'], effect: 'print' } });

const adding = ({ limit, update = 'total = total + i;' }) => source(
  'int limit = ' + limit + ';', 'int total = 0;', 'int i = 1;', 'while (i <= limit)', '{',
  '    ' + update, '    i = i + 1;', '}', 'Console.WriteLine(total);'
);
const sum = exercise(adding, [
  [{ limit: 0 }, [0]], [{ limit: 1 }, [1]], [{ limit: 5 }, [15]]
], { declared: ['limit', 'i', 'total'], updated: ['i', 'total'], printed: ['total'], loop: { kind: 'while', reads: ['i', 'limit'], effect: 'total' } });

const counting = ({ limit, minimum, comparison = '>=' }) => source(
  'int limit = ' + limit + ';', 'int minimum = ' + minimum + ';', 'int i = 1;', 'int matches = 0;',
  'while (i <= limit)', '{',
  '    if (i ' + comparison + ' minimum)', '    {', '        matches = matches + 1;', '    }',
  '    i = i + 1;', '}', 'Console.WriteLine(matches);'
);
const count = exercise(counting, [
  [{ limit: 5, minimum: 5 }, [1]], [{ limit: 5, minimum: 6 }, [0]], [{ limit: 0, minimum: 1 }, [0]]
], {
  declared: ['limit', 'minimum', 'i', 'matches'], updated: ['i', 'matches'], printed: ['matches'],
  branching: true, conditionReads: ['i', 'minimum'], loop: { kind: 'while', reads: ['i', 'limit'], effect: 'matches' }
});

const inventory = ({ stock, reserve, comparison = '>' }) => source(
  'int stock = ' + stock + ';', 'int reserve = ' + reserve + ';', 'int used = 0;',
  'while (stock ' + comparison + ' reserve)', '{', '    stock = stock - 1;', '    used = used + 1;', '}',
  'Console.WriteLine("مستخدم " + used);', 'Console.WriteLine("متبقي " + stock);'
);
const useStock = exercise(inventory, [
  [{ stock: 0, reserve: 0 }, ['مستخدم 0', 'متبقي 0']],
  [{ stock: 4, reserve: 1 }, ['مستخدم 3', 'متبقي 1']],
  [{ stock: 2, reserve: 3 }, ['مستخدم 0', 'متبقي 2']]
], { declared: ['stock', 'reserve', 'used'], updated: ['stock', 'used'], printed: ['stock', 'used'], loop: { kind: 'while', reads: ['stock', 'reserve'], effect: 'used' } });

const lessons = [
  {
    slug: 'first-while', title: 'افحص الشرط وارجع للسطر', reference,
    scene: 'ابدأ عند بطاقة رقم ٠. كل مرة اسأل هل الرقم أصغر من ٣. لو أيوه اطبع الرقم وحرّكه خانة ثم ارجع لنفس السؤال.',
    sceneVisual: scene(['العداد', '0'], ['الشرط', 'أصغر من 3؟'], ['بعد الطباعة', 'حرّك العداد وارجع']),
    concept: 'while تفحص الشرط قبل كل دورة. قيمة i تتحرك. limit تفضل 3. عند i = 3 الشرط يبقى False فتخرج من الحلقة.',
    why: 'هتعرف تقرأ مسار الحلقة من أول فحص لحد آخر فحص.',
    mechanics: 'تابع فحص الشرط ثم طباعة القيمة وتحديثها. لقطة الرجوع تحدد سطر الشرط مرة أخرى.',
    breakdown: ['ابدأ بالقيمة i = start.', 'افحص i < limit قبل الطباعة.', 'زِد i بمقدار 1 وارجع إلى سطر الشرط.'],
    build: up({ start: 0, limit: 3 }, [0, 1, 2], 'خزّن start = 0 وlimit = 3 وi = start. طالما i < limit اطبع i ثم زوّدها واحد.', {
      attention: 'اتّبع العداد الحالي من أول طباعة لحد العودة.',
      rule: 'while تعيد فحص الشرط بعد كل دورة.',
      help: 'اجعل سطر الطباعة قبل i = i + 1 داخل الأقواس.'
    }),
    edit: up({ start: 0, limit: 2 }, [0, 1], 'غيّر limit إلى 2 وتتبّع موضع التوقف.'),
    experiment: up({ start: 0, limit: 5 }, [0, 1, 2, 3, 4], 'جرّب limit = 5. توقّع أول قيمة توقف الحلقة ثم شغّل.'),
    bug: repair(up({ start: 0, limit: 3 }, [0, 1, 2], 'صحّح شرط التوقف.'), ascending({ start: 0, limit: 3, comparison: '<=' }),
      'المطلوب التوقف عند i = 3، لكن البرنامج طبَع 3. إيه المقارنة المناسبة؟',
      ['i < limit', 'i <= limit', 'i > limit'], 'استخدم i < limit حتى يفشل الشرط عند 3.'),
    transfer: up({ start: 4, limit: 7 }, [4, 5, 6], 'ابدأ من بطاقة 4 واطبع البطاقات قبل 7 بحلقة while. احتفظ بتحديث واحد بعد كل بطاقة.')
  },
  {
    slug: 'while-countdown', title: 'حرّك العداد بعد كل دورة', reference,
    scene: 'عندك ٣ قطع في الطابور. بعد عرض العدد المتبقي اسحب قطعة واحدة، وبعدين اسأل هل فيه قطع تانية.',
    sceneVisual: scene(['المتبقي', '3'], ['بعد سحب قطعة', '2'], ['التوقف', '0']),
    concept: 'كل دورة تغيّر remaining خطوة في اتجاه الصفر. لو القيمة ما اتغيّرتش يظل الشرط صحيحًا لحد ما المحاكي يوقف التنفيذ.',
    why: 'تقدر تشخّص حلقة بتكرر نفس القيمة.',
    mechanics: 'في سطر التحديث تظهر القيمة السابقة والجديدة، ثم يرجع التتبّع للشرط.',
    breakdown: ['ابدأ بالمخزون الحالي.', 'اعرض العدد إذا كان أكبر من 0.', 'اطرح قطعة واحدة وارجع للشرط.'],
    build: down({ remaining: 3 }, [3, 2, 1], 'خزّن remaining = 3. طالما فيه قطع اطبع العدد ثم اطرح واحد من remaining.', {
      attention: 'شوف العداد هيقرب من الصفر في أنهي اتجاه.',
      rule: 'remaining = remaining - 1 تجعل عدد القطع يقل كل دورة.',
      help: 'ضع الطرح بعد الطباعة داخل while (remaining > 0).'
    }),
    edit: down({ remaining: 2 }, [2, 1], 'ابدأ بقطعتين. افحص العدد بعد أول تحديث.'),
    experiment: down({ remaining: 4 }, [4, 3, 2, 1], 'ابدأ بأربع قطع. تابع التنازل إلى 1 ثم الخروج عند 0.'),
    bug: repair(down({ remaining: 3 }, [3, 2, 1], 'صحّح تحديث العداد.'), descending({ remaining: 3, update: 'remaining = remaining;' }),
      'الشرط يظل True والعدد يفضل 3. إيه الأمر اللي ينقص قطعة؟',
      ['remaining = remaining;', 'remaining = remaining - 1;', 'remaining = remaining + 1;'], 'اطرح واحدًا من remaining داخل جسم الحلقة قبل الرجوع للشرط.', 1),
    transfer: down({ remaining: 5 }, [5, 4, 3, 2, 1], 'شغّل عدًّا تنازليًا لخمسة صناديق. اطبع العدد قبل ما تنقص صندوقًا.')
  },
  {
    slug: 'while-zero-iterations', title: 'شاهد حالة صفر دورات', reference,
    scene: 'نقطة البداية عند ٣ والحد ٣. افحص السؤال قبل ما تدخل الصف. لو الشرط خطأ انتقل مباشرة للوحة النهاية.',
    sceneVisual: scene(['البداية', '3'], ['الفحص الأول', '3 < 3 → False'], ['المخرج', 'تم']),
    concept: 'الشرط الأول يحدد هل يبدأ الجسم أصلًا. عند بداية تساوي الحد في مقارنة < تُنفّذ الأوامر التي بعد الحلقة مباشرة.',
    why: 'تتأكد إن حالة مفيش عناصر ليها نتيجة واضحة.',
    mechanics: 'تظهر لقطة خروج من الشرط الأول. سطر الطباعة داخل الجسم يبهت، ثم يظهر «تم».',
    breakdown: ['قارن البداية بالحد.', 'تجاوز الجسم عند False.', 'نفّذ سطر «تم» بعد الحلقة.'],
    build: finish({ start: 3, limit: 3 }, ['تم'], 'خزّن start وlimit بقيمة 3. اطبع i داخل حلقة i < limit وحدثها. اطبع «تم» بعد الحلقة.', {
      attention: 'ابدأ بالفحص الأول قبل ما تتوقع أي طباعة.',
      rule: 'جسم while يعمل فقط عندما يكون الشرط True.',
      help: 'اجعل Console.WriteLine("تم"); بعد القوس الإغلاق.'
    }),
    edit: finish({ start: 2, limit: 3 }, [2, 'تم'], 'حرّك start إلى 2. شاهد دورة واحدة قبل «تم».'),
    experiment: finish({ start: 4, limit: 3 }, ['تم'], 'جرّب start = 4 وتوقّع أول سطر مطبوع.'),
    bug: repair(finish({ start: 3, limit: 3 }, ['تم'], 'استعد حالة صفر دورات.'), ascending({ start: 3, limit: 3, comparison: '<=', finish: true }),
      'البرنامج طبع 3 قبل «تم». إيه الشرط اللي يخلي الخروج يحصل من أول فحص؟',
      ['i <= limit', 'i == limit', 'i < limit'], 'استخدم i < limit. المساواة تفشل الشرط من أول فحص.', 2),
    transfer: finish({ start: 0, limit: 2 }, [0, 1, 'تم'], 'اختبر حالة فيها بطاقتان قبل الحد. اطبع 0 و1، وبعد الخروج اطبع «تم».')
  },
  {
    slug: 'while-inclusive-stop', title: 'قرّر هل الحد يدخل في العد', reference,
    scene: 'قائمة التذاكر المطلوبة تبدأ من ١ وتشمل التذكرة ٣. بعد طباعة التذكرة الأخيرة، عدّيها لحد ما الشرط يفشل.',
    sceneVisual: scene(['أول تذكرة', '1'], ['آخر تذكرة مسموحة', '3'], ['الخروج', 'عند 4']),
    concept: 'مع i <= limit تتنفّذ دورة عند التساوي. الدورة الأخيرة ترفع i فتكون نتيجة الفحص التالي False.',
    why: 'تضبط حد العد لما يكون آخر رقم جزءًا من المطلوب.',
    mechanics: 'راقب اللقطة التي فيها i وlimit متساويان، ثم لقطة الرجوع والفحص الذي ينهي الحلقة.',
    breakdown: ['حدّد أول رقم وآخر رقم مطلوب.', 'اسمح بالتساوي في الشرط.', 'حدّث i بعد طباعة الرقم الحالي.'],
    build: inclusive({ start: 1, limit: 3 }, [1, 2, 3], 'اطبع من start = 1 حتى limit = 3 داخل while. خلي الحد نفسه يتطبع.', {
      attention: 'اسأل هل التذكرة الأخيرة مطلوبة.',
      rule: 'المقارنة <= تسمح بدخول جسم الحلقة عند التساوي.',
      help: 'اكتب while (i <= limit) واحتفظ بالتحديث i = i + 1.'
    }),
    edit: inclusive({ start: 1, limit: 2 }, [1, 2], 'غيّر الحد الأخير إلى 2 وراقب فحص التساوي.'),
    experiment: inclusive({ start: 3, limit: 3 }, [3], 'ابدأ عند 3 واترك الحد 3 في تجربة دورة واحدة.'),
    bug: repair(inclusive({ start: 1, limit: 3 }, [1, 2, 3], 'ضمّن آخر تذكرة.'), ascending({ start: 1, limit: 3 }),
      'المطلوب يشمل تذكرة 3، لكن الناتج وقف عند 2. إيه اللي يضمّ الحد؟',
      ['i < limit', 'i <= limit', 'i > limit'], 'استخدم <= حتى تتم طباعة الحد قبل الخروج.', 1),
    transfer: inclusive({ start: 4, limit: 6 }, [4, 5, 6], 'اطبع أرقام المقاعد من 4 إلى 6 شاملًا الطرفين.')
  },
  {
    slug: 'while-running-total', title: 'اجمع قيمة جديدة كل دورة', reference,
    scene: 'أمامك حصالة فاضية وثلاث دفعات ١ و٢ و٣. كل دورة ضيف الدفعة الحالية للمجموع المخزّن.',
    sceneVisual: scene(['البداية', 'total = 0'], ['بعد الدفعة ٢', 'total = 3'], ['بعد الدفعة ٣', 'total = 6']),
    concept: 'total هو المجموع المحفوظ. i هي الإضافة الحالية. احسب total + i قبل تخزين القيمة الجديدة في نفس المتغير.',
    why: 'تجمع عددًا متغيرًا من القيم بحلقة واحدة.',
    mechanics: 'تابع total قبل الإضافة وبعدها، ثم تحديث i في سطر منفصل.',
    breakdown: ['جهّز total بصفر.', 'أضف i إلى المجموع القديم.', 'اطبع total مرة واحدة بعد الخروج.'],
    build: sum({ limit: 3 }, [6], 'خزّن limit = 3 وtotal = 0 وi = 1. اجمع i في total طالما i <= limit ثم اطبع total بعد الحلقة.', {
      attention: 'تابع مكان المجموع القديم في السطر.',
      rule: 'total = total + i تحتفظ بالمجموع السابق وتضيف قيمة الدورة.',
      help: 'داخل while اكتب total = total + i ثم i = i + 1.'
    }),
    edit: sum({ limit: 4 }, [10], 'اجمع لحد 4 بتغيير limit.'),
    experiment: sum({ limit: 2 }, [3], 'جرّب الجمع لحد 2. اكتب المجموع قبل التشغيل ثم قارن.'),
    bug: repair(sum({ limit: 3 }, [6], 'استعد تراكم المجموع.'), adding({ limit: 3, update: 'total = i;' }),
      'الناتج هو 3 بدل 6. ليه المجموع القديم اختفى في كل دورة؟',
      ['total = i تستبدل المجموع بالقيمة الحالية', 'i تبدأ من 1', 'الطباعة بعد الحلقة'], 'اكتب total = total + i حتى تستفيد من المجموع المخزّن.'),
    transfer: sum({ limit: 6 }, [21], 'احسب مبلغ دفعات من 1 إلى 6. اطبع رقمًا واحدًا من متغير total.')
  },
  {
    slug: 'while-count-matches', title: 'عدّ الأرقام التي تحقق الشرط', reference,
    scene: 'راجع البطاقات من ١ إلى ٥. كل مرة تقابل بطاقة رقمها ٣ أو أكبر، اعمل علامة في سجل العدد.',
    sceneVisual: scene(['البطاقات', '1 · 2 · 3 · 4 · 5'], ['المقبولة', '3 · 4 · 5'], ['العدد', '3']),
    concept: 'i تتحرك مع كل بطاقة. matches تتحرك فقط في فرع if الذي يقبل البطاقة. النتيجة تحسب عدد البطاقات المقبولة.',
    why: 'تفصل بين مؤشر المرور وعداد النتائج.',
    mechanics: 'في دورة مرفوضة يتجاوز التتبّع تحديث matches ويستمر إلى تحديث i.',
    breakdown: ['مرّ على الأرقام باستخدام i.', 'إذا تحقق i >= minimum زوّد matches واحدًا.', 'اطبع matches بعد آخر فحص.'],
    build: count({ limit: 5, minimum: 3 }, [3], 'مرّ من 1 إلى limit = 5. زوّد matches فقط إذا كانت i >= minimum = 3. اطبع العدد النهائي.', {
      attention: 'حدّد أي متغير يتحرك في كل دورة وأي متغير يتحرك عند القبول.',
      rule: 'ضع تحديث matches داخل if وتحديث i بعد كتلة if.',
      help: 'اكتب matches = matches + 1 داخل { } للشرط i >= minimum.'
    }),
    edit: count({ limit: 5, minimum: 4 }, [2], 'ارفع minimum إلى 4 وشوف إيه اللي يتغير في matches.'),
    experiment: count({ limit: 5, minimum: 6 }, [0], 'جرّب minimum = 6. شوف هل المرور انتهى رغم عدم القبول.'),
    bug: repair(count({ limit: 5, minimum: 3 }, [3], 'ضمّن حالة مساواة الحد.'), counting({ limit: 5, minimum: 3, comparison: '>' }),
      'المطلوب يقبل من 3، لكن البطاقة 3 لم تعدّ. إيه المقارنة؟',
      ['i > minimum', 'i == limit', 'i >= minimum'], 'استخدم >= عشان تحسب البطاقة الأولى المقبولة كمان.', 2),
    transfer: count({ limit: 8, minimum: 6 }, [3], 'عدّ الأرقام 6 أو أكبر بين 1 و8. اطبع عدد الأرقام المقبولة.')
  },
  {
    slug: 'while-step-size', title: 'غيّر مسافة حركة العداد', reference,
    scene: 'في الطابور عايز تنادي البطاقات ٠، ٢، ٤. بعد كل نداء امشِ خطوتين للبطاقة التالية.',
    sceneVisual: scene(['ابدأ', '0'], ['الحركة', '+2'], ['قبل الحد 6', '0 · 2 · 4']),
    concept: 'قيمة التحديث تحدد الأرقام التي يمر عليها العداد. مع i = i + 2، تنتقل القيم بمقدار اثنين كل مرة.',
    why: 'تقرأ نمط التنقّل وتفصل بين خطوة العداد وحد التوقف.',
    mechanics: 'راقب فرق القيمة بين لقطتين متتاليتين لسطر التحديث قبل الرجوع.',
    breakdown: ['اختر start.', 'اطبع عند تحقق الشرط.', 'حرّك i بمقدار 2 وارجع.'],
    build: byTwo({ start: 0, limit: 6 }, [0, 2, 4], 'ابدأ من 0 واطبع i قبل limit = 6. زوّد i بمقدار 2 كل مرة.', {
      attention: 'بص على المسافة من قيمة i للقيمة التالية.',
      rule: 'التحديث يحدد قيم المرور. الشرط يحدد لحظة التوقف.',
      help: 'احتفظ بـ i < limit واكتب i = i + 2.'
    }),
    edit: byTwo({ start: 1, limit: 6 }, [1, 3, 5], 'غيّر start فقط إلى 1. تابع نفس المسافة بين القيم.'),
    experiment: byTwo({ start: 1, limit: 8 }, [1, 3, 5, 7], 'اترك start = 1 وارفع limit إلى 8.'),
    bug: repair(byTwo({ start: 0, limit: 6 }, [0, 2, 4], 'حرّك العداد خانتين.'), ascending({ start: 0, limit: 6 }),
      'النتيجة تنادي كل البطاقات. أي تحديث ينقل العداد خانتين؟',
      ['i = i + 2;', 'i = i + 1;', 'i = 2;'], 'استخدم القيمة الحالية من i وأضف إليها 2.'),
    transfer: byTwo({ start: 3, limit: 10 }, [3, 5, 7, 9], 'اطبع من 3 قبل 10 بحركة خانتين في كل دورة.')
  },
  {
    slug: 'while-inventory', title: 'تطبيق احتياطي المخزون', reference,
    scene: 'في المخزن ٥ قطع. هنستخدم قطعة في كل دورة ونقف لما يفضل قطعتين احتياطي.',
    sceneVisual: scene(['المخزون', '5'], ['الاحتياطي', '2'], ['الناتج', '3 مستخدمة و2 متبقية']),
    concept: 'stock تقل مع الاستخدام. used تزيد. الشرط stock > reserve يحفظ الاحتياطي عند توقف الحلقة.',
    why: 'تطبق العد والتحديث والحد في عملية مخزون كاملة.',
    mechanics: 'تابع stock وused بعد كل قطعة. reserve ثابت أثناء التنفيذ.',
    breakdown: ['اختبر هل المخزون أعلى من الاحتياطي.', 'اطرح واحدة من stock وزوّد used.', 'اطبع المستخدم والمتبقي بعد الخروج.'],
    build: useStock({ stock: 5, reserve: 2 }, ['مستخدم 3', 'متبقي 2'], 'خزّن stock = 5 وreserve = 2 وused = 0. استخدم قطعة طالما stock أكبر من reserve. اطبع سطر «مستخدم » وسطر «متبقي » مع القيمتين.', {
      attention: 'راقب القيمتين بعد خصم القطعة.',
      rule: 'تتحرك used وstock في اتجاهين متعاكسين إلى أن يفشل الشرط.',
      help: 'اجعل stock = stock - 1 وused = used + 1 جسم while (stock > reserve).'
    }),
    edit: useStock({ stock: 5, reserve: 3 }, ['مستخدم 2', 'متبقي 3'], 'ارفع الاحتياطي إلى 3 وأعد تشغيل نفس العملية.'),
    experiment: useStock({ stock: 3, reserve: 3 }, ['مستخدم 0', 'متبقي 3'], 'ابدأ بمخزون مساوي للاحتياطي. توقّع عدد القطع المستخدمة.'),
    bug: repair(useStock({ stock: 5, reserve: 2 }, ['مستخدم 3', 'متبقي 2'], 'حافظ على قطعتين احتياطي.'), inventory({ stock: 5, reserve: 2, comparison: '>=' }),
      'المخزون نزل إلى 1 بدل 2. أي شرط يوقف الاستخدام عند الاحتياطي؟',
      ['stock >= reserve', 'stock > reserve', 'stock != 0'], 'استخدم > حتى يخرج البرنامج عندما يصبح المتبقي مساويًا للاحتياطي.', 1),
    transfer: useStock({ stock: 7, reserve: 4 }, ['مستخدم 3', 'متبقي 4'], 'طبّق نفس العملية على ٧ قطع واحتياطي ٤. احفظ التقرير النهائي.')
  }
].map(lesson => ({ ...lesson, code: lesson.build.solution, projectContext: 'تتبّع دفعات ومخزون' }));

module.exports = { data: makeUnit({
  id: 'loop-foundations', previous, lessons,
  title: 'الوحدة السادسة: امشِ مع حلقة while',
  description: 'فحص الشرط، العودة، تحديث العداد، حدود العد، الجمع والعد بشرط.',
  skill: 'حلقة while والعدادات', runtime: 'csharp-foundations-subset-v6'
}) };

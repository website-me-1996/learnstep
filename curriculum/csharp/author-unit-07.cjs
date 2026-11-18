const { makeUnit, exercise, repair } = require('./lesson-builder.cjs');
const previous = require('./author-unit-06.cjs').data;
const iteration = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements';
const jump = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/jump-statements';
const arithmetic = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators';
const scene = (...items) => items.map(([label, value]) => ({label, text:value}));
const source = (...parts) => parts.join('\n');

function interval({ start, limit, condition = 'i < limit', update = 'i = i + 1' }) {
  return source(
    'int start = ' + start + ';', 'int limit = ' + limit + ';',
    'for (int i = start;', '     ' + condition + ';', '     ' + update + ')',
    '{', '    Console.WriteLine(i);', '}'
  );
}
const rangeCases = [
  [{ start:2, limit:2 }, []], [{ start:3, limit:6 }, [3,4,5]], [{ start:-1, limit:1 }, [-1,0]]
];
const rangeChecks = {declared:['start','limit'], updated:['i'], loop:{kind:'for',reads:['i','limit'],effect:'print'}};
const range = exercise(interval, rangeCases, rangeChecks);
const short = exercise(args => interval({...args, update:'i++'}), rangeCases, {
  ...rangeChecks, operation:'++', operationIn:'i'
});
const down = exercise(args => interval({...args, condition:'i >= limit', update:'i--'}), [
  [{start:3,limit:3},[3]], [{start:2,limit:4},[]], [{start:1,limit:-1},[1,0,-1]]
], {...rangeChecks, operation:'--', operationIn:'i'});

function withJump({ limit, marker, command }) {
  return source(
    'int limit = ' + limit + ';', 'int marker = ' + marker + ';',
    'for (int i = 0; i < limit; i++)', '{', '    if (i == marker)', '    {',
    '        ' + command + ';', '    }', '    Console.WriteLine(i);', '}', 'Console.WriteLine("تم");'
  );
}
const jumpChecks = {declared:['limit','marker'], branching:true, conditionReads:['i','marker']};
const stop = exercise(args => withJump({...args, command:'break'}), [
  [{limit:4,marker:0},['تم']], [{limit:4,marker:2},[0,1,'تم']], [{limit:3,marker:7},[0,1,2,'تم']]
], {...jumpChecks, loop:{kind:'for',reads:['i','limit'],effect:'print',jumps:['break']}});
const skip = exercise(args => withJump({...args, command:'continue'}), [
  [{limit:1,marker:0},['تم']], [{limit:4,marker:2},[0,1,3,'تم']], [{limit:3,marker:8},[0,1,2,'تم']]
], {...jumpChecks, loop:{kind:'for',reads:['i','limit'],effect:'print',jumps:['continue']}});

const grid = ({ rows, columns, firstColumn = 1 }) => source(
  'int rows = ' + rows + ';', 'int columns = ' + columns + ';',
  'for (int row = 1; row <= rows; row++)', '{',
  '    for (int col = ' + firstColumn + '; col <= columns; col++)', '    {',
  '        Console.WriteLine(row + "-" + col);', '    }', '}'
);
const seats = exercise(grid, [
  [{rows:0,columns:3},[]], [{rows:3,columns:0},[]], [{rows:1,columns:2},['1-1','1-2']],
  [{rows:2,columns:1},['1-1','2-1']]
], {declared:['rows','columns'], loop:{kind:'for',depth:2,reads:['col','columns'],effect:'print'}});

function values({ points, print = 'point' }) {
  return source(
    'int[] points = { ' + points.join(', ') + ' };',
    'foreach (int point in points)', '{', '    Console.WriteLine(' + print + ');', '}'
  );
}
const readList = exercise(values, [
  [{points:[]},[]], [{points:[0]},[0]], [{points:[9,9,-2]},[9,9,-2]]
], {declared:['points'], loop:{kind:'foreach',reads:['points'],effect:'print'}});

const cargo = ({ loads, minimum, comparison = '<' }) => source(
  'int[] loads = { ' + loads.join(', ') + ' };', 'int minimum = ' + minimum + ';', 'int total = 0;',
  'foreach (int load in loads)', '{', '    if (load ' + comparison + ' minimum)', '    {',
  '        continue;', '    }', '    total += load;', '}', 'Console.WriteLine(total);'
);
const weigh = exercise(cargo, [
  [{loads:[],minimum:3},[0]], [{loads:[1,2],minimum:3},[0]], [{loads:[3,6,1],minimum:3},[9]]
], {
  declared:['loads','minimum','total'], printed:['total'], updated:['total'], branching:true, conditionReads:['load','minimum'],
  loop:{kind:'foreach',reads:['loads'],effect:'total',jumps:['continue']}
});

const lessons = [
  {
    slug:'for-header', title:'رتّب أجزاء رأس for', reference:iteration + '#the-for-statement',
    scene:'جهّز البطاقة الأولى مرة واحدة. بعدها كرر الفحص ثم النداء ثم الحركة للبطاقة التالية.',
    sceneVisual:scene(['مرة واحدة','ابدأ من 0'], ['في كل دورة','افحص ثم اطبع'], ['بعد الجسم','زِد العداد ثم ارجع']),
    concept:'في رأس for ثلاث خانات. التهيئة تحصل مرة واحدة. بعد كل جسم يحصل التحديث، ثم يعود الكمبيوتر للشرط.',
    why:'تجمع أوامر العد في رأس واحد ويسهل تشوف البداية والحد والحركة.',
    mechanics:'راقب لقطة التهيئة ثم الشرط والجسم. ارجع لقطة بعد التحديث لتشوف قيمة i قبل الزيادة.',
    breakdown:['هيئ i من start مرة واحدة.', 'افحص i < limit كل مرة.', 'بعد الطباعة نفّذ i = i + 1.'],
    build:range({start:0, limit:3},[0,1,2],'خزّن start = 0 وlimit = 3. اكتب for تهيئ i من start وتقارن i < limit وتنفّذ i = i + 1 بعد طباعة i.',{
      attention:'تابع أي جزء في الرأس يعمل مرة واحدة.',
      rule:'الترتيب تهيئة ثم فحص ثم جسم ثم تحديث ثم عودة للفحص.',
      help:'اكتب for (int i = start; i < limit; i = i + 1).'
    }),
    edit:range({start:0,limit:2},[0,1],'قلّل limit إلى 2 وتتبّع آخر فحص.'),
    experiment:range({start:2,limit:5},[2,3,4],'ابدأ من 2 والحد 5. تابع وقت تهيئة i.'),
    bug:repair(range({start:0,limit:3},[0,1,2],'صحّح الحد.'), interval({start:0,limit:3,condition:'i <= limit'}),
      'ظهر الرقم 3 رغم إن المطلوب التوقف قبله. أي جزء من الرأس يحتاج تغيير؟',
      ['الشرط إلى i < limit','التهيئة إلى i = 3','التحديث إلى i = i + 2'],'صحّح الشرط إلى i < limit.'),
    transfer:range({start:4,limit:8},[4,5,6,7],'نادِ أرقامًا من 4 حتى قبل 8 في حلقة for.')
  },
  {
    slug:'for-increment', title:'اقرأ i++ كتحديث بعد الجسم', reference:arithmetic + '#increment-operator-',
    scene:'بعد كل بطاقة هتتحرك خانة واحدة. المكان المخصص للحركة في نهاية رأس for.',
    sceneVisual:scene(['الحركة الكاملة','i = i + 1'], ['نفس الحركة في الرأس','i++'], ['لحظة التنفيذ','بعد طباعة البطاقة']),
    concept:'في خانة التحديث وحدها، i++ تزيد i بمقدار 1. لقطة التحديث تفضل في نفس ترتيب التنفيذ بعد الجسم.',
    why:'تقدر تقرأ الصيغة القصيرة الشائعة من غير ما تفقد مكان التحديث.',
    mechanics:'التتبّع يضيء خانة i++ بعد سطر الطباعة ويعرض تغير العداد.',
    breakdown:['ابدأ i من start.', 'اطبع i طالما أقل من limit.', 'استخدم i++ في خانة التحديث.'],
    build:short({start:1,limit:4},[1,2,3],'اطبع i من start = 1 إلى ما قبل limit = 4. استخدم i++ داخل رأس for.',{
      attention:'تابع i++ في اللقطة بعد الطباعة.',
      rule:'i++ في هذا الموضع تعني زِد العداد 1.',
      help:'اكتب for (int i = start; i < limit; i++).'
    }),
    edit:short({start:2,limit:4},[2,3],'حرّك start إلى 2 وشاهد عدد الدورات.'),
    experiment:short({start:0,limit:4},[0,1,2,3],'ابدأ عند 0. تأكد إن أول رقم مطبوع هو 0.'),
    bug:repair(short({start:1,limit:4},[1,2,3],'صحّح خانة التحديث.'), interval({start:1,limit:4,update:'i = i + 2'}),
      'تظهر 1 ثم 3. أي تحديث يطبع كل بطاقة بالتتابع؟',
      ['i = i + 2','i++','i--'],'استخدم i++ حتى تتحرك خانة واحدة بعد كل دورة.',1),
    transfer:short({start:3,limit:7},[3,4,5,6],'استخدم i++ لنداء البطاقات من 3 قبل 7.')
  },
  {
    slug:'for-countdown', title:'عدّ لأسفل باستخدام i--', reference:arithmetic + '#decrement-operator---',
    scene:'لوحة البدء تعرض ٤ ثم ٣ ثم ٢. بعد كل رقم انزل خانة، ولما العدد يبقى أصغر من ٢ اخرج.',
    sceneVisual:scene(['البداية','4'], ['الحركة','i--'], ['الحد المسموح','2']),
    concept:'في العد التنازلي، i-- تنقص 1 بعد الجسم. المقارنة i >= limit تسمح بطباعة limit نفسه.',
    why:'تختار حركة وشرط يوصلوا لنفس نهاية المسار.',
    mechanics:'في كل تحديث، i تقل وتقترب من الحد. عند نزولها تحت الحد تظهر لقطة الخروج.',
    breakdown:['ابدأ من الرقم الأكبر.', 'اطبع أثناء i >= limit.', 'انقص i باستخدام i--.'],
    build:down({start:4,limit:2},[4,3,2],'خزّن start = 4 وlimit = 2. اطبع تنازليًا حتى 2 بداخل for واستخدم i--.',{
      attention:'تأكد من اتجاه الحركة بعد طباعة الرقم.',
      rule:'i-- تنقص العداد بعد الجسم في هذا المثال.',
      help:'اكتب for (int i = start; i >= limit; i--).'
    }),
    edit:down({start:3,limit:2},[3,2],'ابدأ من 3 بدل 4.'),
    experiment:down({start:2,limit:2},[2],'ابدأ عند الحد نفسه. تابع دورة واحدة.'),
    bug:repair(down({start:4,limit:2},[4,3,2],'أعد الرقم الأخير.'), interval({start:4,limit:2,condition:'i > limit',update:'i--'}),
      'ظهر 4 ثم 3، والمطلوب يشمل 2. أي شرط مناسب؟',
      ['i > limit','i <= limit','i >= limit'],'اسمح بالتساوي مع i >= limit حتى يتم تنفيذ الدورة الأخيرة.',2),
    transfer:down({start:2,limit:-1},[2,1,0,-1],'اطبع تنازليًا من 2 حتى -1 شاملًا الرقمين.')
  },
  {
    slug:'for-break', title:'اخرج فورًا باستخدام break', reference:jump + '#the-break-statement',
    scene:'بتنادي بطاقات في طابور، وعند بطاقة رقم ٣ وصل أمر إيقاف النداء. بعدها اكتب «تم».',
    sceneVisual:scene(['قبل الإيقاف','0 · 1 · 2'], ['علامة الإيقاف','3'], ['الانتقال','أول أمر بعد الحلقة']),
    concept:'break تخرج من أقرب حلقة. لما يتحقق i == marker يقف النداء ويقف تحديث عداد الحلقة دي.',
    why:'توقف عملية البحث أو المرور عند العثور على إشارة نهاية.',
    mechanics:'يظهر السطر بعد الحلقة كوجهة الانتقال عند break.',
    breakdown:['افحص i == marker قبل الطباعة.', 'إذا تحقق، نفّذ break.', 'عند الخروج اطبع «تم».'],
    build:stop({limit:5,marker:3},[0,1,2,'تم'],'خزّن limit = 5 وmarker = 3. اطبع الأرقام قبل marker بحلقة for واستخدم break عند المساواة. اطبع «تم» بعد الحلقة.',{
      attention:'تابع الموضع التالي لما توصل للعلامة.',
      rule:'break تنهي الحلقة الحالية فورًا.',
      help:'ضع if (i == marker) { break; } قبل Console.WriteLine(i).'
    }),
    edit:stop({limit:5,marker:1},[0,'تم'],'حرّك علامة الإيقاف إلى 1 واختبر الخروج المبكر.'),
    experiment:stop({limit:5,marker:8},[0,1,2,3,4,'تم'],'ضع العلامة عند 8 وشاهد نهاية العد الطبيعية عند الحد.'),
    bug:repair(stop({limit:5,marker:3},[0,1,2,'تم'],'أوقف النداء عند العلامة.'), withJump({limit:5,marker:3,command:'continue'}),
      'البرنامج تخطّى 3 وكمّل نداء 4. أي أمر يوقف الحلقة كلها عند 3؟',
      ['continue;','i++;','break;'],'استبدل continue بـ break داخل الشرط.',2),
    transfer:stop({limit:6,marker:2},[0,1,'تم'],'توقّف عند بطاقة 2 ثم أكد انتهاء النداء بسطر «تم».')
  },
  {
    slug:'for-continue', title:'تجاوز دورة واحدة باستخدام continue', reference:jump + '#the-continue-statement',
    scene:'بطاقة ٢ عليها علامة «تخطَّها». اطبع كل الأرقام الباقية في الطابور.',
    sceneVisual:scene(['اطبع قبل العلامة','0 · 1'], ['تجاوز','2'], ['كمّل بعد العلامة','3 · 4']),
    concept:'continue تتجاوز بقية جسم الدورة الحالية. داخل for يتنفّذ التحديث، ثم يُفحص الشرط للدورة التالية.',
    why:'تستبعد قيمة واحدة من المرور وتكمل مع بقية القيم.',
    mechanics:'من continue ينتقل المؤشر لجزء التحديث داخل الرأس قبل الفحص من جديد.',
    breakdown:['قارن i بالعلامة.', 'استخدم continue عند المساواة.', 'تابع i++ ثم الشرط لتكمل.'],
    build:skip({limit:5,marker:2},[0,1,3,4,'تم'],'خزّن limit = 5 وmarker = 2. اطبع الأرقام من 0 قبل limit، وتجاوز marker باستخدام continue. اطبع «تم» بعد الحلقة.',{
      attention:'لاحظ هل العداد يتحرك بعد continue.',
      rule:'continue تتجاوز بقية الجسم ثم يحدث عداد for.',
      help:'ضع if (i == marker) { continue; } قبل الطباعة.'
    }),
    edit:skip({limit:5,marker:0},[1,2,3,4,'تم'],'تجاوز البطاقة الأولى بتغيير marker إلى 0.'),
    experiment:skip({limit:5,marker:4},[0,1,2,3,'تم'],'جرّب تجاوز البطاقة الأخيرة. راقب التحديث ثم فشل الشرط.'),
    bug:repair(skip({limit:5,marker:2},[0,1,3,4,'تم'],'تجاوز البطاقة المحددة فقط.'),withJump({limit:5,marker:2,command:'break'}),
      'الناتج اختفى بعد 1. عايز تتخطى 2 وتكمل لحد 4. إيه الأمر المناسب؟',
      ['break;','continue;','i = marker;'],'استخدم continue عشان تنقل التنفيذ للدورة التالية بعد التحديث.',1),
    transfer:skip({limit:6,marker:3},[0,1,2,4,5,'تم'],'اطبع قبل 6 مع تخطي 3، ثم اطبع «تم».')
  },
  {
    slug:'nested-for-rows', title:'ثبّت الصف وحرّك العمود', reference:iteration + '#the-for-statement',
    scene:'في قاعة صغيرة صفين وكل صف فيه مقعدين. امشِ على مقاعد الصف الأول بالكامل وبعدين انتقل للتاني.',
    sceneVisual:scene(['صف 1','1-1 ثم 1-2'], ['لحظة الانتقال','العمود يعود إلى 1'], ['صف 2','2-1 ثم 2-2']),
    concept:'العداد الخارجي row يحدد الصف. في كل دورة له، الحلقة الداخلية تبدأ col من 1 وتزور أعمدة الصف.',
    why:'تفهم ترتيب المرور على جدول قبل استخدام مصفوفة ثنائية.',
    mechanics:'في لقطة المستوى 2، تابع col وهي تتحرك وrow ثابت. عند الانتقال للصف التالي شاهد تهيئة col من البداية.',
    breakdown:['ثبّت قيمة row في الحلقة الخارجية.', 'شغّل الحلقة الداخلية على الأعمدة.', 'ابدأ من أول عمود عندما يتغير الصف.'],
    build:seats({rows:2,columns:2},['1-1','1-2','2-1','2-2'],'خزّن rows = 2 وcolumns = 2. اطبع row + "-" + col لكل مقعد بحلقتين for تبدأ عداداتهما من 1.',{
      attention:'بص على col عندما يبدأ الصف الثاني.',
      rule:'كل دورة خارجية تبدأ تنفيذ الحلقة الداخلية من خانة التهيئة.',
      help:'ضع for (int col = 1; col <= columns; col++) داخل جسم حلقة row.'
    }),
    edit:seats({rows:2,columns:1},['1-1','2-1'],'قلّل الأعمدة إلى 1 واترك الصفين.'),
    experiment:seats({rows:1,columns:3},['1-1','1-2','1-3'],'جرّب صفًا واحدًا وثلاثة أعمدة. اكتب ترتيب المقاعد المتوقع.'),
    bug:repair(seats({rows:2,columns:2},['1-1','1-2','2-1','2-2'],'ابدأ ترقيم المقاعد من 1.'),grid({rows:2,columns:2,firstColumn:0}),
      'ظهر مقعد رقم عموده 0 في كل صف. أي تهيئة توافق ترقيم القاعة؟',
      ['int col = 0','int row = 0','int col = 1'],'ابدأ col من 1 داخل رأس الحلقة الداخلية.',2),
    transfer:seats({rows:3,columns:2},['1-1','1-2','2-1','2-2','3-1','3-2'],'اطبع ترتيب المقاعد في 3 صفوف وعمودين.')
  },
  {
    slug:'foreach-values', title:'اقرأ قيمة وراء قيمة باستخدام foreach', reference:iteration + '#the-foreach-statement',
    scene:'صف فيه ثلاث بطاقات قيمها ٤ و٩ و١٢. خذ كل بطاقة بقيمتها واطبعها مرة واحدة.',
    sceneVisual:scene(['البطاقة الأولى','4'], ['البطاقة الثانية','9'], ['البطاقة الثالثة','12']),
    concept:'foreach تضع قيمة العنصر الحالي في point. مع المصفوفة points تقرأ القيم حسب ترتيبها، وتخرج بعد آخر عنصر.',
    why:'تمر على قيم مجموعة مباشرة عندما تكون القيمة هي المطلوبة.',
    mechanics:'تابع لقطة «اقرأ العنصر» وراقب point تستقبل قيمة جديدة كل دورة.',
    breakdown:['جهز مصفوفة int[] قصيرة بالقيم.', 'استخدم foreach (int point in points).', 'اطبع point في الجسم.'],
    build:readList({points:[4,9,12]},[4,9,12],'جهّز int[] points = { 4, 9, 12 }. اطبع point لكل قيمة باستخدام foreach.',{
      attention:'تابع قيمة point وهي تنتقل للقيمة التالية.',
      rule:'point تمثل عنصرًا واحدًا، وpoints هي المصفوفة كلها.',
      help:'اكتب foreach (int point in points) { Console.WriteLine(point); }.'
    }),
    edit:readList({points:[4,12]},[4,12],'احذف 9 من المصفوفة. شاهد دورة أقل.'),
    experiment:readList({points:[9,9,12]},[9,9,12],'جرّب قيمتين متساويتين. راقب طباعتهما في دورتين.'),
    bug:repair(readList({points:[4,9,12]},[4,9,12],'اطبع كل قيمة فعلية.'),values({points:[4,9,12],print:'4'}),
      'كل الدورات بتطبع 4. أنهي أمر يطبع قيمة البطاقة الحالية؟',
      ['Console.WriteLine(point);','Console.WriteLine(4);','Console.WriteLine(points.Length);'],'استخدم point. الحلقة تضع فيه قيمة العنصر الحالي.'),
    transfer:readList({points:[0,-2,7]},[0,-2,7],'استخدم foreach لعرض قيم 0 و-2 و7 من نفس المصفوفة.')
  },
  {
    slug:'foreach-cargo-total', title:'تطبيق مجموع الشحنات المقبولة', reference:iteration + '#the-foreach-statement',
    scene:'في سجل الشحن ثلاث أوزان ٢ و٣ و٥. اترك الأوزان الأقل من ٣ خارج المجموع، واجمع المقبول.',
    sceneVisual:scene(['تجاوز','2'], ['أضف','3 ثم 5'], ['المجموع','8']),
    concept:'اقرأ الوزن في foreach. إذا كان أقل من minimum استخدم continue. باقي الأوزان تتجمع في total.',
    why:'تجمع المرور على المجموعة مع قرار واضح داخل كل دورة.',
    mechanics:'شاهد انتقال continue للعنصر التالي، ثم تحديث total في دورة مقبولة.',
    breakdown:['اقرأ وزن الشحنة الحالية.', 'تجاوز ما دون الحد باستخدام continue.', 'أضف المقبول واطبع المجموع بعد الحلقة.'],
    build:weigh({loads:[2,3,5],minimum:3},[8],'خزّن loads = { 2, 3, 5 } وminimum = 3 وtotal = 0. مرّ بـ foreach، وتجاوز load < minimum. اطبع مجموع المقبول.',{
      attention:'اختبر الشحنة التي وزنها يساوي الحد.',
      rule:'continue تتجاوز الإضافة في الدورة المرفوضة.',
      help:'اكتب if (load < minimum) { continue; } ثم total += load.'
    }),
    edit:weigh({loads:[2,3,5],minimum:4},[5],'ارفع حد القبول إلى 4. تتبّع شحنة واحدة مقبولة.'),
    experiment:weigh({loads:[2,4,5],minimum:4},[9],'استبدل الوزن 3 بالوزن 4. شوف أثر المساواة في المجموع.'),
    bug:repair(weigh({loads:[2,3,5],minimum:3},[8],'احسب الشحنة عند الحد.'),cargo({loads:[2,3,5],minimum:3,comparison:'<='}),
      'المجموع 5 رغم قبول وزن 3 في المطلوب. أي شرط يتجاوز الأوزان الأصغر فقط؟',
      ['load <= minimum','load < minimum','load > minimum'],'استخدم < داخل شرط continue حتى يتم جمع الوزن المساوي للحد.',1),
    transfer:weigh({loads:[1,4,6],minimum:4},[10],'طبّق العملية على 1 و4 و6 بحد قبول 4. اطبع مجموع المقبول.')
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'تنظيم طابور ومقاعد وشحنات'}));

module.exports = { data:makeUnit({
  id:'loop-control', previous, lessons,
  title:'الوحدة السابعة: تحكّم في مسار التكرار',
  description:'رأس for والقفز والحلقات المتداخلة والمرور على القيم باستخدام foreach.',
  skill:'for وforeach والتحكم في الحلقة', runtime:'csharp-foundations-subset-v7'
}) };

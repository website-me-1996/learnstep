const {makeUnit, exercise, repair} = require('./lesson-builder.cjs');
const previous = require('./author-unit-12.cjs').data;

const arrays = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays';
const functions = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/building-software/local-functions';
const loops = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements';
const binary = 'https://learn.microsoft.com/en-us/dotnet/api/system.array.binarysearch?view=net-10.0';
const nist = term => 'https://xlinux.nist.gov/dads/HTML/' + term + '.html';
const scene = (...cards) => cards.map(([label,value]) => ({label,value}));
const lines = (...code) => code.join('\n');
const array = items => '{ ' + items.join(', ') + ' }';
const scaffold = (source, input, line) => source(input).replace(line, '// اكتب الأمر هنا');

const countSource = ({scores, minimum, test = 'score >= threshold'}) => lines(
  'int[] scores = ' + array(scores) + ';',
  'int minimum = ' + minimum + ';',
  'int result = CountAccepted(scores, minimum);',
  'Console.WriteLine(result);', '',
  'int CountAccepted(int[] values, int threshold)',
  '{',
  '    int accepted = 0;',
  '    foreach (int score in values)',
  '    {',
  '        if (' + test + ') { accepted++; }',
  '    }',
  '    return accepted;',
  '}'
);
const count = exercise(countSource, [
  [{scores:[],minimum:10},[0]],
  [{scores:[9,10,12],minimum:10},[2]],
  [{scores:[-5,0,-1],minimum:-1},[2]]
], {declared:['scores','minimum','result'],printed:['result'],calls:{CountAccepted:1},operation:'>=',conditionReads:['score','threshold']});

const linearSource = ({codes, wanted, result = 'i'}) => lines(
  'int[] codes = ' + array(codes) + ';',
  'int wanted = ' + wanted + ';',
  'int found = -1;',
  'int probes = 0;',
  'for (int i = 0; i < codes.Length; i++)',
  '{',
  '    probes++;',
  '    if (codes[i] == wanted)',
  '    {',
  '        found = ' + result + ';',
  '        break;',
  '    }',
  '}',
  'Console.WriteLine(found);',
  'Console.WriteLine(probes);'
);
const linear = exercise(linearSource, [
  [{codes:[7,4,7],wanted:7},[0,1]],
  [{codes:[8,2,19],wanted:91},[-1,3]],
  [{codes:[],wanted:4},[-1,0]]
], {declared:['codes','wanted','found','probes'],printed:['found','probes'],conditionReads:['codes','wanted'],
    loop:{kind:'for',reads:['codes'],effect:'probes',jumps:['break']}});

const orderedSource = ({values, relation = '<'}) => lines(
  'int[] values = ' + array(values) + ';',
  'bool ordered = true;',
  'for (int i = 1; i < values.Length; i++)',
  '{',
  '    if (values[i] ' + relation + ' values[i - 1])',
  '    {',
  '        ordered = false;',
  '        break;',
  '    }',
  '}',
  'Console.WriteLine(ordered);'
);
const ordered = exercise(orderedSource, [
  [{values:[]},['True']], [{values:[6]},['True']], [{values:[2,2,3]},['True']], [{values:[4,2]},['False']]
], {declared:['values','ordered'],printed:['ordered'],conditionReads:['values'],loop:{kind:'for',reads:['values'],effect:'ordered',jumps:['break']}});

const binarySource = ({codes, wanted, upper = 'middle - 1'}) => lines(
  'int[] codes = ' + array(codes) + ';',
  'int wanted = ' + wanted + ';',
  'int low = 0;',
  'int high = codes.Length - 1;',
  'int found = -1;',
  'int probes = 0;',
  'while (low <= high)',
  '{',
  '    int middle = low + (high - low) / 2;',
  '    int inspected = codes[middle];',
  '    probes++;',
  '    if (inspected == wanted) { found = middle; break; }',
  '    if (inspected < wanted) { low = middle + 1; }',
  '    else { high = ' + upper + '; }',
  '}',
  'Console.WriteLine(found);',
  'Console.WriteLine(probes);'
);
const half = exercise(binarySource, [
  [{codes:[],wanted:5},[-1,0]],
  [{codes:[5],wanted:5},[0,1]],
  [{codes:[5],wanted:2},[-1,1]],
  [{codes:[1,2,5,8,9],wanted:9},[4,3]]
], {declared:['codes','wanted','low','high','found','probes'],printed:['found','probes'],updated:['low','high'],
    conditionReads:['wanted','inspected'],loop:{kind:'while',reads:['low','high'],effect:'probes',jumps:['break']}});

const costSource = ({size, shrink = 'remaining /= 2;'}) => lines(
  'int size = ' + size + ';',
  'int linear = 0;',
  'for (int i = 0; i < size; i++) { linear++; }',
  'int remaining = size;',
  'int halving = 0;',
  'while (remaining > 0)',
  '{',
  '    halving++;',
  '    ' + shrink,
  '}',
  'Console.WriteLine(linear);',
  'Console.WriteLine(halving);'
);
const countCost = exercise(costSource, [
  [{size:0},[0,0]], [{size:1},[1,1]], [{size:5},[5,3]], [{size:17},[17,5]]
], {declared:['size','linear','remaining','halving'],printed:['linear','halving'],
    loop:{kind:'while',reads:['remaining'],effect:'halving'}});

const sumSource = ({start, result = 'n + rest'}) => lines(
  'int start = ' + start + ';',
  'int total = Sum(start);',
  'Console.WriteLine(total);', '',
  'int Sum(int n)',
  '{',
  '    if (n <= 0) { return 0; }',
  '    int rest = Sum(n - 1);',
  '    return ' + result + ';',
  '}'
);
const sum = exercise(sumSource, [
  [{start:0},[0]], [{start:1},[1]], [{start:4},[10]], [{start:7},[28]]
], {declared:['start','total'],printed:['total'],calls:{Sum:1}});

const lessons = [
  {
    slug:'algorithm-input-rule-output', title:'حوّل مسألة صغيرة إلى مدخل وقاعدة وناتج', reference:functions,
    scene:'قدامك قائمة درجات 7 و10 و13. المطلوب عدد اللي وصلوا إلى 10 أو أعلى. اكتب مثال ناتجه 2 قبل ما تكتب الكود.',
    sceneVisual:scene(['المدخل','7 · 10 · 13 والحد 10'],['القرار لكل درجة','score ≥ threshold'],['الناتج المتوقع','2']),
    concept:'حدد القيم الداخلة، واكتب القاعدة على عنصر واحد، ثم قرر ماذا تعيد. الدالة CountAccepted تستقبل الدرجات والحد وتعيد العدد.',
    why:'تقدر تفحص فهمك للمطلوب بمثال صغير قبل تركيب التفاصيل.',
    mechanics:'عند كل درجة تابع القرار، وعدّ الحالات المقبولة. عند الرجوع تظهر الحصيلة في result.',
    breakdown:['اكتب مدخلًا صغيرًا وناتجه المتوقع.','نفّذ القاعدة على كل عنصر.','ارجع بالعداد وافحصه على مدخل آخر.'],
    build:count({scores:[7,10,13],minimum:10},[2],'أكمل قاعدة القبول في CountAccepted. عند درجات 7 و10 و13 وحد 10 لازم تظهر 2.',{
      attention:'الدرجة التي تساوي الحد تتحسب.',
      rule:'حوّل وصف القبول إلى مقارنة على درجة واحدة.',
      help:'اكتب if (score >= threshold) { accepted++; } داخل foreach.',
      starterCode:countSource({scores:[7,10,13],minimum:10,test:'false'})
    }),
    edit:count({scores:[7,10,13],minimum:12},[1],'ارفع الحد إلى 12 واكتب توقعك قبل التشغيل.'),
    experiment:count({scores:[],minimum:12},[0],'جرّب درجات فارغة. تابع عدد مرات تطبيق الشرط.'),
    bug:repair(count({scores:[7,10,13],minimum:10},[2],'ضم الدرجة المساوية للحد.'),countSource({scores:[7,10,13],minimum:10,test:'score > threshold'}),
      'خرج 1 بدل 2. ما الفحص الذي يضم الحد نفسه؟',
      ['score >= threshold','score > threshold','score == threshold'],'استخدم >= إذا كانت الدرجة التي تساوي الحد مقبولة.'),
    transfer:count({scores:[5,9,9,14],minimum:9},[3],'عدّ المقبولين من 5 و9 و9 و14 عند الحد 9، ثم قارن الناتج بتوقعك.')
  },
  {
    slug:'algorithm-linear-search', title:'فتّش خانة خانة حتى أول تطابق', reference:arrays, algorithmReference:nist('linearSearch'),
    scene:'أرقام تذاكر على رف من غير ترتيب. ابدأ من اليسار وافحص كل رقم. أول ما تلاقي التذكرة المطلوبة اكتب رقم خانتها.',
    sceneVisual:scene(['الفهرس 0','8 · أكمل'],['الفهرس 1','2 · أكمل'],['الفهرس 2','19 · توقف']),
    concept:'البحث الخطي يبدأ بالفهرس 0 ويفحص الخانات بالترتيب. يسجل أول فهرس مطابق، ويظل found عند -1 إذا خلصت الخانات دون تطابق.',
    why:'تقدر تبحث حتى لو القيم مترتبة بأي شكل، وتحسب كم خانة احتجت تفحصها.',
    mechanics:'تضيء كل خانة وقت المقارنة ويزيد probes. عند التطابق تقف الحلقة فورًا.',
    breakdown:['ابدأ found بقيمة -1.','افحص codes[i] في كل مرور وزد probes.','احفظ i عند التطابق، ثم اخرج واطبع الحصيلة.'],
    build:linear({codes:[8,2,19,2],wanted:19},[2,3],'كمّل found عند التطابق. ابحث عن 19 في 8 و2 و19 و2، واطبع الفهرس 2 وثلاثة فحوص.',{
      attention:'شوف فهرس الخانة وقت التطابق، ثم قارن بينه وبين قيمة التذكرة.',
      rule:'يسجل البحث الفهرس الحالي عند أول تطابق.',
      help:'اكتب found = i; قبل break.',
      starterCode:scaffold(linearSource,{codes:[8,2,19,2],wanted:19},'found = i;')
    }),
    edit:linear({codes:[8,2,19,2],wanted:2},[1,2],'ابحث عن 2 المكرر. في أي موضع يوقف break المرور؟'),
    experiment:linear({codes:[8,2,19,2],wanted:91},[-1,4],'ابحث عن 91. توقع عدد الخانات التي تتفحصها.'),
    bug:repair(linear({codes:[8,2,19,2],wanted:19},[2,3],'سجّل فهرس الخانة عند التطابق.'),linearSource({codes:[8,2,19,2],wanted:19,result:'wanted'}),
      'ظهر 19 بعد البحث. إيه القيمة التي ينبغي حفظها لتحديد المكان؟',
      ['wanted','i','codes.Length'],'احفظ i، فهرس الخانة التي تحقق الشرط.',1),
    transfer:linear({codes:[22,14,7,14],wanted:14},[1,2],'ابحث عن أول 14 بين 22 و14 و7 و14. اطبع فهرسها وعدد الفحوص.')
  },
  {
    slug:'algorithm-sorted-precondition', title:'افحص ترتيب الخانات المتجاورة', reference:binary, algorithmReference:nist('binarySearch'),
    scene:'قبل استخدام الرف المرقّم في بحث بالنصف، امشِ من ثاني خانة وقارن كل بطاقة بجارتها على الشمال. لو الرقم قلّ، بلغ أن الترتيب مكسور.',
    sceneVisual:scene(['قارن جارين','2 ثم 5'],['افحص التالي','5 ثم 4'],['الحكم','False']),
    concept:'الترتيب التصاعدي مع السماح بالتكرار يعني كل عنصر أكبر من أو يساوي الذي قبله. تكفي مرة واحدة أصغر منه لإرجاع false.',
    why:'تراجع شرط ترتيب البيانات قبل الاعتماد على البحث الثنائي.',
    mechanics:'راقب المقارنة عند الفهرس 1 فأعلى، ثم أول مكان يُغيّر ordered.',
    breakdown:['افترض أن ordered تساوي true.','ابدأ من الفهرس 1 لتقدر تقرأ السابق.','عند نقص القيمة اجعل ordered تساوي false واخرج.'],
    build:ordered({values:[2,5,4]},['False'],'افحص ترتيب 2 و5 و4 واطبع ordered. أكمل المقارنة التي تكشف أول انخفاض.',{
      attention:'قارن الخانة الحالية بالخانة i - 1.',
      rule:'إذا كانت الحالية أصغر من السابقة، فالترتيب غير صالح لهذا البحث.',
      help:'اكتب if (values[i] < values[i - 1]).'
    }),
    edit:ordered({values:[2,4,5]},['True'],'بدّل آخر قيمتين إلى 4 و5 بالترتيب. راقب النتيجة.'),
    experiment:ordered({values:[2,5,3,5]},['False'],'جرّب ترتيبًا ينخفض في الوسط. حدّد أول موضع خاطئ.'),
    bug:repair(ordered({values:[2,2,5]},['True'],'اسمح بتساوي جارين.'),orderedSource({values:[2,2,5],relation:'<='}),
      'رفض البرنامج الرقمين المتساويين. أي مقارنة ترفض الانخفاض فقط؟',
      ['values[i] <= values[i - 1]','values[i] == values[i - 1]','values[i] < values[i - 1]'],'اجعل التساوي مسموحًا باستخدام < في اختبار الانخفاض.',2),
    transfer:ordered({values:[1,3,3,9]},['True'],'تحقق من ترتيب 1 و3 و3 و9 قبل البحث الثنائي. اقبل الرقمين المتساويين.')
  },
  {
    slug:'algorithm-binary-search', title:'ضيّق مجال البحث حول المنتصف', reference:binary, algorithmReference:nist('binarySearch'),
    scene:'رف الأرقام مرتب. تفتحه من الوسط، ولو التذكرة اللي عايزها أكبر، تنقل البداية لما بعد الخانة دي. تبحث في الجزء اللي ممكن يحتويها.',
    sceneVisual:scene(['المجال الأول','الفهارس 0 إلى 6'],['الوسط','الفهرس 3 · القيمة 12'],['الهدف 20','المجال 4 إلى 6']),
    concept:'في بيانات مرتّبة، تحدد مقارنة الوسط أي نصف ممكن يحتوي الهدف. استبعد الوسط الذي فُحص باستخدام middle + 1 أو middle - 1.',
    why:'تضيّق مكان البحث مع كل مقارنة حتى تجد الهدف أو ينتهي المجال.',
    mechanics:'راقب low وhigh ثم خانة middle. كل خطوة تستبعد الخانات التي يستحيل أن تحتوي الهدف.',
    breakdown:['ابدأ بين 0 وLength - 1.','احسب الوسط الأقل بالقسمة الصحيحة وافحص قيمته.','استبعد نصفًا أو احفظ الفهرس عند التطابق.'],
    build:half({codes:[2,5,8,12,15,20,23],wanted:20},[5,2],'أكمل تحديث high للبحث الثنائي. احسب middle بصيغة low + (high - low) / 2. اطبع فهرس 20 وعدد الخانات المفحوصة.',{
      attention:'عند الهدف الأصغر نستبعد الوسط ونحرّك high قبله.',
      rule:'كل تحديث بعد عدم التطابق يستبعد الخانة الحالية.',
      help:'اكتب high = middle - 1; في else.',
      starterCode:scaffold(binarySource,{codes:[2,5,8,12,15,20,23],wanted:20},'high = middle - 1;')
    }),
    edit:half({codes:[2,5,8,12,15,20,23],wanted:2},[0,3],'ابحث عن 2 عند أول خانة. تابع high في كل دورة.'),
    experiment:half({codes:[2,5,8,12,15,20,23],wanted:9},[-1,3],'جرّب 9 وهي غير موجودة. حدّد لحظة low تتخطى high.'),
    bug:repair(half({codes:[2,5,8,12,15,20,23],wanted:9},[-1,3],'استبعد الوسط عند التصغير.'),binarySource({codes:[2,5,8,12,15,20,23],wanted:9,upper:'middle'}),
      'ثبت المجال عند خانة واحدة وكرر فحصها. أي تحديث يستبعدها عندما تكون أكبر من الهدف؟',
      ['high = middle - 1;','high = middle;','high = middle + 1;'],'اجعل high قبل الوسط الذي فُحص.',0),
    transfer:half({codes:[4,6,9,18,25,31],wanted:25},[4,2],'ابحث عن 25 في 4 و6 و9 و18 و25 و31 بالمنتصف الأقل. اعرض الفهرس والفحوص.',{
      starterCode:scaffold(binarySource,{codes:[4,6,9,18,25,31],wanted:25},'high = middle - 1;')
    })
  },
  {
    slug:'algorithm-linear-logarithmic-growth', title:'عدّ خطوات المرور وقارنها بالتنصيف', reference:loops, algorithmReference:nist('bigOnotation'),
    scene:'رف فيه 8 تذاكر. خطة تمرّ بكل خانة. خطة ثانية تقلل المجال للنصف كل مرة. عدّ عدد المرات لما تكبّر الرف للضعف.',
    sceneVisual:scene(['المرور الكامل','8 فحوص'],['التنصيف','8 → 4 → 2 → 1 → 0'],['ضعف الحجم','16 فحصًا أو 5 أنصاف']),
    concept:'المرور الكامل يزيد مع n، فنعبّر عن نموه بـ O(n). التنصيف يحتاج نحو خطوة إضافية عند مضاعفة n، فنعبّر عن نموه بـ O(log n). المقارنة هنا بعدد الخطوات.',
    why:'تتوقع تأثير كبر المدخلات على عدد العمليات وقت تصميم الحل.',
    mechanics:'يشير linear إلى عدد المرور، وتظهر قيمة remaining بعد كل قسمة صحيحة على 2.',
    breakdown:['عدّ دورة واحدة لكل عنصر في المرور الكامل.','ابدأ remaining بحجم المسألة.','قلّلها للنصف في كل خطوة حتى 0، وقارن العددين.'],
    build:countCost({size:8},[8,4],'أكمل التنصيف في الحلقة. عند size = 8 اطبع 8 للمرور و4 للتنصيف.',{
      attention:'راقب الفرق بين تقليل العدد بواحد وتقليله للنصف.',
      rule:'كل دورة تنصيف تحتفظ بباقٍ يساوي نصف الحجم تقريبًا.',
      help:'اكتب remaining /= 2;.',
      starterCode:scaffold(costSource,{size:8},'remaining /= 2;')
    }),
    edit:countCost({size:16},[16,5],'ضاعف size إلى 16. كم زاد كل عداد؟'),
    experiment:countCost({size:0},[0,0],'جرّب حجمًا 0. افحص لماذا لا تُنفذ أي خطوة.'),
    bug:repair(countCost({size:8},[8,4],'قلّل الحجم إلى النصف كل مرة.'),costSource({size:8,shrink:'remaining--;'}),
      'ظهر عدّادان يساويان 8. أي سطر يجعل الثاني يقيس التنصيف؟',
      ['remaining--;','remaining /= 2;','halving /= 2;'],'اقسم remaining على 2 مرة في كل دورة.',1),
    transfer:countCost({size:32},[32,6],'توقع العددين عند حجم 32، وشغّل البرنامج واطبعهما للتأكد.')
  },
  {
    slug:'algorithm-recursion-base-return', title:'صغّر طلب الدالة حتى حالة التوقف', reference:functions, algorithmReference:nist('recursion'),
    scene:'عاوز مجموع 3 و2 و1. اطلب من زميلك مجموع الأعداد حتى 2، وانتظر. زميلك يطلب مجموعًا أصغر. عند الصفر يرجع 0، ثم كل واحد يضيف رقمه وهو راجع.',
    sceneVisual:scene(['أوامر الذهاب','Sum(3) → 2 → 1 → 0'],['قاعدة التوقف','Sum(0) = 0'],['عند الرجوع','0 → 1 → 3 → 6']),
    concept:'الاستدعاء الذاتي يطلب مسألة أصغر من نفس الدالة. عند حالة التوقف تعيد الدالة قيمة مباشرة. كل استدعاء معلق يكمل حسابه عند الرجوع.',
    why:'تعرف أين تتوقف الاستدعاءات المتداخلة وأين تتجمع النتائج.',
    mechanics:'راقب قيمة n وعمق الاستدعاء أثناء الذهاب. عند الرجوع احفظ rest، ثم أضف n في الاستدعاء الحالي.',
    breakdown:['عند n <= 0 أعد 0.','اطلب ناتج Sum(n - 1).','أضف n إلى القيمة العائدة.'],
    build:sum({start:3},[6],'أكمل سطر الرجوع بعد Sum(n - 1). اطبع مجموع 3 و2 و1.',{
      attention:'كل استدعاء يحتفظ بـ n الخاصة به بينما ينتظر رجوع الدالة.',
      rule:'حالة التوقف تؤمّن الرجوع، وكل مسألة أصغر تقرب منها.',
      help:'اكتب return n + rest; بعد أن تعود نتيجة الاستدعاء الأصغر.'
    }),
    edit:sum({start:4},[10],'بدّل start إلى 4. تابع عدد مرات الرجوع قبل ظهور total.'),
    experiment:sum({start:0},[0],'ابدأ عند صفر. راقب هل تحتاج الدالة إلى استدعاء إضافي.'),
    bug:repair(sum({start:3},[6],'أضف الرقم الحالي عند الرجوع.'),sumSource({start:3,result:'rest'}),
      'وصلنا لحالة التوقف ثم خرج مجموع 0. أي قيمة يجمعها كل استدعاء عند الرجوع؟',
      ['return rest;','return n;','return n + rest;'],'أعد n مع نتيجة الاستدعاء الأصغر.',2),
    transfer:sum({start:5},[15],'استخدم الاستدعاء الذاتي لجمع الأعداد من 1 إلى 5. تابع أول رجوع من 0 وآخر رجوع إلى total.')
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'فهرسة تذاكر وقياس خطوات الحل'}));

exports.data = makeUnit({
  id:'search-and-recursion',title:'فتّش وقِس خطوات الحل',description:'تفكيك المسألة، البحث الخطي والثنائي، شرط الترتيب، النمو والاستدعاء الذاتي.',
  previous,lessons,skill:'البحث والاستدعاء الذاتي',runtime:'csharp-foundations-subset-v11'
});

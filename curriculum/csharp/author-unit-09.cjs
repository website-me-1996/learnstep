const { makeUnit, exercise, repair } = require('./lesson-builder.cjs');
const previous = require('./author-unit-08.cjs').data;

const arrays = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays';
const characters = 'https://learn.microsoft.com/en-us/dotnet/api/system.string.chars';
const dimensions = 'https://learn.microsoft.com/en-us/dotnet/api/system.array.getlength';
const scene = (...cards) => cards.map(([label, value]) => ({label, value}));
const boxes = values => '{ ' + values.join(', ') + ' }';
const rectangle = rows => '{ ' + rows.map(boxes).join(', ') + ' }';
const indexed = (name, mode = 'read', rank = 1) => ({name, mode, rank});

const pickSource = ({values, position, selection = 'values[position]'}) => [
  'int[] values = ' + boxes(values) + ';',
  'int position = ' + position + ';',
  'int selected = ' + selection + ';',
  'Console.WriteLine(selected);'
].join('\n');
const pick = exercise(pickSource, [
  [{values:[17,4],position:1},[4]],
  [{values:[42],position:0},[42]],
  [{values:[2,9,5],position:2},[5]]
], {declared:['values','position','selected'],printed:['selected'],read:['position'],indexAccess:indexed('values')});

const updateSource = ({shelf, position, replacement, target = 'shelf[position]'}) => [
  'int[] shelf = ' + boxes(shelf) + ';',
  'int position = ' + position + ';',
  'int replacement = ' + replacement + ';',
  target + ' = replacement;',
  'Console.WriteLine(shelf[position]);',
  'Console.WriteLine(shelf[0]);'
].join('\n');
const replaceCell = exercise(updateSource, [
  [{shelf:[6,2],position:0,replacement:13},[13,13]],
  [{shelf:[11,3,8],position:2,replacement:0},[0,11]],
  [{shelf:[5,5],position:1,replacement:5},[5,5]]
], {declared:['shelf','position','replacement'],read:['position','replacement'],indexAccess:indexed('shelf','write')});

const lengthSource = ({scores, count = 'scores.Length'}) => [
  'int[] scores = ' + boxes(scores) + ';',
  'int count = ' + count + ';',
  'Console.WriteLine(count);'
].join('\n');
const length = exercise(lengthSource, [
  [{scores:[42]},[1]], [{scores:[]},[0]], [{scores:[4,4,4,4]},[4]]
], {declared:['scores','count'],printed:['count'],operation:'.Length',operationIn:'count'});

const scanSource = ({daily, comparison = '<'}) => [
  'int[] daily = ' + boxes(daily) + ';',
  'for (int i = 0; i ' + comparison + ' daily.Length; i++)',
  '{',
  '    Console.WriteLine(daily[i]);',
  '}'
].join('\n');
const scan = exercise(scanSource, [
  [{daily:[]},[]], [{daily:[9]},[9]], [{daily:[3,3,-4,8]},[3,3,-4,8]]
], {declared:['daily'],indexAccess:indexed('daily'),operation:'.Length',loop:{kind:'for',reads:['daily'],effect:'print'}});

const charSource = ({word, position, selection = 'word[position]'}) => [
  'string word = ' + JSON.stringify(word) + ';',
  'int position = ' + position + ';',
  'char symbol = ' + selection + ';',
  'Console.WriteLine(symbol);'
].join('\n');
const letter = exercise(charSource, [
  [{word:'مدرسة',position:0},['م']],
  [{word:'A17',position:2},['7']],
  [{word:'B',position:0},['B']]
], {declared:['word','position','symbol'],read:['position'],printed:['symbol'],indexAccess:indexed('word')});

const seatSource = ({seats, row, column, selection = 'seats[row, column]'}) => [
  'int[,] seats = ' + rectangle(seats) + ';',
  'int row = ' + row + ';',
  'int column = ' + column + ';',
  'int ticket = ' + selection + ';',
  'Console.WriteLine(ticket);'
].join('\n');
const cell = exercise(seatSource, [
  [{seats:[[9,4,7],[5,6,8]],row:0,column:1},[4]],
  [{seats:[[10,11],[20,21],[30,31]],row:2,column:1},[31]],
  [{seats:[[2]],row:0,column:0},[2]]
], {declared:['seats','row','column','ticket'],read:['row','column'],printed:['ticket'],indexAccess:indexed('seats','read',2)});

const shapeSource = ({seats, columnCount = 'seats.GetLength(1)'}) => [
  'int[,] seats = ' + rectangle(seats) + ';',
  'int rows = seats.GetLength(0);',
  'int columns = ' + columnCount + ';',
  'Console.WriteLine(rows);',
  'Console.WriteLine(columns);'
].join('\n');
const shape = exercise(shapeSource, [
  [{seats:[[1,2,3,4]]},[1,4]],
  [{seats:[[4],[5],[6]]},[3,1]],
  [{seats:[]},[0,0]]
], {declared:['seats','rows','columns'],printed:['rows','columns'],operation:'.GetLength',operationIn:'columns'});

const countSource = ({map, columnAxis = 1}) => [
  'int[,] map = ' + rectangle(map) + ';',
  'int free = 0;',
  'for (int row = 0; row < map.GetLength(0); row++)',
  '{',
  '    for (int column = 0; column < map.GetLength(' + columnAxis + '); column++)',
  '    {',
  '        if (map[row, column] == 0)',
  '        {',
  '            free++;',
  '        }',
  '    }',
  '}',
  'Console.WriteLine(free);'
].join('\n');
const freeSeats = exercise(countSource, [
  [{map:[[1,1,0]]},[1]],
  [{map:[[0],[1],[0]]},[2]],
  [{map:[[1,1],[1,1]]},[0]],
  [{map:[]},[0]]
], {declared:['map','free'],printed:['free'],conditionReads:['map'],indexAccess:indexed('map','read',2),
    loop:{kind:'for',depth:2,reads:['map'],effect:'free'}});

const lessons = [
  {
    slug:'array-read-index', title:'اقرأ قيمة خانة بفهرسها', reference:arrays,
    scene:'قدامك ثلاثة أدراج مرقّمة من ٠ إلى ٢. افتح الدرج رقم ٠ واقرأ الرقم المكتوب فيه.',
    sceneVisual:scene(['الفهرس 0','8'],['الفهرس 1','21'],['الفهرس 2','30']),
    concept:'المصفوفة تحفظ قيمًا بالترتيب. في values[position] يحدد position رقم الخانة، وتطلع منها القيمة التي فيها. أول خانة فهرسها 0.',
    why:'تقدر تختار قيمة من مكان محدد حتى لو اتغيّرت الأعداد داخل الأدراج.',
    mechanics:'عند إسناد selected يظهر رقم الخانة أعلى القيمة، وتضاء الخانة التي قرأها السطر الحالي.',
    breakdown:['رتّب 8 و21 و30 في values.','ضع 0 في position لتختار الخانة الأولى.','اقرأ values[position] واحفظها في selected.'],
    build:pick({values:[8,21,30],position:0},[8],'اكتب int[] values بالقيم 8 و21 و30. خزّن position = 0، واحفظ قيمة values[position] في selected واطبعها.',{
      attention:'تابع الفهرس 0، ثم انظر داخل الخانة إلى القيمة 8.',
      rule:'الأقواس المربعة تختار خانة برقمها الذي يبدأ من صفر.',
      help:'اكتب int selected = values[position]; قبل Console.WriteLine(selected);.'
    }),
    edit:pick({values:[8,21,30],position:1},[21],'بدّل position إلى 1. أي خانة يظهر منها 21؟'),
    experiment:pick({values:[8,21,30],position:2},[30],'جرّب قراءة الخانة الأخيرة بوضع position = 2.'),
    bug:repair(pick({values:[8,21,30],position:0},[8],'اقرأ الدرج الأول.'),pickSource({values:[8,21,30],position:0,selection:'values[1]'}),
      'المفروض قراءة الدرْج الأول. ليه ظهر 21؟',
      ['values[1] فتح الخانة الثانية.','أول خانة فهرسها 8.','الطباعة تغيّر الفهرس.'],'استخدم values[position] بعد ضبط position على 0.'),
    transfer:pick({values:[6,14,27],position:1},[14],'احفظ تذاكر 6 و14 و27 في values. استخدم position = 1 للحصول على التذكرة الثانية.')
  },
  {
    slug:'array-write-index', title:'حدّث خانة واحدة في المصفوفة', reference:arrays,
    scene:'على الرف ثلاث بطاقات، قيمها 4 و7 و10. الصق بطاقة 12 مكان بطاقة 7 وسيب باقي البطاقات في أماكنها.',
    sceneVisual:scene(['الخانة 0','4'],['الخانة 1','7 → 12'],['الخانة 2','10']),
    concept:'في shelf[position] = replacement يختار الجزء قبل علامة الإسناد الخانة التي ستتغير. القيمة في يمين الإسناد تتخزن في نفس الخانة.',
    why:'تقدر تصلح قيمة واحدة وتحتفظ بالبيانات في الخانات المجاورة.',
    mechanics:'لقطة التحديث تضيء الخانة وتعرض القيمة السابقة ثم الجديدة. اطبع الخانة المختارة والخانة الأولى للمراجعة.',
    breakdown:['جهّز shelf وخانة الاختيار position.','أسند replacement إلى shelf[position].','اطبع الخانة المختارة ثم الخانة الأولى.'],
    build:replaceCell({shelf:[4,7,10],position:1,replacement:12},[12,4],'خزّن 4 و7 و10 في shelf. عيّن position = 1 وreplacement = 12. حدّث shelf[position]، ثم اطبعها واطبع shelf[0].',{
      attention:'ثبت عينك على الخانة 1 قبل الإسناد وبعده.',
      rule:'الإسناد إلى عنصر يغيّر القيمة عند الفهرس المحدد.',
      help:'اكتب shelf[position] = replacement; قبل الطباعة.'
    }),
    edit:replaceCell({shelf:[4,7,10],position:1,replacement:2},[2,4],'ضع 2 في replacement مع إبقاء position = 1.'),
    experiment:replaceCell({shelf:[4,7,10],position:0,replacement:2},[2,2],'اترك replacement = 2 وغيّر position إلى 0. توقّع لماذا تظهر قيمة واحدة مرتين.'),
    bug:repair(replaceCell({shelf:[4,7,10],position:1,replacement:12},[12,4],'حدّث الخانة المحددة.'),updateSource({shelf:[4,7,10],position:1,replacement:12,target:'shelf[0]'}),
      'ظهر 7 ثم 12. أين ذهب التحديث؟',
      ['إلى خانة position.','إلى الخانة ذات الفهرس 0.','إلى كل الخانات.'],'ضع position داخل الأقواس في جهة الإسناد.',1),
    transfer:replaceCell({shelf:[3,8,13],position:2,replacement:20},[20,3],'صحّح البطاقة الثالثة في shelf من 13 إلى 20. اطبع البطاقة المصححة ثم الأولى.')
  },
  {
    slug:'array-length', title:'اقرأ عدد خانات المصفوفة', reference:arrays,
    scene:'مرّ على المفاتيح المرقّمة ٠ و١ و٢. عدّها: عندك ثلاثة مفاتيح والفهرس المكتوب على آخر مفتاح هو ٢.',
    sceneVisual:scene(['الفهارس','0 · 1 · 2'],['عدد الخانات','3'],['آخر فهرس','2']),
    concept:'scores.Length تعطي عدد الخانات. إذا كان العدد 3 يكون آخر فهرس 2. المصفوفة الفارغة طولها 0.',
    why:'تعرف عدد العناصر من المصفوفة نفسها لو اتغيّر حجم البيانات.',
    mechanics:'في لقطة حساب count يظهر Length والعدد قبل طباعته.',
    breakdown:['كوّن scores بثلاث قيم.','اقرأ scores.Length داخل count.','اطبع count وقارنه بفهرس آخر خانة.'],
    build:length({scores:[2,6,11]},[3],'اكتب scores بالقيم 2 و6 و11. خزّن scores.Length في count ثم اطبع count.',{
      attention:'اسأل عن عدد الخانات. آخر فهرس مكتوب تحته رقم أصغر بواحد.',
      rule:'Length ترجع عدد الخانات، وطول المصفوفة الفارغة 0.',
      help:'اكتب int count = scores.Length; بدون أقواس بعد Length.'
    }),
    edit:length({scores:[2,6,11,15]},[4],'أضف القيمة 15 عند إنشاء scores. تابع العدد الجديد.'),
    experiment:length({scores:[]},[0],'اكتب مصفوفة فارغة باستخدام { }. ما طولها؟'),
    bug:repair(length({scores:[2,6,11]},[3],'اطبع عدد الخانات.'),lengthSource({scores:[2,6,11],count:'scores.Length - 1'}),
      'ظهر 2 رغم وجود ثلاث خانات. ماذا حسب السطر؟',
      ['حسب أول قيمة.','حسب عدد الخانات.','حسب فهرس آخر خانة.'],'احفظ scores.Length نفسها في count.',2),
    transfer:length({scores:[10,10,3,1,2]},[5],'أنشئ scores بخمس درجات واطبع عدد الخانات. احسب كل درجة متكررة ضمن العدد.')
  },
  {
    slug:'array-loop-by-index', title:'مرّ على الفهارس لحد آخر خانة', reference:arrays,
    scene:'امشِ قدام رف فيه ثلاث خانات. قف عند الأولى، اقرأ بطاقتها، ثم تحرك خطوة. عند الفهرس ٣ ينتهي الرف.',
    sceneVisual:scene(['ابدأ','i = 0'],['اقرأ ثم تحرك','daily[i]'],['توقف','i == Length']),
    concept:'الحلقة تزود i بعد كل قراءة. عند i يساوي Length يتوقف الشرط i < daily.Length قبل محاولة فتح خانة خارج المصفوفة.',
    why:'المرور يشتغل مع رف فيه خانة واحدة، رف كبير، أو رف فارغ بنفس شرط التوقف.',
    mechanics:'بعد كل شرط صالح يظهر الفهرس الحالي على الخانة. عند فشل الشرط لا تظهر قراءة جديدة.',
    breakdown:['ابدأ i عند 0.','افتح daily[i] طالما i أصغر من الطول.','حرّك i إلى الفهرس التالي.'],
    build:scan({daily:[5,11,8]},[5,11,8],'خزّن 5 و11 و8 في daily. اكتب for تبدأ من i = 0 وتفحص i < daily.Length. اطبع daily[i] داخلها.',{
      attention:'تابع i قبل الدخول، وبعد طباعة آخر قيمة.',
      rule:'الفهارس الصالحة من 0 حتى Length - 1.',
      help:'اكتب for (int i = 0; i < daily.Length; i++) ثم Console.WriteLine(daily[i]); في الجسم.'
    }),
    edit:scan({daily:[5,11,8,4]},[5,11,8,4],'أضف قيمة 4 في آخر daily وشغّل الحلقة نفسها.'),
    experiment:scan({daily:[]},[],'فرّغ daily. توقّع هل ينفذ جسم الحلقة أول مرة.'),
    bug:repair(scan({daily:[5,11,8]},[5,11,8],'اخرج عند الطول.'),scanSource({daily:[5,11,8],comparison:'<='}),
      'قرأ ثلاث خانات وبعدها حصل خطأ. ما الشرط الذي أوقف القراءة قبل الفهرس 3؟',
      ['i < daily.Length','i <= daily.Length','i == daily.Length'],'اخرج قبل الوصول إلى خانة فهرسها Length.'),
    transfer:scan({daily:[3,7,3,9]},[3,7,3,9],'اطبع درجات 3 و7 و3 و9 في ترتيب الخانات باستخدام حلقة واحدة.')
  },
  {
    slug:'string-index-character', title:'اقرأ حرفًا واحدًا من النص', reference:characters,
    scene:'بطاقة عليها كلمة «نور». اختار الحرف عند بداية الكلمة، ثم تحرك للحرف الذي بعده.',
    sceneVisual:scene(['الفهرس 0','ن'],['الفهرس 1','و'],['الفهرس 2','ر']),
    concept:'word[position] ترجع قيمة char واحدة. مع هذه الحروف كل موقع يعطي حرفًا. الفهرسة تتعامل مع وحدات UTF-16، وبعض الرموز مثل الإيموجي تحتاج وحدتين.',
    why:'تختار الحرف أو الرقم الظاهر عند موضع محدد في بطاقة مكتوبة.',
    mechanics:'بتتبّع الإسناد يظهر موقع الوحدة المختارة، ونوع symbol في جدول القيم هو char.',
    breakdown:['خزّن النص في word.','اختر فهرس الحرف في position.','خزّن char symbol من word[position] واطبعها.'],
    build:letter({word:'نور',position:0},['ن'],'خزّن "نور" في word و0 في position. خزّن word[position] في char symbol واطبعها.',{
      attention:'اختيار position = 0 يتجه لأول حرف محفوظ في النص.',
      rule:'قراءة موقع في string تنتج char.',
      help:'اكتب char symbol = word[position];.'
    }),
    edit:letter({word:'نور',position:1},['و'],'ضع position = 1. راقب الحرف الأوسط.'),
    experiment:letter({word:'نور',position:2},['ر'],'ضع position = 2. هل تظهر الخانة الأخيرة؟'),
    bug:repair(letter({word:'نور',position:0},['ن'],'اقرأ الحرف الأول.'),charSource({word:'نور',position:0,selection:'word[1]'}),
      'ظهرت و. ما التعبير الذي يقرأ الحرف من position؟',
      ['word[1]','word[position]','word.Length'],'استخدم position بين الأقواس المربعة حتى تختار الموضع.',1),
    transfer:letter({word:'R45',position:2},['5'],'احفظ رمز التذكرة "R45" واستخرج char في الفهرس 2. اطبعه كما يظهر على البطاقة.')
  },
  {
    slug:'matrix-row-column', title:'اختر الصف ثم العمود', reference:arrays,
    scene:'صالة فيها صفّين وثلاثة أعمدة. قف عند الصف الثاني، ثم تحرك داخل هذا الصف للعمود الثالث واقرأ رقم التذكرة.',
    sceneVisual:scene(['الصف 0','10 · 11 · 12'],['الصف 1','20 · 21 · 22'],['الخانة المطلوبة','[1, 2] → 22']),
    concept:'في seats[row, column] الفهرس الأول يحدد الصف، والثاني يحدد العمود داخل الصف. الفهرسان يبدأان من 0.',
    why:'تصل لكرسي واحد في شبكة لها عدد صفوف مختلف عن عدد الأعمدة.',
    mechanics:'فيلم التنفيذ يبيّن رقم الصف والعمود، ويضيء الخانة عند التقاطع.',
    breakdown:['اكتب صفين داخل seats من النوع int[,].','اختر row = 1 وcolumn = 2.','احفظ القيمـة عند التقاطع في ticket.'],
    build:cell({seats:[[10,11,12],[20,21,22]],row:1,column:2},[22],'اكتب int[,] seats بصف أول 10 و11 و12 وصف ثانٍ 20 و21 و22. استخدم row = 1 وcolumn = 2 لقراءة ticket واطبعها.',{
      attention:'حدد الصف 1 كاملًا، ثم ابحث داخل الصف عن العمود 2.',
      rule:'صف أولًا ثم عمود في الوصول إلى مصفوفة ثنائية.',
      help:'اكتب int ticket = seats[row, column];.'
    }),
    edit:cell({seats:[[10,11,12],[20,21,22]],row:1,column:0},[20],'اترك الصف 1 وغيّر column إلى 0.'),
    experiment:cell({seats:[[10,11,12],[20,21,22]],row:0,column:0},[10],'غيّر row إلى 0 مع column = 0. أي قيمة تقع عند بداية الصف الأول؟'),
    bug:repair(cell({seats:[[10,11,12],[20,21,22]],row:1,column:2},[22],'أعد ترتيب الفهرسين.'),seatSource({seats:[[10,11,12],[20,21,22]],row:1,column:2,selection:'seats[column, row]'}),
      'ظهرت رسالة أن الصف 2 خارج الحدود. أي ترتيب يذهب للصف الثاني والعمود الثالث؟',
      ['seats[column, row]','seats[row, row]','seats[row, column]'],'اختر row أولا، ثم column.',2),
    transfer:cell({seats:[[1,2],[3,4],[5,6]],row:2,column:1},[6],'أنشئ ثلاث صفوف بقيم 1 و2 ثم 3 و4 ثم 5 و6. اطبع قيمة الصف 2 والعمود 1.')
  },
  {
    slug:'matrix-dimension-lengths', title:'احسب الصفوف والأعمدة كلٌ بطوله', reference:dimensions,
    scene:'عندك لافتة تعرض مقاس صالة: صفّان، وفي كل صف ثلاثة مقاعد. محتاج تجيب الرقمين وتكتب كل واحد في خانته.',
    sceneVisual:scene(['اتجاه الصفوف','GetLength(0) → 2'],['اتجاه الأعمدة','GetLength(1) → 3'],['المقاعد معًا','Length → 6']),
    concept:'GetLength(0) تعيد عدد الصفوف، وGetLength(1) تعيد عدد الأعمدة. Length تعيد عدد العناصر الكلي في المصفوفة.',
    why:'أي مرور في صف يحتاج عدد الأعمدة، حتى لو كان عدد الصفوف مختلفًا.',
    mechanics:'في لقطة كل إسناد يظهر رقم البعد الذي قرأته ونتيجته في rows أو columns.',
    breakdown:['اقرأ GetLength(0) في rows.','اقرأ GetLength(1) في columns.','اطبع الصفوف ثم الأعمدة.'],
    build:shape({seats:[[1,2,3],[4,5,6]]},[2,3],'اكتب seats بصفين، كل صف 3 قيم. خزّن عدد الصفوف في rows وعدد الأعمدة في columns باستخدام GetLength، ثم اطبعهما.',{
      attention:'ارجع لرقم البعد قبل اختيار القيمة.',
      rule:'البعد 0 يحصي الصفوف والبعد 1 يحصي الأعمدة.',
      help:'اكتب int rows = seats.GetLength(0); وint columns = seats.GetLength(1);.'
    }),
    edit:shape({seats:[[1,2,3,7],[4,5,6,8]]},[2,4],'مدّ الصفين بإضافة عمود رابع فقط. راقب columns.'),
    experiment:shape({seats:[[3,4],[5,6],[7,8]]},[3,2],'جرّب ثلاثة صفوف، في كل واحد عمودان. اطبع العددين.'),
    bug:repair(shape({seats:[[1,2,3],[4,5,6]]},[2,3],'اقرأ طول البعد الثاني.'),shapeSource({seats:[[1,2,3],[4,5,6]],columnCount:'seats.Length'}),
      'ظهر 2 ثم 6. ماذا تستخدم لعدد الأعمدة فقط؟',
      ['seats.GetLength(1)','seats.Length','seats.GetLength(0)'],'اقرأ طول البعد 1 لوحده.'),
    transfer:shape({seats:[[12],[14],[16],[18]]},[4,1],'اطبع عدد الصفوف والأعمدة في صالة فيها أربعة صفوف بعمود واحد.')
  },
  {
    slug:'matrix-free-seats', title:'عدّ المقاعد الفارغة صفًا بعد صف', reference:arrays,
    scene:'مشرف يمر على كل كرسي. إذا وجد بطاقة ٠ يزود عدد الكراسي الفارغة. يكمل الصف الحالي قبل ما يبدأ صفًا جديدًا.',
    sceneVisual:scene(['الصف 0','1 · 0 · 1'],['الصف 1','0 · 0 · 1'],['الكراسي الفارغة','3']),
    concept:'الحلقة الخارجية تتحرك بين الصفوف. مع كل صف تبدأ الداخلية من العمود 0 وتقرأ الخانات، والعداد يتغير فقط عند رؤية 0.',
    why:'تقدر تعدّ الأماكن المتاحة في غرفة بأي مقاس ضمن نموذج المصفوفة.',
    mechanics:'اسم الحلقة ورقم دورتها يظلان ظاهرين. خانة واحدة تضاء عند كل شرط، وتقدر ترجع للّقطة السابقة قبل زيادة free.',
    breakdown:['ابدأ free عند 0.','خذ صفًا ثم مرّ على كل أعمدته.','زود free إذا كانت الخانة 0 ثم اطبعه بعد الحلقتين.'],
    build:freeSeats({map:[[1,0,1],[0,0,1]]},[3],'خزّن خريطة صفّي المقاعد 1 و0 و1 ثم 0 و0 و1 في map. مرّ على row ثم column، وزد free عندما تكون الخانة 0. اطبع free بعد الحلقتين.',{
      attention:'راقب العمود يرجع إلى 0 مع بداية كل صف.',
      rule:'طول الحلقة الداخلية يأتي من عدد الأعمدة.',
      help:'استخدم row < map.GetLength(0) وcolumn < map.GetLength(1) ثم if (map[row, column] == 0) { free++; }.'
    }),
    edit:freeSeats({map:[[1,0,0],[0,0,1]]},[4],'غيّر الكرسي الأخير في الصف الأول من 1 إلى 0. ما العدد الجديد؟'),
    experiment:freeSeats({map:[[1,1,1],[1,1,1]]},[0],'جرّب صالة كل مقاعدها محجوزة. تابع الشرط والعداد.'),
    bug:repair(freeSeats({map:[[1,1,0],[0,0,1]]},[3],'استخدم طول الأعمدة داخل الصف.'),countSource({map:[[1,1,0],[0,0,1]],columnAxis:0}),
      'البرنامج عدّ كرسيين وترك آخر عمود. أي شرط يسمح بالمرور على كل أعمدة الصف؟',
      ['column < map.GetLength(0)','column < map.GetLength(1)','column < row'],'في الحلقة الداخلية استخدم طول البعد 1 للأعمدة.',1),
    transfer:freeSeats({map:[[1,0],[0,1],[0,0]]},[4],'كرّر العد في ثلاثة صفوف: 1 و0 ثم 0 و1 ثم 0 و0. اطبع عدد المقاعد الفارغة.')
  }
].map(lesson => ({...lesson, code:lesson.build.solution, projectContext:'خريطة مقاعد وبطاقات مرقّمة'}));

exports.data = makeUnit({
  id:'arrays-and-indexing', title:'اقرأ الخانات وصفوفها', description:'الفهرس والقيمة والمرور على المصفوفات والنصوص والصف والعمود.',
  previous, lessons, skill:'المصفوفات والفهارس', runtime:'csharp-foundations-subset-v9'
});

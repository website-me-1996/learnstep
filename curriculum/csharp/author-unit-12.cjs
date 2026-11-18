const {makeUnit, exercise, repair} = require('./lesson-builder.cjs');
const previous = require('./author-unit-11.cjs').data;

const reference = name => 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.' + name + '?view=net-10.0';
const indexReference = 'https://learn.microsoft.com/en-us/dotnet/api/system.array.indexof?view=net-10.0';
const collections = 'https://learn.microsoft.com/en-us/dotnet/standard/collections/';
const usingCollections = 'using System.Collections.Generic;';
const lines = (...code) => code.join('\n');
const values = items => '{ ' + items.join(', ') + ' }';
const scene = (...cards) => cards.map(([label, value]) => ({label,value}));
const scaffold = (source, input, line) => source(input).replace(line, '// اكتب الأمر هنا');

const findSource = ({codes, wanted, find = 'Array.IndexOf(codes, wanted)'}) => lines(
  'int[] codes = ' + values(codes) + ';',
  'int wanted = ' + wanted + ';',
  'int index = ' + find + ';',
  'Console.WriteLine(index);'
);
const find = exercise(findSource, [
  [{codes:[6,4,6],wanted:6},[0]], [{codes:[],wanted:6},[-1]], [{codes:[1,2,3],wanted:3},[2]]
], {declared:['codes','wanted','index'],printed:['index'],operation:'Array.IndexOf',operationIn:'index'});

const listSource = ({codes, remove, command = 'records.RemoveAt(remove);'}) => lines(
  usingCollections, '',
  'int[] codes = ' + values(codes) + ';',
  'int remove = ' + remove + ';',
  'List<int> records = new List<int>();',
  'foreach (int code in codes) { records.Add(code); }',
  'if (remove >= 0 && remove < records.Count)',
  '{',
  '    ' + command,
  '}',
  'for (int i = 0; i < records.Count; i++) { Console.WriteLine(records[i]); }',
  'Console.WriteLine(records.Count);'
);
const list = exercise(listSource, [
  [{codes:[3,8,5],remove:0},[8,5,2]], [{codes:[5],remove:0},[0]], [{codes:[9,5],remove:4},[9,5,2]]
], {declared:['codes','remove','records'],types:{records:'List<int>'},printed:['records'],calls:{RemoveAt:1}});

function endpointSource(kind, name, add, take) {
  return ({ids, get = take}) => lines(
    usingCollections, '',
    'int[] ids = ' + values(ids) + ';',
    kind + '<int> ' + name + ' = new ' + kind + '<int>();',
    'foreach (int id in ids) { ' + name + '.' + add + '(id); }',
    'if (' + name + '.Count > 0)',
    '{',
    '    int ticket = ' + name + '.' + get + '();',
    '    Console.WriteLine(ticket);',
    '}',
    'else { Console.WriteLine("فارغ"); }',
    'Console.WriteLine(' + name + '.Count);'
  );
}
const stackSource = endpointSource('Stack','stack','Push','Pop');
const stack = exercise(stackSource, [
  [{ids:[]},['فارغ',0]], [{ids:[0]},[0,0]], [{ids:[9,9,2]},[2,2]]
], {declared:['ids','stack'],types:{stack:'Stack<int>'},calls:{Push:1,Pop:1},conditionReads:['stack']});
const queueSource = endpointSource('Queue','line','Enqueue','Dequeue');
const queue = exercise(queueSource, [
  [{ids:[]},['فارغ',0]], [{ids:[0]},[0,0]], [{ids:[2,9,9]},[2,2]]
], {declared:['ids','line'],types:{line:'Queue<int>'},calls:{Enqueue:1,Dequeue:1},conditionReads:['line']});

const linkedSource = ({first, second, add = 'AddLast'}) => lines(
  usingCollections, '',
  'int first = ' + first + ';',
  'int second = ' + second + ';',
  'LinkedList<int> chain = new LinkedList<int>();',
  'chain.AddLast(first);',
  'chain.' + add + '(second);',
  'foreach (int value in chain) { Console.WriteLine(value); }',
  'Console.WriteLine(chain.Count);'
);
const linked = exercise(linkedSource, [
  [{first:3,second:17},[3,17,2]], [{first:3,second:3},[3,3,2]], [{first:-1,second:0},[-1,0,2]]
], {declared:['first','second','chain'],types:{chain:'LinkedList<int>'},calls:{AddLast:2},
    loop:{kind:'foreach',reads:['chain'],effect:'print'}});

const dictionarySource = ({code, standard, express, query = 'prices[code]'}) => lines(
  usingCollections, '',
  'string code = ' + JSON.stringify(code) + ';',
  'int standard = ' + standard + ';',
  'int express = ' + express + ';',
  'Dictionary<string,int> prices = new Dictionary<string,int>();',
  'prices.Add("A", standard);',
  'prices.Add("B", express);',
  'int price = -1;',
  'if (prices.ContainsKey(code))',
  '{',
  '    price = ' + query + ';',
  '}',
  'Console.WriteLine(price);'
);
const dictionary = exercise(dictionarySource, [
  [{code:'A',standard:0,express:13},[0]],
  [{code:'B',standard:6,express:20},[20]],
  [{code:'a',standard:6,express:12},[-1]]
], {declared:['code','standard','express','prices','price'],types:{prices:'Dictionary<string,int>'},
    printed:['price'],conditionReads:['prices','code'],indexAccess:{name:'prices',mode:'read',rank:1}});

const setSource = ({ids, check = 'seen.Add(id)'}) => lines(
  usingCollections, '',
  'int[] ids = ' + values(ids) + ';',
  'HashSet<int> seen = new HashSet<int>();',
  'int unique = 0;',
  'foreach (int id in ids)',
  '{',
  '    if (' + check + ') { unique++; }',
  '}',
  'Console.WriteLine(unique);',
  'Console.WriteLine(seen.Count);'
);
const set = exercise(setSource, [
  [{ids:[]},[0,0]], [{ids:[0,0,0]},[1,1]], [{ids:[9,2,9,1]},[3,3]]
], {declared:['ids','seen','unique'],types:{seen:'HashSet<int>'},
    printed:['unique','seen'],conditionReads:['seen'],calls:{Add:1},loop:{kind:'foreach',reads:['ids'],effect:'unique'}});

const serviceSource = ({visitors, check = 'seen.Add(id)'}) => lines(
  usingCollections, '',
  'int[] visitors = ' + values(visitors) + ';',
  'HashSet<int> seen = new HashSet<int>();',
  'Queue<int> line = new Queue<int>();',
  'int attempts = 0;',
  'foreach (int id in visitors)',
  '{',
  '    attempts++;',
  '    if (' + check + ') { line.Enqueue(id); }',
  '}',
  'while (line.Count > 0)',
  '{',
  '    Console.WriteLine(line.Dequeue());',
  '}',
  'Console.WriteLine(seen.Count);',
  'Console.WriteLine(attempts);'
);
const service = exercise(serviceSource, [
  [{visitors:[]},[0,0]], [{visitors:[5,5]},[5,1,2]], [{visitors:[0,-1,0]},[0,-1,2,3]]
], {declared:['visitors','seen','line','attempts'],types:{seen:'HashSet<int>',line:'Queue<int>'},
    printed:['attempts','seen'],calls:{Add:1,Enqueue:1,Dequeue:1},loop:{kind:'while',reads:['line'],effect:'print'}});

const lessons = [
  {
    slug:'library-array-first-index', title:'اطلب أول فهرس من Array.IndexOf', reference:indexReference,
    scene:'عندك أرقام تذاكر 8 و5 و8. ابحث عن أول خانة تحمل 8. لو الرقم غايب سجّل علامة الغياب.',
    sceneVisual:scene(['الخانات','8 · 5 · 8'],['أول ظهور للرقم 8','الفهرس 0'],['رقم مفقود','-1']),
    concept:'Array.IndexOf(codes, wanted) تبحث عن أول عنصر يساوي wanted، وتعيد فهرسه. تعيد -1 عند الغياب.',
    why:'تقدر تسأل المكتبة عن موضع رقم دون كتابة كل خطوة بحث في برنامجك.',
    mechanics:'تتبع وصول نتيجة الاستدعاء إلى index. جرّب رقمًا مكررًا ورقمًا غائبًا.',
    breakdown:['جهّز المصفوفة ورقم البحث.','استخدم Array.IndexOf.','احفظ الفهرس واطبعه.'],
    build:find({codes:[8,5,8],wanted:8},[0],'احفظ 8 و5 و8 في codes. استخدم Array.IndexOf لحفظ أول موضع للرقم wanted = 8 في index، واطبعه.',{
      attention:'المطلوب فهرس الخانة التي تحمل 8 أول مرة.',
      rule:'ترجع IndexOf أول فهرس، وترجع -1 إذا غابت القيمة.',
      help:'اكتب int index = Array.IndexOf(codes, wanted);.'
    }),
    edit:find({codes:[8,5,8],wanted:5},[1],'غيّر wanted إلى 5. تابع الفهرس الجديد.'),
    experiment:find({codes:[8,5,8],wanted:9},[-1],'ابحث عن 9. راقب علامة الغياب.'),
    bug:repair(find({codes:[8,5,8],wanted:8},[0],'خزّن الفهرس الذي تعيده المكتبة.'),findSource({codes:[8,5,8],wanted:8,find:'wanted'}),
      'ظهر الرقم 8 نفسه. ما التعبير الذي يعيد فهرسه؟',
      ['Array.IndexOf(codes, wanted)','wanted','codes.Length'],'اطلب الفهرس بـ Array.IndexOf.'),
    transfer:find({codes:[40,8,12,12],wanted:12},[2],'اعثر على أول 12 في القيم 40 و8 و12 و12. اطبع مكانها.')
  },
  {
    slug:'library-list-remove-at', title:'احذف موضعًا من List باستخدام RemoveAt', reference:reference('list-1'),
    scene:'أضف 17 و22 و41 إلى قائمة. اطلب إزالة الموضع 1، وافحص شكل القائمة وعددها بعد الطلب.',
    sceneVisual:scene(['قبل','17 · 22 · 41'],['احذف الموضع 1','RemoveAt(1)'],['بعد','17 · 41']),
    concept:'RemoveAt تأخذ فهرسًا صالحًا، وتحذف العنصر عنده. لو فيه عناصر بعده تتحرك داخل القائمة وينقص Count.',
    why:'تستخدم العملية نفسها التي نفذتها يدويًا في درس نقل الخانات.',
    mechanics:'اعرض بطاقة records قبل الحذف وبعده. يوضح التتبّع Count وقيم العناصر الجديدة.',
    breakdown:['أضف القيم إلى List<int>.','تحقق أن remove في حدود Count.','نفّذ RemoveAt واطبع المتبقي والعدد.'],
    build:list({codes:[17,22,41],remove:1},[17,41,2],'أكمل إزالة الفهرس 1 في List. اطبع 17 و41، ثم Count الذي يساوي 2.',{
      attention:'RemoveAt تستقبل رقم الموقع، فاستخدم remove.',
      rule:'Count هو عدد عناصر القائمة الموجودة الآن.',
      help:'اكتب records.RemoveAt(remove); بعد الفحص.',
      starterCode:scaffold(listSource,{codes:[17,22,41],remove:1},'records.RemoveAt(remove);')
    }),
    edit:list({codes:[17,22,41],remove:0},[22,41,2],'غيّر remove إلى 0. ما أول عنصر بعد الحذف؟'),
    experiment:list({codes:[17,22,41],remove:2},[17,22,2],'احذف الفهرس 2. راقب كيف تنتهي القائمة بعد الحذف.'),
    bug:repair(list({codes:[17,22,41],remove:1},[17,41,2],'اختر الفهرس المحدد.'),listSource({codes:[17,22,41],remove:1,command:'records.RemoveAt(0);'}),
      'اختفت 17. أي نداء يستخدم الفهرس المطلوب في remove؟',
      ['records.RemoveAt(0);','records.RemoveAt(remove);','records.Add(remove);'],'مرر remove إلى RemoveAt.',1),
    transfer:list({codes:[8,2,6,11],remove:2},[8,2,11,3],'أزل 6 من قائمة الأكواد 8 و2 و6 و11. اطبع الباقي ثم العد.',{
      starterCode:scaffold(listSource,{codes:[8,2,6,11],remove:2},'records.RemoveAt(remove);')
    })
  },
  {
    slug:'library-stack-pop', title:'أزل آخر بطاقة باستدعاء Stack.Pop', reference:reference('stack-1'),
    scene:'حط 14 ثم 22 ثم 39 في المكدس. اسحب الورقة العليا واعرف عدد البطاقات التي ظلت فيه.',
    sceneVisual:scene(['أدخل بالترتيب','Push'],['خذ الأعلى','Pop → 39'],['بقي','Count = 2']),
    concept:'Push تضع عنصرًا في الأعلى وPop تعيده وتحذفه. افحص Count قبل Pop. Peek تقرأ الأعلى وتتركه مكانه.',
    why:'تكتب عملية الرجوع عن آخر عمل مباشرة باسمها.',
    mechanics:'ترى المجموعة تتغير مع Push وPop. عند Pop تخرج قيمة 39 ويتحول Count من 3 إلى 2.',
    breakdown:['أضف الأرقام بـ Push.','تحقق من وجود عناصر.','خذ الأعلى بـ Pop واطبع الرقم والعدد الباقي.'],
    build:stack({ids:[14,22,39]},[39,2],'أكمل السحب من Stack بعد فحص Count. اطبع 39 وعدد البطاقات الباقية 2.',{
      attention:'راقب آخر عنصر وصل للمكدس.',
      rule:'Pop تزيل آخر عنصر دخل وتعيده.',
      help:'اكتب int ticket = stack.Pop();.',
      starterCode:scaffold(stackSource,{ids:[14,22,39]},'int ticket = stack.Pop();')
    }),
    edit:stack({ids:[14,39,22]},[22,2],'بدّل ترتيب آخر بطاقتين. توقّع القيمة التي تخرج.'),
    experiment:stack({ids:[22]},[22,0],'جرّب بطاقة واحدة 22. تابع Count بعد السحب.'),
    bug:repair(stack({ids:[14,22,39]},[39,2],'اسحب البطاقة بدل الاكتفاء بالقراءة.'),stackSource({ids:[14,22,39],get:'Peek'}),
      'ظهر 39 لكن Count بقي 3. أي أمر يزيل البطاقة؟',
      ['stack.Peek()','stack.Count','stack.Pop()'],'استخدم Pop لسحب البطاقة.',2),
    transfer:stack({ids:[61,62]},[62,1],'احفظ عمليتين 61 ثم 62 في مكدس وتراجع عن الأخيرة. اطبعها ثم عدد الباقي.')
  },
  {
    slug:'library-queue-dequeue', title:'خد أول منتظر باستدعاء Queue.Dequeue', reference:reference('queue-1'),
    scene:'سجّل 24 ثم 19 ثم 28 في طابور الخدمة. أول من يصل يأخذ دوره أولًا.',
    sceneVisual:scene(['دخلوا بالترتيب','24 · 19 · 28'],['من المقدمة','Dequeue → 24'],['بقي','19 · 28']),
    concept:'Enqueue تضيف إلى آخر الطابور وDequeue تأخذ أول عنصر وتزيله. افحص Count حتى تعرف هل يوجد منتظر.',
    why:'تنفذ خدمة بالترتيب الذي وصلت به الطلبات.',
    mechanics:'تعرض بطاقة الطابور الطلبات من المقدمة. عند Dequeue يختفي أول رقم وينقص Count.',
    breakdown:['أضف كل رقم باستخدام Enqueue.','افحص Count.','نفّذ Dequeue واطبع الرقم والعدد الباقي.'],
    build:queue({ids:[24,19,28]},[24,2],'أكمل أخذ أول رقم من Queue. اطبع 24 ثم Count ويساوي 2.',{
      attention:'أول قيمة في بطاقة الطابور هي الأسبق وصولًا.',
      rule:'Dequeue تخرج أسبق عنصر دخل، وتعيده.',
      help:'اكتب int ticket = line.Dequeue(); في الكتلة التي فحصت Count.',
      starterCode:scaffold(queueSource,{ids:[24,19,28]},'int ticket = line.Dequeue();')
    }),
    edit:queue({ids:[19,24,28]},[19,2],'خلّي 19 يصل قبل 24. راقب من خرج.'),
    experiment:queue({ids:[19]},[19,0],'جرّب 19 وحده. افحص العدد بعد خدمته.'),
    bug:repair(queue({ids:[24,19,28]},[24,2],'أخرج العميل من مقدمة الطابور.'),queueSource({ids:[24,19,28],get:'Peek'}),
      'تم عرض 24 لكن العدد ما اتغيرش. أي طريقة تسحب أول عنصر؟',
      ['line.Dequeue()','line.Peek()','line.Count'],'استخدم Dequeue لإزالة الرقم.',
      0),
    transfer:queue({ids:[27,93]},[27,1],'سجّل 27 ثم 93. نفّذ خدمة واحدة واطبع رقم أول منتظر وعدد المتبقي.')
  },
  {
    slug:'library-linkedlist-add-last', title:'وصّل القيم بآخر LinkedList', reference:reference('linkedlist-1'),
    scene:'عندك سلسلة محطتين. اربط المحطة 9 بعد 5، واتبع ترتيب السلسلة لتقرأهما.',
    sceneVisual:scene(['أول عنصر','5'],['أضف في النهاية','AddLast(9)'],['المرور','5 ثم 9']),
    concept:'AddLast تربط القيمة في نهاية LinkedList. AddFirst تضع القيمة في البداية. foreach تقرأ القيم حسب ترتيب القائمة.',
    why:'تربط آخر محطة جديدة من خلال واجهة المكتبة بعد فهم رابط Next.',
    mechanics:'تعرض بطاقة القائمة قيم العناصر بالترتيب. ثم يعرض foreach كل عنصر أخذته في الدورة.',
    breakdown:['أنشئ LinkedList<int>.','أضف first ثم second في النهاية.','اطبع بالمرور ثم اطبع Count.'],
    build:linked({first:5,second:9},[5,9,2],'أضف 5 ثم 9 إلى نهاية LinkedList. استخدم foreach لطباعتهما بالترتيب ثم اطبع العدد.',{
      attention:'أين تذهب second عند AddLast؟',
      rule:'الإضافة عند النهاية تُبقي القيم القديمة قبل الجديدة.',
      help:'اكتب chain.AddLast(second); بعد chain.AddLast(first);.'
    }),
    edit:linked({first:5,second:12},[5,12,2],'غيّر second إلى 12. افحص مكان القيمة الجديدة.'),
    experiment:linked({first:12,second:12},[12,12,2],'جرّب محطتين تحملان الرقم 12. راقب عدّ العناصر.'),
    bug:repair(linked({first:5,second:9},[5,9,2],'اربط الثاني في نهاية السلسلة.'),linkedSource({first:5,second:9,add:'AddFirst'}),
      'خرج 9 قبل 5. ما النداء الذي يضعه آخرًا؟',
      ['chain.AddFirst(second);','chain.AddLast(second);','chain.AddLast(first);'],'أضف second باستخدام AddLast.',1),
    transfer:linked({first:42,second:67},[42,67,2],'رتّب محطتي 42 و67 في قائمة مترابطة واطبع ترتيبهما وعددهما.')
  },
  {
    slug:'library-dictionary-key', title:'هات القيمة بالمفتاح من Dictionary', reference:reference('dictionary-2'),
    scene:'جدول أسعار فيه بطاقة A بسعر 6 وبطاقة B بسعر 12. اسأل عن B. افحص وجود صف باسم B وبعدها اقرأ السعر.',
    sceneVisual:scene(['المفتاح','B'],['موجود؟','ContainsKey → true'],['القيمة','prices["B"] → 12']),
    concept:'Dictionary<string,int> تربط مفتاحًا نصيًا بقيمة عددية. ContainsKey تفحص وجوده، وبعدها prices[code] تأخذ قيمة نفس المفتاح.',
    why:'تقدر تطلب سعرًا برمز التذكرة وتعالج الرمز الغائب.',
    mechanics:'تظهر المفاتيح والقيم أزواجًا. عند وجود المفتاح يعرض التتبّع الخانة التي قرأها.',
    breakdown:['أضف السعرين تحت A وB.','افحص code بـ ContainsKey.','اقرأ prices[code] عند الوجود، وأبقِ -1 عند الغياب.'],
    build:dictionary({code:'B',standard:6,express:12},[12],'أكمل قراءة السعر في فرع وجود code. اطبع 12 للمفتاح B.',{
      attention:'القيمة المطلوبة من المفتاح المحفوظ في code.',
      rule:'استخدم نفس المفتاح في اختبار الوجود والقراءة.',
      help:'ضع price = prices[code]; داخل شرط prices.ContainsKey(code).',
      starterCode:scaffold(dictionarySource,{code:'B',standard:6,express:12},'price = prices[code];')
    }),
    edit:dictionary({code:'A',standard:6,express:12},[6],'بدّل code إلى A. اقرأ السعر المخزن لها.'),
    experiment:dictionary({code:'C',standard:6,express:12},[-1],'جرّب C. تابع متى يظل السعر عند -1.'),
    bug:repair(dictionary({code:'B',standard:6,express:12},[12],'اقرأ سعر المفتاح نفسه.'),dictionarySource({code:'B',standard:6,express:12,query:'prices["A"]'}),
      'فحصنا وجود B، لكن طُبع سعر A. أي تعبير يقرأ حسب code؟',
      ['prices["A"]','prices.Count','prices[code]'],'استخدم code في فهرسة القاموس.',2),
    transfer:dictionary({code:'B',standard:30,express:45},[45],'جهّز سعرين 30 و45. اطلب سعر B من القاموس واطبعه.',{
      starterCode:scaffold(dictionarySource,{code:'B',standard:30,express:45},'price = prices[code];')
    })
  },
  {
    slug:'library-hashset-add-once', title:'استخدم نتيجة HashSet.Add لمنع التكرار', reference:reference('hashset-1'),
    scene:'تدخل للبوابة قراءات 2 و2 و4. اقبل الرقم أول مرة واكتشف أنها محاولة مكررة لو ظهر مرة ثانية.',
    sceneVisual:scene(['أول 2','Add → true'],['ثاني 2','Add → false'],['العدد النهائي','Count = 2']),
    concept:'HashSet.Add تعيد true إذا حفظت عنصرًا جديدًا، وتعيد false عندما يكون موجودًا. اعتمد على هذه القيمة لعدّ الإضافات الجديدة.',
    why:'تحتفظ بمجموعة معرّفات فريدة، حتى لو تكرر المسح أو تنوعت الأرقام.',
    mechanics:'راقب Count في كل استدعاء. حين ترى نتيجة false يبقى العدد كما كان.',
    breakdown:['جهّز HashSet<int> فارغة.','مرّ على كل id وجرّب Add.','زد unique عند true فقط.'],
    build:set({ids:[2,2,4]},[2,2],'اكتب شرط seen.Add(id) لزيادة unique عند إدخال رقم جديد. اطبع unique ثم Count.',{
      attention:'هل كانت محاولة الإضافة الثانية للرقم 2 ناجحة؟',
      rule:'Add تُرجع true عند إضافة قيمة جديدة، وfalse عند وجودها.',
      help:'اكتب if (seen.Add(id)) { unique++; }.'
    }),
    edit:set({ids:[2,2,2]},[1,1],'بدّل آخر 4 إلى 2. تابع كم مرة أعادت Add قيمة true.'),
    experiment:set({ids:[2,7,9]},[3,3],'استخدم ثلاث قيم مختلفة: 2 و7 و9. تابع Count بعد كل إضافة.'),
    bug:repair(set({ids:[2,2,4]},[2,2],'اربط العد بنجاح محاولة الإضافة.'),setSource({ids:[2,2,4],check:'true'}),
      'زاد unique في كل دورة، والمجموعة بقيت فارغة. أي شرط يحفظ الرقم ويعرف لو جديد؟',
      ['seen.Add(id)','true','seen.Contains(id)'],'نفّذ Add واجعل قيمة إرجاعها تحدد الزيادة.'),
    transfer:set({ids:[5,8,5,3]},[3,3],'عدّ الأكواد الفريدة من 5 و8 و5 و3. قارن الحصيلة بـ Count.')
  },
  {
    slug:'library-queue-unique-service', title:'خلّي كل معرّف ياخد دورًا واحدًا', reference:collections,
    scene:'استقبال سجل المسحات 7 و7 و9 و7 و12. كل معرّف جديد يأخذ دورًا، والخدمة تحصل حسب أول ظهور.',
    sceneVisual:scene(['المسحات','7 · 7 · 9 · 7 · 12'],['المقبول مرة','7 · 9 · 12'],['آخر الخدمة','3 فريدين · 5 محاولات']),
    concept:'HashSet.Add تحدد لو هذا أول وصول. عند الموافقة يدخل المعرّف إلى Queue، ثم تخرج الأدوار بترتيب الدخول.',
    why:'تستعمل كل بنية لغرض محدد في نفس البرنامج.',
    mechanics:'راقب حالة seen وخط line. في التكرار تظهر false، والطابور يظل كما هو.',
    breakdown:['احسب محاولة لكل مسح.','أضف إلى Queue فقط عندما توافق Add.','افرغ الطابور بالترتيب، ثم اطبع عدد الفريدين والمحاولات.'],
    build:service({visitors:[7,7,9,7,12]},[7,9,12,3,5],'أكمل شرط قبول المسح لأول مرة. اطبع 7 و9 و12 بالترتيب ثم 3 للفريدين و5 للمحاولات.',{
      attention:'راجع أول شرط قبل أن يدخل رقم إلى الطابور.',
      rule:'تستقبل Queue فقط المعرف الذي نجحت إضافته إلى المجموعة.',
      help:'اكتب if (seen.Add(id)) { line.Enqueue(id); } بعد زيادة attempts.',
      starterCode:scaffold(serviceSource,{visitors:[7,7,9,7,12]},'if (seen.Add(id)) { line.Enqueue(id); }')
    }),
    edit:service({visitors:[9,9,7,9,12]},[9,7,12,3,5],'اجعل 9 يدخل قبل 7. هل يبقى ترتيب الخدمة مطابقًا لأول وصول؟'),
    experiment:service({visitors:[9,9,9]},[9,1,3],'جرّب ثلاث مسحات للرقم 9. احسب كم مرة خُدم وكم مرة مُسح.'),
    bug:repair(service({visitors:[7,7,9,7,12]},[7,9,12,3,5],'اقبل كل معرّف مرة.'),serviceSource({visitors:[7,7,9,7,12],check:'true'}),
      'دخل الرقم 7 ثلاث مرات. ما الشرط الذي يقبل ظهوره الأول فقط؟',
      ['true','seen.Add(id)','seen.Count == 0'],'اجعل Add تختبر حداثة المعرّف قبل دخوله الطابور.',1),
    transfer:service({visitors:[3,8,3,0,8]},[3,8,0,3,5],'اخدم المسحات 3 و8 و3 و0 و8 مرة لكل شخص. اطبع الطلبات بالترتيب ثم الفريدين والمحاولات.',{
      starterCode:scaffold(serviceSource,{visitors:[3,8,3,0,8]},'if (seen.Add(id)) { line.Enqueue(id); }')
    })
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'طلبات استقبال ومجموعات .NET'}));

exports.data = makeUnit({
  id:'dotnet-collections',title:'استخدم مجموعات .NET',description:'المصفوفة والقائمة والمكدس والطابور والقائمة المترابطة والقاموس والمجموعة.',
  previous,lessons,skill:'عمليات مجموعات .NET',runtime:'csharp-foundations-subset-v11'
});

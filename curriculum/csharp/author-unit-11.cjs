const {makeUnit, exercise, repair} = require('./lesson-builder.cjs');
const previous = require('./author-unit-10.cjs').data;
const reference = name => 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.' + name + '?view=net-10.0';
const arrays = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays';
const scene = (...cards) => cards.map(([label, value]) => ({label,value}));
const lines = (...code) => code.join('\n');
const array = items => '{ ' + items.join(', ') + ' }';
const index = (name, mode = 'read') => ({name,mode,rank:1});
const scaffold = (source, input, line) => source(input).replace(line, '// اكتب الأمر هنا');

const fixedSource = ({capacity, position, item, selected = 'position'}) => lines(
  'int capacity = ' + capacity + ';',
  'int position = ' + position + ';',
  'int item = ' + item + ';',
  'int[] slots = new int[capacity];',
  'int writes = 0;',
  'slots[' + selected + '] = item;',
  'writes++;',
  'Console.WriteLine(slots[position]);',
  'Console.WriteLine(writes);',
  'Console.WriteLine(slots.Length);'
);
const fixed = exercise(fixedSource, [
  [{capacity:1,position:0,item:15},[15,1,1]],
  [{capacity:4,position:3,item:23},[23,1,4]],
  [{capacity:6,position:3,item:-4},[-4,1,6]]
], {declared:['capacity','position','item','slots','writes'],printed:['slots','writes'],indexAccess:index('slots','write')});

const shiftSource = ({items, count, remove, source = 'items[i + 1]'}) => lines(
  'int[] items = ' + array(items) + ';',
  'int count = ' + count + ';',
  'int remove = ' + remove + ';',
  'int shifts = 0;',
  'if (remove >= 0 && remove < count)',
  '{',
  '    for (int i = remove; i < count - 1; i++)',
  '    {',
  '        items[i] = ' + source + ';',
  '        shifts++;',
  '    }',
  '    count--;',
  '}',
  'for (int i = 0; i < count; i++)',
  '{',
  '    Console.WriteLine(items[i]);',
  '}',
  'Console.WriteLine(shifts);'
);
const shift = exercise(shiftSource, [
  [{items:[2,4,8,0],count:3,remove:0},[4,8,2]],
  [{items:[3,7,9,0],count:3,remove:2},[3,7,0]],
  [{items:[0,0,0],count:0,remove:0},[0]]
], {declared:['items','count','remove','shifts'],printed:['shifts'],indexAccess:index('items','write'),loop:{kind:'for',reads:['count'],effect:'shifts'}});

const stackSource = ({stack, size, top = 'size'}) => lines(
  'int[] stack = ' + array(stack) + ';',
  'int size = ' + size + ';',
  'int reads = 0;',
  'if (size > 0)',
  '{',
  '    size--;',
  '    int taken = stack[' + top + '];',
  '    reads++;',
  '    Console.WriteLine(taken);',
  '}',
  'else',
  '{',
  '    Console.WriteLine("فارغ");',
  '}',
  'Console.WriteLine(size);',
  'Console.WriteLine(reads);'
);
const pop = exercise(stackSource, [
  [{stack:[0,0,0],size:0},['فارغ',0,0]],
  [{stack:[0,0,0],size:1},[0,0,1]],
  [{stack:[9,3,16,0],size:3},[16,2,1]]
], {declared:['stack','size','reads'],updated:['size'],printed:['size','reads'],indexAccess:index('stack'),conditionReads:['size']});

const queueSource = ({queue, head, count, update = '(head + 1) % queue.Length'}) => lines(
  'int[] queue = ' + array(queue) + ';',
  'int head = ' + head + ';',
  'int count = ' + count + ';',
  'int reads = 0;',
  'if (count > 0)',
  '{',
  '    int served = queue[head];',
  '    head = ' + update + ';',
  '    count--;',
  '    reads++;',
  '    Console.WriteLine(served);',
  '}',
  'else',
  '{',
  '    Console.WriteLine("فارغ");',
  '}',
  'Console.WriteLine(head);',
  'Console.WriteLine(reads);'
);
const dequeue = exercise(queueSource, [
  [{queue:[10,22,35,0],head:1,count:2},[22,2,1]],
  [{queue:[17,0,0,9],head:3,count:2},[9,0,1]],
  [{queue:[0,0,0,0],head:2,count:0},['فارغ',2,0]]
], {declared:['queue','head','count','reads'],updated:['head'],operation:'%',operationIn:'head',indexAccess:index('queue')});

const node = lines(
  '', 'class Node',
  '{',
  '    public int Value;',
  '    public Node? Next;',
  '    public Node(int input)',
  '    {',
  '        Value = input;',
  '    }',
  '}'
);
const linkSource = ({firstValue, lastValue, target = 'tail'}) => lines(
  'int firstValue = ' + firstValue + ';',
  'int lastValue = ' + lastValue + ';',
  'Node head = new Node(firstValue);',
  'Node tail = new Node(lastValue);',
  'head.Next = ' + target + ';',
  'Console.WriteLine(head.Value);',
  'Console.WriteLine(head.Next.Value);',
  node
);
const link = exercise(linkSource, [
  [{firstValue:8,lastValue:3},[8,3]], [{firstValue:5,lastValue:5},[5,5]], [{firstValue:0,lastValue:-2},[0,-2]]
], {declared:['head','tail','firstValue','lastValue'],types:{head:'Node',tail:'Node'},printed:['head'],read:['tail'],fieldAccess:{name:'Next',mode:'write'}});

const walkSource = ({length, firstValue, lastValue, update = 'current.Next'}) => lines(
  'int length = ' + length + ';',
  'int firstValue = ' + firstValue + ';',
  'int lastValue = ' + lastValue + ';',
  'Node? head = null;',
  'if (length > 0) { head = new Node(firstValue); }',
  'if (length > 1 && head != null) { head.Next = new Node(lastValue); }',
  'Node? current = head;',
  'int visited = 0;',
  'while (current != null)',
  '{',
  '    Console.WriteLine(current.Value);',
  '    current = ' + update + ';',
  '    visited++;',
  '}',
  'Console.WriteLine(visited);',
  node
);
const walk = exercise(walkSource, [
  [{length:0,firstValue:2,lastValue:7},[0]],
  [{length:1,firstValue:0,lastValue:7},[0,1]],
  [{length:2,firstValue:9,lastValue:9},[9,9,2]]
], {declared:['head','current','visited'],types:{current:'Node?'},fieldAccess:{name:'Next',mode:'read'},
    loop:{kind:'while',reads:['current'],effect:'visited'}});

const hashSource = ({wanted, selected = '(start + offset) % keys.Length'}) => lines(
  'int[] keys = { 8, 13, 9, -1 };',
  'int[] amounts = { 80, 130, 90, 0 };',
  'int wanted = ' + wanted + ';',
  'int start = wanted % keys.Length;',
  'int probes = 0;',
  'int amount = -1;',
  'for (int offset = 0; offset < keys.Length; offset++)',
  '{',
  '    int slot = ' + selected + ';',
  '    probes++;',
  '    if (keys[slot] == -1) { break; }',
  '    if (keys[slot] == wanted)',
  '    {',
  '        amount = amounts[slot];',
  '        break;',
  '    }',
  '}',
  'Console.WriteLine(amount);',
  'Console.WriteLine(probes);'
);
const hash = exercise(hashSource, [
  [{wanted:13},[130,1]], [{wanted:9},[90,2]], [{wanted:5},[-1,3]], [{wanted:0},[-1,4]]
], {declared:['keys','amounts','wanted','start','probes','amount'],printed:['amount','probes'],indexAccess:index('keys'),
    operation:'%',operationIn:'slot',loop:{kind:'for',reads:['keys'],effect:'probes'}});

const seenSource = ({scans, check = '!seen[id]'}) => lines(
  'int[] scans = ' + array(scans) + ';',
  'bool[] seen = { false, false, false, false, false, false };',
  'int checks = 0;',
  'int unique = 0;',
  'foreach (int id in scans)',
  '{',
  '    checks++;',
  '    if (' + check + ')',
  '    {',
  '        seen[id] = true;',
  '        unique++;',
  '    }',
  '}',
  'Console.WriteLine(unique);',
  'Console.WriteLine(checks);'
);
const mark = exercise(seenSource, [
  [{scans:[]},[0,0]], [{scans:[0,0,0]},[1,3]], [{scans:[5,0,2,1]},[4,4]]
], {declared:['scans','seen','checks','unique'],printed:['unique','checks'],indexAccess:index('seen','write'),
    conditionReads:['seen'],loop:{kind:'foreach',reads:['scans'],effect:'unique'}});

const lessons = [
  {
    slug:'manual-array-capacity', title:'اكتب في خانة من مصفوفة ثابتة', reference:arrays,
    scene:'جهّز رفًا فيه أربع خانات فاضية. سجّل تذكرة واحدة في خانة معروفة، وعدّ مرات الكتابة.',
    sceneVisual:scene(['السعة','4 خانات'],['اكتب في الفهرس 2','0 → 7'],['الكتابات','1']),
    concept:'حجم مصفوفة int يحدده العدد الذي تمرّره إلى new int[capacity]. كل خانة تبدأ بصفر، وتحديد position يوصلك لخانة مباشرة.',
    why:'تقدر تعرف حجم الرف من جديد وتفصل عدد الكتابات عن السعة.',
    mechanics:'تظهر خاناتها بأصفار، ثم تضيء الخانة المحددة. راقب writes بعد الكتابة.',
    breakdown:['جهّز مصفوفة بطول capacity.','أسند item إلى خانة position.','زد writes مرة واطبع العنصر والعداد والطول.'],
    build:fixed({capacity:4,position:2,item:7},[7,1,4],'احجز 4 خانات في slots، وضع item = 7 في position = 2. زد writes عند الإسناد، واطبع الخانة ثم عدد الكتابات ثم Length.',{
      attention:'قارن تغيّر خانة واحدة بالسعة التي بقيت 4.',
      rule:'الإسناد لفهرس صالح يزور خانة واحدة.',
      help:'اكتب int[] slots = new int[capacity]; ثم slots[position] = item;. بعده writes++;.'
    }),
    edit:fixed({capacity:4,position:2,item:12},[12,1,4],'غيّر item إلى 12. راقب عداد الكتابة.'),
    experiment:fixed({capacity:6,position:2,item:12},[12,1,6],'وسّع الرف إلى 6 عند إنشائه. كم كتابة احتجت للخانة 2؟'),
    bug:repair(fixed({capacity:4,position:2,item:7},[7,1,4],'وجّه القيمة للخانة المطلوبة.'),fixedSource({capacity:4,position:2,item:7,selected:'0'}),
      'الخانة المطلوبة ما زالت 0. فين راح الرقم؟',
      ['إلى الخانة 0.','إلى كل الخانات.','إلى خانة position.'],'استخدم position داخل الأقواس في الإسناد.'),
    transfer:fixed({capacity:3,position:1,item:16},[16,1,3],'جهّز ثلاث خانات واحفظ 16 في الثانية. اطبع القيمة والكتابات والسعة.')
  },
  {
    slug:'manual-list-shift', title:'اسدّ فراغ القائمة بنقل الخانات', reference:reference('list-1'),
    scene:'في أول ثلاث خانات تذاكر 17 و22 و41. شيل تذكرة 22 وانقل 41 خطوة ناحية الفراغ. طول الجزء المستخدم بقى اثنين.',
    sceneVisual:scene(['الجزء المستخدم','17 · 22 · 41'],['انقل خانة','41 → الفهرس 1'],['بعد النقل','count = 2 · shifts = 1']),
    concept:'لما تشيل عنصرًا من وسط ترتيب متصل، كل عنصر بعده يتحرك خانة لليسار. count يحدد الخانات التي تعتبرها جزءًا من القائمة.',
    why:'تلاحظ لماذا الحذف من أول القائمة قد يحتاج نقلات أكثر من الحذف عند آخر عنصر.',
    mechanics:'تضيء خانة الوجهة في كل إسناد، وترى shifts يزيد مع كل خانة تُنقل.',
    breakdown:['افحص صلاحية remove داخل count.','انسخ من اليمين إلى الفراغ حتى قبل آخر عنصر.','نقص count، ثم اطبع أول count عناصر والعداد.'],
    build:shift({items:[17,22,41,0],count:3,remove:1},[17,41,1],'أكمل سطر النقل في الحلقة. احذف الفهرس 1 من أول 3 عناصر، فتظهر 17 و41 وعمليّة نقل واحدة.',{
      attention:'شوف مين هيملا الخانة i. مصدره الخانة اللي بعدها.',
      rule:'نقل الخانة التالية يسد الفراغ قبل تقليل count.',
      help:'اكتب items[i] = items[i + 1]; داخل الحلقة.',
      starterCode:scaffold(shiftSource,{items:[17,22,41,0],count:3,remove:1},'items[i] = items[i + 1];')
    }),
    edit:shift({items:[17,22,41,0],count:3,remove:0},[22,41,2],'غيّر remove إلى 0. تابع نقلتين بدل واحدة.'),
    experiment:shift({items:[17,22,41,0],count:3,remove:2},[17,22,0],'احذف آخر عنصر مستخدم بوضع remove = 2. احسب النقلات.'),
    bug:repair(shift({items:[17,22,41,0],count:3,remove:1},[17,41,1],'انقل الخانة التالية إلى الفراغ.'),shiftSource({items:[17,22,41,0],count:3,remove:1,source:'items[i]'}),
      'بعد الحذف بقي 22 مكانه. أي إسناد ينقل قيمة الخانة التالية؟',
      ['items[i] = items[i];','items[i] = items[i + 1];','items[i + 1] = items[i];'],'اقرأ من i + 1 واكتب عند i.',1),
    transfer:shift({items:[5,6,7,8,0],count:4,remove:1},[5,7,8,2],'احذف 6 من الجزء المستخدم ذي القيم 5 و6 و7 و8، واعرض النقلات.',{
      starterCode:scaffold(shiftSource,{items:[5,6,7,8,0],count:4,remove:1},'items[i] = items[i + 1];')
    })
  },
  {
    slug:'manual-stack-pop', title:'اسحب آخر شيء دخل المكدّس', reference:reference('stack-1'),
    scene:'رصّ 14 ثم 22 ثم 39 فوق بعض. اسحب الورقة اللي فوق. زد عداد القراءة مرة واحدة.',
    sceneVisual:scene(['قبل السحب','14 · 22 · 39'],['أعلى المكدّس','39'],['بعد السحب','size = 2']),
    concept:'المكدّس يخرج آخر عنصر دخل. إذا كان الجزء المستخدم طوله size فالخانة العليا فهرسها size - 1.',
    why:'تقدر تتبع الرجوع عن آخر إجراء من دون البحث بين العناصر.',
    mechanics:'ينقص size أولًا، ثم تضيء الخانة التي أصبح رقمها يساوي size.',
    breakdown:['افحص أن size أكبر من 0.','نقص size، واقرأ stack[size].','اطبع العنصر وحجم الجزء الباقي وعدد القراءات.'],
    build:pop({stack:[14,22,39,0],size:3},[39,2,1],'كمّل سطر أخذ العنصر بعد size--. اطبع 39 ثم عدد البطاقات الباقية 2 ثم عدد القراءات 1.',{
      attention:'بعد الإنقاص يشير size مباشرة للفهرس المطلوب.',
      rule:'آخر عنصر مستخدم قبل الإزالة هو أول عنصر يخرج.',
      help:'ضع int taken = stack[size]; بعد size--.',
      starterCode:scaffold(stackSource,{stack:[14,22,39,0],size:3},'int taken = stack[size];')
    }),
    edit:pop({stack:[14,22,39,0],size:2},[22,1,1],'ابدأ بجزء مستخدم فيه ورقتان فقط. توقّع الورقة التي ستخرج.'),
    experiment:pop({stack:[14,22,39,0],size:0},['فارغ',0,0],'اعتبر المكدّس فارغًا بوضع size = 0. راجع عدد القراءات.'),
    bug:repair(pop({stack:[14,22,39,0],size:3},[39,2,1],'اسحب من أعلى المكدس.'),stackSource({stack:[14,22,39,0],size:3,top:'0'}),
      'خرجت 14 وهي أول ورقة دخلت. أي فهرس يقرأ الأعلى بعد size--؟',
      ['0','size - 1','size'],'بعد الإنقاص استخدم size.',2),
    transfer:pop({stack:[101,205,306],size:3},[306,2,1],'طبّق السحب على رصة أرقام الطلبات 101 و205 و306. اطبع الرقم الذي خرج والعدد الباقي والقراءات.',{
      starterCode:scaffold(stackSource,{stack:[101,205,306],size:3},'int taken = stack[size];')
    })
  },
  {
    slug:'manual-queue-dequeue', title:'خد أول المنتظرين وحرّك المقدمة', reference:reference('queue-1'),
    scene:'الدور واقف عند الخانة 1 وعليها 22. نادِ 22 وحوّل المقدمة للخانة 2.',
    sceneVisual:scene(['المقدمة الآن','head = 1'],['اقرأ العميل','queue[1] → 22'],['بعد الخدمة','head = 2']),
    concept:'الطابور يخرج أسبق عنصر دخل. head مكان أول منتظر. بعد القراءة يتحرك head خانة، وعند نهاية المصفوفة يرجع إلى 0.',
    why:'تستفيد من الخانات مرة ثانية من غير نقل كل الناس في الصف.',
    mechanics:'تضيء خانة القراءة الحالية؛ في لقطة التحديث يظهر head بعد الحركة.',
    breakdown:['تأكد أن count أكبر من 0.','اقرأ queue[head].','حرّك head باستخدام باقي القسمة، ونقص count.'],
    build:dequeue({queue:[10,22,35,0],head:1,count:2},[22,2,1],'أكمل تحديث head بعد القراءة. اطبع رقم المنتظر 22، ثم 2 للمقدمة الجديدة، ثم عدد القراءات.',{
      attention:'اقرأ أولًا من head القديم. بعدها احسب الفهرس الجديد.',
      rule:'باقي قسمة head + 1 على السعة يعيد المؤشر إلى صفر عند النهاية.',
      help:'اكتب head = (head + 1) % queue.Length;.',
      starterCode:scaffold(queueSource,{queue:[10,22,35,0],head:1,count:2},'head = (head + 1) % queue.Length;')
    }),
    edit:dequeue({queue:[10,22,35,0],head:2,count:1},[35,3,1],'ابدأ بالمقدمة 2 مع منتظر واحد. تابع الفهرس بعد خدمته.'),
    experiment:dequeue({queue:[14,0,0,36],head:3,count:2},[36,0,1],'ضع المقدمة عند آخر خانة وعليها 36. راقب رجوع head إلى 0.'),
    bug:repair(dequeue({queue:[14,0,0,36],head:3,count:2},[36,0,1],'أعد المقدمة إلى أول خانة.'),queueSource({queue:[14,0,0,36],head:3,count:2,update:'head + 1'}),
      'ظهر head = 4 في مصفوفة طولها 4. أي تعبير يلفّ إلى الصفر؟',
      ['(head + 1) % queue.Length','head + 1','head - 1'],'استخدم باقي القسمة بحجم المصفوفة.'),
    transfer:dequeue({queue:[61,70,18,46],head:3,count:3},[46,0,1],'نادِ أول طلب وهو 46 عند الفهرس 3. اعرض مكان المقدمة بعده والقراءات.',{
      starterCode:scaffold(queueSource,{queue:[61,70,18,46],head:3,count:3},'head = (head + 1) % queue.Length;')
    })
  },
  {
    slug:'manual-linked-next', title:'اربط عقدة بالتي بعدها', reference:reference('linkedlist-1'),
    scene:'في يدك كارت 8 وكارت 3. اكتب على كارت 8 الرقم الذي يوصّلك إلى كارت 3. افتح الرابط واقرأ قيمة الكارت الثاني.',
    sceneVisual:scene(['بداية السلسلة','head → #1'],['الرابط','Next → #2'],['الخانة على #2','Value = 3']),
    concept:'عقدة Node فيها قيمة Value ومرجع Next لعقدة تالية. Node? Next يسمح بأن تكون النهاية null.',
    why:'ترتب عناصر في سلسلة باتباع عناوين الخانات المتصلة.',
    mechanics:'يظهر Next في بطاقة head وبداخله رقم بطاقة tail. عند القراءة يضيء حقل Value على البطاقة التالية.',
    breakdown:['أنشئ عقدتين بقيمتين مستقلتين.','أعطِ head.Next مرجع tail.','اقرأ head.Value ثم head.Next.Value.'],
    build:link({firstValue:8,lastValue:3},[8,3],'أكمل رابط head.Next. اطبع قيمة head 8 ثم انتقل بالرابط لقيمة 3.',{
      attention:'قارن رقم tail بالرقم الموجود داخل حقل Next.',
      rule:'Next يخزّن مرجع عقدة، وValue تحمل بياناتها.',
      help:'اكتب head.Next = tail;.',
      starterCode:scaffold(linkSource,{firstValue:8,lastValue:3},'head.Next = tail;')
    }),
    edit:link({firstValue:8,lastValue:12},[8,12],'غيّر قيمة العقدة الأخيرة إلى 12. تابع أي رقم مرجع تغيّر وأي قيمة تغيّرت.'),
    experiment:link({firstValue:12,lastValue:12},[12,12],'استخدم 12 في العقدتين. افحص رقمي الكائن للتأكد من أنهما بطاقتان.'),
    bug:repair(link({firstValue:8,lastValue:3},[8,3],'اربط الرأس بالعقدة التالية.'),linkSource({firstValue:8,lastValue:3,target:'head'}),
      'ظهر 8 مرتين. أي قيمة لـ Next توصّل للبطاقة الثانية؟',
      ['head','null','tail'],'ضع المرجع الموجود في tail داخل head.Next.',2),
    transfer:link({firstValue:60,lastValue:41},[60,41],'جهّز عقدة 60 وبعدها عقدة 41، ثم اطبعهما من الرأس والرابط.',{
      starterCode:scaffold(linkSource,{firstValue:60,lastValue:41},'head.Next = tail;')
    })
  },
  {
    slug:'manual-linked-walk', title:'اتبع Next إلى أن تصل إلى null', reference:reference('linkedlist-1'),
    scene:'أمامك سلسلة بطاقتين. امسك الأولى، اقرأها، وانتقل للبطاقة التي تشير إليها. توقف لما تجد خانة العنوان التالي فاضية.',
    sceneVisual:scene(['زيارة 1','#1 · 8'],['زيارة 2','#2 · 3'],['نهاية','current = null']),
    concept:'يحمل current مرجع العقدة التي يعمل عليها الكمبيوتر. current = current.Next يحرّكه للعقدة التالية دون تعديل رابط العقدة القديمة.',
    why:'تقدر تعدّ أو تقرأ عناصر القائمة من الرأس للنهاية بما فيها حالة القائمة الفارغة.',
    mechanics:'رقم current يتغير مع كل انتقال. بمجرد أن يصبح null يتوقف شرط while.',
    breakdown:['ضع head في current.','اطبع قيمة current ما دامت تشير لعقدة.','غيّر current إلى Next وزد visited.'],
    build:walk({length:2,firstValue:8,lastValue:3},[8,3,2],'أكمل سطر حركة current. اطبع 8 ثم 3 ثم عدد الزيارات 2.',{
      attention:'مع كل دورة تابع رقم الكائن في صف current.',
      rule:'أقرأ العقدة الحالية قبل التحرك، وشرط while يحمي الوصول عند null.',
      help:'اكتب current = current.Next; بعد الطباعة.',
      starterCode:scaffold(walkSource,{length:2,firstValue:8,lastValue:3},'current = current.Next;')
    }),
    edit:walk({length:1,firstValue:8,lastValue:3},[8,1],'غيّر length إلى 1 فتوجد عقدة واحدة. تتبّع آخر انتقال.'),
    experiment:walk({length:0,firstValue:8,lastValue:3},[0],'ضع length = 0. تابع شرط الحلقة وعدد الزيارات.'),
    bug:repair(walk({length:2,firstValue:8,lastValue:3},[8,3,2],'تحرّك حسب كل رابط.'),walkSource({length:2,firstValue:8,lastValue:3,update:'null'}),
      'طُبعت 8 فقط. ما الإسناد الذي يوصلك للعقدة التالية؟',
      ['current = head;','current = current.Next;','current = null;'],'حدّث current بعنوان Next الموجود في العقدة الحالية.',1),
    transfer:walk({length:2,firstValue:11,lastValue:17},[11,17,2],'امشِ على البطاقتين 11 ثم 17 واعرض عدد الزيارات.',{
      starterCode:scaffold(walkSource,{length:2,firstValue:11,lastValue:17},'current = current.Next;')
    })
  },
  {
    slug:'manual-hash-probe', title:'جرّب الخانة التالية عند التصادم', reference:reference('dictionary-2'),
    scene:'رقما 13 و9 يختاران الخانة 1 في رف من أربع خانات باستخدام باقي القسمة. تجد 13 في الخانة، فتجرب اللي بعدها وتصل إلى 9.',
    sceneVisual:scene(['بداية البحث عن 9','9 % 4 → 1'],['الفحص الأول','13 · أكمل'],['الفحص الثاني','9 · القيمة 90']),
    concept:'في نموذج جدول التجزئة الصغير نحسب خانة البداية من المفتاح. لو الخانة تحمل مفتاحًا مختلفًا نتحرك للخانة التالية. -1 علامة الفراغ في هذا المثال.',
    why:'تقدر ترى سبب تكرار الفحص عند التصادم، وتعرف ماذا يعدّ probes.',
    mechanics:'انتبه إلى slot بعد كل تعارض. عند المساواة يقرأ البرنامج amount من خانة لها نفس الفهرس.',
    breakdown:['احسب start للمفتاح المطلوب.','غيّر slot بإزاحة offset وافحص مفتاحها.','عند التطابق اقرأ القيمة، وعند الفراغ أو نهاية المحاولات توقف.'],
    build:hash({wanted:9},[90,2],'أكمل حساب slot حتى تتقدم عند التصادم. ابحث عن 9 واطبع قيمة 90 ثم عدد الفحوص 2.',{
      attention:'في الزيارة الأولى offset يساوي 0. في الثانية يساوي 1.',
      rule:'فحص خانة جديدة يضيف الإزاحة ثم يلف داخل عدد الخانات.',
      help:'اكتب int slot = (start + offset) % keys.Length;.',
      starterCode:scaffold(hashSource,{wanted:9},'int slot = (start + offset) % keys.Length;')
    }),
    edit:hash({wanted:13},[130,1],'جرّب المفتاح 13. تابع عدد الفحوص عند إصابة الخانة من أول محاولة.'),
    experiment:hash({wanted:5},[-1,3],'جرّب مفتاحًا غير موجود وهو 5. توقّع نقطة التوقف.'),
    bug:repair(hash({wanted:9},[90,2],'تحرك للخانة التالية عند الاختلاف.'),hashSource({wanted:9,selected:'start'}),
      'زاد probes لكن الخانة ما اتحركتش. أي تعبير يضم رقم المحاولة؟',
      ['start','(start + offset) % keys.Length','offset % keys.Length'],'اضف offset إلى start عند اختيار الخانة.',1),
    transfer:hash({wanted:0},[-1,4],'ابحث عن المفتاح 0. اخرج عند الخانة الفارغة واطبع -1 وأربع فحوص.',{
      starterCode:scaffold(hashSource,{wanted:0},'int slot = (start + offset) % keys.Length;')
    })
  },
  {
    slug:'manual-set-seen', title:'سجّل المعرّف مرة واحدة', reference:reference('hashset-1'),
    scene:'بوابة تستقبل المسح 2 ثم 2 ثم 4. ضع علامة عند الزيارة الأولى لكل رقم في لوحة صغيرة، واحسب عدد الأرقام المختلفة.',
    sceneVisual:scene(['المسح الأول','2 · علّمها'],['المسح الثاني','2 · العلامة موجودة'],['المسح الثالث','4 · علّمها']),
    concept:'كل معرّف من 0 إلى 5 يقابل خانة bool. يزداد عدد المعرّفات المختلفة عندما تنتقل خانة من false إلى true.',
    why:'تمنع العد المكرر مع الاستمرار في فحص كل عنصر جديد.',
    mechanics:'في كل مرور يظهر id. اقرأ علامة seen[id] ثم راقب إن كانت ستتغير ويزيد unique.',
    breakdown:['اقرأ كل id بالترتيب.','إذا كانت خانته false ضع true.','زد unique للعلامة الأولى، وchecks لكل محاولة.'],
    build:mark({scans:[2,2,4]},[2,3],'أكمل شرط العلامة في seen لمعرّفات 2 و2 و4. اطبع 2 للأرقام المختلفة و3 لعدد الفحوص.',{
      attention:'المرة الثانية للرقم 2 تقرأ علامة موجودة بالفعل.',
      rule:'الزيادة في unique تحصل أول مرة فقط لكل معرّف.',
      help:'اكتب if (!seen[id]) قبل الكتلة التي تضع true.',
      starterCode:seenSource({scans:[2,2,4],check:'false'})
    }),
    edit:mark({scans:[2,2,2]},[1,3],'بدّل 4 إلى 2. تابع عدد العلامات الجديدة رغم بقاء ثلاث فحوص.'),
    experiment:mark({scans:[]},[0,0],'جرّب scans فارغة. هل حصل فحص أو إضافة؟'),
    bug:repair(mark({scans:[2,2,4]},[2,3],'عد فقط عندما تحتاج علامة جديدة.'),seenSource({scans:[2,2,4],check:'true'}),
      'ظهر 3 للأرقام المختلفة. أي شرط يمنع زيادة العدد بعد وجود العلامة؟',
      ['true','seen[id]','!seen[id]'],'افحص أن خانة المعرّف لم تُعلّم بعد.',2),
    transfer:mark({scans:[0,3,0,5,3]},[3,5],'عدّ الأرقام المختلفة ضمن 0 و3 و0 و5 و3، واطبع عدد المحاولات أيضًا.',{
      starterCode:seenSource({scans:[0,3,0,5,3],check:'false'})
    })
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'رفّ تذاكر وطابور استقبال'}));

exports.data = makeUnit({
  id:'manual-data-structures',title:'حرّك البيانات بإيدك',description:'السعة والنقل والمكدّس والطابور والعقد والبحث بمفتاح ومنع التكرار.',
  previous,lessons,skill:'تمثيل هياكل البيانات يدويًا',runtime:'csharp-foundations-subset-v10'
});

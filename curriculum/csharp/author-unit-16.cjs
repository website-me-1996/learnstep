const {makeUnit, exercise, repair} = require('./lesson-builder.cjs');
const previous = require('./author-unit-15.cjs').data;

const arrays = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays';
const functions = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/building-software/local-functions';
const queue = 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1?view=net-10.0';
const nist = term => 'https://xlinux.nist.gov/dads/HTML/' + term + '.html';
const scene = (...cards) => cards.map(([label,value]) => ({label,value}));
const lines = (...code) => code.join('\n');
const startCollection = 'using System.Collections.Generic;';
const network = [
  [0,1,1,0,0],
  [0,0,0,1,0],
  [0,0,0,1,0],
  [1,0,0,0,0],
  [0,0,0,0,0]
];
const chain = [
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [0,0,0,0]
];
const mapLiteral = graph => graph.length
  ? '{\n' + graph.map(row => '    { ' + row.join(', ') + ' }').join(',\n') + '\n}'
  : 'new int[0, 0]';
const mapDeclaration = graph => 'int[,] graph = ' + mapLiteral(graph) + ';';
const index = (name, mode = 'read', rank = 2) => ({name,mode,rank});
const scaffold = (source, input, line) => source(input).replace(line, '// اكتب الأمر هنا');

const adjacencySource = ({source, target, graph = network, lookup = 'graph[source, target]'}) => lines(
  mapDeclaration(graph),
  'int source = ' + source + ';',
  'int target = ' + target + ';',
  'int direct = ' + lookup + ';',
  'Console.WriteLine(direct);'
);
const adjacency = exercise(adjacencySource, [
  [{source:0,target:2},[1]], [{source:2,target:0},[0]], [{source:4,target:4},[0]],
  [{graph:[[1]],source:0,target:0},[1]]
], {declared:['graph','source','target','direct'],printed:['direct'],read:['source','target'],indexAccess:index('graph')});

const bfsSource = ({start, graph = network, check = 'visited.Add(next)'}) => lines(
  startCollection, '',
  mapDeclaration(graph),
  'int start = ' + start + ';',
  'HashSet<int> visited = new HashSet<int>();',
  'Queue<int> pending = new Queue<int>();',
  'visited.Add(start);',
  'pending.Enqueue(start);',
  'while (pending.Count > 0)',
  '{',
  '    int current = pending.Dequeue();',
  '    Console.WriteLine(current);',
  '    for (int next = 0; next < graph.GetLength(1); next++)',
  '    {',
  '        if (graph[current, next] == 1 && ' + check + ')',
  '        {',
  '            pending.Enqueue(next);',
  '        }',
  '    }',
  '}'
);
const breadth = exercise(bfsSource, [
  [{start:1},[1,3,0,2]], [{start:4},[4]], [{start:0,graph:[[1]]},[0]],
  [{start:0,graph:chain},[0,1,2,3]]
], {declared:['graph','start','visited','pending'],types:{visited:'HashSet<int>',pending:'Queue<int>'},
    calls:{Add:1,Enqueue:1,Dequeue:1},indexAccess:index('graph'),conditionReads:['graph','visited'],
    loop:{kind:'while',reads:['pending'],effect:'print'}});

const dfsSource = ({start, graph = network, stop = '!visited.Add(current)'}) => lines(
  startCollection, '',
  mapDeclaration(graph),
  'int start = ' + start + ';',
  'HashSet<int> seen = new HashSet<int>();',
  'Visit(graph, start, seen);', '',
  'void Visit(int[,] map, int current, HashSet<int> visited)',
  '{',
  '    if (' + stop + ') { return; }',
  '    Console.WriteLine(current);',
  '    for (int next = 0; next < map.GetLength(1); next++)',
  '    {',
  '        if (map[current, next] == 1) { Visit(map, next, visited); }',
  '    }',
  '}'
);
const depth = exercise(dfsSource, [
  [{start:1},[1,3,0,2]], [{start:4},[4]], [{start:0,graph:[[1]]},[0]],
  [{start:0,graph:chain},[0,1,2,3]]
], {declared:['graph','start','seen'],types:{seen:'HashSet<int>'},
    calls:{Visit:1,Add:1},indexAccess:index('map'),conditionReads:['map','visited']});

const invalid = 'مدخل غير صالح';
const rangeGuard = 'map.GetLength(0) != map.GetLength(1) || start < 0 || start >= map.GetLength(0) || goal < 0 || goal >= map.GetLength(0)';
const routeFunction = ({parent = 'current', guard = rangeGuard} = {}) => lines(
  '', 'void PrintRoute(int[,] map, int start, int goal)',
  '{',
  '    if (' + guard + ')',
  '    {',
  '        Console.WriteLine("' + invalid + '");',
  '        return;',
  '    }',
  '    int[] distance = new int[map.GetLength(0)];',
  '    int[] previous = new int[map.GetLength(0)];',
  '    for (int i = 0; i < distance.Length; i++)',
  '    {',
  '        distance[i] = -1;',
  '        previous[i] = -1;',
  '    }',
  '    Queue<int> pending = new Queue<int>();',
  '    distance[start] = 0;',
  '    pending.Enqueue(start);',
  '    while (pending.Count > 0)',
  '    {',
  '        int current = pending.Dequeue();',
  '        if (current == goal) { break; }',
  '        for (int next = 0; next < map.GetLength(1); next++)',
  '        {',
  '            if (map[current, next] == 1 && distance[next] == -1)',
  '            {',
  '                distance[next] = distance[current] + 1;',
  '                previous[next] = ' + parent + ';',
  '                pending.Enqueue(next);',
  '            }',
  '        }',
  '    }',
  '    Console.WriteLine(distance[goal]);',
  '    if (distance[goal] < 0) { return; }',
  '    Stack<int> path = new Stack<int>();',
  '    int step = goal;',
  '    while (step != -1)',
  '    {',
  '        path.Push(step);',
  '        step = previous[step];',
  '    }',
  '    while (path.Count > 0) { Console.WriteLine(path.Pop()); }',
  '}'
);
const routeSource = ({start, goal, graph = network, parent}) => lines(
  startCollection, '',
  mapDeclaration(graph),
  'int start = ' + start + ';',
  'int goal = ' + goal + ';',
  'PrintRoute(graph, start, goal);',
  routeFunction({parent})
);
const project = exercise(routeSource, [
  [{start:0,goal:0},[0,0]], [{start:4,goal:0},[-1]], [{start:0,goal:5},[invalid]],
  [{start:0,goal:3,graph:chain},[3,0,1,2,3]], [{start:0,goal:0,graph:[]},[invalid]],
  [{start:0,goal:0,graph:[[0,1]]},[invalid]]
], {declared:['graph','start','goal'],calls:{PrintRoute:1},operation:'[]'});

const boundarySource = ({begin, second, outside, graph = network, guard}) => lines(
  startCollection, '',
  mapDeclaration(graph),
  'int begin = ' + begin + ';',
  'int second = ' + second + ';',
  'int outside = ' + outside + ';',
  'PrintRoute(graph, begin, begin);',
  'PrintRoute(graph, begin, second);',
  'PrintRoute(graph, begin, outside);',
  routeFunction({guard})
);
const edgeCases = exercise(boundarySource, [
  [{begin:4,second:0,outside:-1},[0,4,-1,invalid]],
  [{begin:2,second:3,outside:500},[0,2,1,2,3,invalid]],
  [{begin:0,second:0,outside:0,graph:[]},[invalid,invalid,invalid]],
  [{begin:0,second:0,outside:5,graph:[[0,1]]},[invalid,invalid,invalid]]
], {declared:['graph','begin','second','outside'],calls:{PrintRoute:3},conditionReads:['start','goal']});

const lessons = [
  {
    slug:'graph-read-adjacency',title:'حوّل الوصلة إلى خانة في مصفوفة الجوار',reference:arrays,algorithmReference:nist('graph'),
    scene:'محطة 0 لها طريق إلى محطة 1. ارسم صفًا لمحطة الانطلاق وعمودًا لمحطة الوصول. ضع 1 عند الوصلة من 0 إلى 1.',
    sceneVisual:scene(['محطة الانطلاق','الصف 0'],['محطة الوصول','العمود 1'],['عند التقاطع','graph[0, 1] = 1']),
    concept:'الرسم البياني يربط محطات بوصلات. في هذه المصفوفة، 1 عند [source, target] تعني وجود وصلة من المصدر إلى الهدف. كل اتجاه له خانته.',
    why:'تقدر تسأل عن اتصال مباشر بلغتك المعتادة لاختيار خانة من مصفوفة.',
    mechanics:'تضيء خانة صف الانطلاق وعمود الوصول، ويظهر رقم الوصلة في direct.',
    breakdown:['حدد المصدر والهدف.','اقرأ المصدر من الصف والهدف من العمود.','اطبع 1 لو الاتصال مسجلًا أو 0 لو غائبًا.'],
    build:adjacency({source:0,target:1},[1],'اقرأ هل فيه طريق مباشر من 0 إلى 1. خزّن نتيجة مصفوفة الجوار في direct واطبعها.',{
      attention:'اتجاه الحركة يحدد أي الرقمين صف وأيهما عمود.',
      rule:'الصف نقطة الانطلاق والعمود نقطة الوصول في هذا الرسم.',
      help:'اكتب int direct = graph[source, target];.'
    }),
    edit:adjacency({source:1,target:0},[0],'اعكس الاتجاه إلى 1 ثم 0. انظر إلى الخانة الجديدة.'),
    experiment:adjacency({source:2,target:3},[1],'جرّب الاتصال من 2 إلى 3. حدد مكانه في المصفوفة قبل التنفيذ.'),
    bug:repair(adjacency({source:0,target:1},[1],'اقرأ الاتجاه المطلوب.'),adjacencySource({source:0,target:1,lookup:'graph[target, source]'}),
      'بحثت عن المسار من 0 إلى 1، فحص البرنامج العكس. ما الترتيب المناسب للفهارس؟',
      ['graph[source, target]','graph[target, source]','graph[source, source]'],'اكتب source أولًا وtarget ثانيًا.'),
    transfer:adjacency({source:3,target:0},[1],'اقرأ الوصلة من 3 إلى 0 واطبع النتيجة.')
  },
  {
    slug:'graph-bfs-queue',title:'زُر المحطات الأقرب أولًا باستخدام BFS',reference:queue,algorithmReference:nist('breadthfirst'),
    scene:'أنت في محطة 0. سجّل أقرب المحطات 1 و2 في الطابور. محطة 3 تدخل بعدهما عندما تفتح الطريق إليها من 1.',
    sceneVisual:scene(['ابدأ','0'],['طبقة واحدة','1 ثم 2'],['طبقتان','3']),
    concept:'في BFS اقرأ أول محطة من الطابور وأضف جيرانها الجدد إلى آخره. علّم المحطة عند الإضافة حتى تدخل مرة واحدة، حتى مع وجود دورة.',
    why:'تزور كل محطة يمكن الوصول إليها بحسب عدد الوصلات من نقطة البداية.',
    mechanics:'تُظهر بطاقة pending ترتيب الانتظار، وتوضح Add إذا كانت المحطة جديدة. أثناء الفحص تظهر خانة الجوار الحالية.',
    breakdown:['علّم نقطة البداية وأدخلها الطابور.','اسحب أول محطة واطبعها.','لكل وصلة، أضف المحطة التي نجح تعليمها.'],
    build:breadth({start:0},[0,1,2,3],'أكمل شرط إضافة جار جديد إلى pending. ابدأ من 0 واطبع ترتيب الزيارة 0 ثم 1 ثم 2 ثم 3.',{
      attention:'تحقق من الوصلة أولًا، ثم اسأل visited.Add هل المحطة جديدة.',
      rule:'تعليم المحطة عند دخولها الطابور يمنع تكرار دخولها.',
      help:'اكتب if (graph[current, next] == 1 && visited.Add(next)).',
      starterCode:bfsSource({start:0,check:'false'})
    }),
    edit:breadth({start:2},[2,3,0,1],'ابدأ من 2. شوف 0 تدخل الطابور بعدما تزور 3.'),
    experiment:breadth({start:4},[4],'ابدأ من المحطة المنعزلة 4. راقب انتهاء الطابور بعد أول زيارة.'),
    bug:repair(breadth({start:0},[0,1,2,3],'اسمح بإضافة الجار عند نجاح تعليمه.'),bfsSource({start:0,check:'visited.Contains(next)'}),
      'الطابور انتهى بعد طباعة 0. ما العملية التي تسجّل الجار وتخبرك أنه جديد؟',
      ['visited.Contains(next)','visited.Add(next)','visited.Count == 0'],'استعمل Add لتعليم المحطة الجديدة في نفس الشرط.',1),
    transfer:breadth({start:1},[1,3,0,2],'ابدأ من 1 واطبع كل محطة يمكن الوصول لها بترتيب BFS.')
  },
  {
    slug:'graph-dfs-recursive',title:'اتبع فرعًا حتى النهاية باستخدام DFS',reference:functions,algorithmReference:nist('depthfirst'),
    scene:'تبدأ من 0 ولديك طريقان. امشِ في الأول عبر 1 إلى 3. لما تلاقي طريقًا يرجع إلى محطة زرتها، ارجع وجرب الفرع الآخر.',
    sceneVisual:scene(['اتبع الفرع الأول','0 → 1 → 3'],['وصلة إلى محطة زُرت','3 → 0 · ارجع'],['الفرع التالي','0 → 2']),
    concept:'DFS تتابع جارًا عبر استدعاء جديد قبل الانتقال للجار التالي. تعود Visit فورًا من محطة سبق تعليمها، وتكمّل الاستدعاءات السابقة بعد الرجوع.',
    why:'تقدر تستكشف عُمق الفرع وتعود لبقية المسارات عند قفل الفرع الأول.',
    mechanics:'راقب عمق Visit ورقم current. عند محطة مكررة تظهر نتيجة Add بقيمة false ثم يعود التنفيذ.',
    breakdown:['علّم current وارجع بسرعة عند التكرار.','اطبع المحطة عند زيارتها الأولى.','استدعِ Visit عند كل وصلة ثم تابع بعد رجوعها.'],
    build:depth({start:0},[0,1,3,2],'أكمل شرط التوقف في Visit قبل الطباعة. ابدأ من 0 واطبع 0 و1 و3 و2 بترتيب DFS.',{
      attention:'حافظ على نفس مجموعة visited في كل الاستدعاءات.',
      rule:'الزيارة المكررة ترجع قبل استكشاف الجيران مرة ثانية.',
      help:'اكتب if (!visited.Add(current)) { return; }.',
      starterCode:dfsSource({start:0,stop:'true'})
    }),
    edit:depth({start:2},[2,3,0,1],'ابدأ من 2. تتبّع الفرع الذي يمر بـ3 ويصل إلى 0.'),
    experiment:depth({start:4},[4],'ابدأ من 4. هل توجد محطة مجاورة تحتاج زيارتها؟ راقب نهاية الفرع.'),
    bug:repair(depth({start:0},[0,1,3,2],'أكمل الزيارة عند تعليم محطة جديدة.'),dfsSource({start:0,stop:'visited.Add(current)'}),
      'رجعت الدالة قبل طباعة المحطة الأولى. أي شرط يوقف الزيارة عندما يكون الرقم مكررًا؟',
      ['visited.Add(current)','current == 0','!visited.Add(current)'],'اعكس نتيجة Add للرجوع عندما تعطي false.',2),
    transfer:depth({start:3},[3,0,1,2],'ابدأ من 3 واطبع الترتيب 3 ثم 0 ثم 1 ثم 2. راقب الرجوع عند اكتشاف الدورة.')
  },
  {
    slug:'graph-project-shortest-route',title:'مشروع المحطات، احفظ الوصلة السابقة',reference:queue,algorithmReference:nist('breadthfirst'),
    scene:'عندك مشوار من 0 إلى 3 وكل وصلة لها نفس التكلفة. عندما تصل لأول مرة لمحطة، اكتب بجوارها المحطة اللي جيت منها. عند الهدف اتبع العلامات للخلف لتعرف الطريق.',
    sceneVisual:scene(['أول وصول إلى 3','3 ← 1 ← 0'],['ارجع من الهدف','ضع 3 ثم 1 ثم 0 في المكدّس'],['اطبع من البداية','0 ثم 1 ثم 3']),
    concept:'وقت إضافة next لأول مرة في BFS خزن current في previous[next]. للوصول للمسار اتبع previous من الهدف للخلف، ثم استخدم Stack لإخراج المحطات من البداية.',
    why:'تحوّل نتيجة البحث إلى طريق يمكن عرضه، وتحصل على أقل عدد وصلات في رسم غير موزون.',
    mechanics:'بجوار distance ترى الخانة التي سجلت previous. يعرض الطابور الزيارات والمكدّس ترتيب المسار عند طباعته.',
    breakdown:['سجّل المسافة والسابق عند الاكتشاف الأول.','إذا وصل الهدف، امشِ بعكس اتجاه المسار مستخدمًا previous.','اطبع عدد الوصلات ثم أخرج المحطات من المكدّس بالترتيب.'],
    build:project({start:0,goal:3},[2,0,1,3],'أكمل حفظ المحطة السابقة في BFS. اطبع المسافة 2 ثم المحطات 0 و1 و3.',{
      attention:'أضف السهم من next المكتشفة إلى current التي وصلنا منها.',
      rule:'لكل محطة جديدة احفظ السابقة في لحظة تسجيل أقصر مسافة.',
      help:'اكتب previous[next] = current; بعد تحديث distance[next].',
      starterCode:scaffold(routeSource,{start:0,goal:3},'previous[next] = current;')
    }),
    edit:project({start:0,goal:2},[1,0,2],'اجعل الهدف 2. توقع عدد الوصلات وتسلسل المحطات الجديد.'),
    experiment:project({start:0,goal:4},[-1],'اجعل الهدف 4. افحص حالة عدم وجود مسار.'),
    bug:repair(project({start:0,goal:3},[2,0,1,3],'سجّل المحطة التي وصلنا منها فعلًا.'),routeSource({start:0,goal:3,parent:'start'}),
      'البرنامج أخرج 0 ثم 3 رغم أن المسافة 2. أي سطر يحفظ المحطة الوسيطة عند الاكتشاف؟',
      ['previous[next] = current;','previous[next] = start;','previous[current] = next;'],'احفظ current باعتبارها السابقة لكل next جديدة.'),
    transfer:project({start:2,goal:1},[3,2,3,0,1],'اطبع أقصر طريق من 2 إلى 1. عُد من الهدف بالمراجع ثم أخرج الطريق من البداية.',{
      starterCode:scaffold(routeSource,{start:2,goal:1},'previous[next] = current;')
    })
  },
  {
    slug:'graph-project-boundary-tests',title:'اختبر الوصول والغياب وحدود الفهارس',reference:arrays,algorithmReference:nist('breadthfirst'),
    scene:'قبل تسليم دليل المحطات جرّب ثلاث تذاكر. الأولى لنفس المحطة، والثانية لمحطة منعزلة، والثالثة برقم خارج الخريطة. توقع مخرجاتها قبل الضغط على التشغيل.',
    sceneVisual:scene(['نفس البداية والهدف','0 وصلات'],['الهدف منعزل','-1'],['رقم خارج الخريطة','مدخل غير صالح']),
    concept:'نفس الدالة تمرّ باختبارات ذات نتائج معروفة. المسار إلى البداية طوله صفر، والهدف الصحيح الغائب يعيد -1، والمدخل خارج الفهارس يتوقف في الحارس قبل البحث.',
    why:'تتأكد من أن مشروعك يعطي ردًا يمكن تفسيره في الحالات التي تفشل فيها البرامج عادةً.',
    mechanics:'يظهر فصل كل استدعاء داخل PrintRoute. عند رقم غير صالح يعيد التنفيذ قبل إنشاء طابور.',
    breakdown:['توقع مخرجات الحالة العادية والحالات الحدية.','افحص أن البداية والهدف داخل فهارس الخريطة.','نفّذ الحالات وقارن المخرجات بتوقعك.'],
    build:edgeCases({begin:0,second:4,outside:5},[0,0,-1,invalid],'أكمل الحارس ليختبر الحد الأعلى للهدف. شغّل حالات 0 إلى 0، و0 إلى 4، و0 إلى 5 وتحقق من الردود.',{
      attention:'عدد المحطات هو أول فهرس خارج الحدود.',
      rule:'كل فهرس صالح أكبر من أو يساوي صفرًا وأصغر من عدد المحطات.',
      help:'أضف || goal >= map.GetLength(0) إلى شرط الحارس.',
      starterCode:boundarySource({begin:0,second:4,outside:5,guard:rangeGuard.replace(' || goal >= map.GetLength(0)','')})
    }),
    edit:edgeCases({begin:0,second:3,outside:5},[0,0,2,0,1,3,invalid],'بدّل المحطة الثانية إلى 3 القابلة للوصول. راجع أن الحالات الأخرى لها نفس الردود.'),
    experiment:edgeCases({begin:4,second:0,outside:-1},[0,4,-1,invalid],'ابدأ من المحطة المنعزلة 4 وجرّب هدفًا سالبًا كالحالة الثالثة.'),
    bug:repair(edgeCases({begin:0,second:4,outside:5},[0,0,-1,invalid],'أخرج عند الهدف الذي يساوي عدد المحطات.'),boundarySource({begin:0,second:4,outside:5,guard:rangeGuard.replace('goal >=','goal >')}),
      'ظهر خطأ عند رقم هدف يساوي طول المصفوفة. أي شرط يمنع الفهرس الأول بعد آخر محطة؟',
      ['goal > map.GetLength(0)','goal >= map.GetLength(0)','goal == 0'],'استخدم >= كي يشمل الحارس الحد نفسه.',1),
    transfer:edgeCases({begin:1,second:3,outside:12},[0,1,1,1,3,invalid],'اختبر 1 إلى 1، و1 إلى 3، و1 إلى 12. قارن المسافة والطريق ورسالة المدخل غير الصالح.')
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'دليل محطات وأقصر مسار'}));

exports.data = makeUnit({
  id:'graph-traversals',title:'اعبر الرسم البياني واختبر الطريق',description:'مصفوفة الجوار، BFS وDFS، مشروع أقصر مسار، واختبارات الحدود.',
  previous,lessons,skill:'الرسوم البيانية ومشروع المحطات',runtime:'csharp-foundations-subset-v11'
});

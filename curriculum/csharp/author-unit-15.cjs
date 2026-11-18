const {makeUnit, exercise, repair} = require('./lesson-builder.cjs');
const previous = require('./author-unit-14.cjs').data;

const classes = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes';
const functions = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/building-software/local-functions';
const arrays = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays';
const nist = term => 'https://xlinux.nist.gov/dads/HTML/' + term + '.html';
const scene = (...cards) => cards.map(([label,value]) => ({label,value}));
const lines = (...code) => code.join('\n');
const array = items => '{ ' + items.join(', ') + ' }';
const scaffold = (source, input, line) => source(input).replace(line, '// اكتب الأمر هنا');

const node = lines(
  '', 'class Node',
  '{',
  '    public int Value;',
  '    public Node? Left;',
  '    public Node? Right;',
  '    public Node(int number) { Value = number; }',
  '}'
);
const treeSource = ({rootValue, leftValue, rightValue, connect = 'left'}) => lines(
  'int rootValue = ' + rootValue + ';',
  'int leftValue = ' + leftValue + ';',
  'int rightValue = ' + rightValue + ';',
  'Node root = new Node(rootValue);',
  'Node left = new Node(leftValue);',
  'Node right = new Node(rightValue);',
  'root.Left = ' + connect + ';',
  'root.Right = right;',
  'Console.WriteLine(root.Value);',
  'Console.WriteLine(root.Left.Value);',
  'Console.WriteLine(root.Right.Value);',
  node
);
const branches = exercise(treeSource, [
  [{rootValue:1,leftValue:8,rightValue:3},[1,8,3]],
  [{rootValue:4,leftValue:4,rightValue:4},[4,4,4]],
  [{rootValue:0,leftValue:-7,rightValue:15},[0,-7,15]]
], {declared:['root','left','right','rootValue','leftValue','rightValue'],types:{root:'Node',left:'Node',right:'Node'},
    printed:['root'],read:['left','right'],fieldAccess:{name:'Left',mode:'write'}});

const countSource = ({shape, result = '1 + leftCount + rightCount'}) => lines(
  'int shape = ' + shape + ';',
  'Node? root = null;',
  'if (shape > 0) { root = new Node(10); }',
  'if (shape > 1 && root != null) { root.Left = new Node(5); }',
  'if (shape > 2 && root != null) { root.Right = new Node(17); }',
  'if (shape > 3 && root != null && root.Left != null) { root.Left.Left = new Node(3); }',
  'int size = Count(root);',
  'Console.WriteLine(size);', '',
  'int Count(Node? current)',
  '{',
  '    if (current == null) { return 0; }',
  '    int leftCount = Count(current.Left);',
  '    int rightCount = Count(current.Right);',
  '    return ' + result + ';',
  '}',
  node
);
const count = exercise(countSource, [
  [{shape:0},[0]], [{shape:1},[1]], [{shape:2},[2]], [{shape:4},[4]]
], {declared:['shape','root','size'],types:{root:'Node?'},printed:['size'],calls:{Count:1}});

const bstSource = ({wanted, smaller = 'current.Left'}) => lines(
  'int wanted = ' + wanted + ';',
  'Node root = new Node(12);',
  'root.Left = new Node(5);',
  'root.Right = new Node(17);',
  'root.Left.Right = new Node(9);',
  'Node? current = root;',
  'int visits = 0;',
  'bool found = false;',
  'while (current != null)',
  '{',
  '    visits++;',
  '    if (wanted == current.Value) { found = true; break; }',
  '    if (wanted < current.Value) { current = ' + smaller + '; }',
  '    else { current = current.Right; }',
  '}',
  'Console.WriteLine(found);',
  'Console.WriteLine(visits);',
  node
);
const search = exercise(bstSource, [
  [{wanted:12},['True',1]], [{wanted:17},['True',2]], [{wanted:4},['False',2]], [{wanted:9},['True',3]], [{wanted:30},['False',2]]
], {declared:['wanted','current','visits','found'],types:{current:'Node?'},printed:['found','visits'],
    conditionReads:['current','wanted'],fieldAccess:{name:'Left',mode:'read'},loop:{kind:'while',reads:['current'],effect:'visits',jumps:['break']}});

const heapSource = ({heap, size, added, up = 'parent'}) => lines(
  'int[] heap = ' + array(heap) + ';',
  'int size = ' + size + ';',
  'int added = ' + added + ';',
  'int index = size;',
  'heap[index] = added;',
  'size++;',
  'int swaps = 0;',
  'while (index > 0)',
  '{',
  '    int parent = (index - 1) / 2;',
  '    if (heap[parent] <= heap[index]) { break; }',
  '    int temporary = heap[parent];',
  '    heap[parent] = heap[index];',
  '    heap[index] = temporary;',
  '    index = ' + up + ';',
  '    swaps++;',
  '}',
  'for (int i = 0; i < size; i++) { Console.WriteLine(heap[i]); }',
  'Console.WriteLine(swaps);'
);
const heap = exercise(heapSource, [
  [{heap:[0],size:0,added:6},[6,0]], [{heap:[4,0],size:1,added:2},[2,4,1]],
  [{heap:[4,0],size:1,added:4},[4,4,0]], [{heap:[2,7,9,0],size:3,added:-1},[-1,2,9,7,2]]
], {declared:['heap','size','added','index','swaps'],printed:['heap','swaps'],operation:'/',operationIn:'parent',
    indexAccess:{name:'heap',mode:'write',rank:1},loop:{kind:'while',reads:['index'],effect:'swaps'}});

const lessons = [
  {
    slug:'tree-root-left-right',title:'اربط الجذر بفرعين',reference:classes,algorithmReference:nist('binarytree'),
    scene:'لوحة تنظيم لها بطاقة رئيسية وبطاقتان تحتها. ضع عنوان البطاقة اليسرى في خانة Left، وعنوان اليمنى في Right.',
    sceneVisual:scene(['الجذر','root · 13'],['فرع يسار','Left → 8'],['فرع يمين','Right → 20']),
    concept:'العقدة في الشجرة الثنائية لها مكان للابن الأيسر ومكان لليمين. كل خانة مرجع إلى عقدة، وتظل null إذا غاب الابن.',
    why:'تقدر تبني شكلًا له تفرّع بعد ما عرفت رابط Next في القائمة.',
    mechanics:'اعرض رقم root ثم اتبع رقمي Left وRight في بطاقته. كل رقم يوصلك إلى قيمة في كائن آخر.',
    breakdown:['أنشئ عقدة للجذر وكل ابن.','احفظ مرجع left في Left وright في Right.','اطبع القيم من الجذر ثم اليسار ثم اليمين.'],
    build:branches({rootValue:13,leftValue:8,rightValue:20},[13,8,20],'أكمل ربط الفرع الأيسر. اطبع قيمة الجذر 13 ثم الابن الأيسر 8 ثم الأيمن 20.',{
      attention:'Left تحتفظ بمرجع left. قيمة 8 موجودة داخل بطاقة العقدة.',
      rule:'كل فرع يحمل مرجعًا لعقدة مستقلة.',
      help:'اكتب root.Left = left;.',
      starterCode:scaffold(treeSource,{rootValue:13,leftValue:8,rightValue:20},'root.Left = left;')
    }),
    edit:branches({rootValue:13,leftValue:4,rightValue:20},[13,4,20],'غيّر قيمة الابن الأيسر إلى 4. تابع رقم الكائن وقيمته.'),
    experiment:branches({rootValue:13,leftValue:4,rightValue:4},[13,4,4],'جرّب ابنين بنفس القيمة 4. قارن معرفيهما في التتبّع.'),
    bug:repair(branches({rootValue:13,leftValue:8,rightValue:20},[13,8,20],'أوصل الجذر للفرع الصحيح.'),treeSource({rootValue:13,leftValue:8,rightValue:20,connect:'right'}),
      'ظهر 20 مرتين رغم وجود عقدة قيمتها 8. ما الإسناد الصحيح للفرع الأيسر؟',
      ['root.Left = left;','root.Left = right;','root.Left = root;'],'ضع عنوان left في Left.'),
    transfer:branches({rootValue:9,leftValue:17,rightValue:3},[9,17,3],'جهّز خريطة فيها جذر 9 وفرع أيسر 17 وفرع أيمن 3. اطبعها بالترتيب من المراجع.')
  },
  {
    slug:'tree-recursive-count',title:'عدّ عقدة واحدة ثم اجمع الفرعين',reference:functions,algorithmReference:nist('binarytree'),
    scene:'عندك ثلاث بطاقات متصلة. كل بطاقة تسأل فرعيها عن عدد البطاقات تحتهما، وبعد الرجوع تضيف واحدًا لنفسها.',
    sceneVisual:scene(['الفرع الفارغ','null → 0'],['العقدة الورقة','1 + 0 + 0'],['الجذر مع فرعين','1 + 1 + 1 → 3']),
    concept:'Count(null) تعيد صفرًا. Count لعقدة موجودة تجمع عدد عقد الفرع الأيسر والفرع الأيمن وتضيف واحدًا للعقدة التي بدأت منها.',
    why:'تتعامل مع فرع فارغ أو طويل بنفس قاعدة العد.',
    mechanics:'راقب current حين تنتقل الدالة يسارًا ثم يمينًا. القيمة تتجمع عند الرجوع من الفرعين.',
    breakdown:['افحص current وأعد 0 عند null.','استدعِ Count على كل فرع.','أعد واحدًا ونتيجتي الفرعين.'],
    build:count({shape:3},[3],'أكمل سطر الإرجاع في Count. عند وجود جذر وابنين اطبع 3.',{
      attention:'الجذر يدخل في العد مرة مع ناتج الفرعين.',
      rule:'عدد العقد = 1 للعقدة الحالية + عدد عقد الفرعين.',
      help:'اكتب return 1 + leftCount + rightCount;.',
      starterCode:scaffold(countSource,{shape:3},'return 1 + leftCount + rightCount;')
    }),
    edit:count({shape:4},[4],'غيّر shape إلى 4 لإضافة عقدة تحت الفرع الأيسر. تابع الاستدعاء الأعمق.'),
    experiment:count({shape:0},[0],'جرّب شجرة فارغة. توقّع ما يحدث عند أول فحص.'),
    bug:repair(count({shape:3},[3],'احسب العقدة الحالية.'),countSource({shape:3,result:'leftCount + rightCount'}),
      'العقدة التي ليس لها أبناء رجّعت 0. كيف تجعلها تدخل في العد؟',
      ['return leftCount + rightCount;','return 1 + leftCount + rightCount;','return 1;'],'زد واحدًا للعقدة الحالية بعد جمع الفرعين.',1),
    transfer:count({shape:2},[2],'اعرض عدد عقد شجرة فيها جذر وابن أيسر فقط. اتبع الفرع الفارغ عند اليمين.')
  },
  {
    slug:'tree-bst-search',title:'اختر الفرع من قيمة العقدة',reference:classes,algorithmReference:nist('binarySearchTree'),
    scene:'ابحث عن بطاقة 9 في شجرة مفاتيح مرتبة. عند 12 اتجه يسارًا، وعند 5 اتجه يمينًا، فتصل إلى 9.',
    sceneVisual:scene(['قارن عند الجذر','9 < 12 · يسار'],['قارن عند 5','9 > 5 · يمين'],['التطابق','9 · الزيارة الثالثة']),
    concept:'في شجرة البحث هنا المفاتيح الأصغر توجد في الفرع الأيسر والأكبر في الأيمن. افحص current وحرّك المرجع إلى فرع واحد كل مرة.',
    why:'تستبعد فرعًا كاملًا بالمقارنة مع مفتاح واحد وتعدّ العقد التي زرتها.',
    mechanics:'يعرض التتبّع current وقيمة العقدة عند كل قرار. عند null تعرف أن الفرع انتهى دون تطابق.',
    breakdown:['ابدأ من root وافحص المساواة.','للمفتاح الأصغر اتجه يسارًا، وللأكبر يمينًا.','أوقف البحث عند التطابق أو عند null.'],
    build:search({wanted:9},['True',3],'أكمِل حركة current عند كون wanted أصغر. ابحث عن 9 واطبع True ثم ثلاث زيارات.',{
      attention:'في لحظة المقارنة اختر الفرع الذي يمكن أن يحتوي المفتاح.',
      rule:'المفتاح الأصغر من قيمة العقدة يوجّهك إلى Left.',
      help:'في شرط الأصغر استخدم current = current.Left;.',
      starterCode:bstSource({wanted:9,smaller:'null'})
    }),
    edit:search({wanted:12},['True',1],'ابحث عن 12. توقّع عدد المقارنات عندما يكون المطلوب عند الجذر.'),
    experiment:search({wanted:4},['False',2],'ابحث عن 4. تابع انتقال current إلى null من العقدة 5.'),
    bug:repair(search({wanted:9},['True',3],'اختر فرع الأصغر بدقة.'),bstSource({wanted:9,smaller:'current.Right'}),
      'بعد مقارنة 9 مع 12 مشى الكمبيوتر إلى 17. ما الانتقال الصحيح؟',
      ['current = current;','current = current.Right;','current = current.Left;'],'اتجه إلى Left عند البحث عن قيمة أصغر.',2),
    transfer:search({wanted:17},['True',2],'اعثر على 17 واطبع النتيجة وعدد العقد التي فحصتها.')
  },
  {
    slug:'heap-insert-sift-up',title:'صعّد العنصر الجديد في الكومة الصغرى',reference:arrays,algorithmReference:nist('binaryheap'),
    scene:'على لوحة الأولوية الجذر فيه 3. حطّ تذكرة الأولوية 1 آخر اللوحة. قارنها بالأب وبدّلها لأعلى حتى يصبح الأب أصغر أو تصل للجذر.',
    sceneVisual:scene(['أضف في النهاية','heap[4] = 1'],['بعد أول تبديل','1 تصعد من 4 إلى 1'],['بعد ثاني تبديل','1 في الجذر']),
    concept:'في الكومة الصغرى قيمة الأب أصغر من أبنائه أو تساويها. مع الفهرسة من صفر، أب الخانة index هو (index - 1) / 2 عندما index > 0.',
    why:'تضع الأولوية الأصغر في المقدمة مع إصلاح المسار المتأثر بالإضافة.',
    mechanics:'تابع index ثم parent، وقارن الخانتين قبل كل تبديل. ينتهي الصعود عند الجذر أو أب أصغر أو مساوٍ.',
    breakdown:['أضف القيمة في أول خانة شاغرة.','احسب الأب وتوقف إذا كان مرتبًا مع ابنه.','بدّل القيم ثم حرّك index للأب وكرر.'],
    build:heap({heap:[3,8,5,12,0],size:4,added:1},[1,3,5,12,8,2],'أكمل صعود index بعد التبديل. أضف 1 إلى الكومة 3 و8 و5 و12، ثم اطبع خاناتها وتبديلين.',{
      attention:'بعد التبديل صار العنصر الجديد في موضع parent.',
      rule:'قارن العنصر بالبنية الأعلى من موضعه الجديد.',
      help:'اكتب index = parent; بعد تبديل الخانتين.',
      starterCode:scaffold(heapSource,{heap:[3,8,5,12,0],size:4,added:1},'index = parent;')
    }),
    edit:heap({heap:[3,8,5,12,0],size:4,added:10},[3,8,5,12,10,0],'أضف 10 بدل 1. راقب توقف الصعود قبل أول تبديل.'),
    experiment:heap({heap:[3,8,5,12,0],size:4,added:3},[3,3,5,12,8,1],'أضف 3. بعد تبديل واحد سيتساوى العنصر مع الأب. راقب الشرط.'),
    bug:repair(heap({heap:[3,8,5,12,0],size:4,added:1},[1,3,5,12,8,2],'تحرّك إلى الموضع الجديد للعنصر.'),heapSource({heap:[3,8,5,12,0],size:4,added:1,up:'index'}),
      'عمل تبديلًا واحدًا وبقيت 1 تحت الجذر. أي حركة تخلي الفحص يتابع 1 إلى فوق؟',
      ['index = parent;','index = index;','index = size;'],'بعد التبديل انقل index إلى parent.'),
    transfer:heap({heap:[2,7,9,0],size:3,added:-1},[-1,2,9,7,2],'أضف أولوية -1 إلى الكومة 2 و7 و9. اطبع ترتيب الخانات وعدد التبديلات.')
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'شجرة مفاتيح ولوحة أولويات'}));

exports.data = makeUnit({
  id:'trees-and-heap',title:'اقرأ الشجرة ورتّب الأولوية',description:'الجذر والفروع، عدّ العقد، البحث في BST، وإدراج عنصر في الكومة الصغرى.',
  previous,lessons,skill:'الأشجار والكومة الثنائية',runtime:'csharp-foundations-subset-v11'
});

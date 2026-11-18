const {makeUnit, exercise, repair} = require('./lesson-builder.cjs');
const previous = require('./author-unit-13.cjs').data;
const arrays = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays';
const functions = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/building-software/local-functions';
const loops = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements';
const nist = term => 'https://xlinux.nist.gov/dads/HTML/' + term + '.html';
const scene = (...cards) => cards.map(([label,value]) => ({label,value}));
const lines = (...code) => code.join('\n');
const array = items => '{ ' + items.join(', ') + ' }';
const scaffold = (source, input, line) => source(input).replace(line, '// اكتب الأمر هنا');
const indexWrite = name => ({name,mode:'write',rank:1});
const printItems = 'foreach (int item in items) { Console.WriteLine(item); }';

const bubbleSource = ({items, putBack = 'saved'}) => lines(
  'int[] items = ' + array(items) + ';',
  'int comparisons = 0;',
  'int swaps = 0;',
  'for (int end = items.Length - 1; end > 0; end--)',
  '{',
  '    for (int i = 0; i < end; i++)',
  '    {',
  '        comparisons++;',
  '        if (items[i] > items[i + 1])',
  '        {',
  '            int saved = items[i];',
  '            items[i] = items[i + 1];',
  '            items[i + 1] = ' + putBack + ';',
  '            swaps++;',
  '        }',
  '    }',
  '}',
  printItems,
  'Console.WriteLine(comparisons);',
  'Console.WriteLine(swaps);'
);
const bubble = exercise(bubbleSource, [
  [{items:[]},[0,0]], [{items:[4]},[4,0,0]], [{items:[4,3,2,1]},[1,2,3,4,6,6]],
  [{items:[8,2,2]},[2,2,8,3,2]]
], {declared:['items','comparisons','swaps'],printed:['comparisons','swaps'],indexAccess:indexWrite('items'),
    loop:{kind:'for',depth:2,reads:['end'],effect:'comparisons'}});

const selectionSource = ({items, goal = 'best = j;'}) => lines(
  'int[] items = ' + array(items) + ';',
  'int comparisons = 0;',
  'int swaps = 0;',
  'for (int i = 0; i < items.Length - 1; i++)',
  '{',
  '    int best = i;',
  '    for (int j = i + 1; j < items.Length; j++)',
  '    {',
  '        comparisons++;',
  '        if (items[j] < items[best]) { ' + goal + ' }',
  '    }',
  '    if (best != i)',
  '    {',
  '        int saved = items[i];',
  '        items[i] = items[best];',
  '        items[best] = saved;',
  '        swaps++;',
  '    }',
  '}',
  printItems,
  'Console.WriteLine(comparisons);',
  'Console.WriteLine(swaps);'
);
const select = exercise(selectionSource, [
  [{items:[]},[0,0]], [{items:[9]},[9,0,0]], [{items:[4,1,2]},[1,2,4,3,2]], [{items:[3,3,3]},[3,3,3,3,0]]
], {declared:['items','comparisons','swaps'],printed:['comparisons','swaps'],indexAccess:indexWrite('items'),
    loop:{kind:'for',depth:2,reads:['items'],effect:'comparisons'}});

const insertionSource = ({items, insert = 'j + 1'}) => lines(
  'int[] items = ' + array(items) + ';',
  'int shifts = 0;',
  'for (int i = 1; i < items.Length; i++)',
  '{',
  '    int picked = items[i];',
  '    int j = i - 1;',
  '    while (j >= 0 && items[j] > picked)',
  '    {',
  '        items[j + 1] = items[j];',
  '        j--;',
  '        shifts++;',
  '    }',
  '    items[' + insert + '] = picked;',
  '}',
  printItems,
  'Console.WriteLine(shifts);'
);
const insert = exercise(insertionSource, [
  [{items:[]},[0]], [{items:[4,4,4]},[4,4,4,0]], [{items:[7,1,2]},[1,2,7,2]], [{items:[0,-1]},[-1,0,1]]
], {declared:['items','shifts'],printed:['shifts'],indexAccess:indexWrite('items'),
    loop:{kind:'while',depth:2,reads:['items','picked'],effect:'shifts'}});

const mergeSource = ({left, right, relation = '<='}) => lines(
  'int[] left = ' + array(left) + ';',
  'int[] right = ' + array(right) + ';',
  'int[] merged = new int[left.Length + right.Length];',
  'int l = 0;',
  'int r = 0;',
  'int writes = 0;',
  'for (int i = 0; i < merged.Length; i++)',
  '{',
  '    if (r == right.Length || (l < left.Length && left[l] ' + relation + ' right[r]))',
  '    {',
  '        merged[i] = left[l];',
  '        l++;',
  '    }',
  '    else',
  '    {',
  '        merged[i] = right[r];',
  '        r++;',
  '    }',
  '    writes++;',
  '}',
  'foreach (int item in merged) { Console.WriteLine(item); }',
  'Console.WriteLine(writes);'
);
const merge = exercise(mergeSource, [
  [{left:[],right:[]},[0]], [{left:[-2],right:[]},[-2,1]], [{left:[1,4],right:[1,3]},[1,1,3,4,4]]
], {declared:['left','right','merged','l','r','writes'],printed:['writes'],indexAccess:indexWrite('merged'),
    conditionReads:['left','right'],loop:{kind:'for',reads:['merged'],effect:'writes'}});

const sortSource = ({items, left = 'Sort(values, workspace, start, middle)'}) => lines(
  'int[] items = ' + array(items) + ';',
  'int[] buffer = new int[items.Length];',
  'int comparisons = Sort(items, buffer, 0, items.Length);',
  printItems,
  'Console.WriteLine(comparisons);', '',
  'int Sort(int[] values, int[] workspace, int start, int end)',
  '{',
  '    if (end - start <= 1) { return 0; }',
  '    int middle = start + (end - start) / 2;',
  '    int leftCost = ' + left + ';',
  '    int rightCost = Sort(values, workspace, middle, end);',
  '    return leftCost + rightCost + Merge(values, workspace, start, middle, end);',
  '}', '',
  'int Merge(int[] values, int[] workspace, int start, int middle, int end)',
  '{',
  '    int l = start;',
  '    int r = middle;',
  '    int count = 0;',
  '    for (int i = start; i < end; i++)',
  '    {',
  '        bool fromLeft = r == end;',
  '        if (!fromLeft && l < middle)',
  '        {',
  '            count++;',
  '            fromLeft = values[l] <= values[r];',
  '        }',
  '        if (fromLeft) { workspace[i] = values[l]; l++; }',
  '        else { workspace[i] = values[r]; r++; }',
  '    }',
  '    for (int i = start; i < end; i++) { values[i] = workspace[i]; }',
  '    return count;',
  '}'
);
const sort = exercise(sortSource, [
  [{items:[]},[0]], [{items:[2]},[2,0]], [{items:[5,5,1]},[1,5,5,3]], [{items:[4,3,2,1]},[1,2,3,4,4]]
], {declared:['items','buffer','comparisons'],printed:['comparisons'],indexAccess:indexWrite('workspace'),calls:{Sort:3,Merge:1}});

const costSource = ({size, bound = 'size * layers'}) => lines(
  'int size = ' + size + ';',
  'int comparisons = 0;',
  'for (int end = size - 1; end > 0; end--)',
  '{',
  '    for (int i = 0; i < end; i++) { comparisons++; }',
  '}',
  'int layers = 0;',
  'int width = 1;',
  'while (width < size) { width *= 2; layers++; }',
  'int mergeBudget = ' + bound + ';',
  'Console.WriteLine(comparisons);',
  'Console.WriteLine(mergeBudget);'
);
const growth = exercise(costSource, [
  [{size:0},[0,0]], [{size:1},[0,0]], [{size:3},[3,6]], [{size:12},[66,48]]
], {declared:['size','comparisons','layers','mergeBudget'],printed:['comparisons','mergeBudget'],operation:'*',operationIn:'mergeBudget',
    loop:{kind:'for',depth:2,reads:['end'],effect:'comparisons'}});

const lessons = [
  {
    slug:'algorithm-bubble-sort',title:'بدّل كل جارَين بترتيب معكوس',reference:arrays,algorithmReference:nist('bubblesort'),
    scene:'في رف فيه 5 و2 و4، فحص كل كارت مع جاره على اليمين. لو الأكبر على الشمال، بدّلهما. بعد مرور واحد، 5 وصلت لآخر الرف.',
    sceneVisual:scene(['البداية','5 · 2 · 4'],['البديل الأول','2 · 5 · 4'],['نهاية المرور','2 · 4 · 5']),
    concept:'Bubble Sort تقارن الجيران وتبدّل المقلوبين. كل مرور يوصل أكبر عنصر في الجزء الحالي إلى آخره، فتقصر المسافة في المرور التالي.',
    why:'تشوف أثر ترتيب القيم من تبديل بسيط متكرر.',
    mechanics:'تابع i ثم i + 1، وراقب saved لحفظ القيمة قبل الكتابة، ثم عدّ المقارنات والتبديلات.',
    breakdown:['قارن كل i بجارتها i + 1 حتى end.','احفظ القيمة اليسرى وبدّل الجارين إذا لزم.','قصّر end، واطبع الترتيب والعدادين بعد انتهاء المرور.'],
    build:bubble({items:[5,2,4]},[2,4,5,3,2],'أكمل كتابة القيمة المحفوظة في مكان الجار. اطبع 2 و4 و5 ثم ثلاث مقارنات وتبديلين.',{
      attention:'بعد الكتابة الأولى، القيمة القديمة تنتظر في saved.',
      rule:'التبديل يحتاج حفظ قيمة قبل استبدال خانتها.',
      help:'أكمل items[i + 1] = saved; بعد نقل الجار إلى items[i].',
      starterCode:scaffold(bubbleSource,{items:[5,2,4]},'items[i + 1] = saved;')
    }),
    edit:bubble({items:[2,4,5]},[2,4,5,3,0],'ابدأ بترتيب 2 و4 و5. هل احتجت تبديلًا؟ افحص عدد المقارنات.'),
    experiment:bubble({items:[5,4,2]},[2,4,5,3,3],'اعكس البداية إلى 5 و4 و2. راقب التبديل في كل مقارنة.'),
    bug:repair(bubble({items:[5,2,4]},[2,4,5,3,2],'أكمل التبديل بالقيمة المحفوظة.'),bubbleSource({items:[5,2,4],putBack:'items[i]'}),
      'القيم تكررت واختفت 5. بعد الكتابة الأولى، أين توجد قيمة الخانة القديمة؟',
      ['saved','items[i]','items[i + 1]'],'اقرأ القيمة من saved عند ملء الجار.'),
    transfer:bubble({items:[7,1,6,2]},[1,2,6,7,6,4],'رتب 7 و1 و6 و2. اكتب الجزء الخاص بالتبديل، ثم اعرض الترتيب والمقارنات والتبديلات.',{
      starterCode:scaffold(bubbleSource,{items:[7,1,6,2]},'items[i + 1] = saved;')
    })
  },
  {
    slug:'algorithm-selection-sort',title:'اختَر أصغر خانة من الجزء المتبقّي',reference:arrays,algorithmReference:nist('selectionSort'),
    scene:'قدامك 5 و3 و8 و1. ابحث عن أصغر بطاقة في الجزء الباقي. بعد ما تخلص الفحص، ضعها في أول مكان في هذا الجزء.',
    sceneVisual:scene(['من المكان الأول','i = 0'],['أصغر قيمة بعد الفحص','best = 3 · القيمة 1'],['ثبّت المكان','1 · 3 · 8 · 5']),
    concept:'Selection Sort تبحث عن فهرس أصغر عنصر متبقٍ أولًا. بعد انتهاء البحث تثبّت هذا العنصر في مكان i بتبديل واحد عند الحاجة.',
    why:'تميز قراءة مكان الأصغر عن نقل العنصر لمكانه.',
    mechanics:'راقب best تتحرك أثناء الفحص. تحصل الكتابة في الخانتين بعد انتهاء الحلقة الداخلية.',
    breakdown:['ابدأ best عند i.','افحص الجزء التالي وحدّث فهرس الأصغر.','بدّل مرة إذا تغير best، ثم تقدم للمكان التالي.'],
    build:select({items:[5,3,8,1]},[1,3,5,8,6,2],'كمّل تحديث فهرس الأصغر. اطبع 1 و3 و5 و8، ثم ست مقارنات وتبديلين.',{
      attention:'خزّن رقم الخانة j عند إيجاد قيمة أصغر.',
      rule:'الفحص الداخلي يجمع مكان الأصغر ثم يأتي التبديل بعده.',
      help:'ضع best = j; داخل if (items[j] < items[best]).',
      starterCode:selectionSource({items:[5,3,8,1],goal:'/* اكتب التحديث هنا */'})
    }),
    edit:select({items:[1,3,5,8]},[1,3,5,8,6,0],'جرّب القيم مرتبة. راقب بقاء best عند i في كل مرة.'),
    experiment:select({items:[3,3,1]},[1,3,3,3,1],'جرّب رقمين متساويين مع أصغر رقم في الآخر. تابع عدد التبديلات.'),
    bug:repair(select({items:[5,3,8,1]},[1,3,5,8,6,2],'تذكّر مكان البطاقة الأصغر.'),selectionSource({items:[5,3,8,1],goal:'best = i;'}),
      'تابع الفحص الرقم 1 ولم يحرّك best. أي أمر يحفظ مكان الرقم الجديد؟',
      ['best = i;','best = j;','best = items[j];'],'احفظ الفهرس j عشان تستخدمه وقت التبديل.',1),
    transfer:select({items:[9,2,5,1]},[1,2,5,9,6,1],'رتب 9 و2 و5 و1 بالاختيار. راقب المواضع التي تحتاج تبديلًا واحسب الإجمالي.')
  },
  {
    slug:'algorithm-insertion-sort',title:'افتح مكانًا للبطاقة في الجزء المرتّب',reference:arrays,algorithmReference:nist('insertionSort'),
    scene:'أمامك ترتيب 2 ثم 5. تدخل بطاقة 3. حرّك 5 خانة لليمين، ثم ضع 3 في الفراغ قبلها.',
    sceneVisual:scene(['الجزء المرتب','2 · 5'],['امسك البطاقة','picked = 3'],['بعد الإدراج','2 · 3 · 5']),
    concept:'Insertion Sort تمسك العنصر الجديد في picked. تزحزح للقادم أكبر من picked لليمين، ثم تضع picked في الفراغ عند j + 1.',
    why:'تقدر تكمّل ترتيب جزء جاهز بإضافة بطاقة واحدة كل مرة.',
    mechanics:'تابع قيمة j خطوة خطوة وراقب الأرقام الأكبر تتحرك حتى يثبت مكان picked.',
    breakdown:['احفظ items[i] قبل تحريك الخانات.','انقل الأكبر يمينًا طالما j داخل الحدود.','ضع picked في j + 1 واطبع عدد النقلات.'],
    build:insert({items:[2,5,3,7]},[2,3,5,7,1],'أكمل سطر وضع picked بعد انتهاء النقل. اطبع 2 و3 و5 و7 ثم عدد النقلات 1.',{
      attention:'عند التوقف يشير j إلى خانة قبل الفراغ، وقد يساوي -1.',
      rule:'الفهرس الذي يقبل picked هو j + 1.',
      help:'اكتب items[j + 1] = picked; بعد while.',
      starterCode:scaffold(insertionSource,{items:[2,5,3,7]},'items[j + 1] = picked;')
    }),
    edit:insert({items:[5,4,3,2]},[2,3,4,5,6],'جرّب ترتيبًا تنازليًا. تابع اكتمال حركة picked حتى بداية المصفوفة.'),
    experiment:insert({items:[1,3,3,6]},[1,3,3,6,0],'ابدأ بترتيب جاهز مع تكرار 3. ما عدد النقلات؟'),
    bug:repair(insert({items:[2,5,3,7]},[2,3,5,7,1],'ضع البطاقة في الفراغ بعد j.'),insertionSource({items:[2,5,3,7],insert:'j'}),
      'كتب البرنامج في الجار الذي سبَق الفراغ. أي فهرس يستخدمه سطر إدراج picked؟',
      ['i','j','j + 1'],'اكتب عند j + 1 بعد انتهاء الفحص.',2),
    transfer:insert({items:[9,2,2,3]},[2,2,3,9,3],'رتب 9 و2 و2 و3 بالإدراج. اطبع الترتيب ثم عدد نقلات العناصر الأكبر.')
  },
  {
    slug:'algorithm-merge-sorted-runs',title:'ادمج صفّين مرتّبين من المقدمة',reference:arrays,algorithmReference:nist('merge'),
    scene:'على اليسار 2 و6 بالترتيب، وعلى اليمين 1 و7. قارن أول كارت في الصفّين، ضعه في الناتج، وحرّك مقدمة صفه.',
    sceneVisual:scene(['اليسار','2 · 6'],['اليمين','1 · 7'],['أول بطاقة تخرج','1 من اليمين']),
    concept:'الدمج يأخذ أصغر المتاح من المقدمتين. يتحرك مؤشر المصدر الذي أخذنا منه فقط، وإذا انتهى صف نكمّل بالقيم الباقية في الصف الآخر.',
    why:'تجمع جزأين مرتبين مع الحفاظ على الترتيب دون إعادة فحص العناصر التي كتبتها.',
    mechanics:'راقب l وr مع كل كتابة في merged. يتغير مؤشر واحد، ثم يتقدم فهرس الناتج.',
    breakdown:['خصّص merged بعدد خانات الصفّين.','اختر من اليسار لو انتهى اليمين أو مقدمته أصغر أو مساوية.','حرّك مؤشر المصدر وواصل حتى تمتلئ merged.'],
    build:merge({left:[2,6],right:[1,7]},[1,2,6,7,4],'أكمل اختيار قيمة اليمين في حالة else. اطبع الترتيب المدمج 1 و2 و6 و7 ثم أربع كتابات.',{
      attention:'في كل دورة حرّك المؤشر الذي قرأت منه فقط.',
      rule:'اختيار الأصغر من المقدمتين يحافظ على ترتيب الناتج.',
      help:'في else اكتب merged[i] = right[r]; ثم زد r.',
      starterCode:scaffold(mergeSource,{left:[2,6],right:[1,7]},'merged[i] = right[r];')
    }),
    edit:merge({left:[2,6],right:[2,7]},[2,2,6,7,4],'غيّر مقدمة اليمين إلى 2. عند التعادل اختر اليسار ثم تابع باقي القيم.'),
    experiment:merge({left:[],right:[2,7]},[2,7,2],'جرّب صفًا يساريًا فارغًا. راقب كيف يحمي الشرط قراءة l بعد نهاية الصف.'),
    bug:repair(merge({left:[2,6],right:[1,7]},[1,2,6,7,4],'اختر المقدمة الأصغر.'),mergeSource({left:[2,6],right:[1,7],relation:'>='}),
      'بدأ الناتج بالبطاقة 2 قبل 1. كيف نختار اليسار عند توفر الصفّين؟',
      ['left[l] <= right[r]','left[l] >= right[r]','l == r'],'اختر اليسار لما تكون قيمته أصغر أو مساوية.'),
    transfer:merge({left:[1,5,7],right:[2,2,9]},[1,2,2,5,7,9,6],'ادمج 1 و5 و7 مع 2 و2 و9. اعرض الترتيب ست عمليات كتابة.')
  },
  {
    slug:'algorithm-merge-sort',title:'رتّب النصفين ثم ادمجهما',reference:functions,algorithmReference:nist('mergesort'),
    scene:'قسّم 7 و2 و4 و1 إلى مجموعتين صغيرتين. كل مجموعة تترتب لوحدها أولًا. بعدها ادمجهما في صف واحد.',
    sceneVisual:scene(['اقسم','7 · 2 | 4 · 1'],['بعد ترتيب النصفين','2 · 7 | 1 · 4'],['ادمج','1 · 2 · 4 · 7']),
    concept:'Merge Sort تستدعي نفس الدالة على جزأين أصغر، حتى يبقى في الجزء عنصر واحد أو أقل. بعد رجوع النصفين تطبق Merge على الجزأين المرتبين.',
    why:'تعيد استخدام قاعدة الدمج لمشكلة ترتيب مصفوفة كاملة.',
    mechanics:'كل استدعاء يعرض start وend. شوف Merge بعد اكتمال النصفين، ثم النسخ من workspace.',
    breakdown:['إذا كان طول الجزء صفرًا أو واحدًا ارجع.','رتّب [start, middle) ثم [middle, end).','ادمجهما وأعد مجموع المقارنات.'],
    build:sort({items:[7,2,4,1]},[1,2,4,7,5],'كمّل استدعاء ترتيب النصف الأول داخل Sort. اطبع 1 و2 و4 و7 ثم المقارنات 5.',{
      attention:'end يمثل الحد الذي يأتي بعد آخر خانة في الجزء.',
      rule:'يبدأ الدمج بعد اكتمال ترتيب كلا النصفين.',
      help:'اكتب int leftCost = Sort(values, workspace, start, middle);.',
      starterCode:scaffold(sortSource,{items:[7,2,4,1]},'int leftCost = Sort(values, workspace, start, middle);')
    }),
    edit:sort({items:[1,2,3,4]},[1,2,3,4,4],'جرّب ترتيبًا جاهزًا. قارن عدد المقارنات بحالة البداية.'),
    experiment:sort({items:[2,1]},[1,2,1],'جرّب أصغر مدخل يحتاج دمجًا. شاهد دورتين تستوفيان حالة التوقف ثم دمجًا واحدًا.'),
    bug:repair(sort({items:[7,2,4,1]},[1,2,4,7,5],'نفّذ ترتيب النصف الأول قبل الدمج.'),sortSource({items:[7,2,4,1],left:'0'}),
      'دخل النصف الأول إلى Merge وهو 7 ثم 2. ما الاستدعاء الذي يرتبه قبل الدمج؟',
      ['Sort(values, workspace, middle, end)','Sort(values, workspace, start, middle)','Sort(values, workspace, start, end)'],'استدعِ Sort على الجزء الأول فقط من start حتى قبل middle.',1),
    transfer:sort({items:[3,0,3,2]},[0,2,3,3,5],'طبّق التقسيم والدمج على 3 و0 و3 و2 واطبع الناتج وعدد المقارنات.',{
      starterCode:scaffold(sortSource,{items:[3,0,3,2]},'int leftCost = Sort(values, workspace, start, middle);')
    })
  },
  {
    slug:'algorithm-sort-comparison-growth',title:'قارن زيادات المقارنات مع كبر المصفوفة',reference:loops,algorithmReference:nist('bigOnotation'),
    scene:'المصفوفة كبرت من 4 إلى 8. في الفقاعات عندك مرور بأطوال تتناقص واحدًا واحدًا. في الدمج يزيد عدد الطبقات واحدة ويزيد شغل كل طبقة.',
    sceneVisual:scene(['عند 4 عناصر','6 مقارنات · سقف 8 زيارات'],['عند 8 عناصر','28 مقارنة · سقف 24 زيارة'],['عند 16 عنصرًا','120 مقارنة · سقف 64 زيارة']),
    concept:'عدد مقارنات الفقاعات في النسخة التي تمرّ دائمًا ينمو كـ O(n²). المرور على n عنصرًا عبر عدد طبقات ينمو لوغاريتميًا يعطي للدمج O(n log n). نقارن عدّاد الفقاعات بسقف زيارات الدمج.',
    why:'تقدر تتوقع شكل النمو من بنية الخوارزمية وتختبر توقعك بالأرقام.',
    mechanics:'راقب زيادة comparisons داخل الحلقتين، ثم ضرب عدد العناصر في عدد طبقات الدمج.',
    breakdown:['احسب أطوال المرور المتناقصة للفقاعات.','ضاعف عرض الجزء حتى يغطي المصفوفة وعدّ الطبقات.','اضرب الحجم في الطبقات للحصول على سقف زيارات الدمج.'],
    build:growth({size:4},[6,8],'أكمل mergeBudget بضرب الحجم في عدد الطبقات. مع أربعة عناصر اطبع 6 و8.',{
      attention:'واحد من العدّادين مقارنات الفقاعات، والثاني سقف زيارات الدمج.',
      rule:'عمل طبقة كاملة من الدمج يمر على ما يصل إلى n عنصرًا.',
      help:'اكتب int mergeBudget = size * layers;.',
      starterCode:scaffold(costSource,{size:4},'int mergeBudget = size * layers;')
    }),
    edit:growth({size:8},[28,24],'ضاعف الحجم إلى 8. قارن تغير العددين.'),
    experiment:growth({size:1},[0,0],'جرّب عنصرًا واحدًا. توقع عدد طبقات الدمج.'),
    bug:repair(growth({size:8},[28,24],'اضرب عدد زيارات الطبقة في الطبقات.'),costSource({size:8,bound:'layers'}),
      'ظهر 3 للدمج. أي تعبير يحسب سقف الزيارات لكل الطبقات؟',
      ['layers','size + layers','size * layers'],'اضرب الحجم الكلي في عدد الطبقات.',2),
    transfer:growth({size:16},[120,64],'توقع عمل الفقاعات والدمج عند 16 عنصرًا. اطبع 120 مقارنة وسقف 64 زيارة لطبقات الدمج.')
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'ترتيب بطاقات الاستقبال وعدّ العمليات'}));

exports.data = makeUnit({
  id:'sorting-and-cost',title:'رتّب القيم وقارن عدد العمليات',description:'الفقاعات والاختيار والإدراج والدمج ونمو عدد العمليات.',
  previous,lessons,skill:'خوارزميات الترتيب والتعقيد',runtime:'csharp-foundations-subset-v11'
});

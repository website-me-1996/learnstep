const { makeUnit, exercise, repair } = require('./lesson-builder.cjs');
const previous = require('./author-unit-09.cjs').data;
const classes = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes';
const fields = 'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields';
const methods = 'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/methods';
const constructors = 'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/constructors';
const references = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/reference-types';
const generics = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics';
const scene = (...cards) => cards.map(([label, value]) => ({label, value}));
const access = (name, mode = 'read') => ({name, mode});
const lines = (...commands) => commands.join('\n');

const cardSource = ({className, output = 'card', create = 'new ' + className + '()'}) => lines(
  className + ' card = ' + create + ';',
  'Console.WriteLine(' + output + ');', '',
  'class ' + className,
  '{',
  '}'
);
const card = (input, output, task, hints) => exercise(cardSource, [], {
  declared:['card'], types:{card:input.className}, printed:['card'], operation:'new', operationIn:'card'
})(input, output, task, hints);

const fieldSource = ({starting, picked = 'counter.Points'}) => lines(
  'int starting = ' + starting + ';',
  'Counter counter = new Counter();',
  'counter.Points = starting;',
  'int shown = ' + picked + ';',
  'Console.WriteLine(shown);', '',
  'class Counter',
  '{',
  '    public int Points;',
  '}'
);
const field = exercise(fieldSource, [
  [{starting:0},[0]], [{starting:19},[19]], [{starting:-4},[-4]]
], {declared:['starting','counter','shown'],types:{counter:'Counter'},printed:['shown'],fieldAccess:access('Points')});

const distinctSource = ({points, second = 'new Counter()'}) => lines(
  'int points = ' + points + ';',
  'Counter first = new Counter();',
  'Counter second = ' + second + ';',
  'first.Points = points;',
  'Console.WriteLine(first.Points);',
  'Console.WriteLine(second.Points);', '',
  'class Counter',
  '{',
  '    public int Points;',
  '}'
);
const distinct = exercise(distinctSource, [
  [{points:2},[2,0]], [{points:-3},[-3,0]], [{points:0},[0,0]]
], {declared:['points','first','second'],types:{first:'Counter',second:'Counter'},printed:['first','second'],operation:'new',operationIn:'second',fieldAccess:access('Points','write')});

const callSource = ({starting, extra, total = 'counter.WithExtra(extra)'}) => lines(
  'int starting = ' + starting + ';',
  'int extra = ' + extra + ';',
  'Counter counter = new Counter();',
  'counter.Points = starting;',
  'int total = ' + total + ';',
  'Console.WriteLine(total);', '',
  'class Counter',
  '{',
  '    public int Points;',
  '    public int WithExtra(int amount)',
  '    {',
  '        return this.Points + amount;',
  '    }',
  '}'
);
const instanceMethod = exercise(callSource, [
  [{starting:0,extra:4},[4]], [{starting:10,extra:0},[10]], [{starting:4,extra:9},[13]]
], {declared:['starting','extra','counter','total'],printed:['total'],calls:{WithExtra:1},fieldAccess:access('Points')});

const numberedSource = ({identifier, assigned = 'number'}) => lines(
  'int identifier = ' + identifier + ';',
  'Ticket ticket = new Ticket(identifier);',
  'Console.WriteLine(ticket.Number);', '',
  'class Ticket',
  '{',
  '    public int Number;',
  '    public Ticket(int number)',
  '    {',
  '        this.Number = ' + assigned + ';',
  '    }',
  '}'
);
const numbered = exercise(numberedSource, [
  [{identifier:17},[17]], [{identifier:0},[0]], [{identifier:53},[53]]
], {declared:['identifier','ticket'],types:{ticket:'Ticket'},printed:['ticket'],calls:{Ticket:1},fieldAccess:access('Number','write')});

const aliasSource = ({before, after, copy = 'original'}) => lines(
  'int before = ' + before + ';',
  'int after = ' + after + ';',
  'Counter original = new Counter();',
  'original.Points = before;',
  'Counter other = ' + copy + ';',
  'other.Points = after;',
  'Console.WriteLine(original.Points);', '',
  'class Counter',
  '{',
  '    public int Points;',
  '}'
);
const alias = exercise(aliasSource, [
  [{before:8,after:2},[2]], [{before:1,after:0},[0]], [{before:4,after:4},[4]]
], {declared:['before','after','original','other'],types:{original:'Counter',other:'Counter'},printed:['original'],read:['other'],fieldAccess:access('Points','write')});

const locateSource = ({found, number, guard = 'ticket == null'}) => lines(
  'bool found = ' + found + ';',
  'int number = ' + number + ';',
  'Ticket? ticket = null;',
  'if (found)',
  '{',
  '    ticket = new Ticket(number);',
  '}',
  'if (' + guard + ')',
  '{',
  '    Console.WriteLine("لا توجد تذكرة");',
  '}',
  'else',
  '{',
  '    Console.WriteLine(ticket.Number);',
  '}', '',
  'class Ticket',
  '{',
  '    public int Number;',
  '    public Ticket(int input)',
  '    {',
  '        Number = input;',
  '    }',
  '}'
);
const locate = exercise(locateSource, [
  [{found:false,number:9},['لا توجد تذكرة']],
  [{found:true,number:0},[0]],
  [{found:true,number:12},[12]]
], {declared:['found','number','ticket'],types:{ticket:'Ticket?'},branching:true,elseRequired:true,conditionReads:['ticket'],fieldAccess:access('Number')});

const boxSource = ({number, text, numberArgument = 'number'}) => lines(
  'int number = ' + number + ';',
  'string label = ' + JSON.stringify(text) + ';',
  'Box<int> numberBox = new Box<int>(' + numberArgument + ');',
  'Box<string> labelBox = new Box<string>(label);',
  'Console.WriteLine(numberBox.Item);',
  'Console.WriteLine(labelBox.Item);', '',
  'class Box<T>',
  '{',
  '    public T Item;',
  '    public Box(T input)',
  '    {',
  '        this.Item = input;',
  '    }',
  '}'
);
const pack = exercise(boxSource, [
  [{number:0,label:'أول'},[0,'أول']],
  [{number:-2,label:''},[-2,'']],
  [{number:12,label:'نور'},[12,'نور']]
], {declared:['number','label','numberBox','labelBox'],types:{numberBox:'Box<int>',labelBox:'Box<string>'},
    printed:['numberBox','labelBox'],calls:{Box:2},fieldAccess:access('Item')});

const lessons = [
  {
    slug:'class-create-object', title:'ارسم الصنف ثم أنشئ كائنًا منه', reference:classes,
    scene:'قدامك نموذج بطاقة في الدرج. اصنع منه بطاقة واحدة وسجّل مكانها باسم card.',
    sceneVisual:scene(['نموذج البطاقة','class Ticket'],['إنشاء نسخة','new Ticket()'],['امسك البطاقة','card → #1']),
    concept:'تعريف class يصف نوع الكائن. new Ticket() ينشئ كائنًا من نوع Ticket؛ المتغير card يمسك المرجع إليه.',
    why:'تقدر تستخدم نفس الوصف لإنشاء كائنات في خطوات تالية.',
    mechanics:'تظهر بطاقة الكائن بعد أمر new. يشير صف card إلى رقم البطاقة. تطبع النسخة البسيطة اسم الصنف عند طباعة الكائن.',
    breakdown:['عرّف class Ticket أسفل الأوامر.','أنشئ كائنًا بـ new Ticket().','احفظه في card واطبع card.'],
    build:card({className:'Ticket'},['Ticket'],'عرّف class Ticket بجسم فارغ. اكتب Ticket card = new Ticket(); ثم اطبع card.',{
      attention:'تتبّع لحظة ظهور بطاقة الكائن رقم 1.',
      rule:'new ينشئ الكائن من تعريف الصنف.',
      help:'اكتب class Ticket { } بعد الأوامر، واستخدم new Ticket() عند إنشاء card.'
    }),
    edit:card({className:'Pass'},['Pass'],'غيّر اسم الصنف إلى Pass في التعريف وعدّل نوع card واستدعاء new ليتوافقا معه.'),
    experiment:card({className:'Badge'},['Badge'],'جرّب نفس خطوات الإنشاء لصنف اسمه Badge. لاحظ اسم النوع عند طباعة card.'),
    bug:repair(card({className:'Ticket'},['Ticket'],'أنشئ البطاقة ثم اطبعها.'),cardSource({className:'Ticket',create:'null'}),
      'ظهر card بقيمة null. أي تعبير ينشئ بطاقة Ticket؟',
      ['new Ticket()','null','"Ticket"'],'ضع new Ticket() بعد علامة الإسناد.'),
    transfer:card({className:'Receipt'},['Receipt'],'عرّف صنف Receipt واصنع واحدًا منه، ثم اطبع المرجع الموجود في card.')
  },
  {
    slug:'object-field-value', title:'اقرأ الحقل داخل الكائن', reference:fields,
    scene:'داخل بطاقة العداد خانة للنقاط اسمها Points. اكتب فيها 6 ثم افتح البطاقة واقرأ الخانة بالاسم.',
    sceneVisual:scene(['البطاقة','counter → #1'],['الحقل داخلها','Points = 6'],['القراءة','counter.Points → 6']),
    concept:'الحقل يخزّن قيمة في الكائن. النقطة في counter.Points تتحرك من المرجع counter إلى الحقل Points على بطاقته.',
    why:'تجمع البيانات الخاصة بالبطاقة في مكان واحد وتقرأ كل خانة باسمها.',
    mechanics:'تضيء خانة Points على بطاقة الكائن عند الإسناد إليها أو قراءتها.',
    breakdown:['أنشئ Counter وفيه الحقل int Points.','ضع starting في counter.Points.','اقرأ الحقل في shown واطبعه.'],
    build:field({starting:6},[6],'عرّف Counter مع public int Points;. أنشئ counter، وخزّن starting = 6 في Points. اقرأ Points في shown واطبعه.',{
      attention:'تحرّك من counter إلى Points باستخدام النقطة.',
      rule:'كل وصول للحقل يحتاج المرجع الذي يحدد الكائن.',
      help:'اكتب int shown = counter.Points; بعد إسناد starting للحقل.'
    }),
    edit:field({starting:9},[9],'ضع 9 في starting. بعد الإسناد راقب مكان ظهور 9 في البطاقة.'),
    experiment:field({starting:0},[0],'جرّب بدء العداد من 0. تتبّع قراءة Points حتى الطباعة.'),
    bug:repair(field({starting:6},[6],'اقرأ الحقل بواسطة النقطة.'),fieldSource({starting:6,picked:'0'}),
      'Points فيها 6، وshown يعرض 0. أي أمر ينقل قيمة الحقل إلى shown؟',
      ['int shown = 0;','int shown = counter.Points;','int shown = 1;'],'اقرأ Points من counter عند تعريف shown.',1),
    transfer:field({starting:15},[15],'جهّز عدادًا يبدأ من 15. استخرج Points من الكائن واعرضها في المخرجات.')
  },
  {
    slug:'object-separate-instances', title:'أنشئ عدّادين لكل واحد حقله', reference:classes,
    scene:'اصنع بطاقتين من نموذج العداد. اكتب 5 في الأولى وراقب الثانية وهي باقية عند صفر.',
    sceneVisual:scene(['first → #1','Points = 5'],['second → #2','Points = 0'],['الإنشاء','new مرة لكل بطاقة']),
    concept:'كل new Counter() يصنع بطاقة جديدة لها قيمة حقل مستقلة. حقل int يبدأ عند 0 إذا لم تُعطه قيمة في الصنف أو المنشئ.',
    why:'تقدر تسجّل درجتين لأشخاص مختلفين باستخدام نفس تعريف العداد.',
    mechanics:'تظهر بطاقتان برقمين. يتغير حقل Points في بطاقة first فقط بعد الإسناد.',
    breakdown:['أنشئ first باستخدام new Counter().','أنشئ second بأمر new مستقل.','حدّث first.Points واطبع الحقل في الكائنين.'],
    build:distinct({points:5},[5,0],'عرّف Counter فيه int Points. أنشئ first وsecond بأمر new لكل واحد. ضع points = 5 في first.Points، ثم اطبع قيمة Points للاثنين.',{
      attention:'قارن رقم الكائن في صف first برقم الكائن في صف second.',
      rule:'أمران منفصلان من new ينشئان كائنين منفصلين.',
      help:'اكتب Counter second = new Counter(); ثم عدّل first.Points فقط.'
    }),
    edit:distinct({points:8},[8,0],'غيّر points إلى 8. تابع أي بطاقة تأثرت.'),
    experiment:distinct({points:-1},[-1,0],'جرّب -1 في first. راقب أن الثانية ما زالت عند الصفر.'),
    bug:repair(distinct({points:5},[5,0],'اعمل بطاقة مستقلة لكل عدّاد.'),distinctSource({points:5,second:'first'}),
      'خرج 5 مرتين. أي سطر يعطي second عدّادًا مستقلًا؟',
      ['Counter second = first;','Counter second = null;','Counter second = new Counter();'],'نفّذ new مرة ثانية لإنشاء الكائن المستقل.',2),
    transfer:distinct({points:12},[12,0],'جهّز عدّادًا لدفعة عندها 12 نقطة وعدّادًا جديدًا يبدأ من صفر. اطبع الاثنين.')
  },
  {
    slug:'object-instance-method', title:'اطلب من الكائن استخدام بياناته', reference:methods,
    scene:'العداد عليه 4 نقاط. اطلب منه حساب الإجمالي لو أضفت 3 نقاط للعرض، وراقب القيمة التي يرجع بها.',
    sceneVisual:scene(['من الكائن','Points = 4'],['من الاستدعاء','amount = 3'],['القيمة الراجعة','total = 7']),
    concept:'counter.WithExtra(extra) تستدعي طريقة للكائن. this يشير للكائن اللي استدعاها، فتقرأ الطريقة this.Points منه وقت الحساب.',
    why:'تحسب من بيانات الكائن في مكانها وتعيد النتيجة للسطر اللي طلبها.',
    mechanics:'عند الدخول يظهر this وفيه مرجع العداد. تابع قراءة Points ثم الرجوع إلى total.',
    breakdown:['ضع starting في counter.Points.','استدعِ WithExtra بقيمة extra.','داخل الطريقة ارجع بـ this.Points + amount.'],
    build:instanceMethod({starting:4,extra:3},[7],'عرّف WithExtra(int amount) في Counter، واجعلها تعيد this.Points + amount. ضع 4 في Points، واستدعِ الطريقة بـ extra = 3 واطبع total.',{
      attention:'افحص this عند الدخول، واعرف لأي كائن يشير.',
      rule:'الطريقة تقرأ حقول الكائن الذي استُدعيت منه.',
      help:'اكتب int total = counter.WithExtra(extra); وفي الطريقة return this.Points + amount;.'
    }),
    edit:instanceMethod({starting:4,extra:1},[5],'بدّل extra إلى 1 واحتفظ بقيمة Points الحالية.'),
    experiment:instanceMethod({starting:8,extra:1},[9],'ابدأ Points من 8 مع extra = 1. تابع القراءة من الكائن.'),
    bug:repair(instanceMethod({starting:4,extra:3},[7],'شغّل طريقة العداد.'),callSource({starting:4,extra:3,total:'extra'}),
      'ظهر 3 لأن total أخذت extra وحدها. أي سطر يطلب الحساب من الكائن؟',
      ['int total = counter.WithExtra(extra);','int total = extra;','int total = counter.Points;'],'استدعِ WithExtra عن طريق counter ومرّر extra.'),
    transfer:instanceMethod({starting:13,extra:2},[15],'اعرض إجمالي عدّاد عنده 13 نقطة مع نقطتين إضافيتين. استخدم نفس طريقة الكائن.')
  },
  {
    slug:'object-constructor', title:'سلّم القيمة للمنشئ وقت new', reference:constructors,
    scene:'وأنت بتطلع تذكرة جديدة، سلّم الرقم للمسؤول عن إصدارها. الرقم يتكتب قبل خروج التذكرة من الشباك.',
    sceneVisual:scene(['الرقم المتاح','identifier = 24'],['وقت الإنشاء','new Ticket(identifier)'],['البطاقة بعد الخروج','Number = 24']),
    concept:'المنشئ له اسم الصنف ويعمل عند إنشاء الكائن. يستقبل قيمة number ويحفظها في الحقل قبل أن تصل التذكرة إلى ticket.',
    why:'الكائن يبدأ بقيم يحتاجها من أول لحظة.',
    mechanics:'تابع دخول المنشئ مع this وnumber. راقب Number بعد الحفظ ثم الرجوع للسطر الأول من الإنشاء.',
    breakdown:['جهّز identifier.','مرّره إلى new Ticket(identifier).','اكتب هذا الرقم في this.Number داخل المنشئ.'],
    build:numbered({identifier:24},[24],'عرّف Ticket بالحقل Number. اكتب public Ticket(int number) واحفظ number في this.Number. أنشئ ticket باستخدام identifier = 24 واطبع رقمها.',{
      attention:'اتبع الرقم المرسل للمنشئ قبل أن يصبح الحقل جاهزًا.',
      rule:'المنشئ يعمل مع new ويجهّز حالة الكائن.',
      help:'اكتب this.Number = number; في جسم public Ticket(int number).'
    }),
    edit:numbered({identifier:31},[31],'غيّر identifier إلى 31 وراقب وصوله للحقل داخل المنشئ.'),
    experiment:numbered({identifier:0},[0],'جرّب تمرير 0. توقف عند خطوة الإسناد داخل المنشئ قبل طباعة Number.'),
    bug:repair(numbered({identifier:24},[24],'احفظ الرقم الذي استقبله المنشئ.'),numberedSource({identifier:24,assigned:'1'}),
      'كل التذاكر رقمها 1. أي إسناد يحفظ القيمة التي وصلت للمنشئ؟',
      ['this.Number = 1;','this.Number = number;','number = this.Number;'],'ضع قيمة number في الحقل this.Number.',1),
    transfer:numbered({identifier:46},[46],'أصدر تذكرة رقمها 46. مرّر الرقم للمنشئ واطبع Number بعد الإنشاء.')
  },
  {
    slug:'object-shared-reference', title:'خلّي اسمين يشيروا لنفس الكائن', reference:references,
    scene:'اكتب عنوان نفس العداد في ورقتين. افتح العداد من الورقة الثانية وغيّر النقاط. افتحه بعدها من الورقة الأولى واقرأ النتيجة.',
    sceneVisual:scene(['الورقة الأولى','original → #1'],['الورقة الثانية','other → #1'],['كائن واحد','Points: 3 → 9']),
    concept:'Counter other = original ينسخ المرجع الموجود في original. الاسمَان يوصلان للكائن نفسه، وتغيير Points من other يظهر لما تقرأه من original.',
    why:'تعرف متى يتأثر كائن واحد بتعديل تم من مكان آخر في الكود.',
    mechanics:'يظهر الرقم #1 في صفّي المتغيرين. تتغير بطاقة واحدة عند other.Points، والرجوع يعيد بيانات البطاقة من اللقطة السابقة.',
    breakdown:['أنشئ original وسجّل before في Points.','أعطِ other نفس المرجع.','حدّث other.Points بـ after، واقرأ original.Points.'],
    build:alias({before:3,after:9},[9],'أنشئ original وضع before = 3 في Points. اكتب Counter other = original;، ثم حدّث other.Points بـ after = 9 واطبع original.Points.',{
      attention:'راقب رقم الكائن المكتوب عند الاسمين قبل التحديث.',
      rule:'إسناد متغير من نوع صنف ينسخ المرجع.',
      help:'اكتب Counter other = original; ثم other.Points = after;.'
    }),
    edit:alias({before:3,after:4},[4],'غيّر after إلى 4. افتح points من original في لقطة الطباعة.'),
    experiment:alias({before:3,after:0},[0],'جرّب after = 0. ارجع خطوة لتشاهد الحقل قبل كتابته.'),
    bug:repair(alias({before:3,after:9},[9],'استخدم مرجع الكائن نفسه.'),aliasSource({before:3,after:9,copy:'new Counter()'}),
      'ظهر 3 بدل 9 لأن التحديث وصل لكائن تاني. ما تعريف other المطلوب؟',
      ['Counter other = new Counter();','Counter other = null;','Counter other = original;'],'انسخ مرجع original إلى other.',2),
    transfer:alias({before:12,after:15},[15],'استخدم مرجعين لعداد مخزون يبدأ عند 12. حدّثه من other إلى 15 واطبع عبر original.')
  },
  {
    slug:'object-null-guard', title:'تحقّق من وجود مرجع قبل القراءة', reference:references,
    scene:'خانة مكان التذكرة فاضية. قبل ما تحاول تقرأ رقمها، اسأل هل الخانة فيها تذكرة أصلًا.',
    sceneVisual:scene(['قبل أن تجدها','ticket = null'],['الفحص','ticket == null'],['إن وجدت','اقرأ Number']),
    concept:'null يعني أن الخانة لا تشير إلى كائن. افحصها قبل استخدام النقطة، لأن الوصول للحقل يحتاج كائنًا موجودًا.',
    why:'تتعامل مع غياب البطاقة برسالة تقدر تكمل بعدها البرنامج.',
    mechanics:'تابع صف ticket. يظهر null دون بطاقة كائن عند الغياب، وعند وجودها يظهر مرجع ويمكن قراءة Number.',
    breakdown:['ابدأ Ticket? ticket = null.','عند found أنشئ تذكرة واحفظ المرجع.','افحص ticket وأخرج رسالة أو اقرأ الرقم المناسب.'],
    build:locate({found:false,number:7},['لا توجد تذكرة'],'ابدأ ticket من النوع Ticket? بقيمة null. أنشئها عند found = true. افحص ticket == null، واطبع "لا توجد تذكرة" عند الغياب وticket.Number عند الوجود.',{
      attention:'تابع حالتي وجود البطاقة وغيابها قبل الوصول إلى Number.',
      rule:'افحص المرجع المسموح له أن يكون null قبل قراءة الحقل.',
      help:'اكتب if (ticket == null) { Console.WriteLine("لا توجد تذكرة"); } else { Console.WriteLine(ticket.Number); }.'
    }),
    edit:locate({found:true,number:7},[7],'غيّر found إلى true. تتبّع لحظة إنشاء التذكرة ثم قراءة Number.'),
    experiment:locate({found:true,number:0},[0],'اترك found = true وجرّب تذكرة تحمل الرقم 0. قد يحتوي الكائن الموجود على قيمة صفر.'),
    bug:repair(locate({found:false,number:7},['لا توجد تذكرة'],'اجعل مسار الغياب يطبع الرسالة.'),locateSource({found:false,number:7,guard:'ticket != null'}),
      'وصل التنفيذ إلى Number مع أن ticket فاضية. ما الشرط المناسب لمسار الرسالة؟',
      ['ticket == null','ticket != null','ticket.Number == 0'],'افحص ticket نفسها قبل الوصول لأي حقل.'),
    transfer:locate({found:true,number:29},[29],'أصدر تذكرة رقمها 29 إن كانت موجودة. جرّب أيضًا الغياب وتأكد أن الرد واضح.')
  },
  {
    slug:'generic-class-one-type', title:'اختر نوع محتوى الصندوق', reference:generics,
    scene:'عندك قالب صندوق واحد. اطلب صندوقًا لقبول عدد وصندوقًا لقبول اسم. حط كل بطاقة في صندوق النوع المناسب.',
    sceneVisual:scene(['القالب','Box<T>'],['صندوق الرقم','Box<int> → 7'],['صندوق الاسم','Box<string> → نور']),
    concept:'في تعريف Box<T> اسم T يمثل نوعًا تختاره عند الاستخدام. Box<int> يجعل Item عددًا، وBox<string> يجعل Item نصًا.',
    why:'تستخدم تعريف صندوق واحد مع نوعين مضبوطين، ويستطيع المترجم مراجعة النوع عند إدخال القيمة.',
    mechanics:'تعرض البطاقتان اسم النوع الفعلي وقيمة Item. يطابق نوع الحقل الاختيار المكتوب بين < و >.',
    breakdown:['عرّف class Box<T> مع public T Item.','في Box(T input) احفظ input في Item.','أنشئ Box<int> للرقم وBox<string> للاسم، واطبع محتوى كل صندوق.'],
    build:pack({number:7,text:'نور'},[7,'نور'],'عرّف Box<T> مع T Item ومنشئ يستقبل T input. أنشئ numberBox من Box<int> بالقيمة 7 وlabelBox من Box<string> بالقيمة "نور" واطبع Item لكل صندوق.',{
      attention:'قارن اختيار int أو string بنوع الخانة في بطاقة الكائن.',
      rule:'نوع المعامل العام يحدد نوع الحقل وقت استخدام الصنف.',
      help:'اكتب public T Item; وpublic Box(T input) { this.Item = input; } داخل class Box<T>.'
    }),
    edit:pack({number:10,text:'نور'},[10,'نور'],'غيّر قيمة number إلى 10 مع ثبات النوع int.'),
    experiment:pack({number:10,text:'أحمد'},[10,'أحمد'],'اترك الرقم 10 وبدّل label إلى "أحمد". شاهد أي صندوق تأثر.'),
    bug:repair(pack({number:7,text:'نور'},[7,'نور'],'أرسل لكل صندوق قيمة من نوعه.'),boxSource({number:7,text:'نور',numberArgument:'label'}),
      'Box<int> رفض label. ما القيمة الموافقة لاختيار int؟',
      ['new Box<int>(label)','new Box<int>(number)','new Box<int>("7")'],'مرّر number لأن نوعه int.',1),
    transfer:pack({number:28,text:'مفتاح'},[28,'مفتاح'],'استخدم تعريف Box<T> لتخزين رقم رف 28 وعنوان "مفتاح". أنشئ صندوقًا لكل نوع واطبع القيم.')
  }
].map(lesson => ({...lesson, code:lesson.build.solution, projectContext:'بطاقات عدّادات وتذاكر'}));

exports.data = makeUnit({
  id:'objects-and-references', title:'أنشئ الكائن وتتبّع مرجعه', description:'الصنف والحقول والمنشئ والطرق والمراجع وnull والأنواع العامة.',
  previous, lessons, skill:'الأصناف والكائنات والمراجع', runtime:'csharp-foundations-subset-v10'
});

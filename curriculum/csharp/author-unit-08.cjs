const { makeUnit, exercise, repair } = require('./lesson-builder.cjs');
const previous = require('./author-unit-07.cjs').data;
const localFunctions = 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/building-software/local-functions';
const returns = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/jump-statements#the-return-statement';
const parameters = 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters';
const scene = (...items) => items.map(([label,text]) => ({label,text}));
const source = (...parts) => parts.join('\n');
const declaration = (name, value) => 'int ' + name + ' = ' + value + ';';
const print = expression => 'Console.WriteLine(' + expression + ');';
const define = (signature, ...body) => ['', 'int ' + signature, '{', ...body.map(line => '    ' + line), '}'];

const quote = ({ price, call = 'Price()' }) => source(
  declaration('price',call), print('price'), ...define('Price()', 'return ' + price + ';')
);
const fixedQuote = exercise(quote, [], {
  declared:['price'], printed:['price'], operation:'Price', operationIn:'price', calls:{Price:1}
});

const tripleSource = ({ orders, argument = 'orders' }) => source(
  declaration('orders',orders), declaration('total','Triple(' + argument + ')'), print('total'),
  ...define('Triple(int amount)', 'return amount * 3;')
);
const triple = exercise(tripleSource, [
  [{orders:0},[0]], [{orders:1},[3]], [{orders:7},[21]]
], {declared:['orders','total'], printed:['total'], read:['orders'], operation:'Triple',operationIn:'total',calls:{Triple:1}});

const difference = ({ stock, sold, args = 'stock, sold' }) => source(
  declaration('stock',stock), declaration('sold',sold), declaration('left','Remaining(' + args + ')'), print('left'),
  ...define('Remaining(int available, int used)', 'return available - used;')
);
const remaining = exercise(difference, [
  [{stock:5,sold:5},[0]], [{stock:10,sold:2},[8]], [{stock:2,sold:3},[-1]]
], {declared:['stock','sold','left'],printed:['left'],read:['stock','sold'],operation:'Remaining',operationIn:'left',calls:{Remaining:1}});

const feeSource = ({ amount, total = 'one * 2' }) => source(
  declaration('amount',amount), declaration('one','WithFee(amount)'), declaration('two',total), print('two'),
  ...define('WithFee(int value)', 'return value + 2;')
);
const fee = exercise(feeSource, [
  [{amount:0},[4]], [{amount:1},[6]], [{amount:7},[18]]
], {declared:['amount','one','two'],printed:['two'],read:['amount','one'],operation:'WithFee',operationIn:'one',calls:{WithFee:1}});

const scaleSource = ({ firstInput, secondInput, next = 'Double(secondInput)' }) => source(
  declaration('firstInput',firstInput), declaration('secondInput',secondInput), declaration('first','Double(firstInput)'),
  declaration('second',next), print('first'), print('second'),
  ...define('Double(int number)', 'return number * 2;')
);
const scale = exercise(scaleSource, [
  [{firstInput:0,secondInput:3},[0,6]], [{firstInput:6,secondInput:1},[12,2]], [{firstInput:3,secondInput:3},[6,6]]
], {declared:['firstInput','secondInput','first','second'],printed:['first','second'],read:['firstInput','secondInput'],calls:{Double:2}});

const bumpSource = ({ original, returned = 'copied' }) => source(
  declaration('original',original), declaration('result','AddOne(original)'), print('original'), print('result'),
  ...define('AddOne(int copied)', 'copied = copied + 1;', 'return ' + returned + ';')
);
const bump = exercise(bumpSource, [
  [{original:-1},[-1,0]], [{original:0},[0,1]], [{original:10},[10,11]]
], {declared:['original','result'],printed:['original','result'],updated:['copied'],operation:'AddOne',operationIn:'result',calls:{AddOne:1}});

const localSource = ({ count, printed = 'total' }) => source(
  declaration('count',count), declaration('total','PackCost(count)'), print(printed),
  ...define('PackCost(int items)', 'int price = 4;', 'int cost = items * price;', 'return cost;')
);
const pack = exercise(localSource, [
  [{count:0},[0]], [{count:1},[4]], [{count:7},[28]]
], {declared:['count','total'],printed:['total'],operation:'PackCost',operationIn:'total',calls:{PackCost:1}});

const bookingSource = ({ seats, unit, comparison = '<=' }) => source(
  declaration('seats',seats), declaration('unit',unit), declaration('due','BookingTotal(seats, unit)'), print('due'),
  ...define('BookingTotal(int count, int unitPrice)', 'if (count ' + comparison + ' 0)', '{', '    return 0;', '}', 'return count * unitPrice;')
);
const booking = exercise(bookingSource, [
  [{seats:0,unit:9},[0]], [{seats:-2,unit:7},[0]], [{seats:3,unit:8},[24]]
], {
  declared:['seats','unit','due'], printed:['due'], operation:'BookingTotal', operationIn:'due', calls:{BookingTotal:1},
  branching:true,conditionReads:['count']
});

const lessons = [
  {
    slug:'first-function-call', title:'اذهب إلى الدالة ثم ارجع', reference:localFunctions,
    scene:'على ورقة الطلب خانة سعر فارغة. اذهب إلى بطاقة اسمها Price، خذ الرقم منها، وعد لملء الخانة.',
    sceneVisual:scene(['مكان الطلب','خانة السعر'],['داخل الدالة','أعد القيمة 7'],['عند الرجوع','price = 7']),
    concept:'Price() استدعاء. ينتقل التنفيذ لجسم الدالة، ثم يعود بنفس القيمة التي كتبها return وقت التنفيذ.',
    why:'تعرف أين يذهب التنفيذ عندما يقابل اسم دالة وأقواسها.',
    mechanics:'التتبّع يعرض دخول Price، ثم return، ثم تخزين القيمة في price عند سطر الاستدعاء.',
    breakdown:['ابدأ في السطر الذي يستدعي Price().','انتقل لجسم الدالة.', 'ارجع بالقيمة واطبع price.'],
    build:fixedQuote({price:7},[7],'اكتب int Price() تعيد 7. استدعِ Price() عند تعريف int price ثم اطبع المتغير.',{
      attention:'حدّد مكان الاستدعاء ومكان جسم الدالة.',
      rule:'التنفيذ يدخل الدالة عند كتابة اسمها وأقواس الاستدعاء ثم يرجع بالقيمة.',
      help:'ابدأ بـ int price = Price(); وضع في الدالة return 7;.'
    }),
    edit:fixedQuote({price:9},[9],'غيّر الرقم عند return إلى 9. تابع أثره على price.'),
    experiment:fixedQuote({price:4},[4],'جرّب القيمة 4 من داخل Price وارجع إلى السطر الذي يستقبلها.'),
    bug:repair(fixedQuote({price:7},[7],'أعد قيمة الدالة إلى الخانة.'),quote({price:7,call:'0'}),
      'الدالة Price موجودة لكن price يبقى 0. إيه السطر اللي يطلب القيمة منها؟',
      ['int price = Price();','int price = 0;','Console.WriteLine(0);'],'استدعِ Price() عند إنشاء price حتى تستقبل القيمة العائدة.'),
    transfer:fixedQuote({price:12},[12],'جهّز سعرًا جديدًا 12 في Price. استدعِ الدالة واطبع القيمة التي وصلت إلى price.')
  },
  {
    slug:'function-parameter', title:'مرّر قيمة إلى معامل الدالة', reference:parameters,
    scene:'اطلب من آلة أن تضرب العدد في ثلاثة. تدخل لها عدد الطلبات الحالي، ومع كل طلب جديد ممكن تبعت عددًا مختلفًا.',
    sceneVisual:scene(['القيمة المرسلة','orders = 3'],['داخل الدالة','amount = 3'],['الإرجاع','9']),
    concept:'وقت استدعاء Triple(orders) تُنسخ قيمة orders إلى المعامل amount. جسم الدالة يقرأ amount في هذا الاستدعاء.',
    why:'تقدر تستخدم الحساب مع مدخلات مختلفة.',
    mechanics:'عند الدخول تظهر amount بالقيمة التي وصلت إليها، وبعد return يظهر total في نطاق البرنامج.',
    breakdown:['احفظ مدخل البرنامج في orders.', 'أرسل orders إلى Triple.', 'ارجع بـ amount * 3 ثم اطبع total.'],
    build:triple({orders:3},[9],'خزّن orders = 3. اكتب Triple(int amount) تعيد amount * 3. استدعِ الدالة بقيمة orders واحفظ total واطبعه.',{
      attention:'تابع القيمة من orders إلى amount.',
      rule:'المعامل يأخذ قيمة الوسيط عند الاستدعاء.',
      help:'اكتب int total = Triple(orders); وفي الجسم return amount * 3;.'
    }),
    edit:triple({orders:4},[12],'غيّر orders إلى 4 واترك جسم Triple كما هو.'),
    experiment:triple({orders:0},[0],'جرّب orders = 0. افحص قيمة amount عند الدخول.'),
    bug:repair(triple({orders:3},[9],'مرّر القيمة الموجودة في orders.'),tripleSource({orders:3,argument:'1'}),
      'total تساوي 3 رغم أن orders تساوي 3. أي وسيط يمرّر عدد الطلبات الفعلي؟',
      ['Triple(1)','Triple(orders)','Triple(0)'],'استدعِ Triple(orders) عشان تستفيد من أي قيمة تتخزن في orders.',1),
    transfer:triple({orders:5},[15],'احسب عدد الملصقات إذا احتاج كل طلب ثلاثة ملصقات وكان orders يساوي 5.')
  },
  {
    slug:'function-argument-order', title:'طابق ترتيب الوسيطين مع المعاملين', reference:parameters,
    scene:'قدامك آلة فيها خانة للرصيد وخانة للكمية المستخدمة. حط كل قيمة في مكانها عشان يظهر الفرق الصحيح.',
    sceneVisual:scene(['الخانة الأولى','stock → available'],['الخانة الثانية','sold → used'],['الإرجاع','available - used']),
    concept:'في الاستدعاء بالمواضع، أول قيمة تذهب لأول معامل والثانية للثاني. تبديل القيم يغيّر معنى الفرق.',
    why:'تقرأ توقيع الدالة وتراجع الترتيب قبل استخدامها.',
    mechanics:'لقطة الدخول تعرض available وused معًا. قارن ترتيب القيم بلقطة الاستدعاء.',
    breakdown:['احفظ stock وsold.', 'استدعِ Remaining(stock, sold).', 'أعد available - used واحفظه في left.'],
    build:remaining({stock:9,sold:4},[5],'خزّن stock = 9 وsold = 4. اكتب Remaining(int available, int used) تعيد الفرق. اطبع left من الاستدعاء بالترتيب.',{
      attention:'اختبر أي قيمة دخلت available وأي قيمة دخلت used.',
      rule:'أول وسيط يقابل أول معامل في الاستدعاء بالمواضع.',
      help:'اكتب int left = Remaining(stock, sold);.'
    }),
    edit:remaining({stock:9,sold:6},[3],'بدّل sold إلى 6. تابع المعامل الذي يتغير.'),
    experiment:remaining({stock:9,sold:9},[0],'استخدم قيمتين متساويتين، ثم تأكد من الفرق.'),
    bug:repair(remaining({stock:9,sold:4},[5],'أعد ترتيب الوسيطين.'),difference({stock:9,sold:4,args:'sold, stock'}),
      'الناتج -5. أي ترتيب يعطي available = 9 وused = 4؟',
      ['Remaining(sold, stock)','Remaining(stock, stock)','Remaining(stock, sold)'],'أرسل stock أولًا ثم sold.',2),
    transfer:remaining({stock:13,sold:8},[5],'احسب الفرق بين رصيد 13 واستخدام 8 من نفس الدالة.')
  },
  {
    slug:'function-return-value', title:'استخدم القيمة العائدة في حساب تاني', reference:returns,
    scene:'سعر البطاقة قبل الرسوم ٥. آلة تضيف رسوم ٢ للبطاقة الواحدة. بعد الرجوع احسب تكلفة بطاقتين.',
    sceneVisual:scene(['قبل الدالة','amount = 5'],['القيمة العائدة','one = 7'],['بعد الرجوع','two = 14']),
    concept:'return تسلّم قيمة إلى مكان الاستدعاء. بعد تخزينها في one، تقدر تستخدم one في التعبير التالي.',
    why:'تقسم الحساب إلى خطوة قابلة لإعادة الاستخدام وخطوة تستخدم نتيجتها.',
    mechanics:'راقب return بقيمة 7، ثم ظهور one، ثم تعبير one * 2 عندما يرجع التنفيذ.',
    breakdown:['مرّر amount إلى WithFee.', 'خزّن الناتج في one.', 'احسب two من one واطبعه.'],
    build:fee({amount:5},[14],'اكتب WithFee(int value) تعيد value + 2. خزّن amount = 5 وone من WithFee(amount)، ثم two = one * 2 واطبع two.',{
      attention:'يبدأ حساب two بعد الوصول لقيمة one.',
      rule:'القيمة العائدة تُستخدم في التعبير الذي استدعى الدالة.',
      help:'اكتب int one = WithFee(amount); ثم int two = one * 2;.'
    }),
    edit:fee({amount:8},[20],'غيّر amount إلى 8 وأعد حساب البطاقة ثم البطاقتين.'),
    experiment:fee({amount:2},[8],'جرّب amount = 2. لاحظ أول فرق يظهر بعد الرسوم.'),
    bug:repair(fee({amount:5},[14],'استخدم السعر بعد الرسوم.'),feeSource({amount:5,total:'amount * 2'}),
      'الناتج 10. أي تعبير يستخدم قيمة البطاقة التي رجعت من WithFee؟',
      ['one * 2','amount * 2','one + 2'],'اقرأ one لحساب بطاقتين بعد الرسوم.'),
    transfer:fee({amount:6},[16],'احسب تكلفة بطاقتين سعر الواحدة قبل الرسوم 6 جنيها.')
  },
  {
    slug:'function-reuse', title:'استدعِ نفس الدالة مرتين', reference:localFunctions,
    scene:'عندك صندوقين، الأول فيه قطعتين والتاني فيه خمس. مرّر عدد كل صندوق لنفس آلة المضاعفة وسجّل النتيجتين.',
    sceneVisual:scene(['الاستدعاء الأول','Double(2) → 4'],['الاستدعاء الثاني','Double(5) → 10'],['الحفظ','خانتان مستقلتان']),
    concept:'كل استدعاء جديد يجهّز قيمة جديدة للمعامل. نتيجة الأول تفضل محفوظة بعد ما يبدأ التاني.',
    why:'تنفذ نفس القاعدة لمدخلين بدون تكرار جسم الدالة.',
    mechanics:'شاهد لقطتين للدخول وخروجين. قيمة number في الدالة تتجدد مع كل استدعاء.',
    breakdown:['استدعِ Double أول مرة بقيمة firstInput.', 'استدعِ Double تاني بقيمة secondInput.', 'اطبع first وsecond بالترتيب.'],
    build:scale({firstInput:2,secondInput:5},[4,10],'عرّف Double(int number) تعيد number * 2. استدعِها مرتين مع firstInput = 2 وsecondInput = 5. اطبع first وsecond.',{
      attention:'راقب قيمة number في كل دخول للدالة.',
      rule:'تقدر تستدعي نفس التعريف بقيمة مختلفة كل مرة.',
      help:'اكتب int first = Double(firstInput); وint second = Double(secondInput);.'
    }),
    edit:scale({firstInput:2,secondInput:3},[4,6],'عدّل قيمة secondInput إلى 3 وشاهد النتيجة الثانية.'),
    experiment:scale({firstInput:7,secondInput:3},[14,6],'غيّر firstInput إلى 7. راقب الاستدعاء الذي تغيّر.'),
    bug:repair(scale({firstInput:2,secondInput:5},[4,10],'أجرِ الاستدعاء الثاني.'),scaleSource({firstInput:2,secondInput:5,next:'first'}),
      'second فيها نفس نتيجة first. أي أمر يحسب نتيجة المدخل الثاني؟',
      ['int second = first;','int second = Double(secondInput);','int second = secondInput;'],'استدعِ الدالة مرة ثانية بقيمة secondInput.',1),
    transfer:scale({firstInput:4,secondInput:8},[8,16],'ضاعف كمية الدفعتين 4 و8 باستخدام نفس الدالة.')
  },
  {
    slug:'function-number-copy', title:'غيّر نسخة العدد داخل الدالة', reference:parameters,
    scene:'معاك رقم ٥ على ورقة. ابعت نسخة منه للمكتب التاني. المكتب يزوّد النسخة واحد ويرجّع ٦، وتفضل ورقتك الأولى فيها ٥.',
    sceneVisual:scene(['عند الاستدعاء','original = 5'],['داخل الدالة','copied تصبح 6'],['بعد العودة','original = 5 وresult = 6']),
    concept:'معامل int العادي يستقبل نسخة من القيمة. تحديث copied يغيّر النسخة داخل الاستدعاء.',
    why:'تتوقع القيم التي ترى أثر التغيير، وتحدد أين تحفظ النتيجة الجديدة.',
    mechanics:'تابع copied قبل الزيادة وبعدها. عند الرجوع تظهر original بالقيمة القديمة وresult بالقيمة الجديدة.',
    breakdown:['مرّر original كقيمة.', 'زِد copied داخل AddOne.', 'اطبع الأصل والنتيجة بعد العودة.'],
    build:bump({original:5},[5,6],'خزّن original = 5. داخل AddOne(int copied) زوّد copied واحدًا وأعدها. خزّن الناتج في result واطبع original ثم result.',{
      attention:'افصل خانة original عن copied.',
      rule:'معامل int العادي يُمرّر بالقيمة.',
      help:'داخل الدالة اكتب copied = copied + 1; ثم return copied;.'
    }),
    edit:bump({original:8},[8,9],'جرّب original = 8 وراقب أين تم تخزين 9.'),
    experiment:bump({original:-1},[-1,0],'جرّب -1 واطبع الأصل والنتيجة.'),
    bug:repair(bump({original:5},[5,6],'أعد النسخة بعد تعديلها.'),bumpSource({original:5,returned:'copied - 1'}),
      'الدالة زوّدت copied ثم رجعت بالقيمة القديمة. أي return تسلّم النسخة بعد الزيادة؟',
      ['return copied - 1;','return 0;','return copied;'],'أعد copied بعد سطر الزيادة مباشرة.',2),
    transfer:bump({original:10},[10,11],'احفظ رقم دفعة 10 واطلب الرقم التالي من الدالة. اعرض الرقمين.')
  },
  {
    slug:'local-variable-scope', title:'حدد مكان ظهور المتغير المحلي', reference:localFunctions,
    scene:'في غرفة الحساب توجد ورقة سعر وورقة إجمالي. تقدر تقرأ الورقتين داخل الغرفة. بعد الخروج تتسلّم الإجمالي فقط.',
    sceneVisual:scene(['داخل الدالة','items وprice وcost'],['الذي يرجع','قيمة cost'],['في البرنامج','تُحفظ في total']),
    concept:'price وcost معرفتان جوّه PackCost. بعد الرجوع يصل الناتج إلى total في البرنامج.',
    why:'تقرأ سبب خطأ اسم متغير خارج المكان المسموح فيه.',
    mechanics:'وقت تنفيذ PackCost تظهر قيمها في الجدول. بعد الإرجاع يرجع جدول البرنامج وفيه total.',
    breakdown:['عرّف price وcost داخل الدالة.', 'أعد cost.', 'استخدم اسم total عند الطباعة في البرنامج.'],
    build:pack({count:3},[12],'خزّن count = 3. في PackCost(int items) عرّف price = 4 وcost = items * price وأعد cost. اطبع total في البرنامج.',{
      attention:'حدد مكان كل تعريف ومكان الطباعة.',
      rule:'المتغير المحلي متاح داخل نطاق تعريفه.',
      help:'اطبع total بعد int total = PackCost(count);.'
    }),
    edit:pack({count:2},[8],'غيّر عدد العبوات إلى 2 وشاهد cost داخل الدالة وtotal بعد العودة.'),
    experiment:pack({count:1},[4],'جرّب عبوة واحدة. تابع ظهور price في نطاق PackCost.'),
    bug:repair(pack({count:3},[12],'استخدم متغير البرنامج للطباعة.'),localSource({count:3,printed:'cost'}),
      'الاسم cost يظهر كغير معرّف في الطباعة. أي اسم موجود في مكان الاستدعاء؟',
      ['price','total','items'],'اطبع total، وهو المتغير الذي استقبل نتيجة الدالة.',1),
    transfer:pack({count:5},[20],'احسب تكلفة ٥ عبوات. احتفظ بتفاصيل الحساب داخل PackCost واطبع total بعد الرجوع.')
  },
  {
    slug:'function-booking-total', title:'تطبيق حساب حجز وإرجاع مبكر', reference:returns,
    scene:'مكتب الحجز يستلم عدد المقاعد وسعر الواحد. لو العدد صفر أو سالب يرجّع صفر فورًا. لو العدد موجب يحسب التكلفة.',
    sceneVisual:scene(['المدخلات','عدد وسعر'],['إذا العدد غير موجب','ارجع بصفر'],['إذا العدد موجب','أعد العدد × السعر']),
    concept:'return داخل if تنهي الاستدعاء الحالي. بقية أوامر الدالة تعمل فقط إذا لم يحصل إرجاع قبلها.',
    why:'تفصل قرار التحقق عن باقي البرنامج وتحسب قيمة واضحة لكل حالة.',
    mechanics:'قارن مسار return 0 بمسار return count * unitPrice. في الحالتين تُخزّن القيمة في due عند العودة.',
    breakdown:['اختبر count داخل الدالة.', 'أعد صفرًا عند count <= 0.', 'في المسار الآخر أعد التكلفة.'],
    build:booking({seats:2,unit:7},[14],'خزّن seats = 2 وunit = 7. اكتب BookingTotal(int count, int unitPrice) تعيد 0 إذا count <= 0، وإلا تعيد count * unitPrice. اطبع due.',{
      attention:'تابع وجهة التنفيذ مباشرة بعد return 0.',
      rule:'أول return ينفّذ ينهي الاستدعاء الحالي.',
      help:'ضع if (count <= 0) { return 0; } قبل return count * unitPrice;.'
    }),
    edit:booking({seats:0,unit:7},[0],'غيّر seats إلى صفر وتتبّع الإرجاع المبكر.'),
    experiment:booking({seats:4,unit:7},[28],'جرّب أربعة مقاعد، وتابع الوصول للإرجاع بعد عملية الضرب.'),
    bug:repair(booking({seats:-2,unit:7},[0],'ارفض عدد المقاعد غير الموجب.'),bookingSource({seats:-2,unit:7,comparison:'=='}),
      'العدد -2 أعطى تكلفة سالبة. أي شرط يجعل الدالة ترجع 0 للصفر والأعداد السالبة؟',
      ['count == 0','count >= 0','count <= 0'],'افحص count <= 0 قبل حساب التكلفة.',2),
    transfer:booking({seats:3,unit:11},[33],'استخدم الدالة لحساب تكلفة ٣ مقاعد بسعر ١١ للمقعد. جرّب التحقق من الحدود بنفس التعريف.')
  }
].map(lesson => ({...lesson,code:lesson.build.solution,projectContext:'بطاقة تسعير وحجز'}));

module.exports = {data:makeUnit({
  id:'functions',previous,lessons,
  title:'الوحدة الثامنة: استدعِ دالة وارجع بقيمة',
  description:'الدوال المحلية، المعاملات والقيمة العائدة والنطاق وتطبيق حساب حجز.',
  skill:'الدوال والاستدعاء والنطاق',runtime:'csharp-foundations-subset-v8'
})};

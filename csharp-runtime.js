// Bounded teaching interpreter for the authored C# lessons, not Roslyn/.NET.
// No eval, Function constructor, network execution, or string-to-JS translation.
const LIMITS = { source:16000, tokens:2000, statements:160, output:16000, depth:40 };
const TYPES = new Set(['int','string','bool']);
const COMPARISONS = new Set(['>','>=','<','<=','==','!=']);
const LOGICAL = new Set(['&&', '||']);
const BINARY_PRECEDENCE = {'||':1,'&&':2,'==':3,'!=':3,'>':4,'>=':4,'<':4,'<=':4,'+':10,'-':10,'*':20,'/':20,'%':20};
const RESERVED = new Set(('abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while var').split(' '));
export const RUNTIME_LABEL = 'محاكي أساسيات C# · القيم والمقارنات والشروط';
export class CSharpError extends Error {
  constructor(message,token={},code='syntax') { super(message);this.name='CSharpError';this.line=token.line||1;this.column=token.column||1;this.code=code; }
}
function lex(source) {
  if(source.length>LIMITS.source) throw new CSharpError('المثال أطول من حدود المحاكي. استخدم برنامجًا صغيرًا.',{},'limit');
  const tokens=[];let pos=0,line=1,column=1;
  const at=()=>({line,column,start:pos});
  const advance=()=>{const c=source[pos++];if(c==='\n'){line++;column=1;}else column++;return c;};
  const add=(kind,value,location)=>{tokens.push({kind,value,...location,end:pos});if(tokens.length>LIMITS.tokens)throw new CSharpError('قلّل عدد أجزاء المثال.',location,'limit');};
  while(pos<source.length) {
    const c=source[pos],location=at();
    if(/\s/.test(c)){advance();continue;}
    if(source.startsWith('//',pos)){while(pos<source.length&&source[pos]!=='\n')advance();continue;}
    if(source.startsWith('/*',pos)){
      advance();advance();while(pos<source.length&&!source.startsWith('*/',pos))advance();
      if(pos===source.length)throw new CSharpError('أغلق التعليق بعلامة */.',location);
      advance();advance();continue;
    }
    if(['++','--','+=','-=','*=','/=','%=','=>'].some(op=>source.startsWith(op,pos)))throw new CSharpError('هذا المعامل غير مدعوم في المحاكي التعليمي بعد.',location,'unsupported');
    const pair=source.slice(pos,pos+2);
    if(['==','!=','>=','<=','&&','||'].includes(pair)){advance();advance();add(pair,pair,location);continue;}
    if(c==='"') {
      advance();let value='',closed=false;
      while(pos<source.length){
        const ch=advance();if(ch==='"'){closed=true;break;}
        if(ch==='\n'||ch==='\r')throw new CSharpError('أغلق النص بعلامة " في السطر نفسه. للسطر الجديد استخدم \\n.',location);
        if(ch!=='\\'){value+=ch;continue;}
        const esc=advance(),escapes={n:'\n',r:'\r',t:'\t','"':'"','\\':'\\','0':'\0'};
        if(!Object.hasOwn(escapes,esc))throw new CSharpError('صيغة الهروب هذه غير مدعومة في المحاكي. استخدم نصًا بسيطًا.',location,'unsupported');
        value+=escapes[esc];
      }
      if(!closed)throw new CSharpError('علامة إغلاق النص " ناقصة.',location);
      add('string',value,location);continue;
    }
    if(/\d/.test(c)){let value='';while(pos<source.length&&/\d/.test(source[pos]))value+=advance();add('number',Number(value),location);continue;}
    if(/[\p{L}_]/u.test(c)){let value='';while(pos<source.length&&/[\p{L}\p{N}_]/u.test(source[pos]))value+=advance();add('identifier',value,location);continue;}
    if(';=().+-*/%{}><!'.includes(c)){advance();add(c,c,location);continue;}
    throw new CSharpError('الرمز «'+c+'» خارج نطاق المحاكي التعليمي. يدعم الطباعة والقيم والحساب والمقارنات وif / else.',location,'unsupported');
  }
  tokens.push({kind:'eof',value:'',...at(),end:pos});return tokens;
}
export function parseProgram(source) {
  const text=String(source).replace(/\r\n?/g,'\n'),tokens=lex(text);
  let cursor=0,depth=0,nesting=0,count=0;
  const peek=()=>tokens[Math.min(cursor,tokens.length-1)];
  const take=()=>{const t=peek();if(t.kind!=='eof')cursor++;return t;};
  function expect(kind,value) {
    const t=peek();
    if(t.kind!==kind||(value!==undefined&&t.value!==value))throw new CSharpError(kind===';'?'الفاصلة المنقوطة ; ناقصة في نهاية الأمر السابق.':'كنت أتوقع «'+(value||kind)+'» هنا.',t);
    return take();
  }
  function expression(min=0) {
    if(++depth>LIMITS.depth)throw new CSharpError('قلّل الأقواس المتداخلة في المثال.',peek(),'limit');
    const t=take();let node;
    if(t.kind==='number')node={kind:'literal',type:'int',value:t.value,token:t};
    else if(t.kind==='string')node={kind:'literal',type:'string',value:t.value,token:t};
    else if(t.value==='true'||t.value==='false')node={kind:'literal',type:'bool',value:t.value==='true',token:t};
    else if(t.kind==='identifier'&&!RESERVED.has(t.value))node={kind:'variable',name:t.value,token:t};
    else if(t.kind==='-'||t.kind==='+'||t.kind==='!')node={kind:'unary',op:t.kind,expression:expression(30),token:t};
    else if(t.kind==='('){node=expression();expect(')');}
    else throw new CSharpError('اكتب قيمة أو اسم متغير في هذا الموضع.',t);
    node.start = t.start;
    node.end = tokens[cursor - 1].end;
    while ((BINARY_PRECEDENCE[peek().kind] || 0) > min) {
      const op = take();
      const right = expression(BINARY_PRECEDENCE[op.kind]);
      node = { kind:'binary', op:op.kind, left:node, right, token:op, start:node.start, end:right.end };
    }
    depth--;return node;
  }
  function statement(embedded=false) {
    if(++nesting>LIMITS.depth)throw new CSharpError('قلّل كتل الشروط المتداخلة.',peek(),'limit');
    if(++count>LIMITS.statements)throw new CSharpError('المثال يتجاوز عدد أوامر المحاكي.',peek(),'limit');
    const start=peek();let s,end;
    if(start.kind==='{') {
      take();const body=[];
      while(peek().kind!=='}'&&peek().kind!=='eof')body.push(statement());
      end=expect('}');s={kind:'block',body,token:start,end};
    } else if(start.value==='if') {
      take();expect('(');const condition=expression(),close=expect(')');
      const consequent=statement(true);let alternate=null,elseToken=null;
      if(peek().value==='else'){elseToken=take();alternate=statement(true);}
      s={kind:'if',condition,consequent,alternate,elseToken,header:text.slice(start.start,close.end),token:start};
      end=alternate?.end||consequent.end;
    } else if(start.kind===';') {end=take();s={kind:'empty',token:start};}
    else {
      if(TYPES.has(start.value)) {
        if(embedded)throw new CSharpError('ضع تصريح المتغير داخل كتلة { } تابعة للشرط.',start,'syntax');
        take();const name=expect('identifier');
        if(RESERVED.has(name.value)||name.value==='Console'||name.value==='System')throw new CSharpError('اختَر اسم متغير غير محجوز.',name,'name');
        expect('=');s={kind:'declare',name:name.value,type:start.value,expression:expression(),token:start};
      } else if(start.value==='Console'||start.value==='System') {
        take();if(start.value==='System'){expect('.');expect('identifier','Console');}
        expect('.');const method=expect('identifier');
        if(method.value!=='Write'&&method.value!=='WriteLine')throw new CSharpError('اسم أمر الطباعة حساس لحالة الحروف: Console.Write أو Console.WriteLine.',method,'name');
        expect('(');const argument=peek().kind===')'?null:expression();expect(')');
        if(!argument&&method.value==='Write')throw new CSharpError('Console.Write يحتاج قيمة لطباعتها.',method,'type');
        s={kind:'print',method:method.value,expression:argument,token:start};
      } else if(start.kind==='identifier'&&!RESERVED.has(start.value)) {
        take();expect('=');s={kind:'assign',name:start.value,expression:expression(),token:start};
      } else throw new CSharpError('هذا البناء خارج نطاق المحاكي. استخدم الطباعة أو القيم أو if / else.',start,'unsupported');
      end=expect(';');
    }
    s.end=end;s.source=text.slice(start.start,end.end);nesting--;return s;
  }
  const statements=[];
  // Using directives precede top-level statements, as in a C# console program.
  while(peek().value==='using'){take();expect('identifier','System');expect(';');}
  while(peek().kind!=='eof')statements.push(statement());
  if(!statements.length)throw new CSharpError('اكتب أمرًا صغيرًا أولًا، ثم شغّله.');
  validateTypes(statements);return statements;
}
function validateTypes(statements) {
  const scopes=[];
  const lookup=name=>{for(let i=scopes.length-1;i>=0;i--)if(scopes[i].available.has(name))return scopes[i].available.get(name);};
  function infer(node,allowMin=false) {
    if(node.kind==='literal'){
      if(node.type==='int'&&(!Number.isSafeInteger(node.value)||node.value>(allowMin?2147483648:2147483647)))throw new CSharpError('هذا العدد خارج نطاق int المدعوم هنا.',node.token,'unsupported');
      return node.type;
    }
    if(node.kind==='variable'){
      const type=lookup(node.name);if(!type)throw new CSharpError('المتغير «'+node.name+'» غير معرّف قبل استخدامه. راجع الاسم وحالة الحروف.',node.token,'name');return type;
    }
    if(node.kind==='unary'){
      const type = infer(node.expression, node.op === '-');
      if (node.op === '!') {
        if (type !== 'bool') throw new CSharpError('المعامل ! يحتاج قيمة bool ليعكسها.', node.token, 'type');
        return 'bool';
      }
      if (type !== 'int') throw new CSharpError('الإشارة العددية تحتاج قيمة int.', node.token, 'type');
      return 'int';
    }
    const left=infer(node.left),right=infer(node.right);
    if (LOGICAL.has(node.op)) {
      if (left !== 'bool' || right !== 'bool') throw new CSharpError('المعامل ' + node.op + ' يحتاج قيمة bool على كل طرف.', node.token, 'type');
      return 'bool';
    }
    if(node.op==='=='||node.op==='!='){
      if(left!==right)throw new CSharpError('قارن قيمتين من النوع نفسه؛ لا تخلط النص والعدد والقيمة المنطقية.',node.token,'type');return 'bool';
    }
    if(['>','>=','<','<='].includes(node.op)){
      if(left!=='int'||right!=='int')throw new CSharpError('مقارنة الترتيب هنا تحتاج عددين int.',node.token,'type');return 'bool';
    }
    if(node.op==='+'&&(left==='string'||right==='string'))return 'string';
    if(left!=='int'||right!=='int')throw new CSharpError('هذه العملية تحتاج عددين int، أو علامة + لضم نص.',node.token,'type');return 'int';
  }
  function visitBody(body) {
    const allNames=new Set();
    for(const s of body.filter(s=>s.kind==='declare')){
      if(allNames.has(s.name)||scopes.some(scope=>scope.allNames.has(s.name)))throw new CSharpError('المتغير «'+s.name+'» موجود بالفعل في هذا النطاق أو نطاق يحيط به. لتحديثه استخدم الاسم دون النوع.',s.token,'name');
      allNames.add(s.name);
    }
    scopes.push({allNames,available:new Map()});body.forEach(visit);scopes.pop();
  }
  function visit(s) {
    if(s.kind==='block'){visitBody(s.body);return;}
    if(s.kind==='if'){
      if(infer(s.condition)!=='bool')throw new CSharpError('شرط if يحتاج قيمة bool: true أو false، وليس عددًا أو نصًا.',s.token,'type');
      // Both branches are checked before any statement executes.
      visit(s.consequent);if(s.alternate)visit(s.alternate);return;
    }
    if(s.kind==='empty')return;
    if(s.kind==='assign'&&!lookup(s.name))throw new CSharpError('عرّف المتغير «'+s.name+'» قبل إسناد قيمة له.',s.token,'name');
    const type=s.expression?infer(s.expression):null,target=s.kind==='declare'?s.type:lookup(s.name);
    if(s.kind!=='print'&&type!==target)throw new CSharpError('القيمة من النوع '+type+' لا تصلح لمتغير من النوع '+target+'.',s.token,'type');
    if(s.kind==='declare')scopes.at(-1).available.set(s.name,s.type);
  }
  visitBody(statements);
}
function display(value){return typeof value==='boolean'?(value?'True':'False'):String(value);}
function boundedInt(value, token) {
  if (!Number.isSafeInteger(value) || value < -2147483648 || value > 2147483647) {
    throw new CSharpError('الناتج خارج نطاق الحساب المدعوم بالمحاكي. جرّب أعدادًا أصغر.', token, 'unsupported');
  }
  return value;
}

function binaryValue(operator, left, right, token) {
  switch (operator) {
    case '==': return left === right;
    case '!=': return left !== right;
    case '>': return left > right;
    case '>=': return left >= right;
    case '<': return left < right;
    case '<=': return left <= right;
  }
  if (operator === '+' && (typeof left === 'string' || typeof right === 'string')) {
    const a = display(left), b = display(right);
    if (a.length + b.length > LIMITS.output) throw new CSharpError('قيمة النص أكبر من حدود المحاكي. استخدم نصًا أقصر.', token, 'limit');
    return a + b;
  }
  if ((operator === '/' || operator === '%') && right === 0) {
    throw new CSharpError('لا يمكن قسمة int على صفر. غيّر المقسوم عليه.', token, 'runtime');
  }
  switch (operator) {
    case '+': return boundedInt(left + right, token);
    case '-': return boundedInt(left - right, token);
    case '*': return boundedInt(left * right, token);
    case '/': return boundedInt(Math.trunc(left / right), token);
    case '%': return boundedInt(left % right, token);
  }
}

function evaluateExpression(root, variables, source) {
  const names = new Set();
  const logic = [];
  let comparison = null;
  const operand = (node, value) => ({ source: source.slice(node.start, node.end), value });

  function evaluate(node) {
    if (node.kind === 'literal') return node.value;
    if (node.kind === 'variable') {
      names.add(node.name);
      return variables.get(node.name).value;
    }
    if (node.kind === 'unary') {
      const value = evaluate(node.expression);
      if (node.op !== '!') return boundedInt(node.op === '-' ? -value : value, node.token);
      const result = !value;
      logic.push({ operator: '!', right: operand(node.expression, value), result });
      return result;
    }

    const left = evaluate(node.left);
    if (LOGICAL.has(node.op)) {
      // Static checking has already visited both operands. At runtime the left
      // operand can determine the result on its own.
      const skipRight = node.op === '&&' ? !left : left;
      const right = skipRight ? null : evaluate(node.right);
      const result = right ?? left;
      logic.push({ operator: node.op, left: operand(node.left, left), right: operand(node.right, right), result });
      return result;
    }
    const right = evaluate(node.right);
    const result = binaryValue(node.op, left, right, node.token);
    if (node === root && COMPARISONS.has(node.op)) comparison = { left, operator: node.op, right, result };
    return result;
  }

  const value = root ? evaluate(root) : '';
  return { value, reads: [...names], comparison, logic };
}

function allStatements(statements) {
  const result = [];
  for (const statement of statements) {
    result.push(statement);
    if (statement.kind === 'block') result.push(...allStatements(statement.body));
    if (statement.kind === 'if') {
      result.push(...allStatements([statement.consequent]));
      if (statement.alternate) result.push(...allStatements([statement.alternate]));
    }
  }
  return result;
}

export function runProgram(source,inputs={}) {
  const text = String(source).replace(/\r\n?/g, '\n');
  const statements = parseProgram(text), scopes = [new Map()], trace = [], skipped = new Set();
  const sourceLines = text.split('\n');
  let output = '';
  const visible=()=>new Map(scopes.flatMap(scope=>[...scope]));
  const owner=name=>scopes.findLast(scope=>scope.has(name));
  const firstLine=s=>s.kind==='block'?(s.body[0]?.token.line||s.end.line):s.token.line;
  function snapshot(s,details={}){
    trace.push({line:s.token.line,source:s.source,kind:s.kind,name:null,reads:[],variables:Object.fromEntries([...visible()].map(([name,v])=>[name,{...v}])),output,skippedLines:[...skipped],...details});
  }
  function executeBody(body,nextLine=null){for(let i=0;i<body.length;i++)execute(body[i],body[i+1]?.token.line||nextLine);}
  function skipLines(start, end) {
    // Dim complete source lines. A line can contain both an executed and a
    // skipped statement when the learner uses compact brace formatting.
    const before = sourceLines[start.line - 1].slice(0, start.column - 1);
    const after = sourceLines[end.line - 1].slice(end.column - 1 + end.end - end.start);
    for (let line = start.line + Number(!!before.trim()); line <= end.line - Number(!!after.trim()); line++) skipped.add(line);
  }
  function execute(s, nextLine, clause = 'if') {
    if(s.kind==='block'){
      scopes.push(new Map());executeBody(s.body,s.end.line);scopes.pop();
      snapshot({kind:'scope-exit',token:s.end,source:'}'},{action:'يا كمبيوتر، انتهت الكتلة. أكمل من الأمر التالي، واحتفظ بتحديثات المتغيرات الخارجية.'});return;
    }
    if (s.kind === 'if') {
      const evaluation = evaluateExpression(s.condition, visible(), text);
      const passed = evaluation.value;
      const chosen = passed ? s.consequent : s.alternate;
      const hasNextCondition = s.alternate?.kind === 'if';
      if (passed && s.alternate) skipLines(s.elseToken, s.alternate.end);
      if (!passed) skipLines(s.consequent.token, s.consequent.end);

      let branch = 'skip', target = nextLine, instruction = 'تجاوز الجسم.';
      if (passed) {
        branch = 'if';
        target = firstLine(chosen);
        instruction = 'نفّذ جسم ' + clause + '.';
      } else if (hasNextCondition) {
        branch = 'else-if';
        target = chosen.token.line;
        instruction = 'افحص شرط else if التالي.';
      } else if (chosen) {
        branch = 'else';
        target = s.elseToken.line;
        instruction = 'انتقل إلى else.';
      }
      const action = 'يا كمبيوتر، نتيجة الشرط ' + display(passed) + '. ' + instruction + (target ? ' اذهب إلى السطر ' + target + '.' : ' اكتمل الاختيار.');
      snapshot(s, { ...evaluation, kind: 'condition', source: clause === 'else if' ? 'else ' + s.header : s.header, clause, branch, nextLine: target, action });
      if (branch === 'else') {
        snapshot({ kind: 'else', token: s.elseToken, source: 'else' }, { action: 'يا كمبيوتر، نفّذ جسم else لأن الشروط السابقة لم تتحقق.' });
      }
      if (chosen) execute(chosen, nextLine, branch === 'else-if' ? 'else if' : 'if');
      return;
    }
    if(s.kind==='empty'){snapshot(s,{action:'يا كمبيوتر، هذه جملة فارغة؛ انتقل إلى الأمر التالي.'});return;}
    const variables=visible(),previous=variables.get(s.name)?.value;
    const evaluation = evaluateExpression(s.expression, variables, text);
    let value = evaluation.value;
    if(s.kind==='declare'&&Object.hasOwn(inputs,s.name)){
      value=inputs[s.name];
      if((s.type==='int'&&(!Number.isInteger(value)||value<-2147483648||value>2147483647))||(s.type==='string'&&typeof value!=='string')||(s.type==='bool'&&typeof value!=='boolean'))throw new CSharpError('قيمة الاختبار لا تطابق نوع المدخل.',s.token,'type');
    }
    if(s.kind==='print')output+=display(value)+(s.method==='WriteLine'?'\n':'');
    else if(s.kind==='declare')scopes.at(-1).set(s.name,{type:s.type,value});
    else owner(s.name).set(s.name,{type:variables.get(s.name).type,value});
    if(output.length>LIMITS.output)throw new CSharpError('المخرجات أكبر من حدود المحاكي.',s.token,'limit');
    const action=s.kind==='print'?'يا كمبيوتر، اطبع القيمة الحالية'+(s.method==='WriteLine'?' ثم انتقل لسطر جديد.':' واترك موضع الكتابة في السطر نفسه.')
      :s.kind==='declare'?'يا كمبيوتر، أنشئ المتغير '+s.name+' من النوع '+s.type+' واحفظ فيه '+display(value)+'.'
      :'يا كمبيوتر، حدّث '+s.name+' من '+display(previous)+' إلى '+display(value)+'.';
    snapshot(s, { ...evaluation, name: s.name || null, value, previous, action });
  }
  executeBody(statements);return {output,trace,variables:Object.fromEntries(scopes[0]),statements};
}
export function checkChallenge(source,challenge,baselineOutput=null) {
  let result;try{result=runProgram(source);}catch(error){return {passed:false,message:error.message,error};}
  const statements=allStatements(result.statements);
  const fail=message=>({passed:false,result,message});
  if(challenge.output!==undefined&&result.output!==challenge.output)return fail('شُغّل الكود، لكن الناتج يحتاج مراجعة. قارن كل سطر بالناتج المطلوب.');
  if(challenge.differentOutput&&result.output===baselineOutput)return fail('غيّر قيمة تؤثر في الناتج، ثم شغّل. تغيير المسافات أو التعليقات وحده لا يغيّر التنفيذ.');
  for(const name of challenge.declared||[])if(!statements.some(s=>s.kind==='declare'&&s.name===name))return fail('أنشئ المتغير «'+name+'» واستخدمه في الحل.');
  for(const[name,type]of Object.entries(challenge.types||{}))if(result.variables[name]?.type!==type)return fail('استخدم النوع '+type+' للمتغير «'+name+'» كما تطلب الخطوة؛ تشابه المخرجات لا يثبت النوع.');
  for(const name of challenge.read||[])if(!result.trace.some(t=>t.reads.includes(name)))return fail('استخدم قيمة المتغير «'+name+'» في التنفيذ؛ كتابة الناتج مباشرة لا تثبت الفكرة.');
  for(const name of challenge.printed||[])if(!result.trace.some(t=>t.kind==='print'&&t.reads.includes(name)))return fail('اطبع قيمة المتغير «'+name+'» باسمه؛ كتابة الناتج يدويًا لا تثبت قراءة المتغير.');
  if(challenge.minPrints&&result.trace.filter(t=>t.kind==='print').length<challenge.minPrints)return fail('أضف أوامر الطباعة المطلوبة، ثم راقب ترتيبها.');
  for(const name of challenge.updated||[])if(!statements.some(s=>s.kind==='assign'&&s.name===name))return fail('المطلوب تحديث المتغير «'+name+'» بعد تعريفه.');
  for(const[name,expected]of Object.entries(challenge.values||{}))if(result.variables[name]?.value!==expected)return fail('راجع القيمة النهائية للمتغير «'+name+'».');
  if (challenge.operation) {
    const matchesOperation = statements.some(statement => {
      if (challenge.operationIn && statement.name !== challenge.operationIn) return false;
      return containsOperator(statement.expression || statement.condition, challenge.operation);
    });
    if (!matchesOperation) return fail('استخدم المعامل ' + challenge.operation + (challenge.operationIn ? ' لحساب «' + challenge.operationIn + '».' : ' لحساب النتيجة المطلوبة.'));
  }
  if(challenge.methods&&!challenge.methods.every(m=>statements.some(s=>s.method===m)))return fail('استخدم أمر الطباعة المطلوب في هذه الخطوة.');
  if(challenge.branching&&!statements.some(s=>s.kind==='if'))return fail('استخدم if ليختار البرنامج متى ينفذ الأمر.');
  if(challenge.elseRequired&&!statements.some(s=>s.kind==='if'&&s.alternate))return fail('أضف مسار else عندما لا يتحقق الشرط.');
  const conditionReads = new Set();
  let testedElseIf = false;
  const observeConditions = trace => {
    for (const step of trace) {
      if (step.kind !== 'condition') continue;
      for (const name of step.reads) conditionReads.add(name);
      if (step.clause === 'else if') testedElseIf = true;
    }
  };
  observeConditions(result.trace);
  for (const example of challenge.cases || []) {
    try {
      const alternate = runProgram(source, example.inputs);
      if (alternate.output !== example.output) return fail('الناتج الحالي صحيح، لكن الحل لم ينجح بقيم أخرى. راجع المتغيرات والحد الفاصل.');
      observeConditions(alternate.trace);
    } catch {
      return fail('لم تنجح إحدى حالات الاختبار. راجع الأنواع واعتماد القرار على المتغيرات.');
    }
  }
  if (challenge.elseIfRequired && !testedElseIf) return fail('استخدم else if لفحص شرط بديل عند تجاوز الشرط الأول.');
  for (const name of challenge.conditionReads || []) {
    if (!conditionReads.has(name)) return fail('اجعل قرار if يقرأ المتغير «' + name + '» بدل شرط ثابت.');
  }
  return {passed:true,result,message:'صحيح. نفّذت المطلوب وشاهدت أثره.'};
}
function containsOperator(node,op){return !!node&&(node.op===op||containsOperator(node.left,op)||containsOperator(node.right,op)||containsOperator(node.expression,op));}

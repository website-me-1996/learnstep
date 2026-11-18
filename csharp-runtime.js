// Bounded teaching interpreter for the authored C# lessons, not Roslyn/.NET.
// No eval, Function constructor, network execution, or string-to-JS translation.
const LIMITS = { source:16000, tokens:2000, statements:160, output:16000, depth:40, trace:1000, array:64 };
const NUMERIC_TYPES = new Set(['int', 'double', 'decimal']);
const TYPES = new Set([...NUMERIC_TYPES, 'string', 'bool']);
const TEXT_TYPES = new Set(['string', 'string?']);
const LOOP_KINDS = new Set(['while', 'for', 'foreach']);
const INCREMENTS = new Set(['++', '--']);
const ASSIGNMENTS = new Set(['=', '+=', '-=', '*=', '/=', '%=']);
const arrayType = type => type?.endsWith('[]');
const COMPARISONS = new Set(['>','>=','<','<=','==','!=']);
const LOGICAL = new Set(['&&', '||']);
const BINARY_PRECEDENCE = {'??':1,'||':2,'&&':3,'==':4,'!=':4,'>':5,'>=':5,'<':5,'<=':5,'+':10,'-':10,'*':20,'/':20,'%':20};
const RESERVED = new Set(('abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while var').split(' '));
export const RUNTIME_LABEL = 'محاكي أساسيات C# · القيم والحساب والشروط والحلقات';
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
    const pair=source.slice(pos,pos+2);
    if(['==','!=','>=','<=','&&','||','??'].includes(pair)||INCREMENTS.has(pair)||ASSIGNMENTS.has(pair)){advance();advance();add(pair,pair,location);continue;}
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
    if (/\d/.test(c) || (c === '.' && /\d/.test(source[pos + 1] || ''))) {
      const literal = /^(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?[dDmM]?/.exec(source.slice(pos))[0];
      for (let i = 0; i < literal.length; i++) advance();
      add('number', literal, location);
      continue;
    }
    if(/[\p{L}_]/u.test(c)){let value='';while(pos<source.length&&/[\p{L}\p{N}_]/u.test(source[pos]))value+=advance();add('identifier',value,location);continue;}
    if(';=().,+-*/%{}[]><!?'.includes(c)){advance();add(c,c,location);continue;}
    throw new CSharpError('الرمز «'+c+'» خارج نطاق المحاكي التعليمي. راجع تركيب المثال.',location,'unsupported');
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
  function nameToken() {
    const name = expect('identifier');
    if (RESERVED.has(name.value) || name.value === 'Console' || name.value === 'System') {
      throw new CSharpError('اختَر اسم متغير غير محجوز.', name, 'name');
    }
    return name;
  }
  function declaration() {
    const token = take();
    let type = token.value;
    if (type === 'string' && peek().kind === '?') type += take().value;
    if (peek().kind === '[') {
      take();
      expect(']');
      type += '[]';
    }
    const name = nameToken().value;
    expect('=');
    let initializer;
    if (arrayType(type) && peek().kind === '{') {
      const start = take(), items = [];
      while (peek().kind !== '}') {
        if (items.length >= LIMITS.array) {
          throw new CSharpError('اختر مصفوفة تعليمية من 64 عنصرًا أو أقل.', peek(), 'limit');
        }
        items.push(expression());
        if (peek().kind !== ',') break;
        take();
      }
      const end = expect('}');
      initializer = {kind:'array', type, items, token:start, start:start.start, end:end.end};
    } else {
      initializer = expression();
    }
    return {kind:'declare', name, type, expression:initializer, token};
  }
  function assignment() {
    const start = peek();
    const prefix = INCREMENTS.has(start.kind);
    const operator = prefix ? take() : null;
    const name = nameToken();
    const op = operator || take();
    if (!ASSIGNMENTS.has(op.kind) && !INCREMENTS.has(op.kind)) {
      throw new CSharpError('استخدم = أو معامل تحديث مدعوم بعد اسم المتغير.', op);
    }
    const increment = INCREMENTS.has(op.kind);
    const right = increment
      ? {kind:'literal', type:'int', value:1, token:op, start:op.start, end:op.end}
      : expression();
    const rhs = op.kind === '=' ? right : {
      kind:'binary', op:op.kind[0], token:op,
      left:{kind:'variable', name:name.value, token:name, start:name.start, end:name.end},
      right, start:start.start, end:tokens[cursor - 1].end
    };
    return {kind:'assign', name:name.value, update:op.kind, expression:rhs, token:start};
  }
  function forPart(part) {
    if (peek().kind === closeForPart[part]) return null;
    const step = part === 'init' && TYPES.has(peek().value) ? declaration() : assignment();
    step.end = tokens[cursor - 1];
    step.source = text.slice(step.token.start, step.end.end);
    return step;
  }
  const closeForPart = {init:';', update:')'};
  function expression(min=0) {
    if(++depth>LIMITS.depth)throw new CSharpError('قلّل الأقواس المتداخلة في المثال.',peek(),'limit');
    const t=take();let node;
    if(t.kind==='number') {
      const suffix = t.value.at(-1).toLowerCase();
      const type = suffix === 'm' ? 'decimal' : /[.ed]/i.test(t.value) ? 'double' : 'int';
      const value = type === 'decimal' ? parseDecimal(t.value.slice(0, -1), t) : Number(suffix === 'd' ? t.value.slice(0, -1) : t.value);
      node={kind:'literal',type,value,token:t};
    }
    else if(t.kind==='string')node={kind:'literal',type:'string',value:t.value,token:t};
    else if(t.value==='true'||t.value==='false')node={kind:'literal',type:'bool',value:t.value==='true',token:t};
    else if (t.value === 'null') node = { kind:'literal', type:'string?', value:null, token:t };
    else if ((t.value === 'Console' || t.value === 'System') && peek().kind === '.') {
      expect('.');
      if (t.value === 'System') { expect('identifier', 'Console'); expect('.'); }
      const method = expect('identifier', 'ReadLine');
      expect('('); expect(')');
      node = { kind:'read-line', op:'ReadLine', token:method };
    }
    else if (t.value === 'int' && peek().kind === '.') {
      expect('.');
      const method = expect('identifier', 'TryParse');
      expect('(');
      const input = expression();
      expect(','); expect('identifier', 'out'); expect('identifier', 'int');
      const output = nameToken();
      expect(')');
      node = { kind:'try-parse', op:'TryParse', expression:input, outName:output.value, token:method };
    }
    else if(t.kind==='identifier'&&!RESERVED.has(t.value))node={kind:'variable',name:t.value,token:t};
    else if (INCREMENTS.has(t.kind)) throw new CSharpError('اكتب تحديث ++ أو -- كأمر مستقل أو في خانة التحديث داخل for.', t, 'unsupported');
    else if(t.kind==='-'||t.kind==='+'||t.kind==='!')node={kind:'unary',op:t.kind,expression:expression(30),token:t};
    else if (t.kind === '(') {
      if (peek().kind === 'identifier' && NUMERIC_TYPES.has(peek().value) && tokens[cursor + 1]?.kind === ')') {
        const target = take();
        take();
        node = { kind:'cast', target:target.value, expression:expression(30), token:target, op:'(' + target.value + ')' };
      } else {
        node=expression();
        expect(')');
      }
    }
    else throw new CSharpError('اكتب قيمة أو اسم متغير في هذا الموضع.',t);
    node.start = t.start;
    node.end = tokens[cursor - 1].end;
    while (peek().kind === '.') {
      take();
      const member = expect('identifier', 'Length');
      node = { kind:'length', expression:node, token:member, op:'.Length', start:node.start, end:member.end };
    }
    while ((BINARY_PRECEDENCE[peek().kind] || 0) > min) {
      const op = take();
      const right = expression(BINARY_PRECEDENCE[op.kind] - Number(op.kind === '??'));
      node = { kind:'binary', op:op.kind, left:node, right, token:op, start:node.start, end:right.end };
    }
    depth--;return node;
  }
  function statement(embedded=false) {
    if(++nesting>LIMITS.depth)throw new CSharpError('قلّل الكتل المتداخلة.',peek(),'limit');
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
    } else if (LOOP_KINDS.has(start.value)) {
      take();
      expect('(');
      const kind = start.value;
      s = {kind, token:start};
      if (kind === 'for') {
        s.initializer = forPart('init');
        expect(';');
        s.condition = peek().kind === ';' ? null : expression();
        expect(';');
        s.update = forPart('update');
      } else if (kind === 'foreach') {
        const type = expect('identifier');
        if (!TYPES.has(type.value)) throw new CSharpError('اكتب نوع العنصر في foreach مثل int.', type, 'type');
        const name = nameToken();
        expect('identifier', 'in');
        s.iterator = {type:type.value, name:name.value, token:name};
        s.collection = expression();
      } else {
        s.condition = expression();
      }
      const close = expect(')');
      s.header = text.slice(start.start, close.end);
      s.body = statement(true);
      end = s.body.end;
    } else if (start.value === 'break' || start.value === 'continue') {
      take();
      end = expect(';');
      s = {kind:start.value, token:start};
    } else if(start.kind===';') {end=take();s={kind:'empty',token:start};}
    else {
      if(TYPES.has(start.value)) {
        if(embedded)throw new CSharpError('ضع تصريح المتغير داخل كتلة { }.',start,'syntax');
        s = declaration();
      } else if(start.value==='Console'||start.value==='System') {
        take();if(start.value==='System'){expect('.');expect('identifier','Console');}
        expect('.');const method=expect('identifier');
        if(method.value!=='Write'&&method.value!=='WriteLine')throw new CSharpError('اسم أمر الطباعة حساس لحالة الحروف: Console.Write أو Console.WriteLine.',method,'name');
        expect('(');const argument=peek().kind===')'?null:expression();expect(')');
        if(!argument&&method.value==='Write')throw new CSharpError('Console.Write يحتاج قيمة لطباعتها.',method,'type');
        s={kind:'print',method:method.value,expression:argument,token:start};
      } else if((start.kind==='identifier'&&!RESERVED.has(start.value)) || INCREMENTS.has(start.kind)) {
        s = assignment();
      } else throw new CSharpError('هذا البناء خارج نطاق المحاكي. راجع الصيغ المتاحة في الدرس.',start,'unsupported');
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
  let loopDepth = 0;
  const lookup=name=>{for(let i=scopes.length-1;i>=0;i--)if(scopes[i].available.has(name))return scopes[i].available.get(name);};
  function infer(node,allowMin=false,allowTryParse=false) {
    node.valueType = inferType(node, allowMin, allowTryParse);
    return node.valueType;
  }
  function inferType(node,allowMin,allowTryParse) {
    if(node.kind==='literal'){
      if(node.type==='int'&&(!Number.isSafeInteger(node.value)||node.value>(allowMin?2147483648:2147483647)))throw new CSharpError('هذا العدد خارج نطاق int المدعوم هنا.',node.token,'unsupported');
      if (node.type === 'double' && !Number.isFinite(node.value)) throw new CSharpError('هذا العدد المكتوب خارج نطاق double.', node.token, 'unsupported');
      return node.type;
    }
    if (node.kind === 'read-line') return 'string?';
    if (node.kind === 'array') {
      const element = node.type.slice(0, -2);
      for (const item of node.items) {
        if (!canAssign(infer(item), element)) throw new CSharpError('استخدم عناصر من نوع ' + element + ' في المصفوفة.', item.token, 'type');
      }
      return node.type;
    }
    if (node.kind === 'try-parse') {
      if (!allowTryParse) throw new CSharpError('في هذا الدرس خزّن نجاح TryParse في متغير bool مستقل، ثم افحصه.', node.token, 'unsupported');
      if (!TEXT_TYPES.has(infer(node.expression))) throw new CSharpError('اعطِ TryParse قيمة نصية واسم نتيجة out من النوع int.', node.token, 'type');
      return 'bool';
    }
    if(node.kind==='variable'){
      const type=lookup(node.name);if(!type)throw new CSharpError('المتغير «'+node.name+'» غير معرّف قبل استخدامه. راجع الاسم وحالة الحروف.',node.token,'name');return type;
    }
    if (node.kind === 'length') {
      const type = infer(node.expression);
      if (type !== 'string' && !arrayType(type)) throw new CSharpError('استخدم Length مع نص أو مصفوفة.', node.token, 'type');
      return 'int';
    }
    if (node.kind === 'cast') {
      const from = infer(node.expression);
      if (!NUMERIC_TYPES.has(from)) throw new CSharpError('هذا التحويل يحتاج قيمة عددية.', node.token, 'type');
      if (!promoteNumbers(from, node.target)) throw new CSharpError('التحويل بين double وdecimal خارج نطاق المحاكي.', node.token, 'unsupported');
      return node.target;
    }
    if(node.kind==='unary'){
      const type = infer(node.expression, node.op === '-');
      if (node.op === '!') {
        if (type !== 'bool') throw new CSharpError('المعامل ! يحتاج قيمة bool ليعكسها.', node.token, 'type');
        return 'bool';
      }
      if (!NUMERIC_TYPES.has(type)) throw new CSharpError('الإشارة العددية تحتاج قيمة عددية.', node.token, 'type');
      return type;
    }
    const left=infer(node.left),right=infer(node.right);
    if (node.op === '??') {
      if (!TEXT_TYPES.has(left) || !TEXT_TYPES.has(right)) throw new CSharpError('في هذا الدرس استخدم ?? لاختيار نص بديل.', node.token, 'type');
      return left === 'string' ? 'string' : right;
    }
    if (LOGICAL.has(node.op)) {
      if (left !== 'bool' || right !== 'bool') throw new CSharpError('المعامل ' + node.op + ' يحتاج قيمة bool على كل طرف.', node.token, 'type');
      return 'bool';
    }
    const numericType = promoteNumbers(left, right);
    if (COMPARISONS.has(node.op)) {
      const sameTypeEquality = (node.op === '==' || node.op === '!=') && (left === right || (TEXT_TYPES.has(left) && TEXT_TYPES.has(right)));
      if (!numericType && !sameTypeEquality) throw new CSharpError('قارن قيمتين عدديتين متوافقتين أو قارن قيمتين من النوع نفسه باستخدام == أو !=.', node.token, 'type');
      return 'bool';
    }
    if(node.op==='+'&&(TEXT_TYPES.has(left)||TEXT_TYPES.has(right)))return 'string';
    if (!numericType) throw new CSharpError('هذه العملية تحتاج عددين من نوعين متوافقين أو علامة + لضم نص.', node.token, 'type');
    if (numericType === 'decimal' && node.op === '/') throw new CSharpError('قسمة decimal خارج نطاق محاكي الدرس. استخدم double للقسمة أو جرّب .NET.', node.token, 'unsupported');
    return numericType;
  }
  function namesIn(declarations) {
    return declarations.flatMap(s => s.expression?.kind === 'try-parse'
      ? [[s.name, s.token], [s.expression.outName, s.expression.token]]
      : [[s.name, s.token]]);
  }
  function enterScope(declarations) {
    const allNames = new Set();
    for (const [name, token] of declarations) {
      if (allNames.has(name) || scopes.some(scope => scope.allNames.has(name))) {
        throw new CSharpError('المتغير «' + name + '» موجود بالفعل في هذا النطاق أو نطاق يحيط به. لتحديثه استخدم الاسم دون النوع.', token, 'name');
      }
      allNames.add(name);
    }
    scopes.push({allNames, available:new Map()});
  }
  function visitBody(body) {
    enterScope(namesIn(body.filter(s => s.kind === 'declare')));
    body.forEach(visit);
    scopes.pop();
  }
  function visitLoop(s) {
    if (s.kind === 'foreach') {
      const {name, token, type} = s.iterator;
      if (infer(s.collection) !== type + '[]') throw new CSharpError('اختَر مصفوفة من النوع ' + type + '[] مع متغير foreach.', s.collection.token, 'type');
      enterScope([[name, token]]);
      const scope = scopes.at(-1);
      scope.available.set(name, type);
      scope.readOnly = name;
    } else {
      enterScope(namesIn(s.initializer?.kind === 'declare' ? [s.initializer] : []));
      if (s.initializer) visit(s.initializer);
      if (s.condition && infer(s.condition) !== 'bool') throw new CSharpError('شرط الحلقة يحتاج قيمة bool مثل i < limit.', s.condition.token, 'type');
      if (s.update) visit(s.update);
    }
    loopDepth++;
    visit(s.body);
    loopDepth--;
    scopes.pop();
  }
  function visit(s) {
    if(s.kind==='block'){visitBody(s.body);return;}
    if (LOOP_KINDS.has(s.kind)) { visitLoop(s); return; }
    if (s.kind === 'break' || s.kind === 'continue') {
      if (!loopDepth) throw new CSharpError('استخدم ' + s.kind + ' داخل حلقة.', s.token, 'syntax');
      return;
    }
    if(s.kind==='if'){
      if(infer(s.condition)!=='bool')throw new CSharpError('شرط if يحتاج قيمة bool: true أو false، وليس عددًا أو نصًا.',s.token,'type');
      // Both branches are checked before any statement executes.
      visit(s.consequent);if(s.alternate)visit(s.alternate);return;
    }
    if(s.kind==='empty')return;
    if(s.kind==='assign'&&!lookup(s.name))throw new CSharpError('عرّف المتغير «'+s.name+'» قبل إسناد قيمة له.',s.token,'name');
    if (s.kind === 'assign' && scopes.findLast(scope => scope.available.has(s.name))?.readOnly === s.name) {
      throw new CSharpError('متغير foreach للقراءة داخل الحلقة. غيّر متغيرًا خارجيًا إذا أردت حساب مجموع أو عد.', s.token, 'type');
    }
    const allowTryParse = s.kind === 'declare' && s.type === 'bool';
    const type=s.expression?infer(s.expression,false,allowTryParse):null,target=s.kind==='declare'?s.type:lookup(s.name);
    if(s.kind!=='print'&&!canAssign(type,target))throw new CSharpError('القيمة من النوع '+type+' لا تصلح لمتغير من النوع '+target+' في هذا الدرس.',s.token,'type');
    if(s.kind==='declare') {
      scopes.at(-1).available.set(s.name,s.type);
      if (s.expression.kind === 'try-parse') scopes.at(-1).available.set(s.expression.outName, 'int');
    }
  }
  visitBody(statements);
}
function canAssign(type, target) {
  return type === target || (type === 'int' && NUMERIC_TYPES.has(target)) || (type === 'string' && target === 'string?');
}
function promoteNumbers(left, right) {
  if (!NUMERIC_TYPES.has(left) || !NUMERIC_TYPES.has(right)) return null;
  if (left === right || right === 'int') return left;
  return left === 'int' ? right : null;
}

const DECIMAL_MAX = 79228162514264337593543950335n;
const magnitude = value => value < 0n ? -value : value;
const scaleBy = (value, places) => value * 10n ** BigInt(places);

function decimal(coefficient, scale, token) {
  while (scale > 0 && coefficient % 10n === 0n && (scale > 28 || magnitude(coefficient) > DECIMAL_MAX)) {
    coefficient /= 10n;
    scale--;
  }
  if (scale > 28 || magnitude(coefficient) > DECIMAL_MAX) {
    throw new CSharpError('هذا الناتج يحتاج تقريبًا أو نطاقًا خارج حساب decimal المدعوم. جرّب قيمة أصغر أو استخدم .NET.', token, 'unsupported');
  }
  return { coefficient, scale };
}

function parseDecimal(text, token) {
  const parts = /^(-?)(\d*)(?:\.(\d+))?$/.exec(text);
  if (!parts || !(parts[2] || parts[3])) throw new CSharpError('اكتب قيمة decimal عشرية بسيطة متبوعة بـ m، مثل 0.25m.', token, 'unsupported');
  const fraction = parts[3] || '';
  return decimal(BigInt(parts[1] + (parts[2] || '0') + fraction), fraction.length, token);
}

function decimalText({ coefficient, scale }) {
  const digits = String(magnitude(coefficient)).padStart(scale + 1, '0');
  const sign = coefficient < 0n ? '-' : '';
  return sign + (scale ? digits.slice(0, -scale) + '.' + digits.slice(-scale) : digits);
}

function doubleText(value) {
  if (Object.is(value, -0)) return '-0';
  const absolute = Math.abs(value);
  const exponential = value !== 0 && Number.isFinite(value) && (absolute < 1e-4 || absolute >= 1e17);
  return exponential ? value.toExponential().replace(/e([+-])(\d+)/, (_, sign, exponent) => 'E' + sign + exponent.padStart(2, '0')) : String(value);
}

function display(value, type) {
  if (value === null) return '';
  if (type === 'decimal') return decimalText(value);
  if (type === 'double') return doubleText(value);
  if (arrayType(type)) return 'System.' + ARRAY_TYPES[type.slice(0, -2)] + '[]';
  return typeof value === 'boolean' ? value ? 'True' : 'False' : String(value);
}

const ARRAY_TYPES = {int:'Int32', double:'Double', decimal:'Decimal', bool:'Boolean', string:'String', 'string?':'String'};

function traceValue(value, type) {
  if (arrayType(type)) return value.map(item => traceValue(item, type.slice(0, -2)));
  return type === 'decimal' ? decimalText(value) : value;
}

function boundedInt(value, token) {
  if (!Number.isSafeInteger(value) || value < -2147483648 || value > 2147483647) {
    throw new CSharpError('الناتج خارج نطاق الحساب المدعوم بالمحاكي. جرّب أعدادًا أصغر.', token, 'unsupported');
  }
  return value === 0 ? 0 : value;
}

function convertNumber(value, from, to, token) {
  if (from === to) return value;
  if (to === 'decimal') return decimal(BigInt(value), 0, token);
  if (to === 'int') {
    const truncated = from === 'decimal' ? Number(value.coefficient / scaleBy(1n, value.scale)) : Math.trunc(value);
    return boundedInt(truncated, token);
  }
  return value;
}

function compareValues(operator, left, right) {
  switch (operator) {
    case '==': return left === right;
    case '!=': return left !== right;
    case '>': return left > right;
    case '>=': return left >= right;
    case '<': return left < right;
    case '<=': return left <= right;
  }
}

function binaryValue(node, left, right) {
  const { op: operator, token, valueType } = node;
  const leftType = node.left.valueType, rightType = node.right.valueType;
  if (operator === '+' && valueType === 'string') {
    const a = display(left, leftType), b = display(right, rightType);
    if (a.length + b.length > LIMITS.output) throw new CSharpError('قيمة النص أكبر من حدود المحاكي. استخدم نصًا أقصر.', token, 'limit');
    return a + b;
  }
  if (promoteNumbers(leftType, rightType) === 'decimal') {
    const a = convertNumber(left, leftType, 'decimal', token), b = convertNumber(right, rightType, 'decimal', token);
    if (operator === '*') return decimal(a.coefficient * b.coefficient, a.scale + b.scale, token);
    const scale = Math.max(a.scale, b.scale);
    const x = scaleBy(a.coefficient, scale - a.scale), y = scaleBy(b.coefficient, scale - b.scale);
    if (COMPARISONS.has(operator)) return compareValues(operator, x, y);
    if (operator === '+') return decimal(x + y, scale, token);
    if (operator === '-') return decimal(x - y, scale, token);
    if (y === 0n) throw new CSharpError('لا يمكن حساب باقي القسمة على صفر.', token, 'runtime');
    const remainder = x % y;
    if (remainder === x) return a;
    return decimal(remainder, scale, token);
  }
  if (COMPARISONS.has(operator)) return compareValues(operator, left, right);
  const intOperation = valueType === 'int';
  if (intOperation && (operator === '/' || operator === '%') && right === 0) {
    throw new CSharpError('لا يمكن قسمة int على صفر. غيّر المقسوم عليه.', token, 'runtime');
  }
  let value;
  switch (operator) {
    case '+': value = left + right; break;
    case '-': value = left - right; break;
    case '*': value = left * right; break;
    case '/': value = intOperation ? Math.trunc(left / right) : left / right; break;
    case '%': value = left % right; break;
  }
  return intOperation ? boundedInt(value, token) : value;
}

function parseInputInt(input) {
  if (input === null) return { value: 0, valid: false };
  const match = /^[\x09-\x0d ]*([+-]?[0-9]+)[\x09-\x0d ]*$/.exec(input);
  const number = match ? Number(match[1]) : NaN;
  const valid = Number.isInteger(number) && number >= -2147483648 && number <= 2147483647;
  return { value: valid ? number || 0 : 0, valid };
}

function evaluateExpression(root, variables, source, readLine) {
  const names = new Set();
  const logic = [];
  const consumed = [];
  let comparison = null, calculation = null, binding = null;
  const operand = (node, value) => ({ source: source.slice(node.start, node.end), value });
  const format = (node, value) => TEXT_TYPES.has(node.valueType) ? JSON.stringify(value) : display(value, node.valueType);

  function evaluate(node) {
    if (node.kind === 'literal') return node.value;
    if (node.kind === 'array') {
      const element = node.type.slice(0, -2);
      return node.items.map(item => convertNumber(evaluate(item), item.valueType, element, item.token));
    }
    if (node.kind === 'read-line') {
      const line = readLine();
      consumed.push(line);
      return line.value;
    }
    if (node.kind === 'try-parse') {
      const input = evaluate(node.expression);
      const { value, valid } = parseInputInt(input);
      binding = { name: node.outName, value };
      calculation = {
        left: format(node.expression, input), operator: node.op,
        right: node.outName + ' = ' + value, result: display(valid), type: 'bool'
      };
      return valid;
    }
    if (node.kind === 'variable') {
      names.add(node.name);
      return variables.get(node.name).value;
    }
    if (node.kind === 'cast' || node.kind === 'length') {
      const original = evaluate(node.expression);
      const result = node.kind === 'length' ? original.length : convertNumber(original, node.expression.valueType, node.target, node.token);
      if (node === root) calculation = {
        left: format(node.expression, original), operator: node.op, result: display(result, node.valueType), type: node.valueType
      };
      return result;
    }
    if (node.kind === 'unary') {
      const value = evaluate(node.expression);
      if (node.op !== '!') {
        if (node.valueType === 'decimal') return node.op === '-' ? { ...value, coefficient: -value.coefficient } : value;
        const signed = node.op === '-' ? -value : value;
        return node.valueType === 'int' ? boundedInt(signed, node.token) : signed;
      }
      const result = !value;
      logic.push({ operator: '!', right: operand(node.expression, value), result });
      return result;
    }

    const left = evaluate(node.left);
    if (node.op === '??') {
      const right = left === null ? evaluate(node.right) : undefined;
      const result = left ?? right;
      if (node === root) calculation = { left: format(node.left, left), operator: node.op,
        right: right === undefined ? 'لم يُحسب' : format(node.right, right), result: format(node, result), type: node.valueType };
      return result;
    }
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
    const result = binaryValue(node, left, right);
    if (node === root && COMPARISONS.has(node.op)) comparison = {
      left: traceValue(left, node.left.valueType), operator: node.op, right: traceValue(right, node.right.valueType), result,
      ...(node.left.valueType === 'decimal' && { leftType: 'decimal' }),
      ...(node.right.valueType === 'decimal' && { rightType: 'decimal' })
    };
    if (node === root && (node.op === '/' || node.valueType === 'decimal' || (node.op === '+' && node.valueType === 'string'))) calculation = {
      left: format(node.left, left), operator: node.op, right: format(node.right, right), result: format(node, result), type: node.valueType
    };
    return result;
  }

  const value = root ? evaluate(root) : '';
  return { value, reads: [...names], comparison, logic, ...(calculation && { calculation }),
    ...(consumed.length && { inputReads: consumed }), ...(binding && { binding }) };
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
    if (LOOP_KINDS.has(statement.kind)) {
      if (statement.initializer) result.push(statement.initializer);
      result.push(...allStatements([statement.body]));
      if (statement.update) result.push(statement.update);
    }
  }
  return result;
}

function exposedVariables(variables) {
  return Object.fromEntries([...variables].map(([name, { type, value }]) => [name, { type, value: traceValue(value, type) }]));
}

function inputValue(value, type, token) {
  if (arrayType(type) && Array.isArray(value) && value.length <= LIMITS.array) return value.map(item => inputValue(item, type.slice(0, -2), token));
  if (type === 'decimal' && typeof value === 'string') return parseDecimal(value, token);
  if ((type === 'int' && Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) ||
      (type === 'double' && Number.isFinite(value)) ||
      (TEXT_TYPES.has(type) && typeof value === 'string') || (type === 'string?' && value === null) ||
      (type === 'bool' && typeof value === 'boolean')) return value;
  throw new CSharpError('قيمة الاختبار لا تطابق نوع المدخل.', token, 'type');
}

export function runProgram(source,inputs={},stdin='') {
  const text = String(source).replace(/\r\n?/g, '\n');
  const statements = parseProgram(text), scopes = [new Map()], trace = [], skipped = new Set();
  const loops = [];
  const sourceLines = text.split('\n');
  if (typeof stdin !== 'string' || stdin.length > LIMITS.source) throw new CSharpError('اختصر مدخلات التشغيل إلى 16 ألف حرف أو أقل.', {}, 'limit');
  const inputLines = stdin.split(/\r\n?|\n/);
  if (inputLines.at(-1) === '') inputLines.pop();
  let nextInput = 0;
  const readLine = () => nextInput < inputLines.length
    ? { number: nextInput + 1, value: inputLines[nextInput++] }
    : { number: null, value: null };
  let output = '';
  const visible=()=>new Map(scopes.flatMap(scope=>[...scope]));
  const owner=name=>scopes.findLast(scope=>scope.has(name));
  const firstLine=s=>s.kind==='block'?(s.body[0]?.token.line||s.end.line):s.token.line;
  function snapshot(s, {loopPhase, ...details} = {}) {
    if (trace.length >= LIMITS.trace) {
      throw new CSharpError('توقف المحاكي عند حد الخطوات. افحص شرط الحلقة وتأكد إن العداد بيتغير وبيوصل للنهاية.', s.token, 'limit');
    }
    const frame = loops.at(-1);
    const loop = frame && {
      kind:frame.kind, iteration:frame.iteration, depth:loops.length,
      phase:loopPhase || (frame.phase === 'body' && s.kind === 'assign' && frame.control.has(s.name) ? 'update' : frame.phase)
    };
    trace.push({
      line:s.token.line, source:s.source, kind:s.kind, name:null, reads:[],
      variables:exposedVariables(visible()), output, skippedLines:[...skipped],
      ...(loop && {loop}), ...details
    });
  }
  function executeBody(body, nextLine = null) {
    for (const [i, statement] of body.entries()) {
      const jump = execute(statement, body[i + 1]?.token.line || nextLine);
      if (jump) return jump;
    }
  }
  function executeBlock(s, nextLine, loopBody = false) {
    scopes.push(new Map());
    let jump;
    try { jump = executeBody(s.body, loopBody ? nextLine : s.end.line); }
    finally { scopes.pop(); }
    if (!jump && !loopBody) snapshot({kind:'scope-exit',token:s.end,source:'}'},{
      nextLine, action:'يا كمبيوتر، انتهت الكتلة. أكمل من الأمر التالي، واحتفظ بتحديثات المتغيرات الخارجية.'
    });
    return jump;
  }
  function skipLines(start, end) {
    // Dim complete source lines. A line can contain both an executed and a
    // skipped statement when the learner uses compact brace formatting.
    const before = sourceLines[start.line - 1].slice(0, start.column - 1);
    const after = sourceLines[end.line - 1].slice(end.column - 1 + end.end - end.start);
    for (let line = start.line + Number(!!before.trim()); line <= end.line - Number(!!after.trim()); line++) skipped.add(line);
  }
  const jumpTo = (line, fallback) => line ? ' اذهب إلى السطر ' + line + '.' : ' ' + fallback;
  function executeLoop(s, nextLine) {
    const frame = {
      kind:s.kind, phase:'initialize', iteration:0, control:new Set(),
      continueLine:s.update?.token.line || s.token.line, exitLine:nextLine
    };
    const scope = new Map();
    loops.push(frame);
    scopes.push(scope);
    try {
      if (s.initializer) execute(s.initializer, s.token.line);
      const collection = s.collection && evaluateExpression(s.collection, visible(), text, readLine);
      for (;;) {
        for (const line of skipped) {
          if (line >= s.body.token.line && line <= s.body.end.line) skipped.delete(line);
        }
        const evaluation = collection
          ? {value:frame.iteration < collection.value.length, reads:collection.reads}
          : s.condition ? evaluateExpression(s.condition, visible(), text, readLine) : {value:true, reads:[]};
        frame.control = new Set(evaluation.reads);
        const passed = evaluation.value;
        if (passed) frame.iteration++;
        else skipLines(s.body.token, s.body.end);
        const target = passed ? (collection ? s.token.line : firstLine(s.body)) : nextLine;
        const action = collection
          ? passed ? 'يا كمبيوتر، باقي عنصر. اقرأ القيمة التالية.' : 'يا كمبيوتر، مفيش عناصر باقية. اخرج من الحلقة.' + jumpTo(target, 'انتهى التنفيذ.')
          : 'يا كمبيوتر، شرط ' + s.kind + ' أعطى ' + display(passed) + '. '
            + (passed ? 'نفّذ جسم الحلقة.' : 'اخرج من الحلقة.') + jumpTo(target, 'انتهى التنفيذ.');
        frame.phase = 'condition';
        snapshot(s, {...evaluation, kind:'loop-condition', source:s.header, nextLine:target, action});
        if (!passed) break;

        if (collection) {
          const {name, type} = s.iterator;
          const index = frame.iteration - 1;
          const value = collection.value[index];
          scope.set(name, {type, value});
          snapshot(s, {
            kind:'loop-bind', loopPhase:'bind', source:s.header, name, nextLine:firstLine(s.body),
            value:traceValue(value, type),
            action:'يا كمبيوتر، اقرأ قيمة العنصر رقم ' + frame.iteration + ' وضعها في ' + name + '.'
          });
        }
        frame.phase = 'body';
        const jump = s.body.kind === 'block'
          ? executeBlock(s.body, frame.continueLine, true)
          : execute(s.body, frame.continueLine);
        if (collection) scope.delete(s.iterator.name);
        if (jump === 'break') break;
        if (s.update) {
          frame.phase = 'update';
          execute(s.update, s.token.line);
        }
        snapshot({kind:'loop-jump',token:s.body.end,source:s.body.kind === 'block' ? '}' : s.body.source}, {
          loopPhase:'return', nextLine:s.token.line,
          action:'يا كمبيوتر، ارجع للسطر ' + s.token.line + (collection ? ' عشان تتحقق هل باقي عنصر.' : ' عشان تفحص الشرط من جديد.')
        });
      }
    } finally {
      scopes.pop();
      loops.pop();
    }
  }
  function execute(s, nextLine, clause = 'if') {
    if (s.kind === 'block') return executeBlock(s, nextLine);
    if (LOOP_KINDS.has(s.kind)) { executeLoop(s, nextLine); return; }
    if (s.kind === 'break' || s.kind === 'continue') {
      const frame = loops.at(-1);
      const exits = s.kind === 'break';
      const target = exits ? frame.exitLine : frame.continueLine;
      const action = exits ? 'يا كمبيوتر، اخرج من أقرب حلقة الآن.' : 'يا كمبيوتر، تجاوز بقية أوامر الدورة الحالية.';
      snapshot(s, {loopPhase:s.kind, nextLine:target, action:action + jumpTo(target, 'انتهى التنفيذ.')});
      return s.kind;
    }
    if (s.kind === 'if') {
      const evaluation = evaluateExpression(s.condition, visible(), text, readLine);
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
      if (chosen) return execute(chosen, nextLine, branch === 'else-if' ? 'else if' : 'if');
      return;
    }
    if(s.kind==='empty'){snapshot(s,{action:'يا كمبيوتر، هذه جملة فارغة؛ انتقل إلى الأمر التالي.'});return;}
    const variables = visible(), previous = variables.get(s.name)?.value;
    const expressionType = s.expression?.valueType;
    const type = s.type || variables.get(s.name)?.type || expressionType;
    const override = s.kind === 'declare' && s.expression.kind !== 'try-parse' && Object.hasOwn(inputs, s.name);
    const evaluation = override
      ? { value: inputValue(inputs[s.name], type, s.token), reads: [], comparison: null, logic: [] }
      : evaluateExpression(s.expression, variables, text, readLine);
    const value = !override && type !== expressionType ? convertNumber(evaluation.value, expressionType, type, s.token) : evaluation.value;
    const outputValue = display(value, type);
    if (s.kind === 'print') {
      output += outputValue + (s.method === 'WriteLine' ? '\n' : '');
    } else {
      const scope = s.kind === 'declare' ? scopes.at(-1) : owner(s.name);
      scope.set(s.name, { type, value });
      if (evaluation.binding) scope.set(evaluation.binding.name, { type: 'int', value: evaluation.binding.value });
    }
    if(output.length>LIMITS.output)throw new CSharpError('المخرجات أكبر من حدود المحاكي.',s.token,'limit');
    const action=s.kind==='print'?'يا كمبيوتر، اطبع القيمة الحالية'+(s.method==='WriteLine'?' ثم انتقل لسطر جديد.':' واترك موضع الكتابة في السطر نفسه.')
      :s.kind==='declare'?'يا كمبيوتر، أنشئ المتغير '+s.name+' من النوع '+s.type+' واحفظ فيه '+(value === null ? 'null' : outputValue)+'.'
      :'يا كمبيوتر، حدّث '+s.name+' من '+display(previous,type)+' إلى '+outputValue+'.';
    snapshot(s, { ...evaluation, name: s.name || null, nextLine, value: traceValue(value,type), previous: previous === undefined ? undefined : traceValue(previous,type), action });
  }
  executeBody(statements);return {output,trace,variables:exposedVariables(scopes[0]),statements};
}
export function checkChallenge(source,challenge,baselineOutput=null,stdin=challenge.stdin??'') {
  let result;try{result=runProgram(source,{},stdin);}catch(error){return {passed:false,message:error.message,error};}
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
  const loopReads = new Set(), loopJumps = new Set();
  let hasLoopEffect = false;
  let testedElseIf = false;
  const observe = trace => {
    for (const step of trace) {
      if (challenge.loop && step.loop?.kind === challenge.loop.kind && step.loop.depth >= (challenge.loop.depth ?? 1)) {
        if (step.kind === 'loop-condition') for (const name of step.reads) loopReads.add(name);
        if (step.kind === 'break' || step.kind === 'continue') loopJumps.add(step.kind);
        if (challenge.loop.effect === 'print' && step.kind === 'print') hasLoopEffect = true;
        if (step.kind === 'assign' && step.name === challenge.loop.effect && step.loop.phase !== 'initialize') hasLoopEffect = true;
      }
      if (step.kind !== 'condition') continue;
      for (const name of step.reads) conditionReads.add(name);
      if (step.clause === 'else if') testedElseIf = true;
    }
  };
  observe(result.trace);
  for (const example of challenge.cases || []) {
    try {
      const alternate = runProgram(source, example.inputs, example.stdin ?? stdin);
      if (alternate.output !== example.output) return fail('الناتج الحالي صحيح، لكن الحل لم ينجح بقيم أخرى. راجع المتغيرات والحد الفاصل.');
      observe(alternate.trace);
    } catch {
      return fail('لم تنجح إحدى حالات الاختبار. راجع الأنواع واعتماد القرار على المتغيرات.');
    }
  }
  if (challenge.elseIfRequired && !testedElseIf) return fail('استخدم else if لفحص شرط بديل عند تجاوز الشرط الأول.');
  for (const name of challenge.conditionReads || []) {
    if (!conditionReads.has(name)) return fail('اجعل قرار if يقرأ المتغير «' + name + '» بدل شرط ثابت.');
  }
  if (challenge.loop) {
    const {kind, depth = 1, reads = [], jumps = []} = challenge.loop;
    const label = depth > 1 ? 'حلقات ' + kind + ' متداخلة' : 'حلقة ' + kind;
    if (!hasLoopEffect) return fail('نفّذ التحديث أو الطباعة المطلوبة داخل ' + label + '.');
    for (const name of reads) if (!loopReads.has(name)) return fail('اقرأ قيمة «' + name + '» عند فحص ' + label + '.');
    for (const jump of jumps) if (!loopJumps.has(jump)) return fail('استخدم ' + jump + ' في مسار يمكن تنفيذه داخل ' + label + '.');
  }
  return {passed:true,result,message:'صحيح. نفّذت المطلوب وشاهدت أثره.'};
}
function containsOperator(node,op){return !!node&&(node.op===op||containsOperator(node.left,op)||containsOperator(node.right,op)||containsOperator(node.expression,op));}

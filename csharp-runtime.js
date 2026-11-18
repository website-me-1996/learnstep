// Bounded teaching interpreter for the authored C# lessons, not Roslyn/.NET.
// No eval, Function constructor, network execution, or string-to-JS translation.
import {
  collectionArity, describeCollection, collectionSignature, makeCollection, collectionCount,
  collectionIteration, collectionSnapshot, applyCollectionMethod, readCollectionIndex, writeCollectionIndex
} from './csharp-collections.js';

const LIMITS = { source:16000, tokens:2000, statements:160, output:16000, depth:40, trace:1000, array:64, calls:24, objects:64, fields:16 };
const NUMERIC_TYPES = new Set(['int', 'double', 'decimal']);
const TYPES = new Set([...NUMERIC_TYPES, 'string', 'bool', 'char']);
const TEXT_TYPES = new Set(['string', 'string?', 'null']);
const LOOP_KINDS = new Set(['while', 'for', 'foreach']);
const INCREMENTS = new Set(['++', '--']);
const ASSIGNMENTS = new Set(['=', '+=', '-=', '*=', '/=', '%=']);
const arrayRank = type => type?.endsWith('[,]') ? 2 : type?.endsWith('[]') ? 1 : 0;
const elementType = type => type.slice(0, -(arrayRank(type) + 1));
const COMPARISONS = new Set(['>','>=','<','<=','==','!=']);
const LOGICAL = new Set(['&&', '||']);
const BINARY_PRECEDENCE = {'??':1,'||':2,'&&':3,'==':4,'!=':4,'>':5,'>=':5,'<':5,'<=':5,'+':10,'-':10,'*':20,'/':20,'%':20};
const RESERVED = new Set(('abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while var').split(' '));
export const RUNTIME_LABEL = 'محاكي أساسيات C#';
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
    if(c==='"' || c==="'") {
      advance();let value='',closed=false;
      while(pos<source.length){
        const ch=advance();if(ch===c){closed=true;break;}
        if(ch==='\n'||ch==='\r')throw new CSharpError('أغلق علامات الاقتباس في السطر نفسه. للسطر الجديد استخدم \\n.',location);
        if(ch!=='\\'){value+=ch;continue;}
        const esc=advance(),escapes={n:'\n',r:'\r',t:'\t','"':'"',"'":"'",'\\':'\\','0':'\0'};
        if(!Object.hasOwn(escapes,esc))throw new CSharpError('صيغة الهروب هذه غير مدعومة في المحاكي. استخدم نصًا بسيطًا.',location,'unsupported');
        value+=escapes[esc];
      }
      if(!closed)throw new CSharpError('علامة إغلاق القيمة ' + c + ' ناقصة.',location);
      if(c==="'" && value.length!==1)throw new CSharpError('ضع وحدة UTF-16 واحدة بين علامتي الاقتباس المفردتين لقيمة char.',location,'type');
      add(c==='"'?'string':'char',value,location);continue;
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
  const classNames = new Map();
  for (const [index, token] of tokens.entries()) {
    if (token.kind === 'identifier' && token.value === 'class' && tokens[index + 1]?.kind === 'identifier') {
      classNames.set(tokens[index + 1].value, tokens[index + 2]?.kind === '<');
    }
  }
  let cursor=0,depth=0,nesting=0,count=0,genericParameter=null;
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
  const isType = name => TYPES.has(name) || classNames.has(name) || collectionArity(name) > 0 || name === genericParameter;
  function typeName(allowVoid = false, allowArray = true, typeDepth = 0) {
    const token = expect('identifier');
    if (!isType(token.value) && !(allowVoid && token.value === 'void')) {
      throw new CSharpError('اختَر نوعًا مدعومًا مثل int أو string.', token, 'type');
    }
    if (typeDepth >= LIMITS.depth) throw new CSharpError('قلّل الأنواع العامة المتداخلة.', token, 'limit');
    let type = token.value;
    const arity = classNames.has(type) ? Number(classNames.get(type)) : collectionArity(type);
    if (arity) {
      expect('<');
      const argumentsList = [typeName(false, true, typeDepth + 1)];
      for (let index = 1; index < arity; index++) {
        expect(',');
        argumentsList.push(typeName(false, true, typeDepth + 1));
      }
      expect('>');
      type += '<' + argumentsList.join(',') + '>';
      if (!classNames.has(token.value) && !describeCollection(type)) {
        throw new CSharpError('جرّب المجموعة مع int أو string أو bool أو char في المحاكي.', token, 'unsupported');
      }
    }
    if ((type === 'string' || classNames.has(token.value) || collectionArity(token.value)) && peek().kind === '?') type += take().value;
    if (allowArray && TYPES.has(token.value) && peek().kind === '[') {
      take();
      const rank = peek().kind === ',' ? take().value : '';
      expect(']');
      type += '[' + rank + ']';
    }
    return type;
  }
  function callable(kind, name, type, token) {
    expect('(');
    const parameters = [];
    while (peek().kind !== ')') {
      const type = typeName(), parameter = nameToken();
      parameters.push({type, name:parameter.value, token:parameter});
      if (peek().kind !== ',') break;
      take();
      if (peek().kind === ')') throw new CSharpError('أضف معاملًا بعد الفاصلة أو احذفها.', peek());
    }
    const close = expect(')');
    if (peek().kind !== '{') throw new CSharpError('اكتب جسم الدالة بين { و }.', peek());
    const body = statement();
    return {kind, name, type, parameters, token, header:text.slice(token.start, close.end), body, end:body.end};
  }
  function classDefinition() {
    if (peek().value === 'public') take();
    const token = expect('identifier', 'class');
    const name = nameToken().value;
    if (peek().kind === '<') {
      take();
      genericParameter = nameToken().value;
      expect('>');
    }
    expect('{');
    const fields = new Map(), methods = new Map();
    let creator = null;
    while (peek().kind !== '}') {
      const member = expect('identifier', 'public');
      if (peek().value === name && tokens[cursor + 1]?.kind === '(') {
        take();
        if (creator) throw new CSharpError('استخدم منشئًا واحدًا في هذا المثال.', member, 'unsupported');
        creator = callable('constructor', name, 'void', member);
        continue;
      }
      const type = typeName(true);
      const field = nameToken();
      if (fields.has(field.value) || methods.has(field.value) || field.value === name) {
        throw new CSharpError('اختَر اسمًا مختلفًا لكل عضو في الصنف.', field, 'name');
      }
      if (peek().kind === '(') {
        methods.set(field.value, callable('method', field.value, type, member));
      } else {
        if (type === 'void') throw new CSharpError('ضع نوع قيمة للحقل.', field, 'type');
        if (fields.size >= LIMITS.fields) throw new CSharpError('اختصر الحقول في الصنف التعليمي.', field, 'limit');
        const initializer = peek().kind === '=' ? (take(), expression()) : null;
        expect(';');
        fields.set(field.value, {name:field.value, type, expression:initializer, token:field});
      }
    }
    const end = expect('}');
    const parameter = genericParameter;
    genericParameter = null;
    return {kind:'class', name, parameter, fields, methods, creator, token, end};
  }
  function declaration(allowFunction = false) {
    const token = peek();
    const type = typeName(allowFunction);
    const name = nameToken().value;
    if (peek().kind === '(') {
      if (!allowFunction) throw new CSharpError('عرّف الدالة في مستوى البرنامج خارج جسم الحلقة أو الشرط.', token, 'unsupported');
      return callable('function', name, type, token);
    }
    if (type === 'void') throw new CSharpError('استخدم void في تعريف دالة لا تعيد قيمة.', token, 'type');
    expect('=');
    let initializer;
    const rank = arrayRank(type);
    if (rank && peek().kind === '{') {
      const start = peek();
      const items = rank === 1 ? braceItems(expression) : braceItems(() => braceItems(expression));
      if (rank === 2) matrixShape(items, start);
      const end = tokens[cursor - 1];
      initializer = {kind:'array', type, items, token:start, start:start.start, end:end.end};
    } else {
      initializer = expression();
    }
    return {kind:'declare', name, type, expression:initializer, token};
  }
  function braceItems(read) {
    expect('{');
    const items = [];
    while (peek().kind !== '}') {
      if (items.length >= LIMITS.array) throw new CSharpError('اختر مصفوفة تعليمية من 64 عنصرًا أو أقل.', peek(), 'limit');
      items.push(read());
      if (peek().kind !== ',') break;
      take();
    }
    expect('}');
    return items;
  }
  function bracketExpressions() {
    expect('[');
    const items = [expression()];
    if (peek().kind === ',') { take(); items.push(expression()); }
    expect(']');
    return items;
  }
  function indexAccess(receiver) {
    const token = peek();
    const indices = bracketExpressions();
    return {kind:'index', op:'[]', expression:receiver, indices, token, start:receiver.start, end:tokens[cursor - 1].end};
  }
  function call(token) {
    expect('(');
    const args = [];
    if (peek().kind !== ')') {
      do {
        args.push(expression());
        if (peek().kind !== ',') break;
        take();
      } while (true);
    }
    const close = expect(')');
    return {kind:'call', name:token.value, op:token.value, args, token, start:token.start, end:close.end};
  }
  function postfix(node) {
    while (peek().kind === '.' || peek().kind === '[') {
      if (peek().kind === '[') {
        node = indexAccess(node);
        continue;
      }
      take();
      const member = nameToken();
      if (peek().kind === '(') {
        const invocation = call(member);
        node = {...invocation, kind:'member-call', expression:node, start:node.start};
      } else {
        node = {kind:'member', name:member.value, op:'.' + member.value, expression:node,
          token:member, start:node.start, end:member.end};
      }
    }
    return node;
  }
  function assignment() {
    const start = peek();
    const prefix = INCREMENTS.has(start.kind);
    const operator = prefix ? take() : null;
    const name = peek().value === 'this' ? take() : nameToken();
    const variable = {kind:'variable', name:name.value, token:name, start:name.start, end:name.end};
    const target = postfix(variable);
    if (target.kind === 'member-call' && !prefix) return {kind:'invoke', expression:target, token:start};
    if (target.kind === 'index' || target.kind === 'member') {
      if (prefix || peek().kind !== '=') throw new CSharpError('استخدم = لإسناد قيمة إلى خانة أو حقل.', peek(), 'unsupported');
      take();
      return {kind:target.kind === 'index' ? 'assign-index' : 'assign-member', name:name.value, target, expression:expression(), token:start};
    }
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
      left:variable,
      right, start:start.start, end:tokens[cursor - 1].end
    };
    return {kind:'assign', name:name.value, update:op.kind, expression:rhs, token:start};
  }
  function forPart(part) {
    if (peek().kind === closeForPart[part]) return null;
    const step = part === 'init' && isType(peek().value) ? declaration() : assignment();
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
    else if(t.kind==='string' || t.kind==='char')node={kind:'literal',type:t.kind,value:t.value,token:t};
    else if(t.value==='true'||t.value==='false')node={kind:'literal',type:'bool',value:t.value==='true',token:t};
    else if (t.value === 'null') node = {kind:'literal', type:'null', value:null, token:t};
    else if (t.value === 'new') {
      if (peek().value === 'int') {
        take();
        const indices = bracketExpressions();
        node = {kind:'new-array', type:indices.length === 1 ? 'int[]' : 'int[,]', indices, token:t};
      } else {
        const type = typeName(false, false);
        node = {...call(t), kind:'new-object', type, op:'new', token:t};
      }
    }
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
    else if (t.value === 'Array' && peek().kind === '.') {
      expect('.');
      const method = expect('identifier', 'IndexOf');
      node = {...call(method), kind:'array-search', op:'Array.IndexOf'};
    }
    else if(t.kind==='identifier'&&(!RESERVED.has(t.value)||t.value==='this'))node=peek().kind === '(' ? call(t) : {kind:'variable',name:t.value,token:t};
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
    node = postfix(node);
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
    } else if (start.value === 'return') {
      take();
      const result = peek().kind !== ';' ? expression() : null;
      end = expect(';');
      s = {kind:'return', expression:result, token:start};
    } else if (start.value === 'break' || start.value === 'continue') {
      take();
      end = expect(';');
      s = {kind:start.value, token:start};
    } else if(start.kind===';') {end=take();s={kind:'empty',token:start};}
    else {
      if(isType(start.value) || start.value === 'void' || start.value === 'static') {
        if(embedded)throw new CSharpError('ضع تصريح المتغير داخل كتلة { }.',start,'syntax');
        if (start.value === 'static') take();
        s = declaration(nesting === 1);
        if (start.value === 'static' && s.kind !== 'function') throw new CSharpError('استخدم static هنا قبل تعريف دالة.', start, 'unsupported');
      } else if(start.value==='Console'||start.value==='System') {
        take();if(start.value==='System'){expect('.');expect('identifier','Console');}
        expect('.');const method=expect('identifier');
        if(method.value!=='Write'&&method.value!=='WriteLine')throw new CSharpError('اسم أمر الطباعة حساس لحالة الحروف: Console.Write أو Console.WriteLine.',method,'name');
        expect('(');const argument=peek().kind===')'?null:expression();expect(')');
        if(!argument&&method.value==='Write')throw new CSharpError('Console.Write يحتاج قيمة لطباعتها.',method,'type');
        s={kind:'print',method:method.value,expression:argument,token:start};
      } else if (start.kind === 'identifier' && !RESERVED.has(start.value) && tokens[cursor + 1]?.kind === '(') {
        s = {kind:'invoke', expression:call(take()), token:start};
      } else if((start.kind==='identifier'&&(!RESERVED.has(start.value)||start.value==='this')) || INCREMENTS.has(start.kind)) {
        s = assignment();
      } else throw new CSharpError('هذا البناء خارج نطاق المحاكي. راجع الصيغ المتاحة في الدرس.',start,'unsupported');
      end = s.kind === 'function' ? s.body.end : expect(';');
    }
    s.end=end;s.source=text.slice(start.start,end.end);nesting--;return s;
  }
  const statements=[];
  // Using directives precede top-level statements, as in a C# console program.
  while (peek().value === 'using') {
    take();
    expect('identifier','System');
    if (peek().kind === '.') {
      take(); expect('identifier','Collections'); expect('.'); expect('identifier','Generic');
    }
    expect(';');
  }
  while (peek().kind !== 'eof' && peek().value !== 'class' && peek().value !== 'public') statements.push(statement());
  while (peek().kind !== 'eof') statements.push(classDefinition());
  if(!statements.length)throw new CSharpError('اكتب أمرًا صغيرًا أولًا، ثم شغّله.');
  validateTypes(statements);return statements;
}
function localFunctions(statements) {
  return new Map(statements.filter(s => s.kind === 'function').map(s => [s.name, s]));
}

function classDefinitions(statements) {
  const classes = new Map();
  for (const declaration of statements.filter(s => s.kind === 'class')) {
    if (classes.has(declaration.name)) throw new CSharpError('الصنف «' + declaration.name + '» معرّف بالفعل.', declaration.token, 'name');
    classes.set(declaration.name, declaration);
  }
  return classes;
}

const nonNullable = type => type?.endsWith('?') ? type.slice(0, -1) : type;
const className = type => nonNullable(type)?.split('<', 1)[0];
const selfType = definition => definition.name + (definition.parameter ? '<' + definition.parameter + '>' : '');

function closedType(type, definition, owner) {
  if (!type || !definition?.parameter) return type;
  const argument = nonNullable(owner).slice(definition.name.length + 1, -1);
  // A parameter may be the entire type, or an argument in e.g. Box<T>.
  return type.replace(/[^<>,[\]?]+/g, name => name === definition.parameter ? argument : name);
}

function guaranteesReturn(s) {
  if (s.kind === 'return') return true;
  if (s.kind === 'block') return s.body.some(guaranteesReturn);
  return s.kind === 'if' && !!s.alternate && guaranteesReturn(s.consequent) && guaranteesReturn(s.alternate);
}

function matrixShape(rows, token) {
  const columns = rows[0]?.length ?? 0;
  if (rows.some(row => !Array.isArray(row) || row.length !== columns)) {
    throw new CSharpError('اكتب نفس عدد الأعمدة في كل صف من المصفوفة الثنائية.', token, 'type');
  }
  checkArraySize([rows.length, columns], token);
  return columns;
}

function checkArraySize(sizes, token) {
  if (sizes.some(size => size < 0)) throw new CSharpError('اكتب طولًا يساوي صفرًا أو أكبر.', token, 'runtime');
  if (sizes.some(size => size > LIMITS.array) || sizes.reduce((total, size) => total * size, 1) > LIMITS.array) {
    throw new CSharpError('اختر مصفوفة تعليمية من 64 عنصرًا أو أقل.', token, 'limit');
  }
}

function validateTypes(statements) {
  const scopes=[];
  const functions = localFunctions(statements);
  const classes = classDefinitions(statements);
  let loopDepth = 0;
  let currentFunction = null;
  let insideClass = false;
  const lookup=name=>{for(let i=scopes.length-1;i>=0;i--)if(scopes[i].available.has(name))return scopes[i].available.get(name);};
  const classFor = type => classes.get(className(type));
  const collectionFor = type => classFor(type) ? null : describeCollection(type);
  const isReference = type => classFor(type) || collectionFor(type);
  function canAssign(type, target) {
    return type === target || (type === 'int' && NUMERIC_TYPES.has(target)) ||
      (type === 'string' && target === 'string?') ||
      (type === 'null' && (target === 'string?' || isReference(target))) ||
      (isReference(type) && nonNullable(type) === nonNullable(target));
  }
  function implicitField(name, token) {
    const receiver = lookup('this');
    if (!classFor(receiver)?.fields.has(name)) return null;
    return {kind:'member', name, token, op:'.' + name, start:token.start, end:token.end,
      expression:{kind:'variable', name:'this', token, start:token.start, end:token.end}};
  }
  function verifyArguments(node, parameters, definition, owner) {
    if (parameters.length !== node.args.length) throw new CSharpError('مرّر العدد المطلوب من القيم إلى ' + node.name + '.', node.token, 'type');
    for (const [index, arg] of node.args.entries()) {
      const parameter = parameters[index];
      if (!canAssign(infer(arg), closedType(parameter.type, definition, owner))) {
        throw new CSharpError('راجع نوع القيمة الممررة للمعامل «' + parameter.name + '».', arg.token, 'type');
      }
    }
  }
  function inferCall(node, allowVoid = false) {
    if (node.expression?.kind === 'variable' && !lookup(node.expression.name) && !implicitField(node.expression.name, node.expression.token)) {
      throw new CSharpError('عرّف الكائن قبل استدعاء طريقة منه.', node.expression.token);
    }
    const owner = node.expression && infer(node.expression);
    if (arrayRank(owner) && node.name === 'GetLength' && node.args.length === 1) {
      if (infer(node.args[0]) !== 'int') throw new CSharpError('استخدم رقم بُعد من النوع int.', node.token, 'type');
      node.kind = 'dimension';
      node.op = '.GetLength';
      node.indices = node.args;
      return 'int';
    }
    const definition = classFor(owner);
    const collection = collectionFor(owner);
    if (collection) {
      const signature = collectionSignature(collection, node.name);
      if (!signature) throw new CSharpError('طريقة ' + node.name + ' غير مدعومة لهذه المجموعة.', node.token, 'name');
      verifyArguments(node, signature.argumentTypes.map((type, index) => ({type, name:String(index + 1)})));
      if (signature.resultType === 'void' && !allowVoid) throw new CSharpError('استدعِ هذه الطريقة في أمر مستقل.', node.token, 'type');
      node.kind = 'collection-method';
      return signature.resultType;
    }
    const method = owner ? definition?.methods.get(node.name) : !insideClass && !lookup(node.name) && functions.get(node.name);
    if (!method) throw new CSharpError('الدالة «' + node.name + '» غير معرّفة هنا.', node.token, 'name');
    verifyArguments(node, method.parameters, definition, owner);
    const result = closedType(method.type, definition, owner);
    if (result === 'void' && !allowVoid) throw new CSharpError('استدعِ دالة void في سطر مستقل.', node.token, 'type');
    return result;
  }
  function infer(node,allowMin=false,allowTryParse=false) {
    node.valueType = inferType(node, allowMin, allowTryParse);
    return node.valueType;
  }
  function verifyIndices(node) {
    for (const index of node.indices) {
      if (infer(index) !== 'int') throw new CSharpError('استخدم فهرسًا أو طولًا من النوع int.', index.token, 'type');
    }
  }
  function inferType(node,allowMin,allowTryParse) {
    if(node.kind==='literal'){
      if(node.type==='int'&&(!Number.isSafeInteger(node.value)||node.value>(allowMin?2147483648:2147483647)))throw new CSharpError('هذا العدد خارج نطاق int المدعوم هنا.',node.token,'unsupported');
      if (node.type === 'double' && !Number.isFinite(node.value)) throw new CSharpError('هذا العدد المكتوب خارج نطاق double.', node.token, 'unsupported');
      return node.type;
    }
    if (node.kind === 'read-line') return 'string?';
    if (node.kind === 'call' || node.kind === 'member-call') return inferCall(node);
    if (node.kind === 'array-search') {
      if (node.args.length !== 2 || infer(node.args[0]) !== 'int[]' || infer(node.args[1]) !== 'int') {
        throw new CSharpError('مرّر مصفوفة int[] وقيمة int إلى Array.IndexOf في هذا المسار.', node.token, 'type');
      }
      return 'int';
    }
    if (node.kind === 'new-object') {
      const definition = classFor(node.type);
      const collection = collectionFor(node.type);
      if ((!definition && !collection) || node.type.endsWith('?')) throw new CSharpError('استخدم new متبوعة باسم صنف صالح للإنشاء.', node.token, 'type');
      node.name = definition?.name ?? collection.name;
      verifyArguments(node, definition?.creator?.parameters ?? [], definition, node.type);
      return node.type;
    }
    if (node.kind === 'array') {
      const element = elementType(node.type);
      const items = arrayRank(node.type) === 1 ? node.items : node.items.flat();
      for (const item of items) {
        if (!canAssign(infer(item), element)) throw new CSharpError('استخدم عناصر من نوع ' + element + ' في المصفوفة.', item.token, 'type');
      }
      return node.type;
    }
    if (node.kind === 'new-array') {
      verifyIndices(node);
      return node.type;
    }
    if (node.kind === 'try-parse') {
      if (!allowTryParse) throw new CSharpError('في هذا الدرس خزّن نجاح TryParse في متغير bool مستقل، ثم افحصه.', node.token, 'unsupported');
      if (!TEXT_TYPES.has(infer(node.expression))) throw new CSharpError('اعطِ TryParse قيمة نصية واسم نتيجة out من النوع int.', node.token, 'type');
      return 'bool';
    }
    if(node.kind==='variable'){
      const type = lookup(node.name);
      if (type) return type;
      node.member = implicitField(node.name, node.token);
      if (node.member) return infer(node.member);
      throw new CSharpError('المتغير «'+node.name+'» غير معرّف قبل استخدامه. راجع الاسم وحالة الحروف.',node.token,'name');
    }
    if (node.kind === 'member') {
      const type = infer(node.expression);
      if (node.name === 'Length' && ((TEXT_TYPES.has(type) && type !== 'null') || arrayRank(type))) {
        node.kind = 'length';
        return 'int';
      }
      if (node.name === 'Count' && collectionFor(type)) {
        node.kind = 'collection-count';
        return 'int';
      }
      const definition = classFor(type), field = definition?.fields.get(node.name);
      if (!definition && node.name === 'Length') throw new CSharpError('استخدم Length مع نص أو مصفوفة.', node.token, 'type');
      if (!field) throw new CSharpError('الحقل «' + node.name + '» غير معرّف للنوع ' + type + '.', node.token, 'name');
      return closedType(field.type, definition, type);
    }
    if (node.kind === 'index') {
      const type = infer(node.expression);
      const collection = collectionFor(type);
      if (collection) {
        if (!collection.index || node.indices.length !== 1 || infer(node.indices[0]) !== collection.index[0]) {
          throw new CSharpError('راجع نوع الفهرس أو المفتاح المسموح لهذه المجموعة.', node.token, 'type');
        }
        return collection.index[1];
      }
      const rank = arrayRank(type);
      if (node.indices.length !== (rank || Number(TEXT_TYPES.has(type) && type !== 'null'))) {
        throw new CSharpError('استخدم فهرسًا واحدًا للنص أو المصفوفة الخطية، وفهرسي الصف والعمود للمصفوفة الثنائية.', node.token, 'type');
      }
      verifyIndices(node);
      return rank ? elementType(type) : 'char';
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
      const compatible = left === right || (TEXT_TYPES.has(left) && TEXT_TYPES.has(right)) ||
        (isReference(left) && canAssign(right, left)) || (isReference(right) && canAssign(left, right));
      const sameTypeEquality = (node.op === '==' || node.op === '!=') && compatible;
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
    enterScope(namesIn(body.filter(s => s.kind === 'declare' || s.kind === 'function')));
    body.forEach(visit);
    scopes.pop();
  }
  function visitLoop(s) {
    if (s.kind === 'foreach') {
      const {name, token, type} = s.iterator;
      const collection = infer(s.collection);
      if (collection !== type + '[]' && collectionFor(collection)?.iteratorType !== type) {
        throw new CSharpError('اختر عناصر من النوع ' + type + ' في المصفوفة أو المجموعة.', s.collection.token, 'type');
      }
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
    if (s.kind === 'function' || s.kind === 'class') return;
    if (s.kind === 'invoke') {
      s.expression.valueType = inferCall(s.expression, true);
      return;
    }
    if (s.kind === 'return') {
      if (!currentFunction) throw new CSharpError('اكتب return داخل جسم الدالة.', s.token);
      const type = s.expression ? infer(s.expression) : 'void';
      if (!canAssign(type, currentFunction.type)) throw new CSharpError('أعد قيمة من نوع ' + currentFunction.type + ' في هذه الدالة.', s.token, 'type');
      return;
    }
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
    if (s.kind === 'assign' && !lookup(s.name)) {
      const field = implicitField(s.name, s.token);
      if (field) {
        if (s.update !== '=') throw new CSharpError('استخدم إسنادًا بسيطًا لتحديث الحقل.', s.token, 'unsupported');
        s.kind = 'assign-member';
        s.target = field;
        s.name = 'this';
      }
    }
    if (s.kind === 'assign-member') {
      const type = infer(s.target);
      if (s.target.kind !== 'member') throw new CSharpError('اختر حقلًا يقبل الإسناد.', s.token, 'type');
      if (!canAssign(infer(s.expression), type)) throw new CSharpError('قيمة الحقل يجب أن توافق النوع ' + type + '.', s.token, 'type');
      return;
    }
    if (s.kind === 'assign-index') {
      const target = infer(s.target);
      if (TEXT_TYPES.has(s.target.expression.valueType)) throw new CSharpError('خانات النص للقراءة. أنشئ نصًا جديدًا إذا أردت تغيير الحرف.', s.token, 'type');
      if (!canAssign(infer(s.expression), target)) throw new CSharpError('ضع قيمة من النوع ' + target + ' في خانة المصفوفة.', s.token, 'type');
      return;
    }
    if(s.kind==='assign'&&(!lookup(s.name)||s.name==='this'))throw new CSharpError('عرّف المتغير «'+s.name+'» قبل إسناد قيمة له.',s.token,'name');
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
  function visitCallable(fn, definition) {
    currentFunction = fn;
    const names = namesIn(fn.parameters);
    if (definition) names.push(['this', fn.token]);
    enterScope(names);
    const scope = scopes.at(-1).available;
    for (const {name,type} of fn.parameters) scope.set(name, type);
    if (definition) scope.set('this', selfType(definition));
    visit(fn.body);
    scopes.pop();
    if (fn.type !== 'void' && !guaranteesReturn(fn.body)) throw new CSharpError('أضف return لقيمة في كل مسار من الدالة ' + fn.name + '.', fn.token, 'type');
  }
  for (const fn of functions.values()) visitCallable(fn);
  insideClass = true;
  for (const definition of classes.values()) {
    for (const field of definition.fields.values()) {
      if (field.expression && !canAssign(infer(field.expression), field.type)) throw new CSharpError('راجع نوع القيمة الأولية للحقل «' + field.name + '».', field.token, 'type');
    }
    if (definition.creator) visitCallable(definition.creator, definition);
    for (const method of definition.methods.values()) visitCallable(method, definition);
  }
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
  if (arrayRank(type) || isObject(value)) return clrName(isObject(value) ? value.type : type);
  return typeof value === 'boolean' ? value ? 'True' : 'False' : String(value);
}

const ARRAY_TYPES = {int:'Int32', double:'Double', decimal:'Decimal', bool:'Boolean', char:'Char', string:'String', 'string?':'String'};
const isObject = value => value?.fields instanceof Map;
const runtimeError = token => (message, code = 'runtime') => { throw new CSharpError(message, token, code); };

function clrName(type) {
  if (arrayRank(type)) {
    const element = elementType(type);
    return clrName(element) + type.slice(element.length);
  }
  const name = className(type);
  if (Object.hasOwn(ARRAY_TYPES, name)) return 'System.' + ARRAY_TYPES[name];
  const collection = describeCollection(type);
  if (collection) return 'System.Collections.Generic.' + name + '\x60' + collection.args.length + '[' + collection.args.map(clrName).join(',') + ']';
  const argument = nonNullable(type).slice(name.length + 1, -1);
  return argument ? name + '\x601[' + clrName(argument) + ']' : name;
}

function traceValue(value, type) {
  if (isObject(value)) return '#' + value.id;
  if (value === null) return null;
  const rank = arrayRank(type), element = rank && elementType(type);
  if (rank === 1) return value.map(item => traceValue(item, element));
  if (rank === 2) return value.rows.map(row => row.map(item => traceValue(item, element)));
  return type === 'decimal' ? decimalText(value) : value;
}

function snapshotText(value, type) {
  if (value === null) return 'null';
  if (isObject(value)) return '#' + value.id;
  return display(value, type);
}

function fieldSlot({receiver, node}) {
  if (receiver === null) throw new CSharpError('المرجع null. افحصه قبل الوصول إلى الحقل «' + node.name + '».', node.token, 'runtime');
  return receiver.fields.get(node.name);
}

function objectAccess({receiver, node}, slot, mode, previous) {
  return {id:receiver.id, field:node.name, mode, value:traceValue(slot.value, slot.type),
    ...(mode === 'write' && {previous:traceValue(previous, slot.type)})};
}

function lengths(value, type) {
  return arrayRank(type) === 2 ? [value.rows.length, value.columns] : [value.length];
}

function locateElement({receiver, indices, node}) {
  if (receiver === null) throw new CSharpError('القيمة null. افحصها قبل محاولة القراءة.', node.token, 'runtime');
  const sizes = lengths(receiver, node.expression.valueType);
  for (const [axis, index] of indices.entries()) {
    if (index < 0 || index >= sizes[axis]) {
      throw new CSharpError('الفهرس ' + index + ' خارج حدود البعد ' + axis + ' وطوله ' + sizes[axis] + '.', node.token, 'runtime');
    }
  }
  return indices.length === 1
    ? {items:receiver, index:indices[0]}
    : {items:receiver.rows[indices[0]], index:indices[1]};
}

function elementAccess({node, indices}, value, mode, previous) {
  return {
    name:node.expression.name ?? null,
    indices, mode, value:traceValue(value, node.valueType),
    ...(mode === 'write' && {previous:traceValue(previous, node.valueType)})
  };
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

function evaluateExpression(root, variables, {source, readLine, invokeCall, createObject, concreteType}, addressOnly = false) {
  const names = new Set();
  const logic = [];
  const consumed = [];
  const accesses = [];
  const fields = [];
  const collectionOps = [];
  let comparison = null, calculation = null, binding = null;
  const operand = (node, value) => ({ source: source.slice(node.start, node.end), value });
  const format = (node, value) => {
    const type = concreteType(node.valueType);
    return TEXT_TYPES.has(type) || type === 'char' ? JSON.stringify(value) : display(value, type);
  };

  function evaluate(node) {
    if (node.kind === 'literal') return node.value;
    if (node.kind === 'call') return invokeCall(node, node.args.map(evaluate));
    if (node.kind === 'array-search') {
      const [items, wanted] = node.args.map(evaluate);
      if (items === null) throw new CSharpError('مرّر مصفوفة موجودة للبحث.', node.token, 'runtime');
      return items.indexOf(wanted);
    }
    if (node.kind === 'collection-count' || node.kind === 'collection-method') {
      const collection = evaluate(node.expression);
      const args = node.args?.map(evaluate) ?? [];
      if (collection === null) throw new CSharpError('المرجع null. افحصه قبل استعمال المجموعة.', node.token, 'runtime');
      if (node.kind === 'collection-count') return collectionCount(collection.collection);
      const {value, previousCount, count} = applyCollectionMethod(collection.collection, node.name, args, LIMITS.array, runtimeError(node.token));
      collectionOps.push({id:collection.id, method:node.name, previousCount, count, value});
      return value;
    }
    if (node.kind === 'member-call') {
      const receiver = evaluate(node.expression);
      const args = node.args.map(evaluate);
      if (receiver === null) throw new CSharpError('المرجع null. افحصه قبل استدعاء الطريقة.', node.token, 'runtime');
      return invokeCall(node, args, receiver);
    }
    if (node.kind === 'new-object') return createObject(node, node.args.map(evaluate));
    if (node.kind === 'member') {
      const address = {receiver:evaluate(node.expression), node};
      if (addressOnly && node === root) return address;
      const slot = fieldSlot(address);
      fields.push(objectAccess(address, slot, 'read'));
      return slot.value;
    }
    if (node.kind === 'array') {
      const element = elementType(node.type);
      const convertRow = row => row.map(item => convertNumber(evaluate(item), item.valueType, element, item.token));
      if (arrayRank(node.type) === 1) return convertRow(node.items);
      return {rows:node.items.map(convertRow), columns:node.items[0]?.length ?? 0};
    }
    if (node.kind === 'new-array') {
      const sizes = node.indices.map(evaluate);
      checkArraySize(sizes, node.token);
      if (sizes.length === 1) return Array(sizes[0]).fill(0);
      const [rows, columns] = sizes;
      return {rows:Array.from({length:rows}, () => Array(columns).fill(0)), columns};
    }
    if (node.kind === 'index') {
      const address = {receiver:evaluate(node.expression), indices:node.indices.map(evaluate), node};
      if (addressOnly && node === root) return address;
      let value;
      if (address.receiver?.collection) {
        value = readCollectionIndex(address.receiver.collection, address.indices[0], runtimeError(node.token));
      } else {
        const {items, index} = locateElement(address);
        value = items[index];
      }
      accesses.push(elementAccess(address, value, 'read'));
      return value;
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
      if (node.member) return evaluate(node.member);
      names.add(node.name);
      return variables.get(node.name).value;
    }
    if (node.kind === 'cast' || node.kind === 'length' || node.kind === 'dimension') {
      const original = evaluate(node.expression);
      let result, axis;
      if (node.kind === 'cast') result = convertNumber(original, node.expression.valueType, node.target, node.token);
      else {
        if (original === null) throw new CSharpError('القيمة null. افحصها قبل قراءة الطول.', node.token, 'runtime');
        const sizes = lengths(original, node.expression.valueType);
        if (node.kind === 'length') result = sizes.reduce((total, size) => total * size, 1);
        else {
          axis = evaluate(node.indices[0]);
          if (axis < 0 || axis >= sizes.length) throw new CSharpError('البعد ' + axis + ' غير موجود في هذه المصفوفة.', node.token, 'runtime');
          result = sizes[axis];
        }
      }
      if (node === root) calculation = {
        left: format(node.expression, original), operator: node.op,
        ...(axis !== undefined && {right:String(axis)}), result: display(result, node.valueType), type: node.valueType
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
    ...(consumed.length && { inputReads: consumed }), ...(binding && { binding }),
    ...(accesses.length && {accesses}), ...(fields.length && {fields}), ...(collectionOps.length && {collectionOps}) };
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
    if (statement.kind === 'function') result.push(...allStatements(statement.body.body));
    if (statement.kind === 'class') {
      if (statement.creator) result.push(...allStatements(statement.creator.body.body));
      for (const method of statement.methods.values()) result.push(...allStatements(method.body.body));
    }
  }
  return result;
}

function exposedVariables(variables) {
  return Object.fromEntries([...variables].map(([name, { type, value }]) => [name, { type, value: traceValue(value, type) }]));
}

function exposedObjects(variables) {
  const reached = new Map();
  function visit(value) {
    if (!isObject(value) || reached.has(value.id)) return;
    const snapshot = {id:value.id, type:value.type, fields:exposedVariables(value.fields)};
    if (value.collection) snapshot.collection = {kind:value.collection.name, count:collectionCount(value.collection), items:collectionSnapshot(value.collection)};
    reached.set(value.id, snapshot);
    for (const field of value.fields.values()) visit(field.value);
  }
  for (const variable of variables.values()) visit(variable.value);
  return [...reached.values()].sort((left, right) => left.id - right.id);
}

function defaultValue(type, token) {
  if (type === 'bool') return false;
  if (type === 'char') return '\0';
  if (type === 'decimal') return decimal(0n, 0, token);
  if (NUMERIC_TYPES.has(type)) return 0;
  return null;
}

function inputValue(value, type, token) {
  const rank = arrayRank(type);
  if (rank && Array.isArray(value)) {
    const element = elementType(type);
    const readRow = row => row.map(item => inputValue(item, element, token));
    if (rank === 1) {
      checkArraySize([value.length], token);
      return readRow(value);
    }
    const columns = matrixShape(value, token);
    return {rows:value.map(readRow), columns};
  }
  if (type === 'decimal' && typeof value === 'string') return parseDecimal(value, token);
  if ((type === 'int' && Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) ||
      (type === 'double' && Number.isFinite(value)) ||
      (TEXT_TYPES.has(type) && typeof value === 'string') || (type === 'string?' && value === null) ||
      (type === 'bool' && typeof value === 'boolean') ||
      (type === 'char' && typeof value === 'string' && value.length === 1)) return value;
  throw new CSharpError('قيمة الاختبار لا تطابق نوع المدخل.', token, 'type');
}

export function runProgram(source,inputs={},stdin='') {
  const text = String(source).replace(/\r\n?/g, '\n');
  const statements = parseProgram(text), trace = [];
  const functions = localFunctions(statements), classes = classDefinitions(statements), calls = [];
  let scopes = [new Map()], loops = [], skipped = new Set();
  let allocatedObjects = 0;
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
  const concreteType = type => {
    const receiver = calls.at(-1)?.receiver;
    return receiver ? closedType(type, classes.get(className(receiver.type)), receiver.type) : type;
  };
  const evaluationContext = {source:text, readLine, invokeCall, createObject, concreteType};
  const evaluate = (expression, addressOnly = false) => evaluateExpression(expression, visible(), evaluationContext, addressOnly);
  function snapshot(s, {loopPhase, ...details} = {}) {
    if (trace.length >= LIMITS.trace) {
      throw new CSharpError('توقف المحاكي عند حد الخطوات. افحص شرط الحلقة وتأكد إن العداد بيتغير وبيوصل للنهاية.', s.token, 'limit');
    }
    const frame = loops.at(-1);
    const loop = frame && {
      kind:frame.kind, iteration:frame.iteration, depth:loops.length,
      phase:loopPhase || (frame.phase === 'body' && s.kind === 'assign' && frame.control.has(s.name) ? 'update' : frame.phase)
    };
    const callFrame = calls.at(-1), event = details.kind || s.kind;
    const call = callFrame && {
      name:callFrame.fn.name, depth:calls.length, callerLine:callFrame.callerLine,
      phase:event === 'call' ? 'enter' : event === 'return' ? 'return' : 'body',
      ...(callFrame.receiver && {objectId:callFrame.receiver.id, memberKind:callFrame.fn.kind})
    };
    const variables = visible(), objects = exposedObjects(variables);
    trace.push({
      line:s.token.line, source:s.source, kind:s.kind, name:null, reads:[],
      variables:exposedVariables(variables), output, skippedLines:[...skipped],
      ...(objects.length && {objects}),
      ...(loop && {loop}), ...(call && {call}), ...details
    });
  }
  function executeBody(body, nextLine = null) {
    const commands = body.filter(s => s.kind !== 'function' && s.kind !== 'class');
    for (const [i, statement] of commands.entries()) {
      const jump = execute(statement, commands[i + 1]?.token.line || nextLine);
      if (jump) return jump;
    }
  }
  function executeBlock(s, nextLine, skipExitSnapshot = false) {
    scopes.push(new Map());
    let jump;
    try { jump = executeBody(s.body, skipExitSnapshot ? nextLine : s.end.line); }
    finally { scopes.pop(); }
    if (!jump && !skipExitSnapshot) snapshot({kind:'scope-exit',token:s.end,source:'}'},{
      nextLine, action:'يا كمبيوتر، انتهت الكتلة. أكمل من الأمر التالي، واحتفظ بتحديثات المتغيرات الخارجية.'
    });
    return jump;
  }
  function createObject(node, args) {
    if (allocatedObjects >= LIMITS.objects) throw new CSharpError('وصل المحاكي إلى حد الكائنات في المثال. اختصر عدد مرات الإنشاء.', node.token, 'limit');
    const type = concreteType(node.type);
    const definition = classes.get(className(type));
    const object = {id:++allocatedObjects, type, fields:new Map()};
    if (!definition) {
      object.collection = makeCollection(describeCollection(type));
      return object;
    }
    for (const field of definition.fields.values()) {
      const fieldType = closedType(field.type, definition, type);
      const value = field.expression
        ? convertNumber(evaluate(field.expression).value, concreteType(field.expression.valueType), fieldType, field.token)
        : defaultValue(fieldType, field.token);
      object.fields.set(field.name, {type:fieldType, value});
    }
    if (definition.creator) invokeCall(node, args, object, true);
    return object;
  }
  function invokeCall(node, args, receiver = null, isConstructor = false) {
    const definition = receiver && classes.get(className(receiver.type));
    const fn = isConstructor ? definition.creator : receiver ? definition.methods.get(node.name) : functions.get(node.name);
    if (calls.length >= LIMITS.calls) throw new CSharpError('توقف المحاكي عند حد الاستدعاءات المتداخلة. تأكد أن الدالة تقترب من حالة التوقف.', node.token, 'limit');
    const caller = {scopes, loops, skipped};
    const scope = new Map(fn.parameters.map((parameter, index) => {
      const type = closedType(parameter.type, definition, receiver?.type);
      return [parameter.name, {type, value:convertNumber(args[index], concreteType(node.args[index].valueType), type, node.args[index].token)}];
    }));
    if (receiver) scope.set('this', {type:receiver.type, value:receiver});
    const callerLine = node.token.line;
    calls.push({fn, callerLine, receiver, type:closedType(fn.type, definition, receiver?.type)});
    scopes = [scope];
    loops = [];
    skipped = new Set(caller.skipped);
    for (const line of skipped) {
      if (line >= fn.token.line && line <= fn.end.line) skipped.delete(line);
    }
    try {
      const target = firstLine(fn.body);
      snapshot(fn, {
        kind:'call', source:fn.header, nextLine:target,
        action:'يا كمبيوتر، ادخل ' + (isConstructor ? 'المنشئ ' : receiver ? 'الطريقة ' : 'الدالة ') + fn.name + ' وابدأ من السطر ' + target + '.'
      });
      const result = executeBlock(fn.body, callerLine, true);
      if (result?.kind === 'return') return result.value;
      snapshot({kind:'return', token:fn.end, source:'}'}, {
        nextLine:callerLine, action:'يا كمبيوتر، انتهت الدالة. ارجع للسطر ' + callerLine + '.'
      });
    } finally {
      ({scopes, loops, skipped} = caller);
      calls.pop();
    }
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
      const collection = s.collection && evaluate(s.collection);
      if (collection?.value === null) throw new CSharpError('افحص المرجع قبل المرور على عناصره.', s.token, 'runtime');
      const versioned = collection?.value?.collection;
      const items = versioned ? collectionIteration(versioned) : collection?.value;
      const revision = versioned?.revision;
      for (;;) {
        if (versioned && versioned.revision !== revision) {
          throw new CSharpError('تغيّرت المجموعة أثناء foreach. أكمل المرور قبل تعديلها.', s.token, 'runtime');
        }
        for (const line of skipped) {
          if (line >= s.body.token.line && line <= s.body.end.line) skipped.delete(line);
        }
        const evaluation = collection
          ? {value:frame.iteration < items.length, reads:collection.reads}
          : s.condition ? evaluate(s.condition) : {value:true, reads:[]};
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
          const value = items[index];
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
        if (jump?.kind === 'return') return jump;
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
    if (LOOP_KINDS.has(s.kind)) return executeLoop(s, nextLine);
    if (s.kind === 'invoke') {
      const result = evaluate(s.expression);
      snapshot(s, {...result, nextLine, action:'يا كمبيوتر، أكمل بعد استدعاء ' + s.expression.name + '.'});
      return;
    }
    if (s.kind === 'return') {
      const {type, callerLine} = calls.at(-1);
      const result = evaluate(s.expression);
      const value = s.expression ? convertNumber(result.value, concreteType(s.expression.valueType), type, s.token) : undefined;
      const what = s.expression ? ' بقيمة ' + display(value, type) : '';
      snapshot(s, {...result, value:traceValue(value, type), nextLine:callerLine,
        action:'يا كمبيوتر، ارجع للسطر ' + callerLine + what + '.'});
      return {kind:'return', value};
    }
    if (s.kind === 'break' || s.kind === 'continue') {
      const frame = loops.at(-1);
      const exits = s.kind === 'break';
      const target = exits ? frame.exitLine : frame.continueLine;
      const action = exits ? 'يا كمبيوتر، اخرج من أقرب حلقة الآن.' : 'يا كمبيوتر، تجاوز بقية أوامر الدورة الحالية.';
      snapshot(s, {loopPhase:s.kind, nextLine:target, action:action + jumpTo(target, 'انتهى التنفيذ.')});
      return s.kind;
    }
    if (s.kind === 'if') {
      const evaluation = evaluate(s.condition);
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
    if (s.kind === 'assign-member') {
      const target = evaluate(s.target, true);
      const evaluation = evaluate(s.expression);
      const slot = fieldSlot(target.value);
      const previous = slot.value;
      slot.value = convertNumber(evaluation.value, concreteType(s.expression.valueType), slot.type, s.token);
      const write = objectAccess(target.value, slot, 'write', previous);
      snapshot(s, {...evaluation, name:s.name, nextLine, value:write.value, previous:write.previous,
        reads:[...new Set([...target.reads, ...evaluation.reads])],
        fields:[...(target.fields || []), ...(evaluation.fields || []), write],
        action:'يا كمبيوتر، حدّث الحقل ' + write.field + ' في الكائن #' + write.id + '.'});
      return;
    }
    if (s.kind === 'assign-index') {
      const target = evaluate(s.target, true);
      const evaluation = evaluate(s.expression);
      const address = target.value;
      const type = concreteType(s.target.valueType);
      const value = convertNumber(evaluation.value, concreteType(s.expression.valueType), type, s.token);
      let previous;
      if (address.receiver?.collection) {
        previous = writeCollectionIndex(address.receiver.collection, address.indices[0], value, LIMITS.array, runtimeError(s.token));
      } else {
        const {items, index} = locateElement(address);
        previous = items[index];
        items[index] = value;
      }
      const write = elementAccess(target.value, value, 'write', previous);
      const inputReads = [...(target.inputReads || []), ...(evaluation.inputReads || [])];
      snapshot(s, {...evaluation, name:s.name, nextLine, value:write.value, previous:write.previous,
        reads:[...new Set([...target.reads, ...evaluation.reads])],
        accesses:[...(target.accesses || []), ...(evaluation.accesses || []), write],
        ...(inputReads.length && {inputReads}),
        action:'يا كمبيوتر، حدّث ' + s.name + '[' + write.indices.join(', ') + '] واحفظ قيمة الخانة الجديدة.'});
      return;
    }
    const variables = visible(), previous = variables.get(s.name)?.value;
    const expressionType = concreteType(s.expression?.valueType);
    const type = concreteType(s.type) || variables.get(s.name)?.type || expressionType;
    const override = s.kind === 'declare' && s.expression.kind !== 'try-parse' && Object.hasOwn(inputs, s.name);
    const evaluation = override
      ? { value: inputValue(inputs[s.name], type, s.token), reads: [], comparison: null, logic: [] }
      : evaluateExpression(s.expression, variables, evaluationContext);
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
      :s.kind==='declare'?'يا كمبيوتر، أنشئ المتغير '+s.name+' من النوع '+s.type+' واحفظ فيه '+snapshotText(value,type)+'.'
      :'يا كمبيوتر، حدّث '+s.name+' من '+snapshotText(previous,type)+' إلى '+snapshotText(value,type)+'.';
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
  for (const [name, count] of Object.entries(challenge.calls || {})) {
    const reached = result.trace.reduce((total, step) => total + Number(step.kind === 'call' && step.call.name === name) +
      (step.collectionOps?.filter(operation => operation.method === name).length ?? 0), 0);
    if (reached < count) {
      return fail('استدعِ الدالة «' + name + '» في المهمة المطلوبة.');
    }
  }
  if (challenge.operation) {
    const matchesOperation = statements.some(statement => {
      if (challenge.operationIn && statement.name !== challenge.operationIn) return false;
      return statement.update === challenge.operation || containsOperator(statement.target, challenge.operation) ||
        containsOperator(statement.expression || statement.condition, challenge.operation);
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
  let reachedIndex = false;
  let reachedField = false;
  const observe = trace => {
    for (const step of trace) {
      const required = challenge.indexAccess;
      if (required && step.accesses?.some(access => access.name === required.name &&
        access.mode === required.mode && access.indices.length === required.rank)) reachedIndex = true;
      const field = challenge.fieldAccess;
      if (field && step.fields?.some(access => access.field === field.name && access.mode === field.mode)) reachedField = true;
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
  if (challenge.indexAccess && !reachedIndex) {
    const {name, mode} = challenge.indexAccess;
    return fail('نفّذ ' + (mode === 'write' ? 'تحديث خانة في «' : 'قراءة خانة من «') + name + '» باستخدام فهرسها.');
  }
  if (challenge.fieldAccess && !reachedField) {
    const {name, mode} = challenge.fieldAccess;
    return fail('نفّذ ' + (mode === 'write' ? 'الإسناد للحقل «' : 'القراءة من الحقل «') + name + '» في الكائن.');
  }
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
function containsOperator(node, op) {
  return !!node && (node.op === op || containsOperator(node.left, op) || containsOperator(node.right, op) ||
    containsOperator(node.expression, op) || node.args?.some(arg => containsOperator(arg, op)) ||
    node.indices?.some(index => containsOperator(index, op)));
}

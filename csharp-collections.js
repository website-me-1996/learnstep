// Bounded models of the collection operations used by the lessons.
// The native .NET suite checks these observable results against the library.
const primitive = new Set(['int', 'string', 'bool', 'char']);
const method = (argumentTypes, resultType, apply) => ({argumentTypes, resultType, apply});
const append = (state, [value], ensureRoom) => { ensureRoom(); state.items.push(value); };
const prepend = (state, [value], ensureRoom) => { ensureRoom(); state.items.unshift(value); };
const take = (operation, end) => method([], 0, (state, args, allowAdd, fail) => {
  if (!state.items.length) fail('المجموعة فارغة. افحص Count قبل أخذ عنصر.');
  return operation === 'read' ? state.items.at(end) : end === 0 ? state.items.shift() : state.items.pop();
});
const contains = (state, [value]) => state.items.includes(value);

function checkedIndex(items, index, fail) {
  if (index < 0 || index >= items.length) fail('الفهرس ' + index + ' خارج عدد العناصر ' + items.length + '.');
  return index;
}
function addKey(state, [key, value], ensureRoom, fail) {
  if (state.items.has(key)) fail('المفتاح موجود بالفعل. استخدم الفهرسة لتحديثه.');
  ensureRoom();
  state.items.set(key, value);
}
function markSeen(state, [value], ensureRoom) {
  if (state.items.has(value)) return false;
  ensureRoom();
  state.items.add(value);
  return true;
}

const models = new Map([
  ['List', {
    arity:1, create:() => [], index:['int',0], iteration:'forward',
    methods:{
      Add:method([0], 'void', append),
      Contains:method([0], 'bool', contains),
      RemoveAt:method(['int'], 'void', (state, [index], allowAdd, fail) => { state.items.splice(checkedIndex(state.items,index,fail),1); })
    }
  }],
  ['Stack', {
    arity:1, create:() => [], iteration:'reverse',
    methods:{ Push:method([0], 'void', append), Pop:take('remove', -1), Peek:take('read', -1) }
  }],
  ['Queue', {
    arity:1, create:() => [], iteration:'forward',
    methods:{ Enqueue:method([0], 'void', append), Dequeue:take('remove', 0), Peek:take('read', 0) }
  }],
  ['LinkedList', {
    arity:1, create:() => [], iteration:'forward',
    // The lessons use AddFirst/AddLast as statements. Node-returning expressions are outside this subset.
    methods:{
      AddFirst:method([0], 'void', prepend), AddLast:method([0], 'void', append),
      RemoveFirst:method([], 'void', (state, args, allowAdd, fail) => {
        if (!state.items.length) fail('القائمة فارغة. افحص Count قبل الحذف.');
        state.items.shift();
      })
    }
  }],
  ['Dictionary', {
    arity:2, create:() => new Map(), index:[0,1],
    methods:{ Add:method([0,1], 'void', addKey), ContainsKey:method([0], 'bool', (state, [key]) => state.items.has(key)) }
  }],
  ['HashSet', {
    arity:1, create:() => new Set(),
    methods:{ Add:method([0], 'bool', markSeen), Contains:method([0], 'bool', (state, [item]) => state.items.has(item)) }
  }]
]);

export const collectionArity = name => models.get(name)?.arity ?? 0;
export function describeCollection(type) {
  const match = /^(\w+)<([^<>]+)>\??$/.exec(type ?? '');
  if (!match) return null;
  const [, name, argumentsText] = match;
  const model = models.get(name), args = argumentsText.split(',');
  if (!model || model.arity !== args.length || !args.every(type => primitive.has(type))) return null;
  const replace = type => typeof type === 'number' ? args[type] : type;
  return {name, args, index:model.index?.map(replace), iteratorType:model.iteration && args[0]};
}
export function collectionSignature(description, name) {
  const operations = models.get(description.name).methods;
  if (!Object.hasOwn(operations, name)) return null;
  const {argumentTypes, resultType} = operations[name];
  const replace = type => typeof type === 'number' ? description.args[type] : type;
  return {argumentTypes:argumentTypes.map(replace), resultType:replace(resultType)};
}

export function makeCollection(description) {
  return {name:description.name, items:models.get(description.name).create(), revision:0};
}
export const collectionCount = state => state.items.size ?? state.items.length;
export const collectionSnapshot = state => [...state.items];
export function collectionIteration(state) {
  const items = collectionSnapshot(state);
  return models.get(state.name).iteration === 'reverse' ? items.reverse() : items;
}
function room(state, limit, fail) {
  if (collectionCount(state) >= limit) fail('وصلت المجموعة إلى حدود المحاكي التعليمي.', 'limit');
}

export function applyCollectionMethod(state, name, args, limit, fail) {
  const previousCount = collectionCount(state);
  const operation = models.get(state.name).methods[name];
  const value = operation.apply(state, args, () => room(state, limit, fail), fail);
  const count = collectionCount(state);
  if (count !== previousCount) state.revision++;
  return {value, previousCount, count};
}

export function readCollectionIndex(state, index, fail) {
  if (state.name === 'List') return state.items[checkedIndex(state.items,index,fail)];
  if (!state.items.has(index)) fail('المفتاح غير موجود. افحصه باستخدام ContainsKey أولًا.');
  return state.items.get(index);
}
export function writeCollectionIndex(state, index, value, limit, fail) {
  if (state.name === 'List') {
    const slot = checkedIndex(state.items,index,fail);
    const previous = state.items[slot];
    state.items[slot] = value;
    state.revision++;
    return previous;
  }
  const previous = state.items.get(index);
  if (!state.items.has(index)) {
    room(state,limit,fail);
    state.revision++;
  }
  state.items.set(index,value);
  return previous;
}

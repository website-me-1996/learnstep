const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { validateCurriculumData } = require("../validate-curriculum-json.cjs");
const root = path.resolve(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "csharp-lessons.json"), "utf8"));
const runtime = import(pathToFileURL(path.join(root, "csharp-runtime.js")));
const progress = import(pathToFileURL(path.join(root, "csharp-progress.js")));
const memoryStorage = () => { const entries = new Map(); return { getItem: k => entries.get(k) || null, setItem: (k, v) => entries.set(k, v) }; };

test("Library collections preserve order, counts and immutable snapshots", async () => {
  const {runProgram} = await runtime;
  const result = runProgram('using System.Collections.Generic; Queue<int> q=new Queue<int>(); Stack<int> s=new Stack<int>(); q.Enqueue(8); q.Enqueue(4); s.Push(8); s.Push(4); Console.WriteLine(q.Dequeue()); Console.WriteLine(s.Pop()); Console.WriteLine(q.Count);');
  assert.equal(result.output, "8\n4\n1\n");
  const removal = result.trace.find(step => step.collectionOps?.[0].method === "Dequeue");
  assert.deepEqual(removal.collectionOps[0], {id:1,method:"Dequeue",previousCount:2,count:1,value:8});
  assert.deepEqual(removal.objects[0].collection.items, [4]);
  const before = result.trace.filter(step => step.collectionOps?.[0].method === "Enqueue").at(-1);
  assert.deepEqual(before.objects[0].collection.items, [8,4]);
});

test("Collection keys, membership, indices and enumeration are checked", async () => {
  const {runProgram} = await runtime;
  const result = runProgram('Dictionary<string,int> stock=new Dictionary<string,int>(); stock.Add("أ",3); stock["أ"]=9;stock["ب"]=4;HashSet<int> ids=new HashSet<int>(); Console.WriteLine(stock["أ"]); Console.WriteLine(stock.Count); Console.WriteLine(ids.Add(5)); Console.WriteLine(ids.Add(5));');
  assert.equal(result.output, "9\n2\nTrue\nFalse\n");
  assert.throws(() => runProgram('Dictionary<int,int> d=new Dictionary<int,int>();d.Add(7,0);d.Add(7,1);'), {code:"runtime"});
  assert.throws(() => runProgram('Dictionary<int,int> d=new Dictionary<int,int>();Console.WriteLine(d[0]);'), {code:"runtime"});
  assert.throws(() => runProgram('Stack<int> s=new Stack<int>();Console.WriteLine(s.Pop());'), {code:"runtime"});
  assert.throws(() => runProgram('List<int> a=new List<int>();a.Add(2);foreach(int x in a){a[0]=4;}'), {code:"runtime"});
  assert.throws(() => runProgram('Queue<int> q=new Queue<int>();q.Enqueue("wrong");'), {code:"type"});
});

test("Object snapshots show a shared instance, a distinct instance and the previous field value", async () => {
  const {runProgram} = await runtime;
  const result = runProgram('Counter original=new Counter(3);Counter other=original;Counter separate=new Counter(7);other.Set(9);Console.WriteLine(original.Points);Console.WriteLine(separate.Points);class Counter {public int Points;public Counter(int n){Points=n;} public void Set(int newValue){this.Points=newValue;}}');
  assert.equal(result.output, "9\n7\n");
  assert.equal(result.variables.original.value, result.variables.other.value);
  assert.notEqual(result.variables.original.value, result.variables.separate.value);
  const enters = result.trace.filter(step => step.kind === "call");
  assert.deepEqual(enters.map(step => [step.call.memberKind,step.call.objectId]), [["constructor",1],["constructor",2],["method",1]]);
  assert.equal(enters.at(-1).objects[0].fields.Points.value, 3);
  assert.deepEqual(result.trace.find(step => step.fields?.at(-1)?.value === 9).fields.at(-1),
    {id:1,field:"Points",mode:"write",previous:3,value:9});
});

test("Class fields can link nullable references and the trace visits a cycle once", async () => {
  const {runProgram} = await runtime;
  const result = runProgram('Node a=new Node(1);Node b=new Node(2);a.Next=b;b.Next=a;Console.WriteLine(a.Next.Value);class Node{public int Value;public Node? Next;public Node(int n){Value=n;}}');
  assert.equal(result.output, "2\n");
  assert.deepEqual(result.trace.at(-1).objects.map(o => o.fields.Next.value), ["#2","#1"]);
  assert.throws(() => runProgram('Node? a=null;Console.WriteLine(a.Value);class Node{public int Value;}'), {code:"runtime"});
});

test("A generic class binds the field to the requested type and validates constructor arguments", async () => {
  const {runProgram} = await runtime;
  const definition = ' class Box<T>{public T Item;public Box(T initial){Item=initial;}public T Get(){return Item;}}';
  const result = runProgram('Box<decimal> a=new Box<decimal>(0.20m);Box<string> b=new Box<string>("نور");Console.WriteLine(a.Get());Console.WriteLine(b.Item);' + definition);
  assert.equal(result.output, "0.20\nنور\n");
  assert.deepEqual(result.trace.at(-1).objects.map(o => o.fields.Item.type), ["decimal","string"]);
  assert.throws(() => runProgram('Box<int> a=new Box<int>("wrong");' + definition), {code:"type"});
  assert.throws(() => runProgram('for(int i=0;i<65;i++){Node node=new Node();}class Node{}'), {code:"limit"});
});

test("Index access reports the selected cell and keeps earlier snapshots immutable", async () => {
  const {runProgram} = await runtime;
  const result = runProgram('int[,] a={{4,7,8},{2,5,6}};int[,] b=a;b[0,1]=9;Console.WriteLine(a[0,1]);Console.WriteLine(a[1,1]);');
  assert.equal(result.output, "9\n5\n");
  assert.deepEqual(result.trace[0].variables.a.value, [[4,7,8],[2,5,6]]);
  const [write, read] = result.trace.flatMap(step => step.accesses ?? []);
  assert.deepEqual(write, {name:"b",indices:[0,1],mode:"write",previous:7,value:9});
  assert.deepEqual(read, {name:"a",indices:[0,1],mode:"read",value:9});
  assert.equal(runProgram('int[,] a=new int[0,3];Console.WriteLine(a.GetLength(0));Console.WriteLine(a.GetLength(1));Console.WriteLine(a.Length);').output, "0\n3\n0\n");
});

test("Array rank and bounds are checked and string indexing returns a read-only UTF-16 code unit", async () => {
  const {runProgram} = await runtime;
  const text = runProgram('string s="🧮أ";char first=s[0];char letter=s[2];Console.WriteLine(letter);');
  assert.equal(text.variables.first.type, "char");
  assert.equal(text.variables.first.value.charCodeAt(0), "🧮".charCodeAt(0));
  assert.equal(text.output, "أ\n");
  assert.throws(() => runProgram('int[] a={2};Console.WriteLine(a[-1]);'), {code:"runtime"});
  assert.throws(() => runProgram('int[,] a={{1,2},{3,4}};Console.WriteLine(a[0,2]);'), {code:"runtime"});
  assert.throws(() => runProgram('int[,] a={{1,2},{3,4}};Console.WriteLine(a[1]);'), {code:"type"});
  assert.throws(() => runProgram('int[,] a={{1,2},{3}};'), {code:"type"});
  assert.throws(() => runProgram("string s=\"X\";s[0]='A';"), {code:"type"});
  assert.throws(() => runProgram('int[,] a=new int[9,8];'), {code:"limit"});
});

test("C# unit uses the canonical schema, stable prerequisites, and synchronized production content", () => {
  const result = validateCurriculumData(data);
  assert.equal(result.valid, true, result.errors.join("\n"));
  assert.equal(data.lessons.length, data.totalLessons);
  assert.equal(new Set(data.lessons.map(l => l.id)).size, data.lessons.length);
  for (const [index, lesson] of data.lessons.entries()) {
    assert.equal(lesson.order, index);
    assert.deepEqual(lesson.prerequisites, index ? [data.lessons[index - 1].id] : []);
    assert.ok(lesson.documentationUrl.startsWith("https://learn.microsoft.com/"));
    assert.equal(lesson.steps[0].code, undefined, "no code before the scene");
    assert.equal(lesson.steps.length, 8);
    for (const step of lesson.steps) { assert.ok(step.instruction.startsWith("يا كمبيوتر،")); assert.equal(step.hints.length, 4); }
  }
  const raw = fs.readFileSync(path.join(root, "csharp-lessons.json"));
  assert.deepEqual(fs.readFileSync(path.join(root, "public/csharp-lessons.json")), raw);
  const unitDir = path.join(root, "curriculum/csharp");
  const files = fs.readdirSync(unitDir).filter(name => /^unit_\d+_.+\.json$/.test(name)).sort();
  assert.equal(data.units.length, files.length);
  let start = 0;
  for (const [order, file] of files.entries()) {
    const unit = JSON.parse(fs.readFileSync(path.join(unitDir, file), "utf8"));
    const end = start + unit.lessons.length;
    assert.deepEqual(unit.lessons, data.lessons.slice(start, end));
    assert.deepEqual(data.units[order].lessonIds, unit.lessons.map(lesson => lesson.id));
    assert.equal(validateCurriculumData(unit).valid, true);
    start = end;
  }
  assert.equal(start, data.lessons.length);
});

for (const lesson of data.lessons) {
  test("Complete curriculum solutions: " + lesson.title, async t => {
    const { runProgram, checkChallenge } = await runtime;
    const traceStep = lesson.steps.find(s => s.id === "trace");
    assert.ok(runProgram(lesson.code, {}, traceStep.stdin ?? '').trace.length);
    const edit = lesson.steps.find(s => s.id === "edit");
    const baseline = edit.challenge.output;
    for (const step of lesson.steps.filter(s => s.challenge)) {
      await t.test(step.id + " accepts its solution and formatting alternatives", () => {
        const good = checkChallenge(step.solution, step.challenge, baseline);
        assert.equal(good.passed, true, good.message);
        const alternate = "using System;\n// حل بنفس السلوك\n" + step.solution.replaceAll(";", "; \n");
        assert.equal(checkChallenge(alternate, step.challenge, baseline).passed, true);
        const wrong = step.id === "experiment" ? edit.solution : 'Console.WriteLine("إجابة غير صحيحة");';
        const unchangedInput = step.id === "experiment" ? edit.challenge.stdin : undefined;
        assert.equal(checkChallenge(wrong, step.challenge, baseline, unchangedInput).passed, false);
      });
    }
    assert.equal(checkChallenge(lesson.bugRepair.brokenCode, lesson.steps.find(s => s.id === "repair").challenge).passed, false);
  });
}

test("Trace snapshots preserve time: assignments do not rewrite previous output or variable values", async () => {
  const { runProgram } = await runtime;
  const result = runProgram('int tickets = 2;\nConsole.WriteLine(tickets);\ntickets = 5;\nConsole.WriteLine(tickets);');
  assert.equal(result.output, "2\n5\n");
  assert.equal(result.trace[0].variables.tickets.value, 2);
  assert.equal(result.trace[1].output, "2\n");
  assert.equal(result.trace[2].previous, 2);
  assert.equal(result.trace[2].variables.tickets.value, 5);
  assert.equal(result.trace[3].line, 4);
});
test("Write preserves the cursor, WriteLine appends a newline, and comments do not execute", async () => {
  const { runProgram } = await runtime;
  assert.equal(runProgram('/* ignored */ Console.Write("A"); // ignored\nConsole.WriteLine(2); Console.WriteLine();').output, "A2\n\n");
  assert.equal(runProgram('Console.WriteLine("//text; /* still text */");').output, "//text; /* still text */\n");
});
test("Arithmetic uses precedence, parentheses, integer division toward zero, and C# boolean text", async () => {
  const { runProgram } = await runtime;
  assert.equal(runProgram('int n = (2 + 3) * 4; Console.WriteLine(n); Console.WriteLine(-13 / 5); Console.WriteLine(-5 % 4); bool ready = true; Console.WriteLine(ready);').output, "20\n-2\n-1\nTrue\n");
  assert.equal(runProgram('int n = -2147483648; Console.WriteLine(n);').output, "-2147483648\n");
  assert.equal(runProgram('Console.WriteLine("x=" + true); Console.WriteLine("a\\n\\\"b\\\"");').output, 'x=True\na\n"b"\n');
});
test("Division traces the operation type independently of the variable receiving the result", async () => {
  const { runProgram } = await runtime;
  const result = runProgram("int total = 5;\nint count = 2;\ndouble after = total / count;\ndouble before = (double)total / count;\nConsole.WriteLine(after);\nConsole.WriteLine(before);");
  assert.equal(result.output, "2\n2.5\n");
  assert.deepEqual(result.trace[2].calculation, { left: "5", operator: "/", right: "2", result: "2", type: "int" });
  assert.deepEqual(result.trace[3].calculation, { left: "5", operator: "/", right: "2", result: "2.5", type: "double" });
  assert.deepEqual(result.trace[2].variables.after, { type: "double", value: 2 });
  assert.equal(runProgram("Console.WriteLine(1e-6); Console.WriteLine(1e17); Console.WriteLine(-0.0);").output, "1E-06\n1E+17\n-0\n");
});
test("Explicit integer conversion truncates toward zero with a bounded destination", async () => {
  const { runProgram } = await runtime;
  const result = runProgram("double measured = -7.9;\nint whole = (int)measured;\nConsole.WriteLine(whole);");
  assert.equal(result.output, "-7\n");
  assert.deepEqual(result.trace[1].calculation, { left: "-7.9", operator: "(int)", result: "-7", type: "int" });
  assert.equal(runProgram("Console.WriteLine((int)2147483647.75); Console.WriteLine((int)-2147483648.75);").output, "2147483647\n-2147483648\n");
  assert.throws(() => runProgram("int whole = 5.9;"), { code: "type" });
  assert.throws(() => runProgram("double n = 2147483648.0; int whole = (int)n;"), { code: "unsupported" });
});
test("Decimal arithmetic preserves scale and does not mix decimal and double", async () => {
  const { runProgram } = await runtime;
  const result = runProgram("decimal price = 0.10m;\ndecimal fee = 0.20m;\ndecimal total = price + fee;\nConsole.WriteLine(total);\nConsole.WriteLine(total == 0.3m);\nConsole.WriteLine((int)-7.90m);");
  assert.equal(result.output, "0.30\nTrue\n-7\n");
  assert.deepEqual(result.trace[2].variables.total, { type: "decimal", value: "0.30" });
  assert.equal(result.trace[2].calculation.result, "0.30");
  assert.throws(() => runProgram("Console.WriteLine(0.1m + 0.2);"), { code: "type" });
  assert.throws(() => runProgram("Console.WriteLine(1m / 3);"), { code: "unsupported" });
});
test("String.Length follows UTF-16, and a grouped sum is evaluated before concatenation", async () => {
  const { runProgram } = await runtime;
  const result = runProgram('string code = "🧮أ";\nint size = code.Length;\nConsole.WriteLine("الطول: " + size);\nConsole.WriteLine("المقاعد: " + (2 + 3));');
  assert.equal(result.output, "الطول: 3\nالمقاعد: 5\n");
  assert.deepEqual(result.trace[1].calculation, { left: '"🧮أ"', operator: ".Length", result: "3", type: "int" });
  assert.throws(() => runProgram("int seats = 3; Console.WriteLine(seats.Length);"), { code: "type" });
});
test("Console input consumes lines once and distinguishes an empty line from EOF", async () => {
  const { runProgram } = await runtime;
  const source = 'string? name = Console.ReadLine();\nstring? city = Console.ReadLine();\nConsole.WriteLine(name);\nConsole.WriteLine(city == null);';
  const emptyLine = runProgram(source, {}, "منى\r\n\r\n");
  assert.equal(emptyLine.output, "منى\nFalse\n");
  assert.deepEqual(emptyLine.trace[0].inputReads, [{ number: 1, value: "منى" }]);
  assert.deepEqual(emptyLine.trace[1].inputReads, [{ number: 2, value: "" }]);
  const ended = runProgram(source, {}, "منى\r\n");
  assert.equal(ended.output, "منى\nTrue\n");
  assert.deepEqual(ended.trace[1].inputReads, [{ number: null, value: null }]);
});
test("Null coalescing skips its right-hand input read when a value is present", async () => {
  const { runProgram } = await runtime;
  const source = 'string displayName = Console.ReadLine() ?? Console.ReadLine() ?? "زائر";\nstring city = Console.ReadLine() ?? "غير محددة";\nConsole.WriteLine(displayName);\nConsole.WriteLine(city);';
  const provided = runProgram(source, {}, "عمر\nالقاهرة");
  assert.equal(provided.output, "عمر\nالقاهرة\n");
  assert.equal(provided.trace[0].calculation.right, "لم يُحسب");
  assert.equal(provided.trace[0].inputReads.length, 1);
  assert.equal(runProgram(source, {}, "").output, "زائر\nغير محددة\n");
});
test("TryParse exposes a bool and out value, including zero and the range boundary", async () => {
  const { runProgram } = await runtime;
  const source = 'string? raw = Console.ReadLine();\nbool valid = int.TryParse(raw, out int count);\nConsole.WriteLine(valid);\nConsole.WriteLine(count);';
  for (const [input, expected] of [["0", "True\n0\n"], ["2147483647", "True\n2147483647\n"], ["2147483648", "False\n0\n"], ["-2147483648", "True\n-2147483648\n"], ["  +04  ", "True\n4\n"], ["1.5", "False\n0\n"]]) {
    assert.equal(runProgram(source, {}, input).output, expected);
  }
  const parsed = runProgram(source, {}, "7");
  assert.deepEqual(parsed.trace[1].binding, { name: "count", value: 7 });
  assert.deepEqual(parsed.trace[1].variables.count, { type: "int", value: 7 });
  assert.throws(() => runProgram('int count = 1; bool valid = int.TryParse("3", out int count);'), { code: "name" });
});
test("Console-input drafts are kept per step and scoped to their learner", async () => {
  const { freshProgress, lessonRecord, loadProgress, saveProgress } = await progress;
  const lesson = data.lessons.find(item => item.unitId === "console-input-validation");
  const state = freshProgress(data.lessons);
  const record = lessonRecord(state, lesson);
  record.stdinDrafts = { build: "عمر", edit: "", experiment: "هدى" };
  const storage = memoryStorage();
  saveProgress(storage, "learner-a", state);
  const resumed = loadProgress(storage, "learner-a", data.lessons);
  assert.deepEqual(resumed.lessons[lesson.id].stdinDrafts, record.stdinDrafts);
  assert.equal(loadProgress(storage, "learner-b", data.lessons).lessons[lesson.id], undefined);
});
test("Reading a value produces a snapshot rather than a reactive formula", async () => {
  const { runProgram } = await runtime;
  assert.equal(runProgram('int n = 2; int total = n * 10; n = 3; Console.WriteLine(total);').output, "20\n");
});
test("Hardcoded correct totals fail alternate input tests", async () => {
  const { checkChallenge } = await runtime;
  const challenge = data.lessons[6].steps[2].challenge;
  const attempt = 'int price = 10; int tickets = 2; int total = 20; int unused = price * tickets; Console.WriteLine(total);';
  assert.equal(checkChallenge(attempt, challenge).passed, false);
  const real = 'int price = 10; int tickets = 2; int total = tickets * price; Console.WriteLine(total);';
  assert.equal(checkChallenge(real, challenge).passed, true);
});
test("A constant print cannot substitute for reading the named variable", async () => {
  const { checkChallenge } = await runtime;
  assert.equal(checkChallenge('int tickets = 2; Console.WriteLine(2);', data.lessons[4].steps[2].challenge).passed, false);
});
test("A numeric-looking string does not satisfy an integer variable task", async () => {
  const { checkChallenge } = await runtime;
  assert.equal(checkChallenge('string tickets = "2"; Console.WriteLine(tickets);', data.lessons[4].steps[2].challenge).passed, false);
});
test("An experiment must change behavior, not only whitespace/comments", async () => {
  const { checkChallenge } = await runtime;
  const step = data.lessons[0].steps[4];
  assert.equal(checkChallenge('// comment\nConsole.WriteLine("أنا أجرب");', step.challenge, "أنا أجرب\n").passed, false);
});
for (const [label, source, expectedCode] of [
  ["unknown/case-sensitive name", 'int tickets = 2; Console.WriteLine(Tickets);', "name"],
  ["reserved keyword as a name", 'int switch = 2;', "name"],
  ["type mismatch", 'int n = "2";', "type"],
  ["duplicate declaration", 'int n = 2; int n = 3;', "name"],
  ["uninitialized variable", 'int n; Console.WriteLine(n);', "syntax"],
  ["missing quote", 'Console.WriteLine("hello);', "syntax"],
  ["missing semicolon", 'Console.WriteLine("hello")', "syntax"],
  ["operator requires numeric operands", 'Console.WriteLine(true * 2);', "type"],
  ["division by zero", 'int n = 0; Console.WriteLine(3 / n);', "runtime"],
  ["bounded infinite while", 'while (true) {}', "limit"],
  ["unsupported increment", 'int n = ++1;', "unsupported"],
  ["out of range", 'int n = 2147483647; n = n + 1;', "unsupported"],
  ["server/network calls", 'fetch("https://example.com");', "name"],
  ["JavaScript injection", 'globalThis.alert(1);', "syntax"]
]) test("Bounded interpreter rejects " + label, async () => {
  const { runProgram, CSharpError } = await runtime;
  assert.throws(() => runProgram(source), e => e instanceof CSharpError && e.code === expectedCode);
});
test("Parser limits stop large or deeply nested input without executing code", async () => {
  const { runProgram } = await runtime;
  assert.throws(() => runProgram(" ".repeat(16001)), /أطول/);
  assert.throws(() => runProgram('Console.WriteLine(' + "(".repeat(50) + "1" + ")".repeat(50) + ");"), /أقواس/);
  assert.throws(() => runProgram('Console.WriteLine("x");'.repeat(161)), /أوامر/);
});

test("while traces each condition, update, return and final exit with independent snapshots", async () => {
  const { runProgram } = await runtime;
  const source = 'int i = 0;\nint limit = 3;\nwhile (i < limit)\n{\n  Console.WriteLine(i);\n  i = i + 1;\n}\nConsole.WriteLine("تم");';
  const run = runProgram(source);
  const checks = run.trace.filter(step => step.kind === "loop-condition");
  assert.deepEqual(checks.map(step => [step.variables.i.value, step.value, step.nextLine]), [[0,true,5], [1,true,5], [2,true,5], [3,false,8]]);
  assert.deepEqual(run.trace.filter(step => step.kind === "loop-jump").map(step => step.nextLine), [3,3,3]);
  assert.deepEqual(run.trace.filter(step => step.loop?.phase === "update").map(step => [step.previous,step.value]), [[0,1], [1,2], [2,3]]);
  assert.equal(run.output, "0\n1\n2\nتم\n");
  assert.equal(runProgram(source, {i:3}).output, "تم\n");
});

test("for updates after continue, exits on break, and keeps the header variable scoped", async () => {
  const { runProgram } = await runtime;
  const source = 'for (int i = 0;\n     i < 5;\n     i++)\n{\n  if (i == 1) continue;\n  if (i == 3) break;\n  Console.WriteLine(i);\n}\nConsole.WriteLine("تم");';
  const run = runProgram(source);
  assert.equal(run.output, "0\n2\nتم\n");
  assert.equal(run.trace.find(step => step.kind === "continue").nextLine, 3);
  assert.equal(run.trace.find(step => step.kind === "break").nextLine, 9);
  assert.equal(run.trace.filter(step => step.loop?.phase === "update").length, 3);
  assert.equal(run.trace.filter(step => step.loop?.phase === "initialize").length, 1);
  assert.equal(run.variables.i, undefined);
  assert.throws(() => runProgram(source + "\nConsole.WriteLine(i);"), {code:"name"});
  assert.throws(() => runProgram("for (;;) continue;"), {code:"limit"});
});

test("Nested loops contain jumps and refresh skipped lines for each iteration", async () => {
  const { runProgram } = await runtime;
  const source = 'for (int row = 1; row <= 2; row++)\n{\n  for (int col = 1; col <= 3; col++)\n  {\n    if (col == 2) break;\n    if (row == 2)\n    {\n      Console.WriteLine(row);\n    }\n  }\n}\nConsole.WriteLine("تم");';
  const run = runProgram(source);
  assert.equal(run.output, "2\nتم\n");
  assert.equal(run.trace.filter(step => step.kind === "break").length, 2);
  const print = run.trace.find(step => step.kind === "print" && step.loop?.depth === 2);
  assert.equal(print.variables.col.value, 1);
  assert.equal(print.skippedLines.includes(print.line), false);
});

test("foreach binds a typed item per iteration and accepts empty and alternate collections", async () => {
  const { runProgram } = await runtime;
  const source = 'int[] values = {4, 9, 12};\nforeach (int value in values)\n{\n  Console.WriteLine(value);\n}';
  const run = runProgram(source);
  assert.deepEqual(run.trace.filter(step => step.kind === "loop-bind").map(step => step.value), [4,9,12]);
  assert.deepEqual(run.trace[0].variables.values.value, [4,9,12]);
  assert.equal(run.variables.value, undefined);
  assert.equal(runProgram(source, {values:[]}).output, "");
  assert.equal(runProgram(source, {values:[1,1]}).output, "1\n1\n");
  assert.throws(() => runProgram(source.replace("Console.WriteLine(value);", "value++;")), {code:"type"});
  assert.throws(() => runProgram("break;"), {code:"syntax"});
});

test("Grading requires a loop that performs the task, not just a reachable loop", async () => {
  const { checkChallenge } = await runtime;
  const challenge = {output:"0\n", loop:{kind:"while", reads:["i"], effect:"print"}};
  assert.equal(checkChallenge("int i=0; while (i<1) { i++; } Console.WriteLine(0);", challenge).passed, false);
  assert.equal(checkChallenge("int i=0; while (i<1) { Console.WriteLine(i); i++; }", challenge).passed, true);
});

test("Local functions show a separate call frame and return numeric values to the caller", async () => {
  const { runProgram } = await runtime;
  const source = 'int original = 5;\nint result = AddOne(original);\nConsole.WriteLine(original);\nConsole.WriteLine(result);\nint AddOne(int copied)\n{\n  copied++;\n  return copied;\n}';
  const run = runProgram(source);
  const enter = run.trace.find(step => step.kind === "call");
  const returned = run.trace.find(step => step.kind === "return");
  assert.deepEqual(enter.call, {name:"AddOne",depth:1,callerLine:2,phase:"enter"});
  assert.deepEqual(enter.variables, {copied:{type:"int",value:5}});
  assert.equal(enter.nextLine, 7);
  assert.equal(returned.variables.copied.value, 6);
  assert.equal(returned.nextLine, 2);
  assert.equal(run.variables.copied, undefined);
  assert.equal(run.variables.original.value, 5);
  assert.equal(run.output, "5\n6\n");
});

test("A function return leaves its loop and ends only the current call", async () => {
  const { runProgram } = await runtime;
  const source = 'Console.WriteLine(Find(2)); Console.WriteLine(Find(8)); int Find(int target) { for (int i=0; i<4; i++) { if(i==target) return i; } return -1; }';
  const run = runProgram(source);
  assert.equal(run.output, "2\n-1\n");
  assert.deepEqual(run.trace.filter(step => step.kind === "return").map(step => step.value), [2,-1]);
  assert.deepEqual(run.trace.filter(step => step.kind === "call").map(step => step.variables.target.value), [2,8]);
  assert.equal(run.trace.find(step => step.kind === "return").variables.i.value, 2);
});

test("Function validation enforces parameters and return values, and call depth stays bounded", async () => {
  const { runProgram, checkChallenge } = await runtime;
  assert.throws(() => runProgram('int Sum(int a) { if (a > 0) return a; } Console.WriteLine(Sum(3));'), {code:"type"});
  assert.throws(() => runProgram('int Sum(int a) { return a; } Console.WriteLine(Sum());'), {code:"type"});
  assert.throws(() => runProgram('void Say() { Console.WriteLine("أهلًا"); } int x = Say();'), {code:"type"});
  assert.throws(() => runProgram('int Recur(int n) { return Recur(n); } Console.WriteLine(Recur(1));'), {code:"limit"});
  assert.equal(runProgram('Say(2); void Say(int n) { Console.WriteLine(n); }').output, "2\n");
  const fake = "Console.WriteLine(6); int Triple(int n) { return n * 3; }";
  assert.equal(checkChallenge(fake, {output:"6\n", calls:{Triple:1}}).passed, false);
});

test("Save/resume preserves drafts, stage, completion artifacts, and stable lesson IDs", async () => {
  const { freshProgress, lessonRecord, saveProgress, loadProgress } = await progress;
  const storage = memoryStorage(), state = freshProgress(data.lessons), lesson = data.lessons[5];
  state.activeLessonId = lesson.id;
  const r = lessonRecord(state, lesson); r.step = 7; r.furthest = 7; r.drafts.transfer = lesson.steps[7].solution; r.completed = true; r.artifact = { code: r.drafts.transfer, output: "4\n6\n" };
  assert.equal(saveProgress(storage, "default", state), true);
  const resumed = loadProgress(storage, "default", data.lessons);
  assert.deepEqual(resumed, state);
});
test("Different learner profiles have independent C# progress", async () => {
  const { freshProgress, saveProgress, loadProgress } = await progress;
  const storage = memoryStorage(), state = freshProgress(data.lessons); state.activeLessonId = data.lessons[4].id;
  saveProgress(storage, "learner-example-1", state);
  assert.equal(loadProgress(storage, "learner-example-1", data.lessons).activeLessonId, data.lessons[4].id);
  assert.equal(loadProgress(storage, "learner-example-2", data.lessons).activeLessonId, data.lessons[0].id);
});
test("Corrupt storage, old revisions, unknown IDs and invalid indices recover without losing a valid draft", async () => {
  const { storageKey, loadProgress } = await progress;
  const storage = memoryStorage(); storage.setItem(storageKey(), "{broken");
  assert.equal(loadProgress(storage, "default", data.lessons).activeLessonId, data.lessons[0].id);
  const first = data.lessons[0];
  storage.setItem(storageKey(), JSON.stringify({ version: 1, activeLessonId: "unknown", lessons: { [first.id]: { revision: 0, step: 999, furthest: 999, completed: true, drafts: { build: 'Console.WriteLine("مسودتي");' } } } }));
  const loaded = loadProgress(storage, "default", data.lessons);
  assert.equal(loaded.lessons[first.id].step, 0); assert.equal(loaded.lessons[first.id].completed, false);
  assert.equal(loaded.lessons[first.id].drafts.build, 'Console.WriteLine("مسودتي");');
});
test("Storage unavailability is recoverable and reports save failure", async () => {
  const { freshProgress, loadProgress, saveProgress } = await progress;
  const broken = { getItem() { throw Error("blocked"); }, setItem() { throw Error("full"); } };
  assert.deepEqual(loadProgress(broken, "default", data.lessons), freshProgress(data.lessons));
  assert.equal(saveProgress(broken, "default", freshProgress(data.lessons)), false);
});

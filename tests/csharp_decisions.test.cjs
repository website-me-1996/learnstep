const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const runtime=import('../csharp-runtime.js');
const data=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../csharp-lessons.json')));
const lesson=id=>data.lessons.find(l=>l.id.endsWith(id));

test('Eight decision lessons add scenes and a stable cross-unit prerequisite without replacing P1',()=>{
 assert.equal(data.lessons.slice(0,16).reduce((n,l)=>n+l.steps.length,0),128);
 assert.deepEqual(data.units.flatMap(u=>u.lessonIds),data.lessons.map(l=>l.id));
 assert.deepEqual(data.lessons.slice(0,8).map(l=>l.id),['csharp-01-first-output','csharp-02-statement-order','csharp-03-write-and-writeline','csharp-04-string-variable','csharp-05-int-variable','csharp-06-assignment-update','csharp-07-calculate-value','csharp-08-first-ticket']);
 for(const l of data.lessons.slice(8,16)){assert.equal(l.unitId,'booleans-decisions');assert.equal(l.sceneVisual.length,3);assert.equal(l.steps[0].code,undefined);assert.ok(l.steps[0].instruction.startsWith('يا كمبيوتر،'));assert.equal(l.steps.length,8);}
 assert.deepEqual(data.lessons[8].prerequisites,[data.lessons[7].id]);
});
test('All authored boundary and alternative cases execute, including boolean and string inputs',async()=>{
 const {runProgram}=await runtime;
 for(const l of data.lessons.slice(8,16))for(const step of l.steps.filter(s=>s.challenge))for(const c of step.challenge.cases||[])assert.equal(runProgram(step.solution,c.inputs).output,c.output,l.id+'/'+step.id+' '+JSON.stringify(c.inputs));
});
test('Comparison results match the boundary before, at, and after a threshold',async()=>{
 const {runProgram}=await runtime;
 for(const [operator,expected]of [['>','False\nFalse\nTrue\n'],['>=','False\nTrue\nTrue\n'],['<','True\nFalse\nFalse\n'],['<=','True\nTrue\nFalse\n'],['==','False\nTrue\nFalse\n'],['!=','True\nFalse\nTrue\n']]){
  const source=[2,3,4].map(n=>'Console.WriteLine('+n+' '+operator+' 3);').join('\n');assert.equal(runProgram(source).output,expected,operator);
 }
});
test('Arithmetic, ordering and equality follow C# precedence and preserve operand values',async()=>{
 const {runProgram}=await runtime;
 const result=runProgram('int count = 2; bool value = count + 2 * 3 >= 8 == true; Console.WriteLine(value); Console.WriteLine(count);');
 assert.equal(result.output,'True\n2\n');assert.equal(result.variables.count.value,2);
 assert.equal(runProgram('Console.WriteLine((2 > 3) == false);').output,'True\n');
});
test('String equality compares text exactly and bool prints with .NET casing',async()=>{
 const {runProgram}=await runtime;
 assert.equal(runProgram('Console.WriteLine("جاهز" == "جاهز"); Console.WriteLine("ready" != "Ready"); Console.WriteLine(true == false); bool b = false; Console.WriteLine("b=" + b);').output,'True\nTrue\nFalse\nb=False\n');
});
test('False skips the if body, exposes the jump, and does not evaluate its runtime error',async()=>{
 const {runProgram}=await runtime;
 const source='bool ready = false;\nif (ready)\n{\n    int zero = 0;\n    Console.WriteLine(1 / zero);\n}\nConsole.WriteLine("after");';
 const r=runProgram(source),condition=r.trace.find(t=>t.kind==='condition');
 assert.equal(r.output,'after\n');assert.equal(condition.value,false);assert.equal(condition.branch,'skip');assert.equal(condition.nextLine,7);assert.match(condition.action,/السطر 7/);
 assert.ok(condition.skippedLines.includes(5));assert.ok(!r.trace.some(t=>t.line===5));assert.deepEqual(condition.variables,{ready:{type:'bool',value:false}});
});
test('if/else executes one path and then the common next statement for both outcomes',async()=>{
 const {runProgram}=await runtime;
 const source='bool b = true; if (b) { Console.Write("yes"); } else { Console.Write("no"); } Console.WriteLine("-after");';
 assert.equal(runProgram(source).output,'yes-after\n');
 const no=runProgram(source,{b:false});assert.equal(no.output,'no-after\n');assert.equal(no.trace.find(t=>t.kind==='condition').branch,'else');assert.ok(no.trace.some(t=>t.kind==='else'));
});
test('Nested decisions and dangling else attach to the nearest unmatched if',async()=>{
 const {runProgram}=await runtime;
 assert.equal(runProgram('if (true) if (false) Console.WriteLine("A"); else Console.WriteLine("B");').output,'B\n');
 assert.equal(runProgram('int value = 2; if (value > 2) { Console.WriteLine("high"); } else if (value == 2) { Console.WriteLine("equal"); } else { Console.WriteLine("low"); }').output,'equal\n');
});
test('Branches update outer variables; block locals disappear without rewriting earlier snapshots',async()=>{
 const {runProgram}=await runtime;
 const r=runProgram('int total = 30;\nif (total >= 30)\n{\n int discount = 5;\n total = total - discount;\n}\nConsole.WriteLine(total);');
 assert.equal(r.output,'25\n');assert.equal(r.variables.total.value,25);assert.equal(r.variables.discount,undefined);
 const local=r.trace.find(t=>t.kind==='declare'&&t.name==='discount'),end=r.trace.find(t=>t.kind==='scope-exit');
 assert.equal(local.variables.total.value,30);assert.equal(local.variables.discount.value,5);assert.equal(end.variables.discount,undefined);assert.equal(end.variables.total.value,25);
 assert.deepEqual(r.trace[0].skippedLines,[]);assert.equal(r.trace[0].variables.total.value,30);
});
test('Sibling branch scopes can reuse a local name',async()=>{
 const {runProgram}=await runtime;
 const source='bool b = true; if (b) { int n = 1; Console.WriteLine(n); } else { int n = 2; Console.WriteLine(n); }';
 assert.equal(runProgram(source).output,'1\n');assert.equal(runProgram(source,{b:false}).output,'2\n');
});
for(const[label,source,code]of [
 ['numeric if','if (1) { Console.WriteLine("bad"); }','type'],
 ['text if','if ("false") { Console.WriteLine("bad"); }','type'],
 ['bool and numeric equality','Console.WriteLine(true == 1);','type'],
 ['ordered strings','Console.WriteLine("a" > "b");','type'],
 ['chained numeric comparison','Console.WriteLine(1 < 2 < 3);','type'],
 ['invalid inactive body','Console.WriteLine("before"); if (false) { bool b = "false"; }','type'],
 ['escaped block local','if (true) { int n = 1; } Console.WriteLine(n);','name'],
 ['shadowed outer variable','int n = 1; if (false) { int n = 2; }','name'],
 ['shadowed later outer variable','if (true) { int n = 1; } int n = 2;','name'],
 ['unbraced variable declaration','if (true) int n = 1;','syntax'],
 ['missing closing brace','if (true) { Console.WriteLine(1);','syntax'],
 ['bare else','else { Console.WriteLine(1); }','unsupported']
])test('Static validation rejects '+label,async()=>{const {runProgram,CSharpError}=await runtime;assert.throws(()=>runProgram(source),e=>e instanceof CSharpError&&e.code===code);});
test('The trace records comparison inputs before the derived bool is saved',async()=>{
 const {runProgram}=await runtime;
 const r=runProgram('int tickets = 3; bool hasOffer = tickets >= 3; Console.WriteLine(hasOffer);');
 assert.deepEqual(r.trace[1].comparison,{left:3,operator:'>=',right:3,result:true});assert.equal(r.trace[1].variables.hasOffer.type,'bool');
});
test('Grading rejects a constant bool, wrong boundary, ignored else, and unconditional discount',async()=>{
 const {checkChallenge}=await runtime;
 const c=lesson('at-least').steps[2].challenge;
 assert.equal(checkChallenge('int tickets = 3; bool hasOffer = true; bool unused = tickets >= 3; Console.WriteLine(hasOffer);',c).passed,false);
 assert.equal(checkChallenge('int tickets = 3; bool hasOffer = tickets > 3; Console.WriteLine(hasOffer);',c).passed,false);
 const choose=lesson('if-else').steps[2];assert.equal(checkChallenge(choose.solution.replace('else','if (hasTicket)'),choose.challenge).passed,false);
 const app=lesson('conditional-ticket');assert.equal(checkChallenge(app.bugRepair.brokenCode,app.steps.find(s=>s.id==='repair').challenge).passed,false);
});
test('Saved P1 drafts and completed artifacts survive adding a second unit',async()=>{
 const {freshProgress,saveProgress,loadProgress,lessonRecord}=await import('../csharp-progress.js');
 const oldLessons=data.lessons.slice(0,8),state=freshProgress(oldLessons),l=oldLessons[5];state.activeLessonId=l.id;
 const record=lessonRecord(state,l);record.step=7;record.furthest=7;record.completed=true;record.drafts.transfer=l.steps[7].solution;record.artifact={code:record.drafts.transfer,output:'4\n6\n'};
 const entries=new Map(),storage={getItem:k=>entries.get(k),setItem:(k,v)=>entries.set(k,v)};saveProgress(storage,'default',state);
 const resumed=loadProgress(storage,'default',data.lessons);assert.equal(resumed.activeLessonId,l.id);assert.deepEqual(resumed.lessons[l.id],record);assert.equal(lessonRecord(resumed,data.lessons[8]).completed,false);
});
test('The independent new unit resumes its own step and code',async()=>{
 const {freshProgress,saveProgress,loadProgress,lessonRecord}=await import('../csharp-progress.js');
 const state=freshProgress(data.lessons),l=lesson('if-guard');state.activeLessonId=l.id;const r=lessonRecord(state,l);r.step=4;r.furthest=4;r.drafts.experiment=l.steps[4].solution;
 const entries=new Map(),storage={getItem:k=>entries.get(k),setItem:(k,v)=>entries.set(k,v)};saveProgress(storage,'learner-decisions',state);
 const resumed=loadProgress(storage,'learner-decisions',data.lessons);assert.equal(resumed.activeLessonId,l.id);assert.equal(resumed.lessons[l.id].step,4);assert.equal(resumed.lessons[l.id].drafts.experiment,r.drafts.experiment);
});
test('Nested branch limits include inactive source and report a bounded failure',async()=>{
 const {runProgram,CSharpError}=await runtime;
 assert.throws(()=>runProgram('if (true) {'.repeat(45)+'Console.WriteLine(1);'+'}'.repeat(45)),e=>e instanceof CSharpError&&e.code==='limit');
});
test('Text growth is bounded before printing, even when every statement is finite',async()=>{
 const {runProgram,CSharpError}=await runtime;
 const source='string text = "x";\n'+'text = text + text;\n'.repeat(20)+'Console.WriteLine("done");';
 assert.throws(()=>runProgram(source),e=>e instanceof CSharpError&&e.code==='limit'&&e.message.includes('النص'));
});

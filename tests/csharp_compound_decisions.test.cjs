const test = require('node:test');
const assert = require('node:assert/strict');
const { lessons } = require('../csharp-lessons.json');
const runtime = import('../csharp-runtime.js');
const lesson = slug => lessons.find(item => item.id.endsWith('-' + slug));

for (const [operator, left, expected] of [['&&', false, false], ['||', true, true]]) {
  test(`${operator} skips a division by zero and omits reads from the skipped operand`, async () => {
    const { runProgram } = await runtime;
    const source = `bool left = ${left};\nint count = 0;\nbool answer = left ${operator} (30 / count >= 10);\nConsole.WriteLine(answer);`;
    const result = runProgram(source);
    assert.equal(result.output, expected ? 'True\n' : 'False\n');
    const assignment = result.trace[2];
    assert.deepEqual(assignment.reads, ['left']);
    assert.deepEqual(assignment.logic[0].right, { source: '(30 / count >= 10)', value: null });
    assert.throws(() => runProgram(source, { left: !left }), error => error.code === 'runtime');
    const evaluated = runProgram(source, { left: !left, count: 4 });
    assert.deepEqual(evaluated.trace[2].reads, ['left', 'count']);
    assert.equal(evaluated.trace[2].logic[0].right.value, false, 'an evaluated false differs from a skipped operand');
  });
}

test('The parser checks both operand types before short-circuit evaluation', async () => {
  const { runProgram } = await runtime;
  for (const expression of ['false && 1', 'true || "text"', '!4', 'false && missing']) {
    assert.throws(() => runProgram(`Console.WriteLine(${expression});`), error => error.code === (expression.includes('missing') ? 'name' : 'type'));
  }
});

test('Negation and conditional operators respect precedence and group evaluation', async () => {
  const { runProgram } = await runtime;
  const source = 'bool a = false;\nbool b = true;\nConsole.WriteLine(!a || b && false);\nConsole.WriteLine((!a || b) && false);';
  const result = runProgram(source);
  assert.equal(result.output, 'True\nFalse\n');
  assert.deepEqual(result.trace[2].reads, ['a']);
  assert.deepEqual(result.trace[2].logic.map(check => check.operator), ['!', '||']);
  assert.deepEqual(result.trace[3].logic.map(check => check.operator), ['!', '||', '&&']);
  assert.equal(result.trace[2].logic[1].right.source, 'b && false');
});

test('An else-if chain traces each reached condition exactly once and stops at the first match', async () => {
  const { runProgram } = await runtime;
  const source = lesson('condition-order').code;
  const onBoundary = runProgram(source, { score: 90 });
  const below = runProgram(source, { score: 89 });
  const failing = runProgram(source, { score: 59 });
  const conditions = result => result.trace.filter(step => step.kind === 'condition');
  assert.deepEqual(conditions(onBoundary).map(step => step.clause), ['if']);
  assert.deepEqual(conditions(below).map(step => step.clause), ['if', 'else if']);
  assert.equal(conditions(below)[0].branch, 'else-if');
  assert.equal(conditions(below)[0].nextLine, conditions(below)[1].line);
  assert.equal(below.trace.filter(step => step.kind === 'else').length, 0);
  assert.equal(failing.trace.filter(step => step.kind === 'else').length, 1);
  assert.deepEqual([onBoundary.output, below.output, failing.output], ['ممتاز\n', 'ناجح\n', 'حاول مرة أخرى\n']);
});

test('A mixed line containing a chosen and skipped statement remains readable', async () => {
  const { runProgram } = await runtime;
  const source = 'int score = 90;\nif (score >= 90) {\n  Console.WriteLine("top");\n} else if (score >= 60) {\n  Console.WriteLine("middle");\n}\nConsole.WriteLine("done");';
  const chosen = runProgram(source);
  assert.ok(chosen.trace.at(-1).skippedLines.includes(5));
  assert.ok(!chosen.trace.at(-1).skippedLines.includes(4));
  const other = runProgram(source, { score: 60 });
  assert.ok(other.trace.at(-1).skippedLines.includes(3));
  assert.ok(!other.trace.at(-1).skippedLines.includes(4));
  assert.equal(other.output, 'middle\ndone\n');
});

test('Grading requires the operator in the result and the reachable else-if structure', async () => {
  const { checkChallenge } = await runtime;
  const guard = lesson('logical-and').steps.find(step => step.id === 'build');
  const fake = 'bool isOpen = false; bool hasSeat = true; bool unused = isOpen && hasSeat; bool canReserve = false; if (isOpen) { canReserve = hasSeat; } Console.WriteLine(canReserve);';
  assert.match(checkChallenge(fake, guard.challenge).message, /لحساب «canReserve»/);
  const chain = lesson('else-if').steps.find(step => step.id === 'build');
  const nested = 'int minutes = 4; if (minutes == 0) { Console.WriteLine("في الموعد"); } else { if (minutes <= 5) { Console.WriteLine("تأخير قصير"); } else { Console.WriteLine("تأخير طويل"); } }';
  assert.equal(checkChallenge(nested, chain.challenge).passed, false);
  assert.equal(checkChallenge(chain.solution, chain.challenge).passed, true);
});

test('The new unit preserves prior prerequisites and saved artifacts', async () => {
  const third = lessons.filter(item => item.unitId === 'compound-decisions');
  assert.equal(third.length, 8);
  assert.deepEqual(third[0].prerequisites, [lessons[15].id]);
  const { freshProgress, lessonRecord, loadProgress, saveProgress } = await import('../csharp-progress.js');
  const previous = lessons.slice(0, 16);
  const last = previous.at(-1);
  const progress = freshProgress(previous);
  progress.activeLessonId = last.id;
  const record = lessonRecord(progress, last);
  record.step = 7;
  record.furthest = 7;
  record.completed = true;
  record.drafts.transfer = last.steps[7].solution;
  record.artifact = { code: record.drafts.transfer, output: last.steps[7].challenge.output };
  const entries = new Map();
  const storage = { getItem: key => entries.get(key), setItem: (key, value) => entries.set(key, value) };
  saveProgress(storage, 'default', progress);
  const resumed = loadProgress(storage, 'default', lessons);
  assert.equal(resumed.activeLessonId, last.id);
  assert.deepEqual(resumed.lessons[last.id], record);
});

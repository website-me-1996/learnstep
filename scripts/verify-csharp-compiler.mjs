import {spawnSync} from 'node:child_process';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {runProgram} from '../csharp-runtime.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'steplearn-compiler-check-'));
try {
  const data=JSON.parse(await fs.readFile(path.join(root,'csharp-lessons.json'),'utf8'));
  const expected = Object.fromEntries(data.lessons.flatMap(lesson =>
    lesson.steps.filter(step => step.challenge).map(step =>
      [lesson.id + '/' + step.id, runProgram(step.solution, {}, step.challenge.stdin ?? '').output])));
  const fixture=path.join(temp,'expected.json');await fs.writeFile(fixture,JSON.stringify(expected));
  const report=path.join(temp,'report.json');
  const run=spawnSync(process.env.STEPLEARN_DOTNET||'dotnet',['run','--project',path.join(root,'runtime/csharp/verification/StepLearn.CSharp.Verification.csproj'),'--',root,report,fixture],{cwd:path.join(root,'runtime/csharp'),encoding:'utf8',env:{...process.env,DOTNET_CLI_TELEMETRY_OPTOUT:'1'},timeout:120000});
  if(run.error) throw run.error;
  if(run.status!==0) {console.error(run.stderr||run.stdout);process.exitCode=run.status||1;}
  else {
    const result=JSON.parse(await fs.readFile(report,'utf8'));
    await fs.copyFile(report,path.join(root,'docs/csharp/native-verification.json'));
    console.log(`Native .NET compiler: ${result.passed} passed, ${result.failed} failed; ${Object.keys(expected).length} curriculum solutions compared with the teaching trace.`);
    console.log('WebAssembly loading, CSP, and worker cancellation require separate browser checks.');
  }
} finally {await fs.rm(temp,{recursive:true,force:true});}

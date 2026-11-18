import { spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dotnet = process.env.STEPLEARN_DOTNET || 'dotnet';
const run = args => {
  const r = spawnSync(dotnet, args, {cwd:path.join(root,'runtime/csharp'), encoding:'utf8', env:{...process.env,DOTNET_CLI_TELEMETRY_OPTOUT:'1'}});
  if(r.status !== 0) throw new Error(r.stderr || r.stdout || r.error?.message || 'dotnet failed');
  return r.stdout.trim();
};
const temp = await fs.mkdtemp(path.join(os.tmpdir(),'steplearn-wasm-'));
try {
  run(['publish','StepLearn.CSharp.csproj','-c','Release','-o',temp]);
  const output = path.join(root,'public/csharp-dotnet');
  await fs.rm(output,{recursive:true,force:true});
  await fs.mkdir(output,{recursive:true});
  await fs.cp(path.join(temp,'wwwroot/_framework'),path.join(output,'_framework'),{recursive:true});
  const sdkBase = run(['--list-sdks']).split('\n').find(line=>line.startsWith('10.0.204 '));
  if(!sdkBase) throw new Error('Install the SDK pinned in runtime/csharp/global.json.');
  const dotnetRoot = path.resolve(sdkBase.match(/\[(.+)\]/)[1],'..');
  const refDir = path.join(dotnetRoot,'packs/Microsoft.NETCore.App.Ref/10.0.15/ref/net10.0');
  await fs.mkdir(path.join(output,'refs'),{recursive:true});
  const references = (await fs.readdir(refDir)).filter(f=>f.endsWith('.dll')).sort();
  for(const file of references) await fs.copyFile(path.join(refDir,file),path.join(output,'refs',file));
  for(const file of ['host.html','worker.js']) await fs.copyFile(path.join(root,'runtime/csharp/browser',file),path.join(output,file));
  await fs.copyFile(path.join(dotnetRoot,'LICENSE.txt'),path.join(output,'DOTNET-LICENSE.txt'));
  await fs.copyFile(path.join(dotnetRoot,'ThirdPartyNotices.txt'),path.join(output,'DOTNET-THIRD-PARTY-NOTICES.txt'));
  await fs.copyFile(path.join(root,'runtime/csharp/THIRD_PARTY_NOTICES.md'),path.join(output,'THIRD_PARTY_NOTICES.md'));
  const nugetRoot = run(['nuget','locals','global-packages','--list']).split(': ').at(-1).trim();
  await fs.copyFile(path.join(nugetRoot,'microsoft.codeanalysis.csharp/5.0.0/ThirdPartyNotices.rtf'),path.join(output,'ROSLYN-THIRD-PARTY-NOTICES.rtf'));
  const inventory = [];
  async function inventoryDir(dir, prefix='') {
    for(const f of await fs.readdir(dir,{withFileTypes:true})) {
      const rel = prefix + f.name;
      if(f.isDirectory()) { await inventoryDir(path.join(dir,f.name),rel+'/'); continue; }
      if(/\.(br|gz|pdb|map)$/.test(rel)) { await fs.unlink(path.join(dir,f.name)); continue; }
      const bytes=await fs.readFile(path.join(dir,f.name));
      inventory.push({file:rel,bytes:bytes.length,gzipBytes:gzipSync(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex')});
    }
  }
  // A clean directory avoids stale fingerprints on rebuilds.
  await inventoryDir(output);
  const manifest={schemaVersion:1,dotnet:'10.0.15',roslyn:'5.0.0',sdk:'10.0.204',references,rawBytes:inventory.reduce((n,f)=>n+f.bytes,0),gzipBytes:inventory.reduce((n,f)=>n+f.gzipBytes,0),files:inventory};
  await fs.writeFile(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log(`C#/.NET assets: ${references.length} references, ${(manifest.rawBytes/1048576).toFixed(1)} MiB raw / ${(manifest.gzipBytes/1048576).toFixed(1)} MiB gzip.`);
} finally { await fs.rm(temp,{recursive:true,force:true}); }

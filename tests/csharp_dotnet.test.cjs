const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const client = import('../csharp-dotnet-client.js');
const assetsModule = import('../csharp-dotnet-assets.js');
const tick = () => new Promise(resolve=>setImmediate(resolve));
async function fixture(options={}) {
  const {DotnetRunner}=await client;
  const frames=[],listeners=new Set();
  const window={addEventListener:(_,fn)=>listeners.add(fn),removeEventListener:(_,fn)=>listeners.delete(fn)};
  const document={body:{append:frame=>frames.push(frame)},createElement:()=>({attributes:{},contentWindow:{messages:[],postMessage(data){this.messages.push(data);}},setAttribute(name,value){this.attributes[name]=value;},remove(){this.removed=true;}})};
  const assets={files:[],references:[]};
  const runner=new DotnetRunner({window,document,loadAssets:async()=>assets,bootTimeout:500,runTimeout:500,...options});
  const send=(payload,extra={})=>{for(const fn of listeners)fn({source:runner.frame?.contentWindow,data:{channel:'steplearn-dotnet',nonce:runner.nonce,payload},...extra});};
  const ready=async()=>{await tick();send({type:'host-ready'});send({type:'ready'});await tick();};
  return {runner,frames,listeners,send,ready};
}
test('Real runner uses an opaque iframe and validates source, channel, nonce, and request id',async()=>{
 const f=await fixture();try{
  const loading=f.runner.load();await tick();const frame=f.frames[0];
  assert.equal(frame.attributes.sandbox,'allow-scripts');assert.equal(frame.hidden,true);
  f.send({type:'host-ready'},{source:{}});assert.equal(frame.contentWindow.messages.length,0);
  f.send({type:'host-ready'},{data:{channel:'steplearn-dotnet',nonce:'wrong',payload:{type:'host-ready'}}});assert.equal(frame.contentWindow.messages.length,0);
  await f.ready();await loading;assert.equal(frame.contentWindow.messages[0].payload.type,'initialize');
  const pending=f.runner.run('Console.WriteLine(1);');await tick();
  const id=frame.contentWindow.messages.at(-1).payload.id;
  f.send({type:'result',id:id+1,result:{ok:true,output:'spoof'}});assert.ok(f.runner.pending);
  f.send({type:'result',id,result:{ok:true,output:'1\n'}});assert.equal((await pending).output,'1\n');
 }finally{f.runner.dispose();assert.equal(f.listeners.size,0);}
});
test('A second click cannot queue a competing program during download or execution',async()=>{
 const f=await fixture();try{
  const pending=f.runner.run('one');
  await assert.rejects(f.runner.run('two'),/يعمل الآن/);
  await f.ready();
  await assert.rejects(f.runner.run('three'),/يعمل الآن/);
  f.send({type:'result',id:f.runner.pending.id,result:{ok:true}});await pending;
 }finally{f.runner.dispose();}
});
test('Stop during download aborts work and ignores the late bootstrap; retry can succeed',async()=>{
 let resolveAssets,signal;
 const f=await fixture({loadAssets:options=>{signal=options.signal;return new Promise(resolve=>resolveAssets=resolve);}});
 try{
  const pending=f.runner.run('old');const rejected=assert.rejects(pending,/أُوقف/);await tick();
  f.runner.stop();await rejected;assert.equal(signal.aborted,true);
  resolveAssets({files:[],references:[]});await tick();assert.equal(f.frames.length,0);
  f.runner.loadAssets=async()=>({files:[],references:[]});
  const retry=f.runner.run('new');await f.ready();f.send({type:'result',id:f.runner.pending.id,result:{ok:true,output:'new'}});assert.equal((await retry).output,'new');
 }finally{f.runner.dispose();}
});
test('Boot timeout and asset errors reject clearly and remove their frame',async()=>{
 const a=await fixture({bootTimeout:15});try{await assert.rejects(a.runner.run('code'),/تحميل .NET وقتًا/);assert.equal(a.frames[0].removed,true);}finally{a.runner.dispose();}
 const b=await fixture({loadAssets:async()=>{throw Error('download failed');}});try{await assert.rejects(b.runner.run('code'),/download failed/);assert.equal(b.runner.frame,null);}finally{b.runner.dispose();}
});
test('Execution timeout, manual stop and invalid responses cancel the worker owner',async()=>{
 for(const mode of ['timeout','stop','invalid']) {
  const f=await fixture({runTimeout:30});try{
   const pending=f.runner.run('code');const rejected=assert.rejects(pending,mode==='timeout'?/مهلة/:mode==='stop'?/أُوقف/:/رد غير صالح/);
   await f.ready();const frame=f.runner.frame;
   if(mode==='stop')f.runner.stop();
   if(mode==='invalid')f.send({type:'result',id:f.runner.pending.id,result:{output:'bad'}});
   await rejected;assert.equal(frame.removed,true);assert.equal(f.runner.frame,null);
  }finally{f.runner.dispose();}
 }
});
test('Assemblies are reclaimed after twelve runs and a new isolated worker boots next time',async()=>{
 const f=await fixture();try{
  for(let i=0;i<13;i++){
   const pending=f.runner.run('code');if(!f.runner.frame)await f.ready();else await tick();
   f.send({type:'result',id:f.runner.pending.id,result:{ok:true}});await pending;
  }
  assert.equal(f.frames.length,2);assert.equal(f.frames[0].removed,true);
 }finally{f.runner.dispose();}
});
test('Oversized code or input is rejected before downloading compiler assets',async()=>{
 const f=await fixture();try{await assert.rejects(f.runner.run('x'.repeat(32001)),/أطول/);await assert.rejects(f.runner.run('code','x'.repeat(32001)),/أطول/);assert.equal(f.frames.length,0);}finally{f.runner.dispose();}
});
test('Published .NET assets have a complete, synchronized SHA-256 inventory',async()=>{
 const {compilerFiles}=await assetsModule;
 const root=path.resolve(__dirname,'..'),assetRoot=path.join(root,'public/csharp-dotnet');
 const manifest=JSON.parse(fs.readFileSync(path.join(assetRoot,'manifest.json')));
 const files=compilerFiles(manifest);assert.equal(manifest.references.length,167);assert.ok(files.length>300);
 for(const file of manifest.files){const bytes=fs.readFileSync(path.join(assetRoot,file.file));assert.equal(bytes.length,file.bytes,file.file);assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256,file.file);}
 for(const file of ['host.html','worker.js'])assert.deepEqual(fs.readFileSync(path.join(root,'runtime/csharp/browser',file)),fs.readFileSync(path.join(assetRoot,file)));
 const host=fs.readFileSync(path.join(assetRoot,'host.html'),'utf8');assert.match(host,/connect-src 'none'/);assert.doesNotMatch(host,/allow-same-origin/);
});
test('The asset loader cannot request arbitrary paths from a malformed inventory',async()=>{
 const {compilerFiles}=await assetsModule;
 const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/csharp-dotnet/manifest.json')));
 assert.throws(()=>compilerFiles({...manifest,schemaVersion:99}));
 assert.throws(()=>compilerFiles({...manifest,references:['../../private']}));
 assert.throws(()=>compilerFiles({...manifest,files:[...manifest.files,manifest.files.find(f=>f.file==='worker.js')]}));
 const extra={file:'https://example.com/student-code',bytes:1,sha256:'a'.repeat(64)};
 assert.equal(compilerFiles({...manifest,files:[...manifest.files,extra]}).some(f=>f.file===extra.file),false);
});
test('Pre-supplied stdin persists independently for each learner, with a size limit',async()=>{
 const {freshProgress,lessonRecord,saveProgress,loadProgress}=await import('../csharp-progress.js');
 const lessons=JSON.parse(fs.readFileSync(path.join(__dirname,'../csharp-lessons.json'))).lessons;
 const entries=new Map(),storage={getItem:k=>entries.get(k),setItem:(k,v)=>entries.set(k,v)};
 const state=freshProgress(lessons);lessonRecord(state,lessons[0]).stdin='أحمد\n21';saveProgress(storage,'learner-one',state);
 assert.equal(lessonRecord(loadProgress(storage,'learner-one',lessons),lessons[0]).stdin,'أحمد\n21');
 assert.equal(lessonRecord(loadProgress(storage,'learner-two',lessons),lessons[0]).stdin,'');
 lessonRecord(state,lessons[0]).stdin='x'.repeat(20000);saveProgress(storage,'learner-one',state);
 assert.equal(lessonRecord(loadProgress(storage,'learner-one',lessons),lessons[0]).stdin.length,16000);
});
test('Downloads check HTTP errors and file integrity; verified compiler bytes are reused',async()=>{
 const {loadDotnetAssets}=await assetsModule;
 const bytes=new TextEncoder().encode('trusted');
 const sha256=createHash('sha256').update(bytes).digest('hex');
 const manifest={schemaVersion:1,references:['System.Runtime.dll'],files:['_framework/dotnet.js','worker.js','refs/System.Runtime.dll'].map(file=>({file,bytes:bytes.length,sha256}))};
 let calls=[];
 const fetcher=async(url)=>{calls.push(url);return url.endsWith('manifest.json')?{ok:true,json:async()=>manifest}:new Response(bytes);};
 await assert.rejects(loadDotnetAssets({fetch:async()=>({ok:false})}),/قائمة ملفات/);
 await assert.rejects(loadDotnetAssets({fetch:async url=>url.endsWith('manifest.json')?{ok:true,json:async()=>manifest}:new Response('corrupt')}),/غير مطابق/);
 const loaded=await loadDotnetAssets({fetch:fetcher});assert.equal(loaded.files.length,3);assert.equal(calls.length,4);
 const again=await loadDotnetAssets({fetch:()=>{throw Error('unexpected download');}});assert.equal(again,loaded);
 assert.ok(calls.every(url=>url.startsWith('/csharp-dotnet/')));
});

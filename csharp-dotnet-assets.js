// Compiler files are public, immutable inputs. No student code is sent to fetch.
let cachedAssets;
const allowed = /^(?:worker\.js|_framework\/[A-Za-z0-9_.-]+\.(?:js|wasm)|refs\/[A-Za-z0-9_.-]+\.dll)$/;
export function compilerFiles(manifest) {
  if(manifest?.schemaVersion !== 1 || !Array.isArray(manifest.files) || !Array.isArray(manifest.references)) throw new Error('قائمة ملفات .NET غير صالحة.');
  const files = manifest.files.filter(file => allowed.test(file.file));
  if(files.length > 600 || files.length < 3 || new Set(files.map(file=>file.file)).size !== files.length || files.some(file=>!Number.isSafeInteger(file.bytes) || file.bytes < 1 || file.bytes > 20000000 || !/^[a-f0-9]{64}$/.test(file.sha256))) throw new Error('قائمة ملفات .NET غير صالحة.');
  if(files.reduce((sum,file)=>sum+file.bytes,0)>80000000 || !files.some(file=>file.file==='_framework/dotnet.js') || !files.some(file=>file.file==='worker.js') || !manifest.references.length || manifest.references.some(name=>!files.some(file=>file.file==='refs/'+name))) throw new Error('قائمة ملفات .NET غير مكتملة.');
  return files;
}
export async function loadDotnetAssets({signal,onStatus=()=>{},fetch:fetcher=globalThis.fetch}={}) {
  if(cachedAssets) return cachedAssets;
  const manifestResponse=await fetcher('/csharp-dotnet/manifest.json',{signal,credentials:'omit'});
  if(!manifestResponse.ok) throw new Error('تعذّر تحميل قائمة ملفات .NET.');
  const manifest=await manifestResponse.json(), inventory=compilerFiles(manifest);
  const files=new Array(inventory.length); let next=0,loaded=0;
  onStatus('جاري تحميل ملفات .NET…');
  await Promise.all(Array.from({length:6},async()=>{
    while(next<inventory.length) {
      const index=next++, file=inventory[index];
      const response=await fetcher('/csharp-dotnet/'+file.file,{signal,credentials:'omit'});
      if(!response.ok) throw new Error('تعذّر تحميل ملف .NET: '+file.file);
      const bytes=await response.arrayBuffer();
      const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),v=>v.toString(16).padStart(2,'0')).join('');
      if(bytes.byteLength!==file.bytes || hash!==file.sha256) throw new Error('ملف .NET غير مطابق للإصدار. حدّث الصفحة وأعد المحاولة.');
      files[index]={file:file.file,bytes};loaded++;
      if(loaded%20===0 || loaded===inventory.length) onStatus('تحميل .NET: '+Math.round(loaded/inventory.length*100)+'٪');
    }
  }));
  if(signal?.aborted) throw new Error('أُوقف تحميل .NET.');
  cachedAssets={files,references:manifest.references};
  return cachedAssets;
}

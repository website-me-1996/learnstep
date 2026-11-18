// This module receives verified local compiler assets, never learner data from
// a network service. CSP blocks all network connections in this worker.
export async function start(files, references) {
  try {
    self.postMessage({type:'status',message:'جاري تجهيز مترجم C# داخل المتصفح…'});
    const assets = new Map(files.map(file => [file.file, file.bytes]));
    const urls = new Map();
    const resourceLabel = name => 'https://runtime.invalid/' + name;
    const moduleURL = file => {
      if(!assets.has(file)) throw new Error('ملف تشغيل مفقود: '+file);
      if(!urls.has(file)) urls.set(file,URL.createObjectURL(new Blob([assets.get(file)],{type:'text/javascript'})));
      return urls.get(file);
    };
    const {dotnet} = await import(moduleURL('_framework/dotnet.js'));
    const runtime = await dotnet.withDiagnosticTracing(false)
      // Emscripten needs an absolute label because a blob URL has no relative base.
      // The runtime loads the bytes through the resource loader and CSP blocks fetches.
      .withModuleConfig({locateFile: resourceLabel})
      .withOnConfigLoaded(config => {
        // Blob modules have no relative HTTP base. All resources are supplied
        // below by exact filename; these URLs are labels, never fetched.
        const visit = value => {
          if(Array.isArray(value)) value.forEach(visit);
          else if(value && typeof value === 'object') {
            if(value.name) value.resolvedUrl = value.name.endsWith('.js') ? moduleURL('_framework/'+value.name) : resourceLabel(value.name);
            else Object.values(value).forEach(visit);
          }
        };
        visit(config.resources);
      })
      .withResourceLoader((type,name) => {
        const file = '_framework/' + name;
        if(!assets.has(file)) throw new Error('ملف تشغيل مفقود: '+name);
        if(type === 'dotnetjs') return moduleURL(file);
        return Promise.resolve(new Response(assets.get(file),{headers:{'Content-Type':'application/wasm'}}));
      }).create();
    const exports = await runtime.getAssemblyExports(runtime.getConfig().mainAssemblyName);
    const compiler = exports.StepLearn.CSharp.CompilerBridge;
    for(const file of references) compiler.AddReference(new Uint8Array(assets.get('refs/'+file)));
    self.onmessage = async ({data}) => {
      if(typeof data?.source !== 'string' || typeof data?.input !== 'string') return;
      try {
        const result = JSON.parse(await compiler.Run(JSON.stringify({Source:data.source,Input:data.input})));
        self.postMessage({type:'result',id:data.id,result});
      } catch(error) {
        self.postMessage({type:'result',id:data.id,result:{ok:false,kind:'runtime',message:String(error?.message||error)}});
      }
    };
    self.postMessage({type:'ready'});
  } catch(error) {
    self.postMessage({type:'error',message:'تعذّر تجهيز .NET: '+String(error?.message||error)});
  }
}

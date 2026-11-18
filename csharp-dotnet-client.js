import {loadDotnetAssets} from './csharp-dotnet-assets.js';

// A disposable opaque-origin iframe owns the actual .NET Web Worker.
// Killing the iframe also kills synchronous infinite loops inside the runtime.
export class DotnetRunner {
  constructor({document: doc = globalThis.document, window: win = globalThis.window, onStatus = () => {}, bootTimeout = 90000, runTimeout = 6000, loadAssets = loadDotnetAssets} = {}) {
    this.doc = doc; this.win = win; this.onStatus = onStatus;
    this.bootTimeout = bootTimeout; this.runTimeout = runTimeout;
    this.loadAssets = loadAssets;
    this.frame = null; this.ready = null; this.pending = null; this.id = 0; this.runs = 0;
    this.operation = 0; this.busy = false;
    this.listener = e => this.receive(e);
    this.win.addEventListener('message', this.listener);
  }
  load() {
    if(this.ready) return this.ready;
    this.nonce = crypto.randomUUID();
    this.ready = new Promise((resolve, reject) => {
      this.boot = {resolve, reject};
      this.bootTimer = setTimeout(() => this.stop('استغرق تحميل .NET وقتًا طويلًا. جرّب التحميل مرة أخرى.'), this.bootTimeout);
    });
    const nonce=this.nonce;
    this.download = new AbortController();
    Promise.resolve().then(()=>this.loadAssets({signal:this.download.signal,onStatus:message=>{if(this.nonce===nonce && this.boot) this.onStatus(message);}})).then(assets=>{
      if(this.nonce!==nonce || !this.boot) return;
      this.assets=assets;
      this.frame = this.doc.createElement('iframe');
      this.frame.hidden = true;
      this.frame.title = 'مشغّل C# المعزول';
      this.frame.setAttribute('sandbox','allow-scripts');
      this.frame.setAttribute('referrerpolicy','no-referrer');
      this.frame.src = '/csharp-dotnet/host.html#' + nonce;
      this.doc.body.append(this.frame);
    }).catch(error=>{if(this.nonce===nonce && this.boot) this.stop(error.message);});
    return this.ready;
  }
  receive(event) {
    const data = event.data;
    if(!this.frame || event.source !== this.frame.contentWindow || data?.channel !== 'steplearn-dotnet' || data.nonce !== this.nonce) return;
    const payload = data.payload;
    if(payload?.type === 'host-ready' && this.boot && !this.initialized) {
      this.initialized = true;
      this.frame.contentWindow.postMessage({channel:'steplearn-dotnet',nonce:this.nonce,payload:{type:'initialize',...this.assets}}, '*');
      this.assets = null;
      return;
    }
    if(payload?.type === 'status') { this.onStatus(payload.message); return; }
    if(payload?.type === 'ready') { clearTimeout(this.bootTimer); this.boot?.resolve(); this.boot = null; this.onStatus('.NET جاهز.'); return; }
    if(payload?.type === 'error') { this.stop(payload.message); return; }
    if(payload?.type === 'result' && this.pending?.id === payload.id) {
      const pending = this.pending; this.pending = null; clearTimeout(this.runTimer);
      if(!payload.result || typeof payload.result.ok !== 'boolean') { pending.reject(new Error('وصل رد غير صالح من المشغّل.')); this.stop(); return; }
      this.runs++; pending.resolve(payload.result);
      // Loaded student assemblies are isolated and reclaimed periodically.
      if(this.runs >= 12) this.release();
    }
  }
  async run(source, input = '') {
    if(this.busy) throw new Error('يوجد برنامج يعمل الآن. أوقفه أولًا.');
    if(source.length > 32000 || input.length > 32000) throw new Error('الكود أو المدخلات أطول من حدود التجربة.');
    this.busy = true; const operation = ++this.operation;
    try {
      await this.load();
      if(operation !== this.operation || !this.frame) throw new Error('أُوقف التشغيل.');
      return await new Promise((resolve, reject) => {
        const id = ++this.id; this.pending = {id, resolve, reject};
        this.runTimer = setTimeout(() => this.stop('أُوقف البرنامج بعد تجاوز مهلة التنفيذ. راجع شرط الحلقة أو قلّل حجم العمل.'), this.runTimeout);
        this.frame.contentWindow.postMessage({channel:'steplearn-dotnet',nonce:this.nonce,payload:{id,source,input}}, '*');
      });
    } finally { if(operation === this.operation) this.busy = false; }
  }
  release() {
    this.download?.abort(); this.download=null; this.assets=null; this.initialized=false;
    clearTimeout(this.bootTimer); clearTimeout(this.runTimer);
    this.frame?.remove(); this.frame = null; this.ready = null; this.boot = null; this.runs = 0;
  }
  stop(message = 'أُوقف البرنامج. كودك محفوظ ويمكن تشغيله مرة أخرى.') {
    const error = new Error(message);
    this.boot?.reject(error); this.pending?.reject(error); this.pending = null;
    this.operation++; this.busy = false;
    this.release();
  }
  dispose() { this.stop(); this.win.removeEventListener('message', this.listener); }
}

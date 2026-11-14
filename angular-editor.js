let COURSE = null;
const $ = (id) => document.getElementById(id);
const panel = $("angularCoursePanel");
const mainLessonGrid = document.querySelector("#lesson > .grid");
const courseRoadmap = $("courseRoadmap");
const DB_NAME = "khotwa-angular-workspaces-v1";
const DB_STORE = "profiles";
const FALLBACK_PREFIX = "khotwa-angular-workspace-v1:";
const TERMINAL_LIMIT = 24000;
const MAX_IMPORT_FILES = 120;
const MAX_IMPORT_BYTES = 4 * 1024 * 1024;

let learnerId = "default";
let record = createRecord();
let mode = "playground";
let currentLessonIndex = 0;
let currentStepIndex = 0;
let currentQuizSelected = null;
let currentFiles = {};
let playgroundBaseline = {};
let activePath = "src/app/app.ts";
let editorView = null;
let runtime = null;
let runtimeBoot = null;
let runtimeFailure = "";
let installHash = "";
let mountedPaths = new Set();
let serverProcess = null;
let serverUrl = "";
let serverReadyWaiter = null;
let saveTimer = 0;
let isEntering = false;
let runBusy = false;
let editorModulesPromise = null;
let WebContainer;
let basicSetup;
let EditorView;
let EditorState;
let html;
let javascript;
let css;
let json;
let JSZip;
let editorTheme;
let initialized = false;

function loadEditorModules() {
  if (!editorModulesPromise) {
    editorModulesPromise = Promise.all([
      import("@webcontainer/api"),
      import("codemirror"),
      import("@codemirror/state"),
      import("@codemirror/lang-html"),
      import("@codemirror/lang-javascript"),
      import("@codemirror/lang-css"),
      import("@codemirror/lang-json"),
      import("jszip")
    ]).then((modules) => {
      WebContainer = modules[0].WebContainer;
      basicSetup = modules[1].basicSetup;
      EditorView = modules[1].EditorView;
      EditorState = modules[2].EditorState;
      html = modules[3].html;
      javascript = modules[4].javascript;
      css = modules[5].css;
      json = modules[6].json;
      JSZip = modules[7].default;
      editorTheme = EditorView.theme({
        "&": { height: "100%", color: "#d9eadb", backgroundColor: "#14251f", fontSize: "14px" },
        ".cm-scroller": { overflow: "auto", fontFamily: "Consolas, 'Cascadia Code', monospace", lineHeight: "1.6" },
        ".cm-content": { padding: "14px 12px", caretColor: "#dcf0ae" },
        ".cm-gutters": { backgroundColor: "#14251f", color: "#7f9989", border: "0" },
        ".cm-activeLine": { backgroundColor: "#20382e" },
        ".cm-activeLineGutter": { backgroundColor: "#20382e" },
        ".cm-selectionBackground, ::selection": { backgroundColor: "#4e7860 !important" },
        ".cm-cursor": { borderLeftColor: "#dff0b4" }
      }, { dark: true });
    }).catch((error) => {
      editorModulesPromise = null;
      throw error;
    });
  }
  return editorModulesPromise;
}

function createRecord() {
  return {
    version: 1,
    progress: { lessonIndex: 0, completed: [], mode: "playground", stepAttempts: {} },
    workspaces: { project: null, playground: {}, playgroundBaseline: {} }
  };
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeFiles(value) {
  const result = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  Object.keys(value).forEach((path) => {
    if (isAllowedProjectPath(path) && typeof value[path] === "string" && value[path].length <= 500000) {
      result[path] = value[path];
    }
  });
  return result;
}

const BLOCKED_PATH_SEGMENTS = new Set([
  ".", "..", "__proto__", "constructor", "prototype",
  "node_modules", ".angular", ".git", "dist", "coverage"
]);

function isAllowedProjectPath(path) {
  if (typeof path !== "string" || !path || path.length > 220 || path.startsWith("/") || path.includes("\\")) return false;
  const parts = path.split("/");
  if (parts.some((part) => !part || BLOCKED_PATH_SEGMENTS.has(part))) return false;
  return /\.(?:ts|html|css|scss|json|md|svg|txt)$/.test(path);
}

function cloneFiles(files) {
  return Object.assign({}, files || {});
}

function activeLesson() {
  if (!COURSE && typeof window !== "undefined" && window.ANGULAR_COURSE_DATA) {
    COURSE = window.ANGULAR_COURSE_DATA;
  }
  return COURSE && COURSE.lessons ? (COURSE.lessons[currentLessonIndex] || COURSE.lessons[0]) : null;
}

function formatNumber(value) {
  try { return Number(value).toLocaleString("ar-EG"); } catch { return String(value); }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function openDatabase() {
  if (!("indexedDB" in window)) return Promise.resolve(null);
  return new Promise((resolve) => {
    let request;
    try { request = indexedDB.open(DB_NAME, 1); }
    catch { resolve(null); return; }
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(DB_STORE)) database.createObjectStore(DB_STORE, { keyPath: "learnerId" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

let databasePromise;
function database() {
  if (!databasePromise) databasePromise = openDatabase();
  return databasePromise;
}

async function idbGet(id) {
  const db = await database();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const request = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    } catch { resolve(null); }
  });
}

async function idbPut(value) {
  const db = await database();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction(DB_STORE, "readwrite");
      transaction.objectStore(DB_STORE).put(value);
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => resolve(false);
      transaction.onabort = () => resolve(false);
    } catch { resolve(false); }
  });
}

function fallbackRead(id) {
  try { return JSON.parse(localStorage.getItem(FALLBACK_PREFIX + id) || "null"); }
  catch { return null; }
}

async function loadRecord(id) {
  const stored = await idbGet(id) || fallbackRead(id);
  const clean = createRecord();
  if (!stored || typeof stored !== "object") return clean;
  if (stored.progress && typeof stored.progress === "object") {
    const index = Number.isInteger(stored.progress.lessonIndex) ? stored.progress.lessonIndex : 0;
    clean.progress.lessonIndex = Math.max(0, Math.min(COURSE.lessons.length - 1, index));
    clean.progress.completed = Array.isArray(stored.progress.completed)
      ? [...new Set(stored.progress.completed.filter((id) => COURSE.lessons.some((lesson) => lesson.id === id)))].slice(0, COURSE.lessons.length)
      : [];
    clean.progress.mode = stored.progress.mode === "project" ? "project" : "playground";
    clean.progress.stepAttempts = (stored.progress.stepAttempts && typeof stored.progress.stepAttempts === "object" && !Array.isArray(stored.progress.stepAttempts)) ? stored.progress.stepAttempts : {};
  }
  const spaces = stored.workspaces || {};
  clean.workspaces.project = normalizeFiles(spaces.project);
  if (spaces.playground && typeof spaces.playground === "object") {
    Object.keys(spaces.playground).slice(0, COURSE.lessons.length).forEach((lessonId) => {
      if (COURSE.lessons.some((lesson) => lesson.id === lessonId)) clean.workspaces.playground[lessonId] = normalizeFiles(spaces.playground[lessonId]);
    });
  }
  if (spaces.playgroundBaseline && typeof spaces.playgroundBaseline === "object") {
    Object.keys(spaces.playgroundBaseline).slice(0, COURSE.lessons.length).forEach((lessonId) => {
      if (COURSE.lessons.some((lesson) => lesson.id === lessonId)) clean.workspaces.playgroundBaseline[lessonId] = normalizeFiles(spaces.playgroundBaseline[lessonId]);
    });
  }
  return clean;
}

async function saveRecord() {
  const value = deepCopy(record);
  value.learnerId = learnerId;
  if (await idbPut(value)) {
    try { localStorage.removeItem(FALLBACK_PREFIX + learnerId); } catch {}
    return;
  }
  try { localStorage.setItem(FALLBACK_PREFIX + learnerId, JSON.stringify(value)); }
  catch { setRuntimeStatus("مساحة التخزين ممتلئة. نزّل ZIP لحفظ نسخة من ملفاتك.", "error"); }
}

function scheduleSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => { saveCurrentWorkspace(); void saveRecord(); }, 350);
}

function saveCurrentWorkspace() {
  if (!activePath || !editorView) return;
  currentFiles[activePath] = editorView.state.doc.toString();
  if (mode === "project") record.workspaces.project = cloneFiles(currentFiles);
  else {
    const lessonId = activeLesson().id;
    record.workspaces.playground[lessonId] = cloneFiles(currentFiles);
  }
}

function currentProfileId() {
  try { return window.LearnerProfiles.active().id || "default"; }
  catch { return "default"; }
}

function setRuntimeStatus(message, state = "") {
  const node = $("angularRuntimeStatus");
  node.textContent = message;
  node.dataset.state = state;
}

function appendTerminal(text) {
  const terminal = $("angularTerminal");
  const current = terminal.textContent === "سيظهر هنا تثبيت الحزم وأخطاء البناء ونتيجة الأوامر." ? "" : terminal.textContent;
  terminal.textContent = (current + String(text)).slice(-TERMINAL_LIMIT);
  terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
  $("angularTerminal").textContent = "";
}

function fileLanguage(path) {
  if (/\.html$/.test(path)) return html();
  if (/\.css$|\.scss$/.test(path)) return css();
  if (/\.json$/.test(path)) return json();
  if (/\.ts$|\.js$/.test(path)) return javascript({ typescript: /\.ts$/.test(path) });
  return [];
}

function languageTag(path) {
  if (path.endsWith(".ts")) return "TS";
  if (path.endsWith(".html")) return "HTML";
  if (path.endsWith(".css")) return "CSS";
  if (path.endsWith(".json")) return "JSON";
  if (path.endsWith(".md")) return "MD";
  return "FILE";
}

function renderFileTree() {
  const tree = $("angularFileTree");
  tree.textContent = "";
  const paths = Object.keys(currentFiles).sort((a, b) => a.localeCompare(b));
  paths.forEach((path) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "angular-file-item" + (path === activePath ? " active" : "");
    button.setAttribute("aria-current", path === activePath ? "page" : "false");
    button.title = path;
    button.innerHTML = '<span class="angular-file-type">' + languageTag(path) + '</span><span>' + escapeHtml(path) + "</span>";
    button.addEventListener("click", () => void selectFile(path));
    tree.appendChild(button);
  });
}

function renderEditorTabs() {
  const tabs = $("angularEditorTabs");
  tabs.textContent = "";
  const lesson = typeof activeLesson === "function" ? activeLesson() : null;
  const lessonFile = lesson ? (lesson.file || (lesson.steps && lesson.steps[0] && lesson.steps[0].file)) : null;
  Object.keys(currentFiles).sort((a, b) => a.localeCompare(b)).forEach((path) => {
    if (path !== activePath && path !== lessonFile && path !== "src/app/app.ts" && path !== "src/app/app.html" && path !== "src/app/app.css" && path !== "src/main.ts") return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "angular-editor-tab" + (path === activePath ? " active" : "");
    button.textContent = path.split("/").pop();
    button.title = path;
    button.addEventListener("click", () => void selectFile(path));
    tabs.appendChild(button);
  });
}

function findMatchingDelimiter(text, startIndex, openChar, closeChar) {
  let depth = 0;
  for (let i = startIndex; i < text.length; i++) {
    if (text[i] === openChar) depth++;
    else if (text[i] === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findMatchingParen(text, startParenIndex) {
  return findMatchingDelimiter(text, startParenIndex, "(", ")");
}

function findMatchingBrace(text, startBraceIndex) {
  return findMatchingDelimiter(text, startBraceIndex, "{", "}");
}

function findMatchingTagEnd(html, tagName, contentStartIndex) {
  const pattern = new RegExp('</?' + tagName + '(?=[\\s>/])(?:[^>"\']|"[^"]*"|\'[^\']*\')*>', 'gi');
  pattern.lastIndex = contentStartIndex;
  let depth = 1;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const fullTag = match[0];
    if (fullTag.startsWith('</')) {
      depth--;
      if (depth === 0) {
        return { closeStart: match.index, closeEnd: match.index + fullTag.length };
      }
    } else if (!fullTag.endsWith('/>')) {
      depth++;
    }
  }
  return null;
}

function isExpressionSafe(expr) {
  if (typeof expr !== "string") return false;
  const dangerousTokens = /\b(?:window|document|globalThis|fetch|XMLHttpRequest|localStorage|sessionStorage|indexedDB|eval|Function|import|process|location|cookie|constructor|__proto__)\b/i;
  return !dangerousTokens.test(expr);
}

function tokenizeSafeExpression(input) {
  const tokens = [];
  let i = 0;
  const len = input.length;
  while (i < len) {
    const ch = input[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/\d/.test(ch) || (ch === "." && /\d/.test(input[i + 1] || ""))) {
      let numStr = "";
      while (i < len && /[\d.]/.test(input[i])) { numStr += input[i]; i++; }
      tokens.push({ type: "NUMBER", value: Number(numStr) });
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      const q = ch; i++;
      let str = "";
      while (i < len && input[i] !== q) {
        if (input[i] === "\\" && i + 1 < len) { i++; str += input[i]; }
        else { str += input[i]; }
        i++;
      }
      if (i < len && input[i] === q) i++;
      tokens.push({ type: "STRING", value: str });
      continue;
    }
    const three = input.slice(i, i + 3);
    if (three === "===" || three === "!==") {
      tokens.push({ type: "OP", value: three }); i += 3; continue;
    }
    const two = input.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "&&", "||", "??"].includes(two)) {
      tokens.push({ type: "OP", value: two }); i += 2; continue;
    }
    if ("+-*/%<>!?:.,()[]{}".includes(ch)) {
      tokens.push({ type: "PUNCT", value: ch }); i++; continue;
    }
    if (/[a-zA-Z_$]/.test(ch)) {
      let id = "";
      while (i < len && /[a-zA-Z0-9_$]/.test(input[i])) { id += input[i]; i++; }
      if (id === "true") tokens.push({ type: "BOOLEAN", value: true });
      else if (id === "false") tokens.push({ type: "BOOLEAN", value: false });
      else if (id === "null") tokens.push({ type: "NULL", value: null });
      else if (id === "undefined") tokens.push({ type: "UNDEFINED", value: undefined });
      else tokens.push({ type: "IDENT", value: id });
      continue;
    }
    i++;
  }
  return tokens;
}

function evaluateSafeExpression(expr, scope = {}) {
  if (typeof expr !== "string" || !expr.trim()) return undefined;
  const dangerousTokens = /\b(?:window|document|globalThis|fetch|XMLHttpRequest|localStorage|sessionStorage|indexedDB|eval|Function|import|process|location|cookie)\b/i;
  if (dangerousTokens.test(expr)) return undefined;

  const tokens = tokenizeSafeExpression(expr);
  let pos = 0;

  function peek() { return tokens[pos]; }
  function consume(expected) {
    const tok = tokens[pos];
    if (expected && (!tok || (tok.value !== expected && tok.type !== expected))) {
      return null;
    }
    pos++;
    return tok;
  }

  function parseExpression() { return parseTernary(); }

  function parseTernary() {
    let expr = parseLogicalOr();
    if (peek() && peek().value === "?") {
      consume("?");
      const trueVal = parseExpression();
      consume(":");
      const falseVal = parseExpression();
      return expr ? trueVal : falseVal;
    }
    return expr;
  }

  function parseLogicalOr() {
    let left = parseLogicalAnd();
    while (peek() && (peek().value === "||" || peek().value === "??")) {
      const op = consume().value;
      const right = parseLogicalAnd();
      if (op === "||") left = left || right;
      else left = left ?? right;
    }
    return left;
  }

  function parseLogicalAnd() {
    let left = parseEquality();
    while (peek() && peek().value === "&&") {
      consume();
      const right = parseEquality();
      left = left && right;
    }
    return left;
  }

  function parseEquality() {
    let left = parseRelational();
    while (peek() && ["===", "!==", "==", "!="].includes(peek().value)) {
      const op = consume().value;
      const right = parseRelational();
      if (op === "===") left = left === right;
      else if (op === "!==") left = left !== right;
      else if (op === "==") left = left == right;
      else if (op === "!=") left = left != right;
    }
    return left;
  }

  function parseRelational() {
    let left = parseAdditive();
    while (peek() && ["<", "<=", ">", ">="].includes(peek().value)) {
      const op = consume().value;
      const right = parseAdditive();
      if (op === "<") left = left < right;
      else if (op === "<=") left = left <= right;
      else if (op === ">") left = left > right;
      else if (op === ">=") left = left >= right;
    }
    return left;
  }

  function parseAdditive() {
    let left = parseMultiplicative();
    while (peek() && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const right = parseMultiplicative();
      if (op === "+") left = left + right;
      else left = left - right;
    }
    return left;
  }

  function parseMultiplicative() {
    let left = parseUnary();
    while (peek() && ["*", "/", "%"].includes(peek().value)) {
      const op = consume().value;
      const right = parseUnary();
      if (op === "*") left = left * right;
      else if (op === "/") left = right !== 0 ? left / right : 0;
      else if (op === "%") left = left % right;
    }
    return left;
  }

  function parseUnary() {
    if (peek() && peek().value === "!") {
      consume("!");
      return !parseUnary();
    }
    if (peek() && peek().value === "+") {
      consume("+");
      return +parseUnary();
    }
    if (peek() && peek().value === "-") {
      consume("-");
      return -parseUnary();
    }
    return parsePostfix();
  }

  function parsePostfix() {
    let base = parsePrimary();
    while (peek()) {
      const tok = peek();
      if (tok.value === ".") {
        consume(".");
        const nextTok = consume();
        const prop = nextTok ? nextTok.value : "";
        if (prop === "__proto__" || prop === "constructor" || prop === "prototype") {
          base = undefined;
        } else {
          base = base != null ? base[prop] : undefined;
        }
      } else if (tok.value === "[") {
        consume("[");
        const key = parseExpression();
        consume("]");
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          base = undefined;
        } else {
          base = base != null ? base[key] : undefined;
        }
      } else if (tok.value === "(") {
        consume("(");
        const args = [];
        if (peek() && peek().value !== ")") {
          args.push(parseExpression());
          while (peek() && peek().value === ",") {
            consume(",");
            args.push(parseExpression());
          }
        }
        consume(")");
        if (typeof base === "function") {
          base = base(...args);
        }
      } else {
        break;
      }
    }
    return base;
  }

  function parsePrimary() {
    const tok = peek();
    if (!tok) return undefined;

    if (tok.type === "NUMBER" || tok.type === "STRING" || tok.type === "BOOLEAN") {
      consume();
      return tok.value;
    }
    if (tok.type === "NULL") { consume(); return null; }
    if (tok.type === "UNDEFINED") { consume(); return undefined; }

    if (tok.value === "(") {
      consume("(");
      const val = parseExpression();
      consume(")");
      return val;
    }

    if (tok.value === "[") {
      consume("[");
      const arr = [];
      if (peek() && peek().value !== "]") {
        arr.push(parseExpression());
        while (peek() && peek().value === ",") {
          consume(",");
          if (peek() && peek().value === "]") break;
          arr.push(parseExpression());
        }
      }
      consume("]");
      return arr;
    }

    if (tok.value === "{") {
      consume("{");
      const obj = {};
      if (peek() && peek().value !== "}") {
        do {
          const keyTok = consume();
          const key = keyTok ? keyTok.value : "";
          consume(":");
          const val = parseExpression();
          if (key !== "__proto__" && key !== "constructor" && key !== "prototype") {
            obj[key] = val;
          }
          if (peek() && peek().value === ",") consume(",");
          else break;
        } while (peek() && peek().value !== "}");
      }
      consume("}");
      return obj;
    }

    if (tok.type === "IDENT") {
      consume();
      const id = tok.value;
      if (id === "__proto__" || id === "constructor" || id === "prototype") return undefined;
      if (id === "Math") return Math;
      if (id === "Number") return Number;
      if (id === "String") return String;
      if (id === "Boolean") return Boolean;
      if (id === "Array") return Array;
      if (id === "parseInt") return parseInt;
      if (id === "parseFloat") return parseFloat;
      if (scope && Object.prototype.hasOwnProperty.call(scope, id)) return scope[id];
      if (scope && id in scope) return scope[id];
      return undefined;
    }

    consume();
    return undefined;
  }

  return parseExpression();
}

function evalTemplateCondition(condStr, scope) {
  if (!condStr) return true;
  let expr = condStr.trim();
  if (expr.includes(";")) {
    expr = expr.split(";")[0].trim();
  }
  if (!isExpressionSafe(expr)) {
    return false;
  }
  try {
    const result = evaluateSafeExpression(expr, scope);
    return Boolean(result);
  } catch {
    const clean = expr.trim();
    if (scope && scope[clean] !== undefined) return Boolean(scope[clean]);
    return false;
  }
}

function isInsideForBlock(text, pos) {
  let searchPos = 0;
  while (searchPos < pos) {
    const forIdx = text.indexOf("@for", searchPos);
    if (forIdx === -1 || forIdx >= pos) break;

    const openParen = text.indexOf("(", forIdx);
    if (openParen === -1 || text.slice(forIdx + 4, openParen).trim() !== "") {
      searchPos = forIdx + 4;
      continue;
    }

    const closeParen = findMatchingParen(text, openParen);
    if (closeParen === -1) {
      searchPos = openParen + 1;
      continue;
    }

    const openBrace = text.indexOf("{", closeParen);
    if (openBrace === -1 || text.slice(closeParen + 1, openBrace).trim() !== "") {
      searchPos = closeParen + 1;
      continue;
    }

    const closeBrace = findMatchingBrace(text, openBrace);
    if (closeBrace === -1) {
      searchPos = openBrace + 1;
      continue;
    }

    if (pos > openBrace && pos < closeBrace) {
      return true;
    }

    searchPos = closeBrace + 1;
  }
  return false;
}

function parseAndEvaluateIfBlocks(html, scope) {
  let result = html;
  const ifToken = "@if";
  let searchPos = 0;

  while (true) {
    const ifIndex = result.indexOf(ifToken, searchPos);
    if (ifIndex === -1) break;

    if (isInsideForBlock(result, ifIndex)) {
      searchPos = ifIndex + ifToken.length;
      continue;
    }

    const openParen = result.indexOf("(", ifIndex);
    if (openParen === -1 || result.slice(ifIndex + ifToken.length, openParen).trim() !== "") {
      searchPos = ifIndex + ifToken.length;
      continue;
    }

    const closeParen = findMatchingParen(result, openParen);
    if (closeParen === -1) { searchPos = openParen + 1; continue; }

    const cond = result.slice(openParen + 1, closeParen).trim();
    const openBrace = result.indexOf("{", closeParen);
    if (openBrace === -1 || result.slice(closeParen + 1, openBrace).trim() !== "") {
      searchPos = closeParen + 1;
      continue;
    }

    const closeBrace = findMatchingBrace(result, openBrace);
    if (closeBrace === -1) { searchPos = openBrace + 1; continue; }

    const branches = [{ cond, body: result.slice(openBrace + 1, closeBrace) }];
    let endOfBlock = closeBrace + 1;

    while (true) {
      const remaining = result.slice(endOfBlock);
      const elseIfMatch = remaining.match(/^\s*@else\s+if\s*\(/);
      if (elseIfMatch) {
        const branchOpenParen = endOfBlock + elseIfMatch[0].length - 1;
        const branchCloseParen = findMatchingParen(result, branchOpenParen);
        if (branchCloseParen !== -1) {
          const branchOpenBrace = result.indexOf("{", branchCloseParen);
          if (branchOpenBrace !== -1 && result.slice(branchCloseParen + 1, branchOpenBrace).trim() === "") {
            const branchCloseBrace = findMatchingBrace(result, branchOpenBrace);
            if (branchCloseBrace !== -1) {
              branches.push({
                cond: result.slice(branchOpenParen + 1, branchCloseParen).trim(),
                body: result.slice(branchOpenBrace + 1, branchCloseBrace)
              });
              endOfBlock = branchCloseBrace + 1;
              continue;
            }
          }
        }
      }

      const elseMatch = remaining.match(/^\s*@else\s*\{/);
      if (elseMatch) {
        const elseOpenBrace = endOfBlock + elseMatch[0].length - 1;
        const elseCloseBrace = findMatchingBrace(result, elseOpenBrace);
        if (elseCloseBrace !== -1) {
          branches.push({
            cond: "true",
            body: result.slice(elseOpenBrace + 1, elseCloseBrace)
          });
          endOfBlock = elseCloseBrace + 1;
        }
      }
      break;
    }

    let selectedBody = "";
    for (const b of branches) {
      if (evalTemplateCondition(b.cond, scope)) {
        selectedBody = b.body;
        break;
      }
    }

    if (selectedBody.includes("@if")) {
      selectedBody = parseAndEvaluateIfBlocks(selectedBody, scope);
    }

    result = result.slice(0, ifIndex) + selectedBody + result.slice(endOfBlock);
    searchPos = ifIndex + selectedBody.length;
  }

  return result;
}

function parseAndEvaluateForBlocks(html, scope) {
  let result = html;
  const forToken = "@for";
  let searchPos = 0;

  while (true) {
    const forIndex = result.indexOf(forToken, searchPos);
    if (forIndex === -1) break;

    const openParen = result.indexOf("(", forIndex);
    if (openParen === -1 || result.slice(forIndex + forToken.length, openParen).trim() !== "") {
      searchPos = forIndex + forToken.length;
      continue;
    }

    const closeParen = findMatchingParen(result, openParen);
    if (closeParen === -1) { searchPos = openParen + 1; continue; }

    const header = result.slice(openParen + 1, closeParen).trim();
    const openBrace = result.indexOf("{", closeParen);
    if (openBrace === -1 || result.slice(closeParen + 1, openBrace).trim() !== "") {
      searchPos = closeParen + 1;
      continue;
    }

    const closeBrace = findMatchingBrace(result, openBrace);
    if (closeBrace === -1) { searchPos = openBrace + 1; continue; }

    const forBody = result.slice(openBrace + 1, closeBrace);
    let endOfBlock = closeBrace + 1;

    let emptyBody = "";
    const remaining = result.slice(endOfBlock);
    const emptyMatch = remaining.match(/^\s*@empty\s*\{/);
    if (emptyMatch) {
      const emptyOpenBrace = endOfBlock + emptyMatch[0].length - 1;
      const emptyCloseBrace = findMatchingBrace(result, emptyOpenBrace);
      if (emptyCloseBrace !== -1) {
        emptyBody = result.slice(emptyOpenBrace + 1, emptyCloseBrace);
        endOfBlock = emptyCloseBrace + 1;
      }
    }

    const headerMatch = header.match(/^([a-zA-Z0-9_$]+)\s+of\s+([a-zA-Z0-9_$.()]+)/);
    let renderedItems = "";
    if (headerMatch) {
      const itemVar = headerMatch[1];
      const collName = headerMatch[2].replace(/\(\)/g, "").trim();
      let collection = scope[collName];
      if (!Array.isArray(collection)) {
        if (collName.includes("seat")) collection = scope.seats;
        else if (collName.includes("movie")) collection = scope.movies;
        else collection = [{ id: 1, name: "عنصر 1", title: "عنصر 1" }, { id: 2, name: "عنصر 2", title: "عنصر 2" }];
      }

      if (collection && collection.length > 0) {
        renderedItems = collection.map((item, idx) => {
          let itemHtml = forBody;
          const itemScope = { ...scope, [itemVar]: item, $index: idx, $count: collection.length };

          if (itemHtml.includes("@if")) {
            itemHtml = parseAndEvaluateIfBlocks(itemHtml, itemScope);
          }
          if (itemHtml.includes("@switch")) {
            itemHtml = parseAndEvaluateSwitchBlocks(itemHtml, itemScope);
          }

          if (typeof item === "object" && item !== null) {
            Object.keys(item).forEach((prop) => {
              const propRe = new RegExp(`\\{\\{\\s*${itemVar}\\.${prop}\\s*\\}\\}`, "g");
              itemHtml = itemHtml.replace(propRe, escapeHtml(String(item[prop])));
            });
          }
          itemHtml = itemHtml.replace(new RegExp(`\\{\\{\\s*${itemVar}\\s*\\}\\}`, "g"), escapeHtml(String(item)));
          itemHtml = itemHtml.replace(/\{\{\s*\$index\s*\}\}/g, String(idx));
          itemHtml = itemHtml.replace(/\{\{\s*\$count\s*\}\}/g, String(collection.length));
          return itemHtml;
        }).join("");
      } else {
        renderedItems = emptyBody || "<p class='empty-notice'>لا توجد عناصر لعرضها حاليًا.</p>";
        if (renderedItems.includes("@if")) {
          renderedItems = parseAndEvaluateIfBlocks(renderedItems, scope);
        }
      }
    }

    result = result.slice(0, forIndex) + renderedItems + result.slice(endOfBlock);
    searchPos = forIndex + renderedItems.length;
  }

  return result;
}

function parseAndEvaluateSwitchBlocks(html, scope) {
  let result = html;
  const switchToken = "@switch";
  let searchPos = 0;

  while (true) {
    const swIndex = result.indexOf(switchToken, searchPos);
    if (swIndex === -1) break;

    const openParen = result.indexOf("(", swIndex);
    if (openParen === -1 || result.slice(swIndex + switchToken.length, openParen).trim() !== "") {
      searchPos = swIndex + switchToken.length;
      continue;
    }

    const closeParen = findMatchingParen(result, openParen);
    if (closeParen === -1) { searchPos = openParen + 1; continue; }

    const switchExpr = result.slice(openParen + 1, closeParen).trim();
    const openBrace = result.indexOf("{", closeParen);
    if (openBrace === -1 || result.slice(closeParen + 1, openBrace).trim() !== "") {
      searchPos = closeParen + 1;
      continue;
    }

    const closeBrace = findMatchingBrace(result, openBrace);
    if (closeBrace === -1) { searchPos = openBrace + 1; continue; }

    const switchBody = result.slice(openBrace + 1, closeBrace);
    const endOfBlock = closeBrace + 1;

    const cleanExpr = switchExpr.replace(/\(\)/g, "");
    let switchVal = scope[cleanExpr] !== undefined ? scope[cleanExpr] : cleanExpr;
    if (typeof switchVal === "string" && /^['"].*['"]$/.test(switchVal)) switchVal = switchVal.slice(1, -1);

    let selectedCase = "";
    let defaultCase = "";
    let matched = false;

    let bPos = 0;
    while (bPos < switchBody.length) {
      const caseIdx = switchBody.indexOf("@case", bPos);
      const defIdx = switchBody.indexOf("@default", bPos);

      if (caseIdx === -1 && defIdx === -1) break;

      if (caseIdx !== -1 && (defIdx === -1 || caseIdx < defIdx)) {
        const openParen = switchBody.indexOf("(", caseIdx);
        if (openParen === -1 || switchBody.slice(caseIdx + 5, openParen).trim() !== "") {
          bPos = caseIdx + 5;
          continue;
        }

        const closeParen = findMatchingParen(switchBody, openParen);
        if (closeParen === -1) { bPos = openParen + 1; continue; }

        let caseVal = switchBody.slice(openParen + 1, closeParen).trim();
        if (/^['"].*['"]$/.test(caseVal)) caseVal = caseVal.slice(1, -1);

        const openBrace = switchBody.indexOf("{", closeParen);
        if (openBrace === -1 || switchBody.slice(closeParen + 1, openBrace).trim() !== "") {
          bPos = closeParen + 1;
          continue;
        }

        const closeBrace = findMatchingBrace(switchBody, openBrace);
        if (closeBrace === -1) { bPos = openBrace + 1; continue; }

        const caseBody = switchBody.slice(openBrace + 1, closeBrace);
        if (String(caseVal) === String(switchVal) && !matched) {
          selectedCase = caseBody;
          matched = true;
        }
        bPos = closeBrace + 1;
      } else if (defIdx !== -1) {
        const openBrace = switchBody.indexOf("{", defIdx);
        if (openBrace === -1 || switchBody.slice(defIdx + 8, openBrace).trim() !== "") {
          bPos = defIdx + 8;
          continue;
        }

        const closeBrace = findMatchingBrace(switchBody, openBrace);
        if (closeBrace === -1) { bPos = openBrace + 1; continue; }

        defaultCase = switchBody.slice(openBrace + 1, closeBrace);
        bPos = closeBrace + 1;
      }
    }

    const finalOutput = matched ? selectedCase : defaultCase;
    result = result.slice(0, swIndex) + finalOutput + result.slice(endOfBlock);
    searchPos = swIndex + finalOutput.length;
  }

  return result;
}

function parseAndEvaluateDeferBlocks(html) {
  let result = html;
  const deferToken = "@defer";
  let searchPos = 0;

  while (true) {
    const defIndex = result.indexOf(deferToken, searchPos);
    if (defIndex === -1) break;

    let openBrace = result.indexOf("{", defIndex);
    if (openBrace === -1) { searchPos = defIndex + deferToken.length; continue; }

    const closeBrace = findMatchingBrace(result, openBrace);
    if (closeBrace === -1) { searchPos = openBrace + 1; continue; }

    const deferBody = result.slice(openBrace + 1, closeBrace);
    let endOfBlock = closeBrace + 1;

    const remaining = result.slice(endOfBlock);
    const phMatch = remaining.match(/^\s*@placeholder(?:\s*\([^)]*\))?\s*\{/);
    if (phMatch) {
      const phOpen = endOfBlock + phMatch[0].length - 1;
      const phClose = findMatchingBrace(result, phOpen);
      if (phClose !== -1) endOfBlock = phClose + 1;
    }

    const ldMatch = result.slice(endOfBlock).match(/^\s*@loading(?:\s*\([^)]*\))?\s*\{/);
    if (ldMatch) {
      const ldOpen = endOfBlock + ldMatch[0].length - 1;
      const ldClose = findMatchingBrace(result, ldOpen);
      if (ldClose !== -1) endOfBlock = ldClose + 1;
    }

    result = result.slice(0, defIndex) + deferBody + result.slice(endOfBlock);
    searchPos = defIndex + deferBody.length;
  }

  return result;
}

function parseAndEvaluateClassicDirectives(html, scope) {
  let result = html;

  // 1. *ngIf="cond" (including ; else ... and balanced nested same-tag matching)
  // 1a. Self-closing tags with *ngIf: <img *ngIf="cond" ... />
  result = result.replace(/<([a-zA-Z0-9-]+)((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)\*ngIf\s*=\s*(["'])([\s\S]*?)\3((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)\/>/gi, (match, tag, before, quote, cond, after) => {
    const cleanCond = cond.split(";")[0].trim();
    const isVisible = evalTemplateCondition(cleanCond, scope);
    if (!isVisible) return "";
    return `<${tag}${before}${after} />`;
  });

  // 1b. Non-self-closing tags with balanced tag matching
  let searchPos = 0;
  while (true) {
    const openTagRegex = /<([a-zA-Z0-9-]+)((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)\*ngIf\s*=\s*(["'])([\s\S]*?)\3((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)>/i;
    const match = openTagRegex.exec(result.slice(searchPos));
    if (!match) break;

    const matchStart = searchPos + match.index;
    const matchEnd = matchStart + match[0].length;
    const tag = match[1];
    const beforeAttr = match[2];
    const quote = match[3];
    const cond = match[4];
    const afterAttr = match[5];

    const cleanCond = cond.split(";")[0].trim();
    const isVisible = evalTemplateCondition(cleanCond, scope);

    const endTagInfo = findMatchingTagEnd(result, tag, matchEnd);
    if (!endTagInfo) {
      searchPos = matchEnd;
      continue;
    }

    if (!isVisible) {
      result = result.slice(0, matchStart) + result.slice(endTagInfo.closeEnd);
      searchPos = matchStart;
    } else {
      let cleanedAttrs = `${beforeAttr} ${afterAttr}`.replace(/\s+/g, " ").trim();
      if (cleanedAttrs) cleanedAttrs = " " + cleanedAttrs;
      const cleanedOpenTag = `<${tag}${cleanedAttrs}>`;
      result = result.slice(0, matchStart) + cleanedOpenTag + result.slice(matchEnd);
      searchPos = matchStart + cleanedOpenTag.length;
    }
  }

  // 2. *ngFor="let item of items; let i = index" or *ngFor="let item of items"
  result = result.replace(/<([a-zA-Z0-9-]+)([^>]*?)\*ngFor\s*=\s*(["'])let\s+([a-zA-Z0-9_$]+)\s+of\s+([a-zA-Z0-9_$.]+)(?:\s*;\s*let\s+([a-zA-Z0-9_$]+)\s*=\s*index)?\3([^>]*?)>([\s\S]*?)<\/\1>/gi, (match, tag, before, quote, itemVar, collName, indexVar, after, inner) => {
    let collection = scope[collName];
    if (!Array.isArray(collection)) {
      if (collName.includes("seat")) collection = scope.seats;
      else if (collName.includes("movie")) collection = scope.movies;
      else collection = [{ id: 1, name: "عنصر 1", title: "عنصر 1" }, { id: 2, name: "عنصر 2", title: "عنصر 2" }];
    }
    if (!collection || collection.length === 0) return "";
    return collection.map((item, idx) => {
      let itemInner = inner;
      if (typeof item === "object" && item !== null) {
        Object.keys(item).forEach((k) => {
          itemInner = itemInner.replace(new RegExp(`\\{\\{\\s*${itemVar}\\.${k}\\s*\\}\\}`, "g"), escapeHtml(String(item[k])));
        });
      }
      itemInner = itemInner.replace(new RegExp(`\\{\\{\\s*${itemVar}\\s*\\}\\}`, "g"), escapeHtml(String(item)));
      if (indexVar) {
        itemInner = itemInner.replace(new RegExp(`\\{\\{\\s*${indexVar}\\s*\\}\\}`, "g"), String(idx));
      }
      return `<${tag}${before}${after}>${itemInner}</${tag}>`;
    }).join("\n");
  });

  // 3. [ngClass]="{ 'class1': cond1, 'class2': cond2 }"
  result = result.replace(/<([a-zA-Z0-9-]+)([^>]*?)\[ngClass\]\s*=\s*(["'])([\s\S]*?)\3([^>]*?)>/gi, (match, tag, before, quote, val, after) => {
    const braceMatch = val.match(/\{([\s\S]*)\}/);
    if (!braceMatch) return `<${tag}${before}${after}>`;
    const classObjStr = braceMatch[1];
    const addedClasses = [];
    classObjStr.split(",").forEach((pair) => {
      const parts = pair.split(":");
      if (parts.length >= 2) {
        const className = parts[0].trim().replace(/^['"]|['"]$/g, "");
        const cond = parts.slice(1).join(":").trim();
        if (evalTemplateCondition(cond, scope)) {
          addedClasses.push(className);
        }
      }
    });
    let allAttrs = (before + " " + after).replace(/\s+/g, " ").trim();
    if (addedClasses.length) {
      const sanitizedClasses = addedClasses.map((c) => escapeHtml(c)).join(" ");
      const classMatch = allAttrs.match(/class\s*=\s*(["'])([\s\S]*?)\1/);
      if (classMatch) {
        const merged = `${classMatch[2]} ${sanitizedClasses}`.trim();
        allAttrs = allAttrs.replace(classMatch[0], () => `class="${merged}"`);
      } else {
        allAttrs = `class="${sanitizedClasses}"${allAttrs ? " " + allAttrs : ""}`;
      }
    }
    return `<${tag}${allAttrs ? " " + allAttrs : ""}>`;
  });

  return result;
}

function renderTypeScriptPreviewDoc(code, filePath) {
  const fileName = filePath ? filePath.split("/").pop() : "code.ts";
  const interfaces = [];
  const ifaceRegex = /(?:export\s+)?interface\s+([a-zA-Z0-9_]+(?:\s*<[^>]+>)?)(?:\s+extends\s+[^{]+)?\s*\{([\s\S]*?)\}/g;
  let match;
  while ((match = ifaceRegex.exec(code)) !== null) {
    const name = match[1];
    const fields = match[2].split("\n")
      .map((l) => l.trim().replace(/;$/, ""))
      .filter((l) => l && !l.startsWith("//") && !l.startsWith("/*"))
      .map((line) => {
        const parts = line.split(":");
        return { name: parts[0] ? parts[0].trim() : "", type: parts.slice(1).join(":") ? parts.slice(1).join(":").trim() : "any" };
      });
    interfaces.push({ name, fields });
  }

  const types = [];
  const typeRegex = /(?:export\s+)?type\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/g;
  while ((match = typeRegex.exec(code)) !== null) {
    types.push({ name: match[1], definition: match[2].trim() });
  }

  const variables = [];
  const varRegex = /(?:export\s+)?(?:const|let|var|readonly)\s+([a-zA-Z0-9_$]+)(?:\s*:\s*([^=;]+))?\s*=\s*([^;]+);/g;
  while ((match = varRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      type: match[2] ? match[2].trim() : "تلقائي (Inferred)",
      value: match[3].trim()
    });
  }

  const classes = [];
  const classRegex = /(?:export\s+)?class\s+([a-zA-Z0-9_]+)(?:[^{]+)?\s*\{([\s\S]*?)\}/g;
  while ((match = classRegex.exec(code)) !== null) {
    classes.push({ name: match[1] });
  }

  const functions = [];
  const fnRegex = /(?:export\s+)?function\s+([a-zA-Z0-9_]+)\s*((?:<[^>]+>\s*)?\([^)]*\)(?:\s*:\s*[^{]+)?)/g;
  while ((match = fnRegex.exec(code)) !== null) {
    functions.push({ name: match[1], signature: match[2].trim() });
  }

  const enums = [];
  const enumRegex = /(?:export\s+)?enum\s+([a-zA-Z0-9_]+)\s*\{([\s\S]*?)\}/g;
  while ((match = enumRegex.exec(code)) !== null) {
    const rawVals = match[2].split(",").map((v) => v.trim().replace(/;$/, "")).filter((v) => v && !v.startsWith("//") && !v.startsWith("/*"));
    enums.push({ name: match[1], values: rawVals });
  }

  const logs = [];
  const logRegex = /console\.log\s*\(([\s\S]*?)\);?/g;
  while ((match = logRegex.exec(code)) !== null) {
    const rawArg = match[1].trim();
    const foundVar = variables.find((v) => v.name === rawArg);
    if (foundVar) {
      logs.push(foundVar.value);
    } else {
      logs.push(rawArg);
    }
  }

  const tsThemeCss = `
    body { margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Consolas, monospace; background: #0c1813; color: #e2ede6; direction: rtl; }
    .ts-container { max-width: 620px; margin: 0 auto; }
    .ts-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #13271f; border-radius: 10px; border: 1px solid #234435; margin-bottom: 14px; }
    .ts-header-title { display: flex; align-items: center; gap: 10px; font-weight: bold; color: #6ee7b7; font-size: 15px; }
    .ts-badge-file { background: #1f3b2f; color: #a7f3d0; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-family: Consolas, monospace; direction: ltr; }
    .ts-card { background: #12231b; border: 1px solid #1f3a2d; border-radius: 10px; padding: 14px; margin-bottom: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); }
    .ts-card h3 { margin: 0 0 10px; font-size: 14px; color: #93c5fd; display: flex; align-items: center; gap: 8px; }
    .ts-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .ts-table th { text-align: right; color: #9ca3af; padding: 6px 8px; border-bottom: 1px solid #234335; }
    .ts-table td { padding: 8px; border-bottom: 1px solid #1a3327; }
    .ts-pill-type { display: inline-block; padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: bold; font-family: Consolas, monospace; background: #1e3a5f; color: #93c5fd; direction: ltr; }
    .ts-pill-var { display: inline-block; padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: bold; font-family: Consolas, monospace; background: #1b4332; color: #a7f3d0; direction: ltr; }
    .ts-pill-val { color: #fde047; font-family: Consolas, monospace; direction: ltr; }
    .ts-console-box { background: #070e0b; border: 1px solid #1f3b2d; border-radius: 8px; overflow: hidden; margin-top: 6px; }
    .ts-console-top { background: #10211a; padding: 6px 12px; font-size: 12px; color: #8fa99b; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1c3629; }
    .ts-dots { display: flex; gap: 5px; }
    .ts-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .ts-dot.r { background: #ef4444; } .ts-dot.y { background: #eab308; } .ts-dot.g { background: #22c55e; }
    .ts-console-content { padding: 12px; font-family: Consolas, monospace; font-size: 13px; line-height: 1.6; min-height: 60px; direction: ltr; text-align: left; }
    .ts-log-line { color: #a7f3d0; margin-bottom: 4px; display: flex; gap: 8px; }
    .ts-log-prompt { color: #3b82f6; user-select: none; }
    .ts-empty-hint { color: #6b7280; font-size: 12px; font-style: italic; direction: rtl; text-align: right; }
    .ts-empty-state { text-align: center; padding: 24px 12px; color: #94a3b8; font-size: 13px; }
  `;

  let htmlContent = `
    <div class="ts-container">
      <div class="ts-header">
        <div class="ts-header-title">
          <span>🟦</span>
          <span>محاكي وفاحص TypeScript</span>
        </div>
        <span class="ts-badge-file">${escapeHtml(fileName)}</span>
      </div>
  `;

  if (!interfaces.length && !types.length && !variables.length && !classes.length && !functions.length && !enums.length && !logs.length) {
    htmlContent += `
      <div class="ts-card ts-empty-state">
        <p>اكتب واجهات أو أنواع أو متغيرات أو دوال في المحرر، وستظهر مخرجاتها وهيكلتها هنا لحظيًا!</p>
        <small style="color:#64748b;">(جرّب: export const title: string = 'سينما النجوم'; أو console.log('مرحباً'))</small>
      </div>
    `;
  }

  if (interfaces.length) {
    htmlContent += `
      <div class="ts-card">
        <h3>📋 الواجهات البرمجية (Interfaces)</h3>
        ${interfaces.map((iface) => `
          <div style="margin-bottom: 12px;">
            <b style="color:#67e8f9; font-family: Consolas, monospace;">interface ${escapeHtml(iface.name)}</b>
            <table class="ts-table" style="margin-top: 6px;">
              <thead>
                <tr><th>الحقل</th><th>نوع البيانات</th></tr>
              </thead>
              <tbody>
                ${iface.fields.map((f) => `
                  <tr>
                    <td style="font-family: Consolas, monospace; color:#f1f5f9;">${escapeHtml(f.name)}</td>
                    <td><span class="ts-pill-type">${escapeHtml(f.type)}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (types.length) {
    htmlContent += `
      <div class="ts-card">
        <h3>🏷️ الأنواع المستعارة (Type Aliases)</h3>
        <table class="ts-table">
          <thead><tr><th>الاسم</th><th>التعريف</th></tr></thead>
          <tbody>
            ${types.map((t) => `
              <tr>
                <td style="font-family: Consolas, monospace; color:#67e8f9;">${escapeHtml(t.name)}</td>
                <td><span class="ts-pill-type">${escapeHtml(t.definition)}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  if (variables.length) {
    htmlContent += `
      <div class="ts-card">
        <h3>📦 المتغيرات والقيم المصرّح بها</h3>
        <table class="ts-table">
          <thead><tr><th>المتغير</th><th>النوع</th><th>القيمة الابتدائية</th></tr></thead>
          <tbody>
            ${variables.map((v) => `
              <tr>
                <td><span class="ts-pill-var">${escapeHtml(v.name)}</span></td>
                <td><span class="ts-pill-type">${escapeHtml(v.type)}</span></td>
                <td><span class="ts-pill-val">${escapeHtml(v.value)}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  if (classes.length || functions.length || enums.length) {
    htmlContent += `
      <div class="ts-card">
        <h3>⚙️ الأصناف والدوال والتعدادات</h3>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${classes.map((c) => `<span class="ts-pill-type" style="background:#312e81; color:#c7d2fe;">class ${escapeHtml(c.name)}</span>`).join("")}
          ${functions.map((fn) => `<span class="ts-pill-type" style="background:#14532d; color:#bbf7d0;">function ${escapeHtml(fn.name)}${escapeHtml(fn.signature)}</span>`).join("")}
          ${enums.map((e) => `<span class="ts-pill-type" style="background:#701a75; color:#f5d0fe;">enum ${escapeHtml(e.name)}${e.values && e.values.length ? ` { ${escapeHtml(e.values.join(", "))} }` : ""}</span>`).join("")}
        </div>
      </div>
    `;
  }

  htmlContent += `
    <div class="ts-card">
      <h3>💻 شاشة الكونسول والمخرجات (Console Output)</h3>
      <div class="ts-console-box">
        <div class="ts-console-top">
          <div class="ts-dots">
            <span class="ts-dot r"></span><span class="ts-dot y"></span><span class="ts-dot g"></span>
          </div>
          <span>TypeScript Output Terminal</span>
        </div>
        <div class="ts-console-content">
          ${logs.length ? logs.map((l) => `<div class="ts-log-line"><span class="ts-log-prompt">&gt;</span><span>${escapeHtml(l)}</span></div>`).join("") : '<div class="ts-empty-hint">لم يُستدعَ console.log() بعد.. جرّب كتابة console.log(...) لرؤية ناتجك فورًا!</div>'}
        </div>
      </div>
    </div>
  </div>`;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>${tsThemeCss}</style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
}

function updateAngularSimulatedPreview() {
  if (serverUrl) return;
  const preview = $("angularPreview");
  if (!preview) return;

  const lesson = typeof activeLesson === "function" ? activeLesson() : null;
  const isTsPhase = Boolean(lesson && (
    (lesson.phase && (lesson.phase.includes("TypeScript") || lesson.phase.includes("تايب سكريبت") || lesson.phase.includes("التايب سكريبت"))) ||
    (lesson.id && lesson.id.startsWith("ng-ts-")) ||
    (lesson.module && lesson.module.includes("typescript"))
  ));

  const targetPath = activePath || (lesson && lesson.file) || "src/app/app.ts";
  const isPureTsFile = Boolean(targetPath.endsWith(".ts") && (
    targetPath.includes("/models/") ||
    targetPath.includes("/services/") ||
    targetPath.includes("/validators/") ||
    targetPath.includes("/guards/") ||
    targetPath.includes("/interceptors/") ||
    targetPath.includes("/store/") ||
    targetPath.endsWith("types.ts") ||
    targetPath.endsWith("pricing.utils.ts") ||
    (!currentFiles[targetPath.replace(/\.ts$/, ".html")] && targetPath !== "src/app/app.ts" && targetPath !== "src/main.ts")
  ));

  const isEditingHtmlTemplate = Boolean(currentFiles["src/app/app.html"] && (!currentFiles[targetPath] || !targetPath.endsWith(".ts") || targetPath === "src/app/app.ts"));
  if ((isTsPhase && !isEditingHtmlTemplate) || isPureTsFile) {
    const tsCode = currentFiles[targetPath] || (lesson && lesson.file && currentFiles[lesson.file]) || currentFiles["src/app/app.ts"] || "";
    const tsDoc = renderTypeScriptPreviewDoc(tsCode, targetPath);
    preview.sandbox = "allow-scripts allow-forms allow-modals";
    preview.srcdoc = tsDoc;
    $("angularPreviewStatus").textContent = "محاكي ومخرجات TypeScript";
    inspectAngularGentleTree();
    return;
  }

  const appHtml = currentFiles["src/app/app.html"] || "<main class='cinema-shell'><h1>{{ title }}</h1></main>";
  const appCss = currentFiles["src/app/app.css"] || "";
  const stylesCss = currentFiles["src/styles.css"] || "";
  const appTs = currentFiles["src/app/app.ts"] || "";
  const currentTs = (activePath && activePath.endsWith(".ts") ? currentFiles[activePath] : "") || "";
  const combinedTs = [appTs, currentTs].join("\n");

  const props = {
    title: "سينما النجوم",
    cinemaName: "سينما النجوم",
    description: "بوابتك لأروع عروض السينما الحصرية",
    heroBanner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    ticketCount: 1,
    totalPrice: 85,
    customerName: "ضيف السينما",
    isVip: false,
    isAvailable: true,
    movies: [
      { id: 1, title: "رحلة النجوم", time: "18:00", genre: "خيال علمي", rating: 4.8, price: 85, available: true },
      { id: 2, title: "واحة الأمل", time: "21:00", genre: "دراما", rating: 4.6, price: 75, available: true }
    ],
    seats: [
      { id: "A1", row: "A", number: 1, tier: "standard", price: 85, booked: false },
      { id: "A2", row: "A", number: 2, tier: "vip", price: 120, booked: true },
      { id: "A3", row: "A", number: 3, tier: "standard", price: 85, booked: false }
    ],
    cart: [],
    selectedSeats: []
  };

  // Dynamic property extraction from TS
  const propRegex = /(?:readonly\s+|public\s+|private\s+)?([a-zA-Z0-9_$]+)\s*(?::\s*[^=;]+)?\s*=\s*(['"][^'"]*['"]|\d+(?:\.\d+)?|true|false);/g;
  let pMatch;
  while ((pMatch = propRegex.exec(combinedTs)) !== null) {
    const key = pMatch[1];
    let val = pMatch[2].trim();
    if (/^['"].*['"]$/.test(val)) val = val.slice(1, -1);
    else if (val === "true") val = true;
    else if (val === "false") val = false;
    else if (!isNaN(Number(val))) val = Number(val);
    props[key] = val;
  }

  // Dynamic signals extraction: prop = signal(val)
  const sigRegex = /(?:readonly\s+|public\s+|private\s+)?([a-zA-Z0-9_$]+)\s*=\s*signal(?:<[^>]+>)?\s*\(/g;
  let sMatch;
  while ((sMatch = sigRegex.exec(combinedTs)) !== null) {
    const key = sMatch[1];
    const openParen = sigRegex.lastIndex - 1;
    const closeParen = findMatchingParen(combinedTs, openParen);
    if (closeParen === -1) continue;

    let raw = combinedTs.slice(openParen + 1, closeParen).trim();
    let parsed = raw;
    if (/^['"].*['"]$/.test(raw)) parsed = raw.slice(1, -1);
    else if (raw === "true") parsed = true;
    else if (raw === "false") parsed = false;
    else if (!isNaN(Number(raw))) parsed = Number(raw);
    else if ((raw.startsWith("[") && raw.endsWith("]")) || (raw.startsWith("{") && raw.endsWith("}"))) {
      try {
        parsed = evaluateSafeExpression(raw, {});
      } catch {
        try { parsed = JSON.parse(raw); } catch { parsed = raw.startsWith("[") ? [] : {}; }
      }
      if (parsed === undefined) {
        try { parsed = JSON.parse(raw); } catch { parsed = raw.startsWith("[") ? [] : {}; }
      }
    }
    props[key] = parsed;
  }

  // Dynamic computed signals extraction: prop = computed(...)
  const compScanRegex = /(?:readonly\s+|public\s+|private\s+)?([a-zA-Z0-9_$]+)\s*=\s*computed(?:<[^>]+>)?\s*\(/g;
  let cMatch;
  while ((cMatch = compScanRegex.exec(combinedTs)) !== null) {
    const key = cMatch[1];
    const openParen = compScanRegex.lastIndex - 1;
    const closeParen = findMatchingParen(combinedTs, openParen);
    if (closeParen === -1) continue;

    let body = combinedTs.slice(openParen + 1, closeParen).trim();
    body = body.replace(/^(?:\(\)\s*=>|function\s*\([^)]*\)\s*)/, "").trim();
    if (body.startsWith("{") && body.endsWith("}")) {
      body = body.slice(1, -1).trim();
    }
    body = body.replace(/^return\s+/, "").replace(/;+$/, "").trim();

    try {
      if (!isExpressionSafe(body)) {
        props[key] = 0;
        continue;
      }
      let evalExpr = body.replace(/this\.([a-zA-Z0-9_$]+)/g, "$1");
      const val = evaluateSafeExpression(evalExpr, props);
      props[key] = val !== undefined ? val : 0;
    } catch {
      props[key] = 0;
    }
  }

  // Dynamic model & input extraction
  const modelRegex = /([a-zA-Z0-9_$]+)\s*=\s*(?:model|input)(?:\.required)?(?:<[^>]+>)?\(\s*([\s\S]*?)\s*\);?/g;
  let mMatch;
  while ((mMatch = modelRegex.exec(combinedTs)) !== null) {
    const key = mMatch[1];
    let raw = mMatch[2].trim();
    if (/^['"].*['"]$/.test(raw)) raw = raw.slice(1, -1);
    else if (raw === "true") raw = true;
    else if (raw === "false") raw = false;
    else if (!isNaN(Number(raw))) raw = Number(raw);
    props[key] = raw;
  }

  if (props.title && !props.cinemaName) props.cinemaName = props.title;
  if (props.ticketCount !== undefined && (!props.totalPrice || props.totalPrice === 85)) {
    props.totalPrice = props.ticketCount * 85;
  }

  let renderedHtml = appHtml;

  // 1. Classic Directives (*ngIf, *ngFor, [ngClass])
  renderedHtml = parseAndEvaluateClassicDirectives(renderedHtml, props);

  // 2. Control Flow Parser (@if / @else if / @else)
  renderedHtml = parseAndEvaluateIfBlocks(renderedHtml, props);

  // 3. Control Flow Parser (@for / @empty)
  renderedHtml = parseAndEvaluateForBlocks(renderedHtml, props);

  // 4. Control Flow Parser (@switch / @case / @default)
  renderedHtml = parseAndEvaluateSwitchBlocks(renderedHtml, props);

  // 5. Control Flow Parser (@defer)
  renderedHtml = parseAndEvaluateDeferBlocks(renderedHtml);

  // 6. Property binding [src]
  renderedHtml = renderedHtml.replace(/\[src\]\s*=\s*['"]([^'"]+)['"]/g, (_, key) => {
    const val = props[key] !== undefined ? props[key] : key;
    return `src="${escapeHtml(String(val))}"`;
  });

  // 7. Property binding [disabled]
  renderedHtml = renderedHtml.replace(/\[disabled\]\s*=\s*['"]([^'"]+)['"]/g, (_, cond) => {
    return evalTemplateCondition(cond, props) ? "disabled" : "";
  });

  // 8. Interpolation: {{ obj.prop }}
  renderedHtml = renderedHtml.replace(/\{\{\s*([a-zA-Z0-9_$]+)\.([a-zA-Z0-9_$]+)\s*\}\}/g, (_, obj, prop) => {
    if (props[obj] && props[obj][prop] !== undefined) return escapeHtml(String(props[obj][prop]));
    return "";
  });

  // 9. Interpolation: {{ prop }} and {{ prop() }}
  renderedHtml = renderedHtml.replace(/\{\{\s*([a-zA-Z0-9_$]+)(?:\(\))?\s*\}\}/g, (_, key) => {
    if (props[key] !== undefined) return escapeHtml(String(props[key]));
    return "";
  });

  if (combinedTs.includes("seats = signal") && !renderedHtml.includes("seat-picker-grid")) {
    const seatsHtml = `
      <div class="seat-picker-section">
        <b>قاعة العرض · اختيار المقاعد:</b>
        <div class="seat-picker-grid">
          ${props.seats.map((s) => `<button type="button" class="cinema-seat ${s.booked ? 'booked' : 'available'}">${s.id}</button>`).join("")}
        </div>
      </div>
    `;
    renderedHtml += seatsHtml;
  }

  const defaultThemeCss = `
    body { margin: 0; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #0f1c16; color: #e4ece7; direction: rtl; }
    .cinema-shell { max-width: 580px; margin: 0 auto; background: #162720; border-radius: 12px; padding: 16px; border: 1px solid #233e31; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
    .cinema-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .cinema-mark { width: 38px; height: 38px; border-radius: 9px; background: #357a53; color: #fff; font-weight: bold; font-size: 20px; display: grid; place-items: center; }
    .cinema-heading h1 { margin: 0; font-size: 22px; color: #8ee2a8; }
    .cinema-banner { width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin: 10px 0; border: 1px solid #2b4b3c; }
    .cinema-desc, .cinema-tagline { color: #a4c4b2; font-size: 14px; line-height: 1.5; margin: 6px 0; }
    .btn-book, .btn-confirm { display: inline-block; padding: 8px 16px; border: none; border-radius: 8px; background: #357a53; color: white; font-weight: bold; cursor: pointer; margin-top: 8px; font-family: inherit; }
    .btn-book:hover, .btn-confirm:hover { background: #419666; }
    .btn-confirm:disabled { opacity: 0.45; cursor: not-allowed; }
    .ticket-summary { display: flex; justify-content: space-between; padding: 10px 14px; background: #1d332a; border-radius: 8px; margin: 12px 0; font-size: 15px; font-weight: bold; color: #b7e4c7; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 6px; }
    .badge.discount { background: #ffe082; color: #5d4037; }
    .badge.normal { background: #264639; color: #b7d5c5; }
    .movie-pill { display: inline-flex; flex-direction: column; padding: 8px 12px; background: #1e352b; border: 1px solid #2f5443; border-radius: 8px; margin: 4px; text-align: center; }
    .movie-pill b { color: #74c69d; font-size: 14px; }
    .movie-pill small { color: #8fa99b; font-size: 11px; margin-top: 2px; }
    .seat-field, .customer-input { width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 7px; border: 1px solid #325544; background: #112019; color: #e5eee8; margin-top: 8px; font-family: inherit; }
    .field-error { display: block; color: #ff8a80; font-size: 12px; margin-top: 4px; }
    .cinema-nav { display: flex; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #233e31; }
    .cinema-nav a { color: #8ea89a; text-decoration: none; font-size: 14px; padding: 4px 8px; border-radius: 6px; }
    .cinema-nav a.active { background: #2a483a; color: #8ee2a8; font-weight: bold; }
    .final-ticket-card { margin-top: 14px; padding: 12px 14px; border: 1px dashed #d4af37; background: #212c20; border-radius: 10px; color: #fbf5df; }
    .final-ticket-card h3 { margin: 0 0 6px; color: #ffd700; font-size: 17px; }
    .booking-confirmed { margin-top: 12px; padding: 10px 14px; background: #1b4332; border: 1px solid #40916c; border-radius: 8px; color: #d8f3dc; font-weight: bold; text-align: center; }
    .seat-picker-section { margin-top: 12px; }
    .seat-picker-grid { display: flex; gap: 8px; margin-top: 6px; }
    .cinema-seat { width: 38px; height: 36px; border-radius: 6px; border: 1px solid transparent; cursor: pointer; font-weight: bold; font-family: inherit; }
    .cinema-seat.available { background: #2d5a44; color: #d8eadb; }
    .cinema-seat.booked { background: #6c2d2d; color: #f5caca; cursor: not-allowed; }
  `;

  const doc = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    ${defaultThemeCss}
    ${stylesCss}
    ${appCss}
  </style>
</head>
<body>
  ${renderedHtml}
</body>
</html>`;

  preview.sandbox = "allow-scripts allow-forms allow-modals";
  preview.srcdoc = doc;
  $("angularPreviewStatus").textContent = "معاينة حية لتطبيق Angular";
  inspectAngularGentleTree();
}

function createEditor(path) {
  if (editorView) editorView.destroy();
  activePath = path;
  $("angularCurrentPath").textContent = path;
  const mount = $("angularCodeEditor");
  mount.textContent = "";
  if (EditorView && EditorState && basicSetup) {
    editorView = new EditorView({
      state: EditorState.create({
        doc: currentFiles[path] || "",
        extensions: [
          basicSetup,
          fileLanguage(path),
          editorTheme,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            currentFiles[activePath] = update.state.doc.toString();
            if (mode === "project") record.workspaces.project = cloneFiles(currentFiles);
            else record.workspaces.playground[activeLesson().id] = cloneFiles(currentFiles);
            scheduleSave();
            schedulePreviewUpdate();
            updateStepNavigation();
            if (runtime) scheduleRuntimeWrite(activePath, currentFiles[activePath]);
          })
        ]
      }),
      parent: mount
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.className = "angular-fallback-textarea";
    textarea.value = currentFiles[path] || "";
    textarea.spellcheck = false;
    textarea.style.cssText = "width:100%;height:100%;min-height:360px;border:0;background:#14251f;color:#d9eadb;font:14px/1.6 Consolas,monospace;padding:14px 12px;box-sizing:border-box;resize:none;outline:none;";
    textarea.oninput = () => {
      currentFiles[activePath] = textarea.value;
      if (mode === "project") record.workspaces.project = cloneFiles(currentFiles);
      else record.workspaces.playground[activeLesson().id] = cloneFiles(currentFiles);
      scheduleSave();
      schedulePreviewUpdate();
      updateStepNavigation();
      if (runtime) scheduleRuntimeWrite(activePath, currentFiles[activePath]);
    };
    mount.appendChild(textarea);
    editorView = {
      destroy: () => {},
      state: { doc: { toString: () => textarea.value } }
    };
  }
  renderFileTree();
  renderEditorTabs();
  updateAngularSimulatedPreview();
}

let previewDebounceTimer = 0;
function schedulePreviewUpdate() {
  window.clearTimeout(previewDebounceTimer);
  previewDebounceTimer = window.setTimeout(() => {
    updateAngularSimulatedPreview();
  }, 120);
}

let writeTimer = 0;
function scheduleRuntimeWrite(path, value) {
  window.clearTimeout(writeTimer);
  writeTimer = window.setTimeout(() => {
    if (runtime) runtime.fs.writeFile("/" + path, value).catch((error) => appendTerminal("\nتعذر تحديث الملف: " + error.message + "\n"));
  }, 160);
}

async function selectFile(path) {
  if (!Object.prototype.hasOwnProperty.call(currentFiles, path) || path === activePath) return;
  saveCurrentWorkspace();
  createEditor(path);
  $("angularWorkspaceName").textContent = mode === "project" ? "مشروعي · " + activeLesson().title : "Playground · " + activeLesson().title;
  await saveRecord();
}

function toMountTree(files) {
  const tree = {};
  Object.keys(files).forEach((path) => {
    const parts = path.split("/");
    let cursor = tree;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) cursor[part] = { file: { contents: files[path] } };
      else cursor = cursor[part] || (cursor[part] = { directory: {} }).directory;
    });
  });
  return tree;
}

async function removeMountedFiles() {
  if (!runtime) return;
  for (const path of mountedPaths) {
    try { await runtime.fs.rm("/" + path, { force: true, recursive: true }); }
    catch {}
  }
  mountedPaths.clear();
}

async function mountWorkspace(files) {
  if (!runtime) return;
  await removeMountedFiles();
  await runtime.mount(toMountTree(files));
  mountedPaths = new Set(Object.keys(files));
}

function streamProcessOutput(process, append = true) {
  return (async () => {
    const reader = process.output.getReader();
    let text = "";
    try {
      while (true) {
        const result = await reader.read();
        if (result.done) break;
        const chunk = new TextDecoder().decode(result.value);
        text += chunk;
        if (append) appendTerminal(chunk);
      }
    } catch (error) {
      if (append) appendTerminal("\nتعذر قراءة مخرجات الأمر: " + error.message + "\n");
    }
    return text;
  })();
}

async function runProcess(command, args, options = {}) {
  appendTerminal("\n$ " + command + " " + args.join(" ") + "\n");
  const process = await runtime.spawn(command, args, { cwd: "/", ...options });
  const output = streamProcessOutput(process);
  const [exitCode, text] = await Promise.all([process.exit, output]);
  return { exitCode, output: text };
}

async function ensureDependencies() {
  const hash = currentFiles["package.json"] || "";
  if (installHash === hash) return;
  setRuntimeStatus("تثبيت حزم Angular داخل المتصفح…", "working");
  const result = await runProcess("npm", ["install"]);
  if (result.exitCode !== 0) throw new Error("فشل npm install. راجع مخرجات الترمينال واتصال الإنترنت.");
  installHash = hash;
  setRuntimeStatus("الحزم جاهزة. ابدأ تشغيل المشروع.", "ready");
  await snapshotRuntime();
}

function assertRuntimeSupport() {
  const localHost = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname);
  if (!window.isSecureContext && !localHost) throw new Error("يلزم فتح خطوة عبر HTTPS أو localhost.");
  if (!window.crossOriginIsolated || typeof SharedArrayBuffer === "undefined") {
    throw new Error("المتصفح لم يفعّل COOP/COEP أو SharedArrayBuffer. استخدم Chrome أو Edge من عنوان HTTPS.");
  }
}

async function ensureRuntime() {
  if (runtime) {
    await ensureDependencies();
    return runtime;
  }
  if (runtimeFailure) throw new Error(runtimeFailure);
  assertRuntimeSupport();
  if (!runtimeBoot) {
    runtimeBoot = WebContainer.boot({ coep: "credentialless" }).then(async (instance) => {
      runtime = instance;
      $("angularFallback").hidden = true;
      runtime.on("server-ready", (port, url) => {
        serverUrl = url;
        $("angularPreview").sandbox = "allow-scripts allow-forms allow-same-origin allow-modals";
        $("angularPreview").src = url;
        $("angularPreviewStatus").textContent = "يعمل على المنفذ " + port;
        if (serverReadyWaiter) {
          serverReadyWaiter.resolve(url);
          serverReadyWaiter = null;
        }
        setRuntimeStatus("التطبيق يعمل في المعاينة.", "ready");
      });
      await mountWorkspace(currentFiles);
      await ensureDependencies();
      return instance;
    }).catch((error) => {
      runtimeFailure = error && error.message ? error.message : String(error);
      runtimeBoot = null;
      throw error;
    });
  }
  return runtimeBoot;
}

async function startDevServer() {
  await ensureRuntime();
  if (serverUrl) return serverUrl;
  if (serverReadyWaiter) return serverReadyWaiter.promise;
  serverReadyWaiter = {};
  serverReadyWaiter.promise = new Promise((resolve, reject) => {
    serverReadyWaiter.resolve = resolve;
    serverReadyWaiter.reject = reject;
    window.setTimeout(() => {
      if (serverReadyWaiter) {
        serverReadyWaiter = null;
        reject(new Error("لم يبدأ خادم Angular خلال المهلة. راجع مخرجات الترمينال."));
      }
    }, 120000);
  });
  setRuntimeStatus("تشغيل Angular CLI…", "working");
  serverProcess = await runtime.spawn("npm", ["start"], { cwd: "/" });
  void streamProcessOutput(serverProcess);
  return serverReadyWaiter.promise;
}

async function runBuild() {
  await ensureRuntime();
  await syncAllFiles();
  const result = await runProcess("npm", ["run", "build"]);
  if (result.exitCode !== 0) throw new Error("فشل البناء. أصلح الخطأ الظاهر في الترمينال ثم جرّب مرة أخرى.");
  await startDevServer();
  await snapshotRuntime();
  return result;
}

async function syncAllFiles() {
  if (!runtime) return;
  for (const [path, content] of Object.entries(currentFiles)) await runtime.fs.writeFile("/" + path, content);
}

async function snapshotRuntime() {
  if (!runtime) return;
  const snapshot = {};
  async function walk(path) {
    let entries;
    try { entries = await runtime.fs.readdir(path); }
    catch {
      try {
        const normalized = path.replace(/^\//, "");
        if (isAllowedProjectPath(normalized)) snapshot[normalized] = await runtime.fs.readFile(path, "utf8");
      } catch {}
      return;
    }
    for (const entry of entries) {
      if (["node_modules", ".angular", ".git", "dist", "coverage", ".cache"].includes(entry)) continue;
      const child = path === "/" ? "/" + entry : path + "/" + entry;
      await walk(child);
    }
  }
  await walk("/");
  if (Object.keys(snapshot).length) {
    currentFiles = normalizeFiles(snapshot);
    mountedPaths = new Set(Object.keys(currentFiles));
    renderFileTree();
    if (activePath && !currentFiles[activePath]) activePath = Object.keys(currentFiles).find((path) => path.endsWith(".ts")) || "src/app/app.ts";
    if (activePath && currentFiles[activePath] !== (editorView && editorView.state.doc.toString())) createEditor(activePath);
    if (mode === "project") record.workspaces.project = cloneFiles(currentFiles);
    else record.workspaces.playground[activeLesson().id] = cloneFiles(currentFiles);
    await saveRecord();
  }
}

function normalizeWhitespace(text) {
  return typeof text === "string"
    ? text.replace(/\s+/g, " ").replace(/\s*([;:,{}()[\]=<>])\s*/g, "$1").trim()
    : "";
}

function supportedTask(lesson) {
  const checks = lesson.edits && lesson.edits.length ? lesson.edits : [{ file: lesson.file, expected: lesson.expected }];
  return checks.every((check) => {
    if (!check.expected) return true;
    const content = currentFiles[check.file] || "";
    const list = Array.isArray(check.expected) ? check.expected : [check.expected];
    return list.every((expected) => {
      if (content.includes(expected)) return true;
      const normContent = normalizeWhitespace(content);
      const normExpected = normalizeWhitespace(expected);
      return normExpected ? normContent.includes(normExpected) : true;
    });
  });
}

function completedSet() {
  return new Set(record.progress.completed);
}

function firstIncompleteIndex() {
  const done = completedSet();
  const index = COURSE.lessons.findIndex((lesson) => !done.has(lesson.id));
  return index < 0 ? COURSE.lessons.length - 1 : index;
}

function renderRoadmap() {
  const host = $("angularLessonList");
  const query = $("angularLessonSearch").value.toLocaleLowerCase().trim();
  host.textContent = "";
  let previousPhase = "";
  const done = completedSet();
  const unlockedThrough = firstIncompleteIndex();
  COURSE.lessons.forEach((lesson, index) => {
    const matches = !query || (lesson.title + " " + lesson.phase + " " + lesson.concept + " " + lesson.task).toLocaleLowerCase().includes(query);
    if (!matches) return;
    if (lesson.phase !== previousPhase) {
      const phase = document.createElement("div");
      phase.className = "angular-road-group";
      phase.textContent = lesson.phase;
      host.appendChild(phase);
      previousPhase = lesson.phase;
    }
    const item = document.createElement("button");
    const isDone = done.has(lesson.id);
    const isRecommended = index === unlockedThrough;
    const isFuture = index > unlockedThrough && !isDone;
    item.type = "button";
    item.className = "angular-road-item" + (index === currentLessonIndex ? " current" : "") + (isDone ? " done" : "") + (isFuture ? " future-explore" : "");
    item.disabled = false;
    item.setAttribute("aria-current", index === currentLessonIndex ? "step" : "false");
    item.innerHTML = '<span class="angular-road-number">' + (isDone ? "✓" : formatNumber(index + 1)) + '</span><span class="angular-road-copy"><b>' + escapeHtml(lesson.title) + '</b><small>' + (isDone ? "اكتمل" : index === currentLessonIndex ? "أنت هنا" : isRecommended ? "الدرس الموصى به" : "درس قادم · يمكنك الاستكشاف") + "</small></span>";
    item.addEventListener("click", () => void selectLesson(index));
    host.appendChild(item);
  });
  const doneCount = done.size;
  $("angularRoadProgress").textContent = formatNumber(Math.round(doneCount * 100 / COURSE.lessons.length)) + "٪";
  $("angularCourseCount").textContent = formatNumber(doneCount) + " من " + formatNumber(COURSE.lessons.length) + " درسًا";
  $("angularCourseCard").textContent = "Angular · " + formatNumber(doneCount) + "/" + formatNumber(COURSE.lessons.length);
}

function lessonMixedMarkup(value) {
  if (typeof window !== "undefined" && typeof window.lessonMixedMarkup === "function") {
    return window.lessonMixedMarkup(value);
  }
  if (!value) return "";
  var normalized = String(value).replace(/<br\s*\/?>/gi, "\n");
  var codePattern = /(`[^`]+`|https?:\/\/[^\s]+|<!DOCTYPE[^>]*>|<\/?[A-Za-z][^>]*>|&(?:[a-zA-Z]+|#\d+|#x[a-fA-F0-9]+);|(?:\*|\[|\()[A-Za-z0-9_.-]+(?:\*|\]|\))(?:\s*=\s*(?:["'][^"']*["']|&quot;.*?&quot;))?|\b[A-Za-z_@:*#-][A-Za-z0-9_@:*#.-]*\s*=\s*(?:["'][^"']*["']|&quot;.*?&quot;)|"[A-Za-z0-9_#.:\s\/=><!~&|%^,;?@*()-]+"|'[^'\n]+'|\/\*[\s\S]*?\*\/|(?:\.[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)[^{}\n]*\{[^}\n]*\}|[a-zA-Z-]+\s*:\s*[^;\n]+;)/gi;
  var parts = normalized.split(codePattern);
  var out = parts.map(function(part) {
    if (!part) return "";
    if (/^`[^`]+`$/.test(part)) {
      return '<code dir="ltr" class="inline-code">' + escapeHtml(part.slice(1, -1)) + '</code>';
    }
    if (/^https?:\/\//i.test(part)) {
      return '<bdi dir="ltr">' + escapeHtml(part) + '</bdi>';
    }
    if (/^<!DOCTYPE/i.test(part) || /^<\/?[A-Za-z]/i.test(part)) {
      return '<bdi dir="ltr">' + escapeHtml(part) + '</bdi>';
    }
    if (/^&(?:[a-zA-Z]+|#\d+|#x[a-fA-F0-9]+);$/.test(part)) {
      return '<code dir="ltr" class="inline-code">' + part + '</code>';
    }
    if (/^[A-Za-z_@:*#-][A-Za-z0-9_@:*#.-]*\s*=\s*(?:["']|&quot;)/.test(part) || /^[\*\[\(]/.test(part) || /^["'][^"']+["']$/.test(part)) {
      var cleanPart = part.replace(/&quot;/g, '"');
      return '<code dir="ltr" class="inline-code">' + escapeHtml(cleanPart) + '</code>';
    }
    if (/^\/\*[\s\S]*?\*\/$/.test(part) || /\{[^}\n]*\}/.test(part) || /^[a-zA-Z-]+\s*:/.test(part)) {
      return '<code dir="ltr" class="inline-code">' + escapeHtml(part) + '</code>';
    }
    var escaped = escapeHtml(part);
    return escaped.replace(/(&(?:[a-zA-Z]+|#\d+|#x[a-fA-F0-9]+);)|(\b[A-Za-z][A-Za-z0-9]*(?:[-_.+#][A-Za-z0-9]+)*)/g, function(match, entity, word) {
      if (entity) return entity;
      return '<bdi dir="ltr">' + word + '</bdi>';
    });
  }).join("");
  return out.replace(/\r?\n/g, "<br>");
}

function isStepCompleted(step, lesson, files) {
  if (!step) return true;
  if (step.type === "observe") return true;
  if (step.type === "quiz") {
    return currentQuizSelected !== null && currentQuizSelected === step.correct;
  }
  const targetFile = step.file || (lesson && lesson.file);
  const expected = step.expected || step.code || (lesson && lesson.expected);
  if (!expected || !targetFile) return true;
  const content = (files || currentFiles)[targetFile] || "";
  const list = Array.isArray(expected) ? expected : [expected];
  return list.every((item) => {
    if (content.includes(item)) return true;
    const normContent = normalizeWhitespace(content);
    const normExpected = normalizeWhitespace(item);
    return normExpected ? normContent.includes(normExpected) : true;
  });
}

function updateStepNavigation() {
  const lesson = activeLesson();
  if (!lesson) return;
  const steps = Array.isArray(lesson.steps) && lesson.steps.length ? lesson.steps : [];
  const currentStep = steps[currentStepIndex];
  if (!currentStep) return;
  const complete = completedSet().has(lesson.id);

  const stepPrev = $("angularStepPrev");
  if (stepPrev) {
    stepPrev.disabled = currentStepIndex <= 0;
  }
  const stepNext = $("angularStepNext");
  if (stepNext) {
    const isCurrentComplete = isStepCompleted(currentStep, lesson, currentFiles);
    if (currentStepIndex < steps.length - 1) {
      stepNext.disabled = !isCurrentComplete;
      stepNext.textContent = currentStep.type === "quiz" && !isCurrentComplete
        ? "اختر الإجابة الصحيحة أولًا"
        : !isCurrentComplete
        ? "أكمل كود الخطوة أولًا ←"
        : "الخطوة التالية داخل الدرس ←";
    } else {
      stepNext.disabled = !complete && currentLessonIndex < COURSE.lessons.length - 1;
      stepNext.textContent = currentLessonIndex >= COURSE.lessons.length - 1 ? "اكتمل المسار ✓" : "أكملت خطوات الدرس · التالي ←";
    }
  }
}

function advanceStep() {
  const lesson = activeLesson();
  if (!lesson) return;
  const steps = Array.isArray(lesson.steps) && lesson.steps.length ? lesson.steps : [];
  const currentStep = steps[currentStepIndex];
  if (currentStep && !isStepCompleted(currentStep, lesson, currentFiles)) {
    const feedback = $("angularLessonFeedback");
    if (feedback) {
      feedback.textContent = currentStep.type === "quiz"
        ? "اختر الإجابة الصحيحة أولًا قبل الانتقال للخطوة التالية."
        : "الجزء المطلوب لم يظهر بعد في " + (currentStep.file || lesson.file || "الملف") + ". أضف الكود المطلوب ثم تابع.";
    }
    return;
  }
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    currentQuizSelected = null;
    renderLesson();
    updateStepContext();
  } else {
    if (completedSet().has(lesson.id) && currentLessonIndex < COURSE.lessons.length - 1) {
      void selectLesson(currentLessonIndex + 1);
    }
  }
}

function previousStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    currentQuizSelected = null;
    renderLesson();
    updateStepContext();
  }
}

function updateStepContext() {
  const lesson = activeLesson();
  if (!lesson) return;
  const steps = Array.isArray(lesson.steps) && lesson.steps.length ? lesson.steps : [];
  const currentStep = steps[currentStepIndex];
  if (currentStep && currentStep.file && currentFiles[currentStep.file] && activePath !== currentStep.file) {
    void selectFile(currentStep.file);
  }
  updateAngularSimulatedPreview();
}

let angularHandCraftScore = 20;
let lastAngularHandCraftMilestone = 0;

function updateAngularHandCraftScore(isManual = false, boost = 0) {
  if (boost) {
    angularHandCraftScore = Math.min(100, Math.max(10, angularHandCraftScore + boost));
  } else if (isManual) {
    angularHandCraftScore = Math.min(100, angularHandCraftScore + 3);
  }
  const meter = $("angularHandCraftMeter");
  if (!meter) return;
  meter.hidden = false;
  meter.textContent = "🔨 كتابتك بيدك (بناء يدوي): " + formatNumber(angularHandCraftScore) + "٪";
  let msg = "🌱 بداية واعدة.. مشروعك يبدأ بلمستك الخاصة.";
  if (angularHandCraftScore >= 85) msg = "🏆 مكون Angular مبني بحرفية يدوية وبصمتك الخاصة 100%!";
  else if (angularHandCraftScore >= 60) msg = "🔨 رائع! أنت تبني المكون خطوة بخطوة وتستوعب هندسته.";
  else if (angularHandCraftScore >= 35) msg = "✨ هذا السطر لم يأتِ من النسخ.. أنت تبني Angular بيدك.";
  meter.title = msg;
  meter.setAttribute("aria-label", "نسبة كتابتك بيدك: " + angularHandCraftScore + " بالمئة. " + msg);

  if ((angularHandCraftScore >= 35 && lastAngularHandCraftMilestone < 35) ||
      (angularHandCraftScore >= 60 && lastAngularHandCraftMilestone < 60) ||
      (angularHandCraftScore >= 85 && lastAngularHandCraftMilestone < 85)) {
    lastAngularHandCraftMilestone = angularHandCraftScore;
    if (meter.classList && typeof meter.classList.add === "function") {
      meter.classList.add("pulse");
      if (typeof setTimeout === "function") {
        setTimeout(() => meter.classList.remove("pulse"), 800);
      }
    }
    if (typeof document !== "undefined" && document.body && typeof document.createElement === "function") {
      const toast = document.createElement("div");
      toast.className = "hand-craft-toast";
      toast.textContent = msg;
      document.body.appendChild(toast);
      if (typeof setTimeout === "function") {
        setTimeout(() => toast.classList.add("fade-out"), 2000);
        setTimeout(() => toast.remove(), 2600);
      }
    }
  }
}

function inspectAngularGentleTree() {
  const guide = $("angularGentleTreeGuide");
  if (!guide) return;
  const htmlContent = currentFiles["src/app/app.html"] || "";
  const tsContent = currentFiles["src/app/app.ts"] || "";

  const signalMatches = [...tsContent.matchAll(/([a-zA-Z0-9_]+)\s*=\s*signal\(/g)].map(m => m[1]);
  for (const sig of signalMatches) {
    const badInterp = new RegExp("\\{\\{\\s*" + sig + "\\s*\\}\\}");
    if (badInterp.test(htmlContent)) {
      guide.hidden = false;
      guide.innerHTML = `
        <div class="gentle-tree-card">
          <div class="gentle-tree-head">
            <span class="gentle-tree-icon">🧭</span>
            <span>خريطة بنية Angular Signal</span>
          </div>
          <pre class="gentle-tree-diagram">src/app/app.html
 └── Template: {{ <span class="gentle-tree-target">${sig}()</span> }}
                    └── الأقواس () تقرأ القيمة الحية المتجددة للـ Signal</pre>
          <p class="gentle-tree-message">الـ Signal <code>${sig}</code> يحمل قيمة متجددة.. استخدم القوسين <code>${sig}()</code> ليقرأ القالب أحدث قيمة له بصورة تفاعلية.</p>
        </div>
      `;
      return;
    }
  }

  const badTag = htmlContent.match(/<(h[1-6]|p|button|div)\b[^>]*>(?![\s\S]*<\/\1>)/i);
  if (badTag) {
    const tagName = badTag[1].toLowerCase();
    guide.hidden = false;
    guide.innerHTML = `
      <div class="gentle-tree-card">
        <div class="gentle-tree-head">
          <span class="gentle-tree-icon">🌱</span>
          <span>اكتمال بنية قالب المكون</span>
        </div>
        <pre class="gentle-tree-diagram">&lt;${tagName}&gt; محتوى القالب &lt;/${tagName}&gt;
  └── <span class="gentle-tree-target">لا تنسَ وسم الإغلاق &lt;/${tagName}&gt;</span></pre>
        <p class="gentle-tree-message">الوسم <code>&lt;${tagName}&gt;</code> يبحث عن رفيقه <code>&lt;/${tagName}&gt;</code> ليغلق العنصر بنجاح داخل القالب.</p>
      </div>
    `;
    return;
  }

  guide.hidden = true;
  guide.innerHTML = "";
}

function renderAngularSlotBuilder(step, lesson) {
  const builder = $("angularSlotBuilder");
  if (!builder) return;
  if (!step || step.type === "quiz" || completedSet().has(lesson.id)) {
    builder.hidden = true;
    builder.innerHTML = "";
    return;
  }

  const targetFile = step.file || lesson.file || "src/app/app.html";
  const targetCode = step.code || step.example || lesson.code || "";
  if (!targetCode) {
    builder.hidden = true;
    builder.innerHTML = "";
    return;
  }

  builder.hidden = false;
  const isHtml = targetFile.endsWith(".html");
  const fileName = targetFile.split("/").pop();
  let stage1 = "ملف (" + fileName + ")";
  if (targetFile.endsWith(".html")) stage1 = "قالب المكون (" + fileName + ")";
  else if (targetFile.includes("models/")) stage1 = "نموذج البيانات (" + fileName + ")";
  else if (targetFile.includes("services/")) stage1 = "خدمة Angular (" + fileName + ")";
  else if (targetFile.includes("store/")) stage1 = "مستودع الحالة (" + fileName + ")";
  else if (targetFile.includes("routes")) stage1 = "مسارات التطبيق (" + fileName + ")";
  else if (targetFile.endsWith(".ts")) stage1 = "منطق الكود (" + fileName + ")";

  let stage2 = isHtml ? "عنصر واجهة المستخدم" : "خاصية أو دالة في الصنف";
  let tagOpen = "", tagClose = "", slotVal = targetCode;

  if (isHtml) {
    const m = targetCode.match(/^(<([a-zA-Z0-9-]+)[^>]*>)([\s\S]*?)(<\/\2>)$/);
    if (m) {
      tagOpen = m[1];
      tagClose = m[4];
      slotVal = m[3].trim() || "محتوى القالب";
      stage2 = `وسم <${m[2]}>`;
    }
  }

  const mIf = targetCode.match(/^@if\s*\(([\s\S]*?)\)\s*\{([\s\S]*?)\}\s*$/);
  const mFor = targetCode.match(/^@for\s*\(([\s\S]*?)\)\s*\{([\s\S]*?)\}\s*$/);
  const mSwitch = targetCode.match(/^@switch\s*\(([\s\S]*?)\)\s*\{([\s\S]*?)\}\s*$/);
  const mDefer = targetCode.match(/^@defer\s*(?:\(([\s\S]*?)\))?\s*\{([\s\S]*?)\}\s*$/);

  if (mIf) {
    stage2 = `شرط @if (${mIf[1].trim()})`;
    tagOpen = `@if (${mIf[1].trim()}) {\n  `;
    tagClose = `\n}`;
    slotVal = mIf[2].trim();
  } else if (mFor) {
    stage2 = `تكرار @for (${mFor[1].trim()})`;
    tagOpen = `@for (${mFor[1].trim()}) {\n  `;
    tagClose = `\n}`;
    slotVal = mFor[2].trim();
  } else if (mSwitch) {
    stage2 = `تبديل @switch (${mSwitch[1].trim()})`;
    tagOpen = `@switch (${mSwitch[1].trim()}) {\n  `;
    tagClose = `\n}`;
    slotVal = mSwitch[2].trim();
  } else if (mDefer) {
    const trigger = mDefer[1] ? ` (${mDefer[1].trim()})` : "";
    stage2 = `تحميل مؤجل @defer${trigger}`;
    tagOpen = `@defer${trigger} {\n  `;
    tagClose = `\n}`;
    slotVal = mDefer[2].trim();
  } else if (!isHtml) {
    const mSig = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*signal(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mComp = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*computed(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mInput = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*input(?:\.required)?(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mOutput = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*output(?:<[^>]+>)?\(([\s\S]*)\);?$/);
    const mModel = targetCode.match(/^([a-zA-Z0-9_]+)\s*=\s*model(?:<[^>]+>)?\(([\s\S]*)\);?$/);

    if (mSig) {
      stage2 = `إشارة Signal: ${mSig[1]}`;
      const prefix = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagOpen = prefix;
      tagClose = `);`;
      slotVal = mSig[2];
    } else if (mComp) {
      stage2 = `حساب مشتق computed: ${mComp[1]}`;
      const prefix = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagOpen = prefix;
      tagClose = `);`;
      slotVal = mComp[2];
    } else if (mInput) {
      stage2 = `مدخل Signal Input: ${mInput[1]}`;
      const prefix = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagOpen = prefix;
      tagClose = `);`;
      slotVal = mInput[2];
    } else if (mOutput) {
      stage2 = `مخرج Signal Output: ${mOutput[1]}`;
      const prefix = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagOpen = prefix;
      tagClose = `);`;
      slotVal = mOutput[2];
    } else if (mModel) {
      stage2 = `ربط ثنائي Signal Model: ${mModel[1]}`;
      const prefix = targetCode.substring(0, targetCode.indexOf("(") + 1);
      tagOpen = prefix;
      tagClose = `);`;
      slotVal = mModel[2];
    } else {
      const mInterface = targetCode.match(/^(?:export\s+)?interface\s+([a-zA-Z0-9_]+(?:\s*<[^>]+>)?)(?:\s+extends\s+[^{]+)?\s*\{([\s\S]*?)\}$/);
      const mType = targetCode.match(/^(?:export\s+)?type\s+([a-zA-Z0-9_]+(?:\s*<[^>]+>)?)\s*=\s*([\s\S]*?);?$/);
      const mClass = targetCode.match(/^(?:export\s+)?class\s+([a-zA-Z0-9_]+)(?:[^{]+)?\s*\{([\s\S]*?)\}$/);
      const mFn = targetCode.match(/^(?:export\s+)?function\s+([a-zA-Z0-9_]+)\s*((?:<[^>]+>\s*)?\([^)]*\)(?:\s*:\s*[^{]+)?)\s*\{([\s\S]*?)\}$/);
      const mEnum = targetCode.match(/^(?:export\s+)?enum\s+([a-zA-Z0-9_]+)\s*\{([\s\S]*?)\}$/);

      if (mInterface) {
        stage2 = `واجهة Interface: ${mInterface[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mInterface[2].trim();
      } else if (mType) {
        stage2 = `نوع مستعار Type Alias: ${mType[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("=") + 1);
        tagOpen = `${prefix} `;
        tagClose = `;`;
        slotVal = mType[2].trim();
      } else if (mClass) {
        stage2 = `صنف Class: ${mClass[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mClass[2].trim();
      } else if (mFn) {
        stage2 = `دالة Function: ${mFn[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mFn[3].trim();
      } else if (mEnum) {
        stage2 = `تعداد Enum: ${mEnum[1]}`;
        const prefix = targetCode.substring(0, targetCode.indexOf("{") + 1);
        tagOpen = `${prefix}\n  `;
        tagClose = `\n}`;
        slotVal = mEnum[2].trim();
      }
    }
  }

  builder.innerHTML = `
    <div class="slot-builder-container">
      <div class="slot-stages-bar">
        <span class="slot-stage-pill done">١. أين يعيش؟ ${escapeHtml(stage1)}</span>
        <span class="slot-stage-pill done">٢. الأداة: ${escapeHtml(stage2)}</span>
        <span class="slot-stage-pill active">٣. اترك بصمتك واكتب القيمة</span>
        <span class="slot-stage-pill">٤. شغّل وشاهد أثرك</span>
      </div>
      <div class="slot-block">
        ${tagOpen ? `<span>${escapeHtml(tagOpen)}</span>` : ''}
        <input type="text" class="slot-input" id="angularSlotInput" value="${escapeHtml(slotVal)}" aria-label="محتوى اللبنة البرمجية" />
        ${tagClose ? `<span>${escapeHtml(tagClose)}</span>` : ''}
        <button type="button" class="slot-btn-build" id="angularSlotApply">✅ ابنِ الكود وضع بصمتك في المحرر ↵</button>
      </div>
    </div>
  `;

  const applyBtn = $("angularSlotApply");
  if (applyBtn) {
    applyBtn.onclick = () => {
      const input = $("angularSlotInput");
      const customVal = input ? input.value : slotVal;
      const assembled = tagOpen || tagClose ? (tagOpen + customVal + tagClose) : customVal;
      
      void selectFile(targetFile).then(() => {
        let content = currentFiles[targetFile] || "";
        if (content.includes(targetCode)) {
          content = content.replace(targetCode, assembled);
        } else {
          content = content ? (content + "\n" + assembled) : assembled;
        }
        currentFiles[targetFile] = content;
        createEditor(targetFile);
        if (mode === "project") record.workspaces.project = cloneFiles(currentFiles);
        else record.workspaces.playground[activeLesson().id] = cloneFiles(currentFiles);
        scheduleSave();
        updateAngularSimulatedPreview();
        updateAngularHandCraftScore(true, 25);
        inspectAngularGentleTree();
        $("angularLessonFeedback").textContent = "🎉 بنيت اللبنة بيدك ووضعت بصمتك في " + targetFile + "! اضغط (▶ شغّل وافحص) لتشاهد أثرك.";
      });
    };
  }
}

function renderLesson() {
  const lesson = activeLesson();
  if (!lesson) return;

  const steps = Array.isArray(lesson.steps) && lesson.steps.length ? lesson.steps : [
    { id: "idea", type: "observe", title: "الفكرة الأساسية", explanation: lesson.concept, flow: lesson.flow, task: "تفقد المثال في المحرر." },
    { id: "practice", type: "build", title: "اكتب في المحرر", task: lesson.task, file: lesson.file, code: lesson.code, expected: lesson.expected }
  ];

  if (currentStepIndex >= steps.length) currentStepIndex = steps.length - 1;
  if (currentStepIndex < 0) currentStepIndex = 0;
  const currentStep = steps[currentStepIndex];

  $("angularCourseTitle").textContent = COURSE.title;
  $("angularCourseSubtitle").textContent = COURSE.subtitle;
  $("angularLessonPhase").textContent = lesson.phase;
  $("angularLessonStep").textContent = "درس " + formatNumber(currentLessonIndex + 1) + " من " + formatNumber(COURSE.lessons.length);

  // Render Sub-step Dots
  const dotsHost = $("angularLessonDots");
  if (dotsHost) {
    dotsHost.textContent = "";
    steps.forEach((st, idx) => {
      const isDone = idx < currentStepIndex;
      const isNow = idx === currentStepIndex;
      const dot = document.createElement("span");
      dot.className = "growth-node" + (isNow ? " now" : isDone ? " done" : "");
      dot.title = "خطوة " + (idx + 1) + ": " + st.title;
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("aria-label", "خطوة " + (idx + 1) + ": " + st.title);
      dot.addEventListener("click", () => {
        currentStepIndex = idx;
        currentQuizSelected = null;
        renderLesson();
        updateStepContext();
      });
      dotsHost.appendChild(dot);
      if (idx < steps.length - 1) {
        const wire = document.createElement("span");
        wire.className = "growth-wire";
        dotsHost.appendChild(wire);
      }
    });
  }

  // Guide Track Label & Step Count
  if ($("angularGuideTrackLabel")) {
    $("angularGuideTrackLabel").textContent = lesson.phase + " · درس " + formatNumber(currentLessonIndex + 1);
  }
  if ($("angularStepCount")) {
    $("angularStepCount").textContent = "خطوة " + formatNumber(currentStepIndex + 1) + " من " + formatNumber(steps.length) + " · " + currentStep.title;
  }
  if ($("angularStepMeter")) {
    $("angularStepMeter").style.width = Math.round(((currentStepIndex + 1) * 100) / steps.length) + "%";
  }

  // Title, Concept & Flow
  $("angularLessonTitle").textContent = lesson.title + " · " + currentStep.title;
  $("angularLessonConcept").innerHTML = lessonMixedMarkup(currentStep.explanation || lesson.concept);
  const flowText = currentStep.flow || lesson.flow || "";
  $("angularLessonFlow").innerHTML = lessonMixedMarkup(flowText);
  $("angularLessonFlow").style.display = flowText ? "block" : "none";

  // Task & Step Actions
  const actionsHost = $("angularStepActions");
  if (actionsHost) actionsHost.textContent = "";

  if (currentStep.type === "quiz" && currentStep.options && currentStep.options.length) {
    $("angularLessonTask").innerHTML = "<b>سؤال الخطوة:</b> " + lessonMixedMarkup(currentStep.question || currentStep.task);
    if (actionsHost) {
      currentStep.options.forEach((option, optIdx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        const isChosen = currentQuizSelected === optIdx;
        btn.className = "angular-quiz-option" + (isChosen ? (optIdx === currentStep.correct ? " selected correct" : " selected wrong") : "");
        btn.textContent = option;
        btn.addEventListener("click", () => {
          currentQuizSelected = optIdx;
          const isCorrect = optIdx === currentStep.correct;
          $("angularLessonFeedback").innerHTML = isCorrect 
            ? "إجابة صحيحة! " + lessonMixedMarkup(currentStep.benefit || "أتقنت الفكرة بنجاح.") 
            : "حاول مرة أخرى! راجع الفكرة الأساسية أو جرب إجابة أخرى.";
          renderLesson();
        });
        actionsHost.appendChild(btn);
      });
    }
  } else if (currentStep.type === "edit" || currentStep.type === "experiment") {
    const sample = currentStep.example ? '<bdi dir="ltr"><code>' + escapeHtml(currentStep.example) + '</code></bdi>' : '';
    $("angularLessonTask").innerHTML = "<b>جرّب الآن:</b> " + lessonMixedMarkup(currentStep.task) + (sample ? "<br>" + sample : "");
  } else {
    const targetFile = currentStep.file || lesson.file;
    const targetCode = currentStep.code || lesson.code;
    let sample = "";
    if (targetFile && targetCode) {
      sample = '<bdi dir="ltr"><b><code>' + escapeHtml(targetFile) + '</code></b><br><code>' + escapeHtml(targetCode) + '</code></bdi>';
    }
    $("angularLessonTask").innerHTML = "<b>المطلوب منك:</b> " + lessonMixedMarkup(currentStep.task) + (sample ? "<div style='margin-top:8px;'>" + sample + "</div>" : "");
  }

  $("angularLessonReference").href = lesson.reference;
  $("angularLessonReference").textContent = "افتح شرح Angular الرسمي ↗";

  const complete = completedSet().has(lesson.id);
  if (currentQuizSelected === null) {
    $("angularLessonFeedback").textContent = complete 
      ? "أنهيت هذه الخطوة. يمكنك مراجعة الخطوات أو الانتقال للدرس التالي." 
      : "اتبع التعليمات المعروضة في الخطوة الحالية، وافحص الكود عبر (▶ شغّل وافحص).";
  }

  $("angularLessonProgress").style.width = Math.round((currentLessonIndex + (complete ? 1 : 0)) * 100 / COURSE.lessons.length) + "%";

  // Step Previous & Next Buttons
  updateStepNavigation();

  // Footer Lesson Navigation
  $("angularPrevious").disabled = currentLessonIndex <= 0;
  $("angularNext").disabled = !complete || currentLessonIndex >= COURSE.lessons.length - 1;
  $("angularNext").textContent = currentLessonIndex >= COURSE.lessons.length - 1 ? "اكتمل المسار ✓" : "الدرس التالي ←";

  $("angularReset").hidden = mode !== "playground";
  $("angularWorkspaceName").textContent = mode === "project" ? "مشروعي · " + lesson.title : "Playground · " + lesson.title;
  document.querySelectorAll("[data-angular-mode]").forEach((button) => {
    const active = button.dataset.angularMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  updateAngularHandCraftScore(false, 0);
  renderAngularSlotBuilder(currentStep, lesson);
  inspectAngularGentleTree();
  renderRoadmap();
  renderFileTree();
  renderEditorTabs();
}

function ensurePlaygroundFiles(lessonId) {
  if (!record.workspaces.playground[lessonId]) {
    const baseline = cloneFiles(record.workspaces.project || COURSE.starterFiles);
    record.workspaces.playgroundBaseline[lessonId] = cloneFiles(baseline);
    record.workspaces.playground[lessonId] = cloneFiles(baseline);
  }
  playgroundBaseline = cloneFiles(record.workspaces.playgroundBaseline[lessonId] || record.workspaces.project || COURSE.starterFiles);
  return cloneFiles(record.workspaces.playground[lessonId]);
}

async function loadCurrentWorkspace() {
  if (editorView) {
    currentFiles[activePath] = editorView.state.doc.toString();
    editorView.destroy();
    editorView = null;
  }
  if (mode === "project") {
    currentFiles = cloneFiles(record.workspaces.project || COURSE.starterFiles);
    if (!record.workspaces.project) record.workspaces.project = cloneFiles(currentFiles);
    playgroundBaseline = {};
  } else {
    currentFiles = ensurePlaygroundFiles(activeLesson().id);
  }
  const lesson = activeLesson();
  const lessonFile = lesson && (lesson.file || (lesson.steps && lesson.steps[0] && lesson.steps[0].file));
  if (lessonFile && currentFiles[lessonFile] !== undefined) {
    activePath = lessonFile;
  } else if (!currentFiles[activePath]) {
    activePath = currentFiles["src/app/app.ts"] ? "src/app/app.ts" : Object.keys(currentFiles)[0];
  }
  createEditor(activePath);
  await saveRecord();
  if (runtime) {
    await mountWorkspace(currentFiles);
    await ensureDependencies();
    if (serverUrl) await startDevServer();
  }
}

async function selectLesson(index) {
  if (!Number.isInteger(index) || index < 0 || index >= COURSE.lessons.length) return;
  const isDone = completedSet().has(COURSE.lessons[index].id);
  if (index > firstIncompleteIndex() && !isDone) {
    $("angularLessonFeedback").textContent = "كمّل خطوة الدرس الحالي أولًا؛ كل جزء يجهّزك للي بعده.";
    return;
  }
  saveCurrentWorkspace();
  if (runtime) {
    await syncAllFiles();
    await snapshotRuntime();
  }
  currentLessonIndex = index;
  currentStepIndex = 0;
  currentQuizSelected = null;
  record.progress.lessonIndex = index;

  const targetLesson = COURSE.lessons[index];
  const targetFile = targetLesson && (targetLesson.file || (targetLesson.steps && targetLesson.steps[0] && targetLesson.steps[0].file));
  if (targetFile) {
    activePath = targetFile;
  }

  renderLesson();
  await loadCurrentWorkspace();
  if (runtime) await startDevServer();
}

function modeWorkspaceSnapshot() {
  saveCurrentWorkspace();
  return mode === "project" ? cloneFiles(record.workspaces.project || COURSE.starterFiles) : cloneFiles(record.workspaces.playground[activeLesson().id] || playgroundBaseline || COURSE.starterFiles);
}

async function switchMode(nextMode) {
  if (nextMode !== "project" && nextMode !== "playground") return;
  if (nextMode === mode) return;
  record.progress.lessonIndex = currentLessonIndex;
  saveCurrentWorkspace();
  if (runtime) {
    await syncAllFiles();
    await snapshotRuntime();
  }
  mode = nextMode;
  record.progress.mode = mode;
  if (mode === "project" && !record.workspaces.project) record.workspaces.project = cloneFiles(COURSE.starterFiles);
  renderLesson();
  await loadCurrentWorkspace();
  if (runtime) await startDevServer();
}

async function copyPlaygroundChangesToProject() {
  if (mode !== "playground") return;
  const current = cloneFiles(currentFiles);
  const baseline = playgroundBaseline || {};
  const project = cloneFiles(record.workspaces.project || COURSE.starterFiles);
  Object.keys(current).forEach((path) => {
    if (current[path] !== baseline[path]) project[path] = current[path];
  });
  record.workspaces.project = project;
  await saveRecord();
}

async function markComplete(message) {
  const lesson = activeLesson();
  if (record.progress && record.progress.stepAttempts && record.progress.stepAttempts[lesson.id]) {
    delete record.progress.stepAttempts[lesson.id];
  }
  if (!record.progress.completed.includes(lesson.id)) record.progress.completed.push(lesson.id);
  record.progress.lessonIndex = currentLessonIndex;
  await copyPlaygroundChangesToProject();
  await saveRecord();
  renderLesson();
  $("angularLessonFeedback").textContent = message || "شغّلت الكود بنجاح، وأضفت هذه اللبنة إلى مشروع السينما.";
}

async function runLesson() {
  if (runBusy) return;
  runBusy = true;
  const button = $("angularRun");
  button.disabled = true;
  button.textContent = "جارٍ الفحص…";
  saveCurrentWorkspace();
  try {
    const lesson = activeLesson();
    let runtimeActive = false;
    try {
      if (window.crossOriginIsolated && window.isSecureContext) {
        await ensureRuntime();
        await syncAllFiles();
        runtimeActive = !!runtime;
      }
    } catch {}
    if (runtimeActive) {
      if (lesson.command) {
        if (lesson.command === "npm start") {
          await startDevServer();
          await markComplete("بدأ خادم Angular وظهرت معاينته. جرّب تغييرًا صغيرًا قبل الانتقال.");
          return;
        }
        const result = await executeCommand(lesson.command);
        await snapshotRuntime();
        if (result.exitCode !== 0) throw new Error("لم يكتمل الأمر. راجع المخرجات وحاول مرة أخرى.");
        if (lesson.expected && !result.output.includes(lesson.expected)) throw new Error("الأمر لم يعرض النتيجة المتوقعة. تأكد من تثبيت Angular CLI.");
        if (["npm run build", "npm test"].includes(lesson.command)) {
          if (lesson.command === "npm run build") await startDevServer();
        }
        await markComplete("نجح الأمر داخل الترمينال. يمكنك مراجعة النتيجة ثم الانتقال.");
        return;
      }
      if (!supportedTask(lesson)) {
        const files = lesson.edits && lesson.edits.length ? [...new Set(lesson.edits.map((edit) => edit.file))] : [lesson.file];
        record.progress.stepAttempts = record.progress.stepAttempts || {};
        const attemptKey = lesson.id;
        record.progress.stepAttempts[attemptKey] = (record.progress.stepAttempts[attemptKey] || 0) + 1;
        const attempts = record.progress.stepAttempts[attemptKey];
        const tier = Math.min(4, attempts);
        let feedback = "";
        if (tier === 1) {
          feedback = "الجزء المطلوب لم يظهر في " + files.join("، ") + ". أضف التعديلات المعروضة ثم شغّل من جديد.";
        } else if (tier === 2) {
          feedback = "قاعدة: " + (lesson.task || "المطلوب إضافة التعديل المحدد في مكانه الصحيح.") + " هل راجعت صياغة الكود وخصائص Angular؟";
        } else if (tier === 3) {
          feedback = "مساعدة محددة: الجزء المطلوب لم يظهر في " + files.join("، ") + ". تأكد من تضمين: " + (lesson.expected || "التعديلات المطلوبة");
        } else {
          feedback = "كشف الحل: الجزء المطلوب في " + (lesson.file || files[0]) + " هو:\n" + (lesson.expected || "");
        }
        $("angularLessonFeedback").textContent = feedback;
        await saveRecord();
        return;
      }
      setRuntimeStatus("Angular يبني المشروع ويتحقق من القوالب…", "working");
      await runBuild();
      await markComplete("البناء نجح، والجزء المطلوب موجود. أضفت اللبنة إلى مشروع السينما.");
    } else {
      if (!supportedTask(lesson)) {
        const files = lesson.edits && lesson.edits.length ? [...new Set(lesson.edits.map((edit) => edit.file))] : [lesson.file];
        record.progress.stepAttempts = record.progress.stepAttempts || {};
        const attemptKey = lesson.id;
        record.progress.stepAttempts[attemptKey] = (record.progress.stepAttempts[attemptKey] || 0) + 1;
        const attempts = record.progress.stepAttempts[attemptKey];
        const tier = Math.min(4, attempts);
        let feedback = "";
        if (tier === 1) {
          feedback = "الجزء المطلوب لم يظهر في " + files.join("، ") + ". أضف التعديل المطلوب ثم شغّل من جديد.";
        } else if (tier === 2) {
          feedback = "قاعدة: " + (lesson.task || "المطلوب إضافة التعديل المحدد في مكانه الصحيح.") + " هل راجعت صياغة الكود وخصائص Angular؟";
        } else if (tier === 3) {
          feedback = "مساعدة محددة: الجزء المطلوب لم يظهر في " + files.join("، ") + ". تأكد من تضمين: " + (lesson.expected || "التعديل المعروض");
        } else {
          feedback = "كشف الحل: الجزء المطلوب في " + (lesson.file || files[0]) + " هو:\n" + (lesson.expected || "");
        }
        $("angularLessonFeedback").textContent = feedback;
        await saveRecord();
        return;
      }
      updateAngularSimulatedPreview();
      await markComplete("أحسنت! فحص الكود نجح وظهر أثره في المعاينة الحية. أضفت اللبنة إلى مشروع السينما.");
    }
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    if (!runtime || !window.crossOriginIsolated || !window.isSecureContext) showFallback(error);
    else {
      setRuntimeStatus("ظهر خطأ أثناء التشغيل.", "error");
      const lesson = activeLesson();
      const files = lesson.edits && lesson.edits.length ? [...new Set(lesson.edits.map((edit) => edit.file))] : lesson.file ? [lesson.file] : [];
      const fileHint = files.length ? " الملفات المرتبطة بهذه الخطوة: " + files.join("، ") + "." : "";
      $("angularLessonFeedback").textContent = message + fileHint;
      appendTerminal("\n" + message + (files.length ? "\nالملفات المرتبطة بهذه الخطوة: " + files.join("، ") : "") + "\n");
    }
  } finally {
    runBusy = false;
    button.disabled = false;
    button.textContent = "▶ شغّل وافحص";
  }
}

function showFallback(error) {
  runtimeFailure = error && error.message ? error.message : String(error);
  setRuntimeStatus("وضع تحرير وحفظ؛ التشغيل غير متاح في هذا المتصفح.", "fallback");
  $("angularFallback").hidden = false;
  $("angularPreviewStatus").textContent = "التشغيل غير متاح";
  $("angularLessonFeedback").textContent = runtimeFailure + " يمكنك متابعة المحرر وحفظ ملفاتك، أو استخدام زر الإكمال اليدوي.";
}

async function executeCommand(line) {
  const tokens = String(line || "").match(/"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|\S+/g) || [];
  const args = tokens.map((part) => part.replace(/^['"]|['"]$/g, ""));
  if (!args.length) throw new Error("اكتب أمرًا أولًا.");
  const name = args.shift();
  if (name === "clear") { clearTerminal(); return { exitCode: 0, output: "" }; }
  if (name === "npm" || name === "npx") return runProcess(name, args);
  if (name === "ng") return runProcess("./node_modules/.bin/ng", args);
  if (["pwd", "ls", "cat"].includes(name)) return runProcess("/bin/" + name, args);
  if (name === "node") return runProcess("node", args);
  throw new Error("الأمر غير مفعّل داخل هذا الترمينال. استخدم npm أو ng أو pwd أو ls أو cat.");
}

async function runTerminalInput(event) {
  event.preventDefault();
  const input = $("angularCommandInput");
  const command = input.value.trim();
  if (!command) return;
  input.value = "";
  try {
    if (/^npm\s+start$/.test(command)) {
      await startDevServer();
      appendTerminal("\nتم تشغيل خادم Angular.\n");
      return;
    }
    await ensureRuntime();
    await syncAllFiles();
    const result = await executeCommand(command);
    if (result.exitCode !== 0) setRuntimeStatus("انتهى الأمر بخطأ. راجع الترمينال.", "error");
    else if (runtime) setRuntimeStatus("انتهى الأمر بنجاح.", "ready");
    await snapshotRuntime();
  } catch (error) {
    if (!runtime || !window.crossOriginIsolated || !window.isSecureContext) showFallback(error);
    else {
      appendTerminal("\n" + (error && error.message ? error.message : String(error)) + "\n");
      setRuntimeStatus("لم يكتمل الأمر.", "error");
    }
  }
}

async function resetPlayground() {
  if (mode !== "playground") return;
  const lessonId = activeLesson().id;
  playgroundBaseline = cloneFiles(record.workspaces.playgroundBaseline[lessonId] || record.workspaces.project || COURSE.starterFiles);
  currentFiles = cloneFiles(playgroundBaseline);
  record.workspaces.playground[lessonId] = cloneFiles(currentFiles);
  activePath = currentFiles[activePath] !== undefined ? activePath : "src/app/app.ts";
  createEditor(activePath);
  if (runtime) {
    await mountWorkspace(currentFiles);
    if (serverUrl) await startDevServer();
  }
  await saveRecord();
  $("angularLessonFeedback").textContent = "رجعنا هذا الـ Playground لبداية الدرس. مشروعك الرئيسي كما هو.";
}

function createNewFile() {
  const path = window.prompt("اكتب مسار الملف داخل المشروع، مثل src/app/movie-card.ts", "src/app/");
  if (!path) return;
  const normalized = path.trim().replace(/^\.\//, "");
  if (!isAllowedProjectPath(normalized)) {
    $("angularLessonFeedback").textContent = "استخدم ملفًا نصيًا داخل المشروع، مثل src/app/example.ts أو src/app/example.html.";
    return;
  }
  if (Object.prototype.hasOwnProperty.call(currentFiles, normalized) && !window.confirm("الملف موجود. هل تريد فتحه وتعديل محتواه؟")) return;
  if (!Object.prototype.hasOwnProperty.call(currentFiles, normalized)) currentFiles[normalized] = "";
  createEditor(normalized);
  scheduleSave();
}

async function exportProject() {
  saveCurrentWorkspace();
  if (runtime) {
    await syncAllFiles();
    await snapshotRuntime();
  }
  const zip = new JSZip();
  Object.entries(currentFiles).forEach(([path, value]) => zip.file(path, value));
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "khotwa-cinema-angular-" + mode + ".zip";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("angularLessonFeedback").textContent = "نزّلنا ملفات المصدر إلى جهازك. تقدر تستورد ZIP نفسه لاحقًا.";
}

async function importProject(event) {
  const file = event.target.files && event.target.files[0];
  event.target.value = "";
  if (!file) return;
  if (file.size > MAX_IMPORT_BYTES) {
    $("angularLessonFeedback").textContent = "حجم ملف ZIP كبير. الحد الحالي ٤ ميغابايت لملفات المصدر.";
    return;
  }
  try {
    const zip = await JSZip.loadAsync(file);
    const imported = {};
    let total = 0;
    const entries = Object.values(zip.files).filter((entry) => !entry.dir && isAllowedProjectPath(entry.name));
    if (entries.length > MAX_IMPORT_FILES) throw new Error("يحتوي ZIP على ملفات أكثر من الحد المسموح.");
    for (const entry of entries) {
      const bytes = await entry.async("uint8array");
      if (bytes.byteLength > MAX_IMPORT_BYTES) throw new Error("مجموع ملفات المصدر أكبر من ٤ ميغابايت.");
      total += bytes.byteLength;
      if (total > MAX_IMPORT_BYTES) throw new Error("مجموع ملفات المصدر أكبر من ٤ ميغابايت.");
      const content = new TextDecoder("utf-8").decode(bytes);
      imported[entry.name] = content;
    }
    if (!imported["package.json"] || !imported["angular.json"] || !Object.keys(imported).some((path) => path.startsWith("src/"))) {
      throw new Error("لم نجد package.json وangular.json وملفات src في ZIP.");
    }
    currentFiles = imported;
    if (mode === "project") record.workspaces.project = cloneFiles(imported);
    else record.workspaces.playground[activeLesson().id] = cloneFiles(imported);
    activePath = currentFiles[activePath] !== undefined ? activePath : "src/app/app.ts";
    createEditor(activePath);
    if (runtime) {
      await mountWorkspace(currentFiles);
      if (serverUrl) await startDevServer();
    }
    await saveRecord();
    $("angularLessonFeedback").textContent = "استوردنا ملفات المشروع داخل " + (mode === "project" ? "مساحة مشروعي" : "Playground الدرس") + ".";
  } catch (error) {
    $("angularLessonFeedback").textContent = error && error.message ? error.message : "تعذر قراءة ZIP.";
  }
}

function setMobilePane(name) {
  $("angularCoursePanel").dataset.mobilePane = name;
  document.querySelectorAll("[data-angular-pane]").forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.angularPane === name ? "true" : "false");
  });
}

async function enterCourse() {
  if (isEntering) return;
  isEntering = true;
  panel.hidden = false;
  mainLessonGrid.hidden = true;
  courseRoadmap.hidden = true;
  document.querySelectorAll("#courses [data-course]").forEach((button) => button.classList.remove("active"));
  $("angularCourseCard").closest("button").classList.add("active");
  document.querySelector("#lesson > .sectionhead h2").textContent = "مسار Angular";
  document.querySelector("#lesson > .sectionhead p").textContent = "ابنِ تطبيقًا حقيقيًا خطوةً خطوة داخل المحرر.";
  try {
    if (!initialized) {
      setRuntimeStatus("نحمّل محرر Angular للمرة الأولى…", "working");
      await initialize();
    } else {
      currentLessonIndex = record.progress.lessonIndex;
      mode = record.progress.mode === "project" ? "project" : "playground";
      renderLesson();
      await loadCurrentWorkspace();
    }
    setMobilePane("code");
    document.getElementById("lesson").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    showFallback(error);
  } finally {
    isEntering = false;
  }
}

function leaveCourse() {
  saveCurrentWorkspace();
  record.progress.lessonIndex = currentLessonIndex;
  record.progress.mode = mode;
  void saveRecord();
  panel.hidden = true;
  mainLessonGrid.hidden = false;
  courseRoadmap.hidden = false;
  document.querySelector("#lesson > .sectionhead h2").textContent = "جلسة اليوم";
  document.querySelector("#lesson > .sectionhead p").textContent = "هدف صغير، تجربة سريعة، ونقطة نهاية واضحة.";
}

function bindInterface() {
  document.querySelectorAll("[data-angular-mode]").forEach((button) => button.addEventListener("click", () => void switchMode(button.dataset.angularMode)));
  document.querySelectorAll("#courses [data-course]").forEach((button) => button.addEventListener("click", leaveCourse));
  $("angularLessonSearch").addEventListener("input", renderRoadmap);
  $("angularRun").addEventListener("click", () => void runLesson());
  $("angularReset").addEventListener("click", () => void resetPlayground());
  $("angularNewFile").addEventListener("click", createNewFile);
  $("angularExport").addEventListener("click", () => void exportProject());
  $("angularImport").addEventListener("change", (event) => void importProject(event));
  $("angularCommandForm").addEventListener("submit", (event) => void runTerminalInput(event));
  $("angularClearTerminal").addEventListener("click", clearTerminal);
  $("angularManualComplete").addEventListener("click", () => void markComplete("سجلنا إنجازك يدويًا. عندما يتاح متصفح متوافق، تقدر ترجع وتشغل المشروع."));
  const stepPrev = $("angularStepPrev");
  if (stepPrev) stepPrev.addEventListener("click", () => previousStep());
  const stepNext = $("angularStepNext");
  if (stepNext) stepNext.addEventListener("click", () => advanceStep());
  $("angularPrevious").addEventListener("click", () => void selectLesson(currentLessonIndex - 1));
  $("angularNext").addEventListener("click", () => void selectLesson(currentLessonIndex + 1));
  document.querySelectorAll("[data-angular-pane]").forEach((button) => button.addEventListener("click", () => setMobilePane(button.dataset.angularPane)));
  window.addEventListener("pagehide", () => {
    saveCurrentWorkspace();
    void saveRecord();
  });
}

async function initialize() {
  if (!panel) return;
  if (document.readyState !== "complete") await new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  if (typeof window !== "undefined" && window.DataLoader && typeof window.DataLoader.loadTrack === "function") {
    try {
      const trackData = await window.DataLoader.loadTrack("angular");
      if (trackData && trackData.lessons && trackData.lessons.length) {
        window.ANGULAR_COURSE_DATA = Object.assign({}, window.ANGULAR_COURSE_DATA || {}, trackData);
      }
    } catch {}
  }
  COURSE = window.ANGULAR_COURSE_DATA;
  if (!COURSE || !COURSE.lessons || !COURSE.starterFiles) throw new Error("تعذر تحميل بيانات دروس Angular.");
  try {
    await loadEditorModules();
  } catch (error) {
    console.warn("WebContainer/CodeMirror modules could not be loaded, using fallback editor:", error);
    showFallback(error);
  }
  learnerId = currentProfileId();
  record = await loadRecord(learnerId);
  currentLessonIndex = record.progress.lessonIndex;
  mode = record.progress.mode === "project" ? "project" : "playground";
  currentFiles = mode === "project" ? cloneFiles(record.workspaces.project || COURSE.starterFiles) : ensurePlaygroundFiles(activeLesson().id);
  activePath = currentFiles["src/app/app.ts"] ? "src/app/app.ts" : Object.keys(currentFiles)[0];
  createEditor(activePath);
  renderLesson();
  bindInterface();
  initialized = true;
}

window.AngularCourse = {
  enter: enterCourse,
  isStepCompleted,
  advanceStep,
  previousStep,
  selectLesson,
  updateStepNavigation,
  activeLesson: () => activeLesson(),
  getStepIndex: () => currentStepIndex,
  setStepIndex: (i) => { currentStepIndex = i; },
  getQuizSelected: () => currentQuizSelected,
  setQuizSelected: (i) => { currentQuizSelected = i; },
  getCurrentFiles: () => currentFiles,
  setCurrentFiles: (f) => { currentFiles = f; },
  setCourse: (c) => { COURSE = c; }
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = { isStepCompleted, lessonMixedMarkup, normalizeWhitespace };
}
$("angularCourseCard").closest("button").addEventListener("click", () => void enterCourse());

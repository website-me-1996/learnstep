import { runProgram, checkChallenge, RUNTIME_LABEL } from "./csharp-runtime.js";
import { loadProgress, lessonRecord, saveProgress } from "./csharp-progress.js";
import "./csharp-course.css";
import { DotnetRunner } from "./csharp-dotnet-client.js";

const $ = id => document.getElementById(id);
const panel = $("csharpCoursePanel");
const code = $("csharpCode");
const storage = { getItem: key => window.localStorage.getItem(key), setItem: (key, value) => window.localStorage.setItem(key, value) };
const learnerId = () => window.LearnerProfiles?.active().id || "default";
const number = n => new Intl.NumberFormat("ar-EG").format(n);
let course, progress, loading = false, trace = null, cursor = -1, hintLevel = 0;
let dotnetRunner, realBusy = false, runVersion = 0;
const activeLesson = () => course.lessons.find(l => l.id === progress.activeLessonId) || course.lessons[0];
const record = () => lessonRecord(progress, activeLesson());
const activeStep = () => activeLesson().steps[record().step];
const practical = () => !!activeStep().challenge;

function save() {
  const ok = saveProgress(storage, learnerId(), progress);
  $("csharpSaveStatus").textContent = ok ? "الكود والخطوة محفوظان على هذا الجهاز." : "تعذّر الحفظ على هذا الجهاز. نزّل كودك قبل المغادرة.";
}
function feedback(message, error = false) {
  $("csharpFeedback").textContent = message;
  $("csharpFeedback").classList.toggle("cs-error", error);
}
function initialCode(stepIndex) {
  const steps = activeLesson().steps, step = steps[stepIndex], saved = record().drafts[step.id];
  if (saved !== undefined) return saved;
  if (step.code !== undefined) return step.code;
  if (step.starterCode !== null && step.starterCode !== undefined) return step.starterCode;
  return stepIndex > 0 ? initialCode(stepIndex - 1) : "";
}
function clearTrace() { trace = null; cursor = -1; renderTrace(); }
function renderLogic(checks) {
  const panel = $("csharpLogic");
  panel.replaceChildren();
  panel.hidden = !checks.length;
  for (const check of checks) {
    const row = document.createElement("div");
    row.className = "cs-logic-row";
    const addCell = (label, value, source) => {
      const cell = document.createElement("div");
      const name = document.createElement("small");
      name.textContent = label;
      cell.append(name);
      if (source !== undefined) {
        const expression = document.createElement("code");
        expression.textContent = source;
        expression.dir = "ltr";
        cell.append(expression);
      }
      const answer = document.createElement("bdi");
      answer.textContent = value ?? "لم يُحسب";
      cell.append(answer);
      row.append(cell);
    };
    if (check.left) addCell("الطرف الأيسر", check.left.value, check.left.source);
    addCell("المعامل", check.operator);
    addCell(check.left ? "الطرف الأيمن" : "القيمة قبل النفي", check.right.value, check.right.source);
    addCell("النتيجة", check.result);
    panel.append(row);
  }
}
function renderTrace() {
  const snapshot = cursor >= 0 && trace ? trace.trace[cursor] : null;
  $("csharpOutput").textContent = snapshot ? snapshot.output : "";
  $("csharpTraceAction").textContent = snapshot ? snapshot.action : "يا كمبيوتر، انتظر عند البداية. لم يُنفّذ أي أمر بعد.";
  $("csharpTraceCount").textContent = trace ? number(cursor + 1) + " / " + number(trace.trace.length) : "";
  $("csharpTraceLines").replaceChildren();
  (code.value || "").split("\n").forEach((text, index) => {
    const line = document.createElement("li");
    line.textContent = text || " ";
    if (snapshot?.skippedLines?.includes(index + 1)) { line.classList.add("cs-skipped-line"); line.title = "هذا السطر لم يُنفّذ في المسار المختار."; }
    if (snapshot && snapshot.line === index + 1) { line.classList.add("cs-current-line"); line.setAttribute("aria-current", "step"); }
    $("csharpTraceLines").append(line);
  });
  $("csharpVariables").replaceChildren();
  renderLogic(snapshot?.logic || []);
  $("csharpComparison").hidden = !snapshot?.comparison;
  if (snapshot?.comparison) {
    const comparison = snapshot.comparison;
    const value = v => typeof v === "string" ? JSON.stringify(v) : String(v);
    $("csharpCompareLeft").textContent = value(comparison.left);
    $("csharpCompareOperator").textContent = comparison.operator;
    $("csharpCompareRight").textContent = value(comparison.right);
    $("csharpCompareResult").textContent = String(comparison.result);
  }
  for (const [name, data] of Object.entries(snapshot?.variables || {})) {
    const row = document.createElement("tr");
    if (snapshot.name === name) row.classList.add("cs-changed-value");
    for (const [index, value] of [name, data.type, typeof data.value === "string" ? JSON.stringify(data.value) : String(data.value)].entries()) {
      const cell = document.createElement("td"); cell.textContent = value; cell.dir = index === 2 && typeof data.value === "string" ? "auto" : "ltr"; row.append(cell);
    }
    $("csharpVariables").append(row);
  }
  $("csharpNoVariables").hidden = !!snapshot && Object.keys(snapshot.variables).length > 0;
  $("csharpStepRun").disabled = activeStep()?.id === "diagnose" || (!!trace && cursor === trace.trace.length - 1);
  $("csharpTraceBack").disabled = cursor < 0;
}
function renderRoadmap() {
  const done = course.lessons.filter(l => progress.lessons[l.id]?.completed).length;
  $("csharpCourseCount").textContent = number(done) + " من " + number(course.lessons.length) + " درسًا";
  $("csharpCourseCard").textContent = "C# · " + number(done) + "/" + number(course.lessons.length);
  const list = $("csharpLessonList");
  const scrollPosition = list.scrollTop;
  list.replaceChildren();
  let previousUnit;
  for (const [index, lesson] of course.lessons.entries()) {
    if (lesson.unitId !== previousUnit) {
      const heading = document.createElement("h4"); heading.className = "cs-unit-title";
      heading.textContent = course.units?.find(u => u.id === lesson.unitId)?.title || lesson.skill;
      list.append(heading); previousUnit = lesson.unitId;
    }
    const button = document.createElement("button"); button.type = "button";
    const complete = progress.lessons[lesson.id]?.completed;
    button.textContent = (complete ? "✓ " : number(index + 1) + " · ") + lesson.title;
    button.classList.toggle("active", lesson.id === progress.activeLessonId);
    if (lesson.id === progress.activeLessonId) button.setAttribute("aria-current", "step");
    button.addEventListener("click", () => { progress.activeLessonId = lesson.id; save(); render(); });
    list.append(button);
  }
  list.scrollTop = scrollPosition;
}
function render() {
  stopReal(false);
  const lesson = activeLesson(), r = record(), step = activeStep();
  hintLevel = 0;
  $("csharpHint").hidden = true;
  $("csharpHintButton").disabled = false;
  $("csharpHintButton").textContent = "اطلب تلميحًا";
  $("csharpLessonTitle").textContent = lesson.title;
  $("csharpUnitLabel").textContent = course.units?.find(u => u.id === lesson.unitId)?.title || lesson.skill;
  $("csharpScene").replaceChildren();
  $("csharpScene").hidden = step.id !== "idea" || !lesson.sceneVisual;
  if (step.id === "idea") for (const item of lesson.sceneVisual || []) {
    const card = document.createElement("div"), label = document.createElement("small"), text = document.createElement("strong");
    label.textContent = item.label; text.textContent = item.text; card.append(label,text); $("csharpScene").append(card);
  }
  $("csharpStepTitle").textContent = step.title;
  $("csharpStepCount").textContent = "خطوة " + number(r.step + 1) + " من " + number(lesson.steps.length);
  $("csharpInstruction").textContent = step.instruction;
  $("csharpExplanation").textContent = step.explanation || "";
  $("csharpExplanation").hidden = !step.explanation;
  $("csharpReference").href = lesson.documentationUrl;
  $("csharpWorkbench").hidden = step.id === "idea";
  $("csharpExpectedWrap").hidden = !step.challenge || step.challenge.output === undefined;
  $("csharpExpected").textContent = step.challenge?.output || "";
  $("csharpPrevious").disabled = r.step === 0;
  $("csharpNext").disabled = step.id !== "idea" && !r.verified[step.id];
  $("csharpNext").textContent = step.id === "transfer" ? r.completed ? "الدرس التالي ←" : "احفظ اللبنة وأنهِ الدرس ←" : "الخطوة التالية ←";
  $("csharpRun").hidden = !practical();
  $("csharpReset").hidden = !practical();
  $("csharpHintButton").hidden = !practical();
  code.value = initialCode(r.step);
  $("csharpStdin").value = r.stdin || "";
  $("csharpDotnetOutput").textContent = "";
  $("csharpDotnetDiagnostics").replaceChildren();
  $("csharpDotnetStatus").textContent = "جاهز لتحميل المشغّل عند الطلب.";
  $("csharpEngineControls").hidden = !practical();
  if (!practical()) $("csharpEngine").value = "trace";
  applyEngine();
  code.readOnly = !practical();
  $("csharpEditorWrap").hidden = !practical();
  $("csharpQuiz").replaceChildren();
  $("csharpQuiz").hidden = step.type !== "quiz";
  if (step.type === "quiz") {
    const question = document.createElement("p"); question.textContent = step.question; $("csharpQuiz").append(question);
    step.options.forEach((option, index) => {
      const button = document.createElement("button"); button.type = "button"; button.textContent = option;
      button.addEventListener("click", () => {
        if (index !== step.correctOptionIndex) { feedback("قارن السطر بالمطلوب، ثم جرّب إجابة أخرى.", true); return; }
        r.verified[step.id] = true; save(); $("csharpNext").disabled = false; feedback(lesson.bugRepair.explanation);
      });
      $("csharpQuiz").append(button);
    });
  }
  $("csharpDetails").hidden = step.id !== "trace";
  $("csharpBreakdown").replaceChildren();
  for (const item of lesson.breakdown) { const li = document.createElement("li"); li.textContent = item; $("csharpBreakdown").append(li); }
  feedback(r.completed && step.id === "transfer" ? "اللبنة محفوظة. تقدر تراجعها أو تفتح الدرس التالي." : "");
  clearTrace(); renderRoadmap();
}

function applyEngine() {
  const real = $("csharpEngine").value === "dotnet";
  $("csharpDotnetPane").hidden = !real;
  $("csharpTracePane").hidden = real;
  $("csharpRuntimeLabel").textContent = real ? "C# / .NET 10 · تشغيل تجريبي داخل متصفحك" : RUNTIME_LABEL;
  $("csharpRuntimeNote").textContent = real ? "تشغيل تجريبي في مساحة منفصلة داخل متصفحك. التتبّع البصري للقيم والمقارنات والشروط متاح من الخيار الأول." : "تتبّع الطباعة والحساب والشروط. راقب القيمة عند كل سطر والطرف الذي يتخطّاه الكمبيوتر في الشرط المركب.";
  $("csharpRun").textContent = real ? "شغّل عبر .NET وافحص" : "شغّل وافحص";
  if(real && !$("csharpDownloadSize").textContent) {
    fetch('/csharp-dotnet/manifest.json').then(r => { if(!r.ok) throw Error(); return r.json(); }).then(m => {
      $("csharpDownloadSize").textContent = "أول تحميل: نحو " + new Intl.NumberFormat('ar-EG',{maximumFractionDigits:1}).format(m.gzipBytes/1048576) + " ميجابايت مع الضغط؛ " + number(Math.ceil(m.rawBytes/1048576)) + " دون ضغط.";
    }).catch(() => { $("csharpDownloadSize").textContent = "قد يستغرق أول تحميل وقتًا؛ لا يبدأ إلا عند الضغط على التشغيل."; });
  }
}
function stopReal(show = true) {
  const canceled = realBusy;
  if(realBusy) { runVersion++; dotnetRunner?.stop(); realBusy = false; }
  $("csharpDotnetStop").hidden = true;
  $("csharpRun").disabled = false;
  if(show || canceled) $("csharpDotnetStatus").textContent = "أُوقف التشغيل. الكود والخطوة محفوظان.";
}
async function runReal() {
  if(realBusy) return;
  const source = code.value, input = $("csharpStdin").value, step = activeStep(), r = record();
  const version = ++runVersion;
  realBusy = true; $("csharpRun").disabled = true; $("csharpDotnetStop").hidden = false;
  $("csharpDotnetOutput").textContent = ""; $("csharpDotnetDiagnostics").replaceChildren();
  $("csharpDotnetStatus").textContent = "نحمّل المشغّل إذا لزم، ثم نترجم كودك وننفّذه…";
  r.verified[step.id] = false; $("csharpNext").disabled = true; save();
  dotnetRunner ||= new DotnetRunner({onStatus: text => { if(realBusy) $("csharpDotnetStatus").textContent = text; }});
  try {
    const result = await dotnetRunner.run(source,input);
    if(version !== runVersion) return;
    $("csharpDotnetOutput").textContent = result.output || "";
    for(const diagnostic of result.diagnostics || []) {
      const li = document.createElement('li');
      li.textContent = diagnostic.id + " · السطر " + number(diagnostic.line) + ": " + diagnostic.message;
      $("csharpDotnetDiagnostics").append(li);
    }
    $("csharpDotnetStatus").textContent = result.ok ? "اكتمل التشغيل الفعلي عبر .NET." : result.kind === 'compile' ? "المترجم وجد خطأ قبل التنفيذ. راجع السطر المحدد أدناه." : result.message || "توقف البرنامج بخطأ أثناء التنفيذ.";
    if(result.ok && step.challenge) {
      const baseline = activeLesson().steps.find(s=>s.id==='edit').challenge.output;
      const check = checkChallenge(source, step.challenge, baseline);
      const matches = check.passed && check.result.output === result.output;
      r.verified[step.id] = matches; $("csharpNext").disabled = !matches; save();
      feedback(matches ? "صحيح. نُفّذ الكود بواسطة .NET وحقق المطلوب." : check.passed ? "اختلفت نتيجة .NET عن التتبّع التعليمي. راجع الناتج قبل إكمال الخطوة." : "شُغّل كودك بواسطة .NET. لإكمال خطوة الدرس: " + check.message, !matches);
    }
  } catch(error) {
    if(version === runVersion) $("csharpDotnetStatus").textContent = error.message;
  } finally {
    if(version === runVersion) { realBusy = false; $("csharpRun").disabled = false; $("csharpDotnetStop").hidden = true; }
  }
}

function run(all = true) {
  const step = activeStep(), r = record();
  try {
    if (!trace) trace = runProgram(code.value);
    cursor = all ? trace.trace.length - 1 : Math.min(cursor + 1, trace.trace.length - 1);
    renderTrace();
    if (step.id === "trace") {
      if (cursor === trace.trace.length - 1) {
        r.verified[step.id] = true; save(); $("csharpNext").disabled = false;
        feedback("وصل السهم لنهاية المثال. شفت أثر كل أمر؛ دلوقتي نبنيه بإيدك.");
      }
    } else if (practical() && cursor === trace.trace.length - 1) {
      const baseline = activeLesson().steps.find(s => s.id === "edit").challenge.output;
      const checked = checkChallenge(code.value, step.challenge, baseline);
      r.verified[step.id] = checked.passed; save(); $("csharpNext").disabled = !checked.passed;
      feedback(checked.message + (checked.passed ? " " + step.benefit : ""), !checked.passed);
    }
  } catch (error) {
    trace = null; cursor = -1; renderTrace();
    r.verified[step.id] = false; save(); $("csharpNext").disabled = true;
    feedback("السطر " + number(error.line || 1) + ": " + error.message, true);
  }
}

async function enter() {
  if (loading) return;
  loading = true;
  // Production bundles can execute before the classic deferred profile/app scripts.
  // Let their initialization finish before choosing a learner or opening the panel.
  if (document.readyState !== "complete") await new Promise(resolve => window.addEventListener("load", resolve, { once: true }));
  window.dispatchEvent(new CustomEvent("steplearn:coursechange", { detail: { course: "csharp" } }));
  panel.hidden = false;
  document.querySelector("#lesson > .grid").hidden = true;
  $("courseRoadmap").hidden = true;
  document.querySelectorAll("#courses .course").forEach(b => b.classList.toggle("active", b.hasAttribute("data-csharp-open")));
  document.querySelector("#lesson > .sectionhead h2").textContent = "تأسيس C#";
  document.querySelector("#lesson > .sectionhead p").textContent = "فكرة واحدة، أمر واحد، وأثر تراه.";
  $("csharpLoadError").hidden = true;
  $("csharpCourseContent").hidden = true;
  $("csharpLoading").hidden = false;
  try {
    if (!course) {
      const response = await fetch("csharp-lessons.json");
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      if (data.track !== "csharp" || data.totalLessons !== data.lessons?.length || !data.lessons.length) throw new Error("Invalid curriculum");
      course = data;
      progress = loadProgress(storage, learnerId(), course.lessons);
    }
    render(); save(); $("csharpCourseContent").hidden = false;
    history.replaceState(null, "", "#csharp");
    $("lesson").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    $("csharpLoadError").hidden = false;
  } finally { $("csharpLoading").hidden = true; loading = false; }
}
function leave() {
  if (panel.hidden) return;
  stopReal(false); dotnetRunner?.dispose(); dotnetRunner = null;
  panel.hidden = true;
  document.querySelector("#lesson > .grid").hidden = false;
  $("courseRoadmap").hidden = false;
  $("csharpCourseCard").closest("button").classList.remove("active");
  document.querySelector("#lesson > .sectionhead h2").textContent = "جلسة اليوم";
  document.querySelector("#lesson > .sectionhead p").textContent = "هدف صغير، تجربة سريعة، ونقطة نهاية واضحة.";
  if (location.hash === "#csharp") history.replaceState(null, "", "#lesson");
}

$("csharpRuntimeLabel").textContent = RUNTIME_LABEL;
document.querySelectorAll("[data-csharp-open]").forEach(b => b.addEventListener("click", () => void enter()));
$("csharpRetry").addEventListener("click", () => void enter());
window.addEventListener("steplearn:coursechange", e => { if (e.detail?.course !== "csharp") leave(); });
code.addEventListener("input", () => {
  stopReal(false);
  const step = activeStep(), r = record(); r.drafts[step.id] = code.value; r.verified[step.id] = false;
  $("csharpNext").disabled = true; feedback(""); clearTrace(); save();
});
$("csharpRun").addEventListener("click", () => $("csharpEngine").value === "dotnet" ? void runReal() : run(true));
$("csharpEngine").addEventListener("change", () => { stopReal(false); applyEngine(); });
$("csharpDotnetStop").addEventListener("click", () => stopReal());
$("csharpStdin").addEventListener("input", () => { stopReal(false); record().stdin = $("csharpStdin").value; record().verified[activeStep().id] = false; $("csharpNext").disabled = true; save(); });
$("csharpStepRun").addEventListener("click", () => run(false));
$("csharpTraceBack").addEventListener("click", () => { cursor--; renderTrace(); });
$("csharpTraceRestart").addEventListener("click", () => { cursor = -1; renderTrace(); });
$("csharpHintButton").addEventListener("click", () => {
  hintLevel = Math.min(hintLevel + 1, 4);
  $("csharpHint").hidden = false; $("csharpHint").textContent = activeStep().hints[hintLevel - 1];
  $("csharpHintButton").textContent = hintLevel === 3 ? "اكشف الحل" : "التلميح " + number(hintLevel + 1);
  $("csharpHintButton").disabled = hintLevel === 4;
});
$("csharpReset").addEventListener("click", () => {
  const step = activeStep(), r = record(); delete r.drafts[step.id]; r.verified[step.id] = false; save(); render();
});
$("csharpPrevious").addEventListener("click", () => { const r = record(); r.step = Math.max(0, r.step - 1); save(); render(); });
$("csharpNext").addEventListener("click", () => {
  const lesson = activeLesson(), r = record(), step = activeStep();
  if (step.id !== "idea" && !r.verified[step.id]) return;
  if (step.id === "transfer") {
    const result = checkChallenge(code.value, step.challenge);
    if (!result.passed) { feedback(result.message, true); return; }
    r.completed = true; r.artifact = { code: code.value, output: result.result.output };
    save();
    const next = course.lessons[lesson.order + 1];
    if (next) { progress.activeLessonId = next.id; save(); render(); }
    else { renderRoadmap(); feedback("أكملت الدروس المتاحة وحفظت تطبيقك. الخطوة التالية في المسار هي الأنواع العددية والنصوص والتحويل."); $("csharpNext").disabled = true; }
    return;
  }
  r.step = Math.min(r.step + 1, lesson.steps.length - 1); r.furthest = Math.max(r.furthest, r.step);
  // Preserve the current editor value for edit/experiment handoffs, including an untouched sample.
  if (r.drafts[step.id] === undefined && step.challenge) r.drafts[step.id] = code.value;
  save(); render();
});
$("csharpDownload").addEventListener("click", () => {
  const blob = new Blob(["using System;\n" + code.value + "\n"], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob), link = document.createElement("a");
  link.href = url; link.download = "Program.cs"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
window.addEventListener("pagehide", () => { stopReal(false); dotnetRunner?.dispose(); dotnetRunner=null; if (progress) save(); });
if (location.hash === "#csharp") void enter();

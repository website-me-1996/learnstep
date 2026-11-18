export const STORAGE_VERSION = 1;
export function storageKey(learnerId = "default") {
  return "steplearn-csharp-v1:" + (/^(default|learner-[a-z0-9-]{1,60})$/.test(learnerId) ? learnerId : "default");
}
export function freshProgress(lessons) { return { version: STORAGE_VERSION, activeLessonId: lessons[0].id, lessons: {} }; }
export function loadProgress(storage, learnerId, lessons) {
  const state = freshProgress(lessons);
  try {
    const data = JSON.parse(storage.getItem(storageKey(learnerId)) || "null");
    if (!data || data.version !== STORAGE_VERSION) return state;
    if (lessons.some(l => l.id === data.activeLessonId)) state.activeLessonId = data.activeLessonId;
    for (const lesson of lessons) {
      const saved = data.lessons?.[lesson.id];
      if (!saved || typeof saved !== "object") continue;
      const revisionMatches = saved.revision === lesson.revision;
      const record = { revision: lesson.revision, step: 0, furthest: 0, drafts: {}, verified: {}, completed: revisionMatches && saved.completed === true, artifact: null, stdin: typeof saved.stdin === 'string' ? saved.stdin.slice(0,16000) : '' };
      if (revisionMatches) {
        record.furthest = Number.isInteger(saved.furthest) ? Math.max(0, Math.min(lesson.steps.length - 1, saved.furthest)) : 0;
        record.step = Number.isInteger(saved.step) ? Math.max(0, Math.min(record.furthest, saved.step)) : 0;
      }
      for (const step of lesson.steps) {
        const draft = saved.drafts?.[step.id];
        if (typeof draft === "string" && draft.length <= 16000) record.drafts[step.id] = draft;
        if (revisionMatches && saved.verified?.[step.id] === true) record.verified[step.id] = true;
      }
      if (record.completed && typeof saved.artifact?.code === "string" && saved.artifact.code.length <= 16000) record.artifact = { code: saved.artifact.code, output: String(saved.artifact.output || "").slice(0, 16000) };
      state.lessons[lesson.id] = record;
    }
  } catch { /* Broken/disabled storage must not prevent learning. */ }
  return state;
}
export function lessonRecord(state, lesson) {
  if (!state.lessons[lesson.id]) state.lessons[lesson.id] = { revision: lesson.revision, step: 0, furthest: 0, drafts: {}, verified: {}, completed: false, artifact: null, stdin: '' };
  return state.lessons[lesson.id];
}
export function saveProgress(storage, learnerId, state) {
  try { storage.setItem(storageKey(learnerId), JSON.stringify(state)); return true; }
  catch { return false; }
}

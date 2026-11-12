/**
 * curriculum/angular/rules_catalog.cjs
 *
 * Comprehensive, verified catalog of regex error detection rules for Angular 22 & TypeScript.
 */

const ANGULAR_RULES = {
  // 1. Template Interpolation Rules
  unclosedInterpolation: {
    pattern: "\\{\\{[^}]*$",
    flags: "",
    type: "regex",
    message: "فتحت ربطاً بيانياً مزدوجاً {{ في قالب Angular ولكنك نسيت إغلاقه بـ }} المقابلة."
  },

  // 2. Control Flow (@for / @if) Rules
  forLoopMissingTrack: {
    pattern: "@for\\s*\\((?![^)]*\\btrack\\b)[^)]*\\)",
    flags: "i",
    type: "regex",
    message: "في نظام التحكم الحديث لـ Angular، تتطلب كتلة @for تحديد تعبير تتبع إلزامي مثل track item.id لضمان كفاءة تحديث عناصر DOM."
  },

  // 3. Classic Directives Syntax Errors
  ngIfWithoutAsterisk: {
    pattern: "\\[ngIf\\]\\s*=",
    flags: "i",
    type: "regex",
    message: "استخدمت [ngIf] كربط خاصية عادي؛ التوجيه الهيكلي الكلاسيكي يتطلب علامة النجمة *ngIf ليقوم بإنشاء وإزالة عنصر القالب."
  },
  ngForWithoutAsterisk: {
    pattern: "\\[ngFor\\]\\s*=",
    flags: "i",
    type: "regex",
    message: "استخدمت [ngFor] كربط خاصية عادي؛ التوجيه الهيكلي الكلاسيكي لتكرار العناصر يتطلب علامة النجمة *ngFor."
  },

  // 4. Signals Reactivity Errors
  signalDirectMutation: {
    pattern: "\\b([a-zA-Z_$][a-zA-Z0-9_$]*)\\(\\)\\s*=|\\b([a-zA-Z_$][a-zA-Z0-9_$]*)\\.set\\b(?!\\s*\\()",
    flags: "i",
    type: "regex",
    message: "لا يمكن تعديل قيمة الإشارة Signal بإسناد مباشر علامة '='. استخدم الدالة .set(newValue) أو .update(fn => ...) لتحديث الحالة التفاعلية."
  },

  // 5. Component Decorator & Architecture Rules
  standaloneMissingImports: {
    pattern: "@Component\\s*\\(\\s*\\{[^}]*standalone:\\s*true[^}]*?(?!imports)[^}]*\\}\\)",
    flags: "i",
    type: "regex",
    message: "المكون المستقل standalone: true يحتاج مصفوفة imports: [...] لاستيراد التوجيهات والمكونات والأنابيب المستخدمة في قالبه."
  },

  // 6. Delimiter & Syntax Safeguards
  unclosedBrace: {
    pattern: "\\{[^}]*$",
    flags: "",
    type: "regex",
    message: "فتحت كتلة أوامر أو كائن بقوس '{' ولكنك نسيت إغلاقه بقوس المقابلة '}'."
  },
  unclosedParenthesis: {
    pattern: "\\([^)]*$",
    flags: "",
    type: "regex",
    message: "فتحت قوس استدعاء دالة أو تعبير '(' دون إغلاقه بقوس المقابلة ')'."
  },
  unclosedBracket: {
    pattern: "\\[[^\\]]*$",
    flags: "",
    type: "regex",
    message: "فتحت مصفوفة بقوس '[' ولكنك نسيت إغلاقه بقوس المقابلة ']'."
  }
};

module.exports = { ANGULAR_RULES };

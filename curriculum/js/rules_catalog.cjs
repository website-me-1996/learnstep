/**
 * curriculum/js/rules_catalog.cjs
 *
 * Comprehensive, verified catalog of regex error detection rules for the JavaScript curriculum.
 */

const JS_RULES = {
  // Syntax & Delimiter Rules
  singleEqualsInCondition: {
    pattern: "\\bif\\s*\\([^)]*?[^!=<>]=[^=][^)]*?\\)",
    flags: "i",
    type: "regex",
    message: "استخدمت علامة مساواة مفردة '=' داخل شرط if. علامة '=' تعني إسناد قيمة، بينما المقارنة تتطلب '===' أو '=='."
  },
  semiColonAfterIfCondition: {
    pattern: "\\bif\\s*\\([^)]+\\)\\s*;",
    flags: "i",
    type: "regex",
    message: "وضعت فاصلة منقوطة ';' مباشرة بعد شرط if. هذا ينهي الجملة الشرطية فوراً ويجعل كتلة الأوامر التالية تنفذ دائماً."
  },
  unclosedBrace: {
    pattern: "\\{[^}]*$",
    flags: "",
    type: "regex",
    message: "فتحت كتلة أوامر برمجية بقوس '{' ولكنك نسيت إغلاقه بقوس المقابلة '}'."
  },
  unclosedBracket: {
    pattern: "\\[[^\\]]*$",
    flags: "",
    type: "regex",
    message: "فتحت مصفوفة بقوس '[' ولكنك نسيت إغلاقه بقوس المقابلة ']'."
  },
  unclosedParenthesis: {
    pattern: "\\([^)]*$",
    flags: "",
    type: "regex",
    message: "فتحت قوس استدعاء دالة أو شرط '(' دون إغلاقه بقوس المقابلة ')'."
  },

  // Typos & Keywords
  consoleLogTypo: {
    pattern: "\\b(consol|conosle|cosnole|cosole)\\.log\\b",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في كتابة كائن الطباعة console. الكلمة الصحيحة هي console.log(...)."
  },
  consolePrintTypo: {
    pattern: "\\bconsole\\.(print|write|println)\\b|(?<![a-zA-Z0-9_.])print\\s*\\(",
    flags: "i",
    type: "regex",
    message: "في JavaScript للويب، أمر عرض المخرجات في وحدة التحكم هو console.log(...) وليس print."
  },
  functionKeywordTypo: {
    pattern: "\\b(funtion|funciton|fuction|fnction)\\b",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في الكلمة المفتاحية لتعريف الدوال. الكلمة الصحيحة هي function."
  },
  constKeywordTypo: {
    pattern: "\\b(cosnt|cotns|cnost)\\b",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في الكلمة المفتاحية للثوابت. الكلمة الصحيحة هي const."
  },

  // Variables & Scope
  constWithoutInit: {
    pattern: "\\bconst\\s+[a-zA-Z_$][a-zA-Z0-9_$]*\\s*;",
    flags: "i",
    type: "regex",
    message: "أعلنت عن ثابت const دون إسناد قيمة ابتدائية له. في JavaScript، يتطلب const قيمة أولية فور إعلانه."
  },
  arrayParenthesesIndex: {
    pattern: "\\b([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*\\(\\s*\\d+\\s*\\)(?!\\s*=>)",
    flags: "i",
    type: "regex",
    message: "استخدمت أقواساً دائرية () للوصول لعنصر مصفوفة. في JavaScript نستخدم الأقواس المربعة [0] للمصفوفات."
  },
  nanDirectComparison: {
    pattern: "[!=]==?\\s*NaN\\b|\\bNaN\\s*[!=]==?",
    flags: "i",
    type: "regex",
    message: "قيمة NaN لا تساوي نفسها أبداً (NaN === NaN ينتج false). استخدم الدالة Number.isNaN(...) أو isNaN(...) لفحصها."
  },
  tripleEqualsMissing: {
    pattern: "(?:===|!==)",
    flags: "",
    type: "structure",
    message: "يُفضل دائماً في JavaScript الحديثة استخدام المقارنة الصارمة '===' للتحقق من القيمة والنوع معاً وتجنب التحويل التلقائي للأنواع."
  }
};

module.exports = { JS_RULES };

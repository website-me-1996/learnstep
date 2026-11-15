/**
 * curriculum/database/rules_catalog.cjs
 *
 * Comprehensive, verified catalog of regex error detection rules for SQL & Database curriculum.
 * Detects common misconceptions: NULL comparisons, wrong string quotes, clause ordering,
 * missing join conditions, unsafe DML without WHERE, and syntax errors.
 */

const SQL_RULES = {
  // 1. Comparison & Null Handling
  nullDirectEquality: {
    pattern: "(?:=\\s*NULL|!=\\s*NULL|<>\\s*NULL)",
    flags: "i",
    type: "regex",
    message: "في لغة SQL، لا يمكن مقارنة القيمة المجهولة NULL باستخدام علامة المساواة '=' أو '<>'. استخدم دائماً 'IS NULL' أو 'IS NOT NULL'."
  },
  doubleEqualsComparison: {
    pattern: "==",
    flags: "",
    type: "regex",
    message: "استخدمت علامة مساواة مزدوجة '==' للمقارنة؛ في SQL القياسية نستخدم علامة مساواة مفردة '=' للمقارنة في عبارة WHERE."
  },
  notEqualsExclamation: {
    pattern: "!=",
    flags: "",
    type: "regex",
    message: "على الرغم من أن بعض المحركات تدعم '!=', إلا أن المعيار القياسي ANSI SQL والأنسب عبر كافة الأنظمة هو استخدام '<>' للمقارنة بعدم المساواة."
  },

  // 2. String Quotation & Types
  doubleQuotedLiteral: {
    pattern: "WHERE\\s+.*=\\s*\"[^\"]+\"",
    flags: "i",
    type: "regex",
    message: "استخدمت علامات تنصيص مزدوجة \"...\" للقيم النصية. في معيار SQL، علامات التنصيص المزدوجة مخصصة لأسماء الجداول والأعمدة، بينما القيم النصية تتطلب علامات تنصيص مفردة '...'."
  },
  unclosedSingleQuote: {
    pattern: "^[^'\\r\\n]*(?:'[^'\\r\\n]*'[^'\\r\\n]*)*'[^'\\r\\n]*$",
    flags: "m",
    type: "regex",
    message: "فتحت علامة تنصيص نصية مفردة ' ولكنك نسيت إغلاقها بالعلامة المقابلة '."
  },
  unquotedStringLiteral: {
    pattern: "=\\s*([a-zA-Z_\u0621-\u064A][a-zA-Z0-9_\u0621-\u064A]*)\\s*(?:;|$|\\bAND\\b|\\bOR\\b)",
    flags: "i",
    type: "regex",
    message: "كتبت قيمة نصية بدون علامات تنصيص؛ مما يجعل محرك قاعدة البيانات يعتبرها اسماً لعمود آخر. أحط النصوص بعلامات تنصيص مفردة مثل 'Ahmed'."
  },

  // 3. Clause Ordering & Misconceptions
  whereAfterGroupBy: {
    pattern: "\\bGROUP\\s+BY\\b[\\s\\S]*?\\bWHERE\\b",
    flags: "i",
    type: "regex",
    message: "وضعت عبارة WHERE بعد GROUP BY. الترتيب القياسي الصارم لـ SQL يتطلب أن تسبق WHERE عبارة GROUP BY لتصفية الصفوف قبل تجميعها."
  },
  whereAfterOrderBy: {
    pattern: "\\bORDER\\s+BY\\b[\\s\\S]*?\\bWHERE\\b",
    flags: "i",
    type: "regex",
    message: "وضعت عبارة WHERE بعد ORDER BY. عبارة ORDER BY تأتي دائماً في نهاية الاستعلام بعد WHERE و GROUP BY و HAVING."
  },
  havingWithoutGroupBy: {
    pattern: "^(?!.*\\bGROUP\\s+BY\\b).*\\bHAVING\\b",
    flags: "is",
    type: "regex",
    message: "استخدمت عبارة HAVING دون وجود تجميع GROUP BY. تُستخدم HAVING خصيصاً لتصفية المجموعات بعد التجميع، لتصفية الصفوف العادية استخدم WHERE."
  },
  aggregateInWhereClause: {
    pattern: "\\bWHERE\\b[\\s\\S]*?\\b(COUNT|SUM|AVG|MIN|MAX)\\s*\\(",
    flags: "i",
    type: "regex",
    message: "لا يمكن استخدام الدوال التجميعية (مثل COUNT أو AVG) داخل عبارة WHERE لأن WHERE تُنفذ قبل حساب التجميعات. استخدم عبارة HAVING لتصفية نتائج الدوال التجميعية."
  },

  // 4. Pattern Matching & Range Misconceptions
  likeWithAsterisk: {
    pattern: "\\bLIKE\\s+'[^']*\\*[^']*'",
    flags: "i",
    type: "regex",
    message: "استخدمت الرمز '*' مع عبارة LIKE. في لغة SQL، رمز التطابق الشامل البديل هو '%' للعديد من الحروف، أو '_' لحرف واحد فقط."
  },
  betweenWithoutAnd: {
    pattern: "\\bBETWEEN\\b\\s+[a-zA-Z0-9_']+\\s+(?!AND\\b)[a-zA-Z0-9_']+",
    flags: "i",
    type: "regex",
    message: "تتطلب عبارة BETWEEN استخدام الكلمة المفتاحية AND لتحديد المجال، مثل: BETWEEN 10 AND 50."
  },

  // 5. Join Misconceptions
  joinMissingOnClause: {
    pattern: "\\b(?:INNER|LEFT|RIGHT|FULL)\\s+JOIN\\s+[a-zA-Z0-9_]+(?![\\s\\S]*?\\bON\\b)[^;]*;",
    flags: "i",
    type: "regex",
    message: "نسيت تحديد شرط الربط عبر عبارة ON بعد JOIN. الربط العلائقي يتطلب شرطاً مثل: ON table1.id = table2.fk_id."
  },

  // 6. DML Safety Checks
  updateWithoutWhere: {
    pattern: "^\\s*(?![\\s\\S]*\\bWHERE\\b)UPDATE\\s+[a-zA-Z0-9_]+\\s+SET\\s+[^;]+;?$",
    flags: "i",
    type: "regex",
    message: "تنبيه أمان حرج: كتبت أمر UPDATE بدون عبارة WHERE! هذا سيؤدي لتعديل كافة الصفوف في الجدول وتدمير البيانات القائمة."
  },
  deleteWithoutWhere: {
    pattern: "^\\s*(?![\\s\\S]*\\bWHERE\\b)DELETE\\s+FROM\\s+[a-zA-Z0-9_]+[^;]*;?$",
    flags: "i",
    type: "regex",
    message: "تنبيه أمان حرج: كتبت أمر DELETE بدون عبارة WHERE! هذا سيحذف جميع السجلات من الجدول بالكامل."
  },

  // 7. Delimiters & Parentheses
  unclosedParenthesis: {
    pattern: "\\([^)]*$",
    flags: "m",
    type: "regex",
    message: "فتحت قوساً '(' في استعلامك ولكنك نسيت إغلاقه بقوس المقابلة ')'."
  },
  trailingCommaInSelect: {
    pattern: ",\\s*FROM\\b",
    flags: "i",
    type: "regex",
    message: "وضعت فاصلة زائدة ',' بعد آخر عمود قبل الكلمة المفتاحية FROM مباشرة. احذف الفاصلة الأخيرة لتفادي خطأ في التحليل النحوي."
  },
  missingSemicolon: {
    pattern: "[^;\\s]\\s*$",
    flags: "",
    type: "structure",
    message: "يُستحسن دائماً إنهاء جمل SQL بفاصلة منقوطة ';' كمعيار قياسي لإنهاء الأوامر البرمجية."
  }
};

module.exports = {
  SQL_RULES,
  rules: SQL_RULES
};

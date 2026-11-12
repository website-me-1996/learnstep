/**
 * curriculum/html/rules_catalog.cjs
 *
 * Reusable catalog of tested regex error detection rules for HTML curriculum.
 */

const RULES = {
  missingDoctype: {
    pattern: "^\\s*<!DOCTYPE\\s+html>",
    flags: "i",
    type: "missing",
    message: "المستند يفتقر إلى إعلان نوع المستند <!DOCTYPE html> في السطر الأول ليعمل في الوضع القياسي (Standards Mode)."
  },
  doctypeMissingExclamation: {
    pattern: "<DOCTYPE\\b",
    flags: "i",
    type: "regex",
    message: "كتبت <DOCTYPE> دون علامة التعجب !. الإعلان الصحيح يبدأ بـ <!DOCTYPE html>."
  },
  unclosedTitle: {
    pattern: "<title\\b[^>]*>(?:(?!<\\/title>)[\\s\\S])*$",
    flags: "i",
    type: "regex",
    message: "فتحت وسم <title> ولكنك لم تغلقه بـ </title>. المتصفح سيعتبر بقية المستند جزءاً من العنوان."
  },
  mismatchedPSpan: {
    pattern: "<p\\b[^>]*>(?:(?!<\\/p>)[\\s\\S])*?<\\/span>",
    flags: "i",
    type: "regex",
    message: "أغلقت وسم الفقرة <p> بوسم </span> غير مطابق. يجب أن يطابق وسم الإغلاق وسم البداية </p>."
  },
  mismatchedHTag: {
    pattern: "<h([1-6])\\b[^>]*>(?:(?!<\\/h\\1>)[\\s\\S])*?<\\/h(?!\\1)[1-6]>",
    flags: "i",
    type: "regex",
    message: "رقم وسم عنوان الإغلاق لا يطابق رقم وسم البداية (مثلاً بدأت بـ <h1> وأغلقت بـ </h2>)."
  },
  missingClosingSlash: {
    pattern: "<(?!(?:br|hr|img|input|meta|link)\\b)([a-z1-6]+)\\b[^>]*>[^<]+<\\1>",
    flags: "i",
    type: "regex",
    message: "كتبت وسم البداية مجدداً بدلاً من وسم الإغلاق. وسم الإغلاق يتطلب شرطة مائلة مثل </$1>."
  },
  invalidSelfClosingContainer: {
    pattern: "<(p|div|h[1-6]|ul|ol|li|table|span|a)\\b[^>]*\\/>",
    flags: "i",
    type: "regex",
    message: "العناصر الحاوية مثل <$1> لا تُغلق ذاتياً بـ />، بل تحتاج إلى وسم إغلاق منفصل </$1>."
  },
  misplacedAttributeOutsideTag: {
    pattern: "<[a-z1-6]+\\s*>\\s*(?:src|href|class|id|alt|style|type)\\s*=",
    flags: "i",
    type: "regex",
    message: "الخاصية مكتوبة خارج أقواس الوسم. ضع الخصائص داخل وسم الفتح قبل > مباشرة."
  },
  missingImgAlt: {
    pattern: "<img(?![^>]*\\balt\\s*=)[^>]*>",
    flags: "i",
    type: "regex",
    message: "عنصر الصورة <img> يفتقر إلى خاصية النص البديل alt=\"...\". هي خاصية إجبارية لإتاحة الوصول ومحركات البحث."
  },
  missingImgSrc: {
    pattern: "<img(?![^>]*\\bsrc\\s*=)[^>]*>",
    flags: "i",
    type: "regex",
    message: "عنصر الصورة <img> يفتقر إلى خاصية مسار الصورة src=\"...\". بدونها لا يستطيع المتصفح معرفة ملف الصورة لعرضه."
  },
  missingAHref: {
    pattern: "<a(?![^>]*\\bhref\\s*=)[^>]*>",
    flags: "i",
    type: "regex",
    message: "وسم الرابط <a> يفتقر إلى خاصية وجهة الرابط href=\"...\". بدونها لن يعمل الرابط كنقر تفاعلي."
  },
  invalidNestingDivInP: {
    pattern: "<p\\b[^>]*>(?:(?!<\\/p>)[\\s\\S])*?<div\\b",
    flags: "i",
    type: "regex",
    message: "تداخل غير قياسي: عنصر الكتلة <div> لا يجوز وضعه داخل فقرة <p>. المتصفح سيقوم بإغلاق <p> قسراً قبل <div>."
  },
  invalidNestingPInP: {
    pattern: "<p\\b[^>]*>(?:(?!<\\/p>)[\\s\\S])*?<p\\b",
    flags: "i",
    type: "regex",
    message: "تداخل غير قياسي: لا يمكن فتح فقرة <p> جديدة داخل فقرة سابقة دون إغلاق الأولى بـ </p>."
  },
  typoHeadingLevel: {
    pattern: "<\\/?h[0789]\\b",
    flags: "i",
    type: "regex",
    message: "وسوم العناوين القياسية في HTML محصورة بين <h1> و <h6> فقط. الوسم المستخدم غير قياسي."
  },
  typoImageTag: {
    pattern: "<\\/?image\\b",
    flags: "i",
    type: "regex",
    message: "اسم وسم الصورة في HTML هو <img> (اختصار image) وليس <image>."
  },
  typoLinkAnchor: {
    pattern: "<link\\s+href=[\"'][^\"']+[\"']>[^<]+<\\/link>",
    flags: "i",
    type: "regex",
    message: "استخدمت <link> لإنشاء رابط في الصفحة. الوسم المخصص للروابط النصية التفاعلية هو <a> وليس <link>."
  },
  missingHtmlRoot: {
    pattern: "<html\\b[^>]*>",
    flags: "i",
    type: "missing",
    message: "المستند يفتقر إلى العنصر الجذري <html> الذي يحيط بكامل كود الصفحة."
  },
  missingHeadTag: {
    pattern: "<head\\b[^>]*>",
    flags: "i",
    type: "missing",
    message: "المستند يفتقر إلى قسم الرأس <head> المخصص للبيانات الوصفية والعنوان."
  },
  missingBodyTag: {
    pattern: "<body\\b[^>]*>",
    flags: "i",
    type: "missing",
    message: "المستند يفتقر إلى قسم المتن <body> الذي يوضع داخله المحتوى المرئي للزائر."
  },
  contentOutsideBody: {
    pattern: "<\\/body>\\s*<[a-z1-6]+",
    flags: "i",
    type: "regex",
    message: "وضعت عناصر HTML بعد إغلاق متن الصفحة </body>. يجب أن تكون كافة العناصر المرئية داخل <body> وقبل وسم إغلاقه."
  },
  titleInBody: {
    pattern: "<body\\b[^>]*>[\\s\\S]*?<title\\b",
    flags: "i",
    type: "regex",
    message: "وسم <title> مكانه الصحيح حصراً داخل قسم <head>، ولا يجوز وضعه داخل <body>."
  },
  typoClassAttribute: {
    pattern: "\\b(?:calss|clss|clas)\\s*=",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في اسم الخاصية: الكلمة الصحيحة هي class=\"...\"."
  },
  typoHrefAttribute: {
    pattern: "\\b(?:herf|hef|hrf)\\s*=",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في خاصية الرابط: الكلمة الصحيحة هي href=\"...\"."
  },
  typoSrcAttribute: {
    pattern: "\\b(?:scr|sre)\\s*=",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في خاصية مسار الملف: الكلمة الصحيحة هي src=\"...\" (اختصار source)."
  },
  unquotedUrlAttribute: {
    pattern: "\\b(?:href|src)\\s*=\\s*https?:\\/\\/[^\"'\\s>]+",
    flags: "i",
    type: "regex",
    message: "قيمة الرابط أو المسار غير محاطة بعلامات اقتباس \"...\". احرص دائماً على وضع الرابط داخل علامتي اقتباس."
  },
  mismatchedListUlOl: {
    pattern: "<ul\\b[^>]*>(?:(?!<\\/ul>)[\\s\\S])*?<\\/ol>",
    flags: "i",
    type: "regex",
    message: "فتحت قائمة غير مرتبة <ul> ولكنك أغلقتها بـ </ol>. يجب إغلاقها بـ </ul>."
  },
  mismatchedListOlUl: {
    pattern: "<ol\\b[^>]*>(?:(?!<\\/ol>)[\\s\\S])*?<\\/ul>",
    flags: "i",
    type: "regex",
    message: "فتحت قائمة مرتبة <ol> ولكنك أغلقتها بـ </ul>. يجب إغلاقها بـ </ol>."
  },
  tdOutsideTr: {
    pattern: "<table\\b[^>]*>(?:(?!<tr\\b)[\\s\\S])*?<td\\b",
    flags: "i",
    type: "regex",
    message: "خلية الجدول <td> يجب أن تكون دائماً داخل صف <tr>."
  },
  voidElementClosingTag: {
    pattern: "<(br|hr|img|input|meta|link)\\b[^>]*>\\s*<\\/\\1>",
    flags: "i",
    type: "regex",
    message: "عنصر <$1> عنصر فارغ (Void Element) لا يقبل وسم إغلاق منفصل مثل </$1>."
  }
};

module.exports = { RULES };

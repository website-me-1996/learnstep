/**
 * curriculum/css/rules_catalog.cjs
 *
 * Comprehensive, verified catalog of regex error detection rules for the CSS curriculum.
 */

const CSS_RULES = {
  // Semicolon & Delimiter Rules
  missingSemicolonBetweenLines: {
    pattern: "(?:^|\\{|\\n)\\s*([a-z-]+)\\s*:\\s*([^;{}\\n\\r]+?)\\s*\\n\\s*([a-z-]+)\\s*:",
    flags: "i",
    type: "regex",
    message: "نسيت وضع الفاصلة المنقوطة ';' في نهاية سطر الخاصية. بدونها يدمج المتصفح السطرين معاً ويتجاهل التنسيق."
  },
  missingSemicolonBeforeCloseBrace: {
    pattern: "(?:^|\\{|\\n)\\s*([a-z-]+)\\s*:\\s*([^;{}\\n\\r]+?)\\s*\\}",
    flags: "i",
    type: "regex",
    message: "يُستحسن إنهاء الخاصية بفاصلة منقوطة ';' قبل قوس الإغلاق '}' لتجنب أخطاء التحليل."
  },
  colonReplacedBySemicolonOrComma: {
    pattern: "(?:^|[{;\\n])\\s*([a-z-]+)\\s*[,;]\\s*[^:;{}\\n\\r]+;",
    flags: "i",
    type: "regex",
    message: "استخدمت فاصلة أو فاصلة منقوطة بدلاً من النقطتين الرأسيتين ':' بعد اسم الخاصية."
  },

  // Units & Numbers Rules
  bareNumberInDimension: {
    pattern: "(?:^|[;{\\s])(width|height|min-width|max-width|min-height|max-height|margin(?:-(?:top|right|bottom|left))?|padding(?:-(?:top|right|bottom|left))?|font-size|top|right|bottom|left|gap|row-gap|column-gap|border-width|border-radius|letter-spacing|word-spacing)\\s*:[^;}]*?\\b([1-9]\\d*(?:\\.\\d+)?)(?=\\s|;|\\n|\\}|$)",
    flags: "i",
    type: "regex",
    message: "القيمة الرقمية تفتقر إلى وحدة قياس صريحة (مثل px أو rem أو %). في CSS، الأرقام غير الصفرية للأبعاد تتطلب دائماً وحدة قياس."
  },
  angleMissingDeg: {
    pattern: "\\b(?:rotate|skew[XY]?|linear-gradient)\\s*\\(\\s*(?:[^\\),;]*\\s+)?([1-9]\\d*)\\s*(?:,|\\))",
    flags: "i",
    type: "regex",
    message: "زاوية الدوران أو التدرج اللوني تفتقر إلى وحدة الزاوية deg. اكتب 45deg بدلاً من 45."
  },
  timeMissingUnit: {
    pattern: "\\b(?:transition(?:-duration)?|animation(?:-duration)?)\\s*:\\s*(?:[^;{}]*?\\s+)?([0-9]+(?:\\.[0-9]+)?)\\s*(?:;|\\n|\\})",
    flags: "i",
    type: "regex",
    message: "مدة الحركة تفتقر إلى وحدة زمنية صريحة (مثل s للثواني أو ms للميلي ثانية). اكتب 0.3s بدلاً من 0.3."
  },
  negativePadding: {
    pattern: "\\bpadding(?:-(?:top|right|bottom|left))?\\s*:\\s*-[1-9]",
    flags: "i",
    type: "regex",
    message: "الهوامش الداخلية padding لا تقبل قيماً سالبة على الإطلاق في معيار CSS."
  },

  // Typos & Spelling Rules
  commonPropertyTypo: {
    pattern: "\\b(colour|collor|background-colour|background-collor|backgroud-color|bg-color|algn-items|align-item|alig-items|justfy-content|justify-contents|dispaly|disply|pad-left|pading|paddng|magin|mrgin|positon|posistion|zindex|font-colour|font-collor|widht|heigth)\\s*:",
    flags: "i",
    type: "regex",
    message: "خطأ إملائي في اسم الخاصية: تحقق من كتابة الكلمة الإنجليزية بدقة وفق معيار CSS (مثل color بدلاً من colour أو collor)."
  },
  hyphenatedPropertyAndValue: {
    pattern: "\\b(text-align-center|display-flex|flex-direction-column|justify-content-center|align-items-center)\\b",
    flags: "i",
    type: "regex",
    message: "كتبت الخاصية وقيمتها مدمجتين بشرطة. افصل بين الخاصية والقيمة بنقطتين رأسيتين ':' مثل display: flex;."
  },
  textAlignMiddleInvalid: {
    pattern: "\\btext-align\\s*:\\s*middle\\b",
    flags: "i",
    type: "regex",
    message: "القيمة middle غير صالحة لخاصية text-align. استخدم center للمحاذاة الأفقية."
  },

  // Selector Syntax Rules
  unclosedBrace: {
    pattern: "\\{[^}]*$",
    flags: "",
    type: "regex",
    message: "فتحت كتلة محدد CSS بقوس '{' ولكنك نسيت إغلاقه بقوس المقابلة '}' في نهاية القاعدة."
  },
  invalidCombinator: {
    pattern: "[>+~]\\s*[>+~]",
    flags: "i",
    type: "regex",
    message: "صيغة محدد غير قياسية: لا يجوز تكرار معاملات الربط المتتالية مثل '> >' أو '+ +'."
  },
  danglingCombinator: {
    pattern: "[>+~]\\s*\\{",
    flags: "i",
    type: "regex",
    message: "ينتهي المحدد بمعامل ربط (مثل > أو +) دون تحديد العنصر التابع قبل القوس '{'."
  },
  spaceBeforePseudoClass: {
    pattern: "(?:^|[\\s,>+~])([a-z0-9_-]+|[.#][a-z0-9_-]+)(?:\\s+:\\s*|:\\s+)(hover|focus|active|visited)\\b",
    flags: "i",
    type: "regex",
    message: "وضعت مسافة بين العنصر والـ Pseudo-class مثل 'button: hover' أو 'a :hover'. احذف المسافة لتصبح 'button:hover'."
  },
  classMissingDot: {
    pattern: "(?:^|\\n)\\s*(card|btn|box|container|navbar|sidebar|header-content|hero|avatar|badge|modal|dropdown|grid-container|flex-row)\\s*\\{",
    flags: "i",
    type: "regex",
    message: "حددت اسم فئة (Class) دون وضع نقطة '.' في البداية."
  },

  // Layout & Context Conflicts
  conflictingFlexFloat: {
    pattern: "(?:display\\s*:\\s*(?:inline-)?flex[\\s\\S]*?\\bfloat\\s*:\\s*(?:left|right)|\\bfloat\\s*:\\s*(?:left|right)[\\s\\S]*?display\\s*:\\s*(?:inline-)?flex)",
    flags: "i",
    type: "regex",
    message: "خاصية float ليس لها أي تأثير على عناصر Flexbox (تتجاهلها المواصفة تماماً). استخدم محاذاة flex بدلاً من float."
  },
  flexPropsWithoutFlexOrGrid: {
    pattern: "^(?![\\s\\S]*display\\s*:\\s*(?:inline-)?(?:flex|grid))[\\s\\S]*\\b(?:justify-content|align-items|flex-direction|flex-wrap)\\s*:",
    flags: "i",
    type: "regex",
    message: "استخدمت خواص محاذاة مرنة (مثل justify-content أو align-items) على عنصر لا يحمل display: flex أو display: grid."
  },
  gridPropsWithoutGrid: {
    pattern: "^(?![\\s\\S]*display\\s*:\\s*(?:inline-)?grid)[\\s\\S]*\\bgrid-template-(?:columns|rows|areas)\\s*:",
    flags: "i",
    type: "regex",
    message: "حددت تقسيم شبكي (grid-template) دون تفعيل نمط العرض الشبكي display: grid على الحاوية."
  },
  zIndexOnStaticPosition: {
    pattern: "(?:\\bposition\\s*:\\s*static\\b[\\s\\S]*?\\bz-index\\s*:|\\bz-index\\s*:[\\s\\S]*?\\bposition\\s*:\\s*static\\b)",
    flags: "i",
    type: "regex",
    message: "خاصية z-index لا تعمل على العناصر ذات التموضع الافتراضي position: static. عيّن position بقيمة relative أو absolute أو fixed أولاً."
  },
  zIndexWithoutPosition: {
    pattern: "^(?![\\s\\S]*\\bposition\\s*:\\s*(?:relative|absolute|fixed|sticky)\\b)(?![\\s\\S]*\\bdisplay\\s*:\\s*(?:flex|grid)\\b)[\\s\\S]*\\bz-index\\s*:",
    flags: "i",
    type: "regex",
    message: "حددت طبقة z-index دون تحديد تموضع للعنصر. عناصر التدفق الطبيعي تتجاهل z-index ما لم تكن ذات تموضع مخصص."
  },

  // Modern Syntax & Media Queries
  varUsedWithoutVarFunction: {
    pattern: ":\\s*--[a-z0-9_-]+\\s*(?:;|\\})",
    flags: "i",
    type: "regex",
    message: "استخدمت متغير CSS مباشرة دون تغليفه بدالة var(). الصياغة الصحيحة: var(--variable-name)."
  },
  calcMissingSpaces: {
    pattern: "calc\\([^)]*?(?:(?:\\d+[a-z%]*|\\))[+-]|\\s[+-]\\d)",
    flags: "i",
    type: "regex",
    message: "تشترط مواصفة CSS وجود مسافات حول إشارتي + و - داخل دالة calc(). مثال: calc(100% - 20px)."
  },
  mediaMissingParentheses: {
    pattern: "@media\\s+(?:(?:screen|all|print)\\s+and\\s+)?(?:min|max)-(?:width|height)\\s*:",
    flags: "i",
    type: "regex",
    message: "أقواس شرط الاستعلام مفقودة في @media. يجب وضع الشرط داخل أقواس، مثل @media (min-width: 768px)."
  },
  repeatMissingComma: {
    pattern: "repeat\\(\\s*\\d+\\s+[^,\\)]+\\)",
    flags: "i",
    type: "regex",
    message: "دالة repeat() في CSS Grid تفصل بين عدد التكرارات والحجم بفاصلة عادية ','، مثل repeat(3, 1fr)."
  }
};

// Aliases for test suites and concise lookups
CSS_RULES.missingSemicolon = CSS_RULES.missingSemicolonBetweenLines;
CSS_RULES.missingUnit = CSS_RULES.bareNumberInDimension;
CSS_RULES.typoCollor = CSS_RULES.commonPropertyTypo;
CSS_RULES.pseudoClassSpace = CSS_RULES.spaceBeforePseudoClass;
CSS_RULES.zIndexStatic = CSS_RULES.zIndexOnStaticPosition;

module.exports = { CSS_RULES };

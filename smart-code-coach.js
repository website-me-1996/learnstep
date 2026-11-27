/**
 * smart-code-coach.js
 *
 * Zero-signup, zero-download, line-targeted diagnostic and next-token predictive engine
 * for HTML, CSS, JavaScript, SQL/Database, C#, and Angular/TypeScript.
 *
 * Works in browser (window.SmartCodeCoach) and Node.js (module.exports).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SmartCodeCoach = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var DICTIONARIES = {
    htmlTags: [
      "html", "head", "title", "meta", "link", "style", "body",
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span",
      "a", "img", "ul", "ol", "li", "table", "tr", "th", "td", "thead", "tbody",
      "form", "input", "label", "button", "select", "option", "textarea",
      "strong", "em", "mark", "del", "ins", "sub", "sup", "br", "hr",
      "header", "nav", "main", "section", "article", "footer", "aside",
      "figure", "figcaption", "audio", "video", "source", "canvas", "svg", "iframe"
    ],
    htmlAttrs: [
      "href", "src", "alt", "title", "class", "id", "type", "name", "value",
      "placeholder", "required", "disabled", "width", "height", "lang", "dir",
      "charset", "rel", "target", "controls", "action", "method", "for", "style"
    ],
    cssProps: [
      "color", "background", "background-color", "background-image", "background-size",
      "font-size", "font-family", "font-weight", "font-style", "line-height",
      "text-align", "text-decoration", "letter-spacing",
      "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
      "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
      "border", "border-radius", "border-color", "border-width", "border-style",
      "width", "height", "max-width", "min-width", "max-height", "min-height",
      "display", "position", "top", "right", "bottom", "left", "z-index",
      "flex", "flex-direction", "flex-wrap", "justify-content", "align-items", "gap",
      "grid", "grid-template-columns", "grid-template-rows", "grid-gap",
      "opacity", "box-shadow", "text-shadow", "transition", "transform", "animation",
      "cursor", "overflow", "object-fit", "box-sizing", "visibility", "float", "clear"
    ],
    jsKeywords: [
      "const", "let", "var", "function", "return", "if", "else", "for", "while",
      "switch", "case", "break", "continue", "try", "catch", "finally", "throw",
      "async", "await", "import", "export", "default", "class", "constructor",
      "console", "document", "window", "Math", "Array", "Object", "String",
      "Number", "Boolean", "JSON", "Promise", "fetch", "Map", "Set",
      "querySelector", "querySelectorAll", "getElementById", "addEventListener",
      "textContent", "innerHTML", "createElement", "appendChild", "classList",
      "push", "pop", "map", "filter", "reduce", "forEach", "find", "includes", "length"
    ],
    sqlKeywords: [
      "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET",
      "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "JOIN", "INNER", "LEFT",
      "RIGHT", "FULL", "CROSS", "ON", "GROUP", "BY", "HAVING", "ORDER", "ASC",
      "DESC", "LIMIT", "OFFSET", "DISTINCT", "AS", "AND", "OR", "NOT", "IN",
      "BETWEEN", "LIKE", "ILIKE", "IS", "NULL", "COUNT", "SUM", "AVG", "MIN",
      "MAX", "BEGIN", "COMMIT", "ROLLBACK", "SAVEPOINT", "RETURNING", "PRIMARY",
      "KEY", "FOREIGN", "REFERENCES", "UNIQUE", "CHECK", "DEFAULT", "WITH",
      "RECURSIVE", "OVER", "PARTITION", "CASE", "WHEN", "THEN", "ELSE", "END",
      "COALESCE", "CAST", "EXISTS", "EXPLAIN", "ANALYZE"
    ],
    csharpSymbols: [
      "Console", "WriteLine", "Write", "ReadLine", "string", "int", "double",
      "decimal", "bool", "char", "var", "if", "else", "for", "foreach", "while",
      "break", "continue", "return", "class", "void", "public", "private",
      "static", "new", "true", "false", "null", "List", "Dictionary", "Queue",
      "Stack", "HashSet", "TryParse", "Parse", "Length", "Count", "Add",
      "Enqueue", "Dequeue", "Push", "Pop", "ContainsKey", "GetLength"
    ],
    angularSymbols: [
      "Component", "Injectable", "input", "output", "model", "signal", "computed",
      "effect", "inject", "NgModule", "CommonModule", "ReactiveFormsModule",
      "FormGroup", "FormControl", "Validators", "HttpClient", "provideHttpClient",
      "withFetch", "toSignal", "asReadonly", "standalone", "template", "templateUrl",
      "imports", "selector", "styleUrl", "track", "required", "nonNullable",
      "CanActivateFn", "Routes", "Router", "HttpInterceptorFn"
    ]
  };

  var VOID_HTML_TAGS = {
    area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1,
    input: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
  };

  function arNum(n) {
    var digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(n).replace(/\d/g, function (d) { return digits[+d]; });
  }

  function levenshtein(a, b) {
    a = String(a || "");
    b = String(b || "");
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var matrix = [];
    var i, j;
    for (i = 0; i <= b.length; i++) matrix[i] = [i];
    for (j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function findClosestMatch(word, dict, maxDist, caseSensitive) {
    if (!word || !dict || !dict.length) return null;
    var best = null;
    var bestDist = typeof maxDist === "number" ? maxDist : 2;
    var wLower = word.toLowerCase();

    for (var k = 0; k < dict.length; k++) {
      if (dict[k].toLowerCase() === wLower) {
        if (caseSensitive && word !== dict[k]) {
          return { match: dict[k], distance: 0, caseMismatch: true };
        }
        return null;
      }
    }

    var wCmp = caseSensitive ? word : wLower;
    for (var i = 0; i < dict.length; i++) {
      var candidate = dict[i];
      var cCmp = caseSensitive ? candidate : candidate.toLowerCase();
      var d = levenshtein(wCmp, cCmp);
      if (d <= bestDist && (best === null || d < best.distance)) {
        best = { match: candidate, distance: d, caseMismatch: false };
      }
    }
    return best;
  }

  function normalizeLines(code) {
    return String(code || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  }

  function clipSnippet(str, max) {
    var s = String(str || "").trim();
    if (!s) return "";
    return s.length > (max || 64) ? s.slice(0, (max || 64) - 1) + "…" : s;
  }

  function normalizeLang(lang) {
    var k = String(lang || "").toLowerCase();
    if (k === "sql" || k === "database" || k === "db") return "database";
    if (k === "javascript" || k === "js") return "js";
    if (k === "typescript" || k === "ts" || k === "angular") return "angular";
    if (k === "c#" || k === "csharp" || k === "cs") return "csharp";
    if (k === "css") return "css";
    return "html";
  }

  function analyzeLineDiff(userCode, beforeCode, targetCode) {
    var uLines = normalizeLines(userCode);
    var bLines = normalizeLines(beforeCode || "");
    var tLines = normalizeLines(targetCode || "");

    // Find which line index changed from before -> target
    var targetEditIndex = -1;
    var maxBT = Math.max(bLines.length, tLines.length);
    for (var i = 0; i < maxBT; i++) {
      var bl = (bLines[i] || "").trim();
      var tl = (tLines[i] || "").trim();
      if (bl !== tl) {
        targetEditIndex = i;
        break;
      }
    }

    // Find first line where user diverges from target
    var diffIndex = -1;
    var maxUT = Math.max(uLines.length, tLines.length);
    for (var j = 0; j < maxUT; j++) {
      var ul = (uLines[j] || "").trim();
      var tl2 = (tLines[j] || "").trim();
      if (ul !== tl2) {
        diffIndex = j;
        break;
      }
    }

    // If user modified a line that should match targetEditIndex, prioritize that line
    var focusIndex = diffIndex >= 0 ? diffIndex : (targetEditIndex >= 0 ? targetEditIndex : 0);
    if (targetEditIndex >= 0 && uLines[targetEditIndex] !== undefined &&
        (uLines[targetEditIndex] || "").trim() !== (tLines[targetEditIndex] || "").trim()) {
      focusIndex = targetEditIndex;
    }

    // Also locate user line closest to targetLine if line numbers shifted
    var expectedLine = (tLines[focusIndex] !== undefined ? tLines[focusIndex] : (tLines[0] || "")).trim();
    var userLine = (uLines[focusIndex] !== undefined ? uLines[focusIndex] : "").trim();
    var beforeLine = (bLines[focusIndex] !== undefined ? bLines[focusIndex] : "").trim();

    if (expectedLine && !userLine && uLines.length > 0) {
      // Find closest non-empty user line
      var bestIdx = -1, bestScore = Infinity;
      for (var k = 0; k < uLines.length; k++) {
        var cand = uLines[k].trim();
        if (!cand) continue;
        var dist = levenshtein(cand.slice(0, 48), expectedLine.slice(0, 48));
        if (dist < bestScore) {
          bestScore = dist;
          bestIdx = k;
        }
      }
      if (bestIdx >= 0 && bestScore < expectedLine.length * 0.75) {
        focusIndex = bestIdx;
        userLine = uLines[bestIdx].trim();
      }
    }

    return {
      lineNumber: focusIndex + 1,
      focusIndex: focusIndex,
      userLine: userLine,
      expectedLine: expectedLine,
      beforeLine: beforeLine,
      isUnchangedFromBefore: !!beforeLine && userLine === beforeLine && expectedLine !== beforeLine
    };
  }

  function tokenizeSimple(line) {
    return String(line || "").match(/[A-Za-z_@$][\w-]*|\d+(?:\.\d+)?|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|<=|>=|===|!==|==|!=|=>|[^\s]/g) || [];
  }

  function predictNextToken(userLine, expectedLine, language) {
    var u = String(userLine || "").trim();
    var e = String(expectedLine || "").trim();
    if (!u || !e || u === e) return null;

    var lang = normalizeLang(language);
    // Case 1: direct prefix match (user stopped mid-line)
    var normU = u.replace(/'/g, '"');
    var normE = e.replace(/'/g, '"');
    if (normE.indexOf(normU) === 0 && normE.length > normU.length) {
      var remainder = e.slice(u.length).trim();
      var nextTokens = tokenizeSimple(remainder);
      var nextTok = nextTokens[0] || remainder.slice(0, 12);
      var preview = nextTokens.slice(0, 2).join(" ");

      var hint = "";
      if (u.endsWith(".")) {
        hint = "توقّفت عند النقطة في «" + clipSnippet(u, 36) + "» — المتوقع بعدها اسم عضو/دالة تبدأ بـ `" + nextTok + "` لتكمل المهمة.";
      } else if (u.endsWith("(") || u.endsWith("[") || u.endsWith("{")) {
        hint = "فتحت `" + u.slice(-1) + "` ووقفت هنا — الخطوة التالية كتابة ما بداخلها ثم إغلاقها.";
      } else if (u.endsWith(":") || u.endsWith("=") || /[:=]$/.test(u)) {
        hint = "توقّفت بعد `" + u.slice(-1) + "` — القيمة المتوقعة هنا هي `" + nextTok + "` وما يتبعها.";
      } else if (lang === "html" && u.endsWith("<")) {
        hint = "فتحت قوس وسم `<` — أي وسم يناسب هذه الخطوة؟";
      } else if (lang === "html" && /<([a-zA-Z0-9-]+)[^>]*>$/.test(u) && !remainder.startsWith("<")) {
        hint = "كتبت وسم الفتح بنجاح — بقي النص الداخلي ثم وسم الإغلاق المناسب.";
      } else if (remainder === ";" || remainder === "}" || remainder === ")" || remainder === '";') {
        hint = "اقتربت جدًا من نهاية السطر — لم يتبقَّ سوى علامة الإغلاق `" + remainder + "`.";
      } else {
        hint = "ما كتبته بداية سليمة للسطر؛ الرمز التالي المتوقع بعده هو `" + nextTok + "`.";
      }

      return {
        isPrefix: true,
        nextToken: nextTok,
        preview: preview,
        remainderLength: remainder.length,
        message: hint
      };
    }

    // Case 2: Token-level alignment to detect where tokens diverge
    var uToks = tokenizeSimple(u);
    var eToks = tokenizeSimple(e);
    var common = 0;
    while (common < uToks.length && common < eToks.length &&
           uToks[common].replace(/'/g, '"') === eToks[common].replace(/'/g, '"')) {
      common++;
    }
    if (common > 0 && common === uToks.length && uToks.length < eToks.length) {
      var nextExpected = eToks[common];
      return {
        isPrefix: true,
        nextToken: nextExpected,
        preview: eToks.slice(common, common + 2).join(" "),
        remainderLength: eToks.slice(common).join(" ").length,
        message: "التتابع الذي بدأته صحيح حتى `" + uToks[common - 1] + "` — يتوقع المحرك بعدها `" + nextExpected + "`."
      };
    }

    return null;
  }

  function diagnoseHtml(userCode, targetCode) {
    var lines = normalizeLines(userCode);
    var stack = [];
    var tagRe = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?\/?>/g;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var lineNum = i + 1;
      var cleanLine = line.replace(/<!--[\s\S]*?-->/g, "").replace(/<!doctype[^>]*>/gi, "");

      // Check unclosed quote inside a tag on this line
      var tagOpenMatches = cleanLine.match(/<[a-zA-Z0-9]+[^>]*>/g) || [];
      for (var t = 0; t < tagOpenMatches.length; t++) {
        var tagStr = tagOpenMatches[t];
        var dq = (tagStr.match(/"/g) || []).length;
        var sq = (tagStr.match(/'/g) || []).length;
        if (dq % 2 !== 0 || sq % 2 !== 0) {
          return {
            kind: "delimiter",
            lineNumber: lineNum,
            userSnippet: tagStr,
            tier1: "في السطر " + arNum(lineNum) + " فتحت علامة تنصيص داخل `" + clipSnippet(tagStr, 40) + "` ولم تغلقها — المتصفح سيبتلع بقية السطر كأنه جزء من القيمة.",
            tier2: "لماذا توقف قارئ HTML عند السطر " + arNum(lineNum) + "؟ لأن قيم الخصائص تحتاج علامتي تنصيص متطابقتين. هل أغلقت الاقتباس داخل الوسم؟",
            tier3: "راجع علامات التنصيص في السطر " + arNum(lineNum) + " داخل `" + clipSnippet(tagStr, 40) + "` وأغلقها قبل `>`."
          };
        }
      }

      // Check stray '<tag' missing '>'
      if (/<[a-zA-Z0-9]+(?:\s+[^>]*)?$/.test(cleanLine.trim())) {
        return {
          kind: "delimiter",
          lineNumber: lineNum,
          userSnippet: cleanLine.trim(),
          tier1: "في السطر " + arNum(lineNum) + " بدأ الوسم `" + clipSnippet(cleanLine.trim(), 36) + "` دون علامة إغلاق القوس `>`.",
          tier2: "كيف يعرف المتصفح أين ينتهي الوسم ويبدأ المحتوى؟ بعلامة `>`. هل أضفت `>` في نهاية وسم السطر " + arNum(lineNum) + "؟",
          tier3: "أغلق قوس الزاوية بوضع `>` في نهاية الوسم بالسطر " + arNum(lineNum) + "."
        };
      }

      // Check <title> inside <body>
      var bodyIdx = userCode.search(/<body\b/i);
      var titleIdx = userCode.search(/<title\b/i);
      if (bodyIdx >= 0 && titleIdx > bodyIdx) {
        var titleLine = userCode.slice(0, titleIdx).split("\n").length;
        return {
          kind: "scope",
          lineNumber: titleLine,
          userSnippet: (lines[titleLine - 1] || "").trim(),
          tier1: "في السطر " + arNum(titleLine) + " وضعت `<title>` داخل `<body>`؛ المتصفح يتوقع عنوان التبويب داخل `<head>` لا داخل جسم الصفحة.",
          tier2: "أين يبحث المتصفح عن اسم التبويب؟ داخل `<head>` فقط. هل تنقل وسم `<title>` من السطر " + arNum(titleLine) + " إلى قسم `<head>`؟",
          tier3: "انقل سطر `<title>...</title>` من السطر " + arNum(titleLine) + " ليصبح قبل `</head>`."
        };
      }

      // Stack check
      tagRe.lastIndex = 0;
      var m;
      while ((m = tagRe.exec(cleanLine)) !== null) {
        var full = m[0];
        var tagName = m[1].toLowerCase();
        var isClosing = full.charAt(1) === "/";
        var isVoid = full.slice(-2) === "/>" || !!VOID_HTML_TAGS[tagName];

        if (!isClosing) {
          // Check tag typo against known HTML tags
          if (DICTIONARIES.htmlTags.indexOf(tagName) < 0) {
            var closeTag = findClosestMatch(tagName, DICTIONARIES.htmlTags, 2, false);
            if (closeTag) {
              return {
                kind: "typo",
                lineNumber: lineNum,
                userSnippet: full,
                tier1: "في السطر " + arNum(lineNum) + " كتبت `<" + tagName + ">` — هذا الوسم غير معروف للمتصفح، والأقرب لما تقصده هو `<" + closeTag.match + ">`.",
                tier2: "عندما يرى المتصفح وسمًا غير قياسي مثل `<" + tagName + ">` يعامله كحاوية صامتة بلا معنى. هل قصدت كتابة `<" + closeTag.match + ">` بدلًا منه؟",
                tier3: "في السطر " + arNum(lineNum) + " صحّح اسم الوسم من `" + tagName + "` إلى `" + closeTag.match + "`."
              };
            }
          }
          if (!isVoid) stack.push({ tag: tagName, line: lineNum });
        } else {
          if (!stack.length) {
            return {
              kind: "syntax",
              lineNumber: lineNum,
              userSnippet: full,
              tier1: "في السطر " + arNum(lineNum) + " أغلقت وسم `</" + tagName + ">` ولم يكن مفتوحًا قبله.",
              tier2: "كل وسم إغلاق يحتاج وسم فتح يسبقه. هل نسيت فتح `<" + tagName + ">` قبل السطر " + arNum(lineNum) + "؟",
              tier3: "أضف وسم الفتح `<" + tagName + ">` قبل المحتوى أو احذف الإغلاق الزائد في السطر " + arNum(lineNum) + "."
            };
          }
          var top = stack.pop();
          if (top.tag !== tagName) {
            return {
              kind: "syntax",
              lineNumber: lineNum,
              userSnippet: full,
              tier1: "تعارض في السطر " + arNum(lineNum) + ": فتحت `<" + top.tag + ">` في السطر " + arNum(top.line) + " لكنك أغلقته بـ `</" + tagName + ">`.",
              tier2: "لماذا ارتبكت الشجرة هنا؟ لأن المتصفح ينتظر إغلاق آخر وسم فُتح أولًا. هل تطابق إغلاق السطر " + arNum(lineNum) + " مع `<" + top.tag + ">`؟",
              tier3: "استبدل `</" + tagName + ">` في السطر " + arNum(lineNum) + " بوسم `</" + top.tag + ">`."
            };
          }
        }
      }
    }

    var unclosed = stack.filter(function (item) {
      return ["html", "head", "body"].indexOf(item.tag) < 0;
    });
    if (unclosed.length) {
      var u = unclosed[unclosed.length - 1];
      return {
        kind: "delimiter",
        lineNumber: u.line,
        userSnippet: "<" + u.tag + ">",
        tier1: "في السطر " + arNum(u.line) + " فتحت `<" + u.tag + ">` وتركته بلا إغلاق؛ قد يمتد تأثيره لبقية الصفحة.",
        tier2: "العناصر الحاوية في HTML تحتاج نقطة نهاية واضحة. هل أضفت `</" + u.tag + ">` لإغلاق السطر " + arNum(u.line) + "؟",
        tier3: "أغلق العنصر بإضافة `</" + u.tag + ">` بعد محتوى السطر " + arNum(u.line) + "."
      };
    }

    return null;
  }

  function diagnoseCss(userCode) {
    var lines = normalizeLines(userCode);
    var braceDepth = 0;
    var lastOpenBraceLine = 1;

    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i];
      var line = raw.replace(/\/\*[\s\S]*?\*\//g, "").trim();
      var lineNum = i + 1;
      if (!line) continue;

      for (var c = 0; c < line.length; c++) {
        if (line[c] === "{") { braceDepth++; lastOpenBraceLine = lineNum; }
        else if (line[c] === "}") braceDepth--;
      }
      if (braceDepth < 0) {
        return {
          kind: "delimiter",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " يوجد قوس إغلاق `}` ليس له قوس فتح `{` قبله.",
          tier2: "الأقواس المعقوفة تحدد حدود القاعدة. هل هناك `}` زائد في السطر " + arNum(lineNum) + "؟",
          tier3: "احذف القوس `}` الزائد أو افتح القاعدة بـ `{` قبل الخصائص."
        };
      }

      // Inside a declaration block or single-line rule like `.card h1 { color #256b57; }`
      var declSection = line;
      if (line.indexOf("{") >= 0) {
        var afterBrace = line.split("{")[1] || "";
        declSection = afterBrace.replace(/\}\s*$/, "").trim();
      } else if (braceDepth === 0 || line === "}") {
        declSection = "";
      }

      if (declSection) {
        // Missing colon between property and value: e.g. `color #256b57;` or `color red`
        var missingColonMatch = declSection.match(/^([a-zA-Z-]+)\s+([^:;{}]+);?$/);
        if (missingColonMatch) {
          return {
            kind: "syntax",
            lineNumber: lineNum,
            userSnippet: declSection,
            tier1: "في السطر " + arNum(lineNum) + " كتبت `" + declSection + "` بدون نقطتين `:` بين اسم الخاصية والقيمة — لهذا يتجاهله المتصفح بصمت.",
            tier2: "كيف يفصل قارئ CSS بين اسم الخاصية وقيمتها؟ بالنقطتين `:`. هل تضيف `:` بعد `" + missingColonMatch[1] + "` في السطر " + arNum(lineNum) + "؟",
            tier3: "أضف نقطتين بعد `" + missingColonMatch[1] + "` لتصبح `" + missingColonMatch[1] + ": " + missingColonMatch[2].trim() + ";`."
          };
        }

        // Misspelled property name
        var propMatch = declSection.match(/^([a-zA-Z-]+)\s*:/);
        if (propMatch) {
          var prop = propMatch[1];
          if (DICTIONARIES.cssProps.indexOf(prop.toLowerCase()) < 0) {
            var closeProp = findClosestMatch(prop, DICTIONARIES.cssProps, 2, false);
            if (closeProp) {
              return {
                kind: "typo",
                lineNumber: lineNum,
                userSnippet: prop,
                tier1: "في السطر " + arNum(lineNum) + " كتبت الخاصية `" + prop + "` — محرك CSS لا يعرف هذا الاسم ويسقط السطر بصمت، والأقرب هو `" + closeProp.match + "`.",
                tier2: "قواعد CSS لا تُظهر خطأ أحمر عند الخطأ الإملائي بل تتجاهل الخاصية كلها. هل تصحح `" + prop + "` إلى `" + closeProp.match + "`؟",
                tier3: "في السطر " + arNum(lineNum) + " بدّل `" + prop + "` إلى `" + closeProp.match + "`."
              };
            }
          }
          // Missing semicolon when next line also has a declaration
          if (!declSection.endsWith(";") && line.indexOf("}") < 0) {
            var nextNonEmpty = "";
            for (var n = i + 1; n < lines.length; n++) {
              if (lines[n].trim()) { nextNonEmpty = lines[n].trim(); break; }
            }
            if (/^[a-zA-Z-]+\s*:/.test(nextNonEmpty)) {
              return {
                kind: "delimiter",
                lineNumber: lineNum,
                userSnippet: declSection,
                tier1: "في السطر " + arNum(lineNum) + " نسيت `;` في نهاية `" + clipSnippet(declSection, 36) + "` — سيظن المتصفح أن السطر التالي تكملة لنفس القيمة ويسقطهما معًا!",
                tier2: "لماذا يختفي السطر التالي أيضًا رغم صحته؟ لأن غياب `;` يدمج السطرين في إعلان واحد فاسد. هل تضيف `;` نهاية السطر " + arNum(lineNum) + "؟",
                tier3: "أضف فاصلة منقوطة `;` في نهاية السطر " + arNum(lineNum) + "."
              };
            }
          }
        }
      }
    }

    if (braceDepth > 0) {
      return {
        kind: "delimiter",
        lineNumber: lastOpenBraceLine,
        userSnippet: (lines[lastOpenBraceLine - 1] || "").trim(),
        tier1: "فتحت كتلة تنسيق `{` في السطر " + arNum(lastOpenBraceLine) + " ولم تغلقها بـ `}`.",
        tier2: "تحتاج كتلة التنسيق إلى قوس إغلاق `}` لتعرف أين تنتهي القاعدة. هل أغلقت القوس المفتوح في السطر " + arNum(lastOpenBraceLine) + "؟",
        tier3: "أضف قوس الإغلاق `}` في نهاية القاعدة."
      };
    }

    return null;
  }

  function diagnoseJsLike(userCode, isAngular) {
    var lines = normalizeLines(userCode);
    var parenStack = [];
    var braceStack = [];

    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i];
      var line = raw.replace(/\/\/.*$/, "").trim();
      var lineNum = i + 1;
      if (!line) continue;

      // Angular specific checks
      if (isAngular) {
        if (/\{\{[^}]*$/.test(line)) {
          return {
            kind: "delimiter",
            lineNumber: lineNum,
            userSnippet: line,
            tier1: "في السطر " + arNum(lineNum) + " فتحت ربط القالب `{{` دون إغلاقه بـ `}}`.",
            tier2: "ينتظر قالب Angular إغلاق `}}` لفهم نهاية التعبير. هل أغلقت القوسين المزدوجين في السطر " + arNum(lineNum) + "؟",
            tier3: "أكمل إغلاق الربط بإضافة `}}` في السطر " + arNum(lineNum) + "."
          };
        }
        if (/@for\s*\((?![^)]*\btrack\b)[^)]*\)/.test(line)) {
          return {
            kind: "syntax",
            lineNumber: lineNum,
            userSnippet: line,
            tier1: "في السطر " + arNum(lineNum) + " كتبت حلقة `@for` بدون عبارة `track` — يرفض مترجم Angular القالب بدون مفتاح تتبع لكل عنصر.",
            tier2: "لماذا يفرض `@for` وجود `track`؟ لكي يعيد تحديث العنصر المتغير فقط دون إعادة رسم القائمة كلها. هل أضفت `; track ...`؟",
            tier3: "أضف تعبير التتبع مثل `; track item.id` داخل أقواس `@for` في السطر " + arNum(lineNum) + "."
          };
        }
      }

      // Single '=' inside if(...)
      if (/\bif\s*\([^)]*?[^!=<>]=[^=][^)]*?\)/.test(line)) {
        return {
          kind: "syntax",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " كتبت علامة `=` واحدة داخل شرط `if` — علامة `=` تُسند قيمة جديدة بدل أن تسأل عن المساواة!",
          tier2: "ما الفرق بين `=` و`===` داخل الشرط؟ الأولى تغير المتغير والثانية تفحصه. هل تستبدلها بـ `===` في السطر " + arNum(lineNum) + "؟",
          tier3: "في السطر " + arNum(lineNum) + " استبدل `=` المفردة داخل `if (...)` بعلامة المقارنة `===`."
        };
      }

      // Trailing semicolon right after if(...)
      if (/\bif\s*\([^)]*\)\s*;/.test(line)) {
        return {
          kind: "scope",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " وضعت `;` مباشرة بعد قوس `if (...)` — هذا ينهي الشرط فورًا ويجعل الكتلة التالية تعمل دائمًا!",
          tier2: "لماذا تعمل الأوامر حتى لو لم يتحقق الشرط؟ لأن `;` فصلت `if` عن كتلة `{ ... }`. هل تحذف `;` من بعد القوس في السطر " + arNum(lineNum) + "؟",
          tier3: "احذف الفاصلة المنقوطة `;` التي تلي `)` مباشرة في السطر " + arNum(lineNum) + "."
        };
      }

      // Unclosed string literal on line (excluding template literals)
      var noEscapes = line.replace(/\\./g, "");
      var dq = (noEscapes.match(/"/g) || []).length;
      var sq = (noEscapes.match(/'/g) || []).length;
      if (dq % 2 !== 0 || sq % 2 !== 0) {
        var qChar = dq % 2 !== 0 ? '"' : "'";
        return {
          kind: "delimiter",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " فتحت نصًا بعلامة `" + qChar + "` ولم تغلقها في السطر نفسه.",
          tier2: "كيف يعرف المحرك أين ينتهي النص؟ بعلامة إغلاق مطابقة. هل نسيت `" + qChar + "` في نهاية النص بالسطر " + arNum(lineNum) + "؟",
          tier3: "أغلق النص في السطر " + arNum(lineNum) + " بإضافة علامة `" + qChar + "`."
        };
      }

      // Typo check on common identifiers (console, document, etc.)
      var words = line.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        var dict = isAngular ? DICTIONARIES.jsKeywords.concat(DICTIONARIES.angularSymbols) : DICTIONARIES.jsKeywords;
        if (dict.indexOf(word) < 0 && word.length >= 4) {
          var closeWord = findClosestMatch(word, dict, 1, isAngular);
          if (closeWord && !/^(item|name|city|price|score|count|title|value|index|total|movie|seat|degree|message|result)$/i.test(word)) {
            return {
              kind: "typo",
              lineNumber: lineNum,
              userSnippet: word,
              tier1: "في السطر " + arNum(lineNum) + " كتبت `" + word + "` — هل تقصد `" + closeWord.match + "`؟ فرق حرف واحد يوقف المحرك عن التعرف عليه.",
              tier2: "المحركات حساسة للتهجئة الدقيقة في الأسماء المحجوزة والدوال. هل تراجع كتابة `" + word + "` في السطر " + arNum(lineNum) + "؟",
              tier3: "في السطر " + arNum(lineNum) + " عدّل `" + word + "` لتصبح `" + closeWord.match + "`."
            };
          }
        }
      }

      // Track parens & braces across lines (ignoring strings)
      var stripped = noEscapes.replace(/"[^"]*"|'[^']*'/g, "");
      for (var p = 0; p < stripped.length; p++) {
        var ch = stripped[p];
        if (ch === "(") parenStack.push(lineNum);
        else if (ch === ")") {
          if (!parenStack.length) {
            return {
              kind: "delimiter",
              lineNumber: lineNum,
              userSnippet: line,
              tier1: "في السطر " + arNum(lineNum) + " يوجد قوس إغلاق `)` زائد بلا قوس فتح قبله.",
              tier2: "كل قوس إغلاق `)` يقابله قوس فتح `(`. هل تحذف القوس الزائد في السطر " + arNum(lineNum) + "؟",
              tier3: "أزل القوس `)` غير المقابل في السطر " + arNum(lineNum) + "."
            };
          }
          parenStack.pop();
        } else if (ch === "{") braceStack.push(lineNum);
        else if (ch === "}") {
          if (!braceStack.length) {
            return {
              kind: "delimiter",
              lineNumber: lineNum,
              userSnippet: line,
              tier1: "في السطر " + arNum(lineNum) + " يوجد قوس كتلة `}` بلا قوس فتح `{` قبله.",
              tier2: "الأقواس المعقوفة تأتي في أزواج `{ ... }`. هل هناك `}` زائد في السطر " + arNum(lineNum) + "؟",
              tier3: "احذف القوس `}` الزائد في السطر " + arNum(lineNum) + "."
            };
          }
          braceStack.pop();
        }
      }
    }

    if (parenStack.length) {
      var pLine = parenStack[parenStack.length - 1];
      return {
        kind: "delimiter",
        lineNumber: pLine,
        userSnippet: (lines[pLine - 1] || "").trim(),
        tier1: "في السطر " + arNum(pLine) + " فتحت قوسًا `(` ولم تغلقه بـ `)`.",
        tier2: "ينتظر المفسّر إغلاق القوس `)` ليحسب ما بداخله. هل أغلقت القوس في السطر " + arNum(pLine) + "؟",
        tier3: "أضف `)` لإغلاق القوس المفتوح في السطر " + arNum(pLine) + "."
      };
    }

    if (braceStack.length) {
      var bLine = braceStack[braceStack.length - 1];
      return {
        kind: "delimiter",
        lineNumber: bLine,
        userSnippet: (lines[bLine - 1] || "").trim(),
        tier1: "في السطر " + arNum(bLine) + " فتحت كتلة `{` ولم تغلقها بـ `}`.",
        tier2: "بدون `}` يبقى المحرك يبحث عن نهاية الكتلة ولا يشغّل الكود. هل تغلق `{` المفتوحة في السطر " + arNum(bLine) + "؟",
        tier3: "أضف قوس الإغلاق `}` في نهاية الكتلة التي بدأت في السطر " + arNum(bLine) + "."
      };
    }

    // Actual JS syntax parse if pure JS
    if (!isAngular) {
      try {
        new Function(userCode);
      } catch (err) {
        return {
          kind: "syntax",
          lineNumber: 1,
          userSnippet: clipSnippet(lines[0] || "", 48),
          tier1: "المفسّر توقف عند خطأ صياغة (" + (err && err.message ? err.message : "تركيب غير مكتمل") + ") — دقّق في الأقواس والفواصل داخل المحرر.",
          tier2: "لماذا رفض محرك JavaScript تشغيل الكود قبل أن يبدأ؟ لأن التركيب النحوي في أحد الأسطر ما زال ناقصًا. هل راجعت الفواصل والأقواس وعلامات التنصيص؟",
          tier3: "راجع آخر سطر عدّلته وتأكد من إغلاق كل قوس واقتباس ثم شغّل."
        };
      }
    }

    return null;
  }

  function diagnoseSql(userCode) {
    var lines = normalizeLines(userCode);
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].replace(/--.*$/, "").trim();
      var lineNum = i + 1;
      if (!line) continue;

      if (/=\s*NULL\b|!=\s*NULL\b|<>\s*NULL\b/i.test(line)) {
        return {
          kind: "syntax",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " قارنت بـ `= NULL` — في SQL القيمة الفارغة ليست رقمًا ولا نصًا لتساوي شيئًا؛ المقارنة بـ `=` ترجع نتيجة غير معروفة دائمًا!",
          tier2: "كيف تسأل قاعدة البيانات هل الحقل فارغ؟ باستخدام `IS NULL` أو `IS NOT NULL` بدل `=`. هل تستبدلها في السطر " + arNum(lineNum) + "؟",
          tier3: "في السطر " + arNum(lineNum) + " غيّر المقارنة إلى `IS NULL` أو `IS NOT NULL`."
        };
      }

      if (/^\s*(UPDATE|DELETE)\b/i.test(line) && !/\bWHERE\b/i.test(userCode)) {
        return {
          kind: "scope",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "انتبه في السطر " + arNum(lineNum) + ": أمر `" + RegExp.$1.toUpperCase() + "` بدون `WHERE` سيطال **كل صفوف الجدول** دفعة واحدة!",
          tier2: "لماذا يحذّر مهندسو قواعد البيانات من `UPDATE` أو `DELETE` بلا شرط؟ لأنه يعمّم التعديل على الجدول كله. هل تحدد الشرط بـ `WHERE`؟",
          tier3: "أضف شرط `WHERE ...` لتقييد الصفوف المستهدفة قبل التنفيذ."
        };
      }

      var noEscapes = line.replace(/''/g, "");
      var sq = (noEscapes.match(/'/g) || []).length;
      if (sq % 2 !== 0) {
        return {
          kind: "delimiter",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " فتحت نص SQL بعلامة `'` ولم تغلقها.",
          tier2: "في SQL تُحاط النصوص بعلامتي تنصيص مفردتين `'...'`. هل أغلقت النص في السطر " + arNum(lineNum) + "؟",
          tier3: "أضف علامة `'` لإغلاق النص في السطر " + arNum(lineNum) + "."
        };
      }

      // Check SQL keyword typos (uppercase words or words in keyword positions)
      var words = line.match(/\b[a-zA-Z_]+\b/g) || [];
      for (var w = 0; w < words.length; w++) {
        var wd = words[w];
        if (wd.length >= 4 && DICTIONARIES.sqlKeywords.indexOf(wd.toUpperCase()) < 0) {
          var closeSql = findClosestMatch(wd.toUpperCase(), DICTIONARIES.sqlKeywords, 1, false);
          if (closeSql && !/^(name|note|item|user|date|time|role|type|code|price|total|count|stock|order)$/i.test(wd)) {
            return {
              kind: "typo",
              lineNumber: lineNum,
              userSnippet: wd,
              tier1: "في السطر " + arNum(lineNum) + " كتبت `" + wd + "` — الكلمة المفتاحية في SQL هي `" + closeSql.match + "`.",
              tier2: "محرك SQL يتوقف عند أول كلمة مفتاحية غير معروفة. هل تصحح `" + wd + "` إلى `" + closeSql.match + "` في السطر " + arNum(lineNum) + "؟",
              tier3: "في السطر " + arNum(lineNum) + " استبدل `" + wd + "` بـ `" + closeSql.match + "`."
            };
          }
        }
      }
    }
    return null;
  }

  function diagnoseCsharp(userCode, runtimeError) {
    var lines = normalizeLines(userCode);

    if (runtimeError && runtimeError.message) {
      var rLine = runtimeError.line || 1;
      var rawLine = (lines[rLine - 1] || "").trim();
      var rMsg = String(runtimeError.message);
      // Enrich runtime error with curiosity + line context
      if (/Writeline|writeline|console|readline/i.test(rawLine)) {
        var tokens = rawLine.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || [];
        for (var k = 0; k < tokens.length; k++) {
          var matchCase = findClosestMatch(tokens[k], DICTIONARIES.csharpSymbols, 1, true);
          if (matchCase) {
            return {
              kind: "typo",
              lineNumber: rLine,
              userSnippet: tokens[k],
              tier1: "في السطر " + arNum(rLine) + " كتبت `" + tokens[k] + "`؛ لغة C# تفرّق بدقة بين الحروف الكبيرة والصغيرة، والاسم الصحيح هو `" + matchCase.match + "`.",
              tier2: "لماذا رفضت C# كلمة `" + tokens[k] + "` رغم تشابه النطق؟ لأن حالة الحروف جزء من هوية الاسم في C#. هل تعدلها إلى `" + matchCase.match + "`؟",
              tier3: "في السطر " + arNum(rLine) + " غيّر `" + tokens[k] + "` إلى `" + matchCase.match + "` بالحروف الصحيحة."
            };
          }
        }
      }
      return {
        kind: "syntax",
        lineNumber: rLine,
        userSnippet: rawLine,
        tier1: "توقّف التشغيل في السطر " + arNum(rLine) + " (`" + clipSnippet(rawLine, 42) + "`): " + rMsg,
        tier2: "راقب ما حدث في السطر " + arNum(rLine) + " — ما السبب الذي أوقف المفسّر هنا (" + rMsg + ")؟",
        tier3: "راجع السطر " + arNum(rLine) + " وأصلح السبب: " + rMsg
      };
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].replace(/\/\/.*$/, "").trim();
      var lineNum = i + 1;
      if (!line) continue;

      // Case-sensitivity / typo checks on member calls or PascalCase/C# symbols
      var dotCalls = line.match(/\.\s*([A-Za-z_][A-Za-z0-9_]*)/g) || [];
      for (var dc = 0; dc < dotCalls.length; dc++) {
        var memberTok = dotCalls[dc].replace(/^\.\s*/, "");
        if (DICTIONARIES.csharpSymbols.indexOf(memberTok) < 0 && memberTok.length >= 4) {
          var memberMatch = findClosestMatch(memberTok, DICTIONARIES.csharpSymbols, 1, true);
          if (memberMatch) {
            return {
              kind: "typo",
              lineNumber: lineNum,
              userSnippet: memberTok,
              tier1: "في السطر " + arNum(lineNum) + " كتبت `." + memberTok + "` — C# حساسة لحالة الحروف وتهجئة الدوال، والاسم الصحيح هو `" + memberMatch.match + "`.",
              tier2: "لماذا لم يتعرّف المترجم على `" + memberTok + "`؟ لأن الأسماء في C# حساسة لحالة الحروف. هل تعدّلها إلى `" + memberMatch.match + "`؟",
              tier3: "في السطر " + arNum(lineNum) + " استبدل `" + memberTok + "` بـ `" + memberMatch.match + "`."
            };
          }
        }
      }

      var tokens2 = line.match(/\b[A-Z][A-Za-z0-9_]*\b/g) || [];
      for (var t = 0; t < tokens2.length; t++) {
        var tok = tokens2[t];
        if (DICTIONARIES.csharpSymbols.indexOf(tok) < 0 && tok.length >= 4) {
          var cm = findClosestMatch(tok, DICTIONARIES.csharpSymbols, 1, true);
          if (cm) {
            return {
              kind: "typo",
              lineNumber: lineNum,
              userSnippet: tok,
              tier1: "في السطر " + arNum(lineNum) + " كتبت `" + tok + "` بحروف أو تهجئة غير مطابقة — C# تنتظر `" + cm.match + "`.",
              tier2: "لماذا لن يتعرّف المترجم على `" + tok + "`؟ لأن التهجئة وحالة الحروف تُميّز الأسماء في C#. هل تكتب `" + cm.match + "` بدلها؟",
              tier3: "في السطر " + arNum(lineNum) + " استبدل `" + tok + "` بـ `" + cm.match + "`."
            };
          }
        }
      }

      // Unclosed string
      var dq = (line.replace(/\\./g, "").match(/"/g) || []).length;
      if (dq % 2 !== 0) {
        return {
          kind: "delimiter",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " فتحت نصًا بـ `\"` ولم تغلقه في نهاية النص.",
          tier2: "في C# يبدأ النص وينتهي بعلامة تنصيص مزدوجة `\"`. هل أغلقت النص في السطر " + arNum(lineNum) + "؟",
          tier3: "أضف علامة `\"` في نهاية النص بالسطر " + arNum(lineNum) + "."
        };
      }

      // Missing semicolon on simple statement
      if (!/[;{}]$/.test(line) && !/^(if|else|for|foreach|while|class|using)\b/.test(line) &&
          (/\bConsole\./.test(line) || /\breturn\b/.test(line) || /\b(int|string|double|decimal|bool|char|var)\s+\w+\s*=/.test(line))) {
        return {
          kind: "delimiter",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " انتهى الأمر `" + clipSnippet(line, 40) + "` دون الفاصلة المنقوطة `;`.",
          tier2: "كيف تفصل C# بين أمر وأمر؟ بالفاصلة المنقوطة `;` في نهاية كل جملة. هل نسيت `;` في السطر " + arNum(lineNum) + "؟",
          tier3: "أضف `;` في نهاية السطر " + arNum(lineNum) + "."
        };
      }

      if (/\bif\s*\([^)]*?[^!=<>]=[^=][^)]*?\)/.test(line)) {
        return {
          kind: "syntax",
          lineNumber: lineNum,
          userSnippet: line,
          tier1: "في السطر " + arNum(lineNum) + " استخدمت `=` داخل شرط `if` بدلًا من `==` للمقارنة.",
          tier2: "في C#، علامة `=` إسناد قيمة، أما سؤال المساواة فهو `==`. هل تغيرها في السطر " + arNum(lineNum) + "؟",
          tier3: "استبدل `=` داخل شرط السطر " + arNum(lineNum) + " بـ `==`."
        };
      }
    }
    return null;
  }

  function diagnoseLanguageMistake(userCode, targetCode, language, runtimeError) {
    var lang = normalizeLang(language);
    if (lang === "html") return diagnoseHtml(userCode, targetCode);
    if (lang === "css") return diagnoseCss(userCode);
    if (lang === "js") return diagnoseJsLike(userCode, false);
    if (lang === "angular") return diagnoseJsLike(userCode, true);
    if (lang === "database") return diagnoseSql(userCode);
    if (lang === "csharp") return diagnoseCsharp(userCode, runtimeError);
    return null;
  }

  function evaluate(opts) {
    opts = opts || {};
    var lang = normalizeLang(opts.language || (opts.model && opts.model.key) || "html");
    var userCode = String(opts.userCode || "");
    var beforeCode = String(opts.beforeCode || (opts.step && opts.step.before) || "");
    var targetCode = String(opts.targetCode || (opts.step && (opts.step.after || opts.step.solution || (opts.step.build && opts.step.build.line) || opts.step.to)) || "");
    var tier = Math.max(1, Math.min(4, Number(opts.tier) || 1));
    var runtimeError = opts.runtimeError || null;

    if (!userCode.trim()) {
      return {
        detected: false,
        kind: "empty",
        lineNumber: 1,
        userSnippet: "",
        nextTokenPreview: "",
        message: ""
      };
    }

    var diff = analyzeLineDiff(userCode, beforeCode, targetCode);

    // 0. If the active line is a clean partial prefix of expectedLine (typing mid-line), predict next token first
    var earlyPred = (diff.userLine && diff.expectedLine && diff.userLine !== diff.expectedLine)
      ? predictNextToken(diff.userLine, diff.expectedLine, lang)
      : null;

    // 1. Check real language/syntax/typo diagnosis (defer generic JS parse error if user is mid-prefix)
    var langDiag = diagnoseLanguageMistake(userCode, targetCode, lang, runtimeError);
    if (langDiag && !(earlyPred && earlyPred.isPrefix && langDiag.kind === "syntax")) {
      var msg = tier === 1 ? langDiag.tier1
        : tier === 2 ? langDiag.tier2
        : tier === 3 ? langDiag.tier3
        : ("كشف الحل للسطر " + arNum(langDiag.lineNumber) + ": " + (diff.expectedLine || targetCode));
      return {
        detected: true,
        kind: langDiag.kind,
        lineNumber: langDiag.lineNumber,
        userSnippet: langDiag.userSnippet,
        nextTokenPreview: "",
        message: msg
      };
    }

    // 2. Check partial typing / next-token prediction
    if (earlyPred) {
      var pred = earlyPred;
      var predMsg;
      if (tier === 1) {
        predMsg = "في السطر " + arNum(diff.lineNumber) + ": " + pred.message;
      } else if (tier === 2) {
        predMsg = "في السطر " + arNum(diff.lineNumber) + " بدأت جيدًا بـ `" + clipSnippet(diff.userLine, 32) + "` — ما الذي ينقص ليكتمل هذا السطر كما يتوقعه المحرك؟";
      } else if (tier === 3) {
        predMsg = "مساعدة للسطر " + arNum(diff.lineNumber) + ": أضف `" + pred.preview + "` بعد ما كتبته.";
      } else {
        predMsg = "كشف الحل للسطر " + arNum(diff.lineNumber) + ": " + diff.expectedLine;
      }
      return {
        detected: true,
        kind: "predictive",
        lineNumber: diff.lineNumber,
        userSnippet: diff.userLine,
        nextTokenPreview: pred.preview,
        message: predMsg
      };
    }

    // 3. Unchanged from before
    if (diff.isUnchangedFromBefore && diff.expectedLine) {
      var unchMsg = tier === 1
        ? "السطر " + arNum(diff.lineNumber) + " ما زال كما هو (`" + clipSnippet(diff.userLine, 40) + "`) — جرّب تعديله الآن وشاهد كيف يتغير الأثر."
        : tier === 2
        ? "لماذا لم تتغير النتيجة بعد؟ لأن السطر " + arNum(diff.lineNumber) + " ما زال يحمل القيمة القديمة `" + clipSnippet(diff.beforeLine, 32) + "`؛ هل تعدّله كما في الخطوة؟"
        : tier === 3
        ? "في السطر " + arNum(diff.lineNumber) + " استبدل `" + clipSnippet(diff.beforeLine, 36) + "` بـ `" + clipSnippet(diff.expectedLine, 36) + "`."
        : "كشف الحل للسطر " + arNum(diff.lineNumber) + ": " + diff.expectedLine;
      return {
        detected: true,
        kind: "unchanged",
        lineNumber: diff.lineNumber,
        userSnippet: diff.userLine,
        nextTokenPreview: "",
        message: unchMsg
      };
    }

    // 4. Line-level mismatch diff (smart comparison, never a blind canned message)
    if (diff.expectedLine && diff.userLine !== diff.expectedLine) {
      var fromTok = opts.step && opts.step.from ? String(opts.step.from).trim() : "";
      var toTok = opts.step && opts.step.to ? String(opts.step.to).trim() : "";
      var diffMsg;
      if (tier === 1) {
        diffMsg = "في السطر " + arNum(diff.lineNumber) + " كتبت `" + clipSnippet(diff.userLine, 42) + "`، وهو مختلف قليلًا عما تنتظره هذه الخطوة — دقّق في هذا السطر وحده.";
      } else if (tier === 2) {
        diffMsg = fromTok && toTok
          ? "قارن السطر " + arNum(diff.lineNumber) + " بالخطوة: هل استبدلت `" + clipSnippet(fromTok, 28) + "` بالقيمة المطلوبة دون تغيير بقية السطر؟"
          : "في السطر " + arNum(diff.lineNumber) + " كتبنا `" + clipSnippet(diff.userLine, 36) + "` — هل يطابق الشكل الذي يبحث عنه الاختبار؟";
      } else if (tier === 3) {
        diffMsg = "مساعدة للسطر " + arNum(diff.lineNumber) + ": الجزء المتوقع ظهوره هو `" + clipSnippet(toTok || diff.expectedLine, 48) + "`.";
      } else {
        diffMsg = "كشف الحل للسطر " + arNum(diff.lineNumber) + ": " + diff.expectedLine;
      }
      return {
        detected: true,
        kind: "diff",
        lineNumber: diff.lineNumber,
        userSnippet: diff.userLine,
        nextTokenPreview: "",
        message: diffMsg
      };
    }

    return {
      detected: false,
      kind: "none",
      lineNumber: diff.lineNumber,
      userSnippet: diff.userLine,
      nextTokenPreview: "",
      message: ""
    };
  }

  /**
   * Lightweight live typing predictor: returns a short curiosity nudge while typing.
   */
  function livePredict(opts) {
    opts = opts || {};
    var lang = normalizeLang(opts.language);
    var userCode = String(opts.userCode || "");
    var beforeCode = String(opts.beforeCode || "");
    var targetCode = String(opts.targetCode || "");
    if (!userCode.trim() || !targetCode.trim()) return null;
    if (userCode.trim() === targetCode.trim()) return null;

    var diff = analyzeLineDiff(userCode, beforeCode, targetCode);
    var diag = diagnoseLanguageMistake(userCode, targetCode, lang, null);
    if (diag && (diag.kind === "typo" || diag.kind === "syntax" || diag.kind === "scope")) {
      return {
        lineNumber: diag.lineNumber,
        kind: diag.kind,
        text: diag.tier1
      };
    }
    var pred = predictNextToken(diff.userLine, diff.expectedLine, lang);
    if (pred) {
      return {
        lineNumber: diff.lineNumber,
        kind: "predictive",
        nextToken: pred.nextToken,
        text: "السطر " + arNum(diff.lineNumber) + ": " + pred.message
      };
    }
    return null;
  }

  return {
    DICTIONARIES: DICTIONARIES,
    levenshtein: levenshtein,
    findClosestMatch: findClosestMatch,
    analyzeLineDiff: analyzeLineDiff,
    predictNextToken: predictNextToken,
    diagnoseLanguageMistake: diagnoseLanguageMistake,
    evaluate: evaluate,
    livePredict: livePredict
  };
});

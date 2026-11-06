/**
 * Content Protection & Security Deterrents Module
 * steplearn Educational Platform (منصة steplearn التعليمية)
 *
 * Implements client-side deterrents against content copying, screenshot capture,
 * developer tools inspection, and asset unauthorized downloads.
 */

(function (root, factory) {
  var api = factory();
  if (typeof window !== "undefined") {
    window.ContentProtection = api;
  }
  if (root) {
    root.ContentProtection = api;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.ContentProtection = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var win = typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : null);
  var doc = typeof document !== "undefined" ? document : (win && win.document ? win.document : null);

  var initialized = false;
  var watermarkInterval = null;
  var toastTimer = null;
  var shieldTimer = null;
  var printMedia = null;
  var printMediaHandler = null;

  function showToast(message) {
    if (!doc) return;
    try {
      var toast = doc.getElementById("toast");
      if (!toast) return;
      toast.textContent = "🛡 " + message;
      toast.classList.add("show");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove("show");
      }, 2600);
    } catch (err) {}
  }

  function isEditableElement(el) {
    if (!el) return false;
    if (el.nodeType === 3) el = el.parentElement;
    if (!el) return false;
    var tag = (el.tagName || "").toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA") return true;
    if (el.isContentEditable) return true;
    if (el.classList && (el.classList.contains("cm-content") || el.classList.contains("cm-editor") || el.classList.contains("cm-line"))) return true;
    if (el.closest) {
      if (
        el.closest(".cm-editor") ||
        el.closest(".cm-content") ||
        el.closest("input") ||
        el.closest("textarea") ||
        el.closest("[contenteditable='true']")
      ) {
        return true;
      }
    }
    return false;
  }

  function isEventOnEditable(e) {
    if (!e) return false;
    if (isEditableElement(e.target)) return true;
    var target = e.target;
    // If target is an explicit element other than document/body/documentElement,
    // and it is NOT editable, do not allow activeElement elsewhere to override.
    if (target && target !== doc && target !== (doc && doc.body) && target !== (doc && doc.documentElement)) {
      return false;
    }
    // Fall back to activeElement when event lacks target or targets root document/body
    if (doc && isEditableElement(doc.activeElement)) return true;
    return false;
  }

  function isInternalIframeFocused() {
    if (!doc) return false;
    try {
      var active = doc.activeElement;
      if (active && (active.tagName === "IFRAME" || (active.closest && active.closest("iframe")))) {
        return true;
      }
      if (doc.querySelector && doc.querySelector("iframe:hover")) {
        return true;
      }
    } catch (err) {}
    return false;
  }

  function handleContextMenu(e) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    showToast("المحتوى التعليمي محمي ضد النسخ غير المصرح به.");
    return false;
  }

  function handleCopy(e) {
    if (isEventOnEditable(e)) {
      return true;
    }
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.clipboardData && typeof e.clipboardData.clearData === "function") {
      try {
        e.clipboardData.clearData();
      } catch (err) {}
    }
    showToast("نسخ نصوص الدروس غير متاح لحماية حقوق المحتوى.");
    return false;
  }

  function handleCut(e) {
    if (isEventOnEditable(e)) {
      return true;
    }
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.clipboardData && typeof e.clipboardData.clearData === "function") {
      try {
        e.clipboardData.clearData();
      } catch (err) {}
    }
    showToast("قص المحتوى التعليمي محظور.");
    return false;
  }

  function handleSelectStart(e) {
    if (isEventOnEditable(e)) {
      return true;
    }
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    return false;
  }

  function handleDragStart(e) {
    if (isEventOnEditable(e)) {
      return true;
    }
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    return false;
  }

  function handleKeyDown(e) {
    var isCtrlOrMeta = !!(e.ctrlKey || e.metaKey);
    var isShift = !!e.shiftKey;
    var isAlt = !!e.altKey;
    var key = (e.key || "").toLowerCase();
    var keyCode = e.keyCode || e.which || 0;

    // 1. F12 (DevTools)
    if (key === "f12" || keyCode === 123) {
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      showToast("أدوات المطور معطلة للحفاظ على نزاهة التجربة التعليمية.");
      return false;
    }

    // 2. DevTools Shortcuts: Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K, Ctrl+Shift+E, Ctrl+Shift+M, Cmd+Option+I/J/C/K/E/M
    var isDevToolKey =
      key === "i" || keyCode === 73 ||
      key === "j" || keyCode === 74 ||
      key === "c" || keyCode === 67 ||
      key === "k" || keyCode === 75 ||
      key === "e" || keyCode === 69 ||
      key === "m" || keyCode === 77;

    if (
      (isCtrlOrMeta && isShift && isDevToolKey) ||
      (e.metaKey && isAlt && isDevToolKey)
    ) {
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      showToast("أدوات الفحص والتحليل معطلة لحماية المحتوى.");
      return false;
    }

    // 3. View Source Shortcut: Ctrl+U, Cmd+Option+U
    if ((isCtrlOrMeta && (key === "u" || keyCode === 85)) || (e.metaKey && isAlt && (key === "u" || keyCode === 85))) {
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      showToast("عرض كود المصدر غير متاح.");
      return false;
    }

    // 4. Save Page: Ctrl+S / Cmd+S / Ctrl+Shift+S
    if (isCtrlOrMeta && (key === "s" || keyCode === 83)) {
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      showToast("حفظ الصفحة محظور لحماية الملكية الفكرية.");
      return false;
    }

    // 5. Print Page: Ctrl+P / Cmd+P / Ctrl+Shift+P
    if (isCtrlOrMeta && (key === "p" || keyCode === 80)) {
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      showToast("طباعة الدروس غير مصرح بها.");
      return false;
    }

    // 6. Copy (Ctrl+C / Cmd+C / Ctrl+Insert) & Cut (Ctrl+X / Cmd+X / Shift+Delete) on learning/course content
    var isCopyKey = key === "c" || keyCode === 67 || key === "insert" || keyCode === 45;
    var isCutKey = key === "x" || keyCode === 88;
    var isShiftCut = isShift && !isCtrlOrMeta && !isAlt && (key === "delete" || keyCode === 46);
    if ((isCtrlOrMeta && !isAlt && (isCopyKey || isCutKey)) || isShiftCut) {
      // Allow normal typing, copying, and cutting within inputs and code editor
      if (!isEventOnEditable(e)) {
        e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        showToast("النسخ والقص معطلان لحماية محتوى الدروس.");
        return false;
      }
    }

    // 7. Context Menu via keyboard (Shift+F10 or ContextMenu key)
    if (key === "contextmenu" || keyCode === 93 || (isShift && !isCtrlOrMeta && !isAlt && (key === "f10" || keyCode === 121))) {
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      showToast("قائمة الخيارات معطلة لحماية المحتوى.");
      return false;
    }

    // 8. PrintScreen Key: Trigger immediate visual blur, blackout shield & overwrite clipboard
    if (isPrintScreenEvent(e)) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      triggerScreenShield();
      overwriteClipboardWithWarning();
      showToast("تم رصد محاولة لقطة شاشة وحجب المحتوى لحماية الملكية الفكرية.");
      return false;
    }

    // 9. Select All: Ctrl+A / Cmd+A on learning content
    if (isCtrlOrMeta && !isShift && !isAlt && (key === "a" || keyCode === 65)) {
      if (!isEventOnEditable(e)) {
        e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        showToast("تحديد نصوص الدروس بالكامل معطل لحماية المحتوى.");
        return false;
      }
    }

    return true;
  }

  function isPrintScreenEvent(e) {
    if (!e) return false;
    var key = (e.key || "").toLowerCase();
    var code = (e.code || "").toLowerCase();
    var keyCode = e.keyCode || e.which || 0;
    return (
      key === "printscreen" ||
      key === "snapshot" ||
      code === "printscreen" ||
      keyCode === 44
    );
  }

  function triggerScreenShield() {
    applyBlur();
    if (doc && doc.body) {
      doc.body.classList.add("screen-shield-active");
      if (shieldTimer) clearTimeout(shieldTimer);
      shieldTimer = setTimeout(function () {
        if (doc && doc.body) doc.body.classList.remove("screen-shield-active");
      }, 2000);
    }
  }

  function overwriteClipboardWithWarning() {
    if (win && win.navigator && win.navigator.clipboard && typeof win.navigator.clipboard.writeText === "function") {
      try {
        win.navigator.clipboard.writeText(
          "تم حجب لقطة الشاشة لحماية حقوق الملكية الفكرية — منصة steplearn (تنفيذ وتصميم المهندس أحمد عاشور)"
        ).catch(function () {});
      } catch (err) {}
    }
  }

  function handleKeyUp(e) {
    if (isPrintScreenEvent(e)) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      triggerScreenShield();
      overwriteClipboardWithWarning();
      showToast("تم رصد محاولة لقطة شاشة وحجب المحتوى لحماية الملكية الفكرية.");
      return false;
    }
    return true;
  }

  function handleSelectionChange() {
    if (!doc) return;
    if (isEventOnEditable({ target: doc.activeElement })) return;
    if (win && win.getSelection) {
      try {
        var sel = win.getSelection();
        if (sel && !sel.isCollapsed) {
          if (!isEditableElement(sel.anchorNode) && !isEditableElement(sel.focusNode)) {
            sel.removeAllRanges();
          }
        }
      } catch (err) {}
    }
  }

  function handleTouchRecovery() {
    handleFocus();
  }

  function applyBlur() {
    if (!doc) return;
    try {
      if (doc.body) doc.body.classList.add("content-blurred");
      var lesson = doc.getElementById("lesson");
      if (lesson) lesson.classList.add("content-blurred");
      var main = doc.querySelector("main");
      if (main) main.classList.add("content-blurred");
    } catch (err) {}
  }

  function handleBeforePrint(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    applyBlur();
    showToast("طباعة محتوى المنصة غير مسموح بها.");
  }

  function handleBlur() {
    if (!doc) return;
    try {
      // If focus shifted to an iframe inside our own document (e.g. #preview or simulator runner),
      // the student is interacting with lesson output, not navigating away.
      if (isInternalIframeFocused()) {
        return;
      }
      // If document still retains active focus (e.g. interactive subframe), do not blur.
      if (typeof doc.hasFocus === "function" && doc.hasFocus()) {
        return;
      }
      // Allow a short tick to confirm activeElement hasn't moved into an iframe
      setTimeout(function () {
        if (!doc) return;
        if (isInternalIframeFocused() || (typeof doc.hasFocus === "function" && doc.hasFocus())) {
          handleFocus();
          return;
        }
      }, 80);

      applyBlur();
    } catch (err) {}
  }

  function handleFocus() {
    if (!doc) return;
    try {
      if (doc.body) doc.body.classList.remove("content-blurred");
      var lesson = doc.getElementById("lesson");
      if (lesson) lesson.classList.remove("content-blurred");
      var main = doc.querySelector("main");
      if (main) main.classList.remove("content-blurred");
    } catch (err) {}
  }

  function handleVisibilityChange() {
    if (!doc) return;
    if (doc.hidden) {
      applyBlur();
    } else {
      handleFocus();
    }
  }

  function getActiveLearnerName() {
    try {
      if (win && win.LearnerProfiles && typeof win.LearnerProfiles.active === "function") {
        var profile = win.LearnerProfiles.active();
        if (profile && profile.name) return profile.name;
      }
      if (doc) {
        var label = doc.getElementById("learnerActiveName");
        if (label && label.textContent && label.textContent.trim()) {
          return label.textContent.trim();
        }
        var btn = doc.getElementById("learnerProfileButton");
        if (btn && btn.textContent && btn.textContent.indexOf("·") !== -1) {
          var parts = btn.textContent.split("·");
          if (parts[1] && parts[1].trim()) return parts[1].trim();
        }
      }
    } catch (err) {}
    return "المتعلم الحالي";
  }

  function renderWatermark() {
    if (!doc) return;
    try {
      var target = doc.body || doc.documentElement || doc.getElementById("lesson") || doc.querySelector("main");
      if (!target) return;

      var watermark = doc.getElementById("learningWatermark");
      if (!watermark) {
        watermark = doc.createElement("div");
        watermark.id = "learningWatermark";
        watermark.className = "learning-watermark";
        watermark.setAttribute("aria-hidden", "true");
        target.appendChild(watermark);
      } else if (watermark.parentElement !== target) {
        target.appendChild(watermark);
      }

      var learnerName = getActiveLearnerName();
      var now = new Date();
      var dateText = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
      var badgeText = "steplearn · تنفيذ وتصميم المهندس أحمد عاشور · " + learnerName + " · " + dateText + " · محتوى تعليمي محمي (خُطوة)";

      var w = (win && win.innerWidth) || 1200;
      var h = (win && win.innerHeight) || 800;
      var tilesNeeded = Math.max(18, Math.min(60, Math.floor((w * h) / 32000)));

      watermark.innerHTML = "";
      for (var i = 0; i < tilesNeeded; i++) {
        var span = doc.createElement("span");
        span.textContent = badgeText;
        watermark.appendChild(span);
      }
    } catch (err) {}
  }

  function init() {
    if (initialized) return;
    if (!doc) return;

    // Attach DOM deterrent event listeners with capture = true to intercept early
    doc.addEventListener("contextmenu", handleContextMenu, true);
    doc.addEventListener("copy", handleCopy, true);
    doc.addEventListener("cut", handleCut, true);
    doc.addEventListener("keydown", handleKeyDown, true);
    doc.addEventListener("keyup", handleKeyUp, true);
    doc.addEventListener("selectstart", handleSelectStart, true);
    doc.addEventListener("dragstart", handleDragStart, true);
    doc.addEventListener("selectionchange", handleSelectionChange, true);

    if (win) {
      win.addEventListener("blur", handleBlur);
      win.addEventListener("focus", handleFocus);
      win.addEventListener("beforeprint", handleBeforePrint);
      win.addEventListener("afterprint", handleFocus);
      win.addEventListener("pagehide", applyBlur);
      win.addEventListener("touchstart", handleTouchRecovery, { passive: true });
      win.addEventListener("pointerdown", handleTouchRecovery, { passive: true });

      if (typeof win.matchMedia === "function") {
        try {
          printMedia = win.matchMedia("print");
          printMediaHandler = function (mql) {
            if (mql && mql.matches) {
              handleBeforePrint();
            } else {
              handleFocus();
            }
          };
          if (typeof printMedia.addEventListener === "function") {
            printMedia.addEventListener("change", printMediaHandler);
          } else if (typeof printMedia.addListener === "function") {
            printMedia.addListener(printMediaHandler);
          }
        } catch (err) {}
      }
    }
    doc.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial watermark render
    renderWatermark();
    if (win && typeof win.setInterval === "function") {
      watermarkInterval = win.setInterval(renderWatermark, 10000);
    }

    initialized = true;
  }

  function destroy() {
    if (!initialized || !doc) return;
    doc.removeEventListener("contextmenu", handleContextMenu, true);
    doc.removeEventListener("copy", handleCopy, true);
    doc.removeEventListener("cut", handleCut, true);
    doc.removeEventListener("keydown", handleKeyDown, true);
    doc.removeEventListener("keyup", handleKeyUp, true);
    doc.removeEventListener("selectstart", handleSelectStart, true);
    doc.removeEventListener("dragstart", handleDragStart, true);
    doc.removeEventListener("selectionchange", handleSelectionChange, true);

    if (win) {
      win.removeEventListener("blur", handleBlur);
      win.removeEventListener("focus", handleFocus);
      win.removeEventListener("beforeprint", handleBeforePrint);
      win.removeEventListener("afterprint", handleFocus);
      win.removeEventListener("pagehide", applyBlur);
      win.removeEventListener("touchstart", handleTouchRecovery, { passive: true });
      win.removeEventListener("pointerdown", handleTouchRecovery, { passive: true });
      if (printMedia && printMediaHandler) {
        try {
          if (typeof printMedia.removeEventListener === "function") {
            printMedia.removeEventListener("change", printMediaHandler);
          } else if (typeof printMedia.removeListener === "function") {
            printMedia.removeListener(printMediaHandler);
          }
        } catch (err) {}
        printMedia = null;
        printMediaHandler = null;
      }
      if (watermarkInterval && typeof win.clearInterval === "function") {
        win.clearInterval(watermarkInterval);
      }
    }
    doc.removeEventListener("visibilitychange", handleVisibilityChange);
    handleFocus();
    initialized = false;
  }

  // Auto-initialize if DOM is ready
  if (doc) {
    if (doc.readyState === "loading") {
      doc.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }

  var instance = {
    init: init,
    destroy: destroy,
    handleBlur: handleBlur,
    handleFocus: handleFocus,
    handleContextMenu: handleContextMenu,
    handleCopy: handleCopy,
    handleCut: handleCut,
    handleKeyDown: handleKeyDown,
    handleKeyUp: handleKeyUp,
    handleSelectStart: handleSelectStart,
    handleDragStart: handleDragStart,
    handleSelectionChange: handleSelectionChange,
    triggerScreenShield: triggerScreenShield,
    overwriteClipboardWithWarning: overwriteClipboardWithWarning,
    renderWatermark: renderWatermark,
    isShieldActive: function () {
      return !!(doc && doc.body && doc.body.classList.contains("screen-shield-active"));
    },
    isBlurred: function () {
      if (!doc) return false;
      var hasBodyBlur = !!(doc.body && doc.body.classList.contains("content-blurred"));
      var lesson = doc.getElementById("lesson");
      var hasLessonBlur = !!(lesson && lesson.classList.contains("content-blurred"));
      return hasBodyBlur || hasLessonBlur;
    },
    getWatermarkText: function () {
      if (!doc) return "";
      var el = doc.getElementById("learningWatermark");
      return el ? el.textContent : "";
    }
  };

  if (win) {
    win.ContentProtection = instance;
  }

  return instance;
});

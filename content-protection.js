/**
 * Content Protection & Security Deterrents Module (Deactivated Stub)
 * steplearn Educational Platform (منصة steplearn التعليمية)
 *
 * All screenshot blocking, watermark overlays, copy prevention, DevTools
 * deterrence, and blur shields have been permanently deactivated per system
 * modernization requirements (Milestone 1, Requirement R4).
 *
 * This stub preserves full exported API compatibility for tests and host environments
 * while ensuring zero event interception, zero DOM modification, and zero side effects.
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

  function init() {
    initialized = true;
    // Deactivated: no event listeners attached, no watermarks rendered
  }

  function destroy() {
    initialized = false;
    // Deactivated: clean up any remaining deterrent classes or elements if present
    if (!doc) return;
    try {
      if (doc.body) {
        doc.body.classList.remove("content-blurred");
        doc.body.classList.remove("screen-shield-active");
      }
      var lesson = doc.getElementById("lesson");
      if (lesson) lesson.classList.remove("content-blurred");
      var main = doc.querySelector("main");
      if (main) main.classList.remove("content-blurred");
      var el = doc.getElementById("learningWatermark");
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    } catch (err) {}
  }

  function handleBlur() {
    // Deactivated: no blur applied on focus loss
  }

  function handleFocus() {
    // Deactivated: ensure clean unblurred state
    if (!doc) return;
    try {
      if (doc.body) {
        doc.body.classList.remove("content-blurred");
        doc.body.classList.remove("screen-shield-active");
      }
      var lesson = doc.getElementById("lesson");
      if (lesson) lesson.classList.remove("content-blurred");
      var main = doc.querySelector("main");
      if (main) main.classList.remove("content-blurred");
    } catch (err) {}
  }

  function handleContextMenu() {
    // Deactivated: allow native right-click context menu
    return true;
  }

  function handleCopy() {
    // Deactivated: allow native copying across all elements
    return true;
  }

  function handleCut() {
    // Deactivated: allow native cutting across all elements
    return true;
  }

  function handleKeyDown() {
    // Deactivated: allow all keyboard shortcuts (F12, PrintScreen, Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+P, DevTools)
    return true;
  }

  function handleKeyUp() {
    // Deactivated: allow all keyups without triggering screen shield
    return true;
  }

  function handleSelectStart() {
    // Deactivated: allow text selection
    return true;
  }

  function handleDragStart() {
    // Deactivated: allow dragging
    return true;
  }

  function handleSelectionChange() {
    // Deactivated: preserve selection ranges
  }

  function isPrintScreenEvent() {
    // Deactivated: never intercept PrintScreen
    return false;
  }

  function applyBlur() {
    // Deactivated: no blur applied
  }

  function triggerScreenShield() {
    // Deactivated: blackout screen shield never triggered
  }

  function overwriteClipboardWithWarning() {
    // Deactivated: clipboard never overwritten with warning notice
  }

  function renderWatermark() {
    // Deactivated: watermarks never created; remove if element exists
    if (!doc) return;
    try {
      var el = doc.getElementById("learningWatermark");
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    } catch (err) {}
  }

  function isShieldActive() {
    return !!(doc && doc.body && doc.body.classList.contains("screen-shield-active"));
  }

  function isBlurred() {
    if (!doc) return false;
    var hasBodyBlur = !!(doc.body && doc.body.classList.contains("content-blurred"));
    var lesson = doc.getElementById("lesson");
    var hasLessonBlur = !!(lesson && lesson.classList.contains("content-blurred"));
    return hasBodyBlur || hasLessonBlur;
  }

  function getWatermarkText() {
    if (!doc) return "";
    var el = doc.getElementById("learningWatermark");
    return el ? el.textContent : "";
  }

  // Auto-initialize if DOM is ready (safe no-op lifecycle hook)
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
    isShieldActive: isShieldActive,
    isBlurred: isBlurred,
    getWatermarkText: getWatermarkText,
    applyBlur: applyBlur,
    isPrintScreenEvent: isPrintScreenEvent
  };

  if (win) {
    win.ContentProtection = instance;
  }

  return instance;
});

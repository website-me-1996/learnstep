/**
 * Khotwa Angular E2E Test Harness
 * Provides isolated DOM sandbox, VM execution environment, and simulator adapters
 * for opaque-box testing without requiring external browser binaries.
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT_DIR = path.resolve(__dirname, '../../..');

function loadCourseData(filePath = 'angular-course-data.js') {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(ROOT_DIR, filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(content, context, { filename: filePath });
  return {
    raw: content,
    data: context.window.ANGULAR_COURSE_DATA
  };
}

function createMockElement(id, tagName = 'div') {
  const listeners = {};
  const el = {
    id: id || '',
    tagName: tagName.toUpperCase(),
    hidden: false,
    disabled: false,
    textContent: '',
    innerHTML: '',
    value: '',
    srcdoc: '',
    sandbox: '',
    href: '',
    dataset: {},
    style: {},
    classList: {
      _classes: new Set(),
      add(...cls) { cls.forEach(c => this._classes.add(c)); },
      remove(...cls) { cls.forEach(c => this._classes.delete(c)); },
      toggle(cls, force) {
        if (force === true) this._classes.add(cls);
        else if (force === false) this._classes.delete(cls);
        else if (this._classes.has(cls)) this._classes.delete(cls);
        else this._classes.add(cls);
      },
      contains(cls) { return this._classes.has(cls); }
    },
    setAttribute(name, val) { el[name] = String(val); },
    getAttribute(name) { return el[name] !== undefined ? String(el[name]) : null; },
    addEventListener(event, fn) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(fn);
    },
    removeEventListener(event, fn) {
      if (listeners[event]) listeners[event] = listeners[event].filter(f => f !== fn);
    },
    trigger(event, data = {}) {
      if (listeners[event]) {
        listeners[event].forEach(fn => fn(data));
      }
    },
    appendChild(child) {
      if (!el.children) el.children = [];
      el.children.push(child);
      return child;
    },
    remove() {},
    querySelectorAll(sel) {
      return [];
    },
    querySelector(sel) {
      return null;
    },
    closest(sel) {
      return el;
    }
  };
  return el;
}

function createEditorEnvironment(customCourseData = null) {
  const elements = new Map();
  function getOrCreate(id) {
    if (!elements.has(id)) {
      elements.set(id, createMockElement(id));
    }
    return elements.get(id);
  }

  const registeredIds = [
    'angularCoursePanel', 'angularPreview', 'angularPreviewStatus', 'angularFallback',
    'angularSlotBuilder', 'angularSlotInput', 'angularSlotApply',
    'angularLessonFeedback', 'angularLessonList', 'angularLessonSearch', 'angularLessonDots',
    'angularGuideTrackLabel', 'angularStepCount', 'angularStepMeter',
    'angularRoadProgress', 'angularCourseCount', 'angularCourseCard',
    'angularHandCraftMeter', 'angularGentleTreeGuide', 'angularRun', 'angularReset',
    'angularLessonPhase', 'angularLessonStep', 'angularLessonTitle', 'angularLessonConcept',
    'angularLessonFlow', 'angularLessonTask', 'angularStepActions', 'angularLessonReference',
    'angularLessonProgress', 'angularStepPrev', 'angularStepNext', 'angularPrevious',
    'angularNext', 'angularWorkspaceName', 'angularNewFile', 'angularExport',
    'angularImport', 'angularCommandInput', 'angularClearTerminal', 'angularManualComplete',
    'courseRoadmap'
  ];

  registeredIds.forEach(id => getOrCreate(id));

  const mockDoc = {
    getElementById(id) { return getOrCreate(id); },
    querySelector(sel) {
      if (sel.startsWith('#')) return getOrCreate(sel.substring(1));
      return getOrCreate('generic-' + sel.replace(/[^a-zA-Z0-9]/g, '-'));
    },
    querySelectorAll(sel) {
      return [];
    },
    createElement(tag) { return createMockElement('', tag); },
    body: createMockElement('body', 'body')
  };

  const storageValues = new Map();
  const mockStorage = {
    getItem(key) { return storageValues.has(key) ? storageValues.get(key) : null; },
    setItem(key, val) { storageValues.set(key, String(val)); },
    removeItem(key) { storageValues.delete(key); },
    clear() { storageValues.clear(); }
  };

  const context = {
    window: {
      localStorage: mockStorage,
      addEventListener() {},
      removeEventListener() {},
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      crossOriginIsolated: true,
      isSecureContext: true
    },
    document: mockDoc,
    console: {
      log() {},
      warn() {},
      error() {},
      info() {}
    },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval
  };
  context.window.document = mockDoc;
  context.window.window = context.window;

  vm.createContext(context);

  // Set course data
  const courseData = customCourseData || loadCourseData().data;
  context.window.ANGULAR_COURSE_DATA = courseData;

  // Run angular-editor.js in context
  const editorPath = path.join(ROOT_DIR, 'angular-editor.js');
  const editorCode = fs.readFileSync(editorPath, 'utf8');
  vm.runInContext(editorCode, context, { filename: 'angular-editor.js' });
  vm.runInContext('if (!COURSE && window.ANGULAR_COURSE_DATA) { COURSE = window.ANGULAR_COURSE_DATA; }', context);

  return {
    context,
    elements,
    getEl: (id) => getOrCreate(id),
    setFiles: (files) => {
      vm.runInContext(`currentFiles = ${JSON.stringify(files)};`, context);
    },
    getFiles: () => {
      return vm.runInContext(`currentFiles`, context);
    },
    setActivePath: (path) => {
      vm.runInContext(`activePath = ${JSON.stringify(path)};`, context);
    },
    runSimulatedPreview: () => {
      if (typeof context.updateAngularSimulatedPreview === 'function') {
        context.updateAngularSimulatedPreview();
      }
    },
    getPreviewSrcdoc: () => {
      return getOrCreate('angularPreview').srcdoc || '';
    },
    checkSupportedTask: (lesson) => {
      if (typeof context.supportedTask === 'function') {
        return context.supportedTask(lesson);
      }
      return false;
    },
    renderSlotBuilder: (step, lesson) => {
      if (typeof context.renderAngularSlotBuilder === 'function') {
        context.renderAngularSlotBuilder(step, lesson);
      }
    },
    inspectGentleTree: () => {
      if (typeof context.inspectAngularGentleTree === 'function') {
        context.inspectAngularGentleTree();
      }
    },
    updateHandCraftScore: (isManual, boost) => {
      if (typeof context.updateAngularHandCraftScore === 'function') {
        context.updateAngularHandCraftScore(isManual, boost);
      }
    },
    normalizeFiles: (files) => {
      if (typeof context.normalizeFiles === 'function') {
        return context.normalizeFiles(files);
      }
      return files;
    },
    isAllowedPath: (p) => {
      if (typeof context.isAllowedProjectPath === 'function') {
        return context.isAllowedProjectPath(p);
      }
      return true;
    }
  };
}

module.exports = {
  loadCourseData,
  createMockElement,
  createEditorEnvironment,
  ROOT_DIR
};

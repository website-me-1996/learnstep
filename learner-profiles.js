(function (window) {
  "use strict";

  var registryKey = "khotwa-learners-v1";
  var activeKey = "khotwa-active-learner-v1";
  var legacyKeys = {
    state: "khotwa-v1",
    growth: "khotwa-growth-v1",
    profile: "khotwa-profile-card-v1"
  };

  function readJson(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function saveJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function normalizeName(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 32);
  }

  function normalizeId(value) {
    return typeof value === "string" && /^learner-[a-z0-9-]{1,60}$/.test(value) ? value : "";
  }

  var stored = readJson(registryKey);
  var profiles = [{ id: "default", name: "المتعلم الحالي" }];
  if (stored && typeof stored === "object" && Array.isArray(stored.profiles)) {
    var seenIds = { "default": true };
    var seenNames = { "المتعلم الحالي": true };
    stored.profiles.forEach(function (profile) {
      if (!profile || typeof profile !== "object") return;
      var id = normalizeId(profile.id);
      var name = normalizeName(profile.name);
      var foldedName = name.toLocaleLowerCase();
      if (!id || !name || seenIds[id] || seenNames[foldedName] || profiles.length >= 30) return;
      seenIds[id] = true;
      seenNames[foldedName] = true;
      profiles.push({ id: id, name: name });
    });
  }

  var savedActive = "";
  try {
    savedActive = window.localStorage.getItem(activeKey) || "";
  } catch (error) {}
  var activeId = profiles.some(function (profile) { return profile.id === savedActive; }) ? savedActive : "default";

  function persistRegistry() {
    saveJson(registryKey, { profiles: profiles });
    try {
      window.localStorage.setItem(activeKey, activeId);
    } catch (error) {}
  }

  function storageKeys(id) {
    id = id || activeId;
    if (id === "default") return Object.assign({}, legacyKeys);
    var prefix = "khotwa-learner:" + id + ":";
    return { state: prefix + "state", growth: prefix + "growth", profile: prefix + "profile" };
  }

  function create(name) {
    name = normalizeName(name);
    if (!name) return { ok: false, reason: "empty", message: "اكتب اسمًا قصيرًا لهذا الملف." };
    if (profiles.length >= 30) return { ok: false, reason: "limit", message: "وصلت إلى الحد الأقصى لملفات التعلّم على هذا الجهاز." };
    var foldedName = name.toLocaleLowerCase();
    if (profiles.some(function (profile) { return profile.name.toLocaleLowerCase() === foldedName; })) {
      return { ok: false, reason: "duplicate", message: "هذا الاسم مستخدم. اختر اسمًا آخر أو افتح ملفه من القائمة." };
    }
    var id = "learner-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
    while (profiles.some(function (profile) { return profile.id === id; })) id += "x";
    profiles.push({ id: id, name: name });
    activeId = id;
    persistRegistry();
    return { ok: true, profile: { id: id, name: name }, keys: storageKeys(id) };
  }

  function activate(id) {
    if (!profiles.some(function (profile) { return profile.id === id; })) return false;
    activeId = id;
    persistRegistry();
    return true;
  }

  persistRegistry();
  window.LearnerProfiles = {
    list: function () { return profiles.map(function (profile) { return { id: profile.id, name: profile.name }; }); },
    active: function () {
      var profile = profiles.filter(function (item) { return item.id === activeId; })[0];
      return profile ? { id: profile.id, name: profile.name } : { id: "default", name: "المتعلم الحالي" };
    },
    storageKeys: storageKeys,
    create: create,
    activate: activate
  };
})(window);

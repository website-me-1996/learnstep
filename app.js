(function(){
  var courseHelpers = window.LESSONS_DATA.courseHelpers,
      cssFamily = courseHelpers.cssFamily,
      cssLessonSpec = courseHelpers.cssLessonSpec,
      jsFamily = courseHelpers.jsFamily,
      jsLessonSpec = courseHelpers.jsLessonSpec,
      courseLessonDetails = courseHelpers.courseLessonDetails,
      courseDoneStep = courseHelpers.courseDoneStep,
      learnerManager = window.LearnerProfiles,
      learnerStorage = learnerManager.storageKeys(),
      key = learnerStorage.state,
      d = {
        lessons: 0, examples: 0, fixes: 0, minutes: 0, progress: 0, project: 0, step: 2, statsVersion: 0,
        sound: "white", volume: 24, cheers: [], course: "html", focusDuration: 300, focusSeconds: 300,
        htmlStep: 1, htmlStepVersion: 1, htmlLesson: 0, htmlQuiz: false, htmlQuizCorrect: false,
        htmlEditorQuiz: false, htmlEditorQuizCorrect: false,
        htmlEditorDraft: "<h1>عنوان التجربة</h1>\n<p>شاهد أثر تعديلك.</p>",
        htmlBasicQuiz: false, htmlBasicQuizCorrect: false, htmlBasicDraft: "",
        htmlElementQuiz: false, htmlElementQuizCorrect: false, htmlElementDraft: "",
        htmlAttributeQuiz: false, htmlAttributeQuizCorrect: false, htmlAttributeDraft: "",
        htmlHeadingQuiz: false, htmlHeadingQuizCorrect: false, htmlHeadingDraft: "",
        htmlParagraphQuiz: false, htmlParagraphQuizCorrect: false, htmlParagraphDraft: "",
        htmlStyleQuiz: false, htmlStyleQuizCorrect: false, htmlStyleDraft: "",
        htmlFormattingQuiz: false, htmlFormattingQuizCorrect: false, htmlFormattingDraft: "",
        htmlQuotationsQuiz: false, htmlQuotationsQuizCorrect: false, htmlQuotationsDraft: "",
        htmlCommentsQuiz: false, htmlCommentsQuizCorrect: false, htmlCommentsDraft: "",
        htmlColorQuiz: false, htmlColorQuizCorrect: false, htmlColorDraft: "",
        htmlCssQuiz: false, htmlCssQuizCorrect: false, htmlCssDraft: "",
        htmlLinkQuiz: false, htmlLinkQuizCorrect: false, htmlLinkDraft: "",
        cssLesson: 0, cssStep: 1, cssStepVersion: 1, cssCode: "",
        jsLesson: 0, jsStep: 1, jsStepVersion: 1, jsCode: "",
        htmlScaffold: "", htmlDraft: "", htmlCode: ""
      },
      s;

  function migrateSeededCounters(state) {
    if (!state || state.statsVersion === 2) return state;
    if (state.lessons === 4) state.lessons = 0;
    if (state.examples === 12) state.examples = 0;
    if (state.fixes === 3) state.fixes = 0;
    if (state.minutes === 18) state.minutes = 0;
    if (state.progress === 26) state.progress = 0;
    if (state.project === 34) state.project = 0;
    state.statsVersion = 2;
    return state;
  }

  function normalizeFocusSettings(state, savedState) {
    var hasSavedDuration = savedState && Object.prototype.hasOwnProperty.call(savedState, "focusDuration"),
        storedDuration = savedState && savedState.focusDuration;
    if (storedDuration === 300 || storedDuration === 720) state.focusDuration = storedDuration;
    else if (hasSavedDuration) state.focusDuration = d.focusDuration;
    else state.focusDuration = savedState && typeof savedState.focusSeconds === "number" ? 720 : d.focusDuration;
    if (typeof state.focusSeconds !== "number" || !isFinite(state.focusSeconds)) state.focusSeconds = state.focusDuration;
    state.focusSeconds = Math.max(0, Math.min(state.focusDuration, Math.floor(state.focusSeconds)));
    return state;
  }

  function normalizeStoredCodeFields(state) {
    Object.keys(d).forEach(function(name) {
      if (typeof d[name] !== "string" || !/(Code|Draft|Scaffold)$/.test(name)) return;
      state[name] = typeof state[name] === "string" ? state[name].slice(0, 30000) : d[name];
    });
    return state;
  }

  try {
    var saved = JSON.parse(localStorage.getItem(key) || "null");
    s = Object.assign({}, d, saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {});
  } catch(e) {
    s = Object.assign({}, d);
  }
  s = normalizeStoredCodeFields(s);
  s = normalizeFocusSettings(s, saved);
  if (!Array.isArray(s.cheers)) s.cheers = [];
  else s.cheers = s.cheers.filter(function(value) { return typeof value === "string"; }).slice(-10);
  ["lessons", "examples", "fixes", "minutes", "progress", "project", "step", "htmlStep", "htmlLesson", "cssLesson", "cssStep", "jsLesson", "jsStep", "volume"].forEach(function(name) {
    if (typeof s[name] !== "number" || !isFinite(s[name])) s[name] = d[name];
    if (name === "progress" || name === "project") s[name] = Math.max(0, Math.min(100, s[name]));
    else if (name === "volume") s[name] = Math.max(0, Math.min(100, s[name]));
    else s[name] = Math.max(0, Math.floor(s[name]));
  });
  if (["html", "css", "js"].indexOf(s.course) < 0) s.course = d.course;
  if (["white", "brown", "rain", "forest", "cafe"].indexOf(s.sound) < 0) s.sound = d.sound;
  s = migrateSeededCounters(s);
  save();

  var growthKey = learnerStorage.growth,
      growth = loadGrowth();

  var profileStorageKey = learnerStorage.profile,
      profileThemes = {
        forest: { accent: "#286b56", soft: "#eaf3e9", ink: "#19372e" },
        ocean: { accent: "#35658f", soft: "#eaf1f8", ink: "#20364a" },
        plum: { accent: "#79527e", soft: "#f3edf4", ink: "#403043" },
        sunset: { accent: "#a65d32", soft: "#fbefe6", ink: "#4c3529" }
      },
      profileCard = loadProfileCard();
  var course = s.course, roadFilterCourse = "all", ran = false, lastCode = null, ctx = null, source = null, gain = null,
      timerDuration = s.focusDuration, clock = s.focusSeconds, timerDeadline = 0, timerId = null, toastId = null;

  function save() {
    try { localStorage.setItem(key, JSON.stringify(s)); } catch(e) {}
  }

  function loadProfileCard() {
    var defaults = { name: "", role: "", about: "", color: "forest", image: "", step: 1, completed: false },
        stored;
    try {
      stored = JSON.parse(localStorage.getItem(profileStorageKey) || "null");
    } catch(e) {
      stored = null;
    }
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return defaults;
    return {
      name: typeof stored.name === "string" ? stored.name.slice(0, 40) : "",
      role: typeof stored.role === "string" ? stored.role.slice(0, 55) : "",
      about: typeof stored.about === "string" ? stored.about.slice(0, 180) : "",
      color: profileThemes[stored.color] ? stored.color : "forest",
      image: typeof stored.image === "string" && stored.image.length < 350000 && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(stored.image) ? stored.image : "",
      step: typeof stored.step === "number" && isFinite(stored.step) ? Math.max(1, Math.min(3, Math.floor(stored.step))) : 1,
      completed: stored.completed === true
    };
  }

  function saveProfileCard() {
    try { localStorage.setItem(profileStorageKey, JSON.stringify(profileCard)); } catch(e) {}
    renderProfileCard();
    render();
    save();
  }

  function projectIsReady() {
    return !!(profileCard.name.trim() && profileCard.role.trim() && profileCard.about.trim());
  }

  function projectModuleMarkup(exportMode) {
    var unlocked = abilityCatalog.filter(function(ability) { return abilityProgress(ability).unlocked; }),
        markup = "";
    unlocked.forEach(function(ability) {
      if (ability.id === "output-panel") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>بطاقة نتيجة</h4><p>اكتب رسالة قصيرة واعرضها في مشروعك.</p><form data-profile-module="output"><input name="message" maxlength="80" required placeholder="رسالة من اختياري" aria-label="رسالة جديدة"><button type="submit">اعرض الرسالة</button></form><p class="module-output" data-message-output>كل تجربة تترك أثرًا.</p></section>';
      } else if (ability.id === "personal-page") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>قسم صفحتي الشخصية</h4><p>اكتب عنوانًا وفقرة، وشاهد القسم يتكوّن داخل مشروعك.</p><form data-profile-module="personal-page"><label>عنوان القسم<input name="title" maxlength="60" required value="' + escapeHtml(growth.projectData.pageSection.title) + '"></label><label>فقرة قصيرة<textarea name="description" maxlength="240" rows="3" required>' + escapeHtml(growth.projectData.pageSection.description) + '</textarea></label><button type="submit">احفظ القسم</button></form><div class="personal-page-preview" data-personal-page><b data-personal-page-title>' + escapeHtml(growth.projectData.pageSection.title) + '</b><p data-personal-page-copy>' + escapeHtml(growth.projectData.pageSection.description) + '</p><span class="module-status" data-personal-page-status>القسم محفوظ داخل مشروعك.</span></div></section>';
      } else if (ability.id === "signup-form") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>نموذج تسجيل</h4><p>اختبر الحقول محليًا؛ بياناتك لا تُرسل ولا تُحفظ.</p><form data-profile-module="signup"><label>الاسم<input name="name" required placeholder="اسمك"></label><label>البريد الإلكتروني<input name="email" type="email" required placeholder="name@example.com"></label><button type="submit">جرّب النموذج</button><p class="module-status" data-form-status aria-live="polite"></p></form></section>';
      } else if (ability.id === "photo-gallery") {
        var photos = growth.projectData.gallery.map(function(photo, index) {
          return '<figure><img src="' + escapeHtml(photo.src) + '" alt="' + escapeHtml(photo.alt) + '"><figcaption>' + escapeHtml(photo.caption) + '</figcaption>' + (exportMode ? "" : '<button type="button" data-gallery-remove="' + index + '" aria-label="احذف صورة ' + escapeHtml(photo.caption) + '">احذف</button>') + '</figure>';
        }).join(""),
            emptyMessage = growth.projectData.gallery.length ? "" : exportMode
              ? '<p class="gallery-empty">المعرض جاهز لعرض صور من تجاربك.</p>'
              : '<p class="gallery-empty">لا توجد صور مضافة بعد. أضف صورة بسيطة من أعمالك أو من جهازك.</p>',
            uploadForm = exportMode ? "" : growth.projectData.gallery.length >= 4
              ? '<p class="module-status">وصلت للحد الأقصى: أربع صور في المعرض.</p>'
              : '<form data-profile-module="gallery"><label>وصف قصير للصورة<input name="caption" maxlength="60" required placeholder="مثال: أول صفحة بنيتها"></label><label>نص بديل يصف الصورة<input name="alt" maxlength="100" required placeholder="مثال: صفحة بعنوان مرحبًا"></label><label>اختر صورة<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required></label><button type="submit">أضف الصورة لمشروعي</button><span class="module-status" data-gallery-status aria-live="polite">نضغط الصورة تلقائيًا لتبقى خفيفة.</span></form>';
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>معرض صوري</h4><p>' + (exportMode ? "صور من تجاربي ومشاريعي." : "أضف صورًا من تجاربك وشاهدها داخل بطاقتك.") + '</p><div class="project-gallery">' + photos + '</div>' + emptyMessage + uploadForm + '</section>';
      } else if (ability.id === "calculator") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>آلة حاسبة صغيرة</h4><p>أدخل رقمين وشاهد المجموع.</p><div class="calculator-inputs"><input type="number" data-calc-first value="2" aria-label="الرقم الأول"><span>+</span><input type="number" data-calc-second value="3" aria-label="الرقم الثاني"><button type="button" data-calc-run>احسب</button></div><output class="module-status" data-calc-result>النتيجة: ٥</output></section>';
      } else if (ability.id === "todo-list") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>قائمة مهامك</h4><p>مهمة واحدة صغيرة تكفي للبدء.</p><form data-profile-module="todo"><input name="task" required maxlength="80" placeholder="أول خطوة…" aria-label="مهمة جديدة"><button type="submit">أضفها</button></form><ul class="todo-items" data-task-list>' + growth.projectData.todos.map(function(task) { return "<li>" + escapeHtml(task) + "</li>"; }).join("") + '</ul></section>';
      } else if (ability.id === "notes-app") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>تطبيق ملاحظات</h4><p>اكتب فكرة تحب ترجع لها.</p><textarea data-project-note maxlength="500" rows="3" placeholder="فكرة اليوم…">' + escapeHtml(growth.projectData.note) + '</textarea><span class="module-status" data-note-status>تُحفظ الملاحظة على جهازك.</span></section>';
      } else if (ability.id === "visual-style") {
        markup += '<section id="projectTool-' + ability.id + '" class="feature-module"><h4>هوية بصرية</h4><p>اخترت لمشروعك لونًا ' + escapeHtml(profileCard.color === "forest" ? "أخضر" : profileCard.color === "ocean" ? "أزرق" : profileCard.color === "plum" ? "بنفسجي" : "دافئًا") + '؛ تقدر تغيّره من لوحة الألوان.</p></section>';
      }
    });
    return markup;
  }

  function showSignupPreview(form, event) {
    event.preventDefault();
    var name = form.elements.name.value.trim().slice(0, 40),
        status = form.querySelector("[data-form-status]");
    if (!name) {
      status.textContent = "اكتب اسمًا حتى نعرض رسالة التأكيد.";
      form.elements.name.focus();
      return false;
    }
    status.textContent = "نجحت التجربة يا " + name + ". لم نرسل أو نحفظ بياناتك؛ هذه معاينة محلية.";
    return true;
  }

  function renderProjectModules() {
    var host = document.getElementById("profileFeatureModules");
    host.innerHTML = projectModuleMarkup();
    host.querySelectorAll('[data-profile-module="signup"]').forEach(function(form) {
      form.onsubmit = function(event) {
        showSignupPreview(form, event);
      };
    });
    host.querySelectorAll('[data-profile-module="output"]').forEach(function(form) {
      form.onsubmit = function(event) {
        event.preventDefault();
        var message = form.elements.message.value.trim().slice(0, 80);
        if (message) form.parentElement.querySelector("[data-message-output]").textContent = message;
      };
    });
    host.querySelectorAll('[data-profile-module="personal-page"]').forEach(function(form) {
      var preview = form.parentElement.querySelector("[data-personal-page]"),
          title = form.elements.title,
          description = form.elements.description,
          lastSubmitted = { title: title.value, description: description.value };
      function updatePageSection() {
        growth.projectData.pageSection = { title: title.value.slice(0, 60), description: description.value.slice(0, 240) };
        preview.querySelector("[data-personal-page-title]").textContent = growth.projectData.pageSection.title;
        preview.querySelector("[data-personal-page-copy]").textContent = growth.projectData.pageSection.description;
        saveGrowth();
        refreshProfileExportCode();
      }
      form.oninput = updatePageSection;
      form.onsubmit = function(event) {
        event.preventDefault();
        updatePageSection();
        preview.querySelector("[data-personal-page-status]").textContent = "قسمك اتحدّث واتحفظ داخل المشروع.";
        if (title.value !== lastSubmitted.title || description.value !== lastSubmitted.description) {
          lastSubmitted = { title: title.value, description: description.value };
          celebrateGrowth("قسم جديد بقى جزءًا من مشروعك.", "#profileCardPreview");
        }
      };
    });
    host.querySelectorAll('[data-profile-module="gallery"]').forEach(function(form) {
      form.onsubmit = function(event) {
        event.preventDefault();
        var file = form.elements.image.files && form.elements.image.files[0],
            caption = form.elements.caption.value.trim(),
            alt = form.elements.alt.value.trim(),
            status = form.querySelector("[data-gallery-status]");
        if (!file || !caption || !alt) {
          status.textContent = "اكتب وصفًا للصورة واختر ملفًا قبل الإضافة.";
          return;
        }
        if (growth.projectData.gallery.length >= 4) {
          status.textContent = "وصلت للحد الأقصى: أربع صور في المعرض.";
          return;
        }
        status.textContent = "بنجهّز الصورة للعرض…";
        resizeGalleryImage(file, function(data, error) {
          if (!data) {
            status.textContent = error || "ما قدرناش نجهّز الصورة. جرّب ملفًا آخر.";
            return;
          }
          if (!addGalleryPhoto(data, caption, alt)) status.textContent = "ما قدرناش نضيف الصورة. راجع حجمها أو عدد الصور.";
        });
      };
    });
    host.querySelectorAll("[data-gallery-remove]").forEach(function(button) {
      button.onclick = function() {
        removeGalleryPhoto(+button.dataset.galleryRemove);
      };
    });
    host.querySelectorAll('[data-profile-module="todo"]').forEach(function(form) {
      form.onsubmit = function(event) {
        event.preventDefault();
        var input = form.elements.task, task = input.value.trim();
        if (!task) return;
        growth.projectData.todos.push(task.slice(0, 80));
        growth.projectData.todos = growth.projectData.todos.slice(-60);
        saveGrowth(); renderProjectModules(); refreshProfileExportCode();
        var nextInput = host.querySelector('[data-profile-module="todo"] input[name="task"]');
        if (nextInput) nextInput.focus();
      };
    });
    host.querySelectorAll("[data-calc-run]").forEach(function(button) {
      button.onclick = function() {
        var panel = button.closest(".feature-module"),
            first = Number(panel.querySelector("[data-calc-first]").value || 0),
            second = Number(panel.querySelector("[data-calc-second]").value || 0);
        panel.querySelector("[data-calc-result]").textContent = "النتيجة: " + ar(first + second);
      };
    });
    host.querySelectorAll("[data-project-note]").forEach(function(field) {
      field.oninput = function() {
        growth.projectData.note = field.value.slice(0, 500);
        saveGrowth();
        host.querySelector("[data-note-status]").textContent = "اتحفظت ملاحظتك على جهازك.";
        refreshProfileExportCode();
      };
    });
  }

  function resizeGalleryImage(file, done) {
    if (!file || !/^image\/(jpeg|png|webp)$/.test(file.type || "") || file.size <= 0 || file.size > 8 * 1024 * 1024) {
      done(null, "اختار صورة JPG أو PNG أو WebP أصغر من ٨ ميجابايت.");
      return;
    }
    var reader = new FileReader();
    reader.onerror = function() { done(null, "ما قدرناش نقرأ الصورة. جرّب ملفًا آخر."); };
    reader.onload = function() {
      var image = new Image();
      image.onerror = function() { done(null, "الصورة دي ما اتفتحتش. جرّب صورة أخرى."); };
      image.onload = function() {
        var canvas = document.createElement("canvas"),
            scale = Math.min(1, 360 / Math.max(image.width, image.height)),
            context;
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        context = canvas.getContext("2d");
        if (!context) { done(null, "المتصفح لم يستطع تجهيز الصورة."); return; }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL("image/jpeg", 0.7);
        if (data.length > 80000) data = canvas.toDataURL("image/jpeg", 0.48);
        if (data.length > 80000) {
          done(null, "الصورة ما زالت كبيرة بعد الضغط. جرّب صورة أبسط.");
          return;
        }
        done(data, "");
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function addGalleryPhoto(data, caption, alt) {
    var cleanCaption = String(caption || "").trim().slice(0, 60),
        cleanAlt = String(alt || "").trim().slice(0, 100),
        id;
    if (!Array.isArray(growth.projectData.gallery)) growth.projectData.gallery = [];
    if (growth.projectData.gallery.length >= 4 || !cleanCaption || !cleanAlt || typeof data !== "string" || data.length > 80000 || !/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(data)) return false;
    id = "gallery-" + todayKey() + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
    growth.projectData.gallery.push({ id: id, src: data, alt: cleanAlt, caption: cleanCaption });
    addProjectPart({ id: "project-" + id, label: "صورة في معرضي: " + cleanCaption, course: "", objective: "أضفت صورة إلى معرض بطاقتي الشخصية.", code: "", note: cleanAlt });
    saveGrowth();
    renderProfileCard();
    renderGrowthDashboard();
    celebrateGrowth("أصبحت صورتك جزءًا من معرضك الشخصي.", "#profileCardPreview");
    return true;
  }

  function removeGalleryPhoto(index) {
    if (!Array.isArray(growth.projectData.gallery) || !isFinite(index) || index < 0 || index >= growth.projectData.gallery.length) return false;
    growth.projectData.gallery.splice(index, 1);
    saveGrowth();
    renderProfileCard();
    renderGrowthDashboard();
    refreshProfileExportCode();
    return true;
  }

  function refreshProfileExportCode() {
    var field = document.getElementById("profileExportCode");
    if (field) field.value = buildProfileHtmlWithParts();
  }

  function profileInitials() {
    return profileCard.name.trim().split(/\s+/).slice(0, 2).map(function(part) { return part.charAt(0); }).join("") || "خ";
  }

  function openProjectPart(partId) {
    var part = growth.projectParts.find(function(item) { return item.id === partId; }),
        match = part && /^lesson-(html|css|js):(\d+)$/.exec(part.id);
    if (!part || !match || part.course !== match[1] || !part.code) return false;
    var key = match[1], index = +match[2];
    if (index < 0 || index >= courseTopics(key).length) return false;
    s[key + "Lesson"] = index;
    s[key + "Code"] = part.code;
    growth.drafts[lessonId(key, index)] = part.code;
    saveGrowth(); save();
    select(key);
    document.getElementById("lesson").scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("code").focus();
    var toast = document.getElementById("toast");
    toast.textContent = "رجعنا للمثال المحفوظ؛ تقدر تشغّله أو تكمل تعديله.";
    toast.classList.add("show");
    clearTimeout(toastId);
    toastId = setTimeout(function() { toast.classList.remove("show"); }, 3300);
    return true;
  }

  function renderProfileCard() {
    var theme = profileThemes[profileCard.color] || profileThemes.forest,
        stepNames = ["ابدأ بالاسم والهدف", "اكتب نبذة صغيرة", "اختار لمستك"],
        preview = document.getElementById("profileCardPreview"),
        photo = document.getElementById("profilePhoto"),
        step = profileCard.step;
    preview.dataset.color = profileCard.color;
    preview.style.setProperty("--profile-accent", theme.accent);
    preview.style.setProperty("--profile-soft", theme.soft);
    preview.style.setProperty("--profile-ink", theme.ink);
    document.getElementById("profileNamePreview").textContent = profileCard.name.trim() || "اسمك هيظهر هنا";
    document.getElementById("profileRolePreview").textContent = profileCard.role.trim() || "مجال تتعلمه";
    document.getElementById("profileAboutPreview").textContent = profileCard.about.trim() || "اكتب نبذة قصيرة، وشاهدها هنا.";
    document.getElementById("profileInitials").textContent = profileInitials();
    photo.hidden = !profileCard.image;
    photo.src = profileCard.image || "";
    photo.alt = "صورة " + (profileCard.name.trim() || "صاحب البطاقة");
    document.getElementById("profileInitials").hidden = !!profileCard.image;
    document.getElementById("profileStepTitle").textContent = stepNames[step - 1];
    document.getElementById("profileStepCount").textContent = "خطوة " + ar(step) + " من ٣";
    document.getElementById("profileStepMeter").style.width = ((step - 1) * 50) + "%";
    document.querySelectorAll("[data-profile-step]").forEach(function(section) {
      section.hidden = +section.dataset.profileStep !== step;
    });
    document.getElementById("projectBack").hidden = step === 1;
    document.getElementById("projectNext").textContent = step === 1 ? "بعدها: نبذة صغيرة ←" : step === 2 ? "بعدها: اختار لمستك ←" : profileCard.completed ? "حدّث بطاقتي ✓" : "أنشئ بطاقتي ↗";
    document.getElementById("projectExport").hidden = !profileCard.completed;
    document.getElementById("removeProjectImage").hidden = !profileCard.image;
    document.getElementById("aboutCount").textContent = ar(profileCard.about.length);
    renderLatestProjectPart();
    document.getElementById("profileProjectParts").hidden = growth.projectParts.length === 0;
    document.getElementById("profileProjectPartsSummary").textContent = "لبنات مشروعي · " + ar(growth.projectParts.length) + " محفوظة";
    document.getElementById("profileProjectPartList").innerHTML = projectPartListMarkup(true);
    document.querySelectorAll("#profileProjectPartList [data-open-project-part]").forEach(function(button) {
      button.onclick = function() { openProjectPart(button.dataset.openProjectPart); };
    });
    renderProjectModules();
    document.querySelectorAll("[data-profile-color]").forEach(function(button) {
      button.setAttribute("aria-pressed", button.dataset.profileColor === profileCard.color ? "true" : "false");
      button.classList.toggle("selected", button.dataset.profileColor === profileCard.color);
    });
    document.getElementById("profileExportCode").value = buildProfileHtmlWithParts();
  }

  function buildProfileHtmlWithParts() {
    var parts = projectPartListMarkup(false),
        modules = projectModuleMarkup(true),
        style = ".learning{padding:18px 22px;border-top:1px solid #e4e9e2}.learning h2{margin:0 0 8px;font-size:17px}.learning ul{display:flex;flex-wrap:wrap;gap:7px;margin:0;padding:0;list-style:none}.learning li{padding:4px 9px;border-radius:14px;background:#f1f5ee;color:#45634f;font-size:13px}.feature-module{margin-top:12px;padding:15px;border:1px solid #e3eadd;border-radius:14px;background:#fff}.feature-module h4{margin:0 0 4px;font-size:17px}.feature-module p{margin:3px 0 9px;color:#65766a}.feature-module input,.feature-module textarea{max-width:100%;padding:8px;border:1px solid #dce5da;border-radius:7px;font:inherit}.feature-module button{padding:8px 10px;border:0;border-radius:7px;background:#286b56;color:#fff;font:inherit;font-weight:bold}.feature-module form{display:grid;gap:8px}.feature-module label{display:grid;gap:4px}.module-status{display:block;margin-top:7px;color:#4f7359;font-size:14px}.project-gallery{display:flex;gap:9px}.project-gallery figure{flex:1;margin:0}.gallery-swatch{height:85px;border-radius:10px;background:linear-gradient(135deg,#b9d4aa,#edf2df)}.gallery-swatch-two{background:linear-gradient(135deg,#9fc6dd,#edf2f4)}.project-gallery figcaption{margin-top:4px;color:#586b5d;font-size:14px}.calculator-inputs{display:flex;align-items:center;gap:6px}.calculator-inputs input{width:75px}.todo-items{display:grid;gap:5px;padding-inline-start:22px}.learning-note{min-height:65px;width:100%;resize:vertical}.feature-module output{font-weight:bold}.project-gallery{margin-top:8px}",
        script = "<script>(function(){" +
          "document.querySelectorAll('[data-profile-module=signup]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var n=f.elements.name.value.trim().slice(0,40),s=f.querySelector('[data-form-status]');if(!n){s.textContent='اكتب اسمًا حتى نعرض رسالة التأكيد.';f.elements.name.focus();return}s.textContent='نجحت التجربة يا '+n+'. لم نرسل أو نحفظ بياناتك؛ هذه معاينة محلية.'})});" +
          "document.querySelectorAll('[data-profile-module=output]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var v=f.elements.message.value.trim();if(v)f.parentElement.querySelector('[data-message-output]').textContent=v})});" +
          "document.querySelectorAll('[data-profile-module=personal-page]').forEach(function(f){var p=f.parentElement.querySelector('[data-personal-page]'),t=f.elements.title,d=f.elements.description,s=p.querySelector('[data-personal-page-status]');function draw(){p.querySelector('[data-personal-page-title]').textContent=t.value;p.querySelector('[data-personal-page-copy]').textContent=d.value}function persist(){try{localStorage.setItem('khotwa-export-profile-page',JSON.stringify({title:t.value.slice(0,60),description:d.value.slice(0,240)}))}catch(e){}};try{var saved=JSON.parse(localStorage.getItem('khotwa-export-profile-page')||'null');if(saved&&typeof saved.title==='string'&&typeof saved.description==='string'){t.value=saved.title.slice(0,60);d.value=saved.description.slice(0,240)}}catch(e){};draw();f.addEventListener('input',function(){draw();persist()});f.addEventListener('submit',function(e){e.preventDefault();draw();persist();s.textContent='قسمك اتحدّث واتحفظ داخل المشروع.'})});" +
          "document.querySelectorAll('[data-calc-run]').forEach(function(b){b.addEventListener('click',function(){var p=b.closest('.feature-module'),a=Number(p.querySelector('[data-calc-first]').value||0),c=Number(p.querySelector('[data-calc-second]').value||0);p.querySelector('[data-calc-result]').textContent='النتيجة: '+(a+c)})});" +
          "document.querySelectorAll('[data-profile-module=todo]').forEach(function(f){var list=f.parentElement.querySelector('[data-task-list]'),saved=null,items=[];try{saved=JSON.parse(localStorage.getItem('khotwa-export-profile-tasks')||'null')}catch(e){};if(!Array.isArray(saved))saved=Array.prototype.map.call(list.querySelectorAll('li'),function(li){return li.textContent});items=saved.filter(function(x){return typeof x==='string'}).slice(-60);list.innerHTML='';items.forEach(function(x){var li=document.createElement('li');li.textContent=x;list.appendChild(li)});f.addEventListener('submit',function(e){e.preventDefault();var i=f.elements.task,t=i.value.trim();if(!t)return;items.push(t);items=items.slice(-60);try{localStorage.setItem('khotwa-export-profile-tasks',JSON.stringify(items))}catch(e){};var li=document.createElement('li');li.textContent=t;list.appendChild(li);i.value=''})});" +
          "document.querySelectorAll('[data-project-note]').forEach(function(t){try{var saved=localStorage.getItem('khotwa-export-profile-note');if(typeof saved==='string')t.value=saved}catch(e){};t.addEventListener('input',function(){try{localStorage.setItem('khotwa-export-profile-note',t.value)}catch(e){}})});" +
          "})();</script>",
        partSection = growth.projectParts.length ? '<details class="learning"><summary>لبنات مشروعي · ' + ar(growth.projectParts.length) + ' محفوظة</summary><ul>' + parts + '</ul></details>' : "";
    style += ".learning .project-artifact-note{margin:5px 0;padding:7px 9px;border-right:3px solid #78a66b;border-radius:6px;background:#eef5e9;color:#425d47;font-style:normal}";
    style += ".project-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:8px}.project-gallery figure{min-width:0;margin:0;padding:8px;border:1px solid #e5ebe2;border-radius:10px;background:#fbfcf9}.project-gallery img{display:block;width:100%;height:110px;object-fit:cover;border-radius:7px;background:#edf2df}.project-gallery figcaption{margin-top:5px;color:#586b5d;font-size:14px;overflow-wrap:anywhere}.gallery-empty{grid-column:1/-1;padding:12px;border-radius:9px;background:#f6f8f3;color:#65766a}";
    style += ".latest-build{display:grid;gap:3px;padding:11px 20px 13px;border-top:1px solid #e8ede5;background:" + (profileThemes[profileCard.color] || profileThemes.forest).soft + "}.latest-build small{color:#65766a;font-size:12px;font-weight:bold}.latest-build>b{color:" + (profileThemes[profileCard.color] || profileThemes.forest).accent + ";font-size:14px}.latest-build>p{margin:0;color:#53645a;font-size:14px;line-height:1.45;overflow-wrap:anywhere}";
    style += ".latest-build-preview{display:block;width:100%;height:180px;margin-top:7px;border:1px solid #dfe8dc;border-radius:10px;background:#fff}";
    if (!parts && !modules) return buildProfileHtml();
    return buildProfileHtml()
      .replace("</style>", () => style + ".learning{padding:12px 22px;border-top:1px solid #e4e9e2}.learning>summary{cursor:pointer;font-weight:bold;color:#286b56}.learning ul{display:grid;gap:8px;margin:10px 0 0;padding:0;list-style:none}.learning .project-artifact{padding:9px 10px;border:1px solid #e4e9e2;border-radius:10px;background:#f7faf5}.learning .project-artifact p{margin:4px 0;color:#53645a;font-size:14px}.learning .project-artifact details{margin-top:5px}.learning .project-artifact-archive{padding:0;border:0;background:transparent}.learning .project-artifact-archive>details>summary{cursor:pointer;color:#286b56;font-weight:bold}.learning .project-artifact-archive ul{margin-top:8px}.learning pre{max-height:180px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;direction:ltr;text-align:left;padding:9px;border-radius:8px;background:#1b2a20;color:#e2eee4;font:12px/1.5 Consolas,monospace}.learning li{font-size:15px}.personal-page-preview{margin-top:10px;padding:10px;border:1px solid #e5ebe2;border-radius:10px;background:#f7faf5}.personal-page-preview b{color:#286b56}.personal-page-preview p{margin:4px 0;color:#53645a}</style>")
      .replace("</main>", () => partSection + modules + "</main>")
      .replace("</body>", () => script + "</body>");
  }

  function buildProfileHtml() {
    var theme = profileThemes[profileCard.color] || profileThemes.forest,
        avatar = profileCard.image
          ? '<img class="avatar" src="' + escapeHtml(profileCard.image) + '" alt="صورة ' + escapeHtml(profileCard.name || "صاحب البطاقة") + '">'
          : '<span class="avatar initials">' + escapeHtml(profileInitials()) + '</span>',
        latestBuild = latestProjectPartMarkup();
    return '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>' + escapeHtml(profileCard.name || "بطاقتي الشخصية") + '</title>\n<style>\n*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f5f6f1;font:16px/1.7 Arial,sans-serif;color:' + theme.ink + '}.card{width:min(100%,460px);overflow:hidden;border:1px solid #e4e9e2;border-radius:22px;background:#fff;box-shadow:0 18px 48px #203d2d18}.top{display:flex;align-items:center;justify-content:space-between;padding:20px;background:' + theme.soft + '}.avatar{width:76px;height:76px;display:grid;place-items:center;border-radius:50%;object-fit:cover;background:' + theme.accent + ';color:#fff;font-size:24px;font-weight:bold}.mark{color:' + theme.accent + ';font-weight:bold}.copy{padding:22px}.role{color:' + theme.accent + ';font-size:14px;font-weight:bold}.copy h1{margin:5px 0 8px;font-size:28px}.copy p{margin:0;color:#53645a}.foot{display:flex;justify-content:space-between;padding:12px 22px;background:#fafbf8;color:#5b6c61}</style>\n</head>\n<body>\n<main class="card">\n<div class="top">' + avatar + '<span class="mark">بطاقتي</span></div>\n<div class="copy"><span class="role">' + escapeHtml(profileCard.role || "مجال تتعلمه") + '</span><h1>' + escapeHtml(profileCard.name || "اسمك") + '</h1><p>' + escapeHtml(profileCard.about || "نبذة قصيرة عني") + '</p></div>\n<div class="foot"><span>خطوة صغيرة كل يوم</span><span>✦</span></div>' + latestBuild + '\n</main>\n</body>\n</html>';
  }

  function advanceProjectStep() {
    if (profileCard.step === 1) {
      profileCard.name = document.getElementById("projectNameInput").value.trim().slice(0, 40);
      profileCard.role = document.getElementById("projectRoleInput").value.trim().slice(0, 55);
      if (!profileCard.name || !profileCard.role) {
        document.getElementById("projectFeedback").textContent = "اكتب اسمك وعنوانًا قصيرًا؛ مش محتاج تجهز البطاقة كلها دلوقتي.";
        (!profileCard.name ? document.getElementById("projectNameInput") : document.getElementById("projectRoleInput")).focus();
        return;
      }
      profileCard.step = 2;
      document.getElementById("projectFeedback").textContent = "تمام، الاسم والهدف ظهرا في البطاقة. أضف نبذة قصيرة.";
    } else if (profileCard.step === 2) {
      profileCard.about = document.getElementById("projectAboutInput").value.trim().slice(0, 180);
      if (!profileCard.about) {
        document.getElementById("projectFeedback").textContent = "اكتب جملة واحدة عن شيء تتعلمه أو تحب صنعه.";
        document.getElementById("projectAboutInput").focus();
        return;
      }
      profileCard.step = 3;
      document.getElementById("projectFeedback").textContent = "وصلت للخطوة الأخيرة. اختار لونًا، والصورة اختيارية.";
    } else {
      if (!projectIsReady()) {
        document.getElementById("projectFeedback").textContent = "ارجع للخطوتين السابقتين وأكمل الاسم والنبذة أولًا.";
        return;
      }
      profileCard.completed = true;
      document.getElementById("projectFeedback").textContent = "بطاقتك جاهزة! شوف المعاينة، وبعدها حمّل ملف HTML أو افتح الكود.";
      cheer();
    }
    saveProfileCard();
  }

  function compressProfileImage(file) {
    var status = document.getElementById("projectFeedback");
    if (!file || file.type.indexOf("image/") !== 0 || file.size > 8 * 1024 * 1024) {
      status.textContent = "اختار صورة أقل من ٨ ميجابايت بصيغة صورة معروفة.";
      return;
    }
    var reader = new FileReader();
    reader.onerror = function() { status.textContent = "ما قدرناش نقرأ الصورة. جرّب ملفًا آخر."; };
    reader.onload = function() {
      var image = new Image();
      image.onerror = function() { status.textContent = "الصورة دي ما اتفتحتش. جرّب صورة JPG أو PNG."; };
      image.onload = function() {
        var canvas = document.createElement("canvas"),
            scale = Math.min(1, 480 / Math.max(image.width, image.height));
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL("image/jpeg", 0.78);
        if (data.length > 340000) data = canvas.toDataURL("image/jpeg", 0.52);
        if (data.length > 350000) {
          status.textContent = "الصورة ما زالت كبيرة. اختار صورة أصغر، أو كمل من غير صورة.";
          return;
        }
        profileCard.image = data;
        status.textContent = "الصورة ظهرت في بطاقتك. تقدر تغيّرها أو تحذفها.";
        saveProfileCard();
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function initializeProjectCard() {
    var nameInput = document.getElementById("projectNameInput"),
        roleInput = document.getElementById("projectRoleInput"),
        aboutInput = document.getElementById("projectAboutInput");
    nameInput.value = profileCard.name;
    roleInput.value = profileCard.role;
    aboutInput.value = profileCard.about;
    function update(field, input, max) {
      profileCard[field] = input.value.slice(0, max);
      saveProfileCard();
    }
    nameInput.oninput = function() { update("name", this, 40); };
    roleInput.oninput = function() { update("role", this, 55); };
    aboutInput.oninput = function() { update("about", this, 180); };
    document.getElementById("projectNext").onclick = advanceProjectStep;
    document.getElementById("projectBack").onclick = function() {
      profileCard.step = Math.max(1, profileCard.step - 1);
      document.getElementById("projectFeedback").textContent = "خد وقتك. تقدر تعدّل أي خانة وتراقب المعاينة.";
      saveProfileCard();
    };
    document.querySelectorAll("[data-profile-color]").forEach(function(button) {
      button.onclick = function() {
        profileCard.color = button.dataset.profileColor;
        document.getElementById("projectFeedback").textContent = "اللون اتغير في المعاينة. اختار اللي يريحك.";
        saveProfileCard();
      };
    });
    document.getElementById("projectImageInput").onchange = function() {
      compressProfileImage(this.files && this.files[0]);
      this.value = "";
    };
    document.getElementById("removeProjectImage").onclick = function() {
      profileCard.image = "";
      document.getElementById("projectFeedback").textContent = "شلت الصورة؛ الأحرف الأولى من اسمك ظهرت بدلها.";
      saveProfileCard();
    };
    document.getElementById("downloadProfile").onclick = function() {
      var blob = new Blob([buildProfileHtmlWithParts()], { type: "text/html;charset=utf-8" }),
          url = URL.createObjectURL(blob),
          link = document.createElement("a");
      link.href = url;
      link.download = "my-profile-card.html";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      document.getElementById("projectFeedback").textContent = "اتحمّل ملف البطاقة. افتحه في المتصفح أو عدّل كوده.";
    };
    document.getElementById("copyProfileCode").onclick = function() {
      var code = buildProfileHtmlWithParts(),
          status = document.getElementById("copyProfileStatus"),
          field = document.getElementById("profileExportCode");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function() {
          status.textContent = "اتنسخ الكود.";
        }).catch(function() {
          field.focus(); field.select(); status.textContent = "حددت الكود؛ انسخه من لوحة المفاتيح.";
        });
      } else {
        field.focus(); field.select(); status.textContent = "حددت الكود؛ انسخه من لوحة المفاتيح.";
      }
    };
    renderProfileCard();
  }

  function ar(x) {
    return String(x).replace(/[0-9]/g, function(n) { return "٠١٢٣٤٥٦٧٨٩"[+n]; });
  }

  function saveActiveLearner() {
    save();
    saveGrowth();
    try { localStorage.setItem(profileStorageKey, JSON.stringify(profileCard)); } catch (error) {}
  }

  function renderLearnerProfiles() {
    var active = learnerManager.active(),
        list = document.getElementById("learnerProfileList");
    document.getElementById("learnerProfileButton").textContent = "ملف التعلّم · " + active.name;
    document.getElementById("learnerActiveName").textContent = active.name;
    list.textContent = "";
    learnerManager.list().forEach(function(profile) {
      var row = document.createElement("div"),
          name = document.createElement("span"),
          button = document.createElement("button"),
          selected = profile.id === active.id;
      row.className = "learner-profile-row";
      row.setAttribute("aria-current", selected ? "true" : "false");
      name.textContent = profile.name;
      button.type = "button";
      button.textContent = selected ? "مفتوح الآن" : "افتح هذا الملف";
      button.disabled = selected;
      button.onclick = function() {
        saveActiveLearner();
        if (learnerManager.activate(profile.id)) window.location.reload();
      };
      row.appendChild(name);
      row.appendChild(button);
      list.appendChild(row);
    });
  }

  function initializeLearnerProfiles() {
    var dialog = document.getElementById("learnerProfileDialog"),
        form = document.getElementById("learnerCreateForm"),
        input = document.getElementById("learnerNameInput"),
        status = document.getElementById("learnerProfileStatus");
    document.getElementById("learnerProfileButton").onclick = function() {
      renderLearnerProfiles();
      dialog.showModal();
    };
    form.onsubmit = function(event) {
      event.preventDefault();
      saveActiveLearner();
      var result = learnerManager.create(input.value);
      if (!result.ok) {
        status.textContent = result.message;
        input.focus();
        return;
      }
      window.location.reload();
    };
    renderLearnerProfiles();
  }

  function render() {
    ["lessons", "examples", "fixes", "minutes"].forEach(function(k) {
      document.getElementById(k).textContent = ar(s[k]);
    });
    document.getElementById("meter").style.width = s.progress + "%";
    document.getElementById("progressLabel").textContent = ar(s.progress) + "٪";
    var projectChecks = [
      !!(profileCard.name.trim() && profileCard.role.trim()),
      !!profileCard.about.trim(),
      growth.projectParts.length > 0
    ];
    s.project = Math.round((projectChecks[0] ? 20 : 0) + (projectChecks[1] ? 20 : 0) + (profileCard.completed ? 20 : 0) + Math.min(40, growth.projectParts.length * 7));
    document.getElementById("projectBar").style.width = s.project + "%";
    document.getElementById("projectPct").textContent = ar(s.project) + "٪";
    document.querySelectorAll("#projectChecks .check").forEach(function(el, i) {
      var isDone = projectChecks[i];
      el.classList.toggle("done", isDone);
      var icon = el.querySelector("i");
      if (icon) icon.textContent = isDone ? "✓" : "·";
    });

    drawSteps();
    renderGrowthDashboard();
  }

  function drawSteps() {
    var cur = s.step || 2;
    document.querySelectorAll(".node").forEach(function(n, i) {
      n.className = "node";
      if (i + 1 < cur) {
        n.classList.add("done");
        n.textContent = "✓";
      } else {
        if (i + 1 === cur) n.classList.add("now");
        n.textContent = ar(i + 1);
      }
    });
    document.querySelectorAll(".stepnames span").forEach(function(n, i) {
      n.classList.toggle("on", i + 1 === cur);
    });
  }

  var phrases = [
    "خطوة إضافية اتضافت لفهمك.",
    "تقدم صغير، لكنه حقيقي.",
    "كل تجربة بتوضح جزءًا جديدًا.",
    "أنت دلوقتي تعرف أكتر من قبل شوية.",
    "لبنة جديدة اتضافت للصورة.",
    "جرّب تغيّر حاجة وشوف اللي هيحصل.",
    "الكود بقى يتحرك خطوة لقدام.",
    "ممتاز، عندنا حاجة شغالة دلوقتي.",
    "تجربتك خلت المثال أوضح.",
    "كل خطوة بتقرب الصورة."
  ];

  function cheer() {
    var old = s.cheers || [],
        pool = phrases.filter(function(x) { return old.indexOf(x) < 0; });
    if (!pool.length) { old = []; pool = phrases; }
    var msg = pool[Math.floor(Math.random() * pool.length)];
    old.push(msg);
    if (old.length > 10) old.shift();
    s.cheers = old;
    save();
    var t = document.getElementById("toast");
    t.textContent = "✓ " + msg;
    t.classList.add("show");
    clearTimeout(toastId);
    toastId = setTimeout(function() { t.classList.remove("show"); }, 3300);
  }

  var greetings = [
    "لنر ما الخطوة التالية اليوم.",
    "بضع دقائق ممكن تضيف فكرة جديدة.",
    "أهلًا بعودتك. نكمل من حيث وقفنا؟",
    "في تجربة صغيرة مستنياك النهارده.",
    "اختار سؤالًا وسيب الباقي يتكشف.",
    "يمكننا استكشاف فكرة بسيطة اليوم؛ الخطوة تجربة ممتعة وليست واجبًا."
  ];

  function greeting() {
    var old = document.getElementById("greeting").textContent,
        p = greetings.filter(function(x) { return x !== old; }),
        v = p[Math.random() * p.length | 0];
    document.getElementById("greeting").textContent = v;
  }

  function buildJavascriptPreview(code) {
    var safeCode = JSON.stringify(String(code || "")).replace(/</g, "\\u003c"),
        page = "<!doctype html><html lang='ar' dir='rtl'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><style>body{font:16px Arial;padding:12px;color:#234b3e;margin:0}h1{font-size:16px;margin:0 0 8px}button{padding:7px 10px;border:0;border-radius:7px;background:#e8f2ec;color:#256b57;cursor:pointer}#output{margin-top:9px;padding:8px;border-radius:7px;background:#f2f5ee;white-space:pre-wrap;font:15px/1.6 Consolas,monospace}#output.error{background:#fff0f0;color:#8d2020}</style></head><body><h1 id='result'>نتيجة تشغيل السطر</h1><button id='change'>جرّب الزر</button><canvas width='180' height='70' style='display:block;margin-top:8px;border:1px solid #dfe8dc;border-radius:7px'></canvas><pre id='output' aria-live='polite'></pre><script>" +
          "const out=document.querySelector('#output');" +
          "const originalLog=console.log.bind(console);" +
          "const originalError=console.error.bind(console);" +
          "console.log=(...args)=>{out.textContent+=args.map(String).join(' ')+'\\n';originalLog(...args)};" +
          "function reportError(message){const text=String(message||'خطأ غير معروف');out.classList.add('error');out.textContent+='خطأ: '+text+'\\n';parent.postMessage({type:'lesson-preview-error',message:text},'*')}" +
          "console.error=(...args)=>{originalError(...args);reportError(args.map(String).join(' '))};" +
          "window.addEventListener('error',event=>reportError(event.message||'خطأ في صياغة JavaScript'));" +
          "window.addEventListener('unhandledrejection',event=>{event.preventDefault();reportError(event.reason&&event.reason.message||event.reason||'رفض طلب غير معالج')});" +
          "const userCode=" + safeCode + ";try{new Function(userCode)()}catch(error){reportError(error&&error.message||error)}" +
          "</script></body></html>";
    return page;
  }

  var data = {
    html: {
      title: "أول صفحة HTML لي",
      sub: "سنضيف عنوانًا وفقرة ونشاهد ظهورهما في المعاينة.",
      level: "بناء",
      prompt: "ابدأ بعنوان من اختيارك؛ المثال جاهز للتجربة.",
      file: "index.html",
      code: "<h1>أول صفحة لي</h1>\n<p>أنا ببني صفحة خطوة خطوة.</p>",
      build: function(c) {
        return /<html[\s>]/i.test(c) ? c : "<!doctype html><html lang='ar' dir='rtl'><head><meta charset='utf-8'><style>body{font:16px Arial;padding:12px;color:#234b3e;margin:0}</style></head><body>" + c + "</body></html>";
      }
    },
    css: {
      title: "أضف لمستك بالـ CSS",
      sub: "التنسيق يغيّر شكل البطاقة.",
      level: "تنسيق",
      prompt: "بدّل قيمة اللون وبعدها شغّل وشوف الفرق.",
      file: "style.css",
      code: "body { font-family: Arial; padding: 12px; margin: 0; }\n.card { background: #eef5e9; border-radius: 14px; padding: 14px; }\nh1 { color: #256b57; font-size: 18px; margin: 0 0 6px; }",
      build: function(c) {
        return "<!doctype html><html lang='ar' dir='rtl'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><style>body{font:16px Arial;padding:12px;margin:0;color:#234b3e}.card{background:#eef5e9;border:1px solid #c9dac6;border-radius:14px;padding:14px}.card h1{color:#256b57;font-size:18px;margin:0 0 6px}.card p{margin:0 0 8px}.card a{color:#256b57}.tiles,.gallery,.nav{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}.tiles span{display:grid;place-items:center;width:30px;height:30px;border-radius:6px;background:#dfeeda}.art{display:block;width:90px;height:60px;object-fit:cover;margin-top:9px;border-radius:8px}.card ul{padding-inline-start:22px}.card table{border-collapse:collapse;margin:8px 0}.card td{border:1px solid #bccbb8;padding:4px}.card input,.card button,.card select{font:inherit;padding:5px;border:1px solid #bccbb8;border-radius:6px} " + c + "</style></head><body><div class='card'><h1>بطاقتي الصغيرة</h1><p id='result'>كل قاعدة بتغيّر إحساس الصفحة.</p><nav class='nav'><a href='#result'>الرئيسية</a><a href='#result'>عن الصفحة</a></nav><a href='#result' title='رابط للتجربة'>رابط تجريبي</a><ul><li>قراءة</li><li>تصوير</li></ul><table><tr><td>اليوم</td><td>الاثنين</td></tr><tr><td>الوقت</td><td>صباحًا</td></tr></table><form><input aria-label='اسمك' placeholder='اسمك'><select aria-label='اختر نشاطًا'><option>قراءة</option><option>تصوير</option></select><button type='button'>حفظ</button></form><div class='tiles'><span>١</span><span>٢</span><span>٣</span></div><div class='gallery'><img class='art' alt='شكل تجريبي' src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22120%22%3E%3Crect width=%22180%22 height=%22120%22 fill=%22%23d7ebd0%22/%3E%3Ccircle cx=%2290%22 cy=%2260%22 r=%2240%22 fill=%22%238cb275%22/%3E%3C/svg%3E'><img class='art' alt='نسخة ثانية من الشكل' src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22120%22%3E%3Crect width=%22180%22 height=%22120%22 fill=%22%23d7ebd0%22/%3E%3Ccircle cx=%2290%22 cy=%2260%22 r=%2240%22 fill=%22%238cb275%22/%3E%3C/svg%3E'></div></div></body></html>";
      }
    },
    js: {
      title: "أول حدث في JavaScript",
      sub: "الزر هيغيّر الرسالة لما نضغط عليه.",
      level: "تطبيق",
      prompt: "غيّر الجملة داخل علامات التنصيص وبعدها شغّل الكود.",
      file: "script.js",
      code: "const button = document.querySelector('#change');\nbutton.addEventListener('click', () => {\n  document.querySelector('h1').textContent = 'أنا جرّبت الكود!';\n});",
      build: function(c) {
        return buildJavascriptPreview(c);
      }
    }
  };







  var htmlSequence = window.LESSONS_DATA.html,
      cssSequence = window.LESSONS_DATA.css,
      jsSequence = window.LESSONS_DATA.js,
      skillCatalog = [];
  Object.keys(window.LESSONS_DATA.skills || {}).forEach(function(key) {
    window.LESSONS_DATA.skills[key].forEach(function(skill) {
      skillCatalog.push({ course: key, title: skill.title, from: skill.from, to: skill.to });
    });
  });

  function loadGrowth() {
    var stored;
    try { stored = JSON.parse(localStorage.getItem(growthKey) || "null"); } catch(e) { stored = null; }
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) stored = {};
    function lessonMap(value, kind) {
      var clean = {},
          keyRule = kind === "answers" ? /^(?:bug|quiz):(html|css|js):\d{1,3}$/ : /^(html|css|js):\d{1,3}$/;
      if (!value || typeof value !== "object" || Array.isArray(value)) return clean;
      Object.keys(value).slice(-300).forEach(function(id) {
        var item = value[id];
        if (!keyRule.test(id)) return;
        if (kind === "stages") {
          if (typeof item === "number" && isFinite(item) && Math.floor(item) === item && item >= 0 && item <= 6) clean[id] = item;
        } else if (kind === "readingSteps") {
          if (typeof item === "number" && isFinite(item) && Math.floor(item) === item && item >= 0 && item <= 10) clean[id] = item;
        } else if (kind === "flags" || kind === "answers") {
          if (typeof item === "boolean") clean[id] = item;
        } else if (typeof item === "string") clean[id] = item.slice(0, 30000);
      });
      return clean;
    }
    function lessonFlowMap(value) {
      var clean = {};
      if (!value || typeof value !== "object" || Array.isArray(value)) return clean;
      Object.keys(value).slice(-300).forEach(function(id) {
        var item = value[id];
        if (!/^(html|css|js):\d{1,3}$/.test(id) || !item || typeof item !== "object" || Array.isArray(item)) return;
        var current = item.current,
            unlocked = item.unlocked;
        if (typeof current !== "number" || !isFinite(current) || Math.floor(current) !== current || current < 0 || current > 40) return;
        if (typeof unlocked !== "number" || !isFinite(unlocked) || Math.floor(unlocked) !== unlocked || unlocked < current || unlocked > 40) return;
        clean[id] = { current: current, unlocked: unlocked };
      });
      return clean;
    }
    var completed = Array.isArray(stored.completed) ? stored.completed.filter(function(id, index, all) {
      return typeof id === "string" && /^(html|css|js):\d{1,3}$/.test(id) && all.indexOf(id) === index;
    }).slice(-267) : [];
    return {
      completed: completed,
      stages: lessonMap(stored.stages, "stages"),
      readingSteps: lessonMap(stored.readingSteps, "readingSteps"),
      lessonFlow: lessonFlowMap(stored.lessonFlow),
      baseCodes: lessonMap(stored.baseCodes, "code"),
      drafts: lessonMap(stored.drafts, "code"),
      archivedDrafts: lessonMap(stored.archivedDrafts, "code"),
      experimentCodes: lessonMap(stored.experimentCodes, "code"),
      repairStarted: lessonMap(stored.repairStarted, "flags"),
      answers: lessonMap(stored.answers, "answers"),
      unlocks: Array.isArray(stored.unlocks) ? stored.unlocks.filter(function(id) { return typeof id === "string" && /^[a-z][a-z0-9-]{0,79}$/.test(id); }).slice(-32) : [],
      projectParts: Array.isArray(stored.projectParts) ? stored.projectParts.filter(function(x) { return x && typeof x.id === "string" && typeof x.label === "string"; }).slice(-600).map(function(part) {
        return {
          id: part.id.slice(0, 120),
          label: part.label.slice(0, 100),
          course: ["html", "css", "js"].indexOf(part.course) >= 0 ? part.course : "",
          objective: typeof part.objective === "string" ? part.objective.slice(0, 240) : "",
          code: typeof part.code === "string" ? part.code.slice(0, 1200) : "",
          note: typeof part.note === "string" ? part.note.slice(0, 180) : ""
        };
      }) : [],
      projectData: stored.projectData && typeof stored.projectData === "object" && !Array.isArray(stored.projectData) ? {
        todos: Array.isArray(stored.projectData.todos) ? stored.projectData.todos.filter(function(x) { return typeof x === "string"; }).slice(-60).map(function(task) { return task.slice(0, 80); }) : [],
        note: typeof stored.projectData.note === "string" ? stored.projectData.note.slice(0, 500) : "",
        gallery: Array.isArray(stored.projectData.gallery) ? stored.projectData.gallery.filter(function(photo) {
          return photo && typeof photo === "object" && typeof photo.src === "string" && photo.src.length <= 80000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(photo.src);
        }).slice(-4).map(function(photo) {
          return {
            id: typeof photo.id === "string" ? photo.id.slice(0, 100) : "",
            src: photo.src,
            alt: typeof photo.alt === "string" ? photo.alt.slice(0, 100) : "",
            caption: typeof photo.caption === "string" ? photo.caption.slice(0, 60) : ""
          };
        }) : [],
        pageSection: stored.projectData.pageSection && typeof stored.projectData.pageSection === "object" && !Array.isArray(stored.projectData.pageSection) ? {
          title: typeof stored.projectData.pageSection.title === "string" ? stored.projectData.pageSection.title.slice(0, 60) : "ما أتعلمه الآن",
          description: typeof stored.projectData.pageSection.description === "string" ? stored.projectData.pageSection.description.slice(0, 240) : "أبني صفحة شخصية خطوة خطوة."
        } : { title: "ما أتعلمه الآن", description: "أبني صفحة شخصية خطوة خطوة." }
      } : { todos: [], note: "", gallery: [], pageSection: { title: "ما أتعلمه الآن", description: "أبني صفحة شخصية خطوة خطوة." } },
      daily: stored.daily && typeof stored.daily === "object" && !Array.isArray(stored.daily) ? {
        day: typeof stored.daily.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(stored.daily.day) ? stored.daily.day : "",
        completed: stored.daily.completed === true,
        topic: typeof stored.daily.topic === "string" ? stored.daily.topic.slice(0, 100) : "",
        result: typeof stored.daily.result === "string" ? stored.daily.result.slice(0, 180) : ""
      } : {},
      lastActiveDate: typeof stored.lastActiveDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(stored.lastActiveDate) ? stored.lastActiveDate : ""
    };
  }

  var miniProjectStorageKey = (typeof learnerStorage !== "undefined" && learnerStorage.profile ? learnerStorage.profile : "khotwa-profile-card-v1") + ":mini-projects-v1",
      miniProjects = loadMiniProjects();

  function loadMiniProjects() {
    var defaults = { active: "todo", todo: [], note: { title: "فكرة صغيرة", body: "" }, calculator: { first: 2, second: 3 } }, stored;
    try { stored = JSON.parse(localStorage.getItem(miniProjectStorageKey) || "null"); } catch(e) { stored = null; }
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return defaults;
    return {
      active: ["todo", "notes", "calculator"].indexOf(stored.active) >= 0 ? stored.active : "todo",
      todo: Array.isArray(stored.todo) ? stored.todo.filter(function(task) { return task && typeof task.text === "string"; }).slice(-60).map(function(task) { return { text: task.text.slice(0, 80), done: task.done === true }; }) : [],
      note: stored.note && typeof stored.note === "object" ? { title: typeof stored.note.title === "string" ? stored.note.title.slice(0, 60) : "فكرة صغيرة", body: typeof stored.note.body === "string" ? stored.note.body.slice(0, 500) : "" } : defaults.note,
      calculator: stored.calculator && typeof stored.calculator === "object" ? { first: isFinite(+stored.calculator.first) ? +stored.calculator.first : 2, second: isFinite(+stored.calculator.second) ? +stored.calculator.second : 3 } : defaults.calculator
    };
  }

  function saveMiniProjects() {
    try { localStorage.setItem(miniProjectStorageKey, JSON.stringify(miniProjects)); } catch(e) {}
  }

  function renderMiniProjects() {
    var host = document.getElementById("starterProjectWorkspace");
    if (!host) return;
    document.querySelectorAll("[data-starter-project]").forEach(function(button) {
      var active = button.dataset.starterProject === miniProjects.active;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (miniProjects.active === "todo") {
      var tasks = miniProjects.todo.map(function(task, index) {
        return '<li class="starter-task' + (task.done ? ' done' : '') + '"><input type="checkbox" data-starter-task-toggle="' + index + '"' + (task.done ? ' checked' : '') + ' aria-label="أنهيت المهمة"><span>' + escapeHtml(task.text) + '</span><button type="button" data-starter-task-remove="' + index + '">حذف</button></li>';
      }).join("") || '<li class="starter-task"><span>اكتب مهمة واحدة فقط لتظهر هنا.</span></li>';
      host.innerHTML = '<h4>مشروع: قائمة مهام</h4><p>هذه ليست قائمة الدروس؛ هي قائمة تخصك أنت وتُحفظ على جهازك.</p><form id="starterTodoForm" class="starter-project-form"><input name="task" maxlength="80" required placeholder="مثال: أجرّب أول درس CSS" aria-label="مهمة جديدة"><button type="submit">أضف المهمة</button></form><ul class="starter-task-list">' + tasks + '</ul>';
      document.getElementById("starterTodoForm").onsubmit = function(event) {
        event.preventDefault();
        var input = this.elements.task, text = input.value.trim().slice(0, 80);
        if (!text) return;
        miniProjects.todo.push({ text: text, done: false });
        miniProjects.todo = miniProjects.todo.slice(-60);
        saveMiniProjects(); renderMiniProjects();
      };
      host.querySelectorAll("[data-starter-task-toggle]").forEach(function(input) {
        input.onchange = function() { miniProjects.todo[+input.dataset.starterTaskToggle].done = input.checked; saveMiniProjects(); renderMiniProjects(); };
      });
      host.querySelectorAll("[data-starter-task-remove]").forEach(function(button) {
        button.onclick = function() { miniProjects.todo.splice(+button.dataset.starterTaskRemove, 1); saveMiniProjects(); renderMiniProjects(); };
      });
    } else if (miniProjects.active === "notes") {
      host.innerHTML = '<h4>مشروع: مفكرة أفكار</h4><p>اكتب عنوانًا وفكرة قصيرة. البطاقة تتغير مع كل حرف.</p><form id="starterNoteForm" class="starter-project-form"><div style="flex:1"><input name="title" maxlength="60" value="' + escapeHtml(miniProjects.note.title) + '" placeholder="عنوان الفكرة" aria-label="عنوان الفكرة"><textarea name="body" maxlength="500" placeholder="ما الفكرة التي تريد تذكرها؟" aria-label="نص الفكرة">' + escapeHtml(miniProjects.note.body) + '</textarea></div></form><article class="starter-note-preview"><b>' + escapeHtml(miniProjects.note.title || "فكرة صغيرة") + '</b><p>' + escapeHtml(miniProjects.note.body || "اكتب أول سطر لتظهر فكرتك هنا.") + '</p></article>';
      var noteForm = document.getElementById("starterNoteForm");
      noteForm.oninput = function() {
        miniProjects.note.title = noteForm.elements.title.value.slice(0, 60);
        miniProjects.note.body = noteForm.elements.body.value.slice(0, 500);
        saveMiniProjects();
        host.querySelector(".starter-note-preview b").textContent = miniProjects.note.title || "فكرة صغيرة";
        host.querySelector(".starter-note-preview p").textContent = miniProjects.note.body || "اكتب أول سطر لتظهر فكرتك هنا.";
      };
    } else {
      var total = miniProjects.calculator.first + miniProjects.calculator.second;
      host.innerHTML = '<h4>مشروع: آلة حاسبة</h4><p>كل خانة تحمل قيمة، والزر ينفذ فعل الجمع ويعرض النتيجة.</p><form id="starterCalculatorForm" class="starter-calculator"><input name="first" type="number" value="' + escapeHtml(miniProjects.calculator.first) + '" aria-label="الرقم الأول"><span>+</span><input name="second" type="number" value="' + escapeHtml(miniProjects.calculator.second) + '" aria-label="الرقم الثاني"><button type="submit">احسب</button><output>النتيجة: ' + escapeHtml(total) + '</output></form>';
      document.getElementById("starterCalculatorForm").onsubmit = function(event) {
        event.preventDefault();
        miniProjects.calculator.first = Number(this.elements.first.value || 0);
        miniProjects.calculator.second = Number(this.elements.second.value || 0);
        saveMiniProjects(); renderMiniProjects();
      };
    }
  }

  function initializeMiniProjects() {
    document.querySelectorAll("[data-starter-project]").forEach(function(button) {
      button.onclick = function() { miniProjects.active = button.dataset.starterProject; saveMiniProjects(); renderMiniProjects(); };
    });
    renderMiniProjects();
  }

  function saveGrowth() {
    try { localStorage.setItem(growthKey, JSON.stringify(growth)); } catch(e) {}
  }

  function todayKey() {
    var date = new Date();
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function lessonId(key, index) { return key + ":" + index; }

  function courseTopics(key) {
    return key === "html" ? htmlSequence : key === "css" ? cssSequence : jsSequence;
  }

  function completedTopic(key, topic) {
    var index = courseTopics(key).indexOf(topic);
    return index >= 0 && growth.completed.indexOf(lessonId(key, index)) >= 0;
  }

  function skillProgress(skill) {
    var topics = courseTopics(skill.course).slice(skill.from, skill.to),
        done = topics.filter(function(topic) { return completedTopic(skill.course, topic); }).length,
        total = topics.length;
    return { done: done, total: total, percent: total ? Math.round(done * 100 / total) : 0, completed: total > 0 && done === total };
  }

  function completedSkills() {
    return skillCatalog.filter(function(skill) { return skillProgress(skill).completed; });
  }

  function nextSkillForCourse(key) {
    for (var i = 0; i < skillCatalog.length; i++) {
      if (skillCatalog[i].course === key && !skillProgress(skillCatalog[i]).completed) return skillCatalog[i];
    }
    return null;
  }

  var abilityCatalog = [
    { id: "output-panel", title: "بطاقة نتيجة", icon: "↗", project: "مساحة لعرض نتيجة التفاعل", tool: "معاينة JavaScript", challenge: "غيّر الرسالة ثم اعرضها في البطاقة.", requires: [["js", "JS Output"], ["js", "JS Syntax"]] },
    { id: "personal-page", title: "صفحة شخصية", icon: "▤", project: "قسم تعريفي في صفحتك", tool: "محرر بنية الصفحة", challenge: "أضف عنوانًا وفقرة يعرّفان بك.", requires: [["html", "HTML Basic"], ["html", "HTML Elements"]] },
    { id: "visual-style", title: "هوية بصرية", icon: "◈", project: "ألوان وتنسيق صفحتك", tool: "لوحة الألوان", challenge: "اختار لونًا أساسيًا وطبّقه على البطاقة.", requires: [["css", "CSS Colors"], ["css", "CSS Box Model"]] },
    { id: "signup-form", title: "نموذج تسجيل", icon: "▣", project: "نموذج تسجيل بسيط", tool: "مكوّن الحقول والتسميات", challenge: "أضف خانة اسم وخانة بريد إلى النموذج.", requires: [["html", "HTML Forms"], ["html", "HTML Input Types"], ["html", "HTML Input Attributes"]] },
    { id: "photo-gallery", title: "معرض صور", icon: "▧", project: "معرض مصغّر في صفحتك", tool: "منسّق المعرض", challenge: "رتّب صورتين بجانب بعضهما.", requires: [["html", "HTML Images"], ["css", "CSS Image Gallery"]] },
    { id: "calculator", title: "آلة حاسبة", icon: "＋", project: "أداة حساب تفاعلية", tool: "مجرّب العمليات", challenge: "احسب مجموع رقمين من اختيارك.", requires: [["js", "JS Arithmetic"], ["js", "JS HTML DOM"], ["js", "JS HTML Events"]] },
    { id: "todo-list", title: "قائمة مهام", icon: "☑", project: "قائمة مهام تفاعلية", tool: "مصفوفة المهام", challenge: "أضف مهمة واحدة ثم اعرضها في القائمة.", requires: [["js", "JS Arrays"], ["js", "JS Array Methods"], ["js", "JS HTML DOM"], ["js", "JS HTML Events"]] },
    { id: "notes-app", title: "تطبيق ملاحظات", icon: "▤", project: "مساحة ملاحظات محفوظة", tool: "مساحة تخزين محلية", challenge: "اكتب ملاحظة قصيرة واحفظها.", requires: [["js", "JS Objects"], ["js", "JS JSON"], ["js", "JS Web API"], ["js", "JS HTML DOM"]] }
  ];

  function abilityProgress(ability) {
    var done = ability.requires.filter(function(item) { return completedTopic(item[0], item[1]); }).length;
    return { done: done, total: ability.requires.length, percent: Math.round(done * 100 / ability.requires.length), unlocked: done === ability.requires.length };
  }

  function nextAbilityForCourse(key) {
    var order = key === "html" ? ["html", "css", "js"] : key === "css" ? ["css", "js", "html"] : ["js", "html", "css"];
    for (var i = 0; i < order.length; i++) {
      var match = abilityCatalog.filter(function(ability) {
        return !abilityProgress(ability).unlocked && ability.requires.some(function(requirement) { return requirement[0] === order[i]; });
      })[0];
      if (match) return match;
    }
    return null;
  }

  function currentTopicIndex(key) { return key === "html" ? s.htmlLesson || 0 : s[key + "Lesson"] || 0; }

  function currentGrowthKey() { return lessonId(course, currentTopicIndex(course)); }

  function topicPiece(key, index, objective, code) {
    var name = courseTopics(key)[index] || "خطوة جديدة",
        shortName = name.replace(/^(HTML|CSS|JS)\s*/, "");
    return {
      id: "lesson-" + lessonId(key, index),
      label: key === "html" ? "عنصر: " + shortName : key === "css" ? "تنسيق: " + shortName : "تفاعل: " + shortName,
      course: key,
      objective: objective || lessonObjective(key, name),
      code: typeof code === "string" ? code.slice(0, 1200) : ""
    };
  }

  function projectPartMarkup(part, interactive) {
    var objective = part.objective || (part.id.indexOf("ability-") === 0 ? "قدرة جديدة أصبحت متاحة داخل مشروعك." : "أضفت تطبيقًا عمليًا من هذا الدرس إلى مشروعي."),
        code = typeof part.code === "string" ? part.code : "",
        note = typeof part.note === "string" ? part.note.slice(0, 180) : "";
    return '<li class="project-artifact"><b>' + escapeHtml(part.label) + '</b><p>' + escapeHtml(objective) + '</p>' +
      (note ? '<blockquote class="project-artifact-note">' + escapeHtml(note) + '</blockquote>' : "") +
      (code ? '<details><summary>شوف الكود الذي جرّبته</summary><pre><code>' + escapeHtml(code) + '</code></pre></details>' : "") +
      (interactive && code && /^lesson-(html|css|js):\d+$/.test(part.id) ? '<button class="project-part-return" type="button" data-open-project-part="' + escapeHtml(part.id) + '">ارجع لهذا المثال في المحرر</button>' : "") + '</li>';
  }

  function projectPartListMarkup(interactive) {
    var split = Math.max(0, growth.projectParts.length - 12),
        older = growth.projectParts.slice(0, split),
        recent = growth.projectParts.slice(split);
    return recent.map(function(part) { return projectPartMarkup(part, interactive); }).join("") +
      (older.length ? '<li class="project-artifact-archive"><details><summary>شوف ' + ar(older.length) + ' لبنات أقدم</summary><ul class="project-artifact-older">' + older.map(function(part) { return projectPartMarkup(part, interactive); }).join("") + '</ul></details></li>' : "");
  }

  function latestProjectPartText(part) {
    var fallback = part.id.indexOf("ability-") === 0 ? "قدرة جديدة أصبحت متاحة داخل مشروعك." : "أضفت تطبيقًا عمليًا من هذا الدرس إلى مشروعي.";
    return String(part.note || part.objective || fallback).slice(0, 180);
  }

  function latestProjectPartMarkup() {
    var part = growth.projectParts[growth.projectParts.length - 1],
        preview = "";
    if (!part) return "";
    if (["html", "css", "js"].indexOf(part.course) >= 0 && part.code && typeof data !== "undefined" && data[part.course]) {
      preview = '<iframe class="latest-build-preview" title="معاينة ' + escapeHtml(part.label) + '" sandbox="allow-scripts allow-modals" srcdoc="' + escapeHtml(data[part.course].build(part.code)) + '"></iframe>';
    }
    return '<section class="latest-build"><small>آخر ما أضفت لمشروعي</small><b>' + escapeHtml(part.label) + '</b><p>' + escapeHtml(latestProjectPartText(part)) + '</p>' + preview + '</section>';
  }

  function renderLatestProjectPart() {
    var part = growth.projectParts[growth.projectParts.length - 1],
        frame = document.getElementById("profileLatestPreview"),
        hasCodePreview = part && ["html", "css", "js"].indexOf(part.course) >= 0 && part.code && typeof data !== "undefined" && data[part.course];
    document.getElementById("profileLatestBuild").hidden = !part;
    document.getElementById("profileLatestTitle").textContent = part ? part.label : "";
    document.getElementById("profileLatestCopy").textContent = part ? latestProjectPartText(part) : "";
    if (hasCodePreview) {
      frame.hidden = false;
      if (frame.dataset.previewId !== part.id || frame.dataset.previewCourse !== part.course || frame.dataset.previewCode !== part.code) {
        frame.srcdoc = data[part.course].build(part.code);
        frame.dataset.previewId = part.id;
        frame.dataset.previewCourse = part.course;
        frame.dataset.previewCode = part.code;
      }
      frame.title = "معاينة " + part.label;
    } else {
      frame.hidden = true;
      if (frame.dataset.previewId) {
        frame.srcdoc = "";
        frame.dataset.previewId = "";
        frame.dataset.previewCourse = "";
        frame.dataset.previewCode = "";
      }
    }
  }

  function addProjectPart(part) {
    if (growth.projectParts.some(function(existing) { return existing.id === part.id; })) return false;
    growth.projectParts.push(part);
    return true;
  }

  function syncUnlockedParts() {
    var changed = false;
    abilityCatalog.forEach(function(ability) {
      var status = abilityProgress(ability);
      if (status.unlocked && growth.unlocks.indexOf(ability.id) < 0) {
        growth.unlocks.push(ability.id);
        addProjectPart({ id: "ability-" + ability.id, label: "قدرة: " + ability.title });
        changed = true;
      }
    });
    return changed;
  }

  var awayDays = 0;

  function daysSince(dateKey) {
    if (!dateKey || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return 0;
    return Math.max(0, Math.floor((Date.parse(todayKey() + "T12:00:00") - Date.parse(dateKey + "T12:00:00")) / 86400000));
  }

  function lessonObjective(key, topic) {
    if (key === "html") {
      if (/Introduction/i.test(topic)) return "تنشئ أول مستند HTML وتعرض محتواه في المتصفح.";
      if (/Editors/i.test(topic)) return "تكتب الصفحة وتحفظها وتشغّلها من محرر مناسب.";
      if (/Basic/i.test(topic)) return "تبني مستندًا فيه معلومات الصفحة ومحتواها الظاهر.";
      if (/Elements/i.test(topic)) return "تكوّن عنصرًا من وسم ومحتوى وتضعه في الصفحة.";
      if (/Headings/i.test(topic)) return "تنظم عناوين الصفحة حسب أهمية كل قسم.";
      if (/Paragraphs/i.test(topic)) return "تقسم النص إلى فقرات مستقلة يسهل قراءتها.";
      if (/Formatting/i.test(topic)) return "توضح أهمية النص أو موضع التأكيد باستخدام الوسم المناسب.";
      if (/Quotations/i.test(topic)) return "تعرض اقتباسًا قصيرًا أو كتلة منقولة بمعناها الصحيح.";
      if (/Comments/i.test(topic)) return "تترك ملاحظة في ملف HTML لا تظهر للزائر.";
      if (/Input Types/i.test(topic)) return "تختار نوع الحقل المناسب للمعلومة التي سيدخلها المستخدم.";
      if (/Input Attributes|Form Attributes/i.test(topic)) return "تضبط سلوك الحقل مثل الإلزام والقيمة وطريقة الإرسال.";
      if (/Form Elements/i.test(topic)) return "تركّب حقولًا وتسميات وأزرارًا داخل نموذج مفهوم.";
      if (/Forms/i.test(topic)) return "تجمع بيانات من المستخدم داخل نموذج واضح.";
      if (/Images|Media|Video|Audio/i.test(topic)) return "تضيف وسائط إلى الصفحة مع وصف يساعد على فهمها.";
      if (/YouTube|Iframes/i.test(topic)) return "تضمّن محتوى من صفحة أخرى داخل إطار له عنوان واضح.";
      if (/Link|URL|Paths/i.test(topic)) return "تربط جزءًا من الصفحة بوجهة يقدر المستخدم يفتحها.";
      if (/Table|Lists/i.test(topic)) return "ترتب معلومات الصفحة في شكل يسهل مسحه وقراءته.";
      if (/Attributes|Classes|Id/i.test(topic)) return "تسمّي عنصرًا أو تعطيه معلومة يستخدمها المتصفح.";
      if (/Favicon/i.test(topic)) return "تضيف أيقونة صغيرة تظهر بجوار عنوان الصفحة في المتصفح.";
      if (/Page Title/i.test(topic)) return "تحدد الاسم الذي يظهر للصفحة في لسان المتصفح.";
      if (/Div/i.test(topic)) return "تجمع عناصر مرتبطة داخل قسم واحد يسهل تنسيقه لاحقًا.";
      if (/Buttons/i.test(topic)) return "تضيف زرًا واضحًا يمكن للمستخدم التفاعل معه.";
      if (/JavaScript/i.test(topic)) return "تربط ملف JavaScript بالصفحة لتضيف سلوكًا تفاعليًا.";
      if (/File Paths/i.test(topic)) return "تكتب مسار الملف حتى يجد المتصفح الصورة أو الصفحة المطلوبة.";
      if (/^HTML Head$/i.test(topic)) return "تضع معلومات الصفحة وروابط ملفاتها في الجزء غير الظاهر للزائر.";
      if (/Layout|Semantics/i.test(topic)) return "تقسم الصفحة إلى مناطق تصف وظيفة كل جزء ومكانه.";
      if (/Block.*Inline/i.test(topic)) return "تلاحظ هل العنصر يبدأ سطرًا جديدًا أم يبقى بجوار النص.";
      if (/Responsive/i.test(topic)) return "تجهز الصفحة لتعرض محتواها بوضوح على شاشات مختلفة.";
      if (/Computer Code/i.test(topic)) return "تعرض مقطعًا برمجيًا كنص واضح داخل الصفحة.";
      if (/Style Guide/i.test(topic)) return "تكتب HTML منسقًا ومتسقًا يسهل عليك مراجعته.";
      if (/Plug-ins/i.test(topic)) return "تحدد كيف يُضمّن محتوى إضافي داخل الصفحة ومتى تحتاج بديلًا أحدث.";
      if (/Entities|Symbols|Emojis/i.test(topic)) return "تعرض رمزًا أو علامة خاصة داخل الصفحة بطريقة صحيحة.";
      if (/Charset/i.test(topic)) return "تضبط ترميز المستند حتى تظهر العربية والرموز بشكل سليم.";
      if (/URL Encode/i.test(topic)) return "تحول محارف الرابط الخاصة إلى صيغة يفهمها المتصفح.";
      if (/XHTML/i.test(topic)) return "تكتب عناصر HTML بإغلاق وترتيب أكثر صرامة.";
      if (/Style|Colors|CSS/i.test(topic)) return "تضيف لمسة شكلية إلى عنصر موجود في صفحتك.";
      if (/Canvas|SVG/i.test(topic)) return "تضيف رسمًا أو شكلًا إلى صفحتك.";
      return "ترتب عنوانًا أو فقرة داخل صفحة شخصية بسيطة.";
    }
    if (key === "css") {
      if (/Selectors|Combinators|Pseudo|Attribute Selectors/i.test(topic)) return "تختار العناصر المقصودة بدقة قبل تطبيق التنسيق عليها.";
      if (/Syntax|Introduction|How To|Comments|Errors/i.test(topic)) return "تكتب قاعدة CSS صحيحة وتعرف أين تضعها وكيف تراجعها.";
      if (/Units|Math Functions|Functions|Variables|@property/i.test(topic)) return "تحدد قيمة قابلة لإعادة الاستخدام أو الحساب في تنسيق الصفحة.";
      if (/Box Model|Box Sizing|Padding|Margins|Borders|Outline|Height \/ Width/i.test(topic)) return "تضبط أبعاد العنصر والمساحات التي تحيط بمحتواه.";
      if (/Flex|Grid|Layout|Columns|Float|Inline-block/i.test(topic)) return "ترتب أجزاء الصفحة في صفوف أو أعمدة تناسب محتواها.";
      if (/Position|Z-index|Position Offsets|Align|Display|Overflow/i.test(topic)) return "تتحكم في مكان العنصر وطريقة ظهوره وتداخله مع غيره.";
      if (/Responsive|Media Queries|Max-width/i.test(topic)) return "تجعل التخطيط يتكيف مع عرض الشاشة الذي يشاهده الزائر.";
      if (/Accessibility/i.test(topic)) return "تحسن وضوح الواجهة وإمكانية استخدامها بطرق مختلفة.";
      if (/Optimization/i.test(topic)) return "تقلل التعقيد في قواعد CSS وتحافظ على مظهر الصفحة.";
      if (/Specificity|important|Inheritance/i.test(topic)) return "تتوقع أي قاعدة ستفوز عندما تتعارض تنسيقات متعددة.";
      if (/Forms/i.test(topic)) return "تنسق الحقول والأزرار لتسهيل إدخال البيانات.";
      if (/Counters/i.test(topic)) return "تضيف أرقامًا تلقائية للعناصر المرتبة في الصفحة.";
      if (/@supports/i.test(topic)) return "تطبق تنسيقًا فقط عندما يدعم المتصفح الخاصية المطلوبة.";
      if (/Text/i.test(topic)) return "تضبط محاذاة النص ومسافاته وطريقة ظهوره.";
      if (/Links/i.test(topic)) return "توضح شكل الرابط في حالاته المختلفة مثل المرور والتركيز.";
      if (/Lists/i.test(topic)) return "تغير شكل علامات القائمة والمسافة حول عناصرها.";
      if (/Tables/i.test(topic)) return "تنظم حدود الجدول ومساحاته حتى تُقرأ بياناته بوضوح.";
      if (/Navigation|Dropdown/i.test(topic)) return "تنشئ تنقلًا واضحًا وقائمة تظهر عند الحاجة.";
      if (/Image Gallery/i.test(topic)) return "ترتب الصور في معرض متناسق داخل الصفحة.";
      if (/Image|object-fit|Masking/i.test(topic)) return "تتحكم في قص الصورة وموضعها وطريقة ظهورها.";
      if (/Color|Background|Border|Shadow|Gradient|Opacity|Rounded|Transform|Transition|Animation|Text Effects|Fonts|Icons|Buttons|Tooltips|Pagination|User Interface/i.test(topic)) return "تضيف تأثيرًا بصريًا محددًا وتلاحظ أثره على العنصر.";
      return "تختار عنصرًا وتعدّل خاصية واحدة في مظهره.";
    }
    if (/Array|Map|Set|Collection|Typed Arrays/i.test(topic)) return "تجمع عدة قيم وتختار طريقة عملية للتعامل معها.";
    if (/Loop|Iteration|Iterator|Generator|Iterable/i.test(topic)) return "تكرر فعلًا على خطوات واضحة وتعرف متى يتوقف.";
    if (/Break/i.test(topic)) return "توقف الحلقة عند النقطة التي لم تعد تحتاج بعدها إلى التكرار.";
    if (/Continue/i.test(topic)) return "تتجاوز دورة واحدة وتكمل الحلقة مع العنصر التالي.";
    if (/Control Flow/i.test(topic)) return "تتبع الطريق الذي يسلكه الكود بين الشروط والحلقات.";
    if (/Condition|If|Switch|Ternary|Logical|Boolean|Comparison/i.test(topic)) return "تجعل الكود يختار التصرف المناسب حسب قيمة.";
    if (/Function|Parameter|Return|Callback|Invocation|Arguments/i.test(topic)) return "تعيد استخدام فعل صغير بمدخلات ونتيجة واضحة.";
    if (/Class|Constructor/i.test(topic)) return "تنشئ كائنات من قالب يجمع بياناتها وأفعالها.";
    if (/Object|Symbol|Proxy/i.test(topic)) return "تجمع بيانات مرتبطة وتصل إلى خصائصها أو تتحكم فيها.";
    if (/HTML DOM|DOM Navigation/i.test(topic)) return "تصل إلى عنصر في الصفحة وتقرأه أو تغيّره.";
    if (/HTML Events/i.test(topic)) return "تستجيب لفعل المستخدم مثل الضغط أو الكتابة.";
    if (/Fetch|AJAX|JSONP|Asynchronous|Async/i.test(topic)) return "تتعامل مع بيانات تصل لاحقًا وتعرضها بعد اكتمالها.";
    if (/JSON/i.test(topic)) return "تحول البيانات إلى JSON أو تعيد قراءتها كقيم JavaScript.";
    if (/Window API|Web API/i.test(topic)) return "تستخدم واجهة يوفرها المتصفح لإنجاز فعل داخل الصفحة.";
    if (/Graphics/i.test(topic)) return "ترسم شكلًا أو صورة على مساحة مخصصة داخل الصفحة.";
    if (/jQuery/i.test(topic)) return "تختصر اختيار عناصر الصفحة وتنفيذ تغييرات عليها باستخدام jQuery.";
    if (/Strings?/i.test(topic)) return "تبحث داخل نص أو تغيره ثم تستخدم النتيجة.";
    if (/Numbers?|BigInt|Arithmetic|Math/i.test(topic)) return "تنفذ عملية رقمية وتعرض نتيجتها أو تتحقق منها.";
    if (/Bitwise/i.test(topic)) return "تنفذ عملية على البتات وتقرأ القيمة الناتجة.";
    if (/Timers/i.test(topic)) return "تؤخر تنفيذ فعل أو تكرره بعد مدة محددة.";
    if (/Dates?|Temporal/i.test(topic)) return "تنشئ تاريخًا أو تقرأ جزءًا منه وتنسق النتيجة.";
    if (/RegExp/i.test(topic)) return "تبحث عن نص يطابق نمطًا محددًا.";
    if (/Output|Where To/i.test(topic)) return "تعرض قيمة أو رسالة في مكان تقدر تراجع نتيجته.";
    if (/Introduction|HTML First/i.test(topic)) return "تشغل JavaScript داخل صفحة وتشاهد أول نتيجة تفاعلية.";
    if (/Syntax|Statements|Comments/i.test(topic)) return "تكتب أوامر JavaScript بصياغة مرتبة يفهمها المتصفح.";
    if (/Variables?|Let|Const|Types|typeof|undefined|NaN|Primitive|Coercion|Conversion|Destructuring/i.test(topic)) return "تحفظ قيمة باسم ثم تختار طريقة قراءتها أو تحويلها.";
    if (/Operators?|Assignment/i.test(topic)) return "تجري عملية أو مقارنة بين قيم وتستخدم النتيجة.";
    if (/Errors|Debugging|Mistakes/i.test(topic)) return "تحدد سبب الخطأ وتتبع السطر الذي يحتاج إلى إصلاح.";
    if (/Style Guide|Best Practices|Performance|Optimization/i.test(topic)) return "تراجع الكود وتحسّن وضوحه أو طريقة تنفيذه.";
    if (/Modules/i.test(topic)) return "تقسم الكود إلى ملفات وتستخدم قيمة من ملف آخر.";
    if (/Versions/i.test(topic)) return "تتعرف على صياغة JavaScript المتاحة وتختار ما يناسب مشروعك.";
    if (/Projects/i.test(topic)) return "تجمع ما تعلمته في تجربة صغيرة تعمل من البداية للنهاية.";
    if (/Reference/i.test(topic)) return "تستخدم مرجع JavaScript للعثور على طريقة أو خاصية تحتاجها.";
    if (/Scope|Hoisting|Code Blocks|Strict Mode|this/i.test(topic)) return "تتوقع أين تكون القيمة متاحة ومتى يقرأها الكود.";
    return "تتبع قيمة في الكود وتلاحظ أين تظهر نتيجتها.";
  }

  function legacyGrowthLessonModel() {
    var key = course,
        index = currentTopicIndex(key),
        topic = courseTopics(key)[index] || course.toUpperCase(),
        spec = key === "html" ? htmlLessonDetail(index) : courseLessonSpec(),
        id = lessonId(key, index),
        code = typeof growth.baseCodes[id] === "string" ? growth.baseCodes[id] : (key === "html" ? (s.htmlCode || data.html.code) : (s[key + "Code"] || spec.code || data[key].code)),
        from = spec.from || "",
        to = spec.to || "",
        task = spec.task || "غيّر جزءًا واحدًا في المثال وشغّله لتلاحظ النتيجة.",
        practiceCode = code;
    if (key === "html" && !/<(?:h1|p)(?:\s|>)/i.test(code)) {
      code = data.html.code;
      practiceCode = code;
      growth.baseCodes[id] = code;
      saveGrowth();
    }
    if (typeof growth.baseCodes[id] !== "string") { growth.baseCodes[id] = code; saveGrowth(); }
    if (key === "html") {
      var heading = code.match(/(<h1(?:\s[^>]*)?>)([^<]*)(<\/h1>)/i);
      if (!heading) heading = code.match(/(<p(?:\s[^>]*)?>)([^<]*)(<\/p>)/i);
      if (heading) {
        from = heading[2];
        to = "أنا أتعلم " + topic.replace(/^HTML\s*/, "");
        task = "النص داخل الوسم جاهز. غيّر النص الظاهر فقط إلى: «" + to + "»، واترك الوسوم مكانها.";
      }
    }
    if (!from || !to || code.indexOf(from) < 0) {
      if (key === "css") {
        var color = code.match(/#[0-9a-f]{3,8}\b/i);
        if (color) { from = color[0]; to = "#a65d32"; }
        else { from = "12px"; to = "16px"; }
        task = "بدّل القيمة «" + from + "» إلى «" + to + "» فقط، وشغّل لتشاهد فرقًا بصريًا.";
      } else if (key === "js") {
        var quoted = code.match(/["'][^"'\r\n]{1,60}["']/);
        if (quoted) { from = quoted[0]; to = '"خطوة جديدة"'; }
        else { from = "2"; to = "3"; }
        task = "غيّر القيمة «" + from + "» إلى «" + to + "» ثم شغّل المثال.";
      }
    }
    if (from && code.indexOf(from) >= 0) practiceCode = code.slice(0, code.indexOf(from)) + to + code.slice(code.indexOf(from) + from.length);
    var fixedCode, brokenCode, bugQuestion, bugOptions, bugExample;
    if (key === "html") {
      fixedCode = growth.experimentCodes[id] || code;
      fixedCode += "\n<p>جزء جديد</p>";
      brokenCode = (growth.experimentCodes[id] || code) + "\n<p>جزء جديد</span>";
      bugExample = "<p>جزء جديد</span>";
      bugQuestion = "وسم البداية والإغلاق لا يحملان الاسم نفسه. أي ملاحظة تفسر المشكلة؟";
      bugOptions = ["اسم وسم الإغلاق يجب أن يطابق وسم البداية", "كل نص داخل HTML يجب أن يكون بين علامتَي اقتباس"];
    } else if (key === "css") {
      var repairBase = growth.experimentCodes[id] || code;
      fixedCode = repairBase + "\n.card { color: #a65d32; }";
      brokenCode = repairBase + "\n.card { colr: #a65d32; }";
      bugExample = ".card { colr: #a65d32; }";
      bugQuestion = "اللون الجديد لم يظهر. ما السبب الأقرب في السطر؟";
      bugOptions = ["اسم الخاصية مكتوب خطأ: colr", "قيمة اللون تحتاج وسم HTML حولها"];
    } else {
      fixedCode = growth.experimentCodes[id] || practiceCode;
      fixedCode += "\nconsole.log(\"وصلت هنا\");";
      brokenCode = (growth.experimentCodes[id] || practiceCode) + "\nconsole.log(\"وصلت هنا\";";
      bugExample = 'console.log("وصلت هنا";';
      bugQuestion = "علامة الإغلاق في هذا السطر لا تطابق علامة الفتح. أي ملاحظة تفسر الخطأ؟";
      bugOptions = ["القوس ) يجب أن يطابق القوس (", "قيمة النص يجب أن تكون رقمًا"];
    }
    return {
      id: id, key: key, index: index, topic: topic, spec: spec, code: code,
      objective: lessonObjective(key, topic), concept: key === "html" ? spec.note : spec.concept,
      trace: key === "html" ? spec.flow : spec.trace || spec.analogy,
      task: task, from: from, to: to, practiceCode: practiceCode,
      fixedCode: fixedCode, brokenCode: brokenCode, bugQuestion: bugQuestion,
      bugOptions: bugOptions, bugExample: bugExample, projectPiece: topicPiece(key, index, lessonObjective(key, topic), code)
    };
  }

  function buildGuidePracticeSteps(code, guide) {
    var current = code,
        steps = [];
    (guide && Array.isArray(guide.steps) ? guide.steps : []).forEach(function(step) {
      var from = String(step.from || ""),
          to = String(step.to || ""),
          at = from ? current.indexOf(from) : -1,
          after = at < 0 ? current : current.slice(0, at) + to + current.slice(at + from.length);
      steps.push({
        title: step.title || "خطوة تطبيق",
        explanation: step.explanation || "غيّر هذا الجزء ثم شغّل لتلاحظ أثره.",
        task: step.task || "نفّذ التعديل الظاهر في السطر ثم شغّل.",
        from: from, to: to, before: current, after: after,
        valid: at >= 0 && !!from && !!to && after !== current
      });
      current = after;
    });
    return steps;
  }

  var VOID_TAGS = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 };

  function normalizeArabic(text) {
    if (!text) return "";
    return String(text)
      .replace(/[\u200B-\u200F\u202A-\u202E\u061C\uFEFF]/g, "")
      .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
      .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627")
      .replace(/\u0629/g, "\u0647")
      .replace(/\u0649/g, "\u064A")
      .replace(/\u060C/g, ",")
      .replace(/\u061B/g, ";")
      .replace(/\u061F/g, "?")
      .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"')
      .replace(/[\u2018\u2019\u2039\u203A]/g, "'");
  }

  function normalizeCodeLine(line) {
    var s = normalizeArabic(String(line || ""));
    s = s.replace(/[\u2018\u2019`]/g, "'").replace(/[\u201C\u201D«»]/g, '"');
    s = s.replace(/'/g, '"');
    s = s.replace(/\s+/g, " ");
    s = s.replace(/\s*([<>={}:;,()[\]])\s*/g, "$1");
    s = s.replace(/(["'])\s+/g, "$1").replace(/\s+(["'])/g, "$1");
    return s.trim();
  }

  function codeLines(code) {
    return String(code || "").split("\n").map(normalizeCodeLine).filter(Boolean);
  }

  function normalizeDoc(code) {
    return String(code || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .split("\n")
      .map(normalizeCodeLine)
      .filter(Boolean)
      .join("\n");
  }

  function checkHtmlTags(html) {
    var clean = String(html || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<!doctype[^>]*>/gi, "");

    var tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?\/?>/g;
    var stack = [];
    var errors = [];
    var match;

    while ((match = tagRegex.exec(clean)) !== null) {
      var fullTag = match[0];
      var tagName = match[1].toLowerCase();
      var isClosing = fullTag.charAt(1) === "/";
      var isSelfClosing = fullTag.slice(-2) === "/>" || !!VOID_TAGS[tagName];

      if (isSelfClosing && !isClosing) continue;

      if (isClosing) {
        if (stack.length === 0) {
          errors.push({
            type: "unexpected_close",
            tag: tagName,
            message: "وسم إغلاق غير متوقع </" + tagName + ">."
          });
        } else {
          var top = stack.pop();
          if (top.tag !== tagName) {
            errors.push({
              type: "tag_mismatch",
              openTag: top.tag,
              closeTag: tagName,
              message: "اسم وسم الإغلاق </" + tagName + "> لا يطابق وسم البداية <" + top.tag + ">."
            });
          }
        }
      } else {
        stack.push({ tag: tagName });
      }
    }

    var unclosed = stack.filter(function(item) {
      return ["html", "head", "body"].indexOf(item.tag) < 0;
    });
    if (unclosed.length > 0) {
      errors.push({
        type: "unclosed_tags",
        tags: unclosed.map(function(u) { return u.tag; }),
        message: "وسوم لم يتم إغلاقها: " + unclosed.map(function(u) { return "<" + u.tag + ">"; }).join(", ") + "."
      });
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  function validateLessonAnswer(code, model, step) {
    var rawCode = String(code || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    if (!step) return { valid: true };

    if (step.build) {
      var missing = missingBuildLine(rawCode, step.build);
      if (missing) {
        return {
          valid: false,
          message: "لم تكتمل الخطوة بعد. ينقصك هذا السطر: " + missing
        };
      }
      if (model.key === "html") {
        var buildTagCheck = checkHtmlTags(rawCode);
        if (!buildTagCheck.valid) {
          return {
            valid: false,
            message: buildTagCheck.errors[0].message
          };
        }
      }
      return { valid: true };
    }

    if (step.type === "edit") {
      var rawAfter = String(step.after || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var rawBefore = String(step.before || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

      if (rawBefore && (rawCode.trim() === rawBefore.trim() || normalizeDoc(rawCode) === normalizeDoc(rawBefore))) {
        return {
          valid: false,
          message: "راجع التغيير المطلوب في بطاقة الخطوة. غيّره وحده ثم شغّل من جديد."
        };
      }

      if (rawCode.trim() === rawAfter.trim() || normalizeDoc(rawCode) === normalizeDoc(rawAfter)) {
        return { valid: true };
      }

      if (model.key === "html") {
        var editTagCheck = checkHtmlTags(rawCode);
        if (!editTagCheck.valid) {
          return {
            valid: false,
            message: editTagCheck.errors[0].message
          };
        }
      }

      if (step.to && normalizeCodeLine(rawCode).indexOf(normalizeCodeLine(step.to)) >= 0) {
        return { valid: true };
      }

      return {
        valid: false,
        message: "راجع التغيير المطلوب في بطاقة الخطوة. غيّره وحده ثم شغّل من جديد."
      };
    }

    if (step.type === "experiment") {
      var basePractice = model.practiceSteps && model.practiceSteps.length
        ? model.practiceSteps[model.practiceSteps.length - 1].after
        : model.code;
      basePractice = String(basePractice || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var modelCode = String(model.code || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var expCode = String(growth.experimentCodes && growth.experimentCodes[model.id] || basePractice).replace(/\r\n/g, "\n").replace(/\r/g, "\n");

      if (rawCode === expCode || rawCode === modelCode || rawCode.trim() === modelCode.trim()) {
        return {
          valid: false,
          message: "غيّر جزءًا آخر من اختيارك ثم شغّل لتشاهد أثر فكرتك."
        };
      }

      if (model.key === "html") {
        var expTagCheck = checkHtmlTags(rawCode);
        if (!expTagCheck.valid) {
          return {
            valid: false,
            message: expTagCheck.errors[0].message
          };
        }
      }

      return { valid: true };
    }

    if (step.type === "repair") {
      var rawFixed = String(model.fixedCode || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

      if (rawCode.trim() === rawFixed.trim() || normalizeDoc(rawCode) === normalizeDoc(rawFixed)) {
        return { valid: true };
      }

      if (model.key === "html") {
        if (/<p\b[^>]*>[^<]*<\/span>/i.test(rawCode)) {
          return {
            valid: false,
            message: "اسم وسم الإغلاق </span> لا يطابق وسم البداية <p>. اجعل وسم الإغلاق </p> ليطابق وسم البداية."
          };
        }

        var repairTagCheck = checkHtmlTags(rawCode);
        if (!repairTagCheck.valid) {
          return {
            valid: false,
            message: repairTagCheck.errors[0].message
          };
        }

        var hasMatchedP = /<p\b[^>]*>[\s\S]*?<\/p>/i.test(rawCode);
        var hasMatchedSpan = /<span\b[^>]*>[\s\S]*?<\/span>/i.test(rawCode);
        if (hasMatchedP || hasMatchedSpan) {
          return { valid: true };
        }

        return {
          valid: false,
          message: "راجع السطر الذي اكتشفت خطأه، ثم أصلحه وشغّل مرة أخرى."
        };
      }

      if (model.key === "css") {
        if (/color\s*:\s*#a65d32/i.test(rawCode) && !/colr\s*:/i.test(rawCode)) {
          return { valid: true };
        }
      }

      if (model.key === "js") {
        if ((/console\.log\(\s*["']وصلت هنا\s*["']\s*\)/.test(rawCode) || normalizeCodeLine(rawCode).indexOf('console.log("وصلت هنا")') >= 0) && (typeof validateJsSource !== "function" || validateJsSource(rawCode))) {
          return { valid: true };
        }
      }

      return {
        valid: false,
        message: "راجع السطر الذي اكتشفت خطأه، ثم أصلحه وشغّل مرة أخرى."
      };
    }

    return { valid: true };
  }

  // يحوّل المثال الكامل إلى مراحل تراكمية: كل مرحلة تضيف الجزء الذي يشرحه عنصر breakdown واحد.
  // العناصر البنيوية تضيف أسطرًا (وسوم الإغلاق تتبع وسوم الفتح)، وعناصر الخصائص
  // (src وalt وclass ...) تضيف الخاصية داخل السطر نفسه، فيبقى المستند صالحًا في كل مرحلة.
  function buildGuideStages(code, breakdown) {
    code = String(code || "");
    var list = Array.isArray(breakdown) ? breakdown : [];
    if (!code || list.length < 2) return [];
    var lines = code.split("\n"), starts = [], pos = 0;
    lines.forEach(function(line) { starts.push(pos); pos += line.length + 1; });
    function lineAt(at) {
      var found = 0;
      for (var k = 0; k < starts.length; k++) if (starts[k] <= at) found = k;
      return found;
    }
    function escapeRegExp(text) { return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
    function attributeSpans(name, value, from, all) {
      var pattern = new RegExp("\\s" + escapeRegExp(name) + (value === null ? "(?:=\"[^\"]*\")?" : "=\"" + (value === "" ? "[^\"]*" : escapeRegExp(value)) + "\"") + "(?=[\\s>\\/])", "g"),
          spans = [], m;
      pattern.lastIndex = from;
      while ((m = pattern.exec(code))) {
        spans.push({ start: m.index, end: m.index + m[0].length });
        if (!all) break;
      }
      return spans;
    }
    var cursor = 0, anchorLines = [], removals = [];
    list.forEach(function(item, index) {
      var text = String(item && item.code || "").trim(), at = -1, spans = [], tag, attr, words;
      attr = text.match(/^([A-Za-z-]+)="([^"]*)"$/);
      if (attr && attr[2] === "...") attr = [text, attr[1], ""];
      if (attr) {
        spans = attributeSpans(attr[1], attr[2], cursor, attr[2] !== "");
        if (!spans.length) spans = attributeSpans(attr[1], attr[2], 0, attr[2] !== "");
        if (spans.length) at = spans[0].start;
      } else if (/^[A-Za-z-]+(?:\s+(?:و|and)?\s*[A-Za-z-]+)+$/.test(text) && !/<|>/.test(text)) {
        words = text.match(/[A-Za-z-]+/g) || [];
        words.forEach(function(word) {
          var found = attributeSpans(word, "", cursor, false);
          if (!found.length) found = attributeSpans(word, null, cursor, false);
          if (found.length) { spans.push(found[0]); if (at < 0 || found[0].start < at) at = found[0].start; }
        });
      }
      if (at < 0 && text) at = code.indexOf(text, cursor);
      if (at < 0 && text) {
        tag = text.match(/<\/?([A-Za-z][A-Za-z0-9-]*)/);
        if (tag) at = code.indexOf("<" + tag[1], cursor);
      }
      if (at < 0 && text) at = code.indexOf(text);
      var line = at >= 0 ? lineAt(at) : (index ? anchorLines[index - 1] : 0);
      if (at >= 0) cursor = Math.max(cursor, at);
      anchorLines.push(index ? Math.max(line, anchorLines[index - 1]) : line);
      removals.push(spans);
    });

    var stack = [], openerOf = {};
    lines.forEach(function(line, j) {
      var re = /<(\/?)([A-Za-z][A-Za-z0-9-]*)[^>]*?(\/?)>/g, match,
          onlyClosers = /^\s*(<\/[A-Za-z][A-Za-z0-9-]*>\s*)+$/.test(line), firstPopped = -1;
      while ((match = re.exec(line))) {
        var name = match[2].toLowerCase();
        if (match[1]) {
          for (var k = stack.length - 1; k >= 0; k--) {
            if (stack[k].name === name) {
              if (firstPopped < 0) firstPopped = stack[k].line;
              stack.length = k;
              break;
            }
          }
        } else if (!VOID_TAGS[name] && !match[3]) stack.push({ name: name, line: j });
      }
      if (onlyClosers && firstPopped >= 0 && firstPopped < j) openerOf[j] = firstPopped;
    });

    function stageOfLine(j) {
      var anchor = -1, i;
      for (i = 0; i < anchorLines.length; i++) if (anchorLines[i] <= j) anchor = anchorLines[i];
      if (anchor < 0) return 0;
      for (i = 0; i < anchorLines.length; i++) if (anchorLines[i] === anchor) return i;
      return 0;
    }
    function lineText(j, index) {
      var text = lines[j], cuts = [];
      for (var i = index + 1; i < removals.length; i++) {
        removals[i].forEach(function(span) {
          if (span.start >= starts[j] && span.end <= starts[j] + lines[j].length) cuts.push({ start: span.start - starts[j], end: span.end - starts[j] });
        });
      }
      cuts.sort(function(x, y) { return y.start - x.start; });
      cuts.forEach(function(cut) { text = text.slice(0, cut.start) + text.slice(cut.end); });
      return text;
    }
    var stages = [], previousText = {}, scaffold = [];
    lines.forEach(function(line, j) {
      if (j < anchorLines[0] || (openerOf[j] !== undefined && openerOf[j] < anchorLines[0])) {
        previousText[j] = lineText(j, 0);
        scaffold.push(previousText[j]);
      }
    });
    list.forEach(function(item, index) {
      var kept = [], currentText = {};
      lines.forEach(function(line, j) {
        var stage = stageOfLine(j);
        if (stage <= index || (openerOf[j] !== undefined && stageOfLine(openerOf[j]) <= index)) {
          kept.push(j);
          currentText[j] = lineText(j, index);
        }
      });
      var added = kept.filter(function(j) { return previousText[j] !== currentText[j]; }).map(function(j) { return currentText[j]; });
      stages.push({
        index: index,
        code: kept.map(function(j) { return currentText[j]; }).join("\n"),
        added: added.join("\n"),
        previous: index ? stages[index - 1].code : scaffold.join("\n"),
        item: item
      });
      previousText = currentText;
    });
    if (stages[0].code === stages[stages.length - 1].code) return [];
    return stages;
  }

  // نقاط توقف صالحة داخل كود درس CSS/JS: كل مرحلة هي بداية الكود حتى نقطة توقف + أقواس الإغلاق الناقصة.
  function courseCodeCandidates(key, code) {
    code = String(code || "");
    var opens = [], matchOf = {}, i, ch, quote = "", comment = "", parens = 0, found = [];
    function scan(record) {
      opens = []; quote = ""; comment = ""; parens = 0;
      for (i = 0; i < code.length; i++) {
        ch = code.charAt(i);
        var next = code.charAt(i + 1);
        if (comment === "line") { if (ch === "\n") { comment = ""; if (record && !parens) record(i, "comment"); } continue; }
        if (comment === "block") { if (ch === "*" && next === "/") { comment = ""; i++; if (record && !parens) record(i + 1, "comment"); } continue; }
        if (quote) { if (ch === "\\") i++; else if (ch === quote) quote = ""; continue; }
        if (ch === "\"" || ch === "'" || ch === "`") { quote = ch; continue; }
        if (ch === "/" && next === "*") { comment = "block"; i++; continue; }
        if (ch === "/" && next === "/" && key === "js") { comment = "line"; i++; continue; }
        if (ch === "(") parens++;
        else if (ch === ")") parens = Math.max(0, parens - 1);
        else if (ch === "{") {
          opens.push(i);
          if (record && !parens) record(i + 1, "open");
        } else if (ch === "}") {
          var openAt = opens.pop();
          if (!record && openAt !== undefined) matchOf[openAt] = i;
          if (record && !parens) record(i + 1, "close");
        } else if (ch === ";" && !parens && (opens.length || key === "js")) {
          if (record) record(i + 1, "end");
        }
      }
    }
    scan(null);
    scan(function(end, kind) {
      var head = code.slice(0, end), stack = [], k, depthOpen = [];
      var quoteState = "", lineComment = false, blockComment = false, c1, c2;
      for (k = 0; k < end; k++) {
        c1 = code.charAt(k); c2 = code.charAt(k + 1);
        if (lineComment) { if (c1 === "\n") lineComment = false; continue; }
        if (blockComment) { if (c1 === "*" && c2 === "/") { blockComment = false; k++; } continue; }
        if (quoteState) { if (c1 === "\\") k++; else if (c1 === quoteState) quoteState = ""; continue; }
        if (c1 === "\"" || c1 === "'" || c1 === "`") { quoteState = c1; continue; }
        if (c1 === "/" && c2 === "*") { blockComment = true; k++; continue; }
        if (c1 === "/" && c2 === "/" && key === "js") { lineComment = true; k++; continue; }
        if (c1 === "{") depthOpen.push(k);
        else if (c1 === "}") depthOpen.pop();
      }
      if (kind === "open" && key === "js") {
        var before = code.slice(0, end - 1).replace(/\s+$/, "");
        if (!(/\)$/.test(before) || /=>$/.test(before) || /\b(?:else|try|finally|do)$/.test(before) || /\b(?:class|function)\b[^{;]*$/.test(before))) return;
      }
      var closers = "";
      for (k = depthOpen.length - 1; k >= 0; k--) {
        var closeAt = matchOf[depthOpen[k]];
        if (closeAt === undefined) return;
        var gap = code.slice(0, closeAt).match(/\s*$/)[0];
        closers += (gap.indexOf("\n") >= 0 || kind === "comment" ? gap : (gap || " ")) + "}";
      }
      var text = head.replace(/\s+$/, "") + closers;
      if (found.length && found[found.length - 1] === text) return;
      found.push(text);
    });
    if (!found.length || found[found.length - 1] !== code) {
      if (found.indexOf(code) >= 0) found.splice(found.indexOf(code), 1);
      found.push(code);
    }
    return found;
  }

  function courseStageCount(model) {
    return Array.isArray(model.details) ? Math.max(0, model.details.length - (model.quiz ? 1 : 0)) : 0;
  }

  // مراحل بناء درس CSS/JS: بقية المثال جاهزة في المحرر، ويكتب المتعلم جزء الدرس نفسه على دفعات.
  function buildCourseStages(key, spec, example, count, validate) {
    var lesson = String(spec && spec.code || ""), at = lesson ? example.lastIndexOf(lesson) : -1;
    if (at < 0 || count < 1) return [];
    var before = example.slice(0, at), after = example.slice(at + lesson.length),
        candidates = courseCodeCandidates(key, lesson).filter(function(text) {
          return !validate || validate(before + text + after);
        });
    if (!candidates.length || candidates[candidates.length - 1] !== lesson) candidates.push(lesson);
    var picked = [], total = candidates.length, k;
    for (k = 0; k < count; k++) {
      var idx = k < total ? Math.round((k + 1) * total / Math.min(count, total)) - 1 : total - 1;
      if (k >= total) idx = total - 1;
      picked.push(candidates[Math.max(0, Math.min(total - 1, idx))]);
    }
    var scaffold = (before + after).replace(/\n{3,}/g, "\n\n"), stages = [], previousCode = before + after;
    picked.forEach(function(text, index) {
      var current = before + text + after, counts = {};
      codeLines(previousCode).forEach(function(line) { counts[line] = (counts[line] || 0) + 1; });
      var added = current.split("\n").filter(function(line) {
        var norm = normalizeCodeLine(line);
        if (!norm) return false;
        if (counts[norm] > 0) { counts[norm]--; return false; }
        return true;
      }).join("\n"),
          prev = index ? stages[index - 1].code : previousCode;
      stages.push({ index: index, code: current, added: added, previous: prev, piece: text });
      previousCode = current;
    });
    return stages;
  }

  function describeCoursePiece(key, added) {
    var text = String(added || "").trim(), first = text.split("\n")[0].trim(), m;
    function code(value) { return "`" + value.replace(/`/g, "'") + "`"; }
    if (key === "css") {
      if ((m = text.match(/^([^{]+)\{\s*\}$/))) return {
        explain: "تبدأ القاعدة بمحدد يختار العناصر المطلوب تنسيقها، وبعده أقواس تحيط بالتعريفات.",
        benefit: "فائدة ما أنشأته: المحدد " + code(m[1].trim()) + " يحدد العناصر التي ستتأثر، والأقواس تجهّز مكان التعريفات."
      };
      if ((m = text.match(/([A-Za-z-]+)\s*:\s*([^;{}]+);/))) return {
        explain: "التعريف يكتب اسم الخاصية ثم نقطتين ثم القيمة، وتنتهي الجملة بفاصلة منقوطة.",
        benefit: "فائدة ما أنشأته: الخاصية " + code(m[1]) + " تحدد ما الذي يتغير، والقيمة " + code(m[2].trim()) + " تحدد الشكل الذي سيظهر في المعاينة."
      };
      if (/^\/\*/.test(text)) return { explain: "التعليق يشرح الكود للقارئ ولا يؤثر في الشكل.", benefit: "فائدة ما أنشأته: ملاحظة تشرح قصد القاعدة لمن يقرأ الملف لاحقًا دون أن تغيّر الشكل." };
      return { explain: "اكتب هذا الجزء كما هو ثم شغّل لترى أثره.", benefit: "فائدة ما أنشأته: أضفت جزءًا جديدًا إلى القاعدة وصار أثره ظاهرًا في المعاينة." };
    }
    if ((m = text.match(/(?:^|\n)\s*(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)/))) return { explain: "تعريف الدالة يجهّز اسمًا وجسمًا، لكنه لا ينفّذ الجسم حتى تستدعيها.", benefit: "فائدة ما أنشأته: دالة باسم " + code(m[1]) + " تجمع خطوات يمكن إعادة استخدامها متى استدعيتها." };
    if ((m = text.match(/(?:^|\n)\s*class\s+([A-Za-z_$][\w$]*)/))) return { explain: "الفئة وصف لشكل الكائنات وسلوكها.", benefit: "فائدة ما أنشأته: قالب باسم " + code(m[1]) + " تنشئ منه كائنات متشابهة." };
    if (/\}\s*else\b/.test(text)) return { explain: "الفرع البديل ينفَّذ حين لا يتحقق الشرط الأول.", benefit: "فائدة ما أنشأته: صار لبرنامجك مسار بديل، فلا يتوقف عند حالة واحدة." };
    if (/(?:^|\n)\s*if\s*\(/.test(text)) return { explain: "الشرط يختار الفرع الذي ينفَّذ بحسب نتيجة المقارنة.", benefit: "فائدة ما أنشأته: برنامجك صار يقرّر ماذا يفعل بحسب القيمة، لا يسير في طريق واحد." };
    if (/(?:^|\n)\s*(?:for|while)\s*\(/.test(text)) return { explain: "الحلقة تكرر الجسم ما دام شرطها صحيحًا.", benefit: "فائدة ما أنشأته: تكرار نفس الخطوات تلقائيًا دون كتابتها أكثر من مرة." };
    if (/^\/\//.test(first)) return { explain: "التعليق ملاحظة للمبرمج؛ المتصفح يتجاهله عند التنفيذ.", benefit: "فائدة ما أنشأته: ملاحظة تشرح سبب السطر التالي لمن يقرأ الكود، دون أن تغيّر النتيجة." };
    if ((m = first.match(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/))) return { explain: "التعريف يحفظ قيمة باسم لتستخدمها في سطر لاحق.", benefit: "فائدة ما أنشأته: خانة باسم " + code(m[1]) + " تحفظ القيمة لتعود إليها دون إعادة كتابتها." };
    if (/console\.log\s*\(/.test(first)) return { explain: "هذا السطر يرسل قيمة إلى مكان تراه فيه في المعاينة.", benefit: "فائدة ما أنشأته: أمر يعرض القيمة في المعاينة، فتتأكد مما يحدث داخل الكود." };
    if ((m = first.match(/^([A-Za-z_$][\w$.]*)\s*\(/))) return { explain: "الاستدعاء هو الذي ينفّذ الدالة فعلًا.", benefit: "فائدة ما أنشأته: استدعاء " + code(m[1] + "()") + " ينفّذ الفعل ويظهر أثره في المعاينة." };
    return { explain: "اكتب هذا الجزء كما هو ثم شغّل لترى أثره.", benefit: "فائدة ما أنشأته: أضفت خطوة جديدة إلى الكود وصار أثرها ظاهرًا في المعاينة." };
  }

  // أول سطر مطلوب في هذه المرحلة ولم يكتبه المتعلم بعد (بالترتيب نفسه)، أو "" إذا اكتملت.
  function missingBuildLine(code, stage) {
    var have = codeLines(code), at = 0,
        need = String(stage && stage.code || "").split("\n").map(function(line) {
          return { text: normalizeCodeLine(line), shown: line.trim() };
        }).filter(function(item) { return item.text; });
    for (var i = 0; i < need.length; i++) {
      var found = -1;
      for (var k = at; k < have.length; k++) if (have[k] === need[i].text) { found = k; break; }
      if (found < 0) return need[i].shown;
      at = found + 1;
    }
    return "";
  }


  function validateJsSource(source) {
    try { new Function(source); return true; } catch (error) { return false; }
  }

  function courseExampleCode(key, spec) {
    if (key === "css") {
      return [
        "/* تنسيق أساسي للبطاقة الظاهرة في المعاينة */",
        ".card {",
        "  padding: 1rem;",
        "  margin: 1rem 0;",
        "  border: 1px solid #dce5da;",
        "  border-radius: 12px;",
        "  background-color: #f7faf5;",
        "  max-width: 42rem;",
        "  font-size: 1rem;",
        "  line-height: 1.5;",
        "  box-shadow: none;",
        "  opacity: 1;",
        "}",
        "",
        "/* قاعدة الدرس: راقب أثرها على البطاقة */",
        String(spec.code || "")
      ].join("\n");
    }
    if (key === "js") {
      return 'console.log("قبل مثال الدرس");\n' + String(spec.code || "") + '\nconsole.log("انتهى الجزء المتزامن من المثال");';
    }
    return String(spec.code || "");
  }

  function coursePracticeAlternates(key, spec) {
    var topic = String(spec.topic || ""),
        value = String(spec.to || ""),
        code = String(spec.code || ""),
        values;
    if (Array.isArray(spec.practiceVariants) && spec.practiceVariants.length >= 2) return spec.practiceVariants.slice(0, 2);
    if (key === "css") {
      if (/Selectors|Combinators/i.test(topic) && /^(?:h1|p|a|span)$/.test(value)) return [value === "p" ? "a" : "p", value === "span" ? "h1" : "span"];
      if (/Attribute Selectors/i.test(topic)) return ["target", "href"];
      if (/Pseudo-elements/i.test(topic)) return ['"✓ "', '"• "'];
      if (/Colors|Background|Opacity/i.test(topic) || /^(?:#[0-9a-f]{3,8}|rgb|hsl|tomato|teal|rebeccapurple)/i.test(value)) return ["#35658f", "#a65d32"];
      if (/^left:\s*\d+px$/.test(value)) return [value.replace(/\d+px$/, "24px"), value.replace(/\d+px$/, "36px")];
      if (/\d(?:\.\d+)?px$/.test(value)) {
        var px = parseFloat(value);
        return [(px + 4) + "px", (px + 10) + "px"];
      }
      if (/\d(?:\.\d+)?rem$/.test(value)) {
        var rem = parseFloat(value);
        return [(rem + 0.2) + "rem", (rem + 0.5) + "rem"];
      }
      if (/\d(?:\.\d+)?s$/.test(value)) {
        var seconds = parseFloat(value);
        return [(seconds + 0.4) + "s", (seconds + 1) + "s"];
      }
      if (/\d(?:\.\d+)?deg$/.test(value)) {
        var degrees = parseFloat(value);
        return [(degrees + 10) + "deg", (degrees + 25) + "deg"];
      }
      if (/^repeat\(/.test(value)) return ["repeat(3, 1fr)", "repeat(1, 1fr)"];
      if (/fr/.test(value)) return ["2fr 1fr", "1fr 3fr"];
      if (value === "contain") return ["cover", "fill"];
      if (value === "cover") return ["contain", "fill"];
      if (/^(?:block|inline|flex|grid|none)$/.test(value)) return [value === "grid" ? "flex" : "grid", "block"];
      if (/^(?:row|column)$/.test(value)) return [value === "row" ? "column" : "row", value === "row" ? "row-reverse" : "column-reverse"];
      if (/^flex-start$/.test(value)) return ["center", "space-between"];
      if (/^(?:nowrap|wrap)$/.test(value)) return [value === "wrap" ? "nowrap" : "wrap", value === "wrap" ? "nowrap" : "wrap-reverse"];
      if (value === "center") return ["left", "right"];
      if (value === "right") return ["left", "center"];
      if (value === "left") return ["center", "right"];
      if (value === "justify") return ["center", "left"];
      if (/^(?:space-between|space-around)$/.test(value)) return ["center", "flex-start"];
      if (/^(?:underline|none|overline|line-through)$/.test(value)) return ["none", "underline"];
      if (/^(?:disc|square|circle|decimal)$/.test(value)) return value === "square" ? ["circle", "decimal"] : ["square", "circle"];
      if (value === "content-box") return ["border-box", "initial"];
      if (value === "border-box") return ["content-box", "initial"];
      if (/^(?:solid|dashed|dotted|double)$/.test(value)) return ["dashed", "dotted"];
      if (/^(?:focus|hover|active)$/.test(value)) return ["hover", "active"];
      if (/^#[0-9a-f]{3,8}$/i.test(value)) return ["#35658f", "#a65d32"];
      return [value + "  ", value];
    }

    if (/Set Logic/i.test(topic)) return ["completed.has(tool)", "!completed.has(tool)"];
    if (/Map Methods/i.test(topic)) return ['lesson.has("next")', 'lesson.delete("next")'];
    if (/^(?:JS Sets|JS WeakSet)$/.test(topic)) return ['tools.has("HTML")', 'tools.has("CSS")'];
    if (/^(?:JS Maps|JS WeakMap)$/.test(topic)) return ['[["next", "HTML"]]);\nconsole.log(lesson.get("next"))', '[["start", "JavaScript"]]);\nconsole.log(lesson.get("start"))'];
    if (/Reference/i.test(topic) && /Object\.entries\(ticket\)/.test(value)) return ["Object.values(ticket)", "Object.keys(ticket)"];
    if (/JS Projects/i.test(topic)) return ["count += 3", "count += 5"];
    if (/Parameters/i.test(topic) && !/Arguments/i.test(topic)) return ['"سلمى"', '"علي"'];
    if (/Arguments/i.test(topic)) return ['list("HTML", "CSS", "JavaScript")', 'list("HTML")'];
    if (/\/\w+\/i/.test(value)) return [value.replace(/\w+(?=\/i)/, "css"), value.replace(/\w+(?=\/i)/, "js")];
    if (/todos\/\d/.test(value)) return [value.replace(/\d+$/, "3"), value.replace(/\d+$/, "4")];
    if (/^\s*[+*/%\-]\s*$/.test(value)) return value.indexOf("-") >= 0 ? [" * ", " / "] : value.indexOf("+") >= 0 ? [" - ", " * "] : value.indexOf("*") >= 0 ? [" / ", " - "] : [" * ", " + "];
    if (/^(?:\|\||&&)$/.test(value)) return value === "||" ? ["&&", "||"] : ["||", "&&"];
    if (/^(?:\||&|\^)$/.test(value)) return value === "|" ? ["^", "&"] : value === "&" ? ["|", "^"] : ["&", "|"];
    if (/^(?:\+=|-=|\*=|\/=|%=)$/.test(value)) return value === "-=" ? ["+=", "*="] : ["-=", "*="];
    if (/^(?:<|>|===|!==|<=|>=)$/.test(value)) return value === "<" ? [">", "==="] : value === ">" ? ["<", "==="] : ["!==", "==="];
    if (/^Math\.(?:round|floor|ceil)$/.test(value)) return value === "Math.floor" ? ["Math.ceil", "Math.round"] : ["Math.floor", "Math.round"];
    if (/^get(?:FullYear|Month|Date)$/.test(value)) return value === "getMonth" ? ["getDate", "getFullYear"] : ["getMonth", "getDate"];
    if (/^a - b$/.test(value) || /^b - a$/.test(value)) return value === "b - a" ? ["a - b", "b - a"] : ["b - a", "a - b"];
    if (/^ticket\.(?:movie|seat)$/.test(value)) return value === "ticket.seat" ? ["ticket.movie", "ticket.seat"] : ["ticket.seat", "ticket.movie"];
    if (/^console\.log\(ticket\.(?:movie|show\(\))\)$/.test(value)) return value.indexOf("show") >= 0 ? ["console.log(ticket.movie)", "console.log(ticket.show())"] : ["console.log(ticket.show())", "console.log(ticket.movie)"];
    if (/^\[\d+\]$/.test(value)) return value === "[1]" ? ["[0]", "[1]"] : ["[1]", "[0]"];
    if (/^\[\"/.test(value)) return ['["CSS"]', '["JavaScript"]'];
    if (/^console\.log\(iterator/.test(value)) return ['console.log(iterator.next().value);\nconsole.log(iterator.next().done);', 'console.log(iterator.next().value);\nconsole.log(iterator.next().value);'];
    if (/^return target\[key\]$/.test(value)) return ['return target.name.toUpperCase()', 'return target[key]'];
    if (/^return \"زائر\"$/.test(value)) return ['return target[key]', 'return "ضيف"'];
    if (/^return \"/.test(value)) return ['return "اسم آخر"', 'return "زائر"'];
    if (/^totla$|^total$/.test(value) && /Errors|Mistakes/i.test(topic)) return ["total + 1", "total - 1"];
    if (/^show$/.test(value) && /Advanced Objects/i.test(topic)) return ["seat", "movie"];
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return [value.slice(0, 8) + "04", value.slice(0, 8) + "05"];
    if (/^(?:true|false)$/.test(value)) return [value === "true" ? "false" : "true", value];
    if (/^MAX_SAFE_INTEGER$/.test(value)) return ["MAX_VALUE", "MIN_VALUE"];
    if (/^MAX_VALUE$/.test(value)) return ["MIN_VALUE", "EPSILON"];
    if (/^parseFloat$/.test(value)) return ["parseInt", "Number"];
    if (/^toLowerCase$/.test(value)) return ["trim", "slice"];
    if (/^innerHeight$/.test(value)) return ["innerWidth", "screen.width"];
    if (/^Object\.entries\(ticket\)$/.test(value)) return ["Object.values(ticket)", "Object.keys(ticket)"];
    if (/^double\(\d+\)$/.test(value)) {
      var argument = +(value.match(/\d+/) || [0])[0];
      return ["double(" + (argument + 2) + ")", "double(" + (argument + 4) + ")"];
    }
    if (/^\"/.test(value) || /^'/.test(value) || /^`/.test(value)) {
      var quoteMark = value.charAt(0);
      return [quoteMark + "قيمة جديدة" + quoteMark, quoteMark + "نتيجة أخرى" + quoteMark];
    }
    values = { "Object.entries(ticket)": ["Object.values(ticket)", "Object.keys(ticket)"], "JSON.stringify(ticket)": ["Object.values(ticket)", "Object.keys(ticket)"] };
    var numericToken = value.match(/\d+(?:\.\d+)?/);
    if (numericToken) return [value.replace(numericToken[0], String(+numericToken[0] + 1)), value.replace(numericToken[0], String(+numericToken[0] + 2))];
    var from = String(spec.from || ""),
        fromAt = code.lastIndexOf(from),
        fromContext = fromAt >= 0 ? code.slice(Math.max(0, fromAt - 1), fromAt + from.length + 1) : "";
    if (/['"`]/.test(fromContext) && !/^['"`]/.test(from)) return ["قيمة جديدة", "نتيجة أخرى"];
    return values[value] || [];
  }

  function buildCoursePracticeSteps(key, spec, code) {
    var steps = [],
        from = String(spec.from || ""),
        to = String(spec.to || ""),
        topicAt = from ? code.lastIndexOf(from) : -1;
    if (topicAt < 0 || !to) return steps;
    var firstAfter = code.slice(0, topicAt) + to + code.slice(topicAt + from.length);
    steps.push({
      title: "ابدأ بتغيير من موضوع الدرس",
      explanation: spec.concept || "غيّر الجزء الذي يوضحه الدرس، واترك بقية المثال كما هو.",
      task: spec.task || "غيّر الجزء المحدد ثم شغّل المثال ولاحظ أثره.",
      from: from, to: to, before: code, after: firstAfter, valid: firstAfter !== code
    });

    var alternates = coursePracticeAlternates(key, spec),
        current = to,
        before = firstAfter,
        actionTitles = ["اختبر احتمالًا ثانيًا", "قارن نتيجة مختلفة"];
    alternates.slice(0, 2).forEach(function(nextValue, index) {
      if (!nextValue || nextValue === current) return;
      var at = before.lastIndexOf(current);
      if (at < 0) return;
      var after = before.slice(0, at) + nextValue + before.slice(at + current.length),
          subject = key === "css" ? "المحدد أو القيمة التي يستهدفها درس " + spec.topic : "المدخل الذي يغيّر نتيجة درس " + spec.topic;
      steps.push({
        title: actionTitles[index],
        explanation: key === "css" ? "نغيّر الجزء نفسه الذي يشرح الدرس، ونترك بقية القاعدة ثابتة حتى يظهر أثره وحده." : "نعدّل قيمة الفكرة نفسها ونبقي بقية خطوات التنفيذ كما هي؛ راقب كيف تنتقل القيمة إلى النتيجة.",
        task: "استبدل «" + current + "» بـ «" + nextValue + "»، شغّل، ثم راقب " + subject + ".",
        from: current, to: nextValue, before: before, after: after, valid: after !== before
      });
      current = nextValue;
      before = after;
    });
    return steps;
  }

  function coursePracticeStepFor(model) {
    var draft = typeof growth.drafts[model.id] === "string" ? growth.drafts[model.id] : model.code;
    for (var i = 0; i < model.practiceSteps.length; i++) {
      if (model.practiceSteps[i].before === draft) return model.practiceSteps[i];
    }
    return model.practiceSteps[0];
  }

  function courseReadingStep(model) {
    growth.readingSteps = growth.readingSteps || {};
    var count = Array.isArray(model.details) ? model.details.length : 0,
        saved = growth.readingSteps[model.id];
    if (!count) return 0;
    if (typeof saved !== "number") return growth.answers["quiz:" + model.id] ? count : 0;
    return Math.max(0, Math.min(count, Math.floor(saved)));
  }

  function growthLessonSteps(model) {
    var steps = [],
        details = model.key === "html" ? model.breakdown : model.details;
    var stages = Array.isArray(model.buildStages) ? model.buildStages : [];
    function add(step) {
      step.id = step.id || "step-" + steps.length;
      step.example = step.example || model.trace || model.code;
      step.task = step.task || "شغّل المثال، ثم لاحظ النتيجة المرتبطة بهذه الفكرة.";
      step.benefit = step.benefit || "";
      steps.push(step);
    }
    add({
      id: "idea", type: "observe", title: "الفكرة الأساسية",
      explanation: model.concept || model.objective,
      example: model.trace || model.code,
      task: stages.length
        ? "شغّل المثال الكامل أولًا لترى الهدف النهائي، ثم سنبنيه معًا قطعة قطعة بيدك."
        : "شغّل المثال الكامل في المحرر، ولاحظ أين تظهر الفكرة في النتيجة.",
      benefit: "فائدة ما شاهدته: " + (model.concept || model.objective || "فهمت الفكرة العامة قبل التفاصيل.")
    });
    (Array.isArray(details) ? details : []).forEach(function(detail, index) {
      var isLastQuiz = model.key !== "html" && model.quiz && index === details.length - 1,
          flow = detail.flow || detail.code || "",
          stageAny = !isLastQuiz && stages[index] ? stages[index] : null,
          stage = stageAny && stageAny.added ? stageAny : null,
          piece = stage && model.key !== "html" ? describeCoursePiece(model.key, stage.added) : null,
          explanation = piece ? piece.explain : detail.note || detail.meaning || "اقرأ هذا الجزء، ثم قارنه بالمثال الكامل.";
      add({
        id: "detail-" + index,
        type: isLastQuiz ? "quiz" : "observe",
        title: piece ? "ابنِ بيدك: " + stage.added.split("\n")[0].trim().slice(0, 48) : detail.title || (detail.code ? "ابنِ بيدك: " + detail.code : "لبنة من البناء"),
        explanation: explanation,
        example: stage ? stage.added : flow,
        task: isLastQuiz ? model.quiz.question : stage
          ? (stage.index === 0 && stage.previous ? (model.key === "html" ? "جهّزنا هيكل الصفحة في المحرر. " : "جهّزنا بقية المثال في المحرر. ") : "") + "اترك بصمتك في هذه الخطوة: ضع هذا الجزء بيدك في مكانه الصحيح داخل المحرر، ثم شغّل لتشاهد أثرك الحي."
          : stageAny ? "هذا الجزء موجود الآن في كودك. شغّل وتتبّع أثره وحده في النتيجة."
          : "شغّل وشاهد الفكرة الحية، وتتبع هذا الجزء وحده في النتيجة.",
        question: isLastQuiz ? model.quiz.question : "",
        options: isLastQuiz ? model.quiz.options : [],
        correct: isLastQuiz ? model.quiz.correct : 0,
        build: stage,
        stage: stageAny,
        benefit: detail.benefit || (piece ? piece.benefit : stage || detail.meaning ? "فائدة ما أنشأته للتو: " + explanation : "فائدة هذه التفصيلة: " + explanation)
      });
    });
    (Array.isArray(model.practiceSteps) ? model.practiceSteps : []).forEach(function(practice, index) {
      add({
        id: "edit-" + index, type: "edit", title: practice.title || "تعديل من موضوع الدرس",
        explanation: practice.explanation || "غيّر الجزء المحدد وحده، وشغّل لترى أثره.",
        example: "غيّر: " + practice.from + " ⟶ " + practice.to,
        task: practice.task ? "غيّر شيئًا واحدًا فقط: " + practice.task : "غيّر شيئًا واحدًا فقط: عدّل الجزء المحدد وشاهد كيف يتحول المظهر بلمستك.",
        benefit: "فائدة هذا التعديل: " + (practice.explanation || "غيّرت جزءًا واحدًا فرأيت أثره في النتيجة."),
        before: practice.before,
        after: practice.after,
        from: practice.from,
        to: practice.to
      });
    });
    add({
      id: "experiment", type: "experiment", title: "تجربتك أنت",
      explanation: "ثبتت التعديل الموجّه. اختَر تغييرًا صغيرًا من عندك حتى ترى أنك تتحكم في الفكرة.",
      example: model.trace,
      task: "أضف الجزء الذي يجعل الصفحة تخصك: لا نحتاج صفحة كاملة، نحتاج تعديلًا واحدًا بيدك لقيمة أو نص، ثم شغّل وقارن النتيجة.",
      benefit: "فائدة تجربتك: أثبتّ أنك تتحكم في الفكرة بنفسك وتغيّر النتيجة كما تريد."
    });
    add({
      id: "diagnose", type: "diagnose", title: "اكتشف سبب الخطأ",
      explanation: "أمامك سطر قريب من الصحيح. قارن علامة الفتح والإغلاق أو اسم الخاصية، واختر سبب المشكلة.",
      example: model.bugExample,
      task: model.bugQuestion,
      question: model.bugQuestion,
      options: model.bugOptions,
      correct: 0
    });
    add({
      id: "repair", type: "repair", title: "أصلح السطر وشغّله",
      explanation: "استخدم الملاحظة التي اكتشفتها، وعدّل السطر المقصود فقط.",
      example: model.bugExample,
      task: (model.key === "html" ? "طابق اسم وسم الإغلاق مع وسم البداية، ثم شغّل." : model.key === "css" ? "صحّح اسم الخاصية، ثم شغّل لتظهر اللمسة." : "أكمل علامة الإغلاق الناقصة، ثم شغّل المثال.") + " لا نحتاج صفحة كاملة، نحتاج تعديلًا دقيقًا واحدًا.",
      benefit: "فائدة الإصلاح: الخطأ الصغير قد يكسر النتيجة كلها، وتصحيحه يعيد الصفحة إلى سلوكها المتوقع."
    });
    add({
      id: "project", type: "project", title: "أضف الفكرة لمشروعك",
      explanation: "حوّل ما جربته إلى لبنة صغيرة في مشروعك الشخصي.",
      example: model.projectPiece.label,
      task: "أضف هذه اللبنة إلى مشروعك لحفظ نتيجة الدرس."
    });
    return steps;
  }

  function legacyFlowCursor(model, steps) {
    var stage = Math.max(0, Math.min(6, Math.floor(growth.stages[model.id] || 0))),
        find = function(id) {
          for (var i = 0; i < steps.length; i++) if (steps[i].id === id) return i;
          return -1;
        };
    if (growth.completed.indexOf(model.id) >= 0) return steps.length - 1;
    if (model.key === "html") {
      if (stage === 0) return 0;
      if (stage <= 2) return Math.max(0, find("edit-" + stage));
      if (stage === 3) return find("experiment");
      if (stage === 4) return find("diagnose");
      if (stage === 5) return find("repair");
      return find("project");
    }
    if (stage === 0) return 0;
    if (stage === 1) {
      if (growth.answers["quiz:" + model.id]) return Math.max(0, find("edit-0"));
      var reading = courseReadingStep(model),
          detailsIndex = Math.min(Math.max(0, reading), Math.max(0, model.details.length - 1));
      return Math.max(0, find("detail-" + detailsIndex));
    }
    if (stage === 2) {
      var draft = growth.drafts[model.id];
      for (var stepIndex = 0; stepIndex < model.practiceSteps.length; stepIndex++) {
        if (model.practiceSteps[stepIndex].before === draft) return Math.max(0, find("edit-" + stepIndex));
      }
      return Math.max(0, find("edit-0"));
    }
    if (stage === 3) return find("experiment");
    if (stage === 4) return find("diagnose");
    if (stage === 5) return find("repair");
    return find("project");
  }

  function growthLessonFlowState(model, steps) {
    growth.lessonFlow = growth.lessonFlow || {};
    var state = growth.lessonFlow[model.id],
        last = Math.max(0, steps.length - 1);
    if (!state || typeof state.current !== "number" || typeof state.unlocked !== "number") {
      var initial = legacyFlowCursor(model, steps);
      state = { current: initial, unlocked: initial };
      growth.lessonFlow[model.id] = state;
      saveGrowth();
    }
    state.unlocked = Math.max(0, Math.min(last, Math.floor(state.unlocked)));
    state.current = Math.max(0, Math.min(state.unlocked, last, Math.floor(state.current)));
    return state;
  }

  function completeCurrentFlowStep(model, steps) {
    var state = growthLessonFlowState(model, steps),
        next = Math.min(steps.length - 1, state.current + 1);
    if (state.current >= state.unlocked) state.unlocked = next;
    state.current = next;
    growth.lessonFlow[model.id] = state;
    saveGrowth();
  }

  function fullHtmlDocument(fragment, title) {
    if (/<html(?:\s|>)/i.test(fragment)) return fragment;
    return "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>" + escapeHtml(title || "صفحتي") + "</title>\n</head>\n<body>\n" + String(fragment || "") + "\n</body>\n</html>";
  }

  function isCompleteHtmlDocument(code) {
    code = String(code || "");
    return /<!doctype\s+html\s*>/i.test(code) && /<html(?:\s|>)/i.test(code) && /<head(?:\s|>)/i.test(code) && /<body(?:\s|>)/i.test(code);
  }

  function growthLessonModel() {
    var key = course,
        index = currentTopicIndex(key),
        topic = courseTopics(key)[index] || course.toUpperCase(),
        authoredGuide = key === "html" && window.LESSONS_DATA.guides && window.LESSONS_DATA.guides.html && window.LESSONS_DATA.guides.html[topic],
        spec = key === "html" ? htmlLessonDetail(index) : courseLessonSpec(),
        id = lessonId(key, index),
        savedBase = growth.baseCodes[id],
        code = authoredGuide ? authoredGuide.code : key === "html" ? fullHtmlDocument(data.html.code, topic) : courseExampleCode(key, spec),
        from = spec.from || "",
        to = spec.to || "",
        task = spec.task || "غيّر جزءًا واحدًا في المثال وشغّله لتلاحظ النتيجة.",
        practiceCode = code,
        guide = authoredGuide || null,
        practiceSteps;

    if (guide) {
      var existingDraft = growth.drafts[id],
          hasOldFragment = typeof existingDraft === "string" && !isCompleteHtmlDocument(existingDraft),
          isCompletedLesson = growth.completed.indexOf(id) >= 0,
          needsNewExample = !isCompletedLesson && savedBase !== guide.code,
          needsFullDocument = hasOldFragment && !(growth.lessonFlow && growth.lessonFlow[id]);
      if (needsNewExample || needsFullDocument) {
        if (typeof existingDraft === "string" && existingDraft !== guide.code) {
          growth.archivedDrafts = growth.archivedDrafts || {};
          growth.archivedDrafts[id] = existingDraft.slice(0, 30000);
        }
        growth.baseCodes[id] = guide.code;
        growth.drafts[id] = guide.code;
        if (!isCompletedLesson) {
          growth.stages[id] = 0;
          if (growth.lessonFlow) delete growth.lessonFlow[id];
          delete growth.experimentCodes[id];
          delete growth.repairStarted[id];
          delete growth.answers["bug:" + id];
        }
        saveGrowth();
      } else if (typeof growth.baseCodes[id] !== "string") {
        growth.baseCodes[id] = guide.code;
        saveGrowth();
      }
    } else if (key === "css" || key === "js") {
      var existingCourseDraft = growth.drafts[id],
          completedCourseLesson = growth.completed.indexOf(id) >= 0;
      if (savedBase !== code) {
        if (typeof existingCourseDraft === "string" && existingCourseDraft !== code) {
          growth.archivedDrafts = growth.archivedDrafts || {};
          growth.archivedDrafts[id] = existingCourseDraft.slice(0, 30000);
        }
        growth.baseCodes[id] = code;
        growth.drafts[id] = code;
        if (!completedCourseLesson) {
          growth.stages[id] = 0;
          if (growth.lessonFlow) delete growth.lessonFlow[id];
          delete growth.readingSteps[id];
          delete growth.experimentCodes[id];
          delete growth.repairStarted[id];
          delete growth.answers["bug:" + id];
          delete growth.answers["quiz:" + id];
        }
        saveGrowth();
      } else if (typeof existingCourseDraft !== "string") {
        growth.drafts[id] = code;
        saveGrowth();
      }
    }

    if (!guide && key === "html") {
      var fullCode = fullHtmlDocument(code, topic),
          draftWasString = typeof growth.drafts[id] === "string",
          fullDraft = draftWasString ? fullHtmlDocument(growth.drafts[id], topic) : fullCode;
      if (growth.baseCodes[id] !== fullCode || growth.drafts[id] !== fullDraft) {
        growth.baseCodes[id] = fullCode;
        growth.drafts[id] = fullDraft;
        saveGrowth();
      }
      code = fullCode;
    }
    if (!guide && (!from || !to || code.lastIndexOf(from) < 0)) {
      if (key === "css") {
        var color = code.match(/#[0-9a-f]{3,8}\b/i);
        if (color) { from = color[0]; to = "#a65d32"; }
        else { from = "12px"; to = "16px"; }
        task = "بدّل القيمة «" + from + "» إلى «" + to + "» فقط، وشغّل لتشاهد فرقًا بصريًا.";
      } else if (key === "js") {
        var quoted = code.match(/["'][^"'\r\n]{1,60}["']/);
        if (quoted) { from = quoted[0]; to = '"خطوة جديدة"'; }
        else { from = "2"; to = "3"; }
        task = "غيّر القيمة «" + from + "» إلى «" + to + "» ثم شغّل المثال.";
      }
    }
    if (!guide && from && code.lastIndexOf(from) >= 0) {
      var practiceAt = code.lastIndexOf(from);
      practiceCode = code.slice(0, practiceAt) + to + code.slice(practiceAt + from.length);
    }
    practiceSteps = guide ? buildGuidePracticeSteps(code, guide) : key === "css" || key === "js" ? buildCoursePracticeSteps(key, spec, code) : [];
    if (practiceSteps.length) practiceCode = practiceSteps[0].after;
    if (practiceSteps.length && practiceSteps.some(function(step) { return !step.valid; })) {
      console.error("Invalid guided practice sequence for " + id);
      practiceSteps = [];
    }

    var repairBase = growth.experimentCodes[id] || (practiceSteps.length ? practiceSteps[practiceSteps.length - 1].after : (key === "html" ? code : practiceCode)),
        fixedCode, brokenCode, bugQuestion, bugOptions, bugExample;
    if (key === "html") {
      fixedCode = repairBase + "\n<p>جزء جديد</p>";
      brokenCode = repairBase + "\n<p>جزء جديد</span>";
      bugExample = "<p>جزء جديد</span>";
      bugQuestion = "وسم البداية والإغلاق لا يحملان الاسم نفسه. أي ملاحظة تفسر المشكلة؟";
      bugOptions = ["اسم وسم الإغلاق يجب أن يطابق وسم البداية", "كل نص داخل HTML يجب أن يكون بين علامتَي اقتباس"];
    } else if (key === "css") {
      fixedCode = repairBase + "\n.card { color: #a65d32; }";
      brokenCode = repairBase + "\n.card { colr: #a65d32; }";
      bugExample = ".card { colr: #a65d32; }";
      bugQuestion = "اللون الجديد لم يظهر. ما السبب الأقرب في السطر؟";
      bugOptions = ["اسم الخاصية مكتوب خطأ: colr", "قيمة اللون تحتاج وسم HTML حولها"];
    } else {
      fixedCode = repairBase + "\nconsole.log(\"وصلت هنا\");";
      brokenCode = repairBase + "\nconsole.log(\"وصلت هنا\";";
      bugExample = 'console.log("وصلت هنا";';
      bugQuestion = "علامة الإغلاق في هذا السطر لا تطابق علامة الفتح. أي ملاحظة تفسر المشكلة؟";
      bugOptions = ["القوس ) يجب أن يطابق القوس (", "قيمة النص يجب أن تكون رقمًا"];
    }
    return {
      id: id, key: key, index: index, topic: topic, spec: spec, guide: guide, code: code,
      objective: lessonObjective(key, topic), concept: guide ? guide.concept : key === "html" ? spec.note : spec.concept,
      trace: guide ? guide.flow : key === "html" ? spec.flow : spec.trace || spec.analogy,
      reference: guide && guide.reference || courseW3Reference(key, topic),
      details: !guide && Array.isArray(spec.details) ? spec.details : [],
      quiz: !guide && key !== "html" ? { question: spec.quiz, options: spec.options, correct: spec.correct } : null,
      breakdown: guide && Array.isArray(guide.breakdown) ? guide.breakdown : [],
      buildStages: guide && key === "html" ? buildGuideStages(code, guide.breakdown)
        : !guide && (key === "css" || key === "js") ? buildCourseStages(key, spec, code, courseStageCount({ details: spec.details, quiz: true }), key === "js" ? validateJsSource : null) : [],
      practiceSteps: practiceSteps, task: task, from: from, to: to, practiceCode: practiceCode,
      fixedCode: fixedCode, brokenCode: brokenCode, bugQuestion: bugQuestion,
      bugOptions: bugOptions, bugExample: bugExample, projectPiece: topicPiece(key, index, lessonObjective(key, topic), code)
    };
  }

  function growthDraftFor(model) {
    if (typeof growth.drafts[model.id] !== "string") {
      growth.drafts[model.id] = model.code;
      saveGrowth();
    }
    return growth.drafts[model.id];
  }

  function growthLessonDone(id) { return growth.completed.indexOf(id) >= 0; }

  function courseW3Reference(key, topic) {
    var pages = window.LESSONS_DATA.references && window.LESSONS_DATA.references[key];
    return pages && pages[topic] ? pages[topic] : "";
  }

  function courseDetailsMarkup(details) {
    if (!Array.isArray(details)) return "";
    return details.map(function(item) {
      return '<section class="lesson-breakdown"><h5>' + escapeHtml(item.title || "تفصيلة من المثال") + '</h5><div><bdi dir="auto">' + lessonMixedMarkup(item.flow || "") + '</bdi></div><p>' + lessonMixedMarkup(item.note || "") + '</p></section>';
    }).join("");
  }

  function legacyRenderGrowthLesson() {
    var model = growthLessonModel(),
        stage = Math.max(0, Math.min(6, Math.floor(growth.stages[model.id] || 0))),
        completed = growthLessonDone(model.id),
        names = ["الفكرة", "مثال حي", "تعديل المثال", "تجربة شخصية", "اكتشاف خطأ", "إصلاحه", "ربطه بمشروعي"],
        titles = ["الفكرة في سطر", "شوف الفكرة في المثال", "غيّر حاجة واحدة", "جرّب لمستك أنت", "خطأ مقصود: اكتشف السبب", "أصلح الخطأ وشغّل", "أضف اللبنة إلى مشروعك"],
        copies = [
          model.objective,
          "المثال ظاهر في المحرر والمعاينة. تتبّع السطر الذي يحقق الهدف، وبعدها نجرّب تعديلًا واحدًا.",
          model.task,
          "التعديل الأول اشتغل. غيّر قيمة أو نصًا آخر من اختيارك؛ مش مطلوب إجابة محفوظة.",
          model.bugQuestion,
          model.key === "html" ? "طابق اسم وسم الإغلاق مع وسم البداية، ثم شغّل الصفحة." : model.key === "css" ? "صحّح اسم الخاصية في السطر المقصود، ثم شغّل لتظهر اللمسة." : "أكمل القوس الناقص في السطر، ثم شغّل المثال.",
          "هذه الخطوة تحولت إلى جزء مرئي في بطاقتك. اضغط الزر لإضافتها إلى مشروعك الدائم."
        ],
        count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext"),
        code = document.getElementById("code"),
        answerKey = "bug:" + model.id,
        quizKey = "quiz:" + model.id,
        currentPractice = model.key === "css" || model.key === "js" ? coursePracticeStepFor(model) : null;
    document.body.classList.toggle("is-html", model.key === "html");
    document.body.classList.toggle("is-course-guide", model.key === "css" || model.key === "js");
    document.body.classList.add("has-roadmap", "growth-experience");
    document.getElementById("complete").hidden = true;
    document.getElementById("title").textContent = model.topic;
    document.getElementById("sub").textContent = model.objective;
    document.getElementById("lessonObjective").hidden = true;
    document.getElementById("level").textContent = (model.key === "html" ? "HTML" : model.key === "css" ? "CSS" : "JavaScript") + " · " + ar(model.index + 1) + " من " + ar(courseTopics(model.key).length);
    document.getElementById("filename").textContent = data[model.key].file;
    document.getElementById("guideTrackLabel").textContent = "هدف واحد · تجربة قصيرة";
    count.textContent = completed ? "اللبنة اتضافت لمشروعك ✓" : "خطوة " + ar(stage + 1) + " من ٧ · " + names[stage];
    count.setAttribute("aria-label", completed ? "اكتمل الدرس" : names[stage]);
    meter.style.width = (completed ? 100 : stage * 100 / 6) + "%";
    var dots = document.querySelectorAll("#lessonDots .growth-node");
    Array.prototype.forEach.call(dots, function(dot, i) {
      dot.classList.toggle("done", completed || i < stage);
      dot.classList.toggle("now", !completed && i === stage);
    });
    document.getElementById("lessonDots").setAttribute("aria-valuenow", completed ? "7" : String(stage + 1));
    document.getElementById("lessonPhaseName").textContent = completed ? "مكتمل" : names[stage];
    document.getElementById("lessonObjective").textContent = "هدفك: " + model.objective;
    actions.innerHTML = "";
    document.getElementById("prompt").textContent = stage === 2 || stage === 3 || stage === 5 ? copies[stage] : model.objective;
    document.querySelector(".prompt").hidden = true;
    if (stage === 5 && !growth.repairStarted[model.id]) {
      growth.repairStarted[model.id] = true;
      growth.drafts[model.id] = model.brokenCode;
      saveGrowth();
    }
    code.value = growthDraftFor(model);
    code.readOnly = !completed && stage === 6;
    if (code.readOnly) document.getElementById("hint").textContent = "راجعت الإصلاح. أضف اللبنة لمشروعك؛ بعدها تقدر ترجع للمثال وتعدّله.";
    if (stage === 0) {
      copy.textContent = model.concept || model.objective;
      visual.innerHTML = '<div class="basic-structure"><b>' + lessonMixedMarkup(model.trace) + '</b></div><div class="basic-hint">سطر واحد يوضح الفكرة، وبعده مثال جاهز للتجربة.</div>';
    } else if (stage === 1) {
      copy.textContent = copies[1];
      if (model.key !== "html" && model.details.length) {
        var readIndex = courseReadingStep(model),
            readDetail = model.details[Math.min(readIndex, model.details.length - 1)];
        count.textContent = "خطوة " + ar(stage + 1) + " من ٧ · تفصيلة " + ar(Math.min(readIndex + 1, model.details.length)) + " من " + ar(model.details.length);
        visual.innerHTML = '<div class="basic-structure"><b>' + lessonMixedMarkup(model.trace) + '</b></div>' + courseDetailsMarkup([readDetail]) + '<div class="basic-hint">اقرأ هذه النقطة وحدها، ثم افتح التالية. المثال الكامل موجود في المحرر.</div>';
        if (readIndex < model.details.length - 1) {
          actions.innerHTML = '<button type="button" data-course-reading-next>فهمت النقطة — التالية ←</button>';
          actions.querySelector("[data-course-reading-next]").onclick = function() {
            growth.readingSteps = growth.readingSteps || {};
            growth.readingSteps[model.id] = readIndex + 1;
            saveGrowth();
            renderGrowthLesson();
          };
        } else if (model.quiz) {
          actions.innerHTML = '<div class="course-lesson-question">' + lessonMixedMarkup(model.quiz.question) + '</div><div class="course-lesson-answers">' + model.quiz.options.map(function(option, i) {
            return '<button type="button" data-course-quiz-answer="' + i + '">' + escapeHtml(option) + '</button>';
          }).join("") + '</div><p class="course-quiz-feedback" aria-live="polite">' + (growth.answers[quizKey] ? "إجابتك صحيحة؛ شوف المثال في المحرر وكمّل للتطبيق." : "جاوب على السؤال اعتمادًا على التفصيلة الأخيرة.") + '</p>';
          actions.querySelectorAll("[data-course-quiz-answer]").forEach(function(button) {
            button.onclick = function() {
              if (+button.dataset.courseQuizAnswer !== model.quiz.correct) {
                actions.querySelector(".course-quiz-feedback").textContent = "راجع النقطة الأخيرة وقارنها بالسطر في المحرر، ثم جرّب اختيارًا آخر.";
                return;
              }
              growth.answers[quizKey] = true;
              saveGrowth();
              renderGrowthLesson();
              celebrateGrowth("ربطت الفكرة بالمثال. الآن جرّب تغييرًا واحدًا.", "#lesson");
            };
          });
        }
      } else {
        visual.innerHTML = '<div class="basic-structure"><b>' + lessonMixedMarkup(model.trace) + '</b></div>' + courseDetailsMarkup(model.details) + '<div class="basic-hint">المثال الكامل موجود في المحرر. اقرأ التفصيلة، وجرّب توقعك في السؤال قبل التعديل.</div>';
      }
      if (model.quiz && (model.key === "html" || !model.details.length)) {
        actions.innerHTML = '<div class="course-lesson-question">' + lessonMixedMarkup(model.quiz.question) + '</div><div class="course-lesson-answers">' + model.quiz.options.map(function(option, i) {
          return '<button type="button" data-course-quiz-answer="' + i + '">' + escapeHtml(option) + '</button>';
        }).join("") + '</div><p class="course-quiz-feedback" aria-live="polite">' + (growth.answers[quizKey] ? "إجابتك صحيحة؛ شوف المثال في المحرر وكمّل للتطبيق." : "اختار الإجابة الأقرب من المثال.") + '</p>';
        actions.querySelectorAll("[data-course-quiz-answer]").forEach(function(button) {
          button.onclick = function() {
            if (+button.dataset.courseQuizAnswer !== model.quiz.correct) {
              actions.querySelector(".course-quiz-feedback").textContent = "راجع التفصيلة المكتوبة فوق وقارنها بالسطر في المحرر، ثم جرّب اختيارًا آخر.";
              return;
            }
            growth.answers[quizKey] = true;
            saveGrowth();
            renderGrowthLesson();
            celebrateGrowth("ربطت الفكرة بالمثال. الآن جرّب تغييرًا واحدًا.", "#lesson");
          };
        });
      }
    } else if (stage === 2) {
      var shownStep = currentPractice || { explanation: "غيّر الجزء المحدد في المثال.", task: model.task, from: model.from, to: model.to },
          practiceIndex = model.practiceSteps.indexOf(shownStep),
          practiceCount = model.practiceSteps.length || 1;
      copy.textContent = shownStep.explanation + "\nالمطلوب الآن: " + shownStep.task;
      visual.innerHTML = '<div class="basic-structure"><span class="comment">التعديل ' + ar(practiceIndex + 1) + ' من ' + ar(practiceCount) + ' · قبل:</span><br><bdi dir="ltr">' + escapeHtml(shownStep.from) + '</bdi><br><span class="comment">بعد:</span><br><bdi dir="ltr">' + escapeHtml(shownStep.to) + '</bdi></div><div class="basic-hint">نفّذ التعديل الحالي وشغّل. كل تشغيل صحيح يحفظه ويفتح التعديل التالي.</div>';
    } else if (stage === 3) {
      copy.textContent = copies[3];
      visual.innerHTML = '<div class="basic-structure">أنت تختار القيمة ⟶ تشغّل ⟶ تلاحظ الفرق</div><div class="basic-hint">تجربة واحدة مختلفة تكفي؛ تقدر ترجع للمثال لو حبيت.</div>';
    } else if (stage === 4) {
      copy.textContent = model.bugQuestion;
      visual.innerHTML = '<div class="basic-structure"><span class="comment">سطر فيه خطأ متعمّد:</span><br><bdi dir="ltr">' + escapeHtml(model.bugExample) + '</bdi></div><div class="basic-hint">اختار الملاحظة الأقرب. لو ما كانتش هي، جرّب اختيارًا تانيًا.</div>';
      actions.innerHTML = model.bugOptions.map(function(option, i) { return '<button type="button" data-growth-answer="' + i + '">' + escapeHtml(option) + '</button>'; }).join("") + '<p class="guide-feedback" aria-live="polite"></p>';
      actions.querySelectorAll("[data-growth-answer]").forEach(function(button) {
        button.onclick = function() {
          if (+button.dataset.growthAnswer !== 0) {
            actions.querySelector(".guide-feedback").textContent = "مش لازم تصيبها من أول مرة. راجع اختلاف الاسمين أو الكتابة وجرّب تاني.";
            return;
          }
          growth.stages[model.id] = 5;
          growth.answers[answerKey] = true;
          growth.repairStarted[model.id] = false;
          growth.drafts[model.id] = model.brokenCode;
          saveGrowth(); renderGrowthLesson(); celebrateGrowth("اكتشفت الخطأ. الخطوة التالية إصلاحه.", "#lesson");
        };
      });
    } else if (stage === 5) {
      copy.textContent = copies[5];
      visual.innerHTML = '<div class="basic-structure"><span class="comment">السطر المقصود:</span><br><bdi dir="ltr">' + escapeHtml(model.bugExample) + '</bdi><br><span class="comment">أصلحه ثم شغّل المثال.</span></div>';
    } else {
      var wasAdded = completed;
      copy.textContent = wasAdded ? "الخطوة اتحولت لجزء محفوظ في مشروعك. تقدر تشوفه في المعاينة أو تكمل وقت ما تحب." : copies[6];
      visual.innerHTML = '<div class="guide-finish"><b>' + (wasAdded ? "✓ " + escapeHtml(model.projectPiece.label) + " اتضافت" : "لبنة مشروعك التالية") + '</b><span>مشروعك الحالي: ' + escapeHtml(profileCard.name || "بطاقتك الشخصية") + '</span></div>';
      if (!wasAdded) {
        actions.innerHTML = '<button class="growth-add-part" type="button">أضف اللبنة لمشروعي</button>';
        actions.querySelector(".growth-add-part").onclick = function() { completeGrowthLesson(model); };
      }
    }
    if (completed) {
      next.textContent = model.index + 1 < courseTopics(model.key).length ? "لننتقل إلى الخطوة التالية ←" : "اختر موضوعًا آخر متى شئت ←";
      next.disabled = false;
    } else if (stage === 0 || stage === 1) {
      var readIndexNow = stage === 1 && model.key !== "html" ? courseReadingStep(model) : 0,
          hasReadingSteps = stage === 1 && model.key !== "html" && model.details.length > 0,
          readingFinished = !hasReadingSteps || readIndexNow >= model.details.length - 1;
      next.textContent = stage === 0 ? "شوف المثال الحي ←" : !readingFinished ? "افتح التفصيلة التالية أولًا" : model.quiz && !growth.answers[quizKey] ? "أجب عن سؤال المثال أولًا" : "جرّب تعديلًا صغيرًا ←";
      next.disabled = stage === 1 && (!readingFinished || !!model.quiz && !growth.answers[quizKey]);
    } else if (stage === 2 || stage === 3 || stage === 5) {
      next.textContent = stage === 2 ? "نفّذ التعديل " + ar(model.key === "html" ? 1 : model.practiceSteps.indexOf(currentPractice) + 1) + " في المحرر ←" : stage === 3 ? "غيّر قيمة أخرى وشغّل ←" : "أصلح السطر في المحرر ←";
      next.disabled = false;
    } else if (stage === 4) {
      next.textContent = "اكتشف الخطأ أولًا";
      next.disabled = true;
    } else {
      next.textContent = "أضف اللبنة إلى المشروع أولًا";
      next.disabled = true;
    }
    renderGrowthDashboard();
  }

  function lessonMixedMarkup(value) {
    if (!value) return "";
    var normalized = String(value).replace(/<br\s*\/?>/gi, "\n");
    var codePattern = /(`[^`]+`|https?:\/\/[^\s]+|<!DOCTYPE[^>]*>|<\/?[A-Za-z][^>]*>|\/\*[\s\S]*?\*\/|(?:\.[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)[^{}\n]*\{[^}\n]*\}|[a-zA-Z-]+\s*:\s*[^;\n]+;)/gi;
    var parts = normalized.split(codePattern);
    var out = parts.map(function(part) {
      if (!part) return "";
      if (/^`[^`]+`$/.test(part)) {
        return '<code dir="ltr" class="inline-code">' + escapeHtml(part.slice(1, -1)) + '</code>';
      }
      if (/^https?:\/\//i.test(part)) {
        return '<bdi dir="ltr">' + escapeHtml(part) + '</bdi>';
      }
      if (/^<!DOCTYPE/i.test(part) || /^<\/?[A-Za-z]/i.test(part)) {
        return '<bdi dir="ltr">' + escapeHtml(part) + '</bdi>';
      }
      if (/^\/\*[\s\S]*?\*\/$/.test(part) || /\{[^}\n]*\}/.test(part) || /^[a-zA-Z-]+\s*:/.test(part)) {
        return '<code dir="ltr" class="inline-code">' + escapeHtml(part) + '</code>';
      }
      var escaped = escapeHtml(part);
      return escaped.replace(/\b[A-Za-z][A-Za-z0-9]*(?:[-_.+#][A-Za-z0-9]+)*/g, '<bdi dir="ltr">$&</bdi>');
    }).join("");
    return out.replace(/\r?\n/g, "<br>");
  }

  function setLessonCopy(element, value) {
    element.setAttribute("dir", "rtl");
    element.innerHTML = lessonMixedMarkup(value);
  }

  function clearStepBenefit() {
    var box = document.getElementById("stepBenefit");
    if (!box) return;
    box.hidden = true;
    box.textContent = "";
  }

  function showStepBenefit(text) {
    var box = document.getElementById("stepBenefit");
    if (!box || !text) return;
    box.hidden = false;
    box.innerHTML = '<strong>✓ ما أنشأته وفائدته</strong><span dir="rtl">' + lessonMixedMarkup(text) + '</span>';
  }

  var handCraftScores = { html: 20, css: 20, js: 20 };
  var lastHandCraftMilestone = { html: 0, css: 0, js: 0 };

  function getHandCraftMilestoneMessage(ratio) {
    if (ratio >= 85) return "🏆 صفحة مصنوعة بحرفية يدوية وبصمتك الخاصة 100%!";
    if (ratio >= 60) return "🔨 رائع! أنت الآن تبني أكثر مما تنقل، والفكرة تثبت في ذهنك.";
    if (ratio >= 35) return "✨ هذا السطر لم يأتِ من النسخ.. أنت تبني خطوة بخطوة.";
    return "🌱 بداية ممتازة.. صفحتك بدأت تحمل بصمتك.";
  }

  function updateHandCraftScore(courseKey, isManual, boost) {
    var key = courseKey || (typeof course !== "undefined" ? course : "html");
    if (typeof handCraftScores[key] !== "number") handCraftScores[key] = 20;
    if (typeof boost === "number") {
      handCraftScores[key] = Math.min(100, Math.max(10, handCraftScores[key] + boost));
    } else if (isManual) {
      handCraftScores[key] = Math.min(100, handCraftScores[key] + 3);
    }
    var score = Math.round(handCraftScores[key]);
    var meter = document.getElementById("handCraftMeter");
    if (meter) {
      meter.hidden = false;
      meter.textContent = "🔨 كتابتك بيدك: " + ar(score) + "٪";
      var msg = getHandCraftMilestoneMessage(score);
      meter.title = msg;
      meter.setAttribute("aria-label", "نسبة كتابتك بيدك: " + score + " بالمئة. " + msg);

      var lastMile = lastHandCraftMilestone[key] || 0;
      if ((score >= 35 && lastMile < 35) || (score >= 60 && lastMile < 60) || (score >= 85 && lastMile < 85)) {
        lastHandCraftMilestone[key] = score;
        if (meter.classList && typeof meter.classList.add === "function") {
          meter.classList.add("pulse");
          if (typeof setTimeout === "function") {
            setTimeout(function() { meter.classList.remove("pulse"); }, 800);
          }
        }
        if (typeof document !== "undefined" && document.body && typeof document.body.appendChild === "function" && typeof document.createElement === "function") {
          var toast = document.createElement("div");
          toast.className = "hand-craft-toast";
          toast.textContent = msg;
          document.body.appendChild(toast);
          if (typeof setTimeout === "function") {
            setTimeout(function() { toast.classList.add("fade-out"); }, 2000);
            setTimeout(function() { toast.remove(); }, 2600);
          }
        }
      }
    }
    return score;
  }

  function inspectGentleDomTree(code, courseKey) {
    var guide = document.getElementById("gentleTreeGuide");
    if (!guide) return;
    var str = String(code || "");
    var key = courseKey || (typeof course !== "undefined" ? course : "html");

    if (key === "html") {
      var bodyOpen = str.indexOf("<body");
      var bodyClose = str.indexOf("</body");
      if (bodyOpen >= 0 && bodyClose >= 0) {
        var beforeBody = str.slice(0, bodyOpen);
        var afterBody = str.slice(bodyClose + 7);
        var visibleTagRegex = /<(h[1-6]|p|button|a|img|ul|ol|div|span)\b[^>]*>/i;
        var mBefore = beforeBody.match(visibleTagRegex);
        var mAfter = afterBody.match(visibleTagRegex);
        if (mBefore || mAfter) {
          var tagName = (mBefore || mAfter)[1].toLowerCase();
          guide.hidden = false;
          guide.innerHTML = '<div class="gentle-tree-card">' +
            '<div class="gentle-tree-head"><span class="gentle-tree-icon">🧭</span><span>خريطة بنية الصفحة (DOM Tree)</span></div>' +
            '<pre class="gentle-tree-diagram">html\n ├── head (الإعدادات والعنوان غير المرئي)\n └── body (المساحة المرئية لكل ما يشاهده الزائر)\n      └── <span class="gentle-tree-target">&lt;' + escapeHtml(tagName) + '&gt; مكان العنصر الدافئ هنا &lt;/' + escapeHtml(tagName) + '&gt;</span></pre>' +
            '<p class="gentle-tree-message">العنصر <code>&lt;' + escapeHtml(tagName) + '&gt;</code> يبدو أنه يبحث عن مكانه داخل الصفحة.. ما رأيك أن ندعوه ليعيش داخل <code>&lt;body&gt;</code> ليراه زوارك بكل وضوح؟</p>' +
          '</div>';
          return;
        }
      }
      var tagsToCheck = ["h1", "h2", "h3", "p", "button", "a"];
      for (var tIdx = 0; tIdx < tagsToCheck.length; tIdx++) {
        var tName = tagsToCheck[tIdx];
        var opens = (str.match(new RegExp("<" + tName + "\\b[^>]*>", "gi")) || []).length;
        var closes = (str.match(new RegExp("</" + tName + ">", "gi")) || []).length;
        if (opens > closes) {
          guide.hidden = false;
          guide.innerHTML = '<div class="gentle-tree-card">' +
            '<div class="gentle-tree-head"><span class="gentle-tree-icon">🌱</span><span>اكتمال بنية الوسم</span></div>' +
            '<pre class="gentle-tree-diagram">&lt;' + tName + '&gt; محتوى العنصر &lt;/' + tName + '&gt;\n  └── <span class="gentle-tree-target">لا تنسَ وسم الإغلاق &lt;/' + tName + '&gt; ليطمئن المتصفح لنهاية الوسم</span></pre>' +
            '<p class="gentle-tree-message">الوسم <code>&lt;' + tName + '&gt;</code> يحتاج إلى رفيقه <code>&lt;/' + tName + '&gt;</code> ليغلق الباب بعد انتهاء المحتوى بنجاح.</p>' +
          '</div>';
          return;
        }
      }
    } else if (key === "css") {
      var stripped = str.replace(/\{[^{}]*\}/g, "");
      if (/[a-zA-Z-]+\s*:\s*[^;]+;?/.test(stripped)) {
        guide.hidden = false;
        guide.innerHTML = '<div class="gentle-tree-card">' +
          '<div class="gentle-tree-head"><span class="gentle-tree-icon">🎨</span><span>خريطة بنية التنسيق (CSS Rules)</span></div>' +
          '<pre class="gentle-tree-diagram">المحدد (Selector) {\n  └── <span class="gentle-tree-target">الخاصية: القيمة;  ← مكانها هنا بين قوسي المحدد</span>\n}</pre>' +
          '<p class="gentle-tree-message">الخاصية تبحث عن بيتها داخل قوسي المحدد { } لتترك لمستك الأنيقة على العنصر المطلوب.</p>' +
        '</div>';
        return;
      }
    } else if (key === "js") {
      var logMatch = str.match(/console\.log\(\s*([a-zA-Z\u0600-\u06FF]+)\s*\)/);
      if (logMatch && !/^(true|false|null|undefined|\d+)$/.test(logMatch[1])) {
        var id = logMatch[1];
        if (!new RegExp("\\b(let|const|var)\\s+" + id + "\\b").test(str)) {
          guide.hidden = false;
          guide.innerHTML = '<div class="gentle-tree-card">' +
            '<div class="gentle-tree-head"><span class="gentle-tree-icon">💡</span><span>خريطة بنية النص (JavaScript Syntax)</span></div>' +
            '<pre class="gentle-tree-diagram">console.log("' + escapeHtml(id) + '");\n            └── <span class="gentle-tree-target">علامتا التنصيص تحميان الكلمات لتظهر كنص ودّي</span></pre>' +
            '<p class="gentle-tree-message">الكلمة تبحث عن علامتي تنصيص " " ليعرف JavaScript أنها رسالة واضحة وليست متغيراً غير معرّف.</p>' +
          '</div>';
          return;
        }
      }
    }
    guide.hidden = true;
    guide.innerHTML = "";
  }

  function renderSlotBuilder(step, model) {
    var builder = document.getElementById("slotBuilder");
    if (!builder) return;
    if (!step || step.type === "quiz" || step.type === "diagnose" || step.type === "project" || growthLessonDone(model.id)) {
      builder.hidden = true;
      builder.innerHTML = "";
      return;
    }

    var snippet = "";
    var isEdit = step.type === "edit";
    if (isEdit) {
      snippet = step.to || "";
    } else if (step.build && step.build.added) {
      snippet = step.build.added.split("\n")[0].trim();
    } else if (typeof step.example === "string" && step.example.trim()) {
      snippet = step.example.split("\n")[0].trim();
    }

    if (!snippet) {
      builder.hidden = true;
      builder.innerHTML = "";
      return;
    }

    builder.hidden = false;

    var stage1 = model.key === "html" ? "داخل &lt;body&gt; ليظهر للزوار" : model.key === "css" ? "داخل قوسي المحدد { }" : "في السطر المناسب من البرنامج";
    var stage2 = "";
    var tagOpen = "", tagClose = "", slotVal = "";

    if (isEdit) {
      stage2 = "تعديل موجه لضبط القيمة";
      slotVal = step.to;
    } else if (model.key === "html") {
      var m = snippet.match(/^(<([a-zA-Z0-9]+)[^>]*>)([\s\S]*?)(<\/\2>)$/);
      if (m) {
        tagOpen = m[1];
        tagClose = m[4];
        slotVal = m[3] || "اكتب النص هنا";
        stage2 = "وسم &lt;" + m[2] + "&gt;";
      } else {
        var mSingle = snippet.match(/^<([a-zA-Z0-9]+)[^>]*>$/);
        if (mSingle) {
          tagOpen = snippet;
          stage2 = "وسم &lt;" + mSingle[1] + "&gt;";
          slotVal = "";
        } else {
          stage2 = "لبنة HTML";
          slotVal = snippet;
        }
      }
    } else if (model.key === "css") {
      var mCss = snippet.match(/^([a-zA-Z0-9-]+)\s*:\s*([^;]+);?$/);
      if (mCss) {
        stage2 = "خاصية " + mCss[1];
        tagOpen = mCss[1] + ": ";
        tagClose = ";";
        slotVal = mCss[2].trim();
      } else {
        stage2 = "قاعدة CSS";
        slotVal = snippet;
      }
    } else {
      var mJs = snippet.match(/^(console\.log\()(["']?)([\s\S]*?)\2(\);?)$/);
      if (mJs) {
        stage2 = "دالة console.log";
        tagOpen = 'console.log("';
        tagClose = '");';
        slotVal = mJs[3] || "أهلاً بك";
      } else {
        stage2 = "تعليمة JavaScript";
        slotVal = snippet;
      }
    }

    var stagesHtml = '<div class="slot-stages-bar">' +
      '<span class="slot-stage-pill done">١. أين يعيش؟ ' + stage1 + '</span>' +
      '<span class="slot-stage-pill done">٢. الأداة: ' + stage2 + '</span>' +
      '<span class="slot-stage-pill active">٣. اترك بصمتك واكتب القيمة</span>' +
      '<span class="slot-stage-pill">٤. شغّل وشاهد أثرك</span>' +
    '</div>';

    var blockHtml = '<div class="slot-block">' +
      (tagOpen ? '<span>' + escapeHtml(tagOpen) + '</span>' : '') +
      '<input type="text" class="slot-input" id="slotBuilderInput" value="' + escapeHtml(slotVal) + '" aria-label="محتوى اللبنة البرمجية" />' +
      (tagClose ? '<span>' + escapeHtml(tagClose) + '</span>' : '') +
      '<button type="button" class="slot-btn-build" id="slotBuilderApply">✅ ابنِ الكود وضع بصمتك في المحرر ↵</button>' +
    '</div>';

    builder.innerHTML = stagesHtml + blockHtml;

    var applyBtn = document.getElementById("slotBuilderApply");
    if (applyBtn) {
      applyBtn.onclick = function() {
        var inputNode = document.getElementById("slotBuilderInput");
        var customVal = inputNode ? inputNode.value : slotVal;
        var assembled = tagOpen || tagClose ? (tagOpen + customVal + tagClose) : customVal;
        var codeArea = document.getElementById("code");
        if (!codeArea) return;

        if (isEdit) {
          if (step.from && codeArea.value.indexOf(step.from) >= 0) {
            codeArea.value = codeArea.value.replace(step.from, assembled);
          } else {
            codeArea.value = step.after || codeArea.value;
          }
        } else if (step.build && step.build.code) {
          codeArea.value = step.build.code;
        } else if (step.stage && step.stage.code) {
          codeArea.value = step.stage.code;
        } else {
          if (model.key === "html" && codeArea.value.indexOf("</body>") >= 0) {
            codeArea.value = codeArea.value.replace("</body>", "  " + assembled + "\n</body>");
          } else {
            codeArea.value = (codeArea.value ? codeArea.value + "\n" : "") + assembled;
          }
        }

        growth.drafts[model.id] = codeArea.value;
        s[model.key + "Code"] = codeArea.value;
        growthPreview(codeArea.value);
        inspectGentleDomTree(codeArea.value, model.key);
        updateHandCraftScore(model.key, true, 25);

        var hintNode = document.getElementById("hint");
        if (hintNode) hintNode.textContent = "بنيت اللبنة بيدك ووضعت بصمتك! شغّل الآن وشاهد النتيجة الحية.";
        codeArea.focus();
        celebrateGrowth("بنيت اللبنة بيدك!", "#code");
      };
    }
  }

  function renderDynamicGrowthLesson() {
    var model = growthLessonModel(),
        steps = growthLessonSteps(model),
        state = growthLessonFlowState(model, steps),
        step = steps[state.current] || steps[0],
        completed = growthLessonDone(model.id),
        current = completed ? steps.length - 1 : state.current,
        copy = document.getElementById("guideCopy"),
        title = document.getElementById("guideTitle"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext"),
        previous = document.getElementById("guidePrevious"),
        reference = document.getElementById("lessonReference"),
        dots = document.getElementById("lessonDots"),
        exampleMarkup;
    document.body.classList.toggle("is-html", model.key === "html");
    document.body.classList.toggle("is-course-guide", model.key === "css" || model.key === "js");
    document.body.classList.add("has-roadmap", "growth-experience");
    renderRoadmap();
    document.getElementById("complete").hidden = true;
    document.getElementById("title").textContent = model.topic;
    document.getElementById("sub").textContent = model.objective;
    document.getElementById("lessonObjective").hidden = true;
    document.getElementById("level").textContent = (model.key === "html" ? "HTML" : model.key === "css" ? "CSS" : "JavaScript") + " · " + ar(model.index + 1) + " من " + ar(courseTopics(model.key).length);
    document.getElementById("filename").textContent = data[model.key].file;
    document.getElementById("guideTrackLabel").textContent = "فكرة واحدة · تجربة واحدة";
    document.getElementById("prompt").hidden = true;
    document.querySelector(".prompt").hidden = true;
    document.getElementById("guideCount").textContent = completed
      ? "اكتمل الدرس · " + ar(steps.length) + " من " + ar(steps.length)
      : "خطوة " + ar(current + 1) + " من " + ar(steps.length);
    document.getElementById("guideCount").setAttribute("aria-label", completed ? "اكتمل الدرس" : "خطوة " + (current + 1) + " من " + steps.length);
    document.getElementById("lessonPhaseName").textContent = completed ? "مكتمل" : (step.type === "edit" || step.type === "repair" ? "تطبيق عملي" : step.build ? "بناء يدوي" : "استكشاف وفهم");
    dots.setAttribute("aria-valuemax", String(steps.length));
    dots.setAttribute("aria-valuenow", String(completed ? steps.length : current + 1));
    dots.innerHTML = steps.map(function(item, index) {
      var node = '<span class="growth-node' + (index < current || completed ? ' done' : index === current ? ' now' : '') + '"></span>';
      return index < steps.length - 1 ? node + '<span class="growth-wire"></span>' : node;
    }).join("");
    document.getElementById("guideMeter").style.width = (completed ? 100 : current * 100 / Math.max(1, steps.length - 1)) + "%";
    actions.innerHTML = "";
    reference.hidden = !model.reference;
    reference.href = model.reference || "#";
    reference.textContent = /\/$/.test(model.reference) ? "افتح فهرس W3Schools لهذا المسار ↗" : "افتح شرح W3Schools لهذا الدرس ↗";
    var editorValue = growthDraftFor(model),
        reviewingBuild = false,
        hasStages = !!(model.buildStages && model.buildStages.length);
    if (hasStages && !completed) {
      var isReview = state.current < state.unlocked;
      if (step.id === "idea" && isReview) {
        editorValue = model.code;
        reviewingBuild = true;
      } else if (step.stage) {
        if (isReview) {
          editorValue = step.stage.code;
          reviewingBuild = true;
        } else if (!editorValue || editorValue === model.code) editorValue = step.stage.previous;
      }
    }
    document.getElementById("code").value = editorValue;
    document.getElementById("code").readOnly = reviewingBuild;
    growthPreview(editorValue);
    clearStepBenefit();
    previous.disabled = completed || current <= 0;
    previous.onclick = function() {
      if (completed) return;
      var saved = growthLessonFlowState(model, steps);
      saved.current = Math.max(0, saved.current - 1);
      saveGrowth();
      renderGrowthLesson();
    };

    if (completed) {
      title.textContent = "أنهيت خطوات الدرس";
      setLessonCopy(copy, "كل خطوة اتجربت واتحفظت. تقدر تراجع الكود أو تنتقل للموضوع التالي.");
      visual.innerHTML = '<div class="guide-finish"><b>✓ اكتمل ' + escapeHtml(model.topic) + '</b><span>المثال الكامل ما زال في المحرر.</span></div>';
      actions.innerHTML = '<div class="basic-hint">أضفت نتيجة الدرس إلى مشروعك.</div>';
      next.textContent = model.index + 1 < courseTopics(model.key).length ? "افتح الدرس التالي ←" : "ارجع إلى خريطة الدروس ←";
      next.disabled = false;
      var sbDone = document.getElementById("slotBuilder"); if (sbDone) { sbDone.hidden = true; sbDone.innerHTML = ""; }
      var gtDone = document.getElementById("gentleTreeGuide"); if (gtDone) { gtDone.hidden = true; gtDone.innerHTML = ""; }
      updateHandCraftScore(model.key, false, 100);
      renderGrowthDashboard();
      return;
    }

    setLessonCopy(title, step.title);
    setLessonCopy(copy, step.explanation);
    if (step.type === "edit") {
      exampleMarkup = '<div class="basic-structure lesson-target"><span class="comment">غيّر هذا الجزء:</span><br><bdi dir="ltr">' + escapeHtml(step.from) + '</bdi><br><span class="comment">إلى:</span><br><bdi dir="ltr">' + escapeHtml(step.to) + '</bdi></div>';
    } else if (step.type === "diagnose" || step.type === "repair") {
      exampleMarkup = '<div class="basic-structure"><span class="comment">السطر المقصود:</span><br><bdi dir="ltr">' + escapeHtml(step.example) + '</bdi></div>';
    } else if (step.build) {
      exampleMarkup = '<div class="basic-structure lesson-target"><span class="comment">اكتب هذا الجزء بيدك:</span><pre class="lesson-code" dir="ltr">' + escapeHtml(step.example) + '</pre></div>';
    } else {
      exampleMarkup = '<div class="basic-structure"><bdi dir="auto">' + lessonMixedMarkup(step.example || "") + '</bdi></div>';
    }
    visual.innerHTML = exampleMarkup + '<div class="basic-hint step-task">' + lessonMixedMarkup(step.task) + '</div>';
    document.getElementById("hint").textContent = step.type === "edit" || step.type === "repair"
      ? "نفّذ التغيير المعروض في محرر " + data[model.key].file + " ثم شغّل."
      : step.type === "experiment" ? "غيّر جزءًا من اختيارك ثم شغّل حتى تنتقل للتالي."
      : step.type === "project" ? "احفظ نتيجة الخطوات في مشروعك من الزر الظاهر هنا."
      : step.type === "quiz" || step.type === "diagnose" ? "اختر إجابة واحدة؛ لو أخطأت تقدر تحاول تاني."
      : reviewingBuild ? "هذه خطوة أنهيتها. المحرر للعرض فقط، ويمكنك تشغيله لترى نتيجتها."
      : step.build ? "اكتب الأسطر المطلوبة بيدك في المحرر ثم شغّل."
      : "شغّل المثال الكامل، وراقب الجزء الموضح في هذه الخطوة.";
    if (step.type === "quiz" || step.type === "diagnose") {
      var answerKey = step.type === "quiz" ? "quiz:" + model.id : "bug:" + model.id,
          question = step.question || step.task,
          options = Array.isArray(step.options) ? step.options : [];
      actions.innerHTML = '<div class="course-lesson-question">' + lessonMixedMarkup(question) + '</div><div class="course-lesson-answers">' + options.map(function(option, index) {
        return '<button type="button" data-flow-answer="' + index + '">' + escapeHtml(option) + '</button>';
      }).join("") + '</div><p class="guide-feedback" aria-live="polite">' + (growth.answers[answerKey] ? "إجابتك صحيحة. نكمل للخطوة التالية." : "اختار الأقرب لما لاحظته في المثال.") + '</p>';
      actions.querySelectorAll("[data-flow-answer]").forEach(function(button) {
        button.onclick = function() {
          if (+button.dataset.flowAnswer !== step.correct) {
            actions.querySelector(".guide-feedback").textContent = "راجع المثال المعروض في هذه الخطوة، وبعدها جرّب اختيارًا آخر.";
            return;
          }
          growth.answers[answerKey] = true;
          if (step.type === "diagnose") {
            growth.stages[model.id] = 5;
            growth.repairStarted[model.id] = false;
            growth.drafts[model.id] = model.brokenCode;
          } else growth.stages[model.id] = 1;
          completeCurrentFlowStep(model, steps);
          saveGrowth();
          renderGrowthLesson();
          celebrateGrowth(step.type === "diagnose" ? "اكتشفت سبب الخطأ. دلوقتي أصلحه." : "ربطت التفصيلة بالمثال.", "#lesson");
        };
      });
    } else if (step.type === "project") {
      actions.innerHTML = '<button class="growth-add-part" type="button">أضف اللبنة لمشروعي</button>';
      actions.querySelector(".growth-add-part").onclick = function() { completeGrowthLesson(model); };
    }
    if (state.current < state.unlocked) {
      next.textContent = "راجع الخطوة التالية المفتوحة ←";
      next.disabled = false;
    } else {
      next.textContent = step.type === "quiz" || step.type === "diagnose" ? "أجب عن سؤال الخطوة أولًا" : step.type === "project" ? "أضف اللبنة لمشروعي أولًا" : step.build ? "اكتب الجزء في المحرر ←" : "نفّذ التجربة في المحرر ←";
      next.disabled = step.type === "quiz" || step.type === "diagnose" || step.type === "project";
    }
    if (typeof renderSlotBuilder === "function") renderSlotBuilder(step, model);
    if (typeof inspectGentleDomTree === "function") inspectGentleDomTree(editorValue, model.key);
    if (typeof updateHandCraftScore === "function") updateHandCraftScore(model.key, false, 0);
    renderGrowthDashboard();
  }

  function renderGrowthLesson() {
    return renderDynamicGrowthLesson();
    legacyRenderGrowthLesson();
    var model = growthLessonModel(),
        stage = Math.max(0, Math.min(6, Math.floor(growth.stages[model.id] || 0))),
        copy = document.getElementById("guideCopy"),
        title = document.getElementById("guideTitle"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext"),
        reference = document.getElementById("lessonReference");
    model.practiceSteps = model.practiceSteps || [];
    model.breakdown = model.breakdown || [];
    setLessonCopy(copy, copy.textContent);
    reference.hidden = !model.reference;
    reference.href = model.reference || "#";
    reference.textContent = /\/$/.test(model.reference) ? "افتح فهرس W3Schools لهذا المسار ↗" : "افتح شرح W3Schools لهذا الدرس ↗";
    if (model.key !== "html" || !model.practiceSteps.length || stage >= 3) return;

    var step = model.practiceSteps[stage],
        breakdown = model.breakdown.map(function(item) {
          return "<li><bdi dir=\"ltr\">" + escapeHtml(item.code) + "</bdi> — " + escapeHtml(item.meaning) + "</li>";
        }).join("");
    setLessonCopy(title, step.title);
    setLessonCopy(copy, step.explanation);
    document.getElementById("guideCount").textContent = "خطوة " + ar(stage + 1) + " من ٧ · " + step.title;
    document.getElementById("guideCount").setAttribute("aria-label", step.title);
    document.getElementById("lessonPhaseName").textContent = step.title;
    visual.innerHTML = '<div class="lesson-breakdown"><h5>نفكك المثال الكامل</h5><ol>' + breakdown + '</ol></div><div class="basic-structure lesson-target"><span class="comment">غيّر هذا الجزء:</span><br><bdi dir="ltr">' + escapeHtml(step.from) + '</bdi><br><span class="comment">إلى:</span><br><bdi dir="ltr">' + escapeHtml(step.to) + '</bdi></div><div class="basic-hint">نفّذ خطوة واحدة فقط، ثم شغّل المثال لتفتح الخطوة التالية.</div>';
    document.getElementById("hint").textContent = "هذه الخطوة محفوظة لدرس " + model.topic + ". نفّذ التعديل المعروض ثم شغّل.";
    if (stage === 0 && growth.archivedDrafts && growth.archivedDrafts[model.id]) {
      var archivedButton = document.createElement("button");
      archivedButton.type = "button";
      archivedButton.className = "archived-draft-download";
      archivedButton.textContent = "نزّل مسودتي السابقة";
      archivedButton.onclick = function() {
        var blob = new Blob([growth.archivedDrafts[model.id]], { type: "text/html;charset=utf-8" }),
            url = URL.createObjectURL(blob),
            link = document.createElement("a");
        link.href = url;
        link.download = "previous-" + data[model.key].file;
        document.body.appendChild(link); link.click(); link.remove();
        setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      };
      actions.appendChild(archivedButton);
    }
    next.textContent = "نفّذ الخطوة في المحرر ←";
    next.disabled = false;
  }

  function growthPreview(code) {
    clearPreviewStatus();
    if (course === "js") {
      try { new Function(code); } catch(error) { showPreviewError(error && error.message || error); }
    }
    document.getElementById("preview").srcdoc = data[course].build(code);
    if (typeof inspectGentleDomTree === "function") inspectGentleDomTree(code, course);
  }

  function runDynamicGrowthLesson() {
    var model = growthLessonModel(),
        steps = growthLessonSteps(model),
        state = growthLessonFlowState(model, steps),
        step = steps[state.current],
        code = document.getElementById("code").value,
        hint = document.getElementById("hint"),
        isRunnable = true,
        basePractice = model.practiceSteps.length ? model.practiceSteps[model.practiceSteps.length - 1].after : model.code;
    if (!step || growthLessonDone(model.id)) return;
    if (step.type === "quiz" || step.type === "diagnose" || step.type === "project") {
      document.getElementById("guideActions").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!String(code || "").trim()) {
      hint.textContent = step.build ? "المحرر فاضي. اكتب الجزء الظاهر في بطاقة الخطوة ثم شغّل." : "المحرر فاضي. ابدأ من المثال الظاهر ثم نفّذ خطوة اليوم.";
      return;
    }
    if (model.key === "js") {
      try { new Function(code); } catch(error) {
        isRunnable = false;
        if (typeof showPreviewError === "function") showPreviewError(error && error.message || error);
        hint.textContent = "فيه خطأ صياغة يمنع التشغيل. راجع الأقواس وعلامات التنصيص ثم جرّب تاني.";
      }
    }
    if (!isRunnable) return;
    var staged = !!(model.buildStages && model.buildStages.length),
        reviewing = state.current < state.unlocked;
    if (staged && reviewing && (step.stage || step.id === "idea")) {
      growthPreview(code);
      hint.textContent = "هذه خطوة سبق إنجازها. هكذا ظهرت نتيجتها.";
      showStepBenefit(step.benefit);
      return;
    }
    if (typeof validateLessonAnswer === "function") {
      var validation = validateLessonAnswer(code, model, step);
      if (!validation.valid) {
        clearStepBenefit();
        growthPreview(code);
        hint.textContent = validation.message;
        document.getElementById("code").focus();
        return;
      }
    } else {
      var normDoc = typeof normalizeDoc === "function" ? normalizeDoc : function(c) { return String(c || "").trim(); };
      if (step.build) {
        var missing = typeof missingBuildLine === "function" ? missingBuildLine(code, step.build) : "";
        if (missing) {
          clearStepBenefit();
          growthPreview(code);
          hint.textContent = "لم تكتمل الخطوة بعد. ينقصك هذا السطر: " + missing;
          document.getElementById("code").focus();
          return;
        }
      }
      if (step.type === "edit" && normDoc(code) !== normDoc(step.after)) {
        hint.textContent = "راجع التغيير المطلوب في بطاقة الخطوة. غيّره وحده ثم شغّل من جديد.";
        document.getElementById("code").focus();
        return;
      }
      if (step.type === "experiment" && (normDoc(code) === normDoc(growth.experimentCodes[model.id] || basePractice) || normDoc(code) === normDoc(model.code))) {
        hint.textContent = "غيّر جزءًا آخر من اختيارك ثم شغّل لتشاهد أثر فكرتك.";
        document.getElementById("code").focus();
        return;
      }
      if (step.type === "repair" && normDoc(code) !== normDoc(model.fixedCode)) {
        hint.textContent = "راجع السطر الذي اكتشفت خطأه، ثم أصلحه وشغّل مرة أخرى.";
        document.getElementById("code").focus();
        return;
      }
    }
    growthPreview(code);
    growth.drafts[model.id] = code;
    s[model.key + "Code"] = code;
    s.examples++;
    if (step.type === "edit") {
      var editIndex = +((step.id.match(/^edit-(\d+)$/) || [])[1] || 0);
      if (model.key === "html") growth.stages[model.id] = editIndex + 1;
      else growth.stages[model.id] = editIndex === model.practiceSteps.length - 1 ? 3 : 2;
      if (editIndex === model.practiceSteps.length - 1) growth.experimentCodes[model.id] = code;
      hint.textContent = "نفّذت الخطوة وشاهدت أثرها. ظهرت الخطوة التالية وحدها.";
    } else if (step.type === "experiment") {
      growth.experimentCodes[model.id] = code;
      growth.stages[model.id] = 4;
      hint.textContent = "حفظنا تجربتك. ننتقل الآن لاكتشاف خطأ صغير وإصلاحه.";
    } else if (step.type === "repair") {
      growth.stages[model.id] = 6;
      s.fixes++;
      hint.textContent = "اتصلح الخطأ. بقي أن تضيف نتيجة الدرس إلى مشروعك.";
    } else {
      if (model.key !== "html") growth.stages[model.id] = 1;
      var detailIndex = +(String(step.id).match(/^detail-(\d+)$/) || [])[1];
      if (isFinite(detailIndex)) {
        growth.readingSteps = growth.readingSteps || {};
        growth.readingSteps[model.id] = detailIndex;
      }
      hint.textContent = step.build
        ? "كتبت الجزء بنفسك وظهرت نتيجته. نكمل للجزء التالي."
        : "شغّلت المثال ولاحظت أثر هذه الفكرة. نكمل للخطوة التالية.";
      if (staged && step.id === "idea") {
        growth.drafts[model.id] = "";
        s[model.key + "Code"] = "";
      } else if (step.stage && model.buildStages && step.stage.index === model.buildStages.length - 1) {
        growth.drafts[model.id] = model.code;
        s[model.key + "Code"] = model.code;
      }
    }
    completeCurrentFlowStep(model, steps);
    saveGrowth(); save();
    renderGrowthLesson(); render();
    showStepBenefit(step.benefit);
    celebrateGrowth(step.type === "edit" ? "نجحت تجربتك وعملت كما ينبغي." : step.type === "experiment" ? "هذه لمستك الخاصة." : step.type === "repair" ? "أصبح الخطأ تجربة مفيدة." : step.build ? "كتبت هذا الجزء بيدك بنجاح." : "تتبعت المثال خطوة بخطوة.", "#lesson");
  }

  function runGrowthLesson() {
    return runDynamicGrowthLesson();
  }

  function completeGrowthLesson(model) {
    return completeDynamicGrowthLesson(model);
  }

  function completeDynamicGrowthLesson(model) {
    var steps = growthLessonSteps(model),
        state = growthLessonFlowState(model, steps),
        currentStep = steps[state.current];
    if (growthLessonDone(model.id) || !currentStep || currentStep.type !== "project") return;
    growth.completed.push(model.id);
    state.current = steps.length - 1;
    state.unlocked = steps.length - 1;
    growth.lessonFlow[model.id] = state;
    growth.stages[model.id] = 6;
    model.projectPiece.code = typeof growth.drafts[model.id] === "string" ? growth.drafts[model.id].slice(0, 1200) : model.projectPiece.code;
    addProjectPart(model.projectPiece);
    var unlockedNow = abilityCatalog.filter(function(ability) { return abilityProgress(ability).unlocked && growth.unlocks.indexOf(ability.id) < 0; });
    syncUnlockedParts();
    s.lessons++;
    s.progress = Math.min(100, s.progress + 2);
    saveGrowth(); save(); render(); renderProfileCard(); renderGrowthLesson();
    var reward = unlockedNow.length ? "قدرة جديدة اتفتحت: " + unlockedNow[0].title : "لبنة جديدة اتضافت لمشروعك.";
    celebrateGrowth(reward, unlockedNow.length ? "#nextUnlockCard" : "#profileCardPreview");
    renderGrowthDashboard();
  }

  function reviewPreviousGrowthStep() {
    var model = growthLessonModel(),
        steps = growthLessonSteps(model),
        state = growthLessonFlowState(model, steps);
    if (growthLessonDone(model.id) || state.current <= 0) return;
    state.current--;
    saveGrowth();
    renderGrowthLesson();
  }

  function advanceDynamicGrowthLesson() {
    var model = growthLessonModel(),
        steps = growthLessonSteps(model),
        state = growthLessonFlowState(model, steps),
        step = steps[state.current],
        code = document.getElementById("code");
    if (growthLessonDone(model.id)) {
      if (model.index + 1 < courseTopics(model.key).length) {
        if (model.key === "html") s.htmlLesson = model.index + 1;
        else s[model.key + "Lesson"] = model.index + 1;
        s[model.key + "Code"] = "";
        save(); select(model.key); cheer();
      } else document.getElementById("courseRoadmap").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (state.current < state.unlocked) {
      state.current++;
      saveGrowth(); renderGrowthLesson();
      if (typeof setMobileLessonView === "function") setMobileLessonView("editor");
      return;
    }
    if (step.type === "quiz" || step.type === "diagnose" || step.type === "project") {
      document.getElementById("guideActions").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (typeof setMobileLessonView === "function") setMobileLessonView("editor");
    code.scrollIntoView({ behavior: "smooth", block: "center" });
    code.focus();
  }

  function advanceGrowthLesson() {
    return advanceDynamicGrowthLesson();
  }

  function dailyChallengeModel() {
    var model = growthLessonModel(),
        topic = model.topic,
        dateStamp = Date.parse(todayKey() + "T00:00:00Z"),
        dayIndex = isFinite(dateStamp) ? Math.abs(Math.floor(dateStamp / 86400000)) % 3 : 0,
        item = { title: topic, kind: "text", course: model.key, label: "أضف أثرًا صغيرًا لمشروعك", placeholder: "اكتب جملة قصيرة من اختيارك", artifactLabel: "تجربة يومية", objective: "أضف نتيجة صغيرة من الدرس إلى مشروعك." },
        variations;
    if (model.key === "html") {
      if (/Forms|Input/i.test(topic)) {
        variations = [
          { prompt: "اكتب تسمية توضّح البيانات التي سيدخلها الزائر.", label: "تسمية الحقل", placeholder: "مثال: البريد الإلكتروني", artifactLabel: "حقل في نموذجي" },
          { prompt: "اكتب مساعدة قصيرة تخبر الزائر بصيغة الإدخال المطلوبة.", label: "مساعدة الحقل", placeholder: "مثال: اكتب رقمًا من ١١ خانة", artifactLabel: "توجيه للحقل" },
          { prompt: "اكتب نص زر واضحًا يخبر الزائر بما سيحدث بعد الضغط.", label: "نص زر النموذج", placeholder: "مثال: أرسل بياناتي", artifactLabel: "زر في النموذج" }
        ];
      } else if (/Image/i.test(topic)) {
        variations = [
          { prompt: "اكتب وصفًا قصيرًا لصورة ستظهر في صفحتك.", label: "وصف الصورة", placeholder: "مثال: غروب الشمس فوق البحر", artifactLabel: "وصف صورة" },
          { prompt: "تخيّل صورة لمشروعك واكتب نصًا بديلًا يشرحها لمن لا يراها.", label: "النص البديل", placeholder: "مثال: صفحة تعرض معرض أعمالي", artifactLabel: "وصف بديل للصورة" },
          { prompt: "اختر صورة لمشروعك واكتب تعليقًا صغيرًا تحتها.", label: "تعليق الصورة", placeholder: "مثال: أول تصميم جرّبته", artifactLabel: "تعليق صورة" }
        ];
      } else if (/Link|URL|Path/i.test(topic)) {
        variations = [
          { prompt: "اكتب نص رابط يوضّح للزائر ما الذي سيفتحه.", label: "نص الرابط", placeholder: "مثال: شاهد أعمالي", artifactLabel: "رابط في صفحتي" },
          { prompt: "اكتب اسم وجهة تريد أن يصل إليها زائر صفحتك.", label: "وجهة الرابط", placeholder: "مثال: صفحة التواصل", artifactLabel: "وجهة في صفحتي" },
          { prompt: "اكتب دعوة قصيرة تشجّع الزائر على فتح أحد أقسامك.", label: "دعوة للرابط", placeholder: "مثال: تعرّف على مشاريعي", artifactLabel: "دعوة للرابط" }
        ];
      } else {
        variations = [
          { prompt: "اكتب عنوانًا قصيرًا لقسم واحد تريد إضافته إلى صفحتك.", label: "عنوان القسم", placeholder: "مثال: مشاريعي الصغيرة", artifactLabel: "قسم جديد" },
          { prompt: "اكتب جملة واحدة تعرّف الزائر بما ستجده في صفحتك.", label: "نبذة قصيرة", placeholder: "مثال: أتعلم وأبني مشاريعي خطوة خطوة", artifactLabel: "نبذة للصفحة" },
          { prompt: "اكتب نص زر صغيرًا يدعو الزائر لاستكشاف صفحة مشروعك.", label: "نص زر", placeholder: "مثال: شوف مشاريعي", artifactLabel: "زر في صفحتي" }
        ];
      }
      Object.assign(item, variations[dayIndex]);
      item.objective = "أضفت " + item.label + " إلى صفحة مشروعك.";
    } else if (model.key === "css") {
      item.kind = "color"; item.artifactLabel = "لمسة لونية";
      variations = [
        "غيّر اللون الأساسي للبطاقة إلى لون يعبّر عن مشروعك.",
        "جرّب لونًا هادئًا للبطاقة وشاهد أثره على هويتها.",
        "اختار لونًا جديدًا، ولاحظ كيف يغيّر إحساس البطاقة."
      ];
      item.prompt = variations[dayIndex];
      item.objective = "لون البطاقة اتغير واتحفظ في مشروعك.";
    } else if (model.key === "js") {
      if (/Array|Loop|Iteration/i.test(topic)) {
        item.action = "todo";
        variations = [
          { prompt: "أضف خطوة واحدة تحب تنفيذها في مشروعك.", label: "خطوة في القائمة", placeholder: "مثال: أضيف قسم الصور", artifactLabel: "خطوة في قائمة المهام" },
          { prompt: "اكتب مهمة صغيرة ستقرّبك من إنهاء صفحتك.", label: "مهمة للمشروع", placeholder: "مثال: أراجع عنوان الصفحة", artifactLabel: "خطوة في قائمة المهام" },
          { prompt: "اختار تحسينًا واحدًا تريد تذكّره في قائمة مشروعك.", label: "تحسين قادم", placeholder: "مثال: أضيف وصفًا للصور", artifactLabel: "خطوة في قائمة المهام" }
        ];
        item.objective = "أضف مهمة؛ ستظهر في قائمة مشروعك وتحفظ مع تقدمك.";
      } else if (/DOM|Event|Output|Alert/i.test(topic)) {
        variations = [
          { prompt: "اكتب رسالة ترحيب تظهر للزائر عند تفاعله مع صفحتك.", label: "رسالة الترحيب", placeholder: "مثال: أهلًا بك في صفحتي", artifactLabel: "رسالة تفاعلية" },
          { prompt: "اكتب تأكيدًا قصيرًا يراه الزائر بعد حفظ تعديل.", label: "رسالة التأكيد", placeholder: "مثال: اتحفظ التعديل بنجاح", artifactLabel: "رسالة تفاعلية" },
          { prompt: "اكتب ردًا لطيفًا يظهر بعد ضغط الزائر على زر.", label: "رد الزر", placeholder: "مثال: سعيد بزيارتك", artifactLabel: "رسالة تفاعلية" }
        ];
      } else {
        variations = [
          { prompt: "اكتب نتيجة صغيرة تحب أن يعرضها مشروعك بعد خطوة.", label: "نتيجة المشروع", placeholder: "مثال: تم حفظ التعديل", artifactLabel: "نتيجة برمجية" },
          { prompt: "تخيّل أن المستخدم أكمل إجراءً؛ ماذا تخبره الصفحة؟", label: "رد الصفحة", placeholder: "مثال: جاهز، نكمل للخطوة التالية", artifactLabel: "نتيجة برمجية" },
          { prompt: "اكتب حالة قصيرة توضّح أن جزءًا من مشروعك أصبح جاهزًا.", label: "حالة المشروع", placeholder: "مثال: قائمة المهام جاهزة", artifactLabel: "نتيجة برمجية" }
        ];
      }
      Object.assign(item, variations[dayIndex]);
    }
    return item;
  }

  function finishDailyChallenge(challenge, note, result) {
    if (growth.daily.day === todayKey() && growth.daily.completed === true) return false;
    growth.daily = { day: todayKey(), completed: true, topic: challenge.title, result: result.slice(0, 180) };
    if (challenge.action === "todo") {
      growth.projectData.todos.push(note.slice(0, 80));
      growth.projectData.todos = growth.projectData.todos.slice(-60);
    }
    addProjectPart({
      id: "daily-" + todayKey(),
      label: challenge.artifactLabel + (challenge.course === "css" ? "" : " · " + challenge.title.replace(/^(HTML|CSS|JS)\s*/, "")),
      course: challenge.course,
      objective: challenge.objective,
      note: note.slice(0, 180),
      code: ""
    });
    s.progress = Math.min(100, s.progress + 1);
    saveGrowth(); save();
    renderProfileCard();
    renderGrowthDashboard();
    document.getElementById("dailyChallengeTitle").textContent = "تحدي اليوم اكتمل ✓";
    document.getElementById("dailyChallengePrompt").textContent = "خطوة عملية اتضافت لمشروعك. تقدر ترجع لها وقت ما تحب.";
    document.getElementById("dailyChallengeFeedback").textContent = "✓ " + result;
    renderDailyChallengeProgress(true);
    document.getElementById("dailyChallengeAnswers").innerHTML = "";
    celebrateGrowth("أصبحت تجربة اليوم جزءًا من مشروعك.", "#projectGrowth");
    return true;
  }

  function renderDailyChallengeProgress(completed) {
    var percent = completed ? 100 : 0;
    document.getElementById("dailyChallengeProgress").setAttribute("aria-valuenow", String(percent));
    document.getElementById("dailyChallengeProgressBar").style.width = percent + "%";
    document.getElementById("dailyChallengeProgressLabel").textContent = completed ? "التجربة اكتملت · ١٠٠٪" : "تجربة صغيرة · ٠٪";
  }

  function renderDailyChallenge() {
    var challenge = dailyChallengeModel(),
        answerHost = document.getElementById("dailyChallengeAnswers"),
        finished = growth.daily.day === todayKey() && growth.daily.completed === true;
    document.getElementById("dailyChallengeTitle").textContent = finished ? "تحدي اليوم اكتمل ✓" : "تحدي صغير من " + challenge.title;
    document.getElementById("dailyChallengePrompt").textContent = finished ? (growth.daily.result || "خطوة عملية اتضافت لمشروعك.") : challenge.prompt;
    document.getElementById("dailyChallengeFeedback").textContent = finished ? "لا توجد مهام معلّقة، يمكنك خوض تجربة جديدة متى أردت." : "خطوة واحدة تكفي؛ جرّبها وشاهد أثرها في مشروعك.";
    renderDailyChallengeProgress(finished);
    if (finished) { answerHost.innerHTML = ""; return; }
    if (challenge.kind === "color") {
      var colors = Object.keys(profileThemes).filter(function(color) { return color !== profileCard.color; }).slice(0, 3),
          colorLabels = { forest: "أخضر", ocean: "أزرق", plum: "بنفسجي", sunset: "برتقالي دافئ" };
      answerHost.innerHTML = '<div class="daily-color-options">' + colors.map(function(color) {
        return '<button type="button" data-daily-color="' + color + '" aria-label="اختار اللون ' + colorLabels[color] + '"><span class="daily-color-swatch" style="background:' + profileThemes[color].accent + '"></span><span>' + colorLabels[color] + '</span></button>';
      }).join("") + '</div>';
      answerHost.querySelectorAll("[data-daily-color]").forEach(function(button) {
        button.onclick = function() {
          if (growth.daily.day === todayKey() && growth.daily.completed === true) return;
          var selected = button.dataset.dailyColor;
          profileCard.color = profileThemes[selected] ? selected : "forest";
          saveProfileCard();
          finishDailyChallenge(challenge, "لون البطاقة: " + colorLabels[profileCard.color], "لون البطاقة اتغيّر واتحفظ في مشروعك.");
        };
      });
      return;
    }
    answerHost.innerHTML = '<form class="daily-challenge-workspace"><label for="dailyChallengeText">' + escapeHtml(challenge.label) + '</label><input id="dailyChallengeText" name="dailyText" type="text" maxlength="120" required placeholder="' + escapeHtml(challenge.placeholder) + '"><button type="submit">أضفها إلى مشروعي</button></form>';
    var form = answerHost.querySelector("form"), input = form.elements.dailyText;
    form.onsubmit = function(event) {
      event.preventDefault();
      var value = input.value.trim().slice(0, 120);
      if (!value) { input.focus(); return; }
      finishDailyChallenge(challenge, value, "«" + value + "» اتضافت إلى لبنات مشروعك.");
    };
  }
  function openDailyChallenge() {
    renderDailyChallenge();
    var dialog = document.getElementById("dailyChallengeDialog");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "open");
  }

  function celebrateGrowth(message, selector) {
    playRewardTone();
    cheer();
    var target = document.querySelector(selector);
    if (target) {
      target.classList.remove("growth-pop");
      void target.offsetWidth;
      target.classList.add("growth-pop");
      setTimeout(function() { target.classList.remove("growth-pop"); }, 900);
    }
    if (message) document.getElementById("toast").textContent = "✓ " + message;
  }

  var rewardToneCtx = null;
  function getRewardToneAudioContext() {
    if (ctx && ctx.state !== "closed") return ctx;
    var Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return null;
    if (!rewardToneCtx || rewardToneCtx.state === "closed") {
      try {
        rewardToneCtx = new Audio();
      } catch(e) {
        return null;
      }
    }
    return rewardToneCtx;
  }

  function playRewardTone() {
    if (s.volume === 0) return;
    var audio = getRewardToneAudioContext();
    if (!audio) return;
    try {
      var oscillator = audio.createOscillator(),
          toneGain = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 660;
      toneGain.gain.setValueAtTime(0.0001, audio.currentTime);
      toneGain.gain.exponentialRampToValueAtTime(Math.min(0.035, s.volume / 3000), audio.currentTime + 0.02);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.2);
      oscillator.connect(toneGain); toneGain.connect(audio.destination);
      oscillator.start(); oscillator.stop(audio.currentTime + 0.22);
      if (audio.state === "suspended") audio.resume();
    } catch(e) {}
  }

  function renderGrowthDashboard() {
    var changed = syncUnlockedParts(),
        unlocked = abilityCatalog.filter(function(ability) { return abilityProgress(ability).unlocked; }),
        completedToday = growth.daily.day === todayKey() && growth.daily.completed === true,
        current = growthLessonModel(),
        next = nextAbilityForCourse(current.key),
        skills = completedSkills(),
        nextSkill = nextSkillForCourse(current.key),
        courseLabels = { html: "HTML", css: "CSS", js: "JavaScript" };
    if (changed) { saveGrowth(); renderProfileCard(); }
    document.getElementById("abilityCount").textContent = ar(unlocked.length);
    document.getElementById("openProjectCount").textContent = ar(1);
    document.getElementById("skillCount").textContent = ar(skills.length);
    document.getElementById("skillProgressLabel").textContent = nextSkill
      ? "التالية في " + courseLabels[current.key] + " · " + nextSkill.title + " · " + ar(skillProgress(nextSkill).done) + "/" + ar(skillProgress(nextSkill).total)
      : "اكتملت مهارات مسار " + courseLabels[current.key];
    document.getElementById("skillMilestonesList").innerHTML = skills.length
      ? skills.map(function(skill) { return "<li>✓ " + escapeHtml(skill.title) + " · " + courseLabels[skill.course] + "</li>"; }).join("")
      : "<li>كل مجموعة مكتملة ستظهر هنا.</li>";
    document.getElementById("heroProjectLabel").textContent = "مشروعك الحالي · " + (profileCard.name.trim() ? "بطاقة " + profileCard.name.trim() : "بطاقة تعرّف بيك");
    document.getElementById("heroNextTitle").textContent = growthLessonDone(current.id) ? "أُضيفت اللبنة بنجاح. لننتقل إلى الخطوة التالية." : "بعد الدرس ستتمكن من " + current.objective;
    document.getElementById("heroNextCopy").textContent = "حتى خمس دقائق تكفي لتجربة خطوة وإضافة أثرها لمشروعك.";
    document.getElementById("heroProjectMeta").textContent = "لبنات أُضيفت للمشروع · " + ar(growth.projectParts.length);
    document.getElementById("heroUnlockMeta").textContent = "القدرة التالية · " + (next ? next.title : "كل القدرات الحالية اتفتحت");
    document.getElementById("heroAbilityMeta").textContent = "قدرات مكتسبة · " + ar(unlocked.length);
    document.getElementById("continue").textContent = growthLessonDone(current.id) ? "لننتقل إلى الخطوة التالية ←" : awayDays >= 2 ? "نكمل من آخر خطوة وصلنا إليها ←" : "ابدأ خطوة اليوم ←";
    document.getElementById("openDailyChallenge").textContent = completedToday ? "تحدي اليوم اكتمل ✓" : "تحدي اليوم · ١–٥ دقائق";
    document.getElementById("openDailyChallengeRail").textContent = completedToday ? "شوف إنجاز اليوم ✓" : "اكتشف الخطوة الصغيرة ←";
    document.getElementById("daily").textContent = completedToday ? "خطوتك اليومية اتحسبت. نكمل من آخر مكانك وقت ما تحب." : "تجربة عملية صغيرة من الدرس الحالي — من دقيقة إلى خمس دقائق.";
    document.getElementById("progressLabel").textContent = ar(unlocked.length);
    document.getElementById("meter").style.width = Math.round(unlocked.length * 100 / abilityCatalog.length) + "%";
    document.getElementById("returnMessage").textContent = awayDays >= 2 ? "نكمل من آخر خطوة وصلنا إليها؛ لم يفُتك شيء." : "لا توجد مهام معلّقة، يمكنك خوض تجربة جديدة متى أردت.";
    document.getElementById("abilitiesList").innerHTML = unlocked.length
      ? unlocked.map(function(ability) { return '<article class="ability-chip"><span>' + ability.icon + '</span><b>' + escapeHtml(ability.title) + '</b><small>أداة: ' + escapeHtml(ability.tool) + '</small><details class="ability-challenge"><summary>تحدي هذه القدرة</summary><p>' + escapeHtml(ability.challenge) + '</p><a href="#projectTool-' + escapeHtml(ability.id) + '">جرّبها في مشروعك ←</a></details></article>'; }).join("")
      : '<div class="abilities-empty">لسه بنجمع أول قدرة. ابدأ من فكرة واحدة؛ كل خطوة عملية هتظهر هنا.</div>';
    if (next) {
      var progress = abilityProgress(next), remaining = progress.total - progress.done;
      document.getElementById("nextUnlockName").textContent = next.title;
      document.getElementById("nextUnlockCopy").textContent = "هتفتح أداة «" + next.tool + "» ويضاف «" + next.project + "» إلى مشروعك.";
      document.getElementById("nextUnlockProgress").textContent = ar(progress.percent) + "٪";
      document.getElementById("nextUnlockBar").style.width = progress.percent + "%";
      document.getElementById("nextUnlockNeed").textContent = remaining ? "باقي " + ar(remaining) + " " + (remaining === 1 ? "خطوة من متطلباتها" : "خطوات من متطلباتها") : "أنت قريب — أكمل المتطلب الأخير.";
    } else {
      document.getElementById("nextUnlockName").textContent = "كل القدرات اتفتحت";
      document.getElementById("nextUnlockCopy").textContent = "اختر قدرة وحوّلها إلى مشروعك الخاص.";
      document.getElementById("nextUnlockProgress").textContent = "✓";
      document.getElementById("nextUnlockBar").style.width = "100%";
      document.getElementById("nextUnlockNeed").textContent = "خريطة الدروس تظل متاحة عندما تحتاجها.";
    }
    document.getElementById("projectPartCount").textContent = growth.projectParts.length
      ? "أضفت " + ar(growth.projectParts.length) + " لبنة من تعلمك إلى البطاقة."
      : "لم نضف أول لبنة بعد — لنبدأ بخطوة أولى بسيطة.";
    var latestPart = growth.projectParts[growth.projectParts.length - 1],
        latestUpdate = document.getElementById("projectLatestUpdate");
    latestUpdate.hidden = !latestPart;
    latestUpdate.textContent = latestPart ? "آخر إضافة: " + String(latestPart.note || latestPart.objective || latestPart.label).slice(0, 160) : "";
    document.getElementById("projectParts").innerHTML = growth.projectParts.slice(-8).map(function(part) { return '<span class="project-part">✓ ' + escapeHtml(part.label) + '</span>'; }).join("");
    var finishedParts = growth.projectParts.length >= 3;
    document.querySelectorAll("#projectChecks .check").forEach(function(el, i) {
      var isDone = i === 0 ? !!(profileCard.name.trim() && profileCard.role.trim()) : i === 1 ? !!profileCard.about.trim() : finishedParts;
      el.classList.toggle("done", isDone);
      var icon = el.querySelector("i"); if (icon) icon.textContent = isDone ? "✓" : "·";
    });
  }

  function normalizeHtmlStep() {
    var oldStep = Math.max(1, Math.min(6, Math.floor(s.htmlStep || 1)));
    if (s.htmlStepVersion !== 2) {
      s.htmlStep = oldStep <= 2 ? oldStep : oldStep + 1;
      s.htmlStepVersion = 2;
      save();
    }
    s.htmlLesson = Math.max(0, Math.min(Math.floor(s.htmlLesson || 0), htmlSequence.length - 1));
    var boundedStep = Math.max(1, Math.min(6, Math.floor(s.htmlStep || 1)));
    if (s.htmlStep !== boundedStep) { s.htmlStep = boundedStep; save(); }
  }

  function setHtmlGuideProgress(step) {
    document.getElementById("guideCount").textContent = step === 6
      ? "اكتمل الدرس · ٥ من ٥"
      : "خطوة " + ar(step) + " من ٥";
    document.getElementById("guideMeter").style.width = (step === 6 ? 100 : (step - 1) * 20) + "%";
  }

  function htmlLessonDetail(lesson) {
    var topic = htmlSequence[lesson] || "HTML";
    if (/Introduction/.test(topic)) return { title: "المتصفح يقرأ بنية المستند", flow: "ملف HTML ⟶ عناصر مرتبة ⟶ المتصفح يعرض الصفحة", note: "HTML يحدد معنى الأجزاء وترتيبها؛ CSS سيغيّر شكلها في دروس لاحقة." };
    if (/Editors/.test(topic)) return { title: "التعديل يحتاج حفظًا ثم معاينة", flow: "اكتب في المحرر ⟶ احفظ الملف ⟶ افتحه في المتصفح", note: "المعاينة هنا تختصر دورة الحفظ والفتح، لذلك جرّب تعديلًا واحدًا وشاهد النتيجة." };
    if (/Basic/.test(topic)) return { title: "المستند له أجزاء رئيسية", flow: "doctype ⟶ html ⟶ head للمعلومات ⟶ body للمحتوى الظاهر", note: "العنوان الظاهر داخل الصفحة مكانه body؛ أما title فيظهر على لسان المتصفح." };
    if (/Elements/.test(topic)) return { title: "العنصر يضم البداية والمحتوى والنهاية", flow: "وسم بداية ⟶ محتوى ⟶ وسم نهاية", note: "بعض العناصر مثل img لا تحتاج وسم إغلاق؛ تعرّف عليها أثناء درس الصور." };
    if (/Attributes/.test(topic)) return { title: "الخاصية تضيف معلومة للوسم", flow: "اسم الخاصية=" + '"' + "القيمة" + '"' + " ⟶ تكتب داخل وسم البداية", note: "مثل href للرابط وsrc للصورة؛ اسم الخاصية وحده لا يكفي من دون قيمة." };
    if (/Headings/.test(topic)) return { title: "مستوى العنوان يعبّر عن ترتيب المحتوى", flow: "h1 للعنوان الأهم ⟶ h2 للقسم ⟶ h3 لتفصيل داخله", note: "اختار المستوى لمعناه في الصفحة، لا لحجم الخط فقط." };
    if (/Paragraphs/.test(topic)) return { title: "كل فقرة فكرة مستقلة", flow: "p ⟶ جملة أو فكرة ⟶ /p", note: "استخدم br لسطر جديد داخل الفكرة نفسها، وp عندما تبدأ فقرة جديدة." };
    if (/Styles/.test(topic)) return { title: "style يضيف تنسيقًا للعنصر", flow: "style ⟶ خاصية CSS ⟶ قيمة", note: "مثال: color يغيّر لون الحروف، وbackground-color يغيّر الخلفية." };
    if (/Formatting/.test(topic)) return { title: "بعض الوسوم توضّح معنى النص", flow: "strong ⟶ أهمية قوية　|　em ⟶ تأكيد", note: "اختار الوسم بحسب المعنى؛ المتصفح يضيف شكلًا افتراضيًا مناسبًا." };
    if (/Quotations/.test(topic)) return { title: "وسم الاقتباس يعرّف النص المنقول", flow: "q ⟶ اقتباس قصير داخل السطر　|　blockquote ⟶ اقتباس مستقل", note: "استخدم cite لذكر مصدر الاقتباس عندما تحتاج توثيقه." };
    if (/Comments/.test(topic)) return { title: "التعليق ملاحظة للمطوّر", flow: "<!-- ملاحظة --> ⟶ تبقى في الملف ⟶ لا تظهر كمحتوى", note: "اكتب تعليقًا يشرح السبب أو يترك تذكيرًا واضحًا لمن يقرأ الكود." };
    if (/Colors/.test(topic)) return { title: "لون النص والخلفية خاصيتان مختلفتان", flow: "color ⟶ لون النص　|　background-color ⟶ لون المساحة", note: "يمكن كتابة اللون باسمه أو بصيغة HEX أو RGB." };
    if (/CSS/.test(topic)) return { title: "CSS يفصل المظهر عن بنية المحتوى", flow: "HTML يحدد العنصر ⟶ CSS يختاره ⟶ قاعدة CSS تغيّر مظهره", note: "يمكن وضع CSS داخل style أو في ملف خارجي وربطه بالصفحة." };
    if (/Links/.test(topic)) return { title: "الرابط يحتاج وجهة", flow: "a ⟶ href يحدد الوجهة ⟶ النص يصبح قابلًا للضغط", note: "الوجهة قد تكون صفحة أخرى أو عنوانًا داخل الصفحة نفسها." };
    if (/Images/.test(topic)) return { title: "الصورة تحتاج مصدرًا ووصفًا بديلًا", flow: "img ⟶ src للصورة　|　alt لوصفها", note: "النص البديل يساعد من لا يرى الصورة، ويظهر إذا تعذر تحميلها." };
    if (/Tables/.test(topic)) return { title: "الجدول يجمع البيانات في صفوف", flow: "table ⟶ tr صف ⟶ th عنوان أو td خلية بيانات", note: "ابدأ برأس واضح، واجعل كل خلية مرتبطة بعمودها." };
    if (/Lists/.test(topic)) return { title: "القائمة تجمع عناصر متشابهة", flow: "ul قائمة نقطية　|　ol قائمة مرتبة　⟶ li لكل عنصر", note: "اختار ol عندما يهم ترتيب الخطوات، وul عندما لا يهم ترتيب العناصر." };
    if (/Forms|Input/.test(topic)) return { title: "النموذج يجمع مدخلات المستخدم", flow: "form ⟶ label يوضح المطلوب ⟶ input يستقبل القيمة", note: "اربط label بحقل واضح، ثم اختر نوع الإدخال المناسب للمعلومة." };
    if (/Block|Inline/.test(topic)) return { title: "العناصر تختلف في طريقة ظهورها", flow: "block ⟶ يبدأ سطرًا جديدًا　|　inline ⟶ يبقى ضمن السطر", note: "لاحظ المساحة التي يأخذها العنصر قبل اختيار طريقة ترتيبه." };
    if (/Class|Id/.test(topic)) return { title: "الاسم يساعدك على اختيار العنصر", flow: "class يمكن تكرارها ⟶ id يميز عنصرًا واحدًا في الصفحة", note: "استخدم الاسم نفسه في HTML وCSS حتى تصل القاعدة إلى العنصر المقصود." };
    if (/Semantic|Layout|Head|Title/.test(topic)) return { title: "العناصر تصف وظيفة الجزء", flow: "header ⟶ مقدمة　|　main ⟶ المحتوى الأساسي　|　footer ⟶ نهاية", note: "اختيار عنصر ذي معنى يجعل بنية الصفحة أوضح للمتصفح ولمن يقرأ الكود." };
    if (/Video|Audio|Media|YouTube/.test(topic)) return { title: "عنصر الوسائط يحدد الملف وطريقة تشغيله", flow: "عنصر media ⟶ مصدر الملف ⟶ controls للمستخدم", note: "جرّب تشغيلًا وإيقافًا، وتأكد أن الملف أو المصدر متاح للمتصفح." };
    if (/Canvas|SVG/.test(topic)) return { title: "الرسم له مساحة وطريقة وصف", flow: "canvas ⟶ رسم بأوامر JavaScript　|　SVG ⟶ أشكال موصوفة بعناصر", note: "ابدأ بشكل واحد بسيط، ثم أضف الإحداثيات أو الأبعاد خطوة خطوة." };
    return { title: "افهم وظيفة العنصر قبل كتابة تفاصيله", flow: topic.replace(/^HTML\s*/, "") + " ⟶ عنصر HTML ⟶ محتوى أو إعداد", note: "ارجع للمثال في المحرر وحدد السطر الذي يصف العنصر، ثم لاحظ أثره في الصفحة." };
  }

  function renderHtmlDetailGuide(lesson) {
    var detail = htmlLessonDetail(lesson);
    document.getElementById("guideTitle").textContent = detail.title;
    document.getElementById("guideCopy").textContent = detail.note;
    document.getElementById("guideVisual").innerHTML = '<div class="basic-structure"><b>' + escapeHtml(detail.flow) + '</b></div><div class="basic-hint">خطوة فهم قصيرة قبل السؤال والتطبيق.</div>';
    document.getElementById("guideActions").innerHTML = "";
    document.getElementById("guideNext").textContent = "جرّب سؤالًا سريعًا ←";
    document.getElementById("guideNext").disabled = false;
    setHtmlGuideProgress(3);
  }

  function renderHtmlLegacy(renderer, legacyStep, overallStep) {
    renderer(legacyStep);
    setHtmlGuideProgress(overallStep);
  }

  function normalizeRoadSearch(value) {
    return String(value || "").toLowerCase()
      .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
      .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي")
      .replace(/[_.\/-]+/g, " ")
      .replace(/\s+/g, " ").trim()
      .replace(/\bjavascript\b/g, "js");
  }

  function roadmapSearchText(topic) {
    var aliases = [];
    if (/asynchronous|async/i.test(topic)) aliases.push("async asynchronous غير متزامن غير متزامنة");
    if (/flex/i.test(topic)) aliases.push("flex flexbox المرونة");
    if (/forms?|input/i.test(topic)) aliases.push("form forms input inputs نموذج النماذج إدخال");
    if (/dom/i.test(topic)) aliases.push("dom document object model عناصر الصفحة");
    if (/events?/i.test(topic)) aliases.push("event events حدث أحداث");
    if (/grid/i.test(topic)) aliases.push("grid شبكة");
    if (/images?|gallery/i.test(topic)) aliases.push("image images صور الصور gallery معرض");
    if (/headings?/i.test(topic)) aliases.push("heading headings عنوان عناوين");
    if (/loops?|iterations?|iterators?/i.test(topic)) aliases.push("loop loops iteration تكرار حلقات");
    if (/arrays?/i.test(topic)) aliases.push("array arrays مصفوفة مصفوفات");
    return normalizeRoadSearch(topic + " " + aliases.join(" "));
  }

  function roadmapTopicMatches(topic, query) {
    var searchable = roadmapSearchText(topic),
        terms = normalizeRoadSearch(query).split(" ").filter(Boolean);
    return terms.length > 0 && terms.every(function(term) { return searchable.indexOf(term) >= 0; });
  }

  function renderRoadmap() {
    if (course === "html") normalizeHtmlStep();
    if (course === "css" || course === "js") courseLessonSpec();
    var sequence = course === "html" ? htmlSequence : course === "css" ? cssSequence : jsSequence,
        tracked = course === "html" || course === "css" || course === "js",
        index = course === "html" ? (s.htmlLesson || 0) : course === "css" ? (s.cssLesson || 0) : (s.jsLesson || 0),
        step = course === "html" ? (s.htmlStep || 1) : course === "css" ? (s.cssStep || 1) : (s.jsStep || 1),
        doneLesson = course === "html" ? step === 6 : step === courseDoneStep(courseLessonSpec()),
        courseName = course === "html" ? "HTML" : course === "css" ? "CSS" : "JavaScript",
        searchInput = document.getElementById("roadSearch"),
        query = searchInput ? normalizeRoadSearch(searchInput.value) : "",
        matches = [], progressByCourse = {},
        sequences = { html: htmlSequence, css: cssSequence, js: jsSequence };
    document.getElementById("roadTitle").textContent = "خريطة " + courseName;
    document.getElementById("roadSubtitle").textContent = course === "html" ? "ترتيب دروس HTML" : "ترتيب الدروس حسب W3Schools · " + coursePhase(course, index);
    var completedInCourse = growth.completed.filter(function(id) { return id.indexOf(course + ":") === 0; }).length;
    document.getElementById("roadProgress").textContent = tracked
      ? ar(completedInCourse) + " / " + ar(sequence.length) + " مهارة عملية"
      : "ترتيب · " + ar(sequence.length) + " موضوع";
    document.getElementById("roadMoreTitle").textContent = "عرض بقية ترتيب " + courseName;
    function progressFor(key) {
      if (!progressByCourse[key]) {
        var lessonIndex = key === "html" ? (s.htmlLesson || 0) : (s[key + "Lesson"] || 0),
            lessonStep = key === "html" ? (s.htmlStep || 1) : (s[key + "Step"] || 1),
            isDone = growthLessonDone(lessonId(key, lessonIndex)) || (key === "html" ? lessonStep === 6 : lessonStep === courseDoneStep(courseLessonSpecFor(key)));
        progressByCourse[key] = { index: lessonIndex, done: isDone };
      }
      return progressByCourse[key];
    }
    function item(key, i) {
      var listForCourse = sequences[key], progress = progressFor(key),
          done = growthLessonDone(lessonId(key, i)) || i < progress.index,
          current = i === progress.index && !growthLessonDone(lessonId(key, i)),
          status = growthLessonDone(lessonId(key, i)) ? "مهارة مكتملة" : done ? "مررت عليها" : current ? "أنت هنا" : i === progress.index + 1 ? "التالي" : "قادم",
          cl = done ? "done" : current ? "current" : "";
      return '<button class="roaditem ' + cl + '" type="button" data-road-course="' + key + '" data-road-index="' + i + '"><span class="num">' + (done ? "✓" : ar(i + 1)) + '</span><b>' + escapeHtml(listForCourse[i]) + '</b><em>' + status + '</em></button>';
    }
    function list(key, from, to) {
      var listForCourse = sequences[key];
      var html = "", previous = "";
      for (var i = from; i < to; i++) {
        var phase = coursePhase(key, i);
        if (phase !== previous) html += '<div class="roadgroup">' + escapeHtml(phase) + '</div>';
        html += item(key, i);
        previous = phase;
      }
      return html;
    }
    var roadmapDetails = document.getElementById("roadmap"),
        roadList = document.getElementById("roadList"),
        roadSearchStatus = document.getElementById("roadSearchStatus"),
        clearSearch = document.getElementById("clearRoadSearch"),
        courseFilter = document.getElementById("roadCourseFilter");
    if (clearSearch) clearSearch.hidden = !query;
    if (courseFilter) {
      courseFilter.hidden = !query;
      courseFilter.value = roadFilterCourse;
    }
    if (query) {
      document.getElementById("roadTitle").textContent = "بحث في كل المسارات";
      document.getElementById("roadSubtitle").textContent = "HTML · CSS · JavaScript · " + ar(htmlSequence.length + cssSequence.length + jsSequence.length) + " موضوع";
      Object.keys(sequences).forEach(function(key) {
        if (roadFilterCourse !== "all" && roadFilterCourse !== key) return;
        sequences[key].forEach(function(topic, i) {
          if (roadmapTopicMatches(topic, query)) matches.push({ course: key, index: i });
        });
      });
      roadmapDetails.hidden = true;
      roadList.innerHTML = matches.length ? listMatches(matches) : '<div class="road-empty">لم نجد موضوعًا بهذا الاسم. جرب كلمة أقصر.</div>';
      var filterName = roadFilterCourse === "all" ? "كل المسارات" : roadFilterCourse === "js" ? "JavaScript" : roadFilterCourse.toUpperCase();
      roadSearchStatus.textContent = "" + ar(matches.length) + " نتيجة في " + filterName + " · من " + ar(htmlSequence.length + cssSequence.length + jsSequence.length) + " موضوع";
    } else {
      document.getElementById("roadTitle").textContent = "خريطة " + courseName;
      document.getElementById("roadSubtitle").textContent = course === "html" ? "ترتيب دروس HTML" : "ترتيب الدروس حسب W3Schools · " + coursePhase(course, index);
      roadmapDetails.hidden = false;
      roadList.innerHTML = list(course, 0, Math.min(8, sequence.length));
      document.getElementById("roadMore").innerHTML = list(course, 8, sequence.length);
      roadSearchStatus.textContent = "";
    }
    document.getElementById("htmlCourseCount").textContent = "HTML · " + ar(htmlSequence.length) + " موضوع";
    document.getElementById("cssCourseCount").textContent = "CSS · " + ar(cssSequence.length) + " موضوع";
    document.getElementById("jsCourseCount").textContent = "JavaScript · " + ar(jsSequence.length) + " موضوع";

    function listMatches(items) {
      var html = "", previous = "";
      items.forEach(function(match) {
        var group = (match.course === "html" ? "HTML" : match.course === "css" ? "CSS" : "JavaScript") + " · " + coursePhase(match.course, match.index);
        if (group !== previous) html += '<div class="roadgroup">' + escapeHtml(group) + '</div>';
        html += item(match.course, match.index);
        previous = group;
      });
      return html;
    }
  }

  function courseLessonSpecFor(key) {
    var sequence = key === "css" ? cssSequence : jsSequence,
        index = Math.max(0, Math.min(Math.floor(s[key + "Lesson"] || 0), sequence.length - 1)),
        spec = key === "css" ? cssLessonSpec(sequence[index], index) : jsLessonSpec(sequence[index], index);
    spec.details = courseLessonDetails(spec, key);
    return spec;
  }

  function openRoadTopic(key, index) {
    var lessonKey = key + "Lesson";
    if (typeof growth.drafts[lessonId(key, index)] !== "string") s[key + "Code"] = "";
    if (key === "html") {
      s.htmlLesson = index;
      s.htmlStep = 3;
      s.htmlStepVersion = 2;
    } else {
      s[lessonKey] = index;
      s[key + "Step"] = 1;
      s[key + "StepVersion"] = 2;
    }
    save();
    select(key);
    document.getElementById("lesson").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function coursePhase(key, index) {
    if (key === "css") {
      if (index >= cssSequence.indexOf("CSS Responsive Intro")) return "التصميم المتجاوب · CSS Responsive";
      if (index >= cssSequence.indexOf("CSS Grid Intro")) return "الشبكة · CSS Grid";
      if (index >= cssSequence.indexOf("CSS Flexbox Intro")) return "المرونة · CSS Flexbox";
      if (index >= cssSequence.indexOf("CSS Advanced: Rounded Corners")) return "التنسيق المتقدم · CSS Advanced";
      return "الأساسيات · CSS Fundamentals";
    }
    if (key === "js") {
      if (index >= jsSequence.indexOf("JS AJAX")) return "تقنيات أقدم · Old Technologies";
      if (index >= jsSequence.indexOf("JS Temporal")) return "الموضوعات المتقدمة · JavaScript Advanced";
      if (index >= jsSequence.indexOf("JS Window API")) return "واجهات المتصفح · JavaScript Web APIs";
      if (index >= jsSequence.indexOf("JS HTML DOM")) return "عناصر الصفحة · JavaScript HTML DOM";
      return "الأساسيات · JavaScript Tutorial";
    }
    return "HTML Tutorial";
  }

  function renderEditorsGuide(step) {
    document.getElementById("title").textContent = "HTML Editors: اكتب وشوف النتيجة";
    document.getElementById("sub").textContent = "نتعلم دورة بسيطة: تعديل، تشغيل، ملاحظة.";
    document.getElementById("level").textContent = "HTML Editors · درس ٢";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Editors · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "المحرر مكان التجربة";
      copy.textContent = "هنا نكتب أو نعدّل الكود. والمعاينة تعرض أثر التعديل.";
      visual.innerHTML = '<div class="editor-visual"><span>✎ محرر الكود</span><span>◉ المعاينة</span></div>';
      next.textContent = "شوف العلاقة بينهم ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "تغيير صغير يغيّر النتيجة";
      copy.textContent = "استبدل كلمة العنوان بعبارة أخرى، شغّل، ثم قارن المعاينة.";
      visual.innerHTML = '<div class="mini-code">&lt;h1&gt;عنوان&lt;/h1&gt;</div><div class="arrow-note">تعديل ← تشغيل ← ملاحظة</div>';
      next.textContent = "تمام، سؤال سريع ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "أين تظهر نتيجة التشغيل؟";
      copy.textContent = "لو غيّرت العنوان وضغطت تشغيل، فين تشوف التغيير؟";
      visual.innerHTML = '<div class="editor-visual"><span>محرر الكود</span><span>المعاينة</span></div>';
      actions.innerHTML = '<button type="button" data-editor-answer="preview">في المعاينة</button><button type="button" data-editor-answer="file">في اسم الملف</button>' +
        (s.htmlEditorQuiz ? '<p class="guide-feedback">' + (s.htmlEditorQuizCorrect ? "بالضبط؛ المعاينة تورّيك أثر الكود." : "قريب؛ شغّل المثال ثم لاحظ النتيجة في المعاينة.") + '</p>' : "");
      actions.querySelectorAll("[data-editor-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlEditorQuiz = true;
          s.htmlEditorQuizCorrect = b.dataset.editorAnswer === "preview";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "يلا نطبّق بنفسك ←";
      next.disabled = !s.htmlEditorQuiz;
    } else if (step === 4) {
      title.textContent = "دورك: غيّر كلمة واحدة";
      copy.textContent = "اكتب عنوانًا مختلفًا في المحرر، واضغط شغّل لتراه في المعاينة.";
      visual.innerHTML = '<div class="mini-code">&lt;h1&gt;عنوان التجربة&lt;/h1&gt;</div><div class="arrow-note">مش محتاج تكتب الوسم؛ غيّر النص فقط.</div>';
      next.textContent = "افتح المحرر وابدأ ←";
      next.disabled = false;
    } else {
      title.textContent = "أنت جرّبت دورة المحرر";
      copy.textContent = "عدّلت، شغّلت، وشفت النتيجة. المحطة التالية حسب الترتيب: HTML Basic.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 خطوة اكتملت</b><span>صارت عندك طريقة عملية لاختبار أي مثال.</span></div>';
      next.textContent = "شوف المحطة التالية في الخريطة ←";
      next.disabled = false;
    }
  }

  function beginEditors() {
    s.htmlLesson = 1;
    s.htmlStep = 1;
    s.htmlEditorQuiz = false;
    s.htmlEditorDraft = "<h1>عنوان التجربة</h1>\n<p>شاهد أثر تعديلك.</p>";
    s.htmlCode = s.htmlEditorDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function beginBasic() {
    s.htmlLesson = 2;
    s.htmlStep = 1;
    s.htmlBasicQuiz = false;
    s.htmlBasicDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>صفحتي الأولى</title>\n</head>\n<body>\n  <h1>عنوان التجربة</h1>\n  <p>هذه أول صفحة HTML لي.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlBasicDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderBasicGuide(step) {
    document.getElementById("title").textContent = "HTML Basic: أول مستند كامل";
    document.getElementById("sub").textContent = "نرتّب الهيكل، ثم نغيّر جزءًا ونشوف النتيجة.";
    document.getElementById("level").textContent = "HTML Basic · درس ٣";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Basic · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "كل صفحة لها هيكل بسيط";
      copy.textContent = "html يجمع الصفحة، head لمعلوماتها، وbody للمحتوى اللي يظهر.";
      visual.innerHTML = '<div class="basic-structure"><div><span class="key">&lt;html&gt;</span></div><div class="indent"><span class="key">&lt;head&gt;</span> <span class="comment">معلومات الصفحة</span> <span class="key">&lt;/head&gt;</span></div><div class="indent"><span class="key">&lt;body&gt;</span> <span class="comment">المحتوى الظاهر</span> <span class="key">&lt;/body&gt;</span></div><div><span class="key">&lt;/html&gt;</span></div></div>';
      next.textContent = "نشوف مين يظهر للزائر ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "المتصفح يعرض محتوى body";
      copy.textContent = "العنوان اللي تراه داخل الصفحة والفقرة مكانهما body. أما title فيظهر على لسان التبويب.";
      visual.innerHTML = '<div class="basic-preview"><span>head → لسان التبويب</span><b>body → عنوان وفقرة</b></div><div class="basic-hint">معلومة للصفحة　←　محتوى للزائر</div>';
      next.textContent = "سؤال صغير ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "اختيار سريع";
      copy.textContent = "لو عايزين عنوانًا يظهر داخل الصفحة، نضعه فين؟";
      visual.innerHTML = '<div class="basic-preview"><span>&lt;head&gt;</span><b>&lt;body&gt;</b></div>';
      actions.innerHTML = '<button type="button" data-basic-answer="head">داخل head</button><button type="button" data-basic-answer="body">داخل body</button>' +
        (s.htmlBasicQuiz ? '<p class="guide-feedback">' + (s.htmlBasicQuizCorrect ? "بالضبط؛ body يحمل المحتوى الظاهر." : "قريب؛ body هو الجزء الذي يعرض محتوى الصفحة.") + '</p>' : "");
      actions.querySelectorAll("[data-basic-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlBasicQuiz = true;
          s.htmlBasicQuizCorrect = b.dataset.basicAnswer === "body";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "يلا نطبّق ←";
      next.disabled = !s.htmlBasicQuiz;
    } else if (step === 4) {
      title.textContent = "صفحتك الأولى جاهزة للتعديل";
      copy.textContent = "اكتب عنوانًا لصفحتك في السطر الأول، ثم شغّل المستند.";
      visual.innerHTML = '<div class="basic-structure"><span class="key">&lt;h1&gt;</span>عنوان التجربة<span class="key">&lt;/h1&gt;</span></div>';
      next.textContent = "افتح المحرر وغيّر كلمة ←";
      next.disabled = false;
    } else {
      title.textContent = "هيكل صفحة كاملة اشتغل!";
      copy.textContent = "عرفت مكان معلومات الصفحة ومحتواها. المحطة التالية: نفهم عناصر HTML عن قرب.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Basic اكتمل</b><span>صفحة فيها head وbody وعنوان وفقرة.</span></div>';
      next.textContent = "المحطة التالية: HTML Elements ←";
      next.disabled = false;
    }
  }

  function beginElements() {
    s.htmlLesson = 3;
    s.htmlStep = 1;
    s.htmlElementQuiz = false;
    s.htmlElementDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>عناصر صفحتي</title>\n</head>\n<body>\n  <h1>عنوان تجريبي</h1>\n  <p>فقرة أولى<br>وسطر جديد داخل الفقرة.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlElementDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderElementsGuide(step) {
    document.getElementById("title").textContent = "HTML Elements: العنصر كاملًا";
    document.getElementById("sub").textContent = "نميّز الوسم عن العنصر، ثم نرى عناصر داخل عناصر.";
    document.getElementById("level").textContent = "HTML Elements · درس ٤";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Elements · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "العنصر أكبر من الوسم";
      copy.textContent = "الوسم بداية أو نهاية. العنصر كاملًا يجمع البداية والمحتوى والنهاية.";
      visual.innerHTML = '<div class="element-demo"><span class="tag">&lt;p&gt;</span><span class="content">نص الفقرة</span><span class="tag">&lt;/p&gt;</span></div><div class="element-note">بداية　+　محتوى　+　نهاية　=　عنصر كامل</div>';
      next.textContent = "فكّك المثال ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "العناصر ممكن تكون متداخلة";
      copy.textContent = "body يحتوي عناصر أخرى. هنا h1 عنوان، وp فقرة؛ وكل واحد عنصر مستقل.";
      visual.innerHTML = '<div class="basic-structure"><div><span class="key">&lt;body&gt;</span></div><div class="indent"><span class="key">&lt;h1&gt;</span> عنوان <span class="key">&lt;/h1&gt;</span></div><div class="indent"><span class="key">&lt;p&gt;</span> فقرة <span class="key">&lt;/p&gt;</span></div><div><span class="key">&lt;/body&gt;</span></div></div>';
      next.textContent = "سؤال عن العنصر الكامل ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "أي اختيار يمثل عنصرًا كاملًا؟";
      copy.textContent = "اختار المثال الذي يجمع الوسم والمحتوى ووسم النهاية.";
      visual.innerHTML = '<div class="element-demo"><span class="content">&lt;p&gt;أهلًا&lt;/p&gt;</span></div>';
      actions.innerHTML = '<button type="button" data-element-answer="tag">&lt;p&gt; فقط</button><button type="button" data-element-answer="full">&lt;p&gt;أهلًا&lt;/p&gt;</button>' +
        (s.htmlElementQuiz ? '<p class="guide-feedback">' + (s.htmlElementQuizCorrect ? "بالضبط؛ العنصر يشمل البداية والمحتوى والنهاية." : "قريب؛ &lt;p&gt; وحده بداية الوسم فقط. أضف المحتوى ووسم النهاية ليكتمل العنصر.") + '</p>' : "");
      actions.querySelectorAll("[data-element-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlElementQuiz = true;
          s.htmlElementQuizCorrect = b.dataset.elementAnswer === "full";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "نطبّق على مثال حقيقي ←";
      next.disabled = !s.htmlElementQuiz;
    } else if (step === 4) {
      title.textContent = "راقب عنصرًا فارغًا";
      copy.textContent = "استبدل «عنوان تجريبي» بعنوان قصير من اختيارك. شغّل ولاحظ أثر br في السطر.";
      visual.innerHTML = '<div class="element-demo"><span class="tag">&lt;br&gt;</span><span class="content">فاصل سطر، بلا محتوى أو وسم إغلاق</span></div>';
      next.textContent = "افتح المحرر وعدّل العنوان ←";
      next.disabled = false;
    } else {
      title.textContent = "أصبحت العناصر أكثر وضوحًا";
      copy.textContent = "ميّزت العنصر الكامل عن الوسم، وشفت عنصرًا فارغًا. المحطة التالية: HTML Attributes.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Elements اكتمل</b><span>العنوان والفقرة وbr ظهرت في المعاينة.</span></div>';
      next.textContent = "شوف HTML Attributes في الخريطة ←";
      next.disabled = false;
    }
  }

  function beginAttributes() {
    s.htmlLesson = 4;
    s.htmlStep = 1;
    s.htmlAttributeQuiz = false;
    s.htmlAttributeDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>رابط صفحتي</title>\n</head>\n<body>\n  <h1>رحلة قصيرة</h1>\n  <p><a href="#details" title="انتقل للمعلومة">اقرأ المعلومة</a></p>\n  <p id="details">وصلت للمعلومة.</p>\n  <p id="welcome">أهلًا بك في الصفحة.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlAttributeDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderAttributesGuide(step) {
    document.getElementById("title").textContent = "HTML Attributes: معلومات إضافية للعنصر";
    document.getElementById("sub").textContent = "خاصية واحدة تغيّر وجهة الرابط؛ جرّبها بنفسك.";
    document.getElementById("level").textContent = "HTML Attributes · درس ٥";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Attributes · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "الرابط معه معلومة إضافية";
      copy.textContent = "العنصر <a> يصنع رابطًا. الخاصية داخله تخبر المتصفح إلى أين يأخذنا.";
      visual.innerHTML = '<div class="element-demo"><span class="tag">&lt;a&gt;</span><span class="content">رابط</span><span class="tag">وجهة ← معلومة إضافية</span></div><div class="element-note">العنصر يحدد النوع، والخاصية تضيف تفاصيل</div>';
      next.textContent = "شوف مكانها في السطر ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "اسم الخاصية وقيمتها";
      copy.textContent = 'في href="#details": href هو الاسم، و#details هي القيمة. كلاهما داخل وسم البداية.';
      visual.innerHTML = '<div class="basic-structure"><span class="key">&lt;a </span><span style="color:#f4c27a">href</span><span style="color:#d9eadb">=</span><span style="color:#b9d9f4">"#details"</span><span class="key">&gt;</span>اقرأ المعلومة<span class="key">&lt;/a&gt;</span></div><div class="basic-hint">اسم الخاصية = القيمة　داخل وسم البداية</div>';
      next.textContent = "اختبر مكان الخاصية ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "أين نكتب href؟";
      copy.textContent = "اختار المكان الذي يرى فيه المتصفح الخاصية.";
      visual.innerHTML = '<div class="element-demo"><span class="tag">&lt;a href="#details"&gt;</span><span class="content">اقرأ المعلومة</span><span class="tag">&lt;/a&gt;</span></div>';
      actions.innerHTML = '<button type="button" data-attribute-answer="opening">داخل وسم البداية</button><button type="button" data-attribute-answer="content">داخل النص الظاهر</button>' +
        (s.htmlAttributeQuiz ? '<p class="guide-feedback">' + (s.htmlAttributeQuizCorrect ? "صحيح؛ href تسكن داخل وسم البداية وتحدد الوجهة." : "ولا يهمك؛ ضع href داخل وسم البداية، قبل علامة &gt;.") + '</p>' : "");
      actions.querySelectorAll("[data-attribute-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlAttributeQuiz = true;
          s.htmlAttributeQuizCorrect = b.dataset.attributeAnswer === "opening";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "جرّب تغيير وجهة الرابط ←";
      next.disabled = !s.htmlAttributeQuiz;
    } else if (step === 4) {
      title.textContent = "غيّر الوجهة، واتبع الرابط";
      copy.textContent = "في المحرر بدّل قيمة href من #details إلى #welcome، ثم شغّل. اضغط الرابط في المعاينة ولاحظ أين ينقلك.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">قبل:</span> href="#details"<br><span class="comment">بعد:</span> href="#welcome"</div><div class="basic-hint">عدّل القيمة فقط؛ الوسم جاهز أمامك.</div>';
      next.textContent = "افتح المحرر وعدّل href ←";
      next.disabled = false;
    } else {
      title.textContent = "أنت وجّهت الرابط بنفسك";
      copy.textContent = "غيّرت قيمة خاصية وشاهدت أثرها. المحطة التالية: HTML Headings، ونتدرّب على مستويات العناوين.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Attributes اكتمل</b><span>href حدّدت الوجهة، وtitle أضاف وصفًا للرابط.</span></div>';
      next.textContent = "المحطة التالية: HTML Headings ←";
      next.disabled = false;
    }
  }

  function beginHeadings() {
    s.htmlLesson = 5;
    s.htmlStep = 1;
    s.htmlHeadingQuiz = false;
    s.htmlHeadingDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>يوم في مدينتي</title>\n</head>\n<body>\n  <h1>يوم في مدينتي</h1>\n  <h2>الحي القديم</h2>\n  <h3>المكتبة الصغيرة</h3>\n  <p>مكان هادئ أقرأ فيه وأتعلم.</p>\n  <h2>أماكن أخرى</h2>\n</body>\n</html>';
    s.htmlCode = s.htmlHeadingDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderHeadingsGuide(step) {
    document.getElementById("title").textContent = "HTML Headings: عناوين توضّح ترتيب الصفحة";
    document.getElementById("sub").textContent = "اختار مستوى العنوان حسب مكانه، وشوف الفرق في المعاينة.";
    document.getElementById("level").textContent = "HTML Headings · درس ٦";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Headings · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "للعناوين ستة مستويات";
      copy.textContent = "ابدأ بـ h1 للعنوان الأهم، ثم تتدرج المستويات حتى h6 للأقل أهمية.";
      visual.innerHTML = '<div class="basic-preview"><b>&lt;h1&gt; رئيسي</b><span>&lt;h2&gt; قسم</span><span>&lt;h3&gt; فرعي</span><span>&lt;h4&gt;</span><span>&lt;h5&gt;</span><span>&lt;h6&gt;</span></div><div class="basic-hint">كلما زاد الرقم، صار المستوى أقل أهمية.</div>';
      next.textContent = "رتّب مثالًا بسيطًا ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "العنوان يرسم خريطة المحتوى";
      copy.textContent = "h1 عنوان الصفحة، وh2 لقسم رئيسي، وh3 لتفصيل داخل القسم. اختار المستوى لمعناه، مش لمجرد تكبير الخط.";
      visual.innerHTML = '<div class="basic-structure"><div><span class="key">&lt;h1&gt;</span> عنوان الصفحة</div><div class="indent"><span class="key">&lt;h2&gt;</span> قسم</div><div class="indent" style="padding-left:30px"><span class="key">&lt;h3&gt;</span> عنوان فرعي داخل القسم</div></div>';
      next.textContent = "جاوب عن مستوى واحد ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "عنوان داخل قسم موجود";
      copy.textContent = "عندك صفحة، وداخلها قسم اسمه «الحي القديم». عنوان المكتبة تحته مباشرة؛ أي مستوى يناسبه؟";
      visual.innerHTML = '<div class="basic-preview"><b>h1 · يوم في مدينتي</b><span>h2 · الحي القديم</span><span>؟ · المكتبة الصغيرة</span></div>';
      actions.innerHTML = '<button type="button" data-heading-answer="h2">h2 · قسم بمستوى الحي</button><button type="button" data-heading-answer="h3">h3 · عنوان فرعي داخله</button>' +
        (s.htmlHeadingQuiz ? '<p class="guide-feedback">' + (s.htmlHeadingQuizCorrect ? "مظبوط؛ المكتبة تفصيل داخل قسم الحي، لذلك h3 مناسب." : "قريب؛ المكتبة تفصيل تحت «الحي القديم»، فاختار h3.") + '</p>' : "");
      actions.querySelectorAll("[data-heading-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlHeadingQuiz = true;
          s.htmlHeadingQuizCorrect = b.dataset.headingAnswer === "h3";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "خلّي المكتبة قسمًا مستقلًا ←";
      next.disabled = !s.htmlHeadingQuiz;
    } else if (step === 4) {
      title.textContent = "غيّر مستوى عنوان واحد";
      copy.textContent = "المكتبة في المثال أصبحت قسمًا مستقلًا مثل «الحي القديم». غيّر h3 إلى h2 في بداية عنوان المكتبة ونهايته، ثم شغّل وقارن.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">الموجود:</span> &lt;h3&gt;المكتبة الصغيرة&lt;/h3&gt;<br><span class="comment">المطلوب:</span> &lt;h2&gt;المكتبة الصغيرة&lt;/h2&gt;</div><div class="basic-hint">بدّل الرقم في الوسمين فقط؛ بقية الصفحة جاهزة.</div>';
      next.textContent = "افتح المحرر وعدّل المستوى ←";
      next.disabled = false;
    } else {
      title.textContent = "رتّبت العناوين بنفسك";
      copy.textContent = "شفت كيف يغيّر مستوى h2 شكل العنوان ومكانه في ترتيب الصفحة. المحطة التالية: HTML Paragraphs.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Headings اكتمل</b><span>ميّزت عنوان الصفحة والقسم والتفصيل.</span></div>';
      next.textContent = "المحطة التالية: HTML Paragraphs ←";
      next.disabled = false;
    }
  }

  function beginParagraphs() {
    s.htmlLesson = 6;
    s.htmlStep = 1;
    s.htmlParagraphQuiz = false;
    s.htmlParagraphDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>يوم تصوير صغير</title>\n</head>\n<body>\n  <h1>يوم تصوير صغير</h1>\n  <p>بدأت اليوم بتصوير الشروق.</p>\n  <p>بعدها التقطت صورًا للأشجار.</p>\n  <hr>\n  <p>في الرحلة القادمة<br>سأجرب تصوير القمر.</p>\n  <pre>قائمة اللقطات:\nالشروق\nالأشجار\nالسماء</pre>\n</body>\n</html>';
    s.htmlCode = s.htmlParagraphDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderParagraphsGuide(step) {
    document.getElementById("title").textContent = "HTML Paragraphs: قسّم الكلام لأفكار واضحة";
    document.getElementById("sub").textContent = "فقرة مستقلة، سطر جديد، وفاصل بين موضوعين: لكل واحد طريقة.";
    document.getElementById("level").textContent = "HTML Paragraphs · درس ٧";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Paragraphs · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "كل فكرة في فقرة";
      copy.textContent = "وسم <p> يحط الكلام في كتلة مستقلة. المتصفح يبدأها في سطر جديد ويترك مسافة حولها.";
      visual.innerHTML = '<div class="basic-structure"><div><span class="key">&lt;p&gt;</span> الفكرة الأولى <span class="key">&lt;/p&gt;</span></div><div><span class="key">&lt;p&gt;</span> فكرة جديدة <span class="key">&lt;/p&gt;</span></div></div><div class="basic-hint">وسم البداية + الكلام + وسم النهاية = فقرة</div>';
      next.textContent = "شوف ماذا يحدث للمسافات ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "سطر جديد في الكود لا يكفي";
      copy.textContent = "لو كسرت السطر داخل الفقرة أو كررت المسافات في المحرر، المتصفح غالبًا يعرضها كمسافة واحدة.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">في المحرر:</span><br>&lt;p&gt;أتعلم HTML،<br>وأجرب خطوة خطوة.&lt;/p&gt;</div><div class="basic-hint">المتصفح يجمع الكلام في الفقرة نفسها</div>';
      next.textContent = "فرّق بين فقرة وسطر ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "فكرة جديدة أم سطر جديد؟";
      copy.textContent = "عندك فكرة مستقلة وتريدها فقرة جديدة. أي وسم تختار؟";
      visual.innerHTML = '<div class="basic-preview"><span>&lt;p&gt; فقرة مستقلة</span><b>&lt;br&gt; سطر جديد داخل الفقرة</b></div>';
      actions.innerHTML = '<button type="button" data-paragraph-answer="p">&lt;p&gt; · فقرة مستقلة</button><button type="button" data-paragraph-answer="br">&lt;br&gt; · سطر داخل الفقرة</button>' +
        (s.htmlParagraphQuiz ? '<p class="guide-feedback">' + (s.htmlParagraphQuizCorrect ? "بالضبط؛ p يفصل الفكرة كفقرة جديدة، وbr ينزل لسطر داخل الفقرة." : "قريب؛ br لسطر داخل نفس الفقرة. للفكرة المستقلة استخدم p.") + '</p><div class="basic-hint">hr يفصل موضوعين، وpre يحافظ على الأسطر والمسافات.</div>' : "");
      actions.querySelectorAll("[data-paragraph-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlParagraphQuiz = true;
          s.htmlParagraphQuizCorrect = b.dataset.paragraphAnswer === "p";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "عدّل فقرة في المحرر ←";
      next.disabled = !s.htmlParagraphQuiz;
    } else if (step === 4) {
      title.textContent = "خلّي جملتك جزءًا من الصفحة";
      copy.textContent = "في المحرر استبدل جملة «بدأت اليوم بتصوير الشروق» بجملة من اختيارك، ثم شغّل. لاحظ الفقرات والفاصل والسطر الجديد والقائمة.";
      visual.innerHTML = '<div class="basic-structure"><span class="key">&lt;p&gt;</span> جملة من اختيارك <span class="key">&lt;/p&gt;</span><br><span class="comment">القالب فيه أيضًا hr وbr وpre للمقارنة.</span></div>';
      next.textContent = "افتح المحرر واكتب جملتك ←";
      next.disabled = false;
    } else {
      title.textContent = "كل جزء أخذ مكانه";
      copy.textContent = "استخدمت p لفكرة مستقلة، وشفت دور br وhr وpre. المحطة التالية: HTML Styles.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Paragraphs اكتمل</b><span>النص اتقسم، والمعاينة وضّحت الفرق بين الفقرة والسطر.</span></div>';
      next.textContent = "المحطة التالية: HTML Styles ←";
      next.disabled = false;
    }
  }

  function beginStyles() {
    s.htmlLesson = 7;
    s.htmlStep = 1;
    s.htmlStyleQuiz = false;
    s.htmlStyleDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>رحلتي للحديقة</title>\n</head>\n<body>\n  <h1 style="color:tomato; text-align:center;">رحلتي للحديقة</h1>\n  <p style="background-color:#eef6e8; font-size:18px;">الجو جميل، وقررت أتمشى بين الأشجار.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlStyleDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderStylesGuide(step) {
    document.getElementById("title").textContent = "HTML Styles: لمسة تغيّر شكل العنصر";
    document.getElementById("sub").textContent = "جرّب خاصية واحدة وشاهد شكلها في المعاينة فورًا.";
    document.getElementById("level").textContent = "HTML Styles · درس ٨";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Styles · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "الخاصية style تغيّر المظهر";
      copy.textContent = "نضع style داخل وسم البداية لإضافة لون أو حجم أو شكل للعنصر نفسه.";
      visual.innerHTML = '<div class="basic-structure"><span class="key">&lt;h1 style="color:tomato;"&gt;</span> عنوان ملوّن <span class="key">&lt;/h1&gt;</span></div><div class="basic-hint">الوسم يحدد العنصر، وstyle يضبط مظهره</div>';
      next.textContent = "افهم شكل القيمة ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "اسم الخاصية ثم قيمتها";
      copy.textContent = "داخل style نكتب خاصية CSS ثم نقطتين وقيمة، ونفصل التعليمات بفاصلة منقوطة.";
      visual.innerHTML = '<div class="basic-structure"><span class="key">style="</span><span style="color:#f4c27a">color</span>:<span style="color:#b9d9f4">tomato</span>; <span style="color:#f4c27a">font-size</span>:<span style="color:#b9d9f4">24px</span>;<span class="key">"</span></div><div class="basic-preview"><span>color · لون النص</span><span>background-color · لون الخلفية</span><span>font-family · نوع الخط</span><span>font-size · حجم النص</span><span>text-align · المحاذاة</span></div>';
      next.textContent = "سؤال عن لون النص ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "أي خاصية تغيّر لون الحروف؟";
      copy.textContent = "لو عايز العنوان نفسه يبقى أخضر، تختار أي خاصية؟";
      visual.innerHTML = '<div class="basic-preview"><b>color · لون الكتابة</b><span>background-color · خلفية العنصر</span></div>';
      actions.innerHTML = '<button type="button" data-style-answer="color">color</button><button type="button" data-style-answer="background-color">background-color</button>' +
        (s.htmlStyleQuiz ? '<p class="guide-feedback">' + (s.htmlStyleQuizCorrect ? "صحيح؛ color تغيّر لون الحروف، أما background-color فتغيّر الخلفية." : "قريب؛ background-color للخلفية. لون الحروف نضبطه بـ color.") + '</p>' : "");
      actions.querySelectorAll("[data-style-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlStyleQuiz = true;
          s.htmlStyleQuizCorrect = b.dataset.styleAnswer === "color";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "بدّل لون عنوانك ←";
      next.disabled = !s.htmlStyleQuiz;
    } else if (step === 4) {
      title.textContent = "اختار لونًا جديدًا للعنوان";
      copy.textContent = "في المحرر بدّل tomato إلى darkgreen داخل color في سطر h1، ثم شغّل وشاهد التغيير.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">قبل:</span> color:tomato;<br><span class="comment">بعد:</span> color:darkgreen;</div><div class="basic-hint">غيّر قيمة واحدة؛ باقي التنسيق جاهز للتجربة.</div>';
      next.textContent = "افتح المحرر وغيّر اللون ←";
      next.disabled = false;
    } else {
      title.textContent = "لونت العنصر بنفسك";
      copy.textContent = "جرّبت style، وشفت الفرق بين لون النص والخلفية. المحطة التالية: HTML Formatting.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Styles اكتمل</b><span>color غيّرت الكتابة؛ وfont-family وfont-size وtext-align تضبط الخط والحجم والمحاذاة.</span></div>';
      next.textContent = "المحطة التالية: HTML Formatting ←";
      next.disabled = false;
    }
  }

  function beginFormatting() {
    s.htmlLesson = 8;
    s.htmlStep = 1;
    s.htmlFormattingQuiz = false;
    s.htmlFormattingDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>ملاحظات المصوّر</title>\n</head>\n<body>\n  <h1>ملاحظات المصوّر</h1>\n  <p>قبل الإغلاق: <b>احفظ المشروع</b>.</p>\n  <p>كلمة تستحق التذكّر: <mark>الضوء</mark>.</p>\n  <p>السعر القديم <del>١٠٠</del> والجديد <ins>٨٠</ins>.</p>\n  <p>الماء H<sub>2</sub>O، ومساحة المربع ٣<sup>2</sup>.</p>\n  <p><small>ملاحظة قصيرة للمرة القادمة.</small></p>\n</body>\n</html>';
    s.htmlCode = s.htmlFormattingDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderFormattingGuide(step) {
    document.getElementById("title").textContent = "HTML Formatting: أبرز الكلمة المناسبة";
    document.getElementById("sub").textContent = "وسوم صغيرة تغيّر عرض النص أو توضّح معناه.";
    document.getElementById("level").textContent = "HTML Formatting · درس ٩";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Formatting · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "الكلمة لها شكل أو أهمية";
      copy.textContent = "b يجعل النص عريضًا. strong يوضح أن الكلام مهم، وغالبًا يظهر هو أيضًا عريضًا.";
      visual.innerHTML = '<div class="basic-preview"><span><b>b · عريض</b></span><b>strong · مهم وعريض</b></div><div class="basic-hint">الشكل قد يتشابه، لكن معنى الوسم يختلف.</div>';
      next.textContent = "شوف أشكالًا أخرى ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "اختار الوسم حسب وظيفة الكلمة";
      copy.textContent = "em للتأكيد، وi لصوت أو مصطلح مختلف. mark تمييز، del حذف، ins إضافة، وsub وsup للأرقام أسفل أو أعلى السطر.";
      visual.innerHTML = '<div class="basic-preview"><span><em>تأكيد</em> · <i>مصطلح</i></span><span><mark>مهم</mark> · <del>قديم</del> <ins>جديد</ins></span><b>H<sub>2</sub>O · ٣<sup>2</sup></b><span><small>نص أصغر</small></span></div>';
      next.textContent = "اختبر معنى strong ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "معلومة مهمة للقارئ";
      copy.textContent = "تريد توضيح أن «احفظ المشروع» أمر مهم. أي وسم يضيف معنى الأهمية، وليس مجرد شكل عريض؟";
      visual.innerHTML = '<div class="basic-preview"><span>&lt;b&gt; شكل عريض</span><b>&lt;strong&gt; أهمية ومعها غالبًا عريض</b></div>';
      actions.innerHTML = '<button type="button" data-format-answer="b">b · عريض فقط</button><button type="button" data-format-answer="strong">strong · مهم</button>' +
        (s.htmlFormattingQuiz ? '<p class="guide-feedback">' + (s.htmlFormattingQuizCorrect ? "صحيح؛ strong يوصل أهمية العبارة، وb يغيّر شكلها فقط." : "قريب؛ b للعريض فقط. strong يضيف معنى الأهمية.") + '</p>' : "");
      actions.querySelectorAll("[data-format-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlFormattingQuiz = true;
          s.htmlFormattingQuizCorrect = b.dataset.formatAnswer === "strong";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "حدّث الوسم في مثال جاهز ←";
      next.disabled = !s.htmlFormattingQuiz;
    } else if (step === 4) {
      title.textContent = "خلّي التذكير مهمًا فعلًا";
      copy.textContent = "في المحرر بدّل b إلى strong في وسمَي البداية والنهاية حول «احفظ المشروع»، ثم شغّل ولاحظ أن العبارة ما زالت عريضة.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">قبل:</span> &lt;b&gt;احفظ المشروع&lt;/b&gt;<br><span class="comment">بعد:</span> &lt;strong&gt;احفظ المشروع&lt;/strong&gt;</div><div class="basic-hint">بدّل اسم الوسم فقط؛ بقية الأمثلة تريك باقي التنسيقات.</div>';
      next.textContent = "افتح المحرر وبدّل الوسم ←";
      next.disabled = false;
    } else {
      title.textContent = "اخترت الوسم الذي يعبّر عن المعنى";
      copy.textContent = "فرّقت بين b للشكل وstrong للأهمية، وشاهدت تمييز الكلمات والحذف والإضافة والأرقام.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Formatting اكتمل</b><span>وسم مناسب يشرح للقارئ لماذا تبرز الكلمة.</span></div>';
      next.textContent = "تابع إلى HTML Quotations ←";
      next.disabled = false;
    }
  }

  function beginQuotations() {
    s.htmlLesson = 9;
    s.htmlStep = 1;
    s.htmlQuotationsQuiz = false;
    s.htmlQuotationsDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>ملاحظات من كتاب</title>\n</head>\n<body>\n  <h1>ملاحظات من كتاب</h1>\n  <p>أحب هذه العبارة: <q>ابدأ بخطوة صغيرة، ثم واصل.</q></p>\n  <p>ومن الكتاب:</p>\n  <blockquote cite="https://example.com/book">التعلّم يتحسن عندما نجرب ونلاحظ النتيجة.</blockquote>\n  <p><abbr title="HyperText Markup Language">HTML</abbr> لغة بناء صفحات الويب.</p>\n  <p>أقرأ <cite>رحلة إلى مركز الأرض</cite> لجول فيرن.</p>\n  <address>ملاحظة من: فريق التعلّم<br>example.com</address>\n  <p>اتجاه المصطلح: <bdo dir="ltr">HTML</bdo></p>\n</body>\n</html>';
    s.htmlCode = s.htmlQuotationsDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderQuotationsGuide(step) {
    document.getElementById("title").textContent = "HTML Quotations: كل اقتباس له مكان";
    document.getElementById("sub").textContent = "اقتباس قصير داخل الجملة، أو فقرة منقولة بشكل مستقل.";
    document.getElementById("level").textContent = "HTML Quotations · درس ١٠";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Quotations · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "اقتباس قصير أم فقرة كاملة؟";
      copy.textContent = "q يحيط بكلمات مقتبسة داخل الجملة، والمتصفح يضيف علامتي اقتباس. blockquote يضع كلامًا أطول في كتلة مستقلة.";
      visual.innerHTML = '<div class="basic-structure"><div>داخل الجملة: <span class="key">&lt;q&gt;</span>كلمات مقتبسة<span class="key">&lt;/q&gt;</span></div><div class="indent"><span class="key">&lt;blockquote&gt;</span>اقتباس مستقل من مصدر<span class="key">&lt;/blockquote&gt;</span></div></div><div class="basic-hint">blockquote غالبًا يظهر بمسافة بادئة.</div>';
      next.textContent = "شوف وسومًا مرتبطة ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "وسوم توضح المصدر والسياق";
      copy.textContent = "abbr يشرح اختصارًا عبر title، وcite يحدد عنوان عمل فني أو كتاب، وaddress لمعلومات التواصل، وbdo لتغيير اتجاه النص.";
      visual.innerHTML = '<div class="basic-preview"><span><abbr title="HyperText Markup Language">abbr · HTML</abbr></span><span><cite>cite · عنوان كتاب</cite></span><b>address · تواصل الكاتب</b><span><bdo dir="ltr">bdo · LTR</bdo></span></div><div class="basic-hint">في القالب الجاهز مثال لكل وسم.</div>';
      next.textContent = "اختار وسم الاقتباس القصير ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "كلمات مقتبسة وسط كلامك";
      copy.textContent = "لو الاقتباس قصير وجزء من الجملة، تختار أي وسم؟";
      visual.innerHTML = '<div class="basic-preview"><span>جملة قصيرة: &lt;q&gt;اقتباس&lt;/q&gt;</span><b>كتلة مستقلة: blockquote</b></div>';
      actions.innerHTML = '<button type="button" data-quotation-answer="q">q · اقتباس قصير</button><button type="button" data-quotation-answer="blockquote">blockquote · كتلة طويلة</button>' +
        (s.htmlQuotationsQuiz ? '<p class="guide-feedback">' + (s.htmlQuotationsQuizCorrect ? "صحيح؛ q يناسب الاقتباس القصير داخل الجملة." : "قريب؛ blockquote لكتلة مستقلة. الاقتباس القصير داخل الجملة يستخدم q.") + '</p>' : "");
      actions.querySelectorAll("[data-quotation-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlQuotationsQuiz = true;
          s.htmlQuotationsQuizCorrect = b.dataset.quotationAnswer === "q";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "عدّل الاقتباس في القالب ←";
      next.disabled = !s.htmlQuotationsQuiz;
    } else if (step === 4) {
      title.textContent = "اكتب اقتباسك القصير";
      copy.textContent = "في المحرر بدّل العبارة داخل q بجملة قصيرة تختارها، ثم شغّل. لاحظ علامات الاقتباس التي أضافها المتصفح.";
      visual.innerHTML = '<div class="basic-structure">&lt;q&gt;<span class="comment">عبارتك هنا</span>&lt;/q&gt;<br><span class="basic-hint">بدّل النص بين الوسمين فقط؛ جرب باقي الأمثلة في المعاينة.</span></div>';
      next.textContent = "افتح المحرر وبدّل العبارة ←";
      next.disabled = false;
    } else {
      title.textContent = "ميّزت الاقتباس ومصدره";
      copy.textContent = "استخدمت q للاقتباس القصير، وشاهدت blockquote والاختصار وعنوان العمل ومعلومات التواصل.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Quotations اكتمل</b><span>كل نوع معلومة أخذ الوسم الذي يصفها.</span></div>';
      next.textContent = "المحطة التالية: HTML Comments ←";
      next.disabled = false;
    }
  }

  function beginComments() {
    s.htmlLesson = 10;
    s.htmlStep = 1;
    s.htmlCommentsQuiz = false;
    s.htmlCommentsDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>صفحة التجربة</title>\n</head>\n<body>\n  <h1>صفحة التجربة</h1>\n  <!-- اكتب ملاحظة للمطور -->\n  <p>هذا النص يظهر للزائر.</p>\n  <!-- <p>هذا محتوى مخفي مؤقتًا.</p> -->\n  <p>التجربة مستمرة.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlCommentsDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderCommentsGuide(step) {
    document.getElementById("title").textContent = "HTML Comments: ملاحظة للمطوّر";
    document.getElementById("sub").textContent = "علّق داخل الكود، والمتصفح يترك الملاحظة خارج الصفحة المعروضة.";
    document.getElementById("level").textContent = "HTML Comments · درس ١١";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Comments · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "تعليق في الكود، لا في الصفحة";
      copy.textContent = "التعليق يشرح الكود أو يذكّرك بشيء. المتصفح لا يعرضه للزائر.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">&lt;!-- هذه ملاحظة للمطوّر --&gt;</span><br><span class="key">&lt;p&gt;</span> هذا نص ظاهر <span class="key">&lt;/p&gt;</span></div><div class="basic-hint">الأول يبقى في المصدر؛ الثاني يظهر في المعاينة.</div>';
      next.textContent = "تعرّف على طرفَي التعليق ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "افتح التعليق ثم أغلقه";
      copy.textContent = "علامة التعجب موجودة في بداية التعليق فقط، وليست في نهايته. كل ما بين الطرفين لا يظهر.";
      visual.innerHTML = '<div class="basic-structure"><span class="key">&lt;!--</span> ملاحظة أو كود مخفي <span class="key">--&gt;</span></div><div class="basic-hint">يمكنك تعليق سطر واحد أو عدة أسطر مؤقتًا.</div>';
      next.textContent = "تخيّل نتيجة الإخفاء ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "ماذا سيظهر للزائر؟";
      copy.textContent = "لو وضعنا فقرة كاملة بين بداية التعليق ونهايته، هل تراها في الصفحة؟";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">&lt;!-- &lt;p&gt;فقرة مخفية&lt;/p&gt; --&gt;</span></div>';
      actions.innerHTML = '<button type="button" data-comment-answer="shown">ستظهر الفقرة</button><button type="button" data-comment-answer="hidden">لن تظهر</button>' +
        (s.htmlCommentsQuiz ? '<p class="guide-feedback">' + (s.htmlCommentsQuizCorrect ? "بالضبط؛ كل ما بين علامتَي التعليق مخفي عن العرض." : "قريب؛ المتصفح يتجاهل المحتوى داخل التعليق فلا يعرضه.") + '</p>' : "");
      actions.querySelectorAll("[data-comment-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlCommentsQuiz = true;
          s.htmlCommentsQuizCorrect = b.dataset.commentAnswer === "hidden";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "اكتب ملاحظة صغيرة ←";
      next.disabled = !s.htmlCommentsQuiz;
    } else if (step === 4) {
      title.textContent = "اكتب تذكيرًا لنفسك";
      copy.textContent = "في المحرر بدّل «اكتب ملاحظة للمطور» داخل التعليق بملاحظة قصيرة، ثم شغّل. ستجدها في الكود فقط، بينما محتوى الصفحة يظهر كالمعتاد.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">&lt;!-- اكتب ملاحظة للمطور --&gt;</span><br><span class="basic-hint">بدّل نص الملاحظة؛ واترك علامتَي البداية والنهاية.</span></div>';
      next.textContent = "افتح المحرر واكتب تذكيرك ←";
      next.disabled = false;
    } else {
      title.textContent = "كتبت ملاحظة من غير ما تغيّر الصفحة";
      copy.textContent = "عرفت مكان التعليق، واستخدمته كتذكير. ويمكنك تعليق محتوى مؤقتًا أثناء مراجعة الصفحة.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Comments اكتمل</b><span>ملاحظتك في المصدر؛ والزائر يرى محتوى الصفحة فقط.</span></div>';
      next.textContent = "المحطة التالية: HTML Colors ←";
      next.disabled = false;
    }
  }

  function beginColors() {
    s.htmlLesson = 11;
    s.htmlStep = 1;
    s.htmlColorQuiz = false;
    s.htmlColorDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>ألوان صفحتي</title>\n</head>\n<body>\n  <h1 style="color:tomato; text-align:center;">ألوان صفحتي</h1>\n  <p style="background-color:#eef6e8; border:2px solid mediumseagreen;">أجرّب ألوانًا مختلفة على الصفحة.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlColorDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderColorsGuide(step) {
    document.getElementById("title").textContent = "HTML Colors: اللون له أكثر من طريقة";
    document.getElementById("sub").textContent = "اختار لونًا، وراقب أثره على النص والخلفية والحدود.";
    document.getElementById("level").textContent = "HTML Colors · درس ١٢";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Colors · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "اللون ممكن يكون له اسم";
      copy.textContent = "توجد أسماء ألوان جاهزة مثل Tomato وMediumSeaGreen. نستخدم اللون للنص أو الخلفية أو الحدود.";
      visual.innerHTML = '<div class="basic-preview"><b style="color:tomato">color · لون النص</b><span style="background-color:#eef6e8">background-color · الخلفية</span><span style="border:2px solid mediumseagreen">border-color · الحدود</span></div>';
      next.textContent = "قارن طرق كتابة اللون ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "اسم أو قيمة رقمية";
      copy.textContent = "Tomato له تمثيلات رقمية مثل rgb(255, 99, 71) و#ff6347 وhsl(9, 100%, 64%). كلها تشير إلى اللون نفسه.";
      visual.innerHTML = '<div class="basic-structure"><div><span class="comment">اسم:</span> Tomato</div><div><span class="comment">RGB:</span> rgb(255, 99, 71)</div><div><span class="comment">HEX:</span> #ff6347</div><div><span class="comment">HSL:</span> hsl(9, 100%, 64%)</div></div><div class="basic-hint">RGBA وHSLA تضيفان alpha للتحكم في الشفافية.</div>';
      next.textContent = "سؤال عن الشفافية ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "ماذا تضيف alpha؟";
      copy.textContent = "في rgba(255, 99, 71, 0.5)، الرقم الأخير يحدد شفافية اللون؛ 0.5 تعني شفافية 50%.";
      visual.innerHTML = '<div class="basic-preview"><span>RGB · لون كامل</span><b style="background-color:rgba(255,99,71,.5)">RGBA · لون شفاف</b></div>';
      actions.innerHTML = '<button type="button" data-color-answer="shade">درجة اللون</button><button type="button" data-color-answer="alpha">شفافية اللون</button>' +
        (s.htmlColorQuiz ? '<p class="guide-feedback">' + (s.htmlColorQuizCorrect ? "صحيح؛ alpha تضبط مقدار شفافية اللون." : "قريب؛ الرقم الأخير هنا هو alpha، ويحدد الشفافية.") + '</p>' : "");
      actions.querySelectorAll("[data-color-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlColorQuiz = true;
          s.htmlColorQuizCorrect = b.dataset.colorAnswer === "alpha";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "غيّر لون عنوانك ←";
      next.disabled = !s.htmlColorQuiz;
    } else if (step === 4) {
      title.textContent = "بدّل اسم اللون وشاهد الأثر";
      copy.textContent = "في المحرر بدّل tomato إلى mediumseagreen داخل color في سطر h1، ثم شغّل. لون النص سيتغيّر، بينما الخلفية والحدود تبقيان كما هما.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">قبل:</span> color:tomato;<br><span class="comment">بعد:</span> color:mediumseagreen;</div><div class="basic-hint">غيّر قيمة اللون فقط؛ شاهد كيف بقيت بقية الألوان.</div>';
      next.textContent = "افتح المحرر وبدّل اللون ←";
      next.disabled = false;
    } else {
      title.textContent = "لونت النص وقرأت القيم";
      copy.textContent = "جرّبت اسم لون، وتعرّفت على RGB وHEX وHSL والشفافية. المحطة التالية: HTML CSS.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Colors اكتمل</b><span>color للنص، background-color للخلفية، والحدود لها لون أيضًا.</span></div>';
      next.textContent = "المحطة التالية: HTML CSS ←";
      next.disabled = false;
    }
  }

  function beginCss() {
    s.htmlLesson = 12;
    s.htmlStep = 1;
    s.htmlCssQuiz = false;
    s.htmlCssDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>تنسيق صفحة الرحلة</title>\n  <style>\n    body { background-color: #f4f8ee; }\n    h1 { color: #1d664e; }\n    p { color: #526b55; border: 2px solid #d7e6d4; padding: 10px; margin: 10px 0; }\n  </style>\n</head>\n<body>\n  <h1>رحلة قصيرة</h1>\n  <p>زرنا الحديقة في الصباح.</p>\n  <p>جلسنا قرب الأشجار وقرأنا قليلًا.</p>\n</body>\n</html>';
    s.htmlCode = s.htmlCssDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderCssGuide(step) {
    document.getElementById("title").textContent = "HTML CSS: قاعدة تنسّق أكثر من عنصر";
    document.getElementById("sub").textContent = "نرتّب قواعد التنسيق في مكان واحد ونطبّقها على عناصر الصفحة.";
    document.getElementById("level").textContent = "HTML CSS · درس ١٣";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML CSS · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "نقلت التنسيق لمكان أوسع";
      copy.textContent = "بدل ما نكتب style داخل كل عنصر، نقدر نكتب قاعدة CSS مرة واحدة وتطبّقها على العناصر التي تختارها.";
      visual.innerHTML = '<div class="basic-structure"><div><span class="comment">قاعدة واحدة:</span> p { color: teal; }</div><div><span class="key">&lt;p&gt;</span> فقرة أولى</div><div><span class="key">&lt;p&gt;</span> فقرة ثانية</div></div><div class="basic-hint">نفس القاعدة تصل إلى الفقرتين.</div>';
      next.textContent = "شوف أماكن كتابة CSS ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "ثلاث طرق، وكل واحدة لها مكان";
      copy.textContent = "inline داخل style لعنصر واحد؛ internal داخل style في head لصفحة واحدة؛ external بوسم link لملف CSS يمكن ربطه بعدة صفحات.";
      visual.innerHTML = '<div class="basic-preview"><span><b>inline</b> · داخل العنصر</span><span><b>internal</b> · style داخل head</span><span><b>external</b> · ملف .css مرتبط بـ link</span></div><div class="basic-hint">في مثالنا نستخدم internal حتى ترى قاعدة الصفحة كاملة.</div>';
      next.textContent = "اختار طريقة لصفحة واحدة ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "لون كل الفقرات بهذه الصفحة";
      copy.textContent = "بدون إضافة style لكل فقرة، أين تضع قاعدة واحدة لتنسيق فقرات صفحة واحدة؟";
      visual.innerHTML = '<div class="basic-structure"><div class="key">&lt;head&gt;</div><div class="indent">&lt;style&gt;　قاعدة p　&lt;/style&gt;</div><div class="key">&lt;/head&gt;</div></div>';
      actions.innerHTML = '<button type="button" data-css-answer="inline">inline · داخل كل p</button><button type="button" data-css-answer="internal">internal · style في head</button>' +
        (s.htmlCssQuiz ? '<p class="guide-feedback">' + (s.htmlCssQuizCorrect ? "بالضبط؛ قاعدة internal واحدة تنسّق كل فقرات الصفحة." : "قريب؛ لتنسيق كل فقرات هذه الصفحة، ضع قاعدة p داخل style في head.") + '</p>' : "");
      actions.querySelectorAll("[data-css-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlCssQuiz = true;
          s.htmlCssQuizCorrect = b.dataset.cssAnswer === "internal";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "طبّق قاعدة على فقرتين ←";
      next.disabled = !s.htmlCssQuiz;
    } else if (step === 4) {
      title.textContent = "عدّل قاعدة واحدة";
      copy.textContent = "في المحرر غيّر color داخل قاعدة p من #526b55 إلى teal، ثم شغّل. لاحظ أن لون الفقرتين يتغير معًا.";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">المحدد:</span> p<br><span class="comment">الخاصية:</span> color<br><span class="comment">القيمة الجديدة:</span> teal</div><div class="basic-hint">لا تكرر القاعدة لكل فقرة؛ عدّل السطر الموجود داخل style.</div>';
      next.textContent = "افتح المحرر وعدّل قاعدة p ←";
      next.disabled = false;
    } else {
      title.textContent = "قاعدة واحدة نسّقت صفحتك";
      copy.textContent = "جرّبت CSS داخليًا في head، وشفت القاعدة تطبّق على أكثر من فقرة. المحطة التالية: HTML Links.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML CSS اكتمل</b><span>style للمظهر، وp يحدد العناصر التي تتأثر بالقاعدة.</span></div>';
      next.textContent = "المحطة التالية: HTML Links ←";
      next.disabled = false;
    }
  }

  function beginLinks() {
    s.htmlLesson = 13;
    s.htmlStep = 1;
    s.htmlLinkQuiz = false;
    s.htmlLinkDraft = '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>دليل الحديقة</title>\n  <style>\n    body { font-family: Arial, sans-serif; line-height: 1.8; padding: 20px; }\n    a { color: #146b55; font-weight: bold; }\n    #details { margin-top: 260px; padding: 16px; background: #edf6e9; border-radius: 12px; }\n    #details:target { outline: 3px solid #7aa77b; }\n  </style>\n</head>\n<body>\n  <h1 id="place">دليل الحديقة</h1>\n  <p>هذه صفحة قصيرة فيها نصيحة للزائر.</p>\n  <a href="#place">اقفز إلى نصيحة الزيارة</a>\n  <section id="details">\n    <h2>نصيحة الزيارة</h2>\n    <p>اختر وقتًا هادئًا، وخذ معك زجاجة ماء.</p>\n  </section>\n</body>\n</html>';
    s.htmlCode = s.htmlLinkDraft;
    save();
    document.getElementById("code").value = s.htmlCode;
    document.getElementById("preview").srcdoc = data.html.build(s.htmlCode);
    renderGuide();
    renderRoadmap();
    cheer();
  }

  function renderLinksGuide(step) {
    document.getElementById("title").textContent = "HTML Links: اربط النص بوجهة";
    document.getElementById("sub").textContent = "الرابط باب قابل للنقر؛ href يحدد المكان الذي نصل إليه.";
    document.getElementById("level").textContent = "HTML Links · درس ١٤";
    document.getElementById("filename").textContent = "index.html";
    var count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext");

    count.textContent = step === 5 ? "اكتمل الدرس · ٤ من ٤" : "HTML Links · خطوة " + ar(step) + " من ٤";
    meter.style.width = (step === 5 ? 100 : (step - 1) * 25) + "%";
    actions.innerHTML = "";

    if (step === 1) {
      title.textContent = "الرابط يجمع نصًا ووجهة";
      copy.textContent = "وسم <a> يحيط بالكلمة التي نضغطها، وhref يحمل العنوان الذي يذهب إليه المتصفح.";
      visual.innerHTML = '<div class="basic-structure"><span class="key">الكلمة القابلة للنقر</span>　⟶　<span class="comment">href = وجهة الرابط</span></div><div class="basic-hint">تخيّل الكلمة بابًا، وhref عنوان المكان خلفه.</div>';
      next.textContent = "تعرّف على أنواع الوجهات ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "اختار العنوان وطريقة الفتح";
      copy.textContent = "href=" + '"https://example.com"' + " لموقع كامل؛ href=" + '"about.html"' + " لملف قريب؛ وhref=" + '"#details"' + " لقسم داخل الصفحة. ويمكن أن يطلب target=" + '"_blank"' + " فتح الوجهة في تبويب جديد.";
      visual.innerHTML = '<div class="basic-preview"><span><b>https://...</b> · موقع كامل</span><span><b>about.html</b> · صفحة قريبة</span><span><b>#details</b> · مكان في الصفحة</span><span><b>target="_blank"</b> · تبويب جديد</span></div><div class="basic-hint">عنوان الرابط في href؛ وطريقة الفتح في target.</div>';
      next.textContent = "اختار وجهة داخل الصفحة ←";
      next.disabled = false;
    } else if (step === 3) {
      title.textContent = "أي عنوان يقفز لقسم داخل الصفحة؟";
      copy.textContent = "القسم اسمه details. اختر القيمة التي تربط الرابط به من دون الانتقال لموقع آخر.";
      visual.innerHTML = '<div class="element-demo"><span class="tag">رابط</span><span class="content">⟶</span><span class="tag">id="details"</span></div>';
      actions.innerHTML = '<button type="button" data-link-answer="#details">#details</button><button type="button" data-link-answer="https">https://example.com</button>' +
        (s.htmlLinkQuiz ? '<p class="guide-feedback">' + (s.htmlLinkQuizCorrect ? "تمام؛ #details يطابق id القسم داخل الصفحة." : "قريب؛ علامة # تشير إلى عنصر له id بالاسم نفسه.") + '</p>' : "");
      actions.querySelectorAll("[data-link-answer]").forEach(function(b) {
        b.onclick = function() {
          s.htmlLinkQuiz = true;
          s.htmlLinkQuizCorrect = b.dataset.linkAnswer === "#details";
          save();
          renderGuide();
          cheer();
        };
      });
      next.textContent = "غيّر وجهة الرابط وجرّبه ←";
      next.disabled = !s.htmlLinkQuiz;
    } else if (step === 4) {
      title.textContent = "وجّه الرابط إلى نصيحته";
      copy.textContent = "في المحرر بدّل #place إلى #details داخل href، ثم شغّل واضغط الرابط في المعاينة. ستنتقل الصفحة إلى القسم الذي يحمل id=" + '"details"' + ".";
      visual.innerHTML = '<div class="basic-structure"><span class="comment">الموجود:</span> href="#place"<br><span class="comment">الوجهة المطلوبة:</span> href="#details"</div><div class="basic-hint">الرابط والقسم جاهزان؛ عدّل الوجهة فقط ثم اتبعها.</div>';
      next.textContent = "افتح المحرر وبدّل الوجهة ←";
      next.disabled = false;
    } else {
      title.textContent = "وصلت الرابط بوجهته";
      copy.textContent = "غيّرت الوجهة، ثم اتبعت الرابط حتى القسم المقصود. المحطة التالية حسب ترتيب W3Schools: HTML Link Colors.";
      visual.innerHTML = '<div class="guide-finish"><b>🌿 HTML Links اكتمل</b><span>href يحدد الوجهة، و#id يقفز إلى عنصر داخل الصفحة.</span></div>';
      next.textContent = "المحطة التالية: HTML Link Colors ←";
      next.disabled = false;
    }
  }

  function escapeHtml(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function courseLessonSpec() {
    var lessonKey = course + "Lesson",
        sequence = course === "css" ? cssSequence : jsSequence,
        index = Math.max(0, Math.min(Math.floor(s[lessonKey] || 0), sequence.length - 1)),
        topic = sequence[index],
        spec = course === "css" ? cssLessonSpec(topic, index) : jsLessonSpec(topic, index),
        stepKey = course + "Step",
        versionKey = course + "StepVersion";
    s[lessonKey] = index;
    spec.details = courseLessonDetails(spec, course);
    if (s[versionKey] !== 2) {
      var oldStep = Math.max(1, Math.min(5, Math.floor(s[stepKey] || 1))),
          quizStep = 3 + spec.details.length;
      s[stepKey] = oldStep <= 2 ? oldStep : oldStep === 3 ? quizStep : oldStep === 4 ? quizStep + 1 : courseDoneStep(spec);
      s[versionKey] = 2;
      save();
    }
    var boundedStep = Math.max(1, Math.min(Math.floor(s[stepKey] || 1), courseDoneStep(spec)));
    if (s[stepKey] !== boundedStep) { s[stepKey] = boundedStep; save(); }
    return spec;
  }

  function coursePracticeDone(code, spec) {
    var source = String(code || ""),
        draft = String(spec.code || ""),
        at = draft.indexOf(spec.from);
    if (!spec.from || !spec.to || at < 0) return false;
    return source === draft.slice(0, at) + spec.to + draft.slice(at + spec.from.length);
  }

  function clearPreviewStatus() {
    var status = document.getElementById("previewStatus");
    status.textContent = "";
    status.classList.remove("error");
  }

  function showPreviewError(message) {
    var status = document.getElementById("previewStatus");
    status.textContent = "خطأ في المثال: " + String(message || "خطأ غير معروف").slice(0, 240);
    status.classList.add("error");
  }

  window.addEventListener("message", function(event) {
    var preview = document.getElementById("preview"),
        payload = event.data;
    if (event.source !== preview.contentWindow || !payload || payload.type !== "lesson-preview-error") return;
    showPreviewError(payload.message);
  });

  function renderCourseGuide(step) {
    var index = s[course + "Lesson"] || 0,
        sequence = course === "css" ? cssSequence : jsSequence,
        spec = courseLessonSpec(),
        quizStep = 3 + spec.details.length,
        practiceStep = quizStep + 1,
        doneStep = courseDoneStep(spec),
        lessonSteps = doneStep - 1,
        code = document.getElementById("code"),
        count = document.getElementById("guideCount"),
        meter = document.getElementById("guideMeter"),
        title = document.getElementById("guideTitle"),
        copy = document.getElementById("guideCopy"),
        visual = document.getElementById("guideVisual"),
        actions = document.getElementById("guideActions"),
        next = document.getElementById("guideNext"),
        codeKey = course + "Code",
        courseName = course === "css" ? "CSS" : "JavaScript";
    document.getElementById("title").textContent = spec.topic + ": فكرة تتضح بالتدريج";
    document.getElementById("sub").textContent = spec.analogy;
    document.getElementById("level").textContent = courseName + " · درس " + ar(index + 1) + " من " + ar(sequence.length);
    document.getElementById("filename").textContent = course === "css" ? "style.css" : "script.js";
    document.getElementById("guideTrackLabel").textContent = "درس قصير · " + courseName;
    count.textContent = step === doneStep ? "اكتمل الموضوع · " + ar(lessonSteps) + " من " + ar(lessonSteps) : courseName + " · خطوة " + ar(step) + " من " + ar(lessonSteps);
    meter.style.width = (step === doneStep ? 100 : (step - 1) * 100 / lessonSteps) + "%";
    actions.innerHTML = "";
    if (!s[codeKey]) { s[codeKey] = spec.code; save(); }
    code.value = s[codeKey];

    if (step === 1) {
      title.textContent = "الفكرة: " + spec.topic.replace(/^CSS |^JS /, "");
      copy.textContent = spec.concept;
      visual.innerHTML = '<div class="basic-structure">' + escapeHtml(spec.analogy) + '</div><div class="basic-hint">سنتناول معنى واحدًا محددًا، ثم نشاهده في سطر برمجي موجز.</div>';
      next.textContent = "شاهد حركة السطر في النتيجة ←";
      next.disabled = false;
    } else if (step === 2) {
      title.textContent = "تابع السطر حتى النتيجة";
      copy.textContent = course === "css" ? "المتصفح يطابق المحدد أولًا، ثم يقرأ الخاصية والقيمة. غيّر جزءًا واحدًا لترى أثره وحده." : "اقرأ السطر من بدايته: ما القيمة أو الإشارة؟ ما الفعل؟ وأين تظهر النتيجة؟";
      visual.innerHTML = '<div class="basic-structure">' + escapeHtml(spec.trace) + '</div><div class="basic-hint">مثال جاهز في المحرر؛ لا تحتاج إلى إعادة كتابة الوسوم أو الهيكل.</div>';
      next.textContent = "شوف تفصيلًا مهمًا ←";
      next.disabled = false;
    } else if (step < quizStep) {
      var detail = spec.details[step - 3];
      title.textContent = detail.title;
      copy.textContent = detail.note;
      visual.innerHTML = '<div class="basic-structure">' + escapeHtml(detail.flow) + '</div><div class="basic-hint">اربط هذه النقطة بالسطر الموجود في المحرر قبل الانتقال.</div>';
      next.textContent = step + 1 === quizStep ? "جاوب سؤالًا سريعًا ←" : "كمّل نقطة التتبع ←";
      next.disabled = false;
    } else if (step === quizStep) {
      title.textContent = "تأكد من الفكرة بسؤال واحد";
      copy.textContent = spec.quiz;
      visual.innerHTML = '<div class="element-demo"><span class="tag">فكّر في دور كل جزء</span><span class="content">ثم اختار الإجابة</span></div>';
      actions.innerHTML = spec.options.map(function(option, i) {
        return '<button type="button" data-course-answer="' + i + '">' + escapeHtml(option) + '</button>';
      }).join("") + (s[course + "Quiz"] ? '<p class="guide-feedback">' + escapeHtml(s[course + "QuizCorrect"] ? "صحيح؛ وصلت للفكرة. خذها الآن إلى المحرر." : "جرّبت إجابة، والآن ستراها في السطر العملي بالخطوة التالية.") + '</p>' : "");
      actions.querySelectorAll("[data-course-answer]").forEach(function(button) {
        button.onclick = function() {
          s[course + "Quiz"] = true;
          s[course + "QuizCorrect"] = +button.dataset.courseAnswer === spec.correct;
          save(); renderCourseGuide(step); cheer();
        };
      });
      next.textContent = "طبّق الفكرة على المثال ←";
      next.disabled = !s[course + "Quiz"];
    } else if (step === practiceStep) {
      title.textContent = "دورك: " + spec.topic.replace(/^CSS |^JS /, "");
      copy.textContent = spec.task;
      visual.innerHTML = '<div class="basic-structure"><span class="comment">قبل:</span> ' + escapeHtml(spec.from) + '<br><span class="comment">بعد:</span> ' + escapeHtml(spec.to) + '</div><div class="basic-hint">بدّل الجزء المحدد فقط، شغّل، ثم اقرأ التغيير بعينك.</div>';
      next.textContent = "افتح المحرر ونفّذ الخطوة ←";
      next.disabled = false;
    } else {
      title.textContent = "خطوة جديدة أصبحت واضحة";
      copy.textContent = course === "css" ? "عدّلت قاعدة وشاهدت أثرها على الصفحة. الموضوع التالي يأتي مباشرة بعده في W3Schools." : "تبعت السطر خطوة خطوة وشاهدت النتيجة. الموضوع التالي يأتي بعده في ترتيب W3Schools.";
      visual.innerHTML = '<div class="guide-finish"><b>🌱 ' + escapeHtml(spec.topic) + ' اكتمل</b><span>' + escapeHtml(spec.trace) + '</span></div>';
      next.textContent = index + 1 < sequence.length ? "ابدأ الموضوع التالي: " + sequence[index + 1] + " ←" : "اكتمل المسار كاملًا ✓";
      next.disabled = false;
    }
  }

  function advanceCourseGuide() {
    var stepKey = course + "Step",
        lessonKey = course + "Lesson",
        quizKey = course + "Quiz",
        spec = courseLessonSpec(),
        quizStep = 3 + spec.details.length,
        practiceStep = quizStep + 1,
        doneStep = courseDoneStep(spec),
        step = s[stepKey] || 1,
        index = s[lessonKey] || 0,
        sequence = course === "css" ? cssSequence : jsSequence;
    if (step < quizStep) {
      s[stepKey] = step + 1;
      save(); renderGuide(); cheer();
    } else if (step === quizStep && s[quizKey]) {
      s[stepKey] = practiceStep;
      save(); renderGuide(); cheer();
    } else if (step === practiceStep) {
      document.getElementById("code").scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById("code").focus();
    } else if (step === doneStep && index + 1 < sequence.length) {
      s[lessonKey] = index + 1;
      s[stepKey] = 1;
      s[course + "Code"] = "";
      s[quizKey] = false;
      s[course + "QuizCorrect"] = false;
      save(); renderGuide(); cheer();
    } else if (step === doneStep) {
      document.getElementById("courseRoadmap").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function runCourseLesson() {
    var step = s[course + "Step"] || 1,
        index = s[course + "Lesson"] || 0,
        code = document.getElementById("code").value,
        spec = courseLessonSpec(),
        practiceStep = courseDoneStep(spec) - 1,
        codeKey = course + "Code";
    if (step === practiceStep && !coursePracticeDone(code, spec)) {
      document.getElementById("hint").textContent = "نفّذ التغيير الصغير المكتوب فوق المحرر، ثم شغّل من جديد.";
      document.getElementById("code").focus();
      return;
    }
    clearPreviewStatus();
    if (course === "js") {
      try {
        new Function(code);
      } catch (error) {
        showPreviewError(error && error.message || error);
      }
    }
    document.getElementById("preview").srcdoc = data[course].build(code);
    s.examples++;
    if (lastCode !== null && code !== lastCode) s.fixes++;
    lastCode = code;
    ran = true;
    if (step === practiceStep && coursePracticeDone(code, spec)) {
      s[course + "Step"] = courseDoneStep(spec);
      s.lessons++;
      s.progress = Math.min(100, s.progress + 2);
      document.getElementById("hint").textContent = "اتغير السطر وظهرت نتيجته. افتح الخطوة التالية لما تكون جاهزًا.";
      renderGuide();
    }
    s[codeKey] = code;
    save(); render(); cheer();
  }

  function renderGuide() {
    renderGrowthLesson();
  }
  function advanceGuide() {
    advanceGrowthLesson();
  }

  function select(k) {
    if (!data[k]) return;
    course = k;
    s.course = k;
    save();
    var x = data[k];
    ["title", "sub", "prompt"].forEach(function(id) {
      document.getElementById(id).textContent = x[id];
    });
    document.getElementById("level").textContent = "خطوة " + ar(s.step || 2) + " · " + x.level;
    document.getElementById("filename").textContent = x.file;
    document.getElementById("code").value = x.code;
    if (k === "html" && s.htmlCode) {
      document.getElementById("code").value = s.htmlCode;
    }
    document.querySelectorAll("[data-course]").forEach(function(b) {
      b.classList.toggle("active", b.dataset.course === k);
    });
    ran = false;
    lastCode = null;
    clearPreviewStatus();
    renderGuide();
    document.getElementById("preview").srcdoc = x.build(document.getElementById("code").value);
  }

  function run() {
    runGrowthLesson();
  }

  function complete() {
    if (!ran) {
      document.getElementById("hint").textContent = "شغّل المثال الأول ثم علّم الخطوة كمكتملة.";
      return;
    }
    if ((s.step || 2) >= 5) {
      s.step = 1;
      s.lessons++;
    } else {
      s.step = (s.step || 2) + 1;
    }
    s.progress = Math.min(100, s.progress + 2);
    save();
    render();
    document.getElementById("level").textContent = "خطوة " + ar(s.step) + " · " + data[course].level;
    cheer();
    if (typeof setMobileLessonView === "function") {
      setMobileLessonView("editor");
    }
  }

  function soundBuffer(type) {
    var b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate),
        a = b.getChannelData(0),
        last = 0;
    for (var i = 0; i < a.length; i++) {
      var v = Math.random() * 2 - 1;
      if (type === "brown" || type === "forest" || type === "cafe") {
        last = (last + 0.02 * v) / 1.02;
        a[i] = last * 3;
      } else {
        a[i] = v * 0.55;
      }
    }
    return b;
  }

  function stop() {
    if (source) {
      try { source.stop(); } catch(e) {}
      source.disconnect();
      source = null;
    }
    if (gain) {
      gain.disconnect();
      gain = null;
    }
    document.getElementById("play").textContent = "▶";
    document.getElementById("play").setAttribute("aria-pressed", "false");
    document.getElementById("play").setAttribute("aria-label", "تشغيل الصوت");
    document.getElementById("soundStatus").textContent = "الصوت متوقف · اختيارك محفوظ";
  }

  function play() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) {
      document.getElementById("soundStatus").textContent = "الصوت غير متاح في هذا المتصفح.";
      return;
    }
    try {
      stop();
      if (!ctx || ctx.state === "closed") ctx = new AC();
      source = ctx.createBufferSource();
      source.buffer = soundBuffer(s.sound);
      source.loop = true;
      var f = ctx.createBiquadFilter();
      f.type = s.sound === "rain" ? "highpass" : "lowpass";
      f.frequency.value = s.sound === "rain" ? 900 : s.sound === "white" ? 8000 : s.sound === "brown" ? 350 : s.sound === "forest" ? 2200 : s.sound === "cafe" ? 500 : 1500;
      gain = ctx.createGain();
      gain.gain.value = s.volume / 500;
      source.connect(f);
      f.connect(gain);
      gain.connect(ctx.destination);
      source.start();
      document.getElementById("play").textContent = "Ⅱ";
      document.getElementById("play").setAttribute("aria-pressed", "true");
      document.getElementById("play").setAttribute("aria-label", "إيقاف الصوت");
      document.getElementById("soundStatus").textContent = s.volume === 0 ? "الصوت مكتوم · ارفع مستوى الصوت للتشغيل" : "الصوت يعمل بهدوء · محفوظ على جهازك";
      var resume = ctx.resume();
      if (resume && typeof resume.catch === "function") resume.catch(function(error) {
        stop();
        document.getElementById("soundStatus").textContent = "تعذر تشغيل الصوت: " + (error && error.message ? error.message : "تحقق من إعدادات المتصفح");
      });
    } catch(e) {
      stop();
      document.getElementById("soundStatus").textContent = "تعذر تشغيل الصوت: " + (e && e.message ? e.message : "تحقق من إعدادات المتصفح");
    }
  }

  function showTime() {
    document.getElementById("timer").textContent = ar(String(clock / 60 | 0).padStart(2, "0") + ":" + String(clock % 60).padStart(2, "0"));
    var pct = Math.max(0, Math.min(100, Math.round((clock / timerDuration) * 100)));
    document.getElementById("orb").style.background = "conic-gradient(#cfe1c3 0 " + pct + "%, #e9e8dc " + pct + "% 100%)";
  }

  function syncFocusDurationButtons() {
    document.querySelectorAll("[data-focus-duration]").forEach(function(button) {
      var selected = +button.dataset.focusDuration === timerDuration;
      button.setAttribute("aria-pressed", selected ? "true" : "false");
      button.classList.toggle("selected", selected);
      button.disabled = !!timerId;
    });
  }

  function setFocusDuration(duration) {
    duration = +duration;
    if (timerId || [300, 720].indexOf(duration) < 0) return false;
    timerDuration = duration;
    clock = duration;
    s.focusDuration = duration;
    s.focusSeconds = clock;
    save();
    showTime();
    syncFocusDurationButtons();
    document.getElementById("focusBtn").textContent = "ابدأ مؤقتًا هادئًا";
    document.getElementById("focusCaption").textContent = duration === 300
      ? "٥ دقائق تكفي لخطوة واحدة؛ تقدر توقف وتكمل وقت ما تحب."
      : "١٢ دقيقة هادئة؛ تقدر توقف وتكمل وقت ما تحب.";
    return true;
  }

  function focus() {
    if (timerId) {
      clock = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
      clearInterval(timerId);
      timerId = null;
      timerDeadline = 0;
      if (clock === 0) { finishFocusSession(); return; }
      s.focusSeconds = clock;
      save();
      showTime();
      document.getElementById("focusBtn").textContent = "كمّل المؤقت";
      document.getElementById("focusCaption").textContent = "المؤقت متوقف مؤقتًا؛ وقتك محفوظ.";
      syncFocusDurationButtons();
      return;
    }
    if (clock <= 0) {
      clock = timerDuration;
      s.focusSeconds = clock;
      showTime();
    }
    timerDeadline = Date.now() + clock * 1000;
    save();
    document.getElementById("focusBtn").textContent = "وقفة قصيرة";
    document.getElementById("focusCaption").textContent = "جلسة هادئة؛ كل خطوة صغيرة محسوبة.";
    timerId = setInterval(function() {
      clock = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
      s.focusSeconds = clock;
      showTime();
      if (clock <= 0) finishFocusSession();
    }, 250);
    syncFocusDurationButtons();
  }

  function finishFocusSession() {
    if (timerId) clearInterval(timerId);
    timerId = null;
    timerDeadline = 0;
    clock = 0;
    s.focusSeconds = 0;
    s.minutes += timerDuration / 60;
    save();
    showTime();
    syncFocusDurationButtons();
    render();
    document.getElementById("focusBtn").textContent = "ابدأ جلسة جديدة";
    document.getElementById("focusCaption").textContent = "اكتملت جلسة التركيز؛ خذ نفسًا قبل الخطوة التالية.";
    cheer();
  }

  window.addEventListener("pagehide", function() {
    if (timerId) s.focusSeconds = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
    save();
  });

  try {
    document.getElementById("date").textContent = new Intl.DateTimeFormat("ar-EG", { weekday: "short", day: "numeric", month: "long" }).format(new Date());
  } catch(e) {}

  awayDays = daysSince(growth.lastActiveDate);
  growth.lastActiveDate = todayKey();
  saveGrowth();
  document.getElementById("greeting").textContent = awayDays >= 2
    ? "آخر مرة كنت بتبني حاجة، تحب تشوف وصلت لفين؟"
    : greetings[new Date().getDate() % greetings.length];

  document.querySelectorAll("[data-sound]").forEach(function(b) {
    b.classList.toggle("active", b.dataset.sound === s.sound);
    b.setAttribute("aria-pressed", b.dataset.sound === s.sound ? "true" : "false");
    b.onclick = function() {
      s.sound = b.dataset.sound;
      save();
      document.querySelectorAll("[data-sound]").forEach(function(x) {
        x.classList.toggle("active", x === b);
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      if (source) {
        stop();
        play();
      }
    };
  });

  initializeProjectCard();
  initializeMiniProjects();
  initializeLearnerProfiles();
  render();
  select(course);
  showTime();
  if (clock > 0 && clock < timerDuration) {
    document.getElementById("focusBtn").textContent = "كمّل المؤقت";
    document.getElementById("focusCaption").textContent = "جلسة سابقة متوقفة؛ تقدر تكمل من وقتك المحفوظ.";
  } else if (clock === 0) {
    document.getElementById("focusBtn").textContent = "ابدأ جلسة جديدة";
    document.getElementById("focusCaption").textContent = "الجلسة السابقة اكتملت؛ ابدأ واحدة جديدة وقت ما تحب.";
  }

  document.getElementById("newGreeting").onclick = greeting;
  document.getElementById("openDailyChallenge").onclick = openDailyChallenge;
  document.getElementById("openDailyChallengeRail").onclick = openDailyChallenge;
  document.getElementById("guideNext").onclick = advanceGuide;
  document.getElementById("guidePrevious").onclick = reviewPreviousGrowthStep;
  document.getElementById("tip").onclick = function() { greeting(); cheer(); };
  document.getElementById("continue").onclick = function() {
    select(s.course || "js");
    document.getElementById("lesson").scrollIntoView({ behavior: "smooth" });
  };
  document.getElementById("journey").onclick = cheer;
  document.getElementById("allCourses").onclick = function() {
    setActiveNav("courses");
    document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
  };
  function setMobileLessonView(view) {
    var card = document.querySelector("#lesson article.card");
    if (!card) return;
    card.setAttribute("data-mobile-view", view);
    document.querySelectorAll(".mobile-tab-btn").forEach(function(btn) {
      var isMatch = (btn.dataset.tab === view || btn.dataset.tabTarget === view);
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-selected", isMatch ? "true" : "false");
    });
  }

  document.querySelectorAll(".mobile-tab-btn").forEach(function(btn) {
    btn.onclick = function() {
      setMobileLessonView(btn.dataset.tab || btn.dataset.tabTarget);
    };
  });
  setMobileLessonView("editor");

  document.querySelectorAll("[data-mobile-jump]").forEach(function(button) {
    button.onclick = function() {
      var target = document.getElementById(button.dataset.mobileJump);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      if (button.dataset.mobileJump === "code") target.focus();
    };
  });
  var originalRun = run;
  document.getElementById("run").onclick = function() {
    originalRun();
    if (window.innerWidth <= 767) {
      setMobileLessonView("preview");
    }
  };
  document.getElementById("downloadLessonFile").onclick = function() {
    var mime = course === "html" ? "text/html;charset=utf-8" : course === "css" ? "text/css;charset=utf-8" : "text/javascript;charset=utf-8",
        blob = new Blob([document.getElementById("code").value], { type: mime }),
        url = URL.createObjectURL(blob),
        link = document.createElement("a");
    link.href = url;
    link.download = data[course].file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
    document.getElementById("hint").textContent = "اتحفظ " + data[course].file + " على جهازك. تقدر تفتحه بمحرر أو بالمتصفح.";
  };
  document.getElementById("complete").onclick = complete;
  document.getElementById("focusBtn").onclick = focus;
  document.querySelectorAll("[data-focus-duration]").forEach(function(button) {
    button.onclick = function() { setFocusDuration(button.dataset.focusDuration); };
  });
  syncFocusDurationButtons();

  document.getElementById("roadSearch").oninput = renderRoadmap;
  document.getElementById("roadCourseFilter").onchange = function() {
    roadFilterCourse = this.value;
    renderRoadmap();
  };
  document.getElementById("abilitiesList").onclick = function(event) {
    var summary = event.target.closest(".ability-challenge > summary");
    if (!summary) return;
    var selected = summary.parentNode;
    setTimeout(function() {
      if (!selected.open) return;
      document.querySelectorAll("#abilitiesList .ability-challenge[open]").forEach(function(details) {
        if (details !== selected) details.open = false;
      });
    }, 0);
  };
  document.getElementById("clearRoadSearch").onclick = function() {
    var search = document.getElementById("roadSearch");
    search.value = "";
    renderRoadmap();
    search.focus();
  };
  document.getElementById("roadList").onclick = function(event) {
    var button = event.target.closest("[data-road-course]");
    if (button) openRoadTopic(button.dataset.roadCourse, +button.dataset.roadIndex);
  };
  document.getElementById("roadMore").onclick = function(event) {
    var button = event.target.closest("[data-road-course]");
    if (button) openRoadTopic(button.dataset.roadCourse, +button.dataset.roadIndex);
  };

  document.querySelectorAll("[data-course]").forEach(function(b) {
    b.onclick = function() {
      select(b.dataset.course);
      cheer();
    };
  });

  document.getElementById("play").onclick = function() {
    if (source) stop();
    else play();
  };
  document.getElementById("volume").value = s.volume;
  document.getElementById("volume").oninput = function() {
    s.volume = +this.value;
    save();
    if (gain) gain.gain.value = s.volume / 500;
    if (s.volume === 0 && source) document.getElementById("soundStatus").textContent = "الصوت مكتوم · ارفع مستوى الصوت للتشغيل";
    else if (s.volume > 0 && source) document.getElementById("soundStatus").textContent = "الصوت يعمل بهدوء · محفوظ على جهازك";
  };

  function setActiveNav(id) {
    var target = id === "lesson" || id === "home" ? "#home" : id === "courseRoadmap" ? "#courses" : "#" + id;
    document.querySelectorAll(".nav a").forEach(function(link) {
      link.classList.toggle("active", link.getAttribute("href") === target);
    });
  }
  document.querySelectorAll(".nav a").forEach(function(a) {
    a.onclick = function() { setActiveNav(a.getAttribute("href").slice(1)); };
  });
  var observedSections = ["home", "progress", "lesson", "project", "courses", "courseRoadmap"].map(function(id) {
    return document.getElementById(id);
  }).filter(Boolean);
  function updateActiveSection() {
    var marker = window.innerHeight * 0.25;
    var sectionBoxes = observedSections.map(function(section) {
      return { section: section, box: section.getBoundingClientRect() };
    });
    var candidates = sectionBoxes.filter(function(item) {
      return item.box.top <= marker && item.box.bottom >= marker;
    });
    if (candidates.length) {
      candidates.sort(function(a, b) {
        return a.box.height - b.box.height;
      });
    } else {
      candidates = sectionBoxes.slice().sort(function(a, b) {
        var aDistance = Math.max(a.box.top - marker, marker - a.box.bottom, 0),
            bDistance = Math.max(b.box.top - marker, marker - b.box.bottom, 0);
        return aDistance - bDistance;
      });
    }
    setActiveNav(candidates.length ? candidates[0].section.id : "home");
  }
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    });
    observedSections.forEach(function(section) { sectionObserver.observe(section); });
  }
  var scrollThrottled = false;
  function throttledUpdateActiveSection() {
    if (!scrollThrottled) {
      if (typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(function() {
          updateActiveSection();
          scrollThrottled = false;
        });
      } else {
        setTimeout(function() {
          updateActiveSection();
          scrollThrottled = false;
        }, 16);
      }
      scrollThrottled = true;
    }
  }
  window.addEventListener("scroll", throttledUpdateActiveSection, { passive: true });
  window.addEventListener("resize", throttledUpdateActiveSection);
  updateActiveSection();

  var livePreviewTimer = null;
  var saveGrowthTimer = null;

  function scheduleSaveGrowth() {
    if (saveGrowthTimer) clearTimeout(saveGrowthTimer);
    saveGrowthTimer = setTimeout(function() {
      saveGrowth();
      save();
    }, 280);
  }

  function scheduleLivePreview(code) {
    if (livePreviewTimer) clearTimeout(livePreviewTimer);
    livePreviewTimer = setTimeout(function() {
      growthPreview(code);
      if (typeof inspectGentleDomTree === "function") inspectGentleDomTree(code, course);
    }, 180);
  }

  document.getElementById("code").oninput = function() {
    ran = false;
    if (course === "html") s.htmlCode = this.value;
    else if (course === "css" || course === "js") s[course + "Code"] = this.value;
    growth.drafts[currentGrowthKey()] = this.value;
    clearPreviewStatus();
    if (typeof updateHandCraftScore === "function") updateHandCraftScore(course, true);
    scheduleLivePreview(this.value);
    scheduleSaveGrowth();
  };
  document.getElementById("code").onblur = function() {
    if (saveGrowthTimer) {
      clearTimeout(saveGrowthTimer);
      saveGrowth();
      save();
    }
  };
  window.addEventListener("beforeunload", function() {
    if (saveGrowthTimer) {
      clearTimeout(saveGrowthTimer);
      saveGrowth();
      save();
    }
  });
  document.getElementById("code").onkeydown = function(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      var p = this.selectionStart;
      this.value = this.value.slice(0, p) + "  " + this.value.slice(this.selectionEnd);
      this.selectionStart = this.selectionEnd = p + 2;
    }
  };
})();

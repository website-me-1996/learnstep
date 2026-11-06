# StepLearn — منصة تعلّم البرمجة بالتجربة
> **Interactive Micro-Learning Platform & Angular 22 Workbench**  
> **تنفيذ وتصميم:** المهندس أحمد عاشور (Eng. Ahmed Ashour)

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status)](https://app.netlify.com)
[![Build & Test Status](https://img.shields.io/badge/tests-89%20passed-brightgreen.svg)]()
[![Angular](https://img.shields.io/badge/Angular-22-dd0031.svg)]()
[![CodeMirror](https://img.shields.io/badge/CodeMirror-6-blue.svg)]()
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## 🌟 نظرة عامة | Overview

### بالعربية (Arabic)
**StepLearn (خطوة للتعلم)** هي منصة ويب تعليمية متقدمة ومبتكرة ترتكز على مبدأ **الممارسة العملية خطوة بخطوة (Learning by Doing)** والتعليم الدقيق (Micro-Learning). تم تصميمها وتطويرها لتوفير تجربة برمجية متكاملة داخل المتصفح تبدأ من الأساسيات وتتدرج بالمتعلم حتى احتراف أحدث تقنيات الويب، وتحديداً مسار **Angular 22** الحديث مع بيئة تطوير حية ومحاكاة فورية.

### In English
**StepLearn** is a state-of-the-art interactive micro-learning platform engineered for web development mastery through guided, hands-on experimentation. Designed with an in-browser code editor and simulator, it takes learners from foundational web technologies up through a production-grade 60-lesson curriculum in **Angular 22**, concluding with a full-scale institutional capstone application (*Khotwa Cinema Pro*).

---

## 🚀 المميزات الرئيسية | Core Features

### 1. مسار Angular 22 الاحترافي الشامل (60 درساً)
- **المرحلة 1: أساسيات TypeScript الحديثة (Modern TypeScript Foundations)** — الكتابة الساكنة الصارمة، الكائنات، الواجهات (Interfaces)، والـ Generics.
- **المرحلة 2: معمارية المكونات المستقلة (Standalone Components Architecture)** — هيكل المكونات المستقلة، التحكم في المدخلات والمخرجات (`input()`, `output()`).
- **المرحلة 3: بنيات التحكم الجديدة وتدفق التحكم (Control Flow & Deferrable Views)** — `@if`, `@for`, `@switch` وكتل `@defer` للتحميل الكسول فائق السرعة.
- **المرحلة 4: نظام الإشارات التفاعلي (Reactivity with Angular Signals)** — `signal()`, `computed()`, `effect()`, ومزامنة الحالة التفاعلية بدون Zone.js.
- **المرحلة 5: حقن الاعتماديات وطلبات الشبكة (Modern DI & HttpClient)** — `inject()`, `HttpClient`, والاعتراضات الوظيفية (Functional Interceptors).
- **المرحلة 6: التوجيه ونماذج الإشارات (Routing & Signal Forms)** — المسارات المستقلة، حراس التوجيه الوظيفية (Functional Guards)، وربط النماذج الحديثة.
- **المرحلة 7: مشروع التخرج المؤسسي (Khotwa Cinema Pro Capstone)** — تطبيق سينما ومقاعد متكامل يدمج كافة المفاهيم المتقدمة بمستويات جودة إنتاجية.

### 2. بيئة تطوير ومحاكاة مدمجة داخل المتصفح
- **محرر CodeMirror 6 فائق السرعة**: إكمال تلقائي، تلوين تركيبي، وتجربة كتابة أكواد غامرة ومريحة.
- **محاكاة تفاعلية فورية**: استعراض فوري للمخرجات في بطاقة محاكاة تفاعلية (Sandbox Preview).
- **تكامل WebContainers**: دعم تشغيل معمارية خادم الويب وحاويات Node داخل المتصفح مع عزل أمني صارم (`COEP/COOP`).
- **تصدير المشاريع**: إمكانية استخراج وتحميل مشاريع حقيقية بصيغة ZIP جاهزة للتشغيل محلياً عبر Angular CLI.

### 3. منهجية الخطوات الخمس الدقيقة (5-Step Pedagogical Model)
1. **الفكرة الأساسية (The Concept)**: شرح مركز ومباشر للمفهوم بدون حشو نظري.
2. **ابنِ الكود (Build Step)**: بناء الكود التفاعلي بلبنات محكمة.
3. **جرّب بنفسك (Hands-on Experimentation)**: بيئة مفتوحة للممارسة مع تصحيح ذكي ومرن للمسافات البيضاء.
4. **سؤال التأكيد (Check Question)**: اختبار تفاعلي سريع لقياس الاستيعاب الحقيقي.
5. **إضافة للبنة المشروع (Project Integration)**: ربط المهارة المكتسبة بالمشروع التطبيقي النهائي.

### 4. حماية الملكية الفكرية ومكافحة التجريف (Security & IP Protection)
- **علامة مائية ديناميكية موثقة**: تشمل اسم المتعلم، المعرف الرقمي، والبصمة الزمنية لمنع تصوير الشاشة غير المصرح به.
- **اعتراض محاولات النسخ والتقاط الشاشة**: تعطيل اختصارات أدوات التطوير (DevTools)، وأمر الطباعة، واعتراض زر `PrintScreen`.
- **مكافحة زواحف الذكاء الاصطناعي**: ملف `robots.txt` وترويسات `X-Robots-Tag: noai, noimageai, noarchive` لحظر استخراج المحتوى عبر روبوتات النماذج التوليدية (GPTBot, ClaudeBot, PerplexityBot, إلخ).

---

## 🛠️ التقنيات المستخدمة | Tech Stack

- **Core Runtime**: Pure Modern JavaScript (ES Modules & Classic Scripts)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/) v7
- **Code Editor**: [CodeMirror 6](https://codemirror.net/)
- **In-Browser Runtime**: [@webcontainer/api](https://webcontainers.io/)
- **Archive Generation**: [JSZip](https://stuk.github.io/jszip/)
- **Testing Engine**: Node.js Built-in Test Runner (`node --test`)
- **Hosting & CI/CD**: [Netlify](https://www.netlify.com/)

---

## 💻 التشغيل والتطوير المحلي | Local Development & Setup

### المتطلبات الأساسية (Prerequisites)
- [Node.js](https://nodejs.org/) الإصدار 20 أو أحدث.
- [npm](https://www.npmjs.com/) الإصدار 10 أو أحدث.

### خطوات التثبيت والتشغيل
```bash
# 1. استنساخ المستودع (Clone the repository)
git clone https://github.com/website-me-1996/learnstep.git
cd learnstep

# 2. تثبيت الاعتماديات (Install dependencies)
npm install

# 3. تشغيل خادم التطوير المحلي (Start development server)
npm run dev

# 4. بناء نسخة الإنتاج المجهزة (Build for production)
npm run build

# 5. تشغيل حزمة الاختبارات الشاملة (Run automated tests)
npm test
```

---

## 🧪 حزمة الاختبارات وضمان الجودة | Automated Testing & QA

تتضمن المنصة حزمة اختبارات شاملة مبنية على مشغل الاختبارات الأصلي في Node.js، تتضمن 89 اختباراً مؤتمتاً تغطي:
- التحقق من تكامل كافة مسارات ومراحل منهج Angular 22 الـ 60.
- التحقق من ترويسات العزل الأمني (`COEP`/`COOP`) وتوافقية استضافة Netlify.
- اختبارات أمان المحتوى والحماية من الهندسة العكسية والتجريف الآلي.
- محاكاة دقة واستجابة واجهات الهواتف المحمولة وتعدد ملفات تعريف المتعلمين.

لتشغيل الاختبارات:
```bash
npm test
```
*جميع الاختبارات الـ 89 تجتاز بنسبة 100% (89 pass, 0 fail).*

---

## 🌐 النشر والاستضافة عبر Netlify | Netlify Deployment

المشروع مُهيأ بالكامل للنشر الآلي المباشر بمجرد ربطه مع هذا المستودع على **Netlify**:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Fallback Redirect**:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
- **Cross-Origin Isolation Headers (Mandatory for WebContainers)**:
  - `Cross-Origin-Embedder-Policy: credentialless`
  - `Cross-Origin-Opener-Policy: same-origin`
- **Security & Anti-Scraping Headers**:
  - `X-Robots-Tag: noai, noimageai, noarchive`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`

---

## 👤 التصميم وحقوق الملكية | Author & Copyright

**تنفيذ وتصميم وإشراف:**  
**المهندس أحمد عصام الدين عاشور (Eng. Ahmed Essam Ashour)**  
- GitHub: [@website-me-1996](https://github.com/website-me-1996)  
- Email: `website-me-1996@users.noreply.github.com`

> **تنبيه قانوني وحقوق النشر**:  
> جميع الحقوق الفكرية والتصميمات والمحتوى التعليمي والهندسي لمنصة **StepLearn** محفوظة بالكامل للمهندس **أحمد عاشور**. يمنع منعاً باتاً استنساخ أو إعادة توزيع أو استخدام المحتوى لأغراض تجارية دون موافقة خطية صريحة ومسبقة.

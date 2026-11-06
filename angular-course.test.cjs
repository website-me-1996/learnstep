const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = __dirname;
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");

function loadCourse() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(read("angular-course-data.js"), context, { filename: "angular-course-data.js" });
  return context.window.ANGULAR_COURSE_DATA;
}

test("Angular 22 course has a complete, ordered roadmap with official references", () => {
  const course = loadCourse();
  assert.equal(course.version, "22");
  assert.ok([46, 56, 69, 76, 84, 91, 97, 106].includes(course.lessons.length), `Expected valid lesson count progression, got ${course.lessons.length}`);
  assert.equal(new Set(course.lessons.map((lesson) => lesson.id)).size, course.lessons.length);
  for (const lesson of course.lessons) {
    assert.ok(lesson.id && lesson.title && lesson.phase && lesson.concept && lesson.task && lesson.reference, lesson.id);
    assert.match(lesson.reference, /^https:\/\/(angular\.dev|www\.typescriptlang\.org)\//, lesson.id);
    if (!lesson.command) {
      assert.ok(lesson.file, lesson.id + " needs a target file");
      const edits = lesson.edits || [{ code: lesson.code, expected: lesson.expected }];
      assert.ok(edits.length, lesson.id + " needs a practice snippet and check");
      for (const edit of edits) {
        assert.ok((edit.file || lesson.file) && edit.code && edit.expected, lesson.id + " has an incomplete file edit");
        for (const expected of Array.isArray(edit.expected) ? edit.expected : [edit.expected]) {
          assert.ok(edit.code.includes(expected), lesson.id + " displays its expected code");
        }
      }
    }
    assert.ok(Array.isArray(lesson.steps) && lesson.steps.length >= 3, lesson.id + " needs step-by-step guidance");
    for (const step of lesson.steps) {
      assert.ok(step.id && step.title && step.task, lesson.id + " step missing metadata");
    }
  }
  assert.ok(["البداية من الصفر", "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر"].includes(course.lessons[0].phase));
  assert.equal(course.lessons.at(-1).id, "final-review");
});

test("Angular starter files form a valid Angular CLI workspace and include test dependencies", () => {
  const course = loadCourse();
  const files = course.starterFiles;
  const pkg = JSON.parse(files["package.json"]);
  const angular = JSON.parse(files["angular.json"]);
  const tsconfig = JSON.parse(files["tsconfig.json"]);
  const appConfig = JSON.parse(files["tsconfig.app.json"]);
  const specConfig = JSON.parse(files["tsconfig.spec.json"]);
  assert.equal(pkg.dependencies["@angular/core"], "^22.0.0");
  assert.equal(pkg.devDependencies["@angular/cli"], "^22.0.0");
  assert.ok(pkg.devDependencies.vitest);
  assert.match(pkg.devDependencies.vitest, /^\^4\./);
  assert.ok(pkg.devDependencies.jsdom);
  assert.equal(angular.projects.cinema.architect.build.builder, "@angular/build:application");
  assert.equal(angular.projects.cinema.architect.serve.builder, "@angular/build:dev-server");
  assert.equal(angular.projects.cinema.architect.test.builder, "@angular/build:unit-test");
  assert.ok(tsconfig.compilerOptions.strict);
  assert.equal(tsconfig.compilerOptions.baseUrl, undefined);
  assert.ok(appConfig.files.includes("src/main.ts"));
  assert.ok(specConfig.compilerOptions.types.includes("vitest/globals"));
  assert.ok(files["src/main.ts"].includes("bootstrapApplication"));
  assert.ok(files["src/app/app.html"].includes("{{ title }}"));
  assert.ok(files["src/app/app.css"]);
  assert.match(files["src/app/app.spec.ts"], /provideRouter\(\[\]\)/);
  assert.ok(files["src/index.html"].includes('dir="rtl"'));
});

test("Angular editor is wired into Step with local persistence, WebContainers, ZIP and manual fallback", () => {
  const html = read("index.html");
  const editor = read("angular-editor.js");
  const pkg = JSON.parse(read("package.json"));
  assert.match(html, /id="angularCoursePanel"/);
  assert.match(html, /data-angular-mode="playground"/);
  assert.match(html, /data-angular-mode="project"/);
  assert.match(html, /id="angularCodeEditor"/);
  assert.match(html, /id="angularPreview"/);
  assert.match(html, /id="angularTerminal"/);
  assert.ok(html.indexOf("angular-course-data.js") < html.indexOf("app.js"));
  assert.match(html, /type="module" src="\/angular-editor\.js"/);
  assert.ok(pkg.dependencies["@webcontainer/api"]);
  assert.ok(pkg.dependencies.codemirror);
  assert.ok(pkg.dependencies.jszip);
  assert.match(editor, /indexedDB\.open\(DB_NAME/);
  assert.match(editor, /WebContainer\.boot\(\{ coep: "credentialless" \}\)/);
  assert.match(editor, /import\("codemirror"\)/);
  assert.doesNotMatch(editor, /^import .* from "codemirror"/m);
  assert.match(editor, /await new Promise\(\(resolve\) => window\.addEventListener\("load"/);
  assert.match(editor, /window\.LearnerProfiles\.active\(\)/);
  assert.match(editor, /async function loadCurrentWorkspace\(\) \{\n  if \(editorView\)/, "changing lessons or modes does not resave the old draft into the destination");
  assert.match(editor, /record\.workspaces\.playground/);
  assert.match(editor, /record\.workspaces\.project/);
  assert.match(editor, /zip\.generateAsync/);
  assert.match(editor, /JSZip\.loadAsync/);
  assert.match(editor, /angularManualComplete/);
  assert.match(editor, /npm", \["run", "build"\]/);
  assert.match(editor, /الملفات المرتبطة بهذه الخطوة/);
});

test("local and Netlify hosts send the headers required for cross-origin isolation", () => {
  const vite = read("vite.config.js");
  const netlify = read("netlify.toml");
  for (const source of [vite, netlify]) {
    assert.match(source, /Cross-Origin-Embedder-Policy/);
    assert.match(source, /credentialless/);
    assert.match(source, /Cross-Origin-Opener-Policy/);
    assert.match(source, /same-origin/);
  }
  assert.match(netlify, /command = "npm run build"/);
  assert.match(netlify, /publish = "dist"/);
  for (const script of ["lessons-data.js", "angular-course-data.js", "learner-profiles.js", "app.js"]) {
    assert.ok(vite.includes('"' + script + '"'), script + " is copied into the static build");
  }
  assert.match(vite, /this\.emitFile/);
});

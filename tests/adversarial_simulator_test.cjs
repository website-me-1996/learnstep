/**
 * tests/adversarial_simulator_test.cjs
 * Empirical Adversarial Verification & Stress Harness for Milestone 1 (Phase 1: TypeScript Foundation).
 * Authored by: Empirical Challenger M1_2
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ROOT_DIR = path.resolve(__dirname, "..");
const { createEditorEnvironment, loadCourseData } = require("./e2e/helpers/e2e_harness.cjs");

const courseData = loadCourseData().data;
assert.ok(courseData, "ANGULAR_COURSE_DATA must be loaded");

const testResults = [];
function test(category, testName, testFn) {
  try {
    testFn();
    testResults.push({ category, name: testName, status: "PASS" });
    console.log(`  [PASS] (${category}) ${testName}`);
  } catch (err) {
    testResults.push({ category, name: testName, status: "FAIL", error: err.message, stack: err.stack });
    console.log(`  [FAIL] (${category}) ${testName}\n         ERROR: ${err.message}`);
  }
}

console.log("===============================================================================");
console.log("CHALLENGER 2: EMPIRICAL ADVERSARIAL STRESS TEST FOR ANGULAR SIMULATOR RUNTIME");
console.log("===============================================================================\n");

// =============================================================================
// CATEGORY 1: PHASE 1 LESSON CODES EXTRACTION (LESSONS 0 TO 9)
// =============================================================================
console.log("--- CATEGORY 1: Phase 1 Lesson Codes Extraction (`renderTypeScriptPreviewDoc`) ---");

const env = createEditorEnvironment();
const { context, getEl, setFiles, setActivePath, runSimulatedPreview, getPreviewSrcdoc } = env;

function renderDoc(code, filePath) {
  return vm.runInContext(`renderTypeScriptPreviewDoc(${JSON.stringify(code)}, ${JSON.stringify(filePath)})`, context);
}

test("Phase1Extraction", "1.0 Verify 10 Phase 1 lessons exist and have valid structure", () => {
  assert.ok(Array.isArray(courseData.lessons), "lessons must be an array");
  assert.ok(courseData.lessons.length >= 56, `Expected at least 56 lessons, got ${courseData.lessons.length}`);
  for (let i = 0; i < 10; i++) {
    const l = courseData.lessons[i];
    assert.strictEqual(l.id, `ng-ts-${String(i + 1).padStart(2, "0")}`, `Lesson ${i} id mismatch`);
    assert.ok(l.code, `Lesson ${i} code missing`);
    assert.ok(l.expected, `Lesson ${i} expected missing`);
    assert.strictEqual(l.steps.length, 5, `Lesson ${i} must have exactly 5 steps`);
  }
});

const phase1Checks = [
  { index: 0, id: "ng-ts-01", expectInDoc: ["defaultCinemaCity", "string", "الرياض", "المتغيرات والقيم"] },
  { index: 1, id: "ng-ts-02", expectInDoc: ["cinemaGenres", "readonly string[]", "المتغيرات والقيم"] },
  { index: 2, id: "ng-ts-03", expectInDoc: ["interface Movie", "durationMinutes", "number", "isAvailable", "boolean", "الواجهات البرمجية"] },
  { index: 3, id: "ng-ts-04", expectInDoc: ["SeatTier", "standard", "vip", "suite", "الأنواع المستعارة"] },
  { index: 4, id: "ng-ts-05", expectInDoc: ["function calculateFinalPrice", "discountPercent", "number", "الأصناف والدوال والتعدادات"] },
  { index: 5, id: "ng-ts-06", expectInDoc: ["class CinemaHall", "الأصناف والدوال والتعدادات"] },
  { index: 6, id: "ng-ts-07", expectInDoc: ["interface ApiResponse", "success", "boolean", "data", "T", "الواجهات البرمجية"] },
  { index: 7, id: "ng-ts-08", expectInDoc: ["enum BookingStatus", "PENDING", "CONFIRMED", "CANCELLED", "الأصناف والدوال والتعدادات"] },
  { index: 8, id: "ng-ts-09", expectInDoc: ["function LogComponent", "target: Function", "الأصناف والدوال والتعدادات"] },
  { index: 9, id: "ng-ts-10", expectInDoc: ["function getCustomerPhone", "customer?: { phone?: string }", "الأصناف والدوال والتعدادات"] }
];

phase1Checks.forEach(({ index, id, expectInDoc }) => {
  test("Phase1Extraction", `1.${index + 1} Extract symbols from ${id} (${courseData.lessons[index].title})`, () => {
    const lesson = courseData.lessons[index];
    const doc = renderDoc(lesson.code, lesson.file);
    assert.ok(doc, `renderTypeScriptPreviewDoc returned empty for ${id}`);
    assert.ok(doc.includes("<!doctype html>"), `Document must contain HTML doctype for ${id}`);
    expectInDoc.forEach((term) => {
      assert.ok(doc.includes(term), `Doc for ${id} missing expected term: "${term}"`);
    });
  });
});

test("Phase1Extraction", "1.11 Extract symbols from all Phase 1 Practice Step (Step 2) build codes", () => {
  for (let i = 0; i < 10; i++) {
    const lesson = courseData.lessons[i];
    const practiceStep = lesson.steps[2];
    assert.strictEqual(practiceStep.type, "build", `Step 2 must be type 'build' in lesson ${lesson.id}`);
    if (practiceStep.code) {
      const doc = renderDoc(practiceStep.code, lesson.file);
      assert.ok(doc.includes("<!doctype html>"), `Practice doc must contain valid HTML for ${lesson.id}`);
    }
  }
});

// =============================================================================
// CATEGORY 2: ADVERSARIAL STRESS TESTING OF `renderTypeScriptPreviewDoc()`
// =============================================================================
console.log("\n--- CATEGORY 2: Adversarial Stress Testing of `renderTypeScriptPreviewDoc()` ---");

test("StressTypeScript", "2.1 Complex interface with multiple inheritance and generic constraints", () => {
  const tsCode = `
    export interface AuditableEntity {
      createdAt: Date;
      updatedAt: Date;
    }
    export interface CinemaMovie<TId extends string | number, TMeta = any> extends AuditableEntity {
      id: TId;
      meta?: TMeta;
      screenings: Array<{ hallId: string; time: string }>;
    }
  `;
  const doc = renderDoc(tsCode, "src/models/complex.model.ts");
  assert.ok(doc.includes("AuditableEntity"), "Should extract AuditableEntity");
  assert.ok(doc.includes("CinemaMovie"), "Should extract CinemaMovie with generic params");
  assert.ok(doc.includes("createdAt"), "Should extract createdAt field");
  assert.ok(doc.includes("screenings"), "Should extract screenings field");
});

test("StressTypeScript", "2.2 Interfaces with inline comments and multiline comments", () => {
  const tsCode = `
    interface SeatReservation {
      // Primary identifier
      seatId: string; // inline comment
      /* Reserved status */
      isReserved: boolean;
      price: number;
    }
  `;
  const doc = renderDoc(tsCode, "src/models/seat.ts");
  assert.ok(doc.includes("SeatReservation"), "Should extract SeatReservation");
  assert.ok(doc.includes("seatId"), "Should extract seatId");
  assert.ok(!doc.includes("// Primary identifier"), "Comments should not leak into field names");
  assert.ok(!doc.includes("/* Reserved status */"), "Block comments should not leak into field names");
});

test("StressTypeScript", "2.3 Type aliases with multiline union and intersection types", () => {
  const tsCode = `
    export type PaymentMethod =
      | 'credit_card'
      | 'apple_pay'
      | 'mada'
      | 'cash';
    type UserWithRole = User & { role: 'admin' | 'cashier' };
  `;
  const doc = renderDoc(tsCode, "src/models/payment.ts");
  assert.ok(doc.includes("PaymentMethod"), "Should extract PaymentMethod");
  assert.ok(doc.includes("UserWithRole"), "Should extract UserWithRole");
});

test("StressTypeScript", "2.4 Classes with decorators, multiple access modifiers, and static members", () => {
  const tsCode = `
    @Component({ selector: 'app-cinema' })
    export class CinemaComponent {
      public static readonly MAX_SEATS = 250;
      private _secretCode: string = 'XYZ';
      protected baseRate: number = 50;
      constructor(private http: any) {}
      public bookSeat(seat: string): boolean {
        return true;
      }
    }
  `;
  const doc = renderDoc(tsCode, "src/app/cinema.component.ts");
  assert.ok(doc.includes("class CinemaComponent"), "Should extract class CinemaComponent");
});

test("StressTypeScript", "2.5 Generic functions with multiple type params and multiline signatures", () => {
  const tsCode = `
    export function transformData<TInput, TOutput>(
      input: TInput,
      transformFn: (item: TInput) => TOutput
    ): TOutput {
      return transformFn(input);
    }
  `;
  const doc = renderDoc(tsCode, "src/utils/transform.ts");
  assert.ok(doc.includes("function transformData"), "Should extract function transformData");
  assert.ok(doc.includes("TInput"), "Should include TInput in signature");
});

test("StressTypeScript", "2.6 Enums with string values, numeric values, and trailing commas", () => {
  const tsCode = `
    export enum CinemaTier {
      Standard = 10,
      VIP = 20,
      VVIP = 30,
    }
    enum TicketState {
      NEW = 'NEW',
      PRINTED = 'PRINTED',
      SCANNED = 'SCANNED',
    }
  `;
  const doc = renderDoc(tsCode, "src/models/tiers.ts");
  assert.ok(doc.includes("CinemaTier"), "Should extract CinemaTier");
  assert.ok(doc.includes("Standard = 10") || doc.includes("Standard"), "Should extract CinemaTier values");
  assert.ok(doc.includes("TicketState"), "Should extract TicketState");
  assert.ok(doc.includes("PRINTED"), "Should extract TicketState values");
});

test("StressTypeScript", "2.7 Console.log with template literals, multiple args, and expressions", () => {
  const tsCode = `
    const user = 'سارة';
    const tickets = 3;
    console.log(\`حجز المستخدم \${user} عدد \${tickets} تذاكر\`);
    console.log('إجمالي المبلغ:', 255);
    console.log(user);
    console.log();
  `;
  const doc = renderDoc(tsCode, "src/main.ts");
  assert.ok(doc.includes("سارة"), "Should resolve variable user in console log");
  assert.ok(doc.includes("حجز المستخدم"), "Should output template literal console log");
  assert.ok(doc.includes("إجمالي المبلغ:"), "Should output multi-arg console log");
});

test("StressTypeScript", "2.8 Malformed and empty TypeScript inputs must not crash simulator", () => {
  const emptyDoc = renderDoc("", "src/models/empty.ts");
  assert.ok(emptyDoc.includes("ts-empty-state"), "Empty code should render clean empty state");

  const unclosedIfaceDoc = renderDoc("export interface Broken {", "src/models/broken.ts");
  assert.ok(unclosedIfaceDoc.includes("<!doctype html>"), "Unclosed interface must not throw");

  const malformedDoc = renderDoc("@#$%^&*()_+{}[]:;<>,.?/|~`", "src/models/garbage.ts");
  assert.ok(malformedDoc.includes("<!doctype html>"), "Malformed code must not throw");

  const commentsOnlyDoc = renderDoc("// only a comment\n/* block */", "src/models/comment.ts");
  assert.ok(commentsOnlyDoc.includes("<!doctype html>"), "Comments-only code must not throw");
});

// =============================================================================
// CATEGORY 3: ALL CLASSIC AND ORIGINAL ANGULAR LESSONS COMPATIBILITY (INDICES 10 TO 68)
// =============================================================================
console.log("\n--- CATEGORY 3: All Classic and Original Angular Lessons Compatibility (Indices 10-68) ---");

test("ClassicLessons", "3.0 Verify Phase 2 (10-22) and legacy lessons continuity", () => {
  const p2Lessons = courseData.lessons.slice(10, 23);
  const legacyStartIndex = courseData.lessons.findIndex(l => l.id === "ng-intro");
  const legacyLessons = courseData.lessons.slice(legacyStartIndex);
  assert.strictEqual(p2Lessons.length, 13, "Must have exactly 13 Phase 2 classic Angular lessons");
  assert.strictEqual(legacyLessons.length, 46, "Must have exactly 46 legacy Angular lessons");
  assert.strictEqual(courseData.lessons[10].id, "ng-classic-01", "Lesson 10 must be ng-classic-01");
  assert.strictEqual(courseData.lessons[22].id, "ng-classic-13", "Lesson 22 must be ng-classic-13");
  assert.strictEqual(courseData.lessons[legacyStartIndex].id, "ng-intro", "Legacy starts with ng-intro");
  assert.strictEqual(courseData.lessons[courseData.lessons.length - 1].id, "final-review", "Last lesson must be final-review");
});

test("ClassicLessons", "3.1 Render Angular simulated template preview for all classic and original lessons", () => {
  const statusEl = getEl("angularPreviewStatus");

  for (let i = 10; i < courseData.lessons.length; i++) {
    const lesson = courseData.lessons[i];

    vm.runInContext(`
      currentLessonIndex = ${i};
      activePath = "src/app/app.html";
      serverUrl = "";
    `, context);

    setFiles({
      "src/app/app.html": `<main class="cinema-shell"><h1>{{ title }}</h1><p *ngIf="isAvailable">متاح للحجز</p></main>`,
      "src/app/app.ts": `export class AppComponent { title = '${lesson.title.replace(/'/g, "\\'")}'; isAvailable = true; }`,
      "src/app/app.css": `.cinema-shell { color: #fff; }`,
      "src/styles.css": `body { margin: 0; }`
    });

    runSimulatedPreview();
    const srcdoc = getPreviewSrcdoc();

    assert.strictEqual(
      statusEl.textContent,
      "معاينة حية لتطبيق Angular",
      `Lesson ${i} (${lesson.id}) status must be 'معاينة حية لتطبيق Angular', got '${statusEl.textContent}'`
    );
    assert.ok(
      srcdoc.includes("cinema-shell"),
      `Lesson ${i} (${lesson.id}) srcdoc must contain 'cinema-shell'`
    );
    assert.ok(
      srcdoc.includes("متاح للحجز"),
      `Lesson ${i} (${lesson.id}) srcdoc must contain resolved *ngIf content 'متاح للحجز'`
    );
  }
});

test("ClassicLessons", "3.2 Verify modern and classic directives work seamlessly across classic lessons", () => {
  vm.runInContext(`
    currentLessonIndex = 10;
    activePath = "src/app/app.html";
    serverUrl = "";
  `, context);

  setFiles({
    "src/app/app.html": `
      <div class="test-container">
        @if (isAvailable) {
          <span class="modern-if">متاح عبر @if</span>
        }
        @for (m of movies; track m.id) {
          <div class="movie-item">{{ m.title }} - {{ m.price }}</div>
        }
        <button [disabled]="!isAvailable" [ngClass]="{ 'active-vip': isVip }">حجز</button>
      </div>
    `,
    "src/app/app.ts": `
      export class AppComponent {
        isAvailable = true;
        isVip = true;
        movies = signal([
          { id: 1, title: 'فيلم الاختبار', price: 90 }
        ]);
      }
    `
  });

  runSimulatedPreview();
  const srcdoc = getPreviewSrcdoc();

  assert.ok(srcdoc.includes("متاح عبر @if"), "@if control flow failed to render in classic lesson");
  assert.ok(srcdoc.includes("فيلم الاختبار - 90"), "@for loop failed to render in classic lesson");
  assert.ok(srcdoc.includes("active-vip"), "[ngClass] failed to apply active-vip class");
});

// =============================================================================
// CATEGORY 4: GUARD ROBUSTNESS AT LINE 1079 IN `angular-editor.js`
// =============================================================================
console.log("\n--- CATEGORY 4: Guard Robustness at Line 1079 in `angular-editor.js` ---");

test("GuardLine1079", "4.1 Missing files scenario (currentFiles = {}) must not throw", () => {
  const statusEl = getEl("angularPreviewStatus");

  vm.runInContext(`
    currentLessonIndex = 0;
    activePath = "src/app/models/movie.model.ts";
    serverUrl = "";
  `, context);

  setFiles({});

  assert.doesNotThrow(() => {
    runSimulatedPreview();
  }, "updateAngularSimulatedPreview threw with empty currentFiles");

  assert.strictEqual(statusEl.textContent, "محاكي ومخرجات TypeScript");
  const srcdoc = getPreviewSrcdoc();
  assert.ok(srcdoc.includes("ts-container"), "Should render TS container even with empty files");
});

test("GuardLine1079", "4.2 Empty string and whitespace-only src/app/app.html", () => {
  const statusEl = getEl("angularPreviewStatus");

  // Scenario A: app.html is empty string ""
  vm.runInContext(`
    currentLessonIndex = 0;
    activePath = "src/app/models/movie.model.ts";
  `, context);
  setFiles({
    "src/app/app.html": "",
    "src/app/models/movie.model.ts": "export interface Movie { id: number; }"
  });

  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "محاكي ومخرجات TypeScript", "Empty app.html must not override TS phase");
  assert.ok(getPreviewSrcdoc().includes("interface Movie"));

  // Scenario B: app.html has only whitespace "   \n\t  "
  setFiles({
    "src/app/app.html": "   \n\t  ",
    "src/app/models/movie.model.ts": "export interface Movie { id: number; }"
  });
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "محاكي ومخرجات TypeScript", "Whitespace app.html must not override pure TS model file");
  assert.ok(getPreviewSrcdoc().includes("interface Movie"));
});

test("GuardLine1079", "4.3 TS Phase switching: pure TS model vs active HTML editing", () => {
  const statusEl = getEl("angularPreviewStatus");

  vm.runInContext(`
    currentLessonIndex = 2; // ng-ts-03
    serverUrl = "";
  `, context);

  setFiles({
    "src/app/models/movie.model.ts": "export interface Movie { id: number; title: string; }",
    "src/app/app.html": "<main><h1>{{ title }}</h1></main>",
    "src/app/app.ts": "export class AppComponent { title = 'السينما التفاعلية'; }"
  });

  // State 1: Viewing pure TS model
  setActivePath("src/app/models/movie.model.ts");
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "محاكي ومخرجات TypeScript", "Expected TS preview when viewing movie.model.ts");
  assert.ok(getPreviewSrcdoc().includes("interface Movie"), "Preview should show interface Movie");

  // State 2: User switches to edit app.html
  setActivePath("src/app/app.html");
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "معاينة حية لتطبيق Angular", "Expected Angular preview when editing app.html");
  assert.ok(getPreviewSrcdoc().includes("السينما التفاعلية"), "Preview should show rendered Angular template");

  // State 3: User switches back to movie.model.ts
  setActivePath("src/app/models/movie.model.ts");
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "محاكي ومخرجات TypeScript", "Expected TS preview after switching back");
  assert.ok(getPreviewSrcdoc().includes("interface Movie"), "Preview should show interface Movie again");
});

test("GuardLine1079", "4.4 Classic Lesson switching: app.ts vs standalone pure service/model", () => {
  const statusEl = getEl("angularPreviewStatus");

  vm.runInContext(`
    currentLessonIndex = 26; // ng-classic-11
    serverUrl = "";
  `, context);

  setFiles({
    "src/app/app.ts": "export class AppComponent { title = 'خدمة السينما الكلاسيكية'; }",
    "src/app/app.html": "<h1>{{ title }}</h1>",
    "src/app/services/movie.service.ts": `
      export class MovieService {
        getMovies(): string[] { return ['أكشن', 'دراما']; }
      }
    `
  });

  // State 1: In classic lesson, viewing app.ts with app.html present -> Angular preview
  setActivePath("src/app/app.ts");
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "معاينة حية لتطبيق Angular", "Classic lesson on app.ts should render Angular preview");
  assert.ok(getPreviewSrcdoc().includes("خدمة السينما الكلاسيكية"));

  // State 2: In classic lesson, user opens movie.service.ts -> TS preview doc
  setActivePath("src/app/services/movie.service.ts");
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "محاكي ومخرجات TypeScript", "Opening pure service in classic lesson must render TS preview doc");
  assert.ok(getPreviewSrcdoc().includes("class MovieService"));

  // State 3: User switches back to app.ts -> Angular preview
  setActivePath("src/app/app.ts");
  runSimulatedPreview();
  assert.strictEqual(statusEl.textContent, "معاينة حية لتطبيق Angular", "Switching back to app.ts should restore Angular preview");
  assert.ok(getPreviewSrcdoc().includes("خدمة السينما الكلاسيكية"));
});

test("GuardLine1079", "4.5 Guard handles null activeLesson, missing file props, and extreme targetPaths", () => {
  setFiles({ "src/app/app.html": "<h1>Safe Fallback</h1>" });

  // Case A: activeLesson returns null
  assert.doesNotThrow(() => {
    vm.runInContext(`
      {
        const oldActive = activeLesson;
        activeLesson = () => null;
        updateAngularSimulatedPreview();
        activeLesson = oldActive;
      }
    `, context);
  }, "Crashed with activeLesson returning null");

  // Case B: activeLesson returns empty object
  assert.doesNotThrow(() => {
    vm.runInContext(`
      {
        const oldActive = activeLesson;
        activeLesson = () => ({});
        updateAngularSimulatedPreview();
        activeLesson = oldActive;
      }
    `, context);
  }, "Crashed with activeLesson returning empty object");

  // Case C: activePath with unusual characters / no extension
  setActivePath("README");
  assert.doesNotThrow(() => runSimulatedPreview(), "Crashed with activePath 'README'");

  // Case D: targetPath with uppercase extension
  setActivePath("src/app/models/seat.model.TS");
  assert.doesNotThrow(() => runSimulatedPreview(), "Crashed with uppercase extension");

  // Case E: targetPath with dot in folder name
  setActivePath("src/app.v2/models/seat.ts");
  assert.doesNotThrow(() => runSimulatedPreview(), "Crashed with dot in folder path");
});

test("GuardLine1079", "4.6 Rapid re-entrant simulator preview execution stress", () => {
  for (let cycle = 0; cycle < 100; cycle++) {
    const isTs = cycle % 2 === 0;
    const lessonIdx = isTs ? 0 : 15;
    vm.runInContext(`currentLessonIndex = ${lessonIdx};`, context);
    setActivePath(isTs ? "src/app/models/movie.model.ts" : "src/app/app.html");
    setFiles({
      "src/app/app.html": `<h2>Cycle ${cycle}</h2>`,
      "src/app/models/movie.model.ts": `export const cycleNumber: number = ${cycle};`,
      "src/app/app.ts": `export class App { title = 'Cycle ${cycle}'; }`
    });
    runSimulatedPreview();
  }
  assert.ok(true, "Completed 100 rapid cycles without failure");
});

// =============================================================================
// SUMMARY
// =============================================================================
console.log("\n===============================================================================");
console.log("FINAL ADVERSARIAL STRESS TEST SUMMARY:");
console.log("===============================================================================");
const total = testResults.length;
const passed = testResults.filter(r => r.status === "PASS").length;
const failed = testResults.filter(r => r.status === "FAIL").length;
console.log(`Total Tests Run: ${total} | Passed: ${passed} | Failed: ${failed}`);

if (failed > 0) {
  console.log("\n❌ FAILURES ENCOUNTERED:");
  testResults.filter(r => r.status === "FAIL").forEach(r => {
    console.log(`- [${r.category}] ${r.name}`);
    console.log(`  Reason: ${r.error}`);
  });
  process.exit(1);
} else {
  console.log("\n🎉 ALL ADVERSARIAL STRESS TESTS PASSED EMPIRICALLY (Zero Defects).");
  process.exit(0);
}

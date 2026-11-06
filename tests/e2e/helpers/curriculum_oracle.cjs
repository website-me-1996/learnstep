/**
 * Authoritative Curriculum Oracle & Specification for Khotwa Angular 22
 * Derived directly from PROJECT.md, ORIGINAL_REQUEST.md, and Explorer 3 Survey Handoff.
 * 
 * Contains complete architectural specification for all 60 lessons across 7 phases:
 * Phase 1: TypeScript Foundation (10 lessons)
 * Phase 2: Classic Angular Core & Enterprise Migration (13 lessons)
 * Phase 3: Modern Standalone & Control Flow (7 lessons)
 * Phase 4: Signals Reactive Engine (8 lessons)
 * Phase 5: Modern DI, HttpClient & Interop (7 lessons)
 * Phase 6: Routing & Typed Reactive Forms (6 lessons)
 * Phase 7: Capstone Khotwa Cinema Pro Enterprise (9 lessons)
 */

const CURRICULUM_SPEC = [
  // --- Phase 1: TypeScript Foundation (10 lessons) ---
  {
    id: 'ng-ts-01',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'ما هو TypeScript ولماذا تحتاجه Angular؟',
    concept: 'نظام الأنواع البدائية (string, number, boolean) وفحص الأخطاء الثابت قبل التشغيل.',
    flow: 'متغير بنوع صريح ⟶ فحص فوري للأخطاء ⟶ تصريف آمن',
    task: 'عرّف متغير المدينة الافتراضية بنوع نصي صريح string.',
    file: 'src/app/models/movie.model.ts',
    code: "export const defaultCinemaCity: string = 'الرياض';",
    expected: "export const defaultCinemaCity: string = 'الرياض';",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
    quiz: {
      question: 'ما الفائدة الأساسية للأنواع الثابتة (Static Types) في TypeScript؟',
      options: ['كشف الأخطاء البرمجية أثناء الكتابة وقبل التشغيل', 'تسريع تحميل الصور', 'إلغاء الحاجة للمتصفح'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-02',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'مصفوفات البيانات والـ Tuples في TypeScript',
    concept: 'مصفوفات الأنواع الصريحة string[] ومصفوفات القراءة فقط readonly لمنع التعديل.',
    flow: 'تحديد نوع العناصر ⟶ منع إدخال قيم غريبة ⟶ قراءة آمنة',
    task: 'أنشئ مصفوفة تصنيفات الأفلام بنوع readonly string[].',
    file: 'src/app/models/movie.model.ts',
    code: "export const cinemaGenres: readonly string[] = ['أكشن', 'دراما', 'كوميديا', 'خيال علمي'];",
    expected: "export const cinemaGenres: readonly string[] = ['أكشن', 'دراما', 'كوميديا', 'خيال علمي'];",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays',
    quiz: {
      question: 'ماذا تفيد كلمة readonly مع مصفوفة TypeScript؟',
      options: ['تمنع تعديل المصفوفة أو إضافة عناصر جديدة إليها', 'تخفي عناصر المصفوفة', 'ترتب العناصر أبجدياً'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-03',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'واجهات البيانات (Interfaces) وهيكلة كائنات السينما',
    concept: 'الـ Interface كعقد هندسي صارم يحدد خصائص الكائن والحقول الاختيارية ? والقراءة فقط readonly.',
    flow: 'عقد Movie ⟶ كائن مطابق ⟶ حماية من الأخطاء الإملائية',
    task: 'عرّف واجهة Movie بخصائص id, title, durationMinutes, rating, posterUrl, genre, isAvailable.',
    file: 'src/app/models/movie.model.ts',
    code: "export interface Movie {\n  readonly id: number;\n  title: string;\n  durationMinutes: number;\n  rating: number;\n  posterUrl: string;\n  genre: string;\n  isAvailable?: boolean;\n}",
    expected: "export interface Movie {",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces',
    quiz: {
      question: 'ماذا تعني علامة الاستفهام ? بعد اسم الحقل في Interface؟',
      options: ['أن الحقل اختياري ويمكن للكائن أن يوجد بدونه', 'أن الحقل إجباري', 'أن الحقل يقبل الأرقام فقط'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-04',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'الأنواع المركبة (Type Aliases) والـ Union Types',
    concept: 'الـ Union Type (|) لتحديد خيارات حصرية لفئات المقاعد وتضييق الأنواع.',
    flow: 'نوع مخصص ⟶ منع إدخال نصوص مجهولة ⟶ حماية واجهة الحجز',
    task: "عرّف نوع فئات المقاعد SeatTier بقيم 'standard' | 'vip' | 'suite'.",
    file: 'src/app/models/seat.model.ts',
    code: "export type SeatTier = 'standard' | 'vip' | 'suite';",
    expected: "export type SeatTier = 'standard' | 'vip' | 'suite';",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types',
    quiz: {
      question: 'إذا عرّفنا نوعاً بقيم محددة عبر Union Type، ماذا يحدث عند إسناد قيمة غير مدرجة؟',
      options: ['يرفض TypeScript الكود فوراً ويظهر خطأ في الترجمة', 'يتجاهل الخطأ ويضيفها', 'يحول القيمة إلى رقم'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-05',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'كتابة الدوال بدقة بالغة (Typed Functions & Return Types)',
    concept: 'ضبط أنواع معاملات الدالة وتحديد نوع القيمة المعادة صراحة.',
    flow: 'مدخلات محكمة ⟶ حساب السعر مع الخصم ⟶ مخرج رقمي مضمون',
    task: 'اكتب دالة calculateFinalPrice بمعاملات رقمية basePrice و discountPercent وقيمة معادة number.',
    file: 'src/app/models/pricing.utils.ts',
    code: "export function calculateFinalPrice(basePrice: number, discountPercent: number): number {\n  return basePrice - (basePrice * discountPercent / 100);\n}",
    expected: "export function calculateFinalPrice(basePrice: number, discountPercent: number): number {",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
    quiz: {
      question: 'ما أهمية كتابة نوع القيمة المعادة بعد قوسي الدالة في TypeScript؟',
      options: ['إلزام الدالة بإرجاع نفس النوع والتنبيه إذا تم إرجاع قيمة مخالفة', 'تسريع معالج الحاسوب', 'حذف القيم السالبة'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-06',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'البرمجة كائنية التوجه (OOP): الأصناف ومحددات الوصول',
    concept: 'أصناف TypeScript ومحددات الوصول public و private وخصائص المنشئ.',
    flow: 'كلاس CinemaHall ⟶ حماية السعة القصوى بـ private ⟶ إتاحة الحجز الآمن',
    task: 'أنشئ صنف CinemaHall مع منشئ يقبل public readonly name و private totalCapacity.',
    file: 'src/app/models/hall.model.ts',
    code: "export class CinemaHall {\n  constructor(public readonly name: string, private totalCapacity: number) {}\n  getCapacity(): number { return this.totalCapacity; }\n}",
    expected: "export class CinemaHall {",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
    quiz: {
      question: 'أي محدد وصول يمنع قراءة المتغير أو تعديله من خارج الكلاس؟',
      options: ['private', 'public', 'static'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-07',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'القوالب العامة المتقدمة (Generics <T>)',
    concept: 'كتابة واجهات ودوال عامة مرنة تقبل أي نوع مع الحفاظ على الأمان النوعي الكامل.',
    flow: 'واجهة ApiResponse<T> ⟶ تمرير كائن الفيلم ⟶ رد خادم مطابق',
    task: 'عرّف واجهة الرد العامة ApiResponse<T> بخصائص success, data: T, timestamp.',
    file: 'src/app/models/api-response.model.ts',
    code: "export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  timestamp: string;\n}",
    expected: "export interface ApiResponse<T> {",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    quiz: {
      question: 'ما الهدف الأساسي من استخدام Generics <T> في TypeScript؟',
      options: ['كتابة كود مرن قابل لإعادة الاستخدام مع أنواع متعددة بأمان نوعي كامل', 'زيادة سرعة الإنترنت', 'تشفير الكود'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-08',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'التعدادات (Enums) وإدارة الحالات الثابتة للسينما',
    concept: 'استخدام Enums لتحديد حالات الحجز الثابتة وتفادي أخطاء النصوص العشوائية.',
    flow: 'تعريف حالات BookingStatus ⟶ ربطها بالحجز ⟶ تتبع دقيق',
    task: 'أنشئ التعداد BookingStatus بقيم Pending و Confirmed و Cancelled.',
    file: 'src/app/models/booking.model.ts',
    code: "export enum BookingStatus {\n  Pending = 'PENDING',\n  Confirmed = 'CONFIRMED',\n  Cancelled = 'CANCELLED'\n}",
    expected: "export enum BookingStatus {",
    reference: 'https://www.typescriptlang.org/docs/handbook/2/enums.html',
    quiz: {
      question: 'لماذا نفضل استخدام Enum بدلاً من كتابة نصوص عشوائية لحالات الحجز؟',
      options: ['لتوحيد مسميات الحالات ومنع الأخطاء الإملائية في كل المشروع', 'لتقليل حجم الخط', 'لأن المتصفح لا يفهم النصوص'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-09',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'مدخل إلى الزخارف (Decorators) ومفهوم Metadata في Angular',
    concept: 'الزخارف كدوال تضيف بيانات وصفية (Metadata) للكلاسات تمهيداً لـ @Component في Angular.',
    flow: 'كلاس TS عادي ⟶ إضافة زخرف بالبيانات الوصفية ⟶ التعرف عليه ككيان',
    task: 'اكتب دالة الزخرف Entity لتسجيل اسم الكيان على هدف الكلاس.',
    file: 'src/app/models/metadata.demo.ts',
    code: "export function Entity(meta: { name: string }) {\n  return function (target: Function) { (target as any).entityName = meta.name; };\n}",
    expected: "export function Entity(meta: { name: string }) {",
    reference: 'https://www.typescriptlang.org/docs/handbook/decorators.html',
    quiz: {
      question: 'ما هو دور الـ Decorators مثل @Component في Angular؟',
      options: ['تزويد الكلاس ببيانات وصفية ليعرف Angular كيفية تصييره وتشغيله', 'فحص الاتصال بالإنترنت', 'حفظ الملفات على القرص'],
      correct: 0
    }
  },
  {
    id: 'ng-ts-10',
    phaseNumber: 1,
    phase: 'المرحلة 1: تأسيس واحتراف TypeScript',
    title: 'الأمان التام ضد القيم المعدومة (Null Safety & Operators)',
    concept: 'منع انهيار التطبيق باستخدام عاملي الوصول المشروط ?. والدمج مع المعدوم ??.',
    flow: 'استقبال بيانات الزائر ⟶ فحص آمن بـ ?. ⟶ بديل افتراضي بـ ??',
    task: 'اكتب دالة getCustomerPhone لقراءة هاتف العميل بأمان وإرجاع قيمة افتراضية.',
    file: 'src/app/models/booking.model.ts',
    code: "export function getCustomerPhone(customer?: { phone?: string }): string {\n  return customer?.phone ?? 'غير متوفر';\n}",
    expected: "export function getCustomerPhone(customer?: { phone?: string }): string {",
    reference: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining',
    quiz: {
      question: 'ماذا تعيد الدالة إذا تم تمرير كائن لا يحتوي على حقل phone؟',
      options: ["تعيد النص الافتراضي 'غير متوفر' دون حدوث أي خطأ", 'تنهار الصفحة وتظهر شاشة بيضاء', 'تعيد قيمة صفر'],
      correct: 0
    }
  },

  // --- Phase 2: Classic Angular Core (13 lessons) ---
  {
    id: 'ng-classic-01',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'المعمارية الكلاسيكية وتشريح الـ NgModule',
    concept: 'تنظيم التطبيق عبر وحدات NgModule مع declarations و imports و providers و bootstrap.',
    flow: 'ملف AppModule ⟶ تجميع التبعيات ⟶ إقلاع التطبيق الكلاسيكي',
    task: 'عرّف الوحدة الكلاسيكية AppClassicModule مع استيراد CommonModule.',
    file: 'src/app/classic/app-classic.module.ts',
    code: "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@NgModule({\n  declarations: [],\n  imports: [CommonModule],\n  providers: []\n})\nexport class AppClassicModule {}",
    expected: 'export class AppClassicModule {}',
    reference: 'https://angular.dev/guide/ngmodules',
    quiz: {
      question: 'أين يتم تسجيل المكونات التابعة للـ NgModule الكلاسيكي؟',
      options: ['في مصفوفة declarations', 'في مصفوفة imports', 'في مصفوفة providers'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-02',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'تشريح المكون الكلاسيكي وتوصيله بالوحدة',
    concept: 'المكون الكلاسيكي بدون standalone: true الذي يعتمد على تسجيله داخل NgModule.',
    flow: 'إنشاء الكلاس ⟶ ربطه بـ AppModule ⟶ استدعاؤه بالمحدد selector',
    task: 'أنشئ المكون الكلاسيكي MovieCardClassicComponent مع قالب مبسط.',
    file: 'src/app/classic/movie-card-classic.component.ts',
    code: "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card-classic',\n  template: '<div class=\"movie-pill\"><b>{{ movieTitle }}</b></div>'\n})\nexport class MovieCardClassicComponent {\n  movieTitle = 'مغامرة الفضاء الكلاسيكية';\n}",
    expected: 'export class MovieCardClassicComponent {',
    reference: 'https://angular.dev/guide/components',
    quiz: {
      question: 'ما الذي يميز المكون الكلاسيكي عن المكون المستقل (Standalone)؟',
      options: ['لا يحتوي على standalone: true ويجب تسجيله في وحدة NgModule', 'لا يملك قالباً مرئياً', 'لا يعمل في متصفح Chrome'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-03',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'العرض والربط الكلاسيكي (Property Binding)',
    concept: 'ربط خصائص عناصر DOM بمتغيرات الكلاس عبر الأقواس المربعة [property].',
    flow: 'متغير الحالة في الكلاس ⟶ ربط بالخاصية ⟶ تعطيل الزر عند نفاذ التذاكر',
    task: 'أضف زراً مربوطاً بخاصية [disabled]="isSoldOut" لحجز التذكرة.',
    file: 'src/app/app.html',
    code: '<button class="btn-book" [disabled]="isSoldOut">حجز التذكرة</button>',
    expected: '<button class="btn-book" [disabled]="isSoldOut">حجز التذكرة</button>',
    reference: 'https://angular.dev/guide/templates/property-binding',
    quiz: {
      question: 'ما هي الأقواس المستخدمة لربط خاصية في عنصر HTML بقيمة من الكلاس؟',
      options: ['الأقواس المربعة [disabled]="isSoldOut"', 'الأقواس الهلالية (disabled)', 'الأقواس المعقوفة {{ }}'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-04',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'الاستماع للأحداث (Event Binding (click))',
    concept: 'التقاط تفاعلات المستخدم وربطها بدوال الكلاس عبر الأقواس الهلالية (event).',
    flow: 'نقرة الزائر ⟶ التقاط الحدث ⟶ تنفيذ دالة onBookTicket()',
    task: 'أضف زراً يستمع لحدث النقر (click)="onBookTicket()".',
    file: 'src/app/app.html',
    code: '<button type="button" class="btn-book" (click)="onBookTicket()">احجز مقعدك الآن</button>',
    expected: '(click)="onBookTicket()"',
    reference: 'https://angular.dev/guide/templates/event-binding',
    quiz: {
      question: 'ما الأقواس المستخدمة في Angular للاستماع لأحداث المستخدم مثل النقر؟',
      options: ['الأقواس الهلالية الدائرية (click)="doSomething()"', 'الأقواس المربعة [click]', 'الأقواس المزدوجة {{ }}'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-05',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'التوجيه الهيكلي الكلاسيكي: الشرط *ngIf و ng-template',
    concept: 'إضافة أو إزالة عناصر الـ DOM بالشرط الكلاسيكي *ngIf مع قالب البديل else.',
    flow: 'فحص توفر العرض ⟶ تصيير البادج ⟶ أو الانتقال لقالب النفاد',
    task: 'استخدم التوجيه *ngIf="isAvailable; else soldOutTpl" لعرض حالة الفيلم.',
    file: 'src/app/app.html',
    code: '<div *ngIf="isAvailable; else soldOutTpl" class="badge normal">العرض متاح</div>',
    expected: '*ngIf="isAvailable; else soldOutTpl"',
    reference: 'https://angular.dev/guide/directives',
    quiz: {
      question: 'ماذا يحدث للعنصر عندما يصبح شرط *ngIf مساوياً لـ false؟',
      options: ['يُحذف العنصر بالكامل من شجرة الـ DOM في الصفحة', 'يُخفى العنصر عبر CSS فقط', 'يتحول لونه إلى رمادي'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-06',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'التوجيه الهيكلي الكلاسيكي: التكرار *ngFor وتتبع الفهارس',
    concept: 'تكرار العناصر بالقائمة الكلاسيكية *ngFor واستخراج الفهرس let i = index.',
    flow: 'قائمة الأفلام ⟶ التكرار بـ *ngFor ⟶ توليد بطاقات مرقمة',
    task: 'كرر عناصر classicMovies مع رقم الفهرس باستخدام *ngFor.',
    file: 'src/app/app.html',
    code: '<div *ngFor="let movie of classicMovies; let i = index" class="movie-pill"><b>{{ i + 1 }}. {{ movie }}</b></div>',
    expected: '*ngFor="let movie of classicMovies; let i = index"',
    reference: 'https://angular.dev/guide/directives',
    quiz: {
      question: 'كيف نقرأ رقم فهرس العنصر الحالي داخل جملة *ngFor الكلاسيكية؟',
      options: ['بكتابة ; let i = index داخل التوجيه', 'باستدعاء الدالة indexOf()', 'لا يمكن معرفة الفهرس'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-07',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'التوجيهات السمية الكلاسيكية: [ngClass] و [ngStyle]',
    concept: 'تطبيق فئات CSS وأنماط ديناميكياً عبر [ngClass] بناءً على كائن شروط.',
    flow: 'حالة المقعد والخصم ⟶ تقييم كائن ngClass ⟶ تلوين بطاقة العرض',
    task: 'طبّق [ngClass] مع شروط hasDiscount لتمييز تذكرة العرض المخفضة.',
    file: 'src/app/app.html',
    code: '<span [ngClass]="{ \'badge discount\': hasDiscount, \'badge normal\': !hasDiscount }">تذكرة العرض</span>',
    expected: "[ngClass]=\"{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }\"",
    reference: 'https://angular.dev/guide/directives',
    quiz: {
      question: 'ما هي الطريقة الكلاسيكية لإسناد فئات CSS ديناميكياً بناءً على شروط برمجية؟',
      options: ["استخدام التوجيه [ngClass]=\"{ 'active': isActive }\"", 'كتابة كود CSS داخل ملف TS', 'إعادة تشغيل الصفحة'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-08',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'التواصل الكلاسيكي: التمرير للابن بـ @Input()',
    concept: 'استقبال البيانات من المكون الأب إلى الابن بالزخرف @Input().',
    flow: 'بيانات الفيلم لدى الأب ⟶ تمرير عبر [title] ⟶ استقبال بالابن بـ @Input()',
    task: 'عرّف خاصية مدخل كلاسيكية @Input() title: string في المكون الابن.',
    file: 'src/app/classic/movie-detail-classic.component.ts',
    code: "import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-detail-classic',\n  template: '<h3>{{ title }}</h3>'\n})\nexport class MovieDetailClassicComponent {\n  @Input() title: string = '';\n}",
    expected: "@Input() title: string = '';",
    reference: 'https://angular.dev/guide/components/inputs',
    quiz: {
      question: 'ما هي وظيفة الزخرف @Input() في المكونات الكلاسيكية؟',
      options: ['استقبال بيانات يمررها المكون الأب إلى المكون الابن', 'إرسال طلب HTTP إلى الخادم', 'إنشاء حقل إدخال في النموذج'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-09',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'التواصل الكلاسيكي: إرسال الأحداث بـ @Output() و EventEmitter',
    concept: 'إشعار المكون الأب بالأحداث عبر @Output() و كائن EventEmitter.',
    flow: 'نقر اختيار المقعد ⟶ إطلاق seatSelected.emit(\'A1\') ⟶ معالجة الحدث في الأب',
    task: 'عرّف مخرج حدث كلاسيكي @Output() seatSelected = new EventEmitter<string>().',
    file: 'src/app/classic/seat-item-classic.component.ts',
    code: "import { Component, Output, EventEmitter } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-item-classic',\n  template: '<button (click)=\"selectSeat()\">اختيار المقعد</button>'\n})\nexport class SeatItemClassicComponent {\n  @Output() seatSelected = new EventEmitter<string>();\n  selectSeat() { this.seatSelected.emit('A1'); }\n}",
    expected: '@Output() seatSelected = new EventEmitter<string>();',
    reference: 'https://angular.dev/guide/components/outputs',
    quiz: {
      question: 'أي كائن يُستخدم بالاشتراك مع @Output() لإطلاق الأحداث في Angular الكلاسيكية؟',
      options: ['كائن EventEmitter واستدعاء الدالة .emit()', 'كائن Promise', 'مصفوفة بيانات عادية'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-10',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'منقيات البيانات الكلاسيكية (Built-in Pipes)',
    concept: 'تنسيق وعرض البيانات الخام في القالب عبر الـ Pipes مثل currency و date و uppercase.',
    flow: 'السعر الرقمي 85 ⟶ أنبوب العملة ⟶ ظهوره كـ $85.00 للزائر',
    task: 'طبّق أنبوب العملة currency لتنسيق سعر التذكرة 85.',
    file: 'src/app/app.html',
    code: "<span class=\"ticket-price\">{{ 85 | currency:'USD':'symbol':'1.2-2' }}</span>",
    expected: "{{ 85 | currency:'USD':'symbol':'1.2-2' }}",
    reference: 'https://angular.dev/guide/pipes',
    quiz: {
      question: 'ما هو الرمز المستخدم لتطبيق منقي البيانات (Pipe) في قالب Angular؟',
      options: ['رمز الخط الرأسي |', 'رمز النسبة %', 'رمز النجمة *'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-11',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'حقن التبعيات الكلاسيكي عبر المنشئ (Constructor DI)',
    concept: 'حقن الخدمات المشتركة في معامِلات المنشئ constructor ومفهوم Singleton.',
    flow: 'كلاس الخدمة ⟶ حقنها في constructor(service) ⟶ مشاركة البيانات',
    task: 'أنشئ خدمة كلاسيكية قابلة للحقن CinemaClassicService مع { providedIn: \'root\' }.',
    file: 'src/app/classic/cinema-classic.service.ts',
    code: "import { Injectable } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaClassicService {\n  getCinemaName(): string { return 'سينما الأصالة الكلاسيكية'; }\n}",
    expected: 'export class CinemaClassicService {',
    reference: 'https://angular.dev/guide/di',
    quiz: {
      question: "ماذا تعني خاصية { providedIn: 'root' } في الزخرف @Injectable()؟",
      options: ['توفير نسخة واحدة مشتركة (Singleton) من الخدمة على مستوى التطبيق', 'جعل الخدمة تعمل بدون اتصال بالإنترنت', 'إتاحة الخدمة لملفات HTML فقط'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-12',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'تدفقات RxJS الكلاسيكية: Observables وإلغاء الاشتراك',
    concept: 'إدارة تدفقات البيانات غير المتزامنة وأهمية unsubscribe() لمنع تسريب الذاكرة.',
    flow: 'تدفق تذاكر ⟶ اشتراك بـ subscribe ⟶ إلغاء الاشتراك في التدمير',
    task: 'أنشئ كلاس RxDemo يشترك في تدفق مع دالة cleanup لإلغاء الاشتراك.',
    file: 'src/app/classic/rx-demo.ts',
    code: "import { Observable, of, Subscription } from 'rxjs';\n\nexport class RxDemo {\n  private sub?: Subscription;\n  initStream(): void {\n    const stream$: Observable<string> = of('تذكرة 1', 'تذكرة 2');\n    this.sub = stream$.subscribe(ticket => console.log(ticket));\n  }\n  cleanup(): void { this.sub?.unsubscribe(); }\n}",
    expected: 'export class RxDemo {',
    reference: 'https://angular.dev/guide/observables',
    quiz: {
      question: 'لماذا يجب استدعاء unsubscribe() عند تدمير المكون الكلاسيكي؟',
      options: ['لتفادي تسريب الذاكرة (Memory Leaks) واستمرار عمل المعالجات في الخلفية', 'لحذف التطبيق من المتصفح', 'لإعادة تشغيل الجهاز'],
      correct: 0
    }
  },
  {
    id: 'ng-classic-13',
    phaseNumber: 2,
    phase: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
    title: 'الاستهلاك الآمن في القالب بأنبوب async pipe التلقائي',
    concept: 'الاشتراك التلقائي في تدفقات RxJS وإلغاء الاشتراك ذاتياً عبر أنبوب async pipe.',
    flow: 'تدفق currentMovie$ ⟶ ربطه بـ | async ⟶ عرض آمن دون تسريب',
    task: 'استهلك التدفق في القالب بأمان عبر {{ currentMovie$ | async }}.',
    file: 'src/app/app.html',
    code: '<div class="ticket-summary">العرض المباشر: {{ currentMovie$ | async }}</div>',
    expected: '{{ currentMovie$ | async }}',
    reference: 'https://angular.dev/guide/pipes/async-pipe',
    quiz: {
      question: 'ما الميزة الأساسية لأنبوب async pipe عند التعامل مع تدفقات RxJS؟',
      options: ['يشترك في التدفق تلقائياً ويلغي الاشتراك ذاتياً عند إغلاق المكون', 'يسرع سرعة اتصال الواي فاي', 'يحول النصوص إلى أرقام'],
      correct: 0
    }
  },

  // --- Phase 3: Modern Standalone & Control Flow (7 lessons) ---
  {
    id: 'ng-modern-01',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'ثورة الـ Standalone Components والاستغناء عن Modules',
    concept: 'المكونات المستقلة ذاتية التبعيات بـ standalone: true دون الحاجة لأي NgModule.',
    flow: 'إضافة standalone: true ⟶ استيراد مباشر للتبعيات ⟶ كود نقي وسريع',
    task: 'فعّل خاصية standalone: true في زخرف المكون الجذري App.',
    file: 'src/app/app.ts',
    code: "@Component({\n  selector: 'app-root',\n  standalone: true,\n  templateUrl: './app.html',\n  styleUrl: './app.css'\n})",
    expected: 'standalone: true',
    reference: 'https://angular.dev/guide/components',
    quiz: {
      question: 'ما الميزة الأساسية للـ Standalone Components في Angular الحديثة؟',
      options: ['تجعل كل مكون مستقلاً بذاته دون الحاجة لتعريفه في NgModule', 'تمنع تعديل ملفات CSS', 'تحذف ملف package.json'],
      correct: 0
    }
  },
  {
    id: 'ng-modern-02',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'نقطة البداية الحديثة: bootstrapApplication و appConfig',
    concept: 'إقلاع التطبيق الحديث مباشرة من main.ts عبر bootstrapApplication مع appConfig.',
    flow: 'استدعاء bootstrapApplication ⟶ تمرير App و appConfig ⟶ انطلاق فوري',
    task: 'أقلع تطبيق السينما الحديث باستخدام bootstrapApplication(App, appConfig).',
    file: 'src/main.ts',
    code: 'bootstrapApplication(App, appConfig).catch((err) => console.error(err));',
    expected: 'bootstrapApplication(App, appConfig)',
    reference: 'https://angular.dev/guide/bootstrap',
    quiz: {
      question: 'ما هي الدالة الحديثة المستخدمة لإقلاع تطبيق Standalone من main.ts؟',
      options: ['دالة bootstrapApplication', 'دالة platformBrowserDynamic().bootstrapModule()', 'دالة runAngular()'],
      correct: 0
    }
  },
  {
    id: 'ng-modern-03',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'نظام التحكم بالتدفق الحديث: البديل الصريح لـ *ngIf بـ @if',
    concept: 'صيغة كتل @if و @else المدمجة في المترجم بأداء فائق وبدون استيراد CommonModule.',
    flow: 'فحص السعر الصريح ⟶ إظهار شارة الخصم فوراً ⟶ أو عرض العرض القياسي',
    task: 'استخدم كتلة @if (totalPrice() >= 200) مع @else لتمييز الخصم في القالب.',
    file: 'src/app/app.html',
    code: '@if (totalPrice() >= 200) {\n  <span class="badge discount">خصم خاص مؤهل للشحن المجاني!</span>\n} @else {\n  <span class="badge normal">أضف تذاكر بقيمة {{ 200 - totalPrice() }} للحصول على ميزة VIP</span>\n}',
    expected: '@if (totalPrice() >= 200)',
    reference: 'https://angular.dev/guide/templates/control-flow#if-block',
    quiz: {
      question: 'ما الذي يميز كتل @if الحديثة عن التوجيه الكلاسيكي *ngIf؟',
      options: ['مدمجة في المترجم مباشرة، ولا تتطلب استيراد CommonModule، وأسرع في الأداء', 'لا تقبل إلا القيم الرقمية', 'لا يمكن دمجها مع @else'],
      correct: 0
    }
  },
  {
    id: 'ng-modern-04',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'التكرار الحديث فائق السرعة: كتل @for وإلزامية track',
    concept: 'التكرار بكتل @for مع فرض مفتاح التعقب track لتحديث ما تغير فقط بأعلى كفاءة.',
    flow: 'مصفوفة الأفلام ⟶ تعقب movie.id ⟶ تحديث ذري للعنصر المتغير فقط',
    task: 'كرر عناصر movies بكتلة @for (movie of movies; track movie.id).',
    file: 'src/app/app.html',
    code: '@for (movie of movies; track movie.id) {\n  <div class="movie-pill">\n    <b>{{ movie.title }}</b>\n    <small>يبدأ {{ movie.time }}</small>\n  </div>\n}',
    expected: '@for (movie of movies; track movie.id)',
    reference: 'https://angular.dev/guide/templates/control-flow#for-block',
    quiz: {
      question: 'لماذا يعتبر تعبير track إلزامياً داخل كتل @for في Angular؟',
      options: ['لتمكين المحرك من تتبع هوية كل عنصر بدقة وتحديث ما تغير فقط بأعلى كفاءة', 'لترتيب العناصر أبجدياً', 'لتحديد وقت انتهاء التكرار'],
      correct: 0
    }
  },
  {
    id: 'ng-modern-05',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'معالجة الحالات الفارغة بأناقة: كتلة @empty',
    concept: 'عرض محتوى بديل تلقائياً عند فراغ مصفوفة البيانات عبر كتلة @empty المدمجة مع @for.',
    flow: 'مصفوفة الأفلام فارغة ⟶ تنشيط كتلة @empty مباشرة ⟶ رسالة اعتذار أنيقة',
    task: 'أضف كتلة @empty داخل تكرار الأفلام لعرض إشعار بعدم توفر عروض.',
    file: 'src/app/app.html',
    code: '@for (movie of movies; track movie.id) {\n  <div class="movie-pill"><b>{{ movie.title }}</b></div>\n} @empty {\n  <p class="empty-notice">لا توجد عروض أفلام متاحة في هذا التوقيت.</p>\n}',
    expected: '@empty {',
    reference: 'https://angular.dev/guide/templates/control-flow#empty-block',
    quiz: {
      question: 'متى يتم إظهار محتوى كتلة @empty التابعة لـ @for؟',
      options: ['عندما تكون المصفوفة المعروضة فارغة لا تحتوي على أي عناصر', 'عند انقطاع الإنترنت فقط', 'عندما يضغط المستخدم زر الحذف'],
      correct: 0
    }
  },
  {
    id: 'ng-modern-06',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'التبديل متعدد الخيارات الحديث: @switch و @case و @default',
    concept: 'التبديل متعدد الفروع بـ @switch و @case مع كتلة @default البديلة.',
    flow: 'قراءة bookingStatus ⟶ توجيه للـ @case المناسبة ⟶ عرض بطاقة الحالة',
    task: 'استخدم كتلة @switch (bookingStatus) لعرض شارة الحالة المناسبة.',
    file: 'src/app/app.html',
    code: "@switch (bookingStatus) {\n  @case ('CONFIRMED') { <span class=\"badge normal\">الحجز مؤكد وجاهز</span> }\n  @case ('PENDING') { <span class=\"badge discount\">في انتظار الدفع</span> }\n  @default { <span class=\"badge\">حالة الحجز غير محددة</span> }\n}",
    expected: '@switch (bookingStatus)',
    reference: 'https://angular.dev/guide/templates/control-flow#switch-block',
    quiz: {
      question: 'أي كتلة يتم تنفيذها داخل @switch إذا لم تتطابق القيمة مع أي @case؟',
      options: ['كتلة @default', 'كتلة @empty', 'كتلة @else'],
      correct: 0
    }
  },
  {
    id: 'ng-modern-07',
    phaseNumber: 3,
    phase: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
    title: 'ثورة التحميل المؤجل الذكي: @defer و @placeholder',
    concept: 'تأجيل تنزيل وتصيير الأجزاء الثقيلة بـ @defer (on viewport) مع قالب @placeholder.',
    flow: 'تحميل الصفحة الرئيسية خفيفة ⟶ تمرير المستخدم ⟶ جلب كود المقاعد وتشغيله',
    task: 'غلّف قسم المقاعد بكتلة @defer (on viewport) مع @placeholder.',
    file: 'src/app/app.html',
    code: '@defer (on viewport) {\n  <div class="seat-picker-section"><b>اختيار المقاعد التفاعلية</b></div>\n} @placeholder {\n  <p>مرر للأسفل لاختيار مقاعد العرض...</p>\n}',
    expected: '@defer (on viewport)',
    reference: 'https://angular.dev/guide/templates/defer',
    quiz: {
      question: 'ما الفائدة المعمارية لاستخدام كتلة @defer (on viewport)؟',
      options: ['تأجيل تحميل حزمة المكون الثقيل حتى يظهر في شاشة المستخدم لتسريع فتح الموقع', 'تشفير محتويات المكون', 'منع المستخدم من رؤية المكون نهائياً'],
      correct: 0
    }
  },

  // --- Phase 4: Signals Reactive Engine (8 lessons) ---
  {
    id: 'ng-signal-01',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'ما هي الـ Signals؟ ولماذا هي مستقبل Angular؟',
    concept: 'التفاعلية الذرية الدقيقة (Fine-grained reactivity) والاستغناء عن عبء فحص شجرة Zone.js كاملة.',
    flow: 'تغير قيمة الإشارة ⟶ إخطار المعتمدين فقط ⟶ تحديث الشاشة بدون مسح كامل',
    task: 'عرّف أول إشارة للقراءة فقط signalVersion في المكون الجذري.',
    file: 'src/app/app.ts',
    code: "readonly signalVersion = signal<string>('Angular 22 Signals Engine');",
    expected: "signalVersion = signal<string>('Angular 22 Signals Engine');",
    reference: 'https://angular.dev/guide/signals',
    quiz: {
      question: 'كيف تتفوق Signals على نظام فحص التغيير الكلاسيكي المبني على Zone.js؟',
      options: ['تُحدّث الأجزاء المتأثرة بالقيمة مباشرة دون فحص شجرة التطبيق كاملة', 'تعمل بدون استخدام جافاسكريبت', 'تلغي الحاجة لملفات HTML'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-02',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'إنشاء وقراءة الإشارات: signal() والقراءة بالأقواس ()',
    concept: 'إنشاء إشارة بقيمة ابتدائية signal(1) وقراءتها بالاستدعاء الوظيفي ticketCount().',
    flow: 'إنشاء signal(1) ⟶ قراءة بالقوسين ⟶ تسجيل ارتباط تلقائي في القالب',
    task: 'أنشئ إشارة ticketCount بقيمة ابتدائية 1.',
    file: 'src/app/app.ts',
    code: 'ticketCount = signal<number>(1);',
    expected: 'ticketCount = signal<number>(1);',
    reference: 'https://angular.dev/guide/signals#writable-signals',
    quiz: {
      question: 'ما هي الطريقة الصحيحة لقراءة القيمة الحالية المخزنة في إشارة ticketCount؟',
      options: ['استدعاؤها مع القوسين كدالة: ticketCount()', 'كتابة ticketCount.value', 'كتابة ticketCount$'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-03',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'تحديث الإشارات: متى نستخدم .set() ومتى نستخدم .update()؟',
    concept: 'التعيين المباشر بـ .set() مقابل التحديث المعتمد على القيمة السابقة بدالة نقية عبر .update().',
    flow: 'نقر زر الزيادة ⟶ استدعاء .update(c => c + 1) ⟶ أمان كامل من التداخل',
    task: 'اكتب دالة incrementTickets لتحديث إشارة ticketCount بـ .update().',
    file: 'src/app/app.ts',
    code: 'incrementTickets(): void {\n  this.ticketCount.update(count => count + 1);\n}',
    expected: 'this.ticketCount.update(count => count + 1);',
    reference: 'https://angular.dev/guide/signals#writable-signals',
    quiz: {
      question: 'متى يكون استخدام .update() هو الخيار الأمثل بدلاً من .set()؟',
      options: ['عندما نحدد القيمة الجديدة بناءً على حساب معتمد على القيمة السابقة', 'عندما نريد مسح القيمة نهائياً', 'عند تحميل الصفحة لأول مرة'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-04',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'الحسابات التلقائية الذكية: computed() والتخزين المؤقت',
    concept: 'إنشاء إشارة مشتقة للقراءة فقط computed() مع التخزين المؤقت (Memoization).',
    flow: 'تغير عدد التذاكر ⟶ استيقاظ totalPrice ⟶ ضرب في 85 وحفظ النتيجة بالذاكرة',
    task: 'أنشئ إشارة محسوبة totalPrice تعتمد على ticketCount مضروباً في 85.',
    file: 'src/app/app.ts',
    code: 'totalPrice = computed(() => this.ticketCount() * 85);',
    expected: 'totalPrice = computed(() => this.ticketCount() * 85);',
    reference: 'https://angular.dev/guide/signals#computed-signals',
    quiz: {
      question: 'ما هي الميزة الحصرية لإشارة computed() مقارنة بالدوال العادية في القالب؟',
      options: ['تخزين النتيجة مؤقتاً وعدم تكرار الحساب إلا إذا تغيرت الإشارات التابعة لها', 'إمكانية تعديل قيمتها مباشرة بـ .set()', 'تعمل في الخادم فقط'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-05',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'إدارة الآثار الجانبية: effect() والتخزين المحلي',
    concept: 'تشغيل الآثار الجانبية التلقائية عند تغير الإشارات المراقبة باستخدام دالة effect().',
    flow: 'تعديل عدد التذاكر ⟶ تشغيل effect تلقائياً ⟶ حفظ القيمة في localStorage',
    task: 'سجّل effect في المنشئ لمزامنة ticketCount مع localStorage.',
    file: 'src/app/app.ts',
    code: "constructor() {\n  effect(() => {\n    localStorage.setItem('cinema_tickets', String(this.ticketCount()));\n  });\n}",
    expected: "localStorage.setItem('cinema_tickets', String(this.ticketCount()));",
    reference: 'https://angular.dev/guide/signals#effects',
    quiz: {
      question: 'ما هو الاستخدام الأساسي لدالة effect() في Angular؟',
      options: ['تشغيل الآثار الجانبية التلقائية مثل المزامنة مع التخزين المحلي أو أدوات التحليل', 'حساب أسعار التذاكر وعرضها في القالب', 'كتابة كود CSS للمكون'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-06',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'الجيل الجديد من المدخلات: input() و input.required()',
    concept: 'استبدال @Input() الكلاسيكي بمدخلات الإشارات الآمنة وقت التصريف input.required<T>().',
    flow: 'تعريف مدخل إشارة إلزامي ⟶ منع بناء التطبيق إذا نسي المطور تمريره',
    task: 'عرّف مدخل إشارة إلزامي title = input.required<string>() في بطاقة الفيلم.',
    file: 'src/app/components/movie-card.component.ts',
    code: "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card',\n  standalone: true,\n  template: '<div class=\"movie-pill\"><b>{{ title() }}</b></div>'\n})\nexport class MovieCardComponent {\n  title = input.required<string>();\n}",
    expected: 'title = input.required<string>();',
    reference: 'https://angular.dev/guide/signals/inputs',
    quiz: {
      question: 'ما الذي يقدمه input.required() مقارنة بالمدخل الكلاسيكي القديم؟',
      options: ['أمان وقت التصريف يمنع نسيان تمرير الخاصية، مع إرجاع إشارة Signal للقراءة فقط', 'تحويل القيمة إلى نص دائماً', 'السماح للمستخدم بتغيير القيمة'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-07',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'الجيل الجديد من المخرجات: دالة output() الحديثة',
    concept: 'إطلاق الأحداث إلى المكون الأب بأبسط صياغة عبر output<T>() بدون EventEmitter.',
    flow: 'نقر زر المقعد ⟶ استدعاء seatSelected.emit(\'B4\') ⟶ استقبال بالأب',
    task: 'عرّف مخرج حدث حديث seatSelected = output<string>() في منتقي المقاعد.',
    file: 'src/app/components/seat-picker.component.ts',
    code: "import { Component, output } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-picker',\n  standalone: true,\n  template: '<button (click)=\"chooseSeat()\">تأكيد المقعد</button>'\n})\nexport class SeatPickerComponent {\n  seatSelected = output<string>();\n  chooseSeat() { this.seatSelected.emit('B4'); }\n}",
    expected: 'seatSelected = output<string>();',
    reference: 'https://angular.dev/guide/signals/inputs',
    quiz: {
      question: 'ما هي الدالة الحديثة في Angular المستخدمة لتعريف مخرجات المكون؟',
      options: ['دالة output<T>()', 'دالة emitEvent()', 'دالة sendSignal()'],
      correct: 0
    }
  },
  {
    id: 'ng-signal-08',
    phaseNumber: 4,
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    title: 'الربط ثنائي الاتجاه بالـ Signals: دالة model()',
    concept: 'دمج المدخل والمخرج في إشارة ثنائية الاتجاه model<T>() لدعم صيغة [(value)].',
    flow: 'تعريف مربع البحث بـ model ⟶ تحديث متبادل وفوري بين الأب والابن دون تكرار',
    task: 'عرّف إشارة ثنائية الاتجاه query = model<string>(\'\') في مكون البحث.',
    file: 'src/app/components/search-box.component.ts',
    code: "import { Component, model } from '@angular/core';\n\n@Component({\n  selector: 'app-search-box',\n  standalone: true,\n  template: '<input [value]=\"query()\" (input)=\"query.set($any($event.target).value)\" />'\n})\nexport class SearchBoxComponent {\n  query = model<string>('');\n}",
    expected: "query = model<string>('');",
    reference: 'https://angular.dev/guide/signals/model',
    quiz: {
      question: 'ماذا تحقق دالة model() في ميزات Angular الحديثة؟',
      options: ['ربط ثنائي الاتجاه (Two-way Binding) يعمل كـ Input و Output في إشارة واحدة', 'إنشاء جدول جديد في قاعدة البيانات', 'إرسال بريد إلكتروني للعميل'],
      correct: 0
    }
  },

  // --- Phase 5: Modern DI, HttpClient & Interop (7 lessons) ---
  {
    id: 'ng-di-01',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'حقن التبعيات الوظيفي الحديث عبر دالة inject()',
    concept: 'حقن الخدمات بالحقول مباشرة عبر inject() وتفادي تعقيدات وراثة المنشئ.',
    flow: 'استدعاء inject(CinemaService) ⟶ توفير نسخة الخدمة فوراً دون constructor',
    task: 'احقن خدمة CinemaService في المكون الجذري باستخدام دالة inject().',
    file: 'src/app/app.ts',
    code: 'private cinemaService = inject(CinemaService);',
    expected: 'private cinemaService = inject(CinemaService);',
    reference: 'https://angular.dev/guide/di',
    quiz: {
      question: 'ما الميزة الهندسية لاستخدام دالة inject() بدلاً من حقن المنشئ التقليدي؟',
      options: ['كود أكثر إيجازاً ونظافة وسهولة حقن التبعيات داخل الدوال والحراس الوظيفيين', 'تشغيل التطبيق دون اتصال بالإنترنت', 'زيادة سرعة شاشة المتصفح'],
      correct: 0
    }
  },
  {
    id: 'ng-service-01',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'إدارة الحالة المشتركة (Signals State Management) بالخدمات',
    concept: 'حماية الحالة المشتركة بإشارة خاصة وإتاحتها للقراءة فقط عبر .asReadonly().',
    flow: 'إشارة داخلية _selectedMovie ⟶ كشفها بـ asReadonly ⟶ تعديل بدوال نقية',
    task: 'أنشئ خدمة CinemaService مع إشارة محمية مكشوفة كـ asReadonly().',
    file: 'src/app/services/cinema.service.ts',
    code: "import { Injectable, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaService {\n  private _selectedMovie = signal<string>('رحلة النجوم');\n  readonly selectedMovie = this._selectedMovie.asReadonly();\n  selectMovie(title: string) { this._selectedMovie.set(title); }\n}",
    expected: 'readonly selectedMovie = this._selectedMovie.asReadonly();',
    reference: 'https://angular.dev/guide/signals',
    quiz: {
      question: 'لماذا نستخدم .asReadonly() عند تصدير الإشارات من الخدمات المشتركة؟',
      options: ['لحماية بيانات الحالة من التعديل العشوائي من المكونات وإلزام التعديل عبر دوال الخدمة', 'لتشفير البيانات المخزنة', 'لتقليل استهلاك بطارية الجهاز'],
      correct: 0
    }
  },
  {
    id: 'ng-http-01',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'تفعيل عميل الويب الحديث: provideHttpClient(withFetch())',
    concept: 'ضبط إعدادات عميل HTTP المعتمد على Fetch API الأصلية للمتصفح عبر withFetch().',
    flow: 'فتح appConfig ⟶ إضافة provideHttpClient(withFetch()) ⟶ جهوزية الشبكة فائقة الأداء',
    task: 'وفّر provideHttpClient(withFetch()) في مصفوفة مزودات appConfig.',
    file: 'src/app/app.config.ts',
    code: "import { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient, withFetch } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(withFetch())\n  ]\n};",
    expected: 'provideHttpClient(withFetch())',
    reference: 'https://angular.dev/guide/http',
    quiz: {
      question: 'ما هي الفائدة من تفعيل ميزة withFetch() عند توفير عميل الويب؟',
      options: ['استخدام Fetch API الأصلية للمتصفح مما يحسن الأداء والتوافق مع الـ SSR', 'حظر جميع الإعلانات في الصفحة', 'منع إرسال طلبات POST'],
      correct: 0
    }
  },
  {
    id: 'ng-http-02',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'طلب البيانات بنوع صارم: http.get<Movie[]>()',
    concept: 'جلب بيانات الأفلام من الـ API بنوع TypeScript محكم عبر http.get<T>().',
    flow: 'طلب GET عبر HTTP ⟶ استلام رد JSON ⟶ تحويله لكائنات Movie[] مضمونة الخصائص',
    task: 'اكتب دالة fetchMovies لجلب مصفوفة الأفلام بنوع صارم http.get<Movie[]>.',
    file: 'src/app/services/cinema.service.ts',
    code: "fetchMovies(): Observable<Movie[]> {\n  return this.http.get<Movie[]>('/api/movies');\n}",
    expected: "return this.http.get<Movie[]>('/api/movies');",
    reference: 'https://angular.dev/guide/http/making-requests',
    quiz: {
      question: 'ماذا نستفيد من تمرير النوع العام <Movie[]> لدالة http.get؟',
      options: ['تمكين المترجم والمحرر من معرفة خصائص الأفلام ومنع الأخطاء البرمجية', 'إجبار الخادم على إرسال الأفلام بسرعة مضاعفة', 'تشغيل الفيديو مباشرة'],
      correct: 0
    }
  },
  {
    id: 'ng-http-03',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'إرسال وتعديل البيانات: http.post<BookingResponse>()',
    concept: 'إرسال بيانات حجز المقاعد للخادم وتلقي معرف الحجز النهائي عبر http.post.',
    flow: 'تجهيز حمولة الحجز ⟶ إرسال POST ⟶ استلام معرف التذكرة وتحديث الواجهة',
    task: 'اكتب دالة confirmBooking لإرسال حمولة الحجز عبر http.post.',
    file: 'src/app/services/cinema.service.ts',
    code: "confirmBooking(payload: { movieId: number; seats: string[] }): Observable<{ bookingId: string }> {\n  return this.http.post<{ bookingId: string }>('/api/bookings', payload);\n}",
    expected: "return this.http.post<{ bookingId: string }>('/api/bookings', payload);",
    reference: 'https://angular.dev/guide/http/making-requests',
    quiz: {
      question: 'ما هو المعامل الثاني الذي نمرره عادة لدالة http.post؟',
      options: ['جسم الطلب (Body Payload) المحتوي على البيانات المراد حفظها في الخادم', 'اسم ملف CSS', 'رقم الهاتف الشخصي'],
      correct: 0
    }
  },
  {
    id: 'ng-http-04',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'المعترضات الوظيفية الحديثة (Functional Interceptors)',
    concept: 'اعتراض وتعديل طلبات الشبكة لإضافة رمز التفويض عبر دالة HttpInterceptorFn واستنساخ req.clone().',
    flow: 'خروج الطلب ⟶ اعتراضه في authInterceptor ⟶ استنساخه مع Token ⟶ تمريره للخادم',
    task: 'اكتب المعترض الوظيفي authInterceptor لإضافة ترويسة Authorization لطلبات الشبكة.',
    file: 'src/app/interceptors/auth.interceptor.ts',
    code: "import { HttpInterceptorFn } from '@angular/common/http';\n\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const authReq = req.clone({ setHeaders: { Authorization: 'Bearer KHOTWA_CINEMA_2026' } });\n  return next(authReq);\n};",
    expected: 'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
    reference: 'https://angular.dev/guide/http/interceptors',
    quiz: {
      question: 'كيف نعدل طلب HTTP داخل الـ Interceptor نظراً لكونه غير قابل للتعديل المباشر (Immutable)؟',
      options: ['باستنساخه عبر الدالة req.clone({ ... }) مع الخصائص المراد تحديثها', "بتعديل الرابط مباشرة مثل req.url = '...'", 'بإنشاء طلب جافاسكريبت جديد'],
      correct: 0
    }
  },
  {
    id: 'ng-interop-01',
    phaseNumber: 5,
    phase: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
    title: 'الجسر الاحترافي بين RxJS و Signals عبر toSignal()',
    concept: 'تحويل تدفقات RxJS إلى إشارات Signals بسطر واحد عبر toSignal() مع إدارة الاشتراك ذاتياً.',
    flow: 'تدفق fetchMovies$ ⟶ تحويل بـ toSignal() ⟶ قراءته كإشارة movies() في القالب',
    task: 'حوّل تدفق الأفلام إلى إشارة moviesList باستخدام toSignal().',
    file: 'src/app/app.ts',
    code: "import { toSignal } from '@angular/core/rxjs-interop';\n\nexport class App {\n  moviesList = toSignal(this.cinemaService.fetchMovies(), { initialValue: [] });\n}",
    expected: 'moviesList = toSignal(',
    reference: 'https://angular.dev/guide/signals/rxjs-interop',
    quiz: {
      question: 'ما هي الوظيفة الأساسية لدالة toSignal() في Angular الحديثة؟',
      options: ['تحويل الـ Observable إلى Signal تلقائياً مع إدارة الاشتراك وإلغائه بأمان', 'إيقاف تشغيل RxJS في التطبيق', 'إرسال تنبيه للمستخدم عبر الرسائل القصيرة'],
      correct: 0
    }
  },

  // --- Phase 6: Routing & Typed Reactive Forms (6 lessons) ---
  {
    id: 'ng-route-01',
    phaseNumber: 6,
    phase: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
    title: 'إعداد المسارات الحديثة ومصفوفة Routes المستقلة',
    concept: 'ربط روابط التطبيق بالمكونات المستقلة وتفعيلها عبر <router-outlet /> ومصفوفة Routes.',
    flow: 'تغيير الرابط بالمتصفح ⟶ مطابقة مسار Routes ⟶ عرض المكون في <router-outlet />',
    task: 'أنشئ جدول المسارات routes مع مسار التحويل التلقائي للأفلام.',
    file: 'src/app/app.routes.ts',
    code: "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'movies', pathMatch: 'full' }\n];",
    expected: 'export const routes: Routes = [',
    reference: 'https://angular.dev/guide/routing',
    quiz: {
      question: 'أين يتم عرض واجهة المكون المطابق للمسار الحالي في الصفحة الرئيسية؟',
      options: ['داخل وسم مخرج التوجيه <router-outlet />', 'داخل وسم التذييل footer', 'في نافذة منبثقة'],
      correct: 0
    }
  },
  {
    id: 'ng-route-02',
    phaseNumber: 6,
    phase: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
    title: 'التحميل الكسول للمكونات عبر loadComponent',
    concept: 'تقسيم الحزم وتنزيل شاشات الحجز والتذاكر عند زيارتها فقط عبر loadComponent.',
    flow: 'فتح الرئيسية ⟶ عدم تنزيل حزمة الحجز ⟶ تنزيلها عند نقر رابط الفيلم فقط',
    task: 'أضف مسار الحجز بالتحميل الكسول loadComponent: () => import(...).',
    file: 'src/app/app.routes.ts',
    code: "{\n  path: 'booking/:id',\n  loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent)\n}",
    expected: "loadComponent: () => import('./features/booking/booking.component')",
    reference: 'https://angular.dev/guide/routing/common-router-tasks#lazy-loading',
    quiz: {
      question: 'ما هو الهدف الرئيسي من استخدام التحميل الكسول (Lazy Loading) للمسارات؟',
      options: ['تقليل حجم الحزمة الابتدائية وتسريع زمن فتح التطبيق للزائر', 'تقليل استهلاك ذاكرة الخادم', 'منع المستخدم من مشاركة الرابط'],
      correct: 0
    }
  },
  {
    id: 'ng-route-03',
    phaseNumber: 6,
    phase: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
    title: 'قراءة معاملات الرابط الذكية كـ Signal Inputs',
    concept: 'ربط معاملات الرابط مثل :id كمدخلات إشارات بالمكون مباشرة عبر withComponentInputBinding().',
    flow: 'زيارة /booking/5 ⟶ تمرير المعامل 5 كإشارة id = input<string>() ⟶ سهولة فائقة',
    task: 'استقبل معرف الفيلم من الرابط كمدخل إشارة إلزامي id = input.required<string>().',
    file: 'src/app/features/booking/booking.component.ts',
    code: "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-booking',\n  standalone: true,\n  template: '<h2>حجز الفيلم رقم: {{ id() }}</h2>'\n})\nexport class BookingComponent {\n  id = input.required<string>();\n}",
    expected: 'id = input.required<string>();',
    reference: 'https://angular.dev/guide/routing/common-router-tasks',
    quiz: {
      question: 'ما الميزة التي يقدمها تفعيل withComponentInputBinding() في التوجيه؟',
      options: ['قراءة معاملات الرابط مباشرة كـ Signal Inputs داخل المكون دون الحاجة لـ ActivatedRoute', 'إعادة توجيه المستخدم لصفحة تسجيل الدخول', 'إخفاء شريط العنوان'],
      correct: 0
    }
  },
  {
    id: 'ng-route-04',
    phaseNumber: 6,
    phase: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
    title: 'حماية المسارات بالحراس الوظيفيين (Functional Guards)',
    concept: 'حماية الشاشات بالتحقق من الصلاحيات عبر دالة CanActivateFn وتحويل الزائر بـ createUrlTree.',
    flow: 'محاولة دخول صفحة التذكرة ⟶ فحص سلة الحجز في bookingGuard ⟶ السماح أو التحويل',
    task: 'اكتب الحارس الوظيفي bookingGuard للتحقق من اختيار المقعد قبل السماح بالحجز.',
    file: 'src/app/guards/booking.guard.ts',
    code: "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\n\nexport const bookingGuard: CanActivateFn = (route, state) => {\n  const router = inject(Router);\n  const hasSeat = true;\n  return hasSeat ? true : router.createUrlTree(['/movies']);\n};",
    expected: 'export const bookingGuard: CanActivateFn = (route, state) => {',
    reference: 'https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access',
    quiz: {
      question: 'ماذا تعيد دالة الحارس الوظيفي CanActivateFn إذا أردنا تحويل الزائر لصفحة الأفلام؟',
      options: ["تعيد شجرة عنوان جديدة عبر router.createUrlTree(['/movies']) أو false", 'تعيد نص رسالة تحذيرية', 'تعيد قيمة صفر'],
      correct: 0
    }
  },
  {
    id: 'ng-forms-01',
    phaseNumber: 6,
    phase: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
    title: 'النماذج الارتكاسية الصارمة: FormGroup و FormControl',
    concept: 'بناء النماذج الارتكاسية الصارمة عبر FormGroup و FormControl مع خيار nonNullable: true.',
    flow: 'كائن FormGroup بنوع العميل ⟶ ربطه بـ [formGroup] ⟶ تحكم كامل بالصلاحية',
    task: 'أنشئ نموذج حجز العميل bookingForm مع حقل customerName غير قابل للإلغاء nonNullable.',
    file: 'src/app/features/booking/booking-form.component.ts',
    code: "import { Component } from '@angular/core';\nimport { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-booking-form',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: '<form [formGroup]=\"bookingForm\"><input formControlName=\"customerName\" /></form>'\n})\nexport class BookingFormComponent {\n  bookingForm = new FormGroup({\n    customerName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })\n  });\n}",
    expected: 'bookingForm = new FormGroup({',
    reference: 'https://angular.dev/guide/forms/reactive-forms',
    quiz: {
      question: 'ما هي فائدة الخيار { nonNullable: true } عند إنشاء FormControl؟',
      options: ['يضمن أن الحقل لا يتحول إلى قيمة null عند عمل reset للنموذج', 'يمنع المستخدم من الكتابة في الحقل', 'يحذف الحقل من الواجهة'],
      correct: 0
    }
  },
  {
    id: 'ng-forms-02',
    phaseNumber: 6,
    phase: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
    title: 'التحقق المتقدم والمدققات المخصصة (Custom Validators)',
    concept: 'كتابة مدققات مخصصة مثل saudiPhoneValidator للتحقق من أرقام الهواتف السعودية وتوليد رسائل الخطأ.',
    flow: 'إدخال رقم الجوال ⟶ فحص نمط regex السعودي ⟶ إظهار تنبيه الخطأ فوراً إن لم يطابق',
    task: 'اكتب المدقق المخصص saudiPhoneValidator للتحقق من صيغة رقم الجوال السعودي 05xxxxxxxx.',
    file: 'src/app/validators/cinema.validators.ts',
    code: "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';\n\nexport function saudiPhoneValidator(): ValidatorFn {\n  return (control: AbstractControl): ValidationErrors | null => {\n    const valid = /^05\\d{8}$/.test(control.value || '');\n    return valid ? null : { invalidSaudiPhone: true };\n  };\n}",
    expected: 'export function saudiPhoneValidator(): ValidatorFn {',
    reference: 'https://angular.dev/guide/forms/reactive-forms#custom-validators',
    quiz: {
      question: 'ماذا تعيد دالة المدقق المخصص (Custom Validator) عندما تكون القيمة المدخلة صحيحة تماماً؟',
      options: ['تعيد القيمة null', 'تعيد كائن الخطأ { invalid: true }', 'تعيد القيمة false'],
      correct: 0
    }
  },

  // --- Phase 7: Capstone Khotwa Cinema Pro (9 lessons) ---
  {
    id: 'capstone-01',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'تخطيط معمارية منصة حجز السينما المؤسسية (Khotwa Cinema Pro)',
    concept: 'تنظيم التطبيق المؤسسي وفق المعمارية النظيفة (core, features, shared) وتحديد عقود الحالة.',
    flow: 'رسم هيكل المجلدات وعقود الحالة ⟶ فصل المسؤوليات ⟶ قابلية للتوسع الضخم',
    task: 'عرّف واجهة حالة السينما المركزية CinemaAppState بخصائص الفيلم والمقاعد والكوبون.',
    file: 'src/app/core/models/cinema-state.model.ts',
    code: 'export interface CinemaAppState {\n  selectedMovieId: number | null;\n  selectedSeats: string[];\n  couponCode: string | null;\n  discountRate: number;\n}',
    expected: 'export interface CinemaAppState {',
    reference: 'https://angular.dev/guide/components',
    quiz: {
      question: 'ما الهدف الأساسي من تقسيم التطبيق المؤسسي إلى مجلدات core و features و shared؟',
      options: ['فصل المسؤوليات وتنظيم الكود لسهولة الصيانة والتوسع والاختبار بين فرق العمل', 'تقليل عدد الأسطر في ملف package.json', 'زيادة سرعة المعالج المركزي'],
      correct: 0
    }
  },
  {
    id: 'capstone-02',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'بناء مستودع الحالة المركزي المتكامل (Cinema Signals Store)',
    concept: 'مستودع حالة مركزي CinemaStore يدير المقاعد المختارة وحساباتها المشتقة بـ Signals و computed().',
    flow: 'نقرات الحجز ⟶ تعديل إشارات المخزن المركزي ⟶ مزامنة كل شاشات السينما فورياً',
    task: 'أنشئ مخزن الحالة CinemaStore مع دالة toggleSeat وإشارة محسوبة seatCount.',
    file: 'src/app/core/store/cinema.store.ts',
    code: "import { Injectable, signal, computed } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaStore {\n  readonly selectedSeats = signal<string[]>([]);\n  readonly seatCount = computed(() => this.selectedSeats().length);\n  toggleSeat(seatId: string) {\n    this.selectedSeats.update(seats => seats.includes(seatId) ? seats.filter(s => s !== seatId) : [...seats, seatId]);\n  }\n}",
    expected: 'export class CinemaStore {',
    reference: 'https://angular.dev/guide/signals',
    quiz: {
      question: 'كيف نحدث مصفوفة المقاعد المختارة داخل CinemaStore عند نقر مقعد؟',
      options: ['باستدعاء .update() لإضافة المقعد إن لم يكن موجوداً أو إزالته إن كان موجوداً', 'بإعادة تحميل الصفحة', 'بمسح قاعدة البيانات'],
      correct: 0
    }
  },
  {
    id: 'capstone-03',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'بطاقة الفيلم التفاعلية وشريط البحث والفلترة الفورية',
    concept: 'فلترة الأفلام الفورية حسب الاسم والتصنيف باستخدام إشارة computed() دون وميض الشاشة.',
    flow: 'كتابة كلمة البحث ⟶ تحديث إشارة searchQuery ⟶ فرز فوري للأفلام بدون وميض',
    task: 'اكتب منطق الفلترة الفورية filteredMovies داخل MovieCatalogComponent بـ computed().',
    file: 'src/app/features/movies/movie-catalog.component.ts',
    code: "import { Component, signal, computed } from '@angular/core';\nimport { Movie } from '../../models/movie.model';\n\n@Component({\n  selector: 'app-movie-catalog',\n  standalone: true,\n  template: '<div class=\"catalog-grid\"></div>'\n})\nexport class MovieCatalogComponent {\n  searchQuery = signal<string>('');\n  movies = signal<Movie[]>([]);\n  filteredMovies = computed(() => this.movies().filter(m => m.title.includes(this.searchQuery())));\n}",
    expected: 'filteredMovies = computed(() => this.movies().filter(',
    reference: 'https://angular.dev/guide/signals#computed-signals',
    quiz: {
      question: 'ما الميزة التي توفرها computed() في شاشات البحث والفلترة المباشرة؟',
      options: ['تصفية القائمة فوراً عند كل ضغطة مفتاح مع تخزين النتيجة مؤقتاً لأداء فائق', 'إرسال طلبات بحث إلى محركات خارجية', 'حفظ النتائج في ملف وورد'],
      correct: 0
    }
  },
  {
    id: 'capstone-04',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'مصفوفة قاعة العرض التفاعلية الذكية (Interactive Seat Matrix)',
    concept: 'مصفوفة مقاعد بصرية من 60 مقعداً تميز المتاح والمحجوز والـ VIP وتتصل بـ CinemaStore.',
    flow: 'مصفوفة مقاعد بصرية ⟶ نقر المقعد المتاح ⟶ تحديث السلة والمجموع فورياً',
    task: 'أنشئ المكون SeatMatrixComponent مع دالة onSeatClick لتحديث CinemaStore.',
    file: 'src/app/features/booking/seat-matrix.component.ts',
    code: "import { Component, inject } from '@angular/core';\nimport { CinemaStore } from '../../core/store/cinema.store';\n\n@Component({\n  selector: 'app-seat-matrix',\n  standalone: true,\n  template: '<div class=\"seat-picker-grid\"></div>'\n})\nexport class SeatMatrixComponent {\n  store = inject(CinemaStore);\n  onSeatClick(id: string) { this.store.toggleSeat(id); }\n}",
    expected: 'export class SeatMatrixComponent {',
    reference: 'https://angular.dev/guide/components',
    quiz: {
      question: 'كيف ترتبط شاشة المقاعد التفاعلية بمخزن الحالة المركزي (CinemaStore)؟',
      options: ['عبر حقن CinemaStore بدالة inject() واستدعاء toggleSeat(id) عند نقر أي مقعد', 'بنسخ كود الكلاس في كل ملف', 'بفتح نافذة متصفح جديدة'],
      correct: 0
    }
  },
  {
    id: 'capstone-05',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'استمارة تأكيد الحجز وحساب التكلفة مع كود الخصم وطرق الدفع',
    concept: 'حساب التكلفة النهائية بدقة مع تطبيق كود الخصم وضريبة القيمة المضافة 15% VAT بـ computed().',
    flow: 'مدخلات العميل ⟶ تطبيق كود KHOTWA10 ⟶ احتساب الضريبة والخصم ⟶ تأكيد الدفع',
    task: 'اكتب حساب finalTotal داخل CheckoutComponent متضمناً الخصم و 15% ضريبة.',
    file: 'src/app/features/checkout/checkout.component.ts',
    code: "import { Component, computed, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-checkout',\n  standalone: true,\n  template: '<div class=\"checkout-summary\">المجموع النهائي: {{ finalTotal() }}</div>'\n})\nexport class CheckoutComponent {\n  subtotal = signal<number>(170);\n  discount = signal<number>(0.10);\n  finalTotal = computed(() => {\n    const discounted = this.subtotal() * (1 - this.discount());\n    return discounted * 1.15;\n  });\n}",
    expected: 'finalTotal = computed(() => {',
    reference: 'https://angular.dev/guide/signals#computed-signals',
    quiz: {
      question: 'كيف يتم حساب ضريبة القيمة المضافة 15% بعد الخصم تلقائياً؟',
      options: ['داخل دالة computed() تضرب السعر المخفض في 1.15 وتتحدث تلقائياً مع أي تغيير', 'بكتابة القيمة يدوياً في القالب', 'بسؤال الزائر عن نسبة الضريبة'],
      correct: 0
    }
  },
  {
    id: 'capstone-06',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'بطاقة التذكرة الإلكترونية الرقمية (Digital Boarding Pass Ticket)',
    concept: 'تصميم بطاقة صعود وتذكرة رقمية نهائية مع باركود ورقم الحجز وخاصية window.print().',
    flow: 'نجاح عملية الحجز ⟶ استخراج بطاقة الصعود الرقمية ⟶ استدعاء window.print()',
    task: 'أنشئ مكون التذكرة الرقمية TicketPassComponent مع زر طباعة التذكرة.',
    file: 'src/app/features/tickets/ticket-pass.component.ts',
    code: "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-ticket-pass',\n  standalone: true,\n  template: `\n    <div class=\"final-ticket-card\">\n      <h3>سينما خطوة · تذكرة دخول إلكترونية</h3>\n      <p>رقم الحجز: {{ bookingRef() }}</p>\n      <button class=\"btn-confirm\" (click)=\"printTicket()\">طباعة التذكرة</button>\n    </div>\n  `\n})\nexport class TicketPassComponent {\n  bookingRef = input.required<string>();\n  printTicket() { window.print(); }\n}",
    expected: 'export class TicketPassComponent {',
    reference: 'https://angular.dev/guide/components',
    quiz: {
      question: 'ما هي دالة المتصفح الأصلية المستخدمة لطباعة تذكرة الحجز مباشرة؟',
      options: ['استدعاء الدالة window.print()', 'استدعاء الدالة document.savePDF()', 'استدعاء الدالة console.log()'],
      correct: 0
    }
  },
  {
    id: 'capstone-07',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'كتابة اختبارات الوحدة الحقيقية للمكونات والـ Signals بـ Vitest',
    concept: 'كتابة اختبارات وحدة صارمة تفحص صحة منطق الـ Signals واختيار المقاعد عبر describe و it و expect.',
    flow: 'جناح اختبار describe ⟶ محاكاة تفاعل المستخدم ⟶ فحص النتيجة بـ expect()',
    task: 'اكتب اختبار وحدة لـ CinemaStore للتحقق من إضافة وإزالة المقاعد بـ Vitest.',
    file: 'src/app/core/store/cinema.store.spec.ts',
    code: "import { describe, it, expect } from 'vitest';\nimport { CinemaStore } from './cinema.store';\n\ndescribe('CinemaStore', () => {\n  it('toggles seat selection correctly', () => {\n    const store = new CinemaStore();\n    expect(store.selectedSeats()).toEqual([]);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual(['B4']);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual([]);\n  });\n});",
    expected: "describe('CinemaStore', () => {",
    reference: 'https://angular.dev/guide/testing',
    quiz: {
      question: 'ما هي دالة الفحص في Vitest للتحقق من أن مصفوفة الإشارة تطابق النتيجة المتوقعة؟',
      options: ['expect(actual).toEqual(expected)', 'assert(true)', 'checkResult(val)'],
      correct: 0
    }
  },
  {
    id: 'capstone-08',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'تحسين الأداء وفحص حزم بناء الإنتاج وتطبيق Tree-shaking',
    concept: 'ضبط إعدادات بناء الإنتاج ng build وتفعيل optimization وحذف الأكواد الميتة (Tree-shaking).',
    flow: 'تفعيل optimization في angular.json ⟶ تشغيل ng build ⟶ التأكد من خفة الحزمة',
    task: 'تحقق من تفعيل خاصية optimization: true في إعدادات بناء الإنتاج داخل angular.json.',
    file: 'angular.json',
    code: '"configurations": { "production": { "optimization": true, "outputHashing": "all" } }',
    expected: '"optimization": true',
    reference: 'https://angular.dev/tools/cli/deployment',
    quiz: {
      question: 'ما الفائدة الأساسية من تفعيل optimization: true في بناء الإنتاج لـ Angular؟',
      options: ['ضغط الكود واستبعاد الأجزاء غير المستخدمة (Tree-shaking) لتسريع تحميل الموقع', 'تغيير خطوط الموقع', 'منع المستخدمين من التقاط لقطة شاشة'],
      correct: 0
    }
  },
  {
    id: 'capstone-09',
    phaseNumber: 7,
    phase: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة',
    title: 'المراجعة المعمارية الشاملة وتأهيل المشروع لسوق العمل',
    concept: 'صياغة وثيقة README الاحترافية وتأهيل المشروع لمحفظة الأعمال ومقابلات وظائف Angular.',
    flow: 'كود نظيف ومختبر ⟶ توثيق README ⟶ استعراض في المقابلة الوظيفية ⟶ التوظيف',
    task: 'وثّق المعمارية المؤسسية في ملف README.md بعنوان منصة سينما خطوة الاحترافية.',
    file: 'README.md',
    code: '# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro) - مبنية بـ Angular 22 و Signals',
    expected: '# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)',
    reference: 'https://angular.dev/overview',
    quiz: {
      question: 'ما هو العنصر الأكثر أهمية لتوثيقه في GitHub عند التقدم لوظيفة مهندس Angular؟',
      options: ['توضيح المعمارية النظيفة، مبررات القرارات التقنية (مثل Signals و DI الوظيفي)، والاختبارات', 'وضع صورة شخصية في كل ملف', 'إخفاء الكود البرمجي عن الجميع'],
      correct: 0
    }
  }
];

const PHASE_NAMES = {
  1: 'المرحلة 1: تأسيس واحتراف TypeScript',
  2: 'المرحلة 2: مفاهيم Angular الكلاسيكية وسوق العمل',
  3: 'المرحلة 3: Standalone Components والتحكم بالتدفق الحديث',
  4: 'المرحلة 4: محرك التفاعلية الحديث Signals',
  5: 'المرحلة 5: الخدمات الحديثة والاتصال بالشبكة',
  6: 'المرحلة 6: التوجيه المتقدم والنماذج الارتكاسية',
  7: 'المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة'
};

const PHASE_LESSON_COUNTS = {
  1: 10,
  2: 13,
  3: 7,
  4: 8,
  5: 7,
  6: 6,
  7: 9
};

module.exports = {
  CURRICULUM_SPEC,
  PHASE_NAMES,
  PHASE_LESSON_COUNTS
};

window.ANGULAR_COURSE_DATA = {
  version: "22",
  title: "Angular للمبتدئين: من الصفر إلى تطبيق سينما حقيقي",
  subtitle: "تعلم إطار عمل Angular خطوة بخطوة بالمعاينة الحية، وابنِ تطبيق حجز سينما متكامل مع Signals.",
  modules: {
    "phase-1-typescript": {
      id: "phase-1-typescript",
      title: "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر (TypeScript Foundation)",
      description: "تأسيس برمجي شامل في لغة TypeScript من الأنواع البدائية والواجهات والأنواع المركبة إلى الدوال الصارمة والبرمجة الكائنية والقوالب العامة، مع محاكي الكونسول التفاعلي لموديلات السينما.",
      icon: "📘",
      badge: "10 دروس · الأساس الصخري لـ Angular",
      lessonCount: 10
    },
    "phase-2-classic": {
      id: "phase-2-classic",
      title: "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل (Classic Angular Core)",
      description: "المفاهيم الكلاسيكية الجوهرية التي لا غنى عنها لصيانة وتطوير أكثر من 85% من مشاريع Angular المؤسسية: NgModule، التوجيهات الهيكلية *ngIf و *ngFor، والربط الكلاسيكي وتمرير البيانات بـ @Input/@Output وحقن المنشئ وتدفقات RxJS.",
      icon: "🏛️",
      badge: "13 درساً · كفاءة سوق العمل والصيانة",
      lessonCount: 13
    },
    "phase-3-modern": {
      id: "phase-3-modern",
      title: "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
      description: "التحول الجوهري نحو معمارية Angular الحديثة بدون وحدات NgModule: المكونات المستقلة Standalone Components، والإقلاع الخفيف بـ bootstrapApplication، ونظام التحكم بالتدفق المدمج في المترجم (@if, @for مع track الإلزامي، @empty، @switch)، والتحميل المؤجل الذكي بـ @defer.",
      icon: "⚡",
      badge: "7 دروس · المعمارية الحديثة والتحكم بالتدفق",
      lessonCount: 7
    },
    "phase-4-signals": {
      id: "phase-4-signals",
      title: "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
      description: "إتقان محرك التفاعلية الثوري في Angular بدون Zone.js: الإشارات القابلة للكتابة signal()، والبيانات المشتقة computed()، والآثار الجانبية effect()، ومداخل ومخارج المكونات الحديثة input() و output() ونموذج الربط المزدوج model().",
      icon: "📡",
      badge: "8 دروس · محرك Signals والتفاعلية الدقيقة",
      lessonCount: 8
    },
    "phase-5-di-http": {
      id: "phase-5-di-http",
      title: "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
      description: "إتقان حقن التبعيات الوظيفي الحديث عبر inject()، وإدارة الحالة المشتركة بالـ Signals وحمايتها بـ asReadonly()، وإعداد عميل الويب الحديث provideHttpClient(withFetch())، وإرسال واستقبال طلبات RESTful المحكمة نوعياً، وبناء المعترضات الوظيفية Functional Interceptors، والربط بين RxJS و Signals عبر toSignal().",
      icon: "🌐",
      badge: "7 دروس · DI الوظيفي وعميل HttpClient والـ Interceptors",
      lessonCount: 7
    },
    "phase-6-routing-forms": {
      id: "phase-6-routing-forms",
      title: "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
      description: "إتقان التوجيه المستقل بمصفوفة Routes، والتحميل الكسول loadComponent، وقراءة معاملات الرابط كإشارات Signal Inputs عبر withComponentInputBinding()، وحماية الشاشات بالحراس الوظيفيين CanActivateFn، وبناء النماذج الارتكاسية الصارمة FormGroup مع nonNullable، وكتابة المدققات المخصصة saudiPhoneValidator.",
      icon: "🚦",
      badge: "6 دروس · التوجيه الحديث والنماذج المكتوبة الصارمة",
      lessonCount: 6
    },
    "phase-7-capstone": {
      id: "phase-7-capstone",
      title: "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة (Capstone)",
      description: "مشروع التخرج المؤسسي المتكامل: معمارية منصة السينما ومخزن الإشارات ومصفوفة المقاعد وحساب الضريبة واختبارات Vitest وبناء الإنتاج.",
      icon: "🎬",
      badge: "مشروع التخرج",
      lessonCount: 9
    }
  },
  starterFiles: {
    "package.json": JSON.stringify({
      name: "khotwa-cinema-booking",
      version: "1.0.0",
      private: true,
      scripts: { start: "ng serve --host 0.0.0.0 --port 4200", build: "ng build", test: "ng test --watch=false" },
      dependencies: {
        "@angular/common": "^22.0.0", "@angular/compiler": "^22.0.0", "@angular/core": "^22.0.0",
        "@angular/forms": "^22.0.0", "@angular/platform-browser": "^22.0.0", "@angular/router": "^22.0.0",
        rxjs: "^7.4.0", tslib: "^2.8.1", "zone.js": "^0.15.1"
      },
      devDependencies: {
        "@angular/build": "^22.0.0", "@angular/cli": "^22.0.0", "@angular/compiler-cli": "^22.0.0", "@types/node": "^22.0.0", jsdom: "^26.0.0", typescript: "~6.0.0", vitest: "^4.0.8"
      }
    }, null, 2),
    "angular.json": JSON.stringify({
      "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
      version: 1,
      newProjectRoot: "projects",
      projects: {
        cinema: {
          projectType: "application", root: "", sourceRoot: "src", prefix: "app",
          architect: {
            build: {
              builder: "@angular/build:application",
              options: { browser: "src/main.ts", tsConfig: "tsconfig.app.json", polyfills: ["zone.js"], assets: [], styles: ["src/styles.css"] },
              configurations: { production: { optimization: true, outputHashing: "all" }, development: { optimization: false, sourceMap: true } },
              defaultConfiguration: "development"
            },
            serve: { builder: "@angular/build:dev-server", configurations: { production: { buildTarget: "cinema:build:production" }, development: { buildTarget: "cinema:build:development" } }, defaultConfiguration: "development" },
            test: { builder: "@angular/build:unit-test", options: { tsConfig: "tsconfig.spec.json" } }
          }
        }
      },
      cli: { analytics: false }
    }, null, 2),
    "tsconfig.json": JSON.stringify({
      compileOnSave: false,
      compilerOptions: { outDir: "./dist/out-tsc", forceConsistentCasingInFileNames: true, strict: true, noImplicitOverride: true, noPropertyAccessFromIndexSignature: true, noImplicitReturns: true, noFallthroughCasesInSwitch: true, sourceMap: true, declaration: false, experimentalDecorators: true, importHelpers: true, target: "ES2022", module: "preserve", useDefineForClassFields: false, moduleResolution: "bundler", lib: ["ES2022", "dom"] },
      angularCompilerOptions: { enableI18nLegacyMessageIdFormat: false, strictInjectionParameters: true, strictInputAccessModifiers: true, strictTemplates: true }
    }, null, 2),
    "tsconfig.app.json": JSON.stringify({ extends: "./tsconfig.json", compilerOptions: { outDir: "./out-tsc/app", types: [] }, files: ["src/main.ts"], include: ["src/**/*.d.ts"] }, null, 2),
    "tsconfig.spec.json": JSON.stringify({ extends: "./tsconfig.json", compilerOptions: { outDir: "./out-tsc/spec", types: ["vitest/globals", "node"] }, include: ["src/**/*.spec.ts", "src/**/*.d.ts"] }, null, 2),
    "src/index.html": "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n<head><meta charset=\"utf-8\"><title>سينما خطوة</title><base href=\"/\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"></head>\n<body><app-root></app-root></body>\n</html>",
    "src/main.ts": "import { bootstrapApplication } from '@angular/platform-browser';\nimport { App } from './app/app';\nimport { appConfig } from './app/app.config';\n\nbootstrapApplication(App, appConfig).catch((error) => console.error(error));\n",
    "src/app/app.config.ts": "import { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient, withFetch } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(withFetch())\n  ]\n};\n",
    "src/app/app.ts": "import { Component, signal, computed, inject } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { Observable, of } from 'rxjs';\nimport { toSignal } from '@angular/core/rxjs-interop';\nimport { CinemaService } from './services/cinema.service';\nimport { Movie } from './models/movie.model';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [CommonModule],\n  templateUrl: './app.html',\n  styleUrl: './app.css'\n})\nexport class App {\n  readonly title = 'سينما خطوة';\n  movieTitle = 'رحلة النجوم';\n  isSoldOut = false;\n  isAvailable = true;\n  hasDiscount = true;\n  classicMovies: string[] = ['رحلة النجوم', 'واحة الأمل', 'حارس المجرة'];\n  bookingCount = 0;\n  bookingMessage = '';\n  readonly currentMovie$: Observable<string> = of('رحلة النجوم - صالة IMAX 1');\n\n  // Modern Control Flow Properties (Phase 3)\n  totalPrice = signal(250);\n  movies = [\n    { id: 1, title: 'رحلة النجوم', time: '18:00' },\n    { id: 2, title: 'واحة الأمل', time: '20:30' },\n    { id: 3, title: 'حارس المجرة', time: '22:15' }\n  ];\n  bookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | string = 'CONFIRMED';\n\n  // Signals Reactive Engine Properties (Phase 4)\n  totalTickets = signal(10);\n\n  // Modern DI & Services (Phase 5)\n  private cinemaService = inject(CinemaService);\n  moviesList = toSignal(this.cinemaService.fetchMovies(), { initialValue: [] });\n\n  addTicket(): void {\n    this.totalTickets.update(count => count + 1);\n  }\n\n  onBookTicket(): void {\n    this.bookingCount++;\n    this.bookingMessage = `تم حجز مقعدك بنجاح! إجمالي الحجوزات: ${this.bookingCount}`;\n  }\n\n  onSeatSelected(seat: string): void {\n    this.bookingMessage = `تم اختيار المقعد: ${seat}`;\n  }\n}\n",
    "src/app/app.html": "<main class=\"cinema-shell\">\n  <header class=\"cinema-heading\">\n    <span class=\"cinema-mark\">خ</span>\n    <div><small>تجربة Angular</small><h1>{{ title }}</h1></div>\n  </header>\n  <section class=\"welcome-card\">\n    <b>خطوة صغيرة بتبني تطبيقًا حقيقيًا</b>\n    <p>غيّر سطرًا واحدًا، شغّل المشروع، وشاهد النتيجة هنا.</p>\n  </section>\n</main>\n",
    "src/app/app.css": ".cinema-shell{max-width:760px;margin:0 auto;padding:24px;font-family:Arial,sans-serif;color:#19372e}.cinema-heading{display:flex;align-items:center;gap:12px}.cinema-heading h1{margin:2px 0}.cinema-heading small{color:#6b7e72}.cinema-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#286b56;color:#fff;font-weight:bold}.welcome-card{margin-top:18px;padding:18px;border:1px solid #dfe8dd;border-radius:16px;background:#f0f6ec}.welcome-card p{margin-bottom:0;color:#607267}\n.badge{display:inline-block;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:bold;margin-top:6px}\n.badge.normal{background:#264639;color:#b7d5c5}\n.badge.discount{background:#ffe082;color:#5d4037}\n.movie-pill{display:inline-flex;flex-direction:column;padding:8px 14px;background:#1e352b;border:1px solid #2f5443;border-radius:8px;margin:6px 4px;text-align:right}\n.movie-pill b{color:#74c69d;font-size:14px}\n.movie-pill small{color:#8fa99b;font-size:11px;margin-top:2px}\n.empty-notice{padding:14px 18px;background:rgba(220,53,69,0.12);border:1px dashed #e63946;border-radius:10px;color:#d90429;font-size:14px;text-align:center;margin:12px 0;font-weight:500}\n.seat-picker-section{margin-top:16px;padding:16px;background:#1b2e25;border:1px solid #2d503f;border-radius:12px;color:#e4ece7}\n.seat-picker-section b{color:#8ee2a8;font-size:16px;display:block;margin-bottom:8px}\n",
    "src/styles.css": "html,body{margin:0;min-height:100%;background:#fff;font:16px/1.5 Arial,sans-serif}button,input{font:inherit}\n",
    "src/app/app.spec.ts": "import { TestBed } from '@angular/core/testing';\nimport { provideRouter } from '@angular/router';\nimport { App } from './app';\n\ndescribe('App', () => {\n  it('creates the cinema page', async () => {\n    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] }).compileComponents();\n    const fixture = TestBed.createComponent(App);\n    expect(fixture.componentInstance.title).toBe('سينما خطوة');\n  });\n});\n",
    "src/app/models/movie.model.ts": "export interface Movie {\n  readonly id: number;\n  title: string;\n  genre: string;\n  duration: string;\n  rating: number;\n  heroBanner: string;\n  description: string;\n  price: number;\n  available: boolean;\n}\n",
    "src/app/models/seat.model.ts": "export type SeatTier = 'standard' | 'vip' | 'premium';\n\nexport interface Seat {\n  readonly id: string;\n  row: string;\n  number: number;\n  tier: SeatTier;\n  price: number;\n  booked: boolean;\n  selected?: boolean;\n}\n",
    "src/app/models/booking.model.ts": "export enum BookingStatus {\n  PENDING = 'PENDING',\n  CONFIRMED = 'CONFIRMED',\n  CANCELLED = 'CANCELLED'\n}\n\nexport interface BookingRequest {\n  movieId: number;\n  seatIds: string[];\n  customerName: string;\n  customerPhone: string;\n}\n\nexport interface BookingRecord {\n  readonly id: string;\n  movieId: number;\n  movieTitle: string;\n  seats: string[];\n  totalPrice: number;\n  customerName: string;\n  status: BookingStatus;\n  createdAt: string;\n}\n",
    "src/app/models/hall.model.ts": "export class CinemaHall {\n  constructor(\n    public readonly id: string,\n    public name: string,\n    public totalSeats: number = 60,\n    private isImax: boolean = false\n  ) {}\n\n  public getSummary(): string {\n    return `${this.name} (${this.totalSeats} مقعد) ${this.isImax ? '- IMAX' : ''}`;\n  }\n}\n",
    "src/app/models/pricing.utils.ts": "export function calculateTicketPrice(basePrice: number, tier: string = 'standard', vatRate: number = 0.15): number {\n  let multiplier = 1;\n  if (tier === 'vip') multiplier = 1.5;\n  if (tier === 'premium') multiplier = 1.25;\n  const subtotal = basePrice * multiplier;\n  return Math.round(subtotal * (1 + vatRate));\n}\n\nexport function formatSaudiRiyal(amount: number): string {\n  return `${amount} ر.س`;\n}\n",
    "src/app/models/api-response.model.ts": "export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  message?: string;\n  timestamp: number;\n}\n",
    "src/app/models/metadata.demo.ts": "export function LogComponent(target: Function) {\n  console.log(`[Component Registered]: ${target.name}`);\n}\n\nexport function ReadonlyField(target: any, propertyKey: string) {\n  Object.defineProperty(target, propertyKey, { writable: false });\n}\n",
    "src/app/core/models/cinema-state.model.ts": "import { Movie } from '../../models/movie.model';\nimport { Seat } from '../../models/seat.model';\nimport { BookingRecord } from '../../models/booking.model';\n\nexport interface CinemaAppState {\n  selectedMovieId: number | null;\n  selectedSeats: string[];\n  couponCode: string | null;\n  discountRate: number;\n}\n\nexport interface CinemaState {\n  movies: Movie[];\n  selectedMovie: Movie | null;\n  seats: Seat[];\n  selectedSeats: string[];\n  cartTotal: number;\n  filterQuery: string;\n  bookings: BookingRecord[];\n  loading: boolean;\n  error: string | null;\n}\n",
    "src/app/core/store/cinema.store.ts": "import { Injectable, signal, computed } from '@angular/core';\nimport { Movie } from '../../models/movie.model';\nimport { Seat } from '../../models/seat.model';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class CinemaStore {\n  readonly movies = signal<Movie[]>([\n    { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي', duration: '120 دقيقة', rating: 4.8, heroBanner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800', description: 'مغامرة ملحمية في الفضاء', price: 85, available: true },\n    { id: 2, title: 'واحة الأمل', genre: 'دراما', duration: '105 دقيقة', rating: 4.6, heroBanner: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800', description: 'قصة ملهمة في الصحراء', price: 75, available: true }\n  ]);\n\n  readonly seats = signal<Seat[]>([\n    { id: 'A1', row: 'A', number: 1, tier: 'standard', price: 85, booked: false },\n    { id: 'A2', row: 'A', number: 2, tier: 'vip', price: 120, booked: false },\n    { id: 'A3', row: 'A', number: 3, tier: 'standard', price: 85, booked: false },\n    { id: 'B1', row: 'B', number: 1, tier: 'standard', price: 85, booked: true },\n    { id: 'B2', row: 'B', number: 2, tier: 'vip', price: 120, booked: false },\n    { id: 'B3', row: 'B', number: 3, tier: 'standard', price: 85, booked: false }\n  ]);\n\n  readonly selectedMovie = signal<Movie | null>(null);\n  readonly selectedSeats = signal<string[]>([]);\n  readonly ticketPrice = signal<number>(85);\n\n  readonly totalCartPrice = computed(() => this.selectedSeats().length * this.ticketPrice());\n  readonly seatCount = computed(() => this.selectedSeats().length);\n\n  selectMovie(movie: Movie): void {\n    this.selectedMovie.set(movie);\n  }\n\n  toggleSeat(seatId: string): void {\n    this.selectedSeats.update((seats) =>\n      seats.includes(seatId) ? seats.filter((id) => id !== seatId) : [...seats, seatId]\n    );\n  }\n\n  clearSelection(): void {\n    this.selectedSeats.set([]);\n  }\n}\n",
    "src/app/services/cinema.service.ts": "import { Injectable, inject, signal } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\nimport { Movie } from '../models/movie.model';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class CinemaService {\n  private http = inject(HttpClient);\n\n  private readonly _movies = signal<Movie[]>([\n    { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي', duration: '120 دقيقة', rating: 4.8, heroBanner: '', description: '', price: 85, available: true },\n    { id: 2, title: 'واحة الأمل', genre: 'دراما', duration: '105 دقيقة', rating: 4.6, heroBanner: '', description: '', price: 75, available: true }\n  ]);\n\n  private _selectedMovie = signal<string>('رحلة النجوم');\n  readonly selectedMovie = this._selectedMovie.asReadonly();\n\n  readonly movies = this._movies.asReadonly();\n\n  selectMovie(title: string): void {\n    this._selectedMovie.set(title);\n  }\n\n  getMovies(): Movie[] {\n    return this._movies();\n  }\n\n  fetchMovies(): Observable<Movie[]> {\n    return this.http.get<Movie[]>('/api/movies');\n  }\n\n  confirmBooking(payload: { movieId: number; seats: string[] }): Observable<{ bookingId: string }> {\n    return this.http.post<{ bookingId: string }>('/api/bookings', payload);\n  }\n}\n",
    "src/app/interceptors/auth.interceptor.ts": "import { HttpInterceptorFn } from '@angular/common/http';\n\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const token = 'khotwa-cinema-token';\n  const cloned = req.clone({\n    setHeaders: {\n      Authorization: `Bearer ${token}`\n    }\n  });\n  return next(cloned);\n};\n",
    "src/app/guards/booking.guard.ts": "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\n\nexport const bookingGuard: CanActivateFn = (route, state) => {\n  const router = inject(Router);\n  const hasSeat = true;\n  return hasSeat ? true : router.createUrlTree(['/movies']);\n};\n",
    "src/app/validators/cinema.validators.ts": "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';\n\nexport function saudiPhoneValidator(): ValidatorFn {\n  return (control: AbstractControl): ValidationErrors | null => {\n    if (!control.value) return null;\n    const valid = /^(05|5)\\d{8}$/.test(String(control.value).trim());\n    return valid ? null : { saudiPhone: { valid: false, message: 'يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام' } };\n  };\n}\n",
    "src/app/app.routes.ts": "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'movies', pathMatch: 'full' },\n  {\n    path: 'booking/:id',\n    loadComponent: () => import('./features/booking/booking.component').then((m) => m.BookingComponent)\n  }\n];\n",
    "src/app/features/booking/booking.component.ts": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-booking',\n  standalone: true,\n  template: '<h2>حجز الفيلم رقم: {{ id() }}</h2>'\n})\nexport class BookingComponent {\n  id = input.required<string>();\n}\n",
    "src/app/features/booking/booking-form.component.ts": "import { Component } from '@angular/core';\nimport { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-booking-form',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: '<form [formGroup]=\"bookingForm\"><input formControlName=\"customerName\" /></form>'\n})\nexport class BookingFormComponent {\n  bookingForm = new FormGroup({\n    customerName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })\n  });\n}\n",
    "src/app/classic/app-classic.module.ts": "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { MovieCardClassicComponent } from './movie-card-classic.component';\nimport { MovieDetailClassicComponent } from './movie-detail-classic.component';\nimport { SeatItemClassicComponent } from './seat-item-classic.component';\n\n// الوحدة الكلاسيكية لتطبيق سينما خطوة\n// تسجيل المكونات والتوجيهات والخدمات الكلاسيكية وتصديرها\n@NgModule({\n  declarations: [\n    MovieCardClassicComponent,\n    MovieDetailClassicComponent,\n    SeatItemClassicComponent\n  ],\n  imports: [CommonModule],\n  exports: [\n    MovieCardClassicComponent,\n    MovieDetailClassicComponent,\n    SeatItemClassicComponent\n  ],\n  providers: [],\n  bootstrap: []\n})\nexport class AppClassicModule {}\n",
    "src/app/classic/movie-card-classic.component.ts": "import { Component } from '@angular/core';\n\n// المكون الكلاسيكي لبطاقة الفيلم - بدون standalone: true\n@Component({\n  selector: 'app-movie-card-classic',\n  templateUrl: './movie-card-classic.component.html',\n  styleUrl: './movie-card-classic.component.css'\n})\nexport class MovieCardClassicComponent {\n  movieTitle: string = 'رحلة النجوم';\n  genre: string = 'خيال علمي';\n  rating: number = 4.8;\n  isSoldOut: boolean = false;\n}\n",
    "src/app/classic/movie-card-classic.component.html": "<article class=\"movie-card-classic\">\n  <header class=\"card-header\">\n    <span class=\"badge\">{{ genre }}</span>\n    <span class=\"rating\">⭐ {{ rating }}</span>\n  </header>\n  <div class=\"card-body\">\n    <h3 class=\"movie-title\">{{ movieTitle }}</h3>\n    <p class=\"status-text\">\n      الحالة: <strong [class.sold-out]=\"isSoldOut\">{{ isSoldOut ? 'نَفِدَت التذاكر' : 'متاح للحجز' }}</strong>\n    </p>\n  </div>\n  <footer class=\"card-footer\">\n    <button type=\"button\" class=\"btn-book\" [disabled]=\"isSoldOut\">\n      {{ isSoldOut ? 'غير متوفر' : 'حجز التذكرة' }}\n    </button>\n  </footer>\n</article>\n",
    "src/app/classic/movie-card-classic.component.css": ".movie-card-classic {\n  border: 1px solid #dfe8dd;\n  border-radius: 16px;\n  padding: 16px;\n  background: #ffffff;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.05);\n  font-family: inherit;\n  transition: transform 0.2s ease;\n}\n.movie-card-classic:hover {\n  transform: translateY(-2px);\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.badge {\n  background: #e8f3ee;\n  color: #286b56;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: bold;\n}\n.rating {\n  font-size: 14px;\n  color: #d97706;\n  font-weight: bold;\n}\n.movie-title {\n  margin: 0 0 8px 0;\n  font-size: 18px;\n  color: #19372e;\n}\n.status-text {\n  margin: 0;\n  color: #607267;\n  font-size: 14px;\n}\n.sold-out {\n  color: #dc2626;\n  font-weight: bold;\n}\n.card-footer {\n  margin-top: 16px;\n}\n.btn-book {\n  width: 100%;\n  padding: 10px 16px;\n  border: none;\n  border-radius: 10px;\n  background: #286b56;\n  color: #ffffff;\n  font-size: 15px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-book:hover:not(:disabled) {\n  background: #1f5343;\n}\n.btn-book:disabled {\n  background: #cbd5e1;\n  color: #64748b;\n  cursor: not-allowed;\n}\n",
    "src/app/classic/movie-detail-classic.component.ts": "import { Component, Input } from '@angular/core';\n\n// المكون الكلاسيكي لعرض تفاصيل الفيلم - يستقبل البيانات عبر @Input الكلاسيكي\n@Component({\n  selector: 'app-movie-detail-classic',\n  templateUrl: './movie-detail-classic.component.html',\n  styleUrl: './movie-detail-classic.component.css'\n})\nexport class MovieDetailClassicComponent {\n  // استقبال عنوان الفيلم من المكون الأب عبر مزخرف @Input\n  @Input() title: string = '';\n}\n",
    "src/app/classic/movie-detail-classic.component.html": "<div class=\"movie-detail-card\">\n  <div class=\"detail-header\">\n    <span class=\"detail-badge\">مكون كلاسيكي فرعي</span>\n  </div>\n  <h4 class=\"detail-title\">{{ title || 'عنوان غير محدد' }}</h4>\n  <p class=\"detail-info\">يستقبل هذا المكون البيانات من المكون الأب عبر منفذ @Input() الكلاسيكي.</p>\n</div>\n",
    "src/app/classic/movie-detail-classic.component.css": ".movie-detail-card {\n  padding: 14px 18px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  margin-top: 12px;\n  font-family: inherit;\n}\n.detail-badge {\n  display: inline-block;\n  padding: 2px 8px;\n  background: #e0e7ff;\n  color: #4338ca;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: bold;\n}\n.detail-title {\n  margin: 8px 0 4px 0;\n  color: #1e293b;\n  font-size: 16px;\n  font-weight: bold;\n}\n.detail-info {\n  margin: 0;\n  color: #64748b;\n  font-size: 13px;\n  line-height: 1.4;\n}\n",
    "src/app/classic/seat-item-classic.component.ts": "import { Component, Input, Output, EventEmitter } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-item-classic',\n  standalone: false,\n  template: `\n    <button\n      type=\"button\"\n      class=\"cinema-seat\"\n      [class.booked]=\"isBooked\"\n      (click)=\"selectSeat()\">\n      {{ seatNumber }}\n    </button>\n  `,\n  styles: [`\n    .cinema-seat { width: 38px; height: 36px; border-radius: 6px; cursor: pointer; border: 1px solid #325544; background: #2d5a44; color: #d8eadb; font-family: inherit; }\n    .cinema-seat.booked { background: #6c2d2d; color: #f5caca; cursor: not-allowed; }\n  `]\n})\nexport class SeatItemClassicComponent {\n  @Input() seatNumber: string = 'A1';\n  @Input() isBooked: boolean = false;\n  @Output() seatSelected = new EventEmitter<string>();\n\n  selectSeat(): void {\n    if (!this.isBooked) {\n      this.seatSelected.emit(this.seatNumber);\n    }\n  }\n}\n",
    "src/app/classic/cinema-classic.service.ts": "import { Injectable } from '@angular/core';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class CinemaClassicService {\n  private cinemaName = 'سينما خطوة الكلاسيكية';\n  private ticketPrice = 85;\n\n  getCinemaName(): string {\n    return this.cinemaName;\n  }\n\n  getTicketPrice(): number {\n    return this.ticketPrice;\n  }\n}\n",
    "src/app/classic/rx-demo.ts": "import { Observable, Subscription } from 'rxjs';\n\nexport class RxDemo {\n  private sub?: Subscription;\n  ticketPrice: number = 0;\n\n  startListening(price$: Observable<number>): void {\n    this.sub = price$.subscribe((val) => {\n      this.ticketPrice = val;\n    });\n  }\n\n  stopListening(): void {\n    this.sub?.unsubscribe();\n  }\n}\n",
    "src/app/components/movie-card.component.ts": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card',\n  standalone: true,\n  template: '<div class=\"movie-pill\"><b>{{ title() }}</b></div>'\n})\nexport class MovieCardComponent {\n  title = input.required<string>();\n}\n",
    "src/app/components/seat-picker.component.ts": "import { Component, output } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-picker',\n  standalone: true,\n  template: '<button (click)=\"chooseSeat()\">تأكيد المقعد</button>'\n})\nexport class SeatPickerComponent {\n  seatSelected = output<string>();\n  chooseSeat() { this.seatSelected.emit('B4'); }\n}\n",
    "src/app/components/search-box.component.ts": "import { Component, model } from '@angular/core';\n\n@Component({\n  selector: 'app-search-box',\n  standalone: true,\n  template: '<input [value]=\"query()\" (input)=\"query.set($any($event.target).value)\" />'\n})\nexport class SearchBoxComponent {\n  query = model<string>('');\n}\n",
    "src/app/components/seat-item.component.ts": "import { Component, input, output } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-item',\n  standalone: true,\n  template: `\n    <button class=\"seat-pill\" (click)=\"selectSeat()\">\n      {{ seatNumber() }}\n    </button>\n  `\n})\nexport class SeatItemComponent {\n  seatNumber = input.required<string>();\n  seatSelected = output<string>();\n\n  selectSeat(): void {\n    this.seatSelected.emit(this.seatNumber());\n  }\n}\n",
    "src/app/features/movies/movie-catalog.component.ts": "import { Component, signal, computed, inject } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { Movie } from '../../models/movie.model';\nimport { CinemaStore } from '../../core/store/cinema.store';\n\n@Component({\n  selector: 'app-movie-catalog',\n  standalone: true,\n  imports: [CommonModule],\n  template: `\n    <section class=\"movie-catalog-container\">\n      <header class=\"catalog-header\">\n        <h2>كتالوج أفلام سينما خطوة</h2>\n        <div class=\"search-bar\">\n          <input\n            type=\"search\"\n            placeholder=\"ابحث عن فيلمك المفضل...\"\n            [value]=\"searchQuery()\"\n            (input)=\"onSearchInput($event)\"\n            class=\"search-input\" />\n        </div>\n      </header>\n\n      <div class=\"catalog-grid\">\n        @for (movie of filteredMovies(); track movie.id) {\n          <article class=\"movie-card\" (click)=\"selectMovie(movie)\">\n            <img [src]=\"movie.heroBanner\" [alt]=\"movie.title\" class=\"movie-poster\" />\n            <div class=\"movie-info\">\n              <h3>{{ movie.title }}</h3>\n              <span class=\"genre-badge\">{{ movie.genre }}</span>\n              <p class=\"movie-duration\">⏱ {{ movie.duration }} · ⭐ {{ movie.rating }}</p>\n              <p class=\"movie-price\">{{ movie.price }} ر.س</p>\n            </div>\n          </article>\n        } @empty {\n          <div class=\"empty-catalog\">\n            <p>لا توجد أفلام مطابقة لكلمة البحث الحالية</p>\n          </div>\n        }\n      </div>\n    </section>\n  `,\n  styles: [`\n    .movie-catalog-container { padding: 16px; font-family: inherit; }\n    .catalog-header { margin-bottom: 20px; }\n    .search-input { width: 100%; max-width: 400px; padding: 10px 14px; border-radius: 8px; border: 1px solid #325544; background: #112019; color: #e5eee8; }\n    .catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }\n    .movie-card { border: 1px solid #2f5443; border-radius: 12px; background: #1b2e25; overflow: hidden; cursor: pointer; transition: transform 0.2s; }\n    .movie-card:hover { transform: translateY(-4px); }\n    .movie-poster { width: 100%; height: 140px; object-fit: cover; }\n    .movie-info { padding: 12px; }\n    .genre-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; background: #286b56; color: #fff; font-size: 11px; }\n    .empty-catalog { grid-column: 1 / -1; text-align: center; padding: 30px; color: #8fa99b; }\n  `]\n})\nexport class MovieCatalogComponent {\n  store = inject(CinemaStore);\n  searchQuery = signal<string>('');\n  movies = this.store.movies;\n  filteredMovies = computed(() => this.movies().filter(m => m.title.includes(this.searchQuery())));\n\n  onSearchInput(event: Event): void {\n    const input = event.target as HTMLInputElement;\n    this.searchQuery.set(input.value);\n  }\n\n  selectMovie(movie: Movie): void {\n    this.store.selectMovie(movie);\n  }\n}\n",
    "src/app/features/booking/seat-matrix.component.ts": "import { Component, inject } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { CinemaStore } from '../../core/store/cinema.store';\n\n@Component({\n  selector: 'app-seat-matrix',\n  standalone: true,\n  imports: [CommonModule],\n  template: `\n    <section class=\"seat-matrix-wrapper\">\n      <div class=\"cinema-screen\">\n        <div class=\"screen-curve\"></div>\n        <small class=\"screen-label\">شاشة العرض الرئيسية · IMAX</small>\n      </div>\n\n      <div class=\"seat-picker-grid\">\n        @for (seat of store.seats(); track seat.id) {\n          <button\n            type=\"button\"\n            class=\"cinema-seat\"\n            [class.booked]=\"seat.booked\"\n            [class.vip]=\"seat.tier === 'vip'\"\n            [class.selected]=\"isSeatSelected(seat.id)\"\n            [disabled]=\"seat.booked\"\n            (click)=\"onSeatClick(seat.id)\">\n            {{ seat.id }}\n          </button>\n        }\n      </div>\n\n      <footer class=\"matrix-legend\">\n        <span class=\"legend-item\"><span class=\"dot available\"></span> متاح (85 ر.س)</span>\n        <span class=\"legend-item\"><span class=\"dot vip\"></span> VIP (120 ر.س)</span>\n        <span class=\"legend-item\"><span class=\"dot selected\"></span> محدد</span>\n        <span class=\"legend-item\"><span class=\"dot booked\"></span> محجوز</span>\n      </footer>\n    </section>\n  `,\n  styles: [`\n    .seat-matrix-wrapper { text-align: center; padding: 20px 10px; background: #0f1c16; border-radius: 16px; border: 1px solid #233e31; }\n    .cinema-screen { margin-bottom: 24px; }\n    .screen-curve { width: 80%; height: 6px; margin: 0 auto 6px; background: linear-gradient(90deg, transparent, #52b788, transparent); border-radius: 50%; box-shadow: 0 2px 10px rgba(82,183,136,0.5); }\n    .screen-label { color: #8fa99b; font-size: 11px; }\n    .seat-picker-grid { display: grid; grid-template-columns: repeat(3, 44px); justify-content: center; gap: 10px; margin-bottom: 20px; }\n    .cinema-seat { width: 44px; height: 40px; border-radius: 8px; border: 1px solid #2f5443; background: #234735; color: #d8eadb; font-weight: bold; cursor: pointer; transition: all 0.15s ease; font-family: inherit; }\n    .cinema-seat:hover:not(:disabled) { transform: scale(1.08); background: #2d5a44; }\n    .cinema-seat.vip { border-color: #d4af37; background: #3d3215; color: #f9e295; }\n    .cinema-seat.selected { background: #52b788; color: #0d1e17; border-color: #74c69d; box-shadow: 0 0 10px rgba(82,183,136,0.6); }\n    .cinema-seat.booked { background: #5a2525; color: #f5caca; border-color: #753232; cursor: not-allowed; opacity: 0.6; }\n    .matrix-legend { display: flex; justify-content: center; gap: 14px; font-size: 12px; color: #a4beaf; margin-top: 12px; flex-wrap: wrap; }\n    .legend-item { display: inline-flex; align-items: center; gap: 6px; }\n    .dot { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }\n    .dot.available { background: #234735; }\n    .dot.vip { background: #d4af37; }\n    .dot.selected { background: #52b788; }\n    .dot.booked { background: #5a2525; }\n  `]\n})\nexport class SeatMatrixComponent {\n  store = inject(CinemaStore);\n\n  onSeatClick(id: string): void {\n    this.store.toggleSeat(id);\n  }\n\n  isSeatSelected(id: string): boolean {\n    return this.store.selectedSeats().includes(id);\n  }\n}\n",
    "src/app/features/checkout/checkout.component.ts": "import { Component, computed, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-checkout',\n  standalone: true,\n  template: '<div class=\"checkout-summary\">المجموع النهائي: {{ finalTotal() }}</div>'\n})\nexport class CheckoutComponent {\n  subtotal = signal<number>(170);\n  discount = signal<number>(0.10);\n  finalTotal = computed(() => {\n    const discounted = this.subtotal() * (1 - this.discount());\n    return discounted * 1.15;\n  });\n}\n",
    "src/app/features/tickets/ticket-pass.component.ts": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-ticket-pass',\n  standalone: true,\n  template: `\n    <div class=\"final-ticket-card\">\n      <h3>سينما خطوة · تذكرة دخول إلكترونية</h3>\n      <p>رقم الحجز: {{ bookingRef() }}</p>\n      <button class=\"btn-confirm\" (click)=\"printTicket()\">طباعة التذكرة</button>\n    </div>\n  `\n})\nexport class TicketPassComponent {\n  bookingRef = input.required<string>();\n  printTicket() { window.print(); }\n}\n",
    "src/app/core/store/cinema.store.spec.ts": "import { describe, it, expect } from 'vitest';\nimport { CinemaStore } from './cinema.store';\n\ndescribe('CinemaStore', () => {\n  it('toggles seat selection correctly', () => {\n    const store = new CinemaStore();\n    expect(store.selectedSeats()).toEqual([]);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual(['B4']);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual([]);\n  });\n});\n",
    "README.md": "# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro) - مبنية بـ Angular 22 و Signals\n\nتطبيق ويب مؤسسي متكامل لحجز تذاكر السينما مبني بأحدث معايير Angular الحديثة.\n\n## المعمارية البرمجية (Architecture)\n- **المكونات المستقلة (Standalone Components)**: الاستغناء التام عن وحدات NgModule.\n- **محرك الإشارات (Angular Signals)**: إدارة حالة تفاعلية دقيقة فائقة الأداء دون الاعتماد على Zone.js.\n- **مخزن الحالة المركزي (CinemaStore)**: مستودع مركزي نقي يدير المقاعد وسلة الحجز بـ signal() و computed().\n- **التوجيه الحديث والحراس الوظيفيون**: حماية المسارات بدوال CanActivateFn وربط المعاملات بـ withComponentInputBinding().\n- **النماذج الصارمة والمدققات المخصصة**: Typed Reactive Forms بخيار nonNullable ومدقق الهواتف السعودية.\n- **اختبارات الوحدة (Unit Testing)**: اختبارات جودة سريعة وشاملة باستخدام Vitest.\n\n## متطلبات التشغيل\n- Node.js >= 20.x\n- Angular CLI >= 19.x\n\n## خطوات التشغيل\n1. تثبيت الحزم: `npm install`\n2. تشغيل بيئة التطوير: `npm start`\n3. تشغيل اختبارات الوحدة: `npm test`\n4. بناء نسخة الإنتاج: `npm run build`\n",
  },
  lessons: [
  {
    "id": "ng-ts-01",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "ما هو TypeScript ولماذا تحتاجه Angular؟",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "مقدمة جوهرية تشرح فلسفة TypeScript كنظام أنواع صارم فوق JavaScript، وكيف يحمي تطبيقات Angular من الأخطاء الصامتة عبر الأنواع البدائية (string, number, boolean).",
    "concept": "لغة TypeScript هي امتداد فائق (Superset) لـ JavaScript يضيف نظام الأنواع الساكنة (Static Typing). في JavaScript العادية، يمكن لمتغير أن يحتوي نصاً ثم يتحول فجأة لرقم دون تنبيه، مما يؤدي لانهيار التطبيق في يد المستخدم. Angular صُممت بالكامل فوق TypeScript لضمان موثوقية الأنظمة الضخمة؛ حيث يفحص المترجم صحة الأنواع البدائية الأساسية الثلاثة (string للنصوص، number للأرقام، boolean للقيم المنطقية) أثناء الكتابة مباشرة.",
    "flow": "كود TypeScript مع أنواع بدائية (.ts) ⟶ فحص صارم أثناء الكتابة في المحرر ⟶ تحويل (Transpilation) إلى JavaScript نظيف يعمل في المتصفح",
    "task": "افتح الملف src/app/models/movie.model.ts وعرّف ثابت المدينة الافتراضية للسينما defaultCinemaCity بنوع string وقيمة 'الرياض'.",
    "file": "src/app/models/movie.model.ts",
    "code": "export const defaultCinemaCity: string = 'الرياض';",
    "expected": "export const defaultCinemaCity: string = 'الرياض';",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في جافاسكريبت التقليدية، كتابة let price = '85' ثم محاولة price + 15 ستعطيك '8515' بدلاً من 100، ولن يخبرك المتصفح بأي خطأ حتى يشتكي العملاء! يقضي TypeScript على هذه الكوابيس عبر فرض 'النوع الصريح'؛ فإذا حددت أن السعر number ثم حاولت إسناد نص له، سيظهر خطأ أحمر تحت السطر فوراً في المحرر وقبل أن يصل الكود للعملاء.",
        "flow": "let price: number = 85 (صحيح) ⟶ price = 'مجاني' ❌ (خطأ فوري وقت الترجمة: Type 'string' is not assignable to type 'number')",
        "task": "تأمل مخطط التدفق ولاحظ كيف يعمل TypeScript كحارس أمان يمنع تمرير البيانات الخاطئة بين أجزاء تطبيق السينما.",
        "benefit": "فهمت لماذا تبني كبرى الشركات وتطبيقات Angular مشاريعها بـ TypeScript لضمان موثوقية 100%."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الأنواع البدائية (Primitive Types) والتصريح الصريح",
        "explanation": "لكتابة نوع صريح في TypeScript، نضع نقطتين رأسيتين (:) بعد اسم المتغير ثم نحدد نوع البيانات البدائي: string للنصوص (مثل اسم الفيلم 'رحلة النجوم')، number للأرقام الصحيحة والعشرية (مثل سعر التذكرة 85 أو التقييم 4.8)، و boolean للقيم المنطقية الثنائية (مثل true أو false لحالة توفر المقعد). كما نستخدم export لإتاحة استخدام المتغير عبر باقي ملفات تطبيق السينما.",
        "flow": "اسم المتغير ⟶ النقطتان : ⟶ تحديد النوع (string | number | boolean) ⟶ علامة = ⟶ القيمة الابتدائية المطابقة",
        "task": "تفقد تركيبة السطر: الكلمة export للمشاركة، تليها النقطتان : لتحديد نوع البيانات، ثم علامة = لإسناد القيمة المتوافقة.",
        "benefit": "أتقنت البنية النحوية لتحديد الأنواع البدائية الثلاثة في TypeScript."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بتعريف المدينة الرئيسية التي تنطلق منها عروض سينما خطوة. سنعرّف ثابتاً مصدراً باسم defaultCinemaCity بنوع string وقيمة 'الرياض' داخل ملف نماذج الأفلام src/app/models/movie.model.ts.",
        "file": "src/app/models/movie.model.ts",
        "code": "export const defaultCinemaCity: string = 'الرياض';",
        "expected": "export const defaultCinemaCity: string = 'الرياض';",
        "task": "اكتب سطر تصدير ثابت المدينة أعلاه في أعلى ملف src/app/models/movie.model.ts، ثم اضغط على زر (شغّل وافحص).",
        "benefit": "كتبت أول سطر كود صريح النوع بيدك في TypeScript بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة ثابتين جديدين بنفسك في السطور التالية لتمثيل سعر التذكرة الافتراضي وحالة فتح صالات العرض: الأول باسم defaultTicketPrice بنوع number وقيمة 85، والثاني باسم isCinemaOpen بنوع boolean وقيمة true.",
        "task": "أضف الثابتين بنوعيهما number و boolean وتأكد من عدم وجود أي خطأ تركيبي في المحرر.",
        "benefit": "تدرّبت عملياً على الأنواع البدائية الثلاثة (string, number, boolean) معاً في ملف واحد."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة الأساسية من استخدام الأنواع الساكنة (Static Types) في لغة TypeScript؟",
        "options": [
          "اكتشاف أخطاء عدم تطابق البيانات أثناء الكتابة وقبل تشغيل التطبيق في المتصفح",
          "زيادة سرعة تحميل صور الأفلام في المتصفح تلقائياً",
          "إلغاء الحاجة لكتابة كود HTML أو CSS في المشروع"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! التحقق الساكن (Static Type Checking) يوفر شبكة أمان تكشف الأخطاء لحظياً في مرحلة التطوير.",
        "task": "ما الفائدة الأساسية من استخدام الأنواع الساكنة (Static Types) في لغة TypeScript؟"
      }
    ]
  },
  {
    "id": "ng-ts-02",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "مصفوفات البيانات والـ Tuples في TypeScript",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "التعامل الاحترافي مع القوائم والمصفوفات المكتوبة بدقة (string[], number[])، واستخدام الـ Tuples لتحديد عناصر ثابتة الطول والنوع، وقفل التعديل بـ readonly لحماية قوائم السينما من التغيير العشوائي.",
    "concept": "في JavaScript، يمكن للمصفوفة أن تجمع أرقاماً ونصوصاً وكائنات مشوهة دون أي قيود، مما يجعل معالجة القوائم غير آمنة. يقدم TypeScript طريقتين للتحكم في القوائم: مصفوفات الأنواع الصريحة مثل string[] التي تضمن أن كل عنصر هو نص نقي، ومفهوم Tuples الذي يحدد مصفوفة ثابتة الطول بترتيب أنواع محدد بدقة (مثل [string, number] لتمثيل اسم الصالة وسعتها). ولضمان عدم قيام أي جزء من التطبيق بحذف أو تعديل عناصر القوائم الثابتة عبر push() أو pop()، نستخدم الكلمة المفتاحية readonly لقفل المصفوفة وجعلها للقراءة فقط.",
    "flow": "عناصر القائمة ⟶ تحديد النوع string[] مع التجميد readonly ⟶ منع push() العشوائي ⟶ حماية تصنيفات الأفلام من التلاعب",
    "task": "افتح الملف src/app/models/movie.model.ts وعرّف مصفوفة تصنيفات السينما cinemaGenres كمصفوفة نصوص غير قابلة للتعديل readonly string[] تحتوي على التصنيفات الرئيسية.",
    "file": "src/app/models/movie.model.ts",
    "code": "export const cinemaGenres: readonly string[] = ['أكشن', 'دراما', 'كوميديا', 'خيال علمي'];",
    "expected": "export const cinemaGenres: readonly string[] = ['أكشن', 'دراما', 'كوميديا', 'خيال علمي'];",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في تطبيق حجز السينما، لدينا تصنيفات ثابتة للأفلام مثل 'أكشن' و 'دراما'. إذا سمحنا لأي جزء في الكود بإضافة تصنيف خاطئ أو رقم داخل المصفوفة عن طريق الخطأ عبر genres.push(999)، فستفسد فلاتر البحث في الواجهة! تضمن لك مصفوفات string[] تجانس كافة العناصر، بينما توفر readonly حماية حديدية تمنع استدعاء دوال التعديل مثل .push() أو .splice() نهائياً.",
        "flow": "genres: readonly string[] ⟶ genres.push('رعب') ❌ (خطأ: Property 'push' does not exist on type 'readonly string[]')",
        "task": "لاحظ كيف يمنع TypeScript أي محاولة لتغيير محتويات المصفوفة المجمدة بـ readonly.",
        "benefit": "أدركت قوة البيانات غير القابلة للتغيير (Immutability) في حماية حالة التطبيق."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح مصفوفات الأنواع والـ Tuples والـ readonly",
        "explanation": "لتعريف مصفوفة نصوص، نكتب اسم النوع البدائي متبوعاً بقوسين مربعين string[] (أو الصيغة البديلة Array<string>). وعند إضافة الكلمة readonly قبل النوع، يُسقط TypeScript كافة دوال التعديل المخلة بالقائمة. أما الـ Tuple فتُكتب بوضع أنواع العناصر بين أقواس مربعة [string, number]؛ لتعني تحديداً: عنصرين فقط، الأول نص والثاني رقم، مثل زوج إحداثيات مقعد السينما ['A', 12].",
        "flow": "النوع البدائي (string) ⟶ القوسان المربعان [] ⟶ مصفوفة نصوص string[] ⟶ إضافة readonly ⟶ تجميد القائمة وحمايتها",
        "task": "قارن بين كتابة string[] لمصفوفة ديناميكية الطول وبين [string, number] لـ Tuple محددة الطول والأنواع.",
        "benefit": "عرفت متى تختار المصفوفة العادية ومتى تستخدم Tuple لتنظيم البيانات المركبة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بتعريف قائمة تصنيفات السينما الرسمية في تطبيقنا. عرّف المصفوفة الثابتة cinemaGenres بنوع readonly string[] داخل ملف src/app/models/movie.model.ts لتكون مرجعاً موحداً لكل شاشات التطبيق.",
        "file": "src/app/models/movie.model.ts",
        "code": "export const cinemaGenres: readonly string[] = ['أكشن', 'دراما', 'كوميديا', 'خيال علمي'];",
        "expected": "export const cinemaGenres: readonly string[] = ['أكشن', 'دراما', 'كوميديا', 'خيال علمي'];",
        "task": "أضف تصدير المصفوفة cinemaGenres إلى ملف src/app/models/movie.model.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت مصفوفة آمنة من التعديل العشوائي لتكون نواة فلاتر سينما خطوة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تعريف Tuple تمثل إحداثيات مقعد سينما مميز باسم vipSeatCoordinate من النوع readonly [string, number] بقيمة ['A', 1] تحت مصفوفة التصنيفات، ولاحظ كيف يضمن TypeScript أن يكون الحرف نصاً ورقم المقعد عدداً حصراً.",
        "task": "عرّف export const vipSeatCoordinate: readonly [string, number] = ['A', 1]; وتأكد من قبول المحرر لها.",
        "benefit": "أتقنت استخدام Tuples في تمثيل الإحداثيات والبيانات المزدوجة بدقة فائقة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الذي يحدث عند محاولة استدعاء دالة .push('مغامرة') على مصفوفة معرّفة بنوع readonly string[]؟",
        "options": [
          "يرفض TypeScript العملية ويصدر خطأً أثناء الترجمة لأن المصفوفة مخصصة للقراءة فقط",
          "تتم إضافة العنصر في بداية المصفوفة بدلاً من نهايتها",
          "يتم تحويل العنصر إلى رقم تلقائياً قبل إضافته"
        ],
        "correct": 0,
        "benefit": "إجابة دقيقة! مصفوفات readonly تحظر كافة العمليات المغيّرة للحالة وتضمن بقاء القوائم نقية.",
        "task": "ما الذي يحدث عند محاولة استدعاء دالة .push('مغامرة') على مصفوفة معرّفة بنوع readonly string[]؟"
      }
    ]
  },
  {
    "id": "ng-ts-03",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "واجهات البيانات (Interfaces) وهيكلة كائنات السينما",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "بناء العقود الهيكلية للكائنات باستخدام Interfaces، وتحديد الخصائص الإلزامية والاختيارية (?) وحماية المعرفات بـ readonly لتمثيل بيانات كائن الفيلم Movie بدقة متناهية.",
    "concept": "في تطبيقات الويب، تمثل الكائنات (Objects) حجر الزاوية لنقل البيانات؛ فكل فيلم في السينما يملك معرفاً، عنواناً، تقييماً، وسعراً. الـ Interface في TypeScript هي 'عقد معماري' يحدد أسماء الحقول وأنواعها بدقة متناهية. إذا أنشأت كائناً ينقصه حقل إلزامي أو أخطأت في كتابة اسمه (مثل titl بدلاً من title)، سيرفض المترجم الكود فوراً. تتيح لنا الـ Interfaces أيضاً تحديد حقول اختيارية عبر علامة الاستفهام (?)، وحماية الحقول الحساسة مثل المعرف الرقمي id من إعادة التعيين عبر كلمة readonly.",
    "flow": "عقد interface Movie ⟶ إنشاء كائن مطابق للعقد ⟶ فحص فوري للحقول الإلزامية والاختيارية ⟶ منع الأخطاء الإملائية وتفكك البيانات",
    "task": "افتح الملف src/app/models/movie.model.ts وعرّف واجهة بيانات الفيلم interface Movie بالعقد الكامل الذي يضم id المحمي، وخصائص الفيلم الإلزامية، وحقل isAvailable الاختياري.",
    "file": "src/app/models/movie.model.ts",
    "code": "export interface Movie {\n  readonly id: number;\n  title: string;\n  genre: string;\n  durationMinutes: number;\n  rating: number;\n  price: number;\n  isAvailable?: boolean;\n}",
    "expected": "export interface Movie {",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/objects.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "تخيل أنك ترسل بيانات فيلم من الخادم إلى صفحة العرض، وكتب أحد المطورين movie.Duration بالـ D الكبيرة بينما ينتظر القالب duration بالصغيرة؛ في JavaScript ستظهر الصفحة فارغة دون أن تدري السبب! تعمل الـ Interface كعقد رسمي صارم بين أجزاء التطبيق: أي كائن يدعي أنه Movie يجب أن يلتزم حرفياً بالخصائص والأنواع المتفق عليها، مع دعم الإكمال التلقائي الذكي (IntelliSense) في محرر الأكواد.",
        "flow": "interface Movie { title: string } ⟶ const m: Movie = { titl: '...' } ❌ (خطأ فوري: Object literal may only specify known properties)",
        "task": "تأمل كيف تحمي الواجهة كود التطبيق من الأخطاء الإملائية الشائعة وتمنع ضياع الخصائص.",
        "benefit": "استوعبت كيف تمنح الـ Interfaces الاستقرار المعماري لكامل كائنات مشروع السينما."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح واجهة البيانات (Interface Anatomy)",
        "explanation": "نبدأ بكلمة interface متبوعة باسم العقد (ويبدأ تقليدياً بحرف كبير Movie). داخل الأقواس المعقوفة نحدد: 1) الحقول المحمية بـ readonly لمنع تغيير معرّف الفيلم بعد إنشائه، 2) الحقول الإلزامية مثل title: string و price: number، 3) الحقول الاختيارية بوضع علامة الاستفهام (?) قبل النقطتين مثل isAvailable?: boolean، مما يعني أن الكائن صالح سواء وُجدت هذه الخاصية أو غابت.",
        "flow": "كلمة interface ⟶ اسم العقد Movie ⟶ أقواس معقوفة { } ⟶ حقول إلزامية واختيارية (?) ⟶ عقد بيانات موثوق",
        "task": "لاحظ الفرق بين الحقل الإلزامي price وبين الحقل الاختياري isAvailable? المحتوي على علامة الاستفهام.",
        "benefit": "تعلمت تصميم عقود بيانات مرنة تجمع بين الصرامة في الأساسيات والمرونة في الحقول الإضافية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بصياغة العقد المركزي لأفلام سينما خطوة داخل ملف src/app/models/movie.model.ts بتحديد حقول الهوية، العنوان، التصنيف، المدة بالدقائق، التقييم، السعر، وحالة التوفر الاختيارية.",
        "file": "src/app/models/movie.model.ts",
        "code": "export interface Movie {\n  readonly id: number;\n  title: string;\n  genre: string;\n  durationMinutes: number;\n  rating: number;\n  price: number;\n  isAvailable?: boolean;\n}",
        "expected": "export interface Movie {",
        "task": "اكتب واجهة Movie بالهيكل الموضح في ملف src/app/models/movie.model.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت أول عقد واجهة بيانات متكامل لكائنات الأفلام لمشروع السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إنشاء كائن تجريبي يطابق الواجهة أسفلها: export const featuredMovie: Movie = { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي', durationMinutes: 135, rating: 4.8, price: 85 }; ثم احذف أحد الحقول ولاحظ كيف يعترض TypeScript فوراً.",
        "task": "أنشئ الكائن المتطابق مع Movie وجرّب اختبار صرامة الواجهة بحذف خاصية إلزامية وملاحظة التنبيه.",
        "benefit": "شاهدت بأم عينك كيف يفرض TypeScript الامتثال الكامل لعقود Interfaces."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي وظيفة علامة الاستفهام (?) عند وضعها بعد اسم الخاصية في الـ Interface (مثل isAvailable?: boolean)؟",
        "options": [
          "تجعل الخاصية اختيارية، بحيث يُسمح بإنشاء الكائن سواء وُجدت هذه الخاصية أو تم الاستغناء عنها",
          "تجعل الخاصية سرية ومشفرة داخل المتصفح",
          "تمنع قراءة الخاصية إلا بعد دفع قيمة التذكرة"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة ومتقنة! علامة الاستفهام تمنح الواجهات مرونة لتمثيل البيانات غير المؤكدة أو الاختيارية.",
        "task": "ما هي وظيفة علامة الاستفهام (?) عند وضعها بعد اسم الخاصية في الـ Interface (مثل isAvailable?: boolean)؟"
      }
    ]
  },
  {
    "id": "ng-ts-04",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "الأنواع المركبة (Type Aliases) والـ Union Types",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "صياغة الأسماء المستعارة للأنواع (Type Aliases) وتوظيف الـ Union Types لحصر فئات مقاعد السينما وخيارات الحجز في قيم نصية محددة وآمنة تماماً.",
    "concept": "في عالم البرمجة الواقعي، لا نريد للمقعد أن يقبل أي نص عشوائي مثل 'مقعد_غريب' أو 'كرسي_مكسور'؛ بل نريد حصر فئات المقاعد في خيارات دقيقة ومحددة: إما عادي 'standard'، أو مميز 'vip'، أو جناح فاخر 'suite'. يمنحنا TypeScript ميزة Type Aliases عبر كلمة type لإنشاء اسم نوع مخصص، وبالاشتراك مع Union Types (رمز الخط الرأسي |) يمكننا تعريف نوع اتحادي حصري يمنع إدخال أي قيمة خارج هذه الخيارات الثلاثة تماماً، مما يحمي محرك حساب الأسعار وواجهة المقاعد من الأخطاء الكارثية.",
    "flow": "type SeatTier = 'standard' | 'vip' | 'suite' ⟶ فحص الإدخال ⟶ قبول القيم المعتمدة فقط ⟶ منع النصوص العشوائية وحماية تسعير المقاعد",
    "task": "افتح الملف src/app/models/seat.model.ts وعرّف النوع المخصص لفئات المقاعد SeatTier ليقتصر حصرياً على 'standard' أو 'vip' أو 'suite'.",
    "file": "src/app/models/seat.model.ts",
    "code": "export type SeatTier = 'standard' | 'vip' | 'suite';",
    "expected": "export type SeatTier = 'standard' | 'vip' | 'suite';",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "لو استخدمنا نوع string عادي لخاصية فئة المقعد، لأمكن لأي مبرمج كتابة tier = 'VIP' أو tier = 'Vip' أو tier = 'vip ' مع مسافة زائدة؛ وتلك الفروق الطفيفة كفيلة بتعطيل كود حساب الأسعار في السينما! يحل الـ Union Type هذه المشكلة جذرياً بجعل القيم المقبولة قائمة بيضاء مغلقة (Literal Union): لن يقبل المترجم سوى 'standard' أو 'vip' أو 'suite' نصاً وحرفاً، وسيكتشف أي خطأ مطبعي في أجزاء من الثانية.",
        "flow": "let tier: SeatTier = 'vip' (مقبول ومطابق) ⟶ tier = 'gold' ❌ (خطأ فوري: Type '\"gold\"' is not assignable to type 'SeatTier')",
        "task": "تأمل مسار التحقق الحصري وكيف يستبعد الاتحاد الحصري (Union) أي قيم خارج القائمة المسموحة.",
        "benefit": "عرفت كيف تجعل خيارات الحالات في تطبيق السينما محكمة وخالية من الثغرات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الأسماء المستعارة والاتحاد (Type Aliases & Unions)",
        "explanation": "نستخدم الكلمة المفتاحية type متبوعة باسم النوع المخصص بحرف كبير (PascalCase) مثل SeatTier، ثم علامة = ونسرد الخيارات المسموحة مفصولة بالرمز | (الذي يعني 'أو'). يمكن استخدام الاتحاد مع النصوص الحرفية (Literal Types) مثل 'vip' | 'standard' أو مع الأنواع العامة مثل string | number لتمثيل معرف يقبل نصوصاً أو أرقاماً.",
        "flow": "كلمة type ⟶ اسم النوع SeatTier ⟶ علامة = ⟶ خيارات محددة بـ | ('standard' | 'vip' | 'suite') ⟶ نوع اتحادي حصري",
        "task": "لاحظ استخدام علامة = بعد كلمة type، والخط الرأسي | للفصل بين البدائل المسموحة.",
        "benefit": "أتقنت صياغة الأنواع المخصصة وعوامل الاتحاد لتأمين حالات التطبيق المختلفة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بتعريف فئات المقاعد المعتمدة في سينما خطوة. افتح ملف src/app/models/seat.model.ts واكتب تعريف النوع SeatTier ليقتصر على الفئات الثلاث: 'standard' و 'vip' و 'suite'.",
        "file": "src/app/models/seat.model.ts",
        "code": "export type SeatTier = 'standard' | 'vip' | 'suite';",
        "expected": "export type SeatTier = 'standard' | 'vip' | 'suite';",
        "task": "اكتب سطر تعريف SeatTier في أعلى ملف src/app/models/seat.model.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت أول نوع اتحادي صريح لحماية فئات مقاعد السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "عرّف متغيراً تجريبياً يختبر النوع أسفل السطر: export const currentSeatTier: SeatTier = 'vip'; ثم جرّب تغيير القيمة إلى 'premium' أو 'economy' ولاحظ الخطأ الفوري الذي يعترض به TypeScript لأن القيمة غير مدرجة في الاتحاد.",
        "task": "اختبر صرامة SeatTier بإسناد قيمة مخالفة وشاهد اعتراض المترجم الفوري، ثم أعدها إلى إحدى القيم الثلاث الصحيحة.",
        "benefit": "أدركت قوة التدقيق اللحظي في حماية نماذج البيانات من القيم غير المتوافقة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الذي يميز الـ Union Type مثل ('standard' | 'vip' | 'suite') عن استخدام النوع العام string؟",
        "options": [
          "يحصر القيم المقبولة حصرياً في هذه الخيارات الثلاثة فقط ويرفض أي نص آخر وقت الترجمة",
          "يجعل حجم الخط في المتصفح أكبر عند عرض كلمة vip",
          "يقوم بحجز التذكرة تلقائياً دون الرجوع للمستخدم"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! الـ Union Types تلغي احتمال الأخطاء الإملائية وتقيد البيانات بالخيارات المنطقية للتطبيق.",
        "task": "ما الذي يميز الـ Union Type مثل ('standard' | 'vip' | 'suite') عن استخدام النوع العام string؟"
      }
    ]
  },
  {
    "id": "ng-ts-05",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "كتابة الدوال بدقة بالغة (Typed Functions & Return Types)",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "التحكم التام في مدخلات ومخرجات الدوال عبر كتابة أنواع المعاملات بدقة، وتحديد نوع القيمة المعادة (Return Type)، وتوظيف المعاملات الافتراضية لمنع الأخطاء الحسابية في أسعار التذاكر.",
    "concept": "في JavaScript التقليدية، تقبل الدوال أي مدخلات وتُرجع أي مخرجات؛ فإذا مررت نصاً لدالة جمع، دمجت النصوص بدلاً من جمع الأرقام. يقضي TypeScript على هذه العشوائية بفرض كتابة نوع كل معامل صراحة بعد اسمه (مثل basePrice: number)، وتحديد نوع القيمة المعادة بعد قوسي الدالة (مثل : number). يمنحك هذا شبكة أمان تمنع نسيان كلمة return، وتمنع إرجاع نوع خاطئ، وتضمن أن استدعاء الدالة في مكونات سينما خطوة يتم دائماً بمدخلات ومخرجات سليمة 100%.",
    "flow": "معاملات محددة النوع (basePrice: number, discountPercent: number) ⟶ منطق حساب الخصم ⟶ ناتج رقمي مضمون (: number)",
    "task": "افتح الملف src/app/models/pricing.utils.ts وأضف دالة calculateFinalPrice التي تستقبل السعر الأساسي basePrice ونسبة الخصم discountPercent كأرقام وتعيد السعر النهائي الصافي بعد الخصم بنوع رقمي number صريح.",
    "file": "src/app/models/pricing.utils.ts",
    "code": "export function calculateFinalPrice(basePrice: number, discountPercent: number): number {\n  return basePrice - (basePrice * discountPercent / 100);\n}",
    "expected": "export function calculateFinalPrice(basePrice: number, discountPercent: number): number {",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/functions.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في تطبيقات حجز السينما، تتكرر العمليات الحسابية مثل خصم الكوبونات وحساب ضريبة القيمة المضافة. إذا قبلت الدالة أي نوع دون تدقيق، فقد تظهر للعميل أسعار كارثية مثل NaN أو '10020' بدلاً من 120 ر.س إذا مرر أحدهم نصاً بالخطأ! كتابة الأنواع الصريحة للمعاملات ونوع القيمة المعادة يحول الدالة إلى صندوق أسود مضمون النتائج يحمي منطق التسعير المالي للتطبيق.",
        "flow": "استدعاء calculateFinalPrice(100, 15) ⟶ فحص المعاملات (100: number, 15: number) ⟶ حساب الخصم ⟶ إرجاع 85 (: number)",
        "task": "تأمل مخطط التدفق ولاحظ كيف يعمل TypeScript على تدقيق المدخلات والمخرجات قبل السماح بتمرير البيانات لباقي أجزاء التطبيق.",
        "benefit": "فهمت كيف تحمي دوال TypeScript أمان المعاملات المالية وتمنع أخطاء تحويل الأنواع الخفية (Type Coercion)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح توقيع الدالة وأنواع الإرجاع (Function Signature)",
        "explanation": "يتكون توقيع الدالة الصارم في TypeScript من أربعة أجزاء رئيسية: 1) الكلمة export لإتاحة الدالة في كامل التطبيق، 2) اسم الدالة بأسلوب camelCase، 3) قائمة المعاملات بين القوسين مع نوع كل معامل بعد النقطتين مثل (basePrice: number, discountPercent: number)، 4) نوع القيمة المعادة بعد القوسين مباشرة مثل ): number { للإلزام بإرجاع رقم. وإذا كانت الدالة تنفذ أثراً دون إرجاع قيمة، نحدد نوعها كـ : void.",
        "flow": "اسم الدالة ⟶ نوع المعاملات (basePrice: number) ⟶ نوع الإرجاع (: number) ⟶ جسم الدالة مع إرجاع return متطابق",
        "task": "لاحظ موقع : number بعد قوسي المعاملات، ودوره في إلزام المطور بإرجاع ناتج رقمي حصراً.",
        "benefit": "أتقنت التركيب النحوي لتوقيع الدوال الصارمة وتحديد أنواع الإرجاع في TypeScript."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بإضافة دالة حساب السعر النهائي بعد الخصم calculateFinalPrice داخل ملف أدوات التسعير src/app/models/pricing.utils.ts. الدالة تستقبل basePrice و discountPercent كأرقام وتعيد القيمة الصافية بعد الخصم بنوع number.",
        "file": "src/app/models/pricing.utils.ts",
        "code": "export function calculateFinalPrice(basePrice: number, discountPercent: number): number {\n  return basePrice - (basePrice * discountPercent / 100);\n}",
        "expected": "export function calculateFinalPrice(basePrice: number, discountPercent: number): number {",
        "task": "أضف كود الدالة calculateFinalPrice في ملف src/app/models/pricing.utils.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت أول دالة تسعير محكمة الأنواع تضمن سلامة حسابات تذاكر سينما خطوة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب جعل نسبة الخصم ذات قيمة افتراضية عبر كتابة discountPercent: number = 0؛ لاحظ كيف يسمح لك TypeScript باستدعاء الدالة بمعامل واحد calculateFinalPrice(100) لتعيد 100 دون أي خطأ. ثم تفقد لوحة المعاينة الحية وشاهد كيف تعرّف المحرر على الدالة وتوقيعها.",
        "task": "أضف القيمة الافتراضية = 0 للمعامل discountPercent ولاحظ كيف يقبل المحرر هذا النمط المتقدم من الدوال.",
        "benefit": "تعلمت كيفية دمج المعاملات الافتراضية (Default Parameters) مع الأنواع الصارمة في دوال TypeScript."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة الجوهرية من تحديد نوع القيمة المعادة (: number) بعد قوسي معاملات الدالة في TypeScript؟",
        "options": [
          "إلزام الدالة بإرجاع نفس النوع والتنبيه فوراً إذا تم إرجاع قيمة مخالفة أو نسي المبرمج كتابة return",
          "تحويل أي ناتج نصي إلى رقم سحرياً دون فحص",
          "منع استدعاء الدالة أكثر من مرة واحدة في الصفحة"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! تحديد نوع الإرجاع يمنع السهو البرمجي ويضمن أن المتغيرات المستقبلة للناتج تحصل على بيانات صحيحة دائماً.",
        "task": "ما الفائدة الجوهرية من تحديد نوع القيمة المعادة (: number) بعد قوسي معاملات الدالة في TypeScript؟"
      }
    ]
  },
  {
    "id": "ng-ts-06",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "البرمجة كائنية التوجه (OOP): الأصناف ومحددات الوصول",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "بناء الأصناف (Classes) المنظمة لكائنات صالات السينما، والتحكم في إمكانية الوصول والتعديل عبر محددات public و private، وتوظيف اختصار معلمات المنشئ (Parameter Properties).",
    "concept": "البرمجة كائنية التوجه (OOP) في TypeScript تسمح بتجميع البيانات والوظائف داخل كبسولة موحدة تسمى الصنف (Class). كل مكون أو خدمة أو حارس في Angular هو في الأصل Class يُزخرف ببيانات وصفية. يمنحنا TypeScript ميزة تحديد محددات الوصول (Access Modifiers): public للحقول المتاحة للجميع، و private لحماية البيانات الحساسة (مثل سعة الصالة أو سر التشفير) من التعديل الخارجي العشوائي، و readonly لتجميد القيمة بعد الإنشاء. كما يقدم TypeScript اختصاراً رائعاً في المنشئ (Parameter Properties) يتيح تعريف الحقول وإسنادها في سطر واحد داخل constructor.",
    "flow": "صنف CinemaHall ⟶ تخصيص البيانات في المنشئ (public id, private totalSeats) ⟶ حماية السعة بـ private ⟶ إتاحة دوال الاستعلام الآمنة",
    "task": "افتح الملف src/app/models/hall.model.ts وعرّف الصنف CinemaHall بصيغة المنشئ المختصرة مع حقل id العام المحمي بـ readonly، واسم الصالة name، وحقل السعة totalSeats، وحقل isImax الخاص بـ private، مع دالة getSummary لإرجاع وصف الصالة.",
    "file": "src/app/models/hall.model.ts",
    "code": "export class CinemaHall {\n  constructor(\n    public readonly id: string,\n    public name: string,\n    public totalSeats: number = 60,\n    private isImax: boolean = false\n  ) {}\n\n  public getSummary(): string {\n    return `${this.name} (${this.totalSeats} مقعد) ${this.isImax ? '- IMAX' : ''}`;\n  }\n}",
    "expected": "export class CinemaHall {",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في تطبيقات السينما، لا تقتصر الصالة على مجرد بيانات مجردة، بل تملك سلوكاً وقواعد عمل (مثل حساب السعة المتاحة أو التحقق من نوع الشاشة). يسمح لنا الصنف (Class) بجمع خصائص الصالة وسلوكها في كبسولة برمجية متماسكة. وباستخدام private نمنع أي مبرمج خارج الصنف من تغيير سعة الصالة أو العبث بخصائصها الداخلية دون المرور عبر دوال الصنف المعتمدة، وهو جوهر مبدأ التغليف (Encapsulation).",
        "flow": "إنشاء new CinemaHall('H1', 'قاعة النجوم', 60, true) ⟶ وصول مسموح لـ hall.name ⟶ حظر تعديل hall.isImax ❌ (خاص بـ private) ⟶ قراءة الوصف بـ hall.getSummary()",
        "task": "تأمل مخطط التدفق ولاحظ كيف يحمي محدد الوصول private الحالة الداخلية للصنف من التعديل الخارجي.",
        "benefit": "فهمت مبدأ التغليف (Encapsulation) ودوره الأساسي في معمارية مكونات وخدمات Angular."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الأصناف ومحددات الوصول ومعلمات المنشئ (Parameter Properties)",
        "explanation": "بدلاً من كتابة الخاصية أولاً ثم إسنادها يدوياً داخل المنشئ (this.name = name)، يوفر TypeScript اختصاراً مذهلاً: بمجرد وضع محدد الوصول (public أو private أو readonly) قبل المعامل في المنشئ constructor(...)، يقوم TypeScript تلقائياً بتعريف الخاصية وتعيين قيمتها في خطوة واحدة! كلمة public تجعل الحقل مقروءاً ومعدلاً من الخارج، و private تحصره داخل الصنف فقط، و readonly تمنع إعادة تعيينه بعد لحظة الإنشاء.",
        "flow": "معلمات المنشئ constructor() ⟶ محدد الوصول (public / private / readonly) ⟶ تعريف الخاصية وتعيينها تلقائياً ⟶ دمج في خطوة واحدة",
        "task": "قارن بين كتابة public readonly id التي تسمح بالقراءة وتمنع التعديل، وبين private isImax التي تخفي الخاصية تماماً عن خارج الصنف.",
        "benefit": "أتقنت اختصار معلمات المنشئ (Parameter Properties) الاحترافي المعتمد في كل خدمات ومكونات Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بصياغة صنف صالات العرض CinemaHall داخل ملف src/app/models/hall.model.ts. الصنف يعرف id العام للقراءة فقط، واسم الصالة name، وسعة المقاعد الافتراضية 60، وخاصية شاشة IMAX المغلقة بـ private، مع دالة عامة getSummary تعرض ملخص الصالة.",
        "file": "src/app/models/hall.model.ts",
        "code": "export class CinemaHall {\n  constructor(\n    public readonly id: string,\n    public name: string,\n    public totalSeats: number = 60,\n    private isImax: boolean = false\n  ) {}\n\n  public getSummary(): string {\n    return `${this.name} (${this.totalSeats} مقعد) ${this.isImax ? '- IMAX' : ''}`;\n  }\n}",
        "expected": "export class CinemaHall {",
        "task": "اكتب تعريف الصنف CinemaHall بكامل محددات وصوله ودالة getSummary في ملف src/app/models/hall.model.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت صنف صالة السينما بتغليف احترافي ومحددات وصول صارمة وفق معايير TypeScript المتقدمة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إنشاء كائن تجريبي أسفل الصنف: export const vipHall = new CinemaHall('H1', 'الصالة الملكية', 40, true); ثم جرّب كتابة vipHall.isImax في سطر جديد؛ لاحظ كيف يعترض TypeScript فوراً ويظهر تنبيهاً صريحاً: Property 'isImax' is private and only accessible within class 'CinemaHall'. بينما استدعاء vipHall.getSummary() يعمل بكل سلاسة.",
        "task": "أنشئ كائن vipHall وجرّب استدعاء دالة vipHall.getSummary() ولاحظ كيف يمنع المترجم الوصول المباشر للحقل private.",
        "benefit": "أيقنت دور الحماية البرمجية التي يوفرها محدد الوصول private في عزل تفاصيل البناء الداخلي."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "أي من محددات الوصول التالية يمنع قراءة المتغير أو تعديله مباشرة من خارج حدود الصنف (Class)؟",
        "options": [
          "محدد الوصول private",
          "محدد الوصول public",
          "الكلمة المفتاحية export"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة ومثالية! محدد private يضمن التغليف التام للبيانات الحساسة ويمنع الوصول الخارجي غير المصرح به.",
        "task": "أي من محددات الوصول التالية يمنع قراءة المتغير أو تعديله مباشرة من خارج حدود الصنف (Class)؟"
      }
    ]
  },
  {
    "id": "ng-ts-07",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "القوالب العامة المتقدمة (Generics <T>)",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "صياغة القوالب العامة (Generics <T>) لبناء واجهات ودوال قابلة لإعادة الاستخدام مع مختلف أنواع البيانات (كأفلام ومقاعد وحجوزات) مع الاحتفاظ بالأمان النوعي الصارم (Type Safety).",
    "concept": "في تطبيقات الويب الحديثة، ترد استجابات الخوادم (HTTP Responses) بهيكل موحد يضم حقولاً مثل: success و timestamp وحقل data الذي يحمل البيانات الفعلية. قد تكون البيانات قائمة أفلام Movie[] تارة، أو تفاصيل مقعد Seat تارة أخرى، أو كائن حجز Booking. بدون Generics، سنضطر لاستخدام any (مما يفقدنا كافة فوائد TypeScript) أو إعادة كتابة واجهة مكررة لكل نوع! يحل مفهوم Generics <T> هذه المشكلة جذرياً عبر معامل النوع المتغير T؛ حيث نصمم واجهة ApiResponse<T> كقالب عام يتشكل بنوع البيانات الممرر له مع توفير أمان نوعي كامل وإكمال تلقائي 100%.",
    "flow": "واجهة عامة ApiResponse<T> ⟶ استبدال T بـ Movie[] ⟶ كائن استجابة يضمن أن data مصفوفة أفلام نقية دون any",
    "task": "افتح الملف src/app/models/api-response.model.ts وعرّف واجهة الاستجابة العامة interface ApiResponse<T> التي تقبل معامل النوع T وتحتوي على success منطقي، و data من النوع T، و message اختياري، و timestamp رقمي.",
    "file": "src/app/models/api-response.model.ts",
    "code": "export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  message?: string;\n  timestamp: number;\n}",
    "expected": "export interface ApiResponse<T> {",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "تخيل أن تطبيق السينما يتواصل مع خادم خلفي لجلب قائمة الأفلام، وجلب تفاصيل مقعد، وجلب بيانات المستخدم المسجل. جميع ردود الخادم تأتي في غلاف موحد: { success: true, timestamp: 1730784000, data: ... }. إذا استخدمنا any لحقل data، فقدنا كل فحص الأنواع والإكمال التلقائي! يتيح لنا الـ Generic <T> تمرير 'نوع البيانات' كمعامل تماماً كما نمرر القيم للدوال، مما يجعل الغلاف عاماً وقابلاً لإعادة الاستخدام مع أي كيان بأمان تام.",
        "flow": "ApiResponse<T> ⟶ تمرير Movie[] كـ T ⟶ الحصول على ApiResponse<Movie[]> حيث response.data.map(...) مدعومة بالإكمال التلقائي التام",
        "task": "تأمل مخطط التدفق ولاحظ كيف يتحول الحرف T إلى النوع الفعلي الممرر (مثل Movie أو Seat) دون أي فقدان للأمان النوعي.",
        "benefit": "استوعبت كيف تقضي Generics على التكرار وتمنحك كوداً مرناً وقابلاً للتوسع دون التضحية بفحص الأنواع."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح معامل النوع العام (Type Parameter <T>)",
        "explanation": "يُكتب معامل النوع بين قوسين زاويين <T> بعد اسم الواجهة مباشرة (الحرف T هو اختصار لـ Type كعرف شائع). داخل جسم الواجهة، يُعامل T كنوع بيانات مكتمل؛ فيكتب data: T. وعند استهلاك الواجهة في خدمات Angular (مثل HttpClient)، نستبدل T بالنوع الحقيقي: مثل ApiResponse<Movie> لفيلم واحد، أو ApiResponse<Movie[]> لقائمة أفلام، أو ApiResponse<string> لرسالة تأكيد نصية.",
        "flow": "تعريف الواجهة ApiResponse<T> ⟶ تحديد حقل data: T ⟶ استقبال الاستجابة وتمرير النوع الحقيقي ⟶ استهلاك البيانات بأمان تام",
        "task": "لاحظ موقع <T> بعد اسم ApiResponse، وكيف تُستخدم T لتحديد نوع حقل data بحرية ومرونة.",
        "benefit": "أتقنت البنية التشريحية للقوالب العامة وطريقة توظيفها في نمذجة استجابات الشبكة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بصياغة واجهة الاستجابة العامة ApiResponse<T> في ملف نماذج الاستجابة src/app/models/api-response.model.ts لتكون الغلاف الموحد لكل طلبات الـ HTTP في مشروع سينما خطوة.",
        "file": "src/app/models/api-response.model.ts",
        "code": "export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  message?: string;\n  timestamp: number;\n}",
        "expected": "export interface ApiResponse<T> {",
        "task": "اكتب واجهة ApiResponse<T> بكامل خصائصها في ملف src/app/models/api-response.model.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت أول واجهة عامة Generic مرنة ستعتمد عليها كافة خدمات الاتصال بالخادم في التطبيق."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تعريف نوع مخصص لاستجابة قائمة الأفلام أسفل الواجهة: export type MoviesResponse = ApiResponse<string[]>; ثم عرّف ثابتاً تجريبياً يطابقه: export const demoResponse: MoviesResponse = { success: true, timestamp: Date.now(), data: ['رحلة النجوم', 'واحة الأمل'] }; ولاحظ كيف يضمن TypeScript أن تكون data مصفوفة نصوص حصراً!",
        "task": "عرّف نوع استجابة الأفلام MoviesResponse واختبر تخصيص T بمصفوفة نصوص ولاحظ قوة الإكمال التلقائي.",
        "benefit": "أدركت قوة دمج الـ Generics مع Type Aliases لإنشاء نماذج استجابة شبكية متخصصة وفائقة الوضوح."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة الأساسية من استخدام القوالب العامة Generics <T> بدلاً من استخدام نوع any لبيانات استجابة الخادم؟",
        "options": [
          "الحفاظ على الأمان النوعي الصارم والإكمال التلقائي الذكي لكل نوع دون تكرار كتابة الواجهات",
          "تسريع سرعة تحميل خادم قاعدة البيانات",
          "تشفير استجابة الخادم بحيث لا تظهر في لوحة أدوات المطور (DevTools)"
        ],
        "correct": 0,
        "benefit": "إجابة عبقرية! الـ Generics توفر أقصى مرونة ممكنة مع أقصى أمان نوعي، متجنبة مخاطر وفوضى any.",
        "task": "ما الفائدة الأساسية من استخدام القوالب العامة Generics <T> بدلاً من استخدام نوع any لبيانات استجابة الخادم؟"
      }
    ]
  },
  {
    "id": "ng-ts-08",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "التعدادات (Enums) وإدارة الحالات الثابتة للسينما",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "تعلم كيفية استخدام التعدادات (Enums) في TypeScript لإدارة وتوحيد حالات حجز التذاكر ومقاعد السينما بثبات ومنع أخطاء السلاسل النصية العشوائية (Magic Strings).",
    "concept": "الـ Enum (التعداد) هو بنية بيانات خاصة في TypeScript تتيح تجميع مجموعة من الثوابت المترابطة بأسماء واضحة ومقروءة. في تطبيقات حجز التذاكر والسينما، بدلاً من استخدام نصوص حرة وعرضة للأخطاء الإملائية مثل 'confirmed' أو 'Pending' أو 'canceled'، نستخدم enum BookingStatus ليصبح كود التطبيق آمناً، واضح المعالم، وسهل الصيانة.",
    "flow": "تعريف enum BookingStatus ⟶ اختيار الحالة بحصانة نوعية ⟶ منع السلاسل النصية العشوائية (Magic Strings) ⟶ تتبع تدفق الحجز بدقة",
    "task": "افتح ملف src/app/models/booking.model.ts وعرّف التعداد BookingStatus بحالات الحجز الثلاث: PENDING و CONFIRMED و CANCELLED.",
    "file": "src/app/models/booking.model.ts",
    "code": "export enum BookingStatus {\n  PENDING = 'PENDING',\n  CONFIRMED = 'CONFIRMED',\n  CANCELLED = 'CANCELLED'\n}",
    "expected": "export enum BookingStatus {",
    "reference": "https://www.typescriptlang.org/docs/handbook/enums.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في التطبيقات الحقيقية مثل حجز السينما، يمر حجز التذكرة بعدة مراحل: معلق (PENDING)، مؤكد (CONFIRMED)، أو ملغى (CANCELLED). كتابة هذه الحالات كنصوص عادية (Strings) في كود المشروع يعرضك لأخطاء كارثية بسبب حرف إملائي خاطئ مثل 'Confrimed'. ميزة التعداد (Enum) في TypeScript تجمع هذه الحالات كقيم ثابتة ومعرّفة هندسياً تمنع الأخطاء وتجعل محرر الكود يرشدك تلقائياً أثناء الكتابة.",
        "flow": "حالة الحجز الخام ⟶ تنظيمها داخل enum BookingStatus ⟶ استخدام BookingStatus.CONFIRMED ⟶ مناعة كاملة ضد أخطاء الكتابة",
        "task": "لاحظ كيف يحول Enum الحالات المتناثرة إلى قائمة خيارات موحدة ومحمية نوعياً.",
        "benefit": "فهمت أهمية Enums في توحيد حالات النظام وحماية المشروع من النصوص السحرية (Magic Strings)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة التعداد (Enum Syntax)",
        "explanation": "يبدأ التعريف بالكلمة المفتاحية export enum متبوعة باسم التعداد بصيغة PascalCase (مثل BookingStatus). بين القوسين المعقوفين نحدد المفاتيح وقيمها؛ ونفضل في Angular استخدام String Enums (مثل PENDING = 'PENDING') لأنها تكون واضحة ومفهومة عند فحص البيانات في أدوات المطورين وسجلات الخادم.",
        "flow": "export enum [اسم التعداد] { [المفتاح] = [القيمة النصية], ... } ⟶ استدعاؤه كـ BookingStatus.PENDING",
        "task": "تفحص هيكل الكود ولاحظ الفواصل بين الحالات واستخدام القيم النصية الصريحة.",
        "benefit": "أتقنت تشريح String Enums وأدركت سبب تفضيلها في معمارية تطبيقات الويب."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بتعريف حالات الحجز الرسمية للسينما داخل ملف الموديلات src/app/models/booking.model.ts باستخدام enum BookingStatus.",
        "file": "src/app/models/booking.model.ts",
        "code": "export enum BookingStatus {\n  PENDING = 'PENDING',\n  CONFIRMED = 'CONFIRMED',\n  CANCELLED = 'CANCELLED'\n}",
        "expected": "export enum BookingStatus {",
        "task": "اكتب تعريف التعداد BookingStatus داخل ملف src/app/models/booking.model.ts ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت أول Enum لحالات الحجز بيدك وجهزت أساساً ثابتاً لمنطق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة حالة رابعة لخدمة السينما الفاخرة مثل REFUNDED = 'REFUNDED' (مسترجع المبلغ)، وشاهد كيف تظهر الحالة الجديدة فوراً في جدول محاكي TypeScript!",
        "task": "أضف حالة REFUNDED = 'REFUNDED' للتعداد ولاحظ كيف يستوعب المحاكي الحالة الجديدة.",
        "benefit": "اختبرت مرونة إضافة حالات عمل جديدة إلى Enum دون كسر باقي مكونات النظام."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "لماذا نفضل استخدام String Enum لحالات الحجز بدلاً من كتابة نصوص عادية (Strings) في كود Angular؟",
        "options": [
          "لتوحيد مسميات الحالات ومنع الأخطاء الإملائية وتسهيل قراءة الحالة أثناء فحص الشبكة وسجلات الخادم",
          "لأن TypeScript يمنع استخدام النصوص تماماً في المتصفحات الحديثة",
          "لتسريع سرعة معالج بطاقة الرسوميات (GPU) في جهاز العميل"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة! الـ Enums تضمن دقة منطق الأعمال وتزيل خطر الأخطاء الإملائية القاتلة.",
        "task": "لماذا نفضل استخدام String Enum لحالات الحجز بدلاً من كتابة نصوص عادية (Strings) في كود Angular؟"
      }
    ]
  },
  {
    "id": "ng-ts-09",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "مدخل إلى الزخارف (Decorators) ومفهوم Metadata في Angular",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "استكشاف آلية عمل الزخارف (Decorators) وكيف تضيف البيانات الوصفية (Metadata) إلى الأصناف والدوال، لفهم ما يحدث خلف كواليس زخارف Angular مثل @Component و @Injectable.",
    "concept": "الزخرف (Decorator) هو دالة خاصة تبدأ بعلامة @ وتُطبَّق على الأصناف (Classes) أو الدوال أو الخصائص لتعديل سلوكها أو إرفاق بيانات وصفية (Metadata) إضافية بها دون تعديل الكود الداخلي للصنف. في Angular، الزخارف مثل @Component و @Injectable هي سر عمل الإطار؛ فهي تخبر Angular أن كلاس معين ليس مجرد صنف عادي بل هو مكون واجهة يملك قالباً ورابطاً ومحدداً.",
    "flow": "صنف TypeScript عادي ⟶ تطبيق زخرف دالي @LogComponent ⟶ حقن بيانات وصفية (Metadata) ⟶ تعرف النظام على طبيعة ودور الصنف",
    "task": "افتح ملف src/app/models/metadata.demo.ts واكتب دالة الزخرف LogComponent التي تسجل اسم المكون عند تعريفه.",
    "file": "src/app/models/metadata.demo.ts",
    "code": "export function LogComponent(target: Function) {\n  console.log(`[Component Registered]: ${target.name}`);\n}",
    "expected": "export function LogComponent(target: Function) {",
    "reference": "https://www.typescriptlang.org/docs/handbook/decorators.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "عندما ترى في كود Angular سطراً مثل @Component(...)، هل تساءلت كيف يعرف Angular أن هذا الكلاس يمثل واجهة مستخدم؟ الزخارف (Decorators) في TypeScript هي ببساطة دوال تطبق على الكلاس لتقوم بقراءته وإضافة بيانات توضيحية (Metadata) له. فكرة الزخرف تشبه وضع ملصق مواصفات على طرد بريدي؛ فالصندوق يظل كما هو، لكن الملصق يخبر شركة الشحن بكيفية التعامل معه.",
        "flow": "كلاس CinemaCard ⟶ إضافة زخرف @LogComponent ⟶ استدعاء دالة الزخرف وتمرير الكلاس ⟶ تسجيل وتسليط الضوء على خصائص الكلاس",
        "task": "تأمل كيف تجعل الزخارف كود الصنف نظيفاً تماماً بينما تتولى وظيفة الرقابة والتسجيل خارجياً.",
        "benefit": "استوعبت المفهوم الفلسفي والهندسي للزخارف (Decorators) كدوال مغلفة للبيانات الوصفية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة الزخرف (Decorator Anatomy)",
        "explanation": "الزخرف الخاص بالأصناف هو دالة تأخذ معاملاً واحداً يمثل الكلاس المستهدف (target: Function). داخل الدالة، يمكننا قراءة اسم الكلاس عبر target.name، أو إضافة خصائص إلى نموذجه الأولي (prototype)، أو تسجيله في سجل مركزي لمكونات النظام.",
        "flow": "function LogComponent(target: Function) { /* قراءة target.name أو تزويده ببيانات */ } ⟶ @LogComponent class MovieComponent {}",
        "task": "لاحظ نوع المعامل target: Function وكيف يمثل الصنف البرمجي ذاته قبل إنشاء أي كائن منه.",
        "benefit": "أتقنت التركيب النحوي لدوال الزخارف وفهمت معامل target البرمجي."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنبني دالة زخرف أولية باسم LogComponent داخل ملف src/app/models/metadata.demo.ts تسجل في الكونسول اسم أي مكون يُطبّق عليه الزخرف.",
        "file": "src/app/models/metadata.demo.ts",
        "code": "export function LogComponent(target: Function) {\n  console.log(`[Component Registered]: ${target.name}`);\n}",
        "expected": "export function LogComponent(target: Function) {",
        "task": "اكتب دالة الزخرف LogComponent في ملف src/app/models/metadata.demo.ts ثم اضغط (شغّل وافحص).",
        "benefit": "بنيت أول Decorator بيدك وفككت لغز الزخارف التي يعتمد عليها Angular."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تعديل رسالة التسجيل لتصبح '[Angular Component Loaded]:' بدلاً من '[Component Registered]:'، وافحص مخرجات الكونسول في محاكي TypeScript لمشاهدة التغير فوراً!",
        "task": "غيّر بادئة رسالة الكونسول إلى [Angular Component Loaded]: وشاهد التحديث في لوحة المحاكي.",
        "benefit": "اختبرت كيفية التحكم في مخرجات وسلوك الزخارف وتأثيرها على دورة حياة التطبيق."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو الدور الحقيقي للزخارف (Decorators) مثل @Component و @Injectable في Angular؟",
        "options": [
          "تزويد الكلاس ببيانات وصفية (Metadata) تمكن إطار العمل من معرفة كيفية تصييره وحقن تبعياته",
          "تحويل كود TypeScript إلى لغة C++ لتشغيلها على بطاقات الشاشة",
          "ضغط صور ومقاطع فيديو تطبيق السينما قبل عرضها"
        ],
        "correct": 0,
        "benefit": "ممتاز! الزخارف تزود محرك Angular بالبيانات الوصفية (Metadata) اللازمة لتشغيل المكونات والخدمات.",
        "task": "ما هو الدور الحقيقي للزخارف (Decorators) مثل @Component و @Injectable في Angular؟"
      }
    ]
  },
  {
    "id": "ng-ts-10",
    "module": "phase-1-typescript",
    "phase": "المرحلة الأولى: تأسيس واحتراف TypeScript من الصفر",
    "title": "الأمان التام ضد القيم المعدومة (Null Safety & Operators)",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "إتقان الحماية من أخطاء انهيار التطبيق الشائعة (Cannot read properties of undefined) باستخدام عاملي Optional Chaining (?.) و Nullish Coalescing (??) في منطق حجز السينما.",
    "concept": "أشهر خطأ برمجي يواجه مطوري الويب هو الانهيار عند محاولة قراءة خاصية من كائن غير موجود (TypeError: Cannot read properties of undefined). يقدم TypeScript حلاً جذرياً مزدوجاً: معامل السلسلة الاختيارية (?.) الذي يتوقف بسلام إذا كانت القيمة معدومة دون إطلاق خطأ، ومعامل الدمج العدمي (??) الذي يوفر قيمة بديلة افتراضية آمنة عندما تكون القيمة null أو undefined حصراً.",
    "flow": "استقبال كائن بيانات الزائر ⟶ فحص المسار بأمان عبر customer?.phone ⟶ توفير بديل افتراضي عبر ?? 'غير متوفر' ⟶ واجهة مستقرة تماماً دون انهيار",
    "task": "افتح ملف src/app/models/booking.model.ts واكتب الدالة getCustomerPhone التي تستخدم ?. و ?? لقراءة هاتف العميل بأمان تام.",
    "file": "src/app/models/booking.model.ts",
    "code": "export function getCustomerPhone(customer?: { phone?: string }): string {\n  return customer?.phone ?? 'غير متوفر';\n}",
    "expected": "export function getCustomerPhone(customer?: { phone?: string }): string {",
    "reference": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في منصات حجز السينما، قد يقوم زائر سريع بالحجز كضيف دون ملء كافة بياناته الشخصية (مثل رقم الهاتف). إذا حاولت الشاشة الوصول إلى customer.phone وكان customer غير معرف، ستتحول شاشة التطبيق إلى شاشة بيضاء وينهار النظام! باستخدام الأمان العدمي في TypeScript، نجمع بين معامل التمحيص الآمن (?.) ومعامل البديل الذكي (??) لضمان بقاء التطبيق حياً وثابتاً مهما كانت بيانات المدخلات ناقصة.",
        "flow": "بيانات العميل (قد تكون فارغة) ⟶ فحص customer?.phone ⟶ قيمة الهاتف موجودة؟ اعرضها | معدومة؟ ⟶ تقديم البديل 'غير متوفر' بـ ??",
        "task": "لاحظ كيف يتعاون المعاملان ?. و ?? لحماية التطبيق من الانهيار وتوفير قيمة افتراضية متناسقة.",
        "benefit": "فهمت كيف تحمي تطبيقاتك من الخطأ الكلاسيكي الأكثر شيوعاً في JavaScript وهو قراءة خصائص undefined."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح عاملي الأمان (?.) و (??)",
        "explanation": "معامل التمحيص الاختياري (?.) يفحص ما قبله؛ فإذا كان null أو undefined يتوقف فوراً ويعيد undefined دون استكمال المسار ودون إطلاق استثناء. ثم يأتي دور معامل الدمج العدمي (??) ليعوض تلك القيمة المعدومة بقيمة نصية افتراضية واضحة، مع ميزة تفوقه على (||) بأنه لا يستبدل القيم المشروعة مثل 0 أو النص الفارغ '' أو false.",
        "flow": "customer?.phone (فحص مسار آمن) ⟶ في حال العدم ⟶ ?? 'غير متوفر' (بديل افتراضي فوري)",
        "task": "تفحص موضع علامة الاستعلام والنقطة ?. وموضع علامتي الاستعلام ?? في سطر العودة return.",
        "benefit": "أتقنت الفرق الجوهري والعملي بين معامل ?? ومعامل || الكلاسيكي."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنكتب دالة مساعدة متينة باسم getCustomerPhone داخل ملف src/app/models/booking.model.ts لاستخراج هاتف العميل بأمان كامل وتوفير بديل نصي للمستخدمين غير المسجلين.",
        "file": "src/app/models/booking.model.ts",
        "code": "export function getCustomerPhone(customer?: { phone?: string }): string {\n  return customer?.phone ?? 'غير متوفر';\n}",
        "expected": "export function getCustomerPhone(customer?: { phone?: string }): string {",
        "task": "اكتب دالة getCustomerPhone في ملف src/app/models/booking.model.ts ثم اضغط (شغّل وافحص).",
        "benefit": "بنيت دالة محصنة نوعياً ضد الانهيار وطبقت أهم أدوات الأمان العدمي في TypeScript."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تغيير النص الافتراضي البديل من 'غير متوفر' إلى 'هاتف غير مسجل' أو '+966-000000000'، ولاحظ كيف يتحدث المحاكي ويبقى الكود آمناً وصالحاً للعمل.",
        "task": "عدّل النص الافتراضي بعد معامل ?? وتأكد من استمرار عمل الدالة بسلاسة.",
        "benefit": "أيقنت سهولة تخصيص القيم الافتراضية للعملاء مع المحافظة التامة على استقرار النظام."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا تعيد العبارة (customer?.phone ?? 'غير متوفر') إذا كانت قيمة customer تساوي undefined؟",
        "options": [
          "تعيد النص الافتراضي 'غير متوفر' بسلام ودون إطلاق أي خطأ في الصفحة",
          "تطلق استثناء قاتلاً يوقف تنفيذ المتصفح بالكامل",
          "تعيد قيمة NaN الرقمية"
        ],
        "correct": 0,
        "benefit": "أحسنت! المعامل ?. يمنع الخطأ ويتوقف بهدوء، بينما يوفر المعامل ?? البديل الجاهز.",
        "task": "ماذا تعيد العبارة (customer?.phone ?? 'غير متوفر') إذا كانت قيمة customer تساوي undefined؟"
      }
    ]
  },
  {
    "id": "ng-classic-01",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "المعمارية الكلاسيكية وتشريح الـ NgModule",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "فهم المعمارية الكلاسيكية لتطبيقات Angular المبنية على الـ NgModule؛ استكشاف الأركان الأربعة للوحدة (declarations, imports, providers, bootstrap)، ولماذا لا غنى عن إتقانها لصيانة الأنظمة المؤسسية الضخمة في سوق العمل.",
    "concept": "قبل ظهور الإصدارات الحديثة ذات المكونات المستقلة (Standalone Components)، كانت كل ميزة وشاشة في Angular تدور حول مفهوم 'الوحدة النمطية' (NgModule). الوحدة النمطية هي كلاس مزخرف بـ @NgModule يعمل كحاوية تنظيمية تجمع المكونات والتوجيهات والمنقيات المترابطة معاً. تتكون الوحدة من أربعة أركان أساسية: 1) declarations لتسجيل المكونات التابعة للوحدة، 2) imports لجلب وحدات خارجية كـ CommonModule، 3) providers لتسجيل الخدمات وحقن التبعيات، 4) bootstrap لتحديد المكون الجذري الذي ينطلق منه التطبيق. ورغم حداثة الأنظمة الحالية، فإن 80% من مشاريع الشركات والبنوك القائمة مبنية بالكامل على NgModules، مما يجعل فهمها شرطاً أساسياً لاجتياز المقابلات والعمل في السوق.",
    "flow": "متصفح العميل ⟶ bootstrapModule(AppClassicModule) ⟶ فحص declarations & imports ⟶ تحميل المكون الجذري (App) ⟶ إقلاع نظام السينما",
    "task": "افتح الملف src/app/classic/app-classic.module.ts وقم بتعريف وتصدير وحدة AppClassicModule مع تسجيل CommonModule في مصفوفة imports.",
    "file": "src/app/classic/app-classic.module.ts",
    "code": "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@NgModule({\n  declarations: [],\n  imports: [CommonModule],\n  providers: [],\n  bootstrap: []\n})\nexport class AppClassicModule {}",
    "expected": "export class AppClassicModule {}",
    "reference": "https://angular.dev/guide/ngmodules",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "تخيل تطبيق سينما ضخم يضم مئات الشاشات: شاشات الحجز، إدارة التذاكر، الدفع الإلكتروني، وتقارير الإيرادات. في معمارية Angular الكلاسيكية، لا يمكن للمكونات أن تعيش منفردة في الهواء الطلق؛ بل يجب أن تنتمي لوحدة تنظيمية (NgModule) تجمع كل العناصر التي تحتاجها الشاشة وتعلن عن المكونات المسموح لها بالظهور معاً. تعمل الـ NgModule كصندوق متكامل يحدد ما يملكه الصندوق (declarations)، وما يستعيره من الصناديق الأخرى (imports)، وما يوفره من خدمات للجميع (providers).",
        "flow": "المشروع الكلاسيكي ⟶ حاوية @NgModule ⟶ [declarations: مكونات الشاشة] + [imports: وحدات الدعم كـ CommonModule] ⟶ بناء شجرة الواجهة",
        "task": "تأمل كيف تجمع وحدة NgModule أجزاء التطبيق الكلاسيكي في وحدة عمل متماسكة ومنظمة قبل إقلاع التطبيق.",
        "benefit": "استوعبت دور NgModule كعمود فقري لتنظيم وتجميع الأكواد في معظم مشاريع Angular بسوق العمل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الأركان الأربعة للـ NgModule",
        "explanation": "يتم تعريف الوحدة باستخدام الزخرف @NgModule المستورد من '@angular/core' فوق كلاس فارغ يتم تصديره. يحتوي الزخرف على 4 مصفوفات حاسمة:\n1) declarations: تُسجل فيها المكونات (Components) والتوجيهات (Directives) والمنقيات (Pipes) التي تنتمي لهذه الوحدة فقط.\n2) imports: تُوضع فيها الوحدات الأخرى التي يحتاجها هذا الموديول (مثل CommonModule لتفعيل الأوامر الأساسية).\n3) providers: تُعرّف الخدمات (Services) التي تتاح للحقن في هذه الوحدة.\n4) bootstrap: في الوحدة الجذرية فقط (Root Module)، تحدد المكون الرئيسي الذي ينطلق في الصفحة (مثل AppComponent).",
        "flow": "@NgModule({ declarations: [...], imports: [...], providers: [...], bootstrap: [...] }) ⟶ export class AppClassicModule {}",
        "task": "دقق في خصائص كائن البيانات الوصفية (Metadata) داخل @NgModule ولاحظ دور كل مصفوفة في إدارة عناصر التطبيق.",
        "benefit": "أتقنت تشريح الأركان الأربعة للوحدة الكلاسيكية وفهمت وظيفة كل مصفوفة بدقة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بإنشاء أول وحدة كلاسيكية لتطبيق السينما باسم AppClassicModule داخل ملف src/app/classic/app-classic.module.ts مع استيراد CommonModule وتهيئة المصفوفات الأربع الأساسية.",
        "file": "src/app/classic/app-classic.module.ts",
        "code": "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@NgModule({\n  declarations: [],\n  imports: [CommonModule],\n  providers: [],\n  bootstrap: []\n})\nexport class AppClassicModule {}",
        "expected": "export class AppClassicModule {}",
        "task": "اكتب تعريف الوحدة AppClassicModule بكافة مصفوفاتها الأربع في ملف src/app/classic/app-classic.module.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت أول وحدة كلاسيكية بيدك وطبقت المعمارية الرسمية للـ NgModule بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "في الأنظمة الواقعية، عندما ترغب في مشاركة مكونات هذه الوحدة مع وحدات أخرى، نضيف مصفوفة خامسة باسم exports: []. جرّب إضافة خاصية exports: [] داخل كائن @NgModule لتتعرف على كيفية تجهيز الوحدات لإعادة الاستخدام.",
        "task": "أضف exports: [] أسفل bootstrap: [] داخل كائن @NgModule وتأكد من سلامة الصياغة النحوية للكود.",
        "benefit": "تعرفت على مصفوفة exports ودورها في تصدير المكونات المشتركة بين الوحدات المتعددة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "أين يجب تسجيل المكون الكلاسيكي (Component) حتى يتعرف عليه قالب Angular ويتمكن من عرضه؟",
        "options": [
          "في مصفوفة declarations داخل الـ NgModule التابع لها المكون",
          "في مصفوفة providers الخاصة بالخدمات فقط",
          "داخل ملف package.json بجانب التبعيات الخارجية"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! مصفوفة declarations هي المكان الوحيد الذي يُعلن فيه المكون الكلاسيكي ليتعرف عليه مترجم Angular.",
        "task": "أين يجب تسجيل المكون الكلاسيكي (Component) حتى يتعرف عليه قالب Angular ويتمكن من عرضه؟"
      }
    ]
  },
  {
    "id": "ng-classic-02",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "تشريح المكون الكلاسيكي وتوصيله بالوحدة",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "بناء المكون الكلاسيكي بدون standalone: true، وفهم كيفية توصيله بمصفوفة declarations في الوحدة النمطية، مع استخدام المحدد selector: 'app-movie-card-classic' لعرض بطاقة الفيلم.",
    "concept": "في المعمارية الكلاسيكية، المكون (Component) ليس كائناً مستقلاً؛ فهو لا يحتوي على خاصية standalone: true. هذا يعني أن المكون عاجز تماماً عن العمل بمفرده، وإذا حاولت استخدامه في الصفحة دون تسجيله في مصفوفة declarations الخاصة بـ NgModule فسيطلق Angular الخطأ الشهير: 'app-movie-card-classic is not a known element'. يتكون المكون الكلاسيكي من الزخرف @Component مع محدد selector (مثل 'app-movie-card-classic')، ومسار القالب templateUrl، ومسار التنسيق styleUrl، وكلاس TypeScript يحتوي على خصائص بيانات الفيلم كالعنوان والتصنيف والتقييم وسعر التذكرة.",
    "flow": "كلاس MovieCardClassicComponent ⟶ ربطه بـ declarations في AppClassicModule ⟶ استخدام وسم <app-movie-card-classic> ⟶ يظهر كرت الفيلم في الصفحة بنجاح",
    "task": "افتح الملف src/app/classic/movie-card-classic.component.ts وقم بتعريف كلاس MovieCardClassicComponent مع خصائص الفيلم وحالة نفاذ التذاكر isSoldOut.",
    "file": "src/app/classic/movie-card-classic.component.ts",
    "code": "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card-classic',\n  templateUrl: './movie-card-classic.component.html',\n  styleUrl: './movie-card-classic.component.css'\n})\nexport class MovieCardClassicComponent {\n  movieTitle: string = 'رحلة النجوم';\n  genre: string = 'خيال علمي';\n  rating: number = 4.8;\n  isSoldOut: boolean = false;\n}",
    "expected": "export class MovieCardClassicComponent {",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في كود الشركات ومشاريع Angular الكلاسيكية، ستجد آلاف المكونات التي لا تحتوي على كلمة standalone: true إطلاقاً! المكون الكلاسيكي يعتمد بنسبة 100% على 'عقد الانتماء' لوحدته النمطية. وبمجرد تسجيله في declarations تصبح كافة التوجيهات والوحدات المستوردة في ذلك الموديول متاحة تلقائياً داخل قالب هذا المكون دون الحاجة لاستيرادها يدوياً في كل ملف.",
        "flow": "مكون بدون standalone ⟶ تسجيله في declarations داخل NgModule ⟶ يتعرف القالب على وسم <app-movie-card-classic> ⟶ عرض بطاقة الفيلم",
        "task": "لاحظ الاختلاف الجوهري: المكون الكلاسيكي لا يستورد توجيهاته بنفسه، بل يكتسبها من الوحدة الحاضنة له.",
        "benefit": "استوعبت الفرق المعماري الأساسي بين المكونات الكلاسيكية والمستقلة، وهو السؤال رقم 1 في مقابلات Angular."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح المكون الكلاسيكي والمحدد (Selector)",
        "explanation": "يتضمن الزخرف @Component ثلاثة حقول محورية:\n1) selector: 'app-movie-card-classic' وهو الاسم المخصص للوسم الجديد في HTML الذي سنضعه في أي صفحة لعرض هذه البطاقة.\n2) templateUrl: المسار النسبي لملف واجهة المستخدم HTML.\n3) styleUrl: المسار النسبي لملف تنسيقات CSS الخاصة بالمكون.\nثم يأتي كلاس المكون ليحمل المتغيرات وحالة العرض: مثل اسم الفيلم movieTitle وحالة التذاكر isSoldOut.",
        "flow": "@Component({ selector, templateUrl, styleUrl }) ⟶ export class MovieCardClassicComponent { خصائص البيانات }",
        "task": "تفقد خصائص الزخرف @Component وتأكد من عدم وجود standalone: true لترسيخ النمط الكلاسيكي.",
        "benefit": "أتقنت كتابة هيكل المكون الكلاسيكي وكيفية اختيار محدد selector مميز يبدأ بـ app-."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بتعريف كلاس المكون الكلاسيكي MovieCardClassicComponent داخل ملف src/app/classic/movie-card-classic.component.ts مع ربطه بالمحدد app-movie-card-classic وتعريف بيانات الفيلم.",
        "file": "src/app/classic/movie-card-classic.component.ts",
        "code": "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card-classic',\n  templateUrl: './movie-card-classic.component.html',\n  styleUrl: './movie-card-classic.component.css'\n})\nexport class MovieCardClassicComponent {\n  movieTitle: string = 'رحلة النجوم';\n  genre: string = 'خيال علمي';\n  rating: number = 4.8;\n  isSoldOut: boolean = false;\n}",
        "expected": "export class MovieCardClassicComponent {",
        "task": "أدخل كود المكون الكلاسيكي كاملاً في ملف src/app/classic/movie-card-classic.component.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت بنجاح مكون بطاقة الفيلم الكلاسيكي الجاهز للربط بالوحدة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تغيير قيمة isSoldOut إلى true داخل كلاس المكون، وأضف خاصية جديدة ticketPrice: number = 75; لتمثيل سعر التذكرة بالريال السعودي.",
        "task": "غيّر isSoldOut إلى true وأضف متغير ticketPrice ثم تأكد من صحة الأنواع وعدم وجود أخطاء.",
        "benefit": "تدرّبت على إضافة وتعديل خصائص المكون الديناميكية التي تتحكم في سلوك العرض."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يحدث إذا استخدمت وسم <app-movie-card-classic> في قالب التطبيق دون إضافة المكون إلى مصفوفة declarations في الـ NgModule؟",
        "options": [
          "يظهر خطأ في الكونسول: 'app-movie-card-classic is not a known element' وتفشل الصفحة في تصيير العنصر",
          "يقوم Angular بتحويل المكون تلقائياً إلى صفحة ويب خارجية",
          "يعمل المكون بشكل طبيعي دون أي مشكلة لأن Angular يكتشفه سحرياً"
        ],
        "correct": 0,
        "benefit": "إجابة عبقرية! هذا الخطأ الكلاسيكي هو أشهر خطأ يواجهه مطورو Angular في المشاريع التراثية لغياب التصريح في declarations.",
        "task": "ماذا يحدث إذا استخدمت وسم <app-movie-card-classic> في قالب التطبيق دون إضافة المكون إلى مصفوفة declarations في الـ NgModule؟"
      }
    ]
  },
  {
    "id": "ng-classic-03",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "العرض والربط الكلاسيكي (Interpolation & Property Binding)",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "إتقان عرض البيانات في قوالب Angular باستخدام تقنيتي التضمين النصي {{ }} وربط الخصائص بـ [property]؛ التحكم في تعطيل الأزرار [disabled] وتبديل الروابط [src] استناداً لمتغيرات كلاس المكون.",
    "concept": "في واجهات المستخدم التفاعلية، نحتاج لنقل البيانات من كلاس TypeScript وعرضها ديناميكياً في صفحة HTML. يوفر Angular طريقتين أساسيتين باتجاه واحد (One-Way Data Binding من الكلاس إلى القالب): 1) التضمين النصي (Interpolation) بالأقواس المزدوجة {{ expression }}: يُستخدم لوضع النصوص والأرقام المحسوبة داخل محتوى العناصر كالعناوين والفقرات (مثل {{ title }}). 2) ربط الخصائص (Property Binding) بالأقواس المربعة [property]=\"expression\": يُستخدم للتحكم في خصائص عناصر DOM البرمجية مباشرة، وليس مجرد سمات نصية. أبرز مثال هو خاصية التعطيل [disabled]=\"isSoldOut\"؛ فعندما تكون isSoldOut تساوي true، يقوم المتصفح بتعطيل الزر ومنع الضغط عليه، بينما لو كتبتها disabled=\"isSoldOut\" كـ HTML عادي فسيظل الزر معطلاً دائماً لأن HTML يعتبر أي نص غير فارغ كقيمة تفعيل! كذلك نربط روابط الصور بـ [src]=\"posterUrl\" لضمان التحديث اللحظي.",
    "flow": "متغير الكلاس (isSoldOut = true) ⟶ معالجة التعبير في القالب ⟶ ربط الخاصية البرمجية [disabled] ⟶ زر الحجز يتعطل في المتصفح تلقائياً",
    "task": "افتح الملف src/app/app.html وأضف زر حجز التذكرة مع ربط خاصية التعطيل البرمجية بمتغير isSoldOut عبر [disabled]=\"isSoldOut\".",
    "file": "src/app/app.html",
    "code": "<button class=\"btn-book\" [disabled]=\"isSoldOut\">حجز التذكرة</button>",
    "expected": "<button class=\"btn-book\" [disabled]=\"isSoldOut\">حجز التذكرة</button>",
    "reference": "https://angular.dev/guide/templates/property-binding",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في برمجة JavaScript التقليدية، كنت تضطر لكتابة document.getElementById('bookBtn').disabled = true في كل مرة تنفد فيها تذاكر الفيلم. في Angular، تنتهي هذه المعاناة تماماً! بفضل Property Binding، أنت فقط تربط خاصية الزر بمتغير الحالة في الكلاس عبر [disabled]=\"isSoldOut\"؛ وبمجرد أن تتغير قيمة المتغير في الكلاس إلى true، يتكفل محرك Angular بتعطيل الزر في المتصفح تلقائياً وبأعلى كفاءة.",
        "flow": "حالة الكلاس: isSoldOut: boolean ⟶ الربط بالقوسين المربعين [disabled] ⟶ تحديث حالة DOM فورا دون تلاعب يدوي",
        "task": "قارن بين كتابة disabled العادية في HTML وبين استخدام [disabled] في Angular للتحكم المنطقي الديناميكي.",
        "benefit": "فهمت جوهر ربط البيانات باتجاه واحد وكيف يريحك Angular من التحديث اليدوي المرهق لعناصر الصفحة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صيغة الأقواس المربعة [ ] والتضمين النصي {{ }}",
        "explanation": "القاعدة الذهبية في قوالب Angular:\n- الأقواس المزدوجة {{ }} تُطبع كنص (Text Content) بين وسوم البداية والنهاية مثل <h1>{{ movieTitle }}</h1>.\n- الأقواس المربعة [property] تخبر مترجم Angular: 'لا تعامل القيمة بين علامتي التنصيص كنص عادي، بل احسبها كتعبير TypeScript من كلاس المكون واحقن النتيجة في خاصية DOM المستهدفة'.\nلذا فإن [src]=\"posterUrl\" تجلب رابط الصورة من المتغير، و [disabled]=\"isSoldOut\" تسند القيمة المنطقية الحقيقية (boolean) للخاصية البرمجية.",
        "flow": "اسم خاصية DOM بين قوسين [property] ⟶ علامة المساواة = ⟶ اسم متغير الكلاس بين علامتي تنصيص \"variable\"",
        "task": "تأمل شكل الزر: الوسم button، الفئة class=\"btn-book\"، وخخاصية التعطيل المحاطة بالأقواس [disabled]=\"isSoldOut\".",
        "benefit": "أتقنت الفرق الحاسم بين السمات النصية (Attributes) وخصائص الـ DOM البرمجية (Properties)."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة زر حجز التذكرة الأنيق في قالب التطبيق src/app/app.html مع ربط خاصية التعطيل بالمتغير isSoldOut لمنع حجز الأفلام المنتهية تذاكرها.",
        "file": "src/app/app.html",
        "code": "<button class=\"btn-book\" [disabled]=\"isSoldOut\">حجز التذكرة</button>",
        "expected": "<button class=\"btn-book\" [disabled]=\"isSoldOut\">حجز التذكرة</button>",
        "task": "اكتب كود زر الحجز مع خاصية [disabled] داخل ملف src/app/app.html ثم اضغط (شغّل وافحص).",
        "benefit": "ربطت خاصية DOM برمجية بحالة المكون بنجاح وشاهدت استجابة الزر الفورية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب دمج التضمين النصي مع الزر لتغيير نص الزر نفسه ديناميكياً! اكتب داخل الزر: {{ isSoldOut ? 'نَفِدَت التذاكر' : 'حجز التذكرة الآن' }} ولاحظ كيف يجتمع التضمين النصي مع ربط الخاصية لخلق تجربة مستخدم ذكية.",
        "task": "استبدل نص 'حجز التذكرة' بالمعامل الشرطي الثلاثي {{ isSoldOut ? 'نَفِدَت التذاكر' : 'حجز التذكرة الآن' }} وافحص النتيجة.",
        "benefit": "احترفت المزج بين Property Binding و Interpolation لإنتاج واجهات سينما ذكية ومرنة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفرق الجوهري بين كتابة disabled=\"false\" وبين [disabled]=\"false\" في قوالب Angular؟",
        "options": [
          "في [disabled] تُحسب كقيمة منطقية boolean فيصبح الزر مفعلًا، بينما في disabled العادية تُعامل كنص غير فارغ فيظل الزر معطلًا!",
          "لا يوجد أي فرق بينهما فكلاهما متطابق تماماً في النتيجة",
          "الصيغة [disabled] تؤدي لانهيار التطبيق لأن الأقواس المربعة غير مسموح بها في المتصفح"
        ],
        "correct": 0,
        "benefit": "إجابة عبقرية! الأقواس المربعة [ ] تمنحك التحكم في خاصية DOM الحقيقية بنوعها الأصلي (boolean) بعكس نصوص HTML العادية.",
        "task": "ما الفرق الجوهري بين كتابة disabled=\"false\" وبين [disabled]=\"false\" في قوالب Angular؟"
      }
    ]
  },
  {
    "id": "ng-classic-04",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "الاستماع للأحداث (Event Binding (click))",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "ربط تفاعلات الزائر ونقرات الفأرة بمنطق المكون عبر Event Binding باستخدام صيغة الأقواس الدائرية (click)؛ استدعاء دوال الكلاس مثل onBookTicket() وتحديث بيانات حجز مقاعد السينما.",
    "concept": "بينما يُستخدم Property Binding لنقل البيانات من الكلاس إلى القالب (من الداخل للخارج)، يعمل ربط الأحداث (Event Binding) بالاتجاه المعاكس تماماً: فهو ينقل تفاعلات المستخدم ونقراته من عناصر الصفحة (DOM) إلى داخل كلاس TypeScript لمعالجتها. نستخدم في Angular صيغة الأقواس الدائرية (eventName)=\"handlerMethod()\". على سبيل المثال، الصيغة (click)=\"onBookTicket()\" تستمع لحدث نقر المستخدم على الزر، وعند وقوع النقر تستدعي فوراً الدالة onBookTicket() المعرفة في كلاس المكون. يتيح لك هذا النمط إتمام عمليات حجز التذاكر، إظهار النوافذ المنبثقة، وتعديل حالة التطبيق دون كتابة أسطر addEventListener التقليدية المرهقة.",
    "flow": "نقرة المستخدم على الزر في المتصفح ⟶ التقاط الحدث بـ (click) ⟶ استدعاء دالة onBookTicket() في الكلاس ⟶ تحديث حالة الحجز وعدد المقاعد",
    "task": "افتح الملف src/app/app.html وأضف زر حجز المقعد مع ربط حدث النقر بالدالة onBookTicket() باستخدام (click)=\"onBookTicket()\".",
    "file": "src/app/app.html",
    "code": "<button type=\"button\" class=\"btn-book\" (click)=\"onBookTicket()\">احجز مقعدك الآن</button>",
    "expected": "(click)=\"onBookTicket()\"",
    "reference": "https://angular.dev/guide/templates/event-binding",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الصفحات الثابتة ميتة؛ تفاعل المستخدم هو ما يمنح تطبيق السينما روحه وحيويته! عندما يضغط العميل على زر 'احجز مقعدك الآن'، نحتاج لإخبار كود TypeScript فوراً: 'تم النقر، احجز المقعد الآن واحسب الفاتورة'. في جافاسكريبت القديمة كنت تبحث عن الزر وتضيف مستمع أحداث يدوي. في Angular، الأمر أبسط وأجمل بمراحل: قوسان دائريان حول اسم الحدث (click) وبداخلهما اسم الدالة التي تريد تنفيذها.",
        "flow": "نقرة العميل (User Click) ⟶ الحدث (click) ⟶ تنفيذ onBookTicket() في كلاس TypeScript ⟶ تأكيد الحجز للمستخدم",
        "task": "تأمل انسياب البيانات: الحدث ينطلق من واجهة HTML باتجاه كلاس TypeScript داخل المكون.",
        "benefit": "استوعبت تدفق الأحداث باتجاه واحد من القالب إلى الكلاس، وهو الركيزة الأساسية للتفاعل في Angular."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صيغة الأقواس الدائرية ( ) واستدعاء الدوال",
        "explanation": "تتكون صيغة ربط الأحداث في Angular من أربعة أجزاء:\n1) القوسان الدائريان ( ): يرمزان لاستقبال الأحداث الخارجة من العنصر.\n2) اسم الحدث القياسي: مثل click أو input أو submit أو mouseenter بدون كلمة 'on' القديمة (نكتب click وليس onclick).\n3) علامة المساواة = متبوعة بعلامتي اقتباس \" \".\n4) الدالة المستهدفة مع قوسي الاستدعاء: مثل onBookTicket()، أو تمرير متغير الحدث الخاص $event إذا احتجنا بيانات إضافية مثل إحداثيات الفأرة أو النص المكتوب.",
        "flow": "(اسم الحدث) ⟶ علامة = ⟶ \"اسمالدالة()\" ⟶ تنفيذ المنطق داخل كلاس المكون فوراً",
        "task": "دقق في تركيبة السطر: <button type=\"button\" class=\"btn-book\" (click)=\"onBookTicket()\">احجز مقعدك الآن</button>.",
        "benefit": "أتقنت الصيغة القياسية لربط أي حدث في المتصفح بكلاس المكون في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة زر التفاعل الرئيسي لحجز المقعد في ملف src/app/app.html مع ربط حدث النقر بالدالة onBookTicket() ليتمكن المستخدم من تأكيد حجزه.",
        "file": "src/app/app.html",
        "code": "<button type=\"button\" class=\"btn-book\" (click)=\"onBookTicket()\">احجز مقعدك الآن</button>",
        "expected": "(click)=\"onBookTicket()\"",
        "task": "اكتب كود زر الحجز مع حدث (click) في ملف src/app/app.html ثم اضغط (شغّل وافحص).",
        "benefit": "ربطت أول حدث تفاعلي بيدك وشاهدت كيفية انتقال الأوامر من الشاشة إلى كود المكون."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "في تطبيقات السينما الحقيقية، نحتاج في الغالب لتمرير رقم المقعد أو معرف الفيلم للدالة. جرّب تعديل استدعاء الدالة لتمرير معرف المقعد كمعامل نصي مثل: (click)=\"onBookTicket('A-12')\" أو طباعة رسالة تفاعلية.",
        "task": "عدّل استدعاء الدالة لتمرير وسيط مثل 'VIP-1' داخل الأقواس: onBookTicket('VIP-1') وتأكد من سلامة الصياغة.",
        "benefit": "تعلمت كيفية تمرير البيانات والوسائط الديناميكية داخل دوال الأحداث في قوالب Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الرمز المستخدم في قوالب Angular لربط الأحداث (Event Binding) مثل النقر أو الإدخال؟",
        "options": [
          "الأقواس الدائرية ( ) حول اسم الحدث مثل (click)",
          "الأقواس المربعة [ ] حول اسم الحدث مثل [click]",
          "الأقواس المعقوفة { } حول اسم الحدث مثل {click}"
        ],
        "correct": 0,
        "benefit": "أحسنت! الأقواس الدائرية ( ) ترمز لانطلاق الحدث من القالب للكلاس، بينما المربعة [ ] ترمز لتدفق البيانات من الكلاس للقالب.",
        "task": "ما الرمز المستخدم في قوالب Angular لربط الأحداث (Event Binding) مثل النقر أو الإدخال؟"
      }
    ]
  },
  {
    "id": "ng-classic-05",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "التوجيه الهيكلي الكلاسيكي: الشرط *ngIf والبديل ng-template",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "شرح معمق للتوجيه الهيكلي *ngIf في Angular الكلاسيكية لإضافة وإزالة عناصر شجرة DOM ديناميكياً، واستخدام حاوية القوالب البديلة ng-template مع متغير المرجع المحلي #soldOutTpl لعرض حالة نفاذ التذاكر عند تحقق الشرط العكسي.",
    "concept": "في معمارية Angular الكلاسيكية، تُعد التوجيهات الهيكلية (Structural Directives) - المسبوقة بعلامة النجمة * - مسؤولة عن التلاعب المباشر ببنية شجرة DOM عن طريق إضافة أو استئصال العناصر وليست مجرد إخفائها بـ CSS (display: none). التوجيه *ngIf يقوم بتقييم تعبير منطقي: فإذا كانت القيمة truthy يتم إدراج العنصر في الصفحة، وإذا كانت falsy يتم حذفه بالكامل من الذاكرة وشجرة DOM. وعند الرغبة في عرض واجهة بديلة (كتلة else)، توفر Angular عنصر <ng-template> غير المرئي افتراضياً، والمقترن بمتغير مرجع محلي (Template Reference Variable) مثل #soldOutTpl، ليتم حقنه في الصفحة تلقائياً كبديل أنيق عند نفاذ المقاعد أو توقف العرض.",
    "flow": "تقييم شرط isAvailable ⟶ إذا كان متاحاً (true) يتم إدراج بادج 'العرض متاح' في الـ DOM ⟶ إذا كان غير متاح (false) يتم استدعاء قالب البديل ng-template #soldOutTpl وعرض رسالة النفاذ",
    "task": "افتح الملف src/app/app.html وأضف وسم الشرط الكلاسيكي *ngIf=\"isAvailable; else soldOutTpl\" مع ربطه بقالب البديل لعرض شارة توفر العرض السينمائي.",
    "file": "src/app/app.html",
    "code": "<div *ngIf=\"isAvailable; else soldOutTpl\" class=\"badge normal\">العرض متاح</div>\n<ng-template #soldOutTpl>\n  <div class=\"badge discount\">نفدت التذاكر بالكامل</div>\n</ng-template>",
    "expected": "*ngIf=\"isAvailable; else soldOutTpl\"",
    "reference": "https://angular.dev/guide/directives",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق *ngIf و ng-template",
        "explanation": "في تطبيقات السينما، نحتاج لمنع حجز التذاكر فور نفاد المقاعد. الفرق الجوهري بين إخفاء العنصر بـ display: none وبين *ngIf هو أن *ngIf يستأصل العنصر بالكامل من شجرة DOM ومستمعات الأحداث (Event Listeners)، مما يوفر استهلاك الذاكرة ويمنع التفاعل مع أزرار غير صالحة. علامة النجمة * هي اختصار نحوي (Syntactic Sugar) يحوّل العنصر داخلياً إلى <ng-template [ngIf]=\"isAvailable\">، بينما تمثل else soldOutTpl الإشارة إلى القالب البديل الذي يحل محله في DOM عند نفاذ المقاعد.",
        "flow": "isAvailable === true ⟶ حقن عنصر div.badge.normal في DOM ⟶ isAvailable === false ⟶ إزالة العنصر فوراً من DOM واستبداله بمحتوى #soldOutTpl",
        "task": "تأمل كيف يقوم Angular بتبديل كتل DOM بالكامل بناءً على قيمة المتغير الشرطي دون تحميل المتصفح عناصر خفية غير مستخدمة.",
        "benefit": "أدركت الفرق بين الحذف الجذري من DOM وبين الإخفاء البصري، وكيف يدير *ngIf موارد المتصفح بكفاءة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية للشرط الكلاسيكي والقوالب البديلة",
        "explanation": "تتكون الصيغة من جزأين رئيسيين: التوجيه الهيكلي *ngIf=\"الشرط; else اسم_القالب\"، وعنصر الحاوية <ng-template #اسم_القالب>. علامة النجمة * تنبه المترجم إلى أنه توجيه هيكلي. الفاصلة المنقوطة ; تفصل بين الشرط المنطقي وتوجيه الانتقال else. أما الرمز # فيعرّف متغير مرجع القالب (Template Reference Variable) الذي يرتبط باسم القالب المكتوب بعد else. القالب <ng-template> لا يظهر بذاته في شجرة DOM، بل يعمل كـ 'حاوية خاملة' لا تُعرض إلا إذا تم استدعاؤها صراحة.",
        "flow": "*ngIf ⟶ الشرط المنطقي (isAvailable) ⟶ فاصلة منقوطة ; ⟶ كلمة else ⟶ اسم المرجع (soldOutTpl) ⟶ قالب <ng-template #soldOutTpl>",
        "task": "فكك تركيبة السطر: علامة النجمة *، الشرط المنطقي، كلمة else، ورمز الهاشتاغ # المعرّف للقالب البديل.",
        "benefit": "أتقنت القراءة الدقيقة لشفرة التوجيهات الهيكلية الكلاسيكية ومراجع القوالب في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة شارة توفر العرض السينمائي في واجهة التطبيق الرئيسية src/app/app.html. إذا كان العرض متاحاً ستظهر الشارة بلون طبيعي، وإذا نفدت التذاكر سيتم عرض قالب البديل soldOutTpl.",
        "file": "src/app/app.html",
        "code": "<div *ngIf=\"isAvailable; else soldOutTpl\" class=\"badge normal\">العرض متاح</div>\n<ng-template #soldOutTpl>\n  <div class=\"badge discount\">نفدت التذاكر بالكامل</div>\n</ng-template>",
        "expected": "*ngIf=\"isAvailable; else soldOutTpl\"",
        "task": "اكتب كود شارة التوفر والقالب البديل في ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت شرط عرض ديناميكي كلاسيكي مع معالجة الحالة البديلة باستخدام ng-template بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.ts وغيّر قيمة المتغير isAvailable من true إلى false، ثم ارجع للمعاينة الحية وشاهد كيف اختفت شارة 'العرض متاح' وظهرت تلقائياً رسالة القالب البديل 'نفدت التذاكر بالكامل'.",
        "task": "بدّل قيمة isAvailable إلى false في ملف src/app/app.ts ولاحظ التغيير الفوري في شجرة المعاينة.",
        "benefit": "عاينت بالعين المجردة آلية تبديل عناصر DOM ديناميكياً بين الشرط الأساسي والقالب البديل."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفرق الأساسي بين إخفاء عنصر باستخدام تنسيق CSS (display: none) وبين استخدام التوجيه الهيكلي *ngIf؟",
        "options": [
          "*ngIf يحذف العنصر ومستمعات أحداثه تماماً من شجرة DOM عند خطأ الشرط، بينما display: none يبقيه في الـ DOM مخفياً بصرياً فقط",
          "display: none يحذف العنصر من الذاكرة، بينما *ngIf يغير لون خلفية العنصر فقط",
          "لا يوجد أي فرق بينهما فكلاهما يؤدي نفس النتيجة تماماً في المتصفح والذاكرة"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة تماماً! التوجيهات الهيكلية تتلاعب بتركيب الـ DOM الفعلي، مما يحسن الأداء ويحمي أمان الواجهة من التفاعل مع عناصر غير مصرح بها.",
        "task": "ما الفرق الأساسي بين إخفاء عنصر باستخدام تنسيق CSS (display: none) وبين استخدام التوجيه الهيكلي *ngIf؟"
      }
    ]
  },
  {
    "id": "ng-classic-06",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "التوجيه الهيكلي الكلاسيكي: التكرار *ngFor وتتبع الفهارس",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "تكرار قوائم وعروض السينما في واجهة المستخدم باستخدام التوجيه الهيكلي الكلاسيكي *ngFor، والوصول للمتغيرات المحلية المساعدة كالفهرس index والحد الأول first، والمقارنة المعمارية مع كتلة @for الحديثة في Angular.",
    "concept": "يُعد تكرار القوائم من أكثر العمليات تكراراً في تطبيقات الويب؛ فمنصة السينما تعرض قوائم الأفلام وقوائم الصالات ومصفوفات المقاعد. في الأسلوب الكلاسيكي لـ Angular، يؤدي التوجيه *ngFor دور حلقة التكرار فوق المصفوفات، حيث ينسخ عنصر الـ DOM وقوالبه الفرعية لكل عنصر في المصفوفة. كما يتيح *ngFor تصدير متغيرات سياقية مساعدة قيّمة مثل let i = index للحصول على ترتيب العنصر بدءاً من الصفر، و let f = first لمعرفة العنصر الأول لتمييزه بشارة خاصة، و let l = last و let even = even. على عكس كتلة @for الحديثة في Angular 17+، كان trackBy في *ngFor اختيارياً، مما كان يسبب أحياناً مشاكل في إعادة رسم كامل عناصر القائمة إذا لم يُستخدم بدقة.",
    "flow": "مصفوفة أفلام classicMovies ⟶ حلقة *ngFor تنسخ القالب لكل فيلم ⟶ قراءة متغير الفهرس i = index ⟶ عرض رقم الفيلم وعنوانه {{ i + 1 }}. {{ movie }} في شارة مستقلة",
    "task": "افتح الملف src/app/app.html واستخدم التوجيه الكلاسيكي *ngFor=\"let movie of classicMovies; let i = index\" لتكرار وعرض أفلام السينما الكلاسيكية مع أرقامها التسلسلية.",
    "file": "src/app/app.html",
    "code": "<div *ngFor=\"let movie of classicMovies; let i = index\" class=\"movie-pill\"><b>{{ i + 1 }}. {{ movie }}</b></div>",
    "expected": "*ngFor=\"let movie of classicMovies; let i = index\"",
    "reference": "https://angular.dev/guide/directives",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق التكرار الكلاسيكي *ngFor",
        "explanation": "بدلاً من تكرار كود HTML يدوياً لكل فيلم، نكتب قالباً واحداً ونطلب من Angular تكراره ديناميكياً لكل عنصر داخل مصفوفة الأفلام classicMovies. ينشئ *ngFor نطاقاً محلياً (Local Scope) متاحاً داخل العنصر، مما يسمح لنا بقراءة متغير العنصر الحالي let movie والمتغيرات الإضافية مثل let i = index لعرض ترقيم العناصر للمستخدمين بسهولة وأناقة.",
        "flow": "مصفوفة ['رحلة النجوم', 'واحة الأمل', 'حارس المجرة'] ⟶ دوران *ngFor ⟶ الدورة الأولى (i=0): '1. رحلة النجوم' ⟶ الدورة الثانية (i=1): '2. واحة الأمل' ⟶ الدورة الثالثة (i=2): '3. حارس المجرة'",
        "task": "لاحظ كيف يتعامل *ngFor مع المصفوفة ويمرر كلاً من العنصر والفهرس الرقمي كمتغيرات محلية جاهزة للعرض.",
        "benefit": "فهمت معمارية تكرار القوائم في Angular الكلاسيكية وكيفية استغلال المتغيرات المحلية السياقية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الصيغة النحوية للمتغيرات المساعدة في *ngFor",
        "explanation": "تبدأ الصيغة بـ *ngFor، تليها الكلمة المفتاحية let لتعريف متغير العنصر المحلي، ثم of لتحديد المصفوفة المصدرية في كلاس المكون. بعد ذلك نضع فاصلة منقوطة ; لتعريف المتغيرات السياقية المساعدة: let i = index للحصول على الفهرس الرقمي (يبدأ من 0)، و let isFirst = first لقيمة منطقية تحدد ما إذا كان هذا هو العنصر الأول في القائمة، و let isLast = last للعنصر الأخير. كل هذه المتغيرات تصبح متاحة حصرياً داخل نطاق القالب المكرر.",
        "flow": "*ngFor=\"let [اسم_العنصر] of [المصفوفة]; let [اسم_الفهرس] = index; let [اسم_الأول] = first\"",
        "task": "فكك أجزاء العبارة: الكلمة let، الكلمة of، الفاصلة المنقوطة، وتعيين اسم الفهرس المحلي index.",
        "benefit": "أتقنت تركيب جملة التكرار واستخراج كافة المتغيرات المساعدة المتاحة في بيئة القالب."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بعرض قائمة الأفلام الكلاسيكية المتاحة في السينما داخل ملف src/app/app.html. سنستخدم التوجيه *ngFor مع قراءة الفهرس i = index لعرض رقم كل فيلم متبوعاً باسمه داخل شارة movie-pill أنيقة.",
        "file": "src/app/app.html",
        "code": "<div *ngFor=\"let movie of classicMovies; let i = index\" class=\"movie-pill\"><b>{{ i + 1 }}. {{ movie }}</b></div>",
        "expected": "*ngFor=\"let movie of classicMovies; let i = index\"",
        "task": "اكتب سطر تكرار الأفلام أعلاه داخل ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أتقنت تكرار القوائم بالأسلوب الكلاسيكي المعتمد في ملايين مشاريع Angular القائمة في سوق العمل."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب استخراج متغير المساعدة let f = first بجانب الفهرس داخل جملة التكرار: *ngFor=\"let movie of classicMovies; let i = index; let f = first\"، ثم أضف وسماً شرطياً صغيراً يعرض شارة 'الأكثر طلباً' بجانب الفيلم الأول فقط إذا كان f صحيحاً.",
        "task": "أضف متغير let f = first وشاهد كيف يمكنك تمييز أول عنصر في القائمة ديناميكياً.",
        "benefit": "تعمقت في استثمار المتغيرات السياقية المتقدمة لتخصيص واجهة المستخدم بذكاء."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما القيمة التي يحملها المتغير المحلي المعرّف بـ let i = index في الدورة الأولى لتكرار القائمة بـ *ngFor؟",
        "options": [
          "القيمة 0 (لأن مصفوفات جافاسكريبت وفهارسها تبدأ من الصفر دائماً)",
          "القيمة 1 (لأن الترقيم في شاشات العرض يبدأ من 1 تلقائياً)",
          "القيمة undefined حتى تكتمل جميع دورات التكرار"
        ],
        "correct": 0,
        "benefit": "إجابة نموذجية! الفهرس index يبدأ دائماً من 0 كما في معايير لغات البرمجة، ولذلك نكتب {{ i + 1 }} إذا أردنا إظهار ترقيم بشري يبدأ من 1.",
        "task": "ما القيمة التي يحملها المتغير المحلي المعرّف بـ let i = index في الدورة الأولى لتكرار القائمة بـ *ngFor؟"
      }
    ]
  },
  {
    "id": "ng-classic-07",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "التوجيهات السمية الكلاسيكية: [ngClass] و [ngStyle]",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "التحكم الديناميكي في مظهر العناصر وفئات CSS وأنماط الألوان والخطوط باستخدام التوجيهات السمية (Attribute Directives) الكلاسيكية [ngClass] و [ngStyle] لتبديل حالة تذاكر ومقاعد السينما بناءً على شروط متغيرة.",
    "concept": "تختلف التوجيهات السَمية (Attribute Directives) عن التوجيهات الهيكلية في أنها لا تضيف أو تحذف عناصر من شجرة DOM، بل تُغيّر مظهر أو سلوك عنصر موجود بالفعل. يُعد التوجيه الكلاسيكي [ngClass] الوسيلة الأكثر شيوعاً لتطبيق فئات CSS متعددة شرطياً؛ حيث يقبل كائناً تكون مفاتيحه هي أسماء الفئات وقيمه تعبيرات منطقية (Boolean)، فإذا كان التعبير true أُضيفت الفئة، وإذا كان false أُزيلت تلقائياً. وبالمثل، يتيح التوجيه [ngStyle] تعيين أنماط CSS المباشرة (Inline Styles) ديناميكياً كألوان الخلفيات والارتفاعات بناءً على بيانات المكون.",
    "flow": "حالة hasDiscount في كلاس المكون ⟶ فحص كائن [ngClass] ⟶ إذا كانت hasDiscount = true تُطبق فئة 'badge discount' وتُزال فئة 'badge normal' ⟶ تحديث مظهر التذكرة فوراً",
    "task": "افتح الملف src/app/app.html واستخدم التوجيه السمي الكلاسيكي [ngClass] لتطبيق فئات التنسيق الشرطية لتذكرة العرض وفق حالة التخفيض.",
    "file": "src/app/app.html",
    "code": "<span [ngClass]=\"{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }\">تذكرة العرض</span>",
    "expected": "[ngClass]=\"{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }\"",
    "reference": "https://angular.dev/guide/directives",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق [ngClass] و [ngStyle]",
        "explanation": "في شاشات الحجز، يتغير مظهر المقاعد والتذاكر باستمرار: مقعد متاح (أخضر)، محجوز (رمادي)، أو مشمول بخصم خاص (ذهبي). بدلاً من استخدام الربط المباشر لفئة واحدة مثل [class.active] أو التلاعب اليدوي بـ DOM، يوفر [ngClass] صيغة كائن مركزية وقوية تسمح بتقييم شروط متعددة في سطر واحد وإدارة عشرات الفئات التنسيقية بسلاسة متناهية.",
        "flow": "متغير hasDiscount: true ⟶ كائن { 'badge discount': true, 'badge normal': false } ⟶ إضافة فئتي badge و discount وإلغاء normal ⟶ ظهور التذكرة بلون الخصم الذهبي",
        "task": "تأمل كيف يقوم ngClass بمزامنة فئات العنصر مع حالة التطبيق اللحظية بدقة متناهية ودون الحاجة لأي كود تلاعب يدوي.",
        "benefit": "استوعبت فلسفة التوجيهات السمية في تعديل مظهر عناصر الـ DOM القائمة ديناميكياً."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لتوجيه الربط الشرطي [ngClass]",
        "explanation": "يُحاط اسم التوجيه بأقواس مربعة [ngClass] للدلالة على ربط الخاصية (Property Binding). تُمرر له قيمة على هيئة كائن جافاسكريبت محاط بأقواس معقوفة {} داخل علامات التنصيص. داخل الكائن، نحدد أسماء فئات CSS كمفاتيح (بين علامات تنصيص مفردة إذا كانت تحتوي على مسافات أو شرطات)، متبوعة بنقطتين : ثم التعبير الشرطي الذي يحدد تفعيل الفئة أو إلغائها. كما يمكن تمرير مصفوفة فئات أو دالة تعيد كائن الفئات.",
        "flow": "[ngClass] ⟶ علامة المساواة = ⟶ فتح كائن جافاسكريبت { 'اسم_الفئة': شرط_منطقي } ⟶ إسناد الفئة إذا تحقق الشرط",
        "task": "لاحظ كيف تفصل النقطتان : بين اسم الفئة التنسيقية والتعبير المنطقي المقابل لها داخل الكائن.",
        "benefit": "أتقنت هندسة كائنات الشروط التنسيقية مع [ngClass] لتطبيق تصاميم واجهات ديناميكية واحترافية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة شارة 'تذكرة العرض' داخل ملف src/app/app.html مع تطبيق التوجيه السمي [ngClass] لتبديل التنسيق تلقائياً بين شارة الخصم المميزة وشارة العرض العادي بناءً على متغير hasDiscount.",
        "file": "src/app/app.html",
        "code": "<span [ngClass]=\"{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }\">تذكرة العرض</span>",
        "expected": "[ngClass]=\"{ 'badge discount': hasDiscount, 'badge normal': !hasDiscount }\"",
        "task": "أضف سطر تذكرة العرض مع توجيه [ngClass] داخل ملف src/app/app.html واضغط زر (شغّل وافحص).",
        "benefit": "طبقت التوجيهات السمية الكلاسيكية بمهارة في قلب شاشة حجز التذاكر."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب استخدام التوجيه السمي الشقيق [ngStyle] لإضافة نمط خط عريض ولون مخصص مباشرة: أضف للتذكرة [ngStyle]=\"{ 'font-weight': hasDiscount ? 'bold' : 'normal', 'letter-spacing': '1px' }\" وشاهد كيف تتأثر خصائص الـ CSS المباشرة في شاشة المعاينة.",
        "task": "أضف توجيه [ngStyle] مع خصائص أسلوبية ولاحظ تطبيقها المباشر في المتصفح.",
        "benefit": "تمكنت من الجمع بين إدارة فئات CSS بـ [ngClass] والأنماط المباشرة بـ [ngStyle]."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفرق الجوهري بين التوجيه الهيكلي (مثل *ngIf) والتوجيه السمي (مثل [ngClass])؟",
        "options": [
          "التوجيه الهيكلي يضيف أو يحذف عناصر من شجرة DOM بالكامل، بينما التوجيه السمي يعدل مظهر أو خصائص عنصر قائم دون حذفه",
          "التوجيه السمي يتطلب دائماً علامة النجمة * قبله، بينما التوجيه الهيكلي يوضع بين أقواس مربعة []",
          "التوجيه الهيكلي يعمل مع ملفات CSS فقط، بينما التوجيه السمي يرسل طلبات HTTP للخادم"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة واعية! التوجيهات الهيكلية تغير هيكل الصفحة (Structural)، بينما التوجيهات السمية تُغني سمات ومظهر العناصر الموجودة بالفعل (Attribute).",
        "task": "ما الفرق الجوهري بين التوجيه الهيكلي (مثل *ngIf) والتوجيه السمي (مثل [ngClass])؟"
      }
    ]
  },
  {
    "id": "ng-classic-08",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "التواصل الكلاسيكي بين المكونات: التمرير للابن بـ @Input()",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "معمارية تدفق البيانات أحادية الاتجاه (One-way Data Flow) في Angular الكلاسيكية، وتمرير البيانات من المكون الأب إلى المكون الابن باستخدام المزخرف @Input() لتخصيص بطاقات وتفاصيل عروض السينما.",
    "concept": "في تطبيقات Angular الحقيقية، تُبنى الواجهات على هيئة شجرة هرمية من المكونات (Component Tree). لضمان استقلالية وقابلية إعادة استخدام المكونات، يجب أن تكون قادرة على استقبال بيانات خارجية من المكونات الحاضنة لها (Parent Components). في معمارية Angular الكلاسيكية الممتدة عبر الإصدارات من 2 حتى 16 وما زالت مستخدمة في غالبية المشاريع المؤسسية، يُستخدم المزخرف الخاص @Input() من مكتبة @angular/core لوسم خاصية داخل كلاس المكون الابن، مما يجعلها منفذاً (Input Port) يستقبل البيانات عبر ربط الخصائص [title]=\"selectedMovieTitle\" من قالب المكون الأب.",
    "flow": "المكون الأب يملك عنوان الفيلم 'رحلة النجوم' ⟶ ربط الخاصية في قالب الأب [title]=\"movieTitle\" ⟶ استقبال القيمة عبر مزخرف @Input() title داخل كلاس الابن ⟶ عرض العنوان في قالب المكون الابن",
    "task": "افتح الملف src/app/classic/movie-detail-classic.component.ts واستقبل عنوان الفيلم القادم من المكون الأب بتعريف الخاصية المزخرفة @Input() title: string = '';.",
    "file": "src/app/classic/movie-detail-classic.component.ts",
    "code": "import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-detail-classic',\n  templateUrl: './movie-detail-classic.component.html',\n  styleUrl: './movie-detail-classic.component.css'\n})\nexport class MovieDetailClassicComponent {\n  // استقبال عنوان الفيلم من المكون الأب عبر مزخرف @Input الكلاسيكي\n  @Input() title: string = '';\n}\n",
    "expected": "@Input() title: string = '';",
    "reference": "https://angular.dev/guide/components/inputs",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق البيانات عبر @Input()",
        "explanation": "تمثل شجرة المكونات قلب Angular؛ حيث يكون المكون الأب (مثل App أو CinemaHall) مسؤولاً عن جلب وتخزين البيانات العامة، بينما تكون المكونات الأبناء (مثل MovieDetailClassicComponent) بمثابة مكونات عرض محضة (Presentation / Dumb Components). يسمح المزخرف @Input() بفتح نافذة استقبال آمنة في كلاس المكون الابن، حيث تتدفق البيانات دائماً في اتجاه واحد هابط من الأعلى إلى الأسفل (One-way Data Flow) مما يمنع التضارب ويسهل تعقب مصدر البيانات.",
        "flow": "بيانات المكون الأب (Parent State) ⟶ تدفق هابط عبر [title] ⟶ منفذ الاستقبال @Input() title في المكون الابن ⟶ عرض العنوان داخل بطاقة تفاصيل الفيلم",
        "task": "تأمل مخطط التدفق الهابط ولاحظ كيف يحافظ المكون الابن على استقلاليته ويعتمد كلياً على البيانات الممررة له من الأب.",
        "benefit": "استوعبت مبدأ تدفق البيانات أحادي الاتجاه وكيفية تصميم مكونات قابلة لإعادة الاستخدام في سوق العمل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح المزخرف @Input() وتحديد النوع وقيمة البداية",
        "explanation": "لاستخدام المزخرف، نقوم أولاً باستيراد Input من حزمة @angular/core. ثم نكتب @Input() مباشرة قبل اسم الخاصية المراد جعلها قابلة للتمرير. يُفضل دائماً تحديد نوع البيانات بدقة (title: string) وإعطاؤها قيمة ابتدائية آمنة (= '') لتفادي الأخطاء في وضع Strict Mode في TypeScript. كما يمكن تمرير اسم مستعار داخل المزخرف @Input('movieTitle') إذا رغبنا في تغيير اسم الخاصية عند كتابتها في قالب الأب.",
        "flow": "استيراد Input من @angular/core ⟶ كتابة المزخرف @Input() ⟶ اسم الخاصية (title) ⟶ نقطتان وتحديد النوع (: string) ⟶ قيمة افتراضية (= '')",
        "task": "فكك عناصر التعريف: رمز المزخرف @، استدعاء الدالة Input()، واسم الخاصية مع نوعها الصريح.",
        "benefit": "أتقنت كتابة مدخلات المكونات الكلاسيكية وتفادي مشكلات عدم تطابق الأنواع في TypeScript."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بتهيئة منفذ استقبال عنوان الفيلم داخل المكون الكلاسيكي src/app/classic/movie-detail-classic.component.ts. عرّف الخاصية title واجعلها مزخرفة بـ @Input() مع نوع string وقيمة افتراضية فارغة ليتمكن المكون الأب من إمدادها بالعناوين ديناميكياً.",
        "file": "src/app/classic/movie-detail-classic.component.ts",
        "code": "import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-detail-classic',\n  templateUrl: './movie-detail-classic.component.html',\n  styleUrl: './movie-detail-classic.component.css'\n})\nexport class MovieDetailClassicComponent {\n  // استقبال عنوان الفيلم من المكون الأب عبر مزخرف @Input الكلاسيكي\n  @Input() title: string = '';\n}\n",
        "expected": "@Input() title: string = '';",
        "task": "افتح ملف src/app/classic/movie-detail-classic.component.ts وأضف تعريف الخاصية المزخرفة @Input() ثم اضغط زر (شغّل وافحص).",
        "benefit": "أنشأت أول مدخل بيانات رسمي يربط المكونات ببعضها وفق المعمارية الكلاسيكية المعتمدة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "أضف مدخلين إضافيين داخل كلاس المكون الابن لتمثيل مدة الفيلم وتقييمه: @Input() duration: string = '120 دقيقة'; و @Input() rating: number = 5;، ولاحظ كيف يتسع المكون الابن لاستقبال كافة أبعاد كائن الفيلم من أي مكون أب في تطبيق السينما.",
        "task": "أضف المدخلين duration و rating بنوعيهما string و number وتأكد من خلو الكود من أي تحذيرات.",
        "benefit": "تعودت على توسيع عقود المكونات الفرعية وتمرير حزم بيانات متكاملة بسهولة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الغرض الأساسي من استخدام المزخرف @Input() في مكونات Angular الكلاسيكية؟",
        "options": [
          "تمكين المكون الابن من استقبال قيم وبيانات ممررة إليه مباشرة من المكون الأب عبر ربط الخصائص في القالب",
          "إرسال إشعارات ونقرات من المكون الابن إلى المكون الأب تلقائياً",
          "تخزين بيانات المكون بشكل دائم في قاعدة بيانات السيرفر"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة بامتياز! مزخرف @Input() يمثل بوابة الدخول الهابطة للبيانات من المكون الأب إلى الابن، بينما يُستخدم @Output() للتدفق الصاعد العكسي.",
        "task": "ما الغرض الأساسي من استخدام المزخرف @Input() في مكونات Angular الكلاسيكية؟"
      }
    ]
  },
  {
    "id": "ng-classic-09",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "التواصل الكلاسيكي: إرسال الأحداث بـ @Output() و EventEmitter",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "شرح نمط تواصل المكونات الكلاسيكي الصاعد من الابن إلى الأب باستخدام الزخرف @Output() ومطلق الأحداث EventEmitter لنقل تفاعلات المستخدم مثل اختيار مقعد السينما إلى المكون الحاوي.",
    "concept": "في معمارية Angular الكلاسيكية، يتدفق تدفق البيانات إلى الأسفل عبر @Input() (من الأب إلى الابن)، بينما ترتفع الأحداث والإشعارات إلى الأعلى عبر @Output() ومطلق الأحداث EventEmitter. عندما يتفاعل الزائر مع مكون مقعد سينمائي فردي (الابن) بالضغط عليه، لا يقوم المكون الابن بتعديل حالة الحجز الكلية مباشرة، بل يُطلق حدثاً مخصصاً يحمل معرف المقعد seatId عبر this.seatSelected.emit(seatId). يستمع المكون الأب لهذا الحدث عبر ربط الأحداث (seatSelected)=\"onSeatSelected($event)\"، مما يحافظ على مبدأ المسؤولية الأحادية (Single Responsibility) وفصل طبقات العرض عن منطق إدارة الحالة.",
    "flow": "نقرة المستخدم على المقعد الابن ⟶ استدعاء .emit(seatId) ⟶ إرسال الحدث عبر @Output() seatSelected ⟶ التقاط الأب للحدث بـ (seatSelected)=\"onSelect($event)\" ⟶ تحديث سلة التذاكر",
    "task": "افتح الملف src/app/classic/seat-item-classic.component.ts وعرّف مخرج الحدث الكلاسيكي seatSelected باستخدام الزخرف @Output() و EventEmitter<string> لإشعار الأب بالمقعد المختار.",
    "file": "src/app/classic/seat-item-classic.component.ts",
    "code": "@Output() seatSelected = new EventEmitter<string>();",
    "expected": "@Output() seatSelected = new EventEmitter<string>();",
    "reference": "https://angular.dev/guide/components/outputs",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية وتدفق الأحداث للأعلى",
        "explanation": "في سيناريوهات واجهات المستخدم الحقيقية، يتكون مخطط الصالة من عشرات المقاعد الصغيرة؛ كل مقعد هو مكون ابن بسيط وظيفته فقط إعلام المكون الأب الحاوي عند اختياره. التعديل المباشر على بيانات الأب من الابن يعتبر انتهاكاً خطيراً لمعمارية Angular. لذلك، يوفر Angular الكلاسيكي قناة اتصال صاعدة تُدعى @Output()؛ يعمل الابن كمذيع راديو يطلق إشارة emit()، بينما يجلس الأب في موضع الاستماع ليلتقط الحدث عبر (seatSelected)=\"$event\" وينفذ منطق الحجز.",
        "flow": "تفاعل المستخدم في الابن ⟶ إطلاق seatSelected.emit('A1') ⟶ ارتقاء الإشارة للأب ⟶ تنفيذ دالة الأب بمعامل $event",
        "task": "تأمل كيف يحافظ هذا النمط على نقاء المكون الابن وجعله قابلاً لإعادة الاستخدام في أي قاعة عرض.",
        "benefit": "فهمت فلسفة إرسال الأحداث للأعلى (Custom Events) ومبدأ تدفق البيانات أحادي الاتجاه."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الزخرف @Output() ومطلق الأحداث EventEmitter",
        "explanation": "نعلن عن خاصية مزخرفة بـ @Output() ونسند لها كائناً جديداً من EventEmitter<T>. يحدد النوع العام <string> حمولة الحدث (Payload)؛ هنا معرف المقعد كنص (مثل 'A1'). عند وقوع الحدث (كنقرة زر)، يستدعي المكون دالة this.seatSelected.emit(this.seatNumber). في قالب الأب، نربط الحدث بقوسين دائريين (seatSelected)=\"onSeatSelected($event)\"، حيث يمثل $event القيمة المرسلة.",
        "flow": "@Output() ⟶ اسم مخرج الحدث ⟶ = new EventEmitter<Type>() ⟶ الاستدعاء بـ .emit(payload)",
        "task": "تفحص تركيبة السطر: الزخرف @Output()، اسم الحدث seatSelected، وتهيئة new EventEmitter<string>().",
        "benefit": "أتقنت الصياغة النحوية الدقيقة لمخرجات المكونات الكلاسيكية في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنعرّف الآن مخرج الحدث الكلاسيكي seatSelected داخل مكون المقعد الكلاسيكي src/app/classic/seat-item-classic.component.ts لتمكين إرسال معرف المقعد إلى صالة العرض.",
        "file": "src/app/classic/seat-item-classic.component.ts",
        "code": "@Output() seatSelected = new EventEmitter<string>();",
        "expected": "@Output() seatSelected = new EventEmitter<string>();",
        "task": "أضف سطر تعريف مخرج الحدث @Output() seatSelected = new EventEmitter<string>(); داخل الصنف SeatItemClassicComponent ثم اضغط (شغّل وافحص).",
        "benefit": "كتبت مخرج أحداث كلاسيكي حقيقي بيدك وربطت مكون المقعد بقناة اتصال مع الأب."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "في بعض السيناريوهات، قد ترغب في إرسال كائن مقعد كامل بدلاً من مجرد نص معرف المقعد، مثل EventEmitter<Seat> أو إرسال حدث نقرة مزدوجة مثل @Output() seatDoubleClicked = new EventEmitter<string>();.",
        "task": "فكر كيف يمكنك إضافة مخرج حدث ثانٍ باسم seatCancelled من نفس النوع، ولاحظ المرونة الفائقة لإطلاق أحداث متعددة من نفس المكون.",
        "benefit": "استوعبت إمكانية توسيع قنوات التواصل بإضافة مخرجات أحداث متخصصة لتغطية كافة سيناريوهات تجربة المستخدم."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو دور المتغير الخاص $event في قالب المكون الأب عند الاستماع لحدث صادر عبر @Output()؟",
        "options": [
          "يحمل الحمولة (Payload) أو البيانات التي أرسلها المكون الابن عبر دالة emit()",
          "يحدد لون زر الحجز في شاشة العرض تلقائياً",
          "يقوم بإلغاء تحميل المكون الابن وحذفه من شجرة DOM"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة! $event يمثل الحمولة المنطلقة مع الحدث الصاعد من المكون الابن.",
        "task": "ما هو دور المتغير الخاص $event في قالب المكون الأب عند الاستماع لحدث صادر عبر @Output()؟"
      }
    ]
  },
  {
    "id": "ng-classic-10",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "منقيات البيانات الكلاسيكية (Built-in Pipes)",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "استخدام المنقيات الجاهزة (Built-in Pipes) في قوالب Angular لتنسيق وتحويل عرض البيانات المباشرة مثل العملات (currency) والتواريخ دون تعديل البيانات الأصلية في المكون.",
    "concept": "تُمكّنك قنوات أو أنابيب البيانات (Pipes) في Angular من تحويل وعرض البيانات الخام في القالب بصيغة مقروءة وجمالية تناسب لغة وثقافة المستخدم، مع الحفاظ التام على نقاء البيانات الأصلية في نموذج الصنف. على سبيل المثال، رقم السعر الخام 85 لا نخزنه كنص مضاف إليه رمز العملة في كود TypeScript، بل نمرره عبر أنبوب التنسيق الكلاسيكي currency في القالب: {{ 85 | currency:'USD':'symbol':'1.2-2' }}. يقوم الأنبوب تلقائياً بضبط رمز العملة، وتنسيق الفاصلة العشرية، وإضافة علامات الآلاف حسب المعايير الدولية المعمول بها.",
    "flow": "قيمة البيانات الرقمية الخام (85) ⟶ المرور عبر رمز الأنبوب | ⟶ منقي العملات currency:'USD':'symbol':'1.2-2' ⟶ عرض النص المنسق والجاهز للجمهور ($85.00)",
    "task": "افتح الملف src/app/app.html واستخدم الأنبوب المدمج currency لتنسيق سعر تذكرة السينما 85 دولاراً بعلامة الدولار ورقمين عشريين.",
    "file": "src/app/app.html",
    "code": "<span class=\"ticket-price\">{{ 85 | currency:'USD':'symbol':'1.2-2' }}</span>",
    "expected": "{{ 85 | currency:'USD':'symbol':'1.2-2' }}",
    "reference": "https://angular.dev/guide/pipes",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية وفلسفة أنابيب التحويل (Pipes)",
        "explanation": "تخيل أن نظام السينما يحتفظ بأسعار التذاكر كأرقام مجردة في قاعدة البيانات (مثل 85 أو 120.5). إذا حاولت إضافة الرمز $ يدوياً في كود الصنف، فلن تتمكن لاحقاً من إجراء عمليات حسابية رياضية كجمع التذاكر أو تطبيق الخصم! هنا يبرز دور أنابيب البيانات (Pipes) في قوالب Angular؛ وظيفتها أخذ القيمة الخام لحظة العرض فقط وتغليفها بالتنسيق الجمالي المطلوب للمستخدم، دون المساس بالقيمة البرمجية الحقيقية.",
        "flow": "السعر كرقم 85 ⟶ مرور بالقمع (Pipe |) ⟶ تطبيق بارامترات العملة ⟶ ظهور $85.00 على الشاشة",
        "task": "تأمل كيف يحافظ الأنبوب على فصل طبقة العرض المرئي (Presentation) عن طبقة البيانات والحسابات (Data Layer).",
        "benefit": "فهمت الفلسفة المعمارية لاستخدام Pipes لتنسيق وعرض البيانات بأناقة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح بنية واستدعاء الأنابيب (Pipe Syntax & Arguments)",
        "explanation": "لاستخدام أي أنبوب، نضع خط الأنبوب العمودي (|) بعد القيمة أو المتغير المراد تنسيقه داخل أقواس الربط {{ }}، متبوعاً باسم الأنبوب. لتمرير المعاملات (Arguments)، نضع نقطتين رأسيتين (:) تليها قيمة المعامل. في حالة currency، المعامل الأول هو كود العملة القياسي الدولي ISO مثل 'USD' أو 'SAR'، والمعامل الثاني هو نوع الرمز مثل 'symbol' لإظهار علامة $ أو ر.س، والمعامل الثالث هو ضوابط الأرقام العشرية مثل '1.2-2' (حد أدنى رقم صحيح واحد، وحد أدنى رقمين عشريين، وحد أقصى رقمين عشريين).",
        "flow": "{{ القيمة | اسم_الأنبوب : معامل_1 : معامل_2 : معامل_3 }}",
        "task": "تفحص أجزاء السطر: رمز الأنبوب |، اسم الأنبوب currency، والمعاملات المفصولة بنقطتين رأسيتين.",
        "benefit": "أتقنت تمرير المعاملات المتقدمة للأنابيب المدمجة في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بإضافة وسم سعر التذكرة المنسق باستخدام منقي العملة currency داخل قالب السينما الرئيسي src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<span class=\"ticket-price\">{{ 85 | currency:'USD':'symbol':'1.2-2' }}</span>",
        "expected": "{{ 85 | currency:'USD':'symbol':'1.2-2' }}",
        "task": "اكتب عنصر span الخاص بسعر التذكرة المنسق أعلاه داخل ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبقت أول Pipe مدمج لتنسيق العملات باحترافية في واجهة السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمتلك Angular أنابيب مدمجة متنوعة ومهمة، مثل date:'short' لتنسيق تواريخ عروض السينما، و uppercase لتكبير أحرف رمز الفيلم، و percent لنسب الخصم.",
        "task": "جرّب تغيير كود العملة إلى 'EUR' لتنسيق السعر باليورو، أو إضافة وسم تجريبي <span>{{ 'imax' | uppercase }}</span> لتشاهد كيف يحول الأنبوب النصوص إلى أحرف كبيرة فورياً.",
        "benefit": "اختبرت تنوع منظومة الأنابيب المدمجة في Angular وقدرتها على التعامل مع شتى أنواع البيانات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يحدث للبيانات الأصلية المخزنة في كلاس المكون عند تطبيق أنبوب (Pipe) عليها في القالب؟",
        "options": [
          "تبقى القيمة الأصلية كما هي تماماً دون أي تغيير، ويقتصر التحويل على طريقة العرض المرئي في القالب فقط",
          "تتحول القيمة الأصلية في الكلاس تلقائياً ودائماً إلى سلسلة نصية مشفرة",
          "يتم حذف المتغير من الذاكرة لتوفير استهلاك المتصفح"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة ومتقنة! الأنابيب في Angular نقية ولا تغير في حالة البيانات الأصلية (Pure Transformations).",
        "task": "ماذا يحدث للبيانات الأصلية المخزنة في كلاس المكون عند تطبيق أنبوب (Pipe) عليها في القالب؟"
      }
    ]
  },
  {
    "id": "ng-classic-11",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "حقن التبعيات الكلاسيكي عبر المنشئ (Constructor DI)",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "فهم المعمارية الكلاسيكية لحقن التبعيات (Dependency Injection) في Angular عبر دوال الإنشاء (constructor)، واستيعاب نمط الخدمات المفردة (Singleton Services) لمشاركة البيانات بين المكونات.",
    "concept": "نظام حقن التبعيات (Dependency Injection - DI) هو النواة الهندسية الأكثر شهرة في إطار عمل Angular. بدلاً من أن يقوم المكون بإنشاء نسخة جديدة من الخدمة بنفسه باستخدام new CinemaService() (مما يؤدي لتشتت البيانات وصعوبة الاختبار وتكرار الكائنات في الذاكرة)، نطلب الخدمة كمعامل داخل دالة المنشئ constructor(private cinemaService: CinemaClassicService). يتولى حاقن Angular (Injector) إنشاء كائن مفرد مركزي (Singleton) للخدمة عند استخدام @Injectable({ providedIn: 'root' }) وتمريره لجميع المكونات المشتركة، مما يضمن أن سلة التذاكر وقائمة الأفلام متزامنة وموحدة عبر التطبيق بأكمله.",
    "flow": "تسجيل @Injectable({ providedIn: 'root' }) ⟶ طلب الخدمة في المنشئ constructor(private s: CinemaClassicService) ⟶ حاقن Angular يوفر نسخة وحيدة (Singleton) ⟶ وصول المكون لطرق وبيانات الخدمة بسلاسة",
    "task": "افتح الملف src/app/classic/cinema-classic.service.ts وأنشئ خدمة السينما الكلاسيكية CinemaClassicService المزخرفة بـ @Injectable لإتاحة حقنها المشترك في منشئات مكونات التطبيق.",
    "file": "src/app/classic/cinema-classic.service.ts",
    "code": "export class CinemaClassicService {\n  private cinemaName = 'سينما خطوة الكلاسيكية';\n\n  getCinemaName(): string {\n    return this.cinemaName;\n  }\n}",
    "expected": "export class CinemaClassicService {",
    "reference": "https://angular.dev/guide/di",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومبدأ حقن التبعيات (DI)",
        "explanation": "لو افترضنا أن كل صفحة ومكون في نظام السينما ينشئ خدمته المستقلة الخاصة بـ new CinemaService()، لكان للمقاعد سلة مشتريات ولصفحة الدفع سلة مشتريات منفصلة تماماً، ولن يعلم أي منهما عن الآخر! يحل حقن التبعيات (DI) هذه المعضلة عبر إنشاء 'حاقن مركزي' (Root Injector) يملك نسخة وحيدة موحدة (Singleton). عندما يحتاج أي مكون للخدمة، يطلبها عبر بوابته الرسمية: دالة المنشئ constructor، فيزوده الحاقن بالنسخة المركزية المعتمدة فوراً.",
        "flow": "المكون يحتاج لبيانات السينما ⟶ يطلبها في constructor ⟶ حاقن Angular يتحقق من وجود نسخة مفردة ⟶ تزويد المكون بنفس النسخة المركزية",
        "task": "تأمل كيف يفصل هذا النمط بين مسؤولية إنشاء الكائنات (Instantiation) ومسؤولية استخدامها (Consumption).",
        "benefit": "استوعبت جوهر نمط Singleton وكيف يوحد حقن التبعيات حالة التطبيق."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الزخرف @Injectable وحقن المنشئ الكلاسيكي",
        "explanation": "تتكون الخدمة من صنف TypeScript مسبوق بالزخرف @Injectable({ providedIn: 'root' }) الذي يخبر Angular بتسجيل هذه الخدمة على مستوى التطبيق بالكامل كـ Singleton. ولحقنها كلاسيكياً داخل أي مكون، نكتب داخل منشئ المكون: constructor(private cinemaService: CinemaClassicService) {}. تحدد الكلمة المفتاحية private أو public تلقائياً خاصية داخل المكون، ويقوم TypeScript بتمرير النوع ليسترشد به نظام الحاقن (Token-based injection).",
        "flow": "@Injectable({ providedIn: 'root' }) ⟶ export class CinemaClassicService ⟶ الاستهلاك: constructor(private service: CinemaClassicService)",
        "task": "دقق في تركيبة الخدمة: الزخرف المصدّر، اسم الصنف CinemaClassicService، وطرق جلب البيانات.",
        "benefit": "أتقنت الهيكل القياسي للخدمات القابلة للحقن في معمارية Angular الكلاسيكية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنبني صنف خدمة السينما الكلاسيكية CinemaClassicService داخل الملف src/app/classic/cinema-classic.service.ts لتوفر اسم السينما وبياناتها الموحدة لكافة أجزاء التطبيق.",
        "file": "src/app/classic/cinema-classic.service.ts",
        "code": "export class CinemaClassicService {\n  private cinemaName = 'سينما خطوة الكلاسيكية';\n\n  getCinemaName(): string {\n    return this.cinemaName;\n  }\n}",
        "expected": "export class CinemaClassicService {",
        "task": "عرّف الصنف المصدّر CinemaClassicService داخل ملف src/app/classic/cinema-classic.service.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت خدمة سينما كلاسيكية جاهزة للحقن عبر المنشئ وفق أعلى معايير سوق العمل."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "في التطبيقات الكبيرة، تقدم الخدمة وظائف متنوعة لإدارة المقاعد والأسعار، مثل دالة getTicketPrice(): number { return 85; } أو مصفوفة أسماء الأفلام المعروضة.",
        "task": "جرّب إضافة خاصية private ticketPrice: number = 85; ودالة جلب getTicketPrice(): number داخل الصنف، ولاحظ كيف تحتفظ الخدمة بحالة منطق الأعمال بعيداً عن ملفات واجهة المستخدم.",
        "benefit": "تدربت على تركيز منطق الأعمال وإدارة البيانات الحيوية داخل الخدمات القابلة للحقن وإعادة الاستخدام."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما المعنى الهندسي لخيار { providedIn: 'root' } داخل الزخرف @Injectable()؟",
        "options": [
          "يجعل الخدمة مسجلة في الحاقن الجذري للتطبيق كنسخة مفردة واحدة (Singleton) تشترك فيها كافة المكونات",
          "يقوم بتثبيت الخدمة في المجلد الجذري لنظام التشغيل ويندوز مباشرة",
          "يمنع حقن الخدمة داخل أي مكون إلا بعد موافقة مستخدم الموقع"
        ],
        "correct": 0,
        "benefit": "إجابة عبقرية! providedIn: 'root' يضمن كائناً مفرد كفوءاً ويسمح لـ Angular بإجراء تقليم الشجرة (Tree-shaking) للخدمات غير المستخدمة تلقائياً.",
        "task": "ما المعنى الهندسي لخيار { providedIn: 'root' } داخل الزخرف @Injectable()؟"
      }
    ]
  },
  {
    "id": "ng-classic-12",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "تدفقات RxJS الكلاسيكية: Observables وإلغاء الاشتراك",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "إتقان التعامل مع تدفقات البيانات غير المتزامنة (Observables) في مكتبة RxJS والاشتراك بها، وفهم خطر تسريب الذاكرة (Memory Leaks) وضرورة إغلاق الاشتراكات بـ unsubscribe().",
    "concept": "تعتمد تطبيقات Angular الكلاسيكية على مكتبة البرمجة الارتكاسية RxJS لإدارة كافة الأحداث غير المتزامنة (مثل طلبات HTTP، أحداث نقرات الفأرة، وتدفقات رسائل الخادم في الوقت الفعلي). الـ Observable هو أنبوب تدفق ينبعث منه تيار من البيانات عبر الزمن. لقراءة هذه البيانات، نقوم بالاشتراك subscribe(). ولكن في المكونات الكلاسيكية، إذا اشترك المكون في تدفق مستمر ثم غادر المستخدم الصفحة، يبقى الاشتراك مفتوحاً في الخلفية مستهلكاً للذاكرة والمعالج، وهو ما يُعرف بتسريب الذاكرة (Memory Leak). لذلك، من الضروري حفظ كائن الاشتراك واستدعاء subscription.unsubscribe() عند تدمير المكون في دورة حياة ngOnDestroy.",
    "flow": "تدفق بيانات Observable ⟶ اشتراك صريح بـ .subscribe() ⟶ معالجة القيم المنبعثة ⟶ إلغاء الاشتراك الحتمي بـ .unsubscribe() لمنع تسريب الذاكرة",
    "task": "افتح الملف src/app/classic/rx-demo.ts وابنِ الصنف RxDemo الذي يدير الاشتراك في تدفق أسعار التذاكر مع استدعاء unsubscribe() لإلغاء الاشتراك بأمان.",
    "file": "src/app/classic/rx-demo.ts",
    "code": "export class RxDemo {\n  private sub?: Subscription;\n  ticketPrice: number = 0;\n\n  startListening(price$: Observable<number>): void {\n    this.sub = price$.subscribe((val) => {\n      this.ticketPrice = val;\n    });\n  }\n\n  stopListening(): void {\n    this.sub?.unsubscribe();\n  }\n}",
    "expected": "export class RxDemo {",
    "reference": "https://angular.dev/guide/observables",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية وتدفقات البيانات المستمرة (Observables)",
        "explanation": "فكّر في الـ Observable كبث حي مباشر لقناة سينمائية، وفي الـ subscribe() كتشغيل جهاز التلفاز لاستقبال البث. ما دمت مشتركاً، ستصلك كل لقطة جديدة فور انطلاقها. ولكن ماذا يحدث إذا خرجت من المنزل وتركت التلفاز يعمل؟ ستستمر الكهرباء بالهدر! هذا بالضبط ما يحدث في الذاكرة عند نسيان إلغاء الاشتراك (Unsubscribe) في المكونات الكلاسيكية؛ إذ يستمر الكود بالعمل واستهلاك موارد المتصفح في الخفاء.",
        "flow": "انبعاث بيانات من المصدر ⟶ وصول البيانات للمشترك ⟶ تدمير شاشة العرض ⟶ استدعاء unsubscribe() الحاسم ⟶ تحرير الذاكرة بنجاح",
        "task": "تأمل مخطط التدفق ولاحظ خطورة ترك الاشتراكات مفتوحة دون إغلاق محكم.",
        "benefit": "فهمت طبيعة البرمجة غير المتزامنة بـ RxJS وتجنب الفخ البرمجي الأكبر في Angular: تسريب الذاكرة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة الاشتراك والإلغاء (Subscribe & Unsubscribe Pattern)",
        "explanation": "عند استدعاء observable$.subscribe(...)، يعيد هذا الاستدعاء كائناً من نوع Subscription. نحتفظ بهذا الكائن في متغير داخل الصنف (مثل private sub?: Subscription). وعند الرغبة في التوقف عن الاستماع أو عند مغادرة الصفحة داخل خطاف دورة الحياة ngOnDestroy()، نستدعي فوراً this.sub?.unsubscribe(). هذا الاستدعاء يقطع اتصال القناة ويفك ارتباط الذاكرة بالكامل.",
        "flow": "const sub = stream$.subscribe(callback) ⟶ حفظ المرجع this.sub = sub ⟶ عند الانتهاء: this.sub.unsubscribe()",
        "task": "تفحص كود الصنف: طريقة استقبال التدفق، إسناد الاشتراك للخاصية sub، ودالة التوقف النظيف stopListening.",
        "benefit": "أتقنت النمط القياسي لإدارة اشتراكات RxJS اليدوية في سوق العمل."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنكتب صنف إدارة التدفقات الكلاسيكي RxDemo داخل الملف src/app/classic/rx-demo.ts للاستماع لتدفق أسعار التذاكر مع توفير آلية إلغاء الاشتراك الصريحة.",
        "file": "src/app/classic/rx-demo.ts",
        "code": "export class RxDemo {\n  private sub?: Subscription;\n  ticketPrice: number = 0;\n\n  startListening(price$: Observable<number>): void {\n    this.sub = price$.subscribe((val) => {\n      this.ticketPrice = val;\n    });\n  }\n\n  stopListening(): void {\n    this.sub?.unsubscribe();\n  }\n}",
        "expected": "export class RxDemo {",
        "task": "اكتب صنف RxDemo الكامل داخل ملف src/app/classic/rx-demo.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبقت إدارة دورة حياة اشتراكات RxJS الكلاسيكية بيدك وحميت تطبيقك من تسريب الذاكرة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "في مكتبة RxJS، يمكن تجميع عدة اشتراكات في كائن اشتراك موحد new Subscription() عبر دالة sub.add(...)، أو استخدام معامِلات ارتكاسية متقدمة مثل takeUntilDestroyed() أو take(1) لإلغاء الاشتراك تلقائياً بعد وصول أول قيمة.",
        "task": "فكر كيف يمكنك دمج دالة ngOnDestroy(): void { this.stopListening(); } لضمان أن Angular يستدعي التوقف تلقائياً لحظة تدمير المكون.",
        "benefit": "ربطت مفاهيم RxJS بدورة حياة مكونات Angular (Lifecycle Hooks) لتحقيق أعلى درجات الأمان البرمجي."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو الخطر البرمجي المترتب على نسيان استدعاء unsubscribe() للاشتراكات اليدوية في المكونات الكلاسيكية؟",
        "options": [
          "حدوث تسريب في الذاكرة (Memory Leak) واستمرار تنفيذ الأكواد في الخلفية حتى بعد مغادرة الصفحة",
          "توقف متصفح المستخدم عن تحميل ملفات وتنسيقات CSS نهائياً",
          "تحول المتغيرات الرقمية تلقائياً إلى قيم سالبة"
        ],
        "correct": 0,
        "benefit": "إجابة احترافية ودقيقة! تسريب الذاكرة الناتج عن الاشتراكات المفتوحة هو السبب الأول لبطء وتجمد تطبيقات Angular القديمة.",
        "task": "ما هو الخطر البرمجي المترتب على نسيان استدعاء unsubscribe() للاشتراكات اليدوية في المكونات الكلاسيكية؟"
      }
    ]
  },
  {
    "id": "ng-classic-13",
    "module": "phase-2-classic",
    "phase": "المرحلة الثانية: أساسيات Angular الكلاسيكية الضرورية لسوق العمل",
    "title": "الاستهلاك الآمن في القالب بأنبوب async pipe التلقائي",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "استهلاك تدفقات RxJS مباشرة داخل قوالب HTML باستخدام أنبوب async السحري الذي يتولى الاشتراك التلقائي وإلغاء الاشتراك ذاتياً وحماية التطبيق من تسريب الذاكرة.",
    "concept": "بالرغم من قوة الاشتراكات اليدوية، فإن كتابة subscribe و unsubscribe في كل مكون يستهلك وقتاً وجهداً ويفتح الباب للأخطاء البشرية. هنا يقدم Angular الحل الأمثل والأنظف في عالم RxJS: الأنبوب المدمج async. يتيح لك هذا الأنبوب تمرير الـ Observable مباشرة إلى القالب مثل {{ currentMovie$ | async }}؛ فيقوم الأنبوب بالاشتراك تلقائياً في التدفق عند ظهور العنصر في الشاشة، وتحديث الواجهة فور انبعاث أي قيمة جديدة، والأهم من ذلك: يقوم بإلغاء الاشتراك (unsubscribe) ذاتياً وبشكل تلقائي بمجرد تدمير العنصر أو مغادرة الصفحة، مما يضمن كوداً نظيفاً، مختصراً، وخالياً 100% من تسريب الذاكرة دون كتابة سطر واحد في دورة حياة المكون.",
    "flow": "تدفق currentMovie$ في الصنف ⟶ استهلاكه في القالب بـ {{ currentMovie$ | async }} ⟶ اشتراك تلقائي من Angular ⟶ تحديث حي للواجهة ⟶ إلغاء اشتراك تلقائي عند تدمير القالب",
    "task": "افتح الملف src/app/app.html واستخدم الأنبوب التلقائي async لعرض عنوان الفيلم الحالي المنبعث من التدفق currentMovie$ داخل حاوية ملخص التذكرة.",
    "file": "src/app/app.html",
    "code": "<div class=\"ticket-summary\">العرض المباشر: {{ currentMovie$ | async }}</div>",
    "expected": "{{ currentMovie$ | async }}",
    "reference": "https://angular.dev/guide/pipes/async-pipe",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية وعبقرية الأنبوب التلقائي async",
        "explanation": "تخيل أن لديك مساعداً ذكياً يتكفل بفتح صنبور البيانات عند دخولك الغرفة، وإغلاقه بإحكام في اللحظة التي تخرج فيها! هذا ما يفعله الأنبوب السحري async في قوالب Angular. بدلاً من أن ترهق نفسك بالاشتراك اليدوي في ملف TypeScript ثم القلق الدائم بشأن كتابة unsubscribe في ngOnDestroy، تترك للأنبوب async مهمة إدارة دورة حياة التدفق بالكامل داخل القالب بسطر واحد أنيق.",
        "flow": "تدفق Observable ⟶ أنبوب async يفتتح الاشتراك تلقائياً ⟶ عرض القيمة فور انبعاثها ⟶ إغلاق الاشتراك فورياً عند اختفاء الوسم",
        "task": "لاحظ كيف يختصر أنبوب async عشرات أسطر الكود الروتيني ويزيل خطر تسريب الذاكرة نهائياً.",
        "benefit": "استوعبت القاعدة الذهبية في سوق العمل: تفضيل async pipe على الاشتراكات اليدوية كلما أمكن."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح استهلاك التدفقات بأنبوب async",
        "explanation": "اصطلح مجتمع مطوري Angular على تسمية المتغيرات التي تحتوي تدفقات Observable بوضع علامة الدولار في نهايتها (مثل currentMovie$) لتمييزها بصرياً. داخل القالب، نضع اسم المتغير متبوعاً برمز الأنبوب | ثم الكلمة async: {{ currentMovie$ | async }}. في خلفية المشهد، يستمع الأنبوب للتدفق ويعرض القيمة الحالية، وإذا تغيرت القيمة يطلب من محرك فحص التغيير (Change Detection) تحديث هذا الجزء من الشاشة فوراً.",
        "flow": "{{ [اسم_التدفق$] | async }} ⟶ رعاية كاملة للاشتراك وتحديث الشاشة ذاتياً",
        "task": "تفحص تركيبة السطر: علامة $ في اسم المتغير، رمز الأنبوب |، واسم الأنبوب التلقائي async.",
        "benefit": "أتقنت استخدام الأنبوب الأكثر شهرة واستخداماً في مشاريع Angular الاحترافية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنعرض الآن اسم الفيلم المعروض حالياً في السينما عبر تمرير التدفق currentMovie$ إلى الأنبوب async داخل حاوية الملخص في ملف src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<div class=\"ticket-summary\">العرض المباشر: {{ currentMovie$ | async }}</div>",
        "expected": "{{ currentMovie$ | async }}",
        "task": "أضف عنصر div الخاص بملخص التذكرة والمزود بـ async pipe أعلاه في ملف src/app/app.html ثم اضغط على (شغّل وافحص).",
        "benefit": "أنجزت الاستهلاك التلقائي لتدفقات البيانات بأسلوب احترافي يضمن سلامة الذاكرة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "نمط احترافي شائع جداً في Angular الكلاسيكي هو الجمع بين *ngIf وأنبوب async مع تخزين النتيجة في متغير محلي باسم مستعار عبر الكلمة as: <div *ngIf=\"currentMovie$ | async as movie\">{{ movie }}</div>.",
        "task": "فكر كيف يفيدك حفظ النتيجة بـ as movie في استخدام نفس القيمة داخل عدة عناصر فرعية دون تكرار الاشتراك في التدفق أكثر من مرة.",
        "benefit": "تعلمت أفضل ممارسة معمارية متقدمة (Best Practice) لاستهلاك Observables بـ async as بكفاءة قصوى."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الميزة الجوهرية لاستخدام async pipe في قوالب Angular مقارنة بالاشتراك اليدوي بـ .subscribe()؟",
        "options": [
          "يقوم بالاشتراك التلقائي وإلغاء الاشتراك ذاتياً (Automatic Unsubscribe) عند تدمير المكون لمنع تسريب الذاكرة",
          "يقوم بتغيير نوع قاعدة البيانات على الخادم إلى MongoDB تلقائياً",
          "يلغي الحاجة إلى تنزيل مكتبة TypeScript في بيئة التطوير"
        ],
        "correct": 0,
        "benefit": "إجابة مثالية! أنبوب async هو المعيار القياسي لإدارة دورة حياة اشتراكات التدفقات الارتكاسية في Angular بأمان مطلق.",
        "task": "ما هي الميزة الجوهرية لاستخدام async pipe في قوالب Angular مقارنة بالاشتراك اليدوي بـ .subscribe()؟"
      }
    ]
  },
  {
    "id": "ng-modern-01",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "ثورة الـ Standalone Components والاستغناء عن Modules",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "التحول التاريخي في معمارية Angular من نظام الـ NgModules المعقد إلى المكونات المستقلة (Standalone Components) عبر خاصية standalone: true؛ فهم كيف أصبحت المكونات وحدات ذاتية التبعيات تستورد ما تحتاجه مباشرة في imports، وتبسيط شجرة الاعتماديات وتسريع التحميل الكسول وأداء وقت التصريف.",
    "concept": "في الإصدارات الكلاسيكية من Angular، كان كل مكون مجبراً على الانتماء إلى وحدة NgModule وسيطة تجمع التبعيات وتشاركها، مما خلق مشاكل معمارية شهيرة مثل الملفات المتضخمة، وصعوبة تتبع أصل الأخطاء، وحمل زائد في حزم البناء (Bundle Size). مع انطلاق Angular الحديثة، أصبحت المكونات المستقلة (Standalone Components) هي المعيار الافتراضي والأساسي لتطوير التطبيقات. بوضع خاصية standalone: true في بيانات المكون الوصفية @Component، يصبح المكون كائناً مكتفياً بذاته، يستورد فقط ما يحتاجه داخل مصفوفة imports الخاصة به (سواء كانت مكونات أخرى، أو أنابيب Pipes، أو توجيهات Directives). يتيح هذا النمط للمترجم استبعاد الأكواد غير المستخدمة بكفاءة مذهلة (Tree-shaking)، ويجعل إعادة استخدام المكونات واختبارها أمراً بالغ البساطة والسرعة.",
    "flow": "المكون المستقل بـ standalone: true ⟶ استيراد مباشر للتبعيات في imports: [] ⟶ إقصاء وسيط NgModule ⟶ حزمة بناء خفيفة وأداء متفوق",
    "task": "افتح الملف src/app/app.ts وتأكد من تفعيل خاصية standalone: true داخل زخرف المكون الجذري App لجعله مكوناً مستقلاً بذاته.",
    "file": "src/app/app.ts",
    "code": "@Component({\n  selector: 'app-root',\n  standalone: true,\n  templateUrl: './app.html',\n  styleUrl: './app.css'\n})",
    "expected": "standalone: true",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية والتحول الجوهري نحو الاستقلالية",
        "explanation": "في الأنظمة القديمة، لو احتجت استخدام زر أو بطاقة فيلم في شاشتين مختلفتين، كان عليك التنقل بين وحدات NgModule معقدة ومشاركة الوحدة بالكامل. أما في عالم Standalone الحديث، فكل مكون يشبه وحدة Lego مستقلة تماماً: يحمل في زخرفه تصريح standalone: true، ويعلن صراحة عما يحتاجه فقط. هذا الاستغناء الكامل عن وسيط الـ NgModule يلغي الطبقات الإضافية، ويسهل قراءة الكود وصيانته بنسبة تفوق 70%، ويمهّد الطريق للتحميل الكسول الذكي للمكونات الفردية دون الحاجة لتحميل وحدات ضخمة.",
        "flow": "فصل المكون عن NgModule ⟶ تعيين standalone: true ⟶ استيراد التبعيات محلياً ⟶ استقلالية معمارية كاملة",
        "task": "تأمل الفرق الجوهري بين المكون التابع لوحدة والمكون المستقل، ولاحظ كيف يبسط standalone: true هندسة تطبيق السينما.",
        "benefit": "استوعبت النقلة النوعية لمعمارية Standalone وكيف تحرر المطور من تعقيدات NgModules وتسرّع بناء التطبيقات الحديثة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح زخرف المكون المستقل @Component",
        "explanation": "لكي يصبح أي مكون مستقلاً في Angular الحديثة، نضيف خاصية standalone: true داخل كائن الإعدادات الممرر لزخرف @Component المستورد من '@angular/core'. وعندما يكون المكون مستقلاً، يُسمح له بامتلاك مصفوفة imports: [] الخاصة به مباشرة داخل نفس الزخرف لاستيراد أي مكون فرعي أو منقٍ أو توجيه يحتاجه قالبه، دون وسيط خارجي. بالإضافة إلى selector (المحدد للوسم في HTML) و templateUrl (ملف الهيكل) و styleUrl (ملف التنسيق).",
        "flow": "@Component({ selector: '...', standalone: true, imports: [...], templateUrl: '...', styleUrl: '...' }) ⟶ export class App {}",
        "task": "دقق في تركيبة الزخرف: تحديد standalone: true مع محدد المكون ومسارات القالب والتنسيق لإنشاء مكون مستقل متكامل.",
        "benefit": "أتقنت البنية النحوية والمواصفات الرسمية لتعريف Standalone Component في Angular الحديثة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بضبط المكون الجذري App في ملف src/app/app.ts ليعمل بنمط Standalone Component الصريح عبر تفعيل standalone: true مع ربط ملف القالب والتنسيقات الخاصة بمنصة السينما.",
        "file": "src/app/app.ts",
        "code": "@Component({\n  selector: 'app-root',\n  standalone: true,\n  templateUrl: './app.html',\n  styleUrl: './app.css'\n})",
        "expected": "standalone: true",
        "task": "حدّث زخرف @Component في ملف src/app/app.ts ليشمل خاصية standalone: true، ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبقت بيدك خاصية standalone: true وحولت المكون الجذري لتطبيق سينما خطوة إلى مكون مستقل حديث بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "في المكونات المستقلة التي تستخدم توجيهات أو مكونات أخرى في قوالبها، نستطيع إضافة مصفوفة imports: [] مباشرة داخل @Component. جرّب إضافة مصفوفة imports: [CommonModule] إلى الزخرف وشاهد كيف يستورد المكون تبعياته بنفسه دون الحاجة لأي ملف NgModule وسيط.",
        "task": "أضف imports: [CommonModule] داخل زخرف @Component وتأكد من استيراد CommonModule من '@angular/common'.",
        "benefit": "تدرّبت عملياً على كيفية تزويد المكون المستقل بتبعياته عبر مصفوفة imports المباشرة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الميزة الأساسية للـ Standalone Components في Angular الحديثة؟",
        "options": [
          "تجعل كل مكون مستقلاً بذاته دون الحاجة لتعريفه في NgModule",
          "تمنع تعديل ملفات CSS الخاصة بالقالب",
          "تحذف ملف package.json تلقائياً من المشروع"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! المكونات المستقلة تلغي الحاجة لـ NgModule وتجعل المكون مكتفياً بذاته وذا تبعيات واضحة ومباشرة.",
        "task": "ما الميزة الأساسية للـ Standalone Components في Angular الحديثة؟"
      }
    ]
  },
  {
    "id": "ng-modern-02",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "نقطة البداية الحديثة: bootstrapApplication و appConfig",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "استكشاف نقطة انطلاق التطبيق الحديثة في Angular عبر دالة bootstrapApplication المستوردة من platform-browser وكائن الإعدادات appConfig؛ التخلي النهائي عن platformBrowserDynamic().bootstrapModule(AppModule) وتقليص زمن الإقلاع وحجم حزمة التشغيل الابتدائية.",
    "concept": "في معمارية Angular الكلاسيكية، كان إقلاع التطبيق يتطلب استدعاء platformBrowserDynamic().bootstrapModule(AppModule) من مكتبة platform-browser-dynamic، مما يفرض تنزيل محرك ترجمة الـ NgModules بالكامل في المتصفح قبل إظهار أي عنصر في الصفحة. في Angular الحديثة، حلّت دالة bootstrapApplication محل تلك الآلية القديمة بالكامل. تأخذ هذه الدالة المكون المستقل الجذري مباشرة (مثل App) كمعامل أول، وكائن إعدادات التطبيق ApplicationConfig كمعامل ثانٍ (مثل appConfig). يحتوي appConfig على مزودي الخدمات العامة (Providers) مثل التوجيه provideRouter وعميل الشبكة provideHttpClient دون الحاجة لأي موديول. هذه النقلة تقلل حجم حزمة الجافاسكريبت الابتدائية بنسبة ملحوظة، وتسرع وقت التحميل الأولي (Time to Interactive) بشكل جذري.",
    "flow": "ملف src/main.ts ⟶ استدعاء bootstrapApplication(App, appConfig) ⟶ تحميل المكون الجذري مباشرة ⟶ انطلاق منصة سينما خطوة",
    "task": "افتح الملف src/main.ts واكتب أمر إقلاع تطبيق السينما الحديث باستخدام دالة bootstrapApplication(App, appConfig) مع معالجة الأخطاء.",
    "file": "src/main.ts",
    "code": "bootstrapApplication(App, appConfig).catch((err) => console.error(err));",
    "expected": "bootstrapApplication(App, appConfig)",
    "reference": "https://angular.dev/guide/bootstrap",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: إقلاع التطبيق فائق الخفة والسرعة",
        "explanation": "فكر في إقلاع التطبيق كإدارة محرك سيارة: في المعمارية الكلاسيكية، كان المحرك يبدأ بفحص صناديق ومستودعات NgModules ضخمة قبل أن يبدأ أول بكسل بالظهور على الشاشة. أما مع bootstrapApplication، فالأمر يشبه الضغط على زر التشغيل الذكي مباشرة: يرتبط المحاكي بالمكون الجذري Standalone فوراً، حاملاً معه إعدادات appConfig المركزية فقط. هذا يمنح زوار تطبيق سينما خطوة تجربة تصفح فورية وانسيابية من اللحظة الأولى.",
        "flow": "بدء التشغيل ⟶ استدعاء bootstrapApplication ⟶ قراءة المزودات من appConfig ⟶ تصيير واجهة السينما فورياً",
        "task": "تأمل مسار الإقلاع المباشر في مخطط التدفق وقارنه بنظام الوحدات القديم للتعرف على سرعة الانطلاق الحديثة.",
        "benefit": "فهمت كيف ترفع دالة bootstrapApplication كفاءة إقلاع التطبيقات وتختزل خطوات التشغيل في سطر واحد نظيف."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة bootstrapApplication وكائن appConfig",
        "explanation": "تُستورد دالة bootstrapApplication من الحزمة '@angular/platform-browser'، وتقبل وسيطين أساسيين:\n1) المكون الجذري المستقل (Root Component): مثل كلاس App المستورد من './app/app'.\n2) كائن إعدادات التطبيق (appConfig): من نوع ApplicationConfig المستورد من '@angular/core'، والذي يحتوي على مصفوفة providers لتسجيل الخدمات على مستوى التطبيق بالكامل (مثل provideRouter و provideHttpClient).\nوتُرجع الدالة Promise يمكن إضافة .catch((err) => console.error(err)) له لالتقاط أي خطأ وقت بدء التشغيل.",
        "flow": "bootstrapApplication(RootComponent, { providers: [...] }).catch(errHandler)",
        "task": "لاحظ المعاملات الممررة لدالة bootstrapApplication وكيفية تمرير كائن الإعدادات appConfig كمعامل ثانٍ لتوفير الخدمات المركزية.",
        "benefit": "أتقنت التركيب النحوي الدقيق لملف الإقلاع الحديث وفهمت دور كل جزء في دورة حياة بدء التطبيق."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بكتابة كود الإقلاع الحديث لتطبيق سينما خطوة في ملف src/main.ts باستدعاء bootstrapApplication(App, appConfig) مع معالجة أخطاء الإقلاع في الكونسول.",
        "file": "src/main.ts",
        "code": "bootstrapApplication(App, appConfig).catch((err) => console.error(err));",
        "expected": "bootstrapApplication(App, appConfig)",
        "task": "اكتب سطر استدعاء bootstrapApplication(App, appConfig) في ملف src/main.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أقلعت تطبيق السينما بالمعمارية القياسية الحديثة المعتمدة رسمياً في أحدث إصدارات Angular."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.config.ts واستكشف مصفوفة providers الموجودة فيه. في المشاريع الكبيرة، هذا هو المكان الذي نضع فيه توفير التوجيه provideRouter(routes) وتهيئة الاتصال بالسيرفر. جرّب الاطلاع على كائن ApplicationConfig ولاحظ كيف يحل محل مصفوفة providers التي كانت في AppModule.",
        "task": "تأمل ملف src/app/app.config.ts وتأكد من فهمك لكيفية تمرير المزودات المركزية للتطبيق عبر appConfig.",
        "benefit": "أدركت العلاقة المعمارية بين main.ts و app.config.ts كبديل حديث ومنظم عن مصفوفات AppModule القديمة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الدالة الحديثة المستخدمة لإقلاع تطبيق Standalone من main.ts؟",
        "options": [
          "دالة bootstrapApplication من مكتبة platform-browser",
          "دالة platformBrowserDynamic().bootstrapModule() القديمة",
          "دالة runAngularApplication() في محرك المتصفح"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! دالة bootstrapApplication هي المدخل القياسي والحديث لإقلاع تطبيقات Angular المستقلة.",
        "task": "ما هي الدالة الحديثة المستخدمة لإقلاع تطبيق Standalone من main.ts؟"
      }
    ]
  },
  {
    "id": "ng-modern-03",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "نظام التحكم بالتدفق الحديث: البديل الصريح لـ *ngIf بـ @if",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "الانتقال إلى نظام التحكم بالتدفق المدمج في مترجم Angular الحديث عبر كتل @if و @else؛ التخلص من التوجيه الهيكلي الكلاسيكي *ngIf وتعقيدات ng-template، مع تحقيق سرعة استثنائية في تقييم الشروط بدون الحاجة لاستيراد CommonModule.",
    "concept": "لعقد كامل، كان مطورو Angular يعتمدون على التوجيه الهيكلي *ngIf لإظهار العناصر وإخفائها شرطياً. ورغم فاعليته، إلا أن صياغة الشروط المعقدة مع البدائل كانت تتطلب قوالب غير مرئية ng-template واستدعاء let templateRef، فضلاً عن وجوب استيراد CommonModule في كل مكون. قدّمت Angular الحديثة نظام تدفق تحكم ثورياً مدمجاً في صلب المترجم (Built-in Control Flow). تتيح صيغة @if (condition) { ... } @else { ... } كتابة شروط منطقية واضحة وبديهية تشبه بنية لغات البرمجة الأصلية تماماً. هذا النظام يتم تحليله ومعالجته وقت الترجمة بدقة فائقة، مما يوفر أماناً نوعياً دقيقاً (Type Narrowing) داخل القالب، ويقلل زمن معالجة شجرة الـ DOM، ويجعل واجهات تطبيق السينما أكثر سرعة ونقاءً.",
    "flow": "تقييم شرط totalPrice() >= 200 ⟶ تفعيل كتلة @if وعرض شارة الخصم ⟶ أو التحول التلقائي لكتلة @else ⟶ تحديث ذري للـ DOM",
    "task": "افتح الملف src/app/app.html واستخدم كتلة @if (totalPrice() >= 200) مع كتلة @else لعرض شارة خصم الشحن المجاني أو رسالة الترقية للـ VIP.",
    "file": "src/app/app.html",
    "code": "@if (totalPrice() >= 200) {\n  <span class=\"badge discount\">خصم خاص مؤهل للشحن المجاني!</span>\n} @else {\n  <span class=\"badge normal\">أضف تذاكر بقيمة {{ 200 - totalPrice() }} للحصول على ميزة VIP</span>\n}",
    "expected": "@if (totalPrice() >= 200)",
    "reference": "https://angular.dev/guide/templates/control-flow#if-block",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية ومقارنة @if مع *ngIf الكلاسيكي",
        "explanation": "في الطريقة الكلاسيكية القديمة، إذا أردت عرض بديل لشرط معين، كنت مضطراً لكتابة وسم معقد: <div *ngIf=\"condition; else elseBlock\"> ثم إنشاء <ng-template #elseBlock> منفصل في أسفل الصفحة، مما يجعل متابعة القالب مربكة وشاقة. أما مع نظام @if الحديث، فقد أصبحت القوالب تُقرأ بسلاسة تشبه كود TypeScript الخالص: نكتب @if للشاشات الأساسية و @else للشاشات البديلة مباشرة داخل نفس الكتلة، دون أي قوالب وسيطة وبدون أي استيرادات إضافية.",
        "flow": "@if (شرط السعر) ⟶ [محتوى الخصم] ⟶ @else ⟶ [محتوى الترقية] ⟶ قالب نظيف وسهل القراءة",
        "task": "تأمل انسيابية القراءة في مخطط التدفق ولاحظ اختفاء وسوم ng-template المعقدة لصالح كتل واضحة ومباشرة.",
        "benefit": "أدركت التفوق الهندسي لكتل @if الحديثة في تحسين مقروئية وصيانة قوالب Angular المعقدة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح بنية كتلة @if و @else الشرطية",
        "explanation": "تتكون كتلة التحكم الحديثة من الكلمة المفتاحية @if متبوعة بالأقواس الدائرية (condition) التي تحتوي على التعبير المنطقي أو استدعاء الدالة/الإشارة. يتبع الشرط قوس معقوف { يحوي عناصر الـ HTML المراد تصييرها عند تحقق الشرط. لإضافة حالة بديلة، نكتب @else يتبعها مباشرة قوس معقوف { يحوي عناصر البديل. كما يمكن استخدام @else if (otherCondition) للشروط المتعددة. كل هذه الكتل يفهمها مترجم Angular مباشرة دون الحاجة لأي توجيه خارجي.",
        "flow": "@if (شرط منطقي) { كود HTML } @else { كود بديل }",
        "task": "دقق في مكان الأقواس الدائرية للشرط والأقواس المعقوفة لمحتوى القالب، وتأكد من الترابط النظيف بين @if و @else.",
        "benefit": "أتقنت القواعد النحوية الدقيقة لكتابة شروط @if و @else في قوالب Angular الحديثة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بإضافة منطق خصم حجز التذاكر في قالب منصة السينما src/app/app.html؛ سنفحص إجمالي السعر عبر @if (totalPrice() >= 200) لعرض شارة خصم التذاكر، أو عرض رسالة توضح المبلغ المتبقي عبر @else.",
        "file": "src/app/app.html",
        "code": "@if (totalPrice() >= 200) {\n  <span class=\"badge discount\">خصم خاص مؤهل للشحن المجاني!</span>\n} @else {\n  <span class=\"badge normal\">أضف تذاكر بقيمة {{ 200 - totalPrice() }} للحصول على ميزة VIP</span>\n}",
        "expected": "@if (totalPrice() >= 200)",
        "task": "أضف كتلة @if و @else أعلاه داخل ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت أول شرط تحكم بالتدفق حديث في تطبيق السينما وتأكدت من عمله بكفاءة دون الحاجة لـ CommonModule."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يدعم نظام التحكم الحديث أيضاً كتلة @else if للشروط المتعددة. جرّب إضافة شرط وسيط مثل: @else if (totalPrice() >= 100) { <span class=\"badge normal\">خصم نصفي متاح</span> } بين كتلة @if و @else، وشاهد كيف تصبح إدارة الشروط المتعددة في منتهى البساطة والنقاء.",
        "task": "أضف شرط @else if اختياري في القالب ولاحظ مرونة كتل التحكم وتكاملها المتسلسل.",
        "benefit": "تدرّبت على التعامل مع الشروط المتعددة المتداخلة باحترافية وسلاسة تامة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الذي يميز كتل @if الحديثة عن التوجيه الكلاسيكي *ngIf؟",
        "options": [
          "مدمجة في المترجم مباشرة، ولا تتطلب استيراد CommonModule، وأسرع في الأداء",
          "لا تقبل إلا القيم والأرقام الموجبة فقط",
          "لا يمكن دمجها مع كتل @else أو @else if"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! كتل @if مدمجة بالكامل في صلب المترجم ومحسنة للأداء العالي دون أي اعتماديات خارجية.",
        "task": "ما الذي يميز كتل @if الحديثة عن التوجيه الكلاسيكي *ngIf؟"
      }
    ]
  },
  {
    "id": "ng-modern-04",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "التكرار الحديث فائق السرعة: كتل @for وإلزامية track",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "احتراف كتل التكرار الحديثة @for في قوالب Angular مع فرض تعبير track الإلزامي؛ استيعاب سر تفوقها على *ngFor الكلاسيكي بعشرة أضعاف في سرعة تحديث القوائم الضخمة، وحماية الأداء من إعادة تصيير شجرة الـ DOM غير الضرورية عبر تعقب هوية العناصر الفريدة.",
    "concept": "في الأنظمة الكلاسيكية، كان المطورون يكررون عناصر المصفوفات عبر التوجيه الهيكلي *ngFor. وكانت المشكلة الكبرى أن تعقب العناصر بـ trackBy كان اختيارياً وغالباً ما يتجاهله المطورون، مما يتسبب في إعادة بناء كامل عناصر الـ DOM في الصفحة عند إضافة عنصر واحد أو تحديثه، مسبباً بطئاً فادحاً في واجهات المستخدم. في نظام التحكم بالتدفق الحديث، صممت Angular كتلة @for مع جعل تعبير التعقب track إلزامياً وقت التصريف (Compile-time requirement)؛ فإذا نسيت كتابة track، فلن يقبل المترجم الكود على الإطلاق! باستخدام track movie.id، يربط Angular كل صف في القائمة بهوية فريدة مستقرة؛ وعند حدوث أي تعديل أو ترتيب في مصفوفة الأفلام، يقوم المحرك فقط بتحريك أو تحديث العنصر المعني ذرياً دون لمس باقي عناصر الصفحة، محققاً قفزة تصل إلى 90% في سرعة معالجة القوائم.",
    "flow": "مصفوفة أفلام السينما ⟶ كتلة @for مع تعقب track movie.id ⟶ رصد التغيرات الذرية ⟶ تحديث العنصر المتغير فقط في DOM",
    "task": "افتح الملف src/app/app.html وكرر قائمة أفلام السينما باستخدام كتلة @for (movie of movies; track movie.id) لعرض العنوان ووقت العرض.",
    "file": "src/app/app.html",
    "code": "@for (movie of movies; track movie.id) {\n  <div class=\"movie-pill\">\n    <b>{{ movie.title }}</b>\n    <small>يبدأ {{ movie.time }}</small>\n  </div>\n}",
    "expected": "@for (movie of movies; track movie.id)",
    "reference": "https://angular.dev/guide/templates/control-flow#for-block",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: لماذا أصبح track إلزامياً في @for؟",
        "explanation": "تخيل شاشة سينما تعرض 100 فيلم متوفر، وتم حجز تذكرة واحدة في فيلم معين فتغير وقته. في النظام الكلاسيكي بدون trackBy، كان المتصفح يقوم بحذف وتدمير الـ 100 بطاقة وإعادة بنائها من الصفر! أما مع كتلة @for وإلزامية track movie.id، يعرف محرك Angular بدقة متناهية أن البطاقة رقم 1 ورقم 2 لم تتغيرا، فيقوم فقط بتحديث البطاقة التي تغير وقتها في أجزاء من الميلي ثانية. هذا الفرق هو ما يجعل تطبيقات Angular الحديثة فائقة النعومة وتستجيب في لمح البصر حتى مع آلاف العناصر.",
        "flow": "تعديل مصفوفة ⟶ فحص مفاتيح track ⟶ مطابقة الهويات السابقة ⟶ تحديث موضعي دقيق للـ DOM",
        "task": "تأمل مخطط التدفق ولاحظ كيف يحمي مفتاح التعقب المتصفح من إهدار الذاكرة وإعادة رسم العناصر الثابتة.",
        "benefit": "استوعبت السبب الهندسي وراء إلزامية تعبير track ودوره في تحقيق أعلى معايير الأداء والسرعة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح بنية كتلة @for وتعبير التعقب track",
        "explanation": "تتبع بنية كتلة @for الصياغة التالية:\n@for (item of items; track item.id) {\n  <!-- قالب العنصر -->\n}\nحيث يمثل item المتغير المؤقت لكل عنصر أثناء الدوران، و items المصفوفة المصدرية. وتأتي الفاصلة المنقوطة (;) لتفصل بين تكرار المصفوفة وتعبير track الإلزامي. يُفضل دائماً استخدام معرف فريد مثل movie.id أو movie.slug. وفي حال كانت المصفوفة نصوصاً أو أرقاماً بدائية لا تملك معرفاً فريداً، يمكن استخدام العنصر نفسه كمعقب track item.",
        "flow": "@for (عنصر of مصفوفة; track مفتاح_فريد) { محتوى HTML القابل للتكرار }",
        "task": "دقق في الفصل بالفاصلة المنقوطة بين (movie of movies) وتعبير (track movie.id) داخل قوسي كتلة @for.",
        "benefit": "أتقنت البنية النحوية الصحيحة لكتابة حلقات التكرار الحديثة وفرض معايير الأداء الصارمة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بعرض جدول عروض الأفلام الحالية في منصة سينما خطوة؛ سنكتب كتلة @for داخل ملف src/app/app.html لتكرار عناصر movies مع تعقب فريد بـ track movie.id وعرض عنوان الفيلم ووقت انطلاقه داخل وسم movie-pill.",
        "file": "src/app/app.html",
        "code": "@for (movie of movies; track movie.id) {\n  <div class=\"movie-pill\">\n    <b>{{ movie.title }}</b>\n    <small>يبدأ {{ movie.time }}</small>\n  </div>\n}",
        "expected": "@for (movie of movies; track movie.id)",
        "task": "اكتب كتلة @for أعلاه داخل ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت قائمة تكرار حديثة فائقة الأداء في تطبيق السينما تتبع أفضل الممارسات الهندسية الرسمية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "توفر كتل @for متغيرات ضمنية مفيدة جداً يمكن استخراجها بسهولة، مثل: $index (رقم الفهرس بدءاً من 0)، و $first (هل هو العنصر الأول)، و $count (العدد الإجمالي). جرّب تعديل حلقة التكرار إلى: @for (movie of movies; track movie.id; let i = $index) ثم اعرض الفهرس داخل البطاقة: {{ i + 1 }}.",
        "task": "أضف let i = $index داخل قوسي @for واعرض رقم ترتيب الفيلم أمام عنوانه في القالب.",
        "benefit": "اكتشفت المتغيرات الضمنية السياقية ($index, $first, $count) التي تسهل ترقيم وتمييز عناصر القوائم."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "لماذا يعتبر تعبير track إلزامياً داخل كتل @for في Angular؟",
        "options": [
          "لتمكين المحرك من تتبع هوية كل عنصر بدقة وتحديث ما تغير فقط بأعلى كفاءة",
          "لترتيب عناصر المصفوفة أبجدياً قبل عرضها",
          "لتحديد موعد انتهاء تشغيل حلقة التكرار في المتصفح"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! إلزامية track تضمن الحفاظ على الأداء العالي ومنع إعادة إنشاء عناصر الـ DOM غير المتغيرة.",
        "task": "لماذا يعتبر تعبير track إلزامياً داخل كتل @for في Angular؟"
      }
    ]
  },
  {
    "id": "ng-modern-05",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "معالجة الحالات الفارغة بأناقة: كتلة @empty",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "عرض محتوى بديل تلقائياً عند فراغ مصفوفة البيانات عبر كتلة @empty المدمجة مع @for دون الحاجة لتوجيهات شرطية خارجية.",
    "concept": "في معمارية Angular الحديثة، تتكامل كتلة @empty مباشرة مع حلقة التكرار @for لتقديم حل أصيل ومعياري لمعالجة القوائم الفارغة. في السابق، كان المطورون يضطرون لكتابة فحص شرطي منفصل مثل *ngIf=\"movies.length === 0\" أو @if (movies.length === 0) بجانب حلقة التكرار، مما يكرر فحص طول المصفوفة ويزيد من حجم القالب وتعقيده. أما الآن، يقوم مترجم Angular أثناء تقييم @for بفحص عدد عناصر المجموعة تلقائياً؛ فإذا كانت المصفوفة خالية من العناصر (أو null/undefined)، يقوم بتصيير محتوى كتلة @empty مباشرة وبكفاءة فائقة دون أي هدر في دورات فحص التغيير (Change Detection)، مما يوفر تجربة مستخدم (UX) فائقة السلاسة ورسائل توجيهية فورية عند نفاذ العروض أو فراغ نتائج البحث.",
    "flow": "مصفوفة الأفلام فارغة ⟶ تنشيط كتلة @empty مباشرة ⟶ رسالة اعتذار أنيقة",
    "task": "أضف كتلة @empty داخل تكرار الأفلام لعرض إشعار بعدم توفر عروض.",
    "file": "src/app/app.html",
    "code": "@for (movie of movies; track movie.id) {\n  <div class=\"movie-pill\"><b>{{ movie.title }}</b></div>\n} @empty {\n  <p class=\"empty-notice\">لا توجد عروض أفلام متاحة في هذا التوقيت.</p>\n}",
    "expected": "@empty {",
    "reference": "https://angular.dev/guide/templates/control-flow#empty-block",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق كتلة @empty",
        "explanation": "في منصات السينما، قد تخلو صالة العرض من الأفلام في فترات الصيانة أو في الساعات المتأخرة بعد انتهاء الحفلات. بدلاً من ترك واجهة المستخدم فارغة بصمت يُربك العميل، تتيح كتلة @empty المدمجة إظهار رسالة توضيحية فورية وأنيقة. الفارق المعماري الجوهري أن @empty ليست توجيهاً منفصلاً، بل هي امتداد مباشر لحلقة @for يديره المترجم نفسه في خطوة واحدة دون فحص إضافي لطول المصفوفة.",
        "flow": "مصفوفة movies فارغة ([]) ⟶ فحص فوري ومدمج بالمترجم ⟶ تخطي كود التكرار ⟶ تفعيل وتصيير كتلة @empty ⟶ ظهور إشعار لا توجد عروض أفلام",
        "task": "تأمل كيف تتكامل كتلة @empty مع @for ككتلة متصلة واحدة تقدم تجربة مستخدم (UX) فائقة السلاسة عند غياب البيانات.",
        "benefit": "استوعبت الأفضلية المعمارية لكتلة @empty المدمجة مقارنة بالفحص اليدوي لطول المصفوفات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لكتلة التكرار مع المعالجة الفارغة @empty",
        "explanation": "تتصل كتلة @empty مباشرة بعد قوس الإغلاق الخاص بكتلة @for. لا تحتاج @empty إلى تمرير أي أقواس دائرية أو شروط، لأن شرطها الوحيد والبديهي هو 'فراغ المجموعة المكررة'. محتوى القالب بداخلها يمكن أن يحتوي على أي عناصر HTML، أيقونات، أو مكونات فرعية أخرى لإبلاغ المستخدم بحالة الفراغ أو اقتراح إجراءات بديلة.",
        "flow": "@for (العنصر of المصفوفة; track المفتاح) { قالب العنصر } ⟶ مسافة ⟶ @empty ⟶ { قالب الحالة الفارغة }",
        "task": "حلل التنسيق النحوي: فتح وإغلاق كتلة @for يليها مباشرة الرمز @empty وقوساه المعقوفان { }.",
        "benefit": "أتقنت كتابة الصيغة النحوية السليمة لـ @empty وتجنبت الأخطاء الشائعة مثل وضع أقواس شرطية بعدها."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بكتابة حلقة تكرار الأفلام الحديثة مع كتلة @empty التابعة لها في ملف src/app/app.html. إذا كانت مصفوفة movies تحتوي على عناصر ستظهر شارات الأفلام، وإذا كانت فارغة فستظهر رسالة التنبيه الأنيقة.",
        "file": "src/app/app.html",
        "code": "@for (movie of movies; track movie.id) {\n  <div class=\"movie-pill\"><b>{{ movie.title }}</b></div>\n} @empty {\n  <p class=\"empty-notice\">لا توجد عروض أفلام متاحة في هذا التوقيت.</p>\n}",
        "expected": "@empty {",
        "task": "اكتب كود التكرار مع كتلة @empty في ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "نجحت في دمج حلقة التكرار الحديثة مع معالجة الحالات الفارغة بأفضل ممارسات Angular الرسمية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.ts وجرّب إفراغ مصفوفة movies بجعلها مصفوفة خالية movies = []، ثم شاهد كيف تختفي شارات الأفلام فوراً وتظهر رسالة كتلة @empty 'لا توجد عروض أفلام متاحة في هذا التوقيت' في شاشة المعاينة.",
        "task": "اجعل movies = [] في src/app/app.ts ولاحظ ظهور محتوى @empty التلقائي في المعاينة الحية.",
        "benefit": "عاينت عملياً التحول اللحظي للمحرك بين تكرار العناصر وتصيير القالب الفارغ."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "متى يتم إظهار محتوى كتلة @empty التابعة لـ @for؟",
        "options": [
          "عندما تكون المصفوفة المعروضة فارغة لا تحتوي على أي عناصر",
          "عند انقطاع الإنترنت فقط",
          "عندما يضغط المستخدم زر الحذف"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة وصحيحة! كتلة @empty تُصيّر تلقائياً متى كانت المصفوفة أو المجموعة فارغة تماماً (أو غير معرفة)، مما يغني تماماً عن استخدام شروط إضافية مثل *ngIf أو @if منفصل.",
        "task": "متى يتم إظهار محتوى كتلة @empty التابعة لـ @for؟"
      }
    ]
  },
  {
    "id": "ng-modern-06",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "التبديل متعدد الخيارات الحديث: @switch و @case و @default",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "التبديل متعدد الفروع بـ @switch و @case مع كتلة @default البديلة لعرض حالة حجز التذاكر بأسلوب حديث وأداء عالي واستغناء تام عن CommonModule.",
    "concept": "في الإصدارات الكلاسيكية لـ Angular، كانت معالجة السيناريوهات متعددة الحالات تتطلب استخدام التوجيه السمي [ngSwitch] مع التوجيهات الهيكلية *ngSwitchCase و *ngSwitchDefault، وهو ما كان يفرض استيراد CommonModule واستخدام عناصر حاوية مصطنعة مثل <ng-container> بصيغة ثقيلة وبطيئة في فحص التغيير. في Angular 17+، تم دمج نظام @switch مباشرة في المترجم الأساسي بنفس منطق لغة TypeScript المألوف: يُقيَّم التعبير المفحوص @switch (bookingStatus) مرة واحدة فقط، ثم يُوجَّه التنفيذ للكتلة المتطابقة @case ('CONFIRMED') مباشرة. وتتميز كتل @switch الحديثة بأنها لا تدعم التسرب (No fall-through)، مما يلغي الحاجة تماماً لكتابة أوامر break، مع توفير خيار أمان افتراضي بكتلة @default لأي قيمة غير متوقعة.",
    "flow": "قراءة bookingStatus ⟶ توجيه للـ @case المناسبة ⟶ عرض بطاقة الحالة",
    "task": "استخدم كتلة @switch (bookingStatus) لعرض شارة الحالة المناسبة.",
    "file": "src/app/app.html",
    "code": "@switch (bookingStatus) {\n  @case ('CONFIRMED') { <span class=\"badge normal\">الحجز مؤكد وجاهز</span> }\n  @case ('PENDING') { <span class=\"badge discount\">في انتظار الدفع</span> }\n  @default { <span class=\"badge\">حالة الحجز غير محددة</span> }\n}",
    "expected": "@switch (bookingStatus)",
    "reference": "https://angular.dev/guide/templates/control-flow#switch-block",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق التبديل الشرطي المتعدد @switch",
        "explanation": "في أنظمة حجز السينما، تمر التذكرة بحالات متعددة: 'CONFIRMED' (مؤكد)، 'PENDING' (في انتظار الدفع)، 'CANCELLED' (ملغي)، أو حالات غير متوقعة. استخدام سلاسل طويلة من @if و @else if يصبح فوضوياً وصعب الصيانة. كتلة @switch الحديثة تقدم حلاً هندسياً أنيقاً يقيّم المتغير مرة واحدة ويوجهه مباشرة إلى الفرع المطابق @case بسرعة فائقة، مع ضمان وجود مخرج آمن عبر كتلة @default البديلة إذا لم تتطابق أي حالة.",
        "flow": "قيمة bookingStatus ⟶ فحص الحالات ⟶ مطابقة 'CONFIRMED' تظهر شارة مؤكد ⟶ مطابقة 'PENDING' تظهر شارة الانتظار ⟶ غير ذلك تظهر شارة @default",
        "task": "تأمل كيف ينظم @switch الفروع المتعددة بحرية ووضوح، وبدون الحاجة لأي توجيهات خارجية أو وسوم ng-container مصطنعة.",
        "benefit": "فهمت الفارق المعماري بين @switch الحديث والتوجيه الكلاسيكي ngSwitch ومدى نقاء الكود الناتج."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لكتل @switch و @case و @default",
        "explanation": "تبدأ البنية بالكلمة @switch مع القيمة المفحوصة بين قوسين دائريين (bookingStatus). داخل الكتلة، يُعرّف كل فرع باستخدام @case متبوعة بالقيمة المستهدفة بين قوسين دائريين ('CONFIRMED') ثم كتلة القالب بين قوسين معقوفين { }. وأخيراً تأتي كتلة @default { } كخيار احتياطي دون أقواس دائرية. تتميز Angular بأنها لا تدعم التسرب (No fall-through)، أي أنك لست بحاجة لكتابة break كما في JavaScript، فالتنفيذ يتوقف تلقائياً عند أول حالة مطابقة.",
        "flow": "@switch (المتغير) { @case (القيمة_1) { قالب_1 } @case (القيمة_2) { قالب_2 } @default { قالب_احتياطي } }",
        "task": "فكك عناصر الصيغة: القوسان الدائريان بعد @switch و @case، والكتلة المستقلة لكل خيار، وغياب الحاجة لكلمة break.",
        "benefit": "أتقنت القواعد النحوية الصارمة لكتابة كتل @switch الحديثة مع حفظ سلامة الأنواع (Type Safety)."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة منطق عرض شارات حالة الحجز داخل ملف src/app/app.html باستخدام كتلة @switch المدمجة، مع تغطية حالتي التأكيد والانتظار والفرع الافتراضي @default.",
        "file": "src/app/app.html",
        "code": "@switch (bookingStatus) {\n  @case ('CONFIRMED') { <span class=\"badge normal\">الحجز مؤكد وجاهز</span> }\n  @case ('PENDING') { <span class=\"badge discount\">في انتظار الدفع</span> }\n  @default { <span class=\"badge\">حالة الحجز غير محددة</span> }\n}",
        "expected": "@switch (bookingStatus)",
        "task": "اكتب كود التبديل @switch في ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبقت بنجاح بنية التبديل الحديثة لعرض الحالات المتعددة في واجهة سينما خطوة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.ts وغيّر قيمة المتغير bookingStatus إلى 'PENDING' وشاهد كيف تتحول الشارة فوراً إلى لون الخصم ورسالة 'في انتظار الدفع'. ثم جرّب وضع قيمة غير معروفة مثل 'UNKNOWN' ولاحظ كيف تنشط كتلة @default فوراً.",
        "task": "بدّل قيمة bookingStatus بين 'PENDING' وقيمة أخرى غير معرفة ولاحظ التفاعل الفوري في المعاينة.",
        "benefit": "تأكدت بنفسك من دقة التوجيه الشرطي وانتقال التحكم الفوري للكتلة الافتراضية @default."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "أي كتلة يتم تنفيذها داخل @switch إذا لم تتطابق القيمة مع أي @case؟",
        "options": [
          "كتلة @default",
          "كتلة @empty",
          "كتلة @else"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة تماماً! كتلة @default هي الفرع الاحتياطي المضمون للتنفيذ في حال عدم تحقق أي من قيم @case المحددة.",
        "task": "أي كتلة يتم تنفيذها داخل @switch إذا لم تتطابق القيمة مع أي @case؟"
      }
    ]
  },
  {
    "id": "ng-modern-07",
    "module": "phase-3-modern",
    "phase": "المرحلة الثالثة: الانتقال إلى المعمارية الحديثة (Standalone & Modern Control Flow)",
    "title": "ثورة التحميل المؤجل الذكي: @defer و @placeholder",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "تأجيل تنزيل وتصيير الأجزاء الثقيلة (مصفوفة المقاعد) بـ @defer (on viewport) مع قالب @placeholder لتسريع التحميل الأولي وتحقيق أعلى مؤشرات Core Web Vitals.",
    "concept": "يُعد تحسين أداء تحميل الصفحة الابتدائية (Initial Page Load) وتقليل حجم حزمة الجافاسكريبت الأساسية من أهم أولويات مهندسي Angular في بيئات الإنتاج. قدمت Angular ميزة كتل التحميل المؤجل @defer الثورية والمدمجة في المترجم؛ حيث تقوم تلقائياً بتقسيم الكود (Automatic Code-splitting) واستخراج المكونات الموجودة داخل كتلة @defer إلى حزم مستقلة (Chunks) لا يتم تنزيلها من الخادم إلا عند تحقق محفز محدد (مثل on viewport عند ظهور العنصر في شاشة المستخدم). وتتكامل معها كتلة @placeholder لعرض قالب خفيف وبديل فوري يحفظ مكان العنصر ويمنع قفزات التنسيق المزعجة (Cumulative Layout Shift - CLS) حتى يكتمل التحميل.",
    "flow": "تحميل الصفحة الرئيسية خفيفة ⟶ تمرير المستخدم ⟶ جلب كود المقاعد وتشغيله",
    "task": "غلّف قسم المقاعد بكتلة @defer (on viewport) مع @placeholder.",
    "file": "src/app/app.html",
    "code": "@defer (on viewport) {\n  <div class=\"seat-picker-section\"><b>اختيار المقاعد التفاعلية</b></div>\n} @placeholder {\n  <p>مرر للأسفل لاختيار مقاعد العرض...</p>\n}",
    "expected": "@defer (on viewport)",
    "reference": "https://angular.dev/guide/templates/defer",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية ومخطط تدفق التحميل المؤجل الذكي @defer",
        "explanation": "في منصة السينما، تُعد شاشة مصفوفة المقاعد التفاعلية (Seat Picker) مكوّناً برمجياً ضخماً يحتوي على مكتبات رسم وحسابات معقدة. إذا قمنا بتحميل كود المقاعد فور فتح الموقع، سيبطئ ذلك سرعة استجابة الصفحة الأولى للمستخدم. تتيح كتلة @defer في Angular تجزئة الكود تلقائياً (Automatic Code-splitting)؛ فيبقى التطبيق خفيفاً، وتُعرض كتلة @placeholder مؤقتاً كعنصر نائب، وعندما يُمرر المستخدم الشاشة ويصل العنصر لمجال الرؤية (on viewport)، يقوم المتصفح فوراً بتنزيل حزمة المقاعد وتصييرها بسلاسة.",
        "flow": "فتح التطبيق بحزمة ابتدائية خفيفة ⟶ عرض قالب @placeholder ⟶ تمرير الشاشة (Viewport Trigger) ⟶ جلب حزمة المقاعد ديناميكياً ⟶ استبدال الـ placeholder بقسم المقاعد الحقيقي",
        "task": "تأمل كيف يحقق @defer معادلة الأداء الصعبة: واجهة سريعة وخفيفة جداً مع قدرات تفاعلية ضخمة تُجلب عند الطلب فقط.",
        "benefit": "فهمت كيف يرفع التحميل المؤجل الذكي سرعة الموقع ويحقق أعلى الدرجات في مؤشرات أداء الويب Core Web Vitals."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح بنية التحميل المؤجل ومحفزات الرؤية وقوالب البديل",
        "explanation": "تبدأ الصيغة بـ @defer متبوعة بمحفز التفعيل بين قوسين دائريين، مثل (on viewport) لتفعيل الجلب عند ظهور العنصر في الشاشة، أو (on idle) عند خمول المتصفح، أو (on interaction) عند نقر المستخدم. يلي ذلك جسم الكتلة المؤجلة { }. وبعدها تتكامل معها كتل مساعدة اختيارية: @placeholder { } لعرض قالب بديل خفيف قبل بدء التحميل، و @loading { } لعرض مؤشر انتظار أثناء جلب الحزمة، و @error { } للتعامل مع أخطاء فشل تنزيل الملف عبر الشبكة.",
        "flow": "@defer (محفز_التحميل) { المحتوى_المؤجل_الثقيل } ⟶ @placeholder { المحتوى_المؤقت_الخفيف }",
        "task": "حلل أجزاء البنية: محفز الرؤية on viewport، كتلة المحتوى المؤجل، وكتلة @placeholder التي تحفظ المساحة في الواجهة.",
        "benefit": "أتقنت المعمارية التوليدية لكتل @defer ومحفزاتها وكيف يدير المترجم تقسيم الحزم وراء الكواليس."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بحماية قسم اختيار المقاعد في ملف src/app/app.html بتغليفه بكتلة @defer (on viewport)، مع توفير رسالة توجيهية خفيفة داخل كتلة @placeholder تشجع المستخدم على التمرير.",
        "file": "src/app/app.html",
        "code": "@defer (on viewport) {\n  <div class=\"seat-picker-section\"><b>اختيار المقاعد التفاعلية</b></div>\n} @placeholder {\n  <p>مرر للأسفل لاختيار مقاعد العرض...</p>\n}",
        "expected": "@defer (on viewport)",
        "task": "اكتب كود التحميل المؤجل @defer وقالب @placeholder في ملف src/app/app.html ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أتقنت تقنية التجزئة الكسولة للمكونات في شاشات Angular الحديثة وفق أحدث معايير الأداء العالمية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تغيير محفز التفعيل من (on viewport) إلى (on idle)، أو أضف حداً زمنياً أدنى لعرض القالب المؤقت بكتابة @placeholder (minimum 500ms) لمنع وميض الشاشة السريع (Flickering)، وشاهد كيف تمنح Angular تحكماً دقيقاً في تجربة المستخدم.",
        "task": "تفحص خيارات المحفزات المختلفة مثل on idle أو تخصيص مدة minimum في @placeholder.",
        "benefit": "استوعبت عمق خيارات التحكم بزمن ومؤشرات التحميل المؤجل لتوفير تجربة مستخدم مريحة وبلا وميض مزعج."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة المعمارية لاستخدام كتلة @defer (on viewport)؟",
        "options": [
          "تأجيل تحميل حزمة المكون الثقيل حتى يظهر في شاشة المستخدم لتسريع فتح الموقع",
          "تشفير محتويات المكون",
          "منع المستخدم من رؤية المكون نهائياً"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة وصحيحة! @defer مع محفز on viewport تتيح تقسيم الكود الذري وتأجيل جلب مكونات المقاعد الثقيلة حتى يحتاجها المستخدم فعلياً، مما يجعل تحميل الصفحة الابتدائية فائق السرعة.",
        "task": "ما الفائدة المعمارية لاستخدام كتلة @defer (on viewport)؟"
      }
    ]
  },
  {
    "id": "ng-signal-01",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "فلسفة محرك Signals والتخلي الجذري عن Zone.js",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "استيعاب الثورة المعمارية في محرك التفاعلية الداخلي لـ Angular عبر تقديم الإشارات (Signals) كبديل متطور وجذري لآلية فحص التغييرات التقليدية (Dirty Checking) ومكتبة Zone.js؛ فهم التفاعلية فائقة الدقة (Fine-grained Reactivity) وكيف تُمكّن Angular من تحديث الأجزاء المتغيرة في شجرة الـ DOM حصراً دون إعادة مسح شجرة المكونات بأكملها.",
    "concept": "منذ نشأة Angular وحتى وقت قريب، كانت المنظومة تعتمد بشكل كلي على مكتبة Zone.js لإدارة التفاعلية واكتشاف التغييرات (Change Detection). كانت Zone.js تقوم بعملية اعتراض (Monkey-patching) لكافة الواجهات غير المتزامنة في المتصفح مثل أحداث النقر ومؤقتات setTimeout واستدعاءات الشبكة Fetch و Promise. وبمجرد انتهاء أي حدث في أي زاوية من زوايا التطبيق، تُطلق Angular عملية فحص شاملة (Top-Down Dirty Checking) تبدأ من المكون الجذري نزولاً إلى أدنى عقدة في شجرة المكونات لمقارنة كل قيمة قديمة بقيمتها الجديدة. هذا النهج تسبب في هدر هائل للموارد، وبطء في التطبيقات المعقدة، والظهور المتكرر لخطأ ExpressionChangedAfterItHasBeenCheckedError الشهير. جاء محرك الإشارات (Angular Signals) ليقلب هذه المعادلة رأساً على عقب عبر نمط التفاعلية فائقة الدقة (Fine-Grained Reactivity)؛ فالإشارة عبارة عن غلاف حول قيمة تتبع تلقائياً كل من يقرؤها (Consumers). وعندما تتغير القيمة، يتم إخطار المستهلكين المعنيين فقط بشكل فوري ودقيق، مما يسمح للـ DOM بالتحديث المباشر للمنطقة المستهدفة دون أي مسح لبقية الشجرة، ويمهد الطريق لتطبيقات Zoneless بالغة السرعة والخفة تستهلك أقل قدر من الذاكرة ووقت المعالج.",
    "flow": "تعديل القيمة داخل الإشارة ⟶ إشعار ذري وفوري للمستهلكين المرتبطين بها ⟶ تحديث ذري للـ DOM بدون مسح الشجرة ⟶ التخلي التام عن Zone.js وتحقيق أداء استثنائي",
    "task": "افتح الملف src/app/app.ts واستورد دالة signal من حزمة '@angular/core' ثم عرّف أول إشارة تفاعلية لمقعد السينما عبر استدعاء دالة signal() داخل الصنف App.",
    "file": "src/app/app.ts",
    "code": "// تعريف أول إشارة تفاعلية للسينما بدون اعتماد على Zone.js\nselectedSeat = signal();",
    "expected": "signal()",
    "reference": "https://angular.dev/guide/signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: ثورة التفاعلية الدقيقة والتخلي عن Zone.js",
        "explanation": "في المعمارية السابقة، عندما كان العميل ينقر زر حجز تذكرة واحدة في سينما خطوة، كانت مكتبة Zone.js توقظ كامل شجرة التطبيق من المكون الجذري وتفحص مئات التعبيرات البرمجية للتأكد مما تغير. أما مع Signals، فإن التغيير يُشبه الاتصال المباشر بين الزر ومربع نص المقعد فقط: بمجرد تحديث الإشارة، تُحدّث Angular ذلك العنصر تحديداً وتتجاهل بقية الصفحة. هذا النمط الدقيق يرفع كفاءة تطبيق السينما، ويخفض زمن الاستجابة، ويقضي نهائياً على أخطاء التزامن المعقدة.",
        "flow": "نقرة مستخدم ⟶ تحديث إشارة Signal ⟶ إخطار العنصر المستهدف فقط ⟶ انعدام الفحص الشامل وسرعة قياسية",
        "task": "تأمل مقارنة الأداء بين الفحص الشامل بـ Zone.js والتفاعلية الذرية الدقيقة بـ Signals.",
        "benefit": "استوعبت الفلسفة الجوهرية لمحرك Signals وكيف يغير نمط تشغيل تطبيقات Angular للأفضل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح إشارة Signal ومقارنتها بالمتغيرات العادية",
        "explanation": "تُعرّف الإشارة باستيراد دالة signal من '@angular/core'. المتغير التقليدي (مثل let seat = 'A1') هو مجرد قيمة ساكنة في الذاكرة لا يعلم إطار العمل متى تغيرت إلا إذا أعاد فحص الصفحة. أما الإشارة فهي دالة ذاتية التتبع (Reactive Primitive) تحتوي على القيمة وتستمع لأي مكان يستدعيها. عند استدعاء signal() يتم إنشاء قناة اتصال ارتكاسية متكاملة.",
        "flow": "import { signal } from '@angular/core' ⟶ selectedSeat = signal() ⟶ مراقبة تلقائية للمستهلكين",
        "task": "دقق في صيغة استيراد signal وتعريفها كخاصية داخل صنف المكون App.",
        "benefit": "أدركت التركيب البرمجي لدالة signal وكيفية دمجها في صنف المكون الحديث."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بتعريف أول إشارة تفاعلية داخل صنف App في ملف src/app/app.ts باستخدام دالة signal() لتمثيل حالة المقعد المختار في تطبيق سينما خطوة.",
        "file": "src/app/app.ts",
        "code": "// تعريف أول إشارة تفاعلية للسينما بدون اعتماد على Zone.js\nselectedSeat = signal();",
        "expected": "signal()",
        "task": "أضف الخاصية selectedSeat = signal(); داخل صنف App في ملف src/app/app.ts ثم اضغط (شغّل وافحص).",
        "benefit": "كتبت أول إشارة تفاعلية بيدك في ملف المكون وتخلصت من قيود فحص التغييرات التقليدي."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تمرير نص كقيمة أولية داخل الأقواس مثل signal('A1') أو رقم مثل signal(0). لاحظ كيف تقبل الإشارات أي نوع من البيانات، وكيف يصبح نوع الإشارة مستنتجاً تلقائياً بواسطة TypeScript (Type Inference).",
        "task": "جرّب تغيير قيمة الإشارة إلى signal('A1') وتأمل التوافق النوعي الفوري مع TypeScript.",
        "benefit": "فهمت مرونة دالة signal وقدرتها على استيعاب القيم النصية والعددية والكائنات المركبة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو الفارق الجوهري الرئيسي بين التفاعلية عبر Signals ونظام Zone.js الكلاسيكي؟",
        "options": [
          "Signals تقدم تفاعلية ذرية دقيقة تُحدّث الأجزاء المرتبطة فقط دون فحص شجرة المكونات بأكملها",
          "Zone.js أسرع بمراحل من Signals وتستهلك ذاكرة أقل بكثير",
          "Signals تتطلب تثبيت حزم خارجية إضافية من خارج حزمة Angular الرسمية"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! الإشارات توفر Fine-Grained Reactivity لتحديث الـ DOM المستهدف فقط دون فحص الشجرة بأكملها.",
        "task": "ما هو الفارق الجوهري الرئيسي بين التفاعلية عبر Signals ونظام Zone.js الكلاسيكي؟"
      }
    ]
  },
  {
    "id": "ng-signal-02",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "الإشارات القابلة للكتابة Writable Signals وقراءة القيمة بالأقواس ()",
    "duration": "15 دقيقة",
    "level": "مبتدئ",
    "summary": "التعرف على الإشارات القابلة للكتابة والتعديل (Writable Signals) عبر دالة signal(initialValue)؛ إتقان قاعدة القراءة المحورية باستدعاء الإشارة كدالة عبر الأقواس () في كود TypeScript وداخل قوالب HTML، وفهم لماذا صُممت الإشارات كدوال Getter لتفعيل التتبع التلقائي للتبعيات.",
    "concept": "تُنشأ الإشارات القابلة للكتابة (WritableSignal<T>) في Angular عن طريق تمرير القيمة الابتدائية لدالة signal(initialValue). الميزة الأهم والأكثر وضوحاً في نمط الإشارات هي أسلوب قراءة القيمة: لا يتم الوصول إلى القيمة المخزنة كخاصية عادية (مثل count)، بل يتم استدعاؤها دوماً كدالة باستخدام القوسين ()، أي count(). هذا التصميم ليس مجرد خيار تجميلي، بل هو الركيزة الرياضية والبرمجية لمحرك التفاعلية بالكامل؛ فعند استدعاء الإشارة عبر الأقواس () داخل قالب المكون أو داخل دالة حسابية computed، تُسجل الإشارة نفسها تلقائياً في شجرة الاعتماديات (Reactive Dependency Graph) الخاصة بسياق التنفيذ النشط. وبذلك يعلم محرك Angular بدقة متناهية أن هذا القالب يعتمد على هذه الإشارة بالتحديد. إذا نسيت كتابة القوسين ()، فستحصل على كائن دالة الإشارة نفسها بدلاً من القيمة، ولن يتم تفعيل التتبع التلقائي. قراءة الإشارة بالأقواس تمنح كود تطبيق السينما وضوحاً مطلقاً وتفاعلية فورية لا تخطئها العين.",
    "flow": "إنشاء الإشارة totalTickets = signal(10) ⟶ استدعاء القيمة بالأقواس totalTickets() ⟶ تسجيل المستهلك في شجرة الاعتمادات ⟶ عرض 10 في واجهة حجز السينما فورياً",
    "task": "افتح الملف src/app/app.ts وعرّف إشارة التذاكر القابلة للكتابة بقيمة ابتدائية 10 عبر السطر: totalTickets = signal(10);",
    "file": "src/app/app.ts",
    "code": "// تعريف إشارة قابلة للكتابة لعدد تذاكر صالة السينما بقيمة ابتدائية 10\ntotalTickets = signal(10);",
    "expected": "totalTickets = signal(10)",
    "reference": "https://angular.dev/guide/signals#writable-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: الإشارات القابلة للكتابة WritableSignal",
        "explanation": "الإشارة القابلة للكتابة (Writable Signal) هي مخزن حالة ديناميكي يحمل قيمة ابتدائية، ويسمح لك بقراءتها بحرية وتعديلها لاحقاً. تخيلها كشاشة عرض رقمية لعدد التذاكر المتاحة في شباك سينما خطوة: تبدأ بقيمة 10، وعندما يمر العميل، يقرأ الرقم الظاهر عبر الأقواس totalTickets(). صياغة الدالة () تضمن أن كل قارئ يسجل نفسه لمتابعة أي تحديث يطرأ على هذه الشاشة الرقمية.",
        "flow": "قيمة ابتدائية 10 ⟶ تغليف داخل signal(10) ⟶ توفير واجهة قراءة عبر () وكتابة عبر set/update",
        "task": "تأمل كيف تجمع WritableSignal بين بساطة التخزين وقوة التتبع التلقائي.",
        "benefit": "فهمت طبيعة WritableSignal كحاوية مرنة للحالة التفاعلية القابلة للقراءة والتعديل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة القراءة بالأقواس () في TypeScript و HTML",
        "explanation": "في كود TypeScript داخل الصنف، نقرأ القيمة بكتابة this.totalTickets(). وداخل قالب HTML في ملف app.html، نكتب {{ totalTickets() }} مباشرة. لاحظ القوسين () دائماً! إذا كتبت {{ totalTickets }} بدون أقواس في القالب، فستعرض Angular نص الدالة بدلاً من الرقم 10. القوسان () هما مفتاح استخراج القيمة (Getter) وتفعيل الاشتراك التفاعلي الذاتي.",
        "flow": "TS: this.totalTickets() ⟶ HTML: {{ totalTickets() }} ⟶ استخراج القيمة 10 مع تفعيل الاشتراك الذري",
        "task": "دقق في وجوب إضافة الأقواس () عند قراءة الإشارة في القالب وداخل الكلاس.",
        "benefit": "أتقنت القاعدة الذهبية لقراءة الإشارات وتجنبت أشهر الأخطاء الشائعة للمطورين المبتدئين."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بتعريف إشارة Writable Signal لعدد تذاكر صالة السينما في ملف src/app/app.ts بقيمة ابتدائية 10 باستخدام دالة signal(10).",
        "file": "src/app/app.ts",
        "code": "// تعريف إشارة قابلة للكتابة لعدد تذاكر صالة السينما بقيمة ابتدائية 10\ntotalTickets = signal(10);",
        "expected": "totalTickets = signal(10)",
        "task": "عرّف الخاصية totalTickets = signal(10); داخل صنف App في ملف src/app/app.ts ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت بنجاح إشارة تفاعلية قابلة للكتابة لعدد التذاكر بقيمة أولية محددة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.html وجرّب إضافة فقرة لعرض قيمة الإشارة: <p class=\"ticket-summary\">التذاكر المتاحة: {{ totalTickets() }}</p>. شاهد في المعاينة الحية كيف يظهر الرقم 10 فورياً داخل واجهة سينما خطوة.",
        "task": "أضف {{ totalTickets() }} في القالب ولاحظ ظهور القيمة 10 في المعاينة الحية.",
        "benefit": "ربطت بين إشارة TypeScript وقالب HTML ولاحظت التزامن اللحظي للبيانات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف نقرأ القيمة المخزنة داخل الإشارة totalTickets في قالب HTML أو كود TypeScript؟",
        "options": [
          "باستدعائها كدالة عبر كتابة الأقواس: totalTickets()",
          "بالوصول إليها كخاصية عادية بدون أقواس: totalTickets.value",
          "باستخدام أنبوب غير متزامن إجباري: totalTickets | async"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة! الإشارات تُستدعى كدوال عبر الأقواس () لقراءة القيمة وتسجيل التبعيات التفاعلية.",
        "task": "كيف نقرأ القيمة المخزنة داخل الإشارة totalTickets في قالب HTML أو كود TypeScript؟"
      }
    ]
  },
  {
    "id": "ng-signal-03",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "تعديل حالة الإشارة: الفرق الجوهري بين set() و update()",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "احتراف طرق تعديل حالة الإشارات القابلة للكتابة وفهم الفرق الدقيق بين دالة .set() لاستبدال القيمة بالكامل ودالة .update() لتطبيق تحول وظيفي مبني على الحالة السابقة؛ كتابة دوال آمنة وذات ثبات كائني (Immutability) لإدارة حجوزات مقاعد السينما.",
    "concept": "توفر الإشارات القابلة للكتابة (WritableSignal) طريقتين رسميتين وأساسيتين لتعديل حالتها: دالة .set() ودالة .update(). تُستخدم .set(newValue) عندما تريد استبدال قيمة الإشارة بالكامل بقيمة جديدة لا تعتمد بأي شكل على القيمة الحالية؛ مثل إعادة تعيين عداد التذاكر إلى الصفر عند إلغاء الحجز (this.totalTickets.set(0))، أو تعيين اسم فيلم جديد تم اختياره من القائمة. أما دالة .update(updateFn)، فتُستخدم عندما تعتمد القيمة الجديدة على القيمة الحالية المخزنة في الإشارة، حيث تأخذ دالة تحويلية نقية تستقبل القيمة القديمة وتُرجع القيمة الجديدة (this.totalTickets.update(count => count + 1)). يضمن هذا النمط الوظيفي ثبات البيانات ويمنع مشاكل تسابق الحالة (Race Conditions). والجدير بالذكر أن الإصدارات المبكرة احتوت على دالة .mutate() لتعديل الكائنات داخلياً، لكن فريق Angular قام بحذفها تماماً لأنها كانت تكسر مبدأ الثبات الصارم (Immutability) وتصعب تتبع التغييرات. لذا، في Angular الحديثة، كل تعديل يجب أن ينتج مرجعاً أو قيمة جديدة واضحة، مما يمنح تطبيق السينما استقراراً استثنائياً وسرعة فائقة في رصد الفروق.",
    "flow": "نقرة زر إضافة تذكرة ⟶ استدعاء .update(count => count + 1) ⟶ حساب القيمة التالية نقياً ⟶ تحديث ذري للإشارة وواجهة المستخدم",
    "task": "افتح الملف src/app/app.ts وأضف دالة addTicket داخل صنف App لتحديث عدد التذاكر بزيادة 1 باستخدام: this.totalTickets.update(count => count + 1);",
    "file": "src/app/app.ts",
    "code": "  // دالة زيادة عدد التذاكر بحساب الحالة الجديدة من القديمة عبر update\n  addTicket(): void {\n    this.totalTickets.update(count => count + 1);\n  }",
    "expected": ".update(count => count + 1)",
    "reference": "https://angular.dev/guide/signals#updating-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: متى نستخدم set() ومتى نستخدم update()؟",
        "explanation": "في شباك تذاكر السينما، تواجه حالتين مختلفتين تماماً:\n1) العميل يطلب تذكرة إضافية: هنا نحتاج إضافة 1 إلى العدد الحالي، والأنسب هو .update(count => count + 1).\n2) العميل يلغي العملية أو تبدأ جلسة جديدة: هنا نريد ضبط العداد على 0 مباشرة بغض النظر عما كان، والأنسب هو .set(0).\nالتفريق الواعي بين الاستبدال المباشر بـ set() والتحول الوظيفي بـ update() هو علامة المطور المحترف.",
        "flow": "استبدال مطلق ⟶ .set(newVal) | تعديل مبني على الحالة السابقة ⟶ .update(prev => next)",
        "task": "تأمل جدول المفاضلة بين set() المباشرة و update() التحويلية التراكمية.",
        "benefit": "أدركت متى تختار set ومتى تختار update لبناء منطق برمجي نظيف وخالٍ من الأخطاء."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة .update() ومبدأ الثبات (Immutability)",
        "explanation": "تستقبل دالة .update() دالة سهمية تأخذ المعامل القديم كمدخل (مثل count أو state) وتُرجع القيمة المحسوبة الجديدة. إذا كانت الإشارة تحتوي مصفوفة من المقاعد المحجوزة، فإننا لا نستخدم push() للتعديل الداخلي، بل نُرجع مصفوفة جديدة باستخدام عامل النشر: seats.update(current => [...current, newSeat]). هذا الثبات الكائني (Immutability) هو ما يسمح لـ Angular بمقارنة المراجع بسرعة فائقة وإشعار الـ DOM لحظياً.",
        "flow": "signal.update(oldVal => newVal) ⟶ إنشاء قيمة جديدة بالكامل ⟶ إشعار ذري بالتحول",
        "task": "دقق في بنية الدالة التحويلية الممررة لـ update وكيف تحافظ على نقاء تدفق البيانات.",
        "benefit": "أتقنت كتابة الدوال التحويلية النقية التي تحافظ على سلامة الحالة التفاعلية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنكتب الآن دالة addTicket() داخل صنف App في ملف src/app/app.ts لزيادة عدد التذاكر بمقدار 1 عند استدعائها عبر .update(count => count + 1).",
        "file": "src/app/app.ts",
        "code": "  addTicket(): void {\n    this.totalTickets.update(count => count + 1);\n  }",
        "expected": ".update(count => count + 1)",
        "task": "أضف دالة addTicket() داخل صنف App في ملف src/app/app.ts باستخدام .update(count => count + 1) ثم اضغط (شغّل وافحص).",
        "benefit": "طبقت بيدك دالة التحديث الوظيفي update وعدّلت حالة الإشارة بكفاءة وأمان نوعي."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب كتابة دالة أخرى باسم resetTickets() تستخدم دالة .set(0) لتصفير التذاكر: resetTickets(): void { this.totalTickets.set(0); }. لاحظ كيف تبدو الصياغة مباشرة وأنيقة عند الاستبدال التام للقيمة.",
        "task": "أضف دالة resetTickets مستخدماً .set(0) وقارن بين صياغة الدالتين داخل الصنف.",
        "benefit": "تدرّبت على استخدام طريقتي التعديل معاً لبناء تجربة مستخدم تفاعلية متكاملة في صالة السينما."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الدالة الأنسب لزيادة قيمة إشارة العداد بمقدار 1 بالاعتماد على قيمتها الحالية؟",
        "options": [
          "دالة .update(count => count + 1) لأنها تستقبل القيمة الحالية وتُرجع القيمة الجديدة",
          "دالة .set(count + 1) بدون تمرير دالة تحويلية",
          "دالة .push(1) لتعديل المتغير مباشرة في الذاكرة"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! دالة .update() هي الطريقة المعيارية لتحديث الإشارة بناءً على قيمتها السابقة.",
        "task": "ما هي الدالة الأنسب لزيادة قيمة إشارة العداد بمقدار 1 بالاعتماد على قيمتها الحالية؟"
      }
    ]
  },
  {
    "id": "ng-signal-04",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "البيانات المشتقة المحسوبة: كتل computed() وشجرة الاعتمادات",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "بناء القيم المشتقة المحسوبة تلقائياً باستخدام دالة computed()؛ فهم تقنية الحفظ الذكي (Memoization)، وتتبع شجرة الاعتماديات التفاعلية ديناميكياً بدون هدر، وضمان عدم إعادة الحساب نهائياً إلا إذا تغيرت إحدى الإشارات المعتمد عليها.",
    "concept": "في معظم التطبيقات، نحتاج إلى قيم لا يتم إدخالها يدوياً بل تُشتق من قيم أخرى؛ مثل إجمالي سعر التذاكر (الذي يساوي عدد التذاكر مضروباً في سعر التذكرة الواحدة). في السابق، كان المطورون يضعون دوالاً عادية في القالب مثل {{ calculateTotal() }}، مما تسبب في كارثة أداء حقيقية؛ لأن Angular كانت تعيد استدعاء الدالة مع كل نبضة فحص تغييرات حتى لو لم يتغير شيء! تُقدم Angular الحديثة دالة computed() لحل هذه المشكلة جذرياً وبأناقة رياضية تامة. دالة computed تُنتج إشارة مشتقة للقراءة فقط (Signal<T>) تعتمد على إشارة أو أكثر. تتميز computed بخاصيتين ثوريتين:\n1) الحفظ الذكي في الذاكرة (Memoization): لا تعيد الدالة حساب قيمتها طالما أن الإشارات التي تعتمد عليها لم تتغير، بل تُرجع النتيجة المحفوظة فوراً وبزمن قياسي O(1).\n2) التتبع الديناميكي للشجرة (Dynamic Dependency Tracking): تكتشف Angular الإشارات المستدعاة داخل كتلة computed تلقائياً وقت التشغيل، وتُشكل شجرة اعتماديات ذكية. وعندما يتغير totalTickets() فقط، يُعاد حساب totalPrice() تلقائياً وتحديث الواجهة دون أي تدخل يدوي.",
    "flow": "تعديل totalTickets ⟶ رصد التغير في شجرة الاعتمادات ⟶ إعادة حساب computed() وتحديث الحفظ المؤقت ⟶ تحديث ذري لعنصر إجمالي السعر",
    "task": "افتح الملف src/app/app.ts واستورد دالة computed من '@angular/core' ثم عرّف الإشارة المشتقة لحساب إجمالي السعر عبر: totalPrice = computed(() => this.totalTickets() * 85);",
    "file": "src/app/app.ts",
    "code": "// إشارة مشتقة محسوبة لإجمالي سعر التذاكر بحفظ ذكي Memoization\ntotalPrice = computed(() => this.totalTickets() * 85);",
    "expected": "totalPrice = computed(() =>",
    "reference": "https://angular.dev/guide/signals#computed-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: وداعاً لإعادة الحساب العشوائي مع Memoization",
        "explanation": "تخيل آلة حاسبة ذكية للغاية في شباك حجز السينما: عندما تطلب منها حساب سعر 10 تذاكر بسعر 85 ريالاً، تحسب 850 وتتذكر النتيجة في ذاكرتها السريعة. وإذا طلب مئة زائر معرفة الإجمالي دون تغيير عدد التذاكر، تُعطيهم الرقم 850 فوراً دون إعادة الضرب! لكن بمجرد إضافة تذكرة لتصبح 11، تُدرك أن المدخلات تغيرت، فتحسب 935 وتُحدث ذاكرتها. هذا هو جوهر دالة computed() التي تلغي مئات الحسابات المهدورة في الثانية.",
        "flow": "إشارات أساسية (totalTickets) ⟶ كتلة computed(() => ...) ⟶ حفظ مؤقت Memoization ⟶ صفر حسابات مكررة",
        "task": "تأمل آلية عمل الـ Memoization وكيف تمنع الهدر الحسابي في قوالب Angular.",
        "benefit": "استوعبت كيف تضمن دالة computed أقصى كفاءة حاسوبية لتطبيق السينما عبر الحفظ الذكي."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة computed() وخصائصها الحتمية",
        "explanation": "تُستورد computed من '@angular/core'، وتقبل دالة استدعاء رجعي (Callback) خالية من الآثار الجانبية (Pure Function). الخصائص الجوهرية لـ computed:\n1) للقراءة فقط (Read-only): لا يمكنك استدعاء .set() أو .update() عليها.\n2) تقييم كسول (Lazily Evaluated): لا تُحسب القيمة إلا عند قراءتها أول مرة.\n3) تتبع ديناميكي: إذا كان لديك شرط @if يستدعي إشارة معينة، تسجلها computed، وإذا تغير مسار الشرط لاحقاً تلغي متابعتها بذكاء.",
        "flow": "const derived = computed(() => sigA() + sigB()) ⟶ إشارة للقراءة فقط ذاتية التحديث",
        "task": "دقق في التركيب النحوي لدالة computed ولاحظ كيف تُستدعى الإشارات داخلها بالأقواس () تلقائياً.",
        "benefit": "أتقنت الخصائص الهندسية والقواعد الصارمة لبناء الإشارات المشتقة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بتعريف الإشارة المشتقة totalPrice داخل صنف App في ملف src/app/app.ts لضرب عدد التذاكر totalTickets() في سعر التذكرة الثابت 85 ريالاً باستخدام computed().",
        "file": "src/app/app.ts",
        "code": "// إشارة مشتقة محسوبة لإجمالي سعر التذاكر بحفظ ذكي Memoization\ntotalPrice = computed(() => this.totalTickets() * 85);",
        "expected": "totalPrice = computed(() =>",
        "task": "عرّف الخاصية totalPrice = computed(() => this.totalTickets() * 85); داخل صنف App في ملف src/app/app.ts ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت بنجاح أول إشارة مشتقة بـ computed لحساب أسعار التذاكر بحفظ تلقائي فائق السرعة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تعريف إشارة لسعر التذكرة ticketPrice = signal(85) واستدعاء الإشارتين معاً داخل computed: totalPrice = computed(() => this.totalTickets() * this.ticketPrice());. شاهد كيف تستمع computed للإشارتين معاً وتعيد الحساب عند تغير أي منهما.",
        "task": "جرّب دمج إشارتين داخل دالة computed وتأمل بناء شجرة الاعتماديات المتعددة.",
        "benefit": "أتقنت تركيب شبكات تفاعلية متعددة الاعتماديات بسلاسة واحترافية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الذي يميز دالة computed() عن كتابة دالة تقليدية لحساب السعر في القالب؟",
        "options": [
          "تتميز بالحفظ الذكي (Memoization) ولا تُعاد حسابها إلا إذا تغيرت الإشارات المعتمد عليها فعلياً",
          "تسمح بتعديل قيمتها مباشرة عبر دالة .set() في أي وقت",
          "تتطلب تشغيل مكتبة Zone.js لرصد العمليات غير المتزامنة"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! دالة computed() تطبق تقنية Memoization ولا تعيد الحساب إلا إذا طرأ تغيير حقيقي على الإشارات التابعة.",
        "task": "ما الذي يميز دالة computed() عن كتابة دالة تقليدية لحساب السعر في القالب؟"
      }
    ]
  },
  {
    "id": "ng-signal-05",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "الآثار الجانبية التفاعلية: effect() وسياق الحقن Injection Context",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "توظيف دالة effect() لتنفيذ الآثار الجانبية التفاعلية كحفظ عدد التذاكر في التخزين المحلي localStorage ومزامنة الحالة الخارجية مع فهم سياق الحقن Injection Context.",
    "concept": "في معمارية Angular الحديثة، تمثل الإشارات (Signals) مصادر الحقيقة التفاعلية المتزامنة، بينما صُممت دالة effect() خصيصاً لمعالجة الآثار الجانبية (Side Effects) التي ترتبط بتغير قيم تلك الإشارات. على عكس العمليات الحسابية الخالصة التي يجب أن تُبنى دوماً عبر computed()، يُستخدم effect() في حالات محددة تتطلب التفاعل مع العالم الخارجي؛ مثل تسجيل السجلات والمراقبة (Logging)، وتخزين البيانات في التخزين المحلي localStorage للمتصفح، ومزامنة الحالة مع واجهات خارجية أو عناصر رسومية مثل HTML5 Canvas وWebGL، أو إطلاق عمليات مخصصة لا يمكن إجراؤها مباشرة داخل القالب. وتعمل دالة effect() بنظام التتبع التلقائي للاعتماديات (Automatic Dependency Tracking)؛ فعند استدعاء أي إشارة بداخلها مثل ticketCount()، يُسجل المحرك تلك الإشارة كتابع ديناميكي، وبمجرد أن تتغير قيمتها في أي مكان بالتطبيق، يُعاد جدولة تشغيل الدالة تلقائياً وبأعلى كفاءة عبر دورة التفاعل الخاصة بـ Angular. النقطة المعمارية الحاسمة والحرجة التي يجب على كل مهندس إدراكها هي أن effect() تتطلب سياق حقن صالح (Injection Context)؛ لذا يجب استدعاؤها إما في منشئ الفئة constructor() أو كجزء من تهيئة حقول الصنف، حيث يتولى Angular ربط دورة حياتها بالمكون وتنظيفها تلقائياً عند تدميره لمنع أي تسريب في الذاكرة.",
    "flow": "تعديل عدد التذاكر ticketCount ⟶ تحفيز effect() تلقائياً ⟶ مزامنة القيمة مع localStorage ⟶ حفظ الحالة للمستخدم",
    "task": "سجّل effect في المنشئ لمزامنة ticketCount مع localStorage.",
    "file": "src/app/app.ts",
    "code": "constructor() {\n  effect(() => {\n    localStorage.setItem('cinema_tickets', String(this.ticketCount()));\n  });\n}",
    "expected": "localStorage.setItem('cinema_tickets', String(this.ticketCount()));",
    "reference": "https://angular.dev/guide/signals#effects",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية لدالة effect() وسياق الحقن",
        "explanation": "في تطبيقات حجز السينما، يحتاج النظام إلى حفظ تفضيلات المستخدم وسلة حجز التذاكر في التخزين المحلي (localStorage) لتجنب فقدان البيانات عند إعادة تحميل الصفحة. بدلاً من استدعاء دوال الحفظ يدوياً عند كل نقرة زر، توفر Angular دالة effect() التي تراقب الإشارة تلقائياً وتنفذ كود الحفظ بمجرد حدوث أي تغيير. يضمن سياق الحقن (Injection Context) في المنشئ constructor() أن دورة حياة هذا التأثير الجانبي مرتبطة بالمكون، فلا يعمل التأثير بعد إغلاق الصفحة أو تدمير المكون.",
        "flow": "تغير قيمة ticketCount() ⟶ رصد التغير في شجرة التبعيات ⟶ تشغيل دالة effect() تلقائياً ⟶ حفظ التذاكر في localStorage",
        "task": "تأمل كيف تضمن دالة effect() مزامنة التخزين المحلي دون تدخل يدوي متكرر من المطور.",
        "benefit": "فهمت الدور المعماري للآثار الجانبية التفاعلية ومتى تستخدم effect() بدلاً من computed()."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لـ effect() داخل المنشئ constructor()",
        "explanation": "تُستدعى دالة effect() وتستقبل دالة سهمية () => { } تحتوي على كود الأثر الجانبي وقراءة الإشارات المرصودة. يُشترط وجود سياق حقن سليم، وهو ما يوفره المنشئ constructor(). عند قراءة this.ticketCount() داخل التأثير، يُسجل Angular هذا الاستدعاء في شجرة التفاعلية، ويقوم تلقائياً بتنظيف المراقبة عند تدمير المكون بدون الحاجة لكتابة كود إلغاء اشتراك يدوي.",
        "flow": "constructor() ⟶ effect(() => { ⟶ قراءة الإشارة this.ticketCount() ⟶ كود الأثر الجانبي ⟶ });",
        "task": "حلل متطلبات effect: وجودها داخل constructor، قراءة الإشارة كدالة ()، وتخزين النتيجة في localStorage.",
        "benefit": "أتقنت القيود الهندسية لـ effect() وكيفية كتابتها بأمان لمنع أخطاء NG0203 (خارج سياق الحقن)."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة منشئ constructor يحتوي على دالة effect() لمزامنة عدد تذاكر السينما ticketCount() مع التخزين المحلي في المتصفح تحت المفتاح 'cinema_tickets'.",
        "file": "src/app/app.ts",
        "code": "constructor() {\n  effect(() => {\n    localStorage.setItem('cinema_tickets', String(this.ticketCount()));\n  });\n}",
        "expected": "localStorage.setItem('cinema_tickets', String(this.ticketCount()));",
        "task": "اكتب كتلة المنشئ مع دالة effect لمزامنة عدد التذاكر مع التخزين المحلي ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبقت عملياً أثراً جانبياً تفاعلياً حديثاً يحفظ بيانات المستخدم تلقائياً فور تعديلها."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.ts وجرّب إضافة أمر طباعة console.log(`تم تحديث التذاكر في التخزين: ${this.ticketCount()}`) داخل دالة effect()، واضغط زر زيادة التذاكر لمشاهدة رسائل المزامنة التلقائية تنهمر فوراً في الكونسول مع كل نقرة.",
        "task": "أضف أمر console.log داخل كتلة effect() ولاحظ تفاعل المراقبة الفورية مع كل تحديث لقيمة التذاكر.",
        "benefit": "عاينت التتبع اللحظي والتلقائي الذي يقدمه محرك Signals دون أي هدر في الأداء."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو الاستخدام الأساسي لدالة effect() في Angular؟",
        "options": [
          "تشغيل الآثار الجانبية التلقائية مثل المزامنة مع التخزين المحلي أو أدوات التحليل",
          "حساب أسعار التذاكر وعرضها في القالب",
          "كتابة كود CSS للمكون"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! دالة effect() مخصصة حصرياً للآثار الجانبية (Side Effects) مثل حفظ البيانات في localStorage أو أدوات التحليل (Analytics)، بينما العمليات الحسابية التي تؤثر في القالب يجب أن تُبنى عبر computed().",
        "task": "ما هو الاستخدام الأساسي لدالة effect() في Angular؟"
      }
    ]
  },
  {
    "id": "ng-signal-06",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "مداخل المكونات الحديثة: input() و input.required() بدون Decorators",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "استبدال مزخرف @Input() القديم بمدخلات الإشارات الحديثة input() و input.required() لتحقيق الأمان الكامل وقت التصريف والقراءة التفاعلية الفورية.",
    "concept": "في تاريخ تطوير Angular، كانت الطريقة التقليدية لتمرير البيانات من المكون الأب إلى المكون الابن تعتمد كلياً على المزخرف @Input()؛ ومع أنه كان يؤدي الغرض، إلا أنه عانى من عيوب هيكلية خطيرة: غياب الأمان الصارم وقت التصريف (Compile-Time Safety)؛ إذ يمكن للمطور نسيان تمرير خاصية حرجة دون أن يعترض المترجم، بالإضافة إلى تعقيد تتبع التغييرات الذي كان يتطلب تطبيق واجهة OnChanges الثقيلة مع SimpleChanges أو استخدام getters/setters فوضوية. في Angular الحديثة، استُبدل ذلك بنظام المدخلات المعتمد على الإشارات عبر دالتي input() و input.required(). من خلال هذا النظام، يتحول المدخل تلقائياً إلى إشارة قراءة فقط (Signal<T>) تمكن المكون الابن من قراءة القيمة كدالة title() والاعتماد عليها مباشرة داخل computed() أو effect(). وتوفر دالة input.required<T>() ميزة ثورية تجعل تمرير الخاصية إلزامياً في القالب؛ فإذا حاول المكون الأب استخدام <app-movie-card> دون تزويد [title]، يفشل بناء التطبيق فوراً وقت التصريف مع إظهار رسالة خطأ صريحة، مما يلغي فئة كاملة من أخطاء وقت التشغيل الشائعة ويوفر تجربة تطوير (DX) فائقة الاحترافية.",
    "flow": "تعريف مدخل إشارة إلزامي ⟶ فحص إلزاميته وقت التصريف ⟶ قراءة القيمة كـ Signal عبر () ⟶ أمان تام وتحديث فوري",
    "task": "عرّف مدخل إشارة إلزامي title = input.required<string>() في بطاقة الفيلم.",
    "file": "src/app/components/movie-card.component.ts",
    "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card',\n  standalone: true,\n  template: '<div class=\"movie-pill\"><b>{{ title() }}</b></div>'\n})\nexport class MovieCardComponent {\n  title = input.required<string>();\n}",
    "expected": "title = input.required<string>();",
    "reference": "https://angular.dev/guide/signals/inputs",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية لمدخلات الإشارات input() و input.required()",
        "explanation": "في تطبيق سينما خطوة، يُعرض كل فيلم عبر بطاقة مكون فرعي <app-movie-card>. عنوان الفيلم خاصية حاسمة لا يمكن الاستغناء عنها لعرض البطاقة. في السابق كان نسيان تمرير العنوان يؤدي لظهور بطاقات فارغة وأخطاء خفية في الإنتاج. مع input.required<string>()، يفرض مترجم Angular تمرير الخاصية إلزامياً وقت كتابة الكود، وتتحول القيمة داخل المكون الابن إلى إشارة Signal متكاملة يمكن ربطها مع القالب كدالة {{ title() }} دون أي حاجة لمزخرفات @Input أو دوال OnChanges المعقدة.",
        "flow": "المكون الأب يمرر [title] ⟶ فحص الإلزامية بالمترجم ⟶ تخزين القيمة كـ Signal للقراءة فقط ⟶ قراءة فورية في القالب عبر title()",
        "task": "تأمل الفرق بين @Input القديم الذي يسمح بترك القيمة فارغة، وبين input.required() الذي يضمن وجود البيانات وقت التصريف.",
        "benefit": "استوعبت النقلة النوعية في أمان الأنواع واستقرار المكونات الفرعية باستخدام Signal Inputs."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لـ input.required() وكيفية قراءتها",
        "explanation": "يتم استيراد input من حزمة @angular/core. يُعرّف الحقل داخل المكون عبر استدعاء input.required<T>() مع تحديد النوع العام بدقة. الناتج هو كائن إشارة من النوع InputSignal<T> للقراءة فقط. داخل القالب، تُقرأ القيمة باستدعاء الدالة title() بالأقواس، تماماً كأي إشارة عادية، مما يجعل التعامل مع المدخلات متجانساً بنسبة 100% مع باقي أدوات محرك التفاعلية.",
        "flow": "استيراد { input } ⟶ تعريف title = input.required<string>() ⟶ استخدام {{ title() }} في القالب",
        "task": "حلل عناصر الكود: الاستيراد من core، استدعاء input.required بالنوع string، والقراءة كدالة title() داخل القالب.",
        "benefit": "أتقنت الصياغة النحوية الحديثة للمدخلات وتخلصت من الاعتماد على المزخرفات القديمة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مكون بطاقة الفيلم MovieCardComponent في ملف src/app/components/movie-card.component.ts مع تعريف مدخل إشارة إلزامي title = input.required<string>() وعرضه في القالب عبر {{ title() }}.",
        "file": "src/app/components/movie-card.component.ts",
        "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card',\n  standalone: true,\n  template: '<div class=\"movie-pill\"><b>{{ title() }}</b></div>'\n})\nexport class MovieCardComponent {\n  title = input.required<string>();\n}",
        "expected": "title = input.required<string>();",
        "task": "اكتب كود مكون بطاقة الفيلم مع مدخل الإشارة الإلزامي ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت مكوناً فرعياً يعتمد كلياً على Signal Inputs الحديثة والمتوافقة مع أعلى معايير Angular."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب فتح ملف src/app/components/movie-card.component.ts وإضافة قيمة افتراضية اختيارية لمدخل آخر مثل category = input<string>('تشويق وإثارة')، ثم اعرضها بجانب العنوان عبر {{ category() }}، وشاهد كيف توفر دالة input() العادية مدخلاً اختيارياً مع قيمة أولية آمنة.",
        "task": "أضف مدخلاً اختيارياً باستخدام input<string>('عام') ولاحظ مرونة الجمع بين المدخلات الإلزامية والاختيارية.",
        "benefit": "أدركت التمييز العملي بين input() للمدخلات الاختيارية ذات القيم الافتراضية و input.required() للمدخلات الإلزامية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الذي يقدمه input.required() مقارنة بالمدخل الكلاسيكي القديم؟",
        "options": [
          "أمان وقت التصريف يمنع نسيان تمرير الخاصية، مع إرجاع إشارة Signal للقراءة فقط",
          "تحويل القيمة إلى نص دائماً",
          "السماح للمستخدم بتغيير القيمة"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة! دالة input.required() توفر أماناً صارماً وقت التصريف (Compile-Time Safety)؛ فإذا نسي المطور تمرير الخاصية في القالب يفشل البناء فوراً، كما أنها تُرجع إشارة Signal متكاملة للقراءة فقط.",
        "task": "ما الذي يقدمه input.required() مقارنة بالمدخل الكلاسيكي القديم؟"
      }
    ]
  },
  {
    "id": "ng-signal-07",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "مخارج المكونات الحديثة: دالة output() والتخلص من EventEmitter",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "إرسال الأحداث وتنبيه المكون الأب باستخدام دالة output() الحديثة بدلاً من كلاس EventEmitter الكلاسيكي لتقليل حجم الحزمة وتبسيط بنية المكونات.",
    "concept": "لأكثر من ثماني سنوات منذ إطلاق Angular 2، كان تصدير الأحداث من المكون الفرعي إلى المكون الأب يعتمد بصورة حصرية على المزخرف @Output() مقترناً بصنف new EventEmitter<T>()، الذي كان يعتمد في باطنه على مكتبة RxJS وتدفقات Subject. ورغم نجاح هذا النموذج، إلا أنه أضاف حمولة غير ضرورية لحزمة التطبيق وفرض مفاهيم تدفقات البيانات حتى على أبسط عمليات النقر أو الاختيار. في إصدارات Angular الحديثة، قُدمت دالة output() كبديل وظيفي أصيل وخفيف للغاية (Lightweight Output API). لا تعتمد output() على RxJS ولا تتطلب استدعاء المنشئ new أو استخدام المزخرفات، بل توفر واجهة برمجية فائقة البساطة تُرجع كائن OutputEmitterRef<T> يدعم دالة .emit(value) لإرسال البيانات مباشرة للأب بنفس طريقة الربط المعتادة في القالب (seatSelected)=\"onSeatSelected($event)\". هذا التصميم الجديد لا يجعل الكود أنظف وأكثر وضوحاً فحسب، بل ينسجم تماماً مع نموذج المعمارية الخالية من الوحدات، ويسهل اختبار المكونات في بيئات الاختبار الحديثة دون الحاجة لتهيئة بيئة تدفقات معقدة.",
    "flow": "نقر زر المقعد ⟶ استدعاء seatSelected.emit('B4') ⟶ التقاط الحدث في المكون الأب ⟶ تحديث سلة الحجز فوراً",
    "task": "عرّف مخرج حدث حديث seatSelected = output<string>() في منتقي المقاعد.",
    "file": "src/app/components/seat-picker.component.ts",
    "code": "import { Component, output } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-picker',\n  standalone: true,\n  template: '<button (click)=\"chooseSeat()\">تأكيد المقعد</button>'\n})\nexport class SeatPickerComponent {\n  seatSelected = output<string>();\n  chooseSeat() { this.seatSelected.emit('B4'); }\n}",
    "expected": "seatSelected = output<string>();",
    "reference": "https://angular.dev/guide/signals/inputs",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية لمخارج الأحداث الحديثة output()",
        "explanation": "في مصفوفة مقاعد صالة السينما، عند قيام الزائر بالنقر على مقعد مثل 'B4'، يحتاج المكون الفرعي المسئول عن المقعد إلى إشعار المكون الأب (شاشة الحجز الرئيسية) برمز المقعد المختار ليتم إضافته إلى الفاتورة. في المعمارية الكلاسيكية، كنا نلجأ إلى @Output() مع new EventEmitter() المستورد من RxJS. أما اليوم، توفر دالة output() الحديثة طريقة مباشرة، فائقة الخفة، وخالية من تبعيات RxJS لإطلاق الأحداث بدقة وسرعة.",
        "flow": "المستخدم ينقر زر المقعد ⟶ المكون الفرعي يطلق seatSelected.emit('B4') ⟶ استقبال القيمة في القالب الأب عبر (seatSelected) ⟶ تحديث الحجز",
        "task": "تأمل سهولة واكتمال دالة output() الحديثة التي ألغت الحاجة لكتابة new EventEmitter واستيرادات RxJS غير الضرورية.",
        "benefit": "استوعبت كيف تُخفف دالة output() وزن حزم التطبيق وتوفر وسيلة معيارية لإرسال البيانات للأب."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لدالة output() ودالة emit()",
        "explanation": "تُستورد دالة output مباشرة من @angular/core. يُعرّف المخرج كحقل عادي في الصنف: seatSelected = output<string>()، حيث يحدد النوع العام <string> نوع البيانات المنبعثة مع الحدث. لإطلاق الحدث، نستدعي دالة this.seatSelected.emit(value). في المكون الأب، يُربط الحدث بنفس القوسين الدائريين المألوفين (seatSelected)=\"onSeat($event)\" دون أي تغيير على مستوى القالب.",
        "flow": "استيراد output من @angular/core ⟶ تعريف الحقل seatSelected = output<string>() ⟶ استدعاء this.seatSelected.emit('B4')",
        "task": "حلل تركيب المخرج: استدعاء دالة output الوظيفية، تحديد نوع الحدث generic، واستخدام emit لإرسال القيمة.",
        "benefit": "أتقنت بناء مخارج المكونات الحديثة بأسلوب نقي وخالٍ من المزخرفات القديمة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مكون منتقي المقاعد SeatPickerComponent في ملف src/app/components/seat-picker.component.ts مع تعريف مخرج الحدث seatSelected = output<string>() واستدعاء دالة emit('B4') عند النقر على الزر.",
        "file": "src/app/components/seat-picker.component.ts",
        "code": "import { Component, output } from '@angular/core';\n\n@Component({\n  selector: 'app-seat-picker',\n  standalone: true,\n  template: '<button (click)=\"chooseSeat()\">تأكيد المقعد</button>'\n})\nexport class SeatPickerComponent {\n  seatSelected = output<string>();\n  chooseSeat() { this.seatSelected.emit('B4'); }\n}",
        "expected": "seatSelected = output<string>();",
        "task": "اكتب كود مكون منتقي المقاعد مع مخرج output الحديث ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت بنجاح مخرج أحداث وظيفي حديث خفيف الوزن وعالي الأداء لمكونات تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/components/seat-picker.component.ts وجرّب تغيير المقعد المنبعث في دالة chooseSeat إلى 'VIP-A1'، أو أضف مخرجاً آخر لتأكيد المقاعد المفضلة مثل favoriteToggled = output<boolean>()، وشاهد كيف يمكن للمكون إطلاق أحداث متعددة ومكتوبة بدقة تامة.",
        "task": "عدّل القيمة المرسلة إلى 'VIP-A1' وأضف مخرج حدث إضافي لتجربة مرونة الـ outputs المتعددة.",
        "benefit": "ترسخت لديك القدرة على تخصيص قنوات تواصل متعددة بين المكونات الفرعية والآباء."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الدالة الحديثة في Angular المستخدمة لتعريف مخرجات المكون؟",
        "options": [
          "دالة output<T>()",
          "دالة emitEvent()",
          "دالة sendSignal()"
        ],
        "correct": 0,
        "benefit": "إجابة صحيحة تماماً! دالة output<T>() هي الدالة الرسمية الحديثة في Angular لتعريف مخرجات المكونات، وتوفر كائن OutputEmitterRef الذي يطلق الأحداث عبر دالة emit دون الحاجة لكلاس EventEmitter أو مزخرف @Output.",
        "task": "ما هي الدالة الحديثة في Angular المستخدمة لتعريف مخرجات المكون؟"
      }
    ]
  },
  {
    "id": "ng-signal-08",
    "module": "phase-4-signals",
    "phase": "المرحلة الرابعة: محرك التفاعلية الحديث (Angular Signals & Reactivity)",
    "title": "الربط ثنائي الاتجاه بالـ Signals: نموذج model() المتطور",
    "duration": "15 دقيقة",
    "level": "متوسط",
    "summary": "دمج المدخلات والمخرجات في إشارة واحدة ثنائية الاتجاه عبر دالة model() لدعم صيغة [(value)] بسهولة تامة وتزامن تلقائي بين الأب والابن.",
    "concept": "يُمثل الربط ثنائي الاتجاه (Two-way Data Binding) في واجهات المستخدم أحد أهم الأنماط الهندسية لتسهيل مزامنة الحالة بين المكون الأب والمكونات التفاعلية كحقول البحث ومنتقيات المقاعد. تقليدياً، كان هذا النمط يُعرف بـ 'Banana in a box' أي [(prop)]؛ لكن تطبيقه داخل المكونات المخصصة كان يتطلب كتابة كود مكرر ومعقد جداً: تعريف مدخل @Input() value ومخرج مخصص يحمل نفس الاسم مع لاحقة Change مثل @Output() valueChange = new EventEmitter()، مع كتابة دوال يدوية لإطلاق القيمة الجديدة عند كل تعديل. في نقلة نوعية معمارية، قدمت Angular دالة model() التفاعلية. تُعرّف model() إشارة ثنائية الاتجاه (ModelSignal) تعمل كمدخل ومخرج في آن واحد؛ حيث يمكن للمكون الأب ربطها بصيغة [(query)]=\"searchQuery\" ليتمكن كلا الطرفين من قراءة الإشارة وكتابتها وتعديلها مباشرة عبر .set() أو .update(). إذا قام المكون الابن بتعديل الإشارة، يتم إخطار الأب وتحديث قيمته فوراً وبشكل متزامن، وإذا قام الأب بتغيير القيمة تنعكس تلقائياً في الابن، مما يختزل عشرات الأسطر البرمجية ويوفر معمارية متناسقة ونقية.",
    "flow": "تعريف مربع البحث بـ model ⟶ ربط ثنائي الاتجاه [(query)] ⟶ تحديث متبادل وتلقائي بين الأب والابن دون تكرار",
    "task": "عرّف إشارة ثنائية الاتجاه query = model<string>('') في مكون البحث.",
    "file": "src/app/components/search-box.component.ts",
    "code": "import { Component, model } from '@angular/core';\n\n@Component({\n  selector: 'app-search-box',\n  standalone: true,\n  template: '<input [value]=\"query()\" (input)=\"query.set($any($event.target).value)\" />'\n})\nexport class SearchBoxComponent {\n  query = model<string>('');\n}",
    "expected": "query = model<string>('');",
    "reference": "https://angular.dev/guide/signals/model",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية للربط ثنائي الاتجاه مع دالة model()",
        "explanation": "في شريط البحث عن عروض أفلام سينما خطوة، يحتاج المستخدم لكتابة اسم الفيلم في حقل إدخال داخل مكون فرعي <app-search-box>، مع مزامنة النص فوراً مع متغير البحث في الصفحة الرئيسية لتصفية قائمة الأفلام المعروضة في الوقت الفعلي. بدلاً من تعريف مدخل لقراءة النص ومخرج منفصل لإرسال التغييرات، توفر دالة model() إشارة قابلة للكتابة (Writable Signal) يشاركها الأب والابن معاً عبر صيغة الربط ثنائي الاتجاه [(query)]=\"movieSearch\"، حيث تتزامن القيمة لحظياً بمجرد الكتابة.",
        "flow": "المستخدم يكتب في حقل البحث ⟶ استدعاء query.set(val) ⟶ تحديث فوري لإشارة الأب ⟶ تصفية قائمة الأفلام المعروضة فوراً",
        "task": "تأمل كيف تختزل دالة model() نمط Banana-in-a-box التقليدي في إشارة واحدة نظيفة وذكية.",
        "benefit": "استوعبت كيف تُبسط دالة model() مزامنة البيانات التفاعلية بين المكونات وتلغي تعقيدات valueChange."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لـ model() وإشارة ModelSignal",
        "explanation": "تُستورد دالة model من @angular/core. تُنشأ الإشارة عبر استدعاء query = model<string>('') مع إمكانية تحديد قيمة ابتدائية. تمنحنا دالة model كائناً من نوع ModelSignal<string>؛ وهو إشارة قابلة للقراءة عبر query() وقابلة للكتابة عبر query.set(newValue) أو query.update(fn). وفي خلف الكواليس، يُنشئ Angular تلقائياً مخرجاً ضمنياً باسم queryChange يرسل التحديثات للمكون الأب تلقائياً عند تغيير القيمة.",
        "flow": "استيراد model ⟶ تعريف query = model<string>('') ⟶ ربط القيمة بـ [value]='query()' ⟶ تحديث القيمة بـ query.set(...) ⟶ تزامن الأب عبر [(query)]",
        "task": "حلل عناصر الكود: تعريف model بقيمة أولية خالية، قراءتها كدالة في [value]، وتحديثها باستخدام query.set().",
        "benefit": "أتقنت التعامل مع إشارات model القابلة للكتابة والتفاعل المتزامن مع المكونات الأبوية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مكون البحث SearchBoxComponent داخل ملف src/app/components/search-box.component.ts مع تعريف إشارة ثنائية الاتجاه query = model<string>('') وربطها مع حقل الإدخال.",
        "file": "src/app/components/search-box.component.ts",
        "code": "import { Component, model } from '@angular/core';\n\n@Component({\n  selector: 'app-search-box',\n  standalone: true,\n  template: '<input [value]=\"query()\" (input)=\"query.set($any($event.target).value)\" />'\n})\nexport class SearchBoxComponent {\n  query = model<string>('');\n}",
        "expected": "query = model<string>('');",
        "task": "اكتب كود مكون البحث مع إشارة model ثنائية الاتجاه ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبقت بنجاح الربط ثنائي الاتجاه العصري في Angular باستخدام نموذج model() الفعال والموجز."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/components/search-box.component.ts وجرّب إضافة زر مسح سريع للبحث <button (click)=\"clear()\">مسح</button> مع دالة clear() { this.query.set(''); } وشاهد كيف يؤدي استدعاء .set('') إلى تصفير حقل الإدخال وإشعار المكون الأب لحظياً لتفريغ البحث.",
        "task": "أضف دالة clear() تستدعي this.query.set('') ولاحظ بساطة تصفير الحالة في كلا الاتجاهين.",
        "benefit": "أدركت القوة الهندسية لامتلاك إشارة قابلة للكتابة والتحديث المباشر من داخل المكون الفرعي."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا تحقق دالة model() في ميزات Angular الحديثة؟",
        "options": [
          "ربط ثنائي الاتجاه (Two-way Binding) يعمل كـ Input و Output في إشارة واحدة",
          "إنشاء جدول جديد في قاعدة البيانات",
          "إرسال بريد إلكتروني للعميل"
        ],
        "correct": 0,
        "benefit": "إجابة ممتازة وصحيحة تماماً! دالة model() تُنشئ ModelSignal يدمج وظيفتي المدخل والمخرج في إشارة واحدة، مما يدعم صيغة الربط ثنائي الاتجاه [(prop)] بسلاسة فائقة ودون الحاجة لتعريف EventEmitter أو كود valueChange يدوي.",
        "task": "ماذا تحقق دالة model() في ميزات Angular الحديثة؟"
      }
    ]
  },
  {
  "id": "ng-di-01",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "حقن التبعيات الوظيفي الحديث عبر دالة inject()",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "استيعاب التحول الجذري في معمارية Angular من حقن التبعيات الكلاسيكي عبر منشئ الفئة (Constructor Injection) إلى الحقن الوظيفي المعاصر باستخدام دالة inject()؛ فهم سياق الحقن (Injection Context)، والتخلص من تكرار الأكواد ومشاكل وراثة المنشئات super()، وحقن الخدمات مباشرة في حقول الفئات والدوال والمصانع والحراس الوظيفيين.",
  "concept": "منذ الإصدارات الأولى لإطار عمل Angular، كان نمط حقن التبعيات (Dependency Injection - DI) يعتمد بصورة حصرية على المنشئ الكلاسيكي (Constructor Injection)؛ حيث كان المطور ملزماً بكتابة دالة constructor(private cinemaService: CinemaService) في كل مكون أو خدمة. ورغم قوة هذا النمط واستقراره لسنوات، إلا أنه فرض قيوداً معمارية ثقيلة وتسبب في تضخم الكود (Boilerplate)؛ ففي سيناريوهات وراثة الأصناف (Class Inheritance)، كان على الفئة المشتقة إعادة تمرير كافة تبعيات الفئة الأساسية يدوياً عبر استدعاء super(...)، مما يجعل صيانة الكود وتطويره عملية معقدة وعرضة للأخطاء. بالإضافة إلى ذلك، جعل حقن المنشئ من المستحيل استخدام نظام التبعيات خارج سياق الفئات والأصناف، مثل الدوال المساعدة المستقلة والحراس الوظيفيين (Functional Guards) ومصانع الإعداد ومحددات التوجيه.\nجاءت دالة inject() الوظيفية في Angular الحديثة لتحدث ثورة حقيقية في تبسيط المعمارية وتفكيك الارتباط المعقد؛ حيث تتيح الحصول على نسخة أي خدمة أو رمز مميز (Injection Token) باستدعاء وظيفي مباشر وأنيق دون الحاجة لكتابة المنشئ إطلاقاً. تعمل دالة inject(CinemaService) في نطاق ما يُعرف بـ 'سياق الحقن' (Injection Context) — وهو التوقيت الزمني الذي يتم فيه إنشاء الكائن، مثل تهيئة خصائص الفئة (Field Initializers) أو داخل متن المنشئ. من خلال كتابة private cinemaService = inject(CinemaService); كخاصية مباشرة في الكلاس، نحصل على كود فائق الأناقة والوضوح، ونستغني تماماً عن المنشئات الفارغة. علاوة على ذلك، تفتح دالة inject() الباب واسعاً أمام إنشاء دوال حقن مركبة (Composable Injection Functions) تجمع المنطق البرمجي وحقن الخدمات معاً في دوال نقية يعاد استخدامها عبر كافة مكونات منصة سينما خطوة الاحترافية.",
  "flow": "طلب التبعية في سياق الحقن ⟶ استدعاء inject(CinemaService) ⟶ حل الرمز وتوفير نسخة الخدمة فوراً ⟶ كود أنيق بدون منشئ ولا super()",
  "task": "افتح الملف src/app/app.ts واحفظ نسخة خدمة السينما كحقل خاص باستخدام دالة inject(CinemaService) بدلاً من حقن المنشئ.",
  "file": "src/app/app.ts",
  "code": "// حقن خدمة السينما وظيفياً عبر دالة inject() في سياق الحقن\nprivate cinemaService = inject(CinemaService);",
  "expected": "private cinemaService = inject(CinemaService);",
  "reference": "https://angular.dev/guide/di",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية: وداعاً لحشو المنشئات مع الحقن الوظيفي inject()",
      "explanation": "في المعمارية الكلاسيكية لـ Angular، كان حقن أي خدمة يتطلب منشئاً (constructor) ومعاملات طويلة وتكراراً غير مبرر. مع دالة inject() الحديثة، يمكنك حقن التبعيات مباشرة عند تعريف الحقول في سياق الحقن (Injection Context)، مما يجعل المكونات أصغر حجماً وأسهل في القراءة والفحص والاستخدام.",
      "flow": "تعريف الحقل في الكلاس ⟶ استدعاء inject(CinemaService) ⟶ توفير نسخة الخدمة من شجرة الحواضن ⟶ الاستغناء الكامل عن المنشئ",
      "task": "تأمل سهولة قراءة الكود ونظافته عند استخدام دالة inject() مقارنة بحقن المنشئ التقليدي.",
      "benefit": "استوعبت الفارق المعماري بين حقن المنشئ التقليدي والحقن الوظيفي الحديث عبر دالة inject()."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح صياغة inject() وسياق الحقن (Injection Context)",
      "explanation": "تُستورد دالة inject من حزمة '@angular/core'. تُستدعى الدالة بتمرير اسم صنف الخدمة Token (مثل CinemaService). يجب أن يتم الاستدعاء أثناء مرحلة تهيئة الحقول أو داخل دالة تعمل في سياق حقن نشط، وإلا ستُطلق Angular خطأ NG0203 الشهير لعدم توفر سياق الحقن.",
      "flow": "import { inject } from '@angular/core' ⟶ private cinemaService = inject(CinemaService) ⟶ حل التبعية بأمان نوعي كامل",
      "task": "دقق في نوع الوصول private واسم المتغير واستدعاء inject(CinemaService) كخاصية صنف مباشرة.",
      "benefit": "أدركت الشروط المعمارية لعمل دالة inject() وكيفية كتابتها كخاصية صنف نموذجية."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم الآن بحقن خدمة CinemaService في صنف المكون الجذري App داخل ملف src/app/app.ts باستخدام دالة inject() الحديثة دون الحاجة لكتابة منشئ.",
      "file": "src/app/app.ts",
      "code": "// حقن خدمة السينما وظيفياً عبر دالة inject() في سياق الحقن\nprivate cinemaService = inject(CinemaService);",
      "expected": "private cinemaService = inject(CinemaService);",
      "task": "أضف السطر private cinemaService = inject(CinemaService); داخل صنف App في ملف src/app/app.ts ثم اضغط (شغّل وافحص).",
      "benefit": "طبقت الحقن الوظيفي الحديث بيدك وتخلصت من التكرار والمنشئات المعقدة في مكونات سينما خطوة."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "جرّب استدعاء إحدى دوال الخدمة المحقونة مثل this.cinemaService.getMovies() داخل إحدى دوال المكون، وتأكد من أن مترجم TypeScript يتعرف تلقائياً وبدقة بالغة على كافة دوال وخصائص CinemaService دون الحاجة لتحديد نوع إضافي.",
      "task": "جرّب استدعاء دالة من CinemaService ولاحظ التلميحات الذكية والدعم النوعي التلقائي.",
      "benefit": "تحققت من اكتمال ربط الخدمة بالمكون وقدرتك على استهلاك خصائصها فورياً."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "ما الميزة الهندسية لاستخدام دالة inject() بدلاً من حقن المنشئ التقليدي؟",
      "options": [
        "كود أكثر إيجازاً ونظافة وسهولة حقن التبعيات داخل الدوال والحراس الوظيفيين دون الحاجة لتمرير super() في الوراثة",
        "تشغيل التطبيق دون اتصال بالإنترنت وحذف كافة ملفات الخدمات من المشروع",
        "زيادة سرعة شاشة المتصفح وتقليل استهلاك طاقة الشاشة تلقائياً"
      ],
      "correct": 0,
      "benefit": "إجابة صحيحة! دالة inject() تقضي على حشو المنشئات وتتيح استخدام DI داخل الدوال المساعدة والحراس الوظيفيين بسلاسة تامة.",
      "task": "ما الميزة الهندسية لاستخدام دالة inject() بدلاً من حقن المنشئ التقليدي؟"
    }
  ]
},
  {
  "id": "ng-service-01",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "إدارة الحالة المشتركة (Signals State Management) بالخدمات",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "بناء معمارية قوية لإدارة الحالة المشتركة للتطبيق عبر خدمات Angular ومحرك الإشارات الحديث؛ تطبيق مبدأ الكبسلة الصارم (State Encapsulation) بحماية الإشارة الداخلية التفاعلية وجعلها خاصة private _selectedMovie، وكشف إشارة قراءة فقط عامة عبر .asReadonly() لمنع تعديل الحالة من خارج الخدمة.",
  "concept": "في تطبيقات الويب المعقدة ومشاريع الشركات المؤسسية، يُعد نمط إدارة الحالة المشتركة (Shared State Management) أحد أهم المحاور المعمارية التي تحدد استقرار التطبيق وجودته وسهولة صيانته. قبل ظهور الإشارات (Signals)، كان المطورون يضطرون للاعتماد على مكتبات خارجية ضخمة مثل NgRx، أو بناء حلول مخصصة باستخدام BehaviorSubject من مكتبة RxJS لإشعار المكونات بتغير البيانات. ومع تقديم محرك Signals في إصدارات Angular الحديثة، أصبح بالإمكان بناء مخزن حالة تفاعلي فائق الخفة والسرعة مدمج في قلب خدمات Angular دون الحاجة لأي مكتبات إضافية.\nإلا أن استخدام الإشارات داخل الخدمات المشتركة ينطوي على خطر معماري جسيم إذا لم يُطبَّق نمط الكبسلة (Encapsulation) بصرامة؛ فإذا قمت بتصدير إشارة قابلة للكتابة WritableSignal مباشرة كخاصية عامة للخدمة، فإن أي مكون في التطبيق سيتمكن من استدعاء .set() أو .update() وتعديل بيانات الحالة المشتركة من أي زاوية في الواجهة. هذا النهج الفوضوي يؤدي إلى فقدان السيطرة على تدفق البيانات، وصعوبة تتبع مسببات التغيير، وظهور أخطاء تصعب معالجتها في بيئات الإنتاج.\nلحل هذه المعضلة الهندسية، تقدم Angular دالة التحويل .asReadonly(). النمط الاحترافي الموصى به رسمياً هو:\n1. تعريف الحالة الداخلية كإشارة خاصة مسبوقة بشرطة سفلية: private _selectedMovie = signal<string>('رحلة النجوم');\n2. كشف الحالة للعالم الخارجي كإشارة قراءة فقط: readonly selectedMovie = this._selectedMovie.asReadonly();\n3. توفير دوال عامة محددة بدقة (مثل selectMovie(title: string)) لتعديل الحالة.\nبهذا النمط، يضمن مهندس البرمجيات تدفق بيانات أحادي الاتجاه (Unidirectional Data Flow)؛ حيث تستطيع المكونات قراءة الإشارة والتفاعل معها بحرية، ولكنها مجبرة على التفاعل مع دوال الخدمة الرسمية لإجراء أي تعديل، مما يسهل كتابة اختبارات الوحدة وتسجيل العمليات ومنع التعديلات العشوائية تماماً.",
  "flow": "إشارة داخلية _selectedMovie ⟶ كشفها بـ asReadonly ⟶ تعديل بدوال نقية",
  "task": "أنشئ خدمة CinemaService مع إشارة محمية مكشوفة كـ asReadonly().",
  "file": "src/app/services/cinema.service.ts",
  "code": "import { Injectable, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaService {\n  private _selectedMovie = signal<string>('رحلة النجوم');\n  readonly selectedMovie = this._selectedMovie.asReadonly();\n  selectMovie(title: string) { this._selectedMovie.set(title); }\n}",
  "expected": "readonly selectedMovie = this._selectedMovie.asReadonly();",
  "reference": "https://angular.dev/guide/signals",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية: حماية كبسولة الحالة المشتركة بـ asReadonly",
      "explanation": "في تطبيقات الإنتاج، تمثل الخدمة المصدر الوحيد للحقيقة (Single Source of Truth). إذا سُمح للمكونات بتعديل الإشارات مباشرة، ستفقد السيطرة على مسار البيانات. كشف الإشارة عبر asReadonly() يمنع أي استدعاء لـ set أو update خارج الخدمة ويضمن بقاء منطق الأعمال محصوراً داخل الخدمة.",
      "flow": "إشارة داخلية قابلة للكتابة ⟶ تحويل بـ asReadonly() ⟶ إشارة قراءة عامة ⟶ حماية الحالة من التعديل العشوائي",
      "task": "تأمل أهمية فصل صلاحيات القراءة عن الكتابة في معمارية الخدمات المشتركة لتطبيق سينما خطوة.",
      "benefit": "استوعبت ضرورة كبسلة الحالة وتطبيق تدفق البيانات أحادي الاتجاه لحماية استقرار التطبيق."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح صياغة _signal الخاصة وخاصية asReadonly العامة",
      "explanation": "نعرّف الخاصية الخاصة بـ private _selectedMovie = signal<string>('رحلة النجوم'). ثم نعرّف الخاصية العامة بـ readonly selectedMovie = this._selectedMovie.asReadonly(). نوع الإشارة المكشوفة يتحول تلقائياً من WritableSignal<string> إلى Signal<string> وهو نوع للقراءة فقط لا يحتوي على دالتي set أو update.",
      "flow": "private _selectedMovie = signal(...) ⟶ readonly selectedMovie = this._selectedMovie.asReadonly() ⟶ نوع Signal غير قابل للتعديل المباشر",
      "task": "لاحظ استخدام الشرطة السفلية _ للإشارة الخاصة واستخدام كلمة readonly مع الإشارة المكشوفة.",
      "benefit": "أتقنت النمط القياسي المعتمد في Angular لتصميم مخازن الحالة المبنية على Signals."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم الآن بتعريف الإشارة المحمية وكشفها كـ asReadonly() مع دالة selectMovie داخل صنف CinemaService في ملف src/app/services/cinema.service.ts.",
      "file": "src/app/services/cinema.service.ts",
      "code": "import { Injectable, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaService {\n  private _selectedMovie = signal<string>('رحلة النجوم');\n  readonly selectedMovie = this._selectedMovie.asReadonly();\n  selectMovie(title: string) { this._selectedMovie.set(title); }\n}",
      "expected": "readonly selectedMovie = this._selectedMovie.asReadonly();",
      "task": "أضف الإشارة المحمية وخاصية selectedMovie = this._selectedMovie.asReadonly(); في كلاس CinemaService ثم اضغط (شغّل وافحص).",
      "benefit": "بنيت مخزن حالة آمن ومكفول هندسياً يمنع التعديلات العشوائية من المكونات الخارجية."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "جرّب استدعاء دالة selectMovie('واحة الأمل') من المكون، ثم حاول عمداً كتابة this.cinemaService.selectedMovie.set('فيلم آخر') لتلاحظ كيف يمنعك مترجم TypeScript فوراً من الترجمة معلناً أن الدالة set غير موجودة على نوع Signal للقراءة فقط.",
      "task": "تأمل رسالة خطأ TypeScript عند محاولة تعديل إشارة للقراءة فقط لتتأكد من الحماية النوعية الصارمة.",
      "benefit": "اختبرت قوة الحماية النوعية التي يوفرها .asReadonly() ضد الأخطاء البرمجية أثناء التطوير."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "لماذا نستخدم .asReadonly() عند تصدير الإشارات من الخدمات المشتركة؟",
      "options": [
        "لحماية بيانات الحالة من التعديل العشوائي من المكونات وإلزام التعديل عبر دوال الخدمة الرسمية",
        "لتشفير البيانات المخزنة في الذاكرة لمنع سرقتها أثناء عمل المتصفح",
        "لتقليل استهلاك بطارية الجهاز وتخفيض حرارة المعالج عند الحجز"
      ],
      "correct": 0,
      "benefit": "إجابة ممتازة! دالة .asReadonly() تضمن تطبيق مبدأ الكبسولة وتمنع أي مكون خارجي من استدعاء set أو update مباشرة.",
      "task": "لماذا نستخدم .asReadonly() عند تصدير الإشارات من الخدمات المشتركة؟"
    }
  ]
},
  {
  "id": "ng-http-01",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "تفعيل عميل الويب الحديث: provideHttpClient(withFetch())",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "إعداد وتكوين عميل الويب الحديث (Angular HttpClient) داخل مصفوفة مزودات التطبيق ApplicationConfig.providers في ملف app.config.ts؛ استخدام دالة التكوين provideHttpClient() مقترنة بميزة withFetch() للاعتماد على واجهة المتصفح الأصلية Fetch API بدلاً من XMLHttpRequest، وتحسين الأداء والتوافق الكامل مع العرض من جانب الخادم SSR.",
  "concept": "يُمثل الاتصال بخوادم الويب واستدعاء واجهات برمجة التطبيقات (RESTful APIs) العصب الرئيسي لأي تطبيق ويب تفاعلي حديث. لسنوات طويلة، كانت مكتبة HttpClient في Angular تعتمد داخلياً على واجهة المتصفح التقليدية XMLHttpRequest (XHR). ورغم نجاح XHR في أداء مهمتها لعقد من الزمن، إلا أنها كانت تعاني من قيود معمارية ملحوظة؛ أهمها ثقل حجم الكود الناتج، وصعوبة التكامل مع بيئات تشغيل الخادم الحديثة (مثل Node.js و Edge Workers) أثناء تطبيق تقنيات العرض من جانب الخادم (Server-Side Rendering - SSR)، بالإضافة إلى اعتمادها على معالجات أحداث قديمة تتطلب تدخل مكتبة Zone.js لمراقبتها.\nمع انتقال Angular إلى المعمارية المستقلة (Standalone Architecture)، تم التخلي تماماً عن استيراد HttpClientModule القديم، واستبداله بدالة التوفير المستقلة provideHttpClient() داخل ملف إعداد التطبيق app.config.ts. الميزة الأقوى والأكثر تطوراً التي أضافها فريق Angular هي ميزة withFetch()، والتي تُمرر كمعامل لدالة التوفير: provideHttpClient(withFetch()).\nيُحدث استخدام withFetch() قفزة نوعية في كفاءة تطبيقات الويب المؤسسية؛ حيث يوجه Angular لاستخدام واجهة fetch() الأصلية القياسية المدمجة في كافة المتصفحات وبيئات تشغيل الخادم الحديثة. يوفر هذا الأسلوب دعماً أصيلاً للتدفقات البيانية (Streaming)، وتخفيضاً ملموساً لحجم الحزمة النهائية بفضل التخلص من الشفرات الميتة (Tree-shaking)، واستقراراً فائقاً وتوافقاً تاماً مع نظام الترطيب الذكي (Hydration) لـ Angular الحديثة. إن تهيئة provideHttpClient(withFetch()) هي المعيار الذهبي المعتمد لانطلاق أي تطبيق Angular إنتاجي متقدم.",
  "flow": "فتح appConfig ⟶ إضافة provideHttpClient(withFetch()) ⟶ جهوزية الشبكة فائقة الأداء",
  "task": "وفّر provideHttpClient(withFetch()) في مصفوفة مزودات appConfig.",
  "file": "src/app/app.config.ts",
  "code": "import { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient, withFetch } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(withFetch())\n  ]\n};",
  "expected": "provideHttpClient(withFetch())",
  "reference": "https://angular.dev/guide/http",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية: الانتقال إلى Fetch API الأصلية عبر withFetch()",
      "explanation": "في الإصدارات السابقة، كان عميل الويب يعتمد على XMLHttpRequest القديمة. مع provideHttpClient(withFetch())، يستفيد التطبيق من واجهة fetch() الحديثة للمتصفح، مما يحسن سرعة استرجاع البيانات ويوفر توافقاً مثالياً مع تقنيات العرض من جانب الخادم SSR والترطيب المستقر دون أخطاء.",
      "flow": "تهيئة التطبيق appConfig ⟶ تفعيل provideHttpClient(withFetch()) ⟶ استبدال XHR بـ Fetch API الأصلية ⟶ خفة الحزمة وسرعة قياسية",
      "task": "تأمل فوائد استخدام Fetch API الأصلية مقارنة بمكتبات الاتصال التقليدية القديمة.",
      "benefit": "فهمت الأهمية المعمارية لتفعيل withFetch() وتأثيرها الإيجابي على أداء التطبيق وتوافقه مع SSR."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح ملف app.config.ts ومصفوفة المزودات providers",
      "explanation": "في تطبيقات Standalone، يُعتبر ملف app.config.ts المركز الرئيسي لضبط وتكوين الخدمات العامة. تُستورد دالتا provideHttpClient و withFetch من حزمة '@angular/common/http'. تُستدعى withFetch() داخل provideHttpClient() وتُسجل مباشرة كعنصر داخل مصفوفة providers.",
      "flow": "import { provideHttpClient, withFetch } from '@angular/common/http' ⟶ providers: [provideHttpClient(withFetch())] ⟶ إتاحة HttpClient لكافة الخدمات",
      "task": "دقق في صيغة استدعاء withFetch() كدالة تكوين داخل provideHttpClient().",
      "benefit": "أتقنت هيكل تهيئة مزودات الشبكة وفق المعايير الحديثة للـ Standalone Architecture."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم الآن بتهيئة عميل الويب الحديث مع تفعيل Fetch API داخل ملف src/app/app.config.ts بإضافة provideHttpClient(withFetch()) إلى مصفوفة providers.",
      "file": "src/app/app.config.ts",
      "code": "import { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient, withFetch } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(withFetch())\n  ]\n};",
      "expected": "provideHttpClient(withFetch())",
      "task": "وفّر provideHttpClient(withFetch()) في مصفوفة مزودات appConfig ثم اضغط (شغّل وافحص).",
      "benefit": "قمت بتهيئة عميل الويب الحديث بنجاح وجعلت تطبيق سينما خطوة جاهزاً للاتصال بالخوادم بأعلى كفاءة."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "جرّب استكشاف الميزات الإضافية التي يمكن دمجها مع provideHttpClient مثل withInterceptors() لمعالجة الترويسات والرموز الأمنية، وتأمل كيف تسمح المعمارية الوظيفية بدمج خيارات متعددة بسلاسة تامة داخل مصفوفة الإعداد.",
      "task": "لاحظ إمكانية دمج عدة دوال تكوين مثل withFetch() و withInterceptors() جنباً إلى جنب داخل provideHttpClient.",
      "benefit": "أدركت مرونة وقابلية التوسع العالية لنظام تكوين عميل الويب في Angular الحديثة."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "ما هي الفائدة من تفعيل ميزة withFetch() عند توفير عميل الويب؟",
      "options": [
        "استخدام Fetch API الأصلية للمتصفح مما يحسن الأداء والتوافق مع الـ SSR والترطيب وتقليل حجم الكود",
        "حظر جميع الإعلانات المنبثقة في الصفحة تلقائياً دون إذن المستخدم",
        "منع إرسال طلبات POST وحصر الاتصال على استعراض البيانات فقط"
      ],
      "correct": 0,
      "benefit": "إجابة صحيحة! تفعيل withFetch() يعتمد على واجهة Fetch الأصلية للمتصفح مما يحسن الأداء والتوافق مع الـ SSR وخفة الحزم.",
      "task": "ما هي الفائدة من تفعيل ميزة withFetch() عند توفير عميل الويب؟"
    }
  ]
},
  {
  "id": "ng-http-02",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "طلب البيانات بنوع صارم: http.get<Movie[]>()",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "إتقان استدعاء واجهات الـ REST API وجلب مجموعات البيانات عبر دالة http.get<T>()؛ استخدام الأنواع العامة في TypeScript (Generics) لفرض التحديد النوعي الصارم <Movie[]> على الردود القادمة من الخادم، وفهم طبيعة تدفقات RxJS Observable المعادة وكيفية التعامل معها في بيئة Angular الحديثة.",
  "concept": "عند استرجاع البيانات من خوادم الويب البعيدة عبر الشبكة، تكون الاستجابات الأصلية بصيغة نصوص JSON مجردة لا تحمل أي معلومات نوعية بطبيعتها. في تطبيقات JavaScript التقليدية، كان المطور يتعامل مع هذه البيانات كنوع عام مجهول (any)، مما يجعل التطبيق عرضة لأخطاء قاتلة وغير متوقعة أثناء وقت التشغيل (Runtime Errors)؛ مثل محاولة قراءة خاصية غير موجودة أو وقوع خطأ إملائي بسيط في اسم حقل (مثل كتابة movie.titel بدلاً من movie.title).\nيحل عميل الويب في Angular هذه المشكلة المعمارية بشكل جذري من خلال الدمج العميق مع نظام الأنواع العامة في TypeScript (Generics). عندما تستدعي الدالة وتمرر لها نوع نموذج البيانات: this.http.get<Movie[]>('/api/movies')، فإنك تبرم عقداً نوعياً صارماً مع المترجم. يُعلم هذا العقد محرك TypeScript بأن استجابة هذا الطلب ستكون مصفوفة من كائنات Movie، مما يُنتج تدفقاً ارتكاسياً من نوع Observable<Movie[]>.\nيترتب على هذا التحديد النوعي الصارم ثلاث مزايا جوهرية:\n1. الإكمال التلقائي الذكي (IntelliSense) في محررات الأكواد لكافة حقول الفيلم (العنوان، التقييم، التصنيف، السعر).\n2. الفحص الثابت للأخطاء (Compile-time Type Safety)؛ حيث يرفض المترجم فوراً أي محاولة لاستخدام حقول غير معرّفة في واجهة Movie.\n3. إعادة هيكلة الكود بأمان واطمئنان (Safe Refactoring)؛ فإذا قمت بتغيير اسم أي خاصية في واجهة البيانات لاحقاً، سيرشدك المترجم مباشرة إلى كافة الأماكن المتأثرة في التطبيق.\nعلاوة على ذلك، تُرجع دالة http.get تدفقاً ارتكاسياً بارداً (Cold Observable)؛ أي أن طلب الشبكة الفعلي لن يغادر المتصفح إلا عند وجود اشتراك (Subscription) حقيقي، مما يضمن كفاءة استهلاك موارد الشبكة وعدم إرسال أي طلبات غير مستخدمة.",
  "flow": "طلب GET عبر HTTP ⟶ استلام رد JSON ⟶ تحويله لكائنات Movie[] مضمونة الخصائص",
  "task": "اكتب دالة fetchMovies لجلب مصفوفة الأفلام بنوع صارم http.get<Movie[]>. ",
  "file": "src/app/services/cinema.service.ts",
  "code": "fetchMovies(): Observable<Movie[]> {\n  return this.http.get<Movie[]>('/api/movies');\n}",
  "expected": "return this.http.get<Movie[]>('/api/movies');",
  "reference": "https://angular.dev/guide/http/making-requests",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية: الأمان النوعي للشبكة عبر TypeScript Generics",
      "explanation": "بدلاً من التعامل مع بيانات الشبكة كنوع مجهول any، نمرر نوع الواجهة <Movie[]> لدالة http.get. يضمن هذا النمط مطابقة البيانات المستلمة لعقد واجهة الفيلم، ويتيح للمحرر كشف أي أخطاء نوعية أو إملائية أثناء كتابة الكود وقبل تشغيل التطبيق.",
      "flow": "طلب الشبكة http.get ⟶ تغليفه بنوع عام <Movie[]> ⟶ تدفق Observable محكم الأنواع ⟶ حماية واجهة الحجز من الأخطاء",
      "task": "تأمل كيف تمنع الأنواع العامة الأخطاء البرمجية الناتجة عن محاولة قراءة خصائص غير موجودة في الرد.",
      "benefit": "استوعبت كيف يحول TypeScript Generics بيانات الشبكة الخام إلى كائنات موثوقة ومفحوصة نوعياً."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح دالة http.get وتمرير النوع العام <T> والمسار",
      "explanation": "تتكون الدالة من: this.http (عميل HttpClient المحقون)، يليه .get<Movie[]> لتحديد نوع الاستجابة المتوقعة، ثم تمرير رابط الـ API كنص: '/api/movies'. القيمة المعادة تكون من نوع Observable<Movie[]> من مكتبة RxJS محكومة بنوع مصفوفة الأفلام.",
      "flow": "this.http ⟶ .get<Movie[]> ⟶ مسار '/api/movies' ⟶ تدفق Observable<Movie[]>",
      "task": "دقق في موقع أقواس النوع العام <Movie[]> بين كلمة get وأقواس المعاملات ().",
      "benefit": "أتقنت الصياغة القياسية لطلبات GET المكتوبة بدقة بالغة في خدمات Angular الحديثة."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم الآن بكتابة دالة fetchMovies داخل صنف CinemaService في ملف src/app/services/cinema.service.ts لجلب مصفوفة الأفلام بنوع صارم Movie[].",
      "file": "src/app/services/cinema.service.ts",
      "code": "fetchMovies(): Observable<Movie[]> {\n  return this.http.get<Movie[]>('/api/movies');\n}",
      "expected": "return this.http.get<Movie[]>('/api/movies');",
      "task": "اكتب دالة fetchMovies لجلب مصفوفة الأفلام بنوع صارم http.get<Movie[]> ثم اضغط (شغّل وافحص).",
      "benefit": "بنيت أول دالة اتصال شبكي مكتوبة بنوع صارم وموثوق في خدمة السينما."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "جرّب تغيير الرابط إلى مسار فيلم مفرد مثل '/api/movies/1' وتعديل نوع الإرجاع إلى Observable<Movie> (فيلم واحد بدلاً من مصفوفة)، ولاحظ كيف يتكيف محرك TypeScript فورياً مع تغيير نوع البيانات المسترجعة.",
      "task": "جرّب تغيير النوع إلى Movie مفرد وتأمل دقة التوافق النوعي مع مسارات الـ API المختلفة.",
      "benefit": "فهمت كيفية توظيف Generics مع مختلف أشكال استجابات واجهات برمجة التطبيقات."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "ماذا نستفيد من تمرير النوع العام <Movie[]> لدالة http.get؟",
      "options": [
        "تمكين المترجم والمحرر من معرفة خصائص الأفلام وتفعيل الإكمال التلقائي ومنع الأخطاء البرمجية قبل التشغيل",
        "إجبار الخادم على إرسال الأفلام بسرعة مضاعفة وتقليل استهلاك الإنترنت",
        "تشغيل مقاطع الفيديو الترويجية للأفلام مباشرة في نافذة منبثقة"
      ],
      "correct": 0,
      "benefit": "إجابة نموذجية! تمرير النوع العام <Movie[]> يوفر الأمان النوعي الكامل (Compile-time Type Safety) والإكمال التلقائي لخصائص الكائن.",
      "task": "ماذا نستفيد من تمرير النوع العام <Movie[]> لدالة http.get؟"
    }
  ]
},
  {
  "id": "ng-http-03",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "إرسال وتعديل البيانات: http.post<BookingResponse>()",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "إرسال حمولات الحجز المعقدة إلى خادم الويب الخلفي REST API بنوع صارم ومحكم باستخدام دالة http.post مع تأمين العقود البرمجية للردود وتحديث الواجهة تلقائياً.",
  "concept": "في هندسة تطبيقات الويب الحديثة والمؤسسية، لا يقتصر دور العميل (Frontend) على استعراض البيانات الساكنة فقط، بل يُعد إرسال وتعديل البيانات (State Mutations) الركيزة الجوهرية لأي نظام تفاعلي مثل منصات حجز السينما. عندما يقوم المستخدم بتحديد مقاعده وتأكيد عملية الحجز، يجب نقل هذه الحالة الحساسة عبر الشبكة إلى خادم الـ REST API باستخدام بروتوكول HTTP الآمن وعبر طلب من نوع POST. على خلاف طلبات GET التي تسترجع الموارد دون تغيير حالة الخادم وتخضع لسياسات التخزين المؤقت، يتميز طلب POST بأنه يحمل حمولة بيانات مهيكلة (Request Body Payload) بصيغة JSON تُحدث تغييراً دائماً في قواعد البيانات مثل حجز المقاعد وإنشاء سجل الفاتورة. تقدم خدمة HttpClient في Angular الدالة العامة http.post<ResponseType>(url, body, options) التي تتيح كتابة كود آمن تماماً وقت التصريف؛ حيث يحدد المعامل العام <{ bookingId: string }> النوع الصارم للبيانات العائدة من الخادم، مما يمنع الأخطاء الشائعة مثل محاولة الوصول إلى حقول مفقودة أو غير متوافقة في الواجهة. علاوة على ذلك، تُرجع الدالة تدفقاً ارتكاسياً بارداً (Cold Observable) لا يبدأ استهلاكه أو إرسال طلب الشبكة الفعلي إلا عند وجود اشتراك (Subscription)، مما يمنح المطورين تحكماً كاملاً في خط أنابيب المعالجة وإدارة حدود الأخطاء (Error Boundaries) وتطبيق سياسات إعادة المحاولة عند انقطاع الشبكة.",
  "flow": "تجهيز حمولة الحجز ⟶ إرسال POST ⟶ استلام معرف التذكرة وتحديث الواجهة",
  "task": "اكتب دالة confirmBooking لإرسال حمولة الحجز عبر http.post.",
  "file": "src/app/services/cinema.service.ts",
  "code": "confirmBooking(payload: { movieId: number; seats: string[] }): Observable<{ bookingId: string }> {\n  return this.http.post<{ bookingId: string }>('/api/bookings', payload);\n}",
  "expected": "return this.http.post<{ bookingId: string }>('/api/bookings', payload);",
  "reference": "https://angular.dev/guide/http/making-requests",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية لإرسال البيانات بالنوع الصارم عبر http.post",
      "explanation": "في تطبيق سينما خطوة، بعد أن يختار العميل فيلمه والمقاعد المناسبة له، لا يمكن الاكتفاء بحفظ البيانات في الذاكرة المحلية فقط، بل يتعين إرسال طلب POST رسمي إلى الخادم لحجز المقاعد نهائياً ومنع حجزها من عميل آخر في نفس اللحظة. يرسل كائن HttpClient البيانات بصيغة JSON مهيكلة إلى مسار '/api/bookings'، ويعود الخادم بمعرف الحجز الفريد bookingId. تحديد النوع العام <{ bookingId: string }> يضمن للواجهة معرفة شكل الاستجابة مسبقاً دون أي تخمين.",
      "flow": "المستخدم يؤكد المقاعد ⟶ تجهيز حمولة JSON ⟶ إرسال طلب http.post ⟶ استلام معرف الحجز من الخادم",
      "task": "تأمل أهمية طلبات POST لنقل التغييرات الجوهرية في حالة التطبيق إلى الخادم الخلفي بأمان تام.",
      "benefit": "استوعبت دور طلبات POST في تعديل البيانات المركزية وأهمية تحديد أنواع الاستجابة بدقة."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح البنية النحوية لمعاملات دالة http.post",
      "explanation": "تتكون الدالة من ثلاثة عناصر رئيسية: أولاً النوع العام <{ bookingId: string }> لتحديد شكل كائن الاستجابة، ثانياً المسار المستهدف '/api/bookings'، وثالثاً جسم الطلب (Payload) الذي يحتوي على movieId والمقاعد المختارة seats. يتم تحويل الكائن تلقائياً إلى نص JSON مهيكل مع ترويسة Content-Type: application/json دون أي تدخل يدوي من المطور، ويُرجع التعبير تدفق Observable جاهز للمراقبة.",
      "flow": "this.http.post<ResponseType> ⟶ الرابط المسار '/api/bookings' ⟶ حمولة البيانات payload ⟶ Observable<{ bookingId: string }>",
      "task": "حلل عناصر الاستدعاء: النوع الصارم بين القوسين المثلثين، الرابط كنص، والحمولة كمعامل ثانٍ.",
      "benefit": "أتقنت الصياغة القياسية لإرسال طلبات POST مع التعيين الصارم للأنواع في بيئة TypeScript."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم بإضافة دالة confirmBooking داخل ملف src/app/services/cinema.service.ts لإرسال حمولة حجز المقاعد واستلام معرف التذكرة عبر http.post.",
      "file": "src/app/services/cinema.service.ts",
      "code": "confirmBooking(payload: { movieId: number; seats: string[] }): Observable<{ bookingId: string }> {\n  return this.http.post<{ bookingId: string }>('/api/bookings', payload);\n}",
      "expected": "return this.http.post<{ bookingId: string }>('/api/bookings', payload);",
      "task": "اكتب دالة confirmBooking لإرسال حمولة الحجز عبر http.post ثم اضغط على زر (شغّل وافحص).",
      "benefit": "بنيت عملياً دالة اتصال بالشبكة لإجراء عمليات حجز حقيقية وموثوقة بنوع صارم."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "افتح ملف src/app/services/cinema.service.ts وتأمل كيف يمكنك إضافة معامل اختياري للترويسات مثل { headers: { 'X-Cinema-Source': 'Web' } } كمعامل ثالث لدالة http.post، أو تجربة توسيع واجهة الرد لتشمل خصائص إضافية مثل createdAt: string.",
      "task": "جرّب تمرير خيارات إضافية لدالة http.post مثل الترويسات المخصصة ولاحظ مرونة المعامل الثالث.",
      "benefit": "أدركت إمكانيات تخصيص خيارات الشبكة المتقدمة في طلبات POST مثل الترويسات والمهلة الزمنية."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "ما هو المعامل الثاني الذي نمرره عادة لدالة http.post؟",
      "options": [
        "جسم الطلب (Body Payload) المحتوي على البيانات المراد حفظها في الخادم",
        "اسم ملف CSS",
        "رقم الهاتف الشخصي"
      ],
      "correct": 0,
      "task": "ما هو المعامل الثاني الذي نمرره عادة لدالة http.post؟",
      "benefit": "إجابة صحيحة! المعامل الثاني لدالة http.post هو جسم الطلب (Body Payload) الذي يُرسل إلى الخادم بصيغة JSON ويحتوي على البيانات المراد معالجتها وتخزينها في قاعدة البيانات."
    }
  ]
},
  {
  "id": "ng-http-04",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "المعترضات الوظيفية الحديثة (Functional Interceptors)",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "بناء معترضات الشبكة الوظيفية عبر HttpInterceptorFn لاعتراض جميع الطلبات الصادرة تلقائياً وإرفاق رموز المصادقة JWT مع احترام مبدأ عدم القابلية للتعديل المباشر Immutability.",
  "concept": "في التطبيقات المؤسسية الكبرى، تصدر مئات الطلبات الشبكية من خدمات متنوعة في آن واحد لجلب الموارد وتأكيد الحجوزات وإجراء المعاملات. إن تكرار كود إضافة ترويسات الأمان والمصادقة (Authorization Headers) أو كود تسجيل السجلات والمراقبة (Logging & Telemetry) داخل كل خدمة بشكل منفرد يُعد خطأ معمارياً فادحاً ينتهك مبدأ عدم التكرار DRY ويجعل صيانة وتحديث مفاتيح الأمان كابوساً برمجياً. قدمت Angular المعترضات الوظيفية الحديثة (Functional Interceptors) عبر الواجهة النمطية HttpInterceptorFn كبديل خفيف وأنيق للنظام الكلاسيكي القديم القائم على الأصناف المزخرفة ومصفوفة HTTP_INTERCEPTORS المعقدة. تمثل الدالة المعترضة طبقة وسيطة (Middleware) تستقبل الطلب الصادر req ودالة الاستكمال next. ومن أهم المبادئ المعمارية الصارمة في عميل HTTP الخاص بـ Angular هو أن كائنات HttpRequest غير قابلة للتعديل إطلاقاً (Immutable)؛ وذلك لضمان عدم حدوث أي تداخلات أو تشويه للبيانات أثناء المعالجة المتزامنة عبر أنابيب التدفق. ولتعديل أي ترويسة أو رابط، يتعين على المطور استنساخ الطلب عبر الدالة req.clone({ setHeaders: { ... } }) ثم تمرير النسخة الجديدة المعدلة إلى دالة next(clonedReq). يتيح هذا النمط الوظيفي دمجاً سلساً مع مزودي التطبيق المستقل في appConfig عبر withInterceptors([authInterceptor])، مما يوفر منصة مركزية فائقة القوة لإدارة الأمان والتوثيق والقياس عن بعد.",
  "flow": "خروج الطلب ⟶ اعتراضه في authInterceptor ⟶ استنساخه مع Token ⟶ تمريره للخادم",
  "task": "اكتب المعترض الوظيفي authInterceptor لإضافة ترويسة Authorization لطلبات الشبكة.",
  "file": "src/app/interceptors/auth.interceptor.ts",
  "code": "import { HttpInterceptorFn } from '@angular/common/http';\n\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const authReq = req.clone({ setHeaders: { Authorization: 'Bearer KHOTWA_CINEMA_2026' } });\n  return next(authReq);\n};",
  "expected": "export const authInterceptor: HttpInterceptorFn = (req, next) => {",
  "reference": "https://angular.dev/guide/http/interceptors",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية للمعترضات الوظيفية كطبقة وسيطة موحدة",
      "explanation": "بدلاً من كتابة كود ترويسة التوثيق Authorization يدويًا في كل استدعاء لـ http.get أو http.post في تطبيق سينما خطوة، نقوم بإنشاء معترض وظيفي authInterceptor يتولى اعتراض كل طلب شبكي يغادر المتصفح، وإضافة رمز التحقق Bearer Token إليه تلقائياً قبل انطلاقه إلى الخادم. يضمن ذلك حماية وتوثيق كل طلبات الـ API بشكل مركزي وموحد دون أي تكرار للكود.",
      "flow": "طلب HTTP صادر من المكون ⟶ اعتراض في authInterceptor ⟶ تزويده برمز JWT ⟶ وصول الطلب موثقاً للخادم",
      "task": "تأمل كيف توفر المعترضات الوظيفية حلاً مركزياً وأنيقاً لأمان الشبكة وإدارة ترويسات الطلبات.",
      "benefit": "استوعبت مفهوم الـ Middleware في Angular ودوره في مركزية إجراءات الأمان والمراقبة."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح البنية النحوية لـ HttpInterceptorFn واستنساخ req.clone()",
      "explanation": "المعترض هو دالة من النوع HttpInterceptorFn تستقبل المعاملين (req, next). نظراً لكون req غير قابل للتعديل المباشر (Immutable)، نستخدم req.clone({ setHeaders: { Authorization: ... } }) لإنشاء نسخة جديدة من الطلب تحمل ترويسة التوثيق. أخيراً، نقوم بإعادة استدعاء next(authReq) لتمرير النسخة المعدلة إلى المعترض التالي أو إلى خادم الشبكة.",
      "flow": "HttpInterceptorFn(req, next) ⟶ استنساخ req.clone({ setHeaders }) ⟶ إرجاع next(authReq) للشبكة",
      "task": "حلل هيكل الدالة السهمية: معاملات req و next، واستخدام clone بدلاً من التعديل المباشر.",
      "benefit": "أتقنت صياغة المعترضات الوظيفية الحديثة وفهمت سر فرض عدم التعديل المباشر للطلبات."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم بكتابة المعترض الوظيفي authInterceptor داخل ملف src/app/interceptors/auth.interceptor.ts لإضافة ترويسة التفويض الموحدة لجميع طلبات الشبكة.",
      "file": "src/app/interceptors/auth.interceptor.ts",
      "code": "import { HttpInterceptorFn } from '@angular/common/http';\n\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const authReq = req.clone({ setHeaders: { Authorization: 'Bearer KHOTWA_CINEMA_2026' } });\n  return next(authReq);\n};",
      "expected": "export const authInterceptor: HttpInterceptorFn = (req, next) => {",
      "task": "اكتب المعترض الوظيفي authInterceptor لإضافة ترويسة Authorization لطلبات الشبكة ثم اضغط على زر (شغّل وافحص).",
      "benefit": "بنيت معترضاً وظيفياً حديثاً يؤمّن كافة اتصالات النظام بالخلفية باحترافية تامة."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "افتح ملف src/app/interceptors/auth.interceptor.ts وجرّب إضافة أمر console.log('جارٍ إرسال طلب إلى:', req.url) قبل أمر الإرجاع، أو تجربة فحص ما إذا كان الرابط يبدأ بـ '/api' قبل إرفاق الترويسة لضمان عدم إرسال التوكن لروابط خارجية.",
      "task": "أضف طباعة لعنوان الرابط في الكونسول أو شرط فحص المسار لتقوية المعترض أمنياً.",
      "benefit": "اكتسبت خبرة في التحكم الدقيق بالطلبات وتطبيق شروط أمنية مخصصة بحسب مسار الـ API."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "كيف نعدل طلب HTTP داخل الـ Interceptor نظراً لكونه غير قابل للتعديل المباشر (Immutable)؟",
      "options": [
        "باستنساخه عبر الدالة req.clone({ ... }) مع الخصائص المراد تحديثها",
        "بتعديل الرابط مباشرة مثل req.url = '...'",
        "بإنشاء طلب جافاسكريبت جديد"
      ],
      "correct": 0,
      "task": "كيف نعدل طلب HTTP داخل الـ Interceptor نظراً لكونه غير قابل للتعديل المباشر (Immutable)؟",
      "benefit": "إجابة ممتازة! كائنات HttpRequest في Angular غير قابلة للتعديل المباشر مطلقاً لحماية خط الأنابيب، ولذلك نستخدم req.clone() لإنشاء نسخة جديدة تحتوي على الترويسات والخصائص المعدلة بأمان."
    }
  ]
},
  {
  "id": "ng-interop-01",
  "module": "phase-5-di-http",
  "phase": "المرحلة الخامسة: الخدمات الحديثة والاتصال بالشبكة (Modern DI & HttpClient)",
  "title": "الجسر الاحترافي بين RxJS و Signals عبر toSignal()",
  "duration": "15 دقيقة",
  "level": "متقدم",
  "summary": "الربط المتناغم بين تدفقات RxJS غير المتزامنة ومحرك الإشارات الحديث عبر دالة toSignal() لتحقيق تفاعلية متزامنة فورية مع إدارة دورة حياة الاشتراك بدون أي تسريب للذاكرة.",
  "concept": "مع تطور إطار عمل Angular وظهور محرك الإشارات (Signals) الثوري في الإصدارات الحديثة، واجه المطورون تحدياً معمارياً هاماً: كيف يمكن التوفيق بين المكتبة الارتكاسية العريقة RxJS التي يعتمد عليها عميل الشبكة HttpClient بصورة طبيعية، وبين بساطة وسرعة قراءة الإشارات داخل قوالب المكونات؟ فبينما تتفوق تدفقات RxJS Observables في التعامل مع الأحداث غير المتزامنة المعقدة عبر الزمن، والتراجع التلقائي، وإلغاء الطلبات، وإعادة المحاولة، فإن الإشارات تقدم أفضل نموذج لقراءة الحالة التزامنية اللحظية داخل القوالب وتشغيل كشف التغييرات فائق الدقة بدون أي حاجة لمنظومة Zone.js الثقيلة. هنا يأتي دور الحزمة الرسمية @angular/core/rxjs-interop ودالتها الجوهرية toSignal(). تعمل دالة toSignal() كجسر تحويلي يربط التدفق غير المتزامن بالإشارة المتزامنة؛ حيث تقوم بالاشتراك التلقائي في التدفق Observable عند لحظة التهيئة، وتوفر قيمة أولية متزامنة عبر خيار initialValue لتفادي الأخطاء وقيم undefined في القالب قبل وصول رد الخادم. والأهم معمارياً هو أن toSignal() ترتبط تلقائياً بسياق الحقن (Injection Context) للمكون، مما يعني أنها تقوم بإلغاء الاشتراك (Unsubscribe) تلقائياً ودون أي تدخل يدوي بمجرد تدمير المكون، مما يقضي تماماً على خطر تسريب الذاكرة (Memory Leaks) الذي كان يطارد مطوري Angular لسنوات عند إدارة الاشتراكات يدوياً.",
  "flow": "تدفق fetchMovies$ ⟶ تحويل بـ toSignal() ⟶ قراءته كإشارة movies() في القالب",
  "task": "حوّل تدفق الأفلام إلى إشارة moviesList باستخدام toSignal().",
  "file": "src/app/app.ts",
  "code": "import { toSignal } from '@angular/core/rxjs-interop';\n\nexport class App {\n  moviesList = toSignal(this.cinemaService.fetchMovies(), { initialValue: [] });\n}",
  "expected": "moviesList = toSignal(",
  "reference": "https://angular.dev/guide/signals/rxjs-interop",
  "steps": [
    {
      "id": "idea",
      "type": "observe",
      "title": "الفكرة المعمارية لجسر التحويل بين RxJS و Signals",
      "explanation": "في سينما خطوة، تعود دالة fetchMovies() من الخدمة بتدفق ارتكاسي Observable يحمل قائمة الأفلام من الخادم. في السابق، كان على المطور إما كتابة اشتراك يدوي subscribe مع تتبع ngOnDestroy لإلغائه وتفادي تسريب الذاكرة، أو استخدام أنبوب async pipe في كل مكان بالقالب. عبر دالة toSignal()، نحول التدفق بسطر واحد إلى إشارة Signal نقية moviesList()، مع اشتراك تلقائي وإلغاء ذاتي للأمان التام.",
      "flow": "خدمة الأفلام fetchMovies$ ⟶ تحويل سحري عبر toSignal() ⟶ إشارة moviesList() نظيفة في المكون",
      "task": "تأمل سهولة قراءة البيانات كإشارة نقية moviesList() بدلاً من تعقيدات الاشتراك اليدوي في الـ Observable.",
      "benefit": "استوعبت كيفية الجمع بين قوة RxJS في الشبكات وبساطة Signals في القوالب دون كتابة boilerplate."
    },
    {
      "id": "anatomy",
      "type": "observe",
      "title": "تشريح البنية النحوية لاستدعاء toSignal() وخيار initialValue",
      "explanation": "يتم استيراد toSignal من حزمة @angular/core/rxjs-interop. تستقبل الدالة التدفق الارتكاسي كمعامل أول (this.cinemaService.fetchMovies())، وتستقبل كائناً اختيارياً للإعدادات كمعامل ثانٍ مثل { initialValue: [] } لتعيين قيمة ابتدائية تمنع ظهور undefined في القالب أثناء انتظار وصول رد الشبكة. والنتيجة هي إشارة للقراءة فقط Signal<Movie[]> تتحدث ذاتياً عند وصول البيانات.",
      "flow": "استيراد { toSignal } ⟶ تمرير التدفق Observable ⟶ ضبط { initialValue: [] } ⟶ ناتج Signal جاهز للقالب",
      "task": "حلل أجزاء الاستدعاء: استيراد rxjs-interop، تمرير التدفق، وتحديد القيمة الابتدائية initialValue.",
      "benefit": "أتقنت ضبط الإشارات المحولة وتأمين القوالب ضد قيم undefined وقت التحميل."
    },
    {
      "id": "practice",
      "type": "build",
      "title": "اكتب وطبّق في المحرر",
      "explanation": "سنقوم باستيراد toSignal داخل ملف src/app/app.ts وتحويل تدفق أفلام السينما إلى إشارة moviesList مع قيمة أولية مصفوفة فارغة [].",
      "file": "src/app/app.ts",
      "code": "import { toSignal } from '@angular/core/rxjs-interop';\n\nexport class App {\n  moviesList = toSignal(this.cinemaService.fetchMovies(), { initialValue: [] });\n}",
      "expected": "moviesList = toSignal(",
      "task": "حوّل تدفق الأفلام إلى إشارة moviesList باستخدام toSignal() ثم اضغط على زر (شغّل وافحص).",
      "benefit": "ربطت بنجاح بين عميل الشبكة ومحرك الإشارات الحديث في مكون التطبيق الرئيسي."
    },
    {
      "id": "experiment",
      "type": "edit",
      "title": "تعديل موجّه وتجربة تفاعلية",
      "explanation": "افتح ملف src/app/app.ts وجرّب إضافة خاصية rejectErrors: true إلى كائن الإعدادات في toSignal()، أو جرّب استخدام moviesList() داخل دالة computed() لحساب عدد الأفلام المتاحة، وشاهد كيف تتناغم الإشارة المحولة بسلاسة تامة مع باقي أدوات محرك التفاعلية.",
      "task": "جرّب قراءة moviesList() داخل computed() ولاحظ التوافق التام مع منظومة Signals.",
      "benefit": "اكتشفت مرونة دمج التدفقات المحولة داخل شبكة الاعتماديات التفاعلية في Angular."
    },
    {
      "id": "quiz",
      "type": "quiz",
      "title": "تأكد من الفكرة بسؤال سريع",
      "question": "ما هي الوظيفة الأساسية لدالة toSignal() في Angular الحديثة؟",
      "options": [
        "تحويل الـ Observable إلى Signal تلقائياً مع إدارة الاشتراك وإلغائه بأمان",
        "إيقاف تشغيل RxJS في التطبيق",
        "إرسال تنبيه للمستخدم عبر الرسائل القصيرة"
      ],
      "correct": 0,
      "task": "ما هي الوظيفة الأساسية لدالة toSignal() في Angular الحديثة؟",
      "benefit": "إجابة ممتازة! دالة toSignal() توفر جسراً سلساً لتحويل تدفقات RxJS إلى إشارات متزامنة للقراءة في القالب، مع التكفل التلقائي بالاشتراك وإلغائه لمنع أي تسريب في الذاكرة."
    }
  ]
},
  {
    "id": "ng-route-01",
    "module": "phase-6-routing-forms",
    "phase": "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
    "title": "إعداد المسارات الحديثة ومصفوفة Routes المستقلة",
    "duration": "15 دقيقة",
    "level": "متقدم",
    "summary": "تأسيس البنية التحتية لتوجيه المسارات في تطبيقات Angular الحديثة باستخدام مصفوفة Routes المستقلة، وضبط مسارات إعادة التوجيه التلقائي للمسار الفارغ بدقة pathMatch: 'full'، وعرض الشاشات عبر مخرج التوجيه <router-outlet /> دون أي حاجة لـ RouterModule القديم.",
    "concept": "في معمارية Angular الحديثة (Standalone Architecture)، شهد نظام التوجيه (Routing System) تحولاً جذرياً نحو التبسيط والأداء الفائق، حيث تم التخلص نهائياً من الوحدات النمطية الكلاسيكية RouterModule.forRoot() و RouterModule.forChild() التي كانت تفرض تعقيدات تشابك التبعيات وصعوبة عزل المكونات. بدلاً من ذلك، أصبح إعداد المسارات يعتمد على مصفوفة صريحة وخفيفة من النوع Routes تُعرّف في ملف مستقل مثل app.routes.ts، ويتم تزويدها للتطبيق مباشرة عبر دالة الإقلاع الحديثة provideRouter(routes) داخل ملف تهيئة التطبيق appConfig. يتولى جدول المسارات مسؤولية رسم خريطة الروابط (URL Tree) ومطابقتها مع المكونات المعنية. ومن القواعد المعمارية الحيوية في توجيه Angular هو كيفية التعامل مع المسار الافتراضي الفارغ { path: '', redirectTo: 'movies', pathMatch: 'full' }؛ حيث إن خوارزمية مطابقة الروابط في Angular تطابق البادئة افتراضياً (prefix matching)، وبما أن المسار الفارغ يُعد بادئة لأي رابط على الإطلاق في المتصفح، فإن عدم تحديد pathMatch: 'full' سيؤدي إلى دخول التطبيق في حلقة إعادة توجيه لانهائية (Infinite Redirect Loop) وتعطيل التوجيه بالكامل. وبمجرد مطابقة الرابط المطلوب، يأتي دور مخرج التوجيه الديناميكي <router-outlet /> الذي يتم تضمينه في قالب المكون الجذري App؛ حيث يعمل كمنفذ بصري ذكي يقوم محرك Angular بحقن شجرة DOM للمكون المطابق بداخله وإدارتها وفق دورة حياة التوجيه دون إعادة تحميل الصفحة (Single Page Application).",
    "flow": "تغيير الرابط بالمتصفح ⟶ مطابقة مسار Routes ⟶ عرض المكون في <router-outlet />",
    "task": "أنشئ جدول المسارات routes مع مسار التحويل التلقائي للأفلام.",
    "file": "src/app/app.routes.ts",
    "code": "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'movies', pathMatch: 'full' }\n];",
    "expected": "export const routes: Routes = [",
    "reference": "https://angular.dev/guide/routing",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية لمصفوفة Routes المستقلة ومخرج التوجيه",
        "explanation": "في تطبيق سينما خطوة، يحتاج المستخدم للتنقل بسلاسة بين شاشة استعراض الأفلام وشاشة تفاصيل الفيلم وسلة الحجز. في المعمارية الحديثة لـ Angular، لا نحتاج لتسجيل وحدات NgModule المعقدة، بل نقوم بتعريف مصفوفة مسارات نقية من النوع Routes في ملف app.routes.ts. عندما يفتح الزائر الموقع لأول مرة على الرابط الجذري، يقوم مسار التحويل التلقائي بنقله مباشرة إلى مسار الأفلام '/movies' دون إعادة تحميل الصفحة، لتقوم Angular بحقن واجهة المكون المطابق داخل الوسم المركزي <router-outlet />.",
        "flow": "المستخدم يطلب الرابط ⟶ محرك التوجيه يفحص routes ⟶ توجيه المسار الفارغ للأفلام ⟶ عرض الشاشة في <router-outlet />",
        "task": "تأمل كيف استغنت Angular الحديثة عن تعقيدات NgModule لصالح مصفوفة routes نقية ومباشرة.",
        "benefit": "استوعبت الهيكل الحديث للتوجيه المستقل ودور مخرج التوجيه <router-outlet /> كبوابة عرض مرنة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لـ Routes وخاصية pathMatch: 'full'",
        "explanation": "تتكون مصفوفة المسارات من كائنات ذات خصائص محددة: الخاصية path تحدد مقطع الرابط في المتصفح، والخاصية redirectTo تحدد المسار البديل المراد التحويل إليه. أما الخاصية الحاسمة pathMatch: 'full' فهي تخبر محرك التوجيه بألا ينفذ التحويل إلا إذا كان كامل الرابط بعد اسم النطاق فارغاً تماماً؛ وذلك لمنع مطابقة المسار الفارغ مع الروابط الأخرى مثل /movies أو /booking وحمايتنا من أخطاء التوجيه المتكررة.",
        "flow": "مصفوفة Routes ⟶ تعريف المسار { path: '' } ⟶ التحويل redirectTo: 'movies' ⟶ المطابقة الكاملة pathMatch: 'full'",
        "task": "حلل عناصر كائن المسار: المسار path، وجهة التحويل redirectTo، وخاصية التطابق التام pathMatch.",
        "benefit": "أتقنت ضبط معاملات المسارات وفهمت سر فرض التطابق التام pathMatch: 'full' لتجنب حلقات التوجيه اللانهائية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مصفوفة routes داخل ملف src/app/app.routes.ts مع تعريف مسار إعادة التوجيه التلقائي للمسار الفارغ نحو صفحة الأفلام movies.",
        "file": "src/app/app.routes.ts",
        "code": "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'movies', pathMatch: 'full' }\n];",
        "expected": "export const routes: Routes = [",
        "task": "أنشئ جدول المسارات routes مع مسار التحويل التلقائي للأفلام ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت عملياً جدول مسارات مستقل لتطبيق سينما خطوة مع تأمين التوجيه الافتراضي بأمان واحترافية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.routes.ts وجرّب إضافة مسار بديل للتعامل مع الروابط الخاطئة أو غير المعرفة (Wildcard Route) باستخدام النمط { path: '**', redirectTo: 'movies' }، وتأمل كيف يقوم Angular بالتقاط أي رابط عشوائي يكتبه المستخدم وإعادته إلى شاشة الأفلام الرئيسية.",
        "task": "جرّب إضافة مسار مسار غير معروف '**' وتأمل كيف تحمي التطبيق من أخطاء الروابط المفقودة 404.",
        "benefit": "اكتسبت مهارة تأمين التطبيق ضد الروابط الخاطئة والتحكم في سلوك إعادة التوجيه الشامل."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "أين يتم عرض واجهة المكون المطابق للمسار الحالي في الصفحة الرئيسية؟",
        "options": [
          "داخل وسم مخرج التوجيه <router-outlet />",
          "داخل وسم التذييل footer",
          "في نافذة منبثقة"
        ],
        "correct": 0,
        "task": "أين يتم عرض واجهة المكون المطابق للمسار الحالي في الصفحة الرئيسية؟",
        "benefit": "إجابة صحيحة! وسم مخرج التوجيه <router-outlet /> يعمل كبوابة ومنفذ عرض ديناميكي في الصفحة الرئيسية يقوم Angular بحقن واجهة المكون المطابق للرابط الحالي بداخله تلقائياً."
      }
    ]
  },
  {
    "id": "ng-route-02",
    "module": "phase-6-routing-forms",
    "phase": "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
    "title": "التحميل الكسول للمكونات عبر loadComponent",
    "duration": "15 دقيقة",
    "level": "متقدم",
    "summary": "تحسين أداء التطبيق وتقليص حجم الحزمة البرمجية الابتدائية من خلال تقنية التحميل الكسول للمكونات المستقلة عبر loadComponent والاستيراد الديناميكي import() لشاشات الحجز الثقيلة عند طلبها فقط.",
    "concept": "في هندسة تطبيقات الويب الحديثة، يُعد مقياس سرعة التحميل الأولية وحجم حزمة الجافاسكريبت (Initial Bundle Size) العامل الفاصل في تجربة المستخدم ومؤشرات الأداء الحيوية (Core Web Vitals) مثل Largest Contentful Paint (LCP) و Total Blocking Time (TBT). إذا تم استيراد جميع مكونات التطبيق وشاشات الحجز والتأكيد ونماذج الدفع المعقدة بشكل تزامني ومباشر (Eager Loading) في الحزمة الرئيسية، سيتضخم حجم الملف الذي يتعين على متصفح العميل تنزيله وتحليله قبل أن يرى أي شيء على الشاشة، خاصة على شبكات الجوال البطيئة. لحل هذه المشكلة المعمارية، قدمت Angular في منظومة المكونات المستقلة خاصية loadComponent التي تعتمد على ميزة الاستيراد الديناميكي القياسية في JavaScript عبر دالة import(). تتيح هذه الخاصية تقسيم الكود إلى حزم منفصلة (Code Splitting / Lazy Chunks)؛ بحيث لا يتم تنزيل حزمة مكون الحجز BookingComponent من الخادم إلا في اللحظة الدقيقة التي ينقر فيها المستخدم على زر حجز التذكرة وينتقل الرابط إلى 'booking/:id'. يقوم مجمع الكود (Bundler مثل Vite أو esbuild في Angular 22) بإنشاء ملف حزمة مستقل للمكون وتوليد خط أنابيب لتحميله غير المتزامن عبر شبكة الإنترنت. هذا النمط المعماري يضمن بقاء الصفحة الرئيسية لتطبيق سينما خطوة فائقة الخفة والسرعة، ويوفر استهلاك البيانات للمستخدمين الذين قد يكتفون بتصفح قائمة الأفلام دون إجراء عملية حجز.",
    "flow": "فتح الرئيسية ⟶ عدم تنزيل حزمة الحجز ⟶ تنزيلها عند نقر رابط الفيلم فقط",
    "task": "أضف مسار الحجز بالتحميل الكسول loadComponent: () => import(...).",
    "file": "src/app/app.routes.ts",
    "code": "{\n  path: 'booking/:id',\n  loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent)\n}",
    "expected": "loadComponent: () => import('./features/booking/booking.component')",
    "reference": "https://angular.dev/guide/routing/common-router-tasks#lazy-loading",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية للتحميل الكسول (Lazy Loading) وتقسيم الحزم",
        "explanation": "في منصة سينما خطوة، تحتوي شاشة حجز التذاكر على منطق معقد يشمل خريطة المقاعد التفاعلية وساعات العد التنازلي ونماذج الدفع. بدلاً من تحميل هذا الكود الثقيل لكل زائر يفتح الموقع لمجرد استعراض الأفلام، نستخدم التحميل الكسول loadComponent لتأجيل تحميل شاشة الحجز حتى يقوم المستخدم فعلياً بالنقر على فيلم معين والانتقال إلى رابط الحجز.",
        "flow": "المستخدم يفتح الرئيسية ⟶ تحميل حزمة الأفلام فقط ⟶ الضغط على حجز فيلم ⟶ جلب حزمة الحجز بالطلب (On Demand)",
        "task": "تأمل كيف يوفر التحميل الكسول سرعة فائقة في فتح التطبيق بتأجيل تنزيل الشاشات الثقيلة حتى وقت الحاجة.",
        "benefit": "استوعبت أهمية تقليل زمن التحميل الأولي (Initial Bundle Size) وتحسين مقاييس الأداء ومؤشرات الويب الأساسية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لخاصية loadComponent والاستيراد الديناميكي",
        "explanation": "تعتمد خاصية loadComponent على دالة سهمية تعيد استدعاء الاستيراد الديناميكي () => import('./features/booking/booking.component'). تُرجع هذه الدالة وعداً (Promise) يقوم مجمع الكود بتحليله لإنشاء حزمة منفصلة، وباستخدام .then(m => m.BookingComponent) نحدد كلاس المكون المستقل المراد تشغيله فور اكتمال التنزيل وعرضه في مخرج التوجيه.",
        "flow": "خاصية loadComponent ⟶ دالة استيراد ديناميكية () => import(...) ⟶ معالجة الوعد .then(m => m.BookingComponent) ⟶ توليد حزمة منفصلة",
        "task": "حلل تركيب الاستيراد الديناميكي: الدالة السهمية، استدعاء import كدالة، واستخراج الكلاس من الوحدة.",
        "benefit": "أتقنت صياغة التحميل الكسول للمكونات المستقلة وفهمت آلية عمل الـ Chunking في مجمعات الكود الحديثة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإضافة مسار حجز التذاكر 'booking/:id' داخل ملف src/app/app.routes.ts باستخدام خاصية loadComponent والاستيراد الديناميكي لمكون BookingComponent.",
        "file": "src/app/app.routes.ts",
        "code": "{\n  path: 'booking/:id',\n  loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent)\n}",
        "expected": "loadComponent: () => import('./features/booking/booking.component')",
        "task": "أضف مسار الحجز بالتحميل الكسول loadComponent: () => import(...) ثم اضغط على زر (شغّل وافحص).",
        "benefit": "طبّقت عملياً أفضل ممارسات تقسيم الكود (Code Splitting) لرفع كفاءة تطبيق سينما خطوة إلى أعلى المستويات."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/app.routes.ts وتأمل كيف يمكنك إضافة خاصية title للمسار مثل title: 'سينما خطوة - حجز التذاكر' لتحديث عنوان تبويب المتصفح تلقائياً عند فتح شاشة الحجز، أو تجربة استخدام استراتيجيات التحميل المسبق (Preloading Strategies) لتحميل الحزم في الخلفية بعد أن يستقر التطبيق.",
        "task": "جرّب إضافة خاصية title لمسار الحجز ولاحظ كيف تتكامل مسارات Angular مع بيانات المتصفح.",
        "benefit": "اكتسبت فهماً عميقاً لخصائص المسارات المتقدمة مثل العناوين الديناميكية واستراتيجيات التحميل المسبق (Preloading)."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو الهدف الرئيسي من استخدام التحميل الكسول (Lazy Loading) للمسارات؟",
        "options": [
          "تقليل حجم الحزمة الابتدائية وتسريع زمن فتح التطبيق للزائر",
          "تقليل استهلاك ذاكرة الخادم",
          "منع المستخدم من مشاركة الرابط"
        ],
        "correct": 0,
        "task": "ما هو الهدف الرئيسي من استخدام التحميل الكسول (Lazy Loading) للمسارات؟",
        "benefit": "إجابة ممتازة! التحميل الكسول يهدف إلى تقسيم كود التطبيق إلى حزم صغيرة، بحيث يتم تنزيل حزم الشاشات والميزات الثانوية فقط عندما يقرر الزائر فتحها، مما يمنح التطبيق سرعة تشغيل أولية مذهلة."
      }
    ]
  },
  {
    "id": "ng-route-03",
    "module": "phase-6-routing-forms",
    "phase": "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
    "title": "قراءة معاملات الرابط الذكية كـ Signal Inputs",
    "duration": "15 دقيقة",
    "level": "متقدم",
    "summary": "استقبال معاملات مسارات الروابط الديناميكية مثل :id وتحويلها تلقائياً إلى مدخلات إشارات صارمة عبر ميزة withComponentInputBinding() الحديثة بدون أي اشتراكات يدوية في ActivatedRoute.",
    "concept": "في الإصدارات الكلاسيكية السابقة من إطار عمل Angular، كانت عملية استخراج المعاملات الديناميكية من مسار الرابط (مثل معرف الفيلم :id في الرابط /booking/:id) أو معاملات الاستعلام (Query Parameters) تتطلب كتابة كود متكرر ومعقد (Boilerplate). كان يتعين على المطور حقن خدمة ActivatedRoute داخل مشيد المكون، ثم الاشتراك يدوياً في تدفق route.paramMap عبر RxJS، والتعامل مع معاملات غير متزامنة وإلغاء الاشتراك عند تدمير المكون لمنع تسريب الذاكرة (Memory Leaks)، فضلاً عن الربط الوثيق بين كود المكون الداخلي ونظام التوجيه مما يعيق إعادة استخدامه خارج سياق الـ Router. ولكن مع إطلاق Angular 16+ ومحرك الإشارات الحديث في Angular 17 حتى 22، تم تقديم ميزة ثورية تغير قواعد اللعبة وهي withComponentInputBinding() التي يتم تفعيلها داخل دالة provideRouter. بهذه الميزة البسيطة، يقوم محرك التوجيه بربط معاملات المسار مباشرة بمدخلات المكون التي تحمل نفس الاسم! وعند دمج هذه الميزة مع مدخلات الإشارات الحديثة id = input.required<string>()، يصبح المكون قادراً على قراءة معرف الفيلم كإشارة ارتكاسية نقية متزامنة، تتحدث قيمتها ذاتياً عند تغير المعامل في شريط العنوان، مما يسهل ربطها بالعمليات الحسابية المشتقة computed() أو جلب تفاصيل الفيلم بسلاسة فائقة، ويجعل المكون قابلاً لإعادة الاستخدام بسهولة سواء كصفحة مسار مستقلة أو كمكون مدمج في قالب آخر عبر تمرير الخاصية [id]='123'.",
    "flow": "زيارة /booking/5 ⟶ تمرير المعامل 5 كإشارة id = input<string>() ⟶ سهولة فائقة",
    "task": "استقبل معرف الفيلم من الرابط كمدخل إشارة إلزامي id = input.required<string>().",
    "file": "src/app/features/booking/booking.component.ts",
    "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-booking',\n  standalone: true,\n  template: '<h2>حجز الفيلم رقم: {{ id() }}</h2>'\n})\nexport class BookingComponent {\n  id = input.required<string>();\n}",
    "expected": "id = input.required<string>();",
    "reference": "https://angular.dev/guide/routing/common-router-tasks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية لربط معاملات الرابط كمدخلات إشارات",
        "explanation": "في شاشة حجز التذاكر بسينما خطوة، نريد معرفة أي فيلم اختاره الزائر لقراءة بياناته وعرض مقاعده. في المعمارية الحديثة، نفعّل خيار withComponentInputBinding() في نظام التوجيه، ليقوم Angular تلقائياً بأخذ قيمة :id من الرابط (مثل /booking/5) وتمريرها مباشرة كمدخل إشارة id() داخل المكون، بدون أي حاجة لكتابة اشتراكات RxJS أو استدعاءات معقدة لـ ActivatedRoute.",
        "flow": "المتصفح يطلب /booking/42 ⟶ محرك التوجيه يستخرج المعامل 42 ⟶ حقن القيمة تلقائياً في id() ⟶ تحديث القالب فوراً",
        "task": "تأمل التخلص التام من boilerplate الاشتراك في ActivatedRoute لصالح إشارة نقية id().",
        "benefit": "استوعبت كيف تجعل ميزة withComponentInputBinding المكونات أكثر نقاءً وقابلة لإعادة الاستخدام بسهولة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح البنية النحوية لدالة input.required<string>() وربط المسار",
        "explanation": "يقوم السطر id = input.required<string>() بتعريف مدخل إشارة إلزامي لن يقبل العمل بدونه. يتم مطابقة اسم الخاصية id تماماً مع رمز المعامل :id المعرف في جدول المسارات app.routes.ts. داخل القالب، يتم استدعاء الإشارة كدالة {{ id() }} للقراءة التزامنية اللحظية، وتستجيب تلقائياً لأي تغيير يطرأ على الرابط في المتصفح.",
        "flow": "معامل المسار :id ⟶ تطابق الاسم مع id ⟶ تعريف الإشارة input.required<string>() ⟶ القراءة في القالب {{ id() }}",
        "task": "حلل عناصر التعريف: تطابق اسم الخاصية مع معامل المسار، واستخدام .required لفرض وجود القيمة، والنوع الصارم <string>.",
        "benefit": "أتقنت استقبال المعاملات الديناميكية كمدخلات إشارات ذات أمان نوعي صارم وتحكم فائق."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مكون حجز التذاكر BookingComponent في ملف src/app/features/booking/booking.component.ts مع استقبال معرف الفيلم مباشرة كمدخل إشارة إلزامي id = input.required<string>().",
        "file": "src/app/features/booking/booking.component.ts",
        "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-booking',\n  standalone: true,\n  template: '<h2>حجز الفيلم رقم: {{ id() }}</h2>'\n})\nexport class BookingComponent {\n  id = input.required<string>();\n}",
        "expected": "id = input.required<string>();",
        "task": "استقبل معرف الفيلم من الرابط كمدخل إشارة إلزامي id = input.required<string>() ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت مكون حجز متطور يعتمد على الإشارات الحديثة ويستقبل معاملات التوجيه بسطر واحد وبلا أي تعقيد."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "افتح ملف src/app/features/booking/booking.component.ts وجرّب إضافة خاصية مشتقة computed مثل movieTitle = computed(() => 'فيلم رقم ' + this.id())، أو تجربة إضافة مدخل اختياري لمعاملات الاستعلام مثل showTime = input<string>('20:00') لاستقبال ?showTime=18:00 من الرابط.",
        "task": "جرّب إضافة مدخل إشارة اختياري showTime = input<string>() ولاحظ كيف يستقبل معاملات الـ Query Params بنفس البساطة.",
        "benefit": "تعمقت في قوة مدخلات الإشارات وقدرتها على استيعاب كل من Path Params و Query Params بصياغة موحدة وأنيقة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الميزة التي يقدمها تفعيل withComponentInputBinding() في التوجيه؟",
        "options": [
          "قراءة معاملات الرابط مباشرة كـ Signal Inputs داخل المكون دون الحاجة لـ ActivatedRoute",
          "إعادة توجيه المستخدم لصفحة تسجيل الدخول",
          "إخفاء شريط العنوان"
        ],
        "correct": 0,
        "task": "ما الميزة التي يقدمها تفعيل withComponentInputBinding() في التوجيه؟",
        "benefit": "إجابة صحيحة! تفعيل withComponentInputBinding() في provideRouter يلغي الحاجة تماماً لحقن ActivatedRoute والاشتراك في paramMap، حيث يقوم Angular بربط متغيرات الرابط مباشرة بمدخلات الإشارة بالمكون."
      }
    ]
  },
  {
    "id": "ng-route-04",
    "module": "phase-6-routing-forms",
    "phase": "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
    "title": "حماية المسارات بالحراس الوظيفيين (Functional Guards via CanActivateFn)",
    "duration": "15 دقيقة",
    "level": "متقدم",
    "summary": "استيعاب وتطبيق الحراس الوظيفيين المعاصرين (Functional Route Guards) في Angular لحماية المسارات الحساسة مثل شاشة حجز التذاكر؛ الاستغناء التام عن أصناف الكلاسات المعقدة والواجهة المهملة CanActivate لصالح دالة السهم النقية CanActivateFn، وحقن التبعيات بسلاسة عبر دالة inject() كـ Router وخدمات الحالة، مع إعادة توجيه المستخدم غير المصرح له بأمان عبر router.createUrlTree.",
    "concept": "في الإصدارات الكلاسيكية السابقة لإطار عمل Angular، كانت حماية المسارات (Route Guards) تعتمد كلياً على نمط الفئات التقليدية؛ حيث كان يتعين على المطور إنشاء كلاس مزخرف بـ @Injectable وتطبيق واجهة CanActivate مع كتابة منشئ constructor لحقن التبعيات، وتسجيل الكلاس كمزود في منظومة الحقن. هذا النمط كان يفرض تعقيداً هيكلياً وتكراراً غير مبرر للأكواد، ويزيد من حجم الحزم البرمجية بصورة ملحوظة.\nمع انطلاق الثورة الوظيفية في معمارية Angular الحديثة، تم تقديم الحراس الوظيفيين (Functional Guards) القائمين على الواجهة النمطية CanActivateFn كمعيار وحيد وموصى به رسمياً لحماية المسارات. الحارس الوظيفي هو ببساطة دالة سهمية نقية (Arrow Function) تستقبل المعاملين (route, state) وتُرجع إما قيمة منطقية boolean أو كائن شجرة العناوين UrlTree (أو تدفقاً ارتكاسياً Observable أو وعداً Promise يحل إلى أحدهما).\nمن أعظم المزايا الهندسية للحراس الوظيفيين هي قدرتهم على استدعاء دالة الحقن inject() مباشرة داخل متن الدالة، نظراً لتشغيل الحارس في سياق حقن نشط (Injection Context). يتيح ذلك للمطور حقن كائن الموجه inject(Router) ومخازن الحالة المشتركة مثل inject(CinemaStore) بدون الحاجة لكتابة كلاس أو منشئ إطلاقاً.\nعلاوة على ذلك، يمثل التعامل مع محاولات الدخول غير المصرح بها فارقاً جوهرياً في تجربة المستخدم؛ فإرجاع false يلغي عملية التنقل بصمت ويبقي المستخدم في مكانه مما يسبب ارتباكاً كبيراً، بينما يوفر استخدام router.createUrlTree(['/movies']) أسلوباً احترافياً وأنيقاً لتوجيه المتصفح تلقائياً إلى شاشة الأفلام البديلة دون كسر سلسلة الملاحة أو تشويه تاريخ التصفح في منصة سينما خطوة الاحترافية.",
    "flow": "محاولة دخول مسار الحجز ⟶ تفعيل bookingGuard ⟶ فحص الحالة بـ inject() ⟶ السماح بـ true أو التحويل بـ router.createUrlTree(['/movies'])",
    "task": "اكتب الحارس الوظيفي bookingGuard داخل الملف src/app/guards/booking.guard.ts باستخدام CanActivateFn ودالة inject(Router) لإعادة توجيه الزائر عند عدم توفر مقعد.",
    "file": "src/app/guards/booking.guard.ts",
    "code": "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\n\nexport const bookingGuard: CanActivateFn = (route, state) => {\n  const router = inject(Router);\n  const hasSeat = true;\n  return hasSeat ? true : router.createUrlTree(['/movies']);\n};",
    "expected": "export const bookingGuard: CanActivateFn = (route, state) => {",
    "reference": "https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: حراسة المسارات بدوال وظيفية خفيفة CanActivateFn",
        "explanation": "في معمارية Angular الحديثة، استُبدلت الفئات الثقيلة بدوال وظيفية نقية CanActivateFn. تمكّنك هذه الدوال من فحص أذونات المستخدم وسلة الحجز بدقة وخفة متناهية، وحقن التبعيات كالموجّه ومخزن البيانات باستدعاء وظيفي مباشر inject() دون حشو المنشئات أو كتابة أصناف إضافية.",
        "flow": "طلب تنقل من العميل ⟶ تنفيذ CanActivateFn ⟶ فحص الصلاحيات وظيفياً بـ inject() ⟶ اتخاذ قرار العبور أو التحويل",
        "task": "تأمل كيف وفرت الدوال الوظيفية عشرات الأسطر من الكود البرمجي الزائد مقارنة بالحراس الكلاسيكيين القدامى.",
        "benefit": "استوعبت الميزة المعمارية للحراس الوظيفيين والتخلص من الفئات الزائدة في Angular الحديثة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة CanActivateFn واستخدام دالة inject(Router)",
        "explanation": "تأخذ دالة CanActivateFn المعاملين (route: ActivatedRouteSnapshot, state: RouterStateSnapshot). وبفضل تشغيلها في سياق الحقن، نستدعي const router = inject(Router) مباشرة داخل المتن. عند الرغبة في تحويل المستخدم غير المصرح له، نعيد router.createUrlTree(['/movies']) لتوليد شجرة مسار جديدة تنقل المتصفح بسلاسة.",
        "flow": "export const bookingGuard: CanActivateFn = (route, state) => { ⟶ inject(Router) ⟶ return router.createUrlTree(['/movies']) }",
        "task": "حلل معاملات الدالة route و state وكيفية توليد شجرة العنوان البديلة router.createUrlTree.",
        "benefit": "أتقنت التوقيع النمطي الدقيق لدالة CanActivateFn وإرجاع شجرة العناوين البديلة بأمان نوعي."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بكتابة الحارس الوظيفي bookingGuard داخل الملف src/app/guards/booking.guard.ts للتحقق من اختيار المقعد قبل السماح بدخول مسار الحجز، وتحويل المستخدم لصفحة الأفلام بـ createUrlTree.",
        "file": "src/app/guards/booking.guard.ts",
        "code": "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\n\nexport const bookingGuard: CanActivateFn = (route, state) => {\n  const router = inject(Router);\n  const hasSeat = true;\n  return hasSeat ? true : router.createUrlTree(['/movies']);\n};",
        "expected": "export const bookingGuard: CanActivateFn = (route, state) => {",
        "task": "اكتب كود الحارس الوظيفي bookingGuard في ملف src/app/guards/booking.guard.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت عملياً حارساً وظيفياً لحماية شاشات حجز التذاكر في منصة سينما خطوة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تغيير قيمة المتغير hasSeat إلى false داخل كود الحارس، وتأمل كيف تقوم دالة router.createUrlTree(['/movies']) بتوجيه المستخدم تلقائياً إلى صفحة قائمة الأفلام بدلاً من إلغاء التنقل بصمت.",
        "task": "جرّب تعديل قيمة hasSeat إلى false وتأمل منطق تحويل المستخدم إلى صفحة الأفلام.",
        "benefit": "فهمت عملياً سلوك التحويل التلقائي عبر UrlTree عند رفض الحارس للتنقل."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي القيمة المفضلة التي تعيدها دالة CanActivateFn لإعادة توجيه الزائر لمسار آخر عند فشل التحقق؟",
        "options": [
          "شجرة عناوين جديدة مولدة عبر router.createUrlTree(['/movies'])",
          "نص خطأ مباشر مثل 'Access Denied'",
          "رقم كود الخطأ 404 كقيمة عددية"
        ],
        "correct": 0,
        "task": "ما هي القيمة المفضلة التي تعيدها دالة CanActivateFn لإعادة توجيه الزائر لمسار آخر عند فشل التحقق؟",
        "benefit": "إجابة ممتازة! إرجاع UrlTree عبر router.createUrlTree يوجه المتصفح بمرونة وسلاسة إلى المسار البديل دون إلغاء التنقل بصمت."
      }
    ]
  },
  {
    "id": "ng-forms-01",
    "module": "phase-6-routing-forms",
    "phase": "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
    "title": "النماذج الارتكاسية الصارمة: FormGroup و FormControl وخيار nonNullable",
    "duration": "15 دقيقة",
    "level": "متقدم",
    "summary": "احتراف بناء النماذج الارتكاسية ذات الأنواع الصارمة (Strictly Typed Reactive Forms) في Angular؛ الاستفادة من التحقق النوعي التلقائي لحقول النماذج أثناء وقت التصريف، واستخدام خيار nonNullable: true لمنع تحول قيم الحقول إلى null عند إعادة تعيين النموذج (form reset)، وربط حقول الإدخال في القالب عبر توجيهات ReactiveFormsModule.",
    "concept": "شهدت منظومة النماذج الارتكاسية في Angular تطوراً هندسياً فارقاً بنقلها من النماذج الكلاسيكية عديمة النوع (Untyped Forms) إلى النماذج الصارمة المكتوبة بدقة (Strictly Typed Reactive Forms). في السابق، كان كائن FormGroup يعيد نوع any لكل حقوله، مما يحرم المطور من أي حماية أثناء كتابة الكود ويسمح بمرور أخطاء إملائية كارثية في أسماء الحقول دون اكتشافها إلا بعد تشغيل التطبيق في بيئة الإنتاج.\nفي الأنظمة الحديثة، يمتلك FormGroup تعيينات نوعية متقدمة TypeScript Generics تستنتج تلقائياً نوع البيانات لكل حقل مدخل. إحدى أهم المعضلات الهندسية التي حلتها النماذج الصارمة هي سلوك دالة form.reset()؛ ففي النمط القديم كانت Angular تقوم بتفريغ الحقول بوضع القيمة null افتراضياً، مما يجبر المطور على التعامل مع نوع string | null دائماً، وهو ما يتعارض مع رغبتنا الدائمة في بقاء الحقول كنصوص فارغة دون احتمال القيمة المعدومة null.\nلحل هذه الإشكالية، وفرت Angular الخيار الذكي { nonNullable: true } عند إنشاء كائن FormControl، أو عبر استخدام NonNullableFormBuilder. يضمن هذا الخيار الحاسم أن عملية إعادة التعيين reset() ستعيد الحقل إلى قيمته الابتدائية الأصلية (Initial Value) بدلاً من null، مما يجعل نوع الحقل مقصوراً بثقة تامة على FormControl<string>.\nيكتمل هذا النموذج بربطه في الواجهة عبر استيراد ReactiveFormsModule داخل المكون المستقل، وتمرير النموذج عبر التوجيه [formGroup]=\"bookingForm\" وربط عناصر الإدخال بـ formControlName=\"customerName\"، مما يحقق أعلى درجات الأمان النوعي وسلاسة التحقق الارتكاسي في منصة حجز سينما خطوة.",
    "flow": "تعريف FormGroup صارم النوع ⟶ حقل FormControl بخيار nonNullable ⟶ ربط [formGroup] و formControlName ⟶ نموذج آمن تماماً ضد أخطاء وقت التشغيل",
    "task": "أنشئ نموذج حجز العميل bookingForm مع حقل customerName غير قابل للإلغاء nonNullable داخل مكون BookingFormComponent.",
    "file": "src/app/features/booking/booking-form.component.ts",
    "code": "import { Component } from '@angular/core';\nimport { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-booking-form',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: '<form [formGroup]=\"bookingForm\"><input formControlName=\"customerName\" /></form>'\n})\nexport class BookingFormComponent {\n  bookingForm = new FormGroup({\n    customerName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })\n  });\n}",
    "expected": "bookingForm = new FormGroup({",
    "reference": "https://angular.dev/guide/forms/reactive-forms",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: النماذج الارتكاسية الصارمة والأمان النوعي الكامل",
        "explanation": "توفر النماذج الارتكاسية المكتوبة بدقة (Strictly Typed Forms) أماناً نوعياً صارماً يكشف أخطاء أسماء الحقول وأنواع البيانات في وقت التصريف (Compile Time). لم يعد هناك خوف من الأخطاء الإملائية أو القيم غير المتوقعة في نماذج حجز التذاكر.",
        "flow": "تعريف هيكل النموذج ⟶ فحص توافق الأنواع في TypeScript ⟶ كشف الأخطاء الإملائية والنوعية فوراً ⟶ بيئة إنتاجية خالية من أخطاء runtime",
        "task": "تأمل كيف يوفر نظام النماذج الصارمة في Angular حماية متكاملة ضد أخطاء الوصول لحقول غير موجودة.",
        "benefit": "استوعبت القيمة الهندسية للنماذج الارتكاسية المكتوبة بنوع صارم في التطبيقات المؤسسية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة FormGroup وخيار { nonNullable: true }",
        "explanation": "عند تعريف new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })، فإننا نلزم الحقل بنوع نصي دائم. خيار nonNullable يضمن أن استدعاء bookingForm.reset() سيعيد الحقل إلى النص الفارغ '' بدلاً من null.",
        "flow": "new FormControl<string>('', { nonNullable: true }) ⟶ نوع الحقل FormControl<string> بدون null ⟶ reset() يعيد القيمة الابتدائية",
        "task": "حلل معاملات FormControl: القيمة الابتدائية ''، كائن الخيارات nonNullable ومصفوفة المدققات validators.",
        "benefit": "أتقنت صياغة عناصر التحكم الصارمة وفهمت آلية عمل nonNullable أثناء إعادة تعيين النموذج."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء نموذج حجز العميل bookingForm داخل مكون BookingFormComponent في ملف src/app/features/booking/booking-form.component.ts مع ضبط حقل customerName كحقل غير قابل للإلغاء nonNullable.",
        "file": "src/app/features/booking/booking-form.component.ts",
        "code": "import { Component } from '@angular/core';\nimport { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-booking-form',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: '<form [formGroup]=\"bookingForm\"><input formControlName=\"customerName\" /></form>'\n})\nexport class BookingFormComponent {\n  bookingForm = new FormGroup({\n    customerName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })\n  });\n}",
        "expected": "bookingForm = new FormGroup({",
        "task": "عرّف كائن bookingForm مع حقل customerName غير القابل للإلغاء داخل مكون BookingFormComponent ثم اضغط (شغّل وافحص).",
        "benefit": "شيدت نموذجاً ارتكاسياً صارماً وموثوقاً لإدخال بيانات عملاء سينما خطوة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة حقل جديد إلى النموذج مثل ticketsCount: new FormControl<number>(1, { nonNullable: true }) وتأمل كيف يقوم TypeScript باستنتاج النوع الكلي للنموذج بدقة متناهية.",
        "task": "جرّب إضافة حقل إضافي إلى النموذج ولاحظ كيف يتعرف TypeScript على الأنواع تلقائياً.",
        "benefit": "اختبرت مرونة النماذج الصارمة وقدرتها على استيعاب حقول متعددة بأنواع رقمية أو نصية بدقة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما التأثير المباشر لإضافة الخيار { nonNullable: true } عند تعريف FormControl في Angular؟",
        "options": [
          "يضمن أن استدعاء reset() يعيد الحقل لقيمته الابتدائية بدلاً من تحويله إلى null",
          "يمنع المستخدم نهائياً من تعديل النص المكتوب في الحقل",
          "يحول حقل الإدخال إلى عنصر للقراءة فقط ويحذف النموذج من الشاشة"
        ],
        "correct": 0,
        "task": "ما التأثير المباشر لإضافة الخيار { nonNullable: true } عند تعريف FormControl في Angular؟",
        "benefit": "إجابة صحيحة ومتقنة! خيار nonNullable يمنع تحول القيمة إلى null عند عمل reset ويضمن بقاء نوع الحقل منسجماً مع قيمته الأصلية."
      }
    ]
  },
  {
    "id": "ng-forms-02",
    "module": "phase-6-routing-forms",
    "phase": "المرحلة السادسة: التوجيه المتقدم والنماذج الارتكاسية (Modern Routing & Typed Forms)",
    "title": "التحقق المتقدم والمدققات المخصصة (Custom Validators: saudiPhoneValidator)",
    "duration": "15 دقيقة",
    "level": "متقدم",
    "summary": "تصميم وبرمجة دوال التحقق المخصصة (Custom Validators) في Angular لتطبيق قواعد أعمال فريدة؛ فهم توقيع دالة ValidatorFn وعقد إرجاع كائن الأخطاء ValidationErrors أو null عند صحة الإدخال، وبرمجة مدقق رقم الهاتف السعودي saudiPhoneValidator بالاعتماد على التعابير النمطية Regular Expressions لضمان دقة بيانات الاتصال في منصة حجز السينما.",
    "concept": "في المشاريع الحقيقية وتطبيقات الشركات الكبرى، لا تكفي المدققات الجاهزة المدمجة في Angular (مثل Validators.required و Validators.email) لتلبية كافة متطلبات الأعمال المعقدة. فكثيراً ما تتطلب التطبيقات شروطاً محلية وقواعد مخصصة مثل التحقق من صحة رقم الهوية الوطنية، أو أرقام الحسابات البنكية الدولية IBAN، أو أرقام الهواتف المحمولة وفق التنسيقات الوطنية الخاصة؛ كرقم الجوال في المملكة العربية السعودية الذي يجب أن يبدأ بـ 05 ويتكون من 10 أرقام تماماً.\nلتحقيق هذا المستوى من التحكم، يوفر نظام النماذج الارتكاسية واجهة دالية نقية تُعرف بـ ValidatorFn. المدقق المخصص هو دالة مصنعية (Factory Function) تُرجع دالة تحقق مطابقة لـ ValidatorFn. تستقبل الدالة كائن عنصر التحكم (control: AbstractControl) وتُرجع أحد أمرين وفق عقد هندسي صارم:\n1. القيمة null: إذا كانت القيمة المدخلة صحيحة ومطابقة تماماً للقاعدة المحددة؛ حيث يعبر null في Angular عن خلو الحقل من أي أخطاء.\n2. كائن الأخطاء ValidationErrors: مثل { invalidSaudiPhone: true } إذا فشلت القيمة في مطابقة الشروط؛ حيث يُدمج هذا الكائن فورياً في خاصية control.errors ويتم تعيين control.invalid إلى true.\nمن أهم المبادئ الهندسية في صياغة المدققات المخصصة هو السماح للقيم الفارغة بالمرور دون إطلاق خطأ (إرجاع null)، وذلك لفصل مسؤولية التحقق عن مسؤولية الإلزامية التي يختص بها Validators.required. وباستخدام التعبير النمطي /^05\\d{8}$/، نحصل على مدقق فائق الدقة والقوة يضمن خلو قاعدة بيانات حجوزات سينما خطوة من أي أرقام هواتف غير صحيحة.",
    "flow": "إدخال رقم الجوال في النموذج ⟶ فحص القيمة بـ ValidatorFn ⟶ اختبار Regex /^05\\d{8}$/ ⟶ إرجاع null للصحيح أو { invalidSaudiPhone: true } للخطأ",
    "task": "اكتب دالة المدقق المخصص saudiPhoneValidator في ملف src/app/validators/cinema.validators.ts للتحقق من أرقام الجوال السعودية عبر التعبير النمطي /^05\\d{8}$/.",
    "file": "src/app/validators/cinema.validators.ts",
    "code": "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';\n\nexport function saudiPhoneValidator(): ValidatorFn {\n  return (control: AbstractControl): ValidationErrors | null => {\n    const valid = /^05\\d{8}$/.test(control.value || '');\n    return valid ? null : { invalidSaudiPhone: true };\n  };\n}",
    "expected": "export function saudiPhoneValidator(): ValidatorFn {",
    "reference": "https://angular.dev/guide/forms/reactive-forms#custom-validators",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: مدققات الأعمال المخصصة وعقد ValidationErrors",
        "explanation": "عندما لا تكفي المدققات الجاهزة لتطبيق قواعد منطق الأعمال الخاصة بك، تتيح لك Angular إنشاء مدققات مخصصة Custom Validators. تلتزم هذه المدققات بعقد بسيط وذكي: إرجاع null عند مطابقة الشروط، أو إرجاع كائن خطأ ValidationErrors عند فشل المطابقة.",
        "flow": "قيمة الحقل المدخل ⟶ دالة ValidatorFn ⟶ فحص قاعدة الأعمال المخصصة ⟶ null (صالح) أو ValidationErrors (خطأ)",
        "task": "تأمل كيف يوفر عقد ValidatorFn في Angular معياراً موحداً ومرناً لإنشاء أي قاعدة تحقق مهما بلغت درجة تعقيدها.",
        "benefit": "استوعبت العقد البرمجي لمدققات Angular والتمييز الدقيق بين إرجاع null وإرجاع كائنات الأخطاء."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة ValidatorFn واستخدام التعبير النمطي Regex",
        "explanation": "الدالة saudiPhoneValidator تُرجع دالة فرعية من نوع ValidatorFn تأخذ (control: AbstractControl) وتُرجع ValidationErrors | null. التعبير النمطي /^05\\d{8}$/ يفحص أن القيمة تبدأ بـ 05 ويتبعها 8 أرقام، وإذا فشل الاختبار تعيد الدالة كائن الخطأ { invalidSaudiPhone: true }.",
        "flow": "export function saudiPhoneValidator(): ValidatorFn ⟶ (control: AbstractControl) ⟶ test(/^05\\d{8}$/) ⟶ return valid ? null : { invalidSaudiPhone: true }",
        "task": "دقق في التوقيع النمطي ونوع المعامل control وكيفية إرجاع كائن الخطأ { invalidSaudiPhone: true }.",
        "benefit": "أتقنت الهيكل البرمجي القياسي لكتابة دوال التحقق المخصصة في بيئة TypeScript لـ Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بكتابة دالة المدقق saudiPhoneValidator داخل الملف src/app/validators/cinema.validators.ts للتحقق من أرقام الجوال السعودية عبر التعبير النمطي /^05\\d{8}$/ وإرجاع كائن الخطأ عند عدم المطابقة.",
        "file": "src/app/validators/cinema.validators.ts",
        "code": "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';\n\nexport function saudiPhoneValidator(): ValidatorFn {\n  return (control: AbstractControl): ValidationErrors | null => {\n    const valid = /^05\\d{8}$/.test(control.value || '');\n    return valid ? null : { invalidSaudiPhone: true };\n  };\n}",
        "expected": "export function saudiPhoneValidator(): ValidatorFn {",
        "task": "اكتب دالة المدقق saudiPhoneValidator داخل الملف src/app/validators/cinema.validators.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت مدققاً مخصصاً يحمي قواعد بيانات تطبيق سينما خطوة من أرقام الهواتف غير الدقيقة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تغيير التعبير النمطي ليدعم الأرقام التي تبدأ بـ 5 مباشرة دون الصفر كـ /^(05|5)\\d{8}$/، ولاحظ كيف يمنحك التعبير النمطي مرونة فائقة في استيعاب التنسيقات المختلفة لأرقام الجوال.",
        "task": "جرّب تعديل التعبير النمطي لدعم بادئة 5 وتأمل مرونة التعبيرات النمطية في المدققات.",
        "benefit": "أدركت كيفية تطويع التعابير النمطية لتغطية حالات الإدخال المتنوعة لدى المستخدمين."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يجب أن تُرجع دالة المدقق المخصص (Custom Validator) في Angular إذا كانت القيمة المدخلة مطابقة تماماً للشروط؟",
        "options": [
          "القيمة null للإشارة إلى عدم وجود أي أخطاء في الحقل",
          "كائن يحتوي على { valid: true }",
          "القيمة true كقيمة منطقية مجردة"
        ],
        "correct": 0,
        "task": "ماذا يجب أن تُرجع دالة المدقق المخصص (Custom Validator) في Angular إذا كانت القيمة المدخلة مطابقة تماماً للشروط؟",
        "benefit": "إجابة صحيحة ورائعة! في معمارية Angular للنماذج، إرجاع null هو الإشارة الرسمية الوحيدة إلى أن الحقل صالح تماماً وخالٍ من أخطاء التحقق."
      }
    ]
  },
  {
    "id": "capstone-01",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "تخطيط معمارية منصة حجز السينما المؤسسية (Khotwa Cinema Pro: Enterprise Architecture & State Models)",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "بناء المعمارية المؤسسية لمنصة حجز السينما (Khotwa Cinema Pro) وتقسيم المشروع إلى طبقات معمارية واضحة ومستقلة (core و features و shared)؛ تحديد عقود الحالة المشتركة ونماذج البيانات الصارمة (Strongly Typed State Contracts) عبر واجهة CinemaAppState لتنظيم حالة حجز الفيلم والمقاعد المختارة وأكواد الخصم والضرائب، مما يضمن أماناً نوعياً شاملاً وسهولة فائقة في التوسع والاختبار.",
    "concept": "في المشاريع البرمجية الضخمة والتطبيقات المؤسسية (Enterprise Applications)، لا يُكتب الكود بصورة عشوائية داخل ملفات متفرقة، بل يُبنى على أسس معمارية نظيفة تضمن قابلية الصيانة والتوسع لسنوات طويلة بين فرق عمل متعددة. يُعد نمط المعمارية الموزعة (Modular Architecture) المعيار الذهبي في مشاريع Angular الاحترافية؛ حيث يُقسّم التطبيق هندسياً إلى ثلاثة مجلدات رئيسية واضحة المعالم:\n1. مجلد core: يحتوي على الخدمات الفردية المركزية (Singletons)، ومستودعات الحالة الشاملة للتطبيق (Global State Stores)، والموديلات الأساسية ونماذج البيانات المشتركة بين كل أجزاء النظام، بالإضافة إلى المعترضات الشبكية (HTTP Interceptors) والحراس الأمنيين (Guards).\n2. مجلد features: يضم الشاشات والوحدات الوظيفية المستقلة للتطبيق (مثل كتالوج الأفلام movie-catalog، ومصفوفة المقاعد seat-matrix، وشاشة الدفع checkout، والتذكرة الرقمية ticket-pass)، بحيث يمتلك كل جزء مكوناته وخدماته الخاصة دون تداخل.\n3. مجلد shared: يحتوي على المكونات البصرية القابلة لإعادة الاستخدام (UI Components) مثل الأزرار والبطاقات، والموجهات المخصصة، والأنابيب (Pipes)، ومساعدات التنسيق.\nتبدأ هذه المعمارية بتعريف \"عقد الحالة المركزي\" (Central State Contract) عبر واجهة CinemaAppState؛ وهي واجهة صلبة تحدد شكل حالة التطبيق بدقة متناهية: معرف الفيلم المختار (selectedMovieId)، ومصفوفة معرفات المقاعد المحجوزة (selectedSeats)، وكود الخصم المطبق (couponCode)، ونسبة الخصم الحالية (discountRate). هذا العقد الصارم يمنع أي أخطاء نوعية أثناء تداول الحالة بين شاشات السينما المختلفة.",
    "flow": "رسم هيكل المجلدات وعقود الحالة ⟶ فصل المسؤوليات (Core/Features/Shared) ⟶ قابلية للتوسع واختبارات الوحدة",
    "task": "عرّف واجهة حالة السينما المركزية CinemaAppState بخصائص الفيلم والمقاعد والكوبون.",
    "file": "src/app/core/models/cinema-state.model.ts",
    "code": "export interface CinemaAppState {\n  selectedMovieId: number | null;\n  selectedSeats: string[];\n  couponCode: string | null;\n  discountRate: number;\n}",
    "expected": "export interface CinemaAppState {",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: تقسيم التطبيقات المؤسسية وعقود الحالة",
        "explanation": "عند بناء منصة بحجم Khotwa Cinema Pro، يجب أن نعلم أين يوضع كل سطر برمجي. مجلد core للمركزيات والحالة الشاملة، و features للشاشات والوظائف، و shared للعناصر المشتركة. واجهة CinemaAppState هي حجر الأساس الذي يربط تدفق البيانات بين جميع هذه الطبقات.",
        "flow": "هندسة core و features و shared ⟶ توحيد عقد CinemaAppState ⟶ تناغم شاشات العرض والحجز",
        "task": "تأمل كيف ينظم تقسيم المجلدات المعماري وظائف التطبيق ويمنع التداخل والتعقيد البرمجي.",
        "benefit": "استوعبت أصول المعمارية النظيفة في مشاريع Angular المؤسسية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح واجهة حالة التطبيق CinemaAppState",
        "explanation": "تحدد الواجهة خصائص الحالة المركزية: selectedMovieId بنوع number | null للسماح بعدم اختيار فيلم في البداية، selectedSeats كمصفوفة نصوص string[] لأسماء المقاعد، couponCode بنوع string | null للكوبونات، و discountRate بنوع number للنسبة المئوية.",
        "flow": "CinemaAppState ⟶ selectedMovieId + selectedSeats + couponCode + discountRate",
        "task": "دقق في الخصائص الأربع للواجهة وكيف تعبر عن الدورة الكاملة لعملية حجز التذكرة.",
        "benefit": "أتقنت صياغة عقود الحالة الصلبة في TypeScript لتأمين تدفق البيانات."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم الآن بكتابة واجهة حالة السينما المركزية CinemaAppState داخل الملف src/app/core/models/cinema-state.model.ts لتكون مرجع الحالة في التطبيق.",
        "file": "src/app/core/models/cinema-state.model.ts",
        "code": "export interface CinemaAppState {\n  selectedMovieId: number | null;\n  selectedSeats: string[];\n  couponCode: string | null;\n  discountRate: number;\n}",
        "expected": "export interface CinemaAppState {",
        "task": "عرّف واجهة حالة السينما المركزية CinemaAppState بخصائص الفيلم والمقاعد والكوبون في src/app/core/models/cinema-state.model.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت الأساس المعماري الصلب لحالة منصة Khotwa Cinema Pro بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة خاصية اختيارية إلى الواجهة مثل customerNotes?: string لتسجيل أي طلبات خاصة للزائر، ولاحظ كيف يقبل TypeScript الخصائص الاختيارية دون كسر التوافق.",
        "task": "جرّب إضافة خاصية اختيارية واستكشف كيف يوفر TypeScript مرونة لتوسيع عقود الحالة.",
        "benefit": "أدركت كيفية توسيع وتطوير عقود البيانات المؤسسية مع نمو متطلبات الأعمال."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الهدف الأساسي من تقسيم التطبيق المؤسسي إلى مجلدات core و features و shared؟",
        "options": [
          "فصل المسؤوليات وتنظيم الكود لسهولة الصيانة والتوسع والاختبار بين فرق العمل",
          "تقليل عدد الأسطر في ملف package.json",
          "زيادة سرعة المعالج المركزي"
        ],
        "correct": 0,
        "task": "ما الهدف الأساسي من تقسيم التطبيق المؤسسي إلى مجلدات core و features و shared؟",
        "benefit": "إجابة نموذجية! التقسيم المعماري إلى Core و Features و Shared يفصل المسؤوليات بدقة ويمنع الاعتماديات الدائرية ويسهل عمل الفرق البرمجية الكبيرة."
      }
    ]
  },
  {
    "id": "capstone-02",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "بناء مستودع الحالة المركزي المتكامل (Cinema Signals Store)",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "تصميم وبرمجة مستودع الحالة المركزي المتكامل CinemaStore بالاعتماد كلياً على محرك الإشارات الحديث Angular Signals؛ إدارة المقاعد المختارة عبر إشارة مصفوفية متفاعلة selectedSeats، واستنتاج عدد المقاعد تلقائياً بدقة عبر computed()، وتنفيذ تبديل المقاعد (toggleSeat) بأسلوب البرمجة الوظيفية غير القابلة للتبديل (Immutable Updates) لمزامنة شاشات السينما فورياً وبأعلى كفاءة.",
    "concept": "في هندسة التطبيقات الحديثة، يُعد مستودع الحالة المركزي (State Store) هو القلب النابض الذي يحفظ بيانات التطبيق المشتركة ويوفر نقطة حقيقة وحيدة (Single Source of Truth) لكافة المكونات والشاشات. بدلاً من الاعتماد على مكتبات خارجية معقدة وذات حجم ثقيل مثل NgRx التقليدي القديم، تتيح إشارات Angular Signals بناء مستودعات حالة خفيفة وسريعة وفائقة القوة تعتمد على مفهوم التفاعلية الدقيقة (Fine-grained Reactivity).\nتعتمد خدمة CinemaStore على مزخرف @Injectable({ providedIn: 'root' }) لتكون خدمة أحادية (Singleton) مشتركة في الذاكرة عبر كامل شاشات السينما. يتم تخزين المقاعد المختارة داخل إشارة تفاعلية مصفوفية readonly selectedSeats = signal<string[]>([])، مما يتيح لأي شاشة الاستماع المباشر للتغييرات دون وميض أو إعادة تصيير غير مبررة للواجهة.\nلإجراء التحديثات على الحالة، نستخدم مبدأ عدم القابلية للتعديل المباشر (Immutability) من خلال استدعاء دالة this.selectedSeats.update()؛ حيث تستقبل الدالة الحالة السابقة للمصفوفة وتُرجع مصفوفة جديدة كلياً: إذا كان معرف المقعد (seatId) موجوداً بالفعل، يتم حذفه باستخدام seats.filter()، وإذا لم يكن موجوداً، يتم إلحاقه عبر عامل النشر [...seats, seatId].\nعلاوة على ذلك، توفر الإشارة المحسوبة readonly seatCount = computed(() => this.selectedSeats().length) اشتقاقاً تلقائياً لحظياً لعدد المقاعد المختارة؛ حيث تُحفظ قيمتها في الذاكرة المخبأة (Memoized) ولا يُعاد حسابها إلا عند تغير إشارة المقاعد، مما يضمن كفاءة حسابية فائقة وسلاسة تفاعلية مذهلة في منصة سينما خطوة.",
    "flow": "نقرات الحجز ⟶ تعديل إشارات المخزن المركزي ⟶ مزامنة كل شاشات السينما فورياً",
    "task": "أنشئ مخزن الحالة CinemaStore مع دالة toggleSeat وإشارة محسوبة seatCount.",
    "file": "src/app/core/store/cinema.store.ts",
    "code": "import { Injectable, signal, computed } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaStore {\n  readonly selectedSeats = signal<string[]>([]);\n  readonly seatCount = computed(() => this.selectedSeats().length);\n  toggleSeat(seatId: string) {\n    this.selectedSeats.update(seats => seats.includes(seatId) ? seats.filter(s => s !== seatId) : [...seats, seatId]);\n  }\n}",
    "expected": "export class CinemaStore {",
    "reference": "https://angular.dev/guide/signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: مستودع الحالة المركزي بالإشارات (Signals Store)",
        "explanation": "بدلاً من تشتيت بيانات الحجز بين بطاقات الأفلام وشاشة المقاعد واستمارة الدفع، نضع كافة البيانات في مخزن مركزي واحد CinemaStore. الإشارات تجعل كل شاشة تستمع فقط لما يهمها، فعندما ينقر الزائر مقعداً في قاعة العرض، يتحدث عداد التذاكر في شريط التنقل العلوي لحظياً وبدون أي تعقيد.",
        "flow": "مكون مصفوفة المقاعد ⟶ CinemaStore (مخزن مركزي) ⟶ شريط التنقل العلوي وملخص الدفع",
        "task": "تأمل كيف يعمل المخزن المركزي كقناة موحدة تربط كل شاشات الحجز ببعضها البعض.",
        "benefit": "استوعبت مزايا إدارة الحالة بالإشارات الخفيفة مقارنة بالمكتبات الخارجية المعقدة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح إشارة المقاعد selectedSeats ودالة toggleSeat",
        "explanation": "عرّفنا selectedSeats كإشارة مصفوفة نصوص. دالة toggleSeat تفحص وجود seatId؛ إن وجد تستبعده بـ filter وإن لم يوجد تضيفه بـ [...seats, seatId]. والإشارة المحسوبة seatCount تقرأ selectedSeats().length تلقائياً بفضل computed.",
        "flow": "toggleSeat(id) ⟶ update() ⟶ هل المقعد موجود؟ (نعم ⟶ احذف / لا ⟶ أضف) ⟶ إعادة حساب seatCount()",
        "task": "دقق في صياغة دالة update وكيف تطبق منطق التبديل التفاعلي بدقة وأمان.",
        "benefit": "أتقنت التعامل مع المصفوفات التفاعلية في Signals بأسلوب برمجي نقي غير قابل للتعديل المباشر."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مخزن الحالة CinemaStore في src/app/core/store/cinema.store.ts مع تعريف selectedSeats و seatCount ودالة toggleSeat.",
        "file": "src/app/core/store/cinema.store.ts",
        "code": "import { Injectable, signal, computed } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaStore {\n  readonly selectedSeats = signal<string[]>([]);\n  readonly seatCount = computed(() => this.selectedSeats().length);\n  toggleSeat(seatId: string) {\n    this.selectedSeats.update(seats => seats.includes(seatId) ? seats.filter(s => s !== seatId) : [...seats, seatId]);\n  }\n}",
        "expected": "export class CinemaStore {",
        "task": "أنشئ مخزن الحالة CinemaStore مع دالة toggleSeat وإشارة محسوبة seatCount داخل src/app/core/store/cinema.store.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت مخزن الحالة المركزي لسينما خطوة بكامل تفاعلية Signals الحديثة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة دالة جديدة لتفريغ الحجز بالكامل باسم clearSelection() تقوم باستدعاء this.selectedSeats.set([])، ولاحظ كيف يتم تصفير المقاعد فورياً بأسلوب أنيق.",
        "task": "جرّب إضافة دالة تفريغ المقاعد واستكشف قوة دالة .set() في إعادة تعيين الإشارات.",
        "benefit": "أدركت الفرق العملي بين .set() للإسناد المباشر و .update() للتحويلات المشتقة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف نحدث مصفوفة المقاعد المختارة داخل CinemaStore عند نقر مقعد؟",
        "options": [
          "باستدعاء .update() لإضافة المقعد إن لم يكن موجوداً أو إزالته إن كان موجوداً",
          "بإعادة تحميل الصفحة",
          "بمسح قاعدة البيانات"
        ],
        "correct": 0,
        "task": "كيف نحدث مصفوفة المقاعد المختارة داخل CinemaStore عند نقر مقعد؟",
        "benefit": "أحسنت! استخدام .update() مع دمج أو تصفية العناصر يتبع مبدأ عدم التعديل المباشر (Immutability) ويطلق التحديثات التفاعلية فورياً."
      }
    ]
  },
  {
    "id": "capstone-03",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "بطاقة الفيلم التفاعلية وشريط البحث والفلترة الفورية (Live Movie Catalog & computed Filtering)",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "تطوير شاشة كتالوج الأفلام MovieCatalogComponent وبناء تجربة بحث وتصفية فورية فائقة السرعة؛ استخدام إشارة النص المدخل searchQuery وإشارة قائمة الأفلام movies مع الإشارة المشتقة filteredMovies عبر دالة computed() لتطبيق التصفية التلقائية لحظة بلحظة مع كل ضغطة زر، وتجنب وميض الشاشة أو هدر موارد المعالج بفضل الذاكرة المخبأة الذكية (Memoization).",
    "concept": "في واجهات المستخدم الحديثة، يتوقع الزائر استجابة لحظية عند البحث أو التصفية؛ فبمجرد كتابة أي حرف في شريط البحث، يجب أن تتقلص قائمة الأفلام المعروضة فورياً ودون الحاجة للضغط على زر \"بحث\" أو إعادة تحميل الصفحة. في إطارات العمل القديمة، كان تنفيذ هذا السلوك يتطلب الاشتراك اليدوي في أحداث الإدخال وإطلاق دورات فحص التغييرات المتكررة، مما يتسبب في وميض العناصر وإبطاء المتصفح.\nيقدم نظام Angular Signals الحل الأمثل لهذه المعضلة عبر الإشارات المشتقة المحسوبة (Computed Signals). داخل المكون MovieCatalogComponent، نمتلك إشارتين أساسيتين: إشارة نص البحث searchQuery = signal<string>('') وإشارة مصفوفة الأفلام movies = signal<Movie[]>([]).\nعند تعريف filteredMovies = computed(() => this.movies().filter(m => m.title.includes(this.searchQuery())))، يُنشئ مترجم Angular رابطة اعتمادية تلقائية بين دالة الفلترة والإشارتين. عندما تتغير قيمة searchQuery عند كتابة المستخدم لحرف جديد، تدرك إشارة filteredMovies تلقائياً أنها أصبحت قديمة (Stale)، وتعيد حساب النتيجة في اللحظة التي يطلبها القالب بدقة متناهية.\nالميزة الهندسية الاستثنائية لـ computed() هي التخزين المؤقت الذكي (Memoization)؛ فإذا تغير جزء آخر في الشاشة لا علاقة له بالأفلام أو بنص البحث، لن تُنفذ دالة التصفية إطلاقاً، بل تُعاد النتيجة المخزنة سابقاً. هذا يضمن أن واجهة كتالوج أفلام سينما خطوة ستحافظ على أعلى معدل إطارات (60fps) حتى مع وجود مئات الأفلام المعروضة.",
    "flow": "كتابة كلمة البحث ⟶ تحديث إشارة searchQuery ⟶ فرز فوري للأفلام بدون وميض",
    "task": "اكتب منطق الفلترة الفورية filteredMovies داخل MovieCatalogComponent بـ computed().",
    "file": "src/app/features/movies/movie-catalog.component.ts",
    "code": "import { Component, signal, computed } from '@angular/core';\nimport { Movie } from '../../models/movie.model';\n\n@Component({\n  selector: 'app-movie-catalog',\n  standalone: true,\n  template: '<div class=\"catalog-grid\"></div>'\n})\nexport class MovieCatalogComponent {\n  searchQuery = signal<string>('');\n  movies = signal<Movie[]>([]);\n  filteredMovies = computed(() => this.movies().filter(m => m.title.includes(this.searchQuery())));\n}",
    "expected": "filteredMovies = computed(() => this.movies().filter(",
    "reference": "https://angular.dev/guide/signals#computed-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: الفلترة الحية عبر الإشارات المشتقة (Live Reactive Filtering)",
        "explanation": "عندما يكتب الزائر حرفاً في شريط البحث، يجب أن تصفى الأفلام فوراً. الإشارة المحسوبة computed() تراقب إشارة البحث searchQuery وإشارة الأفلام movies، وعند تغير أي منهما تُشتق القائمة المصفاة filteredMovies تلقائياً وتُحدث الواجهة بلمح البصر.",
        "flow": "searchQuery ('خيال') ⟶ computed() تفحص movies() ⟶ filteredMovies تحوي فقط أفلام الخيال العلمي",
        "task": "تأمل سرعة وسلاسة التصفية المشتقة وكيف تتجنب المعالجات الزائدة بفضل الـ Signals.",
        "benefit": "فهمت دور computed() في تقديم تجارب بحث فورية وعالية الاستجابة للمستخدم."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح تركيبة computed() ودالة التصفية filter()",
        "explanation": "تستدعي دالة computed كولباك وظيفي يقرأ إشارة this.movies() ويطبق عليها دالة التصفية filter(m => m.title.includes(this.searchQuery())). قراءة الإشارتين داخل القوسين () هي التي تؤسس المراقبة التلقائية الدقيقة.",
        "flow": "this.movies().filter(...) ⟶ قراءة this.searchQuery() ⟶ تسجيل التبعية ⟶ إنتاج مصفوفة مطابقة",
        "task": "دقق في كيفية قراءة الإشارات عبر الأقواس () داخل التعبير التصفوي لـ computed.",
        "benefit": "أتقنت كتابة شروط الفلترة المتقدمة داخل الإشارات المحسوبة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بكتابة مكون كتالوج الأفلام MovieCatalogComponent مع تعريف filteredMovies بـ computed() داخل ملف src/app/features/movies/movie-catalog.component.ts.",
        "file": "src/app/features/movies/movie-catalog.component.ts",
        "code": "import { Component, signal, computed } from '@angular/core';\nimport { Movie } from '../../models/movie.model';\n\n@Component({\n  selector: 'app-movie-catalog',\n  standalone: true,\n  template: '<div class=\"catalog-grid\"></div>'\n})\nexport class MovieCatalogComponent {\n  searchQuery = signal<string>('');\n  movies = signal<Movie[]>([]);\n  filteredMovies = computed(() => this.movies().filter(m => m.title.includes(this.searchQuery())));\n}",
        "expected": "filteredMovies = computed(() => this.movies().filter(",
        "task": "اكتب منطق الفلترة الفورية filteredMovies داخل MovieCatalogComponent بـ computed() في src/app/features/movies/movie-catalog.component.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "برمجت محرك البحث والتصفية الفوري لكتالوج أفلام منصة خطوة بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب توسيع شرط التصفية ليشمل التصنيف أيضاً عبر: m.title.includes(this.searchQuery()) || m.genre.includes(this.searchQuery())، وتأمل كيف تتيح لك الإشارات تصفية معقدة بأسطر معدودة.",
        "task": "جرّب دمج البحث بالعنوان والتصنيف معاً واستكشف مرونة التصفية بالـ Signals.",
        "benefit": "أدركت كيفية بناء فلاتر متعددة الأبعاد تلبي سيناريوهات البحث الحقيقية في المنصات التجارية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الميزة التي توفرها computed() في شاشات البحث والفلترة المباشرة؟",
        "options": [
          "تصفية القائمة فوراً عند كل ضغطة مفتاح مع تخزين النتيجة مؤقتاً لأداء فائق",
          "إرسال طلبات بحث إلى محركات خارجية",
          "حفظ النتائج في ملف وورد"
        ],
        "correct": 0,
        "task": "ما الميزة التي توفرها computed() في شاشات البحث والفلترة المباشرة؟",
        "benefit": "إجابة رائعة! الذاكرة المخبأة (Memoization) والتتبع الدقيق للاعتماديات يمنحان computed تفوقاً ساحقاً في عمليات الفلترة اللحظية."
      }
    ]
  },
  {
    "id": "capstone-04",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "مصفوفة قاعة العرض التفاعلية الذكية (Interactive Seat Matrix Component)",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "بناء مصفوفة مقاعد قاعة السينما التفاعلية SeatMatrixComponent وربطها بمستودع الحالة المركزي؛ تمثيل شبكة المقاعد البصرية وتمييز المقاعد العادية والـ VIP والمحجوزة، واستخدام دالة inject() لحقن CinemaStore ومعالجة نقرات الزوار عبر دالة onSeatClick لتحديث المقاعد المختارة وتحديث السلة المالية فورياً.",
    "concept": "تُعد شاشة اختيار المقاعد (Seat Picker Matrix) الجزء البصري الأكثر جذباً وتفاعلاً في تطبيقات حجز السينما؛ حيث يرى المستخدم خريطة قاعة العرض أمامه مجسمة في شبكة بصرية توضح موقع الشاشة الرئيسية والمقاعد المتاحة والمقاعد المحجوزة مسبقاً وتصنيفات المقاعد (VIP والمقاعد العادية). التحدي الهندسي في هذا المكون ليس فقط في المظهر الجمالي، بل في ربطه بسلاسة وكفاءة بمستودع الحالة المركزي دون تكرار منطق الأعمال.\nيعتمد المكون المستقل SeatMatrixComponent على دالة الحقن الوظيفي inject(CinemaStore) لاستيراد مستودع الحالة المركزي مباشرة دون الحاجة لكتابة دوال منشئ كلاسيكية (Constructor Injection). هذا النمط الوظيفي الحديث يجعل المكون أكثر إيجازاً وقابلية للقراءة وإعادة الاستخدام.\nعندما يقوم الزائر بالنقر على أي مقعد متاح في الشبكة، ينطلق حدث النقر مستدعياً دالة onSeatClick(id: string). تتولى هذه الدالة البسيطة والذكية تفويض المهمة فورياً إلى مستودع الحالة عبر this.store.toggleSeat(id). وبمجرد قيام المخزن بتحديث إشارة selectedSeats، تتفاعل كافة عناصر الصفحة المتصلة بالمخزن تلقائياً: يتغير لون المقعد في المصفوفة ليدل على تحديده، ويرتفع عداد التذاكر في شريط الملخص، ويُعاد احتساب التكلفة الإجمالية والضريبة لحظياً.\nيُبرز هذا التكامل مبدأ \"المكونات الرشيقة\" (Thin/Presentational Components)؛ حيث يركز المكون فقط على تقديم الواجهة للمستخدم وتمرير التفاعلات لمستودع الحالة، بينما يتولى Store إدارة الحالة والعمليات الحسابية، وهو ما يمثل ذروة المعمارية النظيفة في تطبيقات Angular الاحترافية.",
    "flow": "مصفوفة مقاعد بصرية ⟶ نقر المقعد المتاح ⟶ تحديث السلة والمجموع فورياً",
    "task": "أنشئ المكون SeatMatrixComponent مع دالة onSeatClick لتحديث CinemaStore.",
    "file": "src/app/features/booking/seat-matrix.component.ts",
    "code": "import { Component, inject } from '@angular/core';\nimport { CinemaStore } from '../../core/store/cinema.store';\n\n@Component({\n  selector: 'app-seat-matrix',\n  standalone: true,\n  template: '<div class=\"seat-picker-grid\"></div>'\n})\nexport class SeatMatrixComponent {\n  store = inject(CinemaStore);\n  onSeatClick(id: string) { this.store.toggleSeat(id); }\n}",
    "expected": "export class SeatMatrixComponent {",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة المعمارية: مصفوفة المقاعد وفصل العرض عن منطق الحالة",
        "explanation": "شاشة المقاعد هي واجهة تفاعلية تمثل قاعة السينما. بدلاً من أن تقوم الشاشة بحساب الأسعار وحفظ المقاعد بنفسها، تقوم فقط بإرسال حدث النقر لمستودع الحالة CinemaStore. هذا يضمن أن منطق الحجز موحد وقابل للاختبار بشكل منفصل عن الواجهة الرسومية.",
        "flow": "نقر الزائر على مقعد (A3) ⟶ المكون يخبر المخزن: toggleSeat('A3') ⟶ المخزن يحدث الإشارات ⟶ كل الشاشات تتحدث",
        "task": "تأمل كيف يعمل مبدأ المكون الرشيق (Thin Component) على تبسيط كود الواجهة وتوحيد الحالة.",
        "benefit": "استوعبت أسلوب ربط المكونات التفاعلية المعقدة بمستودعات الحالة المركزية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح حقن CinemaStore ودالة onSeatClick",
        "explanation": "نستخدم store = inject(CinemaStore) للحصول على مرجع المستودع المركزي بأسلوب وظيفي نظيف. ودالة onSeatClick(id: string) تستقبل معرف المقعد وتمرره مباشرة إلى this.store.toggleSeat(id).",
        "flow": "inject(CinemaStore) ⟶ store ⟶ onSeatClick(id) ⟶ this.store.toggleSeat(id)",
        "task": "دقق في بساطة الكود وكيف يستبدل الحقن الوظيفي بـ inject() منشئات الفئات الكلاسيكية.",
        "benefit": "أتقنت استخدام الحقن الوظيفي inject() وتمرير الأحداث لمستودعات الحالة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء المكون SeatMatrixComponent داخل src/app/features/booking/seat-matrix.component.ts مع حقن CinemaStore وتعريف دالة onSeatClick.",
        "file": "src/app/features/booking/seat-matrix.component.ts",
        "code": "import { Component, inject } from '@angular/core';\nimport { CinemaStore } from '../../core/store/cinema.store';\n\n@Component({\n  selector: 'app-seat-matrix',\n  standalone: true,\n  template: '<div class=\"seat-picker-grid\"></div>'\n})\nexport class SeatMatrixComponent {\n  store = inject(CinemaStore);\n  onSeatClick(id: string) { this.store.toggleSeat(id); }\n}",
        "expected": "export class SeatMatrixComponent {",
        "task": "أنشئ المكون SeatMatrixComponent مع دالة onSeatClick لتحديث CinemaStore في src/app/features/booking/seat-matrix.component.ts ثم اضغط على زر (شغّل وافحص).",
        "benefit": "أنشأت مصفوفة مقاعد قاعة السينما وربطتها بمخزن الحالة التفاعلي بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة خاصية تقرأ المقاعد المختارة مباشرة من المخزن عبر selectedSeats = this.store.selectedSeats; وتأمل كيف يمكن للمكون قراءة أي إشارة من المخزن بسهولة تامة.",
        "task": "جرّب ربط إشارة المقاعد المختارة من المخزن واستكشف سهولة القراءة التفاعلية.",
        "benefit": "أدركت كيفية قراءة الإشارات وعرضها داخل المكونات التقديمية بسلاسة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف ترتبط شاشة المقاعد التفاعلية بمخزن الحالة المركزي (CinemaStore)؟",
        "options": [
          "عبر حقن CinemaStore بدالة inject() واستدعاء toggleSeat(id) عند نقر أي مقعد",
          "بنسخ كود الكلاس في كل ملف",
          "بفتح نافذة متصفح جديدة"
        ],
        "correct": 0,
        "task": "كيف ترتبط شاشة المقاعد التفاعلية بمخزن الحالة المركزي (CinemaStore)؟",
        "benefit": "إجابة عبقرية! الحقن الوظيفي عبر inject() مع تفويض التفاعلات للمخزن يفصل منطق الأعمال عن العرض التقديمي تماماً."
      }
    ]
  },
  {
    "id": "capstone-05",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "استمارة تأكيد الحجز وحساب التكلفة مع كود الخصم وطرق الدفع",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "بناء مكون إتمام ودفع الحجز CheckoutComponent؛ استيعاب صياغة العمليات الحسابية المالية المعقدة داخل إشارات محسوبة computed()، وتطبيق نسبة كود الخصم، واحتساب ضريبة القيمة المضافة 15% VAT تلقائياً بدقة، وتحديث المجموع النهائي فورياً مع تغير أي من المدخلات دون وميض أو إعادة تصيير غير ضرورية.",
    "concept": "في التطبيقات التجارية الحقيقية والمنصات المؤسسية كمنصات حجز تذاكر السينما والفعاليات الكبرى، تمثل دقة الحسابات المالية ركيزة الأمان والمصداقية الأولى للخدمة. تتطلب شاشات الدفع وإتمام الطلب (Checkout) معالجة متزامنة لعدة متغيرات ديناميكية: المجموع الفرعي لسعر المقاعد المختارة (Subtotal)، نسبة الخصم المطبقة عبر كوبونات الترويج (Discount Rate)، ومعدل ضريبة القيمة المضافة الإلزامية (VAT) بنسبة 15% وفق المعايير واللوائح المعتمدة.\nفي معماريات تطوير الويب القديمة، كان حساب هذه القيم يتم عبر دوال دورية أو مراقبات أحداث متعددة تؤدي لتضارب البيانات وتكرار العمليات الحسابية وتدني الأداء الحسابي لواجهات المستخدم. ولكن مع إطار عمل Angular الحديث واستخدام محرك التفاعلية الدقيقة Signals، أصبح بالإمكان اشتقاق القيم المالية عبر دالة computed() الرياضية النقية.\nتتميز دالة computed() بخاصيتين هندسيتين حاسمتين:\n1. التخزين المؤقت الذكي (Memoization): لا يتم إعادة حساب المجموع النهائي إلا إذا تغيرت الإشارات الأصلية المعتمدة (مثل subtotal أو discount)، مما يوفر معالجة معمارية فائقة السرعة.\n2. التتبع التلقائي للتبعيات (Automatic Dependency Tracking): تسجل دالة computed تلقائياً أي إشارة signal() يتم قراءتها بداخلها؛ فبمجرد قيام العميل بتفعيل كود خصم جديد مثل KHOTWA10 لتطبيق خصم 10%، يُعاد حساب القيمة المخفضة فوراً، وتُضرب في معامل الضريبة 1.15 لاحتساب الضريبة تلقائياً وعرض المجموع الإجمالي النهائي بدقة متناهية.\nباستخدام هذا النمط، نضمن خلو الكود من أي آثار جانبية غير مرغوبة (Side Effects)، مع ربط سلس ونظيف في قالب المكون standalone component لعرض التكلفة النهائية بدقة وسرعة فائقة في منصة سينما خطوة الاحترافية.",
    "flow": "مدخلات العميل ⟶ تطبيق كود KHOTWA10 ⟶ احتساب الضريبة والخصم ⟶ تأكيد الدفع",
    "task": "اكتب حساب finalTotal داخل CheckoutComponent متضمناً الخصم و 15% ضريبة.",
    "file": "src/app/features/checkout/checkout.component.ts",
    "code": "import { Component, computed, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-checkout',\n  standalone: true,\n  template: '<div class=\"checkout-summary\">المجموع النهائي: {{ finalTotal() }}</div>'\n})\nexport class CheckoutComponent {\n  subtotal = signal<number>(170);\n  discount = signal<number>(0.10);\n  finalTotal = computed(() => {\n    const discounted = this.subtotal() * (1 - this.discount());\n    return discounted * 1.15;\n  });\n}",
    "expected": "finalTotal = computed(() => {",
    "reference": "https://angular.dev/guide/signals#computed-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية: الحسابات المالية التفاعلية بدقة عبر computed()",
        "explanation": "تتيح دالة computed() في Angular اشتقاق القيم الرياضية والمالية بدقة فائقة اعتماداً على إشارات أخرى، مع ميزة التخزين المؤقت الذكي التي تضمن عدم إعادة الحساب إلا عند تغير المدخلات الأصلية.",
        "flow": "تحديد التكلفة الأولية subtotal ⟶ تطبيق الخصم discount ⟶ احتساب 15% ضريبة بـ computed() ⟶ المجموع النهائي المحدث فوراً",
        "task": "تأمل كيف تضمن دالة computed() اتساق العمليات الحسابية للأسعار والضرائب دون الحاجة لدوال تحديث يدوية.",
        "benefit": "استوعبت القوة الهندسية للاشتقاق التفاعلي في النظم المالية المعاصرة بـ Angular."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة computed() وتطبيق معادلة الضريبة والخصم",
        "explanation": "تقرأ دالة computed إشارة subtotal() وتطرح نسبة الخصم discount()، ثم تضرب الناتج الصافي في 1.15 لإضافة ضريبة القيمة المضافة VAT 15%، منتجة إشارة جديدة للقراءة فقط.",
        "flow": "subtotal() * (1 - discount()) ⟶ ضرب القيمة في 1.15 ⟶ إرجاع finalTotal كإشارة محسوبة",
        "task": "حلل المعادلة الرياضية داخل computed() وكيفية قراءة قيم الإشارات عبر استدعائها كدوال ()subtotal.",
        "benefit": "أتقنت الصياغة الرياضية الدقيقة لتطبيق الضرائب والخصومات داخل الإشارات المحسوبة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء مكون CheckoutComponent في ملف src/app/features/checkout/checkout.component.ts واشتقاق إشارة finalTotal لحساب الإجمالي بعد خصم 10% وإضافة ضريبة 15%.",
        "file": "src/app/features/checkout/checkout.component.ts",
        "code": "import { Component, computed, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-checkout',\n  standalone: true,\n  template: '<div class=\"checkout-summary\">المجموع النهائي: {{ finalTotal() }}</div>'\n})\nexport class CheckoutComponent {\n  subtotal = signal<number>(170);\n  discount = signal<number>(0.10);\n  finalTotal = computed(() => {\n    const discounted = this.subtotal() * (1 - this.discount());\n    return discounted * 1.15;\n  });\n}",
        "expected": "finalTotal = computed(() => {",
        "task": "اكتب كود CheckoutComponent مع حساب finalTotal ثم اضغط على زر (شغّل وافحص).",
        "benefit": "بنيت عملياً استمارة دفع وحساب تكلفة حقيقية متوافقة مع الأنظمة المالية الحديثة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تعديل قيمة خصم الكوبون discount إلى 0.20 (أي خصم 20%) أو تغيير التكلفة subtotal إلى 200، ولاحظ كيف يتغير المجموع النهائي فورياً بدقة متناهية.",
        "task": "غيّر قيمة discount أو subtotal وتأمل إعادة الحساب التلقائي اللحظي للمجموع النهائي.",
        "benefit": "تحققت بنفسك من سرعة وتلقائية تحديث القيم المشتقة عند تغير الإشارات المعتمدة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف يتم حساب ضريبة القيمة المضافة 15% بعد الخصم تلقائياً؟",
        "options": [
          "داخل دالة computed() تضرب السعر المخفض في 1.15 وتتحدث تلقائياً مع أي تغيير",
          "بكتابة القيمة يدوياً في القالب",
          "بسؤال الزائر عن نسبة الضريبة"
        ],
        "correct": 0,
        "task": "كيف يتم حساب ضريبة القيمة المضافة 15% بعد الخصم تلقائياً؟",
        "benefit": "إجابة صحيحة تماماً! دالة computed() تضمن اشتقاق القيمة المالية تلقائياً وتحديث الواجهة فور حدوث أي تعديل في السعر أو الخصم."
      }
    ]
  },
  {
    "id": "capstone-06",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "بطاقة التذكرة الإلكترونية الرقمية (Digital Boarding Pass Ticket)",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "تصميم وبرمجة مكون تذكرة الصعود الإلكترونية TicketPassComponent؛ استقبال رقم الحجز المرجعي عبر إشارة المدخل الإلزامية input.required<string>()، وتنسيق بطاقة التذكرة كبطاقة صعود رقمية أنيقة، وإتاحة زر الطباعة المباشر عبر واجهة المتصفح window.print().",
    "concept": "تمثل مرحلة استخراج التذكرة الرقمية (Digital Boarding Pass) ذروة تجربة المستخدم (User Experience) في منصات حجز السينما والرحلات والفعاليات الترفيهية؛ فبعد إتمام العميل لكافة خطوات اختيار الفيلم وتحديد المقاعد وسداد التكلفة المالية، ينتقل التطبيق إلى مرحلة تأكيد الحجز وإصدار وثيقة الصعود الرقمية التي تحتوي على كافة التفاصيل الأساسية كرقم الحجز المرجعي (Booking Reference)، وتفاصيل القاعة، والمقاعد المحجوزة، وتوقيت العرض.\nفي معمارية Angular الحديثة، يتم تصميم مكون التذكرة TicketPassComponent كمكون مستقل ونقي (Standalone Presentational Component). يستقبل المكون البيانات الحيوية من المكون الأب أو مخزن الحالة عبر إشارات المدخلات الحديثة Signal Inputs وتحديداً دالة input.required<string>()؛ تضمن هذه الدالة أن المكون لن يبدأ دورة حياته دون استلام رقم حجز صالح، وتوفر تدقيقاً نوعياً صارماً في وقت التصريف (Compile-Time Safety) يمنع ظهور شاشات فارغة أو تذاكر غير مكتملة للعملاء.\nعلاوة على ذلك، تتطلب بطاقات الصعود الرقمية تقديم إمكانية حفظ أو طباعة الوثيقة دون إجبار العميل على تثبيت مكتبات خارجية ضخمة من شأنها إبطاء التطبيق وزيادة حجم الحزم البرمجية. هنا تبرز قوة واجهات برمجة تطبيقات المتصفح القياسية (Native Web APIs) من خلال استدعاء دالة window.print(). تمكن هذه الدالة البسيطة والفعالة من فتح نافذة الطباعة الافتراضية للمتصفح فوراً، مما يتيح للعميل طباعة التذكرة على الورق أو تصديرها كملف PDF رقمي عالي الجودة بنقرة زر واحدة داخل منصة سينما خطوة الاحترافية.",
    "flow": "نجاح عملية الحجز ⟶ استخراج بطاقة الصعود الرقمية ⟶ استدعاء window.print()",
    "task": "أنشئ مكون التذكرة الرقمية TicketPassComponent مع زر طباعة التذكرة.",
    "file": "src/app/features/tickets/ticket-pass.component.ts",
    "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-ticket-pass',\n  standalone: true,\n  template: `\n    <div class=\"final-ticket-card\">\n      <h3>سينما خطوة · تذكرة دخول إلكترونية</h3>\n      <p>رقم الحجز: {{ bookingRef() }}</p>\n      <button class=\"btn-confirm\" (click)=\"printTicket()\">طباعة التذكرة</button>\n    </div>\n  `\n})\nexport class TicketPassComponent {\n  bookingRef = input.required<string>();\n  printTicket() { window.print(); }\n}",
    "expected": "export class TicketPassComponent {",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية: تذكرة الصعود الرقمية وتكامل واجهات المتصفح الأصلية",
        "explanation": "تصميم مكون عرض أنيق ومستقل يعتمد على مدخل إشارة إلزامي input.required ويستخدم إمكانيات المتصفح الأصلية window.print() لتصدير التذكرة دون مكتبات خارجية إضافية.",
        "flow": "تأكيد نجاح الحجز ⟶ تمرير رقم الحجز كمدخل إشارة ⟶ عرض بطاقة الصعود ⟶ فتح الطباعة بـ window.print()",
        "task": "تأمل كيف يوفر استخدام window.print() إمكانية حفظ التذكرة كـ PDF وطباعتها بأقل حجم كود ممكن.",
        "benefit": "استوعبت أسلوب بناء مكونات العرض النقية وتكاملها مع واجهات المتصفح القياسية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة input.required ودالة printTicket()",
        "explanation": "نستخدم bookingRef = input.required<string>() لإلزام تمرير رقم الحجز، ونربط حدث النقر (click)=\"printTicket()\" باستدعاء دالة window.print() الأصلية.",
        "flow": "bookingRef = input.required<string>() ⟶ عرض {{ bookingRef() }} ⟶ النقر يستدعي window.print()",
        "task": "حلل استخدام input.required لضمان سلامة البيانات وربط حدث النقر بدالة الطباعة.",
        "benefit": "أتقنت بناء المكونات المعيارية الآمنة نوعياً وربط الأحداث بالواجهات التفاعلية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بإنشاء المكون TicketPassComponent في ملف src/app/features/tickets/ticket-pass.component.ts لتمثيل بطاقة التذكرة الإلكترونية مع زر الطباعة.",
        "file": "src/app/features/tickets/ticket-pass.component.ts",
        "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-ticket-pass',\n  standalone: true,\n  template: `\n    <div class=\"final-ticket-card\">\n      <h3>سينما خطوة · تذكرة دخول إلكترونية</h3>\n      <p>رقم الحجز: {{ bookingRef() }}</p>\n      <button class=\"btn-confirm\" (click)=\"printTicket()\">طباعة التذكرة</button>\n    </div>\n  `\n})\nexport class TicketPassComponent {\n  bookingRef = input.required<string>();\n  printTicket() { window.print(); }\n}",
        "expected": "export class TicketPassComponent {",
        "task": "أنشئ مكون TicketPassComponent مع زر طباعة التذكرة ثم اضغط (شغّل وافحص).",
        "benefit": "أنجزت بطاقة تذكرة رقمية احترافية تتوّج رحلة الحجز الكاملة في منصة السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة معلومات جديدة إلى قالب التذكرة مثل اسم القاعة أو رمز الاستجابة السريعة QR code وتأمل كيف يعرض المكون التذكرة بتنسيق جذاب.",
        "task": "جرّب إضافة تفاصيل إضافية في القالب وتأمل كيفية تفاعل مكون التذكرة.",
        "benefit": "تعلمت كيفية تخصيص بطاقات التذاكر الرقمية لتناسب متطلبات العمل المختلفة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي دالة المتصفح الأصلية المستخدمة لطباعة تذكرة الحجز مباشرة؟",
        "options": [
          "استدعاء الدالة window.print()",
          "استدعاء الدالة document.savePDF()",
          "استدعاء الدالة console.log()"
        ],
        "correct": 0,
        "task": "ما هي دالة المتصفح الأصلية المستخدمة لطباعة تذكرة الحجز مباشرة؟",
        "benefit": "إجابة رائعة! دالة window.print() هي دالة المتصفح المعيارية لفتح حوار الطباعة وتصدير المستند بصيغة PDF فورياً."
      }
    ]
  },
  {
    "id": "capstone-07",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "كتابة اختبارات الوحدة الحقيقية للمكونات والـ Signals بـ Vitest",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "احتراف كتابة اختبارات الوحدة الصارمة (Unit Testing) لمخازن الحالة ومحرك الإشارات Signals في Angular باستخدام إطار العمل الحديث Vitest؛ توظيف دوال describe و it و expect للتحقق من السلوك الرياضي والمنطقي لدالة toggleSeat ومطابقة المصفوفات بدقة عبر toEqual.",
    "concept": "في المشاريع البرمجية المؤسسية والتطبيقات الإنتاجية واسعة النطاق، لا يمكن اعتبار أي ميزة مكتملة دون تغطيتها باختبارات وحدة آلية صارمة تضمن استقرار النظام ومنع أي انحدار برمجي (Regression) عند إضافة مزايا جديدة. بعد الانتقال التاريخي لـ Angular نحو نظام الإشارات Signals المعزول عن تبعيات Zone.js، أصبح اختبار الحالة في منتهى البساطة والسرعة والخفة؛ حيث لم تعد هناك حاجة لإنشاء بيئات اختبار معقدة أو تهيئة TestBed ثقيلة لاختبار منطق الأعمال النقي.\nيُعد إطار الاختبار المعاصر Vitest الخيار المفضل والحديث في بيئات البناء فائقة السرعة؛ نظراً لاعتماده على محرك Vite وخفته الاستثنائية ودعمه الأصيل لـ TypeScript ووحدات ESM. عند اختبار مخزن الحالة المركزي CinemaStore، نستخدم بنية الاختبار القياسية:\n1. دالة describe('CinemaStore', ...): لتجميع وتصنيف جناح الاختبارات الخاص بالمخزن ضمن سياق منطقي واحد واضح ومفهوم.\n2. دالة it('toggles seat selection correctly', ...): لتعريف حالة اختبارية محددة تختبر سيناريو عملي من سيناريوهات المستخدم الحقيقي.\n3. محددات الفحص التوكيدي (Assertions): مثل expect(store.selectedSeats()).toEqual([]). هنا نختبر الحالة الابتدائية لمصفوفة المقاعد، ثم نقوم بمحاكاة نقر العميل للمقعد عبر استدعاء store.toggleSeat('B4')، ونتحقق من احتوائها على المقعد المحدد بدقة، ثم نستدعي الدالة مرة أخرى للمقعد ذاته للتأكد من إلغاء تحديده وعودة المصفوفة خالية تماماً.\nيمنح هذا النهج المطورين وفرق العمل الهندسية ثقة مطلقة بأن منطق اختيار المقاعد وسلة الحجز في منصة سينما خطوة يعمل بدقة لا تشوبها شائبة قبل رفعه إلى خوادم الإنتاج.",
    "flow": "جناح اختبار describe ⟶ محاكاة تفاعل المستخدم ⟶ فحص النتيجة بـ expect()",
    "task": "اكتب اختبار وحدة لـ CinemaStore للتحقق من إضافة وإزالة المقاعد بـ Vitest.",
    "file": "src/app/core/store/cinema.store.spec.ts",
    "code": "import { describe, it, expect } from 'vitest';\nimport { CinemaStore } from './cinema.store';\n\ndescribe('CinemaStore', () => {\n  it('toggles seat selection correctly', () => {\n    const store = new CinemaStore();\n    expect(store.selectedSeats()).toEqual([]);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual(['B4']);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual([]);\n  });\n});",
    "expected": "describe('CinemaStore', () => {",
    "reference": "https://angular.dev/guide/testing",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية: اختبارات الوحدة السريعة لمخازن الحالة بـ Vitest",
        "explanation": "بفضل اعتماد مخازن الحالة على Signals نقية، يمكن اختبارها بسرعة وخفة فائقة دون الحاجة لـ TestBed المعقد؛ نقوم فقط بإنشاء نسخة من الكلاس واستدعاء دواله والتحقق من النتيجة بـ expect().",
        "flow": "إنشاء كائن CinemaStore ⟶ فحص الحالة الابتدائية ⟶ محاكاة اختيار المقعد ⟶ التأكد من النتيجة بـ toEqual",
        "task": "تأمل كيف تتيح Signals كتابة اختبارات وحدة شديدة السرعة والنظافة دون أي إعدادات إضافية.",
        "benefit": "استوعبت مزايا اختبار منطق الأعمال النقي المعزول عن واجهة المستخدم."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صياغة describe و it و expect(actual).toEqual(expected)",
        "explanation": "تجمع describe الاختبارات، وتعرف it السيناريو، بينما تقارن expect().toEqual() المصفوفات والكائنات بالقيمة (Deep Equality) بدلاً من المرجع.",
        "flow": "describe('CinemaStore') ⟶ it('toggles seat') ⟶ store.toggleSeat('B4') ⟶ expect().toEqual(['B4'])",
        "task": "حلل هيكل كود الاختبار وكيفية تتبع تغير قيمة إشارة ()store.selectedSeats خطوة بخطوة.",
        "benefit": "أتقنت الصياغة المعيارية لاختبارات الوحدة ومقارنة مصفوفات الإشارات التفاعلية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنكتب ملف الاختبار src/app/core/store/cinema.store.spec.ts للتحقق من منطق اختيار وإلغاء اختيار المقاعد في مخزن السينما المركزي CinemaStore باستخدام Vitest.",
        "file": "src/app/core/store/cinema.store.spec.ts",
        "code": "import { describe, it, expect } from 'vitest';\nimport { CinemaStore } from './cinema.store';\n\ndescribe('CinemaStore', () => {\n  it('toggles seat selection correctly', () => {\n    const store = new CinemaStore();\n    expect(store.selectedSeats()).toEqual([]);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual(['B4']);\n    store.toggleSeat('B4');\n    expect(store.selectedSeats()).toEqual([]);\n  });\n});",
        "expected": "describe('CinemaStore', () => {",
        "task": "اكتب اختبار وحدة لـ CinemaStore للتحقق من إضافة وإزالة المقاعد بـ Vitest ثم اضغط (شغّل وافحص).",
        "benefit": "بنيت اختبار وحدة حقيقي يضمن دقة وموثوقية حالة المقاعد في مشروع التخرج."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة فحص إضافي لإشارة seatCount() للتحقق من أنها تعيد 1 عند اختيار مقعد و 0 عند إلغائه: expect(store.seatCount()).toBe(1).",
        "task": "أضف توكيداً على إشارة store.seatCount() وتأمل كيف تؤكد الاختبارات صحة الإشارات المشتقة.",
        "benefit": "تعلمت كيفية توسيع نطاق الاختبار ليشمل الإشارات المشتقة computed أيضاً."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي دالة الفحص في Vitest للتحقق من أن مصفوفة الإشارة تطابق النتيجة المتوقعة؟",
        "options": [
          "expect(actual).toEqual(expected)",
          "assert(true)",
          "checkResult(val)"
        ],
        "correct": 0,
        "task": "ما هي دالة الفحص في Vitest للتحقق من أن مصفوفة الإشارة تطابق النتيجة المتوقعة؟",
        "benefit": "إجابة ممتازة! دالة expect(actual).toEqual(expected) تقوم بمقارنة القيم العميقة للمصفوفات والكائنات للتأكد من تطابقها التام."
      }
    ]
  },
  {
    "id": "capstone-08",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "تحسين الأداء وفحص حزم بناء الإنتاج وتطبيق Tree-shaking",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "فهم وتطبيق استراتيجيات تحسين الأداء لبناء الإنتاج Production Build في Angular؛ ضبط إعدادات angular.json لتفعيل optimization: true وخاصية outputHashing: all، وفهم تقنية استبعاد الأكواد الميتة (Tree-shaking) لتقليص حجم الحزم البرمجية وتسريع وقت التحميل الأولي للمستخدمين.",
    "concept": "عند الانتقال بتطبيق Angular من بيئة التطوير المحلية (Development) إلى بيئة الإنتاج الحقيقية (Production)، يصبح حجم الحزم البرمجية وزمن التحميل الأولي (First Contentful Paint) معيار النجاح الفارق للتطبيق وتجربة المستخدم وترتيب محركات البحث (SEO). في بيئة التطوير، يتم التركيز على سرعة البناء وإعادة التحميل الفوري وتوفير خرائط المصدر (Source Maps) لتسهيل تصحيح الأخطاء، مما يجعل الحزم كبيرة الحجم وغير مهيأة للنشر العام.\nلتحقيق أعلى كفاءة إنتاجية، يعتمد مهندسو Angular على أدوات البناء المتقدمة المضبوطة عبر ملف الإعداد المركزي angular.json. يتم تكوين خيارات البناء تحت الهدف \"build\" والتهيئة الخاصة بـ \"configurations.production\". في هذه التهيئة، نفعّل خيارين هندسيين بالغي الأهمية:\n1. خيار \"optimization\": true: وهو المسؤول عن تفعيل سلسلة من التحسينات الفائقة؛ تشمل ضغط الأكواد المصدرية (Minification)، وحذف التعليقات والمسافات البيضاء، وإعادة تسمية المتغيرات بأسماء مختصرة (Munging)، والأهم من ذلك تفعيل تقنية استبعاد الأكواد غير المستخدمة المعروفة بـ Tree-shaking؛ حيث تقوم أداة البناء بفحص شجرة استيرادات المشروع بالكامل وحذف أي دوال أو فئات تم استيرادها جزئياً ولم يتم استدعاؤها فعلياً في كود التطبيق، مما يوفر عشرات الكيلوبايتات الثمينة.\n2. خيار \"outputHashing\": \"all\": الذي يضيف قيمة تشفير عشوائية (Hash) لكل اسم ملف مبني (مثل main.7b3e2a.js)؛ يضمن هذا التجزير كسر التخزين المؤقت للمتصفح (Cache Busting) عند نشر أي إصدار جديد، ليحصل الزوار فوراً على أحدث كود دون الحاجة لإعادة تحميل قسري.\nبتطبيق هذه الإعدادات الصارمة، نضمن أن منصة سينما خطوة الاحترافية تقدم أسرع تجربة تصفح ممكنة للمستخدمين على مختلف شبكات الاتصال.",
    "flow": "تفعيل optimization في angular.json ⟶ تشغيل ng build ⟶ التأكد من خفة الحزمة",
    "task": "تحقق من تفعيل خاصية optimization: true في إعدادات بناء الإنتاج داخل angular.json.",
    "file": "angular.json",
    "code": "\"configurations\": { \"production\": { \"optimization\": true, \"outputHashing\": \"all\" } }",
    "expected": "\"optimization\": true",
    "reference": "https://angular.dev/tools/cli/deployment",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية: بناء الإنتاج الأمثل وتقنية Tree-shaking",
        "explanation": "يعمل بناء الإنتاج على إزالة كل الأكواد غير المستخدمة وضغط الملفات لتقليص حجم التطبيق إلى الحد الأدنى، مما يسرع تحميل الموقع بصورة دراماتيكية للزوار.",
        "flow": "كود المشروع الكامل ⟶ تحليل الاستيرادات والتبعيات ⟶ استبعاد الأكواد الميتة (Tree-shaking) ⟶ حزم إنتاجية مصغرة وخفيفة",
        "task": "تأمل الفارق الهائل في الأداء وحجم الحزم بين بيئة التطوير وبيئة الإنتاج المحسنة.",
        "benefit": "استوعبت أثر إعدادات بناء الإنتاج على سرعة تجربة المستخدم وترشيد استهلاك البيانات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح إعدادات production داخل ملف angular.json",
        "explanation": "يحتوي كائن configurations.production على optimization: true لتفعيل تصغير الكود والـ Tree-shaking، و outputHashing: 'all' لمنع مشاكل التخزين المؤقت للمتصفح عند التحديثات.",
        "flow": "\"configurations\": { \"production\": { \"optimization\": true, \"outputHashing\": \"all\" } }",
        "task": "حلل إعدادات optimization و outputHashing وأهميتهما لمواقع الإنتاج العالمية.",
        "benefit": "أتقنت ضبط معاملات البناء الرسمية في ملف الإعداد المعماري angular.json."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بضبط خيارات بناء الإنتاج داخل ملف angular.json وتأكيد تفعيل خاصية optimization: true وخاصية outputHashing: 'all' لإنتاج حزم فائقة الخفة والسرعة.",
        "file": "angular.json",
        "code": "\"configurations\": { \"production\": { \"optimization\": true, \"outputHashing\": \"all\" } }",
        "expected": "\"optimization\": true",
        "task": "تحقق من تفعيل خاصية optimization: true في إعدادات بناء الإنتاج داخل angular.json ثم اضغط (شغّل وافحص).",
        "benefit": "هيأت إعدادات بناء الإنتاج الاحترافية لمشروع سينما خطوة لضمان أعلى مستويات الأداء."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "تأمل ما يحدث في بيئة التطوير development عند تعيين optimization إلى false لتمكين خرائط المصدر وسرعة إعادة البناء أثناء كتابة الكود.",
        "task": "قارن بين إعدادات بيئة التطوير والإنتاج في ملف التكوين.",
        "benefit": "فهمت التوازن الهندسي بين سرعة تصحيح الأخطاء في التطوير وسرعة الأداء في الإنتاج."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة الأساسية من تفعيل optimization: true في بناء الإنتاج لـ Angular؟",
        "options": [
          "ضغط الكود واستبعاد الأجزاء غير المستخدمة (Tree-shaking) لتسريع تحميل الموقع",
          "تغيير خطوط الموقع",
          "منع المستخدمين من التقاط لقطة شاشة"
        ],
        "correct": 0,
        "task": "ما الفائدة الأساسية من تفعيل optimization: true في بناء الإنتاج لـ Angular؟",
        "benefit": "إجابة صحيحة! تفعيل optimization يقوم بضغط الكود وتطبيق Tree-shaking لحذف الأكواد الميتة وتقليل زمن التحميل."
      }
    ]
  },
  {
    "id": "capstone-09",
    "module": "phase-7-capstone",
    "phase": "المرحلة 7: مشروع التخرج المؤسسي واختبارات الوحدة",
    "title": "المراجعة المعمارية الشاملة وتأهيل المشروع لسوق العمل",
    "duration": "20 دقيقة",
    "level": "متقدم",
    "summary": "صياغة وثيقة README الاحترافية لمشروع التخرج المؤسسي Khotwa Cinema Pro؛ استعراض المعمارية النظيفة (Clean Architecture)، وتبرير القرارات التقنية الحديثة كـ Signals و DI الوظيفي و Standalone Components، وتأهيل المتعلّم للمقابلات الوظيفية كمهندس Angular محترف.",
    "concept": "عند الانتهاء من بناء تطبيق برمجي متكامل، يواجه الكثير من المطورين عقبة تقديم أعمالهم بصورة تبرز مهاراتهم الحقيقية أمام مدراء التوظيف واللجان الهندسية في المقابلات التقنية (Technical Interviews). لا يقتصر التميز الهندسي على كتابة كود يعمل فحسب، بل يمتد إلى القدرة على توثيق المعمارية البرمجية، وتوضيح أسباب اختيار تقنيات معينة دون غيرها، وشرح كيفية تقسيم المسؤوليات داخل التطبيق.\nيمثل ملف README.md الواجهة الرئيسية ومحطة الانطباع الأولى لكل من يتصفح مستودع المشروع على GitHub. في منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)، نوثق المعمارية المؤسسية المبنية على أحدث إصدارات Angular 22 ومحرك التفاعلية الفائق Signals وفق المعايير العالمية:\n1. نظرة عامة ورؤية المشروع: التعريف بالمنصة كنظام تجاري متكامل لحجز تذاكر السينما واختيار المقاعد البصرية وسداد التكلفة.\n2. القرارات المعمارية الجوهرية (Architecture Decision Records): شرح مبررات الاستغناء عن وحدات NgModule الكلاسيكية لصالح Standalone Components، ومقارنة نظام Signals الدقيق بنظام Zone.js القديم، وتوضيح كيفية إدارة الحالة عبر CinemaStore مركزي نقي بدون الحاجة لمكتبات خارجية ثقيلة كـ NgRx.\n3. هيكل المجلدات النظيف: توضيح فصل طبقات core (النماذج والمخازن المشتركة) و features (شاشات الأفلام والمقاعد وإتمام الدفع) و shared (المكونات والموجهات المشتركة).\n4. استراتيجية الجودة والاختبارات: توثيق أسلوب اختبارات الوحدة بـ Vitest وضمان موثوقية العمليات المالية والحسابية.\nيمنح هذا التوثيق المعماري الشامل الخريج الثقة التامة للحديث بطلاقة واحترافية في المقابلات الوظيفية، وإثبات امتلاكه لعقلية مهندس البرمجيات المؤهل لسوق العمل العالمي.",
    "flow": "كود نظيف ومختبر ⟶ توثيق README ⟶ استعراض في المقابلة الوظيفية ⟶ التوظيف",
    "task": "وثّق المعمارية المؤسسية في ملف README.md بعنوان منصة سينما خطوة الاحترافية.",
    "file": "README.md",
    "code": "# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro) - مبنية بـ Angular 22 و Signals\n\nتطبيق ويب مؤسسي متكامل لحجز تذاكر السينما مبني بأحدث معايير Angular الحديثة.\n\n## المعمارية البرمجية (Architecture)\n- **المكونات المستقلة (Standalone Components)**: الاستغناء التام عن وحدات NgModule.\n- **محرك الإشارات (Angular Signals)**: إدارة حالة تفاعلية دقيقة فائقة الأداء دون الاعتماد على Zone.js.\n- **مخزن الحالة المركزي (CinemaStore)**: مستودع مركزي نقي يدير المقاعد وسلة الحجز بـ signal() و computed().\n- **التوجيه الحديث والحراس الوظيفيون**: حماية المسارات بدوال CanActivateFn وربط المعاملات بـ withComponentInputBinding().\n- **النماذج الصارمة والمدققات المخصصة**: Typed Reactive Forms بخيار nonNullable ومدقق الهواتف السعودية.\n- **اختبارات الوحدة (Unit Testing)**: اختبارات جودة سريعة وشاملة باستخدام Vitest.",
    "expected": "# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)",
    "reference": "https://angular.dev/overview",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الهندسية: التوثيق المعماري وتأهيل المشاريع لسوق العمل",
        "explanation": "توثيق المعمارية البرمجية ومبررات القرارات التقنية في ملف README.md هو ما يميّز المطور العادي عن مهندس البرمجيات المحترف أمام مسؤولي التوظيف واللجان الهندسية.",
        "flow": "معمارية نظيفة ⟶ توثيق هندسي شامل ⟶ محفظة أعمال احترافية على GitHub ⟶ اجتياز المقابلات التقنية بتفوق",
        "task": "تأمل كيف يعكس ملف README.md الاحترافي مدى عمق فهمك للقرارات المعمارية في Angular.",
        "benefit": "استوعبت أهمية التوثيق التقني كأداة حاسمة للترويج لخبراتك في سوق العمل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح هيكل التوثيق المؤسسي وقرارات المعمارية الحديثة",
        "explanation": "يشمل التوثيق الاحترافي عنوان المشروع، والمكدس التقني (Angular 22, Signals, Vitest)، وهيكل المجلدات النظيف، ومبررات الاستغناء عن NgModule لصالح Standalone Components.",
        "flow": "عنوان المشروع ⟶ الميزات والمعمارية ⟶ مبررات استخدام Signals ⟶ استراتيجية الاختبارات والتشغيل",
        "task": "حلل الأقسام الأساسية لملف التوثيق وكيف تبرز المهارات الهندسية المتقدمة.",
        "benefit": "أتقنت هيكلة ملفات التوثيق التقنية للمشاريع الكبرى وفق المعايير العالمية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنقوم بتوثيق المعمارية المؤسسية لمنصة سينما خطوة الاحترافية داخل ملف README.md مع إبراز استخدام Angular 22 و Signals والمعمارية النظيفة.",
        "file": "README.md",
        "code": "# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro) - مبنية بـ Angular 22 و Signals\n\nتطبيق ويب مؤسسي متكامل لحجز تذاكر السينما مبني بأحدث معايير Angular الحديثة.\n\n## المعمارية البرمجية (Architecture)\n- **المكونات المستقلة (Standalone Components)**: الاستغناء التام عن وحدات NgModule.\n- **محرك الإشارات (Angular Signals)**: إدارة حالة تفاعلية دقيقة فائقة الأداء دون الاعتماد على Zone.js.\n- **مخزن الحالة المركزي (CinemaStore)**: مستودع مركزي نقي يدير المقاعد وسلة الحجز بـ signal() و computed().\n- **التوجيه الحديث والحراس الوظيفيون**: حماية المسارات بدوال CanActivateFn وربط المعاملات بـ withComponentInputBinding().\n- **النماذج الصارمة والمدققات المخصصة**: Typed Reactive Forms بخيار nonNullable ومدقق الهواتف السعودية.\n- **اختبارات الوحدة (Unit Testing)**: اختبارات جودة سريعة وشاملة باستخدام Vitest.",
        "expected": "# منصة سينما خطوة الاحترافية (Khotwa Cinema Pro)",
        "task": "وثّق المعمارية المؤسسية في ملف README.md بعنوان منصة سينما خطوة الاحترافية ثم اضغط (شغّل وافحص).",
        "benefit": "أتممت توثيق مشروع التخرج المؤسسي بنجاح وأصبحت جاهزاً لمقابلات العمل التقنية بثقة واقتدار."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب إضافة قسم جديد يوضح كيفية تشغيل المشروع بالأمر ng serve أو تشغيل الاختبارات بالأمر vitest run.",
        "task": "أضف قسماً لتعليمات التشغيل والاختبار وتأمل اكتمال الوثيقة الهندسية.",
        "benefit": "تعلمت كيفية صياغة وثائق مشاريع متكاملة وسهلة التشغيل لأي فريق تطوير."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو العنصر الأكثر أهمية لتوثيقه في GitHub عند التقدم لوظيفة مهندس Angular؟",
        "options": [
          "توضيح المعمارية النظيفة، مبررات القرارات التقنية (مثل Signals و DI الوظيفي)، والاختبارات",
          "وضع صورة شخصية في كل ملف",
          "إخفاء الكود البرمجي عن الجميع"
        ],
        "correct": 0,
        "task": "ما هو العنصر الأكثر أهمية لتوثيقه في GitHub عند التقدم لوظيفة مهندس Angular؟",
        "benefit": "إجابة مثالية! مدراء التوظيف والمهندسون يقيّمون فهمك للمعمارية ومبررات قراراتك البرمجية وجودة الاختبارات."
      }
    ]
  },
  {
    "id": "ng-intro",
    "phase": "البداية من الصفر",
    "title": "ما هو Angular وكيف يعمل؟",
    "concept": "Angular هو إطار عمل ويب قوي من Google لبناء تطبيقات تفاعلية فائقة السرعة (Single Page Applications) تعمل في المتصفح بسلاسة دون إعادة تحميل الصفحة.",
    "flow": "المتصفح ⟶ main.ts ⟶ المكون الرئيسي (App) ⟶ تظهر واجهة السينما فورًا",
    "task": "افتح src/app/app.ts وغيّر عنوان التطبيق إلى 'سينما النجوم'.",
    "file": "src/app/app.ts",
    "code": "readonly title = 'سينما النجوم';",
    "expected": "readonly title = 'سينما النجوم';",
    "reference": "https://angular.dev/overview",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في المواقع التقليدية، كل نقرة تُعيد تحميل الصفحة بالكامل. في Angular، المتصفح يحمل التطبيق مرة واحدة، ثم يُحدّث الأجزاء المتغيرة فقط بسرعة فائقة وبدون أي وميض.",
        "flow": "المتصفح ⟶ main.ts ⟶ المكون الرئيسي (App) ⟶ تظهر واجهة السينما فورًا",
        "task": "شغّل المثال الكامل أولًا لترى الهدف النهائي، ثم سنبنيه معًا خطوة بخطوة.",
        "benefit": "فهمت الفرق بين المواقع التقليدية وتطبيقات Angular أحادية الصفحة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح ملفات المكون",
        "explanation": "يتكون كل مكون في Angular من ثلاثة ملفات متكاملة: ملف TypeScript (.ts) للمنطق والبيانات، وملف HTML (.html) للهيكل والشكل، وملف CSS (.css) للتنسيق والألوان.",
        "flow": "app.ts (المنطق) + app.html (الشكل) + app.css (الألوان) = مكوّن متكامل",
        "task": "تفقد شجرة الملفات على اليمين ولاحظ وجود app.ts و app.html و app.css.",
        "benefit": "عرفت دور كل ملف وكيف تتكامل ملفات المكون معًا."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "داخل كلاس App في ملف src/app/app.ts، سنحدد اسم السينما الخاص بنا.",
        "file": "src/app/app.ts",
        "code": "readonly title = 'سينما النجوم';",
        "expected": "readonly title = 'سينما النجوم';",
        "task": "اكتب السطر أعلاه داخل كلاس App في src/app/app.ts، ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت أول خاصية بيانات بيدك وربطتها بالمكون."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "غيّر نص 'سينما النجوم' إلى اسم آخر مثل 'سينما المستقبل' وشاهد كيف تتحدث المعاينة فورًا في نافذة العرض.",
        "task": "عدّل الاسم ولاحظ المعاينة الحية في المتصفح.",
        "benefit": "تأكدت من قدرتك على تعديل البيانات ورؤية النتيجة فورًا."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو الملف المسؤول عن كتابة منطق المكون وبياناته في Angular؟",
        "options": [
          "ملف TypeScript ذو الامتداد .ts",
          "ملف التنسيق ذو الامتداد .css",
          "ملف الصور ذو الامتداد .png"
        ],
        "correct": 0,
        "benefit": "ثبتت المعلومة: ملف .ts هو عقل المكون ومصدر بياناته.",
        "task": "ما هو الملف المسؤول عن كتابة منطق المكون وبياناته في Angular؟"
      }
    ]
  },
  {
    "id": "ng-component-anatomy",
    "phase": "البداية من الصفر",
    "title": "تشريح المكون (@Component)",
    "concept": "المكون (Component) هو اللبنة الأساسية في Angular، ويتم تعريفه باستخدام الزخرف @Component الذي يربط الكلاس بقالبه وملف تنسيقه ومحدده في الصفحة.",
    "flow": "@Component({ selector, templateUrl, styleUrl }) ⟶ كلاس App",
    "task": "أضف خاصية جديدة تصف السينما داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly description: string = 'بوابتك لأروع عروض السينما الحصرية';",
    "expected": "readonly description: string = 'بوابتك لأروع عروض السينما الحصرية';",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الزخرف @Component يخبر Angular: هذا الكلاس ليس كلاسًا عاديًا، بل هو عنصر واجهة مستخدم له اسم ومظهر وتنسيق خاص به.",
        "flow": "@Component ⟶ يربط الكلاس (app.ts) بالقالب (app.html) والتنسيق (app.css)",
        "task": "اقرأ الزخرف @Component في أعلى ملف app.ts وتعرف على خصائصه الثلاث.",
        "benefit": "فهمت معنى الزخرف @Component ودوره في إعلان المكونات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح خصائص @Component",
        "explanation": "خاصية selector تحدد اسم وسم HTML الخاص بالمكون (مثل app-root)، بينما templateUrl يشير لملف القالب، وstyleUrl لملف التنسيق.",
        "flow": "selector: 'app-root' ⟶ <app-root></app-root> في المتصفح",
        "task": "لاحظ كيف يتم استخدام app-root داخل ملف src/index.html لعرض التطبيق.",
        "benefit": "عرفت كيف يظهر المكون في شجرة عناصر المتصفح."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف خاصية جديدة تصف السينما بنص صريح داخل كلاس App.",
        "file": "src/app/app.ts",
        "code": "readonly description: string = 'بوابتك لأروع عروض السينما الحصرية';",
        "expected": "readonly description: string = 'بوابتك لأروع عروض السينما الحصرية';",
        "task": "اكتب سطر الوصف داخل كلاس App ثم شغّل وافحص.",
        "benefit": "أضفت وصفًا مكتوبًا بنوع TypeScript الصريح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "غيّر نص الوصف ليكون وصفًا يعبر عن ذوقك السينمائي المفضل.",
        "task": "بدّل النص ولاحظ ثبات واستقرار الكود.",
        "benefit": "أتقنت إنشاء المتغيرات النصية داخل كلاس المكون."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما فائدة خاصية selector داخل @Component؟",
        "options": [
          "تحدد اسم وسم HTML الذي يمثل هذا المكون في الصفحة",
          "تحدد سرعة اتصال الإنترنت",
          "تقوم بمسح ملفات المشروع القديمة"
        ],
        "correct": 0,
        "benefit": "أتقنت معرفة المحدد selector وكيفية استدعاء المكون.",
        "task": "ما فائدة خاصية selector داخل @Component؟"
      }
    ]
  },
  {
    "id": "ng-template",
    "phase": "البداية من الصفر",
    "title": "قالب المكون (HTML Template)",
    "concept": "قالب HTML يحدد الهيكل البصري لما يراه المستخدم على الشاشة، ويعمل Angular على ملئه بالبيانات ديناميكيًا من خلال ملف TypeScript.",
    "flow": "ملف app.html ⟶ وسوم HTML مع علامات Angular ⟶ واجهة سينما حية",
    "task": "أضف فقرة ترحيبية تعرض الوصف داخل src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<p class=\"cinema-desc\">أفضل الأفلام العربية والعالمية بأعلى جودة صوت وصورة.</p>",
    "expected": "<p class=\"cinema-desc\">أفضل الأفلام العربية والعالمية بأعلى جودة صوت وصورة.</p>",
    "reference": "https://angular.dev/guide/templates",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "قوالب Angular هي وسوم HTML قياسية يضاف إليها قدرات خارقة مثل عرض المتغيرات وتكرار العناصر والاستجابة للنقرات.",
        "flow": "قالب HTML نظيف ⟶ معالجة Angular ⟶ واجهة بصرية جذابة",
        "task": "انتقل إلى ملف src/app/app.html في محرر الأكواد.",
        "benefit": "أدركت أن قوالب Angular مبنية على أساس HTML القياسي وسهلة التعلم."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح هيكل الواجهة",
        "explanation": "نستخدم الوسوم الدلالية مثل <main> و <header> و <section> لتنظيم أقسام تطبيق السينما بشكل احترافي ومتوافق مع معايير الويب.",
        "flow": "main (الحاوية) ⟶ header (الترويسة) ⟶ section (محتوى السينما)",
        "task": "تأمل وسم main ذو الكلاس cinema-shell وكيف يحيط بجميع عناصر الواجهة.",
        "benefit": "تعلمت الهيكلة الدلالية السليمة لتطبيقات Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف فقرة ترحيبية للزوار تصف روعة تجربة المشاهدة داخل src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<p class=\"cinema-desc\">أفضل الأفلام العربية والعالمية بأعلى جودة صوت وصورة.</p>",
        "expected": "<p class=\"cinema-desc\">أفضل الأفلام العربية والعالمية بأعلى جودة صوت وصورة.</p>",
        "task": "أضف سطر الفقرة داخل وسم section الترحيبي في src/app/app.html.",
        "benefit": "أضفت عنصر HTML جديد لقالب المكون وظهر في المعاينة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "عدّل جملة الفقرة لتذكر ميزة إضافية مثل 'قاعات مجهزة بأحدث تقنيات IMAX'.",
        "task": "غيّر النص واشهد ظهوره المباشر في شاشة المعاينة.",
        "benefit": "رأيت الربط المباشر بين تعديل ملف القالب وشاشة المتصفح."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "أين نكتب هيكل الواجهة المرئية وعناصر HTML للمكون؟",
        "options": [
          "في ملف القالب مثل app.html",
          "في ملف package.json",
          "في موجه الأوامر Terminal"
        ],
        "correct": 0,
        "benefit": "تأكيد مكان كتابة قوالب الواجهات في Angular.",
        "task": "أين نكتب هيكل الواجهة المرئية وعناصر HTML للمكون؟"
      }
    ]
  },
  {
    "id": "ng-interpolation",
    "phase": "البداية من الصفر",
    "title": "عرض البيانات بالقالب (Interpolation `{{ }}`)",
    "concept": "الأقواس المزدوجة {{ }} تُسمى Interpolation؛ تأخذ قيمة أي متغير في الكلاس وتعرضه مباشرة في القالب كنص ديناميكي يتغير بتغير قيمته.",
    "flow": "متغير title في TS ⟶ {{ title }} ⟶ يظهر كنص داخل الوسم في المتصفح",
    "task": "اعرض الوصف البرمجي داخل القالب باستخدام الأقواس المزدوجة {{ description }}.",
    "file": "src/app/app.html",
    "code": "<p class=\"cinema-tagline\">{{ description }}</p>",
    "expected": "<p class=\"cinema-tagline\">{{ description }}</p>",
    "reference": "https://angular.dev/guide/templates/binding#text-interpolation",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "بدلًا من كتابة النصوص الثابتة يدويًا، نربط الواجهة بالمتغيرات عبر {{ }}. عندما تتغير القيمة في الكلاس، تتغير في الصفحة تلقائيًا دون تدخل منك!",
        "flow": "متغير title في الكلاس ⟶ {{ title }} ⟶ يظهر تلقائيًا في الصفحة",
        "task": "لاحظ كيف يُعرض عنوان التطبيق في app.html عبر {{ title }}.",
        "benefit": "فهمت مفهوم ربط البيانات أحادي الاتجاه من الكود إلى القالب."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح أقواس Interpolation",
        "explanation": "نضع اسم المتغير بين قوسي مجموعة مزدوجين {{ اسم_المتغير }}. يمكن أيضًا إجراء عمليات بسيطة مثل العمليات الحسابية أو جمع النصوص.",
        "flow": "{{ 'أهلًا بكم في ' + title }} ⟶ دمج النصوص ديناميكيًا",
        "task": "تأكد من أن اسم المتغير داخل {{ }} يطابق تمامًا الاسم المعرف في app.ts.",
        "benefit": "تعلمت الصيغة الدقيقة لكتابة Interpolation وقواعدها."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سنعرض الآن وصف السينما الديناميكي الذي أنشأناه سابقًا داخل ملف src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<p class=\"cinema-tagline\">{{ description }}</p>",
        "expected": "<p class=\"cinema-tagline\">{{ description }}</p>",
        "task": "أضف هذا السطر أسفل العنوان داخل src/app/app.html ثم شغّل وافحص.",
        "benefit": "ربطت متغير كلاس TypeScript بالقالب بنجاح وشاهدت النص."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "ارجع إلى app.ts وغيّر قيمة description؛ ستجد أن القالب عرض القيمة الجديدة فورًا دون الحاجة لتعديل ملف HTML!",
        "task": "بدّل قيمة description في app.ts وراقب المعاينة.",
        "benefit": "أدركت القوة الهائلة لمزامنة البيانات التلقائية في Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الصيغة المستخدمة لعرض قيمة متغير من كلاس TypeScript داخل القالب؟",
        "options": [
          "الأقواس المزدوجة {{ متغير }}",
          "الأقواس المربعة [[ متغير ]]",
          "الأقواس المعقوفة <% متغير %>"
        ],
        "correct": 0,
        "benefit": "حفظت علامة Interpolation الأساسية في Angular {{ }}.",
        "task": "ما هي الصيغة المستخدمة لعرض قيمة متغير من كلاس TypeScript داخل القالب؟"
      }
    ]
  },
  {
    "id": "ng-styles",
    "phase": "البداية من الصفر",
    "title": "عزل التنسيق والألوان (Component Styles)",
    "concept": "تنسيقات CSS المكتوبة في app.css معزولة تمامًا داخل المكون (View Encapsulation) ولا تؤثر أبدًا على عناصر خارج هذا المكون.",
    "flow": "تنسيق في app.css ⟶ يُطبَّق على عناصر المكون فقط ⟶ واجهة أنيقة دون تداخل ألوان",
    "task": "نسّق وسم وصف السينما cinema-tagline في src/app/app.css.",
    "file": "src/app/app.css",
    "code": ".cinema-tagline { color: #5a7d65; font-size: 15px; margin: 4px 0 0; }",
    "expected": ".cinema-tagline { color: #5a7d65; font-size: 15px; margin: 4px 0 0; }",
    "reference": "https://angular.dev/guide/components/styling",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في صفحات الويب الكبيرة، مشكلة تداخل ألوان وتنسيقات CSS شائعة جدًا. Angular يحلها جذريًا بعزل تنسيق كل مكون داخل حدوده الخاصة فقط!",
        "flow": "ملف app.css ⟶ عزل تلقائي بواسطة Angular ⟶ استقرار كامل للتصميم",
        "task": "افتح ملف src/app/app.css في شجرة الملفات.",
        "benefit": "فهمت ميزة View Encapsulation وحماية التنسيقات من التداخل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح كلاسات CSS الخاصة بالسينما",
        "explanation": "نستخدم أسماء كلاسات واضحة مثل cinema-tagline ونحدد لها اللون وحجم الخط والمسافات الخارجية margin.",
        "flow": ".cinema-tagline { color: ...; font-size: ...; } ⟶ تنسيق احترافي",
        "task": "لاحظ التنسيقات الموجودة مسبقًا لشعار السينما وخلفية البطاقة.",
        "benefit": "تعلمت كيفية تنسيق عناصر Angular بأسلوب أنيق ومنظم."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف تنسيق وسم cinema-tagline لتجميل الوصف بلون أخضر هادئ وخط مريح للعين.",
        "file": "src/app/app.css",
        "code": ".cinema-tagline { color: #5a7d65; font-size: 15px; margin: 4px 0 0; }",
        "expected": ".cinema-tagline { color: #5a7d65; font-size: 15px; margin: 4px 0 0; }",
        "task": "اكتب كود التنسيق في نهاية ملف src/app/app.css وشغّل وافحص.",
        "benefit": "أضفت تنسيقًا معزولًا للمكون وشاهدت تجميل النص في المعاينة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "غيّر اللون إلى درجة أخرى مثل #2f6b4f أو زد حجم الخط إلى 17px ولاحظ التغيير الفوري.",
        "task": "عدّل خاصية color أو font-size واشهد النتيجة.",
        "benefit": "أصبحت قادرًا على تجميل وضبط مظهر واجهات Angular بكل سهولة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يحدث لتنسيقات CSS المكتوبة في ملف app.css الخاص بالمكون؟",
        "options": [
          "تُطبّق على عناصر هذا المكون فقط ولا تؤثر على باقي الصفحة",
          "تُطبّق على متصفح المستخدم فقط وتختفي عند إعادة التشغيل",
          "تغير لون شريط أدوات نظام التشغيل"
        ],
        "correct": 0,
        "benefit": "ترسيخ مبدأ عزل التنسيق Scoped Styling في Angular.",
        "task": "ماذا يحدث لتنسيقات CSS المكتوبة في ملف app.css الخاص بالمكون؟"
      }
    ]
  },
  {
    "id": "ng-property-binding",
    "phase": "ربط البيانات والتفاعل",
    "title": "ربط الخصائص (Property Binding `[src]`)",
    "concept": "استخدام الأقواس المربعة [property]=\"variable\" لتمرير القيم من كلاس TypeScript إلى خصائص عناصر HTML ديناميكيًا مثل الصور والروابط وحالة التعطيل.",
    "flow": "متغير heroBanner في TS ⟶ [src]=\"heroBanner\" ⟶ يعرض المتصفح الصورة المطلوبة",
    "task": "عرّف رابط صورة بوستر السينما داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly heroBanner: string = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800';",
    "expected": "readonly heroBanner: string = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800';",
    "reference": "https://angular.dev/guide/templates/binding#property-binding",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "بدلًا من كتابة روابط الصور الثابتة في HTML، نربط خاصية src بمتغير من الكلاس. هكذا يمكننا تغيير الصورة بضغطة زر أو جلبها من خادم خارجي!",
        "flow": "متغير في الكود ⟶ [خاصية HTML] ⟶ المتصفح يحدّث الخاصية فورًا",
        "task": "تأمل الفرق بين src=\"fixed.jpg\" و [src]=\"variableName\".",
        "benefit": "فهمت لماذا نستخدم الأقواس المربعة لربط الخصائص الديناميكية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الأقواس المربعة [ ]",
        "explanation": "الأقواس المربعة [ ] تخبر Angular: لا تعامل القيمة الموجودة بين علامات التنصيص كنص عادي، بل نفّذها كمتغير من كلاس TypeScript!",
        "flow": "[disabled]=\"isSoldOut\" ⟶ زر معطل إذا نفدت التذاكر",
        "task": "تأكد من تعريف المتغير heroBanner بنوع string داخل كلاس App.",
        "benefit": "أتقنت التمييز بين الخصائص الثابتة والديناميكية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "عرّف المتغير heroBanner داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "readonly heroBanner: string = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800';",
        "expected": "readonly heroBanner: string = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800';",
        "task": "أضف سطر المتغير داخل كلاس App ثم شغّل وافحص.",
        "benefit": "جهزت مصدر الصورة في كود TypeScript استعدادًا لربطه بالقالب."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك لاحقًا تغيير الرابط لأي صورة بوستر فيلم آخر تريده بكل بساطة.",
        "task": "راجع وجود المتغير بنجاح في كلاس App.",
        "benefit": "أتقنت تعريف خصائص الروابط والصور."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا تعني الأقواس المربعة حول خاصية HTML مثل [src]؟",
        "options": [
          "أن القيمة قادمة من متغير TypeScript ديناميكي",
          "أن الصورة سيتم حذفها من الذاكرة",
          "أن الزر سيتحول إلى لون رمادي"
        ],
        "correct": 0,
        "benefit": "تثبيت دور الأقواس المربعة Property Binding.",
        "task": "ماذا تعني الأقواس المربعة حول خاصية HTML مثل [src]؟"
      }
    ]
  },
  {
    "id": "ng-property-binding-html",
    "phase": "ربط البيانات والتفاعل",
    "title": "تطبيق ربط الصورة في القالب",
    "concept": "نضع [src]=\"heroBanner\" على وسم <img> داخل ملف القالب ليقوم Angular بتحميل البوستر المحدد في الكود وعرضه للزائر.",
    "flow": "وسم img مع [src]=\"heroBanner\" ⟶ تظهر صورة قاعة السينما في المعاينة",
    "task": "أضف وسم الصورة مع ربط [src] في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<img [src]=\"heroBanner\" alt=\"بوستر سينما النجوم\" class=\"cinema-banner\">",
    "expected": "<img [src]=\"heroBanner\" alt=\"بوستر سينما النجوم\" class=\"cinema-banner\">",
    "reference": "https://angular.dev/guide/templates/binding#property-binding",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الآن سنربط خاصية heroBanner التي كتبناها في كلاس App بوسم الصورة في ملف القالب ليراها الزائر في الصفحة.",
        "flow": "كلاس App (heroBanner) ⟶ قراءة القيمة ⟶ وسم <img> يعرض الصورة",
        "task": "انتقل إلى ملف src/app/app.html لإضافة وسم الصورة.",
        "benefit": "رأيت اكتمال حلقة ربط الخاصية بين ملف الكود والقالب."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح وسم الصورة المربوط",
        "explanation": "نكتب [src]=\"heroBanner\" مع كلاس cinema-banner ونص بديل alt لضمان إتاحة الاستخدام والوصول.",
        "flow": "<img [src]=\"...\" alt=\"...\" class=\"...\">",
        "task": "لاحظ عدم استخدام أقواس {{ }} داخل [src] لأن الأقواس المربعة تقوم بالربط المباشر.",
        "benefit": "تعلمت القاعدة الذهبية: عند استخدام [ ] لا نضع {{ }}."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف وسم الصورة المربوط داخل قسم الترحيب في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<img [src]=\"heroBanner\" alt=\"بوستر سينما النجوم\" class=\"cinema-banner\">",
        "expected": "<img [src]=\"heroBanner\" alt=\"بوستر سينما النجوم\" class=\"cinema-banner\">",
        "task": "أضف كود الصورة ثم اضغط (شغّل وافحص) وشاهد ظهور بوستر السينما في المعاينة!",
        "benefit": "شاهدت بوستر السينما يظهر لأول مرة في المعاينة الحية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "لاحظ كيف تملأ الصورة عرض البطاقة وتضفي مظهرًا سينمائيًا فخمًا على التطبيق.",
        "task": "تأمل ظهور الصورة في نافذة المعاينة.",
        "benefit": "أتقنت ربط الصور والوسائط في قوالب Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "هل نضع أقواس Interpolation داخل الأقواس المربعة كـ [src]=\"{{ url }}\"؟",
        "options": [
          "لا، نكتب [src]=\"url\" مباشرة لأن الأقواس المربعة تتولى قراءة المتغير",
          "نعم، يجب الجمع بينهما دائمًا",
          "الأمر لا يهم ويعمل بنفس النتيجة"
        ],
        "correct": 0,
        "benefit": "ترسيخ أفضل ممارسات Angular وتفادي الأخطاء الشائعة.",
        "task": "هل نضع أقواس Interpolation داخل الأقواس المربعة كـ [src]=\"{{ url }}\"؟"
      }
    ]
  },
  {
    "id": "ng-event-binding",
    "phase": "ربط البيانات والتفاعل",
    "title": "الاستماع لنقرات المستخدم (Event Binding `(click)`)",
    "concept": "نستخدم الأقواس الدائرية (event)=\"method()\" للاستماع إلى أفعال وتفاعلات المستخدم مثل النقر على الأزرار أو الكتابة واستدعاء دوال TypeScript.",
    "flow": "نقرة المستخدم (click) ⟶ استدعاء دالة bookTicket() ⟶ تنفيذ الأمر المطلوب",
    "task": "أضف دالة حجز التذكرة bookTicket داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "bookTicket(): void { console.log('تم اختيار تذكرة سينما النجوم!'); }",
    "expected": "bookTicket(): void { console.log('تم اختيار تذكرة سينما النجوم!'); }",
    "reference": "https://angular.dev/guide/templates/binding#event-binding",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "بدون التفاعل، الموقع يكون مجرد صفحة صامتة. Event Binding يسمح لتطبيقك بالاستجابة لكل حركة يقوم بها المستخدم!",
        "flow": "فعل من المستخدم (نقر، تمرير، كتابة) ⟶ إشعار Angular ⟶ تشغيل الدالة",
        "task": "افتح src/app/app.ts لتجهيز الدالة التفاعلية.",
        "benefit": "فهمت مفهوم الاستجابة للأحداث وكيف يتفاعل التطبيق مع الزائر."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح الأقواس الدائرية ( )",
        "explanation": "الأقواس الدائرية ( ) تُمثل التدفق من القالب نحو الكود (Event Output)، بينما الأقواس المربعة [ ] تُمثل التدفق من الكود نحو القالب.",
        "flow": "[ ] من الكود للقالب  |  ( ) من القالب للكود",
        "task": "تذكر هذه القاعدة الرائعة: المربع يعرض، والدائري يستمع ويتفاعل.",
        "benefit": "حفظت القاعدة الذهبية للفروق بين ربط الخصائص وربط الأحداث."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "اكتب دالة bookTicket داخل كلاس App لتسجيل رسالة تأكيد في السجل عند الحجز.",
        "file": "src/app/app.ts",
        "code": "bookTicket(): void { console.log('تم اختيار تذكرة سينما النجوم!'); }",
        "expected": "bookTicket(): void { console.log('تم اختيار تذكرة سينما النجوم!'); }",
        "task": "أضف الدالة داخل كلاس App في src/app/app.ts ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت أول دالة تفاعلية في تطبيقك السينمائي."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك لاحقًا تعديل نص الرسالة أو جعل الدالة تفتح نافذة تنبيه للمستخدم.",
        "task": "تأكد من سلامة تعريف الدالة داخل الكلاس.",
        "benefit": "أصبحت جاهزًا لربط هذه الدالة بزر الحجز في القالب."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الأقواس المستخدمة للاستماع لأحداث المستخدم مثل النقر في Angular؟",
        "options": [
          "الأقواس الدائرية مثل (click)",
          "الأقواس المربعة مثل [click]",
          "الأقواس المعقوفة مثل {click}"
        ],
        "correct": 0,
        "benefit": "تثبيت علامة Event Binding في Angular: الأقواس الدائرية ( ).",
        "task": "ما هي الأقواس المستخدمة للاستماع لأحداث المستخدم مثل النقر في Angular؟"
      }
    ]
  },
  {
    "id": "ng-event-binding-html",
    "phase": "ربط البيانات والتفاعل",
    "title": "ربط زر الحجز بالحدث في القالب",
    "concept": "نضع (click)=\"bookTicket()\" داخل وسم <button> في ملف القالب لنربط نقرة الزر بالدالة التفاعلية مباشرة.",
    "flow": "زر الحجز ⟶ (click)=\"bookTicket()\" ⟶ تشغيل الدالة في الكود فورًا",
    "task": "أضف زر حجز التذكرة داخل src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<button type=\"button\" class=\"btn-book\" (click)=\"bookTicket()\">احجز تذكرتك الآن</button>",
    "expected": "<button type=\"button\" class=\"btn-book\" (click)=\"bookTicket()\">احجز تذكرتك الآن</button>",
    "reference": "https://angular.dev/guide/templates/binding#event-binding",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الآن سنضع زر الحجز في صفحة السينما، ونربطه بدالة bookTicket عبر (click). عندما يضغط الزائر، سيستجيب التطبيق فورًا!",
        "flow": "زر الحجز ⟶ ينقر المستخدم ⟶ Angular يستدعي bookTicket()",
        "task": "انتقل إلى ملف src/app/app.html.",
        "benefit": "شهدت اكتمال التفاعل الحي بين زر القالب ودالة الكلاس."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح ربط الزر",
        "explanation": "نكتب (click)=\"bookTicket()\" مع استدعاء الدالة بالأقواس (). كما نضع كلاس btn-book لتطبيق الألوان الخضراء الجذابة.",
        "flow": "<button (click)=\"دالتنا()\">نص الزر</button>",
        "task": "لاحظ كيف تكتب الدالة بعد علامة المساواة تمامًا كما تستدعيها في الكود.",
        "benefit": "تعلمت الصيغة القياسية لربط الأحداث بالأزرار."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف زر الحجز في نهاية قسم الترحيب داخل src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<button type=\"button\" class=\"btn-book\" (click)=\"bookTicket()\">احجز تذكرتك الآن</button>",
        "expected": "<button type=\"button\" class=\"btn-book\" (click)=\"bookTicket()\">احجز تذكرتك الآن</button>",
        "task": "اكتب سطر الزر ثم اضغط (شغّل وافحص) وشاهد الزر الأخضر يظهر في المعاينة.",
        "benefit": "أضفت زر حجز تفاعلي حقيقي في تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرب النقر على الزر داخل نافذة المعاينة الحية ولاحظ استجابته الفورية.",
        "task": "انقر على زر الحجز في المعاينة.",
        "benefit": "شعرت بمتعة بناء عناصر تفاعلية حية بيدك."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يحدث عند نقر المستخدم على زر يحمل (click)=\"bookTicket()\"؟",
        "options": [
          "يستدعي Angular دالة bookTicket المعرفة داخل كلاس المكون",
          "يتم إغلاق متصفح الإنترنت تلقائيًا",
          "يعود المستخدم إلى صفحة البداية"
        ],
        "correct": 0,
        "benefit": "فهم دور مشغلات الأحداث Event Handlers في Angular.",
        "task": "ماذا يحدث عند نقر المستخدم على زر يحمل (click)=\"bookTicket()\"؟"
      }
    ]
  },
  {
    "id": "ng-template-variables",
    "phase": "ربط البيانات والتفاعل",
    "title": "المتغيرات المرجعية في القالب (`#ref`)",
    "concept": "نضع علامة الشباك # قبل الاسم (مثل #seatRef) لإنشاء متغير مرجعي يشير إلى عنصر HTML مباشرة وقراءة قيمته في القالب دون كتابة كود معقد.",
    "flow": "حقل <input #seatRef> ⟶ قراءة قيمته seatRef.value بسهولة ⟶ تمريرها للدالة",
    "task": "أضف حقل إدخال رقم المقعد مع المتغير المرجعي #seatRef في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<input #seatRef type=\"text\" placeholder=\"رقم المقعد مثل A12\" class=\"seat-field\">",
    "expected": "<input #seatRef type=\"text\" placeholder=\"رقم المقعد مثل A12\" class=\"seat-field\">",
    "reference": "https://angular.dev/guide/templates/variables",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في كثير من الأحيان، نريد فقط قراءة ما كتبه المستخدم في حقل إدخال وتمريره لزر أو دالة. المتغيرات المرجعية # هي أسهل وأسرع طريقة لفعل ذلك في Angular!",
        "flow": "#seatRef ⟶ يشير للحقل ⟶ seatRef.value تحتوي على ما كتبه الزائر",
        "task": "انتقل إلى ملف src/app/app.html لإضافة حقل المقعد المرجعي.",
        "benefit": "تعلمت أسرع وسيلة للوصول لعناصر HTML داخل القالب."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح علامة الشباك #",
        "explanation": "عند كتابة #seatRef، ينشئ Angular مرجعًا لعنصر الإدخال يمكنك استخدامه في أي مكان داخل نفس ملف القالب.",
        "flow": "<input #myInput> ... <button (click)=\"send(myInput.value)\">",
        "task": "لاحظ كيف يغنيك هذا عن كتابة document.getElementById التقليدية والمعقدة!",
        "benefit": "ودّعت الطرق القديمة واعتمدت الأسلوب الحديث والرشيق في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف حقل تحديد المقعد المرجعي بجوار زر الحجز في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<input #seatRef type=\"text\" placeholder=\"رقم المقعد مثل A12\" class=\"seat-field\">",
        "expected": "<input #seatRef type=\"text\" placeholder=\"رقم المقعد مثل A12\" class=\"seat-field\">",
        "task": "أضف سطر حقل الإدخال ثم شغّل وافحص.",
        "benefit": "أضفت حقل إدخال رقم المقعد مع متغير مرجعي جاهز للاستخدام."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "اكتب في حقل المقعد بالمعاينة (مثلاً B7) وشاهد كيف يستجيب الحقل بسلاسة.",
        "task": "جرّب كتابة رقم مقعد في المعاينة الحية.",
        "benefit": "أتقنت إنشاء حقول الإدخال المرجعية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الرمز المستخدم لإنشاء متغير مرجعي لعنصر HTML في قالب Angular؟",
        "options": [
          "علامة الشباك مثل #myInput",
          "علامة الدولار مثل $myInput",
          "علامة النجمة مثل *myInput"
        ],
        "correct": 0,
        "benefit": "حفظ رمز المتغير المرجعي Template Reference Variable (#).",
        "task": "ما الرمز المستخدم لإنشاء متغير مرجعي لعنصر HTML في قالب Angular؟"
      }
    ]
  },
  {
    "id": "ng-signal-create",
    "phase": "الحالة التفاعلية بـ Signals",
    "title": "إنشاء إشارة تفاعلية (`signal()`)",
    "concept": "الـ Signal هي وسيلة Angular الحديثة لإدارة الحالة؛ صندوق ذكي يحتوي على قيمة، وعند تغيرها يحدّث الأماكن التي تعرضها فقط بسرعة فائقة وأداء مذهل.",
    "flow": "استيراد signal ⟶ إنشاء ticketCount = signal(1) ⟶ قراءة القيمة ticketCount() في القالب",
    "task": "أنشئ إشارة تفاعلية لعدد التذاكر تبدأ من 1 داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly ticketCount = signal<number>(1);",
    "expected": "readonly ticketCount = signal<number>(1);",
    "reference": "https://angular.dev/guide/signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الـ Signals تمثل أكبر نقلة نوعية في تاريخ Angular! هي قيم تفاعلية ذكية تعرف بدقة من يقرأها، وعندما تتغير تخبر الواجهة فورًا بتحديث ذلك الجزء الصغير دون فحص بقية التطبيق.",
        "flow": "signal(1) ⟶ تغيرت القيمة ⟶ تحديث ذري وسريع للواجهة المعنية فقط",
        "task": "افتح src/app/app.ts لإنشاء أول إشارة في مشروعك.",
        "benefit": "فهمت سر السرعة الفائقة لـ Signals في Angular الحديث."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة signal()",
        "explanation": "نستورد signal من '@angular/core' ونحدد القيمة الابتدائية بين القوسين signal(1). لقراءة القيمة لاحقًا، نستدعيها كدالة ticketCount().",
        "flow": "const count = signal(1) ⟶ count() تعيد 1",
        "task": "تأكد من وجود signal في عبارة import أعلى ملف app.ts.",
        "benefit": "تعلمت صيغة إنشاء وقراءة الـ Signals."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "عرّف إشارة ticketCount بعدد تذاكر افتراضي 1 داخل كلاس App.",
        "file": "src/app/app.ts",
        "code": "readonly ticketCount = signal<number>(1);",
        "expected": "readonly ticketCount = signal<number>(1);",
        "task": "أضف سطر الإشارة داخل كلاس App في src/app/app.ts ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت أول Signal في تطبيق السينما بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرّب تغيير القيمة الابتدائية من 1 إلى 2 لتبدأ الحجوزات بتذكرتين افتراضيًا.",
        "task": "غيّر القيمة الابتدائية إلى 2 وتأكد من عمل الكود.",
        "benefit": "أتقنت التحكم في الحالة الابتدائية للإشارات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف نقرأ قيمة إشارة تدعى ticketCount داخل الكود أو القالب؟",
        "options": [
          "باستدعائها كدالة عبر الأقواس: ticketCount()",
          "بكتابة ticketCount.value()",
          "بكتابة get(ticketCount)"
        ],
        "correct": 0,
        "benefit": "تثبيت قاعدة قراءة الـ Signal بالأقواس () دائمًا.",
        "task": "كيف نقرأ قيمة إشارة تدعى ticketCount داخل الكود أو القالب؟"
      }
    ]
  },
  {
    "id": "ng-signal-update",
    "phase": "الحالة التفاعلية بـ Signals",
    "title": "تحديث الإشارة بالدوال (`update()` و `set()`)",
    "concept": "لتعديل قيمة Signal نستخدم دالة update() لتغييرها بناءً على القيمة السابقة (مثل زيادة التذاكر +1)، أو set() لوضع قيمة جديدة مباشرة.",
    "flow": "زر الزيادة ⟶ ticketCount.update(c => c + 1) ⟶ تتغير الإشارة والواجهة فوريًا",
    "task": "أضف دالة زيادة التذاكر increaseTickets داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "increaseTickets(): void { this.ticketCount.update((count) => count + 1); }",
    "expected": "increaseTickets(): void { this.ticketCount.update((count) => count + 1); }",
    "reference": "https://angular.dev/guide/signals#updating-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "لا نغير قيمة الـ Signal بمساواة عادية مثل count = 2، بل نستدعي دوالها المدمجة update() أو set() ليعلم Angular بالتغيير ويحدث الواجهة فوريًا.",
        "flow": "update(n => n + 1) ⟶ قراءة القديم ⟶ حساب الجديد ⟶ إشعار الواجهة",
        "task": "افتح ملف src/app/app.ts لكتابة دالة الزيادة.",
        "benefit": "تعلمت الطريقة الصحيحة والآمنة لتحديث الحالة في Angular."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة update()",
        "explanation": "دالة update تأخذ دالة سهمية (count => count + 1). القيمة السابقة تدخل عبر count، والقيمة المرجعة تصبح هي الحالة الجديدة للإشارة.",
        "flow": "count (الحالي) ⟶ count + 1 (الجديد)",
        "task": "تأمل كيف تضمن دالة update عدم ضياع التحديثات المتتالية.",
        "benefit": "أتقنت استخدام الدوال السهمية في تحديث الإشارات."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف دالة increaseTickets داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "increaseTickets(): void { this.ticketCount.update((count) => count + 1); }",
        "expected": "increaseTickets(): void { this.ticketCount.update((count) => count + 1); }",
        "task": "أضف الدالة ثم اضغط (شغّل وافحص).",
        "benefit": "بنيت محرك زيادة التذاكر التفاعلي بـ Signals."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "فكر كيف يمكنك إضافة دالة decreaseTickets لإنقاص التذاكر بشرط ألا تقل عن 1.",
        "task": "تأمل منطق دالة الإنقاص كخطوة إبداعية.",
        "benefit": "فهمت كيفية بناء عدادات تفاعلية كاملة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الدالة المستخدمة لتعديل قيمة Signal بناءً على قيمتها السابقة؟",
        "options": [
          "دالة update()",
          "دالة replace()",
          "دالة push()"
        ],
        "correct": 0,
        "benefit": "حفظ دالة update() الخاصة بتحديث الإشارات.",
        "task": "ما الدالة المستخدمة لتعديل قيمة Signal بناءً على قيمتها السابقة؟"
      }
    ]
  },
  {
    "id": "ng-signal-computed",
    "phase": "الحالة التفاعلية بـ Signals",
    "title": "الحسابات التلقائية الذكية (`computed()`)",
    "concept": "دالة computed() تنشئ إشارة محسوبة تشتق قيمتها تلقائيًا من إشارات أخرى، ويُعاد حسابها فقط وبذكاء عند تغير الإشارات المعتمدة عليها.",
    "flow": "ticketCount() × 85 ⟶ computed() ⟶ يتحدث الإجمالي تلقائيًا دون كتابة أي كود إضافي",
    "task": "أضف إشارة محسوبة لحساب السعر الإجمالي للتذاكر في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly totalPrice = computed(() => this.ticketCount() * 85);",
    "expected": "readonly totalPrice = computed(() => this.ticketCount() * 85);",
    "reference": "https://angular.dev/guide/signals#computed-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "تخيل أن سعر التذكرة 85 ج.م. هل يعقل أن تعيد حساب الإجمالي يدويًا في كل مرة يغير فيها المستخدم عدد التذاكر؟ دالة computed() تقوم بذلك تلقائيًا وبأعلى كفاءة!",
        "flow": "تغير ticketCount ⟶ استشعار تلقائي ⟶ إعادة حساب totalPrice فورًا",
        "task": "افتح src/app/app.ts لإضافة الإشارة المحسوبة.",
        "benefit": "اكتشفت القوة السحرية للبيانات المشتقة Computed Signals."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة computed()",
        "explanation": "نستورد computed من '@angular/core'. نمرر لها دالة تعيد المعادلة الرياضية. Angular يتتبع الإشارات المستخدمة بداخلها تلقائيًا (Memoization).",
        "flow": "computed(() => count() * price) ⟶ إشارة ذكية تقرأ بـ totalPrice()",
        "task": "لاحظ أن computed للقراءة فقط؛ لا يمكن تعديلها بـ set أو update مباشرة.",
        "benefit": "فهمت مبدأ مناعة الإشارات المشتقة ضد الأخطاء غير المقصودة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف إشارة totalPrice داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "readonly totalPrice = computed(() => this.ticketCount() * 85);",
        "expected": "readonly totalPrice = computed(() => this.ticketCount() * 85);",
        "task": "اكتب سطر الإشارة المحسوبة داخل الكلاس ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت حاسبة أسعار آلية فائقة السرعة بـ Signals."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "إذا كان سعر التذكرة 100 ج.م بدل 85، يمكنك تغيير الرقم ببساطة وسيتكفل Angular بالباقي.",
        "task": "راجع وجود totalPrice بنجاح في كلاس App.",
        "benefit": "أتقنت إدارة الحسابات المالية والإحصائية المشتقة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "متى يعيد Angular حساب القيمة داخل computed()؟",
        "options": [
          "تلقائيًا فقط عند تغير إحدى الإشارات المعتمد عليها بالداخل",
          "في كل ثانية وبشكل مستمر",
          "فقط عند إعادة تشغيل الكمبيوتر"
        ],
        "correct": 0,
        "benefit": "فهم آلية التحديث الذكي والكسول لـ Computed Signals.",
        "task": "متى يعيد Angular حساب القيمة داخل computed()؟"
      }
    ]
  },
  {
    "id": "ng-signal-display",
    "phase": "الحالة التفاعلية بـ Signals",
    "title": "عرض الإشارات في واجهة التطبيق",
    "concept": "لقراءة وعرض قيمة أي Signal في القالب، نستدعيها كدالة باستخدام الأقواس مثل {{ ticketCount() }} و {{ totalPrice() }}.",
    "flow": "قالب HTML ⟶ {{ ticketCount() }} و {{ totalPrice() }} ⟶ شاشة أسعار حية متجاوبة",
    "task": "أضف شريط ملخص التذاكر والأسعار داخل src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<div class=\"ticket-summary\"><span>التذاكر: {{ ticketCount() }}</span><span>الإجمالي: {{ totalPrice() }} ج.م</span></div>",
    "expected": "<div class=\"ticket-summary\"><span>التذاكر: {{ ticketCount() }}</span><span>الإجمالي: {{ totalPrice() }} ج.م</span></div>",
    "reference": "https://angular.dev/guide/signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الآن حان وقت رؤية قوة الـ Signals على شاشة السينما! سنعرض عداد التذاكر والسعر الإجمالي مباشرة في الواجهة.",
        "flow": "Signals في TypeScript ⟶ عرض في القالب بالأقواس () ⟶ تحديث حي للمستخدم",
        "task": "انتقل إلى ملف src/app/app.html.",
        "benefit": "ربطت الحالة الحديثة Signals بواجهة المستخدم المرئية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح استدعاء الإشارة في القالب",
        "explanation": "تذكر دائمًا: لأن Signal هي دالة، يجب وضع القوسين () داخل Interpolation، أي {{ ticketCount() }} وليس {{ ticketCount }}.",
        "flow": "{{ ticketCount() }} ⟶ قراءة القيمة اللحظية",
        "task": "تأكد من وجود القوسين () بعد اسم الإشارة.",
        "benefit": "تجنبت الخطأ الأكثر شيوعًا عند المبتدئين في Signals."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف شريط ملخص التذاكر داخل وسم main في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<div class=\"ticket-summary\"><span>التذاكر: {{ ticketCount() }}</span><span>الإجمالي: {{ totalPrice() }} ج.م</span></div>",
        "expected": "<div class=\"ticket-summary\"><span>التذاكر: {{ ticketCount() }}</span><span>الإجمالي: {{ totalPrice() }} ج.م</span></div>",
        "task": "أضف الكود ثم اضغط (شغّل وافحص) وشاهد شريط التذاكر والأسعار يظهر في المعاينة!",
        "benefit": "ظهر ملخص التذاكر والسعر الإجمالي في واجهة السينما بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "لاحظ كيف يعرض شريط التذاكر العدد (1) والإجمالي (85 ج.م) بشكل متناسق وأنيق.",
        "task": "تأمل ظهور ملخص التذاكر في المعاينة الحية.",
        "benefit": "أتقنت عرض الإشارات المشتقة والمباشرة في قوالب Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف نكتب إشارة count داخل قالب HTML في Angular؟",
        "options": [
          "{{ count() }} مع وضع القوسين",
          "{{ count }} بدون أقواس",
          "[[ count ]]"
        ],
        "correct": 0,
        "benefit": "إتقان استدعاء الإشارات في قوالب HTML.",
        "task": "كيف نكتب إشارة count داخل قالب HTML في Angular؟"
      }
    ]
  },
  {
    "id": "ng-control-if",
    "phase": "التحكم بالقوالب الحديثة",
    "title": "الشروط الذكية الحديثة (`@if` / `@else`)",
    "concept": "بنية التحكم @if في Angular 17+ تسمح بإظهار العناصر أو إخفائها بشرط محدد بأسلوب نظيف وبديهي دون الحاجة لوحدات قديمة.",
    "flow": "@if (totalPrice() >= 200) ⟶ إظهار شارة (خصم المجموعات مفعّل! 🎉)",
    "task": "أضف شرط إظهار شارة الخصم في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "@if (totalPrice() >= 200) { <span class=\"badge discount\">خصم المجموعات مفعّل! 🎉</span> }",
    "expected": "@if (totalPrice() >= 200) { <span class=\"badge discount\">خصم المجموعات مفعّل! 🎉</span> }",
    "reference": "https://angular.dev/guide/templates/control-flow#if-blocks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في Angular الحديث، أصبحت كتابة الشروط في القوالب ممتعة للغاية باستخدام @if كما نكتبها في البرمجة تمامًا، بدلاً من التوجيهات القديمة المعقدة.",
        "flow": "@if (الشرط) { المحتوى المعروض إذا تحقق الشرط }",
        "task": "انتقل إلى src/app/app.html لإضافة شرط شارة الخصم.",
        "benefit": "تعلمت أحدث صيغة للشروط في Angular Control Flow."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صيغة @if الحديثة",
        "explanation": "تبدأ بعلامة @ متبوعة بـ if والشرط بين قوسين ()، ثم نضع المحتوى داخل قوسي المجموعة {}.",
        "flow": "@if (totalPrice() >= 200) { ... }",
        "task": "لاحظ سهولة قراءة الكود ونظافته مقارنة بالأنظمة السابقة.",
        "benefit": "أتقنت كتابة الشروط الحديثة في قوالب Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف شرط فحص الخصم داخل قسم التذاكر في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "@if (totalPrice() >= 200) { <span class=\"badge discount\">خصم المجموعات مفعّل! 🎉</span> }",
        "expected": "@if (totalPrice() >= 200) { <span class=\"badge discount\">خصم المجموعات مفعّل! 🎉</span> }",
        "task": "أضف كود الشرط ثم اضغط (شغّل وافحص).",
        "benefit": "أضفت أول شرط ذكي في قالب تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "إذا كانت التذاكر أقل من 200 ج.م لن تظهر الشارة، ولكن بمجرد بلوغ 200 ستظهر تلقائيًا!",
        "task": "تأكد من شرط الخصم في الكود.",
        "benefit": "فهمت العرض المشروط الفوري في الواجهات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الصيغة الحديثة لكتابة الشروط في قوالب Angular الحديثة؟",
        "options": [
          "@if (condition) { }",
          "*ngIf=\"condition\"",
          "<condition if=\"...\">"
        ],
        "correct": 0,
        "benefit": "اعتماد ميزة Control Flow الحديثة في Angular 17+.",
        "task": "ما هي الصيغة الحديثة لكتابة الشروط في قوالب Angular الحديثة؟"
      }
    ]
  },
  {
    "id": "ng-control-else",
    "phase": "التحكم بالقوالب الحديثة",
    "title": "البديل الشرطي (`@else`)",
    "concept": "مع @if نستخدم @else لعرض محتوى بديل أنيق عندما لا يتحقق الشرط، مثل إعلام الزائر بسعر التذكرة العادي.",
    "flow": "@if شرط الخصم ⟶ شارة الخصم ⟶ @else السعر العادي",
    "task": "أضف كتلة @else لعرض إشعار السعر العادي في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "@else { <span class=\"badge normal\">سعر التذكرة العادي 85 ج.م</span> }",
    "expected": "@else { <span class=\"badge normal\">سعر التذكرة العادي 85 ج.م</span> }",
    "reference": "https://angular.dev/guide/templates/control-flow#if-blocks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "كتلة @else تضمن أن واجهتك لا تترك مساحات فارغة؛ عندما لا يتحقق الشرط الأول، يظهر البديل فورًا وبلباقة للزائر.",
        "flow": "الشرط غير متحقق ⟶ تشغيل @else ⟶ ظهور المحتوى البديل",
        "task": "افتح src/app/app.html لإضافة كتلة @else بجوار @if.",
        "benefit": "تعلمت تقديم تجربة مستخدم كاملة في جميع الحالات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح ربط @if مع @else",
        "explanation": "تأتي كتلة @else مباشرة بعد القوس المغلق لكتلة @if دون فواصل، تمامًا كما في JavaScript.",
        "flow": "@if (...) { ... } @else { ... }",
        "task": "لاحظ الترتيب والتناسق بين الكتلتين.",
        "benefit": "أتقنت صياغة الشروط المكتملة في القالب."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف كتلة @else بعد شرط الخصم في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "@else { <span class=\"badge normal\">سعر التذكرة العادي 85 ج.م</span> }",
        "expected": "@else { <span class=\"badge normal\">سعر التذكرة العادي 85 ج.م</span> }",
        "task": "اكتب كتلة @else ثم اضغط (شغّل وافحص) وشاهد شارة السعر العادي تظهر.",
        "benefit": "شاهدت شارة السعر العادي تظهر لأن التذاكر لم تبلغ الخصم بعد."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "لاحظ كيف يتناوب ظهور الشارتين تلقائيًا بناءً على حالة الشرط في كودك.",
        "task": "تأمل عمل @else في المعاينة الحية.",
        "benefit": "أتقنت الشروط المتناوبة في Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "متى يتم عرض المحتوى الموجود داخل كتلة @else؟",
        "options": [
          "عندما يكون شرط كتلة @if السابقة غير متحقق (false)",
          "عندما يضغط المستخدم زر الفأرة الأيمن",
          "عند إغلاق الموقع"
        ],
        "correct": 0,
        "benefit": "فهم دور الكتلة البديلة @else.",
        "task": "متى يتم عرض المحتوى الموجود داخل كتلة @else؟"
      }
    ]
  },
  {
    "id": "ng-control-for",
    "phase": "التحكم بالقوالب الحديثة",
    "title": "تكرار القوائم الحديث (`@for` و `track`)",
    "concept": "بنية @for تكرر مصفوفة عناصر في الواجهة بكفاءة خارقة، مع إلزام استخدام track لتحديد المعرف الفريد لكل عنصر لضمان أقصى سرعة.",
    "flow": "مصفوفة أفلام [m1, m2] ⟶ @for (movie of movies; track movie.id) ⟶ بطاقات أفلام منظمة",
    "task": "عرّف مصفوفة أفلام سينما النجوم داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly movies = [{ id: 1, title: 'رحلة النجوم', time: '18:00' }, { id: 2, title: 'واحة الأمل', time: '21:00' }];",
    "expected": "readonly movies = [{ id: 1, title: 'رحلة النجوم', time: '18:00' }, { id: 2, title: 'واحة الأمل', time: '21:00' }];",
    "reference": "https://angular.dev/guide/templates/control-flow#for-blocks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "أي تطبيق حقيقي يحتوي على قوائم: قائمة أفلام، قائمة مواعيد، قائمة مقاعد. بنية @for هي محرك التكرار فائق القوة في Angular الحديث.",
        "flow": "مصفوفة بيانات ⟶ @for ⟶ عناصر HTML مكررة ومنظمة في الواجهة",
        "task": "افتح src/app/app.ts لتعريف مصفوفة الأفلام.",
        "benefit": "فهمت كيفية تمثيل وتكرار القوائم في تطبيقات الويب."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح كلمة track الإلزامية",
        "explanation": "في Angular 17+، كلمة track أصبحت إجبارية! تخبر Angular كيف يميز كل عنصر (عبر معرف id فريد)، ليقوم بتحديث العنصر المعدل فقط دون إعادة رسم القائمة بأكملها.",
        "flow": "track movie.id ⟶ أداء خرافي وتوفير هائل في استهلاك الذاكرة",
        "task": "تأكد من احتواء كل عنصر في المصفوفة على خاصية فريدة مثل id.",
        "benefit": "تعلمت سر الأداء القياسي لحلقات التكرار في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف مصفوفة movies إلى كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "readonly movies = [{ id: 1, title: 'رحلة النجوم', time: '18:00' }, { id: 2, title: 'واحة الأمل', time: '21:00' }];",
        "expected": "readonly movies = [{ id: 1, title: 'رحلة النجوم', time: '18:00' }, { id: 2, title: 'واحة الأمل', time: '21:00' }];",
        "task": "أضف مصفوفة الأفلام داخل كلاس App ثم شغّل وافحص.",
        "benefit": "جهزت مصفوفة بيانات الأفلام استعدادًا لعرضها في القالب."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك إضافة فيلم ثالث في المصفوفة مثل { id: 3, title: 'أبطال الفضاء', time: '23:30' }.",
        "task": "تأكد من وجود عنصري الفيلم في المصفوفة.",
        "benefit": "أتقنت إدارة مصفوفات الكائنات في TypeScript."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "لماذا يُلزمنا Angular باستخدام track داخل كتلة @for؟",
        "options": [
          "لتمييز العناصر بمعرف فريد وتحديث ما تغير فقط بأعلى سرعة",
          "لتغيير لون خلفية الصفحة",
          "لحذف العناصر القديمة من القرص الصلب"
        ],
        "correct": 0,
        "benefit": "ترسيخ أهمية track في أداء حلقات تكرار Angular.",
        "task": "لماذا يُلزمنا Angular باستخدام track داخل كتلة @for؟"
      }
    ]
  },
  {
    "id": "ng-control-for-html",
    "phase": "التحكم بالقوالب الحديثة",
    "title": "عرض بطاقات الأفلام في القالب بـ `@for`",
    "concept": "نكتب حلقة @for داخل ملف القالب لإنشاء بطاقة عرض لكل فيلم في المصفوفة مع إظهار العنوان وموعد العرض تلقائيًا.",
    "flow": "@for (movie of movies; track movie.id) ⟶ رسم بطاقة لكل فيلم في المعاينة",
    "task": "أضف حلقة التكرار @for داخل src/app/app.html.",
    "file": "src/app/app.html",
    "code": "@for (movie of movies; track movie.id) { <div class=\"movie-pill\"><b>{{ movie.title }}</b> <small>{{ movie.time }}</small></div> }",
    "expected": "@for (movie of movies; track movie.id) { <div class=\"movie-pill\"><b>{{ movie.title }}</b> <small>{{ movie.time }}</small></div> }",
    "reference": "https://angular.dev/guide/templates/control-flow#for-blocks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الآن سنربط مصفوفة الأفلام بالقالب عبر @for. سيقوم Angular بالمرور على كل فيلم وإنشاء بطاقة مخصصة له تعرض اسمه وتوقيته بدقة.",
        "flow": "مصفوفة movies ⟶ المرور عبر @for ⟶ ظهور بطاقات الأفلام في الواجهة",
        "task": "انتقل إلى ملف src/app/app.html.",
        "benefit": "شاهدت كيف يحول Angular مصفوفات البيانات إلى واجهات بصرية."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صيغة @for في القالب",
        "explanation": "نكتب @for (عنصر of مصفوفة; track معرف) متبوعة بالأقواس {} وبداخلها الوسوم التي نريد تكرارها لكل عنصر.",
        "flow": "@for (item of list; track item.id) { <div>{{ item.name }}</div> }",
        "task": "لاحظ كيف نقرأ خصائص كل فيلم مثل movie.title و movie.time داخل القوسين {{ }}.",
        "benefit": "أتقنت صياغة قوالب التكرار في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف حلقة عرض الأفلام داخل قسم عروض السينما في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "@for (movie of movies; track movie.id) { <div class=\"movie-pill\"><b>{{ movie.title }}</b> <small>{{ movie.time }}</small></div> }",
        "expected": "@for (movie of movies; track movie.id) { <div class=\"movie-pill\"><b>{{ movie.title }}</b> <small>{{ movie.time }}</small></div> }",
        "task": "اكتب كود @for ثم اضغط (شغّل وافحص) وشاهد بطاقات الأفلام تظهر فورًا في المعاينة!",
        "benefit": "ظهرت بطاقات أفلام السينما لأول مرة في المعاينة الحية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "ارجع إلى app.ts وأضف فيلمًا جديدًا للمصفوفة؛ ستجد أن بطاقة جديدة ظهرت فورًا في المعاينة دون تعديل ملف HTML!",
        "task": "تأمل قدرة Angular على تكرار الواجهات ديناميكيًا.",
        "benefit": "أدركت السهولة الفائقة لبناء قوائم وشبكات ديناميكية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف نشير إلى العنصر الفردي داخل حلقة @for (movie of movies; track movie.id)؟",
        "options": [
          "عبر الاسم movie الذي حددناه قبل كلمة of",
          "عبر كلمة element الثابتة دائمًا",
          "عبر كتابة رقم الفهرس index"
        ],
        "correct": 0,
        "benefit": "فهم آلية تسمية العناصر في حلقات @for.",
        "task": "كيف نشير إلى العنصر الفردي داخل حلقة @for (movie of movies; track movie.id)؟"
      }
    ]
  },
  {
    "id": "ng-control-empty",
    "phase": "التحكم بالقوالب الحديثة",
    "title": "معالجة القوائم الفارغة (`@empty`)",
    "concept": "توفر صيغة @empty ملحقًا تلقائيًا لكتلة @for يظهر فقط عندما تكون مصفوفة العناصر خالية، دون الحاجة لكتابة شروط @if إضافية.",
    "flow": "مصفوفة فارغة [] ⟶ تشغيل @empty تلقائيًا ⟶ رسالة: لا توجد أفلام حاليًا",
    "task": "أضف كتلة @empty داخل حلقة الأفلام في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "@empty { <p class=\"empty-notice\">لا توجد عروض أفلام متاحة في هذا الموعد.</p> }",
    "expected": "@empty { <p class=\"empty-notice\">لا توجد عروض أفلام متاحة في هذا الموعد.</p> }",
    "reference": "https://angular.dev/guide/templates/control-flow#empty-blocks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "ماذا لو لم تكن هناك أفلام معروضة في يوم معين؟ بدل أن تظل الصفحة فارغة ومحيرة للزائر، كتلة @empty تعرض رسالة توضيحية فورًا وبشكل تلقائي!",
        "flow": "مصفوفة بها عناصر ⟶ تكرار البطاقات  |  مصفوفة فارغة ⟶ ظهور @empty",
        "task": "انتقل إلى ملف src/app/app.html لإضافة كتلة @empty.",
        "benefit": "تعلمت بناء واجهات مرنة تتعامل مع البيانات الفارغة بلباقة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح ملحق @empty",
        "explanation": "يوضع @empty مباشرة بعد القوس المغلق لكتلة @for. يكتشف Angular تلقائيًا طول المصفوفة ويعرض @empty إذا كان الطول صفرًا.",
        "flow": "@for (...) { ... } @empty { رسالة التنبيه }",
        "task": "لاحظ كيف وفرت عليك هذه الميزة كتابة شروط إضافية معقدة.",
        "benefit": "أتقنت ميزة @empty الحصرية في Angular الحديث."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف كتلة @empty بعد كتلة @for في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "@empty { <p class=\"empty-notice\">لا توجد عروض أفلام متاحة في هذا الموعد.</p> }",
        "expected": "@empty { <p class=\"empty-notice\">لا توجد عروض أفلام متاحة في هذا الموعد.</p> }",
        "task": "أضف سطر @empty ثم اضغط (شغّل وافحص).",
        "benefit": "حصنت قائمة الأفلام للتعامل مع حالات عدم توفر البيانات."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "إذا مسحت مؤقتًا عناصر المصفوفة في app.ts وجعلتها []، ستشاهد رسالة @empty تظهر فورًا!",
        "task": "تأمل الذكاء التلقائي لملحق @empty.",
        "benefit": "أصبحت مطور Angular محترفًا يراعي كل حالات واجهة المستخدم."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "متى يتم عرض محتوى كتلة @empty الملحقة بـ @for؟",
        "options": [
          "فقط عندما تكون مصفوفة البيانات فارغة لا تحتوي على أي عناصر",
          "في كل مرة يفتح فيها الزائر الصفحة",
          "فقط عند حدوث خطأ في الاتصال"
        ],
        "correct": 0,
        "benefit": "تثبيت وظيفة كتلة @empty.",
        "task": "متى يتم عرض محتوى كتلة @empty الملحقة بـ @for؟"
      }
    ]
  },
  {
    "id": "ng-two-way-binding",
    "phase": "النماذج وإدخال البيانات",
    "title": "الربط ثنائي الاتجاه بالنماذج (`[(ngModel)]`)",
    "concept": "نستخدم صيغة الموزة في الصندوق [(ngModel)] لمزامنة مدخلات المستخدم في حقل النص مع متغير كلاس TypeScript بالاتجاهين فورًا وبلا تأخير.",
    "flow": "المستخدم يكتب اسمه ⟵⟶ يتحدث customerName في الكلاس وفي المعاينة لحظيًا",
    "task": "عرّف متغير اسم العميل customerName داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "customerName: string = 'ضيف السينما';",
    "expected": "customerName: string = 'ضيف السينما';",
    "reference": "https://angular.dev/guide/forms/template-driven-forms",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الربط ثنائي الاتجاه (Two-Way Binding) يعني: إذا كتب المستخدم في الحقل يتغير المتغير في الكود، وإذا غيرت المتغير في الكود يتغير الحقل في الصفحة تلقائيًا!",
        "flow": "حقل الواجهة ⟵(مزامنة متبادلة فنائية الاتجاه)⟶ كلاس TypeScript",
        "task": "افتح src/app/app.ts لتعريف متغير اسم العميل.",
        "benefit": "فهمت مفهوم المزامنة ثنائية الاتجاه في نماذج Angular."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح صيغة الموزة في الصندوق [()]",
        "explanation": "نجمع بين الأقواس المربعة [ ] (ربط الخاصية) والأقواس الدائرية ( ) (ربط الحدث) لتكوين [()] وكأنها موزة داخل صندوق! المربع يدخل القيمة والدائري يخرج التغيير.",
        "flow": "[()] = [ الخاصية ] + ( الحدث )",
        "task": "تذكر هذه التسمية الشهيرة عالميًا: Banana in a Box.",
        "benefit": "حفظت صيغة الربط ثنائي الاتجاه وأصل تسميتها."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "عرّف متغير customerName في كلاس App داخل src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "customerName: string = 'ضيف السينما';",
        "expected": "customerName: string = 'ضيف السينما';",
        "task": "أضف سطر المتغير داخل كلاس App ثم اضغط (شغّل وافحص).",
        "benefit": "جهزت متغير بيانات العميل لاستقبال مدخلات النموذج."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك لاحقًا ربط هذا الاسم بالتذكرة المطبوعة وكتابة اسم صاحب الحجز.",
        "task": "تأكد من وجود متغير customerName في الكلاس.",
        "benefit": "أتقنت تجهيز متغيرات النماذج."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو اللقب الشهير لصيغة الأقواس [()] في الربط ثنائي الاتجاه بـ Angular؟",
        "options": [
          "الموزة في الصندوق (Banana in a Box)",
          "التفاحة في السلة",
          "القمر بين النجوم"
        ],
        "correct": 0,
        "benefit": "ترسيخ شكل الأقواس [()] للربط ثنائي الاتجاه.",
        "task": "ما هو اللقب الشهير لصيغة الأقواس [()] في الربط ثنائي الاتجاه بـ Angular؟"
      }
    ]
  },
  {
    "id": "ng-two-way-binding-html",
    "phase": "النماذج وإدخال البيانات",
    "title": "ربط حقل اسم العميل بالقالب",
    "concept": "نضع [(ngModel)]=\"customerName\" داخل حقل الإدخال ليتم التحديث الحي والمتبادل مع إظهار الاسم في بطاقة التذكرة.",
    "flow": "حقل input مع [(ngModel)] ⟶ تظهر جملة (حجز باسم: {{ customerName }})",
    "task": "أضف حقل إدخال اسم العميل في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<input [(ngModel)]=\"customerName\" placeholder=\"أدخل اسمك للحجز\" class=\"customer-input\">",
    "expected": "<input [(ngModel)]=\"customerName\" placeholder=\"أدخل اسمك للحجز\" class=\"customer-input\">",
    "reference": "https://angular.dev/guide/forms/template-driven-forms",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الآن سنضع حقل إدخال الاسم في الواجهة ونربطه بمتغير customerName. بمجرد أن يكتب الزائر حرفًا واحدًا، سيظهر فورًا في تذكرة السينما!",
        "flow": "كتابة في الحقل ⟶ [(ngModel)] ⟶ تحديث customerName ⟶ عرض فوري في التذكرة",
        "task": "انتقل إلى ملف src/app/app.html.",
        "benefit": "شاهدت قوة الربط ثنائي الاتجاه الحقيقي في نموذج السينما."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح توجيه [(ngModel)]",
        "explanation": "توجيه ngModel يأتي من حزمة FormsModule. يقوم تلقائيًا بالاستماع لأحداث الكتابة input وتحديث المتغير، كما يضع القيمة الحالية داخل الحقل.",
        "flow": "<input [(ngModel)]=\"variableName\" ...>",
        "task": "لاحظ التنسيق الأنيق المطبق على كلاس customer-input.",
        "benefit": "تعلمت كيفية دمج حقول النماذج باحترافية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف حقل إدخال اسم العميل داخل قسم الحجز في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<input [(ngModel)]=\"customerName\" placeholder=\"أدخل اسمك للحجز\" class=\"customer-input\">",
        "expected": "<input [(ngModel)]=\"customerName\" placeholder=\"أدخل اسمك للحجز\" class=\"customer-input\">",
        "task": "أضف سطر الحقل ثم اضغط (شغّل وافحص) واكتب اسمك في الحقل بالمعاينة!",
        "benefit": "أضفت حقل نموذج تفاعلي حي بمزامنة ثنائية الاتجاه."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "اكتب اسمك الشخصي داخل الحقل في شاشة المعاينة الحية واستمتع بالتحديث الفوري.",
        "task": "اكتب اسمك في الحقل بالمعاينة.",
        "benefit": "اختبرت المزامنة اللحظية بين المستخدم والكود."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يحدث عند كتابة نص جديد داخل حقل يحمل [(ngModel)]=\"customerName\"؟",
        "options": [
          "تتغير قيمة متغير customerName في كلاس TypeScript فورًا مع كل حرف",
          "يطلب الموقع كلمة مرور المدير",
          "يتم حفظ النص في ملف نصي على سطح المكتب"
        ],
        "correct": 0,
        "benefit": "فهم المزامنة اللحظية لـ ngModel.",
        "task": "ماذا يحدث عند كتابة نص جديد داخل حقل يحمل [(ngModel)]=\"customerName\"؟"
      }
    ]
  },
  {
    "id": "ng-form-validation",
    "phase": "النماذج وإدخال البيانات",
    "title": "التحقق من صحة المدخلات في النموذج",
    "concept": "استخدام خاصية التعطيل [disabled] للتحقق من أن العميل كتب اسمه قبل السماح له بالنقر على زر تأكيد حجز السينما.",
    "flow": "اسم فارغ ⟶ زر الحجز معطل [disabled] ⟶ كتابة الاسم ⟶ تفعيل الزر فورًا",
    "task": "أضف زر تأكيد الحجز المشروط بعدم فراغ الاسم في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<button type=\"button\" class=\"btn-confirm\" [disabled]=\"!customerName.trim()\">تأكيد الحجز</button>",
    "expected": "<button type=\"button\" class=\"btn-confirm\" [disabled]=\"!customerName.trim()\">تأكيد الحجز</button>",
    "reference": "https://angular.dev/guide/forms/form-validation",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في التطبيقات الحقيقية، لا نريد السماح للمستخدم بإرسال بيانات ناقصة أو فارغة. التحقق من المدخلات (Validation) يضمن دقة وسلامة البيانات قبل إتمام الحجز.",
        "flow": "فحص الاسم ⟶ إذا كان فارغًا: الزر معطل  |  إذا كُتب الاسم: الزر مفعل",
        "task": "انتقل إلى ملف src/app/app.html.",
        "benefit": "تعلمت مبادئ التحقق من صحة بيانات النماذج (Validation)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح خاصية التعطيل [disabled]",
        "explanation": "نربط خاصية [disabled] بشرط منطقي !customerName.trim(). إذا كان النص فارغًا أو يحتوي فقط على مسافات، تصبح القيمة true ويتعطل الزر تلقائيًا.",
        "flow": "[disabled]=\"!customerName.trim()\" ⟶ حماية فورية من الحجز الوهمي",
        "task": "لاحظ كيف يتكامل ربط الخصائص [ ] مع التحقق من صحة المدخلات.",
        "benefit": "أتقنت ربط شروط التحقق بحالة عناصر الواجهة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف زر تأكيد الحجز المشروط في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<button type=\"button\" class=\"btn-confirm\" [disabled]=\"!customerName.trim()\">تأكيد الحجز</button>",
        "expected": "<button type=\"button\" class=\"btn-confirm\" [disabled]=\"!customerName.trim()\">تأكيد الحجز</button>",
        "task": "أضف سطر الزر ثم اضغط (شغّل وافحص).",
        "benefit": "بنيت زر تأكيد ذكي يحمي النموذج من المدخلات الفارغة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "امسح الاسم من الحقل في المعاينة وراقب كيف يصبح الزر رماديًا ومعطلاً فورًا!",
        "task": "جرّب مسح الاسم وإعادة كتابته في المعاينة الحية.",
        "benefit": "شاهدت الاستجابة الفورية لقواعد التحقق من البيانات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف نمنع المستخدم من الضغط على زر في حال كانت البيانات غير مكتملة؟",
        "options": [
          "بربط خاصية [disabled] بشرط التحقق من اكتمال البيانات",
          "بإخفاء شاشة الكمبيوتر",
          "بإلغاء تثبيت المتصفح"
        ],
        "correct": 0,
        "benefit": "تثبيت استخدام [disabled] في نماذج Angular.",
        "task": "كيف نمنع المستخدم من الضغط على زر في حال كانت البيانات غير مكتملة؟"
      }
    ]
  },
  {
    "id": "ng-form-feedback",
    "phase": "النماذج وإدخال البيانات",
    "title": "رسائل التوجيه والتنبيه للمستخدم",
    "concept": "إظهار رسالة تنبيه شرطية بـ @if عندما يحاول المستخدم ترك الاسم فارغًا لتوفير تجربة مريحة وسهلة توضح له المطلوب بدقة.",
    "flow": "@if (!customerName.trim()) ⟶ ظهور تنبيه: يُرجى كتابة اسمك لإصدار التذكرة",
    "task": "أضف رسالة التنبيه الشرطية في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "@if (!customerName.trim()) { <small class=\"field-error\">يُرجى كتابة اسمك لإصدار التذكرة باسمك.</small> }",
    "expected": "@if (!customerName.trim()) { <small class=\"field-error\">يُرجى كتابة اسمك لإصدار التذكرة باسمك.</small> }",
    "reference": "https://angular.dev/guide/forms/form-validation",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "تعطيل الزر وحده ليس كافيًا؛ المستخدم يحتاج لمعرفة *لماذا* الزر معطل. رسائل التوجيه الفورية تصنع الفارق بين التطبيق العادي والتطبيق الاحترافي.",
        "flow": "حقل فارغ ⟶ رسالة توجيهية حمراء واضحة ⟶ كتابة الاسم ⟶ اختفاء الرسالة",
        "task": "انتقل إلى ملف src/app/app.html لإضافة رسالة التنبيه.",
        "benefit": "فهمت أهمية التغذية الراجعة الفورية (User Feedback) في تجربة المستخدم."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح رسالة الخطأ الشرطية",
        "explanation": "نستخدم كتلة @if لفحص الفراغ، ونضع كلاس field-error لتلوين النص باللون الأحمر الخفيف والخط الصغير.",
        "flow": "@if (!customerName.trim()) { <small class=\"field-error\">...</small> }",
        "task": "لاحظ التنسيق الأنيق لرسائل الخطأ.",
        "benefit": "أتقنت تنسيق وعرض رسائل الخطأ الذكية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف رسالة التنبيه أسفل حقل الاسم في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "@if (!customerName.trim()) { <small class=\"field-error\">يُرجى كتابة اسمك لإصدار التذكرة باسمك.</small> }",
        "expected": "@if (!customerName.trim()) { <small class=\"field-error\">يُرجى كتابة اسمك لإصدار التذكرة باسمك.</small> }",
        "task": "أضف كود التنبيه ثم اضغط (شغّل وافحص).",
        "benefit": "أضفت رسالة توجيه احترافية تختفي وتظهر تلقائيًا."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "امسح الاسم في المعاينة وراقب ظهور الرسالة الحمراء، ثم اكتب حرفًا واحداً وراقب اختفاءها الفوري!",
        "task": "جرّب مسح وكتابة الاسم في المعاينة الحية.",
        "benefit": "شاهدت روعة التفاعل الفوري في واجهة السينما."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "لماذا نضيف رسائل توجيه شرطية بجوار حقول النماذج؟",
        "options": [
          "لتوضيح سبب عدم تفعيل زر التأكيد ومساعدة المستخدم على إكمال الحجز",
          "لزيادة حجم ملفات المشروع فقط",
          "لإيقاف عمل خادم التطبيق"
        ],
        "correct": 0,
        "benefit": "ترسيخ مبادئ تجربة المستخدم UX في نماذج الويب.",
        "task": "لماذا نضيف رسائل توجيه شرطية بجوار حقول النماذج؟"
      }
    ]
  },
  {
    "id": "ng-component-create",
    "phase": "تقسيم المكونات",
    "title": "إنشاء مكوّن فرعي لبطاقة الفيلم",
    "concept": "في Angular نقسم الواجهة الكبيرة إلى مكوّنات صغيرة مستقلة لسهولة صيانتها وإعادة استخدامها في أماكن متعددة.",
    "flow": "المكون الرئيسي (App) ⟶ يحتوي على مكوّن بطاقة الفيلم (MovieCard)",
    "task": "أنشئ كلاس مكوّن بطاقة الفيلم MovieCard في src/app/movie-card.ts.",
    "file": "src/app/movie-card.ts",
    "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card',\n  standalone: true,\n  template: '<div class=\"movie-box\"><h3>{{ title() }}</h3></div>'\n})\nexport class MovieCard {\n  readonly title = input<string>('فيلم سينمائي');\n}",
    "expected": "export class MovieCard",
    "reference": "https://angular.dev/guide/components",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "تخيل لو كان كود تطبيق فيسبوك أو يوتيوب بأكمله في ملف واحد! سيكون مستحيلاً تعديله. تقسيم التطبيق إلى مكونات مستقلة هو السر وراء بناء مشاريع ضخمة قابلة للتوسع.",
        "flow": "تطبيق كبير ⟶ تفكيك إلى مكونات صغيرة (Header, MovieCard, SeatPicker, Footer)",
        "task": "انتقل إلى ملف src/app/movie-card.ts في شجرة الملفات.",
        "benefit": "فهمت فلسفة العمارة القائمة على المكونات (Component Architecture)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح مكوّن MovieCard الفرعي",
        "explanation": "المكون له selector خاص به 'app-movie-card' وقالب مضمن template وكلاس يحمل بيانات الفيلم المستقلة.",
        "flow": "selector: 'app-movie-card' ⟶ استدعاء المكون في أي مكان بـ <app-movie-card>",
        "task": "لاحظ كيف يكون لكل مكوّن استقلالية تامة في منطقه وشكله.",
        "benefit": "تعلمت كيفية إنشاء مكونات فرعية نظيفة ومستقلة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "اكتب تعريف مكوّن MovieCard داخل ملف src/app/movie-card.ts.",
        "file": "src/app/movie-card.ts",
        "code": "import { Component, input } from '@angular/core';\n\n@Component({\n  selector: 'app-movie-card',\n  standalone: true,\n  template: '<div class=\"movie-box\"><h3>{{ title() }}</h3></div>'\n})\nexport class MovieCard {\n  readonly title = input<string>('فيلم سينمائي');\n}",
        "expected": "export class MovieCard",
        "task": "اكتب كود المكون ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت أول مكوّن فرعي قابل لإعادة الاستخدام في مشروعك."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكن استخدام هذا المكون عشرات المرات في الصفحة لعرض بطاقة لكل فيلم دون تكرار أي كود HTML!",
        "task": "تأكد من إنشاء وحفظ ملف movie-card.ts بنجاح.",
        "benefit": "أتقنت إنشاء المكونات المستقلة في Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة الأساسية من تقسيم شاشات التطبيق إلى مكونات فرعية في Angular؟",
        "options": [
          "إعادة استخدام الكود بسهولة وتنظيم المشروع وتبسيط صيانته",
          "لجعل حجم خط النصوص أكبر دائمًا",
          "لإلغاء الحاجة إلى لغة CSS"
        ],
        "correct": 0,
        "benefit": "فهم قيمة العمارة البرمجية للمكونات Component-Based Architecture.",
        "task": "ما الفائدة الأساسية من تقسيم شاشات التطبيق إلى مكونات فرعية في Angular؟"
      }
    ]
  },
  {
    "id": "ng-component-input",
    "phase": "تقسيم المكونات",
    "title": "تمرير البيانات للمكوّن الابن بـ `input()`",
    "concept": "دالة input() الحديثة في Angular تستقبل البيانات من المكون الأب كإشارة (Signal Input) آمنة ومحكمة الأنواع.",
    "flow": "المكون الأب يمرر [rating]=\"4.8\" ⟶ المكون الابن يستقبلها عبر input()",
    "task": "أضف خاصية تقييم الفيلم rating عبر input() داخل MovieCard في src/app/movie-card.ts.",
    "file": "src/app/movie-card.ts",
    "code": "readonly rating = input<number>(4.8);",
    "expected": "readonly rating = input<number>(4.8);",
    "reference": "https://angular.dev/guide/signals/inputs",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "كيف يمرر المكون الأب بيانات مختلفة لكل بطاقة فيلم؟ نستخدم input() لفتح منفذ استقبال بيانات في المكون الابن يستقبل العنوان، التقييم، أو السعر!",
        "flow": "المكون الأب (البيانات) ⟶ [الخاصية] ⟶ المكون الابن (يعرضها)",
        "task": "افتح src/app/movie-card.ts لإضافة مدخل التقييم.",
        "benefit": "فهمت تدفق البيانات من المكون الأب إلى المكون الابن."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح Signal Input الجديد",
        "explanation": "دالة input<number>(4.8) تنشئ إشارة دخل بنوع رقم وقيمة افتراضية 4.8. يمكن قراءتها داخل القالب بالأقواس rating().",
        "flow": "readonly rating = input<number>(4.8) ⟶ قراءة بالقالب بـ rating()",
        "task": "قارن سهولة input() الجديدة مقارنة بالزخرف القديم @Input.",
        "benefit": "أتقنت استخدام Signal Inputs الحديثة في Angular 17+."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف مدخل التقييم rating داخل كلاس MovieCard في src/app/movie-card.ts.",
        "file": "src/app/movie-card.ts",
        "code": "readonly rating = input<number>(4.8);",
        "expected": "readonly rating = input<number>(4.8);",
        "task": "أضف السطر داخل الكلاس ثم اضغط (شغّل وافحص).",
        "benefit": "أضفت منفذ استقبال تقييم الفيلم كإشارة دخل في المكون."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكن لأي مكون أب الآن تمرير [rating]=\"5.0\" لعرض نجمة الفيلم المميز.",
        "task": "تأكد من وجود خاصية rating في الكلاس.",
        "benefit": "أصبحت جاهزًا لإرسال واستقبال البيانات بين المكونات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا ترجع دالة input() الحديثة في Angular؟",
        "options": [
          "ترجع إشارة (Signal) يمكن قراءتها بالأقواس وتحمل القيمة الممررة من الأب",
          "ترجع كائن التاريخ الحالي",
          "ترجع اسم المتصفح"
        ],
        "correct": 0,
        "benefit": "ترسيخ حقيقة أن مدخلات input() الحديثة هي Signals تفاعلية.",
        "task": "ماذا ترجع دالة input() الحديثة في Angular؟"
      }
    ]
  },
  {
    "id": "ng-component-output",
    "phase": "تقسيم المكونات",
    "title": "إرسال الأحداث للمكون الأب بـ `output()`",
    "concept": "دالة output() الحديثة تُنشئ مخرج أحداث يُرسل إشعارًا للمكون الأب عند قيام المستخدم بفعل معين داخل الابن (مثل النقر على اختيار فيلم).",
    "flow": "نقر في بطاقة الفيلم ⟶ selected.emit(movieId) ⟶ يلتقطها الأب (selected)=\"onSelect($event)\"",
    "task": "أضف مخرج الأحداث selected داخل كلاس MovieCard في src/app/movie-card.ts.",
    "file": "src/app/movie-card.ts",
    "code": "readonly selected = output<number>();",
    "expected": "readonly selected = output<number>();",
    "reference": "https://angular.dev/guide/components/outputs",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "إذا نقر المستخدم على زر داخل بطاقة فيلم فرعية، كيف يعلم المكون الرئيسي ليقوم بحجز التذكرة؟ نستخدم output() لإطلاق حدث يلتقطه المكون الأب فورًا!",
        "flow": "فعل في المكون الابن ⟶ output() ⟶ إشعار المكون الأب ⟶ تنفيذ الحجز",
        "task": "افتح src/app/movie-card.ts لإضافة مخرج الأحداث.",
        "benefit": "فهمت التواصل الصاعد من الابن إلى الأب (Child to Parent Communication)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة output() الجديدة",
        "explanation": "دالة output<number>() تُنشئ مخرج أحداث نظيف. لإرسال البيانات نكتب this.selected.emit(1).",
        "flow": "selected = output<number>() ⟶ selected.emit(id)",
        "task": "لاحظ سهولة واستقرار output() مقارنة بـ EventEmitter القديمة.",
        "benefit": "أتقنت استخدام مخرجات الأحداث الحديثة في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف مخرج الأحداث selected داخل كلاس MovieCard في src/app/movie-card.ts.",
        "file": "src/app/movie-card.ts",
        "code": "readonly selected = output<number>();",
        "expected": "readonly selected = output<number>();",
        "task": "أضف السطر داخل الكلاس ثم اضغط (شغّل وافحص).",
        "benefit": "جهزت منفذ إطلاق أحداث اختيار الأفلام في المكون الفرعي."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "عند ربط هذا المخرج، يستطيع الأب الاستماع إليه عبر (selected)=\"onMovieChosen($event)\".",
        "task": "تأكد من تعريف selected بنجاح.",
        "benefit": "أتقنت التواصل ثنائي الاتجاه المتكامل بين المكونات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الدالة المستخدمة لإطلاق وإرسال حدث عبر مخرج output()؟",
        "options": [
          "دالة emit() مثل myOutput.emit(data)",
          "دالة fire()",
          "دالة send()"
        ],
        "correct": 0,
        "benefit": "حفظ دالة emit() لإطلاق أحداث المكونات.",
        "task": "ما الدالة المستخدمة لإطلاق وإرسال حدث عبر مخرج output()؟"
      }
    ]
  },
  {
    "id": "ng-component-use",
    "phase": "تقسيم المكونات",
    "title": "استخدام المكوّن الفرعي داخل المكوّن الرئيسي",
    "concept": "في المكونات المستقلة (Standalone Components)، نقوم باستيراد المكون الفرعي في مصفوفة imports داخل المكون الرئيسي لاستخدامه في القالب.",
    "flow": "imports: [MovieCard] ⟶ استخدام وسم <app-movie-card> في القالب بكل حرية",
    "task": "استورد مكوّن MovieCard داخل ملف src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "import { MovieCard } from './movie-card';",
    "expected": "import { MovieCard } from './movie-card';",
    "reference": "https://angular.dev/guide/components/importing",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في Angular المستقل (Standalone)، لا نحتاج لوحدات NgModules المعقدة بعد اليوم! كل مكوّن يستورد فقط ما يحتاجه مباشرة عبر مصفوفة imports.",
        "flow": "استيراد MovieCard ⟶ وضعه في imports ⟶ استخدامه كوسم HTML في القالب",
        "task": "افتح src/app/app.ts لإجراء الاستيراد.",
        "benefit": "فهمت سهولة ونقاء نظام المكونات المستقلة Standalone Components."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح عبارة الاستيراد",
        "explanation": "نستورد MovieCard من مساره النسبي './movie-card' في أعلى الملف، ثم نضعه داخل مصفوفة imports في زخرف @Component.",
        "flow": "import { MovieCard } from './movie-card' ⟶ جاهز للاستخدام",
        "task": "لاحظ التوافق التام والتنظيم العالي للمشروع.",
        "benefit": "أتقنت استيراد واستدعاء المكونات الفرعية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف سطر استيراد MovieCard في أعلى ملف src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "import { MovieCard } from './movie-card';",
        "expected": "import { MovieCard } from './movie-card';",
        "task": "أضف سطر الاستيراد ثم اضغط (شغّل وافحص).",
        "benefit": "ربطت المكون الفرعي بالمكون الرئيسي بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك الآن كتابة <app-movie-card /> في قالب app.html في أي وقت لعرض بطاقة الفيلم.",
        "task": "تأمل كيف أصبحت واجهتك مبنية من قطع ليغو قابلة للتركيب.",
        "benefit": "أتقنت هندسة المكونات المعيارية في Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "أين نضع المكونات الفرعية التي نريد استخدامها داخل قالب مكون Standalone؟",
        "options": [
          "داخل مصفوفة imports في زخرف @Component الخاص بالمكون الأب",
          "في ملف styles.css",
          "في إعدادات المتصفح"
        ],
        "correct": 0,
        "benefit": "تثبيت مصفوفة imports في المكونات المستقلة.",
        "task": "أين نضع المكونات الفرعية التي نريد استخدامها داخل قالب مكون Standalone؟"
      }
    ]
  },
  {
    "id": "ng-service-create",
    "phase": "الخدمات وحقن التبعيات",
    "title": "إنشاء خدمة الأفلام وحفظ البيانات (`@Injectable`)",
    "concept": "الخدمة (Service) تفصل منطق جلب وحفظ البيانات عن واجهة المستخدم، وتوفر مصدرًا موحدًا للمعلومات يشاركه التطبيق بأكمله.",
    "flow": "@Injectable({ providedIn: 'root' }) ⟶ خدمة سينما مركزية يشاركها كل مكون",
    "task": "أنشئ كلاس خدمة السينما CinemaService داخل src/app/cinema.service.ts.",
    "file": "src/app/cinema.service.ts",
    "code": "import { Injectable, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaService {\n  readonly selectedMovie = signal<string>('رحلة النجوم');\n}",
    "expected": "export class CinemaService",
    "reference": "https://angular.dev/guide/di/creating-injectable-service",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "لو وضعنا البيانات داخل مكون واحد، فكيف سيصل إليها مكون آخر في صفحة ثانية؟ الخدمة (Service) هي المخزن المركزي المشترك الذي يمكن لأي مكون في الموقع القراءة منه والتعديل عليه!",
        "flow": "الخدمة (مخزن مركزي) ⟵(مشاركة البيانات)⟶ المكون A والمكون B والمكون C",
        "task": "افتح src/app/cinema.service.ts في شجرة الملفات.",
        "benefit": "فهمت أهمية الخدمات في تنظيم ومشاركة بيانات التطبيق."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح زخرف @Injectable",
        "explanation": "الزخرف @Injectable({ providedIn: 'root' }) يخبر Angular بتسجيل هذه الخدمة كنسخة مفردة (Singleton) متاحة لجميع أجزاء الموقع تلقائيًا دون إعدادات إضافية.",
        "flow": "providedIn: 'root' ⟶ نسخة وحيدة مشتركة في الذاكرة",
        "task": "تأمل عبقرية نظام حقن التبعيات في Angular.",
        "benefit": "أتقنت إنشاء الخدمات المركزية السليمة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "اكتب كود خدمة CinemaService داخل ملف src/app/cinema.service.ts.",
        "file": "src/app/cinema.service.ts",
        "code": "import { Injectable, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CinemaService {\n  readonly selectedMovie = signal<string>('رحلة النجوم');\n}",
        "expected": "export class CinemaService",
        "task": "اكتب كود الخدمة ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت أول خدمة بيانات مركزية في تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "لاحظ أن الخدمة تحتوي على إشارة signal تفاعلية للفيلم المختار، مما يتيح التفاعل الفوري في كل مكان يستمع إليها.",
        "task": "تأكد من إنشاء خدمة cinema.service.ts بنجاح.",
        "benefit": "جمعت بين قوة Services ومرونة Signals الحديثة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما وظيفة الزخرف @Injectable في Angular؟",
        "options": [
          "يعلن أن الكلاس خدمة يمكن حقنها واستخدامها في المكونات الأخرى",
          "يقوم بحذف الملفات غير المستخدمة",
          "يغير خط النصوص"
        ],
        "correct": 0,
        "benefit": "فهم دور الزخرف @Injectable.",
        "task": "ما وظيفة الزخرف @Injectable في Angular؟"
      }
    ]
  },
  {
    "id": "ng-service-inject",
    "phase": "الخدمات وحقن التبعيات",
    "title": "حقن واستخدام الخدمة (`inject()`)",
    "concept": "نستخدم دالة inject(CinemaService) الحديثة للحصول على نسخة الخدمة تلقائيًا داخل المكون بأسلوب رشيق دون الحاجة لكتابة منشئات constructor معقدة.",
    "flow": "cinemaService = inject(CinemaService) ⟶ الوصول المباشر لبيانات الخدمة",
    "task": "احقن خدمة السينما داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "private readonly cinemaService = inject(CinemaService);",
    "expected": "private readonly cinemaService = inject(CinemaService);",
    "reference": "https://angular.dev/guide/di/dependency-injection-context",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "بدلًا من إنشاء الخدمة يدويًا بـ new CinemaService()، نطلبها من Angular عبر inject(). يتكفل Angular بإحضار نفس النسخة المشتركة فورًا!",
        "flow": "المكون يطلب: inject(Service) ⟶ Angular يقدم النسخة المشتركة فورًا",
        "task": "انتقل إلى ملف src/app/app.ts.",
        "benefit": "فهمت آلية عمل حقن التبعيات الرشيقة في Angular الحديث."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة inject() الحديثة",
        "explanation": "دالة inject تأتي من '@angular/core' وتسمح بحقن أي خدمة في سطر واحد فقط كخاصية في الكلاس، دون الحاجة لمنشئ الكلاس التقليدي constructor.",
        "flow": "service = inject(MyService) ⟶ سطر واحد بدلاً من سطور متعددة",
        "task": "لاحظ كيف جعلت دالة inject() الكود أنظف وأسهل في القراءة.",
        "benefit": "أتقنت أحدث وأفضل ممارسات حقن التبعيات في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "احقن CinemaService داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "private readonly cinemaService = inject(CinemaService);",
        "expected": "private readonly cinemaService = inject(CinemaService);",
        "task": "أضف سطر الحقن داخل كلاس App ثم اضغط (شغّل وافحص).",
        "benefit": "ربطت كلاس المكون الرئيسي بالخدمة المركزية بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك الآن استدعاء أي دالة أو قراءة أي إشارة من cinemaService في ثوانٍ.",
        "task": "تأكد من حقن الخدمة بنجاح داخل كلاس App.",
        "benefit": "أتقنت ربط المكونات بالخدمات المركزية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي الدالة الحديثة في Angular المستخدمة لحقن الخدمات في سطر واحد؟",
        "options": [
          "دالة inject()",
          "دالة require()",
          "دالة import()"
        ],
        "correct": 0,
        "benefit": "تثبيت دالة inject() الحديثة لحقن التبعيات.",
        "task": "ما هي الدالة الحديثة في Angular المستخدمة لحقن الخدمات في سطر واحد؟"
      }
    ]
  },
  {
    "id": "ng-service-method",
    "phase": "الخدمات وحقن التبعيات",
    "title": "مشاركة التعديل عبر دوال الخدمة",
    "concept": "إضافة دالة داخل الخدمة لتغيير الفيلم المختار، فينعكس التغيير فورًا على كل مكان يقرأ من الخدمة في كامل الموقع.",
    "flow": "دالة chooseMovie('اسم الفيلم') ⟶ تحديث selectedMovie.set(...) ⟶ مزامنة فورية",
    "task": "أضف دالة اختيار الفيلم داخل src/app/cinema.service.ts.",
    "file": "src/app/cinema.service.ts",
    "code": "chooseMovie(name: string): void { this.selectedMovie.set(name); }",
    "expected": "chooseMovie(name: string): void { this.selectedMovie.set(name); }",
    "reference": "https://angular.dev/guide/di",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "عندما يختار العميل فيلمًا في صفحة العروض، تستدعي الواجهة دالة في الخدمة لتسجيل الاختيار. هكذا تظل تفاصيل الحجز محفوظة حتى أثناء التنقل بين الصفحات!",
        "flow": "اختيار فيلم ⟶ الخدمة تحفظ الاختيار ⟶ استخدامه في صفحة التذاكر لاحقًا",
        "task": "افتح src/app/cinema.service.ts لإضافة دالة الاختيار.",
        "benefit": "تعلمت إدارة وتعديل الحالة المركزية المشتركة للتطبيق."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح دالة set() في الخدمة",
        "explanation": "نستخدم this.selectedMovie.set(name) لتعيين القيمة الجديدة مباشرة في الإشارة، مما يرسل إشعارًا فوريًا لكل المكونات المعتمدة عليها.",
        "flow": "this.selectedMovie.set(name) ⟶ تحديث الحالة المركزية",
        "task": "لاحظ كيف تحافظ الخدمة على نظافة كود المكونات.",
        "benefit": "أتقنت تحديث بيانات الخدمات بكفاءة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف دالة chooseMovie داخل كلاس CinemaService في src/app/cinema.service.ts.",
        "file": "src/app/cinema.service.ts",
        "code": "chooseMovie(name: string): void { this.selectedMovie.set(name); }",
        "expected": "chooseMovie(name: string): void { this.selectedMovie.set(name); }",
        "task": "أضف الدالة داخل كلاس الخدمة ثم اضغط (شغّل وافحص).",
        "benefit": "زودت الخدمة بدالة تفاعلية لإدارة اختيار الأفلام."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكن لأي مكون استدعاء cinemaService.chooseMovie('فيلم الأسبوع') وسيتحدث التطبيق بالكامل.",
        "task": "تأكد من كتابة الدالة بنجاح في كلاس الخدمة.",
        "benefit": "أصبحت متحكمًا بالكامل في تدفق البيانات المركزي."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة من وضع دوال تعديل البيانات داخل الخدمة وليس في المكون فقط؟",
        "options": [
          "لتوفير طريقة موحدة وموثوقة لتعديل البيانات يشاركها أي مكون في الموقع",
          "لجعل سرعة تحميل الصفحة أقل",
          "لتغيير لون النصوص"
        ],
        "correct": 0,
        "benefit": "فهم مبدأ فصل الاهتمامات وحفظ المنطق المشترك في الخدمات.",
        "task": "ما الفائدة من وضع دوال تعديل البيانات داخل الخدمة وليس في المكون فقط؟"
      }
    ]
  },
  {
    "id": "ng-routing-setup",
    "phase": "التوجيه والصفحات",
    "title": "إعداد مسارات الصفحات (`Routes`)",
    "concept": "نظام التوجيه في Angular (Router) يتيح التنقل السلس بين صفحات التطبيق المتعددة (عروض الأفلام، تذاكري، تفاصيل الحجز) في أجزاء من الثانية دون أي إعادة تحميل للصفحة.",
    "flow": "مسار /movies ⟶ صفحة الأفلام  |  مسار /tickets ⟶ صفحة تذاكري",
    "task": "عرّف مصفوفة المسارات الأساسية في src/app/app.routes.ts.",
    "file": "src/app/app.routes.ts",
    "code": "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'movies', pathMatch: 'full' }\n];",
    "expected": "export const routes: Routes",
    "reference": "https://angular.dev/guide/routing/common-router-tasks",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "في تطبيقات الويب أحادية الصفحة، المستخدم يرى عناوين URL تتغير في شريط المتصفح، ولكن الصفحة لا يُعاد تحميلها أبدًا! Angular Router هو المسؤول عن هذه التجربة الساحرة.",
        "flow": "تغير الرابط في المتصفح ⟶ Angular Router يعرض المكون المطلوب فوريًا",
        "task": "افتح src/app/app.routes.ts في محرر الأكواد.",
        "benefit": "فهمت كيفية عمل التوجيه الداخلي السريع Client-Side Routing."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح مصفوفة Routes",
        "explanation": "مصفوفة Routes تحتوي على كائنات؛ كل كائن يحدد مسار الرابط path والمكون المرتبط به component، أو التوجيه التلقائي redirectTo.",
        "flow": "{ path: '', redirectTo: 'movies', pathMatch: 'full' } ⟶ تحويل الرابط الرئيسي",
        "task": "لاحظ التوجيه التلقائي للصفحة الرئيسية إلى قسم الأفلام مباشرة.",
        "benefit": "تعلمت الصياغة المعيارية لإعداد مسارات Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف تعريف المسارات داخل ملف src/app/app.routes.ts.",
        "file": "src/app/app.routes.ts",
        "code": "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'movies', pathMatch: 'full' }\n];",
        "expected": "export const routes: Routes",
        "task": "اكتب كود المسارات ثم اضغط (شغّل وافحص).",
        "benefit": "أسست خريطة مسارات التنقل لمشروع السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك إضافة أي مسار جديد لاحقًا مثل { path: 'tickets', component: TicketsComponent } بكل بساطة.",
        "task": "تأكد من وجود مصفوفة routes بنجاح.",
        "benefit": "أتقنت تجهيز بنية مسارات التطبيقات متعددة الصفحات."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما فائدة خاصية redirectTo في كائن المسار داخل مصفوفة Routes؟",
        "options": [
          "تحويل الزائر تلقائيًا إلى مسار آخر (مثل تحويل الرابط الرئيسي لصفحة الأفلام)",
          "حذف صفحة من الذاكرة",
          "إغلاق المتصفح"
        ],
        "correct": 0,
        "benefit": "فهم التوجيه التلقائي في Angular Router.",
        "task": "ما فائدة خاصية redirectTo في كائن المسار داخل مصفوفة Routes؟"
      }
    ]
  },
  {
    "id": "ng-routing-outlet",
    "phase": "التوجيه والصفحات",
    "title": "عرض الصفحة الحالية بـ `<router-outlet>`",
    "concept": "الوسم <router-outlet /> هو المنفذ المخصص في القالب الذي يعرض فيه Angular مكوّن الصفحة المختارة حاليًا بناءً على الرابط النشط.",
    "flow": "الرابط يتغير ⟶ يفرغ Angular مخرج الراوتر ⟶ يعرض المكون المطلوب فورًا",
    "task": "أضف مخرج الصفحات <router-outlet /> في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<main class=\"router-viewport\"><router-outlet /></main>",
    "expected": "<main class=\"router-viewport\"><router-outlet /></main>",
    "reference": "https://angular.dev/guide/routing/common-router-tasks#displaying-a-routed-view",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "أين تظهر الصفحة عندما يضغط الزائر على رابط؟ هنا يأتي دور <router-outlet />؛ هو الإطار أو الشاشة التي يتبدل بداخلها محتوى الصفحات مع بقاء الترويسة والشريط ثابتين!",
        "flow": "ترويسة ثابتة ⟶ [router-outlet شاشة تبديل الصفحات] ⟶ تذييل ثابت",
        "task": "انتقل إلى ملف src/app/app.html.",
        "benefit": "فهمت مكان وكيفية عرض الصفحات المتنقلة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح وسم <router-outlet />",
        "explanation": "وسم ذاتي الإغلاق يأتي من RouterModule. بمجرد وضعه في القالب، يعرف Angular تلقائيًا أين يرسم صفحات المسارات.",
        "flow": "<router-outlet /> ⟶ نافذة عرض الصفحات الذكية",
        "task": "لاحظ كيف يسمح لك بالحفاظ على الهيكل العام ثابتاً وتغيير المحتوى فقط.",
        "benefit": "أتقنت تجهيز نافذة العرض لتطبيقات SPA."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف وسم <router-outlet /> داخل src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<main class=\"router-viewport\"><router-outlet /></main>",
        "expected": "<main class=\"router-viewport\"><router-outlet /></main>",
        "task": "أضف كود المنفذ ثم اضغط (شغّل وافحص).",
        "benefit": "فتحت منفذ التوجيه الديناميكي في تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "تأكد من أن هذا المنفذ جاهز لاستقبال أي صفحة تطلبها من قائمة التنقل.",
        "task": "تأمل الهيكل المنظم في القالب.",
        "benefit": "أصبحت جاهزًا لإضافة أزرار وروابط التنقل السريع."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هو دور الوسم <router-outlet /> في قوالب Angular؟",
        "options": [
          "يمثل المكان المخصص لعرض وتبديل مكونات الصفحات النشطة",
          "يقوم برسم زر خروج من الموقع",
          "يعرض إعلانات تلقائية"
        ],
        "correct": 0,
        "benefit": "حفظ دور الوسم الأساسي <router-outlet />.",
        "task": "ما هو دور الوسم <router-outlet /> في قوالب Angular؟"
      }
    ]
  },
  {
    "id": "ng-routing-link",
    "phase": "التوجيه والصفحات",
    "title": "الانتقال السريع بـ `routerLink` وتمييز الرابط النشط",
    "concept": "نستخدم خاصية routerLink=\"/path\" بدلاً من href التقليدي للتنقل الفوري، ونضيف routerLinkActive=\"active\" لتمييز الصفحة النشطة تلقائيًا.",
    "flow": "نقر على <a routerLink=\"/movies\" routerLinkActive=\"active\"> ⟶ انتقال فوري مع تمييز لوني مميز",
    "task": "أضف شريط تنقل يحتوي على routerLink و routerLinkActive في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<nav class=\"cinema-nav\"><a routerLink=\"/movies\" routerLinkActive=\"active\">الأفلام</a><a routerLink=\"/tickets\" routerLinkActive=\"active\">تذاكري</a></nav>",
    "expected": "<nav class=\"cinema-nav\"><a routerLink=\"/movies\" routerLinkActive=\"active\">الأفلام</a>",
    "reference": "https://angular.dev/guide/routing/common-router-tasks#linking-to-routes",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "إذا استخدمت <a href=\"...\"> العادية، سيقوم المتصفح بإعادة تحميل الصفحة ومسح حالة الذاكرة! لذلك نستخدم routerLink لمنع إعادة التحميل، مع routerLinkActive لتمييز الرابط المفتوح.",
        "flow": "routerLink ⟶ يمنع التحميل التقليدي ⟶ ينقل المسار فوريًا داخل Angular ويميز الرابط",
        "task": "انتقل إلى ملف src/app/app.html لإضافة شريط التنقل المتكامل.",
        "benefit": "فهمت الفرق الجوهري بين routerLink و href التقليدي وكيفية تمييز الرابط النشط."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح توجيه routerLink و routerLinkActive",
        "explanation": "نكتب routerLink=\"/movies\" مع routerLinkActive=\"active\". يراقب Angular المسار في شريط العنوان، وعندما يتطابق يضيف كلاس active تلقائيًا!",
        "flow": "<a routerLink=\"/target\" routerLinkActive=\"active\">اسم الرابط</a>",
        "task": "لاحظ سهولة قراءة روابط التنقل وأناقتها.",
        "benefit": "أتقنت إنشاء قوائم التنقل السريعة والمميزة بصريًا."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف شريط التنقل cinema-nav في أعلى src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<nav class=\"cinema-nav\"><a routerLink=\"/movies\" routerLinkActive=\"active\">الأفلام</a><a routerLink=\"/tickets\" routerLinkActive=\"active\">تذاكري</a></nav>",
        "expected": "<nav class=\"cinema-nav\"><a routerLink=\"/movies\" routerLinkActive=\"active\">الأفلام</a>",
        "task": "أضف شريط التنقل ثم اضغط (شغّل وافحص) وشاهد أزرار التنقل في المعاينة!",
        "benefit": "أضفت شريط تنقل احترافي وسريع لتطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "جرب النقر على روابط الأفلام وتذاكري في المعاينة ولاحظ استجابتها الفورية وتمييز الرابط.",
        "task": "انقر على روابط التنقل في المعاينة الحية.",
        "benefit": "شعرت بسلاسة تطبيقات الصفحة الواحدة الحقيقية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "لماذا نفضل استخدام routerLink بدلاً من href في روابط التنقل داخل Angular؟",
        "options": [
          "لمنع إعادة تحميل الصفحة بالكامل والانتقال فوريًا دون وميض",
          "لأن href لا تعمل في المتصفحات الحديثة",
          "لتصغير حجم الصور"
        ],
        "correct": 0,
        "benefit": "ترسيخ أفضل ممارسات الروابط بـ routerLink.",
        "task": "لماذا نفضل استخدام routerLink بدلاً من href في روابط التنقل داخل Angular؟"
      }
    ]
  },
  {
    "id": "ng-http-provider",
    "phase": "جلب البيانات والشبكة",
    "title": "تفعيل عميل الويب (`provideHttpClient`)",
    "concept": "نقوم بتسجيل provideHttpClient() في إعدادات التطبيق appConfig لتمكينه من إرسال واستقبال طلبات الإنترنت وواجهات API.",
    "flow": "ملف app.config.ts ⟶ تسجيل provideHttpClient() ⟶ جاهزية تامة لطلبات الويب",
    "task": "أضف provideHttpClient() إلى مصفوفة المزودات في src/app/app.config.ts.",
    "file": "src/app/app.config.ts",
    "code": "import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';\nimport { provideHttpClient } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [provideHttpClient()]\n};",
    "expected": "provideHttpClient()",
    "reference": "https://angular.dev/guide/http/setup",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "لجلب أحدث الأفلام والأسعار والمقاعد من خادم السينما الحقيقي، يحتاج تطبيقنا إلى عميل ويب HttpClient. لتفعيله، نسجل provideHttpClient() في إعدادات التطبيق.",
        "flow": "إعدادات التطبيق (app.config.ts) ⟶ تفعيل HttpClient ⟶ فتح قناة التواصل مع الخوادم",
        "task": "افتح src/app/app.config.ts لتفعيل عميل الويب.",
        "benefit": "فهمت كيفية تجهيز خدمات الشبكة في التطبيقات الحديثة."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح مصفوفة providers",
        "explanation": "مصفوفة providers داخل ApplicationConfig تحدد الخدمات الشاملة التي تبدأ مع انطلاق التطبيق. توفير provideHttpClient() يجعله متاحًا للحقن في أي خدمة.",
        "flow": "providers: [provideHttpClient()] ⟶ جاهزية كاملة لكل الخدمات",
        "task": "لاحظ الترتيب النظيف في إعدادات Angular الحديثة.",
        "benefit": "تعلمت الصياغة الحديثة لتهيئة خدمات Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "سجّل provideHttpClient() داخل مصفوفة providers في src/app/app.config.ts.",
        "file": "src/app/app.config.ts",
        "code": "import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';\nimport { provideHttpClient } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [provideHttpClient()]\n};",
        "expected": "provideHttpClient()",
        "task": "اكتب كود الإعداد ثم اضغط (شغّل وافحص).",
        "benefit": "فعّلت عميل الويب HttpClient في تطبيقك بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "بهذا السطر، أصبح بإمكان أي خدمة في مشروعك التواصل مع واجهات الـ REST API العالمية.",
        "task": "تأكد من حفظ إعدادات app.config.ts بنجاح.",
        "benefit": "أتقنت تهيئة عميل الاتصال الشبكي."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الدالة المستخدمة لتفعيل عميل الويب في Angular الحديث داخل ملف app.config.ts؟",
        "options": [
          "دالة provideHttpClient()",
          "دالة enableInternet()",
          "دالة startBrowser()"
        ],
        "correct": 0,
        "benefit": "حفظ دالة provideHttpClient() لتفعيل طلبات HTTP.",
        "task": "ما الدالة المستخدمة لتفعيل عميل الويب في Angular الحديث داخل ملف app.config.ts؟"
      }
    ]
  },
  {
    "id": "ng-http-get",
    "phase": "جلب البيانات والشبكة",
    "title": "طلب قائمة الأفلام من الخادم (`http.get`)",
    "concept": "استخدام دالة http.get لجلب أحدث الأفلام والأسعار والمقاعد مباشرة من خادم السينما وعرضها للزائر.",
    "flow": "طلب HTTP GET ⟶ وصول رد JSON من الخادم ⟶ تحديث قائمة الأفلام",
    "task": "أضف دالة جلب عروض الأفلام loadMovies في src/app/cinema.service.ts.",
    "file": "src/app/cinema.service.ts",
    "code": "loadMovies(): void { console.log('جارٍ تحميل قائمة عروض السينما من الخادم...'); }",
    "expected": "loadMovies(): void",
    "reference": "https://angular.dev/guide/http/making-requests",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "بدلاً من كتابة الأفلام ثابتة في الكود، نقوم بطلبها من الخادم عبر طلب GET. هكذا تتحدث الأفلام ومواعيد العرض تلقائياً دون الحاجة لتحديث التطبيق!",
        "flow": "تطبيق السينما ⟶ طلب GET ⟶ خادم السينما ⟶ استلام بيانات الأفلام JSON",
        "task": "افتح src/app/cinema.service.ts لإضافة دالة الجلب.",
        "benefit": "فهمت كيفية ربط تطبيقات Angular بواجهات الـ Backend."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح طلب GET في الخدمة",
        "explanation": "الدالة ترسل الطلب وتستقبل البيانات بصيغة JSON، ثم تحدث الإشارات التفاعلية Signals لتنعكس البيانات الجديدة على الشاشة فوراً.",
        "flow": "loadMovies() ⟶ اتصال بالخادم ⟶ تحديث الإشارات",
        "task": "تأمل كيف تفصل الخدمة تفاصيل الاتصال بالخادم عن شاشات العرض.",
        "benefit": "أتقنت تصميم دوال جلب البيانات الشبكية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف دالة loadMovies داخل كلاس CinemaService في src/app/cinema.service.ts.",
        "file": "src/app/cinema.service.ts",
        "code": "loadMovies(): void { console.log('جارٍ تحميل قائمة عروض السينما من الخادم...'); }",
        "expected": "loadMovies(): void",
        "task": "أضف الدالة ثم اضغط (شغّل وافحص).",
        "benefit": "أضفت محرك طلب بيانات الأفلام الشبكية في الخدمة."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك استدعاء هذه الدالة عند فتح التطبيق لجلب أحدث الأفلام لحظياً.",
        "task": "تأكد من وجود دالة loadMovies في كلاس الخدمة.",
        "benefit": "أصبحت جاهزاً للتعامل مع البيانات القادمة من الإنترنت."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما نوع طلب HTTP المستخدم لقراءة واسترجاع البيانات من الخادم دون تعديلها؟",
        "options": [
          "طلب GET",
          "طلب DELETE",
          "طلب POST"
        ],
        "correct": 0,
        "benefit": "تثبيت نوع طلب GET لجلب واسترجاع البيانات.",
        "task": "ما نوع طلب HTTP المستخدم لقراءة واسترجاع البيانات من الخادم دون تعديلها؟"
      }
    ]
  },
  {
    "id": "ng-http-loading-state",
    "phase": "جلب البيانات والشبكة",
    "title": "عرض حالة التحميل والانتظار",
    "concept": "إدارة إشارة isLoading = signal(false) لإظهار مؤشر تحميل دوّار أنيق يطمئن الزائر أثناء انتظار رد خادم السينما عبر الإنترنت.",
    "flow": "بدء الطلب (isLoading = true) ⟶ وصول الرد ⟶ (isLoading = false) ⟶ إخفاء المؤشر",
    "task": "أضف إشارة حالة التحميل isLoading داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly isLoading = signal<boolean>(false);",
    "expected": "readonly isLoading = signal<boolean>(false);",
    "reference": "https://angular.dev/guide/signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "شبكة الإنترنت قد تستغرق بضع ثوانٍ أحياناً. إظهار مؤشر تحميل يمنح الزائر شعوراً بالأمان والاحترافية بأن التطبيق يعمل بنشاط على إحضار تذكرته!",
        "flow": "زر الحجز ⟶ تفعيل isLoading ⟶ ظهور مؤشر التحميل ⟶ إتمام الحجز ⟶ إخفاء المؤشر",
        "task": "افتح src/app/app.ts لتعريف إشارة حالة التحميل.",
        "benefit": "تعلمت إدارة الحالات الانتقالية (Loading States) في واجهات الويب."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح إشارة boolean",
        "explanation": "ننشئ إشارة بقيمة منطقية signal<boolean>(false). عند بدء الطلب نغيرها بـ set(true)، وعند الانتهاء نعيدها بـ set(false).",
        "flow": "isLoading.set(true) ⟶ إظهار التحميل  |  isLoading.set(false) ⟶ إخفاء التحميل",
        "task": "تأمل بساطة وسرعة إدارة الحالة بـ Signals مقارنة بالوسائل القديمة.",
        "benefit": "أتقنت إدارة الحالات المنطقية في Angular."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "عرّف إشارة isLoading داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "readonly isLoading = signal<boolean>(false);",
        "expected": "readonly isLoading = signal<boolean>(false);",
        "task": "أضف السطر داخل كلاس App ثم اضغط (شغّل وافحص).",
        "benefit": "جهزت إشارة التحكم في مؤشر التحميل للتطبيق."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك في القالب ربطها بـ @if (isLoading()) { <div>جارٍ حجز مقعدك...</div> } بكل سهولة.",
        "task": "تأكد من وجود إشارة isLoading في الكلاس.",
        "benefit": "أتقنت التحكم في شاشات الانتظار والتحميل."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "لماذا نستخدم إشارة boolean لحالة التحميل مثل isLoading؟",
        "options": [
          "للتحكم في إظهار وإخفاء مؤشرات التحميل أثناء انتظار ردود الشبكة",
          "لتسريع سرعة معالج الكمبيوتر",
          "لإيقاف استهلاك الكهرباء"
        ],
        "correct": 0,
        "benefit": "فهم دور Loading State في تحسين تجربة المستخدم.",
        "task": "لماذا نستخدم إشارة boolean لحالة التحميل مثل isLoading؟"
      }
    ]
  },
  {
    "id": "ng-http-error-handling",
    "phase": "جلب البيانات والشبكة",
    "title": "معالجة أخطاء الشبكة والاتصال",
    "concept": "توفير إشارة errorMessage لعرض رسالة خطأ واضحة ومريحة في حال انقطاع اتصال الإنترنت لدى الزائر مع إرشاده لإعادة المحاولة.",
    "flow": "فشل طلب الشبكة ⟶ errorMessage.set('...') ⟶ ظهور تنبيه واضح بدلاً من تعطل الصفحة",
    "task": "أضف إشارة رسالة الخطأ errorMessage داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly errorMessage = signal<string>('');",
    "expected": "readonly errorMessage = signal<string>('');",
    "reference": "https://angular.dev/guide/http/error-handling",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "المطور المحترف لا يفترض أن كل شيء سيعمل دائمًا بنجاح 100%. معالجة الأخطاء بذكاء تحمي تطبيقك من الانهيار وتساعد الزائر على حل المشكلة.",
        "flow": "حدث خطأ في الاتصال ⟶ التقاط الخطأ ⟶ عرض رسالة واضحة وزر إعادة المحاولة",
        "task": "افتح src/app/app.ts لإضافة إشارة رسالة الخطأ.",
        "benefit": "فهمت أهمية الحصانة البرمجية والتعامل مع الأخطاء (Error Handling)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح إشارة نص الخطأ",
        "explanation": "إشارة errorMessage تبدأ بنص فارغ ''. عندما يحدث خطأ نضع نص المشكلة، ونعرضها في القالب بشرط @if (errorMessage()).",
        "flow": "@if (errorMessage()) { <div class=\"error\">{{ errorMessage() }}</div> }",
        "task": "تأمل كيف تمنع هذه الطريقة تعطل الصفحة أمام الزائر.",
        "benefit": "أتقنت حماية التطبيق وتقديم رسائل خطأ مفيدة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "عرّف إشارة errorMessage داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "readonly errorMessage = signal<string>('');",
        "expected": "readonly errorMessage = signal<string>('');",
        "task": "أضف السطر داخل كلاس App ثم اضغط (شغّل وافحص).",
        "benefit": "أنشأت قناة إدارة وعرض رسائل الأخطاء في تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "إذا وضعت مؤقتاً قيمة 'تعذر الاتصال بالخادم، تأكد من الإنترنت' ستظهر رسالة التنبيه في الواجهة.",
        "task": "تأكد من وجود إشارة errorMessage في الكلاس.",
        "benefit": "أصبحت قادراً على التعامل مع سيناريوهات الخطأ بثقة واحترافية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا يجب أن يفعل التطبيق عند فشل طلب اتصال بالإنترنت؟",
        "options": [
          "التقاط الخطأ وعرض رسالة واضحة للمستخدم تشرح ما حدث وتتيح له المحاولة مجدداً",
          "إغلاق المتصفح فجأة دون إعلام الزائر",
          "حذف بيانات الحجز السابقة"
        ],
        "correct": 0,
        "benefit": "ترسيخ أفضل ممارسات معالجة الأخطاء البرمجية.",
        "task": "ماذا يجب أن يفعل التطبيق عند فشل طلب اتصال بالإنترنت؟"
      }
    ]
  },
  {
    "id": "cinema-header-build",
    "phase": "مشروع سينما النجوم المتكامل",
    "title": "بناء ترويسة وشعار سينما النجوم",
    "concept": "تصميم واجهة ترحيبية فخمة لسينما النجوم مع عرض التوقيت الحالي واسم السينما وأيقونة العرض الجذابة في قالب HTML.",
    "flow": "تصميم الترويسة ⟶ شعار مميز مع نص ترحيبي سينمائي راقٍ",
    "task": "أضف تصميم ترويسة سينما النجوم داخل src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<header class=\"cinema-hero\"><h2>🎬 سينما النجوم التفاعلية</h2><p>اختر مقعدك وعرضك المفضل بأسهل تجربة حجز.</p></header>",
    "expected": "🎬 سينما النجوم التفاعلية",
    "reference": "https://angular.dev/guide/templates",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "الآن وصلنا لقمة الإثارة! سنبدأ بجمع كل المهارات التي تعلمتها لبناء مشروع حقيقي متكامل: تطبيق حجز سينما النجوم التفاعلي خطوة بخطوة.",
        "flow": "الترويسة ⟶ شبكة المقاعد ⟶ حاسبة التذاكر بالـ Signals ⟶ تذكرة الحجز النهائية",
        "task": "انتقل إلى ملف src/app/app.html لبناء ترويسة المشروع.",
        "benefit": "بدأت المرحلة التطبيقية الشاملة لمشروع التخرج العملي."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح ترويسة السينما",
        "explanation": "نستخدم وسم <header> بكلاس cinema-hero مع عنوان جذاب وأيقونة سينمائية تعطي انطباعاً بالفخامة والاحترافية.",
        "flow": "<header class=\"cinema-hero\"> ⟶ المظهر البصري لافت للأنظار",
        "task": "تأمل التنسيق المتناسق للترويسة في ملف CSS.",
        "benefit": "تعلمت بناء واجهات رئيسية جذابة للزوار."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف ترويسة السينما في بداية محتوى src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<header class=\"cinema-hero\"><h2>🎬 سينما النجوم التفاعلية</h2><p>اختر مقعدك وعرضك المفضل بأسهل تجربة حجز.</p></header>",
        "expected": "🎬 سينما النجوم التفاعلية",
        "task": "اكتب كود الترويسة ثم اضغط (شغّل وافحص) وشاهد الترويسة الفخمة في المعاينة!",
        "benefit": "ظهرت ترويسة سينما النجوم الفخمة في واجهة تطبيقك."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "لاحظ الألوان المتناسقة والخطوط الأنيقة التي تمنح التطبيق هوية سينمائية فريدة.",
        "task": "تأمل مظهر ترويسة السينما في المعاينة الحية.",
        "benefit": "أتقنت بناء ترويسات التطبيقات الجذابة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الوسم الدلالي الأنسب في HTML لترويسة الصفحة أو التطبيق؟",
        "options": [
          "وسم <header>",
          "وسم <footer>",
          "وسم <aside>"
        ],
        "correct": 0,
        "benefit": "تثبيت الوسوم الدلالية الصحيحة لهياكل الصفحات.",
        "task": "ما الوسم الدلالي الأنسب في HTML لترويسة الصفحة أو التطبيق؟"
      }
    ]
  },
  {
    "id": "cinema-seat-picker",
    "phase": "مشروع سينما النجوم المتكامل",
    "title": "نظام اختيار المقاعد التفاعلي (Seat Picker)",
    "concept": "بناء مصفوفة تفاعلية لمقاعد قاعة السينما (A1, A2, A3) باستخدام Signal لتمكين الزائر من اختيار المقعد وتغيير لونه فورًا.",
    "flow": "إشارة المقاعد seats ⟶ مصفوفة المقاعد وحالتها (محجوز / متاح) ⟶ تحديث فوري",
    "task": "عرّف إشارة مصفوفة المقاعد seats داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "readonly seats = signal([ { id: 'A1', booked: false }, { id: 'A2', booked: true }, { id: 'A3', booked: false } ]);",
    "expected": "readonly seats = signal",
    "reference": "https://angular.dev/guide/signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "قاعة السينما تتكون من مقاعد؛ بعضها متاح وبعضها محجوز. سنمثل هذه المقاعد كإشارة تفاعلية Signal تحتوي على مصفوفة كائنات المقاعد وحالتها.",
        "flow": "مصفوفة مقاعد تفاعلية ⟶ كل مقعد له معرف وحالة booked ⟶ شاشة قاعة سينما حية",
        "task": "افتح src/app/app.ts لتعريف إشارة المقاعد.",
        "benefit": "فهمت كيفية نمذجة البيانات المعقدة في الـ Signals."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح بنية بيانات المقعد",
        "explanation": "كل مقعد كائن يحمل id (مثل 'A1') وخاصية booked المنطقية (true تعني محجوز، false تعني متاح للاختيار).",
        "flow": "{ id: 'A1', booked: false } ⟶ مقعد متاح للشراء",
        "task": "لاحظ كيف تمثل البيانات الواقعية بدقة في لغة TypeScript.",
        "benefit": "أتقنت تصميم نماذج البيانات (Data Modeling) للتطبيقات التفاعلية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "عرّف إشارة seats داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "readonly seats = signal([ { id: 'A1', booked: false }, { id: 'A2', booked: true }, { id: 'A3', booked: false } ]);",
        "expected": "readonly seats = signal",
        "task": "أضف سطر إشارة المقاعد داخل كلاس App ثم شغّل وافحص.",
        "benefit": "أنشأت محرك حالة مقاعد السينما التفاعلي بـ Signals."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك إضافة مقاعد إضافية مثل { id: 'B1', booked: false } لتوسيع القاعة.",
        "task": "تأكد من وجود مصفوفة المقاعد في كلاس App.",
        "benefit": "أتقنت إنشاء وإدارة القاعات التفاعلية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما نوع البيانات المستخدم لتمثيل حالة المقعد (محجوز أم متاح)؟",
        "options": [
          "نوع منطقي boolean (true / false)",
          "نوع صورة image",
          "نوع صوت audio"
        ],
        "correct": 0,
        "benefit": "تثبيت استخدام القيم المنطقية boolean لحالات العناصر.",
        "task": "ما نوع البيانات المستخدم لتمثيل حالة المقعد (محجوز أم متاح)؟"
      }
    ]
  },
  {
    "id": "cinema-seat-toggle",
    "phase": "مشروع سينما النجوم المتكامل",
    "title": "دالة حجز المقعد عند النقر",
    "concept": "كتابة دالة تفاعلية toggleSeat لعكس حالة المقعد عند النقر عليه من متاح إلى محجوز باستخدام seats.update().",
    "flow": "نقر على المقعد ⟶ toggleSeat(id) ⟶ عكس حالة booked ⟶ تغير لون المقعد فوريًا",
    "task": "أضف دالة تبديل حالة المقعد toggleSeat داخل كلاس App في src/app/app.ts.",
    "file": "src/app/app.ts",
    "code": "toggleSeat(seatId: string): void { this.seats.update(list => list.map(s => s.id === seatId ? { ...s, booked: !s.booked } : s)); }",
    "expected": "toggleSeat(seatId: string): void",
    "reference": "https://angular.dev/guide/signals#updating-signals",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "عندما ينقر الزائر على مقعد متاح في الشاشة، يجب أن يتحول لونه فورًا إلى اللون الأخضر المختار ويصبح محجوزًا باسمه. هذه الدالة هي المسؤولة عن ذلك!",
        "flow": "نقرة مقعد A1 ⟶ استدعاء toggleSeat('A1') ⟶ تحديث الإشارة ⟶ تحديث لون المقعد",
        "task": "افتح src/app/app.ts لإضافة دالة تبديل حالة المقعد.",
        "benefit": "تعلمت كيفية تحديث العناصر الفردية داخل مصفوفات الإشارات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح التحديث الثابت بـ Array.map",
        "explanation": "نستخدم دالة map لإنشاء مصفوفة جديدة معدلة تحافظ على ثبات البيانات (Immutability). المقعد المطابق نعكس حالته !s.booked وباقي المقاعد تبقى كما هي.",
        "flow": "s.id === seatId ? { ...s, booked: !s.booked } : s",
        "task": "تأمل دقة وأناقة البرمجة الوظيفية Functional Programming في TypeScript.",
        "benefit": "أتقنت تحديث عناصر المصفوفات بطريقة برمجية احترافية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف دالة toggleSeat داخل كلاس App في src/app/app.ts.",
        "file": "src/app/app.ts",
        "code": "toggleSeat(seatId: string): void { this.seats.update(list => list.map(s => s.id === seatId ? { ...s, booked: !s.booked } : s)); }",
        "expected": "toggleSeat(seatId: string): void",
        "task": "أضف الدالة داخل كلاس App ثم اضغط (شغّل وافحص).",
        "benefit": "بنيت دالة حجز واختيار المقاعد التفاعلية بنجاح."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "هذه الدالة تسمح للزائر أيضاً بإلغاء اختيار المقعد إذا نقر عليه مرة أخرى بكل سهولة.",
        "task": "تأكد من تعريف دالة toggleSeat بنجاح.",
        "benefit": "أتقنت التفاعل الديناميكي المتقدم مع عناصر الواجهة."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا تفعل علامة التعجب قبل الخاصية !s.booked؟",
        "options": [
          "تعكس القيمة المنطقية (تحول true إلى false والعكس)",
          "تقوم بمسح المقعد نهائيًا",
          "تزيد السعر بمقدار الضعف"
        ],
        "correct": 0,
        "benefit": "فهم عامل النفي المنطقي Logical NOT (!).",
        "task": "ماذا تفعل علامة التعجب قبل الخاصية !s.booked؟"
      }
    ]
  },
  {
    "id": "cinema-checkout-ticket",
    "phase": "مشروع سينما النجوم المتكامل",
    "title": "بطاقة التذكرة النهائية مع تفاصيل الحجز",
    "concept": "تجميع كل عناصر الحجز (اسم العميل، الفيلم المختار، عدد التذاكر، السعر النهائي) في بطاقة تذكرة سينما ذهبية أنيقة جاهزة للعرض والطباعة.",
    "flow": "بيانات الحجز المكتملة ⟶ تجميع في بطاقة التذكرة ⟶ بطاقة سينما فاخرة مع كود الحجز",
    "task": "أضف تصميم بطاقة التذكرة النهائية في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<div class=\"final-ticket-card\"><h3>تذكرة سينما النجوم الذهبية</h3><p>العميل: {{ customerName }}</p><p>الإجمالي: {{ totalPrice() }} ج.م</p></div>",
    "expected": "<div class=\"final-ticket-card\">",
    "reference": "https://angular.dev/guide/templates",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "هنا تتجلى ثمرة كل ما تعلمته! نجمع اسم العميل، والفيلم، وعدد التذاكر، والسعر المحسوب في بطاقة تذكرة سينمائية ذهبية أنيقة وواضحة المعالم.",
        "flow": "الاسم + التذاكر + السعر بـ Signals ⟶ تذكرة سينما متكاملة ومبهرة",
        "task": "انتقل إلى ملف src/app/app.html لإضافة بطاقة التذكرة.",
        "benefit": "شاهدت تجميع كل أجزاء التطبيق في ناتج نهائي متكامل."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح بطاقة التذكرة",
        "explanation": "البطاقة تستخدم كلاس final-ticket-card ذو التنسيق الذهبي والحدود المنحنية، مع عرض القيم الديناميكية عبر الأقواس المزدوجة {{ }}.",
        "flow": "<div class=\"final-ticket-card\"> ⟶ بطاقة تذكرة سينما جاهزة للطباعة",
        "task": "لاحظ كيف تقرأ التذكرة القيم اللحظية فور تعديلها من المستخدم.",
        "benefit": "أتقنت تنسيق وعرض بطاقات المخرجات النهائية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف بطاقة التذكرة في نهاية ملف src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<div class=\"final-ticket-card\"><h3>تذكرة سينما النجوم الذهبية</h3><p>العميل: {{ customerName }}</p><p>الإجمالي: {{ totalPrice() }} ج.م</p></div>",
        "expected": "<div class=\"final-ticket-card\">",
        "task": "أضف كود بطاقة التذكرة ثم اضغط (شغّل وافحص) وشاهد التذكرة الذهبية في المعاينة!",
        "benefit": "ظهرت بطاقة تذكرة سينما النجوم الذهبية في المعاينة الحية."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "اكتب اسمك في حقل الاسم، وراقب كيف يظهر اسمك فوراً داخل بطاقة التذكرة الذهبية في نفس اللحظة!",
        "task": "اكتب اسمك في المعاينة وشاهد التذكرة تتحدث فوراً.",
        "benefit": "شعرت بقمة التفاعل والمزامنة الحية في Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "كيف تعرض بطاقة التذكرة السعر الإجمالي المحسوب عبر computed؟",
        "options": [
          "باستدعائه كدالة عبر الأقواس: {{ totalPrice() }}",
          "بكتابة كلمة price الثابتة",
          "بالنقر المزدوج على الشاشة"
        ],
        "correct": 0,
        "benefit": "تثبيت استدعاء الإشارات المحسوبة في القوالب النهائية.",
        "task": "كيف تعرض بطاقة التذكرة السعر الإجمالي المحسوب عبر computed؟"
      }
    ]
  },
  {
    "id": "cinema-success-alert",
    "phase": "مشروع سينما النجوم المتكامل",
    "title": "رسالة إتمام الحجز والاحتفال بالنجاح",
    "concept": "إظهار إشعار تأكيد جذاب ومتحرك يهنئ الزائر بإتمام حجز التذكرة وحفظ مقاعده بنجاح.",
    "flow": "تأكيد الحجز ⟶ ظهور رسالة نجاح خضراء مبهجة: ✨ تم تأكيد حجزك بنجاح!",
    "task": "أضف رسالة تأكيد الحجز في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "<div class=\"booking-confirmed\">✨ تم تأكيد حجزك بنجاح! نتمنى لك مشاهدة ممتعة في سينما النجوم.</div>",
    "expected": "<div class=\"booking-confirmed\">",
    "reference": "https://angular.dev/guide/templates/control-flow",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "اللمسة الختامية لتجربة الزائر هي رسالة النجاح والتهنئة التي تطمئنه بأن مقاعده قد حُجزت وتتمنى له مشاهدة ممتعة!",
        "flow": "إتمام الحجز ⟶ إشعار تأكيد مبهج ⟶ تجربة مستخدم متكاملة وممتعة 10/10",
        "task": "انتقل إلى ملف src/app/app.html لإضافة رسالة النجاح.",
        "benefit": "أتقنت إضافة اللمسات الاحتفالية النهائية لتجارب المستخدم."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح رسالة التأكيد",
        "explanation": "نستخدم كلاس booking-confirmed ذو اللون الأخضر الزمردي والأيقونة المضيئة مع رسالة ترحيبية مهذبة ومريحة.",
        "flow": "<div class=\"booking-confirmed\">...</div>",
        "task": "لاحظ التنسيق الراقي لرسائل التأكيد.",
        "benefit": "تعلمت تصميم رسائل النجاح الاحترافية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف رسالة التأكيد في نهاية ملف src/app/app.html.",
        "file": "src/app/app.html",
        "code": "<div class=\"booking-confirmed\">✨ تم تأكيد حجزك بنجاح! نتمنى لك مشاهدة ممتعة في سينما النجوم.</div>",
        "expected": "<div class=\"booking-confirmed\">",
        "task": "أضف كود رسالة التأكيد ثم اضغط (شغّل وافحص).",
        "benefit": "أضفت رسالة النجاح المبهجة في تطبيق السينما."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "تأمل كيف اكتمل تطبيق حجز سينما النجوم وأصبح جاهزاً للعمل بكامل عناصره وتفاعلاته!",
        "task": "تأمل التطبيق المكتمل في شاشة المعاينة الحية.",
        "benefit": "شعرت بفخر إنجاز تطبيق سينما حقيقي تفاعلي من الصفر."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الأثر الإيجابي لرسائل التأكيد المبهجة بعد إتمام العمليات المهمة؟",
        "options": [
          "تطمئن المستخدم وتؤكد له نجاح العملية وتترك انطباعاً إيجابياً راقياً",
          "تزيد من استهلاك باقة الإنترنت",
          "تمنع الزائر من العودة للموقع"
        ],
        "correct": 0,
        "benefit": "فهم القيمة النفسية لرسائل النجاح في واجهات المستخدم.",
        "task": "ما الأثر الإيجابي لرسائل التأكيد المبهجة بعد إتمام العمليات المهمة؟"
      }
    ]
  },
  {
    "id": "testing-component",
    "phase": "الجودة والاختبارات ونشر المشروع",
    "title": "اختبار جودة المكون بـ Vitest",
    "concept": "كتابة اختبار تلقائي سريع يتحقق من أن عنوان تطبيق السينما يظهر بشكل صحيح، مما يضمن خلو الكود من الأخطاء عند التطوير المستقبلي.",
    "flow": "تشغيل ng test ⟶ فحص مكون App ⟶ اجتياز الاختبار بنسبة 100%",
    "task": "تحقق من اختبار عنوان التطبيق داخل src/app/app.spec.ts.",
    "file": "src/app/app.spec.ts",
    "code": "expect(app.title).toContain('سينما');",
    "expected": "expect(app.title).toContain('سينما');",
    "reference": "https://angular.dev/guide/testing",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "المطور المحترف لا يكتفي بتشغيل الكود بالعين فقط، بل يكتب اختبارات آلية تفحص الواجهة والمنطق ذاتياً وتضمن ألا يفسد أي تعديل جديد الميزات السابقة!",
        "flow": "كود التطبيق + ملف الاختبار spec.ts ⟶ تشغيل الاختبار الآلي ⟶ علامة صح خضراء ✓",
        "task": "افتح src/app/app.spec.ts في شجرة الملفات.",
        "benefit": "فهمت أهمية الاختبارات الآلية (Automated Testing) في الشركات الكبرى."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح كود الفحص expect",
        "explanation": "نستخدم عبارة expect(app.title).toContain('سينما') للتأكد من أن عنوان المكون يحتوي بالفعل على كلمة سينما. إذا تغير بالخطأ يفشل الاختبار فوراً لتنبيهك.",
        "flow": "expect(قيمة).toBe(المتوقع) ⟶ تأكيد صحة الكود بنسبة 100%",
        "task": "لاحظ سرعة وكفاءة إطار الاختبارات الحديث Vitest مع Angular.",
        "benefit": "تعلمت كتابة وفحص اختبارات المكونات الآلية."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف سطر اختبار التحقق من العنوان في src/app/app.spec.ts.",
        "file": "src/app/app.spec.ts",
        "code": "expect(app.title).toContain('سينما');",
        "expected": "expect(app.title).toContain('سينما');",
        "task": "اكتب كود الاختبار ثم اضغط (شغّل وافحص).",
        "benefit": "أضفت أول اختبار آلي يضمن جودة تطبيقك السينمائي."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك تشغيل أمر ng test في نافذة الأوامر لرؤية نتائج الفحص الخضراء.",
        "task": "تأكد من وجود سطر expect بنجاح في ملف الاختبار.",
        "benefit": "أصبحت مطوراً يعتمد أعلى معايير الجودة البرمجية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما الفائدة الأساسية من كتابة اختبارات الوحدة Unit Tests في مشاريع Angular؟",
        "options": [
          "ضمان عمل الميزات بشكل صحيح ومنع ظهور أخطاء غير متوقعة عند تعديل الكود",
          "لجعل ألوان الموقع أكثر سطوعاً",
          "لتوفير مساحة على القرص الصلب"
        ],
        "correct": 0,
        "benefit": "ترسيخ أهمية اختبارات الجودة في هندسة البرمجيات.",
        "task": "ما الفائدة الأساسية من كتابة اختبارات الوحدة Unit Tests في مشاريع Angular؟"
      }
    ]
  },
  {
    "id": "performance-defer",
    "phase": "الجودة والاختبارات ونشر المشروع",
    "title": "تحسين سرعة التطبيق بـ `@defer`",
    "concept": "ميزة @defer تؤجل تحميل الأجزاء الثقيلة من الصفحة حتى يحتاجها المستخدم أو تظهر على الشاشة لتسريع فتح الموقع فورًا.",
    "flow": "@defer (on idle) ⟶ تحميل جزء المقاعد فقط في وقت الفراغ دون تعطيل الصفحة الأولى",
    "task": "أضف كتلة @defer حول قسم المقاعد في src/app/app.html.",
    "file": "src/app/app.html",
    "code": "@defer (on idle) { <section class=\"deferred-seats\">تفاصيل القاعة جاهزة</section> }",
    "expected": "@defer (on idle)",
    "reference": "https://angular.dev/guide/templates/defer",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "السرعة هي كل شيء على الويب! ميزة @defer الحصرية في Angular الحديثة تسمح لك بتأجيل تحميل المكونات الثانوية حتى ينتهي تحميل الواجهة الرئيسية، مما يجعل موقعك يفتح كالبرق!",
        "flow": "فتح فوري للصفحة الرئيسية ⟶ @defer ⟶ تحميل المكونات الثانوية في الخلفية",
        "task": "انتقل إلى ملف src/app/app.html لتطبيق ميزة @defer.",
        "benefit": "تعلمت أحدث تقنيات تحسين سرعة الأداء (Web Performance Optimization)."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح محفزات @defer",
        "explanation": "يمكن تحديد متى يبدأ التحميل: مثلاً (on idle) عند خمول المتصفح، أو (on viewport) عند نزول الزائر للجزء، أو (on interaction) عند النقر.",
        "flow": "@defer (on idle) { المكون المؤجل }",
        "task": "قارن سهولة @defer مقارنة بأساليب Lazy Loading القديمة المعقدة.",
        "benefit": "أتقنت استخدام كتل التحميل الكسول المتقدمة."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "أضف كتلة @defer في src/app/app.html.",
        "file": "src/app/app.html",
        "code": "@defer (on idle) { <section class=\"deferred-seats\">تفاصيل القاعة جاهزة</section> }",
        "expected": "@defer (on idle)",
        "task": "أضف كود @defer ثم اضغط (شغّل وافحص).",
        "benefit": "طبقت أرقى تقنيات تسريع الأداء في مشروعك."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "تأمل كيف يمنحك Angular أدوات احترافية تجعل موقعك منافساً لأضخم منصات الويب العالمية في السرعة.",
        "task": "تأكد من تطبيق كتلة @defer بنجاح.",
        "benefit": "أصبحت خبيراً في تسريع استجابة تطبيقات Angular."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا تفعل كتلة @defer في قوالب Angular الحديثة؟",
        "options": [
          "تؤجل تحميل كود الجزء المحدد حتى يتحقق شرط معين لتسريع الفتح الأولي للموقع",
          "تقوم بمسح ملفات المشروع القديمة",
          "تمنع الزائر من النقر على الأزرار"
        ],
        "correct": 0,
        "benefit": "حفظ دور ميزة @defer لتسريع التطبيقات.",
        "task": "ماذا تفعل كتلة @defer في قوالب Angular الحديثة؟"
      }
    ]
  },
  {
    "id": "production-build",
    "phase": "الجودة والاختبارات ونشر المشروع",
    "title": "بناء نسخة الإنتاج الجاهزة للنشر (`ng build`)",
    "concept": "تشغيل أمر البناء لتجميع وتقليص كود التطبيق بالكامل إلى ملفات HTML و JS فائقة السرعة والصغر وجاهزة للنشر على أي استضافة عالمية.",
    "flow": "ng build ⟶ ضغط الكود وإزالة الزوائد ⟶ مجلد dist/ الجاهز للإطلاق العالمي",
    "task": "نفّذ أمر بناء نسخة الإنتاج للمشروع في نافذة الأوامر.",
    "command": "npm run build",
    "expected": "Application bundle generation complete",
    "reference": "https://angular.dev/tools/cli/build",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "أثناء التطوير، يكون الكود مقسماً لملفات متعددة لسهولة القراءة. عند الإطلاق للإنتاج، يقوم أمر ng build بدمج وضغط وتقليص الكود لأصغر حجم ممكن وأعلى سرعة!",
        "flow": "كود التطوير ⟶ أمر ng build ⟶ تجميع + تقليص + تحسين ⟶ ملفات dist/ الجاهزة للنشر",
        "task": "تفقد نافذة الأوامر Terminal بالأسفل لتنفيذ أمر البناء.",
        "benefit": "فهمت مرحلة بناء الإنتاج (Production Build) والتحضير للنشر."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "تشريح مخرجات أمر البناء",
        "explanation": "المخرجات تظهر في مجلد dist/؛ ملفات HTML و CSS و JS صغيرة جداً لا تتعدى كيلوبايتات معدودة، مع تجزئة الكود (Tree-Shaking) لحذف أي كود غير مستخدم.",
        "flow": "Tree-Shaking + Minification = تطبيق فائق السرعة",
        "task": "لاحظ كيف يُنتج Angular كودًا خفيفًا وصديقًا لمحركات البحث والشبكات الضعيفة.",
        "benefit": "تعلمت كيف تصبح تطبيقاتك خفيفة وسريعة التحميل في أي مكان بالعالم."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "نفّذ أمر npm run build في موجه الأوامر بالأسفل.",
        "command": "npm run build",
        "expected": "Application bundle generation complete",
        "task": "اضغط (شغّل وافحص) لتنفيذ أمر البناء ومراقبة نجاح التجميع.",
        "benefit": "أنتجت النسخة النهائية لتطبيق السينما الجاهزة للرفع على الإنترنت."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "شاهد رسالة 'Application bundle generation complete' التي تؤكد اكتمال البناء بنجاح 100%.",
        "task": "تأمل رسالة نجاح البناء في نافذة الترمينال.",
        "benefit": "أتقنت تشغيل أوامر Angular CLI للإنتاج."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ماذا ينتج عن تشغيل أمر البناء ng build الخاص بالإنتاج؟",
        "options": [
          "ملفات مجمعة ومضغوطة فائقة السرعة داخل مجلد dist/ جاهزة للنشر على أي استضافة",
          "حذف المشروع بأكمله",
          "إعادة تثبيت نظام التشغيل"
        ],
        "correct": 0,
        "benefit": "تثبيت وظيفة أمر البناء ng build.",
        "task": "ماذا ينتج عن تشغيل أمر البناء ng build الخاص بالإنتاج؟"
      }
    ]
  },
  {
    "id": "final-review",
    "phase": "مشروع التخرج",
    "title": "مشروع التخرج: مراجعة تطبيق سينما النجوم المتكامل",
    "concept": "مبروك! قمت ببناء تطبيق سينما حقيقي تفاعلي من الصفر المطلق باستخدام أحدث ميزات Angular 22: Signals وControl Flow والمكونات والخدمات والتحقق والنماذج.",
    "flow": "البداية من الصفر ⟶ تفاعل ومكونات ⟶ إشارات Signals ⟶ تطبيق سينما كامل جاهز للنشر 🎓",
    "task": "تفقد ملفات التطبيق الكاملة في المحرر وشاهد تطبيقك يعمل بكل أناقة.",
    "file": "src/app/app.ts",
    "code": "// مبروك إتمام مسار Angular من الصفر إلى تطبيق جاهز للنشر!",
    "expected": "// مبروك إتمام مسار Angular من الصفر إلى تطبيق جاهز للنشر!",
    "reference": "https://angular.dev/",
    "steps": [
      {
        "id": "idea",
        "type": "observe",
        "title": "الفكرة الأساسية ومخطط التدفق",
        "explanation": "يا له من إنجاز رائع! لقد بدأت من الصفر تماماً وتعرفت على ما هو Angular والمكونات وقوالب HTML وعزل التنسيقات، ثم تقدمت باحترافية نحو ربط البيانات، والـ Signals التفاعلية، والشروط والتكرار الحديث، وبنيت تطبيق سينما النجوم المتكامل بيدك!",
        "flow": "البداية من الصفر ⟶ تفاعل ومكونات ⟶ إشارات Signals ⟶ تطبيق سينما كامل جاهز للنشر 🎓",
        "task": "شاهد مشروعك يعمل أمامك في شاشة المعاينة الحية واستمتع بالنتيجة.",
        "benefit": "حققت قفزة هائلة من المبتدئ إلى مطور Angular متقن لأحدث التقنيات."
      },
      {
        "id": "anatomy",
        "type": "observe",
        "title": "مراجعة مهاراتك المكتسبة",
        "explanation": "أصبحت تتقن: Standalone Components، قوالب HTML و CSS المعزول، Signals (signal, update, computed)، Control Flow (@if, @for, @empty)، النماذج ثنائية الاتجاه [(ngModel)]، الخدمات المركزية و inject()، والراوتر ونوافذ العرض، واختبارات الجودة وبناء الإنتاج!",
        "flow": "مهارات حقيقية + كود قياسي نظيف = جاهزية لسوق العمل والمشاريع الكبرى",
        "task": "تأمل شجرة ملفات مشروع السينما التي بنيتها بيدك خطوة بخطوة.",
        "benefit": "اكتسبت ترسانة تقنية حديثة تجعلك مميزًا بين مطوري الويب."
      },
      {
        "id": "practice",
        "type": "build",
        "title": "اكتب وطبّق في المحرر",
        "explanation": "ضع سطر التهنئة الختامي داخل كلاس App في src/app/app.ts واحتفل بإنجازك!",
        "file": "src/app/app.ts",
        "code": "// مبروك إتمام مسار Angular من الصفر إلى تطبيق جاهز للنشر!",
        "expected": "// مبروك إتمام مسار Angular من الصفر إلى تطبيق جاهز للنشر!",
        "task": "أضف سطر التهنئة ثم اضغط (شغّل وافحص) لتوثيق إكمال المسار بنجاح!",
        "benefit": "أكملت مسار Angular بالكامل واجتزت جميع محطاته التطبيقية بنجاح 100%."
      },
      {
        "id": "experiment",
        "type": "edit",
        "title": "تعديل موجّه وتجربة تفاعلية",
        "explanation": "يمكنك الآن تنزيل المشروع كملف ZIP بالكامل عبر زر 'نزّل ZIP' وتشغيله على جهازك ومشاركته مع زملائك أو رفعه على GitHub!",
        "task": "جرّب تصدير المشروع أو استعراض كل ميزاته التفاعلية في المعاينة.",
        "benefit": "أصبح لديك مشروع بورتفوليو سينمائي متكامل تفخر به في سيرتك الذاتية."
      },
      {
        "id": "quiz",
        "type": "quiz",
        "title": "تأكد من الفكرة بسؤال سريع",
        "question": "ما هي النصيحة الذهبية لمواصلة رحلتك الاحترافية في عالم Angular؟",
        "options": [
          "الاستمرار في بناء المشاريع الحقيقية وتطبيق أحدث المعايير ومتابعة توثيق Angular الرسمي",
          "التوقف عن البرمجة نهائيًا",
          "نسيان ما تعلمته"
        ],
        "correct": 0,
        "benefit": "مستقبل مشرق ينتظرك كمطور ويب محترف في Angular!",
        "task": "ما هي النصيحة الذهبية لمواصلة رحلتك الاحترافية في عالم Angular؟"
      }
    ]
  }
]
};

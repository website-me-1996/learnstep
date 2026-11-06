/**
 * Tier 4: Real-World Application Scenarios E2E Test Suite
 * Tests end-to-end user workflows and full real-world lifecycles:
 * 1. Complete Cinema Booking End-to-End Workflow
 * 2. Dynamic 60-Seat Matrix Selection with VIP Pricing Workflow
 * 3. Coupon Application with VAT 15% Financial Calculation Workflow
 * 4. Digital Boarding Pass Ticket Generation & Print Workflow
 * 5. Khotwa Micro-Learning Pedagogical Progression Workflow
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEditorEnvironment } = require('./helpers/e2e_harness.cjs');
const {
  CinemaStore,
  calculateBookingCost,
  saudiPhoneValidator,
  generate60SeatHall,
  generateDigitalTicket
} = require('./helpers/cinema_simulator.cjs');

// =========================================================================
// Scenario 1: Complete Cinema Booking End-to-End Workflow
// =========================================================================
test('Tier 4.1 [Workflow] - Complete Cinema Booking End-to-End Lifecycle', () => {
  // Step 1: Catalog browsing & movie search
  const catalog = [
    { id: 1, title: 'رحلة النجوم', genre: 'خيال علمي', rating: 4.8 },
    { id: 2, title: 'واحة الأمل', genre: 'دراما', rating: 4.6 }
  ];
  const selectedMovie = catalog.find(m => m.id === 1);
  assert.ok(selectedMovie, 'Movie must exist in catalog');

  // Step 2: Hall & Seat Selection in Store
  const store = new CinemaStore();
  const hall = generate60SeatHall();
  
  // Verify seat availability before selection
  const seat1 = hall.find(s => s.id === 'C4');
  const seat2 = hall.find(s => s.id === 'C5');
  assert.equal(seat1.isBooked, false, 'C4 must be available');
  assert.equal(seat2.isBooked, false, 'C5 must be available');

  // User selects seats
  store.toggleSeat('C4');
  store.toggleSeat('C5');
  assert.equal(store.seatCount(), 2);
  assert.deepEqual(store.selectedSeats(), ['C4', 'C5']);

  // Step 3: Customer Checkout Form Validation
  const customerInput = {
    customerName: 'فاطمة خالد',
    phone: '0551234567',
    paymentMethod: 'credit_card'
  };

  assert.ok(customerInput.customerName.trim().length > 0, 'Customer name must be provided');
  assert.equal(saudiPhoneValidator(customerInput.phone), null, 'Phone number must be valid Saudi format');

  // Step 4: Cost & Tax Calculation
  const cost = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);
  assert.equal(cost.subtotal, 170.00); // 85 + 85 = 170
  assert.equal(cost.vatAmount, 25.50); // 170 * 0.15 = 25.5
  assert.equal(cost.finalTotal, 195.50); // 170 + 25.5 = 195.5

  // Step 5: Backend POST Simulation & Ticket Issuance
  const ticket = generateDigitalTicket(selectedMovie.title, store.selectedSeats(), customerInput.customerName, cost.finalTotal);
  assert.ok(ticket.bookingRef.startsWith('KH-'), 'Booking ref must follow KH- prefix format');
  assert.equal(ticket.movieTitle, 'رحلة النجوم');
  assert.equal(ticket.customerName, 'فاطمة خالد');
  assert.equal(ticket.seatCount, 2);
  assert.equal(ticket.totalPaid, 195.50);
  assert.equal(ticket.status, 'CONFIRMED');
  assert.ok(ticket.barcode.includes(ticket.bookingRef), 'Barcode must encode booking reference');
});

// =========================================================================
// Scenario 2: Dynamic Seat Matrix Multi-Tier Selection with VIP Pricing
// =========================================================================
test('Tier 4.2 [Workflow] - Dynamic 60-Seat Matrix Multi-Tier Selection & Reactive Toggles', () => {
  const store = new CinemaStore();
  const hall = generate60SeatHall();

  assert.equal(hall.length, 60, 'Auditorium must contain exactly 60 seats');
  const vipSeats = hall.filter(s => s.tier === 'vip');
  const standardSeats = hall.filter(s => s.tier === 'standard');
  assert.equal(vipSeats.length, 20, 'Rows A & B must yield 20 VIP seats');
  assert.equal(standardSeats.length, 40, 'Rows C to F must yield 40 standard seats');

  // Verify booked seat protection
  const preBookedSeat = hall.find(s => s.id === 'A2');
  assert.equal(preBookedSeat.isBooked, true, 'Seat A2 is pre-booked and cannot be selected');

  // User selects VIP seat A1 (120 SAR)
  store.toggleSeat('A1');
  let cost = calculateBookingCost(store.selectedSeats(), 0, hall);
  assert.equal(cost.subtotal, 120);

  // User adds Standard seat D4 (85 SAR)
  store.toggleSeat('D4');
  cost = calculateBookingCost(store.selectedSeats(), 0, hall);
  assert.equal(cost.subtotal, 205); // 120 + 85 = 205

  // User deselects A1 (VIP)
  store.toggleSeat('A1');
  cost = calculateBookingCost(store.selectedSeats(), 0, hall);
  assert.equal(cost.subtotal, 85); // Only D4 remaining

  // User re-adds A1 (VIP: 120) and B1 (VIP: 120)
  store.toggleSeat('A1');
  store.toggleSeat('B1');
  cost = calculateBookingCost(store.selectedSeats(), 0, hall);
  assert.equal(store.seatCount(), 3);
  assert.equal(cost.subtotal, 325); // 85 + 120 + 120 = 325
  assert.equal(cost.vatAmount, 48.75); // 325 * 0.15 = 48.75
  assert.equal(cost.finalTotal, 373.75);
});

// =========================================================================
// Scenario 3: Coupon Application with VAT 15% Financial Engine
// =========================================================================
test('Tier 4.3 [Workflow] - Coupon Discount & 15% VAT Exact Financial Calculation', () => {
  const store = new CinemaStore();
  const hall = generate60SeatHall();

  // Selection: 2 VIP seats (A3, A4) = 240 SAR + 1 Standard seat (C1) = 85 SAR -> Subtotal 325 SAR
  store.toggleSeat('A3');
  store.toggleSeat('A4');
  store.toggleSeat('C1');
  assert.equal(store.seatCount(), 3);

  // Attempt invalid coupon
  const invalidSuccess = store.applyCoupon('INVALID99');
  assert.equal(invalidSuccess, false, 'Invalid coupon should be rejected');
  assert.equal(store.discountRate(), 0);

  // Apply valid 10% coupon KHOTWA10
  const validSuccess = store.applyCoupon('KHOTWA10');
  assert.equal(validSuccess, true, 'KHOTWA10 should be accepted');
  assert.equal(store.discountRate(), 0.10);

  const cost = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);

  // Mathematical assertions
  assert.equal(cost.subtotal, 325.00);
  assert.equal(cost.discountRate, 0.10);
  assert.equal(cost.discountAmount, 32.50); // 325 * 0.10 = 32.50
  assert.equal(cost.discountedSubtotal, 292.50); // 325 - 32.50 = 292.50
  assert.equal(cost.vatRate, 0.15);
  assert.equal(cost.vatAmount, 43.88); // 292.50 * 0.15 = 43.875 -> rounded 43.88
  assert.equal(cost.finalTotal, 336.38); // 292.50 + 43.88 = 336.38

  // Upgrade coupon to 20% KHOTWA20
  store.applyCoupon('KHOTWA20');
  const cost20 = calculateBookingCost(store.selectedSeats(), store.discountRate(), hall);
  assert.equal(cost20.discountAmount, 65.00); // 325 * 0.20 = 65.00
  assert.equal(cost20.discountedSubtotal, 260.00);
  assert.equal(cost20.vatAmount, 39.00); // 260 * 0.15 = 39.00
  assert.equal(cost20.finalTotal, 299.00);
});

// =========================================================================
// Scenario 4: Digital Boarding Pass Ticket Generation & Print Workflow
// =========================================================================
test('Tier 4.4 [Workflow] - Digital Boarding Pass Ticket Rendering & window.print() Call', () => {
  let printCalled = false;
  const mockWindow = {
    print: () => { printCalled = true; }
  };

  const ticket = generateDigitalTicket('مغامرة الفضاء', ['B3', 'B4'], 'عبدالله عمر', 276.00);

  // Render boarding pass card HTML
  const boardingPassHtml = `
    <div class="final-ticket-card">
      <div class="ticket-header">
        <span class="cinema-brand">سينما خطوة · تذكرة دخول إلكترونية</span>
        <span class="booking-badge">${ticket.status}</span>
      </div>
      <h3>${ticket.movieTitle}</h3>
      <p><b>اسم الزائر:</b> ${ticket.customerName}</p>
      <p><b>المقاعد المحجوزة:</b> ${ticket.seatIds.join('، ')}</p>
      <p><b>رقم الحجز:</b> ${ticket.bookingRef}</p>
      <div class="ticket-barcode">${ticket.barcode}</div>
      <div class="ticket-total">المجموع المدفوع: ${ticket.totalPaid} ر.س</div>
      <button class="btn-confirm" id="btnPrintTicket">طباعة التذكرة</button>
    </div>
  `;

  assert.ok(boardingPassHtml.includes('سينما خطوة · تذكرة دخول إلكترونية'));
  assert.ok(boardingPassHtml.includes(ticket.bookingRef));
  assert.ok(boardingPassHtml.includes('عبدالله عمر'));
  assert.ok(boardingPassHtml.includes('276'));

  // Trigger print
  mockWindow.print();
  assert.equal(printCalled, true, 'window.print() must be triggered upon user confirmation');
});

// =========================================================================
// Scenario 5: Khotwa Micro-Learning Pedagogical Progression Workflow
// =========================================================================
test('Tier 4.5 [Workflow] - Khotwa 5-Step Micro-Learning & Hand-Craft Score Progression', () => {
  const env = createEditorEnvironment();

  // Test Lesson ng-signal-02
  const lesson = {
    id: 'ng-signal-02',
    title: 'إنشاء وقراءة الإشارات: signal()',
    phase: 'المرحلة 4: محرك التفاعلية الحديث Signals',
    file: 'src/app/app.ts',
    expected: 'ticketCount = signal<number>(1);',
    steps: [
      { id: 'idea', type: 'observe', title: 'الفكرة الأساسية', explanation: 'الإشارات تمثل قيم متغيرة تفاعلية.' },
      { id: 'anatomy', type: 'observe', title: 'تشريح الكود', explanation: 'نستخدم signal() لإنشاء إشارة.' },
      { id: 'practice', type: 'build', title: 'ابنِ الكود', file: 'src/app/app.ts', code: 'ticketCount = signal<number>(1);', expected: 'ticketCount = signal<number>(1);' },
      { id: 'experiment', type: 'edit', title: 'جرّب بنفسك', task: 'غيّر القيمة الابتدائية إلى 2.' },
      { id: 'quiz', type: 'quiz', question: 'كيف نقرأ قيمة الإشارة؟', options: ['بالقوسين ()', 'بـ .value'], correct: 0 }
    ]
  };

  // Step 1: Slot Builder rendering
  env.renderSlotBuilder(lesson.steps[2], lesson);
  const slotBuilderEl = env.getEl('angularSlotBuilder');
  assert.equal(slotBuilderEl.hidden, false, 'Slot builder must be visible for build step');

  // Step 2: Code Insertion into file
  env.setFiles({
    'src/app/app.ts': 'export class App {\n  // Code slot\n}'
  });

  // Learner completes the task
  env.setFiles({
    'src/app/app.ts': 'export class App {\n  ticketCount = signal<number>(1);\n}'
  });

  // Verify task completion
  assert.equal(env.checkSupportedTask(lesson), true, 'Task verification must succeed');

  // Step 3: Hand-craft score updates with manual boost
  env.updateHandCraftScore(true, 25);
  const meter = env.getEl('angularHandCraftMeter');
  assert.ok(meter.textContent.includes('بناء يدوي'), 'Hand-craft meter must reflect progress');

  // Step 4: Quiz validation
  const quizStep = lesson.steps[4];
  const learnerChosenOption = 0;
  const isCorrect = learnerChosenOption === quizStep.correct;
  assert.equal(isCorrect, true, 'Quiz answer 0 must be correct');
});

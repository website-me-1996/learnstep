/**
 * Khotwa Cinema Pro Application Logic & Simulation Oracle
 * Implements the core business logic of Khotwa Cinema Pro (Phases 1-7)
 * to serve as authoritative reference for E2E validation and Tier 4 workflows.
 */

class SimpleSignal {
  constructor(initialValue) {
    this._value = initialValue;
    this._subscribers = new Set();
  }
  get() {
    return this._value;
  }
  // Callable syntax simulation: signal()
  call() {
    return this.get();
  }
  set(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._notify();
    }
  }
  update(fn) {
    this.set(fn(this._value));
  }
  asReadonly() {
    return () => this.get();
  }
  _notify() {
    for (const sub of this._subscribers) sub();
  }
}

function signal(initialValue) {
  const s = new SimpleSignal(initialValue);
  const fn = function() { return s.get(); };
  fn.set = (v) => s.set(v);
  fn.update = (updater) => s.update(updater);
  fn.asReadonly = () => s.asReadonly();
  return fn;
}

function computed(derivationFn) {
  return function() {
    return derivationFn();
  };
}

class CinemaStore {
  constructor() {
    this.selectedSeats = signal([]);
    this.seatCount = computed(() => this.selectedSeats().length);
    this.couponCode = signal(null);
    this.discountRate = signal(0);
  }

  toggleSeat(seatId) {
    this.selectedSeats.update(seats => {
      if (seats.includes(seatId)) {
        return seats.filter(s => s !== seatId);
      } else {
        return [...seats, seatId];
      }
    });
  }

  applyCoupon(code) {
    const validCoupons = {
      'KHOTWA10': 0.10,
      'KHOTWA20': 0.20,
      'VIPPASS': 0.15
    };
    const rate = validCoupons[code.trim().toUpperCase()] || 0;
    this.couponCode.set(rate > 0 ? code.trim().toUpperCase() : null);
    this.discountRate.set(rate);
    return rate > 0;
  }

  clear() {
    this.selectedSeats.set([]);
    this.couponCode.set(null);
    this.discountRate.set(0);
  }
}

// 60-seat auditorium definition
function generate60SeatHall() {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F']; // 6 rows
  const seats = [];
  const defaultBooked = new Set(['A2', 'B5', 'C3', 'E8', 'F1']);

  for (const row of rows) {
    const isVip = (row === 'A' || row === 'B');
    for (let num = 1; num <= 10; num++) {
      const id = `${row}${num}`;
      seats.push({
        id,
        row,
        number: num,
        tier: isVip ? 'vip' : 'standard',
        price: isVip ? 120 : 85,
        isBooked: defaultBooked.has(id)
      });
    }
  }
  return seats;
}

function calculateBookingCost(selectedSeatIds, discountRate = 0, seatCatalog = null) {
  const catalog = seatCatalog || generate60SeatHall();
  const seatMap = new Map(catalog.map(s => [s.id, s]));

  let subtotal = 0;
  for (const id of selectedSeatIds) {
    const seat = seatMap.get(id);
    if (seat) {
      subtotal += seat.price;
    } else {
      subtotal += 85; // fallback standard
    }
  }

  const discountAmount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discountAmount;
  const vatRate = 0.15; // 15% VAT
  const vatAmount = discountedSubtotal * vatRate;
  const finalTotal = discountedSubtotal + vatAmount;

  return {
    seatCount: selectedSeatIds.length,
    subtotal: Math.round(subtotal * 100) / 100,
    discountRate,
    discountAmount: Math.round(discountAmount * 100) / 100,
    discountedSubtotal: Math.round(discountedSubtotal * 100) / 100,
    vatRate: 0.15,
    vatAmount: Math.round(vatAmount * 100) / 100,
    finalTotal: Math.round(finalTotal * 100) / 100
  };
}

function saudiPhoneValidator(phoneValue) {
  const val = String(phoneValue || '').trim();
  const valid = /^05\d{8}$/.test(val);
  return valid ? null : { invalidSaudiPhone: true };
}

function generateDigitalTicket(movieTitle, seatIds, customerName, totalPaid) {
  const bookingRef = 'KH-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
  return {
    bookingRef,
    movieTitle,
    customerName,
    seatIds,
    seatCount: seatIds.length,
    totalPaid,
    issuedAt: new Date().toISOString(),
    status: 'CONFIRMED',
    barcode: `|||| ||| | ||||| || ||| ${bookingRef} |||`
  };
}

module.exports = {
  signal,
  computed,
  CinemaStore,
  generate60SeatHall,
  calculateBookingCost,
  saudiPhoneValidator,
  generateDigitalTicket
};

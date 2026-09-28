export interface ConfirmedBooking {
  id: string;
  start: string;
  timeZone: string;
  name: string;
  email: string;
  projectSummary: string;
  bookedAt: number;
}

export const BOOKINGS_STORAGE_KEY = 'thinkarq_ai_bookings_v1';

export function getStoredBookings(): ConfirmedBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error loading stored bookings:', err);
    return [];
  }
}

export function saveStoredBooking(booking: ConfirmedBooking): ConfirmedBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredBookings();
    // Avoid duplicate id
    const filtered = existing.filter(b => b.id !== booking.id && b.start !== booking.start);
    const updated = [booking, ...filtered];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('thinkarq_bookings_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error saving booking:', err);
    return [];
  }
}

export function removeStoredBooking(id: string): ConfirmedBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredBookings();
    const updated = existing.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('thinkarq_bookings_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error removing booking:', err);
    return [];
  }
}

import { Appointment } from '../types';

const STORAGE_KEY = 'hb_barbershop_appointments_v1';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored appointments', err);
    return [];
  }
}

export function saveAppointment(appointment: Appointment): void {
  try {
    const existing = getStoredAppointments();
    const updated = [appointment, ...existing.filter(a => a.id !== appointment.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save appointment', err);
  }
}

export function cancelStoredAppointment(id: string): boolean {
  try {
    const existing = getStoredAppointments();
    const updated = existing.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to cancel appointment', err);
    return false;
  }
}

export function findAppointmentByCode(code: string): Appointment | undefined {
  const all = getStoredAppointments();
  const cleanCode = code.trim().toUpperCase();
  return all.find(a => a.bookingCode.toUpperCase() === cleanCode);
}

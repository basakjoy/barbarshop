import { Appointment } from '../types';
import { BARBERSHOP_INFO } from '../data/barbershopData';

/**
 * Format date string (YYYY-MM-DD) and time string (HH:mm) into Date objects
 */
export function getAppointmentDateRange(dateStr: string, startTimeStr: string, durationMinutes: number): { start: Date; end: Date } {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = startTimeStr.split(':').map(Number);

  const start = new Date(year, month - 1, day, hours, minutes, 0);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return { start, end };
}

/**
 * Format a Date object into Google Calendar / iCal compact UTC or local string: YYYYMMDDTHHmmSS
 */
function formatToIsoCompact(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Build Google Calendar URL using exact user booking parameters
 */
export function createGoogleCalendarUrl(appointment: Appointment): string {
  const { start, end } = getAppointmentDateRange(appointment.date, appointment.time, appointment.durationMinutes);
  const dates = `${formatToIsoCompact(start)}/${formatToIsoCompact(end)}`;

  const title = `${appointment.serviceName} at ${BARBERSHOP_INFO.name}`;
  const details = [
    `Appointment Confirmation: ${appointment.bookingCode}`,
    `Service: ${appointment.serviceName} (${appointment.durationMinutes} min)`,
    `Barber: ${appointment.barberName}`,
    `Client: ${appointment.customer.fullName} (${appointment.customer.phone})`,
    `Total: $${appointment.price.toFixed(2)}`,
    appointment.customer.notes ? `Special Notes: ${appointment.customer.notes}` : '',
    '',
    `Location: ${BARBERSHOP_INFO.address}, ${BARBERSHOP_INFO.city}`,
    `Shop Phone: ${BARBERSHOP_INFO.phone}`,
    'Please arrive 5-10 minutes prior to your scheduled time. 24-hour notice required for cancellations.',
  ].filter(Boolean).join('\n');

  const location = `${BARBERSHOP_INFO.name}, ${BARBERSHOP_INFO.address}, ${BARBERSHOP_INFO.city}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dates,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Build Outlook Web Calendar URL
 */
export function createOutlookCalendarUrl(appointment: Appointment): string {
  const { start, end } = getAppointmentDateRange(appointment.date, appointment.time, appointment.durationMinutes);
  const subject = `${appointment.serviceName} - ${BARBERSHOP_INFO.name}`;
  const location = `${BARBERSHOP_INFO.name}, ${BARBERSHOP_INFO.address}, ${BARBERSHOP_INFO.city}`;
  const body = `Booking Ref: ${appointment.bookingCode}\nBarber: ${appointment.barberName}\nService: ${appointment.serviceName}\nPhone: ${BARBERSHOP_INFO.phone}`;

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: subject,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    location: location,
    body: body,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate standard RFC 5545 iCalendar (.ics) content for Apple Calendar, Outlook, and all native devices
 */
export function generateIcsContent(appointment: Appointment): string {
  const { start, end } = getAppointmentDateRange(appointment.date, appointment.time, appointment.durationMinutes);
  const now = new Date();

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const formatIcsDate = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  const escapeIcs = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  const summary = escapeIcs(`${appointment.serviceName} - ${BARBERSHOP_INFO.name}`);
  const description = escapeIcs(
    `Barber: ${appointment.barberName}\\n` +
    `Confirmation: ${appointment.bookingCode}\\n` +
    `Service: ${appointment.serviceName}\\n` +
    `Duration: ${appointment.durationMinutes} mins\\n` +
    `Client: ${appointment.customer.fullName} (${appointment.customer.phone})\\n` +
    `Total: $${appointment.price.toFixed(2)}\\n\\n` +
    `Shop Address: ${BARBERSHOP_INFO.address}, ${BARBERSHOP_INFO.city}\\n` +
    `Shop Phone: ${BARBERSHOP_INFO.phone}\\n` +
    `Please arrive 5-10 minutes early.`
  );
  const location = escapeIcs(`${BARBERSHOP_INFO.name}, ${BARBERSHOP_INFO.address}, ${BARBERSHOP_INFO.city}`);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Heritage and Blade Barbershop//Appointment Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment.bookingCode}-${start.getTime()}@heritageandblade.com`,
    `DTSTAMP:${formatIcsDate(now)}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${appointment.serviceName} at ${BARBERSHOP_INFO.name} in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Triggers automatic browser download of the .ics file
 */
export function downloadAppleIcsFile(appointment: Appointment): void {
  const icsData = generateIcsContent(appointment);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeDate = appointment.date.replace(/-/g, '');
  link.setAttribute('download', `heritage-blade-appointment-${safeDate}-${appointment.bookingCode}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

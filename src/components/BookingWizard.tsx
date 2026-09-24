import React, { useState, useEffect } from 'react';
import { SERVICES, BARBERS, BARBERSHOP_INFO, PROMO_OFFER } from '../data/barbershopData';
import { BarberService, Barber, Appointment } from '../types';
import { saveAppointment } from '../utils/storage';
import {
  createGoogleCalendarUrl,
  createOutlookCalendarUrl,
  downloadAppleIcsFile,
  getAppointmentDateRange,
} from '../utils/calendar';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  CalendarCheck,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Tag,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Check,
  RefreshCw,
} from 'lucide-react';

interface BookingWizardProps {
  initialService?: BarberService | null;
  initialBarber?: Barber | null;
  initialPromoCode?: string;
  onBookingCompleted: (appointment: Appointment) => void;
  onClose?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialService,
  initialBarber,
  initialPromoCode,
  onBookingCompleted,
  onClose,
}) => {
  // Step state: 1: Service, 2: Barber, 3: Date & Time, 4: Details, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(initialService ? (initialBarber ? 3 : 2) : 1);

  // Selections
  const [selectedService, setSelectedService] = useState<BarberService | null>(initialService || null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(initialBarber || null);
  const [anyBarber, setAnyBarber] = useState<boolean>(!initialBarber);

  // Date selection (default to tomorrow or today)
  const getInitialDate = () => {
    const d = new Date();
    // Default to tomorrow for realistic scheduling
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getInitialDate());
  const [selectedTime, setSelectedTime] = useState<string>('14:00'); // 2:00 PM default

  // Customer Details Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [promoInput, setPromoInput] = useState(initialPromoCode || '');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(initialPromoCode ? initialPromoCode.toUpperCase() : null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Errors state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Confirmed Appointment state (for Step 5)
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Sync if initial props change
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialBarber) {
      setSelectedBarber(initialBarber);
      setAnyBarber(false);
    }
  }, [initialBarber]);

  useEffect(() => {
    if (initialPromoCode) {
      setPromoInput(initialPromoCode);
      setAppliedPromo(initialPromoCode.toUpperCase());
    }
  }, [initialPromoCode]);

  // Generate available dates: Next 14 days
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i + 1)); // start from tomorrow
    const iso = d.toISOString().split('T')[0];
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-US', { day: 'numeric' });
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    return { iso, weekday, dayNum, month, fullDate: d };
  });

  // Generate time slots (Morning, Afternoon, Evening)
  const timeSlots = [
    { label: 'Morning', slots: ['08:30', '09:15', '10:00', '10:45', '11:30'] },
    { label: 'Afternoon', slots: ['12:15', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45'] },
    { label: 'Evening', slots: ['17:30', '18:15', '19:00'] },
  ];

  // Format 24h to 12h for display
  const formatTime12h = (time24: string) => {
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${m < 10 ? '0' + m : m} ${period}`;
  };

  // Compute calculated end time
  const getEndTime = (startTime: string, durationMinutes: number) => {
    const [h, m] = startTime.split(':').map(Number);
    const totalMinutes = h * 60 + m + durationMinutes;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(endH)}:${pad(endM)}`;
  };

  // Price calculation
  const originalPrice = selectedService ? selectedService.price : 0;
  const isDiscounted = appliedPromo === PROMO_OFFER.code.toUpperCase();
  const discountAmount = isDiscounted ? (originalPrice * PROMO_OFFER.discountPercent) / 100 : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  // Handle Promo Validation
  const handleApplyPromo = () => {
    setPromoError(null);
    const clean = promoInput.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a promotion code.');
      return;
    }
    if (clean === PROMO_OFFER.code.toUpperCase()) {
      setAppliedPromo(clean);
      setPromoError(null);
    } else {
      setPromoError('Invalid code. Try "FIRSTCUT20" for 20% off.');
    }
  };

  // Validate Step 4 Form
  const validateDetailsForm = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (at least 2 characters).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'A valid email address is required.';
    }
    if (!phone.trim() || phone.trim().replace(/\D/g, '').length < 7) {
      errors.phone = 'A valid contact phone number is required.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Complete Booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDetailsForm()) return;
    if (!selectedService) return;

    // Assigned barber
    const barberName = anyBarber || !selectedBarber
      ? 'First Available Master Barber (Marcus Vance)'
      : `${selectedBarber.name} (${selectedBarber.role})`;

    const barberId = anyBarber || !selectedBarber ? 'any-master' : selectedBarber.id;

    // Generate unique human-readable booking confirmation code
    const randomCodeNum = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `HB-${randomCodeNum}`;
    const endTime = getEndTime(selectedTime, selectedService.durationMinutes);

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}-${randomCodeNum}`,
      bookingCode: bookingCode,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      barberId: barberId,
      barberName: barberName,
      date: selectedDate,
      time: selectedTime,
      endTime: endTime,
      customer: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: notes.trim() || undefined,
        promoCode: appliedPromo || undefined,
      },
      price: finalPrice,
      originalPrice: originalPrice,
      discountAmount: discountAmount,
      durationMinutes: selectedService.durationMinutes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to persistent storage
    saveAppointment(newAppointment);
    setConfirmedAppointment(newAppointment);
    onBookingCompleted(newAppointment);
    setCurrentStep(5);
  };

  // Format date readable
  const formatReadableDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div id="booking-wizard" className="liquid-glass-card rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all text-[#ece8e1] relative">
      
      {/* Top Banner / Progress Header */}
      <div className="liquid-glass border-b border-neutral-800/80 p-5 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c89b53] font-semibold mb-1.5 sm:mb-2">
              <Scissors className="w-4 h-4 text-[#d4af37]" />
              <span>Online Appointment Concierge</span>
            </div>
            <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-[#f7f5f0] tracking-tight">
              {currentStep === 5 ? 'Appointment Confirmed' : 'Reserve Your Chair'}
            </h2>
          </div>

          {currentStep < 5 && (
            <div className="flex items-center gap-2 text-xs text-neutral-300 liquid-glass-pill px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#c89b53]/30">
              <span className="font-mono text-[#e5c07b] font-bold">Step {currentStep} of 4</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-[11px] sm:text-xs">Instant Confirmation</span>
            </div>
          )}
        </div>

        {/* Multi-step breadcrumb indicators (Fully Responsive) */}
        {currentStep < 5 && (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-800/80">
            {[
              { num: 1, title: 'Service' },
              { num: 2, title: 'Barber' },
              { num: 3, title: 'Date & Time' },
              { num: 4, title: 'Client Info' },
            ].map(step => (
              <button
                key={step.num}
                type="button"
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                disabled={step.num > currentStep}
                className={`text-left pb-2.5 sm:pb-3 border-b-2 transition-all cursor-pointer ${
                  currentStep === step.num
                    ? 'border-[#c89b53] text-[#f7f5f0]'
                    : step.num < currentStep
                    ? 'border-neutral-600 text-neutral-300 hover:text-[#c89b53]'
                    : 'border-neutral-800/60 text-neutral-600 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium">
                  <span className="font-mono font-bold text-[#c89b53]">{step.num}.</span>
                  <span className="truncate hidden xs:inline">{step.title}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-8 md:p-10">
        
        {/* ================= STEP 1: SELECT SERVICE ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#f7f5f0]">
                  Select Your Grooming Service
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  All services include hot towel preparation, precision geometry, and signature finish
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {SERVICES.map(service => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-5 sm:p-7 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#c89b53] bg-[#1a1d28]/90 ring-1 ring-[#c89b53]/50 shadow-xl shadow-black/50 scale-[1.01]'
                        : 'border-neutral-800/80 liquid-glass hover:border-[#c89b53]/50 hover:bg-[#141620]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <h4 className="font-display text-base sm:text-lg font-bold text-[#f7f5f0]">
                          {service.name}
                        </h4>
                        <span className="font-display text-xl font-bold text-[#c89b53] tabular-nums shrink-0">
                          ${service.price}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed mb-4 font-light">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs">
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-[#c89b53]" />
                        <span className="tabular-nums font-medium">{service.durationMinutes} mins</span>
                      </span>
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1.5 text-[#c89b53] font-semibold text-xs bg-[#c89b53]/10 px-3 py-1 rounded-full border border-[#c89b53]/30">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      ) : (
                        <span className="text-neutral-400 hover:text-white font-medium">
                          Select &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-8 border-t border-neutral-800/80 flex justify-end">
              <button
                type="button"
                disabled={!selectedService}
                onClick={() => setCurrentStep(2)}
                className={`px-8 py-4 text-xs font-semibold tracking-widest uppercase rounded-md flex items-center gap-2.5 cursor-pointer transition-all ${
                  selectedService
                    ? 'bg-[#c89b53] text-[#0c0d10] hover:bg-[#d8ab60] shadow-lg shadow-black/40'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>Continue to Select Barber</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT BARBER ================= */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#f7f5f0]">
                  Choose Your Preferred Barber
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Select a specific craftsman or choose First Available for the most flexible appointment times
                </p>
              </div>
            </div>

            {/* "Any Available Barber" Option Card */}
            <div
              onClick={() => {
                setAnyBarber(true);
                setSelectedBarber(null);
              }}
              className={`p-6 sm:p-7 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                anyBarber
                  ? 'border-[#c89b53] bg-[#1a1d26] ring-1 ring-[#c89b53]/50 shadow-xl'
                  : 'border-neutral-800 bg-[#12141a] hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-lg bg-[#222632] flex items-center justify-center text-[#c89b53] shadow-inner">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#f7f5f0]">
                    First Available Master Barber
                  </h4>
                  <p className="text-sm text-neutral-400 mt-1">
                    Fastest availability — We will assign the best suited licensed craftsman for your appointment.
                  </p>
                </div>
              </div>
              <div>
                {anyBarber ? (
                  <span className="inline-flex items-center gap-1.5 text-[#c89b53] font-semibold text-xs bg-[#c89b53]/10 px-3.5 py-1.5 rounded-full border border-[#c89b53]/30">
                    <Check className="w-4 h-4" /> Selected
                  </span>
                ) : (
                  <span className="text-neutral-400 text-xs font-medium">Select &rarr;</span>
                )}
              </div>
            </div>

            {/* Individual Barbers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BARBERS.map(barber => {
                const isSelected = !anyBarber && selectedBarber?.id === barber.id;
                return (
                  <div
                    key={barber.id}
                    onClick={() => {
                      setAnyBarber(false);
                      setSelectedBarber(barber);
                    }}
                    className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#c89b53] bg-[#1a1d26] ring-1 ring-[#c89b53]/50 shadow-xl'
                        : 'border-neutral-800 bg-[#12141a] hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="w-full h-44 rounded-md overflow-hidden mb-4 bg-neutral-900">
                        <img
                          src={barber.avatarUrl}
                          alt={barber.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="font-display text-base font-bold text-[#f7f5f0]">
                        {barber.name}
                      </h4>
                      <p className="text-[11px] text-[#c89b53] uppercase tracking-wider font-semibold mt-1">
                        {barber.role}
                      </p>
                      <p className="text-xs text-neutral-400 mt-2.5 line-clamp-2 leading-relaxed">
                        {barber.bio}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-mono tabular-nums">
                        {barber.experienceYears}+ yrs
                      </span>
                      {isSelected ? (
                        <span className="text-[#c89b53] font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      ) : (
                        <span className="text-neutral-400 hover:text-white">Choose</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-8 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-4 text-xs font-semibold tracking-widest uppercase rounded-md bg-[#c89b53] text-[#0c0d10] hover:bg-[#d8ab60] flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-black/40"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SELECT DATE & TIME ================= */}
        {currentStep === 3 && (
          <div className="space-y-8 sm:space-y-10">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#f7f5f0]">
                Select Appointment Date & Time
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Appointments are held strictly on time. Duration: {selectedService?.durationMinutes || 45} minutes.
              </p>
            </div>

            {/* Date Selection Strip (Responsive Carousel on Mobile / Grid on Desktop) */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                  1. Select Available Date
                </label>
                <span className="text-[11px] text-neutral-500 font-mono hidden xs:inline">Next 14 Days Available</span>
              </div>

              {/* Horizontally scrollable on mobile with snap / 7-col grid on tablet & PC */}
              <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth snap-x">
                {availableDates.map(dateItem => {
                  const isSelected = selectedDate === dateItem.iso;
                  return (
                    <button
                      key={dateItem.iso}
                      type="button"
                      onClick={() => setSelectedDate(dateItem.iso)}
                      className={`min-w-[85px] sm:min-w-0 p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center shrink-0 snap-start ${
                        isSelected
                          ? 'border-[#c89b53] bg-[#1d212d] text-[#f7f5f0] shadow-xl ring-1 ring-[#c89b53]/60 scale-[1.03]'
                          : 'border-neutral-800/80 liquid-glass text-neutral-400 hover:border-[#c89b53]/40 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                        {dateItem.weekday}
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-bold my-0.5 sm:my-1 tabular-nums text-white">
                        {dateItem.dayNum}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase font-medium">
                        {dateItem.month}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Grid grouped by Morning / Afternoon / Evening */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 sm:mb-4">
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                  2. Select Starting Time Slot
                </label>
                {selectedService && (
                  <span className="text-xs text-[#c89b53] font-medium">
                    Estimated Finish: <strong className="font-mono text-white ml-1">{formatTime12h(getEndTime(selectedTime, selectedService.durationMinutes))}</strong>
                  </span>
                )}
              </div>

              <div className="space-y-4 sm:space-y-5">
                {timeSlots.map(group => (
                  <div key={group.label} className="liquid-glass p-4 sm:p-6 rounded-xl border border-neutral-800/80">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                      {group.slots.map(slot => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 sm:py-3 px-2 sm:px-3.5 text-xs font-medium font-mono rounded-lg border transition-all cursor-pointer text-center ${
                              isSelected
                                ? 'bg-[#c89b53] text-[#08090c] font-bold border-[#c89b53] shadow-md scale-[1.02]'
                                : 'bg-[#141620] text-neutral-300 border-neutral-800/90 hover:border-neutral-600 hover:text-white'
                            }`}
                          >
                            {formatTime12h(slot)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary preview bar */}
            <div className="p-4 sm:p-5 liquid-glass-pill rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-5 h-5 text-[#c89b53]" />
                <span className="text-neutral-300">
                  Selected: <strong className="text-white">{formatReadableDate(selectedDate)}</strong> at <strong className="text-[#c89b53] font-mono">{formatTime12h(selectedTime)}</strong>
                </span>
              </div>
              <span className="text-neutral-400 text-xs">
                Duration: {selectedService?.durationMinutes} mins · Free 24h rescheduling
              </span>
            </div>

            <div className="pt-8 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-8 py-4 text-xs font-semibold tracking-widest uppercase rounded-md bg-[#c89b53] text-[#0c0d10] hover:bg-[#d8ab60] flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-black/40"
              >
                <span>Continue to Client Information</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CLIENT DETAILS & PROMO ================= */}
        {currentStep === 4 && (
          <form onSubmit={handleConfirmBooking} className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-[#f7f5f0]">
                Client Information & Confirmation
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                We'll send your appointment confirmation, calendar event, and reminder to these contact details.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-4" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => {
                        setFullName(e.target.value);
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                      }}
                      placeholder="e.g. Julian Sterling"
                      className={`w-full bg-[#14161f] border rounded-lg pl-11 pr-4 py-3.5 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none transition-colors ${
                        formErrors.fullName ? 'border-red-500 focus:border-red-400' : 'border-neutral-800 focus:border-[#c89b53]'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="e.g. julian@example.com"
                      className={`w-full bg-[#14161f] border rounded-lg pl-11 pr-4 py-3.5 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none transition-colors ${
                        formErrors.email ? 'border-red-500 focus:border-red-400' : 'border-neutral-800 focus:border-[#c89b53]'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-4" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      placeholder="e.g. (555) 392-0192"
                      className={`w-full bg-[#14161f] border rounded-lg pl-11 pr-4 py-3.5 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none transition-colors ${
                        formErrors.phone ? 'border-red-500 focus:border-red-400' : 'border-neutral-800 focus:border-[#c89b53]'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Special Grooming Notes or Preferences (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Sensitive skin, skin fade down to zero, or hot lather straight razor finish"
                    className="w-full bg-[#14161f] border border-neutral-800 rounded-lg p-3.5 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none focus:border-[#c89b53] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Appointment Review & Promo Code */}
              <div className="lg:col-span-5 bg-[#141720] border border-neutral-800 rounded-xl p-7 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="font-display text-sm font-bold text-[#f7f5f0] uppercase tracking-wider mb-5 pb-3 border-b border-neutral-800/80">
                    Booking Summary
                  </h4>

                  <div className="space-y-3.5 text-xs sm:text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Service:</span>
                      <span className="font-semibold text-white text-right">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Craftsman:</span>
                      <span className="font-semibold text-white">
                        {anyBarber || !selectedBarber ? 'First Available Master Barber' : selectedBarber.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Date:</span>
                      <span className="font-semibold text-white">{formatReadableDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Time:</span>
                      <span className="font-semibold text-[#c89b53] font-mono">
                        {formatTime12h(selectedTime)} – {selectedService ? formatTime12h(getEndTime(selectedTime, selectedService.durationMinutes)) : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Location:</span>
                      <span className="text-neutral-300 text-right">{BARBERSHOP_INFO.address}</span>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-5 border-t border-neutral-800/80 mb-6">
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                      Promotion or Gift Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={e => {
                          setPromoInput(e.target.value);
                          setPromoError(null);
                        }}
                        placeholder="e.g. FIRSTCUT20"
                        className="bg-[#0e1015] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs font-mono uppercase text-[#f7f5f0] flex-1 focus:outline-none focus:border-[#c89b53]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 text-xs font-semibold uppercase bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg cursor-pointer transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-400 mt-1.5">{promoError}</p>
                    )}
                    {isDiscounted && (
                      <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                        <Check className="w-3.5 h-3.5" /> 20% First-Visit Discount Applied!
                      </p>
                    )}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-5 border-t border-neutral-800/80 space-y-2.5">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Service Rate:</span>
                    <span className="font-mono tabular-nums">${originalPrice.toFixed(2)}</span>
                  </div>
                  {isDiscounted && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Welcome Discount (20%):</span>
                      <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-2.5 border-t border-neutral-800/60">
                    <span>Total Due at Chair:</span>
                    <span className="font-display text-2xl text-[#c89b53] tabular-nums">
                      ${finalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 text-right mt-1.5">
                    Pay at the shop after your service via Cash, Card, or Apple Pay
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-9 py-4 text-xs font-semibold tracking-widest uppercase rounded-md bg-[#c89b53] text-[#0c0d10] hover:bg-[#d8ab60] flex items-center gap-2.5 cursor-pointer shadow-xl shadow-black/50 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Reservation</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 5: CONFIRMATION & CALENDAR INTEGRATION ================= */}
        {currentStep === 5 && confirmedAppointment && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Success Banner */}
            <div className="bg-[#121b16] border border-emerald-500/40 p-8 sm:p-10 rounded-xl text-center shadow-xl">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
                <Check className="w-8 h-8" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-2">
                Reservation Confirmed
              </p>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#f7f5f0] mb-3">
                We're Looking Forward to Welcoming You
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
                Your chair has been reserved. A confirmation has been stored and an email summary prepared for {confirmedAppointment.customer.email}.
              </p>
              <div className="mt-5 inline-flex items-center gap-3 bg-[#090a0d] px-5 py-3 rounded-xl border border-[#c89b53]/40 shadow-inner">
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Confirmation Code</span>
                  <span className="font-mono text-base sm:text-xl font-bold text-[#e5c07b] tracking-widest">
                    {confirmedAppointment.bookingCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(confirmedAppointment.bookingCode);
                    const btn = document.getElementById('copy-code-btn');
                    if (btn) btn.innerText = 'Copied!';
                    setTimeout(() => {
                      if (btn) btn.innerText = 'Copy';
                    }, 2000);
                  }}
                  id="copy-code-btn"
                  className="px-3 py-1.5 bg-[#1e222e] hover:bg-[#282d3d] text-xs text-[#e5c07b] rounded-md font-medium border border-neutral-700 transition-colors cursor-pointer"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Calendar Integration Required By PDF */}
            <div className="bg-[#161822] border-2 border-[#c89b53]/50 p-8 sm:p-10 rounded-xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-2.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                <CalendarIcon className="w-4 h-4 text-[#c89b53]" />
                <span>Calendar Integration (Google & Apple Compatible)</span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                Add This Appointment To Your Calendar
              </h4>
              <p className="text-sm text-neutral-300 mb-8 max-w-2xl leading-relaxed">
                Add the verified date ({formatReadableDate(confirmedAppointment.date)} at {formatTime12h(confirmedAppointment.time)}), shop location, and booking reference directly into your personal schedule.
              </p>

              {/* Action Buttons for Google Calendar, Apple iCal, Outlook */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* 1. Google Calendar Web Link */}
                <a
                  href={createGoogleCalendarUrl(confirmedAppointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 bg-[#0e1015] border border-[#c89b53]/40 hover:bg-[#c89b53] hover:text-[#0c0d10] text-[#f7f5f0] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer group shadow-lg"
                >
                  <ExternalLink className="w-4 h-4 text-[#c89b53] group-hover:text-[#0c0d10]" />
                  <span>Google Calendar</span>
                </a>

                {/* 2. Apple Calendar (.ics file download) */}
                <button
                  type="button"
                  onClick={() => downloadAppleIcsFile(confirmedAppointment)}
                  className="px-5 py-4 bg-[#0e1015] border border-[#c89b53]/40 hover:bg-[#c89b53] hover:text-[#0c0d10] text-[#f7f5f0] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer group shadow-lg"
                >
                  <Download className="w-4 h-4 text-[#c89b53] group-hover:text-[#0c0d10]" />
                  <span>Apple Calendar (.ics)</span>
                </button>

                {/* 3. Outlook Calendar Web Link */}
                <a
                  href={createOutlookCalendarUrl(confirmedAppointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 bg-[#0e1015] border border-neutral-700 hover:border-[#c89b53] text-[#f7f5f0] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4 text-neutral-400" />
                  <span>Outlook / Web</span>
                </a>

              </div>

              <p className="text-xs text-neutral-400 mt-4 text-center sm:text-left">
                The downloaded event (.ics) is compatible with Apple Calendar (iOS / macOS), Microsoft Outlook, Google, and standard mobile calendar apps.
              </p>
            </div>

            {/* Appointment Digital Card Details */}
            <div className="bg-[#12141a] border border-neutral-800 rounded-xl p-7 sm:p-9 shadow-lg">
              <h4 className="font-display text-base font-bold text-[#f7f5f0] uppercase tracking-wider mb-6 pb-4 border-b border-neutral-800/80">
                Appointment Particulars
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs sm:text-sm">
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider font-semibold text-xs block mb-1.5">
                    Grooming Service
                  </span>
                  <p className="font-display text-base font-bold text-white">
                    {confirmedAppointment.serviceName}
                  </p>
                  <p className="text-neutral-400 mt-0.5">
                    {confirmedAppointment.durationMinutes} Minutes Session
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase tracking-wider font-semibold text-xs block mb-1.5">
                    Scheduled Time
                  </span>
                  <p className="font-display text-base font-bold text-[#c89b53]">
                    {formatTime12h(confirmedAppointment.time)} – {formatTime12h(confirmedAppointment.endTime)}
                  </p>
                  <p className="text-neutral-300 mt-0.5">
                    {formatReadableDate(confirmedAppointment.date)}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase tracking-wider font-semibold text-xs block mb-1.5">
                    Assigned Master Barber
                  </span>
                  <p className="font-display text-base font-bold text-white">
                    {confirmedAppointment.barberName}
                  </p>
                  <p className="text-neutral-400 mt-0.5">Downtown Arts District Station</p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase tracking-wider font-semibold text-xs block mb-1.5">
                    Client Details
                  </span>
                  <p className="font-semibold text-white">
                    {confirmedAppointment.customer.fullName}
                  </p>
                  <p className="text-neutral-400 font-mono">
                    {confirmedAppointment.customer.phone}
                  </p>
                  <p className="text-neutral-400">
                    {confirmedAppointment.customer.email}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase tracking-wider font-semibold text-xs block mb-1.5">
                    Shop Address & Contact
                  </span>
                  <p className="text-neutral-300">
                    {BARBERSHOP_INFO.address}
                  </p>
                  <p className="text-neutral-400">{BARBERSHOP_INFO.city}</p>
                  <p className="text-[#c89b53] mt-0.5 font-mono">{BARBERSHOP_INFO.phone}</p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase tracking-wider font-semibold text-xs block mb-1.5">
                    Balance Due At Chair
                  </span>
                  <p className="font-display text-2xl font-bold text-[#c89b53] tabular-nums">
                    ${confirmedAppointment.price.toFixed(2)}
                  </p>
                  {confirmedAppointment.discountAmount > 0 && (
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">
                      Includes 20% First-Visit Privilege (-${confirmedAppointment.discountAmount.toFixed(2)})
                    </p>
                  )}
                </div>
              </div>

              {confirmedAppointment.customer.notes && (
                <div className="mt-8 pt-5 border-t border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-medium">Special Notes: </span>
                  <span className="text-neutral-200 italic">"{confirmedAppointment.customer.notes}"</span>
                </div>
              )}
            </div>

            {/* Next Actions */}
            <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedService(null);
                  setSelectedBarber(null);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setNotes('');
                  setConfirmedAppointment(null);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 border border-neutral-700 hover:border-neutral-500 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Book Another Appointment</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest bg-[#c89b53] text-[#0c0d10] hover:bg-[#d8ab60] rounded-lg cursor-pointer transition-colors shadow-lg shadow-black/40"
                >
                  Return to Website
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

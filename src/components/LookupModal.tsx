import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { getStoredAppointments, cancelStoredAppointment, findAppointmentByCode } from '../utils/storage';
import { createGoogleCalendarUrl, downloadAppleIcsFile } from '../utils/calendar';
import { X, Search, Calendar, Clock, Download, ExternalLink, Trash2, CheckCircle2, BookmarkCheck, Scissors, AlertTriangle } from 'lucide-react';

interface LookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNew: () => void;
}

export const LookupModal: React.FC<LookupModalProps> = ({
  isOpen,
  onClose,
  onBookNew,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Appointment | null | undefined>(undefined);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAppointments(getStoredAppointments());
      setSearchResult(undefined);
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(undefined);
      return;
    }
    const found = findAppointmentByCode(searchQuery);
    if (found) {
      setSearchResult(found);
    } else {
      // Search by email among stored
      const byEmail = appointments.find(a => a.customer.email.toLowerCase() === searchQuery.trim().toLowerCase());
      setSearchResult(byEmail || null);
    }
  };

  const handleCancel = (id: string) => {
    cancelStoredAppointment(id);
    const updated = getStoredAppointments();
    setAppointments(updated);
    if (searchResult && searchResult.id === id) {
      setSearchResult({ ...searchResult, status: 'cancelled' });
    }
    setCancellingId(null);
  };

  const formatTime12h = (time24: string) => {
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${m < 10 ? '0' + m : m} ${period}`;
  };

  const formatReadableDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const displayList = searchResult !== undefined
    ? (searchResult ? [searchResult] : [])
    : appointments;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] liquid-glass-card rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col text-[#ede8df] overflow-hidden border border-[#c89b53]/45"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lookup-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-neutral-800/90 flex items-center justify-between bg-[#11141e]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c89b53]/15 text-[#e5c07b] flex items-center justify-center border border-[#c89b53]/30 shadow-sm shrink-0">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="lookup-title" className="font-display text-base sm:text-lg md:text-xl font-bold text-[#f7f5f0] uppercase tracking-wide">
                My Appointments & Lookup
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                View scheduled sessions, sync to calendar, or manage your bookings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors rounded-lg focus:outline-none cursor-pointer"
            aria-label="Close appointment lookup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 pb-2">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Booking Code (e.g. HB-84920) or Email..."
                className="w-full bg-[#0a0c11] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none focus:border-[#c89b53] transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-3 bg-[#c89b53] hover:bg-[#dbab5e] text-xs font-bold uppercase tracking-wider text-[#08090c] rounded-xl cursor-pointer transition-colors shadow-md"
              >
                Search
              </button>
              {searchResult !== undefined && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchResult(undefined);
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-3 text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List of appointments */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {displayList.length === 0 ? (
            <div className="text-center py-12 liquid-glass rounded-xl border border-neutral-800 p-6">
              <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="font-display text-base font-bold text-white mb-1">No Appointments Found</p>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto mb-5 font-light">
                {searchQuery ? `No booking found matching "${searchQuery}". Please check your confirmation code or email.` : 'You currently do not have any saved appointments on this device.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#c89b53] text-[#08090c] rounded-lg cursor-pointer hover:bg-[#dbab5e] transition-colors"
              >
                Schedule An Appointment Now
              </button>
            </div>
          ) : (
            displayList.map(apt => (
              <div
                key={apt.id}
                className="liquid-glass-card p-5 sm:p-6 rounded-xl border border-neutral-800 hover:border-[#c89b53]/50 transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#e5c07b] bg-[#141722] px-2.5 py-1 rounded-md border border-[#c89b53]/30">
                      {apt.bookingCode}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      apt.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    ${apt.price.toFixed(2)} Due at chair
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase block">Service</span>
                    <p className="font-bold text-white text-sm">{apt.serviceName}</p>
                    <p className="text-neutral-400">{apt.durationMinutes} mins · {apt.barberName}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase block">Scheduled Date & Time</span>
                    <p className="font-bold text-[#e5c07b] text-sm">{formatReadableDate(apt.date)}</p>
                    <p className="text-neutral-300 font-mono">{formatTime12h(apt.time)} – {formatTime12h(apt.endTime)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={createGoogleCalendarUrl(apt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#13151f] hover:bg-[#1c202e] border border-neutral-700 text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                    >
                      <ExternalLink className="w-3 h-3 text-[#c89b53]" />
                      <span>Google Cal</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadAppleIcsFile(apt)}
                      className="px-3 py-1.5 rounded-md bg-[#13151f] hover:bg-[#1c202e] border border-neutral-700 text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                    >
                      <Download className="w-3 h-3 text-[#c89b53]" />
                      <span>Apple .ics</span>
                    </button>
                  </div>

                  {apt.status === 'confirmed' && (
                    <div>
                      {cancellingId === apt.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-red-400">Confirm cancel?</span>
                          <button
                            type="button"
                            onClick={() => handleCancel(apt.id)}
                            className="px-2.5 py-1 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded border border-red-500/30 text-[11px] font-semibold cursor-pointer"
                          >
                            Yes, Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => setCancellingId(null)}
                            className="px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded text-[11px] cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCancellingId(apt.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800/80 bg-[#090b10] flex items-center justify-between text-xs text-neutral-400">
          <span>Need to reschedule? Call concierge at <strong className="text-[#e5c07b] font-mono">(555) 728-3920</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

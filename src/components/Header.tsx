import React, { useState, useEffect } from 'react';
import { BARBERSHOP_INFO, PROMO_OFFER } from '../data/barbershopData';
import {
  Calendar,
  Clock,
  Scissors,
  BookmarkCheck,
  MapPin,
  Phone,
  Tag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Coffee,
  X,
} from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
  onMyBookingsClick: () => void;
  activeBookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onBookClick,
  onMyBookingsClick,
  activeBookingsCount,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const scrollTo = (id: string) => {
    setDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#090a0d]/96 backdrop-blur-2xl border-b border-[#c89b53]/35 shadow-2xl shadow-black/80'
            : 'bg-[#090a0d]/88 backdrop-blur-xl border-b border-neutral-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* 1. Brand Wordmark & Emblem */}
            <a
              href="/"
              className="flex items-center gap-3.5 group text-left focus:outline-none select-none"
              aria-label="Heritage & Blade Barbershop Home"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-0.5 flex items-center justify-center shadow-xl shadow-black/60 group-hover:scale-105 transition-all duration-300 gold-glow-sm" style={{background:'linear-gradient(135deg,#c89b53 0%,#f5d58c 45%,#c49048 100%)'}}>
                <div className="w-full h-full bg-[#0b0d12] rounded-[10px] flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-[#e5c07b] group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>

              <div>
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f7f5f0] uppercase block leading-none">
                  Heritage <span className="text-[#c89b53] font-normal">&</span> Blade
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-neutral-400 font-medium block mt-1.5 font-sans">
                  Artisanal Grooming Co.
                </span>
              </div>
            </a>

            {/* 2. Action Zone: My Bookings + Book Chair CTA + Universal Toggle Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* My Bookings Button with Active Counter Badge */}
              <button
                type="button"
                onClick={onMyBookingsClick}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg btn-glass-outline text-xs text-neutral-300 hover:text-[#e5c07b] transition-all cursor-pointer group"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-[#c89b53] group-hover:scale-110 transition-transform" />
                <span className="font-medium">My Bookings</span>
                {activeBookingsCount > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#c89b53] text-[#090a0d] font-bold rounded-full animate-pulse shadow-sm gold-glow-sm">
                    {activeBookingsCount}
                  </span>
                )}
              </button>

              {/* Primary Book CTA */}
              <button
                type="button"
                onClick={onBookClick}
                className="btn-gold-shine inline-flex px-4 sm:px-6 py-2.5 sm:py-3 text-xs font-bold tracking-widest uppercase text-[#090a0d] active:scale-[0.98] rounded-lg items-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-3.5 h-3.5 text-[#090a0d] group-hover:scale-110 transition-transform" />
                <span>Book Chair</span>
              </button>

              {/* UNIVERSAL CONCIERGE TOGGLE BUTTON (For PC, Tablet, & Mobile) */}
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className={`relative px-3.5 sm:px-4 py-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2.5 cursor-pointer focus:outline-none select-none ${
                  drawerOpen
                    ? 'bg-[#c89b53] text-[#090a0d] border-[#c89b53] shadow-lg shadow-[#c89b53]/30 scale-[1.02]'
                    : 'bg-[#12141c]/90 hover:bg-[#191d28] text-neutral-200 border-neutral-700/80 hover:border-[#c89b53]/70 shadow-md'
                }`}
                aria-label={drawerOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
                aria-expanded={drawerOpen}
              >
                {/* Smooth Animated Hamburger / Cross Icon */}
                <div className="w-5 h-4 relative flex flex-col justify-between items-center overflow-hidden">
                  <span
                    className={`h-0.5 w-5 rounded-full transition-all duration-300 transform origin-center ${
                      drawerOpen
                        ? 'bg-[#090a0d] rotate-45 translate-y-[7px]'
                        : 'bg-current'
                    }`}
                  />
                  <span
                    className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
                      drawerOpen ? 'opacity-0 translate-x-2' : 'bg-current opacity-100'
                    }`}
                  />
                  <span
                    className={`h-0.5 w-5 rounded-full transition-all duration-300 transform origin-center ${
                      drawerOpen
                        ? 'bg-[#090a0d] -rotate-45 -translate-y-[7px]'
                        : 'bg-current'
                    }`}
                  />
                </div>

                {/* Text Label on larger screens */}
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline font-sans">
                  {drawerOpen ? 'Close' : 'Menu'}
                </span>

                {/* Badge alert if appointments exist */}
                {activeBookingsCount > 0 && !drawerOpen && (
                  <span className="w-2 h-2 rounded-full bg-[#c89b53] animate-ping absolute -top-1 -right-1" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* LUXURY CONCIERGE DRAWER (Contains all Navigation Links & Quick Features) */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          drawerOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Backdrop Scrim */}
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Sliding Luxury Panel */}
        <div
          className={`relative max-w-5xl mx-auto mt-2 sm:mt-5 mx-4 md:mx-auto bg-[#0d0f16] border border-[#c89b53]/40 rounded-2xl shadow-2xl overflow-hidden transition-all duration-350 transform max-h-[92vh] flex flex-col ${
            drawerOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-8 scale-95 opacity-0'
          }`}
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,155,83,0.12), 0 0 60px rgba(200,155,83,0.06)' }}
        >
          {/* Drawer Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-neutral-800/90 bg-[#11141e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#c89b53]/15 border border-[#c89b53]/40 flex items-center justify-center text-[#e5c07b]">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white uppercase tracking-wider block">
                  Concierge Navigation
                </span>
                <span className="text-[11px] text-neutral-400 font-sans">
                  Heritage & Blade · Downtown Arts District
                </span>
              </div>
            </div>

            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Grid */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Col: Complete Navigation Menu Items */}
            <div className="lg:col-span-7 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c89b53] font-semibold mb-4 font-sans">
                Explore Navigation
              </p>

              {[
                {
                  id: 'services',
                  num: '01',
                  label: 'Services & Pricing',
                  desc: 'Precision cuts, skin fades, hot towel straight-razor shaving',
                },
                {
                  id: 'barbers',
                  num: '02',
                  label: 'Master Barbers in Residence',
                  desc: 'Meet our 4 licensed craftsmen and book your preferred chair',
                },
                {
                  id: 'about',
                  num: '03',
                  label: 'The Craft & Standards',
                  desc: 'Hospitality, hospital-grade sanitation, and single malt lounge',
                },
                {
                  id: 'location',
                  num: '04',
                  label: 'Location, Hours & Parking',
                  desc: 'Downtown Arts District · Complimentary 90-min validated garage',
                },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left p-4 rounded-xl bg-[#131620] hover:bg-[#1a1e2c] border border-neutral-800/80 hover:border-[#c89b53]/60 transition-all duration-200 group flex items-start justify-between gap-4 cursor-pointer shadow-sm"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-xs text-[#c89b53] font-semibold mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base font-bold text-[#f7f5f0] group-hover:text-[#e5c07b] transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-[#c89b53] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </button>
              ))}

              {/* My Scheduled Appointments Navigation Card */}
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onMyBookingsClick();
                }}
                className="w-full text-left p-4 rounded-xl bg-[#151824] border border-[#c89b53]/40 hover:border-[#c89b53] transition-all group flex items-center justify-between cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <BookmarkCheck className="w-5 h-5 text-[#c89b53]" />
                  <div>
                    <span className="font-display text-base font-bold text-white group-hover:text-[#e5c07b] transition-colors">
                      05. My Scheduled Appointments
                    </span>
                    <span className="text-xs text-neutral-400 block mt-0.5 font-light">
                      Lookup appointments, sync to Google / Apple calendar, manage dates
                    </span>
                  </div>
                </div>
                {activeBookingsCount > 0 ? (
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-[#c89b53] text-[#090a0d] rounded-full">
                    {activeBookingsCount} Active
                  </span>
                ) : (
                  <span className="text-xs text-neutral-400 font-mono">Lookup &rarr;</span>
                )}
              </button>
            </div>

            {/* Right Col: Shop Particulars & Direct Appointment Reservation */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              
              {/* Promo Offer Highlight */}
              <div className="p-5 rounded-xl bg-[#141722] border border-[#c89b53]/30 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-[#c89b53]" />
                  <span>First Visit Privilege</span>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-3">
                  Receive 20% off your first appointment + complimentary eucalyptus steamed towel.
                </p>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#e5c07b] bg-[#0a0b10] px-3 py-1.5 rounded-lg border border-neutral-800">
                  <Tag className="w-3 h-3 text-[#c89b53]" />
                  <span>Code: {PROMO_OFFER.code}</span>
                </div>
              </div>

              {/* Hours & Contact Info Box */}
              <div className="p-5 rounded-xl bg-[#12141c] border border-neutral-800/80 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800/80">
                  <span className="flex items-center gap-2 text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-[#c89b53]" />
                    <span>Operating Hours</span>
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Open Today · 8am - 8pm
                  </span>
                </div>

                <div className="flex items-center gap-2 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-[#c89b53]" />
                  <a href={`tel:${BARBERSHOP_INFO.phone}`} className="hover:text-[#c89b53] font-mono">
                    {BARBERSHOP_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-[#c89b53]" />
                  <span>{BARBERSHOP_INFO.address}</span>
                </div>
              </div>

              {/* Instant Chair Booking Button */}
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onBookClick();
                }}
                className="btn-gold-shine w-full py-4 px-6 text-xs font-bold tracking-widest uppercase text-[#090a0d] active:scale-[0.98] rounded-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#090a0d]" />
                <span>Reserve Chair Online</span>
              </button>

            </div>

          </div>

          {/* Drawer Footer Status Bar */}
          <div className="px-6 sm:px-8 py-3.5 bg-[#090a0f] border-t border-neutral-800/80 text-[11px] text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c89b53]" />
              <span>100% Single-Use Japanese Steel Blades · Barbicide Immersion</span>
            </span>
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Coffee className="w-3.5 h-3.5 text-[#c89b53]" />
              <span>Complimentary Single Malt & Espresso</span>
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

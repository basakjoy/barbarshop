import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { PromoModal } from './components/PromoModal';
import { TermsModal } from './components/TermsModal';
import { LookupModal } from './components/LookupModal';
import { BarberService, Barber, Appointment } from './types';
import { getStoredAppointments } from './utils/storage';
import { PROMO_OFFER } from './data/barbershopData';
import { Calendar, Tag, Sparkles } from 'lucide-react';

export default function App() {
  // Modal states
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Booking Wizard states
  const [preselectedService, setPreselectedService] = useState<BarberService | null>(null);
  const [preselectedBarber, setPreselectedBarber] = useState<Barber | null>(null);
  const [preselectedPromo, setPreselectedPromo] = useState<string>('');

  // Stored bookings count for header badge
  const [activeBookingsCount, setActiveBookingsCount] = useState<number>(0);

  // Refresh active bookings count
  const refreshBookingsCount = () => {
    const list = getStoredAppointments();
    const confirmed = list.filter(a => a.status === 'confirmed');
    setActiveBookingsCount(confirmed.length);
  };

  useEffect(() => {
    refreshBookingsCount();

    // Respectful dwell trigger: Open promo after 14s if user hasn't seen it yet
    const hasSeenPromo = sessionStorage.getItem('hb_seen_promo');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsPromoOpen(true);
        sessionStorage.setItem('hb_seen_promo', 'true');
      }, 14000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: BarberService) => {
    setPreselectedService(service);
    scrollToBooking();
  };

  const handleSelectBarber = (barber: Barber) => {
    setPreselectedBarber(barber);
    scrollToBooking();
  };

  const handleApplyPromoAndBook = (code: string) => {
    setIsPromoOpen(false);
    setPreselectedPromo(code);
    scrollToBooking();
  };

  const handleBookingCompleted = (appointment: Appointment) => {
    refreshBookingsCount();
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#08090c] text-[#ede8df] font-sans selection:bg-[#c89b53]/30 selection:text-[#faedd0] overflow-x-hidden">
      
      {/* ========================================================== */}
      {/* GLOBAL AMBIENT LIQUID BLUR LAYER (Background Mesh & Glows) */}
      {/* ========================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-mesh-dark opacity-70" />
        
        {/* Top-right liquid amber orb */}
        <div className="absolute top-[8%] right-[-10%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] bg-[#c89b53]/10 blur-[130px] rounded-full animate-liquid-1" />
        
        {/* Middle-left liquid warm gold orb */}
        <div className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-[#d4af37]/8 blur-[150px] rounded-full animate-liquid-2" />
        
        {/* Bottom-right liquid deep bronze orb */}
        <div className="absolute top-[75%] right-[-10%] w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] bg-[#8a5d1b]/12 blur-[140px] rounded-full animate-liquid-3" />
      </div>

      {/* Top Banner for First-Time Privilege (Fully Responsive) */}
      <div className="relative z-30 border-b border-[#c89b53]/20 text-center py-2 sm:py-2.5 px-3 sm:px-4 text-[11px] sm:text-xs font-medium text-neutral-300 flex flex-wrap items-center justify-center gap-2 sm:gap-3 overflow-hidden" style={{background:'linear-gradient(135deg,rgba(13,15,24,0.98) 0%,rgba(10,12,20,0.99) 100%)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)'}}>
        {/* Shine top ribbon */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{background:'linear-gradient(90deg,transparent 0%,rgba(200,155,83,0.35) 30%,rgba(245,213,140,0.6) 50%,rgba(200,155,83,0.35) 70%,transparent 100%)'}} />
        <span className="flex items-center gap-1.5 text-[#e5c07b]">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span className="font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">First Visit Privilege:</span>
        </span>
        <span className="hidden sm:inline text-neutral-300">Receive 20% off with promo code</span>
        <button
          onClick={() => handleApplyPromoAndBook(PROMO_OFFER.code)}
          className="font-mono font-bold text-[#f5d58c] hover:text-white cursor-pointer uppercase tracking-wider px-2.5 py-0.5 rounded border border-[#c89b53]/45 gold-glow-sm transition-all hover:border-[#c89b53]/80 animate-shine-sweep"
          style={{background:'linear-gradient(135deg,rgba(22,18,10,0.95),rgba(30,22,8,0.9))'}}
        >
          {PROMO_OFFER.code}
        </button>
        <span className="hidden md:inline text-neutral-600">·</span>
        <button
          onClick={() => setIsPromoOpen(true)}
          className="text-neutral-400 hover:text-[#e5c07b] underline text-[10px] sm:text-[11px] cursor-pointer transition-colors"
        >
          View Details
        </button>
      </div>

      {/* Main Header with Universal Toggle Drawer */}
      <Header
        onBookClick={scrollToBooking}
        onMyBookingsClick={() => setIsLookupOpen(true)}
        activeBookingsCount={activeBookingsCount}
      />

      <main className="relative z-10 flex-1">
        
        {/* 1. Hero Section with Liquid Atmospheric Lighting */}
        <Hero
          onBookClick={scrollToBooking}
          onExploreServices={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onPromoClick={() => setIsPromoOpen(true)}
        />

        {/* 2. Interactive Booking Concierge (Central Focal Journey) */}
        <section id="booking-section" className="py-16 sm:py-24 md:py-28 relative scroll-mt-20 overflow-hidden">
          {/* Subtle section liquid glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c89b53]/8 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
            <BookingWizard
              initialService={preselectedService}
              initialBarber={preselectedBarber}
              initialPromoCode={preselectedPromo}
              onBookingCompleted={handleBookingCompleted}
            />
          </div>
        </section>

        {/* 3. Services & Rates */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. Master Barbers in Residence */}
        <BarbersSection onSelectBarber={handleSelectBarber} />

        {/* 5. Heritage, Craft & Standards */}
        <AboutSection />

        {/* 6. Client Testimonials */}
        <ReviewsSection />

        {/* 7. Location, Hours & Concierge Contact */}
        <ContactSection />

      </main>

      {/* Complete Footer with Legal & Social Links */}
      <Footer
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenBooking={scrollToBooking}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenPromo={() => setIsPromoOpen(true)}
      />

      {/* Modals & Popups */}
      <PromoModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        onApplyAndBook={handleApplyPromoAndBook}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <LookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onBookNew={scrollToBooking}
      />

    </div>
  );
}

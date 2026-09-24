import React from 'react';
import { Calendar, ArrowDown, Star, Sparkles, ShieldCheck, Coffee } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
  onPromoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreServices,
  onPromoClick,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden border-b border-neutral-800/50 bg-[#08090c]">
      
      {/* Background Image with layered scrim for depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/hero_barbershop_interior_1790225602482.jpg"
          alt="Heritage and Blade Luxury Barbershop Interior"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layer atmospheric scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090c]/75 via-[#08090c]/70 to-[#08090c]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c]/50 via-transparent to-[#08090c]/40" />
        {/* Warm gold atmospheric tint at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#c89b53]/6 to-transparent" />
      </div>

      {/* Ambient glow orbs in hero */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-[#c89b53]/8 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-[#d4af37]/6 blur-[90px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 text-center flex flex-col items-center w-full">
        
        {/* Editorial announcement pill */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-7 sm:mb-9 px-4 sm:px-5 py-2 rounded-full hero-pill text-xs tracking-[0.2em] uppercase text-[#e5c07b] font-medium max-w-full animate-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="flex items-center gap-1.5 font-semibold text-[#f5d58c]">
            <span className="relative flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            </span>
            <span>Est. 2018</span>
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-300 hidden xs:inline">Downtown Arts District</span>
          <span aria-hidden="true" className="text-neutral-600 hidden xs:inline">·</span>
          <button
            onClick={onPromoClick}
            className="hover:underline text-[#f5d58c] flex items-center gap-1.5 cursor-pointer focus:outline-none font-bold tracking-wider transition-colors hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c89b53]" />
            <span>First Visit Privilege (20% Off)</span>
          </button>
        </div>

        {/* Primary Display Headline — gradient shimmer text */}
        <h1
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase max-w-4xl leading-[1.12] sm:leading-[1.08] mb-6 sm:mb-7 text-balance animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <span className="text-[#f7f5f0]">The Craft of Barbering,{' '}</span>
          <span
            className="block sm:inline mt-1 sm:mt-0 font-extrabold gold-gradient-text"
            style={{ filter: 'drop-shadow(0 0 28px rgba(200,155,83,0.30))' }}
          >
            Elevated
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-9 sm:mb-13 text-balance px-2 animate-fade-up"
          style={{ animationDelay: '0.25s' }}
        >
          Meticulous scissor work, surgical skin fades, and traditional hot-towel straight-razor shaving. Dedicated to gentlemen who value unhurried precision and genuine hospitality.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto mb-12 sm:mb-18 animate-fade-up"
          style={{ animationDelay: '0.35s' }}
        >
          {/* Primary — gold shimmer shine */}
          <button
            onClick={onBookClick}
            className="btn-gold-shine gold-glow-pulse w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#08090c] rounded-xl flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.98] transition-transform"
          >
            <Calendar className="w-4 h-4 text-[#08090c] group-hover:scale-110 transition-transform duration-300 shrink-0" />
            <span>Schedule Appointment</span>
          </button>

          {/* Secondary — glass outline */}
          <button
            onClick={onExploreServices}
            className="btn-glass-outline w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-neutral-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] hover:text-[#e5c07b]"
          >
            <span>View Services &amp; Rates</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#c89b53] shrink-0 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Divider glow */}
        <div
          className="w-full max-w-4xl divider-glow mb-8 sm:mb-10 animate-fade-up"
          style={{ animationDelay: '0.45s' }}
        />

        {/* Quantitative Proof Strip */}
        <div
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 text-center animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          
          {/* Card 1: Reviews */}
          <div className="liquid-glass-card stat-card-shine p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center min-h-[96px] sm:min-h-[110px] group cursor-default">
            <p className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-[#f7f5f0] group-hover:gold-gradient-text transition-colors tabular-nums leading-tight group-hover:text-[#e5c07b]">
              4.9 / 5.0
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
              <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37] shrink-0" />
              <span>620+ Reviews</span>
            </p>
          </div>

          {/* Card 2: Barbers */}
          <div className="liquid-glass-card stat-card-shine p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center min-h-[96px] sm:min-h-[110px] group cursor-default">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#f7f5f0] group-hover:text-[#e5c07b] transition-colors leading-tight">
              4 Masters
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 font-medium">
              Licensed Craftsmen
            </p>
          </div>

          {/* Card 3: Sterilization */}
          <div className="liquid-glass-card stat-card-shine p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center min-h-[96px] sm:min-h-[110px] group cursor-default">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#f7f5f0] group-hover:text-[#e5c07b] transition-colors leading-tight">
              100% Sterile
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c89b53] shrink-0" />
              <span>Single-Use Blades</span>
            </p>
          </div>

          {/* Card 4: Hospitality */}
          <div className="liquid-glass-card stat-card-shine p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center min-h-[96px] sm:min-h-[110px] group cursor-default">
            <p className="font-display text-base sm:text-lg md:text-xl font-bold text-[#f7f5f0] group-hover:text-[#e5c07b] transition-colors leading-tight">
              Complimentary
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 font-medium flex items-center justify-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-[#c89b53] shrink-0" />
              <span>Espresso &amp; Spirits</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

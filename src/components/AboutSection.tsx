import React from 'react';
import { ShieldCheck, Sparkles, Coffee, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-36 bg-[#08090c] text-[#ede8df] border-b border-neutral-800/80 overflow-hidden">
      
      {/* Liquid blur ambient backdrop */}
      <div className="absolute top-1/3 -right-20 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-[#c89b53]/10 blur-[140px] rounded-full pointer-events-none animate-liquid-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase (Responsive on mobile & tablet) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden liquid-glass-card border border-[#c89b53]/40 shadow-2xl">
              <img
                src="/images/straight_razor_shave_1790225630292.jpg"
                alt="Traditional Straight Razor Shave Ritual"
                className="w-full h-[360px] sm:h-[460px] object-cover object-center filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#08090c]/20 pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 liquid-glass-card rounded-xl shadow-xl">
                <p className="font-display text-sm sm:text-base font-bold text-[#f7f5f0]">
                  The Hot Towel & Straight Razor Ritual
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 sm:mt-1.5 leading-relaxed font-light">
                  Single-use surgical Japanese carbon steel blades, steamed organic eucalyptus towels, and small-batch essential balms.
                </p>
              </div>
            </div>

            {/* Overlapping secondary image card on tablet and desktop */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#c89b53]/60 shadow-2xl liquid-glass">
              <img
                src="/images/barber_haircut_craft_1790225617790.jpg"
                alt="Precision Scissor Detailing"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c89b53] font-semibold mb-3">
              Our Heritage & Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f5f0] uppercase mb-5 sm:mb-6 leading-[1.15]">
              Honoring Old-World Craft in the Modern Age
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 font-light">
              Founded in 2018 in the Downtown Arts District, Heritage & Blade was created to resurrect the lost art of unhurried, gentlemanly grooming. We rejected the 10-minute assembly line haircut in favor of disciplined geometry, tailored consultations, and classic hospitality.
            </p>
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 font-light">
              Here, every haircut begins with listening. We study your hairline, growth patterns, and face shape before shears touch hair. We finish with steamed towels, custom neck tapers, and cold stone tonic to leave you refreshed, sharp, and confident.
            </p>

            {/* Four Tenets of Excellence (Responsive 1-col / 2-col Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-neutral-800/80">
              <div className="flex items-start gap-3.5 p-4 rounded-xl liquid-glass-card border border-neutral-800/80">
                <div className="p-2.5 rounded-lg bg-[#141722] text-[#c89b53] shrink-0 border border-[#c89b53]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#f7f5f0] uppercase tracking-wide">
                    Hospital-Grade Sanitation
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed font-light">
                    UV sterilizers, Barbicide immersion, and single-use straight razors discarded after every client.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl liquid-glass-card border border-neutral-800/80">
                <div className="p-2.5 rounded-lg bg-[#141722] text-[#c89b53] shrink-0 border border-[#c89b53]/30">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#f7f5f0] uppercase tracking-wide">
                    Artisanal Lounge Amenities
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed font-light">
                    Complimentary pour-over espresso, craft cold brew, and curated Oregon single malt whiskies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl liquid-glass-card border border-neutral-800/80">
                <div className="p-2.5 rounded-lg bg-[#141722] text-[#c89b53] shrink-0 border border-[#c89b53]/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#f7f5f0] uppercase tracking-wide">
                    Guaranteed Appointment Times
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed font-light">
                    We honor your schedule. Your chair is waiting for you when you arrive, guaranteed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl liquid-glass-card border border-neutral-800/80">
                <div className="p-2.5 rounded-lg bg-[#141722] text-[#c89b53] shrink-0 border border-[#c89b53]/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#f7f5f0] uppercase tracking-wide">
                    Small-Batch Apothecary
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed font-light">
                    Formulated with organic beeswax, shea butter, cedarwood, and tobacco leaf extracts.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


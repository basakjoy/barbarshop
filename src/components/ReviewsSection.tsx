import React from 'react';
import { TESTIMONIALS } from '../data/barbershopData';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-[#08090c] text-[#ede8df] border-b border-neutral-800/80 overflow-hidden">
      
      {/* Liquid blur ambient backdrop */}
      <div className="absolute top-10 left-1/3 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-[#d4af37]/8 blur-[140px] rounded-full pointer-events-none animate-liquid-3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c89b53] font-semibold mb-3">
            Client Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f5f0] uppercase mb-4 leading-tight">
            Words From The Chair
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-neutral-400 mt-3">
            <div className="flex text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
              ))}
            </div>
            <span className="font-semibold text-[#f7f5f0]">4.9 out of 5</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Based on 620+ Verified Client Appointments</span>
          </div>
        </div>

        {/* Responsive Testimonials Grid (1-col on mobile, 2-col on tablet, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="liquid-glass-card p-6 sm:p-8 rounded-2xl relative flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-2xl"
            >
              <div>
                <Quote className="w-8 h-8 sm:w-9 sm:h-9 text-[#c89b53]/40 mb-4" />
                <div className="flex text-[#d4af37] mb-3.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-light italic mb-6 sm:mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm sm:text-base font-bold text-[#f7f5f0]">
                      {t.author}
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">{t.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] sm:text-xs text-[#e5c07b] font-medium block">
                      {t.service}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500 font-mono mt-0.5 block">
                      {t.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

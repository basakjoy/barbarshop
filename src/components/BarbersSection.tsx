import React from 'react';
import { BARBERS } from '../data/barbershopData';
import { Barber } from '../types';
import { Calendar } from 'lucide-react';

interface BarbersSectionProps {
  onSelectBarber: (barber: Barber) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarber }) => {
  return (
    <section id="barbers" className="relative py-20 sm:py-28 md:py-36 bg-[#08090c] text-[#ede8df] border-b border-neutral-800/80 overflow-hidden">
      
      {/* Liquid blur ambient backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-[#c89b53]/10 blur-[130px] rounded-full pointer-events-none animate-liquid-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c89b53] font-semibold mb-3">
            The Artisans
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f5f0] uppercase mb-4 sm:mb-5 leading-tight">
            Master Barbers in Residence
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light text-balance px-2">
            Every barber at Heritage & Blade brings years of disciplined mastery in precision scissors, straight-edge craftsmanship, and personalized client consultation.
          </p>
        </div>

        {/* Barbers Grid (Responsive 1-col on mobile, 2-col on tablet, 4-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {BARBERS.map(barber => (
            <div
              key={barber.id}
              className="liquid-glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-300 shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-neutral-900">
                <img
                  src={barber.avatarUrl}
                  alt={`Master Barber ${barber.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0f16]/20 pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono text-[#e5be75] font-semibold tabular-nums liquid-glass-pill px-2.5 py-1 rounded-md text-[11px]">
                    {barber.experienceYears}+ Yrs Craft
                  </span>
                  <span className="text-neutral-300 font-medium text-[11px] liquid-glass-pill px-2 py-0.5 rounded">
                    {barber.instagram}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#f7f5f0] group-hover:text-[#e5c07b] transition-colors">
                    {barber.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#c89b53] font-semibold mt-1 mb-2.5">
                    {barber.role}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-4 line-clamp-3">
                    {barber.bio}
                  </p>

                  {/* Specialties List */}
                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Specialties</p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-neutral-300">
                      {barber.specialties.map(spec => (
                        <span key={spec} className="inline-flex items-center text-[11px] text-neutral-300 liquid-glass-pill px-2 py-0.5 rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={() => onSelectBarber(barber)}
                  className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase bg-neutral-900/90 border border-neutral-700/80 hover:border-[#c89b53] hover:bg-[#c89b53] hover:text-[#08090c] text-[#ece8e1] transition-all rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book With {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { SERVICES } from '../data/barbershopData';
import { BarberService, ServiceCategory } from '../types';
import { Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: BarberService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard & Shaves' },
    { id: 'combo', label: 'Signature Packages' },
    { id: 'spa', label: 'Scalp & Facial Care' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-36 bg-[#08090c] text-[#ede8df] border-b border-neutral-800/80 overflow-hidden">
      
      {/* Liquid atmospheric background orbs */}
      <div className="absolute top-10 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#c89b53]/10 blur-[120px] rounded-full pointer-events-none animate-liquid-2" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#d4af37]/8 blur-[130px] rounded-full pointer-events-none animate-liquid-3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c89b53] font-semibold mb-3">
            The Menu of Services
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f5f0] uppercase mb-4 sm:mb-5 leading-tight">
            Curated Barbering & Grooming
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light text-balance px-2">
            Every appointment begins with an in-depth consultation, hot steam towel preparation, and finishes with a tailored wash, neck shave, and custom styling.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls (Responsive Scroll on Mobile) */}
        <div className="flex items-center justify-start sm:justify-center mb-10 sm:mb-14 overflow-x-auto pb-2 no-scrollbar px-1">
          <div className="inline-flex p-1.5 liquid-glass rounded-full shadow-xl border border-[#c89b53]/30 shrink-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ServiceCategory | 'all')}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-[#c89b53] text-[#08090c] shadow-md font-bold scale-[1.02]'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (Responsive across phone, tablet, and PC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="group relative liquid-glass-card p-6 sm:p-8 flex flex-col justify-between rounded-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Top Badge Row: Estimated Duration & Featured Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-[#e5c07b] text-xs font-semibold tracking-wide">
                    <Clock className="w-3.5 h-3.5 text-[#c89b53]" />
                    <span>{service.durationMinutes} mins</span>
                  </span>

                  {service.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#c89b53]/15 text-[#f5d58c] border border-[#c89b53]/35">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" /> Signature Ritual
                    </span>
                  )}
                </div>

                {/* Header row: Service name & price */}
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#f7f5f0] leading-snug group-hover:text-[#e5c07b] transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="font-display text-2xl font-bold text-[#e5c07b] tabular-nums">
                      ${service.price}
                    </span>
                  </div>
                </div>

                {/* Clear Estimated Chair Time planning indicator */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4 font-light">
                  <span className="text-neutral-500">Est. Duration:</span>
                  <span className="font-semibold text-[#f7f5f0] tabular-nums">{service.durationMinutes} mins</span>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
                  <span className="text-neutral-400">Warm towel finish</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6 sm:mb-8">
                  {service.description}
                </p>
              </div>

              {/* Action & Duration Footer */}
              <div className="pt-4 sm:pt-5 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-light">
                  <Clock className="w-3.5 h-3.5 text-[#c89b53]/70" />
                  <span>{service.durationMinutes} mins session</span>
                </div>
                <button
                  onClick={() => onSelectService(service)}
                  className="px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs font-semibold tracking-wider uppercase text-[#c89b53] bg-neutral-900/90 border border-[#c89b53]/40 hover:bg-[#c89b53] hover:text-[#08090c] transition-all rounded-lg flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Service Spotlight Box (Liquid Glass Banner) */}
        <div className="mt-14 sm:mt-20 liquid-glass-card p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-[#c89b53]/40 shadow-2xl">
          {/* Inner atmospheric liquid glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c89b53]/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 items-center relative z-10">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#e5c07b] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>The Definitive Grooming Ritual</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c89b53]/20 border border-[#c89b53]/40 text-[#f7f5f0] text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#c89b53]" />
                  <span>75 mins duration</span>
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f7f5f0] mb-3 sm:mb-4">
                The Full Craftsman Experience (75 mins)
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-light">
                Tailored haircut, precision beard sculpting or classic straight razor shave, invigorating peppermint scalp massage, steam towel treatment, and complimentary single malt pour. Designed for complete restoration.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-neutral-300">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c89b53] shrink-0" /> Full Haircut & Scissor Finish</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c89b53] shrink-0" /> Straight Razor Facial Ritual</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c89b53] shrink-0" /> Scalp Detox & Cold Towel Rest</span>
              </div>
            </div>

            <div className="lg:text-right flex flex-row lg:flex-col items-center lg:items-end justify-between gap-5 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1 font-medium">Complete Package</p>
                <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5c07b] tabular-nums">$95</p>
              </div>
              <button
                onClick={() => {
                  const craftsman = SERVICES.find(s => s.id === 'craftsman-package');
                  if (craftsman) onSelectService(craftsman);
                }}
                className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-widest uppercase bg-[#c89b53] text-[#08090c] hover:bg-[#dbab5e] transition-all rounded-xl cursor-pointer shadow-xl shadow-black/60"
              >
                Schedule Craftsman
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

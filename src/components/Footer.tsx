import React from 'react';
import { BARBERSHOP_INFO } from '../data/barbershopData';
import { Scissors, Instagram, Facebook, Twitter, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenPromo: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenBooking,
  onOpenLookup,
  onOpenPromo,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06070a] border-t border-neutral-800/80 text-neutral-400 text-xs sm:text-sm overflow-hidden">
      {/* Layered ambient glows */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-[#c89b53]/7 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#d4af37]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-10 pb-12 sm:pb-16">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl p-0.5 flex items-center justify-center shadow-lg shadow-black/40 gold-glow-sm" style={{background:'linear-gradient(135deg,#c89b53 0%,#f5d58c 45%,#c49048 100%)'}}>
                <div className="w-full h-full bg-[#08090c] rounded-[10px] flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-[#e5c07b]" />
                </div>
              </div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-[#f7f5f0] uppercase">
                Heritage & Blade
              </span>
            </div>
            
            <p className="text-neutral-400 leading-relaxed font-light max-w-sm text-xs sm:text-sm">
              Artisanal grooming and traditional hot-towel straight-razor shaving for the modern gentleman. Dedicated to uncompromised craftsmanship since 2018 in the Downtown Arts District.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BARBERSHOP_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl liquid-glass-card flex items-center justify-center text-neutral-400 hover:text-[#e5c07b] hover:border-[#c89b53]/55 transition-all duration-300 shadow-sm hover:gold-glow-sm"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BARBERSHOP_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl liquid-glass-card flex items-center justify-center text-neutral-400 hover:text-[#e5c07b] hover:border-[#c89b53]/55 transition-all duration-300 shadow-sm"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BARBERSHOP_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl liquid-glass-card flex items-center justify-center text-neutral-400 hover:text-[#e5c07b] hover:border-[#c89b53]/55 transition-all duration-300 shadow-sm"
                aria-label="Twitter profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3.5 sm:space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#f7f5f0] font-semibold">
              Explore
            </p>
            <ul className="space-y-2.5 sm:space-y-3 text-neutral-400 font-light text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  Services & Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('barbers')}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  Master Barbers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  The Craft & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location')}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  Hours & Directions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPromo}
                  className="text-[#e5c07b] hover:underline cursor-pointer font-medium"
                >
                  First-Visit Offer (20% Off)
                </button>
              </li>
            </ul>
          </div>

          {/* Appointment Concierge */}
          <div className="space-y-3.5 sm:space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#f7f5f0] font-semibold">
              Appointments
            </p>
            <ul className="space-y-2.5 sm:space-y-3 font-light text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-white hover:text-[#e5c07b] font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#c89b53]" />
                  <span>Book Appointment</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  View My Scheduled Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  Sync to Calendar (Google/Apple)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#e5c07b] transition-colors cursor-pointer"
                >
                  Cancellation & Grace Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
            <p className="text-xs uppercase tracking-widest text-[#f7f5f0] font-semibold">
              The Shop
            </p>
            <p className="text-neutral-300 font-light leading-relaxed">
              {BARBERSHOP_INFO.address}<br />
              {BARBERSHOP_INFO.city}
            </p>
            <p className="font-mono text-white font-medium">
              {BARBERSHOP_INFO.phone}
            </p>
            <p className="text-neutral-400 font-light leading-relaxed">
              Mon–Fri: 8am–8pm<br />
              Sat: 9am–6pm · Sun: 10am–5pm
            </p>
          </div>

        </div>

        {/* Glowing divider */}
        <div className="divider-glow my-0 mb-8 sm:mb-10" />

        {/* Bottom Legal Row */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <p>
            &copy; {new Date().getFullYear()} {BARBERSHOP_INFO.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onOpenTerms}
              className="hover:text-neutral-300 transition-colors cursor-pointer focus:outline-none"
            >
              Terms & Conditions
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-neutral-300 transition-colors cursor-pointer focus:outline-none"
            >
              Sanitation & Hygiene Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-neutral-300 transition-colors cursor-pointer focus:outline-none"
            >
              Privacy Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

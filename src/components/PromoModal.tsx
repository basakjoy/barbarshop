import React, { useEffect } from 'react';
import { PROMO_OFFER } from '../data/barbershopData';
import { X, Sparkles, ArrowRight, Tag, Check } from 'lucide-react';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAndBook: (code: string) => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({
  isOpen,
  onClose,
  onApplyAndBook,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Close on Escape
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_OFFER.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div
        className="relative w-full max-w-lg liquid-glass-card rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-9 text-[#ede8df] overflow-hidden border border-[#c89b53]/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
      >
        {/* Subtle decorative liquid ambient orb */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#c89b53]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg focus:outline-none cursor-pointer hover:bg-neutral-800/60"
          aria-label="Close special offer modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge & Header */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 sm:mb-2.5">
          <Sparkles className="w-4 h-4 text-[#c89b53]" />
          <span>Client Privilege · First Visit Invitation</span>
        </div>

        <h3 id="promo-title" className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#f7f5f0] uppercase mb-2.5 sm:mb-3 leading-snug">
          Enjoy 20% Off Your First Appointment
        </h3>

        <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-light mb-6 sm:mb-7">
          Experience the pinnacle of traditional craftsmanship. Book your inaugural cut, fade, or hot towel straight-razor shave and receive 20% off your service, plus a complimentary steamed eucalyptus scalp treatment.
        </p>

        {/* Promo Code Box */}
        <div className="liquid-glass p-4 sm:p-5 rounded-xl flex items-center justify-between mb-6 sm:mb-7 border border-[#c89b53]/35 shadow-inner">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-0.5">
              Promotion Code
            </span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#e5c07b] tracking-wider">
              {PROMO_OFFER.code}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1d202c] hover:bg-[#272b3c] text-neutral-200 rounded-lg flex items-center gap-2 transition-colors cursor-pointer border border-neutral-700/80 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Tag className="w-3.5 h-3.5 text-[#c89b53]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onApplyAndBook(PROMO_OFFER.code)}
            className="w-full py-3.5 sm:py-4 text-xs font-bold uppercase tracking-widest bg-[#c89b53] hover:bg-[#dbab5e] text-[#08090c] rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl shadow-[#c89b53]/25"
          >
            <span>Apply 20% Code & Book Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors text-center cursor-pointer"
          >
            No thanks, explore services first
          </button>
        </div>

        {/* Fine print */}
        <p className="text-[10px] sm:text-[11px] text-neutral-500 text-center mt-4 font-light">
          Valid for first-time guests on any haircut, beard sculpting, or grooming package.
        </p>

      </div>
    </div>
  );
};

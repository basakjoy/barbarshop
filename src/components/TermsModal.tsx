import React, { useEffect } from 'react';
import { BARBERSHOP_INFO } from '../data/barbershopData';
import { X, ShieldCheck, FileText, Scale } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[88vh] bg-[#12141a] border border-neutral-700/80 rounded-2xl shadow-2xl flex flex-col text-[#ece8e1] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-neutral-800 flex items-center justify-between bg-[#151720]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#222530] text-[#c89b53] flex items-center justify-center border border-neutral-700/60 shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 id="terms-title" className="font-display text-lg sm:text-xl font-bold text-[#f7f5f0] uppercase tracking-wide">
                Terms of Service & Salon Policies
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                Last updated: September 2026 · {BARBERSHOP_INFO.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-neutral-400 hover:text-white transition-colors rounded-lg focus:outline-none cursor-pointer hover:bg-neutral-800/50"
            aria-label="Close terms modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
          
          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              1. Agreement to Terms
            </h4>
            <p>
              By accessing our website, scheduling an appointment through our online concierge, or receiving grooming services at {BARBERSHOP_INFO.name} ("the Shop", "we", "us"), you agree to be legally bound by these Terms and Conditions. If you do not agree to these terms, please refrain from booking or utilizing our premises.
            </p>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              2. Appointment Reservations & Guarantees
            </h4>
            <p>
              All online bookings are held in our real-time master appointment schedule. When you reserve a chair with a designated Master Barber, that time window is dedicated solely to your session. We ask that all clients arrive 5 to 10 minutes prior to scheduled appointment start times to enjoy complimentary beverages and ensure an unhurried consultation.
            </p>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              3. Cancellation & Rescheduling Policy (24-Hour Notice)
            </h4>
            <p>
              We understand that unforeseen events arise. We respectfully request a minimum of <strong>24 hours advanced notice</strong> for any cancellations or appointment reschedules. This allows our craftsmen the opportunity to offer that reserved chair to waiting clients. Cancellations made with less than 24 hours notice or missed appointments ("no-shows") may be subject to a fee equal to 50% of the scheduled service value prior to future bookings.
            </p>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              4. Late Arrival & Grace Period
            </h4>
            <p>
              To maintain respect for all guests, appointments operate on strict schedules. We provide a <strong>15-minute grace period</strong>. If you arrive more than 15 minutes past your scheduled start time, we cannot guarantee the complete original service (such as hot towel straight-razor finish or facial tonic) in order to avoid delaying subsequent clients, or your appointment may need to be rescheduled.
            </p>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              5. Hygiene, Sanitation & Health Standards
            </h4>
            <p>
              The health and safety of our clients and barbers is paramount. {BARBERSHOP_INFO.name} strictly enforces state board hospital-grade sanitation:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-neutral-300">
              <li>All straight razors use single-use surgical grade disposable blades replaced for every client.</li>
              <li>Shears, clippers, and guards are sanitized with Barbicide and UV sterilizers between every appointment.</li>
              <li>Steamed towels are laundered at high temperatures with medical-grade antiseptic wash.</li>
              <li>For the protection of all clients, our barbers reserve the legal right to refuse service to any individual exhibiting symptoms of contagious skin conditions, open lesions, or communicable illness.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              6. Rates, Payments & Promotional Codes
            </h4>
            <p>
              All prices listed on our website and in our booking system are in US Dollars ($ USD) and represent the total service charge before gratuity. Payment is collected in person at the conclusion of your service via Cash, major Credit/Debit Cards, or contactless Apple/Google Pay. Promotional codes (such as first-visit welcome discounts) must be declared at the time of booking or during check-in.
            </p>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              7. Allergies & Skin Sensitivity
            </h4>
            <p>
              It is the client's responsibility to notify the barber before service commencement of any known allergies or skin sensitivities to essential oils, astringents, menthol, latex, or cosmetic pomades. A patch test is readily available upon request.
            </p>
          </section>

          <section>
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2.5">
              8. Contact & Business Inquiries
            </h4>
            <p>
              If you have questions regarding these terms, your scheduled reservation, or special accommodations, please contact our concierge at <strong>{BARBERSHOP_INFO.email}</strong> or call the shop directly at <strong>{BARBERSHOP_INFO.phone}</strong>.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="p-5 bg-[#151720] border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c89b53] hover:bg-[#dbab5e] text-[#0c0d10] rounded-lg cursor-pointer transition-all shadow-md"
          >
            I Acknowledge & Understand
          </button>
        </div>

      </div>
    </div>
  );
};

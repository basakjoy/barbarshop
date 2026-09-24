import React, { useState } from 'react';
import { BARBERSHOP_INFO } from '../data/barbershopData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Car } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="location" className="relative py-20 sm:py-28 md:py-36 bg-[#08090c] text-[#ede8df] border-b border-neutral-800/80 overflow-hidden">
      
      {/* Liquid blur ambient backdrop */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-[#c89b53]/10 blur-[130px] rounded-full pointer-events-none animate-liquid-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c89b53] font-semibold mb-3">
            Visit & Contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f5f0] uppercase mb-4 leading-tight">
            The Downtown Shop
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light text-balance px-2">
            Conveniently located in the historic Arts District with dedicated garage parking, curated listening room, and full concierge support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Business Particulars & Hours */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7">
            
            {/* Hours Card */}
            <div className="liquid-glass-card p-6 sm:p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#c89b53]" />
                  <h3 className="font-display text-base font-bold text-[#f7f5f0] uppercase tracking-wider">
                    Operating Hours
                  </h3>
                </div>
                <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-md">
                  Open Today
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {BARBERSHOP_INFO.hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-neutral-800/40 last:border-none">
                    <span className="text-neutral-300 font-light">{item.day}</span>
                    <span className="font-mono text-white font-medium">{item.open} – {item.close}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-5 italic font-light">
                Walk-ins welcomed subject to chair availability; appointments given primary priority.
              </p>
            </div>

            {/* Address & Contact Details */}
            <div className="liquid-glass-card p-6 sm:p-8 rounded-2xl space-y-5 shadow-2xl">
              <h3 className="font-display text-base font-bold text-[#f7f5f0] uppercase tracking-wider mb-2">
                Location & Inquiries
              </h3>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-[#c89b53] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{BARBERSHOP_INFO.address}</p>
                  <p className="text-neutral-400 font-light">{BARBERSHOP_INFO.city}</p>
                  <p className="text-xs text-neutral-500 mt-1 font-light">Cross streets: 4th & Jefferson St.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-sm pt-3 border-t border-neutral-800/80">
                <Phone className="w-4 h-4 text-[#c89b53] shrink-0" />
                <div>
                  <span className="text-neutral-400 font-light">Direct Shop Line: </span>
                  <a href={`tel:${BARBERSHOP_INFO.phone}`} className="font-mono text-white hover:text-[#c89b53] font-medium transition-colors">
                    {BARBERSHOP_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-sm pt-3 border-t border-neutral-800/80">
                <Mail className="w-4 h-4 text-[#c89b53] shrink-0" />
                <div>
                  <span className="text-neutral-400 font-light">Concierge Desk: </span>
                  <a href={`mailto:${BARBERSHOP_INFO.email}`} className="text-neutral-200 hover:text-[#c89b53] transition-colors">
                    {BARBERSHOP_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm pt-3 border-t border-neutral-800/80">
                <Car className="w-4 h-4 text-[#c89b53] shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 font-light">Client Parking: </span>
                  <span className="text-neutral-300 font-light leading-relaxed">
                    Complimentary 90-minute validated parking in the Artisan Courtyard garage directly behind the shop.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Concierge Message Form */}
          <div className="lg:col-span-7">
            <div className="liquid-glass-card p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f7f5f0] uppercase tracking-wide mb-2">
                Send a Message to Our Concierge
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6 sm:mb-8 font-light">
                Have questions about wedding party packages, group bookings, custom pomade formulations, or accessibility? Reach out directly.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 sm:p-10 rounded-xl text-center py-10 animate-fade-in shadow-inner">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="font-display text-xl font-bold text-white mb-2">
                    Message Received
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mb-6 font-light leading-relaxed">
                    Thank you, {formData.name}. Our front desk concierge will respond to {formData.email} within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="px-6 py-3 text-xs font-semibold uppercase bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg cursor-pointer transition-colors shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5 sm:mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Julian Sterling"
                        className="w-full bg-[#11141d]/90 border border-neutral-800/90 rounded-xl px-4 py-3 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none focus:border-[#c89b53] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="julian@example.com"
                        className="w-full bg-[#11141d]/90 border border-neutral-800/90 rounded-xl px-4 py-3 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none focus:border-[#c89b53] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5 sm:mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 728-3920"
                      className="w-full bg-[#11141d]/90 border border-neutral-800/90 rounded-xl px-4 py-3 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none focus:border-[#c89b53] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5 sm:mb-2">
                      Inquiry or Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please tell us how we can assist you..."
                      className="w-full bg-[#11141d]/90 border border-neutral-800/90 rounded-xl p-4 text-sm text-[#f7f5f0] placeholder-neutral-500 focus:outline-none focus:border-[#c89b53] resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 text-xs font-bold tracking-wider uppercase bg-[#c89b53] text-[#08090c] hover:bg-[#dbab5e] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl shadow-[#c89b53]/25"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

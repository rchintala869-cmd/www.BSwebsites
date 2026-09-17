import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Tag, 
  ShieldCheck, 
  Clock, 
  Gift, 
  ArrowRight, 
  CheckCircle2,
  Percent,
  PhoneCall
} from 'lucide-react';
import { DISPLAY_PHONE, openWhatsAppLink } from '../utils/whatsapp';

import { AnnouncementData } from '../types';
import { DEFAULT_ANNOUNCEMENT } from '../data/initialData';

interface OffersPosterProps {
  announcement?: AnnouncementData;
  onOpenOrderWebsiteModal: () => void;
  onBookAppointment: (topic?: string) => void;
}

export const OffersPoster: React.FC<OffersPosterProps> = ({
  announcement = DEFAULT_ANNOUNCEMENT,
  onOpenOrderWebsiteModal,
  onBookAppointment,
}) => {
  if (!announcement || announcement.isActive === false) return null;

  const handleClaimOfferWhatsApp = () => {
    const text = `Hi BS Websites (Bhargav & Siva)! I want to claim the offer:
${announcement.title} ${announcement.highlightText}
Coupon Code: ${announcement.couponCode}
Please share package pricing and project start steps!`;
    const url = `https://wa.me/919703281549?text=${encodeURIComponent(text)}`;
    openWhatsAppLink(url);
  };

  return (
    <section id="offers-poster" className="py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950/80 to-slate-950 border-2 border-indigo-500/40 p-6 sm:p-10 md:p-12 shadow-2xl shadow-indigo-950/70 overflow-hidden group">
          {/* Glowing Ambient Backdrop Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition duration-700"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Pill / Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider shadow-inner">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>{announcement.badge || 'Limited Festival Season Offer'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{announcement.validityText || 'Offer Valid This Month • Limited Project Slots'}</span>
            </div>
          </div>

          {/* Main Poster Layout: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Area (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {announcement.title} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300">
                  {announcement.highlightText}
                </span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {announcement.description}
              </p>

              {/* Inclusions Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {(announcement.inclusions && announcement.inclusions.length > 0 ? announcement.inclusions : [
                  '6 Months Free Warranty & Support',
                  'Free SSL & Custom Domain Assistance',
                  'Interactive WhatsApp Orders & Forms',
                  'Blazing Fast Delivery in 3-5 Days'
                ]).map((inclusion, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 bg-gray-900/60 border border-gray-800 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card / CTA Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-gray-900/90 border border-indigo-500/30 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block">Coupon Applied</span>
                      <strong className="text-white text-sm font-mono tracking-wider">{announcement.couponCode || 'FESTIVAL10'}</strong>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Basic Portfolio:</span>
                    <span className="font-bold text-white font-mono">₹10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Corporate / Business:</span>
                    <span className="font-bold text-white font-mono">₹12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-Commerce Store:</span>
                    <span className="font-bold text-emerald-400 font-mono">₹14,000 <span className="text-[10px] text-gray-400 line-through">₹19,999</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custom AI / Web App:</span>
                    <span className="font-bold text-emerald-400 font-mono">₹18,000 <span className="text-[10px] text-gray-400 line-through">₹24,999</span></span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={handleClaimOfferWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Claim Discount via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onOpenOrderWebsiteModal}
                      className="py-2.5 px-3 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-200 hover:text-white border border-indigo-500/40 font-bold text-xs transition text-center"
                    >
                      Order Website
                    </button>
                    <button
                      onClick={() => onBookAppointment('Festival Offer Consultation')}
                      className="py-2.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3 h-3 text-cyan-400" />
                      <span>Book Call</span>
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-center text-gray-500">
                  Instant response from Siva & Bhargav on WhatsApp: +91 9703281549
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, ArrowRight, FileText } from 'lucide-react';

interface WarrantyBannerProps {
  onOpenWarrantyModal: () => void;
  onOpenOrderModal: () => void;
}

export const WarrantyBanner: React.FC<WarrantyBannerProps> = ({
  onOpenWarrantyModal,
  onOpenOrderModal,
}) => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-indigo-950/60 to-purple-950/70 border-2 border-emerald-500/40 p-5 sm:p-7 shadow-2xl shadow-emerald-950/40">
        {/* Glowing backdrop elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Left info */}
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 animate-pulse" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                  Official Client Guarantee
                </span>
                <span className="text-xs text-indigo-300 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Bhargav &bull; Bhavesh &bull; Siva
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                6 Months Free Warranty & Technical Support on Every Website
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
                We don't just deliver your website and walk away. Every website is safeguarded with 180 days of free bug rectifications, cross-browser fixes, and direct WhatsApp support.
              </p>

              {/* Quick coverage tags */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Zero-Cost Bug Fixes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mobile & Tablet Fixes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Digital Warranty Certificate
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto justify-end flex-shrink-0">
            <button
              onClick={onOpenWarrantyModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-cyan-300 hover:text-white font-bold text-xs border border-cyan-500/40 transition flex items-center justify-center gap-2 shadow-md"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Warranty Certificate</span>
            </button>

            <button
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-2"
            >
              <span>Order Protected Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

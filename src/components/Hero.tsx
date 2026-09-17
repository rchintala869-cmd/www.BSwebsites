import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  MessageSquare,
  Globe,
  Tag
} from 'lucide-react';
import { DISPLAY_PHONE, createQuickChatWhatsAppUrl, openWhatsAppLink } from '../utils/whatsapp';

interface HeroProps {
  onExplorePlans: () => void;
  onBookAppointment: () => void;
  onOrderWebsite: () => void;
  customerName?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePlans,
  onBookAppointment,
  onOrderWebsite,
  customerName,
}) => {
  const handleQuickWhatsApp = () => {
    const url = createQuickChatWhatsAppUrl(customerName);
    openWhatsAppLink(url);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Announcement Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-indigo-950/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Tailored Custom Web Solutions by Bhargav, Bhavesh & Siva</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-emerald-400 font-bold hidden sm:inline flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 inline" />
            Pricing: ₹10,000 – ₹18,000
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          High-Converting Websites <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            Crafted for Growth & Sales
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-gray-400 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Get a stunning, lightning-fast, and responsive website customized for your business. Direct communication with your developer, designer, and sales mediator with <strong>zero agency overhead</strong> and instant WhatsApp project tracking.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOrderWebsite}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition duration-200 flex items-center justify-center gap-2.5 text-base border border-emerald-400/30"
          >
            <Globe className="w-5 h-5 text-white" />
            <span>Order Website (₹10k – ₹18k)</span>
          </button>

          <button
            onClick={onExplorePlans}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-gray-200 bg-gray-900/90 hover:bg-gray-800 border border-gray-700/80 hover:border-gray-600 transition duration-200 flex items-center justify-center gap-2 text-base backdrop-blur-md shadow-lg"
          >
            <span>View Packages</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </button>

          <button
            onClick={handleQuickWhatsApp}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 transition duration-200 flex items-center justify-center gap-2 text-base"
            title="Chat directly on WhatsApp"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp {DISPLAY_PHONE}</span>
          </button>
        </div>

        {/* Four Trust Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-6 border-t border-gray-800/60">
          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800/80 text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">2-3 Day Delivery</h4>
            <p className="text-gray-400 text-xs mt-0.5">Rapid turnaround for quick business launch</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800/80 text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">₹10,000 – ₹18,000 Range</h4>
            <p className="text-gray-400 text-xs mt-0.5">Fixed or bargain pricing with no hidden costs</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800/80 text-left">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">100% Responsive</h4>
            <p className="text-gray-400 text-xs mt-0.5">Flawless on smartphones, tablets, and 4K displays</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800/80 text-left">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Direct Team Access</h4>
            <p className="text-gray-400 text-xs mt-0.5">Talk directly with Bhargav, Bhavesh, & Siva</p>
          </div>
        </div>
      </div>
    </section>
  );
};

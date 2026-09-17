import React from 'react';
import { 
  Code2, 
  Palette, 
  Headphones, 
  Shield, 
  MessageSquare, 
  Heart,
  ArrowUp
} from 'lucide-react';
import { DISPLAY_PHONE, createQuickChatWhatsAppUrl, openWhatsAppLink } from '../utils/whatsapp';

interface FooterProps {
  onOpenAuthModal: () => void;
  onOpenAppointmentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuthModal,
  onOpenAppointmentModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const url = createQuickChatWhatsAppUrl();
    openWhatsAppLink(url);
  };

  return (
    <footer className="bg-[#070A11] border-t border-gray-800/80 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 flex items-center justify-center font-black text-white text-lg shadow-md">
                BS
              </div>
              <span className="text-xl font-black text-white tracking-tight">BS Websites</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Specialized custom website creation studio delivering high-speed, modern dark-themed web solutions tailored for business conversion and real growth.
            </p>
            <div className="text-xs text-gray-300">
              WhatsApp: <strong className="text-emerald-400 font-mono">{DISPLAY_PHONE}</strong>
            </div>
          </div>

          {/* Col 2: Core Team Credits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              BS Websites Core Team
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <strong className="text-gray-200">Bhargav</strong>
                  <span className="text-gray-500 block text-[11px]">Web Developer & Architecture</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div>
                  <strong className="text-gray-200">Bhavesh</strong>
                  <span className="text-gray-500 block text-[11px]">Web Designer & UI/UX Craft</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <strong className="text-gray-200">Siva</strong>
                  <span className="text-gray-500 block text-[11px]">Sales Mediator & Client Relations</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Packages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Website Packages
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#packages" className="hover:text-white transition">Basic / Portfolio Website (₹2,999)</a></li>
              <li><a href="#packages" className="hover:text-white transition">Business / Corporate Website (₹6,999)</a></li>
              <li><a href="#packages" className="hover:text-white transition">E-Commerce Storefront (₹12,999)</a></li>
              <li><a href="#packages" className="hover:text-white transition">Custom AI & Dynamic Web App (₹19,999)</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Consultation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Access
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={handleWhatsApp}
                className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Hotline</span>
              </button>

              <button
                onClick={() => onOpenAppointmentModal()}
                className="w-full py-2 px-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <span>Book Appointment</span>
              </button>

              <button
                onClick={onOpenAuthModal}
                className="w-full py-2 px-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-purple-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Switch Portal (Customer/Owner)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BS Websites. All rights reserved. Designed & developed with pride.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

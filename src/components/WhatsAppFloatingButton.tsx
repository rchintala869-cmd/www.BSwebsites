import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { DISPLAY_PHONE, createQuickChatWhatsAppUrl, openWhatsAppLink } from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  customerName?: string;
  onOpenAppointmentModal: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  customerName,
  onOpenAppointmentModal,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsAppClick = () => {
    const url = createQuickChatWhatsAppUrl(customerName);
    openWhatsAppLink(url);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating proactive tooltip */}
      {showTooltip && (
        <div className="mb-3 max-w-[260px] p-3 rounded-2xl bg-gray-900 border border-emerald-500/40 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-white p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5">
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute inset-0"></div>
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                Need a website estimate?
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Chat with <strong>Siva</strong> on WhatsApp ({DISPLAY_PHONE}) for instant answers.
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                >
                  Chat Now
                </button>
                <button
                  onClick={() => {
                    setShowTooltip(false);
                    onOpenAppointmentModal();
                  }}
                  className="text-[10px] font-semibold text-gray-300 hover:text-white underline"
                >
                  Book Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Action Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Open WhatsApp conversation"
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
        </span>
        
        {/* Lucide Message / WhatsApp Icon representation */}
        <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
        
        <div className="text-left hidden sm:block">
          <div className="text-[10px] uppercase font-bold tracking-wider leading-none text-emerald-100">
            Chat on WhatsApp
          </div>
          <div className="text-xs font-black tracking-tight leading-none mt-0.5">
            {DISPLAY_PHONE}
          </div>
        </div>
      </button>
    </div>
  );
};

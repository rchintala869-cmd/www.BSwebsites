import React, { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Headphones, 
  Shield, 
  User, 
  LogOut, 
  ExternalLink,
  Globe,
  Sparkles,
  Award,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { CustomerUser, PortalMode } from '../types';
import { DISPLAY_PHONE } from '../utils/whatsapp';
import { BSLogo } from './BSLogo';

interface HeaderProps {
  portalMode: PortalMode;
  currentCustomer: CustomerUser | null;
  customLogoUrl?: string | null;
  bhargavPhoto?: string;
  bhaveshPhoto?: string;
  sivaPhoto?: string;
  onOpenAuthModal: () => void;
  onSwitchToOwner: () => void;
  onSwitchToCustomer: () => void;
  onLogout: () => void;
  onOpenAppointmentModal: (topic?: string) => void;
  onOpenOrderWebsiteModal: () => void;
  onOpenWarrantyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  portalMode,
  currentCustomer,
  customLogoUrl,
  bhargavPhoto = '/bhargav.jpg',
  bhaveshPhoto = '/bhavesh.jpg',
  sivaPhoto,
  onOpenAuthModal,
  onSwitchToOwner,
  onSwitchToCustomer,
  onLogout,
  onOpenAppointmentModal,
  onOpenOrderWebsiteModal,
  onOpenWarrantyModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl border-b border-gray-800/60 transition-colors shadow-lg shadow-black/30">
      {/* Sleek Minimal Micro-Bar */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border-b border-gray-800/40 py-0.5 px-3 text-[11px] text-gray-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] text-gray-300">
              Custom Web Development Studio &bull; 6 Months Free Warranty &bull; 3-5 Days Delivery
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="text-[10px] text-gray-400">Direct WhatsApp:</span>
              <strong className="font-mono text-white text-[11px]">{DISPLAY_PHONE}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Top Header: Sleek, compact height with minimal border */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* BRANDING & LOGO & TEAM CREDITS */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            {/* Custom Business Logo */}
            <BSLogo customLogoUrl={customLogoUrl} size="md" className="group-hover:scale-105 transition duration-200" />
            
            <div>
              {/* Primary Brand Name */}
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                  BS Websites
                </h1>
                <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Custom Studio
                </span>
              </div>

              {/* Team Credits Displayed with Circular Profile Photos */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[11px] mt-1 text-gray-300">
                {/* Bhargav - Web Developer */}
                <span className="inline-flex items-center gap-1 bg-gray-900/90 px-2 py-0.5 rounded-full border border-blue-500/40 text-blue-300 shadow-sm">
                  <img 
                    src={bhargavPhoto} 
                    alt="Bhargav" 
                    className="w-4 h-4 rounded-full object-cover border border-blue-400"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <strong className="text-white">Bhargav</strong>
                  <span className="text-blue-300 font-medium text-[9px] sm:text-[10px]">- Web Dev</span>
                </span>

                <span className="text-gray-600 hidden sm:inline">|</span>

                {/* Bhavesh - Web Designer */}
                <span className="inline-flex items-center gap-1 bg-gray-900/90 px-2 py-0.5 rounded-full border border-purple-500/40 text-purple-300 shadow-sm">
                  <img 
                    src={bhaveshPhoto} 
                    alt="Bhavesh" 
                    className="w-4 h-4 rounded-full object-cover border border-purple-400"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <strong className="text-white">Bhavesh</strong>
                  <span className="text-purple-300 font-medium text-[9px] sm:text-[10px]">- Designer</span>
                </span>

                <span className="text-gray-600 hidden sm:inline">|</span>

                {/* Siva - Sales Mediator */}
                <span className="inline-flex items-center gap-1 bg-gray-900/90 px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-300 shadow-sm">
                  {sivaPhoto ? (
                    <img 
                      src={sivaPhoto} 
                      alt="Siva" 
                      className="w-4 h-4 rounded-full object-cover border border-emerald-400"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-[9px] font-bold text-emerald-300">S</span>
                  )}
                  <strong className="text-white">Siva</strong>
                  <span className="text-emerald-300 font-medium text-[9px] sm:text-[10px]">- Sales</span>
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* DESKTOP / TABLET QUICK ACCESS BUTTONS & NAVIGATION FOLDERS */}
        <div className="hidden lg:flex items-center gap-2">
          {portalMode === 'owner' ? (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-900/70 border border-purple-500/40 text-purple-200 text-xs font-semibold">
                <Shield className="w-3 h-3 text-purple-400" />
                Owner Portal
              </span>
              <button
                onClick={onSwitchToCustomer}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700 transition flex items-center gap-1 cursor-pointer"
                title="Switch to customer preview"
              >
                <ExternalLink className="w-3 h-3" />
                Customer View
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Restored Clean Navigation Folders / Links */}
              <nav className="flex items-center gap-1 mr-1">
                <a
                  href="#packages"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 transition"
                >
                  Packages
                </a>
                <a
                  href="#portfolio"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 transition"
                >
                  Showcase
                </a>
                <a
                  href="#team"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 transition"
                >
                  Meet Minds
                </a>
                <a
                  href="#why-us"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 transition"
                >
                  Why Us
                </a>
              </nav>

              {/* Action Button: Order Website */}
              <button
                onClick={onOpenOrderWebsiteModal}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 border border-emerald-400/40 cursor-pointer"
                title="Open website ordering modal"
              >
                <Globe className="w-3.5 h-3.5 text-white" />
                <span>Order Website</span>
              </button>

              {/* Owner Portal / Login */}
              <button
                onClick={onOpenAuthModal}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-800/90 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Owner Portal</span>
              </button>
            </div>
          )}
        </div>

        {/* MOBILE SPECIALIZED MENU TOGGLE BUTTON */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick direct Order button for instant conversion */}
          <button
            onClick={onOpenOrderWebsiteModal}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <Globe className="w-3 h-3" />
            <span>Order</span>
          </button>

          {/* Dedicated "Menu" Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-2.5 py-1.5 rounded-xl bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-700 border border-gray-700 flex items-center gap-1.5 text-xs font-bold transition shadow-sm cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4 text-cyan-400" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-950/98 border-t border-gray-800/80 px-4 py-3.5 animate-in slide-in-from-top duration-200 shadow-2xl space-y-2.5">
          <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            Navigation & Actions
          </p>
          
          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <a
              href="#packages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 text-center hover:bg-gray-800 transition"
            >
              Packages & Pricing
            </a>
            <a
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 text-center hover:bg-gray-800 transition"
            >
              Website Showcase
            </a>
            <a
              href="#team"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 text-center hover:bg-gray-800 transition"
            >
              Meet The Minds
            </a>
            <a
              href="#why-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 text-center hover:bg-gray-800 transition"
            >
              Why BS Websites
            </a>
          </div>

          {/* Primary Action Button: Order Website */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenOrderWebsiteModal();
            }}
            className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-between shadow-md cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-white" />
              Order Website Now
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">Starts ₹10k</span>
          </button>

          {/* Owner Portal / Login */}
          {portalMode === 'owner' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSwitchToCustomer();
                }}
                className="flex-1 px-3 py-2 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Customer View
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="p-2 rounded-xl bg-red-950/60 text-red-300 border border-red-800/50 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 hover:text-white font-bold text-xs flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                Owner Portal / Login
              </span>
              <span className="text-[10px] text-gray-400">Admin</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

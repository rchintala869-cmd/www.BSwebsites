import React, { useState, useEffect } from 'react';
import { 
  X, 
  Globe, 
  MessageSquare, 
  CheckCircle2, 
  HelpCircle, 
  DollarSign, 
  User, 
  Phone, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Tag,
  Upload,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { CustomerUser, CustomerLead } from '../../types';
import { 
  DISPLAY_PHONE, 
  createOrderWebsiteWhatsAppUrl, 
  openWhatsAppLink 
} from '../../utils/whatsapp';

interface OrderWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCustomer: CustomerUser | null;
  onLeadRecorded: (lead: CustomerLead) => void;
  defaultWebsiteType?: string;
}

export const OrderWebsiteModal: React.FC<OrderWebsiteModalProps> = ({
  isOpen,
  onClose,
  currentCustomer,
  onLeadRecorded,
  defaultWebsiteType = 'Corporate Website',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [websiteType, setWebsiteType] = useState(defaultWebsiteType);
  const [pricingPreference, setPricingPreference] = useState<'Fixed Price' | 'Bargain / Negotiable Price'>('Fixed Price');
  const [customNotes, setCustomNotes] = useState('');
  
  // Customer Logo Upload state
  const [customerLogoPreview, setCustomerLogoPreview] = useState<string | null>(null);
  const [customerLogoFileName, setCustomerLogoFileName] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const websiteTypes = [
    { id: 'Portfolio Website', label: 'Portfolio / Personal Brand (₹10,000)', desc: 'Sleek single-page showcase, projects, & contact capture' },
    { id: 'Corporate Website', label: 'Corporate / Business Website (₹12,000)', desc: 'Multi-page company presence, SEO, speed, & lead funnels' },
    { id: 'E-Commerce Website', label: 'E-Commerce Storefront (₹14,000)', desc: 'Online catalog, payment gateway, cart, & WhatsApp receipts' },
    { id: 'Custom Dynamic Site', label: 'Custom Dynamic / AI Web App (₹18,000)', desc: 'Bespoke web application with database, auth, & custom logic' },
  ];

  useEffect(() => {
    if (currentCustomer) {
      setCustomerName(currentCustomer.name);
      setCustomerPhone(currentCustomer.phone);
    }
  }, [currentCustomer, isOpen]);

  useEffect(() => {
    if (defaultWebsiteType) {
      setWebsiteType(defaultWebsiteType);
    }
  }, [defaultWebsiteType, isOpen]);

  // Handle local logo file upload via FileReader Base64
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setCustomerLogoPreview(base64);
      setCustomerLogoFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setCustomerLogoPreview(null);
    setCustomerLogoFileName(null);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      return;
    }

    const pricingText = pricingPreference === 'Fixed Price' 
      ? 'Fixed Price (₹10,000 - ₹18,000)' 
      : 'Bargain / Negotiable Price (Base: ₹10,000 - ₹18,000)';

    const logoStatus = customerLogoFileName 
      ? `Brand Logo Attached (${customerLogoFileName})`
      : 'Will share logo on WhatsApp';

    const url = createOrderWebsiteWhatsAppUrl(
      customerName.trim(),
      customerPhone.trim(),
      websiteType,
      pricingText,
      logoStatus
    );

    setWhatsappUrl(url);

    // Save lead in CRM
    const newLead: CustomerLead = {
      id: 'lead-order-' + Date.now(),
      name: customerName.trim(),
      phone: customerPhone.trim(),
      type: 'order',
      targetTitle: `Order: ${websiteType}`,
      price: pricingPreference,
      notes: `Preference: ${pricingPreference}. Logo: ${logoStatus}. Notes: ${customNotes || 'Standard order flow requested.'}`,
      timestamp: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onLeadRecorded(newLead);
    setSubmitted(true);
    openWhatsAppLink(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Title & Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  BS Websites Direct Order
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Order Your Custom Website
                </h3>
              </div>
            </div>

            {/* How Website Ordering Works Box */}
            <div className="mb-5 p-3.5 rounded-2xl bg-gray-950/90 border border-indigo-500/20 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 font-bold text-white mb-2 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>3-Step Simple Order Workflow</span>
              </div>
              <ol className="space-y-1.5 pl-0.5 text-[11px] sm:text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-600/40 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-gray-100">Select Website Type & Price Option:</strong> Fixed or Negotiable (₹10k – ₹18k).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-600/40 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-gray-100">Direct WhatsApp Dispatch:</strong> Sent immediately to <strong>Siva</strong> & <strong>Bhargav</strong> at <span className="text-emerald-400 font-mono">{DISPLAY_PHONE}</span>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-600/40 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-gray-100">Design & 6-Month Warranty Delivery:</strong> Rapid 3-5 days delivery with our official 6-month free warranty certificate.
                  </div>
                </li>
              </ol>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Selection for Types of Websites */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  1. Select Type of Website
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {websiteTypes.map((type) => {
                    const isSelected = websiteType === type.id;
                    return (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setWebsiteType(type.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10 text-white'
                            : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`text-xs font-bold ${isSelected ? 'text-indigo-300' : 'text-gray-200'}`}>
                            {type.label}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">
                          {type.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Price Option Selector (Fixed Price vs Bargain/Negotiable Price) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    2. Pricing Preference
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    ₹10,000 – ₹18,000
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPricingPreference('Fixed Price')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      pricingPreference === 'Fixed Price'
                        ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                        : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Fixed Price
                      </span>
                      {pricingPreference === 'Fixed Price' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Standard package tier (₹10,000 – ₹18,000) with prioritized queue.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPricingPreference('Bargain / Negotiable Price')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      pricingPreference === 'Bargain / Negotiable Price'
                        ? 'bg-blue-950/50 border-blue-500 text-white shadow-md shadow-blue-500/10'
                        : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-blue-300 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Bargain / Negotiable
                      </span>
                      {pricingPreference === 'Bargain / Negotiable Price' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Custom negotiation with Siva on WhatsApp within ₹10k–₹18k band.
                    </p>
                  </button>
                </div>
              </div>

              {/* 3. Customer Logo Upload Section (SPECIFICATION 2) */}
              <div className="p-3 rounded-2xl bg-gray-950/70 border border-gray-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  3. Attach Your Business Logo (Optional)
                </label>
                <p className="text-[11px] text-gray-400 mb-2">
                  Upload your logo image (PNG, JPG, SVG). We will incorporate it into your website preview & WhatsApp order.
                </p>

                {customerLogoPreview ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-900 border border-cyan-500/40">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={customerLogoPreview} 
                        alt="Customer Logo" 
                        className="w-10 h-10 object-contain rounded-lg bg-gray-950 p-1 border border-gray-700" 
                      />
                      <div className="truncate">
                        <span className="text-xs font-semibold text-white block truncate">{customerLogoFileName}</span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready to send
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition"
                      title="Remove Logo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-gray-700 hover:border-cyan-500/60 bg-gray-900/50 hover:bg-gray-900 cursor-pointer transition text-xs text-gray-300 group">
                    <Upload className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
                    <span className="font-semibold text-gray-200">Click to Upload Business Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* 4. Customer Contact Details */}
              <div className="space-y-2.5 pt-0.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  4. Your Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-indigo-400" />
                      Your Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      WhatsApp Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Optional Notes or Specific Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your business, specific design ideas, or reference websites..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Send Order to WhatsApp (+91 9703281549)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-1.5">
                  Direct connection with Siva (Sales Mediator). Guaranteed response within 15 minutes.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Website Order Dispatched!
            </h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto mb-5 leading-relaxed">
              Thank you, <strong className="text-white">{customerName}</strong>! Your request for a <span className="text-indigo-400 font-semibold">{websiteType}</span> ({pricingPreference}) has been dispatched to WhatsApp.
            </p>

            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 max-w-md mx-auto mb-5 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Customer Name:</span>
                <span className="text-white font-semibold">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">WhatsApp Phone:</span>
                <span className="text-emerald-400 font-mono font-semibold">{customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Website Type:</span>
                <span className="text-indigo-300 font-semibold">{websiteType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pricing Option:</span>
                <span className="text-emerald-400 font-semibold">{pricingPreference}</span>
              </div>
              {customerLogoFileName && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Attached Logo:</span>
                  <span className="text-cyan-300 font-semibold">{customerLogoFileName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Free Warranty:</span>
                <span className="text-emerald-400 font-semibold">6 Months Guaranteed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => openWhatsAppLink(whatsappUrl)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-Open WhatsApp Chat</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

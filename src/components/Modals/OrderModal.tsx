import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingCart, 
  MessageSquare, 
  Check, 
  Clock, 
  ShieldCheck, 
  FileText,
  User,
  Phone,
  ArrowRight
} from 'lucide-react';
import { CustomerUser, CustomerLead } from '../../types';
import { 
  DISPLAY_PHONE, 
  createBuyNowWhatsAppUrl, 
  openWhatsAppLink 
} from '../../utils/whatsapp';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  price: number | string;
  currentCustomer: CustomerUser | null;
  onLeadRecorded: (lead: CustomerLead) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  planTitle,
  price,
  currentCustomer,
  onLeadRecorded,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [timeline, setTimeline] = useState('Immediate (within 3-5 days)');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  useEffect(() => {
    if (currentCustomer) {
      setName(currentCustomer.name);
      setPhone(currentCustomer.phone);
    }
  }, [currentCustomer, isOpen]);

  if (!isOpen) return null;

  const costString = typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      return;
    }

    // Compose user notes including business type and timeline if provided
    let fullNotes = notes.trim();
    if (businessType.trim()) {
      fullNotes = `Business: ${businessType.trim()}${fullNotes ? '. ' + fullNotes : ''}`;
    }
    if (timeline) {
      fullNotes = `${fullNotes ? fullNotes + ' | ' : ''}Target: ${timeline}`;
    }
    if (!fullNotes) {
      fullNotes = 'Ready to start, please send payment details and kickoff questionnaire.';
    }

    // WhatsApp preformatted message per prompt:
    // "Hi BS Websites! Customer Name: [Name], Phone: [Phone]. I want to BUY the [Website Plan Name] priced at [Cost]. Details: [User Notes]."
    const url = createBuyNowWhatsAppUrl(name, phone, planTitle, costString, fullNotes);
    setWhatsappRedirectUrl(url);

    // Record lead in local storage
    const newLead: CustomerLead = {
      id: 'lead-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      type: 'order',
      targetTitle: planTitle,
      price: costString,
      notes: fullNotes,
      timestamp: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    onLeadRecorded(newLead);

    // Mark submitted and redirect
    setSubmitted(true);
    openWhatsAppLink(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden p-6 sm:p-8"
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
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Order & WhatsApp Checkout
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Buy {planTitle}
                </h3>
              </div>
            </div>

            {/* Plan Summary Bar */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Package Price:</span>
                <span className="text-2xl font-black text-emerald-400">{costString}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-300 font-semibold block">Instant Booking</span>
                <span className="text-[11px] text-gray-400">Direct WhatsApp to Siva & Bhargav</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Customer Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    WhatsApp Phone <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9703281549"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Business / Niche Type
                </label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g. Healthcare Clinic, Fashion Brand, Restaurant, Real Estate"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Project Details / Special Requirements
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Mention any specific features, color preferences, reference websites or pages you require..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Desired Delivery Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="Urgent (within 48-72 hours)">Urgent (within 48-72 hours)</option>
                  <option value="Standard (within 3-5 days)">Standard (within 3-5 days)</option>
                  <option value="Flexible (within 1-2 weeks)">Flexible (within 1-2 weeks)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order to WhatsApp ({DISPLAY_PHONE})</span>
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Opens WhatsApp with your pre-formatted order details for instant confirmation.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation & WhatsApp Redirection fallback */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Order Dispatched!</h3>
            <p className="text-sm text-gray-300 mb-6 max-w-sm mx-auto">
              Your order for <strong>{planTitle}</strong> has been prepared. WhatsApp should have opened in a new tab.
            </p>

            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-left text-xs text-gray-300 mb-6 space-y-1">
              <div className="text-gray-500 text-[10px] uppercase font-bold">Dispatched Message Preview:</div>
              <p className="font-mono text-[11px] text-emerald-300 break-words">
                "Hi BS Websites! Customer Name: {name}, Phone: {phone}. I want to BUY the {planTitle} priced at {costString}. Details: {notes || 'Ready to start'}."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-xs transition"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

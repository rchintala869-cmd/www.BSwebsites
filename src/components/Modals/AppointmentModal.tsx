import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Check, 
  User, 
  Phone, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { CustomerUser, CustomerLead } from '../../types';
import { 
  DISPLAY_PHONE, 
  createAppointmentWhatsAppUrl, 
  openWhatsAppLink 
} from '../../utils/whatsapp';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultQuery?: string;
  currentCustomer: CustomerUser | null;
  onLeadRecorded: (lead: CustomerLead) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultQuery = 'Custom Website Development',
  currentCustomer,
  onLeadRecorded,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteType, setWebsiteType] = useState(defaultQuery);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  useEffect(() => {
    if (currentCustomer) {
      setName(currentCustomer.name);
      setPhone(currentCustomer.phone);
    }
    if (defaultQuery) {
      setWebsiteType(defaultQuery);
    }
    // Set default date to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [currentCustomer, defaultQuery, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const formattedDateTime = `${date} at ${time}`;
    const cleanTopic = websiteType.trim() || 'Custom Website Development';

    // WhatsApp preformatted message per prompt:
    // "Hi BS Websites! Customer Name: [Name], Phone: [Phone]. I want to BOOK AN APPOINTMENT to discuss [Website Type/Query] on [Date/Time]."
    const url = createAppointmentWhatsAppUrl(name, phone, cleanTopic, formattedDateTime);
    setWhatsappRedirectUrl(url);

    // Record in local leads
    const newLead: CustomerLead = {
      id: 'lead-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      type: 'appointment',
      targetTitle: cleanTopic,
      date,
      time,
      notes: notes.trim(),
      timestamp: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    onLeadRecorded(newLead);

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
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Direct Consultation
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Book An Appointment
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Schedule a dedicated consultation with Siva (Sales Mediator) and our technical leads Bhargav & Bhavesh.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bhargavi"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500"
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Website Type / Query Topic <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={websiteType}
                  onChange={(e) => setWebsiteType(e.target.value)}
                  placeholder="e.g. E-Commerce Store or Doctor Clinic Website"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Preferred Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Preferred Time Slot <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="10:00 AM">10:00 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM - Morning</option>
                    <option value="02:00 PM">02:00 PM - Afternoon</option>
                    <option value="04:30 PM">04:30 PM - Evening</option>
                    <option value="07:00 PM">07:00 PM - Evening</option>
                    <option value="Flexible">Anytime (Ping on WhatsApp)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Additional Notes / Questions (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Tell us what you'd like to achieve with your website..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Appointment Request to WhatsApp ({DISPLAY_PHONE})</span>
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Direct connection with Siva, our Sales Mediator, for instant confirmation.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-purple-400 mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Appointment Request Prepared!</h3>
            <p className="text-sm text-gray-300 mb-6 max-w-sm mx-auto">
              We've created your WhatsApp message for <strong>{websiteType}</strong> on <strong>{date} at {time}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-left text-xs text-gray-300 mb-6 space-y-1">
              <div className="text-gray-500 text-[10px] uppercase font-bold">Dispatched Message Preview:</div>
              <p className="font-mono text-[11px] text-purple-300 break-words">
                "Hi BS Websites! Customer Name: {name}, Phone: {phone}. I want to BOOK AN APPOINTMENT to discuss {websiteType} on {date} at {time}."
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
                <span>Open WhatsApp Chat</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-xs transition"
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

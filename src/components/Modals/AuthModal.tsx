import React, { useState } from 'react';
import { 
  X, 
  User, 
  Shield, 
  Lock, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { CustomerUser, PortalMode } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerLogin: (user: CustomerUser) => void;
  onOwnerLogin: () => void;
  initialTab?: 'customer' | 'owner';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onCustomerLogin,
  onOwnerLogin,
  initialTab = 'customer',
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'owner'>(initialTab);
  
  // Customer form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerError, setCustomerError] = useState('');

  // Owner form state
  const [adminPasscode, setAdminPasscode] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);

  if (!isOpen) return null;

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setCustomerError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setCustomerError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    setCustomerError('');
    const user: CustomerUser = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      loggedInAt: new Date().toISOString()
    };
    onCustomerLogin(user);
    onClose();
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Owner Admin Password is 'BBS'
    const trimmed = adminPasscode.trim();
    if (trimmed === 'BBS') {
      setOwnerError('');
      onOwnerLogin();
      onClose();
    } else {
      setOwnerError('Invalid Password');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden p-6 sm:p-8"
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

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-3 shadow-lg shadow-indigo-600/30">
            BS
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Portal Authentication
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Access either the Customer Conversion Portal or Owner Admin Dashboard
          </p>
        </div>

        {/* Two Distinct Portal Tabs */}
        <div className="flex rounded-2xl bg-gray-950 p-1.5 border border-gray-800 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'customer'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Customer Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('owner')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'owner'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Owner Portal</span>
          </button>
        </div>

        {/* A. Customer Portal Login Form */}
        {activeTab === 'customer' && (
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Your Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g., Rajesh Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-950/80 border border-gray-700/90 text-white text-sm focus:outline-none focus:border-indigo-500 transition placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                WhatsApp Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g., +91 9845123456"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-950/80 border border-gray-700/90 text-white text-sm focus:outline-none focus:border-indigo-500 transition placeholder-gray-500"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Used to pre-format your instant WhatsApp messages and quotes.
              </p>
            </div>

            {customerError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{customerError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              <span>Enter Customer Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* B. Owner Portal Login Form */}
        {activeTab === 'owner' && (
          <form onSubmit={handleOwnerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-950/80 border border-gray-700/90 text-white text-sm focus:outline-none focus:border-purple-500 transition placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-gray-400 hover:text-white"
                >
                  {showPasscode ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {ownerError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{ownerError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Access Portal</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

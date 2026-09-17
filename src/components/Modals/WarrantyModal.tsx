import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { 
  X, 
  ShieldCheck, 
  Download,
  ArrowLeft,
  Loader2,
  Phone,
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react';
import { WarrantyCard } from '../WarrantyCard';
import { DISPLAY_PHONE, openWhatsAppLink } from '../../utils/whatsapp';

interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
  customLogoUrl?: string | null;
}

export const WarrantyModal: React.FC<WarrantyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  // Generic Sample Dates for Customer Portal Preview
  const today = new Date();
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 6);

  const formattedIssueDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedExpiryDate = expiry.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDownloadSampleCertificate = async () => {
    setIsDownloading(true);
    const element = document.getElementById('customer-warranty-card-element');
    if (!element) {
      window.print();
      setIsDownloading(false);
      return;
    }
    try {
      const h2c = (window as any).html2canvas || html2canvas;
      const canvas = await h2c(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#07101f',
        logging: false,
      });

      if (canvas.toBlob) {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'BS_Websites_Sample_Warranty_Certificate.png';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }, 200);
          } else {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'BS_Websites_Sample_Warranty_Certificate.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }, 'image/png');
      } else {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'BS_Websites_Sample_Warranty_Certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.warn('html2canvas error, using fallback:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleConsultWhatsApp = () => {
    const message = `Hi BS Websites! I am viewing your official 6-Month Website Warranty Certificate and would like to discuss a custom website project with guaranteed warranty coverage.`;
    const url = `https://wa.me/919703281549?text=${encodeURIComponent(message)}`;
    openWhatsAppLink(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#091224] border border-[#2dd4bf]/30 shadow-2xl p-4 sm:p-7 md:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Back Button & Close */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-800">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#2dd4bf]" />
            <span>&larr; Back to Website</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Standard Included Guarantee</span>
            </span>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Public Guarantee Intro Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-[#2dd4bf]/20 p-3.5 sm:p-4 rounded-2xl mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 text-[#2dd4bf] flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Official 6-Month Website Warranty Certificate (Sample Template)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Every website designed and developed by BS Websites receives this official 180-day coverage guarantee upon launch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-3 py-1 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-mono">
              Status: Standard Guarantee
            </span>
          </div>
        </div>

        {/* THE OFFICIAL WARRANTY CERTIFICATE DISPLAY (MATCHING REFERENCE LAYOUT) */}
        <div className="my-2">
          <WarrantyCard
            id="customer-warranty-card-element"
            clientName="[ Client / Business Name ]"
            projectName="[ Project Name / URL ]"
            issueDate={formattedIssueDate}
            expiryDate={formattedExpiryDate}
            coveragePeriod="6 Months Full Protection"
            supportContact="+91 9703281549"
            certId="BSW-2026-W8941"
            isSample={true}
          />
        </div>

        {/* Action Controls & Floating Magnified Download Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>&larr; Back to Website</span>
            </button>

            <button
              onClick={handleConsultWhatsApp}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 hover:text-emerald-300 transition flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Siva ({DISPLAY_PHONE})</span>
            </button>
          </div>

          {/* Download Digital Certificate Button (Magnified / High Emphasis) */}
          <button
            onClick={handleDownloadSampleCertificate}
            disabled={isDownloading}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 disabled:opacity-60 cursor-pointer"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <Download className="w-4 h-4 text-slate-950" />
            )}
            <span>{isDownloading ? 'Capturing High-Res Certificate...' : 'DOWNLOAD DIGITAL CERTIFICATE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

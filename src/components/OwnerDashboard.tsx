import React, { useState } from 'react';
import { 
  Shield, 
  Layers, 
  Briefcase, 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Download, 
  Copy, 
  Check, 
  Search, 
  RefreshCw,
  Code,
  FileSpreadsheet,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Phone,
  Upload,
  Image as ImageIcon,
  Star,
  Globe,
  Tag,
  User,
  Flame,
  BellRing,
  Send,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Award,
  Loader2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { WarrantyCard } from './WarrantyCard';
import { BSLogo } from './BSLogo';
import { WebsitePlan, PortfolioItem, CustomerLead, AnnouncementData } from '../types';
import { DEFAULT_ANNOUNCEMENT } from '../data/initialData';
import { generateStandaloneHtml } from '../utils/standaloneHtmlGenerator';
import { savePortfolioItemToFirestore, deletePortfolioItemFromFirestore } from '../firebase';
import { DISPLAY_PHONE, openWhatsAppLink } from '../utils/whatsapp';

interface OwnerDashboardProps {
  plans: WebsitePlan[];
  setPlans: React.Dispatch<React.SetStateAction<WebsitePlan[]>>;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  leads: CustomerLead[];
  setLeads: React.Dispatch<React.SetStateAction<CustomerLead[]>>;
  announcement: AnnouncementData;
  onUpdateAnnouncement: (announcement: AnnouncementData) => void;
  customLogoUrl?: string | null;
  onUpdateLogo?: (logoUrl: string | null) => void;
  bhargavPhoto: string;
  onUpdateBhargavPhoto: (photoUrl: string) => void;
  bhaveshPhoto: string;
  onUpdateBhaveshPhoto: (photoUrl: string) => void;
  sivaPhoto: string;
  onUpdateSivaPhoto: (photoUrl: string) => void;
  onSwitchToCustomerView: () => void;
  onResetDefaults: () => void;
  onPreviewItem: (item: PortfolioItem) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  plans,
  setPlans,
  portfolio,
  setPortfolio,
  leads,
  setLeads,
  announcement,
  onUpdateAnnouncement,
  customLogoUrl,
  onUpdateLogo,
  bhargavPhoto,
  onUpdateBhargavPhoto,
  bhaveshPhoto,
  onUpdateBhaveshPhoto,
  sivaPhoto,
  onUpdateSivaPhoto,
  onSwitchToCustomerView,
  onResetDefaults,
  onPreviewItem,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'announcements' | 'warranty_gen' | 'portfolio' | 'plans' | 'team_photos' | 'export'>('leads');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [searchLead, setSearchLead] = useState('');
  const [photoMsg, setPhotoMsg] = useState<string | null>(null);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);
  const [announcementMsg, setAnnouncementMsg] = useState<string | null>(null);

  // Exclusive Owner Warranty Certificate Generator State
  const [certClientName, setCertClientName] = useState('Sri Krishna Enterprises');
  const [certProjectName, setCertProjectName] = useState('Premium E-Commerce Storefront');
  const [certIssueDate, setCertIssueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [certWebsiteType, setCertWebsiteType] = useState('E-Commerce Website');
  const [certSerialId, setCertSerialId] = useState('BSW-2026-W8941');
  const [certNotice, setCertNotice] = useState<string | null>(null);
  const [isDownloadingCert, setIsDownloadingCert] = useState(false);

  // Calculate 6 months expiry from issue date
  const issueDateObj = new Date(certIssueDate || Date.now());
  const expiryDateObj = new Date(issueDateObj);
  expiryDateObj.setMonth(expiryDateObj.getMonth() + 6);

  const formattedCertIssue = issueDateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedCertExpiry = expiryDateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleGenerateAndIssueCertificate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCertNotice(`Official Warranty Certificate Issued for "${certClientName}"!`);
    setTimeout(() => setCertNotice(null), 6000);
  };

  const handleDownloadOwnerCertCard = async () => {
    setIsDownloadingCert(true);
    const element = document.getElementById('owner-warranty-card-element');
    if (!element) {
      window.print();
      setIsDownloadingCert(false);
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

      const cleanName = certClientName.replace(/[^a-zA-Z0-9]/g, '_') || 'Client';
      const fileName = `BS_Websites_Warranty_Certificate_${cleanName}.png`;

      if (canvas.toBlob) {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
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
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }, 'image/png');
      } else {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.warn('html2canvas error, using print fallback:', err);
      window.print();
    } finally {
      setIsDownloadingCert(false);
    }
  };

  const handleShareCertWhatsApp = () => {
    const msg = `Hi ${certClientName}! 🌟

Here is your Official 6-Month Website Warranty Certificate issued by BS Websites.

📄 Certificate ID: ${certSerialId}
👤 Client / Business: ${certClientName}
🌐 Website Project: ${certProjectName}
💻 Package Category: ${certWebsiteType}
📅 Issue Date: ${formattedCertIssue}
🛡️ Warranty Valid Until: ${formattedCertExpiry} (180 Days Full Protection)

Scope of Coverage:
✔ Bug Fixes & Code Rectification
✔ Site Speed & Operational Integrity
✔ Mobile & Cross-Browser Adjustments
✔ Priority WhatsApp Support (+91 9703281549)

Verified & Signed by:
• Bhargav (Lead Web Developer)
• Bhavesh (Lead Web Designer)
• Sivamani Kanta (Sales Mentor)

Thank you for choosing BS Websites!`;

    const url = `https://wa.me/919703281549?text=${encodeURIComponent(msg)}`;
    openWhatsAppLink(url);
  };

  const regenerateCertId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCertSerialId(`BSW-2026-W${randomNum}`);
  };

  // Announcement state inside Owner Portal
  const [announcementForm, setAnnouncementForm] = useState<AnnouncementData>(announcement || DEFAULT_ANNOUNCEMENT);
  const [newInclusion, setNewInclusion] = useState('');

  const handlePublishAnnouncement = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateAnnouncement(announcementForm);
    localStorage.setItem('bs_announcement_data', JSON.stringify(announcementForm));
    setAnnouncementMsg('Announcement published successfully! The Customer Portal will update immediately.');
    setTimeout(() => setAnnouncementMsg(null), 5000);
  };

  const handleAddInclusion = () => {
    if (!newInclusion.trim()) return;
    setAnnouncementForm((prev) => ({
      ...prev,
      inclusions: [...(prev.inclusions || []), newInclusion.trim()],
    }));
    setNewInclusion('');
  };

  const handleRemoveInclusion = (index: number) => {
    setAnnouncementForm((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, idx) => idx !== index),
    }));
  };

  const applyPreset = (preset: 'festival' | 'startup' | 'flash') => {
    if (preset === 'festival') {
      setAnnouncementForm({
        badge: 'Limited Festival Season Offer',
        title: 'Special Festival Offer:',
        highlightText: 'Get 10% Off on All E-Commerce & AI Websites!',
        description: 'Ready to take your business to the next level? Book your custom website directly with Bhargav (Developer) and Bhavesh (Designer) and unlock special discounts with 100% transparent pricing and guaranteed fast delivery.',
        couponCode: 'FESTIVAL10',
        discountNote: '10% to 20% Instant Discount Applied',
        validityText: 'Offer Valid This Month • Limited Project Slots',
        inclusions: [
          '6 Months Free Warranty & Support',
          'Free SSL & Custom Domain Assistance',
          'Interactive WhatsApp Orders & Forms',
          'Blazing Fast Delivery in 3-5 Days'
        ],
        isActive: true,
      });
    } else if (preset === 'startup') {
      setAnnouncementForm({
        badge: 'Startup Launch Special',
        title: 'Startup Special Offer:',
        highlightText: '15% Off Custom Full-Stack & Corporate Portals!',
        description: 'Launching a new startup or product? Get a high-converting web application with authentication, database, and responsive dark/light UI crafted by Bhargav and Bhavesh.',
        couponCode: 'STARTUP15',
        discountNote: 'Flat 15% Off on All Business & Custom Plans',
        validityText: 'Valid for First 5 Startups • Book Now',
        inclusions: [
          'Priority 3-Day Turnaround',
          '6 Months Comprehensive Warranty',
          'Full Source Code Ownership',
          'Dedicated WhatsApp Hotline'
        ],
        isActive: true,
      });
    } else if (preset === 'flash') {
      setAnnouncementForm({
        badge: '48-Hour Flash Deal',
        title: 'Flash Sale Alert:',
        highlightText: 'Save ₹3,000 to ₹5,000 on All Website Orders!',
        description: 'Exclusive 48-hour flash sale for new clients. Lock in our premium custom website builds before slots fill up for this quarter.',
        couponCode: 'FLASHDEAL',
        discountNote: 'Instant Cash Discount on Any Package',
        validityText: 'Ends in 48 Hours • Strict Slot Limits',
        inclusions: [
          'Free Speed & SEO Optimization',
          'Interactive WhatsApp Order Integration',
          'Responsive Mobile & Tablet Viewports',
          'Free SSL & Domain Setup Assistance'
        ],
        isActive: true,
      });
    }
  };

  // Profile photo upload handlers for Bhargav, Bhavesh, and Siva (Base64 saved to localStorage)
  const handleBhargavFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUpdateBhargavPhoto(base64);
      setPhotoMsg('Bhargav (Web Developer) profile photo updated successfully!');
      setTimeout(() => setPhotoMsg(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleBhaveshFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUpdateBhaveshPhoto(base64);
      setPhotoMsg('Bhavesh (Web Designer) profile photo updated successfully!');
      setTimeout(() => setPhotoMsg(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleSivaFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUpdateSivaPhoto(base64);
      setPhotoMsg('Siva / Sivam Manikanta (Sales Mediator) profile photo updated successfully!');
      setTimeout(() => setPhotoMsg(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleResetBhargav = () => {
    onUpdateBhargavPhoto('/bhargav.jpg');
    setPhotoMsg('Bhargav photo reset to original default.');
    setTimeout(() => setPhotoMsg(null), 3000);
  };

  const handleResetBhavesh = () => {
    onUpdateBhaveshPhoto('/bhavesh.jpg');
    setPhotoMsg('Bhavesh photo reset to original default.');
    setTimeout(() => setPhotoMsg(null), 3000);
  };

  const handleResetSiva = () => {
    onUpdateSivaPhoto('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80');
    setPhotoMsg('Siva photo reset to original default.');
    setTimeout(() => setPhotoMsg(null), 3000);
  };

  // Editing Plan state
  const [editingPlan, setEditingPlan] = useState<WebsitePlan | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  // Editing Portfolio state
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);

  // 1. ROBUST DELETE FUNCTIONALITY:
  // Instant DOM re-render & immediate localStorage synchronization
  // Note: Avoid blocking window.confirm() which is blocked in iframes!
  const handleDeletePlan = (id: string) => {
    setPlans(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('bs_website_plans', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving plans after delete:', e);
      }
      return [...updated];
    });
    setDeleteNotice('Package removed successfully.');
    setTimeout(() => setDeleteNotice(null), 3000);
  };

  const handleDeletePortfolio = (id: string) => {
    setPortfolio(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('bs_portfolio_items', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving portfolio after delete:', e);
      }
      return [...updated];
    });
    // Permanently remove from Firebase Firestore
    deletePortfolioItemFromFirestore(id).catch(err => {
      console.error('Error deleting portfolio from Firestore:', err);
    });
    setDeleteNotice('Showcase website removed from catalog.');
    setTimeout(() => setDeleteNotice(null), 3000);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => {
      const updated = prev.filter(l => l.id !== id);
      try {
        localStorage.setItem('bs_customer_leads', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving leads after delete:', e);
      }
      return [...updated];
    });
    setDeleteNotice('Customer lead deleted.');
    setTimeout(() => setDeleteNotice(null), 3000);
  };

  const handleClearAllLeads = () => {
    setLeads([]);
    localStorage.removeItem('bs_customer_leads');
    setDeleteNotice('All leads cleared.');
    setTimeout(() => setDeleteNotice(null), 3000);
  };

  // Plan Save
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    // Enforce pricing within ₹10,000 - ₹25,000
    let price = Number(editingPlan.price) || 10000;
    if (price < 10000) price = 10000;
    if (price > 25000) price = 25000;

    const sanitizedPlan = { ...editingPlan, price };

    setPlans(prev => {
      let updated: WebsitePlan[];
      if (prev.some(p => p.id === sanitizedPlan.id)) {
        updated = prev.map(p => p.id === sanitizedPlan.id ? sanitizedPlan : p);
      } else {
        updated = [...prev, sanitizedPlan];
      }
      try {
        localStorage.setItem('bs_website_plans', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  // 2. FILE UPLOAD & PORTFOLIO SAVE (Dynamic website addition with FileReader Base64 & price validation)
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio) return;

    // Validate price within ₹10,000 and ₹25,000
    const numPrice = Number(editingPortfolio.price);
    if (isNaN(numPrice) || numPrice < 10000 || numPrice > 25000) {
      setPortfolioError('Price must be between ₹10,000 and ₹25,000.');
      return;
    }

    if (!editingPortfolio.title.trim()) {
      setPortfolioError('Please enter a project title.');
      return;
    }

    // Default image if none uploaded
    const finalImage = editingPortfolio.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';
    const finalRating = Math.min(5, Math.max(1, Number(editingPortfolio.rating) || 5));

    const finalItem: PortfolioItem = {
      ...editingPortfolio,
      price: numPrice,
      rating: Number(finalRating.toFixed(1)),
      image: finalImage,
      liveDemoUrl: editingPortfolio.liveDemoUrl || 'https://example.com',
    };

    setPortfolio(prev => {
      let updated: PortfolioItem[];
      if (prev.some(p => p.id === finalItem.id)) {
        updated = prev.map(p => p.id === finalItem.id ? finalItem : p);
      } else {
        updated = [finalItem, ...prev];
      }
      try {
        localStorage.setItem('bs_portfolio_items', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving portfolio to localStorage:', e);
      }
      return updated;
    });

    // Permanently save to Firebase Firestore
    savePortfolioItemToFirestore(finalItem).catch(err => {
      console.error('Error saving portfolio item to Firestore:', err);
    });

    setPortfolioError(null);
    setIsPortfolioModalOpen(false);
    setEditingPortfolio(null);
  };

  // File Upload handler with FileReader for Base64 conversion
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (under ~5MB for localStorage safety)
    if (file.size > 5 * 1024 * 1024) {
      alert('Selected image is larger than 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target?.result as string;
      if (base64Data && editingPortfolio) {
        setEditingPortfolio(prev => prev ? { ...prev, image: base64Data } : null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Standalone HTML Copy / Download
  const handleCopyHtml = () => {
    const code = generateStandaloneHtml();
    navigator.clipboard.writeText(code);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleDownloadHtml = () => {
    const code = generateStandaloneHtml();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bs-websites-standalone.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export Leads to CSV
  const handleExportLeadsCsv = () => {
    if (leads.length === 0) {
      alert('No leads to export.');
      return;
    }

    const headers = ['ID', 'Customer Name', 'Phone', 'Type', 'Target Title', 'Price', 'Notes', 'Timestamp'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      l.type,
      `"${(l.targetTitle || '').replace(/"/g, '""')}"`,
      `"${(l.price || '').toString().replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.timestamp}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bs-websites-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchLead.toLowerCase()) ||
    l.phone.includes(searchLead) ||
    (l.targetTitle && l.targetTitle.toLowerCase().includes(searchLead.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#070A12] text-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Banner / Owner Welcome */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-gray-900 border border-purple-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Admin Command Center
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Storage Connected
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                BS Websites Owner Portal
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage packages, showcase websites with local file uploads, view WhatsApp leads, and export code.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onSwitchToCustomerView}
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs border border-gray-700 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Customer Website View</span>
            </button>

            <button
              onClick={onResetDefaults}
              className="px-3 py-2 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-gray-400 hover:text-amber-300 font-semibold text-xs border border-gray-800 transition flex items-center gap-1.5"
              title="Reset all packages and portfolio items to clean default data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800">
          <div className="text-xs text-gray-400 font-medium mb-1 flex items-center justify-between">
            <span>Captured Leads</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{leads.length}</div>
          <span className="text-[11px] text-emerald-400 font-medium">WhatsApp Direct Inquiries</span>
        </div>

        <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800">
          <div className="text-xs text-gray-400 font-medium mb-1 flex items-center justify-between">
            <span>Showcase Websites</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{portfolio.length}</div>
          <span className="text-[11px] text-indigo-400 font-medium">Live Demo Showcase</span>
        </div>

        <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800">
          <div className="text-xs text-gray-400 font-medium mb-1 flex items-center justify-between">
            <span>Pricing Range</span>
            <Tag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">₹10k – ₹18k</div>
          <span className="text-[11px] text-purple-400 font-medium">Standard Package Tiers</span>
        </div>

        <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800">
          <div className="text-xs text-gray-400 font-medium mb-1 flex items-center justify-between">
            <span>Active Packages</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{plans.length}</div>
          <span className="text-[11px] text-blue-400 font-medium">Ready For Clients</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-gray-800 gap-2 sm:gap-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'leads'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Leads & Inquiries ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'announcements'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Publish Announcement</span>
            {announcementForm.isActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('warranty_gen')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'warranty_gen'
                ? 'border-teal-500 text-teal-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#2dd4bf]" />
            <span>Warranty Certificate Generator</span>
            <span className="px-1.5 py-0.2 rounded-full bg-teal-500/20 text-[#2dd4bf] text-[10px] font-bold">
              Exclusive
            </span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'portfolio'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Showcase Websites ({portfolio.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plans')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'plans'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Packages & Pricing ({plans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team_photos')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'team_photos'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Team Photos (Bhargav, Bhavesh, Siva)</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'export'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Standalone Single-File Exporter</span>
          </button>
        </div>
      </div>

      {/* Global Notice Toast for Owner Actions */}
      {announcementMsg && (
        <div className="max-w-7xl mx-auto mb-4 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs flex items-center justify-between gap-2 animate-in fade-in shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold">{announcementMsg}</span>
          </div>
          <button
            onClick={onSwitchToCustomerView}
            className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition cursor-pointer"
          >
            View Customer Portal →
          </button>
        </div>
      )}
      {deleteNotice && (
        <div className="max-w-7xl mx-auto mb-4 p-3 rounded-2xl bg-red-950/70 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{deleteNotice}</span>
        </div>
      )}
      {photoMsg && (
        <div className="max-w-7xl mx-auto mb-4 p-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{photoMsg}</span>
        </div>
      )}

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: CUSTOMER LEADS */}
        {activeTab === 'leads' && (
          <div className="rounded-3xl bg-gray-900 border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Client Inquiries & Orders</h3>
                <p className="text-xs text-gray-400">
                  Every order and booking made by customers routes to WhatsApp ({DISPLAY_PHONE}) and is recorded here.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by customer name or phone..."
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 w-64"
                  />
                </div>

                <button
                  onClick={handleExportLeadsCsv}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                {leads.length > 0 && (
                  <button
                    onClick={handleClearAllLeads}
                    className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 font-semibold text-xs transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl">
                <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-400 font-semibold">No customer leads found</p>
                <p className="text-xs text-gray-500 mt-1">
                  Orders submitted through the "Order Website" or "Book Appointment" buttons will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-gray-950/70 text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-800">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Phone / WhatsApp</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Target Website / Plan</th>
                      <th className="py-3 px-4">Preference / Price</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-800/40 transition">
                        <td className="py-3 px-4 font-bold text-white">{lead.name}</td>
                        <td className="py-3 px-4 font-mono text-emerald-400">{lead.phone}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            lead.type === 'order'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {lead.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-200">{lead.targetTitle || 'Custom Website'}</td>
                        <td className="py-3 px-4 text-emerald-400 font-medium">{lead.price || '₹10,000 - ₹18,000'}</td>
                        <td className="py-3 px-4 text-gray-400 max-w-xs truncate">{lead.notes || '—'}</td>
                        <td className="py-3 px-4 text-gray-500 text-[11px] whitespace-nowrap">{lead.timestamp}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                              const url = `https://wa.me/${cleanPhone || DISPLAY_PHONE}?text=${encodeURIComponent(`Hi ${lead.name}! BS Websites team following up on your ${lead.targetTitle} request.`)}`;
                              openWhatsAppLink(url);
                            }}
                            className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 transition inline-flex items-center"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-300 border border-red-800/40 transition inline-flex items-center"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PUBLISH ANNOUNCEMENT (Custom Offer Poster for Customer Portal) */}
        {activeTab === 'announcements' && (
          <div className="rounded-3xl bg-gray-900 border border-gray-800 p-6 sm:p-8 space-y-8">
            {/* Header & Quick Presets */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <Flame className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Publish Announcement & Special Offers
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                  Customize the dynamic Offers Announcement Poster positioned prominently above the "High Conversion Websites" section on the Customer Portal. Updates apply instantly upon publishing.
                </p>
              </div>

              {/* Status & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAnnouncementForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer ${
                    announcementForm.isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${announcementForm.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`}></span>
                  <span>{announcementForm.isActive ? 'Poster Status: Active' : 'Poster Status: Hidden'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePublishAnnouncement}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish to Customer Portal</span>
                </button>
              </div>
            </div>

            {/* Quick Presets Bar */}
            <div className="p-4 rounded-2xl bg-gray-950/70 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Quick Offer Presets:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset('festival')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition cursor-pointer"
                >
                  Festival 10% Off
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('startup')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
                >
                  Startup 15% Off
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('flash')}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold transition cursor-pointer"
                >
                  Flash Sale 20% Off
                </button>
              </div>
            </div>

            {/* Two-Column Editor: Left Form, Right Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Controls */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Top Pill / Badge Text
                    </label>
                    <input
                      type="text"
                      value={announcementForm.badge}
                      onChange={(e) => setAnnouncementForm(prev => ({ ...prev, badge: e.target.value }))}
                      placeholder="e.g. Limited Festival Season Offer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      value={announcementForm.couponCode}
                      onChange={(e) => setAnnouncementForm(prev => ({ ...prev, couponCode: e.target.value.toUpperCase() }))}
                      placeholder="e.g. FESTIVAL10"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-amber-300 font-mono text-xs uppercase focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Offer Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Special Festival Offer:"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Highlight / Gradient Text (Prominent)
                  </label>
                  <input
                    type="text"
                    value={announcementForm.highlightText}
                    onChange={(e) => setAnnouncementForm(prev => ({ ...prev, highlightText: e.target.value }))}
                    placeholder="e.g. Get 10% Off on All E-Commerce & AI Websites!"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-amber-300 text-xs font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Offer Description
                  </label>
                  <textarea
                    rows={3}
                    value={announcementForm.description}
                    onChange={(e) => setAnnouncementForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide details about the promotional offer..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Discount Note / Badge Subtitle
                    </label>
                    <input
                      type="text"
                      value={announcementForm.discountNote}
                      onChange={(e) => setAnnouncementForm(prev => ({ ...prev, discountNote: e.target.value }))}
                      placeholder="e.g. 10% to 20% Instant Discount Applied"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Validity & Urgency Text
                    </label>
                    <input
                      type="text"
                      value={announcementForm.validityText}
                      onChange={(e) => setAnnouncementForm(prev => ({ ...prev, validityText: e.target.value }))}
                      placeholder="e.g. Offer Valid This Month • Limited Slots"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Offer Inclusions List */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Offer Inclusions & Perks ({announcementForm.inclusions?.length || 0})
                  </label>
                  <div className="space-y-2 mb-3">
                    {announcementForm.inclusions?.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-300">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{inc}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInclusion(iIdx)}
                          className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-red-400 transition cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddInclusion();
                        }
                      }}
                      placeholder="Add an included feature (e.g. 6 Months Free Warranty)..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddInclusion}
                      className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    Saved to localStorage (`bs_announcement_data`) automatically on publish.
                  </span>
                  <button
                    type="button"
                    onClick={handlePublishAnnouncement}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish Announcement Now</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Panel */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Customer Portal Live Preview
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    Interactive Preview
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-amber-950/40 via-gray-950 to-orange-950/40 border border-amber-500/30 p-5 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{announcementForm.badge || 'Limited Festival Season Offer'}</span>
                    </div>

                    {/* Headline */}
                    <div>
                      <h4 className="text-lg font-black text-white leading-tight">
                        {announcementForm.title}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400">
                          {announcementForm.highlightText}
                        </span>
                      </h4>
                      <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                        {announcementForm.description}
                      </p>
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-1.5 pt-1">
                      {announcementForm.inclusions?.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Coupon Preview Box */}
                    <div className="p-3 rounded-xl bg-gray-900/90 border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-400 font-medium">Use Coupon Code:</div>
                        <div className="text-xs font-black text-amber-300 font-mono tracking-wider">
                          {announcementForm.couponCode || 'FESTIVAL10'}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                        Copy
                      </span>
                    </div>

                    <div className="text-[10px] text-gray-400 text-center">
                      {announcementForm.validityText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: WARRANTY CERTIFICATE GENERATOR (Restricted Exclusively to Owner Portal) */}
        {activeTab === 'warranty_gen' && (
          <div className="rounded-3xl bg-gray-900 border border-gray-800 p-6 sm:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-[#2dd4bf]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      Restricted 6-Month Warranty Certificate Generator
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-[#2dd4bf] border border-teal-500/40 text-[11px] font-bold uppercase tracking-wider">
                        Owner Exclusive
                      </span>
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-3xl">
                  Issue official personalized 6-Month Website Performance Warranty Certificates for your clients upon project delivery. Fill in client and project specifications, click "Generate & Issue Certificate", then download the high-resolution PNG certificate to send to the client or share directly via WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadOwnerCertCard}
                  disabled={isDownloadingCert}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-60"
                >
                  {isDownloadingCert ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <Download className="w-4 h-4 text-slate-950" />
                  )}
                  <span>{isDownloadingCert ? 'Capturing Card...' : 'Download Warranty Card'}</span>
                </button>
              </div>
            </div>

            {/* Issued Notice Alert */}
            {certNotice && (
              <div className="p-4 rounded-2xl bg-teal-950/80 border border-teal-500/50 text-teal-200 text-xs flex items-center justify-between gap-3 animate-in fade-in shadow-xl">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2dd4bf] flex-shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold text-white">{certNotice}</strong>
                    <span className="text-teal-300 text-[11px]">
                      The personalized certificate has been generated and is ready to download or share.
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleShareCertWhatsApp}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            )}

            {/* Two-Column Layout: Left Form / Right Live Certificate */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Controls Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Client & Website Delivery Details
                    </span>
                    <span className="text-[10px] text-teal-400 font-mono">
                      Step 1: Input Data
                    </span>
                  </div>

                  {/* Customer / Client Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Customer / Business Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={certClientName}
                      onChange={(e) => setCertClientName(e.target.value)}
                      placeholder="e.g. Sri Krishna Enterprises / Apex Retail"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>

                  {/* Website Project Title / URL */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Website Project Name / URL <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={certProjectName}
                      onChange={(e) => setCertProjectName(e.target.value)}
                      placeholder="e.g. Premium E-Commerce Storefront (apexretail.in)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>

                  {/* Website Plan Category */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Website Plan / Category
                    </label>
                    <select
                      value={certWebsiteType}
                      onChange={(e) => setCertWebsiteType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-teal-400 focus:outline-none cursor-pointer"
                    >
                      <option value="Basic / Portfolio Website (₹10,000)">Basic / Portfolio Website (₹10,000)</option>
                      <option value="Business / Corporate Website (₹12,000)">Business / Corporate Website (₹12,000)</option>
                      <option value="E-Commerce Website (₹14,000)">E-Commerce Website (₹14,000)</option>
                      <option value="Custom AI / Dynamic Web App (₹18,000)">Custom AI / Dynamic Web App (₹18,000)</option>
                    </select>
                  </div>

                  {/* Issue Date & Expiry Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">
                        Issue / Delivery Date
                      </label>
                      <input
                        type="date"
                        value={certIssueDate}
                        onChange={(e) => setCertIssueDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">
                        6-Month Expiry Date
                      </label>
                      <div className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-[#2dd4bf] text-xs font-semibold">
                        {formattedCertExpiry}
                      </div>
                    </div>
                  </div>

                  {/* Certificate Serial ID */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-300">
                        Certificate Serial ID
                      </label>
                      <button
                        type="button"
                        onClick={regenerateCertId}
                        className="text-[11px] text-teal-400 hover:text-teal-300 underline font-medium cursor-pointer"
                      >
                        Generate New ID
                      </button>
                    </div>
                    <input
                      type="text"
                      value={certSerialId}
                      onChange={(e) => setCertSerialId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-[#2dd4bf] font-mono text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="button"
                      onClick={handleGenerateAndIssueCertificate}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Generate & Issue Certificate</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadOwnerCertCard}
                      disabled={isDownloadingCert}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isDownloadingCert ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      ) : (
                        <Download className="w-4 h-4 text-slate-950" />
                      )}
                      <span>Download Warranty Card (PNG)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShareCertWhatsApp}
                      className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send Certificate via WhatsApp (+91 9703281549)</span>
                    </button>
                  </div>
                </div>

                {/* Scope Coverage Summary Box */}
                <div className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800 text-xs text-gray-400 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Included Scope of Coverage:</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-gray-300 list-disc list-inside">
                    <li>180 Days of Technical Bug Fixes & Code Rectification</li>
                    <li>Site Speed and Performance Load Integrity (Chrome, Edge, Safari)</li>
                    <li>Mobile, Tablet, and Desktop Responsive Layout Alignment</li>
                    <li>Priority Direct WhatsApp Support with Siva (+91 9703281549)</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Live High-Resolution Certificate Card Preview */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Personalized Certificate Live Card
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-[#2dd4bf] text-[10px] font-bold">
                      Real-Time Output
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadOwnerCertCard}
                    disabled={isDownloadingCert}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                </div>

                {/* THE ACTUAL PERSONALIZED WARRANTY CARD */}
                <div className="shadow-2xl">
                  <WarrantyCard
                    id="owner-warranty-card-element"
                    clientName={certClientName || '[ Client / Business Name ]'}
                    projectName={certProjectName || '[ Project Name / URL ]'}
                    issueDate={formattedCertIssue}
                    expiryDate={formattedCertExpiry}
                    coveragePeriod="6 Months Full Protection"
                    supportContact="+91 9703281549"
                    certId={certSerialId}
                    isSample={false}
                  />
                </div>

                <p className="text-[11px] text-gray-400 text-center italic">
                  Note: Clicking "Download Warranty Card" renders this exact card as a 2x high-resolution PNG image directly saved to your device.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHOWCASE WEBSITES (Local File Upload + Uniform Pricing + Delete) */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Showcase Websites & Portfolio</h3>
                <p className="text-xs text-gray-400">
                  Add, edit, or remove showcase items. Upload real images directly from your device gallery using the file input.
                </p>
              </div>

              {/* Dynamic Website Addition Button */}
              <button
                onClick={() => {
                  setEditingPortfolio({
                    id: 'portfolio-' + Date.now(),
                    title: '',
                    category: 'Corporate & SaaS',
                    price: 17500,
                    rating: 5.0,
                    reviewsCount: 1,
                    description: '',
                    image: '',
                    liveDemoUrl: 'https://example.com/demo',
                    tags: ['Tailwind', 'Responsive', 'High Conversion'],
                    highlights: ['Custom UI design', 'Mobile & Tablet Ready', '1-click WhatsApp trigger']
                  });
                  setPortfolioError(null);
                  setIsPortfolioModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Showcase Website</span>
              </button>
            </div>

            {/* Portfolio Grid in Owner Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-gray-900 border border-gray-800 overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="relative h-44 w-full bg-gray-950">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[11px] font-medium text-white border border-gray-700">
                        {item.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <span className="font-extrabold text-emerald-400 text-sm">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      <div className="text-[11px] text-gray-500 font-mono truncate flex items-center gap-1">
                        <Globe className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                        <span className="truncate">{item.liveDemoUrl}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Open Live Demo in New Tab, Edit, and Delete */}
                  <div className="p-5 pt-0 border-t border-gray-800/80 mt-2 flex items-center justify-between gap-2 pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPreviewItem(item)}
                        className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 flex items-center gap-1.5 transition"
                        title="Open in Simulator"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      {/* Open live demo preview in a new tab */}
                      <a
                        href={item.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-xs text-indigo-300 border border-indigo-800/40 flex items-center gap-1 transition"
                        title="Visit Demo in New Tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Test Demo</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingPortfolio(item);
                          setPortfolioError(null);
                          setIsPortfolioModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
                        title="Edit Item"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* Working Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePortfolio(item.id);
                        }}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition"
                        title="Delete Website"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGES & PRICING */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Website Packages (₹10,000 – ₹18,000 Range)</h3>
                <p className="text-xs text-gray-400">
                  Update package titles, turnaround times, included features, and prices.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPlan({
                    id: 'plan-' + Date.now(),
                    title: 'New Custom Package',
                    subtitle: 'Tailored for growth',
                    price: 12000,
                    originalPrice: 19999,
                    duration: '3-4 Days Delivery',
                    category: 'Custom',
                    description: 'Full custom website with responsiveness and WhatsApp integration.',
                    iconName: 'Layout',
                    features: ['Responsive UI', 'WhatsApp Lead Form', 'SEO Optimized']
                  });
                  setIsPlanModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-3xl bg-gray-900 border border-gray-800 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                        {plan.category}
                      </span>
                      {plan.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Popular
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">{plan.title}</h4>
                    <p className="text-xs text-gray-400 mb-4">{plan.subtitle}</p>

                    <div className="mb-4 pb-4 border-b border-gray-800">
                      <div className="text-2xl font-black text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{plan.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-6 text-xs text-gray-300">
                      {plan.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px]">
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => {
                        setEditingPlan(plan);
                        setIsPlanModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
                      title="Edit Package"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition"
                      title="Delete Package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STANDALONE SINGLE-FILE HTML EXPORTER */}
        {activeTab === 'export' && (
          <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-xl font-bold text-white">
                    Full Self-Contained Single-File HTML Code
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Complete single-file application containing HTML5, Tailwind CSS CDN, and Vanilla JavaScript. Includes team credits (Bhargav, Bhavesh, Siva), "Order Website" modal, uniform ₹10,000 - ₹18,000 pricing, "Visit Website Now" new-tab links, and owner controls.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCopyHtml}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs flex items-center gap-1.5 transition border border-gray-700"
                >
                  {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedHtml ? 'Copied Code!' : 'Copy Entire Code'}</span>
                </button>

                <button
                  onClick={handleDownloadHtml}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download index.html</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl bg-gray-950 border border-gray-800 p-4 font-mono text-xs text-gray-300 max-h-96 overflow-y-auto">
              <pre><code>{generateStandaloneHtml()}</code></pre>
            </div>
          </div>
        )}

        {/* TAB 5: TEAM PROFILE PHOTOS (Bhargav, Bhavesh, and Siva) */}
        {activeTab === 'team_photos' && (
          <div className="rounded-3xl bg-gray-900 border border-gray-800 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">
                    Team Profile Photos Management
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Upload or update official circular profile photos for Bhargav (Web Developer), Bhavesh (Web Designer), and Siva (Sales Mediator) from your local device gallery. Saved to localStorage (<code className="text-cyan-300">bs_bhargav_photo</code>, <code className="text-cyan-300">bs_bhavesh_photo</code>, and <code className="text-cyan-300">bs_siva_photo</code>) and instantly reflected in the Header, Team Section, and Lightbox.
                </p>
              </div>
            </div>

            {/* Team Members Photo Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Bhargav (Web Developer) Card */}
              <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 flex flex-col justify-between space-y-5 shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                      Web Developer
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: bhargav</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Circular Photo Preview */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl shadow-blue-500/20 flex-shrink-0 bg-gray-900">
                      <img
                        src={bhargavPhoto}
                        alt="Bhargav - Web Developer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/bhargav.jpg';
                        }}
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1.5">
                      <h4 className="text-lg font-bold text-white">Bhargav</h4>
                      <p className="text-xs text-blue-400 font-semibold">Lead Full-Stack Web Developer</p>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Full-stack architecture, React & TypeScript engineering, instant loading performance, and responsive interfaces.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload & Reset Controls */}
                <div className="pt-4 border-t border-gray-800/80 space-y-3">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-blue-600/20 transition">
                    <Upload className="w-4 h-4" />
                    <span>Upload Bhargav Photo from Device Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBhargavFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleResetBhargav}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white text-xs border border-gray-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Default Photo (/bhargav.jpg)</span>
                  </button>
                </div>
              </div>

              {/* Bhavesh (Web Designer) Card */}
              <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 flex flex-col justify-between space-y-5 shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
                      Web Designer
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: bhavesh</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Circular Photo Preview */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl shadow-purple-500/20 flex-shrink-0 bg-gray-900">
                      <img
                        src={bhaveshPhoto}
                        alt="Bhavesh - Web Designer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/bhavesh.jpg';
                        }}
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1.5">
                      <h4 className="text-lg font-bold text-white">Bhavesh</h4>
                      <p className="text-xs text-purple-400 font-semibold">UI/UX Designer & Creative Craftsman</p>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        High-converting aesthetics, Tailwind styling, typographic balance, and mobile-first micro-interactions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload & Reset Controls */}
                <div className="pt-4 border-t border-gray-800/80 space-y-3">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-purple-600/20 transition">
                    <Upload className="w-4 h-4" />
                    <span>Upload Bhavesh Photo from Device Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBhaveshFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleResetBhavesh}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white text-xs border border-gray-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Default Photo (/bhavesh.jpg)</span>
                  </button>
                </div>
              </div>

              {/* Siva / Sivam Manikanta (Sales Mediator) Card */}
              <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 flex flex-col justify-between space-y-5 shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                      Sales Mediator
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: siva</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Circular Photo Preview */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl shadow-emerald-500/20 flex-shrink-0 bg-gray-900">
                      <img
                        src={sivaPhoto}
                        alt="Siva - Sales Mediator"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1.5">
                      <h4 className="text-lg font-bold text-white">Siva (Sivam Manikanta)</h4>
                      <p className="text-xs text-emerald-400 font-semibold">Sales Mediator & Client Strategist</p>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Client requirement consultation, scope coordination, and direct 24/7 WhatsApp updates from start to launch.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload & Reset Controls */}
                <div className="pt-4 border-t border-gray-800/80 space-y-3">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-emerald-600/20 transition">
                    <Upload className="w-4 h-4" />
                    <span>Upload Siva Photo from Device Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSivaFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleResetSiva}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white text-xs border border-gray-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Default Photo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EDIT / ADD SHOWCASE MODAL (With Local File Upload & Price Verification) */}
      {isPortfolioModalOpen && editingPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-gray-900 border border-gray-800 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">
              {editingPortfolio.id.startsWith('portfolio-') && !portfolio.some(p => p.id === editingPortfolio.id)
                ? 'Add New Showcase Website'
                : `Edit Website: ${editingPortfolio.title}`}
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Fill in the details below. You can select an image directly from your device file manager.
            </p>

            {portfolioError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-xs text-red-300">
                {portfolioError}
              </div>
            )}

            <form onSubmit={handleSavePortfolio} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Website Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Luxury Real Estate"
                  value={editingPortfolio.title}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Price (₹10,000 - ₹25,000) & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center justify-between">
                    <span>Price (₹ INR) <span className="text-red-400">*</span></span>
                    <span className="text-[10px] text-emerald-400 font-semibold">10,000 – 25,000</span>
                  </label>
                  <input
                    type="number"
                    min={10000}
                    max={25000}
                    required
                    value={editingPortfolio.price}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-gray-500">Tiered package range</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                  <select
                    value={editingPortfolio.category}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Corporate & SaaS">Corporate & SaaS</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Portfolio & Hospitality">Portfolio & Hospitality</option>
                    <option value="Custom Web App">Custom Web App</option>
                  </select>
                </div>
              </div>

              {/* LOCAL FILE UPLOAD (FileReader Base64) */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center justify-between">
                  <span>Upload Image (Local File / Device Gallery)</span>
                  {editingPortfolio.image && (
                    <span className="text-[10px] text-emerald-400 font-medium">Image Loaded</span>
                  )}
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Image thumbnail */}
                  {editingPortfolio.image ? (
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-indigo-500/50 flex-shrink-0 bg-gray-950 shadow-inner">
                      <img
                        src={editingPortfolio.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-16 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500 text-[10px] flex-shrink-0 bg-gray-950">
                      <ImageIcon className="w-4 h-4 mb-0.5" />
                      <span>No image</span>
                    </div>
                  )}

                  {/* Native File Input with FileReader */}
                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      id="owner-portfolio-file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="w-full text-xs text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer bg-gray-950 border border-gray-800 rounded-xl p-1.5"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                      Converts image to Base64 data URL and stores it in localStorage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Demo Link & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Live Demo Link / URL <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/demo"
                      value={editingPortfolio.liveDemoUrl}
                      onChange={(e) => setEditingPortfolio({ ...editingPortfolio, liveDemoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                    {editingPortfolio.liveDemoUrl && (
                      <a
                        href={editingPortfolio.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition flex-shrink-0"
                        title="Test link in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Rating (1 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    value={editingPortfolio.rating}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe the website architecture, features, and target business..."
                  value={editingPortfolio.description}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsPortfolioModalOpen(false);
                    setEditingPortfolio(null);
                    setPortfolioError(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition"
                >
                  Save Showcase Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PLAN MODAL */}
      {isPlanModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-gray-900 border border-gray-800 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Edit Package: {editingPlan.title}
            </h3>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Package Title</label>
                <input
                  type="text"
                  value={editingPlan.title}
                  onChange={(e) => setEditingPlan({ ...editingPlan, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Price (₹10,000 - ₹25,000)</label>
                  <input
                    type="number"
                    min={10000}
                    max={25000}
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Delivery Duration</label>
                  <input
                    type="text"
                    value={editingPlan.duration}
                    onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Subtitle / Target Audience</label>
                <input
                  type="text"
                  value={editingPlan.subtitle}
                  onChange={(e) => setEditingPlan({ ...editingPlan, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Features (One per line)</label>
                <textarea
                  rows={4}
                  value={editingPlan.features.join('\n')}
                  onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

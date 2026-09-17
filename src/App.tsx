/**
 * BS Websites - Custom Website Creation Service
 * Team: Bhargav (Web Developer), Bhavesh (Web Designer), Siva (Sales Mediator)
 * WhatsApp: +91 9703281549
 */

import React, { useState, useEffect } from 'react';
import { 
  CustomerUser, 
  CustomerLead, 
  WebsitePlan, 
  PortfolioItem, 
  PortalMode,
  AnnouncementData 
} from './types';
import { 
  TEAM_MEMBERS, 
  INITIAL_PLANS, 
  INITIAL_PORTFOLIO, 
  INITIAL_LEADS,
  DEFAULT_ANNOUNCEMENT 
} from './data/initialData';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WarrantyBanner } from './components/WarrantyBanner';
import { PricingPlans } from './components/PricingPlans';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { TeamSection } from './components/TeamSection';
import { OffersPoster } from './components/OffersPoster';
import { OwnerDashboard } from './components/OwnerDashboard';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { AuthModal } from './components/Modals/AuthModal';
import { OrderModal } from './components/Modals/OrderModal';
import { OrderWebsiteModal } from './components/Modals/OrderWebsiteModal';
import { AppointmentModal } from './components/Modals/AppointmentModal';
import { LivePreviewModal } from './components/Modals/LivePreviewModal';
import { WarrantyModal } from './components/Modals/WarrantyModal';

import { 
  seedPortfolioIfEmpty, 
  subscribeToPortfolio, 
  saveLeadToFirestore, 
  subscribeToLeads 
} from './firebase';

// Helper to sanitize prices within ₹10,000 to ₹25,000
const sanitizePrice = (price: number): number => {
  if (isNaN(price) || price < 10000) return 10000;
  if (price > 25000) return 25000;
  return price;
};

export default function App() {
  // State for Portal Mode ('customer' | 'owner')
  const [portalMode, setPortalMode] = useState<PortalMode>(() => {
    const saved = localStorage.getItem('bs_portal_mode');
    return (saved as PortalMode) || 'customer';
  });

  // Dynamic Custom Business Logo state
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('bs_custom_logo');
  });

  const handleUpdateLogo = (logoUrl: string | null) => {
    setCustomLogoUrl(logoUrl);
    if (logoUrl) {
      try {
        localStorage.setItem('bs_custom_logo', logoUrl);
      } catch (e) {
        console.error('Error saving custom logo to localStorage:', e);
      }
    } else {
      localStorage.removeItem('bs_custom_logo');
    }
  };

  // Team profile photos (Bhargav - Developer, Bhavesh - Designer) stored in localStorage
  const [bhargavPhoto, setBhargavPhoto] = useState<string>(() => {
    return localStorage.getItem('bs_bhargav_photo') || '/bhargav.jpg';
  });

  const [bhaveshPhoto, setBhaveshPhoto] = useState<string>(() => {
    return localStorage.getItem('bs_bhavesh_photo') || '/bhavesh.jpg';
  });

  const handleUpdateBhargavPhoto = (photoUrl: string) => {
    setBhargavPhoto(photoUrl);
    try {
      localStorage.setItem('bs_bhargav_photo', photoUrl);
    } catch (e) {
      console.error('Error saving Bhargav photo to localStorage:', e);
    }
  };

  const handleUpdateBhaveshPhoto = (photoUrl: string) => {
    setBhaveshPhoto(photoUrl);
    try {
      localStorage.setItem('bs_bhavesh_photo', photoUrl);
    } catch (e) {
      console.error('Error saving Bhavesh photo to localStorage:', e);
    }
  };

  // Siva profile photo (Sales Mediator) stored in localStorage
  const [sivaPhoto, setSivaPhoto] = useState<string>(() => {
    return localStorage.getItem('bs_siva_photo') || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80';
  });

  const handleUpdateSivaPhoto = (photoUrl: string) => {
    setSivaPhoto(photoUrl);
    try {
      localStorage.setItem('bs_siva_photo', photoUrl);
    } catch (e) {
      console.error('Error saving Siva photo to localStorage:', e);
    }
  };

  // Special Offers Announcement Poster Data stored in localStorage
  const [announcement, setAnnouncement] = useState<AnnouncementData>(() => {
    try {
      const saved = localStorage.getItem('bs_announcement_data');
      return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENT;
    } catch {
      return DEFAULT_ANNOUNCEMENT;
    }
  });

  const handleUpdateAnnouncement = (data: AnnouncementData) => {
    setAnnouncement(data);
    try {
      localStorage.setItem('bs_announcement_data', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving announcement to localStorage:', e);
    }
  };

  // Current customer login state
  const [currentCustomer, setCurrentCustomer] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('bs_current_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Plans data state (Strictly ₹15,000 - ₹20,000)
  const [plans, setPlans] = useState<WebsitePlan[]>(() => {
    try {
      const saved = localStorage.getItem('bs_website_plans');
      if (saved) {
        const parsed: WebsitePlan[] = JSON.parse(saved);
        return parsed.map(p => ({
          ...p,
          price: sanitizePrice(p.price)
        }));
      }
      return INITIAL_PLANS;
    } catch {
      return INITIAL_PLANS;
    }
  });

  // Portfolio data state (Strictly ₹15,000 - ₹20,000)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('bs_portfolio_items');
      if (saved) {
        const parsed: PortfolioItem[] = JSON.parse(saved);
        return parsed.map(item => ({
          ...item,
          price: sanitizePrice(item.price)
        }));
      }
      return INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  // Leads CRM state
  const [leads, setLeads] = useState<CustomerLead[]>(() => {
    try {
      const saved = localStorage.getItem('bs_customer_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Modal visibility states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'customer' | 'owner'>('customer');

  // Dedicated "Order Website" Modal state
  const [isOrderWebsiteModalOpen, setIsOrderWebsiteModalOpen] = useState(false);
  const [orderWebsiteDefaultType, setOrderWebsiteDefaultType] = useState('Corporate Website');

  // Warranty Certificate Modal state
  const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState(false);

  // Plan Order Modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPlanForOrder, setSelectedPlanForOrder] = useState<{ title: string; price: number | string }>({
    title: 'Business / Corporate Website',
    price: 17500
  });

  // Appointment modal state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentTopic, setAppointmentTopic] = useState('Custom Website Development');

  // Live preview modal state
  const [selectedPreviewItem, setSelectedPreviewItem] = useState<PortfolioItem | null>(null);

  // Sync with Firestore Cloud Database, Server Storage, and LocalStorage
  useEffect(() => {
    // 1. Initial Firestore seed & fetch (permanent cloud database)
    seedPortfolioIfEmpty().then((items) => {
      if (items && items.length > 0) {
        setPortfolio(items);
        localStorage.setItem('bs_portfolio_items', JSON.stringify(items));
      }
    }).catch(err => {
      console.warn('Firestore seed warning, falling back to local/server:', err);
    });

    // 2. Real-time Firestore sync for all visitors
    const unsubPortfolio = subscribeToPortfolio((items) => {
      if (items && items.length > 0) {
        setPortfolio(items);
        localStorage.setItem('bs_portfolio_items', JSON.stringify(items));
      }
    });

    // 3. Real-time Firestore customer leads sync
    const unsubLeads = subscribeToLeads((firestoreLeads) => {
      if (firestoreLeads && firestoreLeads.length > 0) {
        setLeads(firestoreLeads);
        localStorage.setItem('bs_customer_leads', JSON.stringify(firestoreLeads));
      }
    });

    // 4. Server storage fallback (when running with custom Node backend)
    fetch('/api/portfolio')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((serverData: PortfolioItem[] | null) => {
        if (serverData && Array.isArray(serverData) && serverData.length > 0) {
          setPortfolio(prev => (prev.length === 0 ? serverData : prev));
        }
      })
      .catch(() => {
        // Safe silent fallback to Firestore & localStorage on static hosts like Vercel
      });

    return () => {
      unsubPortfolio();
      unsubLeads();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('bs_portal_mode', portalMode);
  }, [portalMode]);

  useEffect(() => {
    localStorage.setItem('bs_website_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('bs_portfolio_items', JSON.stringify(portfolio));
    // Save to local server file backup as secondary fallback
    fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(portfolio)
    }).catch(err => console.warn('Server fallback sync notice:', err));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('bs_customer_leads', JSON.stringify(leads));
  }, [leads]);

  // Show Auth modal initially if first time visiting and no customer user is set
  useEffect(() => {
    const hasVisited = localStorage.getItem('bs_visited');
    if (!hasVisited && !currentCustomer) {
      setIsAuthModalOpen(true);
      localStorage.setItem('bs_visited', 'true');
    }
  }, [currentCustomer]);

  // Handler: Customer Login
  const handleCustomerLogin = (user: CustomerUser) => {
    setCurrentCustomer(user);
    setPortalMode('customer');
    localStorage.setItem('bs_current_customer', JSON.stringify(user));

    // Record login lead if not already present
    const lead: CustomerLead = {
      id: 'lead-' + Date.now(),
      name: user.name,
      phone: user.phone,
      type: 'login',
      targetTitle: 'Customer Portal Login',
      timestamp: 'Just now'
    };
    setLeads(prev => [lead, ...prev]);
  };

  // Handler: Owner Login
  const handleOwnerLogin = () => {
    setPortalMode('owner');
  };

  // Handler: Logout / Switch
  const handleLogout = () => {
    setPortalMode('customer');
    setIsAuthModalOpen(true);
  };

  // Handler: Open Order Website Modal
  const handleOpenOrderWebsite = (defaultType?: string) => {
    if (defaultType) {
      setOrderWebsiteDefaultType(defaultType);
    }
    setIsOrderWebsiteModalOpen(true);
  };

  // Handler: Buy Plan (Can trigger OrderWebsiteModal with pre-selected type)
  const handleBuyPlan = (plan: WebsitePlan) => {
    let matchedType = 'Corporate Website';
    if (plan.category === 'E-Commerce') matchedType = 'E-Commerce Website';
    else if (plan.category === 'Portfolio') matchedType = 'Portfolio Website';
    else if (plan.category === 'Web App') matchedType = 'Custom Dynamic Site';

    handleOpenOrderWebsite(matchedType);
  };

  // Handler: Book Appointment
  const handleBookAppointment = (topic?: string) => {
    setAppointmentTopic(topic || 'Custom Website Consultation');
    setIsAppointmentModalOpen(true);
  };

  // Handler: Lead Recorded
  const handleLeadRecorded = (newLead: CustomerLead) => {
    setLeads(prev => {
      const updated = [newLead, ...prev];
      try {
        localStorage.setItem('bs_customer_leads', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    // Persist permanently in Firestore Cloud Database
    saveLeadToFirestore(newLead).catch(err => {
      console.error("Error saving lead to Firestore:", err);
    });
  };

  // Reset to sample defaults
  const handleResetDefaults = () => {
    setPlans(INITIAL_PLANS);
    setPortfolio(INITIAL_PORTFOLIO);
    setLeads(INITIAL_LEADS);
    localStorage.removeItem('bs_website_plans');
    localStorage.removeItem('bs_portfolio_items');
    localStorage.removeItem('bs_customer_leads');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      {/* 1. TOP HEADER & BRANDING:
          - Brand Name: BS Websites (very top header)
          - Below the title: team credits (Bhargav - Web Developer, Bhavesh - Web Designer, Siva - Sales Mediator)
          - Circular profile photos for Bhargav & Bhavesh
          - Restored Customer Menu Bar across Mobile, Tablet, Desktop
      */}
      <Header
        portalMode={portalMode}
        currentCustomer={currentCustomer}
        customLogoUrl={customLogoUrl}
        bhargavPhoto={bhargavPhoto}
        bhaveshPhoto={bhaveshPhoto}
        onOpenAuthModal={() => {
          setAuthModalTab('customer');
          setIsAuthModalOpen(true);
        }}
        onSwitchToOwner={() => {
          setAuthModalTab('owner');
          setIsAuthModalOpen(true);
        }}
        onSwitchToCustomer={() => setPortalMode('customer')}
        onLogout={handleLogout}
        onOpenAppointmentModal={(topic) => handleBookAppointment(topic)}
        onOpenOrderWebsiteModal={() => handleOpenOrderWebsite()}
        onOpenWarrantyModal={() => setIsWarrantyModalOpen(true)}
      />

      {/* Main Content: Either Customer Portal or Owner Dashboard */}
      <main className="flex-grow">
        {portalMode === 'owner' ? (
          <OwnerDashboard
            plans={plans}
            setPlans={setPlans}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            leads={leads}
            setLeads={setLeads}
            announcement={announcement}
            onUpdateAnnouncement={handleUpdateAnnouncement}
            customLogoUrl={customLogoUrl}
            onUpdateLogo={handleUpdateLogo}
            bhargavPhoto={bhargavPhoto}
            onUpdateBhargavPhoto={handleUpdateBhargavPhoto}
            bhaveshPhoto={bhaveshPhoto}
            onUpdateBhaveshPhoto={handleUpdateBhaveshPhoto}
            sivaPhoto={sivaPhoto}
            onUpdateSivaPhoto={handleUpdateSivaPhoto}
            onSwitchToCustomerView={() => setPortalMode('customer')}
            onResetDefaults={handleResetDefaults}
            onPreviewItem={(item) => setSelectedPreviewItem(item)}
          />
        ) : (
          /* Customer Portal View: Read-Only, High Conversion */
          <>
            {/* OFFERS ANNOUNCEMENT POSTER: Positioned directly above High-Converting Websites Hero section */}
            <OffersPoster
              announcement={announcement}
              onOpenOrderWebsiteModal={() => handleOpenOrderWebsite('E-Commerce Website')}
              onBookAppointment={(topic) => handleBookAppointment(topic || 'Special Festival Offer: 10% Off')}
            />

            <Hero
              onExplorePlans={() => {
                const elem = document.getElementById('packages');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookAppointment={() => handleBookAppointment('General Consultation')}
              onOrderWebsite={() => handleOpenOrderWebsite()}
              customerName={currentCustomer?.name}
            />

            {/* 6 Months Free Warranty & Support Banner */}
            <WarrantyBanner
              onOpenWarrantyModal={() => setIsWarrantyModalOpen(true)}
              onOpenOrderModal={() => handleOpenOrderWebsite()}
            />

            {/* Packages & Pricing (₹10,000 - ₹18,000) */}
            <PricingPlans
              plans={plans}
              onBuyPlan={handleBuyPlan}
              onBookAppointment={(title) => handleBookAppointment(title)}
            />

            {/* Portfolio Showcase:
                - "Visit Website Now" Button (opens in new tab)
                - "Order Website" Button (opens order modal with pricing)
                - "Book Appointment" Button (WhatsApp)
            */}
            <PortfolioShowcase
              portfolio={portfolio}
              onBookAppointment={(title) => handleBookAppointment(title)}
              onPreviewLiveDemo={(item) => setSelectedPreviewItem(item)}
              onOrderWebsite={(defaultType) => handleOpenOrderWebsite(defaultType)}
            />

            <TeamSection
              team={TEAM_MEMBERS}
              bhargavPhoto={bhargavPhoto}
              bhaveshPhoto={bhaveshPhoto}
              sivaPhoto={sivaPhoto}
              onBookAppointment={(topic) => handleBookAppointment(topic)}
            />
          </>
        )}
      </main>

      {/* Sticky Dynamic WhatsApp Floating Action Button (+91 9703281549) */}
      <WhatsAppFloatingButton
        customerName={currentCustomer?.name}
        onOpenAppointmentModal={() => handleBookAppointment('WhatsApp Consultation')}
      />

      {/* Global Footer */}
      <Footer
        onOpenAuthModal={() => {
          setAuthModalTab('customer');
          setIsAuthModalOpen(true);
        }}
        onOpenAppointmentModal={() => handleBookAppointment('Consultation')}
      />

      {/* AUTH MODAL (Customer & Owner Portals) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
        onCustomerLogin={handleCustomerLogin}
        onOwnerLogin={handleOwnerLogin}
      />

      {/* 2. DEDICATED "ORDER WEBSITE" MODAL:
          - Information on how website ordering works
          - Selection for Types of Websites (Basic / Portfolio, Corporate, E-Commerce, Custom Dynamic Site)
          - Price Option Selector: "Fixed Price" vs "Bargain / Negotiable Price" (Base: ₹10,000 - ₹18,000)
          - Customer Name and Phone Number inputs
          - Direct submission to WhatsApp (+91 9703281549) with message:
            "Hi BS Websites! I want to order a website. Name: [Name], Phone: [Phone], Website Type: [Type], Pricing Preference: [Fixed / Bargain]."
      */}
      <OrderWebsiteModal
        isOpen={isOrderWebsiteModalOpen}
        onClose={() => setIsOrderWebsiteModalOpen(false)}
        currentCustomer={currentCustomer}
        onLeadRecorded={handleLeadRecorded}
        defaultWebsiteType={orderWebsiteDefaultType}
      />

      {/* PLAN ORDER MODAL */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        planTitle={selectedPlanForOrder.title}
        price={selectedPlanForOrder.price}
        currentCustomer={currentCustomer}
        onLeadRecorded={handleLeadRecorded}
      />

      {/* APPOINTMENT MODAL (Book Appointment - WhatsApp Redirection) */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        defaultQuery={appointmentTopic}
        currentCustomer={currentCustomer}
        onLeadRecorded={handleLeadRecorded}
      />

      {/* LIVE DEMO PREVIEW MODAL */}
      <LivePreviewModal
        item={selectedPreviewItem}
        onClose={() => setSelectedPreviewItem(null)}
        onBuy={(item) => handleOpenOrderWebsite(item.title)}
        onBook={(title) => handleBookAppointment(title)}
      />

      {/* 6-MONTH WARRANTY CERTIFICATE MODAL */}
      <WarrantyModal
        isOpen={isWarrantyModalOpen}
        onClose={() => setIsWarrantyModalOpen(false)}
        customerName={currentCustomer?.name}
        customLogoUrl={customLogoUrl}
      />
    </div>
  );
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
}

export interface WebsitePlan {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  duration: string;
  popular?: boolean;
  category: string;
  features: string[];
  description: string;
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  liveDemoUrl: string;
  tags: string[];
  highlights: string[];
}

export interface CustomerUser {
  name: string;
  phone: string;
  loggedInAt: string;
}

export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  type: 'login' | 'order' | 'appointment';
  targetTitle?: string;
  price?: string;
  date?: string;
  time?: string;
  notes?: string;
  timestamp: string;
}

export type PortalMode = 'login-select' | 'customer' | 'owner';

export interface OrderFormData {
  planId: string;
  planTitle: string;
  price: number;
  customerName: string;
  phone: string;
  businessType: string;
  notes: string;
  timeline: string;
}

export interface AppointmentFormData {
  customerName: string;
  phone: string;
  websiteType: string;
  date: string;
  time: string;
  query: string;
}

export interface AnnouncementData {
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  couponCode: string;
  discountNote: string;
  validityText: string;
  inclusions: string[];
  isActive: boolean;
}

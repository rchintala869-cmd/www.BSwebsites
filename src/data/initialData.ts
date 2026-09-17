import { TeamMember, WebsitePlan, PortfolioItem, CustomerLead, AnnouncementData } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'bhargav',
    name: 'Bhargav',
    role: 'Web Developer',
    bio: 'Full-Stack architecture specialist focused on ultra-fast load speeds, clean codebases, and seamless API integrations.',
    avatar: '/bhargav.jpg',
    skills: ['React & Next.js', 'Node.js & Express', 'Tailwind CSS', 'Performance Optimization', 'Database Architecture']
  },
  {
    id: 'bhavesh',
    name: 'Bhavesh',
    role: 'Web Designer',
    bio: 'UI/UX craftsman delivering captivating dark-mode aesthetics, responsive micro-interactions, and conversion-focused design systems.',
    avatar: '/bhavesh.jpg',
    skills: ['Figma & Wireframing', 'Neumorphic & Glass UI', 'Design Systems', 'Mobile-First Layouts', 'Brand Identity']
  },
  {
    id: 'siva',
    name: 'Siva',
    role: 'Sales Mediator',
    bio: 'Client strategist connecting client project visions with affordable packages, tailored scoping, and 24/7 WhatsApp consultation.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    skills: ['Requirement Scoping', 'Cost Estimation', 'WhatsApp Live Support', 'Client Onboarding', 'Milestone Tracking']
  }
];

export const INITIAL_PLANS: WebsitePlan[] = [
  {
    id: 'basic-portfolio',
    title: 'Basic / Portfolio Website',
    subtitle: 'Perfect for freelancers, consultants & personal branding',
    price: 10000,
    originalPrice: 14999,
    duration: '2-3 Days Delivery',
    category: 'Portfolio',
    description: 'Clean single-page responsive website designed to introduce you, highlight your portfolio, and collect client inquiries.',
    iconName: 'Layout',
    features: [
      'Single Page High-Converting Layout',
      '100% Mobile & Tablet Responsive',
      'Interactive Contact & WhatsApp Form',
      'Free SSL Certificate Setup',
      'Google Maps & Social Media Links',
      'Basic On-Page SEO Configuration',
      '6 Months Free Technical Warranty'
    ]
  },
  {
    id: 'business-corporate',
    title: 'Business / Corporate Website',
    subtitle: 'Ideal for small-to-medium businesses, agencies & firms',
    price: 12000,
    originalPrice: 16999,
    duration: '4-5 Days Delivery',
    popular: true,
    category: 'Business',
    description: 'Comprehensive multi-page website engineered to establish strong credibility, rank on Google, and convert prospects.',
    iconName: 'Building2',
    features: [
      'Up to 5 Custom Styled Pages',
      'Advanced Google SEO & Meta Optimization',
      'Blazing-Fast Speed Optimization (90+ Score)',
      'Lead Generation Forms & WhatsApp Widget',
      'Google Analytics & Search Console Setup',
      'Custom Domain & Business Email Assistance',
      '6 Months Free Technical Warranty & Support'
    ]
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Website',
    subtitle: 'Complete online store ready to sell products 24/7',
    price: 14000,
    originalPrice: 19999,
    duration: '6-8 Days Delivery',
    category: 'E-Commerce',
    description: 'Feature-packed online shopping platform with automated checkout, secure payment gateways, and inventory control.',
    iconName: 'ShoppingCart',
    features: [
      'Full Product Catalog (Up to 50 items seeded)',
      'Integrated Payment Gateway (Razorpay/UPI/Cards)',
      'Shopping Cart & Streamlined Checkout Flow',
      'Admin Dashboard for Order & Stock Management',
      'Automated Customer WhatsApp Order Receipts',
      'Discount Coupons & Promotional Banners',
      '6 Months Extended Warranty & Guidance'
    ]
  },
  {
    id: 'custom-ai-webapp',
    title: 'Custom AI / Dynamic Web App',
    subtitle: 'Tailored enterprise portal with custom logic & AI power',
    price: 18000,
    originalPrice: 24999,
    duration: '10-14 Days Delivery',
    category: 'Web App',
    description: 'Bespoke web application engineered with user authentication, custom database architecture, and smart AI capabilities.',
    iconName: 'Sparkles',
    features: [
      'Custom Database & API Integration',
      'User Authentication & Role-Based Portals',
      'Smart AI Chatbot / Automation Assistant',
      'Bespoke Admin Analytics Dashboard',
      'Automated Cloud Backups & Scalable Hosting',
      'Interactive Workflows & Custom Logic',
      '6 Months Extended Warranty & Priority Dev Slack/WhatsApp'
    ]
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'nexus-saas',
    title: 'Nexus Cloud SaaS Platform',
    category: 'Corporate & SaaS',
    price: 12000,
    rating: 4.9,
    reviewsCount: 38,
    description: 'High-tech dark SaaS landing page featuring live pricing tiers, interactive feature cards, and instant consultation triggers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com/demo/nexus-saas',
    tags: ['Next.js', 'Tailwind CSS', 'SaaS', 'Dark Theme'],
    highlights: ['99 Google PageSpeed Score', 'Built-in Interactive Calculator', 'Instant Lead Capture']
  },
  {
    id: 'aura-apparel',
    title: 'Aura Luxury Apparel Boutique',
    category: 'E-Commerce',
    price: 14000,
    rating: 5.0,
    reviewsCount: 46,
    description: 'Elegantly curated fashion e-commerce storefront with smooth product swatches, instant cart drawers, and Razorpay checkout.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com/demo/aura-apparel',
    tags: ['E-Commerce', 'Razorpay', 'Product Filters', 'Responsive'],
    highlights: ['Multi-currency Support', 'UPI QR Instant Payments', 'Order Notification via WhatsApp']
  },
  {
    id: 'savorio-bistro',
    title: 'Savorio Fine Italian Trattoria',
    category: 'Portfolio & Hospitality',
    price: 10000,
    rating: 4.8,
    reviewsCount: 29,
    description: 'Mouth-watering restaurant showcase with dynamic digital menus, Google Maps directions, and 1-click WhatsApp table reservations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com/demo/savorio-bistro',
    tags: ['Restaurant', 'QR Menu', 'Table Booking', 'Single Page'],
    highlights: ['Direct WhatsApp Reservations', 'PDF / Visual Menu Viewer', 'Instagram Reel Embed']
  },
  {
    id: 'apex-realty',
    title: 'Apex Prime Real Estate & Villas',
    category: 'Corporate & Real Estate',
    price: 12000,
    rating: 4.9,
    reviewsCount: 34,
    description: 'High-end property showcase platform equipped with interactive location maps, floor plans, and automated inquiry capture.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com/demo/apex-realty',
    tags: ['Real Estate', 'Lead Capture', 'Gallery', 'Multi-Page'],
    highlights: ['Virtual Tour Embeds', 'Mortgage Calculator Widget', 'WhatsApp Brochure Delivery']
  },
  {
    id: 'pulse-athletics',
    title: 'Pulse 24/7 Fitness & Crossfit Studio',
    category: 'Portfolio & Health',
    price: 10000,
    rating: 4.9,
    reviewsCount: 24,
    description: 'High-energy fitness club website with trainer rosters, live batch schedules, membership pricing, and trial pass booking.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com/demo/pulse-fitness',
    tags: ['Fitness', 'Schedule', 'Memberships', 'Responsive'],
    highlights: ['Interactive Schedule Table', 'Free Trial Pass Form', 'Trainer Video Showcase']
  },
  {
    id: 'neuro-ai',
    title: 'NeuroGen AI Prompt Studio',
    category: 'Custom Web App',
    price: 18000,
    rating: 5.0,
    reviewsCount: 52,
    description: 'Modern AI-powered SaaS web application with customizable prompts, user token wallets, dark dashboard, and database persistence.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com/demo/neurogen-ai',
    tags: ['AI App', 'Auth System', 'Admin Panel', 'Database'],
    highlights: ['Real-time Generation UI', 'Customer Credit Billing', 'Admin Telemetry Panel']
  }
];

export const INITIAL_LEADS: CustomerLead[] = [
  {
    id: 'lead-1',
    name: 'Rajesh Sharma',
    phone: '+91 9845123456',
    type: 'order',
    targetTitle: 'Business / Corporate Website',
    price: '₹12,000',
    notes: 'Need corporate website for legal consulting practice with appointment form.',
    timestamp: 'Today, 10:15 AM'
  },
  {
    id: 'lead-2',
    name: 'Pooja Reddy',
    phone: '+91 9988776655',
    type: 'appointment',
    targetTitle: 'E-Commerce Website Consultation',
    date: '2026-09-15',
    time: '04:30 PM',
    notes: 'Discussing organic skincare e-commerce store with UPI integration.',
    timestamp: 'Today, 08:45 AM'
  },
  {
    id: 'lead-3',
    name: 'Vikram Mehta',
    phone: '+91 9123456789',
    type: 'login',
    targetTitle: 'Browsed Packages & Portfolio',
    timestamp: 'Yesterday, 06:20 PM'
  }
];

export const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
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
};

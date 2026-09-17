/**
 * BS Websites - Complete Standalone Single-File HTML Generator
 * Generates 100% self-contained single-file HTML5 + Tailwind CSS CDN + FontAwesome + Vanilla JavaScript
 * Includes:
 * 1. Top Header & UI Adjustments (Decreased height/padding, branding, team credits, 3-button mobile menu)
 * 2. 6 Months Free Warranty Banner & Digital Certificate Generator Modal
 * 3. Dynamic Logo Integration with Owner Device Upload (FileReader Base64) + SVG Fallback
 * 4. Owner Portal with 100% Working Delete Button & Local Device Photo Upload
 * 5. Dedicated Order Website Modal with Fixed vs Bargain pricing and WhatsApp (+91 9703281549)
 * 6. Strict ₹10,000 - ₹18,000 uniform pricing & "Visit Website Now" new tab links
 */

export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BS Websites - Custom Website Creation Studio</title>
  <meta name="description" content="Custom website creation studio by Bhargav (Developer), Bhavesh (Designer) & Siva (Sales Mediator). 6 Months Free Warranty, Transparent ₹10,000 - ₹18,000 pricing.">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
            }
          }
        }
      }
    }
  </script>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <style>
    body {
      background-color: #0B0F19;
      color: #E2E8F0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .glass-panel {
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .card-hover:hover {
      border-color: rgba(99, 102, 241, 0.5);
      transform: translateY(-4px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @media print {
      body * {
        visibility: hidden;
      }
      #printableCertificateCard, #printableCertificateCard * {
        visibility: visible;
      }
      #printableCertificateCard {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: #0f172a !important;
        color: #ffffff !important;
        box-shadow: none !important;
        border: 2px solid #38bdf8 !important;
      }
    }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">

  <!-- TOP MICRO-BANNER: Contact & 6-Month Guarantee -->
  <div class="bg-gradient-to-r from-emerald-950/60 via-indigo-950/50 to-blue-950/60 border-b border-gray-800/80 py-1 px-4 text-xs text-gray-300">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-bold text-emerald-400">Official Guarantee:</span>
        <span class="text-gray-300">6 Months Free Warranty & Support on Every Website</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-emerald-400 font-semibold flex items-center gap-1">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>Direct WhatsApp:</span>
          <strong class="font-mono text-white">+91 9703281549</strong>
        </span>
        <button onclick="openWarrantyModal()" class="text-cyan-300 hover:text-white underline font-semibold transition">
          Certificate
        </button>
      </div>
    </div>
  </div>

  <!-- 1. TOP HEADER & UI ADJUSTMENTS:
       - Decreased length / height (py-2 px-4 sm:px-6)
       - Title: BS Websites
       - Team Credits: Bhargav (Web Developer), Bhavesh (Web Designer), Siva (Sales Mediator)
       - Mobile Menu with 3 Buttons:
         1. "Order Website"
         2. "Warranty & Certificate"
         3. "Owner Portal / Login"
  -->
  <header class="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl border-b border-gray-800/90 shadow-xl shadow-black/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3">
      
      <!-- Brand & Team Credits (Compact Layout) -->
      <div class="flex items-center gap-3 min-w-0">
        <!-- Dynamic Logo Container (Custom Upload or SVG Fallback) -->
        <div id="headerLogoContainer" class="flex-shrink-0 cursor-pointer" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
          <!-- Populated by renderHeaderLogo() in JS -->
        </div>

        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight leading-none truncate">
              BS Websites
            </h1>
            <span class="text-[9px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
              Studio
            </span>
          </div>

          <!-- Team Credits Prominently Below Title -->
          <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-gray-400 mt-0.5">
            <span class="text-blue-400 font-semibold">Bhargav <span class="text-gray-500 font-normal">(Web Developer)</span></span>
            <span class="text-gray-600">&bull;</span>
            <span class="text-purple-400 font-semibold">Bhavesh <span class="text-gray-500 font-normal">(Web Designer)</span></span>
            <span class="text-gray-600">&bull;</span>
            <span class="text-emerald-400 font-semibold">Siva <span class="text-gray-500 font-normal">(Sales Mediator)</span></span>
          </div>
        </div>
      </div>

      <!-- Desktop Navigation: 3 Quick Access Buttons -->
      <div class="hidden md:flex items-center gap-2.5">
        <!-- 1. Order Website Button -->
        <button onclick="openOrderModal()" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5 border border-emerald-400/40">
          <i class="fa-solid fa-cart-shopping text-[11px]"></i>
          <span>Order Website</span>
        </button>

        <!-- 2. Warranty & Certificate Button -->
        <button onclick="openWarrantyModal()" class="px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-white font-bold text-xs border border-cyan-500/40 transition flex items-center gap-1.5">
          <i class="fa-solid fa-award text-amber-400 text-xs"></i>
          <span>Warranty & Certificate</span>
        </button>

        <!-- 3. Owner Portal / Login Button -->
        <button onclick="openAuthModal()" class="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white font-bold text-xs border border-gray-700 transition flex items-center gap-1.5">
          <i class="fa-solid fa-shield-halved text-purple-400 text-xs"></i>
          <span id="desktopPortalLabel">Owner Portal / Login</span>
        </button>
      </div>

      <!-- Mobile Menu Button (Reveals the 3 Dedicated Buttons) -->
      <div class="flex items-center gap-2 md:hidden">
        <button onclick="openOrderModal()" class="px-2.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1">
          <i class="fa-solid fa-cart-shopping text-[10px]"></i>
          <span>Order</span>
        </button>

        <button id="mobileMenuBtn" onclick="toggleMobileMenu()" class="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition flex items-center gap-1.5 text-xs font-bold" aria-label="Toggle Navigation Menu">
          <i class="fa-solid fa-bars text-indigo-400" id="mobileMenuIcon"></i>
          <span>Menu</span>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu with 3 Dedicated Quick-Access Buttons -->
    <div id="mobileMenuDropdown" class="hidden md:hidden border-t border-gray-800 bg-[#070A12]/95 backdrop-blur-xl px-4 py-3 space-y-2">
      <div class="text-[10px] uppercase font-bold text-gray-400 px-1 mb-1 tracking-wider">Quick Actions</div>
      
      <!-- 1. Order Website -->
      <button onclick="openOrderModal(); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center gap-2.5 shadow-md">
        <i class="fa-solid fa-globe text-white"></i>
        <span>1. Order Website (Fixed vs Bargain)</span>
      </button>

      <!-- 2. Warranty & Certificate -->
      <button onclick="openWarrantyModal(); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-2.5">
        <i class="fa-solid fa-certificate text-amber-400"></i>
        <span>2. 6-Month Warranty & Certificate</span>
      </button>

      <!-- 3. Owner Portal / Login -->
      <button onclick="openAuthModal(); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-gray-800/90 border border-gray-700 text-purple-300 font-bold text-xs flex items-center gap-2.5">
        <i class="fa-solid fa-shield-halved text-purple-400"></i>
        <span>3. Owner Portal / Login</span>
      </button>
    </div>
  </header>

  <!-- MAIN CUSTOMER PORTAL VIEW -->
  <main id="customerView" class="flex-grow">
    
    <!-- 2. 6-MONTH WARRANTY & SUPPORT PROMINENT BANNER -->
    <section class="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-indigo-950/60 to-purple-950/70 border-2 border-emerald-500/40 p-5 sm:p-6 shadow-2xl">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div class="flex items-start sm:items-center gap-3 text-left">
            <div class="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex-shrink-0">
              <i class="fa-solid fa-shield-check text-2xl text-emerald-400"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  Guaranteed Quality
                </span>
                <span class="text-xs text-indigo-300 font-semibold">Bhargav &bull; Bhavesh &bull; Siva</span>
              </div>
              <h3 class="text-lg sm:text-xl font-black text-white">
                6 Months Free Warranty & Technical Support on Every Website
              </h3>
              <p class="text-xs text-gray-300 mt-1 max-w-2xl">
                Zero-cost bug fixes, mobile responsiveness maintenance, server security audits, and direct WhatsApp contact (+91 9703281549).
              </p>
            </div>
          </div>
          <div class="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto justify-end">
            <button onclick="openWarrantyModal()" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-file-invoice text-cyan-400"></i>
              <span>View Warranty Certificate</span>
            </button>
            <button onclick="openOrderModal()" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5">
              <span>Order Protected Site</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- HERO SECTION -->
    <section class="py-12 sm:py-16 px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Uniform Market Pricing: ₹10,000 – ₹18,000</span>
          <span class="text-gray-500 hidden sm:inline">&bull;</span>
          <span class="text-emerald-400 hidden sm:inline">Fixed or Bargain Option</span>
        </div>

        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          High-Converting Custom Websites <br>
          <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            Crafted For Real Business Growth
          </span>
        </h2>

        <p class="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Engineered by Bhargav (Developer), Bhavesh (Designer) & Siva (Sales Mediator). Guaranteed 3-5 days delivery, 6 months free warranty, and direct WhatsApp hotline.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button onclick="openOrderModal()" class="px-7 py-3.5 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 shadow-xl shadow-emerald-500/25 transition flex items-center gap-2 text-xs sm:text-sm border border-emerald-400/30">
            <i class="fa-solid fa-globe"></i>
            <span>Order Website (₹10k - ₹18k)</span>
          </button>
          
          <button onclick="openWarrantyModal()" class="px-5 py-3.5 rounded-2xl font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 transition text-xs sm:text-sm flex items-center gap-2">
            <i class="fa-solid fa-certificate text-amber-400"></i>
            <span>Warranty Certificate</span>
          </button>

          <button onclick="openAppointmentModal('Consultation')" class="px-5 py-3.5 rounded-2xl font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 transition text-xs sm:text-sm flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-emerald-400"></i>
            <span>WhatsApp Siva</span>
          </button>
        </div>
      </div>
    </section>

    <!-- PACKAGES & PRICING (Uniform ₹10,000 - ₹18,000) -->
    <section id="plans" class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
          <i class="fa-solid fa-bolt"></i> Transparent Market Pricing
        </div>
        <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Website Packages & Plans</h3>
        <p class="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto mt-1">
          Every package is strictly priced between ₹10,000 and ₹18,000 with 6 months warranty included.
        </p>
      </div>

      <div id="plansGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
    </section>

    <!-- PORTFOLIO SHOWCASE (Uniform Pricing + "Visit Website Now" new tab + Contact / Book) -->
    <section id="portfolio" class="py-12 bg-[#090D16] border-t border-b border-gray-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-star"></i> Live Portfolio & Demos
            </div>
            <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Showcase Websites</h3>
            <p class="text-gray-400 text-xs sm:text-sm mt-1">
              Click "Visit Website Now" to open each live demo in a new browser tab.
            </p>
          </div>
        </div>

        <div id="portfolioGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>
    </section>
  </main>

  <!-- OWNER PORTAL VIEW (Dashboard with Logo Upload, Add Site, Working Delete) -->
  <main id="ownerView" class="hidden flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <!-- Header banner -->
    <div class="mb-8 p-6 rounded-3xl bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-gray-900 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xl">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white">Owner Command Center</h2>
          <p class="text-xs text-gray-400">Custom business logo upload, showcase management with working delete, and leads.</p>
        </div>
      </div>
      <button onclick="togglePortalMode()" class="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-white border border-gray-700 transition flex items-center gap-1.5">
        <i class="fa-solid fa-arrow-left text-indigo-400"></i>
        <span>Switch to Customer Website View</span>
      </button>
    </div>

    <!-- 3. BRANDING & OWNER LOGO UPLOAD SECTION -->
    <div class="mb-8 p-6 rounded-3xl bg-gray-900 border border-gray-800 shadow-xl">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-sparkles text-cyan-400"></i>
            <span>BS Websites Official Logo Management</span>
          </h3>
          <p class="text-xs text-gray-400 mt-0.5">
            Upload your custom business logo from your device gallery. It dynamically updates the top header and warranty certificates.
          </p>
        </div>
        <button id="resetLogoBtn" onclick="resetOwnerLogo()" class="hidden text-xs text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 transition">
          Reset to Cyber Circuit SVG Logo
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-gray-950 border border-gray-800">
        <div>
          <label class="block text-xs font-bold text-gray-300 mb-2">Upload New Logo (Device Gallery / Local File)</label>
          <input type="file" id="ownerLogoInput" accept="image/*" onchange="handleOwnerLogoUpload(event)" class="w-full bg-gray-900 border border-gray-700 rounded-xl p-2 text-xs text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:text-xs hover:file:bg-cyan-500 cursor-pointer">
          <p class="text-[10px] text-gray-500 mt-1">Converts image to Base64 and updates localStorage immediately.</p>
        </div>
        <div class="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-900 border border-gray-800">
          <span class="text-[10px] text-gray-400 uppercase font-bold mb-2">Active Logo Preview</span>
          <div id="ownerLogoPreview"></div>
        </div>
      </div>
    </div>

    <!-- 4. ADD NEW SHOWCASE WEBSITE FORM (Local File Upload FileReader Base64) -->
    <div class="mb-10 p-6 rounded-3xl bg-gray-900 border border-gray-800 shadow-xl">
      <h3 class="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <i class="fa-solid fa-circle-plus text-indigo-400"></i>
        <span>Add New Showcase Website (Local Device Photo Upload)</span>
      </h3>
      <p class="text-xs text-gray-400 mb-5">Select an image from your device gallery. FileReader converts it to Base64.</p>

      <form id="addPortfolioForm" onsubmit="handleAddNewPortfolio(event)" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Website Title *</label>
            <input type="text" id="newTitle" required placeholder="e.g. Apex SaaS Studio" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Category *</label>
            <select id="newCategory" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white">
              <option value="Corporate & SaaS">Corporate & SaaS</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Portfolio & Hospitality">Portfolio & Hospitality</option>
              <option value="Custom Web App">Custom Web App</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1 flex items-center justify-between">
              <span>Price (₹ INR) *</span>
              <span class="text-[10px] text-emerald-400">₹10,000 – ₹18,000</span>
            </label>
            <input type="number" id="newPrice" min="10000" max="18000" value="12000" required class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">
              Upload Image (Local File / Device Gallery) *
            </label>
            <input type="file" id="newImageFile" accept="image/*" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2 text-xs text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-xs hover:file:bg-indigo-500 cursor-pointer">
            <span class="text-[10px] text-gray-500">Reads file as Base64 data URL instantly.</span>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Live Demo URL *</label>
            <input type="url" id="newDemoUrl" required value="https://example.com" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-300 mb-1">Description *</label>
          <textarea id="newDesc" rows="2" required placeholder="Description of the website..." class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white"></textarea>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition">
            Save & Publish Website
          </button>
        </div>
      </form>
    </div>

    <!-- 4. WORKING DELETE BUTTON IN OWNER PORTFOLIO GRID -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold text-white">Showcase Websites (Delete & Management)</h3>
          <p class="text-xs text-gray-400">Clicking Delete immediately updates state and localStorage without reloading.</p>
        </div>
      </div>
      <div id="ownerPortfolioGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>
  </main>

  <!-- FLOATING WHATSAPP BUTTON (+91 9703281549) -->
  <a href="https://wa.me/919703281549?text=Hi%20BS%20Websites!%20I%20want%20to%20order%20a%20website." target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 transition transform hover:scale-105 active:scale-95">
    <i class="fa-brands fa-whatsapp text-2xl"></i>
    <span class="text-xs font-extrabold hidden sm:inline">WhatsApp +91 9703281549</span>
  </a>

  <!-- 5. DEDICATED ORDER WEBSITE MODAL WITH LOGO UPLOAD & WHATSAPP REDIRECTION -->
  <div id="orderModal" class="hidden fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-6 sm:p-8">
      <button onclick="closeModal('orderModal')" class="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition">
        &times;
      </button>

      <div class="flex items-center gap-3 mb-5">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg">
          <i class="fa-solid fa-globe"></i>
        </div>
        <div>
          <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">BS Websites Studio</span>
          <h3 class="text-2xl font-black text-white">Order Your Website</h3>
        </div>
      </div>

      <!-- How website ordering works -->
      <div class="mb-5 p-4 rounded-2xl bg-gray-950 border border-indigo-500/20 text-xs text-gray-300 space-y-2">
        <div class="font-bold text-white flex items-center gap-1.5 text-xs">
          <i class="fa-regular fa-circle-question text-indigo-400"></i>
          <span>How Website Ordering Works:</span>
        </div>
        <div class="pl-1 space-y-1.5 text-[11px]">
          <div>1. <strong>Select Type & Pricing Option:</strong> Choose your website type and Fixed Price vs Bargain/Negotiable.</div>
          <div>2. <strong>Direct WhatsApp Hotline:</strong> Directly connects to Siva (Sales Mediator) & Bhargav (Developer) at <span class="text-emerald-400 font-mono">+91 9703281549</span>.</div>
          <div>3. <strong>6 Months Free Warranty:</strong> Every site launched includes 180 days of free bug rectifications and maintenance.</div>
        </div>
      </div>

      <form onsubmit="handleOrderSubmit(event)" class="space-y-4">
        <!-- Website Type Selection -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Select Type of Website</label>
          <select id="orderWebsiteType" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-xs text-white">
            <option value="Basic / Portfolio Website">Basic / Portfolio Website (₹10,000)</option>
            <option value="Business / Corporate Website" selected>Business / Corporate Website (₹12,000)</option>
            <option value="E-Commerce Website">E-Commerce Website (₹14,000)</option>
            <option value="Custom AI / Dynamic Web App">Custom AI / Dynamic Web App (₹18,000)</option>
          </select>
        </div>

        <!-- Price Option Selector: Fixed vs Bargain (₹10,000 - ₹18,000) -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-300">Price Option</label>
            <span class="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
              Base: ₹10,000 – ₹18,000
            </span>
          </div>
          <div class="grid grid-cols-2 gap-2.5">
            <label class="p-3 rounded-xl border border-gray-700 bg-gray-950 cursor-pointer flex items-center gap-2 text-xs">
              <input type="radio" name="priceOption" value="Fixed Price" checked class="text-indigo-600">
              <div>
                <strong class="text-white block">Fixed Price</strong>
                <span class="text-[10px] text-gray-400">Guaranteed Tier</span>
              </div>
            </label>
            <label class="p-3 rounded-xl border border-gray-700 bg-gray-950 cursor-pointer flex items-center gap-2 text-xs">
              <input type="radio" name="priceOption" value="Bargain / Negotiable Price" class="text-indigo-600">
              <div>
                <strong class="text-white block">Bargain / Negotiable</strong>
                <span class="text-[10px] text-gray-400">Discuss with Siva</span>
              </div>
            </label>
          </div>
        </div>

        <!-- User Details: Customer Name & Phone Number -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label class="block text-xs text-gray-300 mb-1">Customer Name *</label>
            <input type="text" id="orderCustName" required placeholder="Your full name" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white">
          </div>
          <div>
            <label class="block text-xs text-gray-300 mb-1">Phone Number (WhatsApp) *</label>
            <input type="tel" id="orderCustPhone" required placeholder="+91 9876543210" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white">
          </div>
        </div>

        <!-- Optional Client Logo Upload -->
        <div>
          <label class="block text-xs text-gray-300 mb-1">Attach Your Logo (Optional)</label>
          <input type="file" id="orderLogoInput" accept="image/*" class="w-full bg-gray-950 border border-gray-700 rounded-xl p-2 text-xs text-gray-300 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-gray-800 file:text-white file:text-xs">
          <p class="text-[10px] text-gray-500 mt-1">If you don't have a logo yet, Bhavesh can design one for your website.</p>
        </div>

        <!-- Submit Button sending to WhatsApp -->
        <div class="pt-2">
          <button type="submit" class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl transition flex items-center justify-center gap-2">
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span>Send Order to WhatsApp (+91 9703281549)</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 2. DIGITAL WARRANTY CERTIFICATE GENERATOR MODAL -->
  <div id="warrantyModal" class="hidden fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-6 sm:p-8">
      <button onclick="closeModal('warrantyModal')" class="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition">
        &times;
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-white text-xl shadow-lg">
          <i class="fa-solid fa-award"></i>
        </div>
        <div>
          <span class="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">BS Websites Quality Assurance</span>
          <h3 class="text-2xl font-black text-white">Digital Certificate of Warranty</h3>
        </div>
      </div>

      <!-- Certificate generator inputs -->
      <div class="mb-5 p-4 rounded-2xl bg-gray-950 border border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] font-semibold text-gray-400 mb-1">Customer Name</label>
          <input type="text" id="certCustName" value="Valued Customer" oninput="updateWarrantyCard()" class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-white">
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-gray-400 mb-1">Website Project Name</label>
          <input type="text" id="certWebName" value="Custom Commercial Website" oninput="updateWarrantyCard()" class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-white">
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-gray-400 mb-1">Purchase / Launch Date</label>
          <input type="date" id="certDate" onchange="updateWarrantyCard()" class="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-white">
        </div>
      </div>

      <!-- Printable Certificate Card -->
      <div id="printableCertificateCard" class="relative rounded-3xl bg-gradient-to-b from-gray-950 via-[#0B0F19] to-gray-950 border-2 border-cyan-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <!-- Certificate Header -->
        <div class="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
          <div class="flex items-center gap-3">
            <div id="certLogoContainer"></div>
            <div>
              <h4 class="text-lg font-black text-white leading-tight">BS Websites</h4>
              <p class="text-[10px] text-cyan-400 font-mono">OFFICIAL CERTIFICATE OF 6-MONTH WARRANTY</p>
            </div>
          </div>
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
              VERIFIED ACTIVE
            </span>
          </div>
        </div>

        <!-- Certificate Body -->
        <div class="text-center space-y-2 mb-6">
          <p class="text-xs text-gray-400 uppercase tracking-widest font-semibold">This document certifies that</p>
          <h2 id="certCardClient" class="text-2xl sm:text-3xl font-black text-cyan-300">
            Valued Customer
          </h2>
          <p class="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            is entitled to <strong>6 Months of Free Maintenance, Bug Rectification & Support</strong> for the web platform:
          </p>
          <div id="certCardProject" class="inline-block px-4 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-500/40 text-sm font-bold text-white mt-1">
            Custom Commercial Website
          </div>
        </div>

        <!-- Dates & Serial -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-xs text-gray-300 mb-6">
          <div>
            <span class="text-gray-500 block text-[10px] uppercase font-bold">Start Date</span>
            <strong id="certCardStart" class="text-white">Active</strong>
          </div>
          <div>
            <span class="text-gray-500 block text-[10px] uppercase font-bold">Warranty Expiry (6 Months)</span>
            <strong id="certCardEnd" class="text-emerald-400 font-bold">6 Months Covered</strong>
          </div>
          <div>
            <span class="text-gray-500 block text-[10px] uppercase font-bold">Certificate Serial</span>
            <strong class="font-mono text-cyan-300 text-[11px]">BSW-WTY-2025-9703</strong>
          </div>
        </div>

        <!-- Signatures Layout -->
        <div class="grid grid-cols-3 gap-2 border-t border-gray-800/80 pt-4 text-center">
          <div>
            <div class="font-serif italic text-sm text-cyan-400 mb-0.5">Bhargav</div>
            <div class="text-[10px] font-bold text-white">Bhargav</div>
            <div class="text-[9px] text-gray-500">Lead Web Developer</div>
          </div>
          <div>
            <div class="font-serif italic text-sm text-purple-400 mb-0.5">Bhavesh</div>
            <div class="text-[10px] font-bold text-white">Bhavesh</div>
            <div class="text-[9px] text-gray-500">Lead Web Designer</div>
          </div>
          <div>
            <div class="font-serif italic text-sm text-emerald-400 mb-0.5">Siva</div>
            <div class="text-[10px] font-bold text-white">Siva</div>
            <div class="text-[9px] text-gray-500">Sales Mediator</div>
          </div>
        </div>
      </div>

      <!-- Action: Print / Save -->
      <div class="flex justify-between items-center mt-5">
        <span class="text-xs text-gray-400">Direct Support: +91 9703281549</span>
        <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2">
          <i class="fa-solid fa-print"></i>
          <span>Print / Save Certificate PDF</span>
        </button>
      </div>
    </div>
  </div>

  <!-- AUTH MODAL -->
  <div id="authModal" class="hidden fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl">
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-xl font-bold text-white">Portal Authentication</h3>
        <button onclick="closeModal('authModal')" class="text-gray-400 hover:text-white text-xl">&times;</button>
      </div>
      <div class="flex border-b border-gray-800 mb-5">
        <button id="custTabBtn" onclick="setAuthTab('customer')" class="flex-1 py-2 font-bold text-xs text-indigo-400 border-b-2 border-indigo-500">Customer Portal</button>
        <button id="ownerTabBtn" onclick="setAuthTab('owner')" class="flex-1 py-2 font-bold text-xs text-gray-400 border-b-2 border-transparent">Owner (Admin)</button>
      </div>
      <form id="customerLoginForm" onsubmit="handleCustomerAuth(event)" class="space-y-4">
        <div>
          <label class="block text-xs text-gray-400 mb-1">Customer Name</label>
          <input type="text" id="authName" required placeholder="e.g. Ramesh Kumar" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white">
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">Phone Number</label>
          <input type="tel" id="authPhone" required placeholder="+91 9876543210" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white">
        </div>
        <button type="submit" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg transition">Enter Customer Portal</button>
      </form>
      <form id="ownerLoginForm" onsubmit="handleOwnerAuth(event)" class="space-y-4 hidden">
        <div>
          <label class="block text-xs text-gray-400 mb-1">Password</label>
          <input type="password" id="authPass" required placeholder="Enter password" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white">
        </div>
        <button type="submit" class="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-lg transition">Access Portal</button>
      </form>
    </div>
  </div>

  <!-- APPOINTMENT STRATEGY MODAL -->
  <div id="appointmentModal" class="hidden fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="glass-panel max-w-md w-full p-6 rounded-3xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-white">Book Strategy Call</h3>
        <button onclick="closeModal('appointmentModal')" class="text-gray-400 hover:text-white text-xl">&times;</button>
      </div>
      <form onsubmit="handleAppointmentSubmit(event)" class="space-y-4">
        <div>
          <label class="block text-xs text-gray-400 mb-1">Your Name</label>
          <input type="text" id="appCustName" required placeholder="Full Name" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white">
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">WhatsApp Phone</label>
          <input type="tel" id="appCustPhone" required placeholder="+91 9876543210" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white">
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">Project Inquiry / Topic</label>
          <input type="text" id="appTopic" required value="Custom Website Consultation" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white">
        </div>
        <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>Schedule on WhatsApp (+91 9703281549)</span>
        </button>
      </form>
    </div>
  </div>

  <!-- JAVASCRIPT LOGIC & ENGINE -->
  <script>
    const WHATSAPP_PHONE = "919703281549";

    // Strict Uniform Pricing Packages (₹10,000 - ₹18,000)
    let DEFAULT_PLANS = [
      { id: 'basic', title: 'Basic / Portfolio Website', price: 10000, duration: '2-3 Days', category: 'Portfolio', features: ['Single-Page High Conversion', '100% Mobile Ready', '6 Months Free Warranty', 'WhatsApp Direct Integration'] },
      { id: 'business', title: 'Business / Corporate Website', price: 12000, duration: '4-5 Days', category: 'Corporate', popular: true, features: ['Up to 5 Custom Pages', 'SEO & Speed Optimized', '6 Months Free Warranty', 'Domain & Lead Funnel'] },
      { id: 'ecommerce', title: 'E-Commerce Website', price: 14000, duration: '6-8 Days', category: 'E-Commerce', features: ['Product Catalog', 'Razorpay & UPI Gateway', 'Shopping Cart & Checkout', '6 Months Free Warranty'] },
      { id: 'custom', title: 'Custom AI / Dynamic Web App', price: 18000, duration: '10-14 Days', category: 'Web App', features: ['Custom Database & API', 'User Authentication', 'AI Assistant Integration', '6 Months Free Warranty'] }
    ];

    let DEFAULT_PORTFOLIO = [
      { id: 'p1', title: 'Nexus Cloud SaaS Platform', category: 'Corporate & SaaS', price: 12000, rating: 4.9, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80', liveDemoUrl: 'https://example.com/demo/nexus', desc: 'High-tech SaaS landing page with responsive cards and lead capture.' },
      { id: 'p2', title: 'Aura Luxury Apparel Boutique', category: 'E-Commerce', price: 14000, rating: 5.0, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80', liveDemoUrl: 'https://example.com/demo/aura', desc: 'Curated fashion e-commerce storefront with product cart and instant checkout.' },
      { id: 'p3', title: 'Savorio Fine Italian Trattoria', category: 'Portfolio & Hospitality', price: 10000, rating: 4.8, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', liveDemoUrl: 'https://example.com/demo/savorio', desc: 'Hospitality showcase with digital menus, table reservation, and WhatsApp booking.' },
      { id: 'p4', title: 'Apex Prime Real Estate & Villas', category: 'Corporate & Real Estate', price: 12000, rating: 4.9, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80', liveDemoUrl: 'https://example.com/demo/apex', desc: 'Property showcase platform with interactive floor plans and lead forms.' },
      { id: 'p5', title: 'Pulse 24/7 Fitness Club', category: 'Portfolio & Health', price: 10000, rating: 4.9, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80', liveDemoUrl: 'https://example.com/demo/pulse', desc: 'Fitness studio with schedules, trainer rosters, and trial passes.' },
      { id: 'p6', title: 'NeuroGen AI Prompt Studio', category: 'Custom Web App', price: 18000, rating: 5.0, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', liveDemoUrl: 'https://example.com/demo/neuro', desc: 'Modern AI-powered SaaS with tokens, dark dashboard, and database persistence.' }
    ];

    // State Variables
    let plans = JSON.parse(localStorage.getItem('bs_standalone_plans') || 'null') || DEFAULT_PLANS;
    let portfolio = JSON.parse(localStorage.getItem('bs_standalone_portfolio') || 'null') || DEFAULT_PORTFOLIO;
    let customLogo = localStorage.getItem('bs_standalone_logo') || null;
    let currentCustomer = JSON.parse(localStorage.getItem('bs_customer') || 'null');
    let isOwnerMode = false;
    let isMobileMenuOpen = false;

    // SVG Default Logo Generator
    function getFallbackSvgLogo(sizeClass = 'w-10 h-10') {
      return \`<div class="\${sizeClass} rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
        <div class="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
          <svg class="w-6 h-6 text-cyan-400 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M7 7h10"></path>
            <path d="M7 12h10"></path>
            <path d="M7 17h10"></path>
          </svg>
        </div>
      </div>\`;
    }

    // Render Logos in Header and Certificate
    function renderLogos() {
      const headerContainer = document.getElementById('headerLogoContainer');
      const certContainer = document.getElementById('certLogoContainer');
      const ownerPreview = document.getElementById('ownerLogoPreview');
      const resetBtn = document.getElementById('resetLogoBtn');

      let logoHtml = '';
      if(customLogo) {
        logoHtml = \`<img src="\${customLogo}" alt="BS Websites Logo" class="w-10 h-10 object-cover rounded-2xl border border-cyan-500/40 shadow-lg">\`;
        if(resetBtn) resetBtn.classList.remove('hidden');
      } else {
        logoHtml = getFallbackSvgLogo('w-10 h-10');
        if(resetBtn) resetBtn.classList.add('hidden');
      }

      if(headerContainer) headerContainer.innerHTML = logoHtml;
      if(certContainer) certContainer.innerHTML = logoHtml;
      if(ownerPreview) ownerPreview.innerHTML = customLogo ? \`<img src="\${customLogo}" class="w-16 h-16 object-cover rounded-2xl border border-cyan-500">\` : getFallbackSvgLogo('w-16 h-16');
    }

    // Owner Logo Upload (FileReader Base64)
    function handleOwnerLogoUpload(e) {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        customLogo = evt.target.result;
        localStorage.setItem('bs_standalone_logo', customLogo);
        renderLogos();
        alert('Custom business logo updated successfully across the site!');
      };
      reader.readAsDataURL(file);
    }

    function resetOwnerLogo() {
      if(confirm('Reset back to Cyber Circuit SVG Logo?')) {
        customLogo = null;
        localStorage.removeItem('bs_standalone_logo');
        renderLogos();
      }
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
      isMobileMenuOpen = !isMobileMenuOpen;
      const dropdown = document.getElementById('mobileMenuDropdown');
      const icon = document.getElementById('mobileMenuIcon');
      if(isMobileMenuOpen) {
        dropdown.classList.remove('hidden');
        icon.className = "fa-solid fa-xmark text-red-400";
      } else {
        dropdown.classList.add('hidden');
        icon.className = "fa-solid fa-bars text-indigo-400";
      }
    }

    // Open/Close Modals
    function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
    function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
    
    function openOrderModal(type) {
      if(type) document.getElementById('orderWebsiteType').value = type;
      if(currentCustomer) {
        document.getElementById('orderCustName').value = currentCustomer.name;
        document.getElementById('orderCustPhone').value = currentCustomer.phone;
      }
      openModal('orderModal');
    }

    function openWarrantyModal() {
      if(!document.getElementById('certDate').value) {
        document.getElementById('certDate').value = new Date().toISOString().slice(0, 10);
      }
      if(currentCustomer) {
        document.getElementById('certCustName').value = currentCustomer.name;
      }
      updateWarrantyCard();
      openModal('warrantyModal');
    }

    function updateWarrantyCard() {
      const custName = document.getElementById('certCustName').value.trim() || 'Valued Customer';
      const webName = document.getElementById('certWebName').value.trim() || 'Custom Commercial Website';
      const dateVal = document.getElementById('certDate').value;
      
      document.getElementById('certCardClient').innerText = custName;
      document.getElementById('certCardProject').innerText = webName;
      
      const purchaseDate = dateVal ? new Date(dateVal) : new Date();
      document.getElementById('certCardStart').innerText = purchaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      
      const expiryDate = new Date(purchaseDate);
      expiryDate.setMonth(expiryDate.getMonth() + 6);
      document.getElementById('certCardEnd').innerText = expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function openAuthModal() { openModal('authModal'); }
    function openAppointmentModal(topic) {
      if(topic) document.getElementById('appTopic').value = topic;
      if(currentCustomer) {
        document.getElementById('appCustName').value = currentCustomer.name;
        document.getElementById('appCustPhone').value = currentCustomer.phone;
      }
      openModal('appointmentModal');
    }

    function setAuthTab(tab) {
      if(tab === 'customer') {
        document.getElementById('customerLoginForm').classList.remove('hidden');
        document.getElementById('ownerLoginForm').classList.add('hidden');
        document.getElementById('custTabBtn').className = "flex-1 py-2 font-bold text-xs text-indigo-400 border-b-2 border-indigo-500";
        document.getElementById('ownerTabBtn').className = "flex-1 py-2 font-bold text-xs text-gray-400 border-b-2 border-transparent";
      } else {
        document.getElementById('customerLoginForm').classList.add('hidden');
        document.getElementById('ownerLoginForm').classList.remove('hidden');
        document.getElementById('ownerTabBtn').className = "flex-1 py-2 font-bold text-xs text-purple-400 border-b-2 border-purple-500";
        document.getElementById('custTabBtn').className = "flex-1 py-2 font-bold text-xs text-gray-400 border-b-2 border-transparent";
      }
    }

    function togglePortalMode() {
      isOwnerMode = !isOwnerMode;
      document.getElementById('customerView').style.display = isOwnerMode ? 'none' : 'block';
      document.getElementById('ownerView').style.display = isOwnerMode ? 'block' : 'none';
      document.getElementById('desktopPortalLabel').innerText = isOwnerMode ? 'Customer Website View' : 'Owner Portal / Login';
      if(isOwnerMode) {
        renderOwnerPortfolio();
        renderLogos();
      }
    }

    // Customer Authentication
    function handleCustomerAuth(e) {
      e.preventDefault();
      const name = document.getElementById('authName').value.trim();
      const phone = document.getElementById('authPhone').value.trim();
      currentCustomer = { name, phone };
      localStorage.setItem('bs_customer', JSON.stringify(currentCustomer));
      closeModal('authModal');
      alert('Welcome, ' + name + '! Customer Portal Active.');
    }

    // Owner Authentication
    function handleOwnerAuth(e) {
      e.preventDefault();
      const pass = document.getElementById('authPass').value.trim();
      if(pass === 'BBS') {
        closeModal('authModal');
        togglePortalMode();
      } else {
        alert('Invalid Password');
      }
    }

    // 5. ORDER SUBMISSION (Exact Prompt WhatsApp Message Format + Logo info)
    function handleOrderSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('orderCustName').value.trim();
      const phone = document.getElementById('orderCustPhone').value.trim();
      const type = document.getElementById('orderWebsiteType').value;
      const prefRadios = document.getElementsByName('priceOption');
      let pref = 'Fixed Price';
      for(const r of prefRadios) { if(r.checked) pref = r.value; }

      const logoInput = document.getElementById('orderLogoInput');
      const hasLogo = logoInput && logoInput.files.length > 0 ? 'Logo file ready' : 'Will share / Need design';

      const message = "Hi BS Websites! I want to order a website. Name: " + name + ", Phone: " + phone + ", Website Type: " + type + ", Pricing Preference: " + pref + ", Logo: " + hasLogo + ".";
      const url = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(message);
      window.open(url, '_blank');
      closeModal('orderModal');
    }

    // Appointment Submit
    function handleAppointmentSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('appCustName').value.trim();
      const phone = document.getElementById('appCustPhone').value.trim();
      const topic = document.getElementById('appTopic').value.trim();
      const message = "Hi BS Websites! Name: " + name + ", Phone: " + phone + ". I would like to book a consultation regarding: " + topic + ".";
      const url = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(message);
      window.open(url, '_blank');
      closeModal('appointmentModal');
    }

    // 4. FIX DELETE FUNCTIONALITY (Immediate DOM re-render & immediate localStorage save)
    function deletePortfolioItem(id) {
      if(confirm('Are you sure you want to delete this showcase website?')) {
        portfolio = portfolio.filter(p => p.id !== id);
        localStorage.setItem('bs_standalone_portfolio', JSON.stringify(portfolio));
        renderPortfolio();
        renderOwnerPortfolio();
      }
    }

    // 4. LOCAL FILE UPLOAD (FileReader Base64) & DYNAMIC WEBSITE ADDITION
    function handleAddNewPortfolio(e) {
      e.preventDefault();
      const title = document.getElementById('newTitle').value.trim();
      const category = document.getElementById('newCategory').value;
      const price = Number(document.getElementById('newPrice').value);
      const demoUrl = document.getElementById('newDemoUrl').value.trim();
      const desc = document.getElementById('newDesc').value.trim();
      const fileInput = document.getElementById('newImageFile');

      if(price < 10000 || price > 18000) {
        alert('Price must be strictly in the range of ₹10,000 to ₹18,000.');
        return;
      }

      function saveItem(imgBase64) {
        const newItem = {
          id: 'p-' + Date.now(),
          title,
          category,
          price,
          rating: 5.0,
          image: imgBase64 || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
          liveDemoUrl: demoUrl,
          desc
        };
        portfolio.unshift(newItem);
        localStorage.setItem('bs_standalone_portfolio', JSON.stringify(portfolio));
        renderPortfolio();
        renderOwnerPortfolio();
        document.getElementById('addPortfolioForm').reset();
        alert('Showcase website added successfully with local image!');
      }

      const file = fileInput.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          saveItem(evt.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        saveItem('');
      }
    }

    // Render Plans (Uniform Pricing ₹10,000 - ₹18,000)
    function renderPlans() {
      const container = document.getElementById('plansGrid');
      container.innerHTML = plans.map(p => \`
        <div class="rounded-3xl bg-gray-900 border \${p.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/20' : 'border-gray-800'} p-6 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">\${p.category}</span>
              \${p.popular ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Popular</span>' : ''}
            </div>
            <h4 class="text-lg font-bold text-white mb-1">\${p.title}</h4>
            <div class="my-4 pb-4 border-b border-gray-800">
              <div class="text-3xl font-black text-white">₹\${p.price.toLocaleString('en-IN')}</div>
              <div class="text-xs text-emerald-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> \${p.duration}</div>
            </div>
            <ul class="space-y-2 text-xs text-gray-300 mb-6">
              \${p.features.map(f => \`<li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i><span>\${f}</span></li>\`).join('')}
            </ul>
          </div>
          <div class="space-y-2 pt-3 border-t border-gray-800">
            <button onclick="openOrderModal('\${p.title}')" class="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition">
              Order Package
            </button>
            <button onclick="openAppointmentModal('\${p.title}')" class="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-medium transition">
              Book Appointment
            </button>
          </div>
        </div>
      \`).join('');
    }

    // Render Portfolio:
    // - NO "Buy Now" button
    // - "Visit Website Now" button with target="_blank"
    // - "Book Appointment / Contact" button
    function renderPortfolio() {
      const container = document.getElementById('portfolioGrid');
      container.innerHTML = portfolio.map(item => \`
        <div class="rounded-3xl bg-gray-900 border border-gray-800 overflow-hidden flex flex-col justify-between card-hover">
          <div>
            <div class="relative h-48 w-full bg-gray-950 overflow-hidden">
              <img src="\${item.image}" alt="\${item.title}" class="w-full h-full object-cover">
              <div class="absolute top-3 left-3 bg-gray-900/90 px-2.5 py-0.5 rounded-lg text-xs font-medium text-white border border-gray-700">
                \${item.category}
              </div>
              <div class="absolute top-3 right-3 bg-gray-900/90 px-2.5 py-0.5 rounded-lg text-xs font-bold text-amber-300 border border-amber-500/30">
                <i class="fa-solid fa-star text-amber-400 mr-1"></i>\${item.rating}
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start gap-2 mb-2">
                <h4 class="font-bold text-white text-base">\${item.title}</h4>
                <span class="font-extrabold text-emerald-400 text-sm">₹\${item.price.toLocaleString('en-IN')}</span>
              </div>
              <p class="text-xs text-gray-400 line-clamp-2 mb-4">\${item.desc}</p>
            </div>
          </div>
          <!-- ACTIONS: "Visit Website Now" (target="_blank") & "Contact / Book" (WhatsApp) -->
          <div class="p-6 pt-0 border-t border-gray-800/80 mt-2">
            <div class="grid grid-cols-2 gap-2.5 pt-4">
              <a href="\${item.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition">
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                <span>Visit Website Now</span>
              </a>
              <button onclick="openAppointmentModal('\${item.title}')" class="py-2.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white font-semibold text-xs border border-gray-700 transition flex items-center justify-center gap-1.5">
                <i class="fa-regular fa-calendar-check text-emerald-400"></i>
                <span>Contact / Book</span>
              </button>
            </div>
          </div>
        </div>
      \`).join('');
    }

    // Render Owner Dashboard Portfolio with Working Delete
    function renderOwnerPortfolio() {
      const container = document.getElementById('ownerPortfolioGrid');
      if(!container) return;
      container.innerHTML = portfolio.map(item => \`
        <div class="rounded-3xl bg-gray-900 border border-gray-800 p-4 flex flex-col justify-between">
          <div class="flex items-center gap-3 mb-3">
            <img src="\${item.image}" class="w-16 h-12 object-cover rounded-xl border border-gray-700">
            <div class="truncate">
              <h4 class="font-bold text-white text-xs truncate">\${item.title}</h4>
              <span class="text-emerald-400 font-extrabold text-xs">₹\${item.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-gray-800 text-xs">
            <a href="\${item.liveDemoUrl}" target="_blank" class="text-indigo-400 hover:underline flex items-center gap-1">
              <span>Test Demo</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
            <!-- Working Delete Button -->
            <button type="button" onclick="deletePortfolioItem('\${item.id}')" class="text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 px-2.5 py-1 rounded-lg transition border border-red-800/40">
              <i class="fa-solid fa-trash-can mr-1"></i> Delete
            </button>
          </div>
        </div>
      \`).join('');
    }

    // Initialization
    window.onload = function() {
      renderLogos();
      renderPlans();
      renderPortfolio();
      updateWarrantyCard();
    };
  </script>
</body>
</html>`;
}

import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  Calendar, 
  ArrowUpRight, 
  Sparkles,
  Eye,
  Check,
  Globe
} from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioShowcaseProps {
  portfolio: PortfolioItem[];
  onBookAppointment: (itemTitle: string) => void;
  onPreviewLiveDemo: (item: PortfolioItem) => void;
  onOrderWebsite?: (defaultType?: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  portfolio,
  onBookAppointment,
  onPreviewLiveDemo,
  onOrderWebsite,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Corporate & SaaS', 'E-Commerce', 'Portfolio & Hospitality', 'Custom Web App'];

  const filteredItems = activeCategory === 'All'
    ? portfolio
    : portfolio.filter(item => 
        item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        activeCategory.toLowerCase().includes(item.category.toLowerCase())
      );

  return (
    <section id="portfolio" className="py-20 bg-[#090D16] border-t border-b border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Live Work & Verified Demos
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Website Showcase & Designs
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mt-2">
              Explore recent projects engineered by Bhargav, designed by Bhavesh, and guided by Siva. Click "Visit Website Now" to test live interactive demos in a new tab.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-gray-900/70 border border-gray-800/90 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md"
            >
              <div>
                {/* Image Mockup with Hover Overlay */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md border border-gray-700/80 px-3 py-1 rounded-lg text-xs font-medium text-white shadow-sm">
                    {item.category}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-amber-300 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-[10px]">({item.reviewsCount})</span>
                  </div>

                  {/* Quick Action Hover Bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2">
                    <a
                      href={item.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-sm transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Visit Website Now</span>
                    </a>
                    <button
                      onClick={() => onPreviewLiveDemo(item)}
                      className="py-2 px-3 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1 transition"
                      title="Inspect Responsive Simulator"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Title and Uniform Price Tag (₹10,000 - ₹18,000) */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
                      {item.title}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-gray-500 block uppercase font-semibold">Standard Rate</span>
                      <span className="text-lg font-black text-emerald-400">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-4">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300">
                        <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-gray-800/80 text-gray-400 text-[10px] font-medium border border-gray-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: "Visit Website Now" (New Tab) & "Book Appointment / Contact" (WhatsApp) */}
              <div className="p-6 pt-0 border-t border-gray-800/80 mt-2 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5 pt-4">
                  {/* "Visit Website Now" opening in a NEW browser tab */}
                  <a
                    href={item.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition group/btn"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Visit Website Now</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100 transition" />
                  </a>

                  {/* "Book Appointment / Contact" sending WhatsApp message */}
                  <button
                    onClick={() => onBookAppointment(item.title)}
                    className="py-2.5 px-3 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white font-semibold text-xs border border-gray-700 transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Book Appointment</span>
                  </button>
                </div>

                {/* "Order Website" opens the modal with pricing */}
                {onOrderWebsite && (
                  <button
                    onClick={() => onOrderWebsite(item.category)}
                    className="w-full py-2 px-3 rounded-xl bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 hover:text-white font-bold text-xs border border-indigo-700/50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Order Website (Starts ₹{item.price.toLocaleString('en-IN')})</span>
                  </button>
                )}

                <button
                  onClick={() => onPreviewLiveDemo(item)}
                  className="w-full text-center text-xs text-gray-400 hover:text-indigo-300 transition py-1 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Interactive Architecture Preview</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

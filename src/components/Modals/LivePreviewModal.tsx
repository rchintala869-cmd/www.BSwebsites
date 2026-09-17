import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  ShoppingCart, 
  Calendar, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PortfolioItem } from '../../types';

interface LivePreviewModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onBuy: (item: PortfolioItem) => void;
  onBook: (title: string) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  item,
  onClose,
  onBuy,
  onBook,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
              BS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {item.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Starting at <strong className="text-emerald-400">₹{item.price.toLocaleString('en-IN')}</strong> • Verified Client Project
              </p>
            </div>
          </div>

          {/* Device toggle and Close */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex rounded-xl bg-gray-900 p-1 border border-gray-800">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-lg transition ${
                  deviceView === 'desktop' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-1.5 rounded-lg transition ${
                  deviceView === 'tablet' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Tablet view"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-lg transition ${
                  deviceView === 'mobile' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <a
              href={item.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition"
            >
              <span>Open Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0B0F19]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Preview Screen Simulator */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center">
              <div 
                className={`transition-all duration-300 w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl relative ${
                  deviceView === 'mobile'
                    ? 'max-w-[340px] aspect-[9/16]'
                    : deviceView === 'tablet'
                    ? 'max-w-[560px] aspect-[4/3]'
                    : 'w-full aspect-[16/10]'
                }`}
              >
                {/* Browser top pill */}
                <div className="h-7 bg-gray-900 border-b border-gray-800 px-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono truncate max-w-[200px]">
                    https://bswebsites.com/demo/{item.id}
                  </div>
                  <div className="w-4"></div>
                </div>

                {/* Simulated site image with interactive overlay */}
                <div className="h-[calc(100%-28px)] overflow-y-auto relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full object-cover object-top"
                  />
                  <div className="p-6 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent absolute bottom-0 inset-x-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white mb-0.5">{item.title}</div>
                        <div className="text-[11px] text-gray-400">Engineered by BS Websites</div>
                      </div>
                      <a
                        href={item.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                      >
                        Launch Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information & Action Panel */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{item.rating.toFixed(1)} / 5.0</span>
                    <span className="text-gray-500 font-normal text-xs">({item.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Ready to Deploy
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Architecture Highlights */}
                <div className="mb-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Project Highlights & Capabilities:
                  </h5>
                  <ul className="space-y-2">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Tags */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Technologies Used:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Checkout Triggers */}
              <div className="pt-6 border-t border-gray-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-400">Customization & Source:</span>
                  <span className="text-2xl font-black text-white">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBuy(item);
                    }}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Order Similar Custom Site</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onBook(item.title);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Book Strategy Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

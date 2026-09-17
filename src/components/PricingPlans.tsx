import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShoppingCart, 
  Calendar, 
  Clock, 
  ArrowRight,
  Zap,
  Building2,
  Layout
} from 'lucide-react';
import { WebsitePlan } from '../types';

interface PricingPlansProps {
  plans: WebsitePlan[];
  onBuyPlan: (plan: WebsitePlan) => void;
  onBookAppointment: (planTitle: string) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({
  plans,
  onBuyPlan,
  onBookAppointment,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'Layout':
      default:
        return <Layout className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="packages" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Transparent Market Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Website Plans & Packages
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Choose the ideal foundation for your business. Every package includes full source code, lifetime domain assistance, and direct developer communication.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-gray-900 via-indigo-950/40 to-gray-900 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-500/20 md:-translate-y-2'
                    : 'bg-gray-900/70 border border-gray-800 hover:border-gray-700 hover:shadow-xl hover:shadow-black/40'
                } p-6 sm:p-7 backdrop-blur-md`}
              >
                {/* Popular / Best Value Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" />
                    Most Popular & Recommended
                  </div>
                )}

                <div>
                  {/* Top Category & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-800/90 border border-gray-700 flex items-center justify-center">
                      {getIcon(plan.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">
                      {plan.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-1.5">{plan.title}</h3>
                  <p className="text-xs text-gray-400 min-h-[36px] mb-5 leading-relaxed">
                    {plan.subtitle}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      {plan.originalPrice > plan.price && (
                        <span className="text-sm font-semibold text-gray-500 line-through">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{plan.duration}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-indigo-300">One-time payment</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      What's Included:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-400">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interaction Buttons (Buy Now & Book Appointment) */}
                <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                  <button
                    onClick={() => onBuyPlan(plan)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-white text-gray-950 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onBookAppointment(plan.title)}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gray-800 border border-gray-700/80 transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Book Appointment / Contact</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Note */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-900/50 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-base mb-1">
              Need a completely bespoke enterprise solution?
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm">
              We engineer custom APIs, real-time inventory tools, booking engines, and AI workflow tools.
            </p>
          </div>
          <button
            onClick={() => onBookAppointment('Bespoke Enterprise Web Solution')}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
};

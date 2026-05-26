import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, X } from 'lucide-react';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{ name: string; price: string } | null>(null);

  const plans = [
    {
      alias: 'Free',
      title: 'Free',
      priceMonthly: 'Free',
      priceYearly: 'Free',
      description: 'For creators taking their first steps with Forma.',
      features: [
        'Up to 3 projects in the cloud',
        'Image export up to 1080p',
        'Basic editing tools',
        'Free templates and icons',
        'Access via web and mobile app'
      ]
    },
    {
      alias: 'Standard',
      title: 'Standard',
      priceMonthly: '$199/m',
      priceYearly: '$599/y',
      description: 'For freelancers and small teams who need more freedom and flexibility.',
      features: [
        'Up to 50 projects in the cloud',
        'Export up to 4K',
        'Advanced editing toolkit',
        'Team collaboration (up to 5 members)',
        'Access to premium template library'
      ]
    },
    {
      alias: 'Pro',
      title: 'Pro',
      priceMonthly: '$299/m',
      priceYearly: '$799/y',
      description: 'For studios, agencies, and professional creators working with brands.',
      features: [
        'Unlimited projects',
        'Export up to 8K + animations',
        'AI-powered content generation tools',
        'Unlimited team members',
        'Brand customization'
      ],
      isPopular: true
    }
  ];

  const handleSelectPlan = (name: string, price: string) => {
    setSelectedPlanDetails({ name, price });
  };

  return (
    <section className="c3-pricing-section select-none">
      {/* Embedded SVG filter representing c3-noise for the pricing watermark */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.075" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Watermark Section Backdrop */}
      <div className="c3-watermark-container pointer-events-none select-none">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your email.</span>
          <span className="c3-watermark-line-2">Revitalized</span>
        </div>
      </div>

      {/* Plan selection grid container */}
      <div className="c3-grid">
        {plans.map(plan => {
          const displayedPrice = isYearly ? plan.priceYearly : plan.priceMonthly;
          const isProCard = plan.alias === 'Pro';
          
          return (
            <div
              key={plan.alias}
              className={`c3-card ${isProCard ? 'c3-card-pro' : ''}`}
            >
              {/* Highlight popular pill */}
              {isProCard && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-[#3D81E3]/20 border border-[#3D81E3]/50 text-cyan-200 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Popular</span>
                </div>
              )}

              <span className="c3-tier-small">{plan.title}</span>
              <span className="c3-tier-large">{displayedPrice}</span>
              <p className="c3-desc">{plan.description}</p>
              
              <ul className="c3-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="c3-check">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.title, displayedPrice)}
                className="c3-btn"
              >
                Choose Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* Multi-tier toggle block bar */}
      <div className="c3-toggle-wrap">
        <span className="text-white/60 text-xs tracking-wide">Bill annually</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`c3-toggle ${isYearly ? 'active' : ''}`}
          aria-label="Toggle annual pricing"
        >
          <div className="c3-toggle-knob" />
        </button>
        {isYearly && (
          <span className="px-2 py-0.5 rounded bg-brand/20 text-brand text-[9px] uppercase tracking-wider font-semibold border border-brand/35 animate-bounce">
            Save up to 20%
          </span>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedPlanDetails && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-[24px] border border-white/10 bg-[#0e1014] p-6 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPlanDetails(null)}
                className="absolute top-4 right-4 rounded-full w-6 h-6 hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto text-brand mb-4">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">Confirm Vesper {selectedPlanDetails.name}</h3>
              <p className="text-xs text-white/50 mt-1">Starting your digital email revitalization loop.</p>

              <div className="my-5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-2xl font-bold text-white tracking-tight">{selectedPlanDetails.price}</span>
                <span className="text-[10px] text-white/40 block mt-1">Includes unlimited neural summaries & automatic routing.</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedPlanDetails(null);
                    alert(`Thank you for selecting the ${selectedPlanDetails.name} tier! Please configure Supabase variables inside Settings to activate billing integration.`);
                  }}
                  className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition duration-200 active:scale-95 cursor-pointer"
                >
                  Confirm and Upgrade
                </button>
                <button
                  onClick={() => setSelectedPlanDetails(null)}
                  className="w-full py-2 rounded-full border border-white/10 text-xs text-white/60 hover:text-white transition duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionEyebrow from './SectionEyebrow';
import { Check, Sparkles, Filter, ShieldCheck, Mail, RefreshCw } from 'lucide-react';

interface TriageGroup {
  id: string;
  title: string;
  count: number;
  textColor: string;
  items: string[];
}

export default function FeatureTriage() {
  const [activeChip, setActiveChip] = useState<string>('Auto-categorize');
  
  // Interactive mock simulation: user can "refresh" the triaged status to simulate live background processing trigger!
  const [isProcessing, setIsProcessing] = useState(false);
  const [triagedCount, setTriagedCount] = useState(42);

  const handleTriggerSimulation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTriagedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 1200);
  };

  const triageGroups: TriageGroup[] = [
    {
      id: 'priority',
      title: 'Priority',
      count: 4,
      textColor: '#ffffff',
      items: ['Sophia Chen — Q3 review', 'David Lim — contract signoff']
    },
    {
      id: 'followup',
      title: 'Follow-up',
      count: 7,
      textColor: '#e5e5e5',
      items: ['Marcus — design review', 'Figma — comment thread']
    },
    {
      id: 'updates',
      title: 'Updates',
      count: 18,
      textColor: '#a3a3a3',
      items: ['Vercel — deploy ready', 'GitHub — PR #482 merged']
    },
    {
      id: 'archived',
      title: 'Archived',
      count: 13,
      textColor: '#525252',
      items: ['Stripe payout · Newsletter · Receipts']
    }
  ];

  const chipFeatures = [
    { name: 'Auto-categorize', label: 'Semantic routers allocate incoming thread contexts instantly.' },
    { name: 'Snooze for later', label: 'Mute distracting notifications until you possess the clarity to respond.' },
    { name: 'Silent newsletters', label: 'Aggregates promotional broadcasts into non-disruptive digests.' },
    { name: 'One-tap unsubscribe', label: 'Permanently revoke newsletter headers via advanced proxy filters.' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 md:gap-16 items-start relative select-none">
      {/* Glow visual decoration */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand/5 blur-[120px] pointer-events-none z-0" />
      
      {/* Left Column: text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="space-y-6 z-10"
      >
        <SectionEyebrow label="Triage" tag="AI-native" />
        
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] text-white">
          Clear your inbox <br/> 
          <span className="text-white/60">in a single pass.</span>
        </h2>
        
        <p className="text-white/60 text-sm md:text-base leading-[1.6] max-w-md">
          Vesper reads every message, understands intent, and routes the noise away from the signal. Focus on what moves your day forward — the rest handles itself.
        </p>

        {/* Interactive Feature Description Chips */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {chipFeatures.map(chip => (
              <button
                key={chip.name}
                onClick={() => setActiveChip(chip.name)}
                className={`text-[11px] sm:text-xs text-white/70 px-3 py-1.5 rounded-full border cursor-pointer transition ${
                  activeChip === chip.name
                    ? 'border-brand bg-brand/10 text-white font-medium'
                    : 'border-white/10 bg-white/[0.03] hover:bg-white/5 hover:text-white'
                }`}
              >
                {chip.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeChip}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-brand/90 font-mono tracking-tight min-h-[30px]"
            >
              → {chipFeatures.find(f => f.name === activeChip)?.label}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Column: gorgeous interactive liquid-glass categorization sub-cards widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="liquid-glass rounded-2xl p-6 w-full shadow-2xl z-10 space-y-5 border border-white/[0.08]"
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider block">Vesper Intelligent Agent</h4>
            <span className="text-[11px] text-white/40 block mt-0.5">
              Today · {triagedCount} messages triaged successfully
            </span>
          </div>
          
          <button
            onClick={handleTriggerSimulation}
            disabled={isProcessing}
            title="Scan inbox"
            className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:text-white text-white/60 transition active:scale-95 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin text-brand' : ''}`} />
          </button>
        </div>

        {/* Categories rendering */}
        <div className="space-y-3">
          {triageGroups.map(group => (
            <div
              key={group.id}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition duration-300 relative group flex items-start justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: group.textColor }}
                  />
                  <span className="text-xs font-semibold text-white/90">{group.title}</span>
                  <span className="text-[10px] text-white/30 font-light">• {group.count} threads</span>
                </div>
                <div className="space-y-1 pt-1">
                  {group.items.map((item, idy) => (
                    <p key={idy} className="text-[11px] text-white/50 pl-3.5 leading-snug truncate max-w-xs md:max-w-md">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Status indicator badge */}
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Check className="w-3.5 h-3.5 text-brand" />
                <span className="font-mono">routed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative intelligence active banner */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-white/40 font-mono select-none">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
            <span>AI router: 99.8% precision rate</span>
          </div>
          <span>Active Session: Standby</span>
        </div>
      </motion.div>
    </section>
  );
}

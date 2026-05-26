import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Terminal,
  Briefcase,
  ChevronRight,
  Check,
  BookOpen,
  Send,
  Cpu,
  Layers,
  Shield,
  Activity,
  FileText,
  DollarSign,
  Search,
  ExternalLink,
  Code2
} from 'lucide-react';

interface SubPagesModalProps {
  page: 'blog' | 'documentation' | 'careers' | null;
  onClose: () => void;
}

export default function SubPagesModal({ page, onClose }: SubPagesModalProps) {
  // Common states
  const [activeTab, setActiveTab] = useState<string>('intro');
  
  // Blog-specific states
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [blogSearchTerm, setBlogSearchTerm] = useState('');

  // Docs-specific states
  const [selectedLang, setSelectedLang] = useState<'js' | 'go' | 'curl'>('js');
  const [docsSearchTerm, setDocsSearchTerm] = useState('');

  // Careers-specific states
  const [appliedJob, setAppliedJob] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResume, setApplicantResume] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (page) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [page]);

  if (!page) return null;

  // 1. BLOG CONTENT & ARTICLES
  const blogArticles = [
    {
      id: 1,
      title: "The Geometry of Inbox Zero",
      category: "Design",
      date: "May 24, 2026",
      readTime: "5 min read",
      summary: "Rethinking email triage via context-aware spatial grouping, semantic filtering, and cognitive ergonomics.",
      content: `Email has historically been structured as a single chronological list. This structure shifts the cognitive burden of sorting, prioritizing, and archiving entirely onto the human operator. At Vesper, we analyzed user behavior patterns and realized that 80% of mental fatigue stems from switching context between mismatched message categories.
      
      We introduced **Spatial Triage**. By grouping incoming conversations by high-level semantic intent (e.g., newsletters, transactional service logs, urgent personal alignments), you can process groups of messages with a singular mental frequency. This reduces context switching, leaving you with more energy for your actual creative work.
      
      Our interface pairs this grouping with minimal, high-refresh-rate layouts that respond to custom key bindings. It feels less like viewing a table and more like navigating a smooth physical trackpad canvas.`
    },
    {
      id: 2,
      title: "Zero-Latency Local Sync Engines",
      category: "Engineering",
      date: "May 18, 2026",
      readTime: "8 min read",
      summary: "How we built a local SQLite synchronization layer that communicates over secure TLS WebSockets.",
      content: `Traditional web-based email clients introduce severe performance latency because every mouse click, keystroke, or triage state change requires an active round-trip HTTP request to a distant server. 
      
      Vesper is designed with a **Local-First Sync Engine**. When you launch Vesper, a secure, lightweight local instance syncs and caches your index into an encrypted sqlite-compatible database. Any action you take—marking an email as resolved, applying a context label, drafting responses—takes effect in less than 4 milliseconds.
      
      A background synchronization process then streams state diffs to our edge server utilizing secure, multiplexed WebSockets. If your connection drops, Vesper continues running at peak performance. Once reconnected, state conflation is resolved gracefully.`
    },
    {
      id: 3,
      title: "Designing for the High-Agency Operator",
      category: "Product Philosophy",
      date: "May 10, 2026",
      readTime: "6 min read",
      summary: "Human interface guidelines focusing on fluid keyboard focus, customized hotkeys, and minimal command bars.",
      content: `The modern professional workspace is cluttered with low-quality visual inputs and notifications. In our pursuit of 'features', we have compromised flow. Designing for the high-agency operator means returning control to the hands of the user.
      
      Vesper relies on **Frictionless Keyboard Navigation**. Almost every function is accessible via an elegant command bar triggered with a simple hotkey. We avoided noisy tabs, heavy icons, and decorative system metrics. This provides a clean greeting and focus card layout.
      
      Our guidelines declare: typography is the interface. High-contrast type paired with balanced negative space helps users parse 30 emails in under 60 seconds with zero visual friction.`
    }
  ];

  // 2. DOCUMENTATION SCHEMAS
  const docSections = [
    {
      id: "quickstart",
      title: "Quickstart",
      items: [
        { title: "Introduction", detail: "Vesper is a context-aware email platform built for teams who value fast triage and zero cognitive noise. This guide will walk you through syncing your mail domains and sending your first message." },
        { title: "Installation", detail: "Vesper provides a robust CLI tool to configure local sync loops. Run: 'npm install -g @vesper/cli' inside your terminal." }
      ]
    },
    {
      id: "api",
      title: "Core API Methods",
      items: [
        { title: "Authenticate Client", detail: "Initialize authentication with your private project keys. Store these variables in your secure backends, never in client layers." },
        { title: "Fetch Triaged Stream", detail: "Query messages with pre-computed deep semantic scores: 'GET /api/v1/stream?triage=high'" }
      ]
    },
    {
      id: "security",
      title: "Security & PGP",
      items: [
        { title: "End-to-End Encryption", detail: "Vesper supports automatic public key discovery and seamless end-to-end PGP signing for external recipient secure flows." },
        { title: "Data Isolation Policies", detail: "All cached mail headers are encrypted at-rest using AES-256 with key files managed locally on your machine." }
      ]
    }
  ];

  const codeSnippets = {
    js: `import { VesperClient } from '@vesper/sdk';

const vesper = new VesperClient({
  apiKey: process.env.VESPER_SECRET_KEY,
  domain: 'company.com'
});

// Stream high-priority triaged messages
const stream = await vesper.stream.list({
  triage: 'focus',
  limit: 20
});

stream.forEach(msg => {
  console.log(\`[\${msg.category}] New thread from \${msg.sender.name}\`);
});`,
    go: `package main

import (
	"context"
	"fmt"
	"github.com/vesper/sdk-go"
)

func main() {
	client := vesper.NewClient("VESPER_SECRET_KEY")
	
	stream, _ := client.Stream().List(context.Background(), vesper.ListParams{
		Triage: "focus",
		Limit:  20,
	})
	
	for _, msg := range stream {
		fmt.Printf("[%s] Thread from %s\\n", msg.Category, msg.Sender.Name)
	}
}`,
    curl: `curl -X GET "https://api.vesper.run/v1/stream?triage=focus&limit=20" \\
  -H "Authorization: Bearer $VESPER_SECRET_KEY" \\
  -H "Content-Type: application/json"`
  };

  // 3. CAREERS POSITIONS
  const careersPositions = [
    {
      id: "context-eng",
      title: "Senior Context & Sync Engineer",
      team: "Core Architecture",
      location: "San Francisco, CA / Remote",
      compensation: "$190,000 – $250,000 · 0.20% Equity",
      description: "Own the local SQLite cache-invalidation structures, optimize edge WebSockets, and architect low-latency sync models matching 100k messages/min.",
      requirements: [
        "Expertise in Node.js, C++ or Rust systems design with persistent memory mappings.",
        "Deep understanding of transactional integrity, conflict-free replicated data types (CRDTs), and WebSocket streaming.",
        "Passionate about structural micro-optimizations (speed, byte compression)."
      ]
    },
    {
      id: "ui-designer",
      title: "Lead Interaction Designer",
      team: "Product & Layout",
      location: "New York, NY / Hybrid",
      compensation: "$160,000 – $210,000 · 0.15% Equity",
      description: "Refine Vesper's display dynamics, core keyboard focus ergonomics, canvas transitions, and customized typeface pairing models.",
      requirements: [
        "A stellar portfolio demonstrating custom micro-animations (Framer Motion, CSS, GSAP) and Swiss/minimal graphic sensibilities.",
        "Obsession with typography, density metrics, responsive bento flows, and high contrast states.",
        "Proficiency in turning Figma design layouts into immaculate, pixel-perfect frontend React models."
      ]
    },
    {
      id: "systems-architect",
      title: "Lead Security & Infrastructure Lead",
      team: "Systems & Security",
      location: "San Francisco, CA / Hybrid",
      compensation: "$180,000 – $240,000 · 0.18% Equity",
      description: "Manage end-to-end PGP infrastructure scaling, develop zero-trust multi-tenant isolation protocols, and supervise Kubernetes cluster loads.",
      requirements: [
        "5+ years of background in cloud security architecture (E2E PGP, HSM management).",
        "Experience configuring secure Envoy routing proxypatterns and automatic container autoscaling metrics.",
        "Willingness to act as the primary structural gatekeeper for absolute application resilience."
      ]
    }
  ];

  const handleApplyClick = (jobTitle: string) => {
    setAppliedJob(jobTitle);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      alert("Please enter both your name and email directory address.");
      return;
    }
    setFormSubmitted(true);
    // Clear form fields
    setApplicantResume('');
    setApplicantCover('');
  };

  return (
    <AnimatePresence>
      <div data-lenis-prevent="true" className="fixed inset-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Modal Outer Container */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#121212]/75 border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[85vh] max-h-[85vh]"
        >
          {/* Subtle top spotlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d2ff]/40 to-transparent pointer-events-none" />

          {/* Upper Action/Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141414]/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#00d2ff] font-semibold font-mono">
                Vesper Platform // {page === 'blog' ? 'Journal' : page === 'documentation' ? 'Developer Center' : 'Open Listings'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Content Frame */}
          <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6 md:p-10">

            {/* PAGE 1: BLOG / JOURNAL */}
            {page === 'blog' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                    Internal Journal
                  </h1>
                  <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                    Engineering, design philosophy, and human alignment principles written directly by the partners building Vesper.
                  </p>

                  {/* Blog Search */}
                  <div className="mt-6 relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Filter articles..."
                      value={blogSearchTerm}
                      onChange={(e) => {
                        setBlogSearchTerm(e.target.value);
                        setSelectedArticleId(null);
                      }}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d2ff]/50 transition"
                    />
                  </div>
                </div>

                {selectedArticleId ? (
                  // Expanded Article View
                  (() => {
                    const article = blogArticles.find(a => a.id === selectedArticleId);
                    if (!article) return null;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
                      >
                        <button
                          onClick={() => setSelectedArticleId(null)}
                          className="text-xs text-[#00d2ff] hover:underline font-mono inline-flex items-center gap-1.5 mb-6 cursor-pointer"
                        >
                          ← Back to journal
                        </button>
                        
                        <div className="space-y-4 mb-6">
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider font-mono uppercase bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/10">
                            {article.category}
                          </span>
                          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                            {article.title}
                          </h2>
                          <div className="flex items-center gap-4 text-xs font-mono text-white/30">
                            <span>{article.date}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        <div className="text-white/70 whitespace-pre-line text-sm md:text-base leading-[1.8] font-light space-y-4 max-w-3xl">
                          {article.content}
                        </div>
                      </motion.div>
                    );
                  })()
                ) : (
                  // Grid List view
                  (() => {
                    const filteredArticles = blogArticles.filter(article => 
                      article.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                      article.summary.toLowerCase().includes(blogSearchTerm.toLowerCase())
                    );

                    if (filteredArticles.length === 0) {
                      return (
                        <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-[#141414]/30">
                          <p className="text-white/40 text-sm mb-4">No journal entries found matching "{blogSearchTerm}"</p>
                          <button 
                            onClick={() => setBlogSearchTerm('')}
                            className="px-4 py-2 border border-white/15 hover:bg-white/5 active:scale-95 transition rounded-full text-xs font-medium cursor-pointer text-white"
                          >
                            Clear search filter
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredArticles.map((article) => (
                          <div
                            key={article.id}
                            onClick={() => setSelectedArticleId(article.id)}
                            className="group relative cursor-pointer p-6 rounded-2xl border border-white/[0.06] bg-[#141414]/30 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                                <span className="text-[#00d2ff]/80 font-semibold">{article.category}</span>
                                <span>{article.date}</span>
                              </div>
                              <h3 className="text-lg font-bold text-white group-hover:text-[#00d2ff] transition duration-200">
                                {article.title}
                              </h3>
                              <p className="text-xs text-white/50 leading-relaxed font-light line-clamp-3">
                                {article.summary}
                              </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/45 font-mono group-hover:text-white transition duration-200">
                              <span>{article.readTime}</span>
                              <span className="flex items-center gap-1">Read article <ChevronRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" /></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* PAGE 2: DOCUMENTATION */}
            {page === 'documentation' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="max-w-2xl mb-8">
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                    Developer Docs
                  </h1>
                  <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                    Integrate context-aware mail syncing structures directly into your build routines and command flows.
                  </p>

                  {/* Docs Search */}
                  <div className="mt-6 relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Search credentials & endpoints..."
                      value={docsSearchTerm}
                      onChange={(e) => setDocsSearchTerm(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d2ff]/50 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Doc Guides */}
                  <div className="lg:col-span-7 space-y-6">
                    {(() => {
                      const matchingSections = docSections.map(sect => {
                        const filteredItems = sect.items.filter(item => 
                          item.title.toLowerCase().includes(docsSearchTerm.toLowerCase()) ||
                          item.detail.toLowerCase().includes(docsSearchTerm.toLowerCase())
                        );
                        return { ...sect, items: filteredItems };
                      }).filter(sect => sect.items.length > 0);

                      if (matchingSections.length === 0) {
                        return (
                          <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-[#141414]/30 w-full">
                            <p className="text-white/40 text-sm mb-4">No documentation matches found for "{docsSearchTerm}"</p>
                            <button 
                              onClick={() => setDocsSearchTerm('')}
                              className="px-4 py-2 border border-white/15 hover:bg-white/5 active:scale-95 transition rounded-full text-xs font-medium cursor-pointer text-white"
                            >
                              Reset filters
                            </button>
                          </div>
                        );
                      }

                      return matchingSections.map((sect) => (
                        <div key={sect.id} className="space-y-3">
                          <h3 className="text-xs uppercase font-mono tracking-widest text-[#00d2ff] font-bold">
                            // {sect.title}
                          </h3>
                          <div className="space-y-4">
                            {sect.items.map((item, idx) => (
                              <div 
                                key={idx} 
                                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition"
                              >
                                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                  <Code2 className="w-4 h-4 text-white/40" />
                                  {item.title}
                                </h4>
                                <p className="text-xs text-white/50 leading-relaxed font-light">
                                  {item.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* Right Column: Code Playground */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0c]/80 overflow-hidden shadow-2xl">
                      
                      {/* Language Toggles */}
                      <div className="flex border-b border-white/5 bg-[#141414] px-4 py-2.5 items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-semibold">
                          <Terminal className="w-3.5 h-3.5" /> SDK Snippet
                        </span>
                        
                        <div className="flex bg-white/5 rounded-md p-0.5 border border-white/10">
                          {(['js', 'go', 'curl'] as const).map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setSelectedLang(lang)}
                              className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wide rounded-md transition ${
                                selectedLang === lang
                                  ? 'bg-white/10 text-white'
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Snippet Block */}
                      <pre className="p-5 font-mono text-xs text-white/80 leading-relaxed overflow-x-auto bg-[#070707] max-h-[350px]">
                        <code>
                          {codeSnippets[selectedLang]}
                        </code>
                      </pre>
                    </div>

                    <div className="p-5 rounded-xl border border-[#00d2ff]/10 bg-[#00d2ff]/[0.02] space-y-2">
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#00d2ff] font-mono">
                        <Activity className="w-3.5 h-3.5" /> API Sync Metrics
                      </span>
                      <p className="text-xs text-white/50 leading-normal font-light">
                        Default response latency to stream-update state arrays sits securely at <strong className="text-white">4ms</strong> with 99.98% delivery success rates across major data pipelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 3: CAREERS */}
            {page === 'careers' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                    Join Vesper
                  </h1>
                  <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                    We are engineering a premium context-aware digital workspace client. If your focus metrics are centered on craft, fast rendering, and cognitive flow, we want to build with you.
                  </p>
                </div>

                {appliedJob ? (
                  // Quick Job-Application form Modal
                  <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-[#161616]/40 p-6 md:p-8 relative">
                    
                    <button
                      onClick={() => setAppliedJob(null)}
                      className="text-xs text-[#00d2ff] hover:underline font-mono inline-flex items-center gap-1.5 mb-6 cursor-pointer"
                    >
                      ← Back to listings
                    </button>

                    {formSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-center py-8 space-y-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center mx-auto">
                          <Check className="w-6 h-6 text-[#00d2ff]" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Application Received</h3>
                        <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto">
                          Thanks, <span className="text-white font-medium">{applicantName}</span>. We've recorded your application parameters for the <span className="text-white font-medium">{appliedJob}</span> role. A partner will contact your directory inbox at <span className="text-white font-medium">{applicantEmail}</span> within 48 hours.
                        </p>
                        <button
                          onClick={() => setAppliedJob(null)}
                          className="mt-4 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs font-medium cursor-pointer text-white"
                        >
                          Keep viewing listings
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#00d2ff] font-bold">Applying For</span>
                          <h3 className="text-lg font-bold text-white leading-tight">{appliedJob}</h3>
                        </div>

                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase font-mono tracking-wide text-white/40">Full Name</label>
                              <input
                                required
                                type="text"
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                placeholder="Cassius Vance"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d2ff] transition"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase font-mono tracking-wide text-white/40">Email Address</label>
                              <input
                                required
                                type="email"
                                value={applicantEmail}
                                onChange={(e) => setApplicantEmail(e.target.value)}
                                placeholder="vance@example.com"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d2ff] transition"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-mono tracking-wide text-white/40">CV / Portfolio URL</label>
                            <input
                              required
                              type="url"
                              value={applicantResume}
                              onChange={(e) => setApplicantResume(e.target.value)}
                              placeholder="https://github.com/vance or https://vance.design"
                              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d2ff] transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-mono tracking-wide text-white/40">Briefly, why Vesper?</label>
                            <textarea
                              value={applicantCover}
                              onChange={(e) => setApplicantCover(e.target.value)}
                              rows={3}
                              placeholder="What elements of code craft or spatial typography resonate with you..."
                              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d2ff] transition resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full rounded-full bg-white text-black text-xs font-semibold py-3 transition hover:bg-white/90 active:scale-98 tracking-wide cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Send className="w-3.5 h-3.5" /> Apply directly
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  // Position Listings
                  <div className="space-y-6">
                    {careersPositions.map((pos) => (
                      <div
                        key={pos.id}
                        className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-[#141414]/30 hover:bg-white/[0.02] hover:border-white/12 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                      >
                        <div className="space-y-3.5 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#00d2ff] bg-[#00d2ff]/10 border border-[#00d2ff]/20 px-2.5 py-0.5 rounded">
                              {pos.team}
                            </span>
                            <span className="text-[10px] font-mono text-white/30">{pos.location}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white">{pos.title}</h3>
                          <p className="text-xs text-white/50 leading-relaxed font-light">{pos.description}</p>
                          
                          <div className="space-y-1 pt-1">
                            <span className="text-[9px] uppercase font-mono text-white/30 tracking-wide block">Initial Requirements:</span>
                            <ul className="list-none space-y-1">
                              {pos.requirements.map((req, rIdx) => (
                                <li key={rIdx} className="text-xs text-white/45 flex items-start gap-1.5 font-light">
                                  <span className="text-[#00d2ff]/80 mt-0.5">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-3.5 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-t-0">
                          <div className="text-xs font-mono text-[#00d2ff] font-bold md:text-right">
                            {pos.compensation}
                          </div>
                          <button
                            onClick={() => handleApplyClick(pos.title)}
                            className="w-full md:w-auto rounded-full bg-white text-black px-5 py-2.5 text-xs font-semibold hover:bg-white/80 active:scale-95 transition cursor-pointer text-center whitespace-nowrap"
                          >
                            Apply to roll
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

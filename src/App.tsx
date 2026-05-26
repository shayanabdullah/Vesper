import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
import {
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Command,
  ArrowRight,
  Code,
  Globe2,
  Lock,
  Layers,
  Database
} from 'lucide-react';

// Custom component imports
import LogoMark from './components/LogoMark';
import AppleLogo from './components/AppleLogo';
import AppleButton from './components/AppleButton';
import SectionEyebrow from './components/SectionEyebrow';
import InboxMockup from './components/InboxMockup';
import FeatureTriage from './components/FeatureTriage';
import PricingSection from './components/PricingSection';
import SubPagesModal from './components/SubPagesModal';

const navLinks = ['Solutions', 'Pricing', 'Blog', 'Documentation', 'Careers'];

const logos = [
  { name: 'Linear', delay: 0 },
  { name: 'Vercel', delay: 0.05 },
  { name: 'Figma', delay: 0.1 },
  { name: 'Stripe', delay: 0.15 },
  { name: 'Ramp', delay: 0.2 },
  { name: 'Notion', delay: 0.25 },
  { name: 'Loom', delay: 0.3 },
  { name: 'Arc', delay: 0.35 }
];

const testimonials = [
  {
    text: "Vesper gave our leadership team four hours of their week back. It reads like email from the future.",
    author: "Parker Wilf",
    role: "Group Product Manager",
    company: "MERCURY"
  },
  {
    text: "The command palette alone has changed how I process messages. I can't imagine going back to a traditional client.",
    author: "Andrew von Rosenbach",
    role: "Senior Engineering Program Manager",
    company: "COHERE"
  },
  {
    text: "Triage that actually understands context. Our team stopped dreading Monday morning inboxes.",
    author: "Mathies Christensen",
    role: "Engineering Manager",
    company: "LUNAR"
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePageModal, setActivePageModal] = useState<'blog' | 'documentation' | 'careers' | null>(null);
  const [downloadModalTarget, setDownloadModalTarget] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${dayName} ${monthName} ${dateNum} ${hours}:${minutes} ${ampm}`;
  });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHoveringTestimonial, setIsHoveringTestimonial] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-play interval for Testimonials - pauses on hover
  useEffect(() => {
    if (isHoveringTestimonial) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000); // Shorter, premium transition speed
    return () => clearInterval(timer);
  }, [isHoveringTestimonial]);

  // Set scrolled state for floating navbar transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync clock dynamically to match the premium macOS status indicator feel
  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      // Force format matching "Wed May 6 1:09 PM" but using current day if needed
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const dateNum = now.getDate();
      
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      
      return `${dayName} ${monthName} ${dateNum} ${hours}:${minutes} ${ampm}`;
    };

    setCurrentTime(formatTime());
    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000); // refresh every 1s
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll with Lenis and scroll animations with GSAP ScrollTrigger
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Update ScrollTrigger on Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis loop with GSAP ticker
    const gsapTickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Parallax background scaling
    gsap.fromTo('.parallax-bg',
      { scale: 1 },
      {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Dim the hero elements gracefully as the user scrolls
    gsap.to('.hero-scroll-dim', {
      opacity: 0.1,
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '500px top',
        scrub: true,
      },
    });

    // Testimonials card stagger reveal
    gsap.fromTo('.testimonial-carousel-wrap',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#blog',
          start: 'top 80%',
        },
      }
    );

    // Flat pricing cards stagger reveal
    gsap.fromTo('.c3-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#pricing',
          start: 'top 75%',
        },
      }
    );

    // Scroll progress line update
    gsap.to('.scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    filter: 'url(#c3-noise)'
  };

  const handleDownloadClick = () => {
    // Arbitrary target display trigger
    setDownloadModalTarget('Auto');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-brand/30">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-[#00d2ff] to-[#3D81E3] transform scale-x-0 origin-left z-50 pointer-events-none" />

      {/* 1. Global background video (fixed, behind everything) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="parallax-bg w-full h-full object-cover pointer-events-none brightness-[0.7] contrast-[1.05]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      {/* 2. Fixed Vertical Guides */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* 3. Global SVG noise filter at root level */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* SECTION 1: Navbar (Floating Rounded Capsule) */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ease-out ${
        scrolled ? 'scale-[0.98]' : 'scale-100'
      }`}>
        <header className={`w-full backdrop-blur-xl border transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-[#0c0c0c]/80 border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-2xl md:rounded-full' 
            : 'bg-[#0c0c0c]/40 border-white/[0.06] shadow-none rounded-2xl md:rounded-full'
        }`}>
          <div className={`px-5 transition-all duration-500 ease-out ${
            scrolled ? 'py-2.1 md:py-2.5' : 'py-3.5 md:py-4'
          }`}>
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center justify-between"
            >
              {/* Left: Branding LogoMark (No text word) */}
              <a href="#" className="text-white hover:text-cyan-200 transition active:scale-95 duration-200">
                <LogoMark className="w-8 h-8 filter drop-shadow-[0_0_12px_rgba(61,129,227,0.4)]" />
              </a>

              {/* Center Links (Desktop) */}
              <div className="hidden md:flex gap-8">
                {navLinks.map((link, i) => {
                  const val = link.toLowerCase();
                  const isModal = ['blog', 'documentation', 'careers'].includes(val);
                  return (
                    <motion.a
                      key={link}
                      href={isModal ? undefined : `#${val}`}
                      onClick={(e) => {
                        if (isModal) {
                          e.preventDefault();
                          setActivePageModal(val as any);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                      className="text-white/70 text-sm font-medium hover:text-white transition duration-200"
                    >
                      {link === 'Documentation' ? 'Docs' : link}
                    </motion.a>
                  );
                })}
              </div>

              {/* Right: Action Buttons */}
              <div className="hidden md:block">
                <AppleButton onClick={handleDownloadClick} label="Download Vesper" />
              </div>

              {/* Mobile menu trigger */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 active:scale-90 transition flex items-center justify-center cursor-pointer hover:bg-white/10 text-white"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </motion.nav>
          </div>
        </header>
      </div>

      {/* Interactive Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0c0c0c]/95 backdrop-blur-xl flex flex-col justify-between p-6"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <LogoMark className="w-8 h-8 text-white" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-5 pt-4">
                {navLinks.map((link, idx) => {
                  const val = link.toLowerCase();
                  const isModal = ['blog', 'documentation', 'careers'].includes(val);
                  return (
                    <motion.a
                      key={link}
                      href={isModal ? undefined : `#${val}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (isModal) {
                          setActivePageModal(val as any);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-2xl text-white/80 font-semibold hover:text-white transition"
                    >
                      {link === 'Documentation' ? 'Docs' : link}
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-4">
              <AppleButton onClick={handleDownloadClick} label="Download Vesper" full />
              <div className="text-center text-[10px] text-white/30 font-mono">
                System Platform Status: Production Ready · 3.5.0
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 2: Hero */}
      <section className="hero-scroll-dim relative z-10 max-w-6xl mx-auto px-6 pt-32 sm:pt-40 md:pt-44 pb-20 text-center flex flex-col items-center select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand/10 blur-[140px] pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          Your email.<br />
          <span className="animate-shiny select-none inline-block pb-2" style={gradientStyle}>
            Revitalized
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-white/60 max-w-md text-sm md:text-base leading-[1.6] px-4"
        >
          Vesper is the premier inbox platform for the current era. It leverages powerful AI to organize, prioritize, and refine your messages into total clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <AppleButton onClick={handleDownloadClick} label="Download Vesper for macOS" />
          <span className="text-xs text-white/40 font-mono tracking-tight select-none">
            Download for Intel / Apple Silicon
          </span>
        </motion.div>
      </section>

      {/* SECTION 3: macOS menu bar strip */}
      <motion.section
        initial={{ opacity: 0, scaleY: 0.9 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="relative z-20 w-full bg-black/45 backdrop-blur-md border-t border-b border-white/10 select-none cursor-default"
      >
        <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-between text-xs font-medium">
          {/* Left section menu */}
          <div className="flex items-center gap-4 text-white/90">
            <AppleLogo className="w-3.5 h-3.5 fill-white text-white opacity-90" />
            <span className="font-bold tracking-tight text-white">Vesper</span>
            <div className="flex items-center gap-3 text-white/60 font-mono text-[11px]">
              {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item, idx) => (
                <span
                  key={item}
                  className={`hover:text-white transition cursor-pointer ${
                    idx > 2 ? 'hidden sm:inline' : ''
                  } ${idx > 3 ? 'hidden md:inline' : ''}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right section metadata indicators */}
          <div className="flex items-center gap-4 text-white/50 font-mono text-[10px]">
            <Search className="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition cursor-pointer" />
            <span className="tracking-tighter select-all">{currentTime}</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: Inbox mockup */}
      <section id="solutions" className="relative z-20 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <InboxMockup />
        </motion.div>
      </section>

      {/* SECTION 5: FeatureTriage */}
      <FeatureTriage />

      {/* SECTION 6: LogoCloud (Infinite Carousel) */}
      <section className="relative z-10 py-16 md:py-20 text-center select-none border-t border-white/5 overflow-hidden">
        <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-10 px-6">
          Trusted by the world's most thoughtful teams
        </h3>
        
        {/* Infinite Horizontal Carousel Scroll */}
        <div className="relative w-full overflow-hidden flex items-center bg-black/20 py-4 border-y border-white/[0.03]">
          {/* Faders for soft edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-16 whitespace-nowrap text-sm font-semibold tracking-tight text-white/45">
            {/* First sequence */}
            {logos.map((logo, idx) => (
              <span
                key={`logo-1-${idx}`}
                className="hover:text-white transition duration-250 cursor-default uppercase font-mono px-4"
              >
                // {logo.name}
              </span>
            ))}
            {/* Second sequence for infinite wrapping loop */}
            {logos.map((logo, idx) => (
              <span
                key={`logo-2-${idx}`}
                className="hover:text-white transition duration-250 cursor-default uppercase font-mono px-4"
              >
                // {logo.name}
              </span>
            ))}
            {/* Third sequence for buffer stability */}
            {logos.map((logo, idx) => (
              <span
                key={`logo-3-${idx}`}
                className="hover:text-white transition duration-250 cursor-default uppercase font-mono px-4"
              >
                // {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Testimonials Carousel */}
      <section id="blog" className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
        <div className="text-center mb-12 space-y-4">
          <SectionEyebrow label="Feedback" tag="Global reviews" />
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mt-3">
            What operators are experiencing.
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div 
          onMouseEnter={() => setIsHoveringTestimonial(true)}
          onMouseLeave={() => setIsHoveringTestimonial(false)}
          className="testimonial-carousel-wrap relative liquid-glass rounded-2xl border border-white/[0.08] p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          {/* Top spark indicator banner */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[9px] font-semibold uppercase tracking-widest text-[#00d2ff]/80 select-none mb-6">
            <Sparkles className="w-3 h-3 text-[#00d2ff] animate-pulse" />
            <span>Verified Operator Testimony</span>
          </div>

          <div className="min-h-[140px] md:min-h-[120px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-base md:text-lg text-white/95 leading-[1.62] font-light md:tracking-tight italic"
              >
                “{testimonials[activeTestimonial].text}”
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-sm font-semibold text-white">
                    {testimonials[activeTestimonial].author}
                  </div>
                  <div className="text-xs text-white/45 font-mono mt-0.5">
                    {testimonials[activeTestimonial].role}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[#00d2ff] font-extrabold tracking-wider font-mono bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2.5 py-1 rounded"
                  >
                    {testimonials[activeTestimonial].company}
                  </motion.div>
                </AnimatePresence>

                {/* Arrow navigation triggers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.01] hover:bg-white/5 active:scale-90 flex items-center justify-center text-white/60 hover:text-white cursor-pointer transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.01] hover:bg-white/5 active:scale-90 flex items-center justify-center text-white/60 hover:text-white cursor-pointer transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeTestimonial === idx ? 'w-4 bg-[#00d2ff]' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* SECTION 9: FinalCTA */}
      <section id="documentation" className="relative z-20 max-w-6xl mx-auto px-6 py-20 md:py-32 select-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center border border-white/15"
        >
          {/* Radial glow background effect */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(600px circle at 50% 0%, rgba(61,129,227,0.18), transparent 70%)'
            }}
          />

          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
              Close the tabs.<br />
              <span className="text-white/60">Open your day.</span>
            </h2>

            <p className="mt-6 text-white/60 max-w-md mx-auto text-sm md:text-base leading-[1.6]">
              Join thousands of builders, founders, and operators who treat email like a tool — not an obligation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <AppleButton onClick={handleDownloadClick} label="Download Vesper" />
              <button
                onClick={() => alert("Connecting to sales channel... Please configure Gmail integration parameters inside Settings to enable workspace synchronization.")}
                className="group rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 active:scale-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>Talk to sales</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Page Footer */}
      <footer id="careers" className="relative z-10 max-w-6xl mx-auto px-6 pb-12 border-t border-white/5 pt-8 text-center text-xs text-white/30 font-mono tracking-wide flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-2">
          <LogoMark className="w-5 h-5 text-white/40" />
          <span>© Vesper Technologies Corp. All rights reserved. Develop by Shayan Abdullah</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-white transition">Privacy</a>
          <a href="#terms" className="hover:text-white transition">Terms</a>
          <a href="#security" className="hover:text-white transition">Security</a>
        </div>
      </footer>

      {/* Interactive Desktop Installer Target Modal */}
      <AnimatePresence>
        {downloadModalTarget && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0e1014] p-6 text-center shadow-2xl relative select-none"
            >
              <button
                onClick={() => setDownloadModalTarget(null)}
                className="absolute top-4 right-4 rounded-full w-6 h-6 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-brand/15 border border-brand/40 flex items-center justify-center mx-auto text-brand mb-4">
                <AppleLogo className="w-6 h-6 text-white fill-white" />
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">Select Vesper Target Architecture</h3>
              <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto">
                Vesper installs with system-level acceleration for sub-millisecond inbox parsing loops.
              </p>

              <div className="grid grid-cols-2 gap-3 my-5">
                {[
                  { name: 'Apple Silicon', label: 'M1, M2, M3 Max +', slug: 'arm64' },
                  { name: 'macOS Intel', label: '64-bit Architecture', slug: 'x64' },
                  { name: 'Windows Client', label: 'Enterprise preview', slug: 'windows' },
                  { name: 'Linux Kernel', label: 'Debian / RPM flatpak', slug: 'linux' }
                ].map(os => (
                  <button
                    key={os.slug}
                    onClick={() => {
                      setDownloadModalTarget(null);
                      alert(`Successfully initiated downloading Vesper v3.5.0 build for (${os.name}).`);
                    }}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-brand/40 transition text-left cursor-pointer active:scale-95 duration-200"
                  >
                    <span className="text-xs font-semibold text-white block">{os.name}</span>
                    <span className="text-[10px] text-white/40 block mt-0.5">{os.label}</span>
                  </button>
                ))}
              </div>

              <div className="text-[10px] text-white/30 font-mono">
                Current build: vesper-desktop-3.5.0-production.pkg
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SubPagesModal page={activePageModal} onClose={() => setActivePageModal(null)} />
    </div>
  );
}

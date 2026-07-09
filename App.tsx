/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import { Toaster, toast } from "sonner";

import { CustomCursor } from "./components/CustomCursor";


import InteractiveCanvas from "./components/InteractiveCanvas";

import VideoGallery from "./components/VideoGallery";

import Guestbook from "./components/Guestbook";

import VGStudyHubShowcase from "./components/VGStudyHubShowcase";

import { Reveal } from "./components/Reveal";
import { TiltCard } from "./components/TiltCard";

import { AvailabilityBadge } from "./components/AvailabilityBadge";

import { FloatingCTA } from "./components/FloatingCTA";

import {
  ArrowDownRight,
  ArrowRight,
  Compass,
  Shield,
  Heart,
  Eye,
  Sparkles,
  Mail,
  Send,
  ExternalLink,
  Menu,
  X,
  ArrowUp,
  Home,
  Sliders,
  Feather,
  Video,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Briefcase,
  DollarSign,
} from "lucide-react";

export const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const faqRef = useRef<HTMLElement>(null);

  const [navTone, setNavTone] = useState<"light" | "dark">("light");

  useEffect(() => {
    let ticking = false;
    
    const updateNavTone = () => {
      // Check an element slightly below the top where the header is
      const el = document.elementFromPoint(window.innerWidth / 2, 80);
      if (el) {
        const toneElement = el.closest('[data-nav-tone]');
        if (toneElement) {
          const tone = toneElement.getAttribute('data-nav-tone');
          if (tone === "light" || tone === "dark") {
            setNavTone(tone);
          }
        }
      }
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateNavTone();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    
    // Initial check
    setTimeout(updateNavTone, 100);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // ESC to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        activeFaq !== null &&
        faqRef.current &&
        !faqRef.current.contains(event.target as Node)
      ) {
        setActiveFaq(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeFaq]);

  // Correspondence (Contact Form) State
  const [senderName, setSenderName] = useState("");

  const [senderEmail, setSenderEmail] = useState("");

  const [senderTopic, setSenderTopic] = useState("video-editing");

  const [senderMessage, setSenderMessage] = useState("");

  const [mailSent, setMailSent] = useState(false);

  const [mailError, setMailError] = useState("");

  const [isSending, setIsSending] = useState(false);

  // Handle scrolling navigation shifts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    setMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      const headerOffset = 80;

      const elementPosition = element.getBoundingClientRect().top;

      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCorrespondenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMailError("");
    setMailSent(false);

    if (!senderName.trim() || !senderEmail.trim() || !senderMessage.trim()) {
      setMailError("Please add your name, email, and message before sending.");
      return;
    }

    if (!senderEmail.includes("@")) {
      setMailError("Please enter a valid email address.");
      return;
    }

    const projectTypeLabels: Record<string, string> = {
      "video-editing": "Video Editing",
      "reels-shorts": "Reels / Shorts",
      "brand-product": "Brand or Product Video",
      "monthly-support": "Monthly Editing Support",
      general: "General Question",
    };

    setIsSending(true);

    try {
      const projectType = projectTypeLabels[senderTopic] || senderTopic;
      const whatsappMessage = [
        "New project inquiry from BAS1C VISUALS website",
        "",
        `Full name: ${senderName.trim()}`,
        `Email: ${senderEmail.trim()}`,
        `Project type: ${projectType}`,
        "",
        "Detailed message:",
        senderMessage.trim(),
      ].join("\n");
      const whatsappUrl = `https://wa.me/919310343631?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      const openedWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      if (!openedWindow) {
        window.location.href = whatsappUrl;
      }

      // Reset form
      setSenderName("");
      setSenderEmail("");
      setSenderMessage("");
      setMailSent(true);

      toast.success("WhatsApp is ready with your project details.");

      // Timeout notification
      setTimeout(() => setMailSent(false), 5000);
    } catch (error: any) {
      console.error(error);
      setMailError(error.message || "There was an error opening WhatsApp. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-themeBg text-black font-sans selection:bg-black selection:text-white relative flex flex-col justify-between">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100] mix-blend-difference"
        style={{ scaleX }}
      />
      <CustomCursor />
      <Toaster position="bottom-right" richColors />

      {/* Scroll-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 bg-white border border-neutral-200 hover:border-black hover:text-black text-neutral-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            title="Scroll back to top"
            id="scroll-to-top-btn"
          >
            <ArrowUp
              size={16}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* TOP HEADER / NAVIGATION */}
      <div 
        className={`fixed top-4 left-0 right-0 z-[80] transition-all duration-500 flex justify-center pointer-events-none px-4 ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto transition-all duration-500 w-full max-w-5xl flex justify-between items-center px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-full backdrop-blur-xl shadow-sm ${
            navTone === "light" 
              ? "bg-white/70 text-black border border-black/10 shadow-black/5" 
              : "bg-black/55 text-white border border-white/15 shadow-white/5"
          }`}
        >
          {/* Logo Brandmark */}
          <div
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 cursor-pointer group transition-colors duration-300"
          >
            <img
              src="/website-assets/Brand_Logo.webp"
              alt="Bas1c Visuals Logo"
              width={28}
              height={28}
              loading="eager"
              decoding="async"
              className={`w-7 h-7 object-contain rounded-md transition-all duration-300 group-hover:rotate-12 ${
                navTone === "dark" ? "brightness-0 invert" : ""
              }`}
            />
            <span className="font-sans font-black text-sm tracking-widest uppercase">
              BAS1C VISUALS{" "}
              <span className={`font-mono text-[9px] uppercase font-semibold tracking-wider ml-1.5 pl-1.5 border-l block sm:inline-block transition-colors duration-300 ${
                navTone === "light" ? "text-neutral-500 border-neutral-300" : "text-neutral-300 border-neutral-400"
              }`}>
                RITESH BERA
              </span>
            </span>
          </div>

          {/* Desktop Landmarks */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono tracking-widest transition-colors duration-300">
            {[
              { id: "about", label: "ABOUT" },
              { id: "projects", label: "WORK" },
              { id: "vg-study-hub", label: "CLIENT WORK" },
              { id: "services-overview", label: "SERVICES" },
              { id: "pricing", label: "PRICING" },
              { id: "faq", label: "FAQ" },
              { id: "guestbook", label: "FEEDBACK" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollToSection(item.id)}
                className={`px-3 py-2 rounded-full transition-colors uppercase ${
                  navTone === "light" 
                    ? "text-neutral-600 hover:text-black hover:bg-black/5" 
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#correspondence"
              onClick={scrollToSection("correspondence")}
              className={`ml-3 px-5 py-2.5 rounded-full transition-colors font-sans font-bold text-[10px] tracking-widest shadow-sm cursor-pointer border border-transparent ${
                navTone === "light"
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              START A PROJECT
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <button
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`lg:hidden p-2 rounded-full transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              navTone === "light" 
                ? "bg-black/5 text-black hover:bg-black/10 focus-visible:ring-black/20" 
                : "bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/20"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* MOBILE SCREEN NAVIGATION */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-[90] flex flex-col pt-28 px-6 pb-12 backdrop-blur-2xl overflow-y-auto ${
              navTone === "light" ? "bg-white/80" : "bg-black/80"
            }`}
          >
            <div className="flex flex-col gap-5 font-sans h-full justify-center">
              <motion.button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                className={`group flex items-center gap-3 self-start px-5 py-3 rounded-full border font-mono text-xs uppercase tracking-widest transition-colors ${
                  navTone === "light"
                    ? "bg-black text-white border-black hover:bg-neutral-800"
                    : "bg-white text-black border-white hover:bg-neutral-200"
                }`}
              >
                <Home size={14} />
                <span>Back Home</span>
              </motion.button>

              {[
                { id: "about", num: "01", label: "About" },
                { id: "projects", num: "02", label: "Work" },
                { id: "vg-study-hub", num: "03", label: "Client Work" },
                { id: "services-overview", num: "04", label: "Services" },
                { id: "pricing", num: "05", label: "Pricing Models" },
                { id: "faq", num: "06", label: "Client Faq" },
                { id: "guestbook", num: "07", label: "Feedback" },
                { id: "correspondence", num: "08", label: "Contact" },
              ].map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className={`group flex items-baseline gap-4 text-4xl md:text-5xl font-serif tracking-tight transition-colors pb-4 border-b ${
                    navTone === "light" 
                      ? "text-black border-black/10 hover:text-black/60" 
                      : "text-white border-white/10 hover:text-white/60"
                  }`}
                >
                  <span className={`text-xs md:text-sm font-mono tracking-widest ${
                    navTone === "light" ? "text-neutral-400 group-hover:text-black/40" : "text-neutral-500 group-hover:text-white/40"
                  }`}>
                    {item.num}.
                  </span>
                  {item.label}
                </motion.a>
              ))}
                          
              <motion.a
                href="#correspondence"
                onClick={scrollToSection("correspondence")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className={`mt-8 px-8 py-4 rounded-full shadow-lg font-mono text-xs uppercase tracking-widest hover:scale-105 transition-transform self-start ${
                  navTone === "light"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Start a Project Inquiry
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- HERO SECTION --- */}
      <header data-nav-tone="light" className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-transparent">
        {/* Interactive 3D/2D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <InteractiveCanvas />
        </div>

        {/* Ambient Overlay Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent to-transparent" />

        <div className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl text-left space-y-8 pointer-events-none">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-neutral-200 text-neutral-600 text-[10px] font-mono tracking-widest uppercase rounded-full backdrop-blur-md shadow-sm pointer-events-auto">
              <Video size={11} className="text-black" />
              <span>VIDEO EDITING & CREATIVE POST-PRODUCTION</span>
            </div>
          </Reveal>

          <Reveal delay={0.2} variant="fadeUp">
            <div className="space-y-4 max-w-5xl">
              {/* Inter Bold / Black headlines requested */}
              <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl text-black leading-[0.95] tracking-tighter">
                Clean, cinematic edits for brands, creators, and growing
                businesses.
              </h1>
            </div>
          </Reveal>

          {/* Instrument Sans / Serif supporting body requested */}
          <Reveal delay={0.3}>
            <p className="max-w-xl text-xs md:text-sm text-neutral-500 font-sans tracking-wide leading-relaxed pointer-events-auto">
              I’m Ritesh Bera, the editor behind BAS1C VISUALS. I help turn raw
              footage into polished videos with clear pacing, clean sound, and a
              premium visual feel.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            {/* Scroll down indicator */}
            <div className="pt-6 flex gap-4 pointer-events-auto">
              <a
                href="#about"
                onClick={scrollToSection("about")}
                className="px-6 py-3.5 border border-neutral-300 hover:border-black text-neutral-600 hover:text-black rounded-full text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-2 bg-white shadow-sm"
              >
                <span>ABOUT ME</span>
                <ArrowDownRight size={13} />
              </a>
              <a
                href="#projects"
                onClick={scrollToSection("projects")}
                className="px-6 py-3.5 bg-black text-white hover:bg-neutral-800 border-black rounded-full text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-2 shadow-xl shadow-black/10"
              >
                <span>WORK</span>
                <ArrowDownRight size={13} />
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      <main className="flex-grow">
        {/* --- SECTION 1: DETAILED BIOGRAPHY / PHILOSOPHY --- */}
        <section
          id="about"
          data-nav-tone="light"
          className="py-24 bg-transparent border-y border-neutral-200/40"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Title Column (Col 4) */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                  ABOUT BAS1C VISUALS
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-black tracking-tight">
                  Video editing with a clear eye for pacing, mood, and brand
                  feel.
                </h2>
                <div className="w-12 h-[1px] bg-black"></div>

                {/* Meta details */}
                <div className="pt-4 space-y-2 text-xs font-mono text-neutral-400 font-semibold">
                  <p>NAME: RITESH BERA</p>
                  <p>STUDIO: BAS1C VISUALS</p>
                  <p>BASED IN: INDIA</p>
                  <p>WORK: VIDEO EDITING, REELS, BRAND VISUALS</p>
                  <p>AVAILABLE FOR: REMOTE PROJECTS</p>
                </div>
              </div>

              {/* Right Description Column (Col 8) */}
              <div className="lg:col-span-8 text-neutral-600 font-sans text-base md:text-lg leading-relaxed space-y-8">
                <p className="text-black font-serif italic text-xl md:text-2xl leading-relaxed">
                  &ldquo; Good editing should feel smooth, intentional, and easy
                  to watch — not overdone.&rdquo;
                </p>

                <p className="text-xs md:text-sm">
                  BAS1C VISUALS is the creative portfolio of Ritesh Bera, an
                  independent video editor and visual designer from India. I
                  work with creators, brands, and businesses to shape raw
                  footage into clean, engaging, and polished video content.
                </p>

                <p className="text-xs md:text-sm">
                  My focus is simple: strong pacing, clean structure, natural
                  sound, thoughtful color, and visuals that feel premium without
                  becoming loud or distracting.
                </p>

                {/* Core values block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-black flex items-center gap-1.5 font-bold">
                      <Compass size={13} />
                      CLEAR PACING
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Edits are shaped to keep the viewer engaged without making
                      the video feel rushed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-black flex items-center gap-1.5 font-bold">
                      <Shield size={13} />
                      RELIABLE DELIVERY
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Files, feedback, and revisions are handled clearly so the
                      project stays organized from start to finish.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-black flex items-center gap-1.5 font-bold">
                      <Feather size={13} />
                      SOUND & DETAIL
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Small sound details, clean audio, and balanced music help
                      the final video feel more complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: VIDEOS & REELS TIMELINE LABS --- */}
        <div data-nav-tone="light"><VideoGallery /></div>

        {/* --- SECTION 3: CLIENT WORK / VG STUDY HUB --- */}
        <div data-nav-tone="light"><VGStudyHubShowcase /></div>

        {/* --- SECTION 3: CAPABILITIES BENTO (REST AND CAPABILITIES) --- */}
        <section data-nav-tone="dark" className="py-24 bg-black text-neutral-100 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Elegant glowing background highlights */}
            <div className="w-96 h-96 rounded-full bg-neutral-400 blur-[130px] absolute top-[-100px] left-[-100px]" />
            <div className="w-96 h-96 rounded-full bg-neutral-200 blur-[130px] absolute bottom-[-100px] right-[-100px]" />
          </div>

          <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-widest rounded-full border border-neutral-700">
                  SERVICES
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                  What I can{" "}
                  <span className="italic font-normal text-neutral-400">
                    help you
                  </span>{" "}
                  with
                </h2>
                <p className="text-neutral-400 text-sm md:text-base font-sans leading-relaxed">
                  I create polished visual content for brands, creators, real
                  estate businesses, product-led companies, and social media
                  pages. The work can be simple, cinematic, fast-paced, or
                  premium depending on the goal of the project.
                </p>

                {/* Visual spec code snippet */}
                <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-5 font-mono text-[11px] text-neutral-400 space-y-1.5">
                  <p className="text-neutral-500">// CAPABILITIES LIST</p>
                  <p>
                    <span className="text-neutral-200">1</span>. Video Editing
                  </p>
                  <p>
                    <span className="text-neutral-200">2</span>. Reels & Shorts
                  </p>
                  <p>
                    <span className="text-neutral-200">3</span>. Product Visuals
                  </p>
                  <p>
                    <span className="text-neutral-200">4</span>. Brand Content
                  </p>
                  <p>
                    <span className="text-neutral-200">5</span>. Color
                    Correction
                  </p>
                  <p>
                    <span className="text-neutral-200">6</span>. Sound Cleanup
                  </p>
                  <p>
                    <span className="text-neutral-200">7</span>. Captions
                  </p>
                  <p>
                    <span className="text-neutral-200">8</span>. Final Export
                  </p>
                </div>
              </div>

              {/* Right Column Bento Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                {/* Card 1 */}
                <TiltCard className="bg-[#111111] border border-neutral-850 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors w-full h-full">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    01 / SERVICE
                  </span>
                  <h3 className="font-serif text-xl text-white">
                    Video Editing
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Clean cuts, story structure, pacing, music sync, subtitles,
                    and final polish for short or long videos.
                  </p>
                </TiltCard>

                {/* Card 2 */}
                <TiltCard className="bg-[#111111] border border-neutral-850 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors w-full h-full">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    02 / SERVICE
                  </span>
                  <h3 className="font-serif text-xl text-white">
                    Reels & Shorts
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Vertical edits for Instagram, YouTube Shorts, and other
                    short-form platforms with strong opening hooks and smooth
                    flow.
                  </p>
                </TiltCard>

                {/* Card 3 */}
                <TiltCard className="bg-[#111111] border border-neutral-850 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors w-full h-full">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    03 / SERVICE
                  </span>
                  <h3 className="font-serif text-xl text-white">
                    Product & Brand Visuals
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Premium edits for products, services, campaigns, launches,
                    and business promotions.
                  </p>
                </TiltCard>

                {/* Card 4 */}
                <TiltCard className="bg-[#111111] border border-neutral-850 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition-colors w-full h-full">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    04 / SERVICE
                  </span>
                  <h3 className="font-serif text-xl text-white">
                    Sound, Color & Finishing
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Basic sound cleanup, music balancing, color correction, and
                    export-ready final delivery.
                  </p>
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICES POSTER SECTION --- */}
        <section id="services-overview" data-nav-tone="light" className="py-24 bg-themeBg border-b border-neutral-200/40">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col items-center">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                OVERVIEW
              </span>
              <h2 className="font-sans font-black text-3xl md:text-5xl text-black tracking-tight">
                Services{" "}
                <span className="font-serif italic font-normal text-neutral-500">
                  at a glance
                </span>
              </h2>
            </div>

            <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/60 bg-neutral-100">
              <img
                src="/website-assets/services-poster.webp"
                alt="Services Overview Poster"
                width={1024}
                height={1536}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>
        </section>

        {/* --- PRICING SECTION --- */}
        <section
          id="pricing"
          data-nav-tone="light"
          className="py-24 bg-transparent border-b border-neutral-200/40"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-neutral-200/60 pb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                  WORKING OPTIONS
                </span>
                <h2 className="font-sans font-black text-3xl md:text-5xl text-black tracking-tight">
                  Simple ways to{" "}
                  <span className="font-serif italic font-normal text-neutral-500">
                    work together
                  </span>
                </h2>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm font-sans leading-relaxed">
                Every project is different, so pricing depends on video length,
                complexity, deadline, and revision needs. These options give a
                clear starting point before we discuss the exact scope.
              </p>
            </div>

            {/* Pricing Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Card 1: Basic */}
              <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 p-8 rounded-3xl flex flex-col justify-between space-y-8 hover:border-slate-900 transition-colors group relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2.5 py-1 text-neutral-500 uppercase tracking-widest rounded-full">
                      01 / PROJECT
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-2xl text-black">
                      Starter Edit
                    </h3>
                    <p className="text-xs text-neutral-500 font-serif italic">
                      For simple short-form videos.
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-neutral-100"></div>
                  <ul className="space-y-3.5 text-xs text-neutral-600 font-sans">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Short reel or basic edit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Clean cuts and pacing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Music sync</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Basic color correction</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-400">
                      <div className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></div>
                      <span>1 revision included</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 pt-6">
                  <a
                    href="#correspondence"
                    onClick={scrollToSection("correspondence")}
                    className="w-full py-3 bg-neutral-100 hover:bg-black text-neutral-800 hover:text-white font-mono text-[11px] tracking-wider uppercase text-center rounded-full block transition-all font-semibold"
                  >
                    ASK ABOUT STARTER EDIT
                  </a>
                </div>
              </div>

              {/* Card 2: Advanced (Featured/Highlighted) */}
              <div className="bg-slate-50/80 backdrop-blur-sm border-2 border-slate-900 p-8 rounded-3xl flex flex-col justify-between space-y-8 hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-black text-neutral-50 text-[9px] font-mono tracking-widest px-4 py-1 uppercase rounded-bl-xl font-bold">
                  MOST POPULAR
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono bg-black text-neutral-100 px-2.5 py-1 uppercase tracking-widest rounded-full">
                      02 / BRANDED
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-2xl text-black">
                      Premium Edit
                    </h3>
                    <p className="text-xs text-neutral-500 font-serif italic">
                      For polished brand or business videos.
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-neutral-100"></div>
                  <ul className="space-y-3.5 text-xs text-neutral-600 font-sans">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Advanced pacing and structure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Sound balancing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Color correction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Text, titles, or captions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Up to 3 revisions included</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 pt-6">
                  <a
                    href="#correspondence"
                    onClick={scrollToSection("correspondence")}
                    className="w-full py-3 bg-black hover:bg-[#111111] text-white font-mono text-[11px] tracking-wider uppercase text-center rounded-full block transition-all font-bold shadow-md animate-slow-pan"
                  >
                    DISCUSS PREMIUM EDIT
                  </a>
                </div>
              </div>

              {/* Card 3: Retainer */}
              <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 p-8 rounded-3xl flex flex-col justify-between space-y-8 hover:border-slate-900 transition-colors group relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2.5 py-1 text-neutral-500 uppercase tracking-widest rounded-full">
                      03 / PIPELINE
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-2xl text-black">
                      Monthly Support
                    </h3>
                    <p className="text-xs text-neutral-500 font-serif italic">
                      For creators or brands needing regular edits.
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-neutral-100"></div>
                  <ul className="space-y-3.5 text-xs text-neutral-600 font-sans">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Weekly or monthly editing support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Consistent visual style</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Organized file workflow</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Priority communication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Best for ongoing content</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 pt-6">
                  <a
                    href="#correspondence"
                    onClick={scrollToSection("correspondence")}
                    className="w-full py-3 bg-neutral-100 hover:bg-black text-neutral-800 hover:text-white font-mono text-[11px] tracking-wider uppercase text-center rounded-full block transition-all font-semibold"
                  >
                    TALK ABOUT MONTHLY WORK
                  </a>
                </div>
              </div>
            </div>

            {/* Global working announcement card */}
            <div className="mt-16 bg-themeBg/90 backdrop-blur-sm border border-neutral-200/60 p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-left">
                <div className="w-12 h-12 shrink-0 rounded-full bg-black text-white flex items-center justify-center font-sans font-black text-sm shadow-md">
                  IN
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 block uppercase font-bold tracking-wider mb-1">
                    BASED IN INDIA • AVAILABLE REMOTELY
                  </span>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed max-w-xl">
                    BAS1C VISUALS works with clients through online
                    communication, shared folders, and clear feedback rounds.
                    You can send footage from anywhere, and the final files are
                    delivered digitally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section
          id="faq"
          data-nav-tone="light"
          ref={faqRef}
          className="py-24 bg-transparent border-t border-b border-neutral-200/40"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column Description */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                  FAQ
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-black tracking-tight">
                  Frequently{" "}
                  <span className="font-serif italic font-normal text-neutral-500">
                    Asked
                  </span>
                </h2>
                <div className="w-12 h-[1px] bg-black"></div>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-sm">
                  Here are a few common questions about working together,
                  sending files, delivery time, and revisions.
                </p>
              </div>

              {/* Right Column Accordion List */}
              <div className="lg:col-span-8 space-y-4">
                {[
                  {
                    q: "How do I send raw footage?",
                    a: "You can share footage through Google Drive, Dropbox, WeTransfer, or any other cloud link. Please include all video files, music references, brand assets, and instructions in one folder if possible.",
                  },
                  {
                    q: "How long does an edit take?",
                    a: "Simple reels can usually be completed faster, while longer or more detailed videos need more time. The final timeline depends on length, footage quality, revisions, and the style you want.",
                  },
                  {
                    q: "Do you work with clients outside India?",
                    a: "Yes. I can work remotely with clients from different locations. Communication, file sharing, feedback, and delivery can all happen online.",
                  },
                  {
                    q: "Can you make videos for Instagram Reels and YouTube Shorts?",
                    a: "Yes. I can edit vertical videos for Instagram, YouTube Shorts, TikTok-style formats, and other short-form platforms.",
                  },
                  {
                    q: "Do you provide revisions?",
                    a: "Yes. Revision details are discussed before the project starts so both sides are clear about what is included.",
                  },
                ].map((item, idx) => {
                  const isOpen = activeFaq === idx;

                  return (
                    <div
                      key={idx}
                      className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-3xl overflow-hidden transition-all duration-300 hover:border-slate-900"
                      id={`faq-item-${idx}`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="font-sans font-bold text-sm md:text-base text-[#111111] tracking-tight">
                          {item.q}
                        </span>
                        <span
                          className="w-5 h-5 rounded-full bg-neutral-50 flex items-center justify-center text-xs text-neutral-400 font-mono transition-transform duration-300 group-hover:bg-[#111111] group-hover:text-white"
                          style={{
                            transform: isOpen ? "rotate(45deg)" : "none",
                          }}
                        >
                          +
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 border-t border-neutral-100 font-sans text-xs md:text-sm text-neutral-500 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: GUEST REGISTRY NOTES --- */}
        <div data-nav-tone="light"><Guestbook /></div>

        {/* --- SECTION 6: THE CORRESPONDENCE DESK (CONTACT) --- */}
        <section
          id="correspondence"
          data-nav-tone="light"
          className="py-24 bg-transparent border-t border-neutral-200/40"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Left Column (Col 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                    CONTACT
                  </span>
                  <AvailabilityBadge />
                </div>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-black tracking-tight">
                  Let&apos; s{" "}
                  <span className="font-serif italic font-normal text-neutral-500">
                    talk about your project
                  </span>
                </h2>
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans max-w-md">
                  Have a video, reel, brand edit, or ongoing content
                  requirement? Send a short message with your idea, timeline,
                  and reference style. I’ll review it and get back to you.
                </p>

                {/* Direct info list */}
                <div className="space-y-4 pt-6 border-t border-neutral-100 text-sm font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                      <Mail size={14} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                        EMAIL
                      </span>
                      <a
                        href="mailto:bas1cvisuals.studio@gmail.com"
                        className="text-neutral-800 hover:underline font-medium font-mono text-xs"
                      >
                        bas1cvisuals.studio@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                      <MessageSquare size={14} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                        WHATSAPP
                      </span>
                      <a
                        href="https://wa.me/919310343631?text=Hi,%20I%20was%20looking%20at%20your%20website%20and%20I'm%20here%20to%20say%20hello."
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-800 hover:underline font-medium font-mono text-xs"
                      >
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                      <Compass size={14} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                        LOCATION
                      </span>
                      <span className="text-neutral-800 font-medium text-xs">
                        India (Available Remotely)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Form (Col 7) */}
              <div className="lg:col-span-7 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                  <h3 className="font-sans font-black text-xl text-black mb-2">
                  Send Project Details
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                  Fill this out once and I’ll open WhatsApp with your project
                  details formatted clearly, ready for you to send.
                </p>

                <form
                  onSubmit={handleCorrespondenceSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Add your name"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-black focus:ring-1 focus:ring-neutral-950 bg-neutral-50/20 transition-all font-sans text-neutral-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        Email
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-black focus:ring-1 focus:ring-neutral-950 bg-neutral-50/20 transition-all font-sans text-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Type of Project
                    </label>
                    <select
                      value={senderTopic}
                      onChange={(e) => setSenderTopic(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-black focus:ring-1 focus:ring-neutral-950 bg-neutral-50/20 transition-all font-sans text-neutral-800 bg-white"
                    >
                      <option value="video-editing">Video Editing</option>
                      <option value="reels-shorts">Reels / Shorts</option>
                      <option value="brand-product">
                        Brand or Product Video
                      </option>
                      <option value="monthly-support">
                        Monthly Editing Support
                      </option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Detailed Message
                    </label>
                    <textarea
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Tell me about the project, deadline, video length, and reference style..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white/50 transition-all font-sans text-slate-800"
                    />
                  </div>

                  {/* WhatsApp error banner */}
                  {mailError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-mono">
                      {mailError}
                    </div>
                  )}

                  {/* WhatsApp ready success banner */}
                  {mailSent && (
                    <div className="p-4 bg-black text-neutral-50 border border-black text-xs rounded-xl font-mono animate-fade-in space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-neutral-300">
                        <CheckCircle size={14} className="text-neutral-400" />
                        WHATSAPP READY
                      </p>
                      <p className="text-[10.5px] text-neutral-400 leading-relaxed">
                        Your details were formatted and opened in WhatsApp.
                        Please tap send there to finish.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSending}
                    className="w-full py-3 px-6 rounded-full bg-black hover:bg-[#111111] text-white font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <Send size={12} />
                    <span>{isSending ? "OPENING WHATSAPP..." : "SEND ON WHATSAPP"}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- REFINED MONOSPACED FOOTER --- */}
      <footer className="bg-transparent border-t border-neutral-200/60 py-16 text-neutral-500 text-xs font-mono">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand/Signature */}
            <div className="space-y-3">
              <h4 className="font-sans font-black text-[#111111] tracking-wider">
                BAS1C VISUALS
              </h4>
              <p className="text-[11px] leading-relaxed text-neutral-400">
                BAS1C VISUALS is the creative portfolio of Ritesh Bera, focused
                on video editing, reels, brand visuals, and clean
                post-production for creators and businesses.
              </p>
            </div>

            {/* Navigation Landmarks */}
            <div className="space-y-2">
              <h5 className="text-[10px] text-neutral-400 uppercase tracking-widest">
                SITE
              </h5>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="#about"
                    onClick={scrollToSection("about")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    01 / ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={scrollToSection("projects")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    02 / WORK
                  </a>
                </li>
                <li>
                  <a
                    href="#vg-study-hub"
                    onClick={scrollToSection("vg-study-hub")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    03 / CLIENT WORK
                  </a>
                </li>
                <li>
                  <a
                    href="#services-overview"
                    onClick={scrollToSection("services-overview")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    04 / SERVICES OVERVIEW
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    onClick={scrollToSection("pricing")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    05 / PRICING
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={scrollToSection("faq")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    06 / FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#guestbook"
                    onClick={scrollToSection("guestbook")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    07 / FEEDBACK
                  </a>
                </li>
                <li>
                  <a
                    href="#correspondence"
                    onClick={scrollToSection("correspondence")}
                    className="hover:text-black transition-colors uppercase"
                  >
                    08 / CONTACT
                  </a>
                </li>
              </ul>
            </div>

            {/* External Connections */}
            <div className="space-y-2">
              <h5 className="text-[10px] text-neutral-400 uppercase tracking-widest">
                CONTACT
              </h5>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="mailto:bas1cvisuals.studio@gmail.com"
                    className="hover:text-black transition-colors flex items-center gap-1"
                  >
                    EMAIL <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919310343631?text=Hi,%20I%20was%20looking%20at%20your%20website%20and%20I'm%20here%20to%20say%20hello."
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-black transition-colors flex items-center gap-1"
                  >
                    WHATSAPP <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/riteshbera/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-black transition-colors flex items-center gap-1"
                  >
                    LINKEDIN <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/bas1c.visuals/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-black transition-colors flex items-center gap-1"
                  >
                    INSTAGRAM <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2">
              <h5 className="text-[10px] text-neutral-400 uppercase tracking-widest">
                PROJECT INFO
              </h5>
              <ul className="space-y-1.5 list-none">
                <li className="text-[10px] text-neutral-400">
                  • Based in India
                </li>
                <li className="text-[10px] text-neutral-400">
                  • Available for remote work
                </li>
                <li className="text-[10px] text-neutral-400">
                  • Video editing • Reels • Brand visuals
                </li>
              </ul>
              <p className="text-[10px] text-neutral-400">
                COLOR SPACE: REC.709 / DCI-P3
              </p>
              <p className="text-[10px] text-neutral-400">
                AUDIO ENGINE: WEB Audio API
              </p>
              <p className="text-[10px] text-neutral-400">
                PIPELINE: CLOUD DEPLOYED
              </p>
            </div>
          </div>

          {/* Copyright Bottom Bar */}
          <div className="border-t border-neutral-200/50 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-neutral-400 uppercase tracking-wider">
            <span>© 2024—2026 BAS1C VISUALS • ALL RIGHTS RESERVED.</span>
            <span>
              OPERATED BY RITESH BERA IN INDIA • SERVICING THE WORLDWIDE SPHERE
            </span>
          </div>
        </div>
      </footer>

      <FloatingCTA />
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Auto-recalculate scroll height when DOM updates
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      if (window.__lenis) window.__lenis.resize();
    }, 100);
  };

  return (
    <div className="bg-[#080B11] text-white min-h-screen selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] font-sans relative overflow-x-clip">
      {/* Custom Cursor interaktif */}
      <CustomCursor />

      {/* Subtle Analog Film Grain for ultra-premium texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Preloader Slide-Up Screen */}
      <Preloader isVisible={isLoading} onComplete={handlePreloaderComplete} />

      {/* Konten Halaman Utama yang akan terbuka setelah Preloader selesai */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-between"
          >
            {/* Step 2: Navbar Minimalis */}
            <Navbar />

            {/* Sequence: Hero (01) → About (02) → Works (03) → Skills (04) → Contact (05) */}
            <main className="flex-grow w-full">
              <Hero />
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </main>

            {/* Minimalist Editorial Footer Strip */}
            <footer className="w-full border-t border-white/10 py-8 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 bg-[#080B11]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                <span>JAKARTA, ID &bull; WIB (UTC+7)</span>
              </div>
              <div className="uppercase">
                ALVITO RAFKY SUMERI &copy; 2026 &bull; SYSTEM ANALYST &bull; WEB DEVELOPER
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

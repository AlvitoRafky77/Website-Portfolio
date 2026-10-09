import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INDEX', href: '#hero',      num: '01' },
    { name: 'ABOUT', href: '#about',     num: '02' },
    { name: 'WORKS', href: '#works',     num: '03' },
    { name: 'SKILLS', href: '#skills',   num: '04' },
    { name: 'CONTACT', href: '#contact', num: '05' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (window.__lenis) {
      window.__lenis.scrollTo(href, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 sm:py-4 bg-[#080B11]/80 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 sm:py-6 bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo / Nama Kiri */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 cursor-pointer select-none"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-white group-hover:text-[#00F0FF] transition-colors duration-200">
              ALVITO RAFKY<span className="text-[#00F0FF]">.</span>
            </span>
          </a>

          {/* Nav Links Tengah / Kanan (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative flex items-baseline gap-1.5 py-1 text-xs font-mono tracking-widest text-slate-300 hover:text-white transition-colors duration-200"
              >
                <span className="text-[10px] text-slate-500 group-hover:text-[#00F0FF] transition-colors duration-200">
                  {link.num}
                </span>
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00F0FF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action: Status Ketersediaan & Quick Action */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono tracking-wider text-slate-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              </span>
              <span className="text-[11px] uppercase tracking-widest text-slate-300">
                AVAILABLE FOR WORK
              </span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#00F0FF] text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              <span>TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00F0FF]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#080B11]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-28 pb-12 px-8"
          >
            <div className="flex flex-col gap-6">
              <div className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase border-b border-white/10 pb-3">
                NAVIGATION
              </div>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="flex items-baseline justify-between py-2 border-b border-white/5 text-slate-200 hover:text-[#00F0FF]"
                >
                  <span className="font-display text-4xl uppercase tracking-tight">
                    {link.name}
                  </span>
                  <span className="font-mono text-xs text-[#00F0FF]">{link.num}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span>AVAILABLE FOR FREELANCE &amp; ROLES</span>
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-3 bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-wider"
              >
                LET'S TALK &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

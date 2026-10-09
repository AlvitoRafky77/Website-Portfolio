import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, ArrowUpRight, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThreeCanvas from './ThreeCanvas';

export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 overflow-hidden bg-[#080B11] text-white select-none"
    >
      {/* 3D Three.js Interactive Canvas Background */}
      <ThreeCanvas />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-float" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ─── Top Metadata Strip ────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4 text-[11px] font-mono tracking-widest text-slate-400">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="text-[#00F0FF] font-bold">[ 01 / WELCOME ]</span>
          <span>&bull;</span>
          <span className="uppercase">ALVITO RAFKY SUMERI &copy; 2026</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 text-slate-300"
        >
          <span className="flex items-center gap-1.5 text-xs text-[#00F0FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BNSP CERTIFIED SYSTEM ANALYST</span>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline uppercase text-slate-400">
            TELKOM UNIVERSITY (IPK {personalInfo.gpa.split(' ')[0]})
          </span>
        </motion.div>
      </div>

      {/* ─── Center Editorial Headline & Content ───────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col items-start justify-center">
        {/* Role Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 bg-white/[0.03] border border-white/10 backdrop-blur-sm text-xs font-mono uppercase tracking-[0.25em] text-slate-300"
        >
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>FRONT-END DEV &bull; SYSTEM ANALYST &bull; UI/UX</span>
        </motion.div>

        {/* Giant Editorial Heading (Anton) */}
        <div className="w-full overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] uppercase tracking-tight leading-[0.88] text-white"
          >
            ALVITO RAFKY
          </motion.h1>
        </div>

        <div className="w-full overflow-hidden mt-1 sm:mt-2">
          <motion.h2
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] uppercase tracking-tight leading-[0.88] text-slate-500 hover:text-white transition-colors duration-300"
          >
            CRAFTING <span className="text-[#00F0FF] drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]">SYSTEMS.</span>
          </motion.h2>
        </div>

        {/* Bio Description & Action Buttons */}
        <div className="mt-8 sm:mt-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-7 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light"
          >
            Lulusan S1 Sistem Informasi dari <span className="text-white font-medium">Universitas Telkom Jakarta</span> (IPK 3.89)
            dengan sertifikasi <span className="text-[#00F0FF] font-medium">System Analyst BNSP</span>. Berfokus pada perancangan arsitektur
            aplikasi web modern, performa interaktif tinggi, dan desain antarmuka berstandar editorial.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:justify-end"
          >
            <a
              href="#works"
              onClick={(e) => handleScrollTo(e, '#works')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#00F0FF] text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <span>VIEW WORKS</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 bg-white/[0.02] hover:bg-white/10 hover:border-[#00F0FF] text-white font-mono text-xs uppercase tracking-wider transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>RESUME</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Status & Stat Strip ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-slate-400"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span className="text-white font-medium">10+ PROJECTS BUILT</span>
          </div>
          <div className="hidden sm:inline-block text-slate-600">&bull;</div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-500">EXPERTISE:</span>
            <span className="text-white">LARAVEL &bull; FIGMA</span>
          </div>
        </div>

        <a
          href="#works"
          onClick={(e) => handleScrollTo(e, '#works')}
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-[#00F0FF] transition-colors"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
          <span className="inline-block transition-transform group-hover:translate-y-1">&darr;</span>
        </a>
      </motion.div>
    </section>
  );
}

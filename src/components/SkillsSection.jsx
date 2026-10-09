import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Cpu, 
  Database, 
  Globe, 
  GitBranch, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Terminal,
  Workflow,
  Sparkles,
  Server
} from 'lucide-react';
import { FigmaIcon } from './Icons';

// Comprehensive list: clean Logo + Name + Category only
const SKILLS_LIST = [
  { name: 'Laravel', category: 'Backend', icon: Server },
  { name: 'React', category: 'Frontend', icon: Code2 },
  { name: 'MySQL DB', category: 'Database', icon: Database },
  { name: 'Figma UI/UX', category: 'Design', icon: FigmaIcon },
  { name: 'System Analysis', category: 'Analyst', icon: Cpu },
  { name: 'Tailwind CSS', category: 'Frontend', icon: Palette },
  { name: 'PHP', category: 'Backend', icon: Server },
  { name: 'JavaScript', category: 'Frontend', icon: Code2 },
  { name: 'Git & GitHub', category: 'Version Control', icon: GitBranch },
  { name: 'RESTful API', category: 'Backend', icon: Workflow },
  { name: 'WordPress', category: 'CMS / Web', icon: Globe },
  { name: 'Three.js / 3D', category: 'Creative Tech', icon: Sparkles },
];

// Group skills into slides (4 skills per slide for clean grid display)
const ITEMS_PER_SLIDE = 4;
const totalSlides = Math.ceil(SKILLS_LIST.length / ITEMS_PER_SLIDE);

export default function SkillsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const visibleSkills = SKILLS_LIST.slice(
    currentSlide * ITEMS_PER_SLIDE,
    currentSlide * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
  );

  return (
    <section 
      id="skills" 
      className="relative w-full bg-[#080B11] text-white pt-24 sm:pt-28 pb-16 sm:pb-20 border-t border-white/10 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Static dot-grid + single ambient glow (no animation = no lag) ── */}
      <div className="absolute inset-0 bg-dots-cyber [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/[0.04] blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* ── Section Header ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.25em] text-slate-400 uppercase">
              <span className="text-[#00F0FF] font-bold">[ 04 / CAPABILITIES ]</span>
              <span>&bull;</span>
              <span>TECH STACK &amp; TOOLS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.9] text-white">
              CORE <span className="text-[#00F0FF]">TECHNOLOGIES.</span>
            </h2>
          </div>

          {/* Carousel Controls Header */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-slate-400 tracking-widest">
              [ {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')} ]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="w-10 h-10 border border-white/15 hover:border-[#00F0FF] bg-[#0A0E17] hover:bg-[#00F0FF]/10 text-white flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-slate-300 hover:text-[#00F0FF]" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="w-10 h-10 border border-white/15 hover:border-[#00F0FF] bg-[#0A0E17] hover:bg-[#00F0FF]/10 text-white flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-slate-300 hover:text-[#00F0FF]" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Fade In / Fade Out Carousel Container ────────────────── */}
        <div className="relative min-h-[220px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {visibleSkills.map((skill, idx) => {
                const IconComponent = skill.icon;
                const itemIndex = currentSlide * ITEMS_PER_SLIDE + idx + 1;
                const formattedNumber = String(itemIndex).padStart(2, '0');

                return (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -4, borderColor: 'rgba(0, 240, 255, 0.5)' }}
                    className="group relative p-7 bg-[#0A0E17] border border-white/10 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top neon glow line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#00F0FF]" />

                    {/* Top strip: Icon & Index */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 border border-white/10 group-hover:border-[#00F0FF]/50 bg-[#080B11] flex items-center justify-center text-[#00F0FF] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
                        /{formattedNumber}
                      </span>
                    </div>

                    {/* Bottom strip: Skill Name & Category */}
                    <div>
                      <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[#00F0FF] transition-colors mb-1.5">
                        {skill.category}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-white transition-colors leading-none">
                        {skill.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Slide Progress Bar & Indicators ───────────────────────── */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  currentSlide === i 
                    ? 'w-10 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]' 
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span className="hidden sm:inline">AUTOPLAY CAROUSEL</span>
            <span>&bull;</span>
            <span>HOVER TO PAUSE</span>
          </div>
        </div>

      </div>

      {/* ── Ticker Ribbon (framer-motion — full-bleed matching AboutSection) ─────── */}
      <div className="relative w-full mt-14 overflow-hidden border-t border-b border-white/8 bg-[#080B11]/50">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080B11] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080B11] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex w-max gap-3 py-2.5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        >
          {[...SKILLS_LIST, ...SKILLS_LIST].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${index}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/8 hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/[0.04] transition-all duration-300 shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 whitespace-nowrap">{item.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Briefcase,
  ChevronRight,
  Building2,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import { personalInfo, educationHistory, experienceData, certificationsData } from '../data/portfolioData';

/* ─── Marquee Strip Component ─────────────────────────────────────────── */
const techMarqueeItems = [
  'React', 'Vite', 'Tailwind CSS', 'Laravel', 'PHP', 'MySQL',
  'Figma', 'JavaScript', 'Three.js', 'Framer Motion', 'WordPress',
  'Git & GitHub', 'UI/UX Design', 'System Analysis', 'UML Modeling',
  'REST API', 'Responsive Web', 'Lenis Scroll', 'Node.js', 'Framer Motion',
];

function MarqueeStrip({ direction = 'left' }) {
  const items = [...techMarqueeItems, ...techMarqueeItems];
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-r';
  // 3.5s per item → kecepatan konsisten berapapun jumlah item
  const duration = `${techMarqueeItems.length * 3.5}s`;

  return (
    <div className="relative overflow-hidden w-full py-3 border-t border-b border-white/8 my-0">
      {/* Left/Right fade edges */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-[#080B11] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-[#080B11] to-transparent pointer-events-none" />

      <div
        className={`flex whitespace-nowrap hover:[animation-play-state:paused] cursor-default ${animationClass}`}
        style={{ width: 'max-content', animationDuration: duration, willChange: 'transform' }}
      >
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-3 mx-6 text-xs font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0 shadow-[0_0_6px_#00F0FF]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main About Section ──────────────────────────────────────────────── */
const TABS = ['experience', 'education', 'certifications'];
const TAB_LABELS = { experience: 'EXPERIENCE', education: 'EDUCATION', certifications: 'CERTIFICATIONS' };

const typeColor = {
  Internship:    'border-[#00F0FF]/40 text-[#00F0FF] bg-[#00F0FF]/8',
  Freelance:     'border-violet-400/40 text-violet-300 bg-violet-500/8',
  Academic:      'border-sky-400/40 text-sky-300 bg-sky-500/8',
  Organisasi:    'border-amber-400/40 text-amber-300 bg-amber-500/8',
  Kepanitiaan:   'border-emerald-400/40 text-emerald-300 bg-emerald-500/8',
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('experience');
  const [expandedExp, setExpandedExp] = useState(null);
  const sectionRef = useRef(null);

  // Manual scroll progress synced with Lenis (same pattern as ProjectsSection)
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    function updateProgress() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionH = el.offsetHeight - window.innerHeight;
      if (sectionH <= 0) return;
      const traveled = -rect.top;
      const progress = Math.max(0, Math.min(1, traveled / sectionH));
      scrollProgress.set(progress);
    }

    const lenis = window.__lenis;
    if (lenis) lenis.on('scroll', updateProgress);
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      if (lenis) lenis.off('scroll', updateProgress);
      window.removeEventListener('scroll', updateProgress);
    };
  }, [scrollProgress]);


  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  // Converging entrance (Lando Norris style): Left & Right glide inwards meeting in the center
  const slideFromLeft = {
    hidden: { opacity: 0, x: -70, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 70, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#080B11] text-white border-t border-white/10 overflow-hidden"
    >
      {/* ─── Animated Architectural Blueprint Background ─────────────── */}
      <div className="absolute inset-0 bg-grid-cyber [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)] pointer-events-none opacity-60" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-indigo-500/5 blur-[160px] rounded-full animate-pulse-slow pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-cyan-500/5 blur-[150px] rounded-full animate-float pointer-events-none" aria-hidden="true" />

      {/* ─── Manifesto / Philosophy Block ─────────────────────────────── */}
      <div className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-mono tracking-[0.25em] text-slate-400 uppercase">
              <span className="text-[#00F0FF] font-bold">[ 02 / ABOUT ]</span>
              <span>&bull;</span>
              <span>PHILOSOPHY &amp; BACKGROUND</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-[0.9] text-white">
              WHO I AM<span className="text-[#00F0FF]">.</span>
            </h2>
          </motion.div>

          {/* Stat Sidebar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="flex gap-8 sm:gap-12 shrink-0"
          >
            {[
              { num: '3.89', label: 'GPA / 4.00' },
              { num: '10+', label: 'Projects' },
              { num: '2026', label: 'Graduate' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl text-[#00F0FF]">{num}</div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Editorial 2-column: Mysterious Portrait Monolith + Manifesto & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* Left: Editorial Mysterious Portrait Monolith — glides in from left towards center */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={slideFromLeft}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="group relative w-full max-w-[350px] sm:max-w-[380px] bg-[#0A0E17] border border-white/10 hover:border-[#00F0FF]/60 transition-all duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
              
              {/* Corner Reticle Crosshairs (+) */}
              <div className="absolute top-2 left-2 text-[#00F0FF] text-[10px] font-mono z-20 pointer-events-none opacity-60 select-none">+</div>
              <div className="absolute top-2 right-2 text-[#00F0FF] text-[10px] font-mono z-20 pointer-events-none opacity-60 select-none">+</div>
              <div className="absolute bottom-2 left-2 text-[#00F0FF] text-[10px] font-mono z-20 pointer-events-none opacity-60 select-none">+</div>
              <div className="absolute bottom-2 right-2 text-[#00F0FF] text-[10px] font-mono z-20 pointer-events-none opacity-60 select-none">+</div>

              {/* Top Dossier Meta Bar */}
              <div className="relative z-10 px-4 py-2.5 bg-[#080B11]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-400">
                <span className="text-[#00F0FF] font-semibold">[ DOSSIER // 02 ]</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
                  <span>IDENTIFIED</span>
                </div>
              </div>

              {/* Image Container with Cinematic Duotone / Mysterious Reveal */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#080B11]">
                <img
                  src="./assets/images/hero-placeholder.png"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Moody Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

                {/* Cyber Scanline Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,240,255,0.05)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Top Cyan Laser Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00F0FF]" />
              </div>

              {/* Bottom ID Badge */}
              <div className="relative z-10 p-4 bg-[#0A0E17] border-t border-white/10">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors leading-none">
                      {personalInfo.name}
                    </h3>
                    <p className="font-mono text-[10px] text-slate-400 tracking-wider uppercase mt-1">
                      BNSP SYSTEM ANALYST &bull; TELKOM UNIV
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest">
                    /2026
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right: Personal Manifesto Quote, Bio & Identity Pillars — glides in from right towards center */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={slideFromRight}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Manifesto Quote */}
            <div>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-[1.15]">
                &ldquo;SEORANG PEMENANG <span className="text-slate-500">TIDAK PERNAH</span> MENYERAH, DAN YANG{' '}
                <span className="text-[#00F0FF]">MENYERAH</span>{' '}
                TIDAK AKAN PERNAH <span className="text-slate-500">MENANG.&rdquo;</span>
              </p>
              <div className="mt-4 w-16 h-[2px] bg-gradient-to-r from-[#00F0FF] to-transparent shadow-[0_0_8px_#00F0FF]" />
              <div className="mt-2 text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                — Personal Motto &bull; Alvito Rafky Sumeri
              </div>
            </div>

            {/* Biography Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {personalInfo.bio}
            </p>

            {/* Identity Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { icon: <MapPin className="w-4 h-4" />, label: 'LOKASI', value: 'Jakarta Timur, ID' },
                { icon: <GraduationCap className="w-4 h-4" />, label: 'UNIVERSITAS', value: 'Telkom University' },
                { icon: <ShieldCheck className="w-4 h-4" />, label: 'SERTIFIKASI', value: 'BNSP System Analyst' },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/8 hover:border-[#00F0FF]/40 transition-colors"
                >
                  <span className="text-[#00F0FF] shrink-0">{icon}</span>
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">{label}</div>
                    <div className="text-xs text-white font-medium mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ─── Marquee Tech Stack Strip ─────────────────────────────────── */}
      <div className="border-t border-white/8">
        <MarqueeStrip direction="left" />
        <MarqueeStrip direction="right" />
      </div>

      {/* ─── Timeline: Experience / Education / Certifications ────────── */}
      <div className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Tab Selector */}
        <div className="flex items-center gap-1 mb-12 border-b border-white/10 pb-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 sm:px-6 py-3 text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {TAB_LABELS[tab]}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                />
              )}
            </button>
          ))}
        </div>

        {/* ─── Experience Timeline ─────────────────────────────── */}
        {activeTab === 'experience' && (
          <div className="space-y-0">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group border-b border-white/8 last:border-0"
              >
                <button
                  type="button"
                  onClick={() => setExpandedExp(expandedExp === idx ? null : idx)}
                  className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 sm:py-8 text-left cursor-pointer"
                >
                  {/* Left: Index + Role + Company */}
                  <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                    <span className="font-mono text-sm text-slate-600 group-hover:text-[#00F0FF] transition-colors shrink-0 mt-1 sm:mt-0">
                      /{String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border ${typeColor[exp.type] || 'border-white/10 text-slate-400'}`}>
                          {exp.type}
                        </span>
                        <span className="hidden sm:inline text-[10px] font-mono text-slate-500">{exp.period}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-slate-400">
                        <Building2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>{exp.company}</span>
                        <span className="text-slate-600">&bull;</span>
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Period + Expand Arrow */}
                  <div className="flex items-center gap-4 shrink-0 pl-10 sm:pl-0">
                    <span className="text-xs font-mono text-slate-500 hidden sm:hidden md:inline">{exp.period}</span>
                    <div className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 shrink-0 ${expandedExp === idx ? 'bg-[#00F0FF] border-[#00F0FF]' : 'group-hover:border-[#00F0FF]/50'}`}>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${expandedExp === idx ? 'rotate-90 text-black' : 'text-slate-400'}`} />
                    </div>
                  </div>
                </button>

                {/* Expanded Description Panel */}
                {expandedExp === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="pb-6 sm:pb-8 pl-10 sm:pl-20 overflow-hidden"
                  >
                    <p className="text-slate-400 text-sm mb-4 font-light italic">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0 mt-2" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── Education ───────────────────────────────────────── */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            {educationHistory.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 border border-white/8 bg-white/[0.02] hover:border-[#00F0FF]/25 transition-all duration-300"
              >
                {/* Accent Glow Corner */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00F0FF] to-transparent opacity-60" />

                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-[#00F0FF]" />
                    <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase">EDUCATION</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  {edu.gpa && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-xs font-mono">
                      {edu.gpa}
                    </div>
                  )}
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white mb-1.5">
                    {edu.title}
                  </h3>
                  <p className="text-sm font-mono text-slate-400 mb-4">{edu.institution}</p>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── Certifications ──────────────────────────────────── */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            {certificationsData.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 border border-[#00F0FF]/20 bg-[#00F0FF]/[0.02] hover:border-[#00F0FF]/40 transition-all duration-300 shadow-[0_0_40px_rgba(0,240,255,0.04)]"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00F0FF]" />

                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#00F0FF]" />
                    <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase">Certified</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">{cert.year}</div>
                  <div className="mt-3 w-10 h-10 rounded-full border-2 border-[#00F0FF]/50 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white mb-1.5">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-mono text-[#00F0FF] mb-4">{cert.issuer}</p>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Smooth Bottom Fade-Out Gradient ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080B11] to-transparent pointer-events-none z-10" />
    </section>
  );
}

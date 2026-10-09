import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  X, 
  CheckCircle2,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';

/* ─── ProjectCard — Full viewport card ───────────────────────────────── */
function ProjectCard({ project, index, onClick }) {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      className="relative w-[85vw] sm:w-[70vw] lg:w-[55vw] xl:w-[48vw] shrink-0 h-[60vh] sm:h-[62vh] min-h-[420px] max-h-[560px] flex flex-col"
      style={{ paddingRight: '2rem' }}
    >
      {/* Card Container */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onClick(project)}
        className="group relative flex flex-col h-full bg-[#0A0E17] border border-white/10 hover:border-[#00F0FF]/40 overflow-hidden cursor-pointer transition-colors duration-300"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        {/* Image Area (top ~55% of card) */}
        <div className="relative flex-shrink-0 h-[55%] overflow-hidden bg-black/40">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00F0FF]/10 to-transparent flex items-center justify-center">
              <span className="font-display text-6xl text-[#00F0FF]/20 uppercase">{formattedIndex}</span>
            </div>
          )}

          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/20 to-transparent" />

          {/* Index badge top-left */}
          <div className="absolute top-5 left-5 font-mono text-xs text-[#00F0FF] tracking-widest opacity-70">
            /{formattedIndex}
          </div>

          {/* Category badge top-right */}
          <div className="absolute top-5 right-5 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 backdrop-blur-sm">
            {project.badge || project.category}
          </div>
        </div>

        {/* Content Area (bottom ~45%) */}
        <div className="flex flex-col flex-1 justify-between p-6 sm:p-7">
          <div>
            <p className="text-xs font-mono text-slate-400 mb-2 tracking-widest uppercase">
              {project.client}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-300 leading-tight mb-3">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-2">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/8">
            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[10px] font-mono text-slate-400 px-2 py-0.5 bg-white/[0.03] border border-white/8">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[10px] font-mono text-slate-500 px-1 py-0.5">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>

            {/* Reveal button */}
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#00F0FF] group-hover:border-[#00F0FF] transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom cyan glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF] to-[#00F0FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_#00F0FF]" />
      </motion.div>
    </div>
  );
}

/* ─── Case Study Modal ────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [activeGalleryImage, setActiveGalleryImage] = React.useState(project.image);

  React.useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 md:p-10 select-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        data-lenis-prevent="true"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl h-[90vh] bg-[#0A0E17] border border-white/15 overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
      >
        {/* Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B11]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase px-2 py-0.5 bg-[#00F0FF]/10 border border-[#00F0FF]/30">
              {project.badge || project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.client}</span>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Tutup">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-8 custom-modal-scroll"
        >
          <div>
            <h3 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-3">{project.title}</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{project.tagline}</p>
          </div>

          {activeGalleryImage && (
            <div className="w-full bg-black/50 border border-white/10 overflow-hidden">
              <img src={activeGalleryImage} alt={project.title} className="w-full h-auto max-h-[420px] object-contain sm:object-cover mx-auto" />
            </div>
          )}

          {project.gallery && project.gallery.length > 1 && (
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">GALERI TAMPILAN PROYEK:</span>
              <div className="grid grid-cols-3 gap-3">
                {project.gallery.map((item) => (
                  <button key={item.url} type="button" onClick={() => setActiveGalleryImage(item.url)}
                    className={`text-left border transition-all p-1 bg-black/40 ${activeGalleryImage === item.url ? 'border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'}`}>
                    <img src={item.url} alt={item.label} className="w-full h-16 sm:h-20 object-cover mb-1" />
                    <p className="text-[10px] font-mono text-slate-400 line-clamp-1">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white/[0.02] border border-white/5 font-mono text-xs">
            <div><span className="text-slate-500 uppercase block text-[10px]">TIPE</span><span className="text-white font-medium">{project.type || project.category}</span></div>
            <div><span className="text-slate-500 uppercase block text-[10px]">METODOLOGI</span><span className="text-white font-medium">{project.methodology || 'Agile'}</span></div>
            <div><span className="text-slate-500 uppercase block text-[10px]">KLIEN</span><span className="text-[#00F0FF] font-medium">{project.client}</span></div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase mb-2">RINGKASAN</h4>
            <p className="text-slate-300 text-sm leading-relaxed font-light">{project.overview}</p>
          </div>

          {project.highlights && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase mb-3">POIN KUNCI</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {project.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.01] p-3 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">TEKNOLOGI</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs font-mono text-[#00F0FF] px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/20">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="shrink-0 p-4 border-t border-white/10 bg-[#080B11] flex justify-between items-center text-xs font-mono text-slate-400">
          <span className="hidden sm:inline">PORTFOLIO CASE STUDY</span>
          <span className="text-[10px] text-slate-500">Tekan ESC atau klik luar modal</span>
          <button type="button" onClick={onClose} className="px-5 py-2 bg-[#00F0FF] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors">
            Tutup [ESC]
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Projects Section — Horizontal Scroll Driven ───────────────── */
export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const totalProjects = projectsData.length;

  // Manual scroll progress MotionValue synced with Lenis
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    function updateProgress() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionH = el.offsetHeight - window.innerHeight;
      // How far the top of the section has traveled above the viewport
      const traveled = -rect.top;
      const progress = Math.max(0, Math.min(1, traveled / sectionH));
      scrollProgress.set(progress);
    }

    // Listen to Lenis scroll events for smooth updates
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on('scroll', updateProgress);
    }
    // Also listen to native scroll as fallback
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      if (lenis) lenis.off('scroll', updateProgress);
      window.removeEventListener('scroll', updateProgress);
    };
  }, [scrollProgress]);

  // Scroll vertikal → translate horizontal (jarak proporsional tanpa gap kosong)
  const scrollDistance = (totalProjects - 1) * 52;
  const x = useTransform(
    scrollProgress,
    [0, 1],
    ['0vw', `-${scrollDistance}vw`]
  );

  // Entry animation: subtle smooth settle
  const entryOpacity = useTransform(scrollProgress, [0, 0.03], [0.9, 1]);
  const entryY       = useTransform(scrollProgress, [0, 0.05], [15, 0]);

  // Modal scroll lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    }
  }, [selectedProject]);

  return (
    <>
      {/* ─── Section Wrapper — tinggi proporsional, tanpa gap berlebih ── */}
      <section
        ref={sectionRef}
        id="works"
        className="relative border-t border-white/10"
        style={{ height: `calc(100vh + ${scrollDistance}vw)` }}
      >
        {/* ─── Sticky Viewport — muat pas di bawah Navbar ──────────── */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#080B11] flex flex-col pt-14 sm:pt-16 pb-10 relative">

          {/* ── Static Ambient Glow (no animation for perf) ── */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[300px] bg-gradient-to-r from-transparent via-[#00F0FF]/[0.025] to-blue-500/[0.02] blur-[100px] pointer-events-none" aria-hidden="true" />

          {/* ── Section Header — slides up smoothly ──────────────── */}
          <motion.div
            style={{ opacity: entryOpacity, y: entryY }}
            className="shrink-0 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-0 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/8"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono tracking-[0.25em] text-slate-400 uppercase">
                <span className="text-[#00F0FF] font-bold">[ 03 / SELECTED WORKS ]</span>
                <span>&bull;</span>
                <span>SCROLL TO EXPLORE &rarr;</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.9] text-white">
                CRAFTED <span className="text-[#00F0FF] drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">PROJECTS.</span>
              </h2>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-32 sm:w-48 h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                  style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
                {totalProjects} PROJECTS
              </span>
            </div>
          </motion.div>

          {/* ── Horizontal Sliding Track — slides up on entry ─────── */}
          <motion.div
            style={{ opacity: entryOpacity, y: entryY }}
            className="flex-1 min-h-0 flex items-center overflow-visible px-6 sm:px-12 pt-3 sm:pt-4 pb-1 sm:pb-2"
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-stretch h-full gap-0"
            >
              {projectsData.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onClick={(p) => setSelectedProject(p)}
                />
              ))}

              {/* End-of-track CTA card */}
              <div className="w-[35vw] sm:w-[28vw] lg:w-[22vw] shrink-0 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-[#00F0FF]/40 flex items-center justify-center mx-auto">
                    <span className="font-display text-2xl text-[#00F0FF]">↑</span>
                  </div>
                  <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-slate-500">
                    SCROLL UP<br/>TO RESTART
                  </p>
                  <div className="w-12 h-[1px] bg-[#00F0FF]/30 mx-auto" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Bottom Hint Bar ──────────────────────────────────── */}
          <div className="shrink-0 border-t border-white/8 px-6 sm:px-12 py-2 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>SCROLL DOWN TO ADVANCE &darr;</span>
            <span>CLICK CARD FOR CASE STUDY &rarr;</span>
          </div>
        </div>
      </section>

      {/* ─── Case Study Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

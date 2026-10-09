import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  X, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  User, 
  Briefcase,
  ChevronRight,
  Eye
} from 'lucide-react';
import { projectsData, projectCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(null);

  // Kunci scroll background (termasuk Lenis) saat modal terbuka
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [selectedProject]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setActiveModalImage(project.image);
  };

  const filteredProjects = activeCategory === 'Semua'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      {/* Background Ambience */}
      <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio Proyek</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Karya Pilihan & <span className="text-gradient-cyan">Hasil Eksplorasi</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Kumpulan aplikasi web, landing page komersial, serta studi kasus UI/UX yang telah saya selesaikan.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === category
                    ? 'text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="category-tab-active"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl shadow-lg shadow-cyan-500/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <TiltCard className="group rounded-3xl glass-card overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 h-full">
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Category & Badge Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[90%]">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md border border-white/10 text-cyan-300">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-500/20 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-sm">
                          ★ {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Hover quick preview button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="px-4 py-2 rounded-xl bg-cyan-400/90 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xl backdrop-blur-md scale-95 group-hover:scale-100 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail Cepat</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-cyan-400" />
                      <span>{project.client}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {project.overview}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[10px] text-slate-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-500 font-medium">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 text-xs font-semibold text-slate-200 hover:text-cyan-300 flex items-center justify-between transition-all"
                  >
                    <span>Pelajari Studi Kasus</span>
                    <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              data-lenis-prevent
              className="relative w-full max-w-3xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col overscroll-contain"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Hero & Gallery Display */}
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-950">
                    <img
                      src={activeModalImage || selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-auto object-cover max-h-[420px] transition-all duration-300"
                    />
                  </div>

                  {/* Multi-image Gallery Selector */}
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {selectedProject.gallery.map((item, idx) => {
                        const isCurrent = (activeModalImage || selectedProject.image) === item.url;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveModalImage(item.url)}
                            className={`p-1.5 rounded-xl text-left border transition-all ${
                              isCurrent
                                ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-500/20'
                                : 'bg-slate-950/60 border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={item.url}
                              alt={item.label}
                              className="w-full h-16 object-cover rounded-lg mb-1.5"
                            />
                            <span className="block text-[10px] text-slate-300 font-medium line-clamp-1">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Info Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Klien / Lembaga</span>
                    <span className="text-xs font-semibold text-white truncate block">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Tipe Proyek</span>
                    <span className="text-xs font-semibold text-white truncate block">{selectedProject.type}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Kategori Utama</span>
                    <span className="text-xs font-semibold text-cyan-400">{selectedProject.category}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Metodologi</span>
                    <span className="text-xs font-semibold text-indigo-300">{selectedProject.methodology || "SDLC"}</span>
                  </div>
                </div>

                {/* Deskripsi & Ringkasan */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Ringkasan Solusi</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProject.overview}
                  </p>
                </div>

                {/* Key Highlights */}
                {selectedProject.highlights && (
                  <div className="space-y-2.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Sorotan Utama & Fitur</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedProject.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Teknologi yang Dipakai</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-white/10 bg-slate-900/80 backdrop-blur-md flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Tutup
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
                >
                  Diskusi Proyek Mirip Ini
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

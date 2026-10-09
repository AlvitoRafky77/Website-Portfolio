import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Cpu, 
  Layout, 
  Database, 
  Globe, 
  GitBranch, 
  Wrench, 
  CheckCircle2, 
  Terminal, 
  Layers 
} from 'lucide-react';
import { FigmaIcon } from './Icons';
import { skillsData } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';

const iconMap = {
  Code2: Code2,
  Palette: Palette,
  Cpu: Cpu,
  Figma: FigmaIcon,
  Layout: Layout,
  Database: Database,
  Globe: Globe,
  GitBranch: GitBranch,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const categories = ['Semua', 'Backend', 'Frontend', 'Design', 'Analyst', 'Tools'];

  const filteredSkills = activeCategory === 'Semua' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>Tech Stack & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Keahlian & <span className="text-gradient-cyan">Teknologi Andal</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Perangkat lunak, bahasa pemrograman, dan metodologi yang saya gunakan untuk mewujudkan produk digital nyata.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with Modern Spotlight Cards (No Percentages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SpotlightCard
                  className="h-full flex flex-col justify-between p-6 border-slate-800/80 hover:border-cyan-500/30 transition-all"
                  spotlightColor="rgba(56, 189, 248, 0.14)"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shadow-inner">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-cyan-300 border border-cyan-500/20">
                        {skill.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Competency Tags */}
                  <div className="mt-5 pt-3.5 border-t border-white/5 flex flex-wrap gap-1.5">
                    {skill.tags?.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Complementary Tools Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Alur Kerja & Standar Proyek</h4>
              <p className="text-xs text-slate-400">Responsive Design, Git Version Control, SEO On-page, Performance First</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Best Web Practices
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

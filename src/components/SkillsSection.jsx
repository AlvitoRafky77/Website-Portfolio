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
  const categories = ['Semua', 'Frontend', 'Design', 'Backend', 'Tools'];

  const filteredSkills = activeCategory === 'Semua' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory || (activeCategory === 'Tools' && s.category === 'CMS'));

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
            Perangkat lunak dan bahasa pemrograman yang saya gunakan untuk mewujudkan ide menjadi kenyataan.
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

        {/* Skills Grid with Spotlight Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className="h-full flex flex-col justify-between p-5"
                  spotlightColor="rgba(56, 189, 248, 0.15)"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                        {skill.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="flex justify-between items-center text-[11px] mb-1.5">
                      <span className="text-slate-400">Tingkat Kemahiran</span>
                      <span className="font-semibold text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      />
                    </div>
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

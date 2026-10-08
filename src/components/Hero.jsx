import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Send, ArrowDown, Code, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThreeCanvas from './ThreeCanvas';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* 3D Three.js Interactive Cyber Mesh & Particle Field */}
      <ThreeCanvas />

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[280px] h-[280px] bg-cyan-600/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto px-5 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium backdrop-blur-md shadow-sm shadow-cyan-950"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Certified System Analyst (BNSP) • Open to Work</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-slate-400 font-medium text-sm sm:text-base tracking-wide">
                Halo, saya 👋
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {personalInfo.name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                {personalInfo.role}
              </p>
            </motion.div>

            {/* Description & Motto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                {personalInfo.bio}
              </p>
              <blockquote className="border-l-2 border-cyan-500/40 pl-3.5 py-1 text-xs sm:text-sm text-slate-400 italic">
                "{personalInfo.motto}"
              </blockquote>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <span>Lihat Portofolio</span>
                <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              </a>

              <a
                href={personalInfo.cvUrl}
                download
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 font-semibold px-5 py-3.5 rounded-xl transition-all duration-300 text-sm backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Unduh CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 font-medium px-3 py-3 rounded-xl transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Diskusi Proyek</span>
              </a>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-bold text-white">3.89</span>
                <span className="text-[11px] text-cyan-400 font-semibold uppercase tracking-wider">IPK Skala 4.00</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-bold text-cyan-400">BNSP</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">System Analyst</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-bold text-indigo-400">Laravel & UI</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">E-Commerce TA</span>
              </div>
            </motion.div>

          </div>

          {/* Right Visual / Avatar Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-72 sm:w-80"
            >
              {/* Glowing Aura Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-3xl blur-xl opacity-40 animate-pulse-slow" />

              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl p-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center group">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // fallback if image not found
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {/* Subtle Gradient Over Avatar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  {/* Overlay Info at bottom of avatar */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        {personalInfo.shortName}
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </p>
                      <p className="text-[10px] text-slate-400">{personalInfo.location}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-medium">
                      Student Dev
                    </span>
                  </div>
                </div>

                {/* Floating pill badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-3 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-2.5 shadow-lg flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Code className="w-4 h-4" />
                  </div>
                  <div className="pr-1">
                    <span className="text-[10px] text-slate-400 block font-medium">Spesialisasi</span>
                    <span className="text-xs font-bold text-white">Fullstack & UI</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors group"
          >
            <span className="text-[11px] tracking-widest uppercase">Scroll ke bawah</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </a>
        </div>

      </div>
    </section>
  );
}

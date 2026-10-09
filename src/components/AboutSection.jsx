import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Sparkles, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Building2, 
  Users, 
  Compass, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { personalInfo, educationHistory, experienceData, certificationsData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('experience');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bentoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header smooth scroll reveal with subtle scale
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Staggered Bento Cards Entrance
      const cards = bentoRef.current?.querySelectorAll('.gsap-bento-card');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bentoRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      {/* Background Ambience */}
      <div className="absolute left-1/4 top-1/3 w-[500px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang & Rekam Jejak</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perpaduan Analisis Sistem & <span className="text-gradient-cyan">Pengembangan Web</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Membangun produk digital berskala fungsional yang teruji dari analisis kebutuhan bisnis hingga implementasi kode.
          </p>
        </div>

        {/* Bento Top Row */}
        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">

          {/* Bento 1: Professional Summary (8 Cols) */}
          <div
            className="gsap-bento-card md:col-span-8 p-6 sm:p-8 rounded-3xl glass-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>BNSP Certified Analyst</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Dedikasi untuk Rekayasa Perangkat Lunak Berkualitas
              </h3>
              
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Saya adalah lulusan <strong className="text-white">S1 Sistem Informasi Telkom University Jakarta</strong> dengan raihan <strong className="text-cyan-400">IPK 3.89/4.00</strong>. Saya memiliki keahlian mendalam dalam siklus hidup pengembangan sistem (*SDLC*), mulai dari *business process modeling*, pembuatan diagram UML, perancangan antarmuka Figma, hingga koding arsitektur web berbasis <strong className="text-white">Laravel, PHP, MySQL, JavaScript, dan React</strong>.
                </p>
                <p>
                  Pada proyek Tugas Akhir, saya merancang dan mengembangkan platform e-commerce enterprise B2B & B2C terintegrasi fitur <strong className="text-white">Chatbot cerdas</strong> dan <strong className="text-white">Payment Gateway</strong> untuk PT Agro Pangan Maju menggunakan metodologi Waterfall.
                </p>
              </div>
            </div>

            {/* Certification Highlight Strip */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Sertifikasi Keahlian Resmi</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  System Analyst — Badan Nasional Sertifikasi Profesi (BNSP)
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-semibold">
                Tahun 2025
              </span>
            </div>
          </div>

          {/* Bento 2: Quick Info Bio Card (4 Cols) */}
          <div
            className="gsap-bento-card md:col-span-4 p-6 sm:p-8 rounded-3xl glass-card flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <span>Informasi Kunci</span>
              </h3>
              
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3 backdrop-blur-md">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Pendidikan & IPK</span>
                    <span className="text-xs font-bold text-white">Telkom University</span>
                    <span className="text-[11px] text-cyan-400 block font-semibold">{personalInfo.gpa}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Domisili</span>
                    <span className="text-xs font-semibold text-slate-200">{personalInfo.location}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3 backdrop-blur-md">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-[11px] text-slate-400 block font-medium">Email</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs font-semibold text-slate-200 hover:text-cyan-400 truncate block transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 relative z-10">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Status Ketersediaan</span>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Terbuka untuk Full-Time & Project Roles
              </p>
            </div>
          </div>

        </div>

        {/* Bento Bottom Row: Interactive Experience & Education Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl glass-card"
        >
          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Riwayat Pengalaman & Rekam Jejak</h3>
            </div>

            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'experience'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pengalaman Kerja ({experienceData.filter(e => e.type !== 'Organisasi' && e.type !== 'Kepanitiaan').length})
              </button>

              <button
                onClick={() => setActiveTab('organization')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'organization'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Organisasi & Akademik
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'education'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pendidikan
              </button>
            </div>
          </div>

          {/* Content Lists */}
          <AnimatePresence mode="wait">
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {experienceData.filter(e => e.type === 'Internship' || e.type === 'Freelance').map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{exp.role}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 font-normal">{exp.location}</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium px-2.5 py-1 rounded-lg bg-white/5">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{exp.period}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{exp.description}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {exp.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'organization' && (
              <motion.div
                key="organization"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {experienceData.filter(e => e.type === 'Organisasi' || e.type === 'Academic' || e.type === 'Kepanitiaan').map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all space-y-2.5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{exp.role}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium px-2.5 py-1 rounded-lg bg-white/5">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{exp.period}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {exp.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {educationHistory.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-[11px] font-bold mb-1">
                          {edu.period}
                        </span>
                        <h4 className="text-base font-bold text-white">{edu.title}</h4>
                        <p className="text-xs text-cyan-400 font-semibold">{edu.institution}</p>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        {edu.gpa}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
}

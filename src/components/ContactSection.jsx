import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight,
  MessageCircle,
  FileText,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#f43f5e']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const contactMethods = [
    {
      title: "Direct Email",
      label: "alvitorafky44@gmail.com",
      desc: "Kirimkan penawaran proyek, diskusi teknis, atau undangan wawancara langsung ke inbox saya.",
      icon: Mail,
      actionType: "email",
      color: "from-cyan-500/20 to-sky-500/20",
      accent: "text-cyan-400",
      borderGlow: "rgba(56, 189, 248, 0.25)"
    },
    {
      title: "WhatsApp Chat",
      label: "+62 859-3906-8685",
      desc: "Diskusi cepat dan responsif untuk konsultasi awal maupun follow-up kerja sama.",
      icon: MessageCircle,
      href: personalInfo.socials.whatsapp,
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400",
      borderGlow: "rgba(52, 211, 153, 0.25)"
    },
    {
      title: "LinkedIn Profile",
      label: "linkedin.com/in/alvito-rafky",
      desc: "Mari terhubung secara profesional dan perluas jejaring karir di industri teknologi.",
      icon: LinkedinIcon,
      href: personalInfo.socials.linkedin,
      color: "from-blue-500/20 to-indigo-500/20",
      accent: "text-sky-400",
      borderGlow: "rgba(96, 165, 250, 0.25)"
    },
    {
      title: "GitHub Repository",
      label: "github.com/AlvitoRafky77",
      desc: "Eksplorasi kode sumber proyek, riwayat commit, dan eksplorasi teknologi terbaru saya.",
      icon: GithubIcon,
      href: personalInfo.socials.github,
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400",
      borderGlow: "rgba(192, 132, 252, 0.25)"
    }
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Dynamic Background Glows & Ambient Mesh */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute right-10 bottom-10 w-80 h-80 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Mari Terhubung & Berkolaborasi</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Siap Membangun Solusi Digital <span className="text-gradient-cyan">Kelas Dunia?</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Terbuka untuk peluang karir penuh waktu (Full-Time), kontrak, maupun proyek freelance pengembangan sistem dan UI/UX modern.
          </motion.p>
        </div>

        {/* Main Interactive Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SpotlightCard
                  className="h-full flex flex-col justify-between p-7 border-slate-800/80 hover:border-slate-700 transition-all group"
                  spotlightColor={method.borderGlow}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${method.color} border border-white/10 flex items-center justify-center ${method.accent} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {method.actionType === 'email' ? (
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          Respon Utama
                        </span>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 block mb-1">
                        {method.title}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {method.label}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mt-2">
                        {method.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    {method.actionType === 'email' ? (
                      <div className="flex gap-2.5">
                        <button
                          onClick={handleCopyEmail}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Tersalin ke Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-cyan-400" />
                              <span>Salin Alamat Email</span>
                            </>
                          )}
                        </button>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="py-2.5 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Kirim</span>
                          <Send className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:underline"
                      >
                        <span>Buka {method.title}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust & Availability Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Status: Tersedia untuk Rekrutmen</span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                Domisili Jakarta, Indonesia • Siap Onsite / Remote
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Memiliki sertifikasi resmi BNSP System Analyst dan portofolio enterprise e-commerce teruji.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="./CV_ALVITO_RAFKY.pdf"
              download
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download CV Resmi</span>
            </a>
            <a
              href={personalInfo.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Hubungi via WA</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


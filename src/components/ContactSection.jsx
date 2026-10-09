import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  ArrowUpRight,
  MessageCircle,
  Download,
  MapPin,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#00F0FF', '#38bdf8', '#ffffff']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const contactChannels = [
    {
      num: '01',
      title: 'WHATSAPP DIRECT',
      detail: personalInfo.phone,
      desc: 'Konsultasi cepat & responsif via pesan instan.',
      href: personalInfo.socials.whatsapp,
      icon: MessageCircle,
      actionText: 'CHAT VIA WHATSAPP',
      isExternal: true,
    },
    {
      num: '02',
      title: 'LINKEDIN NETWORK',
      detail: 'alvito-rafky-sumeri',
      desc: 'Terhubung profesional & tinjau riwayat karir.',
      href: personalInfo.socials.linkedin,
      icon: LinkedinIcon,
      actionText: 'VIEW PROFILE',
      isExternal: true,
    },
    {
      num: '03',
      title: 'GITHUB PROFILE',
      detail: 'github.com/AlvitoRafky77',
      desc: 'Eksplorasi kode sumber & repositori proyek.',
      href: personalInfo.socials.github,
      icon: GithubIcon,
      actionText: 'EXPLORE REPOSITORIES',
      isExternal: true,
    },
    {
      num: '04',
      title: 'CURRICULUM VITAE',
      detail: 'Official Resume 2026',
      desc: 'Unduh berkas CV lengkap format PDF terverifikasi.',
      href: personalInfo.cvUrl,
      download: 'CV - Alvito Rafky Sumeri.pdf',
      icon: Download,
      actionText: 'DOWNLOAD CV (PDF)',
      isDownload: true,
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full bg-[#080B11] text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* ── Animated Orbital Radar Beacon Background ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-[#00F0FF]/15 pointer-events-none animate-radar" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-cyan-500/10 pointer-events-none animate-radar [animation-delay:2s]" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 blur-[170px] rounded-full pointer-events-none animate-pulse-slow" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Top Header Strip ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.25em] text-slate-400 uppercase">
              <span className="text-[#00F0FF] font-bold">[ 05 / GET IN TOUCH ]</span>
              <span>&bull;</span>
              <span>INITIATE COLLABORATION</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-[0.88] text-white">
              LET'S WORK <span className="text-[#00F0FF]">TOGETHER.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2 text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
              <span>AVAILABLE FOR WORK &bull; FULL-TIME / FREELANCE</span>
            </div>
            <div className="text-slate-500 uppercase">
              JAKARTA TIMUR, INDONESIA &bull; UTC+7 (WIB)
            </div>
          </div>
        </div>

        {/* ── Heroic Primary Email Banner (The Aesthetic Centerpiece) ── */}
        <div className="relative p-8 sm:p-12 bg-[#0A0E17] border border-white/10 mb-8 overflow-hidden group hover:border-[#00F0FF]/40 transition-colors duration-300">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_15px_#00F0FF]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                <Mail className="w-4 h-4 text-[#00F0FF]" />
                <span>PRIMARY CONTACT CHANNEL</span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-2 select-all">
                {personalInfo.email}
              </h3>
              <p className="text-slate-400 text-sm font-light max-w-xl leading-relaxed">
                Tertarik mendiskusikan peluang proyek web baru, rekayasa arsitektur sistem informasi, atau penawaran kerja sama? Inbox saya selalu terbuka.
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 font-mono text-xs uppercase tracking-widest border border-white/15 bg-white/[0.03] hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 text-white transition-all duration-200"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#00F0FF]" />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
              </button>

              <a
                href={`mailto:${personalInfo.email}?subject=Project Collaboration Inquiry`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 font-mono text-xs uppercase tracking-widest bg-[#00F0FF] text-black font-bold hover:bg-[#00F0FF]/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>OPEN EMAIL APP</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ── 4-Column Aesthetic Direct Channels Grid ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.num}
                href={channel.href}
                target={channel.isExternal ? '_blank' : undefined}
                rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                download={channel.download}
                className="group relative p-6 bg-[#0A0E17] border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 border border-white/10 group-hover:border-[#00F0FF]/40 bg-[#080B11] flex items-center justify-center text-[#00F0FF] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-500">/{channel.num}</span>
                  </div>

                  <h4 className="font-display text-lg uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors mb-1">
                    {channel.title}
                  </h4>
                  <p className="font-mono text-xs text-[#00F0FF]/90 mb-2 truncate">
                    {channel.detail}
                  </p>
                  <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                    {channel.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/8 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                  <span>{channel.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* ── Editorial Verification Badge Strip ──────────────────── */}
        <div className="mt-8 p-5 border border-white/10 bg-[#0A0E17] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-white font-medium">BNSP CERTIFIED SYSTEM ANALYST</span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">NO. SERTIFIKASI RESMI TAHUN 2025</span>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#00F0FF]" />
            <span>UNIVERSITAS TELKOM JAKARTA (IPK 3.89/4.00)</span>
          </div>
        </div>

      </div>
    </section>
  );
}

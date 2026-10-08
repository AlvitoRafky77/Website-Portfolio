import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, MessageSquare, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#34d399']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || `Pesan dari ${formData.name}`
    )}&body=${encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    )}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hubungi Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Punya Ide Proyek? <span className="text-gradient-cyan">Mari Wujudkan Bersama</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Silakan tinggalkan pesan untuk mendiskusikan peluang kerja sama, freelance, atau tawaran posisi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs text-slate-400 font-medium">Kirimkan Email Langsung Ke</span>
                <p className="text-base font-bold text-white break-all mt-0.5">
                  {personalInfo.email}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin ke Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>Salin Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <span>Buka Mail</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social & Location Quick Cards */}
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <h3 className="text-sm font-bold text-white">Tautan Sosial & Jejaring</h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center gap-2.5 transition-colors group"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300 group-hover:text-white shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">GitHub</span>
                    <span className="text-[10px] text-slate-400 block truncate">AlvitoRafky77</span>
                  </div>
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center gap-2.5 transition-colors group"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">LinkedIn</span>
                    <span className="text-[10px] text-slate-400 block truncate">alvito-rafky</span>
                  </div>
                </a>

                <a
                  href={personalInfo.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center gap-2.5 transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">WhatsApp</span>
                    <span className="text-[10px] text-slate-400 block truncate">0859-3906-8685</span>
                  </div>
                </a>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">Domisili</span>
                    <span className="text-[10px] text-slate-400 block truncate">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Fast Response
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Biasanya saya membalas email dalam kurun waktu kurang dari 24 jam pada hari kerja.
              </p>
            </div>

          </div>

          {/* Right Form Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-card">
              <h3 className="text-xl font-bold text-white mb-2">Kirim Pesan Cepat</h3>
              <p className="text-xs text-slate-400 mb-6">
                Isi form berikut untuk mengirimkan deskripsi proyek atau pertanyaan secara terstruktur.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Anda</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Anda</label>
                    <input
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Subjek / Topik</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tawaran Kolaborasi Pembuatan Website"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Detail Pesan</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Ceritakan detail kebutuhan proyek atau pesan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

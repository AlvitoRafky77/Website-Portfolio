import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ isVisible, onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Kunci scroll halaman saat preloader aktif
    document.body.style.overflow = 'hidden';

    // Animasi counter 0 ke 100 dengan easing bertahap
    const duration = 2000; // 2 detik
    const startTime = performance.now();

    let animationFrameId;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Kurva kemudahan (ease-out cubic) agar melambat menjelang 100%
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * 100);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        // Jeda sepersekian detik di 100% sebelum transisi slide-up keluar
        setTimeout(() => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#080B11] text-white flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Subtle Ambient Blue Glow in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

          {/* Top Bar: Editorial Meta Info */}
          <div className="relative z-10 flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              [ PORTFOLIO / 2026 ]
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 text-[#00F0FF]"
            >
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
              <span>AVAILABLE FOR WORK</span>
            </motion.div>
          </div>

          {/* Center: Bold Editorial Typography */}
          <div className="relative z-10 w-full my-auto py-12 flex flex-col items-center justify-center text-center">
            {/* Tag / Peran */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-slate-400 mb-4"
            >
              FRONT-END DEVELOPER &bull; UI/UX ENTHUSIAST
            </motion.div>

            {/* Nama Besar Bold Condensed (Anton) */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-none"
              >
                ALVITO RAFKY<span className="text-[#00F0FF]">.</span>
              </motion.h1>
            </div>

            {/* Sub-line garis aksen cyan/blue */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mt-6 origin-center shadow-[0_0_12px_rgba(0,240,255,0.8)]"
            />
          </div>

          {/* Bottom Bar: Progress Bar & Numeric Counter */}
          <div className="relative z-10 w-full flex flex-col gap-3">
            <div className="flex justify-between items-end font-mono text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                <span className="tracking-widest uppercase">INITIALIZING SYSTEM</span>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl md:text-5xl font-display text-white tracking-wider">
                  {String(count).padStart(3, '0')}
                </span>
                <span className="text-[#00F0FF] font-display text-xl sm:text-2xl ml-1">%</span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full h-[2px] bg-slate-800/80 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-cyan-500 via-[#00F0FF] to-sky-300 shadow-[0_0_12px_rgba(0,240,255,0.7)]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

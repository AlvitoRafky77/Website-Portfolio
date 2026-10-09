import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Inisialisasi Lenis Smooth Scroll ala landonorris.com
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut easing
      direction: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Sinkronkan Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      delete window.__lenis;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-slate-100 flex flex-col overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}


// CustomCursor.jsx
// Komponen ini menggantikan cursor default browser dengan dua elemen:
//   1. Titik kecil (dot) — mengikuti mouse persis
//   2. Cincin besar (ring) — mengikuti mouse dengan delay, membesar saat hover link

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);   // Referensi ke elemen titik
  const ringRef = useRef(null);   // Referensi ke elemen cincin

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;   // Posisi mouse saat ini
    let ringX  = 0, ringY  = 0;   // Posisi ring (diperbarui perlahan)
    let rafId  = null;            // ID requestAnimationFrame untuk cleanup

    // Update posisi dot LANGSUNG mengikuti mouse
    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    }

    // Ring mengikuti mouse dengan "easing" (terasa lambat/smooth)
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;   // 12% mendekati target tiap frame
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      rafId = requestAnimationFrame(animateRing);
    }
    rafId = requestAnimationFrame(animateRing);

    // Saat hover link/button: cursor membesar
    function onEnter() {
      ring.classList.add("hovered");
      dot.classList.add("hovered");
    }
    function onLeave() {
      ring.classList.remove("hovered");
      dot.classList.remove("hovered");
    }

    window.addEventListener("mousemove", onMouseMove);

    // Pasang hover listener ke semua <a> dan <button>
    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Cleanup: hapus semua listener dan hentikan animasi saat komponen unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

// useScrollProgress.js
// Hook ini melacak seberapa jauh halaman sudah di-scroll (0 = atas, 1 = bawah)
// Dipakai untuk: scroll progress bar tipis di atas halaman

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fungsi ini dipanggil setiap kali user scroll
    function handleScroll() {
      const scrollTop    = window.scrollY;                                   // Seberapa jauh sudah scroll (px)
      const docHeight    = document.documentElement.scrollHeight;            // Total tinggi dokumen
      const windowHeight = window.innerHeight;                               // Tinggi jendela browser
      const scrollable   = docHeight - windowHeight;                         // Total jarak yang bisa di-scroll

      // Hitung rasio 0-1, lalu kalikan 100 jadi persen
      const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      setProgress(pct);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);         // Cleanup: hapus listener saat komponen unmount
  }, []);

  return progress; // Nilai 0–100
}

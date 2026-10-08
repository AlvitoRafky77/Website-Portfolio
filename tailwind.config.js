/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090D16',
        surface: '#0F172A',
        surfaceElevated: '#17223B',
        accentCyan: '#38BDF8',
        accentBlue: '#60A5FA',
        accentIndigo: '#6366F1',
        borderSoft: 'rgba(255, 255, 255, 0.08)',
        borderHighlight: 'rgba(56, 189, 248, 0.3)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        glowLg: '0 0 50px -10px rgba(56, 189, 248, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

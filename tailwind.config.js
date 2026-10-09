/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:          "#080B11",
        surface:     "#0F1523",
        accent:      "#00F0FF",
        "accent-blue": "#38BDF8",
        muted:       "#94A3B8",
        border:      "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["Anton", "Impact", "system-ui", "sans-serif"],
        inter:   ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee":   "marquee 90s linear infinite",
        "marquee-r": "marquee-r 90s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "float":     "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
        "radar":     "radar 4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        marquee:     { from: { transform: "translateX(0%)" },   to: { transform: "translateX(-50%)" } },
        "marquee-r": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0%)" } },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":      { opacity: "0.8", transform: "scale(1.05)" },
        },
        radar: {
          "0%":   { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}

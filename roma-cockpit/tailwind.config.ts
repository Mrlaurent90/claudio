import type { Config } from "tailwindcss";

// The palette is lifted straight from the original HTML (terracotta/cream on a
// warm dark base) and exposed as Tailwind tokens so components stay readable.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0f0e0c", 2: "#1a1714", 3: "#241f1a" },
        paper: { DEFAULT: "#f5f1e8", dim: "#d9cfc0" },
        clay: { DEFAULT: "#da7756", bright: "#e88968", deep: "#b8533a" },
        ink: "#1a1714",
        sand: "#cc9b7a",
        gold: "#e0a458",
        olive: "#9aa861",
        grape: "#b08abd",
        sky: "#7fa8c9",
        // "Italie élégante" earth tones (premium, never kitsch):
        travertin: "#ece3d2", // warm cream stone
        ochre: "#c98a3c", // Roman ochre
        cypress: "#6f7a4a", // deep olive / cypress green
        pompeii: "#8c3b2e", // deep Pompeian red — RARE accent only
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"Outfit"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px -24px rgba(0,0,0,.8)",
        glow: "0 0 40px -8px rgba(218,119,86,.4)",
      },
      borderColor: {
        line: "rgba(245,241,232,.12)",
        line2: "rgba(245,241,232,.22)",
      },
      keyframes: {
        fade: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        fade: "fade .4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

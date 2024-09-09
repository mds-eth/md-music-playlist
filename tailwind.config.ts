import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        equalizer: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.5)" },
        },
      },
      animation: {
        equalizer: "equalizer 0.5s infinite ease-in-out",
      },
      backgroundImage: {
        "dark-music-gradient": "linear-gradient(to bottom, #414345, #08070b)",
        "menu-aside-background": "linear-gradient(to bottom, #1c1c1c, #0E0B0A)",
      },
      colors: {
        "dark-purple": "#6441a5",
        "dark-blue": "#2a0845",
        "gray-dark-1": "#4c4c4c",
        "gray-dark-2": "#3c3c3c",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mad-scientist-bg': '#0d0d0d',   // Dark background
        'mad-scientist-green': '#00ff41', // Neon green
        'mad-scientist-purple': '#7209b7', // Eerie purple
      },
    },
  },
  plugins: [],
};
export default config;

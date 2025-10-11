// tailwind.config.js
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        linkify: {
          background: "#f1f1ee",
          primary: "#000000",
          secondary: "#6366f1",
          text: {
            primary: "#1f2937",
            secondary: "#6b7280",
            muted: "#9ca3af",
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

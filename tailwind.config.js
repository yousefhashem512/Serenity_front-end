/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "spa-gold": "#C49A3C",
        "spa-brown-dark": "#2C1810",
        "spa-brown-mid": "#7A6455",
        "spa-bg": "#FAF8F4",
        "spa-border": "#E8E0D5",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        amiri: ["Amiri", "serif"],
      },
    },
  },
  plugins: [],
};
console.log("TAILWIND CONFIG LOADED");
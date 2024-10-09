/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx, html}",
    "./index.html",
  ],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [
    // require('flowbite/plugin'),
    // require('tailwindcss-line-clamp'),
  ],
}


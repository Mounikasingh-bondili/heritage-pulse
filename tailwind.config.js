/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'heritage': {
          cream: '#FAF3E0',
          maroon: '#800020',
          beige: '#D4C4A8',
          gold: '#C9A84C',
        }
      }
    },
  },
  plugins: [],
}
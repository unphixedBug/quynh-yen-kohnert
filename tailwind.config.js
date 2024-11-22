/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E31C3D',   // Rouge vif
        dark: '#0D0203',      // Noir profond
        light: '#FFFAFA',     // Blanc cassé
        teal: '#003844',      // Bleu/vert foncé
        slate: '#465775',     // Bleu ardoise
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        display: ['Julius Sans One', 'sans-serif'],
      },
      borderRadius: {
        'sm': '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
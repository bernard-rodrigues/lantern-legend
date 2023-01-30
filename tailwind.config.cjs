/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        VT: `'VT323', monospace`
      },
      backgroundImage: {
        titleCover: "url('/src/assets/cover.jpg')"
      }
    },
  },
  plugins: [],
}

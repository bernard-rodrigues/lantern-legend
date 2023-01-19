/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        VT: `'VT323', monospace`
      },
    },
  },
  plugins: [],
}

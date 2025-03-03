import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
}

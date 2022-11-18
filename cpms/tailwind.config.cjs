/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        "primary": "#00ABB3",
        "dark-secondary": "#3C4048",
        "tertiary": "#EAEAEA",
      }
    },

  },
  plugins: [],
}

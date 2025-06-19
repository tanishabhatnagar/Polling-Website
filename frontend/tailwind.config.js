/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // VERY IMPORTANT
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7765DA",
        secondary: "#5767D0",
        accent: "#4F0DCE",
        bg: "#F2F2F2",
        dark: "#373737",
        grayish: "#6E6E6E",
      },
    },
  },
  plugins: [],
}

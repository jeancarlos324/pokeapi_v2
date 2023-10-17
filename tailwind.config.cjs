/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,jsx,js,ts,tsx}",
    "./components/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        fancy: "url(https://beckbusch.github.io/Custom-Rainbow-Cursor-Extension/images/point/pokeball.png), pointer",
      },
    },
  },
  plugins: [],
};

/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,jsx,js,ts,tsx}",
    "./components/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        normal: "#929DA3",
        fighting: "#CE416B",
        flying: "#8FA9DE",
        poison: "#AA6BC8",
        ground: "#D97845",
        rock: "#C5B78C",
        bug: "#91C12F",
        ghost: "#5269AD",
        steel: "#5A8EA2",
        fire: "#FF9D55",
        water: "#5090D6",
        grass: "#73CEC0",
        electric: "#F4D44F",
        psychic: "#EA551E",
        ice: "#73CEC0",
        dragon: "#0B6DC3",
        dark: "#68A090",
        fairy: "#EC8FE6",
        unknown: "#1F4E94",
        shadow: "#999999",
      },
      cursor: {
        fancy:
          "url(https://beckbusch.github.io/Custom-Rainbow-Cursor-Extension/images/point/pokeball.png), pointer",
      },
      dropShadow: {
        selected: ["0 1px 8px rgb(255, 238, 7)", "0 1px 1px rgb(255, 208, 21)"],
        normal: ["0 1px 2px rgb(255, 238, 255)", "0 1px 1px rgb(255, 255, 7)"],
        mitical: ["0 1px 8px rgb(228, 21, 255)", "0 1px 1px rgb(165, 61, 249)"],
        legendary: [
          "0 2px 8px rgb(255, 55, 20)",
          "0 1px 8px rgb(249, 196, 61)",
        ],
      },
      textColor: {
        mitical: "rgb(228, 21, 255)",
        legendary: "rgb(249, 196, 61)",
      },
    },
  },
  plugins: [],
};

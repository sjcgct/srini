/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#292929",
      dominantbg: "#f9f3ee",
      pinkbg: "#efe6f2",
      purplebg: "#e1e9f2",
      greenbg: "#eef9f2",
      pink: "#f9ceee",
      green: "#4cb387",
      darkgreen: "#97c4b8",
      orange: "#f9b68a",
      purple: "#7673e6",
      grey: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "600px",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "800px",
          },
          "@screen xl": {
            maxWidth: "960px",
          },
        },
      });
    },
  ],
  safelist: [
    "transparent",
    "current",
    "white",
    "black",
    "dominantbg",
    "pinkbg",
    "purplebg",
    "greenbg",
    "pink",
    "green",
    "darkgreen",
    "orange",
    "purple",
    "active",
    {
      pattern:
        /(bg|text|border)-(transparent|current|white|black|dominantbg|pinkbg|purplebg|greenbg|pink|green|darkgreen|orange|purple)/,
    },
    {
      pattern: /(bg|text|border)-grey-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
};

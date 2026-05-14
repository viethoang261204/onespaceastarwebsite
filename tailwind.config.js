/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "'Times New Roman'", "serif"],
        body: ["'Be Vietnam Pro'", "system-ui", "sans-serif"],
      },
      colors: {
        astar: {
          bg: "#F4EFE6",
          surface: "#FBF8F3",
          surfaceAlt: "#EFE8D9",
          ink: "#1A1A1A",
          inkSoft: "#4A4742",
          muted: "#8A8377",
          border: "#E0D5BD",
          borderStrong: "#C9BBA0",
          accent: "#B85C38",
          accentDark: "#8F3F22",
          teal: "#1E5F5F",
          tealLight: "#D4E2DE",
          sage: "#7A8B6F",
          sageLight: "#DDE5D3",
          amber: "#D4A056",
          amberLight: "#F4E5C3",
          danger: "#A63E2C",
          dangerLight: "#F0D5CE",
        },
      },
    },
  },
  plugins: [],
}

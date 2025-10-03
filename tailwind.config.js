/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    container: { center: true, padding: "1rem" }
  }},
  plugins: [require("@tailwindcss/typography")],
};

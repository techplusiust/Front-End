import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config: import("tailwindcss").Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui()],
};

export default config;

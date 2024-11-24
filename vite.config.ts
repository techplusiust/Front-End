/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/components"],
      reportsDirectory: "./coverage",
    },
  },
});

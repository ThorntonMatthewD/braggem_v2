import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: process.env.mode === "production" ? "/static/" : "/",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    manifest: true,
    modulePreload: true,
  },
});

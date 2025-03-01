import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure Vercel picks up the correct directory
    emptyOutDir: true, // Clean the output directory before building
  },
  server: {
    port: 5173, // Default Vite port (adjust if necessary)
    strictPort: true,
  },
  define: {
    "process.env": {}, // Prevent "process is not defined" errors in Vite
  },
});

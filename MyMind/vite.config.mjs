import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { rmSync } from "node:fs";

export default defineConfig({
  base: "/MyMind/",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    react(),
    {
      name: "exclude-local-api-config",
      closeBundle() {
        ["config.php", "config.example.php", "schema.sql"].forEach((file) => rmSync(`dist/api/${file}`, { force: true }));
      },
    },
  ],
});

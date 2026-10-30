import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

const uploadsBackup = ".mymind-upload-build-backup";
const restoreBuildUploads = () => {
  if (!existsSync(uploadsBackup)) return;
  mkdirSync("dist/uploads", { recursive: true });
  cpSync(uploadsBackup, "dist/uploads", { recursive: true, force: true });
  rmSync(uploadsBackup, { recursive: true, force: true });
};

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
      buildStart() {
        restoreBuildUploads();
        rmSync(uploadsBackup, { recursive: true, force: true });
        if (existsSync("dist/uploads")) cpSync("dist/uploads", uploadsBackup, { recursive: true });
      },
      closeBundle() {
        restoreBuildUploads();
        ["config.php", "config.example.php", "schema.sql"].forEach((file) => rmSync(`dist/api/${file}`, { force: true }));
      },
    },
  ],
});

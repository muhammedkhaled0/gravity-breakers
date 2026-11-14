import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "../backend/data"),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [".."],
    },
  },
});

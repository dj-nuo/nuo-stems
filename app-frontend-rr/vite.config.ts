import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../app-shared-types"),
    },
  },
  server: {
    fs: {
      allow: ["..", path.resolve(__dirname, "../app-shared-types")],
    },
  },
});

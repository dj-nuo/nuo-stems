import { reactRouter } from "@react-router/dev/vite";
import babel from "vite-plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-react-compiler"]],
      },
    }), // react-compiler breaks Tanstack Table: https://github.com/TanStack/table/issues/5567
    tailwindcss(),
    tsconfigPaths(),
  ],
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

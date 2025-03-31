import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
});

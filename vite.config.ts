// @ienlab/react-library/vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: "./tsconfig.build.json" }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: () => "my-library.es.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        /^react\/.*/,
        /^react-dom\/.*/,

        "firebase",
        /^firebase\/.*/,

        "i18next",
        /^i18next\/.*/,

        "zustand",
        /^zustand\/.*/,

        "motion",
        /^motion\/.*/,

        "@tanstack/react-table",
        /^@tanstack\/.*/,

        "react-i18next",
        /^react-i18next\/.*/
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    copyPublicDir: false,
    minify: false,
  },
  resolve: {
    dedupe: ["react", "react-dom", "firebase"],
  },
})
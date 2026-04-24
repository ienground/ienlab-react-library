// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.build.json' }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: (format) => `my-library.${format}.js`,
      formats: ['es', 'cjs'],  // ESM + CommonJS 동시 지원
    },
    rollupOptions: {
      external: ['react', 'react-dom', "firebase", /^firebase\/.*/, "i18next", "zustand", "motion", "@tanstack/react-table", "react-i18next"],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    emptyOutDir: true,
    copyPublicDir: false,
    minify: true,
  },
  resolve: {
    dedupe: ['firebase']
  },
});
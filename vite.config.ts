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
      // react, react-dom은 번들에 포함하지 않음 (peer dependency)
      external: ['react', 'react-dom'],
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
});
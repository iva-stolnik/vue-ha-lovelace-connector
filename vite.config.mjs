import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    target: 'modules', // Change to 'es' if needed
    outDir: '.', // Specify the output directory
    assetsDir: '', // Set to an empty string to prevent an additional assets directory
    rollupOptions: {
      input: 'src/main.js', // Modify this path accordingly
      output: {
        entryFileNames: `[name]_prod.js`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

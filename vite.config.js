import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        eotl: resolve(__dirname, 'eotl.html'),
        programServices: resolve(__dirname, 'program-services.html'),
        mechanicalComponents: resolve(__dirname, 'mechanical-components.html'),
      },
    },
  },
});

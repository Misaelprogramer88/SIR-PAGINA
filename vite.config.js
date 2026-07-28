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
        mainEn: resolve(__dirname, 'index-en.html'),
        eotlEn: resolve(__dirname, 'eotl-en.html'),
        programServicesEn: resolve(__dirname, 'program-services-en.html'),
        mechanicalComponentsEn: resolve(__dirname, 'mechanical-components-en.html'),
        mainEs: resolve(__dirname, 'index-es.html'),
        eotlEs: resolve(__dirname, 'eotl-es.html'),
        programServicesEs: resolve(__dirname, 'program-services-es.html'),
        mechanicalComponentsEs: resolve(__dirname, 'mechanical-components-es.html'),
      },
    },
  },
});

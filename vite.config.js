import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

// Force restart to apply tailwind.config.js changes

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vue({
      template: {
        compilerOptions: {
          // Treat any tag starting with a dash or custom identifier as custom element if needed
        }
      }
    })
  ]
});

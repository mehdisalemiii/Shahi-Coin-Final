import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@tonconnect/ui-react', '@tonclient/core'] // Add @tonclient/core to the external array
    }
  }
});
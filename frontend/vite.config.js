import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend', // Specify the root directory of your frontend project
  build: {
    outDir: '../build', // Specify the output directory for the build
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    // alias: [
    //   { find: /^~/, replacement: '' },
    //   { find: '@', replacement: path.resolve(__dirname, './src') },
    // ],
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});

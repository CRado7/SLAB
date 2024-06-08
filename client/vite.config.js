import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/SLAB/", // Adjust this to match your GitHub Pages URL
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
//   build: {
//     outDir: 'dist', // Specify your output directory
//     rollupOptions: {
//       input: {
//         main: 'src/main.jsx' // Adjust the path to your main entry file
//       }
//     }
//   }
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',  // Network access for LG TV testing
    port: 5173,
  },
  build: {
    target: "es2015",   // <— REQUIRED for webOS packager
    minify: "terser",    // <— ensures full compatibility
    terserOptions: {
      compress: true,
      mangle: true,
    },
  },
});

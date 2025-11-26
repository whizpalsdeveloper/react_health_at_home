import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    target: "es2015",   // <— REQUIRED for webOS packager
    minify: "terser",    // <— ensures full compatibility
    terserOptions: {
      compress: true,
      mangle: true,
    },
  },
});

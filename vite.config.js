import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: '/booknest-final-project-wdd330/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalog: resolve(__dirname, 'src/catalog/index.html'),
        product: resolve(__dirname, 'src/product/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        favorites: resolve(__dirname, 'src/favorites/index.html'),
      },
    },
  },
});
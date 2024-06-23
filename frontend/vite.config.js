import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import {
  resolve
} from "path";
import {compression} from 'vite-plugin-compression2'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'brotliCompress'
    })],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://blog-w1fr.onrender.com",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "axios"],
    },
    reportCompressedSize: true,
   sourcemap: true
  },
resolve: {
  alias: {
    '@components': resolve(__dirname, 'src/components'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@src': resolve(__dirname, 'src'),
    '@manager':resolve(__dirname,'src/manager')
  },
},

})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  resolve
} from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
        external: [
            "react",
            "react-dom",
            "react-router-dom",
            "react-toastify",
            "axios"
        ],
    }
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

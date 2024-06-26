import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://blog-1-icva.onrender.com",
        changeOrigin: true,
      },
    },
  },
  })

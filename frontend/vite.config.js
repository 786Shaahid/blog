import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  resolve
} from "path";

const aliases = {
  '@crema': 'src/@crema',
  'core': 'src/core',
  'assets': 'src/assets',
  '@hook': 'src/@hook',
  'components': 'src/components',
  'features': 'src/features',
  'guards': 'src/guards',
  'pages': 'src/pages',
  'types': 'src/types',
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, resolve(__dirname, value)]),
);
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
            "react-toastify"
        ],
    }
},
resolve: {
  alias: {
      ...resolvedAliases,
      './runtimeConfig': './runtimeConfig.browser',
      'jss-plugin-{}': 'jss-plugin-global'
  },
},

})

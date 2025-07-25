import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000, // Different from your backend port
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // This removes /api from the path
      }
    }
  },
  optimizeDeps: {
    include: ['react-router-dom', 'js-cookie', 'axios']
  }
})
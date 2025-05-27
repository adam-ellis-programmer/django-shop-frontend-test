import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Minimal version - Vite handles optimizations automatically
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.easy-shop.biz',
        changeOrigin: true,
        secure: true,
        headers: {
          Origin: 'https://easy-shop.biz',
        },
      },
    },
  },
  // Vite will automatically:
  // - Use 'dist' as output directory
  // - Optimize chunks intelligently
  // - Handle source maps based on environment
})

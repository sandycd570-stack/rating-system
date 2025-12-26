import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      'rating-system.zeabur.app',
      '.zeabur.app'
    ],
    // 確保預覽模式處理所有路由
    strictPort: false
  },
  // 確保構建時正確處理路由
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // 🛠️ Esto obliga a Vite a conectar el WebSocket de forma segura en local
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
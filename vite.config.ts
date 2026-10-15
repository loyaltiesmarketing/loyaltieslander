import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    strictPort: true,
  },
  preview: {
    port: 4000,
    strictPort: true,
  },
  build: {
    // Main bundle is marketing copy + routes; keep the warning quiet until we split.
    chunkSizeWarningLimit: 1000,
  },
})

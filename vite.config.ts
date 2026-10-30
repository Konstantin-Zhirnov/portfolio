import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Migrated from Create React App: same dev port and the same `build` output
// folder (vercel.json points the deployment at it).
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  preview: { port: 3000 },
  build: { outDir: 'build' },
})

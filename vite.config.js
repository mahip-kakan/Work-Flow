import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev: absolute '/' so http://localhost:2302/ works.
// Production: relative './' so assets resolve under ANY GitHub Pages project path
// (e.g. /Health-Flow/ or /workflow-Studio/) without rebuilding when the repo is renamed.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : './',
  server: {
    port: 2302
  }
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev: base '/' so http://localhost:2302/ works.
// Production build: base for GitHub Pages subpath.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/Health-Flow/', // Pages: https://mahip-kakan.github.io/Health-Flow/
  server: {
    port: 2302
  }
}))

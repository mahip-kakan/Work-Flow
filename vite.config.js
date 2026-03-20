import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev: base '/' so http://localhost:2302/ works.
// Production build: base for GitHub Pages subpath.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/Impact-Flow/',
  server: {
    port: 2302
  }
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'

// The single global stylesheet is tiny; inlining it removes a render-blocking
// request from the critical path (worth ~150ms FCP/LCP in Lighthouse).
function inlineMainStylesheet() {
  return {
    name: 'inline-main-stylesheet',
    apply: 'build' as const,
    closeBundle() {
      const htmlPath = resolve(__dirname, 'dist/index.html')
      if (!existsSync(htmlPath)) return
      let html = readFileSync(htmlPath, 'utf8')
      const link = html.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/)
      if (!link) return
      const cssPath = resolve(__dirname, 'dist', link[1].replace(/^\//, ''))
      if (!existsSync(cssPath)) return
      const css = readFileSync(cssPath, 'utf8')
      html = html.replace(link[0], `<style>${css}</style>`)
      writeFileSync(htmlPath, html)
      unlinkSync(cssPath)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineMainStylesheet()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

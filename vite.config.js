import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      // AI-agentens backend (Cloudflare Worker via `npm run dev` i worker/)
      '/api': 'http://localhost:8787',
    },
  },
})

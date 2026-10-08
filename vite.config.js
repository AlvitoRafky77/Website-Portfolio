import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // makes asset URLs relative for GitHub Pages compatibility
  build: {
    chunkSizeWarningLimit: 1200,
  }
})

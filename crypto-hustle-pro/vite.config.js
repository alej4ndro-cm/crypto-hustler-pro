// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update this base path to match your repo
export default defineConfig({
  base: '/crypto-hustler-pro/',
  plugins: [react()],
})

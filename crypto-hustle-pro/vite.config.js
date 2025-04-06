import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/crypto-hustler-pro/crypto-hustler-pro/',
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test APIs like describe, it, etc.
    environment: 'jsdom', // Simulates a DOM-like environment
    setupFiles: './vitest.setup.js', // Points to the setup file
  },
});

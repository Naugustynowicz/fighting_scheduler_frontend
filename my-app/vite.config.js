import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setupTest.js',
  },
  preview: {
    port: 5173,
    strictPort: true,
   },
   server: {
    port: 5173,
    strictPort: true,
    host: true, // NB : address the server listen to, here listen to everything
    origin: "http://0.0.0.0:5173", 
   },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { 
    alias: {
      utils: '/src/utils',
      src: '/src',
      pages: '/src/pages',
      hooks: '/src/hooks',
      config: '/src/config',
    }
  }
})

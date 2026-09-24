import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-preview',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.preview.html',
    },
  },
})

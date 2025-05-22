import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@abstracts': fileURLToPath(new URL('./src/scss/abstracts', import.meta.url)),
      '@base': fileURLToPath(new URL('./src/scss/base', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/scss/components', import.meta.url)),
      '@layout': fileURLToPath(new URL('./src/scss/layout', import.meta.url)),
      '@themes': fileURLToPath(new URL('./src/scss/themes', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@abstracts" as *;
          @use "@themes" as *;
          `
      }
    }
  }
})

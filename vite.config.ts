import { defineConfig } from 'vite'
import path, { dirname } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@charset "UTF-8"; @use "sass:math"; @import "src/assets/scss/meta.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname(import.meta.url), 'src'),
    }
  },
})

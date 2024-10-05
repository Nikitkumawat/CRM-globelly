import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { defineConfig, loadEnv, UserConfig } from 'vite'
import { DevPlugin } from './dev/middleware'

const defaultConfig: UserConfig = {
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      assets: '/src/assets',
      lib: '/src/lib',
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  if (command === 'serve' && process.env.VITE_ENABLE_PROXY === 'true') {
    return {
      ...defaultConfig,
      plugins: [react(), DevPlugin()],
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: '<BackendURL>',
            followRedirects: false,
            changeOrigin: true,
            secure: false,
            // https://github.com/vitejs/vite/issues/17520
          },
          '/echo': {
            target: 'https://echo.free.beeceptor.com',
            followRedirects: true,
            changeOrigin: true,
            secure: false,
          },
        },
      },
    }
  } else {
    return defaultConfig
  }
})

import { ViteDevServer } from 'vite'

export const DevPlugin = () => ({
  name: 'dev-server',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, _, next) => {
      req.headers.referer = 'http://localhost:3000'
      next()
    })
  },
})

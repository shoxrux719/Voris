import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { handleLead } from './server/lead-api.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    inspectAttr(),
    react(),
    {
      name: 'lead-api',
      configureServer(server) {
        server.middlewares.use('/api/lead', (req, res) => {
          void handleLead(req, res).catch(() => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end('{"ok":false,"code":"server_error"}');
          })
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

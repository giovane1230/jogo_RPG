import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, // permite acesso externo (0.0.0.0)
    allowedHosts: [
      '7743-2804-1b3-b500-927e-78dc-96a7-ad51-e9d2.ngrok-free.app' // host gerado pelo ngrok
    ]
  }
})

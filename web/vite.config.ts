import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3005,
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        // Split heavy/independent libs into their own chunks so the initial
        // load stays small. echarts only loads with the Dashboard chunk.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('echarts') || id.includes('zrender')) return 'echarts'
            if (id.includes('react-multi-date-picker') || id.includes('react-date-object'))
              return 'datepicker'
            if (id.includes('@microsoft/signalr')) return 'signalr'
            if (id.includes('antd') || id.includes('@ant-design') || id.includes('rc-'))
              return 'antd'
          }
        },
      },
    },
  },
})

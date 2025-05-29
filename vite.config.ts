import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/Enterprise-Brain-Platform/'
  
  return {
    base,
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3008
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#1677ff',
            '@font-size-base': '14px',
            '@border-radius-base': '4px'
          }
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons', '@ant-design/pro-components'],
            'chart-vendor': ['@antv/g2plot']
          }
        }
      },
      chunkSizeWarningLimit: 1500
    }
  }
})
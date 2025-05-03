import { defineConfig } from 'vite'
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  // Punto de entrada principal
  root: resolve(__dirname, 'src'),
  
  // Configuración del build
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  
  // Configuración para TypeScript
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      include: ['src/**/*.ts']
    })
  ],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // Manejo de assets
  publicDir: 'public',
  
  // Resolución de imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@store': resolve(__dirname, 'src/store'),
      '@models': resolve(__dirname, 'src/models')
    }
  }
})
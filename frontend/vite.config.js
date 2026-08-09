import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimizations
  build: {
    // Enable minification (esbuild is faster and built-in)
    minify: 'esbuild',
    
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'query': ['@tanstack/react-query'],
          'date': ['date-fns'],
          'radix': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
          ],
        },
      },
    },
    
    // Generate source maps for debugging (disable in production if needed)
    sourcemap: false,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
  },
  
  // Development server optimizations
  server: {
    // Enable compression
    middlewareMode: false,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@tanstack/react-query',
      'date-fns',
    ],
  },
  
  // Enable esbuild for faster builds
  esbuild: {
    // Remove legal comments
    legalComments: 'none',
  },
})

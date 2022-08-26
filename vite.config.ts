/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3009,
    proxy: {
      '/api': 'http://localhost:3001/'
    }
  },
  plugins: [
    react({
      // to show readable class names in styled components with vite
      // https://github.com/styled-components/babel-plugin-styled-components/issues/350#issuecomment-979873241
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          [
            // 'babel-plugin-styled-components',
            '@emotion/babel-plugin',
            {
              displayName: true,
              fileName: true
            }
          ]
        ]
      }
    }),
    // https://github.com/aleclarson/vite-tsconfig-paths
    tsconfigPaths()
  ],
  // https://vitest.dev/guide/in-source.html
  define: { 'import.meta.vitest': 'undefined' },
  // https://www.youtube.com/watch?v=oWJpxtAl62w
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.ts',
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
    coverage: {
      all: true,
      src: ['src/']
    }
  },
  build: {
    outDir: 'build'
  }
})

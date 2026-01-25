import path from 'node:path'
import url from 'node:url'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { runtimeConfig } from './config/runtime' // relative imports, otherwise some scripts break
import type { Plugin } from 'vite'

const thisFilePath: string = url.fileURLToPath(import.meta.url)
const thisDirPath: string = path.dirname(thisFilePath)

/**
 * API routes are now properly separated:
 * - back/api/api-routes.ts contains metadata only (no handlers, no backend dependencies)
 * - back/api/api.ts contains handlers for backend use only
 * - Frontend and deploy scripts import from api-routes.ts for proper tree-shaking
 */

// https://vitejs.dev/config/

export default {
  root: './front/',
  server: {
    host: runtimeConfig.front.hostname,
    port: runtimeConfig.front.port,
    open: runtimeConfig.front.baseUrl,
    proxy: {
      '/api': runtimeConfig.back.baseUrl,
      '/uploads': runtimeConfig.back.baseUrl,
    },
  },
  preview: {
    host: runtimeConfig.front.hostname,
    port: runtimeConfig.front.portPreview,
    open: runtimeConfig.front.baseUrlPreview,
    proxy: {
      '/api': runtimeConfig.back.baseUrl,
      '/uploads': runtimeConfig.back.baseUrl,
    },
  },
  worker: {
    format: 'es',
    plugins: (): Plugin[] => [tsconfigPaths({ root: thisDirPath })],
  },
  esbuild: {
    define: {
      this: 'window', // to suppress warning in terminal: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
    },
  },
  plugins: [
    react({
      // to show readable class names in styled components with vite
      // https://github.com/styled-components/babel-plugin-styled-components/issues/350#issuecomment-979873241
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          [
            '@emotion/babel-plugin', // from package 'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: true,
            },
          ],
          // https://github.com/preactjs/signals/tree/main/packages/react#react-integration
          ['module:@preact/signals-react-transform'],
        ],
      },
    }),
    // https://github.com/aleclarson/vite-tsconfig-paths
    tsconfigPaths({ root: thisDirPath }),
    basicSsl(),
  ],
  // Path aliases are automatically loaded from tsconfig.json via tsconfigPaths() plugin
  build: {
    outDir: './build',
    chunkSizeWarningLimit: 1500, // in KB
    rollupOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id: string): string | undefined => {
          if (id.includes('ag-grid')) return 'ag-grid'
          if (id.includes('@mui')) return '@mui'
          if (id.includes('@tanstack')) return '@tanstack'
          if (id.includes('@remix')) return '@remix'
          if (id.includes('jspdf')) return 'jspdf'
          if (id.includes('exceljs')) return 'exceljs'

          return undefined
        },
      },
    },
  },
}

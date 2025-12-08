import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { runtimeConfig } from './config/runtime'

const thisFilePath: string = fileURLToPath(import.meta.url)
const thisDirPath: string = dirname(thisFilePath)

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
    tsconfigPaths(),
    basicSsl(),
  ],
  resolve: {
    alias: {
      '@back': join(thisDirPath, 'back'),
      '@entities': join(thisDirPath, 'front', 'entities'),
      '@features': join(thisDirPath, 'front', 'features'),
      '@lib_instances': join(thisDirPath, 'front', 'lib_instances'),
      '@pages': join(thisDirPath, 'front', 'pages'),
      '@shared': join(thisDirPath, 'front', 'shared'),
      '@widgets': join(thisDirPath, 'front', 'widgets'),
    },
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id: string): string | undefined => {
          const isFroala = id.includes('froala')

          if (isFroala === true) {
            return 'qwerty'
          }

          const isAgGrid = id.includes('ag-grid')

          if (isAgGrid === true) {
            return 'ag-grid'
          }

          const isMui = id.includes('@mui')

          if (isMui === true) {
            return '@mui'
          }

          const isTanstack = id.includes('@tanstack')

          if (isTanstack === true) {
            return '@tanstack'
          }

          const isRemix = id.includes('@remix')

          if (isRemix === true) {
            return '@remix'
          }

          const isJsPdf = id.includes('jspdf')

          // Split jsPDF into its own chunk to enable dynamic imports without bundling issues
          // This allows lazy loading of the PDF library only when needed

          // Web Workers run in a different context and can't access Vite's
          // module resolution system, so they can't find the transformed/renamed files
          // By explicitly telling Vite to create separate chunks for these lib,
          // we give it predictable, stable path that can be resolved even in worker contexts
          if (isJsPdf === true) {
            return 'jspdf'
          }

          const isExcelJs = id.includes('exceljs')

          // Same here
          if (isExcelJs === true) {
            return 'exceljs'
          }

          return undefined
        },
      },
    },
  },
}

import babel from '@rolldown/plugin-babel'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// relative imports, otherwise some scripts break
import { runtimeConfig } from './config/runtime'

/**
 * API routes are now properly separated:
 * - back/api/api-routes.ts contains metadata only (no handlers, no backend dependencies)
 * - back/api/api.ts contains handlers for backend use only
 * - Frontend and deploy scripts import from api-routes.ts for proper tree-shaking
 */

// https://vitejs.dev/config/

const viteConfig = {
  publicDir: './front/public',
  resolve: {
    alias: [
      { find: '@front/', replacement: `${path.resolve('front')}/` },
      { find: '@back/', replacement: `${path.resolve('back')}/` },
      { find: '@tests/', replacement: `${path.resolve('tests')}/` },
      { find: '@root/', replacement: `${path.resolve('.')}/` },
    ],
  },
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
  plugins: [
    babel({
      plugins: [
        [
          // opt-in memoization via "use memo" directive
          // opt-out memoization via "use no memo" directive
          'babel-plugin-react-compiler',
          {
            // 'infer' | 'syntax' | 'annotation' | 'all'
            compilationMode: 'infer',
          },
        ],
        [
          // readable class names in styled components
          '@emotion/babel-plugin',
          // https://github.com/styled-components/babel-plugin-styled-components/issues/350#issuecomment-979873241
          {
            displayName: true,
            fileName: true,
          },
        ],
        // https://github.com/preactjs/signals/tree/main/packages/react#react-integration
        ['module:@preact/signals-react-transform'],
      ],
    }),
    react({
      jsxImportSource: '@emotion/react',
    }),
    basicSsl(),
  ],
  test: {
    include: ['front/**/*.test.{ts,tsx,js,jsx}', 'back/**/*.test.{ts,tsx,js,jsx}'],
  },
  build: {
    outDir: './front/build',
    // in KB
    chunkSizeWarningLimit: 1500,
    rolldownOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (pathAbsolute: string): string | undefined => {
          const packageGoToOwnChunkList = [
            'ag-grid',
            '@mui',
            '@tanstack',
            '@remix',
            'jspdf',
            'exceljs',
            'chart.js',
            'xstate',
            '@tiptap',
            'react-router',
            'prosemirror',
            'motion-dom',
            'zod',
            'react-icons',
            'lodash',
            're-resizable',
            'react-dom',
            '@hello-pangea',
            'sonner',
            'immer',
            'framer-motion',
            'axios',
            '@formkit',
            '@reduxjs',
            'mailcheck',
            'redux',
            'react-redux',
            'hamburger',
            'react-use',
            'round-to',
            'jwt-decode',
          ]

          for (const packageName of packageGoToOwnChunkList) {
            if (pathAbsolute.includes(`/node_modules/.bun/${packageName}`)) {
              return packageName
            }
          }

          return undefined
        },
      },
    },
  },
}

// oxlint-disable-next-line import/no-default-export
export default viteConfig

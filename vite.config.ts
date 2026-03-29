import babel from '@rolldown/plugin-babel'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { runtimeConfig } from './config/runtime' // relative imports, otherwise some scripts break

/**
 * API routes are now properly separated:
 * - back/api/api-routes.ts contains metadata only (no handlers, no backend dependencies)
 * - back/api/api.ts contains handlers for backend use only
 * - Frontend and deploy scripts import from api-routes.ts for proper tree-shaking
 */

// https://vitejs.dev/config/

export default {
  publicDir: './front/public',
  resolve: {
    alias: [
      { find: '@front/', replacement: `${path.resolve('front')}/` },
      { find: '@back/', replacement: `${path.resolve('back')}/` },
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
          '@emotion/babel-plugin', // readable class names in styled components
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
    chunkSizeWarningLimit: 1500, // in KB
    rolldownOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (pathAbsolute: string): string | undefined => {
          // console.log('🚀 ~ pathAbsolute:', pathAbsolute)

          if (pathAbsolute.includes('/node_modules/.bun/ag-grid')) return 'ag-grid'
          if (pathAbsolute.includes('/node_modules/.bun/@mui')) return '@mui'
          if (pathAbsolute.includes('/node_modules/.bun/@tanstack')) return '@tanstack'
          if (pathAbsolute.includes('/node_modules/.bun/@remix')) return '@remix'
          if (pathAbsolute.includes('/node_modules/.bun/jspdf')) return 'jspdf'
          if (pathAbsolute.includes('/node_modules/.bun/exceljs')) return 'exceljs'
          if (pathAbsolute.includes('/node_modules/.bun/chart.js')) return 'chart.js'
          if (pathAbsolute.includes('/node_modules/.bun/xstate')) return 'xstate'
          if (pathAbsolute.includes('/node_modules/.bun/@tiptap')) return '@tiptap'
          if (pathAbsolute.includes('/node_modules/.bun/react-router')) return 'react-router'
          if (pathAbsolute.includes('/node_modules/.bun/prosemirror')) return 'prosemirror'
          if (pathAbsolute.includes('/node_modules/.bun/motion-dom')) return 'motion-dom'
          if (pathAbsolute.includes('/node_modules/.bun/zod')) return 'zod'
          if (pathAbsolute.includes('/node_modules/.bun/react-icons')) return 'react-icons'
          if (pathAbsolute.includes('/node_modules/.bun/lodash')) return 'lodash'
          if (pathAbsolute.includes('/node_modules/.bun/re-resizable')) return 're-resizable'
          if (pathAbsolute.includes('/node_modules/.bun/react-dom')) return 'react-dom'
          if (pathAbsolute.includes('/node_modules/.bun/@hello-pangea')) return '@hello-pangea/dnd'
          if (pathAbsolute.includes('/node_modules/.bun/sonner')) return 'sonner'
          if (pathAbsolute.includes('/node_modules/.bun/immer')) return 'immer'
          if (pathAbsolute.includes('/node_modules/.bun/framer-motion')) return 'framer-motion'
          if (pathAbsolute.includes('/node_modules/.bun/axios')) return 'axios'
          if (pathAbsolute.includes('/node_modules/.bun/@formkit')) return '@formkit'
          if (pathAbsolute.includes('/node_modules/.bun/@reduxjs')) return '@reduxjs'
          if (pathAbsolute.includes('/node_modules/.bun/mailcheck')) return 'mailcheck'
          if (pathAbsolute.includes('/node_modules/.bun/redux')) return 'redux'
          if (pathAbsolute.includes('/node_modules/.bun/react-redux')) return 'react-redux'
          if (pathAbsolute.includes('/node_modules/.bun/hamburger')) return 'hamburger'
          if (pathAbsolute.includes('/node_modules/.bun/react-use')) return 'react-use'
          if (pathAbsolute.includes('/node_modules/.bun/round-to')) return 'round-to'
          if (pathAbsolute.includes('/node_modules/.bun/jwt-decode')) return 'jwt-decode'

          return undefined
        },
      },
    },
  },
}

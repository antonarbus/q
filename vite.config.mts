import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { type BabelFileResult, transformAsync } from '@babel/core'
import type { NodePath } from '@babel/traverse'
import type { ObjectProperty } from '@babel/types'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { runtimeConfig } from './config/runtime'

const thisFilePath: string = fileURLToPath(import.meta.url)
const thisDirPath: string = dirname(thisFilePath)

/**
 * Strips the `handler` property from the api routes object in the backend.
 * This is needed because api are shared between front and back ends and
 * Sensitive functions are leaked to the frontend.
 * Also it breaks the connection between front and back ends, otherwise whole
 * node_modules will be included in the frontend build.
 * 
 * TODO: remove this hack in future by splitting meta data from api handler function
 * 
 *   // back/api/api-routes.ts (metadata only)
  export const apiRoutes = {
    getUser: { url: '/api/user', method: 'get' },
  } as const

  // back/api/api.ts (with handlers, backend only)
  import { getUserHandler } from './handlers'
  export const api = {
    getUser: {
      ...apiRoutes.getUser,
      handler: getUserHandler,
    },
  }

  // frontend imports apiRoutes, not api
 */
const stripHandlerFromApiRoutes = (): unknown => {
  const targetFilePath = resolve(thisDirPath, 'back/api/api.ts')

  return {
    enforce: 'pre',
    name: 'vite-strip-handler-from-api-routes',
    async transform(code: string, id: string): Promise<BabelFileResult | null> {
      if (resolve(id) !== targetFilePath) {
        return null
      }

      console.info('⛭ Stripping "handler" props from api object')

      const result = await transformAsync(code, {
        babelrc: false,
        configFile: false,
        filename: id,
        plugins: [
          () => ({
            visitor: {
              ObjectProperty(path: NodePath<ObjectProperty>): void {
                const isHandlerIdentifier =
                  path.node.key.type === 'Identifier' &&
                  path.node.key.name === 'handler'

                if (isHandlerIdentifier === true) {
                  path.remove()
                }
              },
            },
          }),
        ],
        presets: ['@babel/preset-typescript'],
      })

      return result === null ? null : { code: result.code, map: null }
    },
  }
}

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
          // 'babel-plugin-react-compiler', //* Can not use react compiler, all animation and other things go crazy
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
    stripHandlerFromApiRoutes(),
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

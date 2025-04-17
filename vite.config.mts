/// <reference types="vitest" />
/// <reference types="vite/client" />
import { dirname, join, resolve } from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { config } from './back/config'
import { fileURLToPath } from 'url'
import { type BabelFileResult, transformAsync } from '@babel/core'
import type { NodePath } from '@babel/traverse'
import type { ObjectProperty } from '@babel/types'

const thisFilePath = fileURLToPath(import.meta.url)
const thisDirPath = dirname(thisFilePath)

/**
 * Strips the `handler` property from the api routes object in the backend.
 * This is needed because api are shared between front and back ends and
 * Sensitive functions are leaked to the frontend.
 */
const stripHandlerFromApiRoutes = (): unknown => {
  const targetFilePath = resolve(thisDirPath, 'back/api/api.ts')

  return {
    name: 'vite-strip-handler-from-api-routes',
    enforce: 'pre',
    async transform(code: string, id: string): Promise<BabelFileResult | null> {
      if (resolve(id) !== targetFilePath) {
        return null
      }

      console.info('⛭ Stripping "handler" props from api object')

      const result = await transformAsync(code, {
        filename: id,
        presets: ['@babel/preset-typescript'],
        plugins: [
          // eslint-disable-next-line func-names, @typescript-eslint/explicit-function-return-type
          function () {
            return {
              visitor: {
                ObjectProperty(path: NodePath<ObjectProperty>): void {
                  if (
                    path.node.key.type === 'Identifier' &&
                    path.node.key.name === 'handler'
                  ) {
                    path.remove()
                  }
                },
              },
            }
          },
        ],
        configFile: false,
        babelrc: false,
      })

      return result ? { code: result.code, map: null } : null
    },
  }
}

// https://vitejs.dev/config/

export default {
  root: './front/',
  server: {
    host: config.front.hostname,
    port: config.front.port,
    open: config.front.baseUrl,
    // https: true, //* type "thisisunsafe" if chrome says that connection is not private
    proxy: {
      '/api': config.back.baseUrl,
    },
  },
  preview: {
    host: config.front.hostname,
    port: config.front.portPreview,
    // https: true,
    proxy: {
      '/api': config.back.baseUrl,
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
            // 'babel-plugin-styled-components',
            '@emotion/babel-plugin',
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
      '@lib_instances': join(thisDirPath, 'front', 'lib_instances'),
      '@pages': join(thisDirPath, 'front', 'pages'),
      '@widgets': join(thisDirPath, 'front', 'widgets'),
      '@features': join(thisDirPath, 'front', 'features'),
      '@entities': join(thisDirPath, 'front', 'entities'),
      '@shared': join(thisDirPath, 'front', 'shared'),
    },
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id: string): string | undefined => {
          if (id.includes('froala')) {
            return 'qwerty'
          }

          if (id.includes('ag-grid')) {
            return 'ag-grid'
          }

          if (id.includes('@mui')) {
            return '@mui'
          }

          if (id.includes('@tanstack')) {
            return '@tanstack'
          }

          if (id.includes('@remix')) {
            return '@remix'
          }
        },
      },
    },
  },
}

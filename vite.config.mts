/// <reference types="vitest" />
/// <reference types="vite/client" />
import { dirname, join } from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { config } from './back/config'
import { fileURLToPath } from 'url'

const thisFilePath = fileURLToPath(import.meta.url)
const thisDirPath = dirname(thisFilePath)

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    root: './front/',
    server: {
      host: config.front.hostname,
      port: config.front.port,
      // https: true, //* type "thisisunsafe" if chrome says that connection is not private
      proxy: {
        '/api': config.back.baseUrl,
      },
    },
    preview: {
      // host: hostFront,
      port: config.front.port,
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
          manualChunks: (id, { getModuleInfo }): string | undefined => {
            if (id.includes('froala')) {
              return 'qwerty'
            }

            if (id.includes('ag-grid')) {
              return 'ag-grid'
            }

            if (id.includes('gsap')) {
              return 'gsap'
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
})

/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, loadEnv } from 'vite'
import { hostBack, portBack, portFront } from './back/utils/env'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: './front/',
    server: {
      host: true,
      port: portFront,
      // Https: true, //* type "thisisunsafe" if chrome says that connection is not private
      proxy: {
        '/api': `${hostBack}:${portBack}/`,
      },
    },
    preview: {
      // Host: hostFront,
      port: portFront,
      // Https: true,
      proxy: {
        '/api': `${hostBack}:${portBack}/`,
      },
    },
    worker: {
      format: 'es',
    },
    esbuild: {
      define: {
        // To suppress warning in terminal: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
        this: 'window',
      },
    },
    plugins: [
      react({
        // To show readable class names in styled components with vite
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
        '@back': path.resolve(__dirname, 'back'),
        '@lib_instances': path.resolve(__dirname, 'front', 'lib_instances'),
        '@pages': path.resolve(__dirname, 'front', 'pages'),
        '@widgets': path.resolve(__dirname, 'front', 'widgets'),
        '@features': path.resolve(__dirname, 'front', 'features'),
        '@entities': path.resolve(__dirname, 'front', 'entities'),
        '@shared': path.resolve(__dirname, 'front', 'shared'),
      },
    },
    build: {
      outDir: './build',
      rollupOptions: {
        output: {
          // https://rollupjs.org/configuration-options/#output-manualchunks
          manualChunks: (id, { getModuleInfo }) => {
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
            return 'rest-of-chunks'
          },
        },
      },
    },
  }
})

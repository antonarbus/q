/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      port: Number(env.PORT_FRONT_END),
      proxy: {
        // '/api': `${process.env.DOMAIN}:${process.env.PORT_BACK_END}/`
        '/api': `${env.DOMAIN}:${env.PORT_BACK_END}`
      }
    },
    esbuild: {
      define: {
        // to suppress warning in terminal: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
        this: 'window'
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
    define: {
      'import.meta.vitest': 'undefined'
    },
    // https://www.youtube.com/watch?v=oWJpxtAl62w
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test-setup.ts',
      includeSource: ['client/**/*.{js,ts,jsx,tsx}'],
      coverage: {
        all: true,
        src: ['client/']
      }
    },
    build: {
      outDir: 'build'
    }
  }
})

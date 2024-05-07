/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      host: 'local.quotation.app',
      port: Number(env.PORT_FRONT_END),
      https: true, //* type "thisisunsafe" if chrome says that connection is not private
      proxy: {
        '/api': `${env.DOMAIN}:${env.PORT_BACK_END}/`
        // '/api': `local.quotation.app:${env.PORT_BACK_END}`,
      },
      // hmr: {
      //   host: 'localhost',
      //   port: Number(env.PORT_BACK_END),
      // }
    },
    worker: {
      format: "es"
    },
    esbuild: {
      define: {
        // to suppress warning in terminal: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
        this: 'window',
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
            ["module:@preact/signals-react-transform"],
          ],
        },
      }),
      // https://github.com/aleclarson/vite-tsconfig-paths
      tsconfigPaths(),
      basicSsl(),
    ],
    // https://vitest.dev/guide/in-source.html
    define: {
      'import.meta.vitest': 'undefined',
    },
    // https://www.youtube.com/watch?v=oWJpxtAl62w
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test-setup.ts',
      includeSource: ['client/**/*.{js,ts,jsx,tsx}'],
      coverage: {
        all: true,
        src: ['client/'],
      },
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          // https://rollupjs.org/configuration-options/#output-manualchunks
          manualChunks: (id) => {
            // if (id.includes('node_modules/ag-grid')) return 'ag-grid'
            // if (id.includes('node_modules/@mui')) return '@mui'
            // if (id.includes('node_modules/@emotion')) return '@emotion'
            // if (id.includes('node_modules/axios')) return 'axios'
            // if (id.includes('node_modules/chart')) return 'chart'
            // if (id.includes('node_modules/@tanstack')) return '@tanstack'
            // if (id.includes('node_modules/@remix')) return '@remix'
            // if (id.includes('node_modules/gsap')) return 'gsap'
            // if (id.includes('node_modules/framer-motion')) return 'framer-motion'
            // if (id.includes('node_modules/react-dom')) return 'react-dom'
            // if (id.includes('froalaPkgd')) return 'froalaPkgd'
          }
        }
      }
    },
  }
})

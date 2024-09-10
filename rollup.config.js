import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: './back/index.ts',
  output: {
    dir: './back/build/',
    format: 'es',
  },
  external: [/node_modules/],
  plugins: [
    nodeResolve(),
    typescript(),
    copy({
      targets: [
        { src: './back/package.json', dest: './back/build' },
        { src: './back/package-lock.json', dest: './back/build' },
        { src: './.env', dest: './back/build' },
      ],
    }),
  ],
}

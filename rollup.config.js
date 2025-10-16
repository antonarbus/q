import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './back/index.ts',
  output: {
    dir: './back/build/',
    format: 'es',
  },
  external: [/node_modules/u], // Don't bundle anything from node_modules
  plugins: [
    nodeResolve(), // Resolves node_modules imports to actual file paths
    typescript({
      exclude: ['**/node_modules/**', 'front/**', '**/front/**'],
      compilerOptions: {
        noEmit: false,
      },
    }), // emit TypeScript → JavaScript
  ],
}

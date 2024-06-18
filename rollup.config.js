import typescript from '@rollup/plugin-typescript'

export default {
  input: './server/index.ts',
  output: {
    dir: 'build/server',
    format: 'es',
  },
  plugins: [typescript()],
}

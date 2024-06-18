import typescript from '@rollup/plugin-typescript'

export default {
  input: './back/index.ts',
  output: {
    dir: 'build/back',
    format: 'es',
  },
  plugins: [typescript()],
}

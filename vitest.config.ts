/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()] as any,
  test: {
    include: [
      'front/**/*.test.{ts,tsx,js,jsx}',
      'back/**/*.test.{ts,tsx,js,jsx}',
    ],
  },
})

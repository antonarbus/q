import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // @ts-expect-error - tsconfigPaths plugin type compatibility with vitest
  plugins: [tsconfigPaths()],
  test: {
    include: [
      'front/**/*.test.{ts,tsx,js,jsx}',
      'back/**/*.test.{ts,tsx,js,jsx}',
    ],
  },
})

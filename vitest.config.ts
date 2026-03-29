import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: [
      'front/**/*.test.{ts,tsx,js,jsx}',
      'back/**/*.test.{ts,tsx,js,jsx}',
    ],
  },
})

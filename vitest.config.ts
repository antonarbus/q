import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'front/**/*.test.{ts,tsx,js,jsx}',
      'back/**/*.test.{ts,tsx,js,jsx}',
    ],
  },
})

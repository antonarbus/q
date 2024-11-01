//@ts-expect-error: some declaration is missing
import { defineConfig } from 'steiger'
// import fsd from '@feature-sliced/steiger-plugin'

// https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/forbidden-imports

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  files: ['./front/**'],
  rules: {
    'segments-by-purpose': 'off',
    'public-api': 'off',
    'no-segmentless-slices': 'off',
    'no-reserved-folder-names': 'off',
    'no-public-api-sidestep': 'off',
    'insignificant-slice': 'off',
  },
})

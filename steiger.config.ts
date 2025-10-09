/* eslint-disable */
// @ts-nocheck

import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  // https://github.com/feature-sliced/steiger/tree/master?tab=readme-ov-file#rules
  ...fsd.configs.recommended,
  {
    // disable the `public-api` rule for files in the Shared layer
    files: ['./front/**'],
    rules: {
      // 'fsd/public-api': 'off',
    },
  },
])

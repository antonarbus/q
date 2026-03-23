/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/ambiguous-slice-names': 'warn',
      'fsd/excessive-slicing': 'warn',
      'fsd/forbidden-imports': 'warn',
      'fsd/inconsistent-naming': 'warn',
      'fsd/insignificant-slice': 'off',
      'fsd/no-cross-imports': 'warn',
      'fsd/no-higher-level-imports': 'warn',
      'fsd/no-layer-public-api': 'warn',
      'fsd/no-processes': 'warn',
      'fsd/no-public-api-sidestep': 'off',
      'fsd/no-reserved-folder-names': 'warn',
      'fsd/no-segmentless-slices': 'off',
      'fsd/no-segments-on-sliced-layers': 'warn',
      'fsd/no-ui-in-app': 'warn',
      'fsd/public-api': 'off',
      'fsd/repetitive-naming': 'warn',
      'fsd/segments-by-purpose': 'warn',
      'fsd/shared-lib-grouping': 'warn',
      'fsd/typo-in-layer-name': 'warn',
    },
  },
])

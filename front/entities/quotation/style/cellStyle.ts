import type { CSSObject } from '@mui/material'
import { theme } from '@front/shared/theme'

export const cellStyle: CSSObject = {
  textAlign: 'center',
  padding: theme.cell.padding,
  minHeight: '50px', // otherwise placeholder is misplaced on init
  fontVariantNumeric: 'tabular-nums',
}

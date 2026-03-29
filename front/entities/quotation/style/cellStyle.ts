import type { CSSObject } from '@mui/material'
import { theme } from '@front/shared/theme'

export const cellStyle: CSSObject = {
  textAlign: 'center',
  padding: theme.cell.padding,
  // otherwise placeholder is misplaced on init
  minHeight: '50px',
  fontVariantNumeric: 'tabular-nums',
}

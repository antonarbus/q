import { theme } from '@libras/theme'
import { type SxProps } from '@mui/material'

export const descriptionCellStyle: SxProps = {
  padding: theme.cell.padding,
  minHeight: '44px', // otherwise placeholder is misplaced on init
  '.fr-wrapper': {
    minHeight: '24px', // otherwise placeholder is misplaced on init
  },
}

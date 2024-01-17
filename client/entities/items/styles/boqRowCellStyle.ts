import { type SxProps } from '@mui/material'
import { theme } from '@shared/clients'

export const boqRowCellStyle: SxProps = {
  textAlign: 'center',
  padding: theme.cell.padding,
  '.fr-placeholder': {
    left: '15px',
  },
  minHeight: '44px', // otherwise placeholder is misplaced on init
  '.fr-wrapper': {
    minHeight: '24px', // otherwise placeholder is misplaced on init
  },
}

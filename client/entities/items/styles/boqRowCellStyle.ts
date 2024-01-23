import { theme } from '@lib_instances/theme'
import { type SxProps } from '@mui/material'

export const boqRowCellStyle: SxProps = {
  textAlign: 'center',
  padding: theme.cell.padding,
  minHeight: '50px', // otherwise placeholder is misplaced on init
  // cursor: 'text',
  '.fr-placeholder': {
    left: '15px',
  },
}

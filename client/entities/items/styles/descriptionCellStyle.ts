import { theme } from '@lib_instances/theme'
import { type SxProps } from '@mui/material'

export const descriptionCellStyle: SxProps = {
  padding: theme.cell.padding,
  minHeight: '40px', // otherwise placeholder is misplaced on init
  // cursor: 'text',
}

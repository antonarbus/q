import { theme } from '@lib_instances/theme'
import type { SxProps } from '@mui/material'

export const boqRowCellStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: theme.cell.padding,
  minHeight: '50px', // otherwise placeholder is misplaced on init
}

export const boqRowCellSx: SxProps = {
  '.fr-placeholder': {
    left: '15px',
  },
}

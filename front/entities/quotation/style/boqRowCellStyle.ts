import { theme } from '@shared/theme'
import type { SxProps } from '@mui/material'
import type { CSSProperties } from 'react'

export const boqRowCellStyle: CSSProperties = {
  textAlign: 'center',
  padding: theme.cell.padding,
  minHeight: '50px', // otherwise placeholder is misplaced on init
}

export const boqRowCellSx: SxProps = {
  '.fr-placeholder': {
    left: '15px',
  },
}

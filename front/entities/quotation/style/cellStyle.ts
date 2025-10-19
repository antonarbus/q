import type { SxProps } from '@mui/material'
import { theme } from '@shared/theme'
import type { CSSProperties } from 'react'

export const cellStyle: CSSProperties = {
  textAlign: 'center',
  padding: theme.cell.padding,
  minHeight: '50px', // otherwise placeholder is misplaced on init
}

export const cellSx: SxProps = {
  '.fr-placeholder': {
    left: '15px',
  },
}

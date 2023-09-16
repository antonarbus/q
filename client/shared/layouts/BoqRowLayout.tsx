import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { className } from '../className'

interface Props {
  children: ReactNode
}

export const BoqRowLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className={className.boqRow}
      sx={{
        display: 'flex',
        minHeight: '50px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}

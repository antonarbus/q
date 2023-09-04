import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const BoqColsHeaderLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      sx={{
        display: 'flex',
        minHeight: '40px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}

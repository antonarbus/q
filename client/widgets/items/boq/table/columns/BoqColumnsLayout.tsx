import { Box } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqColumnsLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}

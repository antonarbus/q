import { Box } from '@mui/material'
import type { JSX,ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqColumnsLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      style={{
        alignItems: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}

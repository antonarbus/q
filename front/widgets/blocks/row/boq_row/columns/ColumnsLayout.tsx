import { Box } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ColumnsLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      style={{
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}

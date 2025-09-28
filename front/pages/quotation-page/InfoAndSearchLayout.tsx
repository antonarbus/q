import { Box } from '@mui/material'
import type { JSX,ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const InfoAndSearchLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '5px',
      }}
    >
      {children}
    </Box>
  )
}

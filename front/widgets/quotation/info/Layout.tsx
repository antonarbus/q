import { Box } from '@mui/material'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout = (props: Props): JSX.Element => {
  return (
    <Box
      sx={{
        all: 'unset',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100px',
        maxWidth: '100px',
        height: '18px',
      }}
    >
      <Box
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexGrow: 1,
          display: 'flex',
          gap: '5px',
          height: '100%',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

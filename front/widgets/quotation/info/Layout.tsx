import { Box } from '@mui/material'
import type { FC } from 'react'

type Props = {
  children: React.ReactNode
  align?: 'start' | 'end'
}

export const Layout: FC<Props> = (props) => {
  const justify = props.align === 'start' ? 'flex-start' : 'flex-end'

  return (
    <Box
      sx={{
        all: 'unset',
        display: 'flex',
        justifyContent: justify,
        alignItems: 'center',
        width: '100px',
        maxWidth: '100px',
        height: '18px',
      }}
    >
      <Box
        sx={{
          justifyContent: justify,
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

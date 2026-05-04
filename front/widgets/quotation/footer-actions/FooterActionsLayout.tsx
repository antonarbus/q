import { Box } from '@mui/material'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const FooterActionsLayout: FC<Props> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        padding: '0px 0px 30px 0px',
        opacity: 0.4,
        transition: 'opacity 0.2s',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      {props.children}
    </Box>
  )
}

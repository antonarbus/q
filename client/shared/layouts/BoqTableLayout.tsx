import { Box } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqTableLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='boq-table-container-with-paddings'
      sx={{
        p: '10px',
      }}
    >
      <Box
        className='boq-table-container'
        sx={{
          overflow: 'auto',
          '& *': {
            // background: '#ff00001b',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

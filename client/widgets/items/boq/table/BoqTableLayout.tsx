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
        p: '10px', // to have a gap when overflow
      }}
    >
      <Box
        className='boq-table-container'
        sx={{
          // todo: think about logic to enable overflow when width of content goes over the screen
          // todo: we may put actions inside and enable overflow: auto
          // overflow: 'auto',
          p: '5px',
          clipPath: 'inset(0 0 0 -100px)',
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

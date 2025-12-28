import { Box } from '@mui/material'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ColumnsLayout = (props: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      style={{
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {props.children}
    </Box>
  )
}

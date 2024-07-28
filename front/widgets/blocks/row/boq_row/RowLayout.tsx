import { Box } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RowLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='boq-table-container-with-paddings'
      style={{
        padding: '10px 10px 2px 10px', // to have a gap when overflow
      }}
    >
      <Box
        className='boq-table-container'
        style={{
          padding: '5px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

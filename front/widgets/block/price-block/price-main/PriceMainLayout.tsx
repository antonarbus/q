import { Box } from '@mui/material'
import type { JSX } from 'react'

type Props = {
  main: JSX.Element
}

export const PriceMainLayout = ({ main }: Props): JSX.Element => {
  return (
    <Box
      className='layout price-value'
      style={{
        padding: '10px 15px',
        minHeight: '40px',
      }}
    >
      {main}
    </Box>
  )
}

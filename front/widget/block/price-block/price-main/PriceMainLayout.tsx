import { Box } from '@mui/material'
import type { JSX } from 'react'

type Props = {
  main: JSX.Element
}

export const PriceMainLayout = (props: Props): JSX.Element => {
  return (
    <Box
      className='layout price-value'
      style={{
        padding: '10px 15px',
        minHeight: '40px',
      }}
    >
      {props.main}
    </Box>
  )
}

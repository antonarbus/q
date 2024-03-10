import { Box } from '@mui/material'
import { signal } from '@preact/signals-react'

export const totalRowsSignal = signal(0)

export const TotalRowsCount = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '10px',
        bottom: '-25px',
        zIndex: 2,
      }}
    >
      Total rows: {totalRowsSignal}
    </Box>
  )
}

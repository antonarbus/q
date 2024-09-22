import { Box, Chip } from '@mui/material'
import { signal } from '@preact/signals-react'

export const displayedRowsCountSignal = signal(0)

export const DisplayedRowsCount = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '10px',
        bottom: '-30px',
        zIndex: 2,
      }}
    >
      Rows{' '}
      <Chip
        label={displayedRowsCountSignal}
        size='small'
        sx={{
          color: 'grey',
          fontWeight: 600,
        }}
      />
    </Box>
  )
}

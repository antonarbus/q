import { Box, Chip } from '@mui/material'
import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'

export const DisplayedRowsCount = (): JSX.Element => {
  const displayedRowsCount = useSelector(
    (state) => state.agGrid.displayedRowsCount,
  )

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
        label={displayedRowsCount}
        size='small'
        sx={{
          color: 'grey',
          fontWeight: 600,
        }}
      />
    </Box>
  )
}

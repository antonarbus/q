import { Box, Chip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const DisplayedRowsCount = (): React.JSX.Element => {
  const displayedRowsCount = reduxHolder.useSelector((state) => state.agGrid.displayedRowsCount)

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

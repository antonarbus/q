import { Box } from '@mui/material'
import { DragIcon } from 'client/features/drag_item'

export const IconsCell = (): JSX.Element => {
  return (
    <Box
      className='td icons'
      sx={{
        position: 'absolute',
        top: 0,
        height: 0,
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          background: 'yellow',
          scale: '0.5',
        }}
      >
        <DragIcon />
      </Box>
    </Box>
  )
}

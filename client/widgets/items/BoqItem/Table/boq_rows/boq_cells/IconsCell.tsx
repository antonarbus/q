import { Box } from '@mui/material'
import { CopyBoqRowIcon } from 'client/features/copy_boq_row'
import { DragIcon } from 'client/features/drag_item'
import type { BoqRow } from 'client/shared/types'

interface Props {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const IconsCell = ({ itemIndex, rowIndex, boqRow }: Props): JSX.Element => {
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
        <CopyBoqRowIcon itemIndex={itemIndex} rowIndex={rowIndex} boqRow={boqRow} />
      </Box>
    </Box>
  )
}

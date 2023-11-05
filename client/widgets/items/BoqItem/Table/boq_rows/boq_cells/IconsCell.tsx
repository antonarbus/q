import { Box } from '@mui/material'
import { CopyBoqRowIcon } from 'client/features/copy_boq_row'
import { DeleteBoqRowIcon } from 'client/features/delete_boq_row'
import { DragIcon } from 'client/features/drag_item'
import { className } from 'client/shared/className'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const BoqRowActionsContainer = ({ itemIndex, rowIndex, boqRow }: Props): JSX.Element => {
  return (
    <Box
      className={className.actionsContainer}
      sx={{
        position: 'absolute',
        top: 0,
        left: '-28px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: 'yellow',
          scale: '0.5',
          transformOrigin: 'top center',
        }}
      >
        <DragIcon />
        <CopyBoqRowIcon itemIndex={itemIndex} rowIndex={rowIndex} boqRow={boqRow} />
        <DeleteBoqRowIcon itemIndex={itemIndex} rowIndex={rowIndex} />
      </Box>
    </Box>
  )
}

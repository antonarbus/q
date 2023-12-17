import { Box } from '@mui/material'
import { CopyBoqRowIcon } from './copy_boq_row'
import { CutBoqRowIcon } from './cut_boq_row'
import { DeleteBoqRowIcon } from './delete_boq_row'
import { DragBoqRow } from './drag_boq_row'
import { className } from 'client/shared/className'
import type { BoqRow } from 'client/shared/types'

type Props = {
  rowIndex: number
  boqRow: BoqRow
}

export const BoqRowActions = ({ rowIndex, boqRow }: Props): JSX.Element => {
  return (
    <Box
      className={className.actionsContainer}
      sx={{
        position: 'absolute',
        left: '-33px',
        bottom: 0,
        height: '45px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          scale: '0.5',
          transformOrigin: 'top center',
        }}
      >
        <DragBoqRow />
        <CopyBoqRowIcon rowIndex={rowIndex} boqRow={boqRow} />
        <CutBoqRowIcon rowIndex={rowIndex} boqRow={boqRow} />
        <DeleteBoqRowIcon rowIndex={rowIndex} />
      </Box>
    </Box>
  )
}

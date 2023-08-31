import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { DragIcon } from 'client/features/drag_item'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColWidth, BoqRow as BoqRowType } from 'client/shared/types'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({ boqRow, index, rowIndex }: Props): JSX.Element => {
  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'description' }))

  return (
    <Box
      className='tr'
      sx={{
        display: 'flex',
        minHeight: '40px',
        alignItems: 'flex-end',
        position: 'relative',
        gap: '9px',
      }}
    >
      <Box
        className='td icons'
        sx={{
          width: '30px',
          minWidth: '30px',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            // position: 'absolute',
            background: 'yellow',
            // left: '20px',
            scale: '0.5',
          }}
        >
          <DragIcon />
        </Box>
      </Box>
      <Box
        className='td number'
        sx={{
          width: '30px',
          minWidth: '30px',
        }}
      >
        {rowIndex + 1}
      </Box>
      <Box
        className='td description'
        sx={{
          display: !descriptionColWidth ? 'flex' : 'block',
          flexGrow: !descriptionColWidth ? 1 : 0,
          flexShrink: 0,
          width: descriptionColWidth ?? 'auto',
        }}
      >
        {boqRow.description.html}
      </Box>
      <Box
        className='td item'
        sx={{
          flexGrow: 1,
          minWidth: '100px',
          width: '100%',
        }}
      >
        {boqRow.item.html}
      </Box>
      <Box
        className='td qty'
        sx={{
          flexGrow: 1,
          minWidth: '100px',
          width: '100%',
        }}
      >
        {boqRow.qty.html}
      </Box>
      <Box
        className='td price'
        sx={{
          flexGrow: 1,
          minWidth: '100px',
          width: '100%',
        }}
      >
        {boqRow.price.html}
      </Box>
    </Box>
  )
}

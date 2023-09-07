import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

interface Props {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const QtyCell = ({ itemIndex, boqRow }: Props): JSX.Element => {
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, headerName: 'qty' }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined

  return (
    <Box
      className='td qty'
      sx={{
        display: isQtyColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isQtyColWidthSetManually ? qtyColWidth : 'auto',
        maxWidth: isQtyColWidthSetManually ? qtyColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow.qty.html}
    </Box>
  )
}

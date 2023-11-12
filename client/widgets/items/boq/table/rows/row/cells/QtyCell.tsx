import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColKey = 'qty'

export const QtyCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColKey}
      sx={{
        display: isQtyColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isQtyColWidthSetManually ? qtyColWidth : 'auto',
        maxWidth: isQtyColWidthSetManually ? qtyColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow[boqColKey].html}
    </Box>
  )
}

import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColumnKey = 'qty'

export const QtyCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey: boqColumnKey }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColumnKey}
      sx={{
        display: isQtyColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isQtyColWidthSetManually ? qtyColWidth : 'auto',
        maxWidth: isQtyColWidthSetManually ? qtyColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow[boqColumnKey].html}
    </Box>
  )
}

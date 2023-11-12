import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColumnKey = 'item'

export const ItemCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey: boqColumnKey }))
  const isItemColWidthSetManually = itemColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColumnKey}
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isItemColWidthSetManually ? itemColWidth : 'auto',
        maxWidth: isItemColWidthSetManually ? itemColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow[boqColumnKey].html}
    </Box>
  )
}

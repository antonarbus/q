import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColKey = 'item'

export const ItemCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey }))
  const isItemColWidthSetManually = itemColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColKey}
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isItemColWidthSetManually ? itemColWidth : 'auto',
        maxWidth: isItemColWidthSetManually ? itemColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow[boqColKey].html}
    </Box>
  )
}

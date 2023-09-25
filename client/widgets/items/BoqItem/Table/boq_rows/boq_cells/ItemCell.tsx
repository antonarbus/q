import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const ItemCell = ({ itemIndex, boqRow }: Props): JSX.Element => {
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, headerName: 'item' }))
  const isItemColWidthSetManually = itemColWidth !== undefined

  return (
    <Box
      className='td item'
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isItemColWidthSetManually ? itemColWidth : 'auto',
        maxWidth: isItemColWidthSetManually ? itemColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow.item.html}
    </Box>
  )
}

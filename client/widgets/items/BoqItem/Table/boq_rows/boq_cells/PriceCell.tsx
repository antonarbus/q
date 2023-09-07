import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

interface Props {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const PriceCell = ({ itemIndex, boqRow }: Props): JSX.Element => {
  const priceColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, headerName: 'price' }))
  const isPriceColWidthSetManually = priceColWidth !== undefined

  return (
    <Box
      className='td price'
      sx={{
        display: isPriceColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isPriceColWidthSetManually ? priceColWidth : 'auto',
        maxWidth: isPriceColWidthSetManually ? priceColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow.price.html}
    </Box>
  )
}

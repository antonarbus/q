import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColumnKey = 'price'

export const PriceCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const priceColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey: boqColumnKey }))
  const isPriceColWidthSetManually = priceColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColumnKey}
      sx={{
        display: isPriceColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isPriceColWidthSetManually ? priceColWidth : 'auto',
        maxWidth: isPriceColWidthSetManually ? priceColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      {boqRow[boqColumnKey].html}
    </Box>
  )
}

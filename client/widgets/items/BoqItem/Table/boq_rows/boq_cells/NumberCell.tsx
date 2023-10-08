import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const NumberCell = ({ itemIndex, boqRow }: Props): JSX.Element => {
  const numberColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, headerName: 'number' }))
  const isNumberColWidthSetManually = numberColWidth !== undefined

  return (
    <Box
      className='td number'
      sx={{
        display: isNumberColWidthSetManually ? 'block' : 'flex',
        width: isNumberColWidthSetManually ? numberColWidth : 'auto',
        maxWidth: isNumberColWidthSetManually ? numberColWidth : 'auto',
        minWidth: '30px',
        flexShrink: 0,
      }}
    >
      {boqRow.number.html}
    </Box>
  )
}

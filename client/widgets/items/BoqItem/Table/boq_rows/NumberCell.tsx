import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRow
}

export const NumberCell = ({ index, boqRow }: Props): JSX.Element => {
  const numberColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'number' }))
  const isNumberColWidthSetManually = numberColWidth !== undefined

  return (
    <Box
      className='td number'
      sx={{
        display: isNumberColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isNumberColWidthSetManually ? numberColWidth : 'auto',
        maxWidth: isNumberColWidthSetManually ? numberColWidth : 'auto',
        minWidth: '30px',
      }}
    >
      {boqRow.number.html}
    </Box>
  )
}

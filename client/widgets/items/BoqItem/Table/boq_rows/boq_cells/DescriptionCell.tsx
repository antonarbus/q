import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRow
}

export const DescriptionCell = ({ index, boqRow }: Props): JSX.Element => {
  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'description' }))
  const isDescriptionColWidthSetManually = descriptionColWidth !== undefined

  return (
    <Box
      className='td description'
      sx={{
        display: isDescriptionColWidthSetManually ? 'block' : 'flex',
        flexGrow: isDescriptionColWidthSetManually ? 0 : 1,
        flexShrink: 0,
        width: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
        maxWidth: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
        minWidth: '200px',
      }}
    >
      {boqRow.description.html}
    </Box>
  )
}

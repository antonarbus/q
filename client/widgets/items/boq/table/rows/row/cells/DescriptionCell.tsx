import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColKey = 'description'

export const DescriptionCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey }))
  const isDescriptionColWidthSetManually = descriptionColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColKey}
      sx={{
        display: isDescriptionColWidthSetManually ? 'block' : 'flex',
        flexGrow: isDescriptionColWidthSetManually ? 0 : 1,
        flexShrink: 0,
        width: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
        maxWidth: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
        minWidth: '200px',
      }}
    >
      {boqRow[boqColKey].html}
    </Box>
  )
}

import { Box } from '@mui/material'
import { selectColumnWidth, useItem, useRow } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'

const boqColumnKey: BoqColumnKey = 'number'

export const NumberCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const numberColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isNumberColWidthSetManually = numberColWidth !== undefined
  const width = isNumberColWidthSetManually ? numberColWidth : 'auto'
  const minWidth = '30px'
  const maxWidth = width === 'auto' ? minWidth : width

  // todo: create a selector to understand sequential number of boqItem

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isNumberColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
        fontSize: '10px',
        color: 'grey',
        paddingBottom: '6px',
      }}
    >
      {itemIndex + 1}.{rowIndex + 1}
    </Box>
  )
}

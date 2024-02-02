import { Box } from '@mui/material'
import { boqColumnKey, getNumberOfBoqItemsAbove, useItem, useRow, useStylesForResizableCell } from '@entities/items'

export const NumberCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqColumnKey.number, minWidth: '30px' })

  return (
    <Box
      className={'td number'}
      sx={{ ...stylesForResizableCell, fontSize: '10px', color: 'grey', paddingBottom: '2px' }}
    >
      {getNumberOfBoqItemsAbove({ itemIndex }) + 1}.{rowIndex + 1}
    </Box>
  )
}

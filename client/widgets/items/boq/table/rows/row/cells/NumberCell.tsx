import { getNumberOfBoqItemsAbove, useItem, useRow, useStylesForResizableCell } from '@entities/items'
import type { BoqColumnKey } from '@shared/types'
import { Box } from '@mui/material'

const boqColumnKey: BoqColumnKey = 'number'

export const NumberCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '30px' })

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        ...stylesForResizableCell,
        fontSize: '10px',
        color: 'grey',
        paddingBottom: '6px',
      }}
    >
      {getNumberOfBoqItemsAbove({ itemIndex }) + 1}.{rowIndex + 1}
    </Box>
  )
}

import { Box } from '@mui/material'
import {
  boqColumnKey,
  getNumberOfBoqBlocksAbove,
  useItem,
  useRow,
  useStylesForResizableCell,
} from '@entities/quotation'

export const NumberCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    itemIndex,
    boqColumnKey: boqColumnKey.number,
    minWidth: '30px',
  })

  return (
    <Box
      className={'td number'}
      style={{
        ...stylesForResizableCell,
        fontSize: '10px',
        color: 'grey',
        paddingBottom: '2px',
      }}
    >
      {getNumberOfBoqBlocksAbove({ itemIndex }) + 1}.{rowIndex + 1}
    </Box>
  )
}

import { Box } from '@mui/material'
import {
  boqColumnKey,
  getNumberOfBoqBlocksAbove,
  useBlock,
  useRow,
  useStylesForResizableCell,
} from '@entities/quotation'

export const NumberCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
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
      {getNumberOfBoqBlocksAbove({ blockIndex }) + 1}.{rowIndex + 1}
    </Box>
  )
}

import {
  boqColumnKey,
  columnMinWidth,
  getNumberOfBoqBlocksAbove,
  useBlock,
  useRow,
  useStylesForResizableCell,
} from '@entities/quotation'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const NumberCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.number,
    minWidth: `${columnMinWidth.number}px`,
  })

  return (
    <Box
      className='td number'
      style={{
        ...stylesForResizableCell,
        color: 'grey',
        fontSize: '10px',
        paddingBottom: '4px',
      }}
    >
      {getNumberOfBoqBlocksAbove({ blockIndex }) + 1}.{rowIndex + 1}
    </Box>
  )
}

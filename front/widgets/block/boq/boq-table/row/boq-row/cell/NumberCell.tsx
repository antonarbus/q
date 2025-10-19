import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getNumberOfBoqBlocksAbove } from '@entities/quotation/util/getNumberOfBoqBlocksAbove'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const NumberCell = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: block.index,
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
      {getNumberOfBoqBlocksAbove({ blockIndex: block.index }) + 1}.
      {row.index + 1}
    </Box>
  )
}

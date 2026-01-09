import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getNumberOfBoqBlocksAbove } from '@entity/quotation/util/getNumberOfBoqBlocksAbove'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const NumberCell = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'number',
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

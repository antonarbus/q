import { columnMinWidth } from '@front/entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { useRow } from '@front/entities/quotation/provider/RowProvider'
import { getNumberOfBoqBlocksAbove } from '@front/entities/quotation/util/getNumberOfBoqBlocksAbove'
import { Box } from '@mui/material'

export const NumberCell = (): React.JSX.Element => {
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
      sx={{
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

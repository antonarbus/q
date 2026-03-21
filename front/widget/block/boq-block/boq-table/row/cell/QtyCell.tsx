import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { recalculateSubTotalPrices } from '@entity/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinQtyCell } from '@feature/blocks/pin/pin-qty-cell/pinQtyCell'
import { focusPriceCellAtBoqBlock } from '@feature/blocks/focus-price-cell-at-boq-block/focusPriceCellAtBoqBlock'
import { updateQtyCellAtBoqBlock } from '@feature/blocks/update-qty-cell-at-boq-block/updateQtyCellAtBoqBlock'
import { formatQtyCellAtBoqBlock } from '@feature/blocks/format-qty-cell-at-boq-block/formatQtyCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const QtyCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'qty',
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockQtyCell',
          blockIndex: block.index,
          rowIndex: row.index,
        })}
        className='td qty'
        placeholder='Qty...'
        contentGetter={() =>
          getHtmlOfCellFromStoreByIndex({
            blockIndex: block.index,
            rowIndex: row.index,
            cellKey: 'qty',
          })
        }
        onChange={() => {
          const didUpdate = updateQtyCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          if (didUpdate === true) {
            recalculateSubTotalPrices({ incrementally: true })
            recalculateTotalPrices()
          }
        }}
        onFocusOut={() => {
          formatQtyCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) => {
          if (event.key !== 'Tab') {
            return false
          }

          event.preventDefault()

          focusPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          return true
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
      <Pin
        cellKey='qty'
        onClick={() => {
          pinQtyCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

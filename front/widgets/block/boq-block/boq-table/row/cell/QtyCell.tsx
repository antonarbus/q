import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { useRow } from '@front/entities/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { Box } from '@mui/material'
import { TextEditor } from '@front/shared/component/TextEditor'
import { Pin } from './Pin'
import { pinQtyCell } from '@front/features/blocks/pin/pin-qty-cell/pinQtyCell'
import { focusPriceCellAtBoqBlock } from '@front/features/blocks/focus-price-cell-at-boq-block/focusPriceCellAtBoqBlock'
import { updateQtyCellAtBoqBlock } from '@front/features/blocks/update-qty-cell-at-boq-block/updateQtyCellAtBoqBlock'
import { formatQtyCellAtBoqBlock } from '@front/features/blocks/format-qty-cell-at-boq-block/formatQtyCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

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

          // stop ProseMirror propagation
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

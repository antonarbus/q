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
import { pinItemPriceCell } from '@front/features/blocks/pin/pin-item-price-cell/pinItemPriceCell'
import { focusQtyCellAtBoqBlock } from '@front/features/blocks/focus-qty-cell-at-boq-block/focusQtyCellAtBoqBlock'
import { updateItemPriceCellAtBoqBlock } from '@front/features/blocks/update-item-price-cell-at-boq-block/updateItemPriceCellAtBoqBlock'
import { formatItemPriceCellAtBoqBlock } from '@front/features/blocks/format-item-price-cell-at-boq-block/formatItemPriceCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const ItemPriceCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'itemPrice',
    minWidth: `${columnMinWidth.itemPrice}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockItemPriceCell',
          blockIndex: block.index,
          rowIndex: row.index,
        })}
        className='td itemPrice'
        placeholder='Item price...'
        contentGetter={() =>
          getHtmlOfCellFromStoreByIndex({
            blockIndex: block.index,
            cellKey: 'itemPrice',
            rowIndex: row.index,
          })
        }
        onChange={() => {
          const didUpdate = updateItemPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          if (didUpdate === true) {
            recalculateSubTotalPrices({ incrementally: true })
            recalculateTotalPrices()
          }
        }}
        onFocusOut={() => {
          formatItemPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) => {
          if (event.key !== 'Tab') {
            return false
          }

          event.preventDefault()

          focusQtyCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          return true // stop ProseMirror propagation
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
      <Pin
        cellKey='itemPrice'
        onClick={() => {
          pinItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
      />
    </Box>
  )
}

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
import { pinItemPriceCell } from '@feature/blocks/pin/pin-item-price-cell/pinItemPriceCell'
import { focusQtyCellAtBoqBlock } from '@feature/blocks/focus-qty-cell-at-boq-block/focusQtyCellAtBoqBlock'
import { updateItemPriceCellAtBoqBlock } from '@feature/blocks/update-item-price-cell-at-boq-block/updateItemPriceCellAtBoqBlock'
import { formatItemPriceCellAtBoqBlock } from '@feature/blocks/format-item-price-cell-at-boq-block/formatItemPriceCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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

          // todo: why do we return boolean?
          return true
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

import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinItemPriceCell } from '@feature/blocks/pin/pin-item-price-cell/pinItemPriceCell'
import { onTabAwayFromItemPriceCell } from '@feature/blocks/on-cell-tab-away/on-tab-away-from-item-price-cell/onTabAwayFromItemPriceCell'
import { onChangeItemPriceCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-item-price-cell-at-boq-block/onChangeItemPriceCellAtBoqBlock'
import { onFocusOutFromItemPriceCell } from '@feature/blocks/on-text-focus-out/on-focus-out-from-item-price-cell-at-boq-block/onFocusOutFromItemPriceCell'
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
          getCellHtmlFromStore({
            blockIndex: block.index,
            cellKey: 'itemPrice',
            rowIndex: row.index,
          })
        }
        onUpdate={() => {
          onChangeItemPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onBlur={() => {
          onFocusOutFromItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) =>
          onTabAwayFromItemPriceCell({
            event,
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }
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

import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinItemPriceCell } from '@feature/blocks/pin-item-price-cell/pinItemPriceCell'
import { tabFromItemPriceCell } from '@feature/blocks/tab-away-from-item-price-cell/tabFromItemPriceCell'
import { handleChangeOfItemPriceCell } from '@feature/blocks/handle-change-of-item-price-cell-at-boq-block/handleChangeOfItemPriceCell'
import { handleFocusOutFromItemPriceCell } from '@feature/blocks/handle-focus-out-from-item-price-cell-at-boq-block/handleFocusOutFromItemPriceCell'

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
        registryKey={{
          blockIndex: block.index,
          rowIndex: row.index,
          cellKey: 'itemPrice',
        }}
        className='td itemPrice'
        placeholder='Item price...'
        contentGetter={() =>
          getCellHtmlFromStore({
            blockIndex: block.index,
            cellKey: 'itemPrice',
            rowIndex: row.index,
          })
        }
        onUpdate={(params) => {
          handleChangeOfItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onBlur={() => {
          handleFocusOutFromItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) =>
          tabFromItemPriceCell({
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
        onClick={(event: React.MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)

          pinItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
      />
    </Box>
  )
}

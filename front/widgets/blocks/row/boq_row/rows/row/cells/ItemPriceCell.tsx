import { Box } from '@mui/material'
import {
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
  getRowCellHtmlFromStore,
  BOOKMARK_POS_AT_BLOCKS,
  columnMinWidth,
} from '@entities/quotation'
import { updateItemPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/item_price/updateItemPriceCell'
import { formatItemPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/item_price/formatItemPriceCell'

export const ItemPriceCell = (): React.JSX.Element => {
  const { itemPriceCellEditorRef, priceCellEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.itemPrice}`}
        editorRef={itemPriceCellEditorRef}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.itemPrice })
        }
        onBlur={() => {
          formatItemPriceCell({ itemPriceCellEditorRef })
        }}
        onContentChange={() => {
          updateItemPriceCell({ itemPriceCellEditorRef, priceCellEditorRef })
        }}
        placeholder='Item price...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

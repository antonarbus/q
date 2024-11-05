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
  bookmarkPosAtBlocks,
  columnMinWidth,
} from '@entities/quotation'
import { updateItemPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/item_price/updateItemPriceCell'
import { formatItemPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/item_price/formatItemPriceCell'

export const ItemPriceCell = (): React.JSX.Element => {
  const { itemPriceCellEditorRef, priceCellEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: bookmarkPosAtBlocks,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        editorRef={itemPriceCellEditorRef}
        className={`td ${boqRowCellKey.itemPrice}`}
        placeholder='Item price...'
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.itemPrice })
        }
        onContentChange={() => {
          updateItemPriceCell({ itemPriceCellEditorRef, priceCellEditorRef })
        }}
        onBlur={() => {
          formatItemPriceCell({ itemPriceCellEditorRef })
        }}
      />
    </Box>
  )
}

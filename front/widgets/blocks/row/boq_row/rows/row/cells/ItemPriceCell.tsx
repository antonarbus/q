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
} from '@entities/quotation'
import { updateItemPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/item_price/updateItemPriceCell'
import { formatItemPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/item_price/formatItemPriceCell'

export const ItemPriceCell = (): JSX.Element => {
  const { itemPriceCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: 0,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: '100px',
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.itemPrice}`}
        editorRef={itemPriceCellEditorRef}
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

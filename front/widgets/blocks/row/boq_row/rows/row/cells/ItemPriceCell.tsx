import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/blocks/cell/pin'
import { tabFromItemPriceCell } from '@features/blocks/cell/tab_away_from_cell'
import { formatBoqRowItemPriceCell } from '@features/blocks/cell/update_cell'
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

export const ItemPriceCell = (): JSX.Element => {
  const {
    rowIndex,
    itemPriceCellEditorRef,
    priceCellEditorRef,
    qtyCellEditorRef,
  } = useRow()
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
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.itemPrice })
        }
        onContentChange={() => {
          updateItemPriceCell({
            itemPriceCellEditorRef,
            priceCellEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowItemPriceCell({
            blockIndex: 0,
            rowIndex,
            itemPriceCellEditorRef,
          })
        }}
        onKeydown={(e) => {
          tabFromItemPriceCell({ e, rowIndex, qtyCellEditorRef })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.itemPrice}
        onClick={() => {
          pinBoqRowItemPriceCell({ blockIndex: 0, rowIndex: 0 })
        }}
      />
    </Box>
  )
}

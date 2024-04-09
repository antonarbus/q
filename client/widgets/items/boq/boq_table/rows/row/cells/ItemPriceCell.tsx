import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/items/pin'
import { tabFromItemPriceCell } from '@features/items/tab_away_from_cell'
import { formatBoqRowItemPriceCell, updateBoqRowItemPriceCell } from '@features/items/update_cell'
import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, boqRowCellStyle, useStylesForResizableCell, boqRowCellKey, boqColumnKey, boqRowCellSx } from '@entities/quotation'

export const ItemPriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, itemPriceCellEditorRef, priceCellEditorRef, qtyCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqColumnKey.itemPrice, minWidth: '100px' })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }} >
      <Froala
        className={`td ${boqRowCellKey.itemPrice}`}
        editorRef={itemPriceCellEditorRef}
        placeholder='Item price...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.itemPrice })}
        onContentChange={() => {
          updateBoqRowItemPriceCell({ itemIndex, itemPriceCellEditorRef, priceCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowItemPriceCell({ itemIndex, rowIndex, itemPriceCellEditorRef })
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
          pinBoqRowItemPriceCell({ itemIndex, rowIndex })
        }}
      />
    </Box>
  )
}

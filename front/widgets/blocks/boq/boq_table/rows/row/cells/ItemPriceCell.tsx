import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/items/cell/pin'
import { tabFromItemPriceCell } from '@features/items/cell/tab_away_from_cell'
import {
  formatBoqRowItemPriceCell,
  updateBoqRowItemPriceCell,
} from '@features/items/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBlock,
  useRow,
  useBoqItem,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
} from '@entities/quotation'

export const ItemPriceCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoqItem()
  const {
    rowIndex,
    itemPriceCellEditorRef,
    priceCellEditorRef,
    qtyCellEditorRef,
  } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
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
          getBoqCellHtmlFromStore({
            blockIndex,
            rowIndex,
            boqRowCellKey: boqRowCellKey.itemPrice,
          })
        }
        onContentChange={() => {
          updateBoqRowItemPriceCell({
            blockIndex,
            itemPriceCellEditorRef,
            priceCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowItemPriceCell({
            blockIndex,
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
          pinBoqRowItemPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

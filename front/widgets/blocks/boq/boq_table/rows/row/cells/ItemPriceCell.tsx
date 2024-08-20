import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/blocks/cell/pin'
import { tabFromItemPriceCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowItemPriceCell,
  updateBoqRowItemPriceCell,
} from '@features/blocks/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBlock,
  useRow,
  useBoq,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
  columnMinWidth,
} from '@entities/quotation'

export const ItemPriceCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoq()
  const {
    rowIndex,
    itemPriceCellEditorRef,
    priceCellEditorRef,
    qtyCellEditorRef,
  } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: `${columnMinWidth.itemPrice}px`,
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
        onClick={(e: React.MouseEvent) => {
          e.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowItemPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/blocks/cell/pin'
import { tabFromItemPriceCell } from '@features/blocks/cell/tab-away-from-cell'
import {
  formatBoqRowItemPriceCell,
  updateBoqRowItemPriceCell,
} from '@features/blocks/cell/update-cell'
import type { JSX, MouseEvent } from 'react'
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
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex,
            boqRowCellKey: boqRowCellKey.itemPrice,
            rowIndex,
          })
        }
        onBlur={() => {
          formatBoqRowItemPriceCell({
            blockIndex,
            itemPriceCellEditorRef,
            rowIndex,
          })
        }}
        onContentChange={() => {
          updateBoqRowItemPriceCell({
            blockIndex,
            itemPriceCellEditorRef,
            priceCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onKeydown={(event) => {
          tabFromItemPriceCell({
            event,
            qtyCellEditorRef,
            rowIndex,
          })
        }}
        placeholder='Item price...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.itemPrice}
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowItemPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

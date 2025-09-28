import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/blocks/cell/pin'
import { tabFromQtyCell } from '@features/blocks/cell/tab-away-from-cell'
import {
  formatBoqRowQtyCell,
  updateBoqRowQtyCell,
} from '@features/blocks/cell/update-cell'
import {
import type { JSX,MouseEvent } from 'react'
  getBoqCellHtmlFromStore,
  useBlock,
  useRow,
  useBoq,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellSx,
  columnMinWidth,
} from '@entities/quotation'

export const QtyCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoq()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.qty,
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.qty}`}
        editorRef={qtyCellEditorRef}
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex,
            rowIndex,
            boqRowCellKey: boqRowCellKey.qty,
          })
        }
        onBlur={() => {
          formatBoqRowQtyCell({ blockIndex, qtyCellEditorRef, rowIndex })
        }}
        onContentChange={() => {
          updateBoqRowQtyCell({
            blockIndex,
            priceCellEditorRef,
            qtyCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onKeydown={(event) => {
          tabFromQtyCell({ event, rowIndex, priceCellEditorRef })
        }}
        placeholder='Qty...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.qty}
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowQtyCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

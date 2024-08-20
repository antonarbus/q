import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/blocks/cell/pin'
import { tabFromQtyCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowQtyCell,
  updateBoqRowQtyCell,
} from '@features/blocks/cell/update_cell'
import {
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
        placeholder='Qty...'
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex,
            rowIndex,
            boqRowCellKey: boqRowCellKey.qty,
          })
        }
        onContentChange={() => {
          updateBoqRowQtyCell({
            blockIndex,
            priceCellEditorRef,
            qtyCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowQtyCell({ blockIndex, qtyCellEditorRef, rowIndex })
        }}
        onKeydown={(e) => {
          tabFromQtyCell({ e, rowIndex, priceCellEditorRef })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.qty}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowQtyCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

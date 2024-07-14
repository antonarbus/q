import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/items/cell/pin'
import { tabFromQtyCell } from '@features/items/cell/tab_away_from_cell'
import {
  formatBoqRowQtyCell,
  updateBoqRowQtyCell,
} from '@features/items/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBlock,
  useRow,
  useBoqItem,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellSx,
} from '@entities/quotation'

export const QtyCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.qty,
    minWidth: '100px',
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
        onClick={() => {
          pinBoqRowQtyCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/blocks/cell/pin'
import { tabFromQtyCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowQtyCell,
  updateBoqRowQtyCell,
} from '@features/blocks/cell/update_cell'
import {
  useBlock,
  useRow,
  useBoqBlock,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellSx,
  getRowCellHtmlFromStore,
} from '@entities/quotation'

export const QtyCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoqBlock()
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
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.qty })
        }
        onContentChange={() => {
          updateBoqRowQtyCell({
            blockIndex: 0,
            priceCellEditorRef,
            qtyCellEditorRef,
            rowIndex: 0,
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

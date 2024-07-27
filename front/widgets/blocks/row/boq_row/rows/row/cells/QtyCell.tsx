import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/blocks/cell/pin'
import { formatBoqRowQtyCell } from '@features/blocks/cell/update_cell'
import {
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellSx,
  getRowCellHtmlFromStore,
} from '@entities/quotation'
import { updateQtyCell } from '@features/blocks/cell/update_cell/row_block_cells/qty/updateQtyCell'

export const QtyCell = (): JSX.Element => {
  const { qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: 0,
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
          updateQtyCell({
            priceCellEditorRef,
            qtyCellEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowQtyCell({ blockIndex: 0, qtyCellEditorRef, rowIndex: 0 })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.qty}
        onClick={() => {
          pinBoqRowQtyCell({ blockIndex: 0, rowIndex: 0 })
        }}
      />
    </Box>
  )
}

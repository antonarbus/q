import { Box } from '@mui/material'
import {
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellSx,
  getRowCellHtmlFromStore,
  BOOKMARK_POS_AT_BLOCKS,
  columnMinWidth,
} from '@entities/quotation'
import { updateQtyCell } from '@features/blocks/cell/update_cell/row_block_cells/qty/updateQtyCell'
import { formatQtyCell } from '@features/blocks/cell/update_cell/row_block_cells/qty/formatQtyCell'

export const QtyCell = (): React.JSX.Element => {
  const { qtyCellEditorRef, priceCellEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.qty,
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.qty}`}
        editorRef={qtyCellEditorRef}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.qty })
        }
        onBlur={() => {
          formatQtyCell({ qtyCellEditorRef })
        }}
        onContentChange={() => {
          updateQtyCell({ priceCellEditorRef, qtyCellEditorRef })
        }}
        placeholder='Qty...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

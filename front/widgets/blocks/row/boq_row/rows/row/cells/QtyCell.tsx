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
  bookmarkPosAtBlocks,
  columnMinWidth,
} from '@entities/quotation'
import { updateQtyCell } from '@features/blocks/cell/update_cell/row_block_cells/qty/updateQtyCell'
import { formatQtyCell } from '@features/blocks/cell/update_cell/row_block_cells/qty/formatQtyCell'

export const QtyCell = (): JSX.Element => {
  const { qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: bookmarkPosAtBlocks,
    boqColumnKey: boqColumnKey.qty,
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.qty}`}
        editorRef={qtyCellEditorRef}
        placeholder='Qty...'
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.qty })
        }
        onContentChange={() => {
          updateQtyCell({ priceCellEditorRef, qtyCellEditorRef })
        }}
        onBlur={() => {
          formatQtyCell({ qtyCellEditorRef })
        }}
      />
    </Box>
  )
}

import {
  BOOKMARK_POS_AT_BLOCKS,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellStyle,
  boqRowCellSx,
  columnMinWidth,
  Froala,
  getRowCellHtmlFromStore,
  useRow,
  useStylesForResizableCell,
} from '@entities/quotation'
import { formatQtyCell } from '@features/blocks/cell/update-cell/row-block-cells/qty/formatQtyCell'
import { updateQtyCell } from '@features/blocks/cell/update-cell/row-block-cells/qty/updateQtyCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const QtyCell = (): JSX.Element => {
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

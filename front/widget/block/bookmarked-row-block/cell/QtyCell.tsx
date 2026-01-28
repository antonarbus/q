import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { formatQtyCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/qty/formatQtyCell'
import { updateQtyCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/qty/updateQtyCell'
import { Box } from '@mui/material'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'

export const QtyCell = (): JSX.Element => {
  const row = useRow()
  const isEditorActive = useSelector((state) => state.text.isEditable)

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'qty',
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Tiptap
        editorRef={row.qtyCellEditorRef}
        className='td qty'
        placeholder='Qty...'
        isEditorActive={isEditorActive}
        content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'qty' })}
        onUpdate={(params) => {
          updateQtyCell({
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
          })
        }}
        onBlur={() => {
          formatQtyCell({ qtyCellEditorRef: row.qtyCellEditorRef })
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

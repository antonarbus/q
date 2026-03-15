import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { formatQtyCell } from '@feature/blocks/focus-out-from-qty-cell-at-bookmark-block/formatQtyCell'
import { updateQtyCell } from '@feature/blocks/change-qty-cell-at-bookmark-block/updateQtyCell'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'

export const QtyCell = (): React.JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'qty',
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        editorRef={row.qtyCellEditorRef}
        className='td qty'
        placeholder='Qty...'
        contentGetter={() =>
          getBookmarkedRowCellHtmlFromStore({ cellKey: 'qty' })
        }
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

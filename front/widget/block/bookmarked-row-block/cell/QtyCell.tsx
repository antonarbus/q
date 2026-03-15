import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { handleFocusOutFromQtyCell } from '@feature/blocks/handle-focus-out-from-qty-cell-at-bookmark-block/handleFocusOutFromQtyCell'
import { handleChangeOfQtyCell } from '@feature/blocks/handle-change-of-qty-cell-at-bookmark-block/handleChangeOfQtyCell'
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
          handleChangeOfQtyCell({
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
          })
        }}
        onBlur={() => {
          handleFocusOutFromQtyCell({ qtyCellEditorRef: row.qtyCellEditorRef })
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

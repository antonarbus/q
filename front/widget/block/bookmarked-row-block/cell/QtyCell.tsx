import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getHtmlOfBookmarkedRowCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBookmarkedRowCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { formatQtyCellAtBookmarkBlock } from '@feature/blocks/format-qty-cell-at-bookmark-block/formatQtyCellAtBookmarkBlock'
import { updateQtyCellAtBookmarkBlock } from '@feature/blocks/update-qty-cell-at-bookmark-block/updateQtyCellAtBookmarkBlock'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const QtyCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'qty',
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockQtyCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        })}
        className='td qty'
        placeholder='Qty...'
        contentGetter={() =>
          getHtmlOfBookmarkedRowCellFromStoreByIndex({ cellKey: 'qty' })
        }
        onChange={() => {
          updateQtyCellAtBookmarkBlock()
        }}
        onFocusOut={() => {
          formatQtyCellAtBookmarkBlock()
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

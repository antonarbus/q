import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@front/entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { getHtmlOfBookmarkedRowCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBookmarkedRowCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { formatQtyCellAtBookmarkBlock } from '@front/features/blocks/format-qty-cell-at-bookmark-block/formatQtyCellAtBookmarkBlock'
import { updateQtyCellAtBookmarkBlock } from '@front/features/blocks/update-qty-cell-at-bookmark-block/updateQtyCellAtBookmarkBlock'
import { Box } from '@mui/material'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

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

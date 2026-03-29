import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { getHtmlOfBookmarkedRowCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBookmarkedRowCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { formatItemPriceCellAtBookmarkBlock } from '@front/features/blocks/format-item-price-cell-at-bookmark-block/formatItemPriceCellAtBookmarkBlock'
import { updateItemPriceCellAtBookmarkBlock } from '@front/features/blocks/update-item-price-cell-at-bookmark-block/updateItemPriceCellAtBookmarkBlock'
import { Box } from '@mui/material'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const ItemPriceCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'itemPrice',
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockItemPriceCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        })}
        className='td itemPrice'
        placeholder='Item price...'
        contentGetter={() => getHtmlOfBookmarkedRowCellFromStoreByIndex({ cellKey: 'itemPrice' })}
        onChange={() => {
          updateItemPriceCellAtBookmarkBlock()
        }}
        onFocusOut={() => {
          formatItemPriceCellAtBookmarkBlock()
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

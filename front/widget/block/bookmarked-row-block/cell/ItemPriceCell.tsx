import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getHtmlOfBookmarkedRowCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBookmarkedRowCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { formatItemPriceCellAtBookmarkBlock } from '@feature/blocks/format-item-price-cell-at-bookmark-block/formatItemPriceCellAtBookmarkBlock'
import { updateItemPriceCellAtBookmarkBlock } from '@feature/blocks/update-item-price-cell-at-bookmark-block/updateItemPriceCellAtBookmarkBlock'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
        contentGetter={() =>
          getHtmlOfBookmarkedRowCellFromStoreByIndex({ cellKey: 'itemPrice' })
        }
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

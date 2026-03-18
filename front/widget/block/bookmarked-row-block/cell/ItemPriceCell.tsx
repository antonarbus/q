import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { onFocusOutFromItemPriceCell } from '@feature/blocks/on-focus-out-from-item-price-cell-at-bookmark-block/onFocusOutFromItemPriceCell'
import { onChangeItemPriceCellAtBookmarkBlock } from '@feature/blocks/on-change-item-price-cell-at-bookmark-block/onChangeItemPriceCellAtBookmarkBlock'
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
          getBookmarkedRowCellHtmlFromStore({ cellKey: 'itemPrice' })
        }
        onUpdate={(params) => {
          onChangeItemPriceCellAtBookmarkBlock({})
        }}
        onBlur={() => {
          onFocusOutFromItemPriceCell({})
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

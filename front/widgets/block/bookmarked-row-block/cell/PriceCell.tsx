import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { getHtmlOfBookmarkedRowCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBookmarkedRowCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { formatPriceCellAtBookmarkBlock } from '@front/features/blocks/format-price-cell-at-bookmark-block/formatPriceCellAtBookmarkBlock'
import { updatePriceCellAtBookmarkBlock } from '@front/features/blocks/update-price-cell-at-bookmark-block/updatePriceCellAtBookmarkBlock'
import { Box } from '@mui/material'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const PriceCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'price',
    minWidth: columnMinWidth.price,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        })}
        className='td price'
        placeholder='Price...'
        contentGetter={() => getHtmlOfBookmarkedRowCellFromStoreByIndex({ cellKey: 'price' })}
        onChange={() => {
          updatePriceCellAtBookmarkBlock()
        }}
        onFocusOut={() => {
          formatPriceCellAtBookmarkBlock()
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

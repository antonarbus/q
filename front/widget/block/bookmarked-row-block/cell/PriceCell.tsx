import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { onFocusOutFromPriceCell } from '@feature/blocks/on-focus-out-from-price-cell-at-bookmark-block/onFocusOutFromPriceCell'
import { onChangePriceCellAtBookmarkBlock } from '@feature/blocks/on-change-price-cell-at-bookmark-block/onChangePriceCellAtBookmarkBlock'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
        contentGetter={() =>
          getBookmarkedRowCellHtmlFromStore({ cellKey: 'price' })
        }
        onUpdate={(params) => {
          onChangePriceCellAtBookmarkBlock({})
        }}
        onBlur={() => {
          onFocusOutFromPriceCell({})
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

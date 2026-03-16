import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { handleFocusOutFromItemPriceCell } from '@feature/blocks/handle-focus-out-from-item-price-cell-at-bookmark-block/handleFocusOutFromItemPriceCell'
import { handleChangeOfItemPriceCell } from '@feature/blocks/handle-change-of-item-price-cell-at-bookmark-block/handleChangeOfItemPriceCell'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'

export const ItemPriceCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'itemPrice',
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={{
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
          cellKey: 'itemPrice',
        }}
        className='td itemPrice'
        placeholder='Item price...'
        contentGetter={() =>
          getBookmarkedRowCellHtmlFromStore({ cellKey: 'itemPrice' })
        }
        onUpdate={(params) => {
          handleChangeOfItemPriceCell({})
        }}
        onBlur={() => {
          handleFocusOutFromItemPriceCell({})
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

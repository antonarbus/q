import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
// import { formatItemPriceCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/item-price/formatItemPriceCell'
import { updateItemPriceCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/item-price/updateItemPriceCell'
import { Box } from '@mui/material'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { JSX } from 'react'

export const ItemPriceCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'itemPrice',
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* <Froala
        onBlur={() => {
          formatItemPriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
          })
        }}
      /> */}
      <Tiptap
        editorRef={row.itemPriceCellEditorRef}
        className='td itemPrice'
        placeholder='Item price...'
        content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'itemPrice' })}
        onUpdate={(params) => {
          updateItemPriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellSx,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

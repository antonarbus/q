import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { focusOutFromPriceCell } from '@feature/blocks/focus-out-from-price-cell-at-bookmark-block/focusOutFromPriceCell'
import { changePriceCell } from '@feature/blocks/change-price-cell-at-bookmark-block/changePriceCell'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'

export const PriceCell = (): React.JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'price',
    minWidth: columnMinWidth.price,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        editorRef={row.priceCellEditorRef}
        className='td price'
        placeholder='Price...'
        contentGetter={() =>
          getBookmarkedRowCellHtmlFromStore({ cellKey: 'price' })
        }
        onUpdate={(params) => {
          changePriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
        onBlur={() => {
          focusOutFromPriceCell({ priceCellEditorRef: row.priceCellEditorRef })
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

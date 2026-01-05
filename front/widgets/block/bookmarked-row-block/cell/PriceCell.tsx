import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entities/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle, cellSx } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { formatPriceCell } from '@features/blocks/update/update-cell-at-bookmarked-row-block/price/formatPriceCell'
import { updatePriceCell } from '@features/blocks/update/update-cell-at-bookmarked-row-block/price/updatePriceCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const PriceCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'price',
    minWidth: columnMinWidth.price,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className='td price'
        editorRef={row.priceCellEditorRef}
        htmlGetter={() =>
          getBookmarkedRowCellHtmlFromStore({ cellKey: 'price' })
        }
        onBlur={() => {
          formatPriceCell({ priceCellEditorRef: row.priceCellEditorRef })
        }}
        onContentChange={() => {
          updatePriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
        placeholder='Price...'
        style={cellStyle}
        sx={cellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

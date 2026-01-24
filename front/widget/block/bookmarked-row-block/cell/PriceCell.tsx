// import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
// import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
// import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
// import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
// import { formatPriceCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/price/formatPriceCell'
import { updatePriceCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/price/updatePriceCell'
import { Box } from '@mui/material'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { JSX } from 'react'

export const PriceCell = (): JSX.Element => {
  const row = useRow()

  // const stylesForResizableCell = useStylesForResizableCell({
  //   blockIndex: BOOKMARK_POS_AT_BLOCKS,
  //   boqColumnKey: 'price',
  //   minWidth: columnMinWidth.price,
  // })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* <Froala
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
      /> */}
      <Tiptap
        editorRef={row.priceCellEditorRef}
        content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'price' })}
        onContentChange={(params) => {
          updatePriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
      />
    </Box>
  )
}

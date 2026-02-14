import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { formatPriceCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/price/formatPriceCell'
import { updatePriceCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/price/updatePriceCell'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
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
      <TextEditor
        editorRef={row.priceCellEditorRef}
        className='td price'
        placeholder='Price...'
        content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'price' })}
        onUpdate={(params) => {
          updatePriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
        onBlur={() => {
          formatPriceCell({ priceCellEditorRef: row.priceCellEditorRef })
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
    </Box>
  )
}

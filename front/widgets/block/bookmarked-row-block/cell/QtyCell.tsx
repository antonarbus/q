import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entities/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle, cellSx } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { formatQtyCell } from '@features/blocks/update/update-cell-at-bookmarked-row-block/qty/formatQtyCell'
import { updateQtyCell } from '@features/blocks/update/update-cell-at-bookmarked-row-block/qty/updateQtyCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const QtyCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'qty',
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className='td qty'
        editorRef={row.qtyCellEditorRef}
        htmlGetter={() => getBookmarkedRowCellHtmlFromStore({ cellKey: 'qty' })}
        onBlur={() => {
          formatQtyCell({ qtyCellEditorRef: row.qtyCellEditorRef })
        }}
        onContentChange={() => {
          updateQtyCell({
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
          })
        }}
        placeholder='Qty...'
        style={cellStyle}
        sx={cellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { formatQtyCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/qty/formatQtyCell'
import { updateQtyCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/qty/updateQtyCell'
import { Box } from '@mui/material'
import { TiptapExample } from '@page/test-page/tiptap-example/TiptapExample'
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
      {/* <Froala
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
      /> */}
      <TiptapExample
        content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'qty' })}
      />
    </Box>
  )
}

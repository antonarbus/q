import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/blocks/cell/pin'
import { tabFromQtyCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowQtyCell,
  updateBoqRowQtyCell,
} from '@features/blocks/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBlock,
  useRow,
  useBoqBlock,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellSx,
  itemType,
} from '@entities/quotation'
import { bookmarkSignal } from '@entities/bookmark'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'

export const QtyCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoqBlock()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.qty,
    minWidth: '100px',
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.qty}`}
        editorRef={qtyCellEditorRef}
        placeholder='Qty...'
        htmlGetter={() => {
          if (bookmarkSignal.value?.type !== itemType.boq) return ''
          const row = bookmarkSignal.value.boq.rows[rowIndex]
          if (!row) return ''
          const html = row.qty.html
          return html
        }}
        onContentChange={() => {
          if (qtyCellEditorRef.current === null) return
          if (bookmarkSignal.value?.type !== itemType.boq) return
          const html = qtyCellEditorRef.current.html.get()
          const cellTextContent = getTextContentFromHtml({ html })
          const cellValueFromHtml = getNumberFromString({
            string: cellTextContent,
          })
          const clonedBookmark = structuredClone(bookmarkSignal.value)
          const row = clonedBookmark.boq.rows[rowIndex]
          if (!row) return
          row.qty.html = html
          row.qty.value = cellValueFromHtml
          bookmarkSignal.value = clonedBookmark
        }}
        onBlur={() => {
          formatBoqRowQtyCell({ blockIndex, qtyCellEditorRef, rowIndex })
        }}
        onKeydown={(e) => {
          tabFromQtyCell({ e, rowIndex, priceCellEditorRef })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.qty}
        onClick={() => {
          pinBoqRowQtyCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

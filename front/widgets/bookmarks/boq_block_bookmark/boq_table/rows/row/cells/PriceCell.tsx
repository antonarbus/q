import { Box } from '@mui/material'
import {
  Pin,
  pinBoqRowPriceCell,
  showBoqRowPins,
} from '@features/blocks/cell/pin'
import { tabFromPriceCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowPriceCell,
  updateBoqRowPriceCell,
  validateBoqRowPrice,
} from '@features/blocks/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBoqBlock,
  useBlock,
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
  itemType,
} from '@entities/quotation'
import { bookmarkSignal } from '@entities/bookmark'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'

export const PriceCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const {
    rowIndex,
    priceCellEditorRef,
    qtyCellEditorRef,
    itemPriceCellEditorRef,
  } = useRow()
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqBlock()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.price,
    minWidth: '100px',
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.price}`}
        editorRef={priceCellEditorRef}
        placeholder='Price...'
        onFocus={() => {
          showBoqRowPins({ blockIndex, rowIndex })
        }}
        htmlGetter={() => {
          if (bookmarkSignal.value?.type !== itemType.boq) return ''
          const row = bookmarkSignal.value.boq.rows[rowIndex]
          if (!row) return ''
          const html = row.price.html
          return html
        }}
        onContentChange={() => {
          if (priceCellEditorRef.current === null) return
          if (bookmarkSignal.value?.type !== itemType.boq) return
          const html = priceCellEditorRef.current.html.get()
          const cellTextContent = getTextContentFromHtml({ html })
          const cellValueFromHtml = getNumberFromString({
            string: cellTextContent,
          })
          const clonedBookmark = structuredClone(bookmarkSignal.value)
          const row = clonedBookmark.boq.rows[rowIndex]
          if (!row) return
          row.price.html = html
          row.price.value = cellValueFromHtml
          bookmarkSignal.value = clonedBookmark
        }}
        onBlur={() => {
          formatBoqRowPriceCell({ rowIndex, priceCellEditorRef, blockIndex })
          validateBoqRowPrice({
            blockIndex,
            priceCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onKeydown={(e) => {
          tabFromPriceCell({ e, rowIndex, boqRowEditorRefs })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.price}
        onClick={() => {
          pinBoqRowPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

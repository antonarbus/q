import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/blocks/cell/pin'
import { tabFromItemPriceCell } from '@features/blocks/cell/tab_away_from_cell'
import { formatBoqRowItemPriceCell } from '@features/blocks/cell/update_cell'
import {
  useBlock,
  useRow,
  useBoqBlock,
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

export const ItemPriceCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoqBlock()
  const {
    rowIndex,
    itemPriceCellEditorRef,
    priceCellEditorRef,
    qtyCellEditorRef,
  } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: '100px',
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.itemPrice}`}
        editorRef={itemPriceCellEditorRef}
        placeholder='Item price...'
        htmlGetter={() => {
          if (bookmarkSignal.value?.type !== itemType.boq) return ''
          const row = bookmarkSignal.value.boq.rows[rowIndex]
          if (!row) return ''
          const html = row.itemPrice.html
          return html
        }}
        onContentChange={() => {
          if (itemPriceCellEditorRef.current === null) return
          if (bookmarkSignal.value?.type !== itemType.boq) return
          const html = itemPriceCellEditorRef.current.html.get()
          const cellTextContent = getTextContentFromHtml({ html })
          const cellValueFromHtml = getNumberFromString({
            string: cellTextContent,
          })
          const clonedBookmark = structuredClone(bookmarkSignal.value)
          const row = clonedBookmark.boq.rows[rowIndex]
          if (!row) return
          row.itemPrice.html = html
          row.itemPrice.value = cellValueFromHtml
          bookmarkSignal.value = clonedBookmark
        }}
        onBlur={() => {
          formatBoqRowItemPriceCell({
            blockIndex,
            rowIndex,
            itemPriceCellEditorRef,
          })
        }}
        onKeydown={(e) => {
          tabFromItemPriceCell({ e, rowIndex, qtyCellEditorRef })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.itemPrice}
        onClick={() => {
          pinBoqRowItemPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

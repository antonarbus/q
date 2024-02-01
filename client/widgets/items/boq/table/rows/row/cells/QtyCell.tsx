import { Box } from '@mui/material'
import { Pin, pinBoqRowQtyCell } from '@features/pin'
import { tabFromQtyCell } from '@features/tab_from_cell'
import { formatBoqRowQtyCell, updateBoqRowQtyCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, boqRowCellStyle, useStylesForResizableCell, type BoqRowCellKey } from '@entities/items'

const boqRowCellKey: BoqRowCellKey = 'qty'

export const QtyCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqRowCellKey, minWidth: '100px' })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }} >
      <Froala
        className={`td ${boqRowCellKey}`}
        editorRef={qtyCellEditorRef}
        placeholder='Qty...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey })}
        onContentChange={() => {
          updateBoqRowQtyCell({ boqRowCellKey, itemIndex, priceCellEditorRef, qtyCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowQtyCell({ itemIndex, qtyCellEditorRef, rowIndex })
        }}
        onKeydown={(e) => {
          tabFromQtyCell({ e, rowIndex, priceCellEditorRef })
        }}
        wrapperStyles={stylesForResizableCell}
        additionalStyle={boqRowCellStyle}
      />
      <Pin
        boqRowCellKey={boqRowCellKey}
        onClick={() => {
          pinBoqRowQtyCell({ itemIndex, rowIndex })
        }}
      />
    </Box>
  )
}

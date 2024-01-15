import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, itemsSlice, boqRowCellStyle } from 'client/entities/items'
import { formatBoqRowQtyCell, updateBoqRowQtyCell } from 'client/features/update_cell'
import { useStylesForResizableCell } from './useStylesForResizableCell'
import type { BoqColumnKey } from 'client/shared/types'
import { dispatch } from 'client/shared/clients'
import { Pin } from 'client/features/pin'
import { Box } from '@mui/material'

const boqColumnKey: BoqColumnKey = 'qty'

export const QtyCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '100px' })

  // const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  // const isQtyColWidthSetManually = qtyColWidth !== undefined
  // const width = isQtyColWidthSetManually ? qtyColWidth : 'auto'
  // const minWidth = '100px'
  // const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={stylesForResizableCell}
    >
      <Froala
        editorRef={qtyCellEditorRef}
        placeholder='Qty...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          updateBoqRowQtyCell({ boqColumnKey, itemIndex, priceCellEditorRef, qtyCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowQtyCell({ itemIndex, qtyCellEditorRef, rowIndex })
        }}
        additionalStyle={boqRowCellStyle}
      />
      <Pin
        boqColumnKey={boqColumnKey}
        onClick={() => {
          dispatch(itemsSlice.actions.pinQtyReducer({ itemIndex, rowIndex }))
        }}
      />
    </Box>
  )
}

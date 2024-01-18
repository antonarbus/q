import { dispatch } from '@lib_instances/store'
import { Box } from '@mui/material'
import { Pin } from '@features/pin'
import { formatBoqRowQtyCell, updateBoqRowQtyCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, itemsSlice, boqRowCellStyle, useStylesForResizableCell } from '@entities/items'
import type { BoqColumnKey } from '@shared/types'

const boqColumnKey: BoqColumnKey = 'qty'

export const QtyCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '100px' })

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

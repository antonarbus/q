import { getBoqCellHtmlFromStore, useBoqItem, useItem, useRow, Froala, itemsSlice, boqRowCellStyle, useStylesForResizableCell } from '@entities/items'
import { formatBoqRowPriceCell, updateBoqRowPriceCell, validateBoqRowPrice } from '@features/update_cell'
import { Pin, showBoqRowPins } from '@features/pin'
import type { BoqColumnKey } from '@shared/types'
import { dispatch } from '@shared/clients'
import { Box } from '@mui/material'

const boqColumnKey: BoqColumnKey = 'price'

export const PriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex, priceCellEditorRef, qtyCellEditorRef, itemPriceCellEditorRef } = useRow()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '100px' })

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={stylesForResizableCell}
    >
      <Froala
        editorRef={priceCellEditorRef}
        placeholder='Price...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onFocus={() => {
          showBoqRowPins({ itemIndex, rowIndex })
        }}
        onContentChange={() => {
          updateBoqRowPriceCell({ boqColumnKey, itemIndex, itemPriceCellEditorRef, priceCellEditorRef, qtyCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowPriceCell({ rowIndex, priceCellEditorRef, itemIndex })
          validateBoqRowPrice({ itemIndex, priceCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        additionalStyle={boqRowCellStyle}
      />
      <Pin
        boqColumnKey={boqColumnKey}
        onClick={() => {
          dispatch(itemsSlice.actions.pinPriceReducer({ itemIndex, rowIndex }))
        }}
      />
    </Box>
  )
}

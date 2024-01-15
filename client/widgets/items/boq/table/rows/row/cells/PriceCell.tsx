import { Box } from '@mui/material'
import { dispatch } from 'client/shared/clients'
import { getBoqCellHtmlFromStore, selectColumnWidth, useBoqItem, useItem, useRow, Froala, itemsSlice, boqRowCellStyle } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Pin, showBoqRowPins } from 'client/features/pin'
import { formatBoqRowPriceCell, updateBoqRowPriceCell, validateBoqRowPrice } from 'client/features/update_cell'

const boqColumnKey: BoqColumnKey = 'price'

export const PriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex, priceCellEditorRef, qtyCellEditorRef, itemPriceCellEditorRef } = useRow()
  const { subTotalPriceEditorRef } = useBoqItem()
  const priceColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isPriceColWidthSetManually = priceColWidth !== undefined
  const width = isPriceColWidthSetManually ? priceColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isPriceColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
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

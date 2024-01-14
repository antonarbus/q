import { Box } from '@mui/material'
import { dispatch } from 'client/shared/clients'
import { getBoqCellHtmlFromStore, selectColumnWidth, useBoqItem, useItem, useRow, Froala, getBoqRowFromStore, updateBoqRowCellAtStore, isBoqRowPriceValid, itemsSlice, getBoqRowsFromStore, boqRowCellStyle, didBoqCellContentChange } from 'client/entities/items'
import { updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey, BoqRow } from 'client/shared/types'
import { Pin, showBoqRowPins } from 'client/features/pin'
import { formatBoqRowCellNumber } from 'client/features/format_cell'
import { roundTo } from 'round-to'

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
          if (priceCellEditorRef.current === null) return

          // const didContentChange = didBoqCellContentChange({
          //   editor: priceCellEditorRef.current,
          //   itemIndex,
          //   rowIndex,
          //   boqColumnKey,
          // })

          // if (!didContentChange) return

          updateBoqRowCellAtStore({
            html: priceCellEditorRef.current.html.get(),
            itemIndex,
            rowIndex,
            boqColumnKey,
          })

          const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })

          const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

          if (isItemPricePinned) {
            if (boqRow.itemPrice.value === 0) return
            const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
            const newQtyValueRounded = roundTo(newQtyValue, 5)

            updateBoqRowCellWithValue({
              editor: qtyCellEditorRef.current,
              itemIndex,
              rowIndex,
              boqColumnKey: 'qty',
              value: newQtyValueRounded,
            })
          }

          const isQtyPinned = boqRow?.qty.pin.isPinned

          if (isQtyPinned) {
            if (boqRow.qty.value === 0) return
            const newItemPriceValue = boqRow.price.value / boqRow.qty.value
            const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

            updateBoqRowCellWithValue({
              editor: itemPriceCellEditorRef.current,
              itemIndex,
              rowIndex,
              boqColumnKey: 'itemPrice',
              value: newItemPriceValueRounded,
            })
          }

          const boqRows = getBoqRowsFromStore({ itemIndex })
          if (boqRows === undefined) return

          const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
            const price = boqRow.price.value
            return accumulator + price
          }, 0)

          const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

          updateSubTotalPriceWithValue({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
            value: subTotalPriceValueNewRounded,
          })
        }}
        onBlur={() => {
          if (priceCellEditorRef.current === null) return
          if (subTotalPriceEditorRef.current === null) return

          const isPriceValid = isBoqRowPriceValid({
            html: priceCellEditorRef.current.html.get(),
            itemIndex,
            rowIndex,
          })

          if (!isPriceValid) {
            const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
            if (boqRow === undefined) return

            const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
            const newPriceValueRounded = roundTo(newPriceValue, 2)

            updateBoqRowCellWithValue({
              boqColumnKey: 'price',
              editor: priceCellEditorRef.current,
              itemIndex,
              rowIndex,
              value: newPriceValueRounded,
            })

            const boqRows = getBoqRowsFromStore({ itemIndex })
            if (boqRows === undefined) return

            const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
              const price = boqRow.price.value
              return accumulator + price
            }, 0)

            const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

            updateSubTotalPriceWithValue({
              itemIndex,
              subTotalPriceEditor: subTotalPriceEditorRef.current,
              value: subTotalPriceValueNewRounded,
            })
          }

          formatBoqRowCellNumber({
            itemIndex,
            rowIndex,
            boqColumnKey,
            cellEditor: priceCellEditorRef.current,
            roundToTwoDecimals: true,
          })
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

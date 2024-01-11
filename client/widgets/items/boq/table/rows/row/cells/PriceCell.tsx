import { Box } from '@mui/material'
import { dispatch, theme } from 'client/shared/clients'
import { getBoqCellHtmlFromStore, selectColumnWidth, useBoqItem, useItem, useRow, Froala, getBoqRowFromStore, didBoqCellContentChange, updateBoqRowCellAtStore, isBoqRowPriceValid, itemsSlice } from 'client/entities/items'
import { updateBoqRowPriceCell, updateBoqRowQtyCell, updateSubTotalPriceCell } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Pin, showBoqRowPins } from 'client/features/pin'
import { updateBoqRowItemPriceCell } from 'client/features/update_cell/updateBoqRowItemPriceCell'
import { formatBoqRowCellNumber } from 'client/features/format_cell'

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

          const didContentChange = didBoqCellContentChange({
            editor: priceCellEditorRef.current,
            itemIndex,
            rowIndex,
            boqColumnKey,
          })

          if (!didContentChange) return

          updateBoqRowCellAtStore({
            html: priceCellEditorRef.current.html.get(),
            itemIndex,
            rowIndex,
            boqColumnKey,
          })

          const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })

          const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

          if (isItemPricePinned) {
            updateBoqRowQtyCell({
              qtyCellEditor: qtyCellEditorRef.current,
              itemIndex,
              rowIndex,
            })
          }

          const isQtyPinned = boqRow?.qty.pin.isPinned
          if (isQtyPinned) {
            updateBoqRowItemPriceCell({
              itemPriceCellEditor: itemPriceCellEditorRef.current,
              itemIndex,
              rowIndex,
            })
          }

          updateSubTotalPriceCell({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
          })
        }}
        onBlur={() => {
          if (priceCellEditorRef.current === null) return
          if (subTotalPriceEditorRef.current === null) return

          if (!isBoqRowPriceValid({
            html: priceCellEditorRef.current.html.get(),
            itemIndex,
            rowIndex,
          })) {
            updateBoqRowPriceCell({
              itemIndex,
              rowIndex,
              priceCellEditor: priceCellEditorRef.current,
            })

            updateSubTotalPriceCell({
              itemIndex,
              subTotalPriceEditor: subTotalPriceEditorRef.current,
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
        additionalStyle={{
          textAlign: 'center',
          padding: theme.cell.padding,
          '.fr-placeholder': {
            left: '15px',
          },
          minHeight: '44px', // otherwise placeholder is misplaced on init
          '.fr-wrapper': {
            minHeight: '24px', // otherwise placeholder is misplaced on init
          },
        }}
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

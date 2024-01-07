import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth, useBoqItem, useItem, useRow, Froala, getBoqRow } from 'client/entities/items'
import { formatBoqRowCellNumber, isBoqRowPriceValid, updateBoqRowCellAtStore, updateBoqRowQtyCell, updateSubTotalPriceCell } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { showBoqRowPins } from 'client/features/pin'
import { updateBoqRowItemPriceCell } from 'client/features/update_cell/updateBoqRowItemPriceCell'

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
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onFocus={() => {
          showBoqRowPins({ itemIndex, rowIndex })
        }}
        onContentChange={() => {
          if (priceCellEditorRef.current === null) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: priceCellEditorRef.current.html.get(),
          })

          const boqRow = getBoqRow({ itemIndex, rowIndex })

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
          // todo: recalculate value if it is not valid, which happens now
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
    </Box>
  )
}

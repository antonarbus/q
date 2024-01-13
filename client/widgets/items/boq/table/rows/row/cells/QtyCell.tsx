import { Box } from '@mui/material'
import { dispatch, theme } from 'client/shared/clients'
import { getBoqCellHtmlFromStore, selectColumnWidth, useItem, useRow, useBoqItem, Froala, itemsSlice, didBoqCellContentChange, updateBoqRowCellAtStore, getBoqRowFromStore } from 'client/entities/items'
import { updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Pin } from 'client/features/pin'
import { formatBoqRowCellNumber } from 'client/features/format_cell'
import { roundTo } from 'round-to'

const boqColumnKey: BoqColumnKey = 'qty'

export const QtyCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined
  const width = isQtyColWidthSetManually ? qtyColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isQtyColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={qtyCellEditorRef}
        placeholder='Qty...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (qtyCellEditorRef.current === null) return

          const didContentChange = didBoqCellContentChange({
            editor: qtyCellEditorRef.current,
            itemIndex,
            rowIndex,
            boqColumnKey,
          })

          if (!didContentChange) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: qtyCellEditorRef.current.html.get(),
          })

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

          updateSubTotalPriceWithValue({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
          })
        }}
        onBlur={() => {
          formatBoqRowCellNumber({
            itemIndex,
            rowIndex,
            boqColumnKey,
            cellEditor: qtyCellEditorRef.current,
            roundToTwoDecimals: false,
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
          dispatch(itemsSlice.actions.pinQtyReducer({ itemIndex, rowIndex }))
        }}
      />
    </Box>
  )
}

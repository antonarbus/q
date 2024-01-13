import { Box } from '@mui/material'
import { dispatch, theme } from 'client/shared/clients'
import { getBoqCellHtmlFromStore, selectColumnWidth, useItem, useRow, useBoqItem, Froala, itemsSlice, didBoqCellContentChange, updateBoqRowCellAtStore, getBoqRowFromStore, getBoqRowsFromStore } from 'client/entities/items'
import { updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey, BoqRow } from 'client/shared/types'
import { Pin } from 'client/features/pin'
import { formatBoqRowCellNumber } from 'client/features/format_cell'
import { roundTo } from 'round-to'

const boqColumnKey: BoqColumnKey = 'itemPrice'

export const ItemPriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, itemPriceCellEditorRef, priceCellEditorRef } = useRow()
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isItemColWidthSetManually = itemColWidth !== undefined
  const width = isItemColWidthSetManually ? itemColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={itemPriceCellEditorRef}
        placeholder='Item price...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (itemPriceCellEditorRef.current === null) return

          const didContentChange = didBoqCellContentChange({
            editor: itemPriceCellEditorRef.current,
            itemIndex,
            rowIndex,
            boqColumnKey,
          })

          if (!didContentChange) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: itemPriceCellEditorRef.current.html.get(),
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
          formatBoqRowCellNumber({
            itemIndex,
            rowIndex,
            boqColumnKey,
            cellEditor: itemPriceCellEditorRef.current,
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
          dispatch(itemsSlice.actions.pinItemPriceReducer({ itemIndex, rowIndex }))
        }}
      />
    </Box>
  )
}

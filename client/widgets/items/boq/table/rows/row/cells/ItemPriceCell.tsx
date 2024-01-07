import { Box } from '@mui/material'
import { dispatch, theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth, useItem, useRow, useBoqItem, Froala, itemsSlice, didBoqRowCellContentChange } from 'client/entities/items'
import { formatBoqRowCellNumber, updateBoqRowCellAtStore, updateBoqRowPriceCell, updateSubTotalPriceCell } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Pin } from 'client/features/pin'

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
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (itemPriceCellEditorRef.current === null) return

          const didContentChange = didBoqRowCellContentChange({
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

          updateBoqRowPriceCell({
            itemIndex,
            rowIndex,
            priceCellEditor: priceCellEditorRef.current,
          })

          updateSubTotalPriceCell({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
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

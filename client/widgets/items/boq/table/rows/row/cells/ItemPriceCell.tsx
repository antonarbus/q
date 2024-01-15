import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, itemsSlice, boqRowCellStyle } from 'client/entities/items'
import { formatBoqRowItemPriceCell, updateBoqRowItemPriceCell } from 'client/features/update_cell'
import { useStylesForResizableCell } from './useStylesForResizableCell'
import type { BoqColumnKey } from 'client/shared/types'
import { dispatch } from 'client/shared/clients'
import { Pin } from 'client/features/pin'
import { Box } from '@mui/material'

const boqColumnKey: BoqColumnKey = 'itemPrice'

export const ItemPriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, itemPriceCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '100px' })

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={stylesForResizableCell}
    >
      <Froala
        editorRef={itemPriceCellEditorRef}
        placeholder='Item price...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          updateBoqRowItemPriceCell({ boqColumnKey, itemIndex, itemPriceCellEditorRef, priceCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowItemPriceCell({ itemIndex, rowIndex, itemPriceCellEditorRef })
        }}
        additionalStyle={boqRowCellStyle}
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

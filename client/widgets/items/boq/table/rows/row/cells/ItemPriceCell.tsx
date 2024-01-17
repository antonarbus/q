import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, itemsSlice, boqRowCellStyle, useStylesForResizableCell } from '@entities/items'
import { formatBoqRowItemPriceCell, updateBoqRowItemPriceCell } from '@features/update_cell'
import type { BoqColumnKey } from '@shared/types'
import { dispatch } from '@shared/clients'
import { Pin } from '@features/pin'
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
          // todo: make a proxy function in features
          dispatch(itemsSlice.actions.pinItemPriceReducer({ itemIndex, rowIndex }))
        }}
      />
    </Box>
  )
}

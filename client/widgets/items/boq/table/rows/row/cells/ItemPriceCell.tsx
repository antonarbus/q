import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/pin'
import { formatBoqRowItemPriceCell, updateBoqRowItemPriceCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, boqRowCellStyle, useStylesForResizableCell } from '@entities/items'
import type { BoqColumnKey } from '@entities/items'

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
          pinBoqRowItemPriceCell({ itemIndex, rowIndex })
        }}
      />
    </Box>
  )
}

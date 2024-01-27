import { Box } from '@mui/material'
import { Pin, pinBoqRowItemPriceCell } from '@features/pin'
import { formatBoqRowItemPriceCell, updateBoqRowItemPriceCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useItem, useRow, useBoqItem, Froala, boqRowCellStyle, useStylesForResizableCell } from '@entities/items'
import type { BoqRowCellKey } from '@entities/items'

const boqRowCellKey: BoqRowCellKey = 'itemPrice'

export const ItemPriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, itemPriceCellEditorRef, priceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqRowCellKey, minWidth: '100px' })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }} >
      <Froala
        className={`td ${boqRowCellKey}`}
        editorRef={itemPriceCellEditorRef}
        placeholder='Item price...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey })}
        onContentChange={() => {
          updateBoqRowItemPriceCell({ boqRowCellKey, itemIndex, itemPriceCellEditorRef, priceCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowItemPriceCell({ itemIndex, rowIndex, itemPriceCellEditorRef })
        }}
        wrapperStyles={stylesForResizableCell}
        additionalStyle={boqRowCellStyle}
      />
      <Pin
        boqRowCellKey={boqRowCellKey}
        onClick={() => {
          pinBoqRowItemPriceCell({ itemIndex, rowIndex })
        }}
      />
    </Box>
  )
}

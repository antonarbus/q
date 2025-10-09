import {
  BOOKMARK_POS_AT_BLOCKS,
  boqColumnKey,
  boqRowCellKey,
  boqRowCellStyle,
  boqRowCellSx,
  columnMinWidth,
  Froala,
  getRowCellHtmlFromStore,
  useRow,
  useStylesForResizableCell,
} from '@entities/quotation'
import { formatItemPriceCell } from '@features/blocks/cell/update-cell/row-block-cells/item-price/formatItemPriceCell'
import { updateItemPriceCell } from '@features/blocks/cell/update-cell/row-block-cells/item-price/updateItemPriceCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const ItemPriceCell = (): JSX.Element => {
  const { itemPriceCellEditorRef, priceCellEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.itemPrice}`}
        editorRef={itemPriceCellEditorRef}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.itemPrice })
        }
        onBlur={() => {
          formatItemPriceCell({ itemPriceCellEditorRef })
        }}
        onContentChange={() => {
          updateItemPriceCell({ itemPriceCellEditorRef, priceCellEditorRef })
        }}
        placeholder='Item price...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

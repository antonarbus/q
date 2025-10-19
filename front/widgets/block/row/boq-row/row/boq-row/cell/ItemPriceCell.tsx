import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { cellKey } from '@entities/quotation/const/cellKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getRowCellHtmlFromStore } from '@entities/quotation/redux/getter/getRowCellHtmlFromStore'
import { cellStyle, cellSx } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { formatItemPriceCell } from '@features/blocks/cell/update-cell/row-block-cells/item-price/formatItemPriceCell'
import { updateItemPriceCell } from '@features/blocks/cell/update-cell/row-block-cells/item-price/updateItemPriceCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const ItemPriceCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: columnMinWidth.itemPrice,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${cellKey.itemPrice}`}
        editorRef={row.itemPriceCellEditorRef}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ cellKey: cellKey.itemPrice })
        }
        onBlur={() => {
          formatItemPriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
          })
        }}
        onContentChange={() => {
          updateItemPriceCell({
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
        placeholder='Item price...'
        style={cellStyle}
        sx={cellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

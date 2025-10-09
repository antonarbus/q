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
import { formatPriceCell } from '@features/blocks/cell/update-cell/row-block-cells/price/formatPriceCell'
import { updatePriceCell } from '@features/blocks/cell/update-cell/row-block-cells/price/updatePriceCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const PriceCell = (): JSX.Element => {
  const { priceCellEditorRef, itemPriceCellEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.price,
    minWidth: columnMinWidth.price,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.price}`}
        editorRef={priceCellEditorRef}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.price })
        }
        onBlur={() => {
          formatPriceCell({ priceCellEditorRef })
        }}
        onContentChange={() => {
          updatePriceCell({
            itemPriceCellEditorRef,
            priceCellEditorRef,
          })
        }}
        placeholder='Price...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}

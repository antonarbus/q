import { Box } from '@mui/material'
import {
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
  getRowCellHtmlFromStore,
  bookmarkPosAtBlocks,
  columnMinWidth,
} from '@entities/quotation'
import { updatePriceCell } from '@features/blocks/cell/update_cell/row_block_cells/price/updatePriceCell'
import { formatPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/price/formatPriceCell'

export const PriceCell = (): React.JSX.Element => {
  const { priceCellEditorRef, itemPriceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: bookmarkPosAtBlocks,
    boqColumnKey: boqColumnKey.price,
    minWidth: columnMinWidth.price,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.price}`}
        editorRef={priceCellEditorRef}
        placeholder='Price...'
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.price })
        }
        onContentChange={() => {
          updatePriceCell({
            itemPriceCellEditorRef,
            priceCellEditorRef,
          })
        }}
        onBlur={() => {
          formatPriceCell({ priceCellEditorRef })
        }}
      />
    </Box>
  )
}

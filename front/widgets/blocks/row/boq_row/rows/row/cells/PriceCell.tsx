import { Box } from '@mui/material'
import {
  Pin,
  pinBoqRowPriceCell,
  showBoqRowPins,
} from '@features/blocks/cell/pin'
import {
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
  getRowCellHtmlFromStore,
} from '@entities/quotation'
import { updatePriceCell } from '@features/blocks/cell/update_cell/row_block_cells/price/updatePriceCell'
import { formatPriceCell } from '@features/blocks/cell/update_cell/row_block_cells/price/formatPriceCell'

export const PriceCell = (): JSX.Element => {
  const { priceCellEditorRef, qtyCellEditorRef, itemPriceCellEditorRef } =
    useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: 0,
    boqColumnKey: boqColumnKey.price,
    minWidth: '100px',
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
        onFocus={() => {
          showBoqRowPins({ blockIndex: 0, rowIndex: 0 })
        }}
        onContentChange={() => {
          updatePriceCell({
            itemPriceCellEditorRef,
            priceCellEditorRef,
            qtyCellEditorRef,
          })
        }}
        onBlur={() => {
          formatPriceCell({ priceCellEditorRef })
        }}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.price}
        onClick={() => {
          pinBoqRowPriceCell({ blockIndex: 0, rowIndex: 0 })
        }}
      />
    </Box>
  )
}

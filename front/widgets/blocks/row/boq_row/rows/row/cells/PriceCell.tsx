import { Box } from '@mui/material'
import {
  Pin,
  pinBoqRowPriceCell,
  showBoqRowPins,
} from '@features/blocks/cell/pin'
import { tabFromPriceCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowPriceCell,
  validateBoqRowPrice,
} from '@features/blocks/cell/update_cell'
import {
  useBoqBlock,
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

export const PriceCell = (): JSX.Element => {
  const {
    rowIndex,
    priceCellEditorRef,
    qtyCellEditorRef,
    itemPriceCellEditorRef,
  } = useRow()
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqBlock()
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
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.price })
        }
        onFocus={() => {
          showBoqRowPins({ blockIndex: 0, rowIndex })
        }}
        onContentChange={() => {
          updatePriceCell({
            itemPriceCellEditorRef,
            priceCellEditorRef,
            qtyCellEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowPriceCell({ rowIndex, priceCellEditorRef, blockIndex })
          validateBoqRowPrice({
            blockIndex: 0,
            priceCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onKeydown={(e) => {
          tabFromPriceCell({ e, rowIndex, boqRowEditorRefs })
        }}
        wrapperStyles={stylesForResizableCell}
        style={boqRowCellStyle}
        sx={boqRowCellSx}
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

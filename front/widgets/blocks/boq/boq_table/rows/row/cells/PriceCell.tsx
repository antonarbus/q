import { Box } from '@mui/material'
import {
  Pin,
  pinBoqRowPriceCell,
  showBoqRowPins,
} from '@features/blocks/cell/pin'
import { tabFromPriceCell } from '@features/blocks/cell/tab_away_from_cell'
import {
  formatBoqRowPriceCell,
  updateBoqRowPriceCell,
  validateBoqRowPrice,
} from '@features/blocks/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBoqBlock,
  useBlock,
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
  columnMinWidth,
} from '@entities/quotation'

export const PriceCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const {
    rowIndex,
    priceCellEditorRef,
    qtyCellEditorRef,
    itemPriceCellEditorRef,
  } = useRow()
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqBlock()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.price,
    minWidth: `${columnMinWidth.price}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.price}`}
        editorRef={priceCellEditorRef}
        placeholder='Price...'
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex,
            rowIndex,
            boqRowCellKey: boqRowCellKey.price,
          })
        }
        onFocus={() => {
          showBoqRowPins({ blockIndex, rowIndex })
        }}
        onContentChange={() => {
          updateBoqRowPriceCell({
            blockIndex,
            itemPriceCellEditorRef,
            priceCellEditorRef,
            qtyCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowPriceCell({ rowIndex, priceCellEditorRef, blockIndex })
          validateBoqRowPrice({
            blockIndex,
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
        onClick={(e: React.MouseEvent) => {
          e.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

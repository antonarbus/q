import { Box } from '@mui/material'
import {
  Pin,
  pinBoqRowPriceCell,
  showBoqRowPins,
} from '@features/items/cell/pin'
import { tabFromPriceCell } from '@features/items/cell/tab_away_from_cell'
import {
  formatBoqRowPriceCell,
  updateBoqRowPriceCell,
  validateBoqRowPrice,
} from '@features/items/cell/update_cell'
import {
  getBoqCellHtmlFromStore,
  useBoqItem,
  useItem,
  useRow,
  Froala,
  boqRowCellStyle,
  useStylesForResizableCell,
  boqRowCellKey,
  boqColumnKey,
  boqRowCellSx,
} from '@entities/quotation'

export const PriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const {
    rowIndex,
    priceCellEditorRef,
    qtyCellEditorRef,
    itemPriceCellEditorRef,
  } = useRow()
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqItem()
  const { stylesForResizableCell } = useStylesForResizableCell({
    itemIndex,
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
          getBoqCellHtmlFromStore({
            itemIndex,
            rowIndex,
            boqRowCellKey: boqRowCellKey.price,
          })
        }
        onFocus={() => {
          showBoqRowPins({ itemIndex, rowIndex })
        }}
        onContentChange={() => {
          updateBoqRowPriceCell({
            itemIndex,
            itemPriceCellEditorRef,
            priceCellEditorRef,
            qtyCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onBlur={() => {
          formatBoqRowPriceCell({ rowIndex, priceCellEditorRef, itemIndex })
          validateBoqRowPrice({
            itemIndex,
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
          pinBoqRowPriceCell({ itemIndex, rowIndex })
        }}
      />
    </Box>
  )
}

import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { showRowPins } from '@feature/blocks/show-row-pins/showRowPins'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinPriceCell } from '@feature/blocks/pin-price-cell/pinPriceCell'
import { tabFromPriceCell } from '@feature/blocks/tab-away-from-price-cell/tabFromPriceCell'
import { changePriceCell } from '@feature/blocks/change-price-cell-at-boq-block/changePriceCell'
import { focusOutFromPriceCell } from '@feature/blocks/focus-out-from-price-cell-at-boq-block/focusOutFromPriceCell'
import { validatePrice } from '@feature/blocks/focus-out-from-price-cell-at-boq-block/validatePrice'

export const PriceCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const boq = useBoq()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'price',
    minWidth: `${columnMinWidth.price}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        editorRef={row.priceCellEditorRef}
        className='td price'
        placeholder='Price...'
        contentGetter={() =>
          getCellHtmlFromStore({
            blockIndex: block.index,
            cellKey: 'price',
            rowIndex: row.index,
          })
        }
        onUpdate={(params) => {
          changePriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onBlur={() => {
          focusOutFromPriceCell({
            blockIndex: block.index,
            priceCellEditorRef: row.priceCellEditorRef,
            rowIndex: row.index,
          })

          validatePrice({
            blockIndex: block.index,
            priceCellEditorRef: row.priceCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onWrapperFocus={() => {
          showRowPins({ blockIndex: block.index, rowIndex: row.index })
        }}
        onKeyDown={(_view, event) =>
          tabFromPriceCell({
            event,
            rowEditorRefs: boq.rowEditorRefs,
            rowIndex: row.index,
          })
        }
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
      <Pin
        cellKey='price'
        onClick={(event: React.MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinPriceCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

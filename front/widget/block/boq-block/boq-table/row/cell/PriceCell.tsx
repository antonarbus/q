import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
import {
  Pin,
  pinPriceCell,
  // showRowPins
} from '@feature/blocks/pin'
// import { tabFromPriceCell } from '@feature/blocks/tab-away-from-cell'
import {
  // formatPriceCell,
  updatePriceCell,
  // validatePrice,
} from '@feature/blocks/update'
import { Box } from '@mui/material'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { JSX, MouseEvent } from 'react'

export const PriceCell = (): JSX.Element => {
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
      {/* <Froala
        onBlur={() => {
          formatPriceCell({
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
        onFocus={() => {
          showRowPins({ blockIndex: block.index, rowIndex: row.index })
        }}
        onKeydown={(event) => {
          tabFromPriceCell({
            rowEditorRefs: boq.rowEditorRefs,
            event,
            rowIndex: row.index,
          })
        }}
      /> */}
      <Tiptap
        editorRef={row.priceCellEditorRef}
        className='td price'
        placeholder='Price...'
        content={getCellHtmlFromStore({
          blockIndex: block.index,
          cellKey: 'price',
          rowIndex: row.index,
        })}
        onUpdate={(params) => {
          updatePriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        sx={{
          ...stylesForResizableCell,
          ...cellSx,
          ...cellStyle,
        }}
      />
      <Pin
        cellKey='price'
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinPriceCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

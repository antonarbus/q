import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
import { Pin, pinQtyCell } from '@feature/blocks/pin'
// import { tabFromQtyCell } from '@feature/blocks/tab-away-from-cell'
import {
  // formatQtyCell,
  updateQtyCell,
} from '@feature/blocks/update'
import { Box } from '@mui/material'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import { useIsEditorActive } from '@page/test-page/tiptap-example/useIsEditorActive'
import type { JSX, MouseEvent } from 'react'

export const QtyCell = (): JSX.Element => {
  const block = useBlock()
  const boq = useBoq()
  const row = useRow()
  const isEditorActive = useIsEditorActive()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'qty',
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* <Froala
        onBlur={() => {
          formatQtyCell({
            blockIndex: block.index,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
          })
        }}
        onKeydown={(event) => {
          tabFromQtyCell({
            event,
            rowIndex: row.index,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
      /> */}
      <Tiptap
        editorRef={row.qtyCellEditorRef}
        className='td qty'
        placeholder='Qty...'
        content={getCellHtmlFromStore({
          blockIndex: block.index,
          rowIndex: row.index,
          cellKey: 'qty',
        })}
        onUpdate={(params) => {
          updateQtyCell({
            blockIndex: block.index,
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
        isEditorActive={isEditorActive}
      />
      <Pin
        cellKey='qty'
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinQtyCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

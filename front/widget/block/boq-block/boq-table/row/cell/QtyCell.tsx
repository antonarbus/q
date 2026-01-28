import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { Pin, pinQtyCell } from '@feature/blocks/pin'
import { tabFromQtyCell } from '@feature/blocks/tab-away-from-cell'
import { formatQtyCell, updateQtyCell } from '@feature/blocks/update'
import { Box } from '@mui/material'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import { useSelector } from '@shared/lib/redux'
import type { JSX, MouseEvent } from 'react'

export const QtyCell = (): JSX.Element => {
  const block = useBlock()
  const boq = useBoq()
  const row = useRow()
  const isEditorActive = useSelector((state) => state.text.isEditable)

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'qty',
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Tiptap
        editorRef={row.qtyCellEditorRef}
        className='td qty'
        placeholder='Qty...'
        isEditorActive={isEditorActive}
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
        onBlur={() => {
          formatQtyCell({
            blockIndex: block.index,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) =>
          tabFromQtyCell({
            event,
            rowIndex: row.index,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
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

import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { boqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useBoq } from '@entities/quotation/provider/BoqBlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBoqCellHtmlFromStore } from '@entities/quotation/redux/getter/getBoqCellHtmlFromStore'
import {
  boqRowCellStyle,
  boqRowCellSx,
} from '@entities/quotation/style/boqRowCellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { Pin, pinBoqRowQtyCell } from '@features/blocks/cell/pin'
import { tabFromQtyCell } from '@features/blocks/cell/tab-away-from-cell'
import {
  formatBoqRowQtyCell,
  updateBoqRowQtyCell,
} from '@features/blocks/cell/update-cell'
import { Box } from '@mui/material'
import type { JSX, MouseEvent } from 'react'

export const QtyCell = (): JSX.Element => {
  const block = useBlock()
  const boq = useBoq()
  const row = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: boqColumnKey.qty,
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.qty}`}
        editorRef={row.qtyCellEditorRef}
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex: block.index,
            rowIndex: row.index,
            boqRowCellKey: boqRowCellKey.qty,
          })
        }
        onBlur={() => {
          formatBoqRowQtyCell({
            blockIndex: block.index,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
          })
        }}
        onContentChange={() => {
          updateBoqRowQtyCell({
            blockIndex: block.index,
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onKeydown={(event) => {
          tabFromQtyCell({
            event,
            rowIndex: row.index,
            priceCellEditorRef: row.priceCellEditorRef,
          })
        }}
        placeholder='Qty...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.qty}
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowQtyCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

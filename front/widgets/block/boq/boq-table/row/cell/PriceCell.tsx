import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { cellKey } from '@entities/quotation/const/cellKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useBoq } from '@entities/quotation/provider/BoqBlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBoqCellHtmlFromStore } from '@entities/quotation/redux/getter/getBoqCellHtmlFromStore'
import { cellStyle, cellSx } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { Pin, pinPriceCell, showRowPins } from '@features/blocks/pin'
import { tabFromPriceCell } from '@features/blocks/tab-away-from-cell'
import {
  formatPriceCell,
  updatePriceCell,
  validatePrice,
} from '@features/blocks/update'
import { Box } from '@mui/material'
import type { JSX, MouseEvent } from 'react'

export const PriceCell = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const boq = useBoq()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: boqColumnKey.price,
    minWidth: `${columnMinWidth.price}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${cellKey.price}`}
        editorRef={row.priceCellEditorRef}
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex: block.index,
            cellKey: cellKey.price,
            rowIndex: row.index,
          })
        }
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
        onContentChange={() => {
          updatePriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
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
        placeholder='Price...'
        style={cellStyle}
        sx={cellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        cellKey={cellKey.price}
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinPriceCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

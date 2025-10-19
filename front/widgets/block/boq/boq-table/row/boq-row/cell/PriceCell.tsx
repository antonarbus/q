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
import {
  Pin,
  pinBoqRowPriceCell,
  showBoqRowPins,
} from '@features/blocks/cell/pin'
import { tabFromPriceCell } from '@features/blocks/cell/tab-away-from-cell'
import {
  formatBoqRowPriceCell,
  updateBoqRowPriceCell,
  validateBoqRowPrice,
} from '@features/blocks/cell/update-cell'
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
          formatBoqRowPriceCell({
            blockIndex: block.index,
            priceCellEditorRef: row.priceCellEditorRef,
            rowIndex: row.index,
          })

          validateBoqRowPrice({
            blockIndex: block.index,
            priceCellEditorRef: row.priceCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onContentChange={() => {
          updateBoqRowPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onFocus={() => {
          showBoqRowPins({ blockIndex: block.index, rowIndex: row.index })
        }}
        onKeydown={(event) => {
          tabFromPriceCell({
            boqRowEditorRefs: boq.boqRowEditorRefs,
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
          pinBoqRowPriceCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

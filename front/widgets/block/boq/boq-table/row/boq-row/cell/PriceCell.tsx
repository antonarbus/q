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
  const { blockIndex } = useBlock()

  const {
    rowIndex,
    priceCellEditorRef,
    qtyCellEditorRef,
    itemPriceCellEditorRef,
  } = useRow()

  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoq()

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
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex,
            boqRowCellKey: boqRowCellKey.price,
            rowIndex,
          })
        }
        onBlur={() => {
          formatBoqRowPriceCell({
            blockIndex,
            priceCellEditorRef,
            rowIndex,
          })

          validateBoqRowPrice({
            blockIndex,
            priceCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
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
        onFocus={() => {
          showBoqRowPins({ blockIndex, rowIndex })
        }}
        onKeydown={(event) => {
          tabFromPriceCell({
            boqRowEditorRefs,
            event,
            rowIndex,
          })
        }}
        placeholder='Price...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.price}
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowPriceCell({ blockIndex, rowIndex })
        }}
      />
    </Box>
  )
}

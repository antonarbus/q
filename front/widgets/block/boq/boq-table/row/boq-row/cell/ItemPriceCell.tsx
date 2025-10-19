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
import { Pin, pinBoqRowItemPriceCell } from '@features/blocks/cell/pin'
import { tabFromItemPriceCell } from '@features/blocks/cell/tab-away-from-cell'
import {
  formatBoqRowItemPriceCell,
  updateBoqRowItemPriceCell,
} from '@features/blocks/cell/update-cell'
import { Box } from '@mui/material'
import type { JSX, MouseEvent } from 'react'

export const ItemPriceCell = (): JSX.Element => {
  const block = useBlock()
  const { subTotalPriceEditorRef } = useBoq()

  const {
    rowIndex,
    itemPriceCellEditorRef,
    priceCellEditorRef,
    qtyCellEditorRef,
  } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: boqColumnKey.itemPrice,
    minWidth: `${columnMinWidth.itemPrice}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.itemPrice}`}
        editorRef={itemPriceCellEditorRef}
        htmlGetter={() =>
          getBoqCellHtmlFromStore({
            blockIndex: block.index,
            boqRowCellKey: boqRowCellKey.itemPrice,
            rowIndex,
          })
        }
        onBlur={() => {
          formatBoqRowItemPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef,
            rowIndex,
          })
        }}
        onContentChange={() => {
          updateBoqRowItemPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef,
            priceCellEditorRef,
            rowIndex,
            subTotalPriceEditorRef,
          })
        }}
        onKeydown={(event) => {
          tabFromItemPriceCell({
            event,
            qtyCellEditorRef,
            rowIndex,
          })
        }}
        placeholder='Item price...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        boqRowCellKey={boqRowCellKey.itemPrice}
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinBoqRowItemPriceCell({ blockIndex: block.index, rowIndex })
        }}
      />
    </Box>
  )
}

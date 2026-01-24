import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { Pin, pinItemPriceCell } from '@feature/blocks/pin'
import { tabFromItemPriceCell } from '@feature/blocks/tab-away-from-cell'
import {
  formatItemPriceCell,
  updateItemPriceCell,
} from '@feature/blocks/update'
import { Box } from '@mui/material'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { JSX, MouseEvent } from 'react'

export const ItemPriceCell = (): JSX.Element => {
  const block = useBlock()
  const boq = useBoq()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'itemPrice',
    minWidth: `${columnMinWidth.itemPrice}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* <Froala
        className='td itemPrice'
        editorRef={row.itemPriceCellEditorRef}
        htmlGetter={() =>
          getCellHtmlFromStore({
            blockIndex: block.index,
            cellKey: 'itemPrice',
            rowIndex: row.index,
          })
        }
        onBlur={() => {
          formatItemPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            rowIndex: row.index,
          })
        }}
        onContentChange={() => {
          updateItemPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onKeydown={(event) => {
          tabFromItemPriceCell({
            event,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
          })
        }}
        placeholder='Item price...'
        style={cellStyle}
        sx={cellSx}
        wrapperStyles={stylesForResizableCell}
      />
      <Pin
        cellKey='itemPrice'
        onClick={(event: MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)

          pinItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
      /> */}
      <Tiptap
        content={getCellHtmlFromStore({
          blockIndex: block.index,
          cellKey: 'itemPrice',
          rowIndex: row.index,
        })}
        onContentChange={(params) => {
          const html = params.editor.getHTML()
          console.log(html)
        }}
      />
    </Box>
  )
}

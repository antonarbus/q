import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle, cellSx } from '@entity/quotation/style/cellStyle'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { Pin, pinQtyCell } from '@feature/blocks/pin'
import { tabFromQtyCell } from '@feature/blocks/tab-away-from-cell'
import { formatQtyCell, updateQtyCell } from '@feature/blocks/update'
import { Box } from '@mui/material'
import { TiptapExample } from '@page/test-page/tiptap-example/TiptapExample'
import type { JSX, MouseEvent } from 'react'

export const QtyCell = (): JSX.Element => {
  const block = useBlock()
  const boq = useBoq()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'qty',
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* <Froala
        className='td qty'
        editorRef={row.qtyCellEditorRef}
        htmlGetter={() =>
          getCellHtmlFromStore({
            blockIndex: block.index,
            rowIndex: row.index,
            cellKey: 'qty',
          })
        }
        onBlur={() => {
          formatQtyCell({
            blockIndex: block.index,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
          })
        }}
        onContentChange={() => {
          updateQtyCell({
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
        style={cellStyle}
        sx={cellSx}
        wrapperStyles={stylesForResizableCell}
      /> */}
      <TiptapExample
        content={getCellHtmlFromStore({
          blockIndex: block.index,
          rowIndex: row.index,
          cellKey: 'qty',
        })}
        onContentChange={(params) => {
          const html = params.editor.getHTML()
          console.log(html)
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

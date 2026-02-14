import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { Pin, pinItemPriceCell } from '@feature/blocks/pin'
import { tabFromItemPriceCell } from '@feature/blocks/tab-away-from-cell'
import {
  formatItemPriceCell,
  updateItemPriceCell,
} from '@feature/blocks/update'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'

export const ItemPriceCell = (): React.JSX.Element => {
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
      <TextEditor
        editorRef={row.itemPriceCellEditorRef}
        className='td itemPrice'
        placeholder='Item price...'
        content={getCellHtmlFromStore({
          blockIndex: block.index,
          cellKey: 'itemPrice',
          rowIndex: row.index,
        })}
        onUpdate={(params) => {
          updateItemPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            priceCellEditorRef: row.priceCellEditorRef,
            rowIndex: row.index,
            subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
          })
        }}
        onBlur={() => {
          formatItemPriceCell({
            blockIndex: block.index,
            itemPriceCellEditorRef: row.itemPriceCellEditorRef,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) =>
          tabFromItemPriceCell({
            event,
            qtyCellEditorRef: row.qtyCellEditorRef,
            rowIndex: row.index,
          })
        }
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
      <Pin
        cellKey='itemPrice'
        onClick={(event: React.MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)

          pinItemPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
      />
    </Box>
  )
}

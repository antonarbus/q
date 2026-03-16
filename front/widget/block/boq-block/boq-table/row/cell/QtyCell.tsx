import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinQtyCell } from '@feature/blocks/pin-qty-cell/pinQtyCell'
import { tabFromQtyCell } from '@feature/blocks/tab-away-from-qty-cell/tabFromQtyCell'
import { handleChangeOfQtyCell } from '@feature/blocks/handle-change-of-qty-cell-at-boq-block/handleChangeOfQtyCell'
import { handleFocusOutFromQtyCell } from '@feature/blocks/handle-focus-out-from-qty-cell-at-boq-block/handleFocusOutFromQtyCell'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

export const QtyCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'qty',
    minWidth: `${columnMinWidth.qty}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={rowEditorKey({
          blockIndex: block.index,
          rowIndex: row.index,
          cellKey: 'qty',
        })}
        className='td qty'
        placeholder='Qty...'
        contentGetter={() =>
          getCellHtmlFromStore({
            blockIndex: block.index,
            rowIndex: row.index,
            cellKey: 'qty',
          })
        }
        onUpdate={(params) => {
          handleChangeOfQtyCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onBlur={() => {
          handleFocusOutFromQtyCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) =>
          tabFromQtyCell({
            event,
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }
        sx={{
          ...stylesForResizableCell,
          ...cellStyle,
        }}
      />
      <Pin
        cellKey='qty'
        onClick={(event: React.MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinQtyCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

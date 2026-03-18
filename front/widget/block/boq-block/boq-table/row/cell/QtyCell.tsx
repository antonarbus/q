import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinQtyCell } from '@feature/blocks/pin/pin-qty-cell/pinQtyCell'
import { onTabAwayFromQtyCell } from '@feature/blocks/on-cell-tab-away/on-tab-away-from-qty-cell/onTabAwayFromQtyCell'
import { onChangeQtyCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-qty-cell-at-boq-block/onChangeQtyCellAtBoqBlock'
import { onFocusOutFromQtyCell } from '@feature/blocks/on-text-focus-out/on-focus-out-from-qty-cell-at-boq-block/onFocusOutFromQtyCell'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
        registryKey={getRegistryKey({
          editorName: 'boqBlockQtyCell',
          blockIndex: block.index,
          rowIndex: row.index,
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
          onChangeQtyCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onBlur={() => {
          onFocusOutFromQtyCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onKeyDown={(_view, event) =>
          onTabAwayFromQtyCell({
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

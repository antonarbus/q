import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { showRowPins } from '@feature/blocks/show-row-pins/showRowPins'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinPriceCell } from '@feature/blocks/pin-price-cell/pinPriceCell'
import { tabFromPriceCell } from '@feature/blocks/tab-away-from-price-cell/tabFromPriceCell'
import { handleChangeOfPriceCell } from '@feature/blocks/handle-change-of-price-cell-at-boq-block/handleChangeOfPriceCell'
import { handleFocusOutFromPriceCell } from '@feature/blocks/handle-focus-out-from-price-cell-at-boq-block/handleFocusOutFromPriceCell'
import { validatePrice } from '@feature/blocks/handle-focus-out-from-price-cell-at-boq-block/validatePrice'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const PriceCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'price',
    minWidth: `${columnMinWidth.price}px`,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: block.index,
          rowIndex: row.index,
        })}
        className='td price'
        placeholder='Price...'
        contentGetter={() =>
          getCellHtmlFromStore({
            blockIndex: block.index,
            cellKey: 'price',
            rowIndex: row.index,
          })
        }
        onUpdate={(params) => {
          handleChangeOfPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onBlur={() => {
          handleFocusOutFromPriceCell({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          validatePrice({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onWrapperFocus={() => {
          showRowPins({ blockIndex: block.index, rowIndex: row.index })
        }}
        onKeyDown={(_view, event) =>
          tabFromPriceCell({
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
        cellKey='price'
        onClick={(event: React.MouseEvent) => {
          event.preventDefault() // otherwise form is submitted (no idea why)
          pinPriceCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { showRowPins } from '@feature/blocks/pin/show-row-pins/showRowPins'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinPriceCell } from '@feature/blocks/pin/pin-price-cell/pinPriceCell'
import { onTabAwayFromPriceCell } from '@feature/blocks/on-cell-tab-away/on-tab-away-from-price-cell/onTabAwayFromPriceCell'
import { onChangePriceCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-price-cell-at-boq-block/onChangePriceCellAtBoqBlock'
import { onFocusOutFromPriceCell } from '@feature/blocks/on-text-focus-out/on-focus-out-from-price-cell-at-boq-block/onFocusOutFromPriceCell'
import { validatePrice } from '@feature/blocks/on-text-focus-out/on-focus-out-from-price-cell-at-boq-block/validatePrice'
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
          getHtmlOfCellFromStoreByIndex({
            blockIndex: block.index,
            cellKey: 'price',
            rowIndex: row.index,
          })
        }
        onUpdate={() => {
          onChangePriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onBlur={() => {
          onFocusOutFromPriceCell({
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
          onTabAwayFromPriceCell({
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
        onClick={() => {
          pinPriceCell({ blockIndex: block.index, rowIndex: row.index })
        }}
      />
    </Box>
  )
}

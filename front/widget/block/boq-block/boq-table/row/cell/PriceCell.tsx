import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { recalculateSubTotalPrices } from '@entity/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'
import { showRowPins } from '@feature/blocks/pin/show-row-pins/showRowPins'
import { Box } from '@mui/material'
import { TextEditor } from '@shared/component/TextEditor'
import { Pin } from './Pin'
import { pinPriceCell } from '@feature/blocks/pin/pin-price-cell/pinPriceCell'
import { focusNextRowDescriptionCellAtBoqBlock } from '@feature/blocks/focus-next-row-description-cell-at-boq-block/focusNextRowDescriptionCellAtBoqBlock'
import { updatePriceCellAtBoqBlock } from '@feature/blocks/update-price-cell-at-boq-block/updatePriceCellAtBoqBlock'
import { formatPriceCellAtBoqBlock } from '@feature/blocks/format-price-cell-at-boq-block/formatPriceCellAtBoqBlock'
import { validateAndCorrectPriceCellAtBoqBlock } from '@feature/blocks/validate-and-correct-price-cell-at-boq-block/validateAndCorrectPriceCellAtBoqBlock'
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
        onChange={() => {
          const didUpdate = updatePriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          if (didUpdate === true) {
            recalculateSubTotalPrices({ incrementally: true })
            recalculateTotalPrices()
          }
        }}
        onFocusOut={() => {
          formatPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          validateAndCorrectPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })
        }}
        onWrapperFocus={() => {
          showRowPins({ blockIndex: block.index, rowIndex: row.index })
        }}
        onKeyDown={(_view, event) => {
          if (event.key !== 'Tab') {
            return false
          }

          const didNavigate = focusNextRowDescriptionCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          if (didNavigate === true) {
            event.preventDefault()
          }

          return didNavigate // stop ProseMirror propagation if return true
        }}
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

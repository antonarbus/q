import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { getHtmlOfCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { showRowPins } from '@front/features/blocks/pin/show-row-pins/showRowPins'
import { Box } from '@mui/material'
import { TextEditor } from '@front/shared/component/TextEditor'
import { Pin } from './Pin'
import { pinPriceCell } from '@front/features/blocks/pin/pin-price-cell/pinPriceCell'
import { focusNextRowDescriptionCellAtBoqBlock } from '@front/features/blocks/focus-next-row-description-cell-at-boq-block/focusNextRowDescriptionCellAtBoqBlock'
import { updatePriceCellAtBoqBlock } from '@front/features/blocks/update-price-cell-at-boq-block/updatePriceCellAtBoqBlock'
import { formatPriceCellAtBoqBlock } from '@front/features/blocks/format-price-cell-at-boq-block/formatPriceCellAtBoqBlock'
import { validateAndCorrectPriceCellAtBoqBlock } from '@front/features/blocks/validate-and-correct-price-cell-at-boq-block/validateAndCorrectPriceCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'

export const PriceCell = (): React.JSX.Element => {
  const isFullAppView = useIsFullAppView()
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
        isFullAppView={isFullAppView}
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
          // console.log('changed')
        }}
        onFocusOut={() => {
          updatePriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          formatPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          validateAndCorrectPriceCellAtBoqBlock({
            blockIndex: block.index,
            rowIndex: row.index,
          })

          recalculateSubTotalPrices({ incrementally: true })

          recalculateTotalPrices()
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

          // stop ProseMirror propagation if return true
          return didNavigate
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

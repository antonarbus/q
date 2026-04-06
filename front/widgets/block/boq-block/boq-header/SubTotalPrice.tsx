import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { subTotalPriceCellStyle } from '@front/entities/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@front/shared/component/TextEditor'
import { showHidePricePins } from '@front/features/blocks/pin/show-hide-pins-in-price-column/showHidePricePins'
import { redistributePricesAtBoqBlock } from '@front/features/blocks/redistribute-prices-at-boq-block/redistributePricesAtBoqBlock'
import { formatSubtotalPriceAtBoqBlock } from '@front/features/blocks/format-subtotal-price-at-boq-block/formatSubtotalPriceAtBoqBlock'
import { validatePricesAtBoqBlock } from '@front/features/blocks/validate-prices-at-boq-block/validatePricesAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): React.JSX.Element => {
  const isEditorView = useIsEditorView()
  const block = useBlock()

  const hidePinsClickHandlerRef = useRef<(event: globalThis.MouseEvent) => void>(() => {
    // console.warn('hidePinsClickHandlerRef')
  })

  const isInitClickRef = useRef(true)

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockSubTotalPrice',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isEditorView={isEditorView}
      className='sub-total-price'
      placeholder='Price...'
      contentGetter={() =>
        getHtmlOfBoqHeaderFromStoreByIndex({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onChange={() => {
        // console.log('on change')
      }}
      onFocusOut={() => {
        formatSubtotalPriceAtBoqBlock({ blockIndex: block.index })
        redistributePricesAtBoqBlock({ blockIndex: block.index })
        validatePricesAtBoqBlock({ blockIndex: block.index })
        recalculateTotalPrices()
      }}
      onWrapperClick={(event: React.MouseEvent) => {
        showHidePricePins({
          blockIndex: block.index,
          event: event.nativeEvent,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      sx={subTotalPriceCellStyle}
    />
  )
}

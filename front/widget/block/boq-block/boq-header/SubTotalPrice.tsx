import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import { showHidePricePins } from '@feature/blocks/show-hide-pins-in-price-column/showHidePricePins'
import { handleChangeOfSubtotalPrice } from '@feature/blocks/handle-change-of-subtotal-price-at-boq-block/handleChangeOfSubtotalPrice'
import { handleFocusOutFromSubtotalPrice } from '@feature/blocks/handle-focus-out-from-subtotal-price-at-boq-block/handleFocusOutFromSubtotalPrice'
import { validatePrices } from '@feature/blocks/handle-focus-out-from-subtotal-price-at-boq-block/validatePrices'
import { useUpdateSubtotalPriceValue } from '@feature/blocks/update-subtotal-price-value-if-rows-qty-changed/useUpdateSubtotalPriceValue'
import { blockEditorKey } from '@shared/lib/tiptap/editorKey'

const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): React.JSX.Element => {
  const block = useBlock()

  const hidePinsClickHandlerRef = useRef<(e: globalThis.MouseEvent) => void>(
    (event) => {
      console.warn('hidePinsClickHandlerRef')
    },
  )

  const isInitClickRef = useRef(true)

  useUpdateSubtotalPriceValue()

  return (
    <TextEditor
      registryKey={blockEditorKey({
        blockIndex: block.index,
        editorName: 'subTotalPrice',
      })}
      className='sub-total-price'
      placeholder='Price...'
      contentGetter={() =>
        getBoqHeaderHtmlFromStore({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onUpdate={(params) => {
        handleChangeOfSubtotalPrice({
          blockIndex: block.index,
        })
      }}
      onBlur={() => {
        handleFocusOutFromSubtotalPrice({
          blockIndex: block.index,
        })

        validatePrices({
          blockIndex: block.index,
        })
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

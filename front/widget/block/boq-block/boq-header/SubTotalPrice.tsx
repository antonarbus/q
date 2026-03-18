import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import { showHidePricePins } from '@feature/blocks/show-hide-pins-in-price-column/showHidePricePins'
import { onChangeSubtotalPriceAtBoqBlock } from '@feature/blocks/on-change-subtotal-price-at-boq-block/onChangeSubtotalPriceAtBoqBlock'
import { onFocusOutFromSubtotalPrice } from '@feature/blocks/on-focus-out-from-subtotal-price-at-boq-block/onFocusOutFromSubtotalPrice'
import { validatePrices } from '@feature/blocks/on-focus-out-from-subtotal-price-at-boq-block/validatePrices'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'
const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): React.JSX.Element => {
  const block = useBlock()

  const hidePinsClickHandlerRef = useRef<(e: globalThis.MouseEvent) => void>(
    (event) => {
      console.warn('hidePinsClickHandlerRef')
    },
  )

  const isInitClickRef = useRef(true)

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockSubTotalPrice',
        blockIndex: block.index,
        rowIndex: null,
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
        onChangeSubtotalPriceAtBoqBlock({
          blockIndex: block.index,
        })
      }}
      onBlur={() => {
        onFocusOutFromSubtotalPrice({
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

import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import { showHidePricePins } from '@feature/blocks/pin/show-hide-pins-in-price-column/showHidePricePins'
import { onChangeSubtotalPriceAtBoqBlock } from '@feature/blocks/on-text-change/on-change-subtotal-price-at-boq-block/onChangeSubtotalPriceAtBoqBlock'
import { onFocusOutFromSubtotalPrice } from '@feature/blocks/on-text-focus-out/on-focus-out-from-subtotal-price-at-boq-block/onFocusOutFromSubtotalPrice'
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
      onUpdate={() => {
        onChangeSubtotalPriceAtBoqBlock({ blockIndex: block.index })
      }}
      onBlur={() => {
        onFocusOutFromSubtotalPrice({ blockIndex: block.index })
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

import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import { showHidePricePins } from '@feature/blocks/show-hide-pins-in-price-column/showHidePricePins'
import { changeSubtotalPrice } from '@feature/blocks/change-subtotal-price-at-boq-block/changeSubtotalPrice'
import { focusOutFromSubtotalPrice } from '@feature/blocks/focus-out-from-subtotal-price-at-boq-block/focusOutFromSubtotalPrice'
import { validatePrices } from '@feature/blocks/focus-out-from-subtotal-price-at-boq-block/validatePrices'

const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): React.JSX.Element => {
  const boq = useBoq()
  const block = useBlock()

  const hidePinsClickHandlerRef = useRef<(e: globalThis.MouseEvent) => void>(
    (event) => {
      console.warn('hidePinsClickHandlerRef')
    },
  )

  const isInitClickRef = useRef(true)

  // useUpdateSubtotal()

  return (
    <TextEditor
      editorRef={boq.subTotalPriceEditorRef}
      className='sub-total-price'
      placeholder='Price...'
      contentGetter={() =>
        getBoqHeaderHtmlFromStore({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onUpdate={(params) => {
        changeSubtotalPrice({
          blockIndex: block.index,
          rowEditorRefs: boq.rowEditorRefs,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })
      }}
      onBlur={() => {
        focusOutFromSubtotalPrice({
          blockIndex: block.index,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })

        validatePrices({
          blockIndex: block.index,
          rowEditorRefs: boq.rowEditorRefs,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
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

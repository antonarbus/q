import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import { showHidePricePins } from '@feature/blocks/pin/show-hide-pins-in-price-column/showHidePricePins'
import { redistributePricesAtBoqBlock } from '@feature/blocks/redistribute-prices-at-boq-block/redistributePricesAtBoqBlock'
import { formatSubtotalPriceAtBoqBlock } from '@feature/blocks/format-subtotal-price-at-boq-block/formatSubtotalPriceAtBoqBlock'
import { validatePricesAtBoqBlock } from '@feature/blocks/validate-prices-at-boq-block/validatePricesAtBoqBlock'
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
        getHtmlOfBoqHeaderFromStoreByIndex({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onChange={() => {
        redistributePricesAtBoqBlock({ blockIndex: block.index })
        recalculateTotalPrices()
      }}
      onFocusOut={() => {
        const didFormat = formatSubtotalPriceAtBoqBlock({
          blockIndex: block.index,
        })

        if (didFormat === true) {
          validatePricesAtBoqBlock({ blockIndex: block.index })
          recalculateTotalPrices()
        }
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

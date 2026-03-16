import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import { TextEditor } from '@shared/component/TextEditor'
import { useUpdateTotalPriceIfPricesAboveWereChanged } from '@feature/blocks/update-total-price-value-if-prices-above-changed/useUpdateTotalPriceIfPricesAboveWereChanged'
import { handleFocusOutFromTotalPrice } from '@feature/blocks/handle-focus-out-from-price-value-at-price-block/handleFocusOutFromTotalPrice'
import { handleChangeOfPriceValue } from '@feature/blocks/handle-change-of-price-value-at-price-block/handleChangeOfPriceValue'

export const PriceValue = (): React.JSX.Element => {
  const block = useBlock()

  useUpdateTotalPriceIfPricesAboveWereChanged({ blockIndex: block.index })

  return (
    <TextEditor
      registryKey={{ blockIndex: block.index, editorName: 'totalPriceValue' }}
      className='price-value'
      placeholder='Total price...'
      contentGetter={() =>
        getPriceBlockHtmlFromStore({ blockIndex: block.index })
      }
      onCreate={() => {
        // probably just to revalidate total price, has some issue with incorrect values, not sure
        handleFocusOutFromTotalPrice({ blockIndex: block.index })
      }}
      onUpdate={() => {
        handleChangeOfPriceValue({ blockIndex: block.index })
      }}
      onBlur={() => {
        handleFocusOutFromTotalPrice({ blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}

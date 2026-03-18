import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import { TextEditor } from '@shared/component/TextEditor'
import { onFocusOutFromTotalPrice } from '@feature/blocks/on-text-focus-out/on-focus-out-from-price-value-at-price-block/onFocusOutFromTotalPrice'
import { onChangePriceValueAtPriceBlock } from '@feature/blocks/on-text-change/on-change-price-value-at-price-block/onChangePriceValueAtPriceBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const PriceValue = (): React.JSX.Element => {
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'priceBlockPrice',
        blockIndex: block.index,
        rowIndex: null,
      })}
      className='price-value'
      placeholder='Total price...'
      contentGetter={() =>
        getPriceBlockHtmlFromStore({ blockIndex: block.index })
      }
      onCreate={() => {
        // probably just to revalidate total price, has some issue with incorrect values, not sure
        onFocusOutFromTotalPrice({ blockIndex: block.index })
      }}
      onUpdate={() => {
        onChangePriceValueAtPriceBlock({ blockIndex: block.index })
      }}
      onBlur={() => {
        onFocusOutFromTotalPrice({ blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}

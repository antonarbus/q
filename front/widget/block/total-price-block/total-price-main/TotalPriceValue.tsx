import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfPriceFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfPriceFromStoreByIndex'
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
        getHtmlOfPriceFromStoreByIndex({ blockIndex: block.index })
      }
      onChange={() => {
        onChangePriceValueAtPriceBlock({ blockIndex: block.index })
      }}
      onFocusOut={() => {
        onFocusOutFromTotalPrice({ blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}

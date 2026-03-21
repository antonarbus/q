import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfPriceFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfPriceFromStoreByIndex'
import { TextEditor } from '@shared/component/TextEditor'
import { correctTotalPriceAtPriceBlock } from '@feature/blocks/correct-total-price-at-price-block/correctTotalPriceAtPriceBlock'
import { updatePriceValueAtPriceBlock } from '@feature/blocks/update-price-value-at-price-block/updatePriceValueAtPriceBlock'
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
        updatePriceValueAtPriceBlock({ blockIndex: block.index })
      }}
      onFocusOut={() => {
        correctTotalPriceAtPriceBlock({ blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}

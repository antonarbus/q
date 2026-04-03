import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfPriceFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfPriceFromStoreByIndex'
import { TextEditor } from '@front/shared/component/TextEditor'
import { correctTotalPriceAtPriceBlock } from '@front/features/blocks/correct-total-price-at-price-block/correctTotalPriceAtPriceBlock'
import { updatePriceValueAtPriceBlock } from '@front/features/blocks/update-price-value-at-price-block/updatePriceValueAtPriceBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'

export const PriceValue = (): React.JSX.Element => {
  const isFullAppView = useIsFullAppView()
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'priceBlockPrice',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isFullAppView={isFullAppView}
      className='price-value'
      placeholder='Total price...'
      contentGetter={() => getHtmlOfPriceFromStoreByIndex({ blockIndex: block.index })}
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

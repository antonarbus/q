import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { TextEditor } from '@shared/component/TextEditor'
import { onChangePriceTitleAtPriceBlock } from '@feature/blocks/on-text-change/on-change-price-title-at-price-block/onChangePriceTitleAtPriceBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'
import { getHtmlOfPriceTitleFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfPriceTitleFromStoreByIndex'

export const PriceTitle = (): React.JSX.Element => {
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'priceBlockTitle',
        blockIndex: block.index,
        rowIndex: null,
      })}
      className='price-title'
      placeholder='Total price...'
      contentGetter={() =>
        getHtmlOfPriceTitleFromStoreByIndex({ blockIndex: block.index })
      }
      onChange={() => {
        onChangePriceTitleAtPriceBlock({
          blockIndex: block.index,
        })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}

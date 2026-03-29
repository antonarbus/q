import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updatePriceTitleAtPriceBlock } from '@front/features/blocks/update-price-title-at-price-block/updatePriceTitleAtPriceBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { getHtmlOfPriceTitleFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfPriceTitleFromStoreByIndex'

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
      contentGetter={() => getHtmlOfPriceTitleFromStoreByIndex({ blockIndex: block.index })}
      onChange={() => {
        updatePriceTitleAtPriceBlock({ blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}

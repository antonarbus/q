import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { TextEditor } from '@shared/component/TextEditor'
import { updatePriceTitleAtPriceBlock } from '@feature/blocks/update-price-title-at-price-block/updatePriceTitleAtPriceBlock'
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
        updatePriceTitleAtPriceBlock({ blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}

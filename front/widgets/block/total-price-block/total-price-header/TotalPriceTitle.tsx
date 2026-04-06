import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updatePriceTitleAtPriceBlock } from '@front/features/blocks/update-price-title-at-price-block/updatePriceTitleAtPriceBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { getHtmlOfPriceTitleFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfPriceTitleFromStoreByIndex'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'

export const PriceTitle = (): React.JSX.Element => {
  const isEditorView = useIsEditorView()
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'priceBlockTitle',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isEditorView={isEditorView}
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

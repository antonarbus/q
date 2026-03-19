import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { TextEditor } from '@shared/component/TextEditor'
import { getState } from '@shared/lib/redux'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { onChangePriceTitleAtPriceBlock } from '@feature/blocks/on-text-change/on-change-price-title-at-price-block/onChangePriceTitleAtPriceBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const PriceTitle = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
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
      contentGetter={() => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== 'price') {
          return ''
        }

        return priceBlock.title.html
      }}
      onChange={() => {
        onChangePriceTitleAtPriceBlock({
          editorRef,
          blockIndex: block.index,
        })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}

import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { TextEditor } from '@shared/component/TextEditor'
import { getState } from '@shared/lib/redux'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { updatePriceTitle } from '@feature/blocks/change-price-title-at-price-block/updatePriceTitle'

export const PriceTitle = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <TextEditor
      editorRef={editorRef}
      className='price-title'
      placeholder='Total price...'
      contentGetter={() => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== 'price') {
          return ''
        }

        return priceBlock.title.html
      }}
      onUpdate={(params) => {
        updatePriceTitle({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}

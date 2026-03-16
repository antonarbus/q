import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { TextEditor } from '@shared/component/TextEditor'
import { getState } from '@shared/lib/redux'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { handleChangeOfPriceTitle } from '@feature/blocks/handle-change-of-price-title-at-price-block/handleChangeOfPriceTitle'
import { blockEditorKey } from '@shared/lib/tiptap/editorKey'

export const PriceTitle = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <TextEditor
      registryKey={blockEditorKey({
        blockIndex: block.index,
        editorName: 'totalPriceTitle',
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
      onUpdate={(params) => {
        handleChangeOfPriceTitle({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}

import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { updatePriceTitle } from '@feature/blocks/update'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import { getState, useSelector } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'
import type { Editor } from '@tiptap/react'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector(
    (state) => state.quotation.blocks[block.index]?.isFroala ?? true,
  )

  return (
    <Tiptap
      editorRef={editorRef}
      className='price-title'
      placeholder='Total price...'
      content={((): string => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== 'price') {
          return ''
        }

        return priceBlock.title.html
      })()}
      onUpdate={(params) => {
        updatePriceTitle({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
      isEditorActive={isEditorActive}
    />
  )
}

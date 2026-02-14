import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { updatePriceTitle } from '@feature/blocks/update'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import { getState } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'
import type { Editor } from '@tiptap/react'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

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
    />
  )
}

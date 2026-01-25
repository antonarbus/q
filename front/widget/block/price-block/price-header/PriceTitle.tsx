import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { updatePriceTitle } from '@feature/blocks/update'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import { getState } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'
import type { Editor } from '@tiptap/react'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    /*
    <Froala
      editorRef={editorRef}
      htmlGetter={() => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== 'price') {
          return ''
        }

        const titleHtml = priceBlock.title.html

        return titleHtml
      }}
      onContentChange={() => {
        updatePriceTitle({ editorRef, blockIndex: block.index })
      }}
      placeholder='Total price...'
    />
    */
    <Tiptap
      editorRef={editorRef}
      className='price-title'
      content={((): string => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== 'price') {
          return ''
        }

        return priceBlock.title.html
      })()}
      onContentChange={(params) => {
        updatePriceTitle({ editorRef, blockIndex: block.index })
      }}
      sx={{}}
    />
  )
}

import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { updatePriceTitle } from '@feature/blocks/update'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
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
      content={((): string => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== 'price') {
          return ''
        }

        return priceBlock.title.html
      })()}
      onContentChange={(params) => {
        const html = params.editor.getHTML()
        console.log(html)
      }}
    />
  )
}

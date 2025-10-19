import { itemType } from '@entities/quotation/const/itemType'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updatePriceTitleCell } from '@features/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => {
        const priceBlock = getState().quotation.blocks[block.index]

        if (priceBlock?.type !== itemType.price) {
          return ''
        }

        const titleHtml = priceBlock.title.html

        return titleHtml
      }}
      onContentChange={() => {
        updatePriceTitleCell({ editorRef, blockIndex: block.index })
      }}
      placeholder='Total price...'
    />
  )
}

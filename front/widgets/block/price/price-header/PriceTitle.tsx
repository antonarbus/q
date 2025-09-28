import { getState } from '@shared/lib/redux'
import { useRef } from 'react'
import type { JSX } from 'react'
import { updatePriceTitleCell } from '@features/blocks/cell/update-cell'
import { useBlock, Froala, itemType } from '@entities/quotation'
import type { FroalaEditor } from '@shared/type/froala'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => {
        const priceBlock = getState().quotation.blocks[blockIndex]

        if (priceBlock?.type !== itemType.price) {
          return ''
        }

        const titleHtml = priceBlock.title.html

        return titleHtml
      }}
      onContentChange={() => {
        updatePriceTitleCell({ editorRef, blockIndex })
      }}
      placeholder='Total price...'
    />
  )
}

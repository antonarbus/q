import { itemType } from '@entities/quotation/const/itemType'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updatePriceTitleCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'

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

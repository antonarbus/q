import { getState } from '@lib_instances/store'
import { useRef } from 'react'
import { updatePriceTitleCell } from '@features/blocks/cell/update_cell'
import { useBlock, Froala, itemKey } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        const priceBlock = getState().quotation.blocks[blockIndex]
        if (priceBlock?.type !== itemKey.price) return ''
        const titleHtml = priceBlock.title.html
        return titleHtml
      }}
      onContentChange={() => {
        updatePriceTitleCell({ editorRef, blockIndex })
      }}
    />
  )
}

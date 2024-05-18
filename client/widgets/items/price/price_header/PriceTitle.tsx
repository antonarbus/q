import { getState } from '@lib_instances/store'
import { useRef } from 'react'
import { updatePriceTitleCell } from '@features/items/cell/update_cell'
import { useItem, Froala, itemKey } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        const priceItem = getState().quotation.items[itemIndex]
        if (priceItem?.type !== itemKey.price) return ''
        const titleHtml = priceItem.title.html
        return titleHtml
      }}
      onContentChange={() => {
        updatePriceTitleCell({ editorRef, itemIndex })
      }}
    />
  )
}

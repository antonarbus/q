import { getState } from '@lib_instances/store'
import { useRef } from 'react'
import { updatePriceTitle } from '@features/update_cell'
import { useItem, Froala, itemType } from '@entities/items'
import { type FroalaEditor } from '@shared/types'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        const priceItem = getState().items[itemIndex]
        if (priceItem?.type !== itemType.price) return ''
        const titleHtml = priceItem.title.html
        return titleHtml
      }}
      onContentChange={() => {
        updatePriceTitle({ editorRef, itemIndex })
      }}
    />
  )
}

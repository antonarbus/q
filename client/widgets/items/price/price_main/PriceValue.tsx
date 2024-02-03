import { getState } from '@lib_instances/store'
import { useRef } from 'react'
import { updatePriceValue } from '@features/update_cell'
import { useItem, Froala, itemType } from '@entities/items'
import { type FroalaEditor } from '@shared/types'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        const priceItem = getState().items[itemIndex]
        if (priceItem?.type !== itemType.price) return ''
        const priceHtml = priceItem.price.html
        return priceHtml
      }}
      onContentChange={() => {
        updatePriceValue({ editorRef, itemIndex })
        // todo: allow to style, but put value automatically, do not allow to update it manually
        // todo: maybe check if value is correct on blur
      }}
    />
  )
}

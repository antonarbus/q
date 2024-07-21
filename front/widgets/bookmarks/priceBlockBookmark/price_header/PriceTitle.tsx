import { useRef } from 'react'
import { Froala, itemType } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'
import { bookmarkSignal } from '@entities/bookmark'

export const PriceTitle = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        if (bookmarkSignal.value?.type !== itemType.price) return ''
        const titleHtml = bookmarkSignal.value.title.html
        return titleHtml
      }}
      onContentChange={() => {
        if (editorRef.current === null) return
        if (bookmarkSignal.value?.type !== itemType.price) return
        const html = editorRef.current.html.get()
        const newPriceTotalValue = structuredClone(bookmarkSignal.value)
        newPriceTotalValue.title.html = html
        bookmarkSignal.value = newPriceTotalValue
      }}
    />
  )
}

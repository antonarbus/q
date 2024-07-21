import { useRef } from 'react'
import { Froala, subTotalTextCellStyle, itemType } from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'
import { bookmarkSignal } from '@entities/bookmark'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Subtotal...'
      style={subTotalTextCellStyle}
      htmlGetter={() => {
        if (bookmarkSignal.value?.type !== itemType.boq) return ''
        const titleHtml = bookmarkSignal.value.boq.header.subtotalText.html
        return titleHtml
      }}
      onContentChange={() => {
        if (editorRef.current === null) return
        if (bookmarkSignal.value?.type !== itemType.boq) return
        const html = editorRef.current.html.get()
        const clonedBookmark = structuredClone(bookmarkSignal.value)
        clonedBookmark.boq.header.subtotalText.html = html
        bookmarkSignal.value = clonedBookmark
      }}
    />
  )
}

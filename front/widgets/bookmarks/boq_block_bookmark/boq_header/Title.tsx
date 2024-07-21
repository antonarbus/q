import { useRef } from 'react'
import { Froala, titleCellStyle, itemType } from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'
import { bookmarkSignal } from '@entities/bookmark'

export const Title = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Title...'
      style={titleCellStyle}
      htmlGetter={() => {
        if (bookmarkSignal.value?.type !== itemType.boq) return ''
        const titleHtml = bookmarkSignal.value.boq.header.title.html
        return titleHtml
      }}
      onContentChange={() => {
        if (editorRef.current === null) return
        if (bookmarkSignal.value?.type !== itemType.boq) return
        const html = editorRef.current.html.get()
        const clonedBookmark = structuredClone(bookmarkSignal.value)
        clonedBookmark.boq.header.title.html = html
        bookmarkSignal.value = clonedBookmark
      }}
    />
  )
}

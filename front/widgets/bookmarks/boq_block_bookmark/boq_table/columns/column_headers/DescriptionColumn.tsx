import { type ReactNode, useRef } from 'react'
import {
  Froala,
  columnHeaderStyle,
  boqColumnKey,
  itemType,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'
import { bookmarkSignal } from '@entities/bookmark'

export const DescriptionColumn = (): ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.description}
      className={`th ${boqColumnKey.description} resizable`}
      minWidth={200}
      flexGrow={1}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Description...'
        style={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
        htmlGetter={() => {
          if (bookmarkSignal.value?.type !== itemType.boq) return ''
          const html = bookmarkSignal.value.boq.column.description.html
          return html
        }}
        onContentChange={() => {
          if (editorRef.current === null) return
          if (bookmarkSignal.value?.type !== itemType.boq) return
          const html = editorRef.current.html.get()
          const clonedBookmark = structuredClone(bookmarkSignal.value)
          clonedBookmark.boq.column.description.html = html
          bookmarkSignal.value = clonedBookmark
        }}
      />
    </ResizableColumn>
  )
}

import { useRef } from 'react'
import {
  Froala,
  columnHeaderStyle,
  boqColumnKey,
  itemType,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'
import { bookmarkSignal } from '@entities/bookmark'

export const QtyColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.qty}
      className={`th ${boqColumnKey.qty} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Qty...'
        style={columnHeaderStyle}
        htmlGetter={() => {
          if (bookmarkSignal.value?.type !== itemType.boq) return ''
          const html = bookmarkSignal.value.boq.column.qty.html
          return html
        }}
        onContentChange={() => {
          if (editorRef.current === null) return
          if (bookmarkSignal.value?.type !== itemType.boq) return
          const html = editorRef.current.html.get()
          const clonedBookmark = structuredClone(bookmarkSignal.value)
          clonedBookmark.boq.column.qty.html = html
          bookmarkSignal.value = clonedBookmark
        }}
      />
    </ResizableColumn>
  )
}

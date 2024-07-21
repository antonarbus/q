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

export const PriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Price...'
        style={columnHeaderStyle}
        htmlGetter={() => {
          if (bookmarkSignal.value?.type !== itemType.boq) return ''
          const html = bookmarkSignal.value.boq.column.price.html
          return html
        }}
        onContentChange={() => {
          if (editorRef.current === null) return
          if (bookmarkSignal.value?.type !== itemType.boq) return
          const html = editorRef.current.html.get()
          const clonedBookmark = structuredClone(bookmarkSignal.value)
          clonedBookmark.boq.column.price.html = html
          bookmarkSignal.value = clonedBookmark
        }}
      />
    </ResizableColumn>
  )
}

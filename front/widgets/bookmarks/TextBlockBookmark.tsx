import type { ReactNode } from 'react'
import { useRef } from 'react'
import {
  onTextBlockBookmarkResizeStart,
  onTextBlockBookmarkResizeStop,
} from '@features/blocks/resize'
import { beforeUpload } from '@features/upload'
import {
  Froala,
  textItemCellStyle,
  itemType,
  BlockProvider,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import type { FroalaEditor } from '@shared/types/froala'
import { bookmarkSignal } from '@entities/bookmark'
import { BookmarkComp } from '@entities/quotation/ui/BookmarkComp'

export const TextBlockBookmark = (): ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)

  if (bookmarkSignal.value === null) return null
  if (bookmarkSignal.value.type !== itemType.text) return null

  return (
    <BlockProvider
      id={'text block for bookmark'}
      blockIndex={0}
      block={bookmarkSignal.value}
    >
      <BookmarkComp
        className={cls.textBlock}
        onItemResizeStart={onTextBlockBookmarkResizeStart}
        onItemResizeStop={onTextBlockBookmarkResizeStop}
      >
        <Froala
          editorRef={editorRef}
          htmlGetter={() => {
            if (bookmarkSignal.value?.type !== itemType.text) return ''
            const html = bookmarkSignal.value.text.html
            return html
          }}
          placeholder='Add text, tables, drop images, files, links, select to format...'
          beforeUpload={beforeUpload}
          style={textItemCellStyle}
          onContentChange={() => {
            if (editorRef.current === null) return
            if (bookmarkSignal.value?.type !== itemType.text) return
            const html = editorRef.current.html.get()
            const newBookmarkValue = structuredClone(bookmarkSignal.value)
            newBookmarkValue.text.html = html
            bookmarkSignal.value = newBookmarkValue
          }}
        />
      </BookmarkComp>
    </BlockProvider>
  )
}

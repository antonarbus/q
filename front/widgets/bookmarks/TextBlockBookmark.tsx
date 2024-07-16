import { useRef } from 'react'
import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@features/blocks/resize'
import { BookmarkBlockIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBlockModalIcon } from '@features/open_close/open_item_info_modal'
import { beforeUpload } from '@features/upload'
import {
  Froala,
  BlockComp,
  textItemCellStyle,
  itemType,
  BlockProvider,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { ItemActionButtonsLayout } from '@shared/layouts'
import type { FroalaEditor } from '@shared/types/froala'
import { bookmarkSignal } from '@entities/bookmark'

export const TextBlockBookmark = (): React.ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)

  if (bookmarkSignal.value === null) return null
  if (bookmarkSignal.value?.type !== itemType.text) return null

  return (
    <BlockProvider
      id={'text block for bookmark'}
      blockIndex={0}
      block={bookmarkSignal.value}
    >
      <BlockComp
        className={cls.textBlock}
        onItemResizeStart={onTextBlockResizeStart}
        onItemResizeStop={onTextBlockResizeStop}
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
            const prevHtml = bookmarkSignal.value.text.html
            const html = editorRef.current.html.get()
            const didTextChange = prevHtml !== html
            if (!didTextChange) return
            bookmarkSignal.value.text.html = html
          }}
        />
      </BlockComp>
    </BlockProvider>
  )
}

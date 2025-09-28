import { useRef } from 'react'
import type { JSX } from 'react'
import { updateTextBlock } from '@features/blocks/cell/update-cell'
import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@features/blocks/resize'
import { BookmarkBlockIcon } from '@features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@features/open-close/open-info-modal'
import { beforeUpload } from '@features/file/upload-file'
import {
  Froala,
  BlockComp,
  getTextBlockHtmlFromStore,
  textItemCellStyle,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/const/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import type { FroalaEditor } from '@shared/type/froala'

export const TextBlock = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <BlockComp
      className={cls.textBlock}
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      onBlockResizeStart={onTextBlockResizeStart}
      onBlockResizeStop={onTextBlockResizeStop}
      rightBlockActionButtons={
        <ItemActionButtonsLayout>
          <BookmarkBlockIcon />
          <OpenInfoBlockModalIcon />
          <DeleteBlockIcon />
        </ItemActionButtonsLayout>
      }
    >
      <Froala
        beforeUpload={beforeUpload}
        droppable
        editorRef={editorRef}
        htmlGetter={() => getTextBlockHtmlFromStore({ blockIndex })}
        onContentChange={() => {
          updateTextBlock({ editorRef, blockIndex })
        }}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        style={textItemCellStyle}
      />
    </BlockComp>
  )
}

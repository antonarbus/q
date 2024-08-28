import { useRef } from 'react'
import { updateTextBlock } from '@features/blocks/cell/update_cell'
import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@features/blocks/resize'
import { BookmarkBlockIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBlockModalIcon } from '@features/open_close/open_info_modal'
import { beforeUpload } from '@features/upload'
import {
  Froala,
  BlockComp,
  getTextBlockHtmlFromStore,
  textItemCellStyle,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { ItemActionButtonsLayout } from '@shared/layouts/ItemActionButtonsLayout'
import type { FroalaEditor } from '@shared/types/froala'

export const TextBlock = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <BlockComp
      className={cls.textBlock}
      onBlockResizeStart={onTextBlockResizeStart}
      onBlockResizeStop={onTextBlockResizeStop}
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      rightBlockActionButtons={
        <ItemActionButtonsLayout>
          <BookmarkBlockIcon />
          <OpenInfoBlockModalIcon />
          <DeleteBlockIcon />
        </ItemActionButtonsLayout>
      }
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() => getTextBlockHtmlFromStore({ blockIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        beforeUpload={beforeUpload}
        style={textItemCellStyle}
        onContentChange={() => {
          updateTextBlock({ editorRef, blockIndex })
        }}
      />
    </BlockComp>
  )
}

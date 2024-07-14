import { useRef } from 'react'
import { updateTextBlock } from '@features/items/cell/update_cell'
import { CopyBlockIcon } from '@features/items/copy'
import { CutBlockIcon } from '@features/items/cut'
import { DeleteBlockIcon } from '@features/items/delete'
import { DragBlockIcon } from '@features/items/drag'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@features/items/resize'
import { BookmarkBlockIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBlockModalIcon } from '@features/open_close/open_item_info_modal'
import { beforeUpload } from '@features/upload'
import {
  Froala,
  BlockComp,
  getTextBlockHtmlFromStore,
  textItemCellStyle,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { type FroalaEditor } from '@shared/types/froala'

export const TextBlock = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <BlockComp
      className={cls.textBlock}
      onItemResizeStart={onTextBlockResizeStart}
      onItemResizeStop={onTextBlockResizeStop}
      leftItemActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      rightItemActionButtons={
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

import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getTextBlockHtmlFromStore } from '@entity/quotation/redux/getter/getTextBlockHtmlFromStore'
import { textItemCellStyle } from '@entity/quotation/style/textItemCellStyle'
import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { CopyBlockIcon } from '@feature/blocks/copy'
import { CutBlockIcon } from '@feature/blocks/cut'
import { DeleteBlockIcon } from '@feature/blocks/delete'
import { DragBlockIcon } from '@feature/blocks/drag'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@feature/blocks/resize'
import { updateTextBlock } from '@feature/blocks/update'
import { upload } from '@feature/file/upload-file'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { TextEditor } from '@shared/component/TextEditor'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'

export const TextBlock = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

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
      <TextEditor
        editorRef={editorRef}
        className='text'
        placeholder='Add text, tables, drop images, files, links, select to format...'
        content={() => getTextBlockHtmlFromStore({ blockIndex: block.index })}
        onUpdate={(params) => {
          updateTextBlock({ editorRef, blockIndex: block.index })
        }}
        onUpload={upload}
        sx={textItemCellStyle}
      />
    </BlockComp>
  )
}

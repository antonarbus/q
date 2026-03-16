import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getTextBlockHtmlFromStore } from '@entity/quotation/redux/getter/getTextBlockHtmlFromStore'
import { textItemCellStyle } from '@entity/quotation/style/textItemCellStyle'
import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { upload } from '@feature/file/upload-file'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { TextEditor } from '@shared/component/TextEditor'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { CopyBlockIcon } from '@feature/blocks/copy-block/CopyBlockIcon'
import { blockEditorKey } from '@shared/lib/tiptap/editorKey'
import { CutBlockIcon } from '@feature/blocks/cut-block/CutBlockIcon'
import { DeleteBlockIcon } from '@feature/blocks/delete-block/DeleteBlockIcon'
import { DragBlockIcon } from '@feature/blocks/drag-block/DragBlockIcon'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@feature/blocks/resize-text-block/onTextBlockResize'
import { handleChangeOfTextBlock } from '@feature/blocks/handle-change-of-text-block/handleChangeOfTextBlock'

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
        registryKey={blockEditorKey({
          blockIndex: block.index,
          editorName: 'textBlock',
        })}
        className='text'
        placeholder='Add text, tables, drop images, files, links, select to format...'
        contentGetter={() =>
          getTextBlockHtmlFromStore({ blockIndex: block.index })
        }
        onUpdate={(params) => {
          handleChangeOfTextBlock({ editorRef, blockIndex: block.index })
        }}
        onUpload={upload}
        sx={textItemCellStyle}
      />
    </BlockComp>
  )
}

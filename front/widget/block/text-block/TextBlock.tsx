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
import { CopyBlockIcon } from '@feature/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@feature/blocks/cut-item/CutBlockIcon'
import { DeleteBlockIcon } from '@feature/blocks/delete-item/DeleteBlockIcon'
import { DragBlockIcon } from '@feature/blocks/drag-item/DragBlockIcon'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@feature/blocks/resize/resize-text-block/onTextBlockResize'
import { onChangeTextBlock } from '@feature/blocks/on-text-change/on-change-text-block/onChangeTextBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
        registryKey={getRegistryKey({
          editorName: 'textBlock',
          blockIndex: block.index,
          rowIndex: null,
        })}
        className='text'
        placeholder='Add text, tables, drop images, files, links, select to format...'
        contentGetter={() =>
          getTextBlockHtmlFromStore({ blockIndex: block.index })
        }
        onUpdate={() => {
          onChangeTextBlock({ editorRef, blockIndex: block.index })
        }}
        onUpload={upload}
        sx={textItemCellStyle}
      />
    </BlockComp>
  )
}

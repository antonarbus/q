import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { getHtmlOfTextBlockFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfTextBlockFromStoreByIndex'
import { textItemCellStyle } from '@front/entities/quotation/style/textItemCellStyle'
import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { upload } from '@front/features/file/upload-file'
import { BookmarkBlockIcon } from '@front/features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@front/features/open-close/open-info-modal'
import { TextEditor } from '@front/shared/component/TextEditor'
import { cls } from '@front/shared/cls'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'
import { CopyBlockIcon } from '@front/features/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@front/features/blocks/cut-item/CutBlockIcon'
import { DeleteBlockIcon } from '@front/features/blocks/delete-item/DeleteBlockIcon'
import { DragBlockIcon } from '@front/features/blocks/drag-item/DragBlockIcon'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@front/features/blocks/resize-text-block/onTextBlockResize'
import { updateTextBlock } from '@front/features/blocks/update-text-block/updateTextBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const TextBlock = (): React.JSX.Element => {
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
        contentGetter={() => getHtmlOfTextBlockFromStoreByIndex({ blockIndex: block.index })}
        onChange={() => {
          updateTextBlock({ blockIndex: block.index })
        }}
        onUpload={upload}
        sx={textItemCellStyle}
      />
    </BlockComp>
  )
}

import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfTextBlockFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfTextBlockFromStoreByIndex'
import { textItemCellStyle } from '@front/entities/quotation/style/textItemCellStyle'
import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { upload } from '@front/features/file/upload-file'
import { TextEditor } from '@front/shared/component/TextEditor'
import { cls } from '@front/shared/cls'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@front/features/blocks/resize-text-block/onTextBlockResize'
import { updateTextBlock } from '@front/features/blocks/update-text-block/updateTextBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { RightBlockActionButtons } from './RightBlockActionButtons'
import { LeftBlockActionButtons } from './LeftBlockActionButtons'

export const TextBlock = (): React.JSX.Element => {
  const block = useBlock()

  return (
    <BlockComp
      className={cls.textBlock}
      leftBlockActionButtons={<LeftBlockActionButtons />}
      onBlockResizeStart={onTextBlockResizeStart}
      onBlockResizeStop={onTextBlockResizeStop}
      rightBlockActionButtons={<RightBlockActionButtons />}
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

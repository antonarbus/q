import { useRef } from 'react'
import { updateTextBlock } from '@features/items/cell/update_cell'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@features/items/resize'
import { beforeUpload } from '@features/upload'
import {
  Froala,
  BlockComp,
  getTextBlockHtmlFromStore,
  textItemCellStyle,
  useItem,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { type FroalaEditor } from '@shared/types/froala'

export const TextBlockForEditModal = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <BlockComp
      className={cls.textBlock}
      onItemResizeStart={onTextBlockResizeStart}
      onItemResizeStop={onTextBlockResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() => getTextBlockHtmlFromStore({ itemIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        beforeUpload={beforeUpload}
        style={textItemCellStyle}
        onContentChange={() => {
          updateTextBlock({ editorRef, itemIndex })
        }}
      />
    </BlockComp>
  )
}

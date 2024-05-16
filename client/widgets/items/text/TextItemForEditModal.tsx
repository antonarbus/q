import { useRef } from 'react'
import { updateTextItem } from '@features/cell/update_cell'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/resize'
import { beforeUpload } from '@features/upload'
import { Froala, ItemComp, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { type FroalaEditor } from '@shared/types/froala'

export const TextItemForEditModal = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ItemComp
      className={cls.textItem}
      onItemResizeStart={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() => getItemTextHtmlFromStore({ itemIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        beforeUpload={beforeUpload}
        style={textItemCellStyle}
        onContentChange={() => {
          updateTextItem({ editorRef, itemIndex })
        }}
      />
    </ItemComp>
  )
}

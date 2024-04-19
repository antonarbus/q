import { useRef } from 'react'
import { LeftItemActionButtons, RightItemActionButtons } from '@features/items/item_actions'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/items/resize_item'
import { updateTextItem } from '@features/items/update_cell'
import { beforeUpload } from '@features/items/upload'
import { Froala, ItemComp, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'

export const TextItem = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ItemComp
      onItemResizeStart={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      leftItemActionButtons={<LeftItemActionButtons />}
      rightItemActionButtons={<RightItemActionButtons />}
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

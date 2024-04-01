import { useRef } from 'react'
import { ItemActions } from '@features/items/item_actions'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/items/resize_item'
import { updateTextItem } from '@features/items/update_cell'
import { beforeUpload } from '@features/items/upload'
import { Froala, Item, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/items'
import { type FroalaEditor } from '@shared/types'

export const TextItem = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Item
      onItemResizeStart={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      itemActions={<ItemActions />}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() => getItemTextHtmlFromStore({ itemIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        beforeUpload={beforeUpload}
        onContentChange={() => {
          updateTextItem({ editorRef, itemIndex })
        }}
        additionalStyle={textItemCellStyle}
      />
    </Item>
  )
}

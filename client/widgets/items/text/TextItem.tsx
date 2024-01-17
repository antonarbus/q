import { useRef } from 'react'
import { Froala, Item, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/items'
import { PencilAtBottomRight } from '@shared/components/PencilAtBottomRight'
import { updateTextItem } from '@features/update_cell'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/resize_item'
import { ItemActions } from '@features/item_actions'
import type FroalaEditor from 'froala-editor'

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
        onContentChange={() => {
          updateTextItem({ editorRef, itemIndex })
        }}
        additionalStyle={textItemCellStyle}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </Item>
  )
}

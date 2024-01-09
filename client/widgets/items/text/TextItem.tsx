import { theme } from 'client/shared/clients'
import { useRef } from 'react'
import { Froala, Item, getItemTextHtmlFromStore, useItem } from 'client/entities/items'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'
import { updateTextItem } from 'client/features/update_cell'
import { onTextItemResizeStart, onTextItemResizeStop } from 'client/features/resize_item'
import { ItemActions } from 'client/features/item_actions'
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
          if (editorRef.current === null) return

          updateTextItem({
            html: editorRef.current.html.get(),
            itemIndex,
          })
        }}
        additionalStyle={{
          padding: theme.item.padding,
        }}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </Item>
  )
}

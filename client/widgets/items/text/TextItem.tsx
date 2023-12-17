import { theme } from 'client/shared/clients'
import { useRef } from 'react'
import { Froala } from 'client/shared/ui/froala'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'
import { changeItem } from 'client/features/change_cell'
import { Item, itemTextHtmlGetter } from 'client/entities/items'
import { onTextItemResizeStart, onTextItemResizeStop } from 'client/features/resize_item'
import { ItemActions } from 'client/features/item_actions'
import type FroalaEditor from 'froala-editor'
import { useItemIndex } from '../ItemIndexProvider'

export const TextItem = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItemIndex()

  return (
    <Item
      onItemResize={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      itemActions={<ItemActions />}
    >
      <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        htmlGetter={() => itemTextHtmlGetter({ itemIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeItem({ html, itemIndex })
        }}
        additionalStyle={{
          padding: theme.item.padding,
        }}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </Item>
  )
}

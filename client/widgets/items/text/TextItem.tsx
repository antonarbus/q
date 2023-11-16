import { theme } from 'client/shared/clients'
import { useRef } from 'react'
import { Froala } from 'client/shared/ui/froala'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'
import { changeItem } from 'client/features/change_text'
import { Item, itemTextHtmlGetter } from 'client/entities/items'
import { onTextItemResizeStart, onTextItemResizeStop } from 'client/features/resize_item'
import { ItemActions } from 'client/features/item_actions'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
}

export const TextItem = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Item
      itemIndex={itemIndex}
      onItemResize={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      itemActions={<ItemActions itemIndex={itemIndex} />}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        htmlGetter={() => itemTextHtmlGetter({ itemIndex })}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeItem({ html, itemIndex })
        }}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </Item>
  )
}

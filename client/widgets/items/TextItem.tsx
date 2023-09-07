import type FroalaEditor from 'froala-editor'
import { theme } from 'client/shared/clients'
import { useRef } from 'react'
import { Froala } from 'client/shared/ui/froala'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'
import { Item } from './item'
import { changeItemText } from 'client/features/change_text'
import { itemTextHtmlGetter } from 'client/entities/items'
import { onTextItemResizeStop } from 'client/features/resize_item'

interface Props {
  itemIndex: number
}

export const TextItem = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Item
      itemIndex={itemIndex}
      onItemResizeStop={onTextItemResizeStop}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHtmlGetter={itemTextHtmlGetter}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        onContentChange={changeItemText}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </Item>
  )
}

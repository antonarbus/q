import type FroalaEditor from 'froala-editor'
import { theme } from 'client/shared/clients'
import { useRef } from 'react'
import { Froala } from 'client/shared/ui/froala'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'
import { Item } from './item'
import { itemTextHtmlGetter } from 'client/entities/items'
import { changeItemText } from 'client/features/change_text'

interface Props {
  index: number
}

export const TextItem = ({ index }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Item index={index}>
      <Froala
        index={index}
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

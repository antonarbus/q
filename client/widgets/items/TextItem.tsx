import { theme } from 'client/shared/clients'
import { store } from 'client/app/store'
import { useRef } from 'react'
import { Froala } from 'client/shared/ui/froala'
import type { RefDiv } from 'client/shared/types'
import { saveText } from 'client/entities/items'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'
import { Item } from './item'
import type FroalaEditor from 'froala-editor'
import { saveItemText } from 'client/features/save_item_text'

interface IProps {
  index: number
}

export const TextItem = ({ index }: IProps): JSX.Element => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Item index={index}>
      <Froala
        index={index}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        getHtml={(): string => {
          const item = store.getState().items[index]
          if (!item) return ''
          if (item.type !== 'text') return ''
          return item.text.html
        }}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        onContentChange={saveItemText}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </Item>
  )
}

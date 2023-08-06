import { theme } from 'client/shared/clients'
import { store } from 'client/app/store'
import { useRef } from 'react'
import { Froala } from 'client/shared/ui/froala'
import type { RefAny, RefDiv } from 'client/shared/types'
import { ItemWithActions, saveText } from 'client/entities/items'
import { PencilAtBottomRight } from 'client/shared/components/PencilAtBottomRight'

interface IProps {
  index: number
}

export const TextItem = ({ index }: IProps): JSX.Element => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny

  return (
    <ItemWithActions index={index}>
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
        saveFroalaReducer={saveText}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </ItemWithActions>
  )
}

import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/shared/clients'
import { store } from 'client/app/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import type { RefAny, RefDiv } from 'client/types'
import { saveText } from 'client/entities/items'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'

interface IProps {
  index: number
}

export const TextItem = ({ index }: IProps): EmotionJSX.Element => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny

  return (
    <SortableResizableItemWithActions index={index}>
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
    </SortableResizableItemWithActions>
  )
}

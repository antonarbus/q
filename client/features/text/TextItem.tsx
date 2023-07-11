import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/theme'
import { store } from 'client/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { saveText } from '../items/itemsSlice'
import { TRefAny, TRefDiv } from 'client/types'
import { useSaveItemHeightOnInitLoad } from '../items/useSaveItemHeightOnInitLoad'

type TProps = {
  index: number
}

// todo: not in use
export const TextItem = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef(null) as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'text') return null
  const { html, height } = item.text
  useSaveItemHeightOnInitLoad({ itemRef: froalaElementRef, index })

  return (
    <SortableResizableItemWithActions index={index} >
      <Froala
        index={index}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHtml={html}
        height={height}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        saveFroalaReducer={saveText}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </SortableResizableItemWithActions>
  )
}

import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/theme'
import { store } from 'client/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { saveText } from '../items/itemsSlice'
import { RefAny, RefDiv } from 'client/types'
import type { TextItem as TextItemType } from '../items/types'

type Props = {
  index: number
}

export const TextItem = ({ index }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]
  if (!item) return null
  if (item?.type !== 'text') return null

  return (
    <SortableResizableItemWithActions index={index} >
      <Froala
        index={index}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        getHtml={() => (store.getState().items[index] as TextItemType)?.text?.html}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        saveFroalaReducer={saveText}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </SortableResizableItemWithActions>
  )
}

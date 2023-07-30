import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/shared/clients'
import { store } from 'client/app/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { RefAny, RefDiv } from 'client/types'
import { saveText } from 'client/features/items/itemsSlice'
import type { TextItem as TextItemType } from 'client/features/items/types'

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
    <SortableResizableItemWithActions index={index}>
      <Froala
        index={index}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        getHtml={() =>
          (store.getState().items[index] as TextItemType)?.text?.html
        }
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        saveFroalaReducer={saveText}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </SortableResizableItemWithActions>
  )
}

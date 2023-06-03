import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/theme'
import { store } from 'client/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { saveTextHeight, saveTextHtml } from '../items/itemsSlice'
import { TRefAny, TRefDiv } from 'client/types'
import { useSaveItemHeightOnInitLoad } from '../items/useSaveItemHeightOnInitLoad'

type TProps = {
  index: number
}

export const TextItem = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'text') return null

  useSaveItemHeightOnInitLoad({ itemRef: froalaElementRef, index })

  return (
    <SortableResizableItemWithActions index={index} >
      <Froala
        initOnClick
        index={index}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHeight={item.text.height}
        initHtml={item.text.html}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        saveHeightReducer={saveTextHeight}
        saveHtmlReducer={saveTextHtml}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </SortableResizableItemWithActions>
  )
}

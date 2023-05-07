// // @ts-nocheck
import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/theme'
import { store, useDispatchTyped } from 'client/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { tellItemSavedLocally, saveEditableText, saveItemHeight } from '../items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { RefAnyType, RefDivType, RefResizableType } from 'client/types'

type Props = {
  index: number
}

export const EditableTextItem = ({ index }: Props) => {
  const dispatch = useDispatchTyped()
  const itemRef = useRef() as RefResizableType
  const froalaElementRef = useRef() as RefDivType
  const editorRef = useRef() as RefAnyType
  const item = store.getState().items?.[index]

  if (item.type !== 'text editable') return null

  function saveHtmlAndHeight() {
    const height = itemRef.current.resizable?.offsetHeight || 0
    const html = editorRef.current.html.get()
    const itemHeight = itemRef.current.resizable?.offsetHeight || 0
    dispatch(saveEditableText({ index, html, height }))
    dispatch(saveItemHeight({ index, height: itemHeight }))
    saveItemsIntoLocalStorage()
    dispatch(tellItemSavedLocally({ index }))
  }

  return (
    <SortableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHtml={item.text.html}
        initHeight={item.text.height}
        padding={theme.item.padding}
        onClickAwayIfHtmChanged={saveHtmlAndHeight}
      />
      <PencilAtBottomRight
        editorRef={editorRef}
      />
    </SortableResizableItemWithActions>
  )
}

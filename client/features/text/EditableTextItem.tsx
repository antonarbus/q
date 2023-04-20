// // @ts-nocheck
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { theme } from 'client/theme'
import { store, useDispatchTyped } from 'client/store'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { tellItemSavedLocally, saveEditableText, saveItemHeight } from '../items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'

type Props = {
  index: number
}

export const EditableTextItem = ({ index }: Props) => {
  const dispatch = useDispatchTyped()
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const froalaElementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const editorRef = useRef() as React.MutableRefObject<any>
  const item = store.getState().items?.[index]

  if (item.type !== 'text editable') return null

  function saveHtmlAndHeight() {
    const itemHeight = itemRef.current.resizable?.offsetHeight || 0
    const itemHtml = editorRef.current.html.get()
    dispatch(saveEditableText({ index, html: itemHtml, height: itemHeight }))
    dispatch(saveItemHeight({ index, height: itemHeight }))
    saveItemsIntoLocalStorage()
    dispatch(tellItemSavedLocally({ index }))
  }

  return (
    <DraggableResizableItemWithActions
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
    </DraggableResizableItemWithActions>
  )
}

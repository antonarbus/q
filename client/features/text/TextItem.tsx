import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/theme'
import { store, useDispatchTyped } from 'client/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { tellItemSavedLocally, saveText, saveItemHeight, saveTextHeight } from '../items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { TRefAny, TRefDiv } from 'client/types'
import { useSaveItemHeightOnInitLoad } from '../items/useSaveItemHeightOnInitLoad'

type TProps = {
  index: number
}

export const TextItem = ({ index }: TProps) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'text') return null

  useSaveItemHeightOnInitLoad({ itemRef: froalaElementRef, index })

  //! do the same for every froala element
  function onClickAwayIfHtmChanged() {
    const height = (froalaElementRef.current as HTMLElement)!.closest('.item-paper')!.clientHeight || 0
    const html = editorRef.current.html.get()
    dispatch(saveText({ index, html, height }))
    dispatch(saveItemHeight({ index, height }))
    saveItemsIntoLocalStorage()
    dispatch(tellItemSavedLocally({ index }))
  }

  return (
    <SortableResizableItemWithActions index={index} >
      <Froala
        index={index}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHeight={item.text.height}
        initHtml={item.text.html}
        onClickAwayIfHtmChanged={onClickAwayIfHtmChanged}
        placeholder='Type text or drop images, files, links...'
        padding={theme.item.padding}
        saveHeightReducer={saveTextHeight}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </SortableResizableItemWithActions>
  )
}

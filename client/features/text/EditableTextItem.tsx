import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { theme } from 'client/theme'
import { store, useDispatchTyped } from 'client/store'
import { useRef } from 'react'
import { PencilAtBottomRight } from 'client/components/PencilAtBottomRight'
import { Froala } from 'client/components/Froala'
import { tellItemSavedLocally, saveEditableText, saveItemHeight } from '../items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { TRefAny, TRefDiv } from 'client/types'
import { useEffectOnce } from 'react-use'

type TProps = {
  index: number
}

export const EditableTextItem = ({ index }: TProps) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'text editable') return null

  //! do the same for every item and froala element
  function saveHtmlAndHeight({ showMsg = true }) {
    const height = (froalaElementRef.current as HTMLElement)!.closest('.item-paper')!.clientHeight || 0
    const html = editorRef.current.html.get()
    dispatch(saveEditableText({ index, html, height }))
    dispatch(saveItemHeight({ index, height }))
    saveItemsIntoLocalStorage()
    showMsg && dispatch(tellItemSavedLocally({ index }))
  }

  function saveHeightOnInitLoad() {
    setTimeout(() => {
      saveHtmlAndHeight({ showMsg: false })
    }, 1000)
  }

  useEffectOnce(saveHeightOnInitLoad)

  return (
    <SortableResizableItemWithActions index={index} >
      <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHtml={item.text.html}
        padding={theme.item.padding}
        onClickAwayIfHtmChanged={saveHtmlAndHeight}
      />
      <PencilAtBottomRight editorRef={editorRef} />
    </SortableResizableItemWithActions>
  )
}

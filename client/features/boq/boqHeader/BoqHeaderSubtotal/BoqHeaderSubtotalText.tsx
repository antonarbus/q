import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalText, saveBoqHeaderSubtotalTextHeight, saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { TRefAny, TRefDiv } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeaderSubtotalText = ({ index }: TProps) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const { html = 'Subtotal', height = 24 } = item.boq.header.subtotal.text

  function saveHtmlAndHeight() {
    const height = froalaElementRef.current.offsetHeight || 0
    const html = editorRef.current.html.get()
    const itemHeight = (froalaElementRef.current as HTMLElement)!.closest('.item-paper')!.clientHeight || 0
    dispatch(saveBoqHeaderSubtotalText({ index, height, html }))
    dispatch(saveItemHeight({ index, height: itemHeight }))
    saveItemsIntoLocalStorage()
    dispatch(tellItemSavedLocally({ index }))
  }

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      initHeight={height}
      onClickAwayIfHtmChanged={saveHtmlAndHeight}
      saveHeightReducer={saveBoqHeaderSubtotalTextHeight}
      sx={{
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right'
      }}
      // todo: make this deletable on complete text removal, show a question in modal
      // todo: need to bring boolean flag into redux to make it work
    />
  )
}

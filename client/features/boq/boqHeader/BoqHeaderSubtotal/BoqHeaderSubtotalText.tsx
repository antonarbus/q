import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalText, saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { TRefAny, TRefDiv, TRefResizable } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
  itemRef: TRefResizable
}

export const BoqHeaderSubtotalText = ({ index, itemRef }: Props) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const { html = 'Subtotal', height = 24 } = item.boq.header.subtotal.text

  function saveHtmlAndHeight() {
    const height = froalaElementRef.current.offsetHeight || 0
    const html = editorRef.current.html.get()
    const itemHeight = itemRef.current.resizable?.offsetHeight || 0
    dispatch(saveBoqHeaderSubtotalText({ index, height, html }))
    dispatch(saveItemHeight({ index, height: itemHeight }))
    saveItemsIntoLocalStorage()
    dispatch(tellItemSavedLocally({ index }))
  }

  return (
    <Froala
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      initHeight={height}
      onClickAwayIfHtmChanged={saveHtmlAndHeight}
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

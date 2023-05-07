import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalPrice, saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { TRefAny, TRefDiv, TRefResizable } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
  itemRef: TRefResizable
}

export const BoqHeaderSubtotalPrice = ({ index, itemRef }: TProps) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const { html = 'Title', height = 24 } = item.boq.header.subtotal.price

  function saveHtmlAndHeight() {
    const height = froalaElementRef.current.offsetHeight || 0
    const html = editorRef.current.html.get()
    const value = parseInt(editorRef.current.$el.text())
    const itemHeight = itemRef.current.resizable?.offsetHeight || 0
    dispatch(saveBoqHeaderSubtotalPrice({ index, height, html, value }))
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
      placeholder='Price...'
      sx={{
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right'
      }}
    />
  )
}

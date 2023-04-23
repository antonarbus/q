import { Froala } from 'client/components/Froala'
import { saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { RefAnyType, RefDivType, RefResizableType } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
  itemRef: RefResizableType
}

export const BoqHeaderSubtotalPrice = ({ index, itemRef }: Props) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as RefDivType
  const editorRef = useRef() as RefAnyType
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const { html = 'Title', height = 24, value = 0 } = item.boq.header.subtotal.price

  function saveHtmlAndHeight() {
    const titleHeight = froalaElementRef.current.offsetHeight || 0
    const titleHtml = editorRef.current.html.get()
    const itemHeight = itemRef.current.resizable?.offsetHeight || 0
    dispatch(saveBoqHeaderTitle({ index, height: titleHeight, html: titleHtml }))
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

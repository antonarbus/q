import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalCurrency, saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { RefAnyType, RefDivType, RefResizableType } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
  itemRef: RefResizableType
}

export const BoqHeaderSubtotalCurrency = ({ index, itemRef }: Props) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as RefDivType
  const editorRef = useRef() as RefAnyType
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'EUR', height = 24 } = item.boq.header.subtotal.currency

  function saveHtmlAndHeight() {
    const height = froalaElementRef.current.offsetHeight || 0
    const html = editorRef.current.html.get()
    const itemHeight = itemRef.current.resizable?.offsetHeight || 0
    dispatch(saveBoqHeaderSubtotalCurrency({ index, height, html }))
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
      placeholder='$'
      sx={{
        textAlign: 'right',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        minWidth: 10
      }}
    />
  )
}

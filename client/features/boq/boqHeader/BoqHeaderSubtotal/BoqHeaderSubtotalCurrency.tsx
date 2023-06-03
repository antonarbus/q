import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalCurrency, saveBoqHeaderSubtotalCurrencyHeight, saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { TRefAny, TRefDiv, TRefResizable } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeaderSubtotalCurrency = ({ index }: TProps) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'EUR', height = 24 } = item.boq.header.subtotal.currency

  function saveHtmlAndHeight() {
    const height = froalaElementRef.current.offsetHeight || 0
    const html = editorRef.current.html.get()
    const itemHeight = (froalaElementRef.current as HTMLElement)!.closest('.item-paper')!.clientHeight || 0
    dispatch(saveBoqHeaderSubtotalCurrency({ index, height, html }))
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
      placeholder='$'
      saveHeightReducer={saveBoqHeaderSubtotalCurrencyHeight}
      sx={{
        textAlign: 'right',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        minWidth: 10
      }}
    />
  )
}

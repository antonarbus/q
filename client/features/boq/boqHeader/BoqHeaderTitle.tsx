import { Froala } from 'client/components/Froala'
import { saveBoqHeaderTitle, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { ItemBoqType } from 'client/features/items/types'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { useRef } from 'react'

type Props = {
  index: number
  itemRef: React.MutableRefObject<Resizable>
}

export const BoqHeaderTitle = ({ index, itemRef }: Props) => {
  const dispatch = useDispatchTyped()
  const froalaElementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const editorRef = useRef() as React.MutableRefObject<any>
  const { html = 'Title', height = 24 } = (store.getState().items?.[index] as ItemBoqType).boq.header.title

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
        // padding={theme.item.padding}
        onClickAwayIfHtmChanged={saveHtmlAndHeight}
      />
  )
}

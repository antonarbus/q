import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { dispatch, getState } from '@shared/clients'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
}

export const updateTextItem = ({
  editorRef,
  itemIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== 'text') return

  const prevHtml = item.text.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(itemsSlice.actions.updateItemTextReducer({ itemIndex, html }))
  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}

import { dispatch, getState } from '@lib_instances/store'
import { itemType, itemsSlice, saveItemsLocally } from '@entities/items'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updatePriceTitleCell = ({
  editorRef,
  itemIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemType.price) return

  const prevHtml = priceItem.title.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (!didTextChange) return

  dispatch(itemsSlice.actions.updatePriceTitleReducer({ itemIndex, html }))

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}

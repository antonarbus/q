import { saveText } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { TOnFroalaContentChange } from 'client/shared/types'

export const onItemTextContentChange: TOnFroalaContentChange = ({ html, index, rowIndex }) => {
  const item = store.getState().items[index]
  if (item?.type !== 'text') return
  const prevHtml = item.text.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  store.dispatch(saveText({ index, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

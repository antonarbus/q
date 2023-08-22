import { itemsSlice } from 'client/entities/items'
import { dispatch, getState, store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnFroalaContentChange } from 'client/shared/types'

export const changeItemText: OnFroalaContentChange = ({ html, index, rowIndex }) => {
  const item = getState().items[index]
  if (item?.type !== 'text') return
  const prevHtml = item.text.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.saveItemText({ index, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

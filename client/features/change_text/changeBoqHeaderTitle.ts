import { itemsSlice } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnFroalaContentChange } from 'client/shared/types'

export const changeBoqHeaderTitle: OnFroalaContentChange = ({ html, index, rowIndex }) => {
  const item = store.getState().items[index]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.header.title.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  store.dispatch(itemsSlice.actions.saveBoqHeaderTitle({ index, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

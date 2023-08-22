import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnFroalaContentChange } from 'client/shared/types'

export const changeBoqHeaderPrice: OnFroalaContentChange = ({ html, index, rowIndex }) => {
  const item = getState().items[index]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.header.subtotal.price.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.saveBoqHeaderPrice({ index, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

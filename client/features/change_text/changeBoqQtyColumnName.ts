import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnFroalaContentChange } from 'client/shared/types'

export const changeBoqQtyColumnName: OnFroalaContentChange = ({ html, itemIndex, rowIndex }) => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.column.qty.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.saveItemText({ itemIndex, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}

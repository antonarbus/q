import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnFroalaContentChange } from 'client/shared/types'

export const changeBoqHeaderSubtotal: OnFroalaContentChange = ({ html, index, rowIndex }) => {
  const item = getState().items[index]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.header.subtotal.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.saveBoqHeaderText({ index, html, rowIndex, headerElementName: 'subtotal' }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

import { saveText } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { TOnFroalaContentChange } from 'client/shared/types'

export const onBoqItemColumnNameChange: TOnFroalaContentChange = ({ html, index, rowIndex }) => {
  const item = store.getState().items[index]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.column.item.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  store.dispatch(saveText({ index, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

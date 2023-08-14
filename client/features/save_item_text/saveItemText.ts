import { saveText } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { TOnFroalaContentChange } from 'client/shared/types'


export const saveItemText: TOnFroalaContentChange = ({ html, index, rowIndex }) => {
  store.dispatch(saveText({ index, html, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}

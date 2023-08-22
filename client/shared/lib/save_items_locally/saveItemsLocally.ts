import { store } from 'client/shared/clients'
import { saveItemsIntoLocalStorage } from './saveItemsIntoLocalStorage'
import { tellItemsSavedLocally } from './tellItemsSavedLocally'
import { itemsSlice } from 'client/entities/items'
import type { Item } from 'client/shared/types'

interface Props {
  items?: Item[]
  msgAboveItemWithIndex?: number
}

export const saveItemsLocally = ({
  items = store.getState().items,
  msgAboveItemWithIndex,
}: Props = {}): void => {
  saveItemsIntoLocalStorage({ items })
  tellItemsSavedLocally()
  if (msgAboveItemWithIndex !== undefined) {
    store.dispatch(itemsSlice.actions.tellItemSavedLocally({ index: msgAboveItemWithIndex }))
  }
}
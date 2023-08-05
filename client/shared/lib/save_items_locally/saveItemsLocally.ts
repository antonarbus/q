import { store } from 'client/shared/clients'
import { saveItemsIntoLocalStorage } from './saveItemsIntoLocalStorage'
import { tellItemsSavedLocally } from './tellItemsSavedLocally'
import type { TItem } from 'client/entities/items';
import { tellItemSavedLocally } from 'client/entities/items'

interface IProps {
  items?: TItem[]
  msgAboveItemWithIndex?: number
}

export const saveItemsLocally = ({
  items = store.getState().items,
  msgAboveItemWithIndex,
}: IProps = {}): void => {
  saveItemsIntoLocalStorage({ items })
  tellItemsSavedLocally()
  if (msgAboveItemWithIndex !== undefined) {
    store.dispatch(tellItemSavedLocally({ index: msgAboveItemWithIndex }))
  }
}
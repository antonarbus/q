import { dispatch, getState } from 'client/shared/clients'
import { saveItemsIntoLocalStorage } from './saveItemsIntoLocalStorage'
import { tellItemsSavedLocally } from './tellItemsSavedLocally'
import { itemsSlice } from 'client/entities/items'
import type { Item } from 'client/shared/types'

interface Props {
  items?: Item[]
  msgAboveItemWithIndex?: number
}

export const saveItemsLocally = ({
  items = getState().items,
  msgAboveItemWithIndex,
}: Props = {}): void => {
  saveItemsIntoLocalStorage({ items })
  tellItemsSavedLocally()
  if (msgAboveItemWithIndex !== undefined) {
    dispatch(itemsSlice.actions.tellItemSavedLocally({ index: msgAboveItemWithIndex }))
  }
}